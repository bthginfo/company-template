/**
 * Page-layout catalog + helpers.
 *
 * For each subpage we define:
 *  - the *available* section keys (the union of everything we know how to render)
 *  - the *default order* per (variant, style)
 *
 * Tenants may override:
 *  - sectionVisibility[`<page>.<key>`] = false   → hide a section
 *  - sectionOrder[<page>] = ['k1','k2',…]        → custom order
 *
 * Adding a new section in the admin = inserting a key into sectionOrder that
 * isn't part of the default flow but is in the catalog. The renderer only
 * renders keys that map to a real React block.
 */

import type { SiteContent } from './types';

export type PageId = 'home' | 'services' | 'gallery' | 'about' | 'contact';
export type Variant = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism' | 'consulting' | 'medical' | 'fitness';
export type Style = 'classic' | 'modern' | 'bold';

export type SectionDef = {
  /** Section key (without page prefix). */
  key: string;
  /** Human label shown in the admin Layout-Manager. */
  label: string;
  /** Short description shown next to the toggle. */
  description: string;
  /** Restrict to specific variants (omit = all). */
  variants?: Variant[];
  /** Restrict to specific styles (omit = all). */
  styles?: Style[];
};

/* ─────────────────────────────────────────────────────────────────
 * SECTION CATALOG — all section keys we know how to render per page.
 * The renderer must have a corresponding entry in its `blocks` map.
 * ────────────────────────────────────────────────────────────────── */

