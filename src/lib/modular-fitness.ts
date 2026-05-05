/**
 * Fitness — spec-modular v1 (`docs/spec-fitness.md`).
 */

import type { SiteContent, ModularPagesV1, ModularSectionV1 } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import {
  fitnessModularBlueprint,
  type FitnessModularPageKey,
  FITNESS_SECTION_LABEL_DE,
} from '@/lib/modular-fitness-blueprints';
import {
  str,
  modularComboTemplateMatches,
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
import { mapModularItemToCourse, mapModularItemToPackage, mapModularTeamToLegacy } from '@/lib/modular-catalog-mappers';

export { FITNESS_SECTION_LABEL_DE, type FitnessModularPageKey };

type CourseRow = NonNullable<SiteContent['courses']>[number];
type ProgramRow = NonNullable<SiteContent['programs']>[number];

const DEFAULT_COURSE_ROW: CourseRow = {
  name: '',
  description: '',
  schedule: '',
  level: '',
  duration: '',
  trainer: '',
  price: '',
  imageUrl: '',
  detailSlug: '',
  detailPublished: true,
  detailSubtitle: '',
  detailBody: '',
  detailBodyHtml: '',
  detailGallery: [],
};

/** Maps a legacy `courses` row to the `programs` shape used by admin + `FitnessPrograms`. */
function courseRowToProgram(row: CourseRow): ProgramRow {
  const metaParts = [row.schedule, row.level, row.duration, row.trainer, row.price].map((s) => str(s)).filter(Boolean);
  return {
    k: '',
    t: str(row.name),
    d: str(row.description),
    meta: metaParts.join(' · '),
  };
}

/**
 * Modular import reads `courses` for classCards/programTable/trainingPlanOverview.
 * When tenants only filled `programs` (classic admin), still hydrate modular from that.
 */
function coursesForFitnessModularImport(content: SiteContent): NonNullable<SiteContent['courses']> {
  const courses = content.courses ?? [];
  if (courses.length) return courses;
  const raw = content.programs as unknown[] | undefined;
  return (raw ?? [])
    .filter((p): p is Record<string, unknown> => !!p && typeof p === 'object')
    .map((pr) => ({
      ...DEFAULT_COURSE_ROW,
      name: str(pr.t ?? pr.title),
      description: str(pr.d ?? pr.description),
      schedule: str(pr.meta ?? pr.subtitle),
    }))
    .filter((c) => c.name || c.description || c.schedule);
}

export function hasFitnessModularPage(content: SiteContent, _style: TemplateStyle, page: FitnessModularPageKey): boolean {
  const m = content.modularPagesV1;
  if (!modularComboTemplateMatches(m, 'fitness') || !m) return false;
  const bundle =
    page === 'home' ? m.home : page === 'services' ? m.services : page === 'gallery' ? m.gallery : page === 'about' ? m.about : m.contact;
  return (bundle?.sections?.length ?? 0) > 0;
}

export function hasAnyFitnessModular(content: SiteContent): boolean {
  return (['home', 'services', 'gallery', 'about', 'contact'] as const).some((p) => hasFitnessModularPage(content, 'classic', p));
}

function emptySections(style: TemplateStyle, page: FitnessModularPageKey): ModularSectionV1[] {
  return fitnessModularBlueprint(style, page).map((type, i) => ({
    id: `${page}-${type}-${i}`,
    type,
    isVisible: true,
    data: {},
  }));
}

function mergeFitnessGalleryExtras(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next = content;
  for (const sec of sections) {
    if (sec.isVisible === false || sec.type !== 'categoryCards') continue;
    const d = sec.data ?? {};
    const raw = (d as { items?: unknown }).items;
    const rows = Array.isArray(raw)
      ? raw.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object').map((x) => ({ t: str(x.title), d: str(x.description) }))
      : [];
    if (rows.length) {
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
  }
  return next;
}

function mergeFitnessHomeSupplements(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
  let next: SiteContent = { ...content };
  for (const sec of sections) {
    if (sec.isVisible === false) continue;
    const d = sec.data ?? {};
    if (sec.type === 'keywordBand') {
      const raw = (d as { items?: unknown }).items;
      if (Array.isArray(raw)) {
        const lines = raw
          .map((it) => (it && typeof it === 'object' ? str((it as { text?: unknown }).text) : ''))
          .filter(Boolean);
        if (lines.length) next = { ...next, logos: lines };
      }
    } else if (sec.type === 'classCards') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToCourse);
      if (mapped.length) {
        const curC = [...(next.courses ?? [])];
        const curP = [...(next.programs ?? [])];
        const emptyProg: ProgramRow = { k: '', t: '', d: '', meta: '' };
        mapped.forEach((row, i) => {
          const mergedC = { ...(curC[i] ?? DEFAULT_COURSE_ROW), ...row };
          curC[i] = mergedC;
          curP[i] = { ...(curP[i] ?? emptyProg), ...courseRowToProgram(mergedC) };
        });
        next = { ...next, courses: curC, programs: curP };
      }
    } else if (sec.type === 'trainingPlanOverview') {
      const statsRaw = (d as { stats?: unknown }).stats;
      const nums = Array.isArray(statsRaw)
        ? statsRaw
            .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
            .map((x) => ({ value: str(x.value), label: str(x.description) }))
        : [];
      if (nums.length) next = { ...next, numbers: nums };
    } else if (sec.type === 'pricingPackages') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const packs = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToPackage);
      if (packs.length) next = { ...next, packages: packs };
    } else if (sec.type === 'trainers') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const team = raw
        .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
        .map(mapModularTeamToLegacy)
        .filter((m) => m.n || m.r || m.bio);
      if (team.length) next = { ...next, team };
    }
  }
  return next;
}

