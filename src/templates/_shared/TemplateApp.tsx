import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import type { ModularSectionV2, SiteContent, TemplateKey, PageId } from '@/lib/types';
import Seo from '@/components/Seo';
import {
  SiteHeader, Hero, Section, ContactBlock, SafeMapEmbed, SiteFooter, BasePathProvider, useBasePath, withBase,
  type NavItem,
} from '@/components/site-blocks';
import {
  Accordion, AnimatedCounter, useReveal, ParallaxImage,
} from '@/components/fx';
import {
  Tilt3DCard,
} from '@/components/motion-fx';
import {
  AuroraBackground, AnimatedGridPattern, MarqueeTrack, TextReveal,
} from '@/components/fx-21st';
import { TLink } from '@/components/site-blocks';
import { ConsentScripts } from '@/components/ConsentScripts';
import { Timeline } from '@/components/Timeline';
import { NewsPreview, NewsIndexPage, NewsDetailPage } from '@/components/News';
import { CatalogItemDetailPage } from '@/components/CatalogItemDetailPage';
import { Imprint, Privacy } from '@/components/legal-pages';
import { MasonryLightbox } from '@/components/MasonryLightbox';
import { branchTextDefaults } from '@/lib/branch-text-defaults';
import { getOpenStatus, parseHours } from '@/lib/open-hours';
import {
  resolveClientPathToPageId,
  isAnnouncementBarEnabledOnPage,
} from '@/lib/page-layout';
import { withModularSiteContent } from '@/lib/modular-site-overlay';
import {
  asUnknownRecord,
  cmsV2Boolean,
  cmsV2FaqItems,
  cmsV2Image,
  cmsV2LabelEntries,
  cmsV2LinkHref,
  cmsV2LinkLabel,
  cmsV2Text,
  cmsV2TextItems,
  cmsV2TextPairs,
  type UnknownRecord,
} from '@/lib/cms-v2-render-utils';
// Drift coverage (globalLayoutFieldDriftIssues) requires literal sectionOrder in this bundle; values are read via getEffectiveHomeSectionKeys.
import { BranchSignature } from './BranchSignature';
import {
  MenuCategoriesModule,
  RoomShowcaseModule,
  TourCardsModule,
  TreatmentListModule,
  FundingCalculatorModule,
  EmergencyStickyBanner,
} from '@/components/branch-modules';
import { meaningfulTestimonials, isMeaningfulServiceCard } from '@/lib/content-field-aliases';
import { getBranchConfig, isExtraBranch } from '@/lib/branch-config';
import { parseNumberValue, pageHeaderOverride, effectiveBranchText } from './template-utils';
import {
  type ExtraBranchKey,
  ExtraHeader,
  ExtraFooter,
  ExtraV2Page,
  ExtraCustomV2PageRoute,
  PageSeoExtra,
} from './extra/ExtraBranchTemplate';

export type TemplateVariant = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism';
export type TemplateStyle = 'classic' | 'modern' | 'bold';

const NAV_BY_VARIANT: Record<TemplateVariant, { servicesPath: string; servicesLabel: string; nav: NavItem[]; servicesEyebrow: string; servicesHeadline: string }> = {
  restaurant: {
    servicesPath: '/speisekarte',
    servicesLabel: 'Speisekarte',
    servicesEyebrow: 'Speisekarte',
    servicesHeadline: 'Aus der K�che.',
    nav: [
      { to: '/', label: 'Start' },
      { to: '/speisekarte', label: 'Speisekarte' },
      { to: '/galerie', label: 'Galerie' },
      { to: '/ueber-uns', label: '�ber uns' },
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
    servicesHeadline: 'Was wir k�nnen.',
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
      { to: '/galerie', label: 'Eindr�cke' },
      { to: '/ueber-uns', label: 'Guides' },
      { to: '/kontakt', label: 'Buchen' },
    ],
  },
};

const VARIANT_HERO_META: Record<TemplateVariant, { label: string; value: string }[]> = {
  restaurant: [
    { label: 'Familie seit', value: '1998' },
    { label: 'Pl�tze drinnen', value: '64' },
    { label: 'Pasta', value: 't�glich frisch' },
    { label: 'Bewertung', value: '4,9 ?' },
  ],
  salon: [
    { label: 'Stylist:innen', value: '6' },
    { label: 'Education', value: 'Paris � NY' },
    { label: 'Wartezeit', value: '3 Tage' },
    { label: 'Bewertung', value: '4,9 ?' },
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
    { label: 'Spa-Fl�che', value: '600 m�' },
    { label: 'Bewertung', value: '4,9 ?' },
  ],
  tourism: [
    { label: 'Touren pro Jahr', value: '180+' },
    { label: 'Guides', value: '14' },
    { label: 'Sprachen', value: '6' },
    { label: 'Bewertung', value: '4,9 ?' },
  ],
};

/* Resolve numbers/faq overlays from admin content. */
function resolveHeroMeta(variant: TemplateVariant, content: SiteContent): { label: string; value: string }[] {
  const overlay = (content as any).numbers as { value: string; label: string }[] | undefined;
  const filtered = (overlay ?? []).filter(
    (n) => n && (String(n.label ?? '').trim() || String(n.value ?? '').trim()),
  );
  if (filtered.length > 0) return filtered.map((n) => ({ label: n.label, value: n.value }));
  return VARIANT_HERO_META[variant];
}

