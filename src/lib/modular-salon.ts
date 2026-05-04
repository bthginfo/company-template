/**
 * Salon — spec-modular v1. `treatments` ← serviceCards / Übersichten; Home-Teaser ← featuredServices.
 */

import type { SiteContent, ModularPagesV1, ModularSectionV1 } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import {
  salonModularBlueprint,
  type SalonModularPageKey,
  SALON_SECTION_LABEL_DE,
} from '@/lib/modular-salon-blueprints';
import {
  str,
  bool,
  modularComboMatchesTenant,
  mergeHomeIntoLegacy,
  mergeGalleryIntoLegacy,
  mergeAboutIntoLegacy,
  mergeContactIntoLegacy,
  mergeNoticeBanner,
  mergeHeroToPageHeader,
  importGallerySections,
  importAboutSections,
  importContactSections,
} from '@/lib/modular-restaurant';
import { mapModularItemToTreatment } from '@/lib/modular-catalog-mappers';

export { SALON_SECTION_LABEL_DE, type SalonModularPageKey };

type TreatmentRow = NonNullable<SiteContent['treatments']>[number];

export function hasSalonModularPage(content: SiteContent, style: TemplateStyle, page: SalonModularPageKey): boolean {
  const m = content.modularPagesV1;
  if (!modularComboMatchesTenant(m, 'salon', style) || !m) return false;
  const bundle =
    page === 'home' ? m.home : page === 'services' ? m.services : page === 'gallery' ? m.gallery : page === 'about' ? m.about : m.contact;
  return (bundle?.sections?.length ?? 0) > 0;
}

export function hasAnySalonModular(content: SiteContent, style: TemplateStyle): boolean {
  return (['home', 'services', 'gallery', 'about', 'contact'] as const).some((p) => hasSalonModularPage(content, style, p));
}

