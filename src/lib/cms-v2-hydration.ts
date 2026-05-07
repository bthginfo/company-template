import type { TemplateStyle } from './branch-config.js';
import { SiteContentSchema, type ModularPagesV1, type ModularPagesV2, type ModularSectionV2, type SiteContent, type TemplateKey } from './types.js';
import { CMS_PAGE_KEYS, getCmsSectionFieldKeys, getCmsSectionTypes, type CmsPageKey } from './cms-contract.js';
import { importRestaurantModularFromLegacy } from './modular-restaurant.js';
import { importHotelModularFromLegacy } from './modular-hotel.js';
import { importTourismModularFromLegacy } from './modular-tourism.js';
import { importSalonModularFromLegacy } from './modular-salon.js';
import { importTradesmanModularFromLegacy } from './modular-tradesman.js';
import { importConsultingModularFromLegacy } from './modular-consulting.js';
import { importMedicalModularFromLegacy } from './modular-medical.js';
import { importFitnessModularFromLegacy } from './modular-fitness.js';
import { BRANCH_TEXT_DEFAULTS } from './branch-text-defaults.js';

function importV1FromLegacy(content: SiteContent, template: TemplateKey, style: TemplateStyle): ModularPagesV1 {
  switch (template) {
    case 'restaurant':
      return importRestaurantModularFromLegacy(content, style);
    case 'hotel':
      return importHotelModularFromLegacy(content, style);
    case 'tourism':
      return importTourismModularFromLegacy(content, style);
    case 'salon':
      return importSalonModularFromLegacy(content, style);
    case 'tradesman':
      return importTradesmanModularFromLegacy(content, style);
    case 'consulting':
      return importConsultingModularFromLegacy(content, style);
    case 'medical':
      return importMedicalModularFromLegacy(content, style);
    case 'fitness':
      return importFitnessModularFromLegacy(content, style);
  }
}

function v2SectionsFromV1(page: CmsPageKey, v1: ModularPagesV1): ModularSectionV2[] {
  const sections = v1[page]?.sections ?? [];
  return sections.map((section, index) => ({
    id: section.id || `${page}-${section.type}-${index}`,
    type: section.type,
    visible: section.isVisible !== false,
    data: { ...(section.data ?? {}) },
  }));
}

export function buildModularPagesV2FromLegacy(content: SiteContent, template: TemplateKey, style: TemplateStyle): ModularPagesV2 {
  const v1 = importV1FromLegacy(content, template, style);
  const modular: ModularPagesV2 = {
    version: 2,
    combo: { template, style },
    customPages: content.modularPagesV2?.customPages ?? [],
  };

  for (const page of CMS_PAGE_KEYS) {
    modular[page] = { sections: v2SectionsFromV1(page, v1) };
  }

  return fillModularPagesV2DemoData(content, template, style, modular);
}

type RecordValue = Record<string, unknown>;

