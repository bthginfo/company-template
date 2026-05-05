import { ReactNode, useEffect, useRef, useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import type { SiteContent } from '@/lib/types';
import { Marquee, SplitText, useReveal as _useReveal } from './fx';
import { ContactForm } from './ContactForm';

export type NavItem = { to: string; label: string };

/* ─── Base path context ────────────────────────────────────────────── */
const BasePathCtx = createContext<string>('');
export function BasePathProvider({ value, children }: { value: string; children: ReactNode }) {
  return <BasePathCtx.Provider value={value}>{children}</BasePathCtx.Provider>;
}
export function useBasePath() { return useContext(BasePathCtx); }

export function withBase(basePath: string, to: string) {
  if (!to.startsWith('/')) return to;
  return `${basePath}${to}` || '/';
}

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

/* ─── Top announcement marquee ─────────────────────────────────────── */
export function AnnouncementBar({ messages }: { messages: string[] }) {
  return (
    <div className="bg-brand text-white text-xs uppercase tracking-[0.2em] py-2.5 fixed top-0 left-0 right-0 z-50">
      <Marquee speed="slow">
        {messages.concat(messages).map((m, i) => (
          <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap">
            <span className="opacity-80">{m}</span>
            <span aria-hidden className="opacity-40">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ─── Header ───────────────────────────────────────────────────────── */
export function SiteHeader({
  content,
  nav,
  basePath: basePathProp,
  announcements,
  /** When true (default), nav text is white at top of page (over a dark hero).
   *  Set to false for templates whose hero is light/white (e.g. modern style)
   *  so the nav remains readable. */
  transparentTextDark = false,
}: {
  content: SiteContent;
  nav: NavItem[];
  basePath?: string;
  announcements?: string[];
  transparentTextDark?: boolean;
}) {
  const ctxBase = useBasePath();
  const basePath = basePathProp ?? ctxBase;
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const loc = useLocation();
  const hasAnn = !!(announcements && announcements.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setMobile(false), [loc.pathname]);

  // Lock body scroll while mobile drawer is open; always restore on close/unmount.
  useEffect(() => {
    if (!mobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev || ''; };
  }, [mobile]);

  // The light/transparent nav (white text on dark hero) is only safe on the
  // home page – subpages render PageHero on a light/cream background, where
  // white nav text disappears. Force dark text whenever we're off the
  // landing route.
  const isHome = loc.pathname === basePath || loc.pathname === `${basePath}/` || (!basePath && (loc.pathname === '/' || loc.pathname === ''));
  const isLight = !scrolled && !transparentTextDark && isHome;
  const txt = isLight ? 'text-white' : 'text-[var(--text-color)]';
  const sub = isLight ? 'text-white/85 hover:text-white' : 'text-[var(--muted-color)] hover:text-[var(--text-color)]';

  return (
    <>
      {hasAnn && <AnnouncementBar messages={announcements!} />}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${hasAnn ? 'top-[36px]' : 'top-0'} ${
          scrolled
            ? 'backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border-b border-line bg-[color-mix(in_oklab,var(--bg-color)_88%,transparent)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-x flex items-center justify-between py-4">
          <Link to={`${basePath || '/'}`} className="flex items-center gap-3 group">
            {content.brand.logoUrl ? (
              <img src={content.brand.logoUrl} alt={content.brand.name} className="h-9 w-auto max-w-[180px] object-contain" />
            ) : (
              <span
                className="h-9 w-9 rounded-full transition-transform duration-500 group-hover:rotate-90"
                style={{ background: `conic-gradient(from 90deg, var(--accent-color), var(--accent-color-2), var(--brand-color), var(--accent-color))` }}
              />
            )}
            {!(content.brand.logoUrl && content.brand.hideName) && (
              <span className={`font-display text-2xl tracking-tight transition-colors ${txt}`}>
                {content.brand.name}
              </span>
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={`${basePath}${n.to}`}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `link-underline px-4 py-2 text-sm font-medium transition-colors ${sub} ${isActive ? 'is-active' : ''}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            {(() => {
              const nc = (content as any)?.navCta as { label?: string; href?: string } | undefined;
              const ctaLabel = (nc?.label && nc.label.trim()) || 'Termin';
              const ctaHref = (nc?.href && nc.href.trim()) || `${basePath}/kontakt`;
              return <Link to={ctaHref} className="ml-4 btn-primary !py-2.5 !px-5 text-sm">{ctaLabel} <span aria-hidden>→</span></Link>;
            })()}
          </nav>

          <button
            onClick={() => setMobile(true)}
            className={`md:hidden p-2 rounded-full border ${isLight ? 'text-white border-white/30' : 'text-[var(--text-color)] border-line'}`}
            aria-label="Menü öffnen"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

      </header>
      {/* Mobile menu rendered as a portal to <body> so it escapes the
          header's backdrop-filter stacking context (which would otherwise
          clip our position:fixed overlay to the header's box). */}
      {mobile && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] bg-[var(--bg-color)] overflow-y-auto">
          <div className="container-x py-5 flex justify-between items-center">
            {content.brand.logoUrl ? (
              <img src={content.brand.logoUrl} alt={content.brand.name} className="h-9 w-auto max-w-[180px] object-contain" />
            ) : (
              <span className="font-display text-2xl text-[var(--text-color)]">{content.brand.name}</span>
            )}
            <button onClick={() => setMobile(false)} className="p-2 text-[var(--muted-color)]" aria-label="Schließen">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="container-x flex flex-col gap-1 mt-8 pb-12">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={`${basePath}${n.to}`}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `py-5 text-5xl font-display border-b border-line transition-transform hover:translate-x-2 ${
                    isActive ? 'italic-pop text-brand' : 'text-[var(--text-color)]'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            {(() => {
              const nc = (content as any)?.navCta as { label?: string; href?: string } | undefined;
              const ctaLabel = (nc?.label && nc.label.trim()) || 'Termin anfragen';
              const ctaHref = (nc?.href && nc.href.trim()) || `${basePath}/kontakt`;
              return <Link to={ctaHref} className="btn-primary mt-10 self-start">{ctaLabel} <span aria-hidden>→</span></Link>;
            })()}
          </nav>
        </div>,
        document.body,
      )}
    </>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────── */
export function Hero({
  content,
  align = 'left',
  showCta = true,
  showScroll = true,
  meta,
}: {
  content: SiteContent;
  align?: 'left' | 'center';
  showCta?: boolean;
  showScroll?: boolean;
  meta?: { label: string; value: string }[];
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

  return (
    <section
      ref={ref}
      className="relative flex items-end overflow-hidden text-white grain"
      style={{ minHeight: '100vh' }}
    >
      {content.hero.imageUrl ? (
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${content.hero.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'kenburns 20s ease-in-out infinite alternate',
          }}
        />
      ) : (
        <div
          className="absolute inset-0 -z-10"
          style={{ background: `linear-gradient(135deg, var(--brand-color), color-mix(in oklab, var(--accent-color) 70%, var(--brand-color)))` }}
        />
      )}

      <div className="absolute inset-0 -z-[1] bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

      <div
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background: `radial-gradient(700px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--accent-color) 25%, transparent), transparent 60%)`,
        }}
      />

      <div className="blob -top-32 -right-32 w-[500px] h-[500px]" style={{ background: 'var(--accent-color)' }} />

      <div className={`container-x relative z-10 pt-40 pb-20 md:pb-28 ${align === 'center' ? 'text-center mx-auto' : ''}`}>
        {(content.branchText?.heroEyebrow && content.branchText.heroEyebrow.trim())
          || content.brand.tagline ? (
          <p className="inline-flex items-center gap-3 mb-7 text-xs uppercase tracking-[0.18em] text-white/85">
            <span className="inline-block w-7 h-px bg-white/60" />
            {(content.branchText?.heroEyebrow && content.branchText.heroEyebrow.trim()) || content.brand.tagline}
          </p>
        ) : null}
        <h1 className={`headline-xl ${align === 'center' ? 'mx-auto max-w-5xl' : 'max-w-5xl'}`}>
          <SplitText>{content.hero.title}</SplitText>
        </h1>
        {content.hero.subtitle ? (
          <p
            className={`mt-8 text-lg md:text-2xl text-white/85 leading-relaxed reveal-fast is-visible ${
              align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            }`}
          >
            {content.hero.subtitle}
          </p>
        ) : null}
        {(content.hero as any).body ? (
          <p
            className={`mt-5 text-base md:text-lg text-white/70 leading-relaxed reveal-fast is-visible ${
              align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            }`}
          >
            {(content.hero as any).body}
          </p>
        ) : null}
        {showCta && (content.hero.ctaLabel || (content as any).heroCta?.primaryLabel) ? (() => {
          const hc = (content as any).heroCta as { primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string } | undefined;
          const primaryLabel = hc?.primaryLabel || content.hero.ctaLabel;
          const primaryHref = hc?.primaryHref || content.hero.ctaHref || '/kontakt';
          const secondaryLabel = hc?.secondaryLabel ?? 'Mehr erfahren';
          const secondaryHref = hc?.secondaryHref || '#mehr';
          const isAnchor = secondaryHref.startsWith('#') || secondaryHref.startsWith('http');
          return (
            <div className={`mt-12 flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
              <Link to={withBase(basePath, primaryHref)} className="btn-accent">
                {primaryLabel} <span aria-hidden>→</span>
              </Link>
              {secondaryLabel ? (
                isAnchor ? (
                  <a href={secondaryHref} className="btn-outline !border-white/60 !text-white hover:!bg-white hover:!text-slate-900">
                    {secondaryLabel}
                  </a>
                ) : (
                  <Link to={withBase(basePath, secondaryHref)} className="btn-outline !border-white/60 !text-white hover:!bg-white hover:!text-slate-900">
                    {secondaryLabel}
                  </Link>
                )
              ) : null}
            </div>
          );
        })() : null}

        {meta && meta.length > 0 && (
          <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
            {meta.map((m, i) => (
              <div key={i} className="reveal-fast is-visible pl-4 border-l border-white/25">
                <p className="num-display text-3xl md:text-4xl">{m.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/60 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showScroll && (
        <a
          href="#mehr"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/90 hover:text-white hidden md:flex flex-col items-center gap-2"
          aria-label="Weiter scrollen"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-80">Scroll</span>
          <span className="block h-10 w-[1px] bg-white/40 relative overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-1/3 bg-white" style={{ animation: 'scrollLine 1.6s ease-in-out infinite' }} />
          </span>
        </a>
      )}

      <style>{`
        @keyframes kenburns { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.08) translate(-10px,-10px)} }
        @keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }
      `}</style>
    </section>
  );
}

/* ─── Section wrapper ─────────────────────────────────────────────── */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  align = 'left',
  spacing = 'lg',
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  spacing?: 'md' | 'lg' | 'xl';
}) {
  const pad = spacing === 'xl' ? 'py-28 md:py-40' : spacing === 'lg' ? 'py-24 md:py-32' : 'py-16 md:py-24';
  return (
    <section id={id} className={`relative ${pad} ${className}`}>
      <div className="container-x">
        {(title || eyebrow || subtitle) && (
          <header className={`mb-16 reveal ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
            {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
            {title ? <h2 className="headline-md">{title}</h2> : null}
            {subtitle ? <p className="mt-5 text-lg md:text-xl text-muted leading-relaxed">{subtitle}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/* ─── ContactBlock ───────────────────────────────────────────────── */
export function ContactBlock({ content, showForm = true, showMap = true, formTenant }: { content: SiteContent; showForm?: boolean; showMap?: boolean; formTenant?: string }) {
  const c = content.contact;
  // Tenant slug for /api/contact resolution. Server-side this is used to look up
  // the tenant's own SMTP config; falls back to env if absent. Brand name alone
  // is NOT a slug, so prefer the env-injected VITE_TENANT_SLUG when running on
  // a per-tenant project.
  const tenantSlug = formTenant
    || (typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_TENANT_SLUG : '')
    || '';
  const cb = ((content as any).contactBlock ?? {}) as { eyebrow?: string; title?: string; subtitle?: string };
  const eyebrow = cb.eyebrow || 'Kontakt';
  const title = cb.title || 'Wir freuen uns auf Sie.';
  const subtitle = cb.subtitle || 'Anruf, Mail oder Kaffee vor Ort – wir sind für Sie da.';
  return (
    <Section id="kontakt" className="surface" align="left">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 reveal">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 className="headline-md">{title}</h2>
          {subtitle ? <p className="mt-5 text-lg text-muted">{subtitle}</p> : null}

          <div className="mt-10 space-y-6 text-lg">
            {c.phone ? (
              <a href={`tel:${c.phone}`} className="block group">
                <p className="text-xs uppercase tracking-widest text-muted">Telefon</p>
                <p className="mt-1 text-2xl font-display group-hover:translate-x-1 transition-transform">{c.phone}</p>
              </a>
            ) : null}
            {c.email ? (
              <a href={`mailto:${c.email}`} className="block group">
                <p className="text-xs uppercase tracking-widest text-muted">E-Mail</p>
                <p className="mt-1 text-2xl font-display group-hover:translate-x-1 transition-transform">{c.email}</p>
              </a>
            ) : null}
            {c.address ? (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">Adresse</p>
                <p className="mt-1 text-xl">{c.address}{c.city ? `, ${c.city}` : ''}</p>
              </div>
            ) : null}
            {c.hours.length ? (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">Öffnungszeiten</p>
                <ul className="mt-2 max-w-md grid grid-cols-[auto,1fr] gap-x-6 gap-y-1.5">
                  {c.hours.map((h, i) => (
                    <li key={i} className="contents">
                      <span className="font-medium">{h.day}</span>
                      <span className="text-muted font-mono text-sm whitespace-nowrap">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        <div className="lg:col-span-7 reveal">
          {showForm ? (
            <div className="space-y-6">
              {(() => {
                const admin = ((content as any).formFields ?? []) as Array<{ key?: string; label?: string; type?: string; required?: boolean }>;
                const rows = admin
                  .filter((f) => f && String(f.key || '').trim() && String(f.label || '').trim())
                  .map((f) => ({
                    key: String(f.key).trim().toLowerCase(),
                    label: String(f.label).trim(),
                    type: f.type,
                    required: f.required === true,
                  }));
                return (
                  <ContactForm
                    tenant={tenantSlug || content.brand.name}
                    source={`tenant:${tenantSlug || (content.brand.name || '').toLowerCase().replace(/\s+/g, '-')}`}
                    fieldRows={rows.length ? rows : undefined}
                  />
                );
              })()}
              {showMap && (c.mapsUrl || c.address) && (
                <SafeMapEmbed mapsUrl={c.mapsUrl || ''} address={c.address || ''} city={c.city || ''} className="h-[280px]" />
              )}
            </div>
          ) : (
            showMap ? <SafeMapEmbed mapsUrl={c.mapsUrl || ''} address={c.address || ''} city={c.city || ''} className="h-[520px]" /> : null
          )}
        </div>
      </div>
    </Section>
  );
}

/* ─── Safe map embed ─────────────────────────────────────────────── */
/** Resolves a Google/OSM maps URL or street address into an iframe-safe `src`, or `''`. */
export function resolveMapIframeSrc(mapsUrl: string | undefined, address: string | undefined, city: string | undefined): string {
  const explicit = (mapsUrl || '').trim();

  // Already a usable embed URL?
  const isEmbed =
    /^https:\/\/(www\.)?google\.[^/]+\/maps\/embed/i.test(explicit) ||
    /^https:\/\/(www\.)?google\.[^/]+\/maps\?[^"]*[?&]output=embed/i.test(explicit) ||
    /^https:\/\/(www\.)?openstreetmap\.org\/export\/embed/i.test(explicit);

  // Convert common Google Maps link formats to embeddable URL:
  // - maps.app.goo.gl/... (short links)
  // - google.com/maps/place/...
  // - google.com/maps?q=...
  // - google.com/maps?ll=...
  const isGoogleLink = !isEmbed && /^https:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|(www\.)?google\.[^/]+\/maps)/i.test(explicit);

  let src: string;
  if (isEmbed) {
    src = explicit;
  } else if (isGoogleLink) {
    // Extract place name from /maps/place/NAME/ URLs for a better query
    const placeMatch = explicit.match(/\/maps\/place\/([^/@?]+)/i);
    // Extract q= parameter from URL
    const qMatch = explicit.match(/[?&]q=([^&]+)/i);
    // Extract coordinates from ll= or @lat,lng
    const llMatch = explicit.match(/[?&]ll=([-\d.]+),([-\d.]+)/i) || explicit.match(/@([-\d.]+),([-\d.]+)/i);

    if (placeMatch) {
      src = `https://www.google.com/maps?q=${placeMatch[1]}&output=embed`;
    } else if (qMatch) {
      src = `https://www.google.com/maps?q=${qMatch[1]}&output=embed`;
    } else if (llMatch) {
      src = `https://www.google.com/maps?ll=${llMatch[1]},${llMatch[2]}&z=16&output=embed`;
    } else {
      // For short links (maps.app.goo.gl) we can't resolve client-side,
      // so fall back to address-based embed
      const fullAddress = [address, city].filter(Boolean).join(', ');
      src = fullAddress
        ? `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`
        : '';
    }
  } else {
    const fullAddress = [address, city].filter(Boolean).join(', ');
    src = fullAddress
      ? `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`
      : '';
  }

  return src;
}

export function SafeMapEmbed({ mapsUrl, address, city, className = '' }: { mapsUrl?: string; address?: string; city?: string; className?: string }) {
  const explicit = (mapsUrl || '').trim();
  const src = resolveMapIframeSrc(mapsUrl, address, city);

  if (!src) return <div className={`w-full rounded-3xl bg-black/5 ${className}`} />;
  const fullAddress = [address, city].filter(Boolean).join(', ');
  const linkHref = explicit || (fullAddress ? `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}` : '');
  return (
    <div className={`rounded-3xl overflow-hidden border border-line shadow-2xl relative ${className}`}>
      <iframe title={`Karte${fullAddress ? `: ${fullAddress}` : ''}`} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full border-0" allow="fullscreen" />
      {linkHref && (
        <a href={linkHref} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-white transition shadow-sm">
          In Karte öffnen ↗
        </a>
      )}
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */
export function SiteFooter({ content, basePath: basePathProp, nav }: { content: SiteContent; basePath?: string; nav?: NavItem[] }) {
  const ctxBase = useBasePath();
  const basePath = basePathProp ?? ctxBase;
  const social = (content.social ?? {}) as {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
    x?: string;
  };

  const toUrl = (raw: string | undefined, base: string, allowAt = true): string => {
    const value = (raw || '').trim();
    if (!value) return '';
    if (/^https?:\/\//i.test(value)) return value;
    const clean = allowAt ? value.replace(/^@+/, '') : value;
    return `${base}${clean}`;
  };

  const waToUrl = (raw: string | undefined): string => {
    const value = (raw || '').trim();
    if (!value) return '';
    if (/^https?:\/\//i.test(value)) return value;
    const digits = value.replace(/[^\d]/g, '');
    return digits ? `https://wa.me/${digits}` : '';
  };

  const socialLinks = [
    { label: 'Instagram', href: toUrl(social.instagram, 'https://instagram.com/') },
    { label: 'Facebook', href: toUrl(social.facebook, 'https://facebook.com/') },
    { label: 'WhatsApp', href: waToUrl(social.whatsapp) },
    { label: 'LinkedIn', href: toUrl(social.linkedin, 'https://linkedin.com/') },
    { label: 'YouTube', href: toUrl(social.youtube, 'https://youtube.com/', false) },
    { label: 'TikTok', href: toUrl(social.tiktok, 'https://tiktok.com/') },
    { label: 'X', href: toUrl(social.x, 'https://x.com/') },
  ].filter((item) => item.href);

  return (
    <footer className="bg-brand text-white pt-24 pb-10 mt-auto relative overflow-hidden grain">
      <div className="blob -top-40 -left-40 w-[500px] h-[500px]" style={{ background: 'var(--accent-color)', opacity: 0.18 }} />

      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-10 pt-4 pb-14 border-b border-white/10">
          <div className="md:col-span-6">
            {content.brand.logoUrl ? (
              <img
                src={content.brand.logoUrl}
                alt={content.brand.name}
                className="h-12 w-auto max-w-[220px] object-contain mb-3"
              />
            ) : null}
            {!(content.brand.logoUrl && content.brand.hideName) && (
              <p className="font-display text-3xl">{content.brand.name}</p>
            )}
            {(() => {
              const footerTagline = (content as any).footer?.tagline as string | undefined;
              const tag = (footerTagline && footerTagline.trim()) || content.brand.tagline;
              return tag ? <p className="text-sm text-white/70 mt-2 max-w-sm">{tag}</p> : null;
            })()}
          </div>
          <div className="md:col-span-6 flex flex-col gap-2 md:items-end text-sm">
            {content.contact.phone ? <a href={`tel:${content.contact.phone}`} className="hover:text-accent">{content.contact.phone}</a> : null}
            {content.contact.email ? <a href={`mailto:${content.contact.email}`} className="hover:text-accent">{content.contact.email}</a> : null}
            {content.contact.address ? <p className="text-white/70">{content.contact.address}{content.contact.city ? `, ${content.contact.city}` : ''}</p> : null}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 py-16">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Kontakt</p>
            <ul className="space-y-2 text-sm">
              {content.contact.hours.length ? (
                content.contact.hours.map((h, i) => (
                  <li key={i} className="flex justify-between max-w-xs text-white/75"><span>{h.day}</span><span className="font-mono text-xs">{h.time}</span></li>
                ))
              ) : null}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Navigation</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {(nav ?? []).map((n) => (
                <li key={n.to}><Link to={`${basePath}${n.to}`} className="hover:text-accent">{n.label}</Link></li>
              ))}
              <li><Link to={`${basePath}/impressum`} className="hover:text-accent">Impressum</Link></li>
              <li><Link to={`${basePath}/datenschutz`} className="hover:text-accent">Datenschutz</Link></li>
            </ul>
          </div>
          {socialLinks.length ? (
            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Social</p>
              <ul className="space-y-2 text-sm">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <Marquee speed="slow" className="py-2">
          <span className="font-display leading-none whitespace-nowrap" style={{ fontSize: 'clamp(4rem,12vw,12rem)', color: 'rgba(255,255,255,0.08)' }}>
            {content.brand.name} · {content.brand.name} · {content.brand.name} ·
          </span>
        </Marquee>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-col md:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} {content.brand.name}. Alle Rechte vorbehalten.</span>
          <span className="font-mono">
            Made with care by{' '}
            <a
              href="https://flamingomedia.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent underline-offset-4 hover:underline"
            >
              FlamingoMedia
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export const useReveal = _useReveal;
