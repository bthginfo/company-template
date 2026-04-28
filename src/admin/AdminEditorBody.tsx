import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { SiteContent, TemplateKey } from '@/lib/types';

/**
 * AdminEditorBody — the rich page-grouped editor shared by:
 *  - the showcase AdminDemo (localStorage-backed, no real save)
 *  - the real per-tenant AdminApp (API-backed, persistent save)
 *
 * Wrappers control state ownership and the "Save" implementation.
 */
export type UploadImageFn = (file: File) => Promise<string>;

export type AdminEditorBodyProps = {
  tplKey: TemplateKey;
  onTplChange?: (k: TemplateKey) => void;
  data: SiteContent;
  setData: (next: SiteContent) => void;
  onSave: () => void | Promise<void>;
  savedAt: string | null;
  saving?: boolean;
  brandTitle?: string;
  topBar?: ReactNode;
  headerStatus?: ReactNode;
  footerStatus?: ReactNode;
  footerExtraActions?: ReactNode;
  previewUrlBase?: string; // e.g. "/preview/restaurant" or ""
  uploadImage?: UploadImageFn;
};

type Ctx = {
  uploadImage?: UploadImageFn;
};
const noCtx: Ctx = {};
let _ctx: Ctx = noCtx; // module-scoped for the simple atoms below

