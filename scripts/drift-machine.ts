/**
 * Shared helpers for `check-coverage.ts` — stricter admin↔frontend drift checks.
 * Kept as a separate module so the main script stays readable.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';

import type { BranchConfig, TemplateStyle } from '../src/lib/branch-config';
import { BRANCH_CONFIGS, isActiveForStyle, isExtraBranch, isPerStyleFlag } from '../src/lib/branch-config';
import { COMBO_DATA_KEY_OMITS } from '../src/lib/combo-drift-omissions';
import {
  FIELD_CONFIG,
  getAdminSections,
  type AdminSectionKey,
  type PageKey,
} from '../src/admin/admin-sections';
import { SECTION_CONTRACTS } from '../src/lib/section-registry';
import { SiteContentSchema } from '../src/lib/types';
import type { TemplateKey } from '../src/lib/types';

const EXCLUDE_DIRS = new Set(['node_modules', 'dist', '.git', '__tests__']);

/** Recursively read all `.ts` / `.tsx` sources under `relDirs` (repo-relative). */
export function collectDirSources(repoRoot: string, relDirs: readonly string[]): string {
  const chunks: string[] = [];
  const walk = (abs: string) => {
    for (const ent of readdirSync(abs, { withFileTypes: true })) {
      const p = join(abs, ent.name);
      if (ent.isDirectory()) {
        if (EXCLUDE_DIRS.has(ent.name)) continue;
        walk(p);
      } else if (ent.isFile()) {
        if (!/\.tsx?$/.test(ent.name) || ent.name.endsWith('.d.ts')) continue;
        chunks.push(readFileSync(p, 'utf8'));
      }
    }
  };
  for (const d of relDirs) walk(join(repoRoot, d));
  return chunks.join('\n\n');
}

/**
 * Literal `path` substring, or role-specific alternates (dynamic keys,
 * `(data.hero as any).body`, `page="services"` for CTA overrides, …).
 * No unconditional “tail word” match — avoids false positives from unrelated identifiers.
 */
const DATA_KEY_ALTERNATES: Record<string, { admin?: readonly string[]; frontend?: readonly string[] }> = {
  'hero.body': {
    admin: ['(data.hero as any).body'],
    frontend: ['heroBodyFor'],
  },
  'ctaBandOverrides.services': {
    admin: ['page="services"'],
    frontend: ['page="services"'],
  },
  'ctaBandOverrides.gallery': {
    admin: ['page="gallery"'],
    frontend: ['page="gallery"'],
  },
  'ctaBandOverrides.about': {
    admin: ['page="about"'],
    frontend: ['page="about"'],
  },
  'ctaBandOverrides.contact': {
    admin: ['page="contact"'],
    frontend: ['page="contact"'],
  },
  'footer.tagline': {
    admin: ['footer.tagline'],
    frontend: ['footer?.tagline', '(content as any).footer'],
  },
};

export type HaystackRole = 'admin' | 'frontend';

/** Registry `dataKey` → `PageHeaderEditor` `field=` prop (admin only). */
const PAGE_HEADER_EDITOR_FIELDS: Record<string, string> = {
  servicesHeader: 'services',
  galleryHeader: 'gallery',
  aboutHeader: 'about',
  contactPageHeader: 'contactPage',
};

export function strictDataKeyMention(haystack: string, path: string, role: HaystackRole): boolean {
  if (haystack.includes(path)) return true;
  const ex = DATA_KEY_ALTERNATES[path]?.[role === 'admin' ? 'admin' : 'frontend'];
  if (ex?.some((s) => haystack.includes(s))) return true;

  const pageHdrField = PAGE_HEADER_EDITOR_FIELDS[path];
  if (pageHdrField && role === 'admin') {
    if (haystack.includes('PageHeaderEditor') && haystack.includes(`field="${pageHdrField}"`)) return true;
  }

  if (path.startsWith('branchText.')) {
    const key = path.slice('branchText.'.length);
    if (role === 'frontend') {
      if (haystack.includes('branchText') && haystack.includes(key)) return true;
    } else {
      if (
        haystack.includes(`'${key}'`) ||
        haystack.includes(`"${key}"`) ||
        (haystack.includes('branchText') && haystack.includes(key))
      ) {
        return true;
      }
    }
  }

  if (path.startsWith('moduleHeadings.')) {
    const k = path.slice('moduleHeadings.'.length);
    if (haystack.includes('moduleHeadings') && haystack.includes(k)) return true;
    if (haystack.includes(`mKey="${k}"`)) return true;
    if (haystack.includes('moduleHeading') && haystack.includes(`'${k}'`)) return true;
  }

  if (path.startsWith('heroCta.')) {
    const leaf = path.split('.').pop() ?? '';
    if (haystack.includes('heroCta') && haystack.includes(leaf)) return true;
    if (haystack.includes('hc?.') && haystack.includes(leaf)) return true;
  }

  const mContact = path.match(/^contact\.(\w+)$/);
  if (mContact) {
    const f = mContact[1];
    if (role === 'admin') {
      if (haystack.includes(`c.${f}`)) return true;
      if (haystack.includes(`contact: {`) && haystack.includes(f)) return true;
    } else {
      if (haystack.includes(`contact.${f}`)) return true;
      if (haystack.includes(`c.${f}`)) return true;
    }
  }

  const mAbout = path.match(/^about\.(\w+)$/);
  if (mAbout) {
    const f = mAbout[1];
    if (role === 'admin') {
      if (haystack.includes(`about?.${f}`) || haystack.includes(`about.${f}`)) return true;
    } else if (haystack.includes(`about?.${f}`) || haystack.includes(`about.${f}`)) return true;
  }

  return false;
}

