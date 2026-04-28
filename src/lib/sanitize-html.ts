/**
 * Minimal HTML sanitiser for user-authored blog content.
 *
 * We allow a small set of formatting tags and attributes typical for
 * rich-text-edited posts. Everything else is stripped. Designed to be
 * zero-dependency and run safely in both the browser and Node/SSR.
 */

const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
  'h1', 'h2', 'h3', 'h4',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'a', 'span', 'div',
  'img', 'figure', 'figcaption',
  'hr',
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'title', 'rel', 'target']),
  img: new Set(['src', 'alt', 'title', 'width', 'height']),
  // Most other tags get no attributes.
};

const URL_ATTRS = new Set(['href', 'src']);

function isSafeUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  if (!trimmed) return false;
  if (trimmed.startsWith('javascript:')) return false;
  if (trimmed.startsWith('data:') && !trimmed.startsWith('data:image/')) return false;
  return true;
}

/** Sanitise HTML in the browser using DOMParser. */
function sanitizeBrowser(html: string): string {
  const doc = new DOMParser().parseFromString(`<!doctype html><body>${html}`, 'text/html');
  walk(doc.body);
  return doc.body.innerHTML;
}

function walk(node: Element) {
  const children = Array.from(node.children);
  for (const child of children) {
    const tag = child.tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) {
      // Replace disallowed tag with its text content.
      const text = document.createTextNode(child.textContent || '');
      child.replaceWith(text);
      continue;
    }
    // Strip all attributes not in the allow-list for this tag.
    const allowed = ALLOWED_ATTRS[tag] ?? new Set<string>();
    for (const attr of Array.from(child.attributes)) {
      if (!allowed.has(attr.name)) {
        child.removeAttribute(attr.name);
        continue;
      }
      if (URL_ATTRS.has(attr.name) && !isSafeUrl(attr.value)) {
        child.removeAttribute(attr.name);
        continue;
      }
    }
    // Force external links to open safely.
    if (tag === 'a' && child.getAttribute('target') === '_blank') {
      child.setAttribute('rel', 'noopener noreferrer');
    }
    walk(child);
  }
}

/** Naive regex-based stripper used during SSR / pre-render where DOM isn't available. */
function sanitizeServer(html: string): string {
  // Remove script/style blocks entirely.
  let out = html.replace(/<\s*(script|style)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, '');
  // Remove inline event handlers and javascript: URLs.
  out = out.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  out = out.replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1=$2#$2');
  return out;
}

export function sanitizeHtml(html: string): string {
  if (!html) return '';
  if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
    return sanitizeBrowser(html);
  }
  return sanitizeServer(html);
}
