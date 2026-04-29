/**
 * Wilderin patch v3 — seeds the editable home action strip (homeStrip)
 * and signature heading (homeSignature) with Wilderin-tone content.
 *
 * Idempotent — only sets fields that are missing or explicitly stale.
 *
 * Usage:
 *   npx tsx scripts/patch-die-wilderin-strip.ts
 */
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client';

const SLUG = 'die-wilderin';

async function main() {
  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, SLUG) });
  if (!tenant) {
    console.error(`[patch] Tenant '${SLUG}' not found.`);
    process.exit(1);
  }
  const sc = await db.query.siteContent.findFirst({ where: eq(schema.siteContent.tenantId, tenant.id) });
  if (!sc) {
    console.error(`[patch] siteContent for '${SLUG}' not found.`);
    process.exit(1);
  }
  const data: any = sc.data;

  // ── Action strip directly under the hero ─────────────────────────────
  data.homeStrip = {
    eyebrow: 'Heute geöffnet',
    hint: 'Di–So & Feiertage · 17:00 – 24:00 · Mo Ruhetag',
    primaryLabel: 'Tisch reservieren',
    secondaryLabel: 'Speisekarte ansehen',
    secondaryHref: '/speisekarte',
    ...(data.homeStrip || {}),
  };

  // ── Signature block heading on the home page ──────────────────────────
  data.homeSignature = {
    eyebrow: 'Empfehlung des Hauses',
    titleA: 'Heute',
    titleB: 'auf der Karte.',
    intro: 'Die Köchin schreibt jeden Morgen frisch — was die Lieferanten bringen, kommt auf den Tisch.',
    ...(data.homeSignature || {}),
  };

  await db.update(schema.siteContent).set({ data }).where(eq(schema.siteContent.tenantId, tenant.id));
  console.log(`[patch] '${SLUG}' updated: homeStrip + homeSignature.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
