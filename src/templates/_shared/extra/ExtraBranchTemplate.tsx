import React, { Fragment, useEffect, useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import type { ModularSectionV2, SiteContent, PageId, TemplateKey } from '@/lib/types';
import { SplitText, useReveal, ParallaxImage, AnimatedCounter, Accordion } from '@/components/fx';
import Seo from '@/components/Seo';
import { BasePathProvider, useBasePath, withBase, resolveMapIframeSrc, SafeMapEmbed, Section, ContactBlock } from '@/components/site-blocks';
import { ConsentScripts } from '@/components/ConsentScripts';
import { Timeline } from '@/components/Timeline';
import { NewsPreview, NewsIndexPage, NewsDetailPage } from '@/components/News';
import { CatalogItemDetailPage } from '@/components/CatalogItemDetailPage';
import { Imprint, Privacy } from '@/components/legal-pages';
import { MasonryLightbox } from '@/components/MasonryLightbox';
import { BranchModulesInline, moduleHeading, type ModuleHeadingKey } from '@/components/branch-modules';
import { branchTextDefaults } from '@/lib/branch-text-defaults';
import { isSectionEnabled, getEffectivePageOrder, type PageId as LayoutPageId } from '@/lib/page-layout';
import { getOpenStatus, parseHours } from '@/lib/open-hours';
import { getEffectiveHomeSectionKeys } from '@/lib/effective-home-order';
import { mergePageBlocksIntoSiteContentForPage } from '@/lib/page-blocks-v1-page-merge';
import { withModularSiteContent } from '@/lib/modular-site-overlay';
import { buildSlotRenderInstructions, siteContentForSlotInstruction, availableSlotsForPageBlockPlan } from '@/lib/page-blocks-v1-render-sequence';
import type { PageKey } from '@/admin/admin-sections';
import { getBranchConfig } from '@/lib/branch-config';
import { FAQ_DEFAULTS } from '@/lib/faq-defaults';
import { mergedServiceHighlights, meaningfulTestimonials, normaliseArrivalList, normaliseFaqList, normaliseProgramList, normaliseTdList, normaliseTeamList } from '@/lib/content-field-aliases';
import {
  asUnknownRecord,
  cmsV2Boolean,
  cmsV2FaqItems,
  cmsV2Image,
  cmsV2LinkHref,
  cmsV2LinkLabel,
  cmsV2Text,
  cmsV2TextItems,
  cmsV2TextPairs,
  type UnknownRecord,
} from '@/lib/cms-v2-render-utils';

export type ExtraBranchKey = 'consulting' | 'medical' | 'fitness';
export const EXTRA_BRANCH_KEYS: ExtraBranchKey[] = ['consulting', 'medical', 'fitness'];
export const isExtraBranchKey = (k: string | undefined): k is ExtraBranchKey =>
  !!k && (EXTRA_BRANCH_KEYS as string[]).includes(k);

export const EXTRA_V2_RENDERED_SECTION_TYPES = new Set<string>([
  'noticeBanner',
  'hero',
  'keywordBand',
  'storyTeaser',
  'serviceCards',
  'serviceInfo',
  'classCards',
  'trainingPlanOverview',
  'programTable',
  'processTextColumns',
  'processCards',
  'pricingPackages',
  'team',
  'trainers',
  'appointmentBooking',
  'galleryPreview',
  'gallery',
  'testimonials',
  'newsTeaser',
  'contactPreview',
  'teaserList',
  'categoryCards',
  'timeline',
  'statsBand',
  'faq',
  'cta',
  'contactDetails',
  'locations',
  'directions',
]);

/** Per-tenant overlay over branch-text defaults — same SoT as 5-variant template. */
function effectiveBranchText(branch: ExtraBranchKey, content?: SiteContent) {
  const overrides = ((content as any)?.branchText ?? {}) as Record<string, any>;
  const def = branchTextDefaults(branch);
  return {
    ...def,
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, val]) => {
        if (Array.isArray(val)) return val.length > 0;
        return typeof val === 'string' ? val.trim().length > 0 : val != null;
      }),
    ),
  } as ReturnType<typeof branchTextDefaults>;
}

/** Pull a per-page header override from content extras (set by admin's PageHeaderEditor). */
function pageHeaderOverride(content: SiteContent, key: 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader'): { eyebrow: string; title: string; subtitle: string } | null {
  const v = (content as any)[key];
  if (!v || typeof v !== 'object') return null;
  return { eyebrow: String(v.eyebrow || ''), title: String(v.title || ''), subtitle: String(v.subtitle || '') };
}

/** Resolve the hero primary + secondary CTA from `heroCta` overrides + base hero fields. */
function resolveHeroCta(content: SiteContent) {
  const hc = ((content as any).heroCta ?? {}) as {
    primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string;
  };
  const primaryLabel = hc.primaryLabel || content.hero.ctaLabel || 'Termin anfragen';
  const primaryHref = hc.primaryHref || content.hero.ctaHref || '#kontakt';
  const secondaryLabel = hc.secondaryLabel ?? 'Leistungen ansehen';
  const secondaryHref = hc.secondaryHref || '#leistungen';
  return { primaryLabel, primaryHref, secondaryLabel, secondaryHref };
}

