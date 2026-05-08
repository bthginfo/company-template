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
 * ─── Remaining limits (read before treating this as a formal proof) ───
 *
 * • **Textual field coverage.** V2 field coverage checks require every
 *   `CMS_SECTION_FIELD_CONTRACTS` field to be mentioned by the active admin form
 *   and direct V2 renderer. This is strict enough to catch common drift, but it
 *   is still source-text matching, not TypeScript data-flow analysis.
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
 * • **Runtime behavior.** `scripts/check-cms-v2-runtime.ts` covers provisioning
 *   defaults, page isolation, visibility and add-section behavior for all
 *   24 combos. Browser-level form submit/publish UX still needs E2E coverage
 *   when credentials and a local tenant DB are available.
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
import { CMS_SECTION_FIELD_CONTRACTS, getCmsSectionFieldKeys, getCmsSectionTypes } from '../src/lib/cms-contract';
import { hotelModularBlueprint } from '../src/lib/modular-hotel-blueprints';
import { restaurantModularBlueprint } from '../src/lib/modular-restaurant-blueprints';
import { salonModularBlueprint } from '../src/lib/modular-salon-blueprints';
import { tourismModularBlueprint } from '../src/lib/modular-tourism-blueprints';
import { tradesmanModularBlueprint } from '../src/lib/modular-tradesman-blueprints';
import { consultingModularBlueprint } from '../src/lib/modular-consulting-blueprints';
import { fitnessModularBlueprint } from '../src/lib/modular-fitness-blueprints';
import { medicalModularBlueprint } from '../src/lib/modular-medical-blueprints';
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
const MODULAR_EXTENDED_FORM_SOURCE = readFileSync(join(repoRoot, 'src/admin/modular-extended-section-forms.tsx'), 'utf8');
const MODULAR_SPEC_EDITOR_SOURCE = readFileSync(join(repoRoot, 'src/admin/ModularSpecPageEditor.tsx'), 'utf8');
const CMS_CONTRACT_SOURCE = readFileSync(join(repoRoot, 'src/lib/cms-contract.ts'), 'utf8');
const PAGE_BLOCKS_MERGE_SOURCE = readFileSync(join(repoRoot, 'src/lib/page-blocks-v1-page-merge.ts'), 'utf8');
const CONTENT_API_SOURCE = readFileSync(join(repoRoot, 'api/content.ts'), 'utf8');
const TYPES_SOURCE = readFileSync(join(repoRoot, 'src/lib/types.ts'), 'utf8');
const PROVISION_CORE_SOURCE = readFileSync(join(repoRoot, 'src/lib/provision-core.ts'), 'utf8');
const CONTENT_IMPORT_SOURCE = readFileSync(join(repoRoot, 'src/lib/content-import.ts'), 'utf8');
const PACKAGE_SOURCE = readFileSync(join(repoRoot, 'package.json'), 'utf8');
const CMS_V2_RUNTIME_AUDIT_SOURCE = readFileSync(join(repoRoot, 'scripts/check-cms-v2-runtime.ts'), 'utf8');
const CMS_V2_CONTRACT_SOURCE = readFileSync(join(repoRoot, 'src/lib/cms-v2-contract.ts'), 'utf8');
const CMS_V2_HYDRATION_SOURCE = readFileSync(join(repoRoot, 'src/lib/cms-v2-hydration.ts'), 'utf8');
const CMS_V2_EDITOR_SOURCE = readFileSync(join(repoRoot, 'src/admin/ModularV2PageEditor.tsx'), 'utf8');
const RESTAURANT_EDITOR_SOURCE = readFileSync(join(repoRoot, 'src/admin/ModularHomeEditor.tsx'), 'utf8');
const TEMPLATE_APP_SOURCE = readFileSync(join(repoRoot, 'src/templates/_shared/TemplateApp.tsx'), 'utf8');
const EXTRA_TEMPLATE_SOURCE = readFileSync(join(repoRoot, 'src/templates/_shared/extra/ExtraBranchTemplate.tsx'), 'utf8');
const MODULAR_EDITOR_SOURCES_BY_TEMPLATE = Object.fromEntries(
  [
    ['hotel', 'ModularHotelEditor.tsx'],
    ['tourism', 'ModularTourismEditor.tsx'],
    ['salon', 'ModularSalonEditor.tsx'],
    ['tradesman', 'ModularTradesmanEditor.tsx'],
    ['consulting', 'ModularConsultingEditor.tsx'],
    ['medical', 'ModularMedicalEditor.tsx'],
    ['fitness', 'ModularFitnessEditor.tsx'],
  ].map(([tpl, file]) => [tpl, readFileSync(join(repoRoot, `src/admin/${file}`), 'utf8')]),
) as Record<string, string>;

