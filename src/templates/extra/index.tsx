import { useEffect, useState } from 'react';
import type { SiteContent } from '@/lib/types';
import { SplitText, useReveal, ParallaxImage } from '@/components/fx';

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

/** Single-page editorial showcase template for branches that don't have their own
 *  multi-page template yet (consulting / medical / fitness). Renders a complete
 *  brand site from a SiteContent record. */
export default function ExtraBranchTemplate({ content, style = 'classic', eyebrow }: Props) {
  useReveal();
  const eb = eyebrow ?? content.brand.tagline ?? '';
  return (
    <div className={`min-h-screen flex flex-col tpl-style-${style} bg-[var(--bg-color)] text-[var(--text-color)]`}>
      <ExtraHeader content={content} />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            {content.hero.imageUrl && (
              <img src={content.hero.imageUrl} alt="" className="w-full h-full object-cover opacity-30" loading="eager" />
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, var(--bg-color) 0%, color-mix(in oklab, var(--bg-color), transparent 25%) 40%, var(--bg-color) 100%)' }} />
          </div>
          <div className="container-x">
            {eb && <p className="eyebrow mb-6 reveal">{eb}</p>}
            <h1 className="headline-xl max-w-5xl reveal">
              <SplitText>{content.hero.title}</SplitText>
            </h1>
            <p className="mt-8 text-lg md:text-2xl text-muted max-w-3xl reveal">{content.hero.subtitle}</p>
            <div className="mt-12 flex flex-wrap gap-3 reveal">
              <a href="#kontakt" className="btn-primary">{content.hero.ctaLabel || 'Termin anfragen'} <span aria-hidden>→</span></a>
              <a href="#leistungen" className="btn-outline">Leistungen ansehen</a>
            </div>
          </div>
        </section>

        {/* About */}
        {content.about && (
          <section className="py-24 md:py-32 surface">
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

        {/* Services */}
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

        {/* Gallery */}
        {content.gallery.length > 0 && (
          <section className="py-24 md:py-32 surface">
            <div className="container-x">
              <div className="mb-12 reveal">
                <p className="eyebrow mb-5">Eindrücke</p>
                <h2 className="headline-lg">Bilder aus<br /><em className="italic-pop">unserem Alltag.</em></h2>
              </div>
              {style === 'bold' ? (
                <ExtraMasonry images={content.gallery} />
              ) : style === 'modern' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal-stagger">
                  {content.gallery.map((src, i) => (
                    <figure key={i} className="aspect-[4/3] overflow-hidden rounded-2xl border border-line img-zoom">
                      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </figure>
                  ))}
                </div>
              ) : (
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
              )}
            </div>
          </section>
        )}

        {/* Testimonials */}
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

        {/* Contact */}
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
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(`${content.contact.address}, ${content.contact.city}`)}&output=embed`}
                  title={`Karte: ${content.contact.address}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full aspect-[16/12] border-0"
                  allow="fullscreen"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand text-white py-16 grain">
        <div className="container-x">
          <p className="font-display text-3xl">{content.brand.name}</p>
          <p className="text-sm text-white/60 mt-2">{content.brand.tagline}</p>
          <p className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50">
            © {new Date().getFullYear()} {content.brand.name}
          </p>
        </div>
      </footer>
    </div>
  );
}

function ExtraHeader({ content }: { content: SiteContent }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all ${scrolled ? 'bg-[var(--bg-color)]/90 backdrop-blur shadow-sm' : 'bg-transparent'}`}
    >
      <div className="container-x flex items-center justify-between py-5">
        <span className="font-display text-2xl">{content.brand.name}</span>
        <a href="#kontakt" className="btn-accent !py-2.5 !px-5 text-sm">
          {content.hero.ctaLabel || 'Termin'} <span aria-hidden>→</span>
        </a>
      </div>
    </header>
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
