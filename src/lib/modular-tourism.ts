/**
 * Tourismus — spec-modular v1 (alle Styles × Unterseiten).
 * Touren → `tours`; Home-Tourplan → `homeSignatureItems` + Überschriften; Galerie/Über uns/Kontakt wie Hotel.
 */

import type { SiteContent, ModularPagesV1, ModularSectionV1 } from './types.js';
import type { TemplateKey } from './types.js';
import type { TemplateStyle } from './branch-config.js';
import {
  tourismModularBlueprint,
  type TourismModularPageKey,
  TOURISM_SECTION_LABEL_DE,
} from './modular-tourism-blueprints.js';
import {
  str,
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
import { mapModularItemToTour } from './modular-catalog-mappers.js';

export { TOURISM_SECTION_LABEL_DE, type TourismModularPageKey };

type TourRow = NonNullable<SiteContent['tours']>[number];

const DEFAULT_TOUR_ROW: TourRow = {
  name: '',
  description: '',
  duration: '',
  level: '',
  groupSize: '',
  price: '',
  imageUrl: '',
  languages: [],
  detailSlug: '',
  detailPublished: true,
  detailSubtitle: '',
  detailBody: '',
  detailBodyHtml: '',
  detailGallery: [],
};

type TourismServiceRow = NonNullable<SiteContent['services']>[number];

const DEFAULT_TOURISM_SERVICE_ROW: TourismServiceRow = {
  title: '',
  description: '',
  price: '',
  imageUrl: '',
  learnMoreLabel: '',
  learnMoreHref: '',
  detailSlug: '',
  detailPublished: true,
  detailSubtitle: '',
  detailBody: '',
  detailBodyHtml: '',
  detailGallery: [],
};

/** `/leistungen` uses `services` (TourismTourCards); keep aligned with `tours` from modular. */
function tourRowToServiceRow(tour: TourRow): TourismServiceRow {
  const meta = [str(tour.duration), str(tour.level), str(tour.groupSize)].filter(Boolean).join(' · ');
  const body = str(tour.description);
  const description = meta ? (body ? `${body} (${meta})` : meta) : body;
  return {
    title: str(tour.name),
    description,
    price: str(tour.price),
    imageUrl: str(tour.imageUrl),
    learnMoreLabel: '',
    learnMoreHref: '',
    detailSlug: str(tour.detailSlug),
    detailPublished: tour.detailPublished ?? true,
    detailSubtitle: str(tour.detailSubtitle),
    detailBody: str(tour.detailBody),
    detailBodyHtml: str(tour.detailBodyHtml),
    detailGallery: [...(tour.detailGallery ?? [])],
  };
}

/** Import / services modular: use `tours`; if empty, lift home teaser (`homeSignatureItems`). */
function toursForTourismModularImport(content: SiteContent): NonNullable<SiteContent['tours']> {
  const tours = content.tours ?? [];
  if (tours.length) return tours;
  const sig = content.homeSignatureItems ?? [];
  return sig
    .filter((r) => String(r.title ?? '').trim() || String(r.description ?? '').trim() || String(r.price ?? '').trim())
    .map((r) => ({
      ...DEFAULT_TOUR_ROW,
      name: str(r.title),
      description: str(r.description),
      price: str(r.price),
      imageUrl: str(r.imageUrl),
    }));
}

export function hasTourismModularPage(
  content: SiteContent,
  _style: TemplateStyle,
  page: TourismModularPageKey,
): boolean {
  const m = content.modularPagesV1;
  if (!modularComboTemplateMatches(m, 'tourism') || !m) return false;
  const bundle =
    page === 'home' ? m.home : page === 'services' ? m.services : page === 'gallery' ? m.gallery : page === 'about' ? m.about : m.contact;
  return (bundle?.sections?.length ?? 0) > 0;
}

export function hasAnyTourismModular(content: SiteContent): boolean {
  const pages: TourismModularPageKey[] = ['home', 'services', 'gallery', 'about', 'contact'];
  return pages.some((p) => hasTourismModularPage(content, 'classic', p));
}

function emptySections(style: TemplateStyle, page: TourismModularPageKey): ModularSectionV1[] {
  return tourismModularBlueprint(style, page).map((type, i) => ({
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

function tourScheduleRowsFromLegacy(content: SiteContent): Record<string, unknown>[] {
  const sig = (content.homeSignatureItems ?? []).filter((r) => String(r.title ?? '').trim() || String(r.description ?? '').trim());
  if (sig.length) {
    return sig.map((r, i) => ({
      label: `Tour ${String(i + 1).padStart(2, '0')}`,
      title: str(r.title),
      description: str(r.description),
      meta: str(r.price),
      image: { image: str(r.imageUrl), alt: str(r.title) },
      button: { label: 'Mehr', linkType: 'internal', internalPage: '/touren', externalUrl: '' },
      hasSubpage: false,
      subpage: {},
    }));
  }
  const tours = content.tours ?? [];
  return tours.slice(0, 4).map((t, i) => ({
    label: str(t.duration) || `Tour ${String(i + 1).padStart(2, '0')}`,
    title: str(t.name),
    description: str(t.description),
    meta: [str(t.level), str(t.price)].filter(Boolean).join(' · '),
    image: { image: str(t.imageUrl), alt: str(t.name) },
    button: { label: 'Programm', linkType: 'internal', internalPage: '/touren', externalUrl: '' },
    hasSubpage: !!t.detailSlug,
    subpage: {},
  }));
}

function importTourismHomeSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
  const by = (t: string) => sections.find((s) => s.type === t);
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
    if (style === 'classic') {
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
      autoAvailabilityStatusEnabled: bool(hs.eyebrowAuto, true),
      availabilityStatusOverride: str(hs.eyebrow),
      buttonPrimary: { label: str(hs.primaryLabel), linkType: 'internal', internalPage: str(hs.primaryHref), externalUrl: '' },
      buttonSecondary: { label: str(hs.secondaryLabel), linkType: 'internal', internalPage: str(hs.secondaryHref), externalUrl: '' },
    };
  }
  const mb = by('marqueeBand');
  if (mb) {
    const words = content.branchText?.marqueeWords ?? [];
    mb.data = { items: words.map((w) => ({ text: w })) };
  }
  const ts = by('tourSchedule');
  if (ts) {
    ts.data = {
      eyebrow: str(content.moduleHeadings?.tours?.eyebrow),
      headline: [str(content.moduleHeadings?.tours?.titleA), str(content.moduleHeadings?.tours?.titleB)].filter(Boolean).join(' '),
      description: str(content.moduleHeadings?.tours?.subtitle),
      items: tourScheduleRowsFromLegacy(content),
    };
  }
  const tsel = by('tourSelection');
  if (tsel) {
    tsel.data = {
      eyebrow: str(content.moduleHeadings?.tours?.eyebrow),
      headline: [str(content.moduleHeadings?.tours?.titleA), str(content.moduleHeadings?.tours?.titleB)].filter(Boolean).join(' '),
      darkModeStyle: true,
      items: tourScheduleRowsFromLegacy(content),
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
  const gp = by('galleryPreview');
  if (gp) {
    const imgs = (content.gallery ?? []).slice(0, 6).map((url) => ({ image: url, alt: '' }));
    gp.data = {
      eyebrow: str(content.branchText?.galleryTeaserEyebrow),
      headline: str(content.branchText?.galleryTeaserTitle),
      images: imgs,
      button: { label: str(content.branchText?.galleryAllLabel), linkType: 'internal', internalPage: '/galerie', externalUrl: '' },
    };
  }
  const bl = by('brandLogos');
  if (bl) {
    bl.data = {
      items: (content.logos ?? []).map((name) => ({
        name: typeof name === 'string' ? name : '',
        logo: { image: '', alt: '' },
        link: '',
      })),
    };
  }
  const te = by('testimonials');
  if (te) {
    te.data = {
      eyebrow: str(content.branchText?.testimonialsEyebrow),
      headline: str(content.branchText?.testimonialsTitle),
      testimonials: (content.testimonials ?? []).map((t) => ({ name: str(t.author), quote: str(t.text) })),
    };
  }
  const tm = by('testimonialMarquee');
  if (tm) {
    const words = content.branchText?.marqueeWords ?? [];
    tm.data = { items: words.map((w) => ({ text: w })) };
  }
  const sb = by('statsBand');
  if (sb) {
    sb.data = { items: (content.numbers ?? []).map((n) => ({ value: str(n.value), description: str(n.label) })) };
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
}

function mergeTourismHomeSupplements(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next: SiteContent = { ...content };
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    if (!hasModularSectionData(d)) continue;
    if (sec.type === 'tourSchedule' || sec.type === 'tourSelection') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const objs = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object');
      const rows: { title: string; description: string; price: string; imageUrl: string }[] = [];
      const curTours = [...(next.tours ?? [])];
      objs.forEach((it) => {
        const im = it.image as Record<string, unknown> | undefined;
        const row = {
          title: str(it.title),
          description: str(it.description),
          price: str(it.meta) || str(it.price),
          imageUrl: im ? str(im.image) : '',
        };
        if (!(row.title || row.description || row.price || row.imageUrl)) return;
        const i = rows.length;
        rows.push(row);
        const tr = mapModularItemToTour(it);
        curTours[i] = { ...(curTours[i] ?? DEFAULT_TOUR_ROW), ...tr };
      });
      const curSvc = [...(next.services ?? [])];
      for (let i = 0; i < rows.length; i++) {
        const t = curTours[i];
        if (t) curSvc[i] = { ...(curSvc[i] ?? DEFAULT_TOURISM_SERVICE_ROW), ...tourRowToServiceRow(t) };
      }
      next = {
        ...next,
        homeSignature: {
          ...next.homeSignature,
          eyebrow: str((d as { eyebrow?: unknown }).eyebrow) || next.homeSignature?.eyebrow,
          titleA: str((d as { headline?: unknown }).headline) || next.homeSignature?.titleA,
          titleB: next.homeSignature?.titleB,
        },
        homeSignatureItems: rows,
        tours: rows.length ? curTours : [],
        services: rows.length ? curSvc : [],
      };
    } else if (sec.type === 'brandLogos') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const names = raw
        .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
        .map((it) => {
          const logo = it.logo as Record<string, unknown> | undefined;
          const fromImg = logo ? str(logo.image) : '';
          return fromImg || str(it.name);
        })
        .filter(Boolean);
      next = { ...next, logos: names };
    } else if (sec.type === 'testimonialMarquee') {
      const lines = readItems(d as Record<string, unknown>).map((x) => x.text);
      next = { ...next, branchText: { ...next.branchText, marqueeWords: lines } };
    }
  }
  return next;
}

function mergeTourismHomeIntoLegacy(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): SiteContent {
  let next = mergeHomeIntoLegacy(content, sections, style, 'tourism');
  next = mergeTourismHomeSupplements(next, sections);
  return next;
}

function importTourismServicesSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
  const by = (t: string) => sections.find((s) => s.type === t);
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
      description: '',
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
  const tours = toursForTourismModularImport(content);
  const toc = by('tourOverviewCards');
  if (toc) {
    const slice = tours.slice(0, 3);
    toc.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: slice.map((t) => ({
        title: str(t.name),
        description: str(t.description),
        image: { image: str(t.imageUrl), alt: str(t.name) },
        duration: str(t.duration),
        difficulty: str(t.level),
        price: str(t.price),
        groupSize: str(t.groupSize),
        button: { label: 'Details', linkType: 'internal', internalPage: '/touren', externalUrl: '' },
        hasSubpage: !!t.detailSlug,
        subpage: {},
      })),
    };
  }
  const tol = by('tourOverviewList');
  if (tol) {
    tol.data = {
      items: tours.map((t) => ({
        title: str(t.name),
        description: str(t.description),
        image: { image: str(t.imageUrl), alt: str(t.name) },
        meta: [str(t.duration), str(t.price)].filter(Boolean).join(' · '),
        hasSubpage: !!t.detailSlug,
        subpage: {},
      })),
    };
  }
  const tc = by('tourCards');
  if (tc) {
    tc.data = {
      eyebrow: str(content.moduleHeadings?.tours?.eyebrow),
      headline: [str(content.moduleHeadings?.tours?.titleA), str(content.moduleHeadings?.tours?.titleB)].filter(Boolean).join(' '),
      description: str(content.moduleHeadings?.tours?.subtitle),
      items: tours.map((t) => ({
        title: str(t.name),
        subtitle: str(t.duration),
        description: str(t.description),
        image: { image: str(t.imageUrl), alt: str(t.name) },
        duration: str(t.duration),
        difficulty: str(t.level),
        price: str(t.price),
        priceSuffix: '',
        groupSize: str(t.groupSize),
        tags: (t.languages ?? []).join(', '),
        features: [] as { text: string }[],
        hasSubpage: !!t.detailSlug,
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

function mergeTourismServicesIntoLegacy(content: SiteContent, sections: ModularSectionV1[], _style: TemplateStyle): SiteContent {
  let next: SiteContent = { ...content };
  let toursOverride: TourRow[] | undefined;
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
      case 'highlightsBar': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ t: str(x.title), d: str(x.description) }))
          : [];
        next = { ...next, serviceHighlights: rows };
        break;
      }
      case 'tourOverviewCards':
      case 'tourOverviewList':
      case 'tourCards': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToTour);
        toursOverride = mapped;
        break;
      }
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
  if (toursOverride) {
    const svc = toursOverride.map((t) => tourRowToServiceRow(t));
    next = { ...next, tours: toursOverride, services: svc };
  }
  return next;
}

export function importTourismModularFromLegacy(content: SiteContent, style: TemplateStyle): ModularPagesV1 {
  const home = emptySections(style, 'home');
  importTourismHomeSections(content, [...home], style);
  const services = emptySections(style, 'services');
  importTourismServicesSections(content, [...services], style);
  const gallery = emptySections(style, 'gallery');
  importGallerySections(content, [...gallery]);
  const about = emptySections(style, 'about');
  importAboutSections(content, [...about], style);
  const contact = emptySections(style, 'contact');
  importContactSections(content, [...contact]);
  return {
    combo: { template: 'tourism', style },
    home: { sections: home },
    services: { sections: services },
    gallery: { sections: gallery },
    about: { sections: about },
    contact: { sections: contact },
  };
}

export function applyTourismModularToLegacy(content: SiteContent): SiteContent {
  const m = content.modularPagesV1;
  if (!m?.combo || m.combo.template !== 'tourism') return content;
  const style = m.combo.style;
  let next: SiteContent = { ...content };
  if (m.home?.sections?.length) next = mergeTourismHomeIntoLegacy(next, m.home.sections, style);
  if (m.services?.sections?.length) next = mergeTourismServicesIntoLegacy(next, m.services.sections, style);
  if (m.gallery?.sections?.length) next = mergeGalleryIntoLegacy(next, m.gallery.sections);
  if (m.about?.sections?.length) next = mergeAboutIntoLegacy(next, m.about.sections);
  if (m.contact?.sections?.length) next = mergeContactIntoLegacy(next, m.contact.sections);
  return next;
}

export function applyTourismModularOverlay(
  content: SiteContent,
  variant: TemplateKey,
  _style: TemplateStyle,
): SiteContent {
  if (variant !== 'tourism') return content;
  if (!modularComboTemplateMatches(content.modularPagesV1, 'tourism')) return content;
  if (!hasAnyTourismModular(content)) return content;
  return applyTourismModularToLegacy(content);
}
