import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { SiteContent, TemplateKey } from '@/lib/types';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from '@/lib/demo-content';
import { clearOverride, downloadJson, loadFor, writeOverride } from '@/lib/demo-overrides';
import { AdminEditorBody } from '@/admin/AdminEditorBody';

type DemoKey = TemplateKey;
const ALL_DEMO_KEYS: DemoKey[] = ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism', 'consulting', 'medical', 'fitness'];
const isDemoKey = (k: string): k is DemoKey => (ALL_DEMO_KEYS as string[]).includes(k);
const baseFor = (k: DemoKey): SiteContent =>
  k === 'restaurant' || k === 'salon' || k === 'tradesman' || k === 'hotel' || k === 'tourism' ? DEMO_CONTENT[k] : EXTRA_DEMO_CONTENT[k];

/**
 * AdminDemo — showcase wrapper around the shared admin editor body.
 * State is local + mirrored to localStorage so the public preview pages can
 * read the changes. No real save (purely visual demo).
 */
export default function AdminDemo() {
  const [tplKey, setTplKey] = useState<DemoKey>('restaurant');
  const [data, setDataInternal] = useState<SiteContent>(() => loadFor('restaurant'));
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const setData = (next: SiteContent) => {
    setDataInternal(next);
    writeOverride(tplKey, next);
  };

  const switchTpl = (k: DemoKey) => {
    setTplKey(k);
    setDataInternal(loadFor(k));
    setSavedAt(null);
  };
  const fakeSave = () => {
    setSavedAt(new Date().toLocaleTimeString('de-DE'));
    setTimeout(() => setSavedAt(null), 4000);
  };
  const resetDemo = () => {
    clearOverride(tplKey);
    setDataInternal(baseFor(tplKey));
    setSavedAt(null);
  };
  const exportJson = () => downloadJson(`${tplKey}-content.json`, data);

  // When the admin demo is embedded inside the landing-page tablet mockup
  // (`?embed=1`), drop the top "Zurück" bar so the iframe looks like a real
  // logged-in admin session instead of a nested showcase.
  const embedded = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === '1';

  useEffect(() => {
    const onOverride = (e: Event) => {
      const detail = (e as CustomEvent<{ key: DemoKey }>).detail;
      if (detail?.key === tplKey) setDataInternal(loadFor(tplKey));
    };
    window.addEventListener('bth:override', onOverride);
    return () => window.removeEventListener('bth:override', onOverride);
  }, [tplKey]);

  return (
    <AdminEditorBody
      tplKey={tplKey}
      onTplChange={(k) => { if (isDemoKey(k)) switchTpl(k); }}
      data={data}
      setData={setData}
      onSave={fakeSave}
      savedAt={savedAt}
      previewUrlBase={`/preview/${tplKey}`}
      topBar={embedded ? undefined : (
        <div className="bg-[var(--accent-color)] text-brand text-sm py-2.5 text-center font-medium">
          <span>Live-Demo des Admin-Bereichs · Ihre Änderungen werden hier nicht gespeichert · </span>
          <Link to="/" className="underline underline-offset-2">Zurück</Link>
        </div>
      )}
      headerStatus={
        <span className="hidden md:inline text-xs uppercase tracking-widest text-muted bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
          Online
        </span>
      }
      footerStatus="Diese Demo speichert nichts. Im echten Admin-Bereich sind Änderungen sofort live."
      footerExtraActions={
        <>
          <button onClick={exportJson} className="btn-ghost !px-4 !py-2 text-sm" title="Inhalte als JSON-Datei exportieren">Als JSON exportieren</button>
          <button onClick={resetDemo} className="btn-ghost !px-4 !py-2 text-sm" title="Auf Demo-Daten zurücksetzen">Auf Demo zurücksetzen</button>
        </>
      }
    />
  );
}
