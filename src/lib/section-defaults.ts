/**
 * Section defaults shared between the admin editor (live overlay defaults)
 * and the tenant provisioning script (DB seed values).
 *
 * Keeping a single source of truth means a freshly provisioned tenant has the
 * exact same out-of-the-box content the admin shows in placeholder mode — no
 * silent drift between "what the admin pre-fills" and "what the DB contains".
 */

export type FullTemplateKey = 'restaurant' | 'salon' | 'tradesman' | 'hotel' | 'tourism';
export type AnyTemplateKey = FullTemplateKey | 'consulting' | 'medical' | 'fitness' | 'wedding';

export type GalleryStory = {
  eyebrow: string;
  title: string;
  body: string;
  captions: { t: string; d: string }[];
};

export function defaultGalleryStory(t: AnyTemplateKey): GalleryStory {
  if (t === 'restaurant') return {
    eyebrow: 'Hinter den Tellern',
    title: 'Was Sie hier sehen.',
    body: 'Diese Bilder entstehen nicht im Studio. Sie zeigen unseren echten Service – die Hand am Stiel, das Brot vor dem Schneiden, den Tisch zwei Minuten vor den ersten Gästen. Wir fotografieren beim Kochen, nicht für die Karte.',
    captions: [
      { t: 'Im Service', d: 'Momente, wenn das Lokal lebt – nicht inszenierte Stilllebenkomposition.' },
      { t: 'Aus der Küche', d: 'Wie ein Gericht entsteht, vom Mise en Place bis zum letzten Schwung Olivenöl.' },
      { t: 'Familie & Gäste', d: 'Mit Erlaubnis aufgenommen – die Menschen, die unser Lokal jeden Abend tragen.' },
    ],
  };
  if (t === 'salon') return {
    eyebrow: 'Was wir zeigen',
    title: 'Looks aus echten Terminen.',
    body: 'Jedes Foto ist nach einem realen Termin entstanden – mit Erlaubnis unserer Kund:innen, ohne Filter, ohne Studio-Licht. Sie sehen den Look, den Sie auch bekämen, nicht eine Inszenierung für Social Media.',
    captions: [
      { t: 'Schnitt', d: 'Vom klassischen Bob bis zur freien Layered-Cut.' },
      { t: 'Farbe', d: 'Balayage, Gloss, Naturtöne – immer auf das Tageslicht abgestimmt.' },
      { t: 'Bridal & Events', d: 'Hochsteckfrisuren, Probestyling, Tag der Hochzeit – auf Wunsch mit Make-up.' },
    ],
  };
  if (t === 'tradesman') return {
    eyebrow: 'Vorher / Nachher',
    title: 'Projekte ohne Schönfärberei.',
    body: 'Wir dokumentieren Baustellen so, wie sie sind: dreckig in der Mitte, sauber am Ende. Jede Galerie zeigt mindestens ein Foto vor dem ersten Werkzeug – und eines nach der Endreinigung. Damit Sie sehen, was wir wirklich verändert haben.',
    captions: [
      { t: 'Vorher', d: 'Der Zustand, der uns zur Tür bringt – ungeschönt und mit Datum.' },
      { t: 'Im Bau', d: 'Schutzfolie, Werkzeug, Material. Der Alltag, den wir sauber halten.' },
      { t: 'Nachher', d: 'Endreinigung, Übergabe, fertige Räume – Lichtsetzung wie vor Ort.' },
    ],
  };
  if (t === 'hotel') return {
    eyebrow: 'Haus, Spa & Umgebung',
    title: 'So sieht Ihr Aufenthalt aus.',
    body: 'Wir zeigen das Haus, wie Sie es vorfinden – nicht hochgerechnet, nicht aufgehübscht. Die Bilder entstehen über das Jahr verteilt, im echten Licht, mit dem echten Frühstück und der echten Sauna an einem Mittwoch um halb elf.',
    captions: [
      { t: 'Zimmer & Suiten', d: 'Wie Sie das Zimmer vorfinden – Tagesdecke, Tee, ohne Werbestyling.' },
      { t: 'Spa & Sauna', d: 'Außenpool, Dampfbad, Ruheräume. In Tageslicht statt Marketingfilter.' },
      { t: 'Restaurant & Lounge', d: 'Frühstück, Halbpension, Aperitif vor dem Kamin.' },
    ],
  };
  if (t === 'tourism') return {
    eyebrow: 'Unterwegs',
    title: 'Was eine Tour wirklich bedeutet.',
    body: 'Diese Bilder sind auf echten Touren entstanden – kein Modell, kein Studio. Sie sehen die Pausen, die Aussichten, die kleinen Gruppen. Wir zeigen, wie der Tag wirklich aussieht, nicht wie der schönste Postkartenmoment.',
    captions: [
      { t: 'Auf dem Weg', d: 'Wanderungen, Aussichten, der Moment vor dem letzten Anstieg.' },
      { t: 'Pausen', d: 'Brotzeit auf einer Bank, Gespräch mit dem Guide, ein Schluck Wasser.' },
      { t: 'Begegnungen', d: 'Menschen, Hütten, Tiere – die Gegend, in der wir zuhause sind.' },
    ],
  };
  return {
    eyebrow: 'Eindrücke',
    title: 'Was Sie hier sehen.',
    body: 'Eine Auswahl unserer Arbeit – aus echten Tagen, mit echten Menschen, ohne Studio-Inszenierung.',
    captions: [
      { t: 'Aktuelle Arbeit', d: 'Was uns gerade beschäftigt.' },
      { t: 'Hinter den Kulissen', d: 'Der Alltag, den Sie sonst nicht sehen.' },
      { t: 'Mit Erlaubnis', d: 'Alle Personen-Fotos mit Einverständnis aufgenommen.' },
    ],
  };
}

