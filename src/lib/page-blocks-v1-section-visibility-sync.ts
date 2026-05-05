/**
 * Keeps `pageBlocksV1[page][].isVisible` aligned with `sectionVisibility`
 * for the same catalog slot (layout toggles vs block toggles).
 */

import type { AdminSectionKey, PageKey } from '../admin/admin-sections.js';
import { adminSectionToCatalogSlot } from './page-blocks-v1-slot-order.js';
import { SiteContentSchema, type SiteContent, type TemplateKey } from './types.js';
import { modularHomeSlotsForSectionType } from './modular-home-admin-visibility.js';

/** Catalog / layout key used with `isSectionEnabled(content, page, key)` — same as renderer slot for mapped blocks. */
export function catalogSlotKeyForAdminBlock(page: PageKey, adminType: AdminSectionKey): string | null {
  return adminSectionToCatalogSlot(page, adminType);
}

function readVisibility(data: SiteContent): Record<string, boolean> {
  return { ...(((data as { sectionVisibility?: Record<string, boolean> }).sectionVisibility) ?? {}) };
}

/**
 * Toggle one block's `isVisible` and mirror to `sectionVisibility` for its slot.
 */
export function applyPageBlockVisibilityToggle(
  data: SiteContent,
  page: PageKey,
  blockIndex: number,
): SiteContent {
  const list = [...(data.pageBlocksV1?.[page] ?? [])];
  const row = list[blockIndex];
  if (!row) return data;
  const nextVisible = row.isVisible === false;
  list[blockIndex] = { ...row, isVisible: nextVisible };

  const cat = catalogSlotKeyForAdminBlock(page, row.type as AdminSectionKey);
  const vis = readVisibility(data);
  if (cat) {
    vis[`${page}.${cat}`] = nextVisible;
    if (page === 'home') vis[cat] = nextVisible;
  }

  const next: SiteContent = {
    ...data,
    sectionVisibility: vis,
    pageBlocksV1: { ...(data.pageBlocksV1 ?? {}), [page]: list },
  };
  const p = SiteContentSchema.safeParse(next);
  return p.success ? p.data : data;
}

/**
 * After a layout section visibility toggle, mirror to all matching `pageBlocksV1` rows on that page.
 */
export function applySectionVisibilityToPageBlocks(
  data: SiteContent,
  page: PageKey,
  catalogSectionKey: string,
  nextVisible: boolean,
): SiteContent {
  const list = data.pageBlocksV1?.[page];
  if (!list?.length) return data;
  let changed = false;
  const nextList = list.map((b) => {
    const cat = catalogSlotKeyForAdminBlock(page, b.type as AdminSectionKey);
    if (cat === catalogSectionKey) {
      const wasOn = b.isVisible !== false;
      if (wasOn === nextVisible) return b;
      changed = true;
      return { ...b, isVisible: nextVisible };
    }
    return b;
  });
  if (!changed) return data;
  const next: SiteContent = {
    ...data,
    pageBlocksV1: { ...(data.pageBlocksV1 ?? {}), [page]: nextList },
  };
  const p = SiteContentSchema.safeParse(next);
  return p.success ? p.data : data;
}

/**
 * When a modular home section is shown/hidden, mirror that to `sectionVisibility`
 * so `isSectionEnabled` / the live layout match the checkbox (same keys as the Layout-Manager).
 */
export function applyModularHomeVisibilityMirror(
  content: SiteContent,
  templateKey: TemplateKey,
  sectionType: string,
  nextVisible: boolean,
): SiteContent {
  const slots = modularHomeSlotsForSectionType(templateKey, sectionType);
  if (!slots?.length) return content;
  const vis = readVisibility(content);
  for (const slot of slots) {
    vis[`home.${slot}`] = nextVisible;
    vis[slot] = nextVisible;
  }
  const next: SiteContent = { ...content, sectionVisibility: vis };
  const p = SiteContentSchema.safeParse(next);
  return p.success ? p.data : content;
}
