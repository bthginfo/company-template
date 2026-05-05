import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';

/* ─── Schema ─────────────────────────────────────────────────────── */
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().default(''),
  branche: z.string().trim().max(80).optional().default(''),
  paket: z.string().trim().max(80).optional().default(''),
  subject: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().min(5).max(5000),
  // Honeypot — bots tend to fill every input.
  website: z.string().max(0).optional().default(''),
  // Source / tenant context, used in subject line.
  source: z.string().trim().max(120).optional().default(''),
  tenant: z.string().trim().max(120).optional().default(''),
  /** Additional CMS-defined fields (slug → value). */
  extras: z
    .record(z.string().max(48), z.string().max(4000))
    .optional()
    .default({})
    .superRefine((obj, ctx) => {
      const keys = Object.keys(obj);
      if (keys.length > 24) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Zu viele Zusatzfelder.' });
      }
      for (const k of keys) {
        if (!/^[a-z0-9_]+$/.test(k)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Ungültiger Zusatzfeld-Schlüssel: ${k}` });
        }
      }
    }),
});

/* ─── In-memory rate limit (per IP, best-effort) ─────────────────── */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
function rateLimited(ip: string) {
  const now = Date.now();
  const list = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  HITS.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}

/* ─── Helpers ────────────────────────────────────────────────────── */
function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
function ipFromReq(req: VercelRequest) {
  const xf = (req.headers['x-forwarded-for'] || '') as string;
  return xf.split(',')[0].trim() || (req.socket?.remoteAddress ?? 'unknown');
}

/* ─── Transporter (cached across invocations) ────────────────────── */
type MailConfig = { host: string; port: number; user: string; pass: string; from: string; to: string; autoReply: boolean };

const transporters = new Map<string, nodemailer.Transporter>();
function getTransporter(cfg: MailConfig) {
  const key = `${cfg.host}|${cfg.port}|${cfg.user}`;
  const existing = transporters.get(key);
  if (existing) return existing;
  const tx = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    requireTLS: cfg.port === 587,
    auth: { user: cfg.user, pass: cfg.pass },
  });
  transporters.set(key, tx);
  return tx;
}

/** Resolve mail config — prefer per-tenant settings, fall back to env vars. */
async function resolveMailConfig(tenantSlug: string | undefined): Promise<MailConfig | null> {
  // Try tenant-specific config first.
  if (tenantSlug) {
    try {
      const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
      if (tenant) {
        const row = await db.query.siteContent.findFirst({ where: eq(schema.siteContent.tenantId, tenant.id) });
        const m = (row?.data as any)?.mail;
        if (m && m.enabled && m.host && m.user && m.pass) {
          return {
            host: String(m.host),
            port: Number(m.port || 587),
            user: String(m.user),
            pass: String(m.pass),
            from: String(m.from || m.user),
            to: String(m.to || m.user),
            autoReply: m.autoReply !== false,
          };
        }
      }
    } catch (e) {
      console.warn('[contact] tenant lookup failed, falling back to env', e);
    }
  }

  // Platform default (env vars).
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return {
    host,
    port: Number(process.env.SMTP_PORT || 587),
    user,
    pass,
    from: process.env.MAIL_FROM || user,
    to: process.env.MAIL_TO || user,
    autoReply: process.env.MAIL_AUTOREPLY !== 'off',
  };
}

/* ─── Handler ────────────────────────────────────────────────────── */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const ip = ipFromReq(req);
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Zu viele Anfragen. Bitte später erneut versuchen.' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'Ungültige Eingabe', details: parsed.error.flatten() });
  }

  const data = parsed.data;
  // Honeypot triggered — fail silently.
  if (data.website) return res.status(200).json({ ok: true });

  // Resolve mail config: per-tenant first, fall back to env.
  const cfg = await resolveMailConfig(data.tenant);
  if (!cfg) {
    console.error('[contact] no mail config available (tenant nor env)');
    return res.status(500).json({ ok: false, error: 'Mailversand nicht konfiguriert.' });
  }

  const fromEmail = cfg.from;
  const toEmail = cfg.to;
  const brand = data.tenant || 'FlamingoMedia';
  const subject = data.subject?.trim()
    || `Neue Anfrage · ${brand}${data.paket ? ' · ' + data.paket : ''} · ${data.name}`;

  const lines = [
    ['Name', data.name],
    ['E-Mail', data.email],
    ['Telefon', data.phone],
    ['Branche', data.branche],
    ['Paket', data.paket],
    ['Quelle', data.source],
    ['Mandant', data.tenant],
    ['IP', ip],
    ...Object.entries(data.extras ?? {})
      .filter(([, v]) => String(v).trim())
      .map(([k, v]) => [`Zusatz: ${k}`, String(v)] as [string, string]),
  ].filter(([, v]) => v);

  const textBody = [
    ...lines.map(([k, v]) => `${k}: ${v}`),
    '',
    'Nachricht:',
    data.message,
  ].join('\n');

  const htmlBody = `
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse;max-width:560px">
      ${lines.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap"><strong>${esc(k)}</strong></td><td style="padding:6px 0">${esc(String(v))}</td></tr>`).join('')}
    </table>
    <h3 style="font-family:system-ui,sans-serif;margin:24px 0 8px">Nachricht</h3>
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(data.message)}</div>
  `;

  try {
    const tx = getTransporter(cfg);
    await tx.sendMail({
      from: `"${brand} Webformular" <${fromEmail}>`,
      to: toEmail,
      replyTo: `${data.name} <${data.email}>`,
      subject,
      text: textBody,
      html: htmlBody,
    });

    // Auto-reply (best-effort, non-blocking on failure).
    if (cfg.autoReply) {
      try {
        await tx.sendMail({
          from: `"${brand}" <${fromEmail}>`,
          to: data.email,
          subject: `Wir haben Ihre Nachricht erhalten · ${brand}`,
          text: `Hallo ${data.name},\n\nvielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden.\n\nIhre Nachricht:\n${data.message}\n\nHerzliche Grüße\n${brand}`,
          html: `<p style="font-family:system-ui,sans-serif">Hallo ${esc(data.name)},</p><p style="font-family:system-ui,sans-serif">vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden.</p><blockquote style="font-family:system-ui,sans-serif;border-left:3px solid #eee;padding-left:12px;color:#555;white-space:pre-wrap">${esc(data.message)}</blockquote><p style="font-family:system-ui,sans-serif">Herzliche Grüße<br/>${esc(brand)}</p>`,
        });
      } catch (e) {
        console.warn('[contact] auto-reply failed', e);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] sendMail failed', err);
    return res.status(500).json({ ok: false, error: 'Mailversand fehlgeschlagen.' });
  }
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