export function AdminEditorBody(props: AdminEditorBodyProps) {
  const {
    tplKey, onTplChange, data, setData,
    onSave, savedAt, saving,
    brandTitle, topBar, headerStatus, footerStatus, footerExtraActions,
    previewUrlBase = '',
    uploadImage,
  } = props;

  _ctx = { uploadImage };

  const [pageId, setPageId] = useState<PageId>('home');
  const pages = pagesFor(tplKey);
  const activePage = pages.find((p) => p.id === pageId) ?? pages[0];

  // when template changes externally, snap back to home
  useEffect(() => { setPageId('home'); }, [tplKey]);

  const isGlobal = pageId === 'brand' || pageId === 'contact' || pageId === 'social' || pageId === 'seo' || pageId === 'scripts' || pageId === 'news';

  return (
    <div className="min-h-screen bg-[#f6f6f3]">
      {topBar}

      <header className="bg-white border-b border-line sticky top-0 z-30">
        <div className="container-x flex items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl">Admin · {brandTitle ?? data.brand.name}</span>
            {headerStatus}
          </div>
          <div className="flex items-center gap-3 text-sm">
            {onTplChange && (
              <select
                value={tplKey}
                onChange={(e) => onTplChange(e.target.value as TemplateKey)}
                className="bg-[#f6f6f3] border border-line rounded-lg px-3 py-2 text-sm hidden md:block"
              >
                <option value="restaurant">Demo-Daten: Restaurant</option>
                <option value="salon">Demo-Daten: Salon</option>
                <option value="tradesman">Demo-Daten: Handwerk</option>
                <option value="consulting">Demo-Daten: Beratung</option>
                <option value="medical">Demo-Daten: Praxis</option>
                <option value="fitness">Demo-Daten: Studio</option>
              </select>
            )}
            {previewUrlBase !== undefined && (
              <a href={previewUrlBase || '/'} target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-slate-900 hidden md:inline">
                Website ansehen ↗
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="container-x py-8 grid md:grid-cols-[240px_1fr] gap-6">
        {/* LEFT: pages + global */}
        <aside className="space-y-6 md:sticky md:top-24 h-fit">
          <SidebarGroup label="Seiten">
            {pages.map((p) => (
              <SidebarItem key={p.id} active={p.id === pageId} onClick={() => setPageId(p.id)} icon={p.icon}>
                {p.label}
              </SidebarItem>
            ))}
          </SidebarGroup>
          <SidebarGroup label="Inhalte">
            <SidebarItem active={pageId === 'news'} onClick={() => setPageId('news')} icon="✎">News & Blog</SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="Global">
            <SidebarItem active={pageId === 'brand'} onClick={() => setPageId('brand')} icon="✦">Marke & Design</SidebarItem>
            <SidebarItem active={pageId === 'contact'} onClick={() => setPageId('contact')} icon="✉">Kontaktdaten</SidebarItem>
            <SidebarItem active={pageId === 'social'} onClick={() => setPageId('social')} icon="@">Social Media</SidebarItem>
            <SidebarItem active={pageId === 'seo'} onClick={() => setPageId('seo')} icon="◎">SEO & Sichtbarkeit</SidebarItem>
            <SidebarItem active={pageId === 'scripts'} onClick={() => setPageId('scripts')} icon="〈">Skripte & Tracking</SidebarItem>
          </SidebarGroup>
        </aside>

        {/* RIGHT: page editor */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-line flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">{isGlobal ? 'Global' : 'Seite'}</p>
              <h1 className="font-display text-3xl mt-1">{activePage?.label || labelForGlobal(pageId)}</h1>
              {!isGlobal && (
                <p className="text-sm text-muted mt-1">Jede Sektion auf dieser Seite ist hier einzeln pflegbar.</p>
              )}
            </div>
            {!isGlobal && previewUrlBase !== undefined && (
              <a href={`${previewUrlBase}${activePage?.previewPath || ''}`} target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-2">
                Live ansehen ↗
              </a>
            )}
          </div>

          <div className="p-6 md:p-8 space-y-10">
            {pageId === 'brand' && <BrandPage data={data} setData={setData} />}
            {pageId === 'contact' && <ContactGlobal data={data} setData={setData} />}
            {pageId === 'social' && <SocialPage data={data} setData={setData} />}
            {pageId === 'seo' && <SeoPage data={data} setData={setData} />}
            {pageId === 'scripts' && <ScriptsPage data={data} setData={setData} />}
            {pageId === 'news' && <NewsPage data={data} setData={setData} />}
            {pageId === 'home' && <HomePageEditor data={data} setData={setData} tpl={tplKey} />}
            {pageId === 'services' && <ServicesPageEditor data={data} setData={setData} tpl={tplKey} />}
            {pageId === 'gallery' && <GalleryPageEditor data={data} setData={setData} tpl={tplKey} />}
            {pageId === 'about' && <AboutPageEditor data={data} setData={setData} tpl={tplKey} />}
            {pageId === 'contactPage' && <ContactPageEditor data={data} setData={setData} tpl={tplKey} />}
          </div>

          <div className="px-6 md:px-8 py-5 border-t border-line flex items-center justify-between gap-4 flex-wrap bg-[#fafaf7] rounded-b-2xl">
            <div className="text-sm text-muted">
              {savedAt
                ? <span className="text-emerald-700">✓ Gespeichert um {savedAt}</span>
                : (footerStatus ?? 'Änderungen werden beim Speichern übernommen.')}
            </div>
            <div className="flex gap-2 flex-wrap">
              {footerExtraActions}
              <button onClick={() => onSave()} disabled={saving} className="btn-primary !px-5 !py-2 text-sm disabled:opacity-60">
                {saving ? 'Speichert …' : 'Speichern'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Pages config per template ───────────── */
type PageId = 'home' | 'services' | 'gallery' | 'about' | 'contactPage' | 'brand' | 'contact' | 'social' | 'seo' | 'scripts' | 'news';
type PageDef = { id: PageId; label: string; icon: string; previewPath: string };

function pagesFor(t: TemplateKey): PageDef[] {
  if (t === 'consulting' || t === 'medical' || t === 'fitness') return [
    { id: 'home', label: 'Startseite', icon: '◐', previewPath: '' },
    { id: 'services', label: 'Leistungen', icon: '☰', previewPath: '#leistungen' },
    { id: 'gallery', label: 'Galerie', icon: '▦', previewPath: '#galerie' },
    { id: 'about', label: 'Über uns', icon: '☉', previewPath: '#about' },
    { id: 'contactPage', label: 'Kontakt', icon: '✉', previewPath: '#kontakt' },
  ];
  if (t === 'restaurant') return [
    { id: 'home', label: 'Startseite', icon: '◐', previewPath: '' },
    { id: 'services', label: 'Speisekarte', icon: '☰', previewPath: '/speisekarte' },
    { id: 'gallery', label: 'Galerie', icon: '▦', previewPath: '/galerie' },
    { id: 'about', label: 'Über uns', icon: '☉', previewPath: '/ueber-uns' },
    { id: 'contactPage', label: 'Kontakt', icon: '✉', previewPath: '/kontakt' },
  ];
  if (t === 'salon') return [
    { id: 'home', label: 'Startseite', icon: '◐', previewPath: '' },
    { id: 'services', label: 'Leistungen', icon: '☰', previewPath: '/leistungen' },
    { id: 'gallery', label: 'Looks', icon: '▦', previewPath: '/galerie' },
    { id: 'about', label: 'Studio', icon: '☉', previewPath: '/ueber-uns' },
    { id: 'contactPage', label: 'Termin', icon: '✉', previewPath: '/kontakt' },
  ];
  return [
    { id: 'home', label: 'Startseite', icon: '◐', previewPath: '' },
    { id: 'services', label: 'Leistungen', icon: '☰', previewPath: '/leistungen' },
    { id: 'gallery', label: 'Referenzen', icon: '▦', previewPath: '/referenzen' },
    { id: 'about', label: 'Betrieb', icon: '☉', previewPath: '/ueber-uns' },
    { id: 'contactPage', label: 'Anfrage', icon: '✉', previewPath: '/kontakt' },
  ];
}

function labelForGlobal(p: PageId) {
  if (p === 'brand') return 'Marke & Design';
  if (p === 'contact') return 'Kontaktdaten';
  if (p === 'social') return 'Social Media';
  if (p === 'seo') return 'SEO & Sichtbarkeit';
  if (p === 'scripts') return 'Skripte & Tracking';
  if (p === 'news') return 'News & Blog';
  return '';
}

/* ───────────── Sidebar pieces ───────────── */
function SidebarGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-2 shadow-sm">
      <p className="text-[10px] uppercase tracking-[0.18em] text-muted px-3 pt-2 pb-1">{label}</p>
      <ul>{children}</ul>
    </div>
  );
}
function SidebarItem({ active, onClick, icon, children }: { active?: boolean; onClick: () => void; icon: string; children: React.ReactNode }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
          active ? 'bg-brand text-white' : 'hover:bg-[#f6f6f3] text-slate-700'
        }`}
      >
        <span className="w-5 text-center">{icon}</span>
        <span>{children}</span>
      </button>
    </li>
  );
}

/* ───────────── Shared form atoms ───────────── */
type SetterProps = { data: SiteContent; setData: (d: SiteContent) => void };
type SectionProps = SetterProps & { tpl: TemplateKey };
const inputCls = 'w-full bg-[#f6f6f3] rounded-xl px-4 py-2.5 border border-line focus:border-brand focus:bg-white outline-none transition text-sm';

function SectionCard({ title, description, badge, children }: { title: string; description?: string; badge?: string; children: React.ReactNode }) {
  return (
    <section className="border border-line rounded-2xl overflow-hidden">
      <header className="px-5 py-4 bg-[#fafaf7] border-b border-line flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display text-xl">{title}</h2>
          {description && <p className="text-xs text-muted mt-0.5">{description}</p>}
        </div>
        {badge && <span className="text-[10px] uppercase tracking-widest bg-white border border-line text-muted rounded-full px-2.5 py-1">{badge}</span>}
      </header>
      <div className="p-5 md:p-6 space-y-4">{children}</div>
    </section>
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
function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 text-sm cursor-pointer select-none">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition ${value ? 'bg-emerald-500' : 'bg-slate-300'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 bg-white rounded-full transition-all ${value ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
      <span>{label}</span>
    </label>
  );
}

function ImagePickerField({ label, value, onChange, ratio = 'aspect-[4/3]' }: { label: string; value: string; onChange: (v: string) => void; ratio?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPick = async (file: File) => {
    setError(null);
    if (!_ctx.uploadImage) {
      // demo mode: read as data url so the preview reflects the choice
      const reader = new FileReader();
      reader.onload = () => onChange(String(reader.result || ''));
      reader.readAsDataURL(file);
      return;
    }
    try {
      setBusy(true);
      const url = await _ctx.uploadImage(file);
      onChange(url);
    } catch (e: any) {
      setError(e?.message || 'Upload fehlgeschlagen');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label={label} hint={_ctx.uploadImage ? 'Bild hochladen oder URL einfügen.' : 'In der Demo wird das Bild nur lokal angezeigt.'}>
      <div className="grid sm:grid-cols-[180px_1fr] gap-3 items-start">
        <div className={`${ratio} rounded-xl overflow-hidden bg-[#f6f6f3] border border-line grid place-items-center`}>
          {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <span className="text-xs text-muted">Kein Bild</span>}
        </div>
        <div className="space-y-2">
          <label className="btn-outline !py-2 !px-4 text-sm w-full inline-grid place-items-center cursor-pointer">
            {busy ? 'Lädt …' : 'Bild hochladen'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onPick(f);
                e.target.value = '';
              }}
            />
          </label>
          <input className={inputCls} placeholder="oder URL einfügen" value={value} onChange={(e) => onChange(e.target.value)} />
          {error && <p className="text-xs text-rose-600">{error}</p>}
        </div>
      </div>
    </Field>
  );
}

function LinkTargetField({ label, value, onChange, sections }: { label: string; value: string; onChange: (v: string) => void; sections: { id: string; label: string }[] }) {
  const isExternal = !!value && !sections.some((s) => s.id === value) && value !== '__custom__';
  const [mode, setMode] = useState<'section' | 'external'>(isExternal ? 'external' : 'section');
  return (
    <Field label={label} hint="Wohin soll der Button verlinken?">
      <div className="flex gap-2 mb-2">
        <button type="button" onClick={() => setMode('section')} className={`px-3 py-1.5 text-xs rounded-full border ${mode === 'section' ? 'bg-brand text-white border-brand' : 'bg-white border-line text-slate-600'}`}>
          Sektion auf der Seite
        </button>
        <button type="button" onClick={() => setMode('external')} className={`px-3 py-1.5 text-xs rounded-full border ${mode === 'external' ? 'bg-brand text-white border-brand' : 'bg-white border-line text-slate-600'}`}>
          Externe URL
        </button>
      </div>
      {mode === 'section' ? (
        <select
          className={inputCls}
          value={sections.some((s) => s.id === value) ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— Sektion wählen —</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      ) : (
        <input
          className={inputCls}
          placeholder="https://… oder mailto:… oder tel:…"
          value={isExternal ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </Field>
  );
}

function homeSectionsFor(_t: TemplateKey) {
  return [
    { id: '#hero', label: 'Startbereich (oben)' },
    { id: '#about', label: 'Über uns' },
    { id: '#services', label: 'Leistungen / Speisekarte' },
    { id: '#gallery', label: 'Galerie / Eindrücke' },
    { id: '#testimonials', label: 'Bewertungen' },
    { id: '/kontakt', label: '→ Seite: Kontakt' },
    { id: '/ueber-uns', label: '→ Seite: Über uns' },
  ];
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE EDITORS
   ═══════════════════════════════════════════════════════════════════ */

function HomePageEditor({ data, setData, tpl }: SectionProps) {
  const set = (patch: Partial<SiteContent>) => setData({ ...data, ...patch });
  const announcements = (data as any).announcements as string[] | undefined;
  return (
    <>
      <SectionCard title="Hero (Startbereich)" description="Erster Eindruck – Titel, Untertitel, Hintergrund, Haupt-Button." badge="Sektion 1">
        <Field label="Slogan / Eyebrow" hint="Kleine Zeile über der Überschrift.">
          <input className={inputCls} value={data.brand.tagline || ''} onChange={(e) => set({ brand: { ...data.brand, tagline: e.target.value } })} />
        </Field>
        <Field label="Hauptüberschrift">
          <input className={inputCls} value={data.hero.title} onChange={(e) => set({ hero: { ...data.hero, title: e.target.value } })} />
        </Field>
        <Field label="Untertitel">
          <textarea className={inputCls} rows={3} value={data.hero.subtitle || ''} onChange={(e) => set({ hero: { ...data.hero, subtitle: e.target.value } })} />
        </Field>
        <ImagePickerField label="Hintergrundbild" value={data.hero.imageUrl || ''} onChange={(v) => set({ hero: { ...data.hero, imageUrl: v } })} ratio="aspect-[16/9]" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Button-Text"><input className={inputCls} value={data.hero.ctaLabel || ''} onChange={(e) => set({ hero: { ...data.hero, ctaLabel: e.target.value } })} /></Field>
          <LinkTargetField label="Button-Ziel" value={data.hero.ctaHref || ''} onChange={(v) => set({ hero: { ...data.hero, ctaHref: v } })} sections={homeSectionsFor(tpl)} />
        </div>
      </SectionCard>

      {(tpl === 'consulting' || tpl === 'medical' || tpl === 'fitness') && (
        <SectionCard title="Branchen-Stichworte" description="Kurze Schlagwörter direkt unter dem Hero – geben der Variante ein klares Profil." badge="Sektion 1b">
          <BranchChipsEditor data={data} setData={setData} tpl={tpl} />
        </SectionCard>
      )}

      <SectionCard title="Lauftext-Banner" description="Die kleine Marquee-Zeile mit aktuellen Hinweisen." badge="Sektion 2">
        <RepeatableList
          items={announcements ?? defaultAnnouncements(tpl)}
          onChange={(arr) => setData({ ...(data as any), announcements: arr } as SiteContent)}
          render={(v, i, set) => (
            <input className={inputCls} value={v} onChange={(e) => set(e.target.value)} placeholder={`Hinweis ${i + 1}`} />
          )}
          newItem={() => ''}
          addLabel="+ Hinweis hinzufügen"
        />
      </SectionCard>

      <SectionCard title="Über-uns-Teaser" description="Kurzer Auszug, der auf die Über-uns-Seite verweist." badge="Sektion 3">
        <Field label="Überschrift">
          <input className={inputCls} value={data.about?.title || ''} onChange={(e) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), title: e.target.value } })} />
        </Field>
        <Field label="Text" hint="Wird automatisch auf 2–3 Absätze gekürzt auf der Startseite.">
          <textarea className={inputCls} rows={5} value={data.about?.body || ''} onChange={(e) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), body: e.target.value } })} />
        </Field>
        <ImagePickerField label="Bild" value={data.about?.imageUrl || ''} onChange={(v) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), imageUrl: v } })} />
      </SectionCard>

      <SectionCard title={tpl === 'restaurant' ? 'Speisekarte-Teaser' : 'Leistungen-Teaser'} description="Die ersten 3 Einträge erscheinen auf der Startseite." badge="Sektion 4">
        <p className="text-xs text-muted">
          Bearbeiten Sie die Liste unter <strong>{tpl === 'restaurant' ? 'Speisekarte' : 'Leistungen'}</strong> in der Seitenleiste. Hier wählen Sie nur, welche zuerst erscheinen.
        </p>
        <ReorderList
          items={data.services}
          onChange={(arr) => setData({ ...data, services: arr })}
          getKey={(s, i) => s.title + i}
          render={(s) => (
            <div className="flex items-center gap-3">
              {s.imageUrl ? <img src={s.imageUrl} alt="" className="h-10 w-10 object-cover rounded" /> : <div className="h-10 w-10 rounded bg-[#eaeae3]" />}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{s.title}</p>
                <p className="text-xs text-muted truncate">{s.price}</p>
              </div>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Zahlen-Band" description={'Vier Eckdaten – auf der Startseite und in „Über uns".'} badge="Sektion 5">
        <NumbersEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>

      <SectionCard title="Galerie-Teaser" description="Sieben Bilder für die Vorschau auf der Startseite." badge="Sektion 6">
        <p className="text-xs text-muted">Volle Bildverwaltung unter <strong>Galerie</strong>. Die ersten 7 Bilder erscheinen hier.</p>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          {data.gallery.slice(0, 7).map((src, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-[#f6f6f3]">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Bewertungen-Teaser" description="Die ersten drei Stimmen erscheinen auf der Startseite." badge="Sektion 7">
        <TestimonialsEditor data={data} setData={setData} max={3} />
      </SectionCard>

      <SectionCard title="Abschluss-Aufruf (CTA)" description="Der Aufruf am Seitenende." badge="Sektion 8">
        <CtaBandEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>
    </>
  );
}

function ServicesPageEditor({ data, setData, tpl }: SectionProps) {
  return (
    <>
      <SectionCard title="Seiten-Header" description="Überschrift oben auf der Seite." badge="Sektion 1">
        <PageHeaderEditor data={data} setData={setData} field="services" defaults={{
          eyebrow: tpl === 'restaurant' ? 'Speisekarte' : 'Leistungen',
          title: tpl === 'restaurant' ? 'Aus der Küche.' : tpl === 'salon' ? 'Ihre Behandlungen.' : 'Was wir können.',
          subtitle: '',
        }} />
      </SectionCard>
      <SectionCard title="Highlights-Leiste" description="Vier kurze Highlights direkt unter der Überschrift." badge="Sektion 2">
        <HighlightsEditor data={data} setData={setData} field="serviceHighlights" defaults={defaultHighlights(tpl)} />
      </SectionCard>
      <SectionCard title={tpl === 'restaurant' ? 'Gerichte' : 'Leistungen'} description="Vollständige Liste – Reihenfolge, Bild, Preis, Beschreibung." badge="Sektion 3">
        <ServicesListEditor data={data} setData={setData} />
      </SectionCard>
      <SectionCard title="Ablauf-Schritte" description={'Die vier Schritte „So läuft es ab".'} badge="Sektion 4">
        <StepsEditor data={data} setData={setData} field="serviceProcess" defaults={defaultProcess(tpl)} />
      </SectionCard>
      {tpl === 'fitness' && (
        <SectionCard title="Programme" description="Kurse / Trainings, die im Programm-Spotlight erscheinen." badge="Sektion 4b">
          <ProgramsEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'medical' && (
        <SectionCard title="Hinweise (Online-Termin & Notfall)" description="Texte für die Service-Karten." badge="Sektion 4b">
          <MedicalNoticeEditor data={data} setData={setData} />
        </SectionCard>
      )}
      <SectionCard title="FAQ" description="Häufig gestellte Fragen am Seitenende." badge="Sektion 5">
        <FaqEditor data={data} setData={setData} defaults={defaultFaq(tpl)} />
      </SectionCard>
      <SectionCard title="Abschluss-Aufruf (CTA)" badge="Sektion 6">
        <CtaBandEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>
    </>
  );
}

function GalleryPageEditor({ data, setData, tpl }: SectionProps) {
  const remove = (i: number) => setData({ ...data, gallery: data.gallery.filter((_, idx) => idx !== i) });
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= data.gallery.length) return;
    const next = [...data.gallery]; [next[i], next[j]] = [next[j], next[i]]; setData({ ...data, gallery: next });
  };
  const add = (url: string) => url && setData({ ...data, gallery: [...data.gallery, url] });
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);

  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    if (!_ctx.uploadImage) {
      const arr = await Promise.all(Array.from(files).map((f) => new Promise<string>((res) => {
        const r = new FileReader(); r.onload = () => res(String(r.result || '')); r.readAsDataURL(f);
      })));
      setData({ ...data, gallery: [...data.gallery, ...arr.filter(Boolean)] });
      return;
    }
    setBusy(true);
    try {
      const urls = await Promise.all(Array.from(files).map((f) => _ctx.uploadImage!(f)));
      setData({ ...data, gallery: [...data.gallery, ...urls] });
    } finally { setBusy(false); }
  };

  return (
    <>
      <SectionCard title="Seiten-Header" badge="Sektion 1">
        <PageHeaderEditor data={data} setData={setData} field="gallery" defaults={{
          eyebrow: tpl === 'tradesman' ? 'Projekte' : 'Galerie',
          title: tpl === 'tradesman' ? 'Referenzen aus der Werkstatt.' : tpl === 'salon' ? 'Looks & Momente.' : 'Bilder & Eindrücke.',
          subtitle: '',
        }} />
      </SectionCard>

      <SectionCard title="Bilder hochladen" description="Vom Computer wählen oder per URL." badge="Sektion 2">
        <div className="border-2 border-dashed border-line rounded-2xl p-7 text-center bg-[#fafaf7]">
          <p className="text-2xl mb-2" aria-hidden>↥</p>
          <p className="font-medium text-sm">Bilder auswählen</p>
          <p className="text-xs text-muted mt-1">JPG, PNG, WebP. Mehrfachauswahl möglich.</p>
          <label className="btn-outline mt-4 !py-2 !px-5 text-sm inline-grid place-items-center cursor-pointer">
            {busy ? 'Lädt …' : 'Vom Computer wählen'}
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { onFiles(e.target.files); e.target.value = ''; }} />
          </label>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <input className={inputCls} placeholder="oder Bild-URL einfügen" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button className="btn-primary !py-2 !px-4 text-sm" onClick={() => { add(draft); setDraft(''); }}>Hinzufügen</button>
        </div>
      </SectionCard>

      <SectionCard title={`Alle Bilder (${data.gallery.length})`} description="Reihenfolge per ↑/↓, Bild entfernen mit ×." badge="Sektion 3">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {data.gallery.map((src, i) => (
            <div key={i} className="relative group aspect-square overflow-hidden rounded-xl border border-line">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 top-0 p-1.5 flex justify-between opacity-0 group-hover:opacity-100 transition">
                <span className="bg-white/95 rounded-full text-[10px] px-2 py-0.5 font-mono">{String(i + 1).padStart(2, '0')}</span>
                <button onClick={() => remove(i)} className="bg-white/95 text-rose-600 rounded-full h-6 w-6 grid place-items-center text-sm" title="Entfernen">×</button>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-1.5 flex justify-between opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => move(i, -1)} className="bg-white/95 rounded-full h-6 w-6 grid place-items-center text-xs" title="Hoch">↑</button>
                <button onClick={() => move(i, 1)} className="bg-white/95 rounded-full h-6 w-6 grid place-items-center text-xs" title="Runter">↓</button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Abschluss-Aufruf (CTA)" badge="Sektion 4">
        <CtaBandEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>
    </>
  );
}

function AboutPageEditor({ data, setData, tpl }: SectionProps) {
  return (
    <>
      <SectionCard title="Seiten-Header" badge="Sektion 1">
        <PageHeaderEditor data={data} setData={setData} field="about" defaults={{ eyebrow: 'Über uns', title: data.about?.title || 'Unsere Geschichte.', subtitle: '' }} />
      </SectionCard>
      <SectionCard title="Geschichte / Erzählung" description="Längerer Fließtext mit Bild." badge="Sektion 2">
        <Field label="Überschrift">
          <input className={inputCls} value={data.about?.title || ''} onChange={(e) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), title: e.target.value } })} />
        </Field>
        <Field label="Text" hint="Leerzeile = neuer Absatz.">
          <textarea className={inputCls} rows={9} value={data.about?.body || ''} onChange={(e) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), body: e.target.value } })} />
        </Field>
        <ImagePickerField label="Bild" value={data.about?.imageUrl || ''} onChange={(v) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), imageUrl: v } })} />
      </SectionCard>
      <SectionCard title="Werte / Grundsätze" description="Drei Karten mit Ihren Prinzipien." badge="Sektion 3">
        <ValuesEditor data={data} setData={setData} defaults={defaultValues(tpl)} />
      </SectionCard>
      <SectionCard title="Team" description="Bilder, Namen, Rollen, Kurzbio." badge="Sektion 4">
        <TeamEditor data={data} setData={setData} defaults={defaultTeam(tpl)} />
      </SectionCard>
      <SectionCard title="Geschichte / Timeline" description="Stationen, Meilensteine, Jubiläen — als vertikale Zeitleiste." badge="Sektion 5">
        <TimelineEditor data={data} setData={setData} />
      </SectionCard>
      <SectionCard title="Zahlen-Band" badge="Sektion 6">
        <NumbersEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>
      {tpl === 'tradesman' && (
        <SectionCard title="Qualifikationen" description="Zertifikate, Mitgliedschaften, Förderpartner." badge="Sektion 6">
          <CertificationsEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'restaurant' && (
        <SectionCard title="Presse-Stimmen" description="Drei Zitate aus Magazinen / Zeitungen." badge="Sektion 6">
          <PressEditor data={data} setData={setData} />
        </SectionCard>
      )}
      <SectionCard title="Bewertungen" description="Alle Kund:innen-Stimmen." badge="Sektion 7">
        <TestimonialsEditor data={data} setData={setData} />
      </SectionCard>
      <SectionCard title="Abschluss-Aufruf (CTA)" badge="Sektion 8">
        <CtaBandEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>
    </>
  );
}

