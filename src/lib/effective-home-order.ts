/**
 * Home layout slot order for tenants (core five + extras).
 *
 * `getEffectiveHomeSectionKeys` matches the live site: order + `sectionVisibility`.
 * `getHomeLayoutSlotKeys` is the same order **without** visibility filtering — used
 * by the modular admin so blocks like the Aktionsleiste stay editable after a
 * tenant hides the slot (otherwise the „Sichtbar“ toggle would disappear).
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { isExtraBranch } from '@/lib/branch-config';
import { isSectionEnabled, getCatalogForVariant } from '@/lib/page-layout';
import { BRANCH_STYLE_ORDER } from '@/lib/template-orders';

/**
 * Home slot keys from `sectionOrder.home` (or branch defaults), without
 * `sectionVisibility`. For modular admin slot ↔ block mapping only.
 */
export function getHomeLayoutSlotKeys(
  content: SiteContent,
  variant: TemplateKey,
  style: TemplateStyle,
): string[] {
  const custom = ((content as { sectionOrder?: { home?: string[] } }).sectionOrder ?? {}).home;

  if (isExtraBranch(variant)) {
    const defaults = [...(BRANCH_STYLE_ORDER[variant][style] ?? BRANCH_STYLE_ORDER.consulting.classic)];
    const catalogKeys = getCatalogForVariant('home', variant, style).map((s) => s.key);
    const allowed = new Set([...defaults, ...catalogKeys]);
    return Array.isArray(custom) && custom.length ? custom.filter((k) => allowed.has(k)) : defaults;
  }

  const defaults = BRANCH_STYLE_ORDER[variant][style];
  return Array.isArray(custom) && custom.length ? custom : [...defaults];
}

/**
 * Ordered home section keys after `sectionOrder.home` override and `sectionVisibility` flags.
 * Mirrors `HomePageClassic` / `HomePageModern` / `HomePageBold` and extra-branch home layouts.
 */
export function getEffectiveHomeSectionKeys(
  content: SiteContent,
  variant: TemplateKey,
  style: TemplateStyle,
): string[] {
  return getHomeLayoutSlotKeys(content, variant, style).filter((k) => isSectionEnabled(content, 'home', k));
}
