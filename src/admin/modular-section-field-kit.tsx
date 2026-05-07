import { useState } from 'react';
import type { SiteContent, TemplateKey } from '@/lib/types';
import { humanizeUploadError, assertValidUpload, UPLOAD_HINT } from './upload-limits';

export const modularInputCls =
  'w-full bg-[#f6f6f3] rounded-xl px-4 py-2.5 border border-line focus:border-brand focus:bg-white outline-none transition text-sm';

export type ModularUploadFn = (file: File) => Promise<string>;

export function ModField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted mb-1.5">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-muted mt-1">{hint}</span> : null}
    </label>
  );
}

export function ModImagePick({
  label,
  value,
  onChange,
  uploadImage,
  ratio = 'aspect-[4/3]',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  uploadImage?: ModularUploadFn;
  ratio?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onPick = async (file: File) => {
    if (!uploadImage) return;
    setError(null);
    setBusy(true);
    try {
      assertValidUpload(file);
      const url = await uploadImage(file);
      onChange(url);
    } catch (e: unknown) {
      setError(humanizeUploadError(e));
    } finally {
      setBusy(false);
    }
  };
  return (
    <ModField label={label} hint={uploadImage ? UPLOAD_HINT : 'Demo: nur Bild-URL einfügen.'}>
      <div className="grid sm:grid-cols-[180px_1fr] gap-3 items-start">
        <div className={`${ratio} rounded-xl overflow-hidden bg-[#f6f6f3] border border-line grid place-items-center`}>
          {value ? <img key={value} src={value} alt="" className="w-full h-full object-cover" /> : <span className="text-xs text-muted">Noch kein Bild</span>}
        </div>
        <div className="space-y-2">
          {uploadImage ? (
            <label className="btn-outline !py-2 !px-4 text-sm w-full inline-grid place-items-center cursor-pointer">
              {busy ? 'Lädt …' : value ? 'Bild ersetzen' : 'Bild hochladen'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void onPick(f);
                  e.target.value = '';
                }}
              />
            </label>
          ) : null}
          <input className={modularInputCls} placeholder="oder Bild-URL einfügen" value={value} onChange={(e) => onChange(e.target.value)} />
          {value ? (
            <button type="button" className="text-xs text-rose-600 hover:underline" onClick={() => onChange('')}>
              Bild entfernen
            </button>
          ) : null}
          {error ? <p className="text-xs text-rose-600">{error}</p> : null}
        </div>
      </div>
    </ModField>
  );
}

export function modularHomeLinkSections(tpl: TemplateKey, content?: SiteContent): { id: string; label: string }[] {
  const servicesPage: Record<TemplateKey, { id: string; label: string }> = {
    restaurant: { id: '/speisekarte', label: '→ Seite: Speisekarte' },
    salon: { id: '/leistungen', label: '→ Seite: Leistungen' },
    tradesman: { id: '/leistungen', label: '→ Seite: Leistungen' },
    hotel: { id: '/zimmer', label: '→ Seite: Zimmer' },
    tourism: { id: '/touren', label: '→ Seite: Touren' },
    consulting: { id: '/leistungen', label: '→ Seite: Leistungen' },
    medical: { id: '/leistungen', label: '→ Seite: Leistungen' },
    fitness: { id: '/leistungen', label: '→ Seite: Leistungen' },
  };
  const galleryLabel: Record<TemplateKey, string> = {
    restaurant: '→ Seite: Galerie',
    salon: '→ Seite: Looks',
    tradesman: '→ Seite: Referenzen',
    hotel: '→ Seite: Haus & Spa',
    tourism: '→ Seite: Eindrücke',
    consulting: '→ Seite: Galerie',
    medical: '→ Seite: Galerie',
    fitness: '→ Seite: Galerie',
  };
  const galleryPath = tpl === 'tradesman' ? '/referenzen' : '/galerie';
  const customPages = (content?.modularPagesV2?.customPages ?? [])
    .filter((page) => page.visible !== false && page.slug.trim())
    .map((page) => ({ id: `/${page.slug.replace(/^\/+/, '')}`, label: `→ Seite: ${page.label || page.slug}` }));
  return [
    { id: '#hero', label: 'Startbereich (oben)' },
    { id: '#about', label: 'Abschnitt: Über uns' },
    { id: '#services', label: 'Abschnitt: Leistungen / Speisekarte' },
    { id: '#gallery', label: 'Abschnitt: Galerie / Eindrücke' },
    { id: '#testimonials', label: 'Abschnitt: Bewertungen' },
    servicesPage[tpl],
    { id: galleryPath, label: galleryLabel[tpl] },
    { id: '/ueber-uns', label: '→ Seite: Über uns' },
    { id: '/kontakt', label: '→ Seite: Kontakt' },
    { id: '/news', label: '→ Seite: News & Blog' },
    { id: '/impressum', label: '→ Seite: Impressum' },
    { id: '/datenschutz', label: '→ Seite: Datenschutz' },
    ...customPages,
  ];
}

