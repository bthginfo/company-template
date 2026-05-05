/**
 * Phase 2: build `pageBlocksV1` from legacy `SiteContent` + admin section order
 * (`getAdminSections`). Block `data` is a projection of `SECTION_CONTRACTS[type].dataKeys`.
 */

import { getAdminSections, type AdminSectionKey, type PageKey } from '../admin/admin-sections.js';
import { SECTION_CONTRACTS } from './section-registry.js';
import type { TemplateStyle } from './branch-config.js';
import {
  SiteContentSchema,
  type PageBlocksV1,
  type SiteContent,
  type TemplateKey,
} from './types.js';

const PAGE_KEYS: PageKey[] = ['home', 'services', 'gallery', 'about', 'contact'];

export function newPageBlockInstanceId(): string {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function getAtPath(root: unknown, path: string): unknown {
  const parts = path.split('.');
  let cur: unknown = root;
  for (const p of parts) {
    if (cur === null || cur === undefined || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

function setAtPath(root: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.');
  let cur: Record<string, unknown> = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const next = cur[p];
    if (next !== null && typeof next === 'object' && !Array.isArray(next)) {
      cur = next as Record<string, unknown>;
    } else {
      const child: Record<string, unknown> = {};
      cur[p] = child;
      cur = child;
    }
  }
  cur[parts[parts.length - 1]] = value;
}

/** Copy values for this block type from `SiteContent` into a plain `data` object. */
export function projectSiteContentToBlockData(
  content: SiteContent,
  type: AdminSectionKey,
): Record<string, unknown> {
  const contract = SECTION_CONTRACTS[type];
  if (!contract) return {};
  const out: Record<string, unknown> = {};
  for (const dataKey of contract.dataKeys) {
    const v = getAtPath(content, dataKey);
    if (v === undefined) continue;
    try {
      setAtPath(out, dataKey, structuredClone(v));
    } catch {
      setAtPath(out, dataKey, v);
    }
  }
  return out;
}

export function bootstrapPageBlocksV1FromContent(
  _content: SiteContent,
  tpl: TemplateKey,
  style: TemplateStyle,
): PageBlocksV1 {
  const out: PageBlocksV1 = {};
  for (const page of PAGE_KEYS) {
    const order = getAdminSections(page, tpl, style);
    out[page] = order.map((type) => ({
      id: newPageBlockInstanceId(),
      type,
      isVisible: true,
      data: {},
    }));
  }
  return out;
}

/** Re-parse with `pageBlocksV1` rebuilt from current legacy fields and (tpl × style) order. */
export function mergeSiteContentWithBootstrappedPageBlocks(
  content: SiteContent,
  tpl: TemplateKey,
  style: TemplateStyle,
): SiteContent {
  return SiteContentSchema.parse({
    ...content,
    pageBlocksV1: bootstrapPageBlocksV1FromContent(content, tpl, style),
  });
}

/** Replace only `pageBlocksV1[page]` from current `content` + admin order (new ids). */
export function rebootstrapPageBlocksForSinglePage(
  content: SiteContent,
  page: PageKey,
  tpl: TemplateKey,
  style: TemplateStyle,
): SiteContent {
  const order = getAdminSections(page, tpl, style);
  const nextList = order.map((type) => ({
    id: newPageBlockInstanceId(),
    type,
    isVisible: true,
    data: {},
  }));
  return SiteContentSchema.parse({
    ...content,
    pageBlocksV1: {
      ...(content.pageBlocksV1 ?? {}),
      [page]: nextList,
    },
  });
}

/**
 * Pre-save sync: for every block whose `data` is non-empty, re-project the
 * current `SiteContent` field values into it so stale overrides can't shadow
 * section-editor changes. Blocks with `data: {}` are left untouched (they
 * don't override anything). If a page lists **more than one block of the same
 * `type`**, sync is skipped for those blocks so per-instance JSON is not all
 * overwritten with one global projection.
 */
export function syncNonEmptyBlockDataFromContent(content: SiteContent): SiteContent {
  const pbv1 = content.pageBlocksV1;
  if (!pbv1) return content;
  let changed = false;
  const next: PageBlocksV1 = {};
  for (const page of PAGE_KEYS) {
    const list = pbv1[page];
    if (!list?.length) {
      next[page] = list;
      continue;
    }
    const typeCounts = new Map<string, number>();
    for (const b of list) {
      const t = String(b.type);
      typeCounts.set(t, (typeCounts.get(t) ?? 0) + 1);
    }
    next[page] = list.map((b) => {
      if (!b.data || typeof b.data !== 'object' || Object.keys(b.data).length === 0) return b;
      const t = String(b.type);
      if ((typeCounts.get(t) ?? 0) > 1) {
        return b;
      }
      const fresh = projectSiteContentToBlockData(content, b.type as AdminSectionKey);
      if (JSON.stringify(b.data) === JSON.stringify(fresh)) return b;
      changed = true;
      return { ...b, data: fresh };
    });
  }
  if (!changed) return content;
  const parsed = SiteContentSchema.safeParse({ ...content, pageBlocksV1: next });
  return parsed.success ? parsed.data : content;
}
