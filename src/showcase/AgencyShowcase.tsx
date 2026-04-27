import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { DEMO_CONTENT } from '@/lib/demo-content';
import { PRESETS, applyTheme, type ThemePreset } from '@/lib/theme';
import type { TemplateKey } from '@/lib/types';
import AdminDemo from './AdminDemo';
import RestaurantTemplate from '@/templates/restaurant';
import SalonTemplate from '@/templates/salon';
import TradesmanTemplate from '@/templates/tradesman';
import {
  Marquee, AnimatedCounter, RotatingWord, ScrollProgress, Accordion, SplitText, useReveal,
} from '@/components/fx';

/* ─── Brand ─────────────────────────────────────────────────────────── */
const AGENCY = {
  name: 'BTH Studio',
  tagline: 'Studio für lokale Marken · Innsbruck · DACH',
  email: 'hello@bth-studio.com',
  phone: '+43 660 0000 000',
};

const ROTATING_WORDS = ['Restaurants.', 'Salons.', 'Handwerker:innen.', 'Hotels.', 'Boutiquen.'];

/* ─── Template metadata ────────────────────────────────────────────── */
const TEMPLATE_META: Record<TemplateKey, {
  label: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  bullets: string[];
}> = {
  restaurant: {
    label: 'Restaurant',
    tagline: 'Gastronomie · Cafés · Hotels',
    description: 'Speisekarte, Reservierungen, Foodie-Galerie und Story-Telling, das Hunger macht.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    accent: '#9a3412',
    bullets: ['Mehrseitige Speisekarte', 'Online-Reservierungs-Anbindung', 'Foto-Galerie & Stimmungs-Mood', 'Mehrsprachig auf Wunsch'],
  },
  salon: {
    label: 'Salon & Beauty',
    tagline: 'Friseur · Spa · Kosmetik',
    description: 'Editorial-Stil, Online-Booking-Anbindung und eine Galerie, die Looks verkauft.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80',
    accent: '#be185d',
    bullets: ['Treatment-Liste mit Preisen', 'Booking-Tool-Integration', 'Look-Galerie mit Lightbox', 'Team-Vorstellung mit Bios'],
  },
  tradesman: {
    label: 'Handwerk',
    tagline: 'Installateur · Bau · Service',
    description: 'Lead-Generierung, Notdienst-Banner, Referenzen und Vertrauen auf den ersten Blick.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1400&q=80',
    accent: '#1d4ed8',
    bullets: ['Notdienst-Sticky-Banner', 'Anfrage-Formular mit Versand', 'Referenz-Galerie', 'Förder-Kalkulator-Modul'],
  },
};

/* ─── Showcase root ────────────────────────────────────────────────── */
export default function AgencyShowcase() {
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color', '#0b0b10');
    document.documentElement.style.setProperty('--accent-color', '#c4ff3a');
    document.documentElement.style.setProperty('--accent-color-2', '#ff5b3a');
    document.documentElement.style.setProperty('--surface-color', '#f4f3ee');
    document.documentElement.style.setProperty('--bg-color', '#fafaf7');
    document.documentElement.style.setProperty('--text-color', '#0b0b10');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ShowcaseShell />}>
        <Route index element={<Landing />} />
        <Route path="templates" element={<TemplatesGallery />} />
        <Route path="prozess" element={<ProcessPage />} />
        <Route path="preise" element={<Pricing />} />
        <Route path="ueber-uns" element={<AboutPage />} />
        <Route path="kontakt" element={<Contact />} />
      </Route>
      <Route path="/preview/:key/*" element={<TemplatePreview />} />
      <Route path="/preview/:key/style/:style/*" element={<TemplatePreview />} />
      <Route path="/admin-demo" element={<AdminDemo />} />
    </Routes>
  );
}

