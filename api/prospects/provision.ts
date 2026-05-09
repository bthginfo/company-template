import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { VALID_STYLES, VALID_TEMPLATES } from '../../src/lib/provision-core.js';
import { requireCrm } from '../_lib/crm-auth.js';
import { provisionErrorResponse } from '../_lib/provision-error.js';

export const config = {
  maxDuration: 60,
};

const ProvisionSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().trim().min(2).max(64),
  name: z.string().trim().min(2).max(120),
  template: z.enum(VALID_TEMPLATES),
  style: z.enum(VALID_STYLES).optional(),
  password: z.string().min(8).max(128).optional(),
  reseed: z.boolean().optional(),
  dbOnly: z.boolean().optional(),
  contentJson: z.record(z.unknown()).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const provisioningLog: string[] = [];
  let id = '';
  let slug = '';

  try {
    if (await requireCrm(req, res)) return;

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = typeof req.body === 'string' ? tryParse(req.body) : req.body || {};
    id = String((req.query.id ?? body.id ?? '') as string).trim();
    if (!id) return res.status(400).json({ error: 'id missing' });

    const parsed = ProvisionSchema.safeParse({ ...body, id });
    if (!parsed.success) {
      return res.status(400).json({ error: 'Ungültige Eingabe', details: parsed.error.flatten() });
    }
    slug = parsed.data.slug;

    const prospect = await db.query.prospects.findFirst({ where: eq(schema.prospects.id, id) });
    if (!prospect) return res.status(404).json({ error: 'Prospect not found' });

    const { provisionTenant } = await import('../../src/lib/provision-core.js');
    const result = await provisionTenant({
      slug: parsed.data.slug,
      name: parsed.data.name,
      template: parsed.data.template,
      style: parsed.data.style,
      password: parsed.data.password,
      reseed: parsed.data.reseed ?? false,
      dbOnly: parsed.data.dbOnly ?? false,
      waitForBuild: false,
      onLog: (line) => provisioningLog.push(line),
    });

    let contentImport: { ok: true; branch: string; style: string } | { ok: false; error: string } | null = null;
    if (parsed.data.contentJson) {
      try {
        const { importContentJson } = await import('../../src/lib/content-import.js');
        const imported = await importContentJson(result.slug, parsed.data.contentJson);
        contentImport = { ok: true, ...imported };
      } catch (e: unknown) {
        contentImport = { ok: false, error: e instanceof Error ? e.message : 'Content import failed' };
      }
    }

    const [updated] = await db
      .update(schema.prospects)
      .set({
        provisionedTenantSlug: result.slug,
        updatedAt: new Date(),
      })
      .where(eq(schema.prospects.id, id))
      .returning();

    return res.json({ ok: true, prospect: updated, provisioning: result, contentImport });
  } catch (e) {
    const out = provisionErrorResponse(e, provisioningLog);
    console.error('[prospects/provision] failed', {
      id,
      slug,
      category: out.body.category,
      error: out.body.error,
      provisioningLog,
    });
    return res.status(out.status).json(out.body);
  }
}

function tryParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
