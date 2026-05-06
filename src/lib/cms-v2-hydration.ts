import type { TemplateStyle } from './branch-config.js';
import { SiteContentSchema, type ModularPagesV1, type ModularPagesV2, type ModularSectionV2, type SiteContent, type TemplateKey } from './types.js';
import { CMS_PAGE_KEYS, getCmsSectionTypes, type CmsPageKey } from './cms-contract.js';
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

function completeV2PageSections(
  currentSections: readonly ModularSectionV2[] | undefined,
  template: TemplateKey,
  style: TemplateStyle,
  page: CmsPageKey,
): ModularSectionV2[] {
  const next = [...(currentSections ?? [])];
  const currentCounts = new Map<string, number>();
  for (const section of next) currentCounts.set(section.type, (currentCounts.get(section.type) ?? 0) + 1);

  const requiredCounts = new Map<string, number>();
  for (const type of getCmsSectionTypes(template, style, page)) {
    const requiredIndex = requiredCounts.get(type) ?? 0;
    requiredCounts.set(type, requiredIndex + 1);
    if ((currentCounts.get(type) ?? 0) <= requiredIndex) {
      next.push({
        id: `${page}-${type}-${requiredIndex}`,
        type,
        visible: true,
        data: {},
      });
      currentCounts.set(type, (currentCounts.get(type) ?? 0) + 1);
    }
  }

  return next;
}

type CmsV2NormalizeMode = 'preserve' | 'legacy';

export function ensureCompleteModularPagesV2(
  content: SiteContent,
  template: TemplateKey,
  style: TemplateStyle,
  mode: CmsV2NormalizeMode = 'preserve',
): ModularPagesV2 {
  const current = content.modularPagesV2;
  if (mode === 'legacy' || current?.combo?.template !== template || current.combo.style !== style) {
    return buildModularPagesV2FromLegacy(content, template, style);
  }

  const next: ModularPagesV2 = {
    ...current,
    version: 2,
    combo: { template, style },
  };
  for (const page of CMS_PAGE_KEYS) {
    next[page] = {
      sections: completeV2PageSections(current[page]?.sections, template, style, page),
    };
  }
  return next;
}

export function normalizeSiteContentCmsV2(
  content: SiteContent,
  template: TemplateKey,
  style: TemplateStyle,
  mode: CmsV2NormalizeMode = 'preserve',
): SiteContent {
  return SiteContentSchema.parse({
    ...content,
    cmsV2: { ...(content.cmsV2 ?? {}), enabled: true },
    modularPagesV2: ensureCompleteModularPagesV2(content, template, style, mode),
  });
}
