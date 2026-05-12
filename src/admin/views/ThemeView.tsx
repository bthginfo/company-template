import { useEffect, useState } from 'react';
import type { AdminSession } from '../AdminApp';
import { PRESETS, CUSTOM_THEME_PREFIX, type ThemePreset } from '@/lib/theme';
import type { TemplateKey, TenantCustomTheme } from '@/lib/types';

// ─── Types ────────────────────────────────────────────────────────────────────

type ThemeBrandData = {
  themePresetId?: string;
  customThemes?: TenantCustomTheme[];
};

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Color swatch ─────────────────────────────────────────────────────────────

function Swatch({ color, size = 'md' }: { color: string; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <span
      className={`${sz} rounded-full border border-black/10 inline-block shrink-0`}
      style={{ background: color }}
    />
  );
}

// ─── Preset card ──────────────────────────────────────────────────────────────

function PresetCard({
  preset,
  active,
  onSelect,
  onPreview,
}: {
  preset: ThemePreset;
  active: boolean;
  onSelect: () => void;
  onPreview: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all select-none ${
        active
          ? 'border-slate-900 shadow-md'
          : 'border-slate-200 hover:border-slate-400'
      }`}
    >
      {active && (
        <span className="absolute top-2 right-2 bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Aktiv
        </span>
      )}

      {/* Mini preview bar */}
      <div className="rounded-lg overflow-hidden mb-3 h-12 flex">
        <div className="flex-1" style={{ background: preset.primary }} />
        <div className="flex-1" style={{ background: preset.surface }} />
        <div className="w-8" style={{ background: preset.accent }} />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Swatch color={preset.primary} />
        <Swatch color={preset.accent} />
        <Swatch color={preset.surface} />
        <Swatch color={preset.bg} />
      </div>

      <div className="text-sm font-medium text-slate-900">{preset.label}</div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPreview(); }}
        className="mt-2 text-[11px] text-slate-400 hover:text-slate-700 underline underline-offset-2 transition-colors"
      >
        Vorschau
      </button>
    </div>
  );
}

// ─── Custom theme editor ───────────────────────────────────────────────────────

function CustomThemeEditor({
  theme,
  onChange,
  onDelete,
}: {
  theme: TenantCustomTheme;
  onChange: (updated: TenantCustomTheme) => void;
  onDelete: () => void;
}) {
  const fields: { key: keyof TenantCustomTheme; label: string; type: 'color' | 'text' }[] = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'primary', label: 'Primärfarbe', type: 'color' },
    { key: 'primaryFg', label: 'Primär-Text', type: 'color' },
    { key: 'accent', label: 'Akzentfarbe', type: 'color' },
    { key: 'accentFg', label: 'Akzent-Text', type: 'color' },
    { key: 'surface', label: 'Fläche', type: 'color' },
    { key: 'bg', label: 'Hintergrund', type: 'color' },
    { key: 'text', label: 'Textfarbe', type: 'color' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Swatch color={theme.primary} size="sm" />
          <Swatch color={theme.accent} size="sm" />
          <span className="text-sm font-semibold text-slate-900">{theme.name || 'Unbenannt'}</span>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="text-xs text-rose-500 hover:text-rose-700 transition-colors"
        >
          Löschen
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {fields.map(({ key, label, type }) => (
          <div key={key} className={key === 'name' ? 'col-span-2' : ''}>
            <label className="block text-[11px] text-slate-500 mb-1">{label}</label>
            <div className="flex items-center gap-2">
              {type === 'color' && (
                <input
                  type="color"
                  value={String(theme[key] ?? '#000000')}
                  onChange={(e) => onChange({ ...theme, [key]: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border border-slate-200"
                />
              )}
              <input
                type="text"
                value={String(theme[key] ?? '')}
                onChange={(e) => onChange({ ...theme, [key]: e.target.value })}
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder={type === 'color' ? '#000000' : 'Name…'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ThemeView ───────────────────────────────────────────────────────────

export function ThemeView({ session }: { session: AdminSession }) {
  const slug = session.slug ?? '';

  const [templateKey, setTemplateKey] = useState<TemplateKey | null>(null);
  const [activePresetId, setActivePresetId] = useState('');
  const [customThemes, setCustomThemes] = useState<TenantCustomTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  // Load current settings + template key
  useEffect(() => {
    if (!slug) return;
    Promise.all([
      fetch(`/api/settings?slug=${slug}&admin=1`).then((r) => r.json()),
      fetch(`/api/content?slug=${slug}&preview=1`, { cache: 'no-store' }).then((r) => r.json()),
    ])
      .then(([settingsJson, contentJson]) => {
        const brandData = (settingsJson.settings?.data?.brand ?? {}) as ThemeBrandData;
        setActivePresetId(brandData.themePresetId ?? '');
        setCustomThemes((brandData.customThemes ?? []) as TenantCustomTheme[]);
        setTemplateKey((contentJson.tenant?.template as TemplateKey) ?? null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Available presets = built-in + custom
  const builtinPresets: ThemePreset[] = templateKey ? (PRESETS[templateKey] ?? []) : [];
  const customAsPresets: ThemePreset[] = customThemes.map((c) => ({
    id: `${CUSTOM_THEME_PREFIX}${c.id}`,
    label: c.name,
    primary: c.primary,
    primaryFg: c.primaryFg,
    accent: c.accent,
    accentFg: c.accentFg,
    surface: c.surface,
    bg: c.bg,
    text: c.text,
  }));

  function selectPreset(id: string) {
    setActivePresetId(id);
    // Do NOT call applyTheme() here — that would repaint the Admin UI itself.
    // Users see the live result via "Vorschau öffnen" (opens /?preview=1 in a new tab).
  }

  function previewPreset(id: string) {
    // Open the site in preview mode so the user can see the theme on the actual website.
    window.open(`/?preview=1&_themePreview=${encodeURIComponent(id)}`, '_blank');
  }

  function addCustomTheme() {
    const id = genId();
    const base = builtinPresets[0] ?? {
      primary: '#0f172a', primaryFg: '#ffffff', accent: '#f59e0b',
      surface: '#f8fafc', bg: '#ffffff', text: '#0f172a',
    };
    setCustomThemes((prev) => [
      ...prev,
      {
        id,
        name: 'Neues Theme',
        primary: base.primary,
        primaryFg: base.primaryFg,
        accent: base.accent,
        accentFg: base.accentFg ?? '#ffffff',
        surface: base.surface,
        bg: base.bg,
        text: base.text,
      },
    ]);
  }

  function updateCustomTheme(id: string, updated: TenantCustomTheme) {
    setCustomThemes((prev) => prev.map((c) => (c.id === id ? updated : c)));
  }

  function deleteCustomTheme(id: string) {
    setCustomThemes((prev) => prev.filter((c) => c.id !== id));
    if (activePresetId === `${CUSTOM_THEME_PREFIX}${id}`) {
      setActivePresetId(builtinPresets[0]?.id ?? '');
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      // Read existing settings first to merge
      const existing = await fetch(`/api/settings?slug=${slug}&admin=1`).then((r) => r.json());
      const currentData = existing.settings?.data ?? {};
      const nextData = {
        ...currentData,
        brand: {
          ...(currentData.brand ?? {}),
          themePresetId: activePresetId,
          customThemes,
        },
      };
      await fetch(`/api/settings?slug=${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: nextData }),
      });
      setSavedMsg('✓ Gespeichert');
      setTimeout(() => setSavedMsg(''), 2500);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-sm text-slate-400">Lädt…</div>;
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Theme</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Wähle ein Farbschema für die Website.
            {templateKey && (
              <span className="ml-2 text-slate-400">Template: <strong>{templateKey}</strong></span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && <span className="text-sm text-emerald-600 font-medium">{savedMsg}</span>}
          <button
            type="button"
            onClick={() => window.open(`/?preview=1`, '_blank')}
            className="text-sm border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Vorschau öffnen ↗
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-slate-900 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition-colors"
          >
            {saving ? 'Speichern…' : 'Speichern'}
          </button>
        </div>
      </div>

      {/* Built-in presets */}
      {builtinPresets.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">
            Voreinstellungen ({templateKey})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
            {builtinPresets.map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                active={activePresetId === preset.id}
                onSelect={() => selectPreset(preset.id)}
                onPreview={() => previewPreset(preset.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Custom themes */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900">Eigene Farbschemata</h2>
          <button
            type="button"
            onClick={addCustomTheme}
            className="text-sm text-slate-600 border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            + Neues Schema
          </button>
        </div>

        {customThemes.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center">
            <p className="text-sm text-slate-400">
              Noch keine eigenen Farbschemata. Klicke auf „Neues Schema", um eines zu erstellen.
            </p>
          </div>
        ) : (
          <>
            {/* Custom preset cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 mb-6">
              {customAsPresets.map((preset) => (
                <PresetCard
                  key={preset.id}
                  preset={preset}
                  active={activePresetId === preset.id}
                  onSelect={() => selectPreset(preset.id)}
                  onPreview={() => previewPreset(preset.id)}
                />
              ))}
            </div>

            {/* Custom theme editors */}
            <div className="space-y-4">
              {customThemes.map((ct) => (
                <CustomThemeEditor
                  key={ct.id}
                  theme={ct}
                  onChange={(updated) => {
                    updateCustomTheme(ct.id, updated);
                    // No applyTheme() here — use "Vorschau öffnen" to see live changes.
                  }}
                  onDelete={() => deleteCustomTheme(ct.id)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
