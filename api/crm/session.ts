import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCrmSession } from '../_lib/crm-auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = await getCrmSession(req);
  if (!session) return res.status(401).json({ authenticated: false });
  res.json({ authenticated: true });
}