const MODULAR_SHARED_SOURCE = readFileSync(join(repoRoot, 'src/lib/modular-restaurant.ts'), 'utf8');
const MODULAR_SOURCE_BY_TEMPLATE = Object.fromEntries(
  TEMPLATES.map((tpl) => [tpl, readFileSync(join(repoRoot, `src/lib/modular-${tpl}.ts`), 'utf8')]),
) as Record<TemplateKey, string>;

function modularSectionMention(source: string, sectionType: string): boolean {
  return (
    source.includes(`case '${sectionType}'`) ||
    source.includes(`sec.type === '${sectionType}'`) ||
    source.includes(`sec.type !== '${sectionType}'`) ||
    source.includes(`by('${sectionType}')`)
  );
}

function modularFieldMention(source: string, field: string): boolean {
  return (
    source.includes(`data.${field}`) ||
    source.includes(`.${field}`) ||
    source.includes(`'${field}'`) ||
    source.includes(`"${field}"`)
  );
}

function v2RendererFieldMention(source: string, field: string): boolean {
  return (
    source.includes(`data.${field}`) ||
    source.includes(`data[${JSON.stringify(field)}]`) ||
    source.includes(`item.${field}`) ||
    source.includes(`item[${JSON.stringify(field)}]`) ||
    source.includes(`loc.${field}`) ||
    source.includes(`loc[${JSON.stringify(field)}]`) ||
    source.includes(`category.${field}`) ||
    source.includes(`category[${JSON.stringify(field)}]`) ||
    source.includes(`program.${field}`) ||
    source.includes(`program[${JSON.stringify(field)}]`) ||
    source.includes(`asUnknownRecord(section.data).${field}`) ||
    source.includes(`asUnknownRecord(section.data)[${JSON.stringify(field)}]`)
  );
}

const modularMissing = new Set<string>();
const modularUnmerged = new Set<string>();
const modularMissingFieldContract = new Set<string>();
const modularFieldMissingInAdmin = new Set<string>();
const modularFieldMissingInMerge = new Set<string>();
const cmsV2FieldMissingInRenderer = new Set<string>();
for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    for (const page of PAGES) {
      for (const sectionType of getCmsSectionTypes(tpl, style, page)) {
        const fields = getCmsSectionFieldKeys(sectionType);
        const rendererSource = isExtraBranch(tpl) ? EXTRA_TEMPLATE_SOURCE : TEMPLATE_APP_SOURCE;
        if (fields.length === 0) {
          modularMissingFieldContract.add(`${tpl}/${style}/${page}: modular section type "${sectionType}" has no CMS_SECTION_FIELD_CONTRACTS entry`);
        }
        if (!MODULAR_FORM_SOURCES.includes(`case '${sectionType}'`)) {
          modularMissing.add(`${tpl}/${style}/${page}: modular section type "${sectionType}" has no active admin form case`);
        }
        const ownSource = MODULAR_SOURCE_BY_TEMPLATE[tpl];
        const hasOwnPath = modularSectionMention(ownSource, sectionType);
        const hasSharedPath = modularSectionMention(MODULAR_SHARED_SOURCE, sectionType);
        if (!hasOwnPath && !hasSharedPath) {
          modularUnmerged.add(`${tpl}/${style}/${page}: modular section type "${sectionType}" has no template/shared import or merge path`);
        }
        const mergeSource = `${ownSource}\n${MODULAR_SHARED_SOURCE}`;
        for (const field of fields) {
          if (!modularFieldMention(MODULAR_FORM_SOURCES, field)) {
            modularFieldMissingInAdmin.add(`${sectionType}.${field}: field contract has no active admin form mention`);
          }
          if (!modularFieldMention(mergeSource, field)) {
            modularFieldMissingInMerge.add(`${tpl}/${style}/${page}: ${sectionType}.${field} has no template/shared import or merge mention`);
          }
          if (!v2RendererFieldMention(rendererSource, field)) {
            cmsV2FieldMissingInRenderer.add(`${tpl}/${style}/${page}: ${sectionType}.${field} has no direct V2 renderer mention`);
          }
        }
      }
    }
  }
}
for (const type of Object.keys(CMS_SECTION_FIELD_CONTRACTS)) {
  if (!MODULAR_FORM_SOURCES.includes(`case '${type}'`)) continue;
  if (!getCmsSectionFieldKeys(type).length) {
    note(`[modular-field-contract-empty] "${type}" has an empty field contract`);
  }
}
for (const msg of modularMissingFieldContract) note(`[modular-no-field-contract] ${msg}`);
for (const msg of modularMissing) note(`[modular-no-form] ${msg}`);
for (const msg of modularUnmerged) note(`[modular-no-merge] ${msg}`);
for (const msg of modularFieldMissingInAdmin) note(`[modular-field-no-form] ${msg}`);
for (const msg of modularFieldMissingInMerge) note(`[modular-field-no-merge] ${msg}`);
for (const msg of cmsV2FieldMissingInRenderer) note(`[cms-v2-field-no-render] ${msg}`);

