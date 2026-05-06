import type { SiteContent, TemplateKey, ModularPagesV2, ModularSectionV2 } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { seedModularPagesV2 } from '@/lib/cms-v2-contract';
import { getCmsAddableSectionTypes, getCmsSectionFieldKeys } from '@/lib/cms-contract';
import { ModularSectionDataForm } from './ModularSectionDataForm';
import type { ModularUploadFn } from './modular-section-field-kit';
import type { ModularSpecPageKey } from './modular-section-types';

type Props = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  page: ModularSpecPageKey;
  sectionLabels: Record<string, string>;
  uploadImage?: ModularUploadFn;
};

const PAGE_LABELS: Record<ModularSpecPageKey, string> = {
  home: 'Startseite',
  services: 'Leistungen',
  gallery: 'Galerie',
  about: 'Über uns',
  contact: 'Kontakt',
};

function ensureV2(data: SiteContent, tpl: TemplateKey, style: TemplateStyle): ModularPagesV2 {
  const current = data.modularPagesV2;
  if (current?.combo?.template === tpl && current.combo.style === style) return current;
  return seedModularPagesV2(tpl, style);
}

function valueAtPath(root: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => (
    current && typeof current === 'object' && !Array.isArray(current)
      ? (current as Record<string, unknown>)[key]
      : undefined
  ), root);
}

function hasMeaningfulValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.some(hasMeaningfulValue);
  if (typeof value === 'object') return Object.values(value as Record<string, unknown>).some(hasMeaningfulValue);
  return true;
}

function emptyFieldCount(section: ModularSectionV2): number {
  const data = (section.data ?? {}) as Record<string, unknown>;
  return getCmsSectionFieldKeys(section.type).filter((key) => !hasMeaningfulValue(valueAtPath(data, key))).length;
}

export function shouldUseCmsV2Editor(content?: SiteContent): boolean {
  return content?.cmsV2?.enabled === true;
}

