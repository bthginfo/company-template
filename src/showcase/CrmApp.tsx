import { useEffect, useMemo, useState, useCallback } from 'react';
import Seo from '@/components/Seo';

type ProspectStatus = 'neu' | 'angefragt' | 'reminder' | 'angenommen' | 'abgelehnt';
type MailKind = 'initial' | 'reminder';
type TemplateKey = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism' | 'consulting' | 'medical' | 'fitness';
type TemplateStyle = 'classic' | 'modern' | 'bold';

type Prospect = {
  id: string;
  categoryId: string | null;
  name: string;
  company: string;
  address: string;
  email: string;
  websiteOld: string;
  websiteNew: string;
  status: ProspectStatus;
  notes: string;
  lastEmailSubject: string | null;
  lastEmailBody: string | null;
  lastEmailedAt: string | null;
  provisionedTenantSlug: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProspectCategory = {
  id: string;
  name: string;
};

type ProvisioningResponse = {
  ok: true;
  provisioning: {
    slug: string;
    tenantId: string;
    tenantWasNew: boolean;
    password: string | null;
    projectUrl: string;
    loginUrl: string;
    deploymentState: string;
    deploymentUrl?: string;
  };
};

type CrmTab = 'prospects' | 'tenants';

type TenantRow = {
  id: string;
  slug: string;
  name: string;
  template: string;
  style: string;
  createdAt: string;
  contentUpdatedAt: string | null;
  adminUrl: string;
  siteUrl: string;
};

const STATUS_LABEL: Record<ProspectStatus, string> = {
  neu: 'Neu',
  angefragt: 'Angefragt',
  reminder: 'Reminder versendet',
  angenommen: 'Angenommen',
  abgelehnt: 'Abgelehnt',
};

const STATUS_BADGE: Record<ProspectStatus, string> = {
  neu: 'bg-slate-100 text-slate-700',
  angefragt: 'bg-blue-100 text-blue-700',
  reminder: 'bg-amber-100 text-amber-700',
  angenommen: 'bg-emerald-100 text-emerald-700',
  abgelehnt: 'bg-rose-100 text-rose-700',
};

const EMPTY_FORM = {
  categoryId: '',
  name: '',
  company: '',
  address: '',
  email: '',
  websiteOld: '',
  websiteNew: '',
  status: 'neu' as ProspectStatus,
  notes: '',
};

export default function CrmApp() {
  const [loadingSession, setLoadingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [crmTab, setCrmTab] = useState<CrmTab>('prospects');

  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [categories, setCategories] = useState<ProspectCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loadingProspects, setLoadingProspects] = useState(false);
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState<Prospect | null>(null);

  const [emailModal, setEmailModal] = useState<{ open: boolean; p: Prospect | null }>({ open: false, p: null });
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; p: Prospect | null }>({ open: false, p: null });
  const [emailKind, setEmailKind] = useState<MailKind>('initial');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const [provisionModal, setProvisionModal] = useState<{ open: boolean; p: Prospect | null }>({ open: false, p: null });
  const [provSlug, setProvSlug] = useState('');
  const [provName, setProvName] = useState('');
  const [provTemplate, setProvTemplate] = useState<TemplateKey>('restaurant');
  const [provStyle, setProvStyle] = useState<TemplateStyle>('modern');
  const [provPassword, setProvPassword] = useState('');
  const [provContentJson, setProvContentJson] = useState<Record<string, unknown> | null>(null);
  const [provContentName, setProvContentName] = useState('');
  const [provResult, setProvResult] = useState<ProvisioningResponse['provisioning'] | null>(null);

  // Tenants tab state
  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [loadingTenants, setLoadingTenants] = useState(false);
  const [tenantSearch, setTenantSearch] = useState('');
  const [dupModal, setDupModal] = useState<{ open: boolean; t: TenantRow | null }>({ open: false, t: null });
  const [dupSlug, setDupSlug] = useState('');
  const [dupName, setDupName] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; t: TenantRow | null }>({ open: false, t: null });
  const [deleteVercel, setDeleteVercel] = useState(true);

  // On mobile, collapse the create/edit form to keep the prospect list above the fold.
  const [formOpen, setFormOpen] = useState(false);

  const sorted = useMemo(
    () => [...prospects].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [prospects],
  );

  const categoryNameById = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((c) => map.set(c.id, c.name));
    return map;
  }, [categories]);

  const filtered = useMemo(
    () => sorted.filter((p) => categoryFilter === 'all' || p.categoryId === categoryFilter),
    [sorted, categoryFilter],
  );

  const filteredTenants = useMemo(() => {
    if (!tenantSearch.trim()) return tenants;
    const q = tenantSearch.toLowerCase();
    return tenants.filter((t) => t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q) || t.template.includes(q));
  }, [tenants, tenantSearch]);

  useEffect(() => {
    void (async () => {
      try {
        const data = await req<{ authenticated: boolean }>('/api/crm/session');
        setAuthenticated(!!data.authenticated);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoadingSession(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    void Promise.all([reloadProspects(), reloadCategories()]);
    if (crmTab === 'tenants') void reloadTenants();
  }, [authenticated]);

  useEffect(() => {
    if (authenticated && crmTab === 'tenants' && tenants.length === 0) void reloadTenants();
  }, [crmTab]);

  useEffect(() => {
    if (!emailModal.p) return;
    setEmailTo(emailModal.p.email || '');
    const draft = emailKind === 'initial' ? draftInitial(emailModal.p) : draftReminder(emailModal.p);
    setEmailSubject(draft.subject);
    setEmailBody(draft.body);
  }, [emailModal.p, emailKind]);

  const reloadProspects = async () => {
    setLoadingProspects(true);
    try {
      const data = await req<{ prospects: Prospect[] }>('/api/prospects');
      setProspects(data.prospects || []);
    } finally {
      setLoadingProspects(false);
    }
  };

  const reloadCategories = async () => {
    const data = await req<{ categories: ProspectCategory[] }>('/api/prospect-categories');
    setCategories(data.categories || []);
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditing(null);
  };

  const submitForm = async () => {
    if (!form.name.trim()) {
      alert('Bitte zumindest einen Namen angeben.');
      return;
    }
    setBusy(true);
    try {
      if (editing) {
        await req(`/api/prospects/item?id=${encodeURIComponent(editing.id)}`, {
          method: 'POST',
          body: JSON.stringify({ ...form, categoryId: form.categoryId || null }),
        });
      } else {
        await req('/api/prospects', {
          method: 'POST',
          body: JSON.stringify({ ...form, categoryId: form.categoryId || null }),
        });
      }
      await reloadProspects();
      resetForm();
    } catch (e: any) {
      alert(e?.message || 'Speichern fehlgeschlagen.');
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (p: Prospect) => {
    setEditing(p);
    setForm({
      categoryId: p.categoryId || '',
      name: p.name || '',
      company: p.company || '',
      address: p.address || '',
      email: p.email || '',
      websiteOld: p.websiteOld || '',
      websiteNew: p.websiteNew || '',
      status: p.status,
      notes: p.notes || '',
    });
    // On mobile the form is collapsed by default; open it when editing.
    setFormOpen(true);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeProspect = async (p: Prospect) => {
    if (!confirm(`Prospect "${p.name}" wirklich löschen?`)) return;
    setBusy(true);
    try {
      await req(`/api/prospects/item?id=${encodeURIComponent(p.id)}`, { method: 'DELETE' });
      await reloadProspects();
      if (editing?.id === p.id) resetForm();
    } catch (e: any) {
      alert(e?.message || 'Löschen fehlgeschlagen.');
    } finally {
      setBusy(false);
    }
  };

  const openEmail = (p: Prospect) => {
    setEmailKind('initial');
    setEmailModal({ open: true, p });
  };

  const sendEmail = async () => {
    if (!emailModal.p) return;
    setBusy(true);
    try {
      await req(`/api/prospects/${emailModal.p.id}/email`, {
        method: 'POST',
        body: JSON.stringify({
          kind: emailKind,
          to: emailTo,
          subject: emailSubject,
          body: emailBody,
        }),
      });
      await reloadProspects();
      setEmailModal({ open: false, p: null });
      alert('E-Mail wurde versendet.');
    } catch (e: any) {
      alert(e?.message || 'Mailversand fehlgeschlagen.');
    } finally {
      setBusy(false);
    }
  };

  const openProvision = (p: Prospect) => {
    setProvResult(null);
    setProvSlug(slugify(p.company || p.name));
    setProvName((p.company || p.name || '').trim());
    setProvPassword('');
    setProvContentJson(null);
    setProvContentName('');
    setProvisionModal({ open: true, p });
  };

  const runProvision = async () => {
    if (!provisionModal.p) return;
    setBusy(true);
    try {
      const data = await req<ProvisioningResponse>(`/api/prospects/provision?id=${encodeURIComponent(provisionModal.p.id)}`, {
        method: 'POST',
        body: JSON.stringify({
          id: provisionModal.p.id,
          slug: provSlug,
          name: provName,
          template: provTemplate,
          style: provStyle,
          ...(provPassword.trim().length >= 8 ? { password: provPassword.trim() } : {}),
        }),
      });
      setProvResult(data.provisioning);
      // Auto-import content JSON if provided
      if (provContentJson) {
        try {
          await req(`/api/admin/import-content?slug=${encodeURIComponent(provSlug)}`, {
            method: 'POST',
            body: JSON.stringify(provContentJson),
          });
        } catch (e: any) {
          alert(`Tenant erstellt, aber Content-Import fehlgeschlagen: ${e?.message}`);
        }
      }
      await reloadProspects();
    } catch (e: any) {
      alert(e?.message || 'Provisioning fehlgeschlagen.');
    } finally {
      setBusy(false);
    }
  };

  const reloadTenants = useCallback(async () => {
    setLoadingTenants(true);
    try {
      const data = await req<TenantRow[]>('/api/tenants');
      setTenants(data);
    } catch { /* ignore */ } finally {
      setLoadingTenants(false);
    }
  }, []);

  const deleteTenant = async () => {
    if (!deleteModal.t) return;
    if (!confirm(`Tenant "${deleteModal.t.name}" (${deleteModal.t.slug}) wirklich löschen?`)) return;
    setBusy(true);
    try {
      await req('/api/tenants?action=delete', {
        method: 'POST',
        body: JSON.stringify({ slug: deleteModal.t.slug, deleteVercelProject: deleteVercel }),
      });
      setDeleteModal({ open: false, t: null });
      await reloadTenants();
    } catch (e: any) {
      alert(e?.message || 'Löschen fehlgeschlagen.');
    } finally {
      setBusy(false);
    }
  };

  const duplicateTenant = async () => {
    if (!dupModal.t) return;
    setBusy(true);
    try {
      await req('/api/tenants?action=duplicate', {
        method: 'POST',
        body: JSON.stringify({ sourceSlug: dupModal.t.slug, newSlug: dupSlug, newName: dupName }),
      });
      setDupModal({ open: false, t: null });
      await reloadTenants();
    } catch (e: any) {
      alert(e?.message || 'Duplizieren fehlgeschlagen.');
    } finally {
      setBusy(false);
    }
  };

  const doLogin = async () => {
    setLoginError(null);
    try {
      await req('/api/crm/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      setPassword('');
      setAuthenticated(true);
    } catch (e: any) {
      setLoginError(e?.message || 'Login fehlgeschlagen.');
    }
  };

  const doLogout = async () => {
    await req('/api/crm/logout', { method: 'POST' }).catch(() => null);
    setAuthenticated(false);
    setProspects([]);
    setCategories([]);
    resetForm();
  };

  const addCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;
    setBusy(true);
    try {
      await req('/api/prospect-categories', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      setNewCategoryName('');
      await reloadCategories();
    } catch (e: any) {
      alert(e?.message || 'Kategorie konnte nicht angelegt werden.');
    } finally {
      setBusy(false);
    }
  };

  const deleteCategory = async (c: ProspectCategory) => {
    if (!confirm(`Kategorie "${c.name}" wirklich löschen?`)) return;
    setBusy(true);
    try {
      await req(`/api/prospect-categories/${c.id}`, { method: 'DELETE' });
      if (form.categoryId === c.id) setForm((s) => ({ ...s, categoryId: '' }));
      if (categoryFilter === c.id) setCategoryFilter('all');
      await Promise.all([reloadCategories(), reloadProspects()]);
    } catch (e: any) {
      alert(e?.message || 'Kategorie konnte nicht gelöscht werden.');
    } finally {
      setBusy(false);
    }
  };

  if (loadingSession) {
    return <div className="min-h-screen bg-slate-950 text-white grid place-items-center">Lade CRM…</div>;
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,#f2417138,transparent_38%),linear-gradient(140deg,#0f172a,#111827_45%,#1f2937)] text-white px-4 py-16">
        <Seo title="Flamingo CRM" description="Interner CRM-Bereich" noindex />
        <section className="mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-white/10 backdrop-blur p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-200/90">Interner Bereich</p>
          <h1 className="mt-2 text-3xl font-semibold">Flamingo CRM</h1>
          <p className="mt-3 text-sm text-slate-200">Nur für Mario und dich. Nicht öffentlich, nicht indexiert.</p>
          <label className="block mt-6 text-sm text-slate-200">Passwort</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            onKeyDown={(e) => { if (e.key === 'Enter') void doLogin(); }}
            className="mt-2 w-full rounded-xl bg-slate-900/70 border border-white/20 px-3 py-2 outline-none focus:border-rose-300"
            placeholder="CRM Passwort"
          />
          {loginError ? <p className="mt-3 text-sm text-rose-300">{loginError}</p> : null}
          <button
            onClick={() => void doLogin()}
            className="mt-5 w-full rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-medium py-2.5 transition"
          >
            Einloggen
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Seo title="Flamingo CRM" description="Interner CRM-Bereich" noindex />

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-3 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Interner Admin</p>
              <h1 className="text-xl font-semibold">Flamingo CRM</h1>
            </div>
            <button
              className="btn-ghost !px-3 !py-2 text-sm sm:hidden"
              onClick={() => void doLogout()}
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <nav className="flex rounded-lg border border-slate-200 overflow-hidden flex-1 sm:flex-none sm:mr-2">
              <button onClick={() => setCrmTab('prospects')} className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium transition ${crmTab === 'prospects' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Prospects</button>
              <button onClick={() => setCrmTab('tenants')} className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium transition ${crmTab === 'tenants' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Tenants</button>
            </nav>
            <button className="btn-ghost !px-3 !py-2 text-sm" onClick={() => crmTab === 'prospects' ? void reloadProspects() : void reloadTenants()} disabled={loadingProspects || loadingTenants}>
              Aktualisieren
            </button>
            <button className="btn-ghost !px-3 !py-2 text-sm hidden sm:inline-flex" onClick={() => void doLogout()}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {crmTab === 'prospects' ? (
      <section className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:py-6 grid lg:grid-cols-[minmax(280px,320px),minmax(0,1fr)] gap-4 sm:gap-6">
        <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm h-fit lg:sticky lg:top-32 lg:p-4">
          <button
            type="button"
            onClick={() => setFormOpen((v) => !v)}
            className="lg:hidden w-full flex items-center justify-between gap-3 p-4 text-left"
            aria-expanded={formOpen}
          >
            <span className="text-base font-semibold">
              {editing ? 'Prospect bearbeiten' : 'Neuen Prospect anlegen'}
            </span>
            <span className={`text-slate-500 transition-transform ${formOpen ? 'rotate-180' : ''}`} aria-hidden>▾</span>
          </button>
          <h2 className="hidden lg:block text-lg font-semibold">{editing ? 'Prospect bearbeiten' : 'Neuen Prospect anlegen'}</h2>
          <div className={`${formOpen ? 'block' : 'hidden'} lg:block px-4 pb-4 lg:px-0 lg:pb-0 space-y-3 lg:mt-4`}>
            <div>
              <label className="text-sm text-slate-600">Kategorie</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm((s) => ({ ...s, categoryId: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 bg-white"
              >
                <option value="">Keine Kategorie</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <LabeledInput label="Name" value={form.name} onChange={(v) => setForm((s) => ({ ...s, name: v }))} />
            <LabeledInput label="Firma" value={form.company} onChange={(v) => setForm((s) => ({ ...s, company: v }))} />
            <LabeledInput label="E-Mail" value={form.email} onChange={(v) => setForm((s) => ({ ...s, email: v }))} />
            <LabeledInput label="Adresse" value={form.address} onChange={(v) => setForm((s) => ({ ...s, address: v }))} />
            <LabeledInput label="Website alt" value={form.websiteOld} onChange={(v) => setForm((s) => ({ ...s, websiteOld: v }))} />
            <LabeledInput label="Website neu" value={form.websiteNew} onChange={(v) => setForm((s) => ({ ...s, websiteNew: v }))} />
            <div>
              <label className="text-sm text-slate-600">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((s) => ({ ...s, status: e.target.value as ProspectStatus }))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 bg-white"
              >
                {Object.entries(STATUS_LABEL).map(([k, label]) => (
                  <option key={k} value={k}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600">Notizen</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
                rows={4}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 bg-white"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => void submitForm()}
                disabled={busy}
                className="rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-700 transition"
              >
                {editing ? 'Änderungen speichern' : 'Prospect anlegen'}
              </button>
              {editing ? (
                <button onClick={resetForm} className="btn-ghost !px-4 !py-2.5 text-sm">Abbrechen</button>
              ) : null}
            </div>

            <div className="pt-3 border-t border-slate-200">
              <p className="text-sm font-medium text-slate-700">Kategorien</p>
              <div className="mt-2 flex gap-2">
                <input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2 bg-white"
                  placeholder="Neue Kategorie anlegen"
                />
                <button onClick={() => void addCategory()} className="btn-ghost !px-3 !py-2 text-sm">Anlegen</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button key={c.id} onClick={() => void deleteCategory(c)} className="text-xs rounded-full border border-slate-300 px-2.5 py-1 hover:bg-slate-50" title="Kategorie löschen">
                    {c.name} ×
                  </button>
                ))}
                {!categories.length ? <span className="text-xs text-slate-500">Noch keine Kategorien.</span> : null}
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-3 sm:px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
            <h2 className="font-semibold">Prospects ({filtered.length})</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm bg-white"
              >
                <option value="all">Alle Kategorien</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {loadingProspects ? <span className="text-sm text-slate-500">Lade…</span> : null}
            </div>
          </div>

          {/* Mobile card list (md-) */}
          <div className="md:hidden divide-y divide-slate-100">
            {filtered.map((p) => (
              <article key={p.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{p.name || '-'}</div>
                    <div className="text-sm text-slate-600 truncate">{p.company || '-'}</div>
                  </div>
                  <span className={`shrink-0 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_BADGE[p.status]}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
                <dl className="grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1 text-xs">
                  {p.email ? (<><dt className="text-slate-500">E-Mail</dt><dd className="truncate"><a className="text-rose-600 underline-offset-2 hover:underline" href={`mailto:${p.email}`}>{p.email}</a></dd></>) : null}
                  {p.address ? (<><dt className="text-slate-500">Adresse</dt><dd className="truncate">{p.address}</dd></>) : null}
                  {p.categoryId ? (<><dt className="text-slate-500">Kategorie</dt><dd className="truncate">{categoryNameById.get(p.categoryId) || '-'}</dd></>) : null}
                  {p.lastEmailedAt ? (<><dt className="text-slate-500">Versand</dt><dd>{formatDate(p.lastEmailedAt)}</dd></>) : null}
                </dl>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button onClick={() => setDetailsModal({ open: true, p })} className="btn-ghost !px-2.5 !py-2 text-sm">Öffnen</button>
                  <button onClick={() => startEdit(p)} className="btn-ghost !px-2.5 !py-2 text-sm">Bearbeiten</button>
                  <button onClick={() => openEmail(p)} className="btn-ghost !px-2.5 !py-2 text-sm">Mail</button>
                  <button onClick={() => openProvision(p)} className="btn-ghost !px-2.5 !py-2 text-sm">Provision</button>
                  <button onClick={() => void removeProspect(p)} className="btn-ghost !px-2.5 !py-2 text-sm text-rose-700 col-span-2 sm:col-span-1">Löschen</button>
                </div>
              </article>
            ))}
            {!filtered.length ? (
              <p className="px-4 py-8 text-center text-slate-500">Keine Prospects für diesen Filter.</p>
            ) : null}
          </div>

          {/* Desktop table (md+) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <Th>Name</Th>
                  <Th>Firma</Th>
                  <Th>Kategorie</Th>
                  <Th>Status</Th>
                  <Th>Kontakt</Th>
                  <Th>Letzter Versand</Th>
                  <Th>Aktionen</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-slate-100 align-top">
                    <Td>
                      <div className="font-medium">{p.name || '-'}</div>
                      <div className="text-xs text-slate-500">{p.address || '-'}</div>
                    </Td>
                    <Td>
                      <div>{p.company || '-'}</div>
                      <div className="text-xs text-slate-500">{p.websiteOld || '-'}</div>
                    </Td>
                    <Td>{p.categoryId ? (categoryNameById.get(p.categoryId) || '-') : '-'}</Td>
                    <Td>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[p.status]}`}>
                        {STATUS_LABEL[p.status]}
                      </span>
                    </Td>
                    <Td>{p.email || '-'}</Td>
                    <Td>{p.lastEmailedAt ? formatDate(p.lastEmailedAt) : '-'}</Td>
                    <Td>
                      <div className="flex flex-nowrap gap-1.5">
                        <button onClick={() => setDetailsModal({ open: true, p })} className="btn-ghost shrink-0 !px-2.5 !py-1.5">Öffnen</button>
                        <button onClick={() => startEdit(p)} className="btn-ghost shrink-0 !px-2.5 !py-1.5">Edit</button>
                        <button onClick={() => openEmail(p)} className="btn-ghost shrink-0 !px-2.5 !py-1.5">Mail</button>
                        <button onClick={() => openProvision(p)} className="btn-ghost shrink-0 !px-2.5 !py-1.5">Provision</button>
                        <button onClick={() => void removeProspect(p)} className="btn-ghost shrink-0 !px-2.5 !py-1.5 text-rose-700">Löschen</button>
                      </div>
                    </Td>
                  </tr>
                ))}
                {!filtered.length ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">Keine Prospects für diesen Filter.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </section>
      ) : null}

      {crmTab === 'tenants' ? (
      <section className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:py-6">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-3 sm:px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
            <h2 className="font-semibold">Tenants ({filteredTenants.length})</h2>
            <div className="flex items-center gap-2 flex-1 sm:flex-none min-w-0 sm:min-w-[14rem] justify-end">
              <input
                value={tenantSearch}
                onChange={(e) => setTenantSearch(e.target.value)}
                placeholder="Suchen…"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm bg-white flex-1 sm:flex-none sm:w-56"
              />
              {loadingTenants ? <span className="text-sm text-slate-500">Lade…</span> : null}
            </div>
          </div>

          {/* Mobile card list (md-) */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredTenants.map((t) => (
              <article key={t.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{t.name}</div>
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{t.slug}</code>
                  </div>
                  <span className="shrink-0 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium">
                    {t.template} · {t.style}
                  </span>
                </div>
                <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1 text-xs">
                  <dt className="text-slate-500">Erstellt</dt>
                  <dd>{formatDate(t.createdAt)}</dd>
                  <dt className="text-slate-500">Content</dt>
                  <dd>{t.contentUpdatedAt ? formatDate(t.contentUpdatedAt) : '-'}</dd>
                </dl>
                <div className="flex flex-wrap gap-2 text-sm">
                  <a href={t.siteUrl} target="_blank" rel="noreferrer" className="btn-ghost !px-2.5 !py-2">Website ↗</a>
                  <a href={t.adminUrl} target="_blank" rel="noreferrer" className="btn-ghost !px-2.5 !py-2">Admin ↗</a>
                  <button onClick={() => { setDupSlug(t.slug + '-kopie'); setDupName(t.name + ' (Kopie)'); setDupModal({ open: true, t }); }} className="btn-ghost !px-2.5 !py-2">Duplizieren</button>
                  <button onClick={() => { setDeleteVercel(true); setDeleteModal({ open: true, t }); }} className="btn-ghost !px-2.5 !py-2 text-rose-700">Löschen</button>
                </div>
              </article>
            ))}
            {!filteredTenants.length ? (
              <p className="px-4 py-8 text-center text-slate-500">{tenantSearch ? 'Kein Tenant passt zum Filter.' : 'Noch keine Tenants angelegt.'}</p>
            ) : null}
          </div>

          {/* Desktop table (md+) */}
          <div className="hidden md:block overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <Th>Name</Th>
                  <Th>Slug</Th>
                  <Th>Template</Th>
                  <Th>Style</Th>
                  <Th>Erstellt</Th>
                  <Th>Content aktualisiert</Th>
                  <Th>Links</Th>
                  <Th>Aktionen</Th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((t) => (
                  <tr key={t.id} className="border-t border-slate-100 align-top">
                    <Td><span className="font-medium">{t.name}</span></Td>
                    <Td><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{t.slug}</code></Td>
                    <Td>{t.template}</Td>
                    <Td><span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium">{t.style}</span></Td>
                    <Td>{formatDate(t.createdAt)}</Td>
                    <Td>{t.contentUpdatedAt ? formatDate(t.contentUpdatedAt) : '-'}</Td>
                    <Td>
                      <div className="flex flex-col gap-0.5 text-xs">
                        <a href={t.siteUrl} target="_blank" rel="noreferrer" className="text-rose-600 hover:underline">Website ↗</a>
                        <a href={t.adminUrl} target="_blank" rel="noreferrer" className="text-rose-600 hover:underline">Admin ↗</a>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={() => { setDupSlug(t.slug + '-kopie'); setDupName(t.name + ' (Kopie)'); setDupModal({ open: true, t }); }} className="btn-ghost !px-2.5 !py-1.5">Duplizieren</button>
                        <button onClick={() => { setDeleteVercel(true); setDeleteModal({ open: true, t }); }} className="btn-ghost !px-2.5 !py-1.5 text-rose-700">Löschen</button>
                      </div>
                    </Td>
                  </tr>
                ))}
                {!filteredTenants.length ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-500">{tenantSearch ? 'Kein Tenant passt zum Filter.' : 'Noch keine Tenants angelegt.'}</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      ) : null}

      {dupModal.open && dupModal.t ? (
        <Modal title={`${dupModal.t.name} duplizieren`} onClose={() => setDupModal({ open: false, t: null })}>
          <div className="space-y-3">
            <p className="text-sm text-slate-600">Erstellt eine Kopie des Contents als neuen Tenant (ohne Vercel-Projekt – muss separat provisioniert werden).</p>
            <LabeledInput label="Neuer Slug" value={dupSlug} onChange={setDupSlug} />
            <LabeledInput label="Neuer Name" value={dupName} onChange={setDupName} />
            <div className="flex justify-end gap-2">
              <button className="btn-ghost !px-4 !py-2" onClick={() => setDupModal({ open: false, t: null })}>Abbrechen</button>
              <button className="rounded-xl bg-slate-900 text-white px-4 py-2 hover:bg-slate-700" onClick={() => void duplicateTenant()}>Duplizieren</button>
            </div>
          </div>
        </Modal>
      ) : null}

      {deleteModal.open && deleteModal.t ? (
        <Modal title={`Tenant „${deleteModal.t.name}" löschen`} onClose={() => setDeleteModal({ open: false, t: null })}>
          <div className="space-y-3">
            <p className="text-sm text-slate-600">Löscht den Tenant <strong>{deleteModal.t.slug}</strong> aus der Datenbank. Content und Zugangsdaten gehen verloren.</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={deleteVercel} onChange={(e) => setDeleteVercel(e.target.checked)} className="rounded" />
              Auch das Vercel-Projekt löschen
            </label>
            <div className="flex justify-end gap-2">
              <button className="btn-ghost !px-4 !py-2" onClick={() => setDeleteModal({ open: false, t: null })}>Abbrechen</button>
              <button className="rounded-xl bg-rose-600 text-white px-4 py-2 hover:bg-rose-700" onClick={() => void deleteTenant()}>Endgültig löschen</button>
            </div>
          </div>
        </Modal>
      ) : null}

      {emailModal.open && emailModal.p ? (
        <Modal title={`E-Mail an ${emailModal.p.name || emailModal.p.company || 'Prospect'}`} onClose={() => setEmailModal({ open: false, p: null })}>
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-slate-600">Typ</label>
                <select
                  value={emailKind}
                  onChange={(e) => setEmailKind(e.target.value as MailKind)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                >
                  <option value="initial">Erstkontakt</option>
                  <option value="reminder">Reminder</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Empfänger</label>
                <input
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-600">Betreff</label>
              <input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Nachricht</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={11}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button className="btn-ghost !px-4 !py-2" onClick={() => setEmailModal({ open: false, p: null })}>Abbrechen</button>
              <button className="rounded-xl bg-rose-500 text-white px-4 py-2 hover:bg-rose-400" onClick={() => void sendEmail()}>
                Senden
              </button>
            </div>
          </div>
        </Modal>
      ) : null}

      {detailsModal.open && detailsModal.p ? (
        <Modal title={`Prospect: ${detailsModal.p.name || detailsModal.p.company || '-'}`} onClose={() => setDetailsModal({ open: false, p: null })}>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Detail label="Kategorie" value={detailsModal.p.categoryId ? (categoryNameById.get(detailsModal.p.categoryId) || '-') : '-'} />
            <Detail label="Status" value={STATUS_LABEL[detailsModal.p.status]} />
            <Detail label="Name" value={detailsModal.p.name || '-'} />
            <Detail label="Firma" value={detailsModal.p.company || '-'} />
            <Detail label="E-Mail" value={detailsModal.p.email || '-'} />
            <Detail label="Adresse" value={detailsModal.p.address || '-'} />
            <Detail label="Website alt" value={detailsModal.p.websiteOld || '-'} />
            <Detail label="Website neu" value={detailsModal.p.websiteNew || '-'} />
            <Detail label="Letzte E-Mail" value={detailsModal.p.lastEmailedAt ? formatDate(detailsModal.p.lastEmailedAt) : '-'} />
            <Detail label="Provisioned Slug" value={detailsModal.p.provisionedTenantSlug || '-'} />
            <Detail label="Erstellt" value={formatDate(detailsModal.p.createdAt)} />
            <Detail label="Aktualisiert" value={formatDate(detailsModal.p.updatedAt)} />
          </div>
          <div className="mt-3">
            <p className="text-sm text-slate-600">Notizen</p>
            <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 p-3 whitespace-pre-wrap text-sm">
              {detailsModal.p.notes || '-'}
            </div>
          </div>
        </Modal>
      ) : null}

      {provisionModal.open && provisionModal.p ? (
        <Modal title={`Tenant für ${provisionModal.p.name || provisionModal.p.company || 'Prospect'} anlegen`} onClose={() => setProvisionModal({ open: false, p: null })}>
          <div className="space-y-3">
            <LabeledInput label="Slug" value={provSlug} onChange={setProvSlug} />
            <LabeledInput label="Name" value={provName} onChange={setProvName} />
            <div>
              <label className="text-sm text-slate-600">Passwort (min. 8 Zeichen, leer = auto)</label>
              <input type="text" value={provPassword} onChange={(e) => setProvPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 bg-white font-mono" placeholder="Leer = wird automatisch generiert" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Content-JSON (Perplexity-Export)</label>
              <input type="file" accept=".json" className="mt-1 w-full text-sm" onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) { setProvContentJson(null); setProvContentName(''); return; }
                setProvContentName(file.name);
                const reader = new FileReader();
                reader.onload = () => {
                  try {
                    const json = JSON.parse(reader.result as string);
                    setProvContentJson(json);
                    // Auto-set branch + style from JSON if present
                    if (json.branch) setProvTemplate(json.branch);
                    if (json.style) setProvStyle(json.style);
                  } catch { alert('Ungültiges JSON'); setProvContentJson(null); }
                };
                reader.readAsText(file);
              }} />
              {provContentName && provContentJson ? <p className="text-xs text-emerald-600 mt-1">✓ {provContentName} geladen{provContentJson.branch ? ` (${provContentJson.branch}/${(provContentJson as any).style || '?'})` : ''}</p> : null}
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-slate-600">Template</label>
                <select
                  value={provTemplate}
                  onChange={(e) => setProvTemplate(e.target.value as TemplateKey)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                >
                  <option value="restaurant">restaurant</option>
                  <option value="salon">salon</option>
                  <option value="tradesman">tradesman</option>
                  <option value="hotel">hotel</option>
                  <option value="tourism">tourism</option>
                  <option value="consulting">consulting</option>
                  <option value="medical">medical</option>
                  <option value="fitness">fitness</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Style</label>
                <select
                  value={provStyle}
                  onChange={(e) => setProvStyle(e.target.value as TemplateStyle)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                >
                  <option value="classic">classic</option>
                  <option value="modern">modern</option>
                  <option value="bold">bold</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="btn-ghost !px-4 !py-2" onClick={() => setProvisionModal({ open: false, p: null })}>Schließen</button>
              <button className="rounded-xl bg-slate-900 text-white px-4 py-2 hover:bg-slate-700" onClick={() => void runProvision()}>
                Provision starten
              </button>
            </div>

            {provResult ? (
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm space-y-1">
                <p><strong>Slug:</strong> {provResult.slug}</p>
                <p><strong>Projekt:</strong> <a href={provResult.projectUrl} target="_blank" rel="noreferrer" className="text-rose-600 underline">{provResult.projectUrl}</a></p>
                <p><strong>Admin:</strong> <a href={provResult.loginUrl} target="_blank" rel="noreferrer" className="text-rose-600 underline">{provResult.loginUrl}</a></p>
                <p><strong>Status:</strong> {provResult.deploymentState}</p>
                <p><strong>Passwort:</strong> {provResult.password || '(bestehender Tenant - kein neues Passwort)'}</p>
              </div>
            ) : null}
          </div>
        </Modal>
      ) : null}

      {busy ? (
        <div className="fixed bottom-4 right-4 rounded-full bg-slate-900 text-white px-4 py-2 text-sm shadow-lg">Arbeite…</div>
      ) : null}
    </main>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  // Lock body scroll while a modal is open and close on Esc.
  useEffect(() => {
    const prev = typeof document !== 'undefined' ? document.body.style.overflow : '';
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (typeof window !== 'undefined') window.addEventListener('keydown', onKey);
    return () => {
      if (typeof document !== 'undefined') document.body.style.overflow = prev;
      if (typeof window !== 'undefined') window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm overflow-y-auto p-0 sm:p-4 flex items-stretch sm:items-start sm:justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full sm:max-w-2xl sm:my-8 bg-white shadow-2xl border-t sm:border border-slate-200 sm:rounded-2xl flex flex-col max-h-screen sm:max-h-[calc(100vh-4rem)]">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 sm:px-5 py-3 sm:py-4 sticky top-0 bg-white sm:static z-10">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="btn-ghost !px-3 !py-1.5"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>
        <div className="px-4 sm:px-5 py-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 bg-white" />
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-3 py-2 font-medium whitespace-nowrap">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2.5">{children}</td>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 text-slate-900">{value}</p>
    </div>
  );
}

function draftInitial(p: Prospect) {
  const firstName = (p.name || '').trim().split(/\s+/)[0] || 'Hallo';
  const webPart = p.websiteOld
    ? `Ich habe gerade kurz auf ${p.websiteOld} vorbeigeschaut und dachte: da steckt noch deutlich mehr Potenzial drin.`
    : 'Ich bin auf euer Unternehmen aufmerksam geworden und wollte mich kurz melden.';

  return {
    subject: `Kurze Idee für ${p.company || 'eure Website'}`,
    body: `${firstName},\n\n${webPart}\n\nWir bauen bei FlamingoMedia moderne Websites für lokale Betriebe - schnell, ehrlich und so, dass ihr Inhalte später selbst pflegen könnt.\n\nWenn du magst, schicke ich dir gern unverbindlich 2-3 konkrete Ideen, wie eure Seite frischer, klarer und verkaufsstärker wirken kann.\n\nLiebe Grüße\nTommy\nFlamingoMedia`,
  };
}

function draftReminder(p: Prospect) {
  const firstName = (p.name || '').trim().split(/\s+/)[0] || 'Hallo';
  return {
    subject: `Kurzer Reminder: Website-Ideen für ${p.company || 'euch'}`,
    body: `${firstName},\n\nich wollte nur kurz nachfassen, falls meine letzte Nachricht untergegangen ist.\n\nWenn das Thema Website gerade nicht passt, gib einfach kurz Bescheid - dann hake ich es ab.\n\nWenn doch Interesse da ist, schicke ich dir gerne ein kleines, unverbindliches Konzept.\n\nLiebe Grüße\nTommy\nFlamingoMedia`,
  };
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('de-DE');
  } catch {
    return iso;
  }
}

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'kunde';
}

async function req<T = any>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    credentials: 'include',
    ...init,
  });

  const txt = await res.text();
  const data = txt ? safeJson(txt) : {};

  if (!res.ok) {
    const msg = (data as any)?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

function safeJson(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
