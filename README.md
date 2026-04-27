# company-template

Multi-Tenant SPA-Template fuer lokale Unternehmen (DACH-Raum, Fokus
**Innsbruck * Muenchen * Ingolstadt**).

Eine Codebase, mehrere Templates, beliebig viele Kund:innen - jede:r mit
eigenem Admin-Bereich (CMS) zum Bearbeiten von Texten und Bildern.

## Stack

- Vite + React 18 + TypeScript + Tailwind
- Vercel Functions, Vercel Postgres + Drizzle ORM, Vercel Blob
- Auth.js (Magic Link via Resend)

## Setup

```powershell
npm install
npm run vercel:setup
```

Das Skript meldet dich interaktiv (Browser) bei Vercel an, legt Postgres + Blob an,
setzt alle Env-Vars, deployed Schema und Showcase-Site.

## Modi

- VITE_MODE=showcase  -> Agentur-Landing mit Template-Vorschauen
- (unset)             -> Tenant-Site, laedt Inhalte aus DB anhand VITE_TENANT_SLUG

## Neuer Kunde

```powershell
npm run vercel:customer -- -Slug pizzeria-roma -Name "Pizzeria Roma" -Template restaurant -AdminEmail owner@example.at
```

Siehe `scripts/` und `src/templates/` fuer Details.