/* ─── Shell with header / footer ───────────────────────────────────── */
function ShowcaseShell() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useReveal();

  const NAV = [
    { to: '/templates', label: 'Templates' },
    { to: '/prozess', label: 'Ablauf' },
    { to: '/preise', label: 'Preise' },
    { to: '/ueber-uns', label: 'Über uns' },
    { to: '/admin-demo', label: 'Admin-Demo' },
    { to: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />

      {/* Top marquee */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-brand text-white text-xs uppercase tracking-[0.18em] py-2.5">
        <Marquee speed="slow">
          {[
            'Aktuell freie Kapazitäten · Mai/Juni 2026',
            'Komplettpaket inkl. Foto- & Videoshooting',
            'In rund einer Woche live',
            'Innsbruck · München · Ingolstadt · DACH',
            'Hosting & Wartung inklusive',
          ].concat([
            'Aktuell freie Kapazitäten · Mai/Juni 2026',
            'Komplettpaket inkl. Foto- & Videoshooting',
            'In rund einer Woche live',
            'Innsbruck · München · Ingolstadt · DACH',
            'Hosting & Wartung inklusive',
          ]).map((m, i) => (
            <span key={i} className="whitespace-nowrap inline-flex items-center gap-3">
              <span className="opacity-80">{m}</span>
              <span aria-hidden className="opacity-40">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <header
        className={`fixed top-[36px] left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border-b border-line'
            : 'bg-transparent'
        }`}
      >
        <div className="container-x flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <span
              className="h-9 w-9 rounded-full transition-transform duration-700 group-hover:rotate-180"
              style={{ background: 'conic-gradient(from 90deg, var(--accent-color), var(--accent-color-2), var(--brand-color), var(--accent-color))' }}
            />
            <span className={`font-display text-2xl ${scrolled ? 'text-brand' : 'text-white'}`}>
              {AGENCY.name}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `link-underline px-4 py-2 text-sm font-medium transition-colors ${
                    scrolled ? 'text-slate-700 hover:text-slate-900' : 'text-white/85 hover:text-white'
                  } ${isActive ? 'is-active' : ''}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/kontakt" className="ml-4 btn-accent !py-2.5 !px-5 text-sm">
              Beratung <span aria-hidden>→</span>
            </Link>
          </nav>
          <button
            onClick={() => setMobile(true)}
            className={`md:hidden p-2 rounded-full border ${scrolled ? 'text-slate-800 border-line' : 'text-white border-white/30'}`}
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
            <span className="font-display text-2xl text-brand">{AGENCY.name}</span>
            <button onClick={() => setMobile(false)} className="p-2" aria-label="Schließen">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="container-x flex flex-col gap-1 mt-8">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobile(false)}
                className="py-5 text-5xl font-display border-b border-line transition-transform hover:translate-x-2 text-slate-800"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/kontakt" onClick={() => setMobile(false)} className="btn-accent mt-10 self-start">
              Beratung anfragen <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <ShowcaseFooter />
    </div>
  );
}

function ShowcaseFooter() {
  return (
    <footer className="bg-brand text-white pt-24 pb-10 mt-auto relative overflow-hidden grain">
      <div className="blob -top-40 -left-40 w-[500px] h-[500px]" style={{ background: 'var(--accent-color)', opacity: 0.18 }} />

      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-10 pt-4 pb-14 border-b border-white/10">
          <div className="md:col-span-5">
            <p className="font-display text-3xl">{AGENCY.name}</p>
            <p className="text-sm text-white/70 mt-2 max-w-sm">{AGENCY.tagline}</p>
            <div className="mt-6 flex flex-col gap-1.5 text-sm">
              <a href={`mailto:${AGENCY.email}`} className="hover:text-accent">{AGENCY.email}</a>
              <a href={`tel:${AGENCY.phone}`} className="hover:text-accent">{AGENCY.phone}</a>
              <span className="text-white/60">Innsbruck · München · Ingolstadt</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 py-14 text-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Studio</p>
            <ul className="space-y-2">
              <li><Link to="/templates" className="hover:text-accent">Templates</Link></li>
              <li><Link to="/prozess" className="hover:text-accent">Ablauf</Link></li>
              <li><Link to="/preise" className="hover:text-accent">Preise</Link></li>
              <li><Link to="/ueber-uns" className="hover:text-accent">Über uns</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Templates</p>
            <ul className="space-y-2">
              <li><Link to="/preview/restaurant" className="hover:text-accent">Restaurant</Link></li>
              <li><Link to="/preview/salon" className="hover:text-accent">Salon &amp; Beauty</Link></li>
              <li><Link to="/preview/tradesman" className="hover:text-accent">Handwerk</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Region</p>
            <ul className="space-y-2 text-white/70">
              <li>Innsbruck</li>
              <li>München</li>
              <li>Ingolstadt</li>
              <li>DACH-weit auf Anfrage</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Rechtliches</p>
            <ul className="space-y-2">
              <li><Link to="/impressum" className="hover:text-accent">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-accent">Datenschutz</Link></li>
            </ul>
          </div>
        </div>

        <Marquee speed="slow" className="py-2">
          <span
            className="font-display leading-none whitespace-nowrap"
            style={{ fontSize: 'clamp(4rem,12vw,12rem)', color: 'rgba(255,255,255,0.08)' }}
          >
            BTH Studio · BTH Studio · BTH Studio ·
          </span>
        </Marquee>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-col md:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} {AGENCY.name}. Alle Rechte vorbehalten.</span>
          <span className="font-mono">Made with care · Innsbruck</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Landing ─────────────────────────────────────────────────────── */
function Landing() {
  return (
    <>
      <HeroSection />
      <ClientLogosSection />
      <ServicesSection />
      <TemplatesPreviewSection />
      <ManifestoSection />
      <AdminPreviewSection />
      <ProcessTimelineSection />
      <ProductionSection />
      <NumbersSection />
      <TestimonialsSection />
      <CalloutFooter />
    </>
  );
}

function HeroSection() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <section
      className="relative min-h-[100vh] flex items-end overflow-hidden text-white grain"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 -z-10 bg-brand" />
      <div
        className="absolute inset-0 -z-[2]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(196,255,58,0.20), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,91,58,0.18), transparent 55%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background: `radial-gradient(700px circle at ${pos.x}% ${pos.y}%, rgba(196,255,58,0.18), transparent 60%)`,
        }}
      />
      <div className="blob top-1/3 -left-40 w-[480px] h-[480px]" style={{ background: '#c4ff3a' }} />
      <div className="blob bottom-0 right-0 w-[420px] h-[420px]" style={{ background: '#ff5b3a' }} />

      <div className="container-x relative z-10 pt-44 pb-24 md:pb-32">
        <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/80 mb-8">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-color)] animate-pulse" />
          {AGENCY.tagline}
        </p>

        <h1 className="headline-xl max-w-6xl">
          <SplitText>{`Websites für`}</SplitText><br />
          <em className="italic-pop" style={{ color: 'var(--accent-color)' }}>
            <RotatingWord words={ROTATING_WORDS} />
          </em>
        </h1>

        <div className="grid md:grid-cols-12 gap-8 mt-14">
          <p className="md:col-span-7 text-lg md:text-2xl text-white/85 leading-relaxed reveal-fast is-visible">
            Wir gestalten und betreuen Websites für inhabergeführte Betriebe in der DACH-Region.
            Editorial-Design, das mit dem Tempo Ihrer Marke gehen kann. Inhalte, die Sie selbst pflegen.
            Foto und Video von unserem eigenen Team.
          </p>
          <div className="md:col-span-5 md:pl-8 md:border-l border-white/15 self-end reveal-fast is-visible">
            <p className="font-mono text-xs text-white/60 uppercase tracking-widest mb-4">/ verfügbar Q2/2026</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/templates" className="btn-accent">Templates ansehen <span aria-hidden>→</span></Link>
              <Link to="/preise" className="btn-outline !border-white/60 !text-white hover:!bg-white hover:!text-slate-900">
                Preise &amp; Pakete
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#mehr"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/90 hover:text-white flex flex-col items-center gap-2"
        aria-label="Weiter scrollen"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-80">Scroll</span>
        <span className="block h-10 w-[1px] bg-white/40 relative overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-1/3 bg-white" style={{ animation: 'scrollLine 1.6s ease-in-out infinite' }} />
        </span>
      </a>
      <style>{`@keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }`}</style>
    </section>
  );
}

function ClientLogosSection() {
  const ITEMS = [
    'Trattoria Innsbruck', 'Studio Lumière', 'Mayer & Söhne', 'Café Bergblick',
    'Hofgarten Hotel', 'Atelier Linda', 'Tischlerei Höflinger', 'Pizzeria Da Marco',
    'Salon Korall', 'Holz & Liebe',
  ];
  return (
    <section className="py-12 md:py-16 surface border-y border-line" id="mehr">
      <div className="container-x mb-6">
        <p className="eyebrow">Über 40 lokale Betriebe vertrauen uns</p>
      </div>
      <Marquee speed="slow">
        {ITEMS.concat(ITEMS).map((n, i) => (
          <span key={i} className="font-display text-3xl md:text-5xl text-muted whitespace-nowrap">
            {n}
            <span className="text-[var(--accent-color-2)] ml-12">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function ServicesSection() {
  const items = [
    {
      n: '01',
      title: 'Branchen-Templates',
      copy: 'Mehrseitige, animierte Templates für Restaurant, Salon und Handwerk. Live-Vorschau im Browser, Farbschema in Sekunden.',
      tag: 'In 7 Tagen live',
    },
    {
      n: '02',
      title: 'Custom Design',
      copy: 'Wenn Template nicht reicht: individuelles Design, eigene Funktionen, eigene Bibliothek. Wie ein Maßanzug.',
      tag: 'Ab 4 Wochen',
    },
    {
      n: '03',
      title: 'Foto & Video',
      copy: 'Eigenes Team kommt zu Ihnen ins Lokal, in den Salon oder auf die Baustelle. Bilder die nach Ihnen aussehen, nicht nach Stockfotos.',
      tag: 'On-Location',
    },
    {
      n: '04',
      title: 'Hosting & Pflege',
      copy: 'Unkompliziertes Hosting und kleine Anpassungen zum Pauschalpreis. 29 €/Monat – wir sind ansprechbar, wenn Sie uns brauchen.',
      tag: 'Per Empfehlung',
    },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow mb-5">Was wir machen</p>
            <h2 className="headline-lg">
              Studio<br />
              <em className="italic-pop">für lokale Marken.</em>
            </h2>
          </div>
          <p className="md:col-span-5 text-lg text-muted leading-relaxed reveal">
            Vier Leistungen. Ein Team. Wir bauen, fotografieren, hosten und kümmern uns – damit Sie sich um Ihren Betrieb kümmern können.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 reveal-stagger">
          {items.map((s) => (
            <article key={s.n} className="group relative bg-white border border-line rounded-3xl p-8 md:p-10 hover-lift">
              <div className="flex items-start justify-between mb-10">
                <span className="font-mono text-xs text-muted">{s.n}</span>
                <span className="text-xs uppercase tracking-widest text-muted bg-[var(--accent-color)] text-brand px-3 py-1 rounded-full">{s.tag}</span>
              </div>
              <h3 className="headline-md">{s.title}</h3>
              <p className="mt-5 text-lg text-muted leading-relaxed">{s.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplatesPreviewSection() {
  return (
    <section className="py-24 md:py-32 surface">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow mb-5">Templates</p>
            <h2 className="headline-lg">
              Drei Branchen.<br />
              <em className="italic-pop">Endlos viele Welten.</em>
            </h2>
          </div>
          <p className="md:col-span-5 text-lg text-muted reveal">
            Jedes Template ist mehrseitig, mit Foto-Galerien, animiertem Hero und 4 vorbereiteten Farbschemen.
            Klicken Sie sich live durch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
          {(Object.keys(TEMPLATE_META) as TemplateKey[]).map((k) => {
            const m = TEMPLATE_META[k];
            return (
              <Link
                key={k}
                to={`/preview/${k}`}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] hover-lift block"
              >
                <img src={m.image} alt={m.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                  <span className="text-xs font-mono text-white/80 uppercase tracking-widest">/ {k}</span>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: m.accent, boxShadow: `0 0 20px ${m.accent}` }}
                  />
                </div>
                <div className="relative p-8 h-full flex flex-col justify-end text-white">
                  <p className="text-xs uppercase tracking-widest text-[var(--accent-color)] mb-2">{m.tagline}</p>
                  <h3 className="font-display text-4xl md:text-5xl">{m.label}</h3>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-xs">{m.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium border-t border-white/20 pt-4">
                    Live-Vorschau ansehen
                    <span aria-hidden className="transition-transform group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 text-center reveal">
          <Link to="/templates" className="btn-outline">Alle Details zu den Templates <span aria-hidden>→</span></Link>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="py-32 md:py-44 bg-brand text-white relative overflow-hidden grain">
      <div className="blob -top-40 right-0 w-[600px] h-[600px]" style={{ background: 'var(--accent-color)', opacity: 0.18 }} />
      <div className="container-x relative">
        <p className="eyebrow !text-white/60 mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <span style={{ background: 'rgba(255,255,255,0.4)' }} />Was uns wichtig ist
        </p>
        <h2 className="headline-lg max-w-5xl">
          <span className="text-white/40">Wir bauen keine Templates.</span> Wir bauen <em className="italic-pop" style={{ color: 'var(--accent-color)' }}>Werkzeuge</em>, mit denen Sie weiterarbeiten können – auch wenn wir nicht da sind.
        </h2>

        <div className="grid md:grid-cols-3 gap-12 mt-20 reveal-stagger">
          {[
            {
              t: 'Inhalt vor Effekt.',
              d: 'Eine Website soll zeigen, was Sie wirklich machen. Animationen sind die Würze, nicht das Hauptgericht.',
            },
            {
              t: 'Eigentum, nicht Miete.',
              d: 'Sie haben jederzeit Zugriff auf Ihren Code, Ihre Inhalte und Ihre Bilder. Keine Geiselhaft, kein Lock-in.',
            },
            {
              t: 'Geschwindigkeit ist Respekt.',
              d: 'Schnelle Ladezeiten, sauberes Mobile-Design, gute Auffindbarkeit bei Google. Damit Ihre Gäste finden, was sie suchen – und bleiben.',
            },
          ].map((b, i) => (
            <div key={i} className="border-t border-white/15 pt-8">
              <p className="font-mono text-xs text-white/40 mb-4">/ {String(i + 1).padStart(2, '0')}</p>
              <h3 className="headline-md text-white">{b.t}</h3>
              <p className="mt-5 text-white/70 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdminPreviewSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 reveal">
          <p className="eyebrow mb-5">Admin-Bereich</p>
          <h2 className="headline-md">Inhalte pflegen<br /><em className="italic-pop">in einer Minute.</em></h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Sie loggen sich ein, ändern Texte, Bilder, Speisekarte oder Öffnungszeiten – und drücken Speichern.
            Keine Plugins, keine Cloud-Dashboards mit 200 Menüs. Nur das, was Sie brauchen.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              'Login mit Passwort. Einfach und ohne Umwege.',
              'Bilder per Drag & Drop hochladen.',
              'Änderungen erscheinen direkt auf der Seite.',
              'Ältere Stände lassen sich wiederherstellen.',
            ].map((t, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="mt-1 inline-flex h-6 w-6 rounded-full bg-[var(--accent-color)] items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-lg">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 relative reveal">
          <div className="rounded-3xl overflow-hidden border border-line shadow-2xl bg-white">
            <div className="bg-[var(--surface-color)] px-5 py-3 flex items-center gap-2 border-b border-line">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-muted font-mono">trattoria-innsbruck.at/admin</span>
            </div>
            <div className="p-8 grid md:grid-cols-12 gap-6">
              <aside className="md:col-span-4">
                <p className="text-xs uppercase tracking-widest text-muted">Bereiche</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {['Marke', 'Hero', 'Speisekarte', 'Galerie', 'Bewertungen', 'Kontakt'].map((s, i) => (
                    <li key={s} className={`px-3 py-2 rounded-lg ${i === 2 ? 'bg-[var(--accent-color)] font-semibold' : 'hover:bg-[var(--surface-color)]'}`}>
                      {s}
                    </li>
                  ))}
                </ul>
              </aside>
              <main className="md:col-span-8 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">Gericht</p>
                  <div className="border border-line rounded-xl px-4 py-3 font-medium">Tagliatelle al Tartufo</div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">Beschreibung</p>
                  <div className="border border-line rounded-xl px-4 py-3 text-sm leading-relaxed">
                    Hausgemachte Tagliatelle, schwarzer Sommertrüffel aus Umbrien, gehobelter Parmigiano…
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted mb-1">Preis</p>
                    <div className="border border-line rounded-xl px-4 py-3 font-mono">24,90 €</div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted mb-1">Bild</p>
                    <div className="border border-line border-dashed rounded-xl px-4 py-3 text-sm text-muted text-center">
                      Drag &amp; Drop
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button className="btn-ghost">Abbrechen</button>
                  <button className="btn-primary !py-2.5 !px-5 text-sm">Speichern</button>
                </div>
              </main>
            </div>
          </div>
          <div className="absolute -inset-4 -z-10 bg-[var(--accent-color)]/30 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
}

function ProcessTimelineSection() {
  const steps = [
    {
      n: '01',
      t: 'Kennenlernen',
      d: 'Wir sprechen 30 Minuten über Ihren Betrieb, Ihr Ziel und Ihren Stil. Kostenlos, unverbindlich, ohne Sales-Gedöns.',
      meta: 'Tag 0',
    },
    {
      n: '02',
      t: 'Foto- & Videoshooting',
      d: 'Wenn gewünscht: Wir kommen vor Ort, fotografieren, drehen und schneiden. Sie kümmern sich nur um Ihren Betrieb.',
      meta: 'Tag 1–3',
    },
    {
      n: '03',
      t: 'Aufbau & Befüllung',
      d: 'Sie wählen Template und Farbschema. Wir bauen auf, befüllen mit Ihren Inhalten und schicken Ihnen einen Preview-Link.',
      meta: 'Tag 3–6',
    },
    {
      n: '04',
      t: 'Live-Schaltung',
      d: 'Sie geben grünes Licht. Wir schalten live, übergeben den Admin-Bereich und sind ab da Ihr direkter Ansprechpartner.',
      meta: 'Tag 7',
    },
  ];
  return (
    <section className="py-24 md:py-32 surface">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow mb-5">Ablauf</p>
            <h2 className="headline-lg">In <em className="italic-pop">7 Tagen</em> online.</h2>
          </div>
          <p className="md:col-span-5 text-lg text-muted reveal">
            Vom ersten Anruf bis zur Live-Schaltung – ein klarer Ablauf ohne Überraschungen.
            Sie wissen jederzeit, wo wir gerade stehen.
          </p>
        </div>

        <ol className="relative md:grid md:grid-cols-4 md:gap-0">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className={`relative md:border-l border-t md:border-t-0 border-line p-8 md:p-10 reveal ${i === 0 ? '' : ''}`}
            >
              {/* connector dot */}
              <span
                className="absolute -left-1.5 -top-1.5 md:left-[-7px] md:top-9 h-3 w-3 rounded-full bg-brand"
                style={{ boxShadow: '0 0 0 6px var(--surface-color)' }}
              />
              <p className="font-mono text-xs text-muted">{s.n} · {s.meta}</p>
              <h3 className="headline-md mt-4">{s.t}</h3>
              <p className="mt-4 text-muted leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 reveal">
          <Link to="/prozess" className="btn-outline">Detaillierter Ablauf <span aria-hidden>→</span></Link>
        </div>
      </div>
    </section>
  );
}

function ProductionSection() {
  const cards = [
    {
      t: 'Foto-Shooting',
      lines: ['4–8 Stunden vor Ort', '20–40 bearbeitete Bilder', 'Unbegrenzte Nutzung', 'Lieferung in 7 Tagen'],
      img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=900&q=80',
      featured: false,
    },
    {
      t: 'Imagefilm',
      lines: ['30–60 Sekunden Film', 'Drohnenaufnahmen optional', 'Lizenzierte Hintergrundmusik', 'Web- & Social-Schnitt'],
      img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80',
      featured: true,
    },
    {
      t: 'Komplett-Set',
      lines: ['Foto + Video gemeinsam', 'Storyboard-Beratung', 'Social-Media-Cuts', 'Beste Preisleistung'],
      img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80',
      featured: false,
    },
  ];
  return (
    <section className="py-24 md:py-32 bg-brand text-white relative overflow-hidden grain">
      <div className="blob -top-32 -right-32 w-[600px] h-[600px]" style={{ background: 'var(--accent-color)', opacity: 0.16 }} />
      <div className="container-x relative">
        <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow !text-white/60 mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <span style={{ background: 'rgba(255,255,255,0.4)' }} />Komplettpaket
            </p>
            <h2 className="headline-lg">
              Wir machen die Bilder.<br />
              <em className="italic-pop" style={{ color: 'var(--accent-color)' }}>Wir drehen das Video.</em>
            </h2>
          </div>
          <p className="md:col-span-5 text-lg text-white/80 reveal">
            Buchbar einzeln oder als Komplettpaket. Wir kommen ins Lokal, in den Salon oder auf die Baustelle und produzieren Inhalte, die wirklich nach Ihnen aussehen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
          {cards.map((c) => (
            <article key={c.t} className={`relative rounded-3xl overflow-hidden border ${c.featured ? 'border-[var(--accent-color)]' : 'border-white/15'} hover-lift`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={c.t} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" loading="lazy" />
              </div>
              <div className={`p-7 ${c.featured ? 'bg-[var(--accent-color)] text-brand' : 'bg-white/5 backdrop-blur-sm'}`}>
                <h3 className="font-display text-3xl mb-4">{c.t}</h3>
                <ul className="space-y-2 text-sm">
                  {c.lines.map((l) => (
                    <li key={l} className="flex gap-2">
                      <span className={c.featured ? 'text-brand' : 'text-[var(--accent-color)]'}>✓</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 reveal">
          <Link to="/preise" className="btn-accent">Pakete &amp; Preise <span aria-hidden>→</span></Link>
        </div>
      </div>
    </section>
  );
}

function NumbersSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
          <h2 className="md:col-span-7 headline-lg reveal">
            In <em className="italic-pop">Zahlen.</em>
          </h2>
          <p className="md:col-span-5 text-lg text-muted reveal">
            Drei Jahre Studio-Arbeit, dokumentiert. Updaten wir vierteljährlich.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 reveal-stagger">
          {[
            { v: 47, s: '', l: 'Live-Projekte' },
            { v: 65, s: ' %', l: 'Empfehlungs-Quote' },
            { v: 7, s: ' Tage', l: 'Bis online (Ø)' },
            { v: 24, s: ' h', l: 'Antwortzeit' },
          ].map((m, i) => (
            <div key={i} className="md:border-l border-line md:pl-8">
              <p className="num-display text-6xl md:text-8xl leading-none">
                <AnimatedCounter to={m.v} suffix={m.s} />
              </p>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted">{m.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const quotes = [
    {
      t: 'BTH Studio hat unsere Speisekarte digital so übersetzt, wie wir sie selbst nicht beschreiben hätten können. Seit Launch reservieren 40 % mehr Gäste online.',
      a: 'Giulia Conti',
      r: 'Trattoria Innsbruck',
    },
    {
      t: 'Endlich eine Website, bei der ich nicht ständig den Webmaster anrufen muss. Inhalte pflege ich selbst, in fünf Minuten.',
      a: 'Marie Hofer',
      r: 'Studio Lumière, München',
    },
    {
      t: 'Klare Arbeit, klarer Preis, klarer Zeitplan. Vor Ort gefilmt, in 14 Tagen live. Empfehlung.',
      a: 'Stefan Mayer',
      r: 'Mayer & Söhne, Ingolstadt',
    },
  ];
  return (
    <section className="py-24 md:py-32 surface">
      <div className="container-x">
        <p className="eyebrow mb-5 reveal">Stimmen</p>
        <h2 className="headline-lg max-w-3xl mb-16 reveal">
          Was unsere Kund<em className="italic-pop">:innen sagen.</em>
        </h2>
        <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
          {quotes.map((q, i) => (
            <blockquote
              key={i}
              className="bg-white border border-line rounded-3xl p-8 md:p-10 hover-lift"
            >
              <span className="font-display text-7xl text-[var(--accent-color-2)] block leading-none mb-2">&ldquo;</span>
              <p className="text-lg leading-relaxed">{q.t}</p>
              <footer className="mt-8 pt-6 border-t border-line">
                <p className="font-medium">{q.a}</p>
                <p className="text-sm text-muted">{q.r}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function CalloutFooter() {
  return (
    <section className="py-32 md:py-44 bg-brand text-white relative overflow-hidden grain">
      <div className="blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]" style={{ background: 'var(--accent-color)', opacity: 0.18 }} />
      <div className="container-x relative text-center max-w-4xl mx-auto">
        <p className="eyebrow !text-white/60 mb-5 justify-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <span style={{ background: 'rgba(255,255,255,0.4)' }} />Bereit?
        </p>
        <h2 className="headline-xl">
          Bauen wir<br />
          <em className="italic-pop" style={{ color: 'var(--accent-color)' }}>Ihre Website.</em>
        </h2>
        <p className="mt-8 text-lg text-white/80 max-w-xl mx-auto">
          Schreiben Sie uns – wir antworten innerhalb von 24 Stunden mit einer ehrlichen Einschätzung.
        </p>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link to="/kontakt" className="btn-accent">Beratung anfragen <span aria-hidden>→</span></Link>
          <Link to="/templates" className="btn-outline !border-white/60 !text-white hover:!bg-white hover:!text-slate-900">
            Templates ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Templates page ──────────────────────────────────────────────── */
function TemplatesGallery() {
  useReveal();
  return (
    <>
      <section className="pt-44 pb-20 md:pb-28">
        <div className="container-x">
          <p className="eyebrow mb-5 reveal">Galerie · Templates</p>
          <h1 className="headline-xl max-w-5xl reveal">
            Wählen Sie Ihren Stil.<br />
            <em className="italic-pop">Wir machen den Rest.</em>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl reveal">
            Jedes Template ist multi-page, animiert und mit Live-Farbschema-Wechsel ausgestattet.
            Klicken Sie auf eine Vorschau, um das Template zu erleben.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-x grid gap-6">
          {(Object.keys(TEMPLATE_META) as TemplateKey[]).map((k, i) => {
            const m = TEMPLATE_META[k];
            const styles: { id: 'classic' | 'modern' | 'bold'; label: string; tag: string }[] = [
              { id: 'classic', label: 'Klassisch', tag: 'editorial · warm' },
              { id: 'modern', label: 'Modern', tag: 'klar · SaaS-Ästhetik' },
              { id: 'bold', label: 'Bold', tag: 'magazinhaft · groß' },
            ];
            return (
              <div key={k} className="rounded-3xl overflow-hidden bg-white border border-line reveal">
                <div className="grid md:grid-cols-12 gap-0">
                  <div className={`md:col-span-5 aspect-[4/3] md:aspect-auto img-zoom ${i % 2 ? 'md:order-2' : ''}`}>
                    <img src={m.image} alt={m.label} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className={`md:col-span-7 p-10 md:p-14 ${i % 2 ? 'md:order-1' : ''}`}>
                    <p className="font-mono text-xs uppercase tracking-widest" style={{ color: m.accent }}>/ Branche · 0{i + 1}</p>
                    <h2 className="headline-lg mt-4">{m.label}</h2>
                    <p className="mt-4 text-lg text-muted">{m.tagline}</p>
                    <p className="mt-8 eyebrow">Drei Stile</p>
                    <div className="mt-4 grid sm:grid-cols-3 gap-3">
                      {styles.map((s) => (
                        <Link
                          key={s.id}
                          to={s.id === 'classic' ? `/preview/${k}` : `/preview/${k}/style/${s.id}`}
                          className="group block rounded-2xl border border-line p-5 hover:border-brand hover:bg-[#fafaf7] transition"
                        >
                          <p className="font-display text-2xl">{s.label}</p>
                          <p className="mt-1 text-xs text-muted">{s.tag}</p>
                          <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted group-hover:text-brand transition">
                            Live ansehen <span aria-hidden>→</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CalloutFooter />
    </>
  );
}

/* ─── Process page ────────────────────────────────────────────────── */
function ProcessPage() {
  useReveal();
  const steps = [
    { d: 'Tag 0', t: 'Kennenlernen', body: '30-Minuten-Call (Zoom oder Telefon). Wir verstehen Ihren Betrieb, Ihre Konkurrenz, Ihre Ziele. Sie bekommen unsere ehrliche Einschätzung.' },
    { d: 'Tag 1', t: 'Briefing & Auswahl', body: 'Sie wählen Template und Paket. Wir senden ein verbindliches Angebot. Anzahlung 50 %.' },
    { d: 'Tag 1–3', t: 'Foto- & Videoshooting', body: 'Optional: Wir kommen mit zwei Mitarbeitenden, einer Kamera-Ausrüstung im Wert von 25 k €, einer Drohne und einem Plan, was wir produzieren wollen. 4–8 Stunden vor Ort.' },
    { d: 'Tag 3–5', t: 'Aufbau', body: 'Wir richten das Template ein, importieren Ihre Inhalte, optimieren Bilder, schreiben SEO-Texte vor.' },
    { d: 'Tag 5–6', t: 'Feedback-Schleife', body: 'Sie schauen sich den Preview-Link an. Eine Korrektur-Runde inkludiert. Sie senden Anmerkungen, wir setzen um.' },
    { d: 'Tag 7', t: 'Live-Schaltung', body: 'Wir verbinden Ihre Domain und übergeben den Admin-Bereich. Sie sind online.' },
    { d: 'Ab Tag 7', t: 'Pflege & Support', body: 'Sie pflegen Inhalte selbst. Wir kümmern uns um den Hosting-Teil und kleine Anpassungen. 29 €/Monat.' },
  ];
  return (
    <>
      <section className="pt-44 pb-16">
        <div className="container-x">
          <p className="eyebrow mb-5 reveal">Ablauf</p>
          <h1 className="headline-xl max-w-5xl reveal">
            Sieben Schritte.<br />
            <em className="italic-pop">Sieben Tage.</em>
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-tight">
          <ol className="relative space-y-3">
            {steps.map((s, i) => (
              <li key={s.t} className="relative bg-white border border-line rounded-3xl p-8 md:p-10 reveal hover-lift">
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3">
                    <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
                    <p className="font-display text-3xl mt-2">{s.d}</p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="headline-md">{s.t}</h3>
                    <p className="mt-4 text-lg text-muted leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CalloutFooter />
    </>
  );
}

/* ─── About page ─────────────────────────────────────────────────── */
function AboutPage() {
  useReveal();
  return (
    <>
      <section className="pt-44 pb-16">
        <div className="container-x">
          <p className="eyebrow mb-5 reveal">Über uns</p>
          <h1 className="headline-xl max-w-5xl reveal">
            Ein kleines Studio.<br />
            <em className="italic-pop">Ein klarer Anspruch.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted reveal">
            BTH Studio ist eine Werkstatt für Websites, Foto und Video.
            Drei Menschen, ein Hund, viel Kaffee. Wir glauben an Handwerk vor Marketing-Sprech.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 surface">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6 reveal">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
              alt="Team BTH Studio"
              className="rounded-3xl w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-6 reveal flex flex-col justify-center">
            <h2 className="headline-md">
              Studio in Innsbruck.<br />
              <em className="italic-pop">Kunden in der DACH-Region.</em>
            </h2>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Wir sitzen in einem alten Werkstatt-Loft im Innsbrucker Saggen, fünf Minuten vom Hauptbahnhof.
              Sie sind herzlich willkommen vorbeizukommen – wir machen besseren Kaffee als die meisten.
            </p>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Unsere Kunden sind Restaurants, Salons, Handwerksbetriebe, Hotels und Boutiquen in Innsbruck,
              München, Ingolstadt und gelegentlich darüber hinaus. Über 65 % der Aufträge kommen von Empfehlungen.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <h2 className="headline-md max-w-3xl reveal mb-16">
            Das Team.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 reveal-stagger">
            {[
              {
                n: 'Julius V.',
                r: 'Studio Lead · Web',
                img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
                bio: 'Programmiert seit zwölf Jahren. Liebt Design-Systeme und Espresso. Spricht Deutsch, Englisch, Italienisch.',
              },
              {
                n: 'Lena B.',
                r: 'Foto & Visual',
                img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80',
                bio: 'Foto-Studium in Wien, fünf Jahre für österreichische Hotels und Magazine. Drohnen-Pilotin (gewerblich).',
              },
              {
                n: 'Tom H.',
                r: 'Video & Schnitt',
                img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80',
                bio: 'Filmemacher mit Werbefilm-Hintergrund. Verantwortet alle Imagefilme – vom Storyboard bis zum Final-Cut.',
              },
            ].map((m, i) => (
              <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
                <div className="aspect-[4/5] img-zoom">
                  <img src={m.img} alt={m.n} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-7">
                  <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-3xl mt-2">{m.n}</h3>
                  <p className="text-sm text-muted mt-1">{m.r}</p>
                  <p className="mt-5 text-sm leading-relaxed">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ManifestoSection />
      <CalloutFooter />
    </>
  );
}

/* ─── Pricing page ────────────────────────────────────────────────── */
function Pricing() {
  useReveal();
  const tiers = [
    {
      name: 'Template',
      price: '1.490 €',
      sub: 'einmalig',
      monthly: '+ 29 € / Monat Hosting & Pflege',
      features: [
        'Eines unserer 3 Branchen-Templates',
        '5 Unterseiten, mehrsprachig optional',
        'Admin-Bereich zum selbst pflegen',
        'Hosting & Pflege inklusive',
        '1 Stunde Einrichtungs-Support',
        'In rund einer Woche online',
      ],
    },
    {
      name: 'Komplettpaket',
      price: '2.890 €',
      sub: 'einmalig',
      monthly: '+ 29 € / Monat Hosting & Pflege',
      featured: true,
      badge: 'Beliebteste Wahl',
      features: [
        'Alles aus „Template"',
        'Foto-Shooting bei Ihnen vor Ort (4–8 h)',
        '20–40 bearbeitete Fotos',
        '30–60 Sekunden Imagefilm',
        'Storyboard- und Stylings-Beratung',
        'Social-Media-Cuts inklusive',
      ],
    },
    {
      name: 'Custom',
      price: 'auf Anfrage',
      sub: 'individuell',
      monthly: 'Hosting individuell',
      features: [
        'Individuelles Design ohne Template-Bindung',
        'Beliebige Funktionen (Buchung, Shop, Multi-Standort)',
        'Persönlicher Projektmanager',
        'Iterative Design-Schleifen mit Style-Guide',
        'API-Anbindungen möglich',
        'Zeitplan nach Absprache',
      ],
    },
  ];

  const addons = [
    { t: 'Mehrsprachigkeit', p: 'ab 290 €', d: 'DE + EN, weitere Sprachen auf Anfrage. Inkl. Sprach-Switcher.' },
    { t: 'Online-Reservierung', p: 'ab 390 €', d: 'Anbindung an Tools wie Quandoo, OpenTable, Treatwell.' },
    { t: 'Foto-Nachshooting', p: '690 €', d: 'Halber Tag. Für saisonale Updates oder neue Produkte.' },
    { t: 'Newsletter-Setup', p: '290 €', d: 'Anbindung an Mailerlite, Brevo oder Mailchimp.' },
    { t: 'Texte & SEO', p: 'ab 490 €', d: 'Schreiben aller Inhalte durch unsere Copywriter:innen, inkl. SEO-Recherche.' },
    { t: 'Logo-Refresh', p: 'ab 590 €', d: 'Modernisierung Ihres bestehenden Logos. Drei Iterationen.' },
  ];

  return (
    <>
      <section className="pt-44 pb-12">
        <div className="container-x">
          <p className="eyebrow mb-5 reveal">Preise</p>
          <h1 className="headline-xl max-w-5xl reveal">
            Faire Preise.<br />
            <em className="italic-pop">Keine Überraschungen.</em>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl reveal">
            Drei klare Pakete. Ein transparenter Festpreis, einmalig zahlbar.
            Hosting und Pflege auf Wunsch monatlich – kündbar jederzeit.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-x grid md:grid-cols-3 gap-5 reveal-stagger">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col ${
                t.featured ? 'bg-brand text-white' : 'bg-white border border-line'
              } hover-lift`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-8 bg-[var(--accent-color)] text-brand text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full">
                  {t.badge}
                </span>
              )}
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">/ {t.name}</h3>
              <p className={`headline-lg mt-4 ${t.featured ? 'text-[var(--accent-color)]' : ''}`}>{t.price}</p>
              <p className={`text-sm mt-1 ${t.featured ? 'text-white/70' : 'text-muted'}`}>{t.sub}</p>
              <p className={`text-sm mt-2 ${t.featured ? 'text-white/70' : 'text-muted'}`}>{t.monthly}</p>
              <ul className="mt-8 space-y-3 text-sm flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className={t.featured ? 'text-[var(--accent-color)]' : 'text-brand'}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/kontakt"
                className={`mt-10 ${t.featured ? 'btn-accent' : 'btn-outline'}`}
              >
                Anfragen <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-28 surface">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
            <h2 className="md:col-span-7 headline-lg reveal">
              Add-ons.<br />
              <em className="italic-pop">Wenn mehr braucht, mehr bekommt.</em>
            </h2>
            <p className="md:col-span-5 text-lg text-muted reveal">
              Buchbar einzeln oder als Paket. Auf Wunsch zu jedem Zeitpunkt nachrüstbar.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 reveal-stagger">
            {addons.map((a) => (
              <article key={a.t} className="bg-white border border-line rounded-3xl p-7 hover-lift">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display text-2xl">{a.t}</h3>
                  <span className="text-sm font-mono">{a.p}</span>
                </div>
                <p className="text-muted text-sm leading-relaxed">{a.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28">
        <div className="container-tight">
          <h2 className="headline-lg mb-12 reveal">
            Häufige <em className="italic-pop">Fragen.</em>
          </h2>
          <Accordion
            items={[
              { q: 'Wie lange dauert die Erstellung?', a: 'Bei Template-Projekten typischerweise 5–10 Arbeitstage nach Inhalts-Übergabe. Komplettpakete mit Foto/Video brauchen 2–3 Wochen, weil ein Shooting-Termin und ein Schnitt-Slot dazukommen.' },
              { q: 'Kann ich Inhalte selbst pflegen?', a: 'Ja. Sie erhalten einen einfachen Admin-Bereich mit Login. Texte, Bilder, Speisekarte und Öffnungszeiten ändern Sie ohne Vorkenntnisse direkt im Browser. Sie sehen den Effekt sofort.' },
              { q: 'Was passiert, wenn etwas kaputt ist?', a: 'Im Pflegepaket überwachen wir Ihre Seite automatisch – wir bekommen Probleme oft mit, bevor Sie es tun. Wir reagieren innerhalb der Geschäftszeiten in der Regel binnen weniger Stunden.' },
              { q: 'Wem gehört die Website?', a: 'Ihnen. Sie können den Quellcode jederzeit anfordern, das Hosting wechseln und mit anderen Agenturen weiterarbeiten. Wir liefern keine Verträge mit Lock-in-Klauseln.' },
              { q: 'Was kostet eine zusätzliche Sprache?', a: 'Mehrsprachigkeit (DE + EN) kostet einmalig ab 290 €. Weitere Sprachen je nach Umfang. Inhalte können von uns übersetzt oder bereitgestellt werden.' },
              { q: 'Welche Zahlungsweise?', a: '50 % Anzahlung bei Auftrag, 50 % bei Live-Schaltung. Beide Rechnungen mit MwSt. Hosting wird monatlich abgebucht (kündbar zum Monatsende).' },
              { q: 'Arbeiten Sie auch außerhalb der DACH-Region?', a: 'Ja, auf Anfrage. Allerdings nur dort, wo wir mit Tageslicht und einem Direktflug hinreisen können – sonst leidet die Qualität des Shootings.' },
            ]}
          />
        </div>
      </section>

      <CalloutFooter />
    </>
  );
}

/* ─── Contact page ────────────────────────────────────────────────── */
function Contact() {
  useReveal();
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="pt-44 pb-12">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6 reveal">
            <p className="eyebrow mb-5">Kontakt</p>
            <h1 className="headline-xl">
              Lassen Sie<br />
              <em className="italic-pop">uns reden.</em>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted max-w-md">
              Schreiben Sie uns Ihre Idee. Wir antworten innerhalb von 24 Stunden mit einer ehrlichen Einschätzung – auch wenn wir nicht der richtige Partner sind.
            </p>
            <div className="mt-12 space-y-6">
              <a href={`mailto:${AGENCY.email}`} className="block group">
                <p className="text-xs uppercase tracking-widest text-muted">E-Mail</p>
                <p className="mt-1 font-display text-3xl group-hover:translate-x-1 transition-transform">{AGENCY.email}</p>
              </a>
              <a href={`tel:${AGENCY.phone}`} className="block group">
                <p className="text-xs uppercase tracking-widest text-muted">Telefon</p>
                <p className="mt-1 font-display text-3xl group-hover:translate-x-1 transition-transform">{AGENCY.phone}</p>
              </a>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">Studio</p>
                <p className="mt-1 text-xl">Saggen 12 · 6020 Innsbruck</p>
                <p className="text-sm text-muted mt-1">Mo–Fr · 09:00 – 18:00 · Termin auf Anfrage</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 reveal">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="bg-white border border-line rounded-3xl p-8 md:p-10 space-y-5"
            >
              {sent ? (
                <div className="py-12 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="font-display text-3xl">Vielen Dank.</h3>
                  <p className="mt-3 text-muted">Wir melden uns innerhalb von 24 Stunden.</p>
                </div>
              ) : (
                <>
                  <Field label="Name">
                    <input required name="name" className="w-full bg-[var(--surface-color)] rounded-xl px-4 py-3 border border-line focus:border-brand outline-none transition" />
                  </Field>
                  <Field label="E-Mail">
                    <input required type="email" name="email" className="w-full bg-[var(--surface-color)] rounded-xl px-4 py-3 border border-line focus:border-brand outline-none transition" />
                  </Field>
                  <Field label="Branche">
                    <select name="branche" className="w-full bg-[var(--surface-color)] rounded-xl px-4 py-3 border border-line focus:border-brand outline-none transition">
                      <option>Restaurant / Gastro</option>
                      <option>Salon / Beauty</option>
                      <option>Handwerk / Service</option>
                      <option>Hotel / Pension</option>
                      <option>Andere</option>
                    </select>
                  </Field>
                  <Field label="Paket-Interesse">
                    <select name="paket" className="w-full bg-[var(--surface-color)] rounded-xl px-4 py-3 border border-line focus:border-brand outline-none transition">
                      <option>Template (1.490 €)</option>
                      <option>Komplettpaket (2.890 €)</option>
                      <option>Custom (auf Anfrage)</option>
                      <option>Noch unentschieden</option>
                    </select>
                  </Field>
                  <Field label="Ihre Nachricht">
                    <textarea name="message" rows={5} className="w-full bg-[var(--surface-color)] rounded-xl px-4 py-3 border border-line focus:border-brand outline-none transition" />
                  </Field>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Anfrage senden <span aria-hidden>→</span>
                  </button>
                  <p className="text-xs text-muted text-center">
                    Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserem Datenschutz zu.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 surface">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {[
            { t: 'Innsbruck', a: 'Saggen 12, 6020 Innsbruck', tel: '+43 660 0000 000' },
            { t: 'München', a: 'Termine auf Anfrage', tel: '+49 89 1234 5678' },
            { t: 'Ingolstadt', a: 'Termine auf Anfrage', tel: '+49 841 9876 543' },
          ].map((c, i) => (
            <div key={i} className="bg-white border border-line rounded-3xl p-7 reveal">
              <p className="font-mono text-xs text-muted">/ Standort</p>
              <h3 className="font-display text-3xl mt-2">{c.t}</h3>
              <p className="mt-3 text-muted">{c.a}</p>
              <p className="mt-1 text-sm font-mono">{c.tel}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted mb-1.5">{label}</span>
      {children}
    </label>
  );
}

/* ─── Template preview ──────────────────────────────────────────── */
function TemplatePreview() {
  const { key, style: styleParam } = useParams<{ key: TemplateKey; style?: string }>();
  const navigate = useNavigate();
  const tplKey = (key && key in DEMO_CONTENT ? key : 'restaurant') as TemplateKey;
  const style = (styleParam === 'modern' || styleParam === 'bold' ? styleParam : 'classic') as 'classic' | 'modern' | 'bold';
  const presets = PRESETS[tplKey];
  const [presetIdx, setPresetIdx] = useState(0);
  const preset = presets[presetIdx];
  const content = DEMO_CONTENT[tplKey];

  const themedContent = useMemo(() => ({
    ...content,
    brand: { ...content.brand, primaryColor: preset.primary },
  }), [content, preset]);

  useEffect(() => { applyTheme(preset); }, [preset]);
  useEffect(() => setPresetIdx(0), [tplKey]);

  const Tpl = tplKey === 'restaurant' ? RestaurantTemplate : tplKey === 'salon' ? SalonTemplate : TradesmanTemplate;
  const basePath = styleParam ? `/preview/${tplKey}/style/${style}` : `/preview/${tplKey}`;

  return (
    <div>
      <Tpl content={themedContent} basePath={basePath} style={style} />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div className="glass shadow-2xl rounded-2xl p-3 border border-line">
          <p className="text-[10px] uppercase tracking-widest text-muted px-2 mb-2">Farbschema</p>
          <div className="flex gap-2">
            {presets.map((p: ThemePreset, i: number) => (
              <button
                key={p.id}
                onClick={() => setPresetIdx(i)}
                title={p.label}
                aria-label={p.label}
                className={`h-9 w-9 rounded-full border-2 transition ${
                  i === presetIdx ? 'border-brand scale-110' : 'border-white shadow-md hover:scale-105'
                }`}
                style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.accent})` }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/templates')}
          className="bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-2xl hover:opacity-90 transition flex items-center gap-2"
        >
          <span aria-hidden>←</span> Zur Übersicht
        </button>
      </div>
    </div>
  );
}
