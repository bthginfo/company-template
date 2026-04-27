import type { SiteContent } from '@/lib/types';
import TemplateApp, { type TemplateStyle } from '../_shared/TemplateApp';

export default function SalonTemplate({ content, basePath, style }: { content: SiteContent; basePath?: string; style?: TemplateStyle }) {
  return <TemplateApp variant="salon" content={content} basePath={basePath} style={style} />;
}
