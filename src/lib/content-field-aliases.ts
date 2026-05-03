/**
 * Maps common AI / Perplexity export shapes onto the field names the templates
 * and admin expect (`q`/`a`, `src`/`q`/`y`, `t`/`d`).
 */

export type FaqPair = { q: string; a: string };
export type PressCard = { src: string; q: string; y: string; url?: string };
export type ArrivalCard = { t: string; d: string };

export function normaliseFaqItem(raw: unknown): FaqPair {
  if (!raw || typeof raw !== 'object') return { q: '', a: '' };
  const o = raw as Record<string, unknown>;
  const qRaw = o.q ?? o.question;
  const aRaw = o.a ?? o.answer;
  const q = typeof qRaw === 'string' ? qRaw.trim() : '';
  const a = typeof aRaw === 'string' ? aRaw.trim() : '';
  return { q, a };
}

export function normaliseFaqList(raw: unknown): FaqPair[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normaliseFaqItem).filter((f) => f.q || f.a);
}

export function normalisePressItem(raw: unknown): PressCard {
  if (!raw || typeof raw !== 'object') return { src: '', q: '', y: '' };
  const o = raw as Record<string, unknown>;
  const src = typeof o.src === 'string' ? o.src.trim() : typeof o.source === 'string' ? o.source.trim() : '';
  const q = typeof o.q === 'string' ? o.q.trim() : typeof o.title === 'string' ? o.title.trim() : '';
  const y = typeof o.y === 'string' ? o.y.trim() : typeof o.year === 'string' ? o.year.trim() : '';
  const url = typeof o.url === 'string' ? o.url.trim() : '';
  return url ? { src, q, y, url } : { src, q, y };
}

export function normalisePressList(raw: unknown): PressCard[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normalisePressItem).filter((p) => p.src || p.q || p.y || p.url);
}

export function normaliseArrivalItem(raw: unknown): ArrivalCard {
  if (!raw || typeof raw !== 'object') return { t: '', d: '' };
  const o = raw as Record<string, unknown>;
  const t = typeof o.t === 'string' ? o.t.trim() : typeof o.title === 'string' ? o.title.trim() : '';
  const d = typeof o.d === 'string' ? o.d.trim() : typeof o.description === 'string' ? o.description.trim() : '';
  return { t, d };
}

export function normaliseArrivalList(raw: unknown): ArrivalCard[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normaliseArrivalItem).filter((a) => a.t || a.d);
}

/**
 * Mutates merged site content before Zod parse: rewrite AI aliases to canonical keys.
 * Run after `coerceArrayFields` so array shapes are stable; preserves `id` on FAQ rows when present.
 */
export function applyContentFieldAliases(obj: Record<string, unknown>): void {
  if (Array.isArray(obj.faq)) {
    obj.faq = (obj.faq as unknown[]).flatMap((raw) => {
      const pair = normaliseFaqItem(raw);
      if (!pair.q && !pair.a) return [];
      if (raw && typeof raw === 'object' && 'id' in raw && typeof (raw as { id: unknown }).id === 'string') {
        return [{ id: (raw as { id: string }).id, ...pair }];
      }
      return [pair];
    });
  }
  if (Array.isArray(obj.press)) {
    obj.press = normalisePressList(obj.press);
  }
  if (Array.isArray(obj.arrival)) {
    obj.arrival = normaliseArrivalList(obj.arrival);
  }
}
