import { useContent } from './lib/content-context';
import { getTenantSlug, getTemplateKey, getTemplateStyle, type TemplateStyle } from './lib/tenant';
import { applyTheme, resolveThemePreset } from './lib/theme';
import type { TemplateKey, SiteContent } from './lib/types';
import { useEffect, useState, useCallback } from 'react';
import { renderSection } from './components/section-renderers';

// ─── API types ────────────────────────────────────────────────────────────────

interface Page {
  id: string;
  slug: string;
  title: string;
  order: number;
  published: boolean;
  isSystem: boolean;
  pageType: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface Section {
  id: string;
  type: string;
  data: Record<string, unknown>;
  order: number;
  visible: boolean;
}

// ─── Data hooks ───────────────────────────────────────────────────────────────

function usePages(tenantSlug: string, preview: boolean) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!tenantSlug) return;
    try {
      const qs = preview ? '&preview=1' : '';
      const r = await fetch(`/api/pages?slug=${encodeURIComponent(tenantSlug)}${qs}`, { cache: 'no-store' });
      if (!r.ok) return;
      const json = await r.json();
      setPages((json.pages ?? []) as Page[]);
    } catch {
      // ignore — site renders with empty nav if API fails
    } finally {
      setLoading(false);
    }
  }, [tenantSlug, preview]);

  useEffect(() => { load(); }, [load]);
  return { pages, loading };
}

