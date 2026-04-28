<#
.SYNOPSIS
    One-command Vercel setup for the FlamingoMedia multi-tenant template platform.

.DESCRIPTION
    Provisions everything you need on Vercel:
      1. Authenticates with Vercel (interactive, secure - never paste tokens in chat)
      2. Creates Postgres + Blob stores
      3. Pushes the database schema
      4. Seeds the showcase tenant
      5. Creates and deploys the showcase Vercel project (VITE_MODE=showcase)
      6. Optionally creates and deploys an additional customer project

    Run from the project root:  pwsh ./scripts/vercel-setup.ps1

.NOTES
    Why this script does NOT take a token argument:
    Personal access tokens pasted into shells/chat are unrevocable in audit logs.
    `vercel login` opens a browser, authenticates you securely, and stores a
    short-lived credential under your local user profile.

    SECURITY:
    - Never commits secrets.
    - Writes .env.local + .env.production locally only (already in .gitignore).
    - Optionally requires a Resend API key (for magic-link emails). Re-run later if you skip.
#>

[CmdletBinding()]
param(
    [string]$ProjectName = 'flamingomedia',
    [string]$Region      = 'fra1',
    [string]$DbName      = 'flamingomedia-db',
    [string]$BlobName    = 'flamingomedia-blob',
    [switch]$SkipDeploy
)

$ErrorActionPreference = 'Stop'

# Native commands (Vercel CLI) print banners to stderr; treat as info, not error.
$PSNativeCommandUseErrorActionPreference = $false
$ProgressPreference = 'SilentlyContinue'

function Invoke-Native {
    param([string]$File, [string[]]$Args)
    $prev = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try { & $File @Args 2>&1 | ForEach-Object { "$_" } }
    finally { $ErrorActionPreference = $prev }
    return $LASTEXITCODE
}

function Write-Step  { param([string]$m) Write-Host "`n>>> $m" -ForegroundColor Cyan }
function Write-Ok    { param([string]$m) Write-Host "    OK  $m" -ForegroundColor Green }
function Write-Warn2 { param([string]$m) Write-Host "    !!  $m" -ForegroundColor Yellow }
function Read-Required { param([string]$Prompt)
    while ($true) {
        $v = Read-Host $Prompt
        if ($v -and $v.Trim().Length -gt 0) { return $v.Trim() }
        Write-Warn2 "Eingabe erforderlich."
    }
}

Write-Step '0/8  Voraussetzungen pruefen'

if (-not (Test-Path package.json)) {
    throw 'Bitte das Skript aus dem Projekt-Root ausfuehren (package.json nicht gefunden).'
}

foreach ($cmd in @('node', 'npm', 'git')) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        throw "$cmd ist nicht installiert oder nicht im PATH."
    }
}
Write-Ok 'node / npm / git verfuegbar'

$vercelCmd = 'vercel'
if (-not (Get-Command $vercelCmd -ErrorAction SilentlyContinue)) {
    Write-Warn2 'Vercel CLI nicht gefunden - installiere global ...'
    npm i -g vercel | Out-Null
    if (-not (Get-Command $vercelCmd -ErrorAction SilentlyContinue)) {
        throw 'Konnte Vercel CLI nicht installieren. Bitte manuell: npm i -g vercel'
    }
}
Write-Ok ('Vercel CLI ' + (& $vercelCmd --version))

Write-Step '1/8  Bei Vercel anmelden (Browser oeffnet sich)'
$ErrorActionPreference = 'Continue'
& $vercelCmd whoami *> $null
$loggedIn = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = 'Stop'
if (-not $loggedIn) {
    & $vercelCmd login
    if ($LASTEXITCODE -ne 0) { throw 'Vercel login fehlgeschlagen.' }
}
$ErrorActionPreference = 'Continue'
$who = (& $vercelCmd whoami 2>$null | Select-Object -Last 1)
$ErrorActionPreference = 'Stop'
Write-Ok "Eingeloggt als: $who"

Write-Step '2/8  Dependencies installieren'
if (-not (Test-Path node_modules)) {
    npm install
} else {
    Write-Ok 'node_modules bereits vorhanden - ueberspringe'
}

Write-Step ('3/8  Vercel Projekt anlegen / verlinken: ' + $ProjectName)
& $vercelCmd link --yes --project $ProjectName 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Warn2 'Projekt existiert noch nicht - lege es jetzt an.'
    & $vercelCmd projects add $ProjectName | Out-Null
    & $vercelCmd link --yes --project $ProjectName | Out-Null
}
Write-Ok 'Projekt verlinkt'

Write-Step '4/8  Postgres und Blob anlegen'

$existingStores = (& $vercelCmd storage list 2>$null) -join "`n"

if ($existingStores -notmatch [regex]::Escape($DbName)) {
    Write-Host "    -> Erstelle Postgres '$DbName' in Region $Region ..."
    & $vercelCmd storage create postgres --name $DbName --region $Region
    if ($LASTEXITCODE -ne 0) { throw 'Postgres-Erstellung fehlgeschlagen.' }
} else {
    Write-Ok "Postgres '$DbName' existiert bereits"
}

if ($existingStores -notmatch [regex]::Escape($BlobName)) {
    Write-Host "    -> Erstelle Blob Store '$BlobName' ..."
    & $vercelCmd storage create blob --name $BlobName
    if ($LASTEXITCODE -ne 0) { throw 'Blob-Store-Erstellung fehlgeschlagen.' }
} else {
    Write-Ok "Blob '$BlobName' existiert bereits"
}

