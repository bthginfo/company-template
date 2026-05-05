# Phase 0 — CMS-Block-Spezifikation (verbindlich)

Dieses Dokument ist **Phase 0**: festgelegte Begriffe, Ziele, Wiederholbarkeit, Datenhoheit und Verweise auf den **bestehenden Code** als „Contract“. Umsetzung erfolgt ab Phase 1 im Code (`types`, Zod, Renderer, Admin).

**Kontext:** Es gibt noch **keine Live-Mandanten**. Breaking Changes und ein späterer **Cutover** (ohne Legacy-Migration) sind **explizit erlaubt** — Ziel ist ein **vollständiges CMS**, nicht Abwärtskompatibilität zu `sectionOrder` / `modularPagesV1`.

---

## 1. Ziele (Produkt)

| Anforderung | Kurzdefinition |
|---------------|----------------|
| **Vollständigkeit** | Jede im Frontend sichtbare Sektion hat bearbeitbare Felder; keine „toten“ Admin-Karten ohne Renderer (bzw. umgekehrt). |
| **Wiederholbarkeit** | Mehrere Blöcke **desselben Typs** auf derselben Seite (z. B. zweite Galerie-Teaser, zweiter Teaser-Text), sofern der Typ nicht als **Singleton** geführt wird (siehe Abschnitt 4). |
| **Alle Seiten** | `home`, `services`, `gallery`, `about`, `contact` — jeweils für alle **acht** Templates (`TemplateKey`). |
| **Look** | Unveränderte Branchen/Stil-Optik: nur **Datenfluss** und **Kompositionsmodell** ändern, nicht das visuelle Design der bestehenden JSX-Blöcke. |
| **Governance** | Nur **bereits modellierte** Block-Typen — keine freien „Custom HTML“-Sektionen in Phase 1–3 (optional später). |

---

## 2. Kanonischer Block-Typ (`type`)

**Einheitlicher Typ-String:** `AdminSectionKey` aus  
[`src/admin/admin-sections.ts`](../src/admin/admin-sections.ts).

Begründung:

- Bereits **union-typisiert** (`AdminSectionKey`).
- [`getAdminSections(page, tpl, style)`](../src/admin/admin-sections.ts) definiert, **welche** Sektionen der Admin pro Seite/Template/Stil führt.
- [`SECTION_CONTRACTS`](../src/lib/section-registry.ts) listet pro Key die **`SiteContent`-Pfade** (`dataKeys`), die Drift-Checks (`npm run build` / `check-coverage`) admin↔frontend koppeln.

**Namenskonvention für das neue CMS-JSON (ab Phase 1, Arbeitstitel):**

```ts
/** Arbeitstitel — endgültiger Feldname in Phase 1 in types.ts festlegen */
interface PageBlockInstanceV1 {
  /** Stabil, z. B. crypto.randomUUID() */
  id: string;
  /** = AdminSectionKey (siehe `src/admin/admin-sections.ts`) */
  type: AdminSectionKey;
  /** Default: true */
  isVisible?: boolean;
  /**
   * Sektions-lokale Nutzdaten (siehe Abschnitt 5).
   * Struktur pro `type` in Phase 1 per Zod ableiten.
   */
  data: Record<string, unknown>;
}

type PageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

type PageBlocksV1 = Partial<Record<PageKey, PageBlockInstanceV1[]>>;
```

`pageBlocksV1` (Typ **`PageBlocksV1`**) wird **eine Zeile** in `siteContent` (additiv bis Cutover), später **alleinige Quelle** für Seitenaufbau (Phase 5).

---

## 3. Eligibility — welcher Block-Typ wo erlaubt ist

**Algorithmus (normativ):** Ein Block-Typ `T` ist für `(page, tpl, style)` **zulässig**, wenn `T` in der Menge  

`getAdminSections(page, tpl, style)` (siehe [`admin-sections.ts`](../src/admin/admin-sections.ts))  

vorkommt **oder** (nur **Home**, Extras) in `getCatalogForVariant('home', tpl, style)` über [`buildHomeAdminOrderFromFrontend`](../src/admin/admin-sections.ts) für dieses `(tpl, style)` zusätzlich auftaucht.

**Hinweis:** `HANDLED_SECTIONS_BY_PAGE` in `admin-sections.ts` ist die Obermenge der Keys, für die `AdminEditorBody` **Cases** hat — **nicht** jeder Key erscheint in **jeder** `(tpl, style)`-Kombination. Die **tatsächliche** erlaubte Palette für „+ Sektion hinzufügen“ leitet sich **nur** aus `getAdminSections` + obiger Extra-Home-Regel ab.

