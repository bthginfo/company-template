import { useEffect, useState } from 'react';
import type { AdminSession } from '../AdminApp';

/** Flat key-value structure for the settings form. */
type SettingsData = {
  brand?: {
    name?: string;
    tagline?: string;
    logoUrl?: string;
    faviconUrl?: string;
    themePresetId?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  social?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
  };
};

const SECTION_LABELS: Record<string, string> = {
  brand: 'Marke & Erscheinungsbild',
  contact: 'Kontakt',
  seo: 'SEO',
  social: 'Social Media',
};

const SECTION_FIELDS: Record<keyof SettingsData, { key: string; label: string; type?: string }[]> = {
  brand: [
    { key: 'name', label: 'Unternehmensname' },
    { key: 'tagline', label: 'Slogan / Tagline' },
    { key: 'logoUrl', label: 'Logo-URL', type: 'url' },
    { key: 'faviconUrl', label: 'Favicon-URL', type: 'url' },
    { key: 'themePresetId', label: 'Theme Preset ID' },
  ],
  contact: [
    { key: 'email', label: 'E-Mail', type: 'email' },
    { key: 'phone', label: 'Telefon', type: 'tel' },
    { key: 'address', label: 'Adresse' },
    { key: 'city', label: 'Stadt' },
  ],
  seo: [
    { key: 'metaTitle', label: 'Meta-Titel' },
    { key: 'metaDescription', label: 'Meta-Beschreibung' },
  ],
  social: [
    { key: 'instagram', label: 'Instagram', type: 'url' },
    { key: 'facebook', label: 'Facebook', type: 'url' },
    { key: 'linkedin', label: 'LinkedIn', type: 'url' },
    { key: 'tiktok', label: 'TikTok', type: 'url' },
  ],
};

export function SettingsView({ session }: { session: AdminSession }) {
  const [data, setData] = useState<SettingsData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const slug = session.slug ?? '';

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/settings?slug=${slug}&admin=1`)
      .then((r) => r.json())
      .then((j) => {
        setData((j.settings?.data as SettingsData) ?? {});
      })
      .finally(() => setLoading(false));
  }, [slug]);

  function setField(section: keyof SettingsData, key: string, value: string) {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] ?? {}),
        [key]: value,
      },
    }));
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

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-sm text-slate-400">Lädt…</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Einstellungen</h1>
        <p className="text-sm text-slate-500 mt-0.5">Globale Website-Einstellungen</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {(Object.keys(SECTION_FIELDS) as (keyof SettingsData)[]).map((section) => (
          <div key={section} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
              <h2 className="text-sm font-semibold text-slate-900">{SECTION_LABELS[section]}</h2>
            </div>
            <div className="p-5 space-y-4">
              {SECTION_FIELDS[section].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-xs text-slate-500 mb-1">{label}</label>
                  <input
                    type={type || 'text'}
                    value={(data[section] as Record<string, string> | undefined)?.[key] ?? ''}
                    onChange={(e) => setField(section, key, e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-slate-900 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition-colors"
          >
            {saving ? 'Speichern…' : 'Einstellungen speichern'}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 font-medium">✓ Gespeichert</span>
          )}
        </div>
      </form>
    </div>
  );
}