function ContactPageEditor({ data, setData, tpl }: SectionProps) {
  return (
    <>
      <SectionCard title="Seiten-Header" badge="Sektion 1">
        <PageHeaderEditor data={data} setData={setData} field="contactPage" defaults={{
          eyebrow: 'Kontakt',
          title: tpl === 'restaurant' ? 'Reservieren oder einfach vorbeikommen.' : tpl === 'salon' ? 'Termin vereinbaren oder kurz fragen.' : 'Anfrage senden oder Notdienst rufen.',
          subtitle: '',
        }} />
      </SectionCard>
      <SectionCard title="Kontaktdaten-Block" description="Telefon, E-Mail, Adresse, Öffnungszeiten." badge="Sektion 2">
        <ContactFields data={data} setData={setData} />
        <HoursEditor data={data} setData={setData} />
      </SectionCard>
      <SectionCard title="Kontakt-Formular" description="Welche Felder soll das Formular haben?" badge="Sektion 3">
        <FormFieldsEditor data={data} setData={setData} />
      </SectionCard>
      <SectionCard title="Wegbeschreibung" description="Drei Karten mit Anfahrt-Hinweisen." badge="Sektion 4">
        <ArrivalEditor data={data} setData={setData} defaults={defaultArrival(tpl)} />
      </SectionCard>
      <SectionCard title="Karte" description="Google-Maps-Link einbetten." badge="Sektion 5">
        <Field label="Google-Maps-URL">
          <input className={inputCls} value={data.contact.mapsUrl || ''} onChange={(e) => setData({ ...data, contact: { ...data.contact, mapsUrl: e.target.value } })} placeholder="https://maps.google.com/..." />
        </Field>
        <Toggle value={!!data.contact.mapsUrl} onChange={(v) => !v && setData({ ...data, contact: { ...data.contact, mapsUrl: '' } })} label="Karte auf der Kontakt-Seite anzeigen" />
      </SectionCard>
    </>
  );
}

