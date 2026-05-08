/**
 * Section registry — single source of truth for what every UI section
 * reads from / writes to `SiteContent`, plus how the catalog keys
 * (used by `SECTION_CATALOG` + `sectionOrder.{page}`) map to the admin
 * section keys.
 *
 * Both the admin and the frontend reference this file via the drift-coverage
 * test (`scripts/check-coverage.ts`). When a renderer adds a new field, the
 * matching admin editor must declare the same dataKey here, otherwise the
 * build fails.
 *
 * Granularity choice: one entry per ADMIN section key (as returned by
 * `getAdminSections`). Each entry lists the SiteContent paths that
 * (a) the frontend renders and (b) the admin editor writes. They should
 * match — divergence is exactly the drift we are guarding against.
 */

import type { AdminSectionKey, PageKey } from '../admin/admin-sections.js';
import type { TemplateKey } from './types.js';

/** A path inside `SiteContent`, e.g. `'hero.title'`, `'branchText.heroEyebrow'`. */
export type DataPath = string;

/** Catalog item detail subpages — drift-checked on both admin and site. */
const CAT_DETAIL_KEYS: readonly DataPath[] = [
  'detailSlug',
  'detailPublished',
  'detailSubtitle',
  'detailBody',
  'detailBodyHtml',
  'detailGallery',
];

export interface SectionContract {
  /** Stable id; matches the admin section registry key. */
  key: AdminSectionKey;
  /**
   * SiteContent paths read by the frontend section AND written by the
   * matching admin editor. The drift test verifies the renderer / editor
   * source files mention each path at least once (text grep).
   */
  dataKeys: readonly DataPath[];
}

