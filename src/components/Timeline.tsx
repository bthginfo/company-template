import type { SiteContent } from '@/lib/types';

type TimelineItem = { year: string; title: string; description: string };

const DEFAULT_TIMELINE: TimelineItem[] = [
  { year: '2008', title: 'Gegründet.',          description: 'Wir öffnen unsere Türen — mit klarer Idee und einem kleinen Team.' },
  { year: '2014', title: 'Wachstum.',           description: 'Erste Erweiterung, neue Räume, mehr Hände — Qualität bleibt.' },
  { year: '2019', title: 'Umzug & Neugestaltung.', description: 'Frische Räume, neue Werkzeuge, gleiche Handschrift.' },
  { year: 'Heute', title: 'Hier und jetzt.',     description: 'Persönlich, verlässlich, mit Liebe zum Detail — wie am ersten Tag.' },
];

export function useTimeline(content: SiteContent): TimelineItem[] {
  const overlay = (content as any).timeline as TimelineItem[] | undefined;
  const filtered = Array.isArray(overlay)
    ? overlay.filter((t) => t && (String(t.year ?? '').trim() || String(t.title ?? '').trim() || String(t.description ?? '').trim()))
    : [];
  if (filtered.length > 0) return filtered;
  return DEFAULT_TIMELINE;
}

/** Vertical alternating timeline. Renders nothing if there are no entries. */
export function Timeline({ content, eyebrow = 'Geschichte', title = 'Unser Weg.' }: {
  content: SiteContent;
  eyebrow?: string;
  title?: React.ReactNode;
}) {
  const items = useTimeline(content);
  if (items.length === 0) return null;
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-12 reveal">
          <p className="md:col-span-2 font-mono text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
          <h2 className="md:col-span-10 font-display text-4xl md:text-6xl leading-tight">{title}</h2>
        </div>
        <ol className="relative border-l border-line ml-2 md:ml-6 space-y-10 reveal-stagger">
          {items.map((it, i) => (
            <li key={i} className="pl-6 md:pl-10">
              <span className="absolute -left-[7px] mt-1.5 w-3.5 h-3.5 rounded-full bg-brand ring-4 ring-[var(--bg-color,#fff)]" aria-hidden />
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-color)]">{it.year || '—'}</p>
              <h3 className="font-display text-2xl md:text-3xl mt-1">{it.title}</h3>
              {it.description && (
                <p className="mt-2 text-muted leading-relaxed max-w-2xl">{it.description}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
