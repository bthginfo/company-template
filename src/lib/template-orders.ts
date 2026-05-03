/**
 * Default frontend section orders for the home page, per (variant, style).
 *
 * Two surfaces share these:
 *  - the renderer in `src/templates/_shared/TemplateApp.tsx` for core 5 branches
 *  - the renderer in `src/templates/extra/index.tsx` for extras (uses
 *    `EXTRA_HOME_ORDER` exported from `src/lib/page-layout.ts`)
 *
 * The drift-coverage script in `scripts/check-coverage.ts` imports the same
 * data from here so the test can compare admin section orders against the
 * frontend's truth without re-typing the table.
 */

export type CoreVariant = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism';
export type Style = 'classic' | 'modern' | 'bold';

/**
 * BRANCH_STYLE_ORDER — full 5×3 = 15 distinct section flows for core branches.
 * Each (variant, style) tells a different narrative arc, so Restaurant/Classic
 * does NOT look like Restaurant/Modern, and Hotel/Bold does NOT look like
 * Hotel/Classic. The frontend renders `BRANCH_STYLE_ORDER[variant][style]`
 * unless the tenant has set a custom `content.sectionOrder.home`.
 */
export const BRANCH_STYLE_ORDER: Record<CoreVariant, Record<Style, readonly string[]>> = {
  restaurant: {
    classic: ['action', 'signature', 'about', 'gallery', 'numbers', 'testimonials', 'news'],
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
};
