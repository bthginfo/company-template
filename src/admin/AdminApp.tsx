import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContent, setAdminMode } from '@/lib/content-context';
import { Login as AdminLogin } from './Login';
import type { TemplateKey } from '@/lib/types';

type Session = { role: 'super' | 'tenant'; tenantId: string | null; slug: string | null } | null;

/**
 * AdminApp — placeholder shell for the new CMS admin (v2).
 * Full Page Builder implementation in Phase 2.
 */
export function AdminApp() {
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    setAdminMode(true);
    fetch('/api/admin/session')
      .then((r) => r.json())
      .then((j) => setSession(j.session ?? null))
      .catch(() => setSession(null));
    return () => { setAdminMode(false); };
  }, []);

  if (session === undefined) {
    return (
      <div className="min-h-screen grid place-items-center text-slate-500 text-sm">
        Lade…
      </div>
    );
  }

  if (session === null) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#fafaf7] flex flex-col items-center justify-center gap-6 p-8">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="text-4xl mb-4">🚧</div>
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          Neuer Admin wird gebaut
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Das neue CMS-System (v2) wird gerade entwickelt.
          Der vollständige Page Builder ist in Kürze verfügbar.
        </p>
      </div>
    </div>
  );
}
