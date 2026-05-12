/**
 * POST /api/training-signup?slug=<tenantSlug>
 *   Public — trial session / introductory training signup.
 *   Body: { name, email, phone, course, goal, experience }
 *
 * GET /api/training-signup?slug=<tenantSlug>
 *   Admin only — list all signups.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { and, eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';
import { checkRateLimit } from './_lib/rate-limit.js';

const ALLOWED_EXPERIENCE = new Set(['beginner', 'some', 'regular', 'advanced']);

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

  const rl = checkRateLimit(req, { maxRequests: 5, windowMs: 60_000, endpoint: 'training-signup' });
  if (!rl.ok) return res.status(429).json({ error: rl.error });

  const body = req.body as Record<string, unknown>;
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();

  if (!name) return res.status(400).json({ error: 'name required' });
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'valid email required' });

  const rawExp = String(body.experience ?? 'beginner');
  const experience = ALLOWED_EXPERIENCE.has(rawExp) ? rawExp : 'beginner';

  const submissionData = {
    name: name.slice(0, 200),
    email: email.slice(0, 320),
    phone: String(body.phone ?? '').trim().slice(0, 50),
    course: String(body.course ?? '').trim().slice(0, 200),
    goal: String(body.goal ?? '').trim().slice(0, 500),
    experience,
  };

  const [row] = await db
    .insert(schema.formSubmissions)
    .values({ tenantId: tenant.id, formType: 'training-signup', data: submissionData })
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
    where: and(eq(schema.formSubmissions.tenantId, tenant.id), eq(schema.formSubmissions.formType, 'training-signup')),
    orderBy: (t, { desc }) => [desc(t.submittedAt)],
  });

  return res.json({ signups: rows });
}