const SIGNATURE_FALLBACKS: Record<Exclude<TemplateKey, 'consulting' | 'medical' | 'fitness'>, Record<TemplateStyle, { eyebrow: string; titleA: string; titleB: string; intro: string }>> = {
  restaurant: {
    classic: { eyebrow: 'Empfehlung des Hauses', titleA: 'Heute', titleB: 'auf der Karte.', intro: 'Die Köchin schreibt jeden Morgen frisch, was die Lieferanten bringen.' },
    modern: { eyebrow: 'Heute auf der Karte', titleA: 'Empfehlungen', titleB: 'vom Haus.', intro: 'Saisonal gekocht, klar serviert und jeden Tag frisch entschieden.' },
    bold: { eyebrow: 'Heute / Tonight', titleA: 'Auf', titleB: 'dem Tisch.', intro: 'Drei starke Teller aus der Küche.' },
  },
  salon: {
    classic: { eyebrow: 'Inspiration', titleA: 'Looks', titleB: 'der Woche.', intro: 'Eine Auswahl unserer letzten Arbeiten, frisch aus dem Studio.' },
    modern: { eyebrow: 'Inspiration', titleA: 'Looks', titleB: 'der Woche.', intro: 'Schnitte, Farbe und Pflege, die zum Alltag passen.' },
    bold: { eyebrow: 'Inspiration', titleA: 'Looks', titleB: 'der Woche.', intro: 'Ausdrucksstarke Looks aus dem Studio.' },
  },
  tradesman: {
    classic: { eyebrow: 'Aktuelle Baustelle', titleA: 'Was wir gerade', titleB: 'umsetzen.', intro: 'Aktuelle Projekte aus der Werkstatt, sauber geplant und umgesetzt.' },
    modern: { eyebrow: 'Aktuelle Baustelle', titleA: 'Was wir gerade', titleB: 'umsetzen.', intro: 'Handwerkliche Lösungen für echte Anforderungen.' },
    bold: { eyebrow: 'Aktuelle Baustelle', titleA: 'Was wir gerade', titleB: 'umsetzen.', intro: 'Robuste Arbeit mit klarer Kante.' },
  },
  hotel: {
    classic: { eyebrow: 'Zimmer-Auswahl', titleA: 'Ihr Zuhause', titleB: 'auf Zeit.', intro: 'Jedes Zimmer ist anders, wählen Sie, was zu Ihrer Reise passt.' },
    modern: { eyebrow: 'Zimmer-Auswahl', titleA: 'Ihr Zuhause', titleB: 'auf Zeit.', intro: 'Ruhige Zimmer, gute Betten und kurze Wege.' },
    bold: { eyebrow: 'Zimmer-Auswahl', titleA: 'Ihr Zuhause', titleB: 'auf Zeit.', intro: 'Zimmer mit Charakter und klarer Ausstattung.' },
  },
  tourism: {
    classic: { eyebrow: 'Unsere Touren', titleA: 'Auf', titleB: 'Entdeckungsreise.', intro: 'Kleine Gruppen, große Erlebnisse und Guides mit Ortskenntnis.' },
    modern: { eyebrow: 'Unsere Touren', titleA: 'Auf', titleB: 'Entdeckungsreise.', intro: 'Geführte Erlebnisse mit guter Planung und echtem Ortsgefühl.' },
    bold: { eyebrow: 'Unsere Touren', titleA: 'Auf', titleB: 'Entdeckungsreise.', intro: 'Rausgehen, entdecken, ankommen.' },
  },
};

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function firstText(...values: unknown[]): string {
  for (const value of values) {
    const out = text(value);
    if (out) return out;
  }
  return '';
}

function isMeaningful(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.some(isMeaningful);
  if (typeof value === 'object') return Object.values(value as RecordValue).some(isMeaningful);
  return true;
}

function imageValue(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (!value || typeof value !== 'object' || Array.isArray(value)) return '';
  return text((value as RecordValue).image);
}

function image(url: string, alt = ''): RecordValue {
  return { image: url, alt };
}

function button(label: string, href: string): RecordValue {
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  return { label, linkType: external ? 'external' : 'internal', internalPage: external ? '' : href, externalUrl: external ? href : '' };
}

function setMissing(target: RecordValue, key: string, value: unknown): void {
  if (!isMeaningful(target[key]) && isMeaningful(value)) target[key] = value;
}

function mergeRows(current: unknown, fallback: RecordValue[]): RecordValue[] {
  const currentRows = Array.isArray(current)
    ? current.filter((row): row is RecordValue => !!row && typeof row === 'object' && !Array.isArray(row))
    : [];
  if (!currentRows.length) return fallback;
  const max = Math.max(currentRows.length, fallback.length);
  const rows: RecordValue[] = [];
  for (let index = 0; index < max; index += 1) {
    const currentRow = currentRows[index];
    const fallbackRow = fallback[index];
    if (isMeaningful(currentRow)) rows.push(currentRow);
    else if (fallbackRow) rows.push(fallbackRow);
  }
  return rows.filter(isMeaningful);
}

function textList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      if (item && typeof item === 'object' && !Array.isArray(item)) return text((item as RecordValue).text);
      return '';
    })
    .filter(Boolean);
}

function announcementLines(content: SiteContent): string[] {
  const lines = textList(content.announcements);
  if (lines.length) return lines;
  return ['Heute geöffnet', firstText(content.contact?.phone, 'Reservierung möglich')].filter(Boolean);
}

function noticeBannerItemsFromV2(modular: ModularPagesV2): string[] {
  const section = modular.home?.sections.find((item) => item.type === 'noticeBanner');
  return textList((section?.data as RecordValue | undefined)?.items);
}

function branchText(content: SiteContent, template: TemplateKey): RecordValue {
  return { ...BRANCH_TEXT_DEFAULTS[template], ...(content.branchText ?? {}) } as RecordValue;
}

