Spezifikation – Salon Klassisch
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Salon – Klassisch.
Alle Felder sind optional, es gibt keine Pflichtfelder.
Die definierte Reihenfolge ist die Standardstruktur bei Neuanlage.
Nutzer können Sections frei verschieben.
Ausgenommen hiervon sind:
noticeBanner, immer an Position 1
hero, immer an Position 2
Nutzer können zusätzliche freigegebene Sections hinzufügen.
Neu hinzugefügte Sections werden standardmäßig am Ende der frei sortierbaren Sections eingefügt.
2. Seiten
Home
Leistungen
Galerie
Über uns
Kontakt
3. Salonspezifische Standardmuster
Service-Item mit optionaler Detailseite
Für Haarschnitte, Colorationen, Styling, Pflegebehandlungen, Barber-Services oder besondere Salonleistungen.
title (Text)
subtitle (Text, optional)
description (Textarea)
image (Image Object)
price (Text, optional)
duration (Text, optional)
tags (Text, optional)
facts (Repeater, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
facts:
label (Text)
value (Text)
subpage:
eyebrow (Text)
title (Text)
description (Textarea)
image (Image Object)
content (Rich Text Editor)
Team- / Stylist-Item
Für Friseur:innen, Colorist:innen, Stylist:innen oder Barber.
name (Text)
role (Text)
description (Textarea)
image (Image Object)
specialties (Text, optional)
________________________________________
4. Seite: Home
Feste Sections
Hinweisbanner
Obere Infoleiste mit Öffnungszeiten, Terminstatus, Walk-in-Hinweisen, Spezialisierungen oder saisonalen Hinweisen.
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
Hero
Salon Klassisch Home zeigt ein großes bildstarkes Hero mit Headline, Beschreibung, CTA und Kennzahlen.
eyebrow (Text)
headline (Text)
subline (Text)
description (Textarea)
backgroundImage (Image Object)
buttonPrimary (Object: Standard-Button)
stats (Repeater, max. 4)
Pro Eintrag:
value (Text)
description (Text)
Standardmäßig enthaltene modulare Sections
Aktionsleiste
Unter dem Hero als schmale Utility-Leiste mit Öffnungsstatus, Terminbuchung oder Direktkontakt.
type = actionBar
isVisible (Boolean)
autoOpenStatusEnabled (Boolean)
openStatusOverride (Text)
buttonPrimary (Object: Standard-Button)
buttonSecondary (Object: Standard-Button)
Leistungs-Teaser
Auf Home als Auswahl der wichtigsten Services wie Schnitt, Farbe, Styling oder Pflege.
type = featuredServices
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen max. 3)
Pro Eintrag:
title (Text)
description (Textarea)
image (Image Object)
price (Text, optional)
duration (Text, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
Behandlungen / Services Grid
Ausführlichere Home-Section mit mehreren hervorgehobenen Leistungen.
type = serviceCards
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea)
items (Repeater)
Pro Eintrag:
title (Text)
subtitle (Text, optional)
description (Textarea)
image (Image Object)
price (Text, optional)
duration (Text, optional)
tags (Text, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
Story-Teaser
Klassischer Text-Bild-Block zur Positionierung des Salons / der Philosophie.
type = storyTeaser
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea)
image (Image Object)
button (Object: Standard-Button)
Galerie-Vorschau
Eindrücke aus Salon, Styling, Colorationen und Ergebnissen.
type = galleryPreview
isVisible (Boolean)
eyebrow (Text)
headline (Text)
images (Repeater, empfohlen 4 bis 6)
Pro Eintrag:
image (Asset / Image)
alt (Text)
Zusätzlich:
button (Object: Standard-Button)
Bewertungen-Teaser
Kund:innenstimmen als Kartenreihe.
type = testimonials
isVisible (Boolean)
eyebrow (Text)
headline (Text)
testimonials (Repeater)
Pro Eintrag:
name (Text)
quote (Textarea)
Eckdaten-Band
Kennzahlen wie Jahre Erfahrung, Teamgröße, Spezialgebiete oder Anzahl zufriedener Kund:innen.
type = statsBand
isVisible (Boolean)
items (Repeater, max. 4)
Pro Eintrag:
value (Text)
description (Textarea)
News-Teaser
News & Notizen auf Home, z. B. neue Services, Produkte, freie Termine oder saisonale Themen.
type = newsTeaser
isVisible (Boolean)
eyebrow (Text)
headline (Text)
postLimit (Number, Default: 3 oder 4)
button (Object: Standard-Button, optional)
CTA
Abschluss-CTA zur Terminvereinbarung oder Kontaktaufnahme.
type = cta
isVisible (Boolean)
eyebrow (Text)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
5. Seite: Leistungen
Diese Seite bündelt die eigentlichen Services und buchbaren bzw. anfragbaren Leistungen des Salons.
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
Hero
eyebrow (Text)
headline (Text)
description (Textarea)
image (Image Object)
Standardmäßig enthaltene modulare Sections
Highlights-Leiste
Kurze Leistungsargumente wie persönliche Beratung, hochwertige Produkte, Spezialisierungen oder flexible Terminoptionen.
type = highlightsBar
isVisible (Boolean)
items (Repeater, max. 4)
Pro Eintrag:
title (Text)
description (Text)
Leistungs-Übersicht
Erste kompakte Grid-Section mit Servicebereichen oder Leistungsgruppen.
type = serviceOverviewCards
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea)
items (Repeater)
Pro Eintrag:
title (Text)
description (Textarea)
image (Image Object)
price (Text, optional)
duration (Text, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
Services & Treatments
Ausführliche Kartenübersicht mit mehreren Leistungen.
type = serviceCards
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea)
items (Repeater)
Pro Eintrag:
title (Text)
subtitle (Text, optional)
description (Textarea)
image (Image Object)
price (Text, optional)
duration (Text, optional)
tags (Text, optional)
button (Object: Standard-Button)
hasSubpage (Boolean)
subpage (Object)
Ablaufschritte
Wie Terminvereinbarung, Beratung und Behandlung ablaufen.
type = steps
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater, empfohlen 4)
Pro Eintrag:
title (Text)
description (Text)
FAQs
Fragen zu Terminen, Dauer, Preisen, Produkten, Storno oder Vorbereitung.
type = faq
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
question (Text)
answer (Textarea)
CTA
type = cta
isVisible (Boolean)
eyebrow (Text)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
6. Seite: Galerie
Diese Seite ist die visuelle Erlebnis- / Ergebnisseite des Salons.
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
Hero
eyebrow (Text)
headline (Text)
description (Textarea)
Standardmäßig enthaltene modulare Sections
Intro-Teaser
Text links, kleine Themenkarten rechts.
type = teaserList
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea)
items (Repeater, max. 3)
Pro Eintrag:
title (Text)
description (Text)
Galerie
Bilder aus Salon, Looks, Schnitten, Colorationen, Styling oder Events.
type = gallery
isVisible (Boolean)
lightboxEnabled (Boolean, Default: true)
images (Repeater)
Pro Eintrag:
image (Asset / Image)
alt (Text)
Kategorien-Teaser
Kurze inhaltliche Zusammenfassung der wichtigsten Bereiche.
type = teaserList
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater, max. 3)
Pro Eintrag:
title (Text)
description (Text)
CTA
type = cta
isVisible (Boolean)
eyebrow (Text)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
7. Seite: Über uns
Salon Klassisch nutzt hier denselben erzählerischen Aufbau wie die klassischen Varianten der anderen Branchen, aber mit Fokus auf Team, Haltung und Entwicklung des Salons.
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
Hero
eyebrow (Text)
headline (Text)
description (Textarea)
image (Image Object)
Standardmäßig enthaltene modulare Sections
Werte-Teaser
„Drei Grundsätze“ bzw. zentrale Prinzipien des Salons.
type = teaserList
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater, max. 3)
Pro Eintrag:
title (Text)
description (Text)
Zeitstrahl
Entstehung und Entwicklung des Salons über die Jahre.
type = timeline
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
yearOrMarker (Text)
title (Text)
description (Textarea)
Team
Vorstellung der Stylist:innen und Mitarbeitenden.
type = team
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
name (Text)
role (Text)
description (Textarea)
image (Image Object)
specialties (Text, optional)
Eckdaten-Band
type = statsBand
isVisible (Boolean)
items (Repeater, max. 4)
Pro Eintrag:
value (Text)
description (Textarea)
Bewertungen-Teaser
type = testimonials
isVisible (Boolean)
eyebrow (Text)
headline (Text)
testimonials (Repeater)
Pro Eintrag:
name (Text)
quote (Textarea)
CTA
type = cta
isVisible (Boolean)
eyebrow (Text)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
8. Seite: Kontakt
Inhaltlich entspricht diese Seite der bekannten Kontaktlogik der anderen Branchen.
Wichtig: Weitere Standorte sind im Admin immer pflegbar, auch wenn sie auf Screenshots nicht sichtbar sind.
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
Hero
eyebrow (Text)
headline (Text)
subline (Textarea)
Standardmäßig enthaltene modulare Sections
Kontaktdaten
type = contactDetails
isVisible (Boolean)
eyebrow (Text)
headline (Text)
subline (Textarea)
phone (Auto-Pull / Systemfeld)
email (Auto-Pull / Systemfeld)
address (Auto-Pull / Systemfeld)
openingHours (Auto-Pull / Systemfeld)
contactForm (System-Komponente)
additionalFormFields (Repeater, optional)
googleMapsUrl (URL)
Pro zusätzliches Formularfeld:
label (Text)
fieldType (Select)
placeholder (Text)
required (Boolean)
Weitere Standorte
Diese Section ist unabhängig von der Sichtbarkeit im Screenshot immer im Admin pflegbar.
type = locations
isVisible (Boolean)
eyebrow (Text)
headline (Text)
subline (Textarea)
locations (Repeater)
Pro Standort:
name (Text)
phone (Text)
email (Email)
address (Text)
cityPostalCode (Text)
googleMapsUrl (URL)
openingHours (Repeater)
mapEmbedOrLink (URL, optional)
Pro Öffnungszeit:
days (Text)
time (Text)
Wegbeschreibung
Im Salon-Kontext auch für Anfahrt, Parken, ÖPNV oder Zugangshinweise passend.
type = directions
isVisible (Boolean)
eyebrow (Text)
headline (Text)
subline (Textarea)
items (Repeater)
Pro Eintrag:
title (Text)
description (Text)
CTA
type = cta
isVisible (Boolean)
eyebrow (Text)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
9. Branchenspezifische Besonderheiten Salon
Im Unterschied zu Restaurant liegt der Schwerpunkt hier nicht auf Produkten bzw. Speisekategorien, sondern auf Leistungen und Behandlungen.
Im Unterschied zu Hotel gibt es keine Unterkunftslogik, sondern Service- / Termin- / Beratungslogik.
Leistungen kann sowohl klassische Services als auch spezialisierte Treatments, Farbservices oder Styling-Angebote bündeln.
Kontakt bleibt funktional nah an der bekannten Kontaktseite der anderen Branchen und enthält im Admin immer auch die pflegbare Struktur für weitere Standorte

