import type { SiteContent } from '@/lib/types';
import TemplateApp from '../_shared/TemplateApp';

export default function SalonTemplate({ content, basePath }: { content: SiteContent; basePath?: string }) {
  return <TemplateApp variant="salon" content={content} basePath={basePath} />;
}
