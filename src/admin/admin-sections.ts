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

/* ─── Service teaser limits per style ───────────────────────────── */
export const SERVICE_TEASER_LIMIT: Record<TemplateStyle, number> = {
  classic: 3,
  modern: 6,
  bold: 8,
};

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
    description: 'Laufzeile direkt über dem Hero — z. B. Öffnungsstatus oder kurze Aktionen (ein Hinweis pro Zeile).',
  }),
  hero: (_tpl, style) => ({
    title: 'Hero (Startbereich)',
    description: style === 'bold'
      ? 'Erster Eindruck — großer Titel, Eyebrow, Hero-Bild, CTA-Buttons.'
      : style === 'modern'
        ? 'Erster Eindruck — Titel, Untertitel, Beschreibung, Bild rechts, CTA-Buttons.'
        : 'Erster Eindruck — Titel, Untertitel, Hintergrundbild, CTA-Buttons.',
  }),
  actionStrip: () => ({
    title: 'Aktionsleiste',
    description: 'Schmaler Streifen direkt unter dem Hero mit Quick-Infos (Öffnungs­status, Telefonnummer, Tagesinfo).',
  }),
  branchChips: () => ({
    title: 'Schlagwort-Chips & Bewertungs-Badge',
    description: 'Kurze Schlagwörter die das Profil der Marke schärfen, plus optionales Google-Bewertungs-Badge.',
  }),
  marquee: () => ({
    title: 'Schlagwort-Band',
    description: 'Großes animiertes Wortband — fließende Bewegungs-Akzent.',
  }),
  services: (tpl, style) => ({
    title: 'Leistungs-Teaser',
    description:
      tpl === 'restaurant'
        ? `Gerichte und Leistungen legst du hier an und sortierst sie mit „↑ hoch“ / „↓ runter“ unter jedem Eintrag. Die obersten ${SERVICE_TEASER_LIMIT[style]} erscheinen im Startseiten-Teaser; dieselbe Liste wird vollständig auf der Speise-/Leistungsseite gezeigt. Die Menükarte mit Kategorien pflegst du zusätzlich unter „Menü“ auf der Service-Seite.`
        : `Einträge legst du hier an und sortierst sie mit „↑ hoch“ / „↓ runter“. Die obersten ${SERVICE_TEASER_LIMIT[style]} erscheinen im Startseiten-Teaser; dieselbe Liste wird vollständig auf der Leistungs-/Service-Seite gezeigt.`,
  }),
  signature: () => ({
    title: 'Branchen-Highlight',
    description: 'Hervorgehobener Block mit kuratierten Inhalten. Das Frontend rendert ihn je nach Branche/Stil als Empfehlungs-Liste, Manifest oder Item-Showcase.',
  }),
  about: (_tpl, style) => ({
    title: 'Über-uns-Teaser',
    description: style === 'bold'
      ? 'Manifest-Block: Eyebrow, große Überschrift, kurzer Text.'
      : 'Kurzer Text-/Bild-Block, der auf die Über-uns-Seite verweist.',
  }),
  gallery: (_tpl, style) => ({
    title: 'Galerie-Teaser',
    description: `Überschriften und Button hier; Bilder inklusive Reihenfolge unter „Galerie“ (↑↓ je Bild). Die obersten ${GALLERY_TEASER_LIMIT[style]} dieser Liste erscheinen im Startseiten-Teaser.`,
  }),
  numbers: () => ({
    title: 'Eckdaten-Band',
    description: 'Zahl plus Kurz-Label pro Eintrag (typisch vier Stück; Layout ordnet mehr oder weniger automatisch).',
  }),
  logos: () => ({
    title: 'Logo-Strip',
    description: 'Partner / Presse / Auszeichnungen als Wortmarken-Band.',
  }),
  testimonials: (tpl) => ({
    title: 'Bewertungen-Teaser',
    description:
      tpl === 'consulting' || tpl === 'medical' || tpl === 'fitness'
        ? 'Alle Zitate teilen sich eine Liste mit „Über uns → Bewertungen“. Auf dieser Branche wird die Startseite nicht auf drei Zitate gekürzt — Reihenfolge mit „↑ hoch“ / „↓ runter“ unter jedem Eintrag.'
        : 'Alle Zitate teilen sich eine Liste mit „Über uns → Bewertungen“. Hier oder dort pflegen; nur die ersten drei erscheinen auf der Startseite — Reihenfolge mit „↑ hoch“ / „↓ runter“.',
  }),
  news: () => ({
    title: 'News-Teaser',
    description: 'Zeigt die drei neuesten veröffentlichten Beiträge (nach Datum). Beiträge anlegen unter „News & Blog“ in der Seitenleiste.',
  }),
  softCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'Der große Aufruf zur Aktion am Ende der Startseite — Eyebrow, Headline, Untertitel, Button.',
  }),
  funding: () => ({
    title: 'Förder-Rechner',
    description: 'Slider mit konfigurierbarem Investitionsbereich plus Liste der Förderungen — Bereiche und Programme hier pflegen.',
  }),
  spotlight: () => ({
    title: 'Branchen-Spotlight',
    description: 'Branchenspezifischer Hervorhebungs-Block (Vorgehen / Service-Info / Programme — abhängig von Branche).',
  }),
  heroBadge: () => ({
    title: 'Hero-Badge',
    description: 'Das kleine Bewertungs-Badge neben dem Hero-Bild (nur in einigen Stilen sichtbar).',
  }),

  // ─── Services ─────────────────────────────────────────────
  servicesHeader: () => ({
    title: 'Seiten-Header',
    description: 'Überschrift oben auf der Seite.',
  }),
  highlights: () => ({
    title: 'Highlights-Leiste',
    description: 'Kompakte Info-Karten direkt unter dem Seiten-Header (Überschrift + kurzer Text pro Eintrag).',
  }),

  menu: () => ({
    title: 'Speisekarte (Kategorien & Gerichte)',
    description: 'Vollständige Karte mit Kategorien, Allergenen und Tags.',
  }),
  rooms: () => ({
    title: 'Zimmer-Showcase',
    description: 'Detaillierte Zimmer mit Größe, Bett, Preis & Ausstattung.',
  }),
  tours: () => ({
    title: 'Tour-Karten',
    description: 'Touren mit Schwierigkeit, Dauer, Sprachen und Preis.',
  }),
  treatments: () => ({
    title: 'Behandlungen (kategorisiert)',
    description: 'Kategorisierte Behandlungsliste mit Dauer & Preis.',
  }),
  courses: () => ({
    title: 'Kursplan',
    description: 'Kursliste mit Zeitplan, Level, Trainer und Preis.',
  }),
  packages: () => ({
    title: 'Preis-Pakete',
    description: 'Drei-Stufen-Pakete mit Highlight-Karte.',
  }),
  processSteps: () => ({
    title: 'Prozess-Schritte',
    description: 'Horizontale Timeline mit 3–6 Stationen Ihres Vorgehens.',
  }),
  doctors: () => ({
    title: 'Ärzte & Team',
    description: 'Profile der behandelnden Ärztinnen und Ärzte.',
  }),
  booking: () => ({
    title: 'Online-Terminbuchung',
    description: 'Doctolib / jameda / TIMIFY-Anbindung.',
  }),
  fundingModule: () => ({
    title: 'Förder-Übersicht',
    description: 'Liste der Förderprogramme mit Prozent-Quote.',
  }),
  emergencyBanner: () => ({
    title: 'Notdienst-Banner',
    description: 'Sticky-Banner unten rechts mit 24/7-Hotline.',
  }),
  programs: () => ({
    title: 'Programme',
    description: 'Kurse / Trainings im Programm-Spotlight.',
  }),
  medicalNotice: () => ({
    title: 'Hinweise (Online-Termin & Notfall)',
    description: 'Texte für die Service-Karten.',
  }),
  serviceProcess: () => ({
    title: 'Ablauf-Schritte',
    description: 'Die vier Schritte „So läuft es ab".',
  }),
  faq: () => ({
    title: 'FAQ',
    description: 'Häufig gestellte Fragen.',
  }),
  servicesCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'Aufruf zur Aktion am Ende der Seite.',
  }),

  // ─── Gallery ──────────────────────────────────────────────
  galleryHeader: () => ({
    title: 'Seiten-Header',
    description: 'Überschrift oben auf der Galerie-Seite.',
  }),
  galleryStory: () => ({
    title: 'Galerie-Einleitung',
    description: 'Kurzer Text mit drei Captions über den Bildern.',
  }),
  galleryUpload: () => ({
    title: 'Bilder hochladen',
    description: 'Vom Computer wählen oder per URL.',
  }),
  galleryGrid: () => ({
    title: 'Alle Bilder',
    description: 'Komplette Bildergalerie — alle Bilder werden auf der Seite gezeigt.',
  }),
  galleryCategories: () => ({
    title: 'Kategorien-Übersicht',
    description: 'Optionale Kategorie-Karten (z. B. „Küche", „Saal", „Terrasse").',
  }),
  galleryCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'Aufruf zur Aktion am Ende der Galerie.',
  }),

  // ─── About ────────────────────────────────────────────────
  aboutHeader: () => ({
    title: 'Seiten-Header',
    description: 'Überschrift oben auf der Über-uns-Seite.',
  }),
  aboutIntro: (_tpl, style) => ({
    title: style === 'modern' ? 'Einleitung & Sidebar' : 'Geschichte / Intro',
    description: style === 'modern'
      ? 'Einleitungstext links + Sidebar mit Metadaten rechts (sticky).'
      : 'Einleitungstext mit großem Bild.',
  }),
  values: () => ({
    title: 'Werte / Prinzipien',
    description: 'Drei Kernwerte als Karten mit Icons.',
  }),
  timeline: () => ({
    title: 'Timeline / Meilensteine',
    description: 'Chronologische Meilensteine des Unternehmens.',
  }),
  team: () => ({
    title: 'Team',
    description: 'Alle Team-Mitglieder (werden auf der Seite komplett gezeigt).',
  }),
  aboutNumbers: () => ({
    title: 'Eckdaten-Band (Über-uns)',
    description: 'Optionales Zahlen-Band nur für die Über-uns-Seite. Leer lassen = dieselben Eckdaten wie auf der Startseite.',
  }),
  certifications: () => ({
    title: 'Qualifikationen & Zertifizierungen',
    description: 'Meisterbrief, Zulassungen, Partner-Logos.',
  }),
  press: () => ({
    title: 'Presse-Stimmen',
    description: 'Zitate aus Presseberichten.',
  }),
  aboutTestimonials: () => ({
    title: 'Bewertungen',
    description: 'Alle Stimmen (werden auf der Über-uns-Seite komplett gezeigt).',
  }),
  aboutCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'Aufruf zur Aktion am Ende der Über-uns-Seite.',
  }),

  // ─── Contact ──────────────────────────────────────────────
  contactHeader: () => ({
    title: 'Seiten-Header',
    description: 'Überschrift oben auf der Kontakt-Seite (Eyebrow, Titel, Untertitel).',
  }),
  contactDetails: () => ({
    title: 'Kontaktdaten & Karte',
    description: 'Telefon, E-Mail, Adresse, Öffnungszeiten, Google Maps.',
  }),
  contactForm: () => ({
    title: 'Kontakt-Formular',
    description: 'Felder und Konfiguration des Kontaktformulars.',
  }),
  locations: () => ({
    title: 'Weitere Standorte',
    description: 'Zusätzliche Standorte / Filialen (alle werden gezeigt).',
  }),
  arrival: () => ({
    title: 'Wegbeschreibung / Anreise',
    description: 'Drei Karten mit Anreise-Tipps (Auto, Bahn, etc.).',
  }),
  contactCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'Aufruf zur Aktion am Ende der Kontakt-Seite.',
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
 * true  = visible (no special hint)
 * false = hidden (frontend doesn't render this field for this style)
 * string = visible, with that string as hint text
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
    bodyHint: {
      classic: 'Alle Absätze erscheinen im Über-uns-Teaser auf der Startseite.',
      modern:  'Zwei bis drei kurze Absätze wirken auf der Startseite am ruhigsten.',
      bold:    'Zwei kurze Absätze für den Bold-„Manifest"-Teaser.',
    } as Record<TemplateStyle, string>,
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

/** Get hint text (returns the string value, or undefined if boolean) */
export function fieldHint(vis: Record<TemplateStyle, FieldVis>, style: TemplateStyle): string | undefined {
  const v = vis[style];
  return typeof v === 'string' ? v : undefined;
}