function signatureFallback(template: TemplateKey, style: TemplateStyle): { eyebrow: string; titleA: string; titleB: string; intro: string } {
  if (template === 'consulting' || template === 'medical' || template === 'fitness') {
    const bt = BRANCH_TEXT_DEFAULTS[template];
    return { eyebrow: bt.servicesTeaserEyebrow, titleA: bt.servicesTeaserTitle, titleB: '', intro: bt.teaserSubtitle };
  }
  return SIGNATURE_FALLBACKS[template][style];
}

function serviceRows(content: SiteContent): RecordValue[] {
  return (content.services ?? []).map((row) => ({
    title: text(row.title),
    name: text(row.title),
    price: text(row.price),
    description: text(row.description),
    image: image(text(row.imageUrl), text(row.title)),
    button: button(text(row.learnMoreLabel) || 'Mehr erfahren', text(row.learnMoreHref) || '/leistungen'),
    detailSlug: text(row.detailSlug),
    detailPublished: row.detailPublished !== false,
    detailSubtitle: text(row.detailSubtitle),
    detailBody: text(row.detailBody),
    detailBodyHtml: text(row.detailBodyHtml),
    detailGallery: row.detailGallery ?? [],
  })).filter(isMeaningful);
}

function roomRows(content: SiteContent): RecordValue[] {
  return (content.rooms ?? []).map((row) => ({
    title: text(row.name),
    name: text(row.name),
    subtitle: firstText(row.size, row.beds),
    size: text(row.size),
    beds: text(row.beds),
    price: text(row.price),
    description: text(row.description),
    image: image(text(row.imageUrl), text(row.name)),
    features: row.features ?? [],
    detailSlug: text(row.detailSlug),
    detailPublished: row.detailPublished !== false,
    detailSubtitle: text(row.detailSubtitle),
    detailBody: text(row.detailBody),
    detailBodyHtml: text(row.detailBodyHtml),
    detailGallery: row.detailGallery ?? [],
  })).filter(isMeaningful);
}

function homeSignatureRows(content: SiteContent): RecordValue[] {
  return (content.homeSignatureItems ?? []).map((row) => ({
    title: text(row.title),
    name: text(row.title),
    price: text(row.price),
    description: text(row.description),
    image: image(text(row.imageUrl), text(row.title)),
  })).filter(isMeaningful);
}

function textPairRows(rows: readonly { t?: string; d?: string }[] | undefined): RecordValue[] {
  return (rows ?? []).map((row) => ({ title: text(row.t), description: text(row.d) })).filter(isMeaningful);
}

function looseRows(value: unknown): RecordValue[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((row): row is RecordValue => !!row && typeof row === 'object' && !Array.isArray(row))
    .map((row) => ({
      title: firstText(row.title, row.t, row.name, row.year),
      description: firstText(row.description, row.d, row.bio, row.text),
      image: image(firstText(row.imageUrl, row.img, imageValue(row.image)), firstText(row.title, row.t, row.name)),
    }))
    .filter(isMeaningful);
}

function testimonialRows(content: SiteContent): RecordValue[] {
  return (content.testimonials ?? []).map((row) => ({
    name: text(row.author),
    author: text(row.author),
    quote: text(row.text),
    text: text(row.text),
  })).filter(isMeaningful);
}

function numberRows(content: SiteContent): RecordValue[] {
  const rows = (content.numbers ?? []).map((row) => ({ value: text(row.value), description: text(row.label) })).filter(isMeaningful);
  if (rows.length) return rows;
  return [
    { value: 'Seit 1998', description: 'Erfahrung im Betrieb' },
    { value: '4,8/5', description: 'Bewertung unserer Kundschaft' },
    { value: '100%', description: 'Persönlich betreut' },
  ];
}

function galleryImages(content: SiteContent): RecordValue[] {
  return (content.gallery ?? []).map((url) => image(text(url))).filter(isMeaningful);
}

function contactRows(content: SiteContent): RecordValue[] {
  const contact = content.contact ?? { phone: '', email: '', address: '', city: '', mapsUrl: '' };
  return [
    { title: 'Telefon', value: text(contact.phone) || '+43 512 000000', description: 'Direkt erreichbar' },
    { title: 'E-Mail', value: text(contact.email) || 'info@example.com', description: 'Antwort innerhalb eines Werktags' },
    { title: 'Adresse', value: [text(contact.address), text(contact.city)].filter(Boolean).join(', ') || 'Musterstraße 1', description: 'Vor Ort für Sie da' },
  ];
}

