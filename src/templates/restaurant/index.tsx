import { Routes, Route } from 'react-router-dom';
import type { SiteContent } from '@/lib/types';
import {
  SiteHeader,
  Hero,
  Section,
  ContactBlock,
  SiteFooter,
  useReveal,
  BasePathProvider,
  TLink as Link,
  type NavItem,
} from '@/components/site-blocks';

const NAV: NavItem[] = [
  { to: '/', label: 'Start' },
  { to: '/speisekarte', label: 'Speisekarte' },
  { to: '/ueber-uns', label: 'Über uns' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/kontakt', label: 'Kontakt' },
];

function Layout({ content, children }: { content: SiteContent; children: React.ReactNode }) {
  useReveal();
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader content={content} nav={NAV} />
      <main className="flex-1">{children}</main>
      <SiteFooter content={content} />
    </div>
  );
}

/* ─── Pages ────────────────────────────────────────────────────────────── */

function HomePage({ content }: { content: SiteContent }) {
  return (
    <>
      <Hero content={content} overlay="rgba(18,10,6,0.55)" />

      <div id="mehr" />

      <Section eyebrow="Willkommen" title="Eine kulinarische Reise" align="center">
        <p className="text-xl leading-relaxed opacity-80 text-center max-w-2xl mx-auto reveal">
          {content.about?.body || 'Frisch, regional, mit Liebe zubereitet – jeden Tag.'}
        </p>
      </Section>

      <Section className="surface" eyebrow="Highlights" title="Auswahl unserer Speisen">
        <div className="grid md:grid-cols-3 gap-6">
          {content.services.slice(0, 3).map((s, i) => (
            <article
              key={i}
              className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col reveal hover:shadow-2xl transition-shadow duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {s.imageUrl ? (
                <img src={s.imageUrl} alt={s.title} className="aspect-[4/3] object-cover" loading="lazy" />
              ) : (
                <div className="aspect-[4/3]" style={{ background: 'linear-gradient(135deg,var(--brand-color),var(--accent-color))' }} />
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  {s.price ? <span className="text-brand font-semibold whitespace-nowrap">{s.price}</span> : null}
                </div>
                <p className="mt-2 opacity-70 text-sm flex-1">{s.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/speisekarte" className="btn-outline">Komplette Speisekarte ansehen</Link>
        </div>
      </Section>

      {content.testimonials.length ? (
        <Section eyebrow="Stimmen" title="Was unsere Gäste sagen">
          <div className="grid md:grid-cols-3 gap-6">
            {content.testimonials.map((t, i) => (
              <blockquote key={i} className="surface rounded-3xl p-8 reveal">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-brand mb-4 opacity-40">
                  <path d="M9 17H5a2 2 0 01-2-2V9a2 2 0 012-2h4v10zm12 0h-4a2 2 0 01-2-2V9a2 2 0 012-2h4v10z" />
                </svg>
                <p className="italic text-lg leading-relaxed">„{t.text}"</p>
                <footer className="mt-5 text-sm font-semibold opacity-80">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null}

      <ContactBlock content={content} />
    </>
  );
}

function SpeisekartePage({ content }: { content: SiteContent }) {
  return (
    <div className="pt-32">
      <Section eyebrow="Speisekarte" title="Unsere Gerichte" subtitle="Saisonal · Regional · Mit Leidenschaft zubereitet">
        <div className="space-y-4 max-w-3xl mx-auto">
          {content.services.map((s, i) => (
            <article
              key={i}
              className="flex items-start gap-5 p-5 rounded-2xl hover:surface transition-colors reveal"
            >
              {s.imageUrl ? (
                <img src={s.imageUrl} alt={s.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" loading="lazy" />
              ) : (
                <div className="w-24 h-24 rounded-xl flex-shrink-0" style={{ background: 'linear-gradient(135deg,var(--brand-color),var(--accent-color))' }} />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                  {s.price ? <span className="text-brand font-semibold whitespace-nowrap">{s.price}</span> : null}
                </div>
                {s.description ? <p className="mt-1 opacity-70">{s.description}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function AboutPage({ content }: { content: SiteContent }) {
  const a = content.about;
  return (
    <div className="pt-32">
      <Section eyebrow="Über uns" title={a?.title || 'Unsere Geschichte'}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            {a?.imageUrl ? (
              <img src={a.imageUrl} alt="" className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]" />
            ) : (
              <div className="aspect-[4/5] rounded-3xl" style={{ background: 'linear-gradient(135deg,var(--brand-color),var(--accent-color))' }} />
            )}
          </div>
          <div className="reveal text-lg leading-relaxed opacity-90 whitespace-pre-line">
            {a?.body}
          </div>
        </div>
      </Section>

      {content.testimonials.length ? (
        <Section className="surface" eyebrow="Bewertungen" title="Was unsere Gäste sagen">
          <div className="grid md:grid-cols-3 gap-6">
            {content.testimonials.map((t, i) => (
              <blockquote key={i} className="bg-white rounded-3xl p-8 shadow-sm reveal">
                <p className="italic text-lg leading-relaxed">„{t.text}"</p>
                <footer className="mt-5 text-sm font-semibold opacity-80">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}

function GaleriePage({ content }: { content: SiteContent }) {
  return (
    <div className="pt-32">
      <Section eyebrow="Galerie" title="Eindrücke aus unserem Restaurant">
        {content.gallery.length ? (
          <div className="columns-2 md:columns-3 gap-3 [&>img]:mb-3">
            {content.gallery.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="w-full rounded-2xl break-inside-avoid hover:scale-[1.02] transition-transform reveal"
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <p className="text-center opacity-60">Bilder folgen in Kürze.</p>
        )}
      </Section>
    </div>
  );
}

function KontaktPage({ content }: { content: SiteContent }) {
  return (
    <div className="pt-32">
      <ContactBlock content={content} />
    </div>
  );
}

export default function RestaurantTemplate({
  content,
  basePath = '',
}: {
  content: SiteContent;
  basePath?: string;
}) {
  return (
    <BasePathProvider value={basePath}>
      <Layout content={content}>
        <Routes>
          <Route index element={<HomePage content={content} />} />
          <Route path="speisekarte" element={<SpeisekartePage content={content} />} />
          <Route path="ueber-uns" element={<AboutPage content={content} />} />
          <Route path="galerie" element={<GaleriePage content={content} />} />
          <Route path="kontakt" element={<KontaktPage content={content} />} />
          <Route path="*" element={<HomePage content={content} />} />
        </Routes>
      </Layout>
    </BasePathProvider>
  );
}
