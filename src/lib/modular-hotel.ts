/**
 * Hotel — spec-modular content (v1) for all styles × subpages.
 * Reuses shared merge/import for gallery, about, contact with Restaurant (same legacy fields).
 */

import type { SiteContent, ModularPagesV1, ModularSectionV1 } from './types.js';
import type { TemplateKey } from './types.js';
import type { TemplateStyle } from './branch-config.js';
import {
  hotelModularBlueprint,
  type HotelModularPageKey,
  HOTEL_SECTION_LABEL_DE,
} from './modular-hotel-blueprints.js';
import {
  str,
  bool,
  imgUrl,
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

export { HOTEL_SECTION_LABEL_DE, type HotelModularPageKey };

type HotelRoom = NonNullable<SiteContent['rooms']>[number];
type HotelServiceRow = NonNullable<SiteContent['services']>[number];

const DEFAULT_HOTEL_SERVICE_ROW: HotelServiceRow = {
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

/** `/zimmer` uses `services` (HotelRoomCards); modular merges Zimmer → `rooms` — keep both in sync. */
function roomRowToServiceRow(room: HotelRoom): HotelServiceRow {
  const extras = [str(room.size), str(room.beds)].filter(Boolean).join(' · ');
  const body = str(room.description);
  const description = extras ? (body ? `${body} (${extras})` : extras) : body;
  return {
    title: str(room.name),
    description,
    price: str(room.price),
    imageUrl: str(room.imageUrl),
    learnMoreLabel: '',
    learnMoreHref: '',
    detailSlug: str(room.detailSlug),
    detailPublished: room.detailPublished ?? true,
    detailSubtitle: str(room.detailSubtitle),
    detailBody: str(room.detailBody),
    detailBodyHtml: str(room.detailBodyHtml),
    detailGallery: [...(room.detailGallery ?? [])],
  };
}

export function hasHotelModularPage(
  content: SiteContent,
  _style: TemplateStyle,
  page: HotelModularPageKey,
): boolean {
  const m = content.modularPagesV1;
  if (!modularComboTemplateMatches(m, 'hotel') || !m) return false;
  const bundle =
    page === 'home' ? m.home : page === 'services' ? m.services : page === 'gallery' ? m.gallery : page === 'about' ? m.about : m.contact;
  return (bundle?.sections?.length ?? 0) > 0;
}

export function hasAnyHotelModular(content: SiteContent): boolean {
  const pages: HotelModularPageKey[] = ['home', 'services', 'gallery', 'about', 'contact'];
  return pages.some((p) => hasHotelModularPage(content, 'classic', p));
}

function emptySections(style: TemplateStyle, page: HotelModularPageKey): ModularSectionV1[] {
  return hotelModularBlueprint(style, page).map((type, i) => ({
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

function mapModularItemToRoom(it: Record<string, unknown>): HotelRoom {
  const featsRaw = it.features;
  const features = Array.isArray(featsRaw)
    ? featsRaw
        .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
        .map((x) => str(x.text))
        .filter(Boolean)
    : [];
  const priceBase = str(it.price);
  const suf = str(it.priceSuffix);
  const price =
    priceBase && suf
      ? suf.startsWith('/') || suf.startsWith(',')
        ? `${priceBase}${suf.startsWith('/') ? '' : ' '}${suf}`
        : `${priceBase} ${suf}`
      : priceBase || suf;
  return {
    name: str(it.title) || str(it.name),
    description: str(it.description),
    size: str(it.subtitle),
    beds: '',
    price,
    imageUrl: imgUrl(it.image),
    features,
    detailSlug: str((it as { detailSlug?: unknown }).detailSlug),
    detailPublished: bool((it as { detailPublished?: unknown }).detailPublished, true),
    detailSubtitle: str((it as { detailSubtitle?: unknown }).detailSubtitle),
    detailBody: str((it as { detailBody?: unknown }).detailBody),
    detailBodyHtml: str((it as { detailBodyHtml?: unknown }).detailBodyHtml),
    detailGallery: Array.isArray((it as { detailGallery?: unknown }).detailGallery)
      ? ((it as { detailGallery: unknown[] }).detailGallery as string[]).filter((u): u is string => typeof u === 'string')
      : [],
  };
}

function importHotelHomeSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
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
  const fa = by('featuredAreas');
  if (fa) {
    const items = (content.rooms ?? []).slice(0, 3).map((r) => ({
      title: str(r.name),
      description: str(r.description),
      image: { image: str(r.imageUrl), alt: str(r.name) },
      button: { label: 'Zimmer anfragen', linkType: 'internal', internalPage: '/kontakt', externalUrl: '' },
      hasSubpage: false,
      subpage: {},
    }));
    fa.data = {
      eyebrow: str(content.branchText?.servicesTeaserEyebrow),
      headline: str(content.branchText?.servicesTeaserTitle),
      description: '',
      items,
    };
  }
  const rs = by('roomSelection');
  if (rs) {
    const items = (content.rooms ?? []).slice(0, 3).map((r) => ({
      title: str(r.name),
      description: str(r.description),
      image: { image: str(r.imageUrl), alt: str(r.name) },
      button: { label: 'Zimmer', linkType: 'internal', internalPage: '/zimmer', externalUrl: '' },
      hasSubpage: false,
      subpage: {},
    }));
    rs.data = { eyebrow: '', headline: str(content.branchText?.servicesTeaserTitle), darkModeStyle: true, items };
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

function mergeHotelHomeSupplements(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next: SiteContent = { ...content };
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    if (!hasModularSectionData(d)) continue;
    if (sec.type === 'featuredAreas' || sec.type === 'roomSelection') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToRoom);
      if (!mapped.length) continue;
      const cur = [...(next.rooms ?? [])];
      const curSvc = [...(next.services ?? [])];
      mapped.forEach((row, i) => {
        const mergedR = { ...(cur[i] ?? { name: '', description: '', size: '', beds: '', price: '', imageUrl: '', features: [] }), ...row };
        cur[i] = mergedR;
        curSvc[i] = { ...(curSvc[i] ?? DEFAULT_HOTEL_SERVICE_ROW), ...roomRowToServiceRow(mergedR) };
      });
      next = { ...next, rooms: cur, services: curSvc };
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

function mergeHotelHomeIntoLegacy(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): SiteContent {
  let next = mergeHomeIntoLegacy(content, sections, style, 'hotel');
  next = mergeHotelHomeSupplements(next, sections);
  return next;
}

function importHotelServicesSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
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
  const rooms = content.rooms ?? [];
  const ag = by('accommodationsGrid');
  if (ag) {
    const slice = rooms.slice(0, 3);
    ag.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: slice.map((r) => ({
        title: str(r.name),
        subtitle: str(r.size),
        description: str(r.description),
        image: { image: str(r.imageUrl), alt: str(r.name) },
        price: str(r.price),
        priceSuffix: '',
        features: (r.features ?? []).map((text) => ({ text })),
        hasSubpage: !!r.detailSlug,
        subpage: {},
      })),
    };
  }
  const al = by('accommodationList');
  if (al) {
    al.data = {
      items: rooms.map((r) => ({
        title: str(r.name),
        description: str(r.description),
        image: { image: str(r.imageUrl), alt: str(r.name) },
        meta: str(r.price),
        hasSubpage: !!r.detailSlug,
        subpage: {},
      })),
    };
  }
  const rc = by('roomCards');
  if (rc) {
    rc.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: rooms.map((r) => ({
        title: str(r.name),
        subtitle: str(r.size),
        description: str(r.description),
        image: { image: str(r.imageUrl), alt: str(r.name) },
        price: str(r.price),
        priceSuffix: '',
        features: (r.features ?? []).map((text) => ({ text })),
        hasSubpage: !!r.detailSlug,
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

function mergeHotelServicesIntoLegacy(content: SiteContent, sections: ModularSectionV1[], _style: TemplateStyle): SiteContent {
  let next: SiteContent = { ...content };
  let roomsOverride: HotelRoom[] | undefined;
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
      case 'accommodationsGrid':
      case 'accommodationList':
      case 'roomCards': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToRoom);
        roomsOverride = mapped;
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
  if (roomsOverride) {
    const servicesFromRooms = roomsOverride.map((r) => roomRowToServiceRow(r));
    next = { ...next, rooms: roomsOverride, services: servicesFromRooms };
  }
  return next;
}

export function importHotelModularFromLegacy(content: SiteContent, style: TemplateStyle): ModularPagesV1 {
  const home = emptySections(style, 'home');
  importHotelHomeSections(content, [...home], style);
  const services = emptySections(style, 'services');
  importHotelServicesSections(content, [...services], style);
  const gallery = emptySections(style, 'gallery');
  importGallerySections(content, [...gallery]);
  const about = emptySections(style, 'about');
  importAboutSections(content, [...about], style);
  const contact = emptySections(style, 'contact');
  importContactSections(content, [...contact]);
  return {
    combo: { template: 'hotel', style },
    home: { sections: home },
    services: { sections: services },
    gallery: { sections: gallery },
    about: { sections: about },
    contact: { sections: contact },
  };
}

export function applyHotelModularToLegacy(content: SiteContent): SiteContent {
  const m = content.modularPagesV1;
  if (!m?.combo || m.combo.template !== 'hotel') return content;
  const style = m.combo.style;
  let next: SiteContent = { ...content };
  if (m.home?.sections?.length) next = mergeHotelHomeIntoLegacy(next, m.home.sections, style);
  if (m.services?.sections?.length) next = mergeHotelServicesIntoLegacy(next, m.services.sections, style);
  if (m.gallery?.sections?.length) next = mergeGalleryIntoLegacy(next, m.gallery.sections);
  if (m.about?.sections?.length) next = mergeAboutIntoLegacy(next, m.about.sections);
  if (m.contact?.sections?.length) next = mergeContactIntoLegacy(next, m.contact.sections);
  return next;
}

export function applyHotelModularOverlay(
  content: SiteContent,
  variant: TemplateKey,
  _style: TemplateStyle,
): SiteContent {
  if (variant !== 'hotel') return content;
  if (!modularComboTemplateMatches(content.modularPagesV1, 'hotel')) return content;
  if (!hasAnyHotelModular(content)) return content;
  return applyHotelModularToLegacy(content);
}