function sectionItems(content: SiteContent, template: TemplateKey, type: string): RecordValue[] {
  if (type === 'featuredDishesGrid' || type === 'featuredDishes') return homeSignatureRows(content).length ? homeSignatureRows(content) : serviceRows(content).slice(0, 3);
  if (type === 'roomSelection' || type === 'accommodationsGrid' || type === 'accommodationList' || type === 'roomCards') return roomRows(content).length ? roomRows(content) : serviceRows(content);
  if (type === 'steps' || type === 'processTextColumns' || type === 'processCards') return textPairRows(content.serviceProcess).length ? textPairRows(content.serviceProcess) : [
    { title: 'Anfrage', description: 'Wir klären Ziel, Zeitraum und Rahmen.' },
    { title: 'Planung', description: 'Sie erhalten eine klare Empfehlung.' },
    { title: 'Umsetzung', description: 'Wir begleiten die nächsten Schritte.' },
  ];
  if (type === 'faq') return (content.faq ?? []).map((row) => ({ question: text(row.q), answer: text(row.a) })).filter(isMeaningful);
  if (type === 'team' || type === 'trainers') {
    const rows = (content.team ?? []).map((row) => ({ name: firstText(row.n), role: firstText(row.r), description: text(row.bio), image: image(firstText(row.img), firstText(row.n)) })).filter(isMeaningful);
    return rows.length ? rows : [
      { name: 'Alex Muster', role: 'Leitung', description: 'Persönliche Beratung und Qualität im Alltag.', image: image(text(content.about?.imageUrl) || text(content.hero?.imageUrl), 'Alex Muster') },
      { name: 'Sam Beispiel', role: 'Team', description: 'Begleitet Kundinnen und Kunden vom ersten Kontakt bis zur Umsetzung.', image: image(text(content.gallery?.[0]), 'Sam Beispiel') },
    ];
  }
  if (type === 'testimonials' || type === 'quoteWall' || type === 'testimonialMarquee' || type === 'expertQuotes') return testimonialRows(content);
  if (type === 'statsBand' || type === 'trainingPlanOverview') return numberRows(content);
  if (type === 'directions' || type === 'topicBand' || type === 'topicCards' || type === 'contactPreview' || type === 'serviceInfo' || type === 'appointmentBooking') return contactRows(content);
  if (type === 'brandLogos' || type === 'labelBand' || type === 'keywordBand' || type === 'marqueeBand') {
    const logos = content.logos ?? [];
    const words = text((branchText(content, template).marqueeWords as unknown[] | undefined)?.join('|')).split('|').filter(Boolean);
    return (logos.length ? logos : words).map((entry) => ({ text: text(entry), name: text(entry), logo: image(text(entry)) })).filter(isMeaningful);
  }
  if (type === 'highlightsBar' || type === 'highlights') {
    const rows = textPairRows(content.serviceHighlights);
    return rows.length ? rows : [
      { title: 'Persönlich', description: 'Direkte Betreuung durch ein eingespieltes Team.' },
      { title: 'Transparent', description: 'Klare Leistungen, klare Absprachen, klare nächste Schritte.' },
      { title: 'Verlässlich', description: 'Planung und Umsetzung mit Blick für Details.' },
    ];
  }
  if (type === 'timeline') {
    const rows = looseRows(content.timeline);
    return rows.length ? rows : [
      { title: 'Start', description: 'Der Betrieb wächst aus Erfahrung und klarer Haltung.' },
      { title: 'Heute', description: 'Das Team verbindet bewährtes Handwerk mit moderner Arbeitsweise.' },
    ];
  }
  if (type === 'qualifications') {
    const rows = textPairRows(content.certifications);
    return rows.length ? rows : [
      { title: 'Geprüfte Qualität', description: 'Arbeitsweise und Beratung folgen klaren Standards.' },
      { title: 'Erfahrung', description: 'Routine aus vielen Projekten und Kundensituationen.' },
    ];
  }
  if (type === 'categoryCards' || type === 'teaserList') {
    const rows = looseRows(content.galleryCategories);
    return rows.length ? rows : servicesOrFallback(content);
  }
  return serviceRows(content);
}

function servicesOrFallback(content: SiteContent): RecordValue[] {
  const rows = serviceRows(content);
  return rows.length ? rows : [
    { title: 'Beratung', description: 'Wir klären gemeinsam, was gebraucht wird.', image: image(text(content.gallery?.[0])) },
    { title: 'Umsetzung', description: 'Das Team setzt die vereinbarten Schritte sauber um.', image: image(text(content.gallery?.[1])) },
    { title: 'Begleitung', description: 'Auch nach dem ersten Termin bleiben wir ansprechbar.', image: image(text(content.gallery?.[2])) },
  ];
}

