/**
 * Maps CMS spec `type` strings (Restaurant × style) to existing admin keys.
 * The live site still reads flat `SiteContent`; this module is for admin UX
 * alignment with your written specs until a structured `sections[]` store exists.
 */

import type { TemplateStyle } from '@/lib/branch-config';
import type { AdminSectionKey, PageKey } from '@/admin/admin-sections';

/** Spec block type string from the written spec (snakeCase / camelCase as in spec). */
export type RestaurantSpecBlockType = string;

const HOME_CLASSIC: Partial<Record<AdminSectionKey, RestaurantSpecBlockType>> = {
  announcements: 'noticeBanner',
  hero: 'hero',
  actionStrip: 'actionBar',
  services: 'featuredDishesGrid',
  signature: 'featuredItems',
  about: 'storyTeaser',
  gallery: 'galleryPreview',
  logos: 'labelBand',
  testimonials: 'testimonials',
  numbers: 'statsBand',
  news: 'newsTeaser',
  softCta: 'cta',
};

const HOME_MODERN: Partial<Record<AdminSectionKey, RestaurantSpecBlockType>> = {
  ...HOME_CLASSIC,
  /** Modern home omits a separate dishes grid in the default flow; services maps here. */
  services: 'featuredDishesGrid',
  logos: 'labelBand',
};

const HOME_BOLD: Partial<Record<AdminSectionKey, RestaurantSpecBlockType>> = {
  announcements: 'noticeBanner',
  hero: 'hero',
  marquee: 'marqueeBand',
  actionStrip: 'actionBar',
  /** Bold: dark featured dishes block — same data as home “signature” highlight rows today. */
  signature: 'featuredDishes',
  numbers: 'statsBand',
  gallery: 'galleryPreview',
  about: 'storyTeaser',
  testimonials: 'testimonials',
  news: 'newsTeaser',
  softCta: 'cta',
};

const SERVICES: Partial<Record<AdminSectionKey, RestaurantSpecBlockType>> = {
  servicesHeader: 'hero',
  highlights: 'highlightsBar',
  servicesList: 'menu',
  menu: 'menu',
  serviceProcess: 'steps',
  faq: 'faq',
  servicesCta: 'cta',
};

const GALLERY: Partial<Record<AdminSectionKey, RestaurantSpecBlockType>> = {
  galleryHeader: 'hero',
  galleryStory: 'teaserList',
  galleryGrid: 'gallery',
  galleryCategories: 'teaserList',
  galleryCta: 'cta',
};

const ABOUT: Partial<Record<AdminSectionKey, RestaurantSpecBlockType>> = {
  aboutHeader: 'hero',
  /** Classic/bold: Intro folgt auf den Hero-Block; siehe `restaurantSpecType` für Modern → storyFacts. */
  aboutIntro: 'hero',
  values: 'teaserList',
  timeline: 'timeline',
  team: 'team',
  aboutNumbers: 'statsBand',
  press: 'expertQuotes',
  aboutTestimonials: 'testimonials',
  aboutCta: 'cta',
};

const CONTACT: Partial<Record<AdminSectionKey, RestaurantSpecBlockType>> = {
  contactHeader: 'hero',
  contactDetails: 'contactDetails',
  contactForm: 'contactDetails',
  locations: 'locations',
  arrival: 'directions',
  contactCta: 'cta',
};

function homeMap(style: TemplateStyle): Partial<Record<AdminSectionKey, RestaurantSpecBlockType>> {
  if (style === 'modern') return HOME_MODERN;
  if (style === 'bold') return HOME_BOLD;
  return HOME_CLASSIC;
}

/**
 * Returns spec `type` for a restaurant admin section, or undefined if unmapped.
 */
export function restaurantSpecType(
  page: PageKey,
  adminKey: AdminSectionKey,
  style: TemplateStyle,
): RestaurantSpecBlockType | undefined {
  if (page === 'home') return homeMap(style)[adminKey];
  if (page === 'services') return SERVICES[adminKey];
  if (page === 'gallery') return GALLERY[adminKey];
  if (page === 'about') {
    if (style === 'modern' && adminKey === 'aboutIntro') return 'storyFacts';
    return ABOUT[adminKey];
  }
  if (page === 'contact') return CONTACT[adminKey];
  return undefined;
}
