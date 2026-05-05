/**
 * Fitness — eigener Spez-Editor-Einstieg (alle Seiten × alle Stile über `FITNESS_MODULAR_SPEC_CFG`).
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { ModularV2PageEditor, shouldUseCmsV2Editor } from './ModularV2PageEditor';
import { FITNESS_MODULAR_SPEC_CFG } from './modular-branch-spec-config';
import type { ModularUploadFn } from './modular-section-field-kit';

export { hasFitnessModularPage, hasAnyFitnessModular } from '@/lib/modular-fitness';

type SharedProps = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  uploadImage?: ModularUploadFn;
};

export function ModularFitnessPageEditor({
  data,
  setData,
  tpl,
  style,
  page,
  uploadImage,
}: SharedProps & { page: ModularSpecPageKey }) {
  if (shouldUseCmsV2Editor()) {
    return <ModularV2PageEditor data={data} setData={setData} tpl={tpl} style={style} page={page} sectionLabels={FITNESS_MODULAR_SPEC_CFG.sectionLabels} uploadImage={uploadImage} />;
  }
  return (
    <ModularSpecPageEditor
      data={data}
      setData={setData}
      tpl={tpl}
      style={style}
      page={page}
      cfg={FITNESS_MODULAR_SPEC_CFG}
      uploadImage={uploadImage}
    />
  );
}

export function ModularFitnessActivationPanel(props: SharedProps) {
  return <ModularSpecActivationPanel {...props} cfg={FITNESS_MODULAR_SPEC_CFG} />;
}