function sanitizeSectionData(sectionType: string, data: RecordValue): RecordValue {
  const allowed = new Set(getCmsSectionFieldKeys(sectionType).map((key) => key.split('.')[0]));
  return Object.fromEntries(Object.entries(data).filter(([key]) => allowed.has(key))) as RecordValue;
}

function fillSectionData(content: SiteContent, template: TemplateKey, style: TemplateStyle, _page: CmsPageKey, section: ModularSectionV2): ModularSectionV2 {
  const data: RecordValue = { ...(section.data ?? {}) };
  const contractedFields = new Set(getCmsSectionFieldKeys(section.type).map((key) => key.split('.')[0]));
  const bt = branchText(content, template);
  const sig = signatureFallback(template, style);
  const contact = content.contact ?? { phone: '', email: '', address: '', city: '', mapsUrl: '' };
  const heroImage = firstText(content.hero?.imageUrl, bt.heroImageUrl, content.about?.imageUrl, content.gallery?.[0]);
  const gallery = galleryImages(content);
  const services = serviceRows(content);
  const items = sectionItems(content, template, section.type);

  if (section.type === 'hero') {
    setMissing(data, 'eyebrow', firstText(bt.heroEyebrow, content.brand?.tagline, template));
    setMissing(data, 'headline', firstText(content.hero?.title, content.brand?.name));
    setMissing(data, 'subline', firstText(content.hero?.subtitle, bt.teaserSubtitle));
    setMissing(data, 'description', firstText(content.hero?.body, bt.teaserSubtitle, content.about?.body));
    setMissing(data, 'buttonPrimary', button(firstText(content.hero?.ctaLabel, 'Kontakt aufnehmen'), firstText(content.hero?.ctaHref, '/kontakt')));
    setMissing(data, 'stats', numberRows(content));
    setMissing(data, 'backgroundImage', image(heroImage, firstText(content.hero?.title, content.brand?.name)));
    setMissing(data, 'image', image(firstText(bt.heroImageUrl, heroImage), firstText(content.hero?.title, content.brand?.name)));
  }

  if (section.type === 'featuredDishesGrid') {
    setMissing(data, 'eyebrow', firstText(content.homeSignature?.eyebrow, sig.eyebrow));
    setMissing(data, 'titleA', firstText(content.homeSignature?.titleA, sig.titleA));
    setMissing(data, 'titleB', firstText(content.homeSignature?.titleB, sig.titleB));
    setMissing(data, 'description', firstText(content.homeSignature?.intro, sig.intro));
    setMissing(data, 'items', items);
  } else if (section.type === 'featuredDishes') {
    setMissing(data, 'eyebrow', firstText(content.homeSignature?.eyebrow, sig.eyebrow));
    setMissing(data, 'headline', [firstText(content.homeSignature?.titleA, sig.titleA), firstText(content.homeSignature?.titleB, sig.titleB)].filter(Boolean).join(' '));
    setMissing(data, 'items', items);
  } else if (section.type === 'featuredItems') {
    setMissing(data, 'eyebrow', firstText(bt.servicesTeaserEyebrow, sig.eyebrow));
    setMissing(data, 'headline', firstText(bt.servicesTeaserTitle, sig.titleA));
    setMissing(data, 'description', firstText(bt.teaserSubtitle, sig.intro));
    setMissing(data, 'items', services.length ? services.slice(0, 3) : items);
  }

  if (section.type === 'actionBar') {
    setMissing(data, 'autoAvailabilityStatusEnabled', true);
    setMissing(data, 'availabilityStatusOverride', firstText(content.homeStrip?.eyebrow, 'Heute erreichbar'));
    setMissing(data, 'buttonPrimary', button(firstText(content.homeStrip?.primaryLabel, content.hero?.ctaLabel, 'Kontakt aufnehmen'), firstText(content.homeStrip?.primaryHref, content.hero?.ctaHref, '/kontakt')));
    setMissing(data, 'buttonSecondary', button(firstText(content.homeStrip?.secondaryLabel, 'Route planen'), firstText(content.homeStrip?.secondaryHref, contact.mapsUrl, '/kontakt')));
  }

  if (['serviceCards', 'featuredServices', 'serviceList', 'featuredLooks', 'featuredLooksBand', 'tourOverviewCards', 'tourOverviewList', 'serviceOverviewCards', 'serviceOverviewList', 'featuredAreas', 'roomSelection', 'tourSchedule', 'tourSelection', 'classCards', 'accommodationsGrid', 'accommodationList', 'roomCards', 'tourCards', 'pricingPackages', 'serviceInfo', 'appointmentBooking', 'qualifications', 'processTextColumns', 'processCards'].includes(section.type)) {
    setMissing(data, 'eyebrow', firstText(bt.servicesTeaserEyebrow, bt.processEyebrow, sig.eyebrow));
    setMissing(data, 'headline', firstText(bt.servicesTeaserTitle, bt.processTitle, sig.titleA));
    setMissing(data, 'description', firstText(bt.teaserSubtitle, sig.intro));
    setMissing(data, 'items', items);
  }

  if (section.type === 'noticeBanner') data.items = announcementLines(content).map((line) => ({ text: line }));
  if (section.type === 'menu') {
    setMissing(data, 'eyebrow', firstText(bt.servicesTeaserEyebrow, 'Speisekarte'));
    setMissing(data, 'titleA', 'Unsere');
    setMissing(data, 'titleB', 'Karte.');
    setMissing(data, 'subtitle', firstText(bt.teaserSubtitle, content.hero?.subtitle));
  }
  if (section.type === 'galleryPreview' || section.type === 'gallery') {
    setMissing(data, 'eyebrow', firstText(bt.galleryTeaserEyebrow, 'Einblicke'));
    setMissing(data, 'headline', firstText(bt.galleryTeaserTitle, 'Bilder aus unserem Alltag.'));
    setMissing(data, 'images', gallery);
    setMissing(data, 'button', button(firstText(bt.galleryAllLabel, 'Galerie ansehen'), firstText(bt.galleryAllHref, '/galerie')));
  }
  if (section.type === 'newsTeaser') {
    setMissing(data, 'eyebrow', firstText(bt.newsEyebrow, 'Aktuelles'));
    setMissing(data, 'headline', firstText(bt.newsTitle, 'News & Notizen.'));
    setMissing(data, 'button', button(firstText(bt.newsAllLabel, 'Alle Beiträge'), firstText(bt.newsAllHref, '/news')));
  }
  if (section.type === 'testimonials') {
    const rows = mergeRows(data.testimonials ?? data.items, testimonialRows(content));
    setMissing(data, 'eyebrow', firstText(bt.testimonialsEyebrow, 'Stimmen'));
    setMissing(data, 'headline', firstText(bt.testimonialsTitle, 'Was unsere Kundschaft sagt.'));
    data.testimonials = rows;
    data.items = rows;
  }
  if (section.type === 'cta' || section.type === 'ctaBand') {
    const cta = content.ctaBandOverride ?? {};
    setMissing(data, 'eyebrow', firstText(cta.eyebrow, bt.softCtaEyebrow, 'Kontakt'));
    setMissing(data, 'headline', firstText(cta.lead, bt.softCtaTitle, 'Wir freuen uns auf Ihre Anfrage.'));
    setMissing(data, 'subline', firstText(cta.sub, bt.softCtaText, bt.teaserSubtitle));
    setMissing(data, 'button', button(firstText(cta.cta, bt.softCtaButton, 'Kontakt aufnehmen'), firstText(cta.ctaHref, '/kontakt')));
  }
  if (section.type === 'statsBand') setMissing(data, 'items', numberRows(content));
  if (section.type === 'steps') {
    setMissing(data, 'eyebrow', firstText(bt.processEyebrow, 'Ablauf'));
    setMissing(data, 'headline', firstText(bt.processTitle, 'So läuft es ab.'));
  }
  if (section.type === 'steps' || section.type === 'faq' || section.type === 'timeline' || section.type === 'team' || section.type === 'trainers' || section.type === 'expertQuotes' || section.type === 'quoteWall' || section.type === 'categoryCards' || section.type === 'topicCards' || section.type === 'programTable' || section.type === 'highlightsBar') setMissing(data, 'items', items);
  if (section.type === 'team' || section.type === 'trainers') {
    setMissing(data, 'eyebrow', firstText(bt.teamEyebrow, 'Team'));
    setMissing(data, 'headline', firstText(bt.teamTitle, 'Menschen hinter dem Betrieb.'));
  }
  if (section.type === 'categoryCards') {
    setMissing(data, 'eyebrow', firstText(bt.galleryCategoriesEyebrow, 'Kategorien'));
    setMissing(data, 'headline', firstText(bt.galleryCategoriesTitle, 'Was Sie bei uns erwartet.'));
  }
  if (section.type === 'teaserList') {
    setMissing(data, 'eyebrow', firstText(bt.galleryTeaserEyebrow, bt.servicesTeaserEyebrow, 'Auswahl'));
    setMissing(data, 'headline', firstText(bt.galleryTeaserTitle, bt.servicesTeaserTitle, 'Auswahl und Einblicke.'));
    setMissing(data, 'intro', firstText(bt.teaserSubtitle, sig.intro));
    setMissing(data, 'description', firstText(bt.teaserSubtitle, sig.intro));
    setMissing(data, 'items', items);
  }
  if (section.type === 'faq') {
    setMissing(data, 'eyebrow', firstText(bt.faqEyebrow, 'FAQ'));
    setMissing(data, 'headline', firstText(bt.faqTitle, 'Antworten auf Ihre Fragen.'));
  }
  if (section.type === 'storyTeaser' || section.type === 'storySplit' || section.type === 'storyImageSplit') {
    setMissing(data, 'eyebrow', firstText(bt.aboutTeaserEyebrow, 'Über uns'));
    setMissing(data, 'headline', firstText(content.about?.title, 'Über uns'));
    setMissing(data, 'description', firstText(content.about?.body, bt.teaserSubtitle));
    setMissing(data, 'image', image(firstText(content.about?.imageUrl, heroImage), firstText(content.about?.title, content.brand?.name)));
    setMissing(data, 'button', button(firstText(bt.learnMoreLabel, 'Mehr erfahren'), firstText(bt.learnMoreHref, '/ueber-uns')));
  }
  if (section.type === 'storyFacts') {
    setMissing(data, 'description', firstText(content.about?.body, bt.teaserSubtitle));
    setMissing(data, 'items', numberRows(content));
  }
  if (section.type === 'contactDetails' || section.type === 'contactPreview' || section.type === 'locations' || section.type === 'directions') {
    const contactCta = (content as { contactCta?: Record<string, unknown> }).contactCta ?? {};
    setMissing(data, 'eyebrow', 'Kontakt');
    setMissing(data, 'headline', firstText(contactCta.title, 'So erreichen Sie uns.'));
    setMissing(data, 'subline', firstText(contactCta.text, bt.teaserSubtitle));
    setMissing(data, 'description', firstText(contactCta.text, bt.teaserSubtitle));
    setMissing(data, 'googleMapsUrl', firstText(contact.mapsUrl, 'https://maps.google.com/?q=Musterstraße%201'));
    setMissing(data, 'additionalFormFields', [{ label: 'Wunschtermin', type: 'text' }]);
    setMissing(data, 'locations', [{ name: content.brand?.name, address: text(contact.address), city: text(contact.city), phone: text(contact.phone), email: text(contact.email), mapsUrl: text(contact.mapsUrl) }]);
    setMissing(data, 'items', contactRows(content));
  }
  if (section.type === 'labelBand') setMissing(data, 'labels', (content.logos?.length ? content.logos : [content.brand?.name]).map((entry) => ({ text: text(entry) })));
  if (section.type === 'brandLogos') setMissing(data, 'items', (content.logos?.length ? content.logos : [content.brand?.name]).map((entry) => ({ name: text(entry), logo: image(text(entry)) })));
  if (section.type === 'marqueeBand' || section.type === 'keywordBand' || section.type === 'testimonialMarquee') setMissing(data, 'items', sectionItems(content, template, section.type));
  if (section.type === 'stickyEmergencyBanner') {
    setMissing(data, 'phone', firstText(contact.phone, '+43 512 000000'));
    setMissing(data, 'label', 'Direktkontakt');
    setMissing(data, 'headline', 'Schnelle Hilfe vom Fachbetrieb.');
    setMissing(data, 'subline', firstText(bt.teaserSubtitle, 'Wir melden uns schnell zurück.'));
  }
  if (section.type === 'fundingCalculator') {
    setMissing(data, 'investmentMin', 1000);
    setMissing(data, 'investmentMax', 25000);
    setMissing(data, 'investmentStep', 500);
    setMissing(data, 'investmentDefault', 5000);
    setMissing(data, 'programs', [{ name: 'Basis', rate: 20, maxAmount: 2500 }, { name: 'Plus', rate: 35, maxAmount: 7500 }]);
  }
  if (section.type === 'topicBand') {
    setMissing(data, 'headline', firstText(bt.servicesTeaserTitle, 'Unsere Themen.'));
    setMissing(data, 'subline', firstText(bt.teaserSubtitle));
    setMissing(data, 'phone', firstText(contact.phone, '+43 512 000000'));
    setMissing(data, 'items', items);
  }
  if (section.type === 'trainingPlanOverview') {
    setMissing(data, 'eyebrow', firstText(bt.servicesTeaserEyebrow, 'Training'));
    setMissing(data, 'headline', firstText(bt.servicesTeaserTitle, 'Ihr Plan.'));
    setMissing(data, 'stats', numberRows(content));
  }
  if (section.type === 'programTable') {
    setMissing(data, 'eyebrow', firstText(bt.servicesTeaserEyebrow, 'Programme'));
    setMissing(data, 'headline', firstText(bt.servicesTeaserTitle, 'Kurse und Programme.'));
    setMissing(data, 'rows', services.length ? services : items);
  }
  if (contractedFields.has('backgroundImage') && !imageValue(data.backgroundImage) && heroImage) data.backgroundImage = image(heroImage);
  if (contractedFields.has('image') && !imageValue(data.image) && heroImage) data.image = image(heroImage);

  return { ...section, data: sanitizeSectionData(section.type, data) };
}

