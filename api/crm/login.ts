import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { createCrmCookie } from '../_lib/crm-auth.js';

const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;
function rateLimited(ip: string) {
  const now = Date.now();
  const list = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  HITS.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}
function ipFromReq(req: VercelRequest) {
  const xf = (req.headers['x-forwarded-for'] || '') as string;
  return xf.split(',')[0].trim() || (req.socket?.remoteAddress ?? 'unknown');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (rateLimited(ipFromReq(req))) {
    return res.status(429).json({ error: 'Zu viele Versuche. Bitte in einer Minute erneut versuchen.' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const password = String(body.password || '');
  if (!password) return res.status(400).json({ error: 'Passwort erforderlich' });

  const hash = process.env.CRM_PASSWORD_HASH;
  if (!hash) {
    return res.status(503).json({ error: 'CRM noch nicht konfiguriert (CRM_PASSWORD_HASH fehlt).' });
  }
  if (!(await bcrypt.compare(password, hash))) {
    return res.status(401).json({ error: 'Ungültiges Passwort' });
  }

  res.setHeader('Set-Cookie', await createCrmCookie());
  res.json({ ok: true });
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
