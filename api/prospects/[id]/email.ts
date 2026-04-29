/**
 * Send a CRM outreach (or reminder) email to a prospect via the platform SMTP.
 *
 * Reads SMTP config from env (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`,
 * `MAIL_FROM`). Operator passes in subject + body (text); we wrap them in the
 * branded HTML template with the FlamingoMedia signature + inline logo.
 *
 * On success, the prospect's status is set to 'angefragt' (or 'reminder' if
 * the request was a reminder), `lastEmailedAt` is updated, and the last
 * subject/body are stored so the next reminder can be pre-filled.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../../src/lib/db/client.js';
import { requireCrm } from '../../_lib/crm-auth.js';
import { renderProspectEmail } from '../../_lib/email-template.js';

const SendSchema = z.object({
  subject: z.string().trim().min(2).max(200),
  body: z.string().trim().min(2).max(8000),
  /** 'initial' marks the first outreach (status → angefragt); 'reminder' → reminder. */
  kind: z.enum(['initial', 'reminder']).default('initial'),
  /** Optional: explicitly override the recipient. Defaults to the prospect's stored email. */
  to: z.string().trim().max(200).optional(),
});

let cachedTx: nodemailer.Transporter | null = null;
function getTransporter() {
  if (cachedTx) return cachedTx;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) throw new Error('SMTP_HOST/SMTP_USER/SMTP_PASS nicht konfiguriert');
  const port = Number(process.env.SMTP_PORT || 587);
  cachedTx = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
  });
  return cachedTx;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (await requireCrm(req, res)) return;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = String((req.query.id ?? '') as string);
  if (!id) return res.status(400).json({ error: 'id missing' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const parsed = SendSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Ungültige Eingabe', details: parsed.error.flatten() });
  }

  const prospect = await db.query.prospects.findFirst({ where: eq(schema.prospects.id, id) });
  if (!prospect) return res.status(404).json({ error: 'Prospect not found' });

  const recipient = (parsed.data.to || prospect.email || '').trim();
  if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
    return res.status(400).json({ error: 'Keine gültige Empfänger-Adresse hinterlegt.' });
  }

  let tx: nodemailer.Transporter;
  try {
    tx = getTransporter();
  } catch (e: any) {
    return res.status(503).json({ error: e?.message || 'SMTP nicht konfiguriert' });
  }

  const rendered = renderProspectEmail({
    subject: parsed.data.subject,
    body: parsed.data.body,
    recipientName: prospect.name,
  });

  const fromAddr = process.env.MAIL_FROM || process.env.SMTP_USER!;
  const fromHeader = `FlamingoMedia <${fromAddr}>`;

  try {
    await tx.sendMail({
      from: fromHeader,
      to: recipient,
      subject: rendered.subject,
      text: rendered.text,
      html: rendered.html,
      attachments: rendered.attachments,
      headers: {
        'X-Entity-Ref-ID': prospect.id,
      },
    });
  } catch (e: any) {
    return res.status(502).json({ error: 'Mailversand fehlgeschlagen', details: String(e?.message || e) });
  }

  const nextStatus = parsed.data.kind === 'reminder' ? 'reminder' : 'angefragt';
  const [updated] = await db
    .update(schema.prospects)
    .set({
      status: nextStatus,
      lastEmailSubject: rendered.subject,
      lastEmailBody: parsed.data.body,
      lastEmailedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(schema.prospects.id, id))
    .returning();

  return res.json({ ok: true, prospect: updated });
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
