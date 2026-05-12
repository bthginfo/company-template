import { z } from 'zod';

// ─── Core tenant types ────────────────────────────────────────────────────────

export const TEMPLATE_KEYS = ['restaurant', 'hotel', 'tourism', 'salon', 'tradesman', 'consulting', 'medical', 'fitness', 'wedding'] as const;
export const STYLE_KEYS = ['classic', 'modern', 'bold'] as const;

export type TemplateKey = typeof TEMPLATE_KEYS[number];
export type TemplateStyle = typeof STYLE_KEYS[number];

// ─── Theme ────────────────────────────────────────────────────────────────────

/** Tenant-owned named palette; referenced by `brand.themePresetId` as `custom:<id>`. */
export const TenantCustomThemeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  primary: z.string(),
  primaryFg: z.string(),
  accent: z.string(),
  accentFg: z.string().optional(),
  surface: z.string(),
  bg: z.string(),
  text: z.string(),
});
export type TenantCustomTheme = z.infer<typeof TenantCustomThemeSchema>;

// ─── Site Content ─────────────────────────────────────────────────────────────
// Minimal schema for the transition period. The full CMS content model is
// DB-driven (pages + sections tables). This type covers the globals that are
// still fetched as a JSON blob from /api/content during migration.

export const SiteContentSchema = z.object({
  brand: z.object({
    name: z.string().default(''),
    tagline: z.string().optional().default(''),
    logoUrl: z.string().optional().default(''),
    primaryColor: z.string().default('#0f172a'),
    hideName: z.boolean().optional().default(false),
    themePresetId: z.string().optional().default(''),
    customThemes: z.array(TenantCustomThemeSchema).optional().default([]),
  }),
  contact: z.object({
    phone: z.string().optional().default(''),
    email: z.string().optional().default(''),
    address: z.string().optional().default(''),
    city: z.string().optional().default(''),
    hours: z.array(z.object({ day: z.string(), time: z.string() })).default([]),
    mapsUrl: z.string().optional().default(''),
  }).optional(),
  social: z.object({
    instagram: z.string().optional().default(''),
    facebook: z.string().optional().default(''),
    whatsapp: z.string().optional().default(''),
    linkedin: z.string().optional().default(''),
    youtube: z.string().optional().default(''),
    tiktok: z.string().optional().default(''),
    x: z.string().optional().default(''),
  }).optional(),
  seo: z.object({
    title: z.string().optional().default(''),
    description: z.string().optional().default(''),
    keywords: z.string().optional().default(''),
    ogImage: z.string().optional().default(''),
    canonical: z.string().optional().default(''),
    locale: z.string().optional().default('de_AT'),
    priceRange: z.string().optional().default(''),
    cuisine: z.string().optional().default(''),
  }).optional(),
  pageSeo: z.record(z.object({
    title: z.string().optional().default(''),
    description: z.string().optional().default(''),
    keywords: z.string().optional().default(''),
    ogImage: z.string().optional().default(''),
    noindex: z.boolean().optional().default(false),
  })).optional(),
  customScripts: z.array(z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['necessary', 'analytics', 'marketing', 'functional']).default('analytics'),
    code: z.string().default(''),
    enabled: z.boolean().default(true),
    placement: z.enum(['head', 'body']).default('head'),
  })).optional().default([]),

  /**
   * Outbound mail configuration (SMTP).
   * Stored encrypted-at-rest in the DB; never returned to unauthenticated clients.
   * Used server-side only to notify the tenant about new form submissions.
   */
  mail: z.object({
    /** SMTP host e.g. smtp.resend.com */
    smtpHost: z.string().optional().default(''),
    smtpPort: z.number().optional().default(587),
    smtpUser: z.string().optional().default(''),
    /** Stored as plaintext here; encryption at-rest via Vercel env on server */
    smtpPass: z.string().optional().default(''),
    fromName: z.string().optional().default(''),
    fromEmail: z.string().optional().default(''),
    /** Recipient for form submission notifications */
    notifyEmail: z.string().optional().default(''),
    /** Which form types trigger an email notification */
    notifyOn: z.array(z.enum(['reservation', 'rsvp', 'quote-request', 'room-inquiry', 'training-signup', 'contact'])).optional().default([]),
  }).optional(),

  /**
   * Legal texts and Impressum data (AT/DE/CH compliant).
   * The Impressum-Generator assembles these into a ready-to-publish page.
   */
  legal: z.object({
    companyName: z.string().optional().default(''),
    companyForm: z.string().optional().default(''),         // e.g. 'GmbH', 'Einzelunternehmen'
    companyRegNumber: z.string().optional().default(''),    // Firmenbuchnummer (AT: FN 123456a)
    companyRegCourt: z.string().optional().default(''),     // Firmenbuchgericht
    vatId: z.string().optional().default(''),               // UID / USt-IdNr.
    address: z.string().optional().default(''),
    city: z.string().optional().default(''),
    country: z.string().optional().default('AT'),
    phone: z.string().optional().default(''),
    email: z.string().optional().default(''),
    /** Trade authority (Gewerbebehörde) */
    tradeAuthority: z.string().optional().default(''),
    /** Trade regulation (Gewerbeordnung) */
    tradeRegulation: z.string().optional().default('GewO 1994'),
    /** Professional association if applicable */
    professionalAssociation: z.string().optional().default(''),
    /** Name of person responsible for content (§ 5 ECG) */
    responsiblePerson: z.string().optional().default(''),
    /** Custom Datenschutz text override (if left empty, generic is used) */
    privacyText: z.string().optional().default(''),
    /** Custom Impressum text override (if left empty, generated from above fields) */
    impressumText: z.string().optional().default(''),
    /** AGB / Terms URL or text */
    termsUrl: z.string().optional().default(''),
  }).optional(),

  /**
   * Navigation overrides: custom link order or extra footer links.
   */
  navigation: z.object({
    /** Hide these page slugs from the main nav */
    hiddenFromNav: z.array(z.string()).optional().default([]),
    /** Extra footer-only links (e.g. Karriere, Presse) */
    footerLinks: z.array(z.object({
      label: z.string(),
      url: z.string(),
      external: z.boolean().optional().default(false),
    })).optional().default([]),
  }).optional(),

  /**
   * Security / hardening settings.
   */
  security: z.object({
    /** Max form submissions per IP per hour (0 = unlimited) */
    formRateLimit: z.number().optional().default(10),
    /** Whether to require hCaptcha on public forms */
    captchaEnabled: z.boolean().optional().default(false),
    captchaSiteKey: z.string().optional().default(''),
  }).optional(),
}).passthrough();

export type SiteContent = z.infer<typeof SiteContentSchema>;
