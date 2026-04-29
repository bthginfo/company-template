# Runbook

Operational procedures for the multi-tenant template. Use this when
something is broken in production or you need to do an unusual ops task.

---

## Index

- [Tenant site is down (5xx)](#tenant-site-is-down-5xx)
- [Tenant admin login broken](#tenant-admin-login-broken)
- [Roll back a tenant deploy](#roll-back-a-tenant-deploy)
- [Roll back a code change on all tenants](#roll-back-a-code-change-on-all-tenants)
- [Reset a tenant password](#reset-a-tenant-password)
- [Rotate VERCEL_TOKEN](#rotate-vercel_token)
- [Rotate AUTH_SECRET](#rotate-auth_secret)
- [Database is unreachable / Neon paused](#database-is-unreachable--neon-paused)
- [Backup / restore tenant content](#backup--restore-tenant-content)
- [Decommission a tenant](#decommission-a-tenant)

---

## Tenant site is down (5xx)

1. Open Vercel dashboard → project `<slug>` → **Logs**.
2. Filter by `error`. Most common causes:
   - Postgres connection refused → see
     [Database is unreachable](#database-is-unreachable--neon-paused).
   - `JWT_INVALID` → `AUTH_SECRET` mismatch between projects (don't rotate
     casually — see below).
   - 500 from `/api/content` → check the latest deploy's diff for a
     content-shape change without a migration.
3. If the last deploy is the cause, **promote the previous deploy** to
   production from the Deployments tab.

---

## Tenant admin login broken

Symptoms: `/admin/login` always returns "Invalid credentials".

1. Confirm `TENANT_SLUG` env on the Vercel project matches the DB row's
   `slug` exactly. Case-sensitive.
2. Confirm the tenant row has a non-empty `password_hash`:
   ```sql
   SELECT slug, length(password_hash) FROM tenants WHERE slug = '<slug>';
   ```
3. If the user forgot the password, see
   [Reset a tenant password](#reset-a-tenant-password).
4. The master password (`ADMIN_PASSWORD_HASH` env) always works on every
   tenant deployment. Use it as a fallback.

---

## Roll back a tenant deploy

Vercel dashboard → project → **Deployments** → on the previous good
deployment, click `…` → **Promote to Production**.

DNS-level rollbacks aren't necessary; Vercel re-points the alias instantly.

---

## Roll back a code change on all tenants

The template repo's `main` branch is the source for every tenant project's
linked GitHub repo, but each tenant deploys **only when triggered** by
`provision-tenant.ts` (not on every push). To roll back live tenants:

1. Identify the bad commit:
   ```powershell
   git log --oneline -20
   ```
2. Revert it on `main`:
   ```powershell
   git revert <sha>
   git push
   ```
3. For each affected tenant, trigger a redeploy from the Vercel dashboard
   (Deployments → **Redeploy** on the latest commit) **OR** run the
   onboarding script with `-Reseed` (this also resets content, so prefer
   the manual redeploy unless content needs reset too).

---

## Reset a tenant password

```powershell
# 1. Pick a new password and hash it
npm run hash
# enter the new plaintext password when prompted; copy the bcrypt output

# 2. Update the DB row directly
# Use any Postgres client connected to POSTGRES_URL
```

```sql
UPDATE tenants
   SET password_hash = '<bcrypt-output>'
 WHERE slug = '<slug>';
```

Test by logging in at `https://<slug>.vercel.app/admin/login`.

---

## Rotate VERCEL_TOKEN

Frequency: every ~90 days, or immediately if leaked.

1. Generate a new token at <https://vercel.com/account/tokens>.
   Scope: full account access (needed for project creation).
2. Update `.env.local` locally **and** the env var on every Vercel project
   that has it set (typically only the showcase project, since tenants
   don't need it after provisioning):
   ```powershell
   vercel env add VERCEL_TOKEN production
   ```
3. Revoke the old token from the same dashboard page.
4. Verify by running `npm run tenant:new -- ...` against a throwaway slug
   in dry-run mode.

---

## Rotate AUTH_SECRET

⚠️ **Invalidates every active session on every tenant.** All admins must
log in again.

1. Generate a new secret (32+ random bytes):
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
2. Update **every** Vercel project's `AUTH_SECRET` env var. The value must
   be identical across the showcase and all tenant projects (since the
   master cookie travels across them).
3. Redeploy every project (`vercel --prod` or dashboard redeploy).
4. Notify any admins to re-login.

---

## Database is unreachable / Neon paused

Neon's free tier auto-pauses after inactivity. Symptoms: Vercel logs show
`ECONNREFUSED` or `connection terminated unexpectedly`.

1. Open the Neon dashboard → wake the database (one click).
2. Verify with `psql "$POSTGRES_URL" -c "SELECT 1"`.
3. If on a paid plan and outage persists, check Neon status page.

For permanent reliability, upgrade to a Neon plan without auto-pause.

---

## Backup / restore tenant content

Postgres is the system of record. Take periodic dumps:

```powershell
pg_dump "$env:POSTGRES_URL" --table=site_content --table=tenants > backup.sql
```

To restore a single tenant's content from a backup:

```sql
-- inspect the backup for the tenant_id you need, then:
INSERT INTO site_content (tenant_id, data, updated_at)
VALUES ('<uuid>', '<jsonb>', now())
ON CONFLICT (tenant_id) DO UPDATE
   SET data = excluded.data,
       updated_at = excluded.updated_at;
```

Vercel Blob (uploaded images) is **not** backed up by this dump. Blob
deletes are usually soft / recoverable from the Vercel dashboard within a
limited window.

---

## Decommission a tenant

1. Optionally export the content first:
   ```sql
   SELECT data FROM site_content WHERE tenant_id =
     (SELECT id FROM tenants WHERE slug = '<slug>');
   ```
2. Delete the Vercel project: dashboard → project → **Settings → Advanced
   → Delete Project**.
3. Delete the DB rows:
   ```sql
   DELETE FROM tenants WHERE slug = '<slug>';
   -- site_content cascades automatically
   ```
4. Optionally purge Blob assets via the Vercel Blob dashboard.

---

## When in doubt

- **Don't `git push --force` to `main`.**
- **Don't drop tables.** `DELETE FROM` only.
- **Don't rotate `AUTH_SECRET` or `ADMIN_PASSWORD_HASH` casually.**
- If unsure about a destructive action, do it on a throwaway tenant first.
