import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SiteContentSchema, type SiteContent } from './types';
import { getTenantSlug } from './tenant';

type State =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; tenant: { slug: string; name: string; template: string; style?: string }; content: SiteContent };

const Ctx = createContext<{
  state: State;
  refresh: () => Promise<void>;
  save: (next: SiteContent) => Promise<void>;
}>({ state: { status: 'loading' }, refresh: async () => {}, save: async () => {} });

const FALLBACK_CONTENT: SiteContent = SiteContentSchema.parse({
  brand: { name: 'Demo', tagline: '', logoUrl: '', primaryColor: '#0f172a' },
  hero: { title: 'Willkommen', subtitle: '', imageUrl: '', ctaLabel: 'Kontakt', ctaHref: '#kontakt' },
  services: [],
  gallery: [],
  testimonials: [],
  contact: { phone: '', email: '', address: '', city: '', hours: [], mapsUrl: '' },
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ status: 'loading' });

  const load = async () => {
    setState({ status: 'loading' });
    try {
      const slug = getTenantSlug();
      const r = await fetch(`/api/content?slug=${encodeURIComponent(slug)}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const json = await r.json();
      const parsed = json.content ? SiteContentSchema.parse(json.content) : FALLBACK_CONTENT;
      setState({ status: 'ready', tenant: json.tenant, content: parsed });
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

  return <Ctx.Provider value={{ state, refresh: load, save }}>{children}</Ctx.Provider>;
}

export function useContent() {
  return useContext(Ctx);
}
