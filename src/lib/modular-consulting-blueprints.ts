/**
 * Beratung (consulting) � spec-modular v1 (`docs/spec-beratung.md`).
 * Classic / Modern / Bold � style-differentiated section layouts.
 */

import type { TemplateStyle } from './branch-config.js';

export type ConsultingModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const CONSULTING_HOME_CLASSIC: readonly string[] = [
  'hero',
  'actionBar',
  'keywordBand',
  'storyTeaser',
  'serviceCards',
  'processTextColumns',
  'pricingPackages',
  'caseStudyCards',
  'team',
  'videoEmbed',
  'galleryPreview',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const CONSULTING_HOME_MODERN: readonly string[] = [
  'hero',
  'actionBar',
  'serviceCards',
  'galleryPreview',
  'brandLogos',
  'storyTeaser',
  'processTextColumns',
  'pricingPackages',
  'caseStudyCards',
  'team',
  'videoEmbed',
  'statsBand',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const CONSULTING_HOME_BOLD: readonly string[] = [
  'hero',
  'marqueeBand',
  'featureImage',
  'actionBar',
  'serviceCards',
  'processTextColumns',
  'pricingPackages',
  'caseStudyCards',
  'galleryPreview',
  'videoEmbed',
  'statsBand',
  'storySplit',
  'team',
  'testimonialMarquee',
  'quoteWall',
  'newsTeaser',
  'ctaBand',
];

const CONSULTING_SERVICES_CLASSIC_MODERN: readonly string[] = [
  'hero',
  'highlightsBar',
  'serviceCards',
  'comparisonTable',
  'processCards',
  'pricingPackages',
  'testimonials',
  'galleryPreview',
  'faq',
  'cta',
];

const CONSULTING_SERVICES_BOLD: readonly string[] = [
  'hero',
  'highlightsBar',
  'serviceCards',
  'comparisonTable',
  'processCards',
  'pricingPackages',
  'testimonials',
  'galleryPreview',
  'faq',
  'ctaBand',
];

const CONSULTING_GALLERY_ALL: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'categoryCards',
  'testimonials',
  'cta',
];

const CONSULTING_ABOUT_CLASSIC_BOLD: readonly string[] = [
  'hero',
  'teaserList',
  'timeline',
  'team',
  'trustStrip',
  'statsBand',
  'impactNumbers',
  'badgeWall',
  'testimonials',
  'cta',
];

const CONSULTING_ABOUT_MODERN: readonly string[] = [
  'hero',
  'storyFacts',
  'teaserList',
  'timeline',
  'team',
  'trustStrip',
  'statsBand',
  'impactNumbers',
  'badgeWall',
  'testimonials',
  'cta',
];

const CONSULTING_CONTACT_ALL: readonly string[] = [
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const CONSULTING_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  actionBar: 'Aktionsleiste',
  keywordBand: 'Keyword-Band',
  storyTeaser: 'Story / Vertrauen',
  storySplit: 'Story-Statement',
  serviceCards: 'Leistungen',
  processTextColumns: 'Wie wir arbeiten',
  processCards: 'So arbeiten wir',
  pricingPackages: 'Pakete / Pricing',
  team: 'Team',
  galleryPreview: 'Galerie-Vorschau',
  testimonials: 'Testimonials',
  testimonialMarquee: 'Stimmenband',
  newsTeaser: 'News & Notizen',
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
  brandLogos: 'Partner & Referenzen',
  storyFacts: 'Story-Facts',
  quoteWall: 'Quote-Wall',
  highlightsBar: 'Highlights-Leiste',
  contactDetails: 'Kontaktdaten',
  locations: 'Standorte',
  directions: 'Wegbeschreibung',
  videoEmbed: 'Video',
  caseStudyCards: 'Fallstudien',
  comparisonTable: 'Vergleichstabelle',
  impactNumbers: 'Wirkungskennzahlen',
  trustStrip: 'Vertrauensleiste',
  badgeWall: 'Auszeichnungen',
};

export function consultingModularBlueprint(style: TemplateStyle, page: ConsultingModularPageKey): readonly string[] {
  if (page === 'home') {
    if (style === 'modern') return CONSULTING_HOME_MODERN;
    if (style === 'bold') return CONSULTING_HOME_BOLD;
    return CONSULTING_HOME_CLASSIC;
  }
  if (page === 'services') {
    if (style === 'bold') return CONSULTING_SERVICES_BOLD;
    return CONSULTING_SERVICES_CLASSIC_MODERN;
  }
  if (page === 'gallery') return CONSULTING_GALLERY_ALL;
  if (page === 'about') return style === 'modern' ? CONSULTING_ABOUT_MODERN : CONSULTING_ABOUT_CLASSIC_BOLD;
  return CONSULTING_CONTACT_ALL;
}
