import { useState } from 'react';
import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';

export type ModularSpecPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

export type ModularSpecEditorConfig = {
  tpl: TemplateKey;
  branchLabelDe: string;
  specDoc: string;
  pageLabels: Record<ModularSpecPageKey, string>;
  sectionLabels: Record<string, string>;
  /** Plain-language intro for the activation card (no HTML). */
  activationIntroDe: string;
  importFromLegacy: (data: SiteContent, style: TemplateStyle) => NonNullable<SiteContent['modularPagesV1']>;
  applyToLegacy: (data: SiteContent) => SiteContent;
  hasPage: (data: SiteContent, style: TemplateStyle, page: ModularSpecPageKey) => boolean;
  hasAny: (data: SiteContent, style: TemplateStyle) => boolean;
};

type BundleKey = Exclude<keyof NonNullable<SiteContent['modularPagesV1']>, 'combo'>;

function bundleKey(page: ModularSpecPageKey): BundleKey {
  return page;
}

type Props = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  page: ModularSpecPageKey;
  cfg: ModularSpecEditorConfig;
};

function formatBranchStyle(style: TemplateStyle): string {
  if (style === 'modern') return 'Modern';
  if (style === 'bold') return 'Bold';
  return 'Klassisch';
}

export function ModularSpecPageEditor({ data, setData, tpl, style, page, cfg }: Props) {
  const [jsonError, setJsonError] = useState<string | null>(null);
  const modular = data.modularPagesV1;
  const key = bundleKey(page);
  const sections = modular?.[key]?.sections ?? [];

  const commitModular = (base: SiteContent, nextModular: NonNullable<SiteContent['modularPagesV1']>) =>
    cfg.applyToLegacy({ ...base, modularPagesV1: nextModular });

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
    if (!modular?.combo) return;
    const imported = cfg.importFromLegacy(data, modular.combo.style);
    setData(commitModular(data, imported));
  };

  if (tpl !== cfg.tpl) {
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
          Spez-Modell (Beta) · {cfg.branchLabelDe} · {formatBranchStyle(style)} · {cfg.pageLabels[page]}
        </p>
        <p className="mt-1 text-xs text-amber-900">
          Blöcke gemäß <code className="text-[11px] bg-white/80 px-1 rounded">{cfg.specDoc}</code>. Änderungen werden in die
          bestehenden SiteContent-Felder gemergt.
        </p>
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
            Spez-Modell vollständig deaktivieren
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
                  {cfg.sectionLabels[sec.type] ?? sec.type}
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

type ActivationProps = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  cfg: ModularSpecEditorConfig;
};

export function ModularSpecActivationPanel({ data, setData, tpl, style, cfg }: ActivationProps) {
  if (tpl !== cfg.tpl) return null;
  if (cfg.hasAny(data, style)) return null;
  return (
    <div className="bg-white border border-line rounded-2xl p-4 mb-6">
      <p className="text-sm font-medium">Spez-basierter Seiten-Editor (Beta) · {cfg.branchLabelDe}</p>
      <p className="text-xs text-muted mt-1 max-w-prose">{cfg.activationIntroDe}</p>
      <button
        type="button"
        className="mt-3 text-xs font-medium px-4 py-2 rounded-lg bg-brand text-white"
        onClick={() => {
          const imported = cfg.importFromLegacy(data, style);
          setData(cfg.applyToLegacy({ ...data, modularPagesV1: imported }));
        }}
      >
        Spez-Modell für {cfg.branchLabelDe} aktivieren
      </button>
    </div>
  );
}
