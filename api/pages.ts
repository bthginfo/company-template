/**
 * GET   /api/pages?slug=<tenant-slug>          → list all pages for tenant (published only, public)
 * GET   /api/pages?slug=<tenant-slug>&admin=1  → all pages incl. unpublished (admin only)
 * POST  /api/pages?slug=<tenant-slug>          → create new page (admin only)
 * PATCH /api/pages?id=<page-id>                → update page fields (admin only)
 * DELETE /api/pages?id=<page-id>               → delete custom page (admin only)
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq, asc } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'POST') return handlePost(req, res);
  if (req.method === 'PATCH') return handlePatch(req, res);
  if (req.method === 'DELETE') return handleDelete(req, res);
  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  // Single page by ID (used by the admin page editor)
  const pageId = req.query.id ? String(req.query.id) : null;
  if (pageId) {
    const session = await getSession(req);
    if (!session) return unauthorized(res);
    const page = await db.query.pages.findFirst({ where: eq(schema.pages.id, pageId) });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    return res.status(200).json({ page });
  }

  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const isAdmin = req.query.admin === '1';
  if (isAdmin) {
    const session = await getSession(req);
    if (!session) return unauthorized(res);
  }

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, tenantSlug),
  });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const rows = await db.query.pages.findMany({
    where: isAdmin
      ? eq(schema.pages.tenantId, tenant.id)
      : eq(schema.pages.tenantId, tenant.id),
    orderBy: [asc(schema.pages.order)],
  });

  const result = isAdmin ? rows : rows.filter((p) => p.published);
  res.status(200).json({ pages: result });
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, tenantSlug),
  });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  // Super admins can manage any tenant; tenant sessions can only manage their own
  if (session.role === 'tenant' && session.slug !== tenantSlug) {
    return unauthorized(res);
  }

  const body = req.body as Record<string, unknown>;
  const slug = String(body.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const title = String(body.title || slug);
  const pageType = String(body.pageType || 'generic');
  const order = Number(body.order ?? 0);
  const parentId = body.parentId ? String(body.parentId) : null;

  const [page] = await db
    .insert(schema.pages)
    .values({
      tenantId: tenant.id,
      slug,
      title,
      pageType,
      order,
      parentId: parentId ?? undefined,
      isSystem: false,
      published: true,
    })
    .returning();

  res.status(201).json({ page });
}

async function handlePatch(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'id required' });

  const body = req.body as Record<string, unknown>;
  const update: Partial<typeof schema.pages.$inferInsert> = {};
  if (body.title !== undefined) update.title = String(body.title);
  if (body.slug !== undefined) update.slug = String(body.slug);
  if (body.published !== undefined) update.published = Boolean(body.published);
  if (body.order !== undefined) update.order = Number(body.order);
  if (body.seoTitle !== undefined) update.seoTitle = String(body.seoTitle);
  if (body.seoDescription !== undefined) update.seoDescription = String(body.seoDescription);
  // Accept legacy metaTitle/metaDescription aliases from the admin UI
  if (body.metaTitle !== undefined) update.seoTitle = String(body.metaTitle);
  if (body.metaDescription !== undefined) update.seoDescription = String(body.metaDescription);

  const [updated] = await db
    .update(schema.pages)
    .set({ ...update, updatedAt: new Date() })
    .where(eq(schema.pages.id, id))
    .returning();

  if (!updated) return res.status(404).json({ error: 'Page not found' });
  res.status(200).json({ page: updated });
}

async function handleDelete(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'id required' });

  const page = await db.query.pages.findFirst({ where: eq(schema.pages.id, id) });
  if (!page) return res.status(404).json({ error: 'Page not found' });
  if (page.isSystem) return res.status(400).json({ error: 'Cannot delete system page' });

  await db.delete(schema.pages).where(eq(schema.pages.id, id));
  res.status(200).json({ ok: true });
}
