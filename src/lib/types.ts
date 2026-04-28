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
});

export type SiteContent = z.infer<typeof SiteContentSchema>;

export type TemplateKey = 'restaurant' | 'hotel' | 'tourism' | 'salon' | 'tradesman' | 'consulting' | 'medical' | 'fitness';
export type PageId = 'home' | 'services' | 'gallery' | 'about' | 'contactPage';
