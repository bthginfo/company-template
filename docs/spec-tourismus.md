Spezifikation – Tourismus Klassisch
1. Allgemein
	Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Tourismus – Klassisch.
	Alle Felder sind optional, es gibt keine Pflichtfelder.
	Die definierte Reihenfolge ist die Standardstruktur bei Neuanlage.
	Nutzer können Sections frei verschieben.
	Ausgenommen hiervon sind:
	noticeBanner, immer an Position 1
	hero, immer an Position 2
	Nutzer können zusätzliche freigegebene Sections hinzufügen.
	Neu hinzugefügte Sections werden standardmäßig am Ende der frei sortierbaren Sections eingefügt.
2. Seiten
	Start
	Touren
	Eindrücke
	Guides
	Buchen
3. Tourismusspezifische Standardmuster
Tour-Item mit optionaler Detailseite
Für Tages- und Mehrtagestouren, Themenreisen, Genuss- oder Naturtouren.
	title (Text)
	subtitle (Text, optional)
	description (Textarea)
	image (Image Object)
	duration (Text, optional)
	difficulty (Text, optional)
	price (Text, optional)
	groupSize (Text, optional)
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
Guide-Item
Für Guides oder Gastgeber:innen.
	name (Text)
	role (Text)
	description (Textarea)
	image (Image Object)
	specialties (Text, optional)
Tour-Format-Item
Für Angebotsformate wie Tagestouren, Mehrtagestouren, Private Touren oder maßgeschneiderte Angebote.
	title (Text)
	description (Textarea)
4. Seite: Start
Feste Sections
Hinweisbanner
Obere Infoleiste mit Öffnungszeiten, Tourenbetrieb, Gruppengröße, lizenzierten Guides oder Mehrsprachigkeit.
	isVisible (Boolean)
	items (Repeater)
	Pro Eintrag:
	text (Text)
Hero
Klassisches großes Bild-Hero mit Einordnung, Text, CTA und Kennzahlen.
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
Unter dem Hero als Utility-Leiste mit Kontakt / Verfügbarkeit / Direktanfrage.
	type = actionBar
	isVisible (Boolean)
	autoAvailabilityStatusEnabled (Boolean)
	availabilityStatusOverride (Text)
	buttonPrimary (Object: Standard-Button)
	buttonSecondary (Object: Standard-Button)
Galerie-Vorschau
Auf Home als visuelle Einstiegssection „Momente aus den Bergen“.
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
Touren-Teaser / Tourplan
Auf Home als Liste ausgewählter Touren mit Tournummer, Titel und Kurzinfos.
	type = tourSchedule
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea, optional)
	items (Repeater)
Pro Eintrag:
	label (Text, optional), z. B. Tour 01
	title (Text)
	description (Text)
	meta (Text, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Story-Teaser
Klassischer Text-Bild-Block zur Positionierung der Marke / Philosophie.
	type = storyTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea)
	image (Image Object)
	button (Object: Standard-Button)
Bewertungen-Teaser
	type = testimonials
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	testimonials (Repeater)
Pro Eintrag:
	name (Text)
	quote (Textarea)
Eckdaten-Band
Kennzahlen wie Guides, Touren pro Jahr, Gruppengröße oder Bewertung.
	type = statsBand
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	value (Text)
	description (Textarea)
News-Teaser
Aktuelles / News & Notizen auf Home.
	type = newsTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	postLimit (Number, Default: 3 oder 4)
	button (Object: Standard-Button, optional)
CTA
	type = cta
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	subline (Textarea)
	button (Object: Standard-Button)
5. Seite: Touren
Diese Seite bündelt das eigentliche Programm und die buchbaren Touren.
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
Highlights-Leiste
Kurze Angebotsargumente wie kleine Gruppen, lokale Guides, Mehrsprachigkeit oder Verpflegungsoptionen.
	type = highlightsBar
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	title (Text)
	description (Text)
Tourformate-Übersicht
Erste Grid-Section mit kompakten Tourkacheln.
	type = tourOverviewCards
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea)
	items (Repeater)
