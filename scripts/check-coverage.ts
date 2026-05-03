/* eslint-disable no-console */
/**
 * Drift coverage check — prevents admin↔frontend mismatch.
 *
 * Verifies for every (branch × style × page) combo (8 × 3 × 5 = 120) that:
 *  1. `getAdminSections(...)` returns valid, non-duplicate keys.
 *  2. Every returned key has a renderer `case` in the matching page editor
 *     (declared via `HANDLED_SECTIONS_BY_PAGE`).
 *  3. Every `cfg.services.modules` entry maps to an admin section via
 *     `MODULE_TO_KEY`.
 *  4. Per-section dataKeys (`section-registry.ts`) actually appear in both
 *     the frontend renderer and the admin editor source files (text grep).
 *  5. Branch invariants: extras have compact subpages disabled, core 5
 *     have them all enabled.
 *  6. Frontend home order (`BRANCH_STYLE_ORDER` / `EXTRA_HOME_ORDER`) ↔
 *     admin home order parity. Every frontend section is reachable in
 *     the admin (either in HOME_ORDER or as global data).
 *
 * Exit code: 0 = all green, 1 = drift detected. Wired into `npm run build`.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { BRANCH_CONFIGS, isExtraBranch } from '../src/lib/branch-config';
import type { TemplateKey } from '../src/lib/types';
import type { TemplateStyle } from '../src/lib/branch-config';
import {
  getAdminSections,
  HANDLED_SECTIONS_BY_PAGE,
  MODULE_TO_KEY,
  type AdminSectionKey,
  type PageKey,
} from '../src/admin/admin-sections';
import { SECTION_CONTRACTS, CATALOG_TO_ADMIN, CROSS_PAGE_TARGETS } from '../src/lib/section-registry';
import { BRANCH_STYLE_ORDER } from '../src/lib/template-orders';
import { EXTRA_HOME_ORDER, SECTION_CATALOG } from '../src/lib/page-layout';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

const TEMPLATES: TemplateKey[] = Object.keys(BRANCH_CONFIGS) as TemplateKey[];
const STYLES: TemplateStyle[] = ['classic', 'modern', 'bold'];
const PAGES: PageKey[] = ['home', 'services', 'gallery', 'about', 'contact'];

const errors: string[] = [];
const note = (msg: string) => errors.push(msg);

/* ─────────────────────────────────────────────────────────────────
 *  1 + 2: getAdminSections produces well-formed, handled keys
 * ───────────────────────────────────────────────────────────────── */
for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    for (const page of PAGES) {
      const sections = getAdminSections(page, tpl, style);
      if (sections.length === 0) {
        note(`[empty] ${tpl}/${style}/${page}: getAdminSections returned an empty list`);
        continue;
      }
      const seen = new Set<AdminSectionKey>();
      for (const key of sections) {
        if (seen.has(key)) note(`[dup] ${tpl}/${style}/${page}: section "${key}" appears twice`);
        seen.add(key);
      }
      const handled = new Set(HANDLED_SECTIONS_BY_PAGE[page]);
      for (const key of sections) {
        if (!handled.has(key)) {
          note(`[no-renderer] ${tpl}/${style}/${page}: admin lists "${key}" but no case in the page editor`);
        }
        if (!(key in SECTION_CONTRACTS)) {
          note(`[no-contract] ${tpl}/${style}/${page}: section "${key}" has no entry in SECTION_CONTRACTS`);
        }
      }
    }
  }
}

/* ─────────────────────────────────────────────────────────────────
 *  3: ServiceModule → MODULE_TO_KEY exhaustive
 * ───────────────────────────────────────────────────────────────── */
for (const tpl of TEMPLATES) {
  for (const mod of BRANCH_CONFIGS[tpl].services.modules) {
    if (!(mod in MODULE_TO_KEY)) {
      note(`[no-module-key] ${tpl}: cfg.services.modules contains "${mod}" but no MODULE_TO_KEY entry`);
    }
  }
}

