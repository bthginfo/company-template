/**
 * Smoketest: programmatically build the seed SiteContent for every template
 * (using the same imports + logic as provision-tenant.ts) and assert that
 * each branch satisfies the customer-QA invariants:
 *
 *   1. Schema validates (.parse() does not throw)
 *   2. Brand name + hero title are the tenant name (not the demo's)
 *   3. Contact phone/email/address/mapsUrl are EMPTY (no demo leak),
 *      city is preserved
 *   4. faq has at least one entry
 *   5. galleryStory / galleryCategories / arrival are present and non-empty
 *   6. branchText has at least the defaults for the branch
 *   7. (full templates only) services/testimonials/gallery are non-empty
 *
 * Run: npx tsx scripts/smoketest-defaults.ts
 */
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import { SiteContentSchema, type SiteContent } from '../src/lib/types';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from '../src/lib/demo-content';
import { BRANCH_TEXT_DEFAULTS } from '../src/lib/branch-text-defaults';
import { defaultGalleryStory, defaultGalleryCategories, defaultArrival } from '../src/lib/section-defaults';
import { FAQ_DEFAULTS } from '../src/lib/faq-defaults';

const ALL = ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism', 'consulting', 'medical', 'fitness'] as const;
type T = typeof ALL[number];

function buildExtra(key: 'consulting' | 'medical' | 'fitness', name: string): SiteContent {
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

function buildFull(key: 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism', name: string): SiteContent {
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

function build(t: T, name: string): SiteContent {
  if (t === 'consulting' || t === 'medical' || t === 'fitness') return buildExtra(t, name);
  return buildFull(t as any, name);
}

type Issue = { branch: T; severity: 'FAIL' | 'WARN'; msg: string };
const issues: Issue[] = [];
function fail(branch: T, msg: string) { issues.push({ branch, severity: 'FAIL', msg }); }
function warn(branch: T, msg: string) { issues.push({ branch, severity: 'WARN', msg }); }

console.log('=== Provision-defaults smoketest (all 8 templates) ===\n');

const NAME = 'Smoketest GmbH';

for (const t of ALL) {
  process.stdout.write(`  [${t.padEnd(11)}] ... `);
  let c: SiteContent;
  try {
    c = build(t, NAME);
  } catch (e: any) {
    fail(t, `Schema parse threw: ${e?.message ?? e}`);
    console.log('FAIL (schema)');
    continue;
  }

  // 2. Brand + hero use tenant name
  if (c.brand.name !== NAME) fail(t, `brand.name = "${c.brand.name}" (expected "${NAME}")`);
  if (c.hero.title !== NAME) fail(t, `hero.title = "${c.hero.title}" (expected "${NAME}")`);

  // 3. Contact stripped
  if (c.contact.phone) fail(t, `contact.phone leaked: "${c.contact.phone}"`);
  if (c.contact.email) fail(t, `contact.email leaked: "${c.contact.email}"`);
  if (c.contact.address) fail(t, `contact.address leaked: "${c.contact.address}"`);
  if ((c.contact as any).mapsUrl) fail(t, `contact.mapsUrl leaked`);
  if (!c.contact.city) warn(t, `contact.city is empty (acceptable but unusual)`);

  // 4. faq present
  const faq = (c as any).faq;
  if (!Array.isArray(faq) || faq.length === 0) fail(t, `faq missing/empty`);

  // 5. overlays present
  const gs = (c as any).galleryStory;
  if (!gs || !gs.title) fail(t, `galleryStory missing/empty`);
  const gc = (c as any).galleryCategories;
  if (!Array.isArray(gc) || gc.length === 0) fail(t, `galleryCategories missing/empty`);
  const arr = (c as any).arrival;
  if (!Array.isArray(arr) || arr.length === 0) fail(t, `arrival missing/empty`);

  // 6. branchText overlay
  const bt = (c as any).branchText;
  if (!bt || typeof bt !== 'object' || Object.keys(bt).length === 0) fail(t, `branchText empty`);

  // 7. full-only checks
  const isExtra = t === 'consulting' || t === 'medical' || t === 'fitness';
  if (!isExtra) {
    if (!Array.isArray(c.services) || c.services.length === 0) fail(t, `services empty`);
    if (!Array.isArray(c.testimonials) || c.testimonials.length === 0) fail(t, `testimonials empty`);
    if (!Array.isArray(c.gallery) || c.gallery.length < 6) warn(t, `gallery has ${c.gallery?.length ?? 0} images (<6)`);
  }

  const branchFails = issues.filter((i) => i.branch === t && i.severity === 'FAIL').length;
  if (branchFails === 0) console.log('OK');
  else console.log(`FAIL (${branchFails})`);
}

console.log('');

const fails = issues.filter((i) => i.severity === 'FAIL');
const warns = issues.filter((i) => i.severity === 'WARN');

if (warns.length) {
  console.log('--- Warnings ---');
  for (const w of warns) console.log(`  [${w.branch}] ${w.msg}`);
  console.log('');
}

if (fails.length) {
  console.log('--- Failures ---');
  for (const f of fails) console.log(`  [${f.branch}] ${f.msg}`);
  console.log('');
  console.error(`✗ ${fails.length} failure(s) across ${new Set(fails.map((f) => f.branch)).size} branch(es).`);
  process.exit(1);
}

console.log(`✓ All 8 templates pass the provision-defaults smoketest.`);

// --- Bonus: cross-check raw demo content to confirm what the strip actually fixes
console.log('\n--- Demo-content sources (what the strip removes) ---');
for (const k of ['consulting', 'medical', 'fitness'] as const) {
  const d = (EXTRA_DEMO_CONTENT as any)[k]?.contact ?? {};
  console.log(`  EXTRA_DEMO_CONTENT.${k.padEnd(10)} phone=${JSON.stringify(d.phone || '')}  email=${JSON.stringify(d.email || '')}`);
}
for (const k of ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism'] as const) {
  const d = (DEMO_CONTENT as any)[k]?.contact ?? {};
  console.log(`  DEMO_CONTENT.${k.padEnd(10)}       phone=${JSON.stringify(d.phone || '')}  email=${JSON.stringify(d.email || '')}`);
}
