/**
 * Praxen (medical) – spec-modular v1 (`docs/spec-praxen.md`).
 * Classic / Modern / Bold – style-differentiated section layouts.
 */

import type { TemplateStyle } from './branch-config.js';

export type MedicalModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const MEDICAL_HOME_CLASSIC: readonly string[] = [
  'hero',
  'actionBar',
  'keywordBand',
  'storyTeaser',
  'serviceCards',
  'serviceInfo',
  'team',
  'appointmentBooking',
  'videoEmbed',
  'galleryPreview',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const MEDICAL_HOME_MODERN: readonly string[] = [
  'hero',
  'actionBar',
  'serviceCards',
  'galleryPreview',
  'brandLogos',
  'storyTeaser',
  'serviceInfo',
  'team',
  'appointmentBooking',
  'videoEmbed',
  'statsBand',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const MEDICAL_HOME_BOLD: readonly string[] = [
  'hero',
  'marqueeBand',
  'featureImage',
  'actionBar',
  'serviceCards',
  'serviceInfo',
  'galleryPreview',
  'videoEmbed',
  'statsBand',
  'storySplit',
  'team',
  'appointmentBooking',
  'testimonialMarquee',
  'quoteWall',
  'newsTeaser',
  'ctaBand',
];

const MEDICAL_SERVICES_CLASSIC_MODERN: readonly string[] = [
  'hero',
  'highlightsBar',
  'serviceCards',
  'comparisonTable',
  'insuranceInfo',
  'team',
  'appointmentBooking',
  'testimonials',
  'galleryPreview',
  'faq',
  'cta',
];

const MEDICAL_SERVICES_BOLD: readonly string[] = [
  'hero',
  'highlightsBar',
  'serviceCards',
  'comparisonTable',
  'insuranceInfo',
  'team',
  'appointmentBooking',
  'testimonials',
  'galleryPreview',
  'faq',
  'ctaBand',
];

const MEDICAL_GALLERY_ALL: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'categoryCards',
  'testimonials',
  'cta',
];

const MEDICAL_ABOUT_CLASSIC_BOLD: readonly string[] = [
  'hero',
  'teaserList',
  'timeline',
  'team',
  'trustStrip',
  'statsBand',
  'badgeWall',
  'testimonials',
  'cta',
];

const MEDICAL_ABOUT_MODERN: readonly string[] = [
  'hero',
  'storyFacts',
  'teaserList',
  'timeline',
  'team',
  'trustStrip',
  'statsBand',
  'badgeWall',
  'testimonials',
  'cta',
];

const MEDICAL_CONTACT_ALL: readonly string[] = [
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const MEDICAL_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  actionBar: 'Aktionsleiste',
  keywordBand: 'Keyword-Band',
  storyTeaser: 'Story / Haltung',
  storySplit: 'Praxis-Statement',
  serviceCards: 'Leistungen',
  serviceInfo: 'Service & Info',
  team: 'Ärzt:innen & Team',
  trainers: 'Team',
  appointmentBooking: 'Online-Termin',
  galleryPreview: 'Praxis & Räume',
  testimonials: 'Patient:innenstimmen',
  testimonialMarquee: 'Stimmenband',
  newsTeaser: 'News',
  contactPreview: 'Kontakt-Teaser',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  categoryCards: 'Schwerpunkte',
  timeline: 'Zeitstrahl',
  statsBand: 'Kennzahlen',
  faq: 'FAQ',
  cta: 'CTA',
  ctaBand: 'CTA-Band',
  marqueeBand: 'Marquee',
  featureImage: 'Large Image Stage',
  brandLogos: 'Zertifikate & Partner',
  storyFacts: 'Story-Facts',
  quoteWall: 'Quote-Wall',
  highlightsBar: 'Highlights-Leiste',
  contactDetails: 'Kontaktdaten',
  locations: 'Standorte',
  directions: 'Wegbeschreibung',
  videoEmbed: 'Video',
  comparisonTable: 'Leistungsvergleich',
  insuranceInfo: 'Kassenleistungen',
  trustStrip: 'Vertrauensleiste',
  badgeWall: 'Zertifikate & Auszeichnungen',
};

export function medicalModularBlueprint(style: TemplateStyle, page: MedicalModularPageKey): readonly string[] {
  if (page === 'home') {
    if (style === 'modern') return MEDICAL_HOME_MODERN;
    if (style === 'bold') return MEDICAL_HOME_BOLD;
    return MEDICAL_HOME_CLASSIC;
  }
  if (page === 'services') {
    if (style === 'bold') return MEDICAL_SERVICES_BOLD;
    return MEDICAL_SERVICES_CLASSIC_MODERN;
  }
  if (page === 'gallery') return MEDICAL_GALLERY_ALL;
  if (page === 'about') return style === 'modern' ? MEDICAL_ABOUT_MODERN : MEDICAL_ABOUT_CLASSIC_BOLD;
  return MEDICAL_CONTACT_ALL;
}
