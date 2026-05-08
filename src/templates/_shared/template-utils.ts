import type { SiteContent, TemplateKey } from '@/lib/types';
import { branchTextDefaults } from '@/lib/branch-text-defaults';

/** Parse a number string like "1.200+" into { v: 1200, s: "+" }. Shared by NumbersBand and ExtraHomeNumbersBand. */
export function parseNumberValue(raw: string): { v: number; s?: string; raw?: boolean } {
  const m = String(raw).match(/^(-?\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return { v: 0, s: String(raw), raw: true };
  const [, num, rest] = m;
  const hasComma = num.includes(',');
  const hasDot = num.includes('.');
  const intPart = hasComma ? num.split(',')[0] : hasDot ? num.split('.')[0] : num;
  const frac = hasComma ? ',' + num.split(',')[1] : hasDot ? '.' + num.split('.')[1] : '';
  const suffix = (frac || '') + (rest || '');
  return { v: Number(intPart) || 0, s: suffix || undefined };
}

/** Pull a per-page header override from content extras (set by admin's PageHeaderEditor). */
export function pageHeaderOverride(
  content: SiteContent,
  key: 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader' | 'newsHeader',
): { eyebrow: string; title: string; subtitle: string; heroStyle?: string } | null {
  const v = (content as any)[key];
  if (!v || typeof v !== 'object') return null;
  return { eyebrow: String(v.eyebrow || ''), title: String(v.title || ''), subtitle: String(v.subtitle || ''), heroStyle: v.heroStyle || undefined };
}

/** Returns a merged branch-text record (per-tenant overrides + branch defaults). */
export function effectiveBranchText(variant: TemplateKey, content?: SiteContent) {
  const overrides = ((content as any)?.branchText ?? {}) as Record<string, any>;
  const def = branchTextDefaults(variant);
  return {
    ...def,
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, val]) => {
        if (Array.isArray(val)) return val.length > 0;
        return typeof val === 'string' ? val.trim().length > 0 : val != null;
      }),
    ),
  } as ReturnType<typeof branchTextDefaults>;
}
