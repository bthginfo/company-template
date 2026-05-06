/**
 * Handwerk — spec-modular v1. `services` ← Service-Karten / -listen; Förderung & Notdienst aus Spec-Sections.
 */

import type { SiteContent, ModularPagesV1, ModularSectionV1 } from './types.js';
import type { TemplateKey } from './types.js';
import type { TemplateStyle } from './branch-config.js';
import {
  tradesmanModularBlueprint,
  type TradesmanModularPageKey,
  TRADESMAN_SECTION_LABEL_DE,
} from './modular-tradesman-blueprints.js';
import {
  str,
  imgUrl,
  bool,
  modularComboTemplateMatches,
  mergeHomeIntoLegacy,
  mergeGalleryIntoLegacy,
  mergeAboutIntoLegacy,
  mergeContactIntoLegacy,
  mergeNoticeBanner,
  mergeHeroToPageHeader,
  hasModularSectionData,
  importGallerySections,
  importAboutSections,
  importContactSections,
} from './modular-restaurant.js';
import { mapModularItemToService } from './modular-catalog-mappers.js';

export { TRADESMAN_SECTION_LABEL_DE, type TradesmanModularPageKey };

type ServiceRow = SiteContent['services'][number];

export function hasTradesmanModularPage(
  content: SiteContent,
  _style: TemplateStyle,
  page: TradesmanModularPageKey,
): boolean {
  const m = content.modularPagesV1;
  if (!modularComboTemplateMatches(m, 'tradesman') || !m) return false;
  const bundle =
    page === 'home' ? m.home : page === 'services' ? m.services : page === 'gallery' ? m.gallery : page === 'about' ? m.about : m.contact;
  return (bundle?.sections?.length ?? 0) > 0;
}

export function hasAnyTradesmanModular(content: SiteContent): boolean {
  return (['home', 'services', 'gallery', 'about', 'contact'] as const).some((p) => hasTradesmanModularPage(content, 'classic', p));
}

function emptySections(style: TemplateStyle, page: TradesmanModularPageKey): ModularSectionV1[] {
  return tradesmanModularBlueprint(style, page).map((type, i) => ({
    id: `${page}-${type}-${i}`,
    type,
    isVisible: true,
    data: {},
  }));
}

function readItems(data: Record<string, unknown>): { text: string }[] {
  const raw = data.items;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((it) => (it && typeof it === 'object' ? str((it as { text?: unknown }).text) : ''))
    .filter(Boolean)
    .map((text) => ({ text }));
}

function mergeFundingCalculator(content: SiteContent, d: Record<string, unknown>): SiteContent {
  const minN = Number((d as { investmentMin?: unknown }).investmentMin);
  const maxN = Number((d as { investmentMax?: unknown }).investmentMax);
  const stepN = Number((d as { investmentStep?: unknown }).investmentStep);
  const defN = Number((d as { investmentDefault?: unknown }).investmentDefault);
  const fc = {
    minInvest: Number.isFinite(minN) ? minN : content.fundingCalc?.minInvest ?? 5000,
    maxInvest: Number.isFinite(maxN) ? maxN : content.fundingCalc?.maxInvest ?? 150000,
    stepInvest: Number.isFinite(stepN) ? stepN : content.fundingCalc?.stepInvest ?? 1000,
    defaultInvest: Number.isFinite(defN) ? defN : content.fundingCalc?.defaultInvest ?? 25000,
  };
  const raw = (d as { programs?: unknown }).programs;
  const fundingItems = Array.isArray(raw)
    ? raw
        .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
        .map((p) => ({
          title: str(p.title),
          description: str(p.description),
          percent: typeof p.percentage === 'number' ? `${p.percentage} %` : str(p.percentage),
          program: str(p.title),
          imageUrl: '',
          detailSlug: '',
          detailPublished: true,
          detailSubtitle: '',
          detailBody: '',
          detailBodyHtml: '',
          detailGallery: [] as string[],
        }))
    : content.fundingItems;
  return { ...content, fundingCalc: fc, fundingItems: fundingItems ?? content.fundingItems };
}

