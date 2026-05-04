Spezifikation – Hotel Klassisch
1. Allgemein
	Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Hotel – Klassisch.
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
	Zimmer
	Haus & Spa
	Geschichte
	Reservieren
3. Hotelspezifische Standardmuster
Unterkunfts-Item mit optionaler Detailseite
Für Zimmer, Suiten oder Aufenthaltspakete eignet sich ein wiederverwendbares Item-Pattern mit optionaler Detailseite, weil Listing und detaillierte Buchungs-/Ausstattungsansicht sauber getrennt bleiben.
	title (Text)
	subtitle (Text, optional)
	description (Textarea)
	image (Image Object)
	price (Text, optional)
	priceSuffix (Text, optional), z. B. / Nacht
	facts (Repeater, optional)
	features (Repeater, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
facts:
	label (Text)
	value (Text)
features:
	text (Text)
subpage:
	eyebrow (Text)
	title (Text)
	description (Textarea)
	image (Image Object)
	content (Rich Text Editor)
Angebots- / Bereichs-Card
Für Hausbereiche wie Spa & Pool, Restaurant & Bar, Tagungen & Events oder Bergführer & Aktivprogramm.
	title (Text)
	description (Textarea)
	image (Image Object)
	meta (Text, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
4. Seite: Home
Feste Sections
Hinweisbanner
Im Screenshot als schmale obere Leiste mit Hotel-Infos wie Verfügbarkeit, Spa, Familienbetrieb oder Direktbuchung sichtbar.
	isVisible (Boolean)
	items (Repeater)
	Pro Eintrag:
	text (Text)
Hero
Hotel Klassisch Home zeigt ein großes bildstarkes Hero mit Headline, Beschreibung, CTA und Kennzahlen.
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
Unter dem Hero als schmale Utility-Leiste mit Direktkontakt / Anfrage.
	type = actionBar
	isVisible (Boolean)
	autoAvailabilityStatusEnabled (Boolean)
	availabilityStatusOverride (Text)
	buttonPrimary (Object: Standard-Button)
	buttonSecondary (Object: Standard-Button)
Bereichs-Teaser
Auf Home als Liste wichtiger Hotelbereiche wie Zimmer, Spa, Restaurant.
	type = featuredAreas
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea, optional)
	items (Repeater, empfohlen max. 3)
Pro Eintrag:
	title (Text)
	description (Textarea)
	image (Image Object)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Story-Teaser
Klassischer Text-Bild-Block zur Positionierung des Hauses.
	type = storyTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea)
	image (Image Object)
	button (Object: Standard-Button)
Galerie-Vorschau
Eindrücke aus Haus, Spa, Zimmern und Umgebung.
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
Gästezitate als Kartenreihe.
	type = testimonials
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	testimonials (Repeater)
Pro Eintrag:
	name (Text)
	quote (Textarea)
Eckdaten-Band
Kennzahlen wie Baujahr, Zimmer & Suiten, Sterne oder Spa-Fläche.
	type = statsBand
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	value (Text)
	description (Textarea)
News-Teaser
News & Notizen auf Home als Beitragskarten.
	type = newsTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	postLimit (Number, Default: 3 oder 4)
	button (Object: Standard-Button, optional)
CTA
Abschluss-CTA zur Anfrage oder Zimmerbuchung.
	type = cta
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	subline (Textarea)
	button (Object: Standard-Button)
5. Seite: Zimmer
Diese Seite bündelt sowohl Zimmer / Suiten als auch ergänzende Aufenthaltsangebote und Pakete.
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
Highlights-Leiste
Kurze Leistungsargumente direkt unter dem Hero.
	type = highlightsBar
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	title (Text)
	description (Text)
