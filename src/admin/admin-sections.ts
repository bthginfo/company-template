/**
 * Admin Section Registry — single source of truth for what the admin shows.
 *
 * For each (branch, style, page) this file declares the EXACT sections
 * that appear in the admin, in the EXACT order the frontend renders them.
 *
 * This eliminates drift between admin and frontend.
 * When adding a section to the frontend, add it here. Period.
 */

import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle, ServiceModule } from '@/lib/branch-config';
import { getBranchConfig } from '@/lib/branch-config';

/* ─── Types ─────────────────────────────────────────────────────── */

export type AdminSectionKey =
  // Home sections
  | 'announcements' | 'hero' | 'actionStrip' | 'branchChips' | 'marquee'
  | 'services' | 'signature' | 'about' | 'gallery' | 'numbers'
  | 'logos' | 'testimonials' | 'news' | 'softCta'
  | 'funding' | 'spotlight' | 'heroBadge'
  // Services sections
  | 'servicesHeader' | 'highlights' | 'menu' | 'rooms'
  | 'tours' | 'treatments' | 'courses' | 'packages' | 'processSteps'
  | 'doctors' | 'booking' | 'fundingModule' | 'emergencyBanner'
  | 'programs' | 'medicalNotice' | 'serviceProcess' | 'faq' | 'servicesCta'
  // Gallery sections
  | 'galleryHeader' | 'galleryStory' | 'galleryUpload' | 'galleryGrid'
  | 'galleryCategories' | 'galleryCta'
  // About sections
  | 'aboutHeader' | 'aboutIntro' | 'values' | 'timeline' | 'team'
  | 'aboutNumbers' | 'certifications' | 'press' | 'aboutTestimonials' | 'aboutCta'
  // Contact sections
  | 'contactHeader' | 'contactDetails' | 'contactForm' | 'locations'
  | 'arrival' | 'contactCta';

export interface AdminSection {
  key: AdminSectionKey;
  title: string;
  description: string;
  /** Badge label shown in the section header. */
  badge?: string;
}

export type PageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

export const GALLERY_TEASER_LIMIT: Record<TemplateStyle, number> = {
  classic: 7,
  modern: 6,
  bold: 12,
};

/* ─── Home page section orders ──────────────────────────────────── */

/**
 * The EXACT section order for the homepage frontend.
 * Mirrors BRANCH_STYLE_ORDER in TemplateApp.tsx.
 * 'announcements' and 'hero' are always first (not reorderable).
 */
