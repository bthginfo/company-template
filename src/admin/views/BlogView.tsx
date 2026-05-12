import { useEffect, useState } from 'react';
import type { AdminSession } from '../AdminApp';
import { RichTextEditor } from '../RichTextEditor';
import { ImageField } from '../ImageField';

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  content: Record<string, unknown>[];
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
};

type PostDraft = {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  /** HTML string stored as a single richText block on save */
  bodyHtml: string;
  author: string;
  category: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
};

function emptyDraft(): PostDraft {
  return {
    title: '', slug: '', excerpt: '', featuredImage: '',
    bodyHtml: '', author: '', category: '', tags: '',
    seoTitle: '', seoDescription: '', published: false,
  };
}

function autoSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function BlogView({ session }: { session: AdminSession }) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [editing, setEditing] = useState<Post | 'new' | null>(null);
  const [draft, setDraft] = useState<PostDraft>(emptyDraft());
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [error, setError] = useState('');

  const tenantSlug = session.slug ?? '';

  function load() {
    if (!tenantSlug) return;
    fetch(`/api/blog?slug=${tenantSlug}&admin=1`)
      .then((r) => r.json())
      .then((j) => setPosts(j.posts ?? []))
      .catch(() => setPosts([]));
  }

  useEffect(load, [tenantSlug]);

  function openNew() {
    setDraft(emptyDraft());
    setEditing('new');
    setError('');
  }

  function openEdit(post: Post) {
    const bodyHtml =
      post.content.length > 0 && post.content[0].type === 'richText'
        ? String(post.content[0].html ?? '')
        : '';
    setDraft({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      bodyHtml,
      author: post.author,
      category: post.category,
      tags: (post.tags ?? []).join(', '),
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      published: post.published,
    });
    setEditing(post);
    setError('');
  }

  function setField<K extends keyof PostDraft>(key: K, value: PostDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function toApiPayload(d: PostDraft, publishedOverride?: boolean) {
    const isPublished = publishedOverride !== undefined ? publishedOverride : d.published;
    return {
      title: d.title,
      slug: d.slug,
      excerpt: d.excerpt,
      featuredImage: d.featuredImage,
      content: d.bodyHtml ? [{ type: 'richText', html: d.bodyHtml }] : [],
      author: d.author,
      category: d.category,
      tags: d.tags.split(',').map((t) => t.trim()).filter(Boolean),
      seoTitle: d.seoTitle,
      seoDescription: d.seoDescription,
      published: isPublished,
    };
  }

  async function handleSave(publishedOverride?: boolean) {
    setError('');
    setSaving(true);
    try {
      const payload = toApiPayload(draft, publishedOverride);
      let res: Response;
      if (editing === 'new') {
        res = await fetch(`/api/blog?slug=${tenantSlug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/blog?id=${(editing as Post).id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      const j = await res.json() as { post?: Post; error?: string };
      if (!res.ok) { setError(j.error || 'Fehler'); return; }
      setEditing(j.post as Post);
      if (publishedOverride !== undefined) setDraft((d) => ({ ...d, published: publishedOverride }));
      setSavedMsg(publishedOverride === true ? 'Veröffentlicht ✓' : 'Gespeichert ✓');
      setTimeout(() => setSavedMsg(''), 2500);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(postId: string) {
    if (!confirm('Beitrag wirklich löschen?')) return;
    await fetch(`/api/blog?id=${postId}`, { method: 'DELETE' });
    if (editing !== 'new' && (editing as Post)?.id === postId) setEditing(null);
    load();
  }

  // ─── Post editor view ─────────────────────────────────────────────────────
  if (editing !== null) {
    return (
      <div className="p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setEditing(null)}
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Blog
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-900 truncate">
            {editing === 'new' ? 'Neuer Beitrag' : draft.title || 'Beitrag bearbeiten'}
          </span>
          <div className="ml-auto flex items-center gap-2 shrink-0">
            {savedMsg && <span className="text-xs text-emerald-600 font-medium">{savedMsg}</span>}
            {error && <span className="text-xs text-red-500">{error}</span>}
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60 transition-colors"
            >
              {saving ? 'Speichert…' : 'Entwurf speichern'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="text-sm bg-slate-900 text-white rounded-lg px-4 py-1.5 hover:bg-slate-800 disabled:opacity-60 transition-colors"
            >
              {draft.published ? 'Aktualisieren' : 'Veröffentlichen'}
            </button>
            {editing !== 'new' && (
              <button
                onClick={() => handleDelete((editing as Post).id)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Löschen
              </button>
            )}
          </div>
        </div>

        <div className="space-y-5">
          {/* Title + meta */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Titel *</label>
              <input
                required
                value={draft.title}
                onChange={(e) => {
                  setField('title', e.target.value);
                  if (!draft.slug || draft.slug === autoSlug(draft.title))
                    setField('slug', autoSlug(e.target.value));
                }}
                placeholder="Mein Blogbeitrag"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Slug / URL *</label>
                <input
                  value={draft.slug}
                  onChange={(e) => setField('slug', e.target.value)}
                  placeholder="mein-blogbeitrag"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Kategorie</label>
                <input
                  value={draft.category}
                  onChange={(e) => setField('category', e.target.value)}
                  placeholder="News"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Autor</label>
                <input
                  value={draft.author}
                  onChange={(e) => setField('author', e.target.value)}
                  placeholder="Max Mustermann"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tags (kommagetrennt)</label>
                <input
                  value={draft.tags}
                  onChange={(e) => setField('tags', e.target.value)}
                  placeholder="news, update, tipps"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <label className="block text-xs font-medium text-slate-600 mb-1">Kurztext / Excerpt</label>
            <textarea
              value={draft.excerpt}
              onChange={(e) => setField('excerpt', e.target.value)}
              placeholder="Kurze Vorschau des Beitrags (wird in Listen angezeigt)…"
              rows={3}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
            />
          </div>

          {/* Featured image */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <label className="block text-xs font-medium text-slate-600 mb-3">Titelbild</label>
            <ImageField
              url={draft.featuredImage}
              onChange={(url) => setField('featuredImage', url)}
              buttonLabel="Titelbild hochladen"
            />
          </div>

          {/* Rich text body */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
              <span className="text-xs font-medium text-slate-700">Beitragsinhalt</span>
            </div>
            <div className="p-4">
              <RichTextEditor
                value={draft.bodyHtml}
                onChange={(html) => setField('bodyHtml', html)}
                placeholder="Inhalt des Beitrags hier eingeben…"
                rows={20}
              />
            </div>
          </div>

          {/* SEO */}
          <details className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <summary className="px-5 py-3 text-xs font-medium text-slate-600 bg-slate-50 border-b border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors list-none flex items-center justify-between">
              <span>SEO</span>
              <span className="text-slate-400">▾</span>
            </summary>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Meta-Titel</label>
                <input
                  value={draft.seoTitle}
                  onChange={(e) => setField('seoTitle', e.target.value)}
                  placeholder={draft.title}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Meta-Beschreibung</label>
                <textarea
                  value={draft.seoDescription}
                  onChange={(e) => setField('seoDescription', e.target.value)}
                  placeholder={draft.excerpt}
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
                />
              </div>
            </div>
          </details>
        </div>
      </div>
    );
  }

  // ─── Post list ───────────────────────────────────────────────────────────────
  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Blog</h1>
          <p className="text-sm text-slate-500 mt-0.5">Beiträge verwalten</p>
        </div>
        <button
          onClick={openNew}
          className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          + Neuer Beitrag
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {posts === null ? (
          <div className="p-6 text-sm text-slate-400">Lädt…</div>
        ) : posts.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-3xl mb-3">✏️</div>
            <p className="text-sm text-slate-500">Noch keine Beiträge vorhanden.</p>
            <button onClick={openNew} className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Ersten Beitrag erstellen →
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">Titel</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">Kategorie</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{post.title}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{post.category || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {post.published ? 'Veröffentlicht' : 'Entwurf'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(post)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Bearbeiten →
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