export const SECTION_CATALOG: Record<PageId, SectionDef[]> = {
  home: [
    { key: 'action',       label: 'Aktions-Leiste',           description: 'Info-Leiste unter dem Hero.' },
    { key: 'chips',        label: 'Branchen-Stichworte',      description: 'Stichworte unter dem Hero.', variants: ['consulting', 'medical', 'fitness'] },
    { key: 'marquee',      label: 'Schlagwort-Band',          description: 'Animiertes Wortband.', styles: ['bold'] },
    { key: 'signature',    label: 'Branchen-Signatur',        description: 'Branchen-Highlight.', variants: ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism'] },
    { key: 'services',     label: 'Leistungen / Speisekarte', description: 'Teaser-Liste (↑↓).' },
    { key: 'menu',         label: 'Speisekarte (Modul)',      description: 'Menü mit Kategorien.', variants: ['restaurant'] },
    { key: 'rooms',        label: 'Zimmer (Modul)',           description: 'Zimmer-Showcase.', variants: ['hotel'] },
    { key: 'tours',        label: 'Touren (Modul)',           description: 'Tour-Karten.', variants: ['tourism'] },
    { key: 'treatments',   label: 'Treatments (Modul)',       description: 'Behandlungen.', variants: ['salon'] },
    { key: 'funding',      label: 'Förderrechner (Modul)',    description: 'Förder-Rechner.', variants: ['tradesman'] },
    { key: 'spotlight',    label: 'Branchen-Spotlight',       description: 'Branchen-Spotlight.', variants: ['consulting', 'medical', 'fitness'] },
    { key: 'branchModules',label: 'Branchen-Module',          description: 'Weitere Module.', variants: ['consulting', 'medical', 'fitness'] },
    { key: 'team',         label: 'Team',                     description: 'Team-Sektion.', variants: ['consulting', 'medical', 'fitness'] },
    { key: 'about',        label: 'Über uns',                 description: 'Über-uns-Teaser.' },
    { key: 'gallery',      label: 'Galerie',                  description: 'Galerie-Teaser.' },
    { key: 'numbers',      label: 'Zahlen-Band',              description: 'Zahlen-Leiste.' },
    { key: 'testimonials', label: 'Bewertungen',              description: 'Kundenstimmen.' },
    { key: 'logos',        label: 'Logo-Strip',               description: 'Logo-Zeile.', styles: ['modern'] },
    { key: 'faq',          label: 'FAQ',                      description: 'FAQ.', styles: ['classic', 'modern'] },
    { key: 'news',         label: 'News-Teaser',              description: 'Blog-Vorschau.' },
    { key: 'softCta',      label: 'Soft-CTA',                 description: 'Abschluss-CTA.' },
    { key: 'contact',      label: 'Kontakt-Sektion',          description: 'Kontakt-Sektion.', variants: ['consulting', 'medical', 'fitness'] },
  ],
  services: [
    { key: 'highlights',   label: 'Highlights-Ribbon',        description: 'Highlight-Kacheln.' },
    { key: 'list',         label: 'Leistungs-Liste',          description: 'Vollliste wie Teaser (optional).' },
    { key: 'module',       label: 'Branchen-Modul',           description: 'Branchen-Modul.' },
    { key: 'process',      label: 'So läuft es ab',           description: 'Ablauf-Schritte.' },
    { key: 'testimonials', label: 'Bewertungen',              description: 'Bewertungen (gleiche Daten).' },
    { key: 'gallery',      label: 'Galerie-Vorschau',         description: 'Galerie-Auszug.' },
    { key: 'faq',          label: 'FAQ',                      description: 'FAQ.' },
    { key: 'cta',          label: 'Abschluss-CTA',            description: 'Abschluss-CTA.' },
  ],
  gallery: [
    { key: 'story',        label: 'Galerie-Story',            description: 'Einleitung.' },
    { key: 'grid',         label: 'Bilder-Grid',              description: 'Haupt-Galerie.' },
    { key: 'categories',   label: 'Kategorien',               description: 'Kategorien.' },
    { key: 'testimonials', label: 'Bewertungen',              description: 'Bewertungen.' },
    { key: 'cta',          label: 'Abschluss-CTA',            description: 'Abschluss-CTA.' },
  ],
  about: [
    { key: 'intro',         label: 'Einleitung',              description: 'Intro & Text.' },
    { key: 'values',        label: 'Werte',                   description: 'Werte.' },
    { key: 'timeline',      label: 'Timeline',                description: 'Meilensteine.' },
    { key: 'team',          label: 'Team',                    description: 'Team.' },
    { key: 'numbers',       label: 'Zahlen-Band',             description: 'Zahlen-Leiste.' },
    { key: 'certifications',label: 'Zertifikate',             description: 'Qualifikationen.', variants: ['tradesman'] },
    { key: 'press',         label: 'Presse',                  description: 'Presse.', variants: ['restaurant'] },
    { key: 'testimonials',  label: 'Bewertungen',             description: 'Bewertungen.' },
    { key: 'faq',           label: 'FAQ',                     description: 'FAQ.' },
    { key: 'cta',           label: 'Abschluss-CTA',           description: 'Abschluss-CTA.' },
  ],
  contact: [
    { key: 'block',        label: 'Kontakt-Block',            description: 'Formular & Daten.' },
    { key: 'locations',    label: 'Weitere Standorte',        description: 'Standorte.' },
    { key: 'arrival',      label: 'Wegbeschreibung',          description: 'Anreise.' },
    { key: 'faq',          label: 'FAQ',                      description: 'FAQ.' },
    { key: 'cta',          label: 'Abschluss-CTA',            description: 'Abschluss-CTA.' },
  ],
};

/* ─────────────────────────────────────────────────────────────────
 * DEFAULT ORDERS — what gets rendered when sectionOrder is unset.
 * Home keeps the existing BRANCH_STYLE_ORDER (in TemplateApp.tsx); the
 * subpages are simpler and share defaults across styles.
 * ────────────────────────────────────────────────────────────────── */

const DEFAULT_SUBPAGE_ORDERS: Record<Exclude<PageId, 'home'>, string[]> = {
  services: ['highlights', 'list', 'module', 'process', 'faq', 'cta'],
  gallery:  ['story', 'grid', 'categories', 'cta'],
  about:    ['intro', 'values', 'timeline', 'team', 'numbers', 'certifications', 'press', 'testimonials', 'cta'],
  contact:  ['block', 'locations', 'arrival', 'cta'],
};

export function getDefaultSubpageOrder(page: Exclude<PageId, 'home'>, variant?: Variant): string[] {
  // Restaurant has a dedicated, full Speisekarte module ("module") so the
  // generic services "list" duplicate (RestaurantMenu rendered from
  // content.services) is removed by default. Tenants can re-enable it.
  if (page === 'services' && variant === 'restaurant') {
    return ['highlights', 'module', 'process', 'faq', 'cta'];
  }
  return [...DEFAULT_SUBPAGE_ORDERS[page]];
}

/* ─────────────────────────────────────────────────────────────────
 * EXTRA HOME ORDERS — 3 extra branches × 3 styles = 9 flows.
 * Used by extra/index.tsx when no custom sectionOrder is set.
 * ────────────────────────────────────────────────────────────────── */
export const EXTRA_HOME_ORDER: Record<'consulting' | 'medical' | 'fitness', Record<Style, string[]>> = {
  consulting: {
    classic: ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    modern:  ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    bold:    ['chips', 'marquee', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
  },
  medical: {
    classic: ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    modern:  ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    bold:    ['chips', 'marquee', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
  },
  fitness: {
    classic: ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    modern:  ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    bold:    ['chips', 'marquee', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
  },
};

/* ─────────────────────────────────────────────────────────────────
 * Helpers used by the renderer + admin
 * ────────────────────────────────────────────────────────────────── */

/**
 * Visibility check. Looks up `${page}.${key}`. For the `home` page also
 * falls back to the legacy unprefixed key (so old data keeps working).
 * Default: visible.
 */
export function isSectionEnabled(content: SiteContent, page: PageId, key: string): boolean {
  const flags = ((content as any).sectionVisibility ?? {}) as Record<string, boolean>;
  const fullKey = `${page}.${key}`;
  if (fullKey in flags) return flags[fullKey] !== false;
  // Legacy: home used unprefixed keys before the layout manager
  if (page === 'home' && key in flags) return flags[key] !== false;
  return true;
}

/**
 * Returns the effective order for a page. If the tenant has a
 * `sectionOrder[page]` set, use that (filtered to known catalog keys);
 * otherwise return the default flow. For `home` the default is the
 * catalog order filtered to the variant — actual rendering still uses
 * the variant/style-specific BRANCH_STYLE_ORDER unless an override exists.
 */
export function getEffectivePageOrder(
  content: SiteContent,
  page: PageId,
  variant?: Variant,
): string[] {
  const orders = ((content as any).sectionOrder ?? {}) as Record<string, string[]>;
  const custom = orders[page];
  const validKeys = new Set(SECTION_CATALOG[page].map((s) => s.key));
  if (Array.isArray(custom) && custom.length) {
    return custom.filter((k) => validKeys.has(k));
  }
  if (page === 'home') {
    return SECTION_CATALOG.home
      .filter((s) => !s.variants || !variant || s.variants.includes(variant))
      .map((s) => s.key);
  }
  return getDefaultSubpageOrder(page, variant);
}

/**
 * Returns sections from the catalog that are NOT in the current order
 * yet — useful for the "+ Sektion hinzufügen" dropdown.
 */
export function getRemainingSections(
  page: PageId,
  current: string[],
  variant?: Variant,
  style?: Style,
): SectionDef[] {
  return SECTION_CATALOG[page].filter((s) => {
    if (current.includes(s.key)) return false;
    if (s.variants && variant && !s.variants.includes(variant)) return false;
    if (s.styles && style && !s.styles.includes(style)) return false;
    return true;
  });
}

/**
 * Returns sections from the catalog that are valid for this variant
 * (i.e. not restricted to other variants).
 */
export function getCatalogForVariant(page: PageId, variant?: Variant, style?: Style): SectionDef[] {
  return SECTION_CATALOG[page].filter((s) => {
    if (s.variants && variant && !s.variants.includes(variant)) return false;
    if (s.styles && style && !s.styles.includes(style)) return false;
    return true;
  });
}
