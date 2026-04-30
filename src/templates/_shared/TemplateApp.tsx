import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import type { SiteContent, TemplateKey, PageId } from '@/lib/types';
import { FAQ_DEFAULTS } from '@/lib/faq-defaults';
import Seo from '@/components/Seo';
import {
  SiteHeader, Hero, Section, ContactBlock, SiteFooter, BasePathProvider,
  type NavItem,
} from '@/components/site-blocks';
import {
  Accordion, AnimatedCounter, useReveal, ParallaxImage,
} from '@/components/fx';
import {
  Tilt3DCard, HoverGlow, HardShadowCard,
} from '@/components/motion-fx';
import {
  AuroraBackground, SpotlightSection, AnimatedGridPattern, MarqueeTrack, TextReveal,
} from '@/components/fx-21st';
import { TLink } from '@/components/site-blocks';
import { ConsentScripts } from '@/components/ConsentScripts';
import { Timeline } from '@/components/Timeline';
import { NewsPreview, NewsIndexPage, NewsDetailPage } from '@/components/News';
import { Imprint, Privacy } from '@/components/legal-pages';
import { MasonryLightbox } from '@/components/MasonryLightbox';
import { branchTextDefaults } from '@/lib/branch-text-defaults';
import { getOpenStatus } from '@/lib/open-hours';
import { isSectionEnabled, getEffectivePageOrder } from '@/lib/page-layout';
import { BranchSignature } from './BranchSignature';
import {
  MenuCategoriesModule,
  RoomShowcaseModule,
  TourCardsModule,
  TreatmentListModule,
  FundingCalculatorModule,
  EmergencyStickyBanner,
  BranchModulesInline,
} from '@/components/branch-modules';

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
  return FAQ_DEFAULTS[variant as keyof typeof FAQ_DEFAULTS] ?? [];
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
  const announcements = announcementsFor(variant, content);
  useReveal();

  // Tenant-overridden navigation: only kept items with non-empty label that are visible.
  const customNav = (content as any).navItems as Array<{ label: string; path: string; visible: boolean }> | undefined;
  const resolvedNav = (customNav && customNav.length)
    ? customNav.filter((n) => n.visible !== false && n.label && n.label.trim()).map((n) => ({ to: n.path, label: n.label }))
    : cfg.nav;

  return (
    <BasePathProvider value={basePath}>
      <div className={`min-h-screen flex flex-col tpl-style-${style}`}>
        <ConsentScripts scripts={(content as any).customScripts} />
        <SiteHeader content={content} nav={resolvedNav} basePath={basePath} announcements={announcements} transparentTextDark={style !== 'classic'} />
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
            <Route path="impressum" element={<Imprint content={content} />} />
            <Route path="datenschutz" element={<Privacy content={content} />} />
            <Route path="*" element={<><PageSeo page="home" variant={variant} content={content} /><HomePage variant={variant} content={content} style={style} /></>} />
          </Routes>
        </main>
        <SiteFooter content={content} basePath={basePath} nav={resolvedNav} />
        {variant === 'tradesman' && <EmergencyStickyBanner content={content} />}
      </div>
    </BasePathProvider>
  );
}

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Defensive: if any modal/lightbox/menu left body locked, restore on every navigation.
    if (typeof document !== 'undefined') document.body.style.overflow = '';
    const lenis = (window as any).__lenis as { scrollTo?: (t: any, o?: any) => void } | undefined;
    if (lenis?.scrollTo) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
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

function announcementsFor(v: TemplateVariant, content: SiteContent): string[] {
  // 1. Tenant override (admin-saved) wins.
  const overlay = (content as any).announcements as string[] | undefined;
  let base: string[];
  if (overlay && overlay.length) {
    base = overlay.filter((s) => s && s.trim());
  } else if (v === 'restaurant') base = ['Heute geöffnet', 'Tisch online reservieren', 'Saisonale Karte', 'Reservierung empfohlen'];
  else if (v === 'salon') base = ['Aktuell freie Termine', 'Bridal-Beratung kostenlos', 'Premium-Pflegepartner', 'Termin online buchen'];
  else if (v === 'hotel') base = ['Zimmer verfügbar', 'Spa & Sauna inklusive', 'Familienbetrieb', 'Direktbuchung mit Bestpreis'];
  else if (v === 'tourism') base = ['Täglich geführte Touren', 'Kleine Gruppen', 'Lizenzierte Guides', 'Mehrsprachig'];
  else base = ['24/7 Notdienst', 'Förderberatung inklusive', 'Festpreis-Garantie', 'Meisterbetrieb'];

  // 2. Auto-prepend a real "Heute geöffnet · HH:MM – HH:MM" indicator when
  //    the tenant has structured opening hours we can parse.
  try {
    const status = getOpenStatus(content.contact?.hours);
    if (status.todayLabel) {
      const live = status.isOpen
        ? `Heute geöffnet · ${status.todayFull ?? status.todayLabel}`
        : `Heute · ${status.todayFull ?? status.todayLabel}`;
      // De-duplicate against any tenant string that already mentions "heute"/"geöffnet".
      const filtered = base.filter((s) => !/heute|geöffnet|aktuell offen|jetzt offen/i.test(s));
      return [live, ...filtered];
    }
  } catch {
    /* parse failed — fall through to plain announcements */
  }
  return base;
}

/* ─── Home ─────────────────────────────────────────────────────────── */
function HomePage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  if (style === 'modern') return <HomePageModern variant={variant} content={content} />;
  if (style === 'bold') return <HomePageBold variant={variant} content={content} />;
  return <HomePageClassic variant={variant} content={content} />;
}

/** Per-tenant visibility check. Defaults to true when no flag is set. */
function isSectionVisible(content: SiteContent, key: string): boolean {
  return isSectionEnabled(content, 'home', key);
}

/** Pull a per-page header override from `content` extras (set by admin's PageHeaderEditor). */
function pageHeaderOverride(content: SiteContent, key: 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader' | 'newsHeader'): { eyebrow: string; title: string; subtitle: string } | null {
  const v = (content as any)[key];
  if (!v || typeof v !== 'object') return null;
  return { eyebrow: String(v.eyebrow || ''), title: String(v.title || ''), subtitle: String(v.subtitle || '') };
}

/**
 * BRANCH_STYLE_ORDER — full 5×3 = 15 distinct section flows.
 * Each (variant, style) tells a different narrative arc, so Restaurant/Classic
 * does NOT look like Restaurant/Modern, and Hotel/Bold does NOT look like Hotel/Classic.
 */
const BRANCH_STYLE_ORDER: Record<TemplateVariant, Record<TemplateStyle, string[]>> = {
  restaurant: {
    classic: ['action', 'signature', 'about', 'gallery', 'numbers', 'testimonials', 'news'],
    modern:  ['action', 'services', 'signature', 'about', 'gallery', 'testimonials', 'numbers', 'news'],
    bold:    ['action', 'signature', 'numbers', 'gallery', 'about', 'testimonials', 'news'],
  },
  hotel: {
    classic: ['action', 'signature', 'about', 'gallery', 'testimonials', 'numbers', 'news'],
    modern:  ['action', 'gallery', 'signature', 'about', 'numbers', 'testimonials', 'news'],
    bold:    ['action', 'gallery', 'signature', 'numbers', 'about', 'testimonials', 'news'],
  },
  tradesman: {
    classic: ['action', 'services', 'funding', 'numbers', 'gallery', 'signature', 'testimonials', 'about', 'news'],
    modern:  ['action', 'numbers', 'services', 'funding', 'signature', 'gallery', 'about', 'testimonials', 'news'],
    bold:    ['action', 'services', 'funding', 'signature', 'gallery', 'numbers', 'about', 'testimonials', 'news'],
  },
  salon: {
    classic: ['action', 'signature', 'gallery', 'about', 'testimonials', 'numbers', 'news'],
    modern:  ['action', 'signature', 'gallery', 'testimonials', 'about', 'numbers', 'news'],
    bold:    ['action', 'gallery', 'signature', 'about', 'numbers', 'testimonials', 'news'],
  },
  tourism: {
    classic: ['action', 'gallery', 'signature', 'about', 'testimonials', 'numbers', 'news'],
    modern:  ['action', 'signature', 'gallery', 'numbers', 'about', 'testimonials', 'news'],
    bold:    ['action', 'gallery', 'numbers', 'signature', 'about', 'testimonials', 'news'],
  },
};

