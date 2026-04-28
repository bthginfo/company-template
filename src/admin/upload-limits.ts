/**
 * Shared client-side upload constraints + friendly error messages.
 *
 * Mirrors the server-side cap in api/upload.ts.
 */

export const MAX_UPLOAD_BYTES = 1.5 * 1024 * 1024; // 1.5 MB
export const MAX_UPLOAD_LABEL = '1,5 MB';

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
] as const;

export const ALLOWED_IMAGE_EXT_LABEL = 'JPG, PNG, WebP, GIF oder SVG';

export const UPLOAD_HINT = `Erlaubt: ${ALLOWED_IMAGE_EXT_LABEL} · max. ${MAX_UPLOAD_LABEL} pro Bild. Größere Bilder verlangsamen die Seite und werden nicht akzeptiert — bitte vorher verkleinern (z. B. mit squoosh.app oder tinypng.com).`;

function formatMb(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2).replace('.', ',') + ' MB';
}

/**
 * Throws a friendly Error if the file fails the upload policy.
 */
export function assertValidUpload(file: File): void {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
    throw new Error(
      `Dieses Dateiformat (${file.type || 'unbekannt'}) wird nicht unterstützt. Bitte lade ein Bild als ${ALLOWED_IMAGE_EXT_LABEL} hoch.`,
    );
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(
      `Das Bild ist ${formatMb(file.size)} groß — erlaubt sind maximal ${MAX_UPLOAD_LABEL}. Große Bilder machen die Website langsam. Bitte verkleinere das Bild (z. B. mit squoosh.app oder tinypng.com) und versuche es erneut.`,
    );
  }
}

/**
 * Translates server / blob errors into something a normal person understands.
 */
export function humanizeUploadError(err: unknown): string {
  const raw = (err as any)?.message ? String((err as any).message) : String(err);
  const lower = raw.toLowerCase();
  if (lower.includes('maximum') && (lower.includes('size') || lower.includes('bytes'))) {
    return `Das Bild ist zu groß — erlaubt sind maximal ${MAX_UPLOAD_LABEL}. Bitte verkleinere das Bild (z. B. mit squoosh.app oder tinypng.com).`;
  }
  if (lower.includes('content type') || lower.includes('content-type') || lower.includes('mime')) {
    return `Dieses Dateiformat wird nicht unterstützt. Bitte lade ein Bild als ${ALLOWED_IMAGE_EXT_LABEL} hoch.`;
  }
  if (lower.includes('413')) {
    return `Das Bild ist zu groß — erlaubt sind maximal ${MAX_UPLOAD_LABEL}.`;
  }
  if (lower.includes('401') || lower.includes('unauthorized')) {
    return 'Deine Sitzung ist abgelaufen. Bitte melde Dich neu an.';
  }
  if (lower.includes('network') || lower.includes('failed to fetch')) {
    return 'Verbindung zum Server unterbrochen. Bitte prüfe Deine Internetverbindung und versuche es erneut.';
  }
  return raw || 'Upload fehlgeschlagen. Bitte versuche es erneut.';
}
