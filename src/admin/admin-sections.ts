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
const MODULE_TO_KEY: Partial<Record<ServiceModule, AdminSectionKey>> = {
  menu: 'menu', rooms: 'rooms', tours: 'tours',
  treatments: 'treatments', courses: 'courses', packages: 'packages',
  processSteps: 'processSteps', doctors: 'doctors', booking: 'booking',
  funding: 'fundingModule', emergencyBanner: 'emergencyBanner',
  programs: 'programs', medicalNotice: 'medicalNotice',
};

function servicesOrder(tpl: TemplateKey, _style: TemplateStyle): AdminSectionKey[] {
  const cfg = getBranchConfig(tpl);
  const base: AdminSectionKey[] = ['servicesHeader', 'highlights'];

  // Derive module sections from branch config — single source of truth
  for (const mod of cfg.services.modules) {
    const key = MODULE_TO_KEY[mod];
    if (key) base.push(key);
  }

  base.push('serviceProcess', 'faq', 'servicesCta');
  return base;
}

/* ─── Gallery page section orders ───────────────────────────────── */

function galleryOrder(_tpl: TemplateKey, _style: TemplateStyle): AdminSectionKey[] {
  return ['galleryHeader', 'galleryStory', 'galleryUpload', 'galleryGrid', 'galleryCategories', 'galleryCta'];
}

/* ─── About page section orders ─────────────────────────────────── */

function aboutOrder(tpl: TemplateKey, _style: TemplateStyle): AdminSectionKey[] {
  const cfg = getBranchConfig(tpl);
  const base: AdminSectionKey[] = ['aboutHeader', 'aboutIntro', 'values', 'timeline', 'team', 'aboutNumbers'];
  // Derive extra sections from branch config
  if (cfg.about.extras.includes('certifications')) base.push('certifications');
  if (cfg.about.extras.includes('press')) base.push('press');
  base.push('aboutTestimonials', 'aboutCta');
  return base;
}

/* ─── Contact page section orders ───────────────────────────────── */

function contactOrder(_tpl: TemplateKey, _style: TemplateStyle): AdminSectionKey[] {
  return ['contactHeader', 'contactDetails', 'contactForm', 'locations', 'arrival', 'contactCta'];
}

/* ─── Public API ────────────────────────────────────────────────── */

export function getAdminSections(page: PageKey, tpl: TemplateKey, style: TemplateStyle): AdminSectionKey[] {
  switch (page) {
    case 'home': return HOME_ORDER[tpl][style];
    case 'services': return servicesOrder(tpl, style);
    case 'gallery': return galleryOrder(tpl, style);
    case 'about': return aboutOrder(tpl, style);
    case 'contact': return contactOrder(tpl, style);
  }
}

/* ─── Section metadata (titles, descriptions) per branch×style ─── */

interface SectionMeta {
  title: string;
  description: string;
}

type MetaResolver = (tpl: TemplateKey, style: TemplateStyle) => SectionMeta;

const serviceLabel = (tpl: TemplateKey) =>
  tpl === 'restaurant' ? 'Speisekarte' : 'Leistungen';

