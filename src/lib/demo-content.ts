import { SiteContentSchema, type SiteContent } from './types';

/**
 * Demo content for the showcase preview pages.
 */
export const DEMO_CONTENT: Record<'restaurant' | 'salon' | 'tradesman', SiteContent> = {
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
      mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2598!2d11.42!3d48.76',
    },
    social: {
      whatsapp: '+498419876543',
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
      subtitle: 'Wir beraten mittelständische Unternehmen in Steuer-, Wirtschafts- und Strategiefragen – seit 1994. Ehrlich, gründlich, persönlich.',
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
      subtitle: 'Hausärztliche Versorgung in Innsbruck-Saggen mit Termin – ohne Hetze, ohne Wartezimmer-Marathon. Schulmedizin und sanfte Verfahren in einer Praxis.',
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
      subtitle: 'Ein kleines Studio in München-Glockenbach mit großen Fenstern, viel Holz und Lehrer:innen, die Sie nicht aus den Augen verlieren. Maximal acht Personen pro Kurs.',
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
