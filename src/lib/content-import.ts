import type { SiteContent } from './types';

/** Import JSON content into a tenant's CMS. Used by provisioning scripts. */
export async function importContentJson(
  slug: string,
  _json: Partial<SiteContent>,
  options?: { merge?: boolean; skipValidation?: boolean; target?: string }
): Promise<{ branch: string; style: string }> {
  // Stub — real implementation writes to DB via Drizzle
  console.log(`[content-import] importing for ${slug}`, { merge: options?.merge });
  return { branch: 'main', style: 'classic' };
}
