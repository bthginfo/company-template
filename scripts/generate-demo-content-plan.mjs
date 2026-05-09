import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const inputPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : fs.existsSync(path.join(repoRoot, 'content-file.md'))
    ? path.join(repoRoot, 'content-file.md')
    : path.join(process.env.USERPROFILE ?? '', 'Downloads', 'content-file.md');
const outputPath = path.join(repoRoot, 'src', 'lib', 'demo-content-plan.generated.ts');

const md = fs.readFileSync(inputPath, 'utf8');

const imagePools = {
  restaurant: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
  ],
  hotel: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
  ],
  tourism: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
  ],
  salon: [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=80',
  ],
  tradesman: [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1581091215367-59ab6b8de7a9?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?auto=format&fit=crop&w=1600&q=80',
  ],
  consulting: [
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
  ],
  medical: [
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1517963628607-235ccdd5476c?auto=format&fit=crop&w=1600&q=80',
  ],
  wedding: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80',
  ],
};

const videoUrl = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ';

function parseScalar(raw) {
  const value = raw.trim();
  if (value === '') return '';
  if (value === 'True') return true;
  if (value === 'False') return false;
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function preprocessYaml(yaml) {
  return yaml
    .replace(/\t/g, '  ')
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);
}

function countIndent(line) {
  return line.match(/^ */)[0].length;
}

function parseBlock(lines, start, indent) {
  let isArray = false;
  let idx = start;
  while (idx < lines.length) {
    const line = lines[idx];
    if (countIndent(line) < indent) break;
    if (countIndent(line) === indent) {
      isArray = line.trim().startsWith('-');
      break;
    }
    idx += 1;
  }
  return isArray ? parseArray(lines, start, indent) : parseObject(lines, start, indent);
}

function parseObject(lines, start, indent) {
  const obj = {};
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    const currentIndent = countIndent(line);
    if (currentIndent < indent) break;
    if (currentIndent > indent) { i += 1; continue; }
    const trimmed = line.trim();
    if (trimmed.startsWith('-')) break;
    const colon = trimmed.indexOf(':');
    if (colon === -1) { i += 1; continue; }
    const key = trimmed.slice(0, colon).trim();
    const rest = trimmed.slice(colon + 1).trim();
    if (rest) {
      obj[key] = parseScalar(rest);
      i += 1;
    } else {
      const parsed = parseBlock(lines, i + 1, indent + 2);
      obj[key] = parsed.value;
      i = parsed.next;
    }
  }
  return { value: obj, next: i };
}

function parseArray(lines, start, indent) {
  const arr = [];
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    const currentIndent = countIndent(line);
    if (currentIndent < indent) break;
    if (currentIndent > indent) { i += 1; continue; }
    const trimmed = line.trim();
    if (!trimmed.startsWith('-')) break;
    const rest = trimmed.slice(1).trim();
    if (!rest) {
      const parsed = parseBlock(lines, i + 1, indent + 2);
      arr.push(parsed.value);
      i = parsed.next;
    } else if (rest.includes(':') && !rest.startsWith('"') && !rest.startsWith("'")) {
      const [key, ...parts] = rest.split(':');
      const item = { [key.trim()]: parseScalar(parts.join(':').trim()) };
      const parsed = parseObject(lines, i + 1, indent + 2);
      arr.push({ ...item, ...parsed.value });
      i = parsed.next;
    } else {
      arr.push(parseScalar(rest));
      i += 1;
    }
  }
  return { value: arr, next: i };
}

function parseYaml(yaml) {
  return parseObject(preprocessYaml(yaml), 0, 0).value;
}

function isInstruction(value) {
  return typeof value === 'string' && value.trim().startsWith('ANWEISUNG:');
}

function pickImage(template, counter) {
  const pool = imagePools[template] ?? imagePools.consulting;
  const index = counter.value % pool.length;
  counter.value += 1;
  return pool[index];
}

function normalizeValue(value, context, key = '') {
  if (Array.isArray(value)) {
    return value.map((item) => {
      const normalized = normalizeValue(item, context, key);
      if (key === 'items' && typeof normalized === 'string') return { title: normalized, description: '' };
      return normalized;
    });
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      out[childKey] = normalizeValue(childValue, context, childKey);
    }
    if (typeof out.text === 'string' && !out.description) out.description = out.text;
    if (typeof out.label === 'string' && out.value && !out.description) out.description = out.label;
    if (typeof out.quote === 'string' && !out.text) out.text = out.quote;
    if (typeof out.name === 'string' && !out.author) out.author = out.name;
    return out;
  }
  if (isInstruction(value)) {
    if (key === 'videoUrl') return videoUrl;
    if (key === 'image' || key === 'backgroundImage' || key === 'featuredImage' || key === 'imageUrl' || key === 'img') {
      return { image: pickImage(context.template, context.imageCounter), alt: context.brandName };
    }
    if (key === 'images' || key === 'gallery' || key === 'detailGallery') return pickImage(context.template, context.imageCounter);
    return '';
  }
  if (key === 'href' && value === '#kontakt') return '/kontakt';
  if (key === 'href' && value === '#leistungen') return '/leistungen';
  return value;
}

const headingRe = /^# ([a-z]+) \/ (classic|modern|bold) — (.+)$/;
const pageRe = /^## .+\(`(home|services|gallery|about|contact)`\)/;
const sectionRe = /^### \d+\. `([^`]+)`/;
const lines = md.split(/\r?\n/);
const plan = {};
let current = null;
let currentPage = null;

for (let i = 0; i < lines.length; i += 1) {
  const heading = lines[i].match(headingRe);
  if (heading) {
    const [, template, style, brandName] = heading;
    plan[template] ??= {};
    plan[template][style] = { brandName: brandName.trim(), pages: {} };
    current = { template, style, brandName: brandName.trim(), imageCounter: { value: 0 } };
    currentPage = null;
    continue;
  }
  const page = lines[i].match(pageRe);
  if (page && current) {
    currentPage = page[1];
    plan[current.template][current.style].pages[currentPage] = [];
    continue;
  }
  const section = lines[i].match(sectionRe);
  if (section && current && currentPage) {
    const type = section[1];
    let cursor = i + 1;
    while (cursor < lines.length && lines[cursor].trim() !== '```yaml') cursor += 1;
    if (cursor >= lines.length) continue;
    const yamlStart = cursor + 1;
    cursor = yamlStart;
    while (cursor < lines.length && lines[cursor].trim() !== '```') cursor += 1;
    const yaml = lines.slice(yamlStart, cursor).join('\n');
    const data = normalizeValue(parseYaml(yaml), current);
    plan[current.template][current.style].pages[currentPage].push({ type, data });
    i = cursor;
  }
}

const header = `import type { CmsPageKey } from './cms-contract';\nimport type { TemplateKey } from './types';\nimport type { TemplateStyle } from './branch-config';\n\nexport type DemoContentPlanSection = {\n  type: string;\n  data: Record<string, unknown>;\n};\n\nexport type DemoContentPlanEntry = {\n  brandName: string;\n  pages: Partial<Record<CmsPageKey, readonly DemoContentPlanSection[]>>;\n};\n\nexport const DEMO_CONTENT_PLAN = `;
const footer = ` as const satisfies Partial<Record<TemplateKey, Partial<Record<TemplateStyle, DemoContentPlanEntry>>>>;\n`;
fs.writeFileSync(outputPath, `${header}${JSON.stringify(plan, null, 2)}${footer}`, 'utf8');
console.log(`Generated ${outputPath}`);
console.log(`Combos: ${Object.values(plan).reduce((sum, styles) => sum + Object.keys(styles).length, 0)}`);
