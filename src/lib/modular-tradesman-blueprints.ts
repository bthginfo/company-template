/**
 * Handwerk — spec-modular v1 (`docs/spec-handwerk.md`).
 * services = Leistungen, gallery = Referenzen, about = Betrieb, contact = Anfrage.
 */

import type { TemplateStyle } from './branch-config.js';

export type TradesmanModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const TRADESMAN_HOME_CLASSIC: readonly string[] = [
  'hero',
  'stickyEmergencyBanner',
  'actionBar',
  'featuredServices',
  'fundingCalculator',
  'statsBand',
  'videoEmbed',
  'galleryPreview',
  'responsePromise',
  'newsHighlightList',
  'testimonials',
  'storyTeaser',
  'newsTeaser',
  'cta',
];

const TRADESMAN_HOME_MODERN: readonly string[] = [
  'hero',
  'stickyEmergencyBanner',
  'actionBar',
  'statsBand',
  'serviceCards',
  'fundingCalculator',
  'topicCards',
  'videoEmbed',
  'galleryPreview',
  'responsePromise',
  'keywordBand',
  'storyTeaser',
  'testimonials',
  'newsTeaser',
  'cta',
];

const TRADESMAN_HOME_BOLD: readonly string[] = [
  'hero',
  'stickyEmergencyBanner',
  'marqueeBand',
  'featureImage',
  'actionBar',
  'serviceList',
  'fundingCalculator',
  'topicBand',
  'videoEmbed',
  'galleryPreview',
  'responsePromise',
  'statsBand',
  'storySplit',
  'testimonialMarquee',
  'quoteWall',
  'newsTeaser',
  'ctaBand',
];

const TRADESMAN_SERVICES_CLASSIC: readonly string[] = [
  'hero',
  'stickyEmergencyBanner',
  'highlightsBar',
  'serviceOverviewCards',
  'fundingCalculator',
  'steps',
  'faq',
  'cta',
];

const TRADESMAN_SERVICES_MODERN: readonly string[] = [
  'hero',
  'stickyEmergencyBanner',
  'highlightsBar',
  'serviceCards',
  'fundingCalculator',
  'steps',
  'faq',
  'cta',
];

const TRADESMAN_SERVICES_BOLD: readonly string[] = [
  'hero',
  'stickyEmergencyBanner',
  'highlightsBar',
  'serviceList',
  'fundingCalculator',
  'steps',
  'faq',
  'cta',
];

const TRADESMAN_GALLERY_ALL: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'projectShowcase',
  'categoryCards',
  'cta',
];

const TRADESMAN_ABOUT_CLASSIC_BOLD: readonly string[] = [
  'hero',
  'storyImageSplit',
  'teaserList',
  'timeline',
  'team',
  'trustStrip',
  'statsBand',
  'qualifications',
  'badgeWall',
  'testimonials',
  'cta',
];

const TRADESMAN_ABOUT_MODERN: readonly string[] = [
  'hero',
  'teaserList',
  'timeline',
  'team',
  'trustStrip',
  'statsBand',
  'qualifications',
  'badgeWall',
  'testimonials',
  'cta',
];

const TRADESMAN_CONTACT_ALL: readonly string[] = [
  'hero',
  'contactDetails',
  'serviceAreaMap',
  'locations',
  'directions',
  'cta',
];

export const TRADESMAN_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  stickyEmergencyBanner: 'Sticky Notdienst',
  actionBar: 'Utility-Bar',
  featuredServices: 'Leistungs-Teaser',
  serviceCards: 'Service-Karten',
  serviceList: 'Leistungsliste (Bold)',
  serviceOverviewCards: 'Leistungs-Übersicht',
  fundingCalculator: 'Förder-Kalkulator',
  statsBand: 'Eckdaten-Band',
  galleryPreview: 'Projekt-Galerie-Vorschau',
  newsHighlightList: 'Aktuelle Themen',
  testimonials: 'Bewertungen',
  storyTeaser: 'Betriebs-Teaser',
  storySplit: 'Story-Statement',
  newsTeaser: 'News-Teaser',
  cta: 'CTA',
  ctaBand: 'CTA-Band',
  marqueeBand: 'Marquee',
  featureImage: 'Large Image Stage',
  topicCards: 'Themen-Karten',
  topicBand: 'Accent Topic Band',
  keywordBand: 'Keyword-Band',
  testimonialMarquee: 'Testimonial-Marquee',
  quoteWall: 'Quote-Wall',
  highlightsBar: 'Highlights-Leiste',
  steps: 'Schritte',
  faq: 'FAQ',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  categoryCards: 'Kategorie-Karten',
  timeline: 'Zeitstrahl',
  team: 'Team',
  qualifications: 'Qualifikationen',
  storyImageSplit: 'Story-Bild-Split',
  contactDetails: 'Kontaktdaten',
  locations: 'Standorte',
  directions: 'Wegbeschreibung',
  videoEmbed: 'Video',
  responsePromise: 'Reaktionsversprechen',
  projectShowcase: 'Vorher / Nachher',
  serviceAreaMap: 'Einsatzgebiet',
  trustStrip: 'Vertrauensleiste',
  badgeWall: 'Auszeichnungen',
};

export function tradesmanModularBlueprint(style: TemplateStyle, page: TradesmanModularPageKey): readonly string[] {
  if (page === 'home') {
    if (style === 'modern') return TRADESMAN_HOME_MODERN;
    if (style === 'bold') return TRADESMAN_HOME_BOLD;
    return TRADESMAN_HOME_CLASSIC;
  }
  if (page === 'services') {
    if (style === 'bold') return TRADESMAN_SERVICES_BOLD;
    if (style === 'modern') return TRADESMAN_SERVICES_MODERN;
    return TRADESMAN_SERVICES_CLASSIC;
  }
  if (page === 'gallery') return TRADESMAN_GALLERY_ALL;
  if (page === 'about') return style === 'modern' ? TRADESMAN_ABOUT_MODERN : TRADESMAN_ABOUT_CLASSIC_BOLD;
  return TRADESMAN_CONTACT_ALL;
}
