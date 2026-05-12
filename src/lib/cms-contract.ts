/** CMS page identifiers */
export const CMS_PAGE_KEYS = ['home', 'about', 'services', 'gallery', 'contact', 'menu', 'team', 'blog'] as const;
export type CmsPageKey = (typeof CMS_PAGE_KEYS)[number];

/** Get section types available for a template */
export function getCmsSectionTypes(_templateKey: string, _style?: string, _page?: string): string[] {
  return [];
}

/** Get field keys for a given section type */
export function getCmsSectionFieldKeys(_sectionType: string): string[] {
  return [];
}
