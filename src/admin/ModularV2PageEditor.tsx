import type { SiteContent, TemplateKey, ModularPagesV2, ModularSectionV2 } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { seedModularPagesV2 } from '@/lib/cms-v2-contract';
import { getCmsAddableSectionTypes } from '@/lib/cms-contract';
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

function ensureV2(data: SiteContent, tpl: TemplateKey, style: TemplateStyle): ModularPagesV2 {
  const current = data.modularPagesV2;
  if (current?.combo?.template === tpl && current.combo.style === style) return current;
  return seedModularPagesV2(tpl, style);
}

export function shouldUseCmsV2Editor(content?: SiteContent): boolean {
  return content?.cmsV2?.enabled === true;
}

export function ModularV2PageEditor({ data, setData, tpl, style, page, sectionLabels, uploadImage }: Props) {
  const modular = ensureV2(data, tpl, style);
  const sections = modular[page]?.sections ?? [];

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
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-xs text-amber-900">
        CMS V2 ist aktiv: Diese Ansicht schreibt direkt in <code>modularPagesV2</code>. Das Frontend liest dieselben Section-Instanzen, sobald der Draft veroeffentlicht ist.
      </div>

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <section key={section.id} className="border border-line rounded-2xl overflow-hidden bg-white">
            <header className="px-4 py-3 bg-[#fafaf7] border-b border-line flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-brand">v2 type = {section.type}</p>
                <h3 className="font-display text-lg">{sectionLabels[section.type] ?? section.type}</h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <label className="text-xs flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={section.visible !== false} onChange={() => toggleVisible(section.id)} />
                  Sichtbar
                </label>
                <button type="button" className="text-xs px-2 py-1 border border-line rounded" onClick={() => move(idx, -1)} disabled={idx === 0}>↑</button>
                <button type="button" className="text-xs px-2 py-1 border border-line rounded" onClick={() => move(idx, 1)} disabled={idx === sections.length - 1}>↓</button>
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
          {addableTypes.map((type) => (
            <button
              key={type}
              type="button"
              className="text-xs px-3 py-2 rounded-lg border border-line bg-white hover:border-brand"
              onClick={() => addSection(type)}
            >
              + {sectionLabels[type] ?? type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
