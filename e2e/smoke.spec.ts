import { test, expect } from '@playwright/test';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from '../src/lib/demo-content';
import type { TemplateKey } from '../src/lib/types';
import type { TemplateStyle } from '../src/lib/branch-config';

const TEMPLATES: TemplateKey[] = [
  'restaurant',
  'salon',
  'tradesman',
  'hotel',
  'tourism',
  'consulting',
  'medical',
  'fitness',
];

const STYLES: TemplateStyle[] = ['classic', 'modern', 'bold'];

function contentFor(tpl: TemplateKey) {
  if (tpl === 'consulting' || tpl === 'medical' || tpl === 'fitness') {
    return EXTRA_DEMO_CONTENT[tpl];
  }
  return DEMO_CONTENT[tpl];
}

for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    test(`Startseite lädt (${tpl} / ${style})`, async ({ page }) => {
      const content = contentFor(tpl);
      const brand = content.brand.name;

      await page.route('**/api/content**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            tenant: { slug: 'e2e-smoke', name: 'E2E Smoke', template: tpl, style },
            content,
            hasDraft: false,
          }),
        });
      });

      await page.goto('/');

      await expect(page.getByText('Inhalt konnte nicht geladen werden.', { exact: true })).toHaveCount(0);

      const body = page.locator('body');
      await expect(body).toContainText(brand, { timeout: 25_000 });
    });
  }
}
