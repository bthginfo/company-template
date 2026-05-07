/**
 * Hochzeit (wedding) — spec-modular v1.
 * Mirrors the consulting hydration pattern with wedding-specific labels.
 */

import type { SiteContent, ModularPagesV1, ModularSectionV1 } from './types.js';
import type { TemplateKey } from './types.js';
import type { TemplateStyle } from './branch-config.js';
import {
  weddingModularBlueprint,
  type WeddingModularPageKey,
  WEDDING_SECTION_LABEL_DE,
} from './modular-wedding-blueprints.js';
import {
  str,
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
import { mapModularItemToService, mapModularTeamToLegacy } from './modular-catalog-mappers.js';

export { WEDDING_SECTION_LABEL_DE, type WeddingModularPageKey };

export function hasWeddingModularPage(content: SiteContent, _style: TemplateStyle, page: WeddingModularPageKey): boolean {
  const m = content.modularPagesV1;
  if (!modularComboTemplateMatches(m, 'wedding') || !m) return false;
  const bundle =
    page === 'home' ? m.home : page === 'services' ? m.services : page === 'gallery' ? m.gallery : page === 'about' ? m.about : m.contact;
  return (bundle?.sections?.length ?? 0) > 0;
}

export function hasAnyWeddingModular(content: SiteContent): boolean {
  return (['home', 'services', 'gallery', 'about', 'contact'] as const).some((p) => hasWeddingModularPage(content, 'classic', p));
}

function emptySections(style: TemplateStyle, page: WeddingModularPageKey): ModularSectionV1[] {
  return weddingModularBlueprint(style, page).map((type, i) => ({
    id: `${page}-${type}-${i}`,
    type,
    isVisible: true,
    data: {},
  }));
}

function processRowsFromLegacy(content: SiteContent): { title: string; description: string; stepNumber: string }[] {
  return (content.serviceProcess ?? []).map((p, i) => ({
    stepNumber: String(i + 1),
    title: str(p.t),
    description: str(p.d),
  }));
}

function mergeWeddingGalleryExtras(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
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

function mergeWeddingHomeSupplements(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next: SiteContent = { ...content };
  const procRows: { t: string; d: string }[] = [];
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    if (!hasModularSectionData(d)) continue;
    if (sec.type === 'keywordBand') {
      const raw = (d as { items?: unknown }).items;
      if (Array.isArray(raw)) {
        const lines = raw
          .map((it) => (it && typeof it === 'object' ? str((it as { text?: unknown }).text) : ''))
          .filter(Boolean);
        next = { ...next, logos: lines };
      }
    } else if (sec.type === 'serviceCards') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToService);
      const cur = mapped.length ? [...(next.services ?? [])] : [];
      mapped.forEach((row, i) => {
        cur[i] = { ...(cur[i] ?? { title: '', description: '', price: '', imageUrl: '' }), ...row };
      });
      next = { ...next, services: cur };
    } else if (sec.type === 'processTextColumns' || sec.type === 'processCards') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const rows = raw
        .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
        .map((it) => ({ t: str(it.title), d: str(it.description) }))
        .filter((r) => r.t || r.d);
      procRows.push(...rows);
    } else if (sec.type === 'team') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const team = raw
        .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
        .map(mapModularTeamToLegacy)
        .filter((m) => m.n || m.r || m.bio);
      next = { ...next, team };
    }
  }
  if (procRows.length) next = { ...next, serviceProcess: procRows };
  return next;
}

function mergeWeddingHomeIntoLegacy(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): SiteContent {
  let next = mergeHomeIntoLegacy(content, sections, style, 'wedding');
  next = mergeWeddingHomeSupplements(next, sections);
  return next;
}

