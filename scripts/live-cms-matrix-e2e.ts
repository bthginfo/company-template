import { chromium } from '@playwright/test';
import { config as loadEnv } from 'dotenv';
import { getCmsSectionFieldKeys, getCmsSectionTypes, CMS_PAGE_KEYS, type CmsPageKey } from '../src/lib/cms-contract.js';
import { provisionTenant, VALID_STYLES, VALID_TEMPLATES, type AnyStyle, type AnyTemplate } from '../src/lib/provision-core.js';

loadEnv();
loadEnv({ path: '.env.local', override: false });

const token = process.env.VERCEL_TOKEN;
const team = process.env.VERCEL_TEAM_ID;

if (!token) throw new Error('VERCEL_TOKEN is required');
if (!team) throw new Error('VERCEL_TEAM_ID is required');

const runId = process.env.LIVE_CMS_E2E_RUN_ID || new Date().toISOString().slice(2, 16).replace(/\D/g, '');
const password = process.env.LIVE_CMS_E2E_PASSWORD || `LiveCmsE2e!${runId}`;
const selectedTemplates = parseList(process.env.LIVE_CMS_E2E_TEMPLATES, VALID_TEMPLATES);
const selectedStyles = parseList(process.env.LIVE_CMS_E2E_STYLES, VALID_STYLES);
const selectedCombos = parseCombos(process.env.LIVE_CMS_E2E_COMBOS);
const vercelScopeSlug = process.env.VERCEL_SCOPE_SLUG || 'juliusvingelheim-2692s-projects';

type Finding = {
  page: CmsPageKey;
  sectionId?: string;
  sectionType?: string;
  message: string;
};

type ComboResult = {
  template: AnyTemplate;
  style: AnyStyle;
  slug: string;
  deploymentUrl: string;
  findings: Finding[];
  marker?: string;
};

function parseList<const T extends readonly string[]>(raw: string | undefined, allowed: T): T[number][] {
  if (!raw?.trim()) return [...allowed] as T[number][];
  const set = new Set(allowed);
  const values = raw.split(',').map((value) => value.trim()).filter(Boolean);
  for (const value of values) {
    if (!set.has(value)) throw new Error(`Invalid value "${value}". Allowed: ${allowed.join(', ')}`);
  }
  return values as T[number][];
}

function parseCombos(raw: string | undefined): Array<{ template: AnyTemplate; style: AnyStyle }> | null {
  if (!raw?.trim()) return null;
  return raw.split(',').map((item) => {
    const [templateRaw, styleRaw] = item.split(':').map((part) => part?.trim());
    if (!VALID_TEMPLATES.includes(templateRaw as AnyTemplate)) throw new Error(`Invalid template in combo "${item}"`);
    if (!VALID_STYLES.includes(styleRaw as AnyStyle)) throw new Error(`Invalid style in combo "${item}"`);
    return { template: templateRaw as AnyTemplate, style: styleRaw as AnyStyle };
  });
}

function pathValue(root: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => (
    current && typeof current === 'object' && !Array.isArray(current)
      ? (current as Record<string, unknown>)[key]
      : undefined
  ), root);
}

function hasMeaningfulValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.some(hasMeaningfulValue);
  if (typeof value === 'object') return Object.values(value as Record<string, unknown>).some(hasMeaningfulValue);
  return true;
}

async function vercel(path: string, init: RequestInit = {}): Promise<unknown> {
  const url = `https://api.vercel.com${path}${path.includes('?') ? '&' : '?'}teamId=${team}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Vercel ${response.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

async function waitForReadyDeployment(projectName: string): Promise<string> {
  const deadline = Date.now() + 10 * 60_000;
  let lastState = 'unknown';
  while (Date.now() < deadline) {
    const payload = await vercel(`/v6/deployments?projectId=${projectName}&limit=5`) as {
      deployments?: Array<{ url: string; state?: string; readyState?: string; target?: string }>;
    };
    const deployment = payload.deployments?.find((item) => item.target === 'production') ?? payload.deployments?.[0];
    lastState = deployment?.readyState || deployment?.state || lastState;
    if (deployment && (deployment.readyState === 'READY' || deployment.state === 'READY')) {
      return deployment.url;
    }
    if (lastState === 'ERROR' || lastState === 'CANCELED') {
      throw new Error(`${projectName} deployment failed: ${lastState}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }
  throw new Error(`${projectName} deployment did not become READY. Last state: ${lastState}`);
}

