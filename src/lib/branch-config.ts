/**
 * Declarative branch configuration — single source of truth.
 *
 * For each branch (8 total) this file declares which fields/sections
 * the frontend actually renders per (branch, style). The admin reads this
 * config and shows EXACTLY those fields/sections — no more, no less.
 *
 * Two directions of contract:
 *  1. Admin-undershoot prevention: every editable thing in the frontend
 *     has a flag here that admin can read.
 *  2. Admin-overshoot prevention: admin only renders sections/fields
 *     for which the corresponding (branch, style) frontend renders them.
 *
 * When adding a NEW field/section to the frontend, add the flag here first.
 */

import type { TemplateKey } from './types';

/* ─── Style helpers ──────────────────────────────────────────────── */
export type TemplateStyle = 'classic' | 'modern' | 'bold';

/** Per-style boolean map — explicit, no ambiguity. */
export type PerStyle = { classic: boolean; modern: boolean; bold: boolean };

const NONE: PerStyle    = { classic: false, modern: false, bold: false };
const ALL: PerStyle     = { classic: true,  modern: true,  bold: true  };
const CLASSIC: PerStyle = { classic: true,  modern: false, bold: false };
const MODERN: PerStyle  = { classic: false, modern: true,  bold: false };
const BOLD: PerStyle    = { classic: false, modern: false, bold: true  };
const NOT_BOLD: PerStyle = { classic: true, modern: true, bold: false };
const MODERN_BOLD: PerStyle = { classic: false, modern: true, bold: true };

/* ─── Service module identifiers ─────────────────────────────────── */
export type ServiceModule =
  | 'menu'             // restaurant
  | 'rooms'            // hotel
  | 'tours'            // tourism
  | 'treatments'       // salon
  | 'funding'          // tradesman
  | 'emergencyBanner'  // tradesman
  | 'courses'          // fitness
  | 'packages'         // fitness, consulting
  | 'processSteps'     // consulting
  | 'doctors'          // medical
  | 'booking'          // medical
  | 'medicalNotice'    // medical
  | 'programs';        // fitness

/* ─── About-page optional sections ───────────────────────────────── */
export type AboutExtra = 'certifications' | 'press';

/* ─── Config schema ──────────────────────────────────────────────── */
export type BranchConfig = {
  /** Display label for this branch (used in sidebar labels etc.) */
  label: string;

  /** Page labels in admin sidebar */
  pages: {
    services: string;
    gallery: string;
    about: string;
    contact: string;
  };

  /** Preview paths for live-view links */
  paths: {
    services: string;
    gallery: string;
    about: string;
    contact: string;
  };

  /** Home page field visibility */
  home: {
    hero: {
      /** brand.tagline above hero title */
      tagline: PerStyle;
      /** hero.subtitle below title */
      subtitle: PerStyle;
      /** hero.body — longer description textarea */
      body: PerStyle;
      /** Classic full-bleed hero background image */
      bgImage: PerStyle;
      /** Modern/Bold card-style hero image */
      cardImage: PerStyle;
      /** Hero CTAs (primary + secondary) actually wired to the rendered hero. */
      primaryCta: PerStyle;
      secondaryCta: PerStyle;
      /** Floating heroBadge (Google rating block) — extras-modern only. */
      heroBadge: PerStyle;
    };
    /** Branch-keyword chips below hero (extra branches) */
    branchChips: boolean;
    /** Marquee word band */
    marqueeWords: PerStyle;
    /** Logo strip (partner/press logos) */
    logoStrip: PerStyle;
    /** About teaser image in home about section */
    aboutImage: PerStyle;
    /** SoftCTA override fields (eyebrow, title, text, button) */
    softCtaFields: PerStyle;
    /**
     * Which BranchTextFields keys to use for the about teaser:
     * - 'manifest': manifestEyebrow, manifestTitle (bold)
     * - 'standard': aboutTeaserEyebrow (classic/modern)
     * In practice both sets exist per branch, but this controls what
     * the admin shows in "Über-uns-Teaser" section.
     */
    aboutTeaserMode: 'manifest' | 'standard' | 'auto';
  };

  /** Services page field visibility */
  services: {
    /** Header image on services page */
    headerImage: PerStyle;
    /** Modules shown on this branch's services page */
    modules: ServiceModule[];
    /** Whether the highlights ribbon (4 short USPs) renders */
    showHighlights: boolean;
    /** Whether the "So läuft es ab" 4-step block renders */
    showProcess: boolean;
    /** Whether the FAQ block renders */
    showFaq: boolean;
    /** Whether the closing CTA band renders */
    showCta: boolean;
  };

  /** Gallery page field visibility */
  gallery: {
    /** Galerie-Story (story copy with captions) */
    showStory: boolean;
    /** Gallery upload widget (admin-only convenience) */
    showUpload: boolean;
    /** Categories card row below grid */
    showCategories: boolean;
    /** Closing CTA band */
    showCta: boolean;
  };

  /** About page field visibility */
  about: {
    /** Optional extras (certifications / press) */
    extras: AboutExtra[];
    /** Values block (3 principles) */
    showValues: boolean;
    /** Timeline / milestones */
    showTimeline: boolean;
    /** Numbers / aboutNumbers band */
    showNumbers: boolean;
    /** Testimonials section on the about page */
    showTestimonials: boolean;
    /** Closing CTA band */
    showCta: boolean;
  };

  /** Contact page field visibility */
  contact: {
    /** Inline contact form */
    showForm: boolean;
    /** Arrival / Wegbeschreibung block */
    showArrival: boolean;
    /** Closing CTA band */
    showCta: boolean;
  };
};

