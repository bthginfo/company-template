Spezifikation – Fitness Klassisch
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Fitness – Klassisch.
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
3. Fitnessspezifische Standardmuster
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
Class-Item mit optionaler Detailseite
Für Klassen, Programme oder Angebotsformate wie Yoga, HIIT, Personal Training, Mobility, Kraft oder Outdoor Sessions.
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	level (Text, optional)
•	duration (Text, optional)
•	intensity (Text, optional)
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
Training-Plan-Item
Für planbasierte Empfehlungen oder Einstiegswege innerhalb der Section „Finde deinen Flow“.
•	title (Text)
•	description (Textarea)
•	goal (Text, optional)
•	level (Text, optional)
•	frequency (Text, optional)
•	duration (Text, optional)
•	button (Object: Standard-Button, optional)
________________________________________
Schedule-Column
Für editierbare Spaltenüberschriften in der tabellarischen Programmübersicht.
•	label (Text)
•	key (Text)
________________________________________
Schedule-Row
Für einzelne Einträge in der tabellarischen Übersicht „Programme & Formate“.
•	programTitle (Text)
•	focus (Text, optional)
•	level (Text, optional)
•	duration (Text, optional)
•	format (Text, optional)
•	days (Text, optional)
•	time (Text, optional)
•	trainer (Text, optional)
•	location (Text, optional)
•	note (Text, optional)
________________________________________
Pricing-Package-Item
Für Mitgliedschaften, Tarife oder Preispakete.
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
Trainer-Item
Für Trainer:innen, Coaches oder Studioleitung.
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	qualifications (Text, optional)
________________________________________
Testimonial-Item
Für Mitgliederstimmen.
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
News-Post-Teaser
Für News, Notizen, Events oder Community-Updates.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Gallery-Image-Item
Für Bilder aus Studio, Trainingssituationen, Kursen oder Community-Momenten.
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Info-Card-Item
Für kompakte Informationskarten, z. B. zu Einstieg, Dauer, Level oder Fokus.
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
________________________________________
Timeline-Item
Für Studio- / Unternehmensgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Stat-Item
Für Kennzahlen im Hero oder Kennzahlenband.
•	value (Text)
•	description (Text)
________________________________________
FAQ-Item
Für häufig gestellte Fragen.
•	question (Text)
•	answer (Textarea)
________________________________________
4. Seite: Start
Die Startseite von Fitness – Klassisch ist ruhig, hochwertig und persönlich aufgebaut.
Im Fokus stehen ein textbasiertes Hero, eine Themen- / Keyword-Leiste, die Story des Studios, Klassen & Programme, ein Trainingsplan-Modul, eine tabellarische Programmübersicht, Preise, Trainer:innen direkt auf der Home, Studio-Einblicke, Mitgliederstimmen, News und eine Kontakt- / Probetraining-Section direkt auf der Home.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste für Hinweise wie Probetraining, freie Plätze, Kursstarts, Studiozeiten oder Special Events.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Textbasiertes klassisches Hero mit großer Headline, Beschreibung und primärem CTA.
Im Unterschied zu bildlastigeren Varianten steht hier der redaktionelle Einstieg im Vordergrund.
•	eyebrow (Text)
•	headline (Text)
•	subline (Text, optional)
•	description (Textarea)
•	buttonPrimary (Object: Standard-Button)
________________________________________
Standardmäßig enthaltene modulare Sections
Keyword-Band / Themenleiste
Kleine horizontale Themenleiste direkt unter dem Hero mit Studiofokussen oder Angebotsbereichen.
•	type = keywordBand
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Story-Teaser / Unser Studio
Text-Bild-Section zur Positionierung des Studios und zur Vertrauensbildung.
•	type = storyTeaser
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Klassen & Programme
Bildgestütztes Kartenraster mit den wichtigsten Kursen und Programmen.
•	type = classCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 6)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	image (Image Object)
•	level (Text, optional)
•	duration (Text, optional)
•	intensity (Text, optional)
•	tags (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Trainingsplan / Finde deinen Flow
Besonderheit auf der Home.
Section mit kleiner Kennzahlenzeile und mehreren Trainingsplan- / Einstiegs-Karten zur Orientierung.
•	type = trainingPlanOverview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	stats (Repeater, empfohlen 3)
•	items (Repeater, empfohlen 4)
Pro Kennzahl:
•	value (Text)
•	description (Text)
Pro Plan-Karte:
•	title (Text)
•	description (Textarea)
•	goal (Text, optional)
•	level (Text, optional)
•	frequency (Text, optional)
•	duration (Text, optional)
•	button (Object: Standard-Button, optional)
________________________________________
Programme & Formate
Besonderheit auf der Home.
Tabellarische Übersicht der wichtigsten Programme mit Format-, Level- oder Zeitinformationen.
•	type = programTable
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	columns (Repeater)
•	rows (Repeater)
•	button (Object: Standard-Button, optional)
Pro Spalte:
•	label (Text)
•	key (Text)
Pro Zeile:
•	programTitle (Text)
•	focus (Text, optional)
•	level (Text, optional)
•	duration (Text, optional)
•	format (Text, optional)
•	days (Text, optional)
•	time (Text, optional)
•	trainer (Text, optional)
•	location (Text, optional)
•	note (Text, optional)
________________________________________
Preise / Klar gerechnet, fair
Besonderheit auf der Home.
Pricing-Section mit mehreren Memberships, davon eine optisch hervorgehoben.
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
Unsere Trainer:innen
Besonderheit auf der Home.
Trainer:innen-Preview als Kartenraster.
•	type = trainers
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
•	qualifications (Text, optional)
________________________________________
Studio & Stimmung
Besonderheit auf der Home.
Galerie-Vorschau mit Bildern aus Studio, Kursen und Community-Momenten.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	images (Repeater, empfohlen 8 bis 9)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
Zusätzlich:
•	button (Object: Standard-Button, optional)
________________________________________
Testimonials / Was unsere Mitglieder sagen
Mitgliederstimmen als Karten.
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
Kartenreihe mit Studio-News, Community-Terminen oder redaktionellen Beiträgen.
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
Probetraining buchen
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
Die Leistungsseite bündelt Klassen & Programme, Trainingsplan, Programme & Formate, Preise, Mitgliederstimmen, Studio & Stimmung, FAQ und eine starke Abschluss-CTA.
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
Klassen & Programme
Bildgestütztes Kartenraster mit Kursen und Formaten.
•	type = classCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 6)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	image (Image Object)
•	level (Text, optional)
•	duration (Text, optional)
•	intensity (Text, optional)
•	tags (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Trainingsplan / Finde deinen Flow
Auch auf der Leistungsseite als zentrales Orientierungsmodul enthalten.
•	type = trainingPlanOverview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	stats (Repeater, empfohlen 3)
•	items (Repeater, empfohlen 4)
Pro Kennzahl:
•	value (Text)
•	description (Text)
Pro Plan-Karte:
•	title (Text)
•	description (Textarea)
•	goal (Text, optional)
•	level (Text, optional)
•	frequency (Text, optional)
•	duration (Text, optional)
•	button (Object: Standard-Button, optional)
________________________________________
Programme & Formate
Tabellarische Übersicht der Trainings- und Angebotsformate.
•	type = programTable
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	columns (Repeater)
•	rows (Repeater)
•	button (Object: Standard-Button, optional)
Pro Spalte:
•	label (Text)
•	key (Text)
Pro Zeile:
•	programTitle (Text)
•	focus (Text, optional)
•	level (Text, optional)
•	duration (Text, optional)
•	format (Text, optional)
•	days (Text, optional)
•	time (Text, optional)
•	trainer (Text, optional)
•	location (Text, optional)
•	note (Text, optional)
________________________________________
Preise / Klar gerechnet, fair
Pricing-Section mit mehreren Memberships.
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
Testimonials / Was unsere Mitglieder sagen
Mitgliederstimmen als Karten.
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
Studio & Stimmung
Galerie-Vorschau mit Bildern aus Studio und Kursbetrieb.
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
Fragen zu Probetraining, Vertragslaufzeit, Kursangeboten oder Ausstattung.
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
Die Galerie-Seite ist eine klassische Einblicke- / Studioalltags-Seite mit Intro, Themenkarten, Galerie-Grid, Angebotskarten, Mitgliederstimmen und Probetraining-CTA.
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
Großes Bild-Grid mit Bildern aus Kursen, Studioatmosphäre und Community-Momenten.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Programme / Was wir anbieten
Kartenreihe mit den wichtigsten Angebotsbereichen.
•	type = categoryCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Testimonials / Was unsere Mitglieder sagen
Mitgliederstimmen als Karten.
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
CTA / Probetraining buchen
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
Sie kombiniert Studio-Story, Trainer:innen, Timeline, Kennzahlenband, Mitgliederstimmen, FAQ und eine starke Abschluss-CTA.
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
Einleitende Studio-Vorstellung mit großem Bild links und Text rechts.
•	type = storyImageSplit
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
________________________________________
Unsere Trainer:innen
Große Team-Section mit Kartenraster.
•	type = trainers
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
•	qualifications (Text, optional)
________________________________________
Timeline / Unser Weg
Klassischer Zeitstrahl zur Entwicklung des Studios.
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
Kennzahlenband mit Kursgrößen, Trainer:innenzahl, Erfahrung oder Mitgliedern.
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Testimonials / Was unsere Mitglieder sagen
Mitgliederstimmen als Karten.
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
Fragen zu Probetraining, Vertragslaufzeit, Kursangeboten oder Studioausstattung.
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
Die Kontakt-Seite ist die klassische Anfrage- und Probetraining-Seite.
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
Fragen zu Probetraining, Vertragslaufzeit, Kursangeboten oder Duschen / Spinden.
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
9. Branchenspezifische Besonderheiten Fitness – Klassisch
Im Unterschied zu den bisherigen Branchen liegt der Schwerpunkt hier stärker auf:
•	persönlicher Betreuung statt anonymer Massenstudio-Logik
•	klarer Darstellung von Klassen, Formaten und Trainingswegen
•	transparenter Preis- und Membership-Kommunikation
•	vertrauensbildender Trainer:innen-Präsenz
•	ruhigen, atmosphärischen Studio-Einblicken
•	niedrigschwelliger Kontaktaufnahme über Probetraining
Besonders für Fitness – Klassisch gelten zusätzlich diese Regeln:
•	auf der Startseite gibt es Klassen & Programme
•	auf der Startseite gibt es eine eigene Trainingsplan-Section / „Finde deinen Flow“
•	auf der Startseite gibt es eine tabellarische Section „Programme & Formate“
•	auf der Startseite gibt es eine Pricing-Section
•	auf der Startseite gibt es eine Trainer:innen-Section
•	auf der Startseite gibt es Studio & Stimmung als Galerie-Vorschau
•	auf der Startseite gibt es eine Kontakt-Section mit Karte, aber ohne Formular
•	auf der Leistungen-Seite gibt es zusätzlich: 
o	Trainingsplan
o	Programme & Formate
o	Preise
o	Testimonials
o	Studio & Stimmung
o	FAQ
•	die Galerie ist kein rein dekoratives Modul, sondern ein Einblicke-in-Studio-und-Training-Modul
•	auf Über uns gibt es Story + Trainer:innen + Timeline + Kennzahlen + Testimonials + FAQ
•	auf Kontakt gibt es FAQ + Kontaktformular + Karte
•	auf Kontakt sind weitere Standorte im Admin immer pflegbar

Spezifikation – Fitness Modern
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Fitness – Modern.
Alle Felder sind optional, es gibt keine Pflichtfelder.
Die definierte Reihenfolge ist die Standardstruktur bei Neuanlage.
Nutzer können Sections frei verschieben.
Ausgenommen hiervon sind:
noticeBanner, immer an Position 1
hero, immer an Position 2
Nutzer können zusätzliche freigegebene Sections hinzufügen.
Neu hinzugefügte Sections werden standardmäßig am Ende der frei sortierbaren Sections eingefügt.
________________________________________
2. Seiten
Start
Leistungen
Galerie
Über uns
Kontakt
________________________________________
3. Fitnessspezifische Standardmuster
Standard-Button
Wiederverwendbares Button-Objekt für interne und externe Verlinkungen.
label (Text)
linkType (Select: internal | external | phone | email)
internalPage (Select, optional)
externalUrl (URL, optional)
phoneNumber (Text, optional)
emailAddress (Email, optional)
________________________________________
Image Object
Wiederverwendbares Bildobjekt.
image (Asset / Image)
alt (Text, optional)
________________________________________
Class-Item mit optionaler Detailseite
Für Klassen, Programme oder Angebotsformate wie Vinyasa Flow, Yin Yoga, Reformer Pilates, Mindful Movement, Personal Training oder Workshops & Retreats.
title (Text)
subtitle (Text, optional)
description (Textarea)
meta (Text, optional)
priceFrom (Text, optional)
image (Image Object, optional)
level (Text, optional)
duration (Text, optional)
intensity (Text, optional)
tags (Text, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
subpage:
eyebrow (Text)
title (Text)
description (Textarea)
image (Image Object, optional)
content (Rich Text Editor)
________________________________________
Training-Plan-Item
Für planbasierte Empfehlungen oder Einstiegswege innerhalb der Section „Finde deinen Flow“.
title (Text)
description (Textarea)
goal (Text, optional)
level (Text, optional)
frequency (Text, optional)
duration (Text, optional)
button (Object: Standard-Button, optional)
________________________________________
Schedule-Column
Für editierbare Spaltenüberschriften in der tabellarischen Programmübersicht.
label (Text)
key (Text)
________________________________________
Schedule-Row
Für einzelne Einträge in der tabellarischen Übersicht „Programme & Formate“.
programTitle (Text)
focus (Text, optional)
level (Text, optional)
duration (Text, optional)
format (Text, optional)
days (Text, optional)
time (Text, optional)
trainer (Text, optional)
location (Text, optional)
price (Text, optional)
note (Text, optional)
________________________________________
Pricing-Package-Item
Für Mitgliedschaften, Tarife oder Preispakete.
title (Text)
badge (Text, optional)
price (Text)
priceSuffix (Text, optional)
description (Textarea, optional)
features (Repeater)
button (Object: Standard-Button)
isHighlighted (Boolean)
styleVariant (Select: light | dark | accent)
Pro Feature:
text (Text)
________________________________________
Trainer-Item
Für Trainer:innen, Coaches oder Studioleitung.
name (Text)
role (Text)
description (Textarea)
image (Image Object)
specialties (Text, optional)
qualifications (Text, optional)
________________________________________
Testimonial-Item
Für Mitgliederstimmen.
name (Text)
quote (Textarea)
source (Text, optional)
isFeatured (Boolean, optional)
________________________________________
News-Post-Teaser
Für News, Notizen, Events oder Community-Updates.
date (Text)
title (Text)
excerpt (Textarea)
image (Image Object)
button (Object: Standard-Button, optional)
________________________________________
Gallery-Image-Item
Für Bilder aus Studio, Trainingssituationen, Kursen oder Community-Momenten.
image (Image Object)
alt (Text, optional)
caption (Text, optional)
________________________________________
Contact-Card-Item
Für kompakte Kontaktkarten auf der Startseite.
title (Text)
value (Text)
link (Object: Standard-Button, optional)
________________________________________
Timeline-Item
Für Studio- / Unternehmensgeschichte.
yearOrMarker (Text)
title (Text)
description (Textarea)
________________________________________
Stat-Item
Für Kennzahlen im Hero oder Kennzahlenband.
value (Text)
description (Text)
________________________________________
Focus-Item
Für Angebots- oder Schwerpunktkarten.
title (Text)
description (Textarea)
________________________________________
FAQ-Item
Für häufig gestellte Fragen.
question (Text)
answer (Textarea)
________________________________________
4. Seite: Start
Die Startseite von Fitness – Modern ist klar, reduziert und persönlich aufgebaut.
Im Fokus stehen ein modernes Split-Hero mit Bild und Kennzahlen, eine Themen- / Keyword-Leiste, die Story des Studios, Klassen & Programme als textbasierte Karten, ein Trainingsplan-Modul, eine tabellarische Programmübersicht, Preise, Trainer:innen direkt auf der Home, Studio-Einblicke, hervorgehobene Mitgliederstimmen, News und eine Kontakt-Section direkt auf der Home.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste für Hinweise wie Probetraining, freie Plätze, Kursstarts, Studiozeiten oder Special Events.
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Modernes Split-Hero mit Text links, Bild rechts, primärem CTA und Kennzahlen im unteren Bereich.
eyebrow (Text)
headline (Text)
subline (Text, optional)
description (Textarea)
image (Image Object)
buttonPrimary (Object: Standard-Button)
stats (Repeater, max. 4)
imageBadge (Text, optional)
Pro Kennzahl:
value (Text)
description (Text)
________________________________________
Standardmäßig enthaltene modulare Sections
Keyword-Band / Themenleiste
Kleine horizontale Themen- bzw. Fokusleiste direkt unter dem Hero.
type = keywordBand
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Story-Teaser / Unser Studio
Kompakte Split-Section mit Bild und Text zur Positionierung des Studios.
type = storyTeaser
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea)
image (Image Object)
button (Object: Standard-Button, optional)
________________________________________
Klassen & Programme
Textbasiertes Kartenraster mit den wichtigsten Kursen und Programmen, jeweils mit Preis-/Ab-Preis-Logik.
type = classTextCards
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 6)
Pro Eintrag:
title (Text)
description (Textarea)
meta (Text, optional)
priceFrom (Text, optional)
level (Text, optional)
duration (Text, optional)
intensity (Text, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
________________________________________
Trainingsplan / Finde deinen Flow
Besonderheit auf der Home.
Section mit kleiner Kennzahlenzeile und mehreren Trainingsplan- / Einstiegs-Karten zur Orientierung.
type = trainingPlanOverview
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
stats (Repeater, empfohlen 3)
items (Repeater, empfohlen 4)
Pro Kennzahl:
value (Text)
description (Text)
Pro Plan-Karte:
title (Text)
description (Textarea)
goal (Text, optional)
level (Text, optional)
frequency (Text, optional)
duration (Text, optional)
button (Object: Standard-Button, optional)
________________________________________
Programme & Formate
Besonderheit auf der Home.
Tabellarische Übersicht der wichtigsten Programme mit Format-, Level-, Zeit- oder Preisinformationen.
type = programTable
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
columns (Repeater)
rows (Repeater)
button (Object: Standard-Button, optional)
Pro Spalte:
label (Text)
key (Text)
Pro Zeile:
programTitle (Text)
focus (Text, optional)
level (Text, optional)
duration (Text, optional)
format (Text, optional)
days (Text, optional)
time (Text, optional)
trainer (Text, optional)
location (Text, optional)
price (Text, optional)
note (Text, optional)
________________________________________
Preise / Klar gerechnet, fair
Besonderheit auf der Home.
Pricing-Section mit mehreren Memberships, davon eine optisch hervorgehoben.
type = pricingPackages
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3)
Pro Paket:
title (Text)
badge (Text, optional)
price (Text)
priceSuffix (Text, optional)
description (Textarea, optional)
features (Repeater)
button (Object: Standard-Button)
isHighlighted (Boolean)
styleVariant (Select: light | dark | accent)
Pro Feature:
text (Text)
________________________________________
Unsere Trainer:innen
Besonderheit auf der Home.
Trainer:innen-Preview als modernes Kartenraster.
type = trainers
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3)
Pro Eintrag:
name (Text)
role (Text)
description (Textarea)
image (Image Object)
specialties (Text, optional)
qualifications (Text, optional)
________________________________________
Studio & Stimmung
Besonderheit auf der Home.
Moderne Galerie-Vorschau mit Bildern aus Studio, Kursen und Community-Momenten.
type = galleryPreview
isVisible (Boolean)
eyebrow (Text)
headline (Text)
images (Repeater, empfohlen 8 bis 9)
Pro Eintrag:
image (Image Object)
alt (Text, optional)
caption (Text, optional)
Zusätzlich:
button (Object: Standard-Button, optional)
________________________________________
Featured Testimonials / Was unsere Mitglieder sagen
Besonderheit auf der Home.
Testimonial-Section mit einer hervorgehobenen Hauptaussage und ergänzenden kleineren Aussagen.
type = featuredTestimonials
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text, optional)
featuredQuote (Object)
items (Repeater, empfohlen 2 bis 3)
featuredQuote:
quote (Textarea)
name (Text)
source (Text, optional)
Pro ergänzenden Eintrag:
name (Text)
quote (Textarea)
source (Text, optional)
________________________________________
News & Notizen
Kartenreihe mit Studio-News, Community-Terminen oder redaktionellen Beiträgen.
type = newsTeaser
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
button (Object: Standard-Button, optional)
posts (Repeater, empfohlen 3)
Pro Eintrag:
date (Text)
title (Text)
excerpt (Textarea)
image (Image Object)
button (Object: Standard-Button, optional)
________________________________________
Sprechen wir / Probetraining buchen
Besonderheit auf der Home.
Kontaktbereich mit kompakten Kontaktkarten links und Karte rechts, ohne Formular.
type = contactPreviewCards
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3 bis 4)
googleMapsUrl (URL)
mapEmbedOrLink (URL, optional)
button (Object: Standard-Button, optional)
Pro Kontaktkarte:
title (Text)
value (Text)
link (Object: Standard-Button, optional)
________________________________________
5. Seite: Leistungen
Die Leistungsseite bündelt Klassen & Programme, Trainingsplan, Programme & Formate, Preise, Mitgliederstimmen, Studio & Stimmung, FAQ und eine starke Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Großes modernes Hero mit starker Headline.
eyebrow (Text)
headline (Text)
description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Klassen & Programme
Textbasiertes Kartenraster mit Kursen und Programmen.
type = classTextCards
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 6)
Pro Eintrag:
title (Text)
description (Textarea)
meta (Text, optional)
priceFrom (Text, optional)
level (Text, optional)
duration (Text, optional)
intensity (Text, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
________________________________________
Trainingsplan / Finde deinen Flow
Auch auf der Leistungsseite als zentrales Orientierungsmodul enthalten.
type = trainingPlanOverview
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
stats (Repeater, empfohlen 3)
items (Repeater, empfohlen 4)
Pro Kennzahl:
value (Text)
description (Text)
Pro Plan-Karte:
title (Text)
description (Textarea)
goal (Text, optional)
level (Text, optional)
frequency (Text, optional)
duration (Text, optional)
button (Object: Standard-Button, optional)
________________________________________
Programme & Formate
Tabellarische Übersicht der Trainings- und Angebotsformate.
type = programTable
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
columns (Repeater)
rows (Repeater)
button (Object: Standard-Button, optional)
Pro Spalte:
label (Text)
key (Text)
Pro Zeile:
programTitle (Text)
focus (Text, optional)
level (Text, optional)
duration (Text, optional)
format (Text, optional)
days (Text, optional)
time (Text, optional)
trainer (Text, optional)
location (Text, optional)
price (Text, optional)
note (Text, optional)
________________________________________
Preise / Klar gerechnet, fair
Pricing-Section mit mehreren Memberships.
type = pricingPackages
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3)
Pro Paket:
title (Text)
badge (Text, optional)
price (Text)
priceSuffix (Text, optional)
description (Textarea, optional)
features (Repeater)
button (Object: Standard-Button)
isHighlighted (Boolean)
styleVariant (Select: light | dark | accent)
Pro Feature:
text (Text)
________________________________________
Testimonials / Was unsere Mitglieder sagen
Mitgliederstimmen als moderne Karten.
type = testimonials
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
items (Repeater)
Pro Eintrag:
name (Text)
quote (Textarea)
source (Text, optional)
________________________________________
Studio & Stimmung
Galerie-Vorschau mit Bildern aus Studio und Kursbetrieb.
type = galleryPreview
isVisible (Boolean)
eyebrow (Text)
headline (Text)
images (Repeater)
Pro Eintrag:
image (Image Object)
alt (Text, optional)
caption (Text, optional)
________________________________________
FAQ
Fragen zu Probetraining, Vertragslaufzeit, Kursangeboten oder Ausstattung.
type = faq
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
question (Text)
answer (Textarea)
________________________________________
CTA
Große moderne Abschluss-CTA.
type = cta
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
6. Seite: Galerie
Die Galerie-Seite ist eine moderne Einblicke- / Studioalltags-Seite mit Intro, Themenkarten, Galerie-Grid, Angebotskarten, Mitgliederstimmen und Probetraining-CTA.
________________________________________
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Großes modernes Hero mit Headline.
eyebrow (Text)
headline (Text)
description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Intro mit Themenkarten
Text links und drei kurze Themenkarten rechts.
type = teaserList
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea)
items (Repeater, max. 3)
Pro Eintrag:
title (Text)
description (Text)
________________________________________
Galerie
Großes Bild-Grid mit Bildern aus Kursen, Studioatmosphäre und Community-Momenten.
type = gallery
isVisible (Boolean)
lightboxEnabled (Boolean, Default: true)
images (Repeater)
Pro Eintrag:
image (Image Object)
alt (Text, optional)
caption (Text, optional)
________________________________________
Programme / Was wir anbieten
Kartenreihe mit den wichtigsten Angebotsbereichen.
type = categoryCards
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater, max. 3)
Pro Eintrag:
title (Text)
description (Text)
________________________________________
Testimonials / Was unsere Mitglieder sagen
Mitgliederstimmen als moderne Karten.
type = testimonials
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
name (Text)
quote (Textarea)
source (Text, optional)
________________________________________
CTA / Probetraining buchen
Große moderne Abschluss-CTA zur Kontaktaufnahme.
type = cta
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
7. Seite: Über uns
Die Über-uns-Seite ist die moderne Vertrauens- und Team-Seite.
Sie kombiniert Studio-Story, Trainer:innen, Timeline, Kennzahlenband, Mitgliederstimmen, FAQ und eine starke Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Großes modernes Hero mit starker Headline.
eyebrow (Text)
headline (Text)
description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Story mit Bild
Moderne Split-Section mit großem Bild links und stark typografischem Text rechts.
type = storyImageSplit
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
description (Textarea)
image (Image Object)
________________________________________
Unsere Trainer:innen
Große Team-Section mit modernem Kartenraster.
type = trainers
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3)
Pro Eintrag:
name (Text)
role (Text)
description (Textarea)
image (Image Object)
specialties (Text, optional)
qualifications (Text, optional)
________________________________________
Timeline / Unser Weg
Moderner Zeitstrahl zur Entwicklung des Studios.
type = timeline
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
yearOrMarker (Text)
title (Text)
description (Textarea)
________________________________________
Stats-Band
Dunkles Kennzahlenband mit Verlauf / Gradient und kontrastreicher Typografie.
type = statsBand
isVisible (Boolean)
backgroundStyle (Select: dark | darkGradient, Default: darkGradient)
items (Repeater, max. 4)
Pro Eintrag:
value (Text)
description (Text)
________________________________________
Testimonials / Was unsere Mitglieder sagen
Mitgliederstimmen als moderne Karten.
type = testimonials
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
items (Repeater)
Pro Eintrag:
name (Text)
quote (Textarea)
source (Text, optional)
________________________________________
FAQ
Fragen zu Probetraining, Vertragslaufzeit, Kursangeboten oder Studioausstattung.
type = faq
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
items (Repeater)
Pro Eintrag:
question (Text)
answer (Textarea)
________________________________________
CTA
Große moderne Abschluss-CTA.
type = cta
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
8. Seite: Kontakt
Die Kontakt-Seite ist die moderne Anfrage- und Probetraining-Seite.
Sie kombiniert Kontaktdaten, Formular, Karte, FAQ und eine große Abschluss-CTA.
Wichtig: Weitere Standorte sind im Admin immer pflegbar, auch wenn sie im Frontend nicht sichtbar sind.
________________________________________
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Großes modernes Hero mit Kontakt-Headline.
eyebrow (Text)
headline (Text)
subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Kontaktbereich
Zweispaltige Kontakt-Section mit Kontaktdaten links, Formular und Karte rechts.
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
mapEmbedOrLink (URL, optional)
Pro zusätzliches Formularfeld:
label (Text)
fieldType (Select)
placeholder (Text)
required (Boolean)
________________________________________
Weitere Standorte
Diese Section ist unabhängig von der Frontend-Sichtbarkeit immer im Admin pflegbar.
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
________________________________________
FAQ
Fragen zu Probetraining, Vertragslaufzeit, Kursangeboten oder Duschen / Spinden.
type = faq
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
question (Text)
answer (Textarea)
________________________________________
CTA
Große moderne Abschluss-CTA mit alternativer Rückführung oder Kontaktmöglichkeit.
type = cta
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
9. Branchenspezifische Besonderheiten Fitness – Modern
Im Unterschied zu Fitness – Klassisch ist Fitness – Modern stärker reduziert, klarer typografisch und deutlich kartenbasierter aufgebaut.
Typische Merkmale dieser Stil-Kombination sind:
modernes Split-Hero auf der Startseite mit Bild rechts und Kennzahlen im Hero-Bereich
stärkere Arbeit mit großen Sans-Serif-Headlines
Themen- / Keyword-Leiste direkt unter dem Hero
Klassen & Programme als textbasierte Karten mit Preis-/Ab-Preis-Information
Trainingsplan / Finde deinen Flow auf der Startseite als kompakte Karten-Section mit kleinen Kennzahlen
Programme & Formate als tabellarische Übersicht
Preise / Memberships auf der Startseite und auf Leistungen
Trainer:innen direkt auf der Startseite
Studio & Stimmung als modernes Bildgrid
Mitgliederstimmen auf der Startseite als hervorgehobene Hauptaussage mit ergänzenden Karten
Kontakt-Preview auf der Startseite mit Kontaktkarten + Karte, aber ohne Formular
die Galerie ist kein rein dekoratives Modul, sondern ein Einblicke-in-Studio-und-Training-Modul
auf Leistungen gibt es zusätzlich: 
Trainingsplan
Programme & Formate
Preise
Testimonials
Studio & Stimmung
FAQ
auf Über uns ein dunkles Kennzahlenband
auf Kontakt gibt es FAQ + Kontaktformular + Karte
auf Kontakt sind weitere Standorte im Admin immer pflegbar
Spezifikation – Fitness Bold
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Fitness – Bold.
Alle Felder sind optional, es gibt keine Pflichtfelder.
Die definierte Reihenfolge ist die Standardstruktur bei Neuanlage.
Nutzer können Sections frei verschieben.
Ausgenommen hiervon sind:
noticeBanner, immer an Position 1
hero, immer an Position 2
Nutzer können zusätzliche freigegebene Sections hinzufügen.
Neu hinzugefügte Sections werden standardmäßig am Ende der frei sortierbaren Sections eingefügt.
________________________________________
2. Seiten
Start
Leistungen
Galerie
Über uns
Kontakt
________________________________________
3. Fitnessspezifische Standardmuster
Standard-Button
Wiederverwendbares Button-Objekt für interne und externe Verlinkungen.
label (Text)
linkType (Select: internal | external | phone | email)
internalPage (Select, optional)
externalUrl (URL, optional)
phoneNumber (Text, optional)
emailAddress (Email, optional)
________________________________________
Image Object
Wiederverwendbares Bildobjekt.
image (Asset / Image)
alt (Text, optional)
________________________________________
Class-Item mit optionaler Detailseite
Für Klassen, Programme oder Angebotsformate wie Vinyasa Flow, Yin Yoga, Reformer Pilates, Mindful Movement, Personal Training oder Workshops & Retreats.
title (Text)
subtitle (Text, optional)
description (Textarea)
meta (Text, optional)
priceFrom (Text, optional)
image (Image Object, optional)
level (Text, optional)
duration (Text, optional)
intensity (Text, optional)
tags (Text, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
subpage:
eyebrow (Text)
title (Text)
description (Textarea)
image (Image Object, optional)
content (Rich Text Editor)
________________________________________
Training-Plan-Item
Für planbasierte Empfehlungen oder Einstiegswege innerhalb der Section „Finde deinen Flow“.
title (Text)
description (Textarea)
goal (Text, optional)
level (Text, optional)
frequency (Text, optional)
duration (Text, optional)
button (Object: Standard-Button, optional)
________________________________________
Schedule-Column
Für editierbare Spaltenüberschriften in der tabellarischen Programmübersicht.
label (Text)
key (Text)
________________________________________
Schedule-Row
Für einzelne Einträge in der tabellarischen Übersicht „Programme & Formate“.
programTitle (Text)
focus (Text, optional)
level (Text, optional)
duration (Text, optional)
format (Text, optional)
days (Text, optional)
time (Text, optional)
trainer (Text, optional)
location (Text, optional)
price (Text, optional)
note (Text, optional)
________________________________________
Pricing-Package-Item
Für Mitgliedschaften, Tarife oder Preispakete.
title (Text)
badge (Text, optional)
price (Text)
priceSuffix (Text, optional)
description (Textarea, optional)
features (Repeater)
button (Object: Standard-Button)
isHighlighted (Boolean)
styleVariant (Select: light | dark | accent)
Pro Feature:
text (Text)
________________________________________
Trainer-Item
Für Trainer:innen, Coaches oder Studioleitung.
name (Text)
role (Text)
description (Textarea)
image (Image Object)
specialties (Text, optional)
qualifications (Text, optional)
________________________________________
Testimonial-Item
Für Mitgliederstimmen.
name (Text)
quote (Textarea)
source (Text, optional)
isFeatured (Boolean, optional)
________________________________________
News-Post-Teaser
Für News, Notizen, Events oder Community-Updates.
date (Text)
title (Text)
excerpt (Textarea)
image (Image Object)
button (Object: Standard-Button, optional)
________________________________________
Gallery-Image-Item
Für Bilder aus Studio, Trainingssituationen, Kursen oder Community-Momenten.
image (Image Object)
alt (Text, optional)
caption (Text, optional)
________________________________________
Contact-Detail-Item
Für einzelne Kontaktpunkte in der Home-Kontakt-Section.
label (Text)
value (Text)
link (Object: Standard-Button, optional)
________________________________________
Marquee-Item
Für Schlagwort- / Themenbänder.
text (Text)
________________________________________
Timeline-Item
Für Studio- / Unternehmensgeschichte.
yearOrMarker (Text)
title (Text)
description (Textarea)
________________________________________
Stat-Item
Für Kennzahlen im Kennzahlenband oder Trainingsplan.
value (Text)
description (Text)
________________________________________
Focus-Item
Für Angebots- oder Schwerpunktkarten.
title (Text)
description (Textarea)
________________________________________
FAQ-Item
Für häufig gestellte Fragen.
question (Text)
answer (Textarea)
________________________________________
4. Seite: Start
Die Startseite von Fitness – Bold ist plakativ, typografisch stark und zugleich persönlich aufgebaut.
Im Fokus stehen ein sehr großes Hero, eine Full-Width-Image-Stage, ein Themenband, eine nummerierte Story-Section, eine lineare Angebotsübersicht, ein Dark-Trainingsplan, eine tabellarische Programmübersicht, Preise, Trainer:innen auf dunklem Hintergrund, Studio & Stimmung als nummerierte Galerie-Vorschau, Mitgliederstimmen auf dunklem Hintergrund, News und eine Kontakt-Section direkt auf der Home.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste für Hinweise wie Probetraining, freie Plätze, Kursstarts, Studiozeiten oder Special Events.
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Sehr großes Bold-Hero mit übergroßer typografischer Headline und primärem CTA.
eyebrow (Text)
headline (Text)
subline (Text, optional)
description (Textarea, optional)
buttonPrimary (Object: Standard-Button)
________________________________________
Standardmäßig enthaltene modulare Sections
Large Image Stage
Große Full-Width-Bildfläche direkt unter dem Hero.
type = featureImage
isVisible (Boolean)
image (Image Object)
caption (Text, optional)
floatingText (Textarea, optional)
button (Object: Standard-Button, optional)
________________________________________
Marquee-Band / Themenleiste
Horizontales Schlagwort-Band mit Angebotsfeldern oder Studiothemen.
type = marqueeBand
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Nummerierte Story-Section
Besonderheit auf der Home.
Editoriale Story-Section mit Abschnittsnummer, Headline, Fließtext und Bild.
type = numberedStory
isVisible (Boolean)
sectionNumber (Text, z. B. 01)
eyebrow (Text, optional)
headline (Text)
description (Textarea)
image (Image Object)
button (Object: Standard-Button, optional)
________________________________________
Klassen & Programme
Besonderheit auf der Home.
Lineare, editorial angelegte Angebotsübersicht als Liste statt Kartenraster.
type = classEditorialList
isVisible (Boolean)
sectionNumber (Text, z. B. 02, optional)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 6)
button (Object: Standard-Button, optional)
Pro Eintrag:
title (Text)
description (Textarea)
meta (Text, optional)
priceFrom (Text, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
________________________________________
Trainingsplan / Finde deinen Flow
Besonderheit auf der Home.
Dunkle Fokus-Section mit Akzenticon, mehreren Trainingsplan-Karten und Kennzahlen im unteren Bereich.
type = trainingPlanDark
isVisible (Boolean)
iconStyle (Select: bolt | none, Default: bolt)
eyebrow (Text, optional)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 4)
stats (Repeater, empfohlen 3)
Pro Plan-Karte:
title (Text)
description (Textarea)
goal (Text, optional)
level (Text, optional)
frequency (Text, optional)
duration (Text, optional)
button (Object: Standard-Button, optional)
Pro Kennzahl:
value (Text)
description (Text)
________________________________________
Programme & Formate
Besonderheit auf der Home.
Tabellarische Übersicht der wichtigsten Programme mit Format-, Level-, Zeit- oder Preisinformationen.
type = programTable
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
columns (Repeater)
rows (Repeater)
button (Object: Standard-Button, optional)
Pro Spalte:
label (Text)
key (Text)
Pro Zeile:
programTitle (Text)
focus (Text, optional)
level (Text, optional)
duration (Text, optional)
format (Text, optional)
days (Text, optional)
time (Text, optional)
trainer (Text, optional)
location (Text, optional)
price (Text, optional)
note (Text, optional)
________________________________________
Preise / Klar gerechnet, fair
Besonderheit auf der Home.
Pricing-Section mit mehreren Memberships, davon eine optisch hervorgehoben.
type = pricingPackages
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3)
Pro Paket:
title (Text)
badge (Text, optional)
price (Text)
priceSuffix (Text, optional)
description (Textarea, optional)
features (Repeater)
button (Object: Standard-Button)
isHighlighted (Boolean)
styleVariant (Select: light | dark | accent)
Pro Feature:
text (Text)
________________________________________
Unsere Trainer:innen
Besonderheit auf der Home.
Trainer:innen-Preview auf dunklem Hintergrund mit kontraststarker Typografie.
type = trainersDark
isVisible (Boolean)
backgroundStyle (Select: dark | darkGradient, Default: dark)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3)
Pro Eintrag:
name (Text)
role (Text)
description (Textarea)
image (Image Object)
specialties (Text, optional)
qualifications (Text, optional)
________________________________________
Studio & Stimmung
Besonderheit auf der Home.
Nummerierte Galerie-Vorschau mit Bildern aus Studio, Kursen und Community-Momenten.
type = galleryPreview
isVisible (Boolean)
sectionNumber (Text, z. B. 03, optional)
eyebrow (Text)
headline (Text)
images (Repeater, empfohlen 8 bis 9)
Pro Eintrag:
image (Image Object)
alt (Text, optional)
caption (Text, optional)
Zusätzlich:
button (Object: Standard-Button, optional)
________________________________________
Testimonials / Dark Quote Grid
Besonderheit auf der Home.
Mitgliederstimmen auf dunklem Hintergrund in einer kontrastreichen Kartenstruktur.
type = quoteGridDark
isVisible (Boolean)
backgroundStyle (Select: dark | darkGradient, Default: dark)
eyebrow (Text, optional)
headline (Text, optional)
items (Repeater, empfohlen 3)
Pro Eintrag:
name (Text)
quote (Textarea)
source (Text, optional)
isFeatured (Boolean, optional)
________________________________________
News & Notizen
Kartenreihe mit Studio-News, Community-Terminen oder redaktionellen Beiträgen.
type = newsTeaser
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
button (Object: Standard-Button, optional)
posts (Repeater, empfohlen 3)
Pro Eintrag:
date (Text)
title (Text)
excerpt (Textarea)
image (Image Object)
button (Object: Standard-Button, optional)
________________________________________
Reden wir / Gleich jetzt
Besonderheit auf der Home.
Kontaktbereich mit Kontaktdetails links und Karte rechts, ohne Formular.
type = contactPreviewDetails
isVisible (Boolean)
sectionNumber (Text, z. B. 04, optional)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3 bis 4)
googleMapsUrl (URL)
mapEmbedOrLink (URL, optional)
button (Object: Standard-Button, optional)
Pro Eintrag:
label (Text)
value (Text)
link (Object: Standard-Button, optional)
________________________________________
5. Seite: Leistungen
Die Leistungsseite bündelt eine lineare Angebotsübersicht, einen Dark-Trainingsplan, Programme & Formate, Preise, Mitgliederstimmen auf dunklem Hintergrund, Studio & Stimmung, FAQ und eine große Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Großes Bold-Hero mit starker typografischer Headline.
eyebrow (Text)
headline (Text)
description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Klassen & Programme
Lineare, editorial angelegte Angebotsübersicht.
type = classEditorialList
isVisible (Boolean)
sectionNumber (Text, z. B. 02, optional)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 6)
button (Object: Standard-Button, optional)
Pro Eintrag:
title (Text)
description (Textarea)
meta (Text, optional)
priceFrom (Text, optional)
button (Object: Standard-Button, optional)
hasSubpage (Boolean)
subpage (Object)
________________________________________
Trainingsplan / Finde deinen Flow
Auch auf der Leistungsseite als zentrales Dark-Orientierungsmodul enthalten.
type = trainingPlanDark
isVisible (Boolean)
iconStyle (Select: bolt | none, Default: bolt)
eyebrow (Text, optional)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 4)
stats (Repeater, empfohlen 3)
Pro Plan-Karte:
title (Text)
description (Textarea)
goal (Text, optional)
level (Text, optional)
frequency (Text, optional)
duration (Text, optional)
button (Object: Standard-Button, optional)
Pro Kennzahl:
value (Text)
description (Text)
________________________________________
Programme & Formate
Tabellarische Übersicht der Trainings- und Angebotsformate.
type = programTable
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
columns (Repeater)
rows (Repeater)
button (Object: Standard-Button, optional)
Pro Spalte:
label (Text)
key (Text)
Pro Zeile:
programTitle (Text)
focus (Text, optional)
level (Text, optional)
duration (Text, optional)
format (Text, optional)
days (Text, optional)
time (Text, optional)
trainer (Text, optional)
location (Text, optional)
price (Text, optional)
note (Text, optional)
________________________________________
Preise / Klar gerechnet, fair
Pricing-Section mit mehreren Memberships.
type = pricingPackages
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3)
Pro Paket:
title (Text)
badge (Text, optional)
price (Text)
priceSuffix (Text, optional)
description (Textarea, optional)
features (Repeater)
button (Object: Standard-Button)
isHighlighted (Boolean)
styleVariant (Select: light | dark | accent)
Pro Feature:
text (Text)
________________________________________
Testimonials / Dark Quote Grid
Mitgliederstimmen auf dunklem Hintergrund.
type = quoteGridDark
isVisible (Boolean)
backgroundStyle (Select: dark | darkGradient, Default: dark)
eyebrow (Text, optional)
headline (Text)
items (Repeater, empfohlen 3)
Pro Eintrag:
name (Text)
quote (Textarea)
source (Text, optional)
________________________________________
Studio & Stimmung
Galerie-Vorschau mit Bildern aus Studio und Kursbetrieb.
type = galleryPreview
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
images (Repeater)
Pro Eintrag:
image (Image Object)
alt (Text, optional)
caption (Text, optional)
________________________________________
FAQ
Fragen zu Probetraining, Vertragslaufzeit, Kursangeboten oder Ausstattung.
type = faq
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
items (Repeater)
Pro Eintrag:
question (Text)
answer (Textarea)
________________________________________
CTA
Große Bold-Abschluss-CTA.
type = cta
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
6. Seite: Galerie
Die Galerie-Seite ist eine Bold-Einblicke- / Studioalltags-Seite mit Intro, Themenkarten, Galerie-Grid, Angebotskarten, Testimonials und Probetraining-CTA.
________________________________________
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Großes Bold-Hero mit Headline.
eyebrow (Text)
headline (Text)
description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Intro mit Themenkarten
Text links und drei kurze Themenkarten rechts.
type = teaserList
isVisible (Boolean)
eyebrow (Text)
headline (Text)
description (Textarea)
items (Repeater, max. 3)
Pro Eintrag:
title (Text)
description (Text)
________________________________________
Galerie
Großes Bild-Grid mit Bildern aus Kursen, Studioatmosphäre und Community-Momenten.
type = gallery
isVisible (Boolean)
lightboxEnabled (Boolean, Default: true)
images (Repeater)
Pro Eintrag:
image (Image Object)
alt (Text, optional)
caption (Text, optional)
________________________________________
Programme / Was wir anbieten
Kartenreihe mit den wichtigsten Angebotsbereichen.
type = categoryCards
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater, max. 3)
Pro Eintrag:
title (Text)
description (Text)
________________________________________
Testimonials / Was unsere Mitglieder sagen
Mitgliederstimmen als Bold-Kartenstruktur.
type = testimonials
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
name (Text)
quote (Textarea)
source (Text, optional)
________________________________________
CTA / Probetraining buchen
Große Bold-Abschluss-CTA zur Kontaktaufnahme.
type = cta
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
7. Seite: Über uns
Die Über-uns-Seite ist die Bold-Vertrauens- und Team-Seite.
Sie kombiniert Studio-Story, Trainer:innen auf dunklem Hintergrund, Timeline, dunkles Kennzahlenband, Mitgliederstimmen, FAQ und eine starke Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Großes Bold-Hero mit starker typografischer Headline.
eyebrow (Text)
headline (Text)
description (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Story mit Bild
Editoriale Split-Section mit großem Bild links und markanter Typografie rechts.
type = storyImageSplit
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
description (Textarea)
image (Image Object)
________________________________________
Unsere Trainer:innen
Große Trainer:innen-Section auf dunklem Hintergrund.
type = trainersDark
isVisible (Boolean)
backgroundStyle (Select: dark | darkGradient, Default: dark)
eyebrow (Text)
headline (Text)
description (Textarea, optional)
items (Repeater, empfohlen 3)
Pro Eintrag:
name (Text)
role (Text)
description (Textarea)
image (Image Object)
specialties (Text, optional)
qualifications (Text, optional)
________________________________________
Timeline / Unser Weg
Bold-Zeitstrahl zur Entwicklung des Studios.
type = timeline
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
yearOrMarker (Text)
title (Text)
description (Textarea)
________________________________________
Stats-Band
Dunkles Kennzahlenband mit Verlauf / Gradient und kontrastreicher Typografie.
type = statsBand
isVisible (Boolean)
backgroundStyle (Select: dark | darkGradient, Default: darkGradient)
items (Repeater, max. 4)
Pro Eintrag:
value (Text)
description (Text)
________________________________________
Testimonials / Was unsere Mitglieder sagen
Mitgliederstimmen als Bold-Karten.
type = testimonials
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
items (Repeater)
Pro Eintrag:
name (Text)
quote (Textarea)
source (Text, optional)
________________________________________
FAQ
Fragen zu Probetraining, Vertragslaufzeit, Kursangeboten oder Studioausstattung.
type = faq
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
items (Repeater)
Pro Eintrag:
question (Text)
answer (Textarea)
________________________________________
CTA
Große Bold-Abschluss-CTA.
type = cta
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
8. Seite: Kontakt
Die Kontakt-Seite ist die Bold-Anfrage- und Probetraining-Seite.
Sie kombiniert Kontaktdaten, Formular, Karte, FAQ und eine große Abschluss-CTA.
Wichtig: Weitere Standorte sind im Admin immer pflegbar, auch wenn sie im Frontend nicht sichtbar sind.
________________________________________
Feste Sections
Hinweisbanner
isVisible (Boolean)
items (Repeater)
Pro Eintrag:
text (Text)
________________________________________
Hero
Großes Bold-Hero mit Kontakt-Headline.
eyebrow (Text)
headline (Text)
subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Kontaktbereich
Zweispaltige Kontakt-Section mit Kontaktdaten links, Formular und Karte rechts.
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
mapEmbedOrLink (URL, optional)
Pro zusätzliches Formularfeld:
label (Text)
fieldType (Select)
placeholder (Text)
required (Boolean)
________________________________________
Weitere Standorte
Diese Section ist unabhängig von der Frontend-Sichtbarkeit immer im Admin pflegbar.
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
________________________________________
FAQ
Fragen zu Probetraining, Vertragslaufzeit, Kursangeboten oder Duschen / Spinden.
type = faq
isVisible (Boolean)
eyebrow (Text)
headline (Text)
items (Repeater)
Pro Eintrag:
question (Text)
answer (Textarea)
________________________________________
CTA
Große Bold-Abschluss-CTA mit alternativer Rückführung oder Kontaktmöglichkeit.
type = cta
isVisible (Boolean)
eyebrow (Text, optional)
headline (Text)
subline (Textarea)
button (Object: Standard-Button)
________________________________________
9. Branchenspezifische Besonderheiten Fitness – Bold
Im Unterschied zu Fitness – Klassisch und Fitness – Modern ist Fitness – Bold deutlich stärker typografiegetrieben, kontrastreicher und editorialer aufgebaut.
Typische Merkmale dieser Stil-Kombination sind:
sehr großes typografisches Hero auf der Startseite
Full-Width-Image-Stage direkt unter dem Hero
Themen- / Marquee-Band mit Angebotsfeldern direkt nach dem Einstieg
nummerierte Story-Section auf der Startseite
Klassen & Programme als lineare Editorial-Liste statt klassischem Kartenraster
Trainingsplan / Finde deinen Flow auf der Startseite als Dark-Section mit Akzenticon und Kennzahlen
Programme & Formate als tabellarische Übersicht
Preise / Memberships auf der Startseite und auf Leistungen
Trainer:innen direkt auf der Startseite auf dunklem Hintergrund
Studio & Stimmung als nummerierte Galerie-Vorschau
Mitgliederstimmen auf der Startseite als Dark Quote Grid
Kontakt-Preview auf der Startseite mit Kontaktdetails + Karte, aber ohne Formular
die Galerie ist kein rein dekoratives Modul, sondern ein Einblicke-in-Studio-und-Training-Modul
auf Leistungen gibt es zusätzlich: 
Dark-Trainingsplan
Programme & Formate
Preise
Dark Testimonials
Studio & Stimmung
FAQ
auf Über uns eine dunkle Trainer:innen-Section
auf Über uns ein dunkles Kennzahlenband
auf Kontakt gibt es FAQ + Kontaktformular + Karte
auf Kontakt sind weitere Standorte im Admin immer pflegbar

