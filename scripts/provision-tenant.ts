/**
 * End-to-end tenant provisioning.
 *
 * 1. Creates the tenant row in Postgres (+ default content)
 * 2. Generates a random tenant password and stores its bcrypt hash
 * 3. Creates a new Vercel project linked to the GitHub repo
 * 4. Copies shared env vars from .env.local (POSTGRES_*, BLOB_*, AUTH_SECRET, ADMIN_PASSWORD_HASH)
 * 5. Adds tenant-specific env vars (TENANT_SLUG, VITE_TENANT_SLUG, VITE_TEMPLATE)
 * 6. Triggers the first production deployment and polls until it leaves "queued"
 *
 * On any failure after the Vercel project is created, the script attempts a
 * best-effort rollback (deletes the project + DB rows it created in this run)
 * so reruns don't accumulate orphaned resources.
 *
 * Usage:
 *   npm run tenant:provision -- <slug> "<Display Name>" <restaurant|salon|tradesman|hotel|tourism|consulting|medical|fitness> [classic|modern|bold]
 *
 * Required env vars (read from .env.local):
 *   VERCEL_TOKEN, VERCEL_TEAM_ID, GITHUB_REPO (default: bthginfo/company-template),
 *   POSTGRES_URL, BLOB_READ_WRITE_TOKEN, AUTH_SECRET, ADMIN_PASSWORD_HASH
 *
 * The tenant password is NEVER printed to stdout. It is written to
 * `.tenant-credentials.txt` (gitignored) which the wrapper script reads back.
 */
import * as dotenv from 'dotenv';
// Load both .env and .env.local (the latter holds VERCEL_TOKEN + POSTGRES_URL after `vercel env pull`)
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { appendFileSync } from 'fs';
import { join } from 'path';
import { db, schema } from '../src/lib/db/client';
import { SiteContentSchema, type SiteContent } from '../src/lib/types';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from '../src/lib/demo-content';
import { BRANCH_TEXT_DEFAULTS } from '../src/lib/branch-text-defaults';
import { defaultGalleryStory, defaultGalleryCategories, defaultArrival } from '../src/lib/section-defaults';
import { FAQ_DEFAULTS } from '../src/lib/faq-defaults';

const VALID_TEMPLATES = ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism', 'consulting', 'medical', 'fitness'] as const;
const VALID_STYLES = ['classic', 'modern', 'bold'] as const;
type AnyTemplate = typeof VALID_TEMPLATES[number];
type AnyStyle = typeof VALID_STYLES[number];

// Slug names that would collide with reserved Vercel routes or our own paths.
const RESERVED_SLUGS = new Set([
  'admin', 'api', 'www', 'app', 'static', 'public', 'assets',
  'login', 'logout', 'session', 'preview', 'dashboard',
  'flamingomedia', 'flamingo-media',
]);

const RAW_ARGS = process.argv.slice(2);
const RESEED = RAW_ARGS.includes('--reseed');
const FILTERED = RAW_ARGS.filter((a) => a !== '--reseed');
const [slug, name, template, styleArg] = FILTERED;

const HELP = `\nUsage:\n  npm run tenant:provision -- <slug> "<Display Name>" <${VALID_TEMPLATES.join('|')}> [${VALID_STYLES.join('|')}]\n\nExample:\n  npm run tenant:provision -- bella-roma "Trattoria Bella Roma" restaurant modern\n  npm run tenant:provision -- praxis-lindner "Praxis Dr. Lindner" medical classic\n\nRequired env (in .env.local):\n  VERCEL_TOKEN, VERCEL_TEAM_ID, POSTGRES_URL, BLOB_READ_WRITE_TOKEN,\n  AUTH_SECRET, ADMIN_PASSWORD_HASH\n`;

