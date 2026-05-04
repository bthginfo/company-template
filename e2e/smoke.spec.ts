import { test, expect } from '@playwright/test';
import { TEMPLATES, STYLES, contentFor, mockTenantContent } from './fixtures';

for (const tpl of TEMPLATES) {
  for (const style of STYLES) {
    test(`Startseite lädt (${tpl} / ${style})`, async ({ page }) => {
      const content = contentFor(tpl);
      const brand = content.brand.name;

      await mockTenantContent(page, tpl, style);

      await page.goto('/');

      await expect(page.getByText('Inhalt konnte nicht geladen werden.', { exact: true })).toHaveCount(0);

      const body = page.locator('body');
      await expect(body).toContainText(brand, { timeout: 25_000 });
    });
  }
}
