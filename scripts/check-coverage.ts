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
 *  4. Combo-scoped dataKeys: for each (branch × style × page) section from
 *     `getAdminSections`, every `SECTION_CONTRACTS` dataKey must appear in
 *     `SECTION_CONTRACTS` dataKey must appear in
 *     **that template's** frontend tree (`src/templates/<tpl>` or
 *     `src/templates/_shared/extra` for the three extras) plus `_shared` + `components`, and in
 *     `AdminEditorBody.tsx`. Orphan `SECTION_CONTRACTS` keys (never listed by
 *     `getAdminSections`) fail. Optional omits: `src/lib/combo-drift-omissions.ts`.
 *  4b. Global layout fields (`navItems`, `navCta`, `customScripts`,
 *      `sectionOrder`, `footer.tagline`) ↔ full templates+components + admin.
 *  5. Branch invariants: extras have compact subpages disabled, core 5
 *     have them all enabled.
 *  6. Frontend home order (`BRANCH_STYLE_ORDER` for all templates) ↔
 *     admin home order parity. Every frontend section is reachable in
 *     the admin (either in HOME_ORDER or as global data).
 *  6b. Every home-flow block id maps via `HOME_CATALOG_BLOCK_TO_ADMIN`;
 *     `getAdminSections("home")` matches `buildHomeAdminOrderFromFrontend`.
 *  7–9. See `drift-machine.ts`: branch-config home PerStyle ↔ data paths
 *     (full-template haystack), subpage cfg flags ↔ admin order + frontend,
 *     and every `FIELD_CONFIG` leaf referenced from the page editor.
 *
 * Exit code: 0 = all green, 1 = drift detected. Wired into `npm run build`.
 *
 * ─── What this script does *not* guarantee (read before trusting “120/120”) ───
 *
 * • **Section cards, not fields.** It knows admin *sections* (hero, gallery, …)
 *   and `SECTION_CONTRACTS` *data paths*, not whether every sub-field inside
 *   `AdminEditorBody` is shown for a given (branch, style). Visibility via
 *   `$s(cfg…)`, `fieldVisible`, or inline `style === 'modern'` is **never**
 *   checked here.
 *
 * • **Registry is the contract list.** A new `SiteContent` field rendered in JSX
 *   but never added to `section-registry.ts` still produces **no failure** for
 *   that field alone — add it to the matching `SECTION_CONTRACTS` entry so
 *   step 4 runs for combos that surface that section. Every contract `dataKey`
 *   root must exist on `SiteContentSchema` in `types.ts` (schema-root pass).
 *
 * • **Structured text match, not AST.** Step 4 uses the same strict substring
 *   rules as before (`branchText.*`, `moduleHeadings.*`, `contact.*`, …) in
 *   `scripts/drift-machine.ts`, scoped per template. It is not a TypeScript AST
 *   or data-flow proof.
 *
 * • **Frontend search scope.** Step 4 scans each template's subtree plus
 *   `_shared` and `src/components/**`. The separate `branchHomeStyleBindingIssues`
 *   pass still uses the full `src/templates` + `components` haystack for
 *   PerStyle needles.
 *
 * • **Sub-pages ignore style.** `getAdminSections('services'|'gallery'|…)`
 *   currently does not vary by `TemplateStyle` (parameter exists but is
 *   unused for those pages). The 120 loop still runs three identical lists
 *   for those pages — it does **not** assert “style A shows fewer editors”.
 *
 * • **Home parity is order keys, not layout.** Step 6 maps admin keys ↔
 *   `BRANCH_STYLE_ORDER` *block ids*. It does not prove
 *   that every pixel of the hero (e.g. stats tucked under buttons in Modern)
 *   has a dedicated card; that requires human review or richer contracts.
 *
 * • **“Only relevant admin”.** Nothing here removes irrelevant cards for a
 *   combo. Keeping `HOME_ORDER` aligned with real frontend order is a manual
 *   discipline; this test flags **overshoot** (admin section whose mapped
 *   block is absent from that combo’s order) and **undershoot** (frontend
 *   block with no mapped admin section), not “this field is hidden for Bold”.
 *
 * To tighten coverage further: add per-(branch, style) field-level contracts,
 * TypeScript AST matching for property reads, or runtime visual regression —
 * see README / AGENTS when extending.
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
  HOME_CATALOG_BLOCK_TO_ADMIN,
  buildHomeAdminOrderFromFrontend,
  type AdminSectionKey,
  type PageKey,
} from '../src/admin/admin-sections';
import { SECTION_CONTRACTS, CATALOG_TO_ADMIN, CROSS_PAGE_TARGETS } from '../src/lib/section-registry';
import { BRANCH_STYLE_ORDER } from '../src/lib/template-orders';
import { SECTION_CATALOG, getCatalogForVariant } from '../src/lib/page-layout';
import { restaurantModularBlueprint } from '../src/lib/modular-restaurant-blueprints';
import { hotelModularBlueprint } from '../src/lib/modular-hotel-blueprints';
import { tourismModularBlueprint } from '../src/lib/modular-tourism-blueprints';
import { salonModularBlueprint } from '../src/lib/modular-salon-blueprints';
import { tradesmanModularBlueprint } from '../src/lib/modular-tradesman-blueprints';
import { consultingModularBlueprint } from '../src/lib/modular-consulting-blueprints';
import { medicalModularBlueprint } from '../src/lib/modular-medical-blueprints';
import { fitnessModularBlueprint } from '../src/lib/modular-fitness-blueprints';
import {
  branchHomeStyleBindingIssues,
  collectDirSources,
  comboScopedDataKeyIssues,
  contractDataKeyRootsMissingFromSchema,
  fieldConfigEditorReferenceIssues,
  globalLayoutFieldDriftIssues,
  subpageBranchFlagIssues,
} from './drift-machine';

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
 *  4: Combo-scoped section dataKeys ↔ template frontend + admin body
 * ───────────────────────────────────────────────────────────────── */
