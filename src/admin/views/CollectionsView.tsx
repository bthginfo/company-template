import { useEffect, useState } from 'react';
import type { AdminSession } from '../AdminApp';

type Collection = {
  id: string;
  type: string;
  label: string;
};

type CollectionItem = {
  id: string;
  slug: string;
  title: string;
  order: number;
  published: boolean;
};

export function CollectionsView({ session }: { session: AdminSession }) {
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [selected, setSelected] = useState<Collection | null>(null);
  const [items, setItems] = useState<CollectionItem[] | null>(null);
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [creatingItem, setCreatingItem] = useState(false);
  const [newCollType, setNewCollType] = useState('');
  const [newCollLabel, setNewCollLabel] = useState('');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemSlug, setNewItemSlug] = useState('');
  const [error, setError] = useState('');

  const slug = session.slug ?? '';

  function loadCollections() {
    if (!slug) return;
    fetch(`/api/collections?slug=${slug}`)
      .then((r) => r.json())
      .then((j) => setCollections(j.collections ?? []))
      .catch(() => setCollections([]));
  }

  function loadItems(collectionId: string) {
    fetch(`/api/collections?action=items&collectionId=${collectionId}`)
      .then((r) => r.json())
      .then((j) => setItems(j.items ?? []))
      .catch(() => setItems([]));
  }

  useEffect(loadCollections, [slug]);

  function selectCollection(c: Collection) {
    setSelected(c);
    setItems(null);
    loadItems(c.id);
  }

  async function handleCreateCollection(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch(`/api/collections?slug=${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: newCollType, label: newCollLabel }),
    });
    const j = await res.json();
    if (!res.ok) { setError(j.error || 'Fehler'); return; }
    setCreatingCollection(false);
    setNewCollType('');
    setNewCollLabel('');
    loadCollections();
  }

  async function handleCreateItem(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setError('');
    const res = await fetch(`/api/collections?action=items&collectionId=${selected.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newItemTitle, slug: newItemSlug, published: true }),
    });
    const j = await res.json();
    if (!res.ok) { setError(j.error || 'Fehler'); return; }
    setCreatingItem(false);
    setNewItemTitle('');
    setNewItemSlug('');
    loadItems(selected.id);
  }

  async function toggleItemPublish(item: CollectionItem) {
    if (!selected) return;
    await fetch(`/api/collections?action=item&id=${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !item.published }),
    });
    loadItems(selected.id);
  }

  async function handleDeleteItem(itemId: string) {
    if (!selected || !confirm('Eintrag löschen?')) return;
    await fetch(`/api/collections?action=item&id=${itemId}`, { method: 'DELETE' });
    loadItems(selected.id);
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Sammlungen</h1>
          <p className="text-sm text-slate-500 mt-0.5">Speisekarte, Team, Galerie und mehr</p>
        </div>
        {!selected && (
          <button
            onClick={() => setCreatingCollection(true)}
            className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            + Neue Sammlung
          </button>
        )}
      </div>

      {creatingCollection && (
        <form
          onSubmit={handleCreateCollection}
          className="bg-white border border-slate-200 rounded-xl p-5 mb-5 space-y-3"
        >
          <h2 className="text-sm font-semibold text-slate-900">Neue Sammlung</h2>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Typ (intern)</label>
              <input
                required
                value={newCollType}
                onChange={(e) => { setNewCollType(e.target.value); if (!newCollLabel) setNewCollLabel(e.target.value); }}
                placeholder="menu, team, gallery"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Bezeichnung</label>
              <input
                required
                value={newCollLabel}
                onChange={(e) => setNewCollLabel(e.target.value)}
                placeholder="Speisekarte"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              Erstellen
            </button>
            <button type="button" onClick={() => { setCreatingCollection(false); setError(''); }}
              className="text-sm px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
              Abbrechen
            </button>
          </div>
        </form>
      )}

      {!selected ? (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {collections === null ? (
            <div className="p-6 text-sm text-slate-400">Lädt…</div>
          ) : collections.length === 0 ? (
            <div className="p-6 text-sm text-slate-400">Noch keine Sammlungen vorhanden.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">Bezeichnung</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">Typ</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {collections.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{c.label}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{c.type}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => selectCollection(c)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Einträge →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => { setSelected(null); setItems(null); }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              ← Sammlungen
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold text-slate-900">{selected.label}</span>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setCreatingItem(true)}
                className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                + Eintrag hinzufügen
              </button>
            </div>
          </div>

          {creatingItem && (
            <form
              onSubmit={handleCreateItem}
              className="bg-white border border-slate-200 rounded-xl p-5 mb-5 space-y-3"
            >
              <h2 className="text-sm font-semibold text-slate-900">Neuer Eintrag</h2>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Titel</label>
                  <input
                    required
                    value={newItemTitle}
                    onChange={(e) => {
                      setNewItemTitle(e.target.value);
                      if (!newItemSlug.trim())
                        setNewItemSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                    }}
                    placeholder="Spaghetti Bolognese"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Slug</label>
                  <input
                    required
                    value={newItemSlug}
                    onChange={(e) => setNewItemSlug(e.target.value)}
                    placeholder="spaghetti-bolognese"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                  Hinzufügen
                </button>
                <button type="button" onClick={() => { setCreatingItem(false); setError(''); }}
                  className="text-sm px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                  Abbrechen
                </button>
              </div>
            </form>
          )}

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            {items === null ? (
              <div className="p-6 text-sm text-slate-400">Lädt…</div>
            ) : items.length === 0 ? (
              <div className="p-6 text-sm text-slate-400">Noch keine Einträge vorhanden.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">Titel</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">Slug</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">{item.title}</td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-xs">{item.slug}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleItemPublish(item)}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            item.published
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {item.published ? 'Aktiv' : 'Inaktiv'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-xs text-red-400 hover:text-red-600 font-medium"
                        >
                          Löschen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
