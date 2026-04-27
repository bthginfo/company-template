import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { SiteContent } from '@/lib/types';
import { DEMO_CONTENT } from '@/lib/demo-content';

/**
 * AdminDemo: a fully interactive replica of the customer admin area.
 * No persistence, no API calls — purely visual to show prospects what
 * they would see after login.
 */
export default function AdminDemo() {
  const [tplKey, setTplKey] = useState<'restaurant' | 'salon' | 'tradesman'>('restaurant');
  const [data, setData] = useState<SiteContent>(DEMO_CONTENT.restaurant);
  const [tab, setTab] = useState<Tab>('hero');
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const switchTpl = (k: 'restaurant' | 'salon' | 'tradesman') => {
    setTplKey(k);
    setData(DEMO_CONTENT[k]);
    setSavedAt(null);
  };

  const fakeSave = () => {
    setSavedAt(new Date().toLocaleTimeString('de-DE'));
    setTimeout(() => setSavedAt(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f3]">
      {/* Demo banner */}
      <div className="bg-[var(--accent-color)] text-brand text-sm py-2.5 text-center font-medium">
        <span>Sie sehen eine Live-Demo des Admin-Bereichs · </span>
        <Link to="/" className="underline underline-offset-2">Zurück zur Übersicht</Link>
      </div>

      <header className="bg-white border-b border-line sticky top-0 z-30">
        <div className="container-x flex items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-4">
            <span className="font-display text-xl">Admin · {data.brand.name}</span>
            <span className="hidden md:inline text-xs uppercase tracking-widest text-muted bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">Online</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <select
              value={tplKey}
              onChange={(e) => switchTpl(e.target.value as 'restaurant' | 'salon' | 'tradesman')}
              className="bg-[#f6f6f3] border border-line rounded-lg px-3 py-2 text-sm hidden md:block"
            >
              <option value="restaurant">Vorschau: Restaurant</option>
              <option value="salon">Vorschau: Salon</option>
              <option value="tradesman">Vorschau: Handwerk</option>
            </select>
            <a href={`/preview/${tplKey}`} target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-slate-900 hidden md:inline">Website ansehen ↗</a>
            <span className="text-muted hidden sm:inline">demo@admin</span>
          </div>
        </div>
      </header>

      <div className="container-x py-8 grid md:grid-cols-[220px_1fr] gap-6">
        <aside className="bg-white rounded-2xl p-2 shadow-sm h-fit md:sticky md:top-24">
          <ul>
            {(TABS as { key: Tab; label: string; icon: string }[]).map((t) => (
              <li key={t.key}>
                <button
                  onClick={() => setTab(t.key)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${
                    tab === t.key ? 'bg-brand text-white' : 'hover:bg-[#f6f6f3] text-slate-700'
                  }`}
                >
                  <span className="text-lg">{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          {tab === 'brand' && <BrandTab data={data} setData={setData} />}
          {tab === 'hero' && <HeroTab data={data} setData={setData} />}
          {tab === 'about' && <AboutTab data={data} setData={setData} />}
          {tab === 'services' && <ServicesTab data={data} setData={setData} />}
          {tab === 'gallery' && <GalleryTab data={data} setData={setData} />}
          {tab === 'testimonials' && <TestimonialsTab data={data} setData={setData} />}
          {tab === 'contact' && <ContactTab data={data} setData={setData} />}

          <div className="mt-8 pt-6 border-t border-line flex items-center justify-between gap-4 flex-wrap">
            <div className="text-sm text-muted">
              {savedAt
                ? <span className="text-emerald-700">✓ Gespeichert um {savedAt} · Demo-Modus</span>
                : 'Diese Demo speichert nichts. In der echten Version sind Ihre Änderungen sofort live.'}
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost !px-4 !py-2 text-sm">Verwerfen</button>
              <button onClick={fakeSave} className="btn-primary !px-5 !py-2 text-sm">Speichern</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Tab = 'brand' | 'hero' | 'about' | 'services' | 'gallery' | 'testimonials' | 'contact';
const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'brand', label: 'Marke', icon: '✦' },
  { key: 'hero', label: 'Startseite', icon: '◐' },
  { key: 'about', label: 'Über uns', icon: '☉' },
  { key: 'services', label: 'Leistungen', icon: '☰' },
  { key: 'gallery', label: 'Galerie', icon: '▦' },
  { key: 'testimonials', label: 'Bewertungen', icon: '★' },
  { key: 'contact', label: 'Kontakt', icon: '✉' },
];

type SetterProps = { data: SiteContent; setData: (d: SiteContent) => void };

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl">{title}</h2>
        {description && <p className="text-sm text-muted mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted mt-1">{hint}</span>}
    </label>
  );
}

const inputCls = 'w-full bg-[#f6f6f3] rounded-xl px-4 py-2.5 border border-line focus:border-brand focus:bg-white outline-none transition text-sm';

function BrandTab({ data, setData }: SetterProps) {
  return (
    <Section title="Marke & Logo" description="Name, Slogan und Hauptfarbe Ihrer Website.">
      <Field label="Name">
        <input className={inputCls} value={data.brand.name} onChange={(e) => setData({ ...data, brand: { ...data.brand, name: e.target.value } })} />
      </Field>
      <Field label="Slogan">
        <input className={inputCls} value={data.brand.tagline || ''} onChange={(e) => setData({ ...data, brand: { ...data.brand, tagline: e.target.value } })} />
      </Field>
      <Field label="Farbe" hint="Wird für Buttons und Akzente verwendet.">
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={data.brand.primaryColor}
            onChange={(e) => setData({ ...data, brand: { ...data.brand, primaryColor: e.target.value } })}
            className="h-10 w-16 rounded-lg border border-line"
          />
          <input className={inputCls} value={data.brand.primaryColor} onChange={(e) => setData({ ...data, brand: { ...data.brand, primaryColor: e.target.value } })} />
        </div>
      </Field>
      <Field label="Logo (Bild-URL)" hint="Optional. Lassen Sie leer für ein Text-Logo.">
        <input className={inputCls} value={data.brand.logoUrl || ''} onChange={(e) => setData({ ...data, brand: { ...data.brand, logoUrl: e.target.value } })} placeholder="https://..." />
      </Field>
    </Section>
  );
}

function HeroTab({ data, setData }: SetterProps) {
  return (
    <Section title="Startseite (Hero)" description="Der erste Eindruck – Titel, Untertitel, Bild und der Haupt-Button.">
      <Field label="Titel">
        <input className={inputCls} value={data.hero.title} onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })} />
      </Field>
      <Field label="Untertitel">
        <textarea className={inputCls} rows={3} value={data.hero.subtitle || ''} onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })} />
      </Field>
      <ImagePickerField
        label="Hintergrundbild"
        value={data.hero.imageUrl || ''}
        onChange={(v) => setData({ ...data, hero: { ...data.hero, imageUrl: v } })}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Button-Text">
          <input className={inputCls} value={data.hero.ctaLabel || ''} onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaLabel: e.target.value } })} />
        </Field>
        <Field label="Button-Ziel">
          <input className={inputCls} value={data.hero.ctaHref || ''} onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaHref: e.target.value } })} />
        </Field>
      </div>
    </Section>
  );
}

function AboutTab({ data, setData }: SetterProps) {
  return (
    <Section title="Über uns" description="Ihre Geschichte, Ihr Team, Ihre Werte.">
      <Field label="Überschrift">
        <input className={inputCls} value={data.about?.title || ''} onChange={(e) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), title: e.target.value } })} />
      </Field>
      <Field label="Text" hint="Tipp: Leerzeile für Absatz.">
        <textarea className={inputCls} rows={9} value={data.about?.body || ''} onChange={(e) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), body: e.target.value } })} />
      </Field>
      <ImagePickerField
        label="Bild"
        value={data.about?.imageUrl || ''}
        onChange={(v) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), imageUrl: v } })}
      />
    </Section>
  );
}

function ServicesTab({ data, setData }: SetterProps) {
  const update = (i: number, patch: Partial<SiteContent['services'][number]>) => {
    const next = data.services.map((s, idx) => (idx === i ? { ...s, ...patch } : s));
    setData({ ...data, services: next });
  };
  const remove = (i: number) => setData({ ...data, services: data.services.filter((_, idx) => idx !== i) });
  const add = () => setData({ ...data, services: [...data.services, { title: 'Neues Element', description: '', price: '', imageUrl: '' }] });

  return (
    <Section title="Leistungen / Speisekarte" description="Was Sie anbieten – mit Preis und Bild.">
      <div className="space-y-4">
        {data.services.map((s, i) => (
          <div key={i} className="border border-line rounded-2xl p-5 bg-[#fafaf7]">
            <div className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-9 grid sm:grid-cols-3 gap-3">
                <input className={inputCls + ' sm:col-span-2'} placeholder="Titel" value={s.title} onChange={(e) => update(i, { title: e.target.value })} />
                <input className={inputCls} placeholder="Preis" value={s.price || ''} onChange={(e) => update(i, { price: e.target.value })} />
                <textarea className={inputCls + ' sm:col-span-3'} rows={2} placeholder="Beschreibung" value={s.description || ''} onChange={(e) => update(i, { description: e.target.value })} />
                <input className={inputCls + ' sm:col-span-3'} placeholder="Bild-URL" value={s.imageUrl || ''} onChange={(e) => update(i, { imageUrl: e.target.value })} />
              </div>
              <div className="md:col-span-3 flex md:flex-col gap-3 items-start">
                {s.imageUrl ? (
                  <img src={s.imageUrl} alt="" className="h-20 w-20 md:h-24 md:w-full object-cover rounded-lg" />
                ) : (
                  <div className="h-20 w-20 md:h-24 md:w-full rounded-lg bg-[#eaeae3] grid place-items-center text-xs text-muted">Kein Bild</div>
                )}
                <button onClick={() => remove(i)} className="text-xs text-rose-600 hover:underline">Entfernen</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} className="btn-outline !px-4 !py-2 text-sm">+ Element hinzufügen</button>
    </Section>
  );
}

function GalleryTab({ data, setData }: SetterProps) {
  const remove = (i: number) => setData({ ...data, gallery: data.gallery.filter((_, idx) => idx !== i) });
  return (
    <Section title="Galerie" description="Bilder zum Hochladen oder per URL.">
      <div className="border-2 border-dashed border-line rounded-2xl p-8 text-center bg-[#fafaf7]">
        <p className="text-2xl mb-2" aria-hidden>↥</p>
        <p className="font-medium">Bilder hier ablegen</p>
        <p className="text-sm text-muted mt-1">Werden automatisch komprimiert. JPG, PNG, WebP.</p>
        <button className="btn-outline mt-5 !py-2 !px-5 text-sm">Vom Computer wählen</button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {data.gallery.map((src, i) => (
          <div key={i} className="relative group aspect-square overflow-hidden rounded-xl">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => remove(i)}
              className="absolute top-2 right-2 bg-white/95 text-rose-600 rounded-full h-7 w-7 grid place-items-center text-sm opacity-0 group-hover:opacity-100 transition"
              title="Entfernen"
            >×</button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TestimonialsTab({ data, setData }: SetterProps) {
  const update = (i: number, patch: Partial<SiteContent['testimonials'][number]>) => {
    const next = data.testimonials.map((t, idx) => (idx === i ? { ...t, ...patch } : t));
    setData({ ...data, testimonials: next });
  };
  const remove = (i: number) => setData({ ...data, testimonials: data.testimonials.filter((_, idx) => idx !== i) });
  const add = () => setData({ ...data, testimonials: [...data.testimonials, { author: 'Neue Bewertung', text: '' }] });

  return (
    <Section title="Bewertungen" description="Zitate von Ihren Kund:innen.">
      <div className="space-y-4">
        {data.testimonials.map((t, i) => (
          <div key={i} className="border border-line rounded-2xl p-5 bg-[#fafaf7] space-y-3">
            <input className={inputCls} placeholder="Name" value={t.author} onChange={(e) => update(i, { author: e.target.value })} />
            <textarea className={inputCls} rows={3} placeholder="Zitat" value={t.text} onChange={(e) => update(i, { text: e.target.value })} />
            <div className="flex justify-end">
              <button onClick={() => remove(i)} className="text-xs text-rose-600 hover:underline">Entfernen</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} className="btn-outline !px-4 !py-2 text-sm">+ Bewertung hinzufügen</button>
    </Section>
  );
}

function ContactTab({ data, setData }: SetterProps) {
  const c = data.contact;
  const set = (patch: Partial<SiteContent['contact']>) => setData({ ...data, contact: { ...c, ...patch } });
  const updateHour = (i: number, patch: Partial<{ day: string; time: string }>) => {
    const next = c.hours.map((h, idx) => (idx === i ? { ...h, ...patch } : h));
    set({ hours: next });
  };
  const addHour = () => set({ hours: [...c.hours, { day: '', time: '' }] });
  const removeHour = (i: number) => set({ hours: c.hours.filter((_, idx) => idx !== i) });

  return (
    <Section title="Kontakt" description="Telefon, E-Mail, Adresse und Öffnungszeiten.">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Telefon"><input className={inputCls} value={c.phone || ''} onChange={(e) => set({ phone: e.target.value })} /></Field>
        <Field label="E-Mail"><input className={inputCls} value={c.email || ''} onChange={(e) => set({ email: e.target.value })} /></Field>
        <Field label="Adresse"><input className={inputCls} value={c.address || ''} onChange={(e) => set({ address: e.target.value })} /></Field>
        <Field label="Stadt / PLZ"><input className={inputCls} value={c.city || ''} onChange={(e) => set({ city: e.target.value })} /></Field>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-muted mb-3 mt-2">Öffnungszeiten</p>
        <div className="space-y-2">
          {c.hours.map((h, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
              <input className={inputCls} placeholder="Tag(e)" value={h.day} onChange={(e) => updateHour(i, { day: e.target.value })} />
              <input className={inputCls} placeholder="Uhrzeit" value={h.time} onChange={(e) => updateHour(i, { time: e.target.value })} />
              <button onClick={() => removeHour(i)} className="h-10 w-10 grid place-items-center rounded-lg hover:bg-rose-50 text-rose-600">×</button>
            </div>
          ))}
        </div>
        <button onClick={addHour} className="btn-outline !px-4 !py-2 text-sm mt-3">+ Zeile hinzufügen</button>
      </div>
    </Section>
  );
}

function ImagePickerField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label} hint="Bild hochladen oder URL einfügen.">
      <div className="grid sm:grid-cols-[160px_1fr] gap-3 items-start">
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#f6f6f3] border border-line grid place-items-center">
          {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <span className="text-xs text-muted">Kein Bild</span>}
        </div>
        <div className="space-y-2">
          <button className="btn-outline !py-2 !px-4 text-sm w-full">Bild hochladen</button>
          <input className={inputCls} placeholder="oder URL einfügen" value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
      </div>
    </Field>
  );
}