function mergeFitnessHomeIntoLegacy(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): SiteContent {
  let n = mergeHomeIntoLegacy(content, sections, style, 'fitness');
  n = mergeFitnessHomeSupplements(n, sections);
  return n;
}

function mergeFitnessServicesIntoLegacy(content: SiteContent, sections: ModularSectionV1[], _style: TemplateStyle): SiteContent {
  let next: SiteContent = { ...content };
  let coursesOverride: NonNullable<SiteContent['courses']> | undefined;
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
      case 'classCards': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToCourse);
        if (mapped.length) coursesOverride = mapped;
        break;
      }
      case 'trainingPlanOverview': {
        const statsRaw = (d as { stats?: unknown }).stats;
        const nums = Array.isArray(statsRaw)
          ? statsRaw
              .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
              .map((x) => ({ value: str(x.value), label: str(x.description) }))
          : [];
        if (nums.length) next = { ...next, numbers: nums };
        break;
      }
      case 'pricingPackages': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const packs = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToPackage);
        if (packs.length) next = { ...next, packages: packs };
        break;
      }
      case 'testimonials': {
        const raw = (d as { items?: unknown }).items;
        const list = Array.isArray(raw)
          ? raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map((it) => ({ author: str(it.name), text: str(it.quote) }))
          : [];
        if (list.length) next = { ...next, testimonials: list };
        break;
      }
      case 'galleryPreview': {
        const imgsRaw = (d as { images?: unknown }).images;
        const urls = Array.isArray(imgsRaw)
          ? imgsRaw.map((it) => (it && typeof it === 'object' ? str((it as { image?: unknown }).image) : '')).filter(Boolean)
          : [];
        if (urls.length) {
          next = {
            ...next,
            branchText: {
              ...next.branchText,
              galleryTeaserEyebrow: str((d as { eyebrow?: unknown }).eyebrow),
              galleryTeaserTitle: str((d as { headline?: unknown }).headline),
            },
            gallery: [...urls, ...(next.gallery ?? []).slice(urls.length)],
          };
        }
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
  if (coursesOverride) {
    next = {
      ...next,
      courses: coursesOverride,
      programs: coursesOverride.map((c) => courseRowToProgram(c)),
    };
  }
  return next;
}

