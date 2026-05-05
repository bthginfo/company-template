import { useState } from 'react';
import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import {
  HOTEL_SECTION_LABEL_DE,
  applyHotelModularToLegacy,
  hasAnyHotelModular,
  hasHotelModularPage,
  importHotelModularFromLegacy,
  type HotelModularPageKey,
} from '@/lib/modular-hotel';

type Props = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
};

type PageProps = Props & { page: HotelModularPageKey };

type ModularBundleKey = Exclude<keyof NonNullable<SiteContent['modularPagesV1']>, 'combo'>;

function bundleKey(page: HotelModularPageKey): ModularBundleKey {
  return page;
}

function commitModular(base: SiteContent, modular: NonNullable<SiteContent['modularPagesV1']>) {
  return applyHotelModularToLegacy({ ...base, modularPagesV1: modular });
}

const PAGE_LABEL_DE: Record<HotelModularPageKey, string> = {
  home: 'Start',
  services: 'Zimmer',
  gallery: 'Haus & Spa',
  about: 'Geschichte',
  contact: 'Reservieren',
};

export function ModularHotelPageEditor({ data, setData, tpl, style, page }: PageProps) {
  const [jsonError, setJsonError] = useState<string | null>(null);
  const modular = data.modularPagesV1;
  const key = bundleKey(page);
  const sections = modular?.[key]?.sections ?? [];

  const updateSections = (nextSecs: typeof sections) => {
    if (!modular) return;
    const next: NonNullable<SiteContent['modularPagesV1']> = {
      ...modular,
      [key]: { sections: nextSecs },
    };
    setData(commitModular(data, next));
  };

  const patchSectionData = (id: string, rawJson: string) => {
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(rawJson) as Record<string, unknown>;
    } catch {
      setJsonError('JSON ungültig');
      return;
    }
    setJsonError(null);
    const nextSecs = sections.map((s) => (s.id === id ? { ...s, data: parsed } : s));
    updateSections(nextSecs);
  };

  const toggleVisible = (id: string) => {
    const nextSecs = sections.map((s) => (s.id === id ? { ...s, isVisible: !(s.isVisible !== false) } : s));
    updateSections(nextSecs);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[idx], next[j]] = [next[j], next[idx]];
    updateSections(next);
  };

  const deactivate = () => {
    const { modularPagesV1: _, ...rest } = data;
    setData(rest as SiteContent);
  };

  const reseed = () => {
    const imported = importHotelModularFromLegacy(data, style);
    setData(commitModular(data, imported));
  };

  if (tpl !== 'hotel') {
    return (
      <p className="text-sm text-muted">
        Modulare Speicher-Struktur ist für diese Kombination noch nicht freigeschaltet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-950">
        <p className="font-medium">
          Spez-Modell (Beta) · Hotel · {formatBranchStyle(style)} · {PAGE_LABEL_DE[page]}
        </p>
        <p className="mt-1 text-xs text-amber-900">
          Blöcke gemäß <code className="text-[11px] bg-white/80 px-1 rounded">docs/spec-hotel.md</code>. Änderungen werden in die
          bestehenden SiteContent-Felder gemergt.
        </p>
        <p className="mt-2 text-xs text-amber-900 max-w-prose leading-relaxed border-t border-amber-200/80 pt-2">
          <strong className="font-semibold">Deaktivieren</strong> entfernt nur die Spez-JSON; gemergte Inhalte in den
          normalen Feldern bleiben erhalten.
        </p>
        {modular?.combo?.style && modular.combo.style !== style ? (
          <p className="mt-2 text-xs text-rose-900 max-w-prose rounded-lg border border-rose-200 bg-white/90 px-3 py-2">
            Die Speicher-Struktur ist für <strong>{formatBranchStyle(modular.combo.style)}</strong> angelegt, der Mandant
            nutzt aber <strong>{formatBranchStyle(style)}</strong>. Öffentlich wird trotzdem gemergt; für passende
            Sektionstypen auf „Neu füllen“ klicken (setzt den Stil in den Daten auf {formatBranchStyle(style)}).
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={reseed}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100"
          >
            Alle Spez-Seiten aus aktuellem Inhalt neu füllen
          </button>
          <button
            type="button"
            onClick={deactivate}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100"
          >
            Spez-Modell deaktivieren (nur JSON entfernen)
          </button>
        </div>
      </div>

      {jsonError && <p className="text-sm text-rose-600">{jsonError}</p>}

      <div className="space-y-4">
        {sections.map((sec, idx) => (
          <section key={sec.id} className="border border-line rounded-2xl overflow-hidden bg-white">
            <header className="px-4 py-3 bg-[#fafaf7] border-b border-line flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-brand">type = {sec.type}</p>
                <h3 className="font-display text-lg">
                  {HOTEL_SECTION_LABEL_DE[sec.type] ?? sec.type}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <label className="text-xs flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sec.isVisible !== false}
                    onChange={() => toggleVisible(sec.id)}
                  />
                  Sichtbar
                </label>
                <button type="button" className="text-xs px-2 py-1 border border-line rounded" onClick={() => move(idx, -1)} disabled={idx === 0}>↑</button>
                <button type="button" className="text-xs px-2 py-1 border border-line rounded" onClick={() => move(idx, 1)} disabled={idx === sections.length - 1}>↓</button>
              </div>
            </header>
            <div className="p-4">
              <label className="block text-[10px] uppercase tracking-widest text-muted mb-1">data (JSON)</label>
              <textarea
                className="w-full font-mono text-xs bg-[#f6f6f3] rounded-xl px-3 py-2 border border-line min-h-[140px]"
                defaultValue={JSON.stringify(sec.data ?? {}, null, 2)}
                key={sec.id + JSON.stringify(sec.data)}
                onBlur={(e) => patchSectionData(sec.id, e.target.value)}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function formatBranchStyle(style: TemplateStyle): string {
  if (style === 'modern') return 'Modern';
  if (style === 'bold') return 'Bold';
  return 'Klassisch';
}

export function ModularHotelActivationPanel({ data, setData, tpl, style }: Props) {
  if (tpl !== 'hotel') return null;
  if (hasAnyHotelModular(data)) return null;
  return (
    <div className="bg-white border border-line rounded-2xl p-4 mb-6">
      <p className="text-sm font-medium">Spez-basierter Seiten-Editor (Beta) · Hotel</p>
      <p className="text-xs text-muted mt-1 max-w-prose">
        Aktiviert das modulare JSON-Modell für alle Hotel-Unterseiten (Start, Zimmer, Haus &amp; Spa, Geschichte, Reservieren) im
        Stil {formatBranchStyle(style)}. Inhalte werden einmalig aus den bestehenden Feldern übernommen.
      </p>
      <p className="text-xs text-muted mt-2 max-w-prose leading-relaxed border-t border-line pt-2">
        <strong className="text-foreground">Deaktivieren</strong> (im Editor) entfernt nur die Spez-JSON; gemergte Felder
        bleiben erhalten.
      </p>
      <button
        type="button"
        className="mt-3 text-xs font-medium px-4 py-2 rounded-lg bg-brand text-white"
        onClick={() => {
          const imported = importHotelModularFromLegacy(data, style);
          setData(commitModular(data, imported));
        }}
      >
        Spez-Modell für Hotel aktivieren
      </button>
    </div>
  );
}

export { hasHotelModularPage, hasAnyHotelModular };
