# Admin ↔ Frontend — Gap-Audit **Unterseiten** (Services, Galerie, Über uns, Kontakt)

Stand: interne Code-Analyse (`getAdminSections`, `TemplateApp`, `ExtraBranchTemplate`, `page-layout`, `branch-config`).  
Ziel: für jede Unterseite festhalten, **wo Admin und Live-Site übereinstimmen**, wo **Style** eine Rolle spielt, und **bekannte Lücken** für manuelle QA.

---

## Kurzfassung

| Thema | Status |
|--------|--------|
| **Sektions-Reihenfolge (Admin-Sidebar)** | Leitet sich aus **`getBranchConfig(tpl)`** ab (`servicesOrder`, `galleryOrder`, `aboutOrder`, `contactOrder`). Der Parameter **`style`** wird dort **nicht** für die Liste genutzt (`_style`). |
| **Gleiche Sektionsliste für classic / modern / bold** | Für alle **8 Branchen** auf jeder Unterseite: **ja** — solange `getAdminSections(page, tpl, style)` nur diese Funktionen nutzt. |
| **Style auf der Live-Seite** | Kern-`TemplateApp`: viele Blöcke **gleiche Keys**, aber **anderes Layout** (z. B. `list` auf Services: classic vs modern vs bold). **Extras**: `SubPage` nutzt `style` in Komponenten (z. B. Karten, Hero). |
| **„Nur relevante“ Admin-Karten** | **Branche:** ja, über Flags + Module. **Style:** auf Unterseiten **nicht** über eine kürzere Sektionsliste — ggf. irrelevante *Karten* (selten), **Felder** in Karten oft über `$s` / `isBranchTextKeyVisible`. |
| **Automatische Garantie** | `npm run build` / `check:drift` prüfen **Contract-Keys** und **Handler-Cases**, **nicht** jede Zeile „wird in Style X wirklich gebraucht“. |

---

## 1. Services (`/speisekarte`, `/leistungen`, `/zimmer`, `/touren`, …)

### Admin (`admin-sections.ts` → `servicesOrder`)

Reihenfolge: `servicesHeader` → optional `extraServiceCards` (nur **Extras**) → optional `highlights` (`cfg.services.showHighlights`) → **Module** aus `cfg.services.modules` in Config-Reihenfolge → optional `serviceProcess` → optional `faq` → optional `servicesCta`.

### Frontend Kern (`TemplateApp` → `ServicesPage`)

- **Order:** `getEffectivePageOrder(content, 'services', variant)` + `isSectionEnabled`.
- **Default:** `page-layout` `getDefaultSubpageOrder` (z. B. Restaurant ohne doppelte `list`).
- **Style:** wirkt auf **`list`** (Classic vs Modern Grid vs Bold List), Hero-Bild (`PageHero` `image` bei modern), Section-Klassen — **nicht** auf die **Menge** der Keys im `blocks`-Record.

### Frontend Extras (`ExtraBranchTemplate` → `SubPage` services)

- **Order:** `extraSubpageOrder` → `getEffectivePageOrder` + Branch-Defaults (medical vs andere).
- **Style:** u. a. `ExtraLeistungenServiceCards`, `BranchSpotlight`, Testimonials-Band.

### Bekannte Lücken / QA-Punkte

1. **Admin-Sektionsliste hängt nicht am Style** — gewollt oder später: z. B. eigene `PerStyle`-Flags in `branch-config`, wenn eine Sektion nur in **einem** Style auf der Leistungsseite erscheinen soll.
2. **Leere Daten:** z. B. `testimonials` liefert `null`, wenn keine Einträge — Sektion kann in der Order stehen, Seite zeigt nichts; Admin-Karte existiert trotzdem → **inhaltlich prüfen** (Demo-Daten vs. leer).
3. **Extras:** `extraServiceCards` nur im Admin für Extras; Frontend nutzt andere Komponenten für die Liste — inhaltlich dieselbe `content.services`, **Drift** deckt die Keys ab.

**Manuelle QA:** je **eine** Kern-Branche + **ein** Extra, alle drei Styles: Leistungsseite öffnen, Reihenfolge mit Admin-Layout-Manager vergleichen, Highlights/Module/FAQ/CTA toggeln.

---

## 2. Galerie (`/galerie`, `/referenzen`, …)

### Admin → `galleryOrder`

`galleryHeader` → optional `galleryStory` / `galleryUpload` (Flags) → immer `galleryGrid` → optional `galleryCategories` → optional `galleryCta`.

### Frontend Kern → `GalleryPage`

- **Order:** `getEffectivePageOrder` + `isSectionEnabled`.
- **Style:** **`grid`** rendert `MasonryGrid` (bold) / `ModernGalleryGrid` (modern) / `GalleryShowcase` (classic) — gleicher Key `grid`.

### Frontend Extras → `SubPage` gallery

Story, Grid, Categories, Testimonials, CTA — Order wie Default + Tenant-Override.

### Bekannte Lücken / QA-Punkte

1. Wie bei Services: **keine style-abhängige Admin-Sektionsliste**; Style nur in der **Darstellung** des Grids.
2. **`testimonials`** auf Galerie-Kern: Block nur wenn `content.testimonials.length > 0` — kann in `sectionOrder` stehen und trotzdem leer bleiben → **QA:** leere Testimonials + Sichtbarkeit.
3. **`galleryUpload`:** nur relevant, wenn Frontend/Config Upload-Bereich wirklich zeigt — mit **branch-config** `showUpload` abgleichen.

