import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { upload } from '@vercel/blob/client';
import { useContent, setAdminMode } from '@/lib/content-context';
import { AdminEditorBody, type UploadImageFn } from './AdminEditorBody';
import { assertValidUpload, humanizeUploadError } from './upload-limits';
import type { SiteContent, TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { applyTheme, resolveThemePreset } from '@/lib/theme';

/**
 * pageBlocksV1 is a low-level JSON block override layer. The tenant-facing CMS
 * now uses modularPagesV2 section instances as its source of truth;
 * keeping pageBlocksV1 in persisted drafts can shadow field-editor changes.
 */
function stripPageBlocksV1(content: SiteContent): SiteContent {
  const { pageBlocksV1: _, ...rest } = content;
  return rest as SiteContent;
}

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
  const { state, save, publish, discard } = useContent();
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
    setAdminMode(true);
    fetch('/api/admin/session')
      .then((r) => r.json())
      .then((j) => setSession(j.session ?? null))
      .catch(() => setSession(null));
    return () => { setAdminMode(false); };
  }, []);

  // Track whether we're in a save cycle to avoid resetting draft mid-save
  const [justSaved, setJustSaved] = useState(false);
  const [justDiscarded, setJustDiscarded] = useState(false);

  useEffect(() => {
    if (state.status === 'ready') {
      setTenant(state.tenant as any);
      if (draft === null || justSaved || justDiscarded) {
        const cleaned = stripPageBlocksV1(state.content);
        setDraft(cleaned);
        setPristine(JSON.stringify(cleaned));
        setJustSaved(false);
        setJustDiscarded(false);
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
  const customThemesKey = JSON.stringify(draft?.brand?.customThemes ?? []);
  useEffect(() => {
    if (!presetId) return;
    const preset = resolveThemePreset(tplKey, presetId, draft?.brand?.customThemes ?? []);
    if (preset) applyTheme(preset);
  }, [tplKey, presetId, customThemesKey]);

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
      const synced = stripPageBlocksV1(draft);
      if (synced !== draft) setDraft(synced);
      await save(synced);
      const ts = new Date().toLocaleTimeString('de-DE');
      setSavedAt(ts);
      setTimeout(() => setSavedAt(null), 5000);
      toast.success('Gespeichert', { description: `Entwurf gesichert · ${ts} — Veröffentlichen schaltet die Website live.` });
    } catch (e: any) {
      setJustSaved(false);
      const msg = e?.message || String(e);
      toast.error('Speichern fehlgeschlagen', { description: msg });
    } finally {
      setSaving(false);
    }
  };

  const [publishing, setPublishing] = useState(false);

  const onPublish = async () => {
    if (!confirm('Entwurf jetzt live schalten?')) return;
    try {
      setPublishing(true);
      setJustDiscarded(true); // reuse flag to sync draft with new live content
      await publish();
      toast.success('Veröffentlicht', { description: 'Alle Änderungen sind jetzt live.' });
    } catch (e: any) {
      toast.error('Veröffentlichen fehlgeschlagen', { description: e?.message || String(e) });
    } finally {
      setPublishing(false);
    }
  };

  const onDiscard = async () => {
    if (!confirm('Entwurf verwerfen? Alle nicht veröffentlichten Änderungen gehen verloren.')) return;
    try {
      setJustDiscarded(true);
      await discard();
      toast.success('Entwurf verworfen', { description: 'Live-Inhalte wiederhergestellt.' });
    } catch (e: any) {
      toast.error('Verwerfen fehlgeschlagen', { description: e?.message || String(e) });
    }
  };

  const onStyleChange = async (newStyle: TemplateStyle) => {
    if (isDirty) {
      const ok = window.confirm('Es gibt nicht gespeicherte Änderungen. Erst speichern oder verwerfen?');
      if (!ok) return;
    }
    const res = await fetch('/api/admin/style', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ style: newStyle }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Unbekannter Fehler' }));
      toast.error('Stil-Wechsel fehlgeschlagen', { description: err.error });
      return;
    }
    // Update local tenant metadata and reload content
    setTenant((prev) => prev ? { ...prev, style: newStyle } : prev);
    toast.success('Stil gewechselt', { description: `Neuer Stil: ${newStyle.charAt(0).toUpperCase() + newStyle.slice(1)}` });
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
      onStyleChange={onStyleChange}
      hasDraft={state.status === 'ready' && state.hasDraft}
      onPublish={onPublish}
      publishing={publishing}
      onDiscard={onDiscard}
      headerStatus={
        <div className="hidden md:flex items-center gap-3 text-xs">
          <span className="uppercase tracking-widest text-muted bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
            {session.role === 'super' ? 'Super-Admin' : tenant.slug}
          </span>
          <button onClick={logout} className="text-rose-600 hover:underline">Abmelden</button>
        </div>
      }
      footerStatus={
        state.status === 'ready' && state.hasDraft
          ? <span className="text-amber-600">Unveröffentlichter Entwurf — noch nicht live.</span>
          : 'Speichern legt einen Entwurf an. Mit „Veröffentlichen“ gehen Änderungen live.'
      }
    />
  );
}
