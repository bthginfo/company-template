import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { SiteContentSchema, type SiteContent } from '../src/lib/types.js';
import { defaultsFor } from '../src/lib/provision-core.js';
import { buildModularPagesV2FromLegacy } from '../src/lib/cms-v2-hydration.js';
import type { TemplateKey } from '../src/lib/types.js';
import type { TemplateStyle } from '../src/lib/branch-config.js';
import { getSession, unauthorized } from './_lib/auth.js';

/**
 * GET  /api/content?slug=xxx            → public, returns live site content
 * GET  /api/content?slug=xxx&preview=1  → admin only, returns draft (falls back to live)
 * PUT  /api/content?slug=xxx            → admin only, writes validated content to `draft` only (live `data` unchanged until publish)
 * POST /api/content?slug=xxx&action=publish  → admin only, copies draft → data, clears draft
 * POST /api/content?slug=xxx&action=discard  → admin only, clears draft
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'PUT') return handlePut(req, res);
  if (req.method === 'POST') return handlePost(req, res);
  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, slug),
  });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const content = await db.query.siteContent.findFirst({
    where: eq(schema.siteContent.tenantId, tenant.id),
  });

  const isPreview = req.query.preview === '1';
  let responseContent = content?.data ? normalizeTenantCmsV2(content.data as SiteContent, tenant.template, tenant.style) : null;
  const hasDraft = !!content?.draft;

  if (isPreview) {
    const session = await getSession(req);
    if (!session || (session.role === 'tenant' && session.tenantId !== tenant.id)) {
      return res.status(403).json({ error: 'Preview requires admin session' });
    }
    if (content?.draft) {
      responseContent = normalizeTenantCmsV2(content.draft as SiteContent, tenant.template, tenant.style);
    }
  }

  if (!isPreview) {
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
  }

  res.json({
    tenant: { slug: tenant.slug, name: tenant.name, template: tenant.template, style: tenant.style },
    content: responseContent,
    hasDraft,
  });
}

async function handlePut(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, slug),
  });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  if (session.role === 'tenant' && session.tenantId !== tenant.id) {
    return res.status(403).json({
      error: 'Diese Sitzung gehört zu einem anderen Mandanten. Bitte abmelden und neu anmelden.',
    });
  }

  const existing = await db.query.siteContent.findFirst({
    where: eq(schema.siteContent.tenantId, tenant.id),
  });

  const parse = SiteContentSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid content', details: parse.error.flatten() });
  }
  const normalizedDraft = normalizeTenantCmsV2(
    normalizeMailSecret(parse.data, (existing?.draft ?? existing?.data) as SiteContent | undefined),
    tenant.template,
    tenant.style,
  );

  if (!existing) {
    const liveSeed = defaultsFor(
      tenant.template as Parameters<typeof defaultsFor>[0],
      tenant.name,
      undefined,
      tenant.style as Parameters<typeof defaultsFor>[3],
    );
    await db.insert(schema.siteContent).values({
      tenantId: tenant.id,
      data: liveSeed,
      draft: normalizedDraft,
    });
  } else {
    await db
      .update(schema.siteContent)
      .set({ draft: normalizedDraft, updatedAt: new Date() })
      .where(eq(schema.siteContent.tenantId, tenant.id));
  }

  res.json({ ok: true });
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const slug = String(req.query.slug || '');
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, slug),
  });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  if (session.role === 'tenant' && session.tenantId !== tenant.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const action = String(req.query.action || '');

  if (action === 'publish') {
    const content = await db.query.siteContent.findFirst({
      where: eq(schema.siteContent.tenantId, tenant.id),
    });
    if (!content?.draft) {
      return res.status(400).json({ error: 'No draft to publish' });
    }
    await db
      .update(schema.siteContent)
      .set({ data: normalizeTenantCmsV2(content.draft as SiteContent, tenant.template, tenant.style), draft: null, updatedAt: new Date() })
      .where(eq(schema.siteContent.tenantId, tenant.id));
    return res.json({ ok: true });
  }

  if (action === 'discard') {
    await db
      .update(schema.siteContent)
      .set({ draft: null, updatedAt: new Date() })
      .where(eq(schema.siteContent.tenantId, tenant.id));
    return res.json({ ok: true });
  }

  res.status(400).json({ error: 'Unknown action' });
}

const MAIL_SECRET_PREFIX = 'enc:v1:';
const TEMPLATE_KEYS: readonly TemplateKey[] = ['restaurant', 'hotel', 'tourism', 'salon', 'tradesman', 'consulting', 'medical', 'fitness'];
const STYLES: readonly TemplateStyle[] = ['classic', 'modern', 'bold'];

function asTemplateKey(value: string): TemplateKey {
  return (TEMPLATE_KEYS as readonly string[]).includes(value) ? (value as TemplateKey) : 'restaurant';
}

function asTemplateStyle(value: string): TemplateStyle {
  return (STYLES as readonly string[]).includes(value) ? (value as TemplateStyle) : 'classic';
}

function normalizeTenantCmsV2(content: SiteContent, templateValue: string, styleValue: string): SiteContent {
  const template = asTemplateKey(templateValue);
  const style = asTemplateStyle(styleValue);
  const current = content.modularPagesV2;
  const modularPagesV2 = current?.combo?.template === template && current.combo.style === style
    ? current
    : buildModularPagesV2FromLegacy(content, template, style);
  return SiteContentSchema.parse({
    ...content,
    cmsV2: { ...(content.cmsV2 ?? {}), enabled: true },
    modularPagesV2,
  });
}

function cryptoKey(): Buffer {
  return crypto.createHash('sha256').update(process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD_HASH || 'dev-secret').digest();
}

function encryptMailSecret(value: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', cryptoKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${MAIL_SECRET_PREFIX}${Buffer.concat([iv, tag, encrypted]).toString('base64url')}`;
}

function normalizeMailSecret(next: SiteContent, previous?: SiteContent): SiteContent {
  const mail = next.mail;
  if (!mail) return next;
  const pass = String(mail.pass || '');
  const previousMail = previous?.mail;
  const preservedRaw = previousMail?.passEnc || previousMail?.pass || '';
  const preserved = preservedRaw && !String(preservedRaw).startsWith(MAIL_SECRET_PREFIX) ? encryptMailSecret(String(preservedRaw)) : preservedRaw;
  const passEnc = pass
    ? (pass.startsWith(MAIL_SECRET_PREFIX) ? pass : encryptMailSecret(pass))
    : preserved;
  return {
    ...next,
    mail: {
      ...mail,
      pass: '',
      passEnc,
    },
  };
}
