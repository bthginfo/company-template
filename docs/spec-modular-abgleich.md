# Abgleich: CMS-Spec ↔ Code (Modular v1) & Provisioning

Stand: manueller Review-Leitfaden. Bei Schema-/Spec-Änderungen dieses Dokument mitaktualisieren.

## Vorgehen (wiederholbar)

1. **Spec** (`docs/spec-*.md`): alle Block-Typen (`type = …`) je Seite × Stil notieren.
2. **Blueprint** (`src/lib/modular-*-blueprints.ts`): `*ModularBlueprint(style, page)` — gleiche `type`-Strings in derselben Reihenfolge?
3. **Merge / Import** (`src/lib/modular-*.ts`, ggf. `modular-restaurant.ts` für Galerie/About/Kontakt): für jeden `type` existiert ein Pfad (`case` / `if (sec.type === …)`), der sinnvoll in `SiteContent` schreibt?
4. **Admin**: `Modular*Editor.tsx` / `ModularHotelEditor` / `ModularHomeEditor` — Sektionslabels aus dem Blueprint (`*_SECTION_LABEL_DE`)?

Hinweis: Nicht jeder Spec-Block muss vollständig alle Unterfelder mergen (z. B. verschachteltes `subpage`); siehe Spalte „Merge-Tiefe“.

---

## Restaurant

| Artefakt | Pfad |
|----------|------|
| Spec (Markdown) | Kein `docs/spec-restaurant.md`; fachliche Blockliste in Code/Blueprint |
| Blueprint | `src/lib/modular-restaurant-blueprints.ts` |
| Merge / Import | `src/lib/modular-restaurant.ts` |
| Admin | `src/admin/ModularHomeEditor.tsx` (`ModularRestaurantPageEditor`) |

**Abgleich:** Blueprint-Typen für Home/Services/Gallery/About/Contact sind in `mergeHomeIntoLegacy`, `mergeServicesIntoLegacy`, `mergeGalleryIntoLegacy`, `mergeAboutIntoLegacy`, `mergeContactIntoLegacy` abgedeckt (siehe `case`-Blöcke in `modular-restaurant.ts`). Bold-Home nutzt u. a. `featuredDishes` / `marqueeBand` — mit Merge-Pfaden.

**Offene Punkte (manuell prüfen):** Speisekarten-Detailfelder aus Items (`detail*`) vs. Perplexity-Export; News nur Teaser-Pfad, kein voller Artikel-Editor im Modular-JSON.

---

## Hotel

| Artefakt | Pfad |
|----------|------|
| Spec | `docs/spec-hotel.md` |
| Blueprint | `src/lib/modular-hotel-blueprints.ts` |
| Merge / Import | `src/lib/modular-hotel.ts` (+ geteilte Galerie/About/Kontakt aus `modular-restaurant.ts`) |
| Admin | `src/admin/ModularHotelEditor.tsx` |

**Abgleich:** Spec-Typen wie `featuredAreas`, `roomSelection`, `brandLogos`, `testimonialMarquee`, `accommodationsGrid`, `accommodationList`, `roomCards` tauchen in Blueprint und Hotel-Merge (Home/Services) auf.

**Offene Punkte:** Sehr lange Spec-Datei — bei neuen Spec-Blöcken zuerst Blueprint, dann `importHotel*` / `mergeHotel*`, dann Labels in `HOTEL_SECTION_LABEL_DE`.

---

## Tourismus

| Artefakt | Pfad |
|----------|------|
| Spec | `docs/spec-tourismus.md` |
| Blueprint | `src/lib/modular-tourism-blueprints.ts` |
| Merge / Import | `src/lib/modular-tourism.ts` |
| Admin | `src/admin/ModularTourismEditor.tsx` |

**Abgleich:** Touren-spezifische Typen (`tourSchedule`, `tourSelection`, `tourOverviewCards`, `tourCards` …) vs. `mergeTourism*` / `importTourism*`; geteilte Seiten wie Galerie nutzen Restaurant-Merge.

**Offene Punkte:** Spec-`brandLogos` / weitere Marketing-Blöcke mit Merge-Tiefe abgleichen; `hasSubpage` / URL-Slugs aus reinem `subpage`-Objekt (Mapper `readCatalogDetailBlock` in `modular-catalog-mappers.ts`).

---

## Salon

| Artefakt | Pfad |
|----------|------|
| Spec | `docs/spec-salon.md` |
| Blueprint | `src/lib/modular-salon-blueprints.ts` |
| Merge / Import | `src/lib/modular-salon.ts` |
| Admin | `src/admin/ModularSalonEditor.tsx` |

**Abgleich:** `serviceCards`, `featuredServices`, `serviceOverviewCards`, Treatments-Pfade in Merge/Import.

**Offene Punkte:** Bold/Modern-spezifische Zusatzsections in Spec vs. `salonModularBlueprint` Zeile für Zeile vergleichen.

---

