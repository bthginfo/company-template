/* eslint-disable no-console */
/**
 * One-off surface audit: list top-level props accessed as `(content as any).foo`
 * under `src/templates` and `src/components`. Not an AST proof — complements
 * `npm run check:drift` (no new dependencies).
 *
 * Run: `npx tsx scripts/surface-audit-content-as-any.ts`
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIRS = ['src/templates', 'src/components'];
const PROP_RE = /\(content as any\)\.([a-zA-Z0-9_]+)/g;
const OPT_CHAIN_RE = /\(content as any\)\?\.\s*([a-zA-Z0-9_]+)/g;

function walkTsFiles(dir: string, out: string[]) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkTsFiles(p, out);
    else if (/\.tsx?$/.test(name) && !name.endsWith('.d.ts')) out.push(p);
  }
}

const files: string[] = [];
for (const rel of DIRS) walkTsFiles(join(ROOT, rel), files);

const props = new Set<string>();
for (const f of files) {
  const s = readFileSync(f, 'utf8');
  let m: RegExpExecArray | null;
  const re = new RegExp(PROP_RE.source, 'g');
  while ((m = re.exec(s))) props.add(m[1]);
  const re2 = new RegExp(OPT_CHAIN_RE.source, 'g');
  while ((m = re2.exec(s))) props.add(m[1]);
}

console.log(`Scanned ${files.length} files under ${DIRS.join(', ')}.\n`);
console.log('Top-level keys from (content as any).… accesses:\n');
for (const k of [...props].sort()) console.log(`  - ${k}`);
