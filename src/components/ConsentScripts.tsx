/**
 * Lädt die in `content.customScripts` hinterlegten Skripte erst dann,
 * wenn der Nutzer der jeweiligen Cookie-Kategorie zugestimmt hat.
 * Beim Widerruf der Zustimmung werden die Tags wieder entfernt.
 */
import { useEffect } from 'react';
import { useConsent } from '../lib/consent';
import type { SiteContent } from '../lib/types';

type CustomScript = NonNullable<SiteContent['customScripts']>[number];

const URL_RE = /^https?:\/\//i;

/**
 * Reject URLs that point at localhost or RFC1918 / link-local hosts.
 * The admin editor accepts arbitrary URLs from the tenant; a malicious or
 * confused operator could otherwise inject a same-network address that the
 * browser dutifully fetches when the page is opened from inside that network.
 * Also requires https:// to keep mixed-content protections intact.
 */
function isSafeExternalUrl(raw: string): boolean {
  let u: URL;
  try { u = new URL(raw); } catch { return false; }
  if (u.protocol !== 'https:') return false;
  const host = u.hostname.toLowerCase();
  if (host === 'localhost' || host === '0.0.0.0' || host === '::1') return false;
  if (host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) return false;
  // IPv4 literal in dotted-quad form → block private ranges.
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    const [a, b] = host.split('.').map(Number);
    if (a === 10) return false;
    if (a === 127) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
  }
  return true;
}

function injectScript(s: CustomScript): HTMLScriptElement | null {
  const target = s.placement === 'body' ? document.body : document.head;
  if (!target) return null;
  const code = s.code.trim();
  const tag = document.createElement('script');
  tag.dataset.consentId = s.id;
  if (URL_RE.test(code)) {
    if (!isSafeExternalUrl(code)) {
      console.warn('[ConsentScripts] refused unsafe script URL', s.id, code);
      return null;
    }
    tag.src = code;
    tag.async = true;
  } else {
    tag.textContent = s.code;
  }
  target.appendChild(tag);
  return tag;
}

export function ConsentScripts({ scripts }: { scripts?: CustomScript[] }) {
  const { consent } = useConsent();

  useEffect(() => {
    if (!scripts || scripts.length === 0) return;

    const allowed = scripts.filter((s) =>
      s.enabled && s.code.trim().length > 0 && (s.category === 'necessary' || consent[s.category])
    );
    const tags = allowed
      .map(injectScript)
      .filter((t): t is HTMLScriptElement => t !== null);

    return () => {
      for (const tag of tags) {
        try { tag.remove(); } catch { /* ignore */ }
      }
    };
  }, [scripts, consent.functional, consent.analytics, consent.marketing]);

  return null;
}
