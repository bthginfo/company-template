import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';

const TEMPLATE_DE: Record<TemplateKey, string> = {
  restaurant: 'Restaurant',
  salon: 'Salon',
  tradesman: 'Handwerk',
  hotel: 'Hotel',
  tourism: 'Tourismus',
  consulting: 'Beratung',
  medical: 'Praxis',
  fitness: 'Studio',
  wedding: 'Hochzeit',
};

const STYLE_DE: Record<TemplateStyle, string> = {
  classic: 'Klassisch',
  modern: 'Modern',
  bold: 'Bold',
};

/** Line shown above page editors: branch + visual style (not global pages). */
export function formatBranchStyleLine(tpl: TemplateKey, style: TemplateStyle | undefined): string {
  const s = style ?? 'classic';
  return `${TEMPLATE_DE[tpl]} · ${STYLE_DE[s]}`;
}
