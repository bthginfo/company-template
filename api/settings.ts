/**
 * GET  /api/settings?slug=<tenant>  → get site settings (published)
 * GET  /api/settings?slug=<tenant>&admin=1 → get settings incl. draft (admin)
 * PUT  /api/settings?slug=<tenant>  → upsert settings (admin)
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'PUT') return handlePut(req, res);
  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const isAdmin = req.query.admin === '1';
  if (isAdmin) {
    const session = await getSession(req);
    if (!session) return unauthorized(res);
  }

  const settings = await db.query.siteSettings.findFirst({
    where: eq(schema.siteSettings.tenantId, tenant.id),
  });

  if (!settings) return res.status(200).json({ settings: null });

  // Admin gets both published and draft; public only sees published data
  if (isAdmin) {
    return res.status(200).json({ settings });
  }
  return res.status(200).json({ settings: { ...settings, draft: undefined } });
}

async function handlePut(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const body = req.body as Record<string, unknown>;

  const existing = await db.query.siteSettings.findFirst({
    where: eq(schema.siteSettings.tenantId, tenant.id),
  });

  if (existing) {
    const update: Partial<typeof schema.siteSettings.$inferInsert> = { updatedAt: new Date() };
    if (body.data !== undefined) update.data = body.data as Record<string, unknown>;
    if (body.draft !== undefined) update.draft = body.draft as Record<string, unknown> | null;

    const [updated] = await db
      .update(schema.siteSettings)
      .set(update)
      .where(eq(schema.siteSettings.tenantId, tenant.id))
      .returning();
    return res.status(200).json({ settings: updated });
  }

  const [created] = await db
    .insert(schema.siteSettings)
    .values({
      tenantId: tenant.id,
      data: (body.data as Record<string, unknown>) ?? {},
      draft: (body.draft as Record<string, unknown>) ?? null,
    })
    .returning();

  res.status(201).json({ settings: created });
}
