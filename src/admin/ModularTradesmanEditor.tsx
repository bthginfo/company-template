/**
 * Handwerk — eigener Spez-Editor-Einstieg (alle Seiten × alle Stile über `TRADESMAN_MODULAR_SPEC_CFG`).
 */

import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { TRADESMAN_MODULAR_SPEC_CFG } from './modular-branch-spec-config';
import type { ModularUploadFn } from './modular-section-field-kit';

export { hasTradesmanModularPage, hasAnyTradesmanModular } from '@/lib/modular-tradesman';

type SharedProps = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  uploadImage?: ModularUploadFn;
};

export function ModularTradesmanPageEditor({
  data,
  setData,
  tpl,
  style,
  page,
  uploadImage,
}: SharedProps & { page: ModularSpecPageKey }) {
  return (
    <ModularSpecPageEditor
      data={data}
      setData={setData}
      tpl={tpl}
      style={style}
      page={page}
      cfg={TRADESMAN_MODULAR_SPEC_CFG}
      uploadImage={uploadImage}
    />
  );
}

export function ModularTradesmanActivationPanel(props: SharedProps) {
  return <ModularSpecActivationPanel {...props} cfg={TRADESMAN_MODULAR_SPEC_CFG} />;
}
