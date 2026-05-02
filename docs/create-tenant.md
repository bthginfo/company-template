# Neuen Kunden (Tenant) anlegen

> **🤖 AI-AGENT: Lies diese Datei KOMPLETT durch, bevor du ein Skript ausführst.**
> Lies außerdem [AGENTS.md](../AGENTS.md) für allgemeine Repository-Regeln.
>
> **Zielgruppe:** AI-Agenten und menschliche Entwickler.
> Folge die Schritte exakt in der angegebenen Reihenfolge.

---

## Überblick

Es gibt **drei Wege**, einen Tenant anzulegen — sortiert nach Komplexität:

| Methode | Was sie tut | Wann verwenden |
|---|---|---|
| `scripts/create-tenant.ts` | Erstellt nur den DB-Eintrag (Tenant-Zeile + Seed-Content). **Kein** Vercel-Projekt. | Schnelltest, lokale Entwicklung |
| `scripts/provision-tenant.ts` | DB + Vercel-Projekt erstellen + Env-Vars setzen + Deploy triggern | Produktion (einzelner Befehl) |
| `scripts/new-tenant.ps1` | PowerShell-Wrapper um `provision-tenant.ts` mit interaktivem Prompt und Validierung | Produktion (bevorzugt auf Windows) |

---

## 1. Voraussetzungen

```
# Im Projekt-Root:
npm install          # Abhängigkeiten installieren
cp .env.example .env.local   # Falls noch nicht vorhanden
```

In `.env.local` müssen mindestens gesetzt sein:

| Variable | Zweck |
|---|---|
| `POSTGRES_URL` | Neon-Datenbankverbindung |
| `AUTH_SECRET` | Shared Secret für alle Tenants |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob-Zugriff |
| `VERCEL_TOKEN` | Nur für `provision-tenant.ts` / `new-tenant.ps1` |
| `VERCEL_TEAM_ID` | Nur für `provision-tenant.ts` / `new-tenant.ps1` |

---

## 2. Gültige Parameter

### Templates (Branchen)

| Template | Beschreibung |
|---|---|
| `restaurant` | Gastronomie — Speisekarte, Reservierung |
| `salon` | Friseursalon / Beauty — Dienstleistungen, Team |
| `tradesman` | Handwerksbetrieb — Referenzen, Leistungen |
| `hotel` | Hotel / Pension — Zimmer, Anreise |
| `tourism` | Tourismus / Aktivitäten — Erlebnisse |
| `consulting` | Beratung / Agentur — Kompetenzen, Kunden |
| `medical` | Arztpraxis / Gesundheit — Leistungen, Team |
| `fitness` | Fitnessstudio / Sport — Kurse, Preise |

### Styles

| Style | Beschreibung |
|---|---|
| `classic` | Konservativ, traditionell (Standard) |
| `modern` | Zeitgemäß, clean |
| `bold` | Kräftig, auffällig |

### Alle 24 gültigen Kombinationen

Jede Template × Style-Kombination ist gültig:

```
restaurant  × classic | modern | bold
salon       × classic | modern | bold
tradesman   × classic | modern | bold
hotel       × classic | modern | bold
tourism     × classic | modern | bold
consulting  × classic | modern | bold
medical     × classic | modern | bold
fitness     × classic | modern | bold
```

---

## 3. Methode A: Nur DB (`create-tenant.ts`)

### Syntax

```bash
npx tsx scripts/create-tenant.ts <slug> "<Name>" <template> [style]
```

### Parameter

| # | Name | Pflicht | Beschreibung |
|---|---|---|---|
| 1 | `slug` | ✅ | URL-Slug (Kleinbuchstaben, Ziffern, Bindestriche). 2–48 Zeichen. |
| 2 | `name` | ✅ | Anzeigename in Anführungszeichen, z. B. `"Pizzeria Roma"` |
| 3 | `template` | ✅ | Einer der 8 Templates (siehe oben) |
| 4 | `style` | ❌ | `classic`, `modern` oder `bold`. Standard: `classic` |

### Beispiele

