Spezifikation – Handwerk Klassisch
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Handwerk – Klassisch.
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
•	Referenzen
•	Betrieb
•	Anfrage
________________________________________
3. Globale, seitenübergreifende Elemente
Sticky Notdienst Banner
Dieses Element ist kein normales Seitenmodul, sondern ein globales, seitenübergreifendes Sticky-Element, das auf allen Seiten eingeblendet werden kann.
Es sitzt typischerweise fixiert am unteren Bildschirmrand / in einer Ecke und bleibt beim Scrollen sichtbar.
•	isVisible (Boolean)
•	label (Text)
•	headline (Text, optional)
•	subline (Text, optional)
•	phone (Text)
•	button (Object: Standard-Button)
•	styleVariant (Select: dark | light | accent)
•	position (Select: bottomRight | bottomCenter | bottomBar)
•	showOnDesktop (Boolean)
•	showOnMobile (Boolean)
•	showOnPages (Multi-Select: Start | Leistungen | Referenzen | Betrieb | Anfrage | alle)
•	isCollapsedByDefault (Boolean, optional)
________________________________________
4. Branchenspezifische Standardmuster
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
Für Heizungsmodernisierung, Badsanierung, Notdienst, Wartung, Reparatur, PV / Solar, Energieberatung oder Smart-Home-Leistungen.
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
Projekt-Item
Für Referenzen / Vorher-Nachher-Projekte.
•	title (Text)
•	category (Text, optional)
•	description (Textarea, optional)
•	image (Image Object)
•	location (Text, optional)
•	year (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
subpage:
•	eyebrow (Text)
•	title (Text)
•	description (Textarea)
•	beforeImages (Repeater, optional)
•	afterImages (Repeater, optional)
•	content (Rich Text Editor)
________________________________________
Team-Item
Für Mitarbeitende / Meister / Monteure / Projektleitung.
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
Für News-, Notiz- oder Ratgeberkarten.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Qualification-Item
Für Qualifikationen, Zertifikate, Mitgliedschaften, Meistertitel, Herstellerpartnerschaften oder Prüfzeichen.
•	title (Text)
•	description (Textarea)
•	icon (Image Object, optional)
•	badgeLabel (Text, optional)
•	link (Object: Standard-Button, optional)
________________________________________
Timeline-Item
Für Unternehmensgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Price-Item
Für Preis- oder Richtwert-Angaben.
•	title (Text)
•	description (Text, optional)
•	price (Text)
________________________________________
Förderprogramm-Item
Für einzelne Förderbausteine im Kalkulator.
•	title (Text)
•	description (Textarea)
•	percentage (Number, optional)
•	fixedAmount (Number, optional)
•	isActive (Boolean)
•	isStackable (Boolean)
•	priority (Number, optional)
•	maxAmount (Number, optional)
•	minInvestment (Number, optional)
•	maxInvestment (Number, optional)
•	eligibilityNote (Text, optional)
________________________________________
Förder-Kalkulator (Section + Admin-Logik)
Dieses Element ist eine eigene Section und zusätzlich ein fachliches Berechnungsmodul, bei dem im Admin nicht nur Inhalte, sondern auch die Rechenlogik gepflegt werden kann.
Sichtbare Inhalte im Frontend
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	button (Object: Standard-Button, optional)
Nutzersteuerung im Frontend
•	investmentLabel (Text, optional)
•	investmentMin (Number)
•	investmentMax (Number)
•	investmentStep (Number)
•	investmentDefault (Number)
•	currency (Text, Default: EUR)
Ergebnisfelder im Frontend
•	resultGrossLabel (Text)
•	resultFundingLabel (Text)
•	resultNetLabel (Text)
Förderprogramme
•	programs (Repeater)
Pro Programm:
•	title (Text)
•	description (Textarea)
•	percentage (Number, optional)
•	fixedAmount (Number, optional)
•	isActive (Boolean)
•	isStackable (Boolean)
•	priority (Number, optional)
•	maxAmount (Number, optional)
•	minInvestment (Number, optional)
•	maxInvestment (Number, optional)
•	eligibilityNote (Text, optional)
Berechnungslogik im Admin
•	calculationMode (Select: sumAllEligible | highestOnly | priorityBased | customRules)
•	maxTotalFundingPercent (Number, optional)
•	maxTotalFundingAmount (Number, optional)
•	roundingMode (Select: none | round | floor | ceil)
•	roundingStep (Number, optional)
•	showGrossResult (Boolean)
•	showFundingResult (Boolean)
•	showNetResult (Boolean)
Zusätzliche Rechenregeln
•	rules (Repeater, optional)
Pro Regel:
•	ruleName (Text)
•	conditionField (Select: investmentAmount | selectedProgramCount | custom)
•	operator (Select: > | >= | < | <= | = | between)
•	value1 (Number)
•	value2 (Number, optional)
•	effectType (Select: addPercent | addFixed | capPercent | capAmount | excludeProgram | includeProgram)
•	effectValue (Number, optional)
•	targetProgramTitle (Text, optional)
Berechnetes Ergebnis
Standardlogik:
•	Bruttoinvestition = eingegebener Investitionswert
•	Förderung gesamt = Summe aller gültigen Förderbausteine gemäß Regeln
•	Nettoinvestition = Bruttoinvestition minus Förderung gesamt
________________________________________
5. Seite: Start
Die Startseite von Handwerk – Klassisch ist vertrauensbildend, hochwertig und serviceorientiert aufgebaut.
Im Fokus stehen großes Hero, Leistungsübersicht, Förder-Kalkulator, Kennzahlen, Referenzen, aktuelle Themen, Bewertungen, Unternehmens-Teaser und CTA.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste mit Öffnungszeiten, Festpreis-Hinweisen, Förderberatung, Notdienst oder regionalen Verfügbarkeiten.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes klassisches Hero mit emotionalem Hintergrundbild, Headline, Beschreibung, CTA und Kennzahlen.
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
Sticky Notdienst Banner
Globales Sticky-Element, auf dieser Seite standardmäßig aktiv.
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Utility-Bar / Info-Leiste
Leiste direkt unter dem Hero mit z. B. Notdienst-Info, Öffnungsstatus, Verfügbarkeit oder Schnellkontakt.
•	type = actionBar
•	isVisible (Boolean)
•	statusLabel (Text, optional)
•	statusText (Text, optional)
•	infoText (Text, optional)
•	buttonPrimary (Object: Standard-Button, optional)
•	buttonSecondary (Object: Standard-Button, optional)
________________________________________
Leistungs-Teaser
Erste Übersicht über Kernleistungen.
•	type = featuredServices
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	items (Repeater, empfohlen 3)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Förder-Kalkulator
Pflegbarer Förderrechner mit Admin-Logik.
•	type = fundingCalculator
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	investmentLabel (Text, optional)
•	investmentMin (Number)
•	investmentMax (Number)
•	investmentStep (Number)
•	investmentDefault (Number)
•	resultGrossLabel (Text)
•	resultFundingLabel (Text)
•	resultNetLabel (Text)
•	programs (Repeater)
•	calculationMode (Select)
•	maxTotalFundingPercent (Number, optional)
•	maxTotalFundingAmount (Number, optional)
•	roundingMode (Select)
•	roundingStep (Number, optional)
•	rules (Repeater, optional)
•	button (Object: Standard-Button, optional)
________________________________________
Stats-Band
Dunkles Kennzahlenband.
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Projekt-Galerie-Vorschau
Visuelle Vorschau auf Referenzen / Werkstatt / Baustellen / Ergebnisse.
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
Aktuelle Themen / News-Teaser
Dunklere Akzent-Section mit Bild links und mehreren News- / Hinweis- / Artikelteasern rechts.
•	type = newsHighlightList
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	featuredImage (Image Object, optional)
•	posts (Repeater)
Pro Eintrag:
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	button (Object: Standard-Button, optional)
Zusätzlich:
•	buttonPrimary (Object: Standard-Button, optional)
________________________________________
Testimonials
Kund:innenstimmen in Kartenform.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
________________________________________
Betriebs-Teaser
Text-Bild-Section zur Geschichte / Haltung / Handwerkstradition.
•	type = storyTeaser
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button)
________________________________________
News & Notizen
Karten-Grid mit redaktionellen Meldungen.
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
Großer Abschluss-CTA.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
6. Seite: Leistungen
Die Leistungsseite bündelt Services, Förderrechner, Ablauf, FAQ und Abschluss-CTA.
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
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Highlights-Bar
Horizontale Argumentationsleiste.
•	type = highlightsBar
•	isVisible (Boolean)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Leistungs-Übersicht
Einleitende Leistungsdarstellung mit Text links und Servicekarten rechts.
•	type = serviceOverviewCards
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	description (Textarea)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	price (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Förder-Kalkulator
•	type = fundingCalculator
•	isVisible (Boolean)
•	alle Felder wie im Standardmuster Förder-Kalkulator
________________________________________
Schritte
Ablauf in vier Schritten.
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
CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
7. Seite: Referenzen
Die Referenzen-Seite ist eine klassische Projekt- und Vorher-Nachher-Seite mit Intro, Galerie, Kategoriekarten und CTA.
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
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Intro mit Themenkarten
Text links, Kategoriekarten rechts.
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
Projekt-Galerie
Große visuelle Galerie mit Referenzbildern.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
________________________________________
Kategorien-Karten
Kartenreihe mit Tätigkeitsbereichen.
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
8. Seite: Betrieb
Die Betriebsseite ist die klassische About-Seite für Handwerk.
Sie kombiniert Firmenvorstellung, Grundsätze, Zeitstrahl, Team, Kennzahlen, Qualifikationen / Zertifizierungen, Testimonials und CTA.
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
•	subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Story mit Bild
Einleitende Unternehmensgeschichte mit Bild links und Text rechts.
•	type = storyImageSplit
•	isVisible (Boolean)
•	image (Image Object)
•	description (Textarea)
________________________________________
Werte / Grundsätze
Kartenreihe mit drei Prinzipien.
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
Zeitstrahl zur Firmengeschichte.
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
Vorstellung des Betriebs- / Kernteams.
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
Qualifikationen / Geprüft & zertifiziert
Neues Element auf der About-Seite.
Für Meistertitel, Verbandsmitgliedschaften, Herstellerzertifikate, Schulungen, Prüfzeichen oder Qualifikationen.
•	type = qualifications
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	icon (Image Object, optional)
•	badgeLabel (Text, optional)
•	link (Object: Standard-Button, optional)
________________________________________
Testimonials
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
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
9. Seite: Anfrage
Die Anfrage-Seite ist die Kontakt- und Notdienst-Seite.
Sie kombiniert große Headline, Kontaktdaten, Formular, Karte, Wegbeschreibung und CTA.
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
Großes Hero mit Anfrage- / Kontakt- / Notdienst-Headline.
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
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
Wegbeschreibung / Hinweise
Kartenreihe für Notdienst, Anfahrtsgebiet, Beratung vor Ort o. ä.
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
10. Branchenspezifische Besonderheiten Handwerk – Klassisch
Im Unterschied zu den bisherigen Branchen liegt der Schwerpunkt hier stärker auf:
•	Vertrauen, Verlässlichkeit und regionaler Erreichbarkeit
•	Service- und Leistungsdarstellung statt Produktinszenierung
•	förderfähigen Leistungen und transparenter Kostenkommunikation
•	Referenzen / Vorher-Nachher-Projekten
•	Notdienst- und Kontaktlogik
•	klassischen Qualitäts- und Handwerkssignalen wie Erfahrung, Meistertitel, Zertifizierungen und Reaktionsgeschwindigkeit
Besonders für Handwerk – Klassisch gelten zusätzlich diese Regeln:
•	der Sticky Notdienst Banner ist ein globales Element auf allen Seiten
•	der Förder-Kalkulator ist ein eigenes Inhaltsmodul mit pflegbarer Admin-Berechnungslogik
•	auf der Seite Betrieb gibt es zusätzlich die Section Qualifikationen / geprüft & zertifiziert
•	auf der Seite Anfrage sind weitere Standorte im Admin immer pflegbar
Spezifikation – Handwerk Modern
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Handwerk – Modern.
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
•	Referenzen
•	Betrieb
•	Anfrage
________________________________________
3. Globale, seitenübergreifende Elemente
Sticky Notdienst Banner
Dieses Element ist kein normales Seitenmodul, sondern ein globales, seitenübergreifendes Sticky-Element, das auf allen Seiten eingeblendet werden kann.
Es sitzt typischerweise fixiert am unteren Bildschirmrand / in einer Ecke und bleibt beim Scrollen sichtbar.
•	isVisible (Boolean)
•	label (Text)
•	headline (Text, optional)
•	subline (Text, optional)
•	phone (Text)
•	button (Object: Standard-Button)
•	styleVariant (Select: dark | light | accent)
•	position (Select: bottomRight | bottomCenter | bottomBar)
•	showOnDesktop (Boolean)
•	showOnMobile (Boolean)
•	showOnPages (Multi-Select: Start | Leistungen | Referenzen | Betrieb | Anfrage | alle)
•	isCollapsedByDefault (Boolean, optional)
________________________________________
4. Branchenspezifische Standardmuster
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
Für Heizungsmodernisierung, Badsanierung, Reparaturen, Notdienst, PV / Solar, Wartung, Smart-Home oder Energieberatung.
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
Projekt-Item
Für Referenzen / abgeschlossene Projekte.
•	title (Text)
•	category (Text, optional)
•	description (Textarea, optional)
•	image (Image Object)
•	location (Text, optional)
•	year (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
subpage:
•	eyebrow (Text)
•	title (Text)
•	description (Textarea)
•	beforeImages (Repeater, optional)
•	afterImages (Repeater, optional)
•	content (Rich Text Editor)
________________________________________
Team-Item
Für Mitarbeitende / Meister / Service- und Projektteam.
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
Für News-, Ratgeber- oder Notiz-Karten.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Quick-Fact-Item
Für kleine Kennzahlen- oder Faktenkarten.
•	label (Text)
•	value (Text)
________________________________________
Qualification-Item
Für Meistertitel, Zertifikate, Mitgliedschaften, Herstellerpartnerschaften oder Förderkompetenz.
•	title (Text)
•	description (Textarea)
•	icon (Image Object, optional)
•	badgeLabel (Text, optional)
•	link (Object: Standard-Button, optional)
________________________________________
Timeline-Item
Für Unternehmensgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Förderprogramm-Item
Für einzelne Förderbausteine im Förder-Kalkulator.
•	title (Text)
•	description (Textarea)
•	percentage (Number, optional)
•	fixedAmount (Number, optional)
•	isActive (Boolean)
•	isStackable (Boolean)
•	priority (Number, optional)
•	maxAmount (Number, optional)
•	minInvestment (Number, optional)
•	maxInvestment (Number, optional)
•	eligibilityNote (Text, optional)
________________________________________
Förder-Kalkulator (Section + Admin-Logik)
Dieses Element ist eine eigene Section und zusätzlich ein fachliches Berechnungsmodul, bei dem im Admin nicht nur Inhalte, sondern auch die Rechenlogik gepflegt werden kann.
Sichtbare Inhalte im Frontend
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	button (Object: Standard-Button, optional)
Nutzersteuerung im Frontend
•	investmentLabel (Text, optional)
•	investmentMin (Number)
•	investmentMax (Number)
•	investmentStep (Number)
•	investmentDefault (Number)
•	currency (Text, Default: EUR)
Ergebnisfelder im Frontend
•	resultGrossLabel (Text)
•	resultFundingLabel (Text)
•	resultNetLabel (Text)
Förderprogramme
•	programs (Repeater)
Pro Programm:
•	title (Text)
•	description (Textarea)
•	percentage (Number, optional)
•	fixedAmount (Number, optional)
•	isActive (Boolean)
•	isStackable (Boolean)
•	priority (Number, optional)
•	maxAmount (Number, optional)
•	minInvestment (Number, optional)
•	maxInvestment (Number, optional)
•	eligibilityNote (Text, optional)
Berechnungslogik im Admin
•	calculationMode (Select: sumAllEligible | highestOnly | priorityBased | customRules)
•	maxTotalFundingPercent (Number, optional)
•	maxTotalFundingAmount (Number, optional)
•	roundingMode (Select: none | round | floor | ceil)
•	roundingStep (Number, optional)
•	showGrossResult (Boolean)
•	showFundingResult (Boolean)
•	showNetResult (Boolean)
Zusätzliche Rechenregeln
•	rules (Repeater, optional)
Pro Regel:
•	ruleName (Text)
•	conditionField (Select: investmentAmount | selectedProgramCount | custom)
•	operator (Select: > | >= | < | <= | = | between)
•	value1 (Number)
•	value2 (Number, optional)
•	effectType (Select: addPercent | addFixed | capPercent | capAmount | excludeProgram | includeProgram)
•	effectValue (Number, optional)
•	targetProgramTitle (Text, optional)
Berechnetes Ergebnis
Standardlogik:
•	Bruttoinvestition = eingegebener Investitionswert
•	Förderung gesamt = Summe aller gültigen Förderbausteine gemäß Regeln
•	Nettoinvestition = Bruttoinvestition minus Förderung gesamt
________________________________________
5. Seite: Start
Die Startseite von Handwerk – Modern ist klar, modular und vertrauensbildend aufgebaut.
Im Fokus stehen Hero, Kennzahlen, Servicekarten, Förder-Kalkulator, aktuelle Themen, Referenzen, Story-Teaser, Testimonials, News und CTA.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste mit Öffnungszeiten, Notdienst, Förderberatung, Festpreis-Garantie oder Meisterbetrieb-Hinweisen.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes modernes Hero mit Headline links, Bild rechts, Introtext, CTA und Kennzahlen im unteren Bereich.
•	eyebrow (Text)
•	headline (Text)
•	subline (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	buttonPrimary (Object: Standard-Button)
•	stats (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
Globales Sticky-Element, auf dieser Seite standardmäßig aktiv.
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Utility-Bar / Info-Leiste
Schmale Leiste unter dem Hero mit Schnellinfos und Direktaktionen.
•	type = actionBar
•	isVisible (Boolean)
•	statusLabel (Text, optional)
•	statusText (Text, optional)
•	infoText (Text, optional)
•	buttonPrimary (Object: Standard-Button, optional)
•	buttonSecondary (Object: Standard-Button, optional)
________________________________________
Stats-Band
Dunkles Kennzahlenband direkt nach dem Hero.
•	type = statsBand
•	isVisible (Boolean)
•	items (Repeater, max. 4)
Pro Eintrag:
•	value (Text)
•	description (Text)
________________________________________
Service-Cards
Grid mit den wichtigsten Leistungen.
•	type = serviceCards
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	price (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Förder-Kalkulator
Pflegbarer Förderrechner mit Admin-Logik.
•	type = fundingCalculator
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	investmentLabel (Text, optional)
•	investmentMin (Number)
•	investmentMax (Number)
•	investmentStep (Number)
•	investmentDefault (Number)
•	resultGrossLabel (Text)
•	resultFundingLabel (Text)
•	resultNetLabel (Text)
•	programs (Repeater)
•	calculationMode (Select)
•	maxTotalFundingPercent (Number, optional)
•	maxTotalFundingAmount (Number, optional)
•	roundingMode (Select)
•	roundingStep (Number, optional)
•	rules (Repeater, optional)
•	button (Object: Standard-Button, optional)
________________________________________
Aktuelle Themen / Umsetzung
Kompakte Karten-Section mit aktuellen Projekten, Themen oder Leistungsaspekten.
•	type = topicCards
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	items (Repeater, empfohlen 4 bis 6)
Pro Eintrag:
•	title (Text)
•	description (Text)
•	button (Object: Standard-Button, optional)
________________________________________
Projekt-Galerie-Vorschau
Masonry-artige Referenzvorschau.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	images (Repeater, empfohlen 5 bis 6)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
Zusätzlich:
•	button (Object: Standard-Button)
________________________________________
Keyword-Band / Leistungsband
Horizontale Leiste mit Schlagworten oder Leistungsfeldern wie Heizung, Bad/Wärme, Wärmepumpe, Service etc.
•	type = keywordBand
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Story mit Bild
Moderne About-Teaser-Section mit Text links und Bild rechts.
•	type = storyTeaser
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button)
________________________________________
Testimonials
Kund:innenstimmen in Kartenform.
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
________________________________________
News & Notizen
Teaser-Grid für News, Hinweise oder Ratgeberinhalte.
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
Große, reduzierte CTA-Fläche.
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
6. Seite: Leistungen
Die Leistungsseite bündelt Hero, Highlights-Bar, Servicekarten, Förder-Kalkulator, Ablauf, FAQ und Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Hero mit Headline links, Bild rechts und kurzem Introtext.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	image (Image Object)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Highlights-Bar
Horizontale Nutzen- / Serviceleiste.
•	type = highlightsBar
•	isVisible (Boolean)
•	items (Repeater, empfohlen 4)
Pro Eintrag:
•	title (Text)
•	description (Text)
________________________________________
Service-Cards
Karten-Grid mit Leistungen.
•	type = serviceCards
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	price (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Förder-Kalkulator
•	type = fundingCalculator
•	isVisible (Boolean)
•	alle Felder wie im Standardmuster Förder-Kalkulator
________________________________________
Schritte
Vier Schritte von Anfrage bis Ausführung.
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
CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
7. Seite: Referenzen
Die Referenzen-Seite ist eine moderne Projektübersicht mit Intro, Themenkarten, Galerie, Kategoriekarten und CTA.
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
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Intro mit Themenkarten
Text links, kurze Referenzlogik-Karten rechts.
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
Großes Bild-Grid mit Referenzfotos.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
________________________________________
Kategorien-Karten
Kartenreihe mit Tätigkeitsbereichen.
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
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
8. Seite: Betrieb
Die Betriebsseite ist die moderne About-Seite für Handwerk.
Sie kombiniert Hero, Story mit Quick-Facts, Grundsätze, Timeline, Team, Kennzahlen, Qualifikationen / geprüft & zertifiziert, Testimonials und CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Hero mit Headline links, Bild rechts und kurzer Einleitung.
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea, optional)
•	image (Image Object)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Story mit Quick-Facts
Einleitende Unternehmensstory mit Fließtext links und kompakter Faktenkarte rechts.
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
Timeline
Zeitstrahl zur Firmengeschichte.
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
Karten-Grid mit Mitarbeitenden.
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
Qualifikationen / Geprüft & zertifiziert
Zusätzliche moderne Karten-Section für Prüfzeichen, Zertifikate und Mitgliedschaften.
•	type = qualifications
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	icon (Image Object, optional)
•	badgeLabel (Text, optional)
•	link (Object: Standard-Button, optional)
________________________________________
Testimonials
•	type = testimonials
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	items (Repeater)
Pro Eintrag:
•	name (Text)
•	quote (Textarea)
________________________________________
CTA
•	type = cta
•	isVisible (Boolean)
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
9. Seite: Anfrage
Die Anfrage-Seite ist die Kontakt- und Notdienst-Seite im modernen, reduzierten Stil.
Sie kombiniert Hero, Kontaktdaten, Formular, Karte, Wegbeschreibung und CTA.
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
Großes Hero mit Kontakt- / Anfrage- / Notdienst-Headline.
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
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
Wegbeschreibung / Hinweise
Kartenreihe für Notdienst, Anfahrtsgebiet und Vor-Ort-Beratung.
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
•	eyebrow (Text, optional)
•	headline (Text)
•	subline (Textarea)
•	button (Object: Standard-Button)
________________________________________
10. Branchenspezifische Besonderheiten Handwerk – Modern
Im Unterschied zu Handwerk – Klassisch ist Handwerk – Modern stärker modular, kartenbasiert und reduzierter aufgebaut.
Typische Merkmale dieser Stil-Kombination sind:
•	klare Hero-Splits mit Text links und Bild rechts
•	prominentes Kennzahlenband direkt nach dem Einstieg
•	stärkeres Karten-Grid für Leistungen und Inhalte
•	reduzierter, moderner Umgang mit CTAs
•	Story-Section mit Quick-Facts auf der Betriebsseite
•	modernes Qualifikationen-Modul als Kartenraster
•	kompakte Projekt- und Themenvorschauen auf der Startseite
•	gleiche fachliche Sonderlogik wie im klassischen Handwerk: 
o	Sticky Notdienst Banner global
o	Förder-Kalkulator mit Admin-Berechnungslogik
o	Qualifikationen / geprüft & zertifiziert auf Betrieb
o	weitere Standorte auf Anfrage im Admin immer pflegbar
Spezifikation – Handwerk Bold
1. Allgemein
Diese Spezifikation gilt ausschließlich für die Branche-Stil-Kombination Handwerk – Bold.
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
•	Referenzen
•	Betrieb
•	Anfrage
________________________________________
3. Globale, seitenübergreifende Elemente
Sticky Notdienst Banner
Dieses Element ist kein normales Seitenmodul, sondern ein globales, seitenübergreifendes Sticky-Element, das auf allen Seiten eingeblendet werden kann.
Es sitzt typischerweise fixiert am unteren Bildschirmrand / in einer Ecke und bleibt beim Scrollen sichtbar.
•	isVisible (Boolean)
•	label (Text)
•	headline (Text, optional)
•	subline (Text, optional)
•	phone (Text)
•	button (Object: Standard-Button)
•	styleVariant (Select: dark | light | accent)
•	position (Select: bottomRight | bottomCenter | bottomBar)
•	showOnDesktop (Boolean)
•	showOnMobile (Boolean)
•	showOnPages (Multi-Select: Start | Leistungen | Referenzen | Betrieb | Anfrage | alle)
•	isCollapsedByDefault (Boolean, optional)
________________________________________
4. Branchenspezifische Standardmuster
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
Für Notdienst, Badsanierung, Heizungsmodernisierung, Solar / PV, Wartung, Smart-Home oder Energieberatung.
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
Projekt-Item
Für Referenzen / Vorher-Nachher-Projekte / abgeschlossene Aufträge.
•	title (Text)
•	category (Text, optional)
•	description (Textarea, optional)
•	image (Image Object)
•	location (Text, optional)
•	year (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
subpage:
•	eyebrow (Text)
•	title (Text)
•	description (Textarea)
•	beforeImages (Repeater, optional)
•	afterImages (Repeater, optional)
•	content (Rich Text Editor)
________________________________________
Team-Item
Für Mitarbeitende / Meister / Projektleitung / Service-Team.
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
Für News-, Notiz- oder redaktionelle Karten.
•	date (Text)
•	title (Text)
•	excerpt (Textarea)
•	image (Image Object)
•	button (Object: Standard-Button, optional)
________________________________________
Qualification-Item
Für Meistertitel, Zertifikate, Mitgliedschaften, Förderkompetenz oder Herstellerpartnerschaften.
•	title (Text)
•	description (Textarea)
•	icon (Image Object, optional)
•	badgeLabel (Text, optional)
•	link (Object: Standard-Button, optional)
________________________________________
Timeline-Item
Für Unternehmensgeschichte.
•	yearOrMarker (Text)
•	title (Text)
•	description (Textarea)
________________________________________
Förderprogramm-Item
Für einzelne Förderbausteine im Förder-Kalkulator.
•	title (Text)
•	description (Textarea)
•	percentage (Number, optional)
•	fixedAmount (Number, optional)
•	isActive (Boolean)
•	isStackable (Boolean)
•	priority (Number, optional)
•	maxAmount (Number, optional)
•	minInvestment (Number, optional)
•	maxInvestment (Number, optional)
•	eligibilityNote (Text, optional)
________________________________________
Marquee-Item
Für Lauftext-Bänder / Schlagwort-Bänder / Social-Proof-Bänder.
•	text (Text)
________________________________________
Quote-Wall-Item
Für Bold-Testimonial-Kompositionen mit Hauptzitat und kleineren Zusatzkarten.
•	quote (Textarea)
•	name (Text, optional)
•	isPrimary (Boolean)
________________________________________
Förder-Kalkulator (Section + Admin-Logik)
Dieses Element ist eine eigene Section und zusätzlich ein fachliches Berechnungsmodul, bei dem im Admin nicht nur Inhalte, sondern auch die Rechenlogik gepflegt werden kann.
Sichtbare Inhalte im Frontend
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	button (Object: Standard-Button, optional)
Nutzersteuerung im Frontend
•	investmentLabel (Text, optional)
•	investmentMin (Number)
•	investmentMax (Number)
•	investmentStep (Number)
•	investmentDefault (Number)
•	currency (Text, Default: EUR)
Ergebnisfelder im Frontend
•	resultGrossLabel (Text)
•	resultFundingLabel (Text)
•	resultNetLabel (Text)
Förderprogramme
•	programs (Repeater)
Pro Programm:
•	title (Text)
•	description (Textarea)
•	percentage (Number, optional)
•	fixedAmount (Number, optional)
•	isActive (Boolean)
•	isStackable (Boolean)
•	priority (Number, optional)
•	maxAmount (Number, optional)
•	minInvestment (Number, optional)
•	maxInvestment (Number, optional)
•	eligibilityNote (Text, optional)
Berechnungslogik im Admin
•	calculationMode (Select: sumAllEligible | highestOnly | priorityBased | customRules)
•	maxTotalFundingPercent (Number, optional)
•	maxTotalFundingAmount (Number, optional)
•	roundingMode (Select: none | round | floor | ceil)
•	roundingStep (Number, optional)
•	showGrossResult (Boolean)
•	showFundingResult (Boolean)
•	showNetResult (Boolean)
Zusätzliche Rechenregeln
•	rules (Repeater, optional)
Pro Regel:
•	ruleName (Text)
•	conditionField (Select: investmentAmount | selectedProgramCount | custom)
•	operator (Select: > | >= | < | <= | = | between)
•	value1 (Number)
•	value2 (Number, optional)
•	effectType (Select: addPercent | addFixed | capPercent | capAmount | excludeProgram | includeProgram)
•	effectValue (Number, optional)
•	targetProgramTitle (Text, optional)
Berechnetes Ergebnis
Standardlogik:
•	Bruttoinvestition = eingegebener Investitionswert
•	Förderung gesamt = Summe aller gültigen Förderbausteine gemäß Regeln
•	Nettoinvestition = Bruttoinvestition minus Förderung gesamt
________________________________________
5. Seite: Start
Die Startseite von Handwerk – Bold ist stark typografisch, kontrastreich und plakativ aufgebaut.
Im Fokus stehen ein übergroßes Hero, ein Schlagwortband, ein großes Bild, eine dunkle Leistungsliste, der Förder-Kalkulator, ein großes Akzentmodul, Referenzen, Kennzahlen, Story, Social Proof, News und ein kontraststarker Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
Obere schmale Infoleiste mit Öffnungszeiten, Notdienst, Festpreis-Garantie, Förderberatung oder Meisterbetrieb-Hinweisen.
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Sehr großes Bold-Hero mit stark typografischer Headline, kurzem Introtext und primärem CTA.
•	eyebrow (Text)
•	headline (Text)
•	subline (Text, optional)
•	description (Textarea, optional)
•	buttonPrimary (Object: Standard-Button)
•	backgroundImage (Image Object, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
Globales Sticky-Element, auf dieser Seite standardmäßig aktiv.
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Marquee-Band
Horizontales Schlagwort-Band direkt nach dem Hero.
•	type = marqueeBand
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Large Image Stage
Große Bildfläche unter dem Marquee-Band.
•	type = featureImage
•	isVisible (Boolean)
•	image (Image Object)
•	caption (Text, optional)
________________________________________
Utility-Bar / Info-Leiste
Schmale Leiste mit Status, Hinweis und Schnellaktion.
•	type = actionBar
•	isVisible (Boolean)
•	statusLabel (Text, optional)
•	statusText (Text, optional)
•	infoText (Text, optional)
•	buttonPrimary (Object: Standard-Button, optional)
•	buttonSecondary (Object: Standard-Button, optional)
________________________________________
Leistungsliste / Dark Service List
Dunkle, kontrastreiche Leistungsübersicht mit linearer Listenstruktur statt Kartenraster.
•	type = serviceList
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	button (Object: Standard-Button, optional)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object, optional)
•	price (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Förder-Kalkulator
Pflegbarer Förderrechner mit Admin-Logik.
•	type = fundingCalculator
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	investmentLabel (Text, optional)
•	investmentMin (Number)
•	investmentMax (Number)
•	investmentStep (Number)
•	investmentDefault (Number)
•	resultGrossLabel (Text)
•	resultFundingLabel (Text)
•	resultNetLabel (Text)
•	programs (Repeater)
•	calculationMode (Select)
•	maxTotalFundingPercent (Number, optional)
•	maxTotalFundingAmount (Number, optional)
•	roundingMode (Select)
•	roundingStep (Number, optional)
•	rules (Repeater, optional)
•	button (Object: Standard-Button, optional)
________________________________________
Accent Topic Band
Großes Akzentmodul mit starker Headline und kompakten aktuellen Themen / Leistungen.
•	type = topicBand
•	isVisible (Boolean)
•	backgroundStyle (Select: accentPink | dark | light)
•	headline (Text)
•	subline (Textarea, optional)
•	phone (Text, optional)
•	items (Repeater, empfohlen 3 bis 5)
Pro Eintrag:
•	title (Text)
•	meta (Text, optional)
•	description (Text, optional)
________________________________________
Projekt-Galerie-Vorschau
Bildstarkes Referenzmodul mit unregelmäßigem Grid.
•	type = galleryPreview
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	button (Object: Standard-Button, optional)
•	images (Repeater, empfohlen 6 bis 8)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
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
Story-Statement
Kurze, markante Unternehmens- / Handwerks-Statement-Section.
•	type = storySplit
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
•	button (Object: Standard-Button, optional)
________________________________________
Testimonial-Marquee
Horizontales Social-Proof-Band mit wiederholten Schlagworten.
•	type = testimonialMarquee
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Quote-Wall
Bold-Testimonial-Section mit einem größeren Hauptzitat und ergänzenden kleineren Karten.
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
6. Seite: Leistungen
Die Leistungsseite von Handwerk – Bold setzt auf eine sehr große Hero-Typografie, eine horizontale Nutzenleiste, eine lineare Service-Liste, den Förder-Kalkulator, Schritte, FAQ und eine große Abschluss-CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit markanter Headline und kurzem Introtext.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
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
Vertikale Service-Liste mit Bild links, großem Titel, Beschreibung und Preis / Badge rechts.
•	type = serviceList
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	subtitle (Text, optional)
•	description (Textarea)
•	image (Image Object)
•	price (Text, optional)
•	button (Object: Standard-Button, optional)
•	hasSubpage (Boolean)
•	subpage (Object)
________________________________________
Förder-Kalkulator
•	type = fundingCalculator
•	isVisible (Boolean)
•	alle Felder wie im Standardmuster Förder-Kalkulator
________________________________________
Schritte
Vier Schritte von Anfrage bis Ausführung.
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
7. Seite: Referenzen
Die Referenzen-Seite ist im Bold-Stil plakativ, aber strukturiert aufgebaut: großes Hero, Intro mit Themenkarten, Galerie, Kategoriekarten und CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit plakativ gesetzter Headline und kurzem Intro.
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
Intro mit Themenkarten
Text links, kurze Karten rechts.
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
Großes unregelmäßiges Bild-Grid mit Referenzfotos.
•	type = gallery
•	isVisible (Boolean)
•	lightboxEnabled (Boolean, Default: true)
•	images (Repeater)
Pro Eintrag:
•	image (Image Object)
•	alt (Text, optional)
________________________________________
Kategorien-Karten
Kartenreihe mit Tätigkeitsbereichen.
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
8. Seite: Betrieb
Die Betriebsseite von Handwerk – Bold ist die plakative About-Seite.
Sie kombiniert ein sehr großes Hero, Story mit Bild, Grundsätze, Timeline, Team, Kennzahlen, Qualifikationen / geprüft & zertifiziert, Testimonials und CTA.
________________________________________
Feste Sections
Hinweisbanner
•	isVisible (Boolean)
•	items (Repeater)
Pro Eintrag:
•	text (Text)
________________________________________
Hero
Großes Bold-Hero mit sehr markanter, mehrzeiliger Headline.
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
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
Zeitstrahl zur Firmengeschichte.
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
Qualifikationen / Geprüft & zertifiziert
Zusätzliche Bold-Karten-Section für Prüfzeichen, Mitgliedschaften, Zertifikate und Herstellerkompetenz.
•	type = qualifications
•	isVisible (Boolean)
•	eyebrow (Text)
•	headline (Text)
•	description (Textarea, optional)
•	items (Repeater)
Pro Eintrag:
•	title (Text)
•	description (Textarea)
•	icon (Image Object, optional)
•	badgeLabel (Text, optional)
•	link (Object: Standard-Button, optional)
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
9. Seite: Anfrage
Die Anfrage-Seite von Handwerk – Bold nutzt eine sehr große typografische Hero-Fläche und kombiniert Kontaktdaten, Formular, Karte, Wegbeschreibung und CTA.
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
Sehr große Kontakt- / Anfrage- / Notdienst-Headline im Bold-Stil.
•	eyebrow (Text)
•	headline (Text)
•	subline (Textarea, optional)
________________________________________
Standardmäßig enthaltene modulare Sections
Sticky Notdienst Banner
•	type = stickyEmergencyBanner
•	usesGlobalConfig = true
________________________________________
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
Kartenreihe für Notdienst, Anfahrtsgebiet, Vor-Ort-Beratung oder Bereitschaftshinweise.
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
10. Branchenspezifische Besonderheiten Handwerk – Bold
Im Unterschied zu Handwerk – Klassisch und Handwerk – Modern ist Handwerk – Bold deutlich stärker typografiegetrieben, kontrastreicher und plakativ inszeniert.
Typische Merkmale dieser Stil-Kombination sind:
•	sehr große, plakative Hero-Headlines
•	stärkere Arbeit mit Versalien und markanter Typografie
•	horizontale Marquee-Bänder mit Schlagworten oder Vertrauensbegriffen
•	lineare Service-Liste statt Karten-Grid auf der Leistungsseite
•	kontrastreiche Akzentflächen für aktuelle Themen und CTAs
•	stärkere Editorial-Anmutung in Story- und Testimonial-Modulen
•	großes Social-Proof-Band / Testimonial-Marquee
•	Kontaktseite mit sehr großem typografischem Einstieg
•	gleiche fachliche Sonderlogik wie bei den anderen Handwerk-Varianten: 
o	Sticky Notdienst Banner global
o	Förder-Kalkulator mit Admin-Berechnungslogik
o	Qualifikationen / geprüft & zertifiziert auf Betrieb
o	weitere Standorte auf Anfrage im Admin immer pflegbar

