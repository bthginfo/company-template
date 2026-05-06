/**
 * Spec `type` order per Hotel × style × page (modular v1).
 * Page keys mirror `modularPagesV1`: services = Zimmer, gallery = Haus & Spa, about = Geschichte, contact = Reservieren.
 */

import type { TemplateStyle } from './branch-config.js';

export type HotelModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

/* ─── Home ─── */
const HOTEL_HOME_CLASSIC: readonly string[] = [
  'hero',
  'actionBar',
  'featuredAreas',
  'storyTeaser',
  'galleryPreview',
  'testimonials',
  'statsBand',
  'newsTeaser',
  'cta',
];

const HOTEL_HOME_MODERN: readonly string[] = [
  'hero',
  'actionBar',
  'galleryPreview',
  'brandLogos',
  'featuredAreas',
  'storyTeaser',
  'statsBand',
  'testimonials',
  'newsTeaser',
  'cta',
];

const HOTEL_HOME_BOLD: readonly string[] = [
  'hero',
  'marqueeBand',
  'actionBar',
  'galleryPreview',
  'roomSelection',
  'statsBand',
  'storyTeaser',
  'testimonialMarquee',
  'testimonials',
  'newsTeaser',
  'cta',
];

/* ─── Zimmer (services) ─── */
const HOTEL_SERVICES_CLASSIC_MODERN: readonly string[] = [
  'hero',
  'highlightsBar',
  'accommodationsGrid',
  'roomCards',
  'steps',
  'faq',
  'cta',
];

const HOTEL_SERVICES_BOLD: readonly string[] = [
  'hero',
  'highlightsBar',
  'accommodationList',
  'roomCards',
  'steps',
  'faq',
  'cta',
];

const HOTEL_GALLERY_ALL: readonly string[] = [
  'hero',
  'teaserList',
  'gallery',
  'teaserList',
  'cta',
];

const HOTEL_ABOUT_CLASSIC_BOLD: readonly string[] = [
  'hero',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const HOTEL_ABOUT_MODERN: readonly string[] = [
  'hero',
  'storyFacts',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const HOTEL_CONTACT_ALL: readonly string[] = [
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const HOTEL_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  actionBar: 'Aktionsleiste',
  featuredAreas: 'Bereichs-Teaser',
  storyTeaser: 'Story-Teaser',
  galleryPreview: 'Galerie-Vorschau',
  testimonials: 'Bewertungen',
  statsBand: 'Eckdaten-Band',
  newsTeaser: 'News-Teaser',
  cta: 'CTA',
  marqueeBand: 'Marquee / Themenband',
  brandLogos: 'Brand- / Partner-Logos',
  roomSelection: 'Zimmer-Auswahl (Bold)',
  testimonialMarquee: 'Stimmenband',
  highlightsBar: 'Highlights-Leiste',
  accommodationsGrid: 'Unterkunfts-Übersicht',
  accommodationList: 'Bereichs-Übersicht (Bold)',
  roomCards: 'Zimmer & Suiten',
  steps: 'Ablauf',
  faq: 'FAQ',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  timeline: 'Zeitstrahl',
  team: 'Team',
  storyFacts: 'Story-Facts',
  contactDetails: 'Kontaktdaten',
  locations: 'Weitere Standorte',
  directions: 'Wegbeschreibung',
};

export function hotelModularBlueprint(style: TemplateStyle, page: HotelModularPageKey): readonly string[] {
  if (page === 'home') {
    if (style === 'modern') return HOTEL_HOME_MODERN;
    if (style === 'bold') return HOTEL_HOME_BOLD;
    return HOTEL_HOME_CLASSIC;
  }
  if (page === 'services') {
    if (style === 'bold') return HOTEL_SERVICES_BOLD;
    return HOTEL_SERVICES_CLASSIC_MODERN;
  }
  if (page === 'gallery') return HOTEL_GALLERY_ALL;
  if (page === 'about') return style === 'modern' ? HOTEL_ABOUT_MODERN : HOTEL_ABOUT_CLASSIC_BOLD;
  return HOTEL_CONTACT_ALL;
}
