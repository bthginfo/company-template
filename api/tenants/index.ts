import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { requireCrm } from '../_lib/crm-auth.js';

/**
 * GET  /api/tenants         → list all tenants
 * POST /api/tenants/delete   → delete tenant + optionally Vercel project
 * POST /api/tenants/duplicate → duplicate tenant with new slug/name
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (await requireCrm(req, res)) return;

  if (req.method === 'GET') return handleList(req, res);
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const action = String(req.query.action || '');
  if (action === 'delete') return handleDelete(req, res);
  if (action === 'duplicate') return handleDuplicate(req, res);
  return res.status(400).json({ error: 'Unknown action. Use ?action=delete or ?action=duplicate' });
}

async function handleList(_req: VercelRequest, res: VercelResponse) {
  const tenants = await db.query.tenants.findMany({
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });

  // Fetch content updatedAt for each tenant
  const contentRows = await db.query.siteContent.findMany({
    columns: { tenantId: true, updatedAt: true },
  });
  const contentMap = new Map(contentRows.map((r) => [r.tenantId, r.updatedAt]));

  const result = tenants.map((t) => ({
    id: t.id,
    slug: t.slug,
    name: t.name,
    template: t.template,
    style: t.style,
    createdAt: t.createdAt,
    contentUpdatedAt: contentMap.get(t.id) ?? null,
    adminUrl: `https://${t.slug}.vercel.app/admin/login`,
    siteUrl: `https://${t.slug}.vercel.app`,
  }));

  res.json(result);
}

async function handleDelete(req: VercelRequest, res: VercelResponse) {
  const { slug, deleteVercelProject } = req.body as { slug?: string; deleteVercelProject?: boolean };
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  // Clear prospect FK references first
  await db.update(schema.prospects)
    .set({ provisionedTenantSlug: null })
    .where(eq(schema.prospects.provisionedTenantSlug, slug));

  // Delete tenant (cascades to site_content)
  await db.delete(schema.tenants).where(eq(schema.tenants.id, tenant.id));

  // Optionally delete Vercel project
  if (deleteVercelProject) {
    const token = process.env.VERCEL_TOKEN;
    const team = process.env.VERCEL_TEAM_ID;
    if (token && team) {
      try {
        const url = `https://api.vercel.com/v9/projects/${slug}?teamId=${team}`;
        const r = await fetch(url, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok && r.status !== 404) {
          const body = await r.text();
          return res.json({ ok: true, vercelDeleted: false, vercelError: body });
        }
      } catch (e: any) {
        return res.json({ ok: true, vercelDeleted: false, vercelError: e.message });
      }
    }
  }

  res.json({ ok: true, vercelDeleted: !!deleteVercelProject });
}

async function handleDuplicate(req: VercelRequest, res: VercelResponse) {
  const { sourceSlug, newSlug, newName } = req.body as {
    sourceSlug?: string;
    newSlug?: string;
    newName?: string;
  };
  if (!sourceSlug || !newSlug || !newName) {
    return res.status(400).json({ error: 'sourceSlug, newSlug, newName required' });
  }

  // Validate new slug format
  if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(newSlug) || newSlug.length < 2 || newSlug.length > 48) {
    return res.status(400).json({ error: 'Slug ungültig (2-48 Zeichen, Kleinbuchstaben/Ziffern/Bindestriche)' });
  }

  // Check slug not taken
  const existing = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, newSlug) });
  if (existing) return res.status(409).json({ error: `Slug "${newSlug}" ist bereits vergeben` });

  // Load source tenant + content
  const source = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, sourceSlug) });
  if (!source) return res.status(404).json({ error: 'Quell-Tenant nicht gefunden' });

  const sourceContent = await db.query.siteContent.findFirst({
    where: eq(schema.siteContent.tenantId, source.id),
  });

  // Create new tenant (no password — must be set separately or via provision)
  const [newTenant] = await db.insert(schema.tenants)
    .values({
      slug: newSlug,
      name: newName,
      template: source.template,
      style: source.style,
    })
    .returning();

  // Copy content with updated brand name
  if (sourceContent?.data) {
    const data = { ...(sourceContent.data as Record<string, unknown>) };
    if (data.brand && typeof data.brand === 'object') {
      data.brand = { ...(data.brand as Record<string, unknown>), name: newName };
    }
    await db.insert(schema.siteContent).values({ tenantId: newTenant.id, data });
  }

  res.json({
    ok: true,
    tenant: {
      id: newTenant.id,
      slug: newTenant.slug,
      name: newTenant.name,
      template: newTenant.template,
      style: newTenant.style,
    },
  });
}
