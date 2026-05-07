import type { ModularSectionDataFormProps, ModularSpecPageKey } from './modular-section-types';
import type { SiteContent } from '@/lib/types';
import { ANNOUNCEMENT_BAR_SECTION_KEY } from '@/lib/page-layout';
import {
  ModField,
  ModImagePick,
  ModLinkTarget,
  modularInputCls,
  patchButton,
  readButton,
} from './modular-section-field-kit';
import { extendedModularSectionForm } from './modular-extended-section-forms';

function str(v: unknown): string {
  return typeof v === 'string' ? v : v == null ? '' : String(v);
}

function bool(v: unknown, def: boolean): boolean {
  if (typeof v === 'boolean') return v;
  return def;
}

function NoticeBannerSubpageForm({
  page,
  content,
  onPatch,
}: {
  page: ModularSpecPageKey;
  content: SiteContent;
  onPatch: (patch: Partial<SiteContent>) => void;
}) {
  const vis = (content.sectionVisibility ?? {}) as Record<string, boolean>;
  const fullKey = `${page}.${ANNOUNCEMENT_BAR_SECTION_KEY}`;
  const enabled = vis[fullKey] !== false;
  const pageLabel =
    page === 'home'
      ? 'Startseite'
      : page === 'services'
      ? 'dieser Unterseite'
      : page === 'gallery'
        ? 'Galerie'
        : page === 'about'
          ? 'Über uns'
          : 'Kontakt';
  return (
    <div className="rounded-xl border border-line bg-[#fafaf7] p-4 space-y-3 text-sm">
      <p className="text-muted leading-relaxed">
        Die <strong className="text-foreground">Hinweiszeilen</strong> im Header bearbeiten Sie global unter{' '}
        <strong className="text-brand">Navigation & Footer</strong> im Block „Header-Hinweisbanner“. Hier steuern Sie nur die
        Sichtbarkeit auf dieser Seite.
      </p>
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => {
            onPatch({
              sectionVisibility: { ...vis, [fullKey]: e.target.checked },
            });
          }}
        />
        <span>Hinweis-Banner auf „{pageLabel}“ anzeigen</span>
      </label>
    </div>
  );
}

function NoticeBannerForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) => (x && typeof x === 'object' ? str((x as { text?: unknown }).text) : ''))
    : [];
  const setItems = (next: string[]) => onChange({ ...data, items: next.map((text) => ({ text })) });
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted leading-relaxed">
        Fallback-Editor: Das Header-Hinweisbanner wird global unter Navigation & Footer gepflegt.
      </p>
      <ModField label="Hinweiszeilen (z. B. Öffnungszeiten, Events)">
        <div className="space-y-2">
          {items.map((line, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={modularInputCls}
                value={line}
                onChange={(e) => setItems(items.map((x, j) => (j === i ? e.target.value : x)))}
                placeholder="Text der Hinweiszeile"
              />
              <button
                type="button"
                className="shrink-0 h-10 w-10 rounded-lg border border-line hover:bg-rose-50 text-rose-600"
                onClick={() => setItems(items.filter((_, j) => j !== i))}
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => setItems([...items, ''])}>
            + Zeile
          </button>
        </div>
      </ModField>
    </div>
  );
}

function CtaBandForm({ data, onChange, tpl }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'tpl'>) {
  const btn = readButton(data, 'button');
  const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <ModField label="Eyebrow">
        <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
      </ModField>
      <ModField label="Zwischenüberschrift / Lead">
        <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
      </ModField>
      <ModField label="Untertitel">
        <textarea className={modularInputCls} rows={2} value={str(data.subline)} onChange={(e) => onChange({ ...data, subline: e.target.value })} />
      </ModField>
      <ModField label="Button-Text">
        <input className={modularInputCls} value={str(btn.label)} onChange={(e) => onChange(patchButton(data, 'button', { label: e.target.value }))} />
      </ModField>
      <div className="sm:col-span-2">
        <ModLinkTarget
          label="Button-Ziel"
          tpl={tpl}
          value={href}
          onChange={(v) => {
            const ext = v.startsWith('http') || v.startsWith('mailto:') || v.startsWith('tel:');
            onChange(
              patchButton(data, 'button', {
                linkType: ext ? 'external' : 'internal',
                internalPage: ext ? '' : v,
                externalUrl: ext ? v : '',
              }),
            );
          }}
        />
      </div>
    </div>
  );
}

function StatsBandForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { value: str((x as { value?: unknown }).value), description: str((x as { description?: unknown }).description) }
          : { value: '', description: '' },
      )
    : [];
  const set = (next: typeof items) => onChange({ ...data, items: next });
  return (
    <div className="space-y-2">
      {items.map((row, i) => (
        <div key={i} className="grid sm:grid-cols-[1fr_2fr_auto] gap-2 items-end">
          <ModField label="Zahl / Kurztext">
            <input className={modularInputCls} value={row.value} onChange={(e) => set(items.map((r, j) => (j === i ? { ...r, value: e.target.value } : r)))} />
          </ModField>
          <ModField label="Beschreibung">
            <input className={modularInputCls} value={row.description} onChange={(e) => set(items.map((r, j) => (j === i ? { ...r, description: e.target.value } : r)))} />
          </ModField>
          <button type="button" className="h-10 w-10 rounded-lg border border-line hover:bg-rose-50 text-rose-600 mb-0.5" onClick={() => set(items.filter((_, j) => j !== i))}>
            ×
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { value: '', description: '' }])}>
        + Kennzahl
      </button>
    </div>
  );
}

function TestimonialsBlockForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const raw = Array.isArray(data.testimonials)
    ? (data.testimonials as unknown[])
    : Array.isArray(data.items)
      ? (data.items as unknown[])
      : [];
  const rows = raw.map((x) =>
    x && typeof x === 'object'
      ? {
          name: str((x as { name?: unknown }).name || (x as { author?: unknown }).author),
          quote: str((x as { quote?: unknown }).quote || (x as { text?: unknown }).text),
        }
      : { name: '', quote: '' },
  );
  const set = (next: typeof rows) => onChange({ ...data, testimonials: next, items: next });
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <p className="text-xs uppercase tracking-widest text-muted">Zitate</p>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="border border-line rounded-xl p-3 space-y-2">
            <ModField label="Name / Quelle">
              <input className={modularInputCls} value={r.name} onChange={(e) => set(rows.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
            </ModField>
            <ModField label="Zitat">
              <textarea className={modularInputCls} rows={2} value={r.quote} onChange={(e) => set(rows.map((x, j) => (j === i ? { ...x, quote: e.target.value } : x)))} />
            </ModField>
            <button type="button" className="text-xs text-rose-600 hover:underline" onClick={() => set(rows.filter((_, j) => j !== i))}>
              Entfernen
            </button>
          </div>
        ))}
        <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...rows, { name: '', quote: '' }])}>
          + Zitat
        </button>
      </div>
    </div>
  );
}

function TextPairListForm({
  data,
  onChange,
  keyItems,
  titleKey,
  descKey,
  titleLabel,
  descLabel,
}: {
  data: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  keyItems: string;
  titleKey: string;
  descKey: string;
  titleLabel: string;
  descLabel: string;
}) {
  const items = Array.isArray(data[keyItems])
    ? (data[keyItems] as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { t: str((x as Record<string, unknown>)[titleKey]), d: str((x as Record<string, unknown>)[descKey]) }
          : { t: '', d: '' },
      )
    : [];
  const set = (next: typeof items) => onChange({ ...data, [keyItems]: next.map((r) => ({ [titleKey]: r.t, [descKey]: r.d })) });
  return (
    <div className="space-y-2">
      {items.map((row, i) => (
        <div key={i} className="grid sm:grid-cols-2 gap-2 border border-line rounded-xl p-3">
          <ModField label={titleLabel}>
            <input className={modularInputCls} value={row.t} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, t: e.target.value } : x)))} />
          </ModField>
          <ModField label={descLabel}>
            <textarea className={modularInputCls} rows={2} value={row.d} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, d: e.target.value } : x)))} />
          </ModField>
          <button type="button" className="text-xs text-rose-600 sm:col-span-2" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { t: '', d: '' }])}>
        + Eintrag
      </button>
    </div>
  );
}

function HeadingTextPairListForm({
  data,
  onChange,
  titleLabel,
  descLabel,
  fallbackEyebrow,
}: Pick<ModularSectionDataFormProps, 'data' | 'onChange'> & {
  titleLabel: string;
  descLabel: string;
  fallbackEyebrow?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} placeholder={fallbackEyebrow} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <TextPairListForm
        data={data}
        onChange={onChange}
        keyItems="items"
        titleKey="title"
        descKey="description"
        titleLabel={titleLabel}
        descLabel={descLabel}
      />
    </div>
  );
}

function MarqueeForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) => (x && typeof x === 'object' ? str((x as { text?: unknown }).text) : ''))
    : [];
  const set = (next: string[]) => onChange({ ...data, items: next.map((text) => ({ text })) });
  return (
    <ModField label="Laufband ganz oben: Wörter / Phrasen">
      <div className="space-y-2">
        {items.map((w, i) => (
          <div key={i} className="flex gap-2">
            <input className={modularInputCls} value={w} onChange={(e) => set(items.map((x, j) => (j === i ? e.target.value : x)))} />
            <button type="button" className="h-10 w-10 rounded-lg border border-line" onClick={() => set(items.filter((_, j) => j !== i))}>
              ×
            </button>
          </div>
        ))}
        <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, ''])}>
          + Wort
        </button>
      </div>
    </ModField>
  );
}

function LabelBandForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const labels = Array.isArray(data.labels)
    ? (data.labels as unknown[]).map((x) => (x && typeof x === 'object' ? str((x as { text?: unknown }).text) : ''))
    : [];
  const set = (next: string[]) => onChange({ ...data, labels: next.map((text) => ({ text })) });
  return (
    <ModField label="Labels / Logos (Textzeilen)">
      <div className="space-y-2">
        {labels.map((w, i) => (
          <div key={i} className="flex gap-2">
            <input className={modularInputCls} value={w} onChange={(e) => set(labels.map((x, j) => (j === i ? e.target.value : x)))} />
            <button type="button" className="h-10 w-10 rounded-lg border border-line" onClick={() => set(labels.filter((_, j) => j !== i))}>
              ×
            </button>
          </div>
        ))}
        <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...labels, ''])}>
          + Label
        </button>
      </div>
    </ModField>
  );
}

function NewsTeaserForm({ data, onChange, tpl }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'tpl'>) {
  const btn = readButton(data, 'button');
  const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <ModField label="Button-Text">
        <input className={modularInputCls} value={str(btn.label)} onChange={(e) => onChange(patchButton(data, 'button', { label: e.target.value }))} />
      </ModField>
      <ModLinkTarget
        label="Button-Ziel"
        tpl={tpl}
        value={href}
        onChange={(v) => {
          const ext = v.startsWith('http') || v.startsWith('mailto:') || v.startsWith('tel:');
          onChange(
            patchButton(data, 'button', {
              linkType: ext ? 'external' : 'internal',
              internalPage: ext ? '' : v,
              externalUrl: ext ? v : '',
            }),
          );
        }}
      />
    </div>
  );
}

