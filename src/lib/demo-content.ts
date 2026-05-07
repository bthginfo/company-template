import { mergeSiteContentWithBootstrappedPageBlocks } from './page-blocks-v1-bootstrap.js';
import { DEMO_NEWS_BY_TEMPLATE } from './demo-news-by-template.js';
import { SiteContentSchema, type SiteContent, type TemplateKey } from './types.js';

export { DEMO_NEWS_BY_TEMPLATE, DEMO_NEWS_POSTS, demoNewsFallbackForTemplate } from './demo-news-by-template.js';

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
      body: 'Handgemachte Pasta, Holzofen-Pizza und Naturweine im Herzen von Innsbruck. Drei Generationen Familie. Eine ehrliche Küche.',
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
    posts: DEMO_NEWS_BY_TEMPLATE.restaurant,
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
    locations: [
      {
        name: 'La Cantinetta · Weinbar',
        phone: '+43 512 123 4568',
        email: 'weinbar@trattoria-innsbruck.at',
        address: 'Stiftgasse 4',
        city: '6020 Innsbruck',
        hours: [
          { day: 'Do – Sa', time: '17:00 – 01:00' },
          { day: 'So – Mi', time: 'geschlossen' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Stiftgasse+4,+6020+Innsbruck&output=embed',
      },
      {
        name: 'Catering & Events (Abholung)',
        phone: '+43 512 123 4569',
        email: 'catering@trattoria-innsbruck.at',
        address: 'Gewerbegebiet Roßau, Halle 3',
        city: '6020 Innsbruck',
        hours: [
          { day: 'Mo – Fr', time: '09:00 – 16:00' },
          { day: 'Sa + So', time: 'nach Vereinbarung' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Ro%C3%9Fau+Innsbruck&output=embed',
      },
    ],
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
      body: 'Ein Salon, der sich Zeit nimmt. Hochwertige Produkte, ehrliche Beratung und Stylist:innen mit internationaler Ausbildung – in einer Atmosphäre, die Sie sofort runterkommen lässt.',
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
    posts: DEMO_NEWS_BY_TEMPLATE.salon,
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
    locations: [
      {
        name: 'Studio Lumière · Schwabing',
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
      {
        name: 'Pop-Up Color Lab · Glockenbach',
        phone: '+49 89 1234 5680',
        email: 'colorlab@studio-lumiere.de',
        address: 'Reichenbachstraße 36',
        city: '80469 München',
        hours: [
          { day: 'Mi – Sa', time: '10:00 – 19:00' },
          { day: 'So – Di', time: 'Geschlossen' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Reichenbachstra%C3%9Fe+36,+80469+M%C3%BCnchen&output=embed',
      },
    ],
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
      body: 'Vom kleinen Notfall bis zur Großsanierung – Festpreis, Meisterprüfung und transparente Kommunikation. Über 65 % unserer Aufträge kommen über Empfehlung.',
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
      {
        title: 'Notdienst & Reparaturen',
        description: 'Rohrbruch, Heizungsausfall, verstopfte Leitung – wir sind in 60 Minuten bei Ihnen. 24/7, auch am Wochenende.',
        price: 'ab 79 €',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
        detailSlug: 'notdienst-reparaturen',
        detailPublished: true,
        detailSubtitle: '24/7 · Festpreis nach Absprache',
        detailBody:
          'Unser Notdienst-Team ist in Ingolstadt und Umland in der Regel innerhalb von 60 Minuten vor Ort. Wir sichern Schäden, dokumentieren für die Versicherung und reparieren fachgerecht.\n\nTransparente Preisinfo vor Arbeitsbeginn – keine Überraschungen auf der Rechnung.',
        detailGallery: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
        ],
      },
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
    posts: DEMO_NEWS_BY_TEMPLATE.tradesman,
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
    locations: [
      {
        name: 'Mayer & Söhne · Hauptsitz & Werkstatt',
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
      {
        name: 'Filiale Neuburg · Sanitär-Showroom',
        phone: '+49 8431 90 12 30',
        email: 'neuburg@mayer-soehne.de',
        address: 'Donauwörther Straße 62',
        city: '86633 Neuburg a. d. Donau',
        hours: [
          { day: 'Mo – Fr', time: '08:00 – 17:00' },
          { day: 'Sa', time: '09:00 – 13:00 (nur Beratung)' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Donauw%C3%B6rther+Stra%C3%9Fe+62,+86633+Neuburg&output=embed',
      },
    ],
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
      body: '34 individuelle Zimmer mit Massivholz und Bergblick, ein Spa zum Abschalten und eine Küche, die ihre Quellen kennt. Ein Familienbetrieb seit 1956.',
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
    posts: DEMO_NEWS_BY_TEMPLATE.hotel,
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
    locations: [
      {
        name: 'Hotel Bergkristall · Hauptgebäude',
        phone: '+43 5234 5678 0',
        email: 'willkommen@hotel-bergkristall.at',
        address: 'Dorfstraße 8',
        city: '6080 Igls bei Innsbruck',
        hours: [
          { day: 'Rezeption', time: '24/7' },
          { day: 'Restaurant', time: '12:00 – 14:30 · 18:30 – 22:00' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Dorfstra%C3%9Fe+8,+6080+Igls&output=embed',
      },
      {
        name: 'Chalet Sonnrain · Suiten & Spa',
        phone: '+43 5234 5678 20',
        email: 'chalet@hotel-bergkristall.at',
        address: 'Sonnrainweg 2',
        city: '6080 Igls bei Innsbruck',
        hours: [
          { day: 'Rezeption', time: '08:00 – 20:00' },
          { day: 'Spa', time: '10:00 – 20:00' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Igls+Tirol&output=embed',
      },
    ],
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
      body: 'Geführte Wanderungen, Wein-Touren in Südtirol, Foto-Workshops in den Dolomiten. Maximal acht Gäste, Guides aus der Region, Tagestouren mit acht Stunden Zeit.',
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
      { title: 'Privat- & Firmen-Touren', description: 'Maßgeschneiderte Tagesprogramme für Gruppen bis 12 Personen. Incentives, Teamtage, Hochzeitsausflüge.', imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80' },
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
    posts: DEMO_NEWS_BY_TEMPLATE.tourism,
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
    locations: [
      {
        name: 'Alpenroute Tirol · Büro & Treffpunkt',
        phone: '+43 512 87 65 43',
        email: 'tour@alpenroute.tirol',
        address: 'Maria-Theresien-Straße 12',
        city: '6020 Innsbruck',
        hours: [
          { day: 'Mo – Fr', time: '09:00 – 18:00' },
          { day: 'Sa', time: '10:00 – 14:00' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Maria-Theresien-Stra%C3%9Fe+12,+6020+Innsbruck&output=embed',
      },
      {
        name: 'Repräsentanz München',
        phone: '+49 89 2000 45 90',
        email: 'muenchen@alpenroute.tirol',
        address: 'Sendlinger Straße 42',
        city: '80331 München',
        hours: [
          { day: 'Mo – Fr', time: '10:00 – 17:00' },
          { day: 'Termine', time: 'nach Vereinbarung' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Sendlinger+Stra%C3%9Fe+42,+80331+M%C3%BCnchen&output=embed',
      },
    ],
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
      body: 'Wir beraten mittelständische Unternehmen in Steuer-, Wirtschafts- und Strategiefragen – ehrlich, gründlich, persönlich. Über 180 Mandate aus Industrie, Handel und Familienunternehmen.',
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
    posts: DEMO_NEWS_BY_TEMPLATE.consulting,
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
    locations: [
      {
        name: 'Kanzlei München',
        phone: '+49 89 22 333 444',
        email: 'kontakt@hofer-partner.de',
        address: 'Maximilianstraße 24',
        city: '80539 München',
        hours: [
          { day: 'Mo – Fr', time: '09:00 – 18:00' },
          { day: 'Termine', time: 'nach Vereinbarung' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Maximilianstra%C3%9Fe+24,+80539+M%C3%BCnchen&output=embed',
      },
      {
        name: 'Büro Wien',
        phone: '+43 1 512 20 30',
        email: 'wien@hofer-partner.de',
        address: 'Kärntner Ring 5–7',
        city: '1010 Wien',
        hours: [
          { day: 'Mo – Fr', time: '09:00 – 17:30' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=K%C3%A4rntner+Ring+5,+1010+Wien&output=embed',
      },
    ],
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
      body: 'Hausärztliche Versorgung mit echter Zuwendung – 30 Minuten Termintaktung statt 7. Schulmedizin, Akupunktur, Mikronährstoff-Therapie und Ernährungsmedizin in einer Praxis.',
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
    posts: DEMO_NEWS_BY_TEMPLATE.medical,
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
    locations: [
      {
        name: 'Praxis Dr. Lindner · Hauptstandort',
        phone: '+43 512 55 66 77',
        email: 'praxis@dr-lindner.at',
        address: 'Falkstraße 18',
        city: '6020 Innsbruck',
        hours: [
          { day: 'Mo, Di, Do', time: '08:00 – 18:00' },
          { day: 'Mi, Fr', time: '08:00 – 13:00' },
          { day: 'Termine', time: 'online via Doctolib' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Falkstra%C3%9Fe+18,+6020+Innsbruck&output=embed',
      },
      {
        name: 'Filiale Rum · Akupunktur & Vorsorge',
        phone: '+43 512 55 66 78',
        email: 'rum@dr-lindner.at',
        address: 'Höhenstraße 11',
        city: '6063 Rum bei Innsbruck',
        hours: [
          { day: 'Di + Do', time: '14:00 – 18:00' },
          { day: 'Mi', time: '08:00 – 12:00' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Rum+Tirol&output=embed',
      },
    ],
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
      body: 'Ein kleines Studio in München-Glockenbach mit großen Fenstern, viel Holz und Lehrer:innen, die Sie nicht aus den Augen verlieren. Maximal acht Personen pro Kurs.',
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
    posts: DEMO_NEWS_BY_TEMPLATE.fitness,
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
    locations: [
      {
        name: 'Studio Anima · Glockenbach',
        phone: '+49 89 44 55 66',
        email: 'hello@studio-anima.de',
        address: 'Pestalozzistraße 9',
        city: '80469 München',
        hours: [
          { day: 'Mo – Fr', time: '07:00 – 21:00' },
          { day: 'Sa + So', time: '08:30 – 17:00' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Pestalozzistra%C3%9Fe+9,+80469+M%C3%BCnchen&output=embed',
      },
      {
        name: 'Studio Anima · Au-Haidhausen',
        phone: '+49 89 44 55 67',
        email: 'au@studio-anima.de',
        address: 'Weißenburger Straße 35',
        city: '81667 München',
        hours: [
          { day: 'Mo – Fr', time: '07:00 – 21:00' },
          { day: 'Sa', time: '09:00 – 14:00' },
        ],
        mapsUrl: 'https://www.google.com/maps?q=Wei%C3%9Fenburger+Stra%C3%9Fe+35,+81667+M%C3%BCnchen&output=embed',
      },
    ],
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
      {
        name: 'Bruschetta al Pomodoro',
        description: 'Hausgebackenes Sauerteigbrot, San-Marzano-Tomaten, Basilikum, Knoblauch.',
        price: '8,90 €',
        allergens: 'A, G',
        tags: ['vegan'],
        imageUrl: 'https://images.unsplash.com/photo-1572695157366-3e47b1b7059d?auto=format&fit=crop&w=900&q=80',
        detailSlug: 'bruschetta-al-pomodoro',
        detailPublished: true,
        detailSubtitle: 'Vegan · täglich frisch geröstet',
        detailBody:
          'Unser Sauerteig reift 48 Stunden, wird dann knusprig gebacken und mit San-Marzano-Tomaten, frischem Basilikum und kaltgepresstem Olivenöl serviert.\n\nPerfekt zum Aperitivo oder zum Teilen am Tisch.',
        detailGallery: [
          'https://images.unsplash.com/photo-1572695157366-3e47b1b7059d?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        ],
      },
      {
        name: 'Burrata di Andria',
        description: 'Cremige Burrata DOP, eingelegte Tomaten, Basilikum-Öl, Sauerteigcrostini.',
        price: '14,50 €',
        allergens: 'A, G',
        imageUrl: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=900&q=80',
        detailSlug: 'burrata-di-andria',
        detailPublished: true,
        detailSubtitle: 'DOP · aus Apulien',
        detailBody:
          'Die Burrata kommt wöchentlich frisch aus Andria. Wir servieren sie mit lang eingelegten Tomaten, Basilikumöl und warmem Crostini.\n\nEin Klassiker, den unsere Gäste am häufigsten bestellen.',
        detailGallery: [
          'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
        ],
      },
      { name: 'Vitello Tonnato', description: 'Rosa gebratenes Kalb, Thunfisch-Kapern-Creme, Rauke, Zitrone.', price: '16,90 €', allergens: 'D, G, M' },
      { name: 'Antipasti della Casa', description: 'Auswahl aus dem Markt – Parmaschinken, Burrata, Crostini, eingelegtes Gemüse.', price: '18,50 €', allergens: 'A, G' },
    ],
  },
  {
    category: 'Pasta & Risotto',
    description: 'Hausgemacht, täglich frisch aufgezogen.',
    items: [
      {
        name: 'Tagliatelle al Tartufo',
        description: 'Frische Tagliatelle, schwarzer Sommertrüffel aus Umbrien, Parmigiano 24 Mesi.',
        price: '24,90 €',
        allergens: 'A, C, G',
        tags: ['Signature'],
        imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
        detailSlug: 'tagliatelle-al-tartufo',
        detailPublished: true,
        detailSubtitle: 'Signature · frische Pasta',
        detailBody:
          'Die Tagliatelle wird morgens aufgezogen und zum Service blanchiert. Der Trüffel wird am Tisch gehobelt – Intensität nach Wunsch.\n\nParmigiano Reggiano 24 Monate, etwas braune Butter, keine Kompromisse.',
        detailGallery: [
          'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=80',
        ],
      },
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
    detailSlug: 'doppelzimmer-almblick',
    detailPublished: true,
    detailSubtitle: '24 m² · Balkon Nordkette',
    detailBody:
      'Massivholzbett, hochwertige Matratze, Schreibtisch und Sitzecke. Das Bad verfügt über Regendusche und freistehende Badewanne.\n\nFrühstücksbuffet von 7:00 bis 11:00 inklusive.',
    detailGallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    name: 'Junior Suite Zirbe',
    description: 'Großzügige Suite ganz in Zirbenholz – schlafen wie unter einem Nadelbaum.',
    size: '38 m²',
    beds: 'Boxspring 200 × 200 · Schlafsofa',
    price: 'ab 269 € / Nacht',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80',
    features: ['Wohnbereich mit Kamin', 'Whirlwanne', 'Spa-Zugang inklusive', 'Lokale Mini-Bar'],
    detailSlug: 'junior-suite-zirbe',
    detailPublished: true,
    detailSubtitle: '38 m² · Zirbe & Kamin',
    detailBody:
      'Die Suite ist komplett in Zirbenholz gehalten – beruhigend für Allergiker und wohltuend für die Nachtruhe. Wohnbereich mit Kaminofen und Blick ins Tal.\n\nSpa-Bereich inklusive: Pool, Sauna und Ruheraum.',
    detailGallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
    ],
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
    detailSlug: 'achensee-umrundung',
    detailPublished: true,
    detailSubtitle: 'Tagestour · max. 12 Personen',
    detailBody:
      'Wir wandern den Achensee auf gut ausgebauten Wegen, mit Pausen an Fotospots und einer ausführlichen Mittagseinkehr in der Gaisalm.\n\nLeichte Anstiege, festes Schuhwerk empfohlen. Lunchpaket vom Hofladen inklusive.',
    detailGallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1400&q=80',
    ],
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
    detailSlug: 'dolomiten-trekking-3-tage',
    detailPublished: true,
    detailSubtitle: 'Hütten · kleine Gruppe',
    detailBody:
      'Drei Tage durch die Südtiroler Dolomiten mit IFMGA-erfahrenen Guides. Übernachtung in ausgewählten Hütten, Halbpension, Gepäcktransfer wo möglich.\n\nFitness: 5–7 h Gehzeit pro Tag. Technische Ausrüstung wird vorab besprochen.',
    detailGallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
    ],
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
  {
    category: 'Haar · Schnitt',
    name: 'Damen-Schnitt inkl. Wäsche & Styling',
    description: 'Persönliche Beratung, individueller Schnitt, Styling-Tipps für zuhause.',
    duration: '60 min',
    price: '65 €',
    imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80',
    detailSlug: 'damen-schnitt',
    detailPublished: true,
    detailSubtitle: 'Inkl. Wäsche & Finish',
    detailBody:
      'Wir starten mit einem ausführlichen Beratungsgespräch, analysieren Struktur und Wuchs und schneiden trocken oder nass – je nach Haar.\n\nNach der Wäsche zeigen wir Ihnen ein einfaches Styling für zuhause.',
    detailGallery: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    category: 'Haar · Schnitt',
    name: 'Herren-Schnitt',
    description: 'Klassisch oder modern. Bartpflege auf Wunsch.',
    duration: '45 min',
    price: '38 €',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
    detailSlug: 'herren-schnitt',
    detailPublished: true,
    detailSubtitle: 'inkl. Bartpflege auf Wunsch',
    detailBody:
      'Präziser Schnitt mit Maschine und Schere, Konturen sauber gesetzt. Auf Wunsch Bart trimmen, einreiben und stylen.\n\nIdeal zwischen zwei größeren Terminen: schnell, sauber, gepflegt.',
    detailGallery: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    ],
  },
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
  {
    title: 'KfW Heizungsförderung',
    percent: '35 %',
    program: 'KfW 458',
    description: 'Grundförderung für hocheffiziente Heizsysteme – Wärmepumpe, Solarthermie, Biomasse.',
    imageUrl: 'https://images.unsplash.com/photo-1604061986761-d9d0cc41b0d1?auto=format&fit=crop&w=900&q=80',
    detailSlug: 'kfw-heizungsfoerderung',
    detailPublished: true,
    detailSubtitle: 'KfW 458 · Kombinierbar',
    detailBody:
      'Die KfW-Programme ändern sich regelmäßig. Wir prüfen für Ihr Objekt die aktuelle Förderfähigkeit und begleiten Antrag und Nachweis.\n\nKombination mit regionalen Programmen ist oft möglich – fragen Sie uns.',
    detailGallery: [
      'https://images.unsplash.com/photo-1604061986761-d9d0cc41b0d1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  { title: 'Klima-Geschwindigkeits-Bonus', percent: '20 %', program: 'KfW 458', description: 'Zusätzlicher Bonus für selbstnutzende Eigentümer:innen bei früher Modernisierung.' },
  { title: 'Einkommens-Bonus', percent: '30 %', program: 'KfW', description: 'Für Haushalte unter 40.000 € zu versteuerndem Einkommen kombinierbar.' },
  { title: 'BEG Einzelmaßnahmen', percent: '15 %', program: 'BAFA', description: 'Dämmung, Fenster, Tür-Erneuerung – staatlich gefördert.' },
  { title: 'Regional-Programm Bayern', percent: '5 %', program: '10.000-Häuser', description: 'Zusätzlich für Bayern – kombinierbar mit Bundesförderung.' },
];

(DEMO_CONTENT.tradesman as any).fundingCalc = {
  minInvest: 5000,
  maxInvest: 150000,
  stepInvest: 1000,
  defaultInvest: 25000,
};

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

/** Spotlight-Programmkarten (Startseite) — gleiches Schema wie `ProgramsEditor`. */
(EXTRA_DEMO_CONTENT.fitness as any).programs = [
  { k: 'YOGA', t: 'Vinyasa Flow', d: 'Dynamisches Yoga im Atemrhythmus. Für alle, die Bewegung lieben.', meta: '75 min · Mo / Mi / Fr' },
  { k: 'YIN', t: 'Yin Yoga', d: 'Lange gehaltene, ruhige Positionen. Tiefe Faszien-Arbeit.', meta: '60 min · Di / Do' },
  { k: 'PIL', t: 'Reformer Pilates', d: 'Kleingruppen mit max. 5 Personen. Präzise Korrekturen, klare Progression.', meta: '60 min · n. Vereinb.' },
  { k: 'PT', t: 'Personal Training', d: '60 oder 90 Minuten – ganz auf Sie zugeschnitten.', meta: 'flexibel · n. Vereinb.' },
];

// ─── Extra branches: richer gallery + about subpages (showcase / preview) ───
const extraGalleryStoryConsulting = {
  eyebrow: 'Aus dem Projektalltag',
  title: 'Beratung, die man sieht.',
  body: 'Workshops, Workshops und noch mehr Workshops – aber auch die stillen Momente vor dem Flipchart. Diese Galerie zeigt, wie wir arbeiten, wenn Mandanten uns vertrauen.',
  captions: [
    { t: 'Kick-off', d: 'Alignment im Raum, klare Rollen, erste Roadmap an der Wand.' },
    { t: 'Deep Dive', d: 'Zahlen, Risiken, Chancen – mit Ruhe und Struktur.' },
    { t: 'Go-live', d: 'Wenn aus Strategie Alltag wird – und wir noch an Ihrer Seite sind.' },
  ],
};
(EXTRA_DEMO_CONTENT.consulting as any).galleryStory = extraGalleryStoryConsulting;
(EXTRA_DEMO_CONTENT.consulting as any).galleryCategories = [
  { t: 'Strategie', d: 'Markt, Wettbewerb, Optionen – fundiert und ehrlich.' },
  { t: 'Organisation', d: 'Prozesse, Rollen, Steuerung – damit nichts verloren geht.' },
  { t: 'Change', d: 'Kommunikation, Schulungen, Begleitung beim Roll-out.' },
];
(EXTRA_DEMO_CONTENT.consulting as any).aboutNumbers = [
  { value: '25+', label: 'Jahre Erfahrung' },
  { value: '180+', label: 'Projekte' },
  { value: '14', label: 'Berater:innen' },
  { value: '48h', label: 'Erste Antwort' },
];
(EXTRA_DEMO_CONTENT.consulting as any).ctaBandOverrides = {
  ...(EXTRA_DEMO_CONTENT.consulting as any).ctaBandOverrides,
  gallery: {
    eyebrow: 'Mehr Bilder?',
    lead: 'Projekt besprechen',
    sub: 'Wir melden uns mit einem konkreten Vorschlag für ein Erstgespräch.',
    cta: 'Kontakt',
    ctaHref: '/kontakt',
  },
  about: {
    eyebrow: 'Chemie stimmt?',
    lead: 'Lernen Sie uns in 60 Minuten kennen',
    sub: 'Unverbindliches Erstgespräch – remote oder vor Ort.',
    cta: 'Termin anfragen',
    ctaHref: '/kontakt',
  },
};

(EXTRA_DEMO_CONTENT.medical as any).galleryStory = {
  eyebrow: 'Authentische Momente',
  title: 'Die Praxis, wie Sie sie erleben.',
  body: 'Von der ersten Minute an legen wir Wert auf Klarheit und Ruhe. Diese Bilder zeigen unsere Räume und den Umgangston, den wir uns für Sie wünschen.',
  captions: [
    { t: 'Empfang', d: 'Persönliche Begrüßung, unkomplizierte Terminfindung, Wartebereich mit Tageslicht.' },
    { t: 'Beratung', d: 'Ausführliche Gespräche – mit Zeit, Beschwerden wirklich zu verstehen.' },
    { t: 'Behandlung', d: 'Ruhige Liegen, sterile Abläufe, klare Ansagen.' },
  ],
};
(EXTRA_DEMO_CONTENT.medical as any).galleryCategories = [
  { t: 'Team & Praxis', d: 'Ärzt:innen, Praxismanagement, Labor – ein eingespieltes Team.' },
  { t: 'Diagnostik', d: 'EKG, Ultraschall, Laborparameter – alles an einem Ort.' },
  { t: 'Komplementärmedizin', d: 'Akupunktur, Ernährungstherapie, evidenzbasiert begleitet.' },
];
(EXTRA_DEMO_CONTENT.medical as any).aboutNumbers = [
  { value: '30', label: 'Min. pro Termin' },
  { value: '2', label: 'Ärztinnen' },
  { value: '2019', label: 'Praxis seit' },
  { value: '4,9', label: 'Google Ø' },
];
(EXTRA_DEMO_CONTENT.medical as any).ctaBandOverrides = {
  ...(EXTRA_DEMO_CONTENT.medical as any).ctaBandOverrides,
  gallery: {
    eyebrow: 'Gesehen genug?',
    lead: 'Vereinbaren Sie einen Termin',
    sub: 'Online oder telefonisch – wir melden uns mit konkreten Vorschlägen.',
    cta: 'Zu Kontakt',
    ctaHref: '/kontakt',
  },
  about: {
    eyebrow: 'Persönlich?',
    lead: 'Wir nehmen uns Zeit für Sie',
    sub: 'Erstgespräch nach Buchung – ausführlich und ohne Hetze.',
    cta: 'Terminvereinbarung',
    ctaHref: '/kontakt',
  },
};

(EXTRA_DEMO_CONTENT.fitness as any).galleryStory = {
  eyebrow: 'Studio-Leben',
  title: 'Training, das man spürt.',
  body: 'Keine Inszenierung: echte Kurse, echte Schweißperlen, echte Ruhe in Savasana. So dokumentieren wir unser Studio – für alle, die vorher wissen wollen, wie es sich anfühlt.',
  captions: [
    { t: 'Flow', d: 'Vinyasa-Reihen, Musik, die trägt, Lehrer:innen im Raum.' },
    { t: 'Kraft', d: 'Reformer, Gewichte, kleine Gruppen – jede Person im Blick.' },
    { t: 'Ruhe', d: 'Yin, Restorative, Meditation – der Gegenpol zum Alltag.' },
  ],
};
(EXTRA_DEMO_CONTENT.fitness as any).galleryCategories = [
  { t: 'Yoga', d: 'Vinyasa, Yin, Restorative – für Einsteiger und Fortgeschrittene.' },
  { t: 'Pilates', d: 'Reformer-Kleingruppen, präzise Korrekturen, klare Progression.' },
  { t: 'Community', d: 'Workshops, Retreats, offene Sonntage.' },
];
(EXTRA_DEMO_CONTENT.fitness as any).aboutNumbers = [
  { value: '8', label: 'Max. pro Kurs' },
  { value: '5', label: 'Lehrer:innen' },
  { value: '12+', label: 'Jahre Erfahrung' },
  { value: '350+', label: 'Stammgäste' },
];
(EXTRA_DEMO_CONTENT.fitness as any).ctaBandOverrides = {
  ...(EXTRA_DEMO_CONTENT.fitness as any).ctaBandOverrides,
  gallery: {
    eyebrow: 'Lust auf Mitte?',
    lead: 'Probetraining buchen',
    sub: 'Eine Klasse Ihrer Wahl – wir zeigen Ihnen Studio und Trainer:innen.',
    cta: 'Termin sichern',
    ctaHref: '/kontakt',
  },
  about: {
    eyebrow: 'Studio kennenlernen?',
    lead: 'Kommen Sie vorbei',
    sub: 'Wir zeigen Ihnen Räume, Kursplan und finden das passende Format.',
    cta: 'Probetraining',
    ctaHref: '/kontakt',
  },
};

// ─── Showcase: exemplarische Katalog-Detailseiten (Slug + Galerie) ──
(() => {
  const c = EXTRA_DEMO_CONTENT.consulting;
  const g2 = (a: string, b: string) => [a, b];
  const ph = (eyebrow: string, title: string, subtitle: string) => ({ eyebrow, title, subtitle });
  Object.assign(c, {
    servicesHeader: ph('Leistungen', 'Was wir für Sie tun', 'Strategie, Steuern, Recht — aus einer Hand.'),
    galleryHeader: ph('Einblicke', 'Galerie', 'Projekte, Workshops und Momente aus der Zusammenarbeit.'),
    aboutHeader: ph('Über uns', 'Hofer & Partner', 'Team, Geschichte und Werte der Kanzlei.'),
    contactPageHeader: ph('Kontakt', 'Erstgespräch', 'Adresse, Erreichbarkeit und nächste Schritte.'),
  });
  Object.assign(c.services[0], {
    detailSlug: 'strategie-geschaeftsmodell',
    detailPublished: true,
    detailSubtitle: 'Workshops · KPIs · Umsetzung',
    detailBody:
      'Wir analysieren Markt, Wettbewerb und interne Stärken, entwickeln Szenarien und begleiten die Entscheidung bis zur Roadmap.\n\nTypischerweise 6–12 Wochen, abhängig von Komplexität und Datenlage.',
    detailGallery: g2(
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
    ),
  });
  Object.assign(c.services[1], {
    detailSlug: 'steuerberatung-jahresabschluss',
    detailPublished: true,
    detailSubtitle: 'Digital · transparent',
    detailBody:
      'Laufende Buchführung, Jahresabschluss, Steuererklärungen und Betriebsprüfungs-Vorbereitung – alles in einem Team.\n\nSie sehen jederzeit den Stand im Mandantenportal.',
    detailGallery: g2(
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    ),
  });
  const pk = (c as { packages?: Array<Record<string, unknown>> }).packages;
  if (pk?.[0]) {
    Object.assign(pk[0], {
      detailSlug: 'paket-diagnose',
      detailPublished: true,
      detailSubtitle: 'Einstieg · Festpreis',
      detailBody:
        'Die Diagnose-Pauschale umfasst Datenanalyse, drei Stakeholder-Interviews und einen schriftlichen Bericht mit Handlungsempfehlungen.\n\nAbschluss in einem 90-Minuten-Ergebnis-Workshop mit Ihrem Kernteam.',
      detailGallery: g2(
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      ),
    });
  }
  const ps = (c as { processSteps?: Array<Record<string, unknown>> }).processSteps;
  if (ps?.[0]) {
    Object.assign(ps[0], {
      detailSlug: 'erstgespraech',
      detailPublished: true,
      detailSubtitle: '60 Minuten · kostenfrei',
      detailBody:
        'Wir lernen Ihr Unternehmen kennen, klären Erwartungen und prüfen, ob die Chemie für eine Zusammenarbeit passt.\n\nSie erhalten keine Verkaufspräsentation, sondern ehrliches Feedback und eine erste Orientierung.',
      detailGallery: g2(
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
      ),
    });
  }

  const m = EXTRA_DEMO_CONTENT.medical;
  Object.assign(m, {
    servicesHeader: ph('Leistungen', 'Medizinische Angebote', 'Hausarzt, Vorsorge und komplementäre Verfahren.'),
    galleryHeader: ph('Praxis', 'Galerie', 'Räume, Team und Atmosphäre der Praxis Dr. Lindner.'),
    aboutHeader: ph('Über uns', 'Die Praxis', 'Philosophie, Team und Qualitätssicherung.'),
    contactPageHeader: ph('Termine', 'Kontakt', 'Online-Buchung, Telefon und Wegbeschreibung.'),
  });
  Object.assign(m.services[0], {
    detailSlug: 'hausarztliche-versorgung',
    detailPublished: true,
    detailSubtitle: '30 Min. Termin · DMP',
    detailBody:
      'Hausärztliche Versorgung mit Zeit: Vorsorge, Akutsprechstunde, chronische Erkrankungen und DMP-Programme.\n\nWir koordinieren Facharzttermine und halten Ihre Medikation im Blick.',
    detailGallery: g2(
      'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    ),
  });
  const docs = (m as { doctors?: Array<Record<string, unknown>> }).doctors;
  if (docs?.[0]) {
    Object.assign(docs[0], {
      detailSlug: 'dr-lena-lindner',
      detailPublished: true,
      detailSubtitle: 'Allgemeinmedizin · Naturheilverfahren',
      detailBody:
        'Fachärztin mit Zusatzbezeichnung Naturheilverfahren. Schwerpunkte: Prävention, chronische Beschwerden, Akupunktur und Mikronährstoff-Therapie.\n\nErstgespräch ausführlich – nach vorheriger Terminbuchung.',
      detailGallery: g2(
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      ),
    });
  }

  const f = EXTRA_DEMO_CONTENT.fitness;
  Object.assign(f, {
    servicesHeader: ph('Angebote', 'Kurse & Training', 'Yoga, Pilates und Personal Training im Studio.'),
    galleryHeader: ph('Studio', 'Galerie', 'Räume, Kurse und Community bei Studio Anima.'),
    aboutHeader: ph('Über uns', 'Studio Anima', 'Geschichte, Team und Qualität im kleinen Format.'),
    contactPageHeader: ph('Probetraining', 'Kontakt', 'Adresse, Kursplan und erste Fragen — wir helfen gern.'),
  });
  const fc = (f as { courses?: Array<Record<string, unknown>> }).courses;
  if (fc?.[0]) {
    Object.assign(fc[0], {
      detailSlug: 'kurs-vinyasa-flow',
      detailPublished: true,
      detailSubtitle: '75 Min · alle Levels',
      detailBody:
        'Dynamische Reihen im Rhythmus des Atems. Wir arbeiten mit Optionen für Knie und Schultern – jede Session endet mit kurzer Meditation.\n\nMatten und Props sind im Studio vorhanden.',
      detailGallery: g2(
        'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      ),
    });
  }
  const fpk = (f as { packages?: Array<Record<string, unknown>> }).packages;
  if (fpk?.[0]) {
    Object.assign(fpk[0], {
      detailSlug: 'probetraining-paket',
      detailPublished: true,
      detailSubtitle: 'Einmalig · ohne Verpflichtung',
      detailBody:
        'Eine Klasse Ihrer Wahl, persönliche Begrüßung und ein kurzes Beratungsgespräch zu Format und Mitgliedschaft.\n\nBitte bequeme Kleidung mitbringen; Matten und Tee gibt es bei uns.',
      detailGallery: g2(
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      ),
    });
  }
  Object.assign(f.services[0], {
    detailSlug: 'angebot-vinyasa-flow',
    detailPublished: true,
    detailSubtitle: '75 Min · ab 22 €',
    detailBody:
      'Unser meistgebuchtes Format: fließende Übergänge, klare Ansagen, Musik die trägt. Für Einsteiger:innen mit Grundfitness geeignet.\n\nAnmeldung über den Kursplan oder Probetraining.',
    detailGallery: g2(
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80',
    ),
  });

  const Tr = DEMO_CONTENT.tradesman;
  Object.assign(Tr, {
    servicesHeader: ph('Leistungen', 'Sanitär & Heizung', 'Notdienst, Sanierung und Energie — Meisterbetrieb Mayer & Söhne.'),
    galleryHeader: ph('Referenzen', 'Galerie', 'Baustellen, Team und fertige Projekte aus Ingolstadt.'),
    aboutHeader: ph('Betrieb', 'Über uns', 'Geschichte, Team und Qualität im Meisterbetrieb.'),
    contactPageHeader: ph('Anfrage', 'Kontakt', 'Festpreis-Anfrage, Notdienst und Erreichbarkeit.'),
  });

  Object.assign(Tr, {
    galleryStory: {
      eyebrow: 'Referenzen',
      title: 'Arbeit, die man sehen kann.',
      body: 'Einblicke in Bäder, Heizräume, Wartung und Baustellenalltag.',
      captions: [
        { t: 'Badumbau', d: 'Saubere Demontage, neue Leitungen und klare Abstimmung vor Ort.' },
        { t: 'Heizraum', d: 'Moderne Technik mit nachvollziehbarer Einweisung.' },
        { t: 'Notdienst', d: 'Schnelle Hilfe, wenn Wasser oder Heizung nicht warten können.' },
      ],
    },
    galleryCategories: [
      { t: 'Sanitär', d: 'Bäder, Armaturen, Reparaturen und Leitungen.' },
      { t: 'Heizung', d: 'Wartung, Austausch und effiziente Anlagen.' },
      { t: 'Service', d: 'Notdienst, Kontrolle und klare Dokumentation.' },
    ],
  });

  const R = DEMO_CONTENT.restaurant;
  Object.assign(R, {
    servicesHeader: ph('Aus der Küche', 'Speisekarte', 'Auszug aus der Karte — Pasta, Pizza, Dolci.'),
    galleryHeader: ph('Stimmung', 'Galerie', 'Einblicke in Küche und Gastraum.'),
    aboutHeader: ph('Familie', 'Über uns', 'Geschichte und Team der Trattoria.'),
    contactPageHeader: ph('Reservierung', 'Kontakt', 'Adresse, Zeiten und Nachricht — wir antworten schnell.'),
  });
  Object.assign(R, {
    galleryStory: {
      eyebrow: 'Einblicke',
      title: 'Aus unserer Trattoria.',
      body: 'Küche, Keller und Gastraum - Momente aus Vorbereitung, Service und Abendgeschäft.',
      captions: [
        { t: 'Pasta-Manufaktur', d: 'Tagliatelle, Ravioli und Gnocchi entstehen jeden Vormittag frisch.' },
        { t: 'Holzofen', d: '48 Stunden Teigführung, San-Marzano-Tomaten und kräftige Hitze.' },
        { t: 'Weinkeller', d: 'Naturweine, Barolo und kleine Produzenten aus Italien.' },
      ],
    },
    galleryCategories: [
      { t: 'Küche', d: 'Frische Pasta, Saucen und Dolci aus eigener Vorbereitung.' },
      { t: 'Gastraum', d: 'Klassischer Service, lange Tische und familiäre Atmosphäre.' },
      { t: 'Wein', d: 'Flaschen für Pizza, Pasta und besondere Abende.' },
    ],
  });
  Object.assign(R.services[0], {
    detailSlug: 'tagliatelle-speisekarte',
    detailPublished: true,
    detailSubtitle: 'Hausgemacht · Trüffel',
    detailBody:
      'Unsere Tagliatelle wird täglich frisch aufgezogen. Der schwarze Sommertrüffel kommt aus Umbrien, der Parmigiano 24 Monate aus Emilia-Romagna.\n\nAls Ergänzung empfehlen wir ein Glas Barolo.',
    detailGallery: g2(
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=80',
    ),
  });

  const S = DEMO_CONTENT.salon;
  Object.assign(S, {
    servicesHeader: ph('Treatments', 'Leistungen', 'Schnitt, Color, Spa und Beauty — auf einen Blick.'),
    galleryHeader: ph('Looks', 'Galerie', 'Arbeiten, Räume und Stimmung im Studio Lumière.'),
    aboutHeader: ph('Über uns', 'Studio Lumière', 'Marie Hofer und das Team — Ausbildung und Philosophie.'),
    contactPageHeader: ph('Termin', 'Kontakt', 'Buchung, Adresse und Anfahrt nach Schwabing.'),
  });
  Object.assign(S, {
    galleryStory: {
      eyebrow: 'Looks',
      title: 'Schnitte, Farbe und Studio.',
      body: 'Einblicke in Beratung, Farbtechnik, Pflege und den ruhigen Ablauf im Salon.',
      captions: [
        { t: 'Beratung', d: 'Wir schauen Haarstruktur, Alltag und Wunschbild gemeinsam an.' },
        { t: 'Color', d: 'Balayage, Glossing und Pflege abgestimmt auf den Haartyp.' },
        { t: 'Finish', d: 'Schnitt, Styling und Tipps für zuhause.' },
      ],
    },
    galleryCategories: [
      { t: 'Schnitt', d: 'Damen, Herren und individuelle Formen.' },
      { t: 'Farbe', d: 'Balayage, Glossing und natürliche Nuancen.' },
      { t: 'Pflege', d: 'Treatments für Glanz, Struktur und Kopfhaut.' },
    ],
  });
  Object.assign(S.services[0], {
    detailSlug: 'damen-schnitt-leistung',
    detailPublished: true,
    detailSubtitle: '60 Min · inkl. Styling',
    detailBody:
      'Ausführliche Beratung, Schnitt und Finish – inklusive Tipps für die tägliche Routine zuhause.\n\nWir arbeiten mit Kérastase und Olaplex nach Bedarf.',
    detailGallery: g2(
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    ),
  });
  Object.assign(S.services[1], {
    detailSlug: 'herren-schnitt-leistung',
    detailPublished: true,
    detailSubtitle: '45 Min',
    detailBody:
      'Klassischer oder moderner Herrenschnitt mit Konturen und optionaler Bartpflege.\n\nTermin auch kurzfristig möglich.',
    detailGallery: g2(
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    ),
  });

  const T = DEMO_CONTENT.tourism;
  Object.assign(T, {
    servicesHeader: ph('Programm', 'Touren & Erlebnisse', 'Tagestouren, Mehrtagestrips und Workshops in Tirol.'),
    galleryHeader: ph('Eindrücke', 'Galerie', 'Berge, Gruppen und Momente unterwegs mit Alpenroute.'),
    aboutHeader: ph('Team', 'Über uns', 'Guides, Philosophie und Qualität bei Alpenroute Tirol.'),
    contactPageHeader: ph('Buchung', 'Kontakt', 'Fragen zur Tour — wir melden uns mit konkreten Terminen.'),
  });
  Object.assign(T, {
    galleryStory: {
      eyebrow: 'Unterwegs',
      title: 'Momente aus den Bergen.',
      body: 'Touren, Pausen, Aussichtspunkte und kleine Gruppen in Tirol.',
      captions: [
        { t: 'Aufstieg', d: 'Routenwahl passend zur Gruppe, Wetter und Kondition.' },
        { t: 'Pause', d: 'Zeit für Aussicht, Wasser und echte Orientierung.' },
        { t: 'Abstieg', d: 'Sicher zurück mit Guide und klarer Kommunikation.' },
      ],
    },
    galleryCategories: [
      { t: 'Tagestouren', d: 'Kompakte Routen mit lokalem Guide.' },
      { t: 'Mehrtägig', d: 'Planung, Etappen und Unterkunft abgestimmt.' },
      { t: 'Workshops', d: 'Karte, Wetter, Ausrüstung und Technik.' },
    ],
  });
  Object.assign(T.services[0], {
    detailSlug: 'tagestouren-tirol',
    detailPublished: true,
    detailSubtitle: 'Ab 89 € · kleine Gruppe',
    detailBody:
      'Geführte Tagestouren mit lokalem Guide, Lunchpaket und klaren Pausen. Maximale Gruppengröße 12.\n\nSchwierigkeit und Ausrüstung besprechen wir vorab per Mail.',
    detailGallery: g2(
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    ),
  });

  const H = DEMO_CONTENT.hotel;
  Object.assign(H, {
    servicesHeader: ph('Zimmer & Haus', 'Unser Angebot', 'Zimmerkategorien, Spa und Kulinarik im Bergkristall.'),
    galleryHeader: ph('Impressionen', 'Galerie', 'Zimmer, Spa, Natur und kulinarische Momente.'),
    aboutHeader: ph('Familie', 'Über uns', 'Drei Generationen Gastgeber in den Tiroler Bergen.'),
    contactPageHeader: ph('Anfrage', 'Kontakt', 'Reservierung, Anreise und persönliche Wünsche.'),
  });
  Object.assign(H, {
    galleryStory: {
      eyebrow: 'Haus',
      title: 'Zimmer, Spa und Bergblick.',
      body: 'Einblicke in Räume, Frühstück, Wellness und die Lage am Berg.',
      captions: [
        { t: 'Zimmer', d: 'Holz, Stoffe und ruhige Farben für klare Erholung.' },
        { t: 'Spa', d: 'Sauna, Ruhebereich und Blick in die Berge.' },
        { t: 'Frühstück', d: 'Regionale Produkte, Kaffee und Zeit am Morgen.' },
      ],
    },
    galleryCategories: [
      { t: 'Zimmer', d: 'Almblick, Suiten und kleine Rückzugsorte.' },
      { t: 'Spa', d: 'Sauna, Ruhe und Anwendungen.' },
      { t: 'Kulinarik', d: 'Frühstück, Abendkarte und regionale Produkte.' },
    ],
  });
  Object.assign(H.services[0], {
    detailSlug: 'zimmer-suiten-uebersicht',
    detailPublished: true,
    detailSubtitle: '18 Zimmer · 12 Junior-Suiten',
    detailBody:
      'Überblick über unsere Zimmerkategorien – von kompakt bis Panorama. Alle Zimmer mit Balkon oder Loggia, Massivholzböden und hochwertiger Bettware.\n\nFrühstück und Spa-Zugang in allen Kategorien inklusive.',
    detailGallery: g2(
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
    ),
  });
})();

// ─── Populate CMS fields that previously fell through to hardcoded fallbacks ──
(() => {
  const R = DEMO_CONTENT.restaurant;
  const S = DEMO_CONTENT.salon;
  const Tr = DEMO_CONTENT.tradesman;
  const H = DEMO_CONTENT.hotel;
  const To = DEMO_CONTENT.tourism;
  const C = EXTRA_DEMO_CONTENT.consulting as SiteContent;
  const M = EXTRA_DEMO_CONTENT.medical as SiteContent;
  const F = EXTRA_DEMO_CONTENT.fitness as SiteContent;

  // --- numbers (hero stats) ---
  Object.assign(R, { numbers: [
    { label: 'Jahre Erfahrung', value: '26' },
    { label: 'Gerichte täglich frisch', value: '40+' },
    { label: 'Stammkunden', value: '800+' },
    { label: 'Naturweine im Keller', value: '120' },
  ]});
  Object.assign(S, { numbers: [
    { label: 'Jahre Erfahrung', value: '15' },
    { label: 'Zufriedene Kunden/Jahr', value: '3.000+' },
    { label: 'Behandlungen', value: '50+' },
    { label: 'Stylisten im Team', value: '8' },
  ]});
  Object.assign(Tr, { numbers: [
    { label: 'Projekte abgeschlossen', value: '2.400+' },
    { label: 'Jahre Meisterbetrieb', value: '42' },
    { label: 'Mitarbeiter', value: '18' },
    { label: 'Notdienst-Einsätze/Jahr', value: '350+' },
  ]});
  Object.assign(H, { numbers: [
    { label: 'Zimmer & Suiten', value: '34' },
    { label: 'Spa-Bereich m²', value: '800' },
    { label: 'Hauben/Punkte', value: '2/16' },
    { label: 'Jahre Familientradition', value: '85' },
  ]});
  Object.assign(To, { numbers: [
    { label: 'Erlebnisse buchbar', value: '60+' },
    { label: 'Partnerbetriebe', value: '25' },
    { label: 'Gäste/Saison', value: '12.000+' },
    { label: 'Regionen', value: '4' },
  ]});
  Object.assign(C, { numbers: [
    { label: 'Mandanten betreut', value: '500+' },
    { label: 'Jahre Erfahrung', value: '20' },
    { label: 'Fachberater', value: '12' },
    { label: 'Erfolgsquote', value: '97%' },
  ]});
  Object.assign(M, { numbers: [
    { label: 'Patienten/Jahr', value: '8.000+' },
    { label: 'Fachärzte', value: '6' },
    { label: 'Jahre Praxis', value: '18' },
    { label: 'Fachbereiche', value: '4' },
  ]});
  Object.assign(F, { numbers: [
    { label: 'Mitglieder aktiv', value: '1.200+' },
    { label: 'Kurse/Woche', value: '45' },
    { label: 'Trainer:innen', value: '14' },
    { label: 'Trainingsfläche m²', value: '1.800' },
  ]});

  // --- values ---
  Object.assign(R, { values: [
    { t: 'Frische', d: 'Jeden Tag neue Pasta, jede Woche neue Karte.' },
    { t: 'Herkunft', d: 'Wir kennen jeden Lieferanten persönlich.' },
    { t: 'Gastfreundschaft', d: 'Jeder Gast ist Familie – vom ersten Moment.' },
  ]});
  Object.assign(S, { values: [
    { t: 'Individualität', d: 'Jeder Schnitt beginnt mit einem Gespräch.' },
    { t: 'Qualität', d: 'Nur Produkte, hinter denen wir voll stehen.' },
    { t: 'Wohlfühlen', d: 'Ein Ort, an dem Sie abschalten können.' },
  ]});
  Object.assign(Tr, { values: [
    { t: 'Zuverlässigkeit', d: 'Termintreue und klare Kommunikation.' },
    { t: 'Meisterqualität', d: 'Jede Arbeit mit Gewährleistung und Stolz.' },
    { t: 'Fairness', d: 'Festpreise, keine versteckten Kosten.' },
  ]});
  Object.assign(H, { values: [
    { t: 'Ruhe', d: 'Ein Ort, der Stille und Weite möglich macht.' },
    { t: 'Genuss', d: 'Vom Frühstück bis zum Abendmenü: bewusst.' },
    { t: 'Aufmerksamkeit', d: 'Kleine Details, die den Aufenthalt besonders machen.' },
  ]});
  Object.assign(To, { values: [
    { t: 'Erlebnis', d: 'Momente, die bleiben – keine Massenware.' },
    { t: 'Nachhaltigkeit', d: 'Sanfter Tourismus, lokale Wertschöpfung.' },
    { t: 'Insider-Wissen', d: 'Geheimtipps von Menschen, die hier leben.' },
  ]});
  Object.assign(C, { values: [
    { t: 'Klarheit', d: 'Komplexes einfach erklärt, immer auf den Punkt.' },
    { t: 'Verbindlichkeit', d: 'Was wir zusagen, setzen wir um.' },
    { t: 'Diskretion', d: 'Absolute Vertraulichkeit in jeder Beratung.' },
  ]});
  Object.assign(M, { values: [
    { t: 'Menschlichkeit', d: 'Medizin beginnt mit Zuhören.' },
    { t: 'Kompetenz', d: 'Fortbildung, Leitlinien, aktuelle Forschung.' },
    { t: 'Erreichbarkeit', d: 'Kurze Wartezeiten, schnelle Termine.' },
  ]});
  Object.assign(F, { values: [
    { t: 'Ehrlichkeit', d: 'Keine leeren Versprechen – echte Ergebnisse.' },
    { t: 'Gemeinschaft', d: 'Training macht zusammen mehr Spaß.' },
    { t: 'Vielfalt', d: 'Für jedes Level das richtige Format.' },
  ]});

  // --- team ---
  Object.assign(R, { team: [
    { n: 'Giulia Ferraro', r: 'Küchenchefin', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80', bio: 'Kocht seit ihrem 14. Lebensjahr – heute leitet sie die Küche mit Leidenschaft und Präzision.' },
    { n: 'Marco Bellini', r: 'Sommelier', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', bio: 'Naturwein-Spezialist mit Netzwerk zu kleinen Winzern in ganz Italien.' },
    { n: 'Anna Gruber', r: 'Service-Leitung', img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80', bio: 'Sorgt dafür, dass jeder Abend reibungslos und persönlich verläuft.' },
  ]});
  Object.assign(S, { team: [
    { n: 'Lisa Auer', r: 'Inhaberin & Master-Stylistin', img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80', bio: '15 Jahre Erfahrung in Schnitt, Farbe und Styling.' },
    { n: 'Julia Kern', r: 'Coloristin', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80', bio: 'Spezialistin für Balayage und natürliche Farbtöne.' },
    { n: 'Sarah Moser', r: 'Kosmetik & Wellness', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80', bio: 'Gesichtsbehandlungen, Waxing und Wohlfühl-Packages.' },
  ]});
  Object.assign(Tr, { team: [
    { n: 'Stefan Mayer', r: 'Geschäftsführer & Meister', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', bio: 'Meisterbrief seit 2002, Spezialist für Badsanierung.' },
    { n: 'Thomas Huber', r: 'Heizung & Energie', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', bio: 'Wärmepumpen, Solar und energieeffiziente Systeme.' },
    { n: 'Michael Berger', r: 'Notdienst-Leitung', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', bio: '24/7 erreichbar für Rohrbruch, Heizungsausfall und Co.' },
  ]});
  Object.assign(H, { team: [
    { n: 'Elisabeth Waldner', r: 'Gastgeberin & Inhaberin', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', bio: 'Führt das Haus in dritter Generation mit Liebe zum Detail.' },
    { n: 'Andreas Pichler', r: 'Küchenchef', img: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&w=400&q=80', bio: '2 Hauben, regionale Küche und kreative Menüs.' },
    { n: 'Maria Kofler', r: 'Spa-Leitung', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', bio: 'Wellness-Konzepte mit alpinen Kräutern und lokalen Rohstoffen.' },
  ]});
  Object.assign(To, { team: [
    { n: 'Martin Hofer', r: 'Gründer & Guide', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', bio: 'Bergführer, Kletterer, Storyteller – kennt jede Route.' },
    { n: 'Katharina Steiner', r: 'Erlebnis-Planung', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', bio: 'Organisiert Gruppentouren, Events und Incentives.' },
    { n: 'Lukas Brenner', r: 'Fotograf & Content', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', bio: 'Hält die schönsten Momente fest – für Social Media und Erinnerung.' },
  ]});
  Object.assign(C, { team: [
    { n: 'Dr. Markus Hofer', r: 'Geschäftsführer', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', bio: 'Strategie und Steuerrecht seit 20 Jahren.' },
    { n: 'Mag. Claudia Lang', r: 'Wirtschaftsprüfung', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80', bio: 'Internationale Bilanzierung und Compliance.' },
    { n: 'Thomas Eder', r: 'Digitale Transformation', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', bio: 'Prozessoptimierung und ERP-Beratung.' },
  ]});
  Object.assign(M, { team: [
    { n: 'Dr. Eva Steinbach', r: 'Fachärztin Allgemeinmedizin', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', bio: 'Hausärztliche Versorgung mit Schwerpunkt Prävention.' },
    { n: 'Dr. Florian Lechner', r: 'Facharzt Orthopädie', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', bio: 'Sportmedizin, Gelenke und konservative Therapie.' },
    { n: 'Lisa Winkler', r: 'Praxismanagement', img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80', bio: 'Organisation, Termine und Patientenbetreuung.' },
  ]});
  Object.assign(F, { team: [
    { n: 'Max Berger', r: 'Head Coach', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', bio: 'Functional Training, Athletikcoach, Lizenztrainer.' },
    { n: 'Nina Hofer', r: 'Group Fitness', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80', bio: 'Yoga, Pilates, HIIT – für jedes Level.' },
    { n: 'David Ortner', r: 'Personal Training', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80', bio: '1:1 Betreuung für Gewichtsverlust und Muskelaufbau.' },
  ]});

  // --- arrival ---
  Object.assign(R, { arrival: [
    { t: 'Mit dem Auto', d: 'Parkgarage City 2 Min. entfernt, Tiefgarage Innrain.' },
    { t: 'Öffentlich', d: 'Straßenbahn Linie 1, Haltestelle Museumstraße.' },
    { t: 'Zu Fuß', d: '5 Minuten vom Hauptbahnhof durch die Altstadt.' },
  ]});
  Object.assign(S, { arrival: [
    { t: 'Mit dem Auto', d: 'Kostenlose Parkplätze direkt vor dem Studio.' },
    { t: 'Mit dem Bus', d: 'Linie 4, Haltestelle Kirchplatz (50m).' },
    { t: 'Mit dem Rad', d: 'Fahrradständer am Eingang.' },
  ]});
  Object.assign(Tr, { arrival: [
    { t: 'Büro', d: 'Gewerbegebiet Süd, kostenlose Parkplätze.' },
    { t: 'Vor Ort', d: 'Wir kommen zu Ihnen – Terminvereinbarung genügt.' },
    { t: 'Notdienst', d: '24/7 Telefon, Anfahrt innerhalb von 45 Minuten.' },
  ]});
  Object.assign(H, { arrival: [
    { t: 'Mit dem Auto', d: 'A13 Ausfahrt Seefeld, dann 10 Min. Bergstraße.' },
    { t: 'Transfer', d: 'Shuttle vom Bahnhof Seefeld, auf Anfrage.' },
    { t: 'Zu Fuß', d: 'Wanderweg 26a führt direkt zum Haus.' },
  ]});
  Object.assign(To, { arrival: [
    { t: 'Anreise', d: 'Bahnhof Jenbach oder Innsbruck Hbf, Buslinie 4134.' },
    { t: 'Treffpunkt', d: 'Unser Büro am Marktplatz 3, Schwaz.' },
    { t: 'Leihausrüstung', d: 'Alles vor Ort – Schuhe, Stöcke, Helme.' },
  ]});
  Object.assign(C, { arrival: [
    { t: 'Büro', d: 'Museumsstraße 12, 6020 Innsbruck, 2. Stock.' },
    { t: 'Öffentlich', d: 'Straßenbahn Linie 3, Haltestelle Landesmuseum.' },
    { t: 'Termin', d: 'Erstgespräch nach Vereinbarung, auch per Video.' },
  ]});
  Object.assign(M, { arrival: [
    { t: 'Praxis', d: 'Südtiroler Platz 8, EG rechts, barrierefrei.' },
    { t: 'Parken', d: 'Tiefgarage Kaufhaus 1 Min., Kurzparkzone vor dem Haus.' },
    { t: 'Öffis', d: 'Bus Linie 1 + 4, Haltestelle Südtiroler Platz.' },
  ]});
  Object.assign(F, { arrival: [
    { t: 'Studio', d: 'Gewerbepark Nord, Halle 3 – großer Parkplatz.' },
    { t: 'Öffentlich', d: 'Bus 12, Haltestelle Gewerbepark (100m).' },
    { t: 'Rad', d: 'Radweg entlang der Sill, Fahrradständer am Eingang.' },
  ]});

  // --- announcements ---
  Object.assign(R, { announcements: ['Neuer Mittagstisch ab Mai – 3 Gänge für €14,90', 'Terrasse geöffnet!', 'Weinverkostung jeden letzten Freitag'] });
  Object.assign(S, { announcements: ['Neue Öffnungszeiten: Mo–Sa 9–19 Uhr', 'Balayage-Wochen – 15% Rabatt im Mai', 'Online-Terminbuchung jetzt verfügbar'] });
  Object.assign(Tr, { announcements: ['Notdienst 24/7 erreichbar', 'Heizungswartung – jetzt Herbsttermin sichern', 'Neue Wärmepumpen-Förderung 2026'] });
  Object.assign(H, { announcements: ['Frühbucher-Vorteil: 10% auf Sommeraufenthalte', 'Neues Spa-Programm ab Juni', 'Wanderwochen mit geführten Touren'] });
  Object.assign(To, { announcements: ['Neue Klettersteig-Route eröffnet!', 'Familien-Packages ab €89/Person', 'Gutscheine online erhältlich'] });
  Object.assign(C, { announcements: ['Webinar: Steuertipps 2026 – jetzt anmelden', 'Neue Partnerin im Team: Mag. Claudia Lang', 'Sommeröffnungszeiten ab Juni'] });
  Object.assign(M, { announcements: ['Grippeschutzimpfung ab Oktober verfügbar', 'Neue Sprechstunde: Sportmedizin', 'Online-Rezept jetzt möglich'] });
  Object.assign(F, { announcements: ['Probetraining kostenlos – jederzeit!', 'Neuer Kursplan ab Mai online', 'Summer-Body-Challenge startet am 1. Juni'] });

  // --- logos (partner brands) ---
  Object.assign(R, { logos: ['Südtiroler Bauernbund', 'Slow Food Tirol', 'Biowein Austria', 'Gasthof-Allianz', 'IKB'] });
  Object.assign(S, { logos: ['Kérastase', 'Olaplex', 'Davines', 'ghd', 'Dermalogica'] });
  Object.assign(Tr, { logos: ['Viessmann', 'Grohe', 'Geberit', 'Stiebel Eltron', 'WKO Meisterbetrieb'] });
  Object.assign(H, { logos: ['Relais & Châteaux', 'Best Alpine Wellness', 'Gault Millau', 'Falstaff', 'Tirol Werbung'] });
  Object.assign(To, { logos: ['Tirol Werbung', 'Alpenverein', 'Naturpark Karwendel', 'Olympiaregion', 'Bergrettung'] });
  Object.assign(C, { logos: ['WKO', 'KSW Tirol', 'EY Alumni', 'Digital Austria', 'BMF Partner'] });
  Object.assign(M, { logos: ['ÖÄK', 'Ärztekammer Tirol', 'ÖGAM', 'Sportmedizin Austria', 'Gesund.tirol'] });
  Object.assign(F, { logos: ['Les Mills', 'TRX', 'Technogym', 'Polar', 'WKO Sport'] });

  // --- faq ---
  Object.assign(R, { faq: [
    { q: 'Muss ich reservieren?', a: 'Empfohlen, besonders Fr–Sa. Online oder telefonisch.' },
    { q: 'Gibt es vegetarische Optionen?', a: 'Ja, mindestens 4 Hauptgerichte sind immer vegetarisch oder vegan.' },
    { q: 'Kann ich Gutscheine kaufen?', a: 'Ja, online oder im Restaurant – ab €25.' },
    { q: 'Gibt es einen Mittagstisch?', a: 'Di–Fr 11:30–14:00, 3 Gänge ab €14,90.' },
  ]});
  Object.assign(S, { faq: [
    { q: 'Brauche ich einen Termin?', a: 'Ja, wir arbeiten nur mit Termin. Online buchen oder anrufen.' },
    { q: 'Wie lange dauert ein Haarschnitt?', a: 'Ca. 45–60 Minuten inkl. Beratung und Styling.' },
    { q: 'Gibt es Parkplätze?', a: 'Ja, kostenlos direkt vor dem Studio.' },
    { q: 'Welche Produkte verwendet ihr?', a: 'Kérastase, Olaplex und Davines – auf Anfrage auch vegan.' },
  ]});
  Object.assign(Tr, { faq: [
    { q: 'Wie schnell kommt der Notdienst?', a: 'Innerhalb von 45 Minuten im Stadtgebiet.' },
    { q: 'Gibt es Festpreise?', a: 'Ja, für Standardleistungen. Angebot vorab kostenlos.' },
    { q: 'Welche Hersteller verbaut ihr?', a: 'Viessmann, Grohe, Geberit – Markenqualität mit Garantie.' },
    { q: 'Macht ihr auch Kleinreparaturen?', a: 'Ja, Tropfhahn bis Therme – kein Auftrag zu klein.' },
  ]});
  Object.assign(H, { faq: [
    { q: 'Ab wann kann ich einchecken?', a: 'Check-in ab 15:00, Check-out bis 11:00. Früher/später auf Anfrage.' },
    { q: 'Ist der Spa-Bereich inklusive?', a: 'Ja, für alle Hausgäste – Sauna, Pool, Ruhebereich.' },
    { q: 'Gibt es vegetarisches Abendmenü?', a: 'Ja, wir bieten immer ein vegetarisches 4-Gänge-Menü.' },
    { q: 'Kann ich meinen Hund mitbringen?', a: 'In ausgewählten Zimmern – bitte bei Buchung angeben.' },
  ]});
  Object.assign(To, { faq: [
    { q: 'Brauche ich Vorkenntnisse?', a: 'Die meisten Touren sind für Einsteiger geeignet. Wir beraten Sie gerne.' },
    { q: 'Was ist bei schlechtem Wetter?', a: 'Wir haben Alternativ-Programme und informieren 24h vorher.' },
    { q: 'Ist Ausrüstung inklusive?', a: 'Ja, Leihausrüstung ist im Preis enthalten.' },
    { q: 'Ab welchem Alter können Kinder teilnehmen?', a: 'Je nach Tour ab 6 Jahren – Familien-Touren ab 4.' },
  ]});
  Object.assign(C, { faq: [
    { q: 'Was kostet ein Erstgespräch?', a: 'Das Erstgespräch (30 Min.) ist kostenlos und unverbindlich.' },
    { q: 'Arbeiten Sie auch mit Unternehmen?', a: 'Ja, KMU bis mittelständische Betriebe sind unser Schwerpunkt.' },
    { q: 'Wie läuft eine Beratung ab?', a: 'Erstgespräch, Analyse, Konzept, Umsetzungsbegleitung.' },
    { q: 'Bieten Sie Video-Beratung an?', a: 'Ja, alle Termine auch per Teams oder Zoom.' },
  ]});
  Object.assign(M, { faq: [
    { q: 'Brauche ich eine Überweisung?', a: 'Für die Allgemeinmedizin nein, für Fachärzte empfohlen.' },
    { q: 'Wie bekomme ich einen Termin?', a: 'Online, telefonisch oder per App – meist innerhalb einer Woche.' },
    { q: 'Welche Kassen nehmen Sie?', a: 'Alle gesetzlichen Kassen und private Zusatzversicherungen.' },
    { q: 'Gibt es Abendsprechstunden?', a: 'Dienstag und Donnerstag bis 19:00 Uhr.' },
  ]});
  Object.assign(F, { faq: [
    { q: 'Ist ein Probetraining kostenlos?', a: 'Ja, jederzeit und ohne Voranmeldung – einfach vorbeikommen.' },
    { q: 'Gibt es eine Mindestlaufzeit?', a: 'Nein, wir bieten flexible Monatsverträge.' },
    { q: 'Welche Kurse sind für Anfänger?', a: 'Yoga Basic, Fit Start, Mobility – alle mit "Einsteiger" markiert.' },
    { q: 'Kann ich den Kursplan online sehen?', a: 'Ja, auf unserer Website und in der App – live aktualisiert.' },
  ]});

  // --- certifications (tradesman-specific) ---
  Object.assign(Tr, { certifications: [
    { t: 'Meisterbetrieb', d: 'Eingetragener Meisterbetrieb der WKO Tirol.' },
    { t: 'Gas-Wasser-Heizung', d: 'Konzessionierter Installateur nach GewO.' },
    { t: 'Wärmepumpen-Partner', d: 'Zertifizierter Viessmann-Fachpartner.' },
    { t: 'Energieberater', d: 'Registrierter Energieberater Land Tirol.' },
    { t: 'TÜV-geprüft', d: 'Jährliche Betriebsprüfung bestanden.' },
    { t: 'Lehrbetrieb', d: 'Ausgezeichneter Lehrbetrieb seit 2010.' },
  ]});

  // --- press (restaurant-specific) ---
  Object.assign(R, { press: [
    { src: 'Falstaff', q: 'Authentische italienische Küche mit Seele – eine der besten Trattorien Tirols.', y: '2025', url: '' },
    { src: 'Tiroler Tageszeitung', q: 'Familie Ferraro bringt seit 26 Jahren ein Stück Italien nach Innsbruck.', y: '2024', url: '' },
    { src: 'Gault Millau', q: 'Handwerk und Herzblut: 14 Punkte für die Trattoria Innsbruck.', y: '2025', url: '' },
  ]});

  // --- serviceHighlights (services page USP bar) ---
  Object.assign(R, { serviceHighlights: [
    { t: 'Hausgemacht', d: 'Pasta, Saucen und Desserts – alles frisch aus unserer Küche.' },
    { t: 'Saisonal', d: 'Die Karte wechselt alle 4 Wochen mit der Saison.' },
    { t: 'Authentisch', d: 'Originalrezepte aus der Emilia-Romagna und Apulien.' },
  ]});
  Object.assign(S, { serviceHighlights: [
    { t: 'Beratung inklusive', d: 'Jeder Termin beginnt mit einem persönlichen Gespräch.' },
    { t: 'Premium-Produkte', d: 'Kérastase, Olaplex und Davines – keine Kompromisse.' },
    { t: 'Wohlfühl-Atmosphäre', d: 'Design, Duft und Musik stimmen auf Entspannung ein.' },
  ]});
  Object.assign(Tr, { serviceHighlights: [
    { t: 'Festpreis-Garantie', d: 'Verbindliches Angebot vor Arbeitsbeginn – keine Überraschungen.' },
    { t: 'Meisterqualität', d: 'WKO-zertifizierter Betrieb mit Gewährleistung.' },
    { t: '24/7 Notdienst', d: '45 Minuten Anfahrtszeit im gesamten Stadtgebiet.' },
  ]});
  Object.assign(H, { serviceHighlights: [
    { t: 'All-Inclusive Spa', d: 'Sauna, Pool und Ruhebereich für alle Hausgäste inklusive.' },
    { t: 'Regionale Küche', d: '2-Hauben-Küche mit Produkten aus der Region.' },
    { t: 'Persönlicher Service', d: 'Maximal 34 Zimmer – wir kennen jeden Gast beim Namen.' },
  ]});
  Object.assign(To, { serviceHighlights: [
    { t: 'Kleine Gruppen', d: 'Maximal 8 Personen pro Tour für echtes Erleben.' },
    { t: 'Ausrüstung inklusive', d: 'Schuhe, Helme, Stöcke – alles im Preis enthalten.' },
    { t: 'Lokale Guides', d: 'Menschen die hier leben und jede Route kennen.' },
  ]});
  Object.assign(C, { serviceHighlights: [
    { t: 'Erstgespräch gratis', d: '30 Minuten unverbindlich – persönlich oder per Video.' },
    { t: 'Digitale Prozesse', d: 'Mandantenportal, E-Signatur und Echtzeit-Reporting.' },
    { t: 'Branchenexpertise', d: '20 Jahre Erfahrung in Industrie, Handel und Familienunternehmen.' },
  ]});
  Object.assign(M, { serviceHighlights: [
    { t: '30-Min.-Termine', d: 'Genug Zeit für Gespräch, Untersuchung und Fragen.' },
    { t: 'Alle Kassen', d: 'Gesetzliche und private Versicherungen – transparent abgerechnet.' },
    { t: 'Online-Termine', d: 'Buchung, Befunde und Rezepte digital verfügbar.' },
  ]});
  Object.assign(F, { serviceHighlights: [
    { t: 'Probetraining gratis', d: 'Jederzeit ohne Voranmeldung – einfach vorbeikommen.' },
    { t: 'Flexible Verträge', d: 'Monatlich kündbar, keine Mindestlaufzeit.' },
    { t: 'Alle Level', d: 'Vom Einsteiger bis zum Leistungssportler – für jeden das Richtige.' },
  ]});

  // --- timeline (about page history) ---
  Object.assign(R, { timeline: [
    { t: '1998', d: 'Nonna Carla und Nonno Antonio eröffnen die Trattoria in der Altstadt.' },
    { t: '2005', d: 'Erste Erwähnung im Falstaff – 12 Punkte für "ehrliche Küche".' },
    { t: '2015', d: 'Giulia übernimmt die Küche und bringt Naturweine ins Programm.' },
    { t: '2023', d: 'Umbau der Terrasse und neue Pasta-Manufaktur im Keller.' },
  ]});
  Object.assign(S, { timeline: [
    { t: '2009', d: 'Lisa Auer eröffnet ihr erstes Studio mit zwei Plätzen.' },
    { t: '2014', d: 'Umzug in die heutigen Räume – 120 m², 6 Arbeitsplätze.' },
    { t: '2019', d: 'Erweiterung um Kosmetik und Wellness-Bereich.' },
    { t: '2024', d: 'Online-Buchungssystem und neue Produktlinie.' },
  ]});
  Object.assign(Tr, { timeline: [
    { t: '1982', d: 'Gründung als Ein-Mann-Betrieb durch Hans Mayer senior.' },
    { t: '1995', d: 'Meisterbrief und Erweiterung auf Heizung & Sanitär.' },
    { t: '2008', d: 'Stefan Mayer übernimmt – Fokus auf Energieeffizienz.' },
    { t: '2022', d: '18 Mitarbeiter, Wärmepumpen-Spezialist und Lehrbetrieb.' },
  ]});
  Object.assign(H, { timeline: [
    { t: '1939', d: 'Urgroßvater Franz baut das Haus als Bergpension.' },
    { t: '1968', d: 'Erweiterung zum Hotel mit 20 Zimmern und Restaurant.' },
    { t: '2001', d: 'Neubau des Spa-Bereichs unter Elisabeth Waldner.' },
    { t: '2020', d: 'Sanierung aller Zimmer nach alpinem Designkonzept.' },
  ]});
  Object.assign(To, { timeline: [
    { t: '2012', d: 'Martin Hofer gründet "Alpenzeit" als Bergführer-Agentur.' },
    { t: '2016', d: 'Erstes eigenes Büro am Marktplatz und 5 feste Guides.' },
    { t: '2019', d: 'Ausbau zu Familien-Touren und Incentive-Events.' },
    { t: '2024', d: '60+ buchbare Erlebnisse in 4 Regionen.' },
  ]});
  Object.assign(C, { timeline: [
    { t: '1994', d: 'Dr. Klaus Hofer gründet die Kanzlei in München.' },
    { t: '2004', d: 'Erweiterung um Wirtschaftsprüfung und Rechtsberatung.' },
    { t: '2016', d: 'Markus Hofer übernimmt als geschäftsführender Partner.' },
    { t: '2023', d: 'Digitales Mandantenportal und Standort Innsbruck.' },
  ]});
  Object.assign(M, { timeline: [
    { t: '2019', d: 'Dr. Lena Lindner eröffnet die Praxis mit 30-Min.-Konzept.' },
    { t: '2021', d: 'Erweiterung um Akupunktur und Ernährungsmedizin.' },
    { t: '2023', d: 'Dr. Florian Lechner verstärkt das Team (Orthopädie).' },
    { t: '2025', d: 'Online-Terminbuchung und digitale Befundübermittlung.' },
  ]});
  Object.assign(F, { timeline: [
    { t: '2017', d: 'Max Berger eröffnet das Studio mit 400 m² Trainingsfläche.' },
    { t: '2019', d: 'Erweiterung auf 1.200 m² und Start des Kursprogramms.' },
    { t: '2022', d: 'Gesamtes Studio auf 1.800 m² mit Outdoor-Bereich.' },
    { t: '2025', d: '1.200+ aktive Mitglieder und 45 Kurse pro Woche.' },
  ]});

  // --- serviceProcess (steps on services page) ---
  Object.assign(R, { serviceProcess: [
    { t: 'Reservieren', d: 'Online, telefonisch oder spontan – wir finden immer einen Platz.' },
    { t: 'Genießen', d: 'Lassen Sie sich von der saisonalen Karte überraschen.' },
    { t: 'Wiederkommen', d: 'Stammgäste bekommen persönliche Empfehlungen und Events-Tipp.' },
  ]});
  Object.assign(S, { serviceProcess: [
    { t: 'Termin buchen', d: 'Online oder telefonisch – Wunschtermin wählen.' },
    { t: 'Beratung', d: 'Wir besprechen Ihren Stil und finden die passende Behandlung.' },
    { t: 'Ergebnis', d: 'Pflege-Tipps für zu Hause und Ihr nächster Termin.' },
  ]});
  Object.assign(Tr, { serviceProcess: [
    { t: 'Anfrage', d: 'Beschreiben Sie Ihr Anliegen – telefonisch oder per Formular.' },
    { t: 'Festpreis-Angebot', d: 'Wir kommen vorbei, prüfen und erstellen ein verbindliches Angebot.' },
    { t: 'Umsetzung', d: 'Termingerechte Ausführung mit Abnahme und Gewährleistung.' },
  ]});
  Object.assign(H, { serviceProcess: [
    { t: 'Anfragen', d: 'Wunschzeitraum und Zimmer online oder telefonisch wählen.' },
    { t: 'Bestätigung', d: 'Buchungsbestätigung mit Anreise-Infos innerhalb von 24h.' },
    { t: 'Ankommen', d: 'Check-in ab 15:00, persönliche Begrüßung und Zimmerführung.' },
  ]});
  Object.assign(To, { serviceProcess: [
    { t: 'Tour wählen', d: 'Online stöbern oder sich von uns beraten lassen.' },
    { t: 'Buchen', d: 'Datum, Gruppengröße und eventuelle Sonderwünsche angeben.' },
    { t: 'Erleben', d: 'Treffpunkt, Ausrüstung und Guide – alles organisiert.' },
  ]});
  Object.assign(C, { serviceProcess: [
    { t: 'Erstgespräch', d: 'Kostenlos und unverbindlich – persönlich oder per Video.' },
    { t: 'Analyse', d: 'Wir prüfen Ihre Situation und erarbeiten ein Konzept.' },
    { t: 'Umsetzung', d: 'Begleitung bis zum Ergebnis – mit klaren Meilensteinen.' },
  ]});
  Object.assign(M, { serviceProcess: [
    { t: 'Termin buchen', d: 'Online, telefonisch oder per App – meist innerhalb einer Woche.' },
    { t: 'Erstgespräch', d: '30 Minuten Zeit für Anamnese, Untersuchung und Fragen.' },
    { t: 'Therapie', d: 'Individueller Behandlungsplan mit Verlaufskontrolle.' },
  ]});
  Object.assign(F, { serviceProcess: [
    { t: 'Probetraining', d: 'Einfach vorbeikommen – kostenlos und ohne Voranmeldung.' },
    { t: 'Ziel-Gespräch', d: 'Wir besprechen Ihre Ziele und finden das passende Format.' },
    { t: 'Starten', d: 'Kursplan, Personal Training oder offenes Training – los gehts.' },
  ]});
})();

/** Showcase demo objects are patched in-place above — rebuild `pageBlocksV1` from final legacy fields. */
(function refreshDemoPageBlocksV1() {
  const coreTpl: Record<keyof typeof DEMO_CONTENT, TemplateKey> = {
    restaurant: 'restaurant',
    salon: 'salon',
    tradesman: 'tradesman',
    hotel: 'hotel',
    tourism: 'tourism',
  };
  for (const k of Object.keys(coreTpl) as Array<keyof typeof DEMO_CONTENT>) {
    DEMO_CONTENT[k] = mergeSiteContentWithBootstrappedPageBlocks(DEMO_CONTENT[k], coreTpl[k], 'classic');
  }
  const extraTpl: Record<keyof typeof EXTRA_DEMO_CONTENT, TemplateKey> = {
    consulting: 'consulting',
    medical: 'medical',
    fitness: 'fitness',
  };
  const extraMutable = EXTRA_DEMO_CONTENT as Record<keyof typeof EXTRA_DEMO_CONTENT, SiteContent>;
  for (const k of Object.keys(extraTpl) as Array<keyof typeof EXTRA_DEMO_CONTENT>) {
    extraMutable[k] = mergeSiteContentWithBootstrappedPageBlocks(
      EXTRA_DEMO_CONTENT[k],
      extraTpl[k],
      'classic',
    );
  }
})();

// ---------------------------------------------------------------------------
// Style overrides: per-branch × style differentiation for branchText,
// sectionOrder, and sectionVisibility so each of the 24 variants feels unique.
// ---------------------------------------------------------------------------

type StyleKey = 'classic' | 'modern' | 'bold';

const BRANCH_TEXT_BY_STYLE: Record<string, Partial<Record<StyleKey, Record<string, string>>>> = {
  restaurant: {
    modern: { heroEyebrow: 'Fine Dining Experience', aboutEyebrow: 'Unsere Geschichte', servicesEyebrow: 'Die Karte' },
    bold: { heroEyebrow: 'CUCINA AUTENTICA', manifestTitle: 'Kein Fast Food. Keine Kompromisse.', manifestBody: 'Wir kochen, wie unsere Großmutter es uns beigebracht hat – mit Feuer, mit Geduld, mit Liebe.' },
  },
  hotel: {
    modern: { heroEyebrow: 'Boutique Retreat', aboutEyebrow: 'Das Haus', servicesEyebrow: 'Zimmer & Suiten' },
    bold: { heroEyebrow: 'ALPINE LUXURY', manifestTitle: 'Ruhe ist kein Luxus.', manifestBody: 'Ruhe ist eine Entscheidung. Wir haben sie für Sie getroffen.' },
  },
  tourism: {
    modern: { heroEyebrow: 'Discover & Explore', aboutEyebrow: 'Wer wir sind', servicesEyebrow: 'Erlebnisse' },
    bold: { heroEyebrow: 'ABENTEUER WARTET', manifestTitle: 'Raus aus dem Alltag.', manifestBody: 'Berge. Seen. Erlebnisse, die bleiben.' },
  },
  salon: {
    modern: { heroEyebrow: 'Beauty & Wellness', aboutEyebrow: 'Unser Studio', servicesEyebrow: 'Treatments' },
    bold: { heroEyebrow: 'DEIN STYLE', manifestTitle: 'Schönheit beginnt mit Haltung.', manifestBody: 'Wir schneiden nicht nur Haare – wir kreieren Auftritte.' },
  },
  tradesman: {
    modern: { heroEyebrow: 'Meisterbetrieb', aboutEyebrow: 'Über uns', servicesEyebrow: 'Leistungen' },
    bold: { heroEyebrow: 'HANDWERK MIT HERZ', manifestTitle: 'Qualität, die man sieht.', manifestBody: 'Seit drei Generationen stehen wir für solide Arbeit und ehrliche Beratung.' },
  },
  consulting: {
    modern: { heroEyebrow: 'Strategy & Growth', aboutEyebrow: 'Unsere Expertise', servicesEyebrow: 'Beratungsfelder' },
    bold: { heroEyebrow: 'KLARTEXT STATT POWERPOINT', manifestTitle: 'Weniger Folien. Mehr Wirkung.', manifestBody: 'Wir beraten nicht – wir lösen.' },
  },
  medical: {
    modern: { heroEyebrow: 'Ihre Gesundheit', aboutEyebrow: 'Die Praxis', servicesEyebrow: 'Fachbereiche' },
    bold: { heroEyebrow: 'MEDIZIN MIT MENSCHLICHKEIT', manifestTitle: 'Zuhören. Verstehen. Heilen.', manifestBody: 'Moderne Diagnostik trifft auf menschliche Zuwendung.' },
  },
  fitness: {
    modern: { heroEyebrow: 'Train Smart', aboutEyebrow: 'Das Studio', servicesEyebrow: 'Programme' },
    bold: { heroEyebrow: 'KEINE AUSREDEN', manifestTitle: 'Dein Körper. Deine Entscheidung.', manifestBody: 'Wir pushen dich – ehrlich, hart, fair.' },
  },
};

const SECTION_ORDER_BY_STYLE: Partial<Record<StyleKey, Record<string, string[]>>> = {
  modern: {
    home: ['hero', 'about-teaser', 'services', 'gallery-teaser', 'testimonials', 'cta-band', 'contact-teaser'],
    services: ['intro', 'list', 'process', 'cta'],
    gallery: ['grid', 'categories'],
    about: ['story', 'team', 'timeline', 'values'],
    contact: ['form', 'map', 'hours'],
  },
  bold: {
    home: ['hero', 'manifest', 'services', 'gallery-teaser', 'testimonials', 'cta-band'],
    services: ['intro', 'list', 'cta', 'process'],
    gallery: ['grid', 'categories'],
    about: ['story', 'manifest', 'team', 'values'],
    contact: ['form', 'hours', 'map'],
  },
};

const SECTION_VISIBILITY_BY_STYLE: Partial<Record<StyleKey, Record<string, boolean>>> = {
  classic: { 'home:manifest': false, 'about:manifest': false },
  modern: { 'home:manifest': false, 'about:manifest': false, 'home:about-teaser': true },
  bold: { 'home:manifest': true, 'about:manifest': true, 'home:about-teaser': false },
};

/**
 * Applies per-branch × style overrides to a SiteContent object.
 * Used in the showcase to differentiate the 24 visual variants.
 */
export function applyStyleOverrides(content: SiteContent, branch: string, style: string): SiteContent {
  const s = style as StyleKey;
  const result = { ...content };

  // Apply branchText overrides
  const textOverrides = BRANCH_TEXT_BY_STYLE[branch]?.[s];
  if (textOverrides) {
    result.branchText = { ...result.branchText, ...textOverrides };
  }

  // Apply sectionOrder overrides
  const orderOverrides = SECTION_ORDER_BY_STYLE[s];
  if (orderOverrides) {
    result.sectionOrder = { ...result.sectionOrder, ...orderOverrides };
  }

  // Apply sectionVisibility overrides
  const visOverrides = SECTION_VISIBILITY_BY_STYLE[s];
  if (visOverrides) {
    result.sectionVisibility = { ...result.sectionVisibility, ...visOverrides };
  }

  return result;
}
