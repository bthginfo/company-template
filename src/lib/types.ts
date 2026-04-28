import { z } from 'zod';

/**
 * Shared content shape. Every template renders from a SiteContent object.
 * Keep new fields optional so old tenants don't break when we extend the schema.
 */
export const SiteContentSchema = z.object({
  brand: z.object({
    name: z.string(),
    tagline: z.string().optional().default(''),
    logoUrl: z.string().url().optional().or(z.literal('')).default(''),
    primaryColor: z.string().default('#0f172a'),
  }),
  hero: z.object({
    title: z.string(),
    subtitle: z.string().optional().default(''),
    body: z.string().optional().default(''),
    imageUrl: z.string().url().optional().or(z.literal('')).default(''),
    ctaLabel: z.string().optional().default(''),
    ctaHref: z.string().optional().default('#kontakt'),
  }),
  about: z.object({
    title: z.string().optional().default('Über uns'),
    body: z.string().optional().default(''),
    imageUrl: z.string().url().optional().or(z.literal('')).default(''),
  }).optional(),
  services: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional().default(''),
      price: z.string().optional().default(''),
      imageUrl: z.string().url().optional().or(z.literal('')).default(''),
    })
  ).default([]),
  gallery: z.array(z.string().url()).default([]),
  testimonials: z.array(
    z.object({
      author: z.string(),
      text: z.string(),
    })
  ).default([]),
  contact: z.object({
    phone: z.string().optional().default(''),
    email: z.string().optional().default(''),
    address: z.string().optional().default(''),
    city: z.string().optional().default(''),
    hours: z.array(
      z.object({ day: z.string(), time: z.string() })
    ).default([]),
    mapsUrl: z.string().optional().default(''),
  }),
  social: z.object({
    instagram: z.string().optional().default(''),
    facebook: z.string().optional().default(''),
    whatsapp: z.string().optional().default(''),
  }).optional(),

  // SEO — global defaults plus per-page overrides. AI/search-engine friendly metadata
  // is rendered by the Seo component and the structured-data injector.
  seo: z.object({
    title: z.string().optional().default(''),
    description: z.string().optional().default(''),
    keywords: z.string().optional().default(''),
    ogImage: z.string().optional().default(''),
    canonical: z.string().optional().default(''),
    twitter: z.string().optional().default(''),
    locale: z.string().optional().default('de_AT'),
    /** OpenAPI-style structured-data overrides (geo, founding date, currency …) */
    extra: z.record(z.string()).optional().default({}),
  }).optional(),

  /** Per-page SEO overrides keyed by page id (home/services/gallery/about/contactPage). */
  pageSeo: z.record(z.object({
    title: z.string().optional().default(''),
    description: z.string().optional().default(''),
    keywords: z.string().optional().default(''),
    ogImage: z.string().optional().default(''),
    noindex: z.boolean().optional().default(false),
  })).optional(),

  /**
   * Custom scripts (analytics, pixels, chat widgets) — gated by cookie consent.
   * Each script is only injected after the visitor consents to its category.
   * `code` may be either an inline snippet ("console.log('hi')") or an external URL.
   */
  customScripts: z.array(z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['necessary', 'analytics', 'marketing', 'functional']).default('analytics'),
    /** Inline JS code OR full external URL (https://…/script.js). */
    code: z.string().default(''),
    enabled: z.boolean().default(true),
    placement: z.enum(['head', 'body']).default('head'),
  })).optional().default([]),

  /** Story/Timeline entries shown on the About page. */
  timeline: z.array(z.object({
    year: z.string().default(''),
    title: z.string().default(''),
    description: z.string().default(''),
  })).optional().default([]),

  /**
   * News / Blog posts. Latest entries are shown on the home page; full
   * archive lives at /news with detail pages at /news/:slug.
   * `body` is plain text — paragraphs are rendered by splitting on blank lines.
   */
  posts: z.array(z.object({
    id: z.string(),
    title: z.string().default(''),
    slug: z.string().default(''),
    date: z.string().default(''),
    excerpt: z.string().default(''),
    body: z.string().default(''),
    /** Rich-text HTML version of the body. When present, takes precedence over `body`. Sanitised at render time. */
    bodyHtml: z.string().optional().default(''),
    imageUrl: z.string().optional().default(''),
    published: z.boolean().default(true),
  })).optional().default([]),

  /**
   * Branch-text overrides – override hardcoded copy that previously lived inside the
   * template. Each field is optional; if missing or empty the template falls back
   * to the shipped default for that variant/style combination.
   */
  branchText: z.object({
    /** Words shown in the home-page marquee strip. */
    marqueeWords: z.array(z.string()).optional().default([]),
    /** Title of the gallery teaser section on the home page. Plain string – the template wraps the last word in italic-pop. */
    galleryTeaserTitle: z.string().optional().default(''),
    /** Subtitle / description text used as fallback below hero + above services. */
    teaserSubtitle: z.string().optional().default(''),
    /** Eyebrow + headline of the testimonials block. */
    testimonialsEyebrow: z.string().optional().default(''),
    testimonialsTitle: z.string().optional().default(''),
    /** "Manifest" block (Bold style only). */
    manifestEyebrow: z.string().optional().default(''),
    manifestTitle: z.string().optional().default(''),
    /** Eyebrow + lead used by the soft CTA at the bottom of the modern home. */
    softCtaEyebrow: z.string().optional().default(''),
    softCtaTitle: z.string().optional().default(''),
    softCtaText: z.string().optional().default(''),
    softCtaButton: z.string().optional().default(''),
  }).optional().default({}),

  /**
   * Navigation – per-tenant menu. When omitted/empty the template falls back
   * to NAV_BY_VARIANT defaults. Each item: label + path + visible flag.
   * The `path` should match an existing template route (/, /speisekarte,
   * /leistungen, /galerie, /ueber-uns, /kontakt, /news).
   */
  navItems: z.array(z.object({
    label: z.string().default(''),
    path: z.string().default('/'),
    visible: z.boolean().default(true),
  })).optional().default([]),

  /**
   * Footer column links and tagline overrides.
   */
  footer: z.object({
    tagline: z.string().optional().default(''),
    columns: z.array(z.object({
      title: z.string().default(''),
      links: z.array(z.object({
        label: z.string().default(''),
        href: z.string().default(''),
      })).default([]),
    })).optional().default([]),
  }).optional().default({}),

  /**
   * Hero CTA overrides – primary + secondary button labels and links shown
   * in the home-page hero. When fields are empty the template uses defaults.
   */
  heroCta: z.object({
    primaryLabel: z.string().optional().default(''),
    primaryHref: z.string().optional().default(''),
    secondaryLabel: z.string().optional().default(''),
    secondaryHref: z.string().optional().default(''),
  }).optional().default({}),

  /**
   * Bottom CTA-band overrides shown above footer (lead/sub/button).
   */
  ctaBandOverride: z.object({
    lead: z.string().optional().default(''),
    sub: z.string().optional().default(''),
    cta: z.string().optional().default(''),
    ctaHref: z.string().optional().default(''),
  }).optional().default({}),
});

export type SiteContent = z.infer<typeof SiteContentSchema>;

export type TemplateKey = 'restaurant' | 'hotel' | 'tourism' | 'salon' | 'tradesman' | 'consulting' | 'medical' | 'fitness';
export type PageId = 'home' | 'services' | 'gallery' | 'about' | 'contactPage';
