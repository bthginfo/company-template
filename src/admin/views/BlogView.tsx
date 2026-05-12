import { useEffect, useState } from 'react';
import type { AdminSession } from '../AdminApp';

type Post = {
  id: string;
  slug: string;
  title: string;
  category: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
};

export function BlogView({ session }: { session: AdminSession }) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [error, setError] = useState('');

  const slug = session.slug ?? '';

  function load() {
    if (!slug) return;
    fetch(`/api/blog?slug=${slug}&admin=1`)
      .then((r) => r.json())
      .then((j) => setPosts(j.posts ?? []))
      .catch(() => setPosts([]));
  }

  useEffect(load, [slug]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch(`/api/blog?slug=${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, slug: newSlug, published: false }),
    });
    const j = await res.json();
    if (!res.ok) { setError(j.error || 'Fehler'); return; }
    setCreating(false);
    setNewTitle('');
    setNewSlug('');
    load();
  }

  async function togglePublish(post: Post) {
    await fetch(`/api/blog?id=${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    });
    load();
  }

  async function handleDelete(postId: string) {
    if (!confirm('Beitrag wirklich löschen?')) return;
    await fetch(`/api/blog?id=${postId}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Blog</h1>
          <p className="text-sm text-slate-500 mt-0.5">Beiträge verwalten</p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          + Neuer Beitrag
        </button>
      </div>

      {creating && (
        <form
          onSubmit={handleCreate}
          className="bg-white border border-slate-200 rounded-xl p-5 mb-5 space-y-3"
        >
          <h2 className="text-sm font-semibold text-slate-900">Neuer Beitrag</h2>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Titel</label>
              <input
                required
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                  if (!newSlug.trim())
                    setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                }}
                placeholder="Mein neuer Beitrag"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Slug / URL</label>
              <input
                required
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="mein-neuer-beitrag"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Erstellen
            </button>
            <button
              type="button"
              onClick={() => { setCreating(false); setError(''); }}
              className="text-sm px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {posts === null ? (
          <div className="p-6 text-sm text-slate-400">Lädt…</div>
        ) : posts.length === 0 ? (
          <div className="p-6 text-sm text-slate-400">Noch keine Beiträge vorhanden.</div>
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
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{post.title}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">/{post.slug}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(post)}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        post.published
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {post.published ? 'Veröffentlicht' : 'Entwurf'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleDelete(post.id)}
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
  );
}
