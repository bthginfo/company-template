/**
 * Open-hours helpers — parse the human-friendly `contact.hours` strings the
 * admin lets tenants type ("Mo–Fr", "09:00 – 18:00", "Sa: 10–14 Uhr",
 * "geschlossen"…) into machine-readable ranges, then compute whether the
 * business is open *now*.
 *
 * The parser is intentionally forgiving: when in doubt we return null and
 * the UI hides any open/closed indicator. Better to say nothing than say
 * something wrong.
 */

export type DayIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Mo=0 … So=6

const DAY_TOKENS: Record<string, DayIdx> = {
  mo: 0, montag: 0, monday: 0,
  di: 1, dienstag: 1, tuesday: 1,
  mi: 2, mittwoch: 2, wednesday: 2,
  do: 3, donnerstag: 3, thursday: 3,
  fr: 4, freitag: 4, friday: 4,
  sa: 5, samstag: 5, saturday: 5,
  so: 6, sonntag: 6, sunday: 6,
};

function dayIdx(token: string): DayIdx | null {
  const k = token.trim().toLowerCase().replace(/[.,:]/g, '');
  if (k in DAY_TOKENS) return DAY_TOKENS[k];
  // Allow short prefixes like "mo", "fr"
  const short = k.slice(0, 2);
  if (short in DAY_TOKENS) return DAY_TOKENS[short];
  return null;
}

/** Parse a day spec like "Mo–Fr" / "Sa, So" / "Mo, Mi, Fr" into a DayIdx[]. */
function parseDays(spec: string): DayIdx[] {
  // Range with dash (en/em/normal)
  const rangeMatch = spec.split(/\s*[–—-]\s*/);
  if (rangeMatch.length === 2) {
    const a = dayIdx(rangeMatch[0]);
    const b = dayIdx(rangeMatch[1]);
    if (a !== null && b !== null) {
      const out: DayIdx[] = [];
      for (let i = a; i !== b; i = ((i + 1) % 7) as DayIdx) out.push(i);
      out.push(b);
      return out;
    }
  }
  // Comma list
  const list: DayIdx[] = [];
  for (const part of spec.split(/[,/]/).map((s) => s.trim()).filter(Boolean)) {
    const d = dayIdx(part);
    if (d !== null) list.push(d);
  }
  return list;
}

/** Parse "09:00 – 18:00", "9–18 Uhr", "17:30-22:00" → [startMin, endMin]. */
function parseTimeRange(spec: string): [number, number] | null {
  const cleaned = spec.toLowerCase().replace(/uhr/g, '').trim();
  const parts = cleaned.split(/\s*[–—-]\s*/);
  if (parts.length !== 2) return null;
  const toMin = (s: string): number | null => {
    const m = s.trim().match(/^(\d{1,2})(?::(\d{2}))?$/);
    if (!m) return null;
    const h = parseInt(m[1], 10);
    const min = m[2] ? parseInt(m[2], 10) : 0;
    if (h > 24 || min > 59) return null;
    return h * 60 + min;
  };
  const a = toMin(parts[0]);
  const b = toMin(parts[1]);
  if (a === null || b === null) return null;
  return [a, b];
}

export type OpenInterval = { day: DayIdx; start: number; end: number };

export function parseHours(rows: { day: string; time: string }[]): OpenInterval[] {
  const out: OpenInterval[] = [];
  for (const row of rows) {
    if (!row?.day || !row?.time) continue;
    if (/geschlossen|closed|ruhetag/i.test(row.time)) continue;
    const days = parseDays(row.day);
    if (!days.length) continue;
    // A single time string can contain multiple ranges, e.g. "11–14, 17–22".
    for (const slot of row.time.split(/\s*(?:&|,|\bund\b)\s*/i)) {
      const r = parseTimeRange(slot);
      if (!r) continue;
      const [start, end] = r;
      for (const d of days) out.push({ day: d, start, end });
    }
  }
  return out;
}

/** JS Sunday=0 → our Monday=0 mapping. */
function jsDayToIdx(js: number): DayIdx {
  return ((js + 6) % 7) as DayIdx;
}

export type OpenStatus = {
  isOpen: boolean;
  /** Today's first interval (if any), as "HH:MM – HH:MM". */
  todayLabel: string | null;
  /** Today's full label including all slots, e.g. "11:30 – 14:00 · 17:30 – 22:00". */
  todayFull: string | null;
};

const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

export function getOpenStatus(rows: { day: string; time: string }[] | undefined, now: Date = new Date()): OpenStatus {
  if (!rows?.length) return { isOpen: false, todayLabel: null, todayFull: null };
  const intervals = parseHours(rows);
  if (!intervals.length) return { isOpen: false, todayLabel: null, todayFull: null };
  const today = jsDayToIdx(now.getDay());
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const todays = intervals.filter((i) => i.day === today).sort((a, b) => a.start - b.start);
  const isOpen = todays.some((i) => nowMin >= i.start && nowMin < i.end);
  const todayLabel = todays.length ? `${fmt(todays[0].start)} – ${fmt(todays[0].end)}` : null;
  const todayFull = todays.length ? todays.map((i) => `${fmt(i.start)} – ${fmt(i.end)}`).join(' · ') : null;
  return { isOpen, todayLabel, todayFull };
}
