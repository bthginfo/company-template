/**
 * Additional modular section editors (blueprint types not covered in ModularSectionDataForm core switch).
 */

import type { ReactNode } from 'react';
import type { ModularSectionDataFormProps } from './modular-section-types';
import {
  ModField,
  ModImagePick,
  ModLinkTarget,
  modularInputCls,
  patchButton,
  readButton,
} from './modular-section-field-kit';

function str(v: unknown): string {
  return typeof v === 'string' ? v : v == null ? '' : String(v);
}

function bool(v: unknown, def: boolean): boolean {
  if (typeof v === 'boolean') return v;
  return def;
}

function num(v: unknown, fallback: number): number {
  if (typeof v === 'number' && !Number.isNaN(v)) return v;
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) ? n : fallback;
}

function imgUrl(img: unknown): string {
  if (!img || typeof img !== 'object') return '';
  return typeof (img as { image?: unknown }).image === 'string' ? String((img as { image: string }).image) : '';
}

/** items: { text }[] — keywordBand, testimonialMarquee, marquee-style bands */
function ItemsTextLinesForm({ data, onChange, label }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'> & { label: string }) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) => (x && typeof x === 'object' ? str((x as { text?: unknown }).text) : ''))
    : [];
  const set = (next: string[]) => onChange({ ...data, items: next.map((text) => ({ text })) });
  return (
    <ModField label={label}>
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
          + Zeile
        </button>
      </div>
    </ModField>
  );
}

function ProcessColumnsForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { title: str((x as { title?: unknown }).title), description: str((x as { description?: unknown }).description) }
          : { title: '', description: '' },
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
      <ModField label="Einleitung">
        <textarea className={modularInputCls} rows={2} value={str(data.description)} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      </ModField>
      {items.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-3 space-y-2">
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
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { title: '', description: '' }])}>
        + Eintrag
      </button>
    </div>
  );
}

function ServiceCardsSectionForm({ data, onChange, tpl, uploadImage }: ModularSectionDataFormProps) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) => {
        if (!x || typeof x !== 'object') return { title: '', description: '', image: '', tags: '', btnLabel: '', btnHref: '', hasSubpage: false };
        const o = x as Record<string, unknown>;
        const btn = readButton(o, 'button');
        const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
        return {
          title: str(o.title),
          description: str(o.description) || str(o.meta),
          image: imgUrl(o.image),
          tags: str(o.tags),
          btnLabel: str(btn.label),
          btnHref: href,
          hasSubpage: bool(o.hasSubpage, false),
        };
      })
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({
        title: r.title,
        description: r.description,
        tags: r.tags,
        image: { image: r.image, alt: r.title },
        hasSubpage: r.hasSubpage,
        subpage: {},
        button: {
          label: r.btnLabel,
          linkType: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? 'external' : 'internal',
          internalPage: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? '' : r.btnHref,
          externalUrl: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? r.btnHref : '',
        },
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
          <ModField label="Beschreibung">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <ModField label="Tags">
            <input className={modularInputCls} value={row.tags} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, tags: e.target.value } : x)))} />
          </ModField>
          <ModImagePick label="Bild" value={row.image} onChange={(url) => set(items.map((x, j) => (j === i ? { ...x, image: url } : x)))} uploadImage={uploadImage} />
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={row.hasSubpage} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, hasSubpage: e.target.checked } : x)))} />
            <span>Eigene Unterseite</span>
          </label>
          <ModField label="Button-Text">
            <input className={modularInputCls} value={row.btnLabel} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, btnLabel: e.target.value } : x)))} />
          </ModField>
          <ModLinkTarget
            label="Button-Ziel"
            tpl={tpl}
            value={row.btnHref}
            onChange={(v) => set(items.map((x, j) => (j === i ? { ...x, btnHref: v } : x)))}
          />
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { title: '', description: '', image: '', tags: '', btnLabel: '', btnHref: '', hasSubpage: false }])}>
        + Karte
      </button>
    </div>
  );
}

