/**
 * Generic section renderers for the v2 Page Builder frontend.
 * Each section type maps to a React component that receives `data` (JSONB blob)
 * and renders using the active theme CSS variables.
 *
 * All components are theme-agnostic — they consume CSS vars via Tailwind
 * utilities (bg-brand, text-brand, bg-surface, text-ink, etc.).
 */

import type { JSX } from 'react';
import {
  ReservationFormSection,
  RsvpFormSection,
  QuoteRequestSection,
  AppointmentEmbedSection,
  RoomBookingSection,
  TrainingSignupSection,
} from './interactive-sections';

export type SectionData = Record<string, unknown>;

// ─── Typed helpers ────────────────────────────────────────────────────────────

function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}
function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}
function bool(v: unknown, fallback = true): boolean {
  return typeof v === 'boolean' ? v : fallback;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HeroSection({ data }: { data: SectionData }) {
  const headline = str(data.headline, 'Willkommen');
  const subline = str(data.subline);
  const ctaLabel = str(data.ctaLabel);
  const ctaLink = str(data.ctaLink, '#kontakt');
  const bg = str(data.backgroundImage);
  const overlay = str(data.overlay, 'dark');
  const align = str(data.align, 'center');

  const alignClass =
    align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center';
  const overlayClass =
    overlay === 'dark' ? 'bg-black/50' : overlay === 'light' ? 'bg-white/40' : 'bg-transparent';

  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      style={bg ? { backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {!bg && <div className="absolute inset-0 bg-brand" />}
      {bg && <div className={`absolute inset-0 ${overlayClass}`} />}
      <div className={`relative z-10 max-w-4xl mx-auto px-6 py-24 flex flex-col gap-6 ${alignClass}`}>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
          {headline}
        </h1>
        {subline && (
          <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">{subline}</p>
        )}
        {ctaLabel && (
          <a
            href={ctaLink}
            className="inline-block bg-accent text-accent-fg font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity text-base w-fit"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}

// ─── Rich Text ────────────────────────────────────────────────────────────────

export function RichTextSection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const body = str(data.body);

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {headline && (
          <h2 className="text-3xl font-display font-bold text-ink mb-6">{headline}</h2>
        )}
        {body && (
          <div
            className="rte-output max-w-none"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </div>
    </section>
  );
}

// ─── Image + Text ─────────────────────────────────────────────────────────────

export function ImageTextSection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const body = str(data.body);
  const image = str(data.image);
  const imageAlt = str(data.imageAlt, headline);
  const imagePosition = str(data.imagePosition, 'right');
  const ctaLabel = str(data.ctaLabel);
  const ctaLink = str(data.ctaLink, '#');

  const isRight = imagePosition === 'right';

  return (
    <section className="py-16 px-6">
      <div className={`max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center ${isRight ? '' : 'md:flex-row-reverse'}`}>
        <div className="flex-1 space-y-5">
          {headline && (
            <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>
          )}
          {body && (
            <div
              className="rte-output max-w-none"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
          {ctaLabel && (
            <a
              href={ctaLink}
              className="inline-block bg-brand text-brand-fg font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              {ctaLabel}
            </a>
          )}
        </div>
        {image && (
          <div className="flex-1">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

type GalleryImage = { url: string; alt?: string; caption?: string };

export function GallerySection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const images = arr<GalleryImage>(data.images);

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {headline && (
          <h2 className="text-3xl font-display font-bold text-ink text-center mb-10">{headline}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl bg-surface aspect-square">
              <img
                src={img.url}
                alt={img.alt || ''}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {img.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs p-2 text-center translate-y-full group-hover:translate-y-0 transition-transform">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

type FeatureItem = { icon?: string; title: string; description?: string };

export function FeaturesSection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const subline = str(data.subline);
  const items = arr<FeatureItem>(data.items);

  return (
    <section className="py-16 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        {(headline || subline) && (
          <div className="text-center mb-12">
            {headline && <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>}
            {subline && <p className="text-lg text-ink/70 mt-3">{subline}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-3">
              {item.icon && <div className="text-3xl">{item.icon}</div>}
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              {item.description && <p className="text-ink/70 leading-relaxed">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

type StatItem = { value: string; label: string; suffix?: string };

export function StatsSection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const items = arr<StatItem>(data.items);

  return (
    <section className="py-16 px-6 bg-brand text-brand-fg">
      <div className="max-w-5xl mx-auto">
        {headline && (
          <h2 className="text-3xl font-display font-bold text-center mb-10">{headline}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-display font-bold">
                {item.value}{item.suffix}
              </div>
              <div className="text-brand-fg/80 text-sm mt-2">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

type TestimonialItem = { name: string; role?: string; quote: string; avatar?: string; rating?: string };

export function TestimonialsSection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const items = arr<TestimonialItem>(data.items);

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {headline && (
          <h2 className="text-3xl font-display font-bold text-ink text-center mb-10">{headline}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-surface rounded-2xl p-6 flex flex-col gap-4">
              {item.rating && (
                <div className="text-accent text-sm">
                  {'★'.repeat(Math.min(Number(item.rating), 5))}
                </div>
              )}
              <p className="text-ink leading-relaxed italic">„{item.quote}"</p>
              <div className="flex items-center gap-3 mt-auto">
                {item.avatar && (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-ink text-sm">{item.name}</div>
                  {item.role && <div className="text-ink/60 text-xs">{item.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

type TeamMember = { name: string; role?: string; bio?: string; photo?: string };

export function TeamSection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const subline = str(data.subline);
  const members = arr<TeamMember>(data.members);

  return (
    <section className="py-16 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        {(headline || subline) && (
          <div className="text-center mb-12">
            {headline && <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>}
            {subline && <p className="text-lg text-ink/70 mt-3">{subline}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {members.map((m, i) => (
            <div key={i} className="text-center flex flex-col items-center gap-4">
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-brand/20 flex items-center justify-center text-3xl font-display font-bold text-brand">
                  {m.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-semibold text-ink">{m.name}</div>
                {m.role && <div className="text-inbox/60 text-sm text-ink/60">{m.role}</div>}
                {m.bio && <p className="text-sm text-ink/70 mt-2 leading-relaxed">{m.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

type FaqItem = { question: string; answer: string };

export function FaqSection({ data }: { data: SectionData }) {
  const headline = str(data.headline, 'Häufige Fragen');
  const items = arr<FaqItem>(data.items);

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {headline && (
          <h2 className="text-3xl font-display font-bold text-ink text-center mb-10">{headline}</h2>
        )}
        <div className="space-y-2">
          {items.map((item, i) => (
            <details key={i} className="group border border-line rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-ink hover:bg-surface transition-colors list-none">
                <span>{item.question}</span>
                <span className="text-ink/40 group-open:rotate-180 transition-transform shrink-0 ml-3">▾</span>
              </summary>
              <div className="px-5 pb-5 text-ink/75 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

export function CtaSection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const subline = str(data.subline);
  const buttonLabel = str(data.buttonLabel);
  const buttonLink = str(data.buttonLink, '#kontakt');
  const variant = str(data.variant, 'brand');

  const wrapClass =
    variant === 'dark'
      ? 'bg-slate-900 text-white'
      : variant === 'light'
      ? 'bg-surface text-ink'
      : 'bg-brand text-brand-fg';
  const btnClass =
    variant === 'brand'
      ? 'bg-white text-brand hover:bg-white/90'
      : 'bg-brand text-brand-fg hover:opacity-90';

  return (
    <section className={`py-16 px-6 ${wrapClass}`}>
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        {headline && <h2 className="text-3xl font-display font-bold">{headline}</h2>}
        {subline && <p className="text-lg opacity-80">{subline}</p>}
        {buttonLabel && (
          <a
            href={buttonLink}
            className={`inline-block font-semibold px-8 py-3.5 rounded-full transition-opacity text-base ${btnClass}`}
          >
            {buttonLabel}
          </a>
        )}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export function ContactSection({ data }: { data: SectionData }) {
  const headline = str(data.headline, 'Kontakt aufnehmen');
  const showForm = bool(data.showForm, true);
  const formEmail = str(data.formEmail);

  return (
    <section id="kontakt" className="py-16 px-6 bg-surface">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-ink text-center mb-10">{headline}</h2>
        {showForm && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Nachricht wurde gesendet!');
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Vorname</label>
                <input
                  required
                  className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Nachname</label>
                <input
                  required
                  className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">E-Mail</label>
              <input
                required
                type="email"
                className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Nachricht</label>
              <textarea
                required
                rows={5}
                className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand resize-none"
              />
            </div>
            {formEmail && (
              <input type="hidden" name="_to" value={formEmail} />
            )}
            <button
              type="submit"
              className="w-full bg-brand text-brand-fg font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity text-base"
            >
              Nachricht senden
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

type PriceItem = { name: string; price: string; period?: string; description?: string; highlighted?: string };

export function PricingSection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const subline = str(data.subline);
  const items = arr<PriceItem>(data.items);

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {(headline || subline) && (
          <div className="text-center mb-12">
            {headline && <h2 className="text-3xl font-display font-bold text-ink">{headline}</h2>}
            {subline && <p className="text-lg text-ink/70 mt-3">{subline}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const isHighlighted = item.highlighted === 'true';
            return (
              <div
                key={i}
                className={`rounded-2xl p-8 flex flex-col gap-4 border ${
                  isHighlighted
                    ? 'bg-brand text-brand-fg border-transparent shadow-xl scale-105'
                    : 'bg-white text-ink border-line'
                }`}
              >
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="text-4xl font-display font-bold">
                  {item.price}
                  {item.period && (
                    <span className="text-sm font-normal opacity-70 ml-1">{item.period}</span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm opacity-80 leading-relaxed">{item.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Video Embed ──────────────────────────────────────────────────────────────

function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
      const id = u.hostname.includes('youtu.be')
        ? u.pathname.slice(1)
        : u.searchParams.get('v');
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function VideoEmbedSection({ data }: { data: SectionData }) {
  const headline = str(data.headline);
  const videoUrl = str(data.videoUrl);
  const caption = str(data.caption);
  const embedUrl = toEmbedUrl(videoUrl);

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {headline && (
          <h2 className="text-3xl font-display font-bold text-ink text-center mb-8">{headline}</h2>
        )}
        {embedUrl ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video rounded-2xl bg-surface flex items-center justify-center text-ink/40 text-sm">
            Kein gültiger Video-Link
          </div>
        )}
        {caption && (
          <p className="text-center text-ink/60 text-sm mt-4">{caption}</p>
        )}
      </div>
    </section>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function DividerSection({ data }: { data: SectionData }) {
  const style = str(data.style, 'line');
  const size = str(data.size, 'md');
  const px = size === 'sm' ? 'py-4' : size === 'lg' ? 'py-16' : 'py-8';

  if (style === 'space') return <div className={px} />;

  return (
    <div className={`${px} px-6`}>
      <div className="max-w-5xl mx-auto">
        {style === 'wave' ? (
          <svg viewBox="0 0 1200 60" className="w-full h-8 fill-current text-brand/20">
            <path d="M0 30 C200 0, 400 60, 600 30 S1000 0, 1200 30 V60 H0Z" />
          </svg>
        ) : (
          <hr className="border-line" />
        )}
      </div>
    </div>
  );
}

// ─── Blog Preview ─────────────────────────────────────────────────────────────

type BlogPostPreview = { id: string; slug: string; title: string; excerpt: string; featuredImage: string; publishedAt: string | null; category: string };

export function BlogPreviewSection({ data, tenantSlug }: { data: SectionData; tenantSlug: string }) {
  const headline = str(data.headline, 'Aktuelles');
  const limit = Math.max(1, Number(data.limit) || 3);
  const category = str(data.category);

  const [posts, setPosts] = React.useState<BlogPostPreview[]>([]);
  React.useEffect(() => {
    fetch(`/api/blog?slug=${tenantSlug}`)
      .then((r) => r.json())
      .then((j) => {
        let list = (j.posts ?? []) as BlogPostPreview[];
        if (category) list = list.filter((p) => p.category === category);
        setPosts(list.slice(0, limit));
      })
      .catch(() => {});
  }, [tenantSlug, limit, category]);

  return (
    <section className="py-16 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-ink text-center mb-10">{headline}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl bg-white overflow-hidden border border-line hover:shadow-md transition-shadow">
              {post.featuredImage ? (
                <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-48 bg-brand/10 flex items-center justify-center text-brand/40 text-4xl">✏️</div>
              )}
              <div className="p-5 flex flex-col gap-2 flex-1">
                {post.category && <span className="text-xs text-brand font-medium">{post.category}</span>}
                <h3 className="font-semibold text-ink group-hover:text-brand transition-colors">{post.title}</h3>
                {post.excerpt && <p className="text-sm text-ink/60 line-clamp-3">{post.excerpt}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Collection ───────────────────────────────────────────────────────────────

type CollectionItemPreview = { id: string; slug: string; title: string; featuredImage: string; data: Record<string, unknown> };

export function CollectionSection({ data, tenantSlug: _tenantSlug }: { data: SectionData; tenantSlug: string }) {
  const headline = str(data.headline);
  const collectionId = str(data.collectionId);
  const displayStyle = str(data.displayStyle, 'grid');
  const limit = Number(data.limit) || 0;

  const [items, setItems] = React.useState<CollectionItemPreview[]>([]);
  React.useEffect(() => {
    if (!collectionId) return;
    fetch(`/api/collections?action=items&collectionId=${collectionId}`)
      .then((r) => r.json())
      .then((j) => {
        let list = (j.items ?? []) as CollectionItemPreview[];
        if (limit > 0) list = list.slice(0, limit);
        setItems(list);
      })
      .catch(() => {});
  }, [collectionId, limit]);

  const isList = displayStyle === 'list';

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {headline && (
          <h2 className="text-3xl font-display font-bold text-ink text-center mb-10">{headline}</h2>
        )}
        <div className={isList ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl bg-surface border border-line overflow-hidden ${isList ? 'flex gap-4 items-start p-4' : ''}`}
            >
              {item.featuredImage && (
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className={isList ? 'w-20 h-20 rounded-xl object-cover shrink-0' : 'w-full h-48 object-cover'}
                />
              )}
              <div className={isList ? '' : 'p-4'}>
                <div className="font-semibold text-ink">{item.title}</div>
                {str(item.data.description) && (
                  <p className="text-sm text-ink/60 mt-1">{str(item.data.description)}</p>
                )}
                {str(item.data.price) && (
                  <div className="text-brand font-semibold mt-2">{str(item.data.price)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Needed for BlogPreviewSection and CollectionSection hooks
import * as React from 'react';

// ─── Dispatch map ─────────────────────────────────────────────────────────────

type SectionRendererProps = { data: SectionData; tenantSlug: string };

const SECTION_RENDERERS: Record<string, (props: SectionRendererProps) => JSX.Element | null> = {
  hero: ({ data }) => <HeroSection data={data} />,
  richText: ({ data }) => <RichTextSection data={data} />,
  imageText: ({ data }) => <ImageTextSection data={data} />,
  gallery: ({ data }) => <GallerySection data={data} />,
  features: ({ data }) => <FeaturesSection data={data} />,
  stats: ({ data }) => <StatsSection data={data} />,
  testimonials: ({ data }) => <TestimonialsSection data={data} />,
  team: ({ data }) => <TeamSection data={data} />,
  faq: ({ data }) => <FaqSection data={data} />,
  cta: ({ data }) => <CtaSection data={data} />,
  contact: ({ data }) => <ContactSection data={data} />,
  pricing: ({ data }) => <PricingSection data={data} />,
  videoEmbed: ({ data }) => <VideoEmbedSection data={data} />,
  divider: ({ data }) => <DividerSection data={data} />,
  blogPreview: ({ data, tenantSlug }) => <BlogPreviewSection data={data} tenantSlug={tenantSlug} />,
  collection: ({ data, tenantSlug }) => <CollectionSection data={data} tenantSlug={tenantSlug} />,

  // ─── Phase 6b — Interactive branch-specific modules ────────────────────────
  reservationForm: ({ data, tenantSlug }) => <ReservationFormSection data={data} tenantSlug={tenantSlug} />,
  rsvpForm: ({ data, tenantSlug }) => <RsvpFormSection data={data} tenantSlug={tenantSlug} />,
  quoteRequest: ({ data, tenantSlug }) => <QuoteRequestSection data={data} tenantSlug={tenantSlug} />,
  appointmentEmbed: ({ data }) => <AppointmentEmbedSection data={data} />,
  roomBooking: ({ data, tenantSlug }) => <RoomBookingSection data={data} tenantSlug={tenantSlug} />,
  trainingSignup: ({ data, tenantSlug }) => <TrainingSignupSection data={data} tenantSlug={tenantSlug} />,
};

export function renderSection(type: string, data: SectionData, tenantSlug: string): JSX.Element | null {
  const renderer = SECTION_RENDERERS[type];
  if (!renderer) return null;
  return renderer({ data, tenantSlug });
}
