/**
 * Shared item mappers for spec-modular sections → legacy `SiteContent` catalog rows.
 */

import type { SiteContent } from '@/lib/types';
import { bool, imgUrl, str } from '@/lib/modular-restaurant';

export function combinePrice(it: Record<string, unknown>): string {
  const priceBase = str(it.price);
  const suf = str(it.priceSuffix);
  if (priceBase && suf) {
    return suf.startsWith('/') || suf.startsWith(',') ? `${priceBase}${suf.startsWith('/') ? '' : ' '}${suf}` : `${priceBase} ${suf}`;
  }
  return priceBase || suf;
}

export function mapModularItemToTour(it: Record<string, unknown>): NonNullable<SiteContent['tours']>[number] {
  const tags = str(it.tags);
  const languages = tags
    ? tags
        .split(/[,;|]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  return {
    name: str(it.title) || str(it.name),
    description: str(it.description),
    duration: str(it.duration) || str(it.subtitle),
    level: str(it.difficulty),
    groupSize: str(it.groupSize),
    price: combinePrice(it),
    imageUrl: imgUrl(it.image),
    languages,
    detailSlug: str((it as { detailSlug?: unknown }).detailSlug),
    detailPublished: bool((it as { detailPublished?: unknown }).detailPublished, true),
    detailSubtitle: str((it as { detailSubtitle?: unknown }).detailSubtitle),
    detailBody: str((it as { detailBody?: unknown }).detailBody),
    detailBodyHtml: str((it as { detailBodyHtml?: unknown }).detailBodyHtml),
    detailGallery: Array.isArray((it as { detailGallery?: unknown }).detailGallery)
      ? ((it as { detailGallery: unknown[] }).detailGallery as string[]).filter((u): u is string => typeof u === 'string')
      : [],
  };
}

export function mapModularItemToTreatment(it: Record<string, unknown>): NonNullable<SiteContent['treatments']>[number] {
  return {
    name: str(it.title) || str(it.name),
    description: str(it.description),
    duration: str(it.duration) || str(it.subtitle),
    price: combinePrice(it),
    category: str(it.tags),
    imageUrl: imgUrl(it.image),
    detailSlug: str((it as { detailSlug?: unknown }).detailSlug),
    detailPublished: bool((it as { detailPublished?: unknown }).detailPublished, true),
    detailSubtitle: str((it as { detailSubtitle?: unknown }).detailSubtitle),
    detailBody: str((it as { detailBody?: unknown }).detailBody),
    detailBodyHtml: str((it as { detailBodyHtml?: unknown }).detailBodyHtml),
    detailGallery: Array.isArray((it as { detailGallery?: unknown }).detailGallery)
      ? ((it as { detailGallery: unknown[] }).detailGallery as string[]).filter((u): u is string => typeof u === 'string')
      : [],
  };
}

export function mapModularItemToService(it: Record<string, unknown>): SiteContent['services'][number] {
  const btn = it.button as Record<string, unknown> | undefined;
  return {
    title: str(it.title) || str(it.name),
    description: str(it.description),
    price: combinePrice(it),
    imageUrl: imgUrl(it.image),
    learnMoreLabel: str(btn?.label),
    learnMoreHref: str(btn?.internalPage) || str(btn?.externalUrl),
    detailSlug: str((it as { detailSlug?: unknown }).detailSlug),
    detailPublished: bool((it as { detailPublished?: unknown }).detailPublished, true),
    detailSubtitle: str((it as { detailSubtitle?: unknown }).detailSubtitle),
    detailBody: str((it as { detailBody?: unknown }).detailBody),
    detailBodyHtml: str((it as { detailBodyHtml?: unknown }).detailBodyHtml),
    detailGallery: Array.isArray((it as { detailGallery?: unknown }).detailGallery)
      ? ((it as { detailGallery: unknown[] }).detailGallery as string[]).filter((u): u is string => typeof u === 'string')
      : [],
  };
}

export function mapModularItemToCourse(it: Record<string, unknown>): NonNullable<SiteContent['courses']>[number] {
  const intensity = str(it.intensity);
  const desc = str(it.description);
  return {
    name: str(it.title) || str(it.name),
    description: intensity ? (desc ? `${desc} (${intensity})` : intensity) : desc,
    schedule: str(it.days) || str(it.format),
    level: str(it.level),
    duration: str(it.duration),
    trainer: str(it.trainer),
    price: combinePrice(it),
    imageUrl: imgUrl(it.image),
    detailSlug: str((it as { detailSlug?: unknown }).detailSlug),
    detailPublished: bool((it as { detailPublished?: unknown }).detailPublished, true),
    detailSubtitle: str((it as { detailSubtitle?: unknown }).detailSubtitle),
    detailBody: str((it as { detailBody?: unknown }).detailBody),
    detailBodyHtml: str((it as { detailBodyHtml?: unknown }).detailBodyHtml),
    detailGallery: Array.isArray((it as { detailGallery?: unknown }).detailGallery)
      ? ((it as { detailGallery: unknown[] }).detailGallery as string[]).filter((u): u is string => typeof u === 'string')
      : [],
  };
}

export function mapModularItemToPackage(it: Record<string, unknown>): NonNullable<SiteContent['packages']>[number] {
  const featsRaw = it.features;
  const features = Array.isArray(featsRaw)
    ? featsRaw
        .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
        .map((x) => str(x.text))
        .filter(Boolean)
    : [];
  const btn = it.button as Record<string, unknown> | undefined;
  return {
    name: str(it.title),
    price: str(it.price),
    period: str(it.priceSuffix),
    description: str(it.description),
    features,
    highlight: bool(it.isHighlighted, false),
    ctaLabel: str(btn?.label),
    ctaHref: str(btn?.internalPage) || str(btn?.externalUrl),
    imageUrl: imgUrl(it.image),
    detailSlug: str((it as { detailSlug?: unknown }).detailSlug),
    detailPublished: bool((it as { detailPublished?: unknown }).detailPublished, true),
    detailSubtitle: str((it as { detailSubtitle?: unknown }).detailSubtitle),
    detailBody: str((it as { detailBody?: unknown }).detailBody),
    detailBodyHtml: str((it as { detailBodyHtml?: unknown }).detailBodyHtml),
    detailGallery: Array.isArray((it as { detailGallery?: unknown }).detailGallery)
      ? ((it as { detailGallery: unknown[] }).detailGallery as string[]).filter((u): u is string => typeof u === 'string')
      : [],
  };
}

export function mapModularTeamToLegacy(it: Record<string, unknown>): { n: string; r: string; img: string; bio: string } {
  return {
    n: str(it.name),
    r: str(it.role),
    img: imgUrl(it.image),
    bio: str(it.description),
  };
}

export function mapModularDoctor(it: Record<string, unknown>): NonNullable<SiteContent['doctors']>[number] {
  return {
    name: str(it.name),
    role: str(it.role),
    specialty: str(it.specialties) || str(it.specialty),
    imageUrl: imgUrl(it.image),
    bio: str(it.description),
    detailSlug: str((it as { detailSlug?: unknown }).detailSlug),
    detailPublished: bool((it as { detailPublished?: unknown }).detailPublished, true),
    detailSubtitle: str((it as { detailSubtitle?: unknown }).detailSubtitle),
    detailBody: str((it as { detailBody?: unknown }).detailBody),
    detailBodyHtml: str((it as { detailBodyHtml?: unknown }).detailBodyHtml),
    detailGallery: Array.isArray((it as { detailGallery?: unknown }).detailGallery)
      ? ((it as { detailGallery: unknown[] }).detailGallery as string[]).filter((u): u is string => typeof u === 'string')
      : [],
  };
}
