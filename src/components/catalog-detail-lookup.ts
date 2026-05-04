import type { SiteContent, TemplateKey } from '@/lib/types';

type DetailFields = {
  detailSlug?: string;
  detailPublished?: boolean;
  detailSubtitle?: string;
  detailBody?: string;
  detailBodyHtml?: string;
  detailGallery?: string[];
};

export type CatalogDetailResolved = {
  title: string;
  subtitle: string;
  imageUrl: string;
  detailBody: string;
  detailBodyHtml: string;
  detailGallery: string[];
};

function normSlug(s: string): string {
  return s.trim().toLowerCase();
}

function activeDetailSlug(it: DetailFields): string | null {
  const s = (it.detailSlug || '').trim();
  if (!s || it.detailPublished === false) return null;
  return s;
}

function tryMatch(
  want: string,
  title: string,
  imageUrl: string,
  it: DetailFields,
): CatalogDetailResolved | null {
  const ds = activeDetailSlug(it);
  if (!ds || normSlug(ds) !== want) return null;
  const g = Array.isArray(it.detailGallery) ? it.detailGallery.filter((u) => u && String(u).trim()) : [];
  return {
    title,
    subtitle: (it.detailSubtitle || '').trim(),
    imageUrl: (imageUrl || '').trim() || (g[0] ?? ''),
    detailBody: it.detailBody || '',
    detailBodyHtml: it.detailBodyHtml || '',
    detailGallery: g,
  };
}

/**
 * Resolve a catalog detail page by URL slug for the active template.
 * Search order matches likely collisions (branch-specific lists before generic `services`).
 */
export function findCatalogDetailBySlug(
  template: TemplateKey,
  content: SiteContent,
  rawSlug: string,
): CatalogDetailResolved | null {
  const want = normSlug(rawSlug);
  if (!want) return null;

  switch (template) {
    case 'restaurant': {
      for (const cat of content.menu ?? []) {
        for (const it of cat.items ?? []) {
          const m = tryMatch(want, it.name, it.imageUrl || '', it);
          if (m) return m;
        }
      }
      for (const s of content.services) {
        const m = tryMatch(want, s.title, s.imageUrl || '', s);
        if (m) return m;
      }
      return null;
    }
    case 'salon': {
      for (const t of content.treatments ?? []) {
        const m = tryMatch(want, t.name, t.imageUrl || '', t);
        if (m) return m;
      }
      for (const s of content.services) {
        const m = tryMatch(want, s.title, s.imageUrl || '', s);
        if (m) return m;
      }
      return null;
    }
    case 'tradesman': {
      for (const s of content.services) {
        const m = tryMatch(want, s.title, s.imageUrl || '', s);
        if (m) return m;
      }
      for (const fi of content.fundingItems ?? []) {
        const m = tryMatch(want, fi.title, fi.imageUrl || '', fi);
        if (m) return m;
      }
      return null;
    }
    case 'hotel': {
      for (const r of content.rooms ?? []) {
        const m = tryMatch(want, r.name, r.imageUrl || '', r);
        if (m) return m;
      }
      for (const s of content.services) {
        const m = tryMatch(want, s.title, s.imageUrl || '', s);
        if (m) return m;
      }
      return null;
    }
    case 'tourism': {
      for (const t of content.tours ?? []) {
        const m = tryMatch(want, t.name, t.imageUrl || '', t);
        if (m) return m;
      }
      for (const s of content.services) {
        const m = tryMatch(want, s.title, s.imageUrl || '', s);
        if (m) return m;
      }
      return null;
    }
    case 'consulting': {
      for (const s of content.services) {
        const m = tryMatch(want, s.title, s.imageUrl || '', s);
        if (m) return m;
      }
      for (const p of content.packages ?? []) {
        const m = tryMatch(want, p.name, p.imageUrl || '', p);
        if (m) return m;
      }
      for (const st of content.processSteps ?? []) {
        const m = tryMatch(want, st.title, st.imageUrl || '', st);
        if (m) return m;
      }
      return null;
    }
    case 'medical': {
      for (const s of content.services) {
        const m = tryMatch(want, s.title, s.imageUrl || '', s);
        if (m) return m;
      }
      for (const d of content.doctors ?? []) {
        const m = tryMatch(want, d.name, d.imageUrl || '', d);
        if (m) return m;
      }
      return null;
    }
    case 'fitness': {
      for (const s of content.services) {
        const m = tryMatch(want, s.title, s.imageUrl || '', s);
        if (m) return m;
      }
      for (const c of content.courses ?? []) {
        const m = tryMatch(want, c.name, c.imageUrl || '', c);
        if (m) return m;
      }
      for (const p of content.packages ?? []) {
        const m = tryMatch(want, p.name, p.imageUrl || '', p);
        if (m) return m;
      }
      return null;
    }
    default:
      return null;
  }
}
