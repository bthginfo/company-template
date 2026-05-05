/**
 * Restaurant — spec-modular content (v1) for all styles × subpages.
 * `modularPagesV1.combo` locks template+style; sections per page merge into legacy `SiteContent`.
 */

import type { SiteContent, ModularPagesV1, ModularSectionV1 } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import {
  restaurantModularBlueprint,
  type RestaurantModularPageKey,
  RESTAURANT_SECTION_LABEL_DE,
} from '@/lib/modular-restaurant-blueprints';

export { RESTAURANT_SECTION_LABEL_DE, type RestaurantModularPageKey };

export function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

export function bool(v: unknown, fallback: boolean): boolean {
  return typeof v === 'boolean' ? v : fallback;
}

export function imgUrl(img: unknown): string {
  if (!img || typeof img !== 'object') return '';
  const o = img as { image?: unknown };
  return typeof o.image === 'string' ? o.image : '';
}

export function modularComboMatchesTenant(
  m: ModularPagesV1 | undefined,
  tpl: TemplateKey,
  style: TemplateStyle,
): boolean {
  return !!m?.combo && m.combo.template === tpl && m.combo.style === style;
}

/** True when stored modular data belongs to this template (style may differ — see overlay + admin mismatch hint). */
export function modularComboTemplateMatches(m: ModularPagesV1 | undefined, tpl: TemplateKey): boolean {
  return !!m?.combo && m.combo.template === tpl;
}

export function hasRestaurantModularPage(
  content: SiteContent,
  _style: TemplateStyle,
  page: RestaurantModularPageKey,
): boolean {
  const m = content.modularPagesV1;
  if (!modularComboTemplateMatches(m, 'restaurant') || !m) return false;
  const bundle = page === 'home' ? m.home : page === 'services' ? m.services : page === 'gallery' ? m.gallery : page === 'about' ? m.about : m.contact;
  return (bundle?.sections?.length ?? 0) > 0;
}

export function hasAnyRestaurantModular(content: SiteContent): boolean {
  const pages: RestaurantModularPageKey[] = ['home', 'services', 'gallery', 'about', 'contact'];
  return pages.some((p) => hasRestaurantModularPage(content, 'classic', p));
}

