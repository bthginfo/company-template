# Flamingo Media CMS — Master Spec
_Stand: Mai 2026 — Grundlage für Neuarchitektur_

---

## Inhaltsverzeichnis

1. [Systemarchitektur](#1-systemarchitektur)
2. [DB-Schema](#2-db-schema)
3. [Theme-System](#3-theme-system)
4. [Button-Objekt](#4-button-objekt)
5. [Media-Objekt](#5-media-objekt)
6. [Admin Page Builder](#6-admin-page-builder)
7. [Template-Strategie](#7-template-strategie)
8. [Anchor Template: Restaurant](#8-anchor-template-restaurant)
9. [Anchor Template: Handwerk](#9-anchor-template-handwerk)
10. [Anchor Template: Beratung](#10-anchor-template-beratung)
11. [Anchor Template: Hochzeit](#11-anchor-template-hochzeit)
12. [Variation Templates](#12-variation-templates)
13. [Branch-spezifische Collections](#13-branch-spezifische-collections)
14. [Shared Section Library](#14-shared-section-library)
15. [Blog / News System](#15-blog--news-system)
16. [Implementierungs-Reihenfolge](#16-implementierungs-reihenfolge)

---

## 1. Systemarchitektur

### Stack (unverändert)
- **Frontend:** Vite + React + TypeScript + Tailwind CSS
- **Backend:** Vercel Serverless Functions (`api/`)
- **DB:** Vercel Postgres + Drizzle ORM
- **Auth:** Next-Auth (Admin) + CRM-Auth (Showcase)
- **Deployment:** Multi-Tenant auf Vercel (ein Projekt pro Kunde)
- **Animationen:** Framer Motion (primary), GSAP optional für spezifische Effekte

### Was sich ändert

| Bereich | Alt | Neu |
|---|---|---|
| Content-Speicherung | 1× JSONB-Blob pro Tenant | Normalisiertes Schema: Pages, Sections (DB-Records), Collections |
| Section-Definition | Statisch im Code per Branch/Style/Page | Dynamisch: Section-Records in DB, gerendert per `type` |
| Admin-Editor | Formular über fixem Content-Baum | Page Builder: Pages, Sections hinzufügen/sortieren/ein-ausblenden |
| Sections | Im Code fest verdrahtet | Pool per Branch; Nutzer kann erlaubte Sections hinzufügen |
| Collections | Nicht vorhanden | Eigene Tabellen: rooms, dishes, projects, courses, etc. |
| Themes | CSS-Klasse pro Style | Token-basiert; mehrere Themes pro Website speicherbar |

---

## 2. DB-Schema

### Tabellen-Übersicht

```
tenants                → Kern-Tenant-Record
pages                  → Seiten pro Tenant (slug, title, type, seo)
sections               → Sections pro Page (type, order, visible, data JSONB)
collections            → Collection-Definitionen pro Tenant (type, z.B. 'rooms')
collection_items       → Items pro Collection (slug, data JSONB, hasSubpage, order)
media                  → Media Library pro Tenant
themes                 → Gespeicherte Themes pro Tenant
blog_posts             → Blog/News pro Tenant
site_settings          → Globale Settings (nav, footer, contact, social)
prospects              → (unverändert, CRM)
prospect_categories    → (unverändert, CRM)
```

### `pages`
```ts
{
  id: uuid PK
  tenantId: uuid FK → tenants
  slug: text NOT NULL          // 'home', 'speisekarte', 'zimmer', custom
  title: text NOT NULL         // CMS-Anzeigename
  pageType: text NOT NULL      // 'home' | 'generic' | 'collection-list' | 'collection-detail' | 'blog-list' | 'blog-post'
  isSystem: boolean            // true = nicht löschbar (z.B. Home)
  seoTitle: text
  seoDescription: text
  seoImage: text               // Media-URL
  published: boolean default true
  order: integer               // Reihenfolge in Navigation
  parentId: uuid nullable FK → pages  // für Unterseiten
  createdAt: timestamp
  updatedAt: timestamp
}
```

### `sections`
```ts
{
  id: uuid PK
  pageId: uuid FK → pages
  type: text NOT NULL          // 'hero' | 'menuSection' | 'roomGrid' | etc.
  order: integer NOT NULL
  visible: boolean default true
  isFixed: boolean default false  // true = nicht verschiebbar (z.B. Hero)
  data: jsonb NOT NULL         // Section-spezifische Felder
  createdAt: timestamp
  updatedAt: timestamp
}
```

### `collections`
```ts
{
  id: uuid PK
  tenantId: uuid FK → tenants
  type: text NOT NULL          // 'rooms' | 'dishes' | 'projects' | 'courses' | 'properties' | ...
  label: text NOT NULL         // Anzeigename im Admin
  createdAt: timestamp
}
```

### `collection_items`
```ts
{
  id: uuid PK
  collectionId: uuid FK → collections
  slug: text NOT NULL
  title: text NOT NULL
  order: integer
  published: boolean default true
  hasSubpage: boolean default false
  featuredImage: text          // Media-URL
  data: jsonb NOT NULL         // Item-spezifische Felder (nach type unterschiedlich)
  seoTitle: text
  seoDescription: text
  seoImage: text
  createdAt: timestamp
  updatedAt: timestamp
}
```

### `media`
```ts
{
  id: uuid PK
  tenantId: uuid FK → tenants
  filename: text NOT NULL
  url: text NOT NULL
  mimeType: text
  alt: text
  caption: text
  width: integer
  height: integer
  fileSize: integer
  createdAt: timestamp
}
```

### `themes`
```ts
{
  id: uuid PK
  tenantId: uuid FK → tenants
  name: text NOT NULL
  tokens: jsonb NOT NULL       // { primary, secondary, accent, background, surface, text, ... }
  isActive: boolean default false
  createdAt: timestamp
}
```

### `site_settings`
```ts
{
  tenantId: uuid PK FK → tenants
  siteName: text
  logoUrl: text
  faviconUrl: text
  primaryColor: text           // Fallback wenn kein Theme
  contactEmail: text
  contactPhone: text
  address: text
  socialLinks: jsonb           // { instagram, facebook, google, tiktok, ... }
  navItems: jsonb              // [ { label, pageId | href, children[] } ]
  footerColumns: jsonb         // [ { heading, links[] } ]
  cookieBannerText: text
  gtmId: text
  updatedAt: timestamp
}
```

### `blog_posts`
```ts
{
  id: uuid PK
  tenantId: uuid FK → tenants
  slug: text NOT NULL
  title: text NOT NULL
  excerpt: text
  featuredImage: text
  content: jsonb NOT NULL      // Rich-Content-Blöcke
  author: text
  category: text
  tags: text[]
  publishedAt: timestamp
  published: boolean default false
  seoTitle: text
  seoDescription: text
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

## 3. Theme-System

### Token-Hierarchie

```
Primitive Tokens (raw values)
  → color-blue-500: #3B82F6
  → color-stone-900: #1C1917

Semantic Tokens (named intent)
  → color-primary: var(--color-blue-500)
  → color-background: var(--color-stone-50)
  → color-surface: #ffffff
  → color-text-base: var(--color-stone-900)
  → color-text-muted: var(--color-stone-500)
  → color-border: var(--color-stone-200)
  → color-accent: var(--color-amber-500)

Component Tokens (mapped to components)
  → btn-primary-bg: var(--color-primary)
  → btn-primary-text: #fff
  → section-hero-bg: var(--color-background)
  → nav-bg: rgba(255,255,255,0.95)
  → card-shadow: 0 2px 16px rgba(0,0,0,0.07)
```

### Implementierung
- CSS Custom Properties auf `:root { ... }` gesetzt
- Tailwind nutzt `var(--color-primary)` etc. via `tailwind.config.ts`
- Theme-Wechsel = neues Set CSS Variables serverseitig eingebunden oder per JS im `<html>` gesetzt
- Vordefinierte Branchen-Themes (je Classic/Modern/Bold) + optional Custom-Theme im Admin
- Theme Preview im Admin: kleines Live-Vorschau-Panel

### Branchen-Theme-Paletten (Grundrichtung)

| Branch | Classic | Modern | Bold |
|---|---|---|---|
| Restaurant | Warmes Creme + Dunkelgrün + Gold | Off-White + Anthrazit + Terrakotta | Tiefschwarz + Mattgold + Burgund |
| Handwerk | Warmgrau + Moosgrün + Bronze | Hellgrau + Navy + Orange | Dunkelanthrazit + Signalgelb + Weiß |
| Beratung | Warmweiß + Midnight + Kupfer | Reinweiß + Marineblau + Hellgrau | Schwarz + Electric Blue + Weiß |
| Hochzeit | Champagner + Altrosa + Elfenbein | Reinweiß + Blush + Platin | Tiefschwarz + Gold + Burgundy |
| Hotel | Sandbeige + Waldgrün + Messing | Reinweiß + Schiefergrau + Smaragd | Marineblau + Gold + Weiß |
| Salon | Rosa + Creme + Rose Gold | Weiß + Anthrazit + Blush | Schwarz + Neon-Pink + Silber |
| Tourismus | Himmelblau + Waldgrün + Sonnengelb | Weiß + Blau + Türkis | Signalblau + Signalgelb + Weiß |
| Praxis | Hellblau + Weiß + Minze | Weiß + Dunkelblau + Hellgrau | Dunkelblau + Aqua + Weiß |
| Fitness | Schwarz + Gelb + Grau | Weiß + Schwarz + Knallgrün | Schwarz + Neonorange + Weiß |
| Immobilien | Warmcreme + Dunkelbraun + Gold | Weiß + Anthrazit + Blaugrau | Schwarz + Gold + Weiß |

---

## 4. Button-Objekt

Jeder Button im CMS ist ein strukturiertes Objekt, keine einfache URL.

```ts
type ButtonObject = {
  label: string;
  type: 'external' | 'internalPage' | 'pageSection' | 'email' | 'phone';
  externalUrl?: string;
  pageId?: string;          // Referenz auf pages.id
  sectionId?: string;       // Referenz auf sections.id (Anchor)
  email?: string;
  phone?: string;
  openInNewTab?: boolean;
  ariaLabel?: string;
  styleVariant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  icon?: string;            // Icon-Name aus Icon-Library (z.B. 'arrow-right')
  size?: 'sm' | 'md' | 'lg';
}
```

**Admin-UI:** Dropdown für `type`, dann kontextabhängige Felder. Page-Picker zeigt alle Pages des Tenants. Section-Picker zeigt Sections der gewählten Page.

---

## 5. Media-Objekt

```ts
type MediaObject = {
  sourceType: 'upload' | 'url' | 'embed';
  mediaId?: string;         // Referenz auf media.id (bei upload)
  url?: string;             // Direktlink oder Embed-URL
  embedCode?: string;       // Iframe/Embed-String
  alt: string;              // PFLICHTFELD
  caption?: string;
  focalPoint?: { x: number; y: number };  // 0–1, default 0.5/0.5
  posterImage?: MediaObject; // für Videos
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  ratio?: '16:9' | '4:3' | '1:1' | '3:2' | '9:16' | 'auto';
  objectFit?: 'cover' | 'contain';
}
```

---

## 6. Admin Page Builder

### Navigation im Admin
```
Dashboard
├── Seiten
│   ├── [Seitenname] → Page Editor
│   └── + Neue Seite
├── Collections
│   ├── [Collection-Name] → Item-Liste
│   └── (branch-abhängig sichtbar)
├── Blog / News
├── Einstellungen
│   ├── Allgemein (Name, Logo, Kontakt, Social)
│   ├── Navigation
│   ├── Footer
│   └── Themes
└── Medien
```

### Page Editor

```
[Seiten-Header: Titel, Slug, SEO-Button, Publish-Toggle, Vorschau-Button]

Section-Liste (vertikal):
  ┌─────────────────────────────────────────┐
  │ [▲][▼] Hero              [Sichtbar ✓] [Bearbeiten] │  ← isFixed → kein Move
  │ [▲][▼] Über uns          [Sichtbar ✓] [Bearbeiten] [Löschen] │
  │ [▲][▼] Leistungen        [Sichtbar ✗] [Bearbeiten] [Löschen] │
  └─────────────────────────────────────────┘
  [+ Section hinzufügen]
```

### Section hinzufügen Modal
- Kategorisierte Liste aller für diese Branch erlaubten Section-Types
- Suche
- Thumbnail/Beschreibung pro Section-Type
- Neu hinzugefügte Section landet unten, dann via Move Up/Down positionierbar

### Section Editor (Inline-Drawer oder Slide-over)
- Alle Felder der Section als Formular
- Repeater-Felder mit Add/Remove/Reorder (Move Up/Down)
- Bild-Felder öffnen Media Library Picker
- Button-Felder öffnen Button-Object-Editor

### Draft / Publish
- Änderungen landen zunächst im `draft`-Feld
- "Veröffentlichen"-Button schreibt `draft` → `data` und löscht `draft`
- Public Site rendert immer `data`; Admin Preview zeigt `draft ?? data`

---

## 7. Template-Strategie

### 4 Anchor Templates (vollständig ausgebaut)
Diese bekommen eigene, wirklich individuelle visuelle Sprachen, Dramaturgie-Konzepte und Section-Paletten:

| Template | Charakter | Primäre Branchen-Metapher |
|---|---|---|
| **Restaurant** | warm, sinnlich, kulinarisch | Atmosphäre + Genuss + Reservierung |
| **Handwerk** | erdend, kompetent, regional | Qualität + Vertrauen + Projekt-Showcase |
| **Beratung** | klar, souverän, premium | Expertise + Ergebnis + Vertrauen |
| **Hochzeit** | emotional, story-driven, elegant | Erinnerung + Moment + Gemeinschaft |

### 6 Variation Templates (abgeleitet, aber mit branch-spezifischen Kernkomponenten)

| Template | Closest Anchor | Eigene Kernkomponenten |
|---|---|---|
| **Hotel** | Restaurant | RoomGrid, RoomDetail, AmenitiesGrid, BookingCTA |
| **Salon** | Restaurant | ServiceGrid, TeamGrid, PriceList |
| **Tourismus** | Beratung | TourGrid, TourDetail, ActivityPicker |
| **Praxis** | Beratung | TreatmentGrid, TeamProfiles, AppointmentEmbed |
| **Fitness** | Handwerk | CourseSchedule, TrainerGrid, MembershipTiers |
| **Immobilien** | Beratung | PropertyGrid, PropertyDetail, ExposeDownload |

**Stil-Varianten (alle Branches):**
- **Classic:** Zeitlos, harmonisch, editorial. Serif- oder klassische Groteskschrift. Ruhige Motion.
- **Modern:** Reduziert, präzise, großzügige Flächen. Sans-Serif, klares Grid. Subtile Scroll-Reveals.
- **Bold:** Mutig, kontraststark, starke Typografie-Gesten. Spürbarere Animationen. Conversion-fokussiert.

---

## 8. Anchor Template: Restaurant

### Marken- und Erlebnischarakter

Ein hochwertiges Restaurant-Template kommuniziert über Atmosphäre, Genuss und Charakter — nicht über Features. Die Website muss riechen und schmecken, bevor der Gast reserviert. Jede Seite erzählt eine kleine Geschichte.

**Classic:** Editorial, warme Typografie, großzügige Bilder, subtiles Parallax. Reservierungs-CTA als selbstverständliche Einladung.
**Modern:** Reduziertes Layout, weißes Raster, food photography als einziger Star. Klar, direkt, urban.
**Bold:** Dunkler Hintergrund, goldene Akzente, große Schriftgesten. Dramatisch, begehrenswert, markant.

---

### Seitenstruktur

| Slug | Titel | Typ | System? |
|---|---|---|---|
| `/` | Home | home | ✓ |
| `/speisekarte` | Speisekarte | collection-list | ✓ |
| `/galerie` | Galerie | generic | ✓ |
| `/ueber-uns` | Über uns | generic | ✓ |
| `/kontakt` | Kontakt & Reservierung | generic | ✓ |
| `/news` | Aktuelles | blog-list | optional |
| `/impressum` | Impressum | generic | ✓ |
| `/datenschutz` | Datenschutz | generic | ✓ |

---

### Home — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `restaurantHero` | ✓ | Vollbild-Hero mit Atmosphären-Video/-Bild, Claim, Reservierungs-CTA |
| 2 | `kitchenPhilosophy` | — | 2-spaltig: großes Bild + Text über die Küche / Philosophie |
| 3 | `menuTeaser` | — | 3–4 featured Gerichte/Kategorien aus Speisekarte-Collection |
| 4 | `ambience` | — | Bild-Grid / Galerie-Strip (3–6 Bilder, atmosphärisch) |
| 5 | `chefStory` | — | Chef-Porträt + Zitat + Werdegang (Text + Bild) |
| 6 | `testimonials` | — | 3–5 Gäste-Bewertungen, optional Google-Rating-Badge |
| 7 | `reservationCta` | — | Prominent: Tisch reservieren (Datum/Uhrzeit/Personen oder externer Link) |
| 8 | `openingHours` | — | Öffnungszeiten-Tabelle + Adresse + Karte-Embed |
| 9 | `newsTeaser` | — | 3 neueste Blog-Posts (optional) |

---

### Speisekarte — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `menuHeader` | ✓ | Seitenüberschrift + kurze Einleitung |
| 2 | `menuSection` | — | Pro Kategorie: Kategoriename + Gerichte-Grid/Liste (aus Collection) |
| 3 | `menuNote` | — | Hinweise (Allergene, Saisonalität, Supplements) |
| 4 | `reservationCta` | — | Inline Reservierungs-CTA |

---

### Galerie — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `galleryHeader` | ✓ | Überschrift + kurze Einleitung |
| 2 | `masonryGallery` | ✓ | Masonry-Grid mit Lightbox, kategorisierbar |
| 3 | `reservationCta` | — | CTA unten |

---

### Über uns — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `genericHero` | ✓ | Seitenüberschrift + Bild |
| 2 | `storySection` | — | Geschichte des Restaurants, Richtext + Bild |
| 3 | `chefStory` | — | Chef-Porträt |
| 4 | `teamGrid` | — | Team-Mitglieder (optional) |
| 5 | `values` | — | 3–4 Werte/Versprechen als Icon-Cards |
| 6 | `reservationCta` | — | CTA |

---

### Kontakt — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `contactHeader` | ✓ | Überschrift |
| 2 | `reservationWidget` | ✓ | Reservierungsformular (Name, Datum, Uhrzeit, Personen, Nachricht) oder externer Booking-Link |
| 3 | `openingHours` | — | Öffnungszeiten |
| 4 | `mapEmbed` | — | Google Maps Embed |
| 5 | `contactInfo` | — | Adresse, Tel, E-Mail |

---

### Collections: Restaurant

#### `menuCategories`
```ts
{
  name: text                   // "Vorspeisen", "Hauptgerichte"
  description: text
  image: MediaObject
  order: integer
}
```

#### `dishes` (gehört zu menuCategory)
```ts
{
  categoryId: ref → menuCategories
  name: text
  shortDescription: text
  ingredients: text
  price: text                  // "18,50 €"
  priceNote: text              // "(pro Person)", "(ab 2 Pers.)"
  image: MediaObject optional
  badges: string[]             // "vegan", "glutenfrei", "Signature"
  isHighlight: boolean         // erscheint als Featured auf Home
  available: boolean
}
```

---

## 9. Anchor Template: Handwerk

### Marken- und Erlebnischarakter

Handwerker werden online leider oft schlecht präsentiert: generisch, unterkühlt, nicht vertrauensbildend. Das Gegenteil davon. Diese Website vermittelt Kompetenz durch Beweis — Referenz-Fotos, echte Kundenstimmen, klare Leistungsbeschreibungen. Bodenständig, aber auf keinen Fall billig.

**Classic:** Warmgrau, seriöse Typografie, Fokus auf Referenz-Fotos. Erzählt "Handwerk mit Tradition und Stolz."
**Modern:** Klares Grid, hellgrauer Hintergrund, Schwarz/Orange-Akzente. Wirkt wie ein strukturiertes Bauunternehmen.
**Bold:** Dunkel, kontraststark, große Statement-Typografie. "Wir bauen — und man sieht es."

---

### Seitenstruktur

| Slug | Titel | Typ | System? |
|---|---|---|---|
| `/` | Home | home | ✓ |
| `/leistungen` | Leistungen | collection-list | ✓ |
| `/leistungen/[slug]` | Leistungsdetail | collection-detail | auto |
| `/referenzen` | Referenzen / Projekte | collection-list | ✓ |
| `/referenzen/[slug]` | Projektdetail | collection-detail | auto |
| `/ueber-uns` | Über uns | generic | ✓ |
| `/kontakt` | Kontakt & Angebot | generic | ✓ |
| `/news` | Aktuelles | blog-list | optional |
| `/impressum` | Impressum | generic | ✓ |
| `/datenschutz` | Datenschutz | generic | ✓ |

---

### Home — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `tradesmanHero` | ✓ | Starkes Bild/Video, Claim, 2 CTAs (Leistungen, Angebot anfragen) |
| 2 | `trustBar` | — | Logos/Zahlen: Gegründet, Mitarbeiter, Projekte, Garantie |
| 3 | `servicesOverview` | — | 3–6 Leistungs-Karten aus Collection (Icon + Titel + Kurzbeschreibung) |
| 4 | `projectShowcase` | — | 2–3 featured Referenz-Projekte (Bild + Titel + Kategorie + Link) |
| 5 | `processSteps` | — | "So arbeiten wir": 3–5 Schritte (Nummeriert, Icon, Text) |
| 6 | `testimonials` | — | 3–5 Kundenstimmen |
| 7 | `certifications` | — | Partner-/Zertifikat-Logos + Mitgliedschaften |
| 8 | `contactCta` | — | "Kostenloses Angebot anfragen" prominent |
| 9 | `serviceArea` | — | Einzugsgebiet: Text + optionale Karte |

---

### Leistungen (Collection-Liste) — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `servicesHeader` | ✓ | Überschrift + Einleitung |
| 2 | `servicesGrid` | ✓ | Alle Leistungen als Karten-Grid (aus Collection) |
| 3 | `contactCta` | — | CTA: Angebot anfragen |

---

### Leistungsdetail (Collection-Detail) — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `serviceDetailHero` | ✓ | Titel + Bild + kurze Einleitung |
| 2 | `serviceDetailContent` | ✓ | Richtext + Leistungsumfang-Liste |
| 3 | `serviceGallery` | — | Fotos dieser Leistung |
| 4 | `relatedProjects` | — | Referenz-Projekte zu dieser Leistung |
| 5 | `contactCta` | — | CTA |

---

### Referenzen (Collection-Liste) — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `projectsHeader` | ✓ | Überschrift + Filter-Leiste (nach Kategorie) |
| 2 | `projectsGrid` | ✓ | Alle Projekte als Grid mit Bild + Titel + Kategorie |

---

### Projektdetail (Collection-Detail) — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `projectDetailHero` | ✓ | Titelbild + Projekt-Metadaten (Ort, Jahr, Kategorie, Dauer) |
| 2 | `projectDetailContent` | ✓ | Richtext: Beschreibung + Herausforderung + Lösung |
| 3 | `projectGallery` | ✓ | Before/After oder Bild-Grid |
| 4 | `customerQuote` | — | Kundenzitat zu diesem Projekt |
| 5 | `relatedProjects` | — | Weitere ähnliche Projekte |
| 6 | `contactCta` | — | CTA |

---

### Collections: Handwerk

#### `services`
```ts
{
  title: text
  shortDescription: text
  icon: text               // Icon-Name
  image: MediaObject
  content: richText        // Detailbeschreibung
  bulletPoints: string[]   // Leistungsumfang-Liste
  hasSubpage: boolean
  slug: text
  category: text           // "Renovierung", "Neubau", etc.
}
```

#### `projects`
```ts
{
  title: text
  category: text           // "Bad", "Küche", "Fassade", etc.
  location: text           // "München"
  year: text               // "2024"
  duration: text           // "3 Wochen"
  shortDescription: text
  content: richText
  featuredImage: MediaObject
  gallery: MediaObject[]
  beforeImage: MediaObject optional
  afterImage: MediaObject optional
  customerName: text optional    // für Testimonial
  customerQuote: text optional
  serviceRefs: ref[] → services
  hasSubpage: boolean
  slug: text
  isHighlight: boolean     // auf Home erscheinen
}
```

---

## 10. Anchor Template: Beratung

### Marken- und Erlebnischarakter

Beratung lebt von Kompetenz und Vertrauen. Die Website muss "Thought Leadership" ausstrahlen: klarste Argumentation, starke Case Studies, überzeugende Experten. Kein Bullshit-Bingo, keine inhaltsleeren Buzzwords.

**Classic:** Weiß/Warmcreme + Midnight + Kupfer. Serif-Akzente, editorial. Wie ein hochwertiges Consulting-Magazin.
**Modern:** Strenges Raster, viel Weiß, Navy + Grau. Präzise, analytisch, digital-nativ.
**Bold:** Schwarz + Electric Blue. Große Zahlen, starke Statements. "Wir liefern Ergebnisse."

---

### Seitenstruktur

| Slug | Titel | Typ | System? |
|---|---|---|---|
| `/` | Home | home | ✓ |
| `/leistungen` | Leistungen | collection-list | ✓ |
| `/leistungen/[slug]` | Leistungsdetail | collection-detail | auto |
| `/cases` | Cases / Referenzen | collection-list | ✓ |
| `/cases/[slug]` | Case-Detail | collection-detail | auto |
| `/branchen` | Branchen | generic | optional |
| `/ueber-uns` | Über uns & Team | generic | ✓ |
| `/insights` | Insights / Blog | blog-list | optional |
| `/kontakt` | Kontakt | generic | ✓ |
| `/impressum` | Impressum | generic | ✓ |
| `/datenschutz` | Datenschutz | generic | ✓ |

---

### Home — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `consultingHero` | ✓ | Starke Headline + Subline + 2 CTAs (Leistungen, Kontakt) |
| 2 | `impactNumbers` | — | 3–5 Kennzahlen: Kunden, Projekte, Jahre, NPS etc. |
| 3 | `servicesOverview` | — | 3–6 Leistungs-Karten |
| 4 | `caseStudyCards` | — | 2–3 featured Cases (Branche, Problem, Ergebnis) |
| 5 | `expertiseAreas` | — | Branchen-Expertise als Tag-Cloud oder Cards |
| 6 | `teamTeaser` | — | 3–4 Experten-Portraits |
| 7 | `testimonials` | — | Kunden-Testimonials mit Unternehmen + Bild |
| 8 | `trustedBy` | — | Logos bisheriger Kunden (anonymisierbar) |
| 9 | `insightsTeaser` | — | 3 neueste Blog/Insights-Posts |
| 10 | `contactCta` | — | "Erstgespräch vereinbaren" prominenter CTA |

---

### Case-Detail (Collection-Detail) — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `caseDetailHero` | ✓ | Titel, Branche, Scope, KPIs als Summary-Block |
| 2 | `caseChallenge` | ✓ | Die Ausgangssituation / Herausforderung |
| 3 | `caseApproach` | ✓ | Unser Ansatz / Vorgehen (Richtext + optional Schritte) |
| 4 | `caseResults` | ✓ | Ergebnisse mit Kennzahlen |
| 5 | `customerQuote` | — | Zitat Ansprechpartner beim Kunden |
| 6 | `relatedCases` | — | Weitere relevante Cases |
| 7 | `contactCta` | — | CTA |

---

### Collections: Beratung

#### `services`
```ts
{
  title: text
  shortDescription: text
  icon: text
  image: MediaObject
  content: richText
  deliverables: string[]    // Was der Kunde bekommt
  targetGroups: string[]   // Für wen
  hasSubpage: boolean
  slug: text
}
```

#### `cases`
```ts
{
  title: text
  client: text              // "Mittelständisches Produktionsunternehmen" (anonymisierbar)
  industry: text            // "Maschinenbau"
  projectScope: text        // "Digitale Transformation"
  duration: text            // "6 Monate"
  teamSize: text            // "4 Berater"
  challenges: richText
  approach: richText
  results: richText
  kpis: { label: text; value: text; unit: text }[]  // Repeater
  featuredImage: MediaObject
  gallery: MediaObject[]
  quote: text optional
  quoteName: text optional
  quoteRole: text optional
  serviceRefs: ref[] → services
  hasSubpage: boolean
  slug: text
  isHighlight: boolean
}
```

#### `team`
```ts
{
  name: text
  role: text
  bio: text
  image: MediaObject
  expertise: string[]
  linkedIn: text optional
  order: integer
}
```

---

## 11. Anchor Template: Hochzeit

### Marken- und Erlebnischarakter

Das Hochzeits-Template ist kein Business-Template. Es ist eine persönliche, emotionale Einladung. Jede Seite soll das Paar widerspiegeln und die Gäste willkommen heißen. Kein Marketing, kein Sales-Funnel — Storytelling und Information.

**Classic:** Champagner + Altrosa + Elfenbein. Elegante Serif-Typografie. Sanfte Animationen. Romantisch, zeitlos.
**Modern:** Reinweiß + Blush + Platin. Klares, luftiges Layout. Fotografisch. Minimalistisch-elegant.
**Bold:** Tiefschwarz + Gold + Burgund. Dramatisch, glamourös, unvergesslich. Große visuelle Gesten.

---

### Seitenstruktur

| Slug | Titel | Typ | System? |
|---|---|---|---|
| `/` | Startseite | home | ✓ |
| `/unsere-geschichte` | Unsere Geschichte | generic | ✓ |
| `/hochzeitsinfos` | Hochzeitsinfos & Ablauf | generic | ✓ |
| `/location` | Location & Anreise | generic | ✓ |
| `/rsvp` | RSVP | generic | ✓ |
| `/galerie` | Galerie | generic | optional |
| `/faq` | FAQ | generic | optional |
| `/geschenke` | Geschenkhinweise | generic | optional |

---

### Home — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `weddingHero` | ✓ | Vollbild Paarfoto/-video, Namen, Datum, optional Countdown |
| 2 | `weddingIntro` | — | Herzliche Willkommens-Nachricht ans Paar / an die Gäste |
| 3 | `countdown` | — | Timer bis zum Hochzeitstag |
| 4 | `quickInfos` | — | Datum, Uhrzeit, Location (mit Link zur Location-Seite) als kompakte Karten |
| 5 | `storyTeaser` | — | Ausschnitt der Geschichte + Link zu "Unsere Geschichte" |
| 6 | `photoTease` | — | 4–6 Fotos als romantische Vorschau |
| 7 | `rsvpTeaser` | — | Hinweis auf RSVP mit Deadline + CTA |

---

### Unsere Geschichte — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `storyHeader` | ✓ | Überschrift + Einleitungstext |
| 2 | `storyTimeline` | ✓ | Chronologische Timeline (aus Repeater): Datum + Text + optionales Bild |
| 3 | `couplePhotos` | — | Foto-Galerie aus der Beziehung |
| 4 | `engagementStory` | — | Freier Richtext-Block für die Verlobungsgeschichte |

---

### Hochzeitsinfos — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `scheduleHeader` | ✓ | Überschrift |
| 2 | `daySchedule` | ✓ | Tagesablauf als Timeline (Repeater: Uhrzeit + Ereignis + Ort + Info) |
| 3 | `dresscode` | — | Dresscode-Hinweis mit optionalem Bild + Text |
| 4 | `specialNotes` | — | Besondere Hinweise (Kinder, Parken, etc.) als Richtext |
| 5 | `wishSong` | — | Song-Wunsch-Formular oder Playlist-Link |

---

### Location — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `locationHeader` | ✓ | Überschrift + Location-Name |
| 2 | `locationGallery` | — | Bilder der Location |
| 3 | `locationInfo` | ✓ | Adresse, Anreise (Text, optionale Karte), Parkplätze |
| 4 | `accommodationList` | — | Empfohlene Hotels / Unterkünfte (Repeater: Name, Entfernung, Link) |
| 5 | `mapEmbed` | — | Google Maps Embed |

---

### RSVP — Sections

| Order | Section-Type | Fix? | Beschreibung |
|---|---|---|---|
| 1 | `rsvpHeader` | ✓ | Überschrift + Bitte um Rückmeldung bis [Datum] |
| 2 | `rsvpForm` | ✓ | Formular: Name, Anzahl Personen, Menü-Wunsch optional, Nachricht, Zu-/Absage |
| 3 | `rsvpNote` | — | Hinweis nach Absenden / persönliche Nachricht |

---

### Collections: Hochzeit

Hochzeit nutzt keine klassischen Business-Collections. Stattdessen ist fast alles durch Sections + Repeater abgedeckt. Einzige Collection-ähnliche Struktur:

#### (konfigurierbare) `timelineItems` (in `storyTimeline` Section, als Repeater)
```ts
{
  date: text               // "Sommer 2019"
  title: text              // "Wir haben uns kennengelernt"
  story: textarea
  image: MediaObject optional
}
```

#### `scheduleItems` (in `daySchedule` Section, als Repeater)
```ts
{
  time: text               // "14:00 Uhr"
  event: text              // "Standesamt"
  location: text optional
  note: text optional
  icon: text optional
}
```

#### `accommodations` (in `accommodationList` Section, als Repeater)
```ts
{
  name: text
  distance: text           // "5 Minuten zu Fuß"
  priceRange: text optional
  link: ButtonObject
  image: MediaObject optional
}
```

---

### Besonderheiten Hochzeits-Template

- **Countdown** ist dynamisch berechnet (kein CMS-Feld, nur Hochzeitsdatum als Input)
- **RSVP-Formular** speichert Antworten in einer einfachen DB-Tabelle (`wedding_rsvp`) — kein Drittanbieter nötig
- **Passwortschutz** für die gesamte Wedding-Site (oder einzelne Seiten) — da private Inhalte
- **Keine SEO-Indexierung** (robots: noindex) als Empfehlung, da private Website
- **Bilinguale Unterstützung** als optionales Feature (DE/EN Toggle für internationale Gäste)

```ts
// wedding_rsvp Tabelle
{
  id: uuid PK
  tenantId: uuid FK
  guestName: text
  attending: boolean
  guestCount: integer
  menuChoice: text optional
  message: text optional
  submittedAt: timestamp
}
```

---

## 12. Variation Templates

### Hotel (→ Restaurant-Basis)

**Eigene Kernkomponenten:**

`RoomGrid` — Zimmerkategorien als Cards (Bild, Name, Preis ab, Belegung, CTA)
`RoomDetail` — Vollständige Zimmerseite: Galerie, Ausstattungsliste, Größe, Preis, Buchungs-CTA
`AmenitiesGrid` — Ausstattungs-Icons Grid (Pool, Spa, Restaurant, etc.)
`BookingWidget` — Eingebetteter Buchungs-Button/-Widget (externer Link oder Embed)
`WellnessTeaser` — Wellness-Angebot als atmosphärische Feature-Section

**Seitenstruktur-Zusätze:** `/zimmer`, `/zimmer/[slug]`, `/angebote`, `/wellness`, `/restaurant`

---

### Salon (→ Restaurant-Basis)

**Eigene Kernkomponenten:**

`ServiceGrid` — Alle Behandlungen/Leistungen als Cards mit Preis + Dauer
`ServiceDetail` — Leistungsdetailseite: Beschreibung, Preis, Dauer, CTA Buchen
`TeamGrid` — Stylisten/Therapeuten mit Spezialgebiet + Bild
`PriceList` — Formal gestaltete Preisliste (kategorisiert)
`BookingCta` — Prominente Online-Buchung CTA (externer Link Calendly/Treatwell etc.)

**Seitenstruktur-Zusätze:** `/leistungen`, `/leistungen/[slug]`, `/team`, `/preise`

---

### Tourismus (→ Beratung-Basis, stärker bildgetrieben)

**Eigene Kernkomponenten:**

`TourGrid` — Touren/Aktivitäten als Cards mit Bild, Dauer, Schwierigkeitsgrad, Preis
`TourDetail` — Tour-Detailseite: Tagesprogramm, Inklusivleistungen, Ausrüstung, Buchung
`ActivityPicker` — Interaktive Aktivitäten-Kategorie-Auswahl
`RegionMap` — Region/Karte als atmosphärische Section
`SeasonalHighlight` — Saisonale Highlights / Aktionen

**Seitenstruktur-Zusätze:** `/aktivitaeten`, `/touren`, `/touren/[slug]`, `/region`

---

### Praxis (→ Beratung-Basis)

**Eigene Kernkomponenten:**

`TreatmentGrid` — Leistungen/Behandlungen als Cards
`TreatmentDetail` — Leistungsdetailseite: medizinische Beschreibung, Ablauf, Dauer
`TeamProfiles` — Arzt-/Therapeuten-Profile mit Qualifikationen
`AppointmentEmbed` — Terminbuchungs-Embed (Doctolib, Jameda, etc.)
`InsuranceInfo` — Kassenleistung / Privatleistung Info-Section
`FaqAccordion` — FAQ speziell für Praxis (Behandlungsablauf, Erstbesuch etc.)

**Seitenstruktur-Zusätze:** `/leistungen`, `/leistungen/[slug]`, `/team`, `/faq`

---

### Fitness (→ Handwerk-Basis)

**Eigene Kernkomponenten:**

`CourseSchedule` — Kursplan-Grid (Wochentag × Uhrzeit × Kursname × Raum × Trainer) — aus Collection
`CourseDetail` — Kursdetailseite: Beschreibung, Niveau, Trainer, Termine, CTA
`TrainerGrid` — Trainer mit Spezialgebiet + Foto
`MembershipTiers` — 3 Mitgliedschafts-Stufen (Preis-Tabelle / Feature-Comparison)
`TrialCta` — "Probetraining" prominente CTA-Section

**Seitenstruktur-Zusätze:** `/kurse`, `/kurse/[slug]`, `/trainer`, `/mitgliedschaft`

---

### Immobilien (→ Beratung-Basis)

**Eigene Kernkomponenten:**

`PropertyGrid` — Objekte als Cards mit Bild, Typ, Preis, qm, Zimmer, Lage
`PropertyDetail` — Expose-ähnliche Detailseite: große Galerie, Ausstattung, Lagekarte, Kontakt-Makler
`PropertyFilter` — Filter-Leiste: Typ, Zimmer, Preis-Range, Lage
`ExposeDownload` — PDF-Expose-Download CTA (Datei hochladbar im CMS)
`AgentProfile` — Makler-Profil-Card mit Kontakt

**Seitenstruktur-Zusätze:** `/immobilien`, `/immobilien/[slug]`, `/referenzen`

---

## 13. Branch-spezifische Collections

### Übersicht welche Collections welche Branch bekommt

| Branch | Collections |
|---|---|
| Restaurant | `menuCategories`, `dishes` |
| Hotel | `rooms`, `offers`, `amenities` |
| Salon | `services`, `team`, `prices` |
| Tourismus | `tours`, `activities`, `regions` |
| Handwerk | `services`, `projects`, `team` |
| Praxis | `treatments`, `team`, `faq-items` |
| Beratung | `services`, `cases`, `team`, `industries` |
| Fitness | `courses`, `trainers`, `memberships` |
| Immobilien | `properties`, `agents`, `references` |
| Hochzeit | (kein Collection-System, Repeater in Sections) |

---

### Gemeinsame Collection-Felder (Base)

Alle Collection-Items erben:
```ts
{
  id, slug, title, shortDescription, featuredImage,
  hasSubpage, published, order,
  seoTitle, seoDescription, seoImage
}
```

---

## 14. Shared Section Library

Sections die branchen-übergreifend genutzt werden (aber branch-spezifisch konfigurierbar bleiben):

| Section-Type | Verwendung |
|---|---|
| `genericHero` | Jede Seite, die keinen spezifischen Hero braucht |
| `richTextBlock` | Freier Richtext-Content auf Generic Pages |
| `testimonials` | Alle Business-Branches |
| `teamGrid` | Restaurant, Handwerk, Beratung, Salon, Praxis, Fitness |
| `faqAccordion` | Alle Branches |
| `contactForm` | Alle Branches |
| `mapEmbed` | Alle Branches mit physischem Standort |
| `openingHours` | Restaurant, Salon, Praxis, Fitness, Hotel |
| `imageTextBlock` | Alle Branches |
| `statsGrid` | Handwerk, Beratung, Fitness, Immobilien |
| `logosBar` | Beratung (Kunden), Handwerk (Partner/Zertifikate) |
| `videoEmbed` | Alle Branches |
| `masonryGallery` | Restaurant, Hotel, Salon, Hochzeit, Tourismus |
| `ctaBanner` | Alle Branches |
| `newsTeaser` | Alle Branches mit Blog |
| `breadcrumb` | Alle Collection-Detail-Seiten |

---

## 15. Blog / News System

### Features

- Posts anlegen, bearbeiten, veröffentlichen (Draft/Publish)
- Kategorien + Tags (optional, konfigurierbar)
- Featured Image mit MediaObject (alt, caption, focal point)
- Excerpt (manuell oder auto-generiert)
- Rich Content (Block-Editor: Richtext, Bild, Video, Quote, Code, Trennlinie)
- Autor (Text-Feld, optional mit Bild)
- Veröffentlichungsdatum (kann in die Zukunft gesetzt werden → scheduled)
- SEO-Felder pro Post
- Listing-Seite (automatisch, paginiert)
- Post-Detailseite (automatisch)
- **Teaser-Section** (`newsTeaser`) auf anderen Seiten: zieht auto. die 3 neuesten published Posts

### Content-Blocks im Post-Editor

```ts
type ContentBlock =
  | { type: 'richText'; content: string }         // HTML/Markdown
  | { type: 'image'; media: MediaObject }
  | { type: 'imageGallery'; images: MediaObject[] }
  | { type: 'video'; media: MediaObject }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'divider' }
  | { type: 'embed'; code: string }
```

---

## 16. Implementierungs-Reihenfolge

### Phase 1 — Fundament (ohne dieses läuft nichts anderes)

1. **Neues DB-Schema** migrieren: `pages`, `sections`, `collections`, `collection_items`, `media`, `themes`, `site_settings`, `blog_posts`
2. **Content-API-Layer** neu: CRUD für Pages, Sections (mit order/visible), Collections, Items
3. **Theme-System** Grundgerüst: CSS Custom Properties, Token-Mapping, Tailwind-Config
4. **Button-Object** und **Media-Object** als TypeScript-Types + Formular-Komponenten
5. **Admin-Grundrahmen** neu aufsetzen: Sidebar-Navigation, Page-Liste, Section-Editor-Skeleton

### Phase 2 — Admin Page Builder

6. **Section-Liste** mit Move Up/Down, Visible-Toggle, Delete
7. **Section-Selector-Modal** mit branchen-gefiltertem Pool
8. **Section-Editoren** für alle `Shared Section Library`-Types (18 Sections)
9. **Draft/Publish-Flow**
10. **Media Library** (Upload + Picker im Section-Editor)

### Phase 3 — Anchor Template: Restaurant

11. **Restaurant-spezifische Section-Editoren** (restaurantHero, menuSection, reservationWidget, chefStory, etc.)
12. **Collection-System** für `menuCategories` + `dishes`
13. **Restaurant-spezifisches Frontend** (Classic, Modern, Bold)
14. **Demo-Content** Restaurant vollständig befüllen

### Phase 4 — Anchor Template: Handwerk

15. **Handwerk-Section-Editoren** (tradesmanHero, projectShowcase, processSteps, etc.)
16. **Collections** `services` + `projects`
17. **Handwerk-Frontend** (Classic, Modern, Bold)
18. **Demo-Content** Handwerk

### Phase 5 — Anchor Template: Beratung

19. **Beratung-Section-Editoren** (consultingHero, caseStudyCards, impactNumbers, etc.)
20. **Collections** `services` + `cases` + `team`
21. **Beratung-Frontend** (Classic, Modern, Bold)
22. **Demo-Content** Beratung

### Phase 6 — Anchor Template: Hochzeit

23. **Hochzeit-Section-Editoren** (weddingHero, countdown, storyTimeline, daySchedule, rsvpForm, etc.)
24. **RSVP-Tabelle** + **RSVP-API-Endpoint**
25. **Passwortschutz** für Wedding-Sites
26. **Hochzeit-Frontend** (Classic, Modern, Bold)
27. **Demo-Content** Hochzeit

### Phase 7 — Blog / News

28. **Blog-Post-Editor** (Block-Editor)
29. **Blog-Listing-Seite** + **Post-Detailseite** Frontend

### Phase 8 — Variation Templates

30. **Hotel** (RoomGrid, RoomDetail, etc.)
31. **Salon** (ServiceGrid, TeamGrid, PriceList)
32. **Tourismus** (TourGrid, TourDetail)
33. **Praxis** (TreatmentGrid, TeamProfiles, AppointmentEmbed)
34. **Fitness** (CourseSchedule, TrainerGrid, MembershipTiers)
35. **Immobilien** (PropertyGrid, PropertyDetail, ExposeDownload)

### Phase 9 — Polish

36. **Theme Editor im Admin** (Custom-Theme erstellen, speichern, Theme-Preview)
37. **Collection-Item-Detailseiten** polishen + SEO
38. **Framer Motion** Scroll-Reveals + Page-Transitions für alle Templates
39. **Live Preview** (optional — niedrigste Priorität)

---

_Ende Spec — Version 1.0_
