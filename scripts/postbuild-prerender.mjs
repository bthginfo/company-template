#!/usr/bin/env node
/**
 * postbuild-prerender.mjs
 *
 * Lightweight SEO prerender for the FlamingoMedia SPA.
 *
 * For each known public route we emit a static `<route>/index.html` that is a
 * copy of the built `dist/index.html` with route-specific <title>,
 * <meta name="description">, <link rel="canonical"> and a small inline JSON-LD
 * payload. The SPA still hydrates and takes over the page client-side, but
 * crawlers (Google, Bing, GPTBot, ClaudeBot, PerplexityBot, etc.) get a
 * fully-formed HTML document with correct metadata even before JS runs.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = join(root, 'dist');
const indexPath = join(dist, 'index.html');

if (!existsSync(indexPath)) {
  console.error('[prerender] dist/index.html not found – run `vite build` first.');
  process.exit(0);
}

const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://flamingomedia.vercel.app';

/** @type {Array<{path: string; title: string; description: string; jsonLd?: object}>} */
const routes = [
  {
    path: '/',
    title: 'FlamingoMedia · Websites für lokale Marken in der DACH-Region',
    description:
      'FlamingoMedia gestaltet und betreut Websites für Restaurants, Hotels, Tourismus, Salons, Handwerk, Praxen, Beratung und Studios in Österreich, Deutschland und der Schweiz. Editorial-Design mit Pop.',
  },
  {
    path: '/templates',
    title: 'Templates · FlamingoMedia',
    description:
      'Sechs Branchen, drei Stile (Klassisch, Modern, Bold) – alle Templates live ansehen, vergleichen, anpassen.',
  },
  {
    path: '/preise',
    title: 'Preise · FlamingoMedia',
    description:
      'Transparente Pakete: Setup, monatliche Pflege und individuelle Erweiterungen. Festpreise statt Stundensätze.',
  },
  {
    path: '/prozess',
    title: 'Ablauf · FlamingoMedia',
    description:
      'Von der ersten Idee bis zur Live-Schaltung. Jeder Schritt klar geplant – ohne Überraschungen.',
  },
  {
    path: '/ueber-uns',
    title: 'Über uns · FlamingoMedia',
    description:
      'Studio für lokale Marken in Österreich, Deutschland und der Schweiz. Wer wir sind und wie wir arbeiten.',
  },
  {
    path: '/kontakt',
    title: 'Kontakt · FlamingoMedia',
    description:
      'Erstgespräch, Angebot oder einfach Hallo sagen – wir antworten binnen 24 Stunden, deutschlandweit, österreichweit, schweizweit.',
  },
];

const tpl = readFileSync(indexPath, 'utf-8');

function render(route) {
  let html = tpl;
  const fullTitle = route.title;
  const desc = route.description;
  const url = `${SITE_ORIGIN}${route.path}`;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${escapeHtml(desc)}" />`
  );
  // Replace og:title / og:description / canonical
  html = html.replace(
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(desc)}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${url}" />`
  );
  // Add og:url meta if missing
  if (!/og:url/.test(html)) {
    html = html.replace(
      /<meta property="og:locale"[^>]*>/,
      (m) => `${m}\n    <meta property="og:url" content="${url}" />`
    );
  } else {
    html = html.replace(
      /<meta\s+property="og:url"[^>]*>/i,
      `<meta property="og:url" content="${url}" />`
    );
  }

  // Inject route-specific JSON-LD breadcrumb.
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: route.title.split(' · ')[0], item: url },
    ],
  };
  html = html.replace(
    /<\/head>/,
    `  <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>\n  </head>`
  );

  return html;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let written = 0;
for (const route of routes) {
  if (route.path === '/') continue; // dist/index.html already serves "/"
  const outDir = join(dist, route.path.replace(/^\//, ''));
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, 'index.html');
  writeFileSync(outFile, render(route), 'utf-8');
  written++;
}

// Re-emit index.html with canonical for "/"
writeFileSync(indexPath, render(routes[0]), 'utf-8');
written++;

console.log(`[prerender] wrote ${written} static SEO HTML files`);
