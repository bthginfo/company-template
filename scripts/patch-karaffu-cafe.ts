/**
 * Patch karaffu tenant content: Italian restaurant → Specialty Coffee Place.
 *
 * Preserves any fields the user has already customised (brand.name, etc.)
 * and only overwrites the demo-data leftovers that still say "Trattoria".
 *
 * Usage:   npx tsx scripts/patch-karaffu-cafe.ts [--dry-run]
 */
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import { eq } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client';

const SLUG = 'karaffu';
const DRY_RUN = process.argv.includes('--dry-run');

/* ─── Café content overrides ─────────────────────────────────────── */

const CAFE_HERO = {
  title: 'Specialty Coffee, ehrlich geröstet.',
  subtitle: 'Von der Bohne bis in die Tasse – Third Wave Coffee in Innsbruck.',
  body: 'Handgeröstete Single-Origin-Bohnen, Filterkaffee und Espresso-Klassiker. Dazu hausgemachte Backwaren und ein ruhiger Ort zum Verweilen.',
  ctaLabel: 'Tisch finden',
  ctaHref: '/kontakt',
};

const CAFE_ABOUT = {
  title: 'Kaffee ist unser Handwerk.',
  body: 'Karaffu wurde aus der Überzeugung geboren, dass guter Kaffee mehr verdient als eine Kapsel und dreißig Sekunden.\n\nWir rösten selbst – in kleinen Chargen, direkt gehandelt, hell bis mittel. Jede Bohne hat eine Herkunftsgeschichte, die wir gerne erzählen.\n\nUnser Café ist zugleich Rösterei, Verkostungsraum und Treffpunkt. Ob Flat White, V60 oder ein klassischer Verlängerter – wir machen ihn so, wie er sein sollte.',
};