export default function TemplateApp({
  variant,
  content,
  basePath = '',
  style = 'classic',
  eyebrow,
}: {
  /** All nine tenant templates � unified entry point. */
  variant: TemplateKey;
  content: SiteContent;
  basePath?: string;
  style?: TemplateStyle;
  /** Optional hero eyebrow (showcase preview for extras). */
  eyebrow?: string;
}) {
  const resolvedContent = withModularSiteContent(content, variant, style);

  if (isExtraBranch(variant)) {
    const branch = variant as ExtraBranchKey;
    const eb = eyebrow ?? resolvedContent.brand.tagline ?? '';
    const bcfg = getBranchConfig(variant);
    const catalogSvcSeg = bcfg.paths.services.replace(/^\//, '');
    useReveal();
    return (
      <BasePathProvider value={basePath}>
        <div className={`min-h-screen flex flex-col tpl-style-${style} tpl-branch-${branch} bg-[var(--bg-color)] text-[var(--text-color)]`}>
          <ConsentScripts scripts={(resolvedContent as any).customScripts} />
          <ExtraHeader content={resolvedContent} style={style} branch={branch} />
          <main className="flex-1">
            <ScrollToTopOnRoute />
            <Routes>
              <Route index element={<><PageSeoExtra content={resolvedContent} branch={branch} page="home" /><ExtraV2Page content={resolvedContent} eyebrow={eb} branch={branch} page="home" style={style} /></>} />
              <Route
                path={`${catalogSvcSeg}/:catalogSlug`}
                element={<><PageSeoExtra content={resolvedContent} branch={branch} page="services" /><CatalogItemDetailPage content={resolvedContent} template={branch} style={style} /></>}
              />
              <Route path={catalogSvcSeg} element={<><PageSeoExtra content={resolvedContent} branch={branch} page="services" /><ExtraV2Page content={resolvedContent} eyebrow={eb} branch={branch} page="services" style={style} /></>} />
              <Route path="galerie" element={<><PageSeoExtra content={resolvedContent} branch={branch} page="gallery" /><ExtraV2Page content={resolvedContent} eyebrow={eb} branch={branch} page="gallery" style={style} /></>} />
              <Route path="ueber-uns" element={<><PageSeoExtra content={resolvedContent} branch={branch} page="about" /><ExtraV2Page content={resolvedContent} eyebrow={eb} branch={branch} page="about" style={style} /></>} />
              <Route path="kontakt" element={<><PageSeoExtra content={resolvedContent} branch={branch} page="contact" /><ExtraV2Page content={resolvedContent} eyebrow={eb} branch={branch} page="contact" style={style} /></>} />
              <Route path="news" element={<NewsIndexPage content={resolvedContent} basePath={basePath} templateVariant={branch} />} />
              <Route path="news/:slug" element={<NewsDetailPage content={resolvedContent} basePath={basePath} templateVariant={branch} />} />
              <Route path="impressum" element={<Imprint content={resolvedContent} />} />
              <Route path="datenschutz" element={<Privacy content={resolvedContent} />} />
              <Route path=":customSlug" element={<ExtraCustomV2PageRoute content={resolvedContent} branch={branch} style={style} eyebrow={eb} />} />
              <Route path="*" element={<><PageSeoExtra content={resolvedContent} branch={branch} page="home" /><ExtraV2Page content={resolvedContent} eyebrow={eb} branch={branch} page="home" style={style} /></>} />
            </Routes>
          </main>
          <ExtraFooter content={resolvedContent} style={style} />
        </div>
      </BasePathProvider>
    );
  }

  const coreVariant = variant as TemplateVariant;
  const cfg = NAV_BY_VARIANT[coreVariant];
  const catalogSvcSeg = getBranchConfig(variant).paths.services.replace(/^\//, '');
  const loc = useLocation();
  const pageForBanner = resolveClientPathToPageId(loc.pathname, coreVariant);
  const allAnnouncements = announcementsFor(coreVariant, content);
  const announcements = isAnnouncementBarEnabledOnPage(content, pageForBanner) ? allAnnouncements : [];
  useReveal();

  // Tenant-overridden navigation: only kept items with non-empty label that are visible.
  const customNav = (content as any).navItems as Array<{ label: string; path: string; visible: boolean }> | undefined;
  const resolvedNav = (customNav && customNav.length)
    ? customNav.filter((n) => n.visible !== false && n.label && n.label.trim()).map((n) => ({ to: n.path, label: n.label }))
    : cfg.nav;

  return (
    <BasePathProvider value={basePath}>
      <div className={`min-h-screen flex flex-col tpl-style-${style} tpl-variant-${variant}`}>
        <ConsentScripts scripts={(content as any).customScripts} />
        <SiteHeader content={content} nav={resolvedNav} basePath={basePath} announcements={announcements} transparentTextDark={style !== 'classic'} />
        <main className="flex-1">
          <ScrollToTopOnRoute />
          <Routes>
            <Route index element={<><PageSeo page="home" variant={coreVariant} content={content} /><HomePage variant={coreVariant} content={content} style={style} /></>} />
            <Route
              path={`${catalogSvcSeg}/:catalogSlug`}
              element={(
                <>
                  <PageSeo page="services" variant={coreVariant} content={content} />
                  <CatalogItemDetailPage content={content} template={variant} style={style} />
                </>
              )}
            />
            <Route path={cfg.servicesPath.replace(/^\//, '')} element={<><PageSeo page="services" variant={coreVariant} content={content} /><ServicesPage variant={coreVariant} content={content} style={style} /></>} />
            <Route path="galerie" element={<><PageSeo page="gallery" variant={coreVariant} content={content} /><GalleryPage content={content} variant={coreVariant} style={style} /></>} />
            <Route path="referenzen" element={<><PageSeo page="gallery" variant={coreVariant} content={content} /><GalleryPage content={content} variant={coreVariant} style={style} title="Referenzen" eyebrow="Projekte" /></>} />
            <Route path="ueber-uns" element={<><PageSeo page="about" variant={coreVariant} content={content} /><AboutPage variant={coreVariant} content={content} style={style} /></>} />
            <Route path="kontakt" element={<><PageSeo page="contactPage" variant={coreVariant} content={content} /><ContactPage content={content} variant={coreVariant} style={style} /></>} />
            <Route path="news" element={<NewsIndexPage content={content} basePath={basePath} templateVariant={variant} />} />
            <Route path="news/:slug" element={<NewsDetailPage content={content} basePath={basePath} templateVariant={variant} />} />
            <Route path="impressum" element={<Imprint content={content} />} />
            <Route path="datenschutz" element={<Privacy content={content} />} />
            <Route path=":customSlug" element={<CustomV2PageRoute variant={coreVariant} content={content} style={style} />} />
            <Route path="*" element={<><PageSeo page="home" variant={coreVariant} content={content} /><HomePage variant={coreVariant} content={content} style={style} /></>} />
          </Routes>
        </main>
        <SiteFooter content={content} basePath={basePath} nav={resolvedNav} />
        {coreVariant === 'tradesman' && <EmergencyStickyBanner content={content} />}
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
      description: content.hero?.subtitle || content.about?.body?.slice(0, 160) || `${content.brand.name} � ${content.brand.tagline || 'offizielle Website'}.`,
    },
    services: {
      title: variant === 'restaurant' ? 'Speisekarte' : variant === 'tradesman' ? 'Leistungen' : 'Leistungen & Preise',
      description: variant === 'restaurant'
        ? `Aktuelle Speisekarte � Vorspeisen, Hauptgerichte, Desserts. Saisonale Karte bei ${content.brand.name}.`
        : `Alle Leistungen und Preise von ${content.brand.name} im �berblick.`,
    },
    gallery: {
      title: variant === 'tradesman' ? 'Referenzen' : 'Galerie',
      description: variant === 'tradesman'
        ? `Ausgew�hlte Projekte und Referenzen von ${content.brand.name}.`
        : `Eindr�cke und Galerie von ${content.brand.name}.`,
    },
    about: {
      title: content.about?.title || '�ber uns',
      description: content.about?.body?.slice(0, 160) || `�ber ${content.brand.name}.`,
    },
    contactPage: {
      title: 'Kontakt',
      description: `Adresse, �ffnungszeiten und Kontaktdaten von ${content.brand.name}.`,
    },
  };
  const l = labels[page];
  return <Seo title={l.title} description={l.description} content={content} template={tplKey} page={page} />;
}

function announcementsFor(v: TemplateVariant, content: SiteContent): string[] {
  // 1. Tenant override (admin-saved) wins.
  const overlay = (content as any).announcements as string[] | undefined;
  let base: string[];
  const overlayFiltered = overlay?.length ? overlay.filter((s) => s && s.trim()) : [];
  if (overlayFiltered.length) {
    base = overlayFiltered;
  } else if (v === 'restaurant') base = ['Heute ge�ffnet', 'Tisch online reservieren', 'Saisonale Karte', 'Reservierung empfohlen'];
  else if (v === 'salon') base = ['Aktuell freie Termine', 'Bridal-Beratung kostenlos', 'Premium-Pflegepartner', 'Termin online buchen'];
  else if (v === 'hotel') base = ['Zimmer verf�gbar', 'Spa & Sauna inklusive', 'Familienbetrieb', 'Direktbuchung mit Bestpreis'];
  else if (v === 'tourism') base = ['T�glich gef�hrte Touren', 'Kleine Gruppen', 'Lizenzierte Guides', 'Mehrsprachig'];
  else base = ['24/7 Notdienst', 'F�rderberatung inklusive', 'Festpreis-Garantie', 'Meisterbetrieb'];

  // 2. Auto-prepend a real "Heute ge�ffnet � HH:MM � HH:MM" indicator when
  //    the tenant has structured opening hours we can parse.
  try {
    const status = getOpenStatus(content.contact?.hours);
    if (status.todayLabel) {
      const live = status.isOpen
        ? `Heute ge�ffnet � ${status.todayFull ?? status.todayLabel}`
        : `Heute � ${status.todayFull ?? status.todayLabel}`;
      // De-duplicate against any tenant string that already mentions "heute"/"ge�ffnet".
      const filtered = base.filter((s) => !/heute|ge�ffnet|aktuell offen|jetzt offen/i.test(s));
      return [live, ...filtered];
    }
  } catch {
    /* parse failed � fall through to plain announcements */
  }
  return base;
}

/* --- Home ----------------------------------------------------------- */
function HomePage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  if (variant === 'restaurant') return <RestaurantV2HomePage content={content} style={style} />;
  if (variant === 'hotel') return <HotelV2HomePage content={content} style={style} />;
  return <CoreV2HomePage variant={variant} content={content} style={style} />;
}

type RestaurantV2SubpageKey = 'services' | 'gallery' | 'about' | 'contact';

export const RESTAURANT_V2_RENDERED_SECTION_TYPES = new Set<string>([
  'noticeBanner',
  'hero',
  'actionBar',
  'marqueeBand',
  'featuredDishesGrid',
  'featuredDishes',
  'storyTeaser',
  'galleryPreview',
  'labelBand',
  'testimonials',
  'statsBand',
  'newsTeaser',
  'highlightsBar',
  'menu',
  'steps',
  'faq',
  'teaserList',
  'gallery',
  'timeline',
  'team',
  'expertQuotes',
  'storyFacts',
  'contactDetails',
  'locations',
  'directions',
  'cta',
  'ctaBand',
  'videoEmbed',
  'seasonalHighlight',
  'reservationTeaser',
  'chefStory',
  'trustStrip',
  'badgeWall',
]);

export const HOTEL_V2_RENDERED_SECTION_TYPES = new Set<string>([
  'noticeBanner',
  'hero',
  'actionBar',
  'featuredAreas',
  'storyTeaser',
  'galleryPreview',
  'testimonials',
  'statsBand',
  'newsTeaser',
  'cta',
  'marqueeBand',
  'brandLogos',
  'roomSelection',
  'testimonialMarquee',
  'highlightsBar',
  'accommodationsGrid',
  'accommodationList',
  'roomCards',
  'steps',
  'faq',
  'teaserList',
  'gallery',
  'timeline',
  'team',
  'storyFacts',
  'contactDetails',
  'locations',
  'directions',
  'videoEmbed',
  'seasonalHighlight',
  'experiencePackages',
  'amenitiesGrid',
  'trustStrip',
  'badgeWall',
]);

export const CORE_V2_RENDERED_SECTION_TYPES = new Set<string>([
  'noticeBanner',
  'hero',
  'actionBar',
  'stickyEmergencyBanner',
  'featuredServices',
  'serviceCards',
  'serviceList',
  'serviceOverviewCards',
  'serviceOverviewList',
  'featuredLooks',
  'featuredLooksBand',
  'featureImage',
  'storyTeaser',
  'storySplit',
  'storyImageSplit',
  'galleryPreview',
  'gallery',
  'testimonials',
  'testimonialMarquee',
  'quoteWall',
  'statsBand',
  'newsTeaser',
  'newsHighlightList',
  'cta',
  'ctaBand',
  'marqueeBand',
  'keywordBand',
  'brandLogos',
  'topicCards',
  'topicBand',
  'categoryCards',
  'qualifications',
  'fundingCalculator',
  'tourSchedule',
  'tourSelection',
  'tourOverviewCards',
  'tourOverviewList',
  'tourCards',
  'highlightsBar',
  'steps',
  'faq',
  'teaserList',
  'timeline',
  'team',
  'storyFacts',
  'contactDetails',
  'locations',
  'directions',
  'videoEmbed',
  'seasonalHighlight',
  'projectShowcase',
  'lookBook',
  'productLine',
  'responsePromise',
  'serviceAreaMap',
  'trustStrip',
  'badgeWall',
  'reservationTeaser',
  'trialCta',
  'rsvpForm',
  'chefStory',
  'challengeSpotlight',
  'experiencePackages',
  'amenitiesGrid',
  'comparisonTable',
  'caseStudyCards',
  'insuranceInfo',
  'impactNumbers',
  'venueShowcase',
]);

function cmsV2HotelRoomItems(value: unknown): NonNullable<SiteContent['rooms']> {
  return Array.isArray(value)
    ? value
        .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
        .map((item) => {
          const price = [cmsV2Text(item.price), cmsV2Text(item.priceSuffix)].filter(Boolean).join(' ');
          return {
            name: cmsV2Text(item.title) || cmsV2Text(item.name),
            description: cmsV2Text(item.description),
            size: cmsV2Text(item.subtitle) || cmsV2Text(item.size),
            beds: cmsV2Text(item.beds),
            price,
            imageUrl: cmsV2Image(item.image),
            features: Array.isArray(item.features)
              ? item.features.map((feature) => (typeof feature === 'string' ? feature.trim() : cmsV2Text(asUnknownRecord(feature).text))).filter(Boolean)
              : [],
            detailSlug: cmsV2Text(item.detailSlug),
            detailPublished: cmsV2Boolean(item.detailPublished, true),
            detailSubtitle: cmsV2Text(item.detailSubtitle),
            detailBody: cmsV2Text(item.detailBody),
            detailBodyHtml: cmsV2Text(item.detailBodyHtml),
            detailGallery: Array.isArray(item.detailGallery) ? item.detailGallery.map(cmsV2Text).filter(Boolean) : [],
          };
        })
        .filter((room) => room.name || room.description || room.imageUrl)
    : [];
}

function cmsV2HotelServicesFromRooms(rooms: NonNullable<SiteContent['rooms']>): SiteContent['services'] {
  return rooms.map((room) => ({
    title: room.name,
    description: [room.description, [room.size, room.beds].filter(Boolean).join(' � ')].filter(Boolean).join(' '),
    price: room.price,
    imageUrl: room.imageUrl,
    learnMoreLabel: '',
    learnMoreHref: '',
    detailSlug: room.detailSlug,
    detailPublished: room.detailPublished,
    detailSubtitle: room.detailSubtitle,
    detailBody: room.detailBody,
    detailBodyHtml: room.detailBodyHtml,
    detailGallery: room.detailGallery,
  }));
}

function cmsV2CatalogServices(value: unknown): SiteContent['services'] {
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

function cmsV2Treatments(value: unknown): NonNullable<SiteContent['treatments']> {
  return cmsV2CatalogServices(value).map((item) => ({
    name: item.title,
    description: item.description,
    duration: '',
    price: item.price,
    category: '',
    imageUrl: item.imageUrl,
    detailSlug: item.detailSlug,
    detailPublished: item.detailPublished,
    detailSubtitle: item.detailSubtitle,
    detailBody: item.detailBody,
    detailBodyHtml: item.detailBodyHtml,
    detailGallery: item.detailGallery,
  }));
}

function cmsV2Tours(value: unknown): NonNullable<SiteContent['tours']> {
  return Array.isArray(value)
    ? value
        .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
        .map((item) => ({
          name: cmsV2Text(item.title) || cmsV2Text(item.name),
          description: cmsV2Text(item.description),
          duration: cmsV2Text(item.duration) || cmsV2Text(item.subtitle),
          level: cmsV2Text(item.level) || cmsV2Text(item.difficulty),
          groupSize: cmsV2Text(item.groupSize) || cmsV2Text(item.group),
          price: cmsV2Text(item.price) || cmsV2Text(item.meta),
          imageUrl: cmsV2Image(item.image),
          languages: Array.isArray(item.languages) ? item.languages.map(cmsV2Text).filter(Boolean) : [],
          detailSlug: cmsV2Text(item.detailSlug),
          detailPublished: cmsV2Boolean(item.detailPublished, true),
          detailSubtitle: cmsV2Text(item.detailSubtitle),
          detailBody: cmsV2Text(item.detailBody),
          detailBodyHtml: cmsV2Text(item.detailBodyHtml),
          detailGallery: Array.isArray(item.detailGallery) ? item.detailGallery.map(cmsV2Text).filter(Boolean) : [],
        }))
        .filter((item) => item.name || item.description || item.imageUrl)
    : [];
}

function cmsV2AdditionalFormFields(value: unknown, fallback: SiteContent['formFields'] = []): SiteContent['formFields'] {
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

function cmsV2ContactContent(content: SiteContent, data: UnknownRecord): SiteContent {
  return {
    ...content,
    contact: {
      ...content.contact,
      mapsUrl: cmsV2Text(data.googleMapsUrl) || content.contact.mapsUrl,
    },
    contactBlock: {
      ...content.contactBlock,
      eyebrow: cmsV2Text(data.eyebrow),
      title: cmsV2Text(data.headline),
      subtitle: cmsV2Text(data.subline),
    },
    formFields: cmsV2AdditionalFormFields(data.additionalFormFields, content.formFields),
  };
}

function cmsV2CoreSectionContent(content: SiteContent, variant: TemplateVariant, section: ModularSectionV2, style: TemplateStyle): SiteContent {
  const data = asUnknownRecord(section.data);
  switch (section.type) {
    case 'stickyEmergencyBanner':
      return {
        ...content,
        emergencyBanner: {
          enabled: true,
          text: cmsV2Text(data.headline) || cmsV2Text(data.label),
          phone: cmsV2Text(data.phone),
          sticky: true,
        },
      };
    case 'featuredServices':
    case 'serviceCards':
    case 'serviceList':
    case 'serviceOverviewCards':
    case 'serviceOverviewList':
    case 'featuredLooks':
    case 'featuredLooksBand': {
      const services = cmsV2CatalogServices(data.items);
      return {
        ...content,
        services,
        treatments: variant === 'salon' ? cmsV2Treatments(data.items) : content.treatments,
        branchText: {
          ...content.branchText,
          servicesTeaserEyebrow: cmsV2Text(data.eyebrow),
          servicesTeaserTitle: cmsV2Text(data.headline),
        },
        moduleHeadings: {
          ...content.moduleHeadings,
          treatments: { eyebrow: cmsV2Text(data.eyebrow), titleA: cmsV2Text(data.headline), titleB: '', subtitle: cmsV2Text(data.description) },
        },
      };
    }
    case 'tourSchedule':
    case 'tourSelection':
    case 'tourOverviewCards':
    case 'tourOverviewList':
    case 'tourCards': {
      const tours = cmsV2Tours(data.items);
      return {
        ...content,
        tours,
        services: tours.map((tour) => ({
          title: tour.name,
          description: tour.description,
          price: tour.price,
          imageUrl: tour.imageUrl,
          learnMoreLabel: '',
          learnMoreHref: '',
          detailSlug: tour.detailSlug,
          detailPublished: tour.detailPublished,
          detailSubtitle: tour.detailSubtitle,
          detailBody: tour.detailBody,
          detailBodyHtml: tour.detailBodyHtml,
          detailGallery: tour.detailGallery,
        })),
        moduleHeadings: {
          ...content.moduleHeadings,
          tours: { eyebrow: cmsV2Text(data.eyebrow), titleA: cmsV2Text(data.headline), titleB: '', subtitle: cmsV2Text(data.description) },
        },
      };
    }
    case 'fundingCalculator': {
      const programs = Array.isArray(data.programs) ? data.programs : Array.isArray(data.items) ? data.items : [];
      return {
        ...content,
        fundingCalc: {
          minInvest: Number(data.investmentMin) || content.fundingCalc?.minInvest || 5000,
          maxInvest: Number(data.investmentMax) || content.fundingCalc?.maxInvest || 150000,
          stepInvest: Number(data.investmentStep) || content.fundingCalc?.stepInvest || 1000,
          defaultInvest: Number(data.investmentDefault) || content.fundingCalc?.defaultInvest || 25000,
        },
        fundingItems: cmsV2CatalogServices(programs).map((item) => ({
          title: item.title,
          description: item.description,
          percent: item.price,
          program: item.detailSubtitle,
          imageUrl: item.imageUrl,
          detailSlug: item.detailSlug,
          detailPublished: item.detailPublished,
          detailBody: item.detailBody,
          detailBodyHtml: item.detailBodyHtml,
          detailGallery: item.detailGallery,
          detailSubtitle: item.detailSubtitle,
        })),
      };
    }
    case 'brandLogos':
      return cmsV2HotelSectionContent(content, { ...section, type: 'brandLogos' }, style);
    case 'testimonialMarquee':
    case 'keywordBand':
      return { ...content, branchText: { ...content.branchText, marqueeWords: cmsV2TextItems(data.items) } };
    case 'contactDetails':
      return cmsV2ContactContent(content, data);
    case 'storySplit':
    case 'storyImageSplit':
      return cmsV2RestaurantSectionContent(content, { ...section, type: 'storyTeaser' }, style);
    default:
      return cmsV2RestaurantSectionContent(content, section, style);
  }
}

function cmsV2HotelSectionContent(content: SiteContent, section: ModularSectionV2, style: TemplateStyle): SiteContent {
  const data = asUnknownRecord(section.data);
  switch (section.type) {
    case 'featuredAreas':
    case 'roomSelection': {
      const rooms = cmsV2HotelRoomItems(data.items);
      return {
        ...content,
        rooms,
        services: cmsV2HotelServicesFromRooms(rooms),
        branchText: {
          ...content.branchText,
          servicesTeaserEyebrow: cmsV2Text(data.eyebrow),
          servicesTeaserTitle: cmsV2Text(data.headline),
        },
        moduleHeadings: {
          ...content.moduleHeadings,
          rooms: {
            eyebrow: cmsV2Text(data.eyebrow),
            titleA: cmsV2Text(data.headline),
            titleB: '',
            subtitle: cmsV2Text(data.description),
          },
        },
      };
    }
    case 'accommodationsGrid':
    case 'accommodationList':
    case 'roomCards': {
      const rooms = cmsV2HotelRoomItems(data.items);
      return {
        ...content,
        rooms,
        services: cmsV2HotelServicesFromRooms(rooms),
        moduleHeadings: {
          ...content.moduleHeadings,
          rooms: {
            eyebrow: cmsV2Text(data.eyebrow),
            titleA: cmsV2Text(data.headline),
            titleB: '',
            subtitle: cmsV2Text(data.description),
          },
        },
      };
    }
    case 'highlightsBar': {
      const pairs = cmsV2TextPairs(data.items);
      return pairs.length ? { ...content, serviceHighlights: pairs } : content;
    }
    case 'steps':
      return { ...content, serviceProcess: cmsV2TextPairs(data.items) };
    case 'faq':
      return { ...content, faq: cmsV2FaqItems(data.items) };
    case 'brandLogos':
      return {
        ...content,
        logos: Array.isArray(data.items)
          ? data.items
              .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
              .map((item) => cmsV2Image(item.logo) || cmsV2Text(item.name))
              .filter(Boolean)
          : [],
      };
    case 'testimonialMarquee':
      return {
        ...content,
        branchText: {
          ...content.branchText,
          marqueeWords: cmsV2TextItems(data.items),
        },
      };
    default:
      return cmsV2RestaurantSectionContent(content, section, style);
  }
}

function cmsV2RestaurantSectionContent(content: SiteContent, section: ModularSectionV2, style: TemplateStyle): SiteContent {
  const data = asUnknownRecord(section.data);
  switch (section.type) {
    case 'noticeBanner':
      return {
        ...content,
        announcements: cmsV2TextItems(data.items),
      };
    case 'hero': {
      const primary = data.buttonPrimary;
      const stats = Array.isArray(data.stats)
        ? data.stats
            .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
            .map((item) => ({ value: cmsV2Text(item.value), label: cmsV2Text(item.description) }))
            .filter((item) => item.value || item.label)
        : [];
      return {
        ...content,
        hero: {
          ...content.hero,
          title: cmsV2Text(data.headline) || content.hero.title,
          subtitle: cmsV2Text(data.subline),
          body: cmsV2Text(data.description),
          imageUrl: cmsV2Image(data.backgroundImage) || cmsV2Image(data.image) || content.hero.imageUrl,
          ctaLabel: cmsV2LinkLabel(primary) || content.hero.ctaLabel,
          ctaHref: cmsV2LinkHref(primary) || content.hero.ctaHref,
        },
        branchText: {
          ...content.branchText,
          heroEyebrow: cmsV2Text(data.eyebrow),
          ...(style !== 'classic' && cmsV2Image(data.image) ? { heroImageUrl: cmsV2Image(data.image) } : {}),
        },
        heroCta: {
          ...content.heroCta,
          primaryLabel: cmsV2LinkLabel(primary),
          primaryHref: cmsV2LinkHref(primary),
        },
        ...(stats.length ? { numbers: stats } : {}),
      };
    }
    case 'actionBar': {
      const primary = data.buttonPrimary;
      const secondary = data.buttonSecondary;
      return {
        ...content,
        homeStrip: {
          ...content.homeStrip,
          eyebrowAuto: cmsV2Boolean(data.autoAvailabilityStatusEnabled, true),
          eyebrow: cmsV2Text(data.availabilityStatusOverride),
          primaryLabel: cmsV2LinkLabel(primary),
          primaryHref: cmsV2LinkHref(primary) || 'tel:',
          secondaryLabel: cmsV2LinkLabel(secondary),
          secondaryHref: cmsV2LinkHref(secondary),
        },
      };
    }
    case 'featuredDishesGrid':
    case 'featuredDishes': {
      const rows = Array.isArray(data.items)
        ? data.items
            .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
            .map((item) => ({
              title: cmsV2Text(item.name) || cmsV2Text(item.title),
              price: cmsV2Text(item.price),
              description: cmsV2Text(item.description),
              imageUrl: cmsV2Image(item.image),
            }))
            .filter((item) => item.title || item.description || item.imageUrl)
        : [];
      return {
        ...content,
        homeSignature: {
          ...content.homeSignature,
          eyebrow: cmsV2Text(data.eyebrow),
          titleA: cmsV2Text(data.titleA) || cmsV2Text(data.headline),
          titleB: cmsV2Text(data.titleB),
          intro: cmsV2Text(data.description),
        },
        homeSignatureItems: rows,
      };
    }
    case 'featuredItems': {
      const services = Array.isArray(data.items)
        ? data.items
            .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
            .map((item) => ({
              title: cmsV2Text(item.title) || cmsV2Text(item.name),
              price: cmsV2Text(item.price),
              description: cmsV2Text(item.description),
              imageUrl: cmsV2Image(item.image),
              detailSlug: cmsV2Text(item.detailSlug),
              detailPublished: cmsV2Boolean(item.detailPublished, true),
              detailSubtitle: cmsV2Text(item.detailSubtitle),
              detailBody: cmsV2Text(item.detailBody),
              detailBodyHtml: cmsV2Text(item.detailBodyHtml),
              detailGallery: Array.isArray(item.detailGallery) ? item.detailGallery.map(cmsV2Text).filter(Boolean) : [],
              learnMoreLabel: cmsV2Text(item.learnMoreLabel),
              learnMoreHref: cmsV2Text(item.learnMoreHref),
            }))
            .filter((item) => item.title || item.description || item.imageUrl)
        : [];
      return {
        ...content,
        services,
        branchText: {
          ...content.branchText,
          servicesTeaserEyebrow: cmsV2Text(data.eyebrow),
          servicesTeaserTitle: cmsV2Text(data.headline),
        },
      };
    }
    case 'storyTeaser': {
      const button = data.button;
      return {
        ...content,
        about: {
          ...(content.about ?? { title: '', body: '', imageUrl: '' }),
          title: cmsV2Text(data.headline),
          body: cmsV2Text(data.description),
          imageUrl: cmsV2Image(data.image) || content.about?.imageUrl || '',
        },
        branchText: {
          ...content.branchText,
          aboutTeaserEyebrow: cmsV2Text(data.eyebrow),
          learnMoreLabel: cmsV2LinkLabel(button),
          learnMoreHref: cmsV2LinkHref(button),
        },
      };
    }
    case 'labelBand':
      return {
        ...content,
        logos: cmsV2LabelEntries(data.labels ?? data.items),
      };
    case 'marqueeBand':
      return {
        ...content,
        branchText: {
          ...content.branchText,
          marqueeWords: cmsV2TextItems(data.items),
        },
      };
    case 'statsBand': {
      const numbers = Array.isArray(data.items)
        ? data.items
            .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
            .map((item) => ({ value: cmsV2Text(item.value), label: cmsV2Text(item.description) }))
            .filter((item) => item.value || item.label)
        : [];
      return { ...content, numbers };
    }
    case 'newsTeaser': {
      const button = data.button;
      return {
        ...content,
        branchText: {
          ...content.branchText,
          newsEyebrow: cmsV2Text(data.eyebrow),
          newsTitle: cmsV2Text(data.headline),
          ...(cmsV2LinkLabel(button) ? { newsAllLabel: cmsV2LinkLabel(button) } : {}),
          ...(cmsV2LinkHref(button) ? { newsAllHref: cmsV2LinkHref(button) } : {}),
        },
      };
    }
    case 'galleryPreview':
    case 'gallery': {
      const images = Array.isArray(data.images)
        ? data.images.map((item) => cmsV2Image(item)).filter(Boolean)
        : [];
      const button = data.button;
      return {
        ...content,
        gallery: images.length ? images : content.gallery,
        branchText: {
          ...content.branchText,
          galleryTeaserEyebrow: cmsV2Text(data.eyebrow),
          galleryTeaserTitle: cmsV2Text(data.headline),
          ...(cmsV2LinkLabel(button) ? { galleryAllLabel: cmsV2LinkLabel(button) } : {}),
          ...(cmsV2LinkHref(button) ? { galleryAllHref: cmsV2LinkHref(button) } : {}),
        },
      };
    }
    case 'testimonials': {
      const raw = Array.isArray(data.testimonials) ? data.testimonials : Array.isArray(data.items) ? data.items : [];
      const testimonials = raw
        .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
        .map((item) => ({ author: cmsV2Text(item.name) || cmsV2Text(item.author), text: cmsV2Text(item.quote) || cmsV2Text(item.text) }))
        .filter((item) => item.author || item.text);
      return {
        ...content,
        testimonials,
        branchText: {
          ...content.branchText,
          testimonialsEyebrow: cmsV2Text(data.eyebrow),
          testimonialsTitle: cmsV2Text(data.headline),
        },
      };
    }
    case 'cta':
    case 'ctaBand': {
      const button = data.button;
      return {
        ...content,
        ctaBandOverride: {
          ...content.ctaBandOverride,
          eyebrow: cmsV2Text(data.eyebrow),
          lead: cmsV2Text(data.headline),
          sub: cmsV2Text(data.subline),
          cta: cmsV2LinkLabel(button),
          ctaHref: cmsV2LinkHref(button),
        },
      };
    }
    default:
      return content;
  }
}

function renderRestaurantV2HomeSection(section: ModularSectionV2, content: SiteContent, style: TemplateStyle): JSX.Element | null {
  const sectionContent = cmsV2RestaurantSectionContent(content, section, style);
  switch (section.type) {
    case 'actionBar':
      return <BranchActionStrip variant="restaurant" content={sectionContent} />;
    case 'marqueeBand': {
      const words = sectionContent.branchText?.marqueeWords ?? [];
      return words.length ? (
        <section className="py-6 border-y border-line bg-white overflow-hidden">
          <MarqueeTrack speed={32}>
            {words.map((word) => (
              <span key={word} className="font-display text-3xl md:text-5xl text-brand/80">{word}</span>
            ))}
          </MarqueeTrack>
        </section>
      ) : null;
    }
    case 'featuredDishesGrid':
    case 'featuredDishes':
      return <BranchSignature variant="restaurant" style={style} content={sectionContent} />;
    case 'featuredItems': {
      const featured = sectionContent.services.filter(isMeaningfulServiceCard).slice(0, 3);
      return featured.length ? (
        <Section
          eyebrow={effectiveBranchText('restaurant', sectionContent).servicesTeaserEyebrow || 'Empfehlungen'}
          title={splitTitle(effectiveBranchText('restaurant', sectionContent).servicesTeaserTitle || 'Aus der K�che.')}
          subtitle={subtitleFor('restaurant', sectionContent)}
          className={style === 'modern' ? 'surface' : ''}
        >
          <ClassicServicesGrid services={featured} variant="restaurant" />
        </Section>
      ) : null;
    }
    case 'storyTeaser':
      return sectionContent.about?.body ? (
        <Section
          eyebrow={effectiveBranchText('restaurant', sectionContent).aboutTeaserEyebrow}
          title={<>{splitTitle(sectionContent.about.title || '�ber uns')}</>}
          spacing="lg"
        >
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <ParallaxImage src={sectionContent.about.imageUrl || sectionContent.gallery[0]} alt={sectionContent.brand.name} className="rounded-3xl aspect-[4/5] reveal" />
            </div>
            <div className="lg:col-span-7 lg:pt-12">
              <div className="prose-lite reveal">
                {(sectionContent.about.body || '').split('\n\n').map((p, i) => (
                  <p key={i} className="text-lg md:text-xl leading-relaxed text-muted mb-6">{p}</p>
                ))}
              </div>
              <TLink to={effectiveBranchText('restaurant', sectionContent).learnMoreHref || '/ueber-uns'} className="btn-outline mt-6 reveal">{effectiveBranchText('restaurant', sectionContent).learnMoreLabel} <span aria-hidden>?</span></TLink>
            </div>
          </div>
        </Section>
      ) : null;
    case 'statsBand':
      return <NumbersBand variant="restaurant" content={sectionContent} />;
    case 'newsTeaser':
      return <NewsPreview templateVariant="restaurant" content={sectionContent} eyebrow={sectionContent.branchText?.newsEyebrow || 'Aktuelles'} title={sectionContent.branchText?.newsTitle || 'News & Notizen.'} />;
    case 'galleryPreview':
    case 'gallery': {
      const images = sectionContent.gallery.slice(0, section.type === 'galleryPreview' ? 8 : undefined);
      return images.length ? (
        <Section eyebrow={effectiveBranchText('restaurant', sectionContent).galleryTeaserEyebrow} title={galleryTeaserTitle('restaurant', sectionContent)} spacing="lg">
          <GalleryShowcase variant="restaurant" images={images} mode={section.type === 'galleryPreview' ? 'teaser' : 'full'} />
        </Section>
      ) : null;
    }
    case 'labelBand': {
      const labels = sectionContent.logos ?? [];
      return labels.length ? (
        <section className="py-14 border-y border-line">
          <div className="container-x flex flex-wrap items-center justify-between gap-y-6 gap-x-10 opacity-70">
            {labels.map((entry) =>
              logoBandEntryIsImageUrl(entry) ? (
                <img key={entry} src={entry} alt="" className="h-9 md:h-11 w-auto max-w-[140px] object-contain mix-blend-multiply" loading="lazy" />
              ) : (
                <span key={entry} className="font-display text-2xl tracking-wide">{entry}</span>
              ),
            )}
          </div>
        </section>
      ) : null;
    }
    case 'testimonials':
      return visibleTestimonials(sectionContent).length ? (
        <Section eyebrow={effectiveBranchText('restaurant', sectionContent).testimonialsEyebrow} title={splitTitle(effectiveBranchText('restaurant', sectionContent).testimonialsTitle)} className="surface">
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {visibleTestimonials(sectionContent).slice(0, 3).map((t, i) => (
              <blockquote key={i} className="bg-white border border-line rounded-3xl p-8 hover-lift">
                <span className="font-display text-7xl text-[var(--accent-color)] block leading-none mb-2">&ldquo;</span>
                <p className="text-lg leading-relaxed">{t.text}</p>
                <footer className="mt-6 pt-5 border-t border-line text-sm font-medium">{t.author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null;
    case 'cta':
    case 'ctaBand':
      return <CtaBand variant="restaurant" content={sectionContent} />;
    default:
      return null;
  }
}

function CmsV2HomeHero({
  variant,
  content,
  style,
  meta,
}: {
  variant: TemplateVariant;
  content: SiteContent;
  style: TemplateStyle;
  meta: { label: string; value: string }[];
}) {
  const cfg = NAV_BY_VARIANT[variant];
  const heroImg = effectiveBranchText(variant, content).heroImageUrl || content.hero.imageUrl || content.gallery[0] || content.about?.imageUrl;
  const heroCta = (content as any).heroCta as { primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string } | undefined;
  const primaryLabel = heroCta?.primaryLabel || content.hero.ctaLabel || 'Kontakt aufnehmen';
  const primaryHref = heroCta?.primaryHref || content.hero.ctaHref || '/kontakt';
  const secondaryLabel = heroCta?.secondaryLabel ?? (style === 'modern' ? `${cfg.servicesLabel} ansehen` : '');
  const secondaryHref = heroCta?.secondaryHref || cfg.servicesPath;

  if (style === 'modern') {
    return (
      <section className="pt-44 pb-20 md:pb-28 relative overflow-hidden">
        <AuroraBackground intensity={0.18} colors={['var(--accent-color)', '#FFB347', '#7C3AED', '#22d3ee']} />
        <AnimatedGridPattern className="text-brand/[0.07]" width={40} height={40} dotSize={1.2} />
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-6 reveal">
            <p className="eyebrow mb-5">{content.brand.tagline || 'Willkommen'}</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] tracking-tight">
              <TextReveal text={content.hero.title || ((content.brand.hideName && content.brand.logoUrl) ? '' : `${content.brand.name}.`)} />
              {content.hero.subtitle ? (
                <>
                  <br />
                  <span className="text-muted"><TextReveal text={content.hero.subtitle} /></span>
                </>
              ) : null}
            </h1>
            <p className="mt-8 text-lg text-muted max-w-xl">{heroBodyFor(variant, content)}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <TLink to={primaryHref} className="btn-primary">{primaryLabel} <span aria-hidden>?</span></TLink>
              {secondaryLabel ? <TLink to={secondaryHref} className="btn-outline">{secondaryLabel}</TLink> : null}
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
            {heroImg ? (
              <Tilt3DCard className="rounded-3xl">
                <div className="relative">
                  <div className="absolute -inset-6 rounded-[2rem] bg-[var(--accent-color)] opacity-25 blur-3xl" aria-hidden />
                  <div className="relative rounded-3xl overflow-hidden border border-line shadow-2xl aspect-[4/5] bg-white">
                    <img src={heroImg} alt={content.brand.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </Tilt3DCard>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  if (style === 'bold') {
    const heroEyebrow = effectiveBranchText(variant, content).heroEyebrow || content.brand.tagline || cfg.servicesEyebrow;
    const words = marqueeWordsFor(variant, content).concat(marqueeWordsFor(variant, content));
    return (
      <section className="pt-40 pb-10 grain relative overflow-hidden">
        <AuroraBackground intensity={0.22} colors={['var(--accent-color)', '#FFB347', '#22d3ee', '#7C3AED']} />
        <div className="container-x relative">
          <p className="eyebrow mb-6 reveal">{heroEyebrow}</p>
          <h1 className="reveal font-display tracking-tighter leading-[0.85] text-[clamp(2.5rem,13vw,180px)] md:text-[14vw] lg:text-[180px] break-words [overflow-wrap:anywhere] [hyphens:auto]">
            {(content.hero.title || ((content.brand.hideName && content.brand.logoUrl) ? '' : content.brand.name)).toUpperCase()}
          </h1>
          {primaryLabel ? (
            <div className="mt-10 flex flex-wrap gap-4 reveal">
              <TLink to={primaryHref} className="btn-accent">{primaryLabel} <span aria-hidden>?</span></TLink>
              {secondaryLabel ? <TLink to={secondaryHref} className="btn-outline">{secondaryLabel}</TLink> : null}
            </div>
          ) : null}
        </div>
        <div className="mt-10 border-y border-line py-4 bg-white">
          <MarqueeTrack speed={45}>
            <span className="inline-flex items-center gap-10 font-display text-5xl md:text-7xl whitespace-nowrap text-brand">
              {words.map((w, i) => (
                <span key={i} className="inline-flex items-center gap-10">
                  <span>{w}</span><span className="text-[var(--accent-color)]">?</span>
                </span>
              ))}
            </span>
          </MarqueeTrack>
        </div>
        {heroImg ? (
          <div className="container-x mt-12 reveal">
            <div className="aspect-[21/9] overflow-hidden rounded-none">
              <img src={heroImg} alt={content.brand.name} className="w-full h-full object-cover" />
            </div>
          </div>
        ) : null}
      </section>
    );
  }

  return <Hero content={content} meta={meta} />;
}

function RestaurantV2HomePage({ content, style }: { content: SiteContent; style: TemplateStyle }) {
  const sections = visibleCmsV2Sections(content.modularPagesV2?.home?.sections);
  const heroSection = sections.find((section) => section.type === 'hero');
  const heroContent = heroSection ? cmsV2RestaurantSectionContent(content, heroSection, style) : content;
  const heroMeta = resolveHeroMeta('restaurant', heroContent);

  return (
    <>
      <CmsV2HomeHero variant="restaurant" content={heroContent} style={style} meta={heroMeta} />
      {sections
        .filter((section) => section.type !== 'hero')
        .map((section) => (
          <React.Fragment key={section.id}>{renderRestaurantV2HomeSection(section, content, style)}</React.Fragment>
        ))}
    </>
  );
}

function HotelV2HomePage({ content, style }: { content: SiteContent; style: TemplateStyle }) {
  const sections = visibleCmsV2Sections(content.modularPagesV2?.home?.sections);
  const heroSection = sections.find((section) => section.type === 'hero');
  const heroContent = heroSection ? cmsV2HotelSectionContent(content, heroSection, style) : content;
  const heroMeta = resolveHeroMeta('hotel', heroContent);

  return (
    <>
      <CmsV2HomeHero variant="hotel" content={heroContent} style={style} meta={heroMeta} />
      {sections
        .filter((section) => section.type !== 'hero')
        .map((section) => (
          <React.Fragment key={section.id}>{renderHotelV2HomeSection(section, content, style)}</React.Fragment>
        ))}
    </>
  );
}

function CoreV2HomePage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  const sections = visibleCmsV2Sections(content.modularPagesV2?.home?.sections);
  const heroSection = sections.find((section) => section.type === 'hero');
  const heroContent = heroSection ? cmsV2CoreSectionContent(content, variant, heroSection, style) : content;
  const heroMeta = resolveHeroMeta(variant, heroContent);

  return (
    <>
      <CmsV2HomeHero variant={variant} content={heroContent} style={style} meta={heroMeta} />
      {sections
        .filter((section) => section.type !== 'hero')
        .map((section) => (
          <React.Fragment key={section.id}>{renderCoreV2Section('home', variant, section, content, style)}</React.Fragment>
        ))}
    </>
  );
}

function CustomV2PageRoute({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  const { customSlug } = useParams();
  const page = (content.modularPagesV2?.customPages ?? []).find((p) => p.visible !== false && p.slug === customSlug);
  if (!page) return <><PageSeo page="home" variant={variant} content={content} /><HomePage variant={variant} content={content} style={style} /></>;
  const sections = visibleCmsV2Sections(page.sections);
  const heroSection = sections.find((section) => section.type === 'hero');
  const heroData = heroSection ? asUnknownRecord(heroSection.data) : {};
  const title = cmsV2Text(heroData.headline) || page.label;
  const eyebrow = cmsV2Text(heroData.eyebrow) || page.label;
  const subtitle = cmsV2Text(heroData.subline);
  const image = cmsV2Image(heroData.backgroundImage) || cmsV2Image(heroData.image);
  return (
    <>
      <Seo title={title} description={subtitle || `${page.label} � ${content.brand.name}`} content={content} template={variant as TemplateKey} page="home" />
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} body={cmsV2Text(heroData.description)} style={style} image={image} />
      {sections.filter((section) => section.type !== 'hero').map((section) => (
        <React.Fragment key={section.id}>
          {variant === 'restaurant'
            ? renderRestaurantV2SubpageSection('services', section, content, style)
            : variant === 'hotel'
              ? renderHotelV2SubpageSection('services', section, content, style)
              : renderCoreV2Section('services', variant, section, content, style)}
        </React.Fragment>
      ))}
    </>
  );
}

function HotelV2Subpage({ page, content, style }: { page: RestaurantV2SubpageKey; content: SiteContent; style: TemplateStyle }) {
  const sections = restaurantV2SubpageSections(content, page);
  const heroSection = sections.find((section) => section.type === 'hero');
  const heroData = heroSection ? asUnknownRecord(heroSection.data) : {};
  const heroContent = heroSection ? cmsV2RestaurantSubpageContent(content, heroSection, page) : content;
  const fallback = NAV_BY_VARIANT.hotel;
  const headerKey: 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader' =
    page === 'services' ? 'servicesHeader'
      : page === 'gallery' ? 'galleryHeader'
        : page === 'about' ? 'aboutHeader'
          : 'contactPageHeader';
  const header = pageHeaderOverride(heroContent, headerKey);
  const defaultTitle =
    page === 'services' ? fallback.servicesHeadline
      : page === 'gallery' ? 'Haus & Spa.'
        : page === 'about' ? 'Geschichte & Gastgeber.'
          : 'Reservieren.';
  const defaultEyebrow =
    page === 'services' ? fallback.servicesEyebrow
      : page === 'gallery' ? 'Galerie'
        : page === 'about' ? 'Geschichte'
          : 'Kontakt';

  return (
    <>
      <PageHero
        eyebrow={header?.eyebrow || defaultEyebrow}
        title={header?.title || defaultTitle}
        subtitle={header?.subtitle || ''}
        body={cmsV2Text(heroData.description)}
        style={style}
        image={cmsV2Image(heroData.backgroundImage) || cmsV2Image(heroData.image) || (page === 'services' ? effectiveBranchText('hotel', heroContent).servicesPageImageUrl : undefined)}
        page={page}
        heroStyle={header?.heroStyle}
      />
      {sections
        .filter((section) => section.type !== 'hero')
        .map((section) => (
          <React.Fragment key={section.id}>{renderHotelV2SubpageSection(page, section, content, style)}</React.Fragment>
        ))}
    </>
  );
}

function CoreV2Subpage({ page, variant, content, style }: { page: RestaurantV2SubpageKey; variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  const sections = restaurantV2SubpageSections(content, page);
  const heroSection = sections.find((section) => section.type === 'hero');
  const heroData = heroSection ? asUnknownRecord(heroSection.data) : {};
  const heroContent = heroSection ? cmsV2RestaurantSubpageContent(content, heroSection, page) : content;
  const cfg = NAV_BY_VARIANT[variant];
  const headerKey: 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader' =
    page === 'services' ? 'servicesHeader'
      : page === 'gallery' ? 'galleryHeader'
        : page === 'about' ? 'aboutHeader'
          : 'contactPageHeader';
  const header = pageHeaderOverride(heroContent, headerKey);
  const defaultTitle =
    page === 'services' ? cfg.servicesHeadline
      : page === 'gallery' ? 'Einblicke.'
        : page === 'about' ? '�ber uns.'
          : 'Kontakt.';
  const defaultEyebrow =
    page === 'services' ? cfg.servicesEyebrow
      : page === 'gallery' ? 'Galerie'
        : page === 'about' ? '�ber uns'
          : 'Kontakt';

  return (
    <>
      <PageHero
        eyebrow={header?.eyebrow || defaultEyebrow}
        title={header?.title || defaultTitle}
        subtitle={header?.subtitle || ''}
        body={cmsV2Text(heroData.description)}
        style={style}
        image={cmsV2Image(heroData.backgroundImage) || cmsV2Image(heroData.image) || (page === 'services' ? effectiveBranchText(variant, heroContent).servicesPageImageUrl : undefined)}
        page={page}
        heroStyle={header?.heroStyle}
      />
      {sections
        .filter((section) => section.type !== 'hero')
        .map((section) => (
          <React.Fragment key={section.id}>{renderCoreV2Section(page, variant, section, content, style)}</React.Fragment>
        ))}
    </>
  );
}

function renderCoreCards(section: ModularSectionV2, fallbackTitle: string): JSX.Element | null {
  const data = asUnknownRecord(section.data);
  const items = cmsV2TextPairs(data.items);
  if (!items.length) return null;
  return (
    <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || fallbackTitle)} subtitle={cmsV2Text(data.description)} className="surface">
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {items.map((item, i) => (
          <article key={i} className="border border-line rounded-2xl p-7 bg-white">
            <h3 className="font-display text-2xl">{item.t}</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function renderCoreV2Section(page: 'home' | RestaurantV2SubpageKey, variant: TemplateVariant, section: ModularSectionV2, content: SiteContent, style: TemplateStyle): JSX.Element | null {
  const data = asUnknownRecord(section.data);
  const sectionContent = cmsV2CoreSectionContent(cmsV2RestaurantSubpageContent(content, section, page === 'home' ? 'services' : page), variant, section, style);
  switch (section.type) {
    case 'stickyEmergencyBanner':
      return <EmergencyStickyBanner content={sectionContent} />;
    case 'actionBar':
      return <BranchActionStrip variant={variant} content={sectionContent} />;
    case 'marqueeBand':
    case 'keywordBand':
    case 'testimonialMarquee': {
      const words = sectionContent.branchText?.marqueeWords ?? [];
      return words.length ? <section className="py-6 border-y border-line bg-white overflow-hidden"><MarqueeTrack speed={34}>{words.map((word) => <span key={word} className="font-display text-3xl md:text-5xl text-brand/80">{word}</span>)}</MarqueeTrack></section> : null;
    }
    case 'featuredServices':
    case 'serviceCards':
    case 'serviceList':
    case 'serviceOverviewCards':
    case 'serviceOverviewList':
      if (variant === 'salon') return <TreatmentListModule content={sectionContent} itemLinkPrefix="/leistungen" />;
      return sectionContent.services.length ? <Section><ClassicServicesGrid services={sectionContent.services.slice(0, 6)} variant={variant} /></Section> : null;
    case 'featuredLooks':
    case 'featuredLooksBand':
      return variant === 'salon' ? <TreatmentListModule content={sectionContent} itemLinkPrefix="/leistungen" /> : null;
    case 'tourSchedule':
    case 'tourSelection':
    case 'tourOverviewCards':
    case 'tourOverviewList':
    case 'tourCards':
      return <TourCardsModule content={sectionContent} itemLinkPrefix="/touren" />;
    case 'fundingCalculator':
      return <FundingCalculatorModule content={sectionContent} itemLinkPrefix="/leistungen" />;
    case 'featureImage': {
      const image = cmsV2Image(data.image);
      return image ? <Section spacing="lg"><img src={image} alt="" className="w-full max-h-[720px] object-cover rounded-2xl" loading="lazy" /></Section> : null;
    }
    case 'storyTeaser':
    case 'storySplit':
    case 'storyImageSplit':
      return renderRestaurantV2HomeSection({ ...section, type: 'storyTeaser' }, sectionContent, style);
    case 'galleryPreview':
      return renderRestaurantV2HomeSection(section, sectionContent, style);
    case 'gallery': {
      const images = Array.isArray(data.images) ? data.images.map((item) => cmsV2Image(item)).filter(Boolean) : [];
      return images.length ? <Section spacing="lg">{style === 'bold' ? <MasonryGrid images={images} /> : style === 'modern' ? <ModernGalleryGrid images={images} /> : <GalleryShowcase variant={variant} images={images} mode="full" />}</Section> : null;
    }
    case 'brandLogos':
      return renderHotelV2HomeSection(section, sectionContent, style);
    case 'testimonials':
      return renderRestaurantV2HomeSection(section, sectionContent, style);
    case 'quoteWall':
    case 'topicCards':
    case 'topicBand':
    case 'categoryCards':
    case 'qualifications':
    case 'processTextColumns':
    case 'processCards':
    case 'appointmentBooking':
    case 'serviceInfo':
    case 'teaserList':
      return renderCoreCards(section, 'Details.');
    case 'newsHighlightList':
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Aktuelles.')} className="surface">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
            {cmsV2Image(data.featuredImage) ? <img src={cmsV2Image(data.featuredImage)} alt="" className="w-full rounded-2xl object-cover aspect-[4/3]" loading="lazy" /> : null}
            <div className="space-y-4">
              {(Array.isArray(data.posts) ? data.posts : [])
                .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
                .map((item, i) => (
                  <article key={i} className="border border-line rounded-2xl bg-white p-5">
                    <p className="text-xs uppercase tracking-widest text-muted">{cmsV2Text(item.date)}</p>
                    <h3 className="font-display text-2xl mt-2">{cmsV2Text(item.title)}</h3>
                    <p className="mt-2 text-sm text-muted">{cmsV2Text(item.excerpt)}</p>
                    {cmsV2Text(item.href) ? <TLink to={cmsV2Text(item.href)} className="text-sm font-medium text-brand mt-3 inline-block">Weiterlesen</TLink> : null}
                  </article>
                ))}
            </div>
          </div>
        </Section>
      );
    case 'statsBand':
      return <NumbersBand variant={variant} content={sectionContent} source={page === 'about' ? 'about' : 'home'} />;
    case 'newsTeaser':
      return <NewsPreview templateVariant={variant as TemplateKey} content={sectionContent} eyebrow={sectionContent.branchText?.newsEyebrow || 'Aktuelles'} title={sectionContent.branchText?.newsTitle || 'News & Notizen.'} />;
    case 'highlightsBar': {
      const hlItems = cmsV2TextPairs(data.items);
      const effectiveItems = hlItems.length ? hlItems : (sectionContent.serviceHighlights ?? []);
      if (!effectiveItems.length) return null;
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Unsere Werte.')} subtitle={cmsV2Text(data.description)} className="surface">
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {effectiveItems.map((item, i) => (
              <article key={i} className="border border-line rounded-2xl p-7 bg-white">
                <h3 className="font-display text-2xl">{item.t}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p>
              </article>
            ))}
          </div>
        </Section>
      );
    }
    case 'steps':
    case 'directions':
      return renderCoreCards(section, section.type === 'directions' ? 'Anreise.' : 'Ablauf.');
    case 'faq': {
      const items = cmsV2FaqItems(data.items);
      return items.length ? <Section eyebrow={cmsV2Text(data.eyebrow) || 'FAQ'} title={splitTitle(cmsV2Text(data.headline) || 'H�ufige Fragen.')}><Accordion items={items} className="max-w-3xl" /></Section> : null;
    }
    case 'timeline':
    case 'team':
    case 'storyFacts':
    case 'contactDetails':
    case 'locations':
      return renderRestaurantV2SubpageSection(page === 'home' ? 'about' : page, section, sectionContent, style);
    case 'branchChips': {
      const chips = sectionContent.branchChips ?? [];
      return chips.length ? <Section spacing="md"><div className="flex flex-wrap gap-3 reveal-stagger">{chips.map((chip) => <span key={chip} className="rounded-full border border-line px-4 py-2 text-sm">{chip}</span>)}</div></Section> : null;
    }
    case 'certifications': {
      const certs = sectionContent.certifications ?? [];
      if (!certs.length) return null;
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Zertifizierungen.')} className="surface">
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {certs.map((cert, i) => (
              <article key={i} className="border border-line rounded-2xl p-7 bg-white">
                <h3 className="font-display text-2xl">{cert.t}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{cert.d}</p>
              </article>
            ))}
          </div>
        </Section>
      );
    }
    case 'medicalNotice': {
      const notice = sectionContent.medicalNotice;
      if (!notice?.online && !notice?.emergency) return null;
      return (
        <Section spacing="md">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            {notice.online && <p className="text-sm text-amber-800">{notice.online}</p>}
            {notice.emergency && <p className="text-sm text-amber-800 mt-2 font-medium">{notice.emergency}</p>}
          </div>
        </Section>
      );
    }
    case 'galleryStory': {
      const gs = sectionContent.galleryStory;
      if (!gs?.body) return null;
      return (
        <Section eyebrow={gs.eyebrow || cmsV2Text(data.eyebrow)} title={splitTitle(gs.title || cmsV2Text(data.headline) || 'Unsere Galerie.')}>
          <div className="prose-lite max-w-3xl reveal">
            {gs.body.split('\n\n').map((p, i) => <p key={i} className="text-lg text-muted leading-relaxed mb-4">{p}</p>)}
          </div>
        </Section>
      );
    }
    case 'galleryCategories': {
      const cats = sectionContent.galleryCategories ?? [];
      if (!cats.length) return null;
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Kategorien.')} className="surface">
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {cats.map((cat, i) => (
              <article key={i} className="border border-line rounded-2xl p-7 bg-white">
                <h3 className="font-display text-2xl">{cat.t}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{cat.d}</p>
              </article>
            ))}
          </div>
        </Section>
      );
    }
    case 'values': {
      const vals = sectionContent.values ?? [];
      if (!vals.length) return null;
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Unsere Werte.')} className="surface">
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {vals.map((val, i) => (
              <article key={i} className="border border-line rounded-2xl p-7 bg-white">
                <h3 className="font-display text-2xl">{val.t}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{val.d}</p>
              </article>
            ))}
          </div>
        </Section>
      );
    }
    case 'arrival': {
      const items = sectionContent.arrival ?? [];
      const hdr = sectionContent.arrivalSection;
      if (!items.length) return null;
      return (
        <Section eyebrow={hdr?.eyebrow || cmsV2Text(data.eyebrow)} title={splitTitle(hdr?.title || cmsV2Text(data.headline) || 'Anreise.')}>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {items.map((item, i) => (
              <article key={i} className="border border-line rounded-2xl p-7 bg-white">
                <h3 className="font-display text-2xl">{item.t}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p>
              </article>
            ))}
          </div>
        </Section>
      );
    }
    case 'cta':
    case 'ctaBand':
      return <CtaBand variant={variant} content={sectionContent} page={page === 'home' ? undefined : page} />;
    // ── New section types ──
    case 'trustStrip': {
      const items = cmsV2TextPairs(data.items);
      if (!items.length) return null;
      return (
        <section className="py-4 border-y border-line bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-sm text-muted whitespace-nowrap">
                <span className="text-brand font-semibold">{item.t}</span>
                {item.d && <span>{item.d}</span>}
              </span>
            ))}
          </div>
        </section>
      );
    }
    case 'videoEmbed': {
      const videoUrl = cmsV2Text(data.videoUrl);
      if (!videoUrl) return null;
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || '')}>
          {cmsV2Text(data.description) && <p className="text-lg text-muted max-w-2xl mb-8">{cmsV2Text(data.description)}</p>}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100">
            <iframe src={videoUrl} title={cmsV2Text(data.headline) || 'Video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" loading="lazy" />
          </div>
        </Section>
      );
    }
    case 'projectShowcase':
    case 'lookBook':
    case 'productLine':
    case 'serviceAreaMap':
    case 'amenitiesGrid':
    case 'experiencePackages':
    case 'caseStudyCards':
    case 'insuranceInfo':
    case 'responsePromise':
    case 'comparisonTable':
    case 'impactNumbers':
    case 'venueShowcase':
      return renderCoreCards(section, cmsV2Text(data.headline) || 'Details.');
    case 'reservationTeaser':
    case 'trialCta':
    case 'rsvpForm': {
      const headline = cmsV2Text(data.headline);
      const desc = cmsV2Text(data.description);
      const btnRec = data.button && typeof data.button === 'object' && !Array.isArray(data.button) ? data.button as UnknownRecord : undefined;
      const btnLabel = btnRec ? cmsV2Text(btnRec.label) : '';
      const btnHref = btnRec ? cmsV2Text(btnRec.href) : '';
      if (!headline && !desc) return null;
      return (
        <Section className="surface">
          <div className="max-w-2xl mx-auto text-center reveal">
            {cmsV2Text(data.eyebrow) && <p className="text-sm uppercase tracking-widest text-brand mb-3">{cmsV2Text(data.eyebrow)}</p>}
            {headline && <h2 className="font-display text-4xl md:text-5xl">{headline}</h2>}
            {desc && <p className="mt-4 text-lg text-muted">{desc}</p>}
            {btnLabel && <TLink to={btnHref || '#contact'} className="btn-primary mt-8 inline-block">{btnLabel}</TLink>}
          </div>
        </Section>
      );
    }
    case 'seasonalHighlight':
    case 'challengeSpotlight':
    case 'chefStory': {
      const headline = cmsV2Text(data.headline);
      const desc = cmsV2Text(data.description);
      const image = cmsV2Image(data.image);
      const btnRec2 = section.type !== 'chefStory' && data.button && typeof data.button === 'object' && !Array.isArray(data.button) ? data.button as UnknownRecord : undefined;
      const btnLabel2 = btnRec2 ? cmsV2Text(btnRec2.label) : '';
      const btnHref2 = btnRec2 ? cmsV2Text(btnRec2.href) : '';
      if (!headline && !desc && !image) return null;
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(headline || '')} className="surface">
          <div className={`grid ${image ? 'lg:grid-cols-2' : ''} gap-10 items-center reveal`}>
            <div>
              {desc && <p className="text-lg text-muted leading-relaxed">{desc}</p>}
              {btnLabel2 && <TLink to={btnHref2 || '#'} className="btn-primary mt-6 inline-block">{btnLabel2}</TLink>}
            </div>
            {image && <img src={image} alt={headline || ''} className="w-full rounded-2xl object-cover aspect-[4/3]" loading="lazy" />}
          </div>
        </Section>
      );
    }
    case 'badgeWall': {
      const items = cmsV2TextPairs(data.items);
      if (!items.length) return null;
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Auszeichnungen.')} className="surface">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 reveal-stagger">
            {items.map((item, i) => (
              <article key={i} className="border border-line rounded-2xl p-6 bg-white text-center">
                <h3 className="font-display text-xl">{item.t}</h3>
                {item.d && <p className="mt-2 text-sm text-muted">{item.d}</p>}
              </article>
            ))}
          </div>
        </Section>
      );
    }
    default:
      return null;
  }
}

function renderHotelV2HomeSection(section: ModularSectionV2, content: SiteContent, style: TemplateStyle): JSX.Element | null {
  const sectionContent = cmsV2HotelSectionContent(content, section, style);
  switch (section.type) {
    case 'actionBar':
      return <BranchActionStrip variant="hotel" content={sectionContent} />;
    case 'marqueeBand':
    case 'testimonialMarquee': {
      const words = sectionContent.branchText?.marqueeWords ?? [];
      return words.length ? (
        <section className="py-6 border-y border-line bg-white overflow-hidden">
          <MarqueeTrack speed={34}>
            {words.map((word) => (
              <span key={word} className="font-display text-3xl md:text-5xl text-brand/80">{word}</span>
            ))}
          </MarqueeTrack>
        </section>
      ) : null;
    }
    case 'featuredAreas':
    case 'roomSelection':
      return sectionContent.rooms?.length ? <RoomShowcaseModule content={sectionContent} itemLinkPrefix="/zimmer" /> : null;
    case 'storyTeaser':
      return sectionContent.about?.body ? (
        <Section
          eyebrow={effectiveBranchText('hotel', sectionContent).aboutTeaserEyebrow}
          title={<>{splitTitle(sectionContent.about.title || 'Geschichte')}</>}
          spacing="lg"
        >
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <ParallaxImage src={sectionContent.about.imageUrl || sectionContent.gallery[0]} alt={sectionContent.brand.name} className="rounded-3xl aspect-[4/5] reveal" />
            </div>
            <div className="lg:col-span-7 lg:pt-12">
              <div className="prose-lite reveal">
                {(sectionContent.about.body || '').split('\n\n').map((p, i) => (
                  <p key={i} className="text-lg md:text-xl leading-relaxed text-muted mb-6">{p}</p>
                ))}
              </div>
              <TLink to={effectiveBranchText('hotel', sectionContent).learnMoreHref || '/ueber-uns'} className="btn-outline mt-6 reveal">{effectiveBranchText('hotel', sectionContent).learnMoreLabel} <span aria-hidden>?</span></TLink>
            </div>
          </div>
        </Section>
      ) : null;
    case 'galleryPreview': {
      const images = sectionContent.gallery.slice(0, 8);
      return images.length ? (
        <Section eyebrow={effectiveBranchText('hotel', sectionContent).galleryTeaserEyebrow} title={galleryTeaserTitle('hotel', sectionContent)} spacing="lg">
          <GalleryShowcase variant="hotel" images={images} mode="teaser" />
        </Section>
      ) : null;
    }
    case 'brandLogos': {
      const labels = sectionContent.logos ?? [];
      return labels.length ? (
        <section className="py-14 border-y border-line">
          <div className="container-x flex flex-wrap items-center justify-between gap-y-6 gap-x-10 opacity-70">
            {labels.map((entry) =>
              logoBandEntryIsImageUrl(entry) ? (
                <img key={entry} src={entry} alt="" className="h-9 md:h-11 w-auto max-w-[140px] object-contain mix-blend-multiply" loading="lazy" />
              ) : (
                <span key={entry} className="font-display text-2xl tracking-wide">{entry}</span>
              ),
            )}
          </div>
        </section>
      ) : null;
    }
    case 'testimonials':
      return visibleTestimonials(sectionContent).length ? (
        <Section eyebrow={effectiveBranchText('hotel', sectionContent).testimonialsEyebrow} title={splitTitle(effectiveBranchText('hotel', sectionContent).testimonialsTitle)} className="surface">
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {visibleTestimonials(sectionContent).slice(0, 3).map((t, i) => (
              <blockquote key={i} className="bg-white border border-line rounded-3xl p-8 hover-lift">
                <span className="font-display text-7xl text-[var(--accent-color)] block leading-none mb-2">&ldquo;</span>
                <p className="text-lg leading-relaxed">{t.text}</p>
                <footer className="mt-6 pt-5 border-t border-line text-sm font-medium">{t.author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null;
    case 'statsBand':
      return <NumbersBand variant="hotel" content={sectionContent} />;
    case 'newsTeaser':
      return <NewsPreview templateVariant="hotel" content={sectionContent} eyebrow={sectionContent.branchText?.newsEyebrow || 'Aktuelles'} title={sectionContent.branchText?.newsTitle || 'News & Notizen.'} />;
    case 'cta':
    case 'ctaBand':
      return <CtaBand variant="hotel" content={sectionContent} />;
    default:
      return null;
  }
}

function renderHotelV2SubpageSection(page: RestaurantV2SubpageKey, section: ModularSectionV2, content: SiteContent, style: TemplateStyle): JSX.Element | null {
  const data = asUnknownRecord(section.data);
  const sectionContent = cmsV2HotelSectionContent(cmsV2RestaurantSubpageContent(content, section, page), section, style);
  switch (section.type) {
    case 'highlightsBar': {
      const items = cmsV2TextPairs(data.items);
      return items.length ? (
        <Section spacing="md" className="surface">
          <div className="grid md:grid-cols-3 gap-4 reveal-stagger">
            {items.map((item, i) => <article key={i} className="bg-white border border-line rounded-2xl p-6"><h3 className="font-display text-2xl">{item.t}</h3><p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p></article>)}
          </div>
        </Section>
      ) : null;
    }
    case 'accommodationsGrid':
    case 'accommodationList':
    case 'roomCards':
      return sectionContent.rooms?.length ? <RoomShowcaseModule content={sectionContent} itemLinkPrefix="/zimmer" /> : null;
    case 'steps': {
      const items = cmsV2TextPairs(data.items);
      return items.length ? (
        <Section eyebrow={cmsV2Text(data.eyebrow) || 'Ablauf'} title={splitTitle(cmsV2Text(data.headline) || 'So l�uft es ab.')}>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {items.map((item, i) => <article key={i} className="border border-line rounded-2xl p-7 bg-white"><p className="font-mono text-xs uppercase tracking-widest text-muted">{String(i + 1).padStart(2, '0')}</p><h3 className="font-display text-2xl mt-4">{item.t}</h3><p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p></article>)}
          </div>
        </Section>
      ) : null;
    }
    case 'faq': {
      const items = cmsV2FaqItems(data.items);
      return items.length ? <Section eyebrow={cmsV2Text(data.eyebrow) || 'FAQ'} title={splitTitle(cmsV2Text(data.headline) || 'H�ufige Fragen.')}><Accordion items={items} className="max-w-3xl" /></Section> : null;
    }
    case 'teaserList': {
      const items = cmsV2TextPairs(data.items);
      return items.length ? (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || cmsV2Text(data.title))} subtitle={cmsV2Text(data.intro) || cmsV2Text(data.description)} className={style === 'modern' ? 'surface' : ''}>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {items.map((item, i) => <article key={i} className="border border-line rounded-2xl p-7 bg-white"><h3 className="font-display text-2xl">{item.t}</h3><p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p></article>)}
          </div>
        </Section>
      ) : null;
    }
    case 'gallery': {
      const images = Array.isArray(data.images) ? data.images.map((item) => cmsV2Image(item)).filter(Boolean) : [];
      return images.length ? <Section spacing="lg">{style === 'bold' ? <MasonryGrid images={images} /> : style === 'modern' ? <ModernGalleryGrid images={images} /> : <GalleryShowcase variant="hotel" images={images} mode="full" />}</Section> : null;
    }
    case 'timeline': {
      const items = Array.isArray(data.items)
        ? data.items.filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item)).map((item) => ({ year: cmsV2Text(item.year) || cmsV2Text(item.date), title: cmsV2Text(item.title) || cmsV2Text(item.t), description: cmsV2Text(item.description) || cmsV2Text(item.d) })).filter((item) => item.year || item.title || item.description)
        : [];
      return items.length ? <Timeline content={{ ...content, timeline: items } as SiteContent} eyebrow={cmsV2Text(data.eyebrow) || 'Geschichte'} title={splitTitle(cmsV2Text(data.headline) || 'Unser Weg.')} /> : null;
    }
    case 'team': {
      const items = Array.isArray(data.items) ? data.items.filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item)) : [];
      return items.length ? (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Gastgeber.')}>
          <div className="grid md:grid-cols-3 gap-6 reveal-stagger">
            {items.map((item, i) => <article key={i} className="bg-white border border-line rounded-2xl overflow-hidden">{cmsV2Image(item.image) ? <img src={cmsV2Image(item.image)} alt={cmsV2Text(item.name)} className="aspect-[4/3] w-full object-cover" loading="lazy" /> : null}<div className="p-6"><h3 className="font-display text-2xl">{cmsV2Text(item.name) || cmsV2Text(item.title)}</h3><p className="mt-1 text-sm text-muted">{cmsV2Text(item.role)}</p><p className="mt-4 text-sm leading-relaxed text-muted">{cmsV2Text(item.description) || cmsV2Text(item.bio)}</p></div></article>)}
          </div>
        </Section>
      ) : null;
    }
    case 'storyFacts': {
      const items = cmsV2TextPairs(data.items);
      return <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Unsere Geschichte.')} subtitle={cmsV2Text(data.description)}>{items.length ? <div className="grid md:grid-cols-3 gap-5 reveal-stagger">{items.map((item, i) => <article key={i} className="border border-line rounded-2xl p-6 bg-white"><h3 className="font-display text-2xl">{item.t}</h3><p className="mt-3 text-sm text-muted">{item.d}</p></article>)}</div> : null}</Section>;
    }
    case 'statsBand':
      return <NumbersBand variant="hotel" content={sectionContent} source={page === 'about' ? 'about' : 'home'} />;
    case 'testimonials':
      return renderHotelV2HomeSection(section, content, style);
    case 'contactDetails':
      return <Section eyebrow={cmsV2Text(data.eyebrow) || 'Kontakt'} title={splitTitle(cmsV2Text(data.headline) || 'Wir freuen uns auf Ihre Nachricht.')} subtitle={cmsV2Text(data.subline)}><ContactBlock content={sectionContent} showForm /></Section>;
    case 'locations': {
      const locations = Array.isArray(data.locations) ? data.locations.filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item)) : [];
      return locations.length ? <Section eyebrow="Standorte" title={splitTitle('Hier finden Sie uns.')}><div className="grid md:grid-cols-2 gap-5 reveal-stagger">{locations.map((loc, i) => <article key={i} className="bg-white border border-line rounded-2xl p-6"><h3 className="font-display text-2xl">{cmsV2Text(loc.name)}</h3><p className="mt-3 text-sm text-muted whitespace-pre-line">{[cmsV2Text(loc.address), cmsV2Text(loc.city), cmsV2Text(loc.phone)].filter(Boolean).join('\n')}</p>{cmsV2Text(loc.mapsUrl) ? <SafeMapEmbed mapsUrl={cmsV2Text(loc.mapsUrl)} address={cmsV2Text(loc.address)} city={cmsV2Text(loc.city)} className="h-[200px] mt-5" /> : null}</article>)}</div></Section> : null;
    }
    case 'directions': {
      const items = cmsV2TextPairs(data.items);
      return items.length ? <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Anreise.')} subtitle={cmsV2Text(data.subline)}><div className="grid md:grid-cols-3 gap-5 reveal-stagger">{items.map((item, i) => <article key={i} className="bg-white border border-line rounded-2xl p-6"><h3 className="font-display text-2xl">{item.t}</h3><p className="mt-3 text-sm text-muted">{item.d}</p></article>)}</div></Section> : null;
    }
    case 'cta':
    case 'ctaBand':
      return <CtaBand variant="hotel" content={sectionContent} page={page} />;
    default:
      return renderHotelV2HomeSection(section, content, style);
  }
}