const HOME_ORDER: Record<TemplateKey, Record<TemplateStyle, AdminSectionKey[]>> = {
  restaurant: {
    classic: ['announcements', 'hero', 'actionStrip', 'signature', 'about', 'gallery', 'numbers', 'testimonials', 'news', 'softCta'],
    modern:  ['announcements', 'hero', 'actionStrip', 'services', 'signature', 'about', 'gallery', 'testimonials', 'numbers', 'news', 'softCta'],
    bold:    ['announcements', 'hero', 'marquee', 'actionStrip', 'signature', 'numbers', 'gallery', 'about', 'testimonials', 'news', 'softCta'],
  },
  salon: {
    classic: ['announcements', 'hero', 'actionStrip', 'signature', 'gallery', 'about', 'testimonials', 'numbers', 'news', 'softCta'],
    modern:  ['announcements', 'hero', 'actionStrip', 'signature', 'gallery', 'testimonials', 'about', 'numbers', 'news', 'softCta'],
    bold:    ['announcements', 'hero', 'marquee', 'actionStrip', 'gallery', 'signature', 'about', 'numbers', 'testimonials', 'news', 'softCta'],
  },
  tradesman: {
    classic: ['announcements', 'hero', 'actionStrip', 'services', 'funding', 'numbers', 'gallery', 'signature', 'testimonials', 'about', 'news', 'softCta'],
    modern:  ['announcements', 'hero', 'actionStrip', 'numbers', 'services', 'funding', 'signature', 'gallery', 'about', 'testimonials', 'news', 'softCta'],
    bold:    ['announcements', 'hero', 'marquee', 'actionStrip', 'services', 'funding', 'signature', 'gallery', 'numbers', 'about', 'testimonials', 'news', 'softCta'],
  },
  hotel: {
    classic: ['announcements', 'hero', 'actionStrip', 'signature', 'about', 'gallery', 'testimonials', 'numbers', 'news', 'softCta'],
    modern:  ['announcements', 'hero', 'actionStrip', 'gallery', 'signature', 'about', 'numbers', 'testimonials', 'news', 'softCta'],
    bold:    ['announcements', 'hero', 'marquee', 'actionStrip', 'gallery', 'signature', 'numbers', 'about', 'testimonials', 'news', 'softCta'],
  },
  tourism: {
    classic: ['announcements', 'hero', 'actionStrip', 'gallery', 'signature', 'about', 'testimonials', 'numbers', 'news', 'softCta'],
    modern:  ['announcements', 'hero', 'actionStrip', 'signature', 'gallery', 'numbers', 'about', 'testimonials', 'news', 'softCta'],
    bold:    ['announcements', 'hero', 'marquee', 'actionStrip', 'gallery', 'numbers', 'signature', 'about', 'testimonials', 'news', 'softCta'],
  },
  /* Extra branches — mirrors EXTRA_HOME_ORDER in page-layout.ts.
     branchModules/team/contact are edited on their own pages, not shown here.
     heroBadge fields are edited inside the branchChips section card. */
  consulting: {
    classic: ['announcements', 'hero', 'branchChips', 'about', 'services', 'spotlight', 'gallery', 'testimonials', 'news'],
    modern:  ['announcements', 'hero', 'branchChips', 'about', 'services', 'spotlight', 'gallery', 'testimonials', 'news'],
    bold:    ['announcements', 'hero', 'branchChips', 'marquee', 'about', 'services', 'spotlight', 'gallery', 'testimonials', 'news'],
  },
  medical: {
    classic: ['announcements', 'hero', 'branchChips', 'about', 'services', 'spotlight', 'gallery', 'testimonials', 'news'],
    modern:  ['announcements', 'hero', 'branchChips', 'about', 'services', 'spotlight', 'gallery', 'testimonials', 'news'],
    bold:    ['announcements', 'hero', 'branchChips', 'marquee', 'about', 'services', 'spotlight', 'gallery', 'testimonials', 'news'],
  },
  fitness: {
    classic: ['announcements', 'hero', 'branchChips', 'about', 'services', 'spotlight', 'gallery', 'testimonials', 'news'],
    modern:  ['announcements', 'hero', 'branchChips', 'about', 'services', 'spotlight', 'gallery', 'testimonials', 'news'],
    bold:    ['announcements', 'hero', 'branchChips', 'marquee', 'about', 'services', 'spotlight', 'gallery', 'testimonials', 'news'],
  },
};

/* ─── Services page section orders ──────────────────────────────── */

/** Map ServiceModule enum values to AdminSectionKey */
export const MODULE_TO_KEY: Record<ServiceModule, AdminSectionKey> = {
  menu: 'menu', rooms: 'rooms', tours: 'tours',
  treatments: 'treatments', courses: 'courses', packages: 'packages',
  processSteps: 'processSteps', doctors: 'doctors', booking: 'booking',
  funding: 'fundingModule', emergencyBanner: 'emergencyBanner',
  programs: 'programs', medicalNotice: 'medicalNotice',
};

function servicesOrder(tpl: TemplateKey, _style: TemplateStyle): AdminSectionKey[] {
  const cfg = getBranchConfig(tpl);
  const base: AdminSectionKey[] = ['servicesHeader'];
  if (cfg.services.showHighlights) base.push('highlights');

  // Derive module sections from branch config — single source of truth
  for (const mod of cfg.services.modules) {
    const key = MODULE_TO_KEY[mod];
    if (key) base.push(key);
  }

  if (cfg.services.showProcess) base.push('serviceProcess');
  if (cfg.services.showFaq) base.push('faq');
  if (cfg.services.showCta) base.push('servicesCta');
  return base;
}

/* ─── Gallery page section orders ───────────────────────────────── */

function galleryOrder(tpl: TemplateKey, _style: TemplateStyle): AdminSectionKey[] {
  const cfg = getBranchConfig(tpl);
  const base: AdminSectionKey[] = ['galleryHeader'];
  if (cfg.gallery.showStory) base.push('galleryStory');
  if (cfg.gallery.showUpload) base.push('galleryUpload');
  base.push('galleryGrid');
  if (cfg.gallery.showCategories) base.push('galleryCategories');
  if (cfg.gallery.showCta) base.push('galleryCta');
  return base;
}

/* ─── About page section orders ─────────────────────────────────── */

