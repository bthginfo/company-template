/**
 * Branch-specific modules — components that exist for a small set of
 * branches and make each template visibly distinct (matches the modules
 * advertised on the FlamingoMedia /templates page).
 *
 * Every module renders nothing when the corresponding content array/object
 * is empty so it's safe to mount unconditionally; the BRANCH_STYLE_ORDER
 * decides which keys are passed in for which branch.
 */
import React, { useEffect, useState } from 'react';
import type { SiteContent } from '@/lib/types';
import { Section, TLink } from '@/components/site-blocks';

type Variant = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism' | 'consulting' | 'medical' | 'fitness';

/**
 * Per-module heading override.
 * Tenants can set `content.moduleHeadings.<key>` = { eyebrow?, titleA?, titleB?, subtitle? }
 * to override the hardcoded defaults below. `titleB` is rendered italic / accent
 * so split your headline (e.g. "Aus unserer" / "Küche.").
 */
export type ModuleHeadingKey =
  | 'menu' | 'rooms' | 'tours' | 'treatments' | 'courses'
  | 'packages' | 'process' | 'doctors' | 'booking' | 'funding';

export type ModuleHeading = { eyebrow?: string; titleA?: string; titleB?: string; subtitle?: string };

export const MODULE_DEFAULTS: Record<ModuleHeadingKey, Required<ModuleHeading>> = {
  menu:       { eyebrow: 'Speisekarte',         titleA: 'Aus unserer',  titleB: 'Küche.',            subtitle: 'Saisonal, hausgemacht, ehrlich. Allergene auf Anfrage – wir passen Gerichte gerne an.' },
  rooms:      { eyebrow: 'Zimmer & Suiten',     titleA: 'Ihr Zuhause auf', titleB: 'Zeit.',          subtitle: 'Jedes Zimmer individuell gestaltet, mit echtem Holz, ruhigen Stoffen und Ausblick. Frühstück bei jeder Variante inklusive.' },
  tours:      { eyebrow: 'Programm',            titleA: 'Touren &',     titleB: 'Erlebnisse.',       subtitle: 'Kleine Gruppen, lokale Guides, ehrliche Pausen. Jede Tour mit klarem Schwierigkeitsgrad.' },
  treatments: { eyebrow: 'Treatments & Preise', titleA: 'Pflege als',   titleB: 'Handwerk.',         subtitle: 'Alle Preise inkl. Beratung. Für umfangreiche Color-Termine empfehlen wir ein 15-Minuten-Vorgespräch.' },
  courses:    { eyebrow: 'Kursplan',            titleA: 'Programme &',  titleB: 'Formate.',          subtitle: 'Maximal 8 Personen pro Klasse. Jede Stunde mit klarem Fokus, Korrekturen und Raum für Ihre Praxis.' },
  packages:   { eyebrow: 'Pakete & Preise',     titleA: 'Klar gerechnet,', titleB: 'fair.',          subtitle: 'Keine versteckten Gebühren. Wechsel oder Pause monatlich möglich.' },
  process:    { eyebrow: 'Beratungsprozess',    titleA: 'So',           titleB: 'arbeiten wir.',     subtitle: 'Vom ersten Gespräch bis zur Umsetzung – mit klaren Phasen und ehrlichen Erwartungen.' },
  doctors:    { eyebrow: 'Ärzt:innen & Team',   titleA: 'Menschen, denen Sie', titleB: 'vertrauen.', subtitle: 'Alle Ärzt:innen mit Facharzt-Anerkennung. Termine ausschließlich nach Vereinbarung – wir nehmen uns Zeit.' },
  booking:    { eyebrow: 'Termin online',       titleA: 'Online-Termin –', titleB: 'in 60 Sekunden.', subtitle: 'Buchen Sie Ihren Wunschtermin direkt – ohne Anruf, ohne Wartezeit. Stornierung bis 24 h vorher kostenfrei.' },
  funding:    { eyebrow: 'Förder-Kalkulator',   titleA: 'Was kostet Sie das', titleB: 'wirklich?',  subtitle: 'KfW, BAFA, regionale Programme: wir berechnen vor Auftrag, was Ihnen netto bleibt.' },
};

