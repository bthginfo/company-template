import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSectionDataForm } from './ModularSectionDataForm';
import type { ModularUploadFn } from './modular-section-field-kit';

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
  hasAny: (data: SiteContent) => boolean;
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
  uploadImage?: ModularUploadFn;
};

function formatBranchStyle(style: TemplateStyle): string {
  if (style === 'modern') return 'Modern';
  if (style === 'bold') return 'Bold';
  return 'Klassisch';
}

export function ModularSpecPageEditor({ data, setData, tpl, style, page, cfg, uploadImage }: Props) {
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

  const patchSectionData = (id: string, nextData: Record<string, unknown>) => {
    const nextSecs = sections.map((s) => (s.id === id ? { ...s, data: nextData } : s));
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
    const imported = cfg.importFromLegacy(data, style);
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
        <p className="mt-2 text-xs text-amber-900 max-w-prose leading-relaxed border-t border-amber-200/80 pt-2">
          <strong className="font-semibold">Aktivieren</strong> legt die modulare Seitenstruktur an und übernimmt Ihre bisherigen
          Felder einmalig. <strong className="font-semibold">Deaktivieren</strong> entfernt nur diese zusätzliche Speicher-Schicht — die
          zuletzt gemergten Werte in den normalen Feldern (Hero, Listen, Galerie …) bleiben auf der Website erhalten, bis Sie
          sie dort oder hier wieder ändern.
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
            Modularen Editor deaktivieren (nur Spez-Daten entfernen)
          </button>
        </div>
      </div>

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
              <ModularSectionDataForm
                tpl={tpl}
                style={style}
                sectionType={sec.type}
                data={(sec.data ?? {}) as Record<string, unknown>}
                uploadImage={uploadImage}
                onChange={(next) => patchSectionData(sec.id, next)}
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
  if (cfg.hasAny(data)) return null;
  return (
    <div className="bg-white border border-line rounded-2xl p-4 mb-6">
      <p className="text-sm font-medium">Modularer Seiten-Editor · {cfg.branchLabelDe}</p>
      <p className="text-xs text-muted mt-1 max-w-prose">{cfg.activationIntroDe}</p>
      <p className="text-xs text-muted mt-2 max-w-prose leading-relaxed border-t border-line pt-2">
        <strong className="text-foreground">Aktivieren</strong> legt die modulare Struktur an und übernimmt Inhalte aus den bestehenden
        Feldern. <strong className="text-foreground">Deaktivieren</strong> (im Editor nach Aktivierung) entfernt nur diese
        Speicher-Schicht; gemergte Seiteninhalte bleiben in den normalen Feldern erhalten.
      </p>
      <button
        type="button"
        className="mt-3 text-xs font-medium px-4 py-2 rounded-lg bg-brand text-white"
        onClick={() => {
          const imported = cfg.importFromLegacy(data, style);
          setData(cfg.applyToLegacy({ ...data, modularPagesV1: imported }));
        }}
      >
        Modularen Editor für {cfg.branchLabelDe} aktivieren
      </button>
    </div>
  );
}
