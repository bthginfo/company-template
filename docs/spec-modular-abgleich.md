# Abgleich: CMS-Spec ↔ Code (Modular v1) & Provisioning

> Status: Legacy reference. Tenant-facing CMS source of truth is now
> `cmsV2.enabled: true` + hydrated `modularPagesV2`. `modularPagesV1` remains
> only as compatibility/hydration input for old rows and imports.

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

### Aktuelles Verhalten

- `scripts/provision-tenant.ts` / `src/lib/provision-core.ts` seeden **`SiteContent`** über `DEMO_CONTENT` / `EXTRA_DEMO_CONTENT` und `SiteContentSchema.parse(…)`.
- Danach wird für die gewählte Branchen/Stil-Kombination `modularPagesV2` aus den Legacy/V1-Importern hydratisiert und `cmsV2.enabled` auf `true` gesetzt.
- Neue Mandanten starten damit sofort im passenden direkten Section-CMS. Der Admin darf nur Section-Typen anbieten, die `src/lib/cms-contract.ts` für `template × style × page` zurückgibt.
- `modularPagesV1` bleibt im Schema optional, damit bestehende Reihen und Hydration lesbar bleiben. Für neue Provisionings ist `modularPagesV2` der erwartete Standard.

### Import-Erweiterungen

| Thema | Regel |
|--------|----------|
| Perplexity-Export enthält Legacy- oder Modular-Daten | `importContentJson` / `content-import.ts` deep-mergt den Export und hydratisiert danach `modularPagesV2` für die Tenant-Template/Style-Kombination. |
| Neue Section-Typen | Erst Blueprint + `cms-contract.ts`-Pfad, dann Admin-Form, dann Merge/Frontend. `npm run check:drift` muss die neue Kombination abdecken. |

### Content-JSON (`--content`)

- Externe JSON-Dateien müssen keine `modularPagesV2` enthalten. Die Import-Pipeline (`src/lib/content-import.ts`, `api/admin/import-content.ts`) erzeugt die V2-Struktur nach dem Merge.

---

## Nächste konkrete Arbeitsschritte

1. Pro Template eine **Diff-Liste**: Spec-`type`-Menge ∖ Menge der in `merge*` behandelten Typen → Tickets für fehlende Mapper.
2. `check:drift` bleibt das Pflicht-Gate für Modular-Section-Abdeckung und Legacy-Feldabdeckung.
3. Feld-Level-Contracts sollten weiter in `cms-contract.ts` konsolidiert werden, damit Admin-Form-Felder künftig ebenso hart geprüft werden wie Section-Typen.
