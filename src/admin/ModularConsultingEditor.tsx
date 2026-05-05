/**
 * Beratung — eigener Spez-Editor-Einstieg (alle Seiten × alle Stile über `CONSULTING_MODULAR_SPEC_CFG`).
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { CONSULTING_MODULAR_SPEC_CFG } from './modular-branch-spec-config';

export { hasConsultingModularPage, hasAnyConsultingModular } from '@/lib/modular-consulting';

type SharedProps = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
};

export function ModularConsultingPageEditor({ data, setData, tpl, style, page }: SharedProps & { page: ModularSpecPageKey }) {
  return <ModularSpecPageEditor data={data} setData={setData} tpl={tpl} style={style} page={page} cfg={CONSULTING_MODULAR_SPEC_CFG} />;
}

export function ModularConsultingActivationPanel(props: SharedProps) {
  return <ModularSpecActivationPanel {...props} cfg={CONSULTING_MODULAR_SPEC_CFG} />;
}
