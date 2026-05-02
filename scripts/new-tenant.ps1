<#
.SYNOPSIS
  Foolproof tenant onboarding wrapper.

.DESCRIPTION
  One-stop script that creates a new tenant from start to finish.
  Designed to be safely runnable by automation with predictable,
  machine-parseable output. All errors are explicit and exit codes
  follow Unix conventions.

  🤖 AI-AGENT? Lies zuerst docs/create-tenant.md und AGENTS.md
  bevor du dieses Skript ausführst!

.PARAMETER Slug
  Tenant slug (lowercase, digits, dashes only). e.g. "trattoria-roma".

.PARAMETER Name
  Display name shown in admin and SEO.

.PARAMETER Template
  One of: restaurant, salon, tradesman, hotel, tourism, consulting, medical, fitness.

.PARAMETER Style
  One of: classic, modern, bold. Default: classic.

.PARAMETER Reseed
  If set, overwrites existing siteContent.

.PARAMETER Password
  Optional initial admin password (min 8 chars). If omitted, a random password is generated.

.PARAMETER NonInteractive
  If set, the script never prompts. Missing args cause an error exit.

.EXAMPLE
  .\scripts\new-tenant.ps1 -Slug bella-vista -Name "Bella Vista" -Template restaurant -Style modern -NonInteractive
#>

[CmdletBinding()]
param(
  [string]$Slug,
  [string]$Name,
  [ValidateSet('restaurant','salon','tradesman','hotel','tourism','consulting','medical','fitness','')]
  [string]$Template = '',
  [ValidateSet('classic','modern','bold','')]
  [string]$Style = '',
  [switch]$Reseed,
  [string]$Password = '',
  [switch]$NonInteractive
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

# --- Helpers ----------------------------------------------------------
function Write-Step ([string]$msg) { Write-Host ">> $msg" -ForegroundColor Cyan }
function Write-Ok   ([string]$msg) { Write-Host "   [ok] $msg" -ForegroundColor Green }
function Write-Warn2([string]$msg) { Write-Host "   [!]  $msg" -ForegroundColor Yellow }
function Write-Err2 ([string]$msg) { Write-Host "   [X]  $msg" -ForegroundColor Red }
function Fail ([string]$msg, [int]$code = 1) { Write-Err2 $msg; exit $code }

function Read-Required {
  param(
    [string]$Prompt,
    [string]$Current,
    [scriptblock]$Validator
  )
  if ($Current) { return $Current }
  if ($NonInteractive) { Fail ("Missing required argument: " + $Prompt) 2 }
  while ($true) {
    $val = Read-Host $Prompt
    if (-not $val) { Write-Warn2 "Value required."; continue }
    if ($Validator) {
      $ok = & $Validator $val
      if (-not $ok) { continue }
    }
    return $val.Trim()
  }
}

# --- 0. Working directory --------------------------------------------
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot  = Split-Path -Parent $ScriptDir
Set-Location $RepoRoot

if (-not (Test-Path 'package.json')) {
  Fail ("package.json not found in " + $RepoRoot + ". Run from inside the repo.") 2
}

# --- 1. Prerequisites -------------------------------------------------
Write-Step "Checking prerequisites"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Fail "Node.js not found in PATH. Install Node 20+ from https://nodejs.org/" 3
}
$nodeVer = (node --version) -replace '^v',''
try {
  $major = [int]($nodeVer.Split('.')[0])
  if ($major -lt 20) { Write-Warn2 ("Node " + $nodeVer + " detected; recommended is 20+.") }
} catch {}
Write-Ok ("Node " + $nodeVer)

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Fail "npm not in PATH" 3 }

if (-not (Test-Path 'node_modules')) {
  Write-Step "Installing dependencies (first run)"
  npm install --silent
  if ($LASTEXITCODE -ne 0) { Fail "npm install failed" 4 }
}
Write-Ok "Dependencies installed"

# --- 2. Env file ------------------------------------------------------
Write-Step "Checking .env.local"

if (-not (Test-Path '.env.local')) {
  Write-Warn2 ".env.local not found - attempting 'vercel env pull'"
  if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Fail "Vercel CLI not installed and .env.local missing. Run: npm i -g vercel; vercel link; vercel env pull .env.local --environment=development" 5
  }
  vercel env pull .env.local --environment=development --yes
  if ($LASTEXITCODE -ne 0) { Fail "vercel env pull failed. Run 'vercel link' first." 5 }
}

$EnvLines    = Get-Content '.env.local' -ErrorAction Stop
$RequiredEnv = @('VERCEL_TOKEN','VERCEL_TEAM_ID','POSTGRES_URL','BLOB_READ_WRITE_TOKEN','AUTH_SECRET','ADMIN_PASSWORD_HASH')

$Missing = @()
foreach ($key in $RequiredEnv) {
  $line = $EnvLines | Where-Object { $_ -match ("^\s*" + $key + "\s*=") } | Select-Object -First 1
  if (-not $line) { $Missing += $key; continue }
  $val = ($line -split '=', 2)[1].Trim().Trim('"').Trim("'")
  if (-not $val) { $Missing += ($key + " (empty)"); continue }
  if ($val.StartsWith('eyJ') -and $val.Length -gt 200 -and $key -ne 'AUTH_SECRET') {
    Write-Warn2 ($key + " looks like a Vercel ciphertext blob; provision-tenant will skip it.")
  }
}

