import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { requireCrm } from '../_lib/crm-auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (await requireCrm(req, res)) return;

  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = String((req.query.id ?? '') as string);
  if (!id) return res.status(400).json({ error: 'id missing' });

  const rows = await db.delete(schema.prospectCategories).where(eq(schema.prospectCategories.id, id)).returning();
  if (rows.length === 0) return res.status(404).json({ error: 'not found' });
  return res.json({ ok: true });
}
