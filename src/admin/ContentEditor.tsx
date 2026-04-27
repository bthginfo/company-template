import { useState } from 'react';
import { useContent } from '@/lib/content-context';
import type { SiteContent } from '@/lib/types';
import { ImageField } from './ImageField';

type Tab = 'brand' | 'hero' | 'about' | 'services' | 'gallery' | 'testimonials' | 'contact';

const TABS: { key: Tab; label: string }[] = [
  { key: 'brand', label: 'Marke' },
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'Über uns' },
  { key: 'services', label: 'Leistungen' },
  { key: 'gallery', label: 'Galerie' },
  { key: 'testimonials', label: 'Bewertungen' },
  { key: 'contact', label: 'Kontakt' },
];

export function ContentEditor({ initial }: { initial: SiteContent }) {
  const { save } = useContent();
  const [data, setData] = useState<SiteContent>(initial);
  const [tab, setTab] = useState<Tab>('brand');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const onSave = async () => {
    setSaving(true);
    setErr(null);
    try {
      await save(data);
      setSavedAt(new Date());
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-6">
      <aside className="bg-white rounded-2xl p-2 shadow-sm h-fit">
        <ul>
          {TABS.map((t) => (
            <li key={t.key}>
              <button
                onClick={() => setTab(t.key)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  tab === t.key ? 'bg-brand text-brand-fg' : 'hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        {tab === 'brand' && <BrandTab data={data} update={update} />}
        {tab === 'hero' && <HeroTab data={data} update={update} />}
        {tab === 'about' && <AboutTab data={data} update={update} />}
        {tab === 'services' && <ServicesTab data={data} update={update} />}
        {tab === 'gallery' && <GalleryTab data={data} update={update} />}
        {tab === 'testimonials' && <TestimonialsTab data={data} update={update} />}
        {tab === 'contact' && <ContactTab data={data} update={update} />}

        <div className="mt-8 pt-6 border-t flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {err ? <span className="text-rose-600">Fehler: {err}</span>
              : savedAt ? `Gespeichert um ${savedAt.toLocaleTimeString()}`
              : 'Änderungen werden erst nach Speichern aktiv.'}
          </div>
          <button onClick={onSave} disabled={saving} className="btn-primary">
            {saving ? 'Speichert …' : 'Speichern'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Field components ─────────────────────────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium mb-1">{label}</span>
      {children}
    </label>
  );
}

const inputCls = 'w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand';

type TabProps = {
  data: SiteContent;
  update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
};

function BrandTab({ data, update }: TabProps) {
  const b = data.brand;
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-4">Marke</h2>
      <Field label="Firmenname">
        <input className={inputCls} value={b.name} onChange={(e) => update('brand', { ...b, name: e.target.value })} />
      </Field>
      <Field label="Tagline / Slogan">
        <input className={inputCls} value={b.tagline} onChange={(e) => update('brand', { ...b, tagline: e.target.value })} />
      </Field>
      <Field label="Logo">
        <ImageField url={b.logoUrl} onChange={(url) => update('brand', { ...b, logoUrl: url })} />
      </Field>
      <Field label="Primärfarbe (HEX)">
        <input
          type="color"
          className="h-10 w-20 rounded cursor-pointer"
          value={b.primaryColor}
          onChange={(e) => update('brand', { ...b, primaryColor: e.target.value })}
        />
      </Field>
    </div>
  );
}

function HeroTab({ data, update }: TabProps) {
  const h = data.hero;
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-4">Hero / Startbereich</h2>
      <Field label="Titel">
        <input className={inputCls} value={h.title} onChange={(e) => update('hero', { ...h, title: e.target.value })} />
      </Field>
      <Field label="Untertitel">
        <textarea className={inputCls} rows={2} value={h.subtitle} onChange={(e) => update('hero', { ...h, subtitle: e.target.value })} />
      </Field>
      <Field label="Hintergrundbild">
        <ImageField url={h.imageUrl} onChange={(url) => update('hero', { ...h, imageUrl: url })} />
      </Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Button-Text">
          <input className={inputCls} value={h.ctaLabel} onChange={(e) => update('hero', { ...h, ctaLabel: e.target.value })} />
        </Field>
        <Field label="Button-Ziel">
          <input className={inputCls} value={h.ctaHref} onChange={(e) => update('hero', { ...h, ctaHref: e.target.value })} />
        </Field>
      </div>
    </div>
  );
}

function AboutTab({ data, update }: TabProps) {
  const a = data.about ?? { title: 'Über uns', body: '', imageUrl: '' };
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-4">Über uns</h2>
      <Field label="Überschrift">
        <input className={inputCls} value={a.title} onChange={(e) => update('about', { ...a, title: e.target.value })} />
      </Field>
      <Field label="Text">
        <textarea className={inputCls} rows={6} value={a.body} onChange={(e) => update('about', { ...a, body: e.target.value })} />
      </Field>
      <Field label="Bild">
        <ImageField url={a.imageUrl} onChange={(url) => update('about', { ...a, imageUrl: url })} />
      </Field>
    </div>
  );
}

function ServicesTab({ data, update }: TabProps) {
  const items = data.services;
  const setItem = (i: number, v: SiteContent['services'][number]) =>
    update('services', items.map((x, idx) => (idx === i ? v : x)));
  const remove = (i: number) => update('services', items.filter((_, idx) => idx !== i));
  const add = () => update('services', [...items, { title: '', description: '', price: '', imageUrl: '' }]);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-4">Leistungen / Speisekarte</h2>
      <div className="space-y-6">
        {items.map((s, i) => (
          <div key={i} className="border rounded-xl p-4">
            <Field label="Titel">
              <input className={inputCls} value={s.title} onChange={(e) => setItem(i, { ...s, title: e.target.value })} />
            </Field>
            <Field label="Beschreibung">
              <textarea className={inputCls} rows={2} value={s.description} onChange={(e) => setItem(i, { ...s, description: e.target.value })} />
            </Field>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Preis">
                <input className={inputCls} value={s.price} onChange={(e) => setItem(i, { ...s, price: e.target.value })} />
              </Field>
              <Field label="Bild">
                <ImageField url={s.imageUrl} onChange={(url) => setItem(i, { ...s, imageUrl: url })} />
              </Field>
            </div>
            <button onClick={() => remove(i)} className="text-rose-600 text-sm hover:underline">Eintrag entfernen</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="btn-outline mt-4">+ Eintrag hinzufügen</button>
    </div>
  );
}

function GalleryTab({ data, update }: TabProps) {
  const items = data.gallery;
  const remove = (i: number) => update('gallery', items.filter((_, idx) => idx !== i));
  const add = (url: string) => update('gallery', [...items, url]);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-4">Galerie</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
        {items.map((url, i) => (
          <div key={i} className="relative group">
            <img src={url} alt="" className="aspect-square object-cover rounded-lg" />
            <button
              onClick={() => remove(i)}
              className="absolute top-1 right-1 bg-rose-600 text-white text-xs rounded-full w-6 h-6 opacity-0 group-hover:opacity-100"
              title="Entfernen"
            >×</button>
          </div>
        ))}
      </div>
      <ImageField url="" onChange={(url) => url && add(url)} buttonLabel="Bild hochladen" />
    </div>
  );
}

function TestimonialsTab({ data, update }: TabProps) {
  const items = data.testimonials;
  const setItem = (i: number, v: SiteContent['testimonials'][number]) =>
    update('testimonials', items.map((x, idx) => (idx === i ? v : x)));
  const remove = (i: number) => update('testimonials', items.filter((_, idx) => idx !== i));
  const add = () => update('testimonials', [...items, { author: '', text: '' }]);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-4">Bewertungen</h2>
      <div className="space-y-4">
        {items.map((t, i) => (
          <div key={i} className="border rounded-xl p-4">
            <Field label="Autor:in">
              <input className={inputCls} value={t.author} onChange={(e) => setItem(i, { ...t, author: e.target.value })} />
            </Field>
            <Field label="Text">
              <textarea className={inputCls} rows={3} value={t.text} onChange={(e) => setItem(i, { ...t, text: e.target.value })} />
            </Field>
            <button onClick={() => remove(i)} className="text-rose-600 text-sm hover:underline">Eintrag entfernen</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="btn-outline mt-4">+ Bewertung hinzufügen</button>
    </div>
  );
}

function ContactTab({ data, update }: TabProps) {
  const c = data.contact;
  const setHours = (i: number, v: { day: string; time: string }) =>
    update('contact', { ...c, hours: c.hours.map((x, idx) => (idx === i ? v : x)) });
  const removeHours = (i: number) =>
    update('contact', { ...c, hours: c.hours.filter((_, idx) => idx !== i) });
  const addHours = () =>
    update('contact', { ...c, hours: [...c.hours, { day: '', time: '' }] });

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-4">Kontakt</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Telefon"><input className={inputCls} value={c.phone} onChange={(e) => update('contact', { ...c, phone: e.target.value })} /></Field>
        <Field label="E-Mail"><input className={inputCls} value={c.email} onChange={(e) => update('contact', { ...c, email: e.target.value })} /></Field>
        <Field label="Adresse"><input className={inputCls} value={c.address} onChange={(e) => update('contact', { ...c, address: e.target.value })} /></Field>
        <Field label="Stadt"><input className={inputCls} value={c.city} onChange={(e) => update('contact', { ...c, city: e.target.value })} /></Field>
      </div>
      <Field label="Google Maps Embed-URL">
        <input className={inputCls} value={c.mapsUrl} onChange={(e) => update('contact', { ...c, mapsUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?..." />
      </Field>
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Öffnungszeiten</p>
        {c.hours.map((h, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className={inputCls} placeholder="Tag (z.B. Mo–Fr)" value={h.day} onChange={(e) => setHours(i, { ...h, day: e.target.value })} />
            <input className={inputCls} placeholder="Zeit (z.B. 09:00–18:00)" value={h.time} onChange={(e) => setHours(i, { ...h, time: e.target.value })} />
            <button onClick={() => removeHours(i)} className="text-rose-600 px-2">×</button>
          </div>
        ))}
        <button onClick={addHours} className="btn-outline mt-2">+ Zeile hinzufügen</button>
      </div>
    </div>
  );
}
