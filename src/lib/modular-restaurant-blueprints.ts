/**
 * Spec `type` order per Restaurant × style × page (modular v1).
 * Subpages follow your written specs; home follows BRANCH_STYLE_ORDER semantics.
 */

import type { TemplateStyle } from '@/lib/branch-config';

export type RestaurantModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const HOME_CLASSIC: readonly string[] = [
  'noticeBanner',
  'hero',
  'actionBar',
  'featuredDishesGrid',
  'storyTeaser',
  'galleryPreview',
  'labelBand',
  'testimonials',
  'statsBand',
  'newsTeaser',
  'cta',
];

const HOME_MODERN: readonly string[] = [
  'noticeBanner',
  'hero',
  'actionBar',
  'featuredDishesGrid',
  'storyTeaser',
  'galleryPreview',
  'labelBand',
  'testimonials',
  'statsBand',
  'newsTeaser',
  'cta',
];

const HOME_BOLD: readonly string[] = [
  'noticeBanner',
  'hero',
  'marqueeBand',
  'actionBar',
  'featuredDishes',
  'statsBand',
  'galleryPreview',
  'storyTeaser',
  'testimonials',
  'newsTeaser',
  'cta',
];

const SERVICES_ALL: readonly string[] = [
  'noticeBanner',
  'hero',
  'highlightsBar',
  'menu',
  'steps',
  'faq',
  'cta',
];

const GALLERY_ALL: readonly string[] = [
  'noticeBanner',
  'hero',
  'teaserList',
  'gallery',
  'teaserList',
  'cta',
];

const ABOUT_CLASSIC_BOLD: readonly string[] = [
  'noticeBanner',
  'hero',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'expertQuotes',
  'testimonials',
  'cta',
];

const ABOUT_MODERN: readonly string[] = [
  'noticeBanner',
  'hero',
  'storyFacts',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'expertQuotes',
  'testimonials',
  'cta',
];

const CONTACT_ALL: readonly string[] = [
  'noticeBanner',
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
