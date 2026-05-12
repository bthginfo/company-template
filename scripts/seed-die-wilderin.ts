/**
 * Seed script for "die Wilderin" (Restaurant, Innsbruck) — real-world demo tenant.
 *
 * Source material: public pages on https://www.diewilderin.at/ (crawl April 2026)
 *  + Speisekarte from owner-supplied data.
 *
 * Strategy:
 *  - Hotlink real images from www.diewilderin.at/wp-content/uploads/* (wir nehmen nur die URL).
 *  - Use 'olive' theme preset (PRESETS.restaurant) for the green classic palette.
 *  - Fill *every* sub-page (home, speisekarte/services, galerie, ueber-uns, kontakt, news).
 *  - Speisekarte uses the new optional `priceLabel` per category for "Achterl | Flasche" etc.
 *
 * Usage:
 *   tsx scripts/seed-die-wilderin.ts
 *   tsx scripts/seed-die-wilderin.ts --reset    # forces overwrite of existing siteContent
 */
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { db, schema } from '../src/lib/db/client';
import { SiteContentSchema, type SiteContent } from '../src/lib/types';
// section-defaults removed in v2 \u2014 use empty defaults for now
const defaultGalleryStory = (_k: any) => [];
const defaultArrival = (_k: any) => ({ title: '', body: '', imageUrl: '' });

const SLUG = 'die-wilderin';
const NAME = 'die Wilderin';
const TEMPLATE = 'restaurant';
const RESET = process.argv.includes('--reset');

// ────────────────────────────────────────────────────────────────────
// Hotlinked images from diewilderin.at (real photos)
// ────────────────────────────────────────────────────────────────────
const IMG = {
  hero: 'https://www.diewilderin.at/wp-content/uploads/2026/04/HPKW_18-880x390.jpg',
  reservieren: 'https://www.diewilderin.at/wp-content/uploads/2024/10/Reservieren-1-1024x624.jpg',
  faschiertes: 'https://www.diewilderin.at/wp-content/uploads/2013/05/faschiertes1-768x1024.jpg',
  tartar: 'https://www.diewilderin.at/wp-content/uploads/2014/04/Tartar-1-768x576.jpg',
  suppe: 'https://www.diewilderin.at/wp-content/uploads/2024/11/Suppe-768x576.jpg',
  schokoküchlein: 'https://www.diewilderin.at/wp-content/uploads/2022/04/Schokokuechlein-768x576.jpg',
  kaffee: 'https://www.diewilderin.at/wp-content/uploads/2015/12/kaffee-768x512.jpg',
  cremant: 'https://www.diewilderin.at/wp-content/uploads/2014/02/cremant-768x576.jpg',
  rum: 'https://www.diewilderin.at/wp-content/uploads/2014/01/Rum-768x576.jpg',
  krautinger: 'https://www.diewilderin.at/wp-content/uploads/2014/11/Krautinger-768x1024.jpg',
  barhocker: 'https://www.diewilderin.at/wp-content/uploads/2015/04/Barhocker-768x576.jpg',
  garteln: 'https://www.diewilderin.at/wp-content/uploads/2016/03/Garteln-768x432.jpg',
  wanda: 'https://www.diewilderin.at/wp-content/uploads/2013/05/wanda1-768x363.jpg',
  charity: 'https://www.diewilderin.at/wp-content/uploads/2022/04/Charity-Weine-768x576.jpeg',
  lisi: 'https://www.diewilderin.at/wp-content/uploads/2022/04/Lisi-768x576.jpeg',
  gollenz: 'https://www.diewilderin.at/wp-content/uploads/2020/11/weingut-gollenz_4-1024x1024.jpg',
  uibel: 'https://www.diewilderin.at/wp-content/uploads/2020/11/leo-uibel_1.jpeg',
  kraft: 'https://www.diewilderin.at/wp-content/uploads/2020/11/weingut-kraft_2-1024x1024.jpg',
  ernst: 'https://www.diewilderin.at/wp-content/uploads/2021/02/Weingut-Ernst-1-1024x1024.jpg',
  steindorfer: 'https://www.diewilderin.at/wp-content/uploads/2020/11/weingut-steindorfer_1-1024x1024.jpg',
  // team
  team: {
    michael: 'https://www.diewilderin.at/wp-content/uploads/2024/01/mk_S1_8752HP-683x1024.jpeg',
    viktoria: 'https://www.diewilderin.at/wp-content/uploads/2024/01/viktoria_S1_0181HP-683x1024.jpeg',
    kadda: 'https://www.diewilderin.at/wp-content/uploads/2024/01/kadda_S1_8937HP-683x1024.jpeg',
    laurids: 'https://www.diewilderin.at/wp-content/uploads/2024/01/Laurids_S1_0012HP-683x1024.jpeg',
    amelie: 'https://www.diewilderin.at/wp-content/uploads/2024/01/amelie_S1_8999HP-683x1024.jpeg',
    lukas: 'https://www.diewilderin.at/wp-content/uploads/2024/01/lukas_S1_9985HP-683x1024.jpeg',
    seekay: 'https://www.diewilderin.at/wp-content/uploads/2024/01/seekay_S1_0084_HP-683x1024.jpeg',
    yvonne: 'https://www.diewilderin.at/wp-content/uploads/2024/08/Yvonne-HP-683x1024.jpeg',
    paul: 'https://www.diewilderin.at/wp-content/uploads/2025/12/Paul-HP-683x1024.jpeg',
    simon: 'https://www.diewilderin.at/wp-content/uploads/2025/12/Simon-HP-683x1024.jpeg',
    stefano: 'https://www.diewilderin.at/wp-content/uploads/2025/12/Stefano-HP-683x1024.jpeg',
    viktor: 'https://www.diewilderin.at/wp-content/uploads/2025/12/Viktor-HP-683x1024.jpg',
  },
};