export function ModularV2PageEditor({ data, setData, tpl, style, page, sectionLabels, uploadImage }: Props) {
  const modular = ensureV2(data, tpl, style);
  const rawSections = modular[page]?.sections ?? [];
  const sections = rawSections.filter((section) => section.type !== 'noticeBanner');
  const visibleCount = sections.filter((section) => section.visible !== false).length;
  const sectionsWithEmptyFields = sections.filter((section) => emptyFieldCount(section) > 0).length;

  const commit = (nextSections: ModularSectionV2[]) => {
    const nextModular: ModularPagesV2 = {
      ...modular,
      [page]: { sections: nextSections },
    };
    setData({ ...data, modularPagesV2: nextModular });
  };

  const patchSectionData = (id: string, nextData: Record<string, unknown>) => {
    commit(sections.map((section) => (section.id === id ? { ...section, data: nextData } : section)));
  };

  const toggleVisible = (id: string) => {
    commit(sections.map((section) => (section.id === id ? { ...section, visible: !(section.visible !== false) } : section)));
  };

  const move = (idx: number, dir: -1 | 1) => {
    const nextIdx = idx + dir;
    if (nextIdx < 0 || nextIdx >= sections.length) return;
    const next = [...sections];
    [next[idx], next[nextIdx]] = [next[nextIdx], next[idx]];
    commit(next);
  };

  const removeSection = (id: string) => {
    const section = sections.find((s) => s.id === id);
    if (!section) return;
    const label = sectionLabels[section.type] ?? section.type;
    if (!window.confirm(`Section "${label}" aus dieser Seite entfernen?`)) return;
    commit(sections.filter((s) => s.id !== id));
  };

  const addableTypes = getCmsAddableSectionTypes(tpl, style, page, sections.map((s) => s.type));
  const addSection = (type: string) => {
    if (!addableTypes.includes(type)) return;
    const sameTypeCount = sections.filter((s) => s.type === type).length;
    commit([
      ...sections,
      {
        id: `${page}-${type}-${sameTypeCount}-${Date.now().toString(36)}`,
        type,
        visible: false,
        data: {},
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Seitenstruktur</p>
          <h2 className="font-display text-xl">{PAGE_LABELS[page]} bearbeiten</h2>
          <p className="text-xs text-muted mt-1">Admin und Frontend verwenden dieselben Section-Instanzen. Speichern schreibt Draft, Veröffentlichen geht live.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-line bg-[#fafaf7] px-3 py-1">{sections.length} Sections</span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 text-emerald-900 px-3 py-1">{visibleCount} sichtbar</span>
          {sectionsWithEmptyFields ? (
            <span className="rounded-full border border-amber-200 bg-amber-50 text-amber-900 px-3 py-1">{sectionsWithEmptyFields} Sections mit Lücken</span>
          ) : (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 text-emerald-900 px-3 py-1">Alle Felder gepflegt</span>
          )}
          <span className="rounded-full border border-line bg-[#fafaf7] px-3 py-1">{tpl} / {style}</span>
        </div>
      </div>

      <div className="space-y-4">
        {!sections.length ? (
          <div className="rounded-2xl border border-dashed border-line bg-[#fafaf7] p-6 text-sm text-muted">
            Diese Seite hat noch keine Sections. Fügen Sie unten einen erlaubten Section-Typ hinzu.
          </div>
        ) : null}
        {sections.map((section, idx) => (
          <section key={section.id} className="border border-line rounded-2xl overflow-hidden bg-white">
            <header className="px-4 py-3 bg-[#fafaf7] border-b border-line flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-brand">{section.type}</p>
                <h3 className="font-display text-lg">{sectionLabels[section.type] ?? section.type}</h3>
                <p className="text-xs text-muted mt-0.5">Position {idx + 1} von {sections.length}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {emptyFieldCount(section) ? (
                  <span className="text-xs px-2 py-1 rounded border border-amber-200 bg-amber-50 text-amber-900">{emptyFieldCount(section)} Felder leer</span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded border border-emerald-200 bg-emerald-50 text-emerald-900">Felder gepflegt</span>
                )}
                <label className="text-xs flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={section.visible !== false} onChange={() => toggleVisible(section.id)} />
                  Sichtbar
                </label>
                <button type="button" className="text-xs px-2 py-1 border border-line rounded disabled:opacity-40" onClick={() => move(idx, -1)} disabled={idx === 0}>Hoch</button>
                <button type="button" className="text-xs px-2 py-1 border border-line rounded disabled:opacity-40" onClick={() => move(idx, 1)} disabled={idx === sections.length - 1}>Runter</button>
                <button type="button" className="text-xs px-2 py-1 border border-rose-200 text-rose-700 rounded" onClick={() => removeSection(section.id)}>Entfernen</button>
              </div>
            </header>
            <div className="p-4">
              <ModularSectionDataForm
                tpl={tpl}
                style={style}
                sectionType={section.type}
                data={(section.data ?? {}) as Record<string, unknown>}
                uploadImage={uploadImage}
                modularPage={page}
                siteContent={data}
                onPatchSiteContent={(patch) => setData({ ...data, ...patch })}
                onChange={(next) => patchSectionData(section.id, next)}
              />
            </div>
          </section>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-line bg-[#fafaf7] p-4">
        <label className="block text-xs uppercase tracking-widest text-muted mb-2">Section hinzufügen</label>
        <div className="flex flex-wrap gap-2">
          {addableTypes.length ? (
            addableTypes.map((type) => (
              <button
                key={type}
                type="button"
                className="text-xs px-3 py-2 rounded-lg border border-line bg-white hover:border-brand"
                onClick={() => addSection(type)}
              >
                + {sectionLabels[type] ?? type}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">Alle für diese Seite erlaubten Section-Typen sind bereits angelegt.</p>
          )}
        </div>
      </div>
    </div>
  );
}
