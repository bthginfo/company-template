import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSession, unauthorized } from '../_lib/auth.js';
import { importContentJson } from '../../src/lib/content-import.js';

/**
 * POST /api/admin/import-content?slug=xxx
 *
 * Accepts a JSON content payload (from the Perplexity template) and
 * deep-merges it into the tenant's existing site content.
 *
 * Auth: super-admin OR matching tenant session.
 *
 * Body: JSON with `branch`, `style`, and all content fields.
 * Fields starting with `_` are stripped (template metadata).
 * Subpage fields nested under `_subpage_*` are hoisted to top-level.
 * Empty strings and empty arrays are skipped (keep existing content).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug query param required' });

  // Tenant role can only import to own tenant
  if (session.role === 'tenant' && session.slug !== slug) {
    return res.status(403).json({ error: 'Zugriff verweigert.' });
  }

  const raw = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  if (!raw || typeof raw !== 'object') {
    return res.status(400).json({ error: 'JSON body required' });
  }

  try {
    const result = await importContentJson(slug, raw);
    res.json({ ok: true, ...result });
  } catch (e: any) {
    const status = e.message?.includes('not found') ? 404 : 400;
    res.status(status).json({ error: e.message });
  }
}
