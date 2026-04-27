import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { db, schema } from '../src/lib/db/client';
import { SiteContentSchema, type SiteContent, type TemplateKey } from '../src/lib/types';

const [, , slug, name, template] = process.argv;

if (!slug || !name || !template) {
  console.error('Usage: tsx scripts/create-tenant.ts <slug> "<Display Name>" <restaurant|salon|tradesman>');
  process.exit(1);
}

if (!['restaurant', 'salon', 'tradesman'].includes(template)) {
  console.error('template must be one of: restaurant, salon, tradesman');
  process.exit(1);
}

const DEFAULT_CONTENT: Record<TemplateKey, SiteContent> = {
  restaurant: SiteContentSchema.parse({
    brand: { name, tagline: 'Authentische Küche aus der Region', primaryColor: '#9a3412' },
    hero: { title: `Willkommen bei ${name}`, subtitle: 'Frische, regionale Zutaten – mit Liebe zubereitet.', ctaLabel: 'Tisch reservieren', ctaHref: '#kontakt' },
    about: { title: 'Unsere Geschichte', body: 'Seit vielen Jahren bringen wir die kulinarische Tradition unserer Heimat auf Ihren Teller.' },
    services: [
      { title: 'Tagesmenü', description: 'Wechselnde Spezialitäten der Saison.', price: '14,90 €' },
      { title: 'Hauptgerichte', description: 'Klassiker und kreative Kreationen.', price: 'ab 16,50 €' },
    ],
    gallery: [],
    testimonials: [{ author: 'Sabine M.', text: 'Tolles Essen, herzliche Bedienung – wir kommen wieder!' }],
    contact: { phone: '', email: '', address: '', city: '', hours: [{ day: 'Mo–Fr', time: '11:30–22:00' }, { day: 'So', time: 'Ruhetag' }], mapsUrl: '' },
  }),
  salon: SiteContentSchema.parse({
    brand: { name, tagline: 'Ihr Salon für Stil & Wohlbefinden', primaryColor: '#be185d' },
    hero: { title: name, subtitle: 'Friseur · Beauty · Wohlfühlen', ctaLabel: 'Termin buchen', ctaHref: '#kontakt' },
    about: { title: 'Über uns', body: 'Unser Team aus erfahrenen Stylist:innen verwöhnt Sie in entspannter Atmosphäre.' },
    services: [
      { title: 'Damen-Schnitt', description: 'Inkl. Waschen & Styling.', price: '55 €' },
      { title: 'Färben & Strähnen', description: 'Hochwertige Pflegeprodukte.', price: 'ab 75 €' },
    ],
    gallery: [],
    testimonials: [{ author: 'Lisa K.', text: 'Endlich ein Salon, dem ich zu 100 % vertraue!' }],
    contact: { phone: '', email: '', address: '', city: '', hours: [{ day: 'Di–Fr', time: '09:00–19:00' }, { day: 'Sa', time: '09:00–15:00' }], mapsUrl: '' },
  }),
  tradesman: SiteContentSchema.parse({
    brand: { name, tagline: 'Ihr Meisterbetrieb in der Region', primaryColor: '#1d4ed8' },
    hero: { title: `${name} – schnell, sauber, zuverlässig`, subtitle: 'Über 20 Jahre Erfahrung. Festpreis-Garantie.', ctaLabel: 'Jetzt anfragen', ctaHref: '#kontakt' },
    about: { title: 'Über uns', body: 'Wir sind ein traditionsreicher Meisterbetrieb mit einem eingespielten Team.' },
    services: [
      { title: 'Reparaturen', description: 'Schnelle Hilfe bei allen Notfällen.', price: '79 €' },
      { title: 'Sanierung', description: 'Beratung, Planung, Ausführung.', price: 'auf Anfrage' },
    ],
    gallery: [],
    testimonials: [{ author: 'Familie Huber', text: 'Termin eingehalten, Preis eingehalten – ehrliche Arbeit.' }],
    contact: { phone: '', email: '', address: '', city: '', hours: [{ day: 'Mo–Fr', time: '07:00–17:00' }, { day: 'Notdienst', time: '24/7' }], mapsUrl: '' },
  }),
};

async function main() {
  const password = randomBytes(12).toString('base64').replace(/[+/=]/g, '').slice(0, 16);
  const passwordHash = bcrypt.hashSync(password, 10);

  const existing = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, slug) });
  let tenantId: string;

  if (existing) {
    await db.update(schema.tenants).set({ passwordHash, name, template }).where(eq(schema.tenants.id, existing.id));
    tenantId = existing.id;
    console.log(`Tenant '${slug}' already existed — password reset, name & template updated.`);
  } else {
    const [row] = await db
      .insert(schema.tenants)
      .values({ slug, name, template, passwordHash })
      .returning();
    tenantId = row.id;
    const content = DEFAULT_CONTENT[template as TemplateKey];
    await db.insert(schema.siteContent).values({ tenantId, data: content }).onConflictDoNothing();
    console.log(`Tenant '${slug}' created with default content.`);
  }

  console.log('\n──────────────────────────────────────────');
  console.log(`  Tenant:   ${name}`);
  console.log(`  Slug:     ${slug}`);
  console.log(`  Template: ${template}`);
  console.log(`  Password: ${password}`);
  console.log('──────────────────────────────────────────');
  console.log('\nSet these env vars on the customer\'s Vercel project:');
  console.log(`  TENANT_SLUG=${slug}            (server)`);
  console.log(`  VITE_TENANT_SLUG=${slug}       (client)`);
  console.log(`  VITE_TEMPLATE=${template}      (client)`);
  console.log(`  AUTH_SECRET=<same as main>`);
  console.log(`  POSTGRES_URL=<same Neon url>`);
  console.log(`  BLOB_READ_WRITE_TOKEN=<same Blob token>`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
