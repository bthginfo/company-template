import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { DEMO_CONTENT } from '@/lib/demo-content';
import { PRESETS, applyTheme, type ThemePreset } from '@/lib/theme';
import type { TemplateKey } from '@/lib/types';
import RestaurantTemplate from '@/templates/restaurant';
import SalonTemplate from '@/templates/salon';
import TradesmanTemplate from '@/templates/tradesman';

/* ─── Brand for the agency itself ──────────────────────────────────────── */

const AGENCY = {
  name: 'BTH Studio',
  tagline: 'Websites die wirken. Aus Innsbruck. Für die DACH-Region.',
  email: 'hello@bth-studio.com',
  phone: '+43 660 0000 000',
};

/* ─── Helpers ──────────────────────────────────────────────────────────── */

const TEMPLATE_META: Record<TemplateKey, {
  label: string; tagline: string; image: string; accent: string;
}> = {
  restaurant: {
    label: 'Restaurant',
    tagline: 'Für Gastronomie, Cafés, Bars und Hotels',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    accent: '#9a3412',
  },
  salon: {
    label: 'Salon & Beauty',
    tagline: 'Für Friseure, Kosmetik, Spa und Wellness',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    accent: '#be185d',
  },
  tradesman: {
    label: 'Handwerk & Service',
    tagline: 'Für Installateure, Elektriker, Bau und Service',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    accent: '#1d4ed8',
  },
};

/* ─── Showcase root ────────────────────────────────────────────────────── */

export default function AgencyShowcase() {
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color', '#0f172a');
    document.documentElement.style.setProperty('--accent-color', '#f59e0b');
    document.documentElement.style.setProperty('--surface-color', '#f8fafc');
    document.documentElement.style.setProperty('--bg-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#0f172a');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ShowcaseShell />}>
        <Route index element={<Landing />} />
        <Route path="templates" element={<TemplatesGallery />} />
        <Route path="preise" element={<Pricing />} />
        <Route path="kontakt" element={<Contact />} />
      </Route>
      <Route path="/preview/:key/*" element={<TemplatePreview />} />
    </Routes>
  );
}

function ShowcaseShell() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all ${
          scrolled ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-slate-200/60' : 'bg-transparent'
        }`}
      >
        <div className="container-x flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-900 to-amber-500" />
            <span className={`font-display text-xl font-semibold ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              {AGENCY.name}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {[
              { to: '/templates', label: 'Templates' },
              { to: '/preise', label: 'Preise' },
              { to: '/kontakt', label: 'Kontakt' },
            ].map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `${scrolled ? 'text-slate-700 hover:text-slate-900' : 'text-white/90 hover:text-white'} ${
                    isActive ? 'underline underline-offset-8' : ''
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/kontakt" className="btn-primary !py-2 !px-5 text-sm">Beratung anfragen</Link>
          </nav>
          <button
            onClick={() => setMobile(true)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-slate-800' : 'text-white'}`}
            aria-label="Menü öffnen"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {mobile && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="container-x py-5 flex justify-between items-center">
              <span className="font-display text-xl font-semibold">{AGENCY.name}</span>
              <button onClick={() => setMobile(false)} className="p-2" aria-label="Schließen">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="container-x flex flex-col gap-1 mt-6">
              {[
                { to: '/templates', label: 'Templates' },
                { to: '/preise', label: 'Preise' },
                { to: '/kontakt', label: 'Kontakt' },
              ].map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobile(false)}
                  className="py-4 text-3xl font-display font-semibold border-b border-slate-100"
                >
                  {n.label}
                </Link>
              ))}
              <Link to="/kontakt" onClick={() => setMobile(false)} className="btn-primary mt-8 self-start">
                Beratung anfragen
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-950 text-slate-300 py-14 mt-auto">
        <div className="container-x grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-2xl text-white">{AGENCY.name}</p>
            <p className="text-sm mt-2 opacity-80">{AGENCY.tagline}</p>
          </div>
          <div className="text-sm space-y-1">
            <p><a href={`mailto:${AGENCY.email}`} className="hover:text-white">{AGENCY.email}</a></p>
            <p><a href={`tel:${AGENCY.phone}`} className="hover:text-white">{AGENCY.phone}</a></p>
          </div>
          <div className="text-sm flex md:justify-end gap-5">
            <Link to="/templates" className="hover:text-white">Templates</Link>
            <Link to="/preise" className="hover:text-white">Preise</Link>
            <Link to="/kontakt" className="hover:text-white">Kontakt</Link>
          </div>
        </div>
        <div className="container-x mt-10 pt-6 border-t border-white/10 text-xs opacity-60">
          © {new Date().getFullYear()} {AGENCY.name}.
        </div>
      </footer>
    </div>
  );
}