/** Optional intro lines above the hero title (admin „Hinweis-Banner“). */
function ExtraAnnouncementsRibbon({ content }: { content: SiteContent }) {
  const lines = (content.announcements ?? []).map((s) => String(s).trim()).filter(Boolean);
  if (lines.length === 0) return null;
  return (
    <div className="mb-8 rounded-2xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-amber-950">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm leading-snug text-center">
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="hidden sm:inline text-amber-300 select-none" aria-hidden>|</span>}
            <span>{line}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function heroBodyParagraphs(content: SiteContent): string[] {
  const raw = ((content.hero as { body?: string }).body ?? '').trim();
  if (!raw) return [];
  return raw.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

/** Smart link that uses anchor-jump for `#…` and React-Router NavLink for routes. */
function ExtraHeroLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const basePath = useBasePath();
  const isAnchor = href.startsWith('#');
  const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
  if (isAnchor || isExternal) {
    return <a href={href} className={className}>{children}</a>;
  }
  return <NavLink to={withBase(basePath, href)} className={className}>{children}</NavLink>;
}

/** Same parsing as core `NumbersBand` — keeps counter / suffix behaviour aligned. */
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

function defaultExtraHomeStrip(): {
  tone: 'light' | 'dark';
  eyebrow: string;
  hint: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
} {
  return {
    tone: 'light',
    eyebrow: 'Jetzt Kontakt aufnehmen',
    hint: 'Wir freuen uns auf Ihre Nachricht.',
    primaryLabel: '',
    primaryHref: 'tel:',
    secondaryLabel: 'Anfrage senden',
    secondaryHref: '/kontakt',
  };
}

/** Home Aktions-Leiste — mirrors core `BranchActionStrip` without importing `TemplateApp` (cycle). */
function ExtraHomeActionStrip({ content }: { content: SiteContent }) {
  const phone = content.contact.phone || '';
  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '#';
  const def = defaultExtraHomeStrip();
  const rawStrip = ((content as any).homeStrip || {}) as Record<string, unknown>;
  const auto = rawStrip.eyebrowAuto !== false;
  const stripForMerge = Object.fromEntries(
    Object.entries(rawStrip).filter(([key]) => !auto || key !== 'eyebrow'),
  );
  const overlay = Object.fromEntries(
    Object.entries(stripForMerge).filter(([, val]) => (typeof val === 'string' ? val.trim() !== '' : val != null)),
  );
  const cfg = { ...def, ...overlay } as ReturnType<typeof defaultExtraHomeStrip> & { eyebrowAuto?: boolean };

  let liveEyebrow: string | null = null;
  let liveIsOpen = false;
  if (auto) {
    try {
      const rows = content.contact?.hours;
      const status = getOpenStatus(rows);
      const slot = status.todayFull ?? status.todayLabel;
      if (slot) {
        liveEyebrow = status.isOpen ? `Heute geöffnet · ${slot}` : 'Heute geschlossen';
        liveIsOpen = status.isOpen;
      } else if (rows?.length && parseHours(rows).length > 0) {
        liveEyebrow = 'Heute geschlossen';
        liveIsOpen = false;
      }
    } catch { /* ignore */ }
  }
  const eyebrowText = liveEyebrow ?? cfg.eyebrow;
  const resolveHref = (href: string) => (href === 'tel:' ? phoneHref : href);
  if (!eyebrowText && !cfg.hint && !cfg.primaryLabel && !cfg.secondaryLabel && !phone) return null;

  const tone = cfg.tone === 'dark' ? 'bg-brand text-white border-white/10' : 'bg-white border-line';
  const dotColor = cfg.tone === 'dark'
    ? 'bg-[var(--accent-color)]'
    : (liveEyebrow && !liveIsOpen ? 'bg-stone-400' : 'bg-emerald-500');
  const hintColor = cfg.tone === 'dark' ? 'text-white/70' : 'text-muted';
  const eyebrowColor = cfg.tone === 'dark' ? 'text-white' : 'text-brand';
  const primaryHref = resolveHref(cfg.primaryHref || '#');
  const secondaryHref = resolveHref(cfg.secondaryHref || '#');

  return (
    <section className={`border-y ${tone}`}>
      <div className="container-x py-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
        {eyebrowText && (
          <span className={`inline-flex items-center gap-2 font-mono uppercase tracking-widest text-xs ${eyebrowColor}`}>
            <span className={`h-2 w-2 rounded-full ${dotColor} ${liveIsOpen ? 'animate-pulse' : ''}`} /> {eyebrowText}
          </span>
        )}
        {cfg.hint && <span className={`hidden md:inline ${hintColor}`}>{cfg.hint}</span>}
        <span className="ml-auto flex flex-wrap gap-3 items-center">
          {phone && cfg.primaryHref === 'tel:' && (
            <a href={phoneHref} className="btn-outline !py-2 !px-4 !text-xs">
              {cfg.primaryLabel ? `${cfg.primaryLabel} ${phone}` : phone}
            </a>
          )}
          {cfg.primaryLabel && cfg.primaryHref !== 'tel:' && (
            <ExtraHeroLink href={primaryHref} className="btn-outline !py-2 !px-4 !text-xs">{cfg.primaryLabel}</ExtraHeroLink>
          )}
          {cfg.secondaryLabel && (
            <ExtraHeroLink href={secondaryHref} className={cfg.tone === 'dark' ? 'btn-accent !py-2 !px-4 !text-xs' : 'btn-primary !py-2 !px-4 !text-xs'}>
              {cfg.secondaryLabel}
            </ExtraHeroLink>
          )}
        </span>
      </div>
    </section>
  );
}

/** Full-width Zahlen-Band from `content.numbers` (admin „Zahlen-Band“). */
function ExtraHomeNumbersBand({ content }: { content: SiteContent }) {
  const overlay = ((content as unknown as { numbers?: { value: string; label: string }[] }).numbers ?? []).filter(
    (n) => n && (String(n.value ?? '').trim() || String(n.label ?? '').trim()),
  );
  if (!overlay.length) return null;
  const stats = overlay.map((n) => ({ ...parseNumberValue(String(n.value)), l: n.label }));
  return (
    <section className="py-20 md:py-28 bg-brand text-white grain relative overflow-hidden">
      <div className="blob -top-40 -left-40 w-[500px] h-[500px]" style={{ background: 'var(--accent-color)', opacity: 0.18 }} />
      <div className="container-x relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 reveal-stagger">
          {stats.map((m, i) => (
            <div key={i} className="md:border-l border-white/15 md:pl-8">
              <p className="num-display text-5xl md:text-7xl leading-none">
                {m.raw ? (
                  <>{m.s}</>
                ) : m.s && m.s.startsWith(',') ? (
                  <>{m.v}{m.s}</>
                ) : (
                  <AnimatedCounter to={m.v} suffix={m.s || ''} />
                )}
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-white/60">{m.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtraHomeLogosStrip({ content, branch }: { content: SiteContent; branch: ExtraBranchKey }) {
  const overlay = ((content as any).logos as string[] | undefined)?.filter((s) => s && s.trim());
  const fallback: Record<ExtraBranchKey, string[]> = {
    consulting: ['ISO 9001', 'IHK', 'TÜV', 'DSGVO', 'Partnernetzwerk'],
    medical: ['KBV', 'Qualitätsmanagement', 'Doctolib', 'Fachgesellschaft', 'Zertifiziert'],
    fitness: ['EHFA', 'IHRS', 'Verbandsmitglied', 'Zertifizierte Trainer:innen', 'Partner'],
  };
  const list = overlay && overlay.length ? overlay : fallback[branch];
  if (!list.length) return null;
  return (
    <section className="py-14 border-y border-line">
      <div className="container-x flex flex-wrap items-center justify-between gap-y-6 gap-x-10 opacity-70">
        {list.map((n) => (
          <span key={n} className="font-display text-2xl tracking-wide">{n}</span>
        ))}
      </div>
    </section>
  );
}

/** Soft-CTA for extra home — classic uses `ctaBandOverride` + branch soft-CTA copy; modern/bold match core styling. */
function ExtraHomeSoftCta({ branch, content, layoutStyle }: { branch: ExtraBranchKey; content: SiteContent; layoutStyle: ExtraStyle }) {
  const ov = (content as any)?.ctaBandOverride as {
    lead?: string; sub?: string; cta?: string; ctaHref?: string; eyebrow?: string; leadAccent?: string;
  } | undefined;
  const rawBt = ((content as any)?.branchText ?? {}) as Record<string, string>;
  const bt = effectiveBranchText(branch, content);
  const hrefDefault = (ov?.ctaHref && ov.ctaHref.trim()) || '/kontakt';

  const eyebrow = (ov?.eyebrow && ov.eyebrow.trim()) || (rawBt.softCtaEyebrow && rawBt.softCtaEyebrow.trim()) || bt.softCtaEyebrow || '';
  const title = (ov?.lead && ov.lead.trim()) || (rawBt.softCtaTitle && rawBt.softCtaTitle.trim()) || bt.softCtaTitle || '';
  const sub = (ov?.sub && ov.sub.trim()) || (rawBt.softCtaText && rawBt.softCtaText.trim()) || bt.softCtaText || '';
  const cta = (ov?.cta && ov.cta.trim()) || (rawBt.softCtaButton && rawBt.softCtaButton.trim()) || bt.softCtaButton || '';

  if (layoutStyle === 'classic') {
    const pick = (field: 'lead' | 'sub' | 'cta' | 'ctaHref' | 'eyebrow' | 'leadAccent') =>
      (ov?.[field] && String(ov[field]).trim()) || '';
    const resolvedLeadAccent = pick('leadAccent');
    const t = {
      eyebrow: pick('eyebrow') || bt.softCtaEyebrow || 'Bereit?',
      lead: pick('lead') || bt.softCtaTitle,
      leadAccent: resolvedLeadAccent,
      sub: pick('sub') || bt.softCtaText,
      cta: pick('cta') || bt.softCtaButton,
      ctaHref: pick('ctaHref') || hrefDefault,
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
            <ExtraHeroLink href={t.ctaHref} className="btn-primary">{t.cta} <span aria-hidden>→</span></ExtraHeroLink>
          </div>
        </div>
      </section>
    );
  }

  if (layoutStyle === 'modern') {
    return (
      <section className="py-24 surface">
        <div className="container-x">
          <div className="rounded-3xl bg-white border border-line p-10 md:p-14 text-center reveal">
            {eyebrow ? <p className="eyebrow justify-center mb-4">{eyebrow}</p> : null}
            <h2 className="headline-lg">{title}</h2>
            {sub ? <p className="mt-5 text-muted max-w-xl mx-auto">{sub}</p> : null}
            {cta ? (
              <ExtraHeroLink href={hrefDefault} className="btn-primary mt-8">{cta} <span aria-hidden>→</span></ExtraHeroLink>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  const boldFallbackTitle =
    branch === 'consulting' ? 'Nächster Schritt?' : branch === 'medical' ? 'Termin?' : 'Startklar?';

  return (
    <section className="py-32 md:py-44 bg-[var(--accent-color)] text-[var(--accent-fg)] grain">
      <div className="container-x text-center reveal">
        <h2 className="font-display text-6xl md:text-8xl leading-[0.95]">{title || boldFallbackTitle}</h2>
        <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto opacity-80">{sub || 'Schreiben Sie uns. Wir antworten.'}</p>
        <ExtraHeroLink href={hrefDefault} className="btn-primary mt-10">{(cta || 'Jetzt Kontakt')} <span aria-hidden>→</span></ExtraHeroLink>
      </div>
    </section>
  );
}

export type ExtraStyle = 'classic' | 'modern' | 'bold';
export type ExtraPage = 'home' | 'services' | 'gallery' | 'about' | 'contact';

type Props = {
  content: SiteContent;
  style?: ExtraStyle;
  /** Branch flavour — switches branch-specific sections (process / service / programs). */
  branch?: ExtraBranchKey;
  /** Optional eyebrow above hero (defaults to content.brand.tagline) */
  eyebrow?: string;
  /** Base path under which the multi-page routes are mounted. */
  basePath?: string;
};

const PAGE_TO_SEO: Record<ExtraPage, PageId> = {
  home: 'home',
  services: 'services',
  gallery: 'gallery',
  about: 'about',
  contact: 'contactPage',
};
const PAGE_TITLES: Record<Exclude<ExtraPage, 'home'>, string> = {
  services: 'Leistungen',
  gallery: 'Galerie',
  about: 'Über uns',
  contact: 'Kontakt',
};

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = (window as any).__lenis as { scrollTo?: (t: any, o?: any) => void } | undefined;
    if (lenis?.scrollTo) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function PageSeoExtra({ content, branch, page }: { content: SiteContent; branch: ExtraBranchKey; page: ExtraPage }) {
  const t = page === 'home' ? content.brand.name : `${PAGE_TITLES[page as Exclude<ExtraPage, 'home'>]} · ${content.brand.name}`;
  const desc = page === 'home'
    ? (content.hero?.subtitle || content.about?.body?.slice(0, 160) || `${content.brand.name} – ${content.brand.tagline || 'offizielle Website'}.`)
    : `${PAGE_TITLES[page as Exclude<ExtraPage, 'home'>]} bei ${content.brand.name}.`;
  return <Seo title={t} description={desc} content={content} template={branch} page={PAGE_TO_SEO[page]} />;
}

function shouldUseExtraCmsV2Frontend(content: SiteContent, branch: ExtraBranchKey, style: ExtraStyle): boolean {
  const combo = content.modularPagesV2?.combo;
  if (combo?.template !== branch || combo.style !== style) return false;
  return content.cmsV2?.enabled === true;
}

function extraV2Sections(content: SiteContent, page: ExtraPage): ModularSectionV2[] {
  if (page === 'home') return content.modularPagesV2?.home?.sections?.filter((section) => section.visible !== false && section.type !== 'noticeBanner') ?? [];
  return content.modularPagesV2?.[page]?.sections?.filter((section) => section.visible !== false && section.type !== 'noticeBanner') ?? [];
}

function extraV2ServiceRows(value: unknown): SiteContent['services'] {
  return Array.isArray(value)
    ? value
        .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
        .map((item) => ({
          title: cmsV2Text(item.title) || cmsV2Text(item.name),
          description: cmsV2Text(item.description),
          price: cmsV2Text(item.price) || cmsV2Text(item.meta),
          imageUrl: cmsV2Image(item.image),
          learnMoreLabel: cmsV2LinkLabel(item.button),
          learnMoreHref: cmsV2LinkHref(item.button),
          detailSlug: cmsV2Text(item.detailSlug),
          detailPublished: cmsV2Boolean(item.detailPublished, true),
          detailSubtitle: cmsV2Text(item.detailSubtitle),
          detailBody: cmsV2Text(item.detailBody),
          detailBodyHtml: cmsV2Text(item.detailBodyHtml),
          detailGallery: Array.isArray(item.detailGallery) ? item.detailGallery.map(cmsV2Text).filter(Boolean) : [],
        }))
        .filter((item) => item.title || item.description || item.imageUrl)
    : [];
}

function extraV2AdditionalFormFields(value: unknown, fallback: SiteContent['formFields'] = []): SiteContent['formFields'] {
  if (!Array.isArray(value)) return fallback;
  const extra = value
    .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
    .map((item) => {
      const label = cmsV2Text(item.label);
      const rawKey = cmsV2Text(item.fieldKey) || label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
      const type = cmsV2Text(item.fieldType);
      const fieldType: SiteContent['formFields'][number]['type'] = type === 'email' || type === 'tel' || type === 'textarea' || type === 'date' ? type : 'text';
      return {
        key: rawKey || 'zusatzfeld',
        label,
        required: cmsV2Boolean(item.required, false),
        type: fieldType,
      };
    })
    .filter((field) => field.label);
  if (!extra.length) return fallback;
  const seen = new Set<string>();
  return [...fallback, ...extra].filter((field) => {
    const key = field.key || field.label;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extraV2Content(content: SiteContent, branch: ExtraBranchKey, section: ModularSectionV2): SiteContent {
  const data = asUnknownRecord(section.data);
  switch (section.type) {
    case 'noticeBanner':
      return { ...content, announcements: cmsV2TextItems(data.items) };
    case 'hero':
      return {
        ...content,
        hero: {
          ...content.hero,
          title: cmsV2Text(data.headline) || content.hero.title,
          subtitle: cmsV2Text(data.subline),
          body: cmsV2Text(data.description),
          imageUrl: cmsV2Image(data.backgroundImage) || cmsV2Image(data.image) || content.hero.imageUrl,
          ctaLabel: cmsV2LinkLabel(data.buttonPrimary) || content.hero.ctaLabel,
          ctaHref: cmsV2LinkHref(data.buttonPrimary) || content.hero.ctaHref,
        },
        branchText: { ...content.branchText, heroEyebrow: cmsV2Text(data.eyebrow), heroImageUrl: cmsV2Image(data.image) },
      };
    case 'serviceCards':
    case 'serviceInfo':
      return { ...content, services: extraV2ServiceRows(data.items) };
    case 'classCards':
    case 'programTable':
    case 'trainingPlanOverview': {
      const courses = extraV2ServiceRows(data.items ?? data.rows ?? data.stats).map((item) => ({
        name: item.title,
        description: item.description,
        schedule: item.detailSubtitle,
        level: '',
        duration: '',
        trainer: '',
        price: item.price,
        imageUrl: item.imageUrl,
        detailSlug: item.detailSlug,
        detailPublished: item.detailPublished,
        detailBody: item.detailBody,
        detailBodyHtml: item.detailBodyHtml,
        detailGallery: item.detailGallery,
        detailSubtitle: item.detailSubtitle,
      }));
      return { ...content, courses, services: extraV2ServiceRows(data.items ?? data.rows ?? data.stats) };
    }
    case 'processTextColumns':
    case 'processCards':
      return { ...content, processSteps: extraV2ServiceRows(data.items).map((item) => ({ title: item.title, description: item.description, duration: item.price, imageUrl: item.imageUrl, detailSlug: item.detailSlug, detailPublished: item.detailPublished, detailSubtitle: item.detailSubtitle, detailBody: item.detailBody, detailBodyHtml: item.detailBodyHtml, detailGallery: item.detailGallery })) };
    case 'pricingPackages':
      return { ...content, packages: extraV2ServiceRows(data.items).map((item) => ({ name: item.title, price: item.price, period: '', description: item.description, features: [], highlight: false, ctaLabel: item.learnMoreLabel, ctaHref: item.learnMoreHref, imageUrl: item.imageUrl, detailSlug: item.detailSlug, detailPublished: item.detailPublished, detailSubtitle: item.detailSubtitle, detailBody: item.detailBody, detailBodyHtml: item.detailBodyHtml, detailGallery: item.detailGallery })) };
    case 'team':
    case 'trainers': {
      const team = Array.isArray(data.items)
        ? data.items.filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item)).map((item) => ({ n: cmsV2Text(item.name) || cmsV2Text(item.title), r: cmsV2Text(item.role), bio: cmsV2Text(item.bio) || cmsV2Text(item.description), img: cmsV2Image(item.image) }))
        : [];
      return { ...content, team };
    }
    case 'appointmentBooking':
      return { ...content, booking: { enabled: true, provider: cmsV2Text(data.provider), url: cmsV2LinkHref(data.button) || cmsV2Text(data.url), embedUrl: cmsV2Text(data.embedUrl), note: cmsV2Text(data.description) } };
    case 'galleryPreview':
    case 'gallery':
      return { ...content, gallery: Array.isArray(data.images) ? data.images.map((item) => cmsV2Image(item)).filter(Boolean) : content.gallery };
    case 'testimonials': {
      const raw = Array.isArray(data.testimonials) ? data.testimonials : Array.isArray(data.items) ? data.items : [];
      return { ...content, testimonials: raw.filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item)).map((item) => ({ author: cmsV2Text(item.name) || cmsV2Text(item.author), text: cmsV2Text(item.quote) || cmsV2Text(item.text) })) };
    }
    case 'statsBand':
      return { ...content, numbers: cmsV2TextPairs(data.items).map((item) => ({ value: item.t, label: item.d })) };
    case 'faq':
      return { ...content, faq: cmsV2FaqItems(data.items) };
    case 'contactPreview':
    case 'cta':
      return { ...content, ctaBandOverride: { ...content.ctaBandOverride, eyebrow: cmsV2Text(data.eyebrow), lead: cmsV2Text(data.headline), sub: cmsV2Text(data.subline) || cmsV2Text(data.description), cta: cmsV2LinkLabel(data.button), ctaHref: cmsV2LinkHref(data.button) } };
    case 'contactDetails':
      return {
        ...content,
        contact: { ...content.contact, mapsUrl: cmsV2Text(data.googleMapsUrl) || content.contact.mapsUrl },
        contactBlock: { ...content.contactBlock, eyebrow: cmsV2Text(data.eyebrow), title: cmsV2Text(data.headline), subtitle: cmsV2Text(data.subline) },
        formFields: extraV2AdditionalFormFields(data.additionalFormFields, content.formFields),
      };
    default:
      void branch;
      return content;
  }
}

function ExtraV2Cards({ section, title }: { section: ModularSectionV2; title: string }) {
  const data = asUnknownRecord(section.data);
  const items = cmsV2TextPairs(data.items);
  if (!items.length) return null;
  return (
    <Section eyebrow={cmsV2Text(data.eyebrow)} title={cmsV2Text(data.headline) || title} subtitle={cmsV2Text(data.intro) || cmsV2Text(data.description)} className="surface">
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {items.map((item, i) => <article key={i} className="bg-white border border-line rounded-2xl p-7"><h3 className="font-display text-2xl">{item.t}</h3><p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p></article>)}
      </div>
    </Section>
  );
}

function ExtraV2Page({ content, branch, page, style, eyebrow }: { content: SiteContent; branch: ExtraBranchKey; page: ExtraPage; style: ExtraStyle; eyebrow: string }) {
  const sections = extraV2Sections(content, page);
  const heroSection = sections.find((section) => section.type === 'hero');
  const heroContent = heroSection ? extraV2Content(content, branch, heroSection) : content;
  const headerKey = page === 'home' ? null : PAGE_HEADER_KEY[page];
  const header = headerKey ? pageHeaderOverride(heroContent, headerKey) : null;
  const heroTitle = page === 'home' ? heroContent.hero.title : header?.title || PAGE_TITLES[page];
  const heroEyebrow = page === 'home' ? effectiveBranchText(branch, heroContent).heroEyebrow || eyebrow : header?.eyebrow || PAGE_TITLES[page];
  const heroSubtitle = page === 'home' ? heroContent.hero.subtitle : header?.subtitle || '';

  return (
    <>
      <PageHero eyebrow={heroEyebrow} title={heroTitle} subtitle={heroSubtitle} style={style} />
      {sections.filter((section) => section.type !== 'hero').map((section) => {
        const patched = extraV2Content(content, branch, section);
        switch (section.type) {
          case 'keywordBand': {
            const words = cmsV2TextItems(asUnknownRecord(section.data).items);
            return words.length ? <Section key={section.id} spacing="md"><div className="flex flex-wrap gap-3">{words.map((word) => <span key={word} className="rounded-full border border-line px-4 py-2 text-sm">{word}</span>)}</div></Section> : null;
          }
          case 'serviceCards':
          case 'serviceInfo':
          case 'classCards':
            return <React.Fragment key={section.id}><ExtraLeistungenServiceCards content={patched} branch={branch} style={style} /><BranchModulesInline variant={branch} content={patched} /></React.Fragment>;
          case 'processTextColumns':
          case 'processCards':
          case 'pricingPackages':
          case 'team':
          case 'trainers':
          case 'appointmentBooking':
          case 'trainingPlanOverview':
          case 'programTable':
            return <BranchModulesInline key={section.id} variant={branch} content={patched} />;
          case 'storyTeaser':
          case 'teaserList':
          case 'categoryCards':
          case 'contactPreview':
          case 'directions':
            return <ExtraV2Cards key={section.id} section={section} title="Details." />;
          case 'galleryPreview':
          case 'gallery':
            return patched.gallery.length ? <Section key={section.id} spacing="lg"><MasonryLightbox images={section.type === 'galleryPreview' ? patched.gallery.slice(0, 8) : patched.gallery} /></Section> : null;
          case 'testimonials':
            return meaningfulTestimonials(patched.testimonials).length ? <Section key={section.id} title="Stimmen." className="surface"><div className="grid md:grid-cols-3 gap-5">{meaningfulTestimonials(patched.testimonials).slice(0, 3).map((t, i) => <blockquote key={i} className="bg-white border border-line rounded-2xl p-7"><p>{t.text}</p><footer className="mt-5 text-sm font-medium">{t.author}</footer></blockquote>)}</div></Section> : null;
          case 'statsBand':
            return <ExtraHomeNumbersBand key={section.id} content={patched} />;
          case 'newsTeaser':
            return <NewsPreview key={section.id} templateVariant={branch} content={patched} eyebrow={patched.branchText?.newsEyebrow || 'News'} title={patched.branchText?.newsTitle || 'Aktuelles.'} />;
          case 'faq':
            return patched.faq?.length ? <Section key={section.id} title="Häufige Fragen."><Accordion items={patched.faq} /></Section> : null;
          case 'cta':
            return <ExtraHomeSoftCta key={section.id} branch={branch} content={patched} layoutStyle={style} />;
          case 'contactDetails':
            return <Section key={section.id} title="Kontakt"><ContactBlock content={patched} showForm /></Section>;
          case 'locations':
            return <ExtraV2Cards key={section.id} section={{ ...section, data: { items: asUnknownRecord(section.data).locations } }} title="Standorte." />;
          case 'timeline':
            return <Timeline key={section.id} content={content} />;
          default:
            return null;
        }
      })}
    </>
  );
}

/** Multi-page showcase template with three distinct layouts (classic / modern / bold). */
export default function ExtraBranchTemplate({
  content,
  style = 'classic',
  branch = 'consulting',
  eyebrow,
  basePath = '',
}: Props) {
  useReveal();
  const eb = eyebrow ?? content.brand.tagline ?? '';
  const Layout = style === 'modern' ? ModernLayout : style === 'bold' ? BoldLayout : ClassicLayout;
  const useV2 = shouldUseExtraCmsV2Frontend(content, branch, style);
  return (
    <BasePathProvider value={basePath}>
      <div className={`min-h-screen flex flex-col tpl-style-${style} tpl-branch-${branch} bg-[var(--bg-color)] text-[var(--text-color)]`}>
        <ConsentScripts scripts={(content as any).customScripts} />
        <ExtraHeader content={content} style={style} branch={branch} />
        <main className="flex-1">
          <ScrollToTopOnRoute />
          <Routes>
            <Route index element={<><PageSeoExtra content={content} branch={branch} page="home" />{useV2 ? <ExtraV2Page content={content} eyebrow={eb} branch={branch} page="home" style={style} /> : <Layout content={content} eyebrow={eb} branch={branch} page="home" />}</>} />
            <Route
              path="leistungen/:catalogSlug"
              element={(
                <>
                  <PageSeoExtra content={content} branch={branch} page="services" />
                  <CatalogItemDetailPage content={content} template={branch} style={style} />
                </>
              )}
            />
            <Route path="leistungen" element={<><PageSeoExtra content={content} branch={branch} page="services" />{useV2 ? <ExtraV2Page content={content} eyebrow={eb} branch={branch} page="services" style={style} /> : <SubPage content={content} branch={branch} page="services" style={style} eyebrow={eb} />}</>} />
            <Route path="galerie" element={<><PageSeoExtra content={content} branch={branch} page="gallery" />{useV2 ? <ExtraV2Page content={content} eyebrow={eb} branch={branch} page="gallery" style={style} /> : <SubPage content={content} branch={branch} page="gallery" style={style} eyebrow={eb} />}</>} />
            <Route path="ueber-uns" element={<><PageSeoExtra content={content} branch={branch} page="about" />{useV2 ? <ExtraV2Page content={content} eyebrow={eb} branch={branch} page="about" style={style} /> : <SubPage content={content} branch={branch} page="about" style={style} eyebrow={eb} />}</>} />
            <Route path="kontakt" element={<><PageSeoExtra content={content} branch={branch} page="contact" />{useV2 ? <ExtraV2Page content={content} eyebrow={eb} branch={branch} page="contact" style={style} /> : <SubPage content={content} branch={branch} page="contact" style={style} eyebrow={eb} />}</>} />
            <Route path="news" element={<NewsIndexPage content={content} basePath={basePath} templateVariant={branch} />} />
            <Route path="news/:slug" element={<NewsDetailPage content={content} basePath={basePath} templateVariant={branch} />} />
            <Route path="impressum" element={<Imprint content={content} />} />
            <Route path="datenschutz" element={<Privacy content={content} />} />
            <Route path="*" element={<><PageSeoExtra content={content} branch={branch} page="home" />{useV2 ? <ExtraV2Page content={content} eyebrow={eb} branch={branch} page="home" style={style} /> : <Layout content={content} eyebrow={eb} branch={branch} page="home" />}</>} />
          </Routes>
        </main>
        <ExtraFooter content={content} style={style} />
      </div>
    </BasePathProvider>
  );
}

/* ─── Compact page hero used on subpages ─────────────────────────── */
function PageHero({ eyebrow, title, subtitle, style }: { eyebrow: string; title: string; subtitle?: string; style: ExtraStyle }) {
  return (
    <section className="pt-32 md:pt-40 pb-12 md:pb-16 surface">
      <div className="container-x">
        {eyebrow && <p className={style === 'modern' ? 'text-xs font-mono uppercase tracking-widest text-muted mb-4 reveal' : 'eyebrow mb-5 reveal'}>{eyebrow}</p>}
        <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9] break-words [overflow-wrap:anywhere] [hyphens:auto]' : 'headline-xl'}`}>{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-3xl text-lg md:text-xl text-muted reveal">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

/** Detail-URL unter dem jeweiligen Leistungen-Pfad (extras: immer `/leistungen/…`). */
function serviceDetailHref(branch: ExtraBranchKey, s: SiteContent['services'][number]): string | null {
  const slug = (s.detailSlug ?? '').trim();
  if (!slug || s.detailPublished === false) return null;
  const base = getBranchConfig(branch).paths.services;
  return `${base}/${slug}`;
}

/** Per-service „Mehr erfahren“ — bei gesetztem `detailSlug` zur Detailseite, sonst Overrides / Anker. */
function extraServiceLearnMore(
  s: SiteContent['services'][number],
  bt: ReturnType<typeof effectiveBranchText>,
  branch: ExtraBranchKey,
): { label: string; href: string } {
  const g = bt as unknown as Record<string, string | undefined>;
  const base = (s.learnMoreLabel ?? '').trim() || (g.learnMoreLabel ?? '').trim() || 'Mehr erfahren';
  const label = `${base.replace(/\s*→\s*$/u, '').trim()} →`;
  const detail = serviceDetailHref(branch, s);
  if (detail) return { label, href: detail };
  const href = (s.learnMoreHref ?? '').trim() || (g.learnMoreHref ?? '').trim() || '#leistungen';
  return { label, href };
}

/* ─── Sub-page renderer (services / gallery / about / contact) ──── */
const PAGE_HEADER_KEY: Record<Exclude<ExtraPage, 'home'>, 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader'> = {
  services: 'servicesHeader',
  gallery: 'galleryHeader',
  about: 'aboutHeader',
  contact: 'contactPageHeader',
};

/** /leistungen — same `content.services` + teaser copy as home; optional „Alle“-Link via branchText. */
function ExtraLeistungenServiceCards({
  content,
  branch,
  style,
}: {
  content: SiteContent;
  branch: ExtraBranchKey;
  style: ExtraStyle;
}) {
  if (content.services.length === 0) return null;
  const bt = effectiveBranchText(branch, content);
  const allLabel = (bt.servicesAllLabel ?? '').trim();
  const allHref = (bt.servicesAllHref ?? '').trim();
  const showAll = allLabel.length > 0 && allHref.length > 0;
  const cardNote = (bt.serviceCardNote ?? '').trim();

  const teaserClassic = (
    <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
      <div className="md:col-span-7 reveal">
        <p className="eyebrow mb-5">{bt.servicesTeaserEyebrow || 'Leistungen'}</p>
        <h2 className="headline-lg">{bt.servicesTeaserTitle || <>Was wir<br /><em className="italic-pop">für Sie tun.</em></>}</h2>
      </div>
      <p className="md:col-span-5 text-lg text-muted reveal">
        {bt.teaserSubtitle || 'Eine Auswahl aus unserem Repertoire. Mehr im persönlichen Gespräch.'}
      </p>
    </div>
  );
  const teaserModern = (
    <div className="max-w-2xl reveal mb-16">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{bt.servicesTeaserEyebrow || 'Leistungen'}</p>
      <h2 className="font-display text-4xl md:text-5xl">{bt.servicesTeaserTitle || 'Was Sie bekommen.'}</h2>
      <p className="mt-4 text-lg text-muted">{bt.teaserSubtitle || 'Klar definierte Pakete – keine versteckten Kosten.'}</p>
    </div>
  );
  const teaserBold = (
    <div className="grid md:grid-cols-12 gap-8 mb-16 reveal">
      <p className="md:col-span-2 font-display text-6xl sm:text-7xl md:text-9xl leading-none text-[var(--accent-color)]">02</p>
      <div className="md:col-span-10">
        {bt.servicesTeaserEyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-3">{bt.servicesTeaserEyebrow}</p>
        )}
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">{bt.servicesTeaserTitle || 'Leistungen.'}</h2>
      </div>
    </div>
  );

  const gridClassic = (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
      {content.services.map((s, i) => {
        const dHref = serviceDetailHref(branch, s);
        return (
          <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift group">
            {s.imageUrl && (
              <div className="aspect-[4/3] overflow-hidden img-zoom">
                {dHref ? (
                  <ExtraHeroLink href={dHref} className="block w-full h-full">
                    <img src={s.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </ExtraHeroLink>
                ) : (
                  <img src={s.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl">
                  {dHref ? (
                    <ExtraHeroLink href={dHref} className="text-inherit no-underline hover:underline">{s.title}</ExtraHeroLink>
                  ) : (
                    s.title
                  )}
                </h3>
                {s.price && <span className="font-mono text-xs text-[var(--accent-color-2,_var(--accent-color))] whitespace-nowrap mt-1">{s.price}</span>}
              </div>
              {s.description && <p className="mt-3 text-muted leading-relaxed">{s.description}</p>}
              <div className="mt-4 pt-4 border-t border-line flex justify-end">
                {(() => {
                  const lm = extraServiceLearnMore(s, bt, branch);
                  return (
                    <ExtraHeroLink href={lm.href} className="text-xs uppercase tracking-widest text-[var(--accent-color)] no-underline hover:underline">
                      {lm.label}
                    </ExtraHeroLink>
                  );
                })()}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
  const gridModern = (
    <div className="grid md:grid-cols-2 gap-4 reveal-stagger">
      {content.services.map((s, i) => {
        const dHref = serviceDetailHref(branch, s);
        return (
          <article key={i} className="group bg-white border border-line rounded-2xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">/ {String(i + 1).padStart(2, '0')}</span>
              {s.price && <span className="font-display text-lg">{s.price}</span>}
            </div>
            <h3 className="font-display text-2xl md:text-3xl mb-3">
              {dHref ? (
                <ExtraHeroLink href={dHref} className="text-inherit no-underline hover:underline">{s.title}</ExtraHeroLink>
              ) : (
                s.title
              )}
            </h3>
            {s.description && <p className="text-muted leading-relaxed mb-6">{s.description}</p>}
            <div className="pt-4 border-t border-line flex items-center justify-between text-sm">
              <span className="text-muted">{cardNote}</span>
              {(() => {
                const lm = extraServiceLearnMore(s, bt, branch);
                return (
                  <ExtraHeroLink href={lm.href} className="text-[var(--accent-color)] font-medium opacity-0 group-hover:opacity-100 transition no-underline hover:underline">
                    {lm.label}
                  </ExtraHeroLink>
                );
              })()}
            </div>
          </article>
        );
      })}
    </div>
  );
  const gridBold = (
    <ul className="reveal-stagger">
      {content.services.map((s, i) => {
        const dHref = serviceDetailHref(branch, s);
        return (
          <li key={i} className="group border-t border-line last:border-b py-8 md:py-12 hover:bg-white/30 transition-colors">
            <div className="container-x grid md:grid-cols-12 gap-6 items-baseline">
              <span className="md:col-span-1 font-mono text-sm text-muted">/ {String(i + 1).padStart(2, '0')}</span>
              <h3 className="md:col-span-6 font-display text-3xl md:text-5xl leading-tight transition-transform group-hover:translate-x-2">
                {dHref ? (
                  <ExtraHeroLink href={dHref} className="text-inherit no-underline hover:underline">{s.title}</ExtraHeroLink>
                ) : (
                  s.title
                )}
              </h3>
              <p className="md:col-span-4 text-muted leading-relaxed">{s.description}</p>
              {s.price && <span className="md:col-span-1 md:text-right font-display text-2xl">{s.price}</span>}
              <div className="md:col-span-12 mt-4 flex justify-end">
                {(() => {
                  const lm = extraServiceLearnMore(s, bt, branch);
                  return (
                    <ExtraHeroLink href={lm.href} className="text-xs uppercase tracking-widest text-[var(--accent-color)] no-underline hover:underline">
                      {lm.label}
                    </ExtraHeroLink>
                  );
                })()}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  const teaser = style === 'modern' ? teaserModern : style === 'bold' ? teaserBold : teaserClassic;
  const grid = style === 'modern' ? gridModern : style === 'bold' ? gridBold : gridClassic;

  return (
    <section id="leistungen-karten" className={style === 'bold' ? 'py-24 md:py-40 surface' : 'py-24 md:py-32'}>
      <div className="container-x">
        {teaser}
        {grid}
        {style !== 'modern' && cardNote.length > 0 && (
          <p className="mt-10 text-sm text-muted max-w-2xl reveal">{cardNote}</p>
        )}
        {showAll && (
          <div className="mt-12 flex justify-end reveal">
            <ExtraHeroLink href={allHref} className="btn-outline">{allLabel} <span aria-hidden>→</span></ExtraHeroLink>
          </div>
        )}
      </div>
    </section>
  );
}

type ExtraGalleryStory = {
  eyebrow: string;
  title: string;
  body: string;
  captions: Array<{ t: string; d: string }>;
};

const EXTRA_GALLERY_STORY_FALLBACK: Record<ExtraBranchKey, ExtraGalleryStory> = {
  consulting: {
    eyebrow: 'Hinter dem Bericht',
    title: 'Echte Projekte, echte Teams.',
    body: 'Die Fotos entstanden bei Workshops, Kick-offs und Go-lives – nicht im Stock-Foto-Pool. Sie sehen unsere Arbeitswelten und die Menschen, mit denen wir zusammenarbeiten.',
    captions: [
      { t: 'Workshops', d: 'Whiteboards, Post-its, intensive Phasen – wenn Entscheidungen fallen.' },
      { t: 'Vor Ort', d: 'Wir arbeiten bei Ihnen im Haus – ohne Koffer-Powerpoints von gestern.' },
      { t: 'Umsetzung', d: 'Meilensteine, Reviews, die Momente, in denen aus Strategie Alltag wird.' },
    ],
  },
  medical: {
    eyebrow: 'Einblick Praxisalltag',
    title: 'Räume, Menschen, Atmosphäre.',
    body: 'Unsere Galerie zeigt Behandlungsräume, Team und Empfang – wie Patient:innen sie vorfinden. Ohne klinisches Theater, mit echtem Tageslicht und ruhigen Wartebereichen.',
    captions: [
      { t: 'Sprechzimmer', d: 'Zeit für Gespräch – Bildschirm nur, wenn er wirklich hilft.' },
      { t: 'Diagnostik', d: 'EKG, Labor, Ultraschall – moderne Geräte, persönliche Auswertung.' },
      { t: 'Therapie', d: 'Akupunktur, manuelle Verfahren, ruhige Behandlungsliegen.' },
    ],
  },
  fitness: {
    eyebrow: 'Durch das Studio',
    title: 'Holz, Licht, Gemeinschaft.',
    body: 'So sieht das Studio aus, wenn Kurse laufen und danach: viel Holz, große Fenster, Matten, Reformer und der Tee-Bereich.',
    captions: [
      { t: 'Yoga-Raum', d: 'Mattenabstand, Tageslicht, gute Akustik – nicht gedrängelt.' },
      { t: 'Reformer', d: 'Maximal fünf Personen pro Stunde – jede Korrektur sichtbar.' },
      { t: 'Gemeinschaft', d: 'Pause, Plaudern, Tee – der Teil, der ein kleines Studio ausmacht.' },
    ],
  },
};

const EXTRA_GALLERY_CATEGORY_FALLBACK: Record<ExtraBranchKey, Array<{ t: string; d: string }>> = {
  consulting: [
    { t: 'Strategie & Analyse', d: 'Diagnose-Workshops, Datenräume, Org-Charts und das, was wir schriftlich festhalten.' },
    { t: 'Transformation', d: 'Change-Kommunikation, Schulungen, Begleitung beim Roll-out.' },
    { t: 'Operative Exzellenz', d: 'Controlling, PMO, Sockel-Prozesse – wenn Klarheit im Alltag ankommt.' },
  ],
  medical: [
    { t: 'Praxis & Empfang', d: 'Wartebereich, Terminkoordination, barrierefreier Zugang.' },
    { t: 'Diagnostik & Vorsorge', d: 'Labor, EKG, Langzeit-Blutdruck, Check-up-Auswertung.' },
    { t: 'Therapie & Prävention', d: 'Akupunktur, Ernährung, Mikronährstoffe, Begleitung chronischer Beschwerden.' },
  ],
  fitness: [
    { t: 'Yoga & Flow', d: 'Vinyasa, Yin, Restorative – alle Levels mit Zeit für Korrektur.' },
    { t: 'Pilates & Kraft', d: 'Reformer, Props, kleine Gruppen mit messbarem Fortschritt.' },
    { t: 'Community', d: 'Workshops, Retreats, offene Sonntage – Studio-Leben jenseits der Stunde.' },
  ],
};

/** Galerie-Story inkl. `galleryStory`-Overlay (Admin) — `galleryStory` für Drift-Coverage. */
function ExtraGalleryStorySection({ branch, content }: { branch: ExtraBranchKey; content: SiteContent }) {
  const overlay = ((content as unknown as { galleryStory?: Partial<ExtraGalleryStory> }).galleryStory ?? {}) as Partial<ExtraGalleryStory>;
  const base = EXTRA_GALLERY_STORY_FALLBACK[branch];
  const merged: ExtraGalleryStory = {
    eyebrow: (overlay.eyebrow && overlay.eyebrow.trim()) || base.eyebrow,
    title: (overlay.title && overlay.title.trim()) || base.title,
    body: (overlay.body && overlay.body.trim()) || base.body,
    captions: normaliseTdList(overlay.captions ?? []).length ? normaliseTdList(overlay.captions ?? []) : base.captions,
  };
  if (!(merged.title || merged.body)) return null;
  return (
    <Section eyebrow={merged.eyebrow} title={merged.title} className="surface" spacing="lg">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 reveal">
          {merged.body.split('\n\n').filter(Boolean).map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted mb-5">{p}</p>
          ))}
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-3 gap-5 reveal-stagger">
          {(merged.captions || []).filter((c) => c.t || c.d).map((c, i) => (
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

/** Kategorien unter der Galerie — `galleryCategories` aus Content oder Fallback. */
function ExtraGalleryCategoriesSection({ branch, content }: { branch: ExtraBranchKey; content: SiteContent }) {
  const bt = effectiveBranchText(branch, content);
  const overlay = normaliseTdList(((content as unknown as { galleryCategories?: unknown }).galleryCategories) ?? []);
  const list = overlay.filter((c) => c.t || c.d);
  const cats = list.length ? list : EXTRA_GALLERY_CATEGORY_FALLBACK[branch];
  if (!cats.length) return null;
  return (
    <Section
      eyebrow={bt.galleryCategoriesEyebrow || 'Bereiche'}
      title={bt.galleryCategoriesTitle || 'Überblick.'}
      spacing="lg"
    >
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {cats.map((c, i) => (
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

function ExtraGalleryTestimonials({ content, branch }: { content: SiteContent; branch: ExtraBranchKey }) {
  const rows = meaningfulTestimonials(content.testimonials);
  if (rows.length === 0) return null;
  const bt = effectiveBranchText(branch, content);
  return (
    <section className="py-24 md:py-32 surface">
      <div className="container-x">
        <p className="eyebrow mb-5 reveal">{bt.testimonialsEyebrow || 'Stimmen'}</p>
        <h2 className="headline-lg max-w-3xl reveal mb-12">{bt.testimonialsTitle || <>Was unsere<br /><em className="italic-pop">Kund:innen sagen.</em></>}</h2>
        <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
          {rows.map((t, i) => (
            <blockquote key={i} className="bg-white border border-line rounded-3xl p-8 hover-lift">
              <p className="text-lg leading-relaxed">„{t.text}"</p>
              <footer className="mt-6 pt-5 border-t border-line text-sm font-medium">— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Schließt-CTA für Unterseiten — `page` steuert `ctaBandOverrides.{page}` (Drift-Subpage-Flags). */
function ExtraSubpageCta({ content, page }: { content: SiteContent; page: 'gallery' | 'about' | 'services' | 'contact' }) {
  const perPage = ((content as unknown as { ctaBandOverrides?: Record<string, Record<string, string | undefined>> }).ctaBandOverrides ?? {})[page] ?? {};
  const global = (content as unknown as { ctaBandOverride?: Record<string, string | undefined> }).ctaBandOverride ?? {};
  const pick = (field: 'lead' | 'sub' | 'cta' | 'ctaHref' | 'eyebrow' | 'leadAccent') =>
    (perPage[field] && String(perPage[field]).trim()) || (global[field] && String(global[field]).trim()) || '';
  const def =
    page === 'gallery'
      ? { eyebrow: 'Mehr gesehen als genug?', lead: 'Nächster Schritt', sub: 'Schreiben Sie uns – wir antworten persönlich, meist innerhalb eines Werktags.', cta: 'Kontakt aufnehmen', ctaHref: '/kontakt' }
      : page === 'services'
        ? { eyebrow: 'Nächster Schritt', lead: 'Projekt besprechen?', sub: 'Wir melden uns persönlich – meist innerhalb eines Werktags.', cta: 'Kontakt aufnehmen', ctaHref: '/kontakt' }
        : page === 'contact'
          ? { eyebrow: 'Noch Fragen?', lead: 'Wir sind für Sie da', sub: 'Schreiben Sie uns – wir antworten direkt und unkompliziert.', cta: 'Zurück zur Startseite', ctaHref: '/' }
          : { eyebrow: 'Persönlich weiter?', lead: 'Wir freuen uns auf Sie', sub: 'Ein kurzes Gespräch reicht, um zu klären, ob wir zusammenpassen.', cta: 'Kontakt aufnehmen', ctaHref: '/kontakt' };
  const eyebrow = pick('eyebrow') || def.eyebrow;
  const lead = pick('lead') || def.lead;
  const sub = pick('sub') || def.sub;
  const cta = pick('cta') || def.cta;
  const ctaHref = pick('ctaHref') || def.ctaHref;
  const leadAccent = page === 'about' ? (pick('leadAccent') || '') : '';
  return (
    <section className="py-32 md:py-44 surface relative overflow-hidden">
      <div className="container-x text-center max-w-3xl mx-auto reveal">
        {eyebrow ? <p className="eyebrow mb-5 justify-center">{eyebrow}</p> : null}
        <h2 className="headline-xl">
          {lead}
          {leadAccent ? (
            <>
              <br />
              <em className="italic-pop">{leadAccent}</em>
            </>
          ) : null}
        </h2>
        <p className="mt-8 text-lg md:text-xl text-muted">{sub}</p>
        <div className="mt-12">
          <ExtraHeroLink href={ctaHref} className="btn-primary">
            {cta} <span aria-hidden>→</span>
          </ExtraHeroLink>
        </div>
      </div>
    </section>
  );
}

/** Zahlen-Band auf /ueber-uns — `aboutNumbers` aus Admin „Eckdaten“. */
function ExtraAboutNumbersBand({ content }: { content: SiteContent }) {
  const raw = ((content as unknown as { aboutNumbers?: Array<{ value?: string; label?: string }> }).aboutNumbers) ?? [];
  const rows = raw.filter((n) => n && (String(n.value ?? '').trim() || String(n.label ?? '').trim()));
  if (!rows.length) return null;
  return (
    <section className="py-20 md:py-28 bg-brand text-white grain relative overflow-hidden">
      <div className="blob -top-40 -left-40 w-[500px] h-[500px]" style={{ background: 'var(--accent-color)', opacity: 0.18 }} />
      <div className="container-x relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 reveal-stagger">
          {rows.map((m, i) => (
            <div key={i} className="md:border-l border-white/15 md:pl-8">
              <p className="num-display text-5xl md:text-7xl leading-none font-display">{m.value}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-white/60">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function extraSubpageOrder(content: SiteContent, page: LayoutPageId, branch: ExtraBranchKey): string[] {
  return getEffectivePageOrder(content, page, branch).filter((k) => isSectionEnabled(content, page, k));
}

function resolveExtraFaq(branch: ExtraBranchKey, content: SiteContent): { q: string; a: string }[] {
  const mapped = normaliseFaqList((content as unknown as { faq?: unknown }).faq ?? []);
  if (mapped.length > 0) return mapped;
  return FAQ_DEFAULTS[branch] ?? [];
}

function ExtraServicesHighlightsRibbon({ content }: { content: SiteContent }) {
  const c = content as unknown as Record<string, unknown>;
  const list = mergedServiceHighlights(c.serviceHighlights, c.highlights).filter((it) => it.t || it.d);
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

function ExtraServicesGalleryTeaser({ content, branch }: { content: SiteContent; branch: ExtraBranchKey }) {
  if (content.gallery.length === 0) return null;
  const bt = effectiveBranchText(branch, content);
  const slice = content.gallery.slice(0, 8);
  return (
    <section className="py-16 md:py-24 surface">
      <div className="container-x">
        <div className="mb-10 reveal">
          <p className="eyebrow mb-3">{bt.galleryTeaserEyebrow || 'Eindrücke'}</p>
          <h2 className="headline-lg">{bt.galleryTeaserTitle || 'Aus unserem Alltag.'}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 reveal-stagger">
          {slice.map((src, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden img-zoom border border-line">
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtraServicesTestimonialsBand({ content, branch, style }: { content: SiteContent; branch: ExtraBranchKey; style: ExtraStyle }) {
  const rows = meaningfulTestimonials(content.testimonials);
  if (rows.length === 0) return null;
  const bt = effectiveBranchText(branch, content);
  const band = style === 'bold' ? 'py-24 md:py-40 bg-[var(--text-color)] text-[var(--bg-color)]' : 'py-16 md:py-24 surface';
  return (
    <section className={band}>
      <div className="container-x">
        <p className={style === 'modern' ? 'text-xs font-mono uppercase tracking-widest text-muted mb-4 reveal' : 'eyebrow mb-5 reveal'}>{bt.testimonialsEyebrow || 'Stimmen'}</p>
        <h2 className={`${style === 'bold' ? 'font-display text-4xl md:text-6xl max-w-4xl' : 'headline-lg max-w-3xl'} reveal mb-12`}>{bt.testimonialsTitle || <>Was unsere<br /><em className="italic-pop">Kund:innen sagen.</em></>}</h2>
        <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
          {rows.map((t, i) => (
            <figure key={i} className={`rounded-3xl p-7 md:p-8 ${style === 'bold' ? 'bg-white/5 border border-white/10' : 'bg-white border border-line'}`}>
              <blockquote className="text-lg leading-relaxed">„{t.text}"</blockquote>
              <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">— {t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtraAboutIntroBlock({ content, branch }: { content: SiteContent; branch: ExtraBranchKey }) {
  if (!content.about) return null;
  const bt = effectiveBranchText(branch, content);
  return (
    <section className="py-16 md:py-24">
      <div className="container-x grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 reveal">
          {(content.about.imageUrl || content.gallery[0]) && (
            <img src={content.about.imageUrl || content.gallery[0]} alt={content.about.title} className="rounded-3xl w-full aspect-[4/5] object-cover" loading="lazy" />
          )}
        </div>
        <div className="md:col-span-7 reveal">
          <p className="eyebrow mb-5">{bt.aboutTeaserEyebrow || 'Über uns'}</p>
          <h2 className="headline-lg">{content.about.title}</h2>
          <div className="mt-6 text-lg text-muted leading-relaxed space-y-5">
            {content.about.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExtraAboutValuesBlock({ content, branch }: { content: SiteContent; branch: ExtraBranchKey }) {
  const rows = normaliseTdList((content as unknown as { values?: unknown }).values ?? []).filter((v) => v.t || v.d);
  const bt = effectiveBranchText(branch, content);
  if (!rows.length) return null;
  return (
    <Section eyebrow={bt.valuesEyebrow || 'Was uns wichtig ist'} title={bt.valuesTitle || 'Drei Grundsätze.'} spacing="lg" className="surface">
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {rows.map((v, i) => (
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

function ExtraAboutTestimonialsBlock({ content, branch }: { content: SiteContent; branch: ExtraBranchKey }) {
  const rows = meaningfulTestimonials(content.testimonials);
  if (rows.length === 0) return null;
  const rawBt = ((content.branchText ?? {}) as unknown) as Record<string, string | undefined>;
  const abEb = typeof rawBt.aboutTestimonialsEyebrow === 'string' ? rawBt.aboutTestimonialsEyebrow.trim() : '';
  const abTl = typeof rawBt.aboutTestimonialsTitle === 'string' ? rawBt.aboutTestimonialsTitle.trim() : '';
  const bt = effectiveBranchText(branch, content);
  const eyebrow = abEb || bt.testimonialsEyebrow || 'Stimmen';
  const titleText = abTl || bt.testimonialsTitle;
  return (
    <section className="py-16 md:py-24 surface">
      <div className="container-x">
        <p className="eyebrow mb-5 reveal">{eyebrow}</p>
        <h2 className="headline-lg max-w-3xl reveal mb-12">
          {titleText ? titleText : (
            <>
              Was unsere
              <br />
              <em className="italic-pop">Kund:innen sagen.</em>
            </>
          )}
        </h2>
        <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
          {rows.map((t, i) => (
            <figure key={i} className="bg-white border border-line rounded-3xl p-7">
              <blockquote className="text-lg leading-relaxed">„{t.text}"</blockquote>
              <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">— {t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtraFaqSection({ branch, content }: { branch: ExtraBranchKey; content: SiteContent }) {
  const bt = effectiveBranchText(branch, content);
  const items = resolveExtraFaq(branch, content);
  if (!items.length) return null;
  return (
    <Section eyebrow={bt.faqEyebrow || 'Häufig gefragt'} title={bt.faqTitle || 'Antworten auf Ihre Fragen.'} spacing="lg" className="surface">
      <Accordion items={items.map((f) => ({ q: f.q, a: f.a }))} className="max-w-3xl" />
    </Section>
  );
}

function ExtraArrivalSection({ content }: { content: SiteContent }) {
  const rows = normaliseArrivalList((content as unknown as { arrival?: unknown }).arrival ?? []).filter((a) => a.t || a.d);
  if (!rows.length) return null;
  const ov = ((content as any).arrivalSection ?? {}) as { eyebrow?: string; title?: string; subtitle?: string };
  return (
    <Section eyebrow={ov.eyebrow || 'Wegbeschreibung'} title={ov.title || 'So finden Sie uns.'} subtitle={ov.subtitle} spacing="lg" className="surface">
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {rows.map((a, i) => (
          <article key={i} className="bg-white border border-line rounded-3xl p-7 hover-lift">
            <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
            <h3 className="font-display text-2xl mt-3">{a.t}</h3>
            <p className="mt-3 text-muted leading-relaxed">{a.d}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ExtraGalleryGridSection({ content }: { content: SiteContent }) {
  if (content.gallery.length === 0) return null;
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <ExtraMasonry images={content.gallery} />
      </div>
    </section>
  );
}

function SubPage({ content: initialContent, branch, page, style, eyebrow }: {
  content: SiteContent;
  branch: ExtraBranchKey;
  page: Exclude<ExtraPage, 'home'>;
  style: ExtraStyle;
  eyebrow: string;
}) {
  const mergedFull = withModularSiteContent(mergePageBlocksIntoSiteContentForPage(initialContent, page), branch as TemplateKey, style);
  const contentBase = initialContent;
  const ho = pageHeaderOverride(mergedFull, PAGE_HEADER_KEY[page]);
  const title = ho?.title || PAGE_TITLES[page];
  const heroEyebrow = ho?.eyebrow || eyebrow;
  const heroSubtitle = ho?.subtitle || '';
  const cfg = getBranchConfig(branch);
  const pageKey = page as LayoutPageId;
  const legacySubpageOrder = extraSubpageOrder(mergedFull, pageKey, branch);

  if (page === 'services') {
    function buildBlocks(slice: SiteContent): Record<string, React.ReactNode> {
      return {
        highlights: <ExtraServicesHighlightsRibbon content={slice} />,
        list: <ExtraLeistungenServiceCards content={slice} branch={branch} style={style} />,
        process: <BranchSpotlight branch={branch} style={style} content={slice} />,
        module: <BranchModulesInline variant={branch} content={slice} />,
        testimonials: <ExtraServicesTestimonialsBand content={slice} branch={branch} style={style} />,
        gallery: <ExtraServicesGalleryTeaser content={slice} branch={branch} />,
        faq: <ExtraFaqSection branch={branch} content={slice} />,
        cta: <ExtraSubpageCta content={slice} page="services" />,
      };
    }
    const blocksMerged = buildBlocks(mergedFull);
    const instructions = buildSlotRenderInstructions({
      page: pageKey as PageKey,
      contentBase,
      mergedFull,
      legacyOrder: legacySubpageOrder,
      availableSlots: availableSlotsForPageBlockPlan(blocksMerged),
      isSlotVisible: (slot) => isSectionEnabled(mergedFull, pageKey, slot),
    });
    return (
      <>
        <PageHero eyebrow={heroEyebrow} title={title} subtitle={heroSubtitle} style={style} />
        {instructions.map((instr) => {
          const slice = siteContentForSlotInstruction(contentBase, mergedFull, pageKey as PageKey, instr);
          const blocks = buildBlocks(slice);
          return <Fragment key={instr.key}>{blocks[instr.slot] ?? null}</Fragment>;
        })}
      </>
    );
  }

  if (page === 'gallery') {
    function buildBlocks(slice: SiteContent): Record<string, React.ReactNode> {
      return {
        story: <ExtraGalleryStorySection branch={branch} content={slice} />,
        grid: <ExtraGalleryGridSection content={slice} />,
        categories: <ExtraGalleryCategoriesSection branch={branch} content={slice} />,
        testimonials: <ExtraGalleryTestimonials content={slice} branch={branch} />,
        cta: <ExtraSubpageCta content={slice} page="gallery" />,
      };
    }
    const blocksMerged = buildBlocks(mergedFull);
    const instructions = buildSlotRenderInstructions({
      page: pageKey as PageKey,
      contentBase,
      mergedFull,
      legacyOrder: legacySubpageOrder,
      availableSlots: availableSlotsForPageBlockPlan(blocksMerged),
      isSlotVisible: (slot) => isSectionEnabled(mergedFull, pageKey, slot),
    });
    return (
      <>
        <PageHero eyebrow={heroEyebrow} title={title} subtitle={heroSubtitle} style={style} />
        {instructions.map((instr) => {
          const slice = siteContentForSlotInstruction(contentBase, mergedFull, pageKey as PageKey, instr);
          const blocks = buildBlocks(slice);
          return <Fragment key={instr.key}>{blocks[instr.slot] ?? null}</Fragment>;
        })}
      </>
    );
  }

  if (page === 'about') {
    function buildBlocks(slice: SiteContent): Record<string, React.ReactNode> {
      return {
        intro: <ExtraAboutIntroBlock content={slice} branch={branch} />,
        values: <ExtraAboutValuesBlock content={slice} branch={branch} />,
        team: <BranchTeam branch={branch} style={style} content={slice} suppressMedicalWhenNamedDoctors={false} />,
        timeline: <Timeline content={slice} />,
        numbers: <ExtraAboutNumbersBand content={slice} />,
        testimonials: <ExtraAboutTestimonialsBlock content={slice} branch={branch} />,
        faq: <ExtraFaqSection branch={branch} content={slice} />,
        cta: <ExtraSubpageCta content={slice} page="about" />,
      };
    }
    const blocksMerged = buildBlocks(mergedFull);
    const instructions = buildSlotRenderInstructions({
      page: pageKey as PageKey,
      contentBase,
      mergedFull,
      legacyOrder: legacySubpageOrder,
      availableSlots: availableSlotsForPageBlockPlan(blocksMerged),
      isSlotVisible: (slot) => isSectionEnabled(mergedFull, pageKey, slot),
    });
    return (
      <>
        <PageHero eyebrow={heroEyebrow} title={title} subtitle={heroSubtitle} style={style} />
        {instructions.map((instr) => {
          const slice = siteContentForSlotInstruction(contentBase, mergedFull, pageKey as PageKey, instr);
          const blocks = buildBlocks(slice);
          return <Fragment key={instr.key}>{blocks[instr.slot] ?? null}</Fragment>;
        })}
      </>
    );
  }

  /* contact */
  function buildBlocks(slice: SiteContent): Record<string, React.ReactNode> {
    return {
      block: <ContactBlock content={slice} showForm={cfg.contact.showForm} showMap />,
      locations: <LocationsBlock content={slice} />,
      arrival: <ExtraArrivalSection content={slice} />,
      faq: <ExtraFaqSection branch={branch} content={slice} />,
      cta: <ExtraSubpageCta content={slice} page="contact" />,
    };
  }
  const blocksMerged = buildBlocks(mergedFull);
  const instructions = buildSlotRenderInstructions({
    page: pageKey as PageKey,
    contentBase,
    mergedFull,
    legacyOrder: legacySubpageOrder,
    availableSlots: availableSlotsForPageBlockPlan(blocksMerged),
    isSlotVisible: (slot) => isSectionEnabled(mergedFull, pageKey, slot),
  });
  return (
    <>
      <PageHero eyebrow={heroEyebrow} title={title} subtitle={heroSubtitle} style={style} />
      {instructions.map((instr) => {
        const slice = siteContentForSlotInstruction(contentBase, mergedFull, pageKey as PageKey, instr);
        const blocks = buildBlocks(slice);
        return <Fragment key={instr.key}>{blocks[instr.slot] ?? null}</Fragment>;
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  CLASSIC — editorial, centered, parallax about, varied gallery
 * ──────────────────────────────────────────────────────────────────── */
function ClassicLayout({ content: initialContent, eyebrow, branch, page: _page }: { content: SiteContent; eyebrow: string; branch: ExtraBranchKey; page: ExtraPage }) {
  const mergedFull = withModularSiteContent(mergePageBlocksIntoSiteContentForPage(initialContent, 'home'), branch as TemplateKey, 'classic');
  const contentBase = initialContent;
  const legacyHomeOrder = getEffectiveHomeSectionKeys(mergedFull, branch, 'classic');

  function buildBlocks(slice: SiteContent): Record<string, JSX.Element | null> {
    const bt = effectiveBranchText(branch, slice);
    const homeT = meaningfulTestimonials(slice.testimonials);
    return {
      action: <ExtraHomeActionStrip content={slice} />,
      chips: <BranchHeroBadges branch={branch} style="classic" content={slice} />,
      about: slice.about ? (
      <section id="about" className="py-24 md:py-32 surface">
        <div className="container-x grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 reveal">
            <ParallaxImage src={slice.about.imageUrl || slice.gallery[0]} alt={slice.brand.name} className="rounded-3xl aspect-[4/5]" />
          </div>
          <div className="md:col-span-7 reveal">
            <p className="eyebrow mb-5">{bt.aboutTeaserEyebrow || 'Über uns'}</p>
            <h2 className="headline-lg">{slice.about.title}</h2>
            <div className="mt-8 text-lg text-muted leading-relaxed space-y-5 max-w-2xl">
              {slice.about.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>
    ) : null,
    services: slice.services.length > 0 ? (
      <section id="leistungen" className="py-24 md:py-32">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
            <div className="md:col-span-7 reveal">
              <p className="eyebrow mb-5">{bt.servicesTeaserEyebrow || 'Leistungen'}</p>
              <h2 className="headline-lg">{bt.servicesTeaserTitle || <>Was wir<br /><em className="italic-pop">für Sie tun.</em></>}</h2>
            </div>
            <p className="md:col-span-5 text-lg text-muted reveal">
              {bt.teaserSubtitle || 'Eine Auswahl aus unserem Repertoire. Mehr im persönlichen Gespräch.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
            {slice.services.map((s, i) => {
              const dHref = serviceDetailHref(branch, s);
              return (
                <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift group">
                  {s.imageUrl && (
                    <div className="aspect-[4/3] overflow-hidden img-zoom">
                      {dHref ? (
                        <ExtraHeroLink href={dHref} className="block w-full h-full">
                          <img src={s.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </ExtraHeroLink>
                      ) : (
                        <img src={s.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-2xl">
                        {dHref ? (
                          <ExtraHeroLink href={dHref} className="text-inherit no-underline hover:underline">{s.title}</ExtraHeroLink>
                        ) : (
                          s.title
                        )}
                      </h3>
                      {s.price && <span className="font-mono text-xs text-[var(--accent-color-2,_var(--accent-color))] whitespace-nowrap mt-1">{s.price}</span>}
                    </div>
                    {s.description && <p className="mt-3 text-muted leading-relaxed">{s.description}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    ) : null,
    spotlight: <BranchSpotlight branch={branch} style="classic" content={slice} />,
    branchModules: <BranchModulesInline variant={branch} content={slice} />,
    team: <BranchTeam branch={branch} style="classic" content={slice} />,
    gallery: slice.gallery.length > 0 ? (
      <section id="galerie" className="py-24 md:py-32 surface">
        <div className="container-x">
          <div className="mb-12 reveal">
            <p className="eyebrow mb-5">{bt.galleryTeaserEyebrow || 'Eindrücke'}</p>
            <h2 className="headline-lg">{bt.galleryTeaserTitle || <>Bilder aus<br /><em className="italic-pop">unserem Alltag.</em></>}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 reveal-stagger">
            {slice.gallery.map((src, i) => {
              const aspects = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[1/1]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[1/1]'];
              return (
                <figure key={i} className={`overflow-hidden rounded-3xl img-zoom ${aspects[i % aspects.length]}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    ) : null,
    testimonials: homeT.length > 0 ? (
      <section className="py-24 md:py-32">
        <div className="container-x">
          <p className="eyebrow mb-5 reveal">{bt.testimonialsEyebrow || 'Stimmen'}</p>
          <h2 className="headline-lg max-w-3xl reveal mb-12">{bt.testimonialsTitle || <>Was unsere<br /><em className="italic-pop">Kund:innen sagen.</em></>}</h2>
          <div className="mt-14 grid md:grid-cols-3 gap-5 reveal-stagger">
            {homeT.map((t, i) => (
              <figure key={i} className="bg-[var(--surface-color)] border border-line rounded-3xl p-7">
                <blockquote className="text-lg leading-relaxed">„{t.text}"</blockquote>
                <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">— {t.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    ) : null,
    numbers: <ExtraHomeNumbersBand content={slice} />,
    faq: <ExtraFaqSection branch={branch} content={slice} />,
    logos: <ExtraHomeLogosStrip content={slice} branch={branch} />,
    news: <NewsPreview templateVariant={branch} content={slice} eyebrow={bt.newsEyebrow} title={bt.newsTitle} />,
    softCta: <ExtraHomeSoftCta branch={branch} content={slice} layoutStyle="classic" />,
    contact: <ContactSection content={slice} variant="classic" />,
    };
  }

  const blocksMerged = buildBlocks(mergedFull);
  const instructions = buildSlotRenderInstructions({
    page: 'home',
    contentBase,
    mergedFull,
    legacyOrder: legacyHomeOrder,
    availableSlots: availableSlotsForPageBlockPlan(blocksMerged),
    isSlotVisible: (slot) => isSectionEnabled(mergedFull, 'home', slot),
  });

  const cta = resolveHeroCta(mergedFull);

  return (
    <>
      {/* Hero — always first */}
      <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {mergedFull.hero.imageUrl && (
            <img src={mergedFull.hero.imageUrl} alt="" className="w-full h-full object-cover opacity-30" loading="eager" />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, var(--bg-color) 0%, color-mix(in oklab, var(--bg-color), transparent 25%) 40%, var(--bg-color) 100%)' }} />
        </div>
        <div className="container-x">
          <ExtraAnnouncementsRibbon content={mergedFull} />
          {eyebrow && <p className="eyebrow mb-6 reveal">{eyebrow}</p>}
          <h1 className="headline-xl max-w-5xl reveal"><SplitText>{mergedFull.hero.title}</SplitText></h1>
          <p className="mt-8 text-lg md:text-2xl text-muted max-w-3xl reveal">{mergedFull.hero.subtitle}</p>
          {heroBodyParagraphs(mergedFull).length > 0 && (
            <div className="mt-6 max-w-3xl text-base md:text-lg text-muted leading-relaxed space-y-4 reveal">
              {heroBodyParagraphs(mergedFull).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          <div className="mt-12 flex flex-wrap gap-3 reveal">
            <ExtraHeroLink href={cta.primaryHref} className="btn-primary">{cta.primaryLabel} <span aria-hidden>→</span></ExtraHeroLink>
            {cta.secondaryLabel && (
              <ExtraHeroLink href={cta.secondaryHref} className="btn-outline">{cta.secondaryLabel}</ExtraHeroLink>
            )}
          </div>
        </div>
      </section>
      {/* Ordered sections */}
      {instructions.map((instr) => {
        const slice = siteContentForSlotInstruction(contentBase, mergedFull, 'home', instr);
        const blocks = buildBlocks(slice);
        return <React.Fragment key={instr.key}>{blocks[instr.slot]}</React.Fragment>;
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  MODERN — SaaS clean: split hero, sticky-rail about, feature cards,
 *  uniform gallery grid, two-column contact with form-style sidebar
 * ──────────────────────────────────────────────────────────────────── */
function ModernLayout({ content: initialContent, eyebrow, branch, page: _page }: { content: SiteContent; eyebrow: string; branch: ExtraBranchKey; page: ExtraPage }) {
  const mergedFull = withModularSiteContent(mergePageBlocksIntoSiteContentForPage(initialContent, 'home'), branch as TemplateKey, 'modern');
  const contentBase = initialContent;
  const homeTForHero = meaningfulTestimonials(mergedFull.testimonials);
  const numbersOverlay = (mergedFull as any).numbers as Array<{ value: string; label: string }> | undefined;
  const stats = numbersOverlay && numbersOverlay.length >= 3
    ? numbersOverlay.slice(0, 3).map((n) => {
        const m = /^([\d.,]+)(.*)$/.exec(n.value.trim());
        return { value: m ? parseInt(m[1].replace(/\D/g, ''), 10) || 0 : 0, suffix: m ? m[2] : '', label: n.label };
      })
    : [
        { value: homeTForHero.length || 50, suffix: '+', label: 'Kund:innen' },
        { value: mergedFull.services.length || 6, suffix: '', label: 'Leistungen' },
        { value: 24, suffix: 'h', label: 'Antwortzeit' },
      ];
  const heroBadge = ((mergedFull as any).heroBadge ?? {}) as { text?: string; label?: string };
  const badgeText = (heroBadge.text && heroBadge.text.trim()) || '4,9 / 5,0';
  const badgeLabel = (heroBadge.label && heroBadge.label.trim()) || 'Google Bewertung';
  const legacyHomeOrder = getEffectiveHomeSectionKeys(mergedFull, branch, 'modern');

  function buildBlocks(slice: SiteContent): Record<string, JSX.Element | null> {
    const bt = effectiveBranchText(branch, slice);
    const homeT = meaningfulTestimonials(slice.testimonials);
    return {
    action: <ExtraHomeActionStrip content={slice} />,
    chips: <BranchHeroBadges branch={branch} style="modern" content={slice} />,
    about: slice.about ? (
      <section id="about" className="py-24 md:py-32 surface">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 reveal">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{bt.aboutTeaserEyebrow || 'Über uns'}</p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">{slice.about.title}</h2>
              {slice.about.imageUrl && (
                <div className="mt-8 aspect-[4/3] rounded-2xl overflow-hidden border border-line">
                  <img src={slice.about.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6 reveal space-y-6 text-lg leading-relaxed text-muted">
            {slice.about.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>
    ) : null,
    services: slice.services.length > 0 ? (
      <section id="leistungen" className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl reveal mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{bt.servicesTeaserEyebrow || 'Leistungen'}</p>
            <h2 className="font-display text-4xl md:text-5xl">{bt.servicesTeaserTitle || 'Was Sie bekommen.'}</h2>
            <p className="mt-4 text-lg text-muted">{bt.teaserSubtitle || 'Klar definierte Pakete – keine versteckten Kosten.'}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 reveal-stagger">
            {slice.services.map((s, i) => {
              const dHref = serviceDetailHref(branch, s);
              return (
                <article key={i} className="group bg-white border border-line rounded-2xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">/ {String(i + 1).padStart(2, '0')}</span>
                    {s.price && <span className="font-display text-lg">{s.price}</span>}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-3">
                    {dHref ? (
                      <ExtraHeroLink href={dHref} className="text-inherit no-underline hover:underline">{s.title}</ExtraHeroLink>
                    ) : (
                      s.title
                    )}
                  </h3>
                  {s.description && <p className="text-muted leading-relaxed mb-6">{s.description}</p>}
                  <div className="pt-4 border-t border-line flex items-center justify-between text-sm">
                    <span className="text-muted">{(bt as any).serviceCardNote || ''}</span>
                    {(() => {
                      const lm = extraServiceLearnMore(s, bt, branch);
                      return (
                        <ExtraHeroLink href={lm.href} className="text-[var(--accent-color)] font-medium opacity-0 group-hover:opacity-100 transition no-underline hover:underline">
                          {lm.label}
                        </ExtraHeroLink>
                      );
                    })()}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    ) : null,
    spotlight: <BranchSpotlight branch={branch} style="modern" content={slice} />,
    branchModules: <BranchModulesInline variant={branch} content={slice} />,
    team: <BranchTeam branch={branch} style="modern" content={slice} />,
    gallery: slice.gallery.length > 0 ? (
      <section id="galerie" className="py-24 md:py-32 surface">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 mb-12 reveal">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{bt.galleryTeaserEyebrow || 'Galerie'}</p>
              <h2 className="font-display text-4xl md:text-5xl">{bt.galleryTeaserTitle || 'Eindrücke.'}</h2>
            </div>
            <p className="text-sm text-muted hidden md:block max-w-xs">Aktuelle Aufnahmen aus unserem Alltag.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 reveal-stagger">
            {slice.gallery.map((src, i) => (
              <figure key={i} className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-white bg-gradient-to-t from-black/70 to-transparent">
                  / {String(i + 1).padStart(2, '0')}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    ) : null,
    testimonials: homeT.length > 0 ? (
      <section className="py-24 md:py-32">
        <div className="container-x max-w-4xl mx-auto text-center reveal">
          <p className="text-xs font-mono uppercase tracking-widest text-muted mb-6">{bt.testimonialsEyebrow || 'Stimmen'}</p>
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
            „{homeT[0].text}"
          </blockquote>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">— {homeT[0].author}</p>
          {homeT.length > 1 && (
            <div className="mt-16 grid md:grid-cols-2 gap-4 text-left">
              {homeT.slice(1).map((t, i) => (
                <figure key={i} className="bg-[var(--surface-color)] border border-line rounded-2xl p-6">
                  <p className="text-base leading-relaxed">„{t.text}"</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted">— {t.author}</p>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    ) : null,
    numbers: <ExtraHomeNumbersBand content={slice} />,
    faq: <ExtraFaqSection branch={branch} content={slice} />,
    logos: <ExtraHomeLogosStrip content={slice} branch={branch} />,
    news: <NewsPreview templateVariant={branch} content={slice} eyebrow={bt.newsEyebrow} title={bt.newsTitle} />,
    softCta: <ExtraHomeSoftCta branch={branch} content={slice} layoutStyle="modern" />,
    contact: <ContactSection content={slice} variant="modern" />,
    };
  }

  const blocksMerged = buildBlocks(mergedFull);
  const instructions = buildSlotRenderInstructions({
    page: 'home',
    contentBase,
    mergedFull,
    legacyOrder: legacyHomeOrder,
    availableSlots: availableSlotsForPageBlockPlan(blocksMerged),
    isSlotVisible: (slot) => isSectionEnabled(mergedFull, 'home', slot),
  });

  const cta = resolveHeroCta(mergedFull);

  return (
    <>
      {/* Hero — split: text left / image card right with floating badge */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 reveal">
            <ExtraAnnouncementsRibbon content={mergedFull} />
            {eyebrow && (
              <p className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-[var(--surface-color)] border border-line text-xs font-mono uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" /> {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              {mergedFull.hero.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-xl">{mergedFull.hero.subtitle}</p>
            {heroBodyParagraphs(mergedFull).length > 0 && (
              <div className="mt-5 max-w-xl text-base text-muted leading-relaxed space-y-3">
                {heroBodyParagraphs(mergedFull).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              <ExtraHeroLink href={cta.primaryHref} className="btn-primary">{cta.primaryLabel}</ExtraHeroLink>
              {cta.secondaryLabel && (
                <ExtraHeroLink href={cta.secondaryHref} className="btn-ghost">{cta.secondaryLabel} →</ExtraHeroLink>
              )}
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((s, i) => (
                <div key={i} className="border-l border-line pl-4">
                  <dt className="font-display text-3xl">
                    <AnimatedCounter to={s.value} />{s.suffix}
                  </dt>
                  <dd className="text-xs uppercase tracking-widest text-muted mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-line shadow-2xl">
                {mergedFull.hero.imageUrl && <img src={mergedFull.hero.imageUrl} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-line p-5 max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center">
                    <span className="text-xl">★</span>
                  </div>
                  <div>
                    <p className="font-display text-lg leading-tight">{badgeText}</p>
                    <p className="text-xs text-muted">{badgeLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Ordered sections */}
      {instructions.map((instr) => {
        const slice = siteContentForSlotInstruction(contentBase, mergedFull, 'home', instr);
        const blocks = buildBlocks(slice);
        return <React.Fragment key={instr.key}>{blocks[instr.slot]}</React.Fragment>;
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  BOLD — magazine: oversized type, full-bleed image, masonry, dramatic
 * ──────────────────────────────────────────────────────────────────── */
function BoldLayout({ content: initialContent, eyebrow, branch, page: _page }: { content: SiteContent; eyebrow: string; branch: ExtraBranchKey; page: ExtraPage }) {
  const mergedFull = withModularSiteContent(mergePageBlocksIntoSiteContentForPage(initialContent, 'home'), branch as TemplateKey, 'bold');
  const contentBase = initialContent;
  const legacyHomeOrder = getEffectiveHomeSectionKeys(mergedFull, branch, 'bold');
  const btHero = effectiveBranchText(branch, mergedFull);
  const heroEyebrow = btHero.heroEyebrow || eyebrow;

  function buildBlocks(slice: SiteContent): Record<string, JSX.Element | null> {
    const bt = effectiveBranchText(branch, slice);
    const homeT = meaningfulTestimonials(slice.testimonials);
    return {
    action: <ExtraHomeActionStrip content={slice} />,
    chips: <BranchHeroBadges branch={branch} style="bold" content={slice} />,
    marquee: (() => {
      const words = (Array.isArray(bt.marqueeWords) && bt.marqueeWords.length > 0)
        ? (bt.marqueeWords as string[])
        : [slice.brand.name];
      return (
        <div className="border-y border-line py-8 overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap animate-[marquee_25s_linear_infinite] font-display text-4xl md:text-6xl">
            {Array.from({ length: 3 }).flatMap((_, lap) =>
              words.flatMap((w, i) => [
                <span key={`w-${lap}-${i}`}>{w}</span>,
                <span key={`s-${lap}-${i}`} className="text-[var(--accent-color)]">✦</span>,
              ]),
            )}
          </div>
        </div>
      );
    })(),
    about: slice.about ? (
      <section id="about" className="py-24 md:py-40">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-2 reveal">
            <p className="font-display text-6xl sm:text-7xl md:text-9xl leading-none text-[var(--accent-color)]">01</p>
          </div>
          <div className="md:col-span-10 reveal">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] mb-10">{slice.about.title}</h2>
            <div className="grid md:grid-cols-2 gap-8 text-xl md:text-2xl leading-relaxed">
              {slice.about.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {slice.about.imageUrl && (
              <img src={slice.about.imageUrl} alt="" className="mt-16 w-full aspect-[16/7] object-cover" loading="lazy" />
            )}
          </div>
        </div>
      </section>
    ) : null,
    services: slice.services.length > 0 ? (
      <section id="leistungen" className="py-24 md:py-40 surface">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-16 reveal">
            <p className="md:col-span-2 font-display text-6xl sm:text-7xl md:text-9xl leading-none text-[var(--accent-color)]">02</p>
            <div className="md:col-span-10">
              {bt.servicesTeaserEyebrow && (
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-3">{bt.servicesTeaserEyebrow}</p>
              )}
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">{bt.servicesTeaserTitle || 'Leistungen.'}</h2>
            </div>
          </div>
          <ul className="reveal-stagger">
            {slice.services.map((s, i) => {
              const dHref = serviceDetailHref(branch, s);
              return (
                <li key={i} className="group border-t border-line last:border-b py-8 md:py-12 hover:bg-white/30 transition-colors">
                  <div className="container-x grid md:grid-cols-12 gap-6 items-baseline">
                    <span className="md:col-span-1 font-mono text-sm text-muted">/ {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="md:col-span-6 font-display text-3xl md:text-5xl leading-tight transition-transform group-hover:translate-x-2">
                      {dHref ? (
                        <ExtraHeroLink href={dHref} className="text-inherit no-underline hover:underline">{s.title}</ExtraHeroLink>
                      ) : (
                        s.title
                      )}
                    </h3>
                    <p className="md:col-span-4 text-muted leading-relaxed">{s.description}</p>
                    {s.price && <span className="md:col-span-1 md:text-right font-display text-2xl">{s.price}</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ) : null,
    spotlight: <BranchSpotlight branch={branch} style="bold" content={slice} />,
    branchModules: <BranchModulesInline variant={branch} content={slice} />,
    team: <BranchTeam branch={branch} style="bold" content={slice} />,
    gallery: slice.gallery.length > 0 ? (
      <section id="galerie" className="py-24 md:py-40">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-16 reveal">
            <p className="md:col-span-2 font-display text-6xl sm:text-7xl md:text-9xl leading-none text-[var(--accent-color)]">03</p>
            <div className="md:col-span-10">
              {bt.galleryTeaserEyebrow && (
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-3">{bt.galleryTeaserEyebrow}</p>
              )}
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">{bt.galleryTeaserTitle || 'Bilder.'}</h2>
            </div>
          </div>
          <ExtraMasonry images={slice.gallery} />
        </div>
      </section>
    ) : null,
    testimonials: homeT.length > 0 ? (
      <section className="py-24 md:py-40 bg-brand text-white grain">
        <div className="container-x">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-10 reveal">— {bt.testimonialsEyebrow || 'Stimmen'} —</p>
          <div className="grid md:grid-cols-2 gap-12 reveal-stagger">
            {homeT.map((t, i) => (
              <figure key={i} className="space-y-6">
                <span className="font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)] block">"</span>
                <blockquote className="font-display text-3xl md:text-4xl leading-tight">{t.text}</blockquote>
                <figcaption className="font-mono text-xs uppercase tracking-widest text-white/60">— {t.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    ) : null,
    numbers: <ExtraHomeNumbersBand content={slice} />,
    faq: <ExtraFaqSection branch={branch} content={slice} />,
    logos: <ExtraHomeLogosStrip content={slice} branch={branch} />,
    news: <NewsPreview templateVariant={branch} content={slice} eyebrow={bt.newsEyebrow || 'Aktuelles'} title={bt.newsTitle || 'Notizen.'} />,
    softCta: <ExtraHomeSoftCta branch={branch} content={slice} layoutStyle="bold" />,
    contact: <ContactSection content={slice} variant="bold" />,
    };
  }

  const blocksMerged = buildBlocks(mergedFull);
  const instructions = buildSlotRenderInstructions({
    page: 'home',
    contentBase,
    mergedFull,
    legacyOrder: legacyHomeOrder,
    availableSlots: availableSlotsForPageBlockPlan(blocksMerged),
    isSlotVisible: (slot) => isSectionEnabled(mergedFull, 'home', slot),
  });

  const cta = resolveHeroCta(mergedFull);

  return (
    <>
      {/* Hero — oversized headline overlapping image */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="container-x">
          <ExtraAnnouncementsRibbon content={mergedFull} />
          {heroEyebrow && <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8 reveal">— {heroEyebrow} —</p>}
          <h1 className="font-display text-[clamp(2.5rem,11vw,11rem)] leading-[0.88] md:leading-[0.85] tracking-tight reveal break-words [overflow-wrap:anywhere] [hyphens:auto]">
            <SplitText>{mergedFull.hero.title}</SplitText>
          </h1>
        </div>
        {mergedFull.hero.imageUrl && (
          <div className="mt-10 md:mt-16 reveal">
            <img src={mergedFull.hero.imageUrl} alt="" className="w-full aspect-[21/9] object-cover" loading="eager" />
          </div>
        )}
        <div className="container-x mt-12 grid md:grid-cols-12 gap-8 reveal">
          <div className="md:col-span-7 space-y-5">
            <p className="text-2xl md:text-3xl leading-tight">{mergedFull.hero.subtitle}</p>
            {heroBodyParagraphs(mergedFull).length > 0 && (
              <div className="text-lg text-muted leading-relaxed space-y-3 max-w-3xl">
                {heroBodyParagraphs(mergedFull).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </div>
          <div className="md:col-span-5 md:text-right flex flex-wrap gap-3 md:justify-end">
            <ExtraHeroLink href={cta.primaryHref} className="btn-primary text-base">{cta.primaryLabel} <span aria-hidden>→</span></ExtraHeroLink>
            {cta.secondaryLabel && (
              <ExtraHeroLink href={cta.secondaryHref} className="btn-outline text-base">{cta.secondaryLabel}</ExtraHeroLink>
            )}
          </div>
        </div>
      </section>
      {/* Ordered sections */}
      {instructions.map((instr) => {
        const slice = siteContentForSlotInstruction(contentBase, mergedFull, 'home', instr);
        const blocks = buildBlocks(slice);
        return <React.Fragment key={instr.key}>{blocks[instr.slot]}</React.Fragment>;
      })}
    </>
  );
}

/* ─── Shared contact section (3 layout variants) ──────────────────── */
function contactAddressOneLine(c: SiteContent['contact']): string {
  const parts = [c.address?.trim(), c.city?.trim()].filter(Boolean) as string[];
  return parts.join(', ');
}

/** Classic contact H2 historically always ended with a full stop unless already punctuated. */
function extraClassicContactHeadline(cbTitle: string | undefined, ctaLabel: string | undefined): string {
  const raw = (cbTitle && cbTitle.trim()) || (ctaLabel && ctaLabel.trim()) || 'Termin vereinbaren';
  return /[.!?…]$/.test(raw) ? raw : `${raw}.`;
}

function ContactSection({ content, variant }: { content: SiteContent; variant: ExtraStyle }) {
  const cb = content.contactBlock ?? { eyebrow: '', title: '', subtitle: '' };
  const mapSrc = resolveMapIframeSrc(content.contact.mapsUrl, content.contact.address, content.contact.city);

  if (variant === 'bold') {
    const boldIndex = cb.eyebrow?.trim() || '04';
    const boldTitleRaw = cb.title?.trim() || 'Reden wir';
    const boldTitleLine = /[.!?…]$/.test(boldTitleRaw) ? boldTitleRaw : `${boldTitleRaw}.`;
    const boldEmRaw = cb.subtitle?.trim() || 'Gleich jetzt';
    const boldEm = /[.!?…]$/.test(boldEmRaw) ? boldEmRaw : `${boldEmRaw}.`;
    return (
      <section id="kontakt" className="py-24 md:py-40">
        <div className="container-x grid md:grid-cols-12 gap-8 mb-12 reveal">
          <p className="md:col-span-2 font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)]">{boldIndex}</p>
          <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">
            {boldTitleLine}<br />
            <em className="italic-pop">{boldEm}</em>
          </h2>
        </div>
        <div className="container-x grid md:grid-cols-2 gap-8">
          <div className="reveal space-y-6 text-2xl md:text-3xl leading-tight">
            {content.contact.phone && <p><span className="text-muted text-base font-mono uppercase tracking-widest block mb-2">Telefon</span>{content.contact.phone}</p>}
            {content.contact.email && <p><span className="text-muted text-base font-mono uppercase tracking-widest block mb-2">E-Mail</span>{content.contact.email}</p>}
            {(content.contact.address || content.contact.city) && (
              <p>
                <span className="text-muted text-base font-mono uppercase tracking-widest block mb-2">Adresse</span>
                {contactAddressOneLine(content.contact)}
              </p>
            )}
          </div>
          <div className="reveal">
            {mapSrc ? (
              <iframe src={mapSrc} title="Karte" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full aspect-square border-0" allow="fullscreen" />
            ) : (
              <div className="aspect-square rounded-2xl border border-dashed border-line bg-white/50 grid place-items-center text-sm text-muted p-6 text-center">
                Adresse oder Ort eintragen — dann erscheint hier die Karte.
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'modern') {
    return (
      <section id="kontakt" className="py-24 md:py-32 surface">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{cb.eyebrow?.trim() || 'Kontakt'}</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8">{cb.title?.trim() || 'Sprechen wir.'}</h2>
            {cb.subtitle?.trim() ? <p className="text-muted text-base -mt-4 mb-8 max-w-prose">{cb.subtitle.trim()}</p> : null}
            <div className="space-y-6 text-base">
              {content.contact.phone && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-line">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center">☎</div>
                  <div><p className="font-mono text-[11px] uppercase tracking-widest text-muted">Telefon</p><p className="font-display text-lg">{content.contact.phone}</p></div>
                </div>
              )}
              {content.contact.email && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-line">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center">✉</div>
                  <div><p className="font-mono text-[11px] uppercase tracking-widest text-muted">E-Mail</p><p className="font-display text-lg">{content.contact.email}</p></div>
                </div>
              )}
              {(content.contact.address || content.contact.city) && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-line">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center">⌖</div>
                  <div><p className="font-mono text-[11px] uppercase tracking-widest text-muted">Adresse</p><p className="font-display text-lg">{contactAddressOneLine(content.contact)}</p></div>
                </div>
              )}
            </div>
            {content.contact.hours.length > 0 && (
              <div className="mt-8 p-5 rounded-2xl bg-white border border-line">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">Öffnungszeiten</p>
                <ul className="space-y-1.5 text-sm">
                  {content.contact.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6">
                      <span className="text-muted">{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="lg:col-span-7 reveal">
            <div className="rounded-2xl overflow-hidden border border-line shadow-xl">
              {mapSrc ? (
                <iframe src={mapSrc} title="Karte" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full aspect-[16/14] border-0" allow="fullscreen" />
              ) : (
                <div className="aspect-[16/14] grid place-items-center text-sm text-muted p-6 text-center bg-white">
                  Adresse oder Ort eintragen — dann erscheint hier die Karte.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // classic
  return (
    <section id="kontakt" className="py-24 md:py-32 surface">
      <div className="container-x grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5 reveal">
          <p className="eyebrow mb-5">{cb.eyebrow?.trim() || 'Kontakt'}</p>
          <h2 className="headline-lg">{extraClassicContactHeadline(cb.title, content.hero.ctaLabel)}</h2>
          {cb.subtitle?.trim() ? <p className="mt-4 text-muted text-base max-w-prose">{cb.subtitle.trim()}</p> : null}
          <ul className="mt-10 space-y-3 text-base">
            {content.contact.phone && <li className="font-mono">{content.contact.phone}</li>}
            {content.contact.email && <li className="font-mono">{content.contact.email}</li>}
            {(content.contact.address || content.contact.city) && (
              <li className="text-muted">{contactAddressOneLine(content.contact)}</li>
            )}
          </ul>
          {content.contact.hours.length > 0 && (
            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Öffnungszeiten</p>
              <ul className="space-y-1 text-sm">
                {content.contact.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6">
                    <span className="text-muted">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="md:col-span-7 reveal">
          <div className="rounded-3xl overflow-hidden border border-line">
            {mapSrc ? (
              <iframe src={mapSrc} title="Karte" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full aspect-[16/12] border-0" allow="fullscreen" />
            ) : (
              <div className="aspect-[16/12] grid place-items-center text-sm text-muted p-6 text-center bg-white">
                Adresse oder Ort eintragen — dann erscheint hier die Karte.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Locations block (mirrors TemplateApp contact locations) ──── */
function LocationsBlock({ content }: { content: SiteContent }) {
  const locs = content.locations ?? [];
  if (!locs.length) return null;
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <p className="eyebrow mb-5 reveal">{moduleHeading(content, 'locations').eyebrow}</p>
        <h2 className="headline-lg reveal mb-12">{moduleHeading(content, 'locations').title}</h2>
        <div className="grid md:grid-cols-2 gap-8 reveal-stagger">
          {locs.map((loc, i) => (
            <article key={i} className="border border-line rounded-3xl p-7 hover-lift bg-white">
              <h3 className="font-display text-2xl">{loc.name || `Standort ${i + 1}`}</h3>
              <div className="mt-5 space-y-4 text-lg">
                {loc.phone && (
                  <a href={`tel:${loc.phone}`} className="block group">
                    <p className="text-xs uppercase tracking-widest text-muted">Telefon</p>
                    <p className="mt-1 text-xl font-display group-hover:translate-x-1 transition-transform">{loc.phone}</p>
                  </a>
                )}
                {loc.email && (
                  <a href={`mailto:${loc.email}`} className="block group">
                    <p className="text-xs uppercase tracking-widest text-muted">E-Mail</p>
                    <p className="mt-1 text-xl font-display group-hover:translate-x-1 transition-transform">{loc.email}</p>
                  </a>
                )}
                {loc.address && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">Adresse</p>
                    <p className="mt-1">{loc.address}{loc.city ? `, ${loc.city}` : ''}</p>
                  </div>
                )}
                {loc.hours && loc.hours.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">Öffnungszeiten</p>
                    <ul className="mt-2 grid grid-cols-[auto,1fr] gap-x-6 gap-y-1">
                      {loc.hours.map((h, hi) => (
                        <li key={hi} className="contents">
                          <span className="font-medium">{h.day}</span>
                          <span className="text-muted font-mono text-sm whitespace-nowrap">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {(loc.mapsUrl || loc.address) && (
                <div className="mt-6">
                  <SafeMapEmbed mapsUrl={loc.mapsUrl || ''} address={loc.address || ''} city={loc.city || ''} className="h-[200px]" />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Header (style-aware) ──────────────────────────────────────── */
function ExtraHeader({ content, style }: { content: SiteContent; style: ExtraStyle; branch: ExtraBranchKey }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const basePath = useBasePath();
  const { pathname } = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMobile(false); }, [pathname]);
  const isBold = style === 'bold';
  const DEFAULT_NAV: { to: string; label: string }[] = [
    { to: '/', label: 'Start' },
    { to: '/leistungen', label: 'Leistungen' },
    { to: '/galerie', label: 'Galerie' },
    { to: '/ueber-uns', label: 'Über uns' },
    { to: '/kontakt', label: 'Kontakt' },
  ];
  // Honor `navItems` from the admin (NavigationPage). Falls back to defaults.
  const customNav = ((content as any).navItems as Array<{ label?: string; path?: string; visible?: boolean }> | undefined);
  const NAV: { to: string; label: string }[] = Array.isArray(customNav) && customNav.length
    ? customNav
        .filter((n) => n && n.visible !== false && (n.label?.trim()) && (n.path?.trim()))
        .map((n) => ({ to: n.path!.trim(), label: n.label!.trim() }))
    : DEFAULT_NAV;
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all ${
          scrolled
            ? 'bg-[var(--bg-color)]/90 backdrop-blur shadow-sm'
            : isBold ? 'bg-[var(--bg-color)]' : 'bg-transparent'
        }`}
      >
        <div className={`container-x flex items-center justify-between ${isBold ? 'py-6 border-b border-line' : 'py-5'}`}>
          <NavLink to={withBase(basePath, '/')} className="flex items-center gap-3">
            {content.brand.logoUrl ? (
              <img src={content.brand.logoUrl} alt={content.brand.name} className={`${isBold ? 'h-10 md:h-12' : 'h-9'} w-auto max-w-[180px] object-contain`} />
            ) : null}
            {!(content.brand.logoUrl && content.brand.hideName) && (
              <span className={`font-display ${isBold ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{content.brand.name}</span>
            )}
          </NavLink>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={withBase(basePath, n.to)}
                end={n.to === '/'}
                className={({ isActive }) => `transition-colors ${isActive ? 'text-[var(--accent-color)]' : 'hover:text-[var(--accent-color)]'}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <NavLink to={withBase(basePath, ((content as any)?.navCta?.href || '').trim() || '/kontakt')} className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-sm">
            {((content as any)?.navCta?.label || '').trim() || content.hero.ctaLabel || 'Termin'} <span aria-hidden>→</span>
          </NavLink>
          <button
            onClick={() => setMobile(true)}
            className="md:hidden p-2 rounded-full border border-line"
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
            <span className="font-display text-2xl">{content.brand.name}</span>
            <button onClick={() => setMobile(false)} className="p-2" aria-label="Schließen">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="container-x flex flex-col gap-1 mt-8">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={withBase(basePath, n.to)}
                end={n.to === '/'}
                onClick={() => setMobile(false)}
                className="py-5 text-5xl font-display border-b border-line hover:translate-x-2 transition-transform"
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function ExtraFooter({ content, style }: { content: SiteContent; style: ExtraStyle }) {
  if (style === 'bold') {
    return (
      <footer className="bg-brand text-white py-20 md:py-32 grain">
        <div className="container-x">
          <p className="font-display text-6xl md:text-8xl leading-[0.9]">{content.brand.name}.</p>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-sm">
            <p className="text-white/70">{content.brand.tagline}</p>
            <p className="font-mono text-white/70">{content.contact.email}</p>
            <p className="font-mono md:text-right text-white/70">{content.contact.phone}</p>
          </div>
          <p className="mt-16 pt-8 border-t border-white/20 text-xs text-white/40">
            © {new Date().getFullYear()} {content.brand.name}
          </p>
        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-brand text-white py-16 grain">
      <div className="container-x">
        <p className="font-display text-3xl">{content.brand.name}</p>
        <p className="text-sm text-white/60 mt-2">{content.brand.tagline}</p>
        <p className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50">
          © {new Date().getFullYear()} {content.brand.name}
        </p>
      </div>
    </footer>
  );
}

function ExtraMasonry({ images }: { images: string[] }) {
  return <MasonryLightbox images={images} />;
}

/* ─── Branch-specific spotlight section ──────────────────────────────
 *  Renders a different feature block per branch (consulting / medical /
 *  fitness) so the three branches read as distinct products even when
 *  the surrounding layout style is identical.
 * ──────────────────────────────────────────────────────────────────── */
function BranchSpotlight({
  branch,
  style,
  content,
}: {
  branch: ExtraBranchKey;
  style: ExtraStyle;
  content: SiteContent;
}) {
  if (branch === 'consulting') return <ConsultingProcess style={style} content={content} />;
  if (branch === 'medical') return <MedicalServiceInfo style={style} content={content} />;
  return <FitnessPrograms style={style} content={content} />;
}

/* ─── Branch team / trainers ─────────────────────────────────────────
 *  Renders a people grid for consulting (label "Team") and fitness
 *  (label "Trainer:innen"). Reads the `team` overlay if present —
 *  same shape as the admin TeamEditor produces. Hidden for medical
 *  (which uses MedicalServiceInfo as its dedicated block instead).
 * ──────────────────────────────────────────────────────────────────── */
type TeamMember = { n: string; r: string; img: string; bio: string };
const BRANCH_TEAM_DEFAULT: Record<ExtraBranchKey, TeamMember[]> = {
  consulting: [
    { n: 'Dr. Klaus Hofer',  r: 'Senior Partner · Strategie',  img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', bio: 'Über 25 Jahre Beratung im Mittelstand. Schwerpunkt Industrie und Familienunternehmen.' },
    { n: 'Lena Weiss',       r: 'Partnerin · Steuer & Recht',  img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', bio: 'Steuerberaterin und Anwältin. Zuvor zehn Jahre in einer Big-Four-Kanzlei.' },
    { n: 'Marcus Berg',      r: 'Senior Manager · M&A',        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', bio: 'Begleitet Übernahmen und Nachfolgen. Drei Jahre London, fünf Jahre Wien.' },
  ],
  fitness: [
    { n: 'Sarah Berg',  r: 'Studio-Leitung · Vinyasa',   img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', bio: '12 Jahre Yogalehrerin in Berlin und Lissabon. RYT 500 + somatische Ausbildung.' },
    { n: 'Mira Klein',  r: 'Yin & Mindful Movement',     img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', bio: 'Schwerpunkt Faszien-Arbeit und Atem. Begleitet auch unsere Retreats im Allgäu.' },
    { n: 'Jonas Renz',  r: 'Reformer Pilates',           img: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?auto=format&fit=crop&w=600&q=80', bio: 'Physiotherapeut mit Pilates-Spezialisierung. Trainiert Sportler:innen und Reha-Klient:innen.' },
  ],
  medical: [
    { n: 'Dr. Anna Lindner', r: 'Praxisinhaberin · Allgemeinmedizin', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80', bio: 'Studium in Innsbruck und Zürich. Ganzheitlicher Ansatz mit Zeit für Gespräche.' },
    { n: 'Dr. Felix Bauer',  r: 'Internist · Diagnostik',          img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80', bio: 'Zehn Jahre Universitätsklinik. Schwerpunkt internistische Vorsorge.' },
    { n: 'Maria Holzer',     r: 'Praxisleitung · MTA',            img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80', bio: 'Koordiniert Termine und Abläufe. Erste Ansprechpartnerin am Empfang.' },
  ],
};
function useBranchTeam(content: SiteContent, branch: ExtraBranchKey): TeamMember[] {
  const overlay = normaliseTeamList((content as unknown as { team?: unknown }).team ?? []);
  const filtered = overlay.filter((m) => m && (m.n || m.r));
  return filtered.length ? filtered : BRANCH_TEAM_DEFAULT[branch];
}
function BranchTeam({
  branch,
  style,
  content,
  suppressMedicalWhenNamedDoctors = true,
}: {
  branch: ExtraBranchKey;
  style: ExtraStyle;
  content: SiteContent;
  /** Home hides generic team when `doctors` renders in modules — keep false on /ueber-uns so the Team editor still surfaces. */
  suppressMedicalWhenNamedDoctors?: boolean;
}) {
  const team = useBranchTeam(content, branch);
  if (branch === 'medical' && suppressMedicalWhenNamedDoctors) {
    const docs = ((content as unknown as { doctors?: { name?: string }[] }).doctors) ?? [];
    const hasNamedDoctor = docs.some((d) => d && String(d.name ?? '').trim().length > 0);
    if (hasNamedDoctor) return null;
  }
  if (team.length === 0) return null;
  const teamKey: ModuleHeadingKey = branch === 'fitness' ? 'teamFitness' : branch === 'medical' ? 'teamMedical' : 'teamConsulting';
  const h = moduleHeading(content, teamKey);
  if (style === 'bold') {
    return (
      <section className="py-24 md:py-40 bg-[var(--text-color)] text-[var(--bg-color)]">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-14 reveal">
            <p className="md:col-span-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-color)]">{h.eyebrow}</p>
            <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">{h.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-current/10 reveal-stagger">
            {team.map((m, i) => (
              <article key={i} className="bg-[var(--text-color)] p-8 md:p-10">
                {m.img && (
                  <div className="aspect-[4/5] overflow-hidden mb-6 rounded-2xl">
                    <img src={m.img} alt={m.n} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <h3 className="font-display text-3xl">{m.n}</h3>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent-color)] mt-2">{m.r}</p>
                {m.bio && <p className="mt-5 opacity-80 leading-relaxed">{m.bio}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32 surface">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 mb-12 reveal">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{h.eyebrow}</p>
              <h2 className="font-display text-4xl md:text-5xl">{h.title}</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {team.map((m, i) => (
              <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
                {m.img && (
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={m.img} alt={m.n} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-2xl">{m.n}</h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-muted mt-1">{m.r}</p>
                  {m.bio && <p className="mt-4 text-sm text-muted leading-relaxed">{m.bio}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  // classic
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow mb-5">{h.eyebrow}</p>
            <h2 className="headline-lg">{h.title}</h2>
          </div>
          <p className="md:col-span-5 text-lg text-muted reveal">
            {h.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
          {team.map((m, i) => (
            <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
              {m.img && (
                <div className="aspect-[4/5] overflow-hidden img-zoom">
                  <img src={m.img} alt={m.n} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-7">
                <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-3xl mt-2">{m.n}</h3>
                <p className="text-sm text-muted mt-1">{m.r}</p>
                {m.bio && <p className="mt-5 text-sm leading-relaxed">{m.bio}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Branch identity chips — strong visual differentiator just under the hero. */
const BRANCH_CHIPS_DEFAULT: Record<ExtraBranchKey, string[]> = {
  consulting: ['Strategie', 'Workshops', 'Analyse', 'Umsetzung'],
  medical: ['Vorsorge', 'Diagnostik', 'Therapie', 'Begleitung'],
  fitness: ['Yoga', 'Pilates', 'Kleingruppen', 'Personal Training'],
};
const BRANCH_LABEL: Record<ExtraBranchKey, string> = {
  consulting: 'Beratung',
  medical: 'Praxis',
  fitness: 'Studio',
};
function useBranchChips(content: SiteContent, branch: ExtraBranchKey): string[] {
  const overlay = (content as any).branchChips as string[] | undefined;
  const trimmed = (overlay ?? []).map((s) => String(s).trim()).filter(Boolean);
  return trimmed.length > 0 ? trimmed : BRANCH_CHIPS_DEFAULT[branch];
}
function BranchHeroBadges({ branch, style, content }: { branch: ExtraBranchKey; style: ExtraStyle; content: SiteContent }) {
  const chips = useBranchChips(content, branch);
  if (chips.length === 0) return null;
  const label = BRANCH_LABEL[branch];
  if (style === 'bold') {
    return (
      <div className="container-x mt-10 reveal">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-mono uppercase tracking-[0.25em]">
          <span className="text-[var(--accent-color)]">— {label} —</span>
          {chips.map((c, i) => (
            <span key={i} className="text-muted">{c}</span>
          ))}
        </div>
      </div>
    );
  }
  if (style === 'modern') {
    return (
      <div className="container-x mt-8 reveal">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-full bg-[var(--accent-color)] text-[var(--accent-fg)] text-xs font-medium uppercase tracking-widest">{label}</span>
          {chips.map((c, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full bg-white border border-line text-xs">{c}</span>
          ))}
        </div>
      </div>
    );
  }
  // classic
  return (
    <div className="container-x mt-10 reveal">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent-color)]">{label}</span>
        {chips.map((c, i) => (
          <span key={i} className="px-3 py-1 rounded-full border border-line bg-[var(--surface-color)] text-muted">{c}</span>
        ))}
      </div>
    </div>
  );
}

/* CONSULTING — 4-step process / methodology */
const CONSULTING_STEPS_DEFAULT: Array<{ k: string; t: string; d: string }> = [
  { k: '01', t: 'Erstgespräch', d: 'Unverbindliches Sondieren — wir hören zu, klären den Bedarf und Rahmenbedingungen.' },
  { k: '02', t: 'Analyse',      d: 'Strukturierte Bestandsaufnahme inkl. Risiken, Chancen und nächsten Hebeln.' },
  { k: '03', t: 'Strategie',    d: 'Klare Empfehlung, Roadmap und priorisierte Maßnahmen — auf Wunsch mit Pitch-Deck.' },
  { k: '04', t: 'Umsetzung',    d: 'Begleitung in der Implementierung, Reviews und Sparring auf Augenhöhe.' },
];
function useConsultingSteps(content: SiteContent) {
  const overlay = normaliseTdList((content as unknown as { serviceProcess?: unknown }).serviceProcess ?? []);
  const filtered = overlay.filter((s) => String(s.t ?? '').trim() || String(s.d ?? '').trim());
  if (filtered.length === 0) return CONSULTING_STEPS_DEFAULT;
  return filtered.map((s, i) => ({ k: String(i + 1).padStart(2, '0'), t: s.t, d: s.d }));
}
function ConsultingProcess({ style, content }: { style: ExtraStyle; content: SiteContent }) {
  const h = moduleHeading(content, 'consultingSpotlight');
  const STEPS = useConsultingSteps(content);
  if (style === 'bold') {
    return (
      <section className="py-24 md:py-40 surface">
        <div className="container-x grid md:grid-cols-12 gap-8 mb-14 reveal">
          <p className="md:col-span-2 font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)]">★</p>
          <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">{h.title}</h2>
        </div>
        <ul className="reveal-stagger">
          {STEPS.map((s) => (
            <li key={s.k} className="group border-t border-line last:border-b py-8 md:py-10">
              <div className="container-x grid md:grid-cols-12 gap-6 items-baseline">
                <span className="md:col-span-1 font-display text-3xl text-[var(--accent-color)]">{s.k}</span>
                <h3 className="md:col-span-4 font-display text-3xl md:text-4xl">{s.t}</h3>
                <p className="md:col-span-7 text-lg text-muted leading-relaxed">{s.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl reveal mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{h.eyebrow}</p>
            <h2 className="font-display text-4xl md:text-5xl">{h.title}</h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
            {STEPS.map((s) => (
              <li key={s.k} className="relative bg-white border border-line rounded-2xl p-6">
                <span className="absolute -top-4 -left-2 font-display text-5xl text-[var(--accent-color)]/40">{s.k}</span>
                <h3 className="font-display text-xl mb-2 mt-4">{s.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-12 reveal">
          <div className="md:col-span-5">
            <p className="eyebrow mb-5">{h.eyebrow}</p>
            <h2 className="headline-lg">{h.title}</h2>
          </div>
          <p className="md:col-span-7 text-lg text-muted self-end">
            {h.subtitle}
          </p>
        </div>
        <ol className="grid md:grid-cols-2 gap-x-12 gap-y-10 reveal-stagger">
          {STEPS.map((s) => (
            <li key={s.k} className="border-t border-line pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-muted">{s.k}</span>
                <h3 className="font-display text-2xl md:text-3xl">{s.t}</h3>
              </div>
              <p className="mt-3 text-base text-muted leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* MEDICAL — service info: hours, emergency, online appointment */
function MedicalServiceInfo({ style, content }: { style: ExtraStyle; content: SiteContent }) {
  const h = moduleHeading(content, 'medicalInfo');
  const hours = content.contact.hours.length
    ? content.contact.hours
    : [
        { day: 'Mo – Fr', time: '08:00 – 18:00' },
        { day: 'Sa', time: '09:00 – 12:00' },
        { day: 'So', time: 'Geschlossen' },
      ];
  const notice = ((content as any).medicalNotice ?? {}) as { online?: string; emergency?: string };
  const onlineText = notice.online && notice.online.length > 0
    ? notice.online
    : 'Buchen Sie Ihren Termin direkt über unser Online-Portal — Doctolib & jameda angebunden.';
  const emergencyText = notice.emergency && notice.emergency.length > 0
    ? notice.emergency
    : 'Im akuten Notfall wählen Sie bitte 112 oder den ärztlichen Bereitschaftsdienst 116 117.';
  if (style === 'bold') {
    return (
      <section className="py-24 md:py-40 bg-[var(--accent-color)]/10">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 reveal">
            <p className="font-display text-6xl md:text-8xl leading-[0.9] text-[var(--accent-color)]">+</p>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-tight">{h.title}</h2>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4 reveal-stagger">
            <div className="bg-white border border-line rounded-3xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Sprechzeiten</p>
              <ul className="space-y-2">
                {hours.map((h, i) => (
                  <li key={i} className="flex justify-between text-base"><span className="text-muted">{h.day}</span><span className="font-medium">{h.time}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-line rounded-3xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Online-Termin</p>
              <p className="text-base leading-relaxed">{onlineText}</p>
              <a href="#kontakt" className="mt-5 inline-block font-medium text-[var(--accent-color)]">Termin buchen →</a>
            </div>
            <div className="bg-white border border-line rounded-3xl p-6 sm:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-widest text-rose-600 mb-4">⚠ Notfall</p>
              <p className="text-base leading-relaxed">{emergencyText}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl reveal mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{h.eyebrow}</p>
            <h2 className="font-display text-4xl md:text-5xl">{h.title}</h2>
            {h.subtitle ? <p className="mt-4 text-lg text-muted">{h.subtitle}</p> : null}
          </div>
          <div className="grid lg:grid-cols-3 gap-4 reveal-stagger">
          <article className="bg-white border border-line rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center mb-4">⏱</div>
            <h3 className="font-display text-2xl mb-3">Sprechzeiten</h3>
            <ul className="space-y-1.5 text-sm">
              {hours.map((h, i) => <li key={i} className="flex justify-between"><span className="text-muted">{h.day}</span><span>{h.time}</span></li>)}
            </ul>
          </article>
          <article className="bg-white border border-line rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center mb-4">📅</div>
            <h3 className="font-display text-2xl mb-3">Online-Termin</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">{onlineText}</p>
            <a href="#kontakt" className="text-sm font-medium text-[var(--accent-color)]">Termin anfragen →</a>
          </article>
          <article className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-rose-100 grid place-items-center mb-4 text-rose-600">⚠</div>
            <h3 className="font-display text-2xl mb-3 text-rose-700">Notfall</h3>
            <p className="text-sm leading-relaxed text-rose-900/80">{emergencyText}</p>
          </article>
        </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4 reveal">
          <p className="eyebrow mb-5">{h.eyebrow}</p>
          <h2 className="headline-lg">{h.title}</h2>
        </div>
        <div className="md:col-span-8 grid sm:grid-cols-2 gap-5 reveal-stagger">
          <div className="bg-white border border-line rounded-3xl p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Sprechzeiten</p>
            <ul className="space-y-2 text-base">
              {hours.map((h, i) => <li key={i} className="flex justify-between"><span className="text-muted">{h.day}</span><span>{h.time}</span></li>)}
            </ul>
          </div>
          <div className="bg-white border border-line rounded-3xl p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Online-Termin</p>
            <p className="text-base leading-relaxed">{onlineText}</p>
          </div>
          <div className="sm:col-span-2 bg-rose-50 border border-rose-100 rounded-3xl p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-rose-600 mb-2">⚠ Notfall</p>
            <p className="text-base text-rose-900/80">{emergencyText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FITNESS — programs grid + stats */
const FITNESS_PROGRAMS_DEFAULT: Array<{ k: string; t: string; d: string; meta: string }> = [
  { k: 'YOGA', t: 'Vinyasa Flow',     d: 'Dynamisches Yoga im Atemrhythmus. Für alle, die Bewegung lieben.', meta: '75 min · Mo / Mi / Fr' },
  { k: 'YIN',  t: 'Yin Yoga',         d: 'Lange gehaltene, ruhige Positionen. Tiefe Faszien-Arbeit.',          meta: '60 min · Di / Do' },
  { k: 'PIL',  t: 'Reformer Pilates', d: 'Kleingruppen mit max. 5 Personen. Präzise Korrekturen.',             meta: '60 min · n. Vereinb.' },
  { k: 'PT',   t: 'Personal Training',d: '60 oder 90 Minuten – ganz auf Sie zugeschnitten.',                   meta: 'flexibel · n. Vereinb.' },
];
function FitnessPrograms({ style, content }: { style: ExtraStyle; content: SiteContent }) {
  const h = moduleHeading(content, 'fitnessSpotlight');
  const resolvedPrograms = normaliseProgramList((content as unknown as { programs?: unknown }).programs ?? []);
  const PROGRAMS = resolvedPrograms.length > 0 ? resolvedPrograms : FITNESS_PROGRAMS_DEFAULT;
  const overlayNumbers = (content as any).numbers as Array<{ value: string; label: string }> | undefined;
  const stats = (overlayNumbers && overlayNumbers.length > 0
    ? overlayNumbers.slice(0, 3).map((n) => ({ raw: n.value, l: n.label }))
    : [
        { raw: '12+',  l: 'Klassen pro Woche' },
        { raw: '5',    l: 'Lehrer:innen' },
        { raw: '350+', l: 'Stammgäste' },
      ]
  ).map((s) => {
    const m = /^([\d.,]+)(.*)$/.exec(s.raw.trim());
    const v = m ? parseInt(m[1].replace(/\D/g, ''), 10) || 0 : 0;
    const suffix = m ? m[2] : '';
    return { v, s: suffix, l: s.l };
  });
  if (style === 'bold') {
    return (
      <section className="py-24 md:py-40 bg-[var(--text-color)] text-[var(--bg-color)]">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-14 reveal">
            <p className="md:col-span-2 font-display text-7xl md:text-9xl leading-none text-[var(--accent-color)]">01</p>
            <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[0.95]">{h.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-current/10 reveal-stagger">
            {PROGRAMS.map((p) => (
              <article key={p.k} className="bg-[var(--text-color)] p-8 md:p-12 hover:bg-[var(--accent-color)]/20 transition">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-display text-3xl text-[var(--accent-color)]">{p.k}</span>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60">{p.meta}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-3">{p.t}</h3>
                <p className="opacity-80 leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-3 gap-4 reveal-stagger">
            {stats.map((s, i) => (
              <div key={i} className="border-t border-current/30 pt-6">
                <p className="font-display text-5xl md:text-7xl"><AnimatedCounter to={s.v} />{s.s}</p>
                <p className="font-mono text-[11px] uppercase tracking-widest opacity-60 mt-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 mb-12 reveal">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{h.eyebrow}</p>
              <h2 className="font-display text-4xl md:text-5xl">{h.title}</h2>
            </div>
            <dl className="hidden md:flex gap-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <dt className="font-display text-3xl"><AnimatedCounter to={s.v} />{s.s}</dt>
                  <dd className="text-xs uppercase tracking-widest text-muted mt-1">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
            {PROGRAMS.map((p) => (
              <article key={p.k} className="group bg-white border border-line rounded-2xl p-6 hover:border-[var(--accent-color)] transition">
                <span className="inline-block font-mono text-xs px-2 py-1 rounded-md bg-[var(--accent-color)]/15 text-[var(--accent-color)] mb-4">{p.k}</span>
                <h3 className="font-display text-xl mb-2">{p.t}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{p.d}</p>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted pt-3 border-t border-line">{p.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-12 reveal">
          <div className="md:col-span-6">
            <p className="eyebrow mb-5">{h.eyebrow}</p>
            <h2 className="headline-lg">{h.title}</h2>
          </div>
          <dl className="md:col-span-6 grid grid-cols-3 gap-6 self-end">
            {stats.map((s, i) => (
              <div key={i} className="border-l border-line pl-4">
                <dt className="font-display text-3xl"><AnimatedCounter to={s.v} />{s.s}</dt>
                <dd className="text-xs uppercase tracking-widest text-muted mt-1">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
          {PROGRAMS.map((p) => (
            <article key={p.k} className="bg-white border border-line rounded-3xl p-7 hover-lift">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-display text-2xl text-[var(--accent-color)]">{p.k}</span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{p.meta}</span>
              </div>
              <h3 className="font-display text-2xl mb-2">{p.t}</h3>
              <p className="text-muted leading-relaxed">{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