Pro Eintrag:
	title (Text)
	description (Textarea)
	image (Image Object)
	duration (Text, optional)
	difficulty (Text, optional)
	price (Text, optional)
	groupSize (Text, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Touren & Erlebnisse
Ausführliche Kartenübersicht mit mehreren Angeboten.
	type = tourCards
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
	duration (Text, optional)
	difficulty (Text, optional)
	price (Text, optional)
	groupSize (Text, optional)
	tags (Text, optional)
	button (Object: Standard-Button)
	hasSubpage (Boolean)
	subpage (Object)
Ablaufschritte
Wie Buchung und Durchführung funktionieren.
	type = steps
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	items (Repeater, empfohlen 4)
Pro Eintrag:
	title (Text)
	description (Text)
FAQs
Fragen zu Gruppengröße, Sprache, Ausrüstung, Leistungen oder Storno.
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
6. Seite: Eindrücke
Diese Seite ist die visuelle Erlebnis- / Galerie-Seite.
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
Text links, kleine Erlebniskarten rechts.
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
Mit Natur-, Landschafts- und Tourbildern.
	type = gallery
	isVisible (Boolean)
	lightboxEnabled (Boolean, Default: true)
	images (Repeater)
Pro Eintrag:
	image (Asset / Image)
	alt (Text)
Kategorien-Teaser
Zusammenfassung der Angebotsarten.
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
7. Seite: Guides
Diese Seite entspricht funktional der klassischen „Über uns“-Logik, aber mit Fokus auf Guides und Haltung.
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
„Drei Grundsätze“ bzw. Haltungsprinzipien.
	type = teaserList
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	items (Repeater, max. 3)
Pro Eintrag:
	title (Text)
	description (Text)
Zeitstrahl
Entstehung und Entwicklung des Angebots.
	type = timeline
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	items (Repeater)
Pro Eintrag:
	yearOrMarker (Text)
	title (Text)
	description (Textarea)
Team / Guides
Vorstellung der Guides.
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
8. Seite: Buchen
Inhaltlich entspricht diese Seite der bekannten Kontakt-/Buchungslogik, aber tourismusspezifisch formuliert.
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
Falls vorhanden, gleiche Struktur wie in den anderen Branchen.
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
Im Tourismuskontext auch für Treffpunkt, Transfer oder Beratung.
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
9. Branchenspezifische Besonderheiten Tourismus
	Im Unterschied zu Restaurant und Hotel liegt der Schwerpunkt hier auf Touren statt auf Produkten oder Unterkünften.
	Eindrücke ist eine stark bildgetriebene Erlebnis-Seite, die strukturell an Galerie-Seiten erinnert, aber inhaltlich stärker auf Tourerfahrung und Landschaft ausgerichtet ist.
	Guides übernimmt die Rolle einer klassischen Über-uns-Seite, ist aber klar personen- und kompetenzzentriert.
	Buchen entspricht funktional einer Kontakt-/Reservierungsseite, sollte aber im System als tourismusspezifische Anfrage- bzw. Buchungsseite geführt werden.

Spezifikation – Tourismus Modern
1. Allgemein
	Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Tourismus – Modern.
	Alle Felder sind optional, es gibt keine Pflichtfelder.
	Die definierte Reihenfolge ist die Standardstruktur bei Neuanlage.
	Nutzer können Sections frei verschieben.
	Ausgenommen hiervon sind:
	noticeBanner, immer an Position 1
	hero, immer an Position 2
	Nutzer können zusätzliche freigegebene Sections hinzufügen.
	Neu hinzugefügte Sections werden standardmäßig am Ende der frei sortierbaren Sections eingefügt.
2. Seiten
	Start
	Touren
	Eindrücke
	Guides
	Buchen
3. Stilcharakteristik Modern
	Tourismus Modern ist visuell reduzierter, modularer und UI-näher als die klassische Variante.
	Die Kernlogik bleibt ähnlich, aber Home und Guides setzen stärker auf Cards, Fact-Boxen, Partnerleisten und sachlichere Content-Blöcke.
	Touren bleiben das Hauptprodukt, werden aber in Modern klarer in Karten, Übersichten und strukturierte Informationsmuster zerlegt.
4. Tourismusspezifische Standardmuster
Tour-Item mit optionaler Detailseite
Für Tages-, Mehrtages-, Genuss-, Natur- oder private Touren.
	title (Text)
	subtitle (Text, optional)
	description (Textarea)
	image (Image Object)
	duration (Text, optional)
	difficulty (Text, optional)
	price (Text, optional)
	groupSize (Text, optional)
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
Guide-Item
Für Guides und Gastgeber:innen.
	name (Text)
	role (Text)
	description (Textarea)
	image (Image Object)
	specialties (Text, optional)
Tour-Format-Item
Für Angebotsformate wie Tagestouren, Mehrtagestouren oder maßgeschneiderte Formate.
	title (Text)
	description (Textarea)
5. Seite: Start
Feste Sections
Hinweisbanner
Obere Leiste mit Tourbetrieb, Zeiten, Gruppengröße, lizenzierten Guides oder Mehrsprachigkeit.
	isVisible (Boolean)
	items (Repeater)
	Pro Eintrag:
	text (Text)
Hero
Modern Home zeigt Text links, Bild rechts, CTA und Kennzahlen.
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
Touren-Teaser / Tourplan
Auf Home als kompakte Auswahlcards „Auf Entdeckungsreise“.
	type = tourSchedule
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea, optional)
	items (Repeater)
