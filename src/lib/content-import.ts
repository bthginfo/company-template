/**
 * Shared content-import logic used by both the API endpoint
 * (`api/admin/import-content.ts`) and the CLI (`scripts/provision-tenant.ts`).
 *
 * Accepts a raw JSON object (Perplexity output) and deep-merges it into
 * the tenant's existing site content, skipping empty values.
 */
import { eq } from 'drizzle-orm';
import { db, schema } from './db/client.js';
import { SiteContentSchema } from './types.js';
import { applyContentFieldAliases } from './content-field-aliases.js';

/**
 * Import a content JSON into the tenant's site content.
 * Returns the updated branch + style (if changed by the import).
 */
export async function importContentJson(
  slug: string,
  raw: Record<string, unknown>,
): Promise<{ branch: string; style: string }> {
  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.slug, slug),
  });
  if (!tenant) throw new Error(`Tenant "${slug}" not found`);

  const cleaned = normaliseImport(raw);

  const existing = await db.query.siteContent.findFirst({
    where: eq(schema.siteContent.tenantId, tenant.id),
  });
  const existingData = (existing?.data ?? {}) as Record<string, unknown>;
  const merged = deepMerge(existingData, cleaned);

  // Coerce array shapes, then map AI export aliases (question/answer → q/a, etc.)
  coerceArrayFields(merged);
  applyContentFieldAliases(merged);
  ensureIds(merged, 'faq');
  ensureIds(merged, 'press');
  ensureIds(merged, 'team');
  ensureIds(merged, 'programs');

  const parse = SiteContentSchema.safeParse(merged);
  if (!parse.success) {
    throw new Error(`Content validation failed: ${JSON.stringify(parse.error.flatten())}`);
  }

  await db
    .insert(schema.siteContent)
    .values({ tenantId: tenant.id, data: parse.data })
    .onConflictDoUpdate({
      target: schema.siteContent.tenantId,
      set: { data: parse.data, updatedAt: new Date() },
    });

  // Only update branch/style on the tenant row if the caller did NOT already
  // set them via provisioning. The CRM provisions the tenant first (which sets
  // the user-chosen style), then calls import-content with the JSON that may
  // contain a different style value. We should not overwrite the user's choice.
  // → Skip branch/style update; the provisioning step is authoritative.

  return {
    branch: tenant.template,
    style: tenant.style,
  };
}

/** Strip `_` prefixed keys, hoist `_subpage_*` children to top-level. */
function normaliseImport(raw: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(raw)) {
    if (key.startsWith('_')) {
      // Hoist children of _subpage_* containers
      if (key.startsWith('_subpage_') && key !== '_subpage_services_branch_modules' && value && typeof value === 'object' && !Array.isArray(value)) {
        for (const [childKey, childVal] of Object.entries(value as Record<string, unknown>)) {
          if (!childKey.startsWith('_')) {
            result[childKey] = stripMeta(childVal);
          }
        }
      }
      // Hoist branch modules
      if (key === '_subpage_services_branch_modules' && value && typeof value === 'object') {
        for (const [modKey, modVal] of Object.entries(value as Record<string, unknown>)) {
          if (!modKey.startsWith('_') && modVal && typeof modVal === 'object') {
            const mod = modVal as Record<string, unknown>;
            // Unwrap container objects that hold a single array-valued child
            // e.g. menu: { categories: [...] } → menu: [...]
            const unwrapped = unwrapSingleArray(mod);
            result[modKey] = stripMeta(unwrapped ?? mod);
          }
        }
      }
      continue;
    }
    if (key === 'branch' || key === 'style') continue;
    result[key] = stripMeta(value);
  }

  return result;
}

/** Recursively remove keys that start with `_`. */
function stripMeta(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map(stripMeta);
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (!k.startsWith('_')) out[k] = stripMeta(v);
    }
    return out;
  }
  return value;
}

/**
 * If `obj` is a wrapper with metadata keys (`_*`) plus exactly one array-valued
 * non-meta key (e.g. `{ _branch: "restaurant", categories: [...] }`),
 * return that array. Otherwise return null.
 */
function unwrapSingleArray(obj: Record<string, unknown>): unknown[] | null {
  const nonMeta = Object.entries(obj).filter(([k]) => !k.startsWith('_'));
  if (nonMeta.length === 1 && Array.isArray(nonMeta[0][1])) {
    return nonMeta[0][1] as unknown[];
  }
  // Also handle the direct case: items or categories key
  if ('items' in obj && Array.isArray(obj.items)) return obj.items as unknown[];
  if ('categories' in obj && Array.isArray(obj.categories)) return obj.categories as unknown[];
  return null;
}

/** Ensure each item in an array field has an `id`. */
function ensureIds(obj: Record<string, unknown>, field: string) {
  const arr = obj[field];
  if (!Array.isArray(arr)) return;
  for (const item of arr) {
    if (item && typeof item === 'object' && !('id' in item)) {
      (item as Record<string, unknown>).id = crypto.randomUUID();
    }
  }
}

/**
 * Schema expects certain top-level fields to be arrays.
 * Perplexity output may wrap them as objects (e.g. `menu: { categories: [...] }`).
 * Coerce these to arrays before validation.
 */
const ARRAY_FIELDS = [
  'menu', 'rooms', 'tours', 'treatments', 'courses', 'packages',
  'processSteps', 'doctors', 'fundingItems', 'services', 'testimonials',
  'posts', 'timeline', 'highlights', 'faq', 'team', 'values',
  'certifications', 'press', 'announcements', 'numbers', 'homeSignatureItems',
  'programs',
];
function coerceArrayFields(obj: Record<string, unknown>) {
  for (const field of ARRAY_FIELDS) {
    const val = obj[field];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      const unwrapped = unwrapSingleArray(val as Record<string, unknown>);
      if (unwrapped) {
        obj[field] = unwrapped;
      }
    }
    // Ensure ids on array items
    ensureIds(obj, field);
  }
}

/**
 * Deep-merge `source` into `target`. Skips empty strings and empty arrays
 * in source (doesn't overwrite existing content with nothing).
 */
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };

  for (const [key, srcVal] of Object.entries(source)) {
    if (srcVal === undefined || srcVal === null) continue;
    if (typeof srcVal === 'string' && srcVal.trim() === '') continue;
    if (Array.isArray(srcVal) && srcVal.length === 0) continue;

    const tgtVal = target[key];

    if (
      srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal) &&
      tgtVal && typeof tgtVal === 'object' && !Array.isArray(tgtVal)
    ) {
      result[key] = deepMerge(tgtVal as Record<string, unknown>, srcVal as Record<string, unknown>);
    } else {
      result[key] = srcVal;
    }
  }

  return result;
}
