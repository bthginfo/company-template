import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContent } from '@/lib/content-context';
import { ContentEditor } from './ContentEditor';

type Session = { user?: { email: string; tenantId: string | null } } | null;

export function AdminApp() {
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((s) => setSession(s && s.user ? s : null))
      .catch(() => setSession(null));
  }, []);

  const { state } = useContent();

  if (session === undefined) {
    return <div className="min-h-screen grid place-items-center text-slate-500">Lädt …</div>;
  }
  if (session === null || !session.user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (state.status !== 'ready') {
    return <div className="min-h-screen grid place-items-center text-slate-500">Lädt Inhalte …</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container-x flex items-center justify-between py-4">
          <h1 className="font-display text-xl font-semibold">Admin · {state.tenant.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <a href="/" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">
              Website ansehen ↗
            </a>
            <span className="text-slate-500">{session.user.email}</span>
            <form action="/api/auth/signout" method="POST">
              <input type="hidden" name="callbackUrl" value="/admin/login" />
              <button className="text-rose-600 hover:underline">Abmelden</button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-x py-8">
        <ContentEditor initial={state.content} />
      </main>
    </div>
  );
}