function BrandPage({ data, setData }: SetterProps) {
  return (
    <>
      <SectionCard title="Name & Slogan">
        <Field label="Name"><input className={inputCls} value={data.brand.name} onChange={(e) => setData({ ...data, brand: { ...data.brand, name: e.target.value } })} /></Field>
        <Field label="Slogan / Tagline"><input className={inputCls} value={data.brand.tagline || ''} onChange={(e) => setData({ ...data, brand: { ...data.brand, tagline: e.target.value } })} /></Field>
      </SectionCard>
      <SectionCard title="Farbe & Logo">
        <Field label="Hauptfarbe" hint="Wird für Buttons und Akzente verwendet.">
          <div className="flex items-center gap-3">
            <input type="color" value={data.brand.primaryColor} onChange={(e) => setData({ ...data, brand: { ...data.brand, primaryColor: e.target.value } })} className="h-10 w-16 rounded-lg border border-line" />
            <input className={inputCls} value={data.brand.primaryColor} onChange={(e) => setData({ ...data, brand: { ...data.brand, primaryColor: e.target.value } })} />
          </div>
        </Field>
        <ImagePickerField label="Logo (optional)" value={data.brand.logoUrl || ''} onChange={(v) => setData({ ...data, brand: { ...data.brand, logoUrl: v } })} ratio="aspect-[3/1]" />
      </SectionCard>
    </>
  );
}
function ContactGlobal({ data, setData }: SetterProps) {
  return (
    <>
      <SectionCard title="Erreichbarkeit"><ContactFields data={data} setData={setData} /></SectionCard>
      <SectionCard title="Öffnungszeiten"><HoursEditor data={data} setData={setData} /></SectionCard>
    </>
  );
}
function SocialPage({ data, setData }: SetterProps) {
  const s = data.social ?? { instagram: '', facebook: '', whatsapp: '' };
  const set = (patch: Partial<typeof s>) => setData({ ...data, social: { ...s, ...patch } });
  return (
    <SectionCard title="Profile" description="Links erscheinen im Footer.">
      <Field label="Instagram"><input className={inputCls} value={s.instagram || ''} onChange={(e) => set({ instagram: e.target.value })} placeholder="https://instagram.com/..." /></Field>
      <Field label="Facebook"><input className={inputCls} value={s.facebook || ''} onChange={(e) => set({ facebook: e.target.value })} placeholder="https://facebook.com/..." /></Field>
      <Field label="WhatsApp"><input className={inputCls} value={s.whatsapp || ''} onChange={(e) => set({ whatsapp: e.target.value })} placeholder="https://wa.me/..." /></Field>
    </SectionCard>
  );
}
function SeoPage({ data, setData }: SetterProps) {
  const seo = (data as any).seo ?? { title: '', description: '', keywords: '', ogImage: '', canonical: '', locale: 'de_AT' };
  const set = (patch: any) => setData({ ...(data as any), seo: { ...seo, ...patch } } as SiteContent);
  const pageSeo = ((data as any).pageSeo ?? {}) as Record<string, { title?: string; description?: string; keywords?: string; ogImage?: string; noindex?: boolean }>;
  const setPage = (id: string, patch: any) => setData({
    ...(data as any),
    pageSeo: { ...pageSeo, [id]: { ...(pageSeo[id] || {}), ...patch } },
  } as SiteContent);
  const PAGES: Array<{ id: string; label: string; placeholderTitle: string; placeholderDesc: string }> = [
    { id: 'home', label: 'Startseite', placeholderTitle: 'z. B. Trattoria Innsbruck · Italienische Küche im Herzen Tirols', placeholderDesc: 'Kurz, klar, mit Schlagworten – wird in Google angezeigt.' },
    { id: 'services', label: 'Leistungen / Speisekarte', placeholderTitle: 'z. B. Speisekarte – Hausgemachte Pasta & Pizza', placeholderDesc: 'Was findet man auf dieser Seite?' },
    { id: 'gallery', label: 'Galerie / Referenzen', placeholderTitle: '', placeholderDesc: '' },
    { id: 'about', label: 'Über uns', placeholderTitle: '', placeholderDesc: '' },
    { id: 'contactPage', label: 'Kontakt', placeholderTitle: '', placeholderDesc: '' },
  ];
  return (
    <>
      <SectionCard title="Globale Meta-Daten" description="Standard-Werte – werden verwendet, solange eine Seite keine eigenen Werte hat." badge="Sektion 1">
        <Field label="Site-Titel" hint="Max. 60 Zeichen. Wird automatisch um Markenname ergänzt."><input className={inputCls} value={seo.title || ''} onChange={(e) => set({ title: e.target.value })} placeholder={data.brand.name} /></Field>
        <Field label="Standard-Beschreibung" hint="Max. 160 Zeichen."><textarea className={inputCls} rows={3} value={seo.description || ''} onChange={(e) => set({ description: e.target.value })} /></Field>
        <Field label="Schlüsselwörter" hint="Komma-getrennt. Auch für AI-/LLM-Crawler relevant."><input className={inputCls} value={seo.keywords || ''} onChange={(e) => set({ keywords: e.target.value })} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Canonical-URL" hint="Optional – nur wenn die Domain abweicht."><input className={inputCls} value={seo.canonical || ''} onChange={(e) => set({ canonical: e.target.value })} placeholder="https://www.beispiel.at" /></Field>
          <Field label="Sprache / Locale">
            <select className={inputCls} value={seo.locale || 'de_AT'} onChange={(e) => set({ locale: e.target.value })}>
              <option value="de_AT">Deutsch (Österreich)</option>
              <option value="de_DE">Deutsch (Deutschland)</option>
              <option value="de_CH">Deutsch (Schweiz)</option>
              <option value="en_US">English (US)</option>
            </select>
          </Field>
        </div>
      </SectionCard>
      <SectionCard title="Vorschau-Bild" description="Erscheint beim Teilen in WhatsApp, Instagram, Facebook, LinkedIn." badge="Sektion 2">
        <ImagePickerField label="OG-Bild (1200×630 empfohlen)" value={seo.ogImage || ''} onChange={(v) => set({ ogImage: v })} ratio="aspect-[1200/630]" />
      </SectionCard>
      <SectionCard title="Pro Seite" description="Wenn eine Seite eigene Meta-Daten haben soll – z. B. eigene Beschreibung für die Speisekarte – hier eintragen." badge="Sektion 3">
        <div className="space-y-6">
          {PAGES.map((p) => {
            const v = pageSeo[p.id] || {};
            return (
              <details key={p.id} className="border border-line rounded-2xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-3 bg-[#fafaf7] flex items-center justify-between">
                  <span className="font-medium">{p.label}</span>
                  <span className="text-xs text-muted">{v.title || v.description ? '✓ angepasst' : 'Standard'}</span>
                </summary>
                <div className="p-5 space-y-4">
                  <Field label="Seiten-Titel"><input className={inputCls} value={v.title || ''} onChange={(e) => setPage(p.id, { title: e.target.value })} placeholder={p.placeholderTitle} /></Field>
                  <Field label="Beschreibung"><textarea className={inputCls} rows={2} value={v.description || ''} onChange={(e) => setPage(p.id, { description: e.target.value })} placeholder={p.placeholderDesc} /></Field>
                  <Field label="Schlüsselwörter"><input className={inputCls} value={v.keywords || ''} onChange={(e) => setPage(p.id, { keywords: e.target.value })} /></Field>
                  <ImagePickerField label="OG-Bild (überschreibt das globale)" value={v.ogImage || ''} onChange={(val) => setPage(p.id, { ogImage: val })} ratio="aspect-[1200/630]" />
                  <Toggle value={!!v.noindex} onChange={(b) => setPage(p.id, { noindex: b })} label="Seite von Suchmaschinen ausschließen (noindex)" />
                </div>
              </details>
            );
          })}
        </div>
      </SectionCard>
      <SectionCard title="AI-/LLM-Sichtbarkeit" description="Strukturierte Daten (JSON-LD) werden automatisch generiert: LocalBusiness, Öffnungszeiten, Adresse, Leistungen. Damit Sprach-KIs (ChatGPT, Perplexity, Claude) Ihre Website korrekt erfassen." badge="Info">
        <p className="text-sm text-muted leading-relaxed">
          Diese Felder werden automatisch aus Ihren Inhalten erzeugt – keine manuelle Pflege nötig.
          Stellen Sie nur sicher, dass <em>Adresse</em>, <em>Telefon</em>, <em>Öffnungszeiten</em> und <em>Leistungen</em> aktuell sind.
        </p>
      </SectionCard>
    </>
  );
}

