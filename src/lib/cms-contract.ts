import type { TemplateStyle } from './branch-config.js';
import type { TemplateKey } from './types.js';
import { restaurantModularBlueprint } from './modular-restaurant-blueprints.js';
import { hotelModularBlueprint } from './modular-hotel-blueprints.js';
import { tourismModularBlueprint } from './modular-tourism-blueprints.js';
import { salonModularBlueprint } from './modular-salon-blueprints.js';
import { tradesmanModularBlueprint } from './modular-tradesman-blueprints.js';
import { consultingModularBlueprint } from './modular-consulting-blueprints.js';
import { medicalModularBlueprint } from './modular-medical-blueprints.js';
import { fitnessModularBlueprint } from './modular-fitness-blueprints.js';

export type CmsPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

export type CmsSectionContract = {
  type: string;
  fields: readonly string[];
};

export type CmsPageContract = {
  template: TemplateKey;
  style: TemplateStyle;
  page: CmsPageKey;
  sections: readonly CmsSectionContract[];
};

type BlueprintFn = (style: TemplateStyle, page: CmsPageKey) => readonly string[];

const BLUEPRINT_BY_TEMPLATE: Record<TemplateKey, BlueprintFn> = {
  restaurant: restaurantModularBlueprint,
  hotel: hotelModularBlueprint,
  tourism: tourismModularBlueprint,
  salon: salonModularBlueprint,
  tradesman: tradesmanModularBlueprint,
  consulting: consultingModularBlueprint,
  medical: medicalModularBlueprint,
  fitness: fitnessModularBlueprint,
};

export const CMS_PAGE_KEYS: readonly CmsPageKey[] = ['home', 'services', 'gallery', 'about', 'contact'];

export const CMS_SECTION_FIELD_CONTRACTS = {
  noticeBanner: ['items'],
  hero: ['eyebrow', 'headline', 'subline', 'description', 'backgroundImage', 'image', 'buttonPrimary', 'stats'],
  cta: ['eyebrow', 'headline', 'subline', 'button'],
  ctaBand: ['eyebrow', 'headline', 'subline', 'button'],
  actionBar: ['autoAvailabilityStatusEnabled', 'availabilityStatusOverride', 'buttonPrimary', 'buttonSecondary'],
  marqueeBand: ['items'],
  keywordBand: ['items'],
  testimonialMarquee: ['items'],
  statsBand: ['items'],
  testimonials: ['eyebrow', 'headline', 'testimonials', 'items'],
  labelBand: ['labels'],
  newsTeaser: ['eyebrow', 'headline', 'button'],
  newsHighlightList: ['eyebrow', 'headline', 'featuredImage', 'posts'],
  highlightsBar: ['items'],
  steps: ['eyebrow', 'headline', 'items'],
  faq: ['eyebrow', 'headline', 'items'],
  teaserList: ['eyebrow', 'headline', 'intro', 'description', 'items'],
  timeline: ['items'],
  team: ['eyebrow', 'headline', 'items'],
  trainers: ['eyebrow', 'headline', 'items'],
  expertQuotes: ['eyebrow', 'headline', 'items'],
  storyFacts: ['description', 'items'],
  storyTeaser: ['eyebrow', 'headline', 'description', 'image', 'button'],
  storySplit: ['eyebrow', 'headline', 'description'],
  storyImageSplit: ['eyebrow', 'headline', 'description'],
  galleryPreview: ['eyebrow', 'headline', 'images', 'button'],
  featuredDishesGrid: ['eyebrow', 'titleA', 'titleB', 'description', 'items'],
  featuredDishes: ['eyebrow', 'headline', 'items'],
  featuredItems: ['eyebrow', 'headline', 'description', 'items'],
  gallery: ['images'],
  contactDetails: ['eyebrow', 'headline', 'subline', 'googleMapsUrl', 'additionalFormFields'],
  locations: ['locations'],
  directions: ['eyebrow', 'headline', 'subline', 'items'],
  menu: ['categories', 'eyebrow', 'titleA', 'titleB', 'subtitle'],
  serviceCards: ['eyebrow', 'headline', 'description', 'items'],
  featuredServices: ['eyebrow', 'headline', 'description', 'items'],
  serviceList: ['eyebrow', 'headline', 'description', 'items'],
  featuredLooks: ['eyebrow', 'headline', 'description', 'items'],
  featuredLooksBand: ['eyebrow', 'headline', 'description', 'items'],
  tourOverviewCards: ['eyebrow', 'headline', 'description', 'items'],
  tourOverviewList: ['eyebrow', 'headline', 'description', 'items'],
  serviceOverviewCards: ['eyebrow', 'headline', 'description', 'items'],
  serviceOverviewList: ['eyebrow', 'headline', 'description', 'items'],
  featuredAreas: ['eyebrow', 'headline', 'description', 'items'],
  roomSelection: ['eyebrow', 'headline', 'description', 'items'],
  tourSchedule: ['eyebrow', 'headline', 'description', 'items'],
  tourSelection: ['eyebrow', 'headline', 'description', 'items'],
  classCards: ['eyebrow', 'headline', 'description', 'items'],
  accommodationsGrid: ['eyebrow', 'headline', 'description', 'items'],
  accommodationList: ['eyebrow', 'headline', 'description', 'items'],
  roomCards: ['eyebrow', 'headline', 'description', 'items'],
  tourCards: ['eyebrow', 'headline', 'description', 'items'],
  pricingPackages: ['eyebrow', 'headline', 'description', 'items'],
  stickyEmergencyBanner: ['phone', 'label', 'headline', 'subline'],
  fundingCalculator: ['investmentMin', 'investmentMax', 'investmentStep', 'investmentDefault', 'programs'],
  brandLogos: ['items'],
  featureImage: ['image'],
  quoteWall: ['items'],
  categoryCards: ['eyebrow', 'headline', 'items'],
  topicBand: ['headline', 'subline', 'phone', 'items'],
  topicCards: ['items'],
  trainingPlanOverview: ['eyebrow', 'headline', 'description', 'items'],
  programTable: ['eyebrow', 'headline', 'rows'],
  contactPreview: ['eyebrow', 'headline', 'description'],
  serviceInfo: ['eyebrow', 'headline', 'description', 'items'],
  appointmentBooking: ['eyebrow', 'headline', 'description', 'items'],
  qualifications: ['eyebrow', 'headline', 'description', 'items'],
  processTextColumns: ['eyebrow', 'headline', 'description', 'items'],
  processCards: ['eyebrow', 'headline', 'description', 'items'],
} as const satisfies Record<string, readonly string[]>;

