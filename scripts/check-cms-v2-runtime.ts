import { defaultsFor } from '../src/lib/provision-core';
import { getCmsAddableSectionTypes, type CmsPageKey } from '../src/lib/cms-contract';
import { SiteContentSchema, type ModularSectionV2, type SiteContent, type TemplateKey } from '../src/lib/types';
import type { TemplateStyle } from '../src/lib/branch-config';

const TEMPLATES: TemplateKey[] = ['restaurant', 'hotel', 'tourism', 'salon', 'tradesman', 'consulting', 'medical', 'fitness'];
const STYLES: TemplateStyle[] = ['classic', 'modern', 'bold'];
const PAGES: CmsPageKey[] = ['home', 'services', 'gallery', 'about', 'contact'];

const errors: string[] = [];

function cloneContent(content: SiteContent): SiteContent {
  return SiteContentSchema.parse(structuredClone(content));
}

function sections(content: SiteContent, page: CmsPageKey): ModularSectionV2[] {
  return content.modularPagesV2?.[page]?.sections ?? [];
}

function setSections(content: SiteContent, page: CmsPageKey, nextSections: ModularSectionV2[]): SiteContent {
  return SiteContentSchema.parse({
    ...content,
    modularPagesV2: {
      ...content.modularPagesV2,
      [page]: { sections: nextSections },
    },
  });
}

function fingerprintOtherPages(content: SiteContent, page: CmsPageKey): string {
  return JSON.stringify(PAGES.filter((p) => p !== page).map((p) => [p, sections(content, p)]));
}

for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    const content = defaultsFor(tpl, `QA ${tpl}`, undefined, style);
    const combo = content.modularPagesV2?.combo;
    if (content.cmsV2?.enabled !== true) errors.push(`${tpl}/${style}: cmsV2.enabled is not true`);
    if (combo?.template !== tpl || combo.style !== style) errors.push(`${tpl}/${style}: modularPagesV2 combo mismatch`);

    const allIds = new Set<string>();
    for (const page of PAGES) {
      const pageSections = sections(content, page);
      if (!pageSections.length) errors.push(`${tpl}/${style}/${page}: no V2 sections`);
      for (const section of pageSections) {
        const scoped = `${page}:${section.id}`;
        if (allIds.has(scoped)) errors.push(`${tpl}/${style}/${page}: duplicate section id ${section.id}`);
        allIds.add(scoped);
      }

      const beforeOther = fingerprintOtherPages(content, page);
      const first = pageSections[0];
      if (!first) continue;

      const edited = setSections(
        cloneContent(content),
        page,
        pageSections.map((section) =>
          section.id === first.id
            ? { ...section, visible: false, data: { ...(section.data ?? {}), __runtimeAudit: `${tpl}/${style}/${page}` } }
            : section,
        ),
      );
      if (fingerprintOtherPages(edited, page) !== beforeOther) {
        errors.push(`${tpl}/${style}/${page}: editing one page changed another page`);
      }
      const editedSection = sections(edited, page).find((section) => section.id === first.id);
      if (editedSection?.visible !== false || editedSection.data?.__runtimeAudit !== `${tpl}/${style}/${page}`) {
        errors.push(`${tpl}/${style}/${page}: edit/visibility simulation did not persist on target section`);
      }

      const addable = getCmsAddableSectionTypes(tpl, style, page, pageSections.map((section) => section.type));
      if (addable.length) {
        const type = addable[0];
        const added = setSections(cloneContent(content), page, [
          ...pageSections,
          { id: `${page}-${type}-runtime-audit`, type, visible: false, data: {} },
        ]);
        if (fingerprintOtherPages(added, page) !== beforeOther) {
          errors.push(`${tpl}/${style}/${page}: adding one section changed another page`);
        }
        const addedSection = sections(added, page).find((section) => section.id === `${page}-${type}-runtime-audit`);
        if (!addedSection || addedSection.visible !== false) {
          errors.push(`${tpl}/${style}/${page}: added section did not start hidden`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error(`\nCMS V2 runtime audit FAILED (${errors.length} issues):\n`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`CMS V2 runtime audit OK - ${TEMPLATES.length * STYLES.length} combos x ${PAGES.length} pages.`);
