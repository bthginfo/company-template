#!/usr/bin/env node
/**
 * Push the IONOS SMTP credentials (and any other env keys you want) to Vercel.
 *
 * Usage:
 *   1. Generate a Vercel access token: https://vercel.com/account/tokens
 *   2. Run:
 *        $env:VERCEL_TOKEN = "<your_token>"
 *        node scripts/push-vercel-envs.mjs
 *
 * What it does:
 *   - Reads SMTP_*, MAIL_* keys from .env.local
 *   - Pushes them to the linked Vercel project (.vercel/project.json) for production + preview + development
 *   - Updates them if they already exist (delete + recreate)
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM', 'MAIL_TO', 'MAIL_AUTOREPLY'];
const TARGETS = ['production', 'preview', 'development'];

function parseEnvFile(p) {
  if (!existsSync(p)) return {};
  const out = {};
  for (const raw of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 1) continue;
    const k = line.slice(0, eq).trim();
    let v = line.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[k] = v;
  }
  return out;
}

const envLocal = parseEnvFile(resolve(root, '.env.local'));
const project = JSON.parse(readFileSync(resolve(root, '.vercel/project.json'), 'utf8'));
const { projectId, orgId } = project;

const token = process.env.VERCEL_TOKEN;
if (!token) {
  console.error('Set VERCEL_TOKEN first. Get one at https://vercel.com/account/tokens');
  process.exit(1);
}

const base = `https://api.vercel.com`;
const teamQuery = orgId ? `?teamId=${orgId}` : '';

async function call(path, init = {}) {
  const r = await fetch(`${base}${path}${path.includes('?') ? '&' : (teamQuery ? teamQuery.replace('?', '&') : '')}${teamQuery && !path.includes('?') ? '' : ''}`.replace(/&$/, ''), {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await r.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!r.ok) {
    throw new Error(`${r.status} ${r.statusText} on ${path}: ${typeof body === 'string' ? body : JSON.stringify(body)}`);
  }
  return body;
}

async function listEnv() {
  return await call(`/v10/projects/${projectId}/env${teamQuery}`);
}
async function deleteEnv(id) {
  return await call(`/v9/projects/${projectId}/env/${id}${teamQuery}`, { method: 'DELETE' });
}
async function createEnv(key, value) {
  return await call(`/v10/projects/${projectId}/env${teamQuery}`, {
    method: 'POST',
    body: JSON.stringify({
      key,
      value,
      type: key === 'SMTP_PASS' ? 'encrypted' : 'plain',
      target: TARGETS,
    }),
  });
}

(async () => {
  const existing = await listEnv();
  const byKey = new Map();
  for (const e of existing.envs || []) {
    if (KEYS.includes(e.key)) {
      const arr = byKey.get(e.key) || [];
      arr.push(e);
      byKey.set(e.key, arr);
    }
  }

  for (const key of KEYS) {
    const value = envLocal[key];
    if (value == null || value === '') {
      console.log(`· skip ${key} (not in .env.local)`);
      continue;
    }
    // Delete existing entries for this key first.
    for (const e of byKey.get(key) || []) {
      await deleteEnv(e.id);
    }
    await createEnv(key, value);
    console.log(`✓ pushed ${key}`);
  }
  console.log('\nDone. Trigger a redeploy in Vercel for the new envs to take effect.');
})().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