### 3.1 Home — Layout-Reihenfolge (Frontend)

Die **gerenderte** Home-Reihenfolge der Kern-5 kommt aus  
[`getEffectiveHomeSectionKeys`](../src/lib/effective-home-order.ts) + `BRANCH_STYLE_ORDER` in [`template-orders.ts`](../src/lib/template-orders.ts), **sofern** `pageBlocksV1.home` leer ist oder Phase 5 keinen Slot ableiten kann — sonst [`resolveLayoutSlotOrder`](../src/lib/page-blocks-v1-slot-order.ts).  
Extras: gleiche Helper, inkl. Katalog-Erlaubnis wie bisher `ExtraBranchTemplate`.

**Phase-0-Entscheidung:** Das CMS-Home darf **mehr Instanzen** enthalten als die aktuelle Slot-Liste — z. B. zwei `gallery`-Instanzen — **sofern** der Renderer (Phase 3) **alle** Instanzen nacheinander rendert; Singleton-Regeln (Abschnitt 4) gelten trotzdem für ausgewählte Typen.

### 3.2 Services — Branchen-Module (Kurzreferenz)

Die **dynamischen** Service-Blöcke kommen aus `getBranchConfig(tpl).services.modules` → Mapping `MODULE_TO_KEY` in [`admin-sections.ts`](../src/admin/admin-sections.ts).

| Template | `services.modules` (aktuell) |
|----------|--------------------------------|
| `restaurant` | `menu` |
| `salon` | `treatments` |
| `tradesman` | `funding`, `emergencyBanner` |
| `hotel` | `rooms` |
| `tourism` | `tours` |
| `consulting` | `processSteps`, `packages` |
| `medical` | `medicalNotice`, `doctors`, `booking` |
| `fitness` | `programs`, `courses`, `packages` |

Weitere **feste** Service-Keys (sofern in `servicesOrder` für das Template aktiv): u. a. `servicesHeader`, `highlights`, `servicesList` / `extraServiceCards`, `serviceProcess`, `faq`, `servicesCta` — exakt wie [`servicesOrder()`](../src/admin/admin-sections.ts).

### 3.3 Gallery / About / Contact

Vollständige Reihenfolge und Flags: [`galleryOrder` / `aboutOrder` / `contactOrder`](../src/admin/admin-sections.ts) in Kombination mit [`getBranchConfig(tpl)`](../src/lib/branch-config.ts) (`cfg.gallery.*`, `cfg.about.*`, `cfg.contact.*`).

---

## 4. Wiederholbarkeit (Multiplicity)

| Klasse | Block-Typen (`AdminSectionKey`) | Regel |
|--------|----------------------------------|--------|
| **Singleton (max. 1 pro Seite)** | `hero`, `announcements`, `servicesHeader`, `galleryHeader`, `aboutHeader`, `contactHeader` | Genau eine Instanz; Admin verhindert zweites Anlegen (oder merge-replace). |
| **Singleton sinnvoll (max. 1 empfohlen, technisch ausbaubar)** | `actionStrip`, `branchChips`, `marquee`, `softCta`, `contact` (nur extras), `contactForm`, `booking`, … | Phase 1: hart **1**; später lockern, falls Produkt es will. |
| **Standard: wiederholbar** | Alle übrigen Keys in `getAdminSections` | Mehrere Instanzen erlaubt; jede hat eigenes `data` (Abschnitt 5). |

**Phase-0-Entscheidung:** Standardfall ist **unbegrenzt wiederholbar**; Singletons sind die **Ausnahme** und explizit oben gelistet.

---

## 5. Datenhoheit bei mehrfachen Blöcken (kritisch)

**Problem heute:** Viele `dataKeys` in [`SECTION_CONTRACTS`](../src/lib/section-registry.ts) zeigen auf **globale** `SiteContent`-Felder (`gallery`, `about.body`, …). Zwei `gallery`-Instanzen dürfen **nicht** dieselben globalen Keys überschreiben.

**Phase-0-Entscheidung (ohne Legacy):**

1. **Primär:** Jeder `PageBlockInstanceV1` hält die für die Darstellung nötigen Felder in **`data`** (denormalisiert / strukturiert pro Typ).  
2. **Renderer (Phase 3):** Liest **nur** `instance.data` (+ weiterhin globale Dinge wie `brand`, `nav`, wo sinnvoll explizit ausgenommen).  
3. **Globale `SiteContent`-Felder:** Werden wo nötig nur noch als **Default-Seed** beim Anlegen eines Blocks oder für **querschnittliche** Daten genutzt; nach Cutover keine Konflikte mehr durch doppelte Keys.

