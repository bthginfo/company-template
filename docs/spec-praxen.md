Spezifikation – Praxen Klassisch
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Praxen – Klassisch.
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
3. Praxisspezifische Standardmuster
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
Für Leistungen wie Diagnostik, Beratung, Akupunktur, Infusionstherapie, naturheilkundliche Verfahren, Labor, Prävention oder Schmerztherapie.
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
Doctor-Item
Für Ärzt:innen, Therapeut:innen oder medizinisches Fachpersonal.
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	qualifications (Text, optional)
________________________________________
Testimonial-Item
Für Patient:innenstimmen.
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
________________________________________
News-Post-Teaser
Für News, Hinweise, Praxis-Updates oder Gesundheitsnotizen.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Info-Card-Item
Für kompakte Service- und Praxisinformationen.
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
________________________________________
Appointment-Widget-Config
Für die Online-Terminbuchung bzw. das Termin-Widget.
•	providerName (Text)
•	headline (Text)
•	description (Textarea, optional)
•	embedCode (Textarea, optional)
•	externalBookingUrl (URL, optional)
•	button (Object: Standard-Button, optional)
•	styleVariant (Select: card | embedded | simple)
________________________________________
Timeline-Item
Für Praxisgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Focus-Item
Für Schwerpunktkarten / Praxisbereiche.
•	title (Text)
•	description (Textarea)
________________________________________
Gallery-Image-Item
Für Bilder aus Praxisalltag, Räumen, Behandlungssituationen oder Teamkontexten.
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Stat-Item
Für Kennzahlen im Kennzahlenband.
•	value (Text)
•	description (Text)
________________________________________
FAQ-Item
Für häufig gestellte Fragen.
•	question (Text)
•	answer (Textarea)
________________________________________
4. Seite: Start
Die Startseite von Praxen – Klassisch ist ruhig, vertrauensbildend und patient:innenorientiert aufgebaut.
Im Fokus stehen ein klassisches Hero, Themen- / Keyword-Leiste, eine Story-Section zur Haltung der Praxis, Leistungsübersicht, Service & Info direkt auf der Home, Ärzt:innen-Team direkt auf der Home, Online-Termin direkt auf der Home, Praxis- / Raum-Einblicke, Patient:innenstimmen, News und eine Kontakt-Section direkt auf der Home.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste für Hinweise wie Terminvergabe, Akutsprechstunde, Privat / Kasse, neue Patient:innen oder Online-Termin.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes klassisches Hero mit Headline, Beschreibung und primärem CTA.
•	eyebrow (Text)
•	headline (Text)
•	subline (Text, optional)
•	description (Textarea)
•	buttonPrimary (Object: Standard-Button)
•	backgroundImage (Image Object, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Keyword-Band / Themenleiste
Kleine horizontale Themenleiste direkt unter dem Hero mit Fachgebieten oder Praxisfokussen.
•	type = keywordBand
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Story-Teaser / Haltung der Praxis
Text-Bild-Section zur Positionierung der Praxis und zur Vertrauensbildung.
•	type = storyTeaser
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Leistungen
Bildgestütztes Kartenraster mit den wichtigsten Praxisleistungen.
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
Service & Info / Für Sie erreichbar
Besonderheit auf der Home.
Kompakte Info-Section mit Praxisorganisation, Erreichbarkeit, Sprechzeiten, Kontaktpunkten und ergänzendem Hinweisfeld.
•	type = serviceInfo
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3 bis 4)
•	noticeText (Textarea, optional)
Pro Info-Karte:
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
________________________________________
Ärzt:innen & Team / Menschen, denen Sie vertrauen
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
•	qualifications (Text, optional)
________________________________________
Online-Termin / Termin in 60 Sekunden
Besonderheit auf der Home.
Eigene Buchungs-Section mit Widget- oder Buchungskarte für die Online-Terminvergabe.
•	type = appointmentBooking
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	providerName (Text)
•	widgetHeadline (Text)
•	widgetDescription (Textarea, optional)
•	embedCode (Textarea, optional)
•	externalBookingUrl (URL, optional)
•	button (Object: Standard-Button, optional)
•	styleVariant (Select: card | embedded | simple)
________________________________________
Praxis & Räume
Besonderheit auf der Home.
Galerie-Vorschau mit Bildern aus Praxis, Räumen, Behandlungssituationen und Ausstattung.
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
Testimonials / Was unsere Patient:innen sagen
Patient:innenstimmen als Karten.
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
Kartenreihe mit Praxis-Updates, News oder Hinweisen.
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
Kontakt-Teaser / Termin online vereinbaren
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
Die Leistungsseite bündelt Service & Info, Leistungsübersicht, Team-Preview, Online-Termin, Testimonials, Praxis- / Raum-Einblicke, FAQ und eine starke Abschluss-CTA.
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
Service & Info / Für Sie erreichbar
Auf der Leistungsseite ebenfalls sichtbar, mit Sprechzeiten, Kontaktpunkten und ergänzendem Hinweisfeld.
•	type = serviceInfo
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3 bis 4)
•	noticeText (Textarea, optional)
Pro Info-Karte:
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
________________________________________
Leistungen
Kartenraster mit Praxisleistungen.
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
Ärzt:innen & Team / Menschen, denen Sie vertrauen
Auch auf der Leistungsseite als Team-Preview enthalten.
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
•	qualifications (Text, optional)
________________________________________
Online-Termin / Termin in 60 Sekunden
Buchungs-Section auf der Leistungsseite.
•	type = appointmentBooking
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	providerName (Text)
•	widgetHeadline (Text)
•	widgetDescription (Textarea, optional)
•	embedCode (Textarea, optional)
•	externalBookingUrl (URL, optional)
•	button (Object: Standard-Button, optional)
•	styleVariant (Select: card | embedded | simple)
________________________________________
Testimonials / Was unsere Patient:innen sagen
Patient:innenstimmen als Karten.
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
Praxis & Räume
Galerie-Vorschau mit Bildern aus der Praxis.
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
Fragen zu Kassen, Terminbuchung, Barrierefreiheit, Erstgespräch oder Praxisablauf.
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
Die Galerie-Seite ist eine klassische Einblicke- / Praxisraum-Seite mit Intro, Themenkarten, Galerie-Grid, Leistungsschwerpunktkarten, Testimonials und Termin-CTA.
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
Großes Bild-Grid mit Bildern aus Praxisräumen, Behandlungssituationen, Team- und Arbeitsalltag.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Leistungen / Was wir für Sie tun
Kartenreihe mit den wichtigsten Praxisbereichen.
•	type = categoryCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Testimonials / Was unsere Patient:innen sagen
Patient:innenstimmen als Karten.
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
CTA / Vereinbaren Sie einen Termin
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
Sie kombiniert Unternehmens- / Praxishaltung, Ärzt:innen & Team, Timeline, Kennzahlenband, Patient:innenstimmen, FAQ und eine starke Abschluss-CTA.
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
Einleitende Praxisvorstellung mit großem Bild links und Text rechts.
•	type = storyImageSplit
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
________________________________________
Ärzt:innen & Team
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
•	qualifications (Text, optional)
________________________________________
Timeline / Unser Weg
Klassischer Zeitstrahl zur Entwicklung der Praxis.
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
Kennzahlenband mit Praxisgröße, Ärzt:innenzahl, Gründungsjahr, Bewertung o. ä.
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Testimonials / Was unsere Patient:innen sagen
Patient:innenstimmen als Karten.
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
Fragen zu Kassen, Terminbuchung, Barrierefreiheit oder Erstgespräch.
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
Die Kontakt-Seite ist die klassische Anfrage- und Terminseite.
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
Fragen zu Kassen, Terminbuchung, Barrierefreiheit oder Erstgespräch.
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
9. Branchenspezifische Besonderheiten Praxen – Klassisch
Im Unterschied zu den bisherigen Branchen liegt der Schwerpunkt hier stärker auf:
•	Vertrauen, medizinischer Sorgfalt und persönlicher Begleitung
•	Leistungsdarstellung über Behandlungen und Praxisbereiche statt Produkte
•	transparenter Organisation rund um Sprechzeiten, Erreichbarkeit und Terminvergabe
•	starker Teampräsenz der Ärzt:innen und Behandelnden
•	ruhigen, klaren Praxis- und Raum-Einblicken
•	niedrigschwelliger Terminaufnahme über Online-Termin oder Kontakt
Besonders für Praxen – Klassisch gelten zusätzlich diese Regeln:
•	auf der Startseite gibt es Service & Info / Für Sie erreichbar
•	auf der Startseite gibt es eine Ärzt:innen- / Team-Section
•	auf der Startseite gibt es eine Online-Termin-Section
•	auf der Startseite gibt es Praxis & Räume als Galerie-Vorschau
•	auf der Startseite gibt es eine Kontakt-Section mit Karte, aber ohne Formular
•	auf der Leistungen-Seite gibt es zusätzlich: 
o	Service & Info
o	Team
o	Online-Termin
o	Testimonials
o	Praxis & Räume
o	FAQ
•	die Galerie ist kein rein dekoratives Modul, sondern ein Einblicke-in-Praxis-und-Räume-Modul
•	auf Über uns gibt es Story + Team + Timeline + Kennzahlen + Testimonials + FAQ
•	auf Kontakt gibt es FAQ + Kontaktformular + Karte
•	auf Kontakt sind weitere Standorte im Admin immer pflegbar
Spezifikation – Praxen Modern
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Praxen – Modern.
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
3. Praxisspezifische Standardmuster
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
Für Leistungen wie hausärztliche Versorgung, Vorsorge & Check-up, Akupunktur, TCM, Ernährungs- & Mikronährstoffmedizin, Reisemedizin, Impfungen oder Privatleistungen.
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
Doctor-Item
Für Ärzt:innen, Therapeut:innen oder Praxispersonal.
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	qualifications (Text, optional)
________________________________________
Testimonial-Item
Für Patient:innenstimmen.
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
•	isFeatured (Boolean, optional)
________________________________________
News-Post-Teaser
Für News, Hinweise, Praxis-Updates oder Gesundheitsnotizen.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Info-Card-Item
Für kompakte Service- und Praxisinformationen.
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
•	styleVariant (Select: light | accent | warning, optional)
________________________________________
Appointment-Widget-Config
Für die Online-Terminbuchung bzw. das Termin-Widget.
•	providerName (Text)
•	headline (Text)
•	description (Textarea, optional)
•	embedCode (Textarea, optional)
•	externalBookingUrl (URL, optional)
•	button (Object: Standard-Button, optional)
•	styleVariant (Select: card | embedded | simple)
________________________________________
Timeline-Item
Für Praxisgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Focus-Item
Für Schwerpunktkarten / Praxisbereiche.
•	title (Text)
•	description (Textarea)
________________________________________
Gallery-Image-Item
Für Bilder aus Praxisalltag, Räumen, Behandlungssituationen oder Teamkontexten.
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
FAQ-Item
Für häufig gestellte Fragen.
•	question (Text)
•	answer (Textarea)
________________________________________
4. Seite: Start
Die Startseite von Praxen – Modern ist klar, reduziert und patient:innenorientiert aufgebaut.
Im Fokus stehen ein modernes Split-Hero mit Bild und Kennzahlen, eine Themen- / Keyword-Leiste, eine Story-Section zur Haltung der Praxis, textbasierte Leistungsübersicht, Service & Info direkt auf der Home, Ärzt:innen-Team direkt auf der Home, Online-Termin direkt auf der Home, Praxis- / Raum-Einblicke, hervorgehobene Patient:innenstimmen, News und eine Kontakt-Section direkt auf der Home.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste für Hinweise wie Terminvergabe, Akutsprechstunde, neue Patient:innen, Privat / Kasse oder Online-Termin.
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
Story-Teaser / Haltung der Praxis
Kompakte Split-Section mit Bild und Text zur Positionierung der Praxis.
•	type = storyTeaser
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Leistungen
Textbasiertes Kartenraster mit den wichtigsten Praxisleistungen.
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
Service & Info / Für Sie erreichbar
Besonderheit auf der Home.
Karten-Section mit Praxisorganisation, Sprechzeiten, Online-Termin und Akut-Hinweis.
•	type = serviceInfoCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Info-Karte:
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
•	styleVariant (Select: light | accent | warning)
________________________________________
Ärzt:innen & Team / Menschen, denen Sie vertrauen
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
•	qualifications (Text, optional)
________________________________________
Online-Termin / Online-Termin – in 60 Sekunden
Besonderheit auf der Home.
Eigene Buchungs-Section mit zentrierter Booking-Card.
•	type = appointmentBooking
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	providerName (Text)
•	widgetHeadline (Text)
•	widgetDescription (Textarea, optional)
•	embedCode (Textarea, optional)
•	externalBookingUrl (URL, optional)
•	button (Object: Standard-Button, optional)
•	styleVariant (Select: card | embedded | simple)
________________________________________
Praxis & Räume
Besonderheit auf der Home.
Moderne Galerie-Vorschau mit Praxis-, Raum- und Arbeitsalltagsbildern.
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
Featured Testimonials / Patient:innenstimmen
Besonderheit auf der Home.
Testimonial-Section mit einer hervorgehobenen Hauptaussage und ergänzenden kleineren Aussagen.
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
Kartenreihe mit Praxis-Updates, Hinweisen oder redaktionellen Beiträgen.
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
Die Leistungsseite bündelt Service & Info, textbasierte Leistungsübersicht, Team-Preview, Online-Termin, Patient:innenstimmen, Praxis- / Raum-Einblicke, FAQ und eine starke Abschluss-CTA.
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
Service & Info / Für Sie erreichbar
Auf der Leistungsseite ebenfalls sichtbar, mit Praxisorganisation, Sprechzeiten, Online-Termin und Akut-Hinweis.
•	type = serviceInfoCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
Pro Info-Karte:
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
•	styleVariant (Select: light | accent | warning)
________________________________________
Leistungen
Textbasiertes Kartenraster mit Praxisleistungen.
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
Ärzt:innen & Team / Menschen, denen Sie vertrauen
Auch auf der Leistungsseite als Team-Preview enthalten.
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
•	qualifications (Text, optional)
________________________________________
Online-Termin / Online-Termin – in 60 Sekunden
Buchungs-Section auf der Leistungsseite.
•	type = appointmentBooking
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	providerName (Text)
•	widgetHeadline (Text)
•	widgetDescription (Textarea, optional)
•	embedCode (Textarea, optional)
•	externalBookingUrl (URL, optional)
•	button (Object: Standard-Button, optional)
•	styleVariant (Select: card | embedded | simple)
________________________________________
Testimonials / Was unsere Patient:innen sagen
Patient:innenstimmen als moderne Karten.
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
Praxis & Räume
Galerie-Vorschau mit Bildern aus der Praxis.
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
Fragen zu Kassen, Terminbuchung, Barrierefreiheit, Erstgespräch oder Praxisablauf.
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
Große moderne Abschluss-CTA.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
6. Seite: Galerie
Die Galerie-Seite ist eine moderne Einblicke- / Praxisraum-Seite mit Intro, Themenkarten, Galerie-Grid, Leistungs- / Schwerpunktkarten, Testimonials und Termin-CTA.
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
Großes Bild-Grid mit Bildern aus Praxisräumen, Behandlungssituationen, Team- und Arbeitsalltag.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Leistungen / Was wir für Sie tun
Kartenreihe mit den wichtigsten Praxisbereichen.
•	type = categoryCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Testimonials / Was unsere Patient:innen sagen
Patient:innenstimmen als moderne Karten.
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
CTA / Vereinbaren Sie einen Termin
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
Sie kombiniert Praxisvorstellung, Ärzt:innen & Team, Timeline, Kennzahlenband, Patient:innenstimmen, FAQ und eine starke Abschluss-CTA.
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
Ärzt:innen & Team
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
•	qualifications (Text, optional)
________________________________________
Timeline / Unser Weg
Moderner Zeitstrahl zur Entwicklung der Praxis.
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
Testimonials / Was unsere Patient:innen sagen
Patient:innenstimmen als moderne Karten.
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
Fragen zu Kassen, Terminbuchung, Barrierefreiheit oder Erstgespräch.
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
Die Kontakt-Seite ist die moderne Anfrage- und Terminseite.
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
Fragen zu Kassen, Terminbuchung, Barrierefreiheit oder Erstgespräch.
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
9. Branchenspezifische Besonderheiten Praxen – Modern
Im Unterschied zu Praxen – Klassisch ist Praxen – Modern stärker reduziert, klarer typografisch und deutlich kartenbasierter aufgebaut.
Typische Merkmale dieser Stil-Kombination sind:
•	modernes Split-Hero auf der Startseite mit Bild rechts und Kennzahlen im Hero-Bereich
•	stärkere Arbeit mit großen Sans-Serif-Headlines
•	Themen- / Keyword-Leiste direkt unter dem Hero
•	textbasierte Leistungskarten statt bildlastiger Servicekarten
•	Service & Info / Für Sie erreichbar auf der Startseite als kompakte Karten-Section
•	Ärzt:innen-Team direkt auf der Startseite
•	Online-Termin direkt auf der Startseite als zentrierte Booking-Card
•	Praxis & Räume als modernes Bildgrid
•	Patient:innenstimmen auf der Startseite als hervorgehobene Hauptaussage mit ergänzenden Karten
•	Kontakt-Preview auf der Startseite mit Kontaktkarten + Karte, aber ohne Formular
•	die Galerie ist kein rein dekoratives Modul, sondern ein Einblicke-in-Praxis-und-Räume-Modul
•	auf Leistungen gibt es zusätzlich: 
o	Service & Info
o	Team
o	Online-Termin
o	Testimonials
o	Praxis & Räume
o	FAQ
•	auf Über uns ein dunkles Kennzahlenband
•	auf Kontakt gibt es FAQ + Kontaktformular + Karte
•	auf Kontakt sind weitere Standorte im Admin immer pflegbar
Spezifikation – Praxen Bold
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Praxen – Bold.
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
3. Praxisspezifische Standardmuster
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
Für Leistungen wie hausärztliche Versorgung, Vorsorge & Check-up, Akupunktur, TCM, Ernährungs- & Mikronährstoffmedizin, Reisemedizin, Impfungen oder Privatleistungen.
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
Doctor-Item
Für Ärzt:innen, Therapeut:innen oder Praxispersonal.
•	name (Text)
•	role (Text)
•	description (Textarea)
•	image (Image Object)
•	specialties (Text, optional)
•	qualifications (Text, optional)
________________________________________
Testimonial-Item
Für Patient:innenstimmen.
•	name (Text)
•	quote (Textarea)
•	source (Text, optional)
•	isFeatured (Boolean, optional)
________________________________________
News-Post-Teaser
Für News, Hinweise, Praxis-Updates oder Gesundheitsnotizen.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Info-Card-Item
Für kompakte Service- und Praxisinformationen.
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
•	styleVariant (Select: light | accent | warning, optional)
________________________________________
Appointment-Widget-Config
Für die Online-Terminbuchung bzw. das Termin-Widget.
•	providerName (Text)
•	headline (Text)
•	description (Textarea, optional)
•	embedCode (Textarea, optional)
•	externalBookingUrl (URL, optional)
•	button (Object: Standard-Button, optional)
•	styleVariant (Select: card | embedded | simple)
________________________________________
Timeline-Item
Für Praxisgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Focus-Item
Für Schwerpunktkarten / Praxisbereiche.
•	title (Text)
•	description (Textarea)
________________________________________
Gallery-Image-Item
Für Bilder aus Praxisalltag, Räumen, Behandlungssituationen oder Teamkontexten.
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
FAQ-Item
Für häufig gestellte Fragen.
•	question (Text)
•	answer (Textarea)
________________________________________
4. Seite: Start
Die Startseite von Praxen – Bold ist plakativ, typografisch stark und zugleich patient:innenorientiert aufgebaut.
Im Fokus stehen ein sehr großes Hero, eine Full-Width-Image-Stage, ein Themenband, eine nummerierte Story-Section, eine lineare Leistungsübersicht, Service & Info direkt auf der Home, Ärzt:innen-Team direkt auf der Home, Online-Termin direkt auf der Home, Praxis & Räume als nummerierte Galerie-Vorschau, Patient:innenstimmen auf dunklem Hintergrund, News und eine Kontakt-Section direkt auf der Home.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste für Hinweise wie Terminvergabe, Akutsprechstunde, neue Patient:innen, Privat / Kasse oder Online-Termin.
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
•	floatingText (Textarea, optional)
•	button (Object: Standard-Button, optional)
________________________________________
Marquee-Band / Themenleiste
Horizontales Schlagwort-Band mit Praxisfeldern oder Schwerpunkten.
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
Service & Info / Für Sie erreichbar
Besonderheit auf der Home.
Kompakte Info-Section mit Plus-Marker / Akzenticon, mehreren Info-Karten und ergänzendem Hinweisfeld.
•	type = serviceInfo
•	isVisible (Boolean)
•	iconStyle (Select: plus | none, Default: plus)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
•	noticeText (Textarea, optional)
Pro Info-Karte:
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
•	styleVariant (Select: light | accent | warning)
________________________________________
Ärzt:innen & Team / Menschen, denen Sie vertrauen
Besonderheit auf der Home.
Team-Preview als Kartenraster auf hellem Hintergrund.
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
•	qualifications (Text, optional)
________________________________________
Online-Termin / Online-Termin – in 60 Sekunden
Besonderheit auf der Home.
Eigene Buchungs-Section mit zentrierter Booking-Card.
•	type = appointmentBooking
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	providerName (Text)
•	widgetHeadline (Text)
•	widgetDescription (Textarea, optional)
•	embedCode (Textarea, optional)
•	externalBookingUrl (URL, optional)
•	button (Object: Standard-Button, optional)
•	styleVariant (Select: card | embedded | simple)
________________________________________
Praxis & Räume
Besonderheit auf der Home.
Nummerierte Galerie-Vorschau mit Praxis-, Raum- und Arbeitsalltagsbildern.
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
Patient:innenstimmen auf dunklem Hintergrund in einer kontrastreichen Kartenstruktur.
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
Kartenreihe mit Praxis-Updates, Hinweisen oder redaktionellen Beiträgen.
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
Reden wir / Gleich jetzt
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
Die Leistungsseite bündelt Service & Info, eine lineare Leistungsübersicht, Team-Preview, Online-Termin, Patient:innenstimmen auf dunklem Hintergrund, Praxis- / Raum-Einblicke, FAQ und eine große Abschluss-CTA.
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
Service & Info / Für Sie erreichbar
Auf der Leistungsseite ebenfalls sichtbar, mit Praxisorganisation, Sprechzeiten, Online-Termin und ergänzendem Hinweisfeld.
•	type = serviceInfo
•	isVisible (Boolean)
•	iconStyle (Select: plus | none, Default: plus)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater, empfohlen 3)
•	noticeText (Textarea, optional)
Pro Info-Karte:
•	title (Text)
•	value (Text, optional)
•	description (Textarea, optional)
•	link (Object: Standard-Button, optional)
•	styleVariant (Select: light | accent | warning)
________________________________________
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
Ärzt:innen & Team / Menschen, denen Sie vertrauen
Auch auf der Leistungsseite als Team-Preview enthalten.
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
•	qualifications (Text, optional)
________________________________________
Online-Termin / Online-Termin – in 60 Sekunden
Buchungs-Section auf der Leistungsseite.
•	type = appointmentBooking
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	providerName (Text)
•	widgetHeadline (Text)
•	widgetDescription (Textarea, optional)
•	embedCode (Textarea, optional)
•	externalBookingUrl (URL, optional)
•	button (Object: Standard-Button, optional)
•	styleVariant (Select: card | embedded | simple)
________________________________________
Testimonials / Dark Quote Grid
Patient:innenstimmen auf dunklem Hintergrund.
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
Praxis & Räume
Galerie-Vorschau mit Bildern aus der Praxis.
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
Fragen zu Kassen, Terminbuchung, Barrierefreiheit, Erstgespräch oder Praxisablauf.
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
Die Galerie-Seite ist eine Bold-Einblicke- / Praxisraum-Seite mit Intro, Themenkarten, Galerie-Grid, Leistungs- / Schwerpunktkarten, Testimonials und großer Termin-CTA.
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
Großes Bild-Grid mit Bildern aus Praxisräumen, Behandlungssituationen, Team- und Arbeitsalltag.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
•	caption (Text, optional)
________________________________________
Leistungen / Was wir für Sie tun
Kartenreihe mit den wichtigsten Praxisbereichen.
•	type = categoryCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater, max. 3)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Testimonials / Was unsere Patient:innen sagen
Patient:innenstimmen als Bold-Kartenstruktur.
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
CTA / Vereinbaren Sie einen Termin
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
Sie kombiniert Praxisvorstellung, Ärzt:innen & Team auf dunklem Hintergrund, Timeline, dunkles Kennzahlenband, Patient:innenstimmen, FAQ und eine starke Abschluss-CTA.
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
Ärzt:innen & Team
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
•	qualifications (Text, optional)
________________________________________
Timeline / Unser Weg
Bold-Zeitstrahl zur Entwicklung der Praxis.
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
Testimonials / Was unsere Patient:innen sagen
Patient:innenstimmen als Bold-Karten.
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
Fragen zu Kassen, Terminbuchung, Barrierefreiheit oder Erstgespräch.
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
Die Kontakt-Seite ist die Bold-Anfrage- und Terminseite.
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
Fragen zu Kassen, Terminbuchung, Barrierefreiheit oder Erstgespräch.
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
9. Branchenspezifische Besonderheiten Praxen – Bold
Im Unterschied zu Praxen – Klassisch und Praxen – Modern ist Praxen – Bold deutlich stärker typografiegetrieben, kontrastreicher und editorialer aufgebaut.
Typische Merkmale dieser Stil-Kombination sind:
•	sehr großes typografisches Hero auf der Startseite
•	Full-Width-Image-Stage direkt unter dem Hero
•	Themen- / Marquee-Band mit Praxisfeldern direkt nach dem Einstieg
•	nummerierte Story-Section auf der Startseite
•	Leistungen als lineare Editorial-Liste statt klassischem Kartenraster
•	Service & Info / Für Sie erreichbar auf der Startseite als kompakte Info-Section mit Karten
•	Ärzt:innen-Team direkt auf der Startseite
•	Online-Termin direkt auf der Startseite als zentrierte Booking-Card
•	Praxis & Räume als nummerierte Galerie-Vorschau
•	Patient:innenstimmen auf der Startseite als Dark Quote Grid
•	Kontakt-Preview auf der Startseite mit Kontaktdetails + Karte, aber ohne Formular
•	die Galerie ist kein rein dekoratives Modul, sondern ein Einblicke-in-Praxis-und-Räume-Modul
•	auf Leistungen gibt es zusätzlich: 
o	Service & Info
o	Team
o	Online-Termin
o	Dark Testimonials
o	Praxis & Räume
o	FAQ
•	auf Über uns eine dunkle Team-Section
•	auf Über uns ein dunkles Kennzahlenband
•	auf Kontakt gibt es FAQ + Kontaktformular + Karte
•	auf Kontakt sind weitere Standorte im Admin immer pflegbar

