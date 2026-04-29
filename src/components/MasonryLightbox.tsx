import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Masonry grid that respects each image's true aspect ratio.
 *
 *  - Probes natural image dimensions and bin-packs into N columns by
 *    picking the column with the smallest current height for each next
 *    image. This produces a visually-balanced layout (no big gaps) while
 *    preserving aspect ratios — unlike CSS `columns` which can leave
 *    awkward whitespace.
 *  - Re-runs the packing on viewport resize so the grid adapts.
 *  - Clicking any tile opens an inline lightbox (Esc / arrows / overlay
 *    click closes / navigates). No external dependencies.
 *
 * Behaviour and visual chrome (caption, hover overlay, rounded corners)
 * mirror the previous CSS-columns implementation so we can drop this in
 * without a content-side migration.
 */

type Props = {
  images: string[];
  /** When true the optional `/ NN` overlay caption is rendered. */
  showIndex?: boolean;
  /** Tailwind gap utility — falls back to gap-4. */
  gapClass?: string;
};

function useColumnCount(): number {
  const compute = () => {
    if (typeof window === 'undefined') return 3;
    const w = window.innerWidth;
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  };
  const [n, setN] = useState<number>(compute);
  useEffect(() => {
    const onResize = () => setN(compute());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return n;
}

function useImageRatios(urls: string[]): Record<string, number> {
  const [ratios, setRatios] = useState<Record<string, number>>({});
  useEffect(() => {
    let cancelled = false;
    const next: Record<string, number> = {};
    const pending = urls.filter((u) => !ratios[u]);
    if (pending.length === 0) return;
    let remaining = pending.length;
    pending.forEach((u) => {
      const img = new Image();
      img.onload = () => {
        next[u] = img.naturalWidth > 0 ? img.naturalHeight / img.naturalWidth : 0.66;
        if (--remaining === 0 && !cancelled) {
          setRatios((prev) => ({ ...prev, ...next }));
        }
      };
      img.onerror = () => {
        next[u] = 0.66;
        if (--remaining === 0 && !cancelled) {
          setRatios((prev) => ({ ...prev, ...next }));
        }
      };
      img.src = u;
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join('|')]);
  return ratios;
}

export function MasonryLightbox({ images, showIndex = true, gapClass = 'gap-4' }: Props) {
  const cols = useColumnCount();
  const ratios = useImageRatios(images);
  const [open, setOpen] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Distribute images across columns by shortest current accumulated height.
  const columns = useMemo(() => {
    const buckets: { idx: number; src: string; ratio: number }[][] = Array.from({ length: cols }, () => []);
    const heights = new Array(cols).fill(0);
    images.forEach((src, idx) => {
      const ratio = ratios[src] || 0.66; // sensible default until real ratio loads
      let target = 0;
      for (let c = 1; c < cols; c += 1) {
        if (heights[c] < heights[target]) target = c;
      }
      buckets[target].push({ idx, src, ratio });
      heights[target] += ratio + 0.05; // +0.05 ≈ gap weight
    });
    return buckets;
  }, [images, ratios, cols]);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(() => setOpen((i) => (i === null ? null : (i + 1) % images.length)), [images.length]);
  const prev = useCallback(() => setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length]);

  // Defensive: always close lightbox when the route changes, so body overflow is restored.
  const loc = useLocation();
  useEffect(() => { setOpen(null); }, [loc.pathname]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      // Always reset to '' rather than restoring captured value—avoids sticky
      // 'hidden' if the captured value itself was 'hidden' from a stale render.
      document.body.style.overflow = prevOverflow || '';
    };
  }, [open, close, next, prev]);

  // Re-trigger reveal-stagger animation when ratios settle.
  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    root.querySelectorAll('.reveal-tile').forEach((el) => el.classList.add('is-in'));
  }, [columns]);

  return (
    <>
      <div ref={containerRef} className={`grid ${gapClass}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {columns.map((bucket, ci) => (
          <div key={ci} className={`flex flex-col ${gapClass}`}>
            {bucket.map(({ idx, src, ratio }) => (
              <button
                type="button"
                key={idx}
                onClick={() => setOpen(idx)}
                className="reveal-tile group relative block overflow-hidden rounded-2xl bg-[#f6f6f3] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color,#0f172a)]"
                style={{ aspectRatio: `1 / ${ratio || 0.66}` }}
                aria-label={`Bild ${idx + 1} öffnen`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {showIndex && (
                  <span className="pointer-events-none absolute bottom-3 left-3 right-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    / {String(idx + 1).padStart(2, '0')}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      {open !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Schließen"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /></svg>
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Vorheriges Bild"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Nächstes Bild"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </>
          )}
          <figure className="relative max-h-[90vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[open]}
              alt=""
              className="max-h-[90vh] max-w-[92vw] object-contain rounded-lg shadow-2xl"
            />
            <figcaption className="absolute -bottom-8 left-0 right-0 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/70">
              {String(open + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
