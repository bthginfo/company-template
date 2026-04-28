/**
 * BranchSignature — per-branch + per-style signature block.
 *
 * 5 branches × 3 styles = 15 visually distinct layouts so each
 * (variant, style) pair feels categorically different. Each block
 * presents existing SiteContent (services, gallery, contact, …) but
 * with branch-specific framing (menu / treatments / job / room / tour)
 * and a style-specific visual language (editorial / clean / poster).
 */
import type { SiteContent } from '@/lib/types';
import type { TemplateVariant, TemplateStyle } from './TemplateApp';
import { TLink } from '@/components/site-blocks';
import { HardShadowCard } from '@/components/motion-fx';

/* ─────────── shared helpers ─────────── */
const Eyebrow = ({ style, children }: { style: TemplateStyle; children: React.ReactNode }) => (
  <p className={
    'eyebrow mb-4 ' + (
      style === 'classic' ? '!italic !lowercase !tracking-wider font-display !text-base' :
        style === 'bold' ? '!text-base !tracking-[0.3em] !text-[var(--accent-color)]' :
          ''
    )
  }>{children}</p>
);

const Title = ({ style, children }: { style: TemplateStyle; children: React.ReactNode }) => (
  <h2 className={
    style === 'bold' ? 'font-display text-6xl md:text-8xl leading-[0.92] uppercase tracking-tighter' :
      style === 'classic' ? 'font-display text-4xl md:text-5xl leading-tight' :
        'font-display text-4xl md:text-5xl leading-[1.05] tracking-tight'
  }>{children}</h2>
);

const sectionBg = (style: TemplateStyle, branchTone: 'light' | 'dark' | 'accent' = 'light') => {
  if (style === 'bold' && branchTone === 'dark') return 'bg-brand text-white';
  if (style === 'bold' && branchTone === 'accent') return 'bg-[var(--accent-color)] text-[var(--accent-fg)]';
  if (style === 'modern') return 'surface';
  return '';
};

/* ═══════════════════════════════════════════════════════════════════
 * RESTAURANT — "Heute auf der Karte" / Menu spotlight
 * ═══════════════════════════════════════════════════════════════════ */