const SECTION_META: Record<AdminSectionKey, MetaResolver> = {
  // ─── Home ─────────────────────────────────────────────────
  announcements: () => ({
    title: 'Lauftext-Banner',
    description: 'Die kleine Marquee-Zeile ganz oben über dem Hero.',
  }),
  hero: (_tpl, style) => ({
    title: 'Hero (Startbereich)',
    description: style === 'bold'
      ? 'Erster Eindruck – großer Titel, Eyebrow, Hero-Bild, CTA-Buttons.'
      : style === 'modern'
        ? 'Erster Eindruck – Titel, Untertitel, Beschreibung, Bild rechts, CTA-Buttons.'
        : 'Erster Eindruck – Titel, Untertitel, Hintergrundbild, CTA-Buttons.',
  }),
  actionStrip: () => ({
    title: 'Aktionsleiste',
    description: 'Schmaler Streifen direkt unter dem Hero (z. B. „Heute geöffnet · Tisch reservieren").',
  }),
  branchChips: () => ({
    title: 'Branchen-Stichworte & Badge',
    description: 'Kurze Schlagwörter die der Variante ein klares Profil geben, plus Google-Badge.',
  }),
  marquee: () => ({
    title: 'Schlagwort-Band',
    description: 'Großes animiertes Wortband direkt unter dem Hero.',
  }),
  services: (tpl, style) => ({
    title: `${serviceLabel(tpl)}-Teaser`,
    description: `Die ersten ${SERVICE_TEASER_LIMIT[style]} Einträge erscheinen hier auf der Startseite.`,
  }),
  signature: (tpl) => ({
    title: tpl === 'restaurant' ? 'Heute auf der Karte'
      : tpl === 'salon' ? 'Aktuelle Looks'
      : tpl === 'hotel' ? 'Zimmer-Vorschau'
      : 'Angebot / Highlights',
    description: tpl === 'restaurant' ? 'Empfehlungen / Tagesangebot.'
      : 'Aktuelle Highlights im Fokus.',
  }),
  about: (_tpl, style) => ({
    title: 'Über-uns-Teaser',
    description: style === 'bold'
      ? 'Manifest-Block: Eyebrow, große Überschrift, kurzer Text.'
      : 'Kurzer Auszug mit Bild, der auf die Über-uns-Seite verweist.',
  }),
  gallery: (_tpl, style) => ({
    title: 'Galerie-Teaser',
    description: `Die ersten ${GALLERY_TEASER_LIMIT[style]} Bilder erscheinen auf der Startseite.`,
  }),
  numbers: () => ({
    title: 'Zahlen-Band',
    description: 'Vier Eckdaten (z. B. „Seit 1998 · 64 Plätze · 4,9 Sterne").',
  }),
  logos: () => ({
    title: 'Logo-Strip',
    description: 'Partner / Presse / Auszeichnungen als Wortmarken-Band.',
  }),
  testimonials: () => ({
    title: 'Bewertungen-Teaser',
    description: 'Die ersten drei Stimmen erscheinen auf der Startseite.',
  }),
  news: () => ({
    title: 'News-Teaser',
    description: 'Die 3 neuesten Beiträge erscheinen auf der Startseite.',
  }),
  softCta: () => ({
    title: 'Abschluss-Aufruf (CTA)',
    description: 'Der große Aufruf zur Aktion am Ende der Startseite.',
  }),
  funding: () => ({
    title: 'Förder-Kalkulator',
    description: 'Interaktiver Rechner für Förderprogramme (KfW, BAFA etc.).',
  }),
  spotlight: () => ({
    title: 'Spotlight-Sektion',
    description: 'Branchenspezifische Highlight-Sektion (Vorgehen / Info / Programme).',
  }),
  heroBadge: () => ({
    title: 'Hero-Badge',
    description: 'Das kleine Bewertungs-Badge neben dem Hero-Bild.',
  }),

  // ─── Services ─────────────────────────────────────────────
  servicesHeader: () => ({
    title: 'Seiten-Header',
    description: 'Überschrift oben auf der Seite.',
  }),
  highlights: () => ({
    title: 'Highlights-Leiste',
    description: 'Vier kurze Highlights direkt unter der Überschrift.',
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
    title: 'Zahlen-Band',
    description: 'Eckdaten/Statistiken auf der Über-uns-Seite.',
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
  contactHeader: (tpl) => ({
    title: 'Seiten-Header',
    description: tpl === 'restaurant' ? 'Überschrift: „Reservieren oder einfach vorbeikommen."'
      : tpl === 'tradesman' ? 'Überschrift: „Anfrage senden oder Notdienst rufen."'
      : 'Überschrift oben auf der Kontakt-Seite.',
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
