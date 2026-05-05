import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { useMemo } from 'react';
import { ModularSectionDataForm } from './ModularSectionDataForm';
import type { ModularUploadFn } from './modular-section-field-kit';
import {
  RESTAURANT_SECTION_LABEL_DE,
  applyRestaurantModularToLegacy,
  hasAnyRestaurantModular,
  hasRestaurantModularPage,
  importRestaurantModularFromLegacy,
  type RestaurantModularPageKey,
} from '@/lib/modular-restaurant';
import { useBootstrapModularIfNeeded } from './use-modular-bootstrap';
import { getEffectiveHomeSectionKeys } from '@/lib/effective-home-order';
import { isModularHomeSectionAdminVisible } from '@/lib/modular-home-admin-visibility';
import { applyModularHomeVisibilityMirror } from '@/lib/page-blocks-v1-section-visibility-sync';
import { ANNOUNCEMENT_BAR_SECTION_KEY } from '@/lib/page-layout';

type Props = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  uploadImage?: ModularUploadFn;
};

type PageProps = Props & { page: RestaurantModularPageKey };

type ModularBundleKey = Exclude<keyof NonNullable<SiteContent['modularPagesV1']>, 'combo'>;

function bundleKey(page: RestaurantModularPageKey): ModularBundleKey {
  return page;
}

function commitModular(base: SiteContent, modular: NonNullable<SiteContent['modularPagesV1']>) {
  return applyRestaurantModularToLegacy({ ...base, modularPagesV1: modular });
}

export function ModularRestaurantPageEditor({ data, setData, tpl, style, page, uploadImage }: PageProps) {
  useBootstrapModularIfNeeded({
    tpl,
    style,
    data,
    setData,
    cfgTpl: 'restaurant',
    importFromLegacy: importRestaurantModularFromLegacy,
    applyToLegacy: applyRestaurantModularToLegacy,
    hasAny: hasAnyRestaurantModular,
  });
  const modular = data.modularPagesV1;
  const key = bundleKey(page);
  const sections = modular?.[key]?.sections ?? [];
  const homeSlots = useMemo(
    () => (page === 'home' ? getEffectiveHomeSectionKeys(data, tpl, style) : null),
    [page, data, tpl, style],
  );
  const hiddenHomeCount = useMemo(() => {
    if (page !== 'home' || !homeSlots) return 0;
    return sections.filter((s) => !isModularHomeSectionAdminVisible(tpl, style, s.type, homeSlots)).length;
  }, [page, sections, tpl, style, homeSlots]);

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
      merged = applyModularHomeVisibilityMirror(merged, 'restaurant', sec.type, nextVisible);
    } else if (sec.type === 'noticeBanner') {
      const vis = ((merged as { sectionVisibility?: Record<string, boolean> }).sectionVisibility ?? {}) as Record<string, boolean>;
      merged = {
        ...merged,
        sectionVisibility: { ...vis, [`${page}.${ANNOUNCEMENT_BAR_SECTION_KEY}`]: nextVisible },
      };
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

  if (tpl !== 'restaurant') {
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
        {sections
          .filter((s) => !(style === 'classic' && s.type === 'featuredItems'))
          .map((sec) => {
          const idx = sections.indexOf(sec);
          const homeVisible = page !== 'home' || !homeSlots || isModularHomeSectionAdminVisible(tpl, style, sec.type, homeSlots);
          if (!homeVisible) {
            return (
              <section key={sec.id} className="border border-dashed border-line rounded-2xl overflow-hidden bg-[#fafaf7]/80 opacity-90">
                <header className="px-4 py-3 border-b border-line flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">type = {sec.type}</p>
                    <h3 className="font-display text-base text-muted">
                      {RESTAURANT_SECTION_LABEL_DE[sec.type] ?? sec.type}
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
                  {RESTAURANT_SECTION_LABEL_DE[sec.type] ?? sec.type}
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
    </div>
  );
}

function formatBranchStyle(style: TemplateStyle): string {
  if (style === 'modern') return 'Modern';
  if (style === 'bold') return 'Bold';
  return 'Klassisch';
}

/** Prefer ModularRestaurantPageEditor with page set to home. */
export function ModularHomeEditor(props: Props) {
  return <ModularRestaurantPageEditor {...props} page="home" />;
}

export function ModularRestaurantActivationPanel({ data, setData, tpl, style }: Props) {
  if (tpl !== 'restaurant') return null;
  if (hasAnyRestaurantModular(data)) return null;
  return (
    <div className="bg-white border border-line rounded-2xl p-4 mb-6">
      <p className="text-sm font-medium">Modularer Seiten-Editor · Restaurant</p>
      <p className="text-xs text-muted mt-1 max-w-prose">
        Aktiviert den modularen Editor für <strong className="font-medium text-brand">alle Restaurant-Unterseiten</strong> (Start,
        Speisekarte, Galerie, Über uns, Kontakt) im Stil {formatBranchStyle(style)}. Ihre bestehenden Inhalte werden einmalig übernommen;
        danach bearbeiten Sie die Blöcke hier mit den üblichen Formularfeldern oder schalten wieder zurück.
      </p>
      <p className="text-xs text-muted mt-2 max-w-prose leading-relaxed border-t border-line pt-2">
        <strong className="text-foreground">Deaktivieren</strong> (im Editor) entfernt nur die modulare Speicher-Schicht; gemergte Felder bleiben
        erhalten.
      </p>
      <button
        type="button"
        className="mt-3 text-xs font-medium px-4 py-2 rounded-lg bg-brand text-white"
        onClick={() => {
          const imported = importRestaurantModularFromLegacy(data, style);
          setData(commitModular(data, imported));
        }}
      >
        Modularen Editor für Restaurant aktivieren
      </button>
    </div>
  );
}

/** @deprecated Use ModularRestaurantActivationPanel */
export function ModularHomeActivationPanel(props: Props) {
  return <ModularRestaurantActivationPanel {...props} />;
}

export { hasRestaurantModularPage, hasAnyRestaurantModular };
