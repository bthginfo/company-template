import type { SiteContent } from '@/lib/types';
import TemplateApp, { type TemplateStyle } from '../_shared/TemplateApp';

export default function RestaurantTemplate({ content, basePath, style }: { content: SiteContent; basePath?: string; style?: TemplateStyle }) {
  return <TemplateApp variant="restaurant" content={content} basePath={basePath} style={style} />;
}
