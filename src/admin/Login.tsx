import { useState } from 'react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
      <form
        action="/api/auth/signin/resend"
        method="POST"
        onSubmit={() => setBusy(true)}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow"
      >
        <h1 className="font-display text-2xl font-semibold mb-2">Admin-Anmeldung</h1>
        <p className="text-sm text-slate-600 mb-6">
          Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Anmeldelink.
        </p>
        <label className="block text-sm font-medium mb-1">E-Mail</label>
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <input type="hidden" name="callbackUrl" value="/admin" />
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? 'Sende …' : 'Anmeldelink senden'}
        </button>
      </form>
    </div>
  );
}
