import type { VercelRequest, VercelResponse } from '@vercel/node';
import { asc } from 'drizzle-orm';
import { z } from 'zod';
import { db, schema } from '../../src/lib/db/client.js';
import { requireCrm } from '../_lib/crm-auth.js';

const CreateSchema = z.object({
  name: z.string().trim().min(1).max(80),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (await requireCrm(req, res)) return;

  if (req.method === 'GET') {
    const categories = await db
      .select()
      .from(schema.prospectCategories)
      .orderBy(asc(schema.prospectCategories.name));
    return res.json({ categories });
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
    const parsed = CreateSchema.safeParse(body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Ungültige Eingabe', details: parsed.error.flatten() });
    }

    const name = parsed.data.name;
    // Keep this endpoint simple and deterministic: rely on unique DB constraint.
    try {
      const [row] = await db
        .insert(schema.prospectCategories)
        .values({ name })
        .returning();
      return res.status(201).json({ category: row });
    } catch {
      return res.status(409).json({ error: 'Kategorie existiert bereits.' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
