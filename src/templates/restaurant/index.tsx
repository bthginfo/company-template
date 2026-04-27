import type { SiteContent } from '@/lib/types';
import TemplateApp from '../_shared/TemplateApp';

export default function RestaurantTemplate({ content, basePath }: { content: SiteContent; basePath?: string }) {
  return <TemplateApp variant="restaurant" content={content} basePath={basePath} />;
}
