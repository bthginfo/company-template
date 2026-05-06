/**
 * CLI wrapper for tenant provisioning. Delegates the heavy lifting to
 * `src/lib/provision-core.ts` (shared with the CRM API endpoint), and
 * adds CLI-only concerns: arg parsing, console output, optional content
 * import, and writing tenant credentials to `.tenant-credentials.txt`.
 *
 * Usage:
 *   npm run tenant:provision -- <slug> "<Display Name>" <template> [style] [--reseed]
 */
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import { appendFileSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  provisionTenant,
  validateSlug,
  VALID_TEMPLATES,
  VALID_STYLES,
  type AnyTemplate,
  type AnyStyle,
} from '../src/lib/provision-core.js';
import { PRESETS } from '../src/lib/theme.js';

const RAW_ARGS = process.argv.slice(2);
const VALUE_FLAGS = ['--auth-secret', '--admin-hash', '--preset', '--password', '--content'];

const takeFlagValue = (flag: string): string | undefined => {
  const i = RAW_ARGS.indexOf(flag);
  if (i === -1) return undefined;
  const v = RAW_ARGS[i + 1];
  if (!v || v.startsWith('--')) return undefined;
  return v;
};

const RESEED = RAW_ARGS.includes('--reseed');
const AUTH_SECRET_OVERRIDE = takeFlagValue('--auth-secret');
const ADMIN_HASH_OVERRIDE = takeFlagValue('--admin-hash');
const PRESET_OVERRIDE = takeFlagValue('--preset');
const PASSWORD_OVERRIDE = takeFlagValue('--password');
const CONTENT_FILE = takeFlagValue('--content');

const FILTERED = RAW_ARGS.filter((a, i) => {
  if (a === '--reseed') return false;
  if (VALUE_FLAGS.includes(a)) return false;
  const prev = RAW_ARGS[i - 1];
  if (prev && VALUE_FLAGS.includes(prev)) return false;
  return true;
});

const [slug, name, template, styleArg] = FILTERED;

const HELP = `
Usage:
  npm run tenant:provision -- <slug> "<Display Name>" <${VALID_TEMPLATES.join('|')}> [${VALID_STYLES.join('|')}] [--preset <id>] [--password <pw>] [--content <file.json>] [--reseed] [--auth-secret <value>] [--admin-hash <bcrypt>]

Examples:
  npm run tenant:provision -- bella-roma "Trattoria Bella Roma" restaurant modern --preset espresso
  npm run tenant:provision -- praxis-lindner "Praxis Dr. Lindner" medical classic --password MySecure123
  npm run tenant:provision -- bella-roma "Bella Roma" restaurant modern --content content.json

Required env in .env.local:
  VERCEL_TOKEN, VERCEL_TEAM_ID, POSTGRES_URL, BLOB_READ_WRITE_TOKEN,
  AUTH_SECRET, ADMIN_PASSWORD_HASH

If AUTH_SECRET / ADMIN_PASSWORD_HASH in .env.local are encrypted blobs, pass plaintext explicitly via --auth-secret / --admin-hash.
`;

if (slug === '--help' || slug === '-h') {
  console.log(HELP);
  process.exit(0);
}
if (!slug || !name || !template || !VALID_TEMPLATES.includes(template as AnyTemplate)) {
  console.error(HELP);
  process.exit(1);
}

const slugErr = validateSlug(slug);
if (slugErr) {
  console.error(`Invalid slug: ${slugErr}`);
  process.exit(1);
}

if (styleArg && !VALID_STYLES.includes(styleArg as AnyStyle)) {
  console.error(`Invalid style "${styleArg}". Must be one of: ${VALID_STYLES.join(', ')}`);
  process.exit(1);
}
const style: AnyStyle = (styleArg as AnyStyle) || 'classic';

if (PRESET_OVERRIDE) {
  const presets = PRESETS[template as AnyTemplate] ?? [];
  if (!presets.some((p) => p.id === PRESET_OVERRIDE)) {
    const valid = presets.map((p) => p.id).join(', ');
    console.error(`Invalid preset "${PRESET_OVERRIDE}" for template "${template}". Valid: ${valid}`);
    process.exit(1);
  }
}

async function main() {
  console.log(`\nProvisioning tenant '${slug}'\n`);
  const result = await provisionTenant({
    slug,
    name,
    template: template as AnyTemplate,
    style,
    themePresetId: PRESET_OVERRIDE,
    password: PASSWORD_OVERRIDE,
    sharedEnvOverrides: {
      AUTH_SECRET: AUTH_SECRET_OVERRIDE,
      ADMIN_PASSWORD_HASH: ADMIN_HASH_OVERRIDE,
    },
    reseed: RESEED,
    waitForBuild: true,
    onLog: (line) => console.log(line),
  });

  // If a content file is provided, the tenant is not customer-ready unless
  // import succeeds. The tenant may already exist, but automation must fail.
  if (CONTENT_FILE) {
    try {
      const raw = JSON.parse(readFileSync(CONTENT_FILE, 'utf-8'));
      const { importContentJson } = await import('../src/lib/content-import.js');
      await importContentJson(slug, raw);
      console.log(`  Content imported from ${CONTENT_FILE} (CMS V2 hydrated)`);
    } catch (e: any) {
      throw new Error(`Content import failed after tenant provisioning: ${e.message}`);
    }
  }

  if (result.password) {
    const credPath = join(process.cwd(), '.tenant-credentials.txt');
    const now = new Date().toISOString();
    const block = [
      `[${now}] ${result.slug}`,
      `  Name:     ${result.name}`,
      `  Template: ${result.template} / ${result.style}`,
      `  Login:    ${result.loginUrl}`,
      `  User:     ${result.slug}`,
      `  Password: ${result.password}`,
      '',
    ].join('\n');
    appendFileSync(credPath, block + '\n', { mode: 0o600 });
    console.log(`  Credentials appended to ${credPath} (gitignored, mode 600)`);
  } else {
    console.log('  Existing tenant - password preserved, no credentials file write');
  }

  console.log('\n------------------------------------------');
  console.log(`  Tenant:        ${result.name}`);
  console.log(`  Slug:          ${result.slug}`);
  if (result.vercelProjectName !== result.slug) {
    console.log(`  Vercel project: ${result.vercelProjectName} (assigned by Vercel; use the URLs below)`);
  }
  console.log(`  Template:      ${result.template}`);
  console.log(`  Style:         ${result.style}`);
  if (PRESET_OVERRIDE) console.log(`  Preset:        ${PRESET_OVERRIDE}`);
  console.log(`  Project URL:   ${result.projectUrl}`);
  console.log(`  Login URL:     ${result.loginUrl}`);
  console.log(`  Deploy URL:    ${result.deploymentUrl}`);
  console.log(`  State:         ${result.deploymentState}`);
  if (result.password) console.log('  Password:      [written to .tenant-credentials.txt]');
  console.log('------------------------------------------');
  console.log('\nNext steps:');
  console.log('  1. Wait about 60-180s for the first deploy to finish.');
  console.log(`  2. Open the Login URL with username "${result.slug}" and the password from .tenant-credentials.txt.`);
  console.log('  3. Hand credentials to the customer via a secure channel, then delete that line.\n');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('\nFailed:', e.message || e);
    process.exit(1);
  });
