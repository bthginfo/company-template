<#
.SYNOPSIS
  Provisioniert einen neuen Kunden auf Vercel.
.DESCRIPTION
  Legt ein neues Vercel-Projekt an, setzt die nötigen Env-Vars,
  pflegt den Tenant in Postgres und deployed die erste Version.

  Voraussetzung: lokal angemeldet via `vercel login`.
.EXAMPLE
  ./scripts/deploy-customer.ps1 -Slug pizzeria-roma -Name "Pizzeria Roma" `
                                -Template restaurant -AdminEmail owner@example.at
#>
param(
  [Parameter(Mandatory)] [string]$Slug,
  [Parameter(Mandatory)] [string]$Name,
  [Parameter(Mandatory)] [ValidateSet('restaurant','salon','tradesman')] [string]$Template,
  [Parameter(Mandatory)] [string]$AdminEmail
)

$ErrorActionPreference = 'Stop'

Write-Host "→ Tenant in Datenbank anlegen ..." -ForegroundColor Cyan
npm run db:seed -- $Slug $Name $Template $AdminEmail

Write-Host "→ Vercel-Projekt anlegen / verlinken ..." -ForegroundColor Cyan
$ProjectName = "site-$Slug"
vercel link --yes --project $ProjectName

Write-Host "→ Env-Vars setzen ..." -ForegroundColor Cyan
"$Slug"     | vercel env add VITE_TENANT_SLUG production
"$Template" | vercel env add VITE_TEMPLATE   production

Write-Host "→ Production-Deployment ..." -ForegroundColor Cyan
vercel --prod

Write-Host "`n✓ Fertig. Senden Sie ${AdminEmail} an die Login-URL: https://$ProjectName.vercel.app/admin/login" -ForegroundColor Green