/* ─── BranchTextFields style visibility ──────────────────────────── */

/** Keys that are filtered by style in BranchTextFields */
export type BranchTextStyleFilter = {
  heroEyebrow: PerStyle;
  aboutSidebarEyebrow: PerStyle;
  marqueeWords: PerStyle;
  manifestEyebrow: PerStyle;
  manifestTitle: PerStyle;
  serviceCardNote: PerStyle;
};

/**
 * Style visibility for BranchTextFields keys.
 * All other BranchTextKeys are visible in ALL styles.
 */
export const BRANCH_TEXT_STYLE_FILTERS: BranchTextStyleFilter = {
  heroEyebrow: BOLD,
  aboutSidebarEyebrow: MODERN,
  marqueeWords: BOLD,
  manifestEyebrow: BOLD,
  manifestTitle: BOLD,
  serviceCardNote: MODERN,
};

/* ═══════════════════════════════════════════════════════════════════
   8 BRANCH CONFIGS — one per branch, exhaustive
   ═══════════════════════════════════════════════════════════════════ */

/** Default subpage flags for the "core 5" branches (all sections rendered). */
const CORE_SUBPAGES = {
  services: { showHighlights: true, showProcess: true, showFaq: true, showCta: true },
  gallery:  { showStory: true, showUpload: true, showCategories: true, showCta: true },
  about:    { showValues: true, showTimeline: true, showNumbers: true, showTestimonials: true, showCta: true },
  contact:  { showForm: true, showArrival: true, showCta: true },
} as const;

const restaurant: BranchConfig = {
  label: 'Restaurant',
  pages: { services: 'Speisekarte', gallery: 'Galerie', about: 'Über uns', contact: 'Kontakt' },
  paths: { services: '/speisekarte', gallery: '/galerie', about: '/ueber-uns', contact: '/kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NOT_BOLD,    // classic Hero + modern hero both render `(hero as any).body`
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
      primaryCta: ALL,
      secondaryCta: ALL,
      heroBadge: NONE,
    },
    branchChips: false,
    marqueeWords: BOLD,
    logoStrip: MODERN,
    aboutImage: NOT_BOLD,
    softCtaFields: MODERN_BOLD,
    aboutTeaserMode: 'auto',
  },
  services: {
    headerImage: MODERN,
    modules: ['menu'],
    ...CORE_SUBPAGES.services,
  },
  gallery: { ...CORE_SUBPAGES.gallery },
  about: { extras: ['press'], ...CORE_SUBPAGES.about },
  contact: { ...CORE_SUBPAGES.contact },
};

const salon: BranchConfig = {
  label: 'Salon',
  pages: { services: 'Leistungen', gallery: 'Looks', about: 'Studio', contact: 'Termin' },
  paths: { services: '/leistungen', gallery: '/galerie', about: '/ueber-uns', contact: '/kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NOT_BOLD,
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
      primaryCta: ALL,
      secondaryCta: ALL,
      heroBadge: NONE,
    },
    branchChips: false,
    marqueeWords: BOLD,
    logoStrip: MODERN,
    aboutImage: NOT_BOLD,
    softCtaFields: MODERN_BOLD,
    aboutTeaserMode: 'auto',
  },
  services: {
    headerImage: MODERN,
    modules: ['treatments'],
    ...CORE_SUBPAGES.services,
  },
  gallery: { ...CORE_SUBPAGES.gallery },
  about: { extras: [], ...CORE_SUBPAGES.about },
  contact: { ...CORE_SUBPAGES.contact },
};