/* ─────────────────────────────────────────────────────────────────
 *  4: Per-section dataKeys are mentioned in renderer + editor source
 *
 *  We do a text grep over the candidate source files. This is a
 *  pragmatic check (not AST), but it catches every "field renamed in
 *  one place but not the other" drift case.
 * ───────────────────────────────────────────────────────────────── */
const FRONTEND_SOURCES = [
  'src/templates/_shared/TemplateApp.tsx',
  'src/templates/_shared/BranchSignature.tsx',
  'src/templates/extra/index.tsx',
  'src/components/branch-modules.tsx',
  'src/components/site-blocks.tsx',
  'src/components/News.tsx',
  'src/components/Timeline.tsx',
].map((p) => readFileSync(join(repoRoot, p), 'utf8')).join('\n');

const ADMIN_SOURCES = [
  'src/admin/AdminEditorBody.tsx',
].map((p) => readFileSync(join(repoRoot, p), 'utf8')).join('\n');

/**
 * Some dataKeys are aggregate concepts that are actually written via a
 * sub-key in the editor (e.g. the editor writes `ctaBandOverrides` then
 * indexes by page; we accept any mention of the prefix). Some are
 * dynamically constructed (e.g. `${field}Header` so `contactPageHeader`
 * never appears literally — only `contactPage` does). Allow a path to
 * be matched as either the literal path OR its tail OR its
 * suffix-stripped prefix for common patterns.
 */
function mentions(haystack: string, path: string): boolean {
  if (haystack.includes(path)) return true;
  // Accept mentions of the leading object, e.g. `branchText.foo` is OK if
  // the file references the destructured `foo` from a `bt` alias.
  const tail = path.split('.').pop();
  if (tail && haystack.includes(tail)) return true;
  // Dynamic construction patterns: `${field}Header` / `${prefix}Override` /
  // `${section}Eyebrow` etc. — strip a known camelcase suffix and match
  // the prefix.
  for (const suffix of ['Header', 'Override', 'Overrides']) {
    if (tail && tail.endsWith(suffix) && tail.length > suffix.length) {
      const prefix = tail.slice(0, -suffix.length);
      if (haystack.includes(prefix)) return true;
    }
  }
  return false;
}

for (const contract of Object.values(SECTION_CONTRACTS)) {
  for (const path of contract.dataKeys) {
    if (!mentions(FRONTEND_SOURCES, path)) {
      note(`[orphan-frontend] section "${contract.key}" declares dataKey "${path}" but no frontend source references it`);
    }
    if (!mentions(ADMIN_SOURCES, path)) {
      note(`[orphan-admin] section "${contract.key}" declares dataKey "${path}" but the admin editor source does not reference it`);
    }
  }
}

/* ─────────────────────────────────────────────────────────────────
 *  5: Branch invariants — extras compact, core 5 full
 * ───────────────────────────────────────────────────────────────── */
for (const tpl of TEMPLATES) {
  const cfg = BRANCH_CONFIGS[tpl];
  const isExtra = isExtraBranch(tpl);
  const expectFull = !isExtra;

  type Path = [keyof typeof cfg, string];
  const flagPaths: Path[] = [
    ['services', 'showHighlights'], ['services', 'showFaq'], ['services', 'showCta'],
    ['gallery', 'showStory'], ['gallery', 'showCategories'], ['gallery', 'showCta'],
    ['about', 'showValues'], ['about', 'showNumbers'], ['about', 'showCta'],
    ['contact', 'showForm'], ['contact', 'showArrival'], ['contact', 'showCta'],
  ];
  for (const [section, flag] of flagPaths) {
    const value = (cfg[section] as Record<string, unknown>)[flag];
    if (expectFull && value !== true) {
      note(`[invariant] ${tpl}: cfg.${String(section)}.${flag} should be true for core branches (got ${value})`);
    }
    if (!expectFull && value !== false) {
      note(`[invariant] ${tpl}: cfg.${String(section)}.${flag} should be false for extra branches (got ${value})`);
    }
  }

  // Extras don't render the softCta band or the modern logo strip.
  if (isExtra) {
    const allFalse = (s: { classic: boolean; modern: boolean; bold: boolean }) =>
      !s.classic && !s.modern && !s.bold;
    if (!allFalse(cfg.home.softCtaFields)) {
      note(`[invariant] ${tpl}: cfg.home.softCtaFields should be NONE for extras`);
    }
    if (!allFalse(cfg.home.logoStrip)) {
      note(`[invariant] ${tpl}: cfg.home.logoStrip should be NONE for extras`);
    }
  }
}

