/**
 * Applies all template modular overlays (restaurant → fitness) in one pass.
 * Used after `mergePageBlocksIntoSiteContentForPage` so modular section data
 * wins over stale `pageBlocksV1` projections onto the same legacy fields.
 */

import type { SiteContent, TemplateKey } from './types.js';
import type { TemplateStyle } from './branch-config.js';
import { applyRestaurantModularOverlay } from './modular-restaurant.js';
import { applyHotelModularOverlay } from './modular-hotel.js';
import { applyTourismModularOverlay } from './modular-tourism.js';
import { applySalonModularOverlay } from './modular-salon.js';
import { applyTradesmanModularOverlay } from './modular-tradesman.js';
import { applyConsultingModularOverlay } from './modular-consulting.js';
import { applyMedicalModularOverlay } from './modular-medical.js';
import { applyFitnessModularOverlay } from './modular-fitness.js';

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
