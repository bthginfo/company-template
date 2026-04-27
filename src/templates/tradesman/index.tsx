import type { SiteContent } from '@/lib/types';
import TemplateApp from '../_shared/TemplateApp';

export default function TradesmanTemplate({ content, basePath }: { content: SiteContent; basePath?: string }) {
  return <TemplateApp variant="tradesman" content={content} basePath={basePath} />;
}
