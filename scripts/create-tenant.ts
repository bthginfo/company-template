/**
 * Lightweight tenant creator — DB only (no Vercel deployment).
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  🤖 AI-AGENT? Lies zuerst docs/create-tenant.md und     │
 * │     AGENTS.md bevor du dieses Skript ausführst!          │
 * └──────────────────────────────────────────────────────────┘
 *
 * Delegates seed-content building to provision-core.defaultsFor() so the
 * logic stays in one place.  For full provisioning (DB + Vercel project +
 * deploy) use `scripts/provision-tenant.ts` or `scripts/new-tenant.ps1`.
 *
 * Usage:
 *   tsx scripts/create-tenant.ts <slug> "<Display Name>" <template> [style]
 *
 * Example:
 *   tsx scripts/create-tenant.ts pizzeria-roma "Pizzeria Roma" restaurant modern
 */
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { db, schema } from '../src/lib/db/client';
import {
  defaultsFor,
  VALID_TEMPLATES,
  VALID_STYLES,
  type AnyTemplate,
  type AnyStyle,
} from '../src/lib/provision-core';

const [, , slug, name, template, styleArg] = process.argv;

if (!slug || !name || !template) {
  console.error('Usage: tsx scripts/create-tenant.ts <slug> "<Display Name>" <template> [classic|modern|bold]');
  console.error(`  Templates: ${VALID_TEMPLATES.join(', ')}`);
  console.error(`  Styles:    ${VALID_STYLES.join(', ')} (default: classic)`);
  process.exit(1);
}

if (!VALID_TEMPLATES.includes(template as AnyTemplate)) {
  console.error(`Template "${template}" ungültig. Erlaubt: ${VALID_TEMPLATES.join(', ')}`);
  process.exit(1);
}
if (styleArg && !VALID_STYLES.includes(styleArg as AnyStyle)) {
  console.error(`Style "${styleArg}" ungültig. Erlaubt: ${VALID_STYLES.join(', ')}`);
  process.exit(1);
}

const style: AnyStyle = (styleArg as AnyStyle) || 'classic';

async function main() {
  const password = randomBytes(12).toString('base64').replace(/[+/=]/g, '').slice(0, 16);
  const passwordHash = bcrypt.hashSync(password, 12);

  const existing = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  let tenantId: string;

  if (existing) {
    await db.update(schema.tenants).set({ passwordHash, name, template, style }).where(eq(schema.tenants.id, existing.id));
    tenantId = existing.id;
    console.log(`Tenant '${slug}' already existed — password reset, name/template/style updated.`);
  } else {
    const [row] = await db
      .insert(schema.tenants)
      .values({ slug, name, template, style, passwordHash })
      .returning();
    tenantId = row.id;
    const content = defaultsFor(template as AnyTemplate, name, undefined, style);
    await db.insert(schema.siteContent).values({ tenantId, data: content }).onConflictDoNothing();
    console.log(`Tenant '${slug}' created with default content.`);
  }

  console.log('\n──────────────────────────────────────────');
  console.log(`  Tenant:   ${name}`);
  console.log(`  Slug:     ${slug}`);
  console.log(`  Template: ${template}`);
  console.log(`  Style:    ${style}`);
  console.log(`  Password: ${password}`);
  console.log('──────────────────────────────────────────');
  console.log('\nSet these env vars on the customer\'s Vercel project:');
  console.log(`  TENANT_SLUG=${slug}            (server)`);
  console.log(`  VITE_TENANT_SLUG=${slug}       (client)`);
  console.log(`  VITE_TEMPLATE=${template}      (client)`);
  console.log(`  VITE_STYLE=${style}            (client)`);
  console.log(`  AUTH_SECRET=<same as main>`);
  console.log(`  POSTGRES_URL=<same Neon url>`);
  console.log(`  BLOB_READ_WRITE_TOKEN=<same Blob token>`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
