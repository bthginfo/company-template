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
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Tenant = typeof tenants.$inferSelect;
export type SiteContentRow = typeof siteContent.$inferSelect;