// ────────────────────────────────────────────────────────────────────
// Speisekarte (16 Kategorien, Daten vom Inhaber geliefert)
// ────────────────────────────────────────────────────────────────────
const MENU = [
  {
    category: 'Vorspeisen & Zwischengerichte',
    description: 'Aus der Region, mit Namen der Bauern. Achten Sie auf das Detail – jede Zutat hat eine Geschichte.',
    items: [
      { name: 'gnocchi', description: 'hokkaido Biohof Lumperer · Fritzens · erdäpfel · palmkohl · ziegenfrischkäse', price: '20' },
      { name: 'tartar', description: 'hochland kuh barbie · 16yo · birgit böhm · wanderhennenei', price: '19,5' },
      { name: 'matjes', description: 'renken fischerei zwerger · walchensee · belugalinsen · erdäpfel · velouté', price: '19,5' },
      { name: 'haflingerfohlen', description: 'edi rauth · leutasch · räucheraal · mayo · kapern', price: '19,5' },
      { name: 'suppe mit sinn', description: 'kürbis biohof lumperer · absam · erdäpfel · kürbiskerne', price: '14' },
    ],
  },
  {
    category: 'Hauptspeisen',
    items: [
      { name: 'minutensteak', description: 'haflingerfohlen edi rauth · leutasch · palmkohl · brokkoli · einkorn', price: '33' },
      { name: 'beuschl', description: 'duroc schweindl martin stankwalder · imst · rahm · karotten · blechknödl', price: '30' },
      { name: 'third plate', description: 'kürbis sinngemüse · oberhofen · belugalinsen · chinakohl · saibling', price: '34' },
      { name: 'faschiertes laberl', description: 'hochland kuh barbie · 16yo · birgit böhm · rahm · flower sprouts · stielmus · erdäpfl', price: '31' },
      { name: 'spinat sinngemüse', description: 'oberhofen · wanderhennenei · soja · apfel · buchweizen · béchamel · erdäpfel', price: '30' },
    ],
  },
  {
    category: 'Desserts',
    items: [
      { name: 'küchlein', description: 'tiroler edle hansjörg haag · landeck · kürbiskerne · vanille · rosmarin', price: '13' },
      { name: 'cantucci', description: 'haselnuss familie bödd · deutsch-wagram · zabaglione · ingwergrün', price: '13' },
    ],
  },
  {
    category: 'Aperitif',
    items: [
      { name: 'Bitterschön bio-alkoholfrei', description: '0,25 l', price: '7,5' },
      { name: 'Crémant G.V. Paul', description: 'Bott Frères · 0,125 l', price: '8,5' },
      { name: 'Crémant Rosé Brut', description: 'Bott Frères · 0,125 l', price: '9,5' },
      { name: 'Wermut', description: 'Amoaro | Golenz | Lõmut · 5cl', price: '6,5' },
      { name: 'Super Cattivo Tonic', description: '', price: '9' },
    ],
  },
  {
    category: 'Bier',
    items: [
      { name: 'Murauer · Tiroler', description: '0,33 l', price: '3,9' },
      { name: 'Schönramer Hell', description: 'Flascherl', price: '4,5' },
      { name: 'Augustiner edelstoff', description: 'Flascherl', price: '5' },
      { name: 'Gögginger zwickl · Schönramer pils', description: 'Flascherl', price: '5' },
      { name: 'Bierol net 11', description: 'Flascherl', price: '6,5' },
      { name: 'Bierol mountain pale ale', description: 'Flascherl', price: '8,5' },
      { name: 'Schönramer Weizen', description: 'Flascherl', price: '5,9' },
    ],
  },
  {
    category: 'Weißwein',
    priceLabel: 'Achterl · Flasche',
    items: [
      { name: 'Grüner Veltliner', description: "Zillial · '23", price: '4,3 · 26' },
      { name: 'Welschriesling', description: "Gollenz · '23", price: '4,7 · 28' },
      { name: 'Neuburger Feenlake', description: "Pomell · '22", price: '5,3 · 32' },
      { name: 'Sauvignon Blanc', description: "Kirnbauer · '23", price: '5,3 · 32' },
      { name: 'Furmint Heckenkrause', description: "Kraft · '23", price: '5,7 · 34' },
      { name: 'Weißburgunder Seeberg', description: "Kogler · '23", price: '6 · 36' },
      { name: 'Gelber Muskateller', description: "Gollenz · '23", price: '6,3 · 38' },
      { name: 'Gemischter Satz DAC', description: "Fuchs-St. · '23", price: '6,3 · 38' },
      { name: 'Morillon', description: "Albrecher · '23", price: '6,3 · 38' },
      { name: 'Grüner Veltliner Ebnern', description: "Uibel · '22", price: '6,7 · 40' },
      { name: 'Riesling Smaragd', description: "Aichinger · '22", price: '6,7 · 40' },
      { name: 'Grüner Veltliner Kremstal DAC', description: "Toifl · '23", price: '7 · 42' },
      { name: 'Sauvignon Blanc', description: "Thell | Weber · '23", price: '7,7 · 46' },
      { name: 'Chardonnay Alter Reben Lehmboden', description: "Rücker · '21", price: '8,3 · 50' },
      { name: 'Alter Weisser', description: 'diverse Winzerschätze', price: '9,3 · –' },
    ],
  },
  {
    category: 'Rotwein',
    priceLabel: 'Achterl · Flasche',
    items: [
      { name: 'Blaufränkisch', description: "Ernst · '23", price: '5,3 · 32' },
      { name: 'Pinot Noir', description: "Dachauer · '20", price: '5,7 · 34' },
      { name: 'Zeta Cuvée Fünfer', description: "ZW+ME+CS · Zilliel · '20", price: '6 · 36' },
      { name: 'Zweigelt Zincal Zinic', description: "Wiederstein · '23", price: '7 · 42' },
      { name: 'Merlot Solution', description: "Steindorfer · '21", price: '7,7 · 46' },
      { name: 'St. Laurent Frauenfeld Reserve', description: "Dachauer · '18", price: '8 · 48' },
      { name: 'Syrah Solution', description: "Steindorfer · '22", price: '8 · 48' },
      { name: 'Frauenfeld Cuvée', description: "CS+ME+SY · Dachauer · '18", price: '8,3 · 50' },
      { name: 'Tannat Maria B.', description: "Kraft · '22", price: '8,7 · 52' },
      { name: 'Cabernet Sauvignon', description: "Weber · '22", price: '9 · 54' },
      { name: 'Blaufränkisch Hochberg', description: "Ernst · '21", price: '9,3 · 56' },
      { name: 'Malbec Selec.', description: "Kraft · '20", price: '9,3 · 56' },
    ],
  },
  {
    category: 'Rosé',
    priceLabel: 'Achterl · Flasche',
    items: [
      { name: 'Rosé Blaufränkisch', description: "Ernst · '22", price: '5,3 · 32' },
      { name: 'Schilcher Blauer Wildbacher', description: "Machater · '22", price: '5,7 · 34' },
    ],
  },
  {
    category: 'Alkoholfreies',
    priceLabel: '0,25 / 0,33 · 0,5 / 1,0 l',
    items: [
      { name: 'Mineralwasser', description: '0,33 l · 1,0 l', price: '2 · 4' },
      { name: 'Soda Verjus (öko)', description: '0,25 l · 0,5 l', price: '2 · 3' },
      { name: 'Bio-Apfelsaft G.A. Riede', description: 'pur/soda · 0,25 l · 0,5 l', price: '2,5 · 3,5' },
      { name: 'Marillennektar Fam. Schwarz soda', description: '0,25 l · 0,5 l', price: '2,5 · 3,5' },
      { name: 'Schartner Bombe orange | zitrone', description: '0,25 l', price: '3' },
      { name: 'Almdudler · Tirola Kola', description: '0,33 l', price: '3,5' },
      { name: "Claudia's Saftlädelsäfte", description: 'diverse natursäfte · 0,2 l', price: '4,5' },
      { name: 'Latschen-Limo · Zirben-Limo MKB', description: '0,5 l', price: '4,5' },
      { name: 'Bitter Lemon · Ginger Ale · Spicy Ginger · Tonic Water', description: '', price: '5' },
      { name: 'Makava', description: '0,33 l', price: '5' },
    ],
  },
  {
    category: 'Gin',
    priceLabel: '2 cl',
    description: 'Ginspira · Innstruck · Harton · Burgenland · Löwen · Vorarlberg · Pannonischer Burgenland · Roter Turm · Osttirol · Sun Salzburg · The Duke München · The Rare Potatoe Gin NÖ · Vetterhof Vorarlberg · Xi Gin Vorarlberg · Wacholderbär Steiermark',
    items: [
      { name: 'Gin (Auswahl)', description: 'siehe oben – einheitlicher Preis pro Sorte', price: '4,5' },
    ],
  },
  {
    category: 'Rum',
    priceLabel: '2 cl',
    description: 'Abuelo 12 años · Aldea Familia 2001 · Conde de Cuba 11 · Malteco 10 años · Prohibido 12 años · Penny Blue XO · Santa Teresa · Santiago 11 años · Tres Hombres Dominicano · Zacapa Solera Reserva 1993',
    items: [
      { name: 'Rum (Auswahl)', description: 'siehe oben – einheitlicher Preis pro Sorte', price: '6' },
    ],
  },
  {
    category: 'Vodka · Whisky · Tequila',
    priceLabel: '2 cl',
    items: [
      { name: "Lion's", description: 'Vodka', price: '4' },
      { name: 'Edradour 10Y · Kilchoman Machir Bay · Springbank 10Y', description: 'Whisky', price: '6' },
      { name: 'Journeyman Rye Whiskey · Inicio Añejo', description: 'Whisky · Tequila', price: '7' },
    ],
  },
  {
    category: 'Bitters',
    priceLabel: '2 cl',
    items: [
      { name: 'Mariazeller Kräuter · Mariazeller Kräuterlikör', description: '', price: '5' },
      { name: 'Fernet Hunter · Petrus Boonekamp', description: '', price: '5' },
      { name: 'Kalé · Gran Classico Bitter · Pastis', description: '', price: '5' },
    ],
  },
  {
    category: 'Dessertwein',
    priceLabel: '5 cl',
    items: [
      { name: 'Beerenauslese WR+GV', description: "Zilliel · '18", price: '8' },
    ],
  },
  {
    category: 'Edelbrände',
    priceLabel: '2 cl',
    items: [
      { name: 'Krautinger', description: 'Salzhamaf', price: '5' },
      { name: 'Birne · Kronprinz Rudolf', description: '', price: '5' },
      { name: 'Meisterwurz · Zwetschke', description: 'Zalesky', price: '5' },
      { name: 'Absinth · Randig', description: 'Löwen · Vetterhof', price: '6' },
      { name: 'Haselnuss · Ingwer', description: 'Parzmair · Zalesky', price: '6' },
      { name: 'Marc de Bourgogne', description: "L'Authentique Jacoulot", price: '6' },
    ],
  },
  {
    category: 'Warmes',
    items: [
      { name: 'Kaffee', description: 'Brennpunkt Kaffee Innsbruck', price: '2,5' },
      { name: 'Tee', description: '', price: '2,5' },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────
// Build SiteContent
// ────────────────────────────────────────────────────────────────────
function buildContent(): SiteContent {
  const raw: any = {
    brand: {
      name: NAME,
      tagline: 'Unser Zugang zur alpinen Kulinarik',
      logoUrl: '',
      primaryColor: '#3f6212',
      hideName: false,
      themePresetId: 'olive',
    },
    hero: {
      title: 'Wild ist nicht normal.',
      subtitle: 'Alpine Kulinarik · regional · saisonal · nachhaltig.',
      body: 'Bei uns kommt das ganze Tier auf den Teller, nicht nur das Filet. Carpaccio von der alten Kuh, Wildfleisch im Herbst, Wurzelgemüse im Winter — kein Industriestandard, sondern echte Geschichten von Bauern, die wir mit Namen kennen. Reservierung bitte per Telefon oder E-Mail. Old school, aber so passt es.',
      imageUrl: IMG.hero,
      ctaLabel: 'Tisch reservieren',
      ctaHref: '/kontakt',
    },
    about: {
      title: 'Warum wir sind, wie wir sind.',
      body: [
        'die Wilderin ist Innsbrucks erste Wirtin der „Sammler-und-Jäger"-Bewegung. Wir suchen, jagen und finden — auf Höfen, Märkten und Almen — die besten Zutaten der Region. Was alpin wächst, kommt auf den Teller. Erdbeeren im Winter? Nicht bei uns.',
        'Wir verarbeiten ganze Tiere. Carpaccio von einer Kuh mit Namen, die 16 Jahre gelebt hat — kein Industriefilet ohne Herkunft. Das schmeckt anders, das schmeckt nach etwas. Und es bedeutet, dass wir Beuschl, Tartar, Faschiertes und Edelteile gleichberechtigt feiern.',
        'Reservierung: Old School. Telefon oder E-Mail. Wer vorbeikommt, gehört zur Familie. #ytftlme #knowyourfarmers',
      ].join('\n\n'),
      imageUrl: IMG.faschiertes,
    },
    services: [
      { title: 'Tartar', description: 'Hochland-Kuh „Barbie", 16 Jahre alt, von Birgit Böhm. Wanderhennenei, Sauerteigbrot.', price: '19,5 €', imageUrl: IMG.tartar },
      { title: 'Faschiertes Laberl', description: 'Hochland-Kuh „Barbie", Rahm, Flower Sprouts, Stielmus, Erdäpfel.', price: '31 €', imageUrl: IMG.faschiertes },
      { title: 'Suppe mit Sinn', description: 'Kürbis vom Biohof Lumperer in Absam, Erdäpfel, Kürbiskerne.', price: '14 €', imageUrl: IMG.suppe },
      { title: 'Schokoküchlein', description: 'Tiroler Edle Schokolade von Hansjörg Haag, Landeck. Kürbiskerne, Vanille, Rosmarin.', price: '13 €', imageUrl: IMG.schokoküchlein },
      { title: 'Kaffee', description: 'Brennpunkt Kaffee aus Innsbruck — handwerklich geröstet.', price: '2,5 €', imageUrl: IMG.kaffee },
      { title: 'Krautinger', description: 'Die speziellste der Tiroler Spezialitäten. Aus dem Salzhamaf, 2 cl.', price: '5 €', imageUrl: IMG.krautinger },
    ],
    gallery: [
      IMG.hero, IMG.faschiertes, IMG.tartar, IMG.suppe, IMG.schokoküchlein,
      IMG.kaffee, IMG.cremant, IMG.rum, IMG.krautinger, IMG.barhocker,
      IMG.garteln, IMG.wanda, IMG.charity, IMG.lisi, IMG.reservieren,
    ],
    testimonials: [
      { author: 'Lisa K., Innsbruck', text: 'Ehrlich, eigen, einfach gut. Die Wilderin ist mein Wohnzimmer mit Küche.' },
      { author: 'Thomas R., Wien', text: 'Wer wissen will, wie alpine Küche von morgen schmeckt: hier hingehen. Reservieren nicht vergessen.' },
      { author: 'Familie Berger', text: 'Wir kommen wegen Michael, Claudia und dem ganzen Team. Und wegen Barbie der Kuh, deren Tartar wir nie wieder vergessen.' },
      { author: 'Anna H., München', text: 'Konsequent regional, ohne Pose. Die Karte ändert sich, die Haltung bleibt.' },
    ],
    contact: {
      phone: '+43 512 562728',
      email: 'info@diewilderin.at',
      address: 'Seilergasse 5',
      city: '6020 Innsbruck',
      hours: [
        { day: 'Montag', time: 'Ruhetag' },
        { day: 'Dienstag', time: '17:00 – 24:00' },
        { day: 'Mittwoch', time: '17:00 – 24:00' },
        { day: 'Donnerstag', time: '17:00 – 24:00' },
        { day: 'Freitag', time: '17:00 – 24:00' },
        { day: 'Samstag', time: '17:00 – 24:00' },
        { day: 'Sonntag', time: '17:00 – 24:00' },
        { day: 'Feiertage', time: '17:00 – 24:00' },
      ],
      mapsUrl: 'https://www.google.com/maps?q=Seilergasse+5,+6020+Innsbruck&output=embed',
    },
    social: {
      instagram: 'diewilderin',
      facebook: 'dieWilderin',
      whatsapp: '',
    },
    seo: {
      title: 'die Wilderin · Alpine Kulinarik in Innsbruck',
      description: 'Wirtshaus in der Seilergasse 5, Innsbruck. Regional, saisonal, nachhaltig. Wildfleisch, ganzes Tier, alpine Küche. Reservierung per Telefon oder E-Mail.',
      keywords: 'Wilderin, Innsbruck, Restaurant, alpine Küche, regional, saisonal, Wildfleisch, Tirol, Seilergasse',
      ogImage: IMG.hero,
      canonical: '',
      twitter: '',
      locale: 'de_AT',
      priceRange: '€€€',
      cuisine: 'Alpine, Tyrolean, Austrian',
      extra: {},
    },
    pageSeo: {
      home: { title: 'die Wilderin · Innsbruck', description: 'Alpine Kulinarik in der Seilergasse. Regional, saisonal, ehrlich.' },
      services: { title: 'Speisekarte · die Wilderin', description: 'Unsere Speisen und Weine. Wildfleisch, alte Kühe, Wurzelgemüse, Naturweine.' },
      gallery: { title: 'Galerie · die Wilderin', description: 'Eindrücke aus Küche, Gastraum und von unseren Produzent:innen.' },
      about: { title: 'Über uns · die Wilderin', description: 'Wer wir sind, woher wir kommen, warum wir so kochen.' },
      contactPage: { title: 'Reservieren & Kontakt · die Wilderin', description: 'Old-School-Reservierung per Telefon +43 512 562728 oder E-Mail.' },
    },
    customScripts: [],
    timeline: [
      { year: '2013', title: 'Eröffnung', description: 'die Wilderin öffnet in der Seilergasse 5 – mit dem Anspruch, alpine Küche neu zu erzählen.' },
      { year: '2016', title: 'Ganzes Tier', description: 'Wir verarbeiten konsequent das gesamte Tier. Beuschl, Tartar, Filet — alle gleichberechtigt.' },
      { year: '2020', title: 'Producer Spotlight', description: 'Eigene Reportagen über unsere Bauern, Winzer:innen und Lieferant:innen — von Allram bis Kraft.' },
      { year: '2024', title: 'Neues Team', description: 'Claudia, Michael und das ganze Team feiern 11 Jahre Wilderin.' },
    ],
    posts: [
      {
        id: 'wanda',
        title: 'Eine Kuh namens Wanda',
        slug: 'eine-kuh-namens-wanda',
        date: '2025-09-12',
        excerpt: 'Warum wir alte Kühe lieben — und was Carpaccio von einer 16-jährigen Hochlandkuh besser macht.',
        body: 'Wanda war 16 Jahre alt. Sie hatte Kälber, sie kannte den Hof. Und ihr Fleisch war intensiver, dichter, mehr Fleisch als jedes Filet von einem 18-monatigen Industriestier.\n\nWir nennen das „alte Kuh statt junges Filet". Es ist langsamer, ehrlicher und besser. Punkt.\n\nDanke an Birgit Böhm und ihre Hochland-Herde für das Vertrauen.',
        bodyHtml: '',
        imageUrl: IMG.wanda,
        published: true,
      },
      {
        id: 'krautinger',
        title: 'Krautinger – die Speziellste der Tiroler Spezialitäten',
        slug: 'krautinger-tiroler-spezialitaet',
        date: '2025-06-04',
        excerpt: 'Ein Brand aus Rüben, der nach Erde schmeckt. Wir lieben ihn.',
        body: 'Krautinger ist ein Brand aus Stoppelrüben — ein Tiroler Original. Er schmeckt erdig, würzig, manchmal zu wild für den ersten Schluck.\n\nWir haben uns durch 7 Brennereien gekostet und uns für Salzhamaf entschieden. Probieren Sie ihn nach dem Essen, 2 cl, ohne Eis.',
        bodyHtml: '',
        imageUrl: IMG.krautinger,
        published: true,
      },
      {
        id: 'kaffee',
        title: 'Kein Latte, kein Macchiato',
        slug: 'kein-latte-kein-macchiato',
        date: '2025-03-18',
        excerpt: 'Warum wir Kaffee einfach Kaffee nennen — und ihn lokal rösten lassen.',
        body: 'Wir bekommen unseren Kaffee von Brennpunkt aus Innsbruck. Klein geröstet, frisch, mit Charakter.\n\nWir machen daraus Espresso oder Filterkaffee. Keine Mode-Drinks, keine Sirupe. Wer mehr will, ist bei uns falsch — wer Kaffee will, ist richtig.',
        bodyHtml: '',
        imageUrl: IMG.kaffee,
        published: true,
      },
      {
        id: 'wein',
        title: 'Füllt unsere Gläser',
        slug: 'fuellt-unsere-glaeser',
        date: '2025-01-22',
        excerpt: 'Naturweine aus Österreich, ausgewählt von Hand. Eine kleine Reise durch unsere Karte.',
        body: 'Unsere Weinkarte ist persönlich. Jeder Winzer auf der Karte ist jemand, den wir besucht haben — Gollenz, Uibel, Ernst, Kraft, Steindorfer, Wiederstein, Dachauer.\n\nWir gehen lieber in die Tiefe als in die Breite. 60 Positionen, alle mit Geschichte.',
        bodyHtml: '',
        imageUrl: IMG.charity,
        published: true,
      },
    ],
    branchText: {
      marqueeWords: ['Regional', 'Saisonal', 'Nachhaltig', 'Wild', 'Alpin', 'Ehrlich', 'Old School'],
      galleryTeaserTitle: 'Aus unserer Welt',
      teaserSubtitle: 'Alpine Kulinarik mit Haltung — vom Tartar der alten Kuh bis zur Krautinger-Brände nach dem Essen.',
      testimonialsEyebrow: 'Stimmen',
      testimonialsTitle: 'Was unsere Gäste sagen.',
      manifestEyebrow: 'Unser Manifest',
      manifestTitle: 'Wir wildern, weil wir es ernst meinen.',
      softCtaEyebrow: 'Reservieren',
      softCtaTitle: 'Old School. Telefon oder E-Mail.',
      softCtaText: 'Wir nehmen uns Zeit für jeden Gast — auch bei der Reservierung. +43 512 562728 oder info@diewilderin.at.',
      softCtaButton: 'Anrufen',
      newsEyebrow: 'Aus der Küche',
      newsTitle: 'Geschichten & Gedanken.',
    },
    navItems: [
      { label: 'Start', path: '/', visible: true },
      { label: 'Speisekarte', path: '/speisekarte', visible: true },
      { label: 'Galerie', path: '/galerie', visible: true },
      { label: 'Über uns', path: '/ueber-uns', visible: true },
      { label: 'Geschichten', path: '/news', visible: true },
      { label: 'Reservieren', path: '/kontakt', visible: true },
    ],
    footer: {
      tagline: 'die Wilderin · Seilergasse 5 · 6020 Innsbruck · Unser Zugang zur alpinen Kulinarik.',
      columns: [
        {
          title: 'Besuch',
          links: [
            { label: 'Speisekarte', href: '/speisekarte' },
            { label: 'Reservieren', href: '/kontakt' },
            { label: 'Galerie', href: '/galerie' },
          ],
        },
        {
          title: 'Wir',
          links: [
            { label: 'Über uns', href: '/ueber-uns' },
            { label: 'Geschichten', href: '/news' },
            { label: 'Instagram', href: 'https://www.instagram.com/diewilderin/' },
          ],
        },
        {
          title: 'Kontakt',
          links: [
            { label: '+43 512 562728', href: 'tel:+43512562728' },
            { label: 'info@diewilderin.at', href: 'mailto:info@diewilderin.at' },
            { label: 'Seilergasse 5, Innsbruck', href: 'https://www.google.com/maps?q=Seilergasse+5,+6020+Innsbruck' },
          ],
        },
      ],
    },
    heroCta: {
      primaryLabel: 'Tisch reservieren',
      primaryHref: '/kontakt',
      secondaryLabel: 'Speisekarte',
      secondaryHref: '/speisekarte',
    },
    ctaBandOverride: {
      lead: 'Hunger auf etwas Echtes?',
      sub: 'Reservieren Sie Ihren Tisch — Old School, per Telefon oder E-Mail. Wir freuen uns auf Sie.',
      cta: '+43 512 562728',
      ctaHref: 'tel:+43512562728',
    },
    menu: MENU,
    sectionVisibility: {},

    // ── Overlay sections (passthrough; the editor reads/writes these) ──
    galleryStory: defaultGalleryStory('restaurant'),
    galleryCategories: [
      { t: 'Küche', d: 'Tartar, Beuschl, Faschiertes, Suppe — was bei uns auf den Teller kommt.' },
      { t: 'Gastraum', d: 'Holz, warmes Licht, ehrliche Atmosphäre in der Seilergasse.' },
      { t: 'Produzent:innen', d: 'Bauern, Winzer:innen, Lieferant:innen — die Menschen hinter unseren Zutaten.' },
      { t: 'Team', d: 'Claudia, Michael und alle, die das Wirtshaus jeden Abend zum Leben erwecken.' },
    ],
    arrival: defaultArrival('restaurant'),

    // ── Common passthrough fields used by the editor ──
    announcements: [
      'Reservierung bitte per Telefon oder E-Mail — wir sind „Old School".',
      'Karte wechselt mit der Saison · ganzes Tier statt nur Filet.',
      'Mo Ruhetag · Di–So und Feiertage 17:00–24:00.',
    ],
    serviceHighlights: [
      { t: 'Regional', d: 'Zutaten von Bauern, die wir mit Namen kennen.' },
      { t: 'Saisonal', d: 'Was alpin wächst, kommt auf den Teller. Keine Erdbeeren im Winter.' },
      { t: 'Ganzes Tier', d: 'Tartar, Beuschl, Filet — alle gleichberechtigt.' },
      { t: 'Naturweine', d: '60 Positionen, alle persönlich kuratiert.' },
    ],
    values: [
      { t: 'Wild ist nicht normal.', d: 'Wir kochen, was Saison hat. Was wächst, was läuft, was schwimmt.' },
      { t: 'Old School Service.', d: 'Reservierung per Telefon. Begrüßung mit Handschlag. Zeit für Gespräche.' },
      { t: 'Know your farmers.', d: 'Jede Zutat hat einen Namen, einen Hof, eine Geschichte.' },
    ],
    team: [
      { n: 'Claudia Kogler', r: 'Geschäftsführerin · Commandante', img: '', bio: 'Hält den Laden zusammen. Sucht die Weine aus. Die Erste am Morgen, die Letzte am Abend.' },
      { n: 'Michael', r: 'Jäger · Fischer · Sammler', img: IMG.team.michael, bio: 'Geht raus zu den Bauern, spricht mit den Winzer:innen, schreibt die Karte.' },
      { n: 'Viktoria', r: 'Service', img: IMG.team.viktoria, bio: 'Empfängt, berät, lacht.' },
      { n: 'Kadda', r: 'Service', img: IMG.team.kadda, bio: 'Weiß, was Sie wollen, bevor Sie es wissen.' },
      { n: 'Laurids', r: 'Küche', img: IMG.team.laurids, bio: 'Steht am Herd. Schweigt viel. Kocht großartig.' },
      { n: 'Amelie', r: 'Küche', img: IMG.team.amelie, bio: 'Macht die Desserts. Hat einen siebten Sinn für Süße.' },
      { n: 'Lukas', r: 'Service', img: IMG.team.lukas, bio: 'Erklärt die Karte mit Geduld und Charme.' },
      { n: 'Yvonne', r: 'Service', img: IMG.team.yvonne, bio: 'Bringt Ruhe in den Abend.' },
      { n: 'Paul', r: 'Küche', img: IMG.team.paul, bio: 'Jüngster Profi am Herd.' },
      { n: 'Simon', r: 'Service', img: IMG.team.simon, bio: 'Kennt jeden Stammgast beim Vornamen.' },
      { n: 'Stefano', r: 'Küche', img: IMG.team.stefano, bio: 'Italienisches Tempo, alpine Zutaten.' },
      { n: 'Viktor', r: 'Service', img: IMG.team.viktor, bio: 'Kellt mit Leidenschaft.' },
    ],
    faq: [
      { q: 'Wie reserviere ich einen Tisch?', a: 'Old School: bitte per Telefon (+43 512 562728) oder per E-Mail an info@diewilderin.at. Wir nutzen kein Online-Reservierungssystem — uns ist das persönliche Gespräch wichtig.' },
      { q: 'Wann habt ihr geöffnet?', a: 'Di bis So und Feiertage von 17:00 bis 24:00. Montag ist Ruhetag.' },
      { q: 'Wo befindet ihr euch?', a: 'Seilergasse 5, 6020 Innsbruck — mitten in der Altstadt.' },
      { q: 'Habt ihr vegetarische Optionen?', a: 'Ja, jede Karte hat mindestens zwei vegetarische Hauptspeisen — z. B. Spinat von Sinngemüse oder Gnocchi mit Hokkaido vom Biohof Lumperer.' },
      { q: 'Kann ich die Karte vorab sehen?', a: 'Ja — auf unserer Speisekarten-Seite. Sie ändert sich saisonal, also: aktuell ist immer die Karte vor Ort.' },
      { q: 'Welche Allergene gibt es?', a: 'Allergene gerne auf Anfrage — wir passen Gerichte gerne an. Sprechen Sie unser Service-Team an.' },
    ],
    certifications: [
      { t: 'AMA Gastrosiegel', d: 'Regionale Herkunft mit Zertifikat.' },
      { t: 'Slow Food Tirol', d: 'Mitglied der lokalen Slow-Food-Bewegung.' },
    ],
    press: [
      { src: 'Falter', q: '„Innsbrucks ehrlichste Küche – ohne Pose, mit Haltung."', y: '2024' },
      { src: 'A la Carte', q: '„Alpine Küche, neu erzählt: alte Kühe, junges Gemüse, große Weine."', y: '2023' },
      { src: 'Tiroler Tageszeitung', q: '„Wer Tirol auf dem Teller will, ist hier richtig."', y: '2022' },
    ],
  };

  return SiteContentSchema.parse(raw);
}

// ────────────────────────────────────────────────────────────────────
// Run
// ────────────────────────────────────────────────────────────────────
async function main() {
  const password = randomBytes(12).toString('base64').replace(/[+/=]/g, '').slice(0, 16);
  const passwordHash = bcrypt.hashSync(password, 10);
  const content = buildContent();

  const existing = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, SLUG) });
  let tenantId: string;

  if (existing) {
    await db.update(schema.tenants).set({ name: NAME, template: TEMPLATE, passwordHash }).where(eq(schema.tenants.id, existing.id));
    tenantId = existing.id;
    if (RESET) {
      await db.update(schema.siteContent).set({ data: content }).where(eq(schema.siteContent.tenantId, tenantId));
      console.log(`[seed] Tenant '${SLUG}' updated; siteContent OVERWRITTEN (--reset).`);
    } else {
      // Insert content row only if missing
      const sc = await db.query.siteContent.findFirst({ where: eq(schema.siteContent.tenantId, tenantId) });
      if (!sc) {
        await db.insert(schema.siteContent).values({ tenantId, data: content });
        console.log(`[seed] Tenant '${SLUG}' existed without content; inserted seed.`);
      } else {
        console.log(`[seed] Tenant '${SLUG}' exists; siteContent left untouched (use --reset to overwrite).`);
      }
    }
  } else {
    const [row] = await db
      .insert(schema.tenants)
      .values({ slug: SLUG, name: NAME, template: TEMPLATE, passwordHash })
      .returning();
    tenantId = row.id;
    await db.insert(schema.siteContent).values({ tenantId, data: content });
    console.log(`[seed] Tenant '${SLUG}' created with full Wilderin content.`);
  }

  console.log('\n──────────────────────────────────────────');
  console.log(`  Tenant:   ${NAME}`);
  console.log(`  Slug:     ${SLUG}`);
  console.log(`  Template: ${TEMPLATE} (style: classic, preset: olive)`);
  console.log(`  Password: ${password}`);
  console.log('──────────────────────────────────────────');
  console.log('\nVercel project env vars:');
  console.log(`  TENANT_SLUG=${SLUG}`);
  console.log(`  VITE_TENANT_SLUG=${SLUG}`);
  console.log(`  VITE_TEMPLATE=${TEMPLATE}`);
  console.log(`  AUTH_SECRET=<same as main>`);
  console.log(`  POSTGRES_URL=<same Neon url>`);
  console.log(`  BLOB_READ_WRITE_TOKEN=<same Blob token>`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