const FRONTEND_SOURCES = collectDirSources(repoRoot, ['src/templates', 'src/components']);

const ADMIN_SOURCES = readFileSync(join(repoRoot, 'src/admin/AdminEditorBody.tsx'), 'utf8');

for (const root of contractDataKeyRootsMissingFromSchema()) {
  note(`[schema-root] SECTION_CONTRACTS references root "${root}" which is missing from SiteContentSchema — add it to src/lib/types.ts`);
}

for (const msg of comboScopedDataKeyIssues(repoRoot, ADMIN_SOURCES, TEMPLATES, STYLES, PAGES)) note(msg);
for (const msg of globalLayoutFieldDriftIssues(ADMIN_SOURCES, FRONTEND_SOURCES)) note(msg);

for (const msg of branchHomeStyleBindingIssues(ADMIN_SOURCES, FRONTEND_SOURCES)) note(msg);
for (const msg of subpageBranchFlagIssues(FRONTEND_SOURCES)) note(msg);
for (const msg of fieldConfigEditorReferenceIssues(ADMIN_SOURCES)) note(msg);

/* ─────────────────────────────────────────────────────────────────────────────
 *  4c: Active modular admin surface
 *
 * Subpage editors for all templates route through Modular*PageEditor, not the
 * legacy switch cases below them in AdminEditorBody. Every section type emitted
 * by a branch/style/page blueprint must therefore have a real ModularSectionDataForm
 * or modular-extended-section-forms editor case.
 * ───────────────────────────────────────────────────────────────────────────── */
const MODULAR_FORM_SOURCES = [
  readFileSync(join(repoRoot, 'src/admin/ModularSectionDataForm.tsx'), 'utf8'),
  readFileSync(join(repoRoot, 'src/admin/modular-extended-section-forms.tsx'), 'utf8'),
].join('\n\n');

