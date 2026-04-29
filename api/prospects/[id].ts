import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { requireCrm } from '../_lib/crm-auth.js';

const PROSPECT_STATUSES = ['neu', 'angefragt', 'reminder', 'angenommen', 'abgelehnt'] as const;

const PatchSchema = z.object({
  name: z.string().trim().min(1).max(160).optional(),
  company: z.string().trim().max(160).optional(),
  address: z.string().trim().max(300).optional(),
  email: z.string().trim().max(200).optional().refine(
    (v) => v === undefined || v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    'Ungültige E-Mail',
  ),
  websiteOld: z.string().trim().max(300).optional(),
  websiteNew: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(2000).optional(),
  status: z.enum(PROSPECT_STATUSES).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (await requireCrm(req, res)) return;

  const id = String((req.query.id ?? '') as string);
  if (!id) return res.status(400).json({ error: 'id missing' });

  if (req.method === 'GET') {
    const row = await db.query.prospects.findFirst({ where: eq(schema.prospects.id, id) });
    if (!row) return res.status(404).json({ error: 'not found' });
    return res.json({ prospect: row });
  }

  if (req.method === 'PATCH') {
    const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
    const parsed = PatchSchema.safeParse(body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Ungültige Eingabe', details: parsed.error.flatten() });
    }
    const [row] = await db
      .update(schema.prospects)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(schema.prospects.id, id))
      .returning();
    if (!row) return res.status(404).json({ error: 'not found' });
    return res.json({ prospect: row });
  }

  if (req.method === 'DELETE') {
    const result = await db.delete(schema.prospects).where(eq(schema.prospects.id, id)).returning();
    if (result.length === 0) return res.status(404).json({ error: 'not found' });
    return res.json({ ok: true });
  }

  res.setHeader('Allow', 'GET, PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
