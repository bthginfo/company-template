import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { SiteContentSchema } from '../src/lib/types.js';
import { getSession, unauthorized } from './_lib/auth.js';

/**
 * GET  /api/content?slug=xxx            → public, returns live site content
 * GET  /api/content?slug=xxx&preview=1  → admin only, returns draft (falls back to live)
 * PUT  /api/content?slug=xxx            → admin only, saves to draft column
 * POST /api/content?slug=xxx&action=publish  → admin only, copies draft → data, clears draft
 * POST /api/content?slug=xxx&action=discard  → admin only, clears draft
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'PUT') return handlePut(req, res);
  if (req.method === 'POST') return handlePost(req, res);
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

  const isPreview = req.query.preview === '1';
  let responseContent = content?.data ?? null;
  const hasDraft = !!content?.draft;

  if (isPreview) {
    const session = await getSession(req);
    if (!session || (session.role === 'tenant' && session.tenantId !== tenant.id)) {
      return res.status(403).json({ error: 'Preview requires admin session' });
    }
    if (content?.draft) {
      responseContent = content.draft;
    }
  }

  if (!isPreview) {
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
  }

  res.json({
    tenant: { slug: tenant.slug, name: tenant.name, template: tenant.template, style: tenant.style },
    content: responseContent,
    hasDraft,
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

  if (session.role === 'tenant' && session.tenantId !== tenant.id) {
    return res.status(403).json({
      error: 'Diese Sitzung gehört zu einem anderen Mandanten. Bitte abmelden und neu anmelden.',
    });
  }

  const parse = SiteContentSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid content', details: parse.error.flatten() });
  }

  await db
    .insert(schema.siteContent)
    .values({ tenantId: tenant.id, data: parse.data, draft: parse.data })
    .onConflictDoUpdate({
      target: schema.siteContent.tenantId,
      set: { draft: parse.data, updatedAt: new Date() },
    });

  res.json({ ok: true });
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, slug),
  });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  if (session.role === 'tenant' && session.tenantId !== tenant.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const action = String(req.query.action || '');

  if (action === 'publish') {
    const content = await db.query.siteContent.findFirst({
      where: eq(schema.siteContent.tenantId, tenant.id),
    });
    if (!content?.draft) {
      return res.status(400).json({ error: 'No draft to publish' });
    }
    await db
      .update(schema.siteContent)
      .set({ data: content.draft, draft: null, updatedAt: new Date() })
      .where(eq(schema.siteContent.tenantId, tenant.id));
    return res.json({ ok: true });
  }

  if (action === 'discard') {
    await db
      .update(schema.siteContent)
      .set({ draft: null, updatedAt: new Date() })
      .where(eq(schema.siteContent.tenantId, tenant.id));
    return res.json({ ok: true });
  }

  res.status(400).json({ error: 'Unknown action' });
}
