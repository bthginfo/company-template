/**
 * End-to-end tenant provisioning.
 *
 * 1. Creates the tenant row in Postgres (+ default content)
 * 2. Generates a random tenant password and stores its bcrypt hash
 * 3. Creates a new Vercel project linked to the GitHub repo
 * 4. Copies shared env vars from the source project (POSTGRES_*, BLOB_*, AUTH_SECRET, ADMIN_PASSWORD_HASH)
 * 5. Adds tenant-specific env vars (TENANT_SLUG, VITE_TENANT_SLUG, VITE_TEMPLATE)
 * 6. Triggers the first production deployment
 *
 * Usage:
 *   npm run tenant:provision -- <slug> "<Display Name>" <restaurant|salon|tradesman> [classic|modern|bold]
 *
 * Required env vars (read from .env.local):
 *   VERCEL_TOKEN          - personal access token
 *   VERCEL_TEAM_ID        - team scope (team_...)

 *   GITHUB_REPO           - owner/repo (default: bthginfo/company-template)
 *   POSTGRES_URL          - already in .env.local after `vercel env pull`
 */
import * as dotenv from 'dotenv';
// Load both .env and .env.local (the latter holds VERCEL_TOKEN + POSTGRES_URL after `vercel env pull`)
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { db, schema } from '../src/lib/db/client';
import { SiteContentSchema, type SiteContent } from '../src/lib/types';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from '../src/lib/demo-content';
import { BRANCH_TEXT_DEFAULTS } from '../src/lib/branch-text-defaults';
import { defaultGalleryStory, defaultGalleryCategories, defaultArrival } from '../src/lib/section-defaults';

const VALID_TEMPLATES = ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism', 'consulting', 'medical', 'fitness'] as const;
type AnyTemplate = typeof VALID_TEMPLATES[number];

const RAW_ARGS = process.argv.slice(2);
const RESEED = RAW_ARGS.includes('--reseed');
const FILTERED = RAW_ARGS.filter((a) => a !== '--reseed');
const [slug, name, template, styleArg] = FILTERED;

const HELP = `\nUsage:\n  npm run tenant:provision -- <slug> "<Display Name>" <restaurant|salon|tradesman|hotel|tourism|consulting|medical|fitness> [classic|modern|bold]\n\nExample:\n  npm run tenant:provision -- bella-roma "Trattoria Bella Roma" restaurant modern\n  npm run tenant:provision -- praxis-lindner "Praxis Dr. Lindner" medical classic\n\nRequired env (in .env.local):\n  VERCEL_TOKEN, VERCEL_TEAM_ID, POSTGRES_URL, BLOB_READ_WRITE_TOKEN,\n  AUTH_SECRET, ADMIN_PASSWORD_HASH\n`;

if (slug === '--help' || slug === '-h') {
  console.log(HELP);
  process.exit(0);
}
if (!slug || !name || !template || !VALID_TEMPLATES.includes(template as AnyTemplate)) {
  console.error(HELP);
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`✗ Slug "${slug}" must contain only lowercase letters, digits, and dashes.`);
  process.exit(1);
}
const style: 'classic' | 'modern' | 'bold' =
  styleArg === 'modern' || styleArg === 'bold' ? styleArg : 'classic';

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

/** Defaults for branches that share the single-page ExtraBranchTemplate.
 *  We seed from the showcase demo content so the freshly provisioned site
 *  already looks complete; the admin can then customize via the editor. */
function extraDefaults(key: 'consulting' | 'medical' | 'fitness'): SiteContent {
  const base = EXTRA_DEMO_CONTENT[key];
  return SiteContentSchema.parse({
    ...base,
    brand: { ...base.brand, name },
    hero: { ...base.hero, title: name },
    branchText: { ...((base as any).branchText || {}), ...BRANCH_TEXT_DEFAULTS[key] },
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

  // 1. DB tenant + password
  const password = randomBytes(12).toString('base64').replace(/[+/=]/g, '').slice(0, 16);
  const passwordHash = bcrypt.hashSync(password, 10);

  const existing = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  let tenantId: string;
  if (existing) {
    await db.update(schema.tenants).set({ passwordHash, name, template, style }).where(eq(schema.tenants.id, existing.id));
    tenantId = existing.id;
    console.log(`  ✓ Tenant row updated (existed)`);
    if (RESEED) {
      const seed = defaultsFor(template as AnyTemplate);
      const hasContent = await db.query.siteContent.findFirst({ where: eq(schema.siteContent.tenantId, tenantId) });
      if (hasContent) {
        await db.update(schema.siteContent).set({ data: seed }).where(eq(schema.siteContent.tenantId, tenantId));
        console.log(`  ✓ Content reseeded from rich demo (--reseed)`);
      } else {
        await db.insert(schema.siteContent).values({ tenantId, data: seed });
        console.log(`  ✓ Content seeded (no prior row, --reseed)`);
      }
    }
  } else {
    const [row] = await db.insert(schema.tenants).values({ slug, name, template, style, passwordHash }).returning();
    tenantId = row.id;
    await db.insert(schema.siteContent).values({ tenantId, data: defaultsFor(template as AnyTemplate) }).onConflictDoNothing();
    console.log(`  ✓ Tenant row + default content created`);
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
  // AUTH_SECRET is per-project — generate a fresh one if not available as plaintext.
  if (!envMap.has('AUTH_SECRET')) {
    envMap.set('AUTH_SECRET', randomBytes(32).toString('base64url'));
    console.log('  ✓ AUTH_SECRET auto-generated (was not plaintext in .env.local)');
  }

  // 3. Create or fetch project
  let project: any;
  try {
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
  } catch (e: any) {
    if (String(e.message).includes('already exists') || String(e.message).includes('project_already_exists')) {
      project = await vercel(`/v9/projects/${projectName}`);
      console.log(`  ✓ Project already exists (${project.id})`);
    } else {
      throw e;
    }
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

  // Connect Blob store (if not already connected via shared env)
  // The shared env var BLOB_READ_WRITE_TOKEN is already set above, so the project
  // can read/write the blob store. No additional integration step needed.

  // 6. Trigger deployment from latest main commit
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

  console.log('\n──────────────────────────────────────────');
  console.log(`  Tenant:        ${name}`);
  console.log(`  Slug:          ${slug}`);
  console.log(`  Template:      ${template}`);
  console.log(`  Style:         ${style}`);
  console.log(`  Password:      ${password}`);
  console.log(`  Project URL:   https://${projectName}.vercel.app`);
  console.log(`  Login URL:     https://${projectName}.vercel.app/admin/login`);
  console.log(`  Deploy URL:    https://${deployment.url}`);
  console.log('──────────────────────────────────────────');
  console.log('\nNext steps:');
  console.log(`  1. Wait ~60s for the first deploy to finish.`);
  console.log(`  2. Open the Login URL with username "${slug}" and the password above.`);
  console.log(`  3. (Optional) Add a custom domain via Vercel → Settings → Domains.`);
  console.log(`  4. Save the password somewhere safe — it is not shown again.\n`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('\n✗ Failed:', e.message || e);
    process.exit(1);
  });
