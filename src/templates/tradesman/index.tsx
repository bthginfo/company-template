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
  { to: '/leistungen', label: 'Leistungen' },
  { to: '/referenzen', label: 'Referenzen' },
  { to: '/ueber-uns', label: 'Über uns' },
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

function NotdienstBanner({ phone }: { phone: string }) {
  if (!phone) return null;
  return (
    <div className="bg-brand text-brand-fg relative overflow-hidden">
      <div className="container-x py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left relative z-10">
        <p className="font-semibold flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          24/7 Notdienst – wir sind für Sie da.
        </p>
        <a href={`tel:${phone}`} className="btn-outline !border-current !text-current hover:!bg-white hover:!text-brand">
          Jetzt anrufen: {phone}
        </a>
      </div>
    </div>
  );
}

function HomePage({ content }: { content: SiteContent }) {
  return (
    <>
      <Hero content={content} overlay="rgba(0,15,30,0.6)" align="left" />
      <NotdienstBanner phone={content.contact.phone} />
      <div id="mehr" />

      <Section eyebrow="Über uns" title="Ihr verlässlicher Partner" align="center">
        <p className="text-xl leading-relaxed opacity-80 text-center max-w-2xl mx-auto reveal">
          {content.about?.body || 'Über 20 Jahre Erfahrung. Festpreis-Garantie. Schnell, sauber, zuverlässig.'}
        </p>
      </Section>

      <Section className="surface" eyebrow="Leistungen" title="Was wir für Sie tun">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.slice(0, 6).map((s, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-2xl transition-shadow duration-300 border-l-4 border-brand reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 opacity-70 leading-relaxed">{s.description}</p>
              {s.price ? <p className="mt-4 text-sm font-semibold text-brand">Ab {s.price}</p> : null}
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/leistungen" className="btn-outline">Alle Leistungen ansehen</Link>
        </div>
      </Section>

      <Section eyebrow="Warum wir" title="Was uns auszeichnet">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { n: '20+', t: 'Jahre Erfahrung' },
            { n: '500+', t: 'Aufträge erfolgreich abgeschlossen' },
            { n: '24/7', t: 'Notdienst' },
            { n: '5★', t: 'Durchschnittsbewertung' },
          ].map((s, i) => (
            <div key={i} className="reveal" style={{ animationDelay: `${i * 80}ms` }}>
              <p className="font-display text-5xl font-bold text-brand">{s.n}</p>
              <p className="mt-2 opacity-70">{s.t}</p>
            </div>
          ))}
        </div>
      </Section>

      {content.testimonials.length ? (
        <Section className="surface" eyebrow="Bewertungen" title="Was unsere Kunden sagen">
          <div className="grid md:grid-cols-3 gap-6">
            {content.testimonials.map((t, i) => (
              <blockquote key={i} className="bg-white rounded-2xl p-6 shadow-sm reveal">
                <p className="leading-relaxed">„{t.text}"</p>
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

function LeistungenPage({ content }: { content: SiteContent }) {
  return (
    <div className="pt-32">
      <Section eyebrow="Leistungen" title="Was wir für Sie tun">
        <div className="grid md:grid-cols-2 gap-6">
          {content.services.map((s, i) => (
            <article
              key={i}
              className="surface rounded-2xl p-8 reveal hover:shadow-xl transition-shadow"
            >
              <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 opacity-80 leading-relaxed">{s.description}</p>
              {s.price ? <p className="mt-6 text-lg font-semibold text-brand">Ab {s.price}</p> : null}
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function ReferenzenPage({ content }: { content: SiteContent }) {
  return (
    <div className="pt-32">
      <Section eyebrow="Referenzen" title="Eine Auswahl unserer Arbeiten">
        {content.gallery.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {content.gallery.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="aspect-[4/3] object-cover rounded-xl hover:scale-[1.02] transition-transform reveal"
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <p className="text-center opacity-60">Bilder folgen in Kürze.</p>
        )}
      </Section>

      {content.testimonials.length ? (
        <Section className="surface" eyebrow="Bewertungen" title="Kundenstimmen">
          <div className="grid md:grid-cols-3 gap-6">
            {content.testimonials.map((t, i) => (
              <blockquote key={i} className="bg-white rounded-2xl p-6 shadow-sm reveal">
                <p>„{t.text}"</p>
                <footer className="mt-4 text-sm font-semibold opacity-80">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}

function AboutPage({ content }: { content: SiteContent }) {
  const a = content.about;
  return (
    <div className="pt-32">
      <Section eyebrow="Über uns" title={a?.title || 'Ihr Meisterbetrieb'}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-lg leading-relaxed opacity-90 whitespace-pre-line reveal order-2 md:order-1">
            {a?.body}
          </div>
          <div className="reveal order-1 md:order-2">
            {a?.imageUrl ? (
              <img src={a.imageUrl} alt="" className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]" />
            ) : (
              <div className="aspect-[4/3] rounded-3xl" style={{ background: 'linear-gradient(135deg,var(--brand-color),var(--accent-color))' }} />
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

function KontaktPage({ content }: { content: SiteContent }) {
  return (
    <div className="pt-32">
      <NotdienstBanner phone={content.contact.phone} />
      <ContactBlock content={content} />
    </div>
  );
}

export default function TradesmanTemplate({
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
          <Route path="leistungen" element={<LeistungenPage content={content} />} />
          <Route path="referenzen" element={<ReferenzenPage content={content} />} />
          <Route path="ueber-uns" element={<AboutPage content={content} />} />
          <Route path="kontakt" element={<KontaktPage content={content} />} />
          <Route path="*" element={<HomePage content={content} />} />
        </Routes>
      </Layout>
    </BasePathProvider>
  );
}
