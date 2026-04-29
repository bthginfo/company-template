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
    /** When true and a logo is uploaded, hides the brand name text next to the logo (logo only). */
    hideName: z.boolean().optional().default(false),
    /** Selected preset id (matches PRESETS[template][n].id). When set, overrides primaryColor at runtime via applyTheme(). */
    themePresetId: z.string().optional().default(''),
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
    /** Schema.org priceRange ($, $$, $$$, $$$$ or e.g. "€10–25"). */
    priceRange: z.string().optional().default(''),
    /** Restaurants only: cuisine label used in JSON-LD `servesCuisine`. */
    cuisine: z.string().optional().default(''),
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
    /** Eyebrow of the gallery teaser section on the home page. */
    galleryTeaserEyebrow: z.string().optional().default(''),
    /** Eyebrow of the about teaser section on the home page (modern style). */
    aboutTeaserEyebrow: z.string().optional().default(''),
    /** FAQ section eyebrow + title (used on home + services page). */
    faqEyebrow: z.string().optional().default(''),
    faqTitle: z.string().optional().default(''),
    /** Label of the "learn more" button on the about teaser. */
    learnMoreLabel: z.string().optional().default(''),
    /** Label of the "view all" button on the gallery teaser. */
    galleryAllLabel: z.string().optional().default(''),
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
    /** Eyebrow + title for the news/blog teaser block on the home page. */
    newsEyebrow: z.string().optional().default(''),
    newsTitle: z.string().optional().default(''),
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

  /* ─── BRANCH-SPECIFIC MODULES ─────────────────────────────────────
   * Each block below maps to a dedicated visual module rendered only
   * for the matching branch (or a small set of branches). All optional;
   * empty arrays/objects mean the module is hidden for that tenant.
   */

  /** Restaurant — categorised menu (Speisekarte mit Kategorien & Allergenen). */
  menu: z.array(z.object({
    category: z.string().default(''),
    description: z.string().optional().default(''),
    /** Optional column header for prices, e.g. "Achterl | Flasche" or "0,33 l | 1,0 l". */
    priceLabel: z.string().optional().default(''),
    items: z.array(z.object({
      name: z.string().default(''),
      description: z.string().optional().default(''),
      price: z.string().optional().default(''),
      allergens: z.string().optional().default(''),
      tags: z.array(z.string()).optional().default([]),
      imageUrl: z.string().optional().default(''),
    })).default([]),
  })).optional().default([]),

  /** Hotel — Zimmer-Showcase with features. */
  rooms: z.array(z.object({
    name: z.string().default(''),
    description: z.string().optional().default(''),
    size: z.string().optional().default(''),
    beds: z.string().optional().default(''),
    price: z.string().optional().default(''),
    imageUrl: z.string().optional().default(''),
    features: z.array(z.string()).optional().default([]),
  })).optional().default([]),

  /** Tourism — Tour-Cards with difficulty level. */
  tours: z.array(z.object({
    name: z.string().default(''),
    description: z.string().optional().default(''),
    duration: z.string().optional().default(''),
    level: z.string().optional().default(''), // "1/4 leicht" etc.
    groupSize: z.string().optional().default(''),
    price: z.string().optional().default(''),
    imageUrl: z.string().optional().default(''),
    languages: z.array(z.string()).optional().default([]),
  })).optional().default([]),

  /** Salon — Treatment list with duration + price. */
  treatments: z.array(z.object({
    name: z.string().default(''),
    description: z.string().optional().default(''),
    duration: z.string().optional().default(''),
    price: z.string().optional().default(''),
    category: z.string().optional().default(''),
  })).optional().default([]),

  /** Fitness — courses & schedule. */
  courses: z.array(z.object({
    name: z.string().default(''),
    description: z.string().optional().default(''),
    schedule: z.string().optional().default(''), // "Mo 18:00 · Mi 19:30"
    level: z.string().optional().default(''),
    duration: z.string().optional().default(''),
    trainer: z.string().optional().default(''),
    price: z.string().optional().default(''),
  })).optional().default([]),

  /** Fitness/Consulting — Pricing packages (3-tier compare). */
  packages: z.array(z.object({
    name: z.string().default(''),
    price: z.string().default(''),
    period: z.string().optional().default(''), // "/ Monat"
    description: z.string().optional().default(''),
    features: z.array(z.string()).optional().default([]),
    highlight: z.boolean().optional().default(false),
    ctaLabel: z.string().optional().default(''),
    ctaHref: z.string().optional().default(''),
  })).optional().default([]),

  /** Consulting — process / engagement steps. */
  processSteps: z.array(z.object({
    title: z.string().default(''),
    description: z.string().optional().default(''),
    duration: z.string().optional().default(''),
  })).optional().default([]),

  /** Medical — doctors / specialists. */
  doctors: z.array(z.object({
    name: z.string().default(''),
    role: z.string().optional().default(''),
    specialty: z.string().optional().default(''),
    imageUrl: z.string().optional().default(''),
    bio: z.string().optional().default(''),
  })).optional().default([]),

  /** Medical — online booking (Doctolib / jameda etc.) */
  booking: z.object({
    enabled: z.boolean().optional().default(false),
    provider: z.string().optional().default(''), // "Doctolib", "jameda", "TIMIFY"
    url: z.string().optional().default(''),
    embedUrl: z.string().optional().default(''),
    note: z.string().optional().default(''),
  }).optional().default({}),

  /** Tradesman — funding/grants list. */
  fundingItems: z.array(z.object({
    title: z.string().default(''),
    description: z.string().optional().default(''),
    percent: z.string().optional().default(''), // "35 %"
    program: z.string().optional().default(''), // "KfW 458"
  })).optional().default([]),

  /** Tradesman — sticky emergency banner. */
  emergencyBanner: z.object({
    enabled: z.boolean().optional().default(false),
    text: z.string().optional().default(''),
    phone: z.string().optional().default(''),
    sticky: z.boolean().optional().default(true),
  }).optional().default({}),

  /**
   * Per-tenant mail settings — when present the contact form submits to
   * the tenant's own SMTP account instead of the platform default.
   * Password is stored opaquely. Empty fields fall back to env vars.
   */
  mail: z.object({
    enabled: z.boolean().optional().default(false),
    host: z.string().optional().default(''),
    port: z.number().int().optional().default(587),
    user: z.string().optional().default(''),
    pass: z.string().optional().default(''),
    from: z.string().optional().default(''),
    to: z.string().optional().default(''),
    autoReply: z.boolean().optional().default(true),
  }).optional().default({}),

  /**
   * Per-section visibility. Keys are namespaced by page:
   *   home.<key>      → home page sections (action, signature, services, …)
   *   services.<key>  → services / Speisekarte page
   *   gallery.<key>   → gallery page
   *   about.<key>     → about page
   *   contact.<key>   → contact page
   * Legacy unprefixed keys (action, services, …) are still respected on the home
   * page for backward-compatibility. Default: visible (true).
   */
  sectionVisibility: z.record(z.boolean()).optional().default({}),

  /**
   * Per-page section ordering. Keys are page ids ('home' | 'services' |
   * 'gallery' | 'about' | 'contact') and values are arrays of section keys
   * (without the page prefix) in the desired order. When a page id is
   * missing the template falls back to the hardcoded default flow for the
   * (variant, style) combination.
   */
  sectionOrder: z.record(z.array(z.string())).optional().default({}),
}).passthrough();
// `.passthrough()` keeps any extra admin-saved fields (announcements, values,
// team, faq, highlights, process, certifications, press, etc.) intact — the
// admin editor already persists them, and templates read them via
// `(content as any).field ?? hardcodedDefault`.

export type SiteContent = z.infer<typeof SiteContentSchema>;

export type TemplateKey = 'restaurant' | 'hotel' | 'tourism' | 'salon' | 'tradesman' | 'consulting' | 'medical' | 'fitness';
export type PageId = 'home' | 'services' | 'gallery' | 'about' | 'contactPage';