function mergeStickyEmergency(content: SiteContent, d: Record<string, unknown>): SiteContent {
  const phone = str(d.phone);
  const label = str(d.label);
  const headline = str(d.headline);
  const sub = str(d.subline);
  const text = [label, headline, sub].filter(Boolean).join(' — ') || str(d.text);
  const enabled = bool(d.isVisible, true);
  return {
    ...content,
    emergencyBanner: {
      ...content.emergencyBanner,
      enabled,
      text: text || content.emergencyBanner?.text,
      phone: phone || content.emergencyBanner?.phone,
      sticky: content.emergencyBanner?.sticky !== false,
    },
  };
}

function mergeTradesmanGalleryExtras(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next = content;
  for (const sec of sections) {
    if (sec.isVisible === false || sec.type !== 'categoryCards') continue;
    const d = sec.data ?? {};
    if (!hasModularSectionData(d)) continue;
    const raw = (d as { items?: unknown }).items;
    const rows = Array.isArray(raw)
      ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ t: str(x.title), d: str(x.description) }))
      : [];
    next = {
      ...next,
      branchText: {
        ...next.branchText,
        galleryCategoriesEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
        galleryCategoriesTitle: str((d as { headline?: unknown }).headline),
      },
      galleryCategories: rows,
    };
  }
  return next;
}

function mergeTradesmanAboutExtras(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next: SiteContent = { ...content };
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    if (!hasModularSectionData(d)) continue;
    if (sec.type === 'storyImageSplit') {
      const prevAbout = next.about ?? { title: '', body: '', imageUrl: '' };
      next = {
        ...next,
        about: {
          ...prevAbout,
          title: str((d as { headline?: unknown }).headline) || prevAbout.title,
          body: str((d as { description?: unknown }).description) || prevAbout.body,
        },
        branchText: { ...next.branchText, aboutTeaserEyebrow: str((d as { eyebrow?: unknown }).eyebrow) },
      };
    } else if (sec.type === 'qualifications') {
      const raw = (d as { items?: unknown }).items;
      const rows = Array.isArray(raw)
        ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({
            t: str(x.title),
            d: str(x.description),
          }))
        : [];
      next = {
        ...next,
        branchText: {
          ...next.branchText,
          certsEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
          certsTitle: str((d as { headline?: unknown }).headline),
        },
        certifications: rows,
      };
    }
  }
  return next;
}

