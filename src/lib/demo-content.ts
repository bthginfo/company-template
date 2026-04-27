import { SiteContentSchema, type SiteContent, type TemplateKey } from './types';

/**
 * Hard-coded demo content for the showcase site (preview pages).
 * In real customer deployments, content comes from the DB via /api/content.
 */
export const DEMO_CONTENT: Record<TemplateKey, SiteContent> = {
  restaurant: SiteContentSchema.parse({
    brand: { name: 'Trattoria Innsbruck', tagline: 'Authentisch · Saisonal · Familiengeführt', primaryColor: '#9a3412' },
    hero: {
      title: 'Italienische Küche im Herzen Tirols.',
      subtitle: 'Frische Pasta, Holzofen-Pizza und Weine, die Geschichten erzählen – seit 1998.',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Tisch reservieren',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Unsere Geschichte',
      body: 'Was als kleines Familienlokal begann, ist heute ein fester Bestandteil der Innsbrucker Genuss-Szene.\n\nUnser Geheimnis: regionale Zutaten, italienische Tradition und das Lachen am Tisch.',
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
    },
    services: [
      { title: 'Tagliatelle al Tartufo', description: 'Hausgemachte Tagliatelle, schwarzer Sommertrüffel, Parmigiano.', price: '24,90 €',
        imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80' },
      { title: 'Pizza Margherita DOP', description: 'San-Marzano-Tomaten, Büffelmozzarella, Basilikum, 48 h Teigführung.', price: '14,50 €',
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80' },
      { title: 'Saltimbocca alla Romana', description: 'Kalbsfilet, Parmaschinken, Salbei, Weißwein-Jus.', price: '28,50 €',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80' },
      { title: 'Tiramisu della Casa', description: 'Klassisch nach Großmutters Rezept.', price: '8,90 €',
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80' },
      { title: 'Risotto ai Funghi', description: 'Carnaroli-Reis, Steinpilze, Trüffelöl.', price: '22,50 €',
        imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80' },
      { title: 'Branzino al Forno', description: 'Wolfsbarsch in der Salzkruste, Zitrone, Kräuter.', price: '32,00 €',
        imageUrl: 'https://images.unsplash.com/photo-1535399831218-d4c2e6f4eba6?auto=format&fit=crop&w=900&q=80' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80',
    ],
    testimonials: [
      { author: 'Sabine M., Innsbruck', text: 'Die beste Pasta außerhalb Italiens. Atmosphäre wie bei Familie.' },
      { author: 'Markus W., München', text: 'Ein Geheimtipp – wir kommen jedes Mal wieder, wenn wir in Tirol sind.' },
      { author: 'Familie Berger', text: 'Tolles Essen, herzliche Bedienung, fairer Preis. Bravo!' },
    ],
    contact: {
      phone: '+43 512 123 4567', email: 'reservierung@trattoria-innsbruck.at',
      address: 'Maria-Theresien-Straße 42', city: '6020 Innsbruck',
      hours: [
        { day: 'Mo–Fr', time: '11:30–14:00 · 17:30–22:00' },
        { day: 'Sa', time: '17:30–23:00' },
        { day: 'So', time: 'Ruhetag' },
      ],
      mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.6037830876796!2d11.39!3d47.27!2m3!1f0!2f0!3f0',
    },
  }),

  salon: SiteContentSchema.parse({
    brand: { name: 'Studio Lumière', tagline: 'Hair · Beauty · Wellness', primaryColor: '#be185d' },
    hero: {
      title: 'Ihr Look. Unser Handwerk.',
      subtitle: 'Hochwertige Produkte, individuelle Beratung und Stylist:innen, die Ihre Vision verstehen.',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Termin buchen',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Über Studio Lumière',
      body: 'Mitten in München-Schwabing erwartet Sie ein Salon, in dem Stil, Pflege und Wohlbefinden zu Hause sind.\n\nUnser Team aus erfahrenen Stylist:innen verwöhnt Sie in einer Atmosphäre, die Sie zum Strahlen bringt.',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    },
    services: [
      { title: 'Damen-Schnitt inkl. Waschen & Styling', description: 'Schultelang oder kürzer – inkl. Beratung.', price: '65 €' },
      { title: 'Herren-Schnitt klassisch', description: 'Schnitt, Wäsche und Finish.', price: '38 €' },
      { title: 'Färben & Strähnen', description: 'Hochwertige Pflegeprodukte, individuelle Farbtöne.', price: 'ab 89 €' },
      { title: 'Balayage', description: 'Weiche Farbverläufe, dezent oder ausdrucksstark.', price: 'ab 145 €' },
      { title: 'Maniküre Shellac', description: 'Hochglanz, bis zu 3 Wochen haltbar.', price: '45 €' },
      { title: 'Augenbrauen-Styling', description: 'Form, Färbung, Pflege.', price: '28 €' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1554519515-242161756769?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=600&q=80',
    ],
    testimonials: [
      { author: 'Lisa K., München', text: 'Endlich ein Salon, dem ich zu 100 % vertraue. Wunderschön!' },
      { author: 'Andrea P.', text: 'Tolle Beratung und immer ein Erlebnis – fühl mich wie ein neuer Mensch.' },
    ],
    contact: {
      phone: '+49 89 1234 5678', email: 'hello@studio-lumiere.de',
      address: 'Leopoldstraße 28', city: '80802 München',
      hours: [
        { day: 'Di–Fr', time: '09:00–19:00' },
        { day: 'Sa', time: '09:00–15:00' },
        { day: 'So + Mo', time: 'Geschlossen' },
      ],
      mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663!2d11.58!3d48.16',
    },
  }),

  tradesman: SiteContentSchema.parse({
    brand: { name: 'Mayer & Söhne Installateure', tagline: 'Ihr Meisterbetrieb seit 1972', primaryColor: '#1d4ed8' },
    hero: {
      title: 'Schnell. Sauber. Zuverlässig.',
      subtitle: 'Über 50 Jahre Erfahrung in Installation, Sanitär und Heizungstechnik – vom kleinen Notfall bis zur Großsanierung.',
      imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=2000&q=80',
      ctaLabel: 'Kostenlos anfragen',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Drei Generationen Handwerk',
      body: 'Was 1972 als kleiner Familienbetrieb in Ingolstadt begann, ist heute ein moderner Meisterbetrieb mit 18 Mitarbeiter:innen.\n\nWir glauben an ehrliche Arbeit, faire Preise und Lösungen, die halten.',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1200&q=80',
    },
    services: [
      { title: 'Notdienst & Reparaturen', description: 'Rohrbruch, Heizungsausfall, verstopfte Leitung – wir sind in 60 Minuten bei Ihnen.', price: '79 €' },
      { title: 'Badsanierung', description: 'Komplettsanierung mit eigener Planung. Festpreis-Garantie.', price: 'auf Anfrage' },
      { title: 'Heizungsmodernisierung', description: 'Wärmepumpe, Pellets, Hybrid – wir beraten Sie zu Förderungen.', price: 'auf Anfrage' },
      { title: 'Solarthermie & PV', description: 'Komplettpaket inkl. Anmeldung und Inbetriebnahme.', price: 'auf Anfrage' },
      { title: 'Wartung & Service', description: 'Jährliche Wartung Ihrer Heizung – inkl. Sicherheitsprüfung.', price: 'ab 149 €' },
      { title: 'Smart-Home', description: 'Heizung, Wasser, Lüftung intelligent gesteuert.', price: 'auf Anfrage' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1585129777188-7fd4ed0db75d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=80',
    ],
    testimonials: [
      { author: 'Familie Huber, Ingolstadt', text: 'Termin pünktlich eingehalten, Preis exakt wie im Angebot. Ehrliche Arbeit.' },
      { author: 'Stefan G.', text: 'Rohrbruch um 22 Uhr – um Mitternacht war alles trocken und repariert. Klare Empfehlung.' },
      { author: 'Bauunternehmen Wagner', text: 'Verlässlicher Partner für unsere Bauprojekte seit Jahren.' },
    ],
    contact: {
      phone: '+49 841 9876 543', email: 'info@mayer-soehne.de',
      address: 'Schulstraße 14', city: '85049 Ingolstadt',
      hours: [
        { day: 'Mo–Fr', time: '07:00–17:00' },
        { day: 'Notdienst', time: '24 / 7' },
      ],
      mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2598!2d11.42!3d48.76',
    },
  }),
};