export const SECTION_CONTRACTS: Record<AdminSectionKey, SectionContract> = {
  /* ─── Home ─────────────────────────────────────────────────────── */
  announcements: { key: 'announcements', dataKeys: ['announcements'] },
  hero: {
    key: 'hero',
    dataKeys: [
      'hero.title', 'hero.subtitle', 'hero.body', 'hero.imageUrl',
      'hero.ctaLabel', 'hero.ctaHref',
      'heroCta.primaryLabel', 'heroCta.primaryHref',
      'heroCta.secondaryLabel', 'heroCta.secondaryHref',
      'brand.tagline',
      'branchText.heroEyebrow', 'branchText.heroImageUrl',
    ],
  },
  actionStrip: { key: 'actionStrip', dataKeys: ['homeStrip'] },
  branchChips: { key: 'branchChips', dataKeys: ['branchChips'] },
  marquee: { key: 'marquee', dataKeys: ['branchText.marqueeWords'] },
  services: {
    key: 'services',
    dataKeys: [
      'services',
      'branchText.servicesTeaserEyebrow', 'branchText.servicesTeaserTitle',
      'branchText.teaserSubtitle',
      'branchText.servicesAllLabel', 'branchText.servicesAllHref',
      'branchText.serviceCardNote',
      'branchText.learnMoreLabel', 'branchText.learnMoreHref',
      ...CAT_DETAIL_KEYS,
    ],
  },
  signature: { key: 'signature', dataKeys: ['homeSignature', 'homeSignatureItems'] },
  about: {
    key: 'about',
    dataKeys: [
      'about.title', 'about.body', 'about.imageUrl',
      'branchText.aboutTeaserEyebrow',
      'branchText.manifestEyebrow', 'branchText.manifestTitle',
      'branchText.learnMoreLabel', 'branchText.learnMoreHref',
    ],
  },
  gallery: {
    key: 'gallery',
    dataKeys: [
      'gallery',
      'branchText.galleryTeaserEyebrow', 'branchText.galleryTeaserTitle',
      'branchText.galleryAllLabel', 'branchText.galleryAllHref',
    ],
  },
  numbers: { key: 'numbers', dataKeys: ['numbers'] },
  logos: { key: 'logos', dataKeys: ['logos'] },
  testimonials: {
    key: 'testimonials',
    dataKeys: ['testimonials', 'branchText.testimonialsEyebrow', 'branchText.testimonialsTitle'],
  },
  news: { key: 'news', dataKeys: ['posts', 'branchText.newsEyebrow', 'branchText.newsTitle', 'branchText.newsAllLabel', 'branchText.newsAllHref'] },
  softCta: { key: 'softCta', dataKeys: ['ctaBandOverride', 'ctaBandOverrides'] },
  countdown: { key: 'countdown', dataKeys: ['weddingDate'] },
  funding: { key: 'funding', dataKeys: ['fundingItems', 'fundingCalc', 'moduleHeadings.funding'] },
  spotlight: {
    key: 'spotlight',
    dataKeys: ['moduleHeadings.consultingSpotlight', 'moduleHeadings.medicalInfo', 'moduleHeadings.fitnessSpotlight'],
  },
  /** Home `branchModules` catalog block — `BranchModulesInline` (all core variants + extras). */
  branchModules: {
    key: 'branchModules',
    dataKeys: [
      'menu', 'moduleHeadings.menu',
      'rooms', 'services', 'moduleHeadings.rooms',
      'tours', 'moduleHeadings.tours',
      'treatments', 'moduleHeadings.treatments',
      'courses', 'moduleHeadings.courses',
      'packages', 'moduleHeadings.packages',
      'processSteps', 'moduleHeadings.process',
      'doctors', 'moduleHeadings.doctors',
      'booking', 'moduleHeadings.booking',
      'fundingItems', 'fundingCalc', 'moduleHeadings.funding',
      ...CAT_DETAIL_KEYS,
    ],
  },
  /** Extras home footer contact band (`ContactSection` in `extra/index.tsx`). */
  contact: {
    key: 'contact',
    dataKeys: [
      'contact.phone', 'contact.email', 'contact.address', 'contact.city', 'contact.hours', 'contact.mapsUrl',
      'contactBlock',
      'hero.ctaLabel',
    ],
  },

  /* ─── Services ─────────────────────────────────────────────────── */
  servicesHeader: { key: 'servicesHeader', dataKeys: ['servicesHeader', 'branchText.servicesPageImageUrl'] },
  extraServiceCards: {
    key: 'extraServiceCards',
    dataKeys: [
      'services',
      'branchText.servicesTeaserEyebrow', 'branchText.servicesTeaserTitle',
      'branchText.teaserSubtitle',
      'branchText.servicesAllLabel', 'branchText.servicesAllHref',
      'branchText.serviceCardNote',
      'branchText.learnMoreLabel', 'branchText.learnMoreHref',
      ...CAT_DETAIL_KEYS,
    ],
  },
  highlights: { key: 'highlights', dataKeys: ['serviceHighlights'] },
  servicesList: {
    key: 'servicesList',
    dataKeys: [
      'services',
      'branchText.servicesTeaserEyebrow', 'branchText.servicesTeaserTitle', 'branchText.teaserSubtitle',
      'hero.subtitle',
      ...CAT_DETAIL_KEYS,
    ],
  },
  menu: { key: 'menu', dataKeys: ['menu', 'moduleHeadings.menu', ...CAT_DETAIL_KEYS] },
  rooms: { key: 'rooms', dataKeys: ['rooms', 'services', 'moduleHeadings.rooms', ...CAT_DETAIL_KEYS] },
  tours: { key: 'tours', dataKeys: ['tours', 'services', 'moduleHeadings.tours', ...CAT_DETAIL_KEYS] },
  treatments: { key: 'treatments', dataKeys: ['treatments', 'services', 'moduleHeadings.treatments', ...CAT_DETAIL_KEYS] },
  courses: { key: 'courses', dataKeys: ['courses', 'moduleHeadings.courses', ...CAT_DETAIL_KEYS] },
  packages: { key: 'packages', dataKeys: ['packages', 'moduleHeadings.packages', ...CAT_DETAIL_KEYS] },
  processSteps: { key: 'processSteps', dataKeys: ['processSteps', 'moduleHeadings.process', ...CAT_DETAIL_KEYS] },
  doctors: { key: 'doctors', dataKeys: ['doctors', 'moduleHeadings.doctors', ...CAT_DETAIL_KEYS] },
  booking: { key: 'booking', dataKeys: ['booking', 'moduleHeadings.booking'] },
  fundingModule: { key: 'fundingModule', dataKeys: ['fundingItems', 'fundingCalc', 'moduleHeadings.funding', ...CAT_DETAIL_KEYS] },
  emergencyBanner: { key: 'emergencyBanner', dataKeys: ['emergencyBanner'] },
  programs: { key: 'programs', dataKeys: ['programs'] },
  medicalNotice: { key: 'medicalNotice', dataKeys: ['medicalNotice', 'moduleHeadings.medicalInfo'] },
  serviceProcess: { key: 'serviceProcess', dataKeys: ['serviceProcess', 'branchText.processEyebrow', 'branchText.processTitle'] },
  faq: { key: 'faq', dataKeys: ['faq', 'branchText.faqEyebrow', 'branchText.faqTitle'] },
  servicesCta: { key: 'servicesCta', dataKeys: ['ctaBandOverrides.services'] },

  /* ─── Gallery ──────────────────────────────────────────────────── */
  galleryHeader: { key: 'galleryHeader', dataKeys: ['galleryHeader'] },
  galleryStory: { key: 'galleryStory', dataKeys: ['galleryStory'] },
  galleryUpload: { key: 'galleryUpload', dataKeys: ['gallery'] },
  galleryGrid: { key: 'galleryGrid', dataKeys: ['gallery'] },
  galleryCategories: {
    key: 'galleryCategories',
    dataKeys: ['galleryCategories', 'branchText.galleryCategoriesEyebrow', 'branchText.galleryCategoriesTitle'],
  },
  galleryCta: { key: 'galleryCta', dataKeys: ['ctaBandOverrides.gallery'] },

  /* ─── About ────────────────────────────────────────────────────── */
  aboutHeader: { key: 'aboutHeader', dataKeys: ['aboutHeader', 'about.imageUrl'] },
  aboutIntro: {
    key: 'aboutIntro',
    dataKeys: ['about.title', 'about.body', 'about.imageUrl', 'aboutNumbers', 'branchText.aboutSidebarEyebrow'],
  },
  values: { key: 'values', dataKeys: ['values', 'branchText.valuesEyebrow', 'branchText.valuesTitle'] },
  timeline: { key: 'timeline', dataKeys: ['timeline'] },
  team: {
    key: 'team',
    dataKeys: [
      'team',
      'branchText.teamEyebrow', 'branchText.teamTitle',
      'moduleHeadings.teamConsulting', 'moduleHeadings.teamMedical', 'moduleHeadings.teamFitness',
    ],
  },
  aboutNumbers: { key: 'aboutNumbers', dataKeys: ['aboutNumbers', 'numbers'] },
  certifications: {
    key: 'certifications',
    dataKeys: ['certifications', 'branchText.certsEyebrow', 'branchText.certsTitle'],
  },
  press: { key: 'press', dataKeys: ['press', 'branchText.pressEyebrow', 'branchText.pressTitle'] },
  aboutTestimonials: {
    key: 'aboutTestimonials',
    dataKeys: ['testimonials', 'branchText.aboutTestimonialsEyebrow', 'branchText.aboutTestimonialsTitle'],
  },
  aboutCta: { key: 'aboutCta', dataKeys: ['ctaBandOverrides.about'] },

  /* ─── Contact ──────────────────────────────────────────────────── */
  contactHeader: { key: 'contactHeader', dataKeys: ['contactPageHeader'] },
  contactDetails: {
    key: 'contactDetails',
    dataKeys: ['contact.phone', 'contact.email', 'contact.address', 'contact.city', 'contact.hours', 'contact.mapsUrl', 'contactBlock'],
  },
  contactForm: { key: 'contactForm', dataKeys: ['formFields'] },
  locations: { key: 'locations', dataKeys: ['locations', 'moduleHeadings.locations'] },
  arrival: { key: 'arrival', dataKeys: ['arrival', 'arrivalSection'] },
  contactCta: { key: 'contactCta', dataKeys: ['ctaBandOverrides.contact'] },
};