const tradesman: BranchConfig = {
  label: 'Handwerk',
  pages: { services: 'Leistungen', gallery: 'Referenzen', about: 'Betrieb', contact: 'Anfrage' },
  paths: { services: '/leistungen', gallery: '/referenzen', about: '/ueber-uns', contact: '/kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NOT_BOLD,
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
      primaryCta: ALL,
      secondaryCta: ALL,
      heroBadge: NONE,
    },
    branchChips: false,
    marqueeWords: BOLD,
    logoStrip: MODERN,
    aboutImage: NOT_BOLD,
    softCtaFields: MODERN_BOLD,
    aboutTeaserMode: 'auto',
  },
  services: {
    headerImage: MODERN,
    modules: ['funding', 'emergencyBanner'],
    ...CORE_SUBPAGES.services,
  },
  gallery: { ...CORE_SUBPAGES.gallery },
  about: { extras: ['certifications'], ...CORE_SUBPAGES.about },
  contact: { ...CORE_SUBPAGES.contact },
};

const hotel: BranchConfig = {
  label: 'Hotel',
  pages: { services: 'Zimmer', gallery: 'Haus & Spa', about: 'Geschichte', contact: 'Reservieren' },
  paths: { services: '/zimmer', gallery: '/galerie', about: '/ueber-uns', contact: '/kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NOT_BOLD,
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
      primaryCta: ALL,
      secondaryCta: ALL,
      heroBadge: NONE,
    },
    branchChips: false,
    marqueeWords: BOLD,
    logoStrip: MODERN,
    aboutImage: NOT_BOLD,
    softCtaFields: MODERN_BOLD,
    aboutTeaserMode: 'auto',
  },
  services: {
    headerImage: MODERN,
    modules: ['rooms'],
    ...CORE_SUBPAGES.services,
  },
  gallery: { ...CORE_SUBPAGES.gallery },
  about: { extras: [], ...CORE_SUBPAGES.about },
  contact: { ...CORE_SUBPAGES.contact },
};

const tourism: BranchConfig = {
  label: 'Tourismus',
  pages: { services: 'Touren', gallery: 'Eindrücke', about: 'Guides', contact: 'Buchen' },
  paths: { services: '/touren', gallery: '/galerie', about: '/ueber-uns', contact: '/kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NOT_BOLD,
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
      primaryCta: ALL,
      secondaryCta: ALL,
      heroBadge: NONE,
    },
    branchChips: false,
    marqueeWords: BOLD,
    logoStrip: MODERN,
    aboutImage: NOT_BOLD,
    softCtaFields: MODERN_BOLD,
    aboutTeaserMode: 'auto',
  },
  services: {
    headerImage: MODERN,
    modules: ['tours'],
    ...CORE_SUBPAGES.services,
  },
  gallery: { ...CORE_SUBPAGES.gallery },
  about: { extras: [], ...CORE_SUBPAGES.about },
  contact: { ...CORE_SUBPAGES.contact },
};

/* ─── Extras: subpages (same section catalog as core) ───────────────
 * Extras use the same subpage section catalog plus sectionOrder /
 * visibility as the core five; only home layout stays branch-specific.
 * ────────────────────────────────────────────────────────────────── */
const EXTRA_SUBPAGES = {
  services: { showHighlights: true, showProcess: true, showFaq: true, showCta: true },
  gallery:  { showStory: true, showUpload: true, showCategories: true, showCta: true },
  about:    { showValues: true, showTimeline: true, showNumbers: true, showTestimonials: true, showCta: true },
  contact:  { showForm: true, showArrival: true, showCta: true },
} as const;

