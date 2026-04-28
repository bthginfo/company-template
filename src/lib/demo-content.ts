import { SiteContentSchema, type SiteContent } from './types';

/**
 * Demo content for the showcase preview pages.
 */
export const DEMO_CONTENT: Record<'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism', SiteContent> = {
  restaurant: SiteContentSchema.parse({
    brand: {
      name: 'Trattoria Innsbruck',
      tagline: 'Cucina d\'Autore · Seit 1998',
      primaryColor: '#9a3412',
    },
    hero: {
      title: 'Italien beginnt am ersten Bissen.',
      subtitle: 'Pasta, Pizza, Naturweine – seit 1998 in Innsbruck.',
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Tisch reservieren',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Drei Generationen, ein Versprechen.',
      body: '1998 eröffneten Nonna Carla und Nonno Antonio diese Trattoria mit einem einzigen Anspruch: Italien so zu zeigen, wie sie es kennen.\n\nHeute kocht ihre Enkelin Giulia – mit denselben Rezepten, denselben Lieferanten und derselben Liebe.\n\nUnsere Pasta wird täglich frisch aufgezogen. Unser Mehl kommt aus einer Mühle in Südtirol. Unser Olivenöl von einem Familienbetrieb in Apulien, den wir jedes Jahr besuchen.',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80',
    },
    services: [
      { title: 'Tagliatelle al Tartufo', description: 'Hausgemachte Tagliatelle, schwarzer Sommertrüffel aus Umbrien, gehobelter Parmigiano 24 Mesi.', price: '24,90 €', imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80' },
      { title: 'Pizza Margherita DOP', description: 'San-Marzano-Tomaten, Büffelmozzarella, frisches Basilikum, 48-h-Teigführung im Steinofen gebacken.', price: '14,50 €', imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80' },
      { title: 'Saltimbocca alla Romana', description: 'Kalbsfilet, Parmaschinken DOP, frischer Salbei, Weißwein-Jus.', price: '28,50 €', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80' },
      { title: 'Tiramisu della Nonna', description: 'Klassisch nach Carlas Originalrezept – Mascarpone, Espresso, Marsala.', price: '8,90 €', imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80' },
      { title: 'Risotto ai Funghi', description: 'Carnaroli aus dem Piemont, Steinpilze, Trüffelöl, Crème von Pecorino.', price: '22,50 €', imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80' },
      { title: 'Branzino al Forno', description: 'Wolfsbarsch in der Salzkruste, Zitrone, Rosmarin, sizilianisches Olivenöl.', price: '32,00 €', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80' },
      { title: 'Antipasti della Casa', description: 'Eine Auswahl aus dem Markt – Parmaschinken, Burrata, eingelegtes Gemüse, Crostini.', price: '18,50 €', imageUrl: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=900&q=80' },
      { title: 'Pasta del Giorno', description: 'Tagesgericht aus der Pasta-Manufaktur. Die Karte hängt im Eingang.', price: '19,80 €', imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80' },
      { title: 'Cantucci & Vin Santo', description: 'Toskanisches Mandelgebäck, dazu ein Glas Vin Santo zum Eintunken.', price: '7,50 €', imageUrl: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    ],
    testimonials: [
      { author: 'Sabine M., Innsbruck', text: 'Die beste Pasta außerhalb Italiens. Atmosphäre wie bei der eigenen Familie – wir kommen jede Woche.' },
      { author: 'Markus W., München', text: 'Ein Geheimtipp. Wir machen extra einen Umweg, wenn wir in Tirol sind. Beste Pizza der Stadt.' },
      { author: 'Familie Berger', text: 'Tolles Essen, herzliche Bedienung, fairer Preis. Unsere Kinder lieben Giulia.' },
      { author: 'Andrea L., Bozen', text: 'Authentisch wie selten in Österreich. Der Trüffel-Tagliatelle ist legendär.' },
    ],
    contact: {
      phone: '+43 512 123 4567',
      email: 'reservierung@trattoria-innsbruck.at',
      address: 'Maria-Theresien-Straße 42',
      city: '6020 Innsbruck',
      hours: [
        { day: 'Mo – Fr', time: '11:30 – 14:00 · 17:30 – 22:00' },
        { day: 'Samstag', time: '17:30 – 23:00' },
        { day: 'Sonntag', time: 'Ruhetag' },
      ],
      mapsUrl: 'https://www.google.com/maps?q=Maria-Theresien-Stra%C3%9Fe+42,+6020+Innsbruck&output=embed',
    },
    social: {
      instagram: 'trattoria.innsbruck',
      facebook: 'trattoriainnsbruck',
    },
  }),

  salon: SiteContentSchema.parse({
    brand: {
      name: 'Studio Lumière',
      tagline: 'Hair · Skin · Soul',
      primaryColor: '#be185d',
    },
    hero: {
      title: 'Ihr Look. Unser Handwerk.',
      subtitle: 'Boutique-Salon in München-Schwabing – Pflege als Kunst.',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Termin buchen',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Salon. Studio. Sanctuary.',
      body: 'Studio Lumière wurde 2017 von Marie Hofer gegründet – mit der Idee, einen Salon zu schaffen, der mehr ist als ein Friseur.\n\nHeute arbeiten sechs Stylist:innen mit Stationen in Paris, London und New York. Wir sind Education-Partner von Kérastase und Olaplex und veranstalten regelmäßig Hair-Education-Days.\n\nUnser Ansatz: ehrliche Beratung, individuelle Kreation, nachhaltige Pflege. Wir glauben nicht an „one size fits all". Wir glauben an Ihren Look.',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80',
    },
    services: [
      { title: 'Damen-Schnitt inkl. Wäsche & Styling', description: 'Persönliche Beratung, individueller Schnitt, ausführliche Beratung zu Pflege & Styling zuhause.', price: '65 €', imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80' },
      { title: 'Herren-Schnitt', description: 'Klassisch oder modern. Bartpflege auf Wunsch. Inkl. Wäsche und Styling.', price: '38 €', imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80' },
      { title: 'Färben & Strähnen', description: 'Pflanzliche oder ammoniakfreie Farben. Hand-painted Highlights. Beratung zur Pflege inklusive.', price: 'ab 89 €', imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=80' },
      { title: 'Balayage & Air Touch', description: 'Weiche Farbverläufe nach französischer Schule – dezent oder ausdrucksstark.', price: 'ab 145 €', imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80' },
      { title: 'Maniküre Shellac', description: 'Hochglanz-Finish, bis zu 3 Wochen haltbar. Inkl. Pflege und Massage.', price: '45 €', imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80' },
      { title: 'Augenbrauen-Styling', description: 'Form, Pflanzenfarbe, Pflege. Inklusive Beratung zur Tagespflege.', price: '28 €', imageUrl: 'https://images.unsplash.com/photo-1583241475880-083f84372725?auto=format&fit=crop&w=900&q=80' },
      { title: 'Hair-Spa Ritual', description: 'Tiefenpflege mit Kérastase-Produkten, Kopfhaut-Massage, anschließend Föhn & Styling.', price: '95 €', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80' },
      { title: 'Braut-Styling', description: 'Probestyling + Tag der Hochzeit. Inkl. Make-up-Anbindung an unser Partnerstudio.', price: 'ab 240 €', imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1554519515-242161756769?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80',
    ],
    testimonials: [
      { author: 'Lisa K., München', text: 'Endlich ein Salon, dem ich zu 100 % vertraue. Die Beratung war ehrlich und das Ergebnis übertrifft jeden meiner früheren Friseure.' },
      { author: 'Andrea P.', text: 'Atmosphäre wie ein Spa. Marie und ihr Team sind absolute Profis – und obendrein einfach nette Menschen.' },
      { author: 'Carolina B.', text: 'Mein Balayage hält seit 4 Monaten und sieht immer noch frisch aus. Hier bleibe ich.' },
    ],
    contact: {
      phone: '+49 89 1234 5678',
      email: 'hello@studio-lumiere.de',
      address: 'Leopoldstraße 28',
      city: '80802 München',
      hours: [
        { day: 'Di – Fr', time: '09:00 – 19:00' },
        { day: 'Samstag', time: '09:00 – 15:00' },
        { day: 'So + Mo', time: 'Geschlossen' },
      ],
      mapsUrl: 'https://www.google.com/maps?q=Leopoldstra%C3%9Fe+28,+80802+M%C3%BCnchen&output=embed',
    },
    social: {
      instagram: 'studio.lumiere.muc',
      facebook: 'studiolumieremunich',
    },
  }),

  tradesman: SiteContentSchema.parse({
    brand: {
      name: 'Mayer & Söhne',
      tagline: 'Meisterbetrieb seit 1972',
      primaryColor: '#1d4ed8',
    },
    hero: {
      title: 'Schnell. Sauber. Verlässlich.',
      subtitle: 'Sanitär & Heizung in Meisterhand – 60 Min. vor Ort, Festpreis, drei Generationen Erfahrung.',
      imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Kostenlos anfragen',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Drei Generationen Handwerk.',
      body: 'Was 1972 als kleiner Familienbetrieb in Ingolstadt begann, ist heute ein moderner Meisterbetrieb mit 18 Mitarbeiter:innen und drei Servicewagen.\n\nWir glauben an ehrliche Arbeit, faire Preise und Lösungen, die halten – nicht an Verkaufsdruck.\n\nUnsere Kunden sind Privathaushalte in Ingolstadt und Umgebung, Architekturbüros und Hausverwaltungen. Über 65 % unserer Aufträge kommen von Empfehlungen.',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1400&q=80',
    },
    services: [
      { title: 'Notdienst & Reparaturen', description: 'Rohrbruch, Heizungsausfall, verstopfte Leitung – wir sind in 60 Minuten bei Ihnen. 24/7, auch am Wochenende.', price: 'ab 79 €', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80' },
      { title: 'Badsanierung', description: 'Komplettsanierung mit eigener Planung, 3D-Visualisierung und Festpreis-Garantie. Inkl. Bodenleger & Fliesenleger.', price: 'auf Anfrage', imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80' },
      { title: 'Heizungsmodernisierung', description: 'Wärmepumpe, Pellets, Hybrid, Brennwert. Wir beraten Sie ehrlich zu Förderungen (KfW & BAFA).', price: 'auf Anfrage', imageUrl: 'https://images.unsplash.com/photo-1604061986761-d9d0cc41b0d1?auto=format&fit=crop&w=900&q=80' },
      { title: 'Solarthermie & Photovoltaik', description: 'Komplettpaket inkl. Anmeldung beim Netzbetreiber, Inbetriebnahme und 2 Jahre Wartung.', price: 'auf Anfrage', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80' },
      { title: 'Wartung & Service', description: 'Jährliche Wartung Ihrer Heizung – inkl. Sicherheitsprüfung. Wir erinnern Sie automatisch.', price: 'ab 149 €', imageUrl: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80' },
      { title: 'Smart-Home-Steuerung', description: 'Heizung, Wasser und Lüftung intelligent gesteuert per App – kompatibel mit Apple Home & KNX.', price: 'auf Anfrage', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80' },
      { title: 'Energieberatung', description: 'Vor-Ort-Termin, Bestandsanalyse, schriftlicher Bericht mit Fördermöglichkeiten.', price: 'ab 290 €', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=900&q=80',
    ],
    testimonials: [
      { author: 'Familie Huber, Ingolstadt', text: 'Termin pünktlich eingehalten, Preis exakt wie im Angebot. Selten so professionell erlebt – ehrliche Arbeit von ehrlichen Menschen.' },
      { author: 'Stefan G., Manching', text: 'Rohrbruch um 22 Uhr – um Mitternacht war alles trocken und repariert. Klare Empfehlung.' },
      { author: 'Bauunternehmen Wagner', text: 'Verlässlicher Partner für unsere Bauprojekte seit Jahren. Kommt immer zum vereinbarten Termin.' },
      { author: 'Annette R.', text: 'Komplette Badsanierung in 12 Tagen. Sauber, freundlich, transparente Kommunikation. Top.' },
    ],
    contact: {
      phone: '+49 841 9876 543',
      email: 'info@mayer-soehne.de',
      address: 'Schulstraße 14',
      city: '85049 Ingolstadt',
      hours: [
        { day: 'Mo – Fr', time: '07:00 – 17:00' },
        { day: 'Notdienst', time: '24 / 7' },
      ],
      mapsUrl: 'https://www.google.com/maps?q=Schulstra%C3%9Fe+14,+85049+Ingolstadt&output=embed',
    },
    social: {
      whatsapp: '+498419876543',
    },
  }),

  hotel: SiteContentSchema.parse({
    brand: {
      name: 'Hotel Bergkristall',
      tagline: 'Boutique-Hotel · Tirol · Seit 1956',
      primaryColor: '#92400e',
    },
    hero: {
      title: 'Ankommen, durchatmen, bleiben.',
      subtitle: '34 Zimmer, ein Spa, drei Generationen Gastgeber.',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Zimmer anfragen',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Mehr Hotelier, weniger Hotel-Kette.',
      body: 'Das Bergkristall ist ein Familienbetrieb in dritter Generation. Großvater Anton hat 1956 angefangen mit zwölf Zimmern, einer Sennhütte und einer Idee von Gastfreundschaft, die nicht im Standardhandbuch steht.\n\nHeute führen wir 34 Zimmer und Suiten – jedes anders, jedes mit echtem Holz, lokalen Stoffen und einer Aussicht, für die wir nichts können (außer dankbar sein). Unser Spa ist klein, ruhig und nicht für Bus-Gruppen.\n\nWir kochen mit Produzent:innen aus einem Umkreis von 60 Kilometern. Wir kennen ihre Vornamen.',
      imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80',
    },
    services: [
      { title: 'Zimmer & Suiten', description: '18 Zimmer, 12 Junior-Suiten, 4 Panorama-Suiten – alle mit Balkon, alle nicht zur Strasse. Ab 189 € / Nacht.', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80' },
      { title: 'Spa & Pool', description: '20-Meter Innenpool, Finnische Sauna, Bio-Sauna, Dampfbad, Ruheraum mit Bergblick. Massagen auf Anfrage.', imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80' },
      { title: 'Restaurant & Bar', description: 'Drei-Hauben-Küche von Sebastian Berger. Sechs-Gang-Menü, à la carte oder Bar-Snacks bis 23 Uhr.', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80' },
      { title: 'Tagungen & Events', description: 'Zwei Tagungsräume bis 40 Personen, Hochzeitssaal bis 80, exklusive Buchung des ganzen Hauses möglich.', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80' },
      { title: 'Bergführer & Aktivprogramm', description: 'Geführte Wanderungen, Mountainbike-Touren, Skitourenkurse, Yoga am Berg – im Sommer wie Winter.', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80' },
      { title: 'Frühstück & Halbpension', description: 'Frühstück bis 11 Uhr, Halbpensions-Aufpreis 49 €. Ja, mit hausgemachten Marillenknödeln.', imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80',
    ],
    testimonials: [
      { author: 'Familie Hauser, Hamburg', text: 'Wir kommen seit acht Jahren. Das Personal kennt unsere Kinder beim Namen, das Frühstück ist eine Liebeserklärung an den Tag.' },
      { author: 'Lina B., Berlin', text: 'Spa-Aufenthalt zum Geburtstag. Drei Tage komplett offline, am vierten wollte ich nicht mehr weg. 12 / 10.' },
      { author: 'Patrick W., München', text: 'Tagung mit 28 Personen perfekt organisiert. Technik, Pausen, Abendessen – alles saß. Kommen wieder.' },
    ],
    contact: {
      phone: '+43 5234 5678 0',
      email: 'willkommen@hotel-bergkristall.at',
      address: 'Dorfstraße 8',
      city: '6080 Igls bei Innsbruck',
      hours: [
        { day: 'Rezeption', time: '24/7' },
        { day: 'Restaurant', time: '12:00 – 14:30 · 18:30 – 22:00' },
      ],
      mapsUrl: 'https://www.google.com/maps?q=Igls+Innsbruck&output=embed',
    },
    social: {
      instagram: 'hotel.bergkristall',
      facebook: 'hotelbergkristall',
    },
  }),

  tourism: SiteContentSchema.parse({
    brand: {
      name: 'Alpenroute Tirol',
      tagline: 'Geführte Touren · Erlebnisse · Tirol',
      primaryColor: '#0369a1',
    },
    hero: {
      title: 'Tirol, wie es Einheimische sehen.',
      subtitle: 'Kleine Gruppen, lokale Guides, echte Begegnungen.',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Tour finden',
      ctaHref: '/leistungen',
    },
    about: {
      title: 'Reisen mit Tiefe statt Tempo.',
      body: 'Alpenroute Tirol wurde 2014 von Bergführer Lukas Kofler gegründet, mit der Idee, Reisen anzubieten, die er selbst buchen würde – kein Mainstream-Programm, keine Touristen-Bullets.\n\nUnser Team aus 14 Guides spricht fünf Sprachen, alle leben in Tirol oder Südtirol. Wir arbeiten ausschließlich mit lokalen Hütten, Winzer:innen und Familienbetrieben. Jede Tour ist auf maximal acht Gäste begrenzt.\n\nWir nehmen uns Zeit. Eine Tagestour dauert acht Stunden, nicht vier. Eine Mehrtagestour endet, wenn die Geschichten erzählt sind, nicht der Bus losfährt.',
      imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=80',
    },
    services: [
      { title: 'Tagestouren Tirol', description: 'Achensee-Umrundung, Zugspitze-Klettersteig, Pitztaler Gletscher. Inkl. Lunchpaket vom Hofladen. Ab 89 €.', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80' },
      { title: 'Mehrtages-Touren Dolomiten', description: 'Drei bis sieben Tage durch UNESCO-Welterbe, Übernachtung in Hütten oder Boutique-Hotels. Ab 690 €.', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80' },
      { title: 'Wein- & Genuss-Touren', description: 'Vinschgau, Eisacktal, Kalterer See. Drei Weingüter, ein Mittagessen, Gespräche mit Produzent:innen. 169 €.', imageUrl: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=900&q=80' },
      { title: 'Foto- & Naturworkshops', description: 'Sonnenaufgang am Karwendel, Astrofotografie auf der Zugspitze. Mit Fotograf Markus Eder.', imageUrl: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=900&q=80' },
      { title: 'Privat- & Firmen-Tours', description: 'Maßgeschneiderte Tagesprogramme für Gruppen bis 12 Personen. Incentives, Teamtage, Hochzeitsausflüge.', imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80' },
      { title: 'Winter-Erlebnisse', description: 'Skitourenkurse, Schneeschuh-Wanderung mit Fackeln, Eisklettern für Anfänger. Zertifizierte Berg-Guides.', imageUrl: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1486162928267-e6274cb3106f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1444930694458-01babe71870e?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1400&q=80',
    ],
    testimonials: [
      { author: 'Anna & Tom, Hamburg', text: 'Drei Tage Dolomiten mit Lukas. Wir haben mehr gelernt als in zwei Italien-Urlauben zusammen. Klare Empfehlung.' },
      { author: 'Christine R., Wien', text: 'Wein-Tour im Vinschgau – kein Standard-Programm, sondern echte Begegnungen mit Winzer:innen. Großartig.' },
      { author: 'Boris N., Berlin', text: 'Foto-Workshop am Karwendel: kompetent, geduldig, mit Auge für Details. Der Sonnenaufgang werde ich nicht vergessen.' },
    ],
    contact: {
      phone: '+43 512 87 65 43',
      email: 'tour@alpenroute.tirol',
      address: 'Maria-Theresien-Straße 12',
      city: '6020 Innsbruck',
      hours: [
        { day: 'Mo – Fr', time: '09:00 – 18:00' },
        { day: 'Sa', time: '10:00 – 14:00' },
      ],
      mapsUrl: 'https://www.google.com/maps?q=Innsbruck&output=embed',
    },
    social: {
      instagram: 'alpenroute.tirol',
    },
  }),
};

/**
 * Showcase-only content for branches that don't have a full template yet.
 * Rendered by AgencyShowcase' `ExtraBranchTemplate` (single-page showcase).
 */
export const EXTRA_DEMO_CONTENT = {
  consulting: SiteContentSchema.parse({
    brand: {
      name: 'Hofer & Partner',
      tagline: 'Strategie · Steuern · Recht',
      primaryColor: '#1e3a8a',
    },
    hero: {
      title: 'Kluge Entscheidungen brauchen klare Köpfe.',
      subtitle: 'Steuer, Strategie, Recht – ehrlich beraten seit 1994.',
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Erstgespräch vereinbaren',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Drei Generationen Vertrauen.',
      body: 'Hofer & Partner wurde 1994 von Dr. Klaus Hofer in München gegründet – mit dem Anspruch, mittelständischen Unternehmen einen Berater an die Seite zu stellen, der zuhört, statt zu verkaufen.\n\nHeute betreuen wir über 180 Mandate aus Industrie, Handel und Familienunternehmen. Unser Team aus 22 Berater:innen, Steuerberater:innen und Anwält:innen bringt Erfahrung aus DAX-Konzernen, Kanzleien und eigenen Unternehmen mit.\n\nWir glauben an Beratung als Beziehung. Daher arbeiten wir nur mit Mandanten, denen wir auf Augenhöhe begegnen können.',
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=80',
    },
    services: [
      { title: 'Strategie- & Geschäftsmodell-Beratung', description: 'Marktanalyse, Positionierung, Wachstumspfade. Mit klaren KPIs und ehrlichen Annahmen.', imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=80' },
      { title: 'Steuerberatung & Jahresabschluss', description: 'Laufende Buchhaltung, Bilanz, Steuererklärungen, Betriebsprüfungen. Voll digital, transparent abrechenbar.', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80' },
      { title: 'Gesellschaftsrecht & M&A', description: 'Gründung, Umwandlung, Beteiligung, Kauf und Verkauf. Mit hauseigenem juristischen Team.', imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80' },
      { title: 'Nachfolge & Generationenwechsel', description: 'Vom ersten Gespräch bis zur Übergabe. Inklusive Bewertung, Steuergestaltung und Familien-Mediation.', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80' },
      { title: 'Compliance & ESG', description: 'Pragmatische Umsetzung von LkSG, CSRD, Datenschutz. Wir machen es einfach – nicht komplizierter.', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80' },
      { title: 'Interim CFO & Controlling', description: 'Wenn es schnell gehen muss: erfahrene CFOs auf Zeit, Reporting-Aufbau, Liquiditätsplanung.', imageUrl: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
    ],
    testimonials: [
      { author: 'Dr. Maria Wallner, CEO Wallner Industries', text: 'Hofer & Partner haben uns durch eine komplexe Nachfolge geführt – ruhig, klug und mit echtem Verständnis für unsere Familie.' },
      { author: 'Andreas Reiter, Reiter GmbH', text: 'Seit 12 Jahren unsere Steuerberater. Reaktionszeit unter 24 Stunden, immer ein klarer Plan, nie Bauchgefühl.' },
      { author: 'Familie Brunner, Brunner Holding', text: 'Beratung auf Augenhöhe. Wir wurden nie etwas verkauft, was wir nicht brauchten.' },
    ],
    contact: {
      phone: '+49 89 22 333 444',
      email: 'kontakt@hofer-partner.de',
      address: 'Maximilianstraße 24',
      city: '80539 München',
      hours: [
        { day: 'Mo – Fr', time: '09:00 – 18:00' },
        { day: 'Termine', time: 'nach Vereinbarung' },
      ],
      mapsUrl: '',
    },
    social: {
      linkedin: 'hofer-partner',
    },
  }),

  medical: SiteContentSchema.parse({
    brand: {
      name: 'Praxis Dr. Lindner',
      tagline: 'Allgemeinmedizin · Naturheilverfahren',
      primaryColor: '#0e7490',
    },
    hero: {
      title: 'Medizin, die Zeit hat.',
      subtitle: 'Hausärztliche Praxis in Innsbruck – 30 Min. pro Termin.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Termin online vereinbaren',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Eine Praxis, die zuhört.',
      body: 'Dr. med. Lena Lindner gründete diese Praxis 2019 mit einem klaren Anspruch: jedem Patienten genug Zeit zu geben.\n\nUnser Termintaktung ist 30 Minuten – nicht 7 wie im Schnitt. Wir arbeiten mit zwei Ärztinnen, zwei MTAs und einem Praxismanager. Erstgespräche sind ausführlich und kostenfrei nach Terminbuchung.\n\nNeben der hausärztlichen Versorgung bieten wir Akupunktur, Ernährungsmedizin und Mikronährstoff-Therapie als ergänzende Verfahren – alles evidenzbasiert.',
      imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=80',
    },
    services: [
      { title: 'Hausärztliche Versorgung', description: 'Vorsorge, Akut-Sprechstunde, chronische Erkrankungen, DMP-Programme – mit Zeit und Sorgfalt.', imageUrl: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=900&q=80' },
      { title: 'Vorsorge & Check-up', description: 'Großer Gesundheits-Check inkl. Labor, EKG, Lungenfunktion, persönliches Auswertungsgespräch.', imageUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=900&q=80' },
      { title: 'Akupunktur & TCM', description: 'Klassische Körper-Akupunktur, Ohrakupunktur, Schröpfen – nach individueller Diagnose.', imageUrl: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=900&q=80' },
      { title: 'Ernährungs- & Mikronährstoffmedizin', description: 'Laborgestützte Analyse, individuelle Supplementierung, Ernährungsberatung über 6 Monate.', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80' },
      { title: 'Reisemedizin & Impfungen', description: 'Reiseberatung, Tropenimpfungen, Gelbfieber-Impfstelle. Auch kurzfristig möglich.', imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80' },
      { title: 'Privatleistungen (IGeL)', description: 'Transparente Preisliste, ehrliche Empfehlung – wir verkaufen nur, was sinnvoll ist.', imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631217872822-1c2546d6b864?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1666886573301-b5d526cfd518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    ],
    testimonials: [
      { author: 'Margit S., Innsbruck', text: 'Endlich eine Ärztin, die zuhört. 30 Minuten Erstgespräch – das gab es bei meinem alten Arzt nie.' },
      { author: 'Familie Pichler', text: 'Unsere ganze Familie ist dort. Termine immer pünktlich, freundliches Team, ehrliche Beratung.' },
      { author: 'Robert N.', text: 'Akupunktur hat meine Migräne deutlich reduziert. Frau Dr. Lindner nimmt Beschwerden ernst.' },
    ],
    contact: {
      phone: '+43 512 55 66 77',
      email: 'praxis@dr-lindner.at',
      address: 'Falkstraße 18',
      city: '6020 Innsbruck',
      hours: [
        { day: 'Mo, Di, Do', time: '08:00 – 18:00' },
        { day: 'Mi, Fr', time: '08:00 – 13:00' },
        { day: 'Termine', time: 'online via Doctolib' },
      ],
      mapsUrl: '',
    },
    social: {
      instagram: 'praxis.lindner',
    },
  }),

  fitness: SiteContentSchema.parse({
    brand: {
      name: 'Studio Anima',
      tagline: 'Yoga · Pilates · Mindful Movement',
      primaryColor: '#9333ea',
    },
    hero: {
      title: 'Bewegung, die wieder bei Ihnen ankommt.',
      subtitle: 'Kleines Studio, max. 8 pro Kurs – Yoga, Pilates, Mindful Movement.',
      imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Probetraining buchen',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Klein. Persönlich. Konsequent.',
      body: 'Studio Anima wurde 2021 von Sarah Berg gegründet – nach 12 Jahren als Yogalehrerin in Berlin und Lissabon.\n\nUnsere Idee: kleine Klassen, in denen die Lehrer:innen jede Person sehen, jede Korrektur möglich ist und niemand sich zwischen 30 anderen verliert.\n\nWir arbeiten mit fünf festangestellten Lehrer:innen, jeder mit über 500 Stunden Ausbildung. Unser Studio ist FSC-zertifiziertes Holz, Tageslicht, Pflanzen und ein eigener Tee-Bereich.',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80',
    },
    services: [
      { title: 'Vinyasa Flow', description: 'Dynamisches Yoga im Atemrhythmus. Für alle, die Bewegung lieben. 75 Minuten.', price: 'ab 22 €', imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80' },
      { title: 'Yin Yoga', description: 'Lange gehaltene, ruhige Positionen. Tiefe Faszien-Arbeit. Perfekt nach langen Arbeitstagen. 60 Minuten.', price: 'ab 22 €', imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=900&q=80' },
      { title: 'Reformer Pilates', description: 'Kleingruppen mit max. 5 Personen am Reformer. Präzise Korrekturen, klare Progression.', price: 'ab 32 €', imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80' },
      { title: 'Mindful Movement', description: 'Eine Mischung aus Yoga, Somatics und Atemarbeit. Ideal für Anfänger:innen und Wiedereinsteiger:innen.', price: 'ab 22 €', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80' },
      { title: 'Personal Training', description: '60 oder 90 Minuten – ganz auf Sie zugeschnitten. Inkl. Bewegungs-Analyse und Trainingsplan.', price: 'ab 95 €', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80' },
      { title: 'Workshops & Retreats', description: 'Monatliche Workshops, jährliches Retreat im Allgäu. Themen u. a. Atem, Anatomie, Meditation.', imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1620207418302-439b387441b0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593164842264-854604db2260?auto=format&fit=crop&w=900&q=80',
    ],
    testimonials: [
      { author: 'Julia W., München', text: 'Endlich ein Studio, in dem ich nicht in der Masse verschwinde. Sarah und ihr Team sind wirklich präsent.' },
      { author: 'Tom B.', text: 'Reformer Pilates hat meinen Rücken in 3 Monaten verändert. Hier weiß man, was man tut.' },
      { author: 'Marie L.', text: 'Atmosphäre wie in einem ruhigen Wohnzimmer. Ich komme jede Woche – das ist meine Insel.' },
    ],
    contact: {
      phone: '+49 89 44 55 66',
      email: 'hello@studio-anima.de',
      address: 'Pestalozzistraße 9',
      city: '80469 München',
      hours: [
        { day: 'Mo – Fr', time: '07:00 – 21:00' },
        { day: 'Sa + So', time: '08:30 – 17:00' },
      ],
      mapsUrl: '',
    },
    social: {
      instagram: 'studio.anima.muc',
    },
  }),
} as const satisfies Record<string, SiteContent>;

/* ─────────────────────────────────────────────────────────────────
 * Branch-specific module data — appended onto demo objects so the
 * new Menu/Rooms/Tours/Treatments/Funding/Process/Doctors/Booking/
 * Courses/Packages modules render in the showcase out of the box.
 * Kept here (not inline) to keep the main demo blocks readable.
 * ─────────────────────────────────────────────────────────────── */

// RESTAURANT — Speisekarte mit Kategorien
(DEMO_CONTENT.restaurant as any).menu = [
  {
    category: 'Antipasti',
    description: 'Zum Ankommen, zum Teilen, zum Zeit nehmen.',
    items: [
      { name: 'Bruschetta al Pomodoro', description: 'Hausgebackenes Sauerteigbrot, San-Marzano-Tomaten, Basilikum, Knoblauch.', price: '8,90 €', allergens: 'A, G', tags: ['vegan'] },
      { name: 'Burrata di Andria', description: 'Cremige Burrata DOP, eingelegte Tomaten, Basilikum-Öl, Sauerteigcrostini.', price: '14,50 €', allergens: 'A, G' },
      { name: 'Vitello Tonnato', description: 'Rosa gebratenes Kalb, Thunfisch-Kapern-Creme, Rauke, Zitrone.', price: '16,90 €', allergens: 'D, G, M' },
      { name: 'Antipasti della Casa', description: 'Auswahl aus dem Markt – Parmaschinken, Burrata, Crostini, eingelegtes Gemüse.', price: '18,50 €', allergens: 'A, G' },
    ],
  },
  {
    category: 'Pasta & Risotto',
    description: 'Hausgemacht, täglich frisch aufgezogen.',
    items: [
      { name: 'Tagliatelle al Tartufo', description: 'Frische Tagliatelle, schwarzer Sommertrüffel aus Umbrien, Parmigiano 24 Mesi.', price: '24,90 €', allergens: 'A, C, G', tags: ['Signature'] },
      { name: 'Spaghetti alle Vongole', description: 'Venusmuscheln, Knoblauch, Petersilie, Vermentino.', price: '22,50 €', allergens: 'A, B, R' },
      { name: 'Risotto ai Funghi', description: 'Carnaroli aus dem Piemont, Steinpilze, Trüffelöl, Pecorino-Crème.', price: '22,50 €', allergens: 'G, L', tags: ['vegetarisch'] },
      { name: 'Pasta del Giorno', description: 'Tagesempfehlung aus der Pasta-Manufaktur. Karte am Eingang.', price: '19,80 €', allergens: 'A, C' },
    ],
  },
  {
    category: 'Pizza dal Forno',
    description: '48-h-Teigführung im Steinofen gebacken.',
    items: [
      { name: 'Margherita DOP', description: 'San-Marzano, Büffelmozzarella DOP, Basilikum, Olivenöl.', price: '14,50 €', allergens: 'A, G', tags: ['vegetarisch'] },
      { name: 'Diavola', description: 'Tomate, Mozzarella, scharfe Salsiccia, Chili, Oregano.', price: '17,50 €', allergens: 'A, G' },
      { name: 'Tartufata', description: 'Crème von schwarzem Trüffel, Mozzarella, Steinpilze, Rauke.', price: '21,50 €', allergens: 'A, G', tags: ['vegetarisch'] },
    ],
  },
  {
    category: 'Secondi',
    description: 'Hauptgänge mit Wein-Empfehlung der Sommelière.',
    items: [
      { name: 'Saltimbocca alla Romana', description: 'Kalbsfilet, Parmaschinken DOP, Salbei, Weißwein-Jus.', price: '28,50 €', allergens: 'A, G' },
      { name: 'Branzino al Forno', description: 'Wolfsbarsch in der Salzkruste, Zitrone, Rosmarin, sizilianisches Olivenöl.', price: '32,00 €', allergens: 'D' },
      { name: 'Bistecca Fiorentina', description: 'Dry-Aged-Rind aus Südtirol, gegrillter Wirsing, Knochenmark.', price: 'p. 100 g · 8,50 €', tags: ['ab 800 g'] },
    ],
  },
  {
    category: 'Dolci',
    description: 'Süßes Finale – auch zum Mitnehmen.',
    items: [
      { name: 'Tiramisu della Nonna', description: 'Klassisch nach Carlas Originalrezept – Mascarpone, Espresso, Marsala.', price: '8,90 €', allergens: 'A, C, G', tags: ['Signature'] },
      { name: 'Panna Cotta ai Frutti', description: 'Mit Beerenkompott aus dem Vinschgau.', price: '7,90 €', allergens: 'G', tags: ['glutenfrei'] },
      { name: 'Cantucci & Vin Santo', description: 'Toskanisches Mandelgebäck, dazu ein Glas Vin Santo zum Eintunken.', price: '7,50 €', allergens: 'A, C, H' },
    ],
  },
];

// HOTEL — Zimmer & Suiten
(DEMO_CONTENT.hotel as any).rooms = [
  {
    name: 'Doppelzimmer Almblick',
    description: 'Helles Zimmer mit Massivholz-Bett, eigenem Balkon und Blick auf die Nordkette.',
    size: '24 m²',
    beds: 'Doppelbett 180 × 200',
    price: 'ab 189 € / Nacht',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80',
    features: ['Balkon mit Bergblick', 'Regendusche & Wanne', 'Frühstück inklusive', 'Espressomaschine'],
  },
  {
    name: 'Junior Suite Zirbe',
    description: 'Großzügige Suite ganz in Zirbenholz – schlafen wie unter einem Nadelbaum.',
    size: '38 m²',
    beds: 'Boxspring 200 × 200 · Schlafsofa',
    price: 'ab 269 € / Nacht',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80',
    features: ['Wohnbereich mit Kamin', 'Whirlwanne', 'Spa-Zugang inklusive', 'Lokale Mini-Bar'],
  },
  {
    name: 'Panorama-Suite Bergkristall',
    description: 'Unsere Signature-Suite mit Eckbalkon und freistehender Badewanne im Schlafraum.',
    size: '54 m²',
    beds: 'Boxspring 200 × 220',
    price: 'ab 389 € / Nacht',
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80',
    features: ['Eckbalkon mit Liegen', 'Sauna en suite', 'Butler-Service auf Wunsch', 'Champagner zur Anreise'],
  },
  {
    name: 'Familien-Apartment',
    description: 'Zwei verbundene Zimmer mit eigenem Wohnraum – ideal für Familien mit Kindern.',
    size: '46 m²',
    beds: '2 Doppelbetten · Schlafsofa',
    price: 'ab 295 € / Nacht',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80',
    features: ['Wohnzimmer mit Kinderspielen', 'Babybett auf Anfrage', 'Bademantel auch für Kids', 'Auf Wunsch Babyphone'],
  },
  {
    name: 'Spa-Suite Sonnenaufgang',
    description: 'Suite mit privater Sauna und Ostbalkon – für lange Sonnenaufgänge mit Tee.',
    size: '42 m²',
    beds: 'Doppelbett 180 × 200',
    price: 'ab 329 € / Nacht',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
    features: ['Private Sauna', 'Ostbalkon', 'Aromatherapie-Set', 'Yoga-Matte im Zimmer'],
  },
  {
    name: 'Einzelzimmer Comfort',
    description: 'Kompaktes Zimmer mit allem, was es braucht – ideal für Geschäftsreisende.',
    size: '18 m²',
    beds: 'Einzelbett 120 × 200',
    price: 'ab 139 € / Nacht',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80',
    features: ['Schreibtisch & schnelles WLAN', 'Spa-Zugang inklusive', 'Frühstück inklusive', 'Express-Check-out'],
  },
];

// TOURISM — Tour-Cards
(DEMO_CONTENT.tourism as any).tours = [
  {
    name: 'Achensee-Umrundung',
    description: 'Klassische Tagestour rund um den Achensee mit Einkehr in der Gaisalm.',
    duration: '8 h · Tagestour',
    level: '2/4 mittel',
    groupSize: 'max. 12',
    price: 'ab 89 €',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    languages: ['DE', 'EN'],
  },
  {
    name: 'Dolomiten-Trekking 3 Tage',
    description: 'Drei Tage durch UNESCO-Welterbe – Übernachtung in Hütten mit echtem Bergessen.',
    duration: '3 Tage / 2 Nächte',
    level: '3/4 anspruchsvoll',
    groupSize: 'max. 8',
    price: 'ab 690 €',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
    languages: ['DE', 'EN', 'IT'],
  },
  {
    name: 'Wein-Tour Vinschgau',
    description: 'Drei Weingüter, ein Mittagessen, Gespräche mit den Winzer:innen.',
    duration: '10 h · Tagestour',
    level: '1/4 leicht',
    groupSize: 'max. 8',
    price: 'ab 169 €',
    imageUrl: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1400&q=80',
    languages: ['DE', 'IT'],
  },
  {
    name: 'Foto-Workshop Karwendel',
    description: 'Sonnenaufgang am Karwendel mit Outdoor-Fotograf. Inkl. Ausrüstungs-Tipps.',
    duration: '6 h · Halbtagestour',
    level: '2/4 mittel',
    groupSize: 'max. 6',
    price: 'ab 129 €',
    imageUrl: 'https://images.unsplash.com/photo-1486162928267-e6274cb3106f?auto=format&fit=crop&w=1400&q=80',
    languages: ['DE', 'EN'],
  },
  {
    name: 'Schneeschuh-Wanderung mit Fackeln',
    description: 'Winterlich-magische Tour bei Sonnenuntergang. Inkl. Glühwein an der Hütte.',
    duration: '4 h · Abend',
    level: '1/4 leicht',
    groupSize: 'max. 12',
    price: 'ab 79 €',
    imageUrl: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1400&q=80',
    languages: ['DE', 'EN'],
  },
  {
    name: 'Skitouren-Einsteiger-Kurs',
    description: 'Zwei-Tages-Kurs mit IFMGA-Bergführer. Ausrüstung kann gestellt werden.',
    duration: '2 Tage',
    level: '3/4 anspruchsvoll',
    groupSize: 'max. 6',
    price: 'ab 449 €',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=80',
    languages: ['DE'],
  },
];

// SALON — Treatments
(DEMO_CONTENT.salon as any).treatments = [
  // Hair
  { category: 'Haar · Schnitt', name: 'Damen-Schnitt inkl. Wäsche & Styling', description: 'Persönliche Beratung, individueller Schnitt, Styling-Tipps für zuhause.', duration: '60 min', price: '65 €' },
  { category: 'Haar · Schnitt', name: 'Herren-Schnitt', description: 'Klassisch oder modern. Bartpflege auf Wunsch.', duration: '45 min', price: '38 €' },
  { category: 'Haar · Schnitt', name: 'Kinder-Schnitt (bis 12 J.)', duration: '30 min', price: '24 €' },
  { category: 'Haar · Schnitt', name: 'Pony-Korrektur (zwischen Terminen)', duration: '15 min', price: '12 €' },
  // Color
  { category: 'Haar · Color', name: 'Färben Ansatz', description: 'Pflanzliche oder ammoniakfreie Farben.', duration: '90 min', price: 'ab 89 €' },
  { category: 'Haar · Color', name: 'Strähnen klassisch', description: 'Folientechnik, individuell platziert.', duration: '120 min', price: 'ab 119 €' },
  { category: 'Haar · Color', name: 'Balayage & Air Touch', description: 'Weiche Farbverläufe nach französischer Schule.', duration: '180 min', price: 'ab 145 €' },
  { category: 'Haar · Color', name: 'Color Correction', description: 'Aufwändige Farb-Korrektur nach Beratung.', duration: 'auf Anfrage', price: 'ab 220 €' },
  // Pflege & Spa
  { category: 'Pflege & Spa', name: 'Hair-Spa Ritual', description: 'Tiefenpflege Kérastase, Kopfhaut-Massage, Föhn & Styling.', duration: '75 min', price: '95 €' },
  { category: 'Pflege & Spa', name: 'Olaplex Aufbau-Treatment', description: 'Reparatur strapazierter Haarstruktur.', duration: '45 min', price: '49 €' },
  { category: 'Pflege & Spa', name: 'Kopfhaut-Detox', description: 'Klärendes Peeling und beruhigende Pflanzen-Maske.', duration: '30 min', price: '38 €' },
  // Beauty
  { category: 'Beauty', name: 'Maniküre Shellac', description: 'Hochglanz-Finish, bis zu 3 Wochen haltbar.', duration: '60 min', price: '45 €' },
  { category: 'Beauty', name: 'Augenbrauen-Styling', description: 'Form, Pflanzenfarbe, Pflege.', duration: '30 min', price: '28 €' },
  { category: 'Beauty', name: 'Wimpern-Lifting & Tönung', duration: '60 min', price: '69 €' },
  // Bridal
  { category: 'Bridal', name: 'Probestyling', description: 'Wird beim Hochzeitstermin angerechnet.', duration: '90 min', price: '90 €' },
  { category: 'Bridal', name: 'Brautstyling am Tag der Hochzeit', description: 'Inkl. Make-up via Partnerstudio.', duration: '120 min', price: 'ab 240 €' },
];

// TRADESMAN — Funding & Emergency
(DEMO_CONTENT.tradesman as any).fundingItems = [
  { title: 'KfW Heizungsförderung', percent: '35 %', program: 'KfW 458', description: 'Grundförderung für hocheffiziente Heizsysteme – Wärmepumpe, Solarthermie, Biomasse.' },
  { title: 'Klima-Geschwindigkeits-Bonus', percent: '20 %', program: 'KfW 458', description: 'Zusätzlicher Bonus für selbstnutzende Eigentümer:innen bei früher Modernisierung.' },
  { title: 'Einkommens-Bonus', percent: '30 %', program: 'KfW', description: 'Für Haushalte unter 40.000 € zu versteuerndem Einkommen kombinierbar.' },
  { title: 'BEG Einzelmaßnahmen', percent: '15 %', program: 'BAFA', description: 'Dämmung, Fenster, Tür-Erneuerung – staatlich gefördert.' },
  { title: 'Regional-Programm Bayern', percent: '5 %', program: '10.000-Häuser', description: 'Zusätzlich für Bayern – kombinierbar mit Bundesförderung.' },
];

(DEMO_CONTENT.tradesman as any).emergencyBanner = {
  enabled: true,
  text: 'Rohrbruch oder Heizung aus? Wir kommen sofort.',
  phone: '+49 841 9876 543',
  sticky: true,
};

// CONSULTING — Process Steps
(EXTRA_DEMO_CONTENT.consulting as any).processSteps = [
  { title: 'Erstgespräch', duration: '60 min · kostenfrei', description: 'Wir hören zu, lernen Ihr Unternehmen kennen und sondieren, ob die Chemie passt.' },
  { title: 'Diagnose', duration: '2 – 3 Wochen', description: 'Daten, Zahlen, Interviews. Schriftliche Bestandsaufnahme mit klarer Empfehlung.' },
  { title: 'Strategie', duration: '4 – 8 Wochen', description: 'Gemeinsame Erarbeitung von Optionen, Bewertung, Entscheidung. Mit allen relevanten Stakeholdern.' },
  { title: 'Umsetzung', duration: 'fortlaufend', description: 'Begleitung der Umsetzung – mit klaren KPIs und regelmäßigen Reviews. Wir bleiben, bis es läuft.' },
];

(EXTRA_DEMO_CONTENT.consulting as any).packages = [
  { name: 'Diagnose', price: 'ab 4.900 €', period: 'pauschal', description: 'Schriftliche Bestandsaufnahme mit Empfehlung. Ideal als Einstieg.', features: ['Datenanalyse', '3 Stakeholder-Interviews', 'Schriftlicher Bericht', '90-min Ergebnis-Workshop'], ctaLabel: 'Anfragen' },
  { name: 'Strategie-Projekt', price: 'ab 24.500 €', period: 'pauschal', description: 'Vollständige Strategie-Entwicklung mit Umsetzungsplan.', features: ['Vollständige Diagnose', 'Strategie-Optionen', 'Umsetzungsroadmap', '4 Workshops vor Ort', 'KPI-Dashboard', '6 Monate Follow-up'], highlight: true, ctaLabel: 'Empfehlung anfragen' },
  { name: 'Interim-Beratung', price: 'ab 1.890 €', period: '/ Tagessatz', description: 'CFO oder Strategie-Lead auf Zeit – flexibel einsetzbar.', features: ['Mind. 2 Tage / Woche', 'Operative Verantwortung', 'Direkte Reportlinie', 'Monatliche Reviews'], ctaLabel: 'Verfügbarkeit prüfen' },
];

// MEDICAL — Doctors + Booking
(EXTRA_DEMO_CONTENT.medical as any).doctors = [
  { name: 'Dr. med. Lena Lindner', role: 'Praxisinhaberin · Allgemeinmedizin', specialty: 'Akupunktur · Mikronährstoffmedizin', imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80', bio: 'Fachärztin mit Zusatzbezeichnung Naturheilverfahren. Praxiserfahrung in München, Wien und Innsbruck.' },
  { name: 'Dr. med. Sophie Auer', role: 'Allgemeinmedizin · DMP-Diabetes', specialty: 'Reisemedizin · Impfungen', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80', bio: 'Spezialisiert auf chronische Erkrankungen und Reisemedizin. Tropenmedizin-Diplom (DTM&H).' },
  { name: 'Anna Pichler, MPA', role: 'Praxismanagerin', specialty: 'Termine · Abrechnung · Beratung', imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80', bio: 'Erste Ansprechpartnerin am Telefon und am Empfang – kümmert sich um alles, was nicht medizinisch ist.' },
];

(EXTRA_DEMO_CONTENT.medical as any).booking = {
  enabled: true,
  provider: 'Doctolib',
  url: 'https://www.doctolib.de/',
  note: 'Wunschtermin direkt aus dem Doctolib-Kalender. Bestätigung sofort, Erinnerung 24 Stunden vorher per Mail.',
};

// FITNESS — Courses + Packages
(EXTRA_DEMO_CONTENT.fitness as any).courses = [
  { name: 'Vinyasa Flow', description: 'Dynamisch, atemorientiert.', schedule: 'Mo 18:00 · Mi 19:30 · Sa 10:00', level: 'Alle Levels', duration: '75 min', trainer: 'Sarah B.', price: '22 €' },
  { name: 'Yin Yoga', description: 'Lange gehaltene, ruhige Positionen.', schedule: 'Di 20:00 · Do 19:00', level: 'Alle Levels', duration: '60 min', trainer: 'Marie L.', price: '22 €' },
  { name: 'Reformer Pilates Klein', description: 'Max. 5 Personen am Reformer.', schedule: 'Mo + Mi 09:00 · 17:00', level: 'Mittel', duration: '50 min', trainer: 'Tom K.', price: '32 €' },
  { name: 'Mindful Movement', description: 'Yoga, Somatics, Atemarbeit.', schedule: 'Fr 18:00 · So 11:00', level: 'Anfänger', duration: '60 min', trainer: 'Sarah B.', price: '22 €' },
  { name: 'Power Vinyasa', description: 'Kraftvolle Variante mit Gewichten.', schedule: 'Di + Do 06:30 · Sa 08:30', level: 'Fortgeschritten', duration: '60 min', trainer: 'Tom K.', price: '24 €' },
  { name: 'Restorative Sunday', description: 'Tiefe Entspannung mit Bolstern.', schedule: 'So 17:00', level: 'Alle Levels', duration: '90 min', trainer: 'Marie L.', price: '28 €' },
];

(EXTRA_DEMO_CONTENT.fitness as any).packages = [
  { name: 'Probetraining', price: '15 €', period: 'einmalig', description: 'Eine Klasse Ihrer Wahl, ohne Verpflichtung.', features: ['Beliebige Klasse', 'Persönliche Begrüßung', 'Beratungsgespräch', 'Matte & Tee inklusive'], ctaLabel: 'Probetraining buchen' },
  { name: 'Flex-Mitgliedschaft', price: '129 €', period: '/ Monat', description: 'Unbegrenzt alle Yoga-Klassen, monatlich kündbar.', features: ['Alle Yoga-Formate', 'Bis zu 3× / Woche', 'Online-Klassen inklusive', 'Gast-Pass: 1× / Monat'], highlight: true, ctaLabel: 'Mitglied werden' },
  { name: 'Reformer 8er-Block', price: '224 €', period: '8 Klassen', description: 'Acht Reformer-Klassen, gültig 12 Wochen.', features: ['8 Reformer-Klassen', 'Gültig 12 Wochen', 'Persönliche Einführung', 'Bewegungs-Analyse'], ctaLabel: 'Block kaufen' },
];