function ScriptsPage({ data, setData }: SetterProps) {
  const list = (data as any).customScripts ?? [];
  const setList = (next: any[]) => setData({ ...(data as any), customScripts: next } as SiteContent);
  const update = (i: number, patch: any) => setList(list.map((s: any, j: number) => j === i ? { ...s, ...patch } : s));
  const remove = (i: number) => setList(list.filter((_: any, j: number) => j !== i));
  const add = () => setList([
    ...list,
    {
      id: 'sc_' + Math.random().toString(36).slice(2, 9),
      name: 'Neues Skript',
      category: 'analytics',
      code: '',
      enabled: true,
      placement: 'head',
    },
  ]);
  return (
    <>
      <SectionCard title="So funktioniert's" description="DSGVO-konformes Tracking. Skripte werden erst geladen, wenn der Nutzer der jeweiligen Cookie-Kategorie zustimmt." badge="Info">
        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
          <li><strong>Notwendig:</strong> immer aktiv (z. B. Hosting-eigene Tools).</li>
          <li><strong>Funktional:</strong> Komfort wie eingebettete Karten oder Videos.</li>
          <li><strong>Analyse:</strong> z. B. Google Analytics, Plausible, Matomo.</li>
          <li><strong>Marketing:</strong> z. B. Meta Pixel, Google Ads, TikTok Pixel.</li>
        </ul>
        <p className="text-xs text-muted">
          Sie können entweder einen JS-Schnipsel einfügen <em>oder</em> eine vollständige URL (https://…/script.js) — externe Skripte werden dann als <code>&lt;script src="…"&gt;</code> eingebunden.
        </p>
      </SectionCard>

      <SectionCard title="Skripte" description="Liste aller eingebundenen Skripte. Reihenfolge entspricht der Einbindung." badge={`${list.length} aktiv`}>
        {list.length === 0 && (
          <p className="text-sm text-muted">Noch keine Skripte eingerichtet. Fügen Sie z. B. Ihren Plausible-Snippet ein.</p>
        )}
        <div className="space-y-4">
          {list.map((s: any, i: number) => (
            <div key={s.id} className="border border-line rounded-2xl p-4 space-y-3 bg-white">
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  className={inputCls + ' flex-1 min-w-[12rem]'}
                  value={s.name}
                  onChange={(e) => update(i, { name: e.target.value })}
                  placeholder="z. B. Plausible Analytics"
                />
                <select
                  className={inputCls + ' max-w-[10rem]'}
                  value={s.category}
                  onChange={(e) => update(i, { category: e.target.value })}
                >
                  <option value="necessary">Notwendig</option>
                  <option value="functional">Funktional</option>
                  <option value="analytics">Analyse</option>
                  <option value="marketing">Marketing</option>
                </select>
                <select
                  className={inputCls + ' max-w-[8rem]'}
                  value={s.placement}
                  onChange={(e) => update(i, { placement: e.target.value })}
                >
                  <option value="head">&lt;head&gt;</option>
                  <option value="body">Ende &lt;body&gt;</option>
                </select>
                <Toggle value={s.enabled} onChange={(v) => update(i, { enabled: v })} label="Aktiv" />
                <button type="button" onClick={() => remove(i)} className="text-xs text-rose-600 hover:underline ml-auto">Entfernen</button>
              </div>
              <Field label="Code oder URL" hint="Inline-JS-Code ODER vollständige URL (https://…). Ein leerer Wert wird ignoriert.">
                <textarea
                  className={inputCls + ' font-mono text-xs'}
                  rows={5}
                  value={s.code}
                  onChange={(e) => update(i, { code: e.target.value })}
                  placeholder='z. B. https://plausible.io/js/script.js  oder  window.dataLayer = window.dataLayer || []; …'
                />
              </Field>
            </div>
          ))}
        </div>
        <button type="button" onClick={add} className="btn-outline !py-2 !px-4 text-sm">+ Skript hinzufügen</button>
      </SectionCard>
    </>
  );
}

/* ─── News / Blog editor (CRUD) ─────────────────────────────── */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function NewsPage({ data, setData }: SetterProps) {
  const list = ((data as any).posts ?? []) as any[];
  const setList = (next: any[]) => setData({ ...(data as any), posts: next } as SiteContent);
  const update = (i: number, patch: any) => setList(list.map((p, j) => j === i ? { ...p, ...patch } : p));
  const remove = (i: number) => {
    if (!confirm('Diesen Beitrag wirklich löschen?')) return;
    setList(list.filter((_, j) => j !== i));
  };
  const add = () => {
    const today = new Date().toISOString().slice(0, 10);
    setList([
      {
        id: 'p_' + Math.random().toString(36).slice(2, 9),
        title: 'Neuer Beitrag',
        slug: 'neuer-beitrag-' + Date.now(),
        date: today,
        excerpt: '',
        body: '',
        imageUrl: '',
        published: false,
      },
      ...list,
    ]);
  };
  return (
    <>
      <SectionCard title="So funktioniert's" description="Beiträge erscheinen auf der Startseite (die 3 neuesten) und unter /news. Reihenfolge: nach Datum, neueste oben." badge="Info">
        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
          <li><strong>Veröffentlicht:</strong> sichtbar auf der Website. Deaktivieren = Entwurf.</li>
          <li><strong>Datum:</strong> bestimmt die Reihenfolge.</li>
          <li><strong>Slug:</strong> Teil der URL — wird automatisch aus dem Titel gebildet.</li>
          <li><strong>Text:</strong> Leerzeile = neuer Absatz.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Beiträge" description="Neue Artikel anlegen, bestehende bearbeiten oder löschen." badge={`${list.length} ${list.length === 1 ? 'Beitrag' : 'Beiträge'}`}>
        <button type="button" onClick={add} className="btn-primary !py-2 !px-4 text-sm">+ Neuer Beitrag</button>
        {list.length === 0 ? (
          <p className="text-sm text-muted mt-4">Noch keine Beiträge angelegt.</p>
        ) : (
          <div className="space-y-4 mt-2">
            {list.map((p, i) => (
              <details key={p.id} className="border border-line rounded-2xl overflow-hidden bg-white" open={i === 0}>
                <summary className="cursor-pointer px-5 py-4 bg-[#fafaf7] flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`inline-flex items-center justify-center w-2 h-2 rounded-full ${p.published ? 'bg-emerald-500' : 'bg-amber-400'}`} aria-hidden />
                    <span className="font-medium truncate max-w-[18rem]">{p.title || '(ohne Titel)'}</span>
                    <span className="text-xs text-muted">{p.date}</span>
                  </div>
                  <span className="text-xs text-muted">{p.published ? 'veröffentlicht' : 'Entwurf'}</span>
                </summary>
                <div className="p-5 space-y-3">
                  <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
                    <Field label="Titel">
                      <input
                        className={inputCls}
                        value={p.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          // Auto-update slug only if user hasn't customised it
                          const autoSlug = !p.slug || p.slug === slugify(p.title || '');
                          update(i, { title, ...(autoSlug ? { slug: slugify(title) } : {}) });
                        }}
                      />
                    </Field>
                    <Field label="Datum">
                      <input
                        className={inputCls}
                        type="date"
                        value={p.date || ''}
                        onChange={(e) => update(i, { date: e.target.value })}
                      />
                    </Field>
                    <Toggle value={!!p.published} onChange={(v) => update(i, { published: v })} label={p.published ? 'Veröffentlicht' : 'Entwurf'} />
                  </div>
                  <Field label="Slug (URL)" hint="Wird aus dem Titel erzeugt. Manuell anpassbar.">
                    <input className={inputCls} value={p.slug} onChange={(e) => update(i, { slug: slugify(e.target.value) })} />
                  </Field>
                  <ImagePickerField label="Titelbild" value={p.imageUrl || ''} onChange={(v) => update(i, { imageUrl: v })} ratio="aspect-[16/9]" />
                  <Field label="Kurzbeschreibung" hint="Wird in der Übersicht angezeigt. 1–2 Sätze.">
                    <textarea className={inputCls} rows={2} value={p.excerpt} onChange={(e) => update(i, { excerpt: e.target.value })} />
                  </Field>
                  <Field label="Inhalt" hint="Leerzeile = neuer Absatz.">
                    <textarea className={inputCls} rows={10} value={p.body} onChange={(e) => update(i, { body: e.target.value })} />
                  </Field>
                  <div className="flex justify-end">
                    <button type="button" onClick={() => remove(i)} className="text-xs text-rose-600 hover:underline">Beitrag löschen</button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </SectionCard>
    </>
  );
}

/* ─── Timeline editor ───────────────────────────────────────── */
function TimelineEditor({ data, setData }: SetterProps) {
  const list = ((data as any).timeline ?? []) as { year: string; title: string; description: string }[];
  const setList = (next: any[]) => setData({ ...(data as any), timeline: next } as SiteContent);
  const update = (i: number, patch: any) => setList(list.map((t, j) => j === i ? { ...t, ...patch } : t));
  const remove = (i: number) => setList(list.filter((_, j) => j !== i));
  const add = () => setList([...list, { year: '', title: '', description: '' }]);
  return (
    <>
      <p className="text-sm text-muted">Die Timeline erscheint auf der „Über uns"-Seite zwischen Werten und Team. Lassen Sie sie leer, wenn Sie sie nicht brauchen.</p>
      <div className="space-y-3">
        {list.map((t, i) => (
          <div key={i} className="border border-line rounded-2xl p-4 grid md:grid-cols-[7rem_1fr_auto] gap-3 items-start bg-white">
            <Field label="Jahr / Marker">
              <input className={inputCls} value={t.year} onChange={(e) => update(i, { year: e.target.value })} placeholder="z. B. 2008 oder Heute" />
            </Field>
            <div className="space-y-2">
              <Field label="Titel">
                <input className={inputCls} value={t.title} onChange={(e) => update(i, { title: e.target.value })} placeholder="z. B. Eröffnung." />
              </Field>
              <Field label="Beschreibung">
                <textarea className={inputCls} rows={2} value={t.description} onChange={(e) => update(i, { description: e.target.value })} />
              </Field>
            </div>
            <button type="button" onClick={() => remove(i)} className="text-xs text-rose-600 hover:underline self-start mt-7">Entfernen</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="btn-outline !py-2 !px-4 text-sm">+ Eintrag</button>
    </>
  );
}

/* ─── Reusable editors ───────────── */
function ContactFields({ data, setData }: SetterProps) {
  const c = data.contact;
  const set = (patch: Partial<SiteContent['contact']>) => setData({ ...data, contact: { ...c, ...patch } });
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Telefon"><input className={inputCls} value={c.phone || ''} onChange={(e) => set({ phone: e.target.value })} /></Field>
      <Field label="E-Mail"><input className={inputCls} value={c.email || ''} onChange={(e) => set({ email: e.target.value })} /></Field>
      <Field label="Adresse"><input className={inputCls} value={c.address || ''} onChange={(e) => set({ address: e.target.value })} /></Field>
      <Field label="Stadt / PLZ"><input className={inputCls} value={c.city || ''} onChange={(e) => set({ city: e.target.value })} /></Field>
    </div>
  );
}
function HoursEditor({ data, setData }: SetterProps) {
  const c = data.contact;
  const set = (patch: Partial<SiteContent['contact']>) => setData({ ...data, contact: { ...c, ...patch } });
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted mb-3">Zeilen</p>
      <div className="space-y-2">
        {c.hours.map((h, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
            <input className={inputCls} placeholder="Tag(e)" value={h.day} onChange={(e) => set({ hours: c.hours.map((x, j) => j === i ? { ...x, day: e.target.value } : x) })} />
            <input className={inputCls} placeholder="Uhrzeit" value={h.time} onChange={(e) => set({ hours: c.hours.map((x, j) => j === i ? { ...x, time: e.target.value } : x) })} />
            <button onClick={() => set({ hours: c.hours.filter((_, j) => j !== i) })} className="h-10 w-10 grid place-items-center rounded-lg hover:bg-rose-50 text-rose-600">×</button>
          </div>
        ))}
      </div>
      <button onClick={() => set({ hours: [...c.hours, { day: '', time: '' }] })} className="btn-outline !px-4 !py-2 text-sm mt-3">+ Zeile hinzufügen</button>
    </div>
  );
}

function ServicesListEditor({ data, setData }: SetterProps) {
  const update = (i: number, patch: any) => setData({ ...data, services: data.services.map((s, j) => j === i ? { ...s, ...patch } : s) });
  const remove = (i: number) => setData({ ...data, services: data.services.filter((_, j) => j !== i) });
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= data.services.length) return;
    const next = [...data.services]; [next[i], next[j]] = [next[j], next[i]]; setData({ ...data, services: next });
  };
  const add = () => setData({ ...data, services: [...data.services, { title: 'Neuer Eintrag', description: '', price: '', imageUrl: '' }] });
  return (
    <div className="space-y-3">
      {data.services.map((s, i) => (
        <details key={i} className="border border-line rounded-xl bg-[#fafaf7] open:bg-white" open={i === 0}>
          <summary className="px-4 py-3 cursor-pointer flex items-center gap-3 list-none">
            <span className="font-mono text-xs text-muted w-8">{String(i + 1).padStart(2, '0')}</span>
            {s.imageUrl ? <img src={s.imageUrl} alt="" className="h-9 w-9 object-cover rounded" /> : <div className="h-9 w-9 rounded bg-[#eaeae3]" />}
            <span className="flex-1 truncate text-sm font-medium">{s.title}</span>
            <span className="text-xs font-mono text-muted">{s.price}</span>
            <span className="ml-2 text-muted text-xs">▾</span>
          </summary>
          <div className="px-4 pb-4 space-y-3 border-t border-line pt-3">
            <div className="grid sm:grid-cols-3 gap-3">
              <input className={inputCls + ' sm:col-span-2'} placeholder="Titel" value={s.title} onChange={(e) => update(i, { title: e.target.value })} />
              <input className={inputCls} placeholder="Preis" value={s.price || ''} onChange={(e) => update(i, { price: e.target.value })} />
            </div>
            <textarea className={inputCls} rows={2} placeholder="Beschreibung" value={s.description || ''} onChange={(e) => update(i, { description: e.target.value })} />
            <ImagePickerField label="Bild" value={s.imageUrl || ''} onChange={(v) => update(i, { imageUrl: v })} />
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <button onClick={() => move(i, -1)} className="text-xs px-3 py-1.5 rounded-md hover:bg-[#f6f6f3] border border-line">↑ hoch</button>
                <button onClick={() => move(i, 1)} className="text-xs px-3 py-1.5 rounded-md hover:bg-[#f6f6f3] border border-line">↓ runter</button>
              </div>
              <button onClick={() => remove(i)} className="text-xs text-rose-600 hover:underline">Entfernen</button>
            </div>
          </div>
        </details>
      ))}
      <button onClick={add} className="btn-outline !px-4 !py-2 text-sm">+ Eintrag hinzufügen</button>
    </div>
  );
}

function TestimonialsEditor({ data, setData, max }: SetterProps & { max?: number }) {
  const list = max ? data.testimonials.slice(0, max) : data.testimonials;
  const update = (i: number, patch: any) => setData({ ...data, testimonials: data.testimonials.map((t, j) => j === i ? { ...t, ...patch } : t) });
  const remove = (i: number) => setData({ ...data, testimonials: data.testimonials.filter((_, j) => j !== i) });
  const add = () => setData({ ...data, testimonials: [...data.testimonials, { author: '', text: '' }] });
  return (
    <div className="space-y-3">
      {list.map((t, i) => (
        <div key={i} className="border border-line rounded-xl p-4 bg-[#fafaf7] space-y-2">
          <input className={inputCls} placeholder="Name" value={t.author} onChange={(e) => update(i, { author: e.target.value })} />
          <textarea className={inputCls} rows={3} placeholder="Zitat" value={t.text} onChange={(e) => update(i, { text: e.target.value })} />
          <div className="flex justify-end"><button onClick={() => remove(i)} className="text-xs text-rose-600 hover:underline">Entfernen</button></div>
        </div>
      ))}
      <button onClick={add} className="btn-outline !px-4 !py-2 text-sm">+ Bewertung hinzufügen</button>
    </div>
  );
}

function RepeatableList<T>({ items, onChange, render, newItem, addLabel }: { items: T[]; onChange: (arr: T[]) => void; render: (item: T, index: number, set: (v: T) => void) => React.ReactNode; newItem: () => T; addLabel: string }) {
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto] gap-2 items-center">
          {render(it, i, (v) => onChange(items.map((x, j) => j === i ? v : x)))}
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="h-10 w-10 grid place-items-center rounded-lg hover:bg-rose-50 text-rose-600">×</button>
        </div>
      ))}
      <button onClick={() => onChange([...items, newItem()])} className="btn-outline !px-4 !py-2 text-sm">{addLabel}</button>
    </div>
  );
}
function ReorderList<T>({ items, onChange, render, getKey }: { items: T[]; onChange: (arr: T[]) => void; render: (item: T) => React.ReactNode; getKey: (item: T, index: number) => string }) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= items.length) return;
    const next = [...items]; [next[i], next[j]] = [next[j], next[i]]; onChange(next);
  };
  return (
    <ul className="divide-y divide-line border border-line rounded-xl overflow-hidden bg-white">
      {items.map((it, i) => (
        <li key={getKey(it, i)} className="flex items-center gap-3 px-3 py-2">
          <span className="font-mono text-xs text-muted w-6">{String(i + 1).padStart(2, '0')}</span>
          <div className="flex-1 min-w-0">{render(it)}</div>
          <button onClick={() => move(i, -1)} className="h-7 w-7 grid place-items-center rounded hover:bg-[#f6f6f3] text-xs">↑</button>
          <button onClick={() => move(i, 1)} className="h-7 w-7 grid place-items-center rounded hover:bg-[#f6f6f3] text-xs">↓</button>
        </li>
      ))}
    </ul>
  );
}