function mergeTradesmanHomeSupplements(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): SiteContent {
  let next: SiteContent = { ...content };
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    if (!hasModularSectionData(d)) continue;
    if (sec.type === 'stickyEmergencyBanner') {
      next = mergeStickyEmergency(next, { ...(d as Record<string, unknown>), isVisible: true });
    } else if (sec.type === 'fundingCalculator') {
      next = mergeFundingCalculator(next, d as Record<string, unknown>);
    } else if (sec.type === 'featuredServices' || sec.type === 'serviceCards' || sec.type === 'serviceList') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToService);
      if (!mapped.length) continue;
      const cur = [...(next.services ?? [])];
      mapped.forEach((row, i) => {
        cur[i] = { ...(cur[i] ?? { title: '', description: '', price: '', imageUrl: '' }), ...row };
      });
      next = { ...next, services: cur };
    } else if (sec.type === 'keywordBand') {
      const lines = readItems(d as Record<string, unknown>).map((x) => x.text);
      next = { ...next, logos: lines };
    } else if (sec.type === 'marqueeBand' || sec.type === 'testimonialMarquee') {
      const lines = readItems(d as Record<string, unknown>).map((x) => x.text);
      next = { ...next, branchText: { ...next.branchText, marqueeWords: lines } };
    } else if (sec.type === 'featureImage') {
      const im = (d as { image?: unknown }).image as Record<string, unknown> | undefined;
      const url = im ? str(im.image) : '';
      if (url) {
        next =
          style === 'classic'
            ? { ...next, hero: { ...next.hero, imageUrl: url } }
            : { ...next, branchText: { ...next.branchText, heroImageUrl: url } };
      }
    } else if (sec.type === 'storySplit') {
      const prevAbout = next.about ?? { title: '', body: '', imageUrl: '' };
      next = {
        ...next,
        about: {
          ...prevAbout,
          title: str((d as { headline?: unknown }).headline) || prevAbout.title,
          body: str((d as { description?: unknown }).description) || prevAbout.body,
        },
        branchText: { ...next.branchText, aboutTeaserEyebrow: str((d as { eyebrow?: unknown }).eyebrow) },
      };
    } else if (sec.type === 'quoteWall') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const list = raw
        .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
        .map((it) => ({ author: str(it.name), text: str(it.quote) }))
        .filter((t) => t.text || t.author);
      next = { ...next, testimonials: list };
    } else if (sec.type === 'newsHighlightList') {
      const rawPosts = (d as { posts?: unknown }).posts;
      const img = imgUrl((d as { featuredImage?: unknown }).featuredImage);
      const posts = Array.isArray(rawPosts)
        ? rawPosts.filter((p): p is Record<string, unknown> => !!p && typeof p === 'object').map((p, i) => {
            const btn = p.button as Record<string, unknown> | undefined;
            const href = str(btn?.internalPage) || str(btn?.externalUrl);
            const slug = href.split('/').filter(Boolean).pop() || `thema-${i + 1}`;
            return {
              id: slug,
              slug,
              date: str(p.date),
              title: str(p.title),
              excerpt: str(p.excerpt),
              body: '',
              bodyHtml: '',
              imageUrl: img,
              published: true,
            };
          })
        : [];
      next = {
        ...next,
        branchText: {
          ...next.branchText,
          newsEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
          newsTitle: str((d as { headline?: unknown }).headline),
        },
        ...(posts.length ? { posts } : {}),
        ...(img ? { gallery: [img, ...(next.gallery ?? []).filter((url) => url !== img)] } : {}),
      };
    } else if (sec.type === 'ctaBand') {
      const btn = (d as { button?: unknown }).button as Record<string, unknown> | undefined;
      next = {
        ...next,
        ctaBandOverride: {
          ...next.ctaBandOverride,
          eyebrow: str((d as { eyebrow?: unknown }).eyebrow),
          lead: str((d as { headline?: unknown }).headline),
          sub: str((d as { subline?: unknown }).subline),
          cta: str(btn?.label),
          ctaHref: str(btn?.internalPage) || str(btn?.externalUrl),
        },
      };
    }
  }
  return next;
}

function importTradesmanAboutExtras(content: SiteContent, sections: ModularSectionV1[]): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  const sis = by('storyImageSplit');
  if (sis) {
    sis.data = {
      eyebrow: str(content.branchText?.aboutTeaserEyebrow),
      headline: str(content.about?.title),
      description: str(content.about?.body),
    };
  }
  const qual = by('qualifications');
  if (qual) {
    qual.data = {
      eyebrow: str(content.branchText?.certsEyebrow),
      headline: str(content.branchText?.certsTitle),
      description: '',
      items: (content.certifications ?? []).map((c) => ({ title: str(c.t), description: str(c.d) })),
    };
  }
}

function mergeTradesmanHomeIntoLegacy(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): SiteContent {
  let next = mergeHomeIntoLegacy(content, sections, style, 'tradesman');
  next = mergeTradesmanHomeSupplements(next, sections, style);
  return next;
}

