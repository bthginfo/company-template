import { SiteContentSchema, type SiteContent, type TemplateKey } from './types';

/**
 * Demo content for the showcase preview pages.
 */
export const DEMO_CONTENT: Record<TemplateKey, SiteContent> = {
  restaurant: SiteContentSchema.parse({
    brand: {
      name: 'Trattoria Innsbruck',
      tagline: 'Cucina d\'Autore · Seit 1998',
      primaryColor: '#9a3412',
    },
    hero: {
      title: 'Italien beginnt am ersten Bissen.',
      subtitle: 'Handgemachte Pasta, Holzofen-Pizza und Naturweine im Herzen von Innsbruck. Drei Generationen Familie. Eine ehrliche Küche.',
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
      { title: 'Branzino al Forno', description: 'Wolfsbarsch in der Salzkruste, Zitrone, Rosmarin, sizilianisches Olivenöl.', price: '32,00 €', imageUrl: 'https://images.unsplash.com/photo-1535399831218-d4c2e6f4eba6?auto=format&fit=crop&w=900&q=80' },
      { title: 'Antipasti della Casa', description: 'Eine Auswahl aus dem Markt – Parmaschinken, Burrata, eingelegtes Gemüse, Crostini.', price: '18,50 €', imageUrl: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=900&q=80' },
      { title: 'Pasta del Giorno', description: 'Tagesgericht aus der Pasta-Manufaktur. Die Karte hängt im Eingang.', price: '19,80 €', imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80' },
      { title: 'Cantucci & Vin Santo', description: 'Toskanisches Mandelgebäck, dazu ein Glas Vin Santo zum Eintunken.', price: '7,50 €', imageUrl: 'https://images.unsplash.com/photo-1605522863636-2e3b6f3d5f80?auto=format&fit=crop&w=900&q=80' },
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
      { author: 'Markus W., München', text: 'Ein Geheimtipp. Wir machen extra einen Umweg, wenn wir in Tirol sind. Pizza der Stadt.' },
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
      mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.6037830876796!2d11.39!3d47.27!2m3!1f0!2f0!3f0',
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
      subtitle: 'Ein Salon in München-Schwabing, der Pflege als Kunst versteht. Hochwertige Produkte. Stylist:innen mit internationaler Ausbildung. Eine Atmosphäre, die Sie sofort runterkommen lässt.',
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
      mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663!2d11.58!3d48.16',
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
      subtitle: 'Drei Generationen Installation, Sanitär und Heizungstechnik. Vom kleinen Notfall bis zur Großsanierung – wir sind in 60 Minuten bei Ihnen, mit Festpreis und Meisterprüfung.',
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
      { title: 'Heizungsmodernisierung', description: 'Wärmepumpe, Pellets, Hybrid, Brennwert. Wir beraten Sie ehrlich zu Förderungen (KfW & BAFA).', price: 'auf Anfrage', imageUrl: 'https://images.unsplash.com/photo-1585129777188-7fd4ed0db75d?auto=format&fit=crop&w=900&q=80' },
      { title: 'Solarthermie & Photovoltaik', description: 'Komplettpaket inkl. Anmeldung beim Netzbetreiber, Inbetriebnahme und 2 Jahre Wartung.', price: 'auf Anfrage', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80' },
      { title: 'Wartung & Service', description: 'Jährliche Wartung Ihrer Heizung – inkl. Sicherheitsprüfung. Wir erinnern Sie automatisch.', price: 'ab 149 €', imageUrl: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80' },
      { title: 'Smart-Home-Steuerung', description: 'Heizung, Wasser und Lüftung intelligent gesteuert per App – kompatibel mit Apple Home & KNX.', price: 'auf Anfrage', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80' },
      { title: 'Energieberatung', description: 'Vor-Ort-Termin, Bestandsanalyse, schriftlicher Bericht mit Fördermöglichkeiten.', price: 'ab 290 €', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1585129777188-7fd4ed0db75d?auto=format&fit=crop&w=900&q=80',
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
      mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2598!2d11.42!3d48.76',
    },
    social: {
      whatsapp: '+498419876543',
    },
  }),
};
