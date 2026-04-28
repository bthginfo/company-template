import { Link, useParams, Navigate } from 'react-router-dom';
import type { SiteContent } from '@/lib/types';
import { sanitizeHtml } from '@/lib/sanitize-html';

type Post = NonNullable<SiteContent['posts']>[number];

const DEFAULT_POSTS: Post[] = [
  {
    id: 'demo-1',
    title: 'Saisonkarte überarbeitet.',
    slug: 'saisonkarte-fruehling',
    date: '2025-03-15',
    excerpt: 'Frische Zutaten der Saison – wir haben die Karte komplett neu gedacht.',
    body: 'Wir haben unsere Karte für den Frühling überarbeitet.\n\nIm Mittelpunkt: heimische Spargel-Variationen, frische Wildkräuter und neue vegetarische Hauptgerichte. Reservieren Sie gerne online oder per Telefon.',
    bodyHtml: '',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=80',
    published: true,
  },
];

export function usePublishedPosts(content: SiteContent): Post[] {
  const list = ((content as any).posts as Post[] | undefined) ?? DEFAULT_POSTS;
  return list
    .filter((p) => p && p.published !== false && (p.title || p.body))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

function formatDate(iso: string): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return iso; }
}

/** Compact preview of latest 3 posts — embed on home pages. */
export function NewsPreview({ content, basePath = '', eyebrow = 'Aktuelles', title = 'News & Notizen.' }: {
  content: SiteContent;
  basePath?: string;
  eyebrow?: string;
  title?: React.ReactNode;
}) {
  const posts = usePublishedPosts(content).slice(0, 3);
  if (posts.length === 0) return null;
  const linkTo = (slug: string) => `${basePath}/news/${slug}`;
  return (
    <section className="py-20 md:py-28 surface">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12 reveal">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-3">{eyebrow}</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">{title}</h2>
          </div>
          <Link to={`${basePath}/news`} className="btn-outline">Alle Beiträge <span aria-hidden>→</span></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
          {posts.map((p) => (
            <Link key={p.id} to={linkTo(p.slug || p.id)} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift block">
              {p.imageUrl && (
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{formatDate(p.date)}</p>
                <h3 className="font-display text-2xl mt-2">{p.title}</h3>
                {p.excerpt && <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">{p.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Full archive listing page. */
export function NewsIndexPage({ content, basePath = '' }: { content: SiteContent; basePath?: string }) {
  const posts = usePublishedPosts(content);
  return (
    <section className="pt-32 md:pt-40 pb-24">
      <div className="container-x">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">News</p>
        <h1 className="font-display text-5xl md:text-7xl mt-3">Notizen & Neuigkeiten.</h1>
        {posts.length === 0 ? (
          <p className="mt-12 text-muted">Aktuell sind keine Beiträge veröffentlicht.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {posts.map((p) => (
              <Link key={p.id} to={`${basePath}/news/${p.slug || p.id}`} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift block">
                {p.imageUrl && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={p.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-7">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{formatDate(p.date)}</p>
                  <h2 className="font-display text-3xl mt-2">{p.title}</h2>
                  {p.excerpt && <p className="mt-4 text-muted leading-relaxed">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** Detail page for a single post. */
export function NewsDetailPage({ content, basePath = '' }: { content: SiteContent; basePath?: string }) {
  const { slug } = useParams<{ slug: string }>();
  const posts = usePublishedPosts(content);
  const post = posts.find((p) => p.slug === slug || p.id === slug);
  if (!post) return <Navigate to={`${basePath}/news`} replace />;
  const html = (post as any).bodyHtml ? sanitizeHtml((post as any).bodyHtml) : '';
  const paragraphs = !html ? (post.body || '').split(/\n\s*\n/).filter(Boolean) : [];
  return (
    <article className="pt-32 md:pt-40 pb-24">
      <div className="container-x max-w-3xl">
        <Link to={`${basePath}/news`} className="text-sm text-muted hover:text-black">← Alle Beiträge</Link>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mt-8">{formatDate(post.date)}</p>
        <h1 className="font-display text-4xl md:text-6xl mt-3 leading-tight">{post.title}</h1>
        {post.imageUrl && (
          <div className="aspect-[16/9] overflow-hidden rounded-3xl mt-10">
            <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        {post.excerpt && <p className="mt-10 text-xl text-muted leading-relaxed">{post.excerpt}</p>}
        {html ? (
          <div className="news-body mt-8 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div className="mt-8 space-y-5 text-lg leading-relaxed">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        )}
      </div>
    </article>
  );
}
