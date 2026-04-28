import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { db, schema } from '../src/lib/db/client';
import { SiteContentSchema, type SiteContent } from '../src/lib/types';
import { DEMO_CONTENT, EXTRA_DEMO_CONTENT } from '../src/lib/demo-content';
import { BRANCH_TEXT_DEFAULTS } from '../src/lib/branch-text-defaults';
import { defaultGalleryStory, defaultGalleryCategories, defaultArrival } from '../src/lib/section-defaults';

const [, , slug, name, template] = process.argv;

if (!slug || !name || !template) {
  console.error('Usage: tsx scripts/create-tenant.ts <slug> "<Display Name>" <restaurant|salon|tradesman|hotel|tourism|consulting|medical|fitness>');
  process.exit(1);
}

const VALID_TEMPLATES = ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism', 'consulting', 'medical', 'fitness'] as const;
if (!VALID_TEMPLATES.includes(template as any)) {
  console.error(`template must be one of: ${VALID_TEMPLATES.join(', ')}`);
  process.exit(1);
}

type AnyTemplate = typeof VALID_TEMPLATES[number];

/** Build rich default content for any of the 8 supported templates,
 *  reusing the showcase demo content (DEMO_CONTENT / EXTRA_DEMO_CONTENT). */
function defaultsFor(t: AnyTemplate): SiteContent {
  if (t === 'consulting' || t === 'medical' || t === 'fitness') {
    const base = EXTRA_DEMO_CONTENT[t];
    return SiteContentSchema.parse({
      ...base,
      brand: { ...base.brand, name },
      hero: { ...base.hero, title: name },
      branchText: { ...((base as any).branchText || {}), ...BRANCH_TEXT_DEFAULTS[t] },
    });
  }
  const base = DEMO_CONTENT[t];
  return SiteContentSchema.parse({
    ...base,
    brand: { ...base.brand, name },
    hero: { ...base.hero, title: name },
    branchText: { ...((base as any).branchText || {}), ...BRANCH_TEXT_DEFAULTS[t] },
    // Seed the new admin overlay sections so the DB row already contains them.
    galleryStory: defaultGalleryStory(t),
    galleryCategories: defaultGalleryCategories(t),
    arrival: defaultArrival(t),
    contact: {
      ...base.contact,
      // Strip showcase phone/email/address so the tenant fills their own.
      phone: '', email: '', address: '',
      city: base.contact?.city || '',
      mapsUrl: '',
    },
  });
}

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
    const content = defaultsFor(template as AnyTemplate);
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