function mergeWeddingServicesIntoLegacy(content: SiteContent, sections: ModularSectionV1[], _style: TemplateStyle): SiteContent {
  let next: SiteContent = { ...content };
  let servicesOverride: SiteContent['services'] | undefined;
  const procRows: { t: string; d: string }[] = [];
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
      case 'serviceCards': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToService);
        servicesOverride = mapped;
        break;
      }
      case 'processTextColumns':
      case 'processCards': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const rows = raw
          .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
          .map((it) => ({ t: str(it.title), d: str(it.description) }))
          .filter((r) => r.t || r.d);
        procRows.push(...rows);
        break;
      }
      case 'testimonials': {
        const raw = (d as { items?: unknown }).items;
        const list = Array.isArray(raw)
          ? raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map((it) => ({ author: str(it.name), text: str(it.quote) }))
          : [];
        next = { ...next, testimonials: list };
        break;
      }
      case 'galleryPreview': {
        const imgsRaw = (d as { images?: unknown }).images;
        const urls = Array.isArray(imgsRaw)
          ? imgsRaw.map((it) => (it && typeof it === 'object' ? str((it as { image?: unknown }).image) : '')).filter(Boolean)
          : [];
        next = {
          ...next,
          branchText: {
            ...next.branchText,
            galleryTeaserEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            galleryTeaserTitle: str((d as { headline?: unknown }).headline),
          },
          gallery: urls,
        };
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
  if (procRows.length) next = { ...next, serviceProcess: procRows };
  if (servicesOverride) next = { ...next, services: servicesOverride };
  return next;
}