function aboutOrder(tpl: TemplateKey, _style: TemplateStyle): AdminSectionKey[] {
  const cfg = getBranchConfig(tpl);
  const base: AdminSectionKey[] = ['aboutHeader', 'aboutIntro'];
  if (cfg.about.showValues) base.push('values');
  if (cfg.about.showTimeline) base.push('timeline');
  base.push('team');
  if (cfg.about.showNumbers) base.push('aboutNumbers');
  // Derive extra sections from branch config
  if (cfg.about.extras.includes('certifications')) base.push('certifications');
  if (cfg.about.extras.includes('press')) base.push('press');
  if (cfg.about.showTestimonials) base.push('aboutTestimonials');
  if (cfg.about.showCta) base.push('aboutCta');
  return base;
}

/* ─── Contact page section orders ───────────────────────────────── */

function contactOrder(tpl: TemplateKey, _style: TemplateStyle): AdminSectionKey[] {
  const cfg = getBranchConfig(tpl);
  const base: AdminSectionKey[] = ['contactHeader', 'contactDetails'];
  if (cfg.contact.showForm) base.push('contactForm');
  base.push('locations');
  if (cfg.contact.showArrival) base.push('arrival');
  if (cfg.contact.showCta) base.push('contactCta');
  return base;
}

/* ─── Public API ────────────────────────────────────────────────── */

export function getAdminSections(page: PageKey, tpl: TemplateKey, style: TemplateStyle): AdminSectionKey[] {
  // Return a copy (HOME_ORDER values are readonly arrays / shared arrays).
  switch (page) {
    case 'home': return [...HOME_ORDER[tpl][style]];
    case 'services': return servicesOrder(tpl, style);
    case 'gallery': return galleryOrder(tpl, style);
    case 'about': return aboutOrder(tpl, style);
    case 'contact': return contactOrder(tpl, style);
  }
}

/**
 * Section keys that the corresponding page editor in `AdminEditorBody.tsx`
 * has a `case` for. The drift-coverage test asserts every key returned by
 * `getAdminSections` is in the matching set, so a typo / missing case is
 * caught at build time instead of silently rendering nothing.
 */
export const HANDLED_SECTIONS_BY_PAGE: Record<PageKey, readonly AdminSectionKey[]> = {
  home: [
    'announcements', 'hero', 'actionStrip', 'branchChips', 'marquee',
    'services', 'signature', 'about', 'gallery', 'numbers',
    'logos', 'testimonials', 'news', 'softCta',
    'funding', 'spotlight',
  ],
  services: [
    'servicesHeader', 'highlights',
    'menu', 'rooms', 'tours', 'treatments', 'courses', 'packages',
    'processSteps', 'doctors', 'booking', 'fundingModule', 'emergencyBanner',
    'programs', 'medicalNotice',
    'serviceProcess', 'faq', 'servicesCta',
  ],
  gallery: ['galleryHeader', 'galleryStory', 'galleryUpload', 'galleryGrid', 'galleryCategories', 'galleryCta'],
  about: [
    'aboutHeader', 'aboutIntro', 'values', 'timeline', 'team', 'aboutNumbers',
    'certifications', 'press', 'aboutTestimonials', 'aboutCta',
  ],
  contact: ['contactHeader', 'contactDetails', 'contactForm', 'locations', 'arrival', 'contactCta'],
};

/* ─── Section metadata (titles, descriptions) per branch×style ─── */

interface SectionMeta {
  title: string;
  description: string;
}

type MetaResolver = (tpl: TemplateKey, style: TemplateStyle) => SectionMeta;

/*
 * Section labels are deliberately data-driven (what the tenant edits)
 * rather than presentation-driven (how the frontend renders it). The same
 * "Branchen-Highlight" data renders as "Empfehlungen vom Haus" in
 * Restaurant-Modern and as a numbered list in Restaurant-Bold; the admin
 * shouldn't pretend those are different sections.
 */

