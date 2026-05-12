import { useEffect, useState } from 'react';
import { Navigate, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { setAdminMode } from '@/lib/content-context';
import { PagesView } from './views/PagesView';
import { PageEditorView } from './views/PageEditorView';
import { BlogView } from './views/BlogView';
import { CollectionsView } from './views/CollectionsView';
import { MediaView } from './views/MediaView';
import { SettingsView } from './views/SettingsView';

export type AdminSession = {
  role: 'super' | 'tenant';
  tenantId: string | null;
  slug: string | null;
};

type SessionState = AdminSession | null | undefined;

export function AdminApp() {
  const [session, setSession] = useState<SessionState>(undefined);
  const navigate = useNavigate();

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

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen flex bg-[#f7f7f5]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#1a1a1a] text-white flex flex-col">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-white/10">
          <span className="text-sm font-semibold tracking-wide text-white/90">
            Flamingo CMS
          </span>
          {session.slug && (
            <p className="text-xs text-white/40 mt-0.5 truncate">{session.slug}</p>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 text-sm">
          <SidebarLink to="/admin" end label="Dashboard" icon="⊞" />
          <SidebarLink to="/admin/pages" label="Seiten" icon="☰" />
          <SidebarLink to="/admin/blog" label="Blog" icon="✏" />
          <SidebarLink to="/admin/collections" label="Sammlungen" icon="◫" />
          <SidebarLink to="/admin/media" label="Medien" icon="🖼" />
          <SidebarLink to="/admin/settings" label="Einstellungen" icon="⚙" />
        </nav>

        {/* Footer */}
        <div className="px-5 pb-5 pt-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            Abmelden
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-h-screen overflow-auto">
        <Routes>
          <Route index element={<DashboardView session={session} />} />
          <Route path="pages" element={<PagesView session={session} />} />
          <Route path="pages/:pageId" element={<PageEditorView session={session} />} />
          <Route path="blog/*" element={<BlogView session={session} />} />
          <Route path="collections/*" element={<CollectionsView session={session} />} />
          <Route path="media" element={<MediaView session={session} />} />
          <Route path="settings" element={<SettingsView session={session} />} />
        </Routes>
      </main>
    </div>
  );
}

function SidebarLink({
  to,
  label,
  icon,
  end,
}: {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
          isActive
            ? 'bg-white/10 text-white font-medium'
            : 'text-white/60 hover:bg-white/6 hover:text-white/90'
        }`
      }
    >
      <span className="text-base w-5 text-center leading-none">{icon}</span>
      {label}
    </NavLink>
  );
}

function DashboardView({ session }: { session: AdminSession }) {
  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-slate-900 mb-1">Dashboard</h1>
      <p className="text-sm text-slate-500 mb-8">
        Willkommen zurück{session.slug ? `, ${session.slug}` : ''}!
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
        {[
          { label: 'Seiten verwalten', href: '/admin/pages', icon: '☰', desc: 'Seiten & Sektionen bearbeiten' },
          { label: 'Blog', href: '/admin/blog', icon: '✏', desc: 'Beiträge schreiben & veröffentlichen' },
          { label: 'Sammlungen', href: '/admin/collections', icon: '◫', desc: 'Speisekarte, Team, Galerie …' },
          { label: 'Medien', href: '/admin/media', icon: '🖼', desc: 'Bilder & Dateien' },
          { label: 'Einstellungen', href: '/admin/settings', icon: '⚙', desc: 'Kontakt, SEO, Erscheinungsbild' },
        ].map(({ label, href, icon, desc }) => (
          <a
            key={href}
            href={href}
            className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all"
          >
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-sm font-medium text-slate-900">{label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
