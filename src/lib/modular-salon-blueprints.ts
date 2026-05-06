/**
 * Salon — spec-modular v1 (`docs/spec-salon.md`).
 * services = Leistungen, gallery = Looks, about = Studio, contact = Termin.
 */

import type { TemplateStyle } from './branch-config.js';

export type SalonModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const SALON_HOME_CLASSIC: readonly string[] = [
  'noticeBanner',
  'hero',
  'actionBar',
  'featuredServices',
  'serviceCards',
  'storyTeaser',
  'galleryPreview',
  'testimonials',
  'statsBand',
  'newsTeaser',
  'cta',
];

const SALON_HOME_MODERN: readonly string[] = [
  'noticeBanner',
  'hero',
  'actionBar',
  'featuredLooks',
  'galleryPreview',
  'brandLogos',
  'testimonials',
  'storyTeaser',
  'statsBand',
  'newsTeaser',
  'cta',
];

const SALON_HOME_BOLD: readonly string[] = [
  'noticeBanner',
  'hero',
  'marqueeBand',
  'featureImage',
  'actionBar',
  'galleryPreview',
  'featuredLooksBand',
  'storySplit',
  'statsBand',
  'testimonialMarquee',
  'quoteWall',
  'newsTeaser',
  'ctaBand',
];

const SALON_SERVICES_CLASSIC_MODERN: readonly string[] = [
  'noticeBanner',
  'hero',
  'highlightsBar',
  'serviceOverviewCards',
  'serviceCards',
  'steps',
  'faq',
  'cta',
];

const SALON_SERVICES_BOLD: readonly string[] = [
  'noticeBanner',
  'hero',
  'highlightsBar',
  'serviceOverviewList',
  'serviceCards',
  'steps',
  'faq',
  'cta',
];

const SALON_GALLERY_ALL: readonly string[] = [
  'noticeBanner',
  'hero',
  'teaserList',
  'gallery',
  'teaserList',
  'cta',
];

const SALON_ABOUT_CLASSIC_BOLD: readonly string[] = [
  'noticeBanner',
  'hero',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const SALON_ABOUT_MODERN: readonly string[] = [
  'noticeBanner',
  'hero',
  'storyFacts',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const SALON_CONTACT_ALL: readonly string[] = [
  'noticeBanner',
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const SALON_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  actionBar: 'Aktionsleiste',
  featuredServices: 'Leistungs-Teaser',
  serviceCards: 'Behandlungen / Services Grid',
  featuredLooks: 'Looks der Woche',
  featuredLooksBand: 'Looks der Woche (Bold)',
  featureImage: 'Large Image Stage',
  storySplit: 'Studio-Statement',
  storyTeaser: 'Story-Teaser',
  galleryPreview: 'Galerie-Vorschau',
  testimonials: 'Bewertungen',
  statsBand: 'Eckdaten-Band',
  newsTeaser: 'News-Teaser',
  cta: 'CTA',
  ctaBand: 'CTA-Band',
  marqueeBand: 'Marquee',
  brandLogos: 'Markenpartner',
  testimonialMarquee: 'Stimmenband',
  quoteWall: 'Quote-Wall',
  highlightsBar: 'Highlights-Leiste',
  serviceOverviewCards: 'Leistungs-Übersicht',
  serviceOverviewList: 'Leistungs-Liste (Bold)',
  steps: 'Ablauf',
  faq: 'FAQ',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  timeline: 'Zeitstrahl',
  team: 'Team',
  storyFacts: 'Story-Facts',
  contactDetails: 'Kontaktdaten',
  locations: 'Standorte',
  directions: 'Wegbeschreibung',
};

export function salonModularBlueprint(style: TemplateStyle, page: SalonModularPageKey): readonly string[] {
  if (page === 'home') {
    if (style === 'modern') return SALON_HOME_MODERN;
    if (style === 'bold') return SALON_HOME_BOLD;
    return SALON_HOME_CLASSIC;
  }
  if (page === 'services') {
    if (style === 'bold') return SALON_SERVICES_BOLD;
    return SALON_SERVICES_CLASSIC_MODERN;
  }
  if (page === 'gallery') return SALON_GALLERY_ALL;
  if (page === 'about') return style === 'modern' ? SALON_ABOUT_MODERN : SALON_ABOUT_CLASSIC_BOLD;
  return SALON_CONTACT_ALL;
}