const consulting: BranchConfig = {
  label: 'Beratung',
  pages: { services: 'Leistungen', gallery: 'Galerie', about: 'Über uns', contact: 'Kontakt' },
  paths: { services: '/leistungen', gallery: '/galerie', about: '/ueber-uns', contact: '/kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NONE,         // extra branches don't render hero body
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
      primaryCta: ALL,
      secondaryCta: ALL,
      heroBadge: MODERN,  // floating badge only in modern extras hero
    },
    branchChips: true,
    marqueeWords: BOLD,
    logoStrip: NONE,      // extras don't render logo strip
    aboutImage: NOT_BOLD,
    softCtaFields: NONE,  // extras have no softCta — they use ContactSection
    aboutTeaserMode: 'standard',
  },
  services: {
    headerImage: NONE,
    modules: ['processSteps', 'packages'],
    ...EXTRA_SUBPAGES.services,
    showProcess: true,
  },
  gallery: { ...EXTRA_SUBPAGES.gallery },
  about: { extras: [], ...EXTRA_SUBPAGES.about },
  contact: { ...EXTRA_SUBPAGES.contact },
};

const medical: BranchConfig = {
  label: 'Praxis',
  pages: { services: 'Leistungen', gallery: 'Galerie', about: 'Über uns', contact: 'Kontakt' },
  paths: { services: '/leistungen', gallery: '/galerie', about: '/ueber-uns', contact: '/kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NONE,
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
      primaryCta: ALL,
      secondaryCta: ALL,
      heroBadge: MODERN,
    },
    branchChips: true,
    marqueeWords: BOLD,
    logoStrip: NONE,
    aboutImage: NOT_BOLD,
    softCtaFields: NONE,
    aboutTeaserMode: 'standard',
  },
  services: {
    headerImage: NONE,
    modules: ['medicalNotice', 'doctors', 'booking'],
    ...EXTRA_SUBPAGES.services,
  },
  gallery: { ...EXTRA_SUBPAGES.gallery },
  about: { extras: [], ...EXTRA_SUBPAGES.about },
  contact: { ...EXTRA_SUBPAGES.contact },
};

const fitness: BranchConfig = {
  label: 'Studio',
  pages: { services: 'Leistungen', gallery: 'Galerie', about: 'Über uns', contact: 'Kontakt' },
  paths: { services: '/leistungen', gallery: '/galerie', about: '/ueber-uns', contact: '/kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NONE,
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
      primaryCta: ALL,
      secondaryCta: ALL,
      heroBadge: MODERN,
    },
    branchChips: true,
    marqueeWords: BOLD,
    logoStrip: NONE,
    aboutImage: NOT_BOLD,
    softCtaFields: NONE,
    aboutTeaserMode: 'standard',
  },
  services: {
    headerImage: NONE,
    modules: ['programs', 'courses', 'packages'],
    ...EXTRA_SUBPAGES.services,
  },
  gallery: { ...EXTRA_SUBPAGES.gallery },
  about: { extras: [], ...EXTRA_SUBPAGES.about },
  contact: { ...EXTRA_SUBPAGES.contact },
};

/* ─── Registry ───────────────────────────────────────────────────── */
export const BRANCH_CONFIGS: Record<TemplateKey, BranchConfig> = {
  restaurant,
  salon,
  tradesman,
  hotel,
  tourism,
  consulting,
  medical,
  fitness,
};

/** Get the config for a given branch. */
export function getBranchConfig(tpl: TemplateKey): BranchConfig {
  return BRANCH_CONFIGS[tpl];
}

/** Check if a PerStyle flag is active for the given style. */
export function isActiveForStyle(flag: PerStyle, style: TemplateStyle | undefined): boolean {
  if (!style) return true; // if style unknown, show everything
  return flag[style];
}

/** Runtime guard for `PerStyle` objects (used by drift scripts). */
export function isPerStyleFlag(v: unknown): v is PerStyle {
  if (!v || typeof v !== 'object') return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.classic === 'boolean' &&
    typeof o.modern === 'boolean' &&
    typeof o.bold === 'boolean'
  );
}

/** Check if this branch has a specific service module. */
export function hasModule(tpl: TemplateKey, mod: ServiceModule): boolean {
  return BRANCH_CONFIGS[tpl].services.modules.includes(mod);
}

/** Check if a BranchTextKey should be visible in the given style. */
export function isBranchTextKeyVisible(key: string, style: TemplateStyle | undefined): boolean {
  const filter = (BRANCH_TEXT_STYLE_FILTERS as Record<string, PerStyle | undefined>)[key];
  if (!filter) return true; // not filtered → visible in all styles
  return isActiveForStyle(filter, style);
}

/** Convenience: is this template one of the three "extra" branches? */
export function isExtraBranch(tpl: TemplateKey): boolean {
  return tpl === 'consulting' || tpl === 'medical' || tpl === 'fitness';
}
