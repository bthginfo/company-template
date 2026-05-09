import type { SiteContent, TemplateKey } from './types';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from './demo-content';
import { SiteContentSchema } from './types';
import type { TemplateStyle } from './branch-config';
import { normalizeSiteContentCmsV2 } from './cms-v2-hydration';
import { applyDemoContentPlan } from './demo-content-plan';

const OVERRIDE_VERSION = 'v2';
const KEY = (k: TemplateKey) => `bth.demo.override.${OVERRIDE_VERSION}.${k}`;
const LEGACY_KEY = (k: TemplateKey) => `bth.demo.override.${k}`;

function baseFor(k: TemplateKey): SiteContent {
  if (k === 'restaurant' || k === 'salon' || k === 'tradesman' || k === 'hotel' || k === 'tourism') return DEMO_CONTENT[k];
  return EXTRA_DEMO_CONTENT[k];
}

export function readOverride(k: TemplateKey): SiteContent | null {
  try {
    localStorage.removeItem(LEGACY_KEY(k));
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
    localStorage.removeItem(LEGACY_KEY(k));
    window.dispatchEvent(new CustomEvent('bth:override', { detail: { key: k } }));
  } catch {
    /* ignore */
  }
}

export function loadFor(k: TemplateKey): SiteContent {
  return readOverride(k) ?? baseFor(k);
}

export function loadForStyle(k: TemplateKey, style: TemplateStyle): SiteContent {
  return ensureDemoCmsV2ForStyle(loadFor(k), k, style);
}

export function ensureDemoCmsV2ForStyle(content: SiteContent, k: TemplateKey, style: TemplateStyle): SiteContent {
  const legacyClone = SiteContentSchema.parse(structuredClone(content));
  return applyDemoContentPlan(normalizeSiteContentCmsV2(legacyClone, k, style, 'legacy'), k, style);
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
