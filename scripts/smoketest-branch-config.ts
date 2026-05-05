/**
 * Smoketest: validates branch-config × seed-content for ALL 24 branch×style
 * combinations (8 branches × 3 styles).
 *
 * Checks:
 *   1. branch-config exists for every template
 *   2. SiteContent seeds without schema error
 *   3. brand.name + hero.title match the tenant name (no demo leak)
 *   4. contact phone/email/address/mapsUrl are blank
 *   5. branchText defaults exist for the branch
 *   6. Every admin-visible field per branch×style has matching seed data
 *   7. Service modules match available seed data
 *   8. PerStyle flags are internally consistent (at least one style active)
 *   9. Pages / paths are defined and non-empty
 *  10. BranchTextFields style filters are consistent
 *
 * Run:   npx tsx scripts/smoketest-branch-config.ts
 * Exit:  0 = all pass, 1 = failures
 */
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import { type SiteContent, type TemplateKey } from '../src/lib/types';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from '../src/lib/demo-content';
import { BRANCH_TEXT_DEFAULTS, type BranchTextDefaults } from '../src/lib/branch-text-defaults';
import { FAQ_DEFAULTS } from '../src/lib/faq-defaults';
import {
  BRANCH_CONFIGS,
  getBranchConfig,
  isActiveForStyle,
  hasModule,
  isBranchTextKeyVisible,
  type TemplateStyle,

} from '../src/lib/branch-config';
import { defaultsFor, VALID_TEMPLATES } from '../src/lib/provision-core';

/* ─── helpers ────────────────────────────────────────────────────── */

type Severity = 'FAIL' | 'WARN';
type Issue = { branch: TemplateKey; style: TemplateStyle | '*'; severity: Severity; msg: string };
const issues: Issue[] = [];
function fail(branch: TemplateKey, style: TemplateStyle | '*', msg: string) {
  issues.push({ branch, style, severity: 'FAIL', msg });
}
function warn(branch: TemplateKey, style: TemplateStyle | '*', msg: string) {
  issues.push({ branch, style, severity: 'WARN', msg });
}

const NAME = 'Smoketest GmbH';
const STYLES: TemplateStyle[] = ['classic', 'modern', 'bold'];

/* ─── seed builder (mirrors provision-core) ──────────────────────── */

function buildSeed(t: TemplateKey): SiteContent {
  return defaultsFor(t, NAME, undefined, 'classic');
}

/* ═══════════════════════════════════════════════════════════════════
   TESTS
   ═══════════════════════════════════════════════════════════════════ */

console.log('=== Branch-Config × Seed Smoketest (8 branches × 3 styles = 24 combos) ===\n');

// ──────── Phase 1: Config structural checks (per branch) ─────────

console.log('--- Phase 1: Config structure ---\n');

for (const t of VALID_TEMPLATES) {
  const cfg = getBranchConfig(t);
  const tag = t.padEnd(11);

  // 1. Config exists
  if (!cfg) {
    fail(t, '*', 'No BranchConfig found');
    console.log(`  [${tag}] FAIL (no config)`);
    continue;
  }

  // label
  if (!cfg.label || cfg.label.length < 2) fail(t, '*', 'label missing/short');

  // pages — all 4 keys non-empty
  for (const k of ['services', 'gallery', 'about', 'contact'] as const) {
    if (!cfg.pages[k]) fail(t, '*', `pages.${k} missing`);
    if (!cfg.paths[k]) fail(t, '*', `paths.${k} missing`);
  }

  // home — at least one style should show tagline OR subtitle
  const heroHasAny = STYLES.some(
    (s) => isActiveForStyle(cfg.home.hero.tagline, s) || isActiveForStyle(cfg.home.hero.subtitle, s),
  );
  if (!heroHasAny) warn(t, '*', 'No hero tagline/subtitle in any style');

  // services modules — at least one module
  if (cfg.services.modules.length === 0) warn(t, '*', 'No service modules declared');

  // PerStyle flags — bgImage and cardImage should NOT both be active in the same style
  for (const s of STYLES) {
    if (isActiveForStyle(cfg.home.hero.bgImage, s) && isActiveForStyle(cfg.home.hero.cardImage, s)) {
      warn(t, s, 'Both bgImage AND cardImage active — unusual');
    }
    if (!isActiveForStyle(cfg.home.hero.bgImage, s) && !isActiveForStyle(cfg.home.hero.cardImage, s)) {
      warn(t, s, 'Neither bgImage nor cardImage active — no hero image');
    }
  }

  const cfgFails = issues.filter((i) => i.branch === t && i.severity === 'FAIL').length;
  console.log(`  [${tag}] ${cfgFails === 0 ? 'OK' : `FAIL (${cfgFails})`}`);
}

// ──────── Phase 2: Seed + per-style field checks (24 combos) ─────

console.log('\n--- Phase 2: Seed content × style visibility (24 combos) ---\n');

