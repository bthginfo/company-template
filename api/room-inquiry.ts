/**
 * POST /api/room-inquiry?slug=<tenantSlug>
 *   Public — hotel room availability enquiry.
 *   Body: { name, email, phone, checkin, checkout, adults, children, room, message }
 *
 * GET /api/room-inquiry?slug=<tenantSlug>
 *   Admin only — list all room enquiries.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { and, eq } from 'drizzle-orm';
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

function isValidDate(s: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s));
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await resolveTenant(slug);
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const body = req.body as Record<string, unknown>;
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const checkin = String(body.checkin ?? '').trim();
  const checkout = String(body.checkout ?? '').trim();

  if (!name) return res.status(400).json({ error: 'name required' });
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'valid email required' });
  if (!isValidDate(checkin)) return res.status(400).json({ error: 'valid checkin date required (YYYY-MM-DD)' });
  if (!isValidDate(checkout)) return res.status(400).json({ error: 'valid checkout date required (YYYY-MM-DD)' });
  if (checkout <= checkin) return res.status(400).json({ error: 'checkout must be after checkin' });

  const submissionData = {
    name: name.slice(0, 200),
    email: email.slice(0, 320),
    phone: String(body.phone ?? '').trim().slice(0, 50),
    checkin,
    checkout,
    adults: Math.min(Math.max(Number(body.adults) || 2, 1), 20),
    children: Math.min(Math.max(Number(body.children) || 0, 0), 20),
    room: String(body.room ?? '').trim().slice(0, 200),
    message: String(body.message ?? '').trim().slice(0, 2000),
  };

  const [row] = await db
    .insert(schema.formSubmissions)
    .values({ tenantId: tenant.id, formType: 'room-inquiry', data: submissionData })
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
    where: and(eq(schema.formSubmissions.tenantId, tenant.id), eq(schema.formSubmissions.formType, 'room-inquiry')),
    orderBy: (t, { desc }) => [desc(t.submittedAt)],
  });

  return res.json({ roomInquiries: rows });
}
