/**
 * Praxis — eigener Spez-Editor-Einstieg (alle Seiten × alle Stile über `MEDICAL_MODULAR_SPEC_CFG`).
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { MEDICAL_MODULAR_SPEC_CFG } from './modular-branch-spec-config';

export { hasMedicalModularPage, hasAnyMedicalModular } from '@/lib/modular-medical';

type SharedProps = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
};

export function ModularMedicalPageEditor({ data, setData, tpl, style, page }: SharedProps & { page: ModularSpecPageKey }) {
  return <ModularSpecPageEditor data={data} setData={setData} tpl={tpl} style={style} page={page} cfg={MEDICAL_MODULAR_SPEC_CFG} />;
}

export function ModularMedicalActivationPanel(props: SharedProps) {
  return <ModularSpecActivationPanel {...props} cfg={MEDICAL_MODULAR_SPEC_CFG} />;
}
