/**
 * Phase 4 — Admin surface for `SiteContent.pageBlocksV1[page]`.
 * One reusable panel per layout page (`PageKey`).
 */

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { SiteContentSchema, type SiteContent, type TemplateKey, type PageBlockInstanceV1 } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import type { AdminSectionKey, PageKey } from '@/admin/admin-sections';
import { getAdminSections, getSectionMeta } from '@/admin/admin-sections';
import {
  newPageBlockInstanceId,
  projectSiteContentToBlockData,
  rebootstrapPageBlocksForSinglePage,
} from '@/lib/page-blocks-v1-bootstrap';
import { applyPageBlockVisibilityToggle } from '@/lib/page-blocks-v1-section-visibility-sync';
import { collectPageBlocksV1Issues, isPageBlockSingletonType } from '@/lib/page-blocks-v1-validate';

function issuesTouchingPage(page: PageKey, issues: string[]): string[] {
  return issues.filter(
    (m) =>
      m.includes(`pageBlocksV1.${page}`) ||
      m === 'pageBlocksV1 must be a plain object' ||
      m.startsWith('pageBlocksV1: unknown page key'),
  );
}

const PAGE_LABEL: Record<PageKey, string> = {
  home: 'Startseite',
  services: 'Leistungen / Services',
  gallery: 'Galerie',
  about: 'Über uns',
  contact: 'Kontakt',
};

function isPlainRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function parseJsonObject(raw: string): Record<string, unknown> | null {
  try {
    const v = JSON.parse(raw) as unknown;
    if (isPlainRecord(v)) return v;
  } catch {
    /* invalid JSON */
  }
  return null;
}

function updatePageBlockList(
  data: SiteContent,
  page: PageKey,
  nextList: PageBlockInstanceV1[],
): SiteContent {
  const parsed = SiteContentSchema.safeParse({
    ...data,
    pageBlocksV1: {
      ...(data.pageBlocksV1 ?? {}),
      [page]: nextList,
    },
  });
  if (!parsed.success) {
    toast.error('Seitenblöcke ungültig', { description: parsed.error.message });
    return data;
  }
  return parsed.data;
}

export type PageBlocksV1PanelProps = {
  page: PageKey;
  data: SiteContent;
  setData: (next: SiteContent) => void;
  tplKey: TemplateKey;
  style: TemplateStyle;
};

