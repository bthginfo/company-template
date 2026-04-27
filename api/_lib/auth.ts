import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db, schema } from '../../src/lib/db/client';
import { eq } from 'drizzle-orm';

export async function getSessionUser(req: VercelRequest) {
  const cookieHeader = req.headers.cookie || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(/;\s*/).map((c) => {
      const i = c.indexOf('=');
      return i === -1 ? [c, ''] : [c.slice(0, i), decodeURIComponent(c.slice(i + 1))];
    })
  );
  const token =
    cookies['authjs.session-token'] || cookies['__Secure-authjs.session-token'];
  if (!token) return null;

  const rows = await db
    .select({
      userId: schema.sessions.userId,
      expires: schema.sessions.expires,
      tenantId: schema.users.tenantId,
      email: schema.users.email,
    })
    .from(schema.sessions)
    .innerJoin(schema.users, eq(schema.users.id, schema.sessions.userId))
    .where(eq(schema.sessions.sessionToken, token))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  if (row.expires < new Date()) return null;
  return {
    id: row.userId,
    email: row.email,
    tenantId: row.tenantId,
  };
}

export function unauthorized(res: VercelResponse) {
  res.status(401).json({ error: 'Unauthorized' });
}

export function forbidden(res: VercelResponse) {
  res.status(403).json({ error: 'Forbidden' });
}
