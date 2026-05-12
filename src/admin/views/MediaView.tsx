import { useEffect, useRef, useState } from 'react';
import type { AdminSession } from '../AdminApp';

type MediaItem = {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  alt: string;
  width: number | null;
  height: number | null;
  fileSize: number | null;
  createdAt: string;
};

export function MediaView({ session }: { session: AdminSession }) {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const slug = session.slug ?? '';

  function load() {
    if (!slug) return;
    fetch(`/api/media?slug=${slug}`)
      .then((r) => r.json())
      .then((j) => setItems(j.media ?? []))
      .catch(() => setItems([]));
  }

  useEffect(load, [slug]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        // Step 1: get Vercel Blob upload URL
        const uploadRes = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}&slug=${slug}`, {
          method: 'POST',
          body: file,
        });
        if (!uploadRes.ok) continue;
        const { url } = await uploadRes.json();
        if (!url) continue;

        // Step 2: register in media DB
        await fetch(`/api/media?slug=${slug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url,
            filename: file.name,
            mimeType: file.type,
            fileSize: file.size,
          }),
        });
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
      load();
    }
  }

  async function handleDelete(id: string, filename: string) {
    if (!confirm(`"${filename}" wirklich löschen?`)) return;
    await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
    load();
  }

  function formatBytes(b: number | null) {
    if (b == null) return '—';
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
    return `${(b / 1024 / 1024).toFixed(1)} MB`;
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Medien</h1>
          <p className="text-sm text-slate-500 mt-0.5">Bilder und Dateien</p>
        </div>
        <label className={`bg-slate-900 text-white text-sm px-4 py-2 rounded-lg cursor-pointer transition-colors ${uploading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-slate-800'}`}>
          {uploading ? 'Hochladen…' : '+ Dateien hochladen'}
          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {items === null ? (
        <div className="text-sm text-slate-400">Lädt…</div>
      ) : items.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-xl p-12 text-center">
          <div className="text-3xl mb-3">🖼</div>
          <p className="text-sm text-slate-500">Noch keine Medien vorhanden.</p>
          <p className="text-xs text-slate-400 mt-1">Klicken Sie auf „Dateien hochladen".</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
            >
              {item.mimeType.startsWith('image/') ? (
                <img
                  src={item.url}
                  alt={item.alt || item.filename}
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div className="w-full aspect-square grid place-items-center bg-slate-50 text-3xl">
                  📄
                </div>
              )}
              <div className="p-2">
                <p className="text-xs text-slate-700 truncate font-medium">{item.filename}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{formatBytes(item.fileSize)}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id, item.filename)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-full text-red-400 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-sm"
                title="Löschen"
              >
                ×
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(item.url)}
                className="absolute top-1.5 left-1.5 w-6 h-6 bg-white/90 rounded-full text-slate-500 hover:text-slate-900 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-sm"
                title="URL kopieren"
              >
                ⎘
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
