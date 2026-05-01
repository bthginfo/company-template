/**
 * Declarative branch configuration — single source of truth.
 *
 * For each branch (8 total) this file declares:
 *  - which hero fields exist per style
 *  - which home-page sections appear per style
 *  - which services-page modules are available
 *  - which about-page extras exist
 *  - BranchTextFields that are filtered by style
 *
 * The admin reads this config to decide field/section visibility.
 * The frontend renders the same set — keeping them in sync means
 * zero drift between admin and live site.
 *
 * When adding a NEW field to the frontend, add it here first.
 * When adding a branch-specific module, declare it below.
 */

import type { TemplateKey } from './types';

/* ─── Style helpers ──────────────────────────────────────────────── */
export type TemplateStyle = 'classic' | 'modern' | 'bold';

/** Per-style boolean map — explicit, no ambiguity. */
export type PerStyle = { classic: boolean; modern: boolean; bold: boolean };

const NONE: PerStyle    = { classic: false, modern: false, bold: false };
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
  };

  /** About page optional extras */
  about: {
    extras: AboutExtra[];
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
};

/* ═══════════════════════════════════════════════════════════════════
   8 BRANCH CONFIGS — one per branch, exhaustive
   ═══════════════════════════════════════════════════════════════════ */

const restaurant: BranchConfig = {
  label: 'Restaurant',
  pages: { services: 'Speisekarte', gallery: 'Galerie', about: 'Über uns', contact: 'Kontakt' },
  paths: { services: '/speisekarte', gallery: '/galerie', about: '/ueber-uns', contact: '/kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NOT_BOLD,
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
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
  },
  about: { extras: ['press'] },
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
  },
  about: { extras: [] },
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
  },
  about: { extras: ['certifications'] },
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
  },
  about: { extras: [] },
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
  },
  about: { extras: [] },
};

const consulting: BranchConfig = {
  label: 'Beratung',
  pages: { services: 'Leistungen', gallery: 'Galerie', about: 'Über uns', contact: 'Kontakt' },
  paths: { services: '#leistungen', gallery: '#galerie', about: '#about', contact: '#kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NONE,         // extra branches don't render hero body
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
    },
    branchChips: true,
    marqueeWords: BOLD,
    logoStrip: MODERN,
    aboutImage: NOT_BOLD,
    softCtaFields: MODERN_BOLD,
    aboutTeaserMode: 'auto',
  },
  services: {
    headerImage: MODERN,
    modules: ['processSteps', 'packages'],
  },
  about: { extras: [] },
};

const medical: BranchConfig = {
  label: 'Praxis',
  pages: { services: 'Leistungen', gallery: 'Galerie', about: 'Über uns', contact: 'Kontakt' },
  paths: { services: '#leistungen', gallery: '#galerie', about: '#about', contact: '#kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NONE,
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
    },
    branchChips: true,
    marqueeWords: BOLD,
    logoStrip: MODERN,
    aboutImage: NOT_BOLD,
    softCtaFields: MODERN_BOLD,
    aboutTeaserMode: 'auto',
  },
  services: {
    headerImage: MODERN,
    modules: ['medicalNotice', 'doctors', 'booking'],
  },
  about: { extras: [] },
};

const fitness: BranchConfig = {
  label: 'Studio',
  pages: { services: 'Leistungen', gallery: 'Galerie', about: 'Über uns', contact: 'Kontakt' },
  paths: { services: '#leistungen', gallery: '#galerie', about: '#about', contact: '#kontakt' },
  home: {
    hero: {
      tagline: NOT_BOLD,
      subtitle: NOT_BOLD,
      body: NONE,
      bgImage: CLASSIC,
      cardImage: MODERN_BOLD,
    },
    branchChips: true,
    marqueeWords: BOLD,
    logoStrip: MODERN,
    aboutImage: NOT_BOLD,
    softCtaFields: MODERN_BOLD,
    aboutTeaserMode: 'auto',
  },
  services: {
    headerImage: MODERN,
    modules: ['programs', 'courses', 'packages'],
  },
  about: { extras: [] },
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
