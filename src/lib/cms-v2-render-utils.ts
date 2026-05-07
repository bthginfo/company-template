export type UnknownRecord = Record<string, unknown>;

export function asUnknownRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as UnknownRecord : {};
}

export function cmsV2Text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function cmsV2Boolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

export function cmsV2Image(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  const rec = asUnknownRecord(value);
  return cmsV2Text(rec.image) || cmsV2Text(rec.url) || cmsV2Text(rec.src);
}

export function cmsV2LinkHref(value: unknown): string {
  const rec = asUnknownRecord(value);
  const linkType = cmsV2Text(rec.linkType);
  if (linkType === 'external') return cmsV2Text(rec.externalUrl) || cmsV2Text(rec.href);
  if (linkType === 'internal') return cmsV2Text(rec.internalPage) || cmsV2Text(rec.href);
  return cmsV2Text(rec.internalPage) || cmsV2Text(rec.externalUrl) || cmsV2Text(rec.href);
}

export function cmsV2LinkLabel(value: unknown): string {
  return cmsV2Text(asUnknownRecord(value).label);
}

export function cmsV2TextItems(value: unknown): string[] {
  return Array.isArray(value)
    ? value
        .map((item) => (typeof item === 'string' ? item.trim() : cmsV2Text(asUnknownRecord(item).text)))
        .filter(Boolean)
    : [];
}

export function cmsV2LabelEntries(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      const rec = asUnknownRecord(item);
      return cmsV2Image(rec.image) || cmsV2Text(rec.text);
    })
    .filter(Boolean);
}

export function cmsV2ItemText(item: UnknownRecord, primary: string, fallback = 'title'): string {
  return cmsV2Text(item[primary]) || cmsV2Text(item[fallback]) || cmsV2Text(item.name);
}

export function cmsV2TextPairs(value: unknown): { t: string; d: string }[] {
  return Array.isArray(value)
    ? value
        .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
        .map((item) => ({ t: cmsV2ItemText(item, 'title', 't') || cmsV2Text(item.value), d: cmsV2Text(item.description) || cmsV2Text(item.d) || cmsV2Text(item.label) }))
        .filter((item) => item.t || item.d)
    : [];
}

export function cmsV2FaqItems(value: unknown): { q: string; a: string }[] {
  return Array.isArray(value)
    ? value
        .filter((item): item is UnknownRecord => !!item && typeof item === 'object' && !Array.isArray(item))
        .map((item) => ({ q: cmsV2Text(item.q) || cmsV2Text(item.question), a: cmsV2Text(item.a) || cmsV2Text(item.answer) }))
        .filter((item) => item.q || item.a)
    : [];
}