function Landing() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <>
      <section
        className="relative min-h-[95vh] flex items-center text-white overflow-hidden bg-slate-950"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(700px circle at ${pos.x}% ${pos.y}%, rgba(245,158,11,0.20), transparent 60%)`,
          }}
        />
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-3xl animate-pulse-slow" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-rose-500/20 blur-3xl animate-pulse-slow" />

        <div className="container-x relative z-10 py-32">
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-amber-300 mb-6">{AGENCY.tagline}</p>
          <h1 className="font-display font-bold leading-[1.05] text-5xl md:text-7xl lg:text-8xl max-w-5xl">
            Schöne Websites,<br />
            die <span className="text-amber-400">Kunden bringen</span>.
          </h1>
          <p className="mt-7 text-lg md:text-2xl text-white/85 max-w-2xl leading-relaxed">
            Wir gestalten Websites für Restaurants, Salons und Handwerksbetriebe in Innsbruck, München und Ingolstadt –
            modern, schnell und einfach selbst zu pflegen.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/templates" className="btn-primary">Templates ansehen</Link>
            <Link to="/preise" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-slate-900">
              Preise & Pakete
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {[
              { n: '7 Tage', t: 'bis Ihre Website live ist' },
              { n: '100 / 100', t: 'Lighthouse Performance' },
              { n: 'Inkl.', t: 'Foto- & Videoshooting möglich' },
              { n: 'DACH', t: 'Innsbruck · München · Ingolstadt' },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-display text-2xl md:text-3xl font-bold text-amber-400">{s.n}</p>
                <p className="mt-1 text-sm text-white/70">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <p className="uppercase tracking-[0.22em] text-xs font-semibold text-amber-600 mb-3">Templates</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Drei Branchen-Templates. Endlos viele Möglichkeiten.
            </h2>
            <p className="mt-4 text-lg opacity-70 leading-relaxed">
              Jedes Template ist mehrseitig, animiert und in Sekunden farblich anpassbar.
              Live-Vorschau – inklusive Farbschema-Wechsel.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(Object.keys(TEMPLATE_META) as TemplateKey[]).map((k) => (
              <Link
                key={k}
                to={`/preview/${k}`}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] hover:scale-[1.02] transition-transform"
              >
                <img src={TEMPLATE_META[k].image} alt={TEMPLATE_META[k].label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="relative p-7 h-full flex flex-col justify-end text-white">
                  <p className="text-xs uppercase tracking-widest opacity-80">{TEMPLATE_META[k].tagline}</p>
                  <h3 className="font-display text-3xl font-semibold mt-1">{TEMPLATE_META[k].label}</h3>
                  <p className="mt-4 text-sm flex items-center gap-2 opacity-90 group-hover:opacity-100">
                    Live-Vorschau ansehen
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 surface">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="uppercase tracking-[0.22em] text-xs font-semibold text-amber-600 mb-3">Ablauf</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold">In 4 Schritten online.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '1', t: 'Beratung', d: 'Wir besprechen Ziel, Branche und Style. Kostenlos und unverbindlich.' },
              { n: '2', t: 'Foto/Video (optional)', d: 'Wir kommen zu Ihnen, fotografieren Ihren Betrieb und drehen einen kurzen Imagefilm.' },
              { n: '3', t: 'Aufbau', d: 'Sie wählen Template und Farbschema. Wir richten ein und befüllen mit Inhalten.' },
              { n: '4', t: 'Live & Pflege', d: 'Die Website geht online. Sie pflegen Inhalte über Ihren Admin-Bereich – ohne Vorkenntnisse.' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-3xl p-7 shadow-sm">
                <p className="font-display text-5xl font-bold text-amber-500">{s.n}</p>
                <h3 className="mt-3 font-display text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 opacity-70 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.22em] text-xs font-semibold text-amber-600 mb-3">Admin-Bereich</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Inhalte pflegen, ohne Programmierkenntnisse.
            </h2>
            <ul className="mt-8 space-y-4 text-lg">
              {[
                'Login per Magic-Link – kein Passwort nötig.',
                'Texte, Bilder, Öffnungszeiten und Speisekarte direkt im Browser ändern.',
                'Bilder per Drag & Drop hochladen, automatisch optimiert.',
                'Änderungen sind in Sekunden live.',
              ].map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 rounded-full bg-amber-500/15 items-center justify-center text-amber-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/70">
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-slate-500">/admin</span>
              </div>
              <div className="bg-white p-6 grid gap-4">
                {['Marken-Name', 'Hero Titel', 'Hero Bild'].map((l) => (
                  <div key={l}>
                    <p className="text-xs uppercase tracking-widest text-slate-400">{l}</p>
                    <div className="mt-1 h-10 rounded-lg bg-slate-100" />
                  </div>
                ))}
                <button className="btn-primary !bg-amber-500 hover:!bg-amber-600 mt-2 self-start">Speichern</button>
              </div>
            </div>
            <div className="absolute -inset-6 -z-10 bg-amber-300/30 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10" />
        <div className="container-x relative">
          <div className="max-w-2xl mb-14">
            <p className="uppercase tracking-[0.22em] text-xs font-semibold text-amber-400 mb-3">Komplettpaket</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Wir machen die Bilder. Wir drehen das Video. Sie zeigen sich von Ihrer besten Seite.
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Buchbar als Add-on oder als Komplettpaket. Wir kommen zu Ihnen ins Lokal,
              in den Salon oder auf die Baustelle und produzieren Inhalte, die wirklich überzeugen.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: 'Foto-Shooting', items: ['4–8 Stunden vor Ort', '20–40 bearbeitete Bilder', 'Unbegrenzte Nutzung auf der Website', 'Lieferung in 7 Tagen'] },
              { t: 'Imagefilm', items: ['30–60 Sekunden Imagefilm', 'Drohnenaufnahmen optional', 'Hintergrundmusik (lizenziert)', 'Format für Web & Social'] },
              { t: 'Komplett-Set', items: ['Foto + Video gemeinsam', 'Storyboard-Beratung', 'Social-Media-Cuts inklusive', 'Beste Preisleistung'] },
            ].map((p, i) => (
              <div key={i} className="rounded-3xl p-7 border border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="font-display text-2xl font-semibold">{p.t}</h3>
                <ul className="mt-5 space-y-2 text-sm text-white/85">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-amber-400">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/preise" className="btn-primary">Pakete & Preise ansehen</Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-x text-center max-w-2xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
          Bereit für Ihre neue Website?
        </h2>
        <p className="mt-4 text-lg opacity-70">
          Schreiben Sie uns – wir melden uns innerhalb von 24 Stunden mit einer ehrlichen Einschätzung.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link to="/kontakt" className="btn-primary">Beratung anfragen</Link>
          <Link to="/templates" className="btn-outline">Templates entdecken</Link>
        </div>
      </div>
    </section>
  );
}

function TemplatesGallery() {
  return (
    <div className="pt-32">
      <section className="py-16 md:py-24">
        <div className="container-x">
          <p className="uppercase tracking-[0.22em] text-xs font-semibold text-amber-600 mb-3">Galerie</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight max-w-3xl">
            Wählen Sie Ihren Stil. Wir machen den Rest.
          </h1>
          <p className="mt-5 text-lg opacity-70 max-w-2xl">
            Jedes Template ist vollständig multi-page, animiert und mit Live-Farbschema-Wechsel ausgestattet.
            Klicken Sie auf eine Vorschau, um das Template zu erleben.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-10">
          {(Object.keys(TEMPLATE_META) as TemplateKey[]).map((k, i) => (
            <Link
              key={k}
              to={`/preview/${k}`}
              className={`group relative rounded-3xl overflow-hidden grid md:grid-cols-2 gap-0 ${
                i % 2 ? 'md:[&>img]:order-2' : ''
              }`}
            >
              <img
                src={TEMPLATE_META[k].image}
                alt=""
                className="aspect-[4/3] md:aspect-auto object-cover w-full h-full"
              />
              <div className="p-10 md:p-16 surface flex flex-col justify-center">
                <p className="uppercase tracking-[0.22em] text-xs font-semibold" style={{ color: TEMPLATE_META[k].accent }}>
                  Template
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-semibold mt-2">{TEMPLATE_META[k].label}</h2>
                <p className="mt-3 text-lg opacity-70">{TEMPLATE_META[k].tagline}</p>
                <p className="mt-6 text-sm opacity-60">
                  · 5 Unterseiten · Mobile-optimiert · Foto-Galerie · Kontaktformular · 4 Farbschemen
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                  Live ansehen <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function TemplatePreview() {
  const { key } = useParams<{ key: TemplateKey }>();
  const navigate = useNavigate();
  const tplKey = (key && key in DEMO_CONTENT ? key : 'restaurant') as TemplateKey;
  const presets = PRESETS[tplKey];
  const [presetIdx, setPresetIdx] = useState(0);
  const preset = presets[presetIdx];
  const content = DEMO_CONTENT[tplKey];

  const themedContent = useMemo(() => ({
    ...content,
    brand: { ...content.brand, primaryColor: preset.primary },
  }), [content, preset]);

  useEffect(() => {
    applyTheme(preset);
  }, [preset]);

  useEffect(() => setPresetIdx(0), [tplKey]);

  const Tpl = tplKey === 'restaurant' ? RestaurantTemplate : tplKey === 'salon' ? SalonTemplate : TradesmanTemplate;
  const basePath = `/preview/${tplKey}`;

  return (
    <div>
      <Tpl content={themedContent} basePath={basePath} />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-3 border border-slate-200/70">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 px-2 mb-2">Farbschema</p>
          <div className="flex gap-2">
            {presets.map((p: ThemePreset, i: number) => (
              <button
                key={p.id}
                onClick={() => setPresetIdx(i)}
                title={p.label}
                aria-label={p.label}
                className={`h-9 w-9 rounded-full border-2 transition ${
                  i === presetIdx ? 'border-slate-900 scale-110' : 'border-white shadow-md hover:scale-105'
                }`}
                style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.accent})` }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/templates')}
          className="bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-2xl hover:bg-slate-800 transition flex items-center gap-2"
        >
          <span>←</span> Zur Übersicht
        </button>
      </div>
    </div>
  );
}