```bash
# Restaurant im Classic-Stil
npx tsx scripts/create-tenant.ts pizzeria-roma "Pizzeria Roma" restaurant

# Fitnessstudio im Bold-Stil
npx tsx scripts/create-tenant.ts power-gym "Power Gym" fitness bold

# Beratung im Modern-Stil
npx tsx scripts/create-tenant.ts innovate-consulting "Innovate Consulting" consulting modern
```

### Was passiert

1. Prüft ob Slug/Template/Style gültig
2. Generiert ein zufälliges 16-Zeichen-Passwort
3. Falls Tenant existiert → aktualisiert Name, Template, Style, Passwort
4. Falls Tenant neu → legt DB-Zeile an + Seed-Content via `provision-core.defaultsFor()`
5. Gibt Zugangsdaten und benötigte Vercel-Env-Vars aus

### Erwartete Ausgabe

```
Tenant 'pizzeria-roma' created with default content.

──────────────────────────────────────────
  Tenant:   Pizzeria Roma
  Slug:     pizzeria-roma
  Template: restaurant
  Style:    classic
  Password: Abc123XYZ...
──────────────────────────────────────────

Set these env vars on the customer's Vercel project:
  TENANT_SLUG=pizzeria-roma        (server)
  VITE_TENANT_SLUG=pizzeria-roma   (client)
  VITE_TEMPLATE=restaurant         (client)
  VITE_STYLE=classic               (client)
  AUTH_SECRET=<same as main>
  POSTGRES_URL=<same Neon url>
  BLOB_READ_WRITE_TOKEN=<same Blob token>
```

---

## 4. Methode B: Vollständige Provisionierung (`provision-tenant.ts`)

### Syntax

```bash
npx tsx scripts/provision-tenant.ts <slug> "<Name>" <template> [style] [--password <pw>] [--content <file.json>] [--reseed] [--preset <id>]
```

### Zusätzliche Parameter

| Flag | Beschreibung |
|---|---|
| `--password <pw>` | Setzt ein initiales Admin-Passwort (min. 8 Zeichen). Wenn leer, wird ein zufälliges generiert. |
| `--content <file>` | Pfad zu einer Content-JSON-Datei (Perplexity-Export). Content wird nach dem Provisioning importiert. |
| `--reseed` | Überschreibt bestehenden Seed-Content |
| `--preset <id>` | Wendet ein Theme-Preset an (z. B. `espresso`) |

### Was passiert (zusätzlich zu Methode A)

1. Erstellt ein **Vercel-Projekt** mit GitHub-Anbindung
2. Setzt alle Env-Vars automatisch (TENANT_SLUG, VITE_*, Shared Vars)
3. Triggert einen Deployment
4. Schreibt Zugangsdaten in `.tenant-credentials.txt` (gitignored)

### Benötigte Env-Vars

Zusätzlich zu `POSTGRES_URL`, `AUTH_SECRET`, `BLOB_READ_WRITE_TOKEN`:

- `VERCEL_TOKEN` — API-Token mit Projektrechten
- `VERCEL_TEAM_ID` — Team-ID des Vercel-Accounts

---

## 5. Methode C: PowerShell-Wrapper (`new-tenant.ps1`)

### Syntax

```powershell
.\scripts\new-tenant.ps1 -Slug <slug> -Name "<Name>" -Template <template> -Style <style> [-Password <pw>] [-ContentJson <file.json>] [-Reseed] [-NonInteractive]
```

### Beispiel

```powershell
# Standard-Provisionierung
.\scripts\new-tenant.ps1 -Slug bella-vista -Name "Bella Vista" -Template restaurant -Style modern -Password MeinPasswort123 -NonInteractive

# Mit vorbefülltem Content aus Perplexity
.\scripts\new-tenant.ps1 -Slug bella-vista -Name "Bella Vista" -Template restaurant -Style modern -ContentJson ./bella-vista-content.json -NonInteractive
```

Ruft intern `provision-tenant.ts` auf, mit zusätzlicher Eingabevalidierung und interaktivem Modus.

---

## 6. Seed-Content (was automatisch erstellt wird)