if (!MODULAR_EXTENDED_FORM_SOURCE.includes('const showItemButton =') || !MODULAR_EXTENDED_FORM_SOURCE.includes('showItemButton ?')) {
  note('[modular-admin-extra-field] Generic service-card editors must gate per-item button fields to templates whose frontend merge uses them.');
}
if (MODULAR_FORM_SOURCES.includes('label="Max. Beiträge"') || MODULAR_FORM_SOURCES.includes('lightboxEnabled')) {
  note('[modular-admin-extra-field] Admin contains known fields without modular frontend effect (postLimit/lightboxEnabled).');
}
if (!MODULAR_SPEC_EDITOR_SOURCE.includes('isVisible: false')) {
  note('[modular-add-default] Newly added modular sections must start hidden so empty data cannot overwrite live content.');
}
if (!CMS_CONTRACT_SOURCE.includes('CMS_REPEATABLE_SECTION_TYPES')) {
  note('[modular-add-repeatable] CMS add-flow must allow repeatable safe section types beyond only restoring removed blueprint slots.');
}
if (!PAGE_BLOCKS_MERGE_SOURCE.includes('content.modularPagesV1?.combo')) {
  note('[pageblocks-shadow] pageBlocksV1 merge must be disabled for modular tenants so hidden legacy blocks cannot shadow the CMS.');
}
if (!CONTENT_API_SOURCE.includes('draft: normalizedDraft')) {
  note('[draft-only-save] PUT /api/content must write submitted content to draft, including first-row recovery paths.');
}
if (!CONTENT_API_SOURCE.includes('normalizeTenantCmsV2') || !CONTENT_API_SOURCE.includes('normalizeSiteContentCmsV2')) {
  note('[cms-v2-api-normalize] Content API must normalize live, preview, draft saves and publish to complete tenant-facing CMS V2.');
}
if (!PACKAGE_SOURCE.includes('check-cms-v2-runtime.ts') || !CMS_V2_RUNTIME_AUDIT_SOURCE.includes('editing one page changed another page')) {
  note('[cms-v2-runtime-audit] Build must run the CMS V2 runtime audit for page isolation, visibility and add-section behavior.');
}
if (!TYPES_SOURCE.includes('ModularPagesV2Schema') || !TYPES_SOURCE.includes('modularPagesV2: ModularPagesV2Schema.optional()')) {
  note('[cms-v2-missing] SiteContentSchema must carry modularPagesV2 for direct-render CMS migration.');
}
if (!TYPES_SOURCE.includes('cmsV2: z.object') || !TYPES_SOURCE.includes('enabled: z.boolean().optional().default(false)')) {
  note('[cms-v2-flag] SiteContentSchema must carry cmsV2.enabled as the durable tenant rollout flag.');
}
if (!PROVISION_CORE_SOURCE.includes('normalizeSiteContentCmsV2')) {
  note('[cms-v2-provisioning] Provisioning defaults must normalize and hydrate cmsV2/modularPagesV2 for new tenants.');
}
if (!CMS_V2_CONTRACT_SOURCE.includes('getCmsV2PageContract') || !CMS_V2_CONTRACT_SOURCE.includes('seedModularPagesV2')) {
  note('[cms-v2-contract] Direct-render CMS v2 needs page contracts and seed generation.');
}
if (!CMS_V2_HYDRATION_SOURCE.includes('buildModularPagesV2FromLegacy') || !CMS_V2_HYDRATION_SOURCE.includes('importRestaurantModularFromLegacy') || !CMS_V2_HYDRATION_SOURCE.includes('visible: section.isVisible !== false')) {
  note('[cms-v2-hydration] Direct-render CMS v2 needs a legacy/V1 hydration path preserving section data and visibility.');
}
if (!CMS_V2_HYDRATION_SOURCE.includes('ensureCompleteModularPagesV2') || !CMS_V2_HYDRATION_SOURCE.includes('getCmsSectionTypes')) {
  note('[cms-v2-normalizer] CMS V2 normalization must preserve tenant section instances and fill missing blueprint sections.');
}
if (!CONTENT_IMPORT_SOURCE.includes('normalizeSiteContentCmsV2')) {
  note('[cms-v2-import] Content import must normalize cmsV2/modularPagesV2 so imported tenant content is editable and rendered in V2.');
}
if (ADMIN_SOURCES.includes('setCmsV2') || ADMIN_SOURCES.includes('CMS V2 fuer Admin und Frontend aktivieren')) {
  note('[cms-v2-admin-toggle] Tenant admin must not expose a switch that disables the V2 source of truth.');
}
if (!CMS_V2_EDITOR_SOURCE.includes('modularPagesV2') || !CMS_V2_EDITOR_SOURCE.includes('ModularSectionDataForm')) {
  note('[cms-v2-editor] Direct-render CMS v2 needs an admin page editor writing modularPagesV2 section instances.');
}
if (!CMS_V2_EDITOR_SOURCE.includes('content?.cmsV2?.enabled === true')) {
  note('[cms-v2-editor-flag] V2 admin editor gate must read the durable tenant cmsV2.enabled flag.');
}
if (CMS_V2_EDITOR_SOURCE.includes('cms:v2-editor') || CMS_V2_EDITOR_SOURCE.includes("params.get('cmsV2')")) {
  note('[cms-v2-editor-flag] V2 admin editor must not use query/localStorage QA gates; cmsV2.enabled is the only switch.');
}
if (!RESTAURANT_EDITOR_SOURCE.includes('shouldUseCmsV2Editor') || !RESTAURANT_EDITOR_SOURCE.includes('ModularV2PageEditor')) {
  note('[cms-v2-restaurant-editor] Restaurant must expose the V2 editor behind the feature gate before renderer migration.');
}
for (const [tpl, source] of Object.entries(MODULAR_EDITOR_SOURCES_BY_TEMPLATE)) {
  if (!source.includes('shouldUseCmsV2Editor') || !source.includes('ModularV2PageEditor')) {
    note(`[cms-v2-editor] ${tpl} must expose the V2 page editor behind the feature gate.`);
  }
}
if (!TEMPLATE_APP_SOURCE.includes('shouldUseCmsV2Frontend') || !TEMPLATE_APP_SOURCE.includes('RestaurantV2HomePage')) {
  note('[cms-v2-restaurant-renderer] Restaurant must expose a gated direct-render V2 frontend path before the legacy projection can be removed.');
}
if (!TEMPLATE_APP_SOURCE.includes('content.cmsV2?.enabled === true')) {
  note('[cms-v2-frontend-flag] Core frontend V2 gate must read the durable tenant cmsV2.enabled flag.');
}
if (TEMPLATE_APP_SOURCE.includes('cms:v2-frontend') || TEMPLATE_APP_SOURCE.includes("params.get('cmsV2')")) {
  note('[cms-v2-frontend-flag] Core frontend V2 gate must not use query/localStorage QA gates; cmsV2.enabled is the only switch.');
}
const restaurantV2RendererSetMatch = TEMPLATE_APP_SOURCE.match(/RESTAURANT_V2_RENDERED_SECTION_TYPES\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/);
if (!restaurantV2RendererSetMatch) {
  note('[cms-v2-restaurant-renderer] Restaurant V2 renderer must declare RESTAURANT_V2_RENDERED_SECTION_TYPES.');
} else {
  const renderedTypes = new Set(Array.from(restaurantV2RendererSetMatch[1].matchAll(/'([^']+)'/g)).map((m) => m[1]));
  for (const style of STYLES) {
    for (const page of PAGES) {
      for (const sectionType of restaurantModularBlueprint(style, page)) {
        if (!renderedTypes.has(sectionType)) {
          note(`[cms-v2-restaurant-renderer] missing V2 renderer declaration for restaurant/${style}/${page}/${sectionType}`);
        }
      }
    }
  }
}
const hotelV2RendererSetMatch = TEMPLATE_APP_SOURCE.match(/HOTEL_V2_RENDERED_SECTION_TYPES\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/);
if (!hotelV2RendererSetMatch) {
  note('[cms-v2-hotel-renderer] Hotel V2 renderer must declare HOTEL_V2_RENDERED_SECTION_TYPES.');
} else {
  const renderedTypes = new Set(Array.from(hotelV2RendererSetMatch[1].matchAll(/'([^']+)'/g)).map((m) => m[1]));
  for (const style of STYLES) {
    for (const page of PAGES) {
      for (const sectionType of hotelModularBlueprint(style, page)) {
        if (!renderedTypes.has(sectionType)) {
          note(`[cms-v2-hotel-renderer] missing V2 renderer declaration for hotel/${style}/${page}/${sectionType}`);
        }
      }
    }
  }
}
const coreV2RendererSetMatch = TEMPLATE_APP_SOURCE.match(/CORE_V2_RENDERED_SECTION_TYPES\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/);
if (!coreV2RendererSetMatch) {
  note('[cms-v2-core-renderer] Core V2 renderer must declare CORE_V2_RENDERED_SECTION_TYPES for salon/tourism/tradesman.');
} else {
  const renderedTypes = new Set(Array.from(coreV2RendererSetMatch[1].matchAll(/'([^']+)'/g)).map((m) => m[1]));
  const blueprints = {
    salon: salonModularBlueprint,
    tourism: tourismModularBlueprint,
    tradesman: tradesmanModularBlueprint,
  } as const;
  for (const [tpl, blueprint] of Object.entries(blueprints)) {
    for (const style of STYLES) {
      for (const page of PAGES) {
        for (const sectionType of blueprint(style, page)) {
          if (!renderedTypes.has(sectionType)) {
            note(`[cms-v2-core-renderer] missing V2 renderer declaration for ${tpl}/${style}/${page}/${sectionType}`);
          }
        }
      }
    }
  }
}
const extraV2RendererSetMatch = EXTRA_TEMPLATE_SOURCE.match(/EXTRA_V2_RENDERED_SECTION_TYPES\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/);
if (!extraV2RendererSetMatch) {
  note('[cms-v2-extra-renderer] Extra V2 renderer must declare EXTRA_V2_RENDERED_SECTION_TYPES.');
} else {
  const renderedTypes = new Set(Array.from(extraV2RendererSetMatch[1].matchAll(/'([^']+)'/g)).map((m) => m[1]));
  const blueprints = {
    consulting: consultingModularBlueprint,
    medical: medicalModularBlueprint,
    fitness: fitnessModularBlueprint,
  } as const;
  for (const [tpl, blueprint] of Object.entries(blueprints)) {
    for (const style of STYLES) {
      for (const page of PAGES) {
        for (const sectionType of blueprint(style, page)) {
          if (!renderedTypes.has(sectionType)) {
            note(`[cms-v2-extra-renderer] missing V2 renderer declaration for ${tpl}/${style}/${page}/${sectionType}`);
          }
        }
      }
    }
  }
}
if (!EXTRA_TEMPLATE_SOURCE.includes('content.cmsV2?.enabled === true')) {
  note('[cms-v2-extra-frontend-flag] Extra frontend V2 gate must read the durable tenant cmsV2.enabled flag.');
}
if (EXTRA_TEMPLATE_SOURCE.includes('cms:v2-frontend') || EXTRA_TEMPLATE_SOURCE.includes("params.get('cmsV2')")) {
  note('[cms-v2-extra-frontend-flag] Extra frontend V2 gate must not use query/localStorage QA gates; cmsV2.enabled is the only switch.');
}
if (
  EXTRA_TEMPLATE_SOURCE.includes('<BranchModulesInline key={section.id}') ||
  EXTRA_TEMPLATE_SOURCE.includes('<BranchModulesInline variant={branch} content={patched}')
) {
  note('[cms-v2-extra-section-renderer] Extra V2 page sections must render one explicit module per section; BranchModulesInline renders a bundle and causes duplicate sections.');
}
if (!CONTENT_API_SOURCE.includes('normalizeMailSecret') || !CONTENT_API_SOURCE.includes('passEnc')) {
  note('[mail-secret] Mail passwords must be normalized server-side into encrypted passEnc instead of persisted plaintext.');
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
  countdown: 'countdown',
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
