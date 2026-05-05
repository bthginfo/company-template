/**
 * Praxis — eigener Spez-Editor-Einstieg (alle Seiten × alle Stile über `MEDICAL_MODULAR_SPEC_CFG`).
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { ModularV2PageEditor, shouldUseCmsV2Editor } from './ModularV2PageEditor';
import { MEDICAL_MODULAR_SPEC_CFG } from './modular-branch-spec-config';
import type { ModularUploadFn } from './modular-section-field-kit';

export { hasMedicalModularPage, hasAnyMedicalModular } from '@/lib/modular-medical';

type SharedProps = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  uploadImage?: ModularUploadFn;
};

export function ModularMedicalPageEditor({
  data,
  setData,
  tpl,
  style,
  page,
  uploadImage,
}: SharedProps & { page: ModularSpecPageKey }) {
  if (shouldUseCmsV2Editor(data)) {
    return <ModularV2PageEditor data={data} setData={setData} tpl={tpl} style={style} page={page} sectionLabels={MEDICAL_MODULAR_SPEC_CFG.sectionLabels} uploadImage={uploadImage} />;
  }
  return (
    <ModularSpecPageEditor
      data={data}
      setData={setData}
      tpl={tpl}
      style={style}
      page={page}
      cfg={MEDICAL_MODULAR_SPEC_CFG}
      uploadImage={uploadImage}
    />
  );
}

export function ModularMedicalActivationPanel(props: SharedProps) {
  return <ModularSpecActivationPanel {...props} cfg={MEDICAL_MODULAR_SPEC_CFG} />;
}
