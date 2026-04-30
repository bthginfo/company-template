import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';

const [, , slug, ...rest] = process.argv;
const KEEP_PROJECT = rest.includes('--keep-project');

const HELP = `\nUsage:\n  tsx scripts/delete-tenant.ts <slug> [--keep-project]\n\nDeletes tenant data from Postgres and (unless --keep-project) removes the Vercel project with the same name.\n`;

if (!slug || slug === '--help' || slug === '-h') {
  console.log(HELP);
  process.exit(slug ? 0 : 1);
}

function vercelFactory(token: string, team: string) {
  return async function vercel(path: string, init: RequestInit = {}) {
    const url = `https://api.vercel.com${path}${path.includes('?') ? '&' : '?'}teamId=${team}`;
    const res = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
    });
    const txt = await res.text();
    const json = txt ? JSON.parse(txt) : {};
    if (!res.ok) {
      const msg = `Vercel API ${res.status} ${path}: ${JSON.stringify(json)}`;
      throw new Error(msg);
    }
    return json;
  };
}

async function main() {
  console.log(`\n→ Deleting tenant '${slug}'\n`);

  const existing = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  if (!existing) {
    console.log('  • Tenant row not found in DB (nothing to delete there)');
  } else {
    await db.delete(schema.prospects).where(eq(schema.prospects.provisionedTenantSlug, slug));
    await db.delete(schema.tenants).where(eq(schema.tenants.id, existing.id));
    console.log('  ✓ Deleted tenant row (site_content removed by cascade)');
    console.log('  ✓ Cleared CRM links in prospects.provisionedTenantSlug');
  }

  if (KEEP_PROJECT) {
    console.log('  • Skipped Vercel project deletion (--keep-project)');
    return;
  }

  const token = process.env.VERCEL_TOKEN;
  const team = process.env.VERCEL_TEAM_ID;
  if (!token || !team) {
    console.log('  • Skipped Vercel deletion (missing VERCEL_TOKEN/VERCEL_TEAM_ID)');
    return;
  }

  const vercel = vercelFactory(token, team);
  try {
    await vercel(`/v9/projects/${slug}`, { method: 'DELETE' });
    console.log('  ✓ Deleted Vercel project');
  } catch (e: any) {
    const msg = String(e?.message || e);
    if (msg.includes('not_found') || msg.includes('404')) {
      console.log('  • Vercel project not found (already deleted)');
    } else {
      throw e;
    }
  }
}

main()
  .then(() => {
    console.log('\n✓ Tenant deletion finished\n');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n✗ Delete failed:', err?.message || err);
    process.exit(1);
  });
