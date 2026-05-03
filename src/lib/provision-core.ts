/**
 * Tenant provisioning core — used by both the CLI script and the CRM API.
 *
 * Pure logic: takes config, talks to Postgres + Vercel API, returns result.
 * No process.exit, no file writes, no console.log noise (caller passes onLog).
 *
 * Errors throw; on failure mid-flight we run the rollback stack the same way
 * the CLI does, so a partially-provisioned tenant doesn't leak resources.
 */
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { db, schema } from './db/client.js';
import { SiteContentSchema, type SiteContent } from './types.js';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from './demo-content.js';
import { BRANCH_TEXT_DEFAULTS } from './branch-text-defaults.js';
import { defaultGalleryStory, defaultGalleryCategories, defaultArrival } from './section-defaults.js';
import { FAQ_DEFAULTS } from './faq-defaults.js';
import { getPreset } from './theme.js';

export const VALID_TEMPLATES = ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism', 'consulting', 'medical', 'fitness'] as const;
export const VALID_STYLES = ['classic', 'modern', 'bold'] as const;
export type AnyTemplate = typeof VALID_TEMPLATES[number];
export type AnyStyle = typeof VALID_STYLES[number];

export const RESERVED_SLUGS = new Set([
  'admin', 'api', 'www', 'app', 'static', 'public', 'assets',
  'login', 'logout', 'session', 'preview', 'dashboard',
  'flamingomedia', 'flamingo-media', 'flamingo-crm',
]);

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

export type ProvisionInput = {
  slug: string;
  name: string;
  template: AnyTemplate;
  style?: AnyStyle;
  /** Optional theme preset id (e.g. 'espresso'). Applied to seeded brand content. */
  themePresetId?: string;
  /** If provided, use this as the admin password instead of generating one. */
  password?: string;
  reseed?: boolean;
  /** Optional: override the GitHub repo. Defaults to GITHUB_REPO env or bthginfo/company-template. */
  githubRepo?: string;
  /** Optional: explicit shared env vars that should win over process.env. */
  sharedEnvOverrides?: Partial<Record<string, string>>;
  /** Override polling. CLI waits ~60s; API endpoints should set false to return fast. */
  waitForBuild?: boolean;
  /** Verbose logger — defaults to no-op so the API stays quiet. */
  onLog?: (line: string) => void;
};

export type ProvisionResult = {
  slug: string;
  /** Vercel project name (production host is `<this>.vercel.app`). May differ from `slug` when Vercel auto-suffixes. */
  vercelProjectName: string;
  name: string;
  template: AnyTemplate;
  style: AnyStyle;
  tenantId: string;
  /** True if a fresh row was inserted in this run. Determines whether `password` is meaningful. */
  tenantWasNew: boolean;
  /** Plaintext password — only present for new tenants or --reseed runs. */
  password: string | null;
  /** Vercel project URL (the deployment may still be building). */
  projectUrl: string;
  loginUrl: string;
  /** Last deployment readyState seen ("QUEUED" | "BUILDING" | "READY" | …). */
  deploymentState: string;
  deploymentUrl: string;
};

export function validateSlug(slug: string): string | null {
  if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(slug) || slug.length < 2 || slug.length > 48) {
    return 'Slug muss 2–48 Zeichen sein: nur Kleinbuchstaben, Ziffern, Bindestriche; kein führender/letzter Strich.';
  }
  if (RESERVED_SLUGS.has(slug)) return `Slug "${slug}" ist reserviert.`;
  return null;
}

function extraDefaults(key: 'consulting' | 'medical' | 'fitness', name: string): SiteContent {
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
      phone: '', email: '', address: '',
      city: base.contact?.city || '',
      mapsUrl: '',
    },
  });
}

function fullDefaults(key: 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism', name: string): SiteContent {
  const base = DEMO_CONTENT[key];
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
      phone: '', email: '', address: '',
      city: base.contact?.city || '',
      mapsUrl: '',
    },
  });
}

