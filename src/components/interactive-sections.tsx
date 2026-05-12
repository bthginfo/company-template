/**
 * Phase 6b — Interactive branch-specific section components.
 * Each component handles its own form state + API submission.
 * Imported and dispatched from section-renderers.tsx.
 *
 * Sections:
 *  reservationForm  — Restaurant: table booking
 *  rsvpForm         — Wedding: guest RSVP
 *  quoteRequest     — Tradesman: quote/estimate inquiry
 *  appointmentEmbed — Consulting/Medical: calendar embed (Cal.com / Calendly)
 *  roomBooking      — Hotel: room enquiry form
 *  trainingSignup   — Fitness: trial class signup
 */

import * as React from 'react';
import type { SectionData } from './section-renderers';

// ─── Shared helpers ───────────────────────────────────────────────────────────

function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full border border-line rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand';

function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-brand text-brand-fg font-semibold py-3.5 rounded-full hover:opacity-90 disabled:opacity-60 transition-opacity text-base"
    >
      {loading ? 'Wird gesendet…' : label}
    </button>
  );
}

function SuccessBox({ message }: { message: string }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
      <div className="text-3xl mb-3">✓</div>
      <p className="text-emerald-800 font-medium">{message}</p>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-700">
      {message}
    </div>
  );
}

// ─── Reservation Form (Restaurant) ───────────────────────────────────────────

