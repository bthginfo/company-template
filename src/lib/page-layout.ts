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
    { key: 'action',       label: 'Aktions-Leiste',           description: 'Branchenspezifische Info-Leiste direkt unter dem Hero.' },
    { key: 'signature',    label: 'Branchen-Signatur',        description: 'Variantenspezifischer Akzent-Block (z. B. Manifest).' },
    { key: 'services',     label: 'Leistungen / Speisekarte', description: 'Highlight-Liste der Hauptleistungen.' },
    { key: 'menu',         label: 'Speisekarte (Modul)',      description: 'Kategorisierte Speisekarte mit Allergenen.', variants: ['restaurant'] },
    { key: 'rooms',        label: 'Zimmer (Modul)',           description: 'Zimmer-Showcase mit Preisen.', variants: ['hotel'] },
    { key: 'tours',        label: 'Touren (Modul)',           description: 'Tour-Karten mit Schwierigkeitsgrad.', variants: ['tourism'] },
    { key: 'treatments',   label: 'Treatments (Modul)',       description: 'Behandlungsliste mit Dauer & Preis.', variants: ['salon'] },
    { key: 'funding',      label: 'Förderrechner (Modul)',    description: 'KfW / BAFA Förderübersicht.', variants: ['tradesman'] },
    { key: 'about',        label: 'Über uns',                 description: 'Über-uns-Teaser auf der Startseite.' },
    { key: 'gallery',      label: 'Galerie',                  description: 'Galerie-Vorschau auf der Startseite.' },
    { key: 'numbers',      label: 'Zahlen-Band',              description: 'Vier Eckdaten als Stat-Strip.' },
    { key: 'testimonials', label: 'Bewertungen',              description: 'Kundenstimmen-Block.' },
    { key: 'logos',        label: 'Logo-Strip',               description: 'Partner / Presse Logos.', styles: ['modern'] },
    { key: 'faq',          label: 'FAQ',                      description: 'Häufige Fragen mit Akkordeon.', styles: ['classic', 'modern'] },
    { key: 'news',         label: 'News-Teaser',              description: 'Neueste Beiträge.' },
    { key: 'softCta',      label: 'Soft-CTA',                 description: 'CTA-Block am Seitenende.' },
  ],
  services: [
    { key: 'highlights',   label: 'Highlights-Ribbon',        description: 'Vier kurze Highlights direkt unter dem Hero.' },
    { key: 'list',         label: 'Leistungs-Liste',          description: 'Hauptleistungen / Speisekarte als Showcase.' },
    { key: 'module',       label: 'Branchen-Modul',           description: 'Menu / Rooms / Tours / Treatments / Funding.' },
    { key: 'process',      label: 'So läuft es ab',           description: 'Vier-Schritte-Prozess.' },
    { key: 'testimonials', label: 'Bewertungen',              description: 'Kundenstimmen.' },
    { key: 'gallery',      label: 'Galerie-Vorschau',         description: 'Kleine Galerie auf der Leistungsseite.' },
    { key: 'faq',          label: 'FAQ',                      description: 'Häufig gestellte Fragen.' },
    { key: 'cta',          label: 'Abschluss-CTA',            description: 'CTA-Band oberhalb des Footers.' },
  ],
  gallery: [
    { key: 'story',        label: 'Galerie-Story',            description: 'Story-Block mit Captions.' },
    { key: 'grid',         label: 'Bilder-Grid',              description: 'Hauptgalerie als Masonry/Modern/Showcase.' },
    { key: 'categories',   label: 'Kategorien',               description: 'Kategorien-Cards unter dem Grid.' },
    { key: 'testimonials', label: 'Bewertungen',              description: 'Kundenstimmen unter der Galerie.' },
    { key: 'cta',          label: 'Abschluss-CTA',            description: 'CTA-Band oberhalb des Footers.' },
  ],
  about: [
    { key: 'intro',         label: 'Einleitung',              description: 'Großer About-Body mit Bild.' },
    { key: 'values',        label: 'Werte',                   description: 'Drei Grundsätze.' },
    { key: 'timeline',      label: 'Timeline',                description: 'Meilensteine im Zeitstrahl.' },
    { key: 'team',          label: 'Team',                    description: 'Team-Profile.' },
    { key: 'numbers',       label: 'Zahlen-Band',             description: 'Eckdaten als Stat-Strip.' },
    { key: 'certifications',label: 'Zertifikate',             description: 'Qualifikationen / Auszeichnungen.', variants: ['tradesman'] },
    { key: 'press',         label: 'Presse',                  description: 'Pressestimmen.', variants: ['restaurant'] },
    { key: 'testimonials',  label: 'Bewertungen',             description: 'Kundenstimmen.' },
    { key: 'faq',           label: 'FAQ',                     description: 'Häufig gestellte Fragen.' },
    { key: 'cta',           label: 'Abschluss-CTA',           description: 'CTA-Band oberhalb des Footers.' },
  ],
  contact: [
    { key: 'block',        label: 'Kontakt-Block',            description: 'Formular + Kontaktdaten + Öffnungszeiten.' },
    { key: 'locations',    label: 'Weitere Standorte',        description: 'Zusätzliche Filialen / Zweigstellen.' },
    { key: 'arrival',      label: 'Wegbeschreibung',          description: 'Wie Gäste anreisen + Karte.' },
    { key: 'faq',          label: 'FAQ',                      description: 'Häufige Fragen.' },
    { key: 'cta',          label: 'Abschluss-CTA',            description: 'CTA-Band oberhalb des Footers.' },
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