export function moduleHeading(content: SiteContent, key: ModuleHeadingKey): { eyebrow: string; title: React.ReactNode; subtitle: string } {
  const overlay = ((content as any).moduleHeadings || {})[key] as ModuleHeading | undefined;
  const def = MODULE_DEFAULTS[key];
  const eyebrow = (overlay?.eyebrow ?? '').trim() || def.eyebrow;
  const titleA  = (overlay?.titleA  ?? '').trim() || def.titleA;
  const titleB  = (overlay?.titleB  ?? '').trim() || def.titleB;
  const subtitle = (overlay?.subtitle ?? '').trim() || def.subtitle;
  return {
    eyebrow,
    title: <>{titleA} <em className="italic-pop">{titleB}</em></>,
    subtitle,
  };
}

/**
 * Inline branch module — renders the variant-appropriate module (Menu, Rooms,
 * Tours, Treatments, Funding, …). Used by Modern + Bold home renderers which
 * don't iterate BRANCH_STYLE_ORDER. Returns null when there's no data for the
 * variant so it's safe to mount unconditionally.
 */
export function BranchModulesInline({ variant, content }: { variant: Variant; content: SiteContent }) {
  if (variant === 'restaurant') return <MenuCategoriesModule content={content} />;
  if (variant === 'hotel') return <RoomShowcaseModule content={content} />;
  if (variant === 'tourism') return <TourCardsModule content={content} />;
  if (variant === 'salon') return <TreatmentListModule content={content} />;
  if (variant === 'tradesman') return <FundingCalculatorModule content={content} />;
  if (variant === 'consulting') return <><ProcessStepsModule content={content} /><PricePackagesModule content={content} /></>;
  if (variant === 'medical') return <><DoctorTeamModule content={content} /><OnlineBookingModule content={content} /></>;
  if (variant === 'fitness') return <><CourseScheduleModule content={content} /><PricePackagesModule content={content} eyebrow="Mitgliedschaft" title={<>Pakete & <em className="italic-pop">Preise.</em></>} /></>;
  return null;
}

/* ─────────────────────────────────────────────────────────────────
 * RESTAURANT — Speisekarte mit Kategorien & Allergenen
 * ─────────────────────────────────────────────────────────────── */
