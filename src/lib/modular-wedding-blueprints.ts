/**
 * Hochzeit (wedding) – spec-modular v1.
 * Classic / Modern / Bold – style-differentiated section layouts.
 */

import type { TemplateStyle } from './branch-config.js';

export type WeddingModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const WEDDING_HOME_CLASSIC: readonly string[] = [
  'hero',
  'actionBar',
  'keywordBand',
  'storyTeaser',
  'serviceCards',
  'processTextColumns',
  'team',
  'videoEmbed',
  'galleryPreview',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const WEDDING_HOME_MODERN: readonly string[] = [
  'hero',
  'actionBar',
  'serviceCards',
  'galleryPreview',
  'brandLogos',
  'storyTeaser',
  'processTextColumns',
  'team',
  'videoEmbed',
  'statsBand',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const WEDDING_HOME_BOLD: readonly string[] = [
  'hero',
  'marqueeBand',
  'featureImage',
  'actionBar',
  'serviceCards',
  'processTextColumns',
  'videoEmbed',
  'galleryPreview',
  'statsBand',
  'storySplit',
  'team',
  'testimonialMarquee',
  'quoteWall',
  'newsTeaser',
  'ctaBand',
];

const WEDDING_SERVICES_CLASSIC_MODERN: readonly string[] = [
  'hero',
  'highlightsBar',
  'serviceCards',
  'processCards',
  'testimonials',
  'galleryPreview',
  'faq',
  'cta',
];

const WEDDING_SERVICES_BOLD: readonly string[] = [
  'hero',
  'highlightsBar',
  'serviceCards',
  'processCards',
  'testimonials',
  'galleryPreview',
  'faq',
  'ctaBand',
];

const WEDDING_GALLERY_ALL: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'categoryCards',
  'testimonials',
  'cta',
];

const WEDDING_ABOUT_CLASSIC_BOLD: readonly string[] = [
  'hero',
  'teaserList',
  'timeline',
  'team',
  'venueShowcase',
  'trustStrip',
  'statsBand',
  'badgeWall',
  'testimonials',
  'cta',
];

const WEDDING_ABOUT_MODERN: readonly string[] = [
  'hero',
  'storyFacts',
  'teaserList',
  'timeline',
  'team',
  'venueShowcase',
  'trustStrip',
  'statsBand',
  'badgeWall',
  'testimonials',
  'cta',
];

const WEDDING_CONTACT_ALL: readonly string[] = [
  'hero',
  'contactDetails',
  'rsvpForm',
  'locations',
  'directions',
  'cta',
];

export const WEDDING_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  actionBar: 'Aktionsleiste',
  keywordBand: 'Keyword-Band',
  storyTeaser: 'Unsere Geschichte',
  storySplit: 'Liebesgeschichte',
  serviceCards: 'Programm & Details',
  processTextColumns: 'Ablauf / Timeline',
  processCards: 'Ablauf',
  team: 'Trauzeugen & Co.',
  galleryPreview: 'Galerie-Vorschau',
  testimonials: 'Gästebuch',
  testimonialMarquee: 'Stimmenband',
  newsTeaser: 'Neuigkeiten',
  contactPreview: 'RSVP',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  categoryCards: 'Highlights',
  timeline: 'Unser Weg',
  statsBand: 'In Zahlen',
  countdown: 'Countdown',
  faq: 'FAQ',
  cta: 'CTA',
  ctaBand: 'CTA-Band',
  marqueeBand: 'Marquee',
  featureImage: 'Large Image Stage',
  brandLogos: 'Partner & Dienstleister',
  storyFacts: 'Story-Facts',
  quoteWall: 'Quote-Wall',
  highlightsBar: 'Highlights-Leiste',
  contactDetails: 'Kontakt & RSVP',
  locations: 'Location',
  directions: 'Anfahrt',
  videoEmbed: 'Video',
  venueShowcase: 'Location-Showcase',
  rsvpForm: 'RSVP-Formular',
  trustStrip: 'Vertrauensleiste',
  badgeWall: 'Auszeichnungen',
};

export function weddingModularBlueprint(style: TemplateStyle, page: WeddingModularPageKey): readonly string[] {
  if (page === 'home') {
    if (style === 'modern') return WEDDING_HOME_MODERN;
    if (style === 'bold') return WEDDING_HOME_BOLD;
    return WEDDING_HOME_CLASSIC;
  }
  if (page === 'services') {
    if (style === 'bold') return WEDDING_SERVICES_BOLD;
    return WEDDING_SERVICES_CLASSIC_MODERN;
  }
  if (page === 'gallery') return WEDDING_GALLERY_ALL;
  if (page === 'about') return style === 'modern' ? WEDDING_ABOUT_MODERN : WEDDING_ABOUT_CLASSIC_BOLD;
  return WEDDING_CONTACT_ALL;
}