function RoomCardsSectionForm({ data, onChange, tpl, uploadImage }: ModularSectionDataFormProps) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) => {
        if (!x || typeof x !== 'object') return { title: '', subtitle: '', description: '', image: '', price: '', priceSuffix: '', feats: '', btnLabel: '', btnHref: '' };
        const o = x as Record<string, unknown>;
        const featsRaw = o.features;
        const feats = Array.isArray(featsRaw)
          ? (featsRaw as unknown[]).map((f) => (f && typeof f === 'object' ? str((f as { text?: unknown }).text) : '')).filter(Boolean).join('\n')
          : '';
        const btn = readButton(o, 'button');
        const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
        return {
          title: str(o.title),
          subtitle: str(o.subtitle),
          description: str(o.description),
          image: imgUrl(o.image),
          price: str(o.price),
          priceSuffix: str(o.priceSuffix),
          feats,
          btnLabel: str(btn.label),
          btnHref: href,
        };
      })
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({
        title: r.title,
        subtitle: r.subtitle,
        description: r.description,
        image: { image: r.image, alt: r.title },
        price: r.price,
        priceSuffix: r.priceSuffix,
        features: r.feats.split('\n').filter(Boolean).map((text) => ({ text })),
        button: {
          label: r.btnLabel,
          linkType: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? 'external' : 'internal',
          internalPage: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? '' : r.btnHref,
          externalUrl: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? r.btnHref : '',
        },
        hasSubpage: false,
        subpage: {},
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
          <ModField label="Untertitel (z. B. Größe)">
            <input className={modularInputCls} value={row.subtitle} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, subtitle: e.target.value } : x)))} />
          </ModField>
          <ModField label="Beschreibung">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <div className="grid sm:grid-cols-2 gap-3">
            <ModField label="Preis">
              <input className={modularInputCls} value={row.price} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))} />
            </ModField>
            <ModField label="Preis-Zusatz">
              <input className={modularInputCls} value={row.priceSuffix} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, priceSuffix: e.target.value } : x)))} />
            </ModField>
          </div>
          <ModField label="Merkmale (eine Zeile pro Bullet)">
            <textarea className={modularInputCls} rows={3} value={row.feats} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, feats: e.target.value } : x)))} />
          </ModField>
          <ModImagePick label="Bild" value={row.image} onChange={(url) => set(items.map((x, j) => (j === i ? { ...x, image: url } : x)))} uploadImage={uploadImage} />
          <ModField label="Button-Text">
            <input className={modularInputCls} value={row.btnLabel} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, btnLabel: e.target.value } : x)))} />
          </ModField>
          <ModLinkTarget label="Button-Ziel" tpl={tpl} value={row.btnHref} onChange={(v) => set(items.map((x, j) => (j === i ? { ...x, btnHref: v } : x)))} />
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { title: '', subtitle: '', description: '', image: '', price: '', priceSuffix: '', feats: '', btnLabel: '', btnHref: '' }])}>
        + Zimmer / Angebot
      </button>
    </div>
  );
}

