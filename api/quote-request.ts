/**
 * POST /api/quote-request?slug=<tenantSlug>
 *   Public — anyone can request a quote.
 *   Body: { name, email, phone, service, address, urgency, description }
 *
 * GET /api/quote-request?slug=<tenantSlug>
 *   Admin only — list all quote requests for this tenant.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { and, eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';

const ALLOWED_URGENCY = new Set(['low', 'normal', 'high', 'emergency']);

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
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const description = String(body.description ?? '').trim();

  if (!name) return res.status(400).json({ error: 'name required' });
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'valid email required' });
  if (!phone) return res.status(400).json({ error: 'phone required' });
  if (!description) return res.status(400).json({ error: 'description required' });

  const rawUrgency = String(body.urgency ?? 'normal');
  const urgency = ALLOWED_URGENCY.has(rawUrgency) ? rawUrgency : 'normal';

  const submissionData = {
    name: name.slice(0, 200),
    email: email.slice(0, 320),
    phone: phone.slice(0, 50),
    service: String(body.service ?? '').trim().slice(0, 200),
    address: String(body.address ?? '').trim().slice(0, 500),
    urgency,
    description: description.slice(0, 5000),
  };

  const [row] = await db
    .insert(schema.formSubmissions)
    .values({ tenantId: tenant.id, formType: 'quote-request', data: submissionData })
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
    where: and(eq(schema.formSubmissions.tenantId, tenant.id), eq(schema.formSubmissions.formType, 'quote-request')),
    orderBy: (t, { desc }) => [desc(t.submittedAt)],
  });

  return res.json({ quoteRequests: rows });
}