function restaurantV2SubpageSections(content: SiteContent, page: RestaurantV2SubpageKey): ModularSectionV2[] {
  return visibleCmsV2Sections(content.modularPagesV2?.[page]?.sections);
}

function visibleCmsV2Sections(sections: readonly ModularSectionV2[] | undefined): ModularSectionV2[] {
  return sections?.filter((section) => section.visible !== false && section.type !== 'noticeBanner') ?? [];
}

function cmsV2RestaurantSubpageContent(content: SiteContent, section: ModularSectionV2, page: RestaurantV2SubpageKey): SiteContent {
  const data = asUnknownRecord(section.data);
  switch (section.type) {
    case 'hero': {
      const image = cmsV2Image(data.backgroundImage) || cmsV2Image(data.image);
      const headerKey =
        page === 'services' ? 'servicesHeader'
          : page === 'gallery' ? 'galleryHeader'
            : page === 'about' ? 'aboutHeader'
              : 'contactPageHeader';
      return {
        ...content,
        [headerKey]: {
          eyebrow: cmsV2Text(data.eyebrow),
          title: cmsV2Text(data.headline),
          subtitle: cmsV2Text(data.subline) || cmsV2Text(data.description),
        },
        branchText: {
          ...content.branchText,
          ...(page === 'services' && image ? { servicesPageImageUrl: image } : {}),
        },
      } as SiteContent;
    }
    case 'menu': {
      const categories = Array.isArray(data.categories)
        ? data.categories
            .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
            .map((category) => ({
              category: cmsV2Text(category.category) || cmsV2Text(category.title),
              description: cmsV2Text(category.description),
              priceLabel: cmsV2Text(category.priceLabel),
              items: Array.isArray(category.items)
                ? category.items
                    .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
                    .map((item) => ({
                      name: cmsV2Text(item.name) || cmsV2Text(item.title),
                      description: cmsV2Text(item.description),
                      price: cmsV2Text(item.price),
                      allergens: cmsV2Text(item.allergens),
                      tags: Array.isArray(item.tags) ? item.tags.map(cmsV2Text).filter(Boolean) : [],
                      imageUrl: cmsV2Image(item.image) || cmsV2Text(item.imageUrl),
                      detailSlug: cmsV2Text(item.detailSlug),
                      detailPublished: cmsV2Boolean(item.detailPublished, true),
                      detailSubtitle: cmsV2Text(item.detailSubtitle),
                      detailBody: cmsV2Text(item.detailBody),
                      detailBodyHtml: cmsV2Text(item.detailBodyHtml),
                      detailGallery: Array.isArray(item.detailGallery) ? item.detailGallery.map(cmsV2Text).filter(Boolean) : [],
                    }))
                : [],
            }))
            .filter((category) => category.category || category.items.length)
        : [];
      return {
        ...content,
        menu: categories,
        moduleHeadings: {
          ...content.moduleHeadings,
          menu: {
            eyebrow: cmsV2Text(data.eyebrow),
            titleA: cmsV2Text(data.titleA),
            titleB: cmsV2Text(data.titleB),
            subtitle: cmsV2Text(data.subtitle),
          },
        },
      };
    }
    case 'highlightsBar':
      return {
        ...content,
        serviceHighlights: cmsV2TextPairs(data.items),
      };
    case 'steps':
      return {
        ...content,
        serviceProcess: cmsV2TextPairs(data.items),
      };
    case 'faq':
      return {
        ...content,
        faq: cmsV2FaqItems(data.items),
      };
    case 'statsBand':
      return cmsV2RestaurantSectionContent(content, section, 'classic');
    case 'testimonials':
      return cmsV2RestaurantSectionContent(content, section, 'classic');
    case 'contactDetails':
      return cmsV2ContactContent(content, data);
    case 'cta':
    case 'ctaBand': {
      const patched = cmsV2RestaurantSectionContent(content, section, 'classic');
      return {
        ...patched,
        ctaBandOverrides: {
          ...patched.ctaBandOverrides,
          [page]: patched.ctaBandOverride,
        },
      };
    }
    default:
      return content;
  }
}

