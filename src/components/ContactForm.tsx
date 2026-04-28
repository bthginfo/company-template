import { useState } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export type ContactFormField = 'name' | 'email' | 'phone' | 'branche' | 'paket' | 'subject' | 'message';

export interface ContactFormProps {
  /** Identifier for the source (e.g. "agency-landing", "tenant:restaurant"). Sent with the request. */
  source?: string;
  /** Tenant / brand name for the subject line. */
  tenant?: string;
  /** Which fields to render. Defaults to a sensible subset. `name`, `email` and `message` are always included. */
  fields?: ContactFormField[];
  /** Branche options when the `branche` field is rendered. */
  brancheOptions?: string[];
  /** Paket options when the `paket` field is rendered. */
  paketOptions?: string[];
  className?: string;
  /** Visual variant for the submit button. */
  buttonClass?: string;
  /** Heading-level wrapper around the success state. */
  successTitle?: string;
  successText?: string;
  /** Optional pre-fill for `paket` when "Paket-Interesse" comes from a CTA click. */
  defaultPaket?: string;
}

const DEFAULT_FIELDS: ContactFormField[] = ['name', 'email', 'message'];

export function ContactForm({
  source = '',
  tenant = '',
  fields = DEFAULT_FIELDS,
  brancheOptions,
  paketOptions,
  className = '',
  buttonClass = 'btn-primary w-full justify-center',
  successTitle = 'Vielen Dank.',
  successText = 'Wir melden uns innerhalb von 24 Stunden.',
  defaultPaket = '',
}: ContactFormProps) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (state === 'sent') {
    return (
      <div className={`bg-white border border-line rounded-3xl p-8 md:p-10 text-center ${className}`}>
        <div className="text-5xl mb-4" aria-hidden>✓</div>
        <h3 className="font-display text-3xl">{successTitle}</h3>
        <p className="mt-3 text-muted">{successText}</p>
      </div>
    );
  }

  const inputCls = 'w-full bg-[var(--surface-color)] rounded-xl px-4 py-3 border border-line focus:border-brand outline-none transition';
  const has = (f: ContactFormField) => fields.includes(f);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setErrorMsg('');
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = { source, tenant };
    fd.forEach((v, k) => { payload[k] = String(v); });
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j?.ok) {
        setState('error');
        const msg = j?.error || 'Senden fehlgeschlagen. Bitte später erneut versuchen.';
        setErrorMsg(msg);
        toast.error('Senden fehlgeschlagen', { description: msg });
        return;
      }
      setState('sent');
      toast.success('Nachricht gesendet', { description: successText });
      try {
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (!reduce) {
          const fire = (origin: { x: number; y: number }) =>
            confetti({
              particleCount: 70,
              spread: 70,
              startVelocity: 38,
              origin,
              colors: ['#F24171', '#FFB347', '#7C3AED', '#22d3ee'],
              disableForReducedMotion: true,
            });
          fire({ x: 0.2, y: 0.7 });
          setTimeout(() => fire({ x: 0.8, y: 0.7 }), 180);
          setTimeout(() => fire({ x: 0.5, y: 0.6 }), 340);
        }
      } catch { /* noop */ }
    } catch {
      setState('error');
      const msg = 'Netzwerkfehler. Bitte später erneut versuchen.';
      setErrorMsg(msg);
      toast.error('Netzwerkfehler', { description: msg });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`bg-white border border-line rounded-3xl p-5 sm:p-8 md:p-10 space-y-5 ${className}`}
    >
      {/* Honeypot — keep visually hidden but not display:none, so bots fill it. */}
      <div aria-hidden style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {has('name') && (
        <Field label="Name">
          <input required name="name" autoComplete="name" className={inputCls} />
        </Field>
      )}
      {has('email') && (
        <Field label="E-Mail">
          <input required type="email" name="email" autoComplete="email" className={inputCls} />
        </Field>
      )}
      {has('phone') && (
        <Field label="Telefon (optional)">
          <input type="tel" name="phone" autoComplete="tel" className={inputCls} />
        </Field>
      )}
      {has('subject') && (
        <Field label="Betreff">
          <input name="subject" className={inputCls} />
        </Field>
      )}
      {has('branche') && brancheOptions && brancheOptions.length > 0 && (
        <Field label="Branche">
          <select name="branche" className={inputCls} defaultValue={brancheOptions[0]}>
            {brancheOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      )}
      {has('paket') && paketOptions && paketOptions.length > 0 && (
        <Field label="Paket-Interesse">
          <select name="paket" className={inputCls} defaultValue={defaultPaket || paketOptions[0]}>
            {paketOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      )}
      {has('message') && (
        <Field label="Ihre Nachricht">
          <textarea required name="message" rows={5} className={inputCls} minLength={5} />
        </Field>
      )}

      <button type="submit" disabled={state === 'sending'} className={`${buttonClass} disabled:opacity-60`}>
        {state === 'sending' ? 'Wird gesendet…' : <>Anfrage senden <span aria-hidden>→</span></>}
      </button>

      {state === 'error' && errorMsg && (
        <p role="alert" className="text-sm text-red-600 text-center">{errorMsg}</p>
      )}

      <p className="text-xs text-muted text-center">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserem Datenschutz zu.
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted mb-2">{label}</span>
      {children}
    </label>
  );
}