function PricingPackagesSectionForm({ data, onChange, tpl, uploadImage: _uploadImage }: ModularSectionDataFormProps) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) => {
        if (!x || typeof x !== 'object') return { title: '', badge: '', price: '', priceSuffix: '', description: '', feats: '', btnLabel: '', btnHref: '', highlight: false };
        const o = x as Record<string, unknown>;
        const featsRaw = o.features;
        const feats = Array.isArray(featsRaw)
          ? (featsRaw as unknown[]).map((f) => (f && typeof f === 'object' ? str((f as { text?: unknown }).text) : '')).filter(Boolean).join('\n')
          : '';
        const btn = readButton(o, 'button');
        const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
        return {
          title: str(o.title),
          badge: str(o.badge),
          price: str(o.price),
          priceSuffix: str(o.priceSuffix),
          description: str(o.description),
          feats,
          btnLabel: str(btn.label),
          btnHref: href,
          highlight: bool(o.isHighlighted, false),
        };
      })
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({
        title: r.title,
        badge: r.badge,
        price: r.price,
        priceSuffix: r.priceSuffix,
        description: r.description,
        features: r.feats.split('\n').filter(Boolean).map((text) => ({ text })),
        isHighlighted: r.highlight,
        styleVariant: 'light',
        image: { image: '', alt: '' },
        button: {
          label: r.btnLabel,
          linkType: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? 'external' : 'internal',
          internalPage: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? '' : r.btnHref,
          externalUrl: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? r.btnHref : '',
        },
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
          <ModField label="Paketname">
            <input className={modularInputCls} value={row.title} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          </ModField>
          <ModField label="Badge">
            <input className={modularInputCls} value={row.badge} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, badge: e.target.value } : x)))} />
          </ModField>
          <div className="grid sm:grid-cols-2 gap-3">
            <ModField label="Preis">
              <input className={modularInputCls} value={row.price} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))} />
            </ModField>
            <ModField label="Preis-Zusatz (z. B. /Monat)">
              <input className={modularInputCls} value={row.priceSuffix} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, priceSuffix: e.target.value } : x)))} />
            </ModField>
          </div>
          <ModField label="Beschreibung">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <ModField label="Leistungen (eine Zeile pro Punkt)">
            <textarea className={modularInputCls} rows={3} value={row.feats} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, feats: e.target.value } : x)))} />
          </ModField>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={row.highlight} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, highlight: e.target.checked } : x)))} />
            <span>Hervorheben</span>
          </label>
          <ModField label="Button-Text">
            <input className={modularInputCls} value={row.btnLabel} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, btnLabel: e.target.value } : x)))} />
          </ModField>
          <ModLinkTarget label="Button-Ziel" tpl={tpl} value={row.btnHref} onChange={(v) => set(items.map((x, j) => (j === i ? { ...x, btnHref: v } : x)))} />
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn-outline !py-2 !px-3 text-xs"
        onClick={() =>
          set([...items, { title: '', badge: '', price: '', priceSuffix: '', description: '', feats: '', btnLabel: '', btnHref: '', highlight: false }])
        }
      >
        + Paket
      </button>
    </div>
  );
}

function StickyEmergencyForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  return (
    <div className="space-y-4">
      <ModField label="Telefon">
        <input className={modularInputCls} value={str(data.phone)} onChange={(e) => onChange({ ...data, phone: e.target.value })} />
      </ModField>
      <ModField label="Kurzlabel">
        <input className={modularInputCls} value={str(data.label)} onChange={(e) => onChange({ ...data, label: e.target.value })} />
      </ModField>
      <ModField label="Überschrift">
        <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
      </ModField>
      <ModField label="Unterzeile">
        <textarea className={modularInputCls} rows={2} value={str(data.subline)} onChange={(e) => onChange({ ...data, subline: e.target.value })} />
      </ModField>
    </div>
  );
}

function FundingCalculatorForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const programs = Array.isArray(data.programs)
    ? (data.programs as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { title: str((x as { title?: unknown }).title), description: str((x as { description?: unknown }).description), percentage: str((x as { percentage?: unknown }).percentage) }
          : { title: '', description: '', percentage: '' },
      )
    : [];
  const setProg = (next: typeof programs) => onChange({ ...data, programs: next });
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <ModField label="Min. Investition (€)">
          <input type="number" className={modularInputCls} value={num(data.investmentMin, 0) || ''} onChange={(e) => onChange({ ...data, investmentMin: e.target.value })} />
        </ModField>
        <ModField label="Max. Investition (€)">
          <input type="number" className={modularInputCls} value={num(data.investmentMax, 0) || ''} onChange={(e) => onChange({ ...data, investmentMax: e.target.value })} />
        </ModField>
        <ModField label="Schritt (€)">
          <input type="number" className={modularInputCls} value={num(data.investmentStep, 0) || ''} onChange={(e) => onChange({ ...data, investmentStep: e.target.value })} />
        </ModField>
        <ModField label="Standardwert (€)">
          <input type="number" className={modularInputCls} value={num(data.investmentDefault, 0) || ''} onChange={(e) => onChange({ ...data, investmentDefault: e.target.value })} />
        </ModField>
      </div>
      <p className="text-xs uppercase tracking-widest text-muted">Programme / Förderstufen</p>
      {programs.map((p, i) => (
        <div key={i} className="border border-line rounded-xl p-3 space-y-2">
          <ModField label="Titel">
            <input className={modularInputCls} value={p.title} onChange={(e) => setProg(programs.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          </ModField>
          <ModField label="Beschreibung">
            <textarea className={modularInputCls} rows={2} value={p.description} onChange={(e) => setProg(programs.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <ModField label="Prozent / Anteil">
            <input className={modularInputCls} value={p.percentage} onChange={(e) => setProg(programs.map((x, j) => (j === i ? { ...x, percentage: e.target.value } : x)))} />
          </ModField>
          <button type="button" className="text-xs text-rose-600" onClick={() => setProg(programs.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => setProg([...programs, { title: '', description: '', percentage: '' }])}>
        + Programm
      </button>
    </div>
  );
}

function BrandLogosForm({ data, onChange, uploadImage }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'uploadImage'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { name: str((x as { name?: unknown }).name), logo: imgUrl((x as { logo?: unknown }).logo), link: str((x as { link?: unknown }).link) }
          : { name: '', logo: '', link: '' },
      )
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({ name: r.name, logo: { image: r.logo, alt: r.name }, link: r.link })),
    });
  return (
    <div className="space-y-3">
      {items.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-3 space-y-2">
          <ModField label="Name / Marke">
            <input className={modularInputCls} value={row.name} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
          </ModField>
          <ModImagePick label="Logo" value={row.logo} onChange={(url) => set(items.map((x, j) => (j === i ? { ...x, logo: url } : x)))} uploadImage={uploadImage} ratio="aspect-square" />
          <ModField label="Link (optional)">
            <input className={modularInputCls} value={row.link} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, link: e.target.value } : x)))} placeholder="https://…" />
          </ModField>
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { name: '', logo: '', link: '' }])}>
        + Logo
      </button>
    </div>
  );
}

function FeatureImageSingleForm({ data, onChange, uploadImage }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'uploadImage'>) {
  const url = imgUrl(data.image);
  return (
    <ModImagePick
      label="Großes Bild"
      value={url}
      onChange={(v) => onChange({ ...data, image: { image: v, alt: str(data.alt) } })}
      uploadImage={uploadImage}
    />
  );
}

function StorySplitForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  return (
    <div className="space-y-4">
      <ModField label="Eyebrow">
        <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
      </ModField>
      <ModField label="Überschrift">
        <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
      </ModField>
      <ModField label="Text">
        <textarea className={modularInputCls} rows={5} value={str(data.description)} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      </ModField>
    </div>
  );
}

function QuoteWallForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { name: str((x as { name?: unknown }).name), quote: str((x as { quote?: unknown }).quote) }
          : { name: '', quote: '' },
      )
    : [];
  const set = (next: typeof items) => onChange({ ...data, items: next });
  return (
    <div className="space-y-3">
      {items.map((r, i) => (
        <div key={i} className="border border-line rounded-xl p-3 space-y-2">
          <ModField label="Name">
            <input className={modularInputCls} value={r.name} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
          </ModField>
          <ModField label="Zitat">
            <textarea className={modularInputCls} rows={2} value={r.quote} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, quote: e.target.value } : x)))} />
          </ModField>
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { name: '', quote: '' }])}>
        + Zitat
      </button>
    </div>
  );
}

function CategoryCardsForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { title: str((x as { title?: unknown }).title), description: str((x as { description?: unknown }).description) }
          : { title: '', description: '' },
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
      {items.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-3 space-y-2">
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
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { title: '', description: '' }])}>
        + Kategorie
      </button>
    </div>
  );
}

function TopicBandForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { title: str((x as { title?: unknown }).title), meta: str((x as { meta?: unknown }).meta), description: str((x as { description?: unknown }).description) }
          : { title: '', meta: '', description: '' },
      )
    : [];
  const set = (next: typeof items) => onChange({ ...data, items: next });
  return (
    <div className="space-y-4">
      <ModField label="Überschrift">
        <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
      </ModField>
      <ModField label="Unterzeile">
        <textarea className={modularInputCls} rows={2} value={str(data.subline)} onChange={(e) => onChange({ ...data, subline: e.target.value })} />
      </ModField>
      <ModField label="Telefon">
        <input className={modularInputCls} value={str(data.phone)} onChange={(e) => onChange({ ...data, phone: e.target.value })} />
      </ModField>
      {items.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-3 space-y-2">
          <ModField label="Titel">
            <input className={modularInputCls} value={row.title} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          </ModField>
          <ModField label="Meta">
            <input className={modularInputCls} value={row.meta} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, meta: e.target.value } : x)))} />
          </ModField>
          <ModField label="Beschreibung">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { title: '', meta: '', description: '' }])}>
        + Thema
      </button>
    </div>
  );
}

function TopicCardsForm({ data, onChange, tpl, uploadImage }: ModularSectionDataFormProps) {
  const items = Array.isArray(data.items)
    ? (data.items as unknown[]).map((x) => {
        if (!x || typeof x !== 'object') return { title: '', description: '', image: '', btnLabel: '', btnHref: '' };
        const o = x as Record<string, unknown>;
        const btn = readButton(o, 'button');
        const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
        return { title: str(o.title), description: str(o.description), image: imgUrl(o.image), btnLabel: str(btn.label), btnHref: href };
      })
    : [];
  const set = (next: typeof items) =>
    onChange({
      ...data,
      items: next.map((r) => ({
        title: r.title,
        description: r.description,
        image: { image: r.image, alt: r.title },
        button: {
          label: r.btnLabel,
          linkType: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? 'external' : 'internal',
          internalPage: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? '' : r.btnHref,
          externalUrl: r.btnHref.startsWith('http') || r.btnHref.startsWith('mailto:') || r.btnHref.startsWith('tel:') ? r.btnHref : '',
        },
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
        <div key={i} className="border border-line rounded-xl p-4 space-y-3">
          <ModField label="Titel">
            <input className={modularInputCls} value={row.title} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          </ModField>
          <ModField label="Text">
            <textarea className={modularInputCls} rows={2} value={row.description} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
          </ModField>
          <ModImagePick label="Bild" value={row.image} onChange={(url) => set(items.map((x, j) => (j === i ? { ...x, image: url } : x)))} uploadImage={uploadImage} />
          <ModField label="Button">
            <input className={modularInputCls} value={row.btnLabel} onChange={(e) => set(items.map((x, j) => (j === i ? { ...x, btnLabel: e.target.value } : x)))} />
          </ModField>
          <ModLinkTarget label="Button-Ziel" tpl={tpl} value={row.btnHref} onChange={(v) => set(items.map((x, j) => (j === i ? { ...x, btnHref: v } : x)))} />
          <button type="button" className="text-xs text-rose-600" onClick={() => set(items.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => set([...items, { title: '', description: '', image: '', btnLabel: '', btnHref: '' }])}>
        + Karte
      </button>
    </div>
  );
}

function TrainingPlanOverviewForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  const stats = Array.isArray(data.stats)
    ? (data.stats as unknown[]).map((x) =>
        x && typeof x === 'object'
          ? { value: str((x as { value?: unknown }).value), description: str((x as { description?: unknown }).description) }
          : { value: '', description: '' },
      )
    : [];
  const setStats = (next: typeof stats) => onChange({ ...data, stats: next });
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
      <p className="text-xs uppercase tracking-widest text-muted">Kennzahlen</p>
      {stats.map((s, i) => (
        <div key={i} className="grid sm:grid-cols-2 gap-2">
          <input className={modularInputCls} placeholder="Wert" value={s.value} onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
          <input className={modularInputCls} placeholder="Label" value={s.description} onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => setStats([...stats, { value: '', description: '' }])}>
        + Kennzahl
      </button>
      <p className="text-xs text-muted">Die Kurs-Karten darunter bearbeiten Sie im Block „Kurs-Karten“ (classCards).</p>
    </div>
  );
}

function ProgramTableForm({ data, onChange, tpl }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'tpl'>) {
  const rows = Array.isArray(data.rows)
    ? (data.rows as unknown[]).map((x) =>
        x && typeof x === 'object' ? { ...x } as Record<string, string> : {},
      )
    : [];
  const keys = ['programTitle', 'level', 'time', 'trainer', 'note'] as const;
  const setRows = (next: Record<string, string>[]) => onChange({ ...data, rows: next });
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
      {rows.map((row, i) => (
        <div key={i} className="border border-line rounded-xl p-3 space-y-2">
          {keys.map((k) => (
            <ModField key={k} label={k}>
              <input
                className={modularInputCls}
                value={str(row[k])}
                onChange={(e) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: e.target.value } : r)))}
              />
            </ModField>
          ))}
          <button type="button" className="text-xs text-rose-600" onClick={() => setRows(rows.filter((_, j) => j !== i))}>
            Zeile entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => setRows([...rows, Object.fromEntries(keys.map((k) => [k, '']))])}>
        + Zeile
      </button>
      <ModField label="Button-Text (unten)">
        <input className={modularInputCls} value={str(readButton(data, 'button').label)} onChange={(e) => onChange(patchButton(data, 'button', { label: e.target.value }))} />
      </ModField>
      <ModLinkTarget
        label="Button-Ziel"
        tpl={tpl}
        value={readButton(data, 'button').linkType === 'external' ? str(readButton(data, 'button').externalUrl) : str(readButton(data, 'button').internalPage)}
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

/** Public entry: returns null when this module has no editor for the type. */
export function extendedModularSectionForm(props: ModularSectionDataFormProps): ReactNode {
  const { sectionType, data, onChange, tpl, uploadImage } = props;
  switch (sectionType) {
    case 'keywordBand':
    case 'testimonialMarquee':
      return <ItemsTextLinesForm data={data} onChange={onChange} label="Zeilen / Wörter" />;
    case 'processTextColumns':
    case 'processCards':
      return <ProcessColumnsForm data={data} onChange={onChange} />;
    case 'serviceCards':
    case 'featuredServices':
    case 'serviceList':
    case 'featuredLooks':
    case 'featuredLooksBand':
    case 'tourOverviewCards':
    case 'tourOverviewList':
    case 'serviceOverviewCards':
    case 'serviceOverviewList':
    case 'featuredAreas':
    case 'roomSelection':
    case 'tourSchedule':
    case 'tourSelection':
    case 'classCards':
    case 'accommodationsGrid':
    case 'accommodationList':
      return <ServiceCardsSectionForm {...props} />;
    case 'roomCards':
    case 'tourCards':
      return <RoomCardsSectionForm {...props} />;
    case 'pricingPackages':
      return <PricingPackagesSectionForm {...props} />;
    case 'stickyEmergencyBanner':
      return <StickyEmergencyForm data={data} onChange={onChange} />;
    case 'fundingCalculator':
      return <FundingCalculatorForm data={data} onChange={onChange} />;
    case 'brandLogos':
      return <BrandLogosForm data={data} onChange={onChange} uploadImage={uploadImage} />;
    case 'featureImage':
      return <FeatureImageSingleForm data={data} onChange={onChange} uploadImage={uploadImage} />;
    case 'storySplit':
    case 'storyImageSplit':
      return <StorySplitForm data={data} onChange={onChange} />;
    case 'quoteWall':
      return <QuoteWallForm data={data} onChange={onChange} />;
    case 'categoryCards':
      return <CategoryCardsForm data={data} onChange={onChange} />;
    case 'topicBand':
      return <TopicBandForm data={data} onChange={onChange} />;
    case 'topicCards':
      return <TopicCardsForm {...props} />;
    case 'ctaBand':
      return <CtaBandDuplicate {...props} />;
    case 'trainingPlanOverview':
      return <TrainingPlanOverviewForm data={data} onChange={onChange} />;
    case 'programTable':
      return <ProgramTableForm data={data} onChange={onChange} tpl={tpl} />;
    case 'newsHighlightList':
      return <NewsHighlightForm {...props} />;
    case 'contactPreview':
      return <ContactPreviewForm {...props} />;
    case 'serviceInfo':
    case 'appointmentBooking':
      return <ProcessColumnsForm data={data} onChange={onChange} />;
    case 'qualifications':
      return <ProcessColumnsForm data={data} onChange={onChange} />;
    default:
      return null;
  }
}

function CtaBandDuplicate({ data, onChange, tpl }: Pick<ModularSectionDataFormProps, 'data' | 'onChange' | 'tpl'>) {
  const btn = readButton(data, 'button');
  const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <ModField label="Eyebrow">
        <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
      </ModField>
      <ModField label="Überschrift">
        <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
      </ModField>
      <ModField label="Untertitel" hint="Bold-CTA-Band">
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

function NewsHighlightForm({ data, onChange, tpl, uploadImage }: ModularSectionDataFormProps) {
  const img = typeof (data.featuredImage as { image?: unknown } | undefined)?.image === 'string' ? String((data.featuredImage as { image: string }).image) : '';
  const posts = Array.isArray(data.posts)
    ? (data.posts as unknown[]).map((x) => {
        if (!x || typeof x !== 'object') return { date: '', title: '', excerpt: '', href: '' };
        const o = x as Record<string, unknown>;
        const btn = readButton(o, 'button');
        const href = btn.linkType === 'external' ? str(btn.externalUrl) : str(btn.internalPage);
        return { date: str(o.date), title: str(o.title), excerpt: str(o.excerpt), href };
      })
    : [];
  const setPosts = (next: typeof posts) =>
    onChange({
      ...data,
      posts: next.map((p) => ({
        date: p.date,
        title: p.title,
        excerpt: p.excerpt,
        button: { label: 'Mehr', linkType: p.href.startsWith('http') ? 'external' : 'internal', internalPage: p.href.startsWith('http') ? '' : p.href, externalUrl: p.href.startsWith('http') ? p.href : '' },
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
      <ModImagePick label="Teaser-Bild" value={img} onChange={(v) => onChange({ ...data, featuredImage: { image: v, alt: '' } })} uploadImage={uploadImage} />
      {posts.map((p, i) => (
        <div key={i} className="border border-line rounded-xl p-3 space-y-2">
          <ModField label="Datum">
            <input className={modularInputCls} value={p.date} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, date: e.target.value } : x)))} />
          </ModField>
          <ModField label="Titel">
            <input className={modularInputCls} value={p.title} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          </ModField>
          <ModField label="Auszug">
            <textarea className={modularInputCls} rows={2} value={p.excerpt} onChange={(e) => setPosts(posts.map((x, j) => (j === i ? { ...x, excerpt: e.target.value } : x)))} />
          </ModField>
          <ModLinkTarget label="Link" tpl={tpl} value={p.href} onChange={(v) => setPosts(posts.map((x, j) => (j === i ? { ...x, href: v } : x)))} />
          <button type="button" className="text-xs text-rose-600" onClick={() => setPosts(posts.filter((_, j) => j !== i))}>
            Entfernen
          </button>
        </div>
      ))}
      <button type="button" className="btn-outline !py-2 !px-3 text-xs" onClick={() => setPosts([...posts, { date: '', title: '', excerpt: '', href: '' }])}>
        + Beitrag
      </button>
    </div>
  );
}

function ContactPreviewForm({ data, onChange }: Pick<ModularSectionDataFormProps, 'data' | 'onChange'>) {
  return (
    <div className="space-y-3">
      <ModField label="Eyebrow">
        <input className={modularInputCls} value={str(data.eyebrow)} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
      </ModField>
      <ModField label="Überschrift">
        <input className={modularInputCls} value={str(data.headline)} onChange={(e) => onChange({ ...data, headline: e.target.value })} />
      </ModField>
      <ModField label="Text">
        <textarea className={modularInputCls} rows={3} value={str(data.description)} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      </ModField>
    </div>
  );
}
