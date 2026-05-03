<#
.SYNOPSIS
  Provision one Vercel tenant per template (all eight) with style classic and default seed content.

.DESCRIPTION
  Requires a valid .env.local (see AGENTS.md). Stops on first failure unless -ContinueOnError.
  If a slug already exists, use -Reseed to overwrite site content for that slug, or delete the
  Vercel project / pick new slugs.

.PARAMETER Reseed
  Passed through to npm run tenant:new for every row (overwrites existing site content).

.PARAMETER ContinueOnError
  Run all tenants even if one fails; exit 1 if any failed.

.EXAMPLE
  .\scripts\provision-branch-audit-batch.ps1

.EXAMPLE
  .\scripts\provision-branch-audit-batch.ps1 -Reseed
#>
[CmdletBinding()]
param(
  [switch]$Reseed,
  [switch]$ContinueOnError
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $root

if (-not (Test-Path (Join-Path $root '.env.local'))) {
  Write-Host '[X] Missing .env.local — run vercel env pull (see AGENTS.md), then retry.' -ForegroundColor Red
  exit 1
}

$rows = @(
  @{ slug = 'bth-audit-restaurant';  name = 'BTH Audit Restaurant';  template = 'restaurant' },
  @{ slug = 'bth-audit-salon';       name = 'BTH Audit Salon';       template = 'salon' },
  @{ slug = 'bth-audit-tradesman';   name = 'BTH Audit Handwerk';    template = 'tradesman' },
  @{ slug = 'bth-audit-hotel';       name = 'BTH Audit Hotel';       template = 'hotel' },
  @{ slug = 'bth-audit-tourism';     name = 'BTH Audit Tourismus';   template = 'tourism' },
  @{ slug = 'bth-audit-consulting';  name = 'BTH Audit Beratung';    template = 'consulting' },
  @{ slug = 'bth-audit-medical';     name = 'BTH Audit Praxis';      template = 'medical' },
  @{ slug = 'bth-audit-fitness';     name = 'BTH Audit Fitness';     template = 'fitness' }
)

$failed = New-Object System.Collections.Generic.List[string]

foreach ($r in $rows) {
  Write-Host "`n=== $($r.slug) ($($r.template), classic) ===" -ForegroundColor Cyan
  $npmArgs = @(
    'run', 'tenant:new', '--',
    '-Slug', $r.slug,
    '-Name', $r.name,
    '-Template', $r.template,
    '-Style', 'classic',
    '-NonInteractive'
  )
  if ($Reseed) { $npmArgs += '-Reseed' }
  & npm @npmArgs
  if ($LASTEXITCODE -ne 0) {
    [void]$failed.Add($r.slug)
    if (-not $ContinueOnError) {
      Write-Host "[X] Stopped after failure: $($r.slug)" -ForegroundColor Red
      exit $LASTEXITCODE
    }
  }
}

if ($failed.Count -gt 0) {
  Write-Host "`n[X] Failed slugs: $($failed -join ', ')" -ForegroundColor Red
  exit 1
}

Write-Host "`n[ok] All $($rows.Count) tenants provisioned (classic, default seed)." -ForegroundColor Green
Write-Host "Sites: https://<slug>.vercel.app  Admin: https://<slug>.vercel.app/admin/login" -ForegroundColor DarkGray
Write-Host "Passwords append to .tenant-credentials.txt (gitignored)." -ForegroundColor DarkGray
