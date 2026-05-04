Spezifikation – Beratung Klassisch
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Beratung – Klassisch.
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
•	Galerie
•	Über uns
•	Kontakt
________________________________________
3. Beratungsspezifische Standardmuster
Standard-Button
Wiederverwendbares Button-Objekt für interne und externe Verlinkungen.
•	label (Text)
•	linkType (Select: internal | external | phone | email)
•	internalPage (Select, optional)
•	externalUrl (URL, optional)
•	phoneNumber (Text, optional)
•	emailAddress (Email, optional)
________________________________________
Image Object
Wiederverwendbares Bildobjekt.
•	image (Asset / Image)
•	alt (Text, optional)
________________________________________
Service-Item mit optionaler Detailseite
Für Beratungsleistungen wie Strategie, Audit, Restrukturierung, Change, Organisation, Prozessberatung, Finanzthemen oder Unternehmensentwicklung.
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object)
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
Für Partner:innen, Berater:innen, Spezialist:innen oder Projektverantwortliche.
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	contactInfo (Text, optional)
________________________________________
Testimonial-Item
Für Kund:innenstimmen.
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
News-Post-Teaser
Für News, Notizen, Fachbeiträge oder Einblicke.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Package-Item
Für Beratungs-Pakete / Angebotsmodelle mit Preis, Leistungsumfang und CTA.
•	title (Text)
•	badge (Text, optional)
•	price (Text)
•	priceSuffix (Text, optional)
•	description (Textarea, optional)
•	features (Repeater)
•	button (Object: Standard-Button)
•	isHighlighted (Boolean)
•	styleVariant (Select: light | dark | accent)
Pro Feature:
•	text (Text)
________________________________________
Process-Step-Item
Für textliche oder kartenbasierte Prozessdarstellungen.
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
Timeline-Item
Für Kanzlei- / Unternehmensgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Focus-Item
Für Schwerpunktkarten / Tätigkeitsfelder / Beratungsfelder.
•	title (Text)
•	description (Textarea)
________________________________________
Gallery-Image-Item
Für Bilder aus Workshops, Meetings, Projektarbeit oder Arbeitsalltag.
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
4. Seite: Start
Die Startseite von Beratung – Klassisch ist ruhig, hochwertig und vertrauensbildend aufgebaut.
Im Fokus stehen ein klassisches Hero, Themen- / Keyword-Leiste, Vertrauensaufbau über eine Unternehmens-Story, Leistungsübersicht, zwei unterschiedliche Prozessdarstellungen, Pricing-Pakete direkt auf der Home, Team direkt auf der Home, Galerie-Einblicke, Testimonials, News und eine Kontakt-Section direkt auf der Home.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste für Hinweise wie Erstgespräch, Schwerpunkte, Branchenfokus, Remote / vor Ort oder Verfügbarkeit.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes klassisches Hero mit Headline, Einleitungstext und primärem CTA.
•	eyebrow (Text)
•	headline (Text)
•	subline (Text, optional)
•	description (Textarea)
•	buttonPrimary (Object: Standard-Button)
•	backgroundImage (Image Object, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Keyword-Band / Themenleiste
Kleine horizontale Themenleiste direkt unter dem Hero mit Beratungsfeldern oder Fokusbegriffen.
•	type = keywordBand
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Story-Teaser / Vertrauens-Section
Text-Bild-Section zur Positionierung des Unternehmens und zum Vertrauensaufbau.
•	type = storyTeaser
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Leistungen
Kartenraster mit den wichtigsten Beratungsleistungen.
•	type = serviceCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 6)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	image (Image Object)
•	tags (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Wie wir arbeiten
Textbasierte Ablaufdarstellung mit vier Schritten bzw. Prinzipien.
•	type = processTextColumns
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
So arbeiten wir
Zweite, kompaktere Prozessdarstellung als horizontale Step-Cards.
•	type = processCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
Pakete / Pricing
Besonderheit auf der Home.
Karten-Section für klar definierte Beratungs-Pakete mit Preis, Leistungsumfang und CTA.
•	type = pricingPackages
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Paket:
•	title (Text)
•	badge (Text, optional)
•	price (Text)
•	priceSuffix (Text, optional)
•	description (Textarea, optional)
•	features (Repeater)
•	button (Object: Standard-Button)
•	isHighlighted (Boolean)
•	styleVariant (Select: light | dark | accent)
Pro Feature:
•	text (Text)
________________________________________
Team
Besonderheit auf der Home.
Team-Preview als Kartenraster.
•	type = team
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	contactInfo (Text, optional)
________________________________________
Einblicke in unsere Arbeit
Galerie-Vorschau mit Bildern aus Workshops, Gesprächen, Projektarbeit und Arbeitsalltag.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	images (Repeater, empfohlen 6 bis 8)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
Zusätzlich:
•	button (Object: Standard-Button, optional)
________________________________________
Testimonials
Kund:innenstimmen als Karten.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
News & Notizen
Kartenreihe mit News, Fachbeiträgen oder Notizen.
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
Kontakt-Teaser / Erstgespräch vereinbaren
Besonderheit auf der Home.
Kontaktbereich mit Kontaktdaten links und Karte rechts, ohne Formular.
•	type = contactPreview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea, optional)
•	phone (Auto-Pull / Systemfeld)
•	email (Auto-Pull / Systemfeld)
•	address (Auto-Pull / Systemfeld)
•	openingHours (Auto-Pull / Systemfeld)
•	googleMapsUrl (URL)
•	mapEmbedOrLink (URL, optional)
•	button (Object: Standard-Button, optional)
________________________________________
5. Seite: Leistungen
Die Leistungsseite bündelt Beratungsfelder, textliche Prozessbeschreibung, kartenbasierte Prozessdarstellung, Pricing-Pakete, Testimonials, Galerie-Einblicke, FAQ und eine starke Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes klassisches Hero mit Headline und Einleitung.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
________________________________________
Standardmäßig enthaltene modulare Sections
Leistungen
Kartenraster mit Beratungsleistungen.
•	type = serviceCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	items (Repeater, empfohlen 6)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	image (Image Object)
•	tags (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Wie wir arbeiten
Textbasierte Ablaufdarstellung in vier Schritten / Prinzipien.
•	type = processTextColumns
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
So arbeiten wir
Horizontale Step-Cards als zweite Prozessdarstellung.
•	type = processCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
Pakete / Pricing
Auf der Leistungsseite ebenfalls als zentrales Modul vorhanden.
•	type = pricingPackages
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Paket:
•	title (Text)
•	badge (Text, optional)
•	price (Text)
•	priceSuffix (Text, optional)
•	description (Textarea, optional)
•	features (Repeater)
•	button (Object: Standard-Button)
•	isHighlighted (Boolean)
•	styleVariant (Select: light | dark | accent)
Pro Feature:
•	text (Text)
________________________________________
Testimonials
Kund:innenstimmen als Karten.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
Einblicke in unsere Arbeit
Galerie-Vorschau mit Arbeitsalltags- und Projektbildern.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
FAQ
Fragen zu Projektdauer, Zusammenarbeit, Erstgespräch, Arbeitsweise, Remote / vor Ort oder Erfolgsmessung.
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
Große klassische Abschluss-CTA.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
6. Seite: Galerie
Die Galerie-Seite ist eine klassische Einblicke- / Projektalltags-Seite mit Intro, Themenkarten, Galerie-Grid, Schwerpunktkarten, Testimonials und Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes klassisches Hero mit Headline.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Intro mit Themenkarten
Text links und drei kurze Themenkarten rechts.
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
Großes Bild-Grid mit Bildern aus Workshops, Meetings, Projektarbeit und Arbeitsalltag.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Schwerpunkte / Wo wir helfen können
Kartenreihe mit den wichtigsten Beratungsfeldern.
•	type = categoryCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Testimonials
Kund:innenstimmen als Karten.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
CTA
Große klassische Abschluss-CTA zur Kontaktaufnahme.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
7. Seite: Über uns
Die Über-uns-Seite ist die klassische Vertrauens- und Team-Seite.
Sie kombiniert Unternehmensvorstellung, Team, Timeline, Kennzahlenband, Testimonials, FAQ und eine starke Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes klassisches Hero mit Headline.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Story mit Bild
Einleitende Unternehmensvorstellung mit Bild links und Text rechts.
•	type = storyImageSplit
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
________________________________________
Team
Große Team-Section mit Kartenraster.
•	type = team
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	contactInfo (Text, optional)
________________________________________
Timeline / Unser Weg
Klassischer Zeitstrahl zur Entwicklung des Unternehmens.
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
Stats-Band
Kennzahlenband mit Erfahrung, Projekten, Teamgröße, Reaktionszeit o. ä.
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Testimonials
Kund:innenstimmen als Karten.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
FAQ
Fragen zu Arbeitsweise, Remote / vor Ort, Erstgespräch oder Erfolgsmessung.
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
Große klassische Abschluss-CTA.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
8. Seite: Kontakt
Die Kontakt-Seite ist die klassische Anfrage- und Kontaktseite.
Sie kombiniert Kontaktdaten, Formular, Karte, FAQ und eine Abschluss-CTA.
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
Großes klassisches Hero mit Kontakt-Headline.
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
Diese Section ist unabhängig von der Frontend-Sichtbarkeit immer im Admin pflegbar.
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
FAQ
Fragen zu Projektablauf, Remote / vor Ort, Erstgespräch, Kosten oder Erfolgsmessung.
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
Abschluss-CTA mit alternativer Kontaktmöglichkeit oder Rückführung zur Startseite.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
9. Branchenspezifische Besonderheiten Beratung – Klassisch
Im Unterschied zu den bisherigen Branchen liegt der Schwerpunkt hier stärker auf:
•	Vertrauen, Seriosität und persönlicher Beratung
•	Leistungsdarstellung über Beratungsfelder statt physische Produkte
•	klarer Kommunikation der Arbeitsweise und des Projektvorgehens
•	strukturierten Angebots- bzw. Paketmodellen
•	persönlichem Teamzugang
•	Thought-Leadership-Elementen wie News / Notizen
•	Kontaktaufnahme über Erstgespräch statt Buchungslogik
Besonders für Beratung – Klassisch gelten zusätzlich diese Regeln:
•	auf der Startseite gibt es Pakete / Pricing
•	auf der Startseite gibt es eine Team-Section
•	auf der Startseite gibt es eine Kontakt-Section mit Karte, aber ohne Formular
•	die Prozesslogik erscheint zweifach: 
o	einmal als textliche Ablaufdarstellung
o	einmal als kompakte Step-Cards
•	die Galerie ist kein rein dekoratives Modul, sondern ein Einblicke-in-die-Arbeit-Modul
•	auf Leistungen gibt es zusätzlich FAQ
•	auf Über uns gibt es zusätzlich FAQ
•	auf Kontakt gibt es FAQ + Kontaktformular + Karte
•	auf Kontakt sind weitere Standorte im Admin immer pflegbar
Spezifikation – Beratung Modern
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Beratung – Modern.
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
•	Galerie
•	Über uns
•	Kontakt
________________________________________
3. Beratungsspezifische Standardmuster
Standard-Button
Wiederverwendbares Button-Objekt für interne und externe Verlinkungen.
•	label (Text)
•	linkType (Select: internal | external | phone | email)
•	internalPage (Select, optional)
•	externalUrl (URL, optional)
•	phoneNumber (Text, optional)
•	emailAddress (Email, optional)
________________________________________
Image Object
Wiederverwendbares Bildobjekt.
•	image (Asset / Image)
•	alt (Text, optional)
________________________________________
Service-Item mit optionaler Detailseite
Für Beratungsleistungen wie Strategie, Geschäftsmodell-Beratung, Steuerberatung, Jahresabschluss, Gesellschaftsrecht, M&A, Compliance, ESG, Nachfolge oder Interim-CFO / Controlling.
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	meta (Text, optional)
•	image (Image Object, optional)
•	tags (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
subpage:
•	eyebrow (Text)
•	title (Text)
•	description (Textarea)
•	image (Image Object, optional)
•	content (Rich Text Editor)
________________________________________
Team-Item
Für Partner:innen, Berater:innen, Spezialist:innen oder Projektverantwortliche.
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	contactInfo (Text, optional)
________________________________________
Testimonial-Item
Für Kund:innenstimmen.
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
•	isFeatured (Boolean, optional)
________________________________________
News-Post-Teaser
Für News, Notizen, Fachbeiträge oder Perspektiven.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Package-Item
Für Beratungs-Pakete / Angebotsmodelle mit Preis, Leistungsumfang und CTA.
•	title (Text)
•	badge (Text, optional)
•	price (Text)
•	priceSuffix (Text, optional)
•	description (Textarea, optional)
•	features (Repeater)
•	button (Object: Standard-Button)
•	isHighlighted (Boolean)
•	styleVariant (Select: light | dark | accent)
Pro Feature:
•	text (Text)
________________________________________
Process-Step-Item
Für nummerierte oder textliche Prozessdarstellungen.
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
Timeline-Item
Für Kanzlei- / Unternehmensgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Focus-Item
Für Schwerpunktkarten / Tätigkeitsfelder / Beratungsfelder.
•	title (Text)
•	description (Textarea)
________________________________________
Gallery-Image-Item
Für Bilder aus Workshops, Meetings, Projektarbeit und Arbeitsalltag.
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Stat-Item
Für Kennzahlen im Hero oder Kennzahlenband.
•	value (Text)
•	description (Text)
________________________________________
Contact-Card-Item
Für kompakte Kontaktkarten auf der Startseite.
•	title (Text)
•	value (Text)
•	link (Object: Standard-Button, optional)
________________________________________
4. Seite: Start
Die Startseite von Beratung – Modern ist klar, reduziert und kartenbasiert aufgebaut.
Im Fokus stehen ein modernes Split-Hero mit Bild und Kennzahlen, eine Themen- / Keyword-Leiste, Unternehmens-Story, textbasierte Leistungskarten, zwei unterschiedliche Prozessdarstellungen, Pricing-Pakete direkt auf der Home, Team direkt auf der Home, Galerie-Einblicke, hervorgehobene Testimonials, News und eine Kontakt-Section direkt auf der Home.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste für Hinweise wie Erstgespräch, Schwerpunkte, Branchenfokus, Remote / vor Ort oder Verfügbarkeit.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Modernes Split-Hero mit Text links, Bild rechts, primärem CTA und Kennzahlen im unteren Bereich.
•	eyebrow (Text)
•	headline (Text)
•	subline (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	buttonPrimary (Object: Standard-Button)
•	stats (Repeater, max. 4)
•	imageBadge (Text, optional)
Pro Kennzahl:
•	value (Text)
•	description (Text)
________________________________________
Standardmäßig enthaltene modulare Sections
Keyword-Band / Themenleiste
Kleine horizontale Themen- bzw. Fokusleiste direkt unter dem Hero.
•	type = keywordBand
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Story-Teaser / Vertrauens-Section
Kompakte Split-Section mit Bild und Text zur Positionierung des Unternehmens.
•	type = storyTeaser
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Leistungen
Textbasiertes Kartenraster mit den wichtigsten Beratungsleistungen.
•	type = serviceTextCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 6)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	meta (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Wie wir arbeiten
Erste Prozessdarstellung als nummerierte Kartenreihe mit vier Schritten.
•	type = processNumberCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text)
•	title (Text)
•	description (Textarea)
________________________________________
So arbeiten wir
Zweite Prozessdarstellung als kompakte horizontale Step-Cards mit stärkerem Detailfokus.
•	type = processCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
Pakete / Pricing
Besonderheit auf der Home.
Moderne Pricing-Section mit drei Angebotskarten, davon eine hervorgehoben.
•	type = pricingPackages
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Paket:
•	title (Text)
•	badge (Text, optional)
•	price (Text)
•	priceSuffix (Text, optional)
•	description (Textarea, optional)
•	features (Repeater)
•	button (Object: Standard-Button)
•	isHighlighted (Boolean)
•	styleVariant (Select: light | dark | accent)
Pro Feature:
•	text (Text)
________________________________________
Team
Besonderheit auf der Home.
Team-Preview als modernes Kartenraster.
•	type = team
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	contactInfo (Text, optional)
________________________________________
Einblicke in unsere Arbeit
Galerie-Vorschau mit modernem Grid aus Arbeitsalltags- und Projektbildern.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	images (Repeater, empfohlen 6 bis 8)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
Zusätzlich:
•	button (Object: Standard-Button, optional)
________________________________________
Featured Testimonials
Besonderheit auf der Home.
Testimonial-Section mit einer hervorgehobenen Hauptstimme und ergänzenden kleineren Aussagen.
•	type = featuredTestimonials
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text, optional)
•	featuredQuote (Object)
•	items (Repeater, empfohlen 2 bis 3)
featuredQuote:
•	quote (Textarea)
•	name (Text)
•	source (Text, optional)
Pro ergänzenden Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
News & Notizen
Kartenreihe mit News, Fachbeiträgen oder Notizen.
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
Kontakt-Teaser / Sprechen wir
Besonderheit auf der Home.
Kontaktbereich mit kompakten Kontaktkarten links und Karte rechts, ohne Formular.
•	type = contactPreviewCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3 bis 4)
•	googleMapsUrl (URL)
•	mapEmbedOrLink (URL, optional)
•	button (Object: Standard-Button, optional)
Pro Kontaktkarte:
•	title (Text)
•	value (Text)
•	link (Object: Standard-Button, optional)
________________________________________
5. Seite: Leistungen
Die Leistungsseite bündelt textbasierte Leistungskarten, nummerierte Prozessdarstellung, kompakte Prozess-Cards, Pricing-Pakete, Testimonials, Galerie-Einblicke, FAQ und eine große Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes modernes Hero mit starker Headline.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Leistungen
Textbasiertes Kartenraster mit Beratungsleistungen.
•	type = serviceTextCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 6)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	meta (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Wie wir arbeiten
Nummerierte Prozesskarten mit vier Schritten.
•	type = processNumberCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text)
•	title (Text)
•	description (Textarea)
________________________________________
So arbeiten wir
Horizontale Step-Cards als zweite Prozessdarstellung.
•	type = processCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
Pakete / Pricing
Moderne Pricing-Section mit drei Angebotskarten.
•	type = pricingPackages
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Paket:
•	title (Text)
•	badge (Text, optional)
•	price (Text)
•	priceSuffix (Text, optional)
•	description (Textarea, optional)
•	features (Repeater)
•	button (Object: Standard-Button)
•	isHighlighted (Boolean)
•	styleVariant (Select: light | dark | accent)
Pro Feature:
•	text (Text)
________________________________________
Testimonials
Kund:innenstimmen als moderne Karten.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
Einblicke in unsere Arbeit
Galerie-Vorschau mit modernem Bildraster.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
FAQ
Fragen zu Projektdauer, Arbeitsweise, Erstgespräch, Remote / vor Ort oder Erfolgsmessung.
•	type = faq
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	question (Text)
•	answer (Textarea)
________________________________________
CTA
Große moderne Abschluss-CTA.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
6. Seite: Galerie
Die Galerie-Seite ist eine moderne Einblicke- / Projektalltags-Seite mit Intro, Themenkarten, Galerie-Grid, Schwerpunktkarten, Testimonials und starker Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes modernes Hero mit Headline.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Intro mit Themenkarten
Text links und drei kurze Themenkarten rechts.
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
Großes Bild-Grid mit Bildern aus Workshops, Meetings, Projektarbeit und Arbeitsalltag.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Schwerpunkte / Wo wir helfen können
Kartenreihe mit den wichtigsten Beratungsfeldern.
•	type = categoryCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Testimonials
Kund:innenstimmen als moderne Karten.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
CTA
Große moderne Abschluss-CTA zur Kontaktaufnahme.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
7. Seite: Über uns
Die Über-uns-Seite ist die moderne Vertrauens- und Team-Seite.
Sie kombiniert Unternehmensvorstellung, Team, Timeline, Kennzahlenband, Testimonials, FAQ und eine starke Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes modernes Hero mit starker Headline.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Story mit Bild
Moderne Split-Section mit großem Bild links und stark typografischem Text rechts.
•	type = storyImageSplit
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
________________________________________
Team
Große Team-Section mit modernem Kartenraster.
•	type = team
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	contactInfo (Text, optional)
________________________________________
Timeline / Unser Weg
Moderner Zeitstrahl zur Entwicklung des Unternehmens.
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
Stats-Band
Dunkles Kennzahlenband mit Erfahrung, Projekten, Teamgröße, Reaktionszeit o. ä.
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Testimonials
Kund:innenstimmen als moderne Karten.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
FAQ
Fragen zu Arbeitsweise, Remote / vor Ort, Erstgespräch oder Erfolgsmessung.
•	type = faq
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	question (Text)
•	answer (Textarea)
________________________________________
CTA
Große moderne Abschluss-CTA.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
8. Seite: Kontakt
Die Kontakt-Seite ist die moderne Anfrage- und Kontaktseite.
Sie kombiniert Kontaktdaten, Formular, Karte, FAQ und eine große Abschluss-CTA.
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
Großes modernes Hero mit Kontakt-Headline.
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
Diese Section ist unabhängig von der Frontend-Sichtbarkeit immer im Admin pflegbar.
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
FAQ
Fragen zu Projektablauf, Remote / vor Ort, Erstgespräch, Kosten oder Erfolgsmessung.
•	type = faq
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	question (Text)
•	answer (Textarea)
________________________________________
CTA
Große moderne Abschluss-CTA mit alternativer Rückführung oder Kontaktmöglichkeit.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
9. Branchenspezifische Besonderheiten Beratung – Modern
Im Unterschied zu Beratung – Klassisch ist Beratung – Modern stärker reduziert, klarer typografisch und deutlich kartenbasierter aufgebaut.
Typische Merkmale dieser Stil-Kombination sind:
•	modernes Split-Hero auf der Startseite mit Bild rechts und Kennzahlen im Hero-Bereich
•	stärkere Arbeit mit großen Sans-Serif-Headlines
•	Themen- / Keyword-Leiste direkt unter dem Hero
•	textbasierte Leistungskarten statt bildlastiger Servicekarten
•	Prozesslogik in zwei Varianten: 
o	einmal als nummerierte Schrittkarten
o	einmal als kompaktere horizontale Step-Cards
•	Pricing / Pakete auf Start und Leistungen
•	Team direkt auf der Startseite
•	Kontakt-Preview auf der Startseite mit Kontaktkarten + Karte, aber ohne Formular
•	Testimonials auf der Startseite als hervorgehobene Hauptquote mit ergänzenden Karten
•	Galerie nicht nur als Deko, sondern als Einblicke-in-die-Arbeit-Modul
•	auf Über uns ein dunkles Kennzahlenband
•	auf Leistungen, Über uns und Kontakt gibt es FAQ
•	auf Kontakt sind weitere Standorte im Admin immer pflegbar
Spezifikation – Beratung Bold
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Beratung – Bold.
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
•	Galerie
•	Über uns
•	Kontakt
________________________________________
3. Beratungsspezifische Standardmuster
Standard-Button
Wiederverwendbares Button-Objekt für interne und externe Verlinkungen.
•	label (Text)
•	linkType (Select: internal | external | phone | email)
•	internalPage (Select, optional)
•	externalUrl (URL, optional)
•	phoneNumber (Text, optional)
•	emailAddress (Email, optional)
________________________________________
Image Object
Wiederverwendbares Bildobjekt.
•	image (Asset / Image)
•	alt (Text, optional)
________________________________________
Service-Item mit optionaler Detailseite
Für Beratungsleistungen wie Strategie, Geschäftsmodell-Beratung, Steuerberatung, Jahresabschluss, Gesellschaftsrecht, M&A, Compliance, ESG, Nachfolge oder Interim-CFO / Controlling.
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	meta (Text, optional)
•	image (Image Object, optional)
•	tags (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
subpage:
•	eyebrow (Text)
•	title (Text)
•	description (Textarea)
•	image (Image Object, optional)
•	content (Rich Text Editor)
________________________________________
Team-Item
Für Partner:innen, Berater:innen, Spezialist:innen oder Projektverantwortliche.
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	contactInfo (Text, optional)
________________________________________
Testimonial-Item
Für Kund:innenstimmen.
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
•	isFeatured (Boolean, optional)
________________________________________
News-Post-Teaser
Für News, Notizen, Fachbeiträge oder Perspektiven.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Package-Item
Für Beratungs-Pakete / Angebotsmodelle mit Preis, Leistungsumfang und CTA.
•	title (Text)
•	badge (Text, optional)
•	price (Text)
•	priceSuffix (Text, optional)
•	description (Textarea, optional)
•	features (Repeater)
•	button (Object: Standard-Button)
•	isHighlighted (Boolean)
•	styleVariant (Select: light | dark | accent)
Pro Feature:
•	text (Text)
________________________________________
Process-Step-Item
Für lineare oder kartenbasierte Prozessdarstellungen.
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
Timeline-Item
Für Kanzlei- / Unternehmensgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Focus-Item
Für Schwerpunktkarten / Tätigkeitsfelder / Beratungsfelder.
•	title (Text)
•	description (Textarea)
________________________________________
Gallery-Image-Item
Für Bilder aus Workshops, Meetings, Projektarbeit und Arbeitsalltag.
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Stat-Item
Für Kennzahlen im Kennzahlenband.
•	value (Text)
•	description (Text)
________________________________________
Contact-Detail-Item
Für einzelne Kontaktpunkte in der Home-Kontakt-Section.
•	label (Text)
•	value (Text)
•	link (Object: Standard-Button, optional)
________________________________________
Marquee-Item
Für Schlagwort- / Themenbänder.
•	text (Text)
________________________________________
4. Seite: Start
Die Startseite von Beratung – Bold ist plakativ, typografisch stark und editorial aufgebaut.
Im Fokus stehen ein sehr großes Hero, eine Full-Width-Image-Stage, ein Themenband, eine nummerierte Story-Section, eine lineare Leistungsliste, zwei unterschiedliche Prozessdarstellungen, Pricing-Pakete direkt auf der Home, Team auf dunklem Hintergrund, Galerie-Einblicke, Testimonials auf dunklem Hintergrund, News und eine Kontakt-Section direkt auf der Home.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste für Hinweise wie Erstgespräch, Branchenfokus, Spezialisierungen, Remote / vor Ort oder Verfügbarkeit.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Sehr großes Bold-Hero mit übergroßer typografischer Headline und primärem CTA.
•	eyebrow (Text)
•	headline (Text)
•	subline (Text, optional)
•	description (Textarea, optional)
•	buttonPrimary (Object: Standard-Button)
________________________________________
Standardmäßig enthaltene modulare Sections
Large Image Stage
Große Full-Width-Bildfläche direkt unter dem Hero.
•	type = featureImage
•	isVisible (Boolean)
•	image (Image Object)
•	caption (Text, optional)
•	floatingBadge (Text, optional)
•	button (Object: Standard-Button, optional)
________________________________________
Marquee-Band / Themenleiste
Horizontales Schlagwort-Band mit Beratungsfeldern oder Schwerpunkten.
•	type = marqueeBand
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Nummerierte Story-Section
Besonderheit auf der Home.
Editoriale Story-Section mit Abschnittsnummer, Headline, Fließtext und Bild.
•	type = numberedStory
•	isVisible (Boolean)
•	sectionNumber (Text, z. B. 01)
•	eyebrow (Text, optional)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Leistungen
Besonderheit auf der Home.
Lineare, editorial angelegte Leistungsübersicht als Liste statt Kartenraster.
•	type = serviceEditorialList
•	isVisible (Boolean)
•	sectionNumber (Text, z. B. 02, optional)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 6)
•	button (Object: Standard-Button, optional)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	meta (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Wie wir arbeiten
Lineare Prozessdarstellung mit Stern-/Markercharakter und vier Schritten.
•	type = processList
•	isVisible (Boolean)
•	iconStyle (Select: star | none, Default: star)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text)
•	title (Text)
•	description (Textarea)
________________________________________
So arbeiten wir
Kompaktere zweite Prozessdarstellung als horizontale Kartenreihe.
•	type = processCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
Pakete / Pricing
Besonderheit auf der Home.
Bold-Pricing-Section mit drei Angebotskarten, davon eine hervorgehoben.
•	type = pricingPackages
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Paket:
•	title (Text)
•	badge (Text, optional)
•	price (Text)
•	priceSuffix (Text, optional)
•	description (Textarea, optional)
•	features (Repeater)
•	button (Object: Standard-Button)
•	isHighlighted (Boolean)
•	styleVariant (Select: light | dark | accent)
Pro Feature:
•	text (Text)
________________________________________
Team
Besonderheit auf der Home.
Team-Preview auf dunklem Hintergrund mit kontraststarker Typografie.
•	type = teamDark
•	isVisible (Boolean)
•	backgroundStyle (Select: dark | darkGradient, Default: dark)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	contactInfo (Text, optional)
________________________________________
Einblicke in unsere Arbeit
Galerie-Vorschau mit modernem / editorialem Grid.
•	type = galleryPreview
•	isVisible (Boolean)
•	sectionNumber (Text, z. B. 03, optional)
•	eyebrow (Text)
•	headline (Text)
•	images (Repeater, empfohlen 6 bis 8)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
Zusätzlich:
•	button (Object: Standard-Button, optional)
________________________________________
Testimonials / Dark Quote Grid
Besonderheit auf der Home.
Testimonials auf dunklem Hintergrund in einer kontrastreichen Kartenstruktur.
•	type = quoteGridDark
•	isVisible (Boolean)
•	backgroundStyle (Select: dark | darkGradient, Default: dark)
•	eyebrow (Text, optional)
•	headline (Text, optional)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
•	isFeatured (Boolean, optional)
________________________________________
News & Notizen
Kartenreihe mit News, Fachbeiträgen oder Notizen.
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
Reden wir / Kontakt-Preview
Besonderheit auf der Home.
Kontaktbereich mit Kontaktdetails links und Karte rechts, ohne Formular.
•	type = contactPreviewDetails
•	isVisible (Boolean)
•	sectionNumber (Text, z. B. 04, optional)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3 bis 4)
•	googleMapsUrl (URL)
•	mapEmbedOrLink (URL, optional)
•	button (Object: Standard-Button, optional)
Pro Eintrag:
•	label (Text)
•	value (Text)
•	link (Object: Standard-Button, optional)
________________________________________
5. Seite: Leistungen
Die Leistungsseite bündelt eine lineare Leistungsliste, eine lineare Prozessdarstellung, kompakte Prozesskarten, Pricing-Pakete, Testimonials auf dunklem Hintergrund, Galerie-Einblicke, FAQ und eine große Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit starker typografischer Headline.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Leistungen
Lineare, editorial angelegte Leistungsliste.
•	type = serviceEditorialList
•	isVisible (Boolean)
•	sectionNumber (Text, z. B. 02, optional)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 6)
•	button (Object: Standard-Button, optional)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	meta (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Wie wir arbeiten
Lineare Prozessdarstellung mit vier Schritten.
•	type = processList
•	isVisible (Boolean)
•	iconStyle (Select: star | none, Default: star)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text)
•	title (Text)
•	description (Textarea)
________________________________________
So arbeiten wir
Kompaktere horizontale Prozesskarten.
•	type = processCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	stepNumber (Text, optional)
•	title (Text)
•	description (Textarea)
________________________________________
Pakete / Pricing
Bold-Pricing-Section mit drei Angebotskarten.
•	type = pricingPackages
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Paket:
•	title (Text)
•	badge (Text, optional)
•	price (Text)
•	priceSuffix (Text, optional)
•	description (Textarea, optional)
•	features (Repeater)
•	button (Object: Standard-Button)
•	isHighlighted (Boolean)
•	styleVariant (Select: light | dark | accent)
Pro Feature:
•	text (Text)
________________________________________
Testimonials / Dark Quote Grid
Kund:innenstimmen auf dunklem Hintergrund.
•	type = quoteGridDark
•	isVisible (Boolean)
•	backgroundStyle (Select: dark | darkGradient, Default: dark)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
Einblicke in unsere Arbeit
Galerie-Vorschau mit Bildraster.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
FAQ
Fragen zu Projektdauer, Arbeitsweise, Erstgespräch, Remote / vor Ort oder Erfolgsmessung.
•	type = faq
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	question (Text)
•	answer (Textarea)
________________________________________
CTA
Große Bold-Abschluss-CTA.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
6. Seite: Galerie
Die Galerie-Seite ist eine Bold-Einblicke- / Projektalltags-Seite mit Intro, Themenkarten, Galerie-Grid, Schwerpunktkarten, Testimonials und starker Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit Headline.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Intro mit Themenkarten
Text links und drei kurze Themenkarten rechts.
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
Großes Bild-Grid mit Bildern aus Workshops, Meetings, Projektarbeit und Arbeitsalltag.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Schwerpunkte / Wo wir helfen können
Kartenreihe mit den wichtigsten Beratungsfeldern.
•	type = categoryCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Testimonials
Kund:innenstimmen als Bold-Kartenstruktur.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
CTA
Große Bold-Abschluss-CTA zur Kontaktaufnahme.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
7. Seite: Über uns
Die Über-uns-Seite ist die Bold-Vertrauens- und Team-Seite.
Sie kombiniert Unternehmensvorstellung, Team auf dunklem Hintergrund, Timeline, dunkles Kennzahlenband, Testimonials, FAQ und eine starke Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit starker typografischer Headline.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Story mit Bild
Editoriale Split-Section mit großem Bild links und markanter Typografie rechts.
•	type = storyImageSplit
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
________________________________________
Team
Große Team-Section auf dunklem Hintergrund.
•	type = teamDark
•	isVisible (Boolean)
•	backgroundStyle (Select: dark | darkGradient, Default: dark)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	contactInfo (Text, optional)
________________________________________
Timeline / Unser Weg
Bold-Zeitstrahl zur Entwicklung des Unternehmens.
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
Stats-Band
Dunkles Kennzahlenband mit Verlauf / Gradient und kontrastreicher Typografie.
•	type = statsBand
•	isVisible (Boolean)
•	backgroundStyle (Select: dark | darkGradient, Default: darkGradient)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Testimonials
Kund:innenstimmen als Bold-Karten.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
FAQ
Fragen zu Arbeitsweise, Remote / vor Ort, Erstgespräch oder Erfolgsmessung.
•	type = faq
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	question (Text)
•	answer (Textarea)
________________________________________
CTA
Große Bold-Abschluss-CTA.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
8. Seite: Kontakt
Die Kontakt-Seite ist die Bold-Anfrage- und Kontaktseite.
Sie kombiniert Kontaktdaten, Formular, Karte, FAQ und eine große Abschluss-CTA.
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
Großes Bold-Hero mit Kontakt-Headline.
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
Diese Section ist unabhängig von der Frontend-Sichtbarkeit immer im Admin pflegbar.
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
FAQ
Fragen zu Projektablauf, Remote / vor Ort, Erstgespräch, Kosten oder Erfolgsmessung.
•	type = faq
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	question (Text)
•	answer (Textarea)
________________________________________
CTA
Große Bold-Abschluss-CTA mit alternativer Rückführung oder Kontaktmöglichkeit.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
9. Branchenspezifische Besonderheiten Beratung – Bold
Im Unterschied zu Beratung – Klassisch und Beratung – Modern ist Beratung – Bold deutlich stärker typografiegetrieben, kontrastreicher und editorialer aufgebaut.
Typische Merkmale dieser Stil-Kombination sind:
•	sehr großes typografisches Hero auf der Startseite
•	Full-Width-Image-Stage direkt unter dem Hero
•	Themen- / Marquee-Band mit Beratungsfeldern direkt nach dem Einstieg
•	nummerierte Story-Section auf der Startseite
•	Leistungen als lineare Editorial-Liste statt klassischem Kartenraster
•	Prozesslogik in zwei Varianten: 
o	einmal als lineare Prozessliste
o	einmal als kompaktere horizontale Step-Cards
•	Pricing / Pakete auf Start und Leistungen
•	Team direkt auf der Startseite auf dunklem Hintergrund
•	Kontakt-Preview auf der Startseite mit Kontaktdetails + Karte, aber ohne Formular
•	Testimonials auf der Startseite als Dark Quote Grid
•	Galerie nicht nur als Deko, sondern als Einblicke-in-die-Arbeit-Modul
•	auf Über uns ein dunkles Kennzahlenband
•	auf Leistungen, Über uns und Kontakt gibt es FAQ
•	auf Kontakt sind weitere Standorte im Admin immer pflegbar