**Globale Ausnahmen (Phase 0):** Felder, die **keine** „Sektion“ sind: z. B. `brand`, `navItems`, `footer`, `customScripts`, Theme — bleiben auf Root-Ebene; nicht in `pageBlocksV1`.

---

## 6. Mapping: Block-Typ → Daten-Vertrag

**Normative Quelle:** Für jeden `AdminSectionKey` `K` gilt: die Menge der relevanten Inhalts-Pfade ist `SECTION_CONTRACTS[K].dataKeys` in [`section-registry.ts`](../src/lib/section-registry.ts).

**Phase 1-Aufgabe:** Pro `K` ein **Zod-Partial** für `instance.data`, das:

- entweder die `dataKeys` als verschachteltes Objekt abbildet, **oder**
- eine absichtlich vereinfachte „Editor-Form“-Struktur definiert und beim Speichern normalisiert.

Drift-Tooling wird in späteren Phasen auf **„Instanz-Daten + Renderer“** erweitert oder parallel zu den heutigen grep-basierten Checks geführt.

---

## 7. Layout-Katalog vs. CMS-Blöcke (Begriffsklärung)

| Begriff | Datei / Verwendung |
|---------|-------------------|
| `SECTION_CATALOG` / `sectionOrder` | [`page-layout.ts`](../src/lib/page-layout.ts) — **heutiges** Layout-Modell (String-Keys, max. einmal pro Key in `getRemainingSections`). **Fallback**, wenn `pageBlocksV1[page]` leer ist oder Phase 5 keinen abbildbaren Slot ableiten kann. |
| `modularPagesV1` | Spec-Modular mit `type` + `data` — **parallel** zum alten Modell; Ziel-Cutover: Inhalte/Struktur in `PageBlocksV1` überführen oder entfernen (kein Muss für Live, da keine Kunden). |
| `AdminSectionKey` + `SECTION_CONTRACTS` | **CMS-Phase-1+** — kanonische Typen und Feld-Verträge. |

---

## 8. Out of Scope (Phase 0)

- Implementierung (`types`, API, Admin-UI, Renderer).
- Migrations-Skripte für bestehende Mandanten (nicht nötig laut Vorgabe).
- Workflow (Entwurf/Freigabe), Medienbibliothek, Rollenrechte über das hinaus, was schon existiert.
- Neue visuelle Templates oder neue Branchen.

---

## 9. Checkliste — Übergabe an Phase 1

- [x] `pageBlocksV1` in [`src/lib/types.ts`](../src/lib/types.ts) als **optionales** Root-Feld (`PageBlocksV1Schema` / `PageBlockInstanceV1Schema`).
- [x] Struktur + Singletons: [`src/lib/page-blocks-v1-validate.ts`](../src/lib/page-blocks-v1-validate.ts), eingebunden über `SiteContentSchema.superRefine`.
- [~] Pro `AdminSectionKey`: **Top-Level-Keys** von `instance.data` gegen `SECTION_CONTRACTS[*].dataKeys`-Wurzeln validiert (siehe `collectPageBlocksV1Issues`); **tiefe** typspezifische Zod-Schemas pro Block-Typ → Backlog (nach Phase 4 Admin).
- [x] API `content` PUT: bleibt bei `SiteContentSchema.safeParse` — ungültige `pageBlocksV1` liefern 400.
- [x] Admin „Seiten“-UI: **eine** wiederverwendbare Oberfläche mit `page: PageKey` (gleiche Komponente, unterschiedliche Tabs/Routes pro Seite) — keine parallelen divergierenden Editoren für dasselbe Modell.

---

## 10. Phase 5 (Renderer-Slot-Reihenfolge) — Stand

**Ziel:** Wenn `pageBlocksV1[page]` eine **nicht-leere** Liste sichtbarer Instanzen hat, bestimmt deren **Reihenfolge** die Reihenfolge der **Layout-Slots** im Renderer (nicht nur die Daten aus Phase 3).

**Umsetzung:** [`src/lib/page-blocks-v1-slot-order.ts`](../src/lib/page-blocks-v1-slot-order.ts)

- `adminSectionToCatalogSlot(page, admin)` mappt `AdminSectionKey` → String-**Slot** wie in den `blocks`-Maps von `TemplateApp` / `ExtraBranchTemplate` (Home nutzt `HOME_CATALOG_BLOCK_TO_ADMIN`; Unterseiten eigene Tabellen `SERVICES_SLOT`, `GALLERY_SLOT`, …).
- `resolveLayoutSlotOrder({ page, content, legacyOrder, availableSlots })` liest `content.pageBlocksV1[page]`, überspringt `isVisible === false`, mappt jeden Block auf einen Slot, **filtert** auf Slots, die der jeweilige Render-Pfad wirklich hat (`availableSlots`), und gibt diese Liste zurück. **Leeres** Ergebnis → Fallback auf `legacyOrder` (`getEffectiveHomeSectionKeys` / `getEffectivePageOrder` + `isSectionEnabled` wie bisher).

