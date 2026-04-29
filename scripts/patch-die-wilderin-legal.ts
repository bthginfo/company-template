/**
 * One-shot patch for "die Wilderin": adds Impressum, Datenschutz date,
 * plus seeds the new editable headings (contactBlock, arrivalSection, ctaBandOverride)
 * with sensible Wilderin-tone defaults. Idempotent — only sets fields that are missing
 * or that we explicitly want to overwrite.
 *
 * Usage:
 *   npx tsx scripts/patch-die-wilderin-legal.ts
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

  // ── Legal ────────────────────────────────────────────────────────────
  data.legal = data.legal ?? {};
  data.legal.imprint = {
    legalName: 'die Wilderin GmbH',
    representative: 'Geschäftsführerin Claudia Kogler',
    street: 'Seilergasse 5',
    city: '6020 Innsbruck',
    country: 'Österreich',
    uid: 'ATU82076147',
    register: '',
    authority: 'Bezirkshauptmannschaft Innsbruck',
    chamber: 'Wirtschaftskammer Tirol, Fachgruppe Gastronomie',
    extra: '',
    bodyHtml: '',
    ...(data.legal.imprint || {}),
  };
  data.legal.privacy = {
    effectiveDate: 'April 2026',
    bodyHtml: '',
    ...(data.legal.privacy || {}),
  };

  // ── Contact details (make sure phone/email match owner-supplied) ────
  data.contact = data.contact || {};
  if (!data.contact.phone) data.contact.phone = '+43 512 562728';
  if (!data.contact.email) data.contact.email = 'info@diewilderin.at';

  // ── Section headings (only if missing — don't overwrite custom edits) ─
  if (!data.contactBlock) {
    data.contactBlock = {
      eyebrow: 'Reservierung & Kontakt',
      title: 'Tisch reservieren',
      subtitle: 'Wir freuen uns auf Ihren Besuch in der Seilergasse — gleich anrufen oder schreiben.',
    };
  }
  if (!data.arrivalSection) {
    data.arrivalSection = {
      eyebrow: 'So finden Sie uns',
      title: 'Mitten in der Innsbrucker Altstadt',
    };
  }
  if (!data.ctaBandOverride) {
    data.ctaBandOverride = {
      eyebrow: 'Reservieren',
      leadAccent: 'Tisch frei?',
      lead: 'Rufen Sie uns an oder schreiben Sie uns — wir richten alles für Sie her.',
      sub: 'Mo–Sa ab 17:00 Uhr · Küche bis 22:00',
      cta: 'Jetzt reservieren',
    };
  }

  await db.update(schema.siteContent).set({ data }).where(eq(schema.siteContent.tenantId, tenant.id));
  console.log(`[patch] '${SLUG}' updated: legal + contact + section headings.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
