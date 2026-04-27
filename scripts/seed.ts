import 'dotenv/config';
import { db, schema } from '../src/lib/db/client';
import { eq } from 'drizzle-orm';
import { SiteContentSchema, type SiteContent, type TemplateKey } from '../src/lib/types';

const [, , slug, name, template, adminEmail] = process.argv;

if (!slug || !name || !template) {
  // eslint-disable-next-line no-console
  console.error('Usage: tsx scripts/seed.ts <slug> "<Display Name>" <restaurant|salon|tradesman> [admin-email]');
  process.exit(1);
}

const DEFAULT_CONTENT: Record<TemplateKey, SiteContent> = {
  restaurant: SiteContentSchema.parse({
    brand: { name, tagline: 'Authentische Küche aus der Region', primaryColor: '#9a3412' },
    hero: {
      title: `Willkommen bei ${name}`,
      subtitle: 'Frische, regionale Zutaten – mit Liebe zubereitet.',
      ctaLabel: 'Tisch reservieren',
      ctaHref: '#kontakt',
    },
    about: {
      title: 'Unsere Geschichte',
      body: 'Seit vielen Jahren bringen wir die kulinarische Tradition unserer Heimat auf Ihren Teller. Familiengeführt, leidenschaftlich, ehrlich.',
    },
    services: [
      { title: 'Tagesmenü', description: 'Wechselnde Spezialitäten der Saison.', price: '14,90 €' },
      { title: 'Hauptgerichte', description: 'Klassiker und kreative Kreationen.', price: 'ab 16,50 €' },
      { title: 'Desserts', description: 'Hausgemacht, jeden Tag frisch.', price: 'ab 6,50 €' },
    ],
    gallery: [],
    testimonials: [
      { author: 'Sabine M.', text: 'Tolles Essen, herzliche Bedienung – wir kommen wieder!' },
    ],
    contact: {
      phone: '', email: '', address: '', city: 'Innsbruck',
      hours: [
        { day: 'Mo–Fr', time: '11:30–14:00 · 17:30–22:00' },
        { day: 'Sa', time: '17:30–23:00' },
        { day: 'So', time: 'Ruhetag' },
      ],
      mapsUrl: '',
    },
  }),
  salon: SiteContentSchema.parse({
    brand: { name, tagline: 'Ihr Salon für Stil & Wohlbefinden', primaryColor: '#be185d' },
    hero: {
      title: name,
      subtitle: 'Friseur · Beauty · Wohlfühlen',
      ctaLabel: 'Termin buchen',
      ctaHref: '#kontakt',
    },
    about: {
      title: 'Über uns',
      body: 'Unser Team aus erfahrenen Stylist:innen verwöhnt Sie in entspannter Atmosphäre. Hochwertige Produkte, individuelle Beratung.',
    },
    services: [
      { title: 'Damen-Schnitt inkl. Waschen & Styling', description: 'Schultelang oder kürzer.', price: '55 €' },
      { title: 'Färben & Strähnen', description: 'Hochwertige Pflegeprodukte.', price: 'ab 75 €' },
      { title: 'Maniküre', description: 'Klassisch oder mit Shellac.', price: 'ab 35 €' },
    ],
    gallery: [],
    testimonials: [
      { author: 'Lisa K.', text: 'Endlich ein Salon, dem ich zu 100 % vertraue!' },
    ],
    contact: {
      phone: '', email: '', address: '', city: 'München',
      hours: [
        { day: 'Di–Fr', time: '09:00–19:00' },
        { day: 'Sa', time: '09:00–15:00' },
        { day: 'So + Mo', time: 'Geschlossen' },
      ],
      mapsUrl: '',
    },
  }),
  tradesman: SiteContentSchema.parse({
    brand: { name, tagline: 'Ihr Meisterbetrieb in der Region', primaryColor: '#1d4ed8' },
    hero: {
      title: `${name} – schnell, sauber, zuverlässig`,
      subtitle: 'Über 20 Jahre Erfahrung. Festpreis-Garantie. 24/7-Notdienst.',
      ctaLabel: 'Jetzt anfragen',
      ctaHref: '#kontakt',
    },
    about: {
      title: 'Über uns',
      body: 'Wir sind ein traditionsreicher Meisterbetrieb mit einem eingespielten Team. Was wir versprechen, halten wir – pünktlich, sauber, fair kalkuliert.',
    },
    services: [
      { title: 'Reparaturen', description: 'Schnelle Hilfe bei allen Notfällen.', price: '79 €' },
      { title: 'Sanierung & Modernisierung', description: 'Beratung, Planung, Ausführung – alles aus einer Hand.', price: 'auf Anfrage' },
      { title: 'Neubau', description: 'Vom Rohbau bis zur Übergabe.', price: 'auf Anfrage' },
    ],
    gallery: [],
    testimonials: [
      { author: 'Familie Huber', text: 'Termin eingehalten, Preis eingehalten – ehrliche Arbeit.' },
    ],
    contact: {
      phone: '', email: '', address: '', city: 'Ingolstadt',
      hours: [
        { day: 'Mo–Fr', time: '07:00–17:00' },
        { day: 'Notdienst', time: '24/7' },
      ],
      mapsUrl: '',
    },
  }),
};

async function main() {
  if (!['restaurant', 'salon', 'tradesman'].includes(template)) {
    throw new Error('template must be one of: restaurant, salon, tradesman');
  }

  const existing = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  let tenant = existing;
  if (!tenant) {
    const [row] = await db
      .insert(schema.tenants)
      .values({ slug, name, template })
      .returning();
    tenant = row;
    console.log('Tenant created:', tenant);
  } else {
    console.log('Tenant exists:', tenant);
  }

  const content = DEFAULT_CONTENT[template as TemplateKey];
  await db
    .insert(schema.siteContent)
    .values({ tenantId: tenant.id, data: content })
    .onConflictDoNothing();
  console.log('Content seeded.');

  if (adminEmail) {
    const u = await db.query.users.findFirst({ where: eq(schema.users.email, adminEmail) });
    if (u) {
      await db.update(schema.users).set({ tenantId: tenant.id }).where(eq(schema.users.id, u.id));
      console.log(`Existing user ${adminEmail} linked to tenant.`);
    } else {
      await db.insert(schema.users).values({ email: adminEmail, tenantId: tenant.id });
      console.log(`User ${adminEmail} pre-created and linked. They can now sign in via magic link.`);
    }
  }

  console.log('\n✓ Done. Set these env vars on the Vercel project:');
  console.log(`   VITE_TENANT_SLUG=${slug}`);
  console.log(`   VITE_TEMPLATE=${template}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