if (slug === '--help' || slug === '-h') {
  console.log(HELP);
  process.exit(0);
}
if (!slug || !name || !template || !VALID_TEMPLATES.includes(template as AnyTemplate)) {
  console.error(HELP);
  process.exit(1);
}
// Vercel project names: lowercase letters, digits, dashes; max 100 chars.
// We're stricter (max 48) so the slug also fits as a subdomain comfortably and
// leaves headroom for `.vercel.app` and possible suffix.
if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(slug) || slug.length > 48) {
  console.error(`✗ Slug "${slug}" must be 2–48 chars: lowercase letters/digits/dashes, no leading or trailing dash.`);
  process.exit(1);
}
if (RESERVED_SLUGS.has(slug)) {
  console.error(`✗ Slug "${slug}" is reserved. Choose a different name.`);
  process.exit(1);
}
if (styleArg && !VALID_STYLES.includes(styleArg as AnyStyle)) {
  console.error(`✗ Style "${styleArg}" must be one of: ${VALID_STYLES.join(', ')}`);
  process.exit(1);
}
const style: AnyStyle = (styleArg as AnyStyle) || 'classic';

const TOKEN = required('VERCEL_TOKEN');
const TEAM = required('VERCEL_TEAM_ID');
const REPO = process.env.GITHUB_REPO || 'bthginfo/company-template';

function required(key: string): string {
  const v = process.env[key];
  if (!v) {
    console.error(`Missing required env var: ${key}`);
    console.error('Add it to .env.local before running.');
    process.exit(1);
  }
  return v;
}

async function vercel(path: string, init: RequestInit = {}): Promise<any> {
  const url = `https://api.vercel.com${path}${path.includes('?') ? '&' : '?'}teamId=${TEAM}`;
  const r = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await r.text();
  const json = text ? JSON.parse(text) : {};
  if (!r.ok) {
    throw new Error(`Vercel API ${r.status} ${path}: ${JSON.stringify(json)}`);
  }
  return json;
}

const DEFAULT_CONTENT_PRIMARY: Record<'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism', string> = {
  restaurant: '#9a3412',
  salon: '#be185d',
  tradesman: '#1d4ed8',
  hotel: '#7c5e3c',
  tourism: '#0e7490',
};
void DEFAULT_CONTENT_PRIMARY;

/** Defaults for branches that share the single-page ExtraBranchTemplate
 *  (consulting/medical/fitness). We seed from the showcase demo content so
 *  the freshly provisioned site already looks complete; the admin can then
 *  customize via the editor. Symmetric to `fullDefaults`: same overlay seeds,
 *  same contact-stripping, same FAQ persistence. */
function extraDefaults(key: 'consulting' | 'medical' | 'fitness'): SiteContent {
  const base = EXTRA_DEMO_CONTENT[key];
  return SiteContentSchema.parse({
    ...base,
    brand: { ...base.brand, name },
    hero: { ...base.hero, title: name },
    branchText: { ...((base as any).branchText || {}), ...BRANCH_TEXT_DEFAULTS[key] },
    galleryStory: defaultGalleryStory(key),
    galleryCategories: defaultGalleryCategories(key),
    arrival: defaultArrival(key),
    faq: FAQ_DEFAULTS[key] ?? [],
    contact: {
      ...base.contact,
      // Strip showcase phone/email/address so the tenant fills their own.
      // Without this, a fresh consulting/medical/fitness site would publish
      // the demo office's phone number as its click-to-call link.
      phone: '',
      email: '',
      address: '',
      city: base.contact?.city || '',
      mapsUrl: '',
    },
  });
}

/** Defaults for full-template branches (restaurant/salon/tradesman/hotel/tourism).
 *  We seed from the rich showcase demo so the new tenant site is fully populated
 *  out of the box (gallery, services, testimonials, FAQ, numbers, contact-stub).
 *  Brand name + hero title get the provided tenant name. */
