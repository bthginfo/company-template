/**
 * Fitness – spec-modular v1 (`docs/spec-fitness.md`).
 * Classic / Modern / Bold – style-differentiated section layouts.
 */

import type { TemplateStyle } from './branch-config.js';

export type FitnessModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const FITNESS_HOME_CLASSIC: readonly string[] = [
  'hero',
  'actionBar',
  'keywordBand',
  'storyTeaser',
  'classCards',
  'trainingPlanOverview',
  'programTable',
  'pricingPackages',
  'trialCta',
  'trainers',
  'videoEmbed',
  'galleryPreview',
  'seasonalHighlight',
  'challengeSpotlight',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const FITNESS_HOME_MODERN: readonly string[] = [
  'hero',
  'actionBar',
  'classCards',
  'galleryPreview',
  'brandLogos',
  'storyTeaser',
  'trainingPlanOverview',
  'programTable',
  'pricingPackages',
  'trialCta',
  'trainers',
  'videoEmbed',
  'seasonalHighlight',
  'challengeSpotlight',
  'statsBand',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const FITNESS_HOME_BOLD: readonly string[] = [
  'hero',
  'marqueeBand',
  'featureImage',
  'actionBar',
  'classCards',
  'trainingPlanOverview',
  'programTable',
  'pricingPackages',
  'trialCta',
  'videoEmbed',
  'galleryPreview',
  'seasonalHighlight',
  'challengeSpotlight',
  'statsBand',
  'storySplit',
  'trainers',
  'testimonialMarquee',
  'quoteWall',
  'newsTeaser',
  'ctaBand',
];

const FITNESS_SERVICES_CLASSIC_MODERN: readonly string[] = [
  'hero',
  'highlightsBar',
  'classCards',
  'trainingPlanOverview',
  'programTable',
  'comparisonTable',
  'pricingPackages',
  'testimonials',
  'galleryPreview',
  'faq',
  'cta',
];

const FITNESS_SERVICES_BOLD: readonly string[] = [
  'hero',
  'highlightsBar',
  'classCards',
  'trainingPlanOverview',
  'programTable',
  'comparisonTable',
  'pricingPackages',
  'testimonials',
  'galleryPreview',
  'faq',
  'ctaBand',
];

const FITNESS_GALLERY_ALL: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'categoryCards',
  'testimonials',
  'cta',
];

const FITNESS_ABOUT_CLASSIC_BOLD: readonly string[] = [
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

const FITNESS_ABOUT_MODERN: readonly string[] = [
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

const FITNESS_CONTACT_ALL: readonly string[] = [
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const FITNESS_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  actionBar: 'Aktionsleiste',
  keywordBand: 'Keyword-Band',
  storyTeaser: 'Story / Studio',
  storySplit: 'Studio-Statement',
  classCards: 'Klassen & Programme',
  trainingPlanOverview: 'Trainingsplan',
  programTable: 'Programme & Formate',
  pricingPackages: 'Preise',
  trainers: 'Trainer:innen',
  team: 'Team',
  galleryPreview: 'Studio & Stimmung',
  testimonials: 'Mitgliederstimmen',
  testimonialMarquee: 'Stimmenband',
  newsTeaser: 'News',
  contactPreview: 'Probetraining',
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
  brandLogos: 'Partner & Marken',
  storyFacts: 'Story-Facts',
  quoteWall: 'Quote-Wall',
  highlightsBar: 'Highlights-Leiste',
  contactDetails: 'Kontaktdaten',
  locations: 'Standorte',
  directions: 'Wegbeschreibung',
  videoEmbed: 'Video',
  trialCta: 'Probetraining',
  seasonalHighlight: 'Saisonhighlight',
  challengeSpotlight: 'Challenge-Spotlight',
  comparisonTable: 'Mitgliedschaftsvergleich',
  trustStrip: 'Vertrauensleiste',
  badgeWall: 'Auszeichnungen',
};

export function fitnessModularBlueprint(style: TemplateStyle, page: FitnessModularPageKey): readonly string[] {
  if (page === 'home') {
    if (style === 'modern') return FITNESS_HOME_MODERN;
    if (style === 'bold') return FITNESS_HOME_BOLD;
    return FITNESS_HOME_CLASSIC;
  }
  if (page === 'services') {
    if (style === 'bold') return FITNESS_SERVICES_BOLD;
    return FITNESS_SERVICES_CLASSIC_MODERN;
  }
  if (page === 'gallery') return FITNESS_GALLERY_ALL;
  if (page === 'about') return style === 'modern' ? FITNESS_ABOUT_MODERN : FITNESS_ABOUT_CLASSIC_BOLD;
  return FITNESS_CONTACT_ALL;
}