export function tenantPageOptions(tpl: TemplateKey, content?: SiteContent): { id: string; label: string }[] {
  const newsPosts: Array<{ published?: boolean }> = Array.isArray(content?.newsPosts) ? content.newsPosts : [];
  return modularHomeLinkSections(tpl, content).filter((option) => {
    if (option.id.startsWith('#')) return false;
    if (option.id === '/impressum' || option.id === '/datenschutz') return false;
    if (option.id === '/news') return newsPosts.some((post) => post.published !== false);
    return true;
  });
}

export function ModLinkTarget({
  label,
  value,
  onChange,
  tpl,
  siteContent,
  onCreatePage,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  tpl: TemplateKey;
  siteContent?: SiteContent;
  onCreatePage?: () => void;
}) {
  const sections = modularHomeLinkSections(tpl, siteContent);
  const isExternal = !!value && !sections.some((s) => s.id === value) && value !== '__custom__';
  const [mode, setMode] = useState<'section' | 'external'>(isExternal ? 'external' : 'section');
  return (
    <ModField label={label}>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode('section')}
          className={`px-3 py-1.5 text-xs rounded-full border ${mode === 'section' ? 'bg-brand text-white border-brand' : 'bg-white border-line text-slate-600'}`}
        >
          Abschnitt / Seite
        </button>
        <button
          type="button"
          onClick={() => setMode('external')}
          className={`px-3 py-1.5 text-xs rounded-full border ${mode === 'external' ? 'bg-brand text-white border-brand' : 'bg-white border-line text-slate-600'}`}
        >
          Externe URL
        </button>
      </div>
      {mode === 'section' ? (
        <>
        <select
          className={modularInputCls}
          value={sections.some((s) => s.id === value) ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— Ziel wählen —</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        {onCreatePage ? (
          <button type="button" className="mt-2 btn-outline !py-2 !px-3 text-xs" onClick={onCreatePage}>
            + Neue Seite anlegen und verlinken
          </button>
        ) : null}
        </>
      ) : (
        <input
          className={modularInputCls}
          placeholder="https://… oder mailto:… oder tel:…"
          value={isExternal ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </ModField>
  );
}

type Btn = { label?: string; linkType?: string; internalPage?: string; externalUrl?: string };

export function patchButton(data: Record<string, unknown>, key: string, patch: Partial<Btn>): Record<string, unknown> {
  const cur = (data[key] as Btn | undefined) ?? {};
  return { ...data, [key]: { ...cur, ...patch } };
}

export function readButton(data: Record<string, unknown>, key: string): Btn {
  const b = data[key];
  if (!b || typeof b !== 'object') return {};
  const o = b as Record<string, unknown>;
  return {
    label: typeof o.label === 'string' ? o.label : '',
    linkType: typeof o.linkType === 'string' ? o.linkType : 'internal',
    internalPage: typeof o.internalPage === 'string' ? o.internalPage : '',
    externalUrl: typeof o.externalUrl === 'string' ? o.externalUrl : '',
  };
}