function RestaurantV2Subpage({ page, content, style }: { page: RestaurantV2SubpageKey; content: SiteContent; style: TemplateStyle }) {
  const sections = restaurantV2SubpageSections(content, page);
  const heroSection = sections.find((section) => section.type === 'hero');
  const heroData = heroSection ? asUnknownRecord(heroSection.data) : {};
  const heroContent = heroSection ? cmsV2RestaurantSubpageContent(content, heroSection, page) : content;
  const fallback = NAV_BY_VARIANT.restaurant;
  const headerKey: 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader' =
    page === 'services' ? 'servicesHeader'
      : page === 'gallery' ? 'galleryHeader'
        : page === 'about' ? 'aboutHeader'
          : 'contactPageHeader';
  const header = pageHeaderOverride(heroContent, headerKey);
  const defaultTitle =
    page === 'services' ? fallback.servicesHeadline
      : page === 'gallery' ? 'Ein Blick ins Haus.'
        : page === 'about' ? 'Was uns ausmacht.'
          : 'Reservieren & anfragen.';
  const defaultEyebrow =
    page === 'services' ? fallback.servicesEyebrow
      : page === 'gallery' ? 'Galerie'
        : page === 'about' ? '�ber uns'
          : 'Kontakt';

  return (
    <>
      <PageHero
        eyebrow={header?.eyebrow || defaultEyebrow}
        title={header?.title || defaultTitle}
        subtitle={header?.subtitle || ''}
        body={cmsV2Text(heroData.description)}
        style={style}
        image={cmsV2Image(heroData.backgroundImage) || cmsV2Image(heroData.image) || (page === 'services' ? effectiveBranchText('restaurant', heroContent).servicesPageImageUrl : undefined)}
        page={page}
        heroStyle={header?.heroStyle}
      />
      {sections
        .filter((section) => section.type !== 'hero')
        .map((section) => (
          <React.Fragment key={section.id}>{renderRestaurantV2SubpageSection(page, section, content, style)}</React.Fragment>
        ))}
    </>
  );
}

