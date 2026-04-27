/**
 * Resolves the current tenant slug from environment.
 * Per-customer Vercel project sets VITE_TENANT_SLUG.
 */
export function getTenantSlug(): string {
  const slug = import.meta.env.VITE_TENANT_SLUG;
  if (!slug) {
    // eslint-disable-next-line no-console
    console.warn('VITE_TENANT_SLUG is not set – falling back to "demo".');
    return 'demo';
  }
  return slug;
}

export function getTemplateKey(): string {
  return import.meta.env.VITE_TEMPLATE || 'restaurant';
}

/**
 * Showcase mode: agency landing page where prospects can preview templates.
 * Set VITE_MODE=showcase in the showcase Vercel project.
 */
export function isShowcaseMode(): boolean {
  return import.meta.env.VITE_MODE === 'showcase';
}