/**
 * `SiteContent` paths used from templates/components but edited outside the
 * per-page section sidebar (Navigation, Skripte & DSGVO, section layout).
 * Keeps QA parity beyond `SECTION_CONTRACTS` + `getAdminSections`.
 */
const GLOBAL_LAYOUT_FIELD_PATHS = [
  'navItems',
  'navCta',
  'customScripts',
  'sectionOrder',
  'footer.tagline',
] as const;

export function globalLayoutFieldDriftIssues(
  adminHaystack: string,
  frontendHaystack: string,
): string[] {
  const out: string[] = [];
  for (const p of GLOBAL_LAYOUT_FIELD_PATHS) {
    if (!strictDataKeyMention(adminHaystack, p, 'admin')) {
      out.push(`[global-field-admin] "${p}" must be editable in AdminEditorBody (Navigation / Skripte / Layout / Footer).`);
    }
    if (!strictDataKeyMention(frontendHaystack, p, 'frontend')) {
      out.push(`[global-field-frontend] "${p}" must appear in src/templates or src/components (strict match).`);
    }
  }
  return out;
}

/** Every first segment of `SECTION_CONTRACTS` dataKeys must exist on `SiteContentSchema`. */
export function contractDataKeyRootsMissingFromSchema(): string[] {
  const schema = SiteContentSchema;
  if (!(schema instanceof z.ZodObject)) {
    throw new Error('SiteContentSchema must be a ZodObject for drift checks');
  }
  const roots = new Set(Object.keys(schema.shape));
  const missing = new Set<string>();
  for (const c of Object.values(SECTION_CONTRACTS)) {
    for (const dk of c.dataKeys) {
      const root = dk.split('.')[0];
      if (!roots.has(root)) missing.add(root);
    }
  }
  return [...missing].sort();
}

/** `cfg.home.hero.tagline` style paths that resolve to `PerStyle` in `BranchConfig`. */
export const BRANCH_HOME_PER_STYLE_PATHS: readonly {
  cfgPath: string;
  dataKeys: readonly string[];
}[] = [
  { cfgPath: 'home.hero.tagline', dataKeys: ['brand.tagline'] },
  { cfgPath: 'home.hero.subtitle', dataKeys: ['hero.subtitle'] },
  { cfgPath: 'home.hero.body', dataKeys: ['hero.body'] },
  { cfgPath: 'home.hero.bgImage', dataKeys: ['hero.imageUrl'] },
  { cfgPath: 'home.hero.cardImage', dataKeys: ['branchText.heroImageUrl'] },
  { cfgPath: 'home.hero.heroBadge', dataKeys: ['heroBadge'] },
  { cfgPath: 'home.aboutImage', dataKeys: ['about.imageUrl'] },
];

