import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import {
  hasAnyRestaurantModular,
  hasRestaurantModularPage,
} from '@/lib/modular-restaurant';
import type { ModularUploadFn } from './modular-section-field-kit';
import { ModularSpecActivationPanel, ModularSpecPageEditor, type ModularSpecPageKey } from './ModularSpecPageEditor';
import { ModularV2PageEditor, shouldUseCmsV2Editor } from './ModularV2PageEditor';
import { RESTAURANT_MODULAR_SPEC_CFG } from './modular-branch-spec-config';

type Props = {
  data: SiteContent;
  setData: (d: SiteContent) => void;
  tpl: TemplateKey;
  style: TemplateStyle;
  uploadImage?: ModularUploadFn;
};

export function ModularRestaurantPageEditor(props: Props & { page: ModularSpecPageKey }) {
  if (shouldUseCmsV2Editor(props.data)) {
    return <ModularV2PageEditor {...props} sectionLabels={RESTAURANT_MODULAR_SPEC_CFG.sectionLabels} />;
  }
  return <ModularSpecPageEditor {...props} cfg={RESTAURANT_MODULAR_SPEC_CFG} />;
}

/** Prefer ModularRestaurantPageEditor with page set to home. */
export function ModularHomeEditor(props: Props) {
  return <ModularRestaurantPageEditor {...props} page="home" />;
}

export function ModularRestaurantActivationPanel(props: Props) {
  return <ModularSpecActivationPanel {...props} cfg={RESTAURANT_MODULAR_SPEC_CFG} />;
}

/** @deprecated Use ModularRestaurantActivationPanel */
export function ModularHomeActivationPanel(props: Props) {
  return <ModularRestaurantActivationPanel {...props} />;
}

export { hasRestaurantModularPage, hasAnyRestaurantModular };
