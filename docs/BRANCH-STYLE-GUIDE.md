# Branch Style Guide

Distillat aus dem [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (MIT, v2.5.0)
gemappt auf unsere 8 Zielbranchen × 3 Style-Varianten (Classic / Modern / Bold).
Quelle: `data/styles.csv` (85 dokumentierte UI-Styles mit Tokens, Easing, Typo, Anti-Patterns).

Kein Python, keine CLI – die relevanten Tokens sind hier hart eingefroren und werden
in `TemplateApp.tsx` als `BRANCH_STYLE_PROFILES` gespiegelt.

---

## Wie wir es nutzen

- **Classic** = ruhiger Editorial / Magazin-Stil (Style #66, #50)
- **Modern** = polished SaaS / Cinema-Glass (Style #71, #83)
- **Bold** = Kinetic Brutalism / Neo-Brutalism (Style #74, #77, #38, #4)

Jede Branche bekommt zusätzlich ein **Mood-Profil** (Farbe-Schiebung, Easing,
Shadow-Style, Typo-Wahl), das auf den drei Styles aufsetzt.

---

## Branchen-Profile

### 🍝 Restaurant
- **Mood**: Warm Trattoria · Sepia + Crimson Akzente · Editorial Magazin
- **Classic** → Style #66 *Editorial Grid*: Drop-Caps, asymmetric grid, Pull-Quotes, große Typo (Fraunces/Newsreader Italic), serif body
- **Modern** → Style #20 *Hero-Centric*: full-bleed Tellerfoto, gradient overlay, Reservierungs-CTA
- **Bold** → Style #66 + #38 *Neubrutalism*: Marquee mit „TRATTORIA · TRATTORIA", schwere Italic-Headlines, Kupfer-Akzent
- **Anti-Pattern**: Neon, Cyberpunk, Glassmorphism (zu kühl)

### 🏨 Hotel
- **Mood**: Soft Editorial · Warmes Off-White · Bronze-Akzent · Spatial Depth
- **Classic** → Style #79 *Academia* (gemildert): Arch-Top Bilder, Cormorant Headlines, Brass-Highlights
- **Modern** → Style #55 *Spatial UI* + #19 *Soft UI Evolution*: Frosted Glass Cards (15% opacity), Backdrop-Blur 20px, Bronze CTA
- **Bold** → Style #47 *Exaggerated Minimalism*: Riesige Zimmer-Nummerierung, Negativraum, einzelner Akzent
- **Anti-Pattern**: Brutalism (zu kühl), Cyberpunk, Neon

### ⛰️ Tourismus
- **Mood**: Adventure Editorial · Tiefes Indigo + Sonnengelb · Energetisch
- **Classic** → Style #49 *Parallax Storytelling*: Layered scroll, große Landschaftsbilder, Schritt-Indikatoren
- **Modern** → Style #20 + #66: Tour-Karten mit Map, Schwierigkeits-Badge, bento-Stil
- **Bold** → Style #74 *Kinetic Brutalism*: Acid-Yellow #DFE104, Marquee mit Tour-Namen, Hero-Parallax (scale 1→1.3)
- **Anti-Pattern**: Pastell, Glassmorphism, Y2K

### 💇 Salon / Beauty
- **Mood**: Beauty Editorial · Rose-Nude + Tiefschwarz · Sinnlich
- **Classic** → Style #66 + #61 *Nature Distilled*: Terracotta + Sand, organische Radien, humanistic Sans
- **Modern** → Style #19 *Soft UI Evolution* + Glassmorphism: Tilt-Cards, Soft Shadows
- **Bold** → Style #47 + #38: Negativraum-Hero, einziger Akzent (Rose), Hard-Offset-Shadows auf Service-Cards
- **Anti-Pattern**: Brutalism (zu rau), HUD, Pixel Art

### 🔧 Handwerk
- **Mood**: Technical Blocky · Charcoal + Safety-Orange · Vertrauen
- **Classic** → Style #50 *Swiss Modernism 2.0*: 12-col Grid, Inter, single Akzent, sachlich
- **Modern** → Style #75 *Flat Mobile-Touch* + #82-equivalent: Color-Blocking, klare Icons in Container
- **Bold** → Style #69 *Bauhaus*: Primärfarben (Rot/Blau/Gelb), 4px Hard-Offset-Shadow, mechanical press
- **Anti-Pattern**: Glassmorphism, Aurora, Y2K

### 🩺 Praxis / Medical
- **Mood**: Clinical Clean · Sage-Green + White · Vertrauen
- **Classic** → Style #50 + #8 *Accessible*: WCAG AAA, generöser Whitespace, Inter
- **Modern** → Style #19 + Glass: Soft Shadows, Pastell-Mint, ruhige Animationen (200-300ms)
- **Bold** → Style #47 + #50: Übergroße Typo, einzelner Sage-Akzent (kein Brutalism!)
- **Anti-Pattern**: Brutalism, Cyberpunk, Memphis, Kinetic-Heavy (Trust-Bruch)

### 💪 Fitness
- **Mood**: Bold Energetic · Tiefschwarz + Lime/Volt · Motion
- **Classic** → Style #20 *Hero-Centric*: Action-Hero, klare CTA „Probetraining"
- **Modern** → Style #71 *Modern Dark Cinema*: Deep #020203 Background, Ambient Light Blobs, Inter Bold
- **Bold** → Style #74 *Kinetic Brutalism*: Acid Yellow #DFE104 oder Volt-Green, Marquee-Übungsnamen, Hero-Parallax
- **Anti-Pattern**: Neumorphism, Pastell, Editorial-Soft

### 💼 Beratung / Consulting
- **Mood**: Corporate Trust · Indigo + Ivory · Premium-SaaS
- **Classic** → Style #50 *Swiss Modernism 2.0* + #66: Streng grid, Inter + Newsreader für Pull-Quotes
- **Modern** → Style #83 *Enterprise SaaS*: Indigo-Violet Gradient CTAs, Plus Jakarta, Spring Animations
- **Bold** → Style #47 *Exaggerated Minimalism*: Übergroße Headline-Statements, single Indigo Akzent
- **Anti-Pattern**: Memphis, Y2K, Cyberpunk, Pixel Art, Anti-Polish

---

## Globale Effekt-Patterns (aus dem Skill, alle in `motion-fx.tsx`)

| Effekt | Skill-Quelle | Wo eingesetzt |
|---|---|---|
| Magnetic Cursor (FM Spring) | #62 Interactive Cursor | Hero-CTAs, Branch-Cards |
| 3D Tilt Card | #5 + #46 Dimensional Layering | Templates-Preview-Grid, Service-Cards (Modern) |
| Scroll Progress | #15 Motion-Driven | Sticky-Top-Bar global |
| Stagger Reveal | #15 + #48 Kinetic Typography | Hero, Service-Lists |
| Marquee Word-Strip | #57 Gen-Z + #74 Kinetic | Bold-Style Hero, Footer |
| Hard-Offset-Shadow | #38 Neubrutalism + #77 | Bold-Style Service-Cards |
| Glass Cards (Backdrop-Blur) | #3 Glassmorphism + #55 | Hotel-Modern, Salon-Modern |
| Editorial Drop Cap | #66 Editorial Grid | Restaurant-Classic, Salon-Classic |
| Animated Counter | #15 + #24 Social Proof | Numbers-Band überall |
| Cursor Spotlight | #62 Interactive Cursor | Landing Hero |

---

## Anti-Pattern Audit (universal)

Diese Sachen NIE benutzen, egal welche Branche:
- ☠️ Reduce-Motion ignorieren — alle FM-Animationen müssen `prefers-reduced-motion` respektieren
- ☠️ `<a>` ohne `aria-label` für Icon-only Links
- ☠️ Touch-Targets < 44×44px
- ☠️ Pure Black `#000000` als großflächiges BG (OLED-Smear) — wir nutzen `#14111a`
- ☠️ Pure White `#FFFFFF` für Off-White Backgrounds — wir nutzen `#fff8fa`
- ☠️ Color-only Status-Indicators ohne Symbol/Pattern
- ☠️ `transition: all` (forciert Reflow auf jeden Property-Change) — immer explizit

---

## Pflege

Wenn ein neuer Branch dazukommt: hier zuerst Profil eintragen, dann Code in
`TemplateApp.tsx` anpassen, dann `BRANCH_STYLE_PROFILES` ergänzen.