/* ═══════════════════════════════════════════════════════════════════
   CATALOG ↔ ADMIN mapping
   ═══════════════════════════════════════════════════════════════════

   The frontend section-order arrays (`BRANCH_STYLE_ORDER`,
   `getDefaultSubpageOrder`) and the tenant override
   `content.sectionOrder.{page}` use SHORT catalog keys ('action',
   'chips', 'process', 'cta', 'module' …). The admin uses LONG
   admin-section keys ('actionStrip', 'branchChips', 'serviceProcess',
   'softCta', 'menu' / 'rooms' / …).

   The admin reads `sectionOrder.{page}` (catalog keys) and translates
   each entry through `CATALOG_TO_ADMIN[page]` to render the matching
   editor card. `null` = the catalog key is intentionally not editable
   on this page.

   When a catalog key has an admin section that doesn't naturally live
   on this page (e.g. `menu` on home — its editor lives on the Service
   page), `CROSS_PAGE_TARGET[adminKey]` declares where the editor
   actually lives so the admin can render a deep-link card. ─────────── */

export type CatalogKey = string;

/** Canonical catalog → admin-section translation, per admin page. */
export const CATALOG_TO_ADMIN: Record<PageKey, Record<CatalogKey, AdminSectionKey | null>> = {
  home: {
    action:        'actionStrip',
    chips:         'branchChips',
    marquee:       'marquee',
    signature:     'signature',
    services:      'services',
    menu:          'menu',
    rooms:         'rooms',
    tours:         'tours',
    treatments:    'treatments',
    funding:       'funding',
    spotlight:     'spotlight',
    branchModules: 'branchModules',
    team:          'team',
    about:         'about',
    gallery:       'gallery',
    numbers:       'numbers',
    testimonials:  'testimonials',
    logos:         'logos',
    faq:           'faq',
    news:          'news',
    softCta:       'softCta',
    countdown:     'countdown',
    contact:       'contact',
  },
  services: {
    highlights:    'highlights',
    list:          'servicesList',
    module:        null, // resolved per-branch via cfg.services.modules → menu/rooms/etc.
    process:       'serviceProcess',
    testimonials:  'aboutTestimonials',
    gallery:       'galleryGrid',
    faq:           'faq',
    cta:           'servicesCta',
  },
  gallery: {
    story:         'galleryStory',
    grid:          'galleryGrid',
    categories:    'galleryCategories',
    testimonials:  'aboutTestimonials',
    cta:           'galleryCta',
  },
  about: {
    intro:          'aboutIntro',
    values:         'values',
    timeline:       'timeline',
    team:           'team',
    numbers:        'aboutNumbers',
    certifications: 'certifications',
    press:          'press',
    testimonials:   'aboutTestimonials',
    faq:            'faq',
    cta:            'aboutCta',
  },
  contact: {
    block:         'contactDetails',
    locations:     'locations',
    arrival:       'arrival',
    faq:           'faq',
    cta:           'contactCta',
  },
};

