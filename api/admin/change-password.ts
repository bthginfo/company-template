import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { getSession, createSessionCookie } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getSession(req);
  if (!session || session.role !== 'tenant' || !session.tenantId) {
    return res.status(401).json({ error: 'Nicht angemeldet.' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const current = String(body.current || '');
  const next = String(body.next || '');

  if (!current || !next) {
    return res.status(400).json({ error: 'Bitte aktuelles und neues Passwort angeben.' });
  }
  if (next.length < 8) {
    return res.status(400).json({ error: 'Das neue Passwort muss mindestens 8 Zeichen lang sein.' });
  }
  if (next === current) {
    return res.status(400).json({ error: 'Das neue Passwort muss sich vom aktuellen unterscheiden.' });
  }

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.id, session.tenantId),
  });
  if (!tenant || !tenant.passwordHash) {
    return res.status(404).json({ error: 'Konto nicht gefunden.' });
  }

  if (!(await bcrypt.compare(current, tenant.passwordHash))) {
    return res.status(401).json({ error: 'Aktuelles Passwort stimmt nicht.' });
  }

  const newHash = await bcrypt.hash(next, 10);
  await db
    .update(schema.tenants)
    .set({ passwordHash: newHash })
    .where(eq(schema.tenants.id, tenant.id));

  // Refresh session cookie so the user stays logged in.
  res.setHeader(
    'Set-Cookie',
    await createSessionCookie({ role: 'tenant', tenantId: tenant.id, slug: tenant.slug }),
  );
  res.json({ ok: true });
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