const SECTION_META: Record<AdminSectionKey, MetaResolver> = {
  // ─── Home ─────────────────────────────────────────────────
  announcements: () => ({
    title: 'Hinweis-Banner (oben)',
    description: 'Ticker-Zeilen über dem Hero.',
  }),
  hero: () => ({
    title: 'Hero (Startbereich)',
    description: 'Großer Einstieg: Titel, Text, Bild, Buttons.',
  }),
  actionStrip: () => ({
    title: 'Aktionsleiste',
    description: 'Infostreifen direkt unter dem Hero.',
  }),
  branchChips: () => ({
    title: 'Schlagwort-Chips & Bewertungs-Badge',
    description: 'Stichwörter und optionales Bewertungs-Badge.',
  }),
  marquee: () => ({
    title: 'Schlagwort-Band',
    description: 'Animiertes Wortband (Bold).',
  }),
  services: (tpl) => ({
    title: 'Leistungs-Teaser',
    description:
      tpl === 'restaurant'
        ? 'Liste für Gerichte/Leistungen (↑↓). Kategorie-Karte = eigene Sektion „Menü“.'
        : 'Liste für Leistungen/Gerichte (↑↓).',
  }),
  signature: () => ({
    title: 'Branchen-Highlight',
    description: 'Branchen-spezifischer Highlight-Block.',
  }),
  about: () => ({
    title: 'Über-uns-Teaser',
    description: 'Kurzer Über-uns-Abschnitt auf der Startseite.',
  }),
  gallery: () => ({
    title: 'Galerie-Teaser',
    description: 'Teaser-Texte; Bilder unter „Galerie“.',
  }),
  numbers: () => ({
    title: 'Eckdaten-Band',
    description: 'Zahlen-Leiste mit Kurz-Labels.',
  }),
  logos: () => ({
    title: 'Logo-Strip',
    description: 'Partner-/Logo-Zeile.',
  }),
  testimonials: (tpl) => ({
    title: 'Bewertungen-Teaser',
    description:
      tpl === 'consulting' || tpl === 'medical' || tpl === 'fitness'
        ? 'Kundenstimmen auf der Startseite.'
        : 'Kundenstimmen (auf der Startseite oft drei).',
  }),
  news: () => ({
    title: 'News-Teaser',
    description: 'Neueste Blog-Beiträge.',
  }),
  softCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'Call-to-Action am Ende der Startseite.',
  }),
  funding: () => ({
    title: 'Förder-Rechner',
    description: 'Förder-Rechner (Handwerk).',
  }),
  spotlight: () => ({
    title: 'Branchen-Spotlight',
    description: 'Hervorgehobener Branchen-Block.',
  }),
  heroBadge: () => ({
    title: 'Hero-Badge',
    description: 'Kleines Bewertungs-Badge am Hero.',
  }),

  // ─── Services ─────────────────────────────────────────────
  servicesHeader: () => ({
    title: 'Seiten-Header',
    description: 'Titelzeile dieser Seite.',
  }),
  highlights: () => ({
    title: 'Highlights-Leiste',
    description: 'Kurze Info-Kacheln unter dem Header.',
  }),

  menu: () => ({
    title: 'Speisekarte (Kategorien & Gerichte)',
    description: 'Menü mit Kategorien.',
  }),
  rooms: () => ({
    title: 'Zimmer-Showcase',
    description: 'Zimmer-Karten.',
  }),
  tours: () => ({
    title: 'Tour-Karten',
    description: 'Tour-Angebote.',
  }),
  treatments: () => ({
    title: 'Behandlungen (kategorisiert)',
    description: 'Behandlungen nach Kategorie.',
  }),
  courses: () => ({
    title: 'Kursplan',
    description: 'Kurs-/Stundenliste.',
  }),
  packages: () => ({
    title: 'Preis-Pakete',
    description: 'Preis-Pakete.',
  }),
  processSteps: () => ({
    title: 'Prozess-Schritte',
    description: 'Schrittfolge / Timeline.',
  }),
  doctors: () => ({
    title: 'Ärzte & Team',
    description: 'Ärzte-Profile.',
  }),
  booking: () => ({
    title: 'Online-Terminbuchung',
    description: 'Terminbuchungs-Links.',
  }),
  fundingModule: () => ({
    title: 'Förder-Übersicht',
    description: 'Förderprogramm-Liste.',
  }),
  emergencyBanner: () => ({
    title: 'Notdienst-Banner',
    description: 'Notfall-Hinweis-Banner.',
  }),
  programs: () => ({
    title: 'Programme',
    description: 'Programm-/Kurs-Spotlight.',
  }),
  medicalNotice: () => ({
    title: 'Hinweise (Online-Termin & Notfall)',
    description: 'Kurz-Hinweise für Service-Karten.',
  }),
  serviceProcess: () => ({
    title: 'Ablauf-Schritte',
    description: 'Schritt-für-Schritt-Ablauf.',
  }),
  faq: () => ({
    title: 'FAQ',
    description: 'Fragen & Antworten.',
  }),
  servicesCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'CTA am Seitenende.',
  }),

  // ─── Gallery ──────────────────────────────────────────────
  galleryHeader: () => ({
    title: 'Seiten-Header',
    description: 'Titel dieser Galerie-Seite.',
  }),
  galleryStory: () => ({
    title: 'Galerie-Einleitung',
    description: 'Einleitungstext zur Galerie.',
  }),
  galleryUpload: () => ({
    title: 'Bilder hochladen',
    description: 'Upload oder URL.',
  }),
  galleryGrid: () => ({
    title: 'Alle Bilder',
    description: 'Die Bildergalerie.',
  }),
  galleryCategories: () => ({
    title: 'Kategorien-Übersicht',
    description: 'Optionale Galerie-Kategorien.',
  }),
  galleryCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'CTA unter der Galerie.',
  }),

  // ─── About ────────────────────────────────────────────────
  aboutHeader: () => ({
    title: 'Seiten-Header',
    description: 'Titel der Über-uns-Seite.',
  }),
  aboutIntro: () => ({
    title: 'Geschichte / Intro',
    description: 'Haupttext und Bild.',
  }),
  values: () => ({
    title: 'Werte / Prinzipien',
    description: 'Werte-Karten.',
  }),
  timeline: () => ({
    title: 'Timeline / Meilensteine',
    description: 'Zeitleiste.',
  }),
  team: () => ({
    title: 'Team',
    description: 'Team-Mitglieder.',
  }),
  aboutNumbers: () => ({
    title: 'Eckdaten-Band (Über-uns)',
    description: 'Zahlen-Band (optional statt Startseiten-Zahlen).',
  }),
  certifications: () => ({
    title: 'Qualifikationen & Zertifizierungen',
    description: 'Nachweise / Auszeichnungen.',
  }),
  press: () => ({
    title: 'Presse-Stimmen',
    description: 'Presse-Zitate.',
  }),
  aboutTestimonials: () => ({
    title: 'Bewertungen',
    description: 'Kundenstimmen.',
  }),
  aboutCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'CTA am Seitenende.',
  }),

  // ─── Contact ──────────────────────────────────────────────
  contactHeader: () => ({
    title: 'Seiten-Header',
    description: 'Titel der Kontaktseite.',
  }),
  contactDetails: () => ({
    title: 'Kontaktdaten & Karte',
    description: 'Erreichbarkeit und Karte.',
  }),
  contactForm: () => ({
    title: 'Kontakt-Formular',
    description: 'Formularfelder.',
  }),
  locations: () => ({
    title: 'Weitere Standorte',
    description: 'Weitere Filialen.',
  }),
  arrival: () => ({
    title: 'Wegbeschreibung / Anreise',
    description: 'Anreise-Hinweise.',
  }),
  contactCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'CTA am Seitenende.',
  }),
};

