import { ReactNode, useEffect, useRef, useState, createContext, useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import type { SiteContent } from '@/lib/types';

export type NavItem = { to: string; label: string };

/**
 * Shared base-path context. Templates rendered standalone use ''.
 * Templates rendered inside the showcase set this to '/preview/<key>'
 * so that all internal links resolve correctly.
 */
const BasePathCtx = createContext<string>('');
export function BasePathProvider({ value, children }: { value: string; children: ReactNode }) {
  return <BasePathCtx.Provider value={value}>{children}</BasePathCtx.Provider>;
}
export function useBasePath() {
  return useContext(BasePathCtx);
}
/** Build an absolute path that respects the surrounding base path. */
export function withBase(basePath: string, to: string) {
  if (!to.startsWith('/')) return to;
  return `${basePath}${to}` || '/';
}

/**
 * Drop-in replacement for react-router's <Link> that automatically
 * prefixes absolute hrefs with the active base path. Use this for all
 * internal navigation inside templates.
 */
export function TLink({
  to,
  className,
  children,
  ...rest
}: { to: string; className?: string; children: ReactNode } & Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'children'>) {
  const basePath = useBasePath();
  return (
    <Link to={withBase(basePath, to)} className={className} {...rest}>
      {children}
    </Link>
  );
}

/**
 * Sticky, responsive top nav. Becomes solid on scroll.
 * Mobile drawer included.
 */
export function SiteHeader({
  content,
  nav,
  basePath: basePathProp,
}: {
  content: SiteContent;
  nav: NavItem[];
  basePath?: string;
}) {
  const ctxBase = useBasePath();
  const basePath = basePathProp ?? ctxBase;
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setMobile(false), [loc.pathname]);

  const linkBase = scrolled
    ? 'text-slate-700 hover:text-slate-900'
    : 'text-white/90 hover:text-white drop-shadow';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-slate-200/60' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between py-4">
        <Link to={`${basePath || '/'}`} className="flex items-center gap-3">
          {content.brand.logoUrl ? (
            <img src={content.brand.logoUrl} alt={content.brand.name} className="h-9 w-auto" />
          ) : (
            <span
              className="h-9 w-9 rounded-full"
              style={{ background: `linear-gradient(135deg,var(--brand-color),var(--accent-color))` }}
            />
          )}
          <span
            className={`font-display text-xl font-semibold tracking-tight transition-colors ${
              scrolled ? 'text-slate-900' : 'text-white'
            }`}
          >
            {content.brand.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={`${basePath}${n.to}`}
              end={n.to === '/'}
              className={({ isActive }) =>
                `${linkBase} relative transition ${isActive ? 'after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-current' : ''}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Link to={`${basePath}/kontakt`} className="btn-primary !py-2 !px-5 text-sm">
            Kontakt
          </Link>
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
            <span className="font-display text-xl font-semibold text-slate-900">{content.brand.name}</span>
            <button onClick={() => setMobile(false)} className="p-2 text-slate-700" aria-label="Schließen">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="container-x flex flex-col gap-1 mt-6">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={`${basePath}${n.to}`}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `py-4 text-3xl font-display font-semibold border-b border-slate-100 ${
                    isActive ? 'text-brand' : 'text-slate-800'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to={`${basePath}/kontakt`} className="btn-primary mt-8 self-start">
              Kontakt aufnehmen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

/**
 * Premium hero with mouse-tracked spotlight glow.
 * Falls back to a brand-color gradient when no image is set.
 */
export function Hero({
  content,
  height = '92vh',
  overlay = 'rgba(8,8,12,0.55)',
  align = 'left',
  showCta = true,
  showScroll = true,
}: {
  content: SiteContent;
  height?: string;
  overlay?: string;
  align?: 'left' | 'center';
  showCta?: boolean;
  showScroll?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const basePath = useBasePath();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const bg = content.hero.imageUrl
    ? `linear-gradient(${overlay},${overlay}), url(${content.hero.imageUrl})`
    : 'linear-gradient(135deg,var(--brand-color),var(--accent-color))';

  return (
    <section
      ref={ref}
      className="relative flex items-center text-white overflow-hidden"
      style={{ minHeight: height, backgroundImage: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* mouse-tracked spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.18), transparent 60%)`,
        }}
      />
      {/* floating accent blob */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-slow"
        style={{ background: 'var(--accent-color)' }}
      />

      <div className={`container-x relative z-10 py-32 ${align === 'center' ? 'text-center mx-auto' : ''}`}>
        {content.brand.tagline ? (
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-white/80 mb-5 reveal is-visible">
            {content.brand.tagline}
          </p>
        ) : null}
        <h1
          className={`font-display font-bold leading-[1.05] reveal is-visible
                      text-5xl md:text-7xl lg:text-8xl ${align === 'center' ? 'mx-auto max-w-4xl' : 'max-w-4xl'}`}
        >
          {content.hero.title}
        </h1>
        {content.hero.subtitle ? (
          <p
            className={`mt-7 text-lg md:text-2xl text-white/90 leading-relaxed reveal is-visible
                       ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}
          >
            {content.hero.subtitle}
          </p>
        ) : null}
        {showCta && content.hero.ctaLabel ? (
          <div className={`mt-12 flex flex-wrap gap-4 reveal is-visible ${align === 'center' ? 'justify-center' : ''}`}>
            <Link to={withBase(basePath, content.hero.ctaHref || '/kontakt')} className="btn-primary">
              {content.hero.ctaLabel}
            </Link>
            <a href="#mehr" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-slate-900">
              Mehr erfahren
            </a>
          </div>
        ) : null}
      </div>

      {showScroll && (
        <a
          href="#mehr"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white animate-bounce-slow"
          aria-label="Weiter scrollen"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black/40" />
    </section>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  align = 'center',
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-x">
        {(title || eyebrow) && (
          <header
            className={`mb-14 reveal ${align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}`}
          >
            {eyebrow ? (
              <p className="uppercase tracking-[0.22em] text-xs font-semibold text-brand mb-3">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">{title}</h2>
            ) : null}
            {subtitle ? <p className="mt-4 text-lg opacity-80 leading-relaxed">{subtitle}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function ContactBlock({ content }: { content: SiteContent }) {
  const c = content.contact;
  return (
    <Section id="kontakt" eyebrow="Besuch & Anfrage" title="Wir freuen uns auf Sie" className="surface" align="center">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-5 text-lg reveal">
          {c.address ? (
            <Field label="Adresse">{c.address}{c.city ? `, ${c.city}` : ''}</Field>
          ) : null}
          {c.phone ? (
            <Field label="Telefon"><a href={`tel:${c.phone}`} className="hover:underline">{c.phone}</a></Field>
          ) : null}
          {c.email ? (
            <Field label="E-Mail"><a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a></Field>
          ) : null}
          {c.hours.length ? (
            <div className="pt-4">
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Öffnungszeiten</p>
              <ul className="space-y-1">
                {c.hours.map((h, i) => (
                  <li key={i} className="flex justify-between max-w-xs">
                    <span className="font-medium">{h.day}</span>
                    <span className="opacity-70">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="reveal">
          {c.mapsUrl ? (
            <iframe title="Karte" src={c.mapsUrl} className="w-full h-80 rounded-3xl border-0 shadow-xl" loading="lazy" />
          ) : (
            <div className="w-full h-80 rounded-3xl bg-black/5" />
          )}
        </div>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest opacity-60">{label}</p>
      <p>{children}</p>
    </div>
  );
}

export function SiteFooter({ content, basePath: basePathProp }: { content: SiteContent; basePath?: string }) {
  const ctxBase = useBasePath();
  const basePath = basePathProp ?? ctxBase;
  return (
    <footer className="bg-slate-950 text-slate-300 py-14 mt-auto">
      <div className="container-x grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl text-white">{content.brand.name}</p>
          {content.brand.tagline ? <p className="text-sm mt-2 opacity-80">{content.brand.tagline}</p> : null}
        </div>
        <div className="text-sm space-y-1">
          {content.contact.address ? (
            <p>{content.contact.address}{content.contact.city ? `, ${content.contact.city}` : ''}</p>
          ) : null}
          {content.contact.phone ? (
            <p><a href={`tel:${content.contact.phone}`} className="hover:text-white">{content.contact.phone}</a></p>
          ) : null}
          {content.contact.email ? (
            <p><a href={`mailto:${content.contact.email}`} className="hover:text-white">{content.contact.email}</a></p>
          ) : null}
        </div>
        <div className="text-sm flex md:justify-end gap-5">
          <Link to={`${basePath}/impressum`} className="hover:text-white">Impressum</Link>
          <Link to={`${basePath}/datenschutz`} className="hover:text-white">Datenschutz</Link>
        </div>
      </div>
      <div className="container-x mt-10 pt-6 border-t border-white/10 text-xs opacity-60">
        © {new Date().getFullYear()} {content.brand.name}. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}

/**
 * Scroll-reveal helper. Adds .is-visible when element enters viewport.
 * Use as `useReveal()` once per page.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
