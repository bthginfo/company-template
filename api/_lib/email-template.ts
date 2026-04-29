/**
 * Branded HTML email template used by the CRM for prospect outreach.
 *
 * Strategy:
 *  - User-editable subject + body (plain text with optional simple line breaks)
 *  - Wrapped in a tasteful HTML shell with the FlamingoMedia signature
 *  - Logo embedded as inline CID attachment (works in Gmail, Outlook, Apple Mail
 *    without remote image blocking)
 *  - Always includes a plain-text fallback for accessibility + spam scoring
 */
import { readFileSync } from 'fs';
import { join } from 'path';

export type SignatureContact = {
  name: string;
  role?: string;
  emailDe: string;
  emailAt?: string;
  phoneDe?: string;
  phoneAt?: string;
  website?: string;
};

const DEFAULT_SIGNATURE: SignatureContact = {
  name: 'Julian von Ingelheim',
  role: 'FlamingoMedia · Innsbruck',
  emailDe: 'hello@flamingomedia.online',
  phoneDe: '+49 1515 5338029',
  phoneAt: '+43 677 6368 1543',
  website: 'https://flamingomedia.online',
};

/** Convert plain-text body (with line breaks + paragraph breaks) into safe HTML. */
function textToHtml(plain: string): string {
  const escaped = plain
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  // Auto-link http(s) URLs.
  const linked = escaped.replace(
    /(https?:\/\/[^\s<]+[^\s<.,;:!?'"()\]])/g,
    '<a href="$1" style="color:#F24171;text-decoration:underline" target="_blank" rel="noopener">$1</a>',
  );
  // Paragraphs split by blank lines, single newlines become <br>.
  const paragraphs = linked.split(/\n{2,}/).map((p) => `<p style="margin:0 0 14px;line-height:1.55">${p.replace(/\n/g, '<br>')}</p>`);
  return paragraphs.join('\n');
}

export type RenderedEmail = {
  subject: string;
  html: string;
  text: string;
  attachments: Array<{ filename: string; path?: string; content?: Buffer; cid: string; contentType?: string }>;
};

/** Locate the public Flamingo logo on disk so we can attach it inline. */
function readLogoBuffer(): { buffer: Buffer; filename: string } | null {
  // Vercel bundles include /public via `vercel.json` rewrites, but at runtime
  // serverless functions can't read /public directly. We bundle the logo as
  // a relative path resolved from the workspace root at deploy time.
  const candidates = [
    join(process.cwd(), 'public', 'brand', 'flamingo-full.png'),
    join(process.cwd(), 'public', 'brand', 'flamingo-full-beside.png'),
  ];
  for (const p of candidates) {
    try {
      const buf = readFileSync(p);
      return { buffer: buf, filename: p.split(/[\\/]/).pop() || 'flamingo-full.png' };
    } catch {
      // try next
    }
  }
  return null;
}

export function renderProspectEmail(opts: {
  subject: string;
  body: string;
  recipientName?: string;
  signature?: Partial<SignatureContact>;
}): RenderedEmail {
  const sig: SignatureContact = { ...DEFAULT_SIGNATURE, ...(opts.signature || {}) };
  const logoCid = `flamingo-logo@flamingomedia.online`;
  const logo = readLogoBuffer();

  const sigHtml = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border-top:1px solid #f1d6df;padding-top:18px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:#5a4651;line-height:1.5">
      <tr>
        ${logo ? `<td style="vertical-align:top;padding-right:14px;width:96px"><img src="cid:${logoCid}" alt="FlamingoMedia" width="86" style="display:block;border:0;outline:none;text-decoration:none;height:auto;width:86px;max-width:86px"></td>` : ''}
        <td style="vertical-align:top">
          <div style="font-weight:600;color:#14111a;font-size:14px">${esc(sig.name)}</div>
          ${sig.role ? `<div style="color:#7a6068">${esc(sig.role)}</div>` : ''}
          <div style="margin-top:6px">
            ${sig.emailDe ? `<a href="mailto:${esc(sig.emailDe)}" style="color:#F24171;text-decoration:none">${esc(sig.emailDe)}</a>` : ''}
            ${sig.phoneDe ? ` &nbsp;·&nbsp; <a href="tel:${esc(sig.phoneDe.replace(/\s/g, ''))}" style="color:#5a4651;text-decoration:none">${esc(sig.phoneDe)}</a>` : ''}
            ${sig.phoneAt ? ` &nbsp;·&nbsp; <a href="tel:${esc(sig.phoneAt.replace(/\s/g, ''))}" style="color:#5a4651;text-decoration:none">AT ${esc(sig.phoneAt)}</a>` : ''}
          </div>
          ${sig.website ? `<div style="margin-top:4px"><a href="${esc(sig.website)}" style="color:#F24171;text-decoration:none" target="_blank" rel="noopener">${esc(sig.website.replace(/^https?:\/\//, ''))}</a></div>` : ''}
        </td>
      </tr>
    </table>`;

  const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>${esc(opts.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#fff8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#14111a;line-height:1.55">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff8fa">
      <tr>
        <td align="center" style="padding:32px 16px">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(20,17,26,0.04)">
            <tr>
              <td style="background:linear-gradient(135deg,#F24171 0%,#FFB347 100%);padding:18px 28px">
                <div style="color:#ffffff;font-weight:600;letter-spacing:0.04em;font-size:13px;text-transform:uppercase">FlamingoMedia</div>
                <div style="color:#ffffff;opacity:0.85;font-size:13px;margin-top:2px">Websites mit Pop für lokale Marken</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px 8px;font-size:15px;color:#14111a">
                ${textToHtml(opts.body)}
                ${sigHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 24px;color:#9b8088;font-size:11px;text-align:center;border-top:1px solid #f6e8ed">
                Diese E-Mail wurde Ihnen gezielt von FlamingoMedia zugesandt. Falls Sie keine weitere Korrespondenz wünschen, antworten Sie einfach mit „kein Interesse" — wir notieren das und melden uns nicht erneut.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  // Plain-text fallback (some clients prefer it; spam filters use it).
  const text = [
    opts.body.trim(),
    '',
    '---',
    sig.name + (sig.role ? ' · ' + sig.role : ''),
    sig.emailDe,
    [sig.phoneDe, sig.phoneAt].filter(Boolean).join(' · '),
    sig.website || '',
  ].filter(Boolean).join('\n');

  const attachments = logo
    ? [{
        filename: logo.filename,
        content: logo.buffer,
        cid: logoCid,
        contentType: 'image/png',
      }]
    : [];

  return { subject: opts.subject, html, text, attachments };
}

function esc(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

/** Default copy for a first-touch outreach email. Operator can edit before sending. */
export function defaultInitialEmail(opts: { name: string; company?: string; websiteOld?: string }): { subject: string; body: string } {
  const greeting = opts.name ? `Hallo ${opts.name.split(/\s+/)[0]},` : 'Hallo,';
  const ref = opts.websiteOld
    ? `Ich bin gerade über ${opts.websiteOld.replace(/^https?:\/\//, '').replace(/\/$/, '')} gestolpert`
    : `Ich habe mir kurz ${opts.company || 'Ihren Auftritt'} angesehen`;
  const subject = `Kurzer Vorschlag für ${opts.company || 'Ihre Website'}`;
  const body = [
    greeting,
    '',
    `${ref} — und musste an etwas denken, das wir bei FlamingoMedia gerade für ein paar lokale Betriebe in Tirol und Bayern bauen: schnelle, ehrliche Websites, die genau so aussehen wie die Marke dahinter (und nicht wie alle anderen).`,
    '',
    `Die Idee ist simpel: ein modernes Design, ein gepflegter Texteditor, mit dem Sie alles selbst ändern können, und ein faires Paket — ohne Agentur-Kauderwelsch und ohne dass Sie für jede Kleinigkeit zahlen müssen.`,
    '',
    `Wenn Sie kurz neugierig sind, schick ich Ihnen gerne eine Vorschau, wie ${opts.company || 'Ihr Betrieb'} bei uns aussehen würde — unverbindlich, in 2–3 Tagen, ohne Druck.`,
    '',
    `Klingt das nach etwas, das in Ihren Tag passt?`,
    '',
    `Liebe Grüße aus Innsbruck`,
  ].join('\n');
  return { subject, body };
}

/** Default copy for a reminder/follow-up email. */
export function defaultReminderEmail(opts: { name: string; company?: string }): { subject: string; body: string } {
  const greeting = opts.name ? `Hallo nochmal ${opts.name.split(/\s+/)[0]},` : 'Hallo nochmal,';
  const subject = `Kurz nachgefragt — ${opts.company || 'Vorschau'}?`;
  const body = [
    greeting,
    '',
    `ich wollte mich kurz noch einmal melden — meine letzte Mail ist im Alltag vielleicht untergegangen, das passiert.`,
    '',
    `Falls Sie weiterhin neugierig sind, baue ich Ihnen mit einem Klick eine kostenlose Vorschau auf, wie ${opts.company || 'Ihre Seite'} bei uns aussehen würde. Sie schauen rein, sagen mir was Ihnen gefällt oder was nicht — und entscheiden in Ruhe.`,
    '',
    `Wenn jetzt einfach kein guter Zeitpunkt ist, sagen Sie kurz Bescheid — dann melde ich mich nicht mehr.`,
    '',
    `Beste Grüße`,
  ].join('\n');
  return { subject, body };
}