function useExtra<T>(data: SiteContent, setData: (d: SiteContent) => void, field: string, defaults: T): [T, (v: T) => void] {
  const value = useMemo(() => {
    const v = (data as any)[field]; return v ?? defaults;
  }, [data, field, defaults]);
  const set = (v: T) => setData({ ...(data as any), [field]: v } as SiteContent);
  return [value, set];
}

function PageHeaderEditor({ data, setData, field, defaults }: SetterProps & { field: string; defaults: { eyebrow: string; title: string; subtitle: string } }) {
  const [v, set] = useExtra(data, setData, `${field}Header`, defaults);
  return (
    <>
      <Field label="Eyebrow"><input className={inputCls} value={v.eyebrow} onChange={(e) => set({ ...v, eyebrow: e.target.value })} /></Field>
      <Field label="Überschrift"><input className={inputCls} value={v.title} onChange={(e) => set({ ...v, title: e.target.value })} /></Field>
      <Field label="Untertitel"><textarea className={inputCls} rows={2} value={v.subtitle} onChange={(e) => set({ ...v, subtitle: e.target.value })} /></Field>
    </>
  );
}

function HighlightsEditor({ data, setData, field, defaults }: SetterProps & { field: string; defaults: { t: string; d: string }[] }) {
  const [list, set] = useExtra<{ t: string; d: string }[]>(data, setData, field, defaults);
  return (
    <RepeatableList items={list} onChange={set} newItem={() => ({ t: '', d: '' })} addLabel="+ Highlight hinzufügen"
      render={(v, _i, setItem) => (
        <div className="grid sm:grid-cols-2 gap-2 flex-1">
          <input className={inputCls} placeholder="Titel" value={v.t} onChange={(e) => setItem({ ...v, t: e.target.value })} />
          <input className={inputCls} placeholder="Beschreibung" value={v.d} onChange={(e) => setItem({ ...v, d: e.target.value })} />
        </div>
      )}
    />
  );
}

function StepsEditor({ data, setData, field, defaults }: SetterProps & { field: string; defaults: { t: string; d: string }[] }) {
  const [list, set] = useExtra<{ t: string; d: string }[]>(data, setData, field, defaults);
  return (
    <RepeatableList items={list} onChange={set} newItem={() => ({ t: '', d: '' })} addLabel="+ Schritt hinzufügen"
      render={(v, i, setItem) => (
        <div className="grid sm:grid-cols-[80px_1fr_2fr] gap-2 flex-1 items-start">
          <span className="font-mono text-xs text-muted self-center">Schritt {i + 1}</span>
          <input className={inputCls} placeholder="Titel" value={v.t} onChange={(e) => setItem({ ...v, t: e.target.value })} />
          <input className={inputCls} placeholder="Beschreibung" value={v.d} onChange={(e) => setItem({ ...v, d: e.target.value })} />
        </div>
      )}
    />
  );
}

function ProgramsEditor({ data, setData }: SetterProps) {
  const [list, set] = useExtra<{ k: string; t: string; d: string; meta: string }[]>(data, setData, 'programs', [
    { k: 'YOGA', t: 'Vinyasa Flow', d: 'Dynamisches Yoga im Atemrhythmus. Für alle, die Bewegung lieben.', meta: '75 min · Mo / Mi / Fr' },
    { k: 'YIN', t: 'Yin Yoga', d: 'Lange gehaltene, ruhige Positionen. Tiefe Faszien-Arbeit.', meta: '60 min · Di / Do' },
    { k: 'PIL', t: 'Reformer Pilates', d: 'Kleingruppen mit max. 5 Personen. Präzise Korrekturen, klare Progression.', meta: '60 min · n. Vereinb.' },
    { k: 'PT', t: 'Personal Training', d: '60 oder 90 Minuten – ganz auf Sie zugeschnitten.', meta: 'flexibel · n. Vereinb.' },
  ]);
  return (
    <RepeatableList items={list} onChange={set} newItem={() => ({ k: '', t: '', d: '', meta: '' })} addLabel="+ Programm hinzufügen"
      render={(v, _i, setItem) => (
        <div className="grid sm:grid-cols-[80px_1fr] gap-2 flex-1">
          <input className={inputCls} placeholder="Kürzel" value={v.k} onChange={(e) => setItem({ ...v, k: e.target.value })} />
          <input className={inputCls} placeholder="Titel" value={v.t} onChange={(e) => setItem({ ...v, t: e.target.value })} />
          <div className="sm:col-span-2 grid sm:grid-cols-2 gap-2">
            <input className={inputCls} placeholder="Beschreibung" value={v.d} onChange={(e) => setItem({ ...v, d: e.target.value })} />
            <input className={inputCls} placeholder="Meta (z. B. 45 min · Mo/Mi/Fr)" value={v.meta} onChange={(e) => setItem({ ...v, meta: e.target.value })} />
          </div>
        </div>
      )}
    />
  );
}

function BranchChipsEditor({ data, setData, tpl }: SetterProps & { tpl: TemplateKey }) {
  const branchDefaults: Record<string, string[]> = {
    consulting: ['Strategie', 'Workshops', 'Analyse', 'Umsetzung'],
    medical: ['Vorsorge', 'Diagnostik', 'Therapie', 'Begleitung'],
    fitness: ['Yoga', 'Pilates', 'Kleingruppen', 'Personal Training'],
  };
  const fallback = branchDefaults[tpl] ?? [];
  const [list, set] = useExtra<string[]>(data, setData, 'branchChips', fallback);
  return (
    <RepeatableList items={list} onChange={set} newItem={() => ''} addLabel="+ Stichwort hinzufügen"
      render={(v, i, setItem) => (
        <input className={inputCls} placeholder={`Stichwort ${i + 1}`} value={v} onChange={(e) => setItem(e.target.value)} />
      )}
    />
  );
}

function MedicalNoticeEditor({ data, setData }: SetterProps) {
  const [v, set] = useExtra<{ online: string; emergency: string }>(data, setData, 'medicalNotice', {
    online: 'Buchen Sie Ihren Termin direkt über unser Online-Portal — Doctolib & jameda angebunden.',
    emergency: 'Im akuten Notfall wählen Sie bitte 112 oder den ärztlichen Bereitschaftsdienst 116 117.',
  });
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-muted block mb-1">Online-Termin (Hinweistext)</label>
        <textarea className={inputCls} rows={2} value={v.online} onChange={(e) => set({ ...v, online: e.target.value })} />
      </div>
      <div>
        <label className="text-xs text-muted block mb-1">Notfall-Hinweis</label>
        <textarea className={inputCls} rows={2} value={v.emergency} onChange={(e) => set({ ...v, emergency: e.target.value })} />
      </div>
    </div>
  );
}

function FaqEditor({ data, setData, defaults }: SetterProps & { defaults: { q: string; a: string }[] }) {
  const [list, set] = useExtra<{ q: string; a: string }[]>(data, setData, 'faq', defaults);
  return (
    <div className="space-y-3">
      {list.map((f, i) => (
        <div key={i} className="border border-line rounded-xl p-4 bg-[#fafaf7] space-y-2">
          <input className={inputCls} placeholder="Frage" value={f.q} onChange={(e) => set(list.map((x, j) => j === i ? { ...x, q: e.target.value } : x))} />
          <textarea className={inputCls} rows={3} placeholder="Antwort" value={f.a} onChange={(e) => set(list.map((x, j) => j === i ? { ...x, a: e.target.value } : x))} />
          <div className="flex justify-end"><button onClick={() => set(list.filter((_, j) => j !== i))} className="text-xs text-rose-600 hover:underline">Entfernen</button></div>
        </div>
      ))}
      <button onClick={() => set([...list, { q: '', a: '' }])} className="btn-outline !px-4 !py-2 text-sm">+ Frage hinzufügen</button>
    </div>
  );
}

function ValuesEditor({ data, setData, defaults }: SetterProps & { defaults: { t: string; d: string }[] }) {
  const [list, set] = useExtra<{ t: string; d: string }[]>(data, setData, 'values', defaults);
  return (
    <RepeatableList items={list} onChange={set} newItem={() => ({ t: '', d: '' })} addLabel="+ Grundsatz hinzufügen"
      render={(v, _i, setItem) => (
        <div className="grid sm:grid-cols-[1fr_2fr] gap-2 flex-1">
          <input className={inputCls} placeholder="Überschrift" value={v.t} onChange={(e) => setItem({ ...v, t: e.target.value })} />
          <input className={inputCls} placeholder="Erläuterung" value={v.d} onChange={(e) => setItem({ ...v, d: e.target.value })} />
        </div>
      )}
    />
  );
}

function TeamEditor({ data, setData, defaults }: SetterProps & { defaults: { n: string; r: string; img: string; bio: string }[] }) {
  const [list, set] = useExtra<{ n: string; r: string; img: string; bio: string }[]>(data, setData, 'team', defaults);
  return (
    <div className="space-y-3">
      {list.map((m, i) => (
        <details key={i} className="border border-line rounded-xl bg-[#fafaf7]" open={i === 0}>
          <summary className="px-4 py-3 cursor-pointer flex items-center gap-3 list-none">
            {m.img ? <img src={m.img} alt="" className="h-9 w-9 rounded-full object-cover" /> : <div className="h-9 w-9 rounded-full bg-[#eaeae3]" />}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{m.n || 'Neues Team-Mitglied'}</p>
              <p className="text-xs text-muted truncate">{m.r}</p>
            </div>
            <span className="text-muted text-xs">▾</span>
          </summary>
          <div className="px-4 pb-4 pt-3 space-y-3 border-t border-line">
            <div className="grid sm:grid-cols-2 gap-3">
              <input className={inputCls} placeholder="Name" value={m.n} onChange={(e) => set(list.map((x, j) => j === i ? { ...x, n: e.target.value } : x))} />
              <input className={inputCls} placeholder="Rolle" value={m.r} onChange={(e) => set(list.map((x, j) => j === i ? { ...x, r: e.target.value } : x))} />
            </div>
            <textarea className={inputCls} rows={2} placeholder="Kurzbio" value={m.bio} onChange={(e) => set(list.map((x, j) => j === i ? { ...x, bio: e.target.value } : x))} />
            <ImagePickerField label="Foto" value={m.img} onChange={(v) => set(list.map((x, j) => j === i ? { ...x, img: v } : x))} />
            <div className="flex justify-end"><button onClick={() => set(list.filter((_, j) => j !== i))} className="text-xs text-rose-600 hover:underline">Entfernen</button></div>
          </div>
        </details>
      ))}
      <button onClick={() => set([...list, { n: '', r: '', img: '', bio: '' }])} className="btn-outline !px-4 !py-2 text-sm">+ Person hinzufügen</button>
    </div>
  );
}

function NumbersEditor({ data, setData, tpl }: SectionProps) {
  const [list, set] = useExtra<{ value: string; label: string }[]>(data, setData, 'numbers', defaultNumbers(tpl));
  return (
    <RepeatableList items={list} onChange={set} newItem={() => ({ value: '', label: '' })} addLabel="+ Zahl hinzufügen"
      render={(v, _i, setItem) => (
        <div className="grid sm:grid-cols-[120px_1fr] gap-2 flex-1">
          <input className={inputCls} placeholder="Zahl" value={v.value} onChange={(e) => setItem({ ...v, value: e.target.value })} />
          <input className={inputCls} placeholder="Beschriftung" value={v.label} onChange={(e) => setItem({ ...v, label: e.target.value })} />
        </div>
      )}
    />
  );
}

