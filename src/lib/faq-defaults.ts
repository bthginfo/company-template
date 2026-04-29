/**
 * Single source of truth for default FAQ entries per template.
 * Used by the live FAQ resolver in TemplateApp and by the FaqEditor in admin.
 */
import type { TemplateKey } from './types';

export const FAQ_DEFAULTS: Record<TemplateKey, { q: string; a: string }[]> = {
  restaurant: [
    { q: 'Kann man reservieren?', a: 'Ja, gerne online über das Formular oder telefonisch. Wir empfehlen Reservierung am Wochenende und an Feiertagen.' },
    { q: 'Sind Sie barrierefrei?', a: 'Der Hauptraum ist ebenerdig zugänglich. Eine behindertengerechte Toilette steht zur Verfügung.' },
    { q: 'Bieten Sie vegetarische / vegane Speisen?', a: 'Auf jedem Tisch stehen drei vegetarische und zwei vegane Hauptgerichte zur Auswahl. Auf Wunsch passen wir Gerichte gerne an.' },
    { q: 'Geschlossene Gesellschaften?', a: 'Wir vermieten den Saal ab 12 Personen exklusiv. Schreiben Sie uns für ein individuelles Angebot.' },
    { q: 'Kinderfreundlich?', a: 'Selbstverständlich. Hochstühle, kleinere Portionen auf Wunsch und ein Spielebereich für die Kleinen.' },
  ],
  salon: [
    { q: 'Wie lange im Voraus muss ich buchen?', a: 'Für Schnitt und Föhnen meist 3–7 Tage. Für Färben oder Balayage 2–3 Wochen. Kurzfristige Slots tragen wir auf eine Warteliste ein.' },
    { q: 'Welche Produktlinien nutzen Sie?', a: 'Kérastase, Olaplex, Davines, Aveda. Für die Maniküre arbeiten wir mit OPI Shellac.' },
    { q: 'Bieten Sie Beratung vor dem Termin?', a: 'Gerne, kostenlos in 15 Minuten. So planen wir den Termin passend und Sie wissen, was auf Sie zukommt.' },
    { q: 'Was kostet ein Probestyling für die Hochzeit?', a: 'Ein Probestyling kostet 90 € und wird beim Bridal-Termin auf den Endpreis angerechnet.' },
    { q: 'Kann ich mein eigenes Mittel mitbringen?', a: 'Sehr gerne, falls Sie auf bestimmte Inhaltsstoffe verzichten möchten. Sprechen Sie uns einfach an.' },
  ],
  tradesman: [
    { q: 'Wie schnell ist der Notdienst da?', a: 'In der Regel zügig im Stadtgebiet. Außerhalb je nach Verkehrslage – wir sagen Ihnen die Anfahrtszeit ehrlich am Telefon.' },
    { q: 'Was kostet eine Beratung?', a: 'Die erste Vor-Ort-Beratung ist kostenlos. Bei umfangreicher Energieberatung verrechnen wir 290 € pauschal, die bei Auftrag voll angerechnet werden.' },
    { q: 'Mit welchen Förderungen kann ich rechnen?', a: 'KfW, BAFA, regionale Programme und je nach Bauteil bis zu 35 % Zuschuss. Wir kalkulieren Ihre Förderquote schriftlich vor Auftrag.' },
    { q: 'Wer rechnet mit der Versicherung ab?', a: 'Auf Wunsch übernehmen wir die direkte Abrechnung mit Ihrer Gebäudeversicherung – Sie bekommen das Schadenprotokoll als PDF.' },
    { q: 'Garantie?', a: 'Auf Material 2 Jahre, auf unsere Arbeit 5 Jahre Gewährleistung. Bei Heizungsmodernisierungen optional Wartungsvertrag.' },
  ],
  hotel: [
    { q: 'Wann sind Check-in und Check-out?', a: 'Check-in ab 15:00 Uhr, Check-out bis 11:00 Uhr. Auf Wunsch lagern wir Ihr Gepäck gerne vor und nach dem Aufenthalt.' },
    { q: 'Ist Halbpension inklusive?', a: 'Im Standardtarif ist ein reichhaltiges Frühstücksbuffet enthalten. Halbpension buchen Sie für 38 € pro Person und Tag dazu.' },
    { q: 'Sind Hunde willkommen?', a: 'Ja, kleine bis mittelgroße Hunde sind herzlich willkommen (15 €/Nacht inkl. Decke und Napf). Bitte bei Buchung anmelden.' },
    { q: 'Wie nutze ich den Spa?', a: 'Der Wellnessbereich mit Sauna, Dampfbad und Außenpool steht Hausgästen täglich von 7:00 bis 21:00 Uhr offen – Bademantel und Slipper liegen im Zimmer bereit.' },
    { q: 'Stornierungsbedingungen?', a: 'Kostenfreie Stornierung bis 7 Tage vor Anreise. Danach berechnen wir 80 % des Aufenthalts. Reiserücktrittsversicherung empfehlen wir.' },
  ],
  tourism: [
    { q: 'Wie viele Personen pro Gruppe?', a: 'Maximal 12 Gäste pro Guide. So bleibt es persönlich und auch in den Bergen sicher.' },
    { q: 'Welche Sprachen sprechen die Guides?', a: 'Alle Touren auf Deutsch und Englisch, viele Guides zusätzlich Italienisch, Französisch oder Spanisch. Bitte bei Buchung angeben.' },
    { q: 'Was ist im Preis enthalten?', a: 'Guide, Eintritte, Transfer ab Innsbruck und – je nach Tour – Verpflegung. Detail-Inklusivleistungen finden Sie bei jeder Tour.' },
    { q: 'Welche Fitness brauche ich?', a: 'Wir kennzeichnen jede Tour mit einem Level (1–4). Stufe 1 ist familientauglich, Stufe 4 setzt alpine Erfahrung voraus. Sprechen Sie uns gerne an.' },
    { q: 'Stornierung?', a: 'Bis 14 Tage vor Tourbeginn kostenfrei, danach 50 %. Bei Wetterabsage durch uns erstatten wir vollständig oder verschieben.' },
  ],
  consulting: [
    { q: 'Wie läuft ein Projekt typischerweise ab?', a: 'In vier Phasen: Discover, Define, Design, Deliver – meist 6 bis 12 Wochen je nach Umfang.' },
    { q: 'Arbeiten Sie remote oder vor Ort?', a: 'Beides. Workshops machen wir gerne vor Ort, der Rest läuft hybrid mit klaren Sync-Terminen.' },
    { q: 'Was kostet ein Erstgespräch?', a: '45 Minuten, kostenlos und unverbindlich. Danach erhalten Sie eine schriftliche Einschätzung.' },
    { q: 'Wie messen Sie Erfolg?', a: 'Wir definieren mit Ihnen 3–5 KPIs zu Projektstart und reviewen sie quartalsweise.' },
  ],
  medical: [
    { q: 'Welche Kassen werden akzeptiert?', a: 'Alle gesetzlichen und privaten Krankenkassen. Selbstzahler-Leistungen rechnen wir auf Wunsch nach GOÄ ab.' },
    { q: 'Wie buche ich einen Termin?', a: 'Online über Doctolib oder jameda, telefonisch oder direkt über das Buchungs-Modul auf dieser Seite.' },
    { q: 'Sind Sie barrierefrei?', a: 'Ja, Aufzug und behindertengerechtes WC vorhanden. Begleitung auf Wunsch möglich.' },
    { q: 'Wie lange dauert ein Erstgespräch?', a: 'Wir planen 30–45 Minuten ein – mehr Zeit als bei Standardterminen, weil das Erstgespräch die Basis bildet.' },
  ],
  fitness: [
    { q: 'Gibt es ein Probetraining?', a: 'Ja, die erste Einheit ist gratis und unverbindlich. Wir empfehlen einen Termin am Vormittag oder Nachmittag.' },
    { q: 'Wie lange ist die Vertragslaufzeit?', a: 'Monatlich kündbar – keine Knebelverträge. Pausenzeiten sind ohne Aufpreis möglich.' },
    { q: 'Welche Kurse werden angeboten?', a: 'HIIT, Yoga, Boxing Cardio, Strength und Personal Training. Vollständiger Kursplan im Modul.' },
    { q: 'Gibt es Duschen und Spinde?', a: 'Ja, Spinde mit Schloss, Duschen mit Föhn und Pflegeprodukten von Davines.' },
  ],
};
