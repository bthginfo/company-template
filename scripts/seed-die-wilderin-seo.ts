/**
 * Fills genuine SEO content gaps on die-wilderin without using fallbacks.
 *  - seo.canonical
 *  - pageSeo[*].ogImage
 *  - pageSeo[*].keywords
 *
 * Run: tsx scripts/seed-die-wilderin-seo.ts
 */
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { db, schema } from '../src/lib/db/client';
import { eq } from 'drizzle-orm';

const SLUG = 'die-wilderin';
const CANONICAL = 'https://die-wilderin.vercel.app/';
const FALLBACK_OG = 'https://www.diewilderin.at/wp-content/uploads/2026/04/HPKW_18-880x390.jpg';

const PAGE_SEO_PATCH: Record<string, { keywords: string; ogImage: string }> = {
  home: {
    keywords:
      'Wirtshaus Innsbruck, alpine Küche, regional saisonal, Wildfleisch Tirol, Seilergasse, ganzes Tier, Naturweine, die Wilderin',
    ogImage: FALLBACK_OG,
  },
  about: {
    keywords:
      'die Wilderin Geschichte, Team, Manifest, Sammler-Jäger-Bewegung, Innsbruck Gastronomie, Tiroler Wirtshaus',
    ogImage: FALLBACK_OG,
  },
  gallery: {
    keywords:
      'Eindrücke Wilderin, Gastraum Innsbruck, Service, Produzentinnen, Tiroler Bauern, Wildfleisch Galerie',
    ogImage: FALLBACK_OG,
  },
  services: {
    keywords:
      'Speisekarte Wilderin, Tartar, Beuschl, Naturweine, Tiroler Bier, Wildfleisch Innsbruck, alte Kühe, Wurzelgemüse',
    ogImage: FALLBACK_OG,
  },
  contactPage: {
    keywords:
      'Reservierung Wilderin Innsbruck, Telefon +43 512 562728, Seilergasse 5, Anfahrt, Öffnungszeiten',
    ogImage: FALLBACK_OG,
  },
};

(async () => {
  const t = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, SLUG) });
  if (!t) {
    console.error(`Tenant ${SLUG} not found`);
    process.exit(1);
  }
  const cRow = await db.query.siteContent.findFirst({ where: eq(schema.siteContent.tenantId, t.id) });
  if (!cRow?.data) {
    console.error(`No siteContent for ${SLUG}`);
    process.exit(1);
  }

  const data: any = cRow.data;
  data.seo = data.seo || {};
  data.seo.canonical = CANONICAL;

  data.pageSeo = data.pageSeo || {};
  for (const [pageId, patch] of Object.entries(PAGE_SEO_PATCH)) {
    data.pageSeo[pageId] = {
      ...(data.pageSeo[pageId] || {}),
      keywords: patch.keywords,
      ogImage: patch.ogImage,
    };
  }

  await db
    .update(schema.siteContent)
    .set({ data, updatedAt: new Date() })
    .where(eq(schema.siteContent.tenantId, t.id));

  console.log(`✓ Updated SEO for ${SLUG}`);
  console.log(`  seo.canonical = ${CANONICAL}`);
  for (const k of Object.keys(PAGE_SEO_PATCH)) {
    console.log(`  pageSeo.${k}.{keywords,ogImage} set`);
  }
  process.exit(0);
})();