function CertificationsEditor({ data, setData }: SetterProps) {
  const [list, set] = useExtra<{ t: string; d: string }[]>(data, setData, 'certifications', [
    { t: 'Meisterbetrieb HWK', d: '' },
    { t: 'Innungsmitglied', d: '' },
  ]);
  return (
    <RepeatableList items={list} onChange={set} newItem={() => ({ t: '', d: '' })} addLabel="+ Qualifikation hinzufügen"
      render={(v, _i, setItem) => (
        <div className="grid sm:grid-cols-[1fr_2fr] gap-2 flex-1">
          <input className={inputCls} placeholder="Bezeichnung" value={v.t} onChange={(e) => setItem({ ...v, t: e.target.value })} />
          <input className={inputCls} placeholder="Erläuterung" value={v.d} onChange={(e) => setItem({ ...v, d: e.target.value })} />
        </div>
      )} />
  );
}
function PressEditor({ data, setData }: SetterProps) {
  const [list, set] = useExtra<{ src: string; q: string; y: string }[]>(data, setData, 'press', [
    { src: 'Falstaff', q: '', y: '2024' },
  ]);
  return (
    <RepeatableList items={list} onChange={set} newItem={() => ({ src: '', q: '', y: '' })} addLabel="+ Pressestimme hinzufügen"
      render={(v, _i, setItem) => (
        <div className="grid sm:grid-cols-[140px_1fr_80px] gap-2 flex-1">
          <input className={inputCls} placeholder="Quelle" value={v.src} onChange={(e) => setItem({ ...v, src: e.target.value })} />
          <input className={inputCls} placeholder="Zitat" value={v.q} onChange={(e) => setItem({ ...v, q: e.target.value })} />
          <input className={inputCls} placeholder="Jahr" value={v.y} onChange={(e) => setItem({ ...v, y: e.target.value })} />
        </div>
      )} />
  );
}

