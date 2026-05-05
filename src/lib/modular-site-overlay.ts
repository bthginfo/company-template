/**
 * Applies all template modular overlays (restaurant → fitness) in one pass.
 * Used after `mergePageBlocksIntoSiteContentForPage` so modular section data
 * wins over stale `pageBlocksV1` projections onto the same legacy fields.
 */

import type { SiteContent, TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { applyRestaurantModularOverlay } from '@/lib/modular-restaurant';
import { applyHotelModularOverlay } from '@/lib/modular-hotel';
import { applyTourismModularOverlay } from '@/lib/modular-tourism';
import { applySalonModularOverlay } from '@/lib/modular-salon';
import { applyTradesmanModularOverlay } from '@/lib/modular-tradesman';
import { applyConsultingModularOverlay } from '@/lib/modular-consulting';
import { applyMedicalModularOverlay } from '@/lib/modular-medical';
import { applyFitnessModularOverlay } from '@/lib/modular-fitness';

export function withModularSiteContent(content: SiteContent, variant: TemplateKey, style: TemplateStyle): SiteContent {
  let c = applyRestaurantModularOverlay(content, variant, style);
  c = applyHotelModularOverlay(c, variant, style);
  c = applyTourismModularOverlay(c, variant, style);
  c = applySalonModularOverlay(c, variant, style);
  c = applyTradesmanModularOverlay(c, variant, style);
  c = applyConsultingModularOverlay(c, variant, style);
  c = applyMedicalModularOverlay(c, variant, style);
  c = applyFitnessModularOverlay(c, variant, style);
  return c;
}
