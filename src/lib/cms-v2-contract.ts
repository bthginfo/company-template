import type { TemplateStyle } from './branch-config';
import type { ModularPagesV2, ModularSectionV2, TemplateKey } from './types';
import {
  CMS_PAGE_KEYS,
  getCmsContract,
  getCmsSectionFieldKeys,
  type CmsPageKey,
} from './cms-contract';

export type CmsV2FieldKind = 'text' | 'textarea' | 'image' | 'link' | 'list' | 'boolean' | 'number' | 'object';

export type CmsV2FieldContract = {
  path: string;
  kind: CmsV2FieldKind;
};

export type CmsV2SectionContract = {
  type: string;
  fields: readonly CmsV2FieldContract[];
  repeatable: boolean;
};

export type CmsV2PageContract = {
  template: TemplateKey;
  style: TemplateStyle;
  page: CmsPageKey;
  sections: readonly CmsV2SectionContract[];
};

const FIELD_KIND_BY_ROOT: Record<string, CmsV2FieldKind> = {
  eyebrow: 'text',
  headline: 'text',
  titleA: 'text',
  titleB: 'text',
  subline: 'textarea',
  subtitle: 'textarea',
  intro: 'textarea',
  description: 'textarea',
  backgroundImage: 'image',
  image: 'image',
  featuredImage: 'image',
  button: 'link',
  buttonPrimary: 'link',
  buttonSecondary: 'link',
  autoAvailabilityStatusEnabled: 'boolean',
  availabilityStatusOverride: 'text',
  googleMapsUrl: 'text',
  phone: 'text',
  label: 'text',
  investmentMin: 'number',
  investmentMax: 'number',
  investmentStep: 'number',
  investmentDefault: 'number',
};

const LIST_ROOTS = new Set([
  'items',
  'labels',
  'testimonials',
  'images',
  'locations',
  'categories',
  'programs',
  'stats',
  'rows',
  'posts',
  'additionalFormFields',
]);

function fieldKind(root: string): CmsV2FieldKind {
  if (LIST_ROOTS.has(root)) return 'list';
  return FIELD_KIND_BY_ROOT[root] ?? 'object';
}

export function getCmsV2PageContract(template: TemplateKey, style: TemplateStyle, page: CmsPageKey): CmsV2PageContract {
  const v1 = getCmsContract(template, style, page);
  return {
    template,
    style,
    page,
    sections: v1.sections.map((section) => ({
      type: section.type,
      repeatable: true,
      fields: getCmsSectionFieldKeys(section.type).map((path) => ({ path, kind: fieldKind(path) })),
    })),
  };
}

export function seedModularPagesV2(template: TemplateKey, style: TemplateStyle): ModularPagesV2 {
  const pageEntries = CMS_PAGE_KEYS.map((page) => {
    const sections: ModularSectionV2[] = getCmsV2PageContract(template, style, page).sections.map((section, index) => ({
      id: `${page}-${section.type}-${index}`,
      type: section.type,
      visible: true,
      data: {},
    }));
    return [page, { sections }] as const;
  });
  return {
    version: 2,
    combo: { template, style },
    customPages: [],
    ...Object.fromEntries(pageEntries),
  };
}