function importWeddingHome(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  const nb = by('noticeBanner');
  if (nb) {
    nb.data = { isVisible: true, items: (content.announcements ?? []).filter(Boolean).map((text) => ({ text })) };
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
    if (style === 'classic') h.backgroundImage = { image: str(content.hero?.imageUrl), alt: '' };
    else h.image = { image: str(content.branchText?.heroImageUrl || content.hero?.imageUrl), alt: '' };
    hero.data = h;
  }
  const kb = by('keywordBand');
  if (kb) {
    kb.data = { items: (content.logos ?? []).map((w) => ({ text: typeof w === 'string' ? w : '' })) };
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
  const sc = by('serviceCards');
  if (sc) {
    sc.data = {
      eyebrow: str(content.branchText?.servicesTeaserEyebrow),
      headline: str(content.branchText?.servicesTeaserTitle),
      description: '',
      items: (content.services ?? []).map((s) => ({
        title: str(s.title),
        description: str(s.description),
        image: { image: str(s.imageUrl), alt: str(s.title) },
        tags: '',
        button: { label: str(s.learnMoreLabel) || 'Mehr', linkType: 'internal', internalPage: str(s.learnMoreHref) || '/programm', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const rows = processRowsFromLegacy(content);
  const ptc = by('processTextColumns');
  if (ptc) {
    ptc.data = {
      eyebrow: str(content.branchText?.processEyebrow),
      headline: str(content.branchText?.processTitle),
      description: '',
      items: rows,
    };
  }
  const pc = by('processCards');
  if (pc) {
    pc.data = {
      eyebrow: str(content.branchText?.processEyebrow),
      headline: str(content.branchText?.processTitle),
      description: '',
      items: rows,
    };
  }
  const tm = by('team');
  if (tm) {
    tm.data = {
      eyebrow: 'Trauzeugen',
      headline: 'Unsere Liebsten.',
      description: '',
      items: (content.team ?? []).map((m) => ({
        name: str(m.n),
        role: str(m.r),
        description: str(m.bio),
        image: { image: str(m.img), alt: str(m.n) },
      })),
    };
  }
  const gp = by('galleryPreview');
  if (gp) {
    gp.data = {
      eyebrow: str(content.branchText?.galleryTeaserEyebrow),
      headline: str(content.branchText?.galleryTeaserTitle),
      images: (content.gallery ?? []).slice(0, 8).map((url) => ({ image: url, alt: '' })),
      button: { label: str(content.branchText?.galleryAllLabel), linkType: 'internal', internalPage: '/galerie', externalUrl: '' },
    };
  }
  const te = by('testimonials');
  if (te) {
    te.data = {
      eyebrow: str(content.branchText?.testimonialsEyebrow),
      headline: str(content.branchText?.testimonialsTitle),
      items: (content.testimonials ?? []).map((t) => ({ name: str(t.author), quote: str(t.text), source: '' })),
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
  const cp = by('contactPreview');
  if (cp) {
    const c = content.contact ?? {};
    cp.data = {
      eyebrow: 'RSVP',
      headline: 'Zusagen',
      subline: '',
      phone: str(c.phone),
      email: str(c.email),
      address: [str(c.address), str(c.city)].filter(Boolean).join(', '),
      openingHours: '',
      googleMapsUrl: str(c.mapsUrl),
      mapEmbedOrLink: str(c.mapsUrl),
      button: { label: 'Zusagen', linkType: 'internal', internalPage: '/rsvp', externalUrl: '' },
    };
  }
}

function importWeddingServices(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  const nb = by('noticeBanner');
  if (nb) nb.data = { isVisible: true, items: (content.announcements ?? []).filter(Boolean).map((text) => ({ text })) };
  const hero = by('hero');
  if (hero) {
    const sh = content.servicesHeader ?? {};
    const h: Record<string, unknown> = {
      eyebrow: str(sh.eyebrow),
      headline: str(sh.title),
      description: str(sh.subtitle),
    };
    if (style !== 'classic') h.image = { image: str(content.branchText?.servicesPageImageUrl), alt: '' };
    hero.data = h;
  }
  const sc = by('serviceCards');
  if (sc) {
    sc.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: (content.services ?? []).map((s) => ({
        title: str(s.title),
        description: str(s.description),
        image: { image: str(s.imageUrl), alt: str(s.title) },
        tags: '',
        button: { label: 'Details', linkType: 'internal', internalPage: '/rsvp', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const rows = processRowsFromLegacy(content);
  const ptc = by('processTextColumns');
  if (ptc) ptc.data = { eyebrow: '', headline: '', description: '', items: rows };
  const pc = by('processCards');
  if (pc) pc.data = { eyebrow: '', headline: '', description: '', items: rows };
  const te = by('testimonials');
  if (te) {
    te.data = {
      eyebrow: '',
      headline: '',
      items: (content.testimonials ?? []).map((t) => ({ name: str(t.author), quote: str(t.text), source: '' })),
    };
  }
  const gp = by('galleryPreview');
  if (gp) {
    gp.data = {
      eyebrow: '',
      headline: '',
      images: (content.gallery ?? []).slice(0, 8).map((url) => ({ image: url, alt: '' })),
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

export function importWeddingModularFromLegacy(content: SiteContent, style: TemplateStyle): ModularPagesV1 {
  const home = emptySections(style, 'home');
  importWeddingHome(content, [...home], style);
  const services = emptySections(style, 'services');
  importWeddingServices(content, [...services], style);
  const gallery = emptySections(style, 'gallery');
  importGallerySections(content, [...gallery]);
  const about = emptySections(style, 'about');
  importAboutSections(content, [...about], style);
  const contact = emptySections(style, 'contact');
  importContactSections(content, [...contact]);
  return {
    combo: { template: 'wedding', style },
    home: { sections: home },
    services: { sections: services },
    gallery: { sections: gallery },
    about: { sections: about },
    contact: { sections: contact },
  };
}

export function applyWeddingModularToLegacy(content: SiteContent): SiteContent {
  const m = content.modularPagesV1;
  if (!m?.combo || m.combo.template !== 'wedding') return content;
  const style = m.combo.style;
  let next: SiteContent = { ...content };
  if (m.home?.sections?.length) next = mergeWeddingHomeIntoLegacy(next, m.home.sections, style);
  if (m.services?.sections?.length) next = mergeWeddingServicesIntoLegacy(next, m.services.sections, style);
  if (m.gallery?.sections?.length) {
    next = mergeGalleryIntoLegacy(next, m.gallery.sections);
    next = mergeWeddingGalleryExtras(next, m.gallery.sections);
  }
  if (m.about?.sections?.length) next = mergeAboutIntoLegacy(next, m.about.sections);
  if (m.contact?.sections?.length) next = mergeContactIntoLegacy(next, m.contact.sections);
  return next;
}

export function applyWeddingModularOverlay(content: SiteContent, variant: TemplateKey, _style: TemplateStyle): SiteContent {
  if (variant !== 'wedding') return content;
  if (!modularComboTemplateMatches(content.modularPagesV1, 'wedding')) return content;
  if (!hasAnyWeddingModular(content)) return content;
  return applyWeddingModularToLegacy(content);
}
