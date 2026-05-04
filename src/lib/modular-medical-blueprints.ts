/**
 * Praxen (medical) — spec-modular v1 (`docs/spec-praxen.md`).
 */

import type { TemplateStyle } from '@/lib/branch-config';

export type MedicalModularPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

const MEDICAL_HOME: readonly string[] = [
  'noticeBanner',
  'hero',
  'keywordBand',
  'storyTeaser',
  'serviceCards',
  'serviceInfo',
  'team',
  'appointmentBooking',
  'galleryPreview',
  'testimonials',
  'newsTeaser',
  'contactPreview',
];

const MEDICAL_SERVICES: readonly string[] = [
  'noticeBanner',
  'hero',
  'serviceInfo',
  'serviceCards',
  'team',
  'appointmentBooking',
  'testimonials',
  'galleryPreview',
  'faq',
  'cta',
];

const MEDICAL_GALLERY: readonly string[] = [
  'noticeBanner',
  'hero',
  'teaserList',
  'gallery',
  'categoryCards',
  'testimonials',
  'cta',
];

const MEDICAL_ABOUT: readonly string[] = [
  'noticeBanner',
  'hero',
  'teaserList',
  'timeline',
  'team',
  'statsBand',
  'testimonials',
  'cta',
];

const MEDICAL_CONTACT: readonly string[] = [
  'noticeBanner',
  'hero',
  'contactDetails',
  'locations',
  'directions',
  'cta',
];

export const MEDICAL_SECTION_LABEL_DE: Record<string, string> = {
  noticeBanner: 'Hinweisbanner',
  hero: 'Hero',
  keywordBand: 'Keyword-Band',
  storyTeaser: 'Story / Haltung',
  serviceCards: 'Leistungen',
  serviceInfo: 'Service & Info',
  team: 'Ärzt:innen & Team',
  appointmentBooking: 'Online-Termin',
  galleryPreview: 'Praxis & Räume',
  testimonials: 'Patient:innenstimmen',
  newsTeaser: 'News',
  contactPreview: 'Kontakt-Teaser',
  teaserList: 'Teaser-Liste',
  gallery: 'Galerie',
  categoryCards: 'Schwerpunkte',
  timeline: 'Zeitstrahl',
  statsBand: 'Kennzahlen',
  faq: 'FAQ',
  cta: 'CTA',
  contactDetails: 'Kontaktdaten',
  locations: 'Standorte',
  directions: 'Wegbeschreibung',
};

export function medicalModularBlueprint(_style: TemplateStyle, page: MedicalModularPageKey): readonly string[] {
  void _style;
  if (page === 'home') return MEDICAL_HOME;
  if (page === 'services') return MEDICAL_SERVICES;
  if (page === 'gallery') return MEDICAL_GALLERY;
  if (page === 'about') return MEDICAL_ABOUT;
  return MEDICAL_CONTACT;
}
