/**
 * Replace remaining template fallbacks on die-wilderin with real content.
 *  - arrival: real Innsbruck-Altstadt anfahrt (currently showing generic
 *    "Parkmöglichkeiten in unmittelbarer Nähe.")
 *  - numbers: real Wilderin stats (currently no overlay → renderer falls back
 *    to "Familienbetrieb seit 1998 · Plätze 64 · Sterne 4,9 · 28 Weine offen"
 *    — none of which fit Wilderin).
 */
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { db, schema } from '../src/lib/db/client';
import { eq } from 'drizzle-orm';

const SLUG = 'die-wilderin';

const ARRIVAL = [
  {
    t: 'Mit dem Auto',
    d: 'Seilergasse 5 liegt in der Innsbrucker Altstadt-Fußgängerzone. Nächste Garagen: Markt­garage (3 Min) oder Sparkassenplatz (5 Min).',
  },
  {
    t: 'Mit der Bahn',
    d: '10 Min Fußweg vom Hauptbahnhof Innsbruck — durch die Maria-Theresien-Straße in die Altstadt.',
  },
  {
    t: 'Zu Fuß & ÖPNV',
    d: 'Von der Maria-Theresien-Straße sind es 2 Min in die Seilergasse. Buslinien zur „Marktplatz" oder „Anichstraße".',
  },
];

const NUMBERS = [
  { value: '2013',    label: 'Wirtshaus seit' },
  { value: '50',      label: 'Plätze' },
  { value: '4,9',     label: 'Sterne ø' },
  { value: '60+',     label: 'Naturweine offen' },
];

const SERVICE_PROCESS = [
  { t: 'Anrufen',                 d: 'Old School: +43 512 562728 oder info@diewilderin.at. Kein Online-System — uns ist das Gespräch wichtig.' },
  { t: 'Ankommen',                d: 'Begrüßung an der Tür, persönlich an den Tisch. Mantel, Wein, Wasser — alles ohne Hektik.' },
  { t: 'Sich treiben lassen',     d: 'Die Karte wechselt mit der Saison. Service und Sommelière begleiten — fragen Sie nach den Geschichten zu jedem Teller.' },
  { t: 'Wiederkommen',            d: 'Beim nächsten Mal kennen wir Sie schon. Stammgast wird man hier nicht durch eine Karte, sondern durch ein zweites Mal.' },
];

(async () => {
  const t = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, SLUG) });
  if (!t) { console.error('not found'); process.exit(1); }
  const cRow = await db.query.siteContent.findFirst({ where: eq(schema.siteContent.tenantId, t.id) });
  if (!cRow?.data) { console.error('no content'); process.exit(1); }

  const data: any = cRow.data;
  data.arrival = ARRIVAL;
  data.numbers = NUMBERS;
  data.serviceProcess = SERVICE_PROCESS;

  await db
    .update(schema.siteContent)
    .set({ data, updatedAt: new Date() })
    .where(eq(schema.siteContent.tenantId, t.id));

  console.log(`✓ ${SLUG}: arrival (${ARRIVAL.length}), numbers (${NUMBERS.length}), serviceProcess (${SERVICE_PROCESS.length}) updated`);
  process.exit(0);
})();
