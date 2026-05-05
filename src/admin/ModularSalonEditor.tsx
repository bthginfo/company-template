/**
 * Salon — eigener Spez-Editor-Einstieg (alle Seiten × alle Stile über `SALON_MODULAR_SPEC_CFG`).
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { SALON_MODULAR_SPEC_CFG } from './modular-branch-spec-config';

export { hasSalonModularPage, hasAnySalonModular } from '@/lib/modular-salon';

type SharedProps = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
};

export function ModularSalonPageEditor({ data, setData, tpl, style, page }: SharedProps & { page: ModularSpecPageKey }) {
  return <ModularSpecPageEditor data={data} setData={setData} tpl={tpl} style={style} page={page} cfg={SALON_MODULAR_SPEC_CFG} />;
}

export function ModularSalonActivationPanel(props: SharedProps) {
  return <ModularSpecActivationPanel {...props} cfg={SALON_MODULAR_SPEC_CFG} />;
}