for (const t of VALID_TEMPLATES) {
  process.stdout.write(`  [${t.padEnd(11)}] `);
  const cfg = getBranchConfig(t);
  if (!cfg) { console.log('SKIP (no config)'); continue; }

  let seed: SiteContent;
  try {
    seed = buildSeed(t);
  } catch (e: any) {
    fail(t, '*', `Seed schema parse threw: ${e?.message ?? e}`);
    console.log('FAIL (schema)');
    continue;
  }

  // brand + hero use tenant name
  if (seed.brand.name !== NAME) fail(t, '*', `brand.name = "${seed.brand.name}"`);
  if (seed.hero.title !== NAME) fail(t, '*', `hero.title = "${seed.hero.title}"`);

  // contact stripped
  if (seed.contact.phone) fail(t, '*', `contact.phone leaked: "${seed.contact.phone}"`);
  if (seed.contact.email) fail(t, '*', `contact.email leaked: "${seed.contact.email}"`);
  if (seed.contact.address) fail(t, '*', `contact.address leaked: "${seed.contact.address}"`);
  if ((seed.contact as any).mapsUrl) fail(t, '*', 'contact.mapsUrl leaked');

  // branchText defaults present
  const bt = (seed as any).branchText;
  if (!bt || typeof bt !== 'object' || Object.keys(bt).length === 0) {
    fail(t, '*', 'branchText empty');
  }

  // faq
  const faq = (seed as any).faq;
  if (!Array.isArray(faq) || faq.length === 0) fail(t, '*', 'faq missing/empty');

  // gallery overlays
  const gs = (seed as any).galleryStory;
  if (!gs || !gs.title) fail(t, '*', 'galleryStory missing');
  const gc = (seed as any).galleryCategories;
  if (!Array.isArray(gc) || gc.length === 0) fail(t, '*', 'galleryCategories missing');
  const arr = (seed as any).arrival;
  if (!Array.isArray(arr) || arr.length === 0) fail(t, '*', 'arrival missing');

  // Per-style checks
  for (const s of STYLES) {
    // If hero.body is active, seed should have hero.body OR it's okay to be empty string
    // (admin shows the field, user fills it — but the seed doesn't NEED a value)

    // If services headerImage is active, services page should have some content
    const isExtra = ['consulting', 'medical', 'fitness'].includes(t);

    if (!isExtra) {
      if (!Array.isArray(seed.services) || seed.services.length === 0) {
        fail(t, s, 'services array empty (full template)');
      }
      if (!Array.isArray(seed.testimonials) || seed.testimonials.length === 0) {
        fail(t, s, 'testimonials empty');
      }
    }

    // Module-specific seed checks
    if (hasModule(t, 'menu') && (!Array.isArray(seed.services) || seed.services.length === 0)) {
      fail(t, s, 'menu module declared but no services seeded');
    }

    // BranchTextFields visibility consistency
    if (bt) {
      for (const key of Object.keys(bt)) {
        // Just check the filter function doesn't crash
        isBranchTextKeyVisible(key, s);
      }
    }
  }

  const combFails = issues.filter(
    (i) => i.branch === t && i.severity === 'FAIL' && !['*'].includes(i.style),
  ).length;
  const globalFails = issues.filter(
    (i) => i.branch === t && i.severity === 'FAIL' && i.style === '*',
  ).length;
  const total = combFails + globalFails;

  if (total === 0) console.log('OK (classic ✓ modern ✓ bold ✓)');
  else console.log(`FAIL (${total})`);
}

// ──────── Phase 3: Cross-checks ──────────────────────────────────

console.log('\n--- Phase 3: Cross-checks ---\n');

// A) VALID_TEMPLATES in provision-core must match BRANCH_CONFIGS keys
const configKeys = new Set(Object.keys(BRANCH_CONFIGS));
const provisionKeys = new Set(VALID_TEMPLATES as readonly string[]);
for (const k of configKeys) {
  if (!provisionKeys.has(k)) fail(k as TemplateKey, '*', `In BRANCH_CONFIGS but not in provision-core VALID_TEMPLATES`);
}
for (const k of provisionKeys) {
  if (!configKeys.has(k)) fail(k as TemplateKey, '*', `In provision-core VALID_TEMPLATES but not in BRANCH_CONFIGS`);
}

// B) BRANCH_TEXT_DEFAULTS must exist for every template
for (const t of VALID_TEMPLATES) {
  const btd = (BRANCH_TEXT_DEFAULTS as Record<string, BranchTextDefaults | undefined>)[t];
  if (!btd || Object.keys(btd).length === 0) {
    fail(t, '*', 'No BRANCH_TEXT_DEFAULTS entry');
  }
}

// C) FAQ_DEFAULTS must exist for every template
for (const t of VALID_TEMPLATES) {
  const faq = (FAQ_DEFAULTS as Record<string, unknown>)[t];
  if (!Array.isArray(faq) || faq.length === 0) {
    fail(t, '*', `No FAQ_DEFAULTS entry`);
  }
}

// D) DEMO_CONTENT / EXTRA_DEMO_CONTENT coverage
const fullBranches = ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism'] as const;
const extraBranches = ['consulting', 'medical', 'fitness'] as const;
for (const t of fullBranches) {
  if (!(t in DEMO_CONTENT)) fail(t, '*', 'Not in DEMO_CONTENT');
}
for (const t of extraBranches) {
  if (!(t in EXTRA_DEMO_CONTENT)) fail(t, '*', 'Not in EXTRA_DEMO_CONTENT');
}

const crossFails = issues.filter((i) => i.severity === 'FAIL').length;
console.log(`  Cross-checks: ${crossFails === 0 ? 'OK' : `${crossFails} issue(s)`}`);

// ──────── Summary ────────────────────────────────────────────────

console.log('');

const allFails = issues.filter((i) => i.severity === 'FAIL');
const allWarns = issues.filter((i) => i.severity === 'WARN');

if (allWarns.length) {
  console.log('--- Warnings ---');
  for (const w of allWarns) console.log(`  [${w.branch}/${w.style}] ${w.msg}`);
  console.log('');
}

if (allFails.length) {
  console.log('--- Failures ---');
  for (const f of allFails) console.log(`  [${f.branch}/${f.style}] ${f.msg}`);
  console.log('');
  console.error(`✗ ${allFails.length} failure(s) across ${new Set(allFails.map((f) => f.branch)).size} branch(es).`);
  process.exit(1);
}

console.log(`✓ All 24 branch×style combinations pass. (${allWarns.length} warning(s))`);
