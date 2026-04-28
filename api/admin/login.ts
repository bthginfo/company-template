import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { createSessionCookie } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const password = String(body.password || '');
  if (!password) return res.status(400).json({ error: 'Password required' });

  // Super-admin password (env var) — works on any tenant deployment.
  const superHash = process.env.ADMIN_PASSWORD_HASH;
  if (superHash && (await bcrypt.compare(password, superHash))) {
    res.setHeader('Set-Cookie', await createSessionCookie({ role: 'super', tenantId: null, slug: null }));
    return res.json({ role: 'super' });
  }

  // Tenant password — looks up the tenant configured for THIS deployment.
  const slug = process.env.TENANT_SLUG;
  if (!slug) return res.status(401).json({ error: 'Invalid credentials' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  if (!tenant || !tenant.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });
  if (!(await bcrypt.compare(password, tenant.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.setHeader('Set-Cookie', await createSessionCookie({ role: 'tenant', tenantId: tenant.id, slug: tenant.slug }));
  res.json({ role: 'tenant' });
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