function RestaurantSignature({ style, content }: { style: TemplateStyle; content: SiteContent }) {
  const dishes = content.services.slice(0, 3);
  const photos = content.gallery.slice(0, 3);
  if (!dishes.length) return null;

  if (style === 'bold') {
    return (
      <section className="py-24 md:py-36 bg-brand text-white relative overflow-hidden">
        <div className="container-x">
          <Eyebrow style={style}>Heute · Tonight</Eyebrow>
          <Title style={style}>Auf<br />dem Tisch.</Title>
          <ol className="mt-16 space-y-8">
            {dishes.map((d, i) => (
              <li key={i} className="grid md:grid-cols-12 gap-6 items-baseline border-b border-white/15 pb-6">
                <span className="md:col-span-1 font-mono text-sm text-white/50">/{String(i + 1).padStart(2, '0')}</span>
                <h3 className="md:col-span-7 font-display text-4xl md:text-6xl leading-[0.95] uppercase tracking-tight">{d.title}</h3>
                <p className="md:col-span-3 text-white/70 text-base">{d.description}</p>
                {d.price && <span className="md:col-span-1 md:text-right font-mono text-xl text-[var(--accent-color)]">{d.price}</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32 surface">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Eyebrow style={style}>Heute auf der Karte</Eyebrow>
              <Title style={style}>Empfehlungen <em className="italic-pop">vom Haus.</em></Title>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted">Saisonal · {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}</span>
          </div>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {dishes.map((d, i) => (
              <article key={i} className="bg-white border border-line rounded-2xl overflow-hidden hover-lift">
                {photos[i] && <div className="aspect-[4/3] overflow-hidden"><img src={photos[i]} alt="" className="w-full h-full object-cover" /></div>}
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl">{d.title}</h3>
                    {d.price && <span className="font-mono text-xs bg-[var(--accent-color)]/15 text-brand px-2 py-1 rounded-full whitespace-nowrap">{d.price}</span>}
                  </div>
                  {d.description && <p className="mt-3 text-sm text-muted leading-relaxed">{d.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // classic — handwritten menu card with serif rules
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Eyebrow style={style}>Empfehlung des Hauses</Eyebrow>
          <Title style={style}>Heute<br/><em className="italic-pop">auf der Karte.</em></Title>
          <p className="mt-6 text-muted leading-relaxed">Die Köchin schreibt jeden Morgen frisch — was die Lieferanten bringen, kommt auf den Tisch.</p>
        </div>
        <div className="md:col-span-8 border-t-2 border-b-2 border-brand py-8 reveal">
          <ul className="divide-y divide-line">
            {dishes.map((d, i) => (
              <li key={i} className="py-5 grid grid-cols-[auto_1fr_auto] items-baseline gap-5">
                <span className="font-display italic text-3xl text-[var(--accent-color)]">{['I','II','III'][i]}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{d.title}</h3>
                  {d.description && <p className="mt-1 text-sm text-muted italic">{d.description}</p>}
                </div>
                {d.price && <span className="font-mono text-base">{d.price}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * SALON — "Looks der Woche"
 * ═══════════════════════════════════════════════════════════════════ */
function SalonSignature({ style, content }: { style: TemplateStyle; content: SiteContent }) {
  const looks = content.gallery.slice(0, 4);
  if (!looks.length) return null;

  if (style === 'bold') {
    return (
      <section className="py-24 md:py-32 bg-[var(--accent-color)] text-[var(--accent-fg)]">
        <div className="container-x">
          <Eyebrow style={style}>Inspiration</Eyebrow>
          <Title style={style}>Looks<br/>der Woche.</Title>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-2">
            {looks.map((src, i) => (
              <figure key={i} className="aspect-[3/4] overflow-hidden border-4 border-brand">
                <img src={src} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700" />
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32 surface">
        <div className="container-x">
          <Eyebrow style={style}>Inspiration</Eyebrow>
          <Title style={style}>Looks <em className="italic-pop">der Woche.</em></Title>
          <div className="mt-12 grid md:grid-cols-4 gap-4 reveal-stagger">
            {looks.map((src, i) => (
              <figure key={i} className="bg-white rounded-2xl overflow-hidden border border-line p-3 shadow-sm hover-lift">
                <div className="aspect-[3/4] overflow-hidden rounded-xl">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
                <figcaption className="mt-3 text-center text-xs font-mono uppercase tracking-widest text-muted">N° {String(i + 1).padStart(2, '0')}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // classic — polaroid-style look book
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-8 mb-10 items-end">
          <div className="md:col-span-6">
            <Eyebrow style={style}>Inspiration</Eyebrow>
            <Title style={style}>Looks <em className="italic-pop">der Woche.</em></Title>
          </div>
          <p className="md:col-span-6 text-muted">Eine Auswahl unserer letzten Arbeiten — frisch aus dem Studio.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {looks.map((src, i) => (
            <figure key={i} className="bg-white shadow-md p-3 pb-12 transition-transform hover:-rotate-1" style={{ transform: 'rotate(' + (i % 2 === 0 ? -1 : 1) + 'deg)' }}>
              <div className="aspect-square overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-center font-display italic text-sm">— Look N° {i + 1}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * TRADESMAN — Emergency / Recent Project
 * ═══════════════════════════════════════════════════════════════════ */
function TradesmanSignature({ style, content }: { style: TemplateStyle; content: SiteContent }) {
  const phone = content.contact?.phone || '';
  const recent = content.gallery.slice(0, 1)[0];
  const services = content.services.slice(0, 4);

  if (style === 'bold') {
    return (
      <section className="py-24 md:py-32 bg-[var(--accent-color)] text-[var(--accent-fg)] relative">
        <div className="container-x grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Eyebrow style={style}>24/7 Notdienst</Eyebrow>
            <h2 className="font-display text-7xl md:text-[10rem] leading-[0.85] uppercase tracking-tighter">
              Akut?<br/>Anrufen.
            </h2>
            {phone && <a href={'tel:' + phone.replace(/\s/g, '')} className="mt-8 inline-block font-mono text-2xl md:text-4xl underline underline-offset-4">{phone}</a>}
          </div>
          <ul className="md:col-span-5 space-y-2 text-base">
            {services.map((s, i) => (
              <li key={i} className="flex justify-between border-b border-brand/30 py-3">
                <span className="font-display text-xl uppercase">{s.title}</span>
                {s.price && <span className="font-mono">{s.price}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32 surface">
        <div className="container-x grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <Eyebrow style={style}>Notdienst &amp; Erreichbarkeit</Eyebrow>
            <Title style={style}>Wenn&apos;s <em className="italic-pop">drauf ankommt.</em></Title>
            <div className="mt-8 bg-white border border-line rounded-2xl p-6">
              <p className="text-xs font-mono uppercase tracking-widest text-muted">Direktwahl</p>
              {phone && <a href={'tel:' + phone.replace(/\s/g, '')} className="block mt-2 font-display text-3xl text-brand">{phone}</a>}
              <p className="mt-4 text-sm text-muted">Schnell vor Ort, keine Bandansage, kein Dispatch — Sie sprechen direkt mit uns.</p>
            </div>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-3">
            {services.map((s, i) => (
              <div key={i} className="bg-white border border-line rounded-xl p-5">
                <span className="text-xs font-mono text-muted">/{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl mt-2">{s.title}</h3>
                {s.price && <p className="mt-2 text-xs font-mono text-brand">{s.price}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // classic — service-area card with rules
  return (
    <section className="py-24 md:py-32 bg-brand text-white">
      <div className="container-x grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          {recent && <div className="aspect-[4/5] overflow-hidden border-2 border-white/15"><img src={recent} alt="" className="w-full h-full object-cover" /></div>}
        </div>
        <div className="md:col-span-7 md:pl-6">
          <Eyebrow style={style}>Aktuelle Baustelle</Eyebrow>
          <Title style={style}><span className="!text-white">Saubere Arbeit,<br/><em className="italic-pop !text-[var(--accent-color)]">faire Preise.</em></span></Title>
          <ul className="mt-10 divide-y divide-white/15">
            {services.map((s, i) => (
              <li key={i} className="py-4 grid grid-cols-[3rem_1fr_auto] gap-4 items-baseline">
                <span className="font-display italic text-2xl text-[var(--accent-color)]">{['I','II','III','IV'][i]}</span>
                <div><h3 className="font-display text-xl">{s.title}</h3>{s.description && <p className="text-sm text-white/60 mt-1">{s.description}</p>}</div>
                {s.price && <span className="font-mono text-sm">{s.price}</span>}
              </li>
            ))}
          </ul>
          {phone && <p className="mt-8"><a href={'tel:' + phone.replace(/\s/g, '')} className="btn-accent">Notdienst: {phone} <span aria-hidden>→</span></a></p>}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * HOTEL — Stay / Suites
 * ═══════════════════════════════════════════════════════════════════ */
function HotelSignature({ style, content }: { style: TemplateStyle; content: SiteContent }) {
  const rooms = content.services.slice(0, 3);
  const photos = content.gallery.slice(0, 3);
  if (!rooms.length) return null;

  if (style === 'bold') {
    return (
      <section className="py-24 md:py-32 bg-brand text-white">
        <div className="container-x">
          <Eyebrow style={style}>Aufenthalt</Eyebrow>
          <Title style={style}>Suite.<br/>Zimmer.<br/>Stille.</Title>
          <div className="mt-12 grid md:grid-cols-3 gap-2">
            {rooms.map((r, i) => (
              <article key={i} className="relative aspect-[4/5] overflow-hidden">
                {photos[i] && <img src={photos[i]} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="font-mono text-xs text-[var(--accent-color)]">/{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tight mt-2">{r.title}</h3>
                  {r.price && <p className="font-mono text-sm mt-2">ab {r.price}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32 surface">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Eyebrow style={style}>Aufenthalt anfragen</Eyebrow>
              <Title style={style}>Zimmer &amp; <em className="italic-pop">Suiten.</em></Title>
            </div>
            <TLink to="/kontakt" className="btn-primary">Verfügbarkeit prüfen <span aria-hidden>→</span></TLink>
          </div>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {rooms.map((r, i) => (
              <article key={i} className="bg-white border border-line rounded-2xl overflow-hidden hover-lift">
                {photos[i] && <div className="aspect-[4/3] overflow-hidden"><img src={photos[i]} alt="" className="w-full h-full object-cover" /></div>}
                <div className="p-6">
                  <h3 className="font-display text-2xl">{r.title}</h3>
                  {r.description && <p className="mt-3 text-sm text-muted leading-relaxed">{r.description}</p>}
                  {r.price && (
                    <div className="mt-5 pt-5 border-t border-line flex items-baseline justify-between">
                      <span className="text-xs font-mono uppercase tracking-widest text-muted">ab</span>
                      <span className="font-display text-xl">{r.price}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // classic — magazine spread with rates
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Eyebrow style={style}>Zimmer &amp; Suiten</Eyebrow>
          <Title style={style}>Bleiben Sie<br/><em className="italic-pop">eine Nacht länger.</em></Title>
          <p className="mt-6 text-muted">Persönlich eingerichtet, mit Aussicht und Stille.</p>
        </div>
        <div className="md:col-span-8 space-y-8">
          {rooms.map((r, i) => (
            <article key={i} className="grid md:grid-cols-12 gap-6 border-t-2 border-brand pt-6 items-start">
              {photos[i] && <div className="md:col-span-4 aspect-[4/3] overflow-hidden"><img src={photos[i]} alt="" className="w-full h-full object-cover" /></div>}
              <div className="md:col-span-7">
                <span className="font-display italic text-2xl text-[var(--accent-color)]">{['I','II','III'][i]}</span>
                <h3 className="font-display text-3xl mt-1">{r.title}</h3>
                {r.description && <p className="mt-3 text-sm text-muted leading-relaxed">{r.description}</p>}
              </div>
              {r.price && <p className="md:col-span-1 md:text-right font-mono text-sm">{r.price}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * TOURISM — Next Tours
 * ═══════════════════════════════════════════════════════════════════ */
function TourismSignature({ style, content }: { style: TemplateStyle; content: SiteContent }) {
  const tours = content.services.slice(0, 4);
  if (!tours.length) return null;

  // Use the optional duration field on each service as the leading label.
  // No fake dates: only show what tenants can actually edit.
  const upcoming = tours.map((t: any) =>
    (t.duration && String(t.duration).trim()) ||
    (t.date && String(t.date).trim()) ||
    `Tour 0${(tours.indexOf(t) + 1)}`
  );

  if (style === 'bold') {
    return (
      <section className="py-24 md:py-32 bg-brand text-white">
        <div className="container-x">
          <Eyebrow style={style}>Nächste Termine</Eyebrow>
          <Title style={style}>Berge.<br/>Pfade.<br/>Ausblick.</Title>
          <ol className="mt-14 divide-y divide-white/15">
            {tours.map((t, i) => (
              <li key={i} className="grid md:grid-cols-12 gap-4 py-6 items-baseline">
                <span className="md:col-span-2 font-mono text-sm text-[var(--accent-color)]">{upcoming[i]}</span>
                <h3 className="md:col-span-7 font-display text-3xl md:text-5xl uppercase tracking-tight leading-[0.95]">{t.title}</h3>
                {t.description && <p className="md:col-span-2 text-sm text-white/70">{t.description.split(' ').slice(0, 6).join(' ')}…</p>}
                {t.price && <span className="md:col-span-1 md:text-right font-mono text-sm">{t.price}</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  if (style === 'modern') {
    return (
      <section className="py-24 md:py-32 surface">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Eyebrow style={style}>Nächste Touren</Eyebrow>
              <Title style={style}>Wann <em className="italic-pop">geht&apos;s los?</em></Title>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted">Auswahl · {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
            {tours.map((t, i) => (
              <article key={i} className="bg-white border border-line rounded-2xl p-6 hover-lift">
                <div className="bg-[var(--accent-color)]/10 rounded-xl text-center py-4 mb-5">
                  <p className="font-display text-xl text-brand">{upcoming[i]}</p>
                </div>
                <h3 className="font-display text-lg leading-tight">{t.title}</h3>
                {t.description && <p className="mt-3 text-xs text-muted leading-relaxed line-clamp-3">{t.description}</p>}
                {t.price && <p className="mt-4 text-xs font-mono text-brand">{t.price}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // classic — traveler's logbook
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Eyebrow style={style}>Logbuch</Eyebrow>
          <Title style={style}>Touren<br/><em className="italic-pop">der Saison.</em></Title>
          <p className="mt-6 text-muted">Jede Tour wird persönlich vorbereitet, von einem unserer lizenzierten Guides begleitet.</p>
        </div>
        <div className="md:col-span-8 space-y-1">
          <div className="grid grid-cols-12 gap-4 text-xs font-mono uppercase tracking-widest text-muted border-b border-line pb-3">
            <span className="col-span-2">Datum</span>
            <span className="col-span-7">Tour</span>
            <span className="col-span-3 text-right">Tarif</span>
          </div>
          {tours.map((t, i) => (
            <HardShadowCard key={i} className="bg-white p-5 grid grid-cols-12 gap-4 items-baseline" offset={3}>
              <span className="col-span-2 font-mono text-sm">{upcoming[i]}</span>
              <div className="col-span-7">
                <h3 className="font-display text-xl">{t.title}</h3>
                {t.description && <p className="text-xs text-muted italic mt-1 line-clamp-1">{t.description}</p>}
              </div>
              <span className="col-span-3 text-right font-mono text-sm">{t.price || '—'}</span>
            </HardShadowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── public dispatch ─────────── */
export function BranchSignature({
  variant, style, content,
}: { variant: TemplateVariant; style: TemplateStyle; content: SiteContent }) {
  const wrapper = sectionBg(style);
  const block = (() => {
    switch (variant) {
      case 'restaurant': return <RestaurantSignature style={style} content={content} />;
      case 'salon': return <SalonSignature style={style} content={content} />;
      case 'tradesman': return <TradesmanSignature style={style} content={content} />;
      case 'hotel': return <HotelSignature style={style} content={content} />;
      case 'tourism': return <TourismSignature style={style} content={content} />;
      default: return null;
    }
  })();
  // wrapper class only used for default-tone harmonization in modern; the
  // signatures already handle their own backgrounds, so we don't double-wrap.
  void wrapper;
  return block;
}
