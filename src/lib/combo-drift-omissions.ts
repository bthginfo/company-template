import type { AdminSectionKey, PageKey } from '@/admin/admin-sections';
import type { TemplateStyle } from './branch-config';
import type { TemplateKey } from './types';

/**
 * Optional escape hatch for `scripts/drift-machine.ts` combo-scoped dataKey
 * checks. Prefer fixing the renderer/editor or the section contract instead of
 * adding rows here.
 */
export type ComboDataKeyOmitRule = {
  template: TemplateKey;
  style: TemplateStyle;
  page: PageKey;
  section: AdminSectionKey;
  dataKey: string;
  reason: string;
};

const CORE_TEMPLATES = ['restaurant', 'salon', 'tradesman', 'hotel', 'tourism'] as const satisfies readonly TemplateKey[];

const ALL_STYLES = ['classic', 'modern', 'bold'] as const satisfies readonly TemplateStyle[];

/** `branchText.serviceCardNote` appears only on extras-modern service cards (`extra/index.tsx`). */
function serviceCardNoteOmitsForCoreBranches(): ComboDataKeyOmitRule[] {
  const out: ComboDataKeyOmitRule[] = [];
  for (const template of CORE_TEMPLATES) {
    for (const style of ALL_STYLES) {
      out.push({
        template,
        style,
        page: 'home',
        section: 'services',
        dataKey: 'branchText.serviceCardNote',
        reason:
          'Nur Extras-Modern rendert die Fußnote auf Home-Service-Karten; Kern-5-Teaser nutzt sie nicht.',
      });
    }
  }
  return out;
}

export const COMBO_DATA_KEY_OMITS: readonly ComboDataKeyOmitRule[] = [...serviceCardNoteOmitsForCoreBranches()];
