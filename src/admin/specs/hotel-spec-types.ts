/**
 * Maps CMS spec `type` strings (Hotel × style) to existing admin keys.
 * Live content stays flat `SiteContent`; this aligns admin cards with the written specs.
 */

import type { TemplateStyle } from '@/lib/branch-config';
import type { AdminSectionKey, PageKey } from '@/admin/admin-sections';

export type HotelSpecBlockType = string;

const HOME_CLASSIC: Partial<Record<AdminSectionKey, HotelSpecBlockType>> = {
  announcements: 'noticeBanner',
  hero: 'hero',
  actionStrip: 'actionBar',
  signature: 'featuredAreas',
  about: 'storyTeaser',
  gallery: 'galleryPreview',
  testimonials: 'testimonials',
  numbers: 'statsBand',
  news: 'newsTeaser',
  softCta: 'cta',
};

const HOME_MODERN: Partial<Record<AdminSectionKey, HotelSpecBlockType>> = {
  announcements: 'noticeBanner',
  hero: 'hero',
  actionStrip: 'actionBar',
  gallery: 'galleryPreview',
  logos: 'brandLogos',
  signature: 'featuredAreas',
  about: 'storyTeaser',
  numbers: 'statsBand',
  testimonials: 'testimonials',
  news: 'newsTeaser',
  softCta: 'cta',
};

const HOME_BOLD: Partial<Record<AdminSectionKey, HotelSpecBlockType>> = {
  announcements: 'noticeBanner',
  hero: 'hero',
  marquee: 'marqueeBand',
  actionStrip: 'actionBar',
  gallery: 'galleryPreview',
  signature: 'roomSelection',
  numbers: 'statsBand',
  about: 'storyTeaser',
  testimonials: 'testimonials',
  news: 'newsTeaser',
  softCta: 'cta',
};

const SERVICES_CLASSIC_MODERN: Partial<Record<AdminSectionKey, HotelSpecBlockType>> = {
  servicesHeader: 'hero',
  highlights: 'highlightsBar',
  servicesList: 'accommodationsGrid',
  rooms: 'roomCards',
  serviceProcess: 'steps',
  faq: 'faq',
  servicesCta: 'cta',
};

const SERVICES_BOLD: Partial<Record<AdminSectionKey, HotelSpecBlockType>> = {
  ...SERVICES_CLASSIC_MODERN,
  servicesList: 'accommodationList',
};

const GALLERY: Partial<Record<AdminSectionKey, HotelSpecBlockType>> = {
  galleryHeader: 'hero',
  galleryStory: 'teaserList',
  galleryGrid: 'gallery',
  galleryCategories: 'teaserList',
  galleryCta: 'cta',
};

const ABOUT: Partial<Record<AdminSectionKey, HotelSpecBlockType>> = {
  aboutHeader: 'hero',
  aboutIntro: 'hero',
  values: 'teaserList',
  timeline: 'timeline',
  team: 'team',
  aboutNumbers: 'statsBand',
  aboutTestimonials: 'testimonials',
  aboutCta: 'cta',
};

const CONTACT: Partial<Record<AdminSectionKey, HotelSpecBlockType>> = {
  contactHeader: 'hero',
  contactDetails: 'contactDetails',
  contactForm: 'contactDetails',
  locations: 'locations',
  arrival: 'directions',
  contactCta: 'cta',
};

function homeMap(style: TemplateStyle): Partial<Record<AdminSectionKey, HotelSpecBlockType>> {
  if (style === 'modern') return HOME_MODERN;
  if (style === 'bold') return HOME_BOLD;
  return HOME_CLASSIC;
}

function servicesMap(style: TemplateStyle): Partial<Record<AdminSectionKey, HotelSpecBlockType>> {
  return style === 'bold' ? SERVICES_BOLD : SERVICES_CLASSIC_MODERN;
}

/**
 * Returns spec `type` for a hotel admin section, or undefined if unmapped.
 */
export function hotelSpecType(
  page: PageKey,
  adminKey: AdminSectionKey,
  style: TemplateStyle,
): HotelSpecBlockType | undefined {
  if (page === 'home') return homeMap(style)[adminKey];
  if (page === 'services') return servicesMap(style)[adminKey];
  if (page === 'gallery') return GALLERY[adminKey];
  if (page === 'about') {
    if (style === 'modern' && adminKey === 'aboutIntro') return 'storyFacts';
    return ABOUT[adminKey];
  }
  if (page === 'contact') return CONTACT[adminKey];
  return undefined;
}
