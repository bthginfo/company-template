-- V2 CMS Schema Migration
-- Adds: site_settings, pages, sections, collections, collection_items, media, themes, blog_posts, wedding_rsvp
-- Existing tables (tenants, site_content, prospect_categories, prospects) are unchanged.

-- ─── site_settings ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "site_settings" (
  "tenant_id" uuid PRIMARY KEY NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "data" jsonb NOT NULL DEFAULT '{}',
  "draft" jsonb,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- ─── pages ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "pages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "tenant_id" uuid NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "slug" text NOT NULL,
  "title" text NOT NULL,
  "page_type" text NOT NULL DEFAULT 'generic',
  "is_system" boolean NOT NULL DEFAULT false,
  "published" boolean NOT NULL DEFAULT true,
  "order" integer NOT NULL DEFAULT 0,
  "parent_id" uuid,
  "seo_title" text NOT NULL DEFAULT '',
  "seo_description" text NOT NULL DEFAULT '',
  "seo_image" text NOT NULL DEFAULT '',
  "noindex" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "pages_tenant_slug_idx" ON "pages"("tenant_id", "slug");
CREATE INDEX IF NOT EXISTS "pages_tenant_id_idx" ON "pages"("tenant_id");

-- ─── sections ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "sections" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "page_id" uuid NOT NULL REFERENCES "pages"("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  "visible" boolean NOT NULL DEFAULT true,
  "is_fixed" boolean NOT NULL DEFAULT false,
  "data" jsonb NOT NULL DEFAULT '{}',
  "draft" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "sections_page_id_idx" ON "sections"("page_id");

-- ─── collections ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "collections" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "tenant_id" uuid NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "label" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "collections_tenant_id_idx" ON "collections"("tenant_id");

-- ─── collection_items ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "collection_items" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "collection_id" uuid NOT NULL REFERENCES "collections"("id") ON DELETE CASCADE,
  "slug" text NOT NULL,
  "title" text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  "published" boolean NOT NULL DEFAULT true,
  "has_subpage" boolean NOT NULL DEFAULT false,
  "featured_image" text NOT NULL DEFAULT '',
  "data" jsonb NOT NULL DEFAULT '{}',
  "seo_title" text NOT NULL DEFAULT '',
  "seo_description" text NOT NULL DEFAULT '',
  "seo_image" text NOT NULL DEFAULT '',
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "collection_items_collection_id_idx" ON "collection_items"("collection_id");
CREATE UNIQUE INDEX IF NOT EXISTS "collection_items_collection_slug_idx" ON "collection_items"("collection_id", "slug");

-- ─── media ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "media" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "tenant_id" uuid NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "filename" text NOT NULL,
  "url" text NOT NULL,
  "mime_type" text NOT NULL DEFAULT '',
  "alt" text NOT NULL DEFAULT '',
  "caption" text NOT NULL DEFAULT '',
  "width" integer,
  "height" integer,
  "file_size" integer,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "media_tenant_id_idx" ON "media"("tenant_id");

-- ─── themes ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "themes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "tenant_id" uuid NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "preset_id" text NOT NULL DEFAULT '',
  "tokens" jsonb NOT NULL DEFAULT '{}',
  "is_active" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "themes_tenant_id_idx" ON "themes"("tenant_id");

-- ─── blog_posts ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "blog_posts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "tenant_id" uuid NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "slug" text NOT NULL,
  "title" text NOT NULL,
  "excerpt" text NOT NULL DEFAULT '',
  "featured_image" text NOT NULL DEFAULT '',
  "content" jsonb NOT NULL DEFAULT '[]',
  "author" text NOT NULL DEFAULT '',
  "category" text NOT NULL DEFAULT '',
  "tags" text[] NOT NULL DEFAULT '{}',
  "published" boolean NOT NULL DEFAULT false,
  "published_at" timestamp,
  "seo_title" text NOT NULL DEFAULT '',
  "seo_description" text NOT NULL DEFAULT '',
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "blog_posts_tenant_id_idx" ON "blog_posts"("tenant_id");
CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_tenant_slug_idx" ON "blog_posts"("tenant_id", "slug");

-- ─── wedding_rsvp ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "wedding_rsvp" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "tenant_id" uuid NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "guest_name" text NOT NULL,
  "attending" boolean NOT NULL,
  "guest_count" integer NOT NULL DEFAULT 1,
  "menu_choice" text NOT NULL DEFAULT '',
  "message" text NOT NULL DEFAULT '',
  "submitted_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "wedding_rsvp_tenant_id_idx" ON "wedding_rsvp"("tenant_id");
