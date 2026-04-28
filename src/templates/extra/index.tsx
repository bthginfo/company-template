import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import type { SiteContent, PageId } from '@/lib/types';
import { SplitText, useReveal, ParallaxImage, AnimatedCounter } from '@/components/fx';
import Seo from '@/components/Seo';
import { BasePathProvider, useBasePath, withBase } from '@/components/site-blocks';
import { ConsentScripts } from '@/components/ConsentScripts';
import { Timeline } from '@/components/Timeline';
import { NewsPreview, NewsIndexPage, NewsDetailPage } from '@/components/News';
import { BranchModulesInline } from '@/components/branch-modules';

export type ExtraBranchKey = 'consulting' | 'medical' | 'fitness';
export const EXTRA_BRANCH_KEYS: ExtraBranchKey[] = ['consulting', 'medical', 'fitness'];
export const isExtraBranchKey = (k: string | undefined): k is ExtraBranchKey =>
  !!k && (EXTRA_BRANCH_KEYS as string[]).includes(k);

export type ExtraStyle = 'classic' | 'modern' | 'bold';
export type ExtraPage = 'home' | 'services' | 'gallery' | 'about' | 'contact';

type Props = {
  content: SiteContent;
  style?: ExtraStyle;
  /** Branch flavour — switches branch-specific sections (process / service / programs). */
  branch?: ExtraBranchKey;
  /** Optional eyebrow above hero (defaults to content.brand.tagline) */
  eyebrow?: string;
  /** Base path under which the multi-page routes are mounted. */
  basePath?: string;
};

const PAGE_TO_SEO: Record<ExtraPage, PageId> = {
  home: 'home',
  services: 'services',
  gallery: 'gallery',
  about: 'about',
  contact: 'contactPage',
};
const PAGE_TITLES: Record<Exclude<ExtraPage, 'home'>, string> = {
  services: 'Leistungen',
  gallery: 'Galerie',
  about: 'Über uns',
  contact: 'Kontakt',
};

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [pathname]);
  return null;
}

function PageSeoExtra({ content, branch, page }: { content: SiteContent; branch: ExtraBranchKey; page: ExtraPage }) {
  const t = page === 'home' ? content.brand.name : `${PAGE_TITLES[page as Exclude<ExtraPage, 'home'>]} · ${content.brand.name}`;
  const desc = page === 'home'
    ? (content.hero?.subtitle || content.about?.body?.slice(0, 160) || `${content.brand.name} – ${content.brand.tagline || 'offizielle Website'}.`)
    : `${PAGE_TITLES[page as Exclude<ExtraPage, 'home'>]} bei ${content.brand.name}.`;
  return <Seo title={t} description={desc} content={content} template={branch} page={PAGE_TO_SEO[page]} />;
}

/** Multi-page showcase template with three distinct layouts (classic / modern / bold). */
export default function ExtraBranchTemplate({
  content,
  style = 'classic',
  branch = 'consulting',
  eyebrow,
  basePath = '',
}: Props) {
  useReveal();
  const eb = eyebrow ?? content.brand.tagline ?? '';
  const Layout = style === 'modern' ? ModernLayout : style === 'bold' ? BoldLayout : ClassicLayout;
  return (
    <BasePathProvider value={basePath}>
      <div className={`min-h-screen flex flex-col tpl-style-${style} tpl-branch-${branch} bg-[var(--bg-color)] text-[var(--text-color)]`}>
        <ConsentScripts scripts={(content as any).customScripts} />
        <ExtraHeader content={content} style={style} branch={branch} />
        <main className="flex-1">
          <ScrollToTopOnRoute />
          <Routes>
            <Route index element={<><PageSeoExtra content={content} branch={branch} page="home" /><Layout content={content} eyebrow={eb} branch={branch} page="home" /></>} />
            <Route path="leistungen" element={<><PageSeoExtra content={content} branch={branch} page="services" /><SubPage content={content} branch={branch} page="services" style={style} eyebrow={eb} /></>} />
            <Route path="galerie" element={<><PageSeoExtra content={content} branch={branch} page="gallery" /><SubPage content={content} branch={branch} page="gallery" style={style} eyebrow={eb} /></>} />
            <Route path="ueber-uns" element={<><PageSeoExtra content={content} branch={branch} page="about" /><SubPage content={content} branch={branch} page="about" style={style} eyebrow={eb} /></>} />
            <Route path="kontakt" element={<><PageSeoExtra content={content} branch={branch} page="contact" /><SubPage content={content} branch={branch} page="contact" style={style} eyebrow={eb} /></>} />
            <Route path="news" element={<NewsIndexPage content={content} basePath={basePath} />} />
            <Route path="news/:slug" element={<NewsDetailPage content={content} basePath={basePath} />} />
            <Route path="*" element={<><PageSeoExtra content={content} branch={branch} page="home" /><Layout content={content} eyebrow={eb} branch={branch} page="home" /></>} />
          </Routes>
        </main>
        <ExtraFooter content={content} style={style} />
      </div>
    </BasePathProvider>
  );
}

/* ─── Compact page hero used on subpages ─────────────────────────── */
function PageHero({ eyebrow, title, style }: { eyebrow: string; title: string; style: ExtraStyle }) {
  return (
    <section className="pt-32 md:pt-40 pb-12 md:pb-16 surface">
      <div className="container-x">
        {eyebrow && <p className={style === 'modern' ? 'text-xs font-mono uppercase tracking-widest text-muted mb-4 reveal' : 'eyebrow mb-5 reveal'}>{eyebrow}</p>}
        <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]' : 'headline-xl'}`}>{title}</h1>
      </div>
    </section>
  );
}