**Manuelle QA:** tradesman (Referenzen-Pfad) + ein Extra; Bold vs Classic: Grid-Typ und Story-Toggle.

---

## 3. Über uns (`/ueber-uns`, …)

### Admin → `aboutOrder`

`aboutHeader`, `aboutIntro` → optional `values` / `timeline` → immer `team` → optional `aboutNumbers` → optional `certifications` / `press` (nur wenn in `cfg.about.extras`) → optional `aboutTestimonials`, `aboutCta`.

### Frontend Kern → `AboutPage`

- **Order:** `getEffectivePageOrder` + `isSectionEnabled`.
- **Style:** **`intro`** ist unterschiedlich (Classic/Bold mit Parallax vs Modern mit Sidebar-Metadaten) — **ein** Key `intro`.
- **`certifications` / `press`:** `blocks` liefern `null`, wenn nicht `tradesman` bzw. `restaurant` — Order kann Keys trotzdem enthalten (Tenant/Defaults) → **Sektion leer** möglich.

### Frontend Extras → `SubPage` about

Intro, values, team, timeline, numbers, testimonials, FAQ, CTA — gemäß Order + Visibility.

### Bekannte Lücken / QA-Punkte

1. **Kern:** `certifications`/`press` in Admin bei passender Branche sichtbar; auf der Seite **hart** an `variant` gebunden — bei falscher `sectionOrder`-Erweiterung **leere** Sektion möglich.
2. **`faq` im About-Order (Katalog):** Editor oft über **andere** Admin-Seite / gemeinsame FAQ-Daten — Deep-Link-Verhalten beachten (`CROSS_PAGE_TARGETS` in `section-registry.ts`).

**Manuelle QA:** restaurant (press) + tradesman (certifications) + medical about; prüfen, ob alle sichtbaren Karten Inhalt liefern.

---

## 4. Kontakt (`/kontakt`)

### Admin → `contactOrder`

`contactHeader`, `contactDetails` → optional `contactForm` (`cfg.contact.showForm`) → `locations` → optional `arrival` → optional `contactCta`.

### Frontend Kern → `ContactPage`

- **Order:** `getEffectivePageOrder` + `isSectionEnabled`.
- **Blocks:** `block` (= `ContactBlock` **ohne** `showForm={cfg.contact.showForm}` — **immer** Default `showForm=true`), `locations` (nur wenn `locs.length`), `arrival`, **`faq`**, `cta`.
- **Default-Order (Kern):** `page-layout` `contact`: `block`, `locations`, `arrival`, `cta` — **ohne** `faq`; `faq` nur nach **manueller** Erweiterung der Order / Katalog.

### Frontend Extras → `SubPage` contact

`ContactBlock` **mit** `showForm={cfg.contact.showForm}` — **konsistent** mit Admin-Flag.

### Bekannte Lücken / QA-Punkte (wichtig)

1. **Kern — `showForm`:** Admin kann `contactForm` ausblenden (`showForm: false`), **`ContactBlock` im Kern ignoriert das** weiterhin (Formular bleibt sichtbar, solange `block` in der Order ist). **Extras** respektieren das Flag. → **Gap:** Konfiguration „Formular aus“ für **Kern**-Tenants nicht durchgängig.
2. **FAQ auf Kontakt (Kern):** Frontend kann `faq` rendern; **feste** `contactOrder` listet **kein** eigenes FAQ — Bearbeitung läuft über **Deep-Link** „FAQ (Leistungsseite)“ (`CROSS_PAGE_TARGETS.faq`), wenn die Sektion per Layout hinzugefügt wurde. → **Kein Bug**, aber **UX:** Betriebe müssen wissen, wo die FAQ-Texte gepflegt werden.
3. **`locations`:** Frontend zeigt Section nur bei `locs.length` — Admin-Karte kann trotzdem da sein.

**Manuelle QA:** ein Kern-Template mit `contact.showForm: false` (DB/Seed) — prüfen, ob Formular noch erscheint; Extras mit gleichem Flag vergleichen.

---

## Empfohlene manuelle Matrix (Minimum)

| Seite | Kern (1×) | Extra (1×) | Styles |
|-------|-----------|------------|--------|
| Services | z. B. `restaurant` | z. B. `medical` | classic, modern, bold |
| Galerie | z. B. `tradesman` | `consulting` | classic, bold |
| Über uns | z. B. mit `press` | `fitness` | modern |
| Kontakt | beliebig | `medical` | classic + **showForm an/aus** |

---

## Optional: nächste technische Schritte (nicht umgesetzt)

1. **`contactOrder` + `ContactPage` (Kern):** `ContactBlock` mit `showForm={getBranchConfig(variant).contact.showForm}`.
2. **`servicesOrder` / … / `(tpl, style)`:** wenn gewünscht, Sektionen pro Style aus `branch-config` ableiten (neue `PerStyle`-Struktur oder Ableitung aus bestehenden Home-Flags — **Designentscheidung** nötig).
3. **`getEffectivePageOrder` für `home` ohne Override:** an `BRANCH_STYLE_ORDER[tpl][style]` angleichen (aktuell Katalog-Reihenfolge; siehe QA-Hinweise in früheren Diskussionen).
