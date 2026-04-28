import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { SiteContent, TemplateKey } from '@/lib/types';
import { branchTextDefaults } from '@/lib/branch-text-defaults';
import { RichTextEditor } from './RichTextEditor';
import { assertValidUpload, humanizeUploadError, UPLOAD_HINT } from './upload-limits';

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

  const isGlobal = pageId === 'brand' || pageId === 'contact' || pageId === 'social' || pageId === 'seo' || pageId === 'scripts' || pageId === 'news' || pageId === 'navigation' || pageId === 'mail';

  return (
    <div className="min-h-screen bg-[#f6f6f3]">
      {topBar}

      <header className="bg-white border-b border-line sticky top-0 z-30">
        <div className="container-x flex items-center justify-between py-3 md:py-4 gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <span className="font-display text-base md:text-xl truncate">Admin · {brandTitle ?? data.brand.name}</span>
            {headerStatus}
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-sm shrink-0">
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

      <div className="container-x py-4 md:py-8 grid md:grid-cols-[240px_1fr] gap-4 md:gap-6">
        {/* MOBILE: section dropdown (replaces sidebar on small screens) */}
        <div className="md:hidden -mx-4 px-4 sticky top-[64px] z-20 bg-[#f6f6f3]/95 backdrop-blur py-3 border-b border-line">
          <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Bereich</label>
          <select
            value={pageId}
            onChange={(e) => setPageId(e.target.value as PageId)}
            className="w-full bg-white border border-line rounded-xl px-4 py-3 text-sm font-medium"
          >
            <optgroup label="Seiten">
              {pages.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </optgroup>
            <optgroup label="Inhalte">
              <option value="news">News & Blog</option>
            </optgroup>
            <optgroup label="Global">
              <option value="navigation">Navigation & Footer</option>
              <option value="brand">Marke & Design</option>
              <option value="contact">Kontaktdaten</option>
              <option value="social">Social Media</option>
              <option value="seo">SEO & Sichtbarkeit</option>
              <option value="scripts">Skripte & Tracking</option>
              <option value="mail">Mail-Server</option>
            </optgroup>
          </select>
        </div>

        {/* DESKTOP: pages + global sidebar */}
        <aside className="hidden md:block space-y-6 md:sticky md:top-24 h-fit">
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
            <SidebarItem active={pageId === 'navigation'} onClick={() => setPageId('navigation')} icon="≣">Navigation & Footer</SidebarItem>
            <SidebarItem active={pageId === 'brand'} onClick={() => setPageId('brand')} icon="✦">Marke & Design</SidebarItem>
            <SidebarItem active={pageId === 'contact'} onClick={() => setPageId('contact')} icon="✉">Kontaktdaten</SidebarItem>
            <SidebarItem active={pageId === 'social'} onClick={() => setPageId('social')} icon="@">Social Media</SidebarItem>
            <SidebarItem active={pageId === 'seo'} onClick={() => setPageId('seo')} icon="◎">SEO & Sichtbarkeit</SidebarItem>
            <SidebarItem active={pageId === 'scripts'} onClick={() => setPageId('scripts')} icon="〈">Skripte & Tracking</SidebarItem>
            <SidebarItem active={pageId === 'mail'} onClick={() => setPageId('mail')} icon="M">Mail-Server</SidebarItem>
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
            {pageId === 'navigation' && <NavigationPage data={data} setData={setData} tpl={tplKey} />}
            {pageId === 'contact' && <ContactGlobal data={data} setData={setData} />}
            {pageId === 'social' && <SocialPage data={data} setData={setData} />}
            {pageId === 'seo' && <SeoPage data={data} setData={setData} />}
            {pageId === 'scripts' && <ScriptsPage data={data} setData={setData} />}
            {pageId === 'mail' && <MailPage data={data} setData={setData} />}
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
type PageId = 'home' | 'services' | 'gallery' | 'about' | 'contactPage' | 'brand' | 'contact' | 'social' | 'seo' | 'scripts' | 'news' | 'navigation' | 'mail';
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
  if (t === 'hotel') return [
    { id: 'home', label: 'Startseite', icon: '◐', previewPath: '' },
    { id: 'services', label: 'Zimmer', icon: '☰', previewPath: '/zimmer' },
    { id: 'gallery', label: 'Haus & Spa', icon: '▦', previewPath: '/galerie' },
    { id: 'about', label: 'Geschichte', icon: '☉', previewPath: '/ueber-uns' },
    { id: 'contactPage', label: 'Reservieren', icon: '✉', previewPath: '/kontakt' },
  ];
  if (t === 'tourism') return [
    { id: 'home', label: 'Startseite', icon: '◐', previewPath: '' },
    { id: 'services', label: 'Touren', icon: '☰', previewPath: '/touren' },
    { id: 'gallery', label: 'Eindrücke', icon: '▦', previewPath: '/galerie' },
    { id: 'about', label: 'Guides', icon: '☉', previewPath: '/ueber-uns' },
    { id: 'contactPage', label: 'Buchen', icon: '✉', previewPath: '/kontakt' },
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
  if (p === 'navigation') return 'Navigation & Footer';
  if (p === 'brand') return 'Marke & Design';
  if (p === 'contact') return 'Kontaktdaten';
  if (p === 'social') return 'Social Media';
  if (p === 'seo') return 'SEO & Sichtbarkeit';
  if (p === 'scripts') return 'Skripte & Tracking';
  if (p === 'mail') return 'Mail-Server';
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
    try {
      assertValidUpload(file);
    } catch (e: any) {
      setError(e?.message || 'Datei nicht erlaubt');
      return;
    }
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
      setError(humanizeUploadError(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label={label} hint={_ctx.uploadImage ? UPLOAD_HINT : 'In der Demo wird das Bild nur lokal angezeigt.'}>
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
      <SectionCard title="Sichtbarkeit der Sektionen" description="Schalten Sie ganze Sektionen auf der Startseite sichtbar oder unsichtbar." badge="Layout">
        <SectionVisibilityEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>

      <SectionCard title="Lauftext-Banner" description="Die kleine Marquee-Zeile ganz oben über dem Hero." badge="Sektion 1">
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

      <SectionCard title="Hero (Startbereich)" description="Erster Eindruck – Titel, Untertitel, Hintergrund, Haupt-Button." badge="Sektion 2">
        <Field label="Slogan / Eyebrow" hint="Kleine Zeile über der Überschrift.">
          <input className={inputCls} value={data.brand.tagline || ''} onChange={(e) => set({ brand: { ...data.brand, tagline: e.target.value } })} />
        </Field>
        <Field label="Hauptüberschrift">
          <input className={inputCls} value={data.hero.title} onChange={(e) => set({ hero: { ...data.hero, title: e.target.value } })} />
        </Field>
        <Field label="Untertitel" hint="Kurze Zeile direkt unter dem Titel (z. B. ein zweiter Halbsatz).">
          <input className={inputCls} value={data.hero.subtitle || ''} onChange={(e) => set({ hero: { ...data.hero, subtitle: e.target.value } })} />
        </Field>
        <Field label="Beschreibungstext" hint="Längerer Fließtext unter dem Untertitel – beschreibt das Angebot in 1–3 Sätzen.">
          <textarea className={inputCls} rows={3} value={(data.hero as any).body || ''} onChange={(e) => set({ hero: { ...data.hero, body: e.target.value } as any })} />
        </Field>
        <ImagePickerField label="Hintergrundbild" value={data.hero.imageUrl || ''} onChange={(v) => set({ hero: { ...data.hero, imageUrl: v } })} ratio="aspect-[16/9]" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Button-Text"><input className={inputCls} value={data.hero.ctaLabel || ''} onChange={(e) => set({ hero: { ...data.hero, ctaLabel: e.target.value } })} /></Field>
          <LinkTargetField label="Button-Ziel" value={data.hero.ctaHref || ''} onChange={(v) => set({ hero: { ...data.hero, ctaHref: v } })} sections={homeSectionsFor(tpl)} />
        </div>
      </SectionCard>

      {(tpl === 'consulting' || tpl === 'medical' || tpl === 'fitness') && (
        <SectionCard title="Branchen-Stichworte" description="Kurze Schlagwörter direkt unter dem Hero – geben der Variante ein klares Profil." badge="Sektion 2b">
          <BranchChipsEditor data={data} setData={setData} tpl={tpl} />
        </SectionCard>
      )}

      <SectionCard title="Zahlen-Band" description={'Vier Eckdaten – meist direkt unter dem Hero (auch in „Über uns").'} badge="Sektion 3">
        <NumbersEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>

      <SectionCard title="Über-uns-Teaser" description="Kurzer Auszug, der auf die Über-uns-Seite verweist." badge="Sektion 4">
        <Field label="Überschrift">
          <input className={inputCls} value={data.about?.title || ''} onChange={(e) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), title: e.target.value } })} />
        </Field>
        <Field label="Text" hint="Wird automatisch auf 2–3 Absätze gekürzt auf der Startseite.">
          <textarea className={inputCls} rows={5} value={data.about?.body || ''} onChange={(e) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), body: e.target.value } })} />
        </Field>
        <ImagePickerField label="Bild" value={data.about?.imageUrl || ''} onChange={(v) => setData({ ...data, about: { ...(data.about ?? { title: '', body: '', imageUrl: '' }), imageUrl: v } })} />
      </SectionCard>

      <SectionCard title={tpl === 'restaurant' ? 'Speisekarte-Teaser' : 'Leistungen-Teaser'} description="Die ersten 3 Einträge erscheinen auf der Startseite." badge="Sektion 5">
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

      <SectionCard title="News-Teaser" description="Die 3 neuesten veröffentlichten Beiträge erscheinen auf der Startseite." badge="Sektion 8">
        <p className="text-xs text-muted">
          Beiträge anlegen und bearbeiten Sie unter <strong>News &amp; Blog</strong> in der Seitenleiste. Hier sehen Sie nur, welche aktuell auf der Startseite landen.
        </p>
        <NewsHomePreview data={data} />
      </SectionCard>

      <SectionCard title="Abschluss-Aufruf (CTA)" description="Der Aufruf am Seitenende." badge="Sektion 9">
        <CtaBandEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>

      <SectionCard title="Branchen-Texte (Standard-Überschreibungen)" description="Überschreiben Sie die mitgelieferten Standard-Texte (Marquee, Manifest, Galerie-Titel, News-Heading …). Leer lassen = Standardtext der Branche/Stilkombination wird verwendet." badge="Texte">
        <BranchTextEditor data={data} setData={setData} tpl={tpl} />
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
      {tpl === 'fitness' && (
        <SectionCard title="Programme" description="Kurse / Trainings, die im Programm-Spotlight erscheinen." badge="Sektion 3b">
          <ProgramsEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'medical' && (
        <SectionCard title="Hinweise (Online-Termin & Notfall)" description="Texte für die Service-Karten." badge="Sektion 3b">
          <MedicalNoticeEditor data={data} setData={setData} />
        </SectionCard>
      )}

      {/* ───── Branch-specific modules (Phase 2) ───── */}
      {tpl === 'restaurant' && (
        <SectionCard title="Speisekarte (Kategorien & Gerichte)" description="Vollständige Karte mit Kategorien, Allergenen und Tags. Erscheint als Modul-Block auf der Speisekarte-Seite." badge="Modul · Speisekarte">
          <MenuEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'hotel' && (
        <SectionCard title="Zimmer-Showcase" description="Detaillierte Zimmer mit Größe, Bett, Preis & Ausstattung. Erscheint als Modul-Block auf der Zimmer-Seite." badge="Modul · Zimmer">
          <RoomsEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'tourism' && (
        <SectionCard title="Tour-Karten" description="Touren mit Schwierigkeit, Dauer, Sprachen und Preis. Erscheint als Modul-Block auf der Touren-Seite." badge="Modul · Touren">
          <ToursEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'salon' && (
        <SectionCard title="Behandlungen (kategorisiert)" description="Kategorisierte Behandlungsliste mit Dauer & Preis." badge="Modul · Treatments">
          <TreatmentsEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'fitness' && (
        <SectionCard title="Kursplan" description="Kursliste mit Zeitplan, Level, Trainer und Preis." badge="Modul · Kursplan">
          <CoursesEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {(tpl === 'fitness' || tpl === 'consulting') && (
        <SectionCard title="Preis-Pakete" description="Drei-Stufen-Pakete mit Highlight-Karte." badge="Modul · Pakete">
          <PackagesEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'consulting' && (
        <SectionCard title="Prozess-Schritte" description="Horizontale Timeline mit 3–6 Stationen Ihres Vorgehens." badge="Modul · Prozess">
          <ProcessStepsEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'medical' && (
        <SectionCard title="Ärzte & Team" description="Profile der behandelnden Ärztinnen und Ärzte." badge="Modul · Doctors">
          <DoctorsEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'medical' && (
        <SectionCard title="Online-Terminbuchung" description="Doctolib / jameda / TIMIFY-Anbindung. CTA oder Embed." badge="Modul · Booking">
          <BookingEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'tradesman' && (
        <SectionCard title="Förder-Übersicht" description="Liste der Förderprogramme mit Prozent-Quote (für den Förder-Kalkulator)." badge="Modul · Förderung">
          <FundingEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'tradesman' && (
        <SectionCard title="Notdienst-Banner" description="Sticky-Banner unten rechts mit 24/7-Hotline." badge="Modul · Notdienst">
          <EmergencyBannerEditor data={data} setData={setData} />
        </SectionCard>
      )}
      <SectionCard title="Ablauf-Schritte" description={'Die vier Schritte „So läuft es ab".'} badge="Sektion 4">
        <StepsEditor data={data} setData={setData} field="serviceProcess" defaults={defaultProcess(tpl)} />
      </SectionCard>
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
      <SectionCard title="Geschichte / Timeline" description="Stationen, Meilensteine, Jubiläen — als vertikale Zeitleiste." badge="Sektion 4">
        <TimelineEditor data={data} setData={setData} />
      </SectionCard>
      <SectionCard title="Team" description="Bilder, Namen, Rollen, Kurzbio." badge="Sektion 5">
        <TeamEditor data={data} setData={setData} defaults={defaultTeam(tpl)} />
      </SectionCard>
      <SectionCard title="Zahlen-Band" badge="Sektion 6">
        <NumbersEditor data={data} setData={setData} tpl={tpl} />
      </SectionCard>
      {tpl === 'tradesman' && (
        <SectionCard title="Qualifikationen" description="Zertifikate, Mitgliedschaften, Förderpartner." badge="Sektion 7">
          <CertificationsEditor data={data} setData={setData} />
        </SectionCard>
      )}
      {tpl === 'restaurant' && (
        <SectionCard title="Presse-Stimmen" description="Drei Zitate aus Magazinen / Zeitungen." badge="Sektion 7">
          <PressEditor data={data} setData={setData} />
        </SectionCard>
      )}
      <SectionCard title="Bewertungen" description="Alle Kund:innen-Stimmen." badge="Sektion 8">
        <TestimonialsEditor data={data} setData={setData} />
      </SectionCard>
      <SectionCard title="Abschluss-Aufruf (CTA)" badge="Sektion 9">
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

/* ─── Navigation & Footer editor ──────────────────────────────────── */
const NAV_DEFAULTS: Record<TemplateKey, { label: string; path: string }[]> = {
  restaurant: [
    { label: 'Start', path: '/' },
    { label: 'Speisekarte', path: '/speisekarte' },
    { label: 'Galerie', path: '/galerie' },
    { label: 'Über uns', path: '/ueber-uns' },
    { label: 'Kontakt', path: '/kontakt' },
  ],
  salon: [
    { label: 'Start', path: '/' },
    { label: 'Leistungen', path: '/leistungen' },
    { label: 'Looks', path: '/galerie' },
    { label: 'Studio', path: '/ueber-uns' },
    { label: 'Termin', path: '/kontakt' },
  ],
  tradesman: [
    { label: 'Start', path: '/' },
    { label: 'Leistungen', path: '/leistungen' },
    { label: 'Referenzen', path: '/referenzen' },
    { label: 'Betrieb', path: '/ueber-uns' },
    { label: 'Anfrage', path: '/kontakt' },
  ],
  hotel: [
    { label: 'Start', path: '/' },
    { label: 'Zimmer', path: '/zimmer' },
    { label: 'Haus & Spa', path: '/galerie' },
    { label: 'Geschichte', path: '/ueber-uns' },
    { label: 'Reservieren', path: '/kontakt' },
  ],
  tourism: [
    { label: 'Start', path: '/' },
    { label: 'Touren', path: '/touren' },
    { label: 'Eindrücke', path: '/galerie' },
    { label: 'Guides', path: '/ueber-uns' },
    { label: 'Buchen', path: '/kontakt' },
  ],
  consulting: [
    { label: 'Start', path: '/' },
    { label: 'Leistungen', path: '#leistungen' },
    { label: 'Über uns', path: '#about' },
    { label: 'Kontakt', path: '#kontakt' },
  ],
  medical: [
    { label: 'Start', path: '/' },
    { label: 'Leistungen', path: '#leistungen' },
    { label: 'Über uns', path: '#about' },
    { label: 'Kontakt', path: '#kontakt' },
  ],
  fitness: [
    { label: 'Start', path: '/' },
    { label: 'Programm', path: '#leistungen' },
    { label: 'Studio', path: '#about' },
    { label: 'Kontakt', path: '#kontakt' },
  ],
};

const KNOWN_PATHS_HINT = ['/', '/speisekarte', '/leistungen', '/zimmer', '/touren', '/galerie', '/referenzen', '/ueber-uns', '/kontakt', '/news'];

function NavigationPage({ data, setData, tpl }: SectionProps) {
  const items = (data as any).navItems as Array<{ label: string; path: string; visible: boolean }> | undefined;
  const list = items && items.length ? items : NAV_DEFAULTS[tpl].map((d) => ({ ...d, visible: true }));

  const setItems = (next: Array<{ label: string; path: string; visible: boolean }>) => {
    setData({ ...data, navItems: next } as any);
  };
  const move = (i: number, dir: -1 | 1) => {
    const next = [...list];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  };
  const update = (i: number, patch: Partial<{ label: string; path: string; visible: boolean }>) => {
    const next = list.map((it, k) => k === i ? { ...it, ...patch } : it);
    setItems(next);
  };
  const remove = (i: number) => setItems(list.filter((_, k) => k !== i));
  const add = () => setItems([...list, { label: 'Neuer Eintrag', path: '/', visible: true }]);
  const reset = () => setData({ ...data, navItems: [] } as any);

  const heroCta = (data as any).heroCta || {};
  const setHero = (patch: Partial<{ primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string }>) => {
    setData({ ...data, heroCta: { ...heroCta, ...patch } } as any);
  };
  const ctaBand = (data as any).ctaBandOverride || {};
  const setBand = (patch: Partial<{ lead: string; sub: string; cta: string; ctaHref: string }>) => {
    setData({ ...data, ctaBandOverride: { ...ctaBand, ...patch } } as any);
  };
  const footer = (data as any).footer || {};
  const setFooter = (patch: any) => setData({ ...data, footer: { ...footer, ...patch } } as any);

  return (
    <>
      <SectionCard
        title="Hauptnavigation"
        description="Beschriftung, Reihenfolge und Sichtbarkeit jedes Menü-Eintrags. Erscheint im Header und im Footer."
      >
        <div className="space-y-2">
          {list.map((it, i) => (
            <div key={i} className="grid md:grid-cols-[2.5rem_1fr_1fr_auto_auto] gap-2 items-center bg-[#f6f6f3] rounded-xl p-3">
              <div className="flex flex-col">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="text-xs px-2 py-1 disabled:opacity-30 hover:bg-white rounded">↑</button>
                <button onClick={() => move(i, 1)} disabled={i === list.length - 1} className="text-xs px-2 py-1 disabled:opacity-30 hover:bg-white rounded">↓</button>
              </div>
              <input
                className={inputCls + ' !bg-white'}
                value={it.label}
                onChange={(e) => update(i, { label: e.target.value })}
                placeholder="Beschriftung"
              />
              <input
                className={inputCls + ' !bg-white font-mono text-xs'}
                value={it.path}
                onChange={(e) => update(i, { path: e.target.value })}
                placeholder="/pfad"
                list="known-nav-paths"
              />
              <label className="flex items-center gap-2 text-xs text-muted whitespace-nowrap">
                <input type="checkbox" checked={it.visible !== false} onChange={(e) => update(i, { visible: e.target.checked })} />
                sichtbar
              </label>
              <button onClick={() => remove(i)} className="text-xs px-3 py-1.5 rounded text-red-700 hover:bg-red-50">Entfernen</button>
            </div>
          ))}
          <datalist id="known-nav-paths">
            {KNOWN_PATHS_HINT.map((p) => <option key={p} value={p} />)}
          </datalist>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={add} className="btn-outline !px-4 !py-2 text-sm">+ Eintrag hinzufügen</button>
          <button onClick={reset} className="text-xs text-muted hover:text-slate-900 px-3">Auf Standard zurücksetzen</button>
        </div>
        <p className="mt-4 text-xs text-muted">
          Tipp: Pfade sollten zu existierenden Seiten passen. Bekannte Pfade: <span className="font-mono">{KNOWN_PATHS_HINT.join(' · ')}</span>
        </p>
      </SectionCard>

      <SectionCard title="Hero-Buttons (Startseite)" description="Beschriftung und Verlinkung der Buttons im Hero-Bereich.">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Primär-Button Beschriftung" hint="z.B. 'Tisch reservieren'">
            <input className={inputCls} value={heroCta.primaryLabel || ''} onChange={(e) => setHero({ primaryLabel: e.target.value })} placeholder="Kontakt aufnehmen" />
          </Field>
          <Field label="Primär-Button Ziel" hint="Pfad oder URL">
            <input className={inputCls + ' font-mono text-xs'} value={heroCta.primaryHref || ''} onChange={(e) => setHero({ primaryHref: e.target.value })} placeholder="/kontakt" />
          </Field>
          <Field label="Sekundär-Button Beschriftung">
            <input className={inputCls} value={heroCta.secondaryLabel || ''} onChange={(e) => setHero({ secondaryLabel: e.target.value })} placeholder="Speisekarte ansehen" />
          </Field>
          <Field label="Sekundär-Button Ziel">
            <input className={inputCls + ' font-mono text-xs'} value={heroCta.secondaryHref || ''} onChange={(e) => setHero({ secondaryHref: e.target.value })} placeholder="/speisekarte" />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="CTA-Band vor dem Footer" description="Großer Aufruf zur Aktion am Ende der Startseite.">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Headline" hint="z.B. 'Hunger?' / 'Termin?' / 'Auftrag?'">
            <input className={inputCls} value={ctaBand.lead || ''} onChange={(e) => setBand({ lead: e.target.value })} placeholder="Bereit?" />
          </Field>
          <Field label="Untertitel">
            <input className={inputCls} value={ctaBand.sub || ''} onChange={(e) => setBand({ sub: e.target.value })} placeholder="Schreiben Sie uns. Wir antworten." />
          </Field>
          <Field label="Button Beschriftung">
            <input className={inputCls} value={ctaBand.cta || ''} onChange={(e) => setBand({ cta: e.target.value })} placeholder="Jetzt anfragen" />
          </Field>
          <Field label="Button Ziel">
            <input className={inputCls + ' font-mono text-xs'} value={ctaBand.ctaHref || ''} onChange={(e) => setBand({ ctaHref: e.target.value })} placeholder="/kontakt" />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Footer-Tagline" description="Kleiner Untertitel-Text neben dem Markennamen im Footer.">
        <Field label="Tagline">
          <input className={inputCls} value={footer.tagline || ''} onChange={(e) => setFooter({ tagline: e.target.value })} placeholder={data.brand.tagline || ''} />
        </Field>
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
        <Field label="Markenname neben Logo ausblenden" hint="Wenn aktiviert und ein Logo hochgeladen ist, wird der Markenname-Text neben dem Logo ausgeblendet (nur Logo).">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!data.brand.hideName}
              onChange={(e) => setData({ ...data, brand: { ...data.brand, hideName: e.target.checked } })}
              className="h-4 w-4"
            />
            <span className="text-sm text-slate-700">Nur Logo anzeigen, Markenname-Text ausblenden</span>
          </label>
        </Field>
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

function MailPage({ data, setData }: SetterProps) {
  const m = (data as any).mail || {};
  const set = (patch: Record<string, any>) => setData({ ...(data as any), mail: { ...m, ...patch } } as SiteContent);
  return (
    <>
      <SectionCard
        title="Eigener Mail-Server"
        description="Wenn aktiviert, werden Anfragen aus dem Kontakt-Formular direkt über Ihr eigenes Postfach versendet. Solange ausgeschaltet, läuft alles über die Plattform-Adresse (FlamingoMedia)."
        badge={m.enabled ? 'Aktiv' : 'Standard (Plattform)'}
      >
        <Toggle value={!!m.enabled} onChange={(v: boolean) => set({ enabled: v })} label="Eigenes Postfach für Kontakt-Formular verwenden" />
      </SectionCard>

      {m.enabled && (
        <>
          <SectionCard title="SMTP-Server" description="Zugangsdaten Ihres Postausgangs-Servers." badge="Pflicht">
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Host" hint="z. B. smtp.ionos.de, smtp.strato.de">
                <input className={inputCls} value={m.host || ''} onChange={(e) => set({ host: e.target.value })} placeholder="smtp.ionos.de" />
              </Field>
              <Field label="Port" hint="587 (TLS) oder 465 (SSL)">
                <input type="number" className={inputCls} value={m.port ?? 587} onChange={(e) => set({ port: Number(e.target.value || 587) })} />
              </Field>
              <Field label="">
                <button type="button" onClick={() => set({ host: 'smtp.ionos.de', port: 587 })} className="btn-outline !py-2 !px-3 text-xs w-full">IONOS-Standard</button>
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Benutzername / Login-Adresse">
                <input className={inputCls} value={m.user || ''} onChange={(e) => set({ user: e.target.value })} placeholder="kontakt@meine-firma.de" autoComplete="off" />
              </Field>
              <Field label="Passwort" hint="Wird verschlüsselt gespeichert.">
                <input type="password" className={inputCls} value={m.pass || ''} onChange={(e) => set({ pass: e.target.value })} placeholder="••••••••" autoComplete="new-password" />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Adressen" description="Absender- und Empfänger-Adresse für eingehende Anfragen.">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Absender-Adresse" hint="Erscheint im 'Von'-Feld. Sollte zu Ihrem SMTP-Konto passen.">
                <input type="email" className={inputCls} value={m.from || ''} onChange={(e) => set({ from: e.target.value })} placeholder="kontakt@meine-firma.de" />
              </Field>
              <Field label="Empfänger-Adresse" hint="Wohin Anfragen gesendet werden.">
                <input type="email" className={inputCls} value={m.to || ''} onChange={(e) => set({ to: e.target.value })} placeholder="anfragen@meine-firma.de" />
              </Field>
            </div>
            <Toggle value={m.autoReply !== false} onChange={(v: boolean) => set({ autoReply: v })} label="Auto-Reply an Absender senden ('Wir haben Ihre Nachricht erhalten')" />
          </SectionCard>

          <SectionCard title="Test-Versand" description="Prüfen, ob die Zugangsdaten funktionieren." badge="Empfehlung">
            <MailTestButton />
          </SectionCard>
        </>
      )}

      <SectionCard title="Schnellanleitung" description="Wo finden Sie diese Daten?">
        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
          <li><strong>IONOS:</strong> Kundencenter → E-Mail → Postfach → Konfiguration. Server <code>smtp.ionos.de</code>, Port <code>587</code>.</li>
          <li><strong>Strato:</strong> Kundenbereich → E-Mail → Postfach. <code>smtp.strato.de</code>, Port <code>587</code>.</li>
          <li><strong>All-Inkl:</strong> KAS → E-Mail. <code>smtp.your-server.de</code>, Port <code>587</code>.</li>
          <li><strong>Google Workspace:</strong> App-Passwort erstellen unter „Sicherheit“. <code>smtp.gmail.com</code>, Port <code>587</code>.</li>
          <li><strong>Microsoft 365:</strong> SMTP AUTH muss vom Admin freigeschaltet sein. <code>smtp.office365.com</code>, Port <code>587</code>.</li>
        </ul>
      </SectionCard>
    </>
  );
}

function MailTestButton() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');
  const [tenantSlug, setTenantSlug] = useState<string>('');

  // Resolve tenant slug from the admin session so the test mail uses the
  // tenant's own SMTP config (resolveMailConfig() looks it up by slug).
  useEffect(() => {
    let alive = true;
    fetch('/api/admin/session')
      .then((r) => r.json())
      .then((j) => { if (alive && j?.session?.slug) setTenantSlug(j.session.slug); })
      .catch(() => { /* noop */ });
    return () => { alive = false; };
  }, []);

  const sendTest = async () => {
    setState('sending'); setMsg('');
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Mail-Test',
          email: 'noreply@example.com',
          message: 'Dies ist eine Test-Nachricht aus dem Admin. Wenn Sie diese Mail erhalten, funktioniert Ihr Postausgang korrekt.',
          source: 'admin-mail-test',
          tenant: tenantSlug,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { setState('ok'); setMsg('Test-Mail wurde versendet. Bitte prüfen Sie Ihren Posteingang.'); }
      else { setState('err'); setMsg(j?.error || 'Versand fehlgeschlagen.'); }
    } catch {
      setState('err'); setMsg('Netzwerkfehler.');
    }
  };
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button type="button" onClick={sendTest} disabled={state === 'sending'} className="btn-primary !py-2 !px-4 text-sm disabled:opacity-60">
        {state === 'sending' ? 'Sende…' : 'Test-Mail senden'}
      </button>
      {msg && <p className={`text-sm ${state === 'ok' ? 'text-emerald-600' : 'text-rose-600'}`}>{msg}</p>}
    </div>
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

/* ─── Section visibility (per-tenant per-section show/hide) ──────── */

const SECTION_FLAGS: { key: string; label: string; description: string }[] = [
  { key: 'action', label: 'Aktions-Leiste', description: 'Branchenspezifische Info-Leiste direkt unter dem Hero.' },
  { key: 'signature', label: 'Branchen-Signatur', description: 'Variantenspezifischer Akzent-Block (z. B. Manifest).' },
  { key: 'services', label: 'Leistungen / Speisekarte', description: 'Highlight-Liste der Hauptleistungen.' },
  { key: 'branchModule', label: 'Branchen-Modul', description: 'Modul für Branche (Menu, Zimmer, Touren, Treatments, Förderung …).' },
  { key: 'about', label: 'Über uns', description: 'Über-uns-Teaser auf der Startseite.' },
  { key: 'gallery', label: 'Galerie', description: 'Galerie-Vorschau auf der Startseite.' },
  { key: 'numbers', label: 'Zahlen-Band', description: 'Vier Eckdaten als Stat-Strip.' },
  { key: 'testimonials', label: 'Bewertungen', description: 'Kundenstimmen-Block.' },
  { key: 'logos', label: 'Logo-Strip', description: 'Partner / Presse Logos (nur Modern).' },
  { key: 'faq', label: 'FAQ', description: 'Häufige Fragen mit Akkordeon (nur Modern).' },
  { key: 'news', label: 'News-Teaser', description: 'Neueste Beiträge.' },
  { key: 'softCta', label: 'Abschluss-Aufruf', description: 'CTA-Block am Seitenende.' },
];

function SectionVisibilityEditor({ data, setData }: SectionProps) {
  const flags = ((data as any).sectionVisibility ?? {}) as Record<string, boolean>;
  const isVisible = (key: string) => flags[key] !== false;
  const setFlag = (key: string, v: boolean) => {
    const next = { ...flags, [key]: v };
    setData({ ...(data as any), sectionVisibility: next } as SiteContent);
  };
  return (
    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
      {SECTION_FLAGS.map((s) => (
        <div key={s.key} className="flex items-start justify-between gap-3 py-2 border-b border-line/60 last:border-b-0">
          <div className="min-w-0">
            <p className="text-sm font-medium">{s.label}</p>
            <p className="text-xs text-muted">{s.description}</p>
          </div>
          <Toggle value={isVisible(s.key)} onChange={(v) => setFlag(s.key, v)} label="" />
        </div>
      ))}
    </div>
  );
}

/* ─── Branchen-Texte editor (variant copy overrides) ──────────── */

function BranchTextEditor({ data, setData, tpl }: SectionProps) {
  const bt = ((data as any).branchText ?? {}) as Record<string, any>;
  const def = branchTextDefaults(tpl);
  const update = (patch: Record<string, any>) => {
    setData({ ...(data as any), branchText: { ...bt, ...patch } } as SiteContent);
  };
  const marqueeStr = Array.isArray(bt.marqueeWords) ? bt.marqueeWords.join(', ') : '';
  return (
    <div className="grid gap-4">
      <Field label="Hero-Untertitel (Branchen-Standard)" hint={`Standard: ${def.teaserSubtitle}`}>
        <textarea
          className={inputCls}
          rows={2}
          value={bt.teaserSubtitle ?? ''}
          onChange={(e) => update({ teaserSubtitle: e.target.value })}
          placeholder={def.teaserSubtitle}
        />
      </Field>
      <Field label="Marquee / Laufband-Wörter (kommagetrennt)" hint={`Standard: ${def.marqueeWords.join(', ')}`}>
        <input
          className={inputCls}
          value={marqueeStr}
          onChange={(e) => {
            const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
            update({ marqueeWords: arr });
          }}
          placeholder={def.marqueeWords.join(', ')}
        />
      </Field>
      <Field label="Galerie-Teaser-Titel" hint={`Standard: ${def.galleryTeaserTitle} – die zweite Hälfte wird automatisch kursiv.`}>
        <input
          className={inputCls}
          value={bt.galleryTeaserTitle ?? ''}
          onChange={(e) => update({ galleryTeaserTitle: e.target.value })}
          placeholder={def.galleryTeaserTitle}
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Testimonials Eyebrow" hint={`Standard: ${def.testimonialsEyebrow}`}>
          <input className={inputCls} value={bt.testimonialsEyebrow ?? ''} onChange={(e) => update({ testimonialsEyebrow: e.target.value })} placeholder={def.testimonialsEyebrow} />
        </Field>
        <Field label="Testimonials Titel" hint={`Standard: ${def.testimonialsTitle}`}>
          <input className={inputCls} value={bt.testimonialsTitle ?? ''} onChange={(e) => update({ testimonialsTitle: e.target.value })} placeholder={def.testimonialsTitle} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Manifest Eyebrow" hint={`Standard: ${def.manifestEyebrow}`}>
          <input className={inputCls} value={bt.manifestEyebrow ?? ''} onChange={(e) => update({ manifestEyebrow: e.target.value })} placeholder={def.manifestEyebrow} />
        </Field>
        <Field label="Manifest Titel" hint={`Standard: ${def.manifestTitle}`}>
          <input className={inputCls} value={bt.manifestTitle ?? ''} onChange={(e) => update({ manifestTitle: e.target.value })} placeholder={def.manifestTitle} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Soft-CTA Eyebrow" hint={`Standard: ${def.softCtaEyebrow}`}>
          <input className={inputCls} value={bt.softCtaEyebrow ?? ''} onChange={(e) => update({ softCtaEyebrow: e.target.value })} placeholder={def.softCtaEyebrow} />
        </Field>
        <Field label="Soft-CTA Titel" hint={`Standard: ${def.softCtaTitle}`}>
          <input className={inputCls} value={bt.softCtaTitle ?? ''} onChange={(e) => update({ softCtaTitle: e.target.value })} placeholder={def.softCtaTitle} />
        </Field>
      </div>
      <Field label="Soft-CTA Text" hint={`Standard: ${def.softCtaText}`}>
        <input className={inputCls} value={bt.softCtaText ?? ''} onChange={(e) => update({ softCtaText: e.target.value })} placeholder={def.softCtaText} />
      </Field>
      <Field label="Soft-CTA Button-Beschriftung" hint={`Standard: ${def.softCtaButton}`}>
        <input className={inputCls} value={bt.softCtaButton ?? ''} onChange={(e) => update({ softCtaButton: e.target.value })} placeholder={def.softCtaButton} />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="News-Teaser Eyebrow" hint="Kleine Beschriftung über der Überschrift. Standard: Aktuelles">
          <input className={inputCls} value={bt.newsEyebrow ?? ''} onChange={(e) => update({ newsEyebrow: e.target.value })} placeholder="Aktuelles" />
        </Field>
        <Field label="News-Teaser Überschrift" hint="Standard: Notizen.">
          <input className={inputCls} value={bt.newsTitle ?? ''} onChange={(e) => update({ newsTitle: e.target.value })} placeholder="Notizen." />
        </Field>
      </div>
    </div>
  );
}

/* ─── News / Blog editor (CRUD) ─────────────────────────────── */

function NewsHomePreview({ data }: { data: SiteContent }) {
  const list = (((data as any).posts as any[] | undefined) ?? [])
    .filter((p) => p && p.published !== false && (p.title || p.body || p.bodyHtml))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 3);
  if (list.length === 0) {
    return <p className="text-xs text-muted">Aktuell keine veröffentlichten Beiträge – die Sektion bleibt auf der Website ausgeblendet.</p>;
  }
  return (
    <ul className="grid sm:grid-cols-3 gap-3">
      {list.map((p) => (
        <li key={p.id} className="border border-line rounded-xl overflow-hidden bg-white">
          {p.imageUrl && <img src={p.imageUrl} alt="" className="aspect-[16/10] w-full object-cover" />}
          <div className="p-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">{p.date}</p>
            <p className="text-sm font-medium line-clamp-2 mt-1">{p.title}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

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
    const initialTitle = 'Neuer Beitrag';
    const baseSlug = slugify(initialTitle);
    const existing = new Set(list.map((p) => p.slug));
    let slug = baseSlug;
    let n = 2;
    while (existing.has(slug)) { slug = `${baseSlug}-${n++}`; }
    setList([
      {
        id: 'p_' + Math.random().toString(36).slice(2, 9),
        title: initialTitle,
        slug,
        date: today,
        excerpt: '',
        body: '',
        bodyHtml: '',
        imageUrl: '',
        published: true,
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
                  <Field label="Inhalt" hint="Rich-Text-Editor: Überschriften, Listen, Links, Zitate. Format-Buttons in der Leiste oben.">
                    <RichTextEditor
                      value={p.bodyHtml || ''}
                      onChange={(html) => update(i, { bodyHtml: html })}
                      placeholder="Schreiben Sie hier den Beitrag …"
                      rows={12}
                    />
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
    { n: 'Andreas Mayer', r: 'Bauleiter · Meister', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80', bio: 'Über 200 Projekte begleitet.' },
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

/* ═══════════════════════════════════════════════════════════════════
   Phase 2 — Branch-specific module editors
   Wired into ServicesPageEditor (conditional by tpl).
   ═══════════════════════════════════════════════════════════════════ */

/* ───── Restaurant: menu (categorised) ───── */
type MenuItem = { name: string; description?: string; price?: string; allergens?: string; tags?: string[] };
type MenuCategory = { category: string; description?: string; items: MenuItem[] };

function MenuEditor({ data, setData }: SetterProps) {
  const list = ((data as any).menu as MenuCategory[] | undefined) ?? [];
  const setList = (next: MenuCategory[]) => setData({ ...(data as any), menu: next } as SiteContent);
  const setCat = (i: number, next: MenuCategory) => setList(list.map((x, j) => (j === i ? next : x)));
  return (
    <div className="space-y-4">
      {list.map((cat, i) => (
        <details key={i} className="border border-line rounded-2xl bg-[#fafaf7]" open={i === 0}>
          <summary className="px-4 py-3 cursor-pointer flex items-center gap-3 list-none">
            <span className="font-mono text-xs text-muted w-6">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{cat.category || 'Neue Kategorie'}</p>
              <p className="text-xs text-muted truncate">{cat.items.length} Gerichte</p>
            </div>
            <span className="text-muted text-xs">▾</span>
          </summary>
          <div className="px-4 pb-4 pt-3 space-y-3 border-t border-line">
            <Field label="Kategorie">
              <input className={inputCls} value={cat.category} onChange={(e) => setCat(i, { ...cat, category: e.target.value })} />
            </Field>
            <Field label="Kategorie-Beschreibung (optional)">
              <input className={inputCls} value={cat.description || ''} onChange={(e) => setCat(i, { ...cat, description: e.target.value })} />
            </Field>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Gerichte</p>
              <div className="space-y-2">
                {cat.items.map((it, k) => (
                  <div key={k} className="border border-line rounded-xl p-3 bg-white space-y-2">
                    <div className="grid sm:grid-cols-[1fr_120px] gap-2">
                      <input className={inputCls} placeholder="Name" value={it.name} onChange={(e) => setCat(i, { ...cat, items: cat.items.map((x, m) => m === k ? { ...x, name: e.target.value } : x) })} />
                      <input className={inputCls} placeholder="Preis" value={it.price || ''} onChange={(e) => setCat(i, { ...cat, items: cat.items.map((x, m) => m === k ? { ...x, price: e.target.value } : x) })} />
                    </div>
                    <textarea className={inputCls} rows={2} placeholder="Beschreibung" value={it.description || ''} onChange={(e) => setCat(i, { ...cat, items: cat.items.map((x, m) => m === k ? { ...x, description: e.target.value } : x) })} />
                    <div className="grid sm:grid-cols-2 gap-2">
                      <input className={inputCls} placeholder="Allergene (z. B. A, G, L)" value={it.allergens || ''} onChange={(e) => setCat(i, { ...cat, items: cat.items.map((x, m) => m === k ? { ...x, allergens: e.target.value } : x) })} />
                      <input className={inputCls} placeholder="Tags (kommasepariert)" value={(it.tags || []).join(', ')} onChange={(e) => setCat(i, { ...cat, items: cat.items.map((x, m) => m === k ? { ...x, tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) } : x) })} />
                    </div>
                    <div className="flex justify-end">
                      <button onClick={() => setCat(i, { ...cat, items: cat.items.filter((_, m) => m !== k) })} className="text-xs text-rose-600 hover:underline">Gericht entfernen</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => setCat(i, { ...cat, items: [...cat.items, { name: '', description: '', price: '', allergens: '', tags: [] }] })} className="btn-outline !px-4 !py-2 text-sm">+ Gericht hinzufügen</button>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setList(list.filter((_, j) => j !== i))} className="text-xs text-rose-600 hover:underline">Kategorie entfernen</button>
            </div>
          </div>
        </details>
      ))}
      <button onClick={() => setList([...list, { category: '', description: '', items: [] }])} className="btn-outline !px-4 !py-2 text-sm">+ Kategorie hinzufügen</button>
    </div>
  );
}

/* ───── Hotel: rooms ───── */
type Room = { name: string; description?: string; size?: string; beds?: string; price?: string; imageUrl?: string; features?: string[] };

function RoomsEditor({ data, setData }: SetterProps) {
  const list = ((data as any).rooms as Room[] | undefined) ?? [];
  const setList = (next: Room[]) => setData({ ...(data as any), rooms: next } as SiteContent);
  const update = (i: number, next: Room) => setList(list.map((x, j) => j === i ? next : x));
  return (
    <div className="space-y-3">
      {list.map((r, i) => (
        <details key={i} className="border border-line rounded-2xl bg-[#fafaf7]" open={i === 0}>
          <summary className="px-4 py-3 cursor-pointer flex items-center gap-3 list-none">
            {r.imageUrl ? <img src={r.imageUrl} alt="" className="h-9 w-12 rounded object-cover" /> : <div className="h-9 w-12 rounded bg-[#eaeae3]" />}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{r.name || 'Neues Zimmer'}</p>
              <p className="text-xs text-muted truncate">{[r.size, r.beds, r.price].filter(Boolean).join(' · ')}</p>
            </div>
            <span className="text-muted text-xs">▾</span>
          </summary>
          <div className="px-4 pb-4 pt-3 space-y-3 border-t border-line">
            <Field label="Name"><input className={inputCls} value={r.name} onChange={(e) => update(i, { ...r, name: e.target.value })} /></Field>
            <Field label="Beschreibung"><textarea className={inputCls} rows={2} value={r.description || ''} onChange={(e) => update(i, { ...r, description: e.target.value })} /></Field>
            <div className="grid sm:grid-cols-3 gap-2">
              <input className={inputCls} placeholder="Größe (z. B. 32 m²)" value={r.size || ''} onChange={(e) => update(i, { ...r, size: e.target.value })} />
              <input className={inputCls} placeholder="Betten (z. B. King)" value={r.beds || ''} onChange={(e) => update(i, { ...r, beds: e.target.value })} />
              <input className={inputCls} placeholder="Preis (z. B. ab 180 €)" value={r.price || ''} onChange={(e) => update(i, { ...r, price: e.target.value })} />
            </div>
            <Field label="Ausstattung (kommasepariert)">
              <input className={inputCls} value={(r.features || []).join(', ')} onChange={(e) => update(i, { ...r, features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
            </Field>
            <ImagePickerField label="Bild" value={r.imageUrl || ''} onChange={(v) => update(i, { ...r, imageUrl: v })} />
            <div className="flex justify-end"><button onClick={() => setList(list.filter((_, j) => j !== i))} className="text-xs text-rose-600 hover:underline">Zimmer entfernen</button></div>
          </div>
        </details>
      ))}
      <button onClick={() => setList([...list, { name: '', description: '', size: '', beds: '', price: '', imageUrl: '', features: [] }])} className="btn-outline !px-4 !py-2 text-sm">+ Zimmer hinzufügen</button>
    </div>
  );
}

/* ───── Tourism: tours ───── */
type Tour = { name: string; description?: string; duration?: string; level?: string; groupSize?: string; price?: string; imageUrl?: string; languages?: string[] };

function ToursEditor({ data, setData }: SetterProps) {
  const list = ((data as any).tours as Tour[] | undefined) ?? [];
  const setList = (next: Tour[]) => setData({ ...(data as any), tours: next } as SiteContent);
  const update = (i: number, next: Tour) => setList(list.map((x, j) => j === i ? next : x));
  return (
    <div className="space-y-3">
      {list.map((t, i) => (
        <details key={i} className="border border-line rounded-2xl bg-[#fafaf7]" open={i === 0}>
          <summary className="px-4 py-3 cursor-pointer flex items-center gap-3 list-none">
            {t.imageUrl ? <img src={t.imageUrl} alt="" className="h-9 w-12 rounded object-cover" /> : <div className="h-9 w-12 rounded bg-[#eaeae3]" />}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t.name || 'Neue Tour'}</p>
              <p className="text-xs text-muted truncate">{[t.duration, t.level, t.price].filter(Boolean).join(' · ')}</p>
            </div>
            <span className="text-muted text-xs">▾</span>
          </summary>
          <div className="px-4 pb-4 pt-3 space-y-3 border-t border-line">
            <Field label="Name"><input className={inputCls} value={t.name} onChange={(e) => update(i, { ...t, name: e.target.value })} /></Field>
            <Field label="Beschreibung"><textarea className={inputCls} rows={2} value={t.description || ''} onChange={(e) => update(i, { ...t, description: e.target.value })} /></Field>
            <div className="grid sm:grid-cols-2 gap-2">
              <input className={inputCls} placeholder="Dauer (z. B. 4 Std.)" value={t.duration || ''} onChange={(e) => update(i, { ...t, duration: e.target.value })} />
              <input className={inputCls} placeholder='Level (z. B. "2/4 mittel")' value={t.level || ''} onChange={(e) => update(i, { ...t, level: e.target.value })} />
              <input className={inputCls} placeholder="Gruppengröße" value={t.groupSize || ''} onChange={(e) => update(i, { ...t, groupSize: e.target.value })} />
              <input className={inputCls} placeholder="Preis" value={t.price || ''} onChange={(e) => update(i, { ...t, price: e.target.value })} />
            </div>
            <Field label="Sprachen (kommasepariert)">
              <input className={inputCls} value={(t.languages || []).join(', ')} onChange={(e) => update(i, { ...t, languages: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
            </Field>
            <ImagePickerField label="Bild" value={t.imageUrl || ''} onChange={(v) => update(i, { ...t, imageUrl: v })} />
            <div className="flex justify-end"><button onClick={() => setList(list.filter((_, j) => j !== i))} className="text-xs text-rose-600 hover:underline">Tour entfernen</button></div>
          </div>
        </details>
      ))}
      <button onClick={() => setList([...list, { name: '', description: '', duration: '', level: '', groupSize: '', price: '', imageUrl: '', languages: [] }])} className="btn-outline !px-4 !py-2 text-sm">+ Tour hinzufügen</button>
    </div>
  );
}

/* ───── Salon: treatments ───── */
type Treatment = { name: string; description?: string; duration?: string; price?: string; category?: string };

function TreatmentsEditor({ data, setData }: SetterProps) {
  const list = ((data as any).treatments as Treatment[] | undefined) ?? [];
  const setList = (next: Treatment[]) => setData({ ...(data as any), treatments: next } as SiteContent);
  return (
    <RepeatableList items={list} onChange={setList} addLabel="+ Behandlung hinzufügen"
      newItem={() => ({ name: '', description: '', duration: '', price: '', category: '' })}
      render={(v, _i, set) => (
        <div className="grid sm:grid-cols-2 gap-2 flex-1">
          <input className={inputCls} placeholder="Kategorie (z. B. Hair – Color)" value={v.category || ''} onChange={(e) => set({ ...v, category: e.target.value })} />
          <input className={inputCls} placeholder="Name" value={v.name} onChange={(e) => set({ ...v, name: e.target.value })} />
          <input className={inputCls} placeholder="Dauer (z. B. 60 min)" value={v.duration || ''} onChange={(e) => set({ ...v, duration: e.target.value })} />
          <input className={inputCls} placeholder="Preis (z. B. ab 75 €)" value={v.price || ''} onChange={(e) => set({ ...v, price: e.target.value })} />
          <input className={inputCls + ' sm:col-span-2'} placeholder="Beschreibung (optional)" value={v.description || ''} onChange={(e) => set({ ...v, description: e.target.value })} />
        </div>
      )}
    />
  );
}

/* ───── Fitness: courses ───── */
type Course = { name: string; description?: string; schedule?: string; level?: string; duration?: string; trainer?: string; price?: string };

function CoursesEditor({ data, setData }: SetterProps) {
  const list = ((data as any).courses as Course[] | undefined) ?? [];
  const setList = (next: Course[]) => setData({ ...(data as any), courses: next } as SiteContent);
  return (
    <RepeatableList items={list} onChange={setList} addLabel="+ Kurs hinzufügen"
      newItem={() => ({ name: '', description: '', schedule: '', level: '', duration: '', trainer: '', price: '' })}
      render={(v, _i, set) => (
        <div className="grid sm:grid-cols-2 gap-2 flex-1">
          <input className={inputCls} placeholder="Name" value={v.name} onChange={(e) => set({ ...v, name: e.target.value })} />
          <input className={inputCls} placeholder="Zeitplan (Mo 18:00 · Mi 19:30)" value={v.schedule || ''} onChange={(e) => set({ ...v, schedule: e.target.value })} />
          <input className={inputCls} placeholder="Level" value={v.level || ''} onChange={(e) => set({ ...v, level: e.target.value })} />
          <input className={inputCls} placeholder="Dauer (60 min)" value={v.duration || ''} onChange={(e) => set({ ...v, duration: e.target.value })} />
          <input className={inputCls} placeholder="Trainer:in" value={v.trainer || ''} onChange={(e) => set({ ...v, trainer: e.target.value })} />
          <input className={inputCls} placeholder="Preis" value={v.price || ''} onChange={(e) => set({ ...v, price: e.target.value })} />
          <input className={inputCls + ' sm:col-span-2'} placeholder="Beschreibung (optional)" value={v.description || ''} onChange={(e) => set({ ...v, description: e.target.value })} />
        </div>
      )}
    />
  );
}

/* ───── Fitness/Consulting: packages ───── */
type Pkg = { name: string; price: string; period?: string; description?: string; features?: string[]; highlight?: boolean; ctaLabel?: string; ctaHref?: string };

function PackagesEditor({ data, setData }: SetterProps) {
  const list = ((data as any).packages as Pkg[] | undefined) ?? [];
  const setList = (next: Pkg[]) => setData({ ...(data as any), packages: next } as SiteContent);
  const update = (i: number, next: Pkg) => setList(list.map((x, j) => j === i ? next : x));
  return (
    <div className="space-y-3">
      {list.map((p, i) => (
        <details key={i} className="border border-line rounded-2xl bg-[#fafaf7]" open={i === 0}>
          <summary className="px-4 py-3 cursor-pointer flex items-center gap-3 list-none">
            <span className="font-mono text-xs text-muted w-6">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{p.name || 'Neues Paket'}{p.highlight && <span className="ml-2 text-[10px] uppercase bg-brand text-white rounded-full px-2 py-0.5">Highlight</span>}</p>
              <p className="text-xs text-muted truncate">{[p.price, p.period].filter(Boolean).join(' ')}</p>
            </div>
            <span className="text-muted text-xs">▾</span>
          </summary>
          <div className="px-4 pb-4 pt-3 space-y-3 border-t border-line">
            <div className="grid sm:grid-cols-2 gap-2">
              <input className={inputCls} placeholder="Paket-Name" value={p.name} onChange={(e) => update(i, { ...p, name: e.target.value })} />
              <input className={inputCls} placeholder="Preis (z. B. 89 €)" value={p.price} onChange={(e) => update(i, { ...p, price: e.target.value })} />
              <input className={inputCls} placeholder="Periode (z. B. / Monat)" value={p.period || ''} onChange={(e) => update(i, { ...p, period: e.target.value })} />
              <input className={inputCls} placeholder="Kurzbeschreibung" value={p.description || ''} onChange={(e) => update(i, { ...p, description: e.target.value })} />
            </div>
            <Field label="Features (eine pro Zeile)">
              <textarea className={inputCls} rows={4} value={(p.features || []).join('\n')} onChange={(e) => update(i, { ...p, features: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-2">
              <input className={inputCls} placeholder="CTA-Label (z. B. Jetzt buchen)" value={p.ctaLabel || ''} onChange={(e) => update(i, { ...p, ctaLabel: e.target.value })} />
              <input className={inputCls} placeholder="CTA-Ziel (z. B. /kontakt)" value={p.ctaHref || ''} onChange={(e) => update(i, { ...p, ctaHref: e.target.value })} />
            </div>
            <div className="flex items-center justify-between">
              <Toggle value={!!p.highlight} onChange={(v) => update(i, { ...p, highlight: v })} label="Als Highlight markieren" />
              <button onClick={() => setList(list.filter((_, j) => j !== i))} className="text-xs text-rose-600 hover:underline">Paket entfernen</button>
            </div>
          </div>
        </details>
      ))}
      <button onClick={() => setList([...list, { name: '', price: '', period: '', description: '', features: [], highlight: false, ctaLabel: '', ctaHref: '' }])} className="btn-outline !px-4 !py-2 text-sm">+ Paket hinzufügen</button>
    </div>
  );
}

/* ───── Consulting: process steps ───── */
type Step = { title: string; description?: string; duration?: string };

function ProcessStepsEditor({ data, setData }: SetterProps) {
  const list = ((data as any).processSteps as Step[] | undefined) ?? [];
  const setList = (next: Step[]) => setData({ ...(data as any), processSteps: next } as SiteContent);
  return (
    <RepeatableList items={list} onChange={setList} addLabel="+ Schritt hinzufügen"
      newItem={() => ({ title: '', description: '', duration: '' })}
      render={(v, i, set) => (
        <div className="grid sm:grid-cols-[80px_1fr_120px] gap-2 flex-1 items-start">
          <span className="font-mono text-xs text-muted self-center">Schritt {i + 1}</span>
          <input className={inputCls} placeholder="Titel" value={v.title} onChange={(e) => set({ ...v, title: e.target.value })} />
          <input className={inputCls} placeholder="Dauer (z. B. 1 Wo.)" value={v.duration || ''} onChange={(e) => set({ ...v, duration: e.target.value })} />
          <textarea className={inputCls + ' sm:col-span-3'} rows={2} placeholder="Beschreibung" value={v.description || ''} onChange={(e) => set({ ...v, description: e.target.value })} />
        </div>
      )}
    />
  );
}

/* ───── Medical: doctors ───── */
type Doctor = { name: string; role?: string; specialty?: string; imageUrl?: string; bio?: string };

function DoctorsEditor({ data, setData }: SetterProps) {
  const list = ((data as any).doctors as Doctor[] | undefined) ?? [];
  const setList = (next: Doctor[]) => setData({ ...(data as any), doctors: next } as SiteContent);
  const update = (i: number, next: Doctor) => setList(list.map((x, j) => j === i ? next : x));
  return (
    <div className="space-y-3">
      {list.map((d, i) => (
        <details key={i} className="border border-line rounded-2xl bg-[#fafaf7]" open={i === 0}>
          <summary className="px-4 py-3 cursor-pointer flex items-center gap-3 list-none">
            {d.imageUrl ? <img src={d.imageUrl} alt="" className="h-9 w-9 rounded-full object-cover" /> : <div className="h-9 w-9 rounded-full bg-[#eaeae3]" />}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{d.name || 'Neuer Eintrag'}</p>
              <p className="text-xs text-muted truncate">{[d.role, d.specialty].filter(Boolean).join(' · ')}</p>
            </div>
            <span className="text-muted text-xs">▾</span>
          </summary>
          <div className="px-4 pb-4 pt-3 space-y-3 border-t border-line">
            <div className="grid sm:grid-cols-2 gap-2">
              <input className={inputCls} placeholder="Name (z. B. Dr. med. …)" value={d.name} onChange={(e) => update(i, { ...d, name: e.target.value })} />
              <input className={inputCls} placeholder="Rolle (z. B. Praxisinhaberin)" value={d.role || ''} onChange={(e) => update(i, { ...d, role: e.target.value })} />
            </div>
            <Field label="Fachgebiet"><input className={inputCls} value={d.specialty || ''} onChange={(e) => update(i, { ...d, specialty: e.target.value })} /></Field>
            <Field label="Kurzbio"><textarea className={inputCls} rows={2} value={d.bio || ''} onChange={(e) => update(i, { ...d, bio: e.target.value })} /></Field>
            <ImagePickerField label="Foto" value={d.imageUrl || ''} onChange={(v) => update(i, { ...d, imageUrl: v })} />
            <div className="flex justify-end"><button onClick={() => setList(list.filter((_, j) => j !== i))} className="text-xs text-rose-600 hover:underline">Eintrag entfernen</button></div>
          </div>
        </details>
      ))}
      <button onClick={() => setList([...list, { name: '', role: '', specialty: '', imageUrl: '', bio: '' }])} className="btn-outline !px-4 !py-2 text-sm">+ Person hinzufügen</button>
    </div>
  );
}

/* ───── Medical: booking config ───── */
type Booking = { enabled?: boolean; provider?: string; url?: string; embedUrl?: string; note?: string };

function BookingEditor({ data, setData }: SetterProps) {
  const v: Booking = ((data as any).booking as Booking | undefined) ?? {};
  const set = (next: Booking) => setData({ ...(data as any), booking: next } as SiteContent);
  return (
    <div className="space-y-3">
      <Toggle value={!!v.enabled} onChange={(b) => set({ ...v, enabled: b })} label="Online-Termin-Modul aktiv" />
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Anbieter">
          <select className={inputCls} value={v.provider || ''} onChange={(e) => set({ ...v, provider: e.target.value })}>
            <option value="">— wählen —</option>
            <option value="Doctolib">Doctolib</option>
            <option value="jameda">jameda</option>
            <option value="TIMIFY">TIMIFY</option>
            <option value="Calendly">Calendly</option>
            <option value="Custom">Andere</option>
          </select>
        </Field>
        <Field label="Profil-URL (für CTA)"><input className={inputCls} placeholder="https://www.doctolib.de/…" value={v.url || ''} onChange={(e) => set({ ...v, url: e.target.value })} /></Field>
      </div>
      <Field label="Embed-URL (optional)" hint="Wenn gesetzt wird ein Iframe eingebettet statt eines CTA-Buttons.">
        <input className={inputCls} value={v.embedUrl || ''} onChange={(e) => set({ ...v, embedUrl: e.target.value })} />
      </Field>
      <Field label="Hinweistext (optional)"><textarea className={inputCls} rows={2} value={v.note || ''} onChange={(e) => set({ ...v, note: e.target.value })} /></Field>
    </div>
  );
}

/* ───── Tradesman: funding items ───── */
type FundingItem = { title: string; description?: string; percent?: string; program?: string };

function FundingEditor({ data, setData }: SetterProps) {
  const list = ((data as any).fundingItems as FundingItem[] | undefined) ?? [];
  const setList = (next: FundingItem[]) => setData({ ...(data as any), fundingItems: next } as SiteContent);
  return (
    <RepeatableList items={list} onChange={setList} addLabel="+ Förderung hinzufügen"
      newItem={() => ({ title: '', description: '', percent: '', program: '' })}
      render={(v, _i, set) => (
        <div className="grid sm:grid-cols-2 gap-2 flex-1">
          <input className={inputCls} placeholder="Titel (z. B. Heizungstausch)" value={v.title} onChange={(e) => set({ ...v, title: e.target.value })} />
          <input className={inputCls} placeholder="Programm (z. B. KfW 458)" value={v.program || ''} onChange={(e) => set({ ...v, program: e.target.value })} />
          <input className={inputCls} placeholder="Prozent (z. B. 35 %)" value={v.percent || ''} onChange={(e) => set({ ...v, percent: e.target.value })} />
          <input className={inputCls} placeholder="Beschreibung" value={v.description || ''} onChange={(e) => set({ ...v, description: e.target.value })} />
        </div>
      )}
    />
  );
}

/* ───── Tradesman: emergency banner ───── */
type EmergencyBanner = { enabled?: boolean; text?: string; phone?: string; sticky?: boolean };

function EmergencyBannerEditor({ data, setData }: SetterProps) {
  const v: EmergencyBanner = ((data as any).emergencyBanner as EmergencyBanner | undefined) ?? {};
  const set = (next: EmergencyBanner) => setData({ ...(data as any), emergencyBanner: next } as SiteContent);
  return (
    <div className="space-y-3">
      <Toggle value={!!v.enabled} onChange={(b) => set({ ...v, enabled: b })} label="Notdienst-Banner anzeigen" />
      <Field label="Text" hint="Erscheint im Banner neben der Telefonnummer.">
        <input className={inputCls} placeholder="24 h Notdienst" value={v.text || ''} onChange={(e) => set({ ...v, text: e.target.value })} />
      </Field>
      <Field label="Telefonnummer">
        <input className={inputCls} placeholder="+49 …" value={v.phone || ''} onChange={(e) => set({ ...v, phone: e.target.value })} />
      </Field>
      <Toggle value={v.sticky !== false} onChange={(b) => set({ ...v, sticky: b })} label="Sticky (unten rechts beim Scrollen einblenden)" />
    </div>
  );
}