Spezifikation – Salon Modern
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Salon – Modern.
Alle Felder sind optional, es gibt keine Pflichtfelder.
Die definierte Reihenfolge ist die Standardstruktur bei Neuanlage.
Nutzer können Sections frei verschieben.
Ausgenommen hiervon sind:
•	noticeBanner, immer an Position 1
•	hero, immer an Position 2
Nutzer können zusätzliche freigegebene Sections hinzufügen.
Neu hinzugefügte Sections werden standardmäßig am Ende der frei sortierbaren Sections eingefügt.
________________________________________
2. Seiten
•	Start
•	Leistungen
•	Looks
•	Studio
•	Termin
________________________________________
3. Salonspezifische Standardmuster
Standard-Button
Wiederverwendbares Button-Objekt für interne und externe Verlinkungen.
•	label (Text)
•	linkType (Select: internal | external)
•	internalPage (Select, optional)
•	externalUrl (URL, optional)
________________________________________
Image Object
Wiederverwendbares Bildobjekt.
•	image (Asset / Image)
•	alt (Text, optional)
________________________________________
Service-Item mit optionaler Detailseite
Für Behandlungen, Services, Styling-Angebote, Farbservices, Bridal-Leistungen oder Pflegebehandlungen.
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	price (Text, optional)
•	duration (Text, optional)
•	tags (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
subpage:
•	eyebrow (Text)
•	title (Text)
•	description (Textarea)
•	image (Image Object)
•	content (Rich Text Editor)
________________________________________
Team-Item
Für Mitarbeitende / Stylist:innen / Spezialist:innen.
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
________________________________________
Testimonial-Item
Für Kund:innenstimmen.
•	name (Text)
•	quote (Textarea)
________________________________________
News-Post-Teaser
Für redaktionelle News-Karten.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Quick-Fact-Item
Für kleine Fakt- oder Meta-Infoboxen.
•	label (Text)
•	value (Text)
________________________________________
Price-Item
Für Preislisten innerhalb einer Kategorie.
•	title (Text)
•	description (Text, optional)
•	price (Text)
________________________________________
Price-Category
Für gruppierte Preisübersichten.
•	title (Text)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	description (Text, optional)
•	price (Text)
________________________________________
4. Seite: Start
Die Startseite von Salon – Modern ist editorial, bildstark und modular aufgebaut.
Im Fokus stehen Hero, kuratierte Looks, Studio-Einblicke, Social Proof, Markenpartner, Kennzahlen, News und ein starker Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
Schmale obere Infoleiste mit kurzen wechselnden Hinweisen wie freie Termine, Spezialisierungen, Premium-Partnerschaften oder Buchungsinformationen.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes modernes Hero mit markanter Headline, Introtext, CTA, Bild und Kennzahlenreihe.
•	eyebrow (Text)
•	headline (Text)
•	subline (Text, optional)
•	description (Textarea)
•	backgroundImage (Image Object)
•	buttonPrimary (Object: Standard-Button)
•	stats (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Standardmäßig enthaltene modulare Sections
Utility-Bar / Info-Leiste
Schmale Leiste direkt unter dem Hero für Öffnungsstatus, Hinweistext und schnelle Kontakt- bzw. Buchungsaktion.
•	type = actionBar
•	isVisible (Boolean)
•	statusLabel (Text, optional)
•	statusText (Text, optional)
•	infoText (Text, optional)
•	buttonPrimary (Object: Standard-Button, optional)
•	buttonSecondary (Object: Standard-Button, optional)
________________________________________
Looks der Woche
Kuratiertes kleines Karten-Grid mit ausgewählten Looks.
•	type = featuredLooks
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, empfohlen 3 bis 4)
Pro Eintrag:
•	image (Image Object)
•	title (Text, optional)
•	meta (Text, optional)
________________________________________
Looks aus dem Studio
Größere Galerie-Vorschau auf der Startseite mit masonry-artigem Grid und CTA zur Looks-Seite.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	images (Repeater, empfohlen 5 bis 8)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
Zusätzlich:
•	button (Object: Standard-Button)
________________________________________
Markenpartner
Horizontale Logoleiste für Produkt- oder Markenpartner.
•	type = brandLogos
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	logo (Image Object, optional)
________________________________________
Testimonials
Kund:innenstimmen in Kartenform.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	testimonials (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
________________________________________
Studio-Teaser
Editoriale Intro-Section zum Studio mit Text links und Bild rechts.
•	type = storyTeaser
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button)
________________________________________
Stats-Band
Dunkles Kennzahlenband mit bis zu vier Kennzahlen.
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
News & Notizen
Teaser-Section mit redaktionellen Beiträgen oder News-Karten.
•	type = newsTeaser
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	button (Object: Standard-Button, optional)
•	posts (Repeater, empfohlen 3)
Pro Eintrag:
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
CTA
Großer Abschluss-CTA in reduzierter Fläche.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
5. Seite: Leistungen
Die Leistungsseite von Salon – Modern kombiniert Hero, kompakte Argumentationsleiste, Servicekarten, Preisübersicht, Ablauf, FAQ und CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Hero mit Headline, Intro und Bild.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
________________________________________
Standardmäßig enthaltene modulare Sections
Highlights-Bar
Kurze Nutzen- oder Serviceargumente in einer horizontalen Leiste.
•	type = highlightsBar
•	isVisible (Boolean)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Service-Cards
Grid mit einzelnen Behandlungen / Services.
•	type = serviceCards
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	price (Text, optional)
•	duration (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Preisübersicht
Mehrspaltige Preislisten-Section mit gruppierten Kategorien.
•	type = pricingOverview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	categories (Repeater)
Pro Kategorie:
•	title (Text)
•	items (Repeater)
Pro Preis-Eintrag:
•	title (Text)
•	description (Text, optional)
•	price (Text)
Zusätzlich:
•	button (Object: Standard-Button, optional)
________________________________________
Schritte
Vierstufige Ablauf-Section.
•	type = steps
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
FAQ
Accordion-Section für häufige Fragen.
•	type = faq
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	question (Text)
•	answer (Textarea)
________________________________________
CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
6. Seite: Looks
Die Looks-Seite ist eine moderne Galerie- und Inspirationsseite mit Intro, Themenkarten, großem Bild-Grid, Kategorien-Teaser und CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
________________________________________
Standardmäßig enthaltene modulare Sections
Intro mit Themenkarten
Text links und kompakte Themenkarten rechts.
•	type = teaserList
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Galerie
Großes unregelmäßiges Bild-Grid mit optionaler Lightbox.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
________________________________________
Kategorien-Teaser
Kartenreihe mit Hauptkategorien der Looks.
•	type = categoryCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
7. Seite: Studio
Die Studio-Seite ist die „Über uns“-Seite der modernen Salon-Variante.
Sie kombiniert Hero, Studiobeschreibung, kompakte Faktenkarte, Werte, Zeitstrahl, Team, Kennzahlen, Testimonials und CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Hero mit Headline, Subline und Bild.
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	image (Image Object)
________________________________________
Standardmäßig enthaltene modulare Sections
Story mit Quick-Facts
Text-Section mit begleitender Fakt-Karte.
•	type = storyFacts
•	isVisible (Boolean)
•	description (Textarea)
•	facts (Repeater, empfohlen 3 bis 4)
Pro Eintrag:
•	label (Text)
•	value (Text)
________________________________________
Werte / Grundsätze
Kartenreihe mit drei Grundsätzen.
•	type = teaserList
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Zeitstrahl
Timeline mit Studioentwicklung.
•	type = timeline
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Team
Grid mit Teamkarten.
•	type = team
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
________________________________________
Stats-Band
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Testimonials
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	testimonials (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
________________________________________
CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
8. Seite: Termin
Die Termin-Seite ist eine moderne Kontakt- und Anfrage-Seite mit großem Hero, Kontaktdaten, Formular, Karte, Wegbeschreibung und CTA.
Wichtig: Weitere Standorte sind im Admin immer pflegbar, auch wenn sie im Frontend-Screenshot nicht sichtbar sind.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Hero mit Kontakt-/Buchungsheadline.
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Kontaktbereich
Zweispaltige Section mit Kontaktinfos links sowie Formular und Karte rechts.
•	type = contactDetails
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	phone (Auto-Pull / Systemfeld)
•	email (Auto-Pull / Systemfeld)
•	address (Auto-Pull / Systemfeld)
•	openingHours (Auto-Pull / Systemfeld)
•	contactForm (System-Komponente)
•	additionalFormFields (Repeater, optional)
•	googleMapsUrl (URL)
•	mapEmbedOrLink (URL, optional)
Pro zusätzliches Formularfeld:
•	label (Text)
•	fieldType (Select)
•	placeholder (Text)
•	required (Boolean)
________________________________________
Weitere Standorte
Diese Section ist im Admin immer pflegbar, unabhängig davon, ob sie im Frontend gezeigt wird.
•	type = locations
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	locations (Repeater)
Pro Standort:
•	name (Text)
•	phone (Text)
•	email (Email)
•	address (Text)
•	cityPostalCode (Text)
•	googleMapsUrl (URL)
•	openingHours (Repeater)
•	mapEmbedOrLink (URL, optional)
Pro Öffnungszeit:
•	days (Text)
•	time (Text)
________________________________________
Wegbeschreibung / Hinweise
Kartenreihe mit Anfahrt, Parken, Terminverschiebung oder ähnlichen Hinweisen.
•	type = directions
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
9. Branchenspezifische Besonderheiten Salon – Modern
Im Unterschied zur klassischen Salon-Variante ist Salon – Modern stärker editorial, visueller und modularer aufgebaut.
Typische Merkmale dieser Stil-Kombination sind:
•	starkes Hero mit klarer Typografie und großem Visual
•	kuratierte Look-Teaser auf der Startseite
•	größere Galerie- und Bildgrid-Logik
•	Markenlogo-Leiste
•	Studio-Seite mit kombinierter Story- und Facts-Darstellung
•	Preisübersicht als strukturierte Mehrspalten-Section
•	reduzierte, moderne CTA-Flächen
•	Kontaktseite mit Formular- und Kartenfokus
•	zusätzliche Standorte im Admin immer pflegbar
Spezifikation – Salon Bold
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Salon – Bold.
Alle Felder sind optional, es gibt keine Pflichtfelder.
Die definierte Reihenfolge ist die Standardstruktur bei Neuanlage.
Nutzer können Sections frei verschieben.
Ausgenommen hiervon sind:
•	noticeBanner, immer an Position 1
•	hero, immer an Position 2
Nutzer können zusätzliche freigegebene Sections hinzufügen.
Neu hinzugefügte Sections werden standardmäßig am Ende der frei sortierbaren Sections eingefügt.
________________________________________
2. Seiten
•	Start
•	Leistungen
•	Looks
•	Studio
•	Termin
________________________________________
3. Salonspezifische Standardmuster
Standard-Button
Wiederverwendbares Button-Objekt für interne und externe Verlinkungen.
•	label (Text)
•	linkType (Select: internal | external)
•	internalPage (Select, optional)
•	externalUrl (URL, optional)
________________________________________
Image Object
Wiederverwendbares Bildobjekt.
•	image (Asset / Image)
•	alt (Text, optional)
________________________________________
Service-Item mit optionaler Detailseite
Für Behandlungen, Farbservices, Styling, Spa, Bridal oder Pflegeleistungen.
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	price (Text, optional)
•	duration (Text, optional)
•	tags (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
subpage:
•	eyebrow (Text)
•	title (Text)
•	description (Textarea)
•	image (Image Object)
•	content (Rich Text Editor)
________________________________________
Team-Item
Für Teamkarten auf der Studio-Seite.
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
________________________________________
Testimonial-Item
Für Kund:innenstimmen.
•	name (Text)
•	quote (Textarea)
________________________________________
News-Post-Teaser
Für News- oder Magazin-Karten.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Price-Item
Für Preiszeilen in Preislisten.
•	title (Text)
•	description (Text, optional)
•	price (Text)
________________________________________
Price-Category
Für gruppierte Preiskategorien.
•	title (Text)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	description (Text, optional)
•	price (Text)
________________________________________
Marquee-Item
Für Lauftext-Bänder / horizontale Schlagwort-Bänder.
•	text (Text)
________________________________________
Quote-Wall-Item
Für Bold-Testimonial-Kompositionen mit Hauptzitat und zusätzlichen kleinen Zitaten.
•	quote (Textarea)
•	name (Text, optional)
•	isPrimary (Boolean)
________________________________________
4. Seite: Start
Die Startseite von Salon – Bold ist stark typografisch, kontrastreich und editorial aufgebaut.
Im Fokus stehen ein übergroßes Hero, horizontale Schlagwort-Bänder, visuelle Galerieflächen, markante Highlight-Module und kontraststarke CTA-Flächen.
________________________________________
Feste Sections
Hinweisbanner
Schmale obere Infoleiste mit kurzen Hinweisen wie freie Termine, Spezialisierungen oder Buchungsinformationen.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit sehr prägnanter Headline, optionalem Introtext und primärem CTA.
•	eyebrow (Text)
•	headline (Text)
•	subline (Text, optional)
•	description (Textarea, optional)
•	buttonPrimary (Object: Standard-Button)
•	backgroundImage (Image Object, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Marquee-Band
Horizontales Band mit kurzen Schlagworten / Themenbegriffen.
•	type = marqueeBand
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Large Image Stage
Große visuelle Fläche direkt unter dem Marquee-Band.
•	type = featureImage
•	isVisible (Boolean)
•	image (Image Object)
•	caption (Text, optional)
________________________________________
Utility-Bar / Info-Leiste
Schmale Leiste mit Status, Hinweistext und Schnellaktion.
•	type = actionBar
•	isVisible (Boolean)
•	statusLabel (Text, optional)
•	statusText (Text, optional)
•	infoText (Text, optional)
•	buttonPrimary (Object: Standard-Button, optional)
•	buttonSecondary (Object: Standard-Button, optional)
________________________________________
Looks aus dem Studio
Große Galerie-Vorschau mit unregelmäßigem Bildgrid.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	button (Object: Standard-Button, optional)
•	images (Repeater, empfohlen 6 bis 9)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
________________________________________
Looks der Woche
Kontrastreiche Highlight-Section mit farbiger Hintergrundfläche und kleiner kuratierter Bildauswahl.
•	type = featuredLooksBand
•	isVisible (Boolean)
•	headline (Text)
•	backgroundStyle (Select: accentPink | accentDark | custom)
•	items (Repeater, empfohlen 3 bis 4)
Pro Eintrag:
•	image (Image Object)
•	title (Text, optional)
•	meta (Text, optional)
________________________________________
Studio-Statement
Editoriale Split-Section mit starkem Titel links und Beschreibung rechts.
•	type = storySplit
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	button (Object: Standard-Button, optional)
________________________________________
Stats-Band
Dunkles Kennzahlenband mit bis zu vier Kennzahlen.
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Testimonial-Marquee
Horizontales Band mit sich wiederholenden Signalbegriffen für Social Proof.
•	type = testimonialMarquee
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Quote-Wall
Bold-Testimonial-Section mit einem großen Hauptzitat und ergänzenden kleineren Zitaten.
•	type = quoteWall
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	quote (Textarea)
•	name (Text, optional)
•	isPrimary (Boolean)
________________________________________
News / Notizen
Kartenreihe mit News oder redaktionellen Notizen.
•	type = newsTeaser
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	button (Object: Standard-Button, optional)
•	posts (Repeater, empfohlen 3)
Pro Eintrag:
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
CTA-Band
Große kontrastreiche Abschlussfläche mit Headline, Subline und Button.
•	type = ctaBand
•	isVisible (Boolean)
•	backgroundStyle (Select: accentPink | dark | light)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
5. Seite: Leistungen
Die Leistungsseite von Salon – Bold setzt auf eine starke Hero-Typografie, eine kompakte Nutzenleiste, eine lineare Service-Liste mit Preis-Badges, Preisübersichten, Ablauf, FAQ und Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit starker Headline und kurzem Intro.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
________________________________________
Standardmäßig enthaltene modulare Sections
Highlights-Bar
Horizontale Nutzen- bzw. Serviceargumente.
•	type = highlightsBar
•	isVisible (Boolean)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Service-List
Vertikale Service-Liste mit Bild links, großem Titel, Beschreibung und Preis-Label rechts.
•	type = serviceList
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	price (Text, optional)
•	duration (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Preisübersicht
Mehrspaltige Preislisten-Section mit Kategorien.
•	type = pricingOverview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	categories (Repeater)
Pro Kategorie:
•	title (Text)
•	items (Repeater)
Pro Preis-Eintrag:
•	title (Text)
•	description (Text, optional)
•	price (Text)
Zusätzlich:
•	button (Object: Standard-Button, optional)
________________________________________
Schritte
Vier Schritte vom Erstkontakt bis zur Nachpflege.
•	type = steps
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
FAQ
Accordion für häufige Fragen.
•	type = faq
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	question (Text)
•	answer (Textarea)
________________________________________
Large CTA
Große typografische CTA-Fläche.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
6. Seite: Looks
Die Looks-Seite kombiniert ein sehr großes Hero, ein Intro mit Themenkarten, eine großflächige Galerie, Kategorienkarten und einen übergroßen CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit sehr markanter Headline und kurzem Beschreibungstext.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
________________________________________
Standardmäßig enthaltene modulare Sections
Intro mit Themenkarten
Text links, kurze Kategoriekarten rechts.
•	type = teaserList
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Galerie
Großes unregelmäßiges Grid mit optionaler Lightbox.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
________________________________________
Kategorien-Karten
Kartenreihe für die wichtigsten Leistungs- oder Look-Kategorien.
•	type = categoryCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Large CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
7. Seite: Studio
Die Studio-Seite von Salon – Bold ist die „Über uns“-Seite im stark typografischen Stil.
Sie kombiniert ein übergroßes Hero, Story-Section mit Bild, Werte, Timeline, Team, Kennzahlen, Testimonials und CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit sehr markanter Headline.
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Story mit Bild
Split-Layout mit Bild links und Fließtext rechts.
•	type = storyImageSplit
•	isVisible (Boolean)
•	image (Image Object)
•	description (Textarea)
________________________________________
Werte / Grundsätze
Kartenreihe mit drei zentralen Prinzipien.
•	type = teaserList
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Timeline
Zeitstrahl zur Studioentwicklung.
•	type = timeline
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Team
Teamkarten mit Bild, Rolle und Kurzbeschreibung.
•	type = team
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
________________________________________
Stats-Band
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Testimonials
Grid mit Kund:innenstimmen.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
________________________________________
Large CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
8. Seite: Termin
Die Termin-Seite von Salon – Bold nutzt eine sehr große typografische Hero-Fläche und kombiniert Kontaktdaten, Formular, Karte, Wegbeschreibung und CTA.
Wichtig: Weitere Standorte sind im Admin immer pflegbar, auch wenn sie im Frontend nicht sichtbar sind.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Sehr große Kontakt- / Termin-Headline im Bold-Stil.
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Kontaktbereich
Zweispaltige Kontakt-Section mit Kontaktdaten links, Formular und Karte rechts.
•	type = contactDetails
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	phone (Auto-Pull / Systemfeld)
•	email (Auto-Pull / Systemfeld)
•	address (Auto-Pull / Systemfeld)
•	openingHours (Auto-Pull / Systemfeld)
•	contactForm (System-Komponente)
•	additionalFormFields (Repeater, optional)
•	googleMapsUrl (URL)
•	mapEmbedOrLink (URL, optional)
Pro zusätzliches Formularfeld:
•	label (Text)
•	fieldType (Select)
•	placeholder (Text)
•	required (Boolean)
________________________________________
Weitere Standorte
Diese Section ist im Admin immer pflegbar, unabhängig davon, ob sie im Frontend sichtbar ist.
•	type = locations
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	locations (Repeater)
Pro Standort:
•	name (Text)
•	phone (Text)
•	email (Email)
•	address (Text)
•	cityPostalCode (Text)
•	googleMapsUrl (URL)
•	openingHours (Repeater)
•	mapEmbedOrLink (URL, optional)
Pro Öffnungszeit:
•	days (Text)
•	time (Text)
________________________________________
Wegbeschreibung / Hinweise
Kartenreihe für Anfahrt, Parken, Terminverschiebung oder ähnliche Hinweise.
•	type = directions
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Large CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
9. Branchenspezifische Besonderheiten Salon – Bold
Im Unterschied zu Salon – Klassisch und Salon – Modern ist Salon – Bold deutlich stärker typografiegetrieben und kontrastreicher inszeniert.
Typische Merkmale dieser Stil-Kombination sind:
•	sehr große, plakative Hero-Headlines
•	stärkere Arbeit mit Versalien / markanter Typografie
•	horizontale Marquee-Bänder mit Schlagworten oder Social-Proof-Begriffen
•	kontrastreiche Highlight-Flächen in Akzentfarben
•	lineare Service-Liste statt reinem Karten-Grid auf der Leistungsseite
•	größere, statementartige CTA-Flächen
•	stärkere Editorial-Anmutung in Story- und Testimonial-Modulen
•	Kontaktseite mit großem typografischen Einstieg
•	weitere Standorte im Admin immer pflegbar