function fillModularPagesV2DemoData(content: SiteContent, template: TemplateKey, style: TemplateStyle, modular: ModularPagesV2): ModularPagesV2 {
  const next: ModularPagesV2 = { ...modular, version: 2, combo: { template, style } };
  for (const page of CMS_PAGE_KEYS) {
    next[page] = {
      sections: (modular[page]?.sections ?? []).map((section) => fillSectionData(content, template, style, page, section)),
    };
  }
  return next;
}

function completeV2PageSections(
  currentSections: readonly ModularSectionV2[] | undefined,
  template: TemplateKey,
  style: TemplateStyle,
  page: CmsPageKey,
): ModularSectionV2[] {
  const allowedTypes = new Set(getCmsSectionTypes(template, style, page));
  const next = [...(currentSections ?? [])].filter((section) => allowedTypes.has(section.type));
  const currentCounts = new Map<string, number>();
  for (const section of next) currentCounts.set(section.type, (currentCounts.get(section.type) ?? 0) + 1);

  const requiredCounts = new Map<string, number>();
  for (const type of getCmsSectionTypes(template, style, page)) {
    const requiredIndex = requiredCounts.get(type) ?? 0;
    requiredCounts.set(type, requiredIndex + 1);
    if ((currentCounts.get(type) ?? 0) <= requiredIndex) {
      next.push({
        id: `${page}-${type}-${requiredIndex}`,
        type,
        visible: true,
        data: {},
      });
      currentCounts.set(type, (currentCounts.get(type) ?? 0) + 1);
    }
  }

  return next;
}

