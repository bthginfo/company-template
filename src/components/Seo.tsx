import { useEffect } from 'react';

const DEFAULT_OG = '/og-image.svg';

export function useSeo({
  title,
  description,
  image = DEFAULT_OG,
  noindex = false,
}: {
  title: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    const fullTitle = title.includes('BTH') ? title : `${title} · BTH Studio`;
    document.title = fullTitle;

    setMeta('name', 'description', description || '');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description || '');
    setMeta('property', 'og:image', new URL(image, window.location.origin).href);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', window.location.href);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description || '');
    setMeta('name', 'twitter:image', new URL(image, window.location.origin).href);
    setMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');
  }, [title, description, image, noindex]);
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  if (!value) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export default function Seo(props: Parameters<typeof useSeo>[0]) {
  useSeo(props);
  return null;
}
