import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { getSession, unauthorized } from '../_lib/auth.js';

const VALID_STYLES = ['classic', 'modern', 'bold'] as const;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const { style } = req.body ?? {};
  if (!style || !VALID_STYLES.includes(style)) {
    return res.status(400).json({ error: 'Invalid style. Must be classic, modern, or bold.' });
  }

  // Resolve tenant
  const slug = session.slug;
  if (!slug) return res.status(400).json({ error: 'No tenant in session' });

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, slug),
  });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  // Tenant role can only change own style
  if (session.role === 'tenant' && session.tenantId !== tenant.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  await db.update(schema.tenants).set({ style }).where(eq(schema.tenants.id, tenant.id));

  res.json({ ok: true, style });
}
