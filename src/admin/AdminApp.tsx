import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { upload } from '@vercel/blob/client';
import { useContent } from '@/lib/content-context';
import { AdminEditorBody, type UploadImageFn } from './AdminEditorBody';
import { assertValidUpload, humanizeUploadError } from './upload-limits';
import type { SiteContent, TemplateKey } from '@/lib/types';
import { applyTheme, getPreset } from '@/lib/theme';

type Session = { role: 'super' | 'tenant'; tenantId: string | null; slug: string | null } | null;

const VALID_TEMPLATES: TemplateKey[] = ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism', 'consulting', 'medical', 'fitness'];
function asTemplateKey(v: string | undefined): TemplateKey {
  return VALID_TEMPLATES.includes(v as TemplateKey) ? (v as TemplateKey) : 'restaurant';
}

const uploadImage: UploadImageFn = async (file) => {
  // Direct client-upload — bypasses the 4.5 MB serverless body limit.
  assertValidUpload(file);
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const pathname = `tenants/${Date.now()}-${safe}`;
  try {
    const blob = await upload(pathname, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
      contentType: file.type || 'application/octet-stream',
    });
    return blob.url;
  } catch (e: any) {
    throw new Error(humanizeUploadError(e));
  }
};

export function AdminApp() {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const navigate = useNavigate();
  const { state, save } = useContent();
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  // JSON snapshot of the last persisted state, used to detect unsaved edits
  // and warn the operator before they close the tab / navigate away.
  const [pristine, setPristine] = useState<string | null>(null);
  // Cache tenant metadata so it survives the loading→ready cycle during save
  const [tenant, setTenant] = useState<{ name: string; slug: string; template: string; style?: string } | null>(null);
  const isDirty = !!draft && pristine !== null && JSON.stringify(draft) !== pristine;

  useEffect(() => {
    fetch('/api/admin/session')
      .then((r) => r.json())
      .then((j) => setSession(j.session ?? null))
      .catch(() => setSession(null));
  }, []);

  // Track whether we're in a save cycle to avoid resetting draft mid-save
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (state.status === 'ready') {
      setTenant(state.tenant as any);
      if (draft === null || justSaved) {
        // Initial load or post-save: sync draft with fresh server data
        setDraft(state.content);
        setPristine(JSON.stringify(state.content));
        setJustSaved(false);
      }
    }
  }, [state]);

  // Browser-level "unsaved changes" guard.
  useEffect(() => {
    if (!isDirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Modern browsers ignore the custom string but require returnValue to be set.
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);

  const tplKey = useMemo<TemplateKey>(
    () => (tenant ? asTemplateKey(tenant.template) : 'restaurant'),
    [tenant],
  );

  // Mirror the tenant's selected color scheme on the admin shell so
  // chrome (buttons, badges, focus rings) match the live site.
  const presetId = draft?.brand?.themePresetId ?? undefined;
  useEffect(() => {
    if (!presetId) return;
    const preset = getPreset(tplKey, presetId);
    if (preset) applyTheme(preset);
  }, [tplKey, presetId]);

  const logout = async () => {
    if (isDirty) {
      const ok = window.confirm('Es gibt nicht gespeicherte Änderungen. Wirklich abmelden?');
      if (!ok) return;
    }
    await fetch('/api/admin/logout', { method: 'POST' });
    navigate('/admin/login', { replace: true });
  };

  const onSave = async () => {
    if (!draft) return;
    try {
      setSaving(true);
      setJustSaved(true);
      await save(draft);
      const ts = new Date().toLocaleTimeString('de-DE');
      setSavedAt(ts);
      setTimeout(() => setSavedAt(null), 5000);
      toast.success('Gespeichert', { description: `Alle Änderungen sind live · ${ts}` });
    } catch (e: any) {
      setJustSaved(false);
      const msg = e?.message || String(e);
      toast.error('Speichern fehlgeschlagen', { description: msg });
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
  if (state.status !== 'ready' && !draft) {
    return <div className="min-h-screen grid place-items-center text-slate-500">Lädt Inhalte …</div>;
  }
  if (!draft || !tenant) {
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
      brandTitle={tenant.name}
      previewUrlBase=""
      uploadImage={uploadImage}
      style={(tenant.style as 'classic' | 'modern' | 'bold' | undefined) || 'classic'}
      headerStatus={
        <div className="hidden md:flex items-center gap-3 text-xs">
          <span className="uppercase tracking-widest text-muted bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
            {session.role === 'super' ? 'Super-Admin' : tenant.slug}
          </span>
          <button onClick={logout} className="text-rose-600 hover:underline">Abmelden</button>
        </div>
      }
      footerStatus={'Änderungen werden bei "Speichern" sofort live übernommen.'}
    />
  );
}
