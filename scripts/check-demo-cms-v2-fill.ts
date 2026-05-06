import { getCmsSectionFieldKeys, type CmsPageKey } from '../src/lib/cms-contract';
import { defaultsFor } from '../src/lib/provision-core';
import type { TemplateStyle } from '../src/lib/branch-config';
import type { TemplateKey } from '../src/lib/types';

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
    for (const page of PAGES) {
      const sections = content.modularPagesV2?.[page]?.sections ?? [];
      for (const section of sections) {
        const data = (section.data ?? {}) as Record<string, unknown>;
        const emptyFields = getCmsSectionFieldKeys(section.type).filter((field) => !hasMeaningfulValue(valueAtPath(data, field)));
        if (emptyFields.length) {
          errors.push(`${template}/${style}/${page}/${section.type}: empty demo admin fields: ${emptyFields.join(', ')}`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('CMS V2 demo fill audit OK - 24 combos x 5 pages have no empty contracted admin fields.');