const modularBlueprintByTpl = {
  restaurant: restaurantModularBlueprint,
  hotel: hotelModularBlueprint,
  tourism: tourismModularBlueprint,
  salon: salonModularBlueprint,
  tradesman: tradesmanModularBlueprint,
  consulting: consultingModularBlueprint,
  medical: medicalModularBlueprint,
  fitness: fitnessModularBlueprint,
} satisfies Record<TemplateKey, (style: TemplateStyle, page: PageKey) => readonly string[]>;

const modularMissing = new Set<string>();
for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    for (const page of PAGES) {
      for (const sectionType of modularBlueprintByTpl[tpl](style, page)) {
        if (!MODULAR_FORM_SOURCES.includes(`case '${sectionType}'`)) {
          modularMissing.add(`${tpl}/${style}/${page}: modular section type "${sectionType}" has no active admin form case`);
        }
      }
    }
  }
}
for (const msg of modularMissing) note(`[modular-no-form] ${msg}`);

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
  /** Extra-branch subpages match core section flags (full services/gallery/about/contact). */
  const extraAllowsTrue = new Set<string>([
    'services.showHighlights',
    'services.showProcess',
    'services.showFaq',
    'services.showCta',
    'gallery.showStory',
    'gallery.showUpload',
    'gallery.showCategories',
    'gallery.showCta',
    'about.showValues',
    'about.showTimeline',
    'about.showNumbers',
    'about.showTestimonials',
    'about.showCta',
    'contact.showForm',
    'contact.showArrival',
    'contact.showCta',
  ]);
  for (const [section, flag] of flagPaths) {
    const value = (cfg[section] as Record<string, unknown>)[flag];
    if (expectFull && value !== true) {
      note(`[invariant] ${tpl}: cfg.${String(section)}.${flag} should be true for core branches (got ${value})`);
    }
    if (!expectFull && extraAllowsTrue.has(`${String(section)}.${String(flag)}`)) continue;
    if (!expectFull && value !== false) {
      note(`[invariant] ${tpl}: cfg.${String(section)}.${flag} should be false for extra branches (got ${value})`);
    }
  }
}

/* ─────────────────────────────────────────────────────────────────
 *  6: Frontend home order ↔ admin HOME_ORDER parity
 *
 *  Mapping admin section key → frontend section key (in `BRANCH_STYLE_ORDER`,
 *  plus for extras any `getCatalogForVariant('home', …)` keys merged at runtime).
 *  `null` = the admin card drives no discrete order entry on that combo
 *  (e.g. `announcements`, `hero`; `heroBadge` under `branchChips`).
 *  `softCta` is null for core (rendered outside order) but mapped for extras.
 * ───────────────────────────────────────────────────────────────── */
const ADMIN_TO_FRONTEND_HOME: Record<AdminSectionKey, string | null> = {
  // null = the admin card edits data that the frontend consumes somewhere
  // on the home page, but not via a discrete entry in the order array.
  announcements: null, hero: null, softCta: null,
  // `marquee` is a separate block in extras-bold home order, but inlined
  // into the hero in core-5 bold. Either way it edits branchText.marqueeWords
  // which the dataKey check verifies is consumed.
  marquee: null,
  actionStrip: 'action', branchChips: 'chips',
  signature: 'signature', services: 'services', numbers: 'numbers',
  about: 'about', gallery: 'gallery', logos: 'logos',
  testimonials: 'testimonials', news: 'news',
  funding: 'funding', spotlight: 'spotlight',
  branchModules: 'branchModules',
  team: 'team',
  contact: 'contact',
  // not used on home — keep them mapped so TS exhaustiveness is happy
  servicesHeader: null, extraServiceCards: null, highlights: null, servicesList: null, menu: null, rooms: null,
  tours: null, treatments: null, courses: null, packages: null,
  processSteps: null, doctors: null, booking: null, fundingModule: null,
  emergencyBanner: null, programs: null, medicalNotice: null,
  serviceProcess: null, faq: 'faq', servicesCta: null,
  galleryHeader: null, galleryStory: null, galleryUpload: null,
  galleryGrid: null, galleryCategories: null, galleryCta: null,
  aboutHeader: null, aboutIntro: null, values: null, timeline: null,
  aboutNumbers: null, certifications: null, press: null,
  aboutTestimonials: null, aboutCta: null,
  contactHeader: null, contactDetails: null, contactForm: null,
  locations: null, arrival: null, contactCta: null,
};

