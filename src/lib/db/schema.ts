import { sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  jsonb,
  primaryKey,
  integer,
  uuid,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from '@auth/core/adapters';

/**
 * Multi-tenant model.
 * One DB shared across all customer sites. Each row is scoped by tenant_id.
 * The site itself is identified by VITE_TENANT_SLUG (set per Vercel project).
 */
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  template: text('template').notNull(), // 'restaurant' | 'salon' | 'tradesman'
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

/* ─── Auth.js tables (Drizzle adapter) ──────────────────────────────────── */

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  // Tenant this user can administer. Null = superadmin (you).
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (a) => ({ pk: primaryKey({ columns: [a.provider, a.providerAccountId] }) })
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({ pk: primaryKey({ columns: [vt.identifier, vt.token] }) })
);

export type Tenant = typeof tenants.$inferSelect;
export type SiteContentRow = typeof siteContent.$inferSelect;

// re-export for adapter typing convenience
export const _sql = sql;