function deploymentUrlCandidates(host: string, projectName: string): string[] {
  const clean = host.replace(/^https?:\/\//, '');
  const candidates = [`https://${clean}`, `https://${projectName}.vercel.app`];
  if (clean.endsWith('.vercel.app') && !clean.includes(vercelScopeSlug)) {
    candidates.push(`https://${clean.replace(/\.vercel\.app$/, `-${vercelScopeSlug}.vercel.app`)}`);
  }
  return [...new Set(candidates)];
}

async function gotoFirstReachable(page: import('@playwright/test').Page, urls: string[], path = '/'): Promise<string> {
  let lastError = '';
  for (const baseUrl of urls) {
    try {
      await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle', timeout: 90_000 });
      return baseUrl;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }
  throw new Error(lastError || `No reachable URL for ${urls.join(', ')}`);
}

async function browserApi(page: import('@playwright/test').Page, path: string, init?: {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}): Promise<unknown> {
  const result = await page.evaluate(async ({ path: requestPath, init: requestInit }) => {
    const response = await fetch(requestPath, requestInit);
    return { ok: response.ok, status: response.status, text: await response.text() };
  }, { path, init });
  if (!result.ok) throw new Error(`${path} HTTP ${result.status}: ${result.text.slice(0, 500)}`);
  return JSON.parse(result.text);
}

function checkParity(contentPayload: {
  tenant: { template: AnyTemplate; style: AnyStyle };
  content: { modularPagesV2?: Record<string, unknown> };
}): Finding[] {
  const findings: Finding[] = [];
  const template = contentPayload.tenant.template;
  const style = contentPayload.tenant.style;
  const modular = contentPayload.content.modularPagesV2 as Record<string, { sections?: Array<{ id: string; type: string; data?: Record<string, unknown> }> }> | undefined;
  if (!modular) return [{ page: 'home', message: 'modularPagesV2 missing' }];

  for (const page of CMS_PAGE_KEYS) {
    const expectedTypes = getCmsSectionTypes(template, style, page);
    const actualSections = modular[page]?.sections ?? [];
    const actualTypes = actualSections.map((section) => section.type);
    for (const type of new Set([...expectedTypes, ...actualTypes])) {
      const expected = expectedTypes.filter((item) => item === type).length;
      const actual = actualTypes.filter((item) => item === type).length;
      if (expected !== actual) {
        findings.push({ page, sectionType: type, message: `section count mismatch: expected ${expected}, actual ${actual}` });
      }
    }

    for (const section of actualSections) {
      const allowedTopLevelKeys = new Set(getCmsSectionFieldKeys(section.type).map((key) => key.split('.')[0]));
      const data = section.data ?? {};
      for (const field of getCmsSectionFieldKeys(section.type)) {
        if (!hasMeaningfulValue(pathValue(data, field))) {
          findings.push({ page, sectionId: section.id, sectionType: section.type, message: `contracted field empty or missing: ${field}` });
        }
      }
      for (const key of Object.keys(data)) {
        if (!allowedTopLevelKeys.has(key)) {
          findings.push({ page, sectionId: section.id, sectionType: section.type, message: `extra data key not in contract: ${key}` });
        }
      }
    }
  }

  return findings;
}

async function runCombo(template: AnyTemplate, style: AnyStyle): Promise<ComboResult> {
  const slug = `e2e-${template}-${style}-${runId}`.slice(0, 50);
  console.log(`\n=== ${template}/${style} -> ${slug} ===`);
  const provision = await provisionTenant({
    slug,
    name: `E2E ${template} ${style}`,
    template,
    style,
    password,
    waitForBuild: false,
    onLog: (line) => console.log(`  ${line}`),
  });
  const deploymentHostUrl = await waitForReadyDeployment(provision.vercelProjectName);
  const deploymentCandidates = deploymentUrlCandidates(deploymentHostUrl, provision.vercelProjectName);
  console.log(`  READY ${deploymentCandidates.join(' | ')}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ locale: 'de-DE' });
  try {
    const deploymentUrl = await gotoFirstReachable(page, deploymentCandidates, '/');
    await page.getByText(`E2E ${template} ${style}`, { exact: false }).first().waitFor({ timeout: 60_000 });

    await page.goto(`${deploymentUrl}/admin/login`, { waitUntil: 'networkidle', timeout: 90_000 });
    const login = await browserApi(page, '/api/admin/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password }),
    }) as { role?: string };
    if (!login.role) throw new Error('login did not return a role');
    await page.goto(`${deploymentUrl}/admin`, { waitUntil: 'networkidle', timeout: 90_000 });
    await page.waitForLoadState('networkidle', { timeout: 60_000 });

    const liveBefore = await browserApi(page, `/api/content?slug=${encodeURIComponent(slug)}`) as {
      tenant: { template: AnyTemplate; style: AnyStyle };
      content: { modularPagesV2: { home: { sections: Array<{ id: string; type: string; data: Record<string, unknown> }> } } };
    };
    const findings = checkParity(liveBefore);

    const marker = `Live Matrix ${template}/${style} ${Date.now()}`;
    const content = liveBefore.content;
    const hero = content.modularPagesV2.home.sections.find((section) => section.type === 'hero');
    if (!hero) throw new Error('home hero section missing');
    hero.data = { ...(hero.data ?? {}), headline: marker };

    await browserApi(page, `/api/content?slug=${encodeURIComponent(slug)}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(content),
    });

    const preview = await browserApi(page, `/api/content?slug=${encodeURIComponent(slug)}&preview=1`) as {
      content: { modularPagesV2: { home: { sections: Array<{ type: string; data: Record<string, unknown> }> } } };
    };
    const previewHero = preview.content.modularPagesV2.home.sections.find((section) => section.type === 'hero');
    if (previewHero?.data?.headline !== marker) throw new Error('preview does not contain draft marker');

    const liveStillOld = await browserApi(page, `/api/content?slug=${encodeURIComponent(slug)}`) as {
      content: { modularPagesV2: { home: { sections: Array<{ type: string; data: Record<string, unknown> }> } } };
    };
    const liveHeroBeforePublish = liveStillOld.content.modularPagesV2.home.sections.find((section) => section.type === 'hero');
    if (liveHeroBeforePublish?.data?.headline === marker) throw new Error('live changed before publish');

    await browserApi(page, `/api/content?slug=${encodeURIComponent(slug)}&action=publish`, { method: 'POST' });

    const liveAfter = await browserApi(page, `/api/content?slug=${encodeURIComponent(slug)}`) as {
      tenant: { template: AnyTemplate; style: AnyStyle };
      content: { modularPagesV2: { home: { sections: Array<{ type: string; data: Record<string, unknown> }> } } };
    };
    const liveHeroAfter = liveAfter.content.modularPagesV2.home.sections.find((section) => section.type === 'hero');
    if (liveHeroAfter?.data?.headline !== marker) throw new Error('published live content does not contain marker');
    findings.push(...checkParity(liveAfter));

    await page.goto(`${deploymentUrl}/`, { waitUntil: 'networkidle', timeout: 90_000 });
    await page.getByText(marker, { exact: false }).first().waitFor({ timeout: 60_000 });

    return { template, style, slug, deploymentUrl, findings, marker };
  } finally {
    await browser.close();
  }
}

const results: ComboResult[] = [];
const combos = selectedCombos ?? selectedTemplates.flatMap((template) => selectedStyles.map((style) => ({ template, style })));
for (const { template, style } of combos) {
    try {
      results.push(await runCombo(template, style));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const slug = `e2e-${template}-${style}-${runId}`.slice(0, 50);
      results.push({
        template,
        style,
        slug,
        deploymentUrl: '',
        findings: [{ page: 'home', message: `test failed: ${message}` }],
      });
    }
}

const failed = results.filter((result) => result.findings.length > 0);
console.log('\n=== LIVE CMS MATRIX RESULT ===');
console.log(JSON.stringify({
  runId,
  password: '[redacted]',
  total: results.length,
  failed: failed.length,
  results,
}, null, 2));

if (failed.length) process.exit(2);
