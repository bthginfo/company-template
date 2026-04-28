import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import type { SiteContent, TemplateKey, PageId } from '@/lib/types';
import Seo from '@/components/Seo';
import {
  SiteHeader, Hero, Section, ContactBlock, SiteFooter, BasePathProvider,
  type NavItem,
} from '@/components/site-blocks';
import {
  Marquee, Accordion, AnimatedCounter, useReveal, ParallaxImage,
} from '@/components/fx';
import {
  Tilt3DCard, HoverGlow, HardShadowCard,
} from '@/components/motion-fx';
import {
  AuroraBackground, SpotlightSection, AnimatedGridPattern, ScrollVelocityText, TextReveal,
} from '@/components/fx-21st';
import { TLink } from '@/components/site-blocks';
import { ConsentScripts } from '@/components/ConsentScripts';
import { Timeline } from '@/components/Timeline';
import { NewsPreview, NewsIndexPage, NewsDetailPage } from '@/components/News';
import { branchTextDefaults } from '@/lib/branch-text-defaults';

export type TemplateVariant = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism';
export type TemplateStyle = 'classic' | 'modern' | 'bold';

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
  hotel: {
    servicesPath: '/zimmer',
    servicesLabel: 'Zimmer',
    servicesEyebrow: 'Zimmer & Suiten',
    servicesHeadline: 'Ihr Zuhause auf Zeit.',
    nav: [
      { to: '/', label: 'Start' },
      { to: '/zimmer', label: 'Zimmer' },
      { to: '/galerie', label: 'Haus & Spa' },
      { to: '/ueber-uns', label: 'Geschichte' },
      { to: '/kontakt', label: 'Reservieren' },
    ],
  },
  tourism: {
    servicesPath: '/touren',
    servicesLabel: 'Touren',
    servicesEyebrow: 'Programm',
    servicesHeadline: 'Unser Programm.',
    nav: [
      { to: '/', label: 'Start' },
      { to: '/touren', label: 'Touren' },
      { to: '/galerie', label: 'Eindrücke' },
      { to: '/ueber-uns', label: 'Guides' },
      { to: '/kontakt', label: 'Buchen' },
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
  hotel: [
    { q: 'Wann sind Check-in und Check-out?', a: 'Check-in ab 15:00 Uhr, Check-out bis 11:00 Uhr. Auf Wunsch lagern wir Ihr Gepäck gerne vor und nach dem Aufenthalt.' },
    { q: 'Ist Halbpension inklusive?', a: 'Im Standardtarif ist ein reichhaltiges Frühstücksbuffet enthalten. Halbpension buchen Sie für 38 € pro Person und Tag dazu.' },
    { q: 'Sind Hunde willkommen?', a: 'Ja, kleine bis mittelgroße Hunde sind herzlich willkommen (15 €/Nacht inkl. Decke und Napf). Bitte bei Buchung anmelden.' },
    { q: 'Wie nutze ich den Spa?', a: 'Der Wellnessbereich mit Sauna, Dampfbad und Außenpool steht Hausgästen täglich von 7:00 bis 21:00 Uhr offen – Bademantel und Slipper liegen im Zimmer bereit.' },
    { q: 'Stornierungsbedingungen?', a: 'Kostenfreie Stornierung bis 7 Tage vor Anreise. Danach berechnen wir 80 % des Aufenthalts. Reiserücktrittsversicherung empfehlen wir.' },
  ],
  tourism: [
    { q: 'Wie viele Personen pro Gruppe?', a: 'Maximal 12 Gäste pro Guide. So bleibt es persönlich und auch in den Bergen sicher.' },
    { q: 'Welche Sprachen sprechen die Guides?', a: 'Alle Touren auf Deutsch und Englisch, viele Guides zusätzlich Italienisch, Französisch oder Spanisch. Bitte bei Buchung angeben.' },
    { q: 'Was ist im Preis enthalten?', a: 'Guide, Eintritte, Transfer ab Innsbruck und – je nach Tour – Verpflegung. Detail-Inklusivleistungen finden Sie bei jeder Tour.' },
    { q: 'Welche Fitness brauche ich?', a: 'Wir kennzeichnen jede Tour mit einem Level (1–4). Stufe 1 ist familientauglich, Stufe 4 setzt alpine Erfahrung voraus. Sprechen Sie uns gerne an.' },
    { q: 'Stornierung?', a: 'Bis 14 Tage vor Tourbeginn kostenfrei, danach 50 %. Bei Wetterabsage durch uns erstatten wir vollständig oder verschieben.' },
  ],
};

const VARIANT_HERO_META: Record<TemplateVariant, { label: string; value: string }[]> = {
  restaurant: [
    { label: 'Familie seit', value: '1998' },
    { label: 'Plätze drinnen', value: '64' },
    { label: 'Pasta', value: 'täglich frisch' },
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
  hotel: [
    { label: 'Familienbetrieb seit', value: '1958' },
    { label: 'Zimmer & Suiten', value: '34' },
    { label: 'Spa-Fläche', value: '600 m²' },
    { label: 'Bewertung', value: '4,9 ★' },
  ],
  tourism: [
    { label: 'Touren pro Jahr', value: '180+' },
    { label: 'Guides', value: '14' },
    { label: 'Sprachen', value: '6' },
    { label: 'Bewertung', value: '4,9 ★' },
  ],
};

/* Resolve numbers/faq overlays from admin content. */
function resolveHeroMeta(variant: TemplateVariant, content: SiteContent): { label: string; value: string }[] {
  const overlay = (content as any).numbers as { value: string; label: string }[] | undefined;
  if (overlay && overlay.length) return overlay.map((n) => ({ label: n.label, value: n.value }));
  return VARIANT_HERO_META[variant];
}
function resolveFaq(variant: TemplateVariant, content: SiteContent): { q: string; a: string }[] {
  const overlay = (content as any).faq as { q: string; a: string }[] | undefined;
  if (overlay && overlay.length) return overlay;
  return VARIANT_FAQ[variant];
}
function parseNumberValue(raw: string): { v: number; s?: string; raw?: boolean } {
  const m = String(raw).match(/^(-?\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return { v: 0, s: String(raw), raw: true };
  const [, num, rest] = m;
  const hasComma = num.includes(',');
  const hasDot = num.includes('.');
  const intPart = hasComma ? num.split(',')[0] : hasDot ? num.split('.')[0] : num;
  const frac = hasComma ? ',' + num.split(',')[1] : hasDot ? '.' + num.split('.')[1] : '';
  const suffix = (frac || '') + (rest || '');
  return { v: Number(intPart) || 0, s: suffix || undefined };
}

export default function TemplateApp({
  variant,
  content,
  basePath = '',
  style = 'classic',
}: {
  variant: TemplateVariant;
  content: SiteContent;
  basePath?: string;
  style?: TemplateStyle;
}) {
  const cfg = NAV_BY_VARIANT[variant];
  const announcements = announcementsFor(variant);
  useReveal();

  return (
    <BasePathProvider value={basePath}>
      <div className={`min-h-screen flex flex-col tpl-style-${style}`}>
        <ConsentScripts scripts={(content as any).customScripts} />
        <SiteHeader content={content} nav={cfg.nav} basePath={basePath} announcements={announcements} transparentTextDark={style !== 'classic'} />
        <main className="flex-1">
          <ScrollToTopOnRoute />
          <Routes>
            <Route index element={<><PageSeo page="home" variant={variant} content={content} /><HomePage variant={variant} content={content} style={style} /></>} />
            <Route path={cfg.servicesPath.replace(/^\//, '')} element={<><PageSeo page="services" variant={variant} content={content} /><ServicesPage variant={variant} content={content} style={style} /></>} />
            <Route path="galerie" element={<><PageSeo page="gallery" variant={variant} content={content} /><GalleryPage content={content} variant={variant} style={style} /></>} />
            <Route path="referenzen" element={<><PageSeo page="gallery" variant={variant} content={content} /><GalleryPage content={content} variant={variant} style={style} title="Referenzen" eyebrow="Projekte" /></>} />
            <Route path="ueber-uns" element={<><PageSeo page="about" variant={variant} content={content} /><AboutPage variant={variant} content={content} style={style} /></>} />
            <Route path="kontakt" element={<><PageSeo page="contactPage" variant={variant} content={content} /><ContactPage content={content} variant={variant} style={style} /></>} />
            <Route path="news" element={<NewsIndexPage content={content} basePath={basePath} />} />
            <Route path="news/:slug" element={<NewsDetailPage content={content} basePath={basePath} />} />
            <Route path="*" element={<><PageSeo page="home" variant={variant} content={content} /><HomePage variant={variant} content={content} style={style} /></>} />
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

function PageSeo({ page, variant, content }: { page: PageId; variant: TemplateVariant; content: SiteContent }) {
  const tplKey = variant as TemplateKey;
  const labels: Record<PageId, { title: string; description: string }> = {
    home: {
      title: content.brand.name,
      description: content.hero?.subtitle || content.about?.body?.slice(0, 160) || `${content.brand.name} – ${content.brand.tagline || 'offizielle Website'}.`,
    },
    services: {
      title: variant === 'restaurant' ? 'Speisekarte' : variant === 'tradesman' ? 'Leistungen' : 'Leistungen & Preise',
      description: variant === 'restaurant'
        ? `Aktuelle Speisekarte – Vorspeisen, Hauptgerichte, Desserts. Saisonale Karte bei ${content.brand.name}.`
        : `Alle Leistungen und Preise von ${content.brand.name} im Überblick.`,
    },
    gallery: {
      title: variant === 'tradesman' ? 'Referenzen' : 'Galerie',
      description: variant === 'tradesman'
        ? `Ausgewählte Projekte und Referenzen von ${content.brand.name}.`
        : `Eindrücke und Galerie von ${content.brand.name}.`,
    },
    about: {
      title: content.about?.title || 'Über uns',
      description: content.about?.body?.slice(0, 160) || `Über ${content.brand.name}.`,
    },
    contactPage: {
      title: 'Kontakt',
      description: `Adresse, Öffnungszeiten und Kontaktdaten von ${content.brand.name}.`,
    },
  };
  const l = labels[page];
  return <Seo title={l.title} description={l.description} content={content} template={tplKey} page={page} />;
}

function announcementsFor(v: TemplateVariant) {
  if (v === 'restaurant') return ['Heute geöffnet · 17:30 – 22:00', 'Tisch online reservieren', 'Trüffel-Saison läuft', 'Innsbruck · Maria-Theresien-Straße'];
  if (v === 'salon') return ['Aktuell freie Termine · Diese Woche', 'Bridal-Beratung kostenlos', 'Kérastase Education-Partner', 'München-Schwabing'];
  if (v === 'hotel') return ['Zimmer verfügbar · Wochenende', 'Spa & Sauna inklusive', 'Familienbetrieb seit 1958', 'Igls bei Innsbruck'];
  if (v === 'tourism') return ['Täglich geführte Touren', 'Kleine Gruppen · max. 12', '14 lizenzierte Guides', 'Innsbruck · Tirol'];
  return ['24/7 Notdienst · 60 Minuten Anfahrt', 'KfW-Förderung bis 35 %', 'Festpreis-Garantie', 'Ingolstadt & Umgebung'];
}

/* ─── Home ─────────────────────────────────────────────────────────── */
function HomePage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  if (style === 'modern') return <HomePageModern variant={variant} content={content} />;
  if (style === 'bold') return <HomePageBold variant={variant} content={content} />;
  return <HomePageClassic variant={variant} content={content} />;
}

function HomePageClassic({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const cfg = NAV_BY_VARIANT[variant];
  const featuredServices = content.services.slice(0, 3);
  const featuredGallery = content.gallery.slice(0, 7);
  const heroMeta = resolveHeroMeta(variant, content);

  return (
    <>
      <Hero content={content} meta={heroMeta} />

      {/* Marquee word strip */}
      <div className="bg-brand text-white py-6 border-y border-white/10">
        <Marquee speed="slow">
          {marqueeWordsFor(variant, content).concat(marqueeWordsFor(variant, content)).map((w, i) => (
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
          subtitle={subtitleFor(variant, content)}
          className={variant === 'tradesman' ? 'bg-brand text-white' : 'surface'}
        >
          <ClassicServicesGrid services={featuredServices} />
          <div className="mt-12 reveal">
            <TLink to={cfg.servicesPath} className={variant === 'tradesman' ? 'btn-accent' : 'btn-primary'}>Alle {cfg.servicesLabel} <span aria-hidden>→</span></TLink>
          </div>
        </Section>
      )}

      {/* Numbers / testimonial line */}
      <NumbersBand variant={variant} content={content} />

      {/* Gallery teaser - branch-specific */}
      {featuredGallery.length > 0 && (
        <Section eyebrow={variant === 'tradesman' ? 'Referenzen' : 'Eindrücke'} title={galleryTeaserTitle(variant, content)} spacing="lg">
          <GalleryShowcase variant={variant} images={featuredGallery} mode="teaser" />
          <div className="mt-12 reveal">
            <TLink to={variant === 'tradesman' ? '/referenzen' : '/galerie'} className="btn-outline">{variant === 'tradesman' ? 'Alle Projekte' : 'Komplette Galerie'} <span aria-hidden>→</span></TLink>
          </div>
        </Section>
      )}

      {/* Testimonials */}
      {content.testimonials.length > 0 && (
        <Section eyebrow={effectiveBranchText(variant, content).testimonialsEyebrow} title={splitTitle(effectiveBranchText(variant, content).testimonialsTitle)} className="surface">
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

      <NewsPreview content={content} />

      {/* CTA */}
      <CtaBand variant={variant} />
    </>
  );
}

/* ─── Home: Modern (SaaS-clean) ──────────────────────────────────── */
function HomePageModern({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const cfg = NAV_BY_VARIANT[variant];
  const featuredServices = content.services.slice(0, 6);
  const featuredGallery = content.gallery.slice(0, 6);
  const heroImg = content.gallery[0] || content.about?.imageUrl;
  const meta = resolveHeroMeta(variant, content);

  return (
    <>
      {/* Split hero – text left, framed image right, with aurora + dot grid backdrop */}
      <section className="pt-44 pb-20 md:pb-28 relative overflow-hidden">
        <AuroraBackground intensity={0.18} colors={['var(--accent-color)', '#FFB347', '#7C3AED', '#22d3ee']} />
        <AnimatedGridPattern className="text-brand/[0.07]" width={40} height={40} dotSize={1.2} />
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-6 reveal">
            <p className="eyebrow mb-5">{content.brand.tagline || 'Willkommen'}</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] tracking-tight">
              <TextReveal text={content.hero?.title || (content.brand.name + '.')} />
              {content.hero?.subtitle ? (
                <>
                  <br />
                  <span className="text-muted"><TextReveal text={content.hero.subtitle} /></span>
                </>
              ) : null}
            </h1>
            <p className="mt-8 text-lg text-muted max-w-xl">{heroBodyFor(variant, content)}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <TLink to="/kontakt" className="btn-primary">Kontakt aufnehmen <span aria-hidden>→</span></TLink>
              <TLink to={cfg.servicesPath} className="btn-outline">{cfg.servicesLabel} ansehen</TLink>
            </div>
            <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 max-w-xl">
              {meta.map((m, i) => (
                <div key={i}>
                  <dt className="text-[10px] uppercase tracking-widest text-muted">{m.label}</dt>
                  <dd className="mt-1 font-display text-2xl">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-6 reveal">
            {heroImg && (
              <Tilt3DCard className="rounded-3xl">
                <div className="relative">
                  <div className="absolute -inset-6 rounded-[2rem] bg-[var(--accent-color)] opacity-25 blur-3xl" aria-hidden />
                  <div className="relative rounded-3xl overflow-hidden border border-line shadow-2xl aspect-[4/5] bg-white">
                    <img src={heroImg} alt={content.brand.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </Tilt3DCard>
            )}
          </div>
        </div>
      </section>

      {/* Feature grid wrapped with cursor-following spotlight */}
      <SpotlightSection
        as="div"
        color="rgba(242,65,113,0.16)"
        size={620}
        className="surface"
      >
        <Section eyebrow={cfg.servicesEyebrow} title={<>{splitTitle(cfg.servicesHeadline)}</>} subtitle={subtitleFor(variant, content)}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
            {featuredServices.map((s, i) => (
              <Tilt3DCard key={i} max={5} className="rounded-2xl">
                <article className="bg-white border border-line rounded-2xl p-7 hover-lift h-full">
                  <div className="h-10 w-10 rounded-xl bg-[var(--accent-color)]/15 grid place-items-center text-brand">
                    <span className="font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-display text-xl mt-5">{s.title}</h3>
                  {s.description && <p className="mt-3 text-sm text-muted leading-relaxed">{s.description}</p>}
                  {s.price && <p className="mt-4 font-mono text-xs text-brand">{s.price}</p>}
                </article>
              </Tilt3DCard>
            ))}
          </div>
          <div className="mt-12 reveal">
            <TLink to={cfg.servicesPath} className="btn-primary">Alle {cfg.servicesLabel} <span aria-hidden>→</span></TLink>
          </div>
        </Section>
      </SpotlightSection>

      {/* Logos / press strip */}
      <section className="py-14 border-y border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-y-6 gap-x-10 opacity-70">
          {(variant === 'restaurant' ? ['Falstaff', 'Tageszeitung', 'À la Carte', 'Genuss', 'Slow Food']
            : variant === 'salon' ? ['Kérastase', 'Olaplex', 'Davines', 'Aveda', 'OPI']
              : ['HWK', 'Innung', 'KfW Partner', 'Viessmann', 'BAFA']
          ).map((n) => (
            <span key={n} className="font-display text-2xl tracking-wide">{n}</span>
          ))}
        </div>
      </section>

      {/* About teaser */}
      {content.about?.body && (
        <Section eyebrow="Über uns" title={<>{splitTitle(content.about.title || 'Über uns')}</>}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="prose-lite reveal">
              {(content.about.body || '').split('\n\n').slice(0, 2).map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted mb-5">{p}</p>
              ))}
              <TLink to="/ueber-uns" className="btn-outline mt-2">Mehr erfahren <span aria-hidden>→</span></TLink>
            </div>
            {content.about.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-line aspect-[4/3] reveal">
                <img src={content.about.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Gallery teaser – clean grid */}
      {featuredGallery.length > 0 && (
        <Section eyebrow="Galerie" title={galleryTeaserTitle(variant, content)} className="surface">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 reveal-stagger">
            {featuredGallery.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl img-zoom">
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="mt-10 reveal">
            <TLink to={variant === 'tradesman' ? '/referenzen' : '/galerie'} className="btn-outline">Alles ansehen <span aria-hidden>→</span></TLink>
          </div>
        </Section>
      )}

      {/* FAQ accordion */}
      <Section eyebrow="Häufig gefragt" title={<>Antworten auf <em className="italic-pop">Ihre Fragen.</em></>}>
        <Accordion items={resolveFaq(variant, content).slice(0, 4).map((f) => ({ q: f.q, a: f.a }))} className="max-w-3xl" />
      </Section>

      <NewsPreview content={content} />

      {/* Soft CTA */}
      {(() => {
        const t = effectiveBranchText(variant, content);
        return (
          <section className="py-24 surface">
            <div className="container-x">
              <div className="rounded-3xl bg-white border border-line p-10 md:p-14 text-center reveal">
                <p className="eyebrow justify-center mb-4">{t.softCtaEyebrow}</p>
                <h2 className="headline-lg">{t.softCtaTitle}</h2>
                <p className="mt-5 text-muted max-w-xl mx-auto">{t.softCtaText}</p>
                <TLink to="/kontakt" className="btn-primary mt-8">{t.softCtaButton} <span aria-hidden>→</span></TLink>
              </div>
            </div>
          </section>
        );
      })()}
    </>
  );
}

/* ─── Home: Bold (magazine/poster) ───────────────────────────────── */
function HomePageBold({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const cfg = NAV_BY_VARIANT[variant];
  const featuredServices = content.services.slice(0, 8);
  const featuredGallery = content.gallery.slice(0, 12);
  const heroImg = content.gallery[0];

  return (
    <>
      {/* Type-driven full-bleed hero */}
      <section className="pt-40 pb-10 grain relative overflow-hidden">
        <AuroraBackground intensity={0.22} colors={['var(--accent-color)', '#FFB347', '#22d3ee', '#7C3AED']} />
        <div className="container-x relative">
          <p className="eyebrow mb-6 reveal">{content.brand.tagline || cfg.servicesEyebrow}</p>
          <h1 className="reveal font-display tracking-tighter leading-[0.85] text-[18vw] md:text-[14vw] lg:text-[180px]">
            {(content.hero?.title || content.brand.name).toUpperCase()}
          </h1>
        </div>
        {/* Massive velocity-driven brand strip */}
        <div className="mt-10">
          <ScrollVelocityText className="font-display text-7xl md:text-[10rem] leading-none uppercase tracking-tighter" baseVelocity={80}>
            <span className="text-brand">{content.brand.name}</span>
            <span className="text-[var(--accent-color)] mx-8">●</span>
            <span className="text-muted">{cfg.servicesEyebrow}</span>
            <span className="text-[var(--accent-color)] mx-8">●</span>
          </ScrollVelocityText>
        </div>
        {heroImg && (
          <div className="container-x mt-12 reveal">
            <div className="aspect-[21/9] overflow-hidden rounded-none">
              <img src={heroImg} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </section>

      {/* Asymmetric statement split */}
      <section className="py-24 md:py-36">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 md:col-start-2">
            <p className="eyebrow mb-5 reveal">{effectiveBranchText(variant, content).manifestEyebrow}</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] reveal">
              {splitTitle(effectiveBranchText(variant, content).manifestTitle)}
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-14 reveal">
            {(content.about?.body || subtitleFor(variant, content)).split('\n\n').slice(0, 2).map((p, i) => (
              <p key={i} className="text-lg md:text-xl leading-relaxed mb-5">{p}</p>
            ))}
            <TLink to="/ueber-uns" className="link-underline mt-2 inline-flex">Unsere Geschichte <span aria-hidden>→</span></TLink>
          </div>
        </div>
      </section>

      {/* Big colored services as numbered editorial list */}
      <section className="py-24 md:py-36 bg-brand text-white">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow mb-4 !text-white/70">{cfg.servicesEyebrow}</p>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">{splitTitle(cfg.servicesHeadline)}</h2>
            </div>
            <TLink to={cfg.servicesPath} className="btn-accent hidden md:inline-flex">Alle <span aria-hidden>→</span></TLink>
          </div>
          <ol className="divide-y divide-white/15 reveal-stagger">
            {featuredServices.map((s, i) => (
              <li key={i} className="grid md:grid-cols-12 gap-6 py-7 items-baseline group hover:bg-white/5 transition-colors -mx-4 px-4 rounded">
                <span className="md:col-span-2 font-mono text-xs text-white/50">/ {String(i + 1).padStart(2, '0')}</span>
                <h3 className="md:col-span-5 font-display text-3xl md:text-4xl">{s.title}</h3>
                {s.description && <p className="md:col-span-4 text-white/70 text-sm">{s.description}</p>}
                {s.price && <span className="md:col-span-1 font-mono text-sm md:text-right text-[var(--accent-color)]">{s.price}</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Oversized stats with grain */}
      <NumbersBand variant={variant} content={content} />

      {/* Real masonry gallery teaser */}
      {featuredGallery.length > 0 && (
        <section className="py-24 md:py-36">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6 mb-12">
              <div>
                <p className="eyebrow mb-4">Galerie</p>
                <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">{galleryTeaserTitle(variant, content)}</h2>
              </div>
              <TLink to={variant === 'tradesman' ? '/referenzen' : '/galerie'} className="link-underline hidden md:inline-flex">Alle Bilder <span aria-hidden>→</span></TLink>
            </div>
            <MasonryGrid images={featuredGallery} />
          </div>
        </section>
      )}

      {/* Testimonials – big quote */}
      {content.testimonials.length > 0 && (
        <>
          <ScrollVelocityText className="font-display text-6xl md:text-9xl leading-none uppercase tracking-tighter py-10 bg-[var(--accent-color)] text-[var(--accent-fg)]" baseVelocity={-50}>
            <span>Stimmen</span>
            <span className="mx-8 opacity-60">/</span>
            <span>Ehrliche Worte</span>
            <span className="mx-8 opacity-60">/</span>
          </ScrollVelocityText>
          <section className="py-24 md:py-36 surface">
            <div className="container-x grid md:grid-cols-12 gap-10">
              <div className="md:col-span-7 reveal">
                <span className="font-display text-[140px] md:text-[200px] leading-[0.6] text-[var(--accent-color)] block">&ldquo;</span>
                <p className="font-display text-3xl md:text-5xl leading-tight mt-4">{content.testimonials[0].text}</p>
                <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">— {content.testimonials[0].author}</p>
              </div>
              <div className="md:col-span-5 space-y-5">
                {content.testimonials.slice(1, 4).map((t, i) => (
                  <HardShadowCard key={i} className="bg-white border border-brand rounded-none p-6 reveal" offset={6}>
                    <p className="text-base leading-relaxed">{t.text}</p>
                    <footer className="mt-4 text-xs font-mono uppercase tracking-widest text-muted">— {t.author}</footer>
                  </HardShadowCard>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <NewsPreview content={content} eyebrow="Aktuelles" title="Notizen." />

      {/* Bold CTA */}
      <section className="py-32 md:py-44 bg-[var(--accent-color)] text-brand grain">
        <div className="container-x text-center reveal">
          <h2 className="font-display text-6xl md:text-8xl leading-[0.95]">
            {variant === 'restaurant' ? 'Tisch frei?' : variant === 'salon' ? 'Termin?' : 'Auftrag?'}
          </h2>
          <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto">Schreiben Sie uns. Wir antworten.</p>
          <TLink to="/kontakt" className="btn-primary mt-10">Jetzt Kontakt <span aria-hidden>→</span></TLink>
        </div>
      </section>
    </>
  );
}

/* ─── Style-specific service layouts ─────────────────────────────── */
/** Modern: glass-tilt cards with cursor-following pink glow + 3D depth on hover. */
function ModernServicesGrid({ services }: { services: SiteContent['services'] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
      {services.map((s, i) => (
        <Tilt3DCard key={i} max={6} className="rounded-2xl">
          <HoverGlow className="bg-white border border-line rounded-2xl p-7 h-full" color="rgba(242,65,113,0.12)">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-color)]/15 grid place-items-center text-brand">
              <span className="font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="font-display text-2xl mt-5">{s.title}</h3>
            {s.description && <p className="mt-3 text-sm text-muted leading-relaxed">{s.description}</p>}
            {s.price && <p className="mt-4 font-mono text-xs text-brand">{s.price}</p>}
          </HoverGlow>
        </Tilt3DCard>
      ))}
    </div>
  );
}

/** Bold: editorial numbered list, but each row has a hard-offset shadow tile
 *  on hover-state — explicit Neubrutalism cue (skill #38, #77).
 */
function BoldServicesList({ services }: { services: SiteContent['services'] }) {
  return (
    <ol className="divide-y divide-line reveal-stagger">
      {services.map((s, i) => (
        <li
          key={i}
          className="grid md:grid-cols-12 gap-6 py-8 items-baseline group transition-transform hover:translate-x-1"
        >
          <span className="md:col-span-2 font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</span>
          <h3 className="md:col-span-5 font-display text-3xl md:text-5xl leading-[0.95] tracking-tight uppercase">
            {s.title}
          </h3>
          {s.description && <p className="md:col-span-4 text-muted text-base">{s.description}</p>}
          {s.price && (
            <span className="md:col-span-1 font-mono text-sm md:text-right inline-block px-2 py-1 bg-[var(--accent-color)] text-[var(--accent-fg)]">
              {s.price}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Classic: editorial cards with Roman-numeral counters and italic drop-caps
 *  for a magazine feel (skill #66 Editorial Grid).
 *  Currently exported as a fallback grid for Style+Branch combinations
 *  that have no branch-specific layout — referenced lazily by ServicesShowcase.
 */
const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
export function ClassicServicesGrid({ services }: { services: SiteContent['services'] }) {
  return (
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-14 reveal-stagger">
      {services.map((s, i) => (
        <article key={i} className="border-t border-line pt-8 group">
          <div className="flex items-baseline justify-between mb-5">
            <span className="font-display italic text-3xl text-[var(--accent-color)]">
              {ROMAN_NUMERALS[i] || String(i + 1)}
            </span>
            {s.price && <span className="font-mono text-xs text-muted">{s.price}</span>}
          </div>
          <h3 className="font-display text-3xl md:text-4xl leading-tight">{s.title}</h3>
          {s.description && (
            <p className="mt-4 text-base text-muted leading-relaxed first-letter:font-display first-letter:italic first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-[var(--accent-color)]">
              {s.description}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

/* ─── Reusable gallery grids ─────────────────────────────────────── */
function ModernGalleryGrid({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal-stagger">
      {images.map((src, i) => (
        <figure key={i} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
          <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
          <figcaption className="absolute inset-x-0 bottom-0 px-4 py-3 text-xs font-mono uppercase tracking-widest text-white bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
            / {String(i + 1).padStart(2, '0')}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function MasonryGrid({ images }: { images: string[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance] reveal-stagger">
      {images.map((src, i) => (
        <figure
          key={i}
          className="mb-4 break-inside-avoid overflow-hidden rounded-2xl img-zoom group relative"
        >
          <img
            src={src}
            alt=""
            className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <figcaption className="absolute bottom-3 left-3 right-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
            / {String(i + 1).padStart(2, '0')}
          </figcaption>
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </figure>
      ))}
    </div>
  );
}

function NumbersBand({ variant, content }: { variant: TemplateVariant; content?: SiteContent }) {
  const defaults: Record<TemplateVariant, { v: number; s?: string; l: string }[]> = {
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
    hotel: [
      { v: 1958, l: 'Familienbetrieb seit' },
      { v: 34, l: 'Zimmer & Suiten' },
      { v: 4, s: ',9', l: 'Sterne ø' },
      { v: 600, s: ' m²', l: 'Spa-Fläche' },
    ],
    tourism: [
      { v: 14, l: 'Lizenzierte Guides' },
      { v: 180, s: '+', l: 'Touren pro Jahr' },
      { v: 12, l: 'Max. pro Gruppe' },
      { v: 4, s: ',9', l: 'Sterne ø' },
    ],
  };
  const overlay = content && ((content as any).numbers as { value: string; label: string }[] | undefined);
  const stats: { v: number; s?: string; l: string; raw?: boolean }[] = overlay && overlay.length
    ? overlay.map((n) => ({ ...parseNumberValue(n.value), l: n.label }))
    : defaults[variant];
  return (
    <section className="py-20 md:py-28 bg-brand text-white grain relative overflow-hidden">
      <div className="blob -top-40 -left-40 w-[500px] h-[500px]" style={{ background: 'var(--accent-color)', opacity: 0.18 }} />
      <div className="container-x relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 reveal-stagger">
          {stats.map((m, i) => (
            <div key={i} className="md:border-l border-white/15 md:pl-8">
              <p className="num-display text-5xl md:text-7xl leading-none">
                {m.raw
                  ? <>{m.s}</>
                  : m.s && m.s.startsWith(',')
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
    hotel: { lead: 'Pause buchen?', cta: 'Zimmer anfragen', sub: 'Wir antworten persönlich – ohne Formularkette, mit allen Optionen für Ihren Aufenthalt.' },
    tourism: { lead: 'Auf in die Berge?', cta: 'Tour buchen', sub: 'Wir beraten ehrlich, welche Tour zu Ihrer Gruppe und Saison passt.' },
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
function ServicesPage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  const cfg = NAV_BY_VARIANT[variant];
  return (
    <>
      <PageHero
        eyebrow={cfg.servicesEyebrow}
        title={cfg.servicesHeadline}
        subtitle={subtitleFor(variant, content)}
        style={style}
        image={style === 'modern' ? content.gallery[2] || content.gallery[0] : undefined}
      />

      {/* Highlights ribbon */}
      <ServiceHighlights variant={variant} />

      <Section spacing="lg" className={style === 'modern' ? 'surface' : ''}>
        {style === 'bold' ? (
          <BoldServicesList services={content.services} />
        ) : style === 'modern' ? (
          <ModernServicesGrid services={content.services} />
        ) : (
          <ServicesShowcase variant={variant} services={content.services} />
        )}
      </Section>

      {/* How it works strip */}
      <ServiceProcess variant={variant} />

      {/* FAQ */}
      <Section eyebrow="Fragen" title={<>Häufig <em className="italic-pop">gefragt.</em></>} className="surface">
        <Accordion items={resolveFaq(variant, content).map((f) => ({ q: f.q, a: f.a }))} className="max-w-3xl" />
      </Section>

      <CtaBand variant={variant} />
    </>
  );
}

function ServiceHighlights({ variant }: { variant: TemplateVariant }) {
  const items: Record<TemplateVariant, { t: string; d: string }[]> = {
    restaurant: [
      { t: 'Saisonale Karte', d: 'Wechselt mit den Jahreszeiten – schauen Sie immer wieder rein.' },
      { t: 'Hausgemachte Pasta', d: 'Täglich frisch gezogen, nach traditioneller Rezeptur.' },
      { t: 'Wein vom Winzer', d: 'Über 50 Positionen, 28 davon offen.' },
      { t: 'Allergene gekennzeichnet', d: 'Klar markiert in der Karte. Auf Wunsch passen wir Gerichte an.' },
    ],
    salon: [
      { t: 'Kostenlose Beratung', d: '15 Minuten Gespräch vor Ihrem ersten Termin.' },
      { t: 'Terminerinnerung per SMS', d: 'Damit Sie nichts vergessen – einen Tag vorher und am Tag selbst.' },
      { t: 'Geschenkgutscheine', d: 'Auch online erhältlich, in jeder Höhe und ohne Verfallsdatum.' },
      { t: 'Bridal-Beratung', d: 'Probestyling, Tag der Hochzeit, optional Make-up – alles aus einer Hand.' },
    ],
    tradesman: [
      { t: 'Festpreis-Garantie', d: 'Schriftliches Angebot vor Auftrag – keine bösen Überraschungen.' },
      { t: 'Förderberatung', d: 'KfW, BAFA, regionale Programme – wir berechnen Ihre Quote ehrlich vor.' },
      { t: 'Notdienst 24/7', d: 'Auch am Wochenende und an Feiertagen erreichbar.' },
      { t: 'Garantie über Gesetz hinaus', d: 'Auf unsere Arbeit fünf Jahre Gewährleistung – freiwillig.' },
    ],
    hotel: [
      { t: 'Spa inklusive', d: 'Sauna, Dampfbad und Außenpool stehen Hausgästen täglich offen.' },
      { t: 'Genuss aus der Küche', d: 'Halbpension, regionale Produkte, hausgemachte Mehlspeisen.' },
      { t: 'Kostenfreie Stornierung', d: 'Bis 7 Tage vor Anreise – weil Pläne sich ändern dürfen.' },
      { t: 'Hund willkommen', d: 'Mit Decke, Napf und festen Auslaufzeiten in der Anlage.' },
    ],
    tourism: [
      { t: 'Kleine Gruppen', d: 'Maximal 12 Gäste pro Guide – persönlich und sicher.' },
      { t: 'Lizenzierte Guides', d: 'Bergführer, Wanderführer und Wein-Sommelière mit Prüfung.' },
      { t: 'Mehrsprachig', d: 'Deutsch und Englisch immer dabei, weitere Sprachen auf Anfrage.' },
      { t: 'Wetterbedingt flexibel', d: 'Bei Tour-Absage durch uns volle Erstattung oder Verschiebung.' },
    ],
  };
  return (
    <section className="py-10 surface border-y border-line">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-5">
        {items[variant].map((it, i) => (
          <div key={i} className="reveal">
            <p className="font-display text-xl">{it.t}</p>
            <p className="mt-1 text-sm text-muted leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceProcess({ variant }: { variant: TemplateVariant }) {
  const steps: Record<TemplateVariant, { t: string; d: string }[]> = {
    restaurant: [
      { t: 'Reservieren', d: 'Online oder per Telefon – wir bestätigen sofort.' },
      { t: 'Ankommen', d: 'Wir empfangen Sie persönlich und begleiten Sie an Ihren Tisch.' },
      { t: 'Genießen', d: 'Beratung von Sommelière und Service. Lassen Sie sich treiben.' },
      { t: 'Wiederkommen', d: 'Bei Bedarf reservieren wir gerne den nächsten Termin direkt.' },
    ],
    salon: [
      { t: 'Beratung', d: '15 Minuten ehrliches Gespräch über Ihre Wünsche und Ihren Alltag.' },
      { t: 'Termin', d: 'Wir planen den Termin so, dass die Behandlung in Ruhe Platz hat.' },
      { t: 'Behandlung', d: 'Schritt für Schritt – wir erklären Ihnen alles, was wir tun.' },
      { t: 'Pflege zuhause', d: 'Empfehlung der passenden Produkte – ohne Verkaufsdruck.' },
    ],
    tradesman: [
      { t: 'Anfrage', d: 'Sie schicken uns eine kurze Nachricht – wir antworten binnen 24 Stunden.' },
      { t: 'Termin vor Ort', d: 'Kostenlos, unverbindlich. Wir schauen uns alles in Ruhe an.' },
      { t: 'Festpreis-Angebot', d: 'Schriftlich, mit Material- und Förder-Aufstellung.' },
      { t: 'Ausführung', d: 'Sauber, pünktlich, mit Schutzmaßnahmen und Endreinigung.' },
    ],
    hotel: [
      { t: 'Anfrage', d: 'Reisedaten und Wünsche schicken – wir antworten persönlich.' },
      { t: 'Bestätigung', d: 'Fixe Reservierung mit allen Optionen Ihres Aufenthalts.' },
      { t: 'Ankunft', d: 'Check-in ab 15:00 mit Begrüßungstee und kurzer Hausführung.' },
      { t: 'Aufenthalt', d: 'Spa, Restaurant, Wandertipps – Sie müssen sich um nichts kümmern.' },
    ],
    tourism: [
      { t: 'Tour wählen', d: 'Termine, Level und Sprache über unsere Übersicht oder persönlich.' },
      { t: 'Briefing', d: 'Vorab-Info zu Ausrüstung, Treffpunkt und Gruppenzusammensetzung.' },
      { t: 'Tour', d: 'Mit lizenziertem Guide unterwegs – entspannt, sicher, mit Geschichten.' },
      { t: 'Erinnerung', d: 'Fotos und Tour-Rückblick per Mail im Nachgang.' },
    ],
  };
  return (
    <Section eyebrow="So läuft es ab" title={<>In <em className="italic-pop">vier Schritten.</em></>}>
      <ol className="grid md:grid-cols-4 gap-0 md:gap-0 reveal-stagger">
        {steps[variant].map((s, i) => (
          <li key={i} className="relative md:border-l border-t md:border-t-0 border-line p-6 md:p-7">
            <span className="absolute -left-1.5 -top-1.5 md:left-[-7px] md:top-7 h-3 w-3 rounded-full bg-brand" style={{ boxShadow: '0 0 0 6px var(--bg-color)' }} />
            <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
            <h3 className="font-display text-2xl mt-3">{s.t}</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">{s.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ─── Gallery / Referenzen ───────────────────────────────────────── */
function GalleryPage({
  content, variant, title, eyebrow, style,
}: { content: SiteContent; variant: TemplateVariant; title?: string; eyebrow?: string; style: TemplateStyle }) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow ?? (variant === 'tradesman' ? 'Projekte' : 'Galerie')}
        title={title ?? (variant === 'tradesman' ? 'Referenzen aus der Werkstatt.' : variant === 'salon' ? 'Looks & Momente.' : 'Bilder & Eindrücke.')}
        subtitle={
          variant === 'restaurant'
            ? 'Eindrücke aus dem Lokal, von Tellern, Saucen und Familie. Aufgenommen in echtem Kerzenlicht.'
            : variant === 'salon'
              ? 'Looks unserer Kund:innen – mit Erlaubnis dokumentiert.'
              : 'Aktuelle Projekte aus den letzten Monaten – von kleiner Reparatur bis zur kompletten Sanierung.'
        }
        style={style}
      />

      <Section spacing="lg">
        {style === 'bold' ? (
          <MasonryGrid images={content.gallery} />
        ) : style === 'modern' ? (
          <ModernGalleryGrid images={content.gallery} />
        ) : (
          <GalleryShowcase variant={variant} images={content.gallery} mode="full" />
        )}
      </Section>

      <CtaBand variant={variant} />
    </>
  );
}

/* ─── About ──────────────────────────────────────────────────────── */
function AboutPage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  return (
    <>
      <PageHero
        eyebrow={style === 'bold' ? 'Wer wir sind' : 'Über uns'}
        title={content.about?.title || 'Unsere Geschichte.'}
        subtitle={style === 'modern' ? 'Wer wir sind, wie wir denken, was uns wichtig ist.' : undefined}
        style={style}
        image={style === 'modern' ? content.about?.imageUrl || content.gallery[0] : undefined}
      />

      {style !== 'modern' && (
        <Section spacing="lg">
          <div className={`grid lg:grid-cols-12 gap-10 items-start ${style === 'bold' ? '' : ''}`}>
            <div className="lg:col-span-5">
              <ParallaxImage
                src={content.about?.imageUrl || content.gallery[0]}
                alt={content.brand.name}
                className={`${style === 'bold' ? 'rounded-none' : 'rounded-3xl'} aspect-[4/5] reveal`}
              />
            </div>
            <div className="lg:col-span-7 lg:pl-4">
              <div className="reveal">
                {(content.about?.body || '').split('\n\n').map((p, i) => (
                  <p key={i} className={`leading-relaxed mb-6 ${style === 'bold' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl text-muted'}`}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {style === 'modern' && (
        <Section spacing="lg">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 lg:col-start-1 reveal">
              {(content.about?.body || '').split('\n\n').map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted mb-5">{p}</p>
              ))}
            </div>
            <aside className="lg:col-span-4 lg:col-start-9 reveal">
              <div className="sticky top-28 rounded-2xl border border-line p-6 bg-white">
                <p className="eyebrow mb-4">Auf einen Blick</p>
                <dl className="space-y-3 text-sm">
                  {resolveHeroMeta(variant, content).map((m, i) => (
                    <div key={i} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0">
                      <dt className="text-muted">{m.label}</dt>
                      <dd className="font-display">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Section>
      )}

      <ValuesSection variant={variant} />

      <Timeline content={content} />

      <TeamSection variant={variant} />

      <NumbersBand variant={variant} content={content} />

      {variant === 'tradesman' && <CertificationsSection />}
      {variant === 'restaurant' && <PressSection />}

      {content.testimonials.length > 0 && (
        <Section eyebrow={effectiveBranchText(variant, content).testimonialsEyebrow} title={splitTitle(effectiveBranchText(variant, content).testimonialsTitle)} className="surface">
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

function ValuesSection({ variant }: { variant: TemplateVariant }) {
  const values: Record<TemplateVariant, { t: string; d: string }[]> = {
    restaurant: [
      { t: 'Saisonal & ehrlich.', d: 'Wir kaufen, was gerade Saison hat. Lieber weniger Karte, dafür perfekt – als Nudeln aus der Tüte das ganze Jahr.' },
      { t: 'Familie kocht.', d: 'In unserer Küche steht Familie. Drei Generationen geben weiter, was sie gelernt haben – und wir verändern es behutsam.' },
      { t: 'Zeit für Gäste.', d: 'Wir reservieren bewusst weniger Tische, als wir könnten. Damit Sie in Ruhe essen, reden und nochmal nachbestellen können.' },
    ],
    salon: [
      { t: 'Beratung vor Schere.', d: 'Wir nehmen uns Zeit für ein ehrliches Gespräch. Was passt zu Ihrem Alltag, zu Ihrem Haar, zu Ihnen.' },
      { t: 'Pflege ist Handwerk.', d: 'Wir arbeiten mit Marken, hinter denen wir stehen. Kein Verkaufsdruck – nur ehrliche Empfehlungen für zuhause.' },
      { t: 'Wohlfühlen zählt.', d: 'Tee, gute Musik, eine Couch zum Warten. Ein Salon-Besuch soll sich nach Pause anfühlen, nicht nach Wartesaal.' },
    ],
    tradesman: [
      { t: 'Festpreis, keine Tricks.', d: 'Sie wissen vor Auftrag, was es kostet. Schriftlich, mit allem dabei. Keine bösen Überraschungen am Monatsende.' },
      { t: 'Pünktlich heißt pünktlich.', d: 'Wir kommen, wenn wir uns angekündigt haben. Wenn etwas dazwischen kommt, hören Sie davon – nicht von uns sondern vorher.' },
      { t: 'Sauber arbeiten.', d: 'Schutzfolien, Staubschutz, Endreinigung. Sie merken nicht erst nach dem Großputz, dass wir dawaren.' },
    ],
    hotel: [
      { t: 'Familie statt Konzern.', d: 'Drei Generationen Gastgeben – entschieden wird am Familientisch, nicht im Vorstand.' },
      { t: 'Zeit zum Ankommen.', d: 'Ruhe ist kein Bonus, sondern unser Versprechen. Keine Beschallung im Spa, keine Hektik im Restaurant.' },
      { t: 'Aus der Region.', d: 'Wir kennen unsere Lieferanten beim Vornamen – vom Bäcker bis zur Imkerei nebenan.' },
    ],
    tourism: [
      { t: 'Klein und ehrlich.', d: 'Maximal 12 Gäste pro Guide. So bleibt Zeit für Geschichten, Pausen und echte Gespräche.' },
      { t: 'Sicher unterwegs.', d: 'Alle Guides lizenziert, jede Tour mit klarem Plan B. Wir sagen ehrlich, wenn das Wetter nicht mitspielt.' },
      { t: 'Lokal verwurzelt.', d: 'Wir leben hier. Sie bekommen die Tour, die wir Freund:innen empfehlen würden.' },
    ],
  };
  return (
    <Section eyebrow="Was uns wichtig ist" title={<>Drei <em className="italic-pop">Grundsätze.</em></>} className="surface">
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {values[variant].map((v, i) => (
          <article key={i} className="bg-white border border-line rounded-3xl p-8 hover-lift">
            <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
            <h3 className="font-display text-2xl mt-4">{v.t}</h3>
            <p className="mt-4 text-muted leading-relaxed">{v.d}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function TeamSection({ variant }: { variant: TemplateVariant }) {
  const team: Record<TemplateVariant, { n: string; r: string; img: string; bio: string }[]> = {
    restaurant: [
      { n: 'Giulia Conti', r: 'Küchenchefin & Inhaberin', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', bio: 'Lernte bei den Großeltern, kochte in Bologna und Wien, kam 2018 zurück in den Familienbetrieb.' },
      { n: 'Marco Riva', r: 'Pizzaiolo', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80', bio: 'Steht seit zwölf Jahren am Steinofen. Zaubert die Margherita DOP, auf die wir stolz sind.' },
      { n: 'Sofia Bianchi', r: 'Sommelière', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80', bio: 'Berät Sie zu unseren Naturweinen und kennt jeden unserer Winzer persönlich.' },
    ],
    salon: [
      { n: 'Marie Hofer', r: 'Salon Lead · Stylistin', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80', bio: 'Gründete Studio Lumière 2017. Ausbildung in Paris, mit Schwerpunkt auf Schnitt und Balayage.' },
      { n: 'Anna Becker', r: 'Color-Spezialistin', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80', bio: 'Kérastase Educator und Spezialistin für Air-Touch & Highlights nach französischer Schule.' },
      { n: 'Lina Voss', r: 'Skin & Make-up', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80', bio: 'Kosmetikerin und Make-up-Artistin. Begleitet unsere Bridal-Termine vom Probestyling bis zur Trauung.' },
      { n: 'Tom Berger', r: 'Herrenschnitt', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80', bio: 'Spezialisiert auf klassische und moderne Herrenschnitte sowie traditionelle Bartpflege.' },
    ],
    tradesman: [
      { n: 'Stefan Mayer', r: 'Geschäftsführer · Meister', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80', bio: 'Übernahm den Familienbetrieb 2008. Spezialgebiet: Heizungsmodernisierung und Förderberatung.' },
      { n: 'Andreas Mayer', r: 'Bauleiter · Meister', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80', bio: 'Verantwortet Großprojekte von Badsanierung bis Mehrfamilienhaus. Über 200 Projekte begleitet.' },
      { n: 'Daniel Mayer', r: 'Notdienst & Service', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80', bio: 'Steht 24/7 für Notfälle bereit. Kennt jede Heizungsanlage in Ingolstadt – und wenn nicht, kennt er jemanden, der sie kennt.' },
    ],
    hotel: [
      { n: 'Anna Hofer', r: 'Gastgeberin · Inhaberin', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80', bio: 'Führt das Haus in dritter Generation – mit Liebe zum Detail und einem offenen Ohr für jeden Gast.' },
      { n: 'Markus Hofer', r: 'Küchenchef', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', bio: 'Kocht regional, saisonal und ehrlich. Bezieht 80 % der Zutaten aus dem Umkreis von 30 km.' },
      { n: 'Lena Brugger', r: 'Spa & Wellness', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80', bio: 'Zertifizierte Spa-Therapeutin, plant Wellness-Tage und berät persönlich zu allen Treatments.' },
    ],
    tourism: [
      { n: 'Lukas Steiner', r: 'Bergführer & Inhaber', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80', bio: 'Lizenzierter Bergführer seit 15 Jahren. Kennt jede Route zwischen Karwendel und Dolomiten.' },
      { n: 'Marie Holzer', r: 'Wein & Kultur', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80', bio: 'Sommelière mit Schwerpunkt Tirol & Südtirol. Führt unsere Wein- und Genusstouren.' },
      { n: 'Jakob Pichler', r: 'Foto & Outdoor', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80', bio: 'Outdoor-Fotograf und Wanderführer. Spezialist für Sonnenaufgangs- und Sterne-Touren.' },
    ],
  };
  return (
    <Section eyebrow="Team" title={<>Menschen <em className="italic-pop">hinter dem Betrieb.</em></>}>
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {team[variant].slice(0, 3).map((m, i) => (
          <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
            <div className="aspect-[4/5] img-zoom">
              <img src={m.img} alt={m.n} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-7">
              <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-display text-2xl mt-2">{m.n}</h3>
              <p className="text-sm text-muted mt-1">{m.r}</p>
              <p className="mt-5 text-sm leading-relaxed">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function CertificationsSection() {
  const items = [
    { t: 'Meisterbetrieb HWK', d: 'Eingetragen bei der Handwerkskammer für Mittelfranken seit 1972.' },
    { t: 'Innungsmitglied', d: 'Aktives Mitglied der Innung für Sanitär- und Heizungstechnik.' },
    { t: 'Zertifizierter Wärmepumpen-Installateur', d: 'Schulungen bei Viessmann, Vaillant und Daikin – jährlich aktualisiert.' },
    { t: 'KfW-Energieberater', d: 'Förderkalkulationen direkt vom Fachbetrieb. Kein Detour über externe Berater.' },
    { t: 'Förder-Partner BAFA', d: 'Anträge beim BAFA für Heizungsförderung schreiben wir mit Ihnen gemeinsam.' },
    { t: 'Photovoltaik-Fachpartner', d: 'Komplettpaket inkl. Anmeldung beim Netzbetreiber und Steuerformular.' },
  ];
  return (
    <Section eyebrow="Qualifikationen" title={<>Geprüft & <em className="italic-pop">zertifiziert.</em></>} className="surface">
      <div className="grid md:grid-cols-3 gap-4 reveal-stagger">
        {items.map((it, i) => (
          <article key={i} className="bg-white border border-line rounded-2xl p-6 hover-lift">
            <span className="inline-flex h-10 w-10 rounded-full bg-[var(--accent-color)] items-center justify-center text-brand">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="font-display text-xl mt-4">{it.t}</h3>
            <p className="text-sm text-muted mt-2 leading-relaxed">{it.d}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function PressSection() {
  const items = [
    { src: 'Falstaff', q: '„Eine der ehrlichsten Trattorien Tirols."', y: '2024' },
    { src: 'Tiroler Tageszeitung', q: '„Pasta wie in Bologna – nur näher."', y: '2023' },
    { src: 'À la Carte', q: '„Hier kocht jemand, der Italien wirklich kennt."', y: '2023' },
  ];
  return (
    <Section eyebrow="Presse" title={<>Was die <em className="italic-pop">Presse schreibt.</em></>}>
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {items.map((p, i) => (
          <article key={i} className="bg-white border border-line rounded-3xl p-8 hover-lift">
            <p className="font-mono text-xs text-muted uppercase tracking-widest">/ {p.src} · {p.y}</p>
            <p className="mt-6 font-display text-2xl leading-snug">{p.q}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ─── Contact ────────────────────────────────────────────────────── */
function ContactPage({ content, variant, style }: { content: SiteContent; variant: TemplateVariant; style: TemplateStyle }) {
  const arrival: Record<TemplateVariant, { t: string; d: string }[]> = {
    restaurant: [
      { t: 'Mit dem Auto', d: 'Tiefgarage Maria-Theresien direkt nebenan. Erste Stunde gratis bei Reservierung.' },
      { t: 'Mit der Bahn', d: '5 Minuten Fußweg vom Hauptbahnhof. Ein Spaziergang durch die Altstadt.' },
      { t: 'Barrierefrei', d: 'Hauptraum ebenerdig. Behindertengerechte Toilette vorhanden.' },
    ],
    salon: [
      { t: 'Anfahrt', d: 'U3/U6 Münchner Freiheit, dann 3 Minuten zu Fuß.' },
      { t: 'Parken', d: 'Tiefgarage Leopoldpark direkt vor der Tür. Erste Stunde frei für Kund:innen.' },
      { t: 'Termin verlegen', d: 'Bis 24 h vorher gerne kostenlos – am liebsten per WhatsApp.' },
    ],
    tradesman: [
      { t: 'Notdienst', d: 'Rund um die Uhr erreichbar – auch am Wochenende und an Feiertagen.' },
      { t: 'Anfahrtsgebiet', d: 'Ingolstadt und 30 km Umkreis. Größere Distanzen auf Anfrage.' },
      { t: 'Beratung vor Ort', d: 'Erstgespräch und Angebot kostenlos. Unverbindlich.' },
    ],
    hotel: [
      { t: 'Mit dem Auto', d: 'Hauseigene Tiefgarage, Ladestationen für E-Autos verfügbar.' },
      { t: 'Mit der Bahn', d: 'Shuttle ab Hauptbahnhof Innsbruck auf Voranmeldung.' },
      { t: 'Check-in', d: 'Ab 15:00 Uhr. Frühere Ankunft? Wir lagern Ihr Gepäck gerne.' },
    ],
    tourism: [
      { t: 'Treffpunkt', d: 'Innsbruck Hauptbahnhof oder hauseigenes Büro – Details mit der Buchungsbestätigung.' },
      { t: 'Transfer', d: 'Mehrtägige Touren ab Hotel oder Bahnhof. Auf Wunsch mit Kleinbus.' },
      { t: 'Beratung', d: 'Sie wissen nicht, welche Tour passt? Wir telefonieren gerne 15 Minuten unverbindlich.' },
    ],
  };
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          variant === 'restaurant'
            ? 'Reservieren oder einfach vorbeikommen.'
            : variant === 'salon'
              ? 'Termin vereinbaren oder kurz fragen.'
              : 'Anfrage senden oder Notdienst rufen.'
        }
        style={style}
      />
      <ContactBlock content={content} />

      <Section eyebrow="Wegbeschreibung" title={<>So <em className="italic-pop">finden Sie uns.</em></>} className="surface">
        <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
          {arrival[variant].map((a, i) => (
            <article key={i} className="bg-white border border-line rounded-3xl p-7 hover-lift">
              <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-display text-2xl mt-3">{a.t}</h3>
              <p className="mt-3 text-muted leading-relaxed">{a.d}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 reveal">
          <ContactMap content={content} />
        </div>
      </Section>
    </>
  );
}

function ContactMap({ content }: { content: SiteContent }) {
  const address = content.contact.address || '';
  const explicitEmbed = content.contact.mapsUrl || '';
  // Treat URL as a usable embed only if it contains the trusted Google Maps embed pattern
  const isUsableEmbed =
    /^https:\/\/(www\.)?google\.[^/]+\/maps\/embed/i.test(explicitEmbed) ||
    /[?&]output=embed/i.test(explicitEmbed);
  const embedSrc = isUsableEmbed
    ? explicitEmbed
    : `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const linkHref = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
  return (
    <div className="rounded-3xl overflow-hidden border border-line bg-slate-100 relative group">
      <iframe
        src={embedSrc}
        title={`Karte: ${address}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full aspect-[16/7] border-0"
        allow="fullscreen"
      />
      <a
        href={linkHref}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-white transition shadow-sm"
      >
        In Karte öffnen ↗
      </a>
    </div>
  );
}

function PageHero({ eyebrow, title, subtitle, style = 'classic', image }: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  style?: TemplateStyle;
  image?: string;
}) {
  if (style === 'bold') {
    return (
      <section className="pt-40 pb-16 grain relative overflow-hidden">
        <div className="container-x">
          <p className="eyebrow mb-6 reveal">{eyebrow}</p>
          <h1 className="reveal font-display tracking-tighter leading-[0.85] text-[14vw] md:text-[10vw] lg:text-[140px]">
            {title.toUpperCase()}
          </h1>
          {subtitle && <p className="mt-10 text-xl md:text-2xl max-w-3xl reveal leading-snug">{subtitle}</p>}
        </div>
      </section>
    );
  }
  if (style === 'modern') {
    return (
      <section className="pt-40 pb-20 surface border-b border-line">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-end">
          <div className={image ? 'lg:col-span-7 reveal' : 'lg:col-span-12 reveal'}>
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.05]">
              {splitTitle(title)}
            </h1>
            {subtitle && <p className="mt-8 text-lg text-muted max-w-2xl">{subtitle}</p>}
          </div>
          {image && (
            <div className="lg:col-span-5 reveal">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-[var(--accent-color)] opacity-20 blur-2xl" aria-hidden />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line shadow-xl">
                  <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
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

function teaserSubtitleFor(v: TemplateVariant, content?: SiteContent) {
  const override = (content as any)?.branchText?.teaserSubtitle as string | undefined;
  if (override && override.trim()) return override;
  return branchTextDefaults(v).teaserSubtitle;
}

/** Returns a merged branch-text record (per-tenant overrides + branch defaults). */
function effectiveBranchText(v: TemplateVariant, content?: SiteContent) {
  const overrides = ((content as any)?.branchText ?? {}) as Record<string, any>;
  const def = branchTextDefaults(v);
  return { ...def, ...Object.fromEntries(Object.entries(overrides).filter(([, val]) => {
    if (Array.isArray(val)) return val.length > 0;
    return typeof val === 'string' ? val.trim().length > 0 : val != null;
  })) } as ReturnType<typeof branchTextDefaults>;
}

function subtitleFor(v: TemplateVariant, content: SiteContent): string {
  return (content.hero?.subtitle && content.hero.subtitle.trim()) || teaserSubtitleFor(v, content);
}

function heroBodyFor(v: TemplateVariant, content: SiteContent): string {
  const body = (content.hero as any)?.body as string | undefined;
  if (body && body.trim()) return body;
  return teaserSubtitleFor(v, content);
}

function marqueeWordsFor(v: TemplateVariant, content?: SiteContent): string[] {
  const override = (content as any)?.branchText?.marqueeWords as string[] | undefined;
  if (override && override.filter(Boolean).length > 0) return override.filter(Boolean);
  return branchTextDefaults(v).marqueeWords;
}

function galleryTeaserTitle(v: TemplateVariant, content?: SiteContent): React.ReactNode {
  const override = (content as any)?.branchText?.galleryTeaserTitle as string | undefined;
  const raw = (override && override.trim()) || branchTextDefaults(v).galleryTeaserTitle;
  return splitTitle(raw);
}

/* ─── Branch-specific service layouts ─────────────────────────────── */
function ServicesShowcase({
  variant, services, compact = false,
}: {
  variant: TemplateVariant;
  services: SiteContent['services'];
  compact?: boolean;
}) {
  if (variant === 'restaurant') return <RestaurantMenu services={services} compact={compact} />;
  if (variant === 'salon') return <SalonPriceList services={services} compact={compact} />;
  if (variant === 'hotel') return <HotelRoomCards services={services} compact={compact} />;
  if (variant === 'tourism') return <TourismTourCards services={services} compact={compact} />;
  return <TradesmanServiceTiles services={services} compact={compact} />;
}

function RestaurantMenu({ services, compact }: { services: SiteContent['services']; compact?: boolean }) {
  // Editorial menu card: 2 columns of items with dotted leaders – no images on items
  const items = compact ? services.slice(0, 6) : services;
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  const Col = ({ list }: { list: SiteContent['services'] }) => (
    <ul className="space-y-7">
      {list.map((s, i) => (
        <li key={i} className="reveal">
          <div className="flex items-baseline gap-3">
            <h3 className="font-display text-2xl md:text-3xl">{s.title}</h3>
            <span className="flex-1 h-px border-b border-dotted border-current opacity-30 mb-2" aria-hidden />
            {s.price && <span className="font-mono text-base whitespace-nowrap">{s.price}</span>}
          </div>
          {s.description && <p className="mt-2 text-sm md:text-base text-muted italic leading-relaxed max-w-prose">{s.description}</p>}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
      <Col list={left} />
      <Col list={right} />
    </div>
  );
}

function SalonPriceList({ services, compact }: { services: SiteContent['services']; compact?: boolean }) {
  // Elegant price list: single column rows with hover, divider lines, no card boxes
  const items = compact ? services.slice(0, 5) : services;
  return (
    <div className="max-w-3xl mx-auto reveal-stagger">
      <ul className="divide-y divide-line">
        {items.map((s, i) => (
          <li key={i} className="py-7 grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 items-baseline group">
            <h3 className="font-display text-2xl md:text-3xl group-hover:text-[var(--accent-color)] transition-colors">
              {s.title}
            </h3>
            {s.price && <span className="font-mono text-base text-muted whitespace-nowrap">{s.price}</span>}
            {s.description && (
              <p className="col-span-2 text-sm md:text-base text-muted leading-relaxed max-w-2xl">{s.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TradesmanServiceTiles({ services, compact }: { services: SiteContent['services']; compact?: boolean }) {
  // Numbered tile grid – technical, blocky
  const items = compact ? services.slice(0, 3) : services;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden reveal-stagger">
      {items.map((s, i) => (
        <article key={i} className="bg-white p-7 md:p-8 flex flex-col gap-3 group hover:bg-[#fafaf7] transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            {s.price && <span className="font-mono text-xs uppercase tracking-widest text-brand">{s.price}</span>}
          </div>
          <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
          {s.description && <p className="text-sm text-muted leading-relaxed">{s.description}</p>}
          <div className="mt-auto pt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-muted group-hover:text-brand transition-colors">
            <span>Anfrage stellen</span>
            <span aria-hidden>→</span>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ─── Branch-specific gallery layouts ─────────────────────────────── */
function GalleryShowcase({
  variant, images, mode,
}: {
  variant: TemplateVariant;
  images: string[];
  mode: 'teaser' | 'full';
}) {
  if (images.length === 0) return null;
  if (variant === 'restaurant') return <RestaurantGallery images={images} mode={mode} />;
  if (variant === 'salon') return <SalonGallery images={images} mode={mode} />;
  if (variant === 'hotel') return <HotelGallery images={images} mode={mode} />;
  if (variant === 'tourism') return <TourismGallery images={images} mode={mode} />;
  return <TradesmanGallery images={images} mode={mode} />;
}

function RestaurantGallery({ images, mode }: { images: string[]; mode: 'teaser' | 'full' }) {
  // Editorial: alternating big landscape with caption + 3-up thumbnail strips
  const captions = ['Cucina', 'Sala', 'Pasta', 'Vino', 'Famiglia', 'Tartufo', 'Piazza', 'Dolce', 'Forno'];
  const used = mode === 'teaser' ? images.slice(0, 7) : images;
  // Build pairs: [hero, thumb, thumb, thumb, hero, thumb, ...]
  const blocks: { hero: string; thumbs: string[]; caption: string }[] = [];
  for (let i = 0; i < used.length; i += 4) {
    const hero = used[i];
    const thumbs = used.slice(i + 1, i + 4);
    if (hero) blocks.push({ hero, thumbs, caption: captions[blocks.length % captions.length] });
  }
  return (
    <div className="space-y-12 reveal-stagger">
      {blocks.map((b, i) => (
        <div key={i} className={`grid md:grid-cols-12 gap-4 md:gap-6 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
          <figure className="md:col-span-8 md:[direction:ltr]">
            <div className="aspect-[16/10] overflow-hidden rounded-3xl img-zoom">
              <img src={b.hero} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              ※ {b.caption} · {String(i + 1).padStart(2, '0')}
            </figcaption>
          </figure>
          {b.thumbs.length > 0 && (
            <div className="md:col-span-4 md:[direction:ltr] grid grid-cols-3 md:grid-cols-1 gap-3">
              {b.thumbs.map((src, j) => (
                <div key={j} className="aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-2xl img-zoom">
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SalonGallery({ images, mode }: { images: string[]; mode: 'teaser' | 'full' }) {
  // Soft three-column grid with varied aspect ratios, hover label "Look · 01"
  const used = mode === 'teaser' ? images.slice(0, 6) : images;
  // alternating aspect ratios for visual rhythm
  const aspects = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[1/1]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[1/1]'];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 reveal-stagger">
      {used.map((src, i) => (
        <figure key={i} className={`relative group overflow-hidden rounded-3xl ${aspects[i % aspects.length]}`}>
          <img src={src} alt="" className="w-full h-full object-cover img-zoom" loading="lazy" />
          <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Look · {String(i + 1).padStart(2, '0')}</span>
            <span aria-hidden>↗</span>
          </figcaption>
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </figure>
      ))}
    </div>
  );
}

function TradesmanGallery({ images, mode }: { images: string[]; mode: 'teaser' | 'full' }) {
  // Project-style cards with category labels, year, location
  const projects = [
    { cat: 'Bad', loc: 'Ingolstadt-Mitte', year: '2025' },
    { cat: 'Heizung', loc: 'Manching', year: '2025' },
    { cat: 'Sanierung', loc: 'Eichstätt', year: '2024' },
    { cat: 'Wärmepumpe', loc: 'Pfaffenhofen', year: '2024' },
    { cat: 'Bad', loc: 'Neuburg', year: '2024' },
    { cat: 'Heizung', loc: 'Schrobenhausen', year: '2024' },
    { cat: 'Sanitär', loc: 'Beilngries', year: '2024' },
    { cat: 'Photovoltaik', loc: 'Kösching', year: '2023' },
    { cat: 'Bad', loc: 'Ingolstadt-Süd', year: '2023' },
  ];
  const used = mode === 'teaser' ? images.slice(0, 6) : images;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
      {used.map((src, i) => {
        const p = projects[i % projects.length];
        return (
          <article key={i} className="group bg-white border border-line rounded-2xl overflow-hidden hover-lift">
            <div className="aspect-[4/3] overflow-hidden img-zoom">
              <img src={src} alt={`${p.cat} – ${p.loc}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-widest">
                <span className="font-mono text-brand bg-[var(--accent-color)] px-2 py-1 rounded">{p.cat}</span>
                <span className="font-mono text-muted">{p.year}</span>
              </div>
              <p className="mt-3 font-display text-xl">{p.loc}</p>
              <p className="text-sm text-muted mt-1">Projekt #{String(i + 1).padStart(3, '0')}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}



/* --- Hotel-specific service & gallery layouts ------------------------ */
function HotelRoomCards({ services, compact }: { services: SiteContent['services']; compact?: boolean }) {
  // Hotel rooms: large hero photo, rate badge top-right, perk-tags
  const items = compact ? services.slice(0, 3) : services;
  return (
    <div className="grid md:grid-cols-2 gap-6 reveal-stagger">
      {items.map((s, i) => (
        <article key={i} className="group bg-white border border-line rounded-3xl overflow-hidden hover-lift flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden">
            {s.imageUrl ? (
              <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover img-zoom" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--surface-color,#fce7ef)] to-[var(--accent-color,#F24171)]/30" />
            )}
            {s.price && (
              <span className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest shadow">
                ab {s.price}
              </span>
            )}
            <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/95 bg-black/30 backdrop-blur px-2.5 py-1 rounded">
              Zimmer {String(i + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="p-7 flex flex-col gap-4 flex-1">
            <h3 className="font-display text-3xl">{s.title}</h3>
            {s.description && <p className="text-sm text-muted leading-relaxed">{s.description}</p>}
            <div className="mt-auto pt-4 border-t border-line flex items-center justify-between text-xs uppercase tracking-widest text-muted">
              <span className="font-mono">Bergblick · Eigenes Bad · WLAN</span>
              <span className="text-brand">Verfügbarkeit →</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function TourismTourCards({ services, compact }: { services: SiteContent['services']; compact?: boolean }) {
  // Tour cards: vertical photo, route ribbon, duration / difficulty / group meta
  const items = compact ? services.slice(0, 3) : services;
  const meta = [
    { d: '4 Std', diff: 'Mittel', size: '6–10 Personen' },
    { d: 'Halbtag', diff: 'Leicht', size: '4–8 Personen' },
    { d: 'Ganztag', diff: 'Anspruchsvoll', size: '6 Personen' },
    { d: '2 Std', diff: 'Leicht', size: '8–12 Personen' },
    { d: '6 Std', diff: 'Mittel', size: '4–6 Personen' },
    { d: 'Tag', diff: 'Mittel', size: 'max. 8' },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
      {items.map((s, i) => {
        const m = meta[i % meta.length];
        return (
          <article key={i} className="group bg-white border border-line rounded-2xl overflow-hidden hover-lift">
            <div className="relative aspect-[3/4] overflow-hidden">
              {s.imageUrl ? (
                <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover img-zoom" loading="lazy" />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-sky-300/40 via-emerald-200/30 to-stone-100" />
              )}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] opacity-80">Tour · {String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-2xl mt-1 leading-tight">{s.title}</h3>
              </div>
            </div>
            <div className="p-5">
              {s.description && <p className="text-sm text-muted leading-relaxed line-clamp-3">{s.description}</p>}
              <dl className="mt-4 grid grid-cols-3 gap-2 text-[11px] uppercase tracking-widest font-mono">
                <div className="border border-line rounded-lg p-2 text-center"><dt className="text-muted text-[9px]">Dauer</dt><dd>{m.d}</dd></div>
                <div className="border border-line rounded-lg p-2 text-center"><dt className="text-muted text-[9px]">Stufe</dt><dd>{m.diff}</dd></div>
                <div className="border border-line rounded-lg p-2 text-center"><dt className="text-muted text-[9px]">Gruppe</dt><dd className="text-[9px]">{m.size}</dd></div>
              </dl>
              {s.price && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-base text-brand">{s.price}</span>
                  <span className="text-xs uppercase tracking-widest text-muted">Buchen →</span>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function HotelGallery({ images, mode }: { images: string[]; mode: 'teaser' | 'full' }) {
  // Editorial vertical-emphasis stagger with floor labels
  const used = mode === 'teaser' ? images.slice(0, 6) : images;
  const labels = ['Zimmer', 'Spa', 'Frühstück', 'Lobby', 'Suite', 'Garten', 'Bibliothek', 'Terrasse'];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 reveal-stagger">
      {used.map((src, i) => {
        const tall = i % 5 === 0 || i % 5 === 3;
        const cls = 'relative group overflow-hidden rounded-3xl ' + (tall ? 'row-span-2 aspect-[3/5]' : 'aspect-[4/5]');
        return (
          <figure key={i} className={cls}>
            <img src={src} alt={labels[i % labels.length]} className="w-full h-full object-cover img-zoom" loading="lazy" />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white text-xs uppercase tracking-[0.2em]">
              <span className="font-mono opacity-90 bg-black/30 backdrop-blur px-2.5 py-1 rounded">{labels[i % labels.length]}</span>
              <span aria-hidden className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </figcaption>
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </figure>
        );
      })}
    </div>
  );
}

function TourismGallery({ images, mode }: { images: string[]; mode: 'teaser' | 'full' }) {
  // Full-bleed landscape stack with location coordinates
  const used = mode === 'teaser' ? images.slice(0, 5) : images;
  const places = [
    { name: 'Karwendel', coord: '47°22′N · 11°27′E' },
    { name: 'Stubaier Alpen', coord: '47°08′N · 11°20′E' },
    { name: 'Achensee', coord: '47°27′N · 11°43′E' },
    { name: 'Zillertal', coord: '47°10′N · 11°52′E' },
    { name: 'Ötztal', coord: '46°59′N · 11°02′E' },
    { name: 'Wipptal', coord: '47°02′N · 11°31′E' },
  ];
  return (
    <div className="space-y-6 md:space-y-10 reveal-stagger">
      {used.map((src, i) => {
        const p = places[i % places.length];
        const flip = i % 2 === 1;
        const wrapCls = 'grid md:grid-cols-12 gap-5 items-center ' + (flip ? 'md:[&>figure]:col-start-6' : '');
        const textCls = 'md:col-span-5 ' + (flip ? 'md:col-start-1 md:row-start-1' : '');
        return (
          <article key={i} className={wrapCls}>
            <figure className="md:col-span-7 relative overflow-hidden rounded-3xl aspect-[16/9]">
              <img src={src} alt={p.name} className="w-full h-full object-cover img-zoom" loading="lazy" />
            </figure>
            <div className={textCls}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{String(i + 1).padStart(2, '0')} · {p.coord}</p>
              <h3 className="font-display text-3xl md:text-4xl mt-2"><em className="italic-pop">{p.name}</em></h3>
              <p className="mt-3 text-sm text-muted leading-relaxed max-w-md">Eindrücke aus dem Gelände, gewachsen aus echten Touren.</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
