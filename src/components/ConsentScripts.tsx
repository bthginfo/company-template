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

function injectScript(s: CustomScript): HTMLScriptElement | null {
  const target = s.placement === 'body' ? document.body : document.head;
  if (!target) return null;
  const tag = document.createElement('script');
  tag.dataset.consentId = s.id;
  if (URL_RE.test(s.code.trim())) {
    tag.src = s.code.trim();
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
