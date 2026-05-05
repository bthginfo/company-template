/**
 * Phase 6: build per-row render instructions so repeated slots use cumulative
 * `pageBlocksV1` merges (prefix up to each visible mapped block).
 */

import type { PageKey } from '@/admin/admin-sections';
import type { SiteContent } from '@/lib/types';
import { mergePageBlocksIntoSiteContentForPagePrefix } from '@/lib/page-blocks-v1-page-merge';
import { buildPageBlockSlotPlan, resolveLayoutSlotOrder } from '@/lib/page-blocks-v1-slot-order';

export type SlotRenderInstruction = {
  key: string;
  slot: string;
  /** `null` = use `mergedFull` for this row (legacy slot order). */
  mergeEndExclusive: number | null;
};

export function buildSlotRenderInstructions(args: {
  page: PageKey;
  contentBase: SiteContent;
  mergedFull: SiteContent;
  legacyOrder: string[];
  availableSlots: ReadonlySet<string>;
}): SlotRenderInstruction[] {
  const plan = buildPageBlockSlotPlan({
    page: args.page,
    content: args.contentBase,
    availableSlots: args.availableSlots,
  });

  if (plan.length) {
    return plan.map((p, i) => ({
      key: `${p.slot}-${i}`,
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

  return order.map((slot, i) => ({
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
