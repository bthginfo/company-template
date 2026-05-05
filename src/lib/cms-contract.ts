import type { TemplateStyle } from './branch-config';
import type { TemplateKey } from './types';
import { restaurantModularBlueprint } from './modular-restaurant-blueprints';
import { hotelModularBlueprint } from './modular-hotel-blueprints';
import { tourismModularBlueprint } from './modular-tourism-blueprints';
import { salonModularBlueprint } from './modular-salon-blueprints';
import { tradesmanModularBlueprint } from './modular-tradesman-blueprints';
import { consultingModularBlueprint } from './modular-consulting-blueprints';
import { medicalModularBlueprint } from './modular-medical-blueprints';
import { fitnessModularBlueprint } from './modular-fitness-blueprints';

export type CmsPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

export type CmsSectionContract = {
  type: string;
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

export function getCmsContract(template: TemplateKey, style: TemplateStyle, page: CmsPageKey): CmsPageContract {
  return {
    template,
    style,
    page,
    sections: BLUEPRINT_BY_TEMPLATE[template](style, page).map((type) => ({ type })),
  };
}

export function getCmsSectionTypes(template: TemplateKey, style: TemplateStyle, page: CmsPageKey): readonly string[] {
  return getCmsContract(template, style, page).sections.map((s) => s.type);
}
