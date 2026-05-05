/**
 * Fitness — eigener Spez-Editor-Einstieg (alle Seiten × alle Stile über `FITNESS_MODULAR_SPEC_CFG`).
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { FITNESS_MODULAR_SPEC_CFG } from './modular-branch-spec-config';

export { hasFitnessModularPage, hasAnyFitnessModular } from '@/lib/modular-fitness';

type SharedProps = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
};

export function ModularFitnessPageEditor({ data, setData, tpl, style, page }: SharedProps & { page: ModularSpecPageKey }) {
  return <ModularSpecPageEditor data={data} setData={setData} tpl={tpl} style={style} page={page} cfg={FITNESS_MODULAR_SPEC_CFG} />;
}

export function ModularFitnessActivationPanel(props: SharedProps) {
  return <ModularSpecActivationPanel {...props} cfg={FITNESS_MODULAR_SPEC_CFG} />;
}
