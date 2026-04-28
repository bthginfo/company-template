import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { SiteContentSchema } from '../src/lib/types.js';
import { getSession, unauthorized, forbidden } from './_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'PUT') return handlePut(req, res);
  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, slug),
  });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const content = await db.query.siteContent.findFirst({
    where: eq(schema.siteContent.tenantId, tenant.id),
  });

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.json({
    tenant: { slug: tenant.slug, name: tenant.name, template: tenant.template, style: tenant.style },
    content: content?.data ?? null,
  });
}

async function handlePut(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, slug),
  });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  // Tenant role can only edit own tenant. Super can edit any.
  if (session.role === 'tenant' && session.tenantId !== tenant.id) return forbidden(res);

  const parse = SiteContentSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid content', details: parse.error.flatten() });
  }

  await db
    .insert(schema.siteContent)
    .values({ tenantId: tenant.id, data: parse.data })
    .onConflictDoUpdate({
      target: schema.siteContent.tenantId,
      set: { data: parse.data, updatedAt: new Date() },
    });

  res.json({ ok: true });
}
