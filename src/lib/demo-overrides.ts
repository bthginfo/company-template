import type { SiteContent, TemplateKey } from './types';
import { DEMO_CONTENT } from './demo-content';

const KEY = (k: TemplateKey) => `bth.demo.override.${k}`;

export function readOverride(k: TemplateKey): SiteContent | null {
  try {
    const raw = localStorage.getItem(KEY(k));
    if (!raw) return null;
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

export function writeOverride(k: TemplateKey, content: SiteContent): void {
  try {
    localStorage.setItem(KEY(k), JSON.stringify(content));
    window.dispatchEvent(new CustomEvent('bth:override', { detail: { key: k } }));
  } catch {
    /* quota etc. — ignore */
  }
}

export function clearOverride(k: TemplateKey): void {
  try {
    localStorage.removeItem(KEY(k));
    window.dispatchEvent(new CustomEvent('bth:override', { detail: { key: k } }));
  } catch {
    /* ignore */
  }
}

export function loadFor(k: TemplateKey): SiteContent {
  return readOverride(k) ?? DEMO_CONTENT[k];
}

export function downloadJson(filename: string, payload: unknown): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
