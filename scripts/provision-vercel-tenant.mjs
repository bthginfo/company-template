#!/usr/bin/env node
/**
 * Provisions a new Vercel project for a tenant by:
 *  1. Creating the project (or reusing existing) under the configured team
 *  2. Linking it to the GitHub repo (bthginfo/company-template, branch main)
 *  3. Copying ALL env vars from the source project (this repo's linked project)
 *     and adding tenant-specific TENANT_SLUG / VITE_TENANT_SLUG / VITE_TEMPLATE
 *  4. Triggering an initial deployment
 *
 * Usage:
 *   $env:VERCEL_TOKEN="<token>"; node scripts/provision-vercel-tenant.mjs <slug> <template>
 *   e.g. node scripts/provision-vercel-tenant.mjs die-wilderin restaurant
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const [, , slug, template] = process.argv;
if (!slug || !template) {
  console.error('Usage: node scripts/provision-vercel-tenant.mjs <slug> <template>');
  process.exit(1);
}

const token = process.env.VERCEL_TOKEN;
if (!token) { console.error('Set VERCEL_TOKEN'); process.exit(1); }

const sourceProject = JSON.parse(readFileSync(resolve(root, '.vercel/project.json'), 'utf8'));
const teamId = sourceProject.orgId;
const SOURCE_PROJECT_ID = sourceProject.projectId;
const GH_OWNER = 'bthginfo';
const GH_REPO = 'company-template';

const base = 'https://api.vercel.com';
const tq = teamId ? `teamId=${teamId}` : '';
const withTeam = (path) => `${base}${path}${path.includes('?') ? '&' : '?'}${tq}`;

async function api(path, init = {}) {
  const r = await fetch(withTeam(path), {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const txt = await r.text();
  let body; try { body = JSON.parse(txt); } catch { body = txt; }
  if (!r.ok) {
    const msg = typeof body === 'string' ? body : JSON.stringify(body);
    throw new Error(`${init.method || 'GET'} ${path} → ${r.status}: ${msg}`);
  }
  return body;
}

console.log(`[provision] team=${teamId}`);
console.log(`[provision] source project=${SOURCE_PROJECT_ID}`);
console.log(`[provision] target slug=${slug} template=${template}`);

// 1. Read shared env vars from local .env.local (these are PLAINTEXT — Vercel's
//    decrypt=true API does not return real values for "sensitive" envs, so we
//    rely on the local file populated by `vercel env pull`).
function parseDotenv(filePath) {
  const out = {};
  let txt = '';
  try { txt = readFileSync(filePath, 'utf8'); } catch { return out; }
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/i);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    // Skip clearly-encrypted ciphertexts that vercel env pull leaves for sensitive vars
    if (v.startsWith('eyJ') && v.length > 200) continue;
    if (!(m[1] in out)) out[m[1]] = v; // first occurrence wins
  }
  return out;
}

const localEnv = parseDotenv(resolve(root, '.env.local'));
const ALWAYS_COPY = [
  'POSTGRES_URL', 'POSTGRES_URL_NON_POOLING', 'POSTGRES_URL_NO_SSL', 'POSTGRES_PRISMA_URL',
  'POSTGRES_USER', 'POSTGRES_HOST', 'POSTGRES_PASSWORD', 'POSTGRES_DATABASE',
  'AUTH_SECRET', 'ADMIN_PASSWORD_HASH', 'BLOB_READ_WRITE_TOKEN',
  'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS',
  'MAIL_FROM', 'MAIL_TO', 'MAIL_AUTOREPLY',
];
const sharedEnv = Object.fromEntries(
  ALWAYS_COPY.filter((k) => localEnv[k]).map((k) => [k, localEnv[k]]),
);
const missing = ALWAYS_COPY.filter((k) => !sharedEnv[k]);
// AUTH_SECRET is per-project — fine to auto-generate when missing.
if (!sharedEnv.AUTH_SECRET) {
  sharedEnv.AUTH_SECRET = randomBytes(32).toString('base64url');
  console.log('[provision]   AUTH_SECRET not in .env.local — generated a fresh one');
}
const stillMissing = missing.filter((k) => !sharedEnv[k]);
if (stillMissing.length) {
  console.warn(`[provision] ⚠ missing in .env.local (will skip): ${stillMissing.join(', ')}`);
}
console.log(`[provision] copying ${Object.keys(sharedEnv).length} shared env keys from .env.local`);

// 2. Create or reuse target project
let project;
try {
  project = await api(`/v9/projects/${slug}`);
  console.log(`[provision] project '${slug}' already exists (id=${project.id})`);
} catch (e) {
  if (!String(e).includes('404')) throw e;
  console.log(`[provision] creating project '${slug}'…`);
  project = await api('/v11/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: slug,
      framework: 'vite',
      gitRepository: { type: 'github', repo: `${GH_OWNER}/${GH_REPO}` },
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      installCommand: 'npm install',
    }),
  });
  console.log(`[provision] created project id=${project.id}`);
}

// 3. Build full env list
const tenantEnvs = [
  { key: 'TENANT_SLUG',       value: slug,     target: ['production', 'preview', 'development'], type: 'plain' },
  { key: 'VITE_TENANT_SLUG',  value: slug,     target: ['production', 'preview', 'development'], type: 'plain' },
  { key: 'VITE_TEMPLATE',     value: template, target: ['production', 'preview', 'development'], type: 'plain' },
  ...Object.entries(sharedEnv).map(([key, value]) => ({
    key,
    value,
    target: ['production', 'preview', 'development'],
    type: 'encrypted',
  })),
];

// 4. Read existing env on target, delete keys we are about to (re)set
const existing = await api(`/v9/projects/${project.id}/env`);
for (const ex of existing.envs || []) {
  if (tenantEnvs.find((n) => n.key === ex.key)) {
    console.log(`[provision]   deleting existing ${ex.key} (id=${ex.id})…`);
    await api(`/v9/projects/${project.id}/env/${ex.id}`, { method: 'DELETE' });
  }
}

// 5. Push env vars (bulk create)
console.log('[provision] pushing env vars…');
await api(`/v10/projects/${project.id}/env?upsert=true`, {
  method: 'POST',
  body: JSON.stringify(tenantEnvs),
});
console.log(`[provision]   pushed ${tenantEnvs.length} env vars`);

// 6. Trigger deployment from main
console.log('[provision] triggering deployment from main…');
const dep = await api('/v13/deployments', {
  method: 'POST',
  body: JSON.stringify({
    name: slug,
    project: project.id,
    target: 'production',
    gitSource: { type: 'github', org: GH_OWNER, repo: GH_REPO, ref: 'main' },
  }),
});
console.log(`[provision]   deployment id=${dep.id} url=https://${dep.url}`);

console.log('\n──────────────────────────────────────────');
console.log(`  Vercel project: ${slug}`);
console.log(`  Project URL:    https://vercel.com/${teamId.replace('team_', '')}/${slug}`);
console.log(`  Default URL:    https://${slug}.vercel.app`);
console.log(`  First deploy:   https://${dep.url}`);
console.log('──────────────────────────────────────────');
console.log('Next: add a custom domain via the Vercel dashboard if you want a vanity URL.');
