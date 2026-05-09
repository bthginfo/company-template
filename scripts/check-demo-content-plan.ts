import { CMS_PAGE_KEYS, getCmsSectionFieldKeys, getCmsSectionTypes, type CmsPageKey } from '../src/lib/cms-contract';
import { normalizeSiteContentCmsV2 } from '../src/lib/cms-v2-hydration';
import { applyDemoContentPlan } from '../src/lib/demo-content-plan';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from '../src/lib/demo-content';
import { DEMO_CONTENT_PLAN } from '../src/lib/demo-content-plan.generated';
import type { TemplateStyle } from '../src/lib/branch-config';
import { SiteContentSchema, type SiteContent, type TemplateKey } from '../src/lib/types';

const TEMPLATES: TemplateKey[] = ['restaurant', 'hotel', 'tourism', 'salon', 'tradesman', 'consulting', 'medical', 'fitness', 'wedding'];
const STYLES: TemplateStyle[] = ['classic', 'modern', 'bold'];
const errors: string[] = [];

function hasMeaningfulValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0 && !value.includes('ANWEISUNG:');
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.some(hasMeaningfulValue);
  if (typeof value === 'object') return Object.values(value as Record<string, unknown>).some(hasMeaningfulValue);
  return true;
}

function valueAtPath(root: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => (
    current && typeof current === 'object' && !Array.isArray(current)
      ? (current as Record<string, unknown>)[key]
      : undefined
  ), root);
}

function baseFor(template: TemplateKey): SiteContent {
  if (template === 'restaurant' || template === 'salon' || template === 'tradesman' || template === 'hotel' || template === 'tourism') {
    return DEMO_CONTENT[template];
  }
  return EXTRA_DEMO_CONTENT[template];
}

for (const template of TEMPLATES) {
  for (const style of STYLES) {
    const entry = DEMO_CONTENT_PLAN[template]?.[style];
    if (!entry) {
      errors.push(`${template}/${style}: missing content plan entry`);
      continue;
    }
    if (!hasMeaningfulValue(entry.brandName)) {
      errors.push(`${template}/${style}: missing brandName`);
    }

    for (const page of CMS_PAGE_KEYS) {
      const expectedTypes = getCmsSectionTypes(template, style, page);
      const plannedTypes = (entry.pages[page] ?? []).map((section) => section.type);
      if (expectedTypes.join('|') !== plannedTypes.join('|')) {
        errors.push(`${template}/${style}/${page}: content plan sections differ from CMS contract. expected=${expectedTypes.join(',')} planned=${plannedTypes.join(',')}`);
      }
    }

    const normalized = normalizeSiteContentCmsV2(SiteContentSchema.parse(structuredClone(baseFor(template))), template, style, 'legacy');
    const content = applyDemoContentPlan(normalized, template, style);
    for (const page of CMS_PAGE_KEYS) {
      assertPage(content, template, style, page);
    }
  }
}

function assertPage(content: SiteContent, template: TemplateKey, style: TemplateStyle, page: CmsPageKey): void {
  const sections = content.modularPagesV2?.[page]?.sections ?? [];
  for (const section of sections) {
    const data = (section.data ?? {}) as Record<string, unknown>;
    const emptyFields = getCmsSectionFieldKeys(section.type).filter((field) => !hasMeaningfulValue(valueAtPath(data, field)));
    if (emptyFields.length) {
      errors.push(`${template}/${style}/${page}/${section.type}: empty planned fields: ${emptyFields.join(', ')}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`Demo content plan audit failed — ${errors.length} issues.`);
  process.exit(1);
}

console.log(`Demo content plan audit OK — ${TEMPLATES.length * STYLES.length} combos × ${CMS_PAGE_KEYS.length} pages.`);
