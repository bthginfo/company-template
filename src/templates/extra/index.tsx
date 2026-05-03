/**
 * Back-compat re-exports — implementation lives in `src/templates/_shared/extra/`.
 * Core and extras share `_shared`; `SiteRouter` → `TemplateApp` → `./extra` for the three extra branches.
 */
export { default, EXTRA_BRANCH_KEYS, isExtraBranchKey } from '../_shared/extra';
export type { ExtraBranchKey, ExtraStyle, ExtraPage } from '../_shared/extra';
