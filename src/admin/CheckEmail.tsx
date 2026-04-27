export function AdminCheckEmail() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-6 text-center">
      <div className="bg-white p-10 rounded-2xl shadow max-w-md">
        <h1 className="font-display text-2xl font-semibold mb-2">E-Mail prüfen</h1>
        <p className="text-slate-600">
          Wir haben Ihnen einen Anmeldelink geschickt. Öffnen Sie Ihre E-Mail und
          klicken Sie auf den Link, um sich anzumelden.
        </p>
      </div>
    </div>
  );
}