function emptySections(style: TemplateStyle, page: SalonModularPageKey): ModularSectionV1[] {
  return salonModularBlueprint(style, page).map((type, i) => ({
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

function mapLooksToScheduleItems(raw: unknown): { title: string; description: string; price: string; imageUrl: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
    .map((it) => {
      const im = it.image as Record<string, unknown> | undefined;
      return {
        title: str(it.title) || str(it.meta),
        description: str(it.meta) && str(it.title) ? str(it.meta) : '',
        price: '',
        imageUrl: im ? str(im.image) : '',
      };
    })
    .filter((r) => r.title || r.imageUrl);
}

function mergeSalonHomeSupplements(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): SiteContent {
  let next: SiteContent = { ...content };
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    const mergeTreatmentsFromItems = (raw: unknown) => {
      if (!Array.isArray(raw)) return;
      const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToTreatment);
      if (!mapped.length) return;
      const cur = [...(next.treatments ?? [])];
      mapped.forEach((row, i) => {
        cur[i] = { ...(cur[i] ?? { name: '', description: '', duration: '', price: '', category: '', imageUrl: '' }), ...row };
      });
      next = { ...next, treatments: cur };
    };
    if (sec.type === 'featuredServices' || sec.type === 'serviceCards') {
      mergeTreatmentsFromItems((d as { items?: unknown }).items);
    } else if (sec.type === 'featuredLooks' || sec.type === 'featuredLooksBand') {
      const rows = mapLooksToScheduleItems((d as { items?: unknown }).items);
      if (rows.length) {
        next = {
          ...next,
          homeSignature: {
            ...next.homeSignature,
            eyebrow: str((d as { eyebrow?: unknown }).eyebrow) || str((d as { headline?: unknown }).headline),
            titleA: str((d as { headline?: unknown }).headline) || next.homeSignature?.titleA,
            titleB: next.homeSignature?.titleB,
          },
          homeSignatureItems: rows.map((r) => ({ title: r.title, description: r.description, price: r.price, imageUrl: r.imageUrl })),
        };
      }
    } else if (sec.type === 'brandLogos') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const names = raw
        .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
        .map((it) => {
          const logo = it.logo as Record<string, unknown> | undefined;
          return (logo ? str(logo.image) : '') || str(it.name);
        })
        .filter(Boolean);
      if (names.length) next = { ...next, logos: names };
    } else if (sec.type === 'testimonialMarquee') {
      const lines = readItems(d as Record<string, unknown>).map((x) => x.text);
      if (lines.length) next = { ...next, branchText: { ...next.branchText, marqueeWords: lines } };
    } else if (sec.type === 'quoteWall') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const list = raw
        .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
        .map((it) => ({ author: str(it.name), text: str(it.quote) }))
        .filter((t) => t.text || t.author);
      if (list.length) next = { ...next, testimonials: list };
    } else if (sec.type === 'storySplit') {
      const prevAbout = next.about ?? { title: '', body: '', imageUrl: '' };
      next = {
        ...next,
        about: {
          ...prevAbout,
          title: str((d as { headline?: unknown }).headline) || prevAbout.title,
          body: str((d as { description?: unknown }).description) || prevAbout.body,
        },
        branchText: {
          ...next.branchText,
          aboutTeaserEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
        },
      };
    } else if (sec.type === 'featureImage') {
      const im = (d as { image?: unknown }).image as Record<string, unknown> | undefined;
      const url = im ? str(im.image) : '';
      if (url) {
        next =
          style === 'classic'
            ? { ...next, hero: { ...next.hero, imageUrl: url } }
            : { ...next, branchText: { ...next.branchText, heroImageUrl: url } };
      }
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

function mergeSalonHomeIntoLegacy(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): SiteContent {
  let next = mergeHomeIntoLegacy(content, sections, style);
  next = mergeSalonHomeSupplements(next, sections, style);
  return next;
}

function importSalonHomeSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
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
  const fi = by('featureImage');
  if (fi) {
    fi.data = { image: { image: str(content.hero?.imageUrl), alt: '' }, caption: '' };
  }
  const treatments = content.treatments ?? [];
  const fs = by('featuredServices');
  if (fs) {
    fs.data = {
      eyebrow: str(content.branchText?.servicesTeaserEyebrow),
      headline: str(content.branchText?.servicesTeaserTitle),
      description: '',
      items: treatments.slice(0, 3).map((t) => ({
        title: str(t.name),
        description: str(t.description),
        image: { image: str(t.imageUrl), alt: str(t.name) },
        price: str(t.price),
        duration: str(t.duration),
        button: { label: 'Mehr', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!t.detailSlug,
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
      items: treatments.map((t) => ({
        title: str(t.name),
        subtitle: str(t.duration),
        description: str(t.description),
        image: { image: str(t.imageUrl), alt: str(t.name) },
        price: str(t.price),
        duration: str(t.duration),
        tags: str(t.category),
        button: { label: 'Leistungen', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!t.detailSlug,
        subpage: {},
      })),
    };
  }
  const fl = by('featuredLooks');
  if (fl) {
    fl.data = {
      eyebrow: str(content.branchText?.servicesTeaserEyebrow),
      headline: str(content.branchText?.servicesTeaserTitle),
      items: treatments.slice(0, 4).map((t) => ({
        image: { image: str(t.imageUrl), alt: str(t.name) },
        title: str(t.name),
        meta: str(t.duration),
      })),
    };
  }
  const flb = by('featuredLooksBand');
  if (flb) {
    flb.data = {
      headline: str(content.branchText?.servicesTeaserTitle),
      backgroundStyle: 'accentDark',
      items: treatments.slice(0, 4).map((t) => ({
        image: { image: str(t.imageUrl), alt: str(t.name) },
        title: str(t.name),
        meta: str(t.price),
      })),
    };
  }
  const ss = by('storySplit');
  if (ss) {
    ss.data = {
      eyebrow: str(content.branchText?.aboutTeaserEyebrow),
      headline: str(content.about?.title),
      description: str(content.about?.body),
      button: { label: str(content.branchText?.learnMoreLabel), linkType: 'internal', internalPage: '/ueber-uns', externalUrl: '' },
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

function importSalonServicesSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
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
  const list = content.treatments ?? [];
  const soc = by('serviceOverviewCards');
  if (soc) {
    soc.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: list.map((t) => ({
        title: str(t.name),
        description: str(t.description),
        image: { image: str(t.imageUrl), alt: str(t.name) },
        price: str(t.price),
        duration: str(t.duration),
        button: { label: 'Details', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!t.detailSlug,
        subpage: {},
      })),
    };
  }
  const sol = by('serviceOverviewList');
  if (sol) {
    sol.data = {
      items: list.map((t) => ({
        title: str(t.name),
        description: str(t.description),
        image: { image: str(t.imageUrl), alt: str(t.name) },
        meta: [str(t.duration), str(t.price)].filter(Boolean).join(' · '),
        hasSubpage: !!t.detailSlug,
        subpage: {},
      })),
    };
  }
  const sc = by('serviceCards');
  if (sc) {
    sc.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: list.map((t) => ({
        title: str(t.name),
        subtitle: str(t.duration),
        description: str(t.description),
        image: { image: str(t.imageUrl), alt: str(t.name) },
        price: str(t.price),
        duration: str(t.duration),
        tags: str(t.category),
        button: { label: 'Buchen', linkType: 'internal', internalPage: '/kontakt', externalUrl: '' },
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

function mergeSalonServicesIntoLegacy(content: SiteContent, sections: ModularSectionV1[], _style: TemplateStyle): SiteContent {
  let next: SiteContent = { ...content };
  let treatmentsOverride: TreatmentRow[] | undefined;
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
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
        if (rows.length) next = { ...next, serviceHighlights: rows };
        break;
      }
      case 'serviceOverviewCards':
      case 'serviceOverviewList':
      case 'serviceCards': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToTreatment);
        if (mapped.length) treatmentsOverride = mapped;
        break;
      }
      case 'steps': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ t: str(x.title), d: str(x.description) }))
          : [];
        if (rows.length) next = { ...next, serviceProcess: rows };
        break;
      }
      case 'faq': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ q: str(x.question), a: str(x.answer) }))
          : [];
        if (rows.length) next = { ...next, faq: rows };
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
  if (treatmentsOverride) next = { ...next, treatments: treatmentsOverride };
  return next;
}

export function importSalonModularFromLegacy(content: SiteContent, style: TemplateStyle): ModularPagesV1 {
  const home = emptySections(style, 'home');
  importSalonHomeSections(content, [...home], style);
  const services = emptySections(style, 'services');
  importSalonServicesSections(content, [...services], style);
  const gallery = emptySections(style, 'gallery');
  importGallerySections(content, [...gallery]);
  const about = emptySections(style, 'about');
  importAboutSections(content, [...about], style);
  const contact = emptySections(style, 'contact');
  importContactSections(content, [...contact]);
  return {
    combo: { template: 'salon', style },
    home: { sections: home },
    services: { sections: services },
    gallery: { sections: gallery },
    about: { sections: about },
    contact: { sections: contact },
  };
}

export function applySalonModularToLegacy(content: SiteContent): SiteContent {
  const m = content.modularPagesV1;
  if (!m?.combo || m.combo.template !== 'salon') return content;
  const style = m.combo.style;
  let next: SiteContent = { ...content };
  if (m.home?.sections?.length) next = mergeSalonHomeIntoLegacy(next, m.home.sections, style);
  if (m.services?.sections?.length) next = mergeSalonServicesIntoLegacy(next, m.services.sections, style);
  if (m.gallery?.sections?.length) next = mergeGalleryIntoLegacy(next, m.gallery.sections);
  if (m.about?.sections?.length) next = mergeAboutIntoLegacy(next, m.about.sections);
  if (m.contact?.sections?.length) next = mergeContactIntoLegacy(next, m.contact.sections);
  return next;
}

export function applySalonModularOverlay(content: SiteContent, variant: TemplateKey, style: TemplateStyle): SiteContent {
  if (variant !== 'salon') return content;
  if (!modularComboMatchesTenant(content.modularPagesV1, 'salon', style)) return content;
  if (!hasAnySalonModular(content, style)) return content;
  return applySalonModularToLegacy(content);
}
