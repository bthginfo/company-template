/**
 * GET  /api/settings?slug=<tenant>           → public (strips sensitive fields)
 * GET  /api/settings?slug=<tenant>&admin=1   → admin only, full data incl. draft
 * GET  /api/settings?slug=<tenant>&action=generate-impressum → generates Impressum text
 * PUT  /api/settings?slug=<tenant>           → upsert settings (admin)
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';
import { encrypt, decrypt, isEncrypted } from './_lib/encrypt.js';

/** Fields that must be encrypted at rest */
const ENCRYPTED_FIELDS: { section: string; key: string }[] = [
  { section: 'mail', key: 'smtpPass' },
];

function encryptSensitiveFields(data: Record<string, unknown>): Record<string, unknown> {
  const result = structuredClone(data);
  for (const { section, key } of ENCRYPTED_FIELDS) {
    const sec = result[section] as Record<string, unknown> | undefined;
    if (sec && typeof sec[key] === 'string' && sec[key]) {
      if (!isEncrypted(sec[key] as string)) {
        sec[key] = encrypt(sec[key] as string);
      }
    }
  }
  return result;
}

function decryptSensitiveFields(data: Record<string, unknown>): Record<string, unknown> {
  const result = structuredClone(data);
  for (const { section, key } of ENCRYPTED_FIELDS) {
    const sec = result[section] as Record<string, unknown> | undefined;
    if (sec && typeof sec[key] === 'string' && sec[key]) {
      sec[key] = decrypt(sec[key] as string);
    }
  }
  return result;
}

/** Fields stripped from public GET to avoid leaking SMTP credentials */
const SMTP_SENSITIVE_KEYS = ['smtpPass', 'smtpUser', 'smtpHost'] as const;

function stripSensitive(data: Record<string, unknown>): Record<string, unknown> {
  const result = structuredClone(data);
  const mail = result.mail as Record<string, unknown> | undefined;
  if (mail) {
    for (const key of SMTP_SENSITIVE_KEYS) delete mail[key];
  }
  return result;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'PUT') return handlePut(req, res);
  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const isAdmin = req.query.admin === '1';
  if (isAdmin) {
    const session = await getSession(req);
    if (!session) return unauthorized(res);
    if (session.role === 'tenant' && session.tenantId !== tenant.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }

  const settings = await db.query.siteSettings.findFirst({
    where: eq(schema.siteSettings.tenantId, tenant.id),
  });

  if (!settings) return res.status(200).json({ settings: null });

  // Generate Impressum action (admin only)
  if (req.query.action === 'generate-impressum') {
    const session = await getSession(req);
    if (!session) return unauthorized(res);
    const data = (settings.data ?? {}) as Record<string, unknown>;
    return res.status(200).json({ impressum: generateImpressum(data) });
  }

  if (isAdmin) {
    // Decrypt sensitive fields before returning to admin
    const adminData = decryptSensitiveFields(settings.data as Record<string, unknown>);
    return res.status(200).json({ settings: { ...settings, data: adminData } });
  }

  // Public: strip sensitive fields before returning
  const publicData = stripSensitive(settings.data as Record<string, unknown>);
  return res.status(200).json({ settings: { ...settings, data: publicData, draft: undefined } });
}

async function handlePut(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const body = req.body as Record<string, unknown>;

  const existing = await db.query.siteSettings.findFirst({
    where: eq(schema.siteSettings.tenantId, tenant.id),
  });

  if (existing) {
    const update: Partial<typeof schema.siteSettings.$inferInsert> = { updatedAt: new Date() };
    if (body.data !== undefined) {
      update.data = encryptSensitiveFields(body.data as Record<string, unknown>);
    }
    if (body.draft !== undefined) update.draft = body.draft as Record<string, unknown> | null;

    const [updated] = await db
      .update(schema.siteSettings)
      .set(update)
      .where(eq(schema.siteSettings.tenantId, tenant.id))
      .returning();
    // Return decrypted data to admin UI
    const returnData = decryptSensitiveFields(updated.data as Record<string, unknown>);
    return res.status(200).json({ settings: { ...updated, data: returnData } });
  }

  const encryptedData = encryptSensitiveFields((body.data as Record<string, unknown>) ?? {});
  const [created] = await db
    .insert(schema.siteSettings)
    .values({
      tenantId: tenant.id,
      data: encryptedData,
      draft: (body.draft as Record<string, unknown>) ?? null,
    })
    .returning();
  const returnData = decryptSensitiveFields(created.data as Record<string, unknown>);
  res.status(201).json({ settings: { ...created, data: returnData } });
}

// ─── Impressum Generator ──────────────────────────────────────────────────────

function generateImpressum(data: Record<string, unknown>): string {
  const l = (data.legal ?? {}) as Record<string, string>;
  const b = (data.brand ?? {}) as Record<string, string>;
  const c = (data.contact ?? {}) as Record<string, string>;

  const name = l.companyName || b.name || '';
  const form = l.companyForm || '';
  const regNumber = l.companyRegNumber || '';
  const regCourt = l.companyRegCourt || '';
  const vatId = l.vatId || '';
  const address = l.address || c.address || '';
  const city = l.city || c.city || '';
  const country = l.country || 'AT';
  const phone = l.phone || c.phone || '';
  const email = l.email || c.email || '';
  const tradeAuthority = l.tradeAuthority || '';
  const tradeRegulation = l.tradeRegulation || 'GewO 1994';
  const responsiblePerson = l.responsiblePerson || name;

  const lines: string[] = [];

  lines.push('## Impressum');
  lines.push('');
  lines.push(`**${name}${form ? ` ${form}` : ''}**`);
  if (address) lines.push(address);
  if (city) lines.push(city);
  if (country) lines.push(country);
  lines.push('');

  if (phone) lines.push(`Telefon: ${phone}`);
  if (email) lines.push(`E-Mail: ${email}`);
  lines.push('');

  if (regNumber || regCourt) {
    lines.push('**Unternehmensregistrierung**');
    if (regNumber) lines.push(`Firmenbuchnummer: ${regNumber}`);
    if (regCourt) lines.push(`Firmenbuchgericht: ${regCourt}`);
    lines.push('');
  }

  if (vatId) {
    lines.push(`**UID-Nummer:** ${vatId}`);
    lines.push('');
  }

  if (tradeAuthority) {
    lines.push('**Gewerbebehörde**');
    lines.push(tradeAuthority);
    lines.push(`Anwendbare Rechtsvorschriften: ${tradeRegulation}`);
    lines.push('');
  }

  lines.push('**Verantwortlich für den Inhalt**');
  lines.push(responsiblePerson);
  lines.push('');

  lines.push('---');
  lines.push('');
  lines.push('*Dieses Impressum wurde automatisch generiert. Bitte überprüfe alle Angaben auf Vollständigkeit und rechtliche Korrektheit.*');

  return lines.join('\n');
}
