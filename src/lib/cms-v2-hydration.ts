import type { TemplateStyle } from './branch-config.js';
import type { ModularPagesV1, ModularPagesV2, ModularSectionV2, SiteContent, TemplateKey } from './types.js';
import { CMS_PAGE_KEYS, type CmsPageKey } from './cms-contract.js';
import { importRestaurantModularFromLegacy } from './modular-restaurant.js';
import { importHotelModularFromLegacy } from './modular-hotel.js';
import { importTourismModularFromLegacy } from './modular-tourism.js';
import { importSalonModularFromLegacy } from './modular-salon.js';
import { importTradesmanModularFromLegacy } from './modular-tradesman.js';
import { importConsultingModularFromLegacy } from './modular-consulting.js';
import { importMedicalModularFromLegacy } from './modular-medical.js';
import { importFitnessModularFromLegacy } from './modular-fitness.js';

function importV1FromLegacy(content: SiteContent, template: TemplateKey, style: TemplateStyle): ModularPagesV1 {
  switch (template) {
    case 'restaurant':
      return importRestaurantModularFromLegacy(content, style);
    case 'hotel':
      return importHotelModularFromLegacy(content, style);
    case 'tourism':
      return importTourismModularFromLegacy(content, style);
    case 'salon':
      return importSalonModularFromLegacy(content, style);
    case 'tradesman':
      return importTradesmanModularFromLegacy(content, style);
    case 'consulting':
      return importConsultingModularFromLegacy(content, style);
    case 'medical':
      return importMedicalModularFromLegacy(content, style);
    case 'fitness':
      return importFitnessModularFromLegacy(content, style);
  }
}

function v2SectionsFromV1(page: CmsPageKey, v1: ModularPagesV1): ModularSectionV2[] {
  const sections = v1[page]?.sections ?? [];
  return sections.map((section, index) => ({
    id: section.id || `${page}-${section.type}-${index}`,
    type: section.type,
    visible: section.isVisible !== false,
    data: { ...(section.data ?? {}) },
  }));
}

export function buildModularPagesV2FromLegacy(content: SiteContent, template: TemplateKey, style: TemplateStyle): ModularPagesV2 {
  const v1 = importV1FromLegacy(content, template, style);
  const modular: ModularPagesV2 = {
    version: 2,
    combo: { template, style },
  };

  for (const page of CMS_PAGE_KEYS) {
    modular[page] = { sections: v2SectionsFromV1(page, v1) };
  }

  return modular;
}