/**
 * For admin sections whose actual editor lives on a DIFFERENT admin page
 * than the one currently being edited (e.g. when a tenant adds `menu` to
 * the Home page via "+ Sektion hinzufügen", the menu data is edited on
 * the Speisekarten admin page — we render a deep-link card on Home).
 *
 * Maps `adminKey → { page: <PageKey>, label: string, perBranch?: …}`.
 */
export interface DeepLinkTarget {
  /** Which admin page the editor lives on. */
  page: PageKey;
  /** Translated to a sentence: "Inhalt bearbeiten unter [{label}]" */
  label: string | ((tpl: TemplateKey) => string);
  /** Optional explanation shown in the card body. */
  description?: string;
  /**
   * When the catalog/admin map key (e.g. `services` on Home) differs from the
   * section key handled on `page` (e.g. `servicesList` on Services), set this so
   * `check-coverage` can still verify a real editor exists.
   */
  editorSectionKey?: AdminSectionKey;
}

export const CROSS_PAGE_TARGETS: Partial<Record<AdminSectionKey, DeepLinkTarget>> = {
  // When added to Home, these editors actually live on the Services page.
  // Home teaser + services page list share `content.services` and teaser branchText.
  services: {
    page: 'services',
    label: 'Teaser & Katalog',
    description:
      'Startseiten-Leistungs-Teaser und die Hauptliste nutzen dieselben Einträge und Texte wie der Block „Katalog-Liste“ auf der Leistungs-Seite.',
    editorSectionKey: 'servicesList',
  },
  menu: {
    page: 'services',
    label: 'Speisekarte',
    description: 'Daten wie im Menü-Editor auf „Leistung/Speisekarte“.',
  },
  rooms: {
    page: 'services',
    label: 'Zimmer',
    description: 'Daten wie im Zimmer-Editor.',
  },
  tours: {
    page: 'services',
    label: 'Touren',
    description: 'Daten wie im Touren-Editor.',
  },
  treatments: {
    page: 'services',
    label: 'Behandlungen',
    description: 'Daten wie im Behandlungs-Editor.',
  },
  // Modules used on extras' Home spotlight — admin lives on Services.
  processSteps: {
    page: 'services',
    label: 'Prozess-Schritte',
    description: 'Wie auf der Leistungsseite.',
  },
  packages: {
    page: 'services',
    label: 'Pakete',
    description: 'Wie auf der Leistungsseite.',
  },
  programs: {
    page: 'services',
    label: 'Programme',
    description: 'Wie auf der Leistungsseite.',
  },
  doctors: {
    page: 'services',
    label: 'Ärzte & Team',
    description: 'Wie auf der Leistungsseite.',
  },
  booking: {
    page: 'services',
    label: 'Online-Buchung',
    description: 'Wie auf der Leistungsseite.',
  },
  // Team admin lives on About.
  team: {
    page: 'about',
    label: 'Team (Über uns)',
    description: 'Wie unter Über uns.',
  },
  // FAQ is shared between Services / About / Contact — primary editor on Services.
  faq: {
    page: 'services',
    label: 'FAQ (Service-Seite)',
    description: 'FAQ-Schwerpunk auf der Leistungsseite.',
  },
  // Course schedule (fitness) — edited on Services.
  courses: {
    page: 'services',
    label: 'Kursplan',
    description: 'Wie auf der Leistungsseite.',
  },
  // Testimonials primary editor lives on the About page; can also appear
  // as a teaser on Services or Gallery via "+ Sektion hinzufügen".
  aboutTestimonials: {
    page: 'about',
    label: 'Bewertungen (Über-uns-Seite)',
    description: 'Gemeinsame Liste wie auf der Startseite.',
  },
  // Gallery grid primary editor lives on the Gallery page; can be
  // re-used as a section on Services etc.
  galleryGrid: {
    page: 'gallery',
    label: 'Galerie (Galerie-Seite)',
    description: 'Alle Bilder unter „Galerie“.',
  },
};

/**
 * Convert a frontend catalog key to its matching admin section key for
 * the given page. Returns `null` if the catalog entry is intentionally
 * not editable from any admin page (data lives in a global section).
 */
export function adminKeyForCatalog(page: PageKey, catalogKey: string): AdminSectionKey | null {
  return CATALOG_TO_ADMIN[page]?.[catalogKey] ?? null;
}


