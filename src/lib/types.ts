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
  mail: z.record(z.unknown()).optional(),
  navigation: z.record(z.unknown()).optional(),
  legal: z.record(z.unknown()).optional(),
  security: z.record(z.unknown()).optional(),
}).passthrough();

export type SiteContent = z.infer<typeof SiteContentSchema>;