if ($Missing.Count -gt 0) {
  Write-Err2 "Missing required env vars in .env.local:"
  foreach ($m in $Missing) { Write-Host ("   - " + $m) -ForegroundColor Red }
  Write-Host ""
  Write-Host "Fix by either:" -ForegroundColor Yellow
  Write-Host "  1. vercel env pull .env.local --environment=development" -ForegroundColor Yellow
  Write-Host "  2. Or set them manually in .env.local" -ForegroundColor Yellow
  Write-Host "VERCEL_TOKEN: https://vercel.com/account/tokens" -ForegroundColor Yellow
  exit 6
}
Write-Ok "All required env vars present"

# --- 3. Collect & validate parameters --------------------------------
Write-Step "Collecting tenant details"

$slugValidator = {
  param($v)
  if ($v -notmatch '^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$') {
    Write-Warn2 "Slug must be lowercase letters/digits/dashes only, no leading/trailing dash."
    return $false
  }
  if ($v.Length -lt 2 -or $v.Length -gt 50) {
    Write-Warn2 "Slug must be 2-50 characters."
    return $false
  }
  return $true
}
$Slug = Read-Required -Prompt 'Slug (lowercase-with-dashes)' -Current $Slug -Validator $slugValidator

$nameValidator = {
  param($v)
  if ($v.Length -lt 2) { Write-Warn2 "Name too short."; return $false }
  return $true
}
$Name = Read-Required -Prompt 'Display Name' -Current $Name -Validator $nameValidator

if (-not $Template) {
  $templateValidator = {
    param($v)
    $allowed = @('restaurant','salon','tradesman','hotel','tourism','consulting','medical','fitness')
    if ($allowed -notcontains $v) { Write-Warn2 ("Must be one of: " + ($allowed -join ', ')); return $false }
    return $true
  }
  $Template = Read-Required -Prompt 'Template (restaurant/salon/tradesman/hotel/tourism/consulting/medical/fitness)' -Current '' -Validator $templateValidator
}

if (-not $Style) {
  if ($NonInteractive) {
    $Style = 'classic'
  } else {
    $Style = Read-Host "Style (classic/modern/bold) [classic]"
    if (-not $Style) { $Style = 'classic' }
    if (@('classic','modern','bold') -notcontains $Style) { Fail ("Invalid style: " + $Style) 2 }
  }
}

Write-Host ""
Write-Host ("  Slug:     " + $Slug)
Write-Host ("  Name:     " + $Name)
Write-Host ("  Template: " + $Template)
Write-Host ("  Style:    " + $Style)
Write-Host ("  Reseed:   " + $Reseed.IsPresent)
Write-Host ""

if (-not $NonInteractive) {
  $confirm = Read-Host "Proceed? (Y/n)"
  if ($confirm -and $confirm -notmatch '^[Yy]') { Write-Host "Cancelled."; exit 0 }
}

# --- 4. Run provision script -----------------------------------------
Write-Step "Provisioning tenant via Vercel API"

$tsxArgs = @('scripts/provision-tenant.ts', $Slug, $Name, $Template, $Style)
if ($Reseed.IsPresent) { $tsxArgs += '--reseed' }
if ($Password) { $tsxArgs += '--password'; $tsxArgs += $Password }

# Stream output directly. We deliberately do NOT tee to a log file:
# provision-tenant.ts no longer prints the password to stdout — instead it
# writes credentials directly to .tenant-credentials.txt with mode 600.
& npx tsx @tsxArgs
$provisionExit = $LASTEXITCODE

if ($provisionExit -ne 0) {
  Write-Host ""
  Write-Err2 "Provisioning failed."
  Write-Host ""
  Write-Host "Common causes:" -ForegroundColor Yellow
  Write-Host "  - VERCEL_TOKEN expired or lacks team scope" -ForegroundColor Yellow
  Write-Host "  - Slug already used as a Vercel project name" -ForegroundColor Yellow
  Write-Host "  - POSTGRES_URL unreachable from this machine" -ForegroundColor Yellow
  Write-Host "  - Network blocked (corporate proxy)" -ForegroundColor Yellow
  Write-Host "  - AUTH_SECRET missing as plaintext in .env.local (must match showcase)" -ForegroundColor Yellow
  exit 10
}

# --- 5. Confirm credentials file ------------------------------------
$credFile = Join-Path $RepoRoot ".tenant-credentials.txt"
if (Test-Path $credFile) {
  Write-Ok "Credentials available in .tenant-credentials.txt (gitignored, append-only)"
  Write-Host "  Hand them to the customer via a secure channel, then delete the entry." -ForegroundColor Yellow
} else {
  Write-Warn2 "No .tenant-credentials.txt produced. Tenant likely existed already (password preserved)."
}

Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Green
Write-Host ("  Tenant '" + $Slug + "' provisioned successfully.") -ForegroundColor Green
Write-Host ("  Live URL: https://" + $Slug + ".vercel.app") -ForegroundColor Green
Write-Host ("  Admin:    https://" + $Slug + ".vercel.app/admin/login") -ForegroundColor Green
Write-Host "------------------------------------------" -ForegroundColor Green
exit 0
