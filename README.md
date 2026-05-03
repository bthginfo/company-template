# company-template

Multi-tenant Vite + React + TypeScript site template. One codebase deploys
**N customer sites** on Vercel, each backed by a row in a shared Neon Postgres
database. Each tenant picks one of **8 industry templates × 3 visual styles**
and edits content via an in-browser admin.

> 🤖 **AI agent?** Read [AGENTS.md](AGENTS.md) first. It contains exact,
> copy-paste commands and a failure → fix table.

---

## Quick reference

| Need to do                | Command / file                                                     |
| ------------------------- | ------------------------------------------------------------------ |
| Onboard a new tenant      | `npm run tenant:new` (interactive) — see [AGENTS.md](AGENTS.md)    |
| Local dev (with API)      | `npm run dev` (uses `vercel dev`)                                  |
| Local dev (UI only)       | `npm run dev:vite`                                                 |
| Type-check + build        | `npm run build`                                                    |
| Type-check only           | `npm run lint`                                                     |
| Audit admin↔frontend drift| `npm run check:drift`                                              |
| Generate DB migration     | `npm run db:generate`                                              |
| Apply DB schema           | `npm run db:push`                                                  |
| Hash a password (one-off) | `npm run hash`                                                     |

---

## Architecture in 60 seconds

```
                 ┌─────────────────────────────────────┐
                 │  Vercel project: <slug>.vercel.app  │
                 │  env: TENANT_SLUG=<slug>            │
                 └────────┬───────────────────┬────────┘
                          │ (static SPA)      │ (serverless fns)
                          ▼                   ▼
                  src/SiteRouter.tsx       api/*.ts
                          │                   │
                          │ reads             │ writes
                          ▼                   ▼
                          ┌──────────────────────┐
                          │  Neon Postgres       │
                          │   tenants            │
                          │   site_content (jsonb)│
                          └──────────────────────┘
```

- **One repo, many deployments.** Each Vercel project sets `TENANT_SLUG`,
  `VITE_TENANT_SLUG` and shared DB/Blob env vars; nothing else is per-tenant.
- **All site content lives in one `siteContent.data` jsonb column** keyed by
  `tenant_id`. The shape is the union of `DEMO_CONTENT` + `EXTRA_DEMO_CONTENT`
  (see [src/lib/demo-content.ts](src/lib/demo-content.ts)).
- **Two admin entry points:**
  - `/admin` — tenant-scoped, edits `siteContent.data` for the deployed slug.
  - `/admin-demo` — read-only showcase used on `bth-studio-showcase.vercel.app`.
- **Auth:** custom JWT in [api/_lib/auth.ts](api/_lib/auth.ts) using `jose`.
  `HttpOnly; Secure; SameSite=Lax` cookies. Two roles: `super` (master env
  password, works on any deployment) and `tenant` (per-tenant bcrypt hash).
- **Rate-limit:** in-memory per-IP on `/api/contact` (5/min) and
  `/api/admin/login` (8/min). Best-effort; resets on cold-start.

---

## Repo layout

```
api/                      Vercel serverless functions
  _lib/auth.ts            JWT cookie helpers
  admin/                  login, logout, session
  contact.ts              public contact form (rate-limited)
  content.ts              tenant-scoped content read/write
  upload.ts               Blob upload (MIME whitelist + 1.5 MB)
  og.ts                   dynamic OG image
src/
  SiteRouter.tsx          maps slug+template+style → template app
  App.tsx                 routes / vs /admin vs /admin-demo
  templates/
    _shared/              TemplateApp + section primitives
    restaurant|salon|tradesman|hotel|tourism/   "core 5" templates
    extra/                consulting | medical | fitness (one ExtraBranchTemplate)
  admin/                  AdminApp, ContentEditor body, ImageField, RichTextEditor
  components/             News, MasonryLightbox, fx (cursor / parallax), …
  lib/
    db/schema.ts          Drizzle schema (tenants, siteContent)
    db/client.ts          Postgres client
    demo-content.ts       canonical content shape per template
    sanitize-html.ts      DOMPurify-style allowlist used at render
scripts/
  new-tenant.ps1          ★ FOOLPROOF onboarding wrapper (start here)
  provision-tenant.ts     end-to-end provisioning (called by new-tenant.ps1)
  create-tenant.ts        DB-only seed (legacy)
  postbuild-prerender.mjs static prerender of /, /about, /contact, …
AGENTS.md                 instructions for automated agents
```

---

## Local setup

### 1. Prerequisites
- Node 20+
- Vercel CLI: `npm i -g vercel`
- Access to the `bthginfo/company-template` Vercel project

### 2. First-time install

```powershell
git clone https://github.com/bthginfo/company-template.git
cd company-template
npm install
vercel link                           # pick the existing project
vercel env pull .env.local --environment=development
```

### 3. Required env (auto-pulled by `vercel env pull`)

```
POSTGRES_URL              # Neon connection string
BLOB_READ_WRITE_TOKEN     # Vercel Blob (uploads)
AUTH_SECRET               # JWT signing secret (32+ chars)
ADMIN_PASSWORD_HASH       # bcrypt hash of master password
VERCEL_TOKEN              # personal token for tenant provisioning
VERCEL_TEAM_ID            # team scope for new projects
```

