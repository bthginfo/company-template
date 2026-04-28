/**
 * Single source of truth for the per-branch (and partly per-style) copy
 * overrides exposed via `SiteContent.branchText`.
 *
 * Used by:
 *   - `src/admin/AdminEditorBody.tsx`         (BranchTextEditor placeholders / hints)
 *   - `src/templates/_shared/TemplateApp.tsx` (render-time fallbacks)
 *   - `scripts/provision-tenant.ts`           (seed values for new tenants)
 *
 * Keeping all three layers wired to one map prevents drift — when copy
 * changes, every surface picks it up automatically.
 */

import type { TemplateKey } from './types';

export type BranchTextDefaults = {
  teaserSubtitle: string;
  marqueeWords: string[];
  galleryTeaserTitle: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  manifestEyebrow: string;
  manifestTitle: string;
  softCtaEyebrow: string;
  softCtaTitle: string;
  softCtaText: string;
  softCtaButton: string;
};

export const BRANCH_TEXT_DEFAULTS: Record<TemplateKey, BranchTextDefaults> = {
  restaurant: {
    teaserSubtitle:
      'Hausgemachte Pasta, Holzofen-Pizza und ein wechselndes Tagesgericht. Saisonal, ehrlich, ohne Kompromisse.',
    marqueeWords: ['Pasta fresca', 'Holzofen-Pizza', 'Naturweine', 'Antipasti', 'Tiramisu della Nonna', 'Tartufo nero'],
    galleryTeaserTitle: 'Bilder, die erzählen.',
    testimonialsEyebrow: 'Stimmen',
    testimonialsTitle: 'Was unsere Gäste sagen.',
    manifestEyebrow: 'Manifest',
    manifestTitle: 'Italianità, ehrlich gelebt.',
    softCtaEyebrow: 'Hunger?',
    softCtaTitle: 'Tisch reservieren oder einfach vorbeikommen.',
    softCtaText: 'Wir freuen uns, Sie an unserem Tisch begrüßen zu dürfen.',
    softCtaButton: 'Tisch reservieren',
  },

  salon: {
    teaserSubtitle:
      'Schnitt, Farbe, Pflege und Beauty – mit ehrlicher Beratung und hochwertigen Produkten.',
    marqueeWords: ['Hair', 'Skin', 'Soul', 'Balayage', 'Bridal', 'Spa', 'Treatment'],
    galleryTeaserTitle: 'Looks aus dem Studio.',
    testimonialsEyebrow: 'Stimmen',
    testimonialsTitle: 'Was unsere Kund:innen sagen.',
    manifestEyebrow: 'Manifest',
    manifestTitle: 'Schönheit, ehrlich gemeint.',
    softCtaEyebrow: 'Bereit für etwas Neues?',
    softCtaTitle: 'Termin vereinbaren oder kurz fragen.',
    softCtaText: 'Wir nehmen uns die Zeit – für Sie, für Ihren Look.',
    softCtaButton: 'Termin buchen',
  },

  tradesman: {
    teaserSubtitle:
      'Vom kleinen Notfall bis zur Großsanierung. Festpreis, Meisterprüfung, transparente Kommunikation.',
    marqueeWords: ['Notdienst 24/7', 'Festpreis-Garantie', 'Meisterbetrieb', 'KfW-Förderung', 'Smart Home', 'Wärmepumpe'],
    galleryTeaserTitle: 'Projekte aus der Werkstatt.',
    testimonialsEyebrow: 'Stimmen',
    testimonialsTitle: 'Was unsere Kund:innen sagen.',
    manifestEyebrow: 'Manifest',
    manifestTitle: 'Handwerk, ehrlich geliefert.',
    softCtaEyebrow: 'Etwas tropft?',
    softCtaTitle: 'Anfrage senden oder Notdienst rufen.',
    softCtaText: 'Wir melden uns innerhalb von 24 Stunden mit einem Festpreis-Angebot.',
    softCtaButton: 'Jetzt anfragen',
  },

  hotel: {
    teaserSubtitle:
      'Zimmer mit Bergblick, ein Spa zum Abschalten und ein Restaurant, in das wir selbst gerne gehen würden.',
    marqueeWords: ['Bergblick', 'Spa & Sauna', 'Frühstück', 'Bibliothek', 'Wandern', 'Lounge', 'Sonnenterrasse'],
    galleryTeaserTitle: 'Eindrücke aus dem Haus.',
    testimonialsEyebrow: 'Stimmen',
    testimonialsTitle: 'Was unsere Gäste sagen.',
    manifestEyebrow: 'Haltung',
    manifestTitle: 'Gastfreundschaft, ungeschminkt.',
    softCtaEyebrow: 'Pause buchen?',
    softCtaTitle: 'Ihr Aufenthalt – wir antworten persönlich.',
    softCtaText: 'Wir antworten persönlich – ohne Formularkette, mit allen Optionen für Ihren Aufenthalt.',
    softCtaButton: 'Zimmer anfragen',
  },

  tourism: {
    teaserSubtitle:
      'Geführte Touren für alle, die Tirol mehr als nur sehen wollen – klein, persönlich, authentisch.',
    marqueeWords: ['Berg', 'Tal', 'Wein', 'Geschichte', 'Foto', 'Hütte', 'Sonnenaufgang', 'Sterne'],
    galleryTeaserTitle: 'Momente aus den Bergen.',
    testimonialsEyebrow: 'Stimmen',
    testimonialsTitle: 'Was unsere Gäste erzählen.',
    manifestEyebrow: 'Manifest',
    manifestTitle: 'Berge, aber persönlich.',
    softCtaEyebrow: 'Auf in die Berge?',
    softCtaTitle: 'Tour buchen oder Beratung anfragen.',
    softCtaText: 'Wir beraten ehrlich, welche Tour zu Ihrer Gruppe und Saison passt.',
    softCtaButton: 'Tour buchen',
  },

  consulting: {
    teaserSubtitle:
      'Strategie, Workshops und Umsetzung – wir begleiten Sie vom ersten Workshop bis zur fertigen Roadmap.',
    marqueeWords: ['Strategie', 'Workshops', 'Analyse', 'Umsetzung', 'Coaching', 'Change'],
    galleryTeaserTitle: 'Einblicke in unsere Arbeit.',
    testimonialsEyebrow: 'Stimmen',
    testimonialsTitle: 'Was Kund:innen über uns sagen.',
    manifestEyebrow: 'Methode',
    manifestTitle: 'Klarheit vor Komplexität.',
    softCtaEyebrow: 'Bereit für den nächsten Schritt?',
    softCtaTitle: 'Lassen Sie uns sprechen.',
    softCtaText: 'Kostenloses Erstgespräch – unverbindlich, persönlich.',
    softCtaButton: 'Erstgespräch vereinbaren',
  },

  medical: {
    teaserSubtitle:
      'Moderne Diagnostik in einer Praxis, die sich Zeit nimmt. Online-Termine, klare Wege, faire Aufklärung.',
    marqueeWords: ['Vorsorge', 'Diagnostik', 'Therapie', 'Begleitung', 'Online-Termin', 'Notfall'],
    galleryTeaserTitle: 'Praxis & Räume.',
    testimonialsEyebrow: 'Stimmen',
    testimonialsTitle: 'Was unsere Patient:innen sagen.',
    manifestEyebrow: 'Haltung',
    manifestTitle: 'Medizin, die zuhört.',
    softCtaEyebrow: 'Termin nötig?',
    softCtaTitle: 'Online buchen – schnell und einfach.',
    softCtaText: 'Wir antworten innerhalb eines Werktages.',
    softCtaButton: 'Termin online buchen',
  },

  fitness: {
    teaserSubtitle:
      'Yoga, Pilates und Kleingruppen-Training in einem Studio, das auf Ihre Ziele schaut – nicht auf Ihre Schritte.',
    marqueeWords: ['Yoga', 'Pilates', 'Kleingruppen', 'Personal Training', 'Mobility', 'Athletic'],
    galleryTeaserTitle: 'Studio & Stimmung.',
    testimonialsEyebrow: 'Stimmen',
    testimonialsTitle: 'Was unsere Mitglieder sagen.',
    manifestEyebrow: 'Manifest',
    manifestTitle: 'Bewegung, ehrlich gemacht.',
    softCtaEyebrow: 'Probetraining?',
    softCtaTitle: 'Eine Stunde, kostenlos – schauen Sie vorbei.',
    softCtaText: 'Reservieren Sie Ihren Platz in Ihrer Wunsch-Klasse.',
    softCtaButton: 'Probetraining buchen',
  },
};

/** Shallow readonly accessor used by editor placeholders + render fallbacks. */
export function branchTextDefaults(tpl: TemplateKey): BranchTextDefaults {
  return BRANCH_TEXT_DEFAULTS[tpl] ?? BRANCH_TEXT_DEFAULTS.restaurant;
}