function HomePageClassic({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const cfg = NAV_BY_VARIANT[variant];
  const featuredServices = content.services.slice(0, 3);
  const featuredGallery = content.gallery.slice(0, 7);
  const heroMeta = resolveHeroMeta(variant, content);
  const customHomeOrder = ((content as any).sectionOrder ?? {}).home as string[] | undefined;
  const baseOrder = customHomeOrder && customHomeOrder.length ? customHomeOrder : BRANCH_STYLE_ORDER[variant].classic;
  const order = baseOrder.filter((k) => isSectionVisible(content, k));

  const blocks: Record<string, JSX.Element | null> = {
    action: <BranchActionStrip variant={variant} content={content} />,
    signature: <BranchSignature variant={variant} style="classic" content={content} />,
    numbers: <NumbersBand variant={variant} content={content} />,
    news: <NewsPreview content={content} eyebrow={content.branchText?.newsEyebrow || 'Aktuelles'} title={content.branchText?.newsTitle || 'News & Notizen.'} />,
    // branch-specific modules
    menu: variant === 'restaurant' ? <MenuCategoriesModule content={content} /> : null,
    rooms: variant === 'hotel' ? <RoomShowcaseModule content={content} /> : null,
    tours: variant === 'tourism' ? <TourCardsModule content={content} /> : null,
    treatments: variant === 'salon' ? <TreatmentListModule content={content} /> : null,
    funding: variant === 'tradesman' ? <FundingCalculatorModule content={content} /> : null,
    about: content.about?.body ? (
      <Section
        eyebrow={effectiveBranchText(variant, content).aboutTeaserEyebrow}
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
            <TLink to={effectiveBranchText(variant, content).learnMoreHref || '/ueber-uns'} className="btn-outline mt-6 reveal">{effectiveBranchText(variant, content).learnMoreLabel} <span aria-hidden>→</span></TLink>
          </div>
        </div>
      </Section>
    ) : null,
    services: featuredServices.length > 0 ? (
      <Section
        eyebrow={effectiveBranchText(variant, content).servicesTeaserEyebrow || cfg.servicesEyebrow}
        title={<>{splitTitle(cfg.servicesHeadline)}</>}
        subtitle={subtitleFor(variant, content)}
        className={variant === 'tradesman' ? 'bg-brand text-white' : 'surface'}
      >
        <ClassicServicesGrid services={featuredServices} />
        <div className="mt-12 reveal">
          <TLink to={cfg.servicesPath} className={variant === 'tradesman' ? 'btn-accent' : 'btn-primary'}>Alle {cfg.servicesLabel} <span aria-hidden>→</span></TLink>
        </div>
      </Section>
    ) : null,
    gallery: featuredGallery.length > 0 ? (
      <Section eyebrow={effectiveBranchText(variant, content).galleryTeaserEyebrow} title={galleryTeaserTitle(variant, content)} spacing="lg">
        <GalleryShowcase variant={variant} images={featuredGallery} mode="teaser" />
        <div className="mt-12 reveal">
          <TLink to={variant === 'tradesman' ? '/referenzen' : variant === 'hotel' ? '/zimmer' : variant === 'tourism' ? '/touren' : '/galerie'} className="btn-outline">{effectiveBranchText(variant, content).galleryAllLabel} <span aria-hidden>→</span></TLink>
        </div>
      </Section>
    ) : null,
    testimonials: content.testimonials.length > 0 ? (
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
    ) : null,
  };

  return (
    <>
      <Hero content={content} meta={heroMeta} />
      {order.map((key) => (
        <React.Fragment key={key}>{blocks[key]}</React.Fragment>
      ))}
      {isSectionVisible(content, 'softCta') && <CtaBand variant={variant} content={content} />}
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

  const customHomeOrder = ((content as any).sectionOrder ?? {}).home as string[] | undefined;
  const baseOrder = customHomeOrder && customHomeOrder.length ? customHomeOrder : BRANCH_STYLE_ORDER[variant].modern;
  const order = baseOrder.filter((k) => isSectionVisible(content, k));

  const blocks: Record<string, JSX.Element | null> = {
    action: <BranchActionStrip variant={variant} content={content} />,
    signature: <BranchSignature variant={variant} style="modern" content={content} />,
    numbers: <NumbersBand variant={variant} content={content} />,
    news: <NewsPreview content={content} eyebrow={content.branchText?.newsEyebrow || 'Aktuelles'} title={content.branchText?.newsTitle || 'News & Notizen.'} />,
    menu: variant === 'restaurant' ? <MenuCategoriesModule content={content} /> : null,
    rooms: variant === 'hotel' ? <RoomShowcaseModule content={content} /> : null,
    tours: variant === 'tourism' ? <TourCardsModule content={content} /> : null,
    treatments: variant === 'salon' ? <TreatmentListModule content={content} /> : null,
    funding: variant === 'tradesman' ? <FundingCalculatorModule content={content} /> : null,
    services: featuredServices.length > 0 ? (
      <SpotlightSection as="div" color="rgba(242,65,113,0.16)" size={620} className="surface">
        <Section eyebrow={effectiveBranchText(variant, content).servicesTeaserEyebrow || cfg.servicesEyebrow} title={<>{splitTitle(cfg.servicesHeadline)}</>} subtitle={subtitleFor(variant, content)}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
            {featuredServices.map((s, i) => (
              <Tilt3DCard key={i} max={5} className="rounded-2xl">
                <article className="bg-white border border-line rounded-2xl overflow-hidden hover-lift h-full flex flex-col">
                  {s.imageUrl ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ) : null}
                  <div className="p-7 flex-1">
                    <div className="h-10 w-10 rounded-xl bg-[var(--accent-color)]/15 grid place-items-center text-brand">
                      <span className="font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-display text-xl mt-5">{s.title}</h3>
                    {s.description && <p className="mt-3 text-sm text-muted leading-relaxed">{s.description}</p>}
                    {s.price && <p className="mt-4 font-mono text-xs text-brand">{s.price}</p>}
                  </div>
                </article>
              </Tilt3DCard>
            ))}
          </div>
          <div className="mt-12 reveal">
            <TLink to={cfg.servicesPath} className="btn-primary">Alle {cfg.servicesLabel} <span aria-hidden>→</span></TLink>
          </div>
        </Section>
      </SpotlightSection>
    ) : null,
    logos: (() => {
      const overlay = ((content as any).logos as string[] | undefined)?.filter((s) => s && s.trim());
      const fallback =
        variant === 'restaurant' ? ['Falstaff', 'Tageszeitung', 'À la Carte', 'Genuss', 'Slow Food']
        : variant === 'salon' ? ['Kérastase', 'Olaplex', 'Davines', 'Aveda', 'OPI']
        : variant === 'hotel' ? ['Falstaff', 'Relais & Châteaux', 'GaultMillau', 'Tripadvisor', 'Booking']
        : variant === 'tourism' ? ['Tirol Werbung', 'Bergführer-Verband', 'ÖAV', 'GeoPark', 'Slow Tourism']
        : ['HWK', 'Innung', 'KfW Partner', 'Viessmann', 'BAFA'];
      const list = overlay && overlay.length ? overlay : fallback;
      if (!list.length) return null;
      return (
        <section className="py-14 border-y border-line">
          <div className="container-x flex flex-wrap items-center justify-between gap-y-6 gap-x-10 opacity-70">
            {list.map((n) => (<span key={n} className="font-display text-2xl tracking-wide">{n}</span>))}
          </div>
        </section>
      );
    })(),
    about: content.about?.body ? (
      <Section eyebrow={effectiveBranchText(variant, content).aboutTeaserEyebrow || 'Über uns'} title={<>{splitTitle(content.about.title || 'Über uns')}</>}>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="prose-lite reveal">
            {(content.about.body || '').split('\n\n').slice(0, 2).map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted mb-5">{p}</p>
            ))}
            <TLink to={effectiveBranchText(variant, content).learnMoreHref || '/ueber-uns'} className="btn-outline mt-2">{effectiveBranchText(variant, content).learnMoreLabel} <span aria-hidden>→</span></TLink>
          </div>
          {content.about.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-line aspect-[4/3] reveal">
              <img src={content.about.imageUrl} alt={content.about.title || content.brand.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
          )}
        </div>
      </Section>
    ) : null,
    gallery: featuredGallery.length > 0 ? (
      <Section eyebrow={effectiveBranchText(variant, content).galleryTeaserEyebrow} title={galleryTeaserTitle(variant, content)} className="surface">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 reveal-stagger">
          {featuredGallery.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl img-zoom">
              <img src={src} alt={`${content.brand.name} – Eindruck ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="mt-10 reveal">
          <TLink to={variant === 'tradesman' ? '/referenzen' : '/galerie'} className="btn-outline">Alles ansehen <span aria-hidden>→</span></TLink>
        </div>
      </Section>
    ) : null,
    faq: (
      <Section eyebrow={effectiveBranchText(variant, content).faqEyebrow} title={splitTitle(effectiveBranchText(variant, content).faqTitle)}>
        <Accordion items={resolveFaq(variant, content).slice(0, 4).map((f) => ({ q: f.q, a: f.a }))} className="max-w-3xl" />
      </Section>
    ),
    testimonials: content.testimonials.length > 0 ? (
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
    ) : null,
  };

  return (
    <>
      {/* Split hero – text left, framed image right, with aurora + dot grid backdrop */}
      <section className="pt-44 pb-20 md:pb-28 relative overflow-hidden">
        <AuroraBackground intensity={0.18} colors={['var(--accent-color)', '#FFB347', '#7C3AED', '#22d3ee']} />
        <AnimatedGridPattern className="text-brand/[0.07]" width={40} height={40} dotSize={1.2} />
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-6 reveal">
            <p className="eyebrow mb-5">{content.brand.tagline || 'Willkommen'}</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] tracking-tight">
              <TextReveal text={content.hero?.title || ((content.brand.hideName && content.brand.logoUrl) ? '' : (content.brand.name + '.'))} />
              {content.hero?.subtitle ? (
                <>
                  <br />
                  <span className="text-muted"><TextReveal text={content.hero.subtitle} /></span>
                </>
              ) : null}
            </h1>
            <p className="mt-8 text-lg text-muted max-w-xl">{heroBodyFor(variant, content)}</p>
            {(() => {
              const hc = (content as any).heroCta as { primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string } | undefined;
              const primaryLabel = hc?.primaryLabel || content.hero.ctaLabel || 'Kontakt aufnehmen';
              const primaryHref = hc?.primaryHref || content.hero.ctaHref || '/kontakt';
              const secondaryLabel = hc?.secondaryLabel ?? `${cfg.servicesLabel} ansehen`;
              const secondaryHref = hc?.secondaryHref || cfg.servicesPath;
              return (
                <div className="mt-10 flex flex-wrap gap-3">
                  <TLink to={primaryHref} className="btn-primary">{primaryLabel} <span aria-hidden>→</span></TLink>
                  {secondaryLabel ? (
                    <TLink to={secondaryHref} className="btn-outline">{secondaryLabel}</TLink>
                  ) : null}
                </div>
              );
            })()}
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
      {order.map((key) => (
        <React.Fragment key={key}>{blocks[key]}</React.Fragment>
      ))}
      {isSectionVisible(content, 'softCta') && <SoftCtaBlock variant={variant} content={content} style="modern" />}
    </>
  );
}

/* ─── Home: Bold (magazine/poster) ───────────────────────────────── */
function HomePageBold({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const cfg = NAV_BY_VARIANT[variant];
  const featuredServices = content.services.slice(0, 8);
  const featuredGallery = content.gallery.slice(0, 12);
  const heroImg = content.hero?.imageUrl || content.gallery[0];

  const customHomeOrder = ((content as any).sectionOrder ?? {}).home as string[] | undefined;
  const baseOrder = customHomeOrder && customHomeOrder.length ? customHomeOrder : BRANCH_STYLE_ORDER[variant].bold;
  const order = baseOrder.filter((k) => isSectionVisible(content, k));

  const blocks: Record<string, JSX.Element | null> = {
    action: <BranchActionStrip variant={variant} content={content} />,
    signature: <BranchSignature variant={variant} style="bold" content={content} />,
    numbers: <NumbersBand variant={variant} content={content} />,
    news: <NewsPreview content={content} eyebrow={content.branchText?.newsEyebrow || 'Aktuelles'} title={content.branchText?.newsTitle || 'Notizen.'} />,
    menu: variant === 'restaurant' ? <MenuCategoriesModule content={content} /> : null,
    rooms: variant === 'hotel' ? <RoomShowcaseModule content={content} /> : null,
    tours: variant === 'tourism' ? <TourCardsModule content={content} /> : null,
    treatments: variant === 'salon' ? <TreatmentListModule content={content} /> : null,
    funding: variant === 'tradesman' ? <FundingCalculatorModule content={content} /> : null,
    about: (
      <section className="py-24 md:py-36">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 md:col-start-2">
            <p className="eyebrow mb-5 reveal">{effectiveBranchText(variant, content).manifestEyebrow}</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] reveal">
              {splitTitle(content.about?.title || effectiveBranchText(variant, content).manifestTitle)}
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-14 reveal">
            {(content.about?.body || subtitleFor(variant, content)).split('\n\n').slice(0, 2).map((p, i) => (
              <p key={i} className="text-lg md:text-xl leading-relaxed mb-5">{p}</p>
            ))}
            <TLink to={effectiveBranchText(variant, content).learnMoreHref || '/ueber-uns'} className="link-underline mt-2 inline-flex">{effectiveBranchText(variant, content).learnMoreLabel} <span aria-hidden>→</span></TLink>
          </div>
        </div>
      </section>
    ),
    services: featuredServices.length > 0 ? (
      <section className="py-24 md:py-36 bg-brand text-white">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow mb-4 !text-white/70">{effectiveBranchText(variant, content).servicesTeaserEyebrow || cfg.servicesEyebrow}</p>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">{splitTitle(cfg.servicesHeadline)}</h2>
            </div>
            <TLink to={effectiveBranchText(variant, content).servicesAllHref || cfg.servicesPath} className="btn-accent hidden md:inline-flex">{effectiveBranchText(variant, content).servicesAllLabel} <span aria-hidden>→</span></TLink>
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
    ) : null,
    gallery: featuredGallery.length > 0 ? (
      <section className="py-24 md:py-36">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-4">{effectiveBranchText(variant, content).galleryTeaserEyebrow}</p>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">{galleryTeaserTitle(variant, content)}</h2>
            </div>
            <TLink to={variant === 'tradesman' ? '/referenzen' : '/galerie'} className="link-underline hidden md:inline-flex">{effectiveBranchText(variant, content).galleryAllLabel} <span aria-hidden>→</span></TLink>
          </div>
          <MasonryGrid images={featuredGallery} />
        </div>
      </section>
    ) : null,
    testimonials: content.testimonials.length > 0 ? (
      <>
        <div className="py-8 bg-[var(--accent-color)] text-[var(--accent-fg)] border-y border-brand/20">
          <MarqueeTrack speed={50}>
            <span className="inline-flex items-center gap-10 font-display text-5xl md:text-7xl whitespace-nowrap uppercase tracking-tight">
              <span>Stimmen</span><span className="opacity-50">/</span>
              <span>Ehrliche Worte</span><span className="opacity-50">/</span>
              <span>Vertrauen</span><span className="opacity-50">/</span>
              <span>Stimmen</span><span className="opacity-50">/</span>
            </span>
          </MarqueeTrack>
        </div>
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
    ) : null,
  };

  return (
    <>
      {/* Type-driven full-bleed hero */}
      <section className="pt-40 pb-10 grain relative overflow-hidden">
        <AuroraBackground intensity={0.22} colors={['var(--accent-color)', '#FFB347', '#22d3ee', '#7C3AED']} />
        <div className="container-x relative">
          <p className="eyebrow mb-6 reveal">{effectiveBranchText(variant, content).heroEyebrow || content.brand.tagline || cfg.servicesEyebrow}</p>
          <h1 className="reveal font-display tracking-tighter leading-[0.85] text-[clamp(2.5rem,13vw,180px)] md:text-[14vw] lg:text-[180px] break-words [overflow-wrap:anywhere] [hyphens:auto]">
            {(content.hero?.title || ((content.brand.hideName && content.brand.logoUrl) ? '' : content.brand.name)).toUpperCase()}
          </h1>
        </div>
        {/* Smooth brand strip */}
        <div className="mt-10 border-y border-line py-4 bg-white">
          <MarqueeTrack speed={45}>
            <span className="inline-flex items-center gap-10 font-display text-5xl md:text-7xl whitespace-nowrap text-brand">
              {marqueeWordsFor(variant, content).concat(marqueeWordsFor(variant, content)).map((w, i) => (
                <span key={i} className="inline-flex items-center gap-10">
                  <span>{w}</span><span className="text-[var(--accent-color)]">●</span>
                </span>
              ))}
            </span>
          </MarqueeTrack>
        </div>
        {heroImg && (
          <div className="container-x mt-12 reveal">
            <div className="aspect-[21/9] overflow-hidden rounded-none">
              <img src={heroImg} alt={content.brand.name} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </section>
      {order.map((key) => (
        <React.Fragment key={key}>{blocks[key]}</React.Fragment>
      ))}
      {isSectionVisible(content, 'softCta') && <SoftCtaBlock variant={variant} content={content} style="bold" />}
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
            {s.imageUrl ? (
              <div className="-mx-7 -mt-7 mb-5 aspect-[4/3] overflow-hidden rounded-t-2xl">
                <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-xl bg-[var(--accent-color)]/15 grid place-items-center text-brand">
                <span className="font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
              </div>
            )}
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
          className="grid md:grid-cols-12 gap-6 py-8 items-center group transition-transform hover:translate-x-1"
        >
          <span className="md:col-span-1 font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</span>
          {s.imageUrl ? (
            <div className="md:col-span-2 aspect-[4/3] overflow-hidden rounded-xl">
              <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ) : (
            <span className="hidden md:block md:col-span-2" aria-hidden />
          )}
          <h3 className="md:col-span-4 font-display text-3xl md:text-5xl leading-[0.95] tracking-tight uppercase">
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
          {s.imageUrl ? (
            <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6">
              <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ) : null}
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
  return <MasonryLightbox images={images} />;
}

function MasonryGrid({ images }: { images: string[] }) {
  return <MasonryLightbox images={images} />;
}

/* Branch-specific action strip — sits right under Hero to make each branch feel different. */
/**
 * Default texts for the action strip — one set per branch.
 * Admins can override every field via content.homeStrip.
 */
function defaultHomeStrip(variant: TemplateVariant): {
  tone: 'light' | 'dark';
  eyebrow: string;
  hint: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
} {
  if (variant === 'restaurant') return { tone: 'light', eyebrow: 'Heute geöffnet', hint: '', primaryLabel: 'Tisch reservieren', primaryHref: 'tel:', secondaryLabel: 'Speisekarte ansehen', secondaryHref: '/speisekarte' };
  if (variant === 'hotel') return { tone: 'light', eyebrow: 'Direkt-Anfrage', hint: 'Persönliche Beratung · Antwort innerhalb eines Werktages', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Zimmer anfragen →', secondaryHref: '/kontakt' };
  if (variant === 'tradesman') return { tone: 'dark', eyebrow: '24/7 Notdienst verfügbar', hint: 'Wir kommen schnell — versprochen.', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Anfrage senden', secondaryHref: '/kontakt' };
  if (variant === 'salon') return { tone: 'light', eyebrow: 'Termine online', hint: 'Frei wählbar · Stornierung kostenlos bis 24 h vorher', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Termin buchen →', secondaryHref: '/kontakt' };
  if (variant === 'tourism') return { tone: 'dark', eyebrow: 'Nächste Tour', hint: '', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Tour buchen →', secondaryHref: '/touren' };
  return { tone: 'light', eyebrow: 'Jetzt Kontakt aufnehmen', hint: 'Wir freuen uns auf Ihre Nachricht.', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Anfrage senden', secondaryHref: '/kontakt' };
}

function BranchActionStrip({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const phone = content.contact.phone || '';
  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '#';
  const def = defaultHomeStrip(variant);
  // Strip empty-string overrides so the per-variant default keeps winning.
  const overlay = Object.fromEntries(
    Object.entries(((content as any).homeStrip || {}) as Record<string, unknown>)
      .filter(([, val]) => (typeof val === 'string' ? val.trim() !== '' : val != null))
  );
  const cfg = { ...def, ...overlay } as ReturnType<typeof defaultHomeStrip> & { eyebrowAuto?: boolean };

  // Auto-eyebrow: when enabled (default) and we can parse opening hours,
  // override the eyebrow with a live "Heute geöffnet · HH:MM – HH:MM"
  // indicator. Falls back silently to the manual eyebrow on parse failure.
  const auto = (content as any).homeStrip?.eyebrowAuto !== false;
  let liveEyebrow: string | null = null;
  let liveIsOpen = false;
  if (auto) {
    try {
      const status = getOpenStatus(content.contact?.hours);
      if (status.todayFull) {
        liveEyebrow = status.isOpen
          ? `Heute geöffnet · ${status.todayFull}`
          : 'Heute geschlossen';
        liveIsOpen = status.isOpen;
      }
    } catch { /* ignore — fall back to manual eyebrow */ }
  }
  const eyebrowText = liveEyebrow ?? cfg.eyebrow;

  // Resolve a maybe-empty href; "tel:" placeholder turns into the real phone link.
  const resolveHref = (href: string) => (href === 'tel:' ? phoneHref : href);

  // Hide the strip entirely if everything is blanked out.
  if (!eyebrowText && !cfg.hint && !cfg.primaryLabel && !cfg.secondaryLabel && !phone) return null;

  const tone = cfg.tone === 'dark' ? 'bg-brand text-white border-white/10' : 'bg-white border-line';
  const dotColor = cfg.tone === 'dark'
    ? 'bg-[var(--accent-color)]'
    : (liveEyebrow && !liveIsOpen ? 'bg-stone-400' : 'bg-emerald-500');
  const hintColor = cfg.tone === 'dark' ? 'text-white/70' : 'text-muted';
  const eyebrowColor = cfg.tone === 'dark' ? 'text-white' : 'text-brand';

  // Restaurant special: also surface today's opening hours alongside eyebrow.
  // Skip when the auto-eyebrow already shows today's hours.
  let todayInfo: React.ReactNode = null;
  if (variant === 'restaurant' && !liveEyebrow) {
    const today = new Date().toLocaleDateString('de-DE', { weekday: 'long' });
    const todayRow = (content.contact.hours || []).find((h) => h.day.toLowerCase().includes(today.toLowerCase().slice(0, 2)));
    if (todayRow) todayInfo = <span className="text-muted">{todayRow.day} · <span className="font-medium text-brand">{todayRow.time}</span></span>;
  }

  return (
    <section className={`border-y ${tone}`}>
      <div className="container-x py-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
        {eyebrowText && (
          <span className={`inline-flex items-center gap-2 font-mono uppercase tracking-widest text-xs ${eyebrowColor}`}>
            <span className={`h-2 w-2 rounded-full ${dotColor} ${liveIsOpen || variant === 'restaurant' ? 'animate-pulse' : ''}`} /> {eyebrowText}
          </span>
        )}
        {todayInfo}
        {cfg.hint && <span className={`hidden md:inline ${hintColor}`}>{cfg.hint}</span>}
        <span className="ml-auto flex flex-wrap gap-3 items-center">
          {phone && cfg.primaryHref === 'tel:' && (
            <a href={phoneHref} className={cfg.tone === 'dark' && variant === 'tradesman' ? 'font-display text-2xl md:text-3xl tracking-tight hover:text-[var(--accent-color)] transition-colors' : 'btn-outline !py-2 !px-4 !text-xs'}>
              {cfg.primaryLabel ? `${cfg.primaryLabel} ${phone}` : phone}
            </a>
          )}
          {cfg.primaryLabel && cfg.primaryHref !== 'tel:' && (
            <a href={resolveHref(cfg.primaryHref)} className="btn-outline !py-2 !px-4 !text-xs">{cfg.primaryLabel}</a>
          )}
          {cfg.secondaryLabel && (
            <TLink to={resolveHref(cfg.secondaryHref)} className={cfg.tone === 'dark' ? 'btn-accent !py-2 !px-4 !text-xs' : 'btn-primary !py-2 !px-4 !text-xs'}>
              {cfg.secondaryLabel}
            </TLink>
          )}
        </span>
      </div>
    </section>
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

function CtaBand({ variant, content }: { variant: TemplateVariant; content?: SiteContent }) {
  const text: Record<TemplateVariant, { lead: string; cta: string; sub: string }> = {
    restaurant: { lead: 'Hunger?', cta: 'Tisch reservieren', sub: 'Wir freuen uns, Sie an unserem Tisch begrüßen zu dürfen.' },
    salon: { lead: 'Bereit für etwas Neues?', cta: 'Termin buchen', sub: 'Wir nehmen uns die Zeit – für Sie, für Ihren Look.' },
    tradesman: { lead: 'Etwas tropft?', cta: 'Jetzt anfragen', sub: 'Wir melden uns innerhalb von 24 Stunden mit einem Festpreis-Angebot.' },
    hotel: { lead: 'Pause buchen?', cta: 'Zimmer anfragen', sub: 'Wir antworten persönlich – ohne Formularkette, mit allen Optionen für Ihren Aufenthalt.' },
    tourism: { lead: 'Auf in die Berge?', cta: 'Tour buchen', sub: 'Wir beraten ehrlich, welche Tour zu Ihrer Gruppe und Saison passt.' },
  };
  const def = text[variant];
  const ov = (content as any)?.ctaBandOverride as { lead?: string; sub?: string; cta?: string; ctaHref?: string; eyebrow?: string; leadAccent?: string } | undefined;
  const t = {
    eyebrow: (ov?.eyebrow && ov.eyebrow.trim()) || 'Bereit?',
    lead: (ov?.lead && ov.lead.trim()) || def.lead,
    leadAccent: (ov?.leadAccent && ov.leadAccent.trim()) || 'Schreiben Sie uns.',
    sub: (ov?.sub && ov.sub.trim()) || def.sub,
    cta: (ov?.cta && ov.cta.trim()) || def.cta,
    ctaHref: (ov?.ctaHref && ov.ctaHref.trim()) || '/kontakt',
  };
  return (
    <section className="py-32 md:py-44 surface relative overflow-hidden">
      <div className="container-x text-center max-w-3xl mx-auto reveal">
        {t.eyebrow ? <p className="eyebrow mb-5 justify-center">{t.eyebrow}</p> : null}
        <h2 className="headline-xl">
          {t.lead}{t.leadAccent ? <><br /><em className="italic-pop">{t.leadAccent}</em></> : null}
        </h2>
        <p className="mt-8 text-lg md:text-xl text-muted">{t.sub}</p>
        <div className="mt-12">
          <TLink to={t.ctaHref} className="btn-primary">{t.cta} <span aria-hidden>→</span></TLink>
        </div>
      </div>
    </section>
  );
}

function SoftCtaBlock({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: 'modern' | 'bold' }) {
  const ov = (content as any)?.ctaBandOverride as { lead?: string; sub?: string; cta?: string; ctaHref?: string } | undefined;
  const bt = effectiveBranchText(variant, content);
  const boldFallbackTitle = variant === 'restaurant' ? 'Tisch frei?' : variant === 'salon' ? 'Termin?' : variant === 'hotel' ? 'Pause buchen?' : variant === 'tourism' ? 'Tour buchen?' : 'Auftrag?';
  const title = (ov?.lead && ov.lead.trim()) || (bt.softCtaTitle && bt.softCtaTitle.trim()) || (style === 'bold' ? boldFallbackTitle : '');
  const sub = (ov?.sub && ov.sub.trim()) || (bt.softCtaText && bt.softCtaText.trim()) || (style === 'bold' ? 'Schreiben Sie uns. Wir antworten.' : '');
  const cta = (ov?.cta && ov.cta.trim()) || (bt.softCtaButton && bt.softCtaButton.trim()) || (style === 'bold' ? 'Jetzt Kontakt' : '');
  const href = (ov?.ctaHref && ov.ctaHref.trim()) || '/kontakt';
  if (style === 'modern') {
    return (
      <section className="py-24 surface">
        <div className="container-x">
          <div className="rounded-3xl bg-white border border-line p-10 md:p-14 text-center reveal">
            <p className="eyebrow justify-center mb-4">{bt.softCtaEyebrow}</p>
            <h2 className="headline-lg">{title}</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto">{sub}</p>
            <TLink to={href} className="btn-primary mt-8">{cta} <span aria-hidden>→</span></TLink>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-32 md:py-44 bg-[var(--accent-color)] text-brand grain">
      <div className="container-x text-center reveal">
        <h2 className="font-display text-6xl md:text-8xl leading-[0.95]">{title}</h2>
        <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto">{sub}</p>
        <TLink to={href} className="btn-primary mt-10">{cta} <span aria-hidden>→</span></TLink>
      </div>
    </section>
  );
}

/* ─── Services / Speisekarte / Leistungen ────────────────────────── */
function ServicesPage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  const cfg = NAV_BY_VARIANT[variant];
  const order = getEffectivePageOrder(content, 'services', variant).filter((k) => isSectionEnabled(content, 'services', k));
  const blocks: Record<string, JSX.Element | null> = {
    highlights: <ServiceHighlights variant={variant} content={content} />,
    list: (
      <Section spacing="lg" className={style === 'modern' ? 'surface' : ''}>
        {style === 'bold' ? (
          <BoldServicesList services={content.services} />
        ) : style === 'modern' ? (
          <ModernServicesGrid services={content.services} />
        ) : (
          <ServicesShowcase variant={variant} services={content.services} />
        )}
      </Section>
    ),
    module: <BranchModulesInline variant={variant} content={content} />,
    process: <ServiceProcess variant={variant} content={content} />,
    testimonials: content.testimonials.length > 0 ? (
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
    ) : null,
    gallery: content.gallery.length > 0 ? (
      <Section eyebrow={effectiveBranchText(variant, content).galleryTeaserEyebrow} title={galleryTeaserTitle(variant, content)}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 reveal-stagger">
          {content.gallery.slice(0, 8).map((src, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden img-zoom">
              <img src={src} alt={`${content.brand.name} – Bild ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </Section>
    ) : null,
    faq: (
      <Section eyebrow={effectiveBranchText(variant, content).faqEyebrow} title={splitTitle(effectiveBranchText(variant, content).faqTitle)} className="surface">
        <Accordion items={resolveFaq(variant, content).map((f) => ({ q: f.q, a: f.a }))} className="max-w-3xl" />
      </Section>
    ),
    cta: <CtaBand variant={variant} content={content} />,
  };
  const headerOverride = pageHeaderOverride(content, 'servicesHeader');
  return (
    <>
      <PageHero
        eyebrow={(headerOverride?.eyebrow || cfg.servicesEyebrow)}
        title={headerOverride?.title || cfg.servicesHeadline}
        subtitle={headerOverride?.subtitle || subtitleFor(variant, content)}
        style={style}
        image={style === 'modern' ? content.gallery[2] || content.gallery[0] : undefined}
      />
      {order.map((k) => <React.Fragment key={k}>{blocks[k] ?? null}</React.Fragment>)}
    </>
  );
}

function ServiceHighlights({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const overlay = (content as any).serviceHighlights as { t: string; d: string }[] | undefined;
  const fallbacks: Record<TemplateVariant, { t: string; d: string }[]> = {
    restaurant: [
      { t: 'Saisonale Karte', d: 'Wechselt mit den Jahreszeiten – schauen Sie immer wieder rein.' },
      { t: 'Hausgemachte Pasta', d: 'Täglich frisch gezogen, nach traditioneller Rezeptur.' },
      { t: 'Wein vom Winzer', d: 'Sorgfältig kuratierte Auswahl, gerne mit Beratung.' },
      { t: 'Allergene gekennzeichnet', d: 'Klar markiert in der Karte. Auf Wunsch passen wir Gerichte an.' },
    ],
    salon: [
      { t: 'Kostenlose Beratung', d: 'Kurzes Gespräch vor Ihrem ersten Termin – in Ruhe und ehrlich.' },
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
      { t: 'Spa inklusive', d: 'Sauna, Dampfbad und Außenpool stehen Hausgästen zur Verfügung.' },
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
  const list = overlay && overlay.length ? overlay.filter((it) => it.t || it.d) : fallbacks[variant];
  if (!list.length) return null;
  return (
    <section className="py-10 surface border-y border-line">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-5">
        {list.map((it, i) => (
          <div key={i} className="reveal">
            <p className="font-display text-xl">{it.t}</p>
            <p className="mt-1 text-sm text-muted leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceProcess({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const overlay = (content as any).serviceProcess as { t: string; d: string }[] | undefined;
  const fallbacks: Record<TemplateVariant, { t: string; d: string }[]> = {
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
  const list = overlay && overlay.length ? overlay.filter((s) => s.t || s.d) : fallbacks[variant];
  if (!list.length) return null;
  return (
    <Section eyebrow={effectiveBranchText(variant, content).processEyebrow || 'So läuft es ab'} title={<>{splitTitle(effectiveBranchText(variant, content).processTitle || 'In vier Schritten.')}</>}>
      <ol className="grid md:grid-cols-4 gap-0 md:gap-0 reveal-stagger">
        {list.map((s, i) => (
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
  const headerOverride = pageHeaderOverride(content, 'galleryHeader');
  return (
    <>
      <PageHero
        eyebrow={headerOverride?.eyebrow || eyebrow || (variant === 'tradesman' ? 'Projekte' : 'Galerie')}
        title={headerOverride?.title || title || (
          variant === 'tradesman' ? 'Referenzen aus der Werkstatt.' :
          variant === 'salon' ? 'Looks & Momente.' :
          variant === 'hotel' ? 'Haus & Spa.' :
          variant === 'tourism' ? 'Unterwegs in den Bergen.' :
          variant === 'restaurant' ? 'Aus Küche & Saal.' :
          'Bilder & Eindrücke.'
        )}
        subtitle={headerOverride?.subtitle || (
          variant === 'restaurant' ? 'Eindrücke aus dem Lokal, von Tellern, Saucen und Familie. Aufgenommen in echtem Kerzenlicht.' :
          variant === 'salon'      ? 'Looks unserer Kund:innen – mit Erlaubnis dokumentiert.' :
          variant === 'tradesman'  ? 'Aktuelle Projekte aus den letzten Monaten – von kleiner Reparatur bis zur kompletten Sanierung.' :
          variant === 'hotel'      ? 'Räume, Spa und Außenbereich – Eindrücke aus dem Haus.' :
          variant === 'tourism'    ? 'Bilder unserer letzten Touren – Berge, Gäste, Momente.' :
          undefined
        )}
        style={style}
      />

      {(() => {
        const order = getEffectivePageOrder(content, 'gallery', variant).filter((k) => isSectionEnabled(content, 'gallery', k));
        const blocks: Record<string, JSX.Element | null> = {
          story: <GalleryStorySection variant={variant} content={content} />,
          grid: (
            <Section spacing="lg">
              {style === 'bold' ? (
                <MasonryGrid images={content.gallery} />
              ) : style === 'modern' ? (
                <ModernGalleryGrid images={content.gallery} />
              ) : (
                <GalleryShowcase variant={variant} images={content.gallery} mode="full" />
              )}
            </Section>
          ),
          categories: <GalleryCategoriesSection variant={variant} content={content} />,
          testimonials: content.testimonials.length > 0 ? (
            <Section eyebrow={effectiveBranchText(variant, content).testimonialsEyebrow || 'Stimmen'} title={<>{splitTitle(effectiveBranchText(variant, content).testimonialsTitle || 'Was unsere Gäste sagen.')}</>} className="surface">
              <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
                {content.testimonials.map((t, i) => (
                  <blockquote key={i} className="bg-white border border-line rounded-3xl p-8 hover-lift">
                    <p className="text-lg leading-relaxed">{t.text}</p>
                    <footer className="mt-6 pt-5 border-t border-line text-sm font-medium">{t.author}</footer>
                  </blockquote>
                ))}
              </div>
            </Section>
          ) : null,
          cta: <CtaBand variant={variant} content={content} />,
        };
        return order.map((k) => <React.Fragment key={k}>{blocks[k] ?? null}</React.Fragment>);
      })()}
    </>
  );
}

function GalleryStorySection({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  type Story = { eyebrow: string; title: string; body: string; captions: { t: string; d: string }[] };
  const fallbacks: Record<TemplateVariant, Story> = {
    restaurant: {
      eyebrow: 'Hinter den Tellern',
      title: 'Was Sie hier sehen.',
      body: 'Diese Bilder entstehen nicht im Studio. Sie zeigen unseren echten Service – die Hand am Stiel, das Brot vor dem Schneiden, den Tisch zwei Minuten vor den ersten Gästen. Wir fotografieren beim Kochen, nicht für die Karte.',
      captions: [
        { t: 'Im Service', d: 'Momente, wenn das Lokal lebt – nicht inszenierte Stilllebenkomposition.' },
        { t: 'Aus der Küche', d: 'Wie ein Gericht entsteht, vom Mise en Place bis zum letzten Schwung Olivenöl.' },
        { t: 'Familie & Gäste', d: 'Mit Erlaubnis aufgenommen – die Menschen, die unser Lokal jeden Abend tragen.' },
      ],
    },
    salon: {
      eyebrow: 'Was wir zeigen',
      title: 'Looks aus echten Terminen.',
      body: 'Jedes Foto ist nach einem realen Termin entstanden – mit Erlaubnis unserer Kund:innen, ohne Filter, ohne Studio-Licht. Sie sehen den Look, den Sie auch bekämen, nicht eine Inszenierung für Social Media.',
      captions: [
        { t: 'Schnitt', d: 'Vom klassischen Bob bis zur freien Layered-Cut.' },
        { t: 'Farbe', d: 'Balayage, Gloss, Naturtöne – immer auf das Tageslicht abgestimmt.' },
        { t: 'Bridal & Events', d: 'Hochsteckfrisuren, Probestyling, Tag der Hochzeit – auf Wunsch mit Make-up.' },
      ],
    },
    tradesman: {
      eyebrow: 'Vorher / Nachher',
      title: 'Projekte ohne Schönfärberei.',
      body: 'Wir dokumentieren Baustellen so, wie sie sind: dreckig in der Mitte, sauber am Ende. Jede Galerie zeigt mindestens ein Foto vor dem ersten Werkzeug – und eines nach der Endreinigung. Damit Sie sehen, was wir wirklich verändert haben.',
      captions: [
        { t: 'Vorher', d: 'Der Zustand, der uns zur Tür bringt – ungeschönt und mit Datum.' },
        { t: 'Im Bau', d: 'Schutzfolie, Werkzeug, Material. Der Alltag, den wir sauber halten.' },
        { t: 'Nachher', d: 'Endreinigung, Übergabe, fertige Räume – Lichtsetzung wie vor Ort.' },
      ],
    },
    hotel: {
      eyebrow: 'Haus, Spa & Umgebung',
      title: 'So sieht Ihr Aufenthalt aus.',
      body: 'Wir zeigen das Haus, wie Sie es vorfinden – nicht hochgerechnet, nicht aufgehübscht. Die Bilder entstehen über das Jahr verteilt, im echten Licht, mit dem echten Frühstück und der echten Sauna an einem Mittwoch um halb elf.',
      captions: [
        { t: 'Zimmer & Suiten', d: 'Wie Sie das Zimmer vorfinden – Tagesdecke, Tee, ohne Werbestyling.' },
        { t: 'Spa & Sauna', d: 'Außenpool, Dampfbad, Ruheräume. In Tageslicht statt Marketingfilter.' },
        { t: 'Restaurant & Lounge', d: 'Frühstück, Halbpension, Aperitif vor dem Kamin.' },
      ],
    },
    tourism: {
      eyebrow: 'Unterwegs',
      title: 'Was eine Tour wirklich bedeutet.',
      body: 'Diese Bilder sind auf echten Touren entstanden – kein Modell, kein Studio. Sie sehen die Pausen, die Aussichten, die kleinen Gruppen. Wir zeigen, wie der Tag wirklich aussieht, nicht wie der schönste Postkartenmoment.',
      captions: [
        { t: 'Auf dem Weg', d: 'Wanderungen, Aussichten, der Moment vor dem letzten Anstieg.' },
        { t: 'Pausen', d: 'Brotzeit auf einer Bank, Gespräch mit dem Guide, ein Schluck Wasser.' },
        { t: 'Begegnungen', d: 'Menschen, Hütten, Tiere – die Gegend, in der wir zuhause sind.' },
      ],
    },
  };
  const overlay = (content as any).galleryStory as Story | undefined;
  const story: Story = overlay && (overlay.title || overlay.body) ? { ...fallbacks[variant], ...overlay } : fallbacks[variant];
  if (!story.title && !story.body && !(story.captions && story.captions.length)) return null;
  return (
    <Section eyebrow={story.eyebrow} title={splitTitle(story.title)} className="surface">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 reveal">
          {story.body.split('\n\n').map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted mb-5">{p}</p>
          ))}
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-3 gap-5 reveal-stagger">
          {(story.captions || []).filter((c) => c.t || c.d).map((c, i) => (
            <article key={i} className="bg-white border border-line rounded-2xl p-6 hover-lift">
              <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-display text-xl mt-3">{c.t}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function GalleryCategoriesSection({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  type Cat = { t: string; d: string };
  const fallbacks: Record<TemplateVariant, Cat[]> = {
    restaurant: [
      { t: 'Vorspeisen & Beilagen', d: 'Antipasti, hausgemachtes Brot, Aufstriche und kleine Klassiker zum Teilen.' },
      { t: 'Hauptgerichte', d: 'Pasta, Fisch, Fleisch und vegetarische Tellergerichte – saisonal kuratiert.' },
      { t: 'Dessert & Digestif', d: 'Tiramisu, Panna Cotta, hausgemachte Liköre – das süße Finale am Tisch.' },
    ],
    salon: [
      { t: 'Schnitt', d: 'Klassische Cuts, Layered Long Bob, präzise Männer-Cuts mit Bartpflege.' },
      { t: 'Farbe', d: 'Balayage, Highlights, Gloss-Behandlung und natürliche Naturtöne.' },
      { t: 'Bridal & Events', d: 'Hochsteckfrisuren, Probestyling und der Tag der Hochzeit – aus einer Hand.' },
    ],
    tradesman: [
      { t: 'Bad & Sanitär', d: 'Komplett-Sanierungen, barrierearme Lösungen, schnelle Notfall-Reparaturen.' },
      { t: 'Heizung & Energie', d: 'Wärmepumpen, Heizungstausch, Förderprogramm-Beratung inklusive.' },
      { t: 'Reparaturen & Wartung', d: 'Wasserrohrbruch, verstopfte Abflüsse, Jahresservice – schnell und sauber.' },
    ],
    hotel: [
      { t: 'Zimmer & Suiten', d: 'Doppelzimmer, Familiensuite und unsere Panorama-Suite mit Bergblick.' },
      { t: 'Spa & Wellness', d: 'Sauna-Landschaft, Dampfbad, Ruheräume und der beheizte Außenpool.' },
      { t: 'Außenanlage', d: 'Garten, Liegewiese, Sonnenterrasse und unsere Wanderwege direkt vor der Tür.' },
    ],
    tourism: [
      { t: 'Tagestouren', d: 'Halbtägige Wanderungen, kulinarische Stadt-Touren, Sonnenaufgangs-Programme.' },
      { t: 'Mehrtägige Touren', d: 'Hütten-zu-Hütten-Wanderungen, Wein-Routen und Natur-Retreats.' },
      { t: 'Privat & Maßgeschneidert', d: 'Eigene Gruppen, Firmen-Events und individuelle Tour-Konzepte.' },
    ],
  };
  const overlay = (content as any).galleryCategories as Cat[] | undefined;
  const list = overlay && overlay.length ? overlay.filter((c) => c.t || c.d) : fallbacks[variant];
  if (!list.length) return null;
  return (
    <Section eyebrow={effectiveBranchText(variant, content).galleryCategoriesEyebrow || 'Kategorien'} title={<>{splitTitle(effectiveBranchText(variant, content).galleryCategoriesTitle || 'Was Sie bei uns erwartet.')}</>}>
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {list.map((c, i) => (
          <article key={i} className="bg-white border border-line rounded-3xl p-7 hover-lift">
            <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
            <h3 className="font-display text-2xl mt-3">{c.t}</h3>
            <p className="mt-3 text-muted leading-relaxed">{c.d}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ─── About ──────────────────────────────────────────────────────── */
function AboutPage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  const order = getEffectivePageOrder(content, 'about', variant).filter((k) => isSectionEnabled(content, 'about', k));
  const introBlock = style !== 'modern' ? (
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
  ) : (
    <Section spacing="lg">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 lg:col-start-1 reveal">
          {(content.about?.body || '').split('\n\n').map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted mb-5">{p}</p>
          ))}
        </div>
        <aside className="lg:col-span-4 lg:col-start-9 reveal">
          <div className="sticky top-28 rounded-2xl border border-line p-6 bg-white">
            <p className="eyebrow mb-4">{effectiveBranchText(variant, content).aboutSidebarEyebrow}</p>
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
  );
  const blocks: Record<string, JSX.Element | null> = {
    intro: introBlock,
    values: <ValuesSection variant={variant} content={content} />,
    timeline: <Timeline content={content} />,
    team: <TeamSection variant={variant} content={content} />,
    numbers: <NumbersBand variant={variant} content={content} />,
    certifications: variant === 'tradesman' ? <CertificationsSection variant={variant} content={content} /> : null,
    press: variant === 'restaurant' ? <PressSection variant={variant} content={content} /> : null,
    testimonials: content.testimonials.length > 0 ? (
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
    ) : null,
    faq: (
      <Section eyebrow={effectiveBranchText(variant, content).faqEyebrow} title={splitTitle(effectiveBranchText(variant, content).faqTitle)} className="surface">
        <Accordion items={resolveFaq(variant, content).map((f) => ({ q: f.q, a: f.a }))} className="max-w-3xl" />
      </Section>
    ),
    cta: <CtaBand variant={variant} content={content} />,
  };
  return (
    <>
      <PageHero
        eyebrow={pageHeaderOverride(content, 'aboutHeader')?.eyebrow || (style === 'bold' ? 'Wer wir sind' : 'Über uns')}
        title={pageHeaderOverride(content, 'aboutHeader')?.title || content.about?.title || 'Unsere Geschichte.'}
        subtitle={pageHeaderOverride(content, 'aboutHeader')?.subtitle || (style === 'modern' ? 'Wer wir sind, wie wir denken, was uns wichtig ist.' : undefined)}
        style={style}
        image={style === 'modern' ? content.about?.imageUrl || content.gallery[0] : undefined}
      />
      {order.map((k) => <React.Fragment key={k}>{blocks[k] ?? null}</React.Fragment>)}
    </>
  );
}

function ValuesSection({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const overlay = (content as any).values as { t: string; d: string }[] | undefined;
  const fallbacks: Record<TemplateVariant, { t: string; d: string }[]> = {
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
  const list = overlay && overlay.length ? overlay.filter((v) => v.t || v.d) : fallbacks[variant];
  if (!list?.length) return null;
  return (
    <Section eyebrow={effectiveBranchText(variant, content).valuesEyebrow || 'Was uns wichtig ist'} title={<>{splitTitle(effectiveBranchText(variant, content).valuesTitle || 'Drei Grundsätze.')}</>} className="surface">
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {list.map((v, i) => (
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

function TeamSection({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const overlay = (content as any).team as { n: string; r: string; img: string; bio: string }[] | undefined;
  const fallbacks: Record<TemplateVariant, { n: string; r: string; img: string; bio: string }[]> = {
    restaurant: [
      { n: 'Giulia Conti', r: 'Küchenchefin & Inhaberin', img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80', bio: 'Lernte bei den Großeltern, kochte in Bologna und Wien, kam 2018 zurück in den Familienbetrieb.' },
      { n: 'Marco Riva', r: 'Pizzaiolo', img: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=900&q=80', bio: 'Steht seit zwölf Jahren am Steinofen. Zaubert die Margherita DOP, auf die wir stolz sind.' },
      { n: 'Sofia Bianchi', r: 'Sommelière', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80', bio: 'Berät Sie zu unseren Naturweinen und kennt jeden unserer Winzer persönlich.' },
    ],
    salon: [
      { n: 'Marie Hofer', r: 'Salon Lead · Stylistin', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80', bio: 'Gründete Studio Lumière 2017. Ausbildung in Paris, mit Schwerpunkt auf Schnitt und Balayage.' },
      { n: 'Anna Becker', r: 'Color-Spezialistin', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80', bio: 'Kérastase Educator und Spezialistin für Air-Touch & Highlights nach französischer Schule.' },
      { n: 'Lina Voss', r: 'Skin & Make-up', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80', bio: 'Kosmetikerin und Make-up-Artistin. Begleitet unsere Bridal-Termine vom Probestyling bis zur Trauung.' },
      { n: 'Tom Berger', r: 'Herrenschnitt', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80', bio: 'Spezialisiert auf klassische und moderne Herrenschnitte sowie traditionelle Bartpflege.' },
    ],
    tradesman: [
      { n: 'Stefan Mayer', r: 'Geschäftsführer · Meister', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80', bio: 'Übernahm den Familienbetrieb 2008. Spezialgebiet: Heizungsmodernisierung und Förderberatung.' },
      { n: 'Andreas Mayer', r: 'Bauleiter · Meister', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80', bio: 'Verantwortet Großprojekte von Badsanierung bis Mehrfamilienhaus. Über 200 Projekte begleitet.' },
      { n: 'Daniel Mayer', r: 'Notdienst & Service', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80', bio: 'Steht 24/7 für Notfälle bereit. Kennt nahezu jede Heizungsanlage in der Region – und wenn nicht, kennt er jemanden, der sie kennt.' },
    ],
    hotel: [
      { n: 'Anna Hofer', r: 'Gastgeberin · Inhaberin', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80', bio: 'Führt das Haus in dritter Generation – mit Liebe zum Detail und einem offenen Ohr für jeden Gast.' },
      { n: 'Markus Hofer', r: 'Küchenchef', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80', bio: 'Kocht regional, saisonal und ehrlich. Bezieht 80 % der Zutaten aus dem Umkreis von 30 km.' },
      { n: 'Lena Brugger', r: 'Spa & Wellness', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80', bio: 'Zertifizierte Spa-Therapeutin, plant Wellness-Tage und berät persönlich zu allen Treatments.' },
    ],
    tourism: [
      { n: 'Lukas Steiner', r: 'Bergführer & Inhaber', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80', bio: 'Lizenzierter Bergführer seit 15 Jahren. Kennt jede Route zwischen Karwendel und Dolomiten.' },
      { n: 'Marie Holzer', r: 'Wein & Kultur', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80', bio: 'Sommelière mit Schwerpunkt Tirol & Südtirol. Führt unsere Wein- und Genusstouren.' },
      { n: 'Jakob Pichler', r: 'Foto & Outdoor', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=900&q=80', bio: 'Outdoor-Fotograf und Wanderführer. Spezialist für Sonnenaufgangs- und Sterne-Touren.' },
    ],
  };
  const list = overlay && overlay.length ? overlay.filter((m) => m.n || m.r) : fallbacks[variant];
  if (!list?.length) return null;
  return (
    <Section eyebrow={effectiveBranchText(variant, content).teamEyebrow || 'Team'} title={<>{splitTitle(effectiveBranchText(variant, content).teamTitle || 'Menschen hinter dem Betrieb.')}</>}>
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {list.slice(0, 3).map((m, i) => (
          <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
            <div className="aspect-[4/5] img-zoom">
              {m.img ? <img src={m.img} alt={m.n} className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full bg-[var(--surface-color)]" />}
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

function CertificationsSection({ variant, content }: { variant: TemplateVariant; content?: SiteContent }) {
  const fallback = [
    { t: 'Meisterbetrieb HWK', d: 'Eingetragen bei der Handwerkskammer für Mittelfranken seit 1972.' },
    { t: 'Innungsmitglied', d: 'Aktives Mitglied der Innung für Sanitär- und Heizungstechnik.' },
    { t: 'Zertifizierter Wärmepumpen-Installateur', d: 'Schulungen bei Viessmann, Vaillant und Daikin – jährlich aktualisiert.' },
    { t: 'KfW-Energieberater', d: 'Förderkalkulationen direkt vom Fachbetrieb. Kein Detour über externe Berater.' },
    { t: 'Förder-Partner BAFA', d: 'Anträge beim BAFA für Heizungsförderung schreiben wir mit Ihnen gemeinsam.' },
    { t: 'Photovoltaik-Fachpartner', d: 'Komplettpaket inkl. Anmeldung beim Netzbetreiber und Steuerformular.' },
  ];
  const overlay = content ? ((content as any).certifications as { t: string; d: string }[] | undefined) : undefined;
  const items = overlay && overlay.length ? overlay : fallback;
  return (
    <Section eyebrow={(content && effectiveBranchText(variant, content).certsEyebrow) || 'Qualifikationen'} title={<>{splitTitle((content && effectiveBranchText(variant, content).certsTitle) || 'Geprüft & zertifiziert.')}</>} className="surface">
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

function PressSection({ variant, content }: { variant: TemplateVariant; content?: SiteContent }) {
  const fallback = [
    { src: 'Falstaff', q: '„Eine der ehrlichsten Trattorien Tirols."', y: '2024' },
    { src: 'Tiroler Tageszeitung', q: '„Pasta wie in Bologna – nur näher."', y: '2023' },
    { src: 'À la Carte', q: '„Hier kocht jemand, der Italien wirklich kennt."', y: '2023' },
  ];
  const overlay = content ? ((content as any).press as { src: string; q: string; y: string }[] | undefined) : undefined;
  const items = overlay && overlay.length ? overlay : fallback;
  return (
    <Section eyebrow={(content && effectiveBranchText(variant, content).pressEyebrow) || 'Presse'} title={<>{splitTitle((content && effectiveBranchText(variant, content).pressTitle) || 'Was die Presse schreibt.')}</>}>
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
  const arrivalFallbacks: Record<TemplateVariant, { t: string; d: string }[]> = {
    restaurant: [
      { t: 'Mit dem Auto', d: 'Parkmöglichkeiten in unmittelbarer Nähe. Gerne bei Reservierung anfragen.' },
      { t: 'Mit der Bahn', d: 'Wenige Gehminuten vom Bahnhof entfernt. Ein Spaziergang durch das Zentrum.' },
      { t: 'Barrierefrei', d: 'Hauptraum ebenerdig. Behindertengerechte Toilette vorhanden.' },
    ],
    salon: [
      { t: 'Anfahrt', d: 'Öffentlich gut erreichbar – wenige Minuten zu Fuß vom nächsten Halt.' },
      { t: 'Parken', d: 'Parkmöglichkeiten in der Nähe. Bei Bedarf reservieren wir gerne für Sie mit.' },
      { t: 'Termin verlegen', d: 'Bis 24 h vorher gerne kostenlos – am liebsten per WhatsApp.' },
    ],
    tradesman: [
      { t: 'Notdienst', d: 'Rund um die Uhr erreichbar – auch am Wochenende und an Feiertagen.' },
      { t: 'Anfahrtsgebiet', d: 'Region und Umkreis abgedeckt. Größere Distanzen auf Anfrage.' },
      { t: 'Beratung vor Ort', d: 'Erstgespräch und Angebot kostenlos. Unverbindlich.' },
    ],
    hotel: [
      { t: 'Mit dem Auto', d: 'Hauseigene Tiefgarage, Ladestationen für E-Autos verfügbar.' },
      { t: 'Mit der Bahn', d: 'Shuttle ab Hauptbahnhof auf Voranmeldung.' },
      { t: 'Check-in', d: 'Ab 15:00 Uhr. Frühere Ankunft? Wir lagern Ihr Gepäck gerne.' },
    ],
    tourism: [
      { t: 'Treffpunkt', d: 'Hauptbahnhof oder hauseigenes Büro – Details mit der Buchungsbestätigung.' },
      { t: 'Transfer', d: 'Mehrtägige Touren ab Hotel oder Bahnhof. Auf Wunsch mit Kleinbus.' },
      { t: 'Beratung', d: 'Sie wissen nicht, welche Tour passt? Wir telefonieren gerne 15 Minuten unverbindlich.' },
    ],
  };
  const overlay = (content as any).arrival as { t: string; d: string }[] | undefined;
  const arrival = overlay && overlay.length ? overlay.filter((a) => a.t || a.d) : arrivalFallbacks[variant];
  const order = getEffectivePageOrder(content, 'contact', variant).filter((k) => isSectionEnabled(content, 'contact', k));
  // If the page already has the dedicated arrival map below, skip the small
  // map under the form to avoid showing two Google Maps embeds back-to-back.
  const arrivalEnabled = isSectionEnabled(content, 'contact', 'arrival') && order.includes('arrival');
  const arrivalOv = ((content as any).arrivalSection ?? {}) as { eyebrow?: string; title?: string; subtitle?: string };
  const blocks: Record<string, JSX.Element | null> = {
    block: <ContactBlock content={content} showMap={!arrivalEnabled} />,
    arrival: (
      <Section
        eyebrow={arrivalOv.eyebrow || 'Wegbeschreibung'}
        title={arrivalOv.title || <>So <em className="italic-pop">finden Sie uns.</em></>}
        subtitle={arrivalOv.subtitle || undefined}
        className="surface"
      >
        <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
          {arrival.map((a, i) => (
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
    ),
    faq: (
      <Section eyebrow={effectiveBranchText(variant, content).faqEyebrow} title={splitTitle(effectiveBranchText(variant, content).faqTitle)}>
        <Accordion items={resolveFaq(variant, content).map((f) => ({ q: f.q, a: f.a }))} className="max-w-3xl" />
      </Section>
    ),
    cta: <CtaBand variant={variant} content={content} />,
  };
  return (
    <>
      <PageHero
        eyebrow={pageHeaderOverride(content, 'contactPageHeader')?.eyebrow || 'Kontakt'}
        title={
          pageHeaderOverride(content, 'contactPageHeader')?.title || (
            variant === 'restaurant'
              ? 'Reservieren oder einfach vorbeikommen.'
              : variant === 'salon'
                ? 'Termin vereinbaren oder kurz fragen.'
                : 'Anfrage senden oder Notdienst rufen.')
        }
        subtitle={pageHeaderOverride(content, 'contactPageHeader')?.subtitle || undefined}
        style={style}
      />
      {order.map((k) => <React.Fragment key={k}>{blocks[k] ?? null}</React.Fragment>)}
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.05]">
              {splitTitle(title)}
            </h1>
            {subtitle && <p className="mt-8 text-lg text-muted max-w-2xl">{subtitle}</p>}
          </div>
          {image && (
            <div className="lg:col-span-5 reveal">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-[var(--accent-color)] opacity-20 blur-2xl" aria-hidden />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line shadow-xl">
                  <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
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
          {s.imageUrl && (
            <div className="mt-3 aspect-[16/9] overflow-hidden rounded-xl">
              <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          )}
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
  images, mode,
}: {
  variant: TemplateVariant;
  images: string[];
  mode: 'teaser' | 'full';
}) {
  if (images.length === 0) return null;
  const used = mode === 'teaser' ? images.slice(0, 8) : images;
  return <MasonryLightbox images={used} />;
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
            <span className="text-brand">Anfragen →</span>
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

