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
  { to: '/team', label: 'Team' },
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

function HomePage({ content }: { content: SiteContent }) {
  return (
    <>
      <Hero content={content} overlay="rgba(40,20,40,0.45)" align="left" />
      <div id="mehr" />

      <Section eyebrow="Willkommen" title="Stil. Pflege. Wohlbefinden." align="center">
        <p className="text-xl leading-relaxed opacity-80 text-center max-w-2xl mx-auto reveal">
          {content.about?.body || 'Hochwertige Produkte, individuelle Beratung, entspannte Atmosphäre.'}
        </p>
      </Section>

      <Section className="surface" eyebrow="Leistungen" title="Eine Auswahl unserer Behandlungen">
        <ul className="max-w-3xl mx-auto divide-y divide-black/10">
          {content.services.slice(0, 5).map((s, i) => (
            <li key={i} className="py-5 flex items-start justify-between gap-6 reveal">
              <div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                {s.description ? <p className="opacity-70 text-sm mt-1">{s.description}</p> : null}
              </div>
              {s.price ? <span className="text-brand font-semibold text-lg whitespace-nowrap">{s.price}</span> : null}
            </li>
          ))}
        </ul>
        <div className="text-center mt-10">
          <Link to="/leistungen" className="btn-outline">Alle Leistungen ansehen</Link>
        </div>
      </Section>

      {content.testimonials.length ? (
        <Section eyebrow="Bewertungen" title="Was unsere Kundinnen sagen">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {content.testimonials.map((t, i) => (
              <blockquote key={i} className="surface rounded-3xl p-8 reveal">
                <p className="italic text-lg leading-relaxed">„{t.text}"</p>
                <footer className="mt-5 text-sm font-semibold opacity-80">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="surface" align="center">
        <div className="text-center max-w-2xl mx-auto reveal">
          <h2 className="font-display text-4xl md:text-5xl font-semibold">Bereit für Ihren neuen Look?</h2>
          <p className="mt-4 text-lg opacity-80">Vereinbaren Sie einen Termin – wir freuen uns auf Sie.</p>
          <Link to="/kontakt" className="btn-primary mt-8">Termin buchen</Link>
        </div>
      </Section>
    </>
  );
}

function LeistungenPage({ content }: { content: SiteContent }) {
  return (
    <div className="pt-32">
      <Section eyebrow="Preisliste" title="Leistungen & Preise" subtitle="Alle Preise inkl. MwSt., zzgl. eventueller Aufschläge bei besonderer Haarlänge.">
        <ul className="max-w-3xl mx-auto divide-y divide-black/10">
          {content.services.map((s, i) => (
            <li key={i} className="py-6 flex items-start justify-between gap-6 reveal">
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                {s.description ? <p className="opacity-70 mt-2">{s.description}</p> : null}
              </div>
              {s.price ? <span className="text-brand font-semibold text-xl whitespace-nowrap">{s.price}</span> : null}
            </li>
          ))}
        </ul>
        <div className="text-center mt-12">
          <Link to="/kontakt" className="btn-primary">Termin vereinbaren</Link>
        </div>
      </Section>
    </div>
  );
}

function TeamPage({ content }: { content: SiteContent }) {
  const a = content.about;
  return (
    <div className="pt-32">
      <Section eyebrow="Über uns" title={a?.title || 'Unser Team'}>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 reveal">
            {a?.imageUrl ? (
              <img src={a.imageUrl} alt="" className="rounded-full aspect-square object-cover w-full max-w-sm mx-auto shadow-2xl" />
            ) : (
              <div className="aspect-square rounded-full max-w-sm mx-auto" style={{ background: 'linear-gradient(135deg,var(--brand-color),var(--accent-color))' }} />
            )}
          </div>
          <div className="md:col-span-3 text-lg leading-relaxed opacity-90 whitespace-pre-line reveal">
            {a?.body}
          </div>
        </div>
      </Section>
    </div>
  );
}

function GaleriePage({ content }: { content: SiteContent }) {
  return (
    <div className="pt-32">
      <Section eyebrow="Galerie" title="Looks & Inspirationen">
        {content.gallery.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {content.gallery.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="aspect-[3/4] object-cover rounded-2xl hover:scale-[1.03] transition-transform reveal"
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

export default function SalonTemplate({
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
          <Route path="team" element={<TeamPage content={content} />} />
          <Route path="galerie" element={<GaleriePage content={content} />} />
          <Route path="kontakt" element={<KontaktPage content={content} />} />
          <Route path="*" element={<HomePage content={content} />} />
        </Routes>
      </Layout>
    </BasePathProvider>
  );
}