export function MenuCategoriesModule({ content }: { content: SiteContent }) {
  const menu = ((content as any).menu || []) as NonNullable<SiteContent['menu']>;
  const [active, setActive] = useState(0);
  if (!menu || !menu.length) return null;
  const safeActive = Math.min(active, menu.length - 1);
  const cat = menu[safeActive];
  const h = moduleHeading(content, 'menu');
  return (
    <Section
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={h.subtitle}
      className="surface"
    >
      {/* Category tabs */}
      <div className="reveal mb-10 flex flex-wrap gap-2 border-b border-line pb-4">
        {menu.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full text-sm transition border ${i === safeActive ? 'bg-brand text-white border-brand' : 'bg-white text-ink border-line hover:border-brand/40'}`}
          >
            {c.category || `Kategorie ${i + 1}`}
            <span className="ml-2 font-mono text-[10px] opacity-60">{String(c.items?.length || 0).padStart(2, '0')}</span>
          </button>
        ))}
      </div>

      <article className="reveal">
        <header className="border-b border-line pb-3 mb-6 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-3xl">{cat.category}</h3>
          <span className="font-mono text-xs text-muted">/ {String(safeActive + 1).padStart(2, '0')}</span>
        </header>
        {cat.description && <p className="text-sm text-muted mb-3 leading-relaxed">{cat.description}</p>}
        {(cat as any).priceLabel && (
          <p className="mb-4 flex justify-end font-mono text-[10px] uppercase tracking-widest text-muted">{(cat as any).priceLabel}</p>
        )}
        <ul className="space-y-6">
          {cat.items.map((it, j) => {
            const img = (it as any).imageUrl as string | undefined;
            return (
              <li key={j} className="grid grid-cols-[auto_1fr_auto] gap-x-4 items-start">
                {img ? (
                  <img src={img} alt={it.name} className="h-16 w-16 rounded-xl object-cover border border-line" loading="lazy" />
                ) : (
                  <span className="h-16 w-16" aria-hidden />
                )}
                <div className="min-w-0 self-center">
                  <p className="font-display text-lg leading-tight">
                    {it.name}
                    {it.tags && it.tags.length > 0 && (
                      <span className="ml-2 inline-flex flex-wrap gap-1.5 align-middle">
                        {it.tags.map((t, k) => (
                          <span key={k} className="text-[10px] uppercase tracking-widest font-mono bg-[var(--accent-color)]/15 text-brand px-1.5 py-0.5 rounded">{t}</span>
                        ))}
                      </span>
                    )}
                  </p>
                  {it.description && <p className="mt-1 text-sm text-muted leading-relaxed">{it.description}</p>}
                  {it.allergens && <p className="mt-1 text-[10px] uppercase tracking-widest text-muted">Allergene: {it.allergens}</p>}
                </div>
                {it.price && <span className="font-mono text-sm text-brand whitespace-nowrap self-center">{it.price}</span>}
              </li>
            );
          })}
        </ul>
      </article>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * HOTEL — Zimmer-Showcase
 * ─────────────────────────────────────────────────────────────── */
export function RoomShowcaseModule({ content }: { content: SiteContent }) {
  const rooms = ((content as any).rooms || []) as NonNullable<SiteContent['rooms']>;
  if (!rooms || !rooms.length) return null;
  const h = moduleHeading(content, 'rooms');
  return (
    <Section
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={h.subtitle}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
        {rooms.map((room, i) => (
          <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift flex flex-col">
            {room.imageUrl && (
              <div className="aspect-[4/3] img-zoom">
                <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <header className="flex items-baseline justify-between gap-3 mb-3">
                <h3 className="font-display text-2xl leading-tight">{room.name}</h3>
                {room.price && <span className="font-mono text-xs text-brand whitespace-nowrap">{room.price}</span>}
              </header>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-widest text-muted mb-3">
                {room.size && <span>{room.size}</span>}
                {room.beds && <span>· {room.beds}</span>}
              </div>
              {room.description && <p className="text-sm text-muted leading-relaxed mb-4">{room.description}</p>}
              {room.features && room.features.length > 0 && (
                <ul className="mt-auto space-y-1.5 text-xs">
                  {room.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-[var(--accent-color)] mt-0.5">✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
              <TLink to="/kontakt" className="btn-outline mt-5 !py-2 !px-4 !text-xs">Anfragen →</TLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * TOURISM — Tour-Cards mit Schwierigkeit
 * ─────────────────────────────────────────────────────────────── */
export function TourCardsModule({ content }: { content: SiteContent }) {
  const tours = ((content as any).tours || []) as NonNullable<SiteContent['tours']>;
  if (!tours || !tours.length) return null;
  const h = moduleHeading(content, 'tours');
  return (
    <Section
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={h.subtitle}
      className="surface"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
        {tours.map((tour, i) => (
          <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift flex flex-col">
            {tour.imageUrl && (
              <div className="aspect-[16/10] img-zoom relative">
                <img src={tour.imageUrl} alt={tour.name} className="w-full h-full object-cover" loading="lazy" />
                {tour.level && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-brand/95 backdrop-blur text-white px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-mono">
                    <LevelDots level={tour.level} /> {tour.level}
                  </span>
                )}
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-display text-2xl leading-tight">{tour.name}</h3>
              {tour.description && <p className="mt-3 text-sm text-muted leading-relaxed">{tour.description}</p>}
              <dl className="mt-5 grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                {tour.duration && <><dt className="text-muted uppercase tracking-widest text-[10px]">Dauer</dt><dd className="font-display">{tour.duration}</dd></>}
                {tour.groupSize && <><dt className="text-muted uppercase tracking-widest text-[10px]">Gruppe</dt><dd className="font-display">{tour.groupSize}</dd></>}
                {tour.languages && tour.languages.length > 0 && <><dt className="text-muted uppercase tracking-widest text-[10px]">Sprachen</dt><dd className="font-display">{tour.languages.join(' · ')}</dd></>}
                {tour.price && <><dt className="text-muted uppercase tracking-widest text-[10px]">Preis</dt><dd className="font-mono text-brand">{tour.price}</dd></>}
              </dl>
              <TLink to="/kontakt" className="btn-primary mt-6 !py-2 !px-4 !text-xs">Tour buchen →</TLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function LevelDots({ level }: { level: string }) {
  const m = level.match(/(\d+)\s*\/\s*(\d+)/);
  const filled = m ? parseInt(m[1], 10) : 1;
  const total = m ? parseInt(m[2], 10) : 4;
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`h-1.5 w-1.5 rounded-full ${i < filled ? 'bg-[var(--accent-color)]' : 'bg-white/30'}`} />
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * SALON — Treatment-Liste mit Dauer & Preis (kategorisiert)
 * ─────────────────────────────────────────────────────────────── */
export function TreatmentListModule({ content }: { content: SiteContent }) {
  const treatments = ((content as any).treatments || []) as NonNullable<SiteContent['treatments']>;
  if (!treatments || !treatments.length) return null;
  // group by category
  const byCat = treatments.reduce<Record<string, typeof treatments>>((acc, t) => {
    const k = t.category || 'Treatments';
    (acc[k] = acc[k] || []).push(t);
    return acc;
  }, {} as Record<string, typeof treatments>);
  const categories = Object.keys(byCat);
  const h = moduleHeading(content, 'treatments');

  return (
    <Section
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={h.subtitle}
    >
      <div className="grid lg:grid-cols-2 gap-x-14 gap-y-12 reveal-stagger">
        {categories.map((cat, i) => (
          <div key={cat}>
            <header className="border-b border-line pb-3 mb-5 flex items-baseline justify-between">
              <h3 className="font-display text-2xl">{cat}</h3>
              <span className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</span>
            </header>
            <ul className="divide-y divide-line">
              {byCat[cat].map((t, j) => (
                <li key={j} className="py-4 grid grid-cols-[1fr_auto_auto] gap-x-5 items-baseline">
                  <div>
                    <p className="font-display text-lg leading-tight">{t.name}</p>
                    {t.description && <p className="text-sm text-muted mt-0.5 leading-relaxed">{t.description}</p>}
                  </div>
                  {t.duration && <span className="font-mono text-xs text-muted whitespace-nowrap">{t.duration}</span>}
                  {t.price && <span className="font-mono text-sm text-brand whitespace-nowrap">{t.price}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 reveal">
        <TLink to="/kontakt" className="btn-primary">Termin buchen →</TLink>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * FITNESS — Kursplan / Schedule
 * ─────────────────────────────────────────────────────────────── */
export function CourseScheduleModule({ content }: { content: SiteContent }) {
  const courses = ((content as any).courses || []) as NonNullable<SiteContent['courses']>;
  if (!courses || !courses.length) return null;
  const h = moduleHeading(content, 'courses');
  return (
    <Section
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={h.subtitle}
      className="surface"
    >
      <div className="overflow-x-auto reveal">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-line text-left text-[10px] uppercase tracking-widest text-muted">
              <th className="py-3 pr-4 font-mono font-normal">Kurs</th>
              <th className="py-3 pr-4 font-mono font-normal">Termine</th>
              <th className="py-3 pr-4 font-mono font-normal">Level</th>
              <th className="py-3 pr-4 font-mono font-normal">Dauer</th>
              <th className="py-3 pr-4 font-mono font-normal">Trainer:in</th>
              <th className="py-3 font-mono font-normal text-right">Preis</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr key={i} className="border-b border-line group hover:bg-white transition-colors">
                <td className="py-5 pr-4">
                  <p className="font-display text-lg">{c.name}</p>
                  {c.description && <p className="text-xs text-muted mt-0.5">{c.description}</p>}
                </td>
                <td className="py-5 pr-4 font-mono text-xs">{c.schedule}</td>
                <td className="py-5 pr-4 text-xs">{c.level}</td>
                <td className="py-5 pr-4 font-mono text-xs">{c.duration}</td>
                <td className="py-5 pr-4 text-sm">{c.trainer}</td>
                <td className="py-5 font-mono text-sm text-brand text-right">{c.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10 reveal">
        <TLink to="/kontakt" className="btn-primary">Probetraining buchen →</TLink>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * FITNESS / CONSULTING — Pricing Packages (3-tier)
 * ─────────────────────────────────────────────────────────────── */
export function PricePackagesModule({ content, eyebrow, title }: { content: SiteContent; eyebrow?: string; title?: React.ReactNode }) {
  const packages = ((content as any).packages || []) as NonNullable<SiteContent['packages']>;
  if (!packages || !packages.length) return null;
  const h = moduleHeading(content, 'packages');
  return (
    <Section
      eyebrow={eyebrow || h.eyebrow}
      title={title || h.title}
      subtitle={h.subtitle}
    >
      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {packages.map((p, i) => (
          <article key={i} className={`relative rounded-3xl border p-8 flex flex-col hover-lift ${p.highlight ? 'bg-brand text-white border-brand shadow-2xl' : 'bg-white border-line'}`}>
            {p.highlight && (
              <span className="absolute -top-3 left-8 bg-[var(--accent-color)] text-brand font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">Empfohlen</span>
            )}
            <h3 className="font-display text-2xl">{p.name}</h3>
            <div className="mt-5 flex items-baseline gap-2">
              <span className={`font-display text-5xl ${p.highlight ? 'text-white' : 'text-brand'}`}>{p.price}</span>
              {p.period && <span className={`text-sm ${p.highlight ? 'text-white/70' : 'text-muted'}`}>{p.period}</span>}
            </div>
            {p.description && <p className={`mt-3 text-sm leading-relaxed ${p.highlight ? 'text-white/80' : 'text-muted'}`}>{p.description}</p>}
            {p.features && p.features.length > 0 && (
              <ul className={`mt-6 space-y-2.5 text-sm flex-1 ${p.highlight ? 'text-white/90' : ''}`}>
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className={p.highlight ? 'text-[var(--accent-color)]' : 'text-[var(--accent-color)]'}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
            <TLink to={p.ctaHref || '/kontakt'} className={`mt-8 ${p.highlight ? 'btn-accent' : 'btn-outline'}`}>{p.ctaLabel || 'Wählen'} →</TLink>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * CONSULTING — Process / Engagement Steps
 * ─────────────────────────────────────────────────────────────── */
export function ProcessStepsModule({ content }: { content: SiteContent }) {
  const steps = ((content as any).processSteps || []) as NonNullable<SiteContent['processSteps']>;
  if (!steps || !steps.length) return null;
  const h = moduleHeading(content, 'process');
  return (
    <Section
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={h.subtitle}
      className="surface"
    >
      <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-0 reveal-stagger">
        {steps.map((s, i) => (
          <li key={i} className="relative lg:border-l border-t lg:border-t-0 border-line p-7 bg-white">
            <span className="absolute -left-1.5 -top-1.5 lg:left-[-7px] lg:top-7 h-3 w-3 rounded-full bg-brand" style={{ boxShadow: '0 0 0 6px white' }} />
            <p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, '0')}</p>
            <h3 className="font-display text-2xl mt-3">{s.title}</h3>
            {s.duration && <p className="mt-1 text-[10px] uppercase tracking-widest text-[var(--accent-color)]">{s.duration}</p>}
            {s.description && <p className="mt-3 text-sm text-muted leading-relaxed">{s.description}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * MEDICAL — Doctors / Specialists
 * ─────────────────────────────────────────────────────────────── */
export function DoctorTeamModule({ content }: { content: SiteContent }) {
  const doctors = ((content as any).doctors || []) as NonNullable<SiteContent['doctors']>;
  if (!doctors || !doctors.length) return null;
  const h = moduleHeading(content, 'doctors');
  return (
    <Section
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={h.subtitle}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
        {doctors.map((d, i) => (
          <article key={i} className="bg-white border border-line rounded-3xl overflow-hidden hover-lift">
            {d.imageUrl && (
              <div className="aspect-[4/5] img-zoom">
                <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
            <div className="p-6">
              <h3 className="font-display text-xl">{d.name}</h3>
              {d.role && <p className="text-sm text-muted mt-0.5">{d.role}</p>}
              {d.specialty && <p className="mt-3 text-[10px] uppercase tracking-widest text-[var(--accent-color)]">{d.specialty}</p>}
              {d.bio && <p className="mt-3 text-sm leading-relaxed">{d.bio}</p>}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * MEDICAL — Online Booking (Doctolib / jameda CTA + optional iframe)
 * ─────────────────────────────────────────────────────────────── */
export function OnlineBookingModule({ content }: { content: SiteContent }) {
  const b = ((content as any).booking || {}) as NonNullable<SiteContent['booking']>;
  if (!b || !b.enabled) return null;
  const provider = b.provider || 'Online-Termin';
  const h = moduleHeading(content, 'booking');
  return (
    <Section
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={b.note || h.subtitle}
      className="surface"
    >
      {b.embedUrl ? (
        <div className="rounded-3xl overflow-hidden border border-line bg-white reveal">
          <iframe src={b.embedUrl} title={`${provider} Buchung`} className="w-full" style={{ height: 720, border: 0 }} loading="lazy" />
        </div>
      ) : (
        <div className="rounded-3xl border border-line bg-white p-10 md:p-14 text-center reveal max-w-2xl mx-auto">
          <div className="inline-flex h-14 w-14 rounded-full bg-[var(--accent-color)]/15 items-center justify-center text-brand mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <p className="font-display text-3xl">Termin direkt buchen</p>
          <p className="mt-4 text-muted">Wir nutzen {provider} für eine reibungslose Buchung – mit Erinnerung per Mail und SMS.</p>
          {b.url && (
            <a href={b.url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">
              Über {provider} buchen →
            </a>
          )}
        </div>
      )}
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * TRADESMAN — Funding Calculator
 * ─────────────────────────────────────────────────────────────── */
export function FundingCalculatorModule({ content }: { content: SiteContent }) {
  const items = ((content as any).fundingItems || []) as NonNullable<SiteContent['fundingItems']>;
  const [total, setTotal] = useState(25000);
  if (!items || !items.length) return null;
  const maxPercent = items.reduce((acc, it) => Math.max(acc, parseFloat((it.percent || '0').replace(/[^0-9.,]/g, '').replace(',', '.')) || 0), 0);
  const saving = Math.round(total * (maxPercent / 100));
  const net = total - saving;
  const h = moduleHeading(content, 'funding');

  return (
    <Section
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={h.subtitle}
      className="surface"
    >
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 reveal">
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-muted">Geplantes Investment</span>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-display text-5xl text-brand">{total.toLocaleString('de-DE')} €</span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={1000}
              value={total}
              onChange={(e) => setTotal(parseInt(e.target.value, 10))}
              className="mt-5 w-full accent-[var(--accent-color)]"
            />
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted mt-2">
              <span>5.000 €</span>
              <span>150.000 €</span>
            </div>
          </label>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-[10px] uppercase tracking-widest text-muted">Investment</p>
              <p className="mt-2 font-display text-2xl">{total.toLocaleString('de-DE')} €</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-[10px] uppercase tracking-widest text-muted">Förderung</p>
              <p className="mt-2 font-display text-2xl text-[var(--accent-color)]">−{saving.toLocaleString('de-DE')} €</p>
            </div>
            <div className="rounded-2xl border border-brand bg-brand text-white p-5">
              <p className="text-[10px] uppercase tracking-widest text-white/70">Ihr Eigenanteil</p>
              <p className="mt-2 font-display text-2xl">{net.toLocaleString('de-DE')} €</p>
            </div>
          </div>
          <p className="mt-5 text-xs text-muted leading-relaxed">
            Annahme: maximale Förderquote von {maxPercent}% kombiniert. Die tatsächliche Förderung hängt von Maßnahme, Bestand und Antragslage ab – wir kalkulieren Ihren konkreten Fall vor Auftrag.
          </p>
        </div>
        <div className="lg:col-span-5 reveal">
          <p className="eyebrow mb-4">Mögliche Programme</p>
          <ul className="space-y-3">
            {items.map((it, i) => (
              <li key={i} className="rounded-2xl border border-line bg-white p-5 flex items-start gap-4">
                {it.percent && <span className="font-display text-2xl text-[var(--accent-color)] whitespace-nowrap">{it.percent}</span>}
                <div className="flex-1">
                  <p className="font-display text-base">{it.title}{it.program && <span className="ml-2 text-[10px] uppercase tracking-widest text-muted">{it.program}</span>}</p>
                  {it.description && <p className="mt-1 text-xs text-muted leading-relaxed">{it.description}</p>}
                </div>
              </li>
            ))}
          </ul>
          <TLink to="/kontakt" className="btn-primary mt-6">Förder-Beratung anfragen →</TLink>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * TRADESMAN — Sticky Emergency Banner
 * ─────────────────────────────────────────────────────────────── */
export function EmergencyStickyBanner({ content }: { content: SiteContent }) {
  const b = ((content as any).emergencyBanner || {}) as NonNullable<SiteContent['emergencyBanner']>;
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!b || !b.enabled) return;
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [b]);

  if (!b || !b.enabled || hidden) return null;
  const phone = b.phone || content.contact?.phone || '';
  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '#';

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-40 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      role="region"
      aria-label="Notdienst"
    >
      <div className="rounded-2xl bg-brand text-white shadow-2xl border border-white/10 px-5 py-4 flex items-center gap-4">
        <span className="relative inline-flex h-10 w-10 rounded-full bg-[var(--accent-color)] items-center justify-center shrink-0">
          <span className="absolute inset-0 rounded-full bg-[var(--accent-color)] animate-ping opacity-40" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative text-brand">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/70">Notdienst 24/7</p>
          <p className="font-display text-base leading-tight truncate">{b.text || 'Wir kommen schnell.'}</p>
        </div>
        {phone && (
          <a href={phoneHref} className="font-display text-base bg-[var(--accent-color)] text-brand rounded-full px-4 py-2 whitespace-nowrap hover:scale-105 transition-transform">
            {phone}
          </a>
        )}
        <button
          aria-label="Notdienst-Banner ausblenden"
          onClick={() => setHidden(true)}
          className="text-white/60 hover:text-white text-xl leading-none p-1 -mr-1"
        >×</button>
      </div>
    </div>
  );
}
