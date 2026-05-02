import type { VercelRequest, VercelResponse } from '@vercel/node';

let _z: any, _eq: any, _db: any, _schema: any, _requireCrm: any, _provisionTenant: any, _VALID_STYLES: any, _VALID_TEMPLATES: any;
let _initErr: string | null = null;

const _ready = Promise.all([
  import('zod').then(m => { _z = m.z; }),
  import('drizzle-orm').then(m => { _eq = m.eq; }),
  import('../../src/lib/db/client.js').then(m => { _db = m.db; _schema = m.schema; }),
  import('../_lib/crm-auth.js').then(m => { _requireCrm = m.requireCrm; }),
  import('../../src/lib/provision-core.js').then(m => { _provisionTenant = m.provisionTenant; _VALID_STYLES = m.VALID_STYLES; _VALID_TEMPLATES = m.VALID_TEMPLATES; }),
]).catch((e: any) => { _initErr = e?.stack || e?.message || String(e); console.error('[provision init]', _initErr); });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await _ready;
  if (_initErr) return res.status(500).json({ error: 'Module init failed', detail: _initErr });
  if (await _requireCrm(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? tryParse(req.body) : req.body || {};
  const id = String((req.query.id ?? body.id ?? '') as string).trim();
  if (!id) return res.status(400).json({ error: 'id missing' });

  const ProvisionSchema = _z.object({
    id: _z.string().uuid().optional(),
    slug: _z.string().trim().min(2).max(64),
    name: _z.string().trim().min(2).max(120),
    template: _z.enum(_VALID_TEMPLATES),
    style: _z.enum(_VALID_STYLES).optional(),
    password: _z.string().min(8).max(128).optional(),
    reseed: _z.boolean().optional(),
  });

  const parsed = ProvisionSchema.safeParse({ ...body, id });
  if (!parsed.success) {
    return res.status(400).json({ error: 'Ungültige Eingabe', details: parsed.error.flatten() });
  }

  const prospect = await _db.query.prospects.findFirst({ where: _eq(_schema.prospects.id, id) });
  if (!prospect) return res.status(404).json({ error: 'Prospect not found' });

  try {
    const result = await _provisionTenant({
      slug: parsed.data.slug,
      name: parsed.data.name,
      template: parsed.data.template,
      style: parsed.data.style,
      password: parsed.data.password,
      reseed: parsed.data.reseed ?? false,
      waitForBuild: false,
      onLog: () => {},
    });

    const [updated] = await _db
      .update(_schema.prospects)
      .set({
        provisionedTenantSlug: result.slug,
        updatedAt: new Date(),
      })
      .where(_eq(_schema.prospects.id, id))
      .returning();

    return res.json({ ok: true, prospect: updated, provisioning: result });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Provisioning failed' });
  }
}

function tryParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
