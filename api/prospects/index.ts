import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { desc } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { requireCrm } from '../_lib/crm-auth.js';

const PROSPECT_STATUSES = ['neu', 'angefragt', 'reminder', 'angenommen', 'abgelehnt'] as const;

const CreateSchema = z.object({
  categoryId: z.preprocess((v) => (v === '' ? null : v), z.string().uuid().nullable()).optional().default(null),
  name: z.string().trim().min(1).max(160),
  company: z.string().trim().max(160).default(''),
  address: z.string().trim().max(300).default(''),
  email: z.string().trim().max(200).default('').refine(
    (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    'Ungültige E-Mail',
  ),
  websiteOld: z.string().trim().max(300).default(''),
  websiteNew: z.string().trim().max(300).default(''),
  notes: z.string().trim().max(2000).default(''),
  status: z.enum(PROSPECT_STATUSES).default('neu'),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (await requireCrm(req, res)) return;

  if (req.method === 'GET') {
    const rows = await db.select().from(schema.prospects).orderBy(desc(schema.prospects.createdAt));
    return res.json({ prospects: rows });
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
    const parsed = CreateSchema.safeParse(body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Ungültige Eingabe', details: parsed.error.flatten() });
    }
    const [row] = await db.insert(schema.prospects).values(parsed.data).returning();
    return res.status(201).json({ prospect: row });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
