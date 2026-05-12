/**
 * POST /api/rsvp?slug=<tenantSlug>
 *   Public — anyone can submit an RSVP.
 *   Body: { guestName, attending, guestCount, menuChoice, message }
 *
 * GET  /api/rsvp?slug=<tenantSlug>
 *   Admin only — list all RSVP submissions for this tenant.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') return handlePost(req, res);
  if (req.method === 'GET') return handleGet(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}

async function resolveTenant(slug: string) {
  if (!slug) return null;
  return db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await resolveTenant(slug);
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const body = req.body as Record<string, unknown>;
  const guestName = String(body.guestName ?? '').trim();
  if (!guestName) return res.status(400).json({ error: 'guestName required' });

  const attending = body.attending === true || body.attending === 'true';
  const guestCount = Math.min(Math.max(Number(body.guestCount) || 1, 1), 50);
  const menuChoice = String(body.menuChoice ?? '').trim().slice(0, 100);
  const message = String(body.message ?? '').trim().slice(0, 2000);

  const [row] = await db
    .insert(schema.weddingRsvp)
    .values({ tenantId: tenant.id, guestName, attending, guestCount, menuChoice, message })
    .returning();

  return res.status(201).json({ ok: true, id: row.id });
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await resolveTenant(slug);
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  if (session.role === 'tenant' && session.tenantId !== tenant.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const rows = await db.query.weddingRsvp.findMany({
    where: eq(schema.weddingRsvp.tenantId, tenant.id),
    orderBy: (t, { desc }) => [desc(t.submittedAt)],
  });

  return res.json({ rsvps: rows });
}
