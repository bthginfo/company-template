/**
 * Phase 6: build per-row render instructions so repeated slots use cumulative
 * `pageBlocksV1` merges (prefix up to each visible mapped block).
 *
 * `contentBase` and `mergedFull` must carry the same `pageBlocksV1[page]` array
 * (same length / order) so `mergeEndExclusive` indices match the full merge.
 */

import type { PageKey } from '../admin/admin-sections.js';
import type { ReactNode } from 'react';
import type { SiteContent } from './types.js';
import { mergePageBlocksIntoSiteContentForPagePrefix } from './page-blocks-v1-page-merge.js';
import { buildPageBlockSlotPlan, resolveLayoutSlotOrder } from './page-blocks-v1-slot-order.js';

export type SlotRenderInstruction = {
  key: string;
  slot: string;
  /** `null` = use `mergedFull` for this row (legacy slot order). */
  mergeEndExclusive: number | null;
};

/** Slot keys whose block is non-null — excluded keys are not valid `pageBlocksV1` targets (matches TemplateApp). */
export function availableSlotsForPageBlockPlan(
  blocks: Record<string, ReactNode | null | undefined>,
): Set<string> {
  return new Set(Object.keys(blocks).filter((k) => blocks[k] != null));
}

export function buildSlotRenderInstructions(args: {
  page: PageKey;
  contentBase: SiteContent;
  mergedFull: SiteContent;
  legacyOrder: string[];
  availableSlots: ReadonlySet<string>;
  /** When set, slots that fail this check are omitted (aligns block plan with layout `sectionVisibility`). */
  isSlotVisible?: (slot: string) => boolean;
}): SlotRenderInstruction[] {
  const slotOk = args.isSlotVisible ?? (() => true);

  const plan = buildPageBlockSlotPlan({
    page: args.page,
    content: args.contentBase,
    availableSlots: args.availableSlots,
  });

  if (plan.length) {
    return plan
      .filter((p) => slotOk(p.slot))
      .map((p) => ({
        key: `${p.slot}-${p.mergeEndExclusive}`,
        slot: p.slot,
        mergeEndExclusive: p.mergeEndExclusive,
      }));
  }

  const order = resolveLayoutSlotOrder({
    page: args.page,
    content: args.mergedFull,
    legacyOrder: args.legacyOrder,
    availableSlots: args.availableSlots,
  });

  return order
    .filter((slot) => slotOk(slot))
    .map((slot, i) => ({
      key: `${slot}-${i}`,
      slot,
      mergeEndExclusive: null,
    }));
}

export function siteContentForSlotInstruction(
  contentBase: SiteContent,
  mergedFull: SiteContent,
  page: PageKey,
  instruction: SlotRenderInstruction,
): SiteContent {
  if (instruction.mergeEndExclusive === null) return mergedFull;
  return mergePageBlocksIntoSiteContentForPagePrefix(
    contentBase,
    page,
    instruction.mergeEndExclusive,
  );
}