export function getSectionMeta(key: AdminSectionKey, tpl: TemplateKey, style: TemplateStyle): SectionMeta {
  return SECTION_META[key](tpl, style);
}

/* ─── Field-level visibility per section × style ────────────────── */

/**
 * Declares which admin fields are visible per section×style.
 * Only sections with style-dependent field differences are listed.
 * Sections not listed here show all their fields on all styles.
 *
 * true = visible · false = ausgeblendet
 */
type FieldVis = boolean | string;

export const FIELD_CONFIG = {
  /** HOME: Signature section */
  signature: {
    intro:     { classic: true,  modern: false, bold: false } as Record<TemplateStyle, FieldVis>,
    metaLabel: { classic: false, modern: true,  bold: false } as Record<TemplateStyle, FieldVis>,
  },

  /** HOME: About teaser */
  homeAbout: {
    aboutTeaserEyebrow: { classic: true, modern: true,  bold: false } as Record<TemplateStyle, FieldVis>,
    aboutImage:         { classic: true, modern: true,  bold: false } as Record<TemplateStyle, FieldVis>,
  },

  /** CTA fields — differ between HOME softCta and subpage CtaBand */
  cta: {
    /** HOME softCta: classic uses CtaBand (all), modern SoftCta (no leadAccent), bold SoftCta (no eyebrow/leadAccent) */
    homeEyebrow:     { classic: true, modern: true,  bold: false } as Record<TemplateStyle, FieldVis>,
    homeLeadAccent:  { classic: true, modern: false, bold: false } as Record<TemplateStyle, FieldVis>,
    /** Subpage CtaBand: always renders all fields regardless of style */
    subEyebrow:      { classic: true, modern: true, bold: true } as Record<TemplateStyle, FieldVis>,
    subLeadAccent:   { classic: true, modern: true, bold: true } as Record<TemplateStyle, FieldVis>,
  },
} as const;

/** Check if a field should be shown for the current style */
export function fieldVisible(vis: Record<TemplateStyle, FieldVis>, style: TemplateStyle): boolean {
  return vis[style] !== false;
}
