import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import {
  hasAnyHotelModular,
  hasHotelModularPage,
} from '@/lib/modular-hotel';
import type { ModularUploadFn } from './modular-section-field-kit';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { HOTEL_MODULAR_SPEC_CFG } from './modular-branch-spec-config';

type Props = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  uploadImage?: ModularUploadFn;
};

export function ModularHotelPageEditor(props: Props & { page: ModularSpecPageKey }) {
  return <ModularSpecPageEditor {...props} cfg={HOTEL_MODULAR_SPEC_CFG} />;
}

export function ModularHotelActivationPanel(props: Props) {
  return <ModularSpecActivationPanel {...props} cfg={HOTEL_MODULAR_SPEC_CFG} />;
}

export { hasHotelModularPage, hasAnyHotelModular };
