/**
 * Per-branch Spez-Modular v1 editor configs (Tourismus, Salon, Handwerk, Beratung, Praxen, Fitness).
 * Jede Branche hat ein eigenes Admin-Modul (`Modular*Editor.tsx`), das diese Configs an `ModularSpecPageEditor` übergibt.
 * Restaurant und Hotel nutzen vollständig eigene Editor-Implementierungen (`ModularHomeEditor`, `ModularHotelEditor`).
 */

import type { ModularSpecEditorConfig, ModularSpecPageKey } from './ModularSpecPageEditor';
import { TOURISM_SECTION_LABEL_DE } from '@/lib/modular-tourism-blueprints';
import {
  importTourismModularFromLegacy,
  applyTourismModularToLegacy,
  hasTourismModularPage,
  hasAnyTourismModular,
} from '@/lib/modular-tourism';
import { SALON_SECTION_LABEL_DE } from '@/lib/modular-salon-blueprints';
import {
  importSalonModularFromLegacy,
  applySalonModularToLegacy,
  hasSalonModularPage,
  hasAnySalonModular,
} from '@/lib/modular-salon';
import { TRADESMAN_SECTION_LABEL_DE } from '@/lib/modular-tradesman-blueprints';
import {
  importTradesmanModularFromLegacy,
  applyTradesmanModularToLegacy,
  hasTradesmanModularPage,
  hasAnyTradesmanModular,
} from '@/lib/modular-tradesman';
import { CONSULTING_SECTION_LABEL_DE } from '@/lib/modular-consulting-blueprints';
import {
  importConsultingModularFromLegacy,
  applyConsultingModularToLegacy,
  hasConsultingModularPage,
  hasAnyConsultingModular,
} from '@/lib/modular-consulting';
import { MEDICAL_SECTION_LABEL_DE } from '@/lib/modular-medical-blueprints';
import {
  importMedicalModularFromLegacy,
  applyMedicalModularToLegacy,
  hasMedicalModularPage,
  hasAnyMedicalModular,
} from '@/lib/modular-medical';
import { FITNESS_SECTION_LABEL_DE } from '@/lib/modular-fitness-blueprints';
import {
  importFitnessModularFromLegacy,
  applyFitnessModularToLegacy,
  hasFitnessModularPage,
  hasAnyFitnessModular,
} from '@/lib/modular-fitness';

const PAGE_LABELS_STANDARD: Record<ModularSpecPageKey, string> = {
  home: 'Start',
  services: 'Leistungen',
  gallery: 'Galerie',
  about: 'Über uns',
  contact: 'Kontakt',
};

export const TOURISM_MODULAR_SPEC_CFG: ModularSpecEditorConfig = {
  tpl: 'tourism',
  branchLabelDe: 'Tourismus',
  specDoc: 'docs/spec-tourismus.md',
  pageLabels: {
    home: 'Start',
    services: 'Touren',
    gallery: 'Eindrücke',
    about: 'Guides',
    contact: 'Buchen',
  },
  sectionLabels: { ...TOURISM_SECTION_LABEL_DE },
  activationIntroDe:
    'Aktiviert das modulare Speicher-Modell für alle Tourismus-Unterseiten im gewählten Stil. Inhalte werden einmalig aus den bestehenden Feldern übernommen und bei Änderungen in die SiteContent-Felder zurückgemergt.',
  importFromLegacy: importTourismModularFromLegacy,
  applyToLegacy: applyTourismModularToLegacy,
  hasPage: hasTourismModularPage,
  hasAny: hasAnyTourismModular,
};

export const SALON_MODULAR_SPEC_CFG: ModularSpecEditorConfig = {
  tpl: 'salon',
  branchLabelDe: 'Salon',
  specDoc: 'docs/spec-salon.md',
  pageLabels: {
    home: 'Start',
    services: 'Leistungen',
    gallery: 'Looks',
    about: 'Studio',
    contact: 'Termin',
  },
  sectionLabels: { ...SALON_SECTION_LABEL_DE },
  activationIntroDe:
    'Aktiviert das modulare Speicher-Modell für alle Salon-Unterseiten im gewählten Stil. Inhalte werden einmalig aus den bestehenden Feldern übernommen und bei Änderungen in die SiteContent-Felder zurückgemergt.',
  importFromLegacy: importSalonModularFromLegacy,
  applyToLegacy: applySalonModularToLegacy,
  hasPage: hasSalonModularPage,
  hasAny: hasAnySalonModular,
};