export function ReservationFormSection({ data, tenantSlug }: { data: SectionData; tenantSlug: string }) {
  const headline = str(data.headline, 'Tisch reservieren');
  const subline = str(data.subline);
  const successMsg = str(data.successMessage, 'Ihre Reservierung wurde entgegengenommen. Wir melden uns zur Bestätigung.');

  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`/api/reservation?slug=${encodeURIComponent(tenantSlug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Fehler beim Senden');
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="reservierung" className="py-16 px-6 bg-surface">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>
          {subline && <p className="text-ink/60 mt-2">{subline}</p>}
        </div>
        {success ? (
          <SuccessBox message={successMsg} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Vorname & Name *">
                <input required className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} />
              </FieldRow>
              <FieldRow label="E-Mail *">
                <input required type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} />
              </FieldRow>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Telefon">
                <input type="tel" className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </FieldRow>
              <FieldRow label="Anzahl Personen *">
                <select required className={inputCls} value={form.guests} onChange={(e) => set('guests', e.target.value)}>
                  {[1,2,3,4,5,6,7,8,10,12,15,20].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Personen'}</option>
                  ))}
                </select>
              </FieldRow>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Datum *">
                <input required type="date" className={inputCls} value={form.date} onChange={(e) => set('date', e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </FieldRow>
              <FieldRow label="Uhrzeit *">
                <select required className={inputCls} value={form.time} onChange={(e) => set('time', e.target.value)}>
                  <option value="">Bitte wählen</option>
                  {['11:00','11:30','12:00','12:30','13:00','13:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map((t) => (
                    <option key={t} value={t}>{t} Uhr</option>
                  ))}
                </select>
              </FieldRow>
            </div>
            <FieldRow label="Hinweise / Sonderwünsche">
              <textarea rows={3} className={inputCls + ' resize-none'} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Allergien, Kinderstuhl, Anlass…" />
            </FieldRow>
            {error && <ErrorBox message={error} />}
            <SubmitBtn loading={loading} label="Tisch reservieren" />
          </form>
        )}
      </div>
    </section>
  );
}

// ─── RSVP Form (Wedding) ─────────────────────────────────────────────────────

export function RsvpFormSection({ data, tenantSlug }: { data: SectionData; tenantSlug: string }) {
  const headline = str(data.headline, 'Anmeldung zur Feier');
  const subline = str(data.subline);
  const menuOptions = str(data.menuOptions, 'Fleisch,Vegetarisch,Vegan');
  const successMsg = str(data.successMessage, 'Vielen Dank! Wir freuen uns auf euch.');

  const menuChoices = menuOptions.split(',').map((s) => s.trim()).filter(Boolean);

  const [form, setForm] = React.useState({
    guestName: '', attending: 'true', guestCount: '1', menuChoice: menuChoices[0] ?? '', message: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`/api/rsvp?slug=${encodeURIComponent(tenantSlug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, attending: form.attending === 'true', guestCount: Number(form.guestCount) }),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Fehler beim Senden');
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="rsvp" className="py-16 px-6 bg-surface">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>
          {subline && <p className="text-ink/60 mt-2">{subline}</p>}
        </div>
        {success ? (
          <SuccessBox message={successMsg} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldRow label="Euer Name *">
              <input required className={inputCls} value={form.guestName} onChange={(e) => set('guestName', e.target.value)} placeholder="Vorname Nachname" />
            </FieldRow>
            <FieldRow label="Werdet ihr dabei sein? *">
              <div className="flex gap-3">
                {[{ v: 'true', l: '✓ Ja, wir kommen!' }, { v: 'false', l: '✗ Leider nicht' }].map(({ v, l }) => (
                  <label key={v} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-colors ${form.attending === v ? 'border-brand bg-brand/10 font-semibold text-brand' : 'border-line bg-white text-ink'}`}>
                    <input type="radio" className="sr-only" value={v} checked={form.attending === v} onChange={() => set('attending', v)} />
                    {l}
                  </label>
                ))}
              </div>
            </FieldRow>
            {form.attending === 'true' && (
              <>
                <FieldRow label="Anzahl Personen *">
                  <select required className={inputCls} value={form.guestCount} onChange={(e) => set('guestCount', e.target.value)}>
                    {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </FieldRow>
                {menuChoices.length > 0 && (
                  <FieldRow label="Menüwahl *">
                    <select required className={inputCls} value={form.menuChoice} onChange={(e) => set('menuChoice', e.target.value)}>
                      {menuChoices.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </FieldRow>
                )}
              </>
            )}
            <FieldRow label="Nachricht (optional)">
              <textarea rows={3} className={inputCls + ' resize-none'} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Allergien, Anmerkungen…" />
            </FieldRow>
            {error && <ErrorBox message={error} />}
            <SubmitBtn loading={loading} label="Anmeldung absenden" />
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Quote Request (Tradesman / Handwerk) ─────────────────────────────────────

export function QuoteRequestSection({ data, tenantSlug }: { data: SectionData; tenantSlug: string }) {
  const headline = str(data.headline, 'Kostenvoranschlag anfordern');
  const subline = str(data.subline);
  const serviceOptions = str(data.serviceOptions, '');
  const successMsg = str(data.successMessage, 'Ihre Anfrage wurde übermittelt. Wir melden uns in Kürze.');

  const services = serviceOptions.split(',').map((s) => s.trim()).filter(Boolean);

  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', service: services[0] ?? '', description: '', address: '', urgency: 'normal',
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`/api/quote-request?slug=${encodeURIComponent(tenantSlug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Fehler beim Senden');
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="anfrage" className="py-16 px-6 bg-surface">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>
          {subline && <p className="text-ink/60 mt-2">{subline}</p>}
        </div>
        {success ? (
          <SuccessBox message={successMsg} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Name *">
                <input required className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} />
              </FieldRow>
              <FieldRow label="Telefon *">
                <input required type="tel" className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </FieldRow>
            </div>
            <FieldRow label="E-Mail *">
              <input required type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} />
            </FieldRow>
            {services.length > 0 && (
              <FieldRow label="Leistung *">
                <select required className={inputCls} value={form.service} onChange={(e) => set('service', e.target.value)}>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </FieldRow>
            )}
            <FieldRow label="Adresse / Ort der Arbeit">
              <input className={inputCls} value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Straße, Ort" />
            </FieldRow>
            <FieldRow label="Dringlichkeit">
              <select className={inputCls} value={form.urgency} onChange={(e) => set('urgency', e.target.value)}>
                <option value="low">Kein Eile (innerhalb 2 Wochen)</option>
                <option value="normal">Normal (innerhalb 1 Woche)</option>
                <option value="high">Dringend (so schnell wie möglich)</option>
                <option value="emergency">Notfall</option>
              </select>
            </FieldRow>
            <FieldRow label="Beschreibung der Arbeit *">
              <textarea required rows={4} className={inputCls + ' resize-none'} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Was genau soll gemacht werden? Maße, Material, Besonderheiten…" />
            </FieldRow>
            {error && <ErrorBox message={error} />}
            <SubmitBtn loading={loading} label="Anfrage absenden" />
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Appointment Embed (Consulting / Medical) ─────────────────────────────────

export function AppointmentEmbedSection({ data }: { data: SectionData }) {
  const headline = str(data.headline, 'Termin buchen');
  const subline = str(data.subline);
  const embedUrl = str(data.embedUrl);
  const provider = str(data.provider, 'cal'); // 'cal' | 'calendly' | 'tidycal'

  // Build a safe embed URL
  function buildEmbedUrl(raw: string): string | null {
    if (!raw) return null;
    try {
      const u = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
      const allowed = ['cal.com', 'calendly.com', 'tidycal.com', 'savvycal.com', 'youcanbook.me'];
      if (!allowed.some((h) => u.hostname.endsWith(h))) return null;
      return u.href;
    } catch {
      return null;
    }
  }

  const safeUrl = buildEmbedUrl(embedUrl);

  return (
    <section id="termin" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>
          {subline && <p className="text-ink/60 mt-2">{subline}</p>}
        </div>
        {safeUrl ? (
          <div className="rounded-2xl overflow-hidden border border-line shadow-sm">
            <iframe
              src={safeUrl}
              className="w-full"
              style={{ height: '700px', border: 'none' }}
              title={`${provider} Terminbuchung`}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="bg-surface rounded-2xl p-10 text-center">
            <p className="text-ink/50 text-sm">
              Kein Buchungslink konfiguriert. Trage unter{' '}
              <strong>Seiten → Abschnitt → Termin buchen → Buchungs-URL</strong> deinen
              Cal.com / Calendly Link ein.
            </p>
            <p className="text-xs text-ink/30 mt-2">
              Unterstützte Anbieter: Cal.com · Calendly · TidyCal · SavvyCal · YouCanBook.me
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Room Booking Enquiry (Hotel) ─────────────────────────────────────────────

export function RoomBookingSection({ data, tenantSlug }: { data: SectionData; tenantSlug: string }) {
  const headline = str(data.headline, 'Zimmer anfragen');
  const subline = str(data.subline);
  const roomOptions = str(data.roomOptions, '');
  const successMsg = str(data.successMessage, 'Ihre Anfrage ist eingegangen. Wir senden Ihnen eine Bestätigung per E-Mail.');

  const rooms = roomOptions.split(',').map((s) => s.trim()).filter(Boolean);

  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', checkin: '', checkout: '', adults: '2', children: '0', room: rooms[0] ?? '', message: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const today = new Date().toISOString().split('T')[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.checkout <= form.checkin) {
      setError('Abreisedatum muss nach dem Anreisedatum liegen.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`/api/room-inquiry?slug=${encodeURIComponent(tenantSlug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, adults: Number(form.adults), children: Number(form.children) }),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Fehler beim Senden');
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="zimmer" className="py-16 px-6 bg-surface">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>
          {subline && <p className="text-ink/60 mt-2">{subline}</p>}
        </div>
        {success ? (
          <SuccessBox message={successMsg} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Name *">
                <input required className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} />
              </FieldRow>
              <FieldRow label="E-Mail *">
                <input required type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} />
              </FieldRow>
            </div>
            <FieldRow label="Telefon">
              <input type="tel" className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </FieldRow>
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Anreise *">
                <input required type="date" className={inputCls} value={form.checkin} min={today} onChange={(e) => set('checkin', e.target.value)} />
              </FieldRow>
              <FieldRow label="Abreise *">
                <input required type="date" className={inputCls} value={form.checkout} min={form.checkin || today} onChange={(e) => set('checkout', e.target.value)} />
              </FieldRow>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Erwachsene">
                <select className={inputCls} value={form.adults} onChange={(e) => set('adults', e.target.value)}>
                  {[1,2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </FieldRow>
              <FieldRow label="Kinder">
                <select className={inputCls} value={form.children} onChange={(e) => set('children', e.target.value)}>
                  {[0,1,2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </FieldRow>
            </div>
            {rooms.length > 0 && (
              <FieldRow label="Zimmertyp">
                <select className={inputCls} value={form.room} onChange={(e) => set('room', e.target.value)}>
                  <option value="">Keine Präferenz</option>
                  {rooms.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </FieldRow>
            )}
            <FieldRow label="Wünsche / Anmerkungen">
              <textarea rows={3} className={inputCls + ' resize-none'} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Sonderwünsche, Allergien, Jubiläum…" />
            </FieldRow>
            {error && <ErrorBox message={error} />}
            <SubmitBtn loading={loading} label="Anfrage absenden" />
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Training Signup (Fitness) ────────────────────────────────────────────────

export function TrainingSignupSection({ data, tenantSlug }: { data: SectionData; tenantSlug: string }) {
  const headline = str(data.headline, 'Probetraining buchen');
  const subline = str(data.subline, 'Komm einfach vorbei — das erste Training ist kostenlos!');
  const courseOptions = str(data.courseOptions, '');
  const successMsg = str(data.successMessage, 'Super! Wir freuen uns auf dich. Du erhältst eine Bestätigung per E-Mail.');

  const courses = courseOptions.split(',').map((s) => s.trim()).filter(Boolean);

  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', course: courses[0] ?? '', goal: '', experience: 'beginner',
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`/api/training-signup?slug=${encodeURIComponent(tenantSlug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Fehler beim Senden');
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="probetraining" className="py-16 px-6 bg-surface">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>
          {subline && <p className="text-ink/60 mt-2">{subline}</p>}
        </div>
        {success ? (
          <SuccessBox message={successMsg} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldRow label="Dein Name *">
              <input required className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} />
            </FieldRow>
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="E-Mail *">
                <input required type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} />
              </FieldRow>
              <FieldRow label="Telefon">
                <input type="tel" className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </FieldRow>
            </div>
            {courses.length > 0 && (
              <FieldRow label="Kurs / Trainingsziel">
                <select className={inputCls} value={form.course} onChange={(e) => set('course', e.target.value)}>
                  {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </FieldRow>
            )}
            <FieldRow label="Erfahrungslevel">
              <select className={inputCls} value={form.experience} onChange={(e) => set('experience', e.target.value)}>
                <option value="beginner">Anfänger — noch kein Training</option>
                <option value="some">Etwas Erfahrung</option>
                <option value="regular">Trainiere bereits regelmäßig</option>
                <option value="advanced">Fortgeschritten / Athlet</option>
              </select>
            </FieldRow>
            <FieldRow label="Dein Ziel (optional)">
              <input className={inputCls} value={form.goal} onChange={(e) => set('goal', e.target.value)} placeholder="Abnehmen, Muskelaufbau, Ausdauer…" />
            </FieldRow>
            {error && <ErrorBox message={error} />}
            <SubmitBtn loading={loading} label="Jetzt anmelden" />
          </form>
        )}
      </div>
    </section>
  );
}