export function PageBlocksV1Panel({ page, data, setData, tplKey, style }: PageBlocksV1PanelProps) {
  const list = data.pageBlocksV1?.[page] ?? [];
  const [jsonDraft, setJsonDraft] = useState<Record<string, string>>({});
  /** Raw JSON editors start collapsed; expand per block id when needed. */
  const [jsonExpanded, setJsonExpanded] = useState<Record<string, boolean>>({});

  const duplicateTypesOnPage = useMemo(() => {
    const counts = new Map<string, number>();
    for (const b of list) {
      const t = String(b.type);
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return new Set([...counts.entries()].filter(([, n]) => n > 1).map(([t]) => t));
  }, [list]);

  useEffect(() => {
    setJsonDraft((prev) => {
      const next = { ...prev };
      for (const b of list) {
        if (next[b.id] === undefined) {
          next[b.id] = JSON.stringify(b.data ?? {}, null, 2);
        }
      }
      for (const id of Object.keys(next)) {
        if (!list.some((b) => b.id === id)) delete next[id];
      }
      return next;
    });
  }, [list]);

  const structureIssues = useMemo(() => collectPageBlocksV1Issues(data.pageBlocksV1), [data.pageBlocksV1]);
  const pageIssues = useMemo(() => issuesTouchingPage(page, structureIssues), [page, structureIssues]);

  const applyList = (nextList: PageBlockInstanceV1[]) => {
    setData(updatePageBlockList(data, page, nextList));
  };

  const onRebootstrapPage = () => {
    if (!window.confirm(`Alle Blöcke für „${PAGE_LABEL[page]}“ neu aus den Feldern oben aufbauen? IDs und Reihenfolge werden ersetzt.`)) return;
    try {
      setData(rebootstrapPageBlocksForSinglePage(data, page, tplKey, style));
      toast.success('Seitenblöcke aktualisiert', { description: `Neu aufgebaut: ${PAGE_LABEL[page]}` });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error('Aufbau fehlgeschlagen', { description: msg });
    }
  };

  const move = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    const t = next[index];
    next[index] = next[j]!;
    next[j] = t!;
    applyList(next);
  };

  const toggleVisible = (index: number) => {
    setData(applyPageBlockVisibilityToggle(data, page, index));
  };

  const syncBlockDataFromFields = (index: number) => {
    const b = list[index];
    if (!b) return;
    const t = b.type as AdminSectionKey;
    if (duplicateTypesOnPage.has(String(t))) {
      toast.error('„Aus Feldern“ nicht möglich', {
        description:
          'Auf dieser Seite gibt es mehrere Blöcke desselben Typs. Die Felder oben sind nur eine gemeinsame Quelle — bitte JSON pro Block pflegen oder Duplikate entfernen.',
      });
      return;
    }
    const projected = projectSiteContentToBlockData(data, t);
    const next = list.map((row, i) => (i === index ? { ...row, data: projected } : row));
    applyList(next);
    setJsonDraft((prev) => ({ ...prev, [b.id]: JSON.stringify(projected, null, 2) }));
    toast.success('Block-Daten übernommen', { description: getSectionMeta(t, tplKey, style).title });
  };

  const onJsonBlur = (index: number, blockId: string) => {
    const raw = jsonDraft[blockId];
    if (raw === undefined) return;
    const parsedObj = parseJsonObject(raw);
    if (parsedObj === null) {
      toast.error('JSON ungültig', { description: 'Bitte gültiges Objekt { … } eintragen.' });
      return;
    }
    const next = list.map((row, i) => (i === index ? { ...row, data: parsedObj } : row));
    const candidate = updatePageBlockList(data, page, next);
    const issues = collectPageBlocksV1Issues(candidate.pageBlocksV1);
    const blocking = issuesTouchingPage(page, issues);
    if (blocking.length > 0) {
      toast.error('Validierung fehlgeschlagen', { description: blocking.slice(0, 3).join(' · ') });
      return;
    }
    setData(candidate);
  };

  const addableTypes = useMemo(() => {
    const order = getAdminSections(page, tplKey, style);
    return order.filter((t) => !isPageBlockSingletonType(t) || !list.some((b) => b.type === t));
  }, [page, tplKey, style, list]);

  const [addType, setAddType] = useState<AdminSectionKey | ''>('');

  useEffect(() => {
    if (addableTypes.length === 0) {
      setAddType('');
      return;
    }
    if (!addType || !addableTypes.includes(addType as AdminSectionKey)) {
      setAddType(addableTypes[0]!);
    }
  }, [addableTypes, addType]);

  const addBlock = () => {
    if (!addType) return;
    const t = addType as AdminSectionKey;
    const inst: PageBlockInstanceV1 = {
      id: newPageBlockInstanceId(),
      type: t,
      isVisible: true,
      data: {},
    };
    applyList([...list, inst]);
    setJsonDraft((prev) => ({ ...prev, [inst.id]: JSON.stringify(inst.data, null, 2) }));
    toast.success('Block hinzugefügt', { description: getSectionMeta(t, tplKey, style).title });
  };

  const removeBlock = (index: number) => {
    if (!window.confirm('Diesen Block wirklich entfernen?')) return;
    applyList(list.filter((_, i) => i !== index));
  };

  return (
    <section className="rounded-2xl border border-line bg-white/80 overflow-hidden" aria-labelledby={`pageblocks-${page}-h`}>
      <div className="px-5 py-4 border-b border-line bg-[#fafaf7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 id={`pageblocks-${page}-h`} className="font-display text-lg text-slate-900">
            CMS-Seitenblöcke
          </h2>
          <p className="text-xs text-muted mt-0.5 max-w-prose">
            Reihenfolge und Sichtbarkeit für die Live-Darstellung (Phase 3 Daten-Merge). Die Sektions-Karten oben sind die
            Haupteditoren; JSON nur bei Bedarf. Mehrere Blöcke gleichen Typs: nicht „Aus Feldern“ (würde alle gleich setzen).
            JSON pro Block muss zu den erlaubten Feldwurzeln passen.
          </p>
        </div>
        <button
          type="button"
          onClick={onRebootstrapPage}
          className="shrink-0 text-sm px-4 py-2 rounded-xl border border-line bg-white hover:bg-slate-50"
        >
          Seite neu aus Feldern
        </button>
      </div>

      {pageIssues.length > 0 && (
        <div className="px-5 py-3 bg-rose-50 text-rose-800 text-sm border-b border-rose-100">
          <p className="font-medium">Hinweis zu dieser Seite / Struktur</p>
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            {pageIssues.slice(0, 8).map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-5 space-y-6">
        {list.length === 0 ? (
          <p className="text-sm text-muted">
            Noch keine Blöcke für diese Seite. Nutzen Sie „Seite neu aus Feldern“, um die Standardliste anzulegen.
          </p>
        ) : (
          list.map((b, i) => {
            const meta = getSectionMeta(b.type as AdminSectionKey, tplKey, style);
            const visible = b.isVisible !== false;
            return (
              <div key={b.id} className="rounded-xl border border-line p-4 space-y-3 bg-white">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted font-mono">{b.type}</p>
                    <p className="font-medium text-slate-900">{meta.title}</p>
                    <p className="text-xs text-muted mt-0.5">{meta.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer">
                      <input type="checkbox" checked={visible} onChange={() => toggleVisible(i)} />
                      Sichtbar
                    </label>
                    <button type="button" className="text-xs px-2 py-1 rounded-lg border border-line hover:bg-slate-50" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Nach oben">
                      ↑
                    </button>
                    <button type="button" className="text-xs px-2 py-1 rounded-lg border border-line hover:bg-slate-50" onClick={() => move(i, 1)} disabled={i === list.length - 1} aria-label="Nach unten">
                      ↓
                    </button>
                    <button
                      type="button"
                      className="text-xs px-2 py-1 rounded-lg border border-line hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={() => syncBlockDataFromFields(i)}
                      disabled={duplicateTypesOnPage.has(String(b.type))}
                      title={
                        duplicateTypesOnPage.has(String(b.type))
                          ? 'Mehrere Blöcke dieses Typs: bitte JSON pro Block bearbeiten.'
                          : 'Block-Daten aus den Hauptfeldern projizieren'
                      }
                    >
                      Aus Feldern
                    </button>
                    <button type="button" className="text-xs px-2 py-1 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50" onClick={() => removeBlock(i)}>
                      Entfernen
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-[10px] uppercase tracking-widest text-muted">data (JSON)</label>
                  <button
                    type="button"
                    className="text-xs text-brand hover:underline"
                    onClick={() => setJsonExpanded((prev) => ({ ...prev, [b.id]: !prev[b.id] }))}
                  >
                    {jsonExpanded[b.id] ? 'JSON ausblenden' : 'JSON anzeigen'}
                  </button>
                </div>
                {jsonExpanded[b.id] ? (
                  <textarea
                    className="w-full min-h-[140px] font-mono text-xs border border-line rounded-lg p-3 bg-[#fafaf7] focus:outline-none focus:ring-2 focus:ring-slate-300"
                    spellCheck={false}
                    value={jsonDraft[b.id] ?? JSON.stringify(b.data ?? {}, null, 2)}
                    onChange={(e) => setJsonDraft((prev) => ({ ...prev, [b.id]: e.target.value }))}
                    onBlur={() => onJsonBlur(i, b.id)}
                  />
                ) : (
                  <p className="text-xs text-muted border border-dashed border-line rounded-lg px-3 py-2 bg-[#fafaf7]/80">
                    Eingeklappt — bei Bedarf „JSON anzeigen“ für Rohdaten dieses Blocks.
                  </p>
                )}
              </div>
            );
          })
        )}

        <div className="flex flex-wrap items-end gap-2 pt-2 border-t border-line">
          {addableTypes.length > 0 ? (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest text-muted">Block-Typ hinzufügen</label>
                <select
                  className="text-sm border border-line rounded-lg px-3 py-2 bg-white min-w-[200px]"
                  value={addType}
                  onChange={(e) => setAddType(e.target.value as AdminSectionKey)}
                >
                  {addableTypes.map((t) => (
                    <option key={t} value={t}>
                      {getSectionMeta(t, tplKey, style).title} ({t})
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={addBlock} className="text-sm px-4 py-2 rounded-lg btn-primary" disabled={!addType}>
                Hinzufügen
              </button>
            </>
          ) : (
            <p className="text-xs text-muted">Alle erlaubten Block-Typen für diese Seite sind bereits vorhanden (Singletons max. einmal).</p>
          )}
        </div>
      </div>
    </section>
  );
}
