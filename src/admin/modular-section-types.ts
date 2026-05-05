import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import type { ModularUploadFn } from './modular-section-field-kit';

export type ModularSectionDataFormProps = {
  tpl: TemplateKey;
  sectionType: string;
  data: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  style: TemplateStyle;
  uploadImage?: ModularUploadFn;
};
