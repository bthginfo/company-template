/**
 * Hochzeit (wedding) — spec-modular v1.
 * Section-Reihenfolge analog Beratung; Inhalte auf Hochzeitskontext angepasst.
 */

import type { TemplateStyle } from './branch-config.js';

export type WeddingModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const WEDDING_HOME: readonly string[] = [
  'hero',
  'keywordBand',
  'storyTeaser',
  'serviceCards',
  'processTextColumns',
  'team',
  'galleryPreview',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const WEDDING_SERVICES: readonly string[] = [
  'hero',
  'serviceCards',
  'processCards',
  'testimonials',
  'galleryPreview',
  'faq',
  'cta',
];

const WEDDING_GALLERY: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'categoryCards',
  'testimonials',
  'cta',
];

const WEDDING_ABOUT: readonly string[] = [
  'hero',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const WEDDING_CONTACT: readonly string[] = [
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const WEDDING_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  keywordBand: 'Keyword-Band',
  storyTeaser: 'Unsere Geschichte',
  serviceCards: 'Programm & Details',
  processTextColumns: 'Ablauf / Timeline',
  processCards: 'Ablauf',
  team: 'Trauzeugen & Co.',
  galleryPreview: 'Galerie-Vorschau',
  testimonials: 'Gästebuch',
  newsTeaser: 'Neuigkeiten',
  contactPreview: 'RSVP',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  categoryCards: 'Highlights',
  timeline: 'Unser Weg',
  statsBand: 'In Zahlen',
  faq: 'FAQ',
  cta: 'CTA',
  contactDetails: 'Kontakt & RSVP',
  locations: 'Location',
  directions: 'Anfahrt',
};

export function weddingModularBlueprint(_style: TemplateStyle, page: WeddingModularPageKey): readonly string[] {
  void _style;
  if (page === 'home') return WEDDING_HOME;
  if (page === 'services') return WEDDING_SERVICES;
  if (page === 'gallery') return WEDDING_GALLERY;
  if (page === 'about') return WEDDING_ABOUT;
  return WEDDING_CONTACT;
}
