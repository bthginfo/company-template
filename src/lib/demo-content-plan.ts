import { DEMO_CONTENT_PLAN } from './demo-content-plan.generated';
import type { CmsPageKey } from './cms-contract';
import type { TemplateStyle } from './branch-config';
import type { ModularSectionV2, SiteContent, TemplateKey } from './types';

function cloneData(value: Record<string, unknown>): Record<string, unknown> {
  return structuredClone(value) as Record<string, unknown>;
}

function mergePlannedSections(
  sections: readonly ModularSectionV2[] | undefined,
  plannedSections: readonly { type: string; data: Record<string, unknown> }[] | undefined,
): ModularSectionV2[] {
  if (!sections?.length || !plannedSections?.length) return [...(sections ?? [])];

  const plannedByType = new Map<string, { type: string; data: Record<string, unknown> }[]>();
  for (const section of plannedSections) {
    const rows = plannedByType.get(section.type) ?? [];
    rows.push(section);
    plannedByType.set(section.type, rows);
  }

  const seen = new Map<string, number>();
  return sections.map((section) => {
    const index = seen.get(section.type) ?? 0;
    seen.set(section.type, index + 1);
    const planned = plannedByType.get(section.type)?.[index];
    if (!planned) return section;
    return {
      ...section,
      data: {
        ...(section.data ?? {}),
        ...cloneData(planned.data),
      },
    };
  });
}

export function applyDemoContentPlan(content: SiteContent, template: TemplateKey, style: TemplateStyle): SiteContent {
  const plan = DEMO_CONTENT_PLAN[template]?.[style];
  if (!plan || !content.modularPagesV2) return content;

  const modularPagesV2 = structuredClone(content.modularPagesV2);
  for (const page of ['home', 'services', 'gallery', 'about', 'contact'] as CmsPageKey[]) {
    const pagePlan = plan.pages[page];
    const currentPage = modularPagesV2[page];
    if (!currentPage || !pagePlan?.length) continue;
    modularPagesV2[page] = {
      ...currentPage,
      sections: mergePlannedSections(currentPage.sections, pagePlan),
    };
  }

  return {
    ...content,
    brand: {
      ...content.brand,
      name: plan.brandName || content.brand.name,
    },
    modularPagesV2,
  };
}
