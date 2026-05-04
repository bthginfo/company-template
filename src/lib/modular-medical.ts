/**
 * Praxen — spec-modular v1 (`docs/spec-praxen.md`).
 */

import type { SiteContent, ModularPagesV1, ModularSectionV1 } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import {
  medicalModularBlueprint,
  type MedicalModularPageKey,
  MEDICAL_SECTION_LABEL_DE,
} from '@/lib/modular-medical-blueprints';
import {
  str,
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
import { mapModularDoctor, mapModularItemToService } from '@/lib/modular-catalog-mappers';

export { MEDICAL_SECTION_LABEL_DE, type MedicalModularPageKey };

export function hasMedicalModularPage(content: SiteContent, style: TemplateStyle, page: MedicalModularPageKey): boolean {
  const m = content.modularPagesV1;
  if (!modularComboMatchesTenant(m, 'medical', style) || !m) return false;
  const bundle =
    page === 'home' ? m.home : page === 'services' ? m.services : page === 'gallery' ? m.gallery : page === 'about' ? m.about : m.contact;
  return (bundle?.sections?.length ?? 0) > 0;
}

export function hasAnyMedicalModular(content: SiteContent, style: TemplateStyle): boolean {
  return (['home', 'services', 'gallery', 'about', 'contact'] as const).some((p) => hasMedicalModularPage(content, style, p));
}

function emptySections(style: TemplateStyle, page: MedicalModularPageKey): ModularSectionV1[] {
  return medicalModularBlueprint(style, page).map((type, i) => ({
    id: `${page}-${type}-${i}`,
    type,
    isVisible: true,
    data: {},
  }));
}

function mergeMedicalGalleryExtras(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
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

function mergeAppointment(d: Record<string, unknown>, next: SiteContent): SiteContent {
  const embed = str(d.embedCode);
  const ext = str(d.externalBookingUrl);
  return {
    ...next,
    booking: {
      enabled: true,
      provider: str(d.providerName),
      url: ext,
      embedUrl: embed || ext,
      note: str(d.widgetDescription) || str(d.description),
    },
  };
}

function mergeMedicalHomeSupplements(content: SiteContent, sections: ModularSectionV1[]): SiteContent {
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
    } else if (sec.type === 'serviceCards') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToService);
      if (mapped.length) {
        const cur = [...(next.services ?? [])];
        mapped.forEach((row, i) => {
          cur[i] = { ...(cur[i] ?? { title: '', description: '', price: '', imageUrl: '' }), ...row };
        });
        next = { ...next, services: cur };
      }
    } else if (sec.type === 'team') {
      const raw = (d as { items?: unknown }).items;
      if (!Array.isArray(raw)) continue;
      const doctors = raw
        .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
        .map((it) =>
          mapModularDoctor({
            ...it,
            specialty: [str(it.specialties), str(it.qualifications)].filter(Boolean).join(' · '),
          }),
        )
        .filter((doc) => doc.name || doc.bio);
      if (doctors.length) next = { ...next, doctors };
    } else if (sec.type === 'appointmentBooking') {
      next = mergeAppointment(d as Record<string, unknown>, next);
    }
  }
  return next;
}

function mergeMedicalHomeIntoLegacy(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): SiteContent {
  let n = mergeHomeIntoLegacy(content, sections, style);
  n = mergeMedicalHomeSupplements(n, sections);
  return n;
}

function mergeMedicalServicesIntoLegacy(content: SiteContent, sections: ModularSectionV1[], _style: TemplateStyle): SiteContent {
  let next: SiteContent = { ...content };
  let servicesOverride: SiteContent['services'] | undefined;
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
      case 'serviceCards': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const mapped = raw.filter((it): it is Record<string, unknown> => !!it && typeof it === 'object').map(mapModularItemToService);
        if (mapped.length) servicesOverride = mapped;
        break;
      }
      case 'team': {
        const raw = (d as { items?: unknown }).items;
        if (!Array.isArray(raw)) break;
        const doctors = raw
          .filter((it): it is Record<string, unknown> => !!it && typeof it === 'object')
          .map((it) =>
            mapModularDoctor({
              ...it,
              specialty: [str(it.specialties), str(it.qualifications)].filter(Boolean).join(' · '),
            }),
          );
        if (doctors.length) next = { ...next, doctors };
        break;
      }
      case 'appointmentBooking':
        next = mergeAppointment(d as Record<string, unknown>, next);
        break;
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
  if (servicesOverride) next = { ...next, services: servicesOverride };
  return next;
}

