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
import { getBranchConfig } from './branch-config';

export type PageId = 'home' | 'services' | 'gallery' | 'about' | 'contact';

/** Layout visibility key: hide the Hinweis-Banner (Ticker) when `sectionVisibility.<page>.announcementBar` is `false`. */
export const ANNOUNCEMENT_BAR_SECTION_KEY = 'announcementBar' as const;
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
    { key: 'logos',        label: 'Logo-Strip',               description: 'Logo-Zeile (Presse/Partner).' },
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

/**
 * Whether a catalog section applies to this template (and optional style).
 * Aligns admin editors with `SECTION_CATALOG` instead of ad-hoc branch checks.
 */
export function catalogSectionApplies(page: PageId, key: string, tpl: Variant, style?: Style): boolean {
  const def = SECTION_CATALOG[page].find((s) => s.key === key);
  if (!def) return false;
  if (def.variants?.length && !def.variants.includes(tpl)) return false;
  if (def.styles?.length) {
    if (!style || !def.styles.includes(style)) return false;
  }
  return true;
}

/* ─────────────────────────────────────────────────────────────────
 * DEFAULT ORDERS — what gets rendered when sectionOrder is unset.
 * Home defaults live in `@/lib/template-orders` (`BRANCH_STYLE_ORDER`); the
 * subpages use the defaults below (plus per-variant tweaks in
 * `getDefaultSubpageOrder`).
 * ────────────────────────────────────────────────────────────────── */

const DEFAULT_SUBPAGE_ORDERS: Record<Exclude<PageId, 'home'>, string[]> = {
  services: ['highlights', 'list', 'module', 'process', 'faq', 'cta'],
  gallery:  ['story', 'grid', 'categories', 'cta'],
  about:    ['intro', 'values', 'timeline', 'team', 'numbers', 'certifications', 'press', 'testimonials', 'cta'],
  contact:  ['block', 'locations', 'arrival', 'cta'],
};

function isExtraThree(variant: Variant | undefined): variant is 'consulting' | 'medical' | 'fitness' {
  return variant === 'consulting' || variant === 'medical' || variant === 'fitness';
}

export function getDefaultSubpageOrder(page: Exclude<PageId, 'home'>, variant?: Variant): string[] {
  // Restaurant has a dedicated, full Speisekarte module ("module") so the
  // generic services "list" duplicate (RestaurantMenu rendered from
  // content.services) is removed by default. Tenants can re-enable it.
  if (page === 'services' && variant === 'restaurant') {
    return ['highlights', 'module', 'process', 'faq', 'cta'];
  }
  // Extra branches — same catalog keys as core; order mirrors the previous
  // hard-coded SubPage flows (e.g. medical: spotlight before service cards).
  if (page === 'services' && isExtraThree(variant)) {
    if (variant === 'medical') {
      return ['highlights', 'process', 'list', 'module', 'testimonials', 'gallery', 'faq', 'cta'];
    }
    return ['highlights', 'list', 'process', 'module', 'testimonials', 'gallery', 'faq', 'cta'];
  }
  if (page === 'about' && isExtraThree(variant)) {
    return ['intro', 'values', 'team', 'timeline', 'numbers', 'testimonials', 'faq', 'cta'];
  }
  if (page === 'gallery' && isExtraThree(variant)) {
    return ['story', 'grid', 'categories', 'testimonials', 'cta'];
  }
  if (page === 'contact' && isExtraThree(variant)) {
    return ['block', 'locations', 'arrival', 'faq', 'cta'];
  }
  return [...DEFAULT_SUBPAGE_ORDERS[page]];
}

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

/** Hinweis-Banner (Ticker): respects `sectionVisibility.<page>.announcementBar` on every page (default on). */
export function isAnnouncementBarEnabledOnPage(content: SiteContent, page: PageId): boolean {
  return isSectionEnabled(content, page, ANNOUNCEMENT_BAR_SECTION_KEY);
}

/** Map the browser path to a layout page id (core templates, default paths). */
export function resolveClientPathToPageId(pathname: string, variant: Variant): PageId {
  const p = (pathname.replace(/\/$/, '') || '/').split('?')[0] ?? '/';
  if (p === '/' || p === '') return 'home';
  const cfg = getBranchConfig(variant);
  const first = p.split('/').filter(Boolean)[0] ?? '';
  if (first === cfg.paths.services.replace(/^\//, '')) return 'services';
  if (first === cfg.paths.gallery.replace(/^\//, '')) return 'gallery';
  if (first === cfg.paths.about.replace(/^\//, '')) return 'about';
  if (first === cfg.paths.contact.replace(/^\//, '')) return 'contact';
  return 'home';
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
