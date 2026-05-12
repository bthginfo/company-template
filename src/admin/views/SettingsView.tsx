import { useEffect, useState } from 'react';
import type { AdminSession } from '../AdminApp';

type Tab = 'brand' | 'contact' | 'social' | 'seo' | 'mail' | 'legal' | 'navigation' | 'security';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'brand', label: 'Marke', icon: '🏷' },
  { id: 'contact', label: 'Kontakt', icon: '📍' },
  { id: 'social', label: 'Social', icon: '🔗' },
  { id: 'seo', label: 'SEO', icon: '🔍' },
  { id: 'mail', label: 'E-Mail', icon: '✉️' },
  { id: 'legal', label: 'Impressum', icon: '⚖️' },
  { id: 'navigation', label: 'Navigation', icon: '☰' },
  { id: 'security', label: 'Sicherheit', icon: '🔒' },
];

type SettingsData = Record<string, Record<string, unknown>>;

export function SettingsView({ session }: { session: AdminSession }) {
  const [activeTab, setActiveTab] = useState<Tab>('brand');
  const [data, setData] = useState<SettingsData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [impressum, setImpressum] = useState('');
  const [generatingImpressum, setGeneratingImpressum] = useState(false);
  const slug = session.slug ?? '';

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/settings?slug=${slug}&admin=1`)
      .then((r) => r.json())
      .then((j) => setData((j.settings?.data as SettingsData) ?? {}))
      .finally(() => setLoading(false));
  }, [slug]);

  function setField(section: string, key: string, value: unknown) {
    setData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] ?? {}), [key]: value },
    }));
  }

  function getField(section: string, key: string, fallback: unknown = '') {
    return (data[section]?.[key] ?? fallback) as string;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch(`/api/settings?slug=${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  async function generateImpressum() {
    setGeneratingImpressum(true);
    try {
      const r = await fetch(`/api/settings?slug=${slug}&admin=1&action=generate-impressum`);
      const j = await r.json();
      setImpressum(j.impressum ?? '');
    } finally {
      setGeneratingImpressum(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-sm text-slate-400">Lädt…</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Einstellungen</h1>
        <p className="text-sm text-slate-500 mt-0.5">Globale Website-Einstellungen</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeTab === t.id
                ? 'bg-slate-900 text-white font-medium'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="max-w-2xl space-y-4">
        {/* ── Brand ── */}
        {activeTab === 'brand' && (
          <SettingsCard title="Marke & Erscheinungsbild" action={<a href="/admin/theme" className="text-xs text-slate-400 hover:text-slate-700 underline underline-offset-2">Farben & Theme →</a>}>
            <Field label="Unternehmensname" value={getField('brand', 'name')} onChange={(v) => setField('brand', 'name', v)} />
            <Field label="Slogan / Tagline" value={getField('brand', 'tagline')} onChange={(v) => setField('brand', 'tagline', v)} />
            <Field label="Logo-URL" type="url" value={getField('brand', 'logoUrl')} onChange={(v) => setField('brand', 'logoUrl', v)} />
            <Field label="Favicon-URL" type="url" value={getField('brand', 'faviconUrl')} onChange={(v) => setField('brand', 'faviconUrl', v)} />
          </SettingsCard>
        )}

        {/* ── Contact ── */}
        {activeTab === 'contact' && (
          <SettingsCard title="Kontaktdaten">
            <Field label="E-Mail" type="email" value={getField('contact', 'email')} onChange={(v) => setField('contact', 'email', v)} />
            <Field label="Telefon" type="tel" value={getField('contact', 'phone')} onChange={(v) => setField('contact', 'phone', v)} />
            <Field label="Adresse" value={getField('contact', 'address')} onChange={(v) => setField('contact', 'address', v)} />
            <Field label="Stadt" value={getField('contact', 'city')} onChange={(v) => setField('contact', 'city', v)} />
            <Field label="Google Maps URL" type="url" value={getField('contact', 'mapsUrl')} onChange={(v) => setField('contact', 'mapsUrl', v)} placeholder="https://maps.google.com/..." />
          </SettingsCard>
        )}

        {/* ── Social ── */}
        {activeTab === 'social' && (
          <SettingsCard title="Social Media">
            <Field label="Instagram" type="url" value={getField('social', 'instagram')} onChange={(v) => setField('social', 'instagram', v)} placeholder="https://instagram.com/..." />
            <Field label="Facebook" type="url" value={getField('social', 'facebook')} onChange={(v) => setField('social', 'facebook', v)} placeholder="https://facebook.com/..." />
            <Field label="WhatsApp" type="tel" value={getField('social', 'whatsapp')} onChange={(v) => setField('social', 'whatsapp', v)} placeholder="+43 ... (nur Nummer)" />
            <Field label="LinkedIn" type="url" value={getField('social', 'linkedin')} onChange={(v) => setField('social', 'linkedin', v)} />
            <Field label="TikTok" type="url" value={getField('social', 'tiktok')} onChange={(v) => setField('social', 'tiktok', v)} />
            <Field label="YouTube" type="url" value={getField('social', 'youtube')} onChange={(v) => setField('social', 'youtube', v)} />
            <Field label="X (Twitter)" type="url" value={getField('social', 'x')} onChange={(v) => setField('social', 'x', v)} />
          </SettingsCard>
        )}

        {/* ── SEO ── */}
        {activeTab === 'seo' && (
          <SettingsCard title="SEO & Indexierung">
            <Field label="Meta-Titel" value={getField('seo', 'title')} onChange={(v) => setField('seo', 'title', v)} hint="Erscheint im Browser-Tab und Google-Suchergebnis" />
            <TextareaField label="Meta-Beschreibung" value={getField('seo', 'description')} onChange={(v) => setField('seo', 'description', v)} />
            <Field label="OG-Bild URL" type="url" value={getField('seo', 'ogImage')} onChange={(v) => setField('seo', 'ogImage', v)} hint="Bild für Social-Media-Vorschau (1200×630px empfohlen)" />
            <Field label="Branche / Küche" value={getField('seo', 'cuisine')} onChange={(v) => setField('seo', 'cuisine', v)} placeholder="z.B. Österreichisch, Italienisch" />
            <Field label="Preisklasse" value={getField('seo', 'priceRange')} onChange={(v) => setField('seo', 'priceRange', v)} placeholder="€, €€, €€€" />
            <Field label="Kanonische URL" type="url" value={getField('seo', 'canonical')} onChange={(v) => setField('seo', 'canonical', v)} />
          </SettingsCard>
        )}

        {/* ── Mail ── */}
        {activeTab === 'mail' && (
          <>
            <SettingsCard title="SMTP — Ausgehende E-Mails">
              <p className="text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                ⚠️ Zugangsdaten werden verschlüsselt gespeichert und nie an den Browser zurückgegeben.
                Empfehlung: <strong>Resend.com</strong> (smtp.resend.com · Port 587).
              </p>
              <Field label="SMTP Host" value={getField('mail', 'smtpHost')} onChange={(v) => setField('mail', 'smtpHost', v)} placeholder="smtp.resend.com" />
              <Field label="SMTP Port" type="number" value={getField('mail', 'smtpPort') || '587'} onChange={(v) => setField('mail', 'smtpPort', Number(v))} />
              <Field label="SMTP Benutzer" value={getField('mail', 'smtpUser')} onChange={(v) => setField('mail', 'smtpUser', v)} placeholder="apikey" />
              <Field label="SMTP Passwort / API-Key" type="password" value={getField('mail', 'smtpPass')} onChange={(v) => setField('mail', 'smtpPass', v)} />
            </SettingsCard>
            <SettingsCard title="Absender & Benachrichtigungen">
              <Field label="Absendername" value={getField('mail', 'fromName')} onChange={(v) => setField('mail', 'fromName', v)} placeholder="Restaurant Beispiel" />
              <Field label="Absender-E-Mail" type="email" value={getField('mail', 'fromEmail')} onChange={(v) => setField('mail', 'fromEmail', v)} placeholder="noreply@beispiel.at" />
              <Field label="Benachrichtigungs-E-Mail" type="email" value={getField('mail', 'notifyEmail')} onChange={(v) => setField('mail', 'notifyEmail', v)} hint="Wohin werden neue Anfragen gesendet?" />
            </SettingsCard>
          </>
        )}

        {/* ── Legal / Impressum ── */}
        {activeTab === 'legal' && (() => {
          const REQUIRED_LEGAL = ['companyName', 'address', 'city', 'email', 'responsiblePerson'];
          const missing = REQUIRED_LEGAL.filter((k) => !getField('legal', k));
          return (
          <>
            {missing.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
                <strong>Fehlende Pflichtangaben:</strong>{' '}
                {missing.map((k) => ({
                  companyName: 'Unternehmensname', address: 'Adresse', city: 'Stadt',
                  email: 'E-Mail', responsiblePerson: 'Verantwortliche/r',
                }[k] ?? k)).join(', ')}
              </div>
            )}
            <SettingsCard title="Pflichtangaben (Impressum)">
              <Field label="Unternehmensname *" value={getField('legal', 'companyName')} onChange={(v) => setField('legal', 'companyName', v)} required={!getField('legal', 'companyName')} />
              <Field label="Rechtsform" value={getField('legal', 'companyForm')} onChange={(v) => setField('legal', 'companyForm', v)} placeholder="GmbH, OG, Einzelunternehmen …" />
              <Field label="Firmenbuchnummer" value={getField('legal', 'companyRegNumber')} onChange={(v) => setField('legal', 'companyRegNumber', v)} placeholder="FN 123456a" />
              <Field label="Firmenbuchgericht" value={getField('legal', 'companyRegCourt')} onChange={(v) => setField('legal', 'companyRegCourt', v)} placeholder="Handelsgericht Wien" />
              <Field label="UID-Nummer / USt-IdNr." value={getField('legal', 'vatId')} onChange={(v) => setField('legal', 'vatId', v)} placeholder="ATU12345678" />
              <Field label="Adresse *" value={getField('legal', 'address')} onChange={(v) => setField('legal', 'address', v)} required={!getField('legal', 'address')} />
              <Field label="Stadt *" value={getField('legal', 'city')} onChange={(v) => setField('legal', 'city', v)} required={!getField('legal', 'city')} />
              <Field label="Land" value={getField('legal', 'country')} onChange={(v) => setField('legal', 'country', v)} placeholder="AT" />
              <Field label="Telefon" type="tel" value={getField('legal', 'phone')} onChange={(v) => setField('legal', 'phone', v)} />
              <Field label="E-Mail *" type="email" value={getField('legal', 'email')} onChange={(v) => setField('legal', 'email', v)} required={!getField('legal', 'email')} />
              <Field label="Gewerbebehörde" value={getField('legal', 'tradeAuthority')} onChange={(v) => setField('legal', 'tradeAuthority', v)} placeholder="Magistrat Wien, MA 63" />
              <Field label="Inhaltlich Verantwortliche/r (§ 5 ECG) *" value={getField('legal', 'responsiblePerson')} onChange={(v) => setField('legal', 'responsiblePerson', v)} required={!getField('legal', 'responsiblePerson')} />
            </SettingsCard>
            <SettingsCard title="Impressum-Generator">
              <p className="text-xs text-slate-500">Generiert einen Impressum-Text aus den Angaben oben. Diesen kannst du in die Impressum-Seite einfügen.</p>
              {missing.length > 0 && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Bitte zuerst alle Pflichtfelder (*) ausfüllen und speichern.
                </p>
              )}
              <button
                type="button"
                onClick={generateImpressum}
                disabled={generatingImpressum || missing.length > 0}
                className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {generatingImpressum ? 'Generiere…' : 'Impressum generieren'}
              </button>
              {impressum && (
                <div className="mt-3">
                  <pre className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-4 whitespace-pre-wrap font-mono overflow-auto max-h-64">{impressum}</pre>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(impressum)}
                    className="mt-2 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    In Zwischenablage kopieren
                  </button>
                </div>
              )}
            </SettingsCard>
          </>
          );
        })()}

        {/* ── Navigation ── */}
        {activeTab === 'navigation' && (
          <SettingsCard title="Navigation">
            <Field
              label="Seiten aus der Navigation ausblenden"
              value={Array.isArray(data.navigation?.hiddenFromNav) ? (data.navigation.hiddenFromNav as string[]).join(', ') : ''}
              onChange={(v) => setField('navigation', 'hiddenFromNav', v.split(',').map((s) => s.trim()).filter(Boolean))}
              placeholder="impressum, datenschutz (kommagetrennt)"
              hint="Slugs der Seiten die im Hauptmenü nicht erscheinen sollen"
            />
          </SettingsCard>
        )}

        {/* ── Security ── */}
        {activeTab === 'security' && (
          <SettingsCard title="Sicherheit">
            <Field
              label="Max. Formular-Anfragen pro IP pro Minute"
              type="number"
              value={String(getField('security', 'formRateLimit') || '10')}
              onChange={(v) => setField('security', 'formRateLimit', Number(v))}
              hint="Standard: 10. Trage 0 ein für kein Limit."
            />
          </SettingsCard>
        )}

        {/* Save bar */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
          <button
            type="submit"
            disabled={saving}
            className="bg-slate-900 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition-colors"
          >
            {saving ? 'Speichern…' : 'Einstellungen speichern'}
          </button>
          {saved && <span className="text-sm text-emerald-600 font-medium">✓ Gespeichert</span>}
        </div>
      </form>
    </div>
  );
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function SettingsCard({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {action}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, type = 'text', placeholder, hint, required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 ${required ? 'border-amber-400 bg-amber-50/40' : 'border-slate-200'}`}
      />
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function TextareaField({
  label, value, onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
      />
    </div>
  );
}