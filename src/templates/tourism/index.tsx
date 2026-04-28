import type { SiteContent } from '@/lib/types';
import TemplateApp, { type TemplateStyle } from '../_shared/TemplateApp';

export default function TourismTemplate({ content, basePath, style }: { content: SiteContent; basePath?: string; style?: TemplateStyle }) {
  return <TemplateApp variant="tourism" content={content} basePath={basePath} style={style} />;
}
