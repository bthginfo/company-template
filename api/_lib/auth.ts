import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SignJWT, jwtVerify } from 'jose';

const COOKIE = 'bth_session';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error('AUTH_SECRET is not set');
  return new TextEncoder().encode(s);
}

export type Session = {
  role: 'super' | 'tenant';
  tenantId: string | null;
  slug: string | null;
};

export async function createSessionCookie(session: Session): Promise<string> {
  const token = await new SignJWT({ ...session })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  return `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}`;
}

export function clearCookie(): string {
  return `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export async function getSession(req: VercelRequest): Promise<Session | null> {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.split(/;\s*/).find((c) => c.startsWith(`${COOKIE}=`));
  if (!match) return null;
  const token = match.slice(COOKIE.length + 1);
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      role: payload.role as 'super' | 'tenant',
      tenantId: (payload.tenantId as string) ?? null,
      slug: (payload.slug as string) ?? null,
    };
  } catch {
    return null;
  }
}

export function unauthorized(res: VercelResponse) {
  res.status(401).json({ error: 'Unauthorized' });
}
export function forbidden(res: VercelResponse) {
  res.status(403).json({ error: 'Forbidden' });
}
