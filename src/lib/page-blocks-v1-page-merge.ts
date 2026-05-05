/**
 * Phase 3 (MVP): merge visible `pageBlocksV1[page][].data` onto `SiteContent` for rendering.
 * Phase 5+6: slot order can follow `pageBlocksV1`; when it does, each slot occurrence may use
 * a prefix merge (see `mergePageBlocksIntoSiteContentForPagePrefix`) so repeated slots differ.
 */

import type { AdminSectionKey, PageKey } from '../admin/admin-sections.js';
import { adminSectionToCatalogSlot } from './page-blocks-v1-slot-order.js';
import { SiteContentSchema, type PageBlockInstanceV1, type SiteContent } from './types.js';

function isPlainRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

/** Deep-merge JSON-like trees; arrays and scalars from `source` replace. */
export function deepMergeJson<T>(target: T, source: unknown): T {
  if (source === undefined || source === null) return target;
  if (!isPlainRecord(source)) return target;
  if (!isPlainRecord(target)) return target;
  const out = { ...target } as Record<string, unknown>;
  for (const [k, v] of Object.entries(source)) {
    if (v === undefined) continue;
    const cur = out[k];
    if (Array.isArray(v)) {
      out[k] = v;
    } else if (isPlainRecord(v) && isPlainRecord(cur)) {
      out[k] = deepMergeJson(cur, v);
    } else {
      out[k] = v;
    }
  }
  return out as T;
}

function homeBlockBypassesSlotCatalog(t: AdminSectionKey): boolean {
  return t === 'hero' || t === 'announcements' || t === 'softCta';
}

function blockContributesToMerge(page: PageKey, b: PageBlockInstanceV1): boolean {
  if (b.isVisible === false) return false;
  const t = b.type as AdminSectionKey;
  if (!isPlainRecord(b.data) || Object.keys(b.data).length === 0) return false;
  if (page === 'home' && homeBlockBypassesSlotCatalog(t)) return true;
  return adminSectionToCatalogSlot(page, t) !== null;
}

/** Only blocks that map to a renderer slot merge `data`, plus home hero / announcements / softCta (no catalog slot). */
function blockListHasDataPatches(
  page: PageKey,
  list: readonly PageBlockInstanceV1[] | undefined,
): boolean {
  if (!list?.length) return false;
  for (const b of list) {
    if (blockContributesToMerge(page, b)) return true;
  }
  return false;
}

/**
 * When `pageBlocksV1[page]` carries `data` patches, deep-merge them (in array order)
 * onto a clone of `content` and re-parse with `SiteContentSchema`. If parsing fails,
 * returns the original `content`.
 */
export function mergePageBlocksIntoSiteContentForPage(
  content: SiteContent,
  page: PageKey,
): SiteContent {
  const list = content.pageBlocksV1?.[page];
  if (!list?.length || !blockListHasDataPatches(page, list)) return content;

  let acc: SiteContent = structuredClone(content) as SiteContent;
  for (const b of list) {
    if (!blockContributesToMerge(page, b)) continue;
    acc = deepMergeJson(acc, b.data) as SiteContent;
  }

  const parsed = SiteContentSchema.safeParse(acc);
  return parsed.success ? parsed.data : content;
}

/**
 * Phase 6: merge only `pageBlocksV1[page][0 .. endExclusive)` (array indices) onto a
 * clone of `content`, skipping invisible blocks and empty `data` like the full merge.
 * `endExclusive <= 0` is a no-op (returns `content`).
 */
export function mergePageBlocksIntoSiteContentForPagePrefix(
  content: SiteContent,
  page: PageKey,
  endExclusive: number,
): SiteContent {
  const list = content.pageBlocksV1?.[page];
  if (!list?.length || endExclusive <= 0) return content;

  const slice = list.slice(0, Math.min(endExclusive, list.length));
  if (!blockListHasDataPatches(page, slice)) return content;

  let acc: SiteContent = structuredClone(content) as SiteContent;
  for (const b of slice) {
    if (!blockContributesToMerge(page, b)) continue;
    acc = deepMergeJson(acc, b.data) as SiteContent;
  }

  const parsed = SiteContentSchema.safeParse(acc);
  return parsed.success ? parsed.data : content;
}
