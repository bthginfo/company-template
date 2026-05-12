/**
 * Section type registry — defines every section type available in the Page Builder.
 * The `fields` array drives the SectionDataEditor form. The `defaultData` is used
 * when a new section is added. Template renderers (Phase 3+) consume the `data` blob.
 */

export type FieldDef = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'image' | 'boolean' | 'select';
  placeholder?: string;
  hint?: string;
  options?: Array<{ value: string; label: string }>;
};

export type ArrayFieldDef = {
  key: string;
  label: string;
  type: 'array';
  itemLabel?: string;
  addLabel?: string;
  fields: FieldDef[];
};

export type SectionFieldSpec = FieldDef | ArrayFieldDef;

export type SectionTypeDef = {
  type: string;
  label: string;
  icon: string;
  desc: string;
  defaultData: Record<string, unknown>;
  fields: SectionFieldSpec[];
};

export const SECTION_TYPES: SectionTypeDef[] = [
  // ─── Hero ──────────────────────────────────────────────────────────────────
  {
    type: 'hero',
    label: 'Hero / Banner',
    icon: '◈',
    desc: 'Großes Titelbild mit Headline und Button',
    defaultData: {
      headline: '',
      subline: '',
      ctaLabel: '',
      ctaLink: '',
      backgroundImage: '',
      overlay: 'dark',
      align: 'center',
    },
    fields: [
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Willkommen bei uns' },
      { key: 'subline', label: 'Subline', type: 'textarea', placeholder: 'Kurze Beschreibung…' },
      { key: 'ctaLabel', label: 'Button-Text', type: 'text', placeholder: 'Jetzt anfragen' },
      { key: 'ctaLink', label: 'Button-Link', type: 'url', placeholder: '/kontakt' },
      { key: 'backgroundImage', label: 'Hintergrundbild', type: 'image', hint: 'URL zu einem Bild (z. B. aus der Mediathek)' },
      {
        key: 'overlay',
        label: 'Overlay',
        type: 'select',
        options: [
          { value: 'none', label: 'Kein Overlay' },
          { value: 'light', label: 'Hell' },
          { value: 'dark', label: 'Dunkel' },
        ],
      },
      {
        key: 'align',
        label: 'Text-Ausrichtung',
        type: 'select',
        options: [
          { value: 'left', label: 'Links' },
          { value: 'center', label: 'Mitte' },
          { value: 'right', label: 'Rechts' },
        ],
      },
    ],
  },

  // ─── Rich Text ─────────────────────────────────────────────────────────────
  {
    type: 'richText',
    label: 'Textblock',
    icon: '¶',
    desc: 'Freitext, Fließtext-Abschnitt',
    defaultData: { headline: '', body: '' },
    fields: [
      { key: 'headline', label: 'Überschrift (optional)', type: 'text', placeholder: 'Über uns' },
      { key: 'body', label: 'Text', type: 'textarea', placeholder: 'Inhalt…' },
    ],
  },

  // ─── Image + Text ──────────────────────────────────────────────────────────
  {
    type: 'imageText',
    label: 'Bild + Text',
    icon: '⊡',
    desc: 'Bild neben einem Textblock',
    defaultData: {
      headline: '',
      body: '',
      image: '',
      imageAlt: '',
      imagePosition: 'right',
      ctaLabel: '',
      ctaLink: '',
    },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'body', label: 'Text', type: 'textarea' },
      { key: 'image', label: 'Bild', type: 'image' },
      { key: 'imageAlt', label: 'Bild Alt-Text', type: 'text', placeholder: 'Beschreibung des Bildes' },
      {
        key: 'imagePosition',
        label: 'Bildposition',
        type: 'select',
        options: [
          { value: 'left', label: 'Links' },
          { value: 'right', label: 'Rechts' },
        ],
      },
      { key: 'ctaLabel', label: 'Button-Text (optional)', type: 'text' },
      { key: 'ctaLink', label: 'Button-Link', type: 'url' },
    ],
  },

  // ─── Gallery ───────────────────────────────────────────────────────────────
  {
    type: 'gallery',
    label: 'Galerie',
    icon: '⊞',
    desc: 'Bildergalerie in Grid-Layout',
    defaultData: { headline: '', images: [] },
    fields: [
      { key: 'headline', label: 'Überschrift (optional)', type: 'text' },
      {
        key: 'images',
        label: 'Bilder',
        type: 'array',
        itemLabel: 'Bild',
        addLabel: 'Bild hinzufügen',
        fields: [
          { key: 'url', label: 'Bild-URL', type: 'image' },
          { key: 'alt', label: 'Alt-Text', type: 'text' },
          { key: 'caption', label: 'Bildunterschrift', type: 'text' },
        ],
      },
    ],
  },

  // ─── Features / Benefits ───────────────────────────────────────────────────
  {
    type: 'features',
    label: 'Features / Vorteile',
    icon: '✦',
    desc: 'Karten mit Icons und Beschreibungen',
    defaultData: { headline: '', subline: '', items: [] },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      {
        key: 'items',
        label: 'Einträge',
        type: 'array',
        itemLabel: 'Feature',
        addLabel: 'Feature hinzufügen',
        fields: [
          { key: 'icon', label: 'Icon (Emoji)', type: 'text', placeholder: '✓' },
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'description', label: 'Beschreibung', type: 'textarea' },
        ],
      },
    ],
  },

  // ─── Stats ─────────────────────────────────────────────────────────────────
  {
    type: 'stats',
    label: 'Zahlen & Fakten',
    icon: '◉',
    desc: 'Eindrucksvolle Kennzahlen / KPIs',
    defaultData: { headline: '', items: [] },
    fields: [
      { key: 'headline', label: 'Überschrift (optional)', type: 'text' },
      {
        key: 'items',
        label: 'Statistiken',
        type: 'array',
        itemLabel: 'Zahl',
        addLabel: 'Zahl hinzufügen',
        fields: [
          { key: 'value', label: 'Wert', type: 'text', placeholder: '500+' },
          { key: 'label', label: 'Beschriftung', type: 'text', placeholder: 'Zufriedene Kunden' },
          { key: 'suffix', label: 'Suffix (optional)', type: 'text', placeholder: '%' },
        ],
      },
    ],
  },

  // ─── Testimonials ──────────────────────────────────────────────────────────
  {
    type: 'testimonials',
    label: 'Bewertungen',
    icon: '❝',
    desc: 'Kundenstimmen und Bewertungen',
    defaultData: { headline: '', items: [] },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      {
        key: 'items',
        label: 'Bewertungen',
        type: 'array',
        itemLabel: 'Bewertung',
        addLabel: 'Bewertung hinzufügen',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Rolle / Unternehmen', type: 'text' },
          { key: 'quote', label: 'Zitat', type: 'textarea' },
          { key: 'avatar', label: 'Foto', type: 'image' },
          {
            key: 'rating',
            label: 'Sterne',
            type: 'select',
            options: [
              { value: '5', label: '★★★★★ (5)' },
              { value: '4', label: '★★★★☆ (4)' },
              { value: '3', label: '★★★☆☆ (3)' },
            ],
          },
        ],
      },
    ],
  },

  // ─── Team ──────────────────────────────────────────────────────────────────
  {
    type: 'team',
    label: 'Team',
    icon: '👥',
    desc: 'Teammitglieder vorstellen',
    defaultData: { headline: '', subline: '', members: [] },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      {
        key: 'members',
        label: 'Mitglieder',
        type: 'array',
        itemLabel: 'Person',
        addLabel: 'Person hinzufügen',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Position / Titel', type: 'text' },
          { key: 'bio', label: 'Kurzbiografie', type: 'textarea' },
          { key: 'photo', label: 'Foto', type: 'image' },
        ],
      },
    ],
  },

  // ─── FAQ ───────────────────────────────────────────────────────────────────
  {
    type: 'faq',
    label: 'FAQ',
    icon: '?',
    desc: 'Häufig gestellte Fragen',
    defaultData: { headline: '', items: [] },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text', placeholder: 'Häufige Fragen' },
      {
        key: 'items',
        label: 'Fragen',
        type: 'array',
        itemLabel: 'Frage',
        addLabel: 'Frage hinzufügen',
        fields: [
          { key: 'question', label: 'Frage', type: 'text' },
          { key: 'answer', label: 'Antwort', type: 'textarea' },
        ],
      },
    ],
  },

  // ─── CTA ───────────────────────────────────────────────────────────────────
  {
    type: 'cta',
    label: 'Call to Action',
    icon: '→',
    desc: 'Handlungsaufforderung / Banner',
    defaultData: { headline: '', subline: '', buttonLabel: '', buttonLink: '', variant: 'brand' },
    fields: [
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      { key: 'buttonLabel', label: 'Button-Text', type: 'text', placeholder: 'Jetzt anfragen' },
      { key: 'buttonLink', label: 'Button-Link', type: 'url', placeholder: '/kontakt' },
      {
        key: 'variant',
        label: 'Stil',
        type: 'select',
        options: [
          { value: 'brand', label: 'Markenfarbe' },
          { value: 'dark', label: 'Dunkel' },
          { value: 'light', label: 'Hell' },
        ],
      },
    ],
  },

  // ─── Contact ───────────────────────────────────────────────────────────────
  {
    type: 'contact',
    label: 'Kontakt',
    icon: '✉',
    desc: 'Kontaktinformationen und Formular',
    defaultData: { headline: '', showForm: true, showMap: false, formEmail: '' },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text', placeholder: 'Kontakt aufnehmen' },
      { key: 'showForm', label: 'Kontaktformular anzeigen', type: 'boolean' },
      { key: 'formEmail', label: 'Formular-E-Mail', type: 'text', placeholder: 'info@beispiel.de' },
      { key: 'showMap', label: 'Karte anzeigen', type: 'boolean' },
    ],
  },

  // ─── Collection ────────────────────────────────────────────────────────────
  {
    type: 'collection',
    label: 'Sammlung',
    icon: '◫',
    desc: 'Einträge aus einer Sammlung anzeigen',
    defaultData: { headline: '', collectionId: '', displayStyle: 'grid', limit: 0 },
    fields: [
      { key: 'headline', label: 'Überschrift (optional)', type: 'text' },
      {
        key: 'collectionId',
        label: 'Sammlungs-ID',
        type: 'text',
        hint: 'ID aus dem Bereich „Sammlungen"',
      },
      {
        key: 'displayStyle',
        label: 'Darstellung',
        type: 'select',
        options: [
          { value: 'grid', label: 'Raster' },
          { value: 'list', label: 'Liste' },
          { value: 'cards', label: 'Karten' },
          { value: 'carousel', label: 'Karussell' },
        ],
      },
      { key: 'limit', label: 'Max. Einträge (0 = alle)', type: 'text', placeholder: '0' },
    ],
  },

  // ─── Pricing ───────────────────────────────────────────────────────────────
  {
    type: 'pricing',
    label: 'Preise',
    icon: '€',
    desc: 'Preistabelle / Pakete',
    defaultData: { headline: '', subline: '', items: [] },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      {
        key: 'items',
        label: 'Pakete',
        type: 'array',
        itemLabel: 'Paket',
        addLabel: 'Paket hinzufügen',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'price', label: 'Preis', type: 'text', placeholder: '99 €' },
          { key: 'period', label: 'Zeitraum', type: 'text', placeholder: 'pro Monat' },
          { key: 'description', label: 'Beschreibung', type: 'textarea' },
          {
            key: 'highlighted',
            label: 'Empfohlen / hervorgehoben',
            type: 'select',
            options: [
              { value: 'false', label: 'Nein' },
              { value: 'true', label: 'Ja' },
            ],
          },
        ],
      },
    ],
  },

  // ─── Blog Preview ──────────────────────────────────────────────────────────
  {
    type: 'blogPreview',
    label: 'Blog-Vorschau',
    icon: '✏',
    desc: 'Aktuelle Blogbeiträge anzeigen',
    defaultData: { headline: '', limit: 3, category: '' },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text', placeholder: 'Aktuelles' },
      { key: 'limit', label: 'Anzahl Beiträge', type: 'text', placeholder: '3' },
      { key: 'category', label: 'Kategorie filtern (optional)', type: 'text' },
    ],
  },

  // ─── Video Embed ───────────────────────────────────────────────────────────
  {
    type: 'videoEmbed',
    label: 'Video',
    icon: '▶',
    desc: 'YouTube oder Vimeo Video einbetten',
    defaultData: { headline: '', videoUrl: '', caption: '' },
    fields: [
      { key: 'headline', label: 'Überschrift (optional)', type: 'text' },
      { key: 'videoUrl', label: 'Video-URL', type: 'url', hint: 'YouTube oder Vimeo Link' },
      { key: 'caption', label: 'Bildunterschrift (optional)', type: 'text' },
    ],
  },

  // ─── Divider / Spacer ──────────────────────────────────────────────────────
  {
    type: 'divider',
    label: 'Trenner / Abstand',
    icon: '—',
    desc: 'Visueller Abschnittstrenner',
    defaultData: { style: 'line', size: 'md' },
    fields: [
      {
        key: 'style',
        label: 'Stil',
        type: 'select',
        options: [
          { value: 'line', label: 'Linie' },
          { value: 'wave', label: 'Welle' },
          { value: 'space', label: 'Leerraum' },
        ],
      },
      {
        key: 'size',
        label: 'Größe',
        type: 'select',
        options: [
          { value: 'sm', label: 'Klein (32px)' },
          { value: 'md', label: 'Mittel (64px)' },
          { value: 'lg', label: 'Groß (128px)' },
        ],
      },
    ],
  },

  // ─── Phase 6b — Interactive branch-specific modules ────────────────────────

  {
    type: 'reservationForm',
    label: 'Online-Reservierung',
    group: 'Interaktiv',
    icon: '🍽️',
    defaultData: {
      headline: 'Tisch reservieren',
      subline: 'Wir freuen uns auf Ihren Besuch!',
      successMessage: 'Ihre Reservierung wurde entgegengenommen. Wir melden uns zur Bestätigung.',
    },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      { key: 'successMessage', label: 'Bestätigungstext', type: 'text' },
    ],
  },

  {
    type: 'rsvpForm',
    label: 'Hochzeit RSVP',
    group: 'Interaktiv',
    icon: '💍',
    defaultData: {
      headline: 'Anmeldung zur Feier',
      subline: 'Bitte meldet euch bis zum [Datum] an.',
      menuOptions: 'Fleisch,Vegetarisch,Vegan',
      successMessage: 'Vielen Dank! Wir freuen uns auf euch.',
    },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      { key: 'menuOptions', label: 'Menüoptionen (kommagetrennt)', type: 'text' },
      { key: 'successMessage', label: 'Bestätigungstext', type: 'text' },
    ],
  },

  {
    type: 'quoteRequest',
    label: 'Kostenvoranschlag',
    group: 'Interaktiv',
    icon: '🔧',
    defaultData: {
      headline: 'Kostenvoranschlag anfordern',
      subline: 'Wir erstellen Ihnen kostenlos und unverbindlich ein Angebot.',
      serviceOptions: '',
      successMessage: 'Ihre Anfrage wurde übermittelt. Wir melden uns in Kürze.',
    },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      { key: 'serviceOptions', label: 'Leistungen (kommagetrennt)', type: 'text' },
      { key: 'successMessage', label: 'Bestätigungstext', type: 'text' },
    ],
  },

  {
    type: 'appointmentEmbed',
    label: 'Termin buchen (Kalender)',
    group: 'Interaktiv',
    icon: '📅',
    defaultData: {
      headline: 'Termin buchen',
      subline: '',
      embedUrl: '',
      provider: 'cal',
    },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      {
        key: 'embedUrl',
        label: 'Buchungs-URL (Cal.com / Calendly / TidyCal)',
        type: 'text',
      },
      {
        key: 'provider',
        label: 'Anbieter',
        type: 'select',
        options: [
          { value: 'cal', label: 'Cal.com' },
          { value: 'calendly', label: 'Calendly' },
          { value: 'tidycal', label: 'TidyCal' },
          { value: 'savvycal', label: 'SavvyCal' },
          { value: 'youcanbook', label: 'YouCanBook.me' },
        ],
      },
    ],
  },

  {
    type: 'roomBooking',
    label: 'Zimmeranfrage',
    group: 'Interaktiv',
    icon: '🏨',
    defaultData: {
      headline: 'Zimmer anfragen',
      subline: 'Wir senden Ihnen schnellstmöglich ein Angebot.',
      roomOptions: '',
      successMessage: 'Ihre Anfrage ist eingegangen. Wir senden Ihnen eine Bestätigung per E-Mail.',
    },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      { key: 'roomOptions', label: 'Zimmertypen (kommagetrennt)', type: 'text' },
      { key: 'successMessage', label: 'Bestätigungstext', type: 'text' },
    ],
  },

  {
    type: 'trainingSignup',
    label: 'Probetraining-Anmeldung',
    group: 'Interaktiv',
    icon: '💪',
    defaultData: {
      headline: 'Probetraining buchen',
      subline: 'Das erste Training ist kostenlos!',
      courseOptions: '',
      successMessage: 'Super! Wir freuen uns auf dich. Du erhältst eine Bestätigung per E-Mail.',
    },
    fields: [
      { key: 'headline', label: 'Überschrift', type: 'text' },
      { key: 'subline', label: 'Unterzeile', type: 'text' },
      { key: 'courseOptions', label: 'Kurse / Trainingsarten (kommagetrennt)', type: 'text' },
      { key: 'successMessage', label: 'Bestätigungstext', type: 'text' },
    ],
  },
];

/** Fast lookup map by section type string */
export const SECTION_TYPE_MAP = Object.fromEntries(
  SECTION_TYPES.map((t) => [t.type, t]),
) as Record<string, SectionTypeDef | undefined>;
