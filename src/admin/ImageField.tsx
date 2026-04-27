import { useRef, useState } from 'react';

export function ImageField({
  url,
  onChange,
  buttonLabel = 'Bild ändern',
}: {
  url: string;
  onChange: (url: string) => void;
  buttonLabel?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        headers: { 'content-type': file.type || 'application/octet-stream' },
        body: file,
      });
      if (!r.ok) throw new Error(`Upload fehlgeschlagen (${r.status})`);
      const json = await r.json();
      onChange(json.url);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {url ? (
        <img src={url} alt="" className="h-16 w-16 rounded-lg object-cover border" />
      ) : (
        <div className="h-16 w-16 rounded-lg bg-slate-100 border" />
      )}
      <div className="flex-1">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
          }}
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="text-sm px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:opacity-90"
          >
            {busy ? 'Lädt …' : buttonLabel}
          </button>
          {url ? (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50"
            >
              Entfernen
            </button>
          ) : null}
        </div>
        {err ? <p className="text-xs text-rose-600 mt-1">{err}</p> : null}
      </div>
    </div>
  );
}
