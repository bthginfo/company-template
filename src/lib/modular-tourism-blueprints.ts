/**
 * Spec `type` order per Tourismus × style × page (modular v1).
 * Page keys mirror `modularPagesV1`: services = Touren, gallery = Eindrücke, about = Guides, contact = Buchen.
 */

import type { TemplateStyle } from './branch-config.js';

export type TourismModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const TOURISM_HOME_CLASSIC: readonly string[] = [
  'noticeBanner',
  'hero',
  'actionBar',
  'galleryPreview',
  'tourSchedule',
  'storyTeaser',
  'testimonials',
  'statsBand',
  'newsTeaser',
  'cta',
];

const TOURISM_HOME_MODERN: readonly string[] = [
  'noticeBanner',
  'hero',
  'actionBar',
  'tourSchedule',
  'galleryPreview',
  'brandLogos',
  'statsBand',
  'storyTeaser',
  'testimonials',
  'newsTeaser',
  'cta',
];

const TOURISM_HOME_BOLD: readonly string[] = [
  'noticeBanner',
  'hero',
  'marqueeBand',
  'actionBar',
  'galleryPreview',
  'statsBand',
  'tourSelection',
  'storyTeaser',
  'testimonialMarquee',
  'testimonials',
  'newsTeaser',
  'cta',
];

const TOURISM_SERVICES_CLASSIC_MODERN: readonly string[] = [
  'noticeBanner',
  'hero',
  'highlightsBar',
  'tourOverviewCards',
  'tourCards',
  'steps',
  'faq',
  'cta',
];

const TOURISM_SERVICES_BOLD: readonly string[] = [
  'noticeBanner',
  'hero',
  'highlightsBar',
  'tourOverviewList',
  'tourCards',
  'steps',
  'faq',
  'cta',
];

const TOURISM_GALLERY_ALL: readonly string[] = [
  'noticeBanner',
  'hero',
  'teaserList',
  'gallery',
  'teaserList',
  'cta',
];

const TOURISM_ABOUT_CLASSIC_BOLD: readonly string[] = [
  'noticeBanner',
  'hero',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const TOURISM_ABOUT_MODERN: readonly string[] = [
  'noticeBanner',
  'hero',
  'storyFacts',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const TOURISM_CONTACT_ALL: readonly string[] = [
  'noticeBanner',
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const TOURISM_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  actionBar: 'Aktionsleiste',
  galleryPreview: 'Galerie-Vorschau',
  tourSchedule: 'Touren-Teaser / Tourplan',
  tourSelection: 'Tour-Auswahl (Bold)',
  storyTeaser: 'Story-Teaser',
  testimonials: 'Bewertungen',
  statsBand: 'Eckdaten-Band',
  newsTeaser: 'News-Teaser',
  cta: 'CTA',
  marqueeBand: 'Marquee / Themenband',
  brandLogos: 'Brand- / Partner-Logos',
  testimonialMarquee: 'Stimmenband',
  highlightsBar: 'Highlights-Leiste',
  tourOverviewCards: 'Tourformate-Übersicht',
  tourOverviewList: 'Bereichs-Übersicht (Bold)',
  tourCards: 'Touren & Erlebnisse',
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

export function tourismModularBlueprint(style: TemplateStyle, page: TourismModularPageKey): readonly string[] {
  if (page === 'home') {
    if (style === 'modern') return TOURISM_HOME_MODERN;
    if (style === 'bold') return TOURISM_HOME_BOLD;
    return TOURISM_HOME_CLASSIC;
  }
  if (page === 'services') {
    if (style === 'bold') return TOURISM_SERVICES_BOLD;
    return TOURISM_SERVICES_CLASSIC_MODERN;
  }
  if (page === 'gallery') return TOURISM_GALLERY_ALL;
  if (page === 'about') return style === 'modern' ? TOURISM_ABOUT_MODERN : TOURISM_ABOUT_CLASSIC_BOLD;
  return TOURISM_CONTACT_ALL;
}
