/**
 * Beratung — eigener Spez-Editor-Einstieg (alle Seiten × alle Stile über `CONSULTING_MODULAR_SPEC_CFG`).
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { ModularV2PageEditor, shouldUseCmsV2Editor } from './ModularV2PageEditor';
import { CONSULTING_MODULAR_SPEC_CFG } from './modular-branch-spec-config';
import type { ModularUploadFn } from './modular-section-field-kit';

export { hasConsultingModularPage, hasAnyConsultingModular } from '@/lib/modular-consulting';

type SharedProps = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  uploadImage?: ModularUploadFn;
};

export function ModularConsultingPageEditor({
  data,
  setData,
  tpl,
  style,
  page,
  uploadImage,
}: SharedProps & { page: ModularSpecPageKey }) {
  if (shouldUseCmsV2Editor(data)) {
    return <ModularV2PageEditor data={data} setData={setData} tpl={tpl} style={style} page={page} sectionLabels={CONSULTING_MODULAR_SPEC_CFG.sectionLabels} uploadImage={uploadImage} />;
  }
  return (
    <ModularSpecPageEditor
      data={data}
      setData={setData}
      tpl={tpl}
      style={style}
      page={page}
      cfg={CONSULTING_MODULAR_SPEC_CFG}
      uploadImage={uploadImage}
    />
  );
}

export function ModularConsultingActivationPanel(props: SharedProps) {
  return <ModularSpecActivationPanel {...props} cfg={CONSULTING_MODULAR_SPEC_CFG} />;
}
