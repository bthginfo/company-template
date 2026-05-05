import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSectionDataForm } from './ModularSectionDataForm';
import type { ModularUploadFn } from './modular-section-field-kit';
import { useBootstrapModularIfNeeded } from './use-modular-bootstrap';

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
  useBootstrapModularIfNeeded({
    tpl,
    style,
    data,
    setData,
    cfgTpl: cfg.tpl,
    importFromLegacy: cfg.importFromLegacy,
    applyToLegacy: cfg.applyToLegacy,
    hasAny: cfg.hasAny,
  });
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
      {modular?.combo?.style && modular.combo.style !== style ? (
        <p className="text-xs text-rose-900 max-w-prose rounded-xl border border-rose-200 bg-rose-50/80 px-3 py-2">
          Die Speicher-Struktur ist für <strong>{formatBranchStyle(modular.combo.style)}</strong> angelegt, der Mandant nutzt aber{' '}
          <strong>{formatBranchStyle(style)}</strong>. Öffentlich wird trotzdem gemergt; unter „Erweiterte Seitenaktionen“ können Sie
          den Inhalt neu importieren (setzt den Stil in den Daten auf {formatBranchStyle(style)}).
        </p>
      ) : null}
      <details className="rounded-xl border border-line bg-[#fafaf7] px-3 py-2 text-xs text-muted">
        <summary className="cursor-pointer font-medium text-foreground select-none">Erweiterte Seitenaktionen</summary>
        <p className="mt-2 leading-relaxed max-w-prose">
          Referenz: <code className="text-[11px] bg-white px-1 rounded border border-line">{cfg.specDoc}</code>. Inhalt aus den
          klassischen Feldern erneut in alle modularen Seiten übernehmen, oder nur die modulare Speicher-Schicht entfernen (gemergte
          Werte bleiben in SiteContent).
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={reseed}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-line hover:bg-muted/30"
          >
            Alle Seiten aus aktuellem Inhalt neu füllen
          </button>
          <button
            type="button"
            onClick={deactivate}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-line hover:bg-muted/30"
          >
            Modulare Daten entfernen
          </button>
        </div>
      </details>

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
