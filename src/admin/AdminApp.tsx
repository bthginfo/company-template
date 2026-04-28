import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContent } from '@/lib/content-context';
import { AdminEditorBody, type UploadImageFn } from './AdminEditorBody';
import type { SiteContent, TemplateKey } from '@/lib/types';

type Session = { role: 'super' | 'tenant'; tenantId: string | null; slug: string | null } | null;

const VALID_TEMPLATES: TemplateKey[] = ['restaurant', 'salon', 'tradesman', 'consulting', 'medical', 'fitness'];
function asTemplateKey(v: string | undefined): TemplateKey {
  return VALID_TEMPLATES.includes(v as TemplateKey) ? (v as TemplateKey) : 'restaurant';
}

const uploadImage: UploadImageFn = async (file) => {
  const r = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
    method: 'POST',
    headers: { 'content-type': file.type || 'application/octet-stream' },
    body: file,
  });
  if (!r.ok) throw new Error(`Upload fehlgeschlagen (${r.status})`);
  const j = await r.json();
  return j.url as string;
};

export function AdminApp() {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const navigate = useNavigate();
  const { state, save } = useContent();
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((r) => r.json())
      .then((j) => setSession(j.session ?? null))
      .catch(() => setSession(null));
  }, []);

  useEffect(() => {
    if (state.status === 'ready' && draft === null) setDraft(state.content);
  }, [state, draft]);

  const tplKey = useMemo<TemplateKey>(
    () => (state.status === 'ready' ? asTemplateKey(state.tenant.template) : 'restaurant'),
    [state],
  );

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    navigate('/admin/login', { replace: true });
  };

  const onSave = async () => {
    if (!draft) return;
    try {
      setSaving(true);
      await save(draft);
      setSavedAt(new Date().toLocaleTimeString('de-DE'));
      setTimeout(() => setSavedAt(null), 5000);
    } catch (e: any) {
      alert(`Speichern fehlgeschlagen: ${e?.message || e}`);
    } finally {
      setSaving(false);
    }
  };

  if (session === undefined) {
    return <div className="min-h-screen grid place-items-center text-slate-500">Lädt …</div>;
  }
  if (session === null) {
    return <Navigate to="/admin/login" replace />;
  }
  if (state.status !== 'ready' || !draft) {
    return <div className="min-h-screen grid place-items-center text-slate-500">Lädt Inhalte …</div>;
  }

  return (
    <AdminEditorBody
      tplKey={tplKey}
      data={draft}
      setData={setDraft}
      onSave={onSave}
      saving={saving}
      savedAt={savedAt}
      brandTitle={state.tenant.name}
      previewUrlBase=""
      uploadImage={uploadImage}
      headerStatus={
        <div className="hidden md:flex items-center gap-3 text-xs">
          <span className="uppercase tracking-widest text-muted bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
            {session.role === 'super' ? 'Super-Admin' : state.tenant.slug}
          </span>
          <button onClick={logout} className="text-rose-600 hover:underline">Abmelden</button>
        </div>
      }
      footerStatus={'Änderungen werden bei "Speichern" sofort live übernommen.'}
    />
  );
}
