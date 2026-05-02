import { pgTable, text, timestamp, jsonb, uuid } from 'drizzle-orm/pg-core';

/**
 * Multi-tenant model. One DB shared across all customer sites.
 * Each row is scoped by tenant_id. The site itself is identified by
 * VITE_TENANT_SLUG (client) and TENANT_SLUG (server) per Vercel project.
 */
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  template: text('template').notNull(), // 'restaurant' | 'salon' | 'tradesman'
  style: text('style').notNull().default('classic'), // 'classic' | 'modern' | 'bold'
  passwordHash: text('password_hash'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Site content. One row per tenant. Stored as JSON for maximum flexibility.
 */
export const siteContent = pgTable('site_content', {
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .primaryKey(),
  data: jsonb('data').notNull().$type<Record<string, unknown>>(),
  /** Unpublished draft. When non-null, the admin edits this; public site shows `data`. */
  draft: jsonb('draft').$type<Record<string, unknown>>(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Tenant = typeof tenants.$inferSelect;
export type SiteContentRow = typeof siteContent.$inferSelect;

/** CRM categories used to classify prospects (e.g. Gastro, Handwerk, Praxis). */
export const prospectCategories = pgTable('prospect_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Internal CRM — prospects/leads pipeline. Lives on the showcase deployment
 * only; never exposed via SEO. Used by Mario + the founders to track who
 * has been pitched, when, with what status.
 */
export const prospects = pgTable('prospects', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => prospectCategories.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  company: text('company').notNull().default(''),
  address: text('address').notNull().default(''),
  email: text('email').notNull().default(''),
  websiteOld: text('website_old').notNull().default(''),
  websiteNew: text('website_new').notNull().default(''),
  /** 'neu' | 'angefragt' | 'reminder' | 'angenommen' | 'abgelehnt' */
  status: text('status').notNull().default('neu'),
  notes: text('notes').notNull().default(''),
  /** Last subject/body the operator sent — pre-fills the next reminder. */
  lastEmailSubject: text('last_email_subject').notNull().default(''),
  lastEmailBody: text('last_email_body').notNull().default(''),
  lastEmailedAt: timestamp('last_emailed_at'),
  /** When the prospect was provisioned as a real tenant (FK kept loose to avoid cascade). */
  provisionedTenantSlug: text('provisioned_tenant_slug'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Prospect = typeof prospects.$inferSelect;
export type ProspectCategory = typeof prospectCategories.$inferSelect;
