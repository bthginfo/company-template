import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/lib/db/client.js';
import { getSession, unauthorized } from '../_lib/auth.js';

type MailConfig = { host: string; port: number; user: string; pass: string; from: string; to: string };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const slug = String(req.query.slug || session.slug || '');
  if (!slug) return res.status(400).json({ ok: false, error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  if (!tenant) return res.status(404).json({ ok: false, error: 'Tenant not found' });
  if (session.role === 'tenant' && session.tenantId !== tenant.id) {
    return res.status(403).json({ ok: false, error: 'Forbidden' });
  }

  const row = await db.query.siteContent.findFirst({ where: eq(schema.siteContent.tenantId, tenant.id) });
  const content = (row?.draft ?? row?.data) as Record<string, unknown> | undefined;
  const cfg = readTenantMailConfig(content);
  if (!cfg) return res.status(400).json({ ok: false, error: 'Mail-Server ist im Entwurf nicht vollständig konfiguriert.' });

  try {
    const tx = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.port === 465,
      requireTLS: cfg.port === 587,
      auth: { user: cfg.user, pass: cfg.pass },
    });
    await tx.sendMail({
      from: `"${tenant.name} Admin-Test" <${cfg.from}>`,
      to: cfg.to,
      subject: `Test-Mail · ${tenant.name}`,
      text: 'Dies ist eine Test-Nachricht aus dem Admin. Wenn Sie diese Mail erhalten, funktioniert Ihr Postausgang korrekt.',
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('[admin/test-mail] failed', err);
    return res.status(500).json({ ok: false, error: 'Test-Mail konnte nicht versendet werden.' });
  }
}

function readTenantMailConfig(content: Record<string, unknown> | undefined): MailConfig | null {
  const mail = content?.mail;
  if (!mail || typeof mail !== 'object') return null;
  const m = mail as Record<string, unknown>;
  const pass = readMailSecret(m);
  if (!m.enabled || !m.host || !m.user || !pass) return null;
  return {
    host: String(m.host),
    port: Number(m.port || 587),
    user: String(m.user),
    pass,
    from: String(m.from || m.user),
    to: String(m.to || m.user),
  };
}

const MAIL_SECRET_PREFIX = 'enc:v1:';

function cryptoKey(): Buffer {
  return crypto.createHash('sha256').update(process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD_HASH || 'dev-secret').digest();
}

function decryptMailSecret(value: string): string {
  if (!value.startsWith(MAIL_SECRET_PREFIX)) return value;
  const packed = Buffer.from(value.slice(MAIL_SECRET_PREFIX.length), 'base64url');
  const iv = packed.subarray(0, 12);
  const tag = packed.subarray(12, 28);
  const encrypted = packed.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', cryptoKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}

function readMailSecret(mail: Record<string, unknown>): string {
  const raw = String(mail.passEnc || mail.pass || '');
  if (!raw) return '';
  try {
    return decryptMailSecret(raw);
  } catch {
    return '';
  }
}
