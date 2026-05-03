/**
 * Maps common AI / Perplexity export shapes onto the field names the templates
 * and admin expect (`q`/`a`, `src`/`q`/`y`, `t`/`d`, `n`/`r`/`img`, etc.).
 */

export type FaqPair = { q: string; a: string };
export type PressCard = { src: string; q: string; y: string; url?: string };
export type ArrivalCard = { t: string; d: string };
export type TdPair = { t: string; d: string };
/** Core TemplateApp team cards use short keys `n`/`r`/`img`; imports often send name/role/imageUrl. */
export type TeamCard = { n: string; r: string; img: string; bio: string };

/** Highlight/process/value/cert captions: template expects `t`/`d`, AI template uses `title`/`description`. */
export function normaliseTdItem(raw: unknown): TdPair {
  if (!raw || typeof raw !== 'object') return { t: '', d: '' };
  const o = raw as Record<string, unknown>;
  const t = typeof o.t === 'string' ? o.t.trim() : typeof o.title === 'string' ? o.title.trim() : '';
  const d = typeof o.d === 'string' ? o.d.trim() : typeof o.description === 'string' ? o.description.trim() : '';
  return { t, d };
}

export function normaliseTdList(raw: unknown): TdPair[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normaliseTdItem).filter((row) => row.t || row.d);
}

export function normaliseTeamItem(raw: unknown): TeamCard {
  if (!raw || typeof raw !== 'object') return { n: '', r: '', img: '', bio: '' };
  const o = raw as Record<string, unknown>;
  const n = typeof o.n === 'string' ? o.n.trim() : typeof o.name === 'string' ? o.name.trim() : '';
  const r = typeof o.r === 'string' ? o.r.trim() : typeof o.role === 'string' ? o.role.trim() : '';
  const img =
    typeof o.img === 'string'
      ? o.img.trim()
      : typeof o.imageUrl === 'string'
        ? o.imageUrl.trim()
        : '';
  const bio = typeof o.bio === 'string' ? o.bio.trim() : '';
  return { n, r, img, bio };
}

export function normaliseTeamList(raw: unknown): TeamCard[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normaliseTeamItem).filter((m) => m.n || m.r || m.bio);
}

/** Fitness / extra template — programs grid expects `k`/`t`/`d`/`meta`; AI often sends title/description + subtitle. */
export type ProgramCard = { k: string; t: string; d: string; meta: string };

export function normaliseProgramItem(raw: unknown, index: number): ProgramCard {
  const fallbackK = String(index + 1).padStart(2, '0');
  if (!raw || typeof raw !== 'object') {
    return { k: fallbackK, t: '', d: '', meta: '' };
  }
  const o = raw as Record<string, unknown>;
  const kCand =
    (typeof o.k === 'string' && o.k.trim()) ||
    (typeof o.key === 'string' && o.key.trim()) ||
    (typeof o.code === 'string' && o.code.trim()) ||
    (typeof o.slug === 'string' && o.slug.trim()) ||
    '';
  const k = kCand || fallbackK;
  const { t, d } = normaliseTdItem(raw);
  const metaRaw = o.meta ?? o.subtitle ?? o.schedule ?? o.duration ?? o.detail ?? '';
  const meta = typeof metaRaw === 'string' ? metaRaw.trim() : '';
  return { k, t, d, meta };
}

export function normaliseProgramList(raw: unknown): ProgramCard[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item, i) => normaliseProgramItem(item, i))
    .filter((p) => p.t || p.d || p.meta);
}

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

/** Prefer `serviceHighlights`; if empty, use AI export key `highlights`. Normalize title/description → t/d. */
export function mergedServiceHighlights(serviceHighlights: unknown, highlights: unknown): TdPair[] {
  const sh = normaliseTdList(serviceHighlights ?? []);
  return sh.length ? sh : normaliseTdList(highlights ?? []);
}

/**
 * Mutates merged site content before Zod parse: rewrite AI aliases to canonical keys.
 * Run after `coerceArrayFields` so array shapes are stable; preserves `id` on FAQ rows when present.
 */
export function applyContentFieldAliases(obj: Record<string, unknown>): void {
  obj.serviceHighlights = mergedServiceHighlights(obj.serviceHighlights, obj.highlights);
  if ('highlights' in obj) delete obj.highlights;

  if (Array.isArray(obj.serviceProcess)) {
    obj.serviceProcess = normaliseTdList(obj.serviceProcess);
  }
  if (Array.isArray(obj.values)) {
    obj.values = normaliseTdList(obj.values);
  }
  if (Array.isArray(obj.certifications)) {
    obj.certifications = normaliseTdList(obj.certifications);
  }
  if (Array.isArray(obj.galleryCategories)) {
    obj.galleryCategories = normaliseTdList(obj.galleryCategories);
  }

  const story = obj.galleryStory;
  if (story && typeof story === 'object' && !Array.isArray(story)) {
    const caps = (story as Record<string, unknown>).captions;
    if (Array.isArray(caps)) {
      (story as Record<string, unknown>).captions = caps.map(normaliseTdItem).filter((row) => row.t || row.d);
    }
  }

  if (Array.isArray(obj.team)) {
    obj.team = (obj.team as unknown[]).flatMap((raw) => {
      const card = normaliseTeamItem(raw);
      if (!card.n && !card.r && !card.bio) return [];
      if (raw && typeof raw === 'object' && 'id' in raw && typeof (raw as { id: unknown }).id === 'string') {
        return [{ id: (raw as { id: string }).id, ...card }];
      }
      return [card];
    });
  }

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
  if (Array.isArray(obj.programs)) {
    obj.programs = (obj.programs as unknown[]).flatMap((raw, i) => {
      const card = normaliseProgramItem(raw, i);
      if (!card.t && !card.d && !card.meta) return [];
      if (raw && typeof raw === 'object' && 'id' in raw && typeof (raw as { id: unknown }).id === 'string') {
        return [{ id: (raw as { id: string }).id, ...card }];
      }
      return [card];
    });
  }
}
