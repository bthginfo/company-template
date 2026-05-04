import { Link, Navigate, useParams } from 'react-router-dom';
import type { SiteContent, TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';
import { getBranchConfig } from '@/lib/branch-config';
import { sanitizeHtml } from '@/lib/sanitize-html';
import Seo from '@/components/Seo';
import { MasonryLightbox } from '@/components/MasonryLightbox';
import { useBasePath, withBase } from '@/components/site-blocks';
import { findCatalogDetailBySlug } from '@/components/catalog-detail-lookup';

export function CatalogItemDetailPage({
  content,
  template,
  style: _style,
}: {
  content: SiteContent;
  template: TemplateKey;
  style: TemplateStyle;
}) {
  const { catalogSlug } = useParams<{ catalogSlug: string }>();
  const basePath = useBasePath();
  const resolved = catalogSlug
    ? findCatalogDetailBySlug(template, content, catalogSlug)
    : null;

  const servicesPath = getBranchConfig(template).paths.services;
  const listPath = withBase(basePath, servicesPath);

  if (!resolved) {
    return <Navigate to={listPath} replace />;
  }

  const html = resolved.detailBodyHtml ? sanitizeHtml(resolved.detailBodyHtml) : '';
  const paragraphs = !html ? (resolved.detailBody || '').split(/\n\s*\n/).filter(Boolean) : [];
  const gallery = resolved.detailGallery.filter((u) => u && u.trim());
  const hero = resolved.imageUrl || gallery[0];

  return (
    <article className="pt-32 md:pt-40 pb-24">
      <Seo
        title={resolved.title}
        description={resolved.subtitle || resolved.detailBody.slice(0, 160)}
        image={hero}
        content={content}
        template={template}
      />
      <div className="container-x max-w-3xl">
        <Link to={listPath} className="text-sm text-muted hover:text-black">
          ← Zurück zur Übersicht
        </Link>
        <h1 className="font-display text-4xl md:text-6xl mt-8 leading-tight">{resolved.title}</h1>
        {resolved.subtitle ? (
          <p className="mt-4 text-xl text-muted leading-relaxed">{resolved.subtitle}</p>
        ) : null}
        {hero ? (
          <div className="aspect-[16/9] overflow-hidden rounded-3xl mt-10">
            <img src={hero} alt="" className="w-full h-full object-cover" />
          </div>
        ) : null}
        {html ? (
          <div className="news-body mt-8 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div className="mt-8 space-y-5 text-lg leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
      {gallery.length > 1 ? (
        <div className="container-x mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-6">Galerie</p>
          <MasonryLightbox images={gallery} />
        </div>
      ) : null}
    </article>
  );
}
