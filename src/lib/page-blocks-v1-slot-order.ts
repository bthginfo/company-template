/**
 * Phase 5: derive renderer slot order from `pageBlocksV1[page]` when present.
 * Maps `AdminSectionKey` → catalog / `blocks` map keys used by TemplateApp & extras.
 */

import { HOME_CATALOG_BLOCK_TO_ADMIN, type AdminSectionKey, type PageKey } from '@/admin/admin-sections';
import type { SiteContent } from '@/lib/types';

const HOME_SLOT_BY_ADMIN: Map<AdminSectionKey, string> = (() => {
  const m = new Map<AdminSectionKey, string>();
  for (const [slot, adm] of Object.entries(HOME_CATALOG_BLOCK_TO_ADMIN) as [string, AdminSectionKey | null][]) {
    if (adm) m.set(adm, slot);
  }
  return m;
})();

/** Services / Leistungen page — PageHero + headers are outside the slot loop. */
const SERVICES_SLOT: Partial<Record<AdminSectionKey, string>> = {
  extraServiceCards: 'list',
  highlights: 'highlights',
  servicesList: 'list',
  menu: 'module',
  rooms: 'module',
  tours: 'module',
  treatments: 'module',
  courses: 'module',
  packages: 'module',
  processSteps: 'module',
  doctors: 'module',
  booking: 'module',
  fundingModule: 'module',
  emergencyBanner: 'module',
  programs: 'module',
  medicalNotice: 'module',
  serviceProcess: 'process',
  faq: 'faq',
  servicesCta: 'cta',
};

const GALLERY_SLOT: Partial<Record<AdminSectionKey, string>> = {
  galleryStory: 'story',
  galleryGrid: 'grid',
  galleryCategories: 'categories',
  galleryCta: 'cta',
};

const ABOUT_SLOT: Partial<Record<AdminSectionKey, string>> = {
  aboutIntro: 'intro',
  values: 'values',
  timeline: 'timeline',
  team: 'team',
  aboutNumbers: 'numbers',
  certifications: 'certifications',
  press: 'press',
  aboutTestimonials: 'testimonials',
  aboutCta: 'cta',
};

const CONTACT_SLOT: Partial<Record<AdminSectionKey, string>> = {
  contactDetails: 'block',
  contactForm: 'block',
  locations: 'locations',
  arrival: 'arrival',
  faq: 'faq',
  contactCta: 'cta',
};

export function adminSectionToCatalogSlot(page: PageKey, admin: AdminSectionKey): string | null {
  switch (page) {
    case 'home': {
      if (admin === 'hero' || admin === 'announcements') return null;
      if (admin === 'softCta') return null;
      return HOME_SLOT_BY_ADMIN.get(admin) ?? null;
    }
    case 'services':
      return SERVICES_SLOT[admin] ?? null;
    case 'gallery':
      return GALLERY_SLOT[admin] ?? null;
    case 'about':
      return ABOUT_SLOT[admin] ?? null;
    case 'contact':
      return CONTACT_SLOT[admin] ?? null;
    default:
      return null;
  }
}

/**
 * When `pageBlocksV1[page]` is a non-empty array, build slot order from visible
 * blocks (admin → catalog). Otherwise return `legacyOrder`.
 */
export function resolveLayoutSlotOrder(args: {
  page: PageKey;
  content: SiteContent;
  legacyOrder: string[];
  availableSlots: ReadonlySet<string>;
}): string[] {
  const list = args.content.pageBlocksV1?.[args.page];
  if (!list?.length) return args.legacyOrder;

  const slots: string[] = [];
  for (const inst of list) {
    if (inst.isVisible === false) continue;
    const slot = adminSectionToCatalogSlot(args.page, inst.type as AdminSectionKey);
    if (!slot || !args.availableSlots.has(slot)) continue;
    slots.push(slot);
  }
  return slots.length > 0 ? slots : args.legacyOrder;
}
