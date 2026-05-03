/**
 * Section registry — single source of truth for what every UI section
 * reads from / writes to `SiteContent`.
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

import type { AdminSectionKey } from '@/admin/admin-sections';

/** A path inside `SiteContent`, e.g. `'hero.title'`, `'branchText.heroEyebrow'`. */
export type DataPath = string;

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

/**
 * Sections that don't appear in any admin page editor (e.g. globally-edited
 * data) are intentionally excluded — `branchModules`, `team` (extras-home),
 * `contact`-section data is reached via the global Kontaktdaten page.
 */
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
  actionStrip: { key: 'actionStrip', dataKeys: ['homeStrip', 'contact.phone', 'contact.hours'] },
  branchChips: { key: 'branchChips', dataKeys: ['branchChips', 'heroBadge'] },
  marquee: { key: 'marquee', dataKeys: ['branchText.marqueeWords'] },
  services: {
    key: 'services',
    dataKeys: [
      'services',
      'branchText.servicesTeaserEyebrow', 'branchText.servicesTeaserTitle',
      'branchText.teaserSubtitle',
      'branchText.servicesAllLabel', 'branchText.servicesAllHref',
      'branchText.serviceCardNote',
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
      'branchText.galleryAllLabel',
    ],
  },
  numbers: { key: 'numbers', dataKeys: ['numbers'] },
  logos: { key: 'logos', dataKeys: ['logos'] },
  testimonials: {
    key: 'testimonials',
    dataKeys: ['testimonials', 'branchText.testimonialsEyebrow', 'branchText.testimonialsTitle'],
  },
  news: { key: 'news', dataKeys: ['posts', 'branchText.newsEyebrow', 'branchText.newsTitle'] },
  softCta: { key: 'softCta', dataKeys: ['ctaBandOverride', 'ctaBandOverrides'] },
  funding: { key: 'funding', dataKeys: ['fundingItems', 'fundingCalc', 'moduleHeadings.funding'] },
  spotlight: {
    key: 'spotlight',
    dataKeys: ['moduleHeadings.consultingSpotlight', 'moduleHeadings.medicalInfo', 'moduleHeadings.fitnessSpotlight'],
  },
  heroBadge: { key: 'heroBadge', dataKeys: ['heroBadge'] },

  /* ─── Services ─────────────────────────────────────────────────── */
  servicesHeader: { key: 'servicesHeader', dataKeys: ['servicesHeader', 'branchText.servicesPageImageUrl'] },
  highlights: { key: 'highlights', dataKeys: ['serviceHighlights'] },
  menu: { key: 'menu', dataKeys: ['menu', 'moduleHeadings.menu'] },
  rooms: { key: 'rooms', dataKeys: ['rooms', 'services', 'moduleHeadings.rooms'] },
  tours: { key: 'tours', dataKeys: ['tours', 'services', 'moduleHeadings.tours'] },
  treatments: { key: 'treatments', dataKeys: ['treatments', 'services', 'moduleHeadings.treatments'] },
  courses: { key: 'courses', dataKeys: ['courses', 'moduleHeadings.courses'] },
  packages: { key: 'packages', dataKeys: ['packages', 'moduleHeadings.packages'] },
  processSteps: { key: 'processSteps', dataKeys: ['processSteps', 'moduleHeadings.process'] },
  doctors: { key: 'doctors', dataKeys: ['doctors', 'moduleHeadings.doctors'] },
  booking: { key: 'booking', dataKeys: ['booking', 'moduleHeadings.booking'] },
  fundingModule: { key: 'fundingModule', dataKeys: ['fundingItems', 'fundingCalc', 'moduleHeadings.funding'] },
  emergencyBanner: { key: 'emergencyBanner', dataKeys: ['emergencyBanner'] },
  programs: { key: 'programs', dataKeys: ['programs'] },
  medicalNotice: { key: 'medicalNotice', dataKeys: ['medicalNotice'] },
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
  aboutTestimonials: { key: 'aboutTestimonials', dataKeys: ['testimonials'] },
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

