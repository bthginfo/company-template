import { pgTable, text, timestamp, jsonb, uuid, boolean, integer } from 'drizzle-orm/pg-core';

// ─── Tenants ──────────────────────────────────────────────────────────────────

/**
 * Multi-tenant model. One DB shared across all customer sites.
 * Each row is scoped by tenant_id. The site itself is identified by
 * VITE_TENANT_SLUG (client) and TENANT_SLUG (server) per Vercel project.
 */
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  template: text('template').notNull(),
  style: text('style').notNull().default('classic'),
  passwordHash: text('password_hash'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Global site settings per tenant (nav, footer, contact, social, scripts, SEO, mail, legal).
 * Stored as a single JSONB blob for flexibility during rapid development.
 * Draft/publish workflow mirrors siteContent.
 */
export const siteSettings = pgTable('site_settings', {
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .primaryKey(),
  data: jsonb('data').notNull().$type<Record<string, unknown>>(),
  draft: jsonb('draft').$type<Record<string, unknown>>(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Site content — legacy global blob kept for migration compatibility.
 * New content lives in pages + sections tables.
 * Will be retired once all tenants are migrated to the new CMS.
 */
export const siteContent = pgTable('site_content', {
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .primaryKey(),
  data: jsonb('data').notNull().$type<Record<string, unknown>>(),
  draft: jsonb('draft').$type<Record<string, unknown>>(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Tenant = typeof tenants.$inferSelect;
export type SiteContentRow = typeof siteContent.$inferSelect;
export type SiteSettingsRow = typeof siteSettings.$inferSelect;

// ─── Pages ────────────────────────────────────────────────────────────────────

/**
 * Pages per tenant. Slug is the URL path (e.g. 'home', 'speisekarte', 'zimmer/suite').
 * pageType drives routing and which section-types are allowed.
 */
export const pages = pgTable('pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  /** 'home' | 'generic' | 'collection-list' | 'collection-detail' | 'blog-list' | 'blog-post' */
  pageType: text('page_type').notNull().default('generic'),
  /** true = cannot be deleted (e.g. Home, Impressum) */
  isSystem: boolean('is_system').notNull().default(false),
  published: boolean('published').notNull().default(true),
  /** Position in navigation / sidebar */
  order: integer('order').notNull().default(0),
  /** FK to parent page (for sub-pages) */
  parentId: uuid('parent_id'),
  seoTitle: text('seo_title').notNull().default(''),
  seoDescription: text('seo_description').notNull().default(''),
  seoImage: text('seo_image').notNull().default(''),
  noindex: boolean('noindex').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;

// ─── Sections ─────────────────────────────────────────────────────────────────

/**
 * CMS sections per page. `type` is a string key (e.g. 'restaurantHero', 'menuSection').
 * `data` holds all field values for this section instance.
 * `order` determines render sequence. `isFixed` prevents move up/down.
 */
export const sections = pgTable('sections', {
  id: uuid('id').defaultRandom().primaryKey(),
  pageId: uuid('page_id')
    .references(() => pages.id, { onDelete: 'cascade' })
    .notNull(),
  type: text('type').notNull(),
  order: integer('order').notNull().default(0),
  visible: boolean('visible').notNull().default(true),
  /** Fixed sections cannot be reordered (e.g. hero at top) */
  isFixed: boolean('is_fixed').notNull().default(false),
  /** Section field data */
  data: jsonb('data').notNull().$type<Record<string, unknown>>().default({}),
  /** Unpublished draft data for this section */
  draft: jsonb('draft').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Section = typeof sections.$inferSelect;
export type NewSection = typeof sections.$inferInsert;

// ─── Collections ──────────────────────────────────────────────────────────────

/**
 * Collection definitions per tenant (e.g. 'rooms', 'dishes', 'projects').
 * Each branch has predefined collection types; tenants can have multiple collections.
 */
export const collections = pgTable('collections', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  /** 'rooms' | 'dishes' | 'projects' | 'courses' | 'properties' | ... */
  type: text('type').notNull(),
  /** Display label in admin */
  label: text('label').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;

/**
 * Items within a collection (e.g. individual rooms, dishes, projects).
 * `data` holds all item-specific fields (varies by collection type).
 * `hasSubpage` + `slug` enable collection-detail routing.
 */
export const collectionItems = pgTable('collection_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  collectionId: uuid('collection_id')
    .references(() => collections.id, { onDelete: 'cascade' })
    .notNull(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  order: integer('order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  hasSubpage: boolean('has_subpage').notNull().default(false),
  featuredImage: text('featured_image').notNull().default(''),
  data: jsonb('data').notNull().$type<Record<string, unknown>>().default({}),
  seoTitle: text('seo_title').notNull().default(''),
  seoDescription: text('seo_description').notNull().default(''),
  seoImage: text('seo_image').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type CollectionItem = typeof collectionItems.$inferSelect;
export type NewCollectionItem = typeof collectionItems.$inferInsert;

// ─── Media ────────────────────────────────────────────────────────────────────

/**
 * Media library per tenant. Images and videos uploaded via Vercel Blob.
 */
export const media = pgTable('media', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  filename: text('filename').notNull(),
  url: text('url').notNull(),
  mimeType: text('mime_type').notNull().default(''),
  alt: text('alt').notNull().default(''),
  caption: text('caption').notNull().default(''),
  width: integer('width'),
  height: integer('height'),
  fileSize: integer('file_size'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;

// ─── Themes ───────────────────────────────────────────────────────────────────

/**
 * Saved color themes per tenant. `tokens` holds the full design-token map.
 * At most one row has `isActive = true` per tenant.
 */
export const themes = pgTable('themes', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  /** Preset id from PRESETS (e.g. 'espresso') or 'custom' */
  presetId: text('preset_id').notNull().default(''),
  /** Full token map: { primary, primaryFg, accent, accentFg, surface, bg, text } */
  tokens: jsonb('tokens').notNull().$type<Record<string, string>>(),
  isActive: boolean('is_active').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Theme = typeof themes.$inferSelect;
export type NewTheme = typeof themes.$inferInsert;

// ─── Blog / News ──────────────────────────────────────────────────────────────

/**
 * Blog / News posts per tenant.
 * `content` is an array of typed content blocks (richText, image, video, quote, divider, embed).
 */
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull().default(''),
  featuredImage: text('featured_image').notNull().default(''),
  /** Array of content blocks: { type: 'richText'|'image'|'video'|'quote'|'divider'|'embed', ... } */
  content: jsonb('content').notNull().$type<Record<string, unknown>[]>().default([]),
  author: text('author').notNull().default(''),
  category: text('category').notNull().default(''),
  tags: text('tags').array().notNull().default([]),
  published: boolean('published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  seoTitle: text('seo_title').notNull().default(''),
  seoDescription: text('seo_description').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

// ─── Wedding RSVP ─────────────────────────────────────────────────────────────

/**
 * Wedding RSVP responses. One row per submission.
 * Only populated for tenants with template = 'wedding'.
 */
export const weddingRsvp = pgTable('wedding_rsvp', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .references(() => tenants.id, { onDelete: 'cascade' })
    .notNull(),
  guestName: text('guest_name').notNull(),
  attending: boolean('attending').notNull(),
  guestCount: integer('guest_count').notNull().default(1),
  menuChoice: text('menu_choice').notNull().default(''),
  message: text('message').notNull().default(''),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

export type WeddingRsvp = typeof weddingRsvp.$inferSelect;
export type NewWeddingRsvp = typeof weddingRsvp.$inferInsert;

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