const CAFE_SERVICES = [
  { title: 'Flat White', description: 'Doppelter Espresso, samtige Milch. Unser Signature-Drink für den ganzen Tag.', price: '4,20 €', imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80' },
  { title: 'Pour-Over (V60)', description: 'Handgebrühter Filterkaffee – wechselnde Single-Origin-Bohnen. Herkunft steht auf der Tafel.', price: '4,80 €', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80' },
  { title: 'Espresso', description: 'Klassisch, kurz, kräftig. Unsere Hausmischung aus Äthiopien und Kolumbien.', price: '2,80 €', imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80' },
  { title: 'Matcha Latte', description: 'Zeremonieller Matcha aus Uji, aufgeschäumt mit Hafermilch.', price: '4,50 €', imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80' },
  { title: 'Banana Bread', description: 'Hausgemacht, vegan, mit Walnüssen und einer Prise Zimt. Täglich frisch.', price: '3,90 €', imageUrl: 'https://images.unsplash.com/photo-1585478259715-876acc5be8fc?auto=format&fit=crop&w=900&q=80' },
  { title: 'Avocado Toast', description: 'Sauerteigbrot, Avocado, pochiertes Ei, Chiliflocken, Microgreens.', price: '9,50 €', imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80' },
  { title: 'Croissant (Butter)', description: 'Vom Bäcker nebenan, jeden Morgen frisch geliefert. Plain oder mit Marmelade.', price: '3,20 €', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?auto=format&fit=crop&w=900&q=80' },
  { title: 'Cold Brew', description: '18 Stunden kalt extrahiert. Serviert on the rocks oder mit Tonic.', price: '4,50 €', imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80' },
  { title: '250 g Bohnen (Take Away)', description: 'Unsere aktuelle Röstung für zuhause. Ganze Bohne, frisch geröstet.', price: '14,90 €', imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80' },
];

const CAFE_GALLERY = [
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80',
];

const CAFE_TESTIMONIALS = [
  { author: 'Anna K., Innsbruck', text: 'Der beste Flat White der Stadt. Ruhig, ehrlich, kein Schnickschnack – einfach guter Kaffee.' },
  { author: 'David R., Wien', text: 'Endlich ein Ort, der Single Origin ernst nimmt. Der Pour-Over wechselt ständig und überrascht immer.' },
  { author: 'Marie & Tom', text: 'Unser Wochenend-Ritual. Die Atmosphäre, das Banana Bread, der Kaffee – perfekt.' },
  { author: 'Luca M., München', text: 'Ich kaufe hier jedes Mal 2 Packungen Bohnen für zuhause. Die Röstung ist fantastisch.' },
];

const CAFE_BRANCH_TEXT = {
  teaserSubtitle: 'Handgerösteter Specialty Coffee, hausgemachte Backwaren und ein ruhiger Ort zum Durchatmen.',
  marqueeWords: ['Single Origin', 'Pour-Over', 'Flat White', 'Cold Brew', 'Banana Bread', 'Eigene Röstung'],
  aboutTeaserEyebrow: 'Unsere Geschichte',
  manifestEyebrow: 'Manifest',
  manifestTitle: 'Kaffee, ehrlich geröstet.',
  softCtaEyebrow: 'Lust auf Kaffee?',
  softCtaTitle: 'Komm vorbei oder bestell für zuhause.',
  softCtaText: 'Ob Flat White vor Ort oder frisch geröstete Bohnen zum Mitnehmen – wir freuen uns auf dich.',
  softCtaButton: 'Platz finden',
  servicesTeaserEyebrow: 'Karte',
  servicesTeaserTitle: 'Aus der Rösterei.',
  servicesAllLabel: 'Ganze Karte',
  servicesAllHref: '/speisekarte',
  testimonialsTitle: 'Was unsere Gäste sagen.',
};

/* ─── Main ───────────────────────────────────────────────────────── */

async function main() {
  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, SLUG) });
  if (!tenant) {
    console.error(`Tenant "${SLUG}" not found.`);
    process.exit(1);
  }

  const row = await db.query.siteContent.findFirst({ where: eq(schema.siteContent.tenantId, tenant.id) });
  if (!row) {
    console.error(`No siteContent for tenant "${SLUG}".`);
    process.exit(1);
  }

  const data = row.data as Record<string, any>;
  console.log(`\nFound tenant: ${tenant.name} (${tenant.slug}, template=${tenant.template}, style=${tenant.style})`);

  // Helper: only overwrite if current value still matches the demo default
  const isDemo = (path: string, demoVal: string): boolean => {
    const parts = path.split('.');
    let obj: any = data;
    for (const p of parts) obj = obj?.[p];
    return obj === demoVal;
  };

  // Track what we change
  const changes: string[] = [];

  // Hero
  if (isDemo('hero.title', 'Italien beginnt am ersten Bissen.') || isDemo('hero.title', 'Trattoria Innsbruck')) {
    data.hero = { ...data.hero, ...CAFE_HERO };
    changes.push('hero (title, subtitle, body, cta)');
  } else {
    // Still patch subtitle/body if they're the demo
    if (isDemo('hero.subtitle', 'Pasta, Pizza, Naturweine – seit 1998 in Innsbruck.')) {
      data.hero.subtitle = CAFE_HERO.subtitle;
      changes.push('hero.subtitle');
    }
    if (isDemo('hero.body', 'Handgemachte Pasta, Holzofen-Pizza und Naturweine im Herzen von Innsbruck. Drei Generationen Familie. Eine ehrliche Küche.')) {
      data.hero.body = CAFE_HERO.body;
      changes.push('hero.body');
    }
  }

  // About
  if (isDemo('about.title', 'Drei Generationen, ein Versprechen.')) {
    data.about = { ...data.about, ...CAFE_ABOUT };
    changes.push('about (title, body)');
  }

  // Services — only replace if they still look like the Italian demo
  const currentFirstService = data.services?.[0]?.title;
  if (currentFirstService === 'Tagliatelle al Tartufo') {
    data.services = CAFE_SERVICES;
    changes.push(`services (${CAFE_SERVICES.length} café items)`);
  }

  // Gallery — only replace if it's the demo set
  if (data.gallery?.[0]?.includes('565299624946')) {
    data.gallery = CAFE_GALLERY;
    changes.push('gallery (9 café images)');
  }

  // Testimonials — only replace if demo
  if (data.testimonials?.[0]?.author === 'Sabine M., Innsbruck') {
    data.testimonials = CAFE_TESTIMONIALS;
    changes.push('testimonials (4 café reviews)');
  }

  // BranchText — merge café overrides
  const existingBT = (data.branchText ?? {}) as Record<string, any>;
  for (const [key, val] of Object.entries(CAFE_BRANCH_TEXT)) {
    const existing = existingBT[key];
    // Only overwrite if still matches demo default or is empty
    if (!existing || existing === '' || existing === (CAFE_BRANCH_TEXT as any)[key]) {
      existingBT[key] = val;
    }
  }
  data.branchText = existingBT;
  changes.push('branchText (café overrides)');

  if (changes.length === 0) {
    console.log('Nothing to patch — all demo content already overwritten.');
    process.exit(0);
  }

  console.log(`\nPatching ${changes.length} fields:`);
  changes.forEach((c) => console.log(`  ✓ ${c}`));

  if (DRY_RUN) {
    console.log('\n[DRY RUN] No changes written.');
    process.exit(0);
  }

  await db
    .update(schema.siteContent)
    .set({ data, updatedAt: new Date() })
    .where(eq(schema.siteContent.tenantId, tenant.id));

  console.log('\n✅ Karaffu content patched. Clear any CDN cache if needed.');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
