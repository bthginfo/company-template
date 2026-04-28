import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getSession, unauthorized } from './_lib/auth.js';

/**
 * Direct client-upload handler.
 *
 * The browser uses `upload()` from `@vercel/blob/client` and POSTs to this
 * endpoint to obtain a short-lived client token. The actual file bytes go
 * direct from browser to Vercel Blob storage — bypassing the serverless
 * function's 4.5 MB request-body limit (which caused 413 errors on large
 * phone photos).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getSession(req);
  if (!session) return unauthorized(res);

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('[api/upload] BLOB_READ_WRITE_TOKEN is not configured');
    return res.status(500).json({
      error: 'Blob-Speicher ist nicht konfiguriert. Bitte BLOB_READ_WRITE_TOKEN in den Vercel-Umgebungsvariablen setzen.',
    });
  }

  const scope = session.tenantId ?? 'super';

  try {
    const body = req.body as HandleUploadBody;
    const json = await handleUpload({
      body,
      request: req as any,
      onBeforeGenerateToken: async (pathname) => {
        // Restrict file types and size; namespace under tenant.
        const safeName = pathname.replace(/[^a-zA-Z0-9._/-]/g, '_');
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
          maximumSizeInBytes: 1.5 * 1024 * 1024, // 1.5 MB hard cap (performance budget)
          tokenPayload: JSON.stringify({ tenantId: scope, name: safeName }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Hook for analytics / cleanup. Intentionally no-op.
        console.log('[api/upload] completed', blob.url, tokenPayload);
      },
    });
    return res.json(json);
  } catch (e: any) {
    const message = e?.message || String(e);
    console.error('[api/upload] handleUpload failed:', message, e);
    return res.status(400).json({ error: `Upload fehlgeschlagen: ${message}` });
  }
}

