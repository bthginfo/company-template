/**
 * Fitness — spec-modular v1 (`docs/spec-fitness.md`).
 */

import type { TemplateStyle } from './branch-config.js';

export type FitnessModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const FITNESS_HOME: readonly string[] = [
  'hero',
  'keywordBand',
  'storyTeaser',
  'classCards',
  'trainingPlanOverview',
  'programTable',
  'pricingPackages',
  'trainers',
  'galleryPreview',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const FITNESS_SERVICES: readonly string[] = [
  'hero',
  'classCards',
  'trainingPlanOverview',
  'programTable',
  'pricingPackages',
  'testimonials',
  'galleryPreview',
  'faq',
  'cta',
];

const FITNESS_GALLERY: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'categoryCards',
  'testimonials',
  'cta',
];

const FITNESS_ABOUT: readonly string[] = [
  'hero',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const FITNESS_CONTACT: readonly string[] = [
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const FITNESS_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  keywordBand: 'Keyword-Band',
  storyTeaser: 'Story / Studio',
  classCards: 'Klassen & Programme',
  trainingPlanOverview: 'Trainingsplan',
  programTable: 'Programme & Formate',
  pricingPackages: 'Preise',
  trainers: 'Trainer:innen',
  galleryPreview: 'Studio & Stimmung',
  testimonials: 'Mitgliederstimmen',
  newsTeaser: 'News',
  contactPreview: 'Probetraining',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  categoryCards: 'Schwerpunkte',
  timeline: 'Zeitstrahl',
  team: 'Team',
  statsBand: 'Kennzahlen',
  faq: 'FAQ',
  cta: 'CTA',
  contactDetails: 'Kontaktdaten',
  locations: 'Standorte',
  directions: 'Wegbeschreibung',
};

export function fitnessModularBlueprint(_style: TemplateStyle, page: FitnessModularPageKey): readonly string[] {
  void _style;
  if (page === 'home') return FITNESS_HOME;
  if (page === 'services') return FITNESS_SERVICES;
  if (page === 'gallery') return FITNESS_GALLERY;
  if (page === 'about') return FITNESS_ABOUT;
  return FITNESS_CONTACT;
}