function importFitnessHome(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
  const by = (t: string) => sections.find((s) => s.type === t);
  const nb = by('noticeBanner');
  if (nb) nb.data = { isVisible: true, items: (content.announcements ?? []).filter(Boolean).map((text) => ({ text })) };
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
  if (kb) kb.data = { items: (content.logos ?? []).map((w) => ({ text: typeof w === 'string' ? w : '' })) };
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
  const cc = by('classCards');
  if (cc) {
    const srcCourses = coursesForFitnessModularImport(content);
    cc.data = {
      eyebrow: '',
      headline: 'Klassen & Programme',
      description: '',
      items: srcCourses.map((c) => ({
        title: str(c.name),
        description: str(c.description),
        image: { image: str(c.imageUrl), alt: str(c.name) },
        level: str(c.level),
        duration: str(c.duration),
        intensity: '',
        tags: str(c.schedule),
        button: { label: 'Mehr', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!c.detailSlug,
        subpage: {},
      })),
    };
  }
  const tpo = by('trainingPlanOverview');
  if (tpo) {
    tpo.data = {
      eyebrow: '',
      headline: 'Trainingsplan',
      description: '',
      stats: (content.numbers ?? []).slice(0, 3).map((n) => ({ value: str(n.value), description: str(n.label) })),
      items: coursesForFitnessModularImport(content)
        .slice(0, 4)
        .map((c) => ({
        title: str(c.name),
        description: str(c.description),
        goal: '',
        level: str(c.level),
        frequency: str(c.schedule),
        duration: str(c.duration),
        button: { label: 'Kurse', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
      })),
    };
  }
  const pt = by('programTable');
  if (pt) {
    pt.data = {
      eyebrow: '',
      headline: 'Programme',
      description: '',
      columns: [
        { label: 'Programm', key: 'programTitle' },
        { label: 'Level', key: 'level' },
        { label: 'Zeit', key: 'time' },
      ],
      rows: coursesForFitnessModularImport(content).map((c) => ({
        programTitle: str(c.name),
        focus: str(c.description).slice(0, 80),
        level: str(c.level),
        duration: str(c.duration),
        format: '',
        days: str(c.schedule),
        time: str(c.schedule),
        trainer: str(c.trainer),
        location: '',
        note: str(c.price),
      })),
      button: { label: 'Alle Kurse', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
    };
  }
  const pp = by('pricingPackages');
  if (pp) {
    pp.data = {
      eyebrow: '',
      headline: 'Preise',
      description: '',
      items: (content.packages ?? []).map((p) => ({
        title: str(p.name),
        badge: p.highlight ? 'Top' : '',
        price: str(p.price),
        priceSuffix: str(p.period),
        description: str(p.description),
        features: (p.features ?? []).map((text) => ({ text })),
        button: { label: str(p.ctaLabel), linkType: 'internal', internalPage: str(p.ctaHref), externalUrl: '' },
        isHighlighted: !!p.highlight,
        styleVariant: 'light',
      })),
    };
  }
  const tr = by('trainers');
  if (tr) {
    tr.data = {
      eyebrow: '',
      headline: 'Trainer:innen',
      description: '',
      items: (content.team ?? []).map((m) => ({
        name: str(m.n),
        role: str(m.r),
        description: str(m.bio),
        image: { image: str(m.img), alt: str(m.n) },
        specialties: '',
        qualifications: '',
      })),
    };
  }
  const gp = by('galleryPreview');
  if (gp) {
    gp.data = {
      eyebrow: str(content.branchText?.galleryTeaserEyebrow),
      headline: str(content.branchText?.galleryTeaserTitle),
      images: (content.gallery ?? []).slice(0, 9).map((url) => ({ image: url, alt: '' })),
      button: { label: 'Galerie', linkType: 'internal', internalPage: '/galerie', externalUrl: '' },
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
      button: { label: 'News', linkType: 'internal', internalPage: '/news', externalUrl: '' },
    };
  }
  const cp = by('contactPreview');
  if (cp) {
    const c = content.contact ?? {};
    cp.data = {
      eyebrow: 'Probetraining',
      headline: 'Kontakt',
      subline: '',
      phone: str(c.phone),
      email: str(c.email),
      address: [str(c.address), str(c.city)].filter(Boolean).join(', '),
      openingHours: (c.hours ?? []).map((h) => `${h.day}: ${h.time}`).join(' · '),
      googleMapsUrl: str(c.mapsUrl),
      mapEmbedOrLink: str(c.mapsUrl),
      button: { label: 'Kontakt', linkType: 'internal', internalPage: '/kontakt', externalUrl: '' },
    };
  }
}

function importFitnessServices(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
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
  const cc = by('classCards');
  if (cc) {
    const srcCoursesSvc = coursesForFitnessModularImport(content);
    cc.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: srcCoursesSvc.map((c) => ({
        title: str(c.name),
        description: str(c.description),
        image: { image: str(c.imageUrl), alt: str(c.name) },
        level: str(c.level),
        duration: str(c.duration),
        intensity: '',
        tags: str(c.schedule),
        button: { label: 'Details', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!c.detailSlug,
        subpage: {},
      })),
    };
  }
  const tpo = by('trainingPlanOverview');
  if (tpo) {
    tpo.data = {
      eyebrow: '',
      headline: '',
      description: '',
      stats: (content.numbers ?? []).slice(0, 3).map((n) => ({ value: str(n.value), description: str(n.label) })),
      items: coursesForFitnessModularImport(content)
        .slice(0, 4)
        .map((c) => ({
        title: str(c.name),
        description: str(c.description),
        goal: '',
        level: str(c.level),
        frequency: str(c.schedule),
        duration: str(c.duration),
        button: { label: 'Mehr', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
      })),
    };
  }
  const pt = by('programTable');
  if (pt) {
    pt.data = {
      eyebrow: '',
      headline: '',
      description: '',
      columns: [
        { label: 'Programm', key: 'programTitle' },
        { label: 'Level', key: 'level' },
        { label: 'Zeit', key: 'time' },
      ],
      rows: coursesForFitnessModularImport(content).map((c) => ({
        programTitle: str(c.name),
        focus: '',
        level: str(c.level),
        duration: str(c.duration),
        format: '',
        days: '',
        time: str(c.schedule),
        trainer: str(c.trainer),
        location: '',
        note: str(c.price),
      })),
      button: { label: 'Programm', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
    };
  }
  const pp = by('pricingPackages');
  if (pp) {
    pp.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: (content.packages ?? []).map((p) => ({
        title: str(p.name),
        badge: '',
        price: str(p.price),
        priceSuffix: str(p.period),
        description: str(p.description),
        features: (p.features ?? []).map((text) => ({ text })),
        button: { label: str(p.ctaLabel), linkType: 'internal', internalPage: str(p.ctaHref), externalUrl: '' },
        isHighlighted: !!p.highlight,
        styleVariant: 'light',
      })),
    };
  }
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

export function importFitnessModularFromLegacy(content: SiteContent, style: TemplateStyle): ModularPagesV1 {
  const home = emptySections(style, 'home');
  importFitnessHome(content, [...home], style);
  const services = emptySections(style, 'services');
  importFitnessServices(content, [...services], style);
  const gallery = emptySections(style, 'gallery');
  importGallerySections(content, [...gallery]);
  const about = emptySections(style, 'about');
  importAboutSections(content, [...about], style);
  const contact = emptySections(style, 'contact');
  importContactSections(content, [...contact]);
  return {
    combo: { template: 'fitness', style },
    home: { sections: home },
    services: { sections: services },
    gallery: { sections: gallery },
    about: { sections: about },
    contact: { sections: contact },
  };
}

export function applyFitnessModularToLegacy(content: SiteContent): SiteContent {
  const m = content.modularPagesV1;
  if (!m?.combo || m.combo.template !== 'fitness') return content;
  const style = m.combo.style;
  let next: SiteContent = { ...content };
  if (m.home?.sections?.length) next = mergeFitnessHomeIntoLegacy(next, m.home.sections, style);
  if (m.services?.sections?.length) next = mergeFitnessServicesIntoLegacy(next, m.services.sections, style);
  if (m.gallery?.sections?.length) {
    next = mergeGalleryIntoLegacy(next, m.gallery.sections);
    next = mergeFitnessGalleryExtras(next, m.gallery.sections);
  }
  if (m.about?.sections?.length) next = mergeAboutIntoLegacy(next, m.about.sections);
  if (m.contact?.sections?.length) next = mergeContactIntoLegacy(next, m.contact.sections);
  return next;
}

export function applyFitnessModularOverlay(content: SiteContent, variant: TemplateKey, _style: TemplateStyle): SiteContent {
  if (variant !== 'fitness') return content;
  if (!modularComboTemplateMatches(content.modularPagesV1, 'fitness')) return content;
  if (!hasAnyFitnessModular(content)) return content;
  return applyFitnessModularToLegacy(content);
}
