/**
 * Default frontend section orders for the home page, per (template, style).
 *
 * All eight branches (`TemplateKey`) share this table. The renderer in
 * `TemplateApp.tsx` (core five) and `_shared/extra/ExtraBranchTemplate.tsx`
 * (consulting / medical / fitness) read from here unless the tenant set
 * `content.sectionOrder.home`.
 *
 * The drift-coverage script imports the same data so admin home order stays
 * aligned with the live site.
 */

import type { TemplateKey } from './types';

export type CoreVariant = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism';
export type Style = 'classic' | 'modern' | 'bold';

/**
 * BRANCH_STYLE_ORDER — 8 branches × 3 styles = 24 default home flows.
 * Each (template, style) may differ; tenants override via `sectionOrder.home`.
 */
export const BRANCH_STYLE_ORDER: Record<TemplateKey, Record<Style, readonly string[]>> = {
  restaurant: {
    classic: ['action', 'signature', 'about', 'gallery', 'logos', 'numbers', 'testimonials', 'news'],
    modern:  ['action', 'services', 'signature', 'about', 'gallery', 'logos', 'testimonials', 'numbers', 'news'],
    bold:    ['action', 'signature', 'numbers', 'gallery', 'about', 'testimonials', 'news'],
  },
  hotel: {
    classic: ['action', 'signature', 'about', 'gallery', 'testimonials', 'numbers', 'news'],
    modern:  ['action', 'gallery', 'logos', 'signature', 'about', 'numbers', 'testimonials', 'news'],
    bold:    ['action', 'gallery', 'signature', 'numbers', 'about', 'testimonials', 'news'],
  },
  tradesman: {
    classic: ['action', 'services', 'funding', 'numbers', 'gallery', 'signature', 'testimonials', 'about', 'news'],
    modern:  ['action', 'numbers', 'services', 'funding', 'signature', 'gallery', 'logos', 'about', 'testimonials', 'news'],
    bold:    ['action', 'services', 'funding', 'signature', 'gallery', 'numbers', 'about', 'testimonials', 'news'],
  },
  salon: {
    classic: ['action', 'signature', 'gallery', 'about', 'testimonials', 'numbers', 'news'],
    modern:  ['action', 'signature', 'gallery', 'logos', 'testimonials', 'about', 'numbers', 'news'],
    bold:    ['action', 'gallery', 'signature', 'about', 'numbers', 'testimonials', 'news'],
  },
  tourism: {
    classic: ['action', 'gallery', 'signature', 'about', 'testimonials', 'numbers', 'news'],
    modern:  ['action', 'signature', 'gallery', 'logos', 'numbers', 'about', 'testimonials', 'news'],
    bold:    ['action', 'gallery', 'numbers', 'signature', 'about', 'testimonials', 'news'],
  },
  consulting: {
    classic: ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    modern:  ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    bold:    ['chips', 'marquee', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
  },
  medical: {
    classic: ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    modern:  ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    bold:    ['chips', 'marquee', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
  },
  fitness: {
    classic: ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    modern:  ['chips', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
    bold:    ['chips', 'marquee', 'about', 'services', 'spotlight', 'branchModules', 'team', 'gallery', 'testimonials', 'news', 'contact'],
  },
};