export function defaultsFor(t: AnyTemplate, name: string, themePresetId?: string): SiteContent {
  const seeded = (t === 'consulting' || t === 'medical' || t === 'fitness')
    ? extraDefaults(t, name)
    : fullDefaults(t as 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism', name);

  if (!themePresetId) return seeded;
  const preset = getPreset(t, themePresetId);
  if (!preset) return seeded;

  return SiteContentSchema.parse({
    ...seeded,
    brand: {
      ...seeded.brand,
      themePresetId: preset.id,
      // Keep legacy color in sync for code paths that still read primaryColor.
      primaryColor: preset.primary,
    },
  });
}

function vercelFactory(token: string, team: string) {
  return async function vercel(path: string, init: RequestInit = {}): Promise<any> {
    const url = `https://api.vercel.com${path}${path.includes('?') ? '&' : '?'}teamId=${team}`;
    const r = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
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
  };
}

export async function provisionTenant(input: ProvisionInput): Promise<ProvisionResult> {
  const log = input.onLog ?? (() => {});
  const slug = input.slug;
  const name = input.name;
  const template = input.template;
  const style: AnyStyle = input.style ?? 'classic';
  const themePresetId = input.themePresetId?.trim() || undefined;
  const reseed = input.reseed ?? false;
  const waitForBuild = input.waitForBuild ?? false;

  // Validate inputs early.
  const slugErr = validateSlug(slug);
  if (slugErr) throw new Error(slugErr);
  if (!name || name.length < 2) throw new Error('Anzeigename ist zu kurz.');
  if (!VALID_TEMPLATES.includes(template)) throw new Error(`Template ungültig: ${template}`);
  if (!VALID_STYLES.includes(style)) throw new Error(`Style ungültig: ${style}`);

  const TOKEN = process.env.VERCEL_TOKEN;
  const TEAM = process.env.VERCEL_TEAM_ID;
  if (!TOKEN) throw new Error('VERCEL_TOKEN env var not set');
  if (!TEAM) throw new Error('VERCEL_TEAM_ID env var not set');
  const REPO = input.githubRepo || process.env.GITHUB_REPO || 'bthginfo/company-template';

  const vercel = vercelFactory(TOKEN, TEAM);
  const projectName = slug;
  log(`→ Provisioning '${slug}' as Vercel project '${projectName}'`);

  const rollback: Array<() => Promise<void>> = [];
  const runRollback = async () => {
    if (rollback.length === 0) return;
    log('↺ Rolling back resources created in this run …');
    for (const step of rollback.reverse()) {
      try { await step(); }
      catch (e: any) { log(`  ⚠ rollback step failed: ${e?.message || e}`); }
    }
  };

  // 1. DB tenant + password
  const password = (input.password && input.password.trim().length >= 8)
    ? input.password.trim()
    : randomBytes(12).toString('base64').replace(/[+/=]/g, '').slice(0, 16);
  const passwordHash = bcrypt.hashSync(password, 12);

  const existing = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  let tenantId: string;
  let tenantWasNew = false;
  let passwordRotated = false;

  try {
    if (existing) {
      tenantId = existing.id;
      await db.update(schema.tenants).set({ name, template, style }).where(eq(schema.tenants.id, existing.id));
      log('  ✓ Tenant row updated (existed) — password preserved');
      if (reseed) {
        const seed = defaultsFor(template, name, themePresetId);
        await db.insert(schema.siteContent)
          .values({ tenantId, data: seed })
          .onConflictDoUpdate({ target: schema.siteContent.tenantId, set: { data: seed } });
        log('  ✓ Content reseeded from rich demo (--reseed)');
      }
    } else {
      const [row] = await db.insert(schema.tenants)
        .values({ slug, name, template, style, passwordHash })
        .returning();
      tenantId = row.id;
      tenantWasNew = true;
      passwordRotated = true;
      const seed = defaultsFor(template, name, themePresetId);
      await db.insert(schema.siteContent)
        .values({ tenantId, data: seed })
        .onConflictDoUpdate({ target: schema.siteContent.tenantId, set: { data: seed } });
      log('  ✓ Tenant row + default content created');
      rollback.push(async () => {
        await db.delete(schema.siteContent).where(eq(schema.siteContent.tenantId, tenantId));
        await db.delete(schema.tenants).where(eq(schema.tenants.id, tenantId));
        log('  ↺ tenant + content rows deleted');
      });
    }

    // 2. Read shared env vars
    log('→ Reading shared env vars from process.env');
    const envMap = new Map<string, string>();
    for (const k of SHARED_KEYS) {
      const v = process.env[k];
      if (!v) {
        log(`  ⚠ env missing ${k}`);
        continue;
      }
      if (v.startsWith('eyJ') && v.length > 200) {
        log(`  ⚠ ${k} is a Vercel ciphertext blob — skipping`);
        continue;
      }
      envMap.set(k, v);
    }
    if (input.sharedEnvOverrides) {
      for (const [k, v] of Object.entries(input.sharedEnvOverrides)) {
        if (v && v.trim()) envMap.set(k, v.trim());
      }
    }
    if (!envMap.has('AUTH_SECRET')) {
      throw new Error('AUTH_SECRET nicht als Plaintext in der Umgebung. Alle Tenants müssen denselben AUTH_SECRET teilen.');
    }

    // 3. Project create-or-reuse
    let project: any;
    try {
      project = await vercel(`/v9/projects/${projectName}`);
      log(`  ✓ Vercel project already exists (${project.id}) — will update env + redeploy`);
    } catch (e: any) {
      if (!String(e.message).includes('not_found') && !String(e.message).includes('404')) throw e;
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
      log(`  ✓ Project created (${project.id})`);
      const projectId = project.id;
      rollback.push(async () => {
        await vercel(`/v9/projects/${projectId}`, { method: 'DELETE' }).catch(() => {});
        log(`  ↺ Vercel project ${projectId} deleted`);
      });
    }

    /** Vercel may suffix the project name when the requested name is taken (e.g. `foo` → `foo-abc12`). */
    const vercelProjectName =
      project && typeof project.name === 'string' && project.name.trim()
        ? project.name.trim()
        : projectName;
    if (vercelProjectName !== projectName) {
      log(`  ℹ Vercel-Projektname: “${vercelProjectName}” (Wunsch: “${projectName}”) — URLs folgen Vercel.`);
    }

    // 4. Set env vars
    const tenantEnv: Record<string, string> = {
      ...Object.fromEntries(envMap),
      TENANT_SLUG: slug,
      VITE_TENANT_SLUG: slug,
      VITE_TEMPLATE: template,
      VITE_STYLE: style,
    };
    log(`→ Setting ${Object.keys(tenantEnv).length} env vars on '${vercelProjectName}'`);
    const existingEnv = await vercel(`/v9/projects/${vercelProjectName}/env`);
    const byKey = new Map<string, string>();
    for (const e of existingEnv.envs as Array<{ id: string; key: string }>) byKey.set(e.key, e.id);
    for (const [key, value] of Object.entries(tenantEnv)) {
      if (byKey.has(key)) {
        await vercel(`/v9/projects/${vercelProjectName}/env/${byKey.get(key)}`, {
          method: 'PATCH',
          body: JSON.stringify({ value, target: ['production', 'preview', 'development'], type: 'encrypted' }),
        });
      } else {
        await vercel(`/v10/projects/${vercelProjectName}/env`, {
          method: 'POST',
          body: JSON.stringify({ key, value, target: ['production', 'preview', 'development'], type: 'encrypted' }),
        });
      }
    }
    log('  ✓ Env vars set');

    // 5. Disable SSO
    await vercel(`/v9/projects/${vercelProjectName}`, {
      method: 'PATCH',
      body: JSON.stringify({ ssoProtection: null }),
    });
    log('  ✓ SSO protection disabled');

    // 6. Trigger deployment
    log('→ Triggering deployment');
    const deployment = await vercel('/v13/deployments', {
      method: 'POST',
      body: JSON.stringify({
        name: vercelProjectName,
        target: 'production',
        project: project.id,
        gitSource: { type: 'github', repoId: project.link?.repoId, ref: 'main' },
      }),
    });
    log(`  ✓ Deployment queued: https://${deployment.url}`);

    let lastState = deployment.readyState || 'QUEUED';
    if (waitForBuild) {
      const deployId: string = deployment.id || deployment.uid;
      const startedAt = Date.now();
      while (Date.now() - startedAt < 60_000) {
        await new Promise((r) => setTimeout(r, 5_000));
        try {
          const status = await vercel(`/v13/deployments/${deployId}`);
          lastState = status.readyState || status.state || lastState;
          if (lastState === 'ERROR' || lastState === 'CANCELED') {
            throw new Error(`Deployment ${lastState}: see https://vercel.com/${TEAM}/${vercelProjectName}/deployments/${deployId}`);
          }
          if (lastState === 'BUILDING' || lastState === 'READY') break;
        } catch (e: any) {
          log(`  ⚠ status poll failed: ${e?.message || e}`);
        }
      }
    }
    log(`  ✓ Deployment state: ${lastState}`);

    void passwordRotated; // silence linter; CLI uses passwordHash separately

    return {
      slug,
      vercelProjectName,
      name,
      template,
      style,
      tenantId,
      tenantWasNew,
      password: tenantWasNew ? password : null,
      projectUrl: `https://${vercelProjectName}.vercel.app`,
      loginUrl: `https://${vercelProjectName}.vercel.app/admin/login`,
      deploymentState: lastState,
      deploymentUrl: `https://${deployment.url}`,
    };
  } catch (err) {
    await runRollback();
    throw err;
  }
}