function HeroForm({ data, onChange, tpl, style, uploadImage, modularPage }: ModularSectionDataFormProps) {
  const classicSubpageReduced =
    style === 'classic' &&
    modularPage &&
    modularPage !== 'home' &&
    modularPage !== 'about' &&
    (modularPage === 'services' || modularPage === 'gallery' || modularPage === 'contact');
  const aboutClassicIntroHero = style === 'classic' && modularPage === 'about';
  const btn = readButton(data, 'buttonPrimary');
  const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
  const bg = data.backgroundImage && typeof data.backgroundImage === 'object' ? (data.backgroundImage as { image?: string }).image || '' : '';
  const img = data.image && typeof data.image === 'object' ? (data.image as { image?: string }).image || '' : '';
  const stats = Array.isArray(data.stats)
    ? (data.stats as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { value: str((x as { value?: unknown }).value), description: str((x as { description?: unknown }).description) }
          : { value: '', description: '' },
      )
    : [];
  const setStats = (next: typeof stats) => onChange({ ...data, stats: next });
  const setBg = (url: string) => onChange({ ...data, backgroundImage: { image: url, alt: '' } });
  const setImg = (url: string) => onChange({ ...data, image: { image: url, alt: '' } });
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Headline">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
        <ModField label="Subline">
          <input className={modularInputCls} value={str(data.subline)} onChange={(e) => onChange({ ...data, subline: e.target.value })} />
        </ModField>
      </div>
      <ModField label="Fließtext / Beschreibung">
        <textarea className={modularInputCls} rows={3} value={str(data.description)} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      </ModField>
      {aboutClassicIntroHero ? (
        <>
          <ModImagePick label="Intro-Bild (unter dem Seitenkopf)" value={img} onChange={setImg} uploadImage={uploadImage} ratio="aspect-[4/5]" />
          <p className="text-xs text-muted pt-1 max-w-prose">
            Der klassische Seitenkopf zeigt nur Eyebrow, Überschrift und Untertitel. Fließtext und Bild steuern Sie hier — sie erscheinen im Intro unter dem Kopf.
          </p>
        </>
      ) : classicSubpageReduced ? (
        <p className="text-xs text-muted pt-1 max-w-prose">
          Diese Unterseite nutzt einen schlichten Seitenkopf. Pflegen Sie hier den kurzen Einstiegstext für diese Seite.
        </p>
      ) : (
        <>
          {style === 'classic' ? (
            <ModImagePick label="Hintergrundbild" value={bg} onChange={setBg} uploadImage={uploadImage} ratio="aspect-[16/9]" />
          ) : (
            <ModImagePick label="Hero-Bild" value={img} onChange={setImg} uploadImage={uploadImage} ratio="aspect-[4/5]" />
          )}
          <p className="text-xs font-medium text-muted pt-2">Primär-Button</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <ModField label="Button-Text">
              <input className={modularInputCls} value={str(btn.label)} onChange={(e) => onChange(patchButton(data, 'buttonPrimary', { label: e.target.value }))} />
            </ModField>
            <div className="sm:col-span-2">
              <ModLinkTarget
                label="Button-Ziel"
                tpl={tpl}
                value={href}
                onChange={(v) => {
                  const ext = v.startsWith('http') || v.startsWith('mailto:') || v.startsWith('tel:');
                  onChange(
                    patchButton(data, 'buttonPrimary', {
                      linkType: ext ? 'external' : 'internal',
                      internalPage: ext ? '' : v,
                      externalUrl: ext ? v : '',
                    }),
                  );
                }}
              />
            </div>
          </div>
          <p className="text-xs font-medium text-muted pt-2">Eckdaten (optional)</p>
          <div className="space-y-2">
            {stats.map((row, i) => (
              <div key={i} className="grid sm:grid-cols-[1fr_2fr_auto] gap-2 items-end">
                <input className={modularInputCls} value={row.value} onChange={(e) => setStats(stats.map((r, j) => (j === i ? { ...r, value: e.target.value } : r)))} placeholder="z. B. 1998" />
                <input className={modularInputCls} value={row.description} onChange={(e) => setStats(stats.map((r, j) => (j === i ? { ...r, description: e.target.value } : r)))} placeholder="Beschreibung" />
                <button type="button" className="h-10 w-10 rounded-lg border border-line" onClick={() => setStats(stats.filter((_, j) => j !== i))}>
                  ×
                </button>
              </div>
            ))}
            <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => setStats([...stats, { value: '', description: '' }])}>
              + Zeile
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ActionBarForm({ data, onChange, tpl }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'tpl'>) {
  const bp = readButton(data, 'buttonPrimary');
  const bs = readButton(data, 'buttonSecondary');
  const autoStatus = bool(data.autoAvailabilityStatusEnabled, true);
  const hp = bp.linkType === 'external' ? str(bp.externalUrl) : str(bp.internalPage);
  const hs = bs.linkType === 'external' ? str(bs.externalUrl) : str(bs.internalPage);
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={autoStatus}
          onChange={(e) => onChange({ ...data, autoAvailabilityStatusEnabled: e.target.checked })}
        />
        <span>Status aus Öffnungszeiten automatisch</span>
      </label>
      <ModField label="Status-Text (Override)" hint={autoStatus ? 'Automatisch aktiv: Dieser Text wird auf der Website aus den Öffnungszeiten berechnet.' : undefined}>
        <input
          className={`${modularInputCls} disabled:cursor-not-allowed disabled:opacity-50`}
          value={str(data.availabilityStatusOverride)}
          disabled={autoStatus}
          onChange={(e) => onChange({ ...data, availabilityStatusOverride: e.target.value })}
        />
      </ModField>
      <p className="text-xs font-medium text-muted">Primär-Button</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Text">
          <input className={modularInputCls} value={str(bp.label)} onChange={(e) => onChange(patchButton(data, 'buttonPrimary', { label: e.target.value }))} />
        </ModField>
        <div className="sm:col-span-2">
          <ModLinkTarget
            label="Ziel"
            tpl={tpl}
            value={hp}
            onChange={(v) => {
              const ext = v.startsWith('http') || v.startsWith('mailto:') || v.startsWith('tel:');
              onChange(
                patchButton(data, 'buttonPrimary', {
                  linkType: ext ? 'external' : 'internal',
                  internalPage: ext ? '' : v,
                  externalUrl: ext ? v : '',
                }),
              );
            }}
          />
        </div>
      </div>
      <p className="text-xs font-medium text-muted">Sekundär-Button</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Text">
          <input className={modularInputCls} value={str(bs.label)} onChange={(e) => onChange(patchButton(data, 'buttonSecondary', { label: e.target.value }))} />
        </ModField>
        <div className="sm:col-span-2">
          <ModLinkTarget
            label="Ziel"
            tpl={tpl}
            value={hs}
            onChange={(v) => {
              const ext = v.startsWith('http') || v.startsWith('mailto:') || v.startsWith('tel:');
              onChange(
                patchButton(data, 'buttonSecondary', {
                  linkType: ext ? 'external' : 'internal',
                  internalPage: ext ? '' : v,
                  externalUrl: ext ? v : '',
                }),
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StoryTeaserForm({ data, onChange, tpl, uploadImage }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'tpl' | 'uploadImage'>) {
  const btn = readButton(data, 'button');
  const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
  const rawImg = (data as { image?: unknown }).image;
  const im =
    typeof rawImg === 'string'
      ? rawImg.trim()
      : rawImg && typeof rawImg === 'object'
        ? str((rawImg as { image?: unknown }).image)
        : '';
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <ModField label="Text">
        <textarea className={modularInputCls} rows={4} value={str(data.description)} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      </ModField>
      <ModImagePick label="Bild" value={im} onChange={(url) => onChange({ ...data, image: { image: url, alt: '' } })} uploadImage={uploadImage} />
      <ModField label="Button-Text">
        <input className={modularInputCls} value={str(btn.label)} onChange={(e) => onChange(patchButton(data, 'button', { label: e.target.value }))} />
      </ModField>
      <ModLinkTarget
        label="Button-Ziel"
        tpl={tpl}
        value={href}
        onChange={(v) => {
          const ext = v.startsWith('http') || v.startsWith('mailto:') || v.startsWith('tel:');
          onChange(
            patchButton(data, 'button', {
              linkType: ext ? 'external' : 'internal',
              internalPage: ext ? '' : v,
              externalUrl: ext ? v : '',
            }),
          );
        }}
      />
    </div>
  );
}

function GalleryPreviewForm({ data, onChange, tpl, uploadImage }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'tpl' | 'uploadImage'>) {
  const imgs = Array.isArray(data.images)
    ? (data.images as unknown[]).map((x) => (x && typeof x === 'object' ? str((x as { image?: unknown }).image) : ''))
    : [];
  const set = (next: string[]) => onChange({ ...data, images: next.map((image) => ({ image, alt: '' })) });
  const btn = readButton(data, 'button');
  const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <p className="text-xs uppercase tracking-widest text-muted">Vorschaubilder (max. 6 empfohlen)</p>
      <div className="space-y-3">
        {imgs.map((u, i) => (
          <ModImagePick key={`${i}-${u || 'empty'}`} label={`Bild ${i + 1}`} value={u} onChange={(url) => set(imgs.map((x, j) => (j === i ? url : x)))} uploadImage={uploadImage} />
        ))}
        <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...imgs, ''])}>
          + Bild
        </button>
      </div>
      <ModField label="Button-Text">
        <input className={modularInputCls} value={str(btn.label)} onChange={(e) => onChange(patchButton(data, 'button', { label: e.target.value }))} />
      </ModField>
      <ModLinkTarget
        label="Button-Ziel"
        tpl={tpl}
        value={href}
        onChange={(v) => {
          const ext = v.startsWith('http') || v.startsWith('mailto:') || v.startsWith('tel:');
          onChange(
            patchButton(data, 'button', {
              linkType: ext ? 'external' : 'internal',
              internalPage: ext ? '' : v,
              externalUrl: ext ? v : '',
            }),
          );
        }}
      />
    </div>
  );
}

function FeaturedGridForm({ data, onChange, uploadImage }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'uploadImage'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? {
              name: str((x as { name?: unknown }).name),
              price: str((x as { price?: unknown }).price),
              description: str((x as { description?: unknown }).description),
              image: str((x as { image?: { image?: string } }).image?.image),
            }
          : { name: '', price: '', description: '', image: '' },
      )
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({
        name: r.name,
        price: r.price,
        description: r.description,
        image: { image: r.image, alt: r.name },
      })),
    });
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Titel – Teil 1">
          <input className={modularInputCls} value={str(data.titleA)} onChange={(e) => onChange({ ...data, titleA: e.target.value })} />
        </ModField>
        <ModField label="Titel – Teil 2">
          <input className={modularInputCls} value={str(data.titleB)} onChange={(e) => onChange({ ...data, titleB: e.target.value })} />
        </ModField>
      </div>
      <ModField label="Einleitung">
        <textarea className={modularInputCls} rows={2} value={str(data.description)} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      </ModField>
      <p className="text-xs uppercase tracking-widest text-muted">Gerichte / Karten</p>
      {items.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-4 space-y-3">
          <ModField label="Name">
            <input className={modularInputCls} value={row.name} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
          </ModField>
          <div className="grid sm:grid-cols-2 gap-3">
            <ModField label="Preis">
              <input className={modularInputCls} value={row.price} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))} />
            </ModField>
          </div>
          <ModField label="Beschreibung">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <ModImagePick label="Bild" value={row.image} onChange={(url) => set(items.map((x, j) => (j === i ? { ...x, image: url } : x)))} uploadImage={uploadImage} />
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Karte entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { name: '', price: '', description: '', image: '' }])}>
        + Karte
      </button>
    </div>
  );
}

