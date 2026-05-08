import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import type { ModularSectionV2, SiteContent, PageId } from '@/lib/types';
import { SplitText, AnimatedCounter, Accordion } from '@/components/fx';
import Seo from '@/components/Seo';
import { useBasePath, withBase, Section, ContactBlock } from '@/components/site-blocks';
import { Timeline } from '@/components/Timeline';
import { NewsPreview } from '@/components/News';
import { MasonryLightbox } from '@/components/MasonryLightbox';
import {
  CourseScheduleModule,
  OnlineBookingModule,
  PricePackagesModule,
  ProcessStepsModule,
  moduleHeading,
  type ModuleHeadingKey,
} from '@/components/branch-modules';
import { branchTextDefaults } from '@/lib/branch-text-defaults';

import { getBranchConfig } from '@/lib/branch-config';
import { meaningfulTestimonials, normaliseTeamList } from '@/lib/content-field-aliases';
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

export type ExtraBranchKey = 'consulting' | 'medical' | 'fitness' | 'wedding';
export const EXTRA_BRANCH_KEYS: ExtraBranchKey[] = ['consulting', 'medical', 'fitness', 'wedding'];
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

/** Per-tenant overlay over branch-text defaults â€” same SoT as 5-variant template. */
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
function pageHeaderOverride(content: SiteContent, key: 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader'): { eyebrow: string; title: string; subtitle: string; heroStyle?: string } | null {
  const v = (content as any)[key];
  if (!v || typeof v !== 'object') return null;
  return { eyebrow: String(v.eyebrow || ''), title: String(v.title || ''), subtitle: String(v.subtitle || ''), heroStyle: v.heroStyle || undefined };
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

/** Optional intro lines above the hero title (admin â€žHinweis-Bannerâ€œ). */
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

/** Smart link that uses anchor-jump for `#â€¦` and React-Router NavLink for routes. */
function ExtraHeroLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const basePath = useBasePath();
  const isAnchor = href.startsWith('#');
  const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
  if (isAnchor || isExternal) {
    return <a href={href} className={className}>{children}</a>;
  }
  return <NavLink to={withBase(basePath, href)} className={className}>{children}</NavLink>;
}

/** Same parsing as core `NumbersBand` â€” keeps counter / suffix behaviour aligned. */
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

/** Full-width Zahlen-Band from `content.numbers` (admin â€žZahlen-Bandâ€œ). */
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
            <ExtraHeroLink href={t.ctaHref} className="btn-primary">{t.cta} <span aria-hidden>â†’</span></ExtraHeroLink>
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
              <ExtraHeroLink href={hrefDefault} className="btn-primary mt-8">{cta} <span aria-hidden>â†’</span></ExtraHeroLink>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  const boldFallbackTitle =
    branch === 'consulting' ? 'NÃ¤chster Schritt?' : branch === 'medical' ? 'Termin?' : 'Startklar?';

  return (
    <section className="py-32 md:py-44 bg-[var(--accent-color)] text-[var(--accent-fg)] grain">
      <div className="container-x text-center reveal">
        <h2 className="font-display text-6xl md:text-8xl leading-[0.95]">{title || boldFallbackTitle}</h2>
        <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto opacity-80">{sub || 'Schreiben Sie uns. Wir antworten.'}</p>
        <ExtraHeroLink href={hrefDefault} className="btn-primary mt-10">{(cta || 'Jetzt Kontakt')} <span aria-hidden>â†’</span></ExtraHeroLink>
      </div>
    </section>
  );
}

export type ExtraStyle = 'classic' | 'modern' | 'bold';
export type ExtraPage = 'home' | 'services' | 'gallery' | 'about' | 'contact';

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
  about: 'Ãœber uns',
  contact: 'Kontakt',
};


