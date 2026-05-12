/**
 * POST /api/reservation?slug=<tenantSlug>
 *   Public — anyone can request a table reservation.
 *   Body: { name, email, phone, date, time, guests, message }
 *
 * GET /api/reservation?slug=<tenantSlug>
 *   Admin only — list all reservations for this tenant.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { and, eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';
import { checkRateLimit } from './_lib/rate-limit.js';

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

  const rl = checkRateLimit(req, { maxRequests: 5, windowMs: 60_000, endpoint: 'reservation' });
  if (!rl.ok) return res.status(429).json({ error: rl.error });

  const body = req.body as Record<string, unknown>;
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const date = String(body.date ?? '').trim();
  const time = String(body.time ?? '').trim();

  if (!name) return res.status(400).json({ error: 'name required' });
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'valid email required' });
  if (!date) return res.status(400).json({ error: 'date required' });
  if (!time) return res.status(400).json({ error: 'time required' });

  // Sanitize data — only store expected fields
  const submissionData = {
    name: name.slice(0, 200),
    email: email.slice(0, 320),
    phone: String(body.phone ?? '').trim().slice(0, 50),
    date,
    time,
    guests: Math.min(Math.max(Number(body.guests) || 2, 1), 100),
    message: String(body.message ?? '').trim().slice(0, 2000),
  };

  const [row] = await db
    .insert(schema.formSubmissions)
    .values({ tenantId: tenant.id, formType: 'reservation', data: submissionData })
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

  const rows = await db.query.formSubmissions.findMany({
    where: and(eq(schema.formSubmissions.tenantId, tenant.id), eq(schema.formSubmissions.formType, 'reservation')),
    orderBy: (t, { desc }) => [desc(t.submittedAt)],
  });

  return res.json({ reservations: rows });
}
