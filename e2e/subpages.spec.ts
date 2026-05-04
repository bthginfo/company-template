import { test, expect } from '@playwright/test';
import { getBranchConfig } from '../src/lib/branch-config';
import { TEMPLATES, STYLES, contentFor, mockTenantContent } from './fixtures';

const BRANCH_PATH_KEYS = ['services', 'gallery', 'about', 'contact'] as const;

/** Same for every template — wired in `TemplateApp` / `ExtraBranchTemplate`. */
const SHARED_EXTRA_PATHS = ['/news', '/news/saisonkarte-fruehling', '/impressum', '/datenschutz'] as const;

function allSubpageUrls(tpl: Parameters<typeof getBranchConfig>[0]): string[] {
  const { paths } = getBranchConfig(tpl);
  const branchUrls = BRANCH_PATH_KEYS.map((k) => paths[k]);
  return [...branchUrls, ...SHARED_EXTRA_PATHS];
}

for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    test(`Unterseiten & Rechtliches & News laden (${tpl} / ${style})`, async ({ page }) => {
      const content = contentFor(tpl);
      const brand = content.brand.name;
      await mockTenantContent(page, tpl, style);

      for (const url of allSubpageUrls(tpl)) {
        await test.step(url, async () => {
          await page.goto(url);
          await expect(
            page.getByText('Inhalt konnte nicht geladen werden.', { exact: true }),
          ).toHaveCount(0);
          await expect(page.locator('body')).toContainText(brand, { timeout: 25_000 });
        });
      }
    });
  }
}
