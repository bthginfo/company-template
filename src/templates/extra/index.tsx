import { useEffect, useState } from 'react';
import type { SiteContent } from '@/lib/types';
import { SplitText, useReveal, ParallaxImage, AnimatedCounter } from '@/components/fx';

export type ExtraBranchKey = 'consulting' | 'medical' | 'fitness';
export const EXTRA_BRANCH_KEYS: ExtraBranchKey[] = ['consulting', 'medical', 'fitness'];
export const isExtraBranchKey = (k: string | undefined): k is ExtraBranchKey =>
  !!k && (EXTRA_BRANCH_KEYS as string[]).includes(k);

export type ExtraStyle = 'classic' | 'modern' | 'bold';

type Props = {
  content: SiteContent;
  style?: ExtraStyle;
  /** Optional eyebrow above hero (defaults to content.brand.tagline) */
  eyebrow?: string;
};

/** Single-page showcase template with three distinct layouts (classic / modern / bold). */
export default function ExtraBranchTemplate({ content, style = 'classic', eyebrow }: Props) {
  useReveal();
  const eb = eyebrow ?? content.brand.tagline ?? '';
  return (
    <div className={`min-h-screen flex flex-col tpl-style-${style} bg-[var(--bg-color)] text-[var(--text-color)]`}>
      <ExtraHeader content={content} style={style} />
      <main className="flex-1">
        {style === 'modern' ? (
          <ModernLayout content={content} eyebrow={eb} />
        ) : style === 'bold' ? (
          <BoldLayout content={content} eyebrow={eb} />
        ) : (
          <ClassicLayout content={content} eyebrow={eb} />
        )}
      </main>
      <ExtraFooter content={content} style={style} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  CLASSIC — editorial, centered, parallax about, varied gallery
 * ──────────────────────────────────────────────────────────────────── */
function ClassicLayout({ content, eyebrow }: { content: SiteContent; eyebrow: string }) {
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

      <ContactSection content={content} variant="classic" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  MODERN — SaaS clean: split hero, sticky-rail about, feature cards,
 *  uniform gallery grid, two-column contact with form-style sidebar
 * ──────────────────────────────────────────────────────────────────── */
function ModernLayout({ content, eyebrow }: { content: SiteContent; eyebrow: string }) {
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
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
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

      <ContactSection content={content} variant="modern" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  BOLD — magazine: oversized type, full-bleed image, masonry, dramatic
 * ──────────────────────────────────────────────────────────────────── */
function BoldLayout({ content, eyebrow }: { content: SiteContent; eyebrow: string }) {
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
              <p className="font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)]">01</p>
            </div>
            <div className="md:col-span-10 reveal">
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mb-10">{content.about.title}</h2>
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
              <p className="md:col-span-2 font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)]">02</p>
              <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">Leistungen.</h2>
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

      {/* Gallery — true masonry */}
      {content.gallery.length > 0 && (
        <section id="galerie" className="py-24 md:py-40">
          <div className="container-x">
            <div className="grid md:grid-cols-12 gap-8 mb-16 reveal">
              <p className="md:col-span-2 font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)]">03</p>
              <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">Bilder.</h2>
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
function ExtraHeader({ content, style }: { content: SiteContent; style: ExtraStyle }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const isBold = style === 'bold';
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all ${
        scrolled
          ? 'bg-[var(--bg-color)]/90 backdrop-blur shadow-sm'
          : isBold ? 'bg-[var(--bg-color)]' : 'bg-transparent'
      }`}
    >
      <div className={`container-x flex items-center justify-between ${isBold ? 'py-6 border-b border-line' : 'py-5'}`}>
        <span className={`font-display ${isBold ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{content.brand.name}</span>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-[var(--accent-color)] transition">Über uns</a>
          <a href="#leistungen" className="hover:text-[var(--accent-color)] transition">Leistungen</a>
          <a href="#galerie" className="hover:text-[var(--accent-color)] transition">Galerie</a>
        </nav>
        <a href="#kontakt" className="btn-accent !py-2.5 !px-5 text-sm">
          {content.hero.ctaLabel || 'Termin'} <span aria-hidden>→</span>
        </a>
      </div>
    </header>
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