function ArrivalEditor({ data, setData, defaults }: SetterProps & { defaults: { t: string; d: string }[] }) {
  const [list, set] = useExtra<{ t: string; d: string }[]>(data, setData, 'arrival', defaults);
  return (
    <RepeatableList items={list} onChange={set} newItem={() => ({ t: '', d: '' })} addLabel="+ Hinweis hinzufügen"
      render={(v, _i, setItem) => (
        <div className="grid sm:grid-cols-[1fr_2fr] gap-2 flex-1">
          <input className={inputCls} placeholder="Titel" value={v.t} onChange={(e) => setItem({ ...v, t: e.target.value })} />
          <input className={inputCls} placeholder="Beschreibung" value={v.d} onChange={(e) => setItem({ ...v, d: e.target.value })} />
        </div>
      )} />
  );
}
function FormFieldsEditor({ data, setData }: SetterProps) {
  const [list, set] = useExtra<{ key: string; label: string; required: boolean; type: 'text' | 'email' | 'tel' | 'textarea' | 'date' }[]>(data, setData, 'formFields', [
    { key: 'name', label: 'Name', required: true, type: 'text' },
    { key: 'email', label: 'E-Mail', required: true, type: 'email' },
    { key: 'phone', label: 'Telefon', required: false, type: 'tel' },
    { key: 'message', label: 'Nachricht', required: true, type: 'textarea' },
  ]);
  return (
    <div className="space-y-2">
      {list.map((f, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_120px_auto_auto] gap-2 items-center">
          <input className={inputCls} placeholder="Beschriftung" value={f.label} onChange={(e) => set(list.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
          <input className={inputCls} placeholder="Schlüssel" value={f.key} onChange={(e) => set(list.map((x, j) => j === i ? { ...x, key: e.target.value } : x))} />
          <select className={inputCls} value={f.type} onChange={(e) => set(list.map((x, j) => j === i ? { ...x, type: e.target.value as any } : x))}>
            <option value="text">Text</option>
            <option value="email">E-Mail</option>
            <option value="tel">Telefon</option>
            <option value="textarea">Textfeld</option>
            <option value="date">Datum</option>
          </select>
          <Toggle value={f.required} onChange={(v) => set(list.map((x, j) => j === i ? { ...x, required: v } : x))} label="Pflicht" />
          <button onClick={() => set(list.filter((_, j) => j !== i))} className="h-10 w-10 grid place-items-center rounded-lg hover:bg-rose-50 text-rose-600">×</button>
        </div>
      ))}
      <button onClick={() => set([...list, { key: '', label: '', required: false, type: 'text' }])} className="btn-outline !px-4 !py-2 text-sm">+ Feld hinzufügen</button>
    </div>
  );
}

function CtaBandEditor({ data, setData, tpl }: SectionProps) {
  const [v, set] = useExtra<{ eyebrow: string; lead: string; sub: string; cta: string; ctaHref: string }>(data, setData, 'ctaBand', defaultCta(tpl));
  return (
    <>
      <Field label="Eyebrow"><input className={inputCls} value={v.eyebrow} onChange={(e) => set({ ...v, eyebrow: e.target.value })} /></Field>
      <Field label="Hauptzeile"><input className={inputCls} value={v.lead} onChange={(e) => set({ ...v, lead: e.target.value })} /></Field>
      <Field label="Untertitel"><textarea className={inputCls} rows={2} value={v.sub} onChange={(e) => set({ ...v, sub: e.target.value })} /></Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Button-Text"><input className={inputCls} value={v.cta} onChange={(e) => set({ ...v, cta: e.target.value })} /></Field>
        <LinkTargetField label="Button-Ziel" value={v.ctaHref} onChange={(href) => set({ ...v, ctaHref: href })} sections={homeSectionsFor(tpl)} />
      </div>
    </>
  );
}

/* ───────────── Defaults ───────────── */
function defaultAnnouncements(t: TemplateKey): string[] {
  if (t === 'restaurant') return ['Heute geöffnet · 17:30 – 22:00', 'Tisch online reservieren', 'Trüffel-Saison läuft', 'Innsbruck'];
  if (t === 'salon') return ['Aktuell freie Termine', 'Bridal-Beratung kostenlos', 'Kérastase Education-Partner', 'München-Schwabing'];
  if (t === 'consulting') return ['Strategie-Workshop verfügbar', 'Erstgespräch kostenlos', 'Hybrid: Remote & vor Ort', 'München · Berlin · Wien'];
  if (t === 'medical') return ['Online-Termine verfügbar', 'Privat & alle Kassen', 'Hausarzt & Vorsorge', 'Hamburg-Eppendorf'];
  if (t === 'fitness') return ['Probetraining gratis', 'Mo – So 06:00 – 23:00', 'Kurse · PT · Yoga', 'Köln-Süd'];
  return ['24/7 Notdienst · 60 min Anfahrt', 'KfW-Förderung bis 35 %', 'Festpreis-Garantie', 'Ingolstadt & Umgebung'];
}
function defaultHighlights(t: TemplateKey) {
  if (t === 'restaurant') return [
    { t: 'Saisonale Karte', d: 'Wechselt mit den Jahreszeiten.' },
    { t: 'Hausgemachte Pasta', d: 'Täglich frisch gezogen.' },
    { t: 'Wein vom Winzer', d: 'Über 50 Positionen, 28 offen.' },
    { t: 'Allergene gekennzeichnet', d: 'Klar markiert in der Karte.' },
  ];
  if (t === 'salon') return [
    { t: 'Kostenlose Beratung', d: '15 Minuten vor Ihrem Termin.' },
    { t: 'Terminerinnerung', d: 'Per SMS am Tag vorher.' },
    { t: 'Gutscheine', d: 'Online erhältlich, kein Verfall.' },
    { t: 'Bridal-Beratung', d: 'Probestyling bis zur Trauung.' },
  ];
  if (t === 'consulting') return [
    { t: 'Erstgespräch kostenlos', d: '45 Minuten, unverbindlich.' },
    { t: 'Festpreis-Workshops', d: 'Klare Outputs, keine Stunden-Falle.' },
    { t: 'Hands-on Umsetzung', d: 'Wir bleiben bis zum Live-Gang dabei.' },
    { t: 'Vertraulich', d: 'NDA standardmäßig inklusive.' },
  ];
  if (t === 'medical') return [
    { t: 'Online-Termin', d: 'Doctolib & jameda angebunden.' },
    { t: 'Kurze Wartezeiten', d: 'Im Schnitt unter 12 Minuten.' },
    { t: 'Privat & alle Kassen', d: 'Volle Abdeckung.' },
    { t: 'Barrierefrei', d: 'Aufzug, behindertengerechtes WC.' },
  ];
  if (t === 'fitness') return [
    { t: 'Probetraining gratis', d: 'Erste Stunde geht aufs Haus.' },
    { t: 'Kleine Gruppen', d: 'Maximal 8 Teilnehmende pro Klasse.' },
    { t: 'Persönliche Betreuung', d: 'Lehrer:innen sehen jede Person.' },
    { t: 'Faires Pricing', d: 'Einzelstunden, 10er-Karte, Monatspass.' },
  ];
  return [
    { t: 'Festpreis-Garantie', d: 'Schriftlich vor Auftrag.' },
    { t: 'Förderberatung', d: 'KfW, BAFA, regional.' },
    { t: 'Notdienst 24/7', d: 'Auch am Wochenende.' },
    { t: 'Erweiterte Garantie', d: 'Fünf Jahre auf unsere Arbeit.' },
  ];
}
function defaultProcess(t: TemplateKey) {
  if (t === 'restaurant') return [
    { t: 'Reservieren', d: 'Online oder telefonisch – wir bestätigen sofort.' },
    { t: 'Ankommen', d: 'Wir empfangen Sie persönlich am Eingang.' },
    { t: 'Genießen', d: 'Beratung von Service und Sommelière.' },
    { t: 'Wiederkommen', d: 'Nächsten Tisch direkt vor Ort buchen.' },
  ];
  if (t === 'salon') return [
    { t: 'Beratung', d: '15 Minuten Gespräch über Ihre Wünsche.' },
    { t: 'Termin', d: 'In Ruhe geplant, ohne Stress.' },
    { t: 'Behandlung', d: 'Schritt für Schritt erklärt.' },
    { t: 'Pflege zuhause', d: 'Empfehlung der passenden Produkte.' },
  ];
  if (t === 'consulting') return [
    { t: 'Discover', d: 'Wir hören zu, analysieren Daten und Stakeholder.' },
    { t: 'Define', d: 'Klares Zielbild, KPIs, Roadmap.' },
    { t: 'Design', d: 'Konzept, Prototyp, Validierung.' },
    { t: 'Deliver', d: 'Umsetzung mit Ihrem Team — messbar.' },
  ];
  if (t === 'medical') return [
    { t: 'Termin buchen', d: 'Online oder telefonisch — schnell bestätigt.' },
    { t: 'Anamnese', d: 'Wir nehmen uns Zeit für Ihre Geschichte.' },
    { t: 'Untersuchung', d: 'Präzise Diagnostik, klare Erklärung.' },
    { t: 'Therapie', d: 'Plan, Verlaufskontrolle, Rückfragen jederzeit.' },
  ];
  if (t === 'fitness') return [
    { t: 'Probetraining', d: 'Eine Stunde mit Lehrer:in — unverbindlich.' },
    { t: 'Kennenlernen', d: 'Kurzes Vorgespräch über Ziele und Körper.' },
    { t: 'Trainieren', d: 'Klassen, Kleingruppen oder 1:1.' },
    { t: 'Dranbleiben', d: 'Persönliche Rückmeldung nach jeder Stunde.' },
  ];
  return [
    { t: 'Anfrage', d: 'Wir melden uns binnen 24 h.' },
    { t: 'Termin vor Ort', d: 'Kostenlos, unverbindlich.' },
    { t: 'Festpreis-Angebot', d: 'Schriftlich, mit Material und Förderung.' },
    { t: 'Ausführung', d: 'Sauber, pünktlich, mit Endreinigung.' },
  ];
}
function defaultFaq(t: TemplateKey) {
  if (t === 'restaurant') return [
    { q: 'Kann man reservieren?', a: 'Ja, online über das Formular oder telefonisch.' },
    { q: 'Bieten Sie vegetarische Speisen?', a: 'Ja, drei vegetarische und zwei vegane Hauptgerichte.' },
    { q: 'Sind Sie barrierefrei?', a: 'Hauptraum ebenerdig, behindertengerechte Toilette vorhanden.' },
  ];
  if (t === 'salon') return [
    { q: 'Wie lange im Voraus muss ich buchen?', a: 'Schnitt 3–7 Tage, Färben 2–3 Wochen.' },
    { q: 'Welche Produktlinien?', a: 'Kérastase, Olaplex, Davines, Aveda.' },
  ];
  if (t === 'consulting') return [
    { q: 'Wie läuft ein Projekt typischerweise ab?', a: 'Discover → Define → Design → Deliver, in 6–12 Wochen.' },
    { q: 'Arbeiten Sie remote?', a: 'Ja, hybrid — wichtige Workshops gerne vor Ort.' },
    { q: 'Was kostet ein Erstgespräch?', a: '45 Minuten kostenlos und unverbindlich.' },
  ];
  if (t === 'medical') return [
    { q: 'Welche Kassen werden akzeptiert?', a: 'Alle gesetzlichen und privaten Kassen.' },
    { q: 'Wie buche ich einen Termin?', a: 'Über Doctolib, jameda, telefonisch oder direkt online.' },
    { q: 'Sind Sie barrierefrei?', a: 'Ja — Aufzug und behindertengerechtes WC vorhanden.' },
  ];
  if (t === 'fitness') return [
    { q: 'Gibt es ein Probetraining?', a: 'Ja, die erste Einheit ist gratis.' },
    { q: 'Wie lange ist die Vertragslaufzeit?', a: 'Monatlich kündbar — keine Knebelverträge.' },
    { q: 'Welche Kurse werden angeboten?', a: 'HIIT, Yoga, Boxing Cardio und Personal Training.' },
  ];
  return [
    { q: 'Wie schnell ist der Notdienst da?', a: 'In der Regel binnen 60 min im Stadtgebiet.' },
    { q: 'Was kostet eine Beratung?', a: 'Erstberatung kostenlos.' },
  ];
}
function defaultValues(t: TemplateKey) {
  if (t === 'restaurant') return [
    { t: 'Saisonal & ehrlich.', d: 'Lieber weniger Karte, dafür perfekt.' },
    { t: 'Familie kocht.', d: 'Drei Generationen geben weiter.' },
    { t: 'Zeit für Gäste.', d: 'Bewusst weniger Tische als möglich.' },
  ];
  if (t === 'salon') return [
    { t: 'Beratung vor Schere.', d: 'Was passt zu Ihrem Alltag, Haar, Ihnen.' },
    { t: 'Pflege ist Handwerk.', d: 'Ehrliche Empfehlungen für zuhause.' },
    { t: 'Wohlfühlen zählt.', d: 'Tee, Musik, Couch zum Warten.' },
  ];
  return [
    { t: 'Festpreis, keine Tricks.', d: 'Schriftlich vor Auftrag.' },
    { t: 'Pünktlich heißt pünktlich.', d: 'Sie hören vorher von uns.' },
    { t: 'Sauber arbeiten.', d: 'Schutzfolien, Endreinigung.' },
  ];
}
function defaultTeam(t: TemplateKey) {
  if (t === 'restaurant') return [
    { n: 'Giulia Conti', r: 'Küchenchefin & Inhaberin', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', bio: 'Lernte bei den Großeltern, kochte in Bologna und Wien.' },
    { n: 'Marco Riva', r: 'Pizzaiolo', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', bio: 'Steht seit zwölf Jahren am Steinofen.' },
    { n: 'Sofia Bianchi', r: 'Sommelière', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80', bio: 'Berät zu Naturweinen.' },
  ];
  if (t === 'salon') return [
    { n: 'Marie Hofer', r: 'Salon Lead', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', bio: 'Gründete Studio Lumière 2017.' },
    { n: 'Anna Becker', r: 'Color-Spezialistin', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80', bio: 'Kérastase Educator.' },
    { n: 'Lina Voss', r: 'Skin & Make-up', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80', bio: 'Kosmetikerin und Make-up-Artistin.' },
  ];
  if (t === 'consulting') return [
    { n: 'Dr. Klaus Hofer', r: 'Senior Partner · Strategie', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', bio: 'Über 25 Jahre Beratung im Mittelstand. Schwerpunkt Industrie und Familienunternehmen.' },
    { n: 'Lena Weiss', r: 'Partnerin · Steuer & Recht', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', bio: 'Steuerberaterin und Anwältin. Zuvor zehn Jahre in einer Big-Four-Kanzlei.' },
    { n: 'Marcus Berg', r: 'Senior Manager · M&A', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', bio: 'Begleitet Übernahmen und Nachfolgen. Drei Jahre London, fünf Jahre Wien.' },
  ];
  if (t === 'medical') return [
    { n: 'Dr. Anna Lindner', r: 'Praxisinhaberin · Allgemeinmedizin', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80', bio: 'Studium in Innsbruck und Zürich. Ganzheitlicher Ansatz mit Zeit für Gespräche.' },
    { n: 'Dr. Felix Bauer', r: 'Internist · Diagnostik', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80', bio: 'Zehn Jahre Universitätsklinik. Schwerpunkt internistische Vorsorge.' },
    { n: 'Maria Holzer', r: 'Praxisleitung · MTA', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80', bio: 'Koordiniert Termine und Abläufe. Erste Ansprechpartnerin am Empfang.' },
  ];
  if (t === 'fitness') return [
    { n: 'Sarah Berg', r: 'Studio-Leitung · Vinyasa', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', bio: '12 Jahre Yogalehrerin in Berlin und Lissabon. RYT 500 + somatische Ausbildung.' },
    { n: 'Mira Klein', r: 'Yin & Mindful Movement', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', bio: 'Schwerpunkt Faszien-Arbeit und Atem. Begleitet auch unsere Retreats im Allgäu.' },
    { n: 'Jonas Renz', r: 'Reformer Pilates', img: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?auto=format&fit=crop&w=600&q=80', bio: 'Physiotherapeut mit Pilates-Spezialisierung. Trainiert Sportler:innen und Reha-Klient:innen.' },
  ];
  return [
    { n: 'Stefan Mayer', r: 'Geschäftsführer · Meister', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', bio: 'Übernahm den Familienbetrieb 2008.' },
    { n: 'Andreas Mayer', r: 'Bauleiter · Meister', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80', bio: 'Über 200 Projekte begleitet.' },
    { n: 'Daniel Mayer', r: 'Notdienst & Service', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', bio: '24/7 für Notfälle bereit.' },
  ];
}
function defaultArrival(t: TemplateKey) {
  if (t === 'restaurant') return [
    { t: 'Mit dem Auto', d: 'Tiefgarage Maria-Theresien direkt nebenan.' },
    { t: 'Mit der Bahn', d: '5 Minuten Fußweg vom Hauptbahnhof.' },
    { t: 'Barrierefrei', d: 'Hauptraum ebenerdig.' },
  ];
  if (t === 'salon') return [
    { t: 'Anfahrt', d: 'U3/U6 Münchner Freiheit, 3 Min zu Fuß.' },
    { t: 'Parken', d: 'Tiefgarage Leopoldpark vor der Tür.' },
    { t: 'Termin verlegen', d: 'Bis 24 h vorher gerne kostenlos.' },
  ];
  return [
    { t: 'Notdienst', d: 'Rund um die Uhr erreichbar.' },
    { t: 'Anfahrtsgebiet', d: 'Ingolstadt und 30 km Umkreis.' },
    { t: 'Beratung vor Ort', d: 'Erstgespräch kostenlos.' },
  ];
}
function defaultNumbers(t: TemplateKey) {
  if (t === 'restaurant') return [
    { value: '1998', label: 'Familienbetrieb seit' },
    { value: '64', label: 'Plätze drinnen' },
    { value: '4,9', label: 'Sterne Ø' },
    { value: '28', label: 'Weine offen' },
  ];
  if (t === 'salon') return [
    { value: '6', label: 'Stylist:innen' },
    { value: '12', label: 'Treatments' },
    { value: '4,9', label: 'Sterne Ø' },
    { value: '2017', label: 'Studio seit' },
  ];
  if (t === 'consulting') return [
    { value: '120+', label: 'Projekte' },
    { value: '18', label: 'Branchen' },
    { value: '92 %', label: 'NPS' },
    { value: '6–12', label: 'Wochen Laufzeit' },
  ];
  if (t === 'medical') return [
    { value: '12', label: 'Ø Wartezeit (min)' },
    { value: '8', label: 'Behandlungsräume' },
    { value: '4,9', label: 'Sterne Ø' },
    { value: '2009', label: 'Praxis seit' },
  ];
  if (t === 'fitness') return [
    { value: '12+', label: 'Klassen pro Woche' },
    { value: '350+', label: 'Stammgäste' },
    { value: '8', label: 'max. pro Klasse' },
    { value: '5', label: 'Lehrer:innen' },
  ];
  return [
    { value: '50+', label: 'Jahre Erfahrung' },
    { value: '18', label: 'Mitarbeitende' },
    { value: '60 min', label: 'Anfahrt Notdienst' },
    { value: '65 %', label: 'Empfehlungsquote' },
  ];
}
function defaultCta(t: TemplateKey) {
  if (t === 'restaurant') return { eyebrow: 'Bereit?', lead: 'Hunger?', sub: 'Wir freuen uns, Sie an unserem Tisch begrüßen zu dürfen.', cta: 'Tisch reservieren', ctaHref: '/kontakt' };
  if (t === 'salon') return { eyebrow: 'Bereit?', lead: 'Bereit für etwas Neues?', sub: 'Wir nehmen uns die Zeit – für Sie, für Ihren Look.', cta: 'Termin buchen', ctaHref: '/kontakt' };
  if (t === 'consulting') return { eyebrow: 'Bereit?', lead: 'Lassen Sie uns reden.', sub: '45 Minuten Erstgespräch — kostenlos und unverbindlich.', cta: 'Termin vereinbaren', ctaHref: '/kontakt' };
  if (t === 'medical') return { eyebrow: 'Bereit?', lead: 'Wir sind für Sie da.', sub: 'Online-Termin in unter zwei Minuten gebucht.', cta: 'Termin buchen', ctaHref: '/kontakt' };
  if (t === 'fitness') return { eyebrow: 'Bereit?', lead: 'Starten Sie heute.', sub: 'Probetraining gratis — wir freuen uns auf Sie.', cta: 'Probetraining sichern', ctaHref: '/kontakt' };
  return { eyebrow: 'Bereit?', lead: 'Etwas tropft?', sub: 'Wir melden uns binnen 24 h mit einem Festpreis-Angebot.', cta: 'Jetzt anfragen', ctaHref: '/kontakt' };
}
