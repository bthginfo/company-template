CREATE TABLE IF NOT EXISTS "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"featured_image" text DEFAULT '' NOT NULL,
	"content" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"author" text DEFAULT '' NOT NULL,
	"category" text DEFAULT '' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp,
	"seo_title" text DEFAULT '' NOT NULL,
	"seo_description" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collection_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"collection_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"has_subpage" boolean DEFAULT false NOT NULL,
	"featured_image" text DEFAULT '' NOT NULL,
	"data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"seo_title" text DEFAULT '' NOT NULL,
	"seo_description" text DEFAULT '' NOT NULL,
	"seo_image" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"type" text NOT NULL,
	"label" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "form_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"form_type" text NOT NULL,
	"data" jsonb NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"filename" text NOT NULL,
	"url" text NOT NULL,
	"mime_type" text DEFAULT '' NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"caption" text DEFAULT '' NOT NULL,
	"width" integer,
	"height" integer,
	"file_size" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"page_type" text DEFAULT 'generic' NOT NULL,
	"is_system" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"parent_id" uuid,
	"seo_title" text DEFAULT '' NOT NULL,
	"seo_description" text DEFAULT '' NOT NULL,
	"seo_image" text DEFAULT '' NOT NULL,
	"noindex" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prospect_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "prospect_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prospects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid,
	"name" text NOT NULL,
	"company" text DEFAULT '' NOT NULL,
	"address" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"website_old" text DEFAULT '' NOT NULL,
	"website_new" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'neu' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"last_email_subject" text DEFAULT '' NOT NULL,
	"last_email_body" text DEFAULT '' NOT NULL,
	"last_emailed_at" timestamp,
	"provisioned_tenant_slug" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_id" uuid NOT NULL,
	"type" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"is_fixed" boolean DEFAULT false NOT NULL,
	"data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"draft" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_content" (
	"tenant_id" uuid PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"draft" jsonb,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_settings" (
	"tenant_id" uuid PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"draft" jsonb,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"template" text NOT NULL,
	"style" text DEFAULT 'classic' NOT NULL,
	"password_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "themes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"name" text NOT NULL,
	"preset_id" text DEFAULT '' NOT NULL,
	"tokens" jsonb NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wedding_rsvp" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"guest_name" text NOT NULL,
	"attending" boolean NOT NULL,
	"guest_count" integer DEFAULT 1 NOT NULL,
	"menu_choice" text DEFAULT '' NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collections" ADD CONSTRAINT "collections_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prospects" ADD CONSTRAINT "prospects_category_id_prospect_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."prospect_categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sections" ADD CONSTRAINT "sections_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "site_content" ADD CONSTRAINT "site_content_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "themes" ADD CONSTRAINT "themes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wedding_rsvp" ADD CONSTRAINT "wedding_rsvp_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
