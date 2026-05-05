/**
 * Hides modular *home* section editors when their merged output has no matching
 * slot in the effective frontend home flow (template × style × sectionOrder × visibility).
 *
 * Unknown `type` strings default to visible so new spec blocks stay editable until mapped here.
 */

import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';

/** Core five + hotel: bold home uses an inline hero marquee, not the `marquee` catalog slot. */
const BOLD_INLINE_MARQUEE_TEMPLATES: readonly TemplateKey[] = [
  'restaurant',
  'salon',
  'tradesman',
  'hotel',
  'tourism',
];

function slotHit(slots: ReadonlySet<string>, keys: readonly string[]): boolean {
  return keys.some((k) => slots.has(k));
}

/**
 * Which home layout slots a modular section type feeds, for the given template.
 * `null` = treat as unknown → show in admin (safe default).
 */
function slotsForModularHomeType(template: TemplateKey, sectionType: string): readonly string[] | null {
  const shared: Record<string, readonly string[]> = {
    actionBar: ['action'],
    featuredDishesGrid: ['signature'],
    featuredDishes: ['signature'],
    featuredItems: ['signature', 'services'],
    storyTeaser: ['about'],
    galleryPreview: ['gallery'],
    labelBand: ['logos'],
    testimonials: ['testimonials'],
    statsBand: ['numbers'],
    newsTeaser: ['news'],
    cta: ['softCta'],
  };
  if (sectionType in shared) return shared[sectionType]!;

  switch (template) {
    case 'hotel':
      if (sectionType === 'featuredAreas' || sectionType === 'roomSelection') return ['rooms'];
      if (sectionType === 'brandLogos') return ['logos'];
      break;
    case 'salon':
      if (sectionType === 'featuredServices' || sectionType === 'serviceCards') return ['treatments'];
      if (sectionType === 'featuredLooks' || sectionType === 'featuredLooksBand') return ['signature'];
      if (sectionType === 'brandLogos') return ['logos'];
      if (sectionType === 'ctaBand') return ['softCta'];
      if (sectionType === 'quoteWall') return ['testimonials'];
      if (sectionType === 'storySplit') return ['about'];
      break;
    case 'tourism':
      if (sectionType === 'tourOverviewCards' || sectionType === 'tourOverviewList' || sectionType === 'tourCards') {
        return ['tours', 'signature'];
      }
      if (sectionType === 'brandLogos') return ['logos'];
      if (sectionType === 'tourSchedule' || sectionType === 'tourSelection') return ['tours', 'signature'];
      break;
    case 'tradesman':
      if (sectionType === 'featuredServices' || sectionType === 'serviceCards' || sectionType === 'serviceList') {
        return ['services'];
      }
      if (sectionType === 'serviceOverviewCards' || sectionType === 'serviceOverviewList') return ['services'];
      if (sectionType === 'keywordBand') return ['logos'];
      if (sectionType === 'fundingCalculator') return ['funding'];
      if (sectionType === 'ctaBand') return ['softCta'];
      if (sectionType === 'quoteWall') return ['testimonials'];
      if (sectionType === 'storySplit') return ['about'];
      break;
    case 'consulting':
    case 'medical':
    case 'fitness':
      if (sectionType === 'keywordBand') return ['logos'];
      if (sectionType === 'serviceCards') return ['services'];
      if (sectionType === 'serviceInfo') return ['services', 'branchModules'];
      if (sectionType === 'processTextColumns' || sectionType === 'processCards') return ['services', 'branchModules'];
      if (sectionType === 'pricingPackages') return ['spotlight', 'services'];
      if (sectionType === 'team' || sectionType === 'trainers') return ['team'];
      if (sectionType === 'classCards') return ['branchModules'];
      if (sectionType === 'trainingPlanOverview') return ['numbers'];
      if (sectionType === 'galleryPreview') return ['gallery'];
      if (sectionType === 'contactPreview') return ['contact'];
      if (sectionType === 'appointmentBooking') return ['contact'];
      break;
    default:
      break;
  }
  return null;
}

export function isModularHomeSectionAdminVisible(
  template: TemplateKey,
  style: TemplateStyle,
  sectionType: string,
  effectiveHomeSlots: readonly string[],
): boolean {
  const slots = new Set(effectiveHomeSlots);

  if (sectionType === 'noticeBanner' || sectionType === 'hero') return true;

  if (template === 'tradesman' && sectionType === 'stickyEmergencyBanner') return true;

  if (sectionType === 'featureImage' && (template === 'salon' || template === 'tradesman')) return true;

  const marqueeTypes = new Set(['marqueeBand', 'testimonialMarquee']);
  if (marqueeTypes.has(sectionType)) {
    if (style !== 'bold') return false;
    if (slots.has('marquee')) return true;
    return BOLD_INLINE_MARQUEE_TEMPLATES.includes(template);
  }

  const mapped = slotsForModularHomeType(template, sectionType);
  if (mapped === null) return true;
  if (mapped.length === 0) return false;
  return slotHit(slots, mapped);
}
