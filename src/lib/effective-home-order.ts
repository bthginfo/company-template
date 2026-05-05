/**
 * Single source for which home section *slots* are in play for a tenant,
 * matching `TemplateApp` (core five) and `ExtraBranchTemplate` (extras).
 * Used by the modular admin so editors only surface blocks that map to the live layout.
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { isExtraBranch } from '@/lib/branch-config';
import { isSectionEnabled, getCatalogForVariant } from '@/lib/page-layout';
import { BRANCH_STYLE_ORDER } from '@/lib/template-orders';

/**
 * Ordered home section keys after `sectionOrder.home` override and `sectionVisibility` flags.
 * Mirrors `HomePageClassic` / `HomePageModern` / `HomePageBold` and extra-branch home layouts.
 */
export function getEffectiveHomeSectionKeys(
  content: SiteContent,
  variant: TemplateKey,
  style: TemplateStyle,
): string[] {
  const custom = ((content as { sectionOrder?: { home?: string[] } }).sectionOrder ?? {}).home;

  if (isExtraBranch(variant)) {
    const defaults = [...(BRANCH_STYLE_ORDER[variant][style] ?? BRANCH_STYLE_ORDER.consulting.classic)];
    const catalogKeys = getCatalogForVariant('home', variant, style).map((s) => s.key);
    const allowed = new Set([...defaults, ...catalogKeys]);
    const base = Array.isArray(custom) && custom.length ? custom.filter((k) => allowed.has(k)) : defaults;
    return base.filter((k) => isSectionEnabled(content, 'home', k));
  }

  const defaults = BRANCH_STYLE_ORDER[variant][style];
  const base = Array.isArray(custom) && custom.length ? custom : [...defaults];
  return base.filter((k) => isSectionEnabled(content, 'home', k));
}
