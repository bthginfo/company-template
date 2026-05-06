import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { useMemo } from 'react';
import { ModularSectionDataForm } from './ModularSectionDataForm';
import type { ModularUploadFn } from './modular-section-field-kit';
import { useBootstrapModularIfNeeded } from './use-modular-bootstrap';
import { getHomeLayoutSlotKeys } from '@/lib/effective-home-order';
import { isModularHomeSectionAdminVisible } from '@/lib/modular-home-admin-visibility';
import { applyModularHomeVisibilityMirror } from '@/lib/page-blocks-v1-section-visibility-sync';
import type { ModularSpecPageKey } from './modular-section-types';
import { getCmsAddableSectionTypes } from '@/lib/cms-contract';

export type { ModularSpecPageKey } from './modular-section-types';

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
  const rawSections = modular?.[key]?.sections ?? [];
  const sections = rawSections.filter((section) => section.type !== 'noticeBanner');
  const homeSlots = useMemo(
    () => (page === 'home' ? getHomeLayoutSlotKeys(data, cfg.tpl, style) : null),
    [page, data, cfg.tpl, style],
  );
  const hiddenHomeCount = useMemo(() => {
    if (page !== 'home' || !homeSlots) return 0;
    return sections.filter((s) => !isModularHomeSectionAdminVisible(cfg.tpl, style, s.type, homeSlots)).length;
  }, [page, sections, cfg.tpl, style, homeSlots]);

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

  const addableSectionTypes = useMemo(
    () => getCmsAddableSectionTypes(cfg.tpl, style, page, sections.map((s) => s.type)),
    [cfg.tpl, style, page, sections],
  );

  const addSection = (type: string) => {
    if (!modular || !addableSectionTypes.includes(type)) return;
    const sameTypeCount = sections.filter((s) => s.type === type).length;
    updateSections([
      ...sections,
      {
        id: `${page}-${type}-${sameTypeCount}-${Date.now().toString(36)}`,
        type,
        isVisible: false,
        data: {},
      },
    ]);
  };

  const removeSection = (id: string) => {
    const sec = sections.find((s) => s.id === id);
    if (!sec) return;
    const label = cfg.sectionLabels[sec.type] ?? sec.type;
    if (!window.confirm(`Section "${label}" aus dieser Seite entfernen?`)) return;
    updateSections(sections.filter((s) => s.id !== id));
  };

  const patchSectionData = (id: string, nextData: Record<string, unknown>) => {
    const nextSecs = sections.map((s) => (s.id === id ? { ...s, data: nextData } : s));
    updateSections(nextSecs);
  };

  const toggleVisible = (id: string) => {
    const sec = sections.find((s) => s.id === id);
    if (!sec || !modular) return;
    const nextVisible = !(sec.isVisible !== false);
    const nextSecs = sections.map((s) => (s.id === id ? { ...s, isVisible: nextVisible } : s));
    const nextModular: NonNullable<SiteContent['modularPagesV1']> = {
      ...modular,
      [key]: { sections: nextSecs },
    };
    let merged = commitModular(data, nextModular);
    if (page === 'home') {
      merged = applyModularHomeVisibilityMirror(merged, cfg.tpl, sec.type, nextVisible);
    }
    setData(merged);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[idx], next[j]] = [next[j], next[idx]];
    updateSections(next);
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
          Hinweis: Modulare Metadaten sind für <strong>{formatBranchStyle(modular.combo.style)}</strong> gespeichert, der Mandant nutzt
          aber <strong>{formatBranchStyle(style)}</strong>. Inhalte werden weiter ins Frontend gemergt; bei Bedarf Stil im Admin an die
          gespeicherte Kombination anpassen.
        </p>
      ) : null}

      {hiddenHomeCount > 0 ? (
        <p className="text-xs text-muted max-w-prose border border-line rounded-xl px-3 py-2 bg-[#fafaf7]">
          {hiddenHomeCount} Block(e) sind für diese Branchen/Stil-Kombination auf der Startseite nicht sichtbar (kein passender Layout-Slot).
          Daten bleiben gespeichert; bei Layout-Änderung können sie wieder relevant werden.
        </p>
      ) : null}

      <div className="space-y-4">
        {sections.map((sec, idx) => {
          const homeVisible = page !== 'home' || !homeSlots || isModularHomeSectionAdminVisible(cfg.tpl, style, sec.type, homeSlots);
          if (!homeVisible) {
            return (
              <section key={sec.id} className="border border-dashed border-line rounded-2xl overflow-hidden bg-[#fafaf7]/80 opacity-90">
                <header className="px-4 py-3 border-b border-line flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">type = {sec.type}</p>
                    <h3 className="font-display text-base text-muted">
                      {cfg.sectionLabels[sec.type] ?? sec.type}
                      <span className="ml-2 text-xs font-sans font-normal text-amber-800">· nicht im aktuellen Startseiten-Layout</span>
                    </h3>
                  </div>
                </header>
              </section>
            );
          }
          return (
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
                <button type="button" className="text-xs px-2 py-1 border border-rose-200 text-rose-700 rounded" onClick={() => removeSection(sec.id)}>Entfernen</button>
              </div>
            </header>
            <div className="p-4">
              <ModularSectionDataForm
                tpl={tpl}
                style={style}
                sectionType={sec.type}
                data={(sec.data ?? {}) as Record<string, unknown>}
                uploadImage={uploadImage}
                modularPage={page}
                siteContent={data}
                onPatchSiteContent={(patch) => setData({ ...data, ...patch })}
                onChange={(next) => patchSectionData(sec.id, next)}
              />
            </div>
          </section>
          );
        })}
      </div>
      <div className="rounded-2xl border border-dashed border-line bg-[#fafaf7] p-4">
        <label className="block text-xs uppercase tracking-widest text-muted mb-2">
          Section hinzufügen
        </label>
        <div className="flex flex-wrap gap-2">
          {addableSectionTypes.length ? (
            addableSectionTypes.map((type) => (
              <button
                key={type}
                type="button"
                className="text-xs px-3 py-2 rounded-lg border border-line bg-white hover:border-brand"
                onClick={() => addSection(type)}
              >
                + {cfg.sectionLabels[type] ?? type}
              </button>
            ))
          ) : (
            <p className="text-xs text-muted">
              Alle für diese Branchen/Stil/Seiten-Kombination erlaubten Section-Typen sind bereits vorhanden.
            </p>
          )}
        </div>
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