function renderRestaurantV2SubpageSection(page: RestaurantV2SubpageKey, section: ModularSectionV2, content: SiteContent, style: TemplateStyle): JSX.Element | null {
  const data = asUnknownRecord(section.data);
  const sectionContent = cmsV2RestaurantSubpageContent(content, section, page);
  switch (section.type) {
    case 'highlightsBar': {
      const items = cmsV2TextPairs(data.items);
      return items.length ? (
        <Section spacing="md" className="surface">
          <div className="grid md:grid-cols-3 gap-4 reveal-stagger">
            {items.map((item, i) => (
              <article key={i} className="bg-white border border-line rounded-2xl p-6">
                <h3 className="font-display text-2xl">{item.t}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null;
    }
    case 'menu':
      return <MenuCategoriesModule content={sectionContent} itemLinkPrefix="/speisekarte" />;
    case 'steps': {
      const items = cmsV2TextPairs(data.items);
      return items.length ? (
        <Section eyebrow={cmsV2Text(data.eyebrow) || 'Ablauf'} title={splitTitle(cmsV2Text(data.headline) || 'So l�uft es ab.')}>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {items.map((item, i) => (
              <article key={i} className="border border-line rounded-2xl p-7 bg-white">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-2xl mt-4">{item.t}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null;
    }
    case 'faq': {
      const items = cmsV2FaqItems(data.items);
      return items.length ? (
        <Section eyebrow={cmsV2Text(data.eyebrow) || 'FAQ'} title={splitTitle(cmsV2Text(data.headline) || 'H�ufige Fragen.')}>
          <Accordion items={items} className="max-w-3xl" />
        </Section>
      ) : null;
    }
    case 'teaserList': {
      const items = cmsV2TextPairs(data.items);
      return items.length ? (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || cmsV2Text(data.title))} subtitle={cmsV2Text(data.intro) || cmsV2Text(data.description)} className={style === 'modern' ? 'surface' : ''}>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {items.map((item, i) => (
              <article key={i} className="border border-line rounded-2xl p-7 bg-white">
                <h3 className="font-display text-2xl">{item.t}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null;
    }
    case 'gallery': {
      const images = Array.isArray(data.images) ? data.images.map((item) => cmsV2Image(item)).filter(Boolean) : [];
      return images.length ? (
        <Section spacing="lg">
          {style === 'bold' ? <MasonryGrid images={images} /> : style === 'modern' ? <ModernGalleryGrid images={images} /> : <GalleryShowcase variant="restaurant" images={images} mode="full" />}
        </Section>
      ) : null;
    }
    case 'timeline': {
      const items = Array.isArray(data.items)
        ? data.items
            .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
            .map((item) => ({
              year: cmsV2Text(item.year) || cmsV2Text(item.date),
              title: cmsV2Text(item.title) || cmsV2Text(item.t),
              description: cmsV2Text(item.description) || cmsV2Text(item.d),
            }))
            .filter((item) => item.year || item.title || item.description)
        : [];
      return items.length ? <Timeline content={{ ...content, timeline: items } as SiteContent} eyebrow={cmsV2Text(data.eyebrow) || 'Geschichte'} title={splitTitle(cmsV2Text(data.headline) || 'Unser Weg.')} /> : null;
    }
    case 'team': {
      const items = Array.isArray(data.items)
        ? data.items.filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
        : [];
      return items.length ? (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Unser Team.')}>
          <div className="grid md:grid-cols-3 gap-6 reveal-stagger">
            {items.map((item, i) => (
              <article key={i} className="bg-white border border-line rounded-2xl overflow-hidden">
                {cmsV2Image(item.image) ? <img src={cmsV2Image(item.image)} alt={cmsV2Text(item.name)} className="aspect-[4/3] w-full object-cover" loading="lazy" /> : null}
                <div className="p-6">
                  <h3 className="font-display text-2xl">{cmsV2Text(item.name) || cmsV2Text(item.title)}</h3>
                  <p className="mt-1 text-sm text-muted">{cmsV2Text(item.role)}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{cmsV2Text(item.description) || cmsV2Text(item.bio)}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null;
    }
    case 'storyFacts': {
      const items = cmsV2TextPairs(data.items);
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Unsere Geschichte.')} subtitle={cmsV2Text(data.description)}>
          {items.length ? (
            <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
              {items.map((item, i) => <article key={i} className="border border-line rounded-2xl p-6 bg-white"><h3 className="font-display text-2xl">{item.t}</h3><p className="mt-3 text-sm text-muted">{item.d}</p></article>)}
            </div>
          ) : null}
        </Section>
      );
    }
    case 'expertQuotes': {
      const items = cmsV2TextPairs(data.items);
      return items.length ? (
        <Section className="surface">
          <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
            {items.map((item, i) => <blockquote key={i} className="bg-white border border-line rounded-2xl p-7"><p className="text-lg leading-relaxed">{item.d || item.t}</p>{item.d ? <footer className="mt-5 text-sm font-medium">{item.t}</footer> : null}</blockquote>)}
          </div>
        </Section>
      ) : null;
    }
    case 'statsBand':
      return <NumbersBand variant="restaurant" content={sectionContent} source={page === 'about' ? 'about' : 'home'} />;
    case 'testimonials':
      return renderRestaurantV2HomeSection(section, content, style);
    case 'contactDetails':
      return (
        <Section eyebrow={cmsV2Text(data.eyebrow) || 'Kontakt'} title={splitTitle(cmsV2Text(data.headline) || 'Wir freuen uns auf Ihre Nachricht.')} subtitle={cmsV2Text(data.subline)}>
          <ContactBlock content={sectionContent} showForm />
        </Section>
      );
    case 'locations': {
      const locations = Array.isArray(data.locations)
        ? data.locations.filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
        : [];
      return locations.length ? (
        <Section eyebrow="Standorte" title={splitTitle('Hier finden Sie uns.')}>
          <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
            {locations.map((loc, i) => (
              <article key={i} className="bg-white border border-line rounded-2xl p-6">
                <h3 className="font-display text-2xl">{cmsV2Text(loc.name)}</h3>
                <p className="mt-3 text-sm text-muted whitespace-pre-line">{[cmsV2Text(loc.address), cmsV2Text(loc.city), cmsV2Text(loc.phone)].filter(Boolean).join('\n')}</p>
                {cmsV2Text(loc.mapsUrl) ? <SafeMapEmbed mapsUrl={cmsV2Text(loc.mapsUrl)} address={cmsV2Text(loc.address)} city={cmsV2Text(loc.city)} className="h-[200px] mt-5" /> : null}
              </article>
            ))}
          </div>
        </Section>
      ) : null;
    }
    case 'directions': {
      const items = cmsV2TextPairs(data.items);
      return items.length ? (
        <Section eyebrow={cmsV2Text(data.eyebrow)} title={splitTitle(cmsV2Text(data.headline) || 'Anreise.')} subtitle={cmsV2Text(data.subline)}>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {items.map((item, i) => <article key={i} className="bg-white border border-line rounded-2xl p-6"><h3 className="font-display text-2xl">{item.t}</h3><p className="mt-3 text-sm text-muted">{item.d}</p></article>)}
          </div>
        </Section>
      ) : null;
    }
    case 'cta':
    case 'ctaBand':
      return <CtaBand variant="restaurant" content={sectionContent} page={page} />;
    default:
      return renderRestaurantV2HomeSection(section, content, style);
  }
}

function visibleTestimonials(content: SiteContent) {
  return meaningfulTestimonials(content.testimonials);
}

function catalogDetailHref(variant: TemplateVariant, slug: string): string {
  return `${getBranchConfig(variant).paths.services}/${slug.trim()}`;
}

/** Classic: editorial cards with Roman-numeral counters and italic drop-caps
 *  for a magazine feel (skill #66 Editorial Grid).
 */
const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
export function ClassicServicesGrid({ services, variant }: { services: SiteContent['services']; variant: TemplateVariant }) {
  return (
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-14 reveal-stagger">
      {services.map((s, i) => {
        const slug = (s.detailSlug ?? '').trim();
        const linked = !!(slug && s.detailPublished !== false);
        const h = (
          <h3 className="font-display text-3xl md:text-4xl leading-tight">{s.title}</h3>
        );
        return (
          <article key={i} className="border-t border-line pt-8 group">
            {s.imageUrl ? (
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6">
                {linked ? (
                  <TLink to={catalogDetailHref(variant, slug)} className="block h-full">
                    <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  </TLink>
                ) : (
                  <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
            ) : null}
            <div className="flex items-baseline justify-between mb-5">
              <span className="font-display italic text-3xl text-[var(--accent-color)]">
                {ROMAN_NUMERALS[i] || String(i + 1)}
              </span>
              {s.price && <span className="font-mono text-xs text-muted">{s.price}</span>}
            </div>
            {linked ? <TLink to={catalogDetailHref(variant, slug)} className="text-inherit no-underline hover:underline">{h}</TLink> : h}
            {s.description && (
              <p className="mt-4 text-base text-muted leading-relaxed first-letter:font-display first-letter:italic first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-[var(--accent-color)]">
                {s.description}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

/* --- Reusable gallery grids --------------------------------------- */
function ModernGalleryGrid({ images }: { images: string[] }) {
  return <MasonryLightbox images={images} />;
}

function MasonryGrid({ images }: { images: string[] }) {
  return <MasonryLightbox images={images} />;
}

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

/* Branch-specific action strip � sits right under Hero to make each branch feel different. */
/**
 * Default texts for the action strip � one set per branch.
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
  if (variant === 'restaurant') return { tone: 'light', eyebrow: 'Heute ge�ffnet', hint: '', primaryLabel: 'Tisch reservieren', primaryHref: 'tel:', secondaryLabel: 'Speisekarte ansehen', secondaryHref: '/speisekarte' };
  if (variant === 'hotel') return { tone: 'light', eyebrow: 'Direkt-Anfrage', hint: 'Pers�nliche Beratung � Antwort innerhalb eines Werktages', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Zimmer anfragen ?', secondaryHref: '/kontakt' };
  if (variant === 'tradesman') return { tone: 'dark', eyebrow: '24/7 Notdienst verf�gbar', hint: 'Wir kommen schnell � versprochen.', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Anfrage senden', secondaryHref: '/kontakt' };
  if (variant === 'salon') return { tone: 'light', eyebrow: 'Termine online', hint: 'Frei w�hlbar � Stornierung kostenlos bis 24 h vorher', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Termin buchen ?', secondaryHref: '/kontakt' };
  if (variant === 'tourism') return { tone: 'dark', eyebrow: 'N�chste Tour', hint: '', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Tour buchen ?', secondaryHref: '/touren' };
  return { tone: 'light', eyebrow: 'Jetzt Kontakt aufnehmen', hint: 'Wir freuen uns auf Ihre Nachricht.', primaryLabel: '', primaryHref: 'tel:', secondaryLabel: 'Anfrage senden', secondaryHref: '/kontakt' };
}

function ActionStripLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const basePath = useBasePath();
  if (href.startsWith('#') || isExternalNavHref(href)) {
    return <a href={href} className={className}>{children}</a>;
  }
  return <a href={withBase(basePath, href)} className={className}>{children}</a>;
}

function BranchActionStrip({ variant, content }: { variant: TemplateVariant; content: SiteContent }) {
  const phone = content.contact.phone || '';
  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '#';
  const def = defaultHomeStrip(variant);
  const rawStrip = ((content as any).homeStrip || {}) as Record<string, unknown>;
  const auto = rawStrip.eyebrowAuto !== false;
  // When auto-eyebrow is on, ignore any saved manual `eyebrow` so old copy cannot "win"
  // over the live Heute-ge�ffnet/geschlossen line when hours parsing is partial.
  const stripForMerge = Object.fromEntries(
    Object.entries(rawStrip).filter(([key]) => !auto || key !== 'eyebrow'),
  );
  // Strip empty-string overrides so the per-variant default keeps winning.
  const overlay = Object.fromEntries(
    Object.entries(stripForMerge).filter(([, val]) => (typeof val === 'string' ? val.trim() !== '' : val != null)),
  );
  const cfg = { ...def, ...overlay } as ReturnType<typeof defaultHomeStrip> & { eyebrowAuto?: boolean; hintVisible?: boolean };

  // When hintVisible is explicitly false, suppress the hint text.
  if (cfg.hintVisible === false) cfg.hint = '';

  // Auto-eyebrow: when enabled (default), derive from contact.hours only � not from stale manual text.
  let liveEyebrow: string | null = null;
  let liveIsOpen = false;
  if (auto) {
    try {
      const rows = content.contact?.hours;
      const status = getOpenStatus(rows);
      const slot = status.todayFull ?? status.todayLabel;
      if (slot) {
        liveEyebrow = status.isOpen
          ? `Heute ge�ffnet � ${slot}`
          : 'Heute geschlossen';
        liveIsOpen = status.isOpen;
      } else if (rows?.length && parseHours(rows).length > 0) {
        // Parsed week has slots but none for today (e.g. Ruhetag) � still show closed, not old manual eyebrow.
        liveEyebrow = 'Heute geschlossen';
        liveIsOpen = false;
      }
    } catch { /* ignore � fall back to template default eyebrow */ }
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
  const primaryHref = resolveHref(cfg.primaryHref || '#');
  const secondaryHref = resolveHref(cfg.secondaryHref || '#');

  // Restaurant special: also surface today's opening hours alongside eyebrow.
  // Skip when the auto-eyebrow already shows today's hours.
  let todayInfo: React.ReactNode = null;
  if (variant === 'restaurant' && !liveEyebrow) {
    const today = new Date().toLocaleDateString('de-DE', { weekday: 'long' });
    const todayRow = (content.contact.hours || []).find((h) => h.day.toLowerCase().includes(today.toLowerCase().slice(0, 2)));
    if (todayRow) todayInfo = <span className="text-muted">{todayRow.day} � <span className="font-medium text-brand">{todayRow.time}</span></span>;
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
            <ActionStripLink href={primaryHref} className="btn-outline !py-2 !px-4 !text-xs">{cfg.primaryLabel}</ActionStripLink>
          )}
          {cfg.secondaryLabel && (
            <ActionStripLink href={secondaryHref} className={cfg.tone === 'dark' ? 'btn-accent !py-2 !px-4 !text-xs' : 'btn-primary !py-2 !px-4 !text-xs'}>
              {cfg.secondaryLabel}
            </ActionStripLink>
          )}
        </span>
      </div>
    </section>
  );
}

function NumbersBand({
  variant,
  content,
  source = 'home',
}: {
  variant: TemplateVariant;
  content?: SiteContent;
  /** `about` reads only `aboutNumbers` (�ber-uns-Eckdaten), never home `numbers`. */
  source?: 'home' | 'about';
}) {
  const defaults: Record<TemplateVariant, { v: number; s?: string; l: string }[]> = {
    restaurant: [
      { v: 1998, l: 'Familienbetrieb seit' },
      { v: 64, l: 'Pl�tze drinnen' },
      { v: 4, s: ',9', l: 'Sterne �' },
      { v: 28, l: 'Weine offen' },
    ],
    salon: [
      { v: 6, l: 'Stylist:innen' },
      { v: 12, l: 'Treatments' },
      { v: 4, s: ',9', l: 'Sterne �' },
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
      { v: 4, s: ',9', l: 'Sterne �' },
      { v: 600, s: ' m�', l: 'Spa-Fl�che' },
    ],
    tourism: [
      { v: 14, l: 'Lizenzierte Guides' },
      { v: 180, s: '+', l: 'Touren pro Jahr' },
      { v: 12, l: 'Max. pro Gruppe' },
      { v: 4, s: ',9', l: 'Sterne �' },
    ],
  };
  const overlay =
    source === 'about'
      ? content && ((content as any).aboutNumbers as { value: string; label: string }[] | undefined)
      : content && ((content as any).numbers as { value: string; label: string }[] | undefined);
  const mapped =
    overlay && overlay.length
      ? overlay
          .filter((n) => n && String(n.label ?? '').trim() && String(n.value ?? '').trim())
          .map((n) => ({ ...parseNumberValue(n.value), l: n.label }))
      : [];
  if (source === 'about' && !mapped.length) return null;
  const stats: { v: number; s?: string; l: string; raw?: boolean }[] = mapped.length ? mapped : defaults[variant];
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

function CtaBand({ variant, content, page }: { variant: TemplateVariant; content?: SiteContent; page?: string }) {
  const text: Record<TemplateVariant, { lead: string; cta: string; sub: string }> = {
    restaurant: { lead: 'Hunger?', cta: 'Tisch reservieren', sub: 'Wir freuen uns, Sie an unserem Tisch begr��en zu d�rfen.' },
    salon: { lead: 'Bereit f�r etwas Neues?', cta: 'Termin buchen', sub: 'Wir nehmen uns die Zeit � f�r Sie, f�r Ihren Look.' },
    tradesman: { lead: 'Etwas tropft?', cta: 'Jetzt anfragen', sub: 'Wir melden uns innerhalb von 24 Stunden mit einem Festpreis-Angebot.' },
    hotel: { lead: 'Pause buchen?', cta: 'Zimmer anfragen', sub: 'Wir antworten pers�nlich � ohne Formularkette, mit allen Optionen f�r Ihren Aufenthalt.' },
    tourism: { lead: 'Auf in die Berge?', cta: 'Tour buchen', sub: 'Wir beraten ehrlich, welche Tour zu Ihrer Gruppe und Saison passt.' },
  };
  const def = text[variant];
  // Per-page override wins, then global ctaBandOverride as fallback
  const perPage = page ? ((content as any)?.ctaBandOverrides ?? {})[page] as { lead?: string; sub?: string; cta?: string; ctaHref?: string; eyebrow?: string; leadAccent?: string } | undefined : undefined;
  const global = (content as any)?.ctaBandOverride as { lead?: string; sub?: string; cta?: string; ctaHref?: string; eyebrow?: string; leadAccent?: string } | undefined;
  const pick = (field: 'lead' | 'sub' | 'cta' | 'ctaHref' | 'eyebrow' | 'leadAccent') =>
    (perPage?.[field] && perPage[field]!.trim()) || (global?.[field] && global[field]!.trim()) || '';
  // leadAccent is classic-only. On subpages, only show if it's explicitly set
  // for this page � don't inherit the home value (which may be unrelated).
  const resolvedLeadAccent = page
    ? (perPage?.leadAccent && perPage.leadAccent.trim()) || ''
    : (global?.leadAccent && global.leadAccent.trim()) || '';
  const t = {
    eyebrow: pick('eyebrow') || 'Bereit?',
    lead: pick('lead') || def.lead,
    leadAccent: resolvedLeadAccent,
    sub: pick('sub') || def.sub,
    cta: pick('cta') || def.cta,
    ctaHref: pick('ctaHref') || '/kontakt',
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
          <TLink to={t.ctaHref} className="btn-primary">{t.cta} <span aria-hidden>?</span></TLink>
        </div>
      </div>
    </section>
  );
}

/* --- Services / Speisekarte / Leistungen -------------------------- */
function ServicesPage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  if (variant === 'hotel') return <HotelV2Subpage page="services" content={content} style={style} />;
  if (variant === 'restaurant') return <RestaurantV2Subpage page="services" content={content} style={style} />;
  return <CoreV2Subpage page="services" variant={variant} content={content} style={style} />;
}

function GalleryPage({
  content, variant, style,
}: { content: SiteContent; variant: TemplateVariant; title?: string; eyebrow?: string; style: TemplateStyle }) {
  if (variant === 'hotel') return <HotelV2Subpage page="gallery" content={content} style={style} />;
  if (variant === 'restaurant') return <RestaurantV2Subpage page="gallery" content={content} style={style} />;
  return <CoreV2Subpage page="gallery" variant={variant} content={content} style={style} />;
}

function AboutPage({ variant, content, style }: { variant: TemplateVariant; content: SiteContent; style: TemplateStyle }) {
  if (variant === 'hotel') return <HotelV2Subpage page="about" content={content} style={style} />;
  if (variant === 'restaurant') return <RestaurantV2Subpage page="about" content={content} style={style} />;
  return <CoreV2Subpage page="about" variant={variant} content={content} style={style} />;
}

function ContactPage({ content, variant, style }: { content: SiteContent; variant: TemplateVariant; style: TemplateStyle }) {
  if (variant === 'hotel') return <HotelV2Subpage page="contact" content={content} style={style} />;
  if (variant === 'restaurant') return <RestaurantV2Subpage page="contact" content={content} style={style} />;
  return <CoreV2Subpage page="contact" variant={variant} content={content} style={style} />;
}

function PageHero({ eyebrow, title, subtitle, body, style = 'classic', image, page, heroStyle }: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  body?: string;
  style?: TemplateStyle;
  image?: string;
  page?: 'services' | 'gallery' | 'about' | 'contact';
  heroStyle?: string;
}) {
  // When heroStyle is set from CMS, use it instead of the page-based default.
  const effectivePage = heroStyle
    ? (heroStyle === 'accent-band' ? 'services'
      : heroStyle === 'image-backed' ? 'gallery'
      : heroStyle === 'split' ? 'about'
      : heroStyle === 'accent-line' ? 'contact'
      : heroStyle === 'bold-full' ? '_bold'
      : heroStyle === 'minimal' ? '_minimal'
      : page)
    : page;

  /* -- Services / accent-band --------------------------------------- */
  if (effectivePage === 'services') {
    return (
      <section className="pt-40 pb-14 md:pb-20 bg-brand text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="container-x relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 mb-5 reveal">{eyebrow}</p>
          <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]' : style === 'modern' ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.05]' : 'headline-xl max-w-5xl'}`}>{splitTitle(title)}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-white/70 reveal">{subtitle}</p>}
          {body && body !== subtitle && <p className="mt-4 text-base text-white/60 max-w-2xl reveal">{body}</p>}
        </div>
      </section>
    );
  }

  /* -- Gallery / image-backed hero ----------------------------------- */
  if (effectivePage === 'gallery' && image) {
    return (
      <section className="relative pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-25" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)] via-[var(--bg-color)]/70 to-[var(--bg-color)]" />
        </div>
        <div className="container-x relative z-10">
          <p className="eyebrow mb-5 reveal">{eyebrow}</p>
          <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]' : style === 'modern' ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.05]' : 'headline-xl max-w-5xl'}`}>{splitTitle(title)}</h1>
          {subtitle && <p className="mt-5 max-w-3xl text-lg md:text-xl text-muted reveal">{subtitle}</p>}
        </div>
      </section>
    );
  }

  /* -- About / split layout with image ------------------------------- */
  if (effectivePage === 'about' && image) {
    return (
      <section className="pt-40 pb-12 md:pb-16 surface">
        <div className="container-x grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h1 className={`reveal break-words [overflow-wrap:anywhere] ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9]' : style === 'modern' ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.05]' : 'headline-xl'}`}>{splitTitle(title)}</h1>
            {subtitle && <p className="mt-5 max-w-xl text-lg md:text-xl text-muted">{subtitle}</p>}
            {body && body !== subtitle && <p className="mt-4 text-base text-muted max-w-xl leading-relaxed">{body}</p>}
          </div>
          <div className="md:col-span-5 reveal">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-line">
              <img src={image} alt="" className="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* -- Contact / accent line -------------------------------------- */
  if (effectivePage === 'contact') {
    return (
      <section className="pt-40 pb-10 md:pb-14">
        <div className="container-x">
          <div className="w-12 h-1 rounded-full bg-[var(--accent-color)] mb-6 reveal" />
          <p className="eyebrow mb-5 reveal">{eyebrow}</p>
          <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9]' : style === 'modern' ? 'text-4xl sm:text-5xl md:text-6xl font-display tracking-tight leading-[1.05] max-w-3xl' : 'headline-xl max-w-3xl'}`}>{splitTitle(title)}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg md:text-xl text-muted reveal">{subtitle}</p>}
        </div>
      </section>
    );
  }

  /* -- Bold-full (CMS heroStyle override) --------------------------- */
  if (effectivePage === '_bold') {
    return (
      <section className="pt-40 pb-16 grain relative overflow-hidden">
        <div className="container-x">
          <p className="eyebrow mb-6 reveal">{eyebrow}</p>
          <h1 className="reveal font-display tracking-tighter leading-[0.85] text-[14vw] md:text-[10vw] lg:text-[140px]">
            {title.toUpperCase()}
          </h1>
          {subtitle && <p className="mt-10 text-xl md:text-2xl max-w-3xl reveal leading-snug">{subtitle}</p>}
          {body && body !== subtitle && <p className="mt-5 text-base md:text-lg max-w-3xl reveal leading-relaxed text-muted">{body}</p>}
          {image && (
            <div className="mt-10 overflow-hidden border-y border-line">
              <img src={image} alt={title} className="w-full max-h-[520px] object-cover" loading="lazy" />
            </div>
          )}
        </div>
      </section>
    );
  }

  /* -- Minimal (CMS heroStyle override � text only, no image) ------- */
  if (effectivePage === '_minimal') {
    return (
      <section className="pt-44 pb-12">
        <div className="container-x">
          <p className="eyebrow mb-5 reveal">{eyebrow}</p>
          <h1 className={`reveal ${style === 'bold' ? 'font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]' : style === 'modern' ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.05]' : 'headline-xl max-w-5xl'}`}>{splitTitle(title)}</h1>
          {subtitle && <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl reveal">{subtitle}</p>}
          {body && body !== subtitle && <p className="mt-4 text-base md:text-lg text-muted max-w-2xl reveal leading-relaxed">{body}</p>}
        </div>
      </section>
    );
  }

  if (style === 'bold') {
    return (
      <section className="pt-40 pb-16 grain relative overflow-hidden">
        <div className="container-x">
          <p className="eyebrow mb-6 reveal">{eyebrow}</p>
          <h1 className="reveal font-display tracking-tighter leading-[0.85] text-[14vw] md:text-[10vw] lg:text-[140px]">
            {title.toUpperCase()}
          </h1>
          {subtitle && <p className="mt-10 text-xl md:text-2xl max-w-3xl reveal leading-snug">{subtitle}</p>}
          {body && body !== subtitle && <p className="mt-5 text-base md:text-lg max-w-3xl reveal leading-relaxed text-muted">{body}</p>}
          {image && (
            <div className="mt-10 overflow-hidden border-y border-line">
              <img src={image} alt={title} className="w-full max-h-[520px] object-cover" loading="lazy" />
            </div>
          )}
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
            {body && body !== subtitle && <p className="mt-4 text-base text-muted max-w-2xl leading-relaxed">{body}</p>}
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
        {body && body !== subtitle && <p className="mt-4 text-base md:text-lg text-muted max-w-2xl reveal leading-relaxed">{body}</p>}
        {image && (
          <div className="mt-10 max-w-4xl overflow-hidden rounded-2xl border border-line reveal">
            <img src={image} alt={title} className="w-full max-h-[520px] object-cover" loading="lazy" />
          </div>
        )}
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

function subtitleFor(v: TemplateVariant, content: SiteContent): string {
  const bt = (content as any).branchText?.teaserSubtitle as string | undefined;
  if (bt && bt.trim()) return bt;
  return (content.hero?.subtitle && content.hero.subtitle.trim()) || teaserSubtitleFor(v, content);
}

function heroBodyFor(v: TemplateVariant, content: SiteContent): string {
  const body = (content.hero as any)?.body as string | undefined;
  if (body && body.trim()) return body;
  return teaserSubtitleFor(v, content);
}

function marqueeWordsFor(v: TemplateVariant, content?: SiteContent): string[] {
  const override = (content as any)?.branchText?.marqueeWords as string[] | undefined;
  const trimmed = (override ?? []).map((s) => String(s).trim()).filter(Boolean);
  if (trimmed.length > 0) return trimmed;
  return branchTextDefaults(v).marqueeWords;
}

function galleryTeaserTitle(v: TemplateVariant, content?: SiteContent): React.ReactNode {
  const override = (content as any)?.branchText?.galleryTeaserTitle as string | undefined;
  const raw = (override && override.trim()) || branchTextDefaults(v).galleryTeaserTitle;
  return splitTitle(raw);
}

function isExternalNavHref(h: string): boolean {
  return h.startsWith('http') || h.startsWith('mailto:') || h.startsWith('tel:');
}

function logoBandEntryIsImageUrl(n: string): boolean {
  const s = n.trim();
  if (!s) return false;
  if (/^https?:\/\//i.test(s)) return true;
  if (s.startsWith('/') && /\.(png|jpe?g|gif|webp|svg|avif)(\?|#|$)/i.test(s)) return true;
  if (s.includes('blob.vercel-storage.com')) return true;
  return false;
}

