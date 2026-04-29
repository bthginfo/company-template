import { useEffect, useMemo, useState } from 'react';
import Seo from '@/components/Seo';

type ProspectStatus = 'neu' | 'angefragt' | 'reminder' | 'angenommen' | 'abgelehnt';
type MailKind = 'initial' | 'reminder';
type TemplateKey = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism' | 'consulting' | 'medical' | 'fitness';
type TemplateStyle = 'classic' | 'modern' | 'bold';

type Prospect = {
  id: string;
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

  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loadingProspects, setLoadingProspects] = useState(false);
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState<Prospect | null>(null);

  const [emailModal, setEmailModal] = useState<{ open: boolean; p: Prospect | null }>({ open: false, p: null });
  const [emailKind, setEmailKind] = useState<MailKind>('initial');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const [provisionModal, setProvisionModal] = useState<{ open: boolean; p: Prospect | null }>({ open: false, p: null });
  const [provSlug, setProvSlug] = useState('');
  const [provName, setProvName] = useState('');
  const [provTemplate, setProvTemplate] = useState<TemplateKey>('restaurant');
  const [provStyle, setProvStyle] = useState<TemplateStyle>('modern');
  const [provResult, setProvResult] = useState<ProvisioningResponse['provisioning'] | null>(null);

  const sorted = useMemo(
    () => [...prospects].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [prospects],
  );

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
    void reloadProspects();
  }, [authenticated]);

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
        await req(`/api/prospects/${editing.id}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
        });
      } else {
        await req('/api/prospects', {
          method: 'POST',
          body: JSON.stringify(form),
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
      name: p.name || '',
      company: p.company || '',
      address: p.address || '',
      email: p.email || '',
      websiteOld: p.websiteOld || '',
      websiteNew: p.websiteNew || '',
      status: p.status,
      notes: p.notes || '',
    });
  };

  const removeProspect = async (p: Prospect) => {
    if (!confirm(`Prospect "${p.name}" wirklich löschen?`)) return;
    setBusy(true);
    try {
      await req(`/api/prospects/${p.id}`, { method: 'DELETE' });
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
    setProvisionModal({ open: true, p });
  };

  const runProvision = async () => {
    if (!provisionModal.p) return;
    setBusy(true);
    try {
      const data = await req<ProvisioningResponse>(`/api/prospects/${provisionModal.p.id}/provision`, {
        method: 'POST',
        body: JSON.stringify({
          slug: provSlug,
          name: provName,
          template: provTemplate,
          style: provStyle,
        }),
      });
      setProvResult(data.provisioning);
      await reloadProspects();
    } catch (e: any) {
      alert(e?.message || 'Provisioning fehlgeschlagen.');
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
    resetForm();
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
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Interner Admin</p>
            <h1 className="text-xl font-semibold">Flamingo CRM</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost !px-3 !py-2 text-sm" onClick={() => void reloadProspects()} disabled={loadingProspects}>
              Aktualisieren
            </button>
            <button className="btn-ghost !px-3 !py-2 text-sm" onClick={() => void doLogout()}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 grid lg:grid-cols-[380px,1fr] gap-6">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm h-fit lg:sticky lg:top-20">
          <h2 className="text-lg font-semibold">{editing ? 'Prospect bearbeiten' : 'Neuen Prospect anlegen'}</h2>
          <div className="mt-4 space-y-3">
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
          </div>
        </aside>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold">Prospects ({sorted.length})</h2>
            {loadingProspects ? <span className="text-sm text-slate-500">Lade…</span> : null}
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <Th>Name</Th>
                  <Th>Firma</Th>
                  <Th>Status</Th>
                  <Th>Kontakt</Th>
                  <Th>Letzter Versand</Th>
                  <Th>Aktionen</Th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p) => (
                  <tr key={p.id} className="border-t border-slate-100 align-top">
                    <Td>
                      <div className="font-medium">{p.name || '-'}</div>
                      <div className="text-xs text-slate-500">{p.address || '-'}</div>
                    </Td>
                    <Td>
                      <div>{p.company || '-'}</div>
                      <div className="text-xs text-slate-500">{p.websiteOld || '-'}</div>
                    </Td>
                    <Td>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[p.status]}`}>
                        {STATUS_LABEL[p.status]}
                      </span>
                    </Td>
                    <Td>{p.email || '-'}</Td>
                    <Td>{p.lastEmailedAt ? formatDate(p.lastEmailedAt) : '-'}</Td>
                    <Td>
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={() => startEdit(p)} className="btn-ghost !px-2.5 !py-1.5">Edit</button>
                        <button onClick={() => openEmail(p)} className="btn-ghost !px-2.5 !py-1.5">Mail</button>
                        <button onClick={() => openProvision(p)} className="btn-ghost !px-2.5 !py-1.5">Provision</button>
                        <button onClick={() => void removeProspect(p)} className="btn-ghost !px-2.5 !py-1.5 text-rose-700">Löschen</button>
                      </div>
                    </Td>
                  </tr>
                ))}
                {!sorted.length ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">Noch keine Prospects angelegt.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </section>

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

      {provisionModal.open && provisionModal.p ? (
        <Modal title={`Tenant für ${provisionModal.p.name || provisionModal.p.company || 'Prospect'} anlegen`} onClose={() => setProvisionModal({ open: false, p: null })}>
          <div className="space-y-3">
            <LabeledInput label="Slug" value={provSlug} onChange={setProvSlug} />
            <LabeledInput label="Name" value={provName} onChange={setProvName} />
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
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm p-4 grid place-items-center">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="btn-ghost !px-3 !py-1.5">X</button>
        </div>
        <div className="pt-4">{children}</div>
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
