import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import type { SiteContent, TemplateKey } from '@/lib/types';
import {
  SiteHeader, Hero, Section, ContactBlock, SiteFooter, BasePathProvider,
  type NavItem,
} from '@/components/site-blocks';
import {
  Marquee, Accordion, AnimatedCounter, useReveal, ParallaxImage,
} from '@/components/fx';
import { TLink } from '@/components/site-blocks';

export type TemplateVariant = TemplateKey;

const NAV_BY_VARIANT: Record<TemplateVariant, { servicesPath: string; servicesLabel: string; nav: NavItem[]; servicesEyebrow: string; servicesHeadline: string }> = {
  restaurant: {
    servicesPath: '/speisekarte',
    servicesLabel: 'Speisekarte',
    servicesEyebrow: 'Speisekarte',
    servicesHeadline: 'Aus der Küche.',
    nav: [
      { to: '/', label: 'Start' },
      { to: '/speisekarte', label: 'Speisekarte' },
      { to: '/galerie', label: 'Galerie' },
      { to: '/ueber-uns', label: 'Über uns' },
      { to: '/kontakt', label: 'Kontakt' },
    ],
  },
  salon: {
    servicesPath: '/leistungen',
    servicesLabel: 'Leistungen',
    servicesEyebrow: 'Treatments',
    servicesHeadline: 'Ihre Behandlungen.',
    nav: [
      { to: '/', label: 'Start' },
      { to: '/leistungen', label: 'Leistungen' },
      { to: '/galerie', label: 'Looks' },
      { to: '/ueber-uns', label: 'Studio' },
      { to: '/kontakt', label: 'Termin' },
    ],
  },
  tradesman: {
    servicesPath: '/leistungen',
    servicesLabel: 'Leistungen',
    servicesEyebrow: 'Leistungen',
    servicesHeadline: 'Was wir können.',
    nav: [
      { to: '/', label: 'Start' },
      { to: '/leistungen', label: 'Leistungen' },
      { to: '/referenzen', label: 'Referenzen' },
      { to: '/ueber-uns', label: 'Betrieb' },
      { to: '/kontakt', label: 'Anfrage' },
    ],
  },
};

const VARIANT_FAQ: Record<TemplateVariant, { q: string; a: string }[]> = {
  restaurant: [
    { q: 'Kann man reservieren?', a: 'Ja, gerne online über das Formular oder telefonisch. Wir empfehlen Reservierung am Wochenende und an Feiertagen.' },
    { q: 'Sind Sie barrierefrei?', a: 'Der Hauptraum ist ebenerdig zugänglich. Eine behindertengerechte Toilette steht zur Verfügung.' },
    { q: 'Bieten Sie vegetarische / vegane Speisen?', a: 'Auf jedem Tisch stehen drei vegetarische und zwei vegane Hauptgerichte zur Auswahl. Auf Wunsch passen wir Gerichte gerne an.' },
    { q: 'Geschlossene Gesellschaften?', a: 'Wir vermieten den Saal ab 12 Personen exklusiv. Schreiben Sie uns für ein individuelles Angebot.' },
    { q: 'Kinderfreundlich?', a: 'Selbstverständlich. Hochstühle, kleinere Portionen auf Wunsch und ein Spielebereich für die Kleinen.' },
  ],
  salon: [
    { q: 'Wie lange im Voraus muss ich buchen?', a: 'Für Schnitt und Föhnen meist 3–7 Tage. Für Färben oder Balayage 2–3 Wochen. Kurzfristige Slots tragen wir auf eine Warteliste ein.' },
    { q: 'Welche Produktlinien nutzen Sie?', a: 'Kérastase, Olaplex, Davines, Aveda. Für die Maniküre arbeiten wir mit OPI Shellac.' },
    { q: 'Bieten Sie Beratung vor dem Termin?', a: 'Gerne, kostenlos in 15 Minuten. So planen wir den Termin passend und Sie wissen, was auf Sie zukommt.' },
    { q: 'Was kostet ein Probestyling für die Hochzeit?', a: 'Ein Probestyling kostet 90 € und wird beim Bridal-Termin auf den Endpreis angerechnet.' },
    { q: 'Kann ich mein eigenes Mittel mitbringen?', a: 'Sehr gerne, falls Sie auf bestimmte Inhaltsstoffe verzichten möchten. Sprechen Sie uns einfach an.' },
  ],
  tradesman: [
    { q: 'Wie schnell ist der Notdienst da?', a: 'In der Regel innerhalb von 60 Minuten im Stadtgebiet Ingolstadt. Außerhalb je nach Verkehrslage – wir sagen Ihnen die Anfahrtszeit ehrlich am Telefon.' },
    { q: 'Was kostet eine Beratung?', a: 'Die erste Vor-Ort-Beratung ist kostenlos. Bei umfangreicher Energieberatung verrechnen wir 290 € pauschal, die bei Auftrag voll angerechnet werden.' },
    { q: 'Mit welchen Förderungen kann ich rechnen?', a: 'KfW, BAFA, regionale Programme und je nach Bauteil bis zu 35 % Zuschuss. Wir kalkulieren Ihre Förderquote schriftlich vor Auftrag.' },
    { q: 'Wer rechnet mit der Versicherung ab?', a: 'Auf Wunsch übernehmen wir die direkte Abrechnung mit Ihrer Gebäudeversicherung – Sie bekommen das Schadenprotokoll als PDF.' },
    { q: 'Garantie?', a: 'Auf Material 2 Jahre, auf unsere Arbeit 5 Jahre Gewährleistung. Bei Heizungsmodernisierungen optional Wartungsvertrag.' },
  ],
};

