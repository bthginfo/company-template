import type { SiteContent, TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import type { ModularUploadFn } from './modular-section-field-kit';

export type ModularSpecPageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

export type ModularSectionDataFormProps = {
  tpl: TemplateKey;
  sectionType: string;
  data: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  style: TemplateStyle;
  uploadImage?: ModularUploadFn;
  /** Which modular bundle page this form is shown on — drives contextual hints (e.g. menu). */
  modularPage?: ModularSpecPageKey;
  /** Full site content — used for subpage-only controls (e.g. Hinweis-Banner visibility). */
  siteContent?: SiteContent;
  /** Patch top-level `SiteContent` (e.g. `sectionVisibility`). */
  onPatchSiteContent?: (patch: Partial<SiteContent>) => void;
};