/* ─── Sub-page renderer (services / gallery / about / contact) ──── */
function SubPage({ content, branch, page, style, eyebrow }: {
  content: SiteContent;
  branch: ExtraBranchKey;
  page: Exclude<ExtraPage, 'home'>;
  style: ExtraStyle;
  eyebrow: string;
}) {
  const title = PAGE_TITLES[page];
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} style={style} />

      {page === 'services' && (
        <>
          {content.services.length > 0 && (
            <section className="py-16 md:py-24">
              <div className="container-x">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
                  {content.services.map((s, i) => (
                    <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
                      {s.imageUrl && (
                        <div className="aspect-[4/3] overflow-hidden img-zoom">
                          <img src={s.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-2xl">{s.title}</h3>
                          {s.price && <span className="font-mono text-xs text-[var(--accent-color-2,_var(--accent-color))] whitespace-nowrap mt-1">{s.price}</span>}
                        </div>
                        {s.description && <p className="mt-3 text-muted leading-relaxed">{s.description}</p>}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
          <BranchSpotlight branch={branch} style={style} content={content} />
          <BranchModulesInline variant={branch} content={content} />
        </>
      )}

      {page === 'gallery' && content.gallery.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-x">
            <ExtraMasonry images={content.gallery} />
          </div>
        </section>
      )}

      {page === 'about' && (
        <>
          {content.about && (
            <section className="py-16 md:py-24">
              <div className="container-x grid md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-5 reveal">
                  {(content.about.imageUrl || content.gallery[0]) && (
                    <img src={content.about.imageUrl || content.gallery[0]} alt={content.about.title} className="rounded-3xl w-full aspect-[4/5] object-cover" loading="lazy" />
                  )}
                </div>
                <div className="md:col-span-7 reveal">
                  <h2 className="headline-lg">{content.about.title}</h2>
                  <div className="mt-6 text-lg text-muted leading-relaxed space-y-5">
                    {content.about.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              </div>
            </section>
          )}
          <BranchTeam branch={branch} style={style} content={content} />
          <Timeline content={content} />
          {content.testimonials.length > 0 && (
            <section className="py-16 md:py-24 surface">
              <div className="container-x">
                <p className="eyebrow mb-5 reveal">Stimmen</p>
                <h2 className="headline-lg max-w-3xl reveal mb-12">Was unsere<br /><em className="italic-pop">Kund:innen sagen.</em></h2>
                <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
                  {content.testimonials.map((t, i) => (
                    <figure key={i} className="bg-white border border-line rounded-3xl p-7">
                      <blockquote className="text-lg leading-relaxed">„{t.text}"</blockquote>
                      <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">— {t.author}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {page === 'contact' && <ContactSection content={content} variant={style} />}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  CLASSIC — editorial, centered, parallax about, varied gallery
 * ──────────────────────────────────────────────────────────────────── */
function ClassicLayout({ content, eyebrow, branch, page: _page }: { content: SiteContent; eyebrow: string; branch: ExtraBranchKey; page: ExtraPage }) {
  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {content.hero.imageUrl && (
            <img src={content.hero.imageUrl} alt="" className="w-full h-full object-cover opacity-30" loading="eager" />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, var(--bg-color) 0%, color-mix(in oklab, var(--bg-color), transparent 25%) 40%, var(--bg-color) 100%)' }} />
        </div>
        <div className="container-x">
          {eyebrow && <p className="eyebrow mb-6 reveal">{eyebrow}</p>}
          <h1 className="headline-xl max-w-5xl reveal"><SplitText>{content.hero.title}</SplitText></h1>
          <p className="mt-8 text-lg md:text-2xl text-muted max-w-3xl reveal">{content.hero.subtitle}</p>
          <div className="mt-12 flex flex-wrap gap-3 reveal">
            <a href="#kontakt" className="btn-primary">{content.hero.ctaLabel || 'Termin anfragen'} <span aria-hidden>→</span></a>
            <a href="#leistungen" className="btn-outline">Leistungen ansehen</a>
          </div>
        </div>
      </section>
      <BranchHeroBadges branch={branch} style="classic" content={content} />

      {content.about && (
        <section id="about" className="py-24 md:py-32 surface">
          <div className="container-x grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5 reveal">
              <ParallaxImage src={content.about.imageUrl || content.gallery[0]} alt={content.brand.name} className="rounded-3xl aspect-[4/5]" />
            </div>
            <div className="md:col-span-7 reveal">
              <p className="eyebrow mb-5">Über uns</p>
              <h2 className="headline-lg">{content.about.title}</h2>
              <div className="mt-8 text-lg text-muted leading-relaxed space-y-5 max-w-2xl">
                {content.about.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </section>
      )}

      {content.services.length > 0 && (
        <section id="leistungen" className="py-24 md:py-32">
          <div className="container-x">
            <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
              <div className="md:col-span-7 reveal">
                <p className="eyebrow mb-5">Leistungen</p>
                <h2 className="headline-lg">Was wir<br /><em className="italic-pop">für Sie tun.</em></h2>
              </div>
              <p className="md:col-span-5 text-lg text-muted reveal">
                Eine Auswahl aus unserem Repertoire. Mehr im persönlichen Gespräch.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
              {content.services.map((s, i) => (
                <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift group">
                  {s.imageUrl && (
                    <div className="aspect-[4/3] overflow-hidden img-zoom">
                      <img src={s.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-2xl">{s.title}</h3>
                      {s.price && <span className="font-mono text-xs text-[var(--accent-color-2,_var(--accent-color))] whitespace-nowrap mt-1">{s.price}</span>}
                    </div>
                    {s.description && <p className="mt-3 text-muted leading-relaxed">{s.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <BranchSpotlight branch={branch} style="classic" content={content} />
      <BranchModulesInline variant={branch} content={content} />
      <BranchTeam branch={branch} style="classic" content={content} />

      {content.gallery.length > 0 && (
        <section id="galerie" className="py-24 md:py-32 surface">
          <div className="container-x">
            <div className="mb-12 reveal">
              <p className="eyebrow mb-5">Eindrücke</p>
              <h2 className="headline-lg">Bilder aus<br /><em className="italic-pop">unserem Alltag.</em></h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 reveal-stagger">
              {content.gallery.map((src, i) => {
                const aspects = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[1/1]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[1/1]'];
                return (
                  <figure key={i} className={`overflow-hidden rounded-3xl img-zoom ${aspects[i % aspects.length]}`}>
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {content.testimonials.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="container-x">
            <p className="eyebrow mb-5 reveal">Stimmen</p>
            <h2 className="headline-lg max-w-3xl reveal">Was unsere<br /><em className="italic-pop">Kund:innen sagen.</em></h2>
            <div className="mt-14 grid md:grid-cols-3 gap-5 reveal-stagger">
              {content.testimonials.map((t, i) => (
                <figure key={i} className="bg-[var(--surface-color)] border border-line rounded-3xl p-7">
                  <blockquote className="text-lg leading-relaxed">„{t.text}"</blockquote>
                  <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">— {t.author}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsPreview content={content} />
      <ContactSection content={content} variant="classic" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  MODERN — SaaS clean: split hero, sticky-rail about, feature cards,
 *  uniform gallery grid, two-column contact with form-style sidebar
 * ──────────────────────────────────────────────────────────────────── */
function ModernLayout({ content, eyebrow, branch, page: _page }: { content: SiteContent; eyebrow: string; branch: ExtraBranchKey; page: ExtraPage }) {
  const stats = [
    { value: content.testimonials.length, suffix: '+', label: 'Kund:innen' },
    { value: content.services.length, suffix: '', label: 'Leistungen' },
    { value: 24, suffix: 'h', label: 'Antwortzeit' },
  ];
  return (
    <>
      {/* Hero — split: text left / image card right with floating badge */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 reveal">
            {eyebrow && (
              <p className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-[var(--surface-color)] border border-line text-xs font-mono uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" /> {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              {content.hero.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-xl">{content.hero.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#kontakt" className="btn-primary">{content.hero.ctaLabel || 'Termin anfragen'}</a>
              <a href="#leistungen" className="btn-ghost">Mehr erfahren →</a>
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((s, i) => (
                <div key={i} className="border-l border-line pl-4">
                  <dt className="font-display text-3xl">
                    <AnimatedCounter to={s.value} />{s.suffix}
                  </dt>
                  <dd className="text-xs uppercase tracking-widest text-muted mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-line shadow-2xl">
                {content.hero.imageUrl && <img src={content.hero.imageUrl} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-line p-5 max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center">
                    <span className="text-xl">★</span>
                  </div>
                  <div>
                    <p className="font-display text-lg leading-tight">4,9 / 5,0</p>
                    <p className="text-xs text-muted">Google Bewertung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BranchHeroBadges branch={branch} style="modern" content={content} />

      {/* About — sticky rail */}
      {content.about && (
        <section id="about" className="py-24 md:py-32 surface">
          <div className="container-x grid lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4 reveal">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">Über uns</p>
                <h2 className="font-display text-4xl md:text-5xl leading-tight">{content.about.title}</h2>
                {content.about.imageUrl && (
                  <div className="mt-8 aspect-[4/3] rounded-2xl overflow-hidden border border-line">
                    <img src={content.about.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
              </div>
            </aside>
            <div className="lg:col-span-7 lg:col-start-6 reveal space-y-6 text-lg leading-relaxed text-muted">
              {content.about.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>
      )}

      {/* Services — feature cards with bullet list */}
      {content.services.length > 0 && (
        <section id="leistungen" className="py-24 md:py-32">
          <div className="container-x">
            <div className="max-w-2xl reveal mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">Leistungen</p>
              <h2 className="font-display text-4xl md:text-5xl">Was Sie bekommen.</h2>
              <p className="mt-4 text-lg text-muted">Klar definierte Pakete – keine versteckten Kosten.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 reveal-stagger">
              {content.services.map((s, i) => (
                <article key={i} className="group bg-white border border-line rounded-2xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">/ {String(i + 1).padStart(2, '0')}</span>
                    {s.price && <span className="font-display text-lg">{s.price}</span>}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-3">{s.title}</h3>
                  {s.description && <p className="text-muted leading-relaxed mb-6">{s.description}</p>}
                  <div className="pt-4 border-t border-line flex items-center justify-between text-sm">
                    <span className="text-muted">Inkl. Beratung & Briefing</span>
                    <span className="text-[var(--accent-color)] font-medium opacity-0 group-hover:opacity-100 transition">Mehr erfahren →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <BranchSpotlight branch={branch} style="modern" content={content} />
      <BranchModulesInline variant={branch} content={content} />
      <BranchTeam branch={branch} style="modern" content={content} />

      {/* Gallery — uniform 3-col grid with caption labels */}
      {content.gallery.length > 0 && (
        <section id="galerie" className="py-24 md:py-32 surface">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6 mb-12 reveal">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">Galerie</p>
                <h2 className="font-display text-4xl md:text-5xl">Eindrücke.</h2>
              </div>
              <p className="text-sm text-muted hidden md:block max-w-xs">Aktuelle Aufnahmen aus unserem Alltag.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 reveal-stagger">
              {content.gallery.map((src, i) => (
                <figure key={i} className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                  <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <figcaption className="absolute inset-x-0 bottom-0 px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-white bg-gradient-to-t from-black/70 to-transparent">
                    / {String(i + 1).padStart(2, '0')}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials — single big quote with avatars row */}
      {content.testimonials.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="container-x max-w-4xl mx-auto text-center reveal">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-6">Stimmen</p>
            <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
              „{content.testimonials[0].text}"
            </blockquote>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">— {content.testimonials[0].author}</p>
            {content.testimonials.length > 1 && (
              <div className="mt-16 grid md:grid-cols-2 gap-4 text-left">
                {content.testimonials.slice(1).map((t, i) => (
                  <figure key={i} className="bg-[var(--surface-color)] border border-line rounded-2xl p-6">
                    <p className="text-base leading-relaxed">„{t.text}"</p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted">— {t.author}</p>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <NewsPreview content={content} />
      <ContactSection content={content} variant="modern" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  BOLD — magazine: oversized type, full-bleed image, masonry, dramatic
 * ──────────────────────────────────────────────────────────────────── */
function BoldLayout({ content, eyebrow, branch, page: _page }: { content: SiteContent; eyebrow: string; branch: ExtraBranchKey; page: ExtraPage }) {
  return (
    <>
      {/* Hero — oversized headline overlapping image */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="container-x">
          {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8 reveal">— {eyebrow} —</p>}
          <h1 className="font-display text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-tight reveal">
            <SplitText>{content.hero.title}</SplitText>
          </h1>
        </div>
        {content.hero.imageUrl && (
          <div className="mt-10 md:mt-16 reveal">
            <img src={content.hero.imageUrl} alt="" className="w-full aspect-[21/9] object-cover" loading="eager" />
          </div>
        )}
        <div className="container-x mt-12 grid md:grid-cols-12 gap-8 reveal">
          <p className="md:col-span-7 text-2xl md:text-3xl leading-tight">{content.hero.subtitle}</p>
          <div className="md:col-span-5 md:text-right">
            <a href="#kontakt" className="btn-primary text-base">{content.hero.ctaLabel || 'Termin anfragen'} <span aria-hidden>→</span></a>
          </div>
        </div>
      </section>
      <BranchHeroBadges branch={branch} style="bold" content={content} />

      {/* Marquee separator */}
      <div className="border-y border-line py-8 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_25s_linear_infinite] font-display text-4xl md:text-6xl">
          {Array.from({ length: 6 }).flatMap((_, i) => [
            <span key={`a${i}`}>{content.brand.name}</span>,
            <span key={`b${i}`} className="text-[var(--accent-color)]">✦</span>,
          ])}
        </div>
      </div>

      {/* About — oversized number + body */}
      {content.about && (
        <section id="about" className="py-24 md:py-40">
          <div className="container-x grid md:grid-cols-12 gap-10">
            <div className="md:col-span-2 reveal">
              <p className="font-display text-6xl sm:text-7xl md:text-9xl leading-none text-[var(--accent-color)]">01</p>
            </div>
            <div className="md:col-span-10 reveal">
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] mb-10">{content.about.title}</h2>
              <div className="grid md:grid-cols-2 gap-8 text-xl md:text-2xl leading-relaxed">
                {content.about.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {content.about.imageUrl && (
                <img src={content.about.imageUrl} alt="" className="mt-16 w-full aspect-[16/7] object-cover" loading="lazy" />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Services — stacked numbered list */}
      {content.services.length > 0 && (
        <section id="leistungen" className="py-24 md:py-40 surface">
          <div className="container-x">
            <div className="grid md:grid-cols-12 gap-8 mb-16 reveal">
              <p className="md:col-span-2 font-display text-6xl sm:text-7xl md:text-9xl leading-none text-[var(--accent-color)]">02</p>
              <h2 className="md:col-span-10 font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">Leistungen.</h2>
            </div>
            <ul className="reveal-stagger">
              {content.services.map((s, i) => (
                <li key={i} className="group border-t border-line last:border-b py-8 md:py-12 hover:bg-white/30 transition-colors">
                  <div className="container-x grid md:grid-cols-12 gap-6 items-baseline">
                    <span className="md:col-span-1 font-mono text-sm text-muted">/ {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="md:col-span-6 font-display text-3xl md:text-5xl leading-tight transition-transform group-hover:translate-x-2">
                      {s.title}
                    </h3>
                    <p className="md:col-span-4 text-muted leading-relaxed">{s.description}</p>
                    {s.price && <span className="md:col-span-1 md:text-right font-display text-2xl">{s.price}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <BranchSpotlight branch={branch} style="bold" content={content} />
      <BranchModulesInline variant={branch} content={content} />
      <BranchTeam branch={branch} style="bold" content={content} />

      {/* Gallery — true masonry */}
      {content.gallery.length > 0 && (
        <section id="galerie" className="py-24 md:py-40">
          <div className="container-x">
            <div className="grid md:grid-cols-12 gap-8 mb-16 reveal">
              <p className="md:col-span-2 font-display text-6xl sm:text-7xl md:text-9xl leading-none text-[var(--accent-color)]">03</p>
              <h2 className="md:col-span-10 font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">Bilder.</h2>
            </div>
            <ExtraMasonry images={content.gallery} />
          </div>
        </section>
      )}

      {/* Testimonials — full-bleed dark band with rotating quotes */}
      {content.testimonials.length > 0 && (
        <section className="py-24 md:py-40 bg-brand text-white grain">
          <div className="container-x">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-10 reveal">— Stimmen —</p>
            <div className="grid md:grid-cols-2 gap-12 reveal-stagger">
              {content.testimonials.map((t, i) => (
                <figure key={i} className="space-y-6">
                  <span className="font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)] block">"</span>
                  <blockquote className="font-display text-3xl md:text-4xl leading-tight">{t.text}</blockquote>
                  <figcaption className="font-mono text-xs uppercase tracking-widest text-white/60">— {t.author}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsPreview content={content} eyebrow="Aktuelles" title="Notizen." />
      <ContactSection content={content} variant="bold" />
    </>
  );
}

/* ─── Shared contact section (3 layout variants) ──────────────────── */
function ContactSection({ content, variant }: { content: SiteContent; variant: ExtraStyle }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${content.contact.address}, ${content.contact.city}`)}&output=embed`;

  if (variant === 'bold') {
    return (
      <section id="kontakt" className="py-24 md:py-40">
        <div className="container-x grid md:grid-cols-12 gap-8 mb-12 reveal">
          <p className="md:col-span-2 font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)]">04</p>
          <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">
            Reden wir.<br />
            <em className="italic-pop">Gleich jetzt.</em>
          </h2>
        </div>
        <div className="container-x grid md:grid-cols-2 gap-8">
          <div className="reveal space-y-6 text-2xl md:text-3xl leading-tight">
            {content.contact.phone && <p><span className="text-muted text-base font-mono uppercase tracking-widest block mb-2">Telefon</span>{content.contact.phone}</p>}
            {content.contact.email && <p><span className="text-muted text-base font-mono uppercase tracking-widest block mb-2">E-Mail</span>{content.contact.email}</p>}
            {(content.contact.address || content.contact.city) && (
              <p><span className="text-muted text-base font-mono uppercase tracking-widest block mb-2">Adresse</span>{content.contact.address}<br />{content.contact.city}</p>
            )}
          </div>
          <div className="reveal">
            <iframe src={mapSrc} title="Karte" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full aspect-square border-0" allow="fullscreen" />
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'modern') {
    return (
      <section id="kontakt" className="py-24 md:py-32 surface">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">Kontakt</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8">Sprechen wir.</h2>
            <div className="space-y-6 text-base">
              {content.contact.phone && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-line">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center">☎</div>
                  <div><p className="font-mono text-[11px] uppercase tracking-widest text-muted">Telefon</p><p className="font-display text-lg">{content.contact.phone}</p></div>
                </div>
              )}
              {content.contact.email && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-line">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center">✉</div>
                  <div><p className="font-mono text-[11px] uppercase tracking-widest text-muted">E-Mail</p><p className="font-display text-lg">{content.contact.email}</p></div>
                </div>
              )}
              {(content.contact.address || content.contact.city) && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-line">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center">⌖</div>
                  <div><p className="font-mono text-[11px] uppercase tracking-widest text-muted">Adresse</p><p className="font-display text-lg">{content.contact.address}{content.contact.city ? `, ${content.contact.city}` : ''}</p></div>
                </div>
              )}
            </div>
            {content.contact.hours.length > 0 && (
              <div className="mt-8 p-5 rounded-2xl bg-white border border-line">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">Öffnungszeiten</p>
                <ul className="space-y-1.5 text-sm">
                  {content.contact.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6">
                      <span className="text-muted">{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="lg:col-span-7 reveal">
            <div className="rounded-2xl overflow-hidden border border-line shadow-xl">
              <iframe src={mapSrc} title="Karte" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full aspect-[16/14] border-0" allow="fullscreen" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // classic
  return (
    <section id="kontakt" className="py-24 md:py-32 surface">
      <div className="container-x grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5 reveal">
          <p className="eyebrow mb-5">Kontakt</p>
          <h2 className="headline-lg">{content.hero.ctaLabel || 'Termin vereinbaren'}.</h2>
          <ul className="mt-10 space-y-3 text-base">
            {content.contact.phone && <li className="font-mono">{content.contact.phone}</li>}
            {content.contact.email && <li className="font-mono">{content.contact.email}</li>}
            {(content.contact.address || content.contact.city) && (
              <li className="text-muted">{content.contact.address}{content.contact.city ? `, ${content.contact.city}` : ''}</li>
            )}
          </ul>
          {content.contact.hours.length > 0 && (
            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Öffnungszeiten</p>
              <ul className="space-y-1 text-sm">
                {content.contact.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6">
                    <span className="text-muted">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="md:col-span-7 reveal">
          <div className="rounded-3xl overflow-hidden border border-line">
            <iframe src={mapSrc} title="Karte" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full aspect-[16/12] border-0" allow="fullscreen" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Header (style-aware) ──────────────────────────────────────── */
function ExtraHeader({ content, style }: { content: SiteContent; style: ExtraStyle; branch: ExtraBranchKey }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const basePath = useBasePath();
  const { pathname } = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMobile(false); }, [pathname]);
  const isBold = style === 'bold';
  const NAV: { to: string; label: string }[] = [
    { to: '/', label: 'Start' },
    { to: '/leistungen', label: 'Leistungen' },
    { to: '/galerie', label: 'Galerie' },
    { to: '/ueber-uns', label: 'Über uns' },
    { to: '/kontakt', label: 'Kontakt' },
  ];
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all ${
          scrolled
            ? 'bg-[var(--bg-color)]/90 backdrop-blur shadow-sm'
            : isBold ? 'bg-[var(--bg-color)]' : 'bg-transparent'
        }`}
      >
        <div className={`container-x flex items-center justify-between ${isBold ? 'py-6 border-b border-line' : 'py-5'}`}>
          <NavLink to={withBase(basePath, '/')} className={`font-display ${isBold ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{content.brand.name}</NavLink>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={withBase(basePath, n.to)}
                end={n.to === '/'}
                className={({ isActive }) => `transition-colors ${isActive ? 'text-[var(--accent-color)]' : 'hover:text-[var(--accent-color)]'}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <NavLink to={withBase(basePath, '/kontakt')} className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-sm">
            {content.hero.ctaLabel || 'Termin'} <span aria-hidden>→</span>
          </NavLink>
          <button
            onClick={() => setMobile(true)}
            className="md:hidden p-2 rounded-full border border-line"
            aria-label="Menü öffnen"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>
      {mobile && (
        <div className="fixed inset-0 z-[60] bg-[var(--bg-color)]">
          <div className="container-x py-5 flex justify-between items-center">
            <span className="font-display text-2xl">{content.brand.name}</span>
            <button onClick={() => setMobile(false)} className="p-2" aria-label="Schließen">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="container-x flex flex-col gap-1 mt-8">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={withBase(basePath, n.to)}
                end={n.to === '/'}
                onClick={() => setMobile(false)}
                className="py-5 text-5xl font-display border-b border-line hover:translate-x-2 transition-transform"
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function ExtraFooter({ content, style }: { content: SiteContent; style: ExtraStyle }) {
  if (style === 'bold') {
    return (
      <footer className="bg-brand text-white py-20 md:py-32 grain">
        <div className="container-x">
          <p className="font-display text-6xl md:text-8xl leading-[0.9]">{content.brand.name}.</p>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-sm">
            <p className="text-white/70">{content.brand.tagline}</p>
            <p className="font-mono text-white/70">{content.contact.email}</p>
            <p className="font-mono md:text-right text-white/70">{content.contact.phone}</p>
          </div>
          <p className="mt-16 pt-8 border-t border-white/20 text-xs text-white/40">
            © {new Date().getFullYear()} {content.brand.name}
          </p>
        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-brand text-white py-16 grain">
      <div className="container-x">
        <p className="font-display text-3xl">{content.brand.name}</p>
        <p className="text-sm text-white/60 mt-2">{content.brand.tagline}</p>
        <p className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50">
          © {new Date().getFullYear()} {content.brand.name}
        </p>
      </div>
    </footer>
  );
}

function ExtraMasonry({ images }: { images: string[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance] reveal-stagger">
      {images.map((src, i) => (
        <figure key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl img-zoom group relative">
          <img src={src} alt="" className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
        </figure>
      ))}
    </div>
  );
}

/* ─── Branch-specific spotlight section ──────────────────────────────
 *  Renders a different feature block per branch (consulting / medical /
 *  fitness) so the three branches read as distinct products even when
 *  the surrounding layout style is identical.
 * ──────────────────────────────────────────────────────────────────── */
function BranchSpotlight({
  branch,
  style,
  content,
}: {
  branch: ExtraBranchKey;
  style: ExtraStyle;
  content: SiteContent;
}) {
  if (branch === 'consulting') return <ConsultingProcess style={style} content={content} />;
  if (branch === 'medical') return <MedicalServiceInfo style={style} content={content} />;
  return <FitnessPrograms style={style} content={content} />;
}

/* ─── Branch team / trainers ─────────────────────────────────────────
 *  Renders a people grid for consulting (label "Team") and fitness
 *  (label "Trainer:innen"). Reads the `team` overlay if present —
 *  same shape as the admin TeamEditor produces. Hidden for medical
 *  (which uses MedicalServiceInfo as its dedicated block instead).
 * ──────────────────────────────────────────────────────────────────── */
type TeamMember = { n: string; r: string; img: string; bio: string };
const BRANCH_TEAM_DEFAULT: Record<ExtraBranchKey, TeamMember[]> = {
  consulting: [
    { n: 'Dr. Klaus Hofer',  r: 'Senior Partner · Strategie',  img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', bio: 'Über 25 Jahre Beratung im Mittelstand. Schwerpunkt Industrie und Familienunternehmen.' },
    { n: 'Lena Weiss',       r: 'Partnerin · Steuer & Recht',  img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', bio: 'Steuerberaterin und Anwältin. Zuvor zehn Jahre in einer Big-Four-Kanzlei.' },
    { n: 'Marcus Berg',      r: 'Senior Manager · M&A',        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', bio: 'Begleitet Übernahmen und Nachfolgen. Drei Jahre London, fünf Jahre Wien.' },
  ],
  fitness: [
    { n: 'Sarah Berg',  r: 'Studio-Leitung · Vinyasa',   img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', bio: '12 Jahre Yogalehrerin in Berlin und Lissabon. RYT 500 + somatische Ausbildung.' },
    { n: 'Mira Klein',  r: 'Yin & Mindful Movement',     img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', bio: 'Schwerpunkt Faszien-Arbeit und Atem. Begleitet auch unsere Retreats im Allgäu.' },
    { n: 'Jonas Renz',  r: 'Reformer Pilates',           img: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?auto=format&fit=crop&w=600&q=80', bio: 'Physiotherapeut mit Pilates-Spezialisierung. Trainiert Sportler:innen und Reha-Klient:innen.' },
  ],
  medical: [
    { n: 'Dr. Anna Lindner', r: 'Praxisinhaberin · Allgemeinmedizin', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80', bio: 'Studium in Innsbruck und Zürich. Ganzheitlicher Ansatz mit Zeit für Gespräche.' },
    { n: 'Dr. Felix Bauer',  r: 'Internist · Diagnostik',          img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80', bio: 'Zehn Jahre Universitätsklinik. Schwerpunkt internistische Vorsorge.' },
    { n: 'Maria Holzer',     r: 'Praxisleitung · MTA',            img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80', bio: 'Koordiniert Termine und Abläufe. Erste Ansprechpartnerin am Empfang.' },
  ],
};
function useBranchTeam(content: SiteContent, branch: ExtraBranchKey): TeamMember[] {
  const overlay = (content as any).team as TeamMember[] | undefined;
  if (overlay && overlay.length > 0) return overlay.filter((m) => m && (m.n || m.r));
  return BRANCH_TEAM_DEFAULT[branch];
}
function BranchTeam({ branch, style, content }: { branch: ExtraBranchKey; style: ExtraStyle; content: SiteContent }) {
  const team = useBranchTeam(content, branch);
  if (team.length === 0) return null;
  const heading = branch === 'fitness' ? 'Trainer:innen.' : branch === 'medical' ? 'Ärzt:innen & Team.' : 'Das Team.';
  const eyebrow = branch === 'fitness' ? 'Trainer:innen' : branch === 'medical' ? 'Ärzt:innen' : 'Team';
  if (style === 'bold') {
    return (
      <section className="py-24 md:py-40 bg-[var(--text-color)] text-[var(--bg-color)]">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-14 reveal">
            <p className="md:col-span-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-color)]">{eyebrow}</p>
            <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">{heading}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-current/10 reveal-stagger">
            {team.map((m, i) => (
              <article key={i} className="bg-[var(--text-color)] p-8 md:p-10">
                {m.img && (
                  <div className="aspect-[4/5] overflow-hidden mb-6 rounded-2xl">
                    <img src={m.img} alt={m.n} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <h3 className="font-display text-3xl">{m.n}</h3>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent-color)] mt-2">{m.r}</p>
                {m.bio && <p className="mt-5 opacity-80 leading-relaxed">{m.bio}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32 surface">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 mb-12 reveal">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{eyebrow}</p>
              <h2 className="font-display text-4xl md:text-5xl">{heading}</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {team.map((m, i) => (
              <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
                {m.img && (
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={m.img} alt={m.n} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-2xl">{m.n}</h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-muted mt-1">{m.r}</p>
                  {m.bio && <p className="mt-4 text-sm text-muted leading-relaxed">{m.bio}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  // classic
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h2 className="headline-lg">{heading.replace('.', '')}<br /><em className="italic-pop">Persönlich erreichbar.</em></h2>
          </div>
          <p className="md:col-span-5 text-lg text-muted reveal">
            {branch === 'fitness'
              ? 'Fünf Lehrer:innen, jede mit eigener Handschrift. Lernen Sie sie im Probetraining kennen.'
              : 'Erfahrene Berater:innen mit eigenen Schwerpunkten. Sie erreichen uns direkt – ohne Sekretariat.'}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
          {team.map((m, i) => (
            <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
              {m.img && (
                <div className="aspect-[4/5] overflow-hidden img-zoom">
                  <img src={m.img} alt={m.n} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-7">
                <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-3xl mt-2">{m.n}</h3>
                <p className="text-sm text-muted mt-1">{m.r}</p>
                {m.bio && <p className="mt-5 text-sm leading-relaxed">{m.bio}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Branch identity chips — strong visual differentiator just under the hero. */
const BRANCH_CHIPS_DEFAULT: Record<ExtraBranchKey, string[]> = {
  consulting: ['Strategie', 'Workshops', 'Analyse', 'Umsetzung'],
  medical: ['Vorsorge', 'Diagnostik', 'Therapie', 'Begleitung'],
  fitness: ['Yoga', 'Pilates', 'Kleingruppen', 'Personal Training'],
};
const BRANCH_LABEL: Record<ExtraBranchKey, string> = {
  consulting: 'Beratung',
  medical: 'Praxis',
  fitness: 'Studio',
};
function useBranchChips(content: SiteContent, branch: ExtraBranchKey): string[] {
  const overlay = (content as any).branchChips as string[] | undefined;
  if (overlay && overlay.length > 0) return overlay.filter(Boolean);
  return BRANCH_CHIPS_DEFAULT[branch];
}
function BranchHeroBadges({ branch, style, content }: { branch: ExtraBranchKey; style: ExtraStyle; content: SiteContent }) {
  const chips = useBranchChips(content, branch);
  if (chips.length === 0) return null;
  const label = BRANCH_LABEL[branch];
  if (style === 'bold') {
    return (
      <div className="container-x mt-10 reveal">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-mono uppercase tracking-[0.25em]">
          <span className="text-[var(--accent-color)]">— {label} —</span>
          {chips.map((c, i) => (
            <span key={i} className="text-muted">{c}</span>
          ))}
        </div>
      </div>
    );
  }
  if (style === 'modern') {
    return (
      <div className="container-x mt-8 reveal">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-full bg-[var(--accent-color)] text-[var(--accent-fg)] text-xs font-medium uppercase tracking-widest">{label}</span>
          {chips.map((c, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full bg-white border border-line text-xs">{c}</span>
          ))}
        </div>
      </div>
    );
  }
  // classic
  return (
    <div className="container-x mt-10 reveal">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent-color)]">{label}</span>
        {chips.map((c, i) => (
          <span key={i} className="px-3 py-1 rounded-full border border-line bg-[var(--surface-color)] text-muted">{c}</span>
        ))}
      </div>
    </div>
  );
}

/* CONSULTING — 4-step process / methodology */
const CONSULTING_STEPS_DEFAULT: Array<{ k: string; t: string; d: string }> = [
  { k: '01', t: 'Erstgespräch', d: 'Unverbindliches Sondieren — wir hören zu, klären den Bedarf und Rahmenbedingungen.' },
  { k: '02', t: 'Analyse',      d: 'Strukturierte Bestandsaufnahme inkl. Risiken, Chancen und nächsten Hebeln.' },
  { k: '03', t: 'Strategie',    d: 'Klare Empfehlung, Roadmap und priorisierte Maßnahmen — auf Wunsch mit Pitch-Deck.' },
  { k: '04', t: 'Umsetzung',    d: 'Begleitung in der Implementierung, Reviews und Sparring auf Augenhöhe.' },
];
function useConsultingSteps(content: SiteContent) {
  const overlay = (content as any).serviceProcess as Array<{ t: string; d: string }> | undefined;
  if (!overlay || overlay.length === 0) return CONSULTING_STEPS_DEFAULT;
  return overlay.map((s, i) => ({ k: String(i + 1).padStart(2, '0'), t: s.t, d: s.d }));
}
function ConsultingProcess({ style, content }: { style: ExtraStyle; content: SiteContent }) {
  const STEPS = useConsultingSteps(content);
  if (style === 'bold') {
    return (
      <section className="py-24 md:py-40 surface">
        <div className="container-x grid md:grid-cols-12 gap-8 mb-14 reveal">
          <p className="md:col-span-2 font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)]">★</p>
          <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">Unser Vorgehen.</h2>
        </div>
        <ul className="reveal-stagger">
          {STEPS.map((s) => (
            <li key={s.k} className="group border-t border-line last:border-b py-8 md:py-10">
              <div className="container-x grid md:grid-cols-12 gap-6 items-baseline">
                <span className="md:col-span-1 font-display text-3xl text-[var(--accent-color)]">{s.k}</span>
                <h3 className="md:col-span-4 font-display text-3xl md:text-4xl">{s.t}</h3>
                <p className="md:col-span-7 text-lg text-muted leading-relaxed">{s.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl reveal mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">Vorgehen</p>
            <h2 className="font-display text-4xl md:text-5xl">In vier Schritten zum Ziel.</h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
            {STEPS.map((s) => (
              <li key={s.k} className="relative bg-white border border-line rounded-2xl p-6">
                <span className="absolute -top-4 -left-2 font-display text-5xl text-[var(--accent-color)]/40">{s.k}</span>
                <h3 className="font-display text-xl mb-2 mt-4">{s.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-12 reveal">
          <div className="md:col-span-5">
            <p className="eyebrow mb-5">Vorgehen</p>
            <h2 className="headline-lg">Wie wir<br /><em className="italic-pop">arbeiten.</em></h2>
          </div>
          <p className="md:col-span-7 text-lg text-muted self-end">
            Strukturiert, transparent und immer mit klarem Ergebnis. Vier Etappen, kein Bullshit.
          </p>
        </div>
        <ol className="grid md:grid-cols-2 gap-x-12 gap-y-10 reveal-stagger">
          {STEPS.map((s) => (
            <li key={s.k} className="border-t border-line pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-muted">{s.k}</span>
                <h3 className="font-display text-2xl md:text-3xl">{s.t}</h3>
              </div>
              <p className="mt-3 text-base text-muted leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* MEDICAL — service info: hours, emergency, online appointment */
function MedicalServiceInfo({ style, content }: { style: ExtraStyle; content: SiteContent }) {
  const hours = content.contact.hours.length
    ? content.contact.hours
    : [
        { day: 'Mo – Fr', time: '08:00 – 18:00' },
        { day: 'Sa', time: '09:00 – 12:00' },
        { day: 'So', time: 'Geschlossen' },
      ];
  const notice = ((content as any).medicalNotice ?? {}) as { online?: string; emergency?: string };
  const onlineText = notice.online && notice.online.length > 0
    ? notice.online
    : 'Buchen Sie Ihren Termin direkt über unser Online-Portal — Doctolib & jameda angebunden.';
  const emergencyText = notice.emergency && notice.emergency.length > 0
    ? notice.emergency
    : 'Im akuten Notfall wählen Sie bitte 112 oder den ärztlichen Bereitschaftsdienst 116 117.';
  if (style === 'bold') {
    return (
      <section className="py-24 md:py-40 bg-[var(--accent-color)]/10">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 reveal">
            <p className="font-display text-6xl md:text-8xl leading-[0.9] text-[var(--accent-color)]">+</p>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-tight">Service<br />&amp; Sprechzeiten.</h2>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4 reveal-stagger">
            <div className="bg-white border border-line rounded-3xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Sprechzeiten</p>
              <ul className="space-y-2">
                {hours.map((h, i) => (
                  <li key={i} className="flex justify-between text-base"><span className="text-muted">{h.day}</span><span className="font-medium">{h.time}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-line rounded-3xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Online-Termin</p>
              <p className="text-base leading-relaxed">{onlineText}</p>
              <a href="#kontakt" className="mt-5 inline-block font-medium text-[var(--accent-color)]">Termin buchen →</a>
            </div>
            <div className="bg-white border border-line rounded-3xl p-6 sm:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-widest text-rose-600 mb-4">⚠ Notfall</p>
              <p className="text-base leading-relaxed">{emergencyText}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32">
        <div className="container-x grid lg:grid-cols-3 gap-4 reveal-stagger">
          <article className="bg-white border border-line rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center mb-4">⏱</div>
            <h3 className="font-display text-2xl mb-3">Sprechzeiten</h3>
            <ul className="space-y-1.5 text-sm">
              {hours.map((h, i) => <li key={i} className="flex justify-between"><span className="text-muted">{h.day}</span><span>{h.time}</span></li>)}
            </ul>
          </article>
          <article className="bg-white border border-line rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center mb-4">📅</div>
            <h3 className="font-display text-2xl mb-3">Online-Termin</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">{onlineText}</p>
            <a href="#kontakt" className="text-sm font-medium text-[var(--accent-color)]">Termin anfragen →</a>
          </article>
          <article className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-rose-100 grid place-items-center mb-4 text-rose-600">⚠</div>
            <h3 className="font-display text-2xl mb-3 text-rose-700">Notfall</h3>
            <p className="text-sm leading-relaxed text-rose-900/80">{emergencyText}</p>
          </article>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4 reveal">
          <p className="eyebrow mb-5">Service &amp; Info</p>
          <h2 className="headline-lg">Für Sie<br /><em className="italic-pop">erreichbar.</em></h2>
        </div>
        <div className="md:col-span-8 grid sm:grid-cols-2 gap-5 reveal-stagger">
          <div className="bg-white border border-line rounded-3xl p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Sprechzeiten</p>
            <ul className="space-y-2 text-base">
              {hours.map((h, i) => <li key={i} className="flex justify-between"><span className="text-muted">{h.day}</span><span>{h.time}</span></li>)}
            </ul>
          </div>
          <div className="bg-white border border-line rounded-3xl p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Online-Termin</p>
            <p className="text-base leading-relaxed">{onlineText}</p>
          </div>
          <div className="sm:col-span-2 bg-rose-50 border border-rose-100 rounded-3xl p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-rose-600 mb-2">⚠ Notfall</p>
            <p className="text-base text-rose-900/80">{emergencyText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FITNESS — programs grid + stats */
const FITNESS_PROGRAMS_DEFAULT: Array<{ k: string; t: string; d: string; meta: string }> = [
  { k: 'YOGA', t: 'Vinyasa Flow',     d: 'Dynamisches Yoga im Atemrhythmus. Für alle, die Bewegung lieben.', meta: '75 min · Mo / Mi / Fr' },
  { k: 'YIN',  t: 'Yin Yoga',         d: 'Lange gehaltene, ruhige Positionen. Tiefe Faszien-Arbeit.',          meta: '60 min · Di / Do' },
  { k: 'PIL',  t: 'Reformer Pilates', d: 'Kleingruppen mit max. 5 Personen. Präzise Korrekturen.',             meta: '60 min · n. Vereinb.' },
  { k: 'PT',   t: 'Personal Training',d: '60 oder 90 Minuten – ganz auf Sie zugeschnitten.',                   meta: 'flexibel · n. Vereinb.' },
];
function FitnessPrograms({ style, content }: { style: ExtraStyle; content: SiteContent }) {
  const overlayPrograms = (content as any).programs as Array<{ k: string; t: string; d: string; meta: string }> | undefined;
  const PROGRAMS = overlayPrograms && overlayPrograms.length > 0 ? overlayPrograms : FITNESS_PROGRAMS_DEFAULT;
  const overlayNumbers = (content as any).numbers as Array<{ value: string; label: string }> | undefined;
  const stats = (overlayNumbers && overlayNumbers.length > 0
    ? overlayNumbers.slice(0, 3).map((n) => ({ raw: n.value, l: n.label }))
    : [
        { raw: '12+',  l: 'Klassen pro Woche' },
        { raw: '5',    l: 'Lehrer:innen' },
        { raw: '350+', l: 'Stammgäste' },
      ]
  ).map((s) => {
    const m = /^([\d.,]+)(.*)$/.exec(s.raw.trim());
    const v = m ? parseInt(m[1].replace(/\D/g, ''), 10) || 0 : 0;
    const suffix = m ? m[2] : '';
    return { v, s: suffix, l: s.l };
  });
  if (style === 'bold') {
    return (
      <section className="py-24 md:py-40 bg-[var(--text-color)] text-[var(--bg-color)]">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-14 reveal">
            <p className="md:col-span-2 font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)]">⚡</p>
            <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">Programme.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-current/10 reveal-stagger">
            {PROGRAMS.map((p) => (
              <article key={p.k} className="bg-[var(--text-color)] p-8 md:p-12 hover:bg-[var(--accent-color)]/20 transition">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-display text-3xl text-[var(--accent-color)]">{p.k}</span>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60">{p.meta}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-3">{p.t}</h3>
                <p className="opacity-80 leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-3 gap-4 reveal-stagger">
            {stats.map((s, i) => (
              <div key={i} className="border-t border-current/30 pt-6">
                <p className="font-display text-5xl md:text-7xl"><AnimatedCounter to={s.v} />{s.s}</p>
                <p className="font-mono text-[11px] uppercase tracking-widest opacity-60 mt-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 mb-12 reveal">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">Programme</p>
              <h2 className="font-display text-4xl md:text-5xl">Finde deinen Flow.</h2>
            </div>
            <dl className="hidden md:flex gap-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <dt className="font-display text-3xl"><AnimatedCounter to={s.v} />{s.s}</dt>
                  <dd className="text-xs uppercase tracking-widest text-muted mt-1">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
            {PROGRAMS.map((p) => (
              <article key={p.k} className="group bg-white border border-line rounded-2xl p-6 hover:border-[var(--accent-color)] transition">
                <span className="inline-block font-mono text-xs px-2 py-1 rounded-md bg-[var(--accent-color)]/15 text-[var(--accent-color)] mb-4">{p.k}</span>
                <h3 className="font-display text-xl mb-2">{p.t}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{p.d}</p>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted pt-3 border-t border-line">{p.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-12 reveal">
          <div className="md:col-span-6">
            <p className="eyebrow mb-5">Programme</p>
            <h2 className="headline-lg">Für jedes<br /><em className="italic-pop">Ziel.</em></h2>
          </div>
          <dl className="md:col-span-6 grid grid-cols-3 gap-6 self-end">
            {stats.map((s, i) => (
              <div key={i} className="border-l border-line pl-4">
                <dt className="font-display text-3xl"><AnimatedCounter to={s.v} />{s.s}</dt>
                <dd className="text-xs uppercase tracking-widest text-muted mt-1">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
          {PROGRAMS.map((p) => (
            <article key={p.k} className="bg-white border border-line rounded-3xl p-7 hover-lift">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-display text-2xl text-[var(--accent-color)]">{p.k}</span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{p.meta}</span>
              </div>
              <h3 className="font-display text-2xl mb-2">{p.t}</h3>
              <p className="text-muted leading-relaxed">{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