export const TRADESMAN_MODULAR_SPEC_CFG: ModularSpecEditorConfig = {
  tpl: 'tradesman',
  branchLabelDe: 'Handwerk',
  specDoc: 'docs/spec-handwerk.md',
  pageLabels: {
    home: 'Start',
    services: 'Leistungen',
    gallery: 'Referenzen',
    about: 'Betrieb',
    contact: 'Anfrage',
  },
  sectionLabels: { ...TRADESMAN_SECTION_LABEL_DE },
  activationIntroDe:
    'Aktiviert das modulare Speicher-Modell für alle Handwerks-Unterseiten im gewählten Stil. Inhalte werden einmalig aus den bestehenden Feldern übernommen und bei Änderungen in die SiteContent-Felder zurückgemergt.',
  importFromLegacy: importTradesmanModularFromLegacy,
  applyToLegacy: applyTradesmanModularToLegacy,
  hasPage: hasTradesmanModularPage,
  hasAny: hasAnyTradesmanModular,
};

export const CONSULTING_MODULAR_SPEC_CFG: ModularSpecEditorConfig = {
  tpl: 'consulting',
  branchLabelDe: 'Beratung',
  specDoc: 'docs/spec-beratung.md',
  pageLabels: PAGE_LABELS_STANDARD,
  sectionLabels: { ...CONSULTING_SECTION_LABEL_DE },
  activationIntroDe:
    'Aktiviert das modulare Speicher-Modell für alle Beratungs-Unterseiten im gewählten Stil. Inhalte werden einmalig aus den bestehenden Feldern übernommen und bei Änderungen in die SiteContent-Felder zurückgemergt.',
  importFromLegacy: importConsultingModularFromLegacy,
  applyToLegacy: applyConsultingModularToLegacy,
  hasPage: hasConsultingModularPage,
  hasAny: hasAnyConsultingModular,
};

export const MEDICAL_MODULAR_SPEC_CFG: ModularSpecEditorConfig = {
  tpl: 'medical',
  branchLabelDe: 'Praxis',
  specDoc: 'docs/spec-praxen.md',
  pageLabels: PAGE_LABELS_STANDARD,
  sectionLabels: { ...MEDICAL_SECTION_LABEL_DE },
  activationIntroDe:
    'Aktiviert das modulare Speicher-Modell für alle Praxis-Unterseiten im gewählten Stil. Inhalte werden einmalig aus den bestehenden Feldern übernommen und bei Änderungen in die SiteContent-Felder zurückgemergt.',
  importFromLegacy: importMedicalModularFromLegacy,
  applyToLegacy: applyMedicalModularToLegacy,
  hasPage: hasMedicalModularPage,
  hasAny: hasAnyMedicalModular,
};

export const FITNESS_MODULAR_SPEC_CFG: ModularSpecEditorConfig = {
  tpl: 'fitness',
  branchLabelDe: 'Fitness',
  specDoc: 'docs/spec-fitness.md',
  pageLabels: PAGE_LABELS_STANDARD,
  sectionLabels: { ...FITNESS_SECTION_LABEL_DE },
  activationIntroDe:
    'Aktiviert das modulare Speicher-Modell für alle Fitness-Unterseiten im gewählten Stil. Inhalte werden einmalig aus den bestehenden Feldern übernommen und bei Änderungen in die SiteContent-Felder zurückgemergt.',
  importFromLegacy: importFitnessModularFromLegacy,
  applyToLegacy: applyFitnessModularToLegacy,
  hasPage: hasFitnessModularPage,
  hasAny: hasAnyFitnessModular,
};