const CMS_REPEATABLE_SECTION_TYPES = new Set<string>([
  'marqueeBand',
  'keywordBand',
  'testimonialMarquee',
  'statsBand',
  'testimonials',
  'labelBand',
  'highlightsBar',
  'steps',
  'faq',
  'teaserList',
  'timeline',
  'team',
  'trainers',
  'expertQuotes',
  'storyFacts',
  'galleryPreview',
  'featuredDishesGrid',
  'featuredDishes',
  'featuredItems',
  'gallery',
  'directions',
  'serviceCards',
  'featuredServices',
  'serviceList',
  'featuredLooks',
  'featuredLooksBand',
  'tourOverviewCards',
  'tourOverviewList',
  'serviceOverviewCards',
  'serviceOverviewList',
  'featuredAreas',
  'roomSelection',
  'tourSchedule',
  'tourSelection',
  'classCards',
  'accommodationsGrid',
  'accommodationList',
  'roomCards',
  'tourCards',
  'pricingPackages',
  'brandLogos',
  'quoteWall',
  'categoryCards',
  'topicCards',
  'programTable',
  'qualifications',
  'processTextColumns',
  'processCards',
]);

export function getCmsSectionFieldKeys(sectionType: string): readonly string[] {
  return CMS_SECTION_FIELD_CONTRACTS[sectionType as keyof typeof CMS_SECTION_FIELD_CONTRACTS] ?? [];
}

export function getCmsContract(template: TemplateKey, style: TemplateStyle, page: CmsPageKey): CmsPageContract {
  return {
    template,
    style,
    page,
    sections: BLUEPRINT_BY_TEMPLATE[template](style, page).map((type) => ({ type, fields: getCmsSectionFieldKeys(type) })),
  };
}

export function getCmsSectionTypes(template: TemplateKey, style: TemplateStyle, page: CmsPageKey): readonly string[] {
  return getCmsContract(template, style, page).sections.map((s) => s.type);
}

export function getCmsAddableSectionTypes(
  template: TemplateKey,
  style: TemplateStyle,
  page: CmsPageKey,
  existingTypes: readonly string[],
): readonly string[] {
  const existingCounts = new Map<string, number>();
  for (const type of existingTypes) {
    existingCounts.set(type, (existingCounts.get(type) ?? 0) + 1);
  }

  const seen = new Set<string>();
  const out: string[] = [];
  const pageTypes = new Set(getCmsSectionTypes(template, style, page));
  const allTypesForCombo = CMS_PAGE_KEYS.flatMap((pageKey) => Array.from(getCmsSectionTypes(template, style, pageKey)));
  const addableTypes = [
    ...getCmsSectionTypes(template, style, page),
    ...allTypesForCombo.filter((type) => type !== 'noticeBanner' && type !== 'hero' && !pageTypes.has(type)),
  ];
  for (const type of addableTypes) {
    if (type === 'noticeBanner' || seen.has(type)) continue;
    const existing = existingCounts.get(type) ?? 0;
    if (existing === 0 || CMS_REPEATABLE_SECTION_TYPES.has(type)) out.push(type);
    seen.add(type);
  }
  return out;
}
