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
 *   VERCEL_SOURCE_PROJECT - project to copy shared env vars from (default: bth-studio-showcase)
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
import { SiteContentSchema, type SiteContent, type TemplateKey } from '../src/lib/types';

const [, , slug, name, template, styleArg] = process.argv;

const HELP = `\nUsage:\n  npm run tenant:provision -- <slug> "<Display Name>" <restaurant|salon|tradesman> [classic|modern|bold]\n\nExample:\n  npm run tenant:provision -- bella-roma "Trattoria Bella Roma" restaurant modern\n\nRequired env (in .env.local):\n  VERCEL_TOKEN, VERCEL_TEAM_ID, POSTGRES_URL, BLOB_READ_WRITE_TOKEN,\n  AUTH_SECRET, ADMIN_PASSWORD_HASH\n`;

if (slug === '--help' || slug === '-h') {
  console.log(HELP);
  process.exit(0);
}
if (!slug || !name || !template || !['restaurant', 'salon', 'tradesman'].includes(template)) {
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
const SOURCE = process.env.VERCEL_SOURCE_PROJECT || 'bth-studio-showcase';
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

const DEFAULT_CONTENT: Record<TemplateKey, SiteContent> = {
  restaurant: SiteContentSchema.parse({
    brand: { name, tagline: 'Authentische Küche aus der Region', primaryColor: '#9a3412' },
    hero: { title: `Willkommen bei ${name}`, subtitle: 'Frische, regionale Zutaten – mit Liebe zubereitet.', ctaLabel: 'Tisch reservieren', ctaHref: '#kontakt' },
    about: { title: 'Unsere Geschichte', body: 'Seit vielen Jahren bringen wir die kulinarische Tradition unserer Heimat auf Ihren Teller.' },
    services: [
      { title: 'Tagesmenü', description: 'Wechselnde Spezialitäten der Saison.', price: '14,90 €' },
      { title: 'Hauptgerichte', description: 'Klassiker und kreative Kreationen.', price: 'ab 16,50 €' },
    ],
    gallery: [],
    testimonials: [{ author: 'Sabine M.', text: 'Tolles Essen, herzliche Bedienung – wir kommen wieder!' }],
    contact: { phone: '', email: '', address: '', city: '', hours: [{ day: 'Mo–Fr', time: '11:30–22:00' }, { day: 'So', time: 'Ruhetag' }], mapsUrl: '' },
  }),
  salon: SiteContentSchema.parse({
    brand: { name, tagline: 'Ihr Salon für Stil & Wohlbefinden', primaryColor: '#be185d' },
    hero: { title: name, subtitle: 'Friseur · Beauty · Wohlfühlen', ctaLabel: 'Termin buchen', ctaHref: '#kontakt' },
    about: { title: 'Über uns', body: 'Unser Team aus erfahrenen Stylist:innen verwöhnt Sie in entspannter Atmosphäre.' },
    services: [
      { title: 'Damen-Schnitt', description: 'Inkl. Waschen & Styling.', price: '55 €' },
      { title: 'Färben & Strähnen', description: 'Hochwertige Pflegeprodukte.', price: 'ab 75 €' },
    ],
    gallery: [],
    testimonials: [{ author: 'Lisa K.', text: 'Endlich ein Salon, dem ich zu 100 % vertraue!' }],
    contact: { phone: '', email: '', address: '', city: '', hours: [{ day: 'Di–Fr', time: '09:00–19:00' }, { day: 'Sa', time: '09:00–15:00' }], mapsUrl: '' },
  }),
  tradesman: SiteContentSchema.parse({
    brand: { name, tagline: 'Ihr Meisterbetrieb in der Region', primaryColor: '#1d4ed8' },
    hero: { title: `${name} – schnell, sauber, zuverlässig`, subtitle: 'Über 20 Jahre Erfahrung. Festpreis-Garantie.', ctaLabel: 'Jetzt anfragen', ctaHref: '#kontakt' },
    about: { title: 'Über uns', body: 'Wir sind ein traditionsreicher Meisterbetrieb mit einem eingespielten Team.' },
    services: [
      { title: 'Reparaturen', description: 'Schnelle Hilfe bei allen Notfällen.', price: '79 €' },
      { title: 'Sanierung', description: 'Beratung, Planung, Ausführung.', price: 'auf Anfrage' },
    ],
    gallery: [],
    testimonials: [{ author: 'Familie Huber', text: 'Termin eingehalten, Preis eingehalten – ehrliche Arbeit.' }],
    contact: { phone: '', email: '', address: '', city: '', hours: [{ day: 'Mo–Fr', time: '07:00–17:00' }, { day: 'Notdienst', time: '24/7' }], mapsUrl: '' },
  }),
};

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
  const projectName = `bth-${slug}`;
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
  } else {
    const [row] = await db.insert(schema.tenants).values({ slug, name, template, style, passwordHash }).returning();
    tenantId = row.id;
    await db.insert(schema.siteContent).values({ tenantId, data: DEFAULT_CONTENT[template as TemplateKey] }).onConflictDoNothing();
    console.log(`  ✓ Tenant row + default content created`);
  }

  // 2. Source project — pull all env vars (decrypted)
  console.log(`\n→ Reading shared env vars from '${SOURCE}'`);
  const sourceEnv = await vercel(`/v9/projects/${SOURCE}/env?decrypt=true`);
  const envMap = new Map<string, string>();
  for (const e of sourceEnv.envs as Array<{ key: string; value: string; target: string[] }>) {
    if (SHARED_KEYS.includes(e.key) && !envMap.has(e.key)) envMap.set(e.key, e.value);
  }
  for (const k of SHARED_KEYS) {
    if (!envMap.has(k)) console.warn(`  ⚠ Source project missing ${k}`);
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