/* ─────────────────────────────────────────────────────────────────
 *  6: Frontend home order ↔ admin HOME_ORDER parity
 *
 *  Mapping admin section key → frontend section key (in BRANCH_STYLE_ORDER /
 *  EXTRA_HOME_ORDER). `null` = the admin section drives no frontend block
 *  in the order array (e.g. `announcements`, `hero`, `softCta` are rendered
 *  outside the order, `heroBadge` is inline in chips).
 * ───────────────────────────────────────────────────────────────── */
const ADMIN_TO_FRONTEND_HOME: Record<AdminSectionKey, string | null> = {
  // null = the admin card edits data that the frontend consumes somewhere
  // on the home page, but not via a discrete entry in the order array.
  announcements: null, hero: null, softCta: null, heroBadge: null,
  // `marquee` is a separate block in extras-bold home order, but inlined
  // into the hero in core-5 bold. Either way it edits branchText.marqueeWords
  // which the dataKey check verifies is consumed.
  marquee: null,
  actionStrip: 'action', branchChips: 'chips',
  signature: 'signature', services: 'services', numbers: 'numbers',
  about: 'about', gallery: 'gallery', logos: 'logos',
  testimonials: 'testimonials', news: 'news',
  funding: 'funding', spotlight: 'spotlight',
  // not used on home — keep them mapped so TS exhaustiveness is happy
  servicesHeader: null, highlights: null, menu: null, rooms: null,
  tours: null, treatments: null, courses: null, packages: null,
  processSteps: null, doctors: null, booking: null, fundingModule: null,
  emergencyBanner: null, programs: null, medicalNotice: null,
  serviceProcess: null, faq: null, servicesCta: null,
  galleryHeader: null, galleryStory: null, galleryUpload: null,
  galleryGrid: null, galleryCategories: null, galleryCta: null,
  aboutHeader: null, aboutIntro: null, values: null, timeline: null,
  team: null, aboutNumbers: null, certifications: null, press: null,
  aboutTestimonials: null, aboutCta: null,
  contactHeader: null, contactDetails: null, contactForm: null,
  locations: null, arrival: null, contactCta: null,
};

/** Frontend keys that are intentionally edited elsewhere than the home admin. */
const FRONTEND_HOME_KEYS_EDITED_ELSEWHERE = new Set([
  'branchModules', // edited via Services-Page module editors
  'team',          // edited via About-Page team editor
  'contact',       // edited via global Kontaktdaten page
  // `marquee` is a separate block in extras-bold but inlined into the
  // hero in core-5-bold. The marquee admin card edits the data either
  // way; the dataKey check verifies frontend consumption.
  'marquee',
]);

for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    const adminOrder = getAdminSections('home', tpl, style);
    const frontendOrder: readonly string[] = isExtraBranch(tpl)
      ? EXTRA_HOME_ORDER[tpl as 'consulting' | 'medical' | 'fitness'][style]
      : BRANCH_STYLE_ORDER[tpl as 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism'][style];

    // Admin shows X => frontend should render X
    for (const adminKey of adminOrder) {
      const frontKey = ADMIN_TO_FRONTEND_HOME[adminKey];
      if (frontKey === null) continue;
      if (!frontendOrder.includes(frontKey)) {
        note(`[admin-overshoot] ${tpl}/${style}: admin shows "${adminKey}" but frontend home order doesn't include "${frontKey}"`);
      }
    }

    // Frontend renders X => admin should let user edit X
    for (const frontKey of frontendOrder) {
      if (FRONTEND_HOME_KEYS_EDITED_ELSEWHERE.has(frontKey)) continue;
      const adminKey = (Object.entries(ADMIN_TO_FRONTEND_HOME) as [AdminSectionKey, string | null][])
        .find(([, v]) => v === frontKey)?.[0];
      if (!adminKey) {
        note(`[admin-undershoot] ${tpl}/${style}: frontend renders "${frontKey}" but no admin section maps to it`);
        continue;
      }
      if (!adminOrder.includes(adminKey)) {
        note(`[admin-undershoot] ${tpl}/${style}: frontend renders "${frontKey}" but admin "${adminKey}" not in HOME_ORDER`);
      }
    }
  }
}