/** Frontend keys whose data is not a discrete home block (inlined or cross-page only). */
const FRONTEND_HOME_KEYS_EDITED_ELSEWHERE = new Set([
  // `marquee` is a separate block in extras-bold but inlined into the
  // hero in core-5-bold. The marquee admin card edits the data either
  // way; the dataKey check verifies frontend consumption.
  'marquee',
]);

for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    const adminOrder = getAdminSections('home', tpl, style);
    const baseOrder = BRANCH_STYLE_ORDER[tpl][style];
    const frontendOrder: readonly string[] = isExtraBranch(tpl)
      ? Array.from(new Set([...baseOrder, ...getCatalogForVariant('home', tpl, style).map((s) => s.key)]))
      : baseOrder;

    const adminKeyToFrontendBlock = (adminKey: AdminSectionKey): string | null => {
      if (adminKey === 'softCta' && isExtraBranch(tpl)) return 'softCta';
      return ADMIN_TO_FRONTEND_HOME[adminKey];
    };

    // Admin shows X => frontend should render X
    for (const adminKey of adminOrder) {
      const frontKey = adminKeyToFrontendBlock(adminKey);
      if (frontKey === null) continue;
      if (!frontendOrder.includes(frontKey)) {
        note(`[admin-overshoot] ${tpl}/${style}: admin shows "${adminKey}" but frontend home order doesn't include "${frontKey}"`);
      }
    }

    // Frontend renders X => admin should let user edit X
    for (const frontKey of frontendOrder) {
      if (FRONTEND_HOME_KEYS_EDITED_ELSEWHERE.has(frontKey)) continue;
      let adminKey = (Object.entries(ADMIN_TO_FRONTEND_HOME) as [AdminSectionKey, string | null][])
        .find(([, v]) => v === frontKey)?.[0];
      if (!adminKey && frontKey === 'softCta' && isExtraBranch(tpl)) adminKey = 'softCta';
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
 *  6b: Home block keys ↔ admin map; derived home order is the only source
 * ───────────────────────────────────────────────────────────────── */
const allHomeFrontKeys = new Set<string>();
for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    for (const k of BRANCH_STYLE_ORDER[tpl][style]) allHomeFrontKeys.add(k);
    if (isExtraBranch(tpl)) {
      for (const { key } of getCatalogForVariant('home', tpl, style)) allHomeFrontKeys.add(key);
    }
  }
}
for (const k of allHomeFrontKeys) {
  if (!(k in HOME_CATALOG_BLOCK_TO_ADMIN)) {
    note(`[home-block-unmapped] home flow key "${k}" has no HOME_CATALOG_BLOCK_TO_ADMIN entry`);
  }
}
for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    const built = buildHomeAdminOrderFromFrontend(tpl, style);
    const got = getAdminSections('home', tpl, style);
    if (JSON.stringify(got) !== JSON.stringify(built)) {
      note(`[home-order-source] ${tpl}/${style}: getAdminSections("home") !== buildHomeAdminOrderFromFrontend`);
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
  const resolved = (target.editorSectionKey ?? adminKey) as AdminSectionKey;
  if (!HANDLED_SECTIONS_BY_PAGE[target.page].includes(resolved)) {
    note(`[cross-page-no-editor] "${adminKey}": CROSS_PAGE_TARGETS points to "${target.page}" (section "${resolved}") but no editor case for it on that page`);
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
