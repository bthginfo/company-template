/**
 * Spec `type` order per Restaurant × style × page (modular v1).
 * Subpages follow your written specs; home follows BRANCH_STYLE_ORDER semantics.
 */

import type { TemplateStyle } from './branch-config.js';

export type RestaurantModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const HOME_CLASSIC: readonly string[] = [
  'hero',
  'actionBar',
  'featuredDishesGrid',
  'storyTeaser',
  'videoEmbed',
  'galleryPreview',
  'labelBand',
  'testimonials',
  'seasonalHighlight',
  'statsBand',
  'reservationTeaser',
  'newsTeaser',
  'cta',
];

const HOME_MODERN: readonly string[] = [
  'hero',
  'actionBar',
  'featuredDishesGrid',
  'storyTeaser',
  'videoEmbed',
  'galleryPreview',
  'labelBand',
  'testimonials',
  'seasonalHighlight',
  'statsBand',
  'reservationTeaser',
  'newsTeaser',
  'cta',
];

const HOME_BOLD: readonly string[] = [
  'hero',
  'marqueeBand',
  'actionBar',
  'featuredDishes',
  'videoEmbed',
  'statsBand',
  'galleryPreview',
  'storyTeaser',
  'seasonalHighlight',
  'testimonials',
  'reservationTeaser',
  'newsTeaser',
  'cta',
];

const SERVICES_ALL: readonly string[] = [
  'hero',
  'highlightsBar',
  'menu',
  'steps',
  'faq',
  'cta',
];

const GALLERY_ALL: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'cta',
];

const ABOUT_CLASSIC_BOLD: readonly string[] = [
  'hero',
  'teaserList',
  'chefStory',
  'timeline',
  'team',
  'trustStrip',
  'statsBand',
  'expertQuotes',
  'badgeWall',
  'testimonials',
  'cta',
];

const ABOUT_MODERN: readonly string[] = [
  'hero',
  'storyFacts',
  'teaserList',
  'chefStory',
  'timeline',
  'team',
  'trustStrip',
  'statsBand',
  'expertQuotes',
  'badgeWall',
  'testimonials',
  'cta',
];

const CONTACT_ALL: readonly string[] = [
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const RESTAURANT_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  actionBar: 'Aktionsleiste',
  featuredDishesGrid: 'Gerichte-Grid',
  featuredDishes: 'Gerichte (Bold)',
  storyTeaser: 'Story-Teaser',
  galleryPreview: 'Galerie-Vorschau',
  labelBand: 'Label-Band',
  testimonials: 'Bewertungen',
  statsBand: 'Eckdaten-Band',
  newsTeaser: 'News-Teaser',
  cta: 'CTA',
  marqueeBand: 'Marquee / Themenband',
  highlightsBar: 'Highlights-Leiste',
  menu: 'Speisekarte',
  steps: 'Ablauf',
  faq: 'FAQ',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  timeline: 'Zeitstrahl',
  team: 'Team',
  expertQuotes: 'Presse / Zitate',
  storyFacts: 'Story-Facts',
  contactDetails: 'Kontaktdaten',
  locations: 'Weitere Standorte',
  directions: 'Wegbeschreibung',
  videoEmbed: 'Video',
  seasonalHighlight: 'Saisonhighlight',
  reservationTeaser: 'Reservierung',
  chefStory: 'Küchenchef-Story',
  trustStrip: 'Vertrauensleiste',
  badgeWall: 'Auszeichnungen',
};

export function restaurantModularBlueprint(
  style: TemplateStyle,
  page: RestaurantModularPageKey,
): readonly string[] {
  if (page === 'home') {
    if (style === 'modern') return HOME_MODERN;
    if (style === 'bold') return HOME_BOLD;
    return HOME_CLASSIC;
  }
  if (page === 'services') return SERVICES_ALL;
  if (page === 'gallery') return GALLERY_ALL;
  if (page === 'about') return style === 'modern' ? ABOUT_MODERN : ABOUT_CLASSIC_BOLD;
  return CONTACT_ALL;
}