export function defaultGalleryCategories(t: AnyTemplateKey): { t: string; d: string }[] {
  if (t === 'restaurant') return [
    { t: 'Vorspeisen & Beilagen', d: 'Antipasti, hausgemachtes Brot, Aufstriche und kleine Klassiker zum Teilen.' },
    { t: 'Hauptgerichte', d: 'Pasta, Fisch, Fleisch und vegetarische Tellergerichte – saisonal kuratiert.' },
    { t: 'Dessert & Digestif', d: 'Tiramisu, Panna Cotta, hausgemachte Liköre – das süße Finale am Tisch.' },
  ];
  if (t === 'salon') return [
    { t: 'Schnitt', d: 'Klassische Cuts, Layered Long Bob, präzise Männer-Cuts mit Bartpflege.' },
    { t: 'Farbe', d: 'Balayage, Highlights, Gloss-Behandlung und natürliche Naturtöne.' },
    { t: 'Bridal & Events', d: 'Hochsteckfrisuren, Probestyling und der Tag der Hochzeit – aus einer Hand.' },
  ];
  if (t === 'tradesman') return [
    { t: 'Bad & Sanitär', d: 'Komplett-Sanierungen, barrierearme Lösungen, schnelle Notfall-Reparaturen.' },
    { t: 'Heizung & Energie', d: 'Wärmepumpen, Heizungstausch, Förderprogramm-Beratung inklusive.' },
    { t: 'Reparaturen & Wartung', d: 'Wasserrohrbruch, verstopfte Abflüsse, Jahresservice – schnell und sauber.' },
  ];
  if (t === 'hotel') return [
    { t: 'Zimmer & Suiten', d: 'Doppelzimmer, Familiensuite und unsere Panorama-Suite mit Bergblick.' },
    { t: 'Spa & Wellness', d: 'Sauna-Landschaft, Dampfbad, Ruheräume und der beheizte Außenpool.' },
    { t: 'Außenanlage', d: 'Garten, Liegewiese, Sonnenterrasse und unsere Wanderwege direkt vor der Tür.' },
  ];
  if (t === 'tourism') return [
    { t: 'Tagestouren', d: 'Halbtägige Wanderungen, kulinarische Stadt-Touren, Sonnenaufgangs-Programme.' },
    { t: 'Mehrtägige Touren', d: 'Hütten-zu-Hütten-Wanderungen, Wein-Routen und Natur-Retreats.' },
    { t: 'Privat & Maßgeschneidert', d: 'Eigene Gruppen, Firmen-Events und individuelle Tour-Konzepte.' },
  ];
  return [
    { t: 'Aktuelles', d: 'Die jüngsten Projekte und Highlights.' },
    { t: 'Klassiker', d: 'Was uns langfristig begleitet.' },
    { t: 'Auf Anfrage', d: 'Individuelle Aufträge auf Wunsch.' },
  ];
}

export function defaultArrival(t: AnyTemplateKey): { t: string; d: string }[] {
  if (t === 'restaurant') return [
    { t: 'Mit dem Auto', d: 'Parkmöglichkeiten in unmittelbarer Nähe.' },
    { t: 'Mit der Bahn', d: 'Wenige Gehminuten vom Bahnhof entfernt.' },
    { t: 'Barrierefrei', d: 'Hauptraum ebenerdig.' },
  ];
  if (t === 'salon') return [
    { t: 'Anfahrt', d: 'Öffentlich gut erreichbar – wenige Minuten zu Fuß vom nächsten Halt.' },
    { t: 'Parken', d: 'Parkmöglichkeiten in der Nähe.' },
    { t: 'Termin verlegen', d: 'Bis 24 h vorher gerne kostenlos.' },
  ];
  if (t === 'hotel') return [
    { t: 'Mit dem Auto', d: 'Hauseigene Tiefgarage, Ladestationen für E-Autos verfügbar.' },
    { t: 'Mit der Bahn', d: 'Shuttle ab Hauptbahnhof auf Voranmeldung.' },
    { t: 'Check-in', d: 'Ab 15:00 Uhr. Frühere Ankunft? Wir lagern Ihr Gepäck gerne.' },
  ];
  if (t === 'tourism') return [
    { t: 'Treffpunkt', d: 'Hauptbahnhof oder hauseigenes Büro – Details mit der Buchungsbestätigung.' },
    { t: 'Transfer', d: 'Mehrtägige Touren ab Hotel oder Bahnhof. Auf Wunsch mit Kleinbus.' },
    { t: 'Beratung', d: 'Sie wissen nicht, welche Tour passt? Wir telefonieren gerne 15 Minuten unverbindlich.' },
  ];
  return [
    { t: 'Notdienst', d: 'Rund um die Uhr erreichbar.' },
    { t: 'Anfahrtsgebiet', d: 'Im Großraum und Umkreis.' },
    { t: 'Beratung vor Ort', d: 'Erstgespräch kostenlos.' },
  ];
}
