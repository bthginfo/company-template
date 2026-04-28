import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearCookie } from '../_lib/auth.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Set-Cookie', clearCookie());
  res.json({ ok: true });
}
