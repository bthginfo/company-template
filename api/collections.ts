/**
 * GET    /api/collections?slug=<tenant>            → list collections for tenant
 * GET    /api/collections/<id>/items               → list items in a collection
 * POST   /api/collections?slug=<tenant>            → create collection (admin)
 * POST   /api/collections/<id>/items               → add item to collection (admin)
 * PATCH  /api/collections/items/<id>               → update item (admin)
 * DELETE /api/collections/items/<id>               → delete item (admin)
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq, asc, and, inArray } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { action } = req.query;

  // Route: /api/collections/items/<id>
  if (action === 'item') {
    if (req.method === 'PATCH') return handlePatchItem(req, res);
    if (req.method === 'DELETE') return handleDeleteItem(req, res);
  }

  // Route: GET /api/collections?action=items&collectionId=<id>
  if (action === 'items') {
    if (req.method === 'GET') return handleGetItems(req, res);
    if (req.method === 'POST') return handlePostItem(req, res);
  }

  // Route: GET /api/collections?action=itemBySlug&slug=<tenant>&itemSlug=<slug>
  if (action === 'itemBySlug') {
    if (req.method === 'GET') return handleGetItemBySlug(req, res);
  }

  // Route: /api/collections
  if (req.method === 'GET') return handleGetCollections(req, res);
  if (req.method === 'POST') return handlePostCollection(req, res);

  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGetCollections(req: VercelRequest, res: VercelResponse) {
  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const rows = await db.query.collections.findMany({
    where: eq(schema.collections.tenantId, tenant.id),
  });
  res.status(200).json({ collections: rows });
}

async function handlePostCollection(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const body = req.body as Record<string, unknown>;
  const [collection] = await db
    .insert(schema.collections)
    .values({
      tenantId: tenant.id,
      type: String(body.type || ''),
      label: String(body.label || body.type || ''),
    })
    .returning();

  res.status(201).json({ collection });
}

async function handleGetItems(req: VercelRequest, res: VercelResponse) {
  const collectionId = String(req.query.collectionId || '');
  if (!collectionId) return res.status(400).json({ error: 'collectionId required' });

  const rows = await db.query.collectionItems.findMany({
    where: eq(schema.collectionItems.collectionId, collectionId),
    orderBy: [asc(schema.collectionItems.order)],
  });
  res.status(200).json({ items: rows });
}

async function handlePostItem(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const collectionId = String(req.query.collectionId || '');
  if (!collectionId) return res.status(400).json({ error: 'collectionId required' });

  const body = req.body as Record<string, unknown>;
  const slug = String(body.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const title = String(body.title || slug);

  const existing = await db.query.collectionItems.findMany({
    where: eq(schema.collectionItems.collectionId, collectionId),
  });
  const maxOrder = existing.reduce((m, i) => Math.max(m, i.order), -1);

  const [item] = await db
    .insert(schema.collectionItems)
    .values({
      collectionId,
      slug,
      title,
      order: maxOrder + 1,
      published: Boolean(body.published ?? true),
      hasSubpage: Boolean(body.hasSubpage ?? false),
      featuredImage: String(body.featuredImage || ''),
      data: (body.data as Record<string, unknown>) ?? {},
    })
    .returning();

  res.status(201).json({ item });
}

async function handlePatchItem(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'id required' });

  const body = req.body as Record<string, unknown>;
  const update: Partial<typeof schema.collectionItems.$inferInsert> = {};
  if (body.title !== undefined) update.title = String(body.title);
  if (body.slug !== undefined) update.slug = String(body.slug);
  if (body.data !== undefined) update.data = body.data as Record<string, unknown>;
  if (body.published !== undefined) update.published = Boolean(body.published);
  if (body.order !== undefined) update.order = Number(body.order);
  if (body.featuredImage !== undefined) update.featuredImage = String(body.featuredImage);
  if (body.hasSubpage !== undefined) update.hasSubpage = Boolean(body.hasSubpage);

  const [updated] = await db
    .update(schema.collectionItems)
    .set({ ...update, updatedAt: new Date() })
    .where(eq(schema.collectionItems.id, id))
    .returning();

  res.status(200).json({ item: updated });
}

async function handleDeleteItem(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'id required' });

  await db.delete(schema.collectionItems).where(eq(schema.collectionItems.id, id));
  res.status(200).json({ ok: true });
}

/**
 * GET /api/collections?action=itemBySlug&slug=<tenant>&itemSlug=<slug>
 * Finds a published collection item by slug across all collections for the tenant.
 * Returns { item, collection } or 404.
 */
async function handleGetItemBySlug(req: VercelRequest, res: VercelResponse) {
  const tenantSlug = String(req.query.slug || '');
  const itemSlug = String(req.query.itemSlug || '');
  if (!tenantSlug || !itemSlug) return res.status(400).json({ error: 'slug and itemSlug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  // Find all collections for this tenant
  const collections = await db.query.collections.findMany({
    where: eq(schema.collections.tenantId, tenant.id),
  });
  if (!collections.length) return res.status(404).json({ error: 'Item not found' });

  const collectionIds = collections.map((c) => c.id);

  const item = await db.query.collectionItems.findFirst({
    where: and(
      eq(schema.collectionItems.slug, itemSlug),
      eq(schema.collectionItems.published, true),
      inArray(schema.collectionItems.collectionId, collectionIds),
    ),
  });
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const collection = collections.find((c) => c.id === item.collectionId);
  return res.status(200).json({ item, collection });
}