Write-Host '    -> Verbinde Stores mit dem Projekt ...'
& $vercelCmd storage connect $DbName   --project $ProjectName 2>$null | Out-Null
& $vercelCmd storage connect $BlobName --project $ProjectName 2>$null | Out-Null
Write-Ok 'Stores verbunden (Env-Variablen werden automatisch gesetzt)'

Write-Step '5/8  Environment-Variablen einrichten'

$authSecret = $null
$envOutput = & $vercelCmd env ls production 2>$null
if ($envOutput -notmatch 'AUTH_SECRET') {
    $bytes = New-Object byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $authSecret = [Convert]::ToBase64String($bytes)
    Write-Host '    -> AUTH_SECRET generiert.'
    $authSecret | & $vercelCmd env add AUTH_SECRET production
    $authSecret | & $vercelCmd env add AUTH_SECRET preview
    $authSecret | & $vercelCmd env add AUTH_SECRET development
}

if ($envOutput -notmatch 'VITE_MODE') {
    'showcase' | & $vercelCmd env add VITE_MODE production
    'showcase' | & $vercelCmd env add VITE_MODE preview
    'showcase' | & $vercelCmd env add VITE_MODE development
    Write-Ok 'VITE_MODE=showcase gesetzt'
}

if ($envOutput -notmatch 'AUTH_URL') {
    $url = "https://$ProjectName.vercel.app"
    $url | & $vercelCmd env add AUTH_URL production
    Write-Ok ('AUTH_URL=' + $url)
}

if ($envOutput -notmatch 'AUTH_RESEND_KEY') {
    Write-Host ''
    Write-Host '    Optional: Resend API key fuer Magic-Link-Emails (https://resend.com).'
    Write-Host '    Druecke ENTER zum Ueberspringen - du kannst es spaeter mit `vercel env add` nachholen.'
    $resend = Read-Host '    Resend API key (re_...)'
    if ($resend -and $resend.Trim().Length -gt 0) {
        $resend.Trim() | & $vercelCmd env add AUTH_RESEND_KEY production
        $resend.Trim() | & $vercelCmd env add AUTH_RESEND_KEY preview
        Write-Ok 'AUTH_RESEND_KEY gespeichert'
    } else {
        Write-Warn2 'Resend uebersprungen - Magic Links funktionieren erst nach Hinzufuegen.'
    }
}

if ($envOutput -notmatch 'EMAIL_FROM') {
    'FlamingoMedia <noreply@example.com>' | & $vercelCmd env add EMAIL_FROM production
    Write-Warn2 'EMAIL_FROM = Platzhalter. Bitte spaeter auf eine bei Resend verifizierte Domain aendern.'
}

& $vercelCmd env pull .env.development.local --environment=development | Out-Null
Write-Ok '.env.development.local geschrieben'

Write-Step '6/8  Datenbank-Schema deployen (drizzle-kit push)'
$env:DATABASE_URL = (Get-Content .env.development.local | Select-String '^POSTGRES_URL=' | ForEach-Object {
    ($_ -split '=', 2)[1].Trim('"')
})
if (-not $env:DATABASE_URL) {
    Write-Warn2 'POSTGRES_URL noch nicht in .env.development.local - kurz warten und neu pullen ...'
    Start-Sleep -Seconds 4
    & $vercelCmd env pull .env.development.local --environment=development | Out-Null
    $env:DATABASE_URL = (Get-Content .env.development.local | Select-String '^POSTGRES_URL=' | ForEach-Object {
        ($_ -split '=', 2)[1].Trim('"')
    })
}
npx drizzle-kit push
Write-Ok 'Schema deployed'

Write-Step '7/8  Showcase-Modus benoetigt keinen Tenant - ueberspringe Seed'
Write-Ok 'Showcase nutzt eingebaute Demo-Inhalte (DEMO_CONTENT)'

if ($SkipDeploy) {
    Write-Step '8/8  Deployment uebersprungen (--SkipDeploy)'
} else {
    Write-Step '8/8  Production-Deployment'
    & $vercelCmd --prod --yes
    if ($LASTEXITCODE -eq 0) {
        Write-Ok 'Deployment erfolgreich!'
    } else {
        Write-Warn2 'Deployment fehlgeschlagen. Logs oben pruefen, dann erneut: vercel --prod'
    }
}

Write-Host ''
Write-Host '╔════════════════════════════════════════════════════════════════════╗' -ForegroundColor Green
Write-Host '║  Setup abgeschlossen!                                              ║' -ForegroundColor Green
Write-Host '╚════════════════════════════════════════════════════════════════════╝' -ForegroundColor Green
Write-Host ''
Write-Host "  Showcase URL:     https://$ProjectName.vercel.app"
Write-Host '  Lokal entwickeln: npm run dev'
Write-Host ''
Write-Host '  Naechste Schritte:'
Write-Host '   1) Custom Domain in Vercel verbinden (Settings > Domains)'
Write-Host '   2) Resend Domain verifizieren und EMAIL_FROM aktualisieren'
Write-Host '   3) Ersten Kunden anlegen:  pwsh ./scripts/deploy-customer.ps1'
Write-Host ''
