import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import { getSession, unauthorized } from './_lib/auth.js';

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const filename = String(req.query.filename || `upload-${Date.now()}`);
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const scope = session.tenantId ?? 'super';
  const key = `tenants/${scope}/${Date.now()}-${safeName}`;

  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const body = Buffer.concat(chunks);

  const blob = await put(key, body, {
    access: 'public',
    contentType: req.headers['content-type'] || 'application/octet-stream',
  });

  res.json({ url: blob.url });
}
