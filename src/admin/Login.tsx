import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${r.status}`);
      }
      navigate('/admin', { replace: true });
    } catch (e: any) {
      setErr(e.message || 'Anmeldung fehlgeschlagen');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow">
        <h1 className="font-display text-2xl font-semibold mb-2">Admin-Anmeldung</h1>
        <p className="text-sm text-slate-600 mb-6">Bitte geben Sie Ihr Passwort ein.</p>
        <label className="block text-sm font-medium mb-1">Passwort</label>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-brand"
        />
        {err && <p className="text-sm text-rose-600 mt-2">{err}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full mt-4">
          {busy ? 'Prüfe …' : 'Anmelden'}
        </button>
      </form>
    </div>
  );
}