/* ─────────────────────────────────────────────────────────────────
 *  7: Catalog ↔ admin mapping is exhaustive
 *
 *  Every key in `SECTION_CATALOG[page]` must have an entry in
 *  `CATALOG_TO_ADMIN[page]` (either an admin section or explicit null).
 *  Every non-null mapping must point to a known admin section that has
 *  a renderer case AND an entry in `SECTION_CONTRACTS`. Cross-page
 *  targets must reference a real admin page.
 * ───────────────────────────────────────────────────────────────── */
const ADMIN_PAGES: PageKey[] = ['home', 'services', 'gallery', 'about', 'contact'];

for (const page of ADMIN_PAGES) {
  const catalogKeys = SECTION_CATALOG[page].map((s) => s.key);
  const mapping = CATALOG_TO_ADMIN[page];
  for (const cat of catalogKeys) {
    if (!(cat in mapping)) {
      note(`[catalog-unmapped] page="${page}": catalog key "${cat}" has no entry in CATALOG_TO_ADMIN`);
      continue;
    }
    const adminKey = mapping[cat];
    if (adminKey === null) continue; // intentionally not editable
    if (!(adminKey in SECTION_CONTRACTS)) {
      note(`[catalog-bad-mapping] page="${page}": "${cat}" → "${adminKey}" but admin key not in SECTION_CONTRACTS`);
    }
    if (!HANDLED_SECTIONS_BY_PAGE[page].includes(adminKey) && !CROSS_PAGE_TARGETS[adminKey]) {
      note(`[catalog-no-editor] page="${page}": "${cat}" → "${adminKey}" but admin has no editor on this page and no CROSS_PAGE_TARGETS entry`);
    }
  }
  // Reverse: keys declared in CATALOG_TO_ADMIN that aren't in the catalog.
  for (const cat of Object.keys(mapping)) {
    if (!catalogKeys.includes(cat)) {
      note(`[catalog-stale-mapping] page="${page}": CATALOG_TO_ADMIN has "${cat}" but SECTION_CATALOG.${page} doesn't`);
    }
  }
}

// CROSS_PAGE_TARGETS sanity: target page must be a valid admin page and
// have the referenced admin section as an editor.
for (const [adminKey, target] of Object.entries(CROSS_PAGE_TARGETS)) {
  if (!target) continue;
  if (!ADMIN_PAGES.includes(target.page)) {
    note(`[cross-page-bad-target] "${adminKey}": target page "${target.page}" is not a real admin page`);
    continue;
  }
  if (!HANDLED_SECTIONS_BY_PAGE[target.page].includes(adminKey as AdminSectionKey)) {
    note(`[cross-page-no-editor] "${adminKey}": CROSS_PAGE_TARGETS points to "${target.page}" but no editor case for it on that page`);
  }
}

/* ─────────────────────────────────────────────────────────────────
 *  Report
 * ───────────────────────────────────────────────────────────────── */
const total = TEMPLATES.length * STYLES.length * PAGES.length;
if (errors.length) {
  console.error(`\n✗ admin↔frontend coverage check FAILED — ${errors.length} issue${errors.length === 1 ? '' : 's'} across ${total} combos:\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error('');
  console.error('Fix these by either:');
  console.error('  • adding the missing field to the frontend renderer / admin editor, or');
  console.error('  • removing the corresponding entry from src/lib/section-registry.ts.');
  console.error('');
  process.exit(1);
}

console.log(`✓ admin↔frontend coverage OK — ${total} combos × ${Object.keys(SECTION_CONTRACTS).length} section contracts verified.`);
