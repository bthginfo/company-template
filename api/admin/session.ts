import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSession } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  res.json({ session });
}
