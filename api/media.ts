/**
 * GET    /api/media?slug=<tenant>    → list media for tenant (admin)
 * POST   /api/media?slug=<tenant>    → register media record after upload (admin)
 * DELETE /api/media?id=<id>          → delete media record (admin)
 *
 * Actual file upload is handled by /api/upload.ts (Vercel Blob).
 * This endpoint manages only the DB record.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq, desc } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'POST') return handlePost(req, res);
  if (req.method === 'DELETE') return handleDelete(req, res);
  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const items = await db.query.media.findMany({
    where: eq(schema.media.tenantId, tenant.id),
    orderBy: [desc(schema.media.createdAt)],
  });

  res.status(200).json({ media: items });
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const body = req.body as Record<string, unknown>;
  const url = String(body.url || '');
  const filename = String(body.filename || '');
  if (!url || !filename) return res.status(400).json({ error: 'url and filename required' });

  const [record] = await db
    .insert(schema.media)
    .values({
      tenantId: tenant.id,
      filename,
      url,
      mimeType: String(body.mimeType || 'application/octet-stream'),
      alt: String(body.alt || ''),
      caption: String(body.caption || ''),
      width: body.width != null ? Number(body.width) : null,
      height: body.height != null ? Number(body.height) : null,
      fileSize: body.fileSize != null ? Number(body.fileSize) : null,
    })
    .returning();

  res.status(201).json({ media: record });
}

async function handleDelete(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'id required' });

  await db.delete(schema.media).where(eq(schema.media.id, id));
  res.status(200).json({ ok: true });
}
