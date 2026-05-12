/**
 * GET    /api/sections?pageId=<id>          → list sections for page (ordered)
 * POST   /api/sections?pageId=<id>          → add section to page (admin)
 * PATCH  /api/sections/<id>                 → update section data / order / visible (admin)
 * DELETE /api/sections/<id>                 → remove section (admin, non-fixed only)
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
  const pageId = String(req.query.pageId || '');
  if (!pageId) return res.status(400).json({ error: 'pageId required' });

  const rows = await db.query.sections.findMany({
    where: eq(schema.sections.pageId, pageId),
    orderBy: [asc(schema.sections.order)],
  });

  res.status(200).json({ sections: rows });
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const pageId = String(req.query.pageId || '');
  if (!pageId) return res.status(400).json({ error: 'pageId required' });

  const body = req.body as Record<string, unknown>;
  const type = String(body.type || '');
  if (!type) return res.status(400).json({ error: 'type required' });

  // Determine next order
  const existing = await db.query.sections.findMany({
    where: eq(schema.sections.pageId, pageId),
    orderBy: [asc(schema.sections.order)],
  });
  const maxOrder = existing.reduce((m, s) => Math.max(m, s.order), -1);

  const [section] = await db
    .insert(schema.sections)
    .values({
      pageId,
      type,
      order: maxOrder + 1,
      visible: true,
      isFixed: Boolean(body.isFixed ?? false),
      data: (body.data as Record<string, unknown>) ?? {},
    })
    .returning();

  res.status(201).json({ section });
}

async function handlePatch(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'id required' });

  const existing = await db.query.sections.findFirst({ where: eq(schema.sections.id, id) });
  if (!existing) return res.status(404).json({ error: 'Section not found' });

  const body = req.body as Record<string, unknown>;
  const update: Partial<typeof schema.sections.$inferInsert> = {};

  if (body.data !== undefined) update.data = body.data as Record<string, unknown>;
  if (body.draft !== undefined) update.draft = body.draft as Record<string, unknown>;
  if (body.visible !== undefined) update.visible = Boolean(body.visible);
  if (body.order !== undefined) update.order = Number(body.order);

  const [updated] = await db
    .update(schema.sections)
    .set({ ...update, updatedAt: new Date() })
    .where(eq(schema.sections.id, id))
    .returning();

  res.status(200).json({ section: updated });
}

async function handleDelete(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'id required' });

  const existing = await db.query.sections.findFirst({ where: eq(schema.sections.id, id) });
  if (!existing) return res.status(404).json({ error: 'Section not found' });

  if (existing.isFixed) {
    return res.status(400).json({ error: 'Fixed sections cannot be deleted' });
  }

  await db.delete(schema.sections).where(eq(schema.sections.id, id));
  res.status(200).json({ ok: true });
}
