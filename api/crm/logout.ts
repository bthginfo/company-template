import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearCrmCookie } from '../_lib/crm-auth.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Set-Cookie', clearCrmCookie());
  res.json({ ok: true });
}