export function PageSeoExtra({ content, branch, page }: { content: SiteContent; branch: ExtraBranchKey; page: ExtraPage }) {
  const t = page === 'home' ? content.brand.name : `${PAGE_TITLES[page as Exclude<ExtraPage, 'home'>]} Â· ${content.brand.name}`;
  const desc = page === 'home'
    ? (content.hero?.subtitle || content.about?.body?.slice(0, 160) || `${content.brand.name} â€“ ${content.brand.tagline || 'offizielle Website'}.`)
    : `${PAGE_TITLES[page as Exclude<ExtraPage, 'home'>]} bei ${content.brand.name}.`;
  return <Seo title={t} description={desc} content={content} template={branch} page={PAGE_TO_SEO[page]} />;
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
  const currentHeroImage = content.hero.imageUrl || content.branchText?.heroImageUrl || content.gallery[0] || content.about?.imageUrl || '';
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
          imageUrl: cmsV2Image(data.backgroundImage) || cmsV2Image(data.image) || currentHeroImage,
          ctaLabel: cmsV2LinkLabel(data.buttonPrimary) || content.hero.ctaLabel,
          ctaHref: cmsV2LinkHref(data.buttonPrimary) || content.hero.ctaHref,
        },
        branchText: { ...content.branchText, heroEyebrow: cmsV2Text(data.eyebrow), heroImageUrl: cmsV2Image(data.image) || content.branchText?.heroImageUrl || currentHeroImage },
      };
    case 'serviceCards':
      return { ...content, services: extraV2ServiceRows(data.items) };
    case 'serviceInfo':
      return content;
    case 'classCards':
    case 'programTable': {
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
    case 'trainingPlanOverview':
    case 'processTextColumns':
      return content;
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
  const items = cmsV2TextPairs(data.items ?? data.rows);
  if (!items.length) return null;
  return (
    <Section eyebrow={cmsV2Text(data.eyebrow)} title={cmsV2Text(data.headline) || title} subtitle={cmsV2Text(data.intro) || cmsV2Text(data.description)} className="surface">
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {items.map((item, i) => <article key={i} className="bg-white border border-line rounded-2xl p-7"><h3 className="font-display text-2xl">{item.t}</h3><p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p></article>)}
      </div>
    </Section>
  );
}