function FeaturedDishesBoldForm({ data, onChange, uploadImage }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'uploadImage'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? {
              name: str((x as { name?: unknown }).name),
              price: str((x as { price?: unknown }).price),
              description: str((x as { description?: unknown }).description),
              image: str((x as { image?: { image?: string } }).image?.image),
            }
          : { name: '', price: '', description: '', image: '' },
      )
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({
        name: r.name,
        price: r.price,
        description: r.description,
        image: { image: r.image, alt: r.name },
      })),
    });
  return (
    <div className="space-y-4">
      <ModField label="Eyebrow">
        <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
      </ModField>
      <ModField label="Kombinierte Überschrift">
        <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
      </ModField>
      {items.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-4 space-y-3">
          <ModField label="Name">
            <input className={modularInputCls} value={row.name} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
          </ModField>
          <ModField label="Preis">
            <input className={modularInputCls} value={row.price} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))} />
          </ModField>
          <ModField label="Beschreibung">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <ModImagePick label="Bild" value={row.image} onChange={(url) => set(items.map((x, j) => (j === i ? { ...x, image: url } : x)))} uploadImage={uploadImage} />
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { name: '', price: '', description: '', image: '' }])}>
        + Gericht
      </button>
    </div>
  );
}

function FeaturedItemsForm({ data, onChange, uploadImage }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'uploadImage'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? {
              title: str((x as { title?: unknown }).title),
              price: str((x as { price?: unknown }).price),
              description: str((x as { description?: unknown }).description),
              image: str((x as { image?: { image?: string } }).image?.image),
            }
          : { title: '', price: '', description: '', image: '' },
      )
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({
        title: r.title,
        price: r.price,
        description: r.description,
        image: { image: r.image, alt: r.title },
      })),
    });
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <ModField label="Intro">
        <textarea className={modularInputCls} rows={2} value={str(data.description)} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      </ModField>
      {items.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-4 space-y-3">
          <ModField label="Titel">
            <input className={modularInputCls} value={row.title} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          </ModField>
          <ModField label="Preis">
            <input className={modularInputCls} value={row.price} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))} />
          </ModField>
          <ModField label="Beschreibung">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <ModImagePick label="Bild" value={row.image} onChange={(url) => set(items.map((x, j) => (j === i ? { ...x, image: url } : x)))} uploadImage={uploadImage} />
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { title: '', price: '', description: '', image: '' }])}>
        + Karte
      </button>
    </div>
  );
}