function importMedicalHome(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
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
        button: { label: 'Mehr', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const si = by('serviceInfo');
  if (si) {
    si.data = {
      eyebrow: 'Für Sie',
      headline: 'Erreichbarkeit',
      description: '',
      noticeText: '',
      items: [
        { title: 'Telefon', value: str(content.contact?.phone), description: '' },
        { title: 'E-Mail', value: str(content.contact?.email), description: '' },
      ],
    };
  }
  const tm = by('team');
  if (tm) {
    tm.data = {
      eyebrow: '',
      headline: 'Team',
      description: '',
      items: (content.doctors ?? []).map((d) => ({
        name: str(d.name),
        role: str(d.role),
        description: str(d.bio),
        image: { image: str(d.imageUrl), alt: str(d.name) },
        specialties: str(d.specialty),
        qualifications: '',
      })),
    };
  }
  const ab = by('appointmentBooking');
  if (ab) {
    const b = content.booking ?? {};
    ab.data = {
      eyebrow: 'Termin',
      headline: str(b.provider) || 'Online-Termin',
      description: str(b.note),
      providerName: str(b.provider),
      widgetHeadline: str(b.provider),
      widgetDescription: str(b.note),
      embedCode: str(b.embedUrl),
      externalBookingUrl: str(b.url),
      button: { label: 'Termin buchen', linkType: 'external', internalPage: '', externalUrl: str(b.url) },
      styleVariant: 'card',
    };
  }
  const gp = by('galleryPreview');
  if (gp) {
    gp.data = {
      eyebrow: str(content.branchText?.galleryTeaserEyebrow),
      headline: str(content.branchText?.galleryTeaserTitle),
      images: (content.gallery ?? []).slice(0, 8).map((url) => ({ image: url, alt: '' })),
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
      eyebrow: 'Kontakt',
      headline: 'Termin',
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

function importMedicalServices(content: SiteContent, sections: ModularSectionV1[], style: TemplateStyle): void {
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
  const si = by('serviceInfo');
  if (si) {
    si.data = {
      eyebrow: '',
      headline: 'Für Sie erreichbar',
      description: '',
      noticeText: '',
      items: [
        { title: 'Telefon', value: str(content.contact?.phone), description: '' },
        { title: 'E-Mail', value: str(content.contact?.email), description: '' },
      ],
    };
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
        button: { label: 'Details', linkType: 'internal', internalPage: '/leistungen', externalUrl: '' },
        hasSubpage: !!s.detailSlug,
        subpage: {},
      })),
    };
  }
  const tm = by('team');
  if (tm) {
    tm.data = {
      eyebrow: '',
      headline: '',
      description: '',
      items: (content.doctors ?? []).map((d) => ({
        name: str(d.name),
        role: str(d.role),
        description: str(d.bio),
        image: { image: str(d.imageUrl), alt: str(d.name) },
        specialties: str(d.specialty),
        qualifications: '',
      })),
    };
  }
  const ab = by('appointmentBooking');
  if (ab) {
    const b = content.booking ?? {};
    ab.data = {
      eyebrow: '',
      headline: str(b.provider) || 'Termin',
      description: str(b.note),
      providerName: str(b.provider),
      widgetHeadline: str(b.provider),
      widgetDescription: str(b.note),
      embedCode: str(b.embedUrl),
      externalBookingUrl: str(b.url),
      button: { label: 'Buchen', linkType: 'external', internalPage: '', externalUrl: str(b.url) },
      styleVariant: 'card',
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

export function importMedicalModularFromLegacy(content: SiteContent, style: TemplateStyle): ModularPagesV1 {
  const home = emptySections(style, 'home');
  importMedicalHome(content, [...home], style);
  const services = emptySections(style, 'services');
  importMedicalServices(content, [...services], style);
  const gallery = emptySections(style, 'gallery');
  importGallerySections(content, [...gallery]);
  const about = emptySections(style, 'about');
  importAboutSections(content, [...about], style);
  const contact = emptySections(style, 'contact');
  importContactSections(content, [...contact]);
  return {
    combo: { template: 'medical', style },
    home: { sections: home },
    services: { sections: services },
    gallery: { sections: gallery },
    about: { sections: about },
    contact: { sections: contact },
  };
}

export function applyMedicalModularToLegacy(content: SiteContent): SiteContent {
  const m = content.modularPagesV1;
  if (!m?.combo || m.combo.template !== 'medical') return content;
  const style = m.combo.style;
  let next: SiteContent = { ...content };
  if (m.home?.sections?.length) next = mergeMedicalHomeIntoLegacy(next, m.home.sections, style);
  if (m.services?.sections?.length) next = mergeMedicalServicesIntoLegacy(next, m.services.sections, style);
  if (m.gallery?.sections?.length) {
    next = mergeGalleryIntoLegacy(next, m.gallery.sections);
    next = mergeMedicalGalleryExtras(next, m.gallery.sections);
  }
  if (m.about?.sections?.length) next = mergeAboutIntoLegacy(next, m.about.sections);
  if (m.contact?.sections?.length) next = mergeContactIntoLegacy(next, m.contact.sections);
  return next;
}

export function applyMedicalModularOverlay(content: SiteContent, variant: TemplateKey, style: TemplateStyle): SiteContent {
  if (variant !== 'medical') return content;
  if (!modularComboMatchesTenant(content.modularPagesV1, 'medical', style)) return content;
  if (!hasAnyMedicalModular(content, style)) return content;
  return applyMedicalModularToLegacy(content);
}
