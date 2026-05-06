/**
 * Beratung (consulting) — spec-modular v1 (`docs/spec-beratung.md`).
 * Klassische Section-Reihenfolge; Modern/Bold nutzen dieselbe Editor-Struktur (Inhalte mergen identisch).
 */

import type { TemplateStyle } from './branch-config.js';

export type ConsultingModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const CONSULTING_HOME: readonly string[] = [
  'hero',
  'keywordBand',
  'storyTeaser',
  'serviceCards',
  'processTextColumns',
  'processCards',
  'pricingPackages',
  'team',
  'galleryPreview',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const CONSULTING_SERVICES: readonly string[] = [
  'hero',
  'serviceCards',
  'processTextColumns',
  'processCards',
  'pricingPackages',
  'testimonials',
  'galleryPreview',
  'faq',
  'cta',
];

const CONSULTING_GALLERY: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'categoryCards',
  'testimonials',
  'cta',
];

const CONSULTING_ABOUT: readonly string[] = [
  'hero',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const CONSULTING_CONTACT: readonly string[] = [
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const CONSULTING_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  keywordBand: 'Keyword-Band',
  storyTeaser: 'Story / Vertrauen',
  serviceCards: 'Leistungen',
  processTextColumns: 'Wie wir arbeiten',
  processCards: 'So arbeiten wir',
  pricingPackages: 'Pakete / Pricing',
  team: 'Team',
  galleryPreview: 'Galerie-Vorschau',
  testimonials: 'Testimonials',
  newsTeaser: 'News & Notizen',
  contactPreview: 'Kontakt-Teaser',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  categoryCards: 'Schwerpunkte',
  timeline: 'Zeitstrahl',
  statsBand: 'Kennzahlen',
  faq: 'FAQ',
  cta: 'CTA',
  contactDetails: 'Kontaktdaten',
  locations: 'Standorte',
  directions: 'Wegbeschreibung',
};

export function consultingModularBlueprint(_style: TemplateStyle, page: ConsultingModularPageKey): readonly string[] {
  void _style;
  if (page === 'home') return CONSULTING_HOME;
  if (page === 'services') return CONSULTING_SERVICES;
  if (page === 'gallery') return CONSULTING_GALLERY;
  if (page === 'about') return CONSULTING_ABOUT;
  return CONSULTING_CONTACT;
}
