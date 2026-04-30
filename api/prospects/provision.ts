import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { requireCrm } from '../_lib/crm-auth.js';
import { provisionTenant, VALID_STYLES, VALID_TEMPLATES } from '../../src/lib/provision-core.js';

const ProvisionSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().trim().min(2).max(64),
  name: z.string().trim().min(2).max(120),
  template: z.enum(VALID_TEMPLATES),
  style: z.enum(VALID_STYLES).optional(),
  reseed: z.boolean().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (await requireCrm(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? tryParse(req.body) : req.body || {};
  const id = String((req.query.id ?? body.id ?? '') as string).trim();
  if (!id) return res.status(400).json({ error: 'id missing' });

  const parsed = ProvisionSchema.safeParse({ ...body, id });
  if (!parsed.success) {
    return res.status(400).json({ error: 'Ungültige Eingabe', details: parsed.error.flatten() });
  }

  const prospect = await db.query.prospects.findFirst({ where: eq(schema.prospects.id, id) });
  if (!prospect) return res.status(404).json({ error: 'Prospect not found' });

  try {
    const result = await provisionTenant({
      slug: parsed.data.slug,
      name: parsed.data.name,
      template: parsed.data.template,
      style: parsed.data.style,
      reseed: parsed.data.reseed ?? false,
      waitForBuild: false,
      onLog: () => {},
    });

    const [updated] = await db
      .update(schema.prospects)
      .set({
        provisionedTenantSlug: result.slug,
        updatedAt: new Date(),
      })
      .where(eq(schema.prospects.id, id))
      .returning();

    return res.json({ ok: true, prospect: updated, provisioning: result });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Provisioning failed' });
  }
}

function tryParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
