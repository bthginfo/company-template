import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Dynamic OG image endpoint.
 *
 * Renders a 1200×630 SVG branded preview card from query params:
 *   /api/og?name=Trattoria%20Sole&tagline=Italienisch%20in%20Innsbruck&color=%23b91c1c
 *
 * SVG is fetched server-side by social crawlers (WhatsApp, FB, Twitter, LinkedIn)
 * and converted to a PNG by their image proxies. Keeps us independent of
 * @vercel/og's runtime + canvas deps and works on any Node runtime.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  const name = String(req.query.name || 'Website').slice(0, 80);
  const tagline = String(req.query.tagline || '').slice(0, 120);
  const colorRaw = String(req.query.color || '#0f172a');
  const color = isHex(colorRaw) ? colorRaw : '#0f172a';
  const fg = pickFg(color);
  const accent = lighten(color, 0.25);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${color}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.7">
      <stop offset="0" stop-color="${fg}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${fg}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g font-family="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fill="${fg}">
    <text x="80" y="120" font-size="22" letter-spacing="6" opacity="0.7">${escapeXml(tagline ? 'WEBSITE' : 'WEBSITE · ' + new Date().getFullYear())}</text>
    <text x="80" y="320" font-size="${fitFontSize(name, 96, 1040)}" font-weight="700" letter-spacing="-2">${escapeXml(name)}</text>
    ${tagline ? `<text x="80" y="395" font-size="34" opacity="0.85">${escapeXml(tagline)}</text>` : ''}
    <line x1="80" y1="510" x2="200" y2="510" stroke="${fg}" stroke-width="3" opacity="0.8"/>
    <text x="80" y="555" font-size="22" opacity="0.75">flamingomedia.de</text>
  </g>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  // Cache aggressively: the params fully determine the output.
  res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=86400, stale-while-revalidate=604800');
  res.status(200).send(svg);
}

function isHex(s: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s);
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function pickFg(hex: string): string {
  const v = expandHex(hex);
  const r = parseInt(v.slice(1, 3), 16);
  const g = parseInt(v.slice(3, 5), 16);
  const b = parseInt(v.slice(5, 7), 16);
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return L > 0.5 ? '#0a0a0a' : '#ffffff';
}

function lighten(hex: string, amt: number): string {
  const v = expandHex(hex);
  const r = parseInt(v.slice(1, 3), 16);
  const g = parseInt(v.slice(3, 5), 16);
  const b = parseInt(v.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amt);
  return `#${[mix(r), mix(g), mix(b)].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

function expandHex(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length === 3) return '#' + h.split('').map((c) => c + c).join('');
  return '#' + h;
}

/** Rough auto-fit: shrink if name very long. */
function fitFontSize(text: string, base: number, maxWidth: number): number {
  // ~0.55 em average per char at 700 weight
  const approxWidth = text.length * base * 0.55;
  if (approxWidth <= maxWidth) return base;
  return Math.max(48, Math.floor(base * (maxWidth / approxWidth)));
}
