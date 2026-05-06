import { getCmsSectionFieldKeys, type CmsPageKey } from '../src/lib/cms-contract';
import { normalizeSiteContentCmsV2 } from '../src/lib/cms-v2-hydration';
import { defaultsFor } from '../src/lib/provision-core';
import type { TemplateStyle } from '../src/lib/branch-config';
import type { ModularSectionV2, SiteContent, TemplateKey } from '../src/lib/types';

const TEMPLATES: TemplateKey[] = ['restaurant', 'hotel', 'tourism', 'salon', 'tradesman', 'consulting', 'medical', 'fitness'];
const STYLES: TemplateStyle[] = ['classic', 'modern', 'bold'];
const PAGES: CmsPageKey[] = ['home', 'services', 'gallery', 'about', 'contact'];

const errors: string[] = [];

function valueAtPath(root: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => (
    current && typeof current === 'object' && !Array.isArray(current)
      ? (current as Record<string, unknown>)[key]
      : undefined
  ), root);
}

function hasMeaningfulValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.some(hasMeaningfulValue);
  if (typeof value === 'object') return Object.values(value as Record<string, unknown>).some(hasMeaningfulValue);
  return true;
}

for (const template of TEMPLATES) {
  for (const style of STYLES) {
    const content = defaultsFor(template, `QA ${template}`, undefined, style);
    assertNoEmptyFields(content, template, style, 'fresh');

    const stale = simulateStaleV2(content);
    const repaired = normalizeSiteContentCmsV2(stale, template, style);
    assertNoEmptyFields(repaired, template, style, 'repaired');
  }
}

function assertNoEmptyFields(content: SiteContent, template: TemplateKey, style: TemplateStyle, mode: string): void {
  if (!hasMeaningfulValue(content.announcements)) {
    errors.push(`${template}/${style}/${mode}: empty global header announcements`);
  }
  for (const page of PAGES) {
    const sections = content.modularPagesV2?.[page]?.sections ?? [];
    for (const section of sections) {
      const data = (section.data ?? {}) as Record<string, unknown>;
      const emptyFields = getCmsSectionFieldKeys(section.type).filter((field) => !hasMeaningfulValue(valueAtPath(data, field)));
      if (emptyFields.length) {
        errors.push(`${template}/${style}/${page}/${section.type}/${mode}: empty demo admin fields: ${emptyFields.join(', ')}`);
      }
    }
  }
}

function simulateStaleV2(content: SiteContent): SiteContent {
  const modularPagesV2 = content.modularPagesV2;
  if (!modularPagesV2) return content;
  return {
    ...content,
    announcements: [],
    modularPagesV2: {
      ...modularPagesV2,
      home: {
        sections: (modularPagesV2.home?.sections ?? []).map((section): ModularSectionV2 => {
          if (section.type === 'newsTeaser') {
            return { ...section, data: { ...section.data, eyebrow: '', headline: '' } };
          }
          if (section.type === 'testimonials') {
            return {
              ...section,
              data: {
                ...section.data,
                testimonials: [{ name: '', quote: '' }, ...(((section.data?.testimonials as unknown[]) ?? []).slice(1))],
                items: [{ name: '', quote: '' }, ...(((section.data?.items as unknown[]) ?? []).slice(1))],
              },
            };
          }
          if (section.type === 'marqueeBand') {
            return { ...section, data: { ...section.data, items: [] } };
          }
          return section;
        }),
      },
    },
  };
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('CMS V2 demo fill audit OK - 24 combos x 5 pages have no empty contracted admin fields.');