Pro Eintrag:
	label (Text, optional)
	title (Text)
	description (Text)
	meta (Text, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Galerie-Vorschau
Visuelle Highlight-Section mit Landschaften und Tourmomenten.
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
Horizontale Logozeile mit Partnern, Verbänden oder Tourismusmarken.
	type = brandLogos
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	name (Text)
	logo (Image Object, optional)
	link (URL, optional)
Eckdaten-Band
Kennzahlen wie Guides, Touren/Jahr, Gruppengröße, Bewertung.
	type = statsBand
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	value (Text)
	description (Textarea)
Story-Teaser
Sachlicher Text-Bild-Block zur Positionierung des Angebots.
	type = storyTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea)
	image (Image Object)
	button (Object: Standard-Button)
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
Auf Modern Home als reduzierte Panel-CTA.
	type = cta
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	subline (Textarea)
	button (Object: Standard-Button)
6. Seite: Touren
Modern Touren bleibt das zentrale Produktlisting, aber klarer kartenbasiert als in Klassisch.
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
Highlights-Leiste
Kurze Werte und Angebotsargumente direkt unter dem Hero.
	type = highlightsBar
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	title (Text)
	description (Text)
Tourformate-Übersicht
Erste kompakte Grid-Section mit Formaten oder Kategorien.
	type = tourOverviewCards
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	title (Text)
	description (Textarea)
	image (Image Object)
	duration (Text, optional)
	difficulty (Text, optional)
	price (Text, optional)
	groupSize (Text, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Touren & Erlebnisse
Ausführliches Kartenraster mit Preisen, Dauer, Schwierigkeit und CTA.
	type = tourCards
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
	duration (Text, optional)
	difficulty (Text, optional)
	price (Text, optional)
	groupSize (Text, optional)
	tags (Text, optional)
	button (Object: Standard-Button)
	hasSubpage (Boolean)
	subpage (Object)
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
7. Seite: Eindrücke
Modern Eindrücke ist strukturell fast identisch zu Klassisch, aber visuell kompakter.
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
8. Seite: Guides
Modern Guides ist stärker modularisiert als die klassische Version und nutzt zusätzlich ein Intro mit Fact-Box.
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
Einleitungsblock mit Fließtext und faktischer Infobox.
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
Team / Guides
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
9. Seite: Buchen
Modern Buchen ist inhaltlich identisch zur klassischen Logik, nur moderner gesetzt.
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
Falls vorhanden, bleibt das gleiche einheitliche Schema bestehen.
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
10. Abgrenzung zu Tourismus Klassisch
	Tourismus – Modern teilt die Kernseitenlogik weitgehend mit Tourismus – Klassisch.
	Die größten Unterschiede liegen auf Start und Guides, wo Modern zusätzliche bzw. stärker ausgeprägte Module wie brandLogos und storyFacts nutzt.
	Touren, Eindrücke und Buchen bleiben strukturell nah an der klassischen Variante, lassen sich also gut über gemeinsame Section-Typen mit stilabhängigen Templates modellieren.
Ja — Tourismus Bold ist jetzt vollständig konsistent: Wie bei den anderen Bold-Stilen bleiben die Unterseiten strukturell nah an Modern/Klassisch, aber die Home-Seite bekommt eine deutlich plakativere Dramaturgie mit Marquee-/Themenband, dunkler Tour-Section, Stimmenband und starkem CTA-Finale.
Buchen bleibt dagegen nahezu identisch zum bisherigen Tourismus-Schema, nur in Bold-Typografie.
Spezifikation
1. Allgemein
	Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Tourismus – Bold.
	Alle Felder sind optional, es gibt keine Pflichtfelder.
	Die definierte Reihenfolge ist die Standardstruktur bei Neuanlage.
	Nutzer können Sections frei verschieben.
	Ausgenommen hiervon sind:
	noticeBanner, immer an Position 1
	hero, immer an Position 2
	Nutzer können zusätzliche freigegebene Sections hinzufügen.
	Neu hinzugefügte Sections werden standardmäßig am Ende der frei sortierbaren Sections eingefügt.
2. Seiten
	Start
	Touren
	Eindrücke
	Guides
	Buchen
3. Stilcharakteristik Bold
	Tourismus Bold nutzt maximal verdichtete Headline-Typografie, große Kampagnenwirkung, starke Kontraste zwischen hellen und dunklen Flächen und eine deutlich editorialere Home-Dramaturgie.
	Besonders prägend auf Home sind das große Themenband unter dem Hero, eine dunkle Tour-Entdeckungs-Section, ein Stimmenband sowie ein farbintensiver CTA-Block.
	Guides, Eindrücke, Touren und Buchen bleiben strukturell nah an den anderen Tourismus-Stilen, werden aber mit Bold-Typografie ausgespielt.
4. Tourismusspezifische Standardmuster
Tour-Item mit optionaler Detailseite
Für Tages-, Mehrtages-, Genuss-, Natur- oder private Touren.
	title (Text)
	subtitle (Text, optional)
	description (Textarea)
	image (Image Object)
	duration (Text, optional)
	difficulty (Text, optional)
	price (Text, optional)
	groupSize (Text, optional)
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
Guide-Item
Für Guides und Gastgeber:innen.
	name (Text)
	role (Text)
	description (Textarea)
	image (Image Object)
	specialties (Text, optional)
Tour-Format-Item
Für Angebotsformate wie Tagestouren, Mehrtagestouren, Wein-/Genusstouren oder Maßanfertigungen.
	title (Text)
	description (Textarea)
Seiten
5. Seite: Start
Feste Sections
Hinweisbanner
Obere Leiste mit Öffnungszeiten, Tourbetrieb, Gruppengröße, lizenzierten Guides oder Mehrsprachigkeit.
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	text (Text)
Hero
Bold Home zeigt eine plakative Headline, CTA, großes Bild und Kennzahlen.
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
Direkt unter dem Hero als großes Themenband mit Schlagworten wie Berg, Tal, Wein, Geschichte oder Foto.
	type = marqueeBand
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	text (Text)
Optional:
	separator (Text, optional)
Aktionsleiste
Unter dem großen Hero-Bild als Utility-Bar.
	type = actionBar
	isVisible (Boolean)
	autoAvailabilityStatusEnabled (Boolean)
	availabilityStatusOverride (Text)
	buttonPrimary (Object: Standard-Button)
	buttonSecondary (Object: Standard-Button)
Galerie-Vorschau
Auf Home als kompakte visuelle Section „Momente aus den Bergen“.
	type = galleryPreview
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	button (Object: Standard-Button, optional)
	images (Repeater, empfohlen 4 bis 6)
Pro Eintrag:
	image (Asset / Image)
	alt (Text)
Eckdaten-Band
Dunkles Kennzahlenband mit Guides, Touren/Jahr, Gruppengröße und Bewertung.
	type = statsBand
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	value (Text)
	description (Textarea)
Tour-Entdeckungs-Section
Bold-spezifische dunkle Home-Section mit ausgewählten Touren in Listen-/Editorial-Logik.
	type = tourSelection
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	darkModeStyle (Boolean, Default: true)
	items (Repeater)
Pro Eintrag:
	label (Text, optional)
	title (Text)
	description (Textarea)
	meta (Text, optional)
	button (Object: Standard-Button, optional)
	hasSubpage (Boolean)
	subpage (Object)
Story-Teaser
Positionierungstext zur Haltung und Arbeitsweise.
	type = storyTeaser
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	description (Textarea)
	button (Object: Standard-Button, optional)
	image (Image Object, optional)
Stimmenband
Breites farbiges Schlagwortband oberhalb des Testimonial-Bereichs.
	type = testimonialMarquee
	isVisible (Boolean)
	items (Repeater)
Pro Eintrag:
	text (Text)
Bewertungen-Teaser
Auf Bold Home als Kombination aus Hauptstimme und kleineren Nebenstimmen möglich.
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
Home endet mit starkem farbintensivem CTA-Block.
	type = cta
	isVisible (Boolean)
	eyebrow (Text)
	headline (Text)
	subline (Textarea)
	button (Object: Standard-Button)
	styleVariant (Select, z. B. default, boldHighlight)
6. Seite: Touren
Bold Touren bleibt inhaltlich nah an Modern, wirkt aber typografisch markanter und editorialer.
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
Highlights-Leiste
Kurze Angebotsargumente wie kleine Gruppen, lizenzierte Guides, Mehrsprachigkeit oder Flexibilität.
	type = highlightsBar
	isVisible (Boolean)
	items (Repeater, max. 4)
Pro Eintrag:
	title (Text)
	description (Text)
Bereichs-Übersicht
Im Bold-Layout zunächst als große Listenübersicht mit Bild, Titel und Kurzbeschreibung.
	type = tourOverviewList
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
Touren & Erlebnisse
Danach ausführliches Kartenraster mit den buchbaren Touren.
	type = tourCards
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
	duration (Text, optional)
	difficulty (Text, optional)
	price (Text, optional)
	groupSize (Text, optional)
	tags (Text, optional)
	button (Object: Standard-Button)
	hasSubpage (Boolean)
	subpage (Object)
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
7. Seite: Eindrücke
Bold Eindrücke ist strukturell sehr nah an Modern, aber mit massiver Hero-Typografie.
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
8. Seite: Guides
Bold Guides bleibt inhaltlich nahe an Klassisch/Modern, bekommt aber plakativere Typografie.
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
Team / Guides
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
	styleVariant (Select, optional)
9. Seite: Buchen
Bold Buchen entspricht funktional der bekannten Kontakt-/Anfragelogik.
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
Falls vorhanden, bleibt das Schema identisch.
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
10. Abgrenzung zu Tourismus Modern
	Tourismus – Bold teilt den Großteil der Unterseitenlogik mit Tourismus – Modern, besonders bei Touren, Eindrücke und Buchen.
	Der wichtigste Unterschied liegt auf Start, wo Bold zusätzliche dramaturgische Module wie marqueeBand, tourSelection im Dark-Layout, testimonialMarquee und einen farbintensiven CTA einführt.
	Guides bleibt ebenfalls nahe an Modern/Klassisch, wird aber typografisch deutlich lauter ausgespielt.

