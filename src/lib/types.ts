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
});

export type SiteContent = z.infer<typeof SiteContentSchema>;

export type TemplateKey = 'restaurant' | 'salon' | 'tradesman';