function mergeTradesmanServicesIntoLegacy(content: SiteContent, sections: ModularSectionV1[], _style: TemplateStyle): SiteContent {
  let next: SiteContent = { ...content };
  let servicesOverride: ServiceRow[] | undefined;
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    if (!hasModularSectionData(d)) continue;
    switch (sec.type) {
      case 'noticeBanner':
        next = mergeNoticeBanner(next, d as Record<string, unknown>);
        break;
      case 'hero':
        next = mergeHeroToPageHeader(next, d as Record<string, unknown>, 'servicesHeader', 'servicesPageImageUrl');
        break;
      case 'stickyEmergencyBanner':
        next = mergeStickyEmergency(next, { ...(d as Record<string, unknown>), isVisible: true });
        break;
      case 'highlightsBar': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ t: str(x.title), d: str(x.description) }))
          : [];
        next = { ...next, serviceHighlights: rows };
        break;
      }
      case 'serviceOverviewCards':
      case 'serviceCards':
      case 'serviceList': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToService);
        servicesOverride = mapped;
        break;
      }
      case 'fundingCalculator':
        next = mergeFundingCalculator(next, d as Record<string, unknown>);
        break;
      case 'steps': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ t: str(x.title), d: str(x.description) }))
          : [];
        next = { ...next, serviceProcess: rows };
        break;
      }
      case 'faq': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ q: str(x.question), a: str(x.answer) }))
          : [];
        next = { ...next, faq: rows };
        break;
      }
      case 'cta': {
        const btn = (d as { button?: unknown }).button as Record<string, unknown> | undefined;
        const all = { ...(next.ctaBandOverrides ?? {}) };
        all.services = {
          ...(next.ctaBandOverrides?.services ?? {}),
          eyebrow: str((d as { eyebrow?: unknown }).eyebrow),
          lead: str((d as { headline?: unknown }).headline),
          sub: str((d as { subline?: unknown }).subline),
          cta: str(btn?.label),
          ctaHref: str(btn?.internalPage) || str(btn?.externalUrl),
        };
        next = { ...next, ctaBandOverrides: all } as SiteContent;
        break;
      }
      default:
        break;
    }
  }
  if (servicesOverride) next = { ...next, services: servicesOverride };
  return next;
}

function importStickyEmergency(content: SiteContent, sec: ModularSectionV1 | undefined): void {
  if (!sec) return;
  const e = content.emergencyBanner ?? {};
  sec.data = {
    usesGlobalConfig: true,
    isVisible: bool(e.enabled, false),
    label: 'Notdienst',
    headline: str(e.text),
    phone: str(e.phone),
    subline: '',
  };
}

function importFundingSection(content: SiteContent, sec: ModularSectionV1 | undefined): void {
  if (!sec) return;
  const fc = content.fundingCalc ?? {};
  const programs = (content.fundingItems ?? []).map((p) => ({
    title: str(p.title),
    description: str(p.description),
    percentage: str(p.percent).replace(/\s*%$/, ''),
    isActive: true,
    isStackable: false,
  }));
  sec.data = {
    eyebrow: 'Förderung',
    headline: 'Was für Sie drin ist.',
    description: '',
    investmentLabel: 'Investition',
    investmentMin: fc.minInvest ?? 5000,
    investmentMax: fc.maxInvest ?? 150000,
    investmentStep: fc.stepInvest ?? 1000,
    investmentDefault: fc.defaultInvest ?? 25000,
    resultGrossLabel: 'Brutto',
    resultFundingLabel: 'Förderung',
    resultNetLabel: 'Netto',
    programs,
    calculationMode: 'sumAllEligible',
    button: { label: 'Beratung anfragen', linkType: 'internal', internalPage: '/kontakt', externalUrl: '' },
  };
}

function importTradesmanHomeSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  importStickyEmergency(content, by('stickyEmergencyBanner'));
  importFundingSection(content, by('fundingCalculator'));
  const nb = by('noticeBanner');
  if (nb) {
    const lines = (content.announcements ?? []).filter(Boolean);
    nb.data = { isVisible: true, items: lines.map((text) => ({ text })) };
  }
  const hero = by('hero');
  if (hero) {
    const nums = (content.numbers ?? []).map((n) => ({ value: str(n.value), description: str(n.label) }));
    const h: Record<string, unknown> = {
      eyebrow: str(content.branchText?.heroEyebrow),
      headline: str(content.hero?.title),
      subline: str(content.hero?.subtitle),
      description: str(content.hero?.body),
      buttonPrimary: {
        label: str(content.hero?.ctaLabel),
        linkType: 'internal',
        internalPage: str(content.hero?.ctaHref),
        externalUrl: '',
      },
      stats: nums,
    };
    if (style === 'classic' || style === 'bold') {
      h.backgroundImage = { image: str(content.hero?.imageUrl), alt: '' };
    } else {
      h.image = { image: str(content.branchText?.heroImageUrl || content.hero?.imageUrl), alt: '' };
    }
    hero.data = h;
  }
  const ab = by('actionBar');
  if (ab) {
    const hs = content.homeStrip ?? {};
    ab.data = {
      isVisible: true,
      statusLabel: '',
      statusText: str(hs.eyebrow),
      infoText: '',
      buttonPrimary: { label: str(hs.primaryLabel), linkType: 'internal', internalPage: str(hs.primaryHref), externalUrl: '' },
      buttonSecondary: { label: str(hs.secondaryLabel), linkType: 'internal', internalPage: str(hs.secondaryHref), externalUrl: '' },
    };
  }
  const mb = by('marqueeBand');
  if (mb) {
    const words = content.branchText?.marqueeWords ?? [];
    mb.data = { items: words.map((w) => ({ text: w })) };
  }
  const fi = by('featureImage');
  if (fi) {
    fi.data = { image: { image: str(content.hero?.imageUrl), alt: '' }, caption: '' };
  }
  const svc = content.services ?? [];
  const fs = by('featuredServices');
  if (fs) {
    fs.data = {
      eyebrow: str(content.branchText?.servicesTeaserEyebrow),
      headline: str(content.branchText?.servicesTeaserTitle),
      description: '',
      items: svc.slice(0, 3).map((s) => ({
        title: str(s.title),
        description: str(s.description),
        image: { image: str(s.imageUrl), alt: str(s.title) },
        button: { label: 'Mehr', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const sc = by('serviceCards');
  if (sc) {
    sc.data = {
      eyebrow: str(content.branchText?.servicesTeaserEyebrow),
      headline: str(content.branchText?.servicesTeaserTitle),
      description: '',
      items: svc.map((s) => ({
        title: str(s.title),
        subtitle: '',
        description: str(s.description),
        image: { image: str(s.imageUrl), alt: str(s.title) },
        price: str(s.price),
        button: { label: 'Leistungen', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const sl = by('serviceList');
  if (sl) {
    sl.data = {
      eyebrow: str(content.branchText?.servicesTeaserEyebrow),
      headline: str(content.branchText?.servicesTeaserTitle),
      button: { label: 'Alle Leistungen', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
      items: svc.map((s) => ({
        title: str(s.title),
        subtitle: str(s.price),
        description: str(s.description),
        image: { image: str(s.imageUrl), alt: str(s.title) },
        price: str(s.price),
        button: { label: 'Anfrage', linkType: 'internal', internalPage: '/kontakt', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const tc = by('topicCards');
  if (tc) {
    const vals = content.values ?? [];
    tc.data = {
      eyebrow: str(content.branchText?.valuesEyebrow),
      headline: str(content.branchText?.valuesTitle),
      items: vals.slice(0, 4).map((v) => ({ title: str(v.t), description: str(v.d), image: { image: '', alt: '' } })),
    };
  }
  const tb = by('topicBand');
  if (tb) {
    const vals = content.values ?? [];
    tb.data = {
      backgroundStyle: 'dark',
      headline: str(content.branchText?.valuesTitle),
      subline: '',
      phone: str(content.contact?.phone),
      items: vals.slice(0, 5).map((v) => ({ title: str(v.t), meta: '', description: str(v.d) })),
    };
  }
  const kb = by('keywordBand');
  if (kb) {
    const words = content.logos ?? [];
    kb.data = { items: words.map((w) => ({ text: typeof w === 'string' ? w : '' })) };
  }
  const sb = by('statsBand');
  if (sb) {
    sb.data = { items: (content.numbers ?? []).map((n) => ({ value: str(n.value), description: str(n.label) })) };
  }
  const gp = by('galleryPreview');
  if (gp) {
    const imgs = (content.gallery ?? []).slice(0, 8).map((url) => ({ image: url, alt: '' }));
    gp.data = {
      eyebrow: str(content.branchText?.galleryTeaserEyebrow),
      headline: str(content.branchText?.galleryTeaserTitle),
      images: imgs,
      button: { label: str(content.branchText?.galleryAllLabel), linkType: 'internal', internalPage: '/referenzen', externalUrl: '' },
    };
  }
  const nhl = by('newsHighlightList');
  if (nhl) {
    nhl.data = {
      eyebrow: str(content.branchText?.newsEyebrow),
      headline: str(content.branchText?.newsTitle),
      featuredImage: { image: (content.gallery ?? [])[0] ?? '', alt: '' },
      posts: (content.posts ?? []).slice(0, 3).map((p) => ({
        date: str(p.date),
        title: str(p.title),
        excerpt: str(p.excerpt),
        button: { label: 'Mehr', linkType: 'internal', internalPage: `/news/${str(p.slug)}`, externalUrl: '' },
      })),
    };
  }
  const te = by('testimonials');
  if (te) {
    te.data = {
      eyebrow: str(content.branchText?.testimonialsEyebrow),
      headline: str(content.branchText?.testimonialsTitle),
      items: (content.testimonials ?? []).map((t) => ({ name: str(t.author), quote: str(t.text) })),
    };
  }
  const tm = by('testimonialMarquee');
  if (tm) {
    const words = content.branchText?.marqueeWords ?? [];
    tm.data = { items: words.map((w) => ({ text: w })) };
  }
  const qw = by('quoteWall');
  if (qw) {
    qw.data = {
      items: (content.testimonials ?? []).map((t, i) => ({
        quote: str(t.text),
        name: str(t.author),
        isPrimary: i === 0,
      })),
    };
  }
  const st = by('storyTeaser');
  if (st) {
    st.data = {
      eyebrow: str(content.branchText?.aboutTeaserEyebrow),
      headline: str(content.about?.title),
      description: str(content.about?.body),
      image: { image: str(content.about?.imageUrl), alt: '' },
      button: {
        label: str(content.branchText?.learnMoreLabel),
        linkType: 'internal',
        internalPage: str(content.branchText?.learnMoreHref),
        externalUrl: '',
      },
    };
  }
  const ssp = by('storySplit');
  if (ssp) {
    ssp.data = {
      eyebrow: str(content.branchText?.aboutTeaserEyebrow),
      headline: str(content.about?.title),
      description: str(content.about?.body),
      button: { label: str(content.branchText?.learnMoreLabel), linkType: 'internal', internalPage: '/ueber-uns', externalUrl: '' },
    };
  }
  const ne = by('newsTeaser');
  if (ne) {
    ne.data = {
      eyebrow: str(content.branchText?.newsEyebrow),
      headline: str(content.branchText?.newsTitle),
      postLimit: 3,
      button: { label: 'Alle Beiträge', linkType: 'internal', internalPage: '/news', externalUrl: '' },
    };
  }
  const cta = by('cta');
  if (cta) {
    const c = content.ctaBandOverride ?? {};
    cta.data = {
      eyebrow: str(c.eyebrow),
      headline: str(c.lead),
      subline: str(c.sub),
      button: { label: str(c.cta), linkType: 'internal', internalPage: str(c.ctaHref), externalUrl: '' },
    };
  }
  const ctab = by('ctaBand');
  if (ctab) {
    const c = content.ctaBandOverride ?? {};
    ctab.data = {
      backgroundStyle: 'dark',
      headline: str(c.lead),
      subline: str(c.sub),
      button: { label: str(c.cta), linkType: 'internal', internalPage: str(c.ctaHref), externalUrl: '' },
    };
  }
}

function importTradesmanServicesSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  importStickyEmergency(content, by('stickyEmergencyBanner'));
  importFundingSection(content, by('fundingCalculator'));
  const nb = by('noticeBanner');
  if (nb) {
    const lines = (content.announcements ?? []).filter(Boolean);
    nb.data = { isVisible: true, items: lines.map((text) => ({ text })) };
  }
  const hero = by('hero');
  if (hero) {
    const sh = content.servicesHeader ?? {};
    const h: Record<string, unknown> = {
      eyebrow: str(sh.eyebrow),
      headline: str(sh.title),
      subline: str(sh.subtitle),
      description: str(sh.subtitle),
    };
    if (style === 'modern' || style === 'bold') {
      h.image = { image: str(content.branchText?.servicesPageImageUrl), alt: '' };
    }
    hero.data = h;
  }
  const hb = by('highlightsBar');
  if (hb) {
    hb.data = {
      items: (content.serviceHighlights ?? []).map((x) => ({ title: str(x.t), description: str(x.d) })),
    };
  }
  const svc = content.services ?? [];
  const soc = by('serviceOverviewCards');
  if (soc) {
    soc.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: svc.map((s) => ({
        title: str(s.title),
        description: str(s.description),
        price: str(s.price),
        button: { label: 'Details', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const sc = by('serviceCards');
  if (sc) {
    sc.data = {
      items: svc.map((s) => ({
        title: str(s.title),
        subtitle: '',
        description: str(s.description),
        image: { image: str(s.imageUrl), alt: str(s.title) },
        price: str(s.price),
        button: { label: 'Anfrage', linkType: 'internal', internalPage: '/kontakt', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const sl = by('serviceList');
  if (sl) {
    sl.data = {
      items: svc.map((s) => ({
        title: str(s.title),
        subtitle: str(s.price),
        description: str(s.description),
        image: { image: str(s.imageUrl), alt: str(s.title) },
        price: str(s.price),
        button: { label: 'Mehr', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const st = by('steps');
  if (st) {
    st.data = {
      eyebrow: str(content.branchText?.processEyebrow),
      headline: str(content.branchText?.processTitle),
      items: (content.serviceProcess ?? []).map((p) => ({ title: str(p.t), description: str(p.d) })),
    };
  }
  const fq = by('faq');
  if (fq) {
    fq.data = {
      eyebrow: str(content.branchText?.faqEyebrow),
      headline: str(content.branchText?.faqTitle),
      items: (content.faq ?? []).map((x) => ({ question: str(x.q), answer: str(x.a) })),
    };
  }
  const cta = by('cta');
  if (cta) {
    const o = (content.ctaBandOverrides ?? {}).services ?? content.ctaBandOverride ?? {};
    cta.data = {
      eyebrow: str((o as { eyebrow?: unknown }).eyebrow),
      headline: str((o as { lead?: unknown }).lead),
      subline: str((o as { sub?: unknown }).sub),
      button: { label: str((o as { cta?: unknown }).cta), linkType: 'internal', internalPage: str((o as { ctaHref?: unknown }).ctaHref), externalUrl: '' },
    };
  }
}

export function importTradesmanModularFromLegacy(content: SiteContent, style: TemplateStyle): ModularPagesV1 {
  const home = emptySections(style, 'home');
  importTradesmanHomeSections(content, [...home], style);
  const services = emptySections(style, 'services');
  importTradesmanServicesSections(content, [...services], style);
  const gallery = emptySections(style, 'gallery');
  importGallerySections(content, [...gallery]);
  const about = emptySections(style, 'about');
  importAboutSections(content, [...about], style);
  importTradesmanAboutExtras(content, [...about]);
  const contact = emptySections(style, 'contact');
  importContactSections(content, [...contact]);
  return {
    combo: { template: 'tradesman', style },
    home: { sections: home },
    services: { sections: services },
    gallery: { sections: gallery },
    about: { sections: about },
    contact: { sections: contact },
  };
}

export function applyTradesmanModularToLegacy(content: SiteContent): SiteContent {
  const m = content.modularPagesV1;
  if (!m?.combo || m.combo.template !== 'tradesman') return content;
  const style = m.combo.style;
  let next: SiteContent = { ...content };
  if (m.home?.sections?.length) next = mergeTradesmanHomeIntoLegacy(next, m.home.sections, style);
  if (m.services?.sections?.length) next = mergeTradesmanServicesIntoLegacy(next, m.services.sections, style);
  if (m.gallery?.sections?.length) {
    next = mergeGalleryIntoLegacy(next, m.gallery.sections);
    next = mergeTradesmanGalleryExtras(next, m.gallery.sections);
  }
  if (m.about?.sections?.length) {
    next = mergeAboutIntoLegacy(next, m.about.sections);
    next = mergeTradesmanAboutExtras(next, m.about.sections);
  }
  if (m.contact?.sections?.length) next = mergeContactIntoLegacy(next, m.contact.sections);
  return next;
}

export function applyTradesmanModularOverlay(content: SiteContent, variant: TemplateKey, _style: TemplateStyle): SiteContent {
  if (variant !== 'tradesman') return content;
  if (!modularComboTemplateMatches(content.modularPagesV1, 'tradesman')) return content;
  if (!hasAnyTradesmanModular(content)) return content;
  return applyTradesmanModularToLegacy(content);
}
