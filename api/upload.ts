import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import { getSession, unauthorized } from './_lib/auth.js';

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('[api/upload] BLOB_READ_WRITE_TOKEN is not configured');
    return res.status(500).json({
      error: 'Blob-Speicher ist nicht konfiguriert. Bitte BLOB_READ_WRITE_TOKEN in den Vercel-Umgebungsvariablen setzen.',
    });
  }

  const filename = String(req.query.filename || `upload-${Date.now()}`);
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const scope = session.tenantId ?? 'super';
  const key = `tenants/${scope}/${Date.now()}-${safeName}`;

  try {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const body = Buffer.concat(chunks);

    if (body.length === 0) {
      return res.status(400).json({ error: 'Datei ist leer.' });
    }

    const blob = await put(key, body, {
      access: 'public',
      contentType: req.headers['content-type'] || 'application/octet-stream',
      token,
    });

    res.json({ url: blob.url });
  } catch (e: any) {
    const message = e?.message || String(e);
    console.error('[api/upload] put failed:', message, e);
    return res.status(500).json({ error: `Upload fehlgeschlagen: ${message}` });
  }
}