function useSections(pageId: string | null, preview: boolean) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageId) { setLoading(false); return; }
    setLoading(true);
    const qs = preview ? '&preview=1' : '';
    fetch(`/api/sections?pageId=${encodeURIComponent(pageId)}${qs}`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((j) => setSections((j.sections ?? []) as Section[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pageId, preview]);

  return { sections, loading };
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function SiteNav({
  brandName,
  logoUrl,
  pages,
  currentSlug,
  preview,
}: {
  brandName: string;
  logoUrl?: string;
  pages: Page[];
  currentSlug: string;
  preview: boolean;
}) {
  const [open, setOpen] = useState(false);
  const navPages = pages.filter((p) => p.published && !p.isSystem && p.pageType !== 'blog');

  const href = (p: Page) => {
    const base = p.slug === 'home' || p.slug === '' ? '/' : `/${p.slug}`;
    return preview ? `${base}?preview=1` : base;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-line shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo / Name */}
        <a href={preview ? '/?preview=1' : '/'} className="flex items-center gap-3 shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-9 w-auto object-contain" />
          ) : (
            <span className="text-xl font-display font-bold text-brand">{brandName}</span>
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navPages.map((p) => {
            const active = currentSlug === (p.slug || 'home');
            return (
              <a
                key={p.id}
                href={href(p)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active ? 'bg-brand text-brand-fg' : 'text-ink hover:bg-surface'
                }`}
              >
                {p.title}
              </a>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-ink hover:bg-surface transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü öffnen"
        >
          <span className={`block w-5 h-0.5 bg-current transition-transform mb-1 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-transform mt-1 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-line bg-white">
          {navPages.map((p) => (
            <a
              key={p.id}
              href={href(p)}
              className="block px-6 py-3 text-sm text-ink hover:bg-surface border-b border-line last:border-0"
              onClick={() => setOpen(false)}
            >
              {p.title}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function SiteFooter({
  brandName,
  content,
  pages,
  preview,
}: {
  brandName: string;
  content: SiteContent;
  pages: Page[];
  preview: boolean;
}) {
  const contact = content.contact;
  const social = content.social;
  const legalPages = pages.filter((p) => p.published && p.isSystem);

  type SocialKey = 'instagram' | 'facebook' | 'whatsapp' | 'linkedin' | 'youtube' | 'tiktok' | 'x';
  const socialLinks: { key: SocialKey; icon: string; label: string }[] = [
    { key: 'instagram', icon: '📸', label: 'Instagram' },
    { key: 'facebook', icon: '📘', label: 'Facebook' },
    { key: 'whatsapp', icon: '💬', label: 'WhatsApp' },
    { key: 'linkedin', icon: '💼', label: 'LinkedIn' },
    { key: 'youtube', icon: '▶️', label: 'YouTube' },
    { key: 'tiktok', icon: '🎵', label: 'TikTok' },
    { key: 'x', icon: '✖', label: 'X / Twitter' },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="text-xl font-display font-bold mb-3">{brandName}</div>
            {contact?.address && <p className="text-white/60 text-sm">{contact.address}</p>}
            {contact?.city && <p className="text-white/60 text-sm">{contact.city}</p>}
            {contact?.phone && (
              <a href={`tel:${contact.phone}`} className="text-white/60 text-sm hover:text-white mt-2 block">
                {contact.phone}
              </a>
            )}
            {contact?.email && (
              <a href={`mailto:${contact.email}`} className="text-white/60 text-sm hover:text-white block">
                {contact.email}
              </a>
            )}
          </div>

          {/* Opening hours */}
          {contact?.hours && contact.hours.length > 0 && (
            <div>
              <div className="font-semibold mb-3 text-sm">Öffnungszeiten</div>
              <ul className="space-y-1">
                {contact.hours.map((h, i) => (
                  <li key={i} className="flex justify-between text-xs text-white/60 gap-4">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social */}
          {social && (
            <div>
              <div className="font-semibold mb-3 text-sm">Social Media</div>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ key, icon, label }) => {
                  const url = social?.[key];
                  if (!url) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg hover:bg-white/20 transition-colors"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-white/40">
          <span>© {new Date().getFullYear()} {brandName}</span>
          <div className="flex gap-4">
            {legalPages.map((p) => (
              <a
                key={p.id}
                href={preview ? `/${p.slug}?preview=1` : `/${p.slug}`}
                className="hover:text-white/70 transition-colors"
              >
                {p.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <main className="animate-pulse">
      <div className="h-[60vh] bg-slate-200" />
      <div className="py-16 px-6 max-w-5xl mx-auto space-y-4">
        <div className="h-8 w-64 bg-slate-200 rounded-full" />
        <div className="h-4 w-full bg-slate-100 rounded-full" />
        <div className="h-4 w-5/6 bg-slate-100 rounded-full" />
        <div className="h-4 w-4/6 bg-slate-100 rounded-full" />
      </div>
    </main>
  );
}

// ─── 404 ──────────────────────────────────────────────────────────────────────

function NotFound({ brandName, preview }: { brandName: string; preview: boolean }) {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-6">
      <div className="text-7xl font-display font-bold text-brand">404</div>
      <h1 className="text-2xl font-semibold text-ink">Seite nicht gefunden</h1>
      <p className="text-ink/60 max-w-md">
        Diese Seite existiert leider nicht. Kehre zur Startseite zurück.
      </p>
      <a
        href={preview ? '/?preview=1' : '/'}
        className="inline-block bg-brand text-brand-fg font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        Zurück zur Startseite
      </a>
      <p className="text-xs text-ink/30">{brandName}</p>
    </main>
  );
}

// ─── Page renderer ────────────────────────────────────────────────────────────

function SitePage({
  page,
  tenantSlug,
  preview,
}: {
  page: Page | null;
  tenantSlug: string;
  preview: boolean;
}) {
  const { sections, loading } = useSections(page?.id ?? null, preview);

  useEffect(() => {
    if (page) {
      document.title = page.seoTitle || page.title;
      if (page.seoDescription) {
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'description';
          document.head.appendChild(meta);
        }
        meta.content = page.seoDescription;
      }
    }
  }, [page]);

  if (loading) return <PageSkeleton />;
  if (!page) return null;

  const visibleSections = sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <main>
      {visibleSections.map((s) => (
        <div key={s.id}>{renderSection(s.type, s.data, tenantSlug)}</div>
      ))}
      {visibleSections.length === 0 && (
        <div className="min-h-[50vh] flex items-center justify-center text-ink/40 text-sm">
          Diese Seite hat noch keinen Inhalt.
        </div>
      )}
    </main>
  );
}

// ─── Blog detail page ───────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  content: { type: string; html?: string }[];
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
}

function BlogDetailPage({
  tenantSlug,
  postSlug,
  preview,
  brandName,
}: {
  tenantSlug: string;
  postSlug: string;
  preview: boolean;
  brandName: string;
}) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    const qs = preview ? '&preview=1' : '';
    fetch(`/api/blog?slug=${encodeURIComponent(tenantSlug)}&postSlug=${encodeURIComponent(postSlug)}${qs}`, {
      cache: 'no-store',
    })
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j) => {
        if (!j) return;
        const p = j.post as BlogPost;
        setPost(p);
        document.title = p.seoTitle || p.title;
        if (p.seoDescription) {
          let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
          if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'description';
            document.head.appendChild(meta);
          }
          meta.content = p.seoDescription;
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [tenantSlug, postSlug, preview]);

  if (loading) return <PageSkeleton />;
  if (notFound || !post) return <NotFound brandName={brandName} preview={preview} />;

  const bodyHtml = post.content
    .filter((c) => c.type === 'richText' && c.html)
    .map((c) => c.html!)
    .join('');

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <main className="min-h-[60vh]">
      {/* Hero */}
      {post.featuredImage ? (
        <div className="w-full h-72 md:h-96 bg-slate-200 overflow-hidden">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-40 bg-brand" />
      )}

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink/60 mb-4">
          {post.category && (
            <span className="bg-brand/10 text-brand font-medium px-3 py-1 rounded-full text-xs">
              {post.category}
            </span>
          )}
          {formattedDate && <span>{formattedDate}</span>}
          {post.author && <span>von {post.author}</span>}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-ink/70 mb-8 leading-relaxed border-l-4 border-brand pl-4">
            {post.excerpt}
          </p>
        )}

        {/* Body */}
        {bodyHtml && (
          <div className="rte-output" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-line">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-surface text-ink/70 text-xs px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <a
            href={preview ? '/blog?preview=1' : '/blog'}
            className="text-brand text-sm hover:underline"
          >
            ← Zurück zum Blog
          </a>
        </div>
      </article>
    </main>
  );
}

// ─── Collection item detail page ─────────────────────────────────────────────

interface CollectionItemDetail {
  id: string;
  slug: string;
  title: string;
  featuredImage?: string;
  data: Record<string, unknown>;
  hasSubpage: boolean;
}
interface CollectionMeta {
  id: string;
  type: string;
  label: string;
}

function CollectionItemPage({
  tenantSlug,
  itemSlug,
  preview,
  brandName,
}: {
  tenantSlug: string;
  itemSlug: string;
  preview: boolean;
  brandName: string;
}) {
  const [item, setItem] = useState<CollectionItemDetail | null>(null);
  const [collection, setCollection] = useState<CollectionMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    const qs = preview ? '&preview=1' : '';
    fetch(
      `/api/collections?action=itemBySlug&slug=${encodeURIComponent(tenantSlug)}&itemSlug=${encodeURIComponent(itemSlug)}${qs}`,
      { cache: 'no-store' },
    )
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j) => {
        if (!j) return;
        setItem(j.item as CollectionItemDetail);
        setCollection(j.collection as CollectionMeta);
        document.title = `${j.item.title} – ${brandName}`;
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [tenantSlug, itemSlug, preview, brandName]);

  if (loading) return <PageSkeleton />;
  if (notFound || !item) return <NotFound brandName={brandName} preview={preview} />;

  // Render known data fields generically — templates can override in Phase 9
  const d = item.data;
  const str = (v: unknown) => (typeof v === 'string' && v ? v : null);
  const fields = Object.entries(d).filter(([, v]) => typeof v === 'string' && (v as string).trim());

  return (
    <main className="min-h-[60vh]">
      {/* Hero image or color bar */}
      {item.featuredImage ? (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-32 bg-brand" />
      )}

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        {collection && (
          <div className="text-sm text-ink/50 mb-4">
            <a href={preview ? '/?preview=1' : '/'} className="hover:text-brand transition-colors">
              Start
            </a>
            <span className="mx-2">/</span>
            <span className="text-brand font-medium">{collection.label}</span>
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink mb-6 leading-tight">
          {item.title}
        </h1>

        {/* Featured image description or body */}
        {str(d.description) && (
          <p className="text-lg text-ink/70 mb-8 leading-relaxed">{str(d.description)}</p>
        )}
        {str(d.body) && (
          <div className="rte-output mb-8" dangerouslySetInnerHTML={{ __html: str(d.body)! }} />
        )}

        {/* Price highlight */}
        {str(d.price) && (
          <div className="inline-flex items-center gap-2 bg-brand/10 text-brand font-semibold text-xl px-5 py-3 rounded-2xl mb-8">
            {str(d.price)}
          </div>
        )}

        {/* Generic data fields */}
        {fields.filter(([k]) => !['description', 'body', 'price'].includes(k)).length > 0 && (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-line pt-6">
            {fields
              .filter(([k]) => !['description', 'body', 'price'].includes(k))
              .map(([key, value]) => (
                <div key={key}>
                  <dt className="text-xs font-medium text-ink/50 uppercase tracking-wide mb-1">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                  </dt>
                  <dd className="text-sm text-ink">{String(value)}</dd>
                </div>
              ))}
          </dl>
        )}

        {/* Back link */}
        <div className="mt-10">
          <a
            href={preview ? '/?preview=1' : '/'}
            className="text-brand text-sm hover:underline"
          >
            ← Zurück
          </a>
        </div>
      </div>
    </main>
  );
}

// ─── Blog list page (/blog) ───────────────────────────────────────────────────

interface BlogListPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string | null;
}

function BlogListPage({
  tenantSlug,
  preview,
  brandName,
}: {
  tenantSlug: string;
  preview: boolean;
  brandName: string;
}) {
  const [posts, setPosts] = useState<BlogListPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.title = `Blog – ${brandName}`;
    const qs = preview ? '&preview=1' : '';
    fetch(`/api/blog?slug=${encodeURIComponent(tenantSlug)}${qs}`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((j) => setPosts((j.posts ?? []) as BlogListPost[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tenantSlug, preview, brandName]);

  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[];

  const filtered = posts.filter((p) => {
    const matchCat = !activeCategory || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt ?? '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) return <PageSkeleton />;

  return (
    <main className="min-h-[60vh]">
      {/* Header */}
      <div className="bg-brand py-16 px-6 text-center text-brand-fg">
        <h1 className="text-4xl font-display font-bold mb-3">Blog</h1>
        <p className="text-brand-fg/75 text-lg max-w-xl mx-auto">
          Aktuelle Beiträge, Neuigkeiten und Einblicke.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="search"
            placeholder="Suchen…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-line rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !activeCategory ? 'bg-brand text-brand-fg' : 'bg-surface text-ink hover:bg-brand/10'
                }`}
              >
                Alle
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat ? 'bg-brand text-brand-fg' : 'bg-surface text-ink hover:bg-brand/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-ink/40">
            {search || activeCategory ? 'Keine Beiträge gefunden.' : 'Noch keine Beiträge veröffentlicht.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => {
              const href = preview ? `/blog/${post.slug}?preview=1` : `/blog/${post.slug}`;
              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('de-AT', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })
                : null;
              return (
                <a
                  key={post.id}
                  href={href}
                  className="group flex flex-col rounded-2xl bg-white border border-line overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 bg-brand/10 flex items-center justify-center text-brand/30 text-5xl">
                      ✏️
                    </div>
                  )}
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-2 text-xs text-ink/50">
                      {post.category && (
                        <span className="text-brand font-medium">{post.category}</span>
                      )}
                      {date && <span>{date}</span>}
                    </div>
                    <h2 className="font-semibold text-ink group-hover:text-brand transition-colors leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-ink/60 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    )}
                    {post.author && (
                      <p className="text-xs text-ink/40 mt-auto pt-2">von {post.author}</p>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

// ─── Preview banner ────────────────────────────────────────────────────────────

function PreviewBanner() {
  return (
    <div className="bg-amber-500 text-white text-center text-sm py-2 px-4 font-medium sticky top-0 z-50">
      👁 Vorschau-Modus — Diese Seite zeigt den unveröffentlichten Entwurf.{' '}
      <a href="/" className="underline underline-offset-2 hover:text-amber-100">Zur Live-Seite →</a>
    </div>
  );
}

// ─── Main SiteRouter ──────────────────────────────────────────────────────────

export function SiteRouter() {
  const { state } = useContent();

  // Theme application (unchanged from v1 logic)
  const presetId = state.status === 'ready' ? (state.content as any)?.brand?.themePresetId : undefined;
  const customThemes = state.status === 'ready' ? (state.content as any)?.brand?.customThemes : undefined;
  const customThemesKey = state.status === 'ready' ? JSON.stringify((state.content as any)?.brand?.customThemes ?? []) : '';
  const themeKey = state.status === 'ready' ? (state.tenant.template || getTemplateKey()) : null;

  useEffect(() => {
    if (!presetId || !themeKey) return;
    const preset = resolveThemePreset(themeKey as TemplateKey, presetId, customThemes);
    if (preset) applyTheme(preset);
  }, [themeKey, presetId, customThemesKey, customThemes]);

  // ── Early states ────────────────────────────────────────────────────────────
  if (state.status === 'loading') {
    return <div className="min-h-screen grid place-items-center text-slate-500">Lädt …</div>;
  }
  if (state.status === 'error') {
    return (
      <div className="min-h-screen grid place-items-center p-8 text-center">
        <div>
          <p className="text-rose-600 font-semibold">Inhalt konnte nicht geladen werden.</p>
          <p className="text-sm text-slate-500 mt-2">{state.error}</p>
        </div>
      </div>
    );
  }

  // ── Ready ───────────────────────────────────────────────────────────────────
  const tenantSlug = state.tenant.slug || getTenantSlug();
  const brandName = state.content.brand?.name || state.tenant.name || 'Website';
  const logoUrl = state.content.brand?.logoUrl;

  const isPreview =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === '1';

  // Determine current path slug
  const rawPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  // Strip leading slash, treat "/" as "home"
  const pathSlug = rawPath === '/' ? 'home' : rawPath.replace(/^\//, '').replace(/\/$/, '');

  return (
    <PageShell
      tenantSlug={tenantSlug}
      brandName={brandName}
      logoUrl={logoUrl}
      content={state.content}
      pathSlug={pathSlug}
      isPreview={isPreview}
      hasDraft={state.hasDraft}
    />
  );
}

// ─── PageShell — loads pages and routes ───────────────────────────────────────
// Separated so hooks (usePages) run after state is ready.

function PageShell({
  tenantSlug,
  brandName,
  logoUrl,
  content,
  pathSlug,
  isPreview,
  hasDraft,
}: {
  tenantSlug: string;
  brandName: string;
  logoUrl?: string;
  content: SiteContent;
  pathSlug: string;
  isPreview: boolean;
  hasDraft: boolean;
}) {
  const { pages, loading: pagesLoading } = usePages(tenantSlug, isPreview);

  // ── Blog detail route: /blog/:slug ──────────────────────────────────────────
  const isBlogDetail = pathSlug.startsWith('blog/') && pathSlug.length > 5;
  const blogPostSlug = isBlogDetail ? pathSlug.slice(5) : null;

  // ── Blog list route: /blog ────────────────────────────────────────────────
  // Shows BlogListPage if no CMS page with slug "blog" exists, or always
  // when pathSlug is exactly "blog" and pageType is "blog".
  const blogCmsPage = pages.find((p) => p.slug === 'blog');
  const isBlogList = !isBlogDetail && pathSlug === 'blog' &&
    (!blogCmsPage || blogCmsPage.pageType === 'blog');

  // Resolve the current page (skip for blog routes)
  const currentPage = (!isBlogDetail && !isBlogList)
    ? pages.find((p) => {
        if (pathSlug === 'home' || pathSlug === '') return p.slug === 'home' || p.slug === '';
        return p.slug === pathSlug;
      }) ?? null
    : null;

  // Collection item detail: single-segment slug that doesn't match any CMS page
  // We attempt itemBySlug — CollectionItemPage handles 404 internally if not found.
  const isCollectionItem =
    !isBlogDetail &&
    !isBlogList &&
    !pagesLoading &&
    currentPage === null &&
    pathSlug !== '' &&
    pathSlug !== 'home' &&
    !pathSlug.includes('/');

  const notFound = !pagesLoading && !isBlogDetail && !isBlogList && !isCollectionItem && pages.length > 0 && currentPage === null;
  const style: TemplateStyle = (content as any)?.brand?.style || getTemplateStyle();
  void style; // consumed by template-specific wrappers in future phases

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      {isPreview && hasDraft && <PreviewBanner />}

      {!pagesLoading && (
        <SiteNav
          brandName={brandName}
          logoUrl={logoUrl}
          pages={pages}
          currentSlug={pathSlug}
          preview={isPreview}
        />
      )}

      <div className="flex-1">
        {isBlogDetail ? (
          <BlogDetailPage
            tenantSlug={tenantSlug}
            postSlug={blogPostSlug!}
            preview={isPreview}
            brandName={brandName}
          />
        ) : isBlogList ? (
          <BlogListPage
            tenantSlug={tenantSlug}
            preview={isPreview}
            brandName={brandName}
          />
        ) : isCollectionItem ? (
          <CollectionItemPage
            tenantSlug={tenantSlug}
            itemSlug={pathSlug}
            preview={isPreview}
            brandName={brandName}
          />
        ) : pagesLoading ? (
          <PageSkeleton />
        ) : notFound ? (
          <NotFound brandName={brandName} preview={isPreview} />
        ) : (
          <SitePage page={currentPage} tenantSlug={tenantSlug} preview={isPreview} />
        )}
      </div>

      {!pagesLoading && (
        <SiteFooter
          brandName={brandName}
          content={content}
          pages={pages}
          preview={isPreview}
        />
      )}
    </div>
  );
}