const VARIANT_HERO_META: Record<TemplateVariant, { label: string; value: string }[]> = {
  restaurant: [
    { label: 'Familie seit', value: '1998' },
    { label: 'Plätze drinnen', value: '64' },
    { label: 'Pasta täglich', value: 'frisch' },
    { label: 'Bewertung', value: '4,9 ★' },
  ],
  salon: [
    { label: 'Stylist:innen', value: '6' },
    { label: 'Education', value: 'Paris · NY' },
    { label: 'Wartezeit', value: '3 Tage' },
    { label: 'Bewertung', value: '4,9 ★' },
  ],
  tradesman: [
    { label: 'Meisterbetrieb seit', value: '1972' },
    { label: 'Mitarbeitende', value: '18' },
    { label: 'Notdienst', value: '24/7' },
    { label: 'Empfehlungen', value: '> 65 %' },
  ],
};

export default function TemplateApp({
  variant,
  content,
  basePath = '',
}: {
  variant: TemplateVariant;
  content: SiteContent;
  basePath?: string;
}) {
  const cfg = NAV_BY_VARIANT[variant];
  const announcements = announcementsFor(variant);
  useReveal();

  return (
    <BasePathProvider value={basePath}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader content={content} nav={cfg.nav} basePath={basePath} announcements={announcements} />
        <main className="flex-1">
          <ScrollToTopOnRoute />
          <Routes>
            <Route index element={<HomePage variant={variant} content={content} />} />
            <Route path={cfg.servicesPath.replace(/^\//, '')} element={<ServicesPage variant={variant} content={content} />} />
            <Route path="galerie" element={<GalleryPage content={content} variant={variant} />} />
            <Route path="referenzen" element={<GalleryPage content={content} variant={variant} title="Referenzen" eyebrow="Projekte" />} />
            <Route path="ueber-uns" element={<AboutPage variant={variant} content={content} />} />
            <Route path="kontakt" element={<ContactPage content={content} />} />
            <Route path="*" element={<HomePage variant={variant} content={content} />} />
          </Routes>
        </main>
        <SiteFooter content={content} basePath={basePath} nav={cfg.nav} />
      </div>
    </BasePathProvider>
  );
}

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [pathname]);
  return null;
}

function announcementsFor(v: TemplateVariant) {
  if (v === 'restaurant') return ['Heute geöffnet · 17:30 – 22:00', 'Tisch online reservieren', 'Trüffel-Saison läuft', 'Innsbruck · Maria-Theresien-Straße'];
  if (v === 'salon') return ['Aktuell freie Termine · Diese Woche', 'Bridal-Beratung kostenlos', 'Kérastase Education-Partner', 'München-Schwabing'];
  return ['24/7 Notdienst · 60 Minuten Anfahrt', 'KfW-Förderung bis 35 %', 'Festpreis-Garantie', 'Ingolstadt & Umgebung'];
}

