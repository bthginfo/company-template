# Agent Instructions

This repository hosts a multi-tenant Vite/React/TypeScript template that is
deployed per-tenant on Vercel. If you are an automated agent, **read this file
first** before running any tooling.

---

## How to provision a new tenant (foolproof)

There is exactly **one** command you need:

```powershell
npm run tenant:new -- -Slug <slug> -Name "<Display Name>" -Template <template> -Style <style> -NonInteractive
```

### Parameters

| Param        | Required | Format / Allowed values                                                                  |
| ------------ | -------- | ---------------------------------------------------------------------------------------- |
| `-Slug`      | yes      | lowercase letters, digits, dashes; 2–50 chars; e.g. `trattoria-roma`                     |
| `-Name`      | yes      | Display name. Must be quoted if it contains spaces. e.g. `"Trattoria Roma"`              |
| `-Template`  | yes      | One of: `restaurant`, `salon`, `tradesman`, `hotel`, `tourism`, `consulting`, `medical`, `fitness` |
| `-Style`     | no       | One of: `classic`, `modern`, `bold`. Default: `classic`                                  |
| `-Reseed`    | no       | Switch. If present, overwrites existing site content for an existing tenant.             |
| `-NonInteractive` | no  | Switch. **Always pass this in automation** so the script never prompts.                  |

### Example

```powershell
npm run tenant:new -- -Slug bella-vista -Name "Bella Vista" -Template restaurant -Style modern -NonInteractive
```

### What the script does (in order)

1. Verifies Node 20+, npm, and dependencies are installed (auto-installs if missing).
2. Verifies `.env.local` exists; runs `vercel env pull` if not.
3. Validates the six required env vars are present and not Vercel ciphertext blobs.
4. Validates slug format and template/style allowed values.
5. Calls `scripts/provision-tenant.ts` which:
   - Creates the tenant row in Postgres + a bcrypt password.
   - Creates (or reuses) the Vercel project linked to `bthginfo/company-template`.
   - Copies env vars into the project.
   - Disables Vercel SSO/protection.
   - Triggers a deployment from `main`.
6. Saves the generated admin password to `.tenant-credentials.txt` (gitignored).

### Exit codes

| Code | Meaning                                                                      |
| ---- | ---------------------------------------------------------------------------- |
| 0    | Success                                                                      |
| 1    | Generic failure                                                              |
| 2    | Invalid or missing argument                                                  |
| 3    | Missing system tool (Node, npm)                                              |
| 4    | Dependency install failed                                                    |
| 5    | Vercel CLI / `.env.local` problem                                            |
| 6    | Required env var missing or empty                                            |
| 10   | Provisioning failed at Vercel/DB step (see `.tenant-provision-<slug>.log`)   |

---

## Required environment (`.env.local`)

Pull from Vercel before first use:

```powershell
vercel link            # one-time: link this checkout to the bthginfo/company-template Vercel project
vercel env pull .env.local --environment=development
```

The script verifies these keys are non-empty and **not** Vercel ciphertext blobs
(values starting with `eyJ` and longer than 200 chars). If any are blobs, set
them manually in `.env.local` from your password manager:

- `VERCEL_TOKEN` — personal access token from <https://vercel.com/account/tokens>
- `VERCEL_TEAM_ID`
- `POSTGRES_URL`
- `BLOB_READ_WRITE_TOKEN`
- `AUTH_SECRET` (auto-generated if missing)
- `ADMIN_PASSWORD_HASH` (used as the master/admin login)

---

## Common failure → fix

| Error message contains              | Fix                                                                  |
| ----------------------------------- | -------------------------------------------------------------------- |
| `Node.js not found`                 | Install Node 20+ from <https://nodejs.org>                           |
| `vercel env pull failed`            | Run `vercel link` first; pick the existing project                   |
| `Missing required env vars`         | Edit `.env.local`, set the listed keys with plaintext values         |
| `looks like a Vercel ciphertext blob` | Pull again with `--environment=development` or set value manually  |
| `project_already_exists`            | Slug is already a Vercel project; pick a different slug              |
| `VERCEL_TOKEN expired`              | Generate a new token at <https://vercel.com/account/tokens>          |
| `POSTGRES_URL unreachable`          | Check VPN / firewall; verify Neon DB is awake                        |

---

## Things you must NOT do

- ❌ Edit `provision-tenant.ts` to bypass validation. Fix the input instead.
- ❌ Commit `.env.local` or `.tenant-credentials.txt` (both gitignored).
- ❌ Force-push to `main`.
- ❌ Run `vercel --prod` manually for a tenant project; the script triggers
      the deploy via the API, which is the supported path.
- ❌ Reuse an existing slug unless `-Reseed` is intended.

---

## Verifying the result

After the script reports success, the tenant is reachable at:

- Site:  `https://<slug>.vercel.app`
- Admin: `https://<slug>.vercel.app/admin/login`
- Login: username = `<slug>`, password = the value saved to
  `.tenant-credentials.txt` (last entry).

The first deploy takes 1–2 minutes; check the Vercel dashboard if the URL
returns 404 immediately after provisioning.