Die Funktion `defaultsFor(template, name)` in `src/lib/provision-core.ts` erzeugt den Seed-Content. Dieser enthält:

| Feld | Beschreibung |
|---|---|
| `brand.name` | = Anzeigename des Tenants |
| `hero.title` | = Anzeigename des Tenants |
| `branchText` | Branchenspezifische Labels (aus `branch-text-defaults.ts`) |
| `faq` | Standard-FAQ (aus `faq-defaults.ts`) |
| `galleryStory` | Standard-Galerie-Story (aus `section-defaults.ts`) |
| `galleryCategories` | Standard-Kategorien (aus `section-defaults.ts`) |
| `arrival` | Anreise-Informationen (aus `section-defaults.ts`) |
| `contact` | Leer: phone, email, address, mapsUrl sind `""` |
| `services` | Demo-Dienstleistungen (branchenspezifisch) |
| `testimonials` | Demo-Bewertungen (nur Full-Branches) |

**Wichtig:** Kontaktdaten (Telefon, E-Mail, Adresse) werden bewusst **leer** geseeded — muss der Kunde selbst im Admin eintragen.

---

## 7. Architektur-Hinweis

```
scripts/new-tenant.ps1          ← PowerShell-Wrapper (interaktiv)
  └── scripts/provision-tenant.ts  ← CLI-Wrapper (arg parsing, console output)
        └── src/lib/provision-core.ts ← Pure Logic (DB + Vercel API)
              ├── defaultsFor()        ← Seed-Content-Builder
              └── provisionTenant()    ← Vollständige Provisionierung

scripts/create-tenant.ts        ← Lightweight DB-only Creator
  └── src/lib/provision-core.ts
        └── defaultsFor()

src/lib/content-import.ts       ← Content-Import (Perplexity JSON → DB deep-merge)
api/admin/import-content.ts     ← API-Endpoint für Content-Import (CRM + Admin)
docs/content-template.json      ← JSON-Template für Perplexity Space
docs/perplexity-prompt.md       ← System-Prompt für Perplexity Space

src/lib/branch-config.ts        ← Single Source of Truth für Branch×Style Sichtbarkeit
```

---

## 8. Häufige Fehler

| Fehler | Ursache | Lösung |
|---|---|---|
| `Template "X" ungültig` | Template falsch geschrieben | Nur die 8 gültigen Templates verwenden |
| `Style "X" ungültig` | Style falsch geschrieben | `classic`, `modern` oder `bold` |
| `VERCEL_TOKEN env var not set` | `.env.local` fehlt | `cp .env.example .env.local` und Werte eintragen |
| `Slug "X" ist reserviert` | Reservierter Slug | Anderen Slug wählen (z. B. nicht `admin`, `api`, `www`) |
| Tenant existiert schon | Slug bereits vergeben | Anderer Slug verwenden, oder `--reseed` wenn Content überschrieben werden soll |

---

## 9. Smoketest

Vor der Auslieferung: Smoketest ausführen um alle 24 Branch×Style-Kombos zu validieren:

```bash
npx tsx scripts/smoketest-branch-config.ts
```

Erwartete Ausgabe: `✓ All 24 branch×style combinations pass.`

---

## 10. Checkliste für AI-Agenten

Wenn du als AI einen neuen Kunden anlegen sollst:

1. **Frage den Nutzer** nach: Slug, Name, Template, Style
2. **Validiere** den Slug: 2–48 Zeichen, nur `[a-z0-9-]`, kein führender/letzter Strich
3. **Prüfe** ob Template und Style gültig sind (Tabelle oben)
4. **Wähle das richtige Skript:**
   - Nur DB/Test → `scripts/create-tenant.ts`
   - Produktion → `scripts/new-tenant.ps1` (Windows) oder `scripts/provision-tenant.ts`
5. **Führe den Befehl aus** mit exakter Syntax
6. **Speichere das Passwort** aus der Ausgabe — es wird nur einmal angezeigt
7. **Teile dem Nutzer** Slug, Passwort und Login-URL mit