**Eingebunden in:** [`TemplateApp.tsx`](../src/templates/_shared/TemplateApp.tsx) (alle Home-Stile, Services, Galerie, Über uns, Kontakt) und [`ExtraBranchTemplate.tsx`](../src/templates/_shared/extra/ExtraBranchTemplate.tsx) (Classic/Modern/Bold-Home + `SubPage`). React-Keys nutzen bei Wiederholung desselben Slots `${slot}-${index}`.

---

## 11. Phase 3 (Renderer) — Stand

**Ziel:** Sichtbare Seiten nutzen Inhalte aus `pageBlocksV1[*][].data`, sobald Patches vorliegen.

**Umsetzung (MVP):** [`src/lib/page-blocks-v1-page-merge.ts`](../src/lib/page-blocks-v1-page-merge.ts)

- Nach `withModularSiteContent` (falls zutreffend) werden alle **sichtbaren** Blöcke einer Seite in Array-Reihenfolge per `deepMergeJson` auf `SiteContent` gelegt und mit `SiteContentSchema.safeParse` normalisiert.
- Die **Reihenfolge der Sektions-Slots** folgt **`resolveLayoutSlotOrder`** (Phase 5), sobald `pageBlocksV1[page]` nicht leer ist; sonst unverändert `getEffectiveHomeSectionKeys` / `getEffectivePageOrder`.

**Eingebunden in:** `TemplateApp` (Home, Services, Galerie, Über uns, Kontakt) und `ExtraBranchTemplate` (Home-Layouts + `SubPage`).

---

## 12. Phase 4 (Admin) — Stand

**Ziel:** Bearbeitung von `pageBlocksV1` im Admin ohne parallele divergierende Oberflächen.

**Umsetzung:** [`src/admin/PageBlocksV1Panel.tsx`](../src/admin/PageBlocksV1Panel.tsx)

- Wird pro **Layout-Seite** (`PageKey`) unter dem bestehenden Seiten-Editor in [`AdminEditorBody.tsx`](../src/admin/AdminEditorBody.tsx) gerendert (gleiche Komponente, Prop `page`).
- Aktionen: **Seite neu aus Feldern** (`rebootstrapPageBlocksForSinglePage`), Reihenfolge (↑/↓), Sichtbarkeit, **Aus Feldern** pro Block (`projectSiteContentToBlockData`), **data** als JSON mit Validierung (`collectPageBlocksV1Issues`), Block **hinzufügen** / **entfernen** (Singleton-Regel über `isPageBlockSingletonType`).

---

## 13. Referenz — zentrale Dateien

| Thema | Datei |
|--------|--------|
| Admin-Reihenfolge / Keys | [`src/admin/admin-sections.ts`](../src/admin/admin-sections.ts) |
| Datenpfade pro Sektion | [`src/lib/section-registry.ts`](../src/lib/section-registry.ts) |
| Katalog + `sectionOrder` (Legacy-Konzept) | [`src/lib/page-layout.ts`](../src/lib/page-layout.ts) |
| Home-Slot-Reihenfolge (aktueller Renderer) | [`src/lib/effective-home-order.ts`](../src/lib/effective-home-order.ts), [`src/lib/template-orders.ts`](../src/lib/template-orders.ts) |
| Kern-Renderer | [`src/templates/_shared/TemplateApp.tsx`](../src/templates/_shared/TemplateApp.tsx) |
| Extras-Renderer | [`src/templates/_shared/extra/ExtraBranchTemplate.tsx`](../src/templates/_shared/extra/ExtraBranchTemplate.tsx) |
| Phase-3-Daten-Merge | [`src/lib/page-blocks-v1-page-merge.ts`](../src/lib/page-blocks-v1-page-merge.ts) |
| Phase-5-Slot-Reihenfolge | [`src/lib/page-blocks-v1-slot-order.ts`](../src/lib/page-blocks-v1-slot-order.ts) |
| Phase-4-Admin-Panel | [`src/admin/PageBlocksV1Panel.tsx`](../src/admin/PageBlocksV1Panel.tsx) |

---

*Version: Phase 0, Stand laut Repo-Stand beim Anlegen dieses Dokuments. Änderungen nur bewusst per PR; bei Abweichung Code vs. Spez gilt: Spez anpassen **oder** Code anpassen — nicht beides dauerhaft divergierend lassen.*