function readCfgPath(cfg: BranchConfig, dotPath: string): unknown {
  const parts = dotPath.split('.');
  let cur: unknown = cfg;
  for (const p of parts) {
    if (!cur || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

const TEMPLATES = Object.keys(BRANCH_CONFIGS) as TemplateKey[];
const STYLES: TemplateStyle[] = ['classic', 'modern', 'bold'];

/** Frontend sources that can affect a deployed tenant site for `tpl`. */
export function templateFrontendRelDirs(tpl: TemplateKey): readonly string[] {
  if (isExtraBranch(tpl)) {
    return [
      'src/templates/_shared/extra',
      'src/templates/extra',
      'src/templates/_shared',
      'src/components',
    ];
  }
  return [`src/templates/${tpl}`, 'src/templates/_shared', 'src/components'];
}

function comboOmitApplies(
  tpl: TemplateKey,
  style: TemplateStyle,
  page: PageKey,
  section: AdminSectionKey,
  dataKey: string,
): boolean {
  return COMBO_DATA_KEY_OMITS.some(
    (r) =>
      r.template === tpl &&
      r.style === style &&
      r.page === page &&
      r.section === section &&
      r.dataKey === dataKey,
  );
}

/**
 * For every `(template, style, page)` where `getAdminSections` lists a section,
 * each contract `dataKey` must appear in **that template's** frontend sources
 * (plus `_shared` + `components`) and in `AdminEditorBody.tsx`. Also asserts
 * every `SECTION_CONTRACTS` key is returned by `getAdminSections` for at least
 * one combo (no orphan admin contracts).
 */
export function comboScopedDataKeyIssues(
  repoRoot: string,
  adminHaystack: string,
  templates: readonly TemplateKey[],
  styles: readonly TemplateStyle[],
  pages: readonly PageKey[],
): string[] {
  const out: string[] = [];
  const seenSections = new Set<AdminSectionKey>();
  for (const tpl of templates) {
    for (const style of styles) {
      for (const page of pages) {
        for (const s of getAdminSections(page, tpl, style)) seenSections.add(s);
      }
    }
  }
  for (const contract of Object.values(SECTION_CONTRACTS)) {
    if (!seenSections.has(contract.key)) {
      out.push(
        `[orphan-contract-section] SECTION_CONTRACTS declares "${contract.key}" but getAdminSections never returns it for any template×style×page — remove the contract or add the section to admin order.`,
      );
    }
  }

  const frontendByTpl = new Map<TemplateKey, string>();
  for (const tpl of templates) {
    frontendByTpl.set(tpl, collectDirSources(repoRoot, [...templateFrontendRelDirs(tpl)]));
  }

  const adminMiss = new Set<string>();
  const feMiss = new Set<string>();

  for (const tpl of templates) {
    const fe = frontendByTpl.get(tpl)!;
    for (const style of styles) {
      for (const page of pages) {
        for (const section of getAdminSections(page, tpl, style)) {
          const contract = SECTION_CONTRACTS[section];
          if (!contract) continue;
          for (const dk of contract.dataKeys) {
            if (comboOmitApplies(tpl, style, page, section, dk)) continue;
            const admKey = `${section}|${dk}`;
            if (!strictDataKeyMention(adminHaystack, dk, 'admin')) {
              if (!adminMiss.has(admKey)) {
                adminMiss.add(admKey);
                out.push(
                  `[combo-admin] section="${section}" dataKey "${dk}" missing in AdminEditorBody (first seen at ${tpl}/${style}/${page})`,
                );
              }
            }
            const feKey = `${tpl}|${section}|${dk}`;
            if (!strictDataKeyMention(fe, dk, 'frontend')) {
              if (!feMiss.has(feKey)) {
                feMiss.add(feKey);
                out.push(
                  `[combo-frontend] ${tpl}: section="${section}" dataKey "${dk}" missing from this template's frontend tree (first seen at ${style}/${page})`,
                );
              }
            }
          }
        }
      }
    }
  }
  return out;
}

export function branchHomeStyleBindingIssues(
  adminHaystack: string,
  frontendHaystack: string,
): string[] {
  const out: string[] = [];
  for (const tpl of TEMPLATES) {
    const cfg = BRANCH_CONFIGS[tpl];
    for (const style of STYLES) {
      for (const b of BRANCH_HOME_PER_STYLE_PATHS) {
        const flag = readCfgPath(cfg, b.cfgPath);
        if (!isPerStyleFlag(flag)) continue;
        if (!isActiveForStyle(flag, style)) continue;
        const cfgNeedle = `cfg.${b.cfgPath.replace(/\./g, '.')}`;
        if (!adminHaystack.includes(cfgNeedle)) {
          out.push(
            `[branch-style-admin] ${tpl}/${style}: expected admin guard "${cfgNeedle}" for ${b.cfgPath}`,
          );
        }
        for (const dk of b.dataKeys) {
          if (!strictDataKeyMention(frontendHaystack, dk, 'frontend')) {
            out.push(
              `[branch-style-frontend] ${tpl}/${style}: flag ${b.cfgPath} active but frontend sources lack dataKey "${dk}" (or alternates)`,
            );
          }
        }
      }
    }
  }
  return out;
}

type SubpageCheck = {
  page: PageKey;
  when: (c: BranchConfig) => boolean;
  adminSection: AdminSectionKey;
  frontendNeedles: readonly string[];
};

const SUBPAGE_FLAG_CHECKS: readonly SubpageCheck[] = [
  {
    page: 'services',
    when: (c) => c.services.showHighlights,
    adminSection: 'highlights',
    frontendNeedles: ['serviceHighlights', 'mergedServiceHighlights'],
  },
  {
    page: 'services',
    when: (c) => c.services.showProcess,
    adminSection: 'serviceProcess',
    frontendNeedles: ['serviceProcess'],
  },
  {
    page: 'services',
    when: (c) => c.services.showFaq,
    adminSection: 'faq',
    frontendNeedles: ['resolveFaq', 'normaliseFaqList'],
  },
  {
    page: 'services',
    when: (c) => c.services.showCta,
    adminSection: 'servicesCta',
    frontendNeedles: ['CtaBand', 'page="services"'],
  },
  {
    page: 'gallery',
    when: (c) => c.gallery.showStory,
    adminSection: 'galleryStory',
    frontendNeedles: ['galleryStory'],
  },
  {
    page: 'gallery',
    when: (c) => c.gallery.showUpload,
    adminSection: 'galleryUpload',
    frontendNeedles: ['MasonryLightbox', 'content.gallery'],
  },
  {
    page: 'gallery',
    when: (c) => c.gallery.showCategories,
    adminSection: 'galleryCategories',
    frontendNeedles: ['galleryCategories'],
  },
  {
    page: 'gallery',
    when: (c) => c.gallery.showCta,
    adminSection: 'galleryCta',
    frontendNeedles: ['page="gallery"'],
  },
  {
    page: 'about',
    when: (c) => c.about.showValues,
    adminSection: 'values',
    frontendNeedles: ['ValuesSection', 'valuesEyebrow', 'branchText.valuesEyebrow'],
  },
  {
    page: 'about',
    when: (c) => c.about.showTimeline,
    adminSection: 'timeline',
    frontendNeedles: ['Timeline content={content}'],
  },
  {
    page: 'about',
    when: (c) => c.about.showNumbers,
    adminSection: 'aboutNumbers',
    frontendNeedles: ['aboutNumbers'],
  },
  {
    page: 'about',
    when: (c) => c.about.showTestimonials,
    adminSection: 'aboutTestimonials',
    frontendNeedles: ['testimonials: content.testimonials'],
  },
  {
    page: 'about',
    when: (c) => c.about.showCta,
    adminSection: 'aboutCta',
    frontendNeedles: ['page="about"'],
  },
  {
    page: 'contact',
    when: (c) => c.contact.showForm,
    adminSection: 'contactForm',
    frontendNeedles: ['formFields'],
  },
  {
    page: 'contact',
    when: (c) => c.contact.showArrival,
    adminSection: 'arrival',
    frontendNeedles: ['arrival'],
  },
  {
    page: 'contact',
    when: (c) => c.contact.showCta,
    adminSection: 'contactCta',
    frontendNeedles: ['page="contact"'],
  },
];

export function subpageBranchFlagIssues(frontendHaystack: string): string[] {
  const out: string[] = [];
  const style: TemplateStyle = 'classic';
  for (const tpl of TEMPLATES) {
    const cfg = BRANCH_CONFIGS[tpl];
    for (const row of SUBPAGE_FLAG_CHECKS) {
      if (!row.when(cfg)) continue;
      const sections = getAdminSections(row.page, tpl, style);
      if (!sections.includes(row.adminSection)) {
        out.push(
          `[subpage-flag-admin] ${tpl}/${row.page}: cfg enables section "${row.adminSection}" but getAdminSections omits it`,
        );
      }
      if (!row.frontendNeedles.some((n) => frontendHaystack.includes(n))) {
        out.push(
          `[subpage-flag-frontend] ${tpl}/${row.page}: cfg expects "${row.adminSection}" data rendered; none of: ${row.frontendNeedles.join(', ')}`,
        );
      }
    }
  }
  return out;
}

function* walkFieldConfigLeaves(obj: object, prefix: string[]): Generator<string> {
  for (const [k, v] of Object.entries(obj)) {
    const next = [...prefix, k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const o = v as Record<string, unknown>;
      if ('classic' in o && 'modern' in o && 'bold' in o) {
        yield next.join('.');
      } else {
        yield* walkFieldConfigLeaves(v as object, next);
      }
    }
  }
}

/** Every `FIELD_CONFIG.*.*` leaf must be referenced from `AdminEditorBody.tsx`. */
export function fieldConfigEditorReferenceIssues(adminHaystack: string): string[] {
  const out: string[] = [];
  for (const path of walkFieldConfigLeaves(FIELD_CONFIG as object, ['FIELD_CONFIG'])) {
    if (!adminHaystack.includes(path)) {
      out.push(`[field-config-unreferenced] "${path}" is never referenced in AdminEditorBody.tsx`);
    }
  }
  return out;
}