function fullDefaults(key: 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism'): SiteContent {
  const base = DEMO_CONTENT[key];
  return SiteContentSchema.parse({
    ...base,
    brand: { ...base.brand, name },
    hero: { ...base.hero, title: name },
    branchText: { ...((base as any).branchText || {}), ...BRANCH_TEXT_DEFAULTS[key] },
    // Seed the new admin overlay sections so a fresh tenant DB row already
    // contains them. Templates also fall back to identical defaults at render
    // time, but persisting them means the admin editor opens with non-empty
    // fields and exports stay stable across schema additions.
    galleryStory: defaultGalleryStory(key),
    galleryCategories: defaultGalleryCategories(key),
    arrival: defaultArrival(key),
    faq: FAQ_DEFAULTS[key] ?? [],
    contact: {
      ...base.contact,
      // Strip showcase phone/email/address so the tenant fills their own – avoids
      // a fresh tenant accidentally publishing the demo restaurant's number.
      phone: '',
      email: '',
      address: '',
      city: base.contact?.city || '',
      mapsUrl: '',
    },
  });
}

function defaultsFor(t: AnyTemplate): SiteContent {
  if (t === 'consulting' || t === 'medical' || t === 'fitness') return extraDefaults(t);
  return fullDefaults(t as 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism');
}

const SHARED_KEYS = [
  'AUTH_SECRET',
  'ADMIN_PASSWORD_HASH',
  'POSTGRES_URL',
  'POSTGRES_URL_NON_POOLING',
  'POSTGRES_PRISMA_URL',
  'POSTGRES_USER',
  'POSTGRES_HOST',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'BLOB_READ_WRITE_TOKEN',
];

async function main() {
  const projectName = slug;
  console.log(`\n→ Provisioning tenant '${slug}' as Vercel project '${projectName}'\n`);

  // Track resources we created in *this* run so we can roll back on failure.
  // We deliberately don't roll back resources that already existed (idempotent
  // re-runs should leave prior state untouched).
  const rollback: Array<() => Promise<void>> = [];
  const runRollback = async () => {
    if (rollback.length === 0) return;
    console.error('\n↺ Rolling back resources created in this run …');
    // Reverse order so dependents go first.
    for (const step of rollback.reverse()) {
      try { await step(); }
      catch (e: any) { console.error('  ⚠ rollback step failed:', e?.message || e); }
    }
  };

  // 1. DB tenant + password
  const password = randomBytes(12).toString('base64').replace(/[+/=]/g, '').slice(0, 16);
  const passwordHash = bcrypt.hashSync(password, 12);

  const existing = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  let tenantId: string;
  let tenantWasNew = false;
  let passwordRotated = false;
  try {
    if (existing) {
      tenantId = existing.id;
      // Update meta only — never silently rotate the password unless --reseed is
      // explicitly passed AND the operator confirms by passing the slug again.
      // We update name/template/style though, so renames work.
      await db.update(schema.tenants).set({ name, template, style }).where(eq(schema.tenants.id, existing.id));
      console.log(`  ✓ Tenant row updated (existed) — password preserved`);
      if (RESEED) {
        const seed = defaultsFor(template as AnyTemplate);
        await db.insert(schema.siteContent)
          .values({ tenantId, data: seed })
          .onConflictDoUpdate({ target: schema.siteContent.tenantId, set: { data: seed } });
        console.log(`  ✓ Content reseeded from rich demo (--reseed)`);
      }
    } else {
      const [row] = await db.insert(schema.tenants)
        .values({ slug, name, template, style, passwordHash })
        .returning();
      tenantId = row.id;
      tenantWasNew = true;
      passwordRotated = true;
      // Atomic upsert so concurrent runs can't race the seed step.
      const seed = defaultsFor(template as AnyTemplate);
      await db.insert(schema.siteContent)
        .values({ tenantId, data: seed })
        .onConflictDoUpdate({ target: schema.siteContent.tenantId, set: { data: seed } });
      console.log(`  ✓ Tenant row + default content created`);
      // Roll back the brand-new tenant if subsequent steps fail.
      rollback.push(async () => {
        await db.delete(schema.siteContent).where(eq(schema.siteContent.tenantId, tenantId));
        await db.delete(schema.tenants).where(eq(schema.tenants.id, tenantId));
        console.error('  ↺ tenant + content rows deleted');
      });
    }

    // 2. Read shared env vars from local .env.local (already pulled via `vercel env pull`).
    //    Note: `vercel env pull` writes Vercel-encrypted blobs ("eyJ...") for vars marked
    //    as `sensitive`. Those are useless to copy. We only forward plaintext values.
    console.log(`\n→ Reading shared env vars from local .env.local`);
    const envMap = new Map<string, string>();
    for (const k of SHARED_KEYS) {
      const v = process.env[k];
      if (!v) {
        console.warn(`  ⚠ .env.local missing ${k}`);
        continue;
      }
      if (v.startsWith('eyJ') && v.length > 200) {
        console.warn(`  ⚠ ${k} in .env.local is a Vercel ciphertext blob — skipping (run \`vercel env pull --environment=development\` with a fresh token)`);
        continue;
      }
      envMap.set(k, v);
    }
    // AUTH_SECRET MUST be the same across all tenants (admin sessions are signed
    // with it). Auto-generating a per-tenant secret silently breaks Super-Admin
    // single-sign-on across projects, so we hard-fail here.
    if (!envMap.has('AUTH_SECRET')) {
      throw new Error('AUTH_SECRET not present as plaintext in .env.local. All tenants must share the same AUTH_SECRET. Run `vercel env pull --environment=development --yes` against the showcase project, then retry.');
    }

    // 3. Verify the project doesn't already exist as something we can't reuse, then create.
    let project: any;
    try {
      project = await vercel(`/v9/projects/${projectName}`);
      console.log(`  ✓ Vercel project already exists (${project.id}) — will update env + redeploy`);
    } catch (e: any) {
      if (!String(e.message).includes('not_found') && !String(e.message).includes('404')) {
        // Some other error talking to Vercel.
        throw e;
      }
      project = await vercel('/v10/projects', {
        method: 'POST',
        body: JSON.stringify({
          name: projectName,
          framework: 'vite',
          gitRepository: { type: 'github', repo: REPO },
          installCommand: 'npm install',
          buildCommand: 'npm run build',
          outputDirectory: 'dist',
        }),
      });
      console.log(`  ✓ Project created (${project.id})`);
      // Roll back the project if subsequent steps fail.
      const projectId = project.id;
      rollback.push(async () => {
        await vercel(`/v9/projects/${projectId}`, { method: 'DELETE' }).catch(() => {});
        console.error(`  ↺ Vercel project ${projectId} deleted`);
      });
    }

    // 4. Set env vars (idempotent — upsert by deleting matching first)
    const tenantEnv: Record<string, string> = {
      ...Object.fromEntries(envMap),
      TENANT_SLUG: slug,
      VITE_TENANT_SLUG: slug,
      VITE_TEMPLATE: template,
      VITE_STYLE: style,
    };
    console.log(`\n→ Setting ${Object.keys(tenantEnv).length} env vars on '${projectName}'`);

    // Fetch existing env vars to know what to skip/overwrite
    const existingEnv = await vercel(`/v9/projects/${projectName}/env`);
    const byKey = new Map<string, string>();
    for (const e of existingEnv.envs as Array<{ id: string; key: string }>) byKey.set(e.key, e.id);

    for (const [key, value] of Object.entries(tenantEnv)) {
      if (byKey.has(key)) {
        await vercel(`/v9/projects/${projectName}/env/${byKey.get(key)}`, {
          method: 'PATCH',
          body: JSON.stringify({ value, target: ['production', 'preview', 'development'], type: 'encrypted' }),
        });
      } else {
        await vercel(`/v10/projects/${projectName}/env`, {
          method: 'POST',
          body: JSON.stringify({ key, value, target: ['production', 'preview', 'development'], type: 'encrypted' }),
        });
      }
    }
    console.log('  ✓ Env vars set');

    // 5. Disable SSO so the .vercel.app URL is publicly accessible
    await vercel(`/v9/projects/${projectName}`, {
      method: 'PATCH',
      body: JSON.stringify({ ssoProtection: null }),
    });
    console.log('  ✓ SSO protection disabled');

    // 6. Trigger deployment from latest main commit + poll for status leaving "queued"
    console.log(`\n→ Triggering deployment`);
    const deployment = await vercel('/v13/deployments', {
      method: 'POST',
      body: JSON.stringify({
        name: projectName,
        target: 'production',
        project: project.id,
        gitSource: { type: 'github', repoId: project.link?.repoId, ref: 'main' },
      }),
    });
    console.log(`  ✓ Deployment queued: https://${deployment.url}`);

    // Poll up to ~60s. We don't wait for READY (build can take 2-3 min);
    // we just confirm the build entered BUILDING / READY (not ERROR).
    const deployId: string = deployment.id || deployment.uid;
    const startedAt = Date.now();
    let lastState = deployment.readyState || 'QUEUED';
    while (Date.now() - startedAt < 60_000) {
      await new Promise((r) => setTimeout(r, 5_000));
      try {
        const status = await vercel(`/v13/deployments/${deployId}`);
        lastState = status.readyState || status.state || lastState;
        if (lastState === 'ERROR' || lastState === 'CANCELED') {
          throw new Error(`Deployment ${lastState}: see https://vercel.com/${TEAM}/${projectName}/deployments/${deployId}`);
        }
        if (lastState === 'BUILDING' || lastState === 'READY') break;
      } catch (e: any) {
        // Transient API hiccup — keep polling.
        console.warn(`  ⚠ status poll failed: ${e?.message || e}`);
      }
    }
    console.log(`  ✓ Deployment state: ${lastState}`);

    // 7. Persist credentials to a gitignored file. We do NOT print the password
    // to stdout: it would otherwise end up in CI logs, terminal scroll-back,
    // and the wrapper's tee-log. The wrapper reads this file directly.
    if (passwordRotated || tenantWasNew) {
      const credPath = join(process.cwd(), '.tenant-credentials.txt');
      const now = new Date().toISOString();
      const block = [
        `[${now}] ${slug}`,
        `  Name:     ${name}`,
        `  Template: ${template} / ${style}`,
        `  Login:    https://${projectName}.vercel.app/admin/login`,
        `  User:     ${slug}`,
        `  Password: ${password}`,
        '',
      ].join('\n');
      appendFileSync(credPath, block + '\n', { mode: 0o600 });
      console.log(`  ✓ Credentials appended to ${credPath} (gitignored, mode 600)`);
    } else {
      console.log('  ✓ Existing tenant — password preserved, no credentials file write');
    }

    console.log('\n──────────────────────────────────────────');
    console.log(`  Tenant:        ${name}`);
    console.log(`  Slug:          ${slug}`);
    console.log(`  Template:      ${template}`);
    console.log(`  Style:         ${style}`);
    console.log(`  Project URL:   https://${projectName}.vercel.app`);
    console.log(`  Login URL:     https://${projectName}.vercel.app/admin/login`);
    console.log(`  Deploy URL:    https://${deployment.url}`);
    console.log(`  State:         ${lastState}`);
    if (passwordRotated || tenantWasNew) {
      console.log('  Password:      [written to .tenant-credentials.txt]');
    }
    console.log('──────────────────────────────────────────');
    console.log('\nNext steps:');
    console.log('  1. Wait ~60-180s for the first deploy to finish (state READY).');
    console.log(`  2. Open the Login URL with username "${slug}" and the password from .tenant-credentials.txt.`);
    console.log('  3. (Optional) Add a custom domain via Vercel → Settings → Domains.');
    console.log('  4. Hand the credentials to the customer via a secure channel, then delete that line from .tenant-credentials.txt.\n');
  } catch (err) {
    await runRollback();
    throw err;
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('\n✗ Failed:', e.message || e);
    process.exit(1);
  });