function emptySections(style: TemplateStyle, page: RestaurantModularPageKey): ModularSectionV1[] {
  return restaurantModularBlueprint(style, page).map((type, i) => ({
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

/** Label band stores rows in `labels` (admin form) or legacy `items`; values may be text or image URLs. */
function readLabelBandEntries(d: Record<string, unknown>): string[] {
  const raw = d.labels ?? d.items;
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const it of raw) {
    if (typeof it === 'string') {
      const t = it.trim();
      if (t) out.push(t);
      continue;
    }
    if (!it || typeof it !== 'object') continue;
    const o = it as Record<string, unknown>;
    const text = str(o.text);
    const img = o.image;
    if (img && typeof img === 'object') {
      const u = str((img as { image?: unknown }).image);
      if (u) out.push(u);
    } else if (typeof img === 'string' && img.trim()) {
      out.push(img.trim());
    } else if (text) {
      out.push(text);
    }
  }
  return out;
}

/* ─── Import: Home (all styles) ─── */

function importHomeSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
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
  const sig = content.homeSignature ?? {};
  const fdg = by('featuredDishesGrid');
  if (fdg) {
    const items = (content.homeSignatureItems ?? []).map((row) => ({
      name: str(row.title),
      price: str(row.price),
      description: str(row.description),
      image: { image: str(row.imageUrl), alt: str(row.title) },
    }));
    fdg.data = {
      eyebrow: str(sig.eyebrow),
      titleA: str(sig.titleA),
      titleB: str(sig.titleB),
      description: str(sig.intro),
      items,
    };
  }
  const fds = by('featuredDishes');
  if (fds) {
    const items = (content.homeSignatureItems ?? []).map((row) => ({
      name: str(row.title),
      price: str(row.price),
      description: str(row.description),
      image: { image: str(row.imageUrl), alt: str(row.title) },
    }));
    fds.data = { eyebrow: str(sig.eyebrow), headline: `${str(sig.titleA)} ${str(sig.titleB)}`.trim(), items };
  }
  const fi = by('featuredItems');
  if (fi) {
    const sv = (content.services ?? []).slice(0, 3);
    fi.data = {
      eyebrow: '',
      headline: '',
      description: '',
      metaText: '',
      items: sv.map((row) => ({
        title: str(row.title),
        price: str(row.price),
        description: str(row.description),
        image: { image: str(row.imageUrl), alt: str(row.title) },
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
  const lb = by('labelBand');
  if (lb) {
    lb.data = { labels: (content.logos ?? []).map((text) => ({ text: typeof text === 'string' ? text : '' })) };
  }
  const te = by('testimonials');
  if (te) {
    te.data = {
      eyebrow: str(content.branchText?.testimonialsEyebrow),
      headline: str(content.branchText?.testimonialsTitle),
      testimonials: (content.testimonials ?? []).map((t) => ({ name: str(t.author), quote: str(t.text) })),
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
}

function importServicesSections(content: SiteContent, sections: ModularSectionV1[]): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  const nb = by('noticeBanner');
  if (nb) {
    const lines = (content.announcements ?? []).filter(Boolean);
    nb.data = { isVisible: true, items: lines.map((text) => ({ text })) };
  }
  const hero = by('hero');
  if (hero) {
    const sh = content.servicesHeader ?? {};
    hero.data = {
      eyebrow: str(sh.eyebrow),
      headline: str(sh.title),
      subline: str(sh.subtitle),
      description: '',
      image: { image: str(content.branchText?.servicesPageImageUrl), alt: '' },
    };
  }
  const hb = by('highlightsBar');
  if (hb) {
    hb.data = {
      items: (content.serviceHighlights ?? []).map((h) => ({ title: str(h.t), description: str(h.d) })),
    };
  }
  const menu = by('menu');
  if (menu) {
    const mh = (content.moduleHeadings?.menu ?? {}) as Record<string, string>;
    menu.data = {
      categories: JSON.parse(JSON.stringify(content.menu ?? [])),
      eyebrow: str(mh.eyebrow),
      titleA: str(mh.titleA),
      titleB: str(mh.titleB),
      subtitle: str(mh.subtitle),
    };
  }
  const st = by('steps');
  if (st) {
    st.data = {
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

export function importGallerySections(content: SiteContent, sections: ModularSectionV1[]): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  const nb = by('noticeBanner');
  if (nb) {
    const lines = (content.announcements ?? []).filter(Boolean);
    nb.data = { isVisible: true, items: lines.map((text) => ({ text })) };
  }
  const hero = by('hero');
  if (hero) {
    const gh = content.galleryHeader ?? {};
    hero.data = { eyebrow: str(gh.eyebrow), headline: str(gh.title), description: str(gh.subtitle) };
  }
  const tls = sections.filter((s) => s.type === 'teaserList');
  if (tls[0]) {
    const gs = content.galleryStory ?? {};
    const body = str(gs.body);
    tls[0].data = {
      eyebrow: str(gs.eyebrow),
      headline: str(gs.title),
      intro: body,
      items: (gs.captions ?? []).map((c) => ({ title: str(c.t), description: str(c.d) })),
    };
  }
  const gal = by('gallery');
  if (gal) {
    gal.data = {
      lightboxEnabled: true,
      images: (content.gallery ?? []).map((url) => ({ image: url, alt: '' })),
    };
  }
  if (tls[1]) {
    tls[1].data = {
      eyebrow: str(content.branchText?.galleryCategoriesEyebrow),
      headline: str(content.branchText?.galleryCategoriesTitle),
      items: (content.galleryCategories ?? []).map((c) => ({ title: str(c.t), description: str(c.d) })),
    };
  }
  const cta = by('cta');
  if (cta) {
    const o = (content.ctaBandOverrides ?? {}).gallery ?? {};
    cta.data = {
      eyebrow: str((o as { eyebrow?: unknown }).eyebrow),
      headline: str((o as { lead?: unknown }).lead),
      subline: str((o as { sub?: unknown }).sub),
      button: { label: str((o as { cta?: unknown }).cta), linkType: 'internal', internalPage: str((o as { ctaHref?: unknown }).ctaHref), externalUrl: '' },
    };
  }
}

export function importAboutSections(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  const nb = by('noticeBanner');
  if (nb) {
    const lines = (content.announcements ?? []).filter(Boolean);
    nb.data = { isVisible: true, items: lines.map((text) => ({ text })) };
  }
  const hero = by('hero');
  if (hero) {
    const ah = content.aboutHeader ?? {};
    const body = str(content.about?.body);
    hero.data = {
      eyebrow: str(ah.eyebrow),
      headline: str(ah.title),
      description: body || str(ah.subtitle),
      image: { image: str(content.about?.imageUrl), alt: '' },
    };
  }
  const sf = by('storyFacts');
  if (sf) {
    const items = (content.aboutNumbers ?? []).map((n) => ({ label: str(n.label), value: str(n.value) }));
    sf.data = { description: str(content.about?.body), items };
  }
  const tl = by('teaserList');
  if (tl) {
    tl.data = {
      eyebrow: str(content.branchText?.valuesEyebrow),
      headline: str(content.branchText?.valuesTitle),
      items: (content.values ?? []).map((v) => ({ title: str(v.t), description: str(v.d) })),
    };
  }
  const tm = by('timeline');
  if (tm) {
    tm.data = {
      items: (content.timeline ?? []).map((e) => ({
        yearOrMarker: str(e.year),
        title: str(e.title),
        description: str(e.description),
      })),
    };
  }
  const team = by('team');
  if (team) {
    team.data = {
      eyebrow: str(content.branchText?.teamEyebrow),
      headline: str(content.branchText?.teamTitle),
      items: (content.team ?? []).map((p) => ({
        name: str(p.n),
        role: str(p.r),
        description: str(p.bio),
        image: { image: str(p.img), alt: str(p.n) },
      })),
    };
  }
  const sb = by('statsBand');
  if (sb) {
    sb.data = { items: (content.aboutNumbers ?? []).map((n) => ({ value: str(n.value), description: str(n.label) })) };
  }
  const eq = by('expertQuotes');
  if (eq) {
    eq.data = {
      eyebrow: str(content.branchText?.pressEyebrow),
      headline: str(content.branchText?.pressTitle),
      items: (content.press ?? []).map((p) => ({
        quote: str(p.q),
        source: str(p.src),
        year: str(p.y),
      })),
    };
  }
  const te = by('testimonials');
  if (te) {
    te.data = {
      eyebrow: str(content.branchText?.aboutTestimonialsEyebrow) || str(content.branchText?.testimonialsEyebrow),
      headline: str(content.branchText?.aboutTestimonialsTitle) || str(content.branchText?.testimonialsTitle),
      testimonials: (content.testimonials ?? []).map((t) => ({ name: str(t.author), quote: str(t.text) })),
    };
  }
  const cta = by('cta');
  if (cta) {
    const o = (content.ctaBandOverrides ?? {}).about ?? {};
    cta.data = {
      eyebrow: str((o as { eyebrow?: unknown }).eyebrow),
      headline: str((o as { lead?: unknown }).lead),
      subline: str((o as { sub?: unknown }).sub),
      button: { label: str((o as { cta?: unknown }).cta), linkType: 'internal', internalPage: str((o as { ctaHref?: unknown }).ctaHref), externalUrl: '' },
    };
  }
  void style;
}

export function importContactSections(content: SiteContent, sections: ModularSectionV1[]): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  const nb = by('noticeBanner');
  if (nb) {
    const lines = (content.announcements ?? []).filter(Boolean);
    nb.data = { isVisible: true, items: lines.map((text) => ({ text })) };
  }
  const hero = by('hero');
  if (hero) {
    const ch = content.contactPageHeader ?? {};
    hero.data = { eyebrow: str(ch.eyebrow), headline: str(ch.title), subline: str(ch.subtitle) };
  }
  const cd = by('contactDetails');
  if (cd) {
    const cb = content.contactBlock ?? {};
    cd.data = {
      eyebrow: str(cb.eyebrow),
      headline: str(cb.title),
      subline: str(cb.subtitle),
      googleMapsUrl: str(content.contact.mapsUrl),
      additionalFormFields: (content.formFields ?? []).map((f) => ({
        fieldKey: str(f.key),
        label: str(f.label),
        fieldType: str(f.type),
        placeholder: '',
        required: bool(f.required, false),
      })),
    };
  }
  const loc = by('locations');
  if (loc) {
    loc.data = {
      locations: (content.locations ?? []).map((l) => ({
        name: str(l.name),
        phone: str(l.phone),
        email: str(l.email),
        address: str(l.address),
        cityPostalCode: str(l.city),
        googleMapsUrl: str(l.mapsUrl),
        openingHours: (l.hours ?? []).map((h) => ({ days: str(h.day), time: str(h.time) })),
      })),
    };
  }
  const dir = by('directions');
  if (dir) {
    const ar = content.arrivalSection ?? {};
    dir.data = {
      eyebrow: str(ar.eyebrow),
      headline: str(ar.title),
      subline: str(ar.subtitle),
      items: (content.arrival ?? []).map((a) => ({ title: str(a.t), description: str(a.d) })),
    };
  }
  const cta = by('cta');
  if (cta) {
    const o = (content.ctaBandOverrides ?? {}).contact ?? {};
    cta.data = {
      eyebrow: str((o as { eyebrow?: unknown }).eyebrow),
      headline: str((o as { lead?: unknown }).lead),
      subline: str((o as { sub?: unknown }).sub),
      button: { label: str((o as { cta?: unknown }).cta), linkType: 'internal', internalPage: str((o as { ctaHref?: unknown }).ctaHref), externalUrl: '' },
    };
  }
}

export function importRestaurantModularFromLegacy(content: SiteContent, style: TemplateStyle): ModularPagesV1 {
  const home = emptySections(style, 'home');
  importHomeSections(content, [...home], style);
  const services = emptySections(style, 'services');
  importServicesSections(content, [...services]);
  const gallery = emptySections(style, 'gallery');
  importGallerySections(content, [...gallery]);
  const about = emptySections(style, 'about');
  importAboutSections(content, [...about], style);
  const contact = emptySections(style, 'contact');
  importContactSections(content, [...contact]);
  return {
    combo: { template: 'restaurant', style },
    home: { sections: home },
    services: { sections: services },
    gallery: { sections: gallery },
    about: { sections: about },
    contact: { sections: contact },
  };
}

export function mergeNoticeBanner(next: SiteContent, d: Record<string, unknown>): SiteContent {
  const lines = readItems(d).map((x) => x.text);
  return lines.length ? { ...next, announcements: lines } : next;
}

export function mergeHeroToPageHeader(
  next: SiteContent,
  d: Record<string, unknown>,
  headerKey: 'servicesHeader' | 'galleryHeader' | 'aboutHeader' | 'contactPageHeader',
  imageBranchKey?: 'servicesPageImageUrl',
): SiteContent {
  const cur = (next as Record<string, unknown>)[headerKey] as Record<string, unknown> | undefined;
  const img = imageBranchKey && d.image ? imgUrl(d.image) : '';
  const patch = {
    eyebrow: str(d.eyebrow) || str(cur?.eyebrow),
    title: str(d.headline) || str(d.title) || str(cur?.title),
    subtitle: str(d.subline) || str(d.description) || str(cur?.subtitle),
  };
  const o = { ...next, [headerKey]: { ...cur, ...patch } } as SiteContent;
  if (img && imageBranchKey) {
    return { ...o, branchText: { ...o.branchText, [imageBranchKey]: img } };
  }
  return o;
}

/** Shared home merge for section types also used by Hotel modular (v1). */
export function mergeHomeIntoLegacy(
  content: SiteContent,
  sections: ModularSectionV1[],
  style: TemplateStyle,
  templateKey: TemplateKey = 'restaurant',
): SiteContent {
  let next: SiteContent = { ...content };
  let statsBandPass = 0;
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    switch (sec.type) {
      case 'noticeBanner':
        next = mergeNoticeBanner(next, d as Record<string, unknown>);
        break;
      case 'hero': {
        const stats = Array.isArray((d as { stats?: unknown }).stats)
          ? ((d as { stats: unknown[] }).stats as { value?: unknown; description?: unknown }[])
          : [];
        const numbers = stats.filter((s) => s && typeof s === 'object').map((s) => ({ value: str(s.value), label: str(s.description) }));
        const bp = (d as { buttonPrimary?: unknown }).buttonPrimary as Record<string, unknown> | undefined;
        const bg = (d as { backgroundImage?: unknown }).backgroundImage;
        const cardImg = (d as { image?: unknown }).image;
        next = {
          ...next,
          hero: {
            ...next.hero,
            title: str((d as { headline?: unknown }).headline) || next.hero.title,
            subtitle: str((d as { subline?: unknown }).subline),
            body: str((d as { description?: unknown }).description),
            imageUrl: style === 'classic' ? (imgUrl(bg) || next.hero.imageUrl) : next.hero.imageUrl,
            ctaLabel: str(bp?.label) || next.hero.ctaLabel,
            ctaHref: str(bp?.internalPage) || str(bp?.externalUrl) || next.hero.ctaHref,
          },
          branchText: {
            ...next.branchText,
            heroEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            ...(style !== 'classic' && cardImg
              ? { heroImageUrl: imgUrl(cardImg) }
              : {}),
          },
          heroCta: {
            ...next.heroCta,
            primaryLabel: str(bp?.label),
            primaryHref: str(bp?.internalPage) || str(bp?.externalUrl),
          },
        };
        if (numbers.length) next = { ...next, numbers };
        break;
      }
      case 'actionBar': {
        const bp = (d as { buttonPrimary?: unknown }).buttonPrimary as Record<string, unknown> | undefined;
        const bs = (d as { buttonSecondary?: unknown }).buttonSecondary as Record<string, unknown> | undefined;
        next = {
          ...next,
          homeStrip: {
            ...next.homeStrip,
            eyebrowAuto: bool((d as { autoAvailabilityStatusEnabled?: unknown }).autoAvailabilityStatusEnabled, true),
            eyebrow: str((d as { availabilityStatusOverride?: unknown }).availabilityStatusOverride),
            primaryLabel: str(bp?.label),
            primaryHref: str(bp?.internalPage) || str(bp?.externalUrl) || 'tel:',
            secondaryLabel: str(bs?.label),
            secondaryHref: str(bs?.internalPage) || str(bs?.externalUrl),
          },
        };
        break;
      }
      case 'marqueeBand': {
        const items = readItems(d as Record<string, unknown>).map((x) => x.text);
        if (items.length) next = { ...next, branchText: { ...next.branchText, marqueeWords: items } };
        break;
      }
      case 'featuredDishesGrid':
      case 'featuredDishes': {
        const itemsRaw = (d as { items?: unknown }).items;
        const rows = Array.isArray(itemsRaw)
          ? itemsRaw
              .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
              .map((it) => {
                const im = it.image as Record<string, unknown> | undefined;
                return {
                  title: str(it.name ?? it.title),
                  price: str(it.price),
                  description: str(it.description),
                  imageUrl: im ? str(im.image) : '',
                };
              })
          : [];
        next = {
          ...next,
          homeSignature: {
            ...next.homeSignature,
            eyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            titleA: str((d as { titleA?: unknown }).titleA) || str((d as { headline?: unknown }).headline),
            titleB: str((d as { titleB?: unknown }).titleB),
            intro: str((d as { description?: unknown }).description),
          },
          homeSignatureItems: rows.length ? rows : next.homeSignatureItems,
        };
        break;
      }
      case 'featuredItems': {
        if (templateKey === 'restaurant' && style === 'classic') break;
        const itemsRaw = (d as { items?: unknown }).items;
        const rows = Array.isArray(itemsRaw)
          ? itemsRaw
              .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
              .slice(0, 3)
              .map((it) => {
                const im = it.image as Record<string, unknown> | undefined;
                return {
                  title: str(it.title),
                  price: str(it.price),
                  description: str(it.description),
                  imageUrl: im ? str(im.image) : '',
                };
              })
          : [];
        if (rows.length) {
          const base = [...(next.services ?? [])];
          rows.forEach((r, i) => {
            const cur = base[i] ?? { title: '', description: '', price: '', imageUrl: '' };
            base[i] = { ...cur, ...r };
          });
          next = { ...next, services: base };
        }
        break;
      }
      case 'storyTeaser': {
        const im = (d as { image?: unknown }).image as Record<string, unknown> | undefined;
        const btn = (d as { button?: unknown }).button as Record<string, unknown> | undefined;
        next = {
          ...next,
          about: {
            ...(next.about ?? { title: '', body: '', imageUrl: '' }),
            title: str((d as { headline?: unknown }).headline),
            body: str((d as { description?: unknown }).description),
            imageUrl: im ? str(im.image) : (next.about?.imageUrl ?? ''),
          },
          branchText: {
            ...next.branchText,
            aboutTeaserEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            learnMoreLabel: str(btn?.label),
            learnMoreHref: str(btn?.internalPage) || str(btn?.externalUrl),
          },
        };
        break;
      }
      case 'galleryPreview': {
        const imgsRaw = (d as { images?: unknown }).images;
        const urls = Array.isArray(imgsRaw)
          ? imgsRaw.map((it) => (it && typeof it === 'object' ? str((it as { image?: unknown }).image) : '')).filter(Boolean)
          : [];
        const btn = (d as { button?: unknown }).button as Record<string, unknown> | undefined;
        const btnLabel = str(btn?.label);
        const btnHref = str(btn?.internalPage) || str(btn?.externalUrl);
        next = {
          ...next,
          branchText: {
            ...next.branchText,
            galleryTeaserEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            galleryTeaserTitle: str((d as { headline?: unknown }).headline),
            ...(btnLabel ? { galleryAllLabel: btnLabel } : {}),
            ...(btnHref ? { galleryAllHref: btnHref } : {}),
          },
          gallery: urls.length ? urls : (next.gallery ?? []),
        };
        break;
      }
      case 'labelBand': {
        const labels = readLabelBandEntries(d as Record<string, unknown>);
        if (labels.length) next = { ...next, logos: labels };
        break;
      }
      case 'testimonials': {
        const tr = (d as { testimonials?: unknown }).testimonials;
        const list = Array.isArray(tr)
          ? tr.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map((it) => ({ author: str(it.name), text: str(it.quote) }))
          : [];
        if (list.length) {
          next = {
            ...next,
            testimonials: list,
            branchText: {
              ...next.branchText,
              testimonialsEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
              testimonialsTitle: str((d as { headline?: unknown }).headline),
            },
          };
        }
        break;
      }
      case 'statsBand': {
        const it = (d as { items?: unknown }).items;
        const nums = Array.isArray(it)
          ? it.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ value: str(x.value), label: str(x.description) }))
          : [];
        if (nums.length) {
          statsBandPass += 1;
          if (statsBandPass > 1) {
            next = { ...next, numbers: [...(next.numbers ?? []), ...nums] };
          } else {
            next = { ...next, numbers: nums };
          }
        }
        break;
      }
      case 'newsTeaser': {
        const btn = (d as { button?: unknown }).button as Record<string, unknown> | undefined;
        const btnLabel = str(btn?.label);
        const btnHref = str(btn?.internalPage) || str(btn?.externalUrl);
        next = {
          ...next,
          branchText: {
            ...next.branchText,
            newsEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            newsTitle: str((d as { headline?: unknown }).headline),
            ...(btnLabel ? { newsAllLabel: btnLabel } : {}),
            ...(btnHref ? { newsAllHref: btnHref } : {}),
          },
        };
        break;
      }
      case 'cta': {
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
        break;
      }
      default:
        break;
    }
  }
  return next;
}

function mergeServicesIntoLegacy(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next: SiteContent = { ...content };
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    switch (sec.type) {
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
      case 'menu': {
        const cats = (d as { categories?: unknown }).categories;
        const ey = str((d as { eyebrow?: unknown }).eyebrow);
        const ta = str((d as { titleA?: unknown }).titleA);
        const tb = str((d as { titleB?: unknown }).titleB);
        const su = str((d as { subtitle?: unknown }).subtitle);
        let o = { ...next };
        if (Array.isArray(cats)) o = { ...o, menu: cats as SiteContent['menu'] };
        if (ey || ta || tb || su) {
          const mh = ((o as { moduleHeadings?: Record<string, Record<string, string>> }).moduleHeadings ?? {}) as Record<
            string,
            Record<string, string>
          >;
          o = {
            ...o,
            moduleHeadings: {
              ...mh,
              menu: {
                ...(mh.menu ?? {}),
                ...(ey ? { eyebrow: ey } : {}),
                ...(ta ? { titleA: ta } : {}),
                ...(tb ? { titleB: tb } : {}),
                ...(su ? { subtitle: su } : {}),
              },
            },
          } as SiteContent;
        }
        next = o;
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
        const fey = (d as { eyebrow?: unknown }).eyebrow;
        const fht = (d as { headline?: unknown }).headline;
        const btPatch: Record<string, string> = {};
        if (typeof fey === 'string') btPatch.faqEyebrow = fey;
        if (typeof fht === 'string') btPatch.faqTitle = fht;
        next = {
          ...next,
          ...(Object.keys(btPatch).length ? { branchText: { ...next.branchText, ...btPatch } } : {}),
          ...(rows.length ? { faq: rows } : {}),
        } as SiteContent;
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
  return next;
}

export function mergeGalleryIntoLegacy(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next: SiteContent = { ...content };
  let teaserIdx = 0;
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    if (sec.type === 'hero') next = mergeHeroToPageHeader(next, d as Record<string, unknown>, 'galleryHeader');
    else if (sec.type === 'teaserList') {
      if (teaserIdx === 0) {
        const raw = (d as { items?: unknown }).items;
        const caps = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ t: str(x.title), d: str(x.description) }))
          : [];
        const intro =
          str((d as { intro?: unknown }).intro) ||
          str((d as { description?: unknown }).description);
        next = {
          ...next,
          galleryStory: {
            eyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            title: str((d as { headline?: unknown }).headline),
            body: intro,
            captions: caps.length ? caps : next.galleryStory?.captions ?? [],
          },
        };
        teaserIdx += 1;
      } else {
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
          galleryCategories: rows.length ? rows : next.galleryCategories,
        };
      }
    } else if (sec.type === 'gallery') {
      const imgsRaw = (d as { images?: unknown }).images;
      const urls = Array.isArray(imgsRaw)
        ? imgsRaw.map((it) => (it && typeof it === 'object' ? str((it as { image?: unknown }).image) : '')).filter(Boolean)
        : [];
      if (urls.length) next = { ...next, gallery: urls };
    } else if (sec.type === 'cta') {
      const btn = (d as { button?: unknown }).button as Record<string, unknown> | undefined;
      const all = { ...(next.ctaBandOverrides ?? {}) };
      all.gallery = {
        ...(next.ctaBandOverrides?.gallery ?? {}),
        eyebrow: str((d as { eyebrow?: unknown }).eyebrow),
        lead: str((d as { headline?: unknown }).headline),
        sub: str((d as { subline?: unknown }).subline),
        cta: str(btn?.label),
        ctaHref: str(btn?.internalPage) || str(btn?.externalUrl),
      };
      next = { ...next, ctaBandOverrides: all } as SiteContent;
    }
  }
  return next;
}

export function mergeAboutIntoLegacy(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next: SiteContent = { ...content };
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    switch (sec.type) {
      case 'hero': {
        const im = (d as { image?: unknown }).image;
        const bodyText = str((d as { description?: unknown }).description);
        next = mergeHeroToPageHeader(next, d as Record<string, unknown>, 'aboutHeader');
        next = {
          ...next,
          about: {
            ...(next.about ?? { title: '', body: '', imageUrl: '' }),
            ...(bodyText ? { body: bodyText } : {}),
            ...(im ? { imageUrl: imgUrl(im) } : {}),
          },
        };
        break;
      }
      case 'storyFacts': {
        const desc = str((d as { description?: unknown }).description);
        const raw = (d as { items?: unknown }).items;
        const nums = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ label: str(x.label), value: str(x.value) }))
          : [];
        next = {
          ...next,
          ...(desc.trim()
            ? { about: { ...(next.about ?? { title: '', body: '', imageUrl: '' }), body: desc } }
            : {}),
          ...(nums.length ? { aboutNumbers: nums } : {}),
        } as SiteContent;
        break;
      }
      case 'teaserList': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ t: str(x.title), d: str(x.description) }))
          : [];
        next = {
          ...next,
          branchText: {
            ...next.branchText,
            valuesEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            valuesTitle: str((d as { headline?: unknown }).headline),
          },
          values: rows.length ? rows : next.values,
        };
        break;
      }
      case 'timeline': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({
              year: str(x.yearOrMarker),
              title: str(x.title),
              description: str(x.description),
            }))
          : [];
        if (rows.length) next = { ...next, timeline: rows };
        break;
      }
      case 'team': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({
              n: str(x.name),
              r: str(x.role),
              bio: str(x.description),
              img: imgUrl(x.image),
            }))
          : [];
        if (rows.length) next = { ...next, team: rows };
        break;
      }
      case 'statsBand': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ label: str(x.description), value: str(x.value) }))
          : [];
        if (rows.length) next = { ...next, aboutNumbers: rows };
        break;
      }
      case 'expertQuotes': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({
              q: str(x.quote),
              src: str(x.source),
              y: str(x.year),
              url: '',
            }))
          : [];
        next = {
          ...next,
          ...(rows.length ? { press: rows } : {}),
          branchText: {
            ...next.branchText,
            pressEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            pressTitle: str((d as { headline?: unknown }).headline),
          },
        } as SiteContent;
        break;
      }
      case 'testimonials': {
        const tr = (d as { testimonials?: unknown }).testimonials;
        const list = Array.isArray(tr)
          ? tr.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map((it) => ({ author: str(it.name), text: str(it.quote) }))
          : [];
        next = {
          ...next,
          ...(list.length ? { testimonials: list } : {}),
          branchText: {
            ...next.branchText,
            aboutTestimonialsEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            aboutTestimonialsTitle: str((d as { headline?: unknown }).headline),
          },
        } as SiteContent;
        break;
      }
      case 'cta': {
        const btn = (d as { button?: unknown }).button as Record<string, unknown> | undefined;
        const all = { ...(next.ctaBandOverrides ?? {}) };
        all.about = {
          ...(next.ctaBandOverrides?.about ?? {}),
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
  return next;
}

export function mergeContactIntoLegacy(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next: SiteContent = { ...content };
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    switch (sec.type) {
      case 'hero':
        next = mergeHeroToPageHeader(next, d as Record<string, unknown>, 'contactPageHeader');
        break;
      case 'contactDetails': {
        next = {
          ...next,
          contactBlock: {
            eyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            title: str((d as { headline?: unknown }).headline),
            subtitle: str((d as { subline?: unknown }).subline),
          },
          contact: { ...next.contact, mapsUrl: str((d as { googleMapsUrl?: unknown }).googleMapsUrl) },
        };
        const ff = (d as { additionalFormFields?: unknown }).additionalFormFields;
        if (Array.isArray(ff)) {
          const used = new Set<string>();
          const mapped = ff
            .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
            .map((x) => {
              const label = str(x.label);
              const explicit = str((x as { fieldKey?: unknown }).fieldKey).trim().toLowerCase();
              const fromLabel = label
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '_')
                .replace(/^_+|_+$/g, '')
                .slice(0, 48);
              let key = explicit && /^[a-z][a-z0-9_]*$/.test(explicit) ? explicit : fromLabel;
              if (!key) key = 'feld';
              let candidate = key;
              let n = 2;
              while (used.has(candidate)) {
                candidate = `${key}_${n}`;
                n += 1;
              }
              used.add(candidate);
              return {
                key: candidate,
                label,
                required: bool(x.required, false),
                type: (['text', 'email', 'tel', 'textarea', 'date'].includes(str(x.fieldType)) ? str(x.fieldType) : 'text') as 'text' | 'email' | 'tel' | 'textarea' | 'date',
              };
            });
          next = { ...next, formFields: mapped };
        }
        break;
      }
      case 'locations': {
        const raw = (d as { locations?: unknown }).locations;
        if (!Array.isArray(raw)) break;
        const locs = raw
          .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
          .map((x) => ({
            name: str(x.name),
            phone: str(x.phone),
            email: str(x.email),
            address: str(x.address),
            city: str(x.cityPostalCode),
            mapsUrl: str(x.googleMapsUrl),
            hours: Array.isArray(x.openingHours)
              ? (x.openingHours as unknown[]).filter((h): h is Record<string, unknown> => !!h && typeof h === 'object').map((h) => ({
                  day: str(h.days),
                  time: str(h.time),
                }))
              : [],
          }));
        if (locs.length) next = { ...next, locations: locs };
        break;
      }
      case 'directions': {
        const raw = (d as { items?: unknown }).items;
        const rows = Array.isArray(raw)
          ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ t: str(x.title), d: str(x.description) }))
          : [];
        next = {
          ...next,
          arrivalSection: {
            eyebrow: str((d as { eyebrow?: unknown }).eyebrow),
            title: str((d as { headline?: unknown }).headline),
            subtitle: str((d as { subline?: unknown }).subline),
          },
          arrival: rows.length ? rows : next.arrival,
        };
        break;
      }
      case 'cta': {
        const btn = (d as { button?: unknown }).button as Record<string, unknown> | undefined;
        const all = { ...(next.ctaBandOverrides ?? {}) };
        all.contact = {
          ...(next.ctaBandOverrides?.contact ?? {}),
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
  return next;
}

export function applyRestaurantModularToLegacy(content: SiteContent): SiteContent {
  const m = content.modularPagesV1;
  if (!m?.combo || m.combo.template !== 'restaurant') return content;
  const style = m.combo.style;
  let next: SiteContent = { ...content };
  if (m.home?.sections?.length) next = mergeHomeIntoLegacy(next, m.home.sections, style, 'restaurant');
  if (m.services?.sections?.length) next = mergeServicesIntoLegacy(next, m.services.sections);
  if (m.gallery?.sections?.length) next = mergeGalleryIntoLegacy(next, m.gallery.sections);
  if (m.about?.sections?.length) next = mergeAboutIntoLegacy(next, m.about.sections);
  if (m.contact?.sections?.length) next = mergeContactIntoLegacy(next, m.contact.sections);
  return next;
}

export function applyRestaurantModularOverlay(
  content: SiteContent,
  variant: TemplateKey,
  _runtimeStyle: TemplateStyle,
): SiteContent {
  if (variant !== 'restaurant') return content;
  if (!modularComboTemplateMatches(content.modularPagesV1, 'restaurant')) return content;
  if (!hasAnyRestaurantModular(content)) return content;
  return applyRestaurantModularToLegacy(content);
}

/** @deprecated Use hasRestaurantModularPage / hasAnyRestaurantModular */
export function hasActiveModularHome(
  content: SiteContent,
  tpl: TemplateKey,
  style: TemplateStyle,
): boolean {
  return tpl === 'restaurant' && hasRestaurantModularPage(content, style, 'home');
}

/** @deprecated Use applyRestaurantModularOverlay */
export function applyModularHomeOverlay(
  content: SiteContent,
  variant: TemplateKey,
  style: TemplateStyle,
): SiteContent {
  return applyRestaurantModularOverlay(content, variant, style);
}

export function importRestaurantClassicHomeFromLegacy(content: SiteContent): ModularPagesV1 {
  return importRestaurantModularFromLegacy(content, 'classic');
}

export function applyRestaurantClassicModularToLegacy(content: SiteContent): SiteContent {
  return applyRestaurantModularToLegacy(content);
}
