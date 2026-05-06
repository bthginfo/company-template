import type { Page } from '@playwright/test';
import { defaultsFor } from '../src/lib/provision-core';
import type { TemplateKey } from '../src/lib/types';
import type { TemplateStyle } from '../src/lib/branch-config';

export const TEMPLATES: TemplateKey[] = [
  'restaurant',
  'salon',
  'tradesman',
  'hotel',
  'tourism',
  'consulting',
  'medical',
  'fitness',
];

export const STYLES: TemplateStyle[] = ['classic', 'modern', 'bold'];

export function contentFor(tpl: TemplateKey, style: TemplateStyle) {
  return defaultsFor(tpl, `E2E ${tpl}`, undefined, style);
}

/** Mock GET /api/content for any slug — matches smoke + subpage tests. */
export async function mockTenantContent(page: Page, tpl: TemplateKey, style: TemplateStyle) {
  const content = contentFor(tpl, style);
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
}
