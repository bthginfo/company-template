import { useEffect, useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { AdminSession } from '../AdminApp';
import { SECTION_TYPES, SECTION_TYPE_MAP } from '../section-types';
import { SectionDataEditor } from './SectionDataEditor';

type Page = {
  id: string;
  slug: string;
  title: string;
  pageType: string;
  isSystem: boolean;
  published: boolean;
  order: number;
  seoTitle: string;
  seoDescription: string;
};

type Section = {
  id: string;
  pageId: string;
  type: string;
  order: number;
  visible: boolean;
  isFixed: boolean;
  data: Record<string, unknown>;
  draft: Record<string, unknown> | null;
};

export function PageEditorView({ session: _session }: { session: AdminSession }) {
  const { pageId } = useParams<{ pageId: string }>();

  const [page, setPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, unknown>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const [showMeta, setShowMeta] = useState(false);
  const [meta, setMeta] = useState({ title: '', metaTitle: '', metaDescription: '', published: false });

  async function loadPage() {
    if (!pageId) return;
    const res = await fetch(`/api/pages?id=${pageId}`);
    if (!res.ok) return;
    const j = await res.json() as { page: Page };
    setPage(j.page);
    setMeta({
      title: j.page.title,
      metaTitle: j.page.seoTitle ?? '',
      metaDescription: j.page.seoDescription ?? '',
      published: j.page.published,
    });
  }

  async function loadSections() {
    if (!pageId) return;
    const res = await fetch(`/api/sections?pageId=${pageId}`);
    if (!res.ok) return;
    const j = await res.json() as { sections: Section[] };
    setSections(j.sections ?? []);
  }

  useEffect(() => {
    Promise.all([loadPage(), loadSections()]).finally(() => setLoading(false));
  }, [pageId]);

  // ─── Section actions ──────────────────────────────────────────────────────

  async function handleAddSection(type: string) {
    setShowAddModal(false);
    const defaultData = SECTION_TYPE_MAP[type]?.defaultData ?? {};
    await fetch(`/api/sections?pageId=${pageId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data: defaultData }),
    });
    await loadSections();
  }

  async function handleDeleteSection(id: string) {
    if (!confirm('Sektion wirklich löschen?')) return;
    await fetch(`/api/sections?id=${id}`, { method: 'DELETE' });
    if (editingId === id) setEditingId(null);
    await loadSections();
  }

  async function handleToggleVisible(section: Section) {
    await fetch(`/api/sections?id=${section.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: !section.visible }),
    });
    setSections((prev) =>
      prev.map((s) => (s.id === section.id ? { ...s, visible: !s.visible } : s)),
    );
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;

    const a = sections[index];
    const b = sections[target];

    // Optimistic UI update
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    setSections(next);

    // Swap order values in DB
    await Promise.all([
      fetch(`/api/sections?id=${a.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: b.order }),
      }),
      fetch(`/api/sections?id=${b.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: a.order }),
      }),
    ]);
  }

  function startEdit(section: Section) {
    if (editingId === section.id) {
      setEditingId(null);
      setIsDirty(false);
      return;
    }
    setEditingId(section.id);
    setEditData({ ...(section.data ?? {}) });
    setIsDirty(false);
  }

  // Keyboard shortcut: Ctrl+S / Cmd+S saves when editor is open
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's' && editingId && isDirty) {
        e.preventDefault();
        handleSaveEdit();
      }
    },
    [editingId, isDirty, editData],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  async function handleSaveEdit() {
    if (!editingId) return;
    setSaving(true);
    await fetch(`/api/sections?id=${editingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: editData }),
    });
    setSaving(false);
    setIsDirty(false);
    setSavedMsg('Gespeichert ✓');
    setTimeout(() => setSavedMsg(''), 2000);
    setEditingId(null);
    await loadSections();
  }

  // ─── Page meta save ───────────────────────────────────────────────────────

  async function handleSaveMeta(e: React.FormEvent) {
    e.preventDefault();
    if (!page) return;
    await fetch(`/api/pages?id=${page.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meta),
    });
    await loadPage();
    setShowMeta(false);
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  if (loading) {
    return <div className="p-8 text-sm text-slate-400">Lädt…</div>;
  }

  if (!page) {
    return <div className="p-8 text-sm text-red-500">Seite nicht gefunden.</div>;
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/admin/pages" className="text-slate-500 hover:text-slate-800 transition-colors">
          Seiten
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-medium">{page.title}</span>
      </div>

      {/* Page header card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-slate-900 truncate">{page.title}</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">/{page.slug}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                page.published
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {page.published ? 'Veröffentlicht' : 'Entwurf'}
            </span>
            <button
              onClick={() => setShowMeta(!showMeta)}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
            >
              Seiten-Info
            </button>
          </div>
        </div>

        {showMeta && (
          <form
            onSubmit={handleSaveMeta}
            className="mt-4 pt-4 border-t border-slate-100 space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Seiten-Titel</label>
                <input
                  value={meta.title}
                  onChange={(e) => setMeta((m) => ({ ...m, title: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Meta-Titel (SEO)</label>
                <input
                  value={meta.metaTitle}
                  onChange={(e) => setMeta((m) => ({ ...m, metaTitle: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Meta-Beschreibung (SEO)</label>
              <textarea
                value={meta.metaDescription}
                onChange={(e) => setMeta((m) => ({ ...m, metaDescription: e.target.value }))}
                rows={2}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={meta.published}
                  onChange={(e) => setMeta((m) => ({ ...m, published: e.target.checked }))}
                  className="w-4 h-4 rounded accent-slate-800"
                />
                Veröffentlicht
              </label>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Speichern
              </button>
              <button
                type="button"
                onClick={() => setShowMeta(false)}
                className="text-sm px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Section list header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-700">
          Sektionen
          <span className="ml-1.5 text-slate-400 font-normal">({sections.length})</span>
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          + Sektion hinzufügen
        </button>
      </div>

      {/* Sections */}
      {sections.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-xl p-10 text-center">
          <p className="text-sm text-slate-400">Diese Seite hat noch keine Sektionen.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Erste Sektion hinzufügen →
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {sections.map((section, index) => {
            const typeDef = SECTION_TYPE_MAP[section.type];
            const isEditing = editingId === section.id;

            return (
              <div
                key={section.id}
                className={`bg-white rounded-xl overflow-hidden border transition-all ${
                  isEditing
                    ? 'border-blue-300 shadow-sm shadow-blue-100'
                    : section.visible
                    ? 'border-slate-200 hover:border-slate-300'
                    : 'border-slate-200 opacity-60'
                }`}
              >
                {/* Card header row */}
                <div className="flex items-center gap-3 px-4 py-3">
                  {/* Icon + label */}
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-base w-6 text-center shrink-0 leading-none">
                      {typeDef?.icon ?? '▪'}
                    </span>
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-slate-900">
                        {typeDef?.label ?? section.type}
                      </span>
                      {section.data.headline ? (
                        <span className="text-xs text-slate-400 ml-2 truncate hidden sm:inline">
                          — {String(section.data.headline)}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMove(index, -1)}
                      disabled={index === 0}
                      title="Nach oben"
                      className="w-7 h-7 flex items-center justify-center rounded text-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleMove(index, 1)}
                      disabled={index === sections.length - 1}
                      title="Nach unten"
                      className="w-7 h-7 flex items-center justify-center rounded text-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    >
                      ↓
                    </button>

                    <button
                      onClick={() => handleToggleVisible(section)}
                      title={section.visible ? 'Ausblenden' : 'Einblenden'}
                      className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-sm"
                    >
                      {section.visible ? '👁' : '🚫'}
                    </button>

                    <button
                      onClick={() => startEdit(section)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        isEditing
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      {isEditing ? 'Schließen' : 'Bearbeiten'}
                    </button>

                    {!section.isFixed && (
                      <button
                        onClick={() => handleDeleteSection(section.id)}
                        title="Sektion löschen"
                        className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline data editor */}
                {isEditing && (
                  <div className="border-t border-blue-100 bg-gradient-to-b from-blue-50/40 to-white px-5 py-4">
                    <SectionDataEditor
                      sectionType={section.type}
                      data={editData}
                      onChange={(d) => { setEditData(d); setIsDirty(true); }}
                    />
                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
                      <button
                        onClick={handleSaveEdit}
                        disabled={saving}
                        className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition-colors"
                      >
                        {saving ? 'Speichert…' : 'Änderungen speichern'}
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setIsDirty(false); }}
                        className="text-sm px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        Verwerfen
                      </button>
                      {savedMsg && (
                        <span className="text-xs text-emerald-600 font-medium">{savedMsg}</span>
                      )}
                      {isDirty && !saving && (
                        <span className="text-xs text-slate-400 ml-auto hidden sm:block">
                          Ctrl+S zum Speichern
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Add section modal ─────────────────────────────────────────────── */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
              <h2 className="text-base font-semibold text-slate-900">Sektion hinzufügen</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SECTION_TYPES.map((t) => (
                  <button
                    key={t.type}
                    onClick={() => handleAddSection(t.type)}
                    className="flex flex-col items-start p-4 bg-slate-50 border border-slate-200 rounded-xl text-left hover:bg-blue-50 hover:border-blue-200 transition-all group"
                  >
                    <span className="text-2xl mb-2 leading-none">{t.icon}</span>
                    <span className="text-sm font-medium text-slate-900 group-hover:text-blue-700 leading-tight">
                      {t.label}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 leading-snug">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