Unterkunfts-Übersicht
Erste Listing-Section für Zimmer, Suiten und Hauptangebote.
	type = accommodationsGrid
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
	priceSuffix (Text, optional)
	facts (Repeater, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Zimmer & Suiten Detail-Grid
Zweite, ausführlichere Angebotsübersicht mit mehr Karten und Feature-Listen.
	type = roomCards
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
	priceSuffix (Text, optional)
	features (Repeater)
	button (Object: Standard-Button)
	hasSubpage (Boolean)
	subpage (Object)
Pro Feature:
	text (Text)
Ablaufschritte
Buchungsablauf in vier Schritten.
	type = steps
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	items (Repeater, empfohlen 4)
Pro Eintrag:
	title (Text)
	description (Text)
FAQs
Hotelspezifische Fragen wie Check-in, Halbpension, Hunde oder Spa-Nutzung.
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
6. Seite: Haus & Spa
Diese Seite funktioniert wie eine Mischung aus Galerie und Bereichsübersicht.
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
Text links, kleine Bereichskarten rechts.
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
Bilder aus Haus, Spa, Restaurant, Zimmern und Umgebung.
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
7. Seite: Geschichte
Hotel Klassisch nutzt hier denselben erzählerischen Aufbau wie Restaurant Klassisch, aber mit hotelspezifischen Inhalten.
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
„Drei Grundsätze“ bzw. zentrale Hotelprinzipien.
	type = teaserList
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	items (Repeater, max. 3)
Pro Eintrag:
	title (Text)
	description (Text)
Zeitstrahl
Entwicklung des Hauses über die Jahre.
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
Menschen hinter dem Haus.
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
8. Seite: Reservieren
Inhaltlich entspricht diese Seite der bekannten Kontakt-/Reservierungslogik, aber für Hotelanfragen.
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
Wie angekündigt wird dieses Schema ab hier auch für Hotel und die folgenden Branchen konstant verwendet.
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
Im Hotel-Kontext auch für Anreise / Check-in-Hinweise passend.
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
9. Branchenspezifische Besonderheiten Hotel
	Im Unterschied zu Restaurant hat Hotel – Klassisch eine eigene starke Seite Zimmer, in der sowohl Zimmer/Suiten als auch Zusatzangebote oder Aufenthaltspakete als buchbare Items auftauchen.
	Haus & Spa funktioniert nicht nur als Galerie, sondern als kombinierte Erlebnis- und Bereichsseite.
	Reservieren ist funktional nah an Kontakt, sollte aber im System weiterhin als hotelspezifische Anfrage-/Buchungsseite geführt werden
Spezifikation – Hotel Modern
1. Allgemein
	Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Hotel – Modern.
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
	Zimmer
	Haus & Spa
	Geschichte
	Reservieren
3. Stilcharakteristik Modern
	Hotel Modern ist sachlicher und systematischer aufgebaut als Hotel Klassisch, mit stärkerem Fokus auf Cards, modulare Raster, Fact-Boxen und UI-nahe Inhaltsblöcke.
	Inhaltlich bleiben viele Section-Typen ähnlich, aber einige Bereiche erhalten modern-spezifische Ausprägungen wie featuredFacts, brandLogos, roomOverviewCards oder kompaktere Hero-Setups.
4. Hotelspezifische Standardmuster
Unterkunfts-Item mit optionaler Detailseite
Für Zimmer, Suiten und buchbare Aufenthaltsangebote.
	title (Text)
	subtitle (Text, optional)
	description (Textarea)
	image (Image Object)
	price (Text, optional)
	priceSuffix (Text, optional)
	facts (Repeater, optional)
	features (Repeater, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
facts:
	label (Text)
	value (Text)
features:
	text (Text)
subpage:
	eyebrow (Text)
	title (Text)
	description (Textarea)
	image (Image Object)
	content (Rich Text Editor)
Bereichs-Card
Für Hotelbereiche wie Zimmer, Spa, Restaurant, Events oder Aktivprogramm.
	title (Text)
	description (Textarea)
	image (Image Object)
	meta (Text, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
5. Seite: Home
Feste Sections
Hinweisbanner
Wie bei Klassisch als obere Infobar mit Verfügbarkeit, Spa, Familienbetrieb oder Direktbuchung.
	isVisible (Boolean)
	items (Repeater)
	Pro Eintrag:
	text (Text)
Hero
Modern Home besitzt ein reduziertes Hero mit starkem Bild, kompaktem Text und Kennzahlen.
	eyebrow (Text)
	headline (Text)
	subline (Text)
	description (Textarea)
	image (Image Object)
	buttonPrimary (Object: Standard-Button)
	stats (Repeater, max. 4)
Pro Eintrag:
	value (Text)
	description (Text)
Standardmäßig enthaltene modulare Sections
Aktionsleiste
Unter dem Hero als Utility-Bar.
	type = actionBar
	isVisible (Boolean)
	autoAvailabilityStatusEnabled (Boolean)
	availabilityStatusOverride (Text)
	buttonPrimary (Object: Standard-Button)
	buttonSecondary (Object: Standard-Button)
Galerie-Vorschau
Auf Modern Home direkt als visuelles Intro.
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
Brand- / Partner-Logos
Im Home-Screenshot als horizontale Logozeile sichtbar.
	type = brandLogos
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	name (Text)
	logo (Image Object, optional)
	link (URL, optional)
Zimmer-Teaser
Kompakte Kartenreihe zu den Hauptbereichen oder Unterkunftsgruppen.
	type = featuredAreas
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	button (Object: Standard-Button, optional)
	items (Repeater, empfohlen max. 3)
Pro Eintrag:
	title (Text)
	description (Textarea)
	image (Image Object)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Story-Teaser
Text links, Bild rechts, modern reduziert.
	type = storyTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea)
	image (Image Object)
	button (Object: Standard-Button)
Eckdaten-Band
Dunkles Kennzahlenband.
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
News-Teaser
	type = newsTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	postLimit (Number, Default: 3 oder 4)
	button (Object: Standard-Button, optional)
CTA
Modern Home schließt mit einem klaren, eher UI-artigen CTA-Panel.
	type = cta
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	subline (Textarea)
	button (Object: Standard-Button)
6. Seite: Zimmer
Hotel Modern Zimmer entspricht inhaltlich der klassischen Zimmerseite, ist aber strukturierter und kartenlastiger aufgebaut.
Feste Sections
Hinweisbanner
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	text (Text)
Hero
Hero mit Text links und Bild rechts.
	eyebrow (Text)
	headline (Text)
	subline (Textarea)
	image (Image Object)
Standardmäßig enthaltene modulare Sections
Highlights-Leiste
Kurze Angebotsvorteile unter dem Hero.
	type = highlightsBar
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	title (Text)
	description (Text)
Bereichs-Übersicht
Erste Kartenreihe mit Unterkunfts- und Angebotsbereichen.
	type = accommodationsGrid
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	title (Text)
	description (Textarea)
	image (Image Object)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Zimmer & Suiten Detail-Grid
Ausführliche Zimmerkarten mit Preisen, Features und CTA.
	type = roomCards
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
	priceSuffix (Text, optional)
	features (Repeater)
	button (Object: Standard-Button)
	hasSubpage (Boolean)
	subpage (Object)
Pro Feature:
	text (Text)
Ablaufschritte
	type = steps
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	items (Repeater, empfohlen 4)
Pro Eintrag:
	title (Text)
	description (Text)
FAQs
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
7. Seite: Haus & Spa
Modern Haus & Spa ist der klassischen Version sehr ähnlich, wirkt aber kompakter und sachlicher.
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
	type = gallery
	isVisible (Boolean)
	lightboxEnabled (Boolean, Default: true)
	images (Repeater)
Pro Eintrag:
	image (Asset / Image)
	alt (Text)
Kategorien-Teaser
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
8. Seite: Geschichte
Modern Geschichte ist stärker editorial und modular aufgebaut als die klassische Version, mit separater Fact-Card im Intro.
Feste Sections
Hinweisbanner
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	text (Text)
Hero
Text links, Bild rechts.
	eyebrow (Text)
	headline (Text)
	description (Textarea)
	image (Image Object)
Standardmäßig enthaltene modulare Sections
Story-Facts
Moderne Einleitungs-Section mit Fließtext plus Infobox.
	type = storyFacts
	isVisible (Boolean)
	description (Rich Text oder Textarea)
	items (Repeater, empfohlen 3 bis 4)
Pro Eintrag:
	label (Text)
	value (Text)
Werte-Teaser
	type = teaserList
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	items (Repeater, max. 3)
Pro Eintrag:
	title (Text)
	description (Text)
Zeitstrahl
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
9. Seite: Reservieren
Modern Reservieren bleibt inhaltlich gleich wie Klassisch, nur typografisch moderner gesetzt.
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
Wie besprochen bleibt dieses Schema auch hier identisch.
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
10. Abgrenzung zu Hotel Klassisch
	Hotel – Modern nutzt nahezu dieselben Kernseiten wie Hotel – Klassisch, aber mit stärker modularisierten Content-Blöcken und modernerem UI-Raster.
	Die größten Unterschiede liegen auf Home und Geschichte, wo modern zusätzliche bzw. anders gesetzte Module wie brandLogos und storyFacts deutlicher hervorhebt.
	Zimmer, Haus & Spa und Reservieren bleiben strukturell sehr nah an der klassischen Variante, sodass du hier später gut mit gemeinsamen Section-Typen und stilabhängigen Templates arbeiten kannst.
Ja — Hotel Bold ist jetzt sauber erkennbar: Die Unterseiten Zimmer, Haus & Spa, Geschichte und Reservieren bleiben strukturell sehr nah an Hotel Modern bzw. Klassisch, aber die Home-Seite bekommt wie bei Restaurant – Bold eine deutlich plakativere, kampagnenartige Dramaturgie mit Marquee, dunkler Auswahl-Section, Stimmenband und starkem CTA-Block.
Die Regel zu weiteren Standorten bleibt selbstverständlich auch hier identisch bestehen.
Spezifikation – Hotel Bold
1. Allgemein
	Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Hotel – Bold.
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
	Zimmer
	Haus & Spa
	Geschichte
	Reservieren
3. Stilcharakteristik Bold
	Hotel Bold arbeitet mit stark verdichteter Typografie, plakativem Hero, kontrastreichen Bändern, großflächigen CTA-Momenten und einer editorial-kampagnenhaften Home-Struktur.
	Inhaltlich bleibt das Grundsystem nahe an Hotel Modern, aber Home und einige Darstellungsvarianten benötigen eigene Bold-spezifische Section-Typen.
	Besonders auffällig sind das große Themenband direkt unter dem Hero, eine dunkle Auswahl-Section sowie ein breites Stimmen-/Zitatband auf Home.
4. Hotelspezifische Standardmuster
Unterkunfts-Item mit optionaler Detailseite
Für Zimmer, Suiten und buchbare Angebote.
	title (Text)
	subtitle (Text, optional)
	description (Textarea)
	image (Image Object)
	price (Text, optional)
	priceSuffix (Text, optional)
	facts (Repeater, optional)
	features (Repeater, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
facts:
	label (Text)
	value (Text)
features:
	text (Text)
subpage:
	eyebrow (Text)
	title (Text)
	description (Textarea)
	image (Image Object)
	content (Rich Text Editor)
Bereichs-Card
Für Hausbereiche wie Zimmer & Suiten, Spa & Pool, Restaurant & Bar, Tagungen & Events, Aktivprogramm.
	title (Text)
	description (Textarea)
	image (Image Object)
	meta (Text, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
5. Seite: Home
Feste Sections
Hinweisbanner
Obere Leiste mit Verfügbarkeit, Spa, Familienbetrieb, Direktbuchung.
	isVisible (Boolean)
	items (Repeater)
	Pro Eintrag:
	text (Text)
Hero
Bold Home zeigt eine maximal plakative Headline, CTA, großes Bild und Kennzahlen.
	eyebrow (Text)
	headline (Text)
	subline (Text)
	description (Textarea)
	buttonPrimary (Object: Standard-Button)
	image (Image Object)
	stats (Repeater, max. 4)
Pro Eintrag:
	value (Text)
	description (Text)
Standardmäßig enthaltene modulare Sections
Marquee-Themenband
Direkt unter dem Hero sichtbar als großes, horizontales Themenband.
	type = marqueeBand
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	text (Text)
Optional:
	separator (Text, optional)
Aktionsleiste
Unter dem Bild als schmale Utility-Leiste.
	type = actionBar
	isVisible (Boolean)
	autoAvailabilityStatusEnabled (Boolean)
	availabilityStatusOverride (Text)
	buttonPrimary (Object: Standard-Button)
	buttonSecondary (Object: Standard-Button)
Galerie-Vorschau
Auf Bold Home direkt als Grid „Eindrücke aus dem Haus“.
	type = galleryPreview
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	button (Object: Standard-Button, optional)
	images (Repeater, empfohlen 4 bis 6)
Pro Eintrag:
	image (Asset / Image)
	alt (Text)
Zimmer-Auswahl
Bold-spezifische Home-Section auf dunklem Hintergrund mit großformatigen Bereichskarten.
	type = roomSelection
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	darkModeStyle (Boolean, Default: true)
	items (Repeater, empfohlen max. 3)
Pro Eintrag:
	title (Text)
	image (Image Object)
	description (Textarea, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Eckdaten-Band
Auf Home als dunkles Kennzahlenband zwischen inhaltlichen Blöcken.
	type = statsBand
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	value (Text)
	description (Textarea)
Story-Teaser
Reduzierte Text-Section mit ergänzendem Beschreibungstext.
	type = storyTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea)
	button (Object: Standard-Button, optional)
Optional:
	image (Image Object, optional)
Stimmenband
Breites farbiges Band mit wiederholten Schlagworten oberhalb des Testimonial-Bereichs.
	type = testimonialMarquee
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	text (Text)
Bewertungen-Teaser
Auf Bold Home als große hervorgehobene Hauptstimme plus Nebenkarten möglich.
	type = testimonials
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	layoutVariant (Select, z. B. standard, featuredQuote)
	testimonials (Repeater)
Pro Eintrag:
	name (Text)
	quote (Textarea)
Optional pro Eintrag:
	highlighted (Boolean)
News-Teaser
	type = newsTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	postLimit (Number, Default: 3 oder 4)
	button (Object: Standard-Button, optional)
CTA
Hotel Bold Home endet mit sehr auffälligem farbintensivem CTA-Block.
	type = cta
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	subline (Textarea)
	button (Object: Standard-Button)
	styleVariant (Select, z. B. default, boldHighlight)
6. Seite: Zimmer
Die Bold-Zimmerseite ist strukturell fast identisch zu Hotel Modern, nur mit deutlich plakativere Typografie.
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
Highlights-Leiste
	type = highlightsBar
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	title (Text)
	description (Text)
Bereichs-Übersicht
Im Bold-Layout als große horizontale Liste mit Bild, Titel und Kurzbeschreibung.
	type = accommodationList
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	title (Text)
	description (Textarea)
	image (Image Object)
	meta (Text, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Zimmer & Suiten Detail-Grid
	type = roomCards
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
	priceSuffix (Text, optional)
	features (Repeater)
	button (Object: Standard-Button)
	hasSubpage (Boolean)
	subpage (Object)
Pro Feature:
	text (Text)
Ablaufschritte
	type = steps
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	items (Repeater, empfohlen 4)
Pro Eintrag:
	title (Text)
	description (Text)
FAQs
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
	styleVariant (Select, optional)
7. Seite: Haus & Spa
Bold Haus & Spa ist strukturell nahezu identisch zu Modern, aber mit plakativem Hero.
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
	type = gallery
	isVisible (Boolean)
	lightboxEnabled (Boolean, Default: true)
	images (Repeater)
Pro Eintrag:
	image (Asset / Image)
	alt (Text)
Kategorien-Teaser
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
	styleVariant (Select, optional)
8. Seite: Geschichte
Bold Geschichte ist strukturell sehr nah an Hotel Modern/Klassisch, aber mit deutlich massiverer Headline.
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
	type = teaserList
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	items (Repeater, max. 3)
Pro Eintrag:
	title (Text)
	description (Text)
Zeitstrahl
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
	styleVariant (Select, optional)
9. Seite: Reservieren
Bold Reservieren bleibt inhaltlich gleich aufgebaut wie die anderen Hotelstile.
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
Dieses Schema bleibt unverändert einheitlich.
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
	styleVariant (Select, optional)
10. Abgrenzung zu Hotel Modern
	Hotel – Bold teilt sich den Großteil der Unterseitenlogik mit Hotel – Modern, insbesondere bei Zimmer, Haus & Spa und Reservieren.
	Die wesentlichen Unterschiede liegen auf Home, wo Bold zusätzliche dramaturgische Elemente wie marqueeBand, roomSelection im Dark-Layout, testimonialMarquee und den farbintensiven CTA einführt.
	Im CMS sollte Hotel – Bold daher als eigene vollständige Stil-Spezifikation geführt werden, auch wenn viele Feldstrukturen wiederverwendbar sind.