function ExtraV2TrainingPlan({ section }: { section: ModularSectionV2 }) {
  const data = asUnknownRecord(section.data);
  const items = Array.isArray(data.items)
    ? data.items
        .map(asUnknownRecord)
        .map((item) => ({
          title: cmsV2Text(item.title),
          description: cmsV2Text(item.description),
          goal: cmsV2Text(item.goal),
          level: cmsV2Text(item.level),
          frequency: cmsV2Text(item.frequency),
          duration: cmsV2Text(item.duration),
        }))
        .filter((item) => item.title || item.description || item.goal || item.level || item.frequency || item.duration)
    : [];
  if (!items.length) return null;

  return (
    <Section
      eyebrow={cmsV2Text(data.eyebrow)}
      title={cmsV2Text(data.headline) || 'Trainingsplan.'}
      subtitle={cmsV2Text(data.description)}
      className="surface"
    >
      <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
        {items.map((item, i) => {
          const meta = [
            item.goal && `Ziel: ${item.goal}`,
            item.level && `Level: ${item.level}`,
            item.frequency && item.frequency,
            item.duration && item.duration,
          ].filter(Boolean);
          return (
            <article key={i} className="bg-white border border-line rounded-2xl p-7">
              <h3 className="font-display text-2xl">{item.title}</h3>
              {item.description ? <p className="mt-3 text-sm text-muted leading-relaxed">{item.description}</p> : null}
              {meta.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {meta.map((entry) => (
                    <span key={entry} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {entry}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function ExtraV2SingleModule({ section, content, branch, style }: { section: ModularSectionV2; content: SiteContent; branch: ExtraBranchKey; style: ExtraStyle }) {
  const itemLinkPrefix = getBranchConfig(branch).paths.services;
  switch (section.type) {
    case 'serviceCards':
    case 'classCards':
      return <ExtraLeistungenServiceCards content={content} branch={branch} style={style} />;
    case 'serviceInfo':
      return <ExtraV2Cards section={section} title="Service & Info." />;
    case 'processTextColumns':
      return <ExtraV2Cards section={section} title={effectiveBranchText(branch, content).processTitle || 'Wie wir arbeiten.'} />;
    case 'processCards': {
      const bt = effectiveBranchText(branch, content);
      const enriched = { ...content, branchText: { ...((content as any).branchText || {}), processEyebrow: bt.processEyebrow, processTitle: bt.processTitle } };
      return <ProcessStepsModule content={enriched} itemLinkPrefix={itemLinkPrefix} />;
    }
    case 'pricingPackages':
      return <PricePackagesModule content={content} itemLinkPrefix={itemLinkPrefix} />;
    case 'team':
    case 'trainers':
      return <BranchTeam branch={branch} style={style} content={content} />;
    case 'appointmentBooking':
      return <OnlineBookingModule content={content} />;
    case 'trainingPlanOverview':
      return <ExtraV2TrainingPlan section={section} />;
    case 'programTable':
      return <CourseScheduleModule content={content} itemLinkPrefix={itemLinkPrefix} />;
    default:
      return null;
  }
}

function ExtraV2HomeHero({ content, branch, style, eyebrow }: { content: SiteContent; branch: ExtraBranchKey; style: ExtraStyle; eyebrow: string }) {
  const cta = resolveHeroCta(content);
  const body = heroBodyParagraphs(content);
  const heroEyebrow = effectiveBranchText(branch, content).heroEyebrow || eyebrow;

  if (style === 'modern') {
    const testimonials = meaningfulTestimonials(content.testimonials);
    const numbers = (content as any).numbers as Array<{ value: string; label: string }> | undefined;
    const stats = numbers && numbers.length >= 3
      ? numbers.slice(0, 3).map((n) => {
          const m = /^([\d.,]+)(.*)$/.exec(n.value.trim());
          return { value: m ? parseInt(m[1].replace(/\D/g, ''), 10) || 0 : 0, suffix: m ? m[2] : '', label: n.label };
        })
      : [
          { value: testimonials.length || 50, suffix: '+', label: 'Kund:innen' },
          { value: content.services.length || 6, suffix: '', label: 'Leistungen' },
          { value: 24, suffix: 'h', label: 'Antwortzeit' },
        ];
    const heroBadge = ((content as any).heroBadge ?? {}) as { text?: string; label?: string };
    const badgeText = (heroBadge.text && heroBadge.text.trim()) || '4,9 / 5,0';
    const badgeLabel = (heroBadge.label && heroBadge.label.trim()) || 'Google Bewertung';

    return (
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 reveal">
            <ExtraAnnouncementsRibbon content={content} />
            {heroEyebrow ? (
              <p className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-[var(--surface-color)] border border-line text-xs font-mono uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" /> {heroEyebrow}
              </p>
            ) : null}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">{content.hero.title}</h1>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-xl">{content.hero.subtitle}</p>
            {body.length > 0 ? (
              <div className="mt-5 max-w-xl text-base text-muted leading-relaxed space-y-3">
                {body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            ) : null}
            <div className="mt-10 flex flex-wrap gap-3">
              <ExtraHeroLink href={cta.primaryHref} className="btn-primary">{cta.primaryLabel}</ExtraHeroLink>
              {cta.secondaryLabel ? <ExtraHeroLink href={cta.secondaryHref} className="btn-ghost">{cta.secondaryLabel} â†’</ExtraHeroLink> : null}
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((s, i) => (
                <div key={i} className="border-l border-line pl-4">
                  <dt className="font-display text-3xl"><AnimatedCounter to={s.value} />{s.suffix}</dt>
                  <dd className="text-xs uppercase tracking-widest text-muted mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-line shadow-2xl">
                {content.hero.imageUrl ? <img src={content.hero.imageUrl} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-line p-5 max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 grid place-items-center"><span className="text-xl">â˜…</span></div>
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
    );
  }

  if (style === 'bold') {
    return (
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="container-x">
          <ExtraAnnouncementsRibbon content={content} />
          {heroEyebrow ? <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8 reveal">â€” {heroEyebrow} â€”</p> : null}
          <h1 className="font-display text-[clamp(2.5rem,11vw,11rem)] leading-[0.88] md:leading-[0.85] tracking-tight reveal break-words [overflow-wrap:anywhere] [hyphens:auto]">
            <SplitText>{content.hero.title}</SplitText>
          </h1>
        </div>
        {content.hero.imageUrl ? (
          <div className="mt-10 md:mt-16 reveal">
            <img src={content.hero.imageUrl} alt="" className="w-full aspect-[21/9] object-cover" loading="eager" />
          </div>
        ) : null}
        <div className="container-x mt-12 grid md:grid-cols-12 gap-8 reveal">
          <div className="md:col-span-7 space-y-5">
            <p className="text-2xl md:text-3xl leading-tight">{content.hero.subtitle}</p>
            {body.length > 0 ? (
              <div className="text-lg text-muted leading-relaxed space-y-3 max-w-3xl">
                {body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            ) : null}
          </div>
          <div className="md:col-span-5 md:text-right flex flex-wrap gap-3 md:justify-end">
            <ExtraHeroLink href={cta.primaryHref} className="btn-primary text-base">{cta.primaryLabel} <span aria-hidden>â†’</span></ExtraHeroLink>
            {cta.secondaryLabel ? <ExtraHeroLink href={cta.secondaryHref} className="btn-outline text-base">{cta.secondaryLabel}</ExtraHeroLink> : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {content.hero.imageUrl ? <img src={content.hero.imageUrl} alt="" className="w-full h-full object-cover opacity-40" loading="eager" /> : null}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, var(--bg-color) 0%, color-mix(in oklab, var(--bg-color), transparent 35%) 40%, var(--bg-color) 100%)' }} />
      </div>
      <div className="container-x relative z-10">
        <ExtraAnnouncementsRibbon content={content} />
        {heroEyebrow ? <p className="eyebrow mb-6 reveal">{heroEyebrow}</p> : null}
        <h1 className="headline-xl max-w-5xl reveal"><SplitText>{content.hero.title}</SplitText></h1>
        <p className="mt-8 text-lg md:text-2xl text-muted max-w-3xl reveal">{content.hero.subtitle}</p>
        {body.length > 0 ? (
          <div className="mt-6 max-w-3xl text-base md:text-lg text-muted leading-relaxed space-y-4 reveal">
            {body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        ) : null}
        <div className="mt-12 flex flex-wrap gap-3 reveal">
          <ExtraHeroLink href={cta.primaryHref} className="btn-primary">{cta.primaryLabel} <span aria-hidden>â†’</span></ExtraHeroLink>
          {cta.secondaryLabel ? <ExtraHeroLink href={cta.secondaryHref} className="btn-outline">{cta.secondaryLabel}</ExtraHeroLink> : null}
        </div>
      </div>
    </section>
  );
}

export function ExtraV2Page({ content, branch, page, style, eyebrow }: { content: SiteContent; branch: ExtraBranchKey; page: ExtraPage; style: ExtraStyle; eyebrow: string }) {
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
      {page === 'home'
        ? <ExtraV2HomeHero content={heroContent} branch={branch} style={style} eyebrow={eyebrow} />
        : <PageHero eyebrow={heroEyebrow} title={heroTitle} subtitle={heroSubtitle} style={style} page={page as Exclude<ExtraPage, 'home'>} content={heroContent} heroStyle={header?.heroStyle} />}
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
          case 'processTextColumns':
          case 'processCards':
          case 'pricingPackages':
          case 'team':
          case 'trainers':
          case 'appointmentBooking':
          case 'trainingPlanOverview':
          case 'programTable':
            return <ExtraV2SingleModule key={section.id} section={section} content={patched} branch={branch} style={style} />;
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
            return patched.faq?.length ? <Section key={section.id} title="HÃ¤ufige Fragen."><Accordion items={patched.faq} /></Section> : null;
          case 'cta':
            return <ExtraHomeSoftCta key={section.id} branch={branch} content={patched} layoutStyle={style} />;
          case 'contactDetails':
            return <Section key={section.id} title="Kontakt"><ContactBlock content={patched} showForm /></Section>;
          case 'locations':
            return <ExtraV2Cards key={section.id} section={{ ...section, data: { items: asUnknownRecord(section.data).locations } }} title="Standorte." />;
          case 'timeline':
            return <Timeline key={section.id} content={content} />;
          case 'countdown':
            return branch === 'wedding' ? <WeddingCountdown key={section.id} content={patched} /> : null;
          default:
            return null;
        }
      })}
    </>
  );
}

/* â”€â”€â”€ Compact page hero used on subpages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PageHero({ eyebrow, title, subtitle, style, page, content, heroStyle }: { eyebrow: string; title: string; subtitle?: string; style: ExtraStyle; page?: Exclude<ExtraPage, 'home'>; content?: SiteContent; heroStyle?: string }) {
  // When heroStyle is set from CMS, override the page-based default.
  const effectivePage = heroStyle
    ? (heroStyle === 'accent-band' ? 'services'
      : heroStyle === 'image-backed' ? 'gallery'
      : heroStyle === 'split' ? 'about'
      : heroStyle === 'accent-line' ? 'contact'
      : heroStyle === 'bold-full' ? '_bold'
      : heroStyle === 'minimal' ? '_minimal'
      : page)
    : page;

  /* â”€â”€ Services / accent band â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  if (effectivePage === 'services') {
    return (
      <section className="pt-32 md:pt-40 pb-14 md:pb-20 bg-brand text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="container-x relative">
          {eyebrow && <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 mb-5 reveal">{eyebrow}</p>}
          <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]' : 'font-display text-4xl md:text-6xl leading-tight'}`}>{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-white/70 reveal">{subtitle}</p>}
        </div>
      </section>
    );
  }

  /* â”€â”€ Gallery: image-backed hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  if (effectivePage === 'gallery') {
    const img = content?.gallery?.[0] || content?.about?.imageUrl || content?.hero?.imageUrl;
    return (
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-24 overflow-hidden">
        {img && (
          <div className="absolute inset-0 z-0">
            <img src={img} alt="" className="w-full h-full object-cover opacity-25" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)] via-[var(--bg-color)]/70 to-[var(--bg-color)]" />
          </div>
        )}
        <div className="container-x relative z-10">
          {eyebrow && <p className={style === 'modern' ? 'text-xs font-mono uppercase tracking-widest text-muted mb-4 reveal' : 'eyebrow mb-5 reveal'}>{eyebrow}</p>}
          <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]' : 'headline-xl'}`}>{title}</h1>
          {subtitle && <p className="mt-5 max-w-3xl text-lg md:text-xl text-muted reveal">{subtitle}</p>}
        </div>
      </section>
    );
  }

  /* â”€â”€ About: split layout with about image â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  if (effectivePage === 'about' && content?.about?.imageUrl) {
    return (
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 surface">
        <div className="container-x grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7">
            {eyebrow && <p className={style === 'modern' ? 'text-xs font-mono uppercase tracking-widest text-muted mb-4 reveal' : 'eyebrow mb-5 reveal'}>{eyebrow}</p>}
            <h1 className={`reveal break-words [overflow-wrap:anywhere] ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9]' : 'headline-xl'}`}>{title}</h1>
            {subtitle && <p className="mt-5 max-w-xl text-lg md:text-xl text-muted reveal">{subtitle}</p>}
          </div>
          <div className="md:col-span-5 reveal">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-line">
              <img src={content.about.imageUrl} alt="" className="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* â”€â”€ Contact: compact with accent line â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  if (effectivePage === 'contact') {
    return (
      <section className="pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="container-x">
          <div className="w-12 h-1 rounded-full bg-[var(--accent-color)] mb-6 reveal" />
          {eyebrow && <p className={style === 'modern' ? 'text-xs font-mono uppercase tracking-widest text-muted mb-4 reveal' : 'eyebrow mb-5 reveal'}>{eyebrow}</p>}
          <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9]' : 'headline-xl max-w-3xl'}`}>{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg md:text-xl text-muted reveal">{subtitle}</p>}
        </div>
      </section>
    );
  }

  /* â”€â”€ Bold-full (CMS heroStyle override) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  if (effectivePage === '_bold') {
    return (
      <section className="pt-32 md:pt-40 pb-16 grain relative overflow-hidden">
        <div className="container-x">
          {eyebrow && <p className="eyebrow mb-6 reveal">{eyebrow}</p>}
          <h1 className="reveal font-display tracking-tighter leading-[0.85] text-[14vw] md:text-[10vw] lg:text-[140px]">
            {title.toUpperCase()}
          </h1>
          {subtitle && <p className="mt-10 text-xl md:text-2xl max-w-3xl reveal leading-snug">{subtitle}</p>}
        </div>
      </section>
    );
  }

  /* â”€â”€ Minimal (CMS heroStyle override â€” text only) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  if (effectivePage === '_minimal') {
    return (
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="container-x">
          {eyebrow && <p className={style === 'modern' ? 'text-xs font-mono uppercase tracking-widest text-muted mb-4 reveal' : 'eyebrow mb-5 reveal'}>{eyebrow}</p>}
          <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]' : 'headline-xl'}`}>{title}</h1>
          {subtitle && <p className="mt-5 max-w-3xl text-lg md:text-xl text-muted reveal">{subtitle}</p>}
        </div>
      </section>
    );
  }

  /* â”€â”€ Default / fallback (custom pages, about without image) â”€â”€â”€â”€â”€â”€â”€ */
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

export function ExtraCustomV2PageRoute({ content, branch, style, eyebrow }: { content: SiteContent; branch: ExtraBranchKey; style: ExtraStyle; eyebrow: string }) {
  const { customSlug } = useParams();
  const page = (content.modularPagesV2?.customPages ?? []).find((p) => p.visible !== false && p.slug === customSlug);
  if (!page) return <><PageSeoExtra content={content} branch={branch} page="home" /><ExtraV2Page content={content} eyebrow={eyebrow} branch={branch} page="home" style={style} /></>;
  const sections = page.sections?.filter((section) => section.visible !== false && section.type !== 'noticeBanner') ?? [];
  const heroSection = sections.find((section) => section.type === 'hero');
  const heroData = heroSection ? asUnknownRecord(heroSection.data) : {};
  const heroTitle = cmsV2Text(heroData.headline) || page.label;
  const heroEyebrow = cmsV2Text(heroData.eyebrow) || page.label;
  const heroSubtitle = cmsV2Text(heroData.subline);
  return (
    <>
      <Seo title={heroTitle} description={heroSubtitle || `${page.label} Â· ${content.brand.name}`} content={content} template={branch} page="home" />
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
          case 'processTextColumns':
          case 'processCards':
          case 'pricingPackages':
          case 'team':
          case 'trainers':
          case 'appointmentBooking':
          case 'trainingPlanOverview':
          case 'programTable':
            return <ExtraV2SingleModule key={section.id} section={section} content={patched} branch={branch} style={style} />;
          case 'storyTeaser':
          case 'teaserList':
          case 'categoryCards':
          case 'contactPreview':
          case 'directions':
            return <ExtraV2Cards key={section.id} section={section} title="Details." />;
          case 'galleryPreview':
          case 'gallery':
            return patched.gallery.length ? <Section key={section.id} spacing="lg"><MasonryLightbox images={patched.gallery} /></Section> : null;
          case 'testimonials':
            return meaningfulTestimonials(patched.testimonials).length ? <Section key={section.id} title="Stimmen." className="surface"><div className="grid md:grid-cols-3 gap-5">{meaningfulTestimonials(patched.testimonials).slice(0, 3).map((t, i) => <blockquote key={i} className="bg-white border border-line rounded-2xl p-7"><p>{t.text}</p><footer className="mt-5 text-sm font-medium">{t.author}</footer></blockquote>)}</div></Section> : null;
          case 'statsBand':
            return <ExtraHomeNumbersBand key={section.id} content={patched} />;
          case 'newsTeaser':
            return <NewsPreview key={section.id} templateVariant={branch} content={patched} eyebrow={effectiveBranchText(branch, patched).newsEyebrow} title={effectiveBranchText(branch, patched).newsTitle} />;
          case 'faq':
            return patched.faq?.length ? <Section key={section.id} title="Häufige Fragen."><Accordion items={patched.faq} /></Section> : null;
          case 'cta':
            return <ExtraHomeSoftCta key={section.id} branch={branch} content={patched} layoutStyle={style} />;
          case 'contactDetails':
            return <Section key={section.id} title="Kontakt"><ContactBlock content={patched} showForm /></Section>;
          default:
            return null;
        }
      })}
    </>
  );
}

/** Detail-URL unter dem jeweiligen Leistungen-Pfad (extras: immer `/leistungen/â€¦`). */
function serviceDetailHref(branch: ExtraBranchKey, s: SiteContent['services'][number]): string | null {
  const slug = (s.detailSlug ?? '').trim();
  if (!slug || s.detailPublished === false) return null;
  const base = getBranchConfig(branch).paths.services;
  return `${base}/${slug}`;
}

/** Per-service â€žMehr erfahrenâ€œ â€” bei gesetztem `detailSlug` zur Detailseite, sonst Overrides / Anker. */
function extraServiceLearnMore(
  s: SiteContent['services'][number],
  bt: ReturnType<typeof effectiveBranchText>,
  branch: ExtraBranchKey,
): { label: string; href: string } {
  const g = bt as unknown as Record<string, string | undefined>;
  const base = (s.learnMoreLabel ?? '').trim() || (g.learnMoreLabel ?? '').trim() || 'Mehr erfahren';
  const label = `${base.replace(/\s*â†’\s*$/u, '').trim()} â†’`;
  const detail = serviceDetailHref(branch, s);
  if (detail) return { label: 'Mehr erfahren â†’', href: detail };
  const href = (s.learnMoreHref ?? '').trim() || (g.learnMoreHref ?? '').trim() || '#leistungen';
  return { label, href };
}

/* â”€â”€â”€ Sub-page renderer (services / gallery / about / contact) â”€â”€â”€â”€ */
const PAGE_HEADER_KEY: Record<Exclude<ExtraPage, 'home'>, 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader'> = {
  services: 'servicesHeader',
  gallery: 'galleryHeader',
  about: 'aboutHeader',
  contact: 'contactPageHeader',
};

/** /leistungen â€” same `content.services` + teaser copy as home; optional â€žAlleâ€œ-Link via branchText. */
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
        <h2 className="headline-lg">{bt.servicesTeaserTitle || <>Was wir<br /><em className="italic-pop">fÃ¼r Sie tun.</em></>}</h2>
      </div>
      <p className="md:col-span-5 text-lg text-muted reveal">
        {bt.teaserSubtitle || 'Eine Auswahl aus unserem Repertoire. Mehr im persÃ¶nlichen GesprÃ¤ch.'}
      </p>
    </div>
  );
  const teaserModern = (
    <div className="max-w-2xl reveal mb-16">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{bt.servicesTeaserEyebrow || 'Leistungen'}</p>
      <h2 className="font-display text-4xl md:text-5xl">{bt.servicesTeaserTitle || 'Was Sie bekommen.'}</h2>
      <p className="mt-4 text-lg text-muted">{bt.teaserSubtitle || 'Klar definierte Pakete â€“ keine versteckten Kosten.'}</p>
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
            <ExtraHeroLink href={allHref} className="btn-outline">{allLabel} <span aria-hidden>â†’</span></ExtraHeroLink>
          </div>
        )}
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 *  WEDDING COUNTDOWN â€” live countdown to the big day
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WeddingCountdown({ content }: { content: SiteContent }) {
  const dateStr = (content as any).weddingDate as string | undefined;
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!dateStr) return null;
  const target = new Date(dateStr + 'T00:00:00').getTime();
  const diff = target - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  const units = [
    { value: days, label: 'Tage' },
    { value: hours, label: 'Stunden' },
    { value: minutes, label: 'Minuten' },
    { value: seconds, label: 'Sekunden' },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="container-x text-center">
        <p className="eyebrow mb-4 reveal">Noch</p>
        <div className="flex justify-center gap-4 md:gap-8 reveal">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <span className="font-display text-4xl md:text-6xl tabular-nums" style={{ color: 'var(--accent-color)' }}>{String(u.value).padStart(2, '0')}</span>
              <span className="mt-2 text-xs md:text-sm uppercase tracking-widest text-muted">{u.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg text-muted reveal">bis zum groÃŸen Tag â™¥</p>
      </div>
    </section>
  );
}

export function ExtraHeader({ content, style, branch }: { content: SiteContent; style: ExtraStyle; branch: ExtraBranchKey }) {
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
  const cfg = getBranchConfig(branch);
  const DEFAULT_NAV: { to: string; label: string }[] = [
    { to: '/', label: 'Start' },
    { to: '/leistungen', label: cfg.pages.services },
    { to: '/galerie', label: cfg.pages.gallery },
    { to: '/ueber-uns', label: cfg.pages.about },
    { to: '/kontakt', label: cfg.pages.contact },
  ];
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
          <ExtraHeroLink href={((content as any)?.navCta?.href || '').trim() || '/kontakt'} className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-sm">
            {((content as any)?.navCta?.label || '').trim() || content.hero.ctaLabel || 'Termin'} <span aria-hidden>→</span>
          </ExtraHeroLink>
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

export function ExtraFooter({ content, style }: { content: SiteContent; style: ExtraStyle }) {
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
  wedding: [
    { n: 'Sophie', r: 'Trauzeugin', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', bio: 'Beste Freundin seit der Schulzeit. Zuständig für Taschentücher und Tanzeinlagen.' },
    { n: 'Jan', r: 'Trauzeuge', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', bio: 'WG-Kumpel, Reisepartner und seit 15 Jahren mit dabei.' },
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
  /** Home hides generic team when `doctors` renders in modules â€” keep false on /ueber-uns so the Team editor still surfaces. */
  suppressMedicalWhenNamedDoctors?: boolean;
}) {
  const team = useBranchTeam(content, branch);
  if (branch === 'medical' && suppressMedicalWhenNamedDoctors) {
    const docs = ((content as unknown as { doctors?: { name?: string }[] }).doctors) ?? [];
    const hasNamedDoctor = docs.some((d) => d && String(d.name ?? '').trim().length > 0);
    if (hasNamedDoctor) return null;
  }
  if (team.length === 0) return null;
  const teamKey: ModuleHeadingKey = branch === 'fitness' ? 'teamFitness' : branch === 'medical' ? 'teamMedical' : branch === 'wedding' ? 'teamWedding' : 'teamConsulting';
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

/* Branch identity chips â€” strong visual differentiator just under the hero. */