type CmsV2NormalizeMode = 'preserve' | 'legacy';

export function ensureCompleteModularPagesV2(
  content: SiteContent,
  template: TemplateKey,
  style: TemplateStyle,
  mode: CmsV2NormalizeMode = 'preserve',
): ModularPagesV2 {
  const current = content.modularPagesV2;
  if (mode === 'legacy' || current?.combo?.template !== template || current.combo.style !== style) {
    return buildModularPagesV2FromLegacy(content, template, style);
  }

  const next: ModularPagesV2 = {
    ...current,
    version: 2,
    combo: { template, style },
  };
  for (const page of CMS_PAGE_KEYS) {
    next[page] = {
      sections: completeV2PageSections(current[page]?.sections, template, style, page).map((section) =>
        fillSectionData(content, template, style, page, section),
      ),
    };
  }
  return next;
}

export function normalizeSiteContentCmsV2(
  content: SiteContent,
  template: TemplateKey,
  style: TemplateStyle,
  mode: CmsV2NormalizeMode = 'preserve',
): SiteContent {
  const legacyNoticeBannerItems = content.modularPagesV2 ? noticeBannerItemsFromV2(content.modularPagesV2) : [];
  const modularPagesV2 = ensureCompleteModularPagesV2(content, template, style, mode);
  const announcements = textList(content.announcements);
  const normalizedAnnouncements = announcements.length
    ? announcements
    : legacyNoticeBannerItems.length
      ? legacyNoticeBannerItems
      : announcementLines(content);
  return SiteContentSchema.parse({
    ...content,
    announcements: normalizedAnnouncements,
    cmsV2: { ...(content.cmsV2 ?? {}), enabled: true },
    modularPagesV2,
  });
}