/* ─── Home ─────────────────────────────────────────────────────────── */
function HomePage({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const cfg = NAV_BY_VARIANT[variant];
  const featuredServices = content.services.slice(0, 3);
  const featuredGallery = content.gallery.slice(0, 6);
  const heroMeta = VARIANT_HERO_META[variant];

  return (
    <>
      <Hero content={content} meta={heroMeta} />

      {/* Marquee word strip */}
      <div className="bg-brand text-white py-6 border-y border-white/10">
        <Marquee speed="slow">
          {marqueeWordsFor(variant).concat(marqueeWordsFor(variant)).map((w, i) => (
            <span key={i} className="inline-flex items-center gap-6 font-display text-3xl md:text-4xl whitespace-nowrap">
              <span>{w}</span><span className="text-[var(--accent-color)]">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* About teaser */}
      {content.about?.body && (
        <Section
          eyebrow={variant === 'restaurant' ? 'Unsere Geschichte' : variant === 'salon' ? 'Unser Studio' : 'Unser Betrieb'}
          title={<>{splitTitle(content.about.title || 'Über uns')}</>}
          spacing="lg"
        >
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <ParallaxImage src={content.about.imageUrl || content.gallery[0]} alt={content.brand.name} className="rounded-3xl aspect-[4/5] reveal" />
            </div>
            <div className="lg:col-span-7 lg:pt-12">
              <div className="prose-lite reveal">
                {(content.about.body || '').split('\n\n').map((p, i) => (
                  <p key={i} className="text-lg md:text-xl leading-relaxed text-muted mb-6">{p}</p>
                ))}
              </div>
              <TLink to="/ueber-uns" className="btn-outline mt-6 reveal">Mehr erfahren <span aria-hidden>→</span></TLink>
            </div>
          </div>
        </Section>
      )}

      {/* Featured services */}
      {featuredServices.length > 0 && (
        <Section
          eyebrow={cfg.servicesEyebrow}
          title={<>{splitTitle(cfg.servicesHeadline)}</>}
          subtitle={teaserSubtitleFor(variant)}
          className="surface"
        >
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {featuredServices.map((s, i) => (
              <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
                {s.imageUrl && (
                  <div className="aspect-[4/3] img-zoom">
                    <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl">{s.title}</h3>
                    {s.price && <span className="text-sm font-mono whitespace-nowrap">{s.price}</span>}
                  </div>
                  {s.description && <p className="mt-3 text-muted text-sm leading-relaxed">{s.description}</p>}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 reveal">
            <TLink to={cfg.servicesPath} className="btn-primary">Alle {cfg.servicesLabel} <span aria-hidden>→</span></TLink>
          </div>
        </Section>
      )}

      {/* Numbers / testimonial line */}
      <NumbersBand variant={variant} />

      {/* Gallery teaser */}
      {featuredGallery.length > 0 && (
        <Section eyebrow="Eindrücke" title={<>Bilder, die <em className="italic-pop">erzählen.</em></>} spacing="lg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 reveal-stagger">
            {featuredGallery.map((src, i) => (
              <div key={src + i} className={`overflow-hidden rounded-3xl img-zoom ${i % 5 === 0 ? 'md:row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="mt-12 reveal">
            <TLink to={variant === 'tradesman' ? '/referenzen' : '/galerie'} className="btn-outline">Komplette Galerie <span aria-hidden>→</span></TLink>
          </div>
        </Section>
      )}

      {/* Testimonials */}
      {content.testimonials.length > 0 && (
        <Section eyebrow="Stimmen" title={<>Was unsere Kund<em className="italic-pop">:innen sagen.</em></>} className="surface">
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {content.testimonials.slice(0, 3).map((t, i) => (
              <blockquote key={i} className="bg-white border border-line rounded-3xl p-8 hover-lift">
                <span className="font-display text-7xl text-[var(--accent-color)] block leading-none mb-2">&ldquo;</span>
                <p className="text-lg leading-relaxed">{t.text}</p>
                <footer className="mt-6 pt-5 border-t border-line text-sm font-medium">{t.author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <CtaBand variant={variant} />
    </>
  );
}

function NumbersBand({ variant }: { variant: TemplateVariant }) {
  const stats: Record<TemplateVariant, { v: number; s?: string; l: string }[]> = {
    restaurant: [
      { v: 1998, l: 'Familienbetrieb seit' },
      { v: 64, l: 'Plätze drinnen' },
      { v: 4, s: ',9', l: 'Sterne ø' },
      { v: 28, l: 'Weine offen' },
    ],
    salon: [
      { v: 6, l: 'Stylist:innen' },
      { v: 12, l: 'Treatments' },
      { v: 4, s: ',9', l: 'Sterne ø' },
      { v: 2017, l: 'Studio seit' },
    ],
    tradesman: [
      { v: 50, s: '+', l: 'Jahre Erfahrung' },
      { v: 18, l: 'Mitarbeitende' },
      { v: 60, s: ' min', l: 'Anfahrtszeit Notdienst' },
      { v: 65, s: ' %', l: 'Empfehlungsquote' },
    ],
  };
  return (
    <section className="py-20 md:py-28 bg-brand text-white grain relative overflow-hidden">
      <div className="blob -top-40 -left-40 w-[500px] h-[500px]" style={{ background: 'var(--accent-color)', opacity: 0.18 }} />
      <div className="container-x relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 reveal-stagger">
          {stats[variant].map((m, i) => (
            <div key={i} className="md:border-l border-white/15 md:pl-8">
              <p className="num-display text-5xl md:text-7xl leading-none">
                {m.s && m.s.startsWith(',')
                  ? <>{m.v}{m.s}</>
                  : <AnimatedCounter to={m.v} suffix={m.s || ''} />}
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-white/60">{m.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({ variant }: { variant: TemplateVariant }) {
  const text: Record<TemplateVariant, { lead: string; cta: string; sub: string }> = {
    restaurant: { lead: 'Hunger?', cta: 'Tisch reservieren', sub: 'Wir freuen uns, Sie an unserem Tisch begrüßen zu dürfen.' },
    salon: { lead: 'Bereit für etwas Neues?', cta: 'Termin buchen', sub: 'Wir nehmen uns die Zeit – für Sie, für Ihren Look.' },
    tradesman: { lead: 'Etwas tropft?', cta: 'Jetzt anfragen', sub: 'Wir melden uns innerhalb von 24 Stunden mit einem Festpreis-Angebot.' },
  };
  const t = text[variant];
  return (
    <section className="py-32 md:py-44 surface relative overflow-hidden">
      <div className="container-x text-center max-w-3xl mx-auto reveal">
        <p className="eyebrow mb-5 justify-center">Bereit?</p>
        <h2 className="headline-xl">
          {t.lead}<br />
          <em className="italic-pop">Schreiben Sie uns.</em>
        </h2>
        <p className="mt-8 text-lg md:text-xl text-muted">{t.sub}</p>
        <div className="mt-12">
          <TLink to="/kontakt" className="btn-primary">{t.cta} <span aria-hidden>→</span></TLink>
        </div>
      </div>
    </section>
  );
}

/* ─── Services / Speisekarte / Leistungen ────────────────────────── */
function ServicesPage({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const cfg = NAV_BY_VARIANT[variant];
  return (
    <>
      <PageHero
        eyebrow={cfg.servicesEyebrow}
        title={cfg.servicesHeadline}
        subtitle={teaserSubtitleFor(variant)}
      />

      <Section spacing="lg">
        <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
          {content.services.map((s, i) => (
            <article
              key={i}
              className="bg-white border border-line rounded-3xl overflow-hidden hover-lift grid sm:grid-cols-12"
            >
              {s.imageUrl && (
                <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto img-zoom">
                  <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="sm:col-span-7 p-7 flex flex-col">
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <span className="font-mono text-sm">{s.price}</span>
                </div>
                <p className="text-muted text-sm leading-relaxed flex-1">{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Fragen" title={<>Häufig <em className="italic-pop">gefragt.</em></>} className="surface">
        <Accordion items={VARIANT_FAQ[variant].map((f) => ({ q: f.q, a: f.a }))} className="max-w-3xl" />
      </Section>

      <CtaBand variant={variant} />
    </>
  );
}

/* ─── Gallery / Referenzen ───────────────────────────────────────── */
function GalleryPage({
  content, variant, title, eyebrow,
}: { content: SiteContent; variant: TemplateVariant; title?: string; eyebrow?: string }) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow ?? 'Galerie'}
        title={title ?? 'Bilder & Eindrücke'}
        subtitle={
          variant === 'restaurant'
            ? 'Eindrücke aus dem Lokal, von Tellern, Saucen und Familie. Aufgenommen in echtem Kerzenlicht.'
            : variant === 'salon'
              ? 'Looks unserer Kund:innen – mit Erlaubnis dokumentiert. Klick für Detail.'
              : 'Aktuelle Projekte aus den letzten Monaten – von kleiner Reparatur bis zur kompletten Sanierung.'
        }
      />

      <Section spacing="lg">
        <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance] reveal-stagger">
          {content.gallery.map((src, i) => (
            <div key={src + i} className="break-inside-avoid mb-3 overflow-hidden rounded-2xl img-zoom">
              <img src={src} alt="" className="w-full h-auto" loading="lazy" />
            </div>
          ))}
        </div>
      </Section>

      <CtaBand variant={variant} />
    </>
  );
}

/* ─── About ──────────────────────────────────────────────────────── */
function AboutPage({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title={content.about?.title || 'Unsere Geschichte.'}
      />

      <Section spacing="lg">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <ParallaxImage
              src={content.about?.imageUrl || content.gallery[0]}
              alt={content.brand.name}
              className="rounded-3xl aspect-[4/5] reveal"
            />
          </div>
          <div className="lg:col-span-7 lg:pl-4">
            <div className="reveal">
              {(content.about?.body || '').split('\n\n').map((p, i) => (
                <p key={i} className="text-lg md:text-xl leading-relaxed text-muted mb-6">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <NumbersBand variant={variant} />

      {content.testimonials.length > 0 && (
        <Section eyebrow="Stimmen" title={<>Was unsere Kund<em className="italic-pop">:innen sagen.</em></>} className="surface">
          <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
            {content.testimonials.map((t, i) => (
              <blockquote key={i} className="bg-white border border-line rounded-3xl p-8 hover-lift">
                <span className="font-display text-7xl text-[var(--accent-color)] block leading-none mb-2">&ldquo;</span>
                <p className="text-lg leading-relaxed">{t.text}</p>
                <footer className="mt-6 pt-5 border-t border-line text-sm font-medium">{t.author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      )}

      <CtaBand variant={variant} />
    </>
  );
}

/* ─── Contact ────────────────────────────────────────────────────── */
function ContactPage({ content }: { content: SiteContent }) {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={'Wir freuen uns von Ihnen zu hören.'}
      />
      <ContactBlock content={content} />
    </>
  );
}

function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="pt-44 pb-12">
      <div className="container-x">
        <p className="eyebrow mb-5 reveal">{eyebrow}</p>
        <h1 className="headline-xl max-w-5xl reveal">{splitTitle(title)}</h1>
        {subtitle && <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl reveal">{subtitle}</p>}
      </div>
    </section>
  );
}

function splitTitle(t: string): React.ReactNode {
  // Split into two halves with the second italicized for editorial pop
  const words = t.split(' ');
  if (words.length < 3) return t;
  const cut = Math.ceil(words.length / 2);
  return (
    <>
      {words.slice(0, cut).join(' ')}{' '}
      <em className="italic-pop">{words.slice(cut).join(' ')}</em>
    </>
  );
}

function teaserSubtitleFor(v: TemplateVariant) {
  if (v === 'restaurant') return 'Hausgemachte Pasta, Holzofen-Pizza und ein wechselndes Tagesgericht. Saisonal, ehrlich, ohne Kompromisse.';
  if (v === 'salon') return 'Schnitt, Farbe, Pflege und Beauty – mit ehrlicher Beratung und hochwertigen Produkten.';
  return 'Vom kleinen Notfall bis zur Großsanierung. Festpreis, Meisterprüfung, transparente Kommunikation.';
}

function marqueeWordsFor(v: TemplateVariant): string[] {
  if (v === 'restaurant') return ['Pasta fresca', 'Holzofen-Pizza', 'Naturweine', 'Antipasti', 'Tiramisu della Nonna', 'Tartufo nero'];
  if (v === 'salon') return ['Hair', 'Skin', 'Soul', 'Balayage', 'Bridal', 'Spa', 'Treatment'];
  return ['Notdienst 24/7', 'Festpreis-Garantie', 'Meisterbetrieb', 'KfW-Förderung', 'Smart Home', 'Wärmepumpe'];
}