function GalleryGridForm({ data, onChange, uploadImage }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'uploadImage'>) {
  const imgs = Array.isArray(data.images)
    ? (data.images as unknown[]).map((x) => (x && typeof x === 'object' ? str((x as { image?: unknown }).image) : ''))
    : [];
  const set = (next: string[]) => onChange({ ...data, images: next.map((image) => ({ image, alt: '' })) });
  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-widest text-muted">Bilder</p>
      {imgs.map((u, i) => (
        <ModImagePick key={i} label={`Bild ${i + 1}`} value={u} onChange={(url) => set(imgs.map((x, j) => (j === i ? url : x)))} uploadImage={uploadImage} />
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...imgs, ''])}>
        + Bild
      </button>
    </div>
  );
}

function FaqForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <TextPairListForm
        data={data}
        onChange={onChange}
        keyItems="items"
        titleKey="question"
        descKey="answer"
        titleLabel="Frage"
        descLabel="Antwort"
      />
    </div>
  );
}

function TeaserListForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <ModField label="Einleitung">
        <textarea
          className={modularInputCls}
          rows={2}
          value={str(data.intro ?? data.description)}
          onChange={(e) => onChange({ ...data, intro: e.target.value })}
        />
      </ModField>
      <TextPairListForm
        data={data}
        onChange={onChange}
        keyItems="items"
        titleKey="title"
        descKey="description"
        titleLabel="Titel"
        descLabel="Beschreibung"
      />
    </div>
  );
}

function TimelineForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? {
              year: str((x as { yearOrMarker?: unknown }).yearOrMarker),
              title: str((x as { title?: unknown }).title),
              description: str((x as { description?: unknown }).description),
            }
          : { year: '', title: '', description: '' },
      )
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({ yearOrMarker: r.year, title: r.title, description: r.description })),
    });
  return (
    <div className="space-y-2">
      {items.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-3 space-y-2">
          <ModField label="Jahr / Marker">
            <input className={modularInputCls} value={row.year} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, year: e.target.value } : x)))} />
          </ModField>
          <ModField label="Titel">
            <input className={modularInputCls} value={row.title} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          </ModField>
          <ModField label="Text">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { year: '', title: '', description: '' }])}>
        + Meilenstein
      </button>
    </div>
  );
}

function TeamForm({ data, onChange, uploadImage }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'uploadImage'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? {
              name: str((x as { name?: unknown }).name),
              role: str((x as { role?: unknown }).role),
              description: str((x as { description?: unknown }).description),
              image: str((x as { image?: { image?: string } }).image?.image),
            }
          : { name: '', role: '', description: '', image: '' },
      )
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({
        name: r.name,
        role: r.role,
        description: r.description,
        image: { image: r.image, alt: r.name },
      })),
    });
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      {items.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-4 space-y-2">
          <ModField label="Name">
            <input className={modularInputCls} value={row.name} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
          </ModField>
          <ModField label="Rolle">
            <input className={modularInputCls} value={row.role} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, role: e.target.value } : x)))} />
          </ModField>
          <ModField label="Bio">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <ModImagePick label="Foto" value={row.image} onChange={(url) => set(items.map((x, j) => (j === i ? { ...x, image: url } : x)))} uploadImage={uploadImage} />
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { name: '', role: '', description: '', image: '' }])}>
        + Person
      </button>
    </div>
  );
}

function ExpertQuotesForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? {
              quote: str((x as { quote?: unknown }).quote),
              source: str((x as { source?: unknown }).source),
              year: str((x as { year?: unknown }).year),
            }
          : { quote: '', source: '', year: '' },
      )
    : [];
  const set = (next: typeof items) => onChange({ ...data, items: next });
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <div className="space-y-2">
        {items.map((row, i) => (
          <div key={i} className="border border-line rounded-xl p-3 space-y-2">
            <ModField label="Zitat">
              <textarea className={modularInputCls} rows={2} value={row.quote} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, quote: e.target.value } : x)))} />
            </ModField>
            <ModField label="Quelle">
              <input className={modularInputCls} value={row.source} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, source: e.target.value } : x)))} />
            </ModField>
            <ModField label="Jahr">
              <input className={modularInputCls} value={row.year} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, year: e.target.value } : x)))} />
            </ModField>
            <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
              Entfernen
            </button>
          </div>
        ))}
        <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { quote: '', source: '', year: '' }])}>
          + Zitat
        </button>
      </div>
    </div>
  );
}

function StoryFactsForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { label: str((x as { label?: unknown }).label), value: str((x as { value?: unknown }).value) }
          : { label: '', value: '' },
      )
    : [];
  const set = (next: typeof items) => onChange({ ...data, items: next });
  return (
    <div className="space-y-4">
      <ModField label="Fließtext">
        <textarea className={modularInputCls} rows={3} value={str(data.description)} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      </ModField>
      <p className="text-xs uppercase tracking-widest text-muted">Kennzahlen</p>
      {items.map((row, i) => (
        <div key={i} className="grid sm:grid-cols-2 gap-2 border border-line rounded-xl p-3">
          <ModField label="Label">
            <input className={modularInputCls} value={row.label} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
          </ModField>
          <ModField label="Wert">
            <input className={modularInputCls} value={row.value} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
          </ModField>
          <button type="button" className="text-xs text-rose-600 sm:col-span-2" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { label: '', value: '' }])}>
        + Zeile
      </button>
    </div>
  );
}

function ContactDetailsForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const fields = Array.isArray(data.additionalFormFields)
    ? (data.additionalFormFields as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? {
              fieldKey: str((x as { fieldKey?: unknown }).fieldKey),
              label: str((x as { label?: unknown }).label),
              fieldType: str((x as { fieldType?: unknown }).fieldType),
              required: bool((x as { required?: unknown }).required, false),
            }
          : { fieldKey: '', label: '', fieldType: 'text', required: false },
      )
    : [];
  const set = (next: typeof fields) =>
    onChange({
      ...data,
      additionalFormFields: next.map((f) => ({
        fieldKey: f.fieldKey,
        label: f.label,
        fieldType: f.fieldType,
        placeholder: '',
        required: f.required,
      })),
    });
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <ModField label="Untertitel">
        <textarea className={modularInputCls} rows={2} value={str(data.subline)} onChange={(e) => onChange({ ...data, subline: e.target.value })} />
      </ModField>
      <ModField label="Google-Maps-URL">
        <input className={modularInputCls} value={str(data.googleMapsUrl)} onChange={(e) => onChange({ ...data, googleMapsUrl: e.target.value })} />
      </ModField>
      <p className="text-xs uppercase tracking-widest text-muted">Zusätzliche Formularfelder</p>
      <p className="text-xs text-muted -mt-2">
        Optionaler Schlüssel (nur Kleinbuchstaben, Ziffern, Unterstrich). Leer lassen, dann wird er aus dem Label abgeleitet (z. B. „Anreisedatum“ → <code className="font-mono">anreisedatum</code>).
      </p>
      {fields.map((f, i) => (
        <div key={i} className="grid sm:grid-cols-2 gap-2 border border-line rounded-xl p-3 items-end">
          <ModField label="Schlüssel (optional)">
            <input
              className={modularInputCls}
              value={f.fieldKey}
              onChange={(e) => set(fields.map((x, j) => (j === i ? { ...x, fieldKey: e.target.value } : x)))}
              placeholder="z. B. gaeste_anzahl"
            />
          </ModField>
          <ModField label="Label">
            <input className={modularInputCls} value={f.label} onChange={(e) => set(fields.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
          </ModField>
          <ModField label="Feldtyp">
            <select
              className={modularInputCls}
              value={['text', 'email', 'tel', 'textarea', 'date'].includes(f.fieldType) ? f.fieldType : 'text'}
              onChange={(e) => set(fields.map((x, j) => (j === i ? { ...x, fieldType: e.target.value } : x)))}
            >
              <option value="text">Text</option>
              <option value="email">E-Mail</option>
              <option value="tel">Telefon</option>
              <option value="textarea">Textarea</option>
              <option value="date">Datum</option>
            </select>
          </ModField>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" checked={f.required} onChange={(e) => set(fields.map((x, j) => (j === i ? { ...x, required: e.target.checked } : x)))} />
            Pflichtfeld
          </label>
          <button type="button" className="text-xs text-rose-600 sm:col-span-2" onClick={() => set(fields.filter((_, j) => j !== i))}>
            Feld entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...fields, { fieldKey: '', label: '', fieldType: 'text', required: false }])}>
        + Formularfeld
      </button>
    </div>
  );
}

function LocationsModularForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  type LocRow = {
    name: string;
    phone: string;
    email: string;
    address: string;
    cityPostalCode: string;
    googleMapsUrl: string;
    hours: { days: string; time: string }[];
  };
  const locs: LocRow[] = Array.isArray(data.locations)
    ? (data.locations as unknown[]).map((x) => {
        if (!x || typeof x !== 'object')
          return {
            name: '',
            phone: '',
            email: '',
            address: '',
            cityPostalCode: '',
            googleMapsUrl: '',
            hours: [] as { days: string; time: string }[],
          };
        const o = x as Record<string, unknown>;
        const hoursRaw = Array.isArray(o.openingHours) ? o.openingHours : [];
        const hours = hoursRaw.map((h) =>
          h && typeof h === 'object'
            ? { days: str((h as { days?: unknown }).days), time: str((h as { time?: unknown }).time) }
            : { days: '', time: '' },
        );
        return {
          name: str(o.name),
          phone: str(o.phone),
          email: str(o.email),
          address: str(o.address),
          cityPostalCode: str(o.cityPostalCode ?? o.city),
          googleMapsUrl: str(o.googleMapsUrl ?? o.mapsUrl),
          hours,
        };
      })
    : [];
  const set = (next: LocRow[]) =>
    onChange({
      ...data,
      locations: next.map((l) => ({
        name: l.name,
        phone: l.phone,
        email: l.email,
        address: l.address,
        cityPostalCode: l.cityPostalCode,
        googleMapsUrl: l.googleMapsUrl,
        openingHours: l.hours.map((h) => ({ days: h.days, time: h.time })),
      })),
    });
  return (
    <div className="space-y-4">
      {locs.map((loc, i) => (
        <div key={i} className="border border-line rounded-xl p-4 space-y-3">
          <ModField label="Name">
            <input className={modularInputCls} value={loc.name} onChange={(e) => set(locs.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
          </ModField>
          <div className="grid sm:grid-cols-2 gap-3">
            <ModField label="Telefon">
              <input className={modularInputCls} value={loc.phone} onChange={(e) => set(locs.map((x, j) => (j === i ? { ...x, phone: e.target.value } : x)))} />
            </ModField>
            <ModField label="E-Mail">
              <input className={modularInputCls} value={loc.email} onChange={(e) => set(locs.map((x, j) => (j === i ? { ...x, email: e.target.value } : x)))} />
            </ModField>
            <ModField label="Adresse">
              <input className={modularInputCls} value={loc.address} onChange={(e) => set(locs.map((x, j) => (j === i ? { ...x, address: e.target.value } : x)))} />
            </ModField>
            <ModField label="PLZ / Ort">
              <input className={modularInputCls} value={loc.cityPostalCode} onChange={(e) => set(locs.map((x, j) => (j === i ? { ...x, cityPostalCode: e.target.value } : x)))} />
            </ModField>
          </div>
          <ModField label="Google-Maps-URL">
            <input className={modularInputCls} value={loc.googleMapsUrl} onChange={(e) => set(locs.map((x, j) => (j === i ? { ...x, googleMapsUrl: e.target.value } : x)))} />
          </ModField>
          <p className="text-xs uppercase tracking-widest text-muted">Öffnungszeiten</p>
          {loc.hours.map((h, hi) => (
            <div key={hi} className="grid sm:grid-cols-2 gap-2">
              <input
                className={modularInputCls}
                placeholder="Tage"
                value={h.days}
                onChange={(e) =>
                  set(
                    locs.map((x, j) =>
                      j === i
                        ? {
                            ...x,
                            hours: x.hours.map((y, k) => (k === hi ? { ...y, days: e.target.value } : y)),
                          }
                        : x,
                    ),
                  )
                }
              />
              <div className="flex gap-2">
                <input
                  className={modularInputCls}
                  placeholder="Uhrzeit"
                  value={h.time}
                  onChange={(e) =>
                    set(
                      locs.map((x, j) =>
                        j === i
                          ? {
                              ...x,
                              hours: x.hours.map((y, k) => (k === hi ? { ...y, time: e.target.value } : y)),
                            }
                          : x,
                      ),
                    )
                  }
                />
                <button
                  type="button"
                  className="h-10 w-10 rounded-lg border border-line shrink-0"
                  onClick={() =>
                    set(
                      locs.map((x, j) => (j === i ? { ...x, hours: x.hours.filter((_, k) => k !== hi) } : x)),
                    )
                  }
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn-outline !py-2 !px-3 text-xs"
            onClick={() => set(locs.map((x, j) => (j === i ? { ...x, hours: [...x.hours, { days: '', time: '' }] } : x)))}
          >
            + Öffnungszeit
          </button>
          <button type="button" className="text-xs text-rose-600" onClick={() => set(locs.filter((_, j) => j !== i))}>
            Standort entfernen
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn-outline !py-2 !px-3 text-xs"
        onClick={() =>
          set([
            ...locs,
            { name: '', phone: '', email: '', address: '', cityPostalCode: '', googleMapsUrl: '', hours: [] },
          ])
        }
      >
        + Standort
      </button>
    </div>
  );
}

function DirectionsForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <ModField label="Eyebrow">
          <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </ModField>
        <ModField label="Überschrift">
          <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
        </ModField>
      </div>
      <ModField label="Untertitel">
        <textarea className={modularInputCls} rows={2} value={str(data.subline)} onChange={(e) => onChange({ ...data, subline: e.target.value })} />
      </ModField>
      <TextPairListForm
        data={data}
        onChange={onChange}
        keyItems="items"
        titleKey="title"
        descKey="description"
        titleLabel="Titel"
        descLabel="Beschreibung"
      />
    </div>
  );
}

function UnsupportedSection({ sectionType }: { sectionType: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
      <p className="font-medium">Formular für „{sectionType}“ ist noch nicht angebunden.</p>
      <p className="mt-2 text-xs leading-relaxed">
        Für diesen Sektionstyp ist hier noch kein Formular hinterlegt. Gleiche Inhalte ggf. in anderen Bereichen dieses Admins
        bearbeiten, falls dort Felder dafür existieren.
      </p>
    </div>
  );
}

export function ModularSectionDataForm(props: ModularSectionDataFormProps) {
  const { sectionType, data, onChange, tpl, uploadImage, modularPage, siteContent, onPatchSiteContent } = props;
  switch (sectionType) {
    case 'noticeBanner':
      if (modularPage && siteContent && onPatchSiteContent) {
        return <NoticeBannerSubpageForm page={modularPage} content={siteContent} onPatch={onPatchSiteContent} />;
      }
      return <NoticeBannerForm data={data} onChange={onChange} />;
    case 'hero':
      return <HeroForm {...props} />;
    case 'cta':
      return <CtaBandForm data={data} onChange={onChange} tpl={tpl} />;
    case 'actionBar':
      return <ActionBarForm data={data} onChange={onChange} tpl={tpl} />;
    case 'marqueeBand':
      return <MarqueeForm data={data} onChange={onChange} />;
    case 'statsBand':
      return <StatsBandForm data={data} onChange={onChange} />;
    case 'testimonials':
      return <TestimonialsBlockForm data={data} onChange={onChange} />;
    case 'labelBand':
      return <LabelBandForm data={data} onChange={onChange} />;
    case 'newsTeaser':
      return <NewsTeaserForm data={data} onChange={onChange} tpl={tpl} />;
    case 'highlightsBar':
      return <TextPairListForm data={data} onChange={onChange} keyItems="items" titleKey="title" descKey="description" titleLabel="Titel" descLabel="Text" />;
    case 'steps':
      return <HeadingTextPairListForm data={data} onChange={onChange} titleLabel="Schritt" descLabel="Beschreibung" fallbackEyebrow="Ablauf" />;
    case 'faq':
      return <FaqForm data={data} onChange={onChange} />;
    case 'teaserList':
      return <TeaserListForm data={data} onChange={onChange} />;
    case 'timeline':
      return <TimelineForm data={data} onChange={onChange} />;
    case 'team':
      return <TeamForm data={data} onChange={onChange} uploadImage={uploadImage} />;
    case 'trainers':
      return <TeamForm data={data} onChange={onChange} uploadImage={uploadImage} />;
    case 'expertQuotes':
      return <ExpertQuotesForm data={data} onChange={onChange} />;
    case 'storyFacts':
      return <StoryFactsForm data={data} onChange={onChange} />;
    case 'storyTeaser':
      return <StoryTeaserForm data={data} onChange={onChange} tpl={tpl} uploadImage={uploadImage} />;
    case 'galleryPreview':
      return <GalleryPreviewForm data={data} onChange={onChange} tpl={tpl} uploadImage={uploadImage} />;
    case 'featuredDishesGrid':
      return <FeaturedGridForm data={data} onChange={onChange} uploadImage={uploadImage} />;
    case 'featuredDishes':
      return <FeaturedDishesBoldForm data={data} onChange={onChange} uploadImage={uploadImage} />;
    case 'featuredItems':
      return <FeaturedItemsForm data={data} onChange={onChange} uploadImage={uploadImage} />;
    case 'gallery':
      return <GalleryGridForm data={data} onChange={onChange} uploadImage={uploadImage} />;
    case 'contactDetails':
      return <ContactDetailsForm data={data} onChange={onChange} />;
    case 'locations':
      return <LocationsModularForm data={data} onChange={onChange} />;
    case 'directions':
      return <DirectionsForm data={data} onChange={onChange} />;
    default: {
      const extra = extendedModularSectionForm(props);
      if (extra) return extra;
      return <UnsupportedSection sectionType={sectionType} />;
    }
  }
}

export type { ModularSectionDataFormProps } from './modular-section-types';
