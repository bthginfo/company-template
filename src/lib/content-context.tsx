import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SiteContentSchema, type SiteContent } from './types';
import { getTenantSlug } from './tenant';

type State =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; tenant: { slug: string; name: string; template: string; style?: string }; content: SiteContent; hasDraft: boolean };

type ContentCtx = {
  state: State;
  refresh: () => Promise<void>;
  save: (next: SiteContent) => Promise<void>;
  publish: () => Promise<void>;
  discard: () => Promise<void>;
};

const Ctx = createContext<ContentCtx>({
  state: { status: 'loading' },
  refresh: async () => {},
  save: async () => {},
  publish: async () => {},
  discard: async () => {},
});

const FALLBACK_CONTENT: SiteContent = SiteContentSchema.parse({
  brand: { name: 'Demo', tagline: '', logoUrl: '', primaryColor: '#0f172a' },
  hero: { title: 'Willkommen', subtitle: '', imageUrl: '', ctaLabel: 'Kontakt', ctaHref: '#kontakt' },
  services: [],
  gallery: [],
  testimonials: [],
  contact: { phone: '', email: '', address: '', city: '', hours: [], mapsUrl: '' },
});

/** Set to true when rendering admin — load() will fetch draft content via ?preview=1 */
let adminMode = false;
export function setAdminMode(v: boolean) { adminMode = v; }

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ status: 'loading' });

  const load = async () => {
    setState({ status: 'loading' });
    try {
      const slug = getTenantSlug();
      const qs = adminMode ? '&preview=1' : '';
      // Bypass any browser/CDN cache so edits show up immediately after save.
      const r = await fetch(`/api/content?slug=${encodeURIComponent(slug)}${qs}`, { cache: 'no-store' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const json = await r.json();
      const parsed = json.content ? SiteContentSchema.parse(json.content) : FALLBACK_CONTENT;
      setState({ status: 'ready', tenant: json.tenant, content: parsed, hasDraft: !!json.hasDraft });
      document.documentElement.style.setProperty('--brand-color', parsed.brand.primaryColor);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e);
      setState({ status: 'error', error: e.message ?? 'unknown' });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (next: SiteContent) => {
    const slug = getTenantSlug();
    const r = await fetch(`/api/content?slug=${encodeURIComponent(slug)}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(next),
    });
    if (!r.ok) throw new Error(`Save failed: ${r.status}`);
    await load();
  };

  const publish = async () => {
    const slug = getTenantSlug();
    const r = await fetch(`/api/content?slug=${encodeURIComponent(slug)}&action=publish`, { method: 'POST' });
    if (!r.ok) throw new Error(`Publish failed: ${r.status}`);
    await load();
  };

  const discard = async () => {
    const slug = getTenantSlug();
    const r = await fetch(`/api/content?slug=${encodeURIComponent(slug)}&action=discard`, { method: 'POST' });
    if (!r.ok) throw new Error(`Discard failed: ${r.status}`);
    await load();
  };

  return <Ctx.Provider value={{ state, refresh: load, save, publish, discard }}>{children}</Ctx.Provider>;
}

export function useContent() {
  return useContext(Ctx);
}
