#!/usr/bin/env node
/**
 * postbuild-prerender.ts
 *
 * Tenant-aware SEO prerender for the SPA.
 *
 *   • When VITE_TENANT_SLUG is set during build (= a customer Vercel project),
 *     we connect to the database, load that tenant's siteContent, and emit
 *     route-specific static HTML using the tenant's brand + pageSeo overrides.
 *     This guarantees that crawlers (and the brief moment before React
 *     hydrates) see the correct title / description / OG tags – not the
 *     "FlamingoMedia" fallback that ships in `index.html`.
 *
 *   • When VITE_TENANT_SLUG is *not* set we fall back to the original
 *     showcase prerender (FlamingoMedia agency site).
 *
 * The SPA still hydrates and continues to update meta tags client-side via
 * the Seo component – this script only fixes the *initial* HTML payload.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = join(root, 'dist');
const indexPath = join(dist, 'index.html');

dotenv.config({ path: join(root, '.env.local') });

if (!existsSync(indexPath)) {
  console.error('[prerender] dist/index.html not found – run `vite build` first.');
  process.exit(0);
}

type RouteSpec = {
  path: string;
  title: string;
  description: string;
  image?: string;
  keywords?: string;
  canonical?: string;
};

type TemplateVariant = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism' | 'medical' | 'consulting' | 'studio';

const TENANT_SLUG = process.env.VITE_TENANT_SLUG || process.env.TENANT_SLUG || '';

const tpl = readFileSync(indexPath, 'utf-8');

function escapeHtml(s: string) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyMeta(html: string, route: RouteSpec, origin: string, brandName: string): string {
  const url = `${origin}${route.path === '/' ? '/' : route.path}`;
  const fullTitle = route.title.includes(brandName) || route.title.includes(' · ')
    ? route.title
    : `${route.title} · ${brandName}`;

  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
  out = out.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
  );
  if (route.keywords) {
    if (/<meta\s+name="keywords"[^>]*>/i.test(out)) {
      out = out.replace(
        /<meta\s+name="keywords"[^>]*>/i,
        `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`,
      );
    } else {
      out = out.replace(
        /<meta\s+name="description"[^>]*>/i,
        (m) => `${m}\n    <meta name="keywords" content="${escapeHtml(route.keywords!)}" />`,
      );
    }
  }
  out = out.replace(
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
  );
  if (route.image) {
    out = out.replace(
      /<meta\s+property="og:image"[^>]*>/i,
      `<meta property="og:image" content="${escapeHtml(route.image)}" />`,
    );
    out = out.replace(
      /<meta\s+name="twitter:image"[^>]*>/i,
      `<meta name="twitter:image" content="${escapeHtml(route.image)}" />`,
    );
  }
  out = out.replace(
    /<meta\s+name="twitter:title"[^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"[^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:site_name"[^>]*>/i,
    `<meta property="og:site_name" content="${escapeHtml(brandName)}" />`,
  );
  out = out.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${route.canonical || url}" />`,
  );
  if (/og:url/.test(out)) {
    out = out.replace(
      /<meta\s+property="og:url"[^>]*>/i,
      `<meta property="og:url" content="${url}" />`,
    );
  } else {
    out = out.replace(
      /<meta property="og:locale"[^>]*>/,
      (m) => `${m}\n    <meta property="og:url" content="${url}" />`,
    );
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${origin}/` },
      ...(route.path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: route.title.split(' · ')[0], item: url }]),
    ],
  };
  out = out.replace(
    /<\/head>/,
    `  <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>\n  </head>`,
  );

  return out;
}

function writeRoutes(routes: RouteSpec[], origin: string, brandName: string) {
  let written = 0;
  for (const route of routes) {
    if (route.path === '/') continue;
    const outDir = join(dist, route.path.replace(/^\//, ''));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), applyMeta(tpl, route, origin, brandName), 'utf-8');
    written++;
  }
  // Re-emit index.html for "/"
  const home = routes.find((r) => r.path === '/');
  if (home) {
    writeFileSync(indexPath, applyMeta(tpl, home, origin, brandName), 'utf-8');
    written++;
  }
  return written;
}

// ─── Tenant prerender ───────────────────────────────────────────────────────
function navByVariant(variant: TemplateVariant): Array<{ path: string; pageId: 'home' | 'services' | 'gallery' | 'about' | 'contactPage'; label: string }> {
  switch (variant) {
    case 'restaurant':
      return [
        { path: '/', pageId: 'home', label: 'Start' },
        { path: '/speisekarte', pageId: 'services', label: 'Speisekarte' },
        { path: '/galerie', pageId: 'gallery', label: 'Galerie' },
        { path: '/ueber-uns', pageId: 'about', label: 'Über uns' },
        { path: '/kontakt', pageId: 'contactPage', label: 'Kontakt' },
      ];
    case 'salon':
      return [
        { path: '/', pageId: 'home', label: 'Start' },
        { path: '/leistungen', pageId: 'services', label: 'Leistungen' },
        { path: '/galerie', pageId: 'gallery', label: 'Looks' },
        { path: '/ueber-uns', pageId: 'about', label: 'Studio' },
        { path: '/kontakt', pageId: 'contactPage', label: 'Termin' },
      ];
    case 'tradesman':
      return [
        { path: '/', pageId: 'home', label: 'Start' },
        { path: '/leistungen', pageId: 'services', label: 'Leistungen' },
        { path: '/referenzen', pageId: 'gallery', label: 'Referenzen' },
        { path: '/ueber-uns', pageId: 'about', label: 'Betrieb' },
        { path: '/kontakt', pageId: 'contactPage', label: 'Anfrage' },
      ];
    case 'hotel':
      return [
        { path: '/', pageId: 'home', label: 'Start' },
        { path: '/zimmer', pageId: 'services', label: 'Zimmer' },
        { path: '/galerie', pageId: 'gallery', label: 'Haus & Spa' },
        { path: '/ueber-uns', pageId: 'about', label: 'Geschichte' },
        { path: '/kontakt', pageId: 'contactPage', label: 'Reservieren' },
      ];
    case 'tourism':
      return [
        { path: '/', pageId: 'home', label: 'Start' },
        { path: '/touren', pageId: 'services', label: 'Touren' },
        { path: '/galerie', pageId: 'gallery', label: 'Eindrücke' },
        { path: '/ueber-uns', pageId: 'about', label: 'Guides' },
        { path: '/kontakt', pageId: 'contactPage', label: 'Buchen' },
      ];
    default:
      return [
        { path: '/', pageId: 'home', label: 'Start' },
        { path: '/leistungen', pageId: 'services', label: 'Leistungen' },
        { path: '/galerie', pageId: 'gallery', label: 'Galerie' },
        { path: '/ueber-uns', pageId: 'about', label: 'Über uns' },
        { path: '/kontakt', pageId: 'contactPage', label: 'Kontakt' },
      ];
  }
}

async function prerenderTenant(slug: string) {
  const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';
  if (!dbUrl) {
    console.warn('[prerender] No POSTGRES_URL set – skipping tenant prerender, will use index.html as-is.');
    // Still strip FlamingoMedia from dist/index.html using whatever env we have.
    const fallbackName = process.env.VITE_BRAND_NAME || slug;
    const stripped = tpl
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fallbackName)}</title>`)
      .replace(/FlamingoMedia/g, fallbackName);
    writeFileSync(indexPath, stripped, 'utf-8');
    return;
  }
  // Lazy import so showcase build doesn't pay the cost.
  const { db, schema } = await import('../src/lib/db/client');
  const { eq } = await import('drizzle-orm');
  const tenantRow = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  if (!tenantRow) {
    console.warn(`[prerender] Tenant "${slug}" not found in DB – skipping tenant prerender.`);
    return;
  }
  const contentRow = await db.query.siteContent.findFirst({ where: eq(schema.siteContent.tenantId, tenantRow.id) });
  if (!contentRow?.data) {
    console.warn(`[prerender] No siteContent for "${slug}" – skipping tenant prerender.`);
    return;
  }
  const content: any = contentRow.data;
  const brandName: string = content?.brand?.name || slug;
  const brandLogo: string = content?.brand?.logoUrl || '';
  const heroImage: string = content?.hero?.imageUrl || '';
  const seoGlobal = content?.seo || {};
  const pageSeo = content?.pageSeo || {};
  const variant: TemplateVariant = (content?.template as TemplateVariant) || (process.env.VITE_TEMPLATE as TemplateVariant) || 'restaurant';
  const origin: string = (seoGlobal.canonical || process.env.SITE_ORIGIN || `https://${slug}.vercel.app`).replace(/\/$/, '');

  const defaultImage = pageSeo.home?.ogImage || seoGlobal.ogImage || heroImage || brandLogo || '/og-image.svg';
  const defaultDescription = seoGlobal.description || content?.brand?.tagline || `${brandName} – offizielle Webseite.`;

  const nav = navByVariant(variant);
  const routes: RouteSpec[] = nav.map(({ path, pageId, label }) => {
    const ps = pageSeo[pageId] || {};
    const baseTitle: string = ps.title || (pageId === 'home' ? brandName : `${label} · ${brandName}`);
    const description: string = ps.description || defaultDescription;
    const image: string = ps.ogImage || defaultImage;
    const keywords: string = ps.keywords || seoGlobal.keywords || '';
    return {
      path,
      title: baseTitle,
      description,
      image,
      keywords,
    };
  });

  // Replace the hardcoded FlamingoMedia JSON-LD Organization block in index.html
  // with a tenant-specific one so crawlers don't see "FlamingoMedia" as the org.
  const tenantOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brandName,
    url: `${origin}/`,
    logo: brandLogo || undefined,
    description: content?.brand?.tagline || defaultDescription,
    email: content?.contact?.email || undefined,
    telephone: content?.contact?.phone || undefined,
    address: content?.contact?.street ? {
      '@type': 'PostalAddress',
      streetAddress: content.contact.street,
      postalCode: content.contact.postalCode || undefined,
      addressLocality: content.contact.city || undefined,
      addressCountry: content.contact.country || 'AT',
    } : undefined,
  };
  // Cleanly replace the two JSON-LD scripts in the head with tenant-specific ones.
  // Locate every `<script type="application/ld+json">…</script>` block in the
  // current dist/index.html and drop them, then inject ours just before </head>.
  let baseHtml = tpl.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
  const injection =
    `<script type="application/ld+json">${JSON.stringify(tenantOrg)}</script>\n    ` +
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: brandName,
      url: `${origin}/`,
      inLanguage: seoGlobal.locale || 'de',
    })}</script>\n  `;
  baseHtml = baseHtml.replace(/<\/head>/, `${injection}</head>`);
  // Persist the clean template back to memory by overwriting `tpl` for this run.
  // We do this by writing the home-route output ourselves below using `baseHtml`.

  // Write all routes
  let written = 0;
  for (const route of routes) {
    if (route.path === '/') continue;
    const outDir = join(dist, route.path.replace(/^\//, ''));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), applyMeta(baseHtml, route, origin, brandName), 'utf-8');
    written++;
  }
  const home = routes.find((r) => r.path === '/');
  if (home) {
    writeFileSync(indexPath, applyMeta(baseHtml, home, origin, brandName), 'utf-8');
    written++;
  }
  console.log(`[prerender] tenant=${slug} variant=${variant} brand="${brandName}" – wrote ${written} static HTML files`);
}

// ─── Showcase prerender (FlamingoMedia agency site) ─────────────────────────
async function prerenderShowcase() {
  const SITE_ORIGIN = (process.env.SITE_ORIGIN || 'https://flamingomedia.vercel.app').replace(/\/$/, '');
  const showcaseRoutes: RouteSpec[] = [
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
  const written = writeRoutes(showcaseRoutes, SITE_ORIGIN, 'FlamingoMedia');
  console.log(`[prerender] showcase – wrote ${written} static SEO HTML files`);
}

(async () => {
  if (TENANT_SLUG && TENANT_SLUG !== 'demo') {
    try {
      await prerenderTenant(TENANT_SLUG);
    } catch (err) {
      console.error('[prerender] tenant prerender failed, falling back to showcase prerender:', err);
      await prerenderShowcase();
    }
  } else {
    await prerenderShowcase();
  }
})();