function Pricing() {
  const tiers = [
    {
      name: 'Template',
      price: 'ab 1.490 €',
      sub: 'einmalig',
      monthly: '+ 29 € / Monat Hosting & Pflege',
      features: [
        'Eines unserer 3 Templates',
        '5 Unterseiten, mehrsprachig optional',
        'Admin-Bereich inklusive',
        'SSL, Hosting auf Vercel inklusive',
        'Bis zu 1 Stunde Einrichtungs-Support',
        'In 7 Tagen online',
      ],
    },
    {
      name: 'Komplettpaket',
      price: 'ab 2.890 €',
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
        'Beliebige Funktionen (Buchung, Shop, Multi-Standort, …)',
        'Persönlicher Projektmanager',
        'Mehrere Iterationen, Style-Guide',
        'API-Anbindungen möglich',
        'Zeitplan nach Absprache',
      ],
    },
  ];

  return (
    <div className="pt-32">
      <section className="py-16">
        <div className="container-x text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.22em] text-xs font-semibold text-amber-600 mb-3">Preise</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight">
            Faire Preise. Keine Überraschungen.
          </h1>
          <p className="mt-5 text-lg opacity-70">
            Egal ob schneller Template-Start oder individuelle Lösung – wir haben das passende Paket.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-8 flex flex-col ${
                t.featured
                  ? 'bg-slate-950 text-white shadow-2xl border border-amber-500/30'
                  : 'surface border border-slate-200/70'
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-8 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">
                  {t.badge}
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
              <p className={`font-display text-5xl font-bold mt-4 ${t.featured ? 'text-amber-400' : ''}`}>{t.price}</p>
              <p className="text-sm opacity-70 mt-1">{t.sub}</p>
              <p className={`text-sm mt-2 ${t.featured ? 'text-white/70' : 'opacity-70'}`}>{t.monthly}</p>
              <ul className="mt-7 space-y-3 text-sm flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className={t.featured ? 'text-amber-400' : 'text-amber-600'}>✓</span>
                    <span className={t.featured ? 'text-white/85' : ''}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/kontakt"
                className={`mt-8 ${t.featured ? 'btn-primary !bg-amber-500 hover:!bg-amber-400 !text-slate-950' : 'btn-outline'}`}
              >
                Anfragen
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 surface">
        <div className="container-x text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Häufige Fragen</h2>
        </div>
        <div className="container-x max-w-3xl mt-10 space-y-3">
          {[
            { q: 'Wie lange dauert die Erstellung?', a: 'Bei Template-Projekten typischerweise 5–10 Arbeitstage nach Inhalts-Übergabe. Komplettpakete mit Foto/Video 2–3 Wochen.' },
            { q: 'Kann ich Inhalte selbst pflegen?', a: 'Ja. Sie erhalten einen einfachen Admin-Bereich. Login per Magic-Link, kein Passwort.' },
            { q: 'Sind Updates und Hosting inkludiert?', a: 'Im monatlichen Pflegepaket (29 €) sind SSL, Hosting auf Vercel, Sicherheitsupdates und kleinere Anpassungen enthalten.' },
            { q: 'Was kostet eine zusätzliche Sprache?', a: 'Mehrsprachigkeit (z. B. Deutsch + Englisch) ist als Add-on ab 290 € einmalig erhältlich.' },
          ].map((f) => (
            <details key={f.q} className="bg-white rounded-2xl p-6 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between">
                <span>{f.q}</span>
                <span className="opacity-50 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 opacity-70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-32">
      <section className="py-16">
        <div className="container-x grid md:grid-cols-2 gap-16">
          <div>
            <p className="uppercase tracking-[0.22em] text-xs font-semibold text-amber-600 mb-3">Kontakt</p>
            <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight">
              Lassen Sie uns reden.
            </h1>
            <p className="mt-5 text-lg opacity-70 max-w-md">
              Schreiben Sie uns Ihre Idee – wir melden uns innerhalb von 24 Stunden.
            </p>
            <div className="mt-10 space-y-4 text-lg">
              <p>
                <span className="block text-xs uppercase tracking-widest opacity-60">E-Mail</span>
                <a href={`mailto:${AGENCY.email}`} className="hover:underline">{AGENCY.email}</a>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-widest opacity-60">Telefon</span>
                <a href={`tel:${AGENCY.phone}`} className="hover:underline">{AGENCY.phone}</a>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-widest opacity-60">Region</span>
                Innsbruck · München · Ingolstadt · DACH
              </p>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="surface rounded-3xl p-8 space-y-5"
          >
            {sent ? (
              <div className="py-12 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="font-display text-2xl font-semibold">Vielen Dank!</h3>
                <p className="mt-2 opacity-70">Wir melden uns innerhalb von 24 Stunden.</p>
              </div>
            ) : (
              <>
                <Field label="Name"><input required name="name" className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 focus:border-amber-500 outline-none" /></Field>
                <Field label="E-Mail"><input required type="email" name="email" className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 focus:border-amber-500 outline-none" /></Field>
                <Field label="Branche">
                  <select name="branche" className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 focus:border-amber-500 outline-none">
                    <option>Restaurant / Gastro</option>
                    <option>Salon / Beauty</option>
                    <option>Handwerk / Service</option>
                    <option>Andere</option>
                  </select>
                </Field>
                <Field label="Paket-Interesse">
                  <select name="paket" className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 focus:border-amber-500 outline-none">
                    <option>Template</option>
                    <option>Komplettpaket (mit Foto/Video)</option>
                    <option>Custom</option>
                    <option>Noch unentschieden</option>
                  </select>
                </Field>
                <Field label="Nachricht">
                  <textarea name="message" rows={5} className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 focus:border-amber-500 outline-none" />
                </Field>
                <button type="submit" className="btn-primary !bg-amber-500 hover:!bg-amber-600 w-full justify-center">
                  Anfrage senden
                </button>
                <p className="text-xs opacity-50 text-center">
                  Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zu unserem Datenschutz zu.
                </p>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest opacity-60 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