For local dev you also need `TENANT_SLUG=<some-existing-slug>` so the admin
knows which tenant's content to load.

### 4. Run

```powershell
npm run dev          # full stack (vercel dev → API + SPA)
npm run dev:vite     # SPA only, no API
```

---

## Adding a new tenant

**Always use the wrapper.** It does pre-flight checks an automated agent
would otherwise miss.

```powershell
npm run tenant:new
```

Interactive prompts for slug / name / template / style. For automation:

```powershell
npm run tenant:new -- -Slug bella-vista -Name "Bella Vista" `
  -Template restaurant -Style modern -NonInteractive
```

The script:
1. Verifies Node, npm, deps, Vercel CLI, `.env.local` integrity
2. Validates slug format (`^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`, 2–50 chars)
3. Calls [scripts/provision-tenant.ts](scripts/provision-tenant.ts) which:
   - Inserts the tenant + bcrypt password into Postgres
   - Seeds `siteContent.data` from `DEMO_CONTENT[<template>]`
   - Creates the Vercel project (linked to GitHub `bthginfo/company-template`)
   - Copies env vars
   - Disables Vercel SSO
   - Triggers a deploy from `main`
4. Saves the generated admin password to `.tenant-credentials.txt` (gitignored)

See [AGENTS.md](AGENTS.md) for exit codes and failure → fix table.

---

## Adding a new template variant

1. Add the slug to the union in [src/lib/demo-content.ts](src/lib/demo-content.ts)
   (or `extra-demo-content.ts` for the `consulting | medical | fitness` family).
2. If it's a "core" branch, scaffold `src/templates/<slug>/` mirroring
   [src/templates/restaurant](src/templates/restaurant). Otherwise extend
   [src/templates/extra/index.tsx](src/templates/extra/index.tsx).
3. Wire the slug in [src/SiteRouter.tsx](src/SiteRouter.tsx).
4. Add it to the `validTemplate` set in
   [scripts/provision-tenant.ts](scripts/provision-tenant.ts) and the
   `[ValidateSet(...)]` lists in [scripts/new-tenant.ps1](scripts/new-tenant.ps1).
5. Update the `-Template` row in [AGENTS.md](AGENTS.md).

---

## Adding a new style

Currently `classic | modern | bold`. To add a fourth:
1. Implement the style branch inside
   [src/templates/_shared/TemplateApp.tsx](src/templates/_shared/TemplateApp.tsx)
   and any per-section style hooks.
2. Add to `ValidateSet` in [scripts/new-tenant.ps1](scripts/new-tenant.ps1).
3. Update [AGENTS.md](AGENTS.md) `-Style` row.

---

## Deploying

The standard tenant flow auto-deploys via `provision-tenant.ts`. For the
template repo itself, every push to `main` deploys
`bth-studio-showcase.vercel.app` automatically.

To roll back a tenant deploy, use the Vercel dashboard's **Deployments → ...
→ Promote to Production** on a previous build.

---

## Debugging

| Symptom                                | Where to look                                                  |
| -------------------------------------- | -------------------------------------------------------------- |
| `/admin` returns 500                   | Vercel function logs for `/api/admin/session`                  |
| Login always says "Invalid credentials"| `TENANT_SLUG` env not set on the project, or wrong password    |
| Uploads return 413                     | File >1.5 MB; bump in [api/upload.ts](api/upload.ts)           |
| Content edits don't persist            | `tenantId` mismatch — check JWT cookie and DB row              |
| Build fails with TS error              | Run `npm run lint` locally; the build runs `tsc --noEmit` first|
| New tenant deploy stuck on 404         | First deploy can take 1–2 min; check Vercel build logs         |

Check `.tenant-credentials.txt` (local only, gitignored) for tenant
passwords generated during onboarding.

---

## Security notes

- All admin POST endpoints go through the session helper in
  [api/_lib/auth.ts](api/_lib/auth.ts).
- Cookies are `HttpOnly; Secure; SameSite=Lax` → cross-site POST is blocked
  by the browser; no separate CSRF token required.
- Uploads are MIME-whitelisted to `image/jpeg|png|webp|gif|svg+xml` with a
  1.5 MB cap and a sanitized filename.
- Tenant content writes verify `session.tenantId === row.tenantId` before
  updating ([api/content.ts](api/content.ts)).
- All HTML rendered from user content goes through
  [src/lib/sanitize-html.ts](src/lib/sanitize-html.ts) (allowlist only).
- Rotate `VERCEL_TOKEN` every ~90 days at
  <https://vercel.com/account/tokens>.

---

## Conventions

- **Imports:** prefer `@/lib/...` aliases (configured in
  [tsconfig.json](tsconfig.json) + [vite.config.ts](vite.config.ts)).
- **Styling:** Tailwind + a small set of CSS-Modules in
  [src/index.css](src/index.css). Avoid one-off inline-style escalation.
- **State:** local `useState` + a single `ContentContext` for the live
  editor's draft. No Redux / Zustand.
- **Components named `*Section`** are top-level page sections and must
  accept the `style` prop and a `Style` discriminator.
- **No `any`.** If you reach for one, leave a `// TODO(types):` and an
  issue link.

---

## License

Proprietary — © Bauer Technology Hub Ingelheim. All rights reserved.
