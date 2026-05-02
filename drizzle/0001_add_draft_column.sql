-- Add draft column to site_content for preview/publish workflow.
-- Run once against the production database:
--   psql $POSTGRES_URL -f drizzle/0001_add_draft_column.sql

ALTER TABLE site_content
ADD COLUMN IF NOT EXISTS draft jsonb DEFAULT NULL;

COMMENT ON COLUMN site_content.draft IS 'Unpublished draft. When non-null, admin edits this; public site shows data column.';
