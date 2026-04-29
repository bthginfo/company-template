/**
 * CRM auth — separate cookie/session from the per-tenant admin auth.
 *
 * Used only on the showcase deployment to protect /flamingo-crm.
 * Single shared password (CRM_PASSWORD_HASH env var) — no per-user accounts;
 * Mario and the founders share access. JWT signed with AUTH_SECRET so we
 * don't introduce a new secret material.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SignJWT, jwtVerify } from 'jose';

const COOKIE = 'bth_crm';
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days — sales work is bursty, force re-auth periodically

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error('AUTH_SECRET is not set');
  return new TextEncoder().encode(s);
}

export type CrmSession = { role: 'crm'; iat: number };

export async function createCrmCookie(): Promise<string> {
  const token = await new SignJWT({ role: 'crm' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  return `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}`;
}

export function clearCrmCookie(): string {
  return `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export async function getCrmSession(req: VercelRequest): Promise<CrmSession | null> {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.split(/;\s*/).find((c) => c.startsWith(`${COOKIE}=`));
  if (!match) return null;
  const token = match.slice(COOKIE.length + 1);
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.role !== 'crm') return null;
    return { role: 'crm', iat: (payload.iat as number) || 0 };
  } catch {
    return null;
  }
}

/** Guard for CRM API routes. Returns true if the request was rejected. */
export async function requireCrm(req: VercelRequest, res: VercelResponse): Promise<boolean> {
  const sess = await getCrmSession(req);
  if (!sess) {
    res.status(401).json({ error: 'Unauthorized' });
    return true;
  }
  return false;
}