## Handwerk (tradesman)

| Artefakt | Pfad |
|----------|------|
| Spec | `docs/spec-handwerk.md` |
| Blueprint | `src/lib/modular-tradesman-blueprints.ts` |
| Merge / Import | `src/lib/modular-tradesman.ts` |
| Admin | `src/admin/ModularTradesmanEditor.tsx` |

**Abgleich:** `stickyEmergencyBanner`, `fundingCalculator`, `featuredServices` / `serviceCards`, Galerie-`categoryCards`, News-Highlights.

**Offene Punkte:** Alle Spec-„Utility“-Blöcke auf `mergeTradesman*` prüfen; Förder-Items vs. `fundingItems`+`catalogItemDetailSchema`.

---

## Beratung (consulting)

| Artefakt | Pfad |
|----------|------|
| Spec | `docs/spec-beratung.md` |
| Blueprint | `src/lib/modular-consulting-blueprints.ts` |
| Merge / Import | `src/lib/modular-consulting.ts` |
| Admin | `src/admin/ModularConsultingEditor.tsx` |

**Abgleich:** `keywordBand` → Logos, `serviceCards`, Prozess-Sektionen, `pricingPackages`, Team, Galerie-Extras.

**Offene Punkte:** Extra-Template-spezifische Texte (`branchText`) vs. nur globale Felder.

---

## Praxen (medical)

| Artefakt | Pfad |
|----------|------|
| Spec | `docs/spec-praxen.md` |
| Blueprint | `src/lib/modular-medical-blueprints.ts` |
| Merge / Import | `src/lib/modular-medical.ts` |
| Admin | `src/admin/ModularMedicalEditor.tsx` |

**Abgleich:** `appointmentBooking` → `booking`, Ärzte-Listen, Services, Galerie.

**Offene Punkte:** Spec-„Compliance“- oder Trust-Blöcke mit eigenem Legacy-Feld?

---

## Fitness

| Artefakt | Pfad |
|----------|------|
| Spec | `docs/spec-fitness.md` |
| Blueprint | `src/lib/modular-fitness-blueprints.ts` |
| Merge / Import | `src/lib/modular-fitness.ts` |
| Admin | `src/admin/ModularFitnessEditor.tsx` |

**Abgleich:** `classCards` → `courses`, `pricingPackages` → `packages`, `trainers` → `team`, `trainingPlanOverview` → `numbers`.

**Offene Punkte:** Stats-Repeater-Feldnamen (Spec `description` vs. Legacy `label`) bei Import/Export konsistent halten.

---

## Provisioning & Tenant-Daten

### Aktuelles Verhalten (keine Pflichtänderung)

- `scripts/provision-tenant.ts` / `src/lib/provision-core.ts` seeden **`SiteContent`** über `DEMO_CONTENT` / `EXTRA_DEMO_CONTENT` und `SiteContentSchema.parse(…)`.
- **`modularPagesV1` ist optional** (`src/lib/types.ts`) und wird beim Provisionieren **nicht** gesetzt.
- Neue Mandanten starten mit **klassischen** Feldern; Spez-Modular ist im Admin **opt-in** („Aktivieren“).

Das ist konsistent und muss für lauffähiges Provisioning **nicht** geändert werden.

### Optionale Erweiterungen (nur bei Produktwunsch)

| Wunsch | Änderung |
|--------|----------|
| Neuer Tenant soll **sofort** Spez-JSON mitbringen | Nach `defaultsFor()` in `provision-core.ts` z. B. `importTourismModularFromLegacy(seed, style)` aufrufen und Ergebnis in `seed.modularPagesV1` legen; ggf. einmal `applyTourismModularToLegacy` für konsistente Legacy-Felder. Pro Template eigener Aufruf. |
| CLI-Flag `--spec-modular` | Analog nur wenn Flag gesetzt, sonst Verhalten wie heute. |
| Perplexity-Export enthält bereits `modularPagesV1` | `importContentJson` / `content-import.ts` muss weiterhin **deep-merge**-fähig sein (prüfen, ob Import Modular-Keys überschreibt oder ignoriert). |

### Content-JSON (`--content`)

- Wenn externe JSON-Dateien künftig `modularPagesV1` enthalten sollen, **Import-Pipeline** (`src/lib/content-import.ts`, `api/admin/import-content.ts`) gegen reale Beispiele testen.

---

## Nächste konkrete Arbeitsschritte

1. Pro Template eine **Diff-Liste**: Spec-`type`-Menge ∖ Menge der in `merge*` behandelten Typen → Tickets für fehlende Mapper.
2. **`check:drift`** erweitert **nicht** Modular — optional separates Script `scripts/check-modular-spec.ts` (Spec-Typen vs. Blueprint-Union).
3. Provisioning nur anfassen, wenn ihr **Default „Spez an“** wollt; sonst Dokumentation für Ops reicht (`RUNBOOK.md` kann auf dieses File verweisen).
