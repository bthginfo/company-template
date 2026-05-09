# Demo-Copy Spezifikation für FlamingoMedia Templates

Alle Texte sind als direkt einsetzbare Website-Copy aus Sicht des jeweiligen Unternehmens formuliert. Technische Felder wie Bilder, URLs, Buttons und Listen sind als CMS-Werte ausgeschrieben.

## Branchen und Stile


# restaurant / classic — Restaurant Lindenhof

Ton: zeitlos, warm und vertrauensvoll.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
buttonSecondary:
  label: Speisekarte ansehen
  href: #leistungen
```

### 3. `featuredDishesGrid`

```yaml
eyebrow: Aus Küche & Keller
titleA: Ausgewählt
titleB: für dich
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
items:
  -
    title: Hausgemachte Pasta mit Salbeibutter
    text: Frisch zubereitet, saisonal gedacht und mit viel Liebe zum Detail serviert.
    price: ab 16 €
  -
    title: Gebratener Saibling mit Kräuterkruste
    text: Frisch zubereitet, saisonal gedacht und mit viel Liebe zum Detail serviert.
    price: ab 16 €
  -
    title: Schokoladen-Tarte mit Meersalz
    text: Frisch zubereitet, saisonal gedacht und mit viel Liebe zum Detail serviert.
    price: ab 16 €
```

### 4. `storyTeaser`

```yaml
eyebrow: Aus Küche & Keller
headline: Warum wir tun, was wir tun
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
button:
  label: Tisch reservieren
  href: #kontakt
```

### 5. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Restaurant Lindenhof: Restaurant mit Anspruch
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
```

### 6. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in Restaurant und Küche
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
button:
  label: Tisch reservieren
  href: #kontakt
```

### 7. `labelBand`

```yaml
labels:
  - Reservierung möglich
  - Saisonal gekocht
  - Regionale Zutaten
  - Herzlicher Service
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
```

### 9. `seasonalHighlight`

```yaml
eyebrow: Aus Küche & Keller
headline: Saisonales Highlight
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
button:
  label: Tisch reservieren
  href: #kontakt
```

### 10. `statsBand`

```yaml
items:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 11. `reservationTeaser`

```yaml
eyebrow: Aus Küche & Keller
headline: Restaurant Lindenhof: Restaurant mit Anspruch
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
button:
  label: Tisch reservieren
  href: #kontakt
```

### 12. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neues aus Küche und Restaurant
button:
  label: Tisch reservieren
  href: #kontakt
```

### 13. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Restaurant Lindenhof: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `highlightsBar`

```yaml
items:
  - Reservierung möglich
  - Saisonal gekocht
  - Regionale Zutaten
  - Herzlicher Service
```

### 3. `menu`

```yaml
categories:
  -
    title: Vorspeisen
    items:
      -
        name: Geröstete Karotte
        description: Joghurt, Kräuteröl, Haselnuss
        price: 12 €
  -
    title: Hauptgänge
    items:
      -
        name: Hausgemachte Pasta mit Salbeibutter
        description: Saisonal, frisch und sorgfältig abgeschmeckt
        price: 24 €
  -
    title: Desserts
    items:
      -
        name: Zitronencreme
        description: Baiser, Beeren, Minze
        price: 9 €
eyebrow: Aus Küche & Keller
titleA: Ausgewählt
titleB: für dich
subtitle: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
```

### 4. `steps`

```yaml
eyebrow: Aus Küche & Keller
headline: Restaurant Lindenhof: Restaurant mit Anspruch
items:
  -
    title: Ankommen
    text: Wir begrüßen dich persönlich, nehmen Reservierungswünsche auf und sorgen dafür, dass der Abend entspannt beginnt.
  -
    title: Empfehlen
    text: Wir beraten zu Menü, Weinbegleitung und besonderen Wünschen wie vegetarischen Optionen oder Allergien.
  -
    title: Servieren
    text: Küche und Service arbeiten aufmerksam zusammen, damit jeder Gang frisch, stimmig und zum richtigen Moment kommt.
```

### 5. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Restaurant Lindenhof: Restaurant mit Anspruch
items:
  -
    question: Brauche ich eine Reservierung?
    answer: Abends empfehlen wir eine Reservierung, damit wir deinen Tisch entspannt vorbereiten können.
  -
    question: Gibt es vegetarische Gerichte?
    answer: Ja, wir kochen täglich mehrere vegetarische Optionen und passen Menüs gern an.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Restaurant Lindenhof: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `teaserList`

```yaml
eyebrow: Aus Küche & Keller
headline: Was uns besonders macht
intro: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
items:
  -
    title: Saisonales Abendmenü
    text: Saisonales Abendmenü mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Mittagskarte
    text: Mittagskarte mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Private Feiern
    text: Private Feiern mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
```

### 4. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Restaurant Lindenhof: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `teaserList`

```yaml
eyebrow: Aus Küche & Keller
headline: Was uns besonders macht
intro: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
items:
  -
    title: Saisonales Abendmenü
    text: Saisonales Abendmenü mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Mittagskarte
    text: Mittagskarte mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Private Feiern
    text: Private Feiern mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
```

### 3. `chefStory`

```yaml
eyebrow: Aus Küche & Keller
headline: Unsere Küche hat eine klare Handschrift
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
```

### 4. `timeline`

```yaml
items:
  -
    title: Ankommen
    text: Wir begrüßen dich persönlich, nehmen Reservierungswünsche auf und sorgen dafür, dass der Abend entspannt beginnt.
  -
    title: Empfehlen
    text: Wir beraten zu Menü, Weinbegleitung und besonderen Wünschen wie vegetarischen Optionen oder Allergien.
  -
    title: Servieren
    text: Küche und Service arbeiten aufmerksam zusammen, damit jeder Gang frisch, stimmig und zum richtigen Moment kommt.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Mara König
    role: Gastgeberin
    text: Sorgt mit Erfahrung, Aufmerksamkeit und echter Gastfreundschaft dafür, dass sich jeder Besuch besonders anfühlt.
  -
    name: Jonas Reuter
    role: Küchenchef
    text: Sorgt mit Erfahrung, Aufmerksamkeit und echter Gastfreundschaft dafür, dass sich jeder Besuch besonders anfühlt.
  -
    name: Lea Brandt
    role: Sommelière
    text: Sorgt mit Erfahrung, Aufmerksamkeit und echter Gastfreundschaft dafür, dass sich jeder Besuch besonders anfühlt.
```

### 6. `trustStrip`

```yaml
items:
  - Reservierung möglich
  - Saisonal gekocht
  - Regionale Zutaten
  - Herzlicher Service
```

### 7. `statsBand`

```yaml
items:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 8. `expertQuotes`

```yaml
eyebrow: Aus Küche & Keller
headline: Gedanken aus unserem Haus
items:
  -
    quote: Gute Gastlichkeit beginnt lange bevor der Teller auf dem Tisch steht.
    name: Unser Team
```

### 9. `badgeWall`

```yaml
eyebrow: Aus Küche & Keller
headline: Qualität, die sichtbar ist
items:
  - Frisch gekocht
  - Herzlicher Service
  - Regionale Partner
  - Saisonale Karte
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Restaurant Lindenhof: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Reserviere deinen Tisch, frage ein Menü an oder sprich mit uns über besondere Wünsche. Wir melden uns persönlich zurück.
googleMapsUrl: https://maps.google.com/?q=Lindenstraße+18,+80331+München
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Datum und Uhrzeit
  - Nachricht
```

### 3. `locations`

```yaml
locations:
  -
    name: Restaurant Lindenhof
    address: Lindenstraße 18, 80331 München
    phone: +49 89 123456
    email: hallo@example-restaurant.de
```

### 4. `directions`

```yaml
eyebrow: Aus Küche & Keller
headline: So findest du uns
subline: Restaurant Lindenhof liegt gut erreichbar in München. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Restaurant Lindenhof: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```
# restaurant / modern — Bistro Nova

Ton: klar, reduziert und hochwertig.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Reduziert im Design. Präzise im Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
buttonSecondary:
  label: Speisekarte ansehen
  href: #leistungen
```

### 3. `featuredDishesGrid`

```yaml
eyebrow: Aus Küche & Keller
titleA: Ausgewählt
titleB: für dich
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
items:
  -
    title: Hausgemachte Pasta mit Salbeibutter
    text: Frisch zubereitet, saisonal gedacht und mit viel Liebe zum Detail serviert.
    price: ab 16 €
  -
    title: Gebratener Saibling mit Kräuterkruste
    text: Frisch zubereitet, saisonal gedacht und mit viel Liebe zum Detail serviert.
    price: ab 16 €
  -
    title: Schokoladen-Tarte mit Meersalz
    text: Frisch zubereitet, saisonal gedacht und mit viel Liebe zum Detail serviert.
    price: ab 16 €
```

### 4. `storyTeaser`

```yaml
eyebrow: Aus Küche & Keller
headline: Warum wir tun, was wir tun
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
button:
  label: Tisch reservieren
  href: #kontakt
```

### 5. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Bistro Nova: Restaurant mit Anspruch
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
```

### 6. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in Restaurant und Küche
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
button:
  label: Tisch reservieren
  href: #kontakt
```

### 7. `labelBand`

```yaml
labels:
  - Reservierung möglich
  - Saisonal gekocht
  - Regionale Zutaten
  - Herzlicher Service
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
```

### 9. `seasonalHighlight`

```yaml
eyebrow: Aus Küche & Keller
headline: Saisonales Highlight
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
button:
  label: Tisch reservieren
  href: #kontakt
```

### 10. `statsBand`

```yaml
items:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 11. `reservationTeaser`

```yaml
eyebrow: Aus Küche & Keller
headline: Bistro Nova: Restaurant mit Anspruch
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
button:
  label: Tisch reservieren
  href: #kontakt
```

### 12. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neues aus Küche und Restaurant
button:
  label: Tisch reservieren
  href: #kontakt
```

### 13. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Bistro Nova: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Reduziert im Design. Präzise im Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `highlightsBar`

```yaml
items:
  - Reservierung möglich
  - Saisonal gekocht
  - Regionale Zutaten
  - Herzlicher Service
```

### 3. `menu`

```yaml
categories:
  -
    title: Vorspeisen
    items:
      -
        name: Geröstete Karotte
        description: Joghurt, Kräuteröl, Haselnuss
        price: 12 €
  -
    title: Hauptgänge
    items:
      -
        name: Hausgemachte Pasta mit Salbeibutter
        description: Saisonal, frisch und sorgfältig abgeschmeckt
        price: 24 €
  -
    title: Desserts
    items:
      -
        name: Zitronencreme
        description: Baiser, Beeren, Minze
        price: 9 €
eyebrow: Aus Küche & Keller
titleA: Ausgewählt
titleB: für dich
subtitle: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
```

### 4. `steps`

```yaml
eyebrow: Aus Küche & Keller
headline: Bistro Nova: Restaurant mit Anspruch
items:
  -
    title: Ankommen
    text: Wir begrüßen dich persönlich, nehmen Reservierungswünsche auf und sorgen dafür, dass der Abend entspannt beginnt.
  -
    title: Empfehlen
    text: Wir beraten zu Menü, Weinbegleitung und besonderen Wünschen wie vegetarischen Optionen oder Allergien.
  -
    title: Servieren
    text: Küche und Service arbeiten aufmerksam zusammen, damit jeder Gang frisch, stimmig und zum richtigen Moment kommt.
```

### 5. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Bistro Nova: Restaurant mit Anspruch
items:
  -
    question: Brauche ich eine Reservierung?
    answer: Abends empfehlen wir eine Reservierung, damit wir deinen Tisch entspannt vorbereiten können.
  -
    question: Gibt es vegetarische Gerichte?
    answer: Ja, wir kochen täglich mehrere vegetarische Optionen und passen Menüs gern an.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Bistro Nova: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Reduziert im Design. Präzise im Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `teaserList`

```yaml
eyebrow: Aus Küche & Keller
headline: Was uns besonders macht
intro: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
items:
  -
    title: Saisonales Abendmenü
    text: Saisonales Abendmenü mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Mittagskarte
    text: Mittagskarte mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Private Feiern
    text: Private Feiern mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
```

### 4. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Bistro Nova: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Reduziert im Design. Präzise im Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `storyFacts`

```yaml
description: Wir arbeiten persönlich, klar und mit dem Anspruch, dass sich jedes Detail richtig anfühlt.
items:
  -
    title: Saisonales Abendmenü
    text: Saisonales Abendmenü mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Mittagskarte
    text: Mittagskarte mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Private Feiern
    text: Private Feiern mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
```

### 3. `teaserList`

```yaml
eyebrow: Aus Küche & Keller
headline: Was uns besonders macht
intro: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
items:
  -
    title: Saisonales Abendmenü
    text: Saisonales Abendmenü mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Mittagskarte
    text: Mittagskarte mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Private Feiern
    text: Private Feiern mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
```

### 4. `chefStory`

```yaml
eyebrow: Aus Küche & Keller
headline: Unsere Küche hat eine klare Handschrift
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
```

### 5. `timeline`

```yaml
items:
  -
    title: Ankommen
    text: Wir begrüßen dich persönlich, nehmen Reservierungswünsche auf und sorgen dafür, dass der Abend entspannt beginnt.
  -
    title: Empfehlen
    text: Wir beraten zu Menü, Weinbegleitung und besonderen Wünschen wie vegetarischen Optionen oder Allergien.
  -
    title: Servieren
    text: Küche und Service arbeiten aufmerksam zusammen, damit jeder Gang frisch, stimmig und zum richtigen Moment kommt.
```

### 6. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Mara König
    role: Gastgeberin
    text: Sorgt mit Erfahrung, Aufmerksamkeit und echter Gastfreundschaft dafür, dass sich jeder Besuch besonders anfühlt.
  -
    name: Jonas Reuter
    role: Küchenchef
    text: Sorgt mit Erfahrung, Aufmerksamkeit und echter Gastfreundschaft dafür, dass sich jeder Besuch besonders anfühlt.
  -
    name: Lea Brandt
    role: Sommelière
    text: Sorgt mit Erfahrung, Aufmerksamkeit und echter Gastfreundschaft dafür, dass sich jeder Besuch besonders anfühlt.
```

### 7. `trustStrip`

```yaml
items:
  - Reservierung möglich
  - Saisonal gekocht
  - Regionale Zutaten
  - Herzlicher Service
```

### 8. `statsBand`

```yaml
items:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 9. `expertQuotes`

```yaml
eyebrow: Aus Küche & Keller
headline: Gedanken aus unserem Haus
items:
  -
    quote: Gute Gastlichkeit beginnt lange bevor der Teller auf dem Tisch steht.
    name: Unser Team
```

### 10. `badgeWall`

```yaml
eyebrow: Aus Küche & Keller
headline: Qualität, die sichtbar ist
items:
  - Frisch gekocht
  - Herzlicher Service
  - Regionale Partner
  - Saisonale Karte
```

### 11. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
```

### 12. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Bistro Nova: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Reduziert im Design. Präzise im Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Reserviere deinen Tisch, frage ein Menü an oder sprich mit uns über besondere Wünsche. Wir melden uns persönlich zurück.
googleMapsUrl: https://maps.google.com/?q=Lindenstraße+18,+80331+München
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Datum und Uhrzeit
  - Nachricht
```

### 3. `locations`

```yaml
locations:
  -
    name: Bistro Nova
    address: Lindenstraße 18, 80331 München
    phone: +49 89 123456
    email: hallo@example-restaurant.de
```

### 4. `directions`

```yaml
eyebrow: Aus Küche & Keller
headline: So findest du uns
subline: Bistro Nova liegt gut erreichbar in München. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Bistro Nova: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```
# restaurant / bold — Feuer & Flamme

Ton: markant, direkt und energiegeladen.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Mehr Feuer. Mehr Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `marqueeBand`

```yaml
items:
  - Reservierung möglich
  - Saisonal gekocht
  - Regionale Zutaten
  - Herzlicher Service
```

### 3. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
buttonSecondary:
  label: Speisekarte ansehen
  href: #leistungen
```

### 4. `featuredDishes`

```yaml
eyebrow: Aus Küche & Keller
headline: Unsere Favoriten aus der Küche
items:
  -
    title: Hausgemachte Pasta mit Salbeibutter
    text: Frisch zubereitet, saisonal gedacht und mit viel Liebe zum Detail serviert.
    price: ab 16 €
  -
    title: Gebratener Saibling mit Kräuterkruste
    text: Frisch zubereitet, saisonal gedacht und mit viel Liebe zum Detail serviert.
    price: ab 16 €
  -
    title: Schokoladen-Tarte mit Meersalz
    text: Frisch zubereitet, saisonal gedacht und mit viel Liebe zum Detail serviert.
    price: ab 16 €
```

### 5. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Feuer & Flamme: Restaurant mit Anspruch
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
```

### 6. `statsBand`

```yaml
items:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 7. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in Restaurant und Küche
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
button:
  label: Tisch reservieren
  href: #kontakt
```

### 8. `storyTeaser`

```yaml
eyebrow: Aus Küche & Keller
headline: Warum wir tun, was wir tun
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
button:
  label: Tisch reservieren
  href: #kontakt
```

### 9. `seasonalHighlight`

```yaml
eyebrow: Aus Küche & Keller
headline: Saisonales Highlight
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
button:
  label: Tisch reservieren
  href: #kontakt
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
```

### 11. `reservationTeaser`

```yaml
eyebrow: Aus Küche & Keller
headline: Feuer & Flamme: Restaurant mit Anspruch
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
button:
  label: Tisch reservieren
  href: #kontakt
```

### 12. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neues aus Küche und Restaurant
button:
  label: Tisch reservieren
  href: #kontakt
```

### 13. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Feuer & Flamme: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Mehr Feuer. Mehr Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `highlightsBar`

```yaml
items:
  - Reservierung möglich
  - Saisonal gekocht
  - Regionale Zutaten
  - Herzlicher Service
```

### 3. `menu`

```yaml
categories:
  -
    title: Vorspeisen
    items:
      -
        name: Geröstete Karotte
        description: Joghurt, Kräuteröl, Haselnuss
        price: 12 €
  -
    title: Hauptgänge
    items:
      -
        name: Hausgemachte Pasta mit Salbeibutter
        description: Saisonal, frisch und sorgfältig abgeschmeckt
        price: 24 €
  -
    title: Desserts
    items:
      -
        name: Zitronencreme
        description: Baiser, Beeren, Minze
        price: 9 €
eyebrow: Aus Küche & Keller
titleA: Ausgewählt
titleB: für dich
subtitle: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
```

### 4. `steps`

```yaml
eyebrow: Aus Küche & Keller
headline: Feuer & Flamme: Restaurant mit Anspruch
items:
  -
    title: Ankommen
    text: Wir begrüßen dich persönlich, nehmen Reservierungswünsche auf und sorgen dafür, dass der Abend entspannt beginnt.
  -
    title: Empfehlen
    text: Wir beraten zu Menü, Weinbegleitung und besonderen Wünschen wie vegetarischen Optionen oder Allergien.
  -
    title: Servieren
    text: Küche und Service arbeiten aufmerksam zusammen, damit jeder Gang frisch, stimmig und zum richtigen Moment kommt.
```

### 5. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Feuer & Flamme: Restaurant mit Anspruch
items:
  -
    question: Brauche ich eine Reservierung?
    answer: Abends empfehlen wir eine Reservierung, damit wir deinen Tisch entspannt vorbereiten können.
  -
    question: Gibt es vegetarische Gerichte?
    answer: Ja, wir kochen täglich mehrere vegetarische Optionen und passen Menüs gern an.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Feuer & Flamme: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Mehr Feuer. Mehr Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `teaserList`

```yaml
eyebrow: Aus Küche & Keller
headline: Was uns besonders macht
intro: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
items:
  -
    title: Saisonales Abendmenü
    text: Saisonales Abendmenü mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Mittagskarte
    text: Mittagskarte mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Private Feiern
    text: Private Feiern mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
```

### 4. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Feuer & Flamme: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Mehr Feuer. Mehr Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `teaserList`

```yaml
eyebrow: Aus Küche & Keller
headline: Was uns besonders macht
intro: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
items:
  -
    title: Saisonales Abendmenü
    text: Saisonales Abendmenü mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Mittagskarte
    text: Mittagskarte mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
  -
    title: Private Feiern
    text: Private Feiern mit saisonalen Zutaten, ehrlichem Handwerk und einem Geschmack, der in Erinnerung bleibt.
```

### 3. `chefStory`

```yaml
eyebrow: Aus Küche & Keller
headline: Unsere Küche hat eine klare Handschrift
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
```

### 4. `timeline`

```yaml
items:
  -
    title: Ankommen
    text: Wir begrüßen dich persönlich, nehmen Reservierungswünsche auf und sorgen dafür, dass der Abend entspannt beginnt.
  -
    title: Empfehlen
    text: Wir beraten zu Menü, Weinbegleitung und besonderen Wünschen wie vegetarischen Optionen oder Allergien.
  -
    title: Servieren
    text: Küche und Service arbeiten aufmerksam zusammen, damit jeder Gang frisch, stimmig und zum richtigen Moment kommt.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Mara König
    role: Gastgeberin
    text: Sorgt mit Erfahrung, Aufmerksamkeit und echter Gastfreundschaft dafür, dass sich jeder Besuch besonders anfühlt.
  -
    name: Jonas Reuter
    role: Küchenchef
    text: Sorgt mit Erfahrung, Aufmerksamkeit und echter Gastfreundschaft dafür, dass sich jeder Besuch besonders anfühlt.
  -
    name: Lea Brandt
    role: Sommelière
    text: Sorgt mit Erfahrung, Aufmerksamkeit und echter Gastfreundschaft dafür, dass sich jeder Besuch besonders anfühlt.
```

### 6. `trustStrip`

```yaml
items:
  - Reservierung möglich
  - Saisonal gekocht
  - Regionale Zutaten
  - Herzlicher Service
```

### 7. `statsBand`

```yaml
items:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 8. `expertQuotes`

```yaml
eyebrow: Aus Küche & Keller
headline: Gedanken aus unserem Haus
items:
  -
    quote: Gute Gastlichkeit beginnt lange bevor der Teller auf dem Tisch steht.
    name: Unser Team
```

### 9. `badgeWall`

```yaml
eyebrow: Aus Küche & Keller
headline: Qualität, die sichtbar ist
items:
  - Frisch gekocht
  - Herzlicher Service
  - Regionale Partner
  - Saisonale Karte
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Man spürt in jedem Gang, wie viel Sorgfalt in Küche und Service steckt.
    name: Alex M.
    context: Gast
  -
    quote: Herzlich, aufmerksam und kulinarisch wirklich stimmig.
    name: Samira K.
    context: Gästin
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Feuer & Flamme: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Mehr Feuer. Mehr Geschmack.
headline: Ehrliche Küche, die nach Zuhause und besonderem Abend schmeckt
subline: Wir kochen saisonal, handwerklich und mit Produkten von Partnern, die wir persönlich kennen.
description: Bei uns treffen feine Aromen, entspannter Service und eine Atmosphäre zusammen, in der aus einem Essen ein Lieblingsmoment wird.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Restaurant, saisonale Küche, gedeckter Tisch, Gastgeber, regionale Zutaten."
buttonPrimary:
  label: Tisch reservieren
  href: #kontakt
stats:
  -
    value: 12
    label: regionale Lieferanten
  -
    value: 4.8/5
    label: Gästebewertung
  -
    value: 7
    label: Tage frisch gekocht
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Reserviere deinen Tisch, frage ein Menü an oder sprich mit uns über besondere Wünsche. Wir melden uns persönlich zurück.
googleMapsUrl: https://maps.google.com/?q=Lindenstraße+18,+80331+München
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Datum und Uhrzeit
  - Nachricht
```

### 3. `locations`

```yaml
locations:
  -
    name: Feuer & Flamme
    address: Lindenstraße 18, 80331 München
    phone: +49 89 123456
    email: hallo@example-restaurant.de
```

### 4. `directions`

```yaml
eyebrow: Aus Küche & Keller
headline: So findest du uns
subline: Feuer & Flamme liegt gut erreichbar in München. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Feuer & Flamme: Restaurant mit Anspruch
subline: Wir freuen uns darauf, dich als Gast bei uns zu begrüßen.
button:
  label: Tisch reservieren
  href: #kontakt
```
# hotel / classic — Hotel Aurelia

Ton: zeitlos, warm und vertrauensvoll.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
buttonSecondary:
  label: Zimmer ansehen
  href: #leistungen
```

### 3. `featuredAreas`

```yaml
eyebrow: Zimmer & Angebote
headline: Räume für Erholung, Arbeit und besondere Tage
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Comfort Zimmer
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Suite mit Hafenblick
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Weekend Escape
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
```

### 4. `storyTeaser`

```yaml
eyebrow: Zimmer & Angebote
headline: Warum wir tun, was wir tun
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 5. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Hotel Aurelia: Hotel mit Anspruch
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
```

### 6. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in Zimmer und Haus
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 7. `seasonalHighlight`

```yaml
eyebrow: Zimmer & Angebote
headline: Saisonales Highlight
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
```

### 9. `statsBand`

```yaml
items:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 10. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Aktuelles rund um Aufenthalt und Haus
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Hotel Aurelia: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `highlightsBar`

```yaml
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 3. `accommodationsGrid`

```yaml
eyebrow: Zimmer & Angebote
headline: Wähle den Aufenthalt, der zu dir passt
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Comfort Zimmer
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Suite mit Hafenblick
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Weekend Escape
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
```

### 4. `experiencePackages`

```yaml
eyebrow: Zimmer & Angebote
headline: Erlebnisse, die deinen Aufenthalt abrunden
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Essential
    text: Übernachtung mit Komfort, ruhiger Ausstattung und allem, was du für eine entspannte Reise brauchst.
    price: ab 199 €
  -
    title: Signature
    text: Unser beliebtes Arrangement mit Frühstück, flexibler Anreise und ausgewählten Extras.
    price: ab 399 €
  -
    title: Premium
    text: Mehr Raum, besondere Details und bevorzugte Verfügbarkeiten für einen Aufenthalt mit Extra-Komfort.
    price: auf Anfrage
```

### 5. `amenitiesGrid`

```yaml
eyebrow: Zimmer & Angebote
headline: Details, die den Unterschied machen
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 6. `steps`

```yaml
eyebrow: Zimmer & Angebote
headline: Hotel Aurelia: Hotel mit Anspruch
items:
  -
    title: Einchecken
    text: Wir heißen dich persönlich willkommen, klären Wünsche und sorgen für einen unkomplizierten Start in deinen Aufenthalt.
  -
    title: Aufenthalt abstimmen
    text: Wir empfehlen Zimmer, Frühstück, Parken und Extras passend zu Reiseanlass und Tagesplanung.
  -
    title: Erholen
    text: Unser Team hält Zimmer, Service und Atmosphäre zuverlässig angenehm, damit du dich ganz auf deine Zeit vor Ort konzentrieren kannst.
```

### 7. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Hotel Aurelia: Hotel mit Anspruch
items:
  -
    question: Ist Frühstück inklusive?
    answer: Viele Raten enthalten unser Frühstück. Du kannst es beim Buchen flexibel hinzufügen.
  -
    question: Gibt es Parkplätze?
    answer: Ja, reservierbare Stellplätze stehen direkt am Haus zur Verfügung.
```

### 8. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Hotel Aurelia: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `teaserList`

```yaml
eyebrow: Zimmer & Angebote
headline: Was uns besonders macht
intro: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Design Zimmer
    text: Design Zimmer mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Frühstück & Bar
    text: Frühstück & Bar mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Wellnessbereich
    text: Wellnessbereich mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
```

### 4. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Hotel Aurelia: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `teaserList`

```yaml
eyebrow: Zimmer & Angebote
headline: Was uns besonders macht
intro: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Design Zimmer
    text: Design Zimmer mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Frühstück & Bar
    text: Frühstück & Bar mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Wellnessbereich
    text: Wellnessbereich mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
```

### 3. `timeline`

```yaml
items:
  -
    title: Einchecken
    text: Wir heißen dich persönlich willkommen, klären Wünsche und sorgen für einen unkomplizierten Start in deinen Aufenthalt.
  -
    title: Aufenthalt abstimmen
    text: Wir empfehlen Zimmer, Frühstück, Parken und Extras passend zu Reiseanlass und Tagesplanung.
  -
    title: Erholen
    text: Unser Team hält Zimmer, Service und Atmosphäre zuverlässig angenehm, damit du dich ganz auf deine Zeit vor Ort konzentrieren kannst.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Clara Wendt
    role: Gastgeberin
    text: Verbindet Gastfreundschaft, Organisation und ein feines Gespür für die kleinen Details eines gelungenen Aufenthalts.
  -
    name: Nico Hansen
    role: Front Office
    text: Verbindet Gastfreundschaft, Organisation und ein feines Gespür für die kleinen Details eines gelungenen Aufenthalts.
  -
    name: Mina Adler
    role: Guest Experience
    text: Verbindet Gastfreundschaft, Organisation und ein feines Gespür für die kleinen Details eines gelungenen Aufenthalts.
```

### 5. `trustStrip`

```yaml
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 6. `statsBand`

```yaml
items:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 7. `badgeWall`

```yaml
eyebrow: Zimmer & Angebote
headline: Qualität, die sichtbar ist
items:
  - Geprüfter Komfort
  - Persönlicher Empfang
  - Zentrale Lage
  - Faire Buchungsbedingungen
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Hotel Aurelia: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Sende uns deine Anfrage zu Zimmern, Verfügbarkeit oder besonderen Wünschen. Wir bereiten deinen Aufenthalt persönlich vor.
googleMapsUrl: https://maps.google.com/?q=Hafenallee+7,+20457+Hamburg
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Reisezeitraum
  - Nachricht
```

### 3. `locations`

```yaml
locations:
  -
    name: Hotel Aurelia
    address: Hafenallee 7, 20457 Hamburg
    phone: +49 40 123456
    email: stay@example-hotel.de
```

### 4. `directions`

```yaml
eyebrow: Zimmer & Angebote
headline: So findest du uns
subline: Hotel Aurelia liegt gut erreichbar in Hamburg. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Hotel Aurelia: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```
# hotel / modern — Urban Stay Atelier

Ton: klar, reduziert und hochwertig.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Urban schlafen. Entspannt ankommen.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
buttonSecondary:
  label: Zimmer ansehen
  href: #leistungen
```

### 3. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in Zimmer und Haus
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 4. `brandLogos`

```yaml
items:
  - Partner A
  - Partner B
  - Partner C
  - Partner D
```

### 5. `featuredAreas`

```yaml
eyebrow: Zimmer & Angebote
headline: Räume für Erholung, Arbeit und besondere Tage
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Comfort Zimmer
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Suite mit Hafenblick
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Weekend Escape
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
```

### 6. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Urban Stay Atelier: Hotel mit Anspruch
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
```

### 7. `storyTeaser`

```yaml
eyebrow: Zimmer & Angebote
headline: Warum wir tun, was wir tun
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 8. `seasonalHighlight`

```yaml
eyebrow: Zimmer & Angebote
headline: Saisonales Highlight
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 9. `statsBand`

```yaml
items:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
```

### 11. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Aktuelles rund um Aufenthalt und Haus
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 12. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Urban Stay Atelier: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Urban schlafen. Entspannt ankommen.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `highlightsBar`

```yaml
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 3. `accommodationsGrid`

```yaml
eyebrow: Zimmer & Angebote
headline: Wähle den Aufenthalt, der zu dir passt
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Comfort Zimmer
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Suite mit Hafenblick
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Weekend Escape
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
```

### 4. `experiencePackages`

```yaml
eyebrow: Zimmer & Angebote
headline: Erlebnisse, die deinen Aufenthalt abrunden
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Essential
    text: Übernachtung mit Komfort, ruhiger Ausstattung und allem, was du für eine entspannte Reise brauchst.
    price: ab 199 €
  -
    title: Signature
    text: Unser beliebtes Arrangement mit Frühstück, flexibler Anreise und ausgewählten Extras.
    price: ab 399 €
  -
    title: Premium
    text: Mehr Raum, besondere Details und bevorzugte Verfügbarkeiten für einen Aufenthalt mit Extra-Komfort.
    price: auf Anfrage
```

### 5. `amenitiesGrid`

```yaml
eyebrow: Zimmer & Angebote
headline: Details, die den Unterschied machen
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 6. `steps`

```yaml
eyebrow: Zimmer & Angebote
headline: Urban Stay Atelier: Hotel mit Anspruch
items:
  -
    title: Einchecken
    text: Wir heißen dich persönlich willkommen, klären Wünsche und sorgen für einen unkomplizierten Start in deinen Aufenthalt.
  -
    title: Aufenthalt abstimmen
    text: Wir empfehlen Zimmer, Frühstück, Parken und Extras passend zu Reiseanlass und Tagesplanung.
  -
    title: Erholen
    text: Unser Team hält Zimmer, Service und Atmosphäre zuverlässig angenehm, damit du dich ganz auf deine Zeit vor Ort konzentrieren kannst.
```

### 7. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Urban Stay Atelier: Hotel mit Anspruch
items:
  -
    question: Ist Frühstück inklusive?
    answer: Viele Raten enthalten unser Frühstück. Du kannst es beim Buchen flexibel hinzufügen.
  -
    question: Gibt es Parkplätze?
    answer: Ja, reservierbare Stellplätze stehen direkt am Haus zur Verfügung.
```

### 8. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Urban Stay Atelier: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Urban schlafen. Entspannt ankommen.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `teaserList`

```yaml
eyebrow: Zimmer & Angebote
headline: Was uns besonders macht
intro: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Design Zimmer
    text: Design Zimmer mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Frühstück & Bar
    text: Frühstück & Bar mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Wellnessbereich
    text: Wellnessbereich mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
```

### 4. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Urban Stay Atelier: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Urban schlafen. Entspannt ankommen.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `storyFacts`

```yaml
description: Wir arbeiten persönlich, klar und mit dem Anspruch, dass sich jedes Detail richtig anfühlt.
items:
  -
    title: Design Zimmer
    text: Design Zimmer mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Frühstück & Bar
    text: Frühstück & Bar mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Wellnessbereich
    text: Wellnessbereich mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
```

### 3. `teaserList`

```yaml
eyebrow: Zimmer & Angebote
headline: Was uns besonders macht
intro: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Design Zimmer
    text: Design Zimmer mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Frühstück & Bar
    text: Frühstück & Bar mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Wellnessbereich
    text: Wellnessbereich mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
```

### 4. `timeline`

```yaml
items:
  -
    title: Einchecken
    text: Wir heißen dich persönlich willkommen, klären Wünsche und sorgen für einen unkomplizierten Start in deinen Aufenthalt.
  -
    title: Aufenthalt abstimmen
    text: Wir empfehlen Zimmer, Frühstück, Parken und Extras passend zu Reiseanlass und Tagesplanung.
  -
    title: Erholen
    text: Unser Team hält Zimmer, Service und Atmosphäre zuverlässig angenehm, damit du dich ganz auf deine Zeit vor Ort konzentrieren kannst.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Clara Wendt
    role: Gastgeberin
    text: Verbindet Gastfreundschaft, Organisation und ein feines Gespür für die kleinen Details eines gelungenen Aufenthalts.
  -
    name: Nico Hansen
    role: Front Office
    text: Verbindet Gastfreundschaft, Organisation und ein feines Gespür für die kleinen Details eines gelungenen Aufenthalts.
  -
    name: Mina Adler
    role: Guest Experience
    text: Verbindet Gastfreundschaft, Organisation und ein feines Gespür für die kleinen Details eines gelungenen Aufenthalts.
```

### 6. `trustStrip`

```yaml
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 7. `statsBand`

```yaml
items:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 8. `badgeWall`

```yaml
eyebrow: Zimmer & Angebote
headline: Qualität, die sichtbar ist
items:
  - Geprüfter Komfort
  - Persönlicher Empfang
  - Zentrale Lage
  - Faire Buchungsbedingungen
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Urban Stay Atelier: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Urban schlafen. Entspannt ankommen.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Sende uns deine Anfrage zu Zimmern, Verfügbarkeit oder besonderen Wünschen. Wir bereiten deinen Aufenthalt persönlich vor.
googleMapsUrl: https://maps.google.com/?q=Hafenallee+7,+20457+Hamburg
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Reisezeitraum
  - Nachricht
```

### 3. `locations`

```yaml
locations:
  -
    name: Urban Stay Atelier
    address: Hafenallee 7, 20457 Hamburg
    phone: +49 40 123456
    email: stay@example-hotel.de
```

### 4. `directions`

```yaml
eyebrow: Zimmer & Angebote
headline: So findest du uns
subline: Urban Stay Atelier liegt gut erreichbar in Hamburg. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Urban Stay Atelier: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```
# hotel / bold — The Grand Pulse

Ton: markant, direkt und energiegeladen.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Mehr Stadt. Mehr Komfort.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `marqueeBand`

```yaml
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 3. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
buttonSecondary:
  label: Zimmer ansehen
  href: #leistungen
```

### 4. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in Zimmer und Haus
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 5. `roomSelection`

```yaml
eyebrow: Zimmer & Angebote
headline: Zimmer mit Charakter und Komfort
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Comfort Zimmer
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Suite mit Hafenblick
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Weekend Escape
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
```

### 6. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: The Grand Pulse: Hotel mit Anspruch
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
```

### 7. `statsBand`

```yaml
items:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 8. `seasonalHighlight`

```yaml
eyebrow: Zimmer & Angebote
headline: Saisonales Highlight
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 9. `storyTeaser`

```yaml
eyebrow: Zimmer & Angebote
headline: Warum wir tun, was wir tun
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 10. `testimonialMarquee`

```yaml
items:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
```

### 11. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
```

### 12. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Aktuelles rund um Aufenthalt und Haus
button:
  label: Aufenthalt buchen
  href: #kontakt
```

### 13. `cta`

```yaml
eyebrow: Nächster Schritt
headline: The Grand Pulse: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Mehr Stadt. Mehr Komfort.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `highlightsBar`

```yaml
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 3. `accommodationList`

```yaml
eyebrow: Zimmer & Angebote
headline: Unsere Zimmer und Suiten
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Comfort Zimmer
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Suite mit Hafenblick
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
  -
    title: Weekend Escape
    text: Ruhig, komfortabel und mit allem ausgestattet, was deinen Aufenthalt leichter macht.
    price: ab 139 €
```

### 4. `experiencePackages`

```yaml
eyebrow: Zimmer & Angebote
headline: Erlebnisse, die deinen Aufenthalt abrunden
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Essential
    text: Übernachtung mit Komfort, ruhiger Ausstattung und allem, was du für eine entspannte Reise brauchst.
    price: ab 199 €
  -
    title: Signature
    text: Unser beliebtes Arrangement mit Frühstück, flexibler Anreise und ausgewählten Extras.
    price: ab 399 €
  -
    title: Premium
    text: Mehr Raum, besondere Details und bevorzugte Verfügbarkeiten für einen Aufenthalt mit Extra-Komfort.
    price: auf Anfrage
```

### 5. `amenitiesGrid`

```yaml
eyebrow: Zimmer & Angebote
headline: Details, die den Unterschied machen
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 6. `steps`

```yaml
eyebrow: Zimmer & Angebote
headline: The Grand Pulse: Hotel mit Anspruch
items:
  -
    title: Einchecken
    text: Wir heißen dich persönlich willkommen, klären Wünsche und sorgen für einen unkomplizierten Start in deinen Aufenthalt.
  -
    title: Aufenthalt abstimmen
    text: Wir empfehlen Zimmer, Frühstück, Parken und Extras passend zu Reiseanlass und Tagesplanung.
  -
    title: Erholen
    text: Unser Team hält Zimmer, Service und Atmosphäre zuverlässig angenehm, damit du dich ganz auf deine Zeit vor Ort konzentrieren kannst.
```

### 7. `faq`

```yaml
eyebrow: Gut zu wissen
headline: The Grand Pulse: Hotel mit Anspruch
items:
  -
    question: Ist Frühstück inklusive?
    answer: Viele Raten enthalten unser Frühstück. Du kannst es beim Buchen flexibel hinzufügen.
  -
    question: Gibt es Parkplätze?
    answer: Ja, reservierbare Stellplätze stehen direkt am Haus zur Verfügung.
```

### 8. `cta`

```yaml
eyebrow: Nächster Schritt
headline: The Grand Pulse: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Mehr Stadt. Mehr Komfort.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `teaserList`

```yaml
eyebrow: Zimmer & Angebote
headline: Was uns besonders macht
intro: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Design Zimmer
    text: Design Zimmer mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Frühstück & Bar
    text: Frühstück & Bar mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Wellnessbereich
    text: Wellnessbereich mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
```

### 4. `cta`

```yaml
eyebrow: Nächster Schritt
headline: The Grand Pulse: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Mehr Stadt. Mehr Komfort.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `teaserList`

```yaml
eyebrow: Zimmer & Angebote
headline: Was uns besonders macht
intro: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
items:
  -
    title: Design Zimmer
    text: Design Zimmer mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Frühstück & Bar
    text: Frühstück & Bar mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
  -
    title: Wellnessbereich
    text: Wellnessbereich mit ruhigem Komfort, persönlichem Service und Details, die deinen Aufenthalt leichter machen.
```

### 3. `timeline`

```yaml
items:
  -
    title: Einchecken
    text: Wir heißen dich persönlich willkommen, klären Wünsche und sorgen für einen unkomplizierten Start in deinen Aufenthalt.
  -
    title: Aufenthalt abstimmen
    text: Wir empfehlen Zimmer, Frühstück, Parken und Extras passend zu Reiseanlass und Tagesplanung.
  -
    title: Erholen
    text: Unser Team hält Zimmer, Service und Atmosphäre zuverlässig angenehm, damit du dich ganz auf deine Zeit vor Ort konzentrieren kannst.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Clara Wendt
    role: Gastgeberin
    text: Verbindet Gastfreundschaft, Organisation und ein feines Gespür für die kleinen Details eines gelungenen Aufenthalts.
  -
    name: Nico Hansen
    role: Front Office
    text: Verbindet Gastfreundschaft, Organisation und ein feines Gespür für die kleinen Details eines gelungenen Aufenthalts.
  -
    name: Mina Adler
    role: Guest Experience
    text: Verbindet Gastfreundschaft, Organisation und ein feines Gespür für die kleinen Details eines gelungenen Aufenthalts.
```

### 5. `trustStrip`

```yaml
items:
  - Direkt buchbar
  - Ruhige Zimmer
  - Frühstück optional
  - Zentrale Lage
```

### 6. `statsBand`

```yaml
items:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 7. `badgeWall`

```yaml
eyebrow: Zimmer & Angebote
headline: Qualität, die sichtbar ist
items:
  - Geprüfter Komfort
  - Persönlicher Empfang
  - Zentrale Lage
  - Faire Buchungsbedingungen
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Gäste über uns sagen
testimonials:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
items:
  -
    quote: Vom Check-in bis zum Frühstück war alles aufmerksam, ruhig und hochwertig.
    name: Alex M.
    context: Gast
  -
    quote: Ruhig, freundlich und bis ins Detail gut organisiert.
    name: Samira K.
    context: Gästin
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: The Grand Pulse: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Mehr Stadt. Mehr Komfort.
headline: Ankommen, durchatmen und die Stadt von ihrer schönsten Seite erleben
subline: Wir verbinden persönliche Gastfreundschaft mit ruhigen Zimmern, feinem Frühstück und kurzen Wegen ins Zentrum.
description: Ob Wochenende, Geschäftsreise oder kleine Auszeit: Bei uns beginnt Erholung in dem Moment, in dem du eincheckst.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hotel, Zimmer, Lobby, Frühstück, entspannter Aufenthalt."
buttonPrimary:
  label: Aufenthalt buchen
  href: #kontakt
stats:
  -
    value: 42
    label: individuelle Zimmer
  -
    value: 4.9/5
    label: Gästefeedback
  -
    value: 5 Min.
    label: zur Innenstadt
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Sende uns deine Anfrage zu Zimmern, Verfügbarkeit oder besonderen Wünschen. Wir bereiten deinen Aufenthalt persönlich vor.
googleMapsUrl: https://maps.google.com/?q=Hafenallee+7,+20457+Hamburg
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Reisezeitraum
  - Nachricht
```

### 3. `locations`

```yaml
locations:
  -
    name: The Grand Pulse
    address: Hafenallee 7, 20457 Hamburg
    phone: +49 40 123456
    email: stay@example-hotel.de
```

### 4. `directions`

```yaml
eyebrow: Zimmer & Angebote
headline: So findest du uns
subline: The Grand Pulse liegt gut erreichbar in Hamburg. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: The Grand Pulse: Hotel mit Anspruch
subline: Wir freuen uns darauf, deinen Aufenthalt vorzubereiten.
button:
  label: Aufenthalt buchen
  href: #kontakt
```
# tourism / classic — Alpenblick Tours

Ton: zeitlos, warm und vertrauensvoll.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Reisen persönlich geplant
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
buttonSecondary:
  label: Reisen ansehen
  href: #leistungen
```

### 3. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Reiseerlebnisse
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
button:
  label: Tour anfragen
  href: #kontakt
```

### 4. `tourSchedule`

```yaml
eyebrow: Reiseideen
headline: Touren, die dir die Stadt neu zeigen
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Altstadt & versteckte Höfe
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Sonnenaufgang am Wasser
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Taste the City Tour
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
```

### 5. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Alpenblick Tours: Touranbieter mit Anspruch
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
```

### 6. `storyTeaser`

```yaml
eyebrow: Reiseideen
headline: Warum wir tun, was wir tun
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
button:
  label: Tour anfragen
  href: #kontakt
```

### 7. `seasonalHighlight`

```yaml
eyebrow: Reiseideen
headline: Saisonales Highlight
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
button:
  label: Tour anfragen
  href: #kontakt
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Reisende über uns sagen
testimonials:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
items:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
```

### 9. `statsBand`

```yaml
items:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 10. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neue Reiseideen und Empfehlungen
button:
  label: Tour anfragen
  href: #kontakt
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Alpenblick Tours: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Reisen persönlich geplant
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `highlightsBar`

```yaml
items:
  - Individuelle Routen
  - Lokale Guides
  - Sichere Planung
  - Flexible Reisetermine
```

### 3. `tourOverviewCards`

```yaml
eyebrow: Reiseideen
headline: Unsere beliebtesten Erlebnisse
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Altstadt & versteckte Höfe
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Sonnenaufgang am Wasser
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Taste the City Tour
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
```

### 4. `steps`

```yaml
eyebrow: Reiseideen
headline: Alpenblick Tours: Touranbieter mit Anspruch
items:
  -
    title: Reisewunsch klären
    text: Wir hören zu, welche Art von Reise du suchst, und klären Budget, Zeitraum, Tempo und persönliche Interessen.
  -
    title: Route gestalten
    text: Wir verbinden passende Orte, Unterkünfte, Transfers und Erlebnisse zu einem Reiseplan, der sich natürlich anfühlt.
  -
    title: Unterwegs begleiten
    text: Vor und während der Reise bleiben wir erreichbar und helfen, wenn Pläne angepasst werden sollen.
```

### 5. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Alpenblick Tours: Touranbieter mit Anspruch
items:
  -
    question: Finden Touren bei Regen statt?
    answer: Ja, solange es sicher ist. Wir passen Route und Pausen an das Wetter an.
  -
    question: Sind private Touren möglich?
    answer: Ja, wir gestalten Routen für Paare, Familien, Teams und Gruppen.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Alpenblick Tours: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Reisen persönlich geplant
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `teaserList`

```yaml
eyebrow: Reiseideen
headline: Was uns besonders macht
intro: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Stadtführungen
    text: Stadtführungen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Naturtouren
    text: Naturtouren mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Private Gruppen
    text: Private Gruppen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
```

### 4. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Alpenblick Tours: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Reisen persönlich geplant
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `teaserList`

```yaml
eyebrow: Reiseideen
headline: Was uns besonders macht
intro: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Stadtführungen
    text: Stadtführungen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Naturtouren
    text: Naturtouren mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Private Gruppen
    text: Private Gruppen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
```

### 3. `timeline`

```yaml
items:
  -
    title: Reisewunsch klären
    text: Wir hören zu, welche Art von Reise du suchst, und klären Budget, Zeitraum, Tempo und persönliche Interessen.
  -
    title: Route gestalten
    text: Wir verbinden passende Orte, Unterkünfte, Transfers und Erlebnisse zu einem Reiseplan, der sich natürlich anfühlt.
  -
    title: Unterwegs begleiten
    text: Vor und während der Reise bleiben wir erreichbar und helfen, wenn Pläne angepasst werden sollen.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Amira Koch
    role: Guide
    text: Verbindet Ortskenntnis, Organisation und Begeisterung für Reisen, die authentisch und gut vorbereitet sind.
  -
    name: Ben Ritter
    role: Tourplanung
    text: Verbindet Ortskenntnis, Organisation und Begeisterung für Reisen, die authentisch und gut vorbereitet sind.
  -
    name: Elena Vogt
    role: Guest Care
    text: Verbindet Ortskenntnis, Organisation und Begeisterung für Reisen, die authentisch und gut vorbereitet sind.
```

### 5. `trustStrip`

```yaml
items:
  - Individuelle Routen
  - Lokale Guides
  - Sichere Planung
  - Flexible Reisetermine
```

### 6. `statsBand`

```yaml
items:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 7. `badgeWall`

```yaml
eyebrow: Reiseideen
headline: Qualität, die sichtbar ist
items:
  - Lokale Expertise
  - Sichere Planung
  - Ausgewählte Partner
  - Flexible Reisetermine
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Reisende über uns sagen
testimonials:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
items:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Alpenblick Tours: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Reisen persönlich geplant
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Erzähl uns von Reiseziel, Zeitraum und Wunschtempo. Wir melden uns mit passenden Ideen für deine Route.
googleMapsUrl: https://maps.google.com/?q=Routenbüro,+Marktstraße+12,+10115+Berlin
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Reisezeitraum
  - Reisewunsch
```

### 3. `locations`

```yaml
locations:
  -
    name: Alpenblick Tours
    address: Routenbüro, Marktstraße 12, 10115 Berlin
    phone: +49 30 123456
    email: hello@example-tours.de
```

### 4. `directions`

```yaml
eyebrow: Reiseideen
headline: So findest du uns
subline: Alpenblick Tours liegt gut erreichbar in Berlin. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Alpenblick Tours: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```
# tourism / modern — City Routes Studio

Ton: klar, reduziert und hochwertig.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Klar geplant. Intensiv erlebt.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
buttonSecondary:
  label: Reisen ansehen
  href: #leistungen
```

### 3. `tourSchedule`

```yaml
eyebrow: Reiseideen
headline: Touren, die dir die Stadt neu zeigen
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Altstadt & versteckte Höfe
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Sonnenaufgang am Wasser
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Taste the City Tour
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
```

### 4. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Reiseerlebnisse
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
button:
  label: Tour anfragen
  href: #kontakt
```

### 5. `brandLogos`

```yaml
items:
  - Partner A
  - Partner B
  - Partner C
  - Partner D
```

### 6. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: City Routes Studio: Touranbieter mit Anspruch
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
```

### 7. `statsBand`

```yaml
items:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 8. `storyTeaser`

```yaml
eyebrow: Reiseideen
headline: Warum wir tun, was wir tun
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
button:
  label: Tour anfragen
  href: #kontakt
```

### 9. `seasonalHighlight`

```yaml
eyebrow: Reiseideen
headline: Saisonales Highlight
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
button:
  label: Tour anfragen
  href: #kontakt
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Reisende über uns sagen
testimonials:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
items:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
```

### 11. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neue Reiseideen und Empfehlungen
button:
  label: Tour anfragen
  href: #kontakt
```

### 12. `cta`

```yaml
eyebrow: Nächster Schritt
headline: City Routes Studio: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Klar geplant. Intensiv erlebt.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `highlightsBar`

```yaml
items:
  - Individuelle Routen
  - Lokale Guides
  - Sichere Planung
  - Flexible Reisetermine
```

### 3. `tourOverviewCards`

```yaml
eyebrow: Reiseideen
headline: Unsere beliebtesten Erlebnisse
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Altstadt & versteckte Höfe
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Sonnenaufgang am Wasser
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Taste the City Tour
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
```

### 4. `steps`

```yaml
eyebrow: Reiseideen
headline: City Routes Studio: Touranbieter mit Anspruch
items:
  -
    title: Reisewunsch klären
    text: Wir hören zu, welche Art von Reise du suchst, und klären Budget, Zeitraum, Tempo und persönliche Interessen.
  -
    title: Route gestalten
    text: Wir verbinden passende Orte, Unterkünfte, Transfers und Erlebnisse zu einem Reiseplan, der sich natürlich anfühlt.
  -
    title: Unterwegs begleiten
    text: Vor und während der Reise bleiben wir erreichbar und helfen, wenn Pläne angepasst werden sollen.
```

### 5. `faq`

```yaml
eyebrow: Gut zu wissen
headline: City Routes Studio: Touranbieter mit Anspruch
items:
  -
    question: Finden Touren bei Regen statt?
    answer: Ja, solange es sicher ist. Wir passen Route und Pausen an das Wetter an.
  -
    question: Sind private Touren möglich?
    answer: Ja, wir gestalten Routen für Paare, Familien, Teams und Gruppen.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: City Routes Studio: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Klar geplant. Intensiv erlebt.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `teaserList`

```yaml
eyebrow: Reiseideen
headline: Was uns besonders macht
intro: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Stadtführungen
    text: Stadtführungen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Naturtouren
    text: Naturtouren mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Private Gruppen
    text: Private Gruppen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
```

### 4. `cta`

```yaml
eyebrow: Nächster Schritt
headline: City Routes Studio: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Klar geplant. Intensiv erlebt.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `storyFacts`

```yaml
description: Wir arbeiten persönlich, klar und mit dem Anspruch, dass sich jedes Detail richtig anfühlt.
items:
  -
    title: Stadtführungen
    text: Stadtführungen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Naturtouren
    text: Naturtouren mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Private Gruppen
    text: Private Gruppen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
```

### 3. `teaserList`

```yaml
eyebrow: Reiseideen
headline: Was uns besonders macht
intro: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Stadtführungen
    text: Stadtführungen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Naturtouren
    text: Naturtouren mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Private Gruppen
    text: Private Gruppen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
```

### 4. `timeline`

```yaml
items:
  -
    title: Reisewunsch klären
    text: Wir hören zu, welche Art von Reise du suchst, und klären Budget, Zeitraum, Tempo und persönliche Interessen.
  -
    title: Route gestalten
    text: Wir verbinden passende Orte, Unterkünfte, Transfers und Erlebnisse zu einem Reiseplan, der sich natürlich anfühlt.
  -
    title: Unterwegs begleiten
    text: Vor und während der Reise bleiben wir erreichbar und helfen, wenn Pläne angepasst werden sollen.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Amira Koch
    role: Guide
    text: Verbindet Ortskenntnis, Organisation und Begeisterung für Reisen, die authentisch und gut vorbereitet sind.
  -
    name: Ben Ritter
    role: Tourplanung
    text: Verbindet Ortskenntnis, Organisation und Begeisterung für Reisen, die authentisch und gut vorbereitet sind.
  -
    name: Elena Vogt
    role: Guest Care
    text: Verbindet Ortskenntnis, Organisation und Begeisterung für Reisen, die authentisch und gut vorbereitet sind.
```

### 6. `trustStrip`

```yaml
items:
  - Individuelle Routen
  - Lokale Guides
  - Sichere Planung
  - Flexible Reisetermine
```

### 7. `statsBand`

```yaml
items:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 8. `badgeWall`

```yaml
eyebrow: Reiseideen
headline: Qualität, die sichtbar ist
items:
  - Lokale Expertise
  - Sichere Planung
  - Ausgewählte Partner
  - Flexible Reisetermine
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Reisende über uns sagen
testimonials:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
items:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: City Routes Studio: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Klar geplant. Intensiv erlebt.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Erzähl uns von Reiseziel, Zeitraum und Wunschtempo. Wir melden uns mit passenden Ideen für deine Route.
googleMapsUrl: https://maps.google.com/?q=Routenbüro,+Marktstraße+12,+10115+Berlin
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Reisezeitraum
  - Reisewunsch
```

### 3. `locations`

```yaml
locations:
  -
    name: City Routes Studio
    address: Routenbüro, Marktstraße 12, 10115 Berlin
    phone: +49 30 123456
    email: hello@example-tours.de
```

### 4. `directions`

```yaml
eyebrow: Reiseideen
headline: So findest du uns
subline: City Routes Studio liegt gut erreichbar in Berlin. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: City Routes Studio: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```
# tourism / bold — Wild North Adventures

Ton: markant, direkt und energiegeladen.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Mehr Route. Mehr Abenteuer.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `marqueeBand`

```yaml
items:
  - Individuelle Routen
  - Lokale Guides
  - Sichere Planung
  - Flexible Reisetermine
```

### 3. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
buttonSecondary:
  label: Reisen ansehen
  href: #leistungen
```

### 4. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Reiseerlebnisse
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
button:
  label: Tour anfragen
  href: #kontakt
```

### 5. `statsBand`

```yaml
items:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 6. `tourSelection`

```yaml
eyebrow: Reiseideen
headline: Wähle dein nächstes Abenteuer
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Altstadt & versteckte Höfe
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Sonnenaufgang am Wasser
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Taste the City Tour
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
```

### 7. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Wild North Adventures: Touranbieter mit Anspruch
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
```

### 8. `storyTeaser`

```yaml
eyebrow: Reiseideen
headline: Warum wir tun, was wir tun
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
button:
  label: Tour anfragen
  href: #kontakt
```

### 9. `seasonalHighlight`

```yaml
eyebrow: Reiseideen
headline: Saisonales Highlight
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
button:
  label: Tour anfragen
  href: #kontakt
```

### 10. `testimonialMarquee`

```yaml
items:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
```

### 11. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Reisende über uns sagen
testimonials:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
items:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
```

### 12. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neue Reiseideen und Empfehlungen
button:
  label: Tour anfragen
  href: #kontakt
```

### 13. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Wild North Adventures: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Mehr Route. Mehr Abenteuer.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `highlightsBar`

```yaml
items:
  - Individuelle Routen
  - Lokale Guides
  - Sichere Planung
  - Flexible Reisetermine
```

### 3. `tourOverviewList`

```yaml
eyebrow: Reiseideen
headline: Touren mit echtem Ortsgefühl
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Altstadt & versteckte Höfe
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Sonnenaufgang am Wasser
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
  -
    title: Taste the City Tour
    text: Geführt von lokalen Guides, mit starken Geschichten und genügend Zeit für echte Eindrücke.
    duration: ca. 3 Stunden
```

### 4. `steps`

```yaml
eyebrow: Reiseideen
headline: Wild North Adventures: Touranbieter mit Anspruch
items:
  -
    title: Reisewunsch klären
    text: Wir hören zu, welche Art von Reise du suchst, und klären Budget, Zeitraum, Tempo und persönliche Interessen.
  -
    title: Route gestalten
    text: Wir verbinden passende Orte, Unterkünfte, Transfers und Erlebnisse zu einem Reiseplan, der sich natürlich anfühlt.
  -
    title: Unterwegs begleiten
    text: Vor und während der Reise bleiben wir erreichbar und helfen, wenn Pläne angepasst werden sollen.
```

### 5. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Wild North Adventures: Touranbieter mit Anspruch
items:
  -
    question: Finden Touren bei Regen statt?
    answer: Ja, solange es sicher ist. Wir passen Route und Pausen an das Wetter an.
  -
    question: Sind private Touren möglich?
    answer: Ja, wir gestalten Routen für Paare, Familien, Teams und Gruppen.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Wild North Adventures: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Mehr Route. Mehr Abenteuer.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `teaserList`

```yaml
eyebrow: Reiseideen
headline: Was uns besonders macht
intro: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Stadtführungen
    text: Stadtführungen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Naturtouren
    text: Naturtouren mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Private Gruppen
    text: Private Gruppen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
```

### 4. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Wild North Adventures: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Mehr Route. Mehr Abenteuer.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `teaserList`

```yaml
eyebrow: Reiseideen
headline: Was uns besonders macht
intro: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
items:
  -
    title: Stadtführungen
    text: Stadtführungen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Naturtouren
    text: Naturtouren mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
  -
    title: Private Gruppen
    text: Private Gruppen mit sorgfältiger Planung, lokalen Tipps und Erlebnissen, die lange nachwirken.
```

### 3. `timeline`

```yaml
items:
  -
    title: Reisewunsch klären
    text: Wir hören zu, welche Art von Reise du suchst, und klären Budget, Zeitraum, Tempo und persönliche Interessen.
  -
    title: Route gestalten
    text: Wir verbinden passende Orte, Unterkünfte, Transfers und Erlebnisse zu einem Reiseplan, der sich natürlich anfühlt.
  -
    title: Unterwegs begleiten
    text: Vor und während der Reise bleiben wir erreichbar und helfen, wenn Pläne angepasst werden sollen.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Amira Koch
    role: Guide
    text: Verbindet Ortskenntnis, Organisation und Begeisterung für Reisen, die authentisch und gut vorbereitet sind.
  -
    name: Ben Ritter
    role: Tourplanung
    text: Verbindet Ortskenntnis, Organisation und Begeisterung für Reisen, die authentisch und gut vorbereitet sind.
  -
    name: Elena Vogt
    role: Guest Care
    text: Verbindet Ortskenntnis, Organisation und Begeisterung für Reisen, die authentisch und gut vorbereitet sind.
```

### 5. `trustStrip`

```yaml
items:
  - Individuelle Routen
  - Lokale Guides
  - Sichere Planung
  - Flexible Reisetermine
```

### 6. `statsBand`

```yaml
items:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 7. `badgeWall`

```yaml
eyebrow: Reiseideen
headline: Qualität, die sichtbar ist
items:
  - Lokale Expertise
  - Sichere Planung
  - Ausgewählte Partner
  - Flexible Reisetermine
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Reisende über uns sagen
testimonials:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
items:
  -
    quote: Die Tour war persönlich, überraschend und perfekt organisiert.
    name: Alex M.
    context: Reisender
  -
    quote: Die Route war perfekt geplant und trotzdem angenehm flexibel.
    name: Samira K.
    context: Reisende
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Wild North Adventures: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Mehr Route. Mehr Abenteuer.
headline: Erlebnisse, die bleiben, lange nachdem die Reise endet
subline: Wir planen geführte Touren mit echten Geschichten, lokalen Lieblingsorten und einem Tempo, das Raum zum Staunen lässt.
description: Unsere Routen sind persönlich kuratiert, zuverlässig organisiert und so gestaltet, dass du mehr siehst als nur Sehenswürdigkeiten.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Reise, Landschaft, Stadtführung, lokale Erlebnisse, Abenteuer."
buttonPrimary:
  label: Tour anfragen
  href: #kontakt
stats:
  -
    value: 1.200+
    label: glückliche Gäste
  -
    value: 18
    label: kuratierte Routen
  -
    value: 4.9/5
    label: Bewertung
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Erzähl uns von Reiseziel, Zeitraum und Wunschtempo. Wir melden uns mit passenden Ideen für deine Route.
googleMapsUrl: https://maps.google.com/?q=Routenbüro,+Marktstraße+12,+10115+Berlin
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Reisezeitraum
  - Reisewunsch
```

### 3. `locations`

```yaml
locations:
  -
    name: Wild North Adventures
    address: Routenbüro, Marktstraße 12, 10115 Berlin
    phone: +49 30 123456
    email: hello@example-tours.de
```

### 4. `directions`

```yaml
eyebrow: Reiseideen
headline: So findest du uns
subline: Wild North Adventures liegt gut erreichbar in Berlin. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Wild North Adventures: Touranbieter mit Anspruch
subline: Wir freuen uns darauf, deine Reiseidee mit dir zu planen.
button:
  label: Tour anfragen
  href: #kontakt
```
# salon / classic — Salon Bellezza

Ton: zeitlos, warm und vertrauensvoll.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Termin buchen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 3. `featuredServices`

```yaml
eyebrow: Unsere Services
headline: Leistungen, auf die du dich verlassen kannst
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Pflege Treatments
    text: Pflege Treatments mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `storyTeaser`

```yaml
eyebrow: Unsere Services
headline: Warum wir tun, was wir tun
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
button:
  label: Termin buchen
  href: #kontakt
```

### 5. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Salon Bellezza: Salon mit Anspruch
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
```

### 6. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unseren Salon
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
button:
  label: Termin buchen
  href: #kontakt
```

### 7. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Kundinnen und Kunden sagen
testimonials:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
items:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
```

### 8. `statsBand`

```yaml
items:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 9. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neue Looks, Pflegeideen und Salon-News
button:
  label: Termin buchen
  href: #kontakt
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Salon Bellezza: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Typgerechte Beratung
  - Präzise Schnitte
  - Schonende Farben
  - Online-Terminbuchung
```

### 3. `serviceOverviewCards`

```yaml
eyebrow: Unsere Services
headline: Alles, was du für ein gutes Ergebnis brauchst
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Pflege Treatments
    text: Pflege Treatments mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `productLine`

```yaml
eyebrow: Unsere Services
headline: Pflege, die deinen Look verlängert
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Glossy Bob
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Signature Blowout
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
```

### 5. `steps`

```yaml
eyebrow: Unsere Services
headline: Salon Bellezza: Salon mit Anspruch
items:
  -
    title: Beraten
    text: Wir nehmen uns Zeit für Haarstruktur, Wünsche und Alltag, bevor Schere oder Farbe zum Einsatz kommen.
  -
    title: Stylen
    text: Schnitt, Farbe und Pflege stimmen wir präzise auf deinen Typ und dein gewünschtes Styling ab.
  -
    title: Stylen
    text: Zum Abschluss zeigen wir dir, wie der Look auch zu Hause leicht gelingt und lange schön bleibt.
```

### 6. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Salon Bellezza: Salon mit Anspruch
items:
  -
    question: Wie lange dauert eine Erstberatung?
    answer: Für neue Kundinnen und Kunden planen wir bewusst mehr Zeit ein.
  -
    question: Welche Produkte verwendet ihr?
    answer: Wir arbeiten mit hochwertigen Pflege- und Farbprodukten, die wir passend zum Haar auswählen.
```

### 7. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Salon Bellezza: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Services
headline: Was uns besonders macht
intro: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
```

### 4. `projectShowcase`

```yaml
eyebrow: Unsere Services
headline: Arbeiten, auf die wir stolz sind
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Glossy Bob
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Signature Blowout
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `lookBook`

```yaml
eyebrow: Unsere Services
headline: Inspiration aus unserem Studio
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Glossy Bob
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Signature Blowout
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Salon Bellezza: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Services
headline: Was uns besonders macht
intro: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
```

### 3. `timeline`

```yaml
items:
  -
    title: Beraten
    text: Wir nehmen uns Zeit für Haarstruktur, Wünsche und Alltag, bevor Schere oder Farbe zum Einsatz kommen.
  -
    title: Stylen
    text: Schnitt, Farbe und Pflege stimmen wir präzise auf deinen Typ und dein gewünschtes Styling ab.
  -
    title: Stylen
    text: Zum Abschluss zeigen wir dir, wie der Look auch zu Hause leicht gelingt und lange schön bleibt.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Sofia Berger
    role: Master Stylistin
    text: Verbindet handwerkliche Präzision, Stilgefühl und ehrliche Beratung für Looks, die zu Mensch und Alltag passen.
  -
    name: Lina Hartmann
    role: Color Expert
    text: Verbindet handwerkliche Präzision, Stilgefühl und ehrliche Beratung für Looks, die zu Mensch und Alltag passen.
  -
    name: Noah Feld
    role: Barber & Styling
    text: Verbindet handwerkliche Präzision, Stilgefühl und ehrliche Beratung für Looks, die zu Mensch und Alltag passen.
```

### 5. `trustStrip`

```yaml
items:
  - Typgerechte Beratung
  - Präzise Schnitte
  - Schonende Farben
  - Online-Terminbuchung
```

### 6. `statsBand`

```yaml
items:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 7. `badgeWall`

```yaml
eyebrow: Unsere Services
headline: Qualität, die sichtbar ist
items:
  - Typgerechte Beratung
  - Schonende Produkte
  - Präzises Styling
  - Faire Preisübersicht
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Kundinnen und Kunden sagen
testimonials:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
items:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Salon Bellezza: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren persönlich für dich da
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Buche deinen Termin oder sende uns deinen Stylingwunsch. Wir beraten dich persönlich und planen genug Zeit ein.
googleMapsUrl: https://maps.google.com/?q=Brüsseler+Straße+22,+50674+Köln
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Wunschtermin
  - Wunschleistung
```

### 3. `locations`

```yaml
locations:
  -
    name: Salon Bellezza
    address: Brüsseler Straße 22, 50674 Köln
    phone: +49 221 123456
    email: hi@example-salon.de
```

### 4. `directions`

```yaml
eyebrow: Unsere Services
headline: So findest du uns
subline: Salon Bellezza liegt gut erreichbar in Köln. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Salon Bellezza: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```
# salon / modern — Studio Nōva Hair

Ton: klar, reduziert und hochwertig.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Klare Linien. Feiner Look.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Termin buchen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 3. `featuredLooks`

```yaml
eyebrow: Unsere Services
headline: Looks, die bleiben
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Glossy Bob
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Signature Blowout
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
```

### 4. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unseren Salon
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
button:
  label: Termin buchen
  href: #kontakt
```

### 5. `brandLogos`

```yaml
items:
  - Partner A
  - Partner B
  - Partner C
  - Partner D
```

### 6. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Studio Nōva Hair: Salon mit Anspruch
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
```

### 7. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Kundinnen und Kunden sagen
testimonials:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
items:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
```

### 8. `storyTeaser`

```yaml
eyebrow: Unsere Services
headline: Warum wir tun, was wir tun
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
button:
  label: Termin buchen
  href: #kontakt
```

### 9. `statsBand`

```yaml
items:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 10. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neue Looks, Pflegeideen und Salon-News
button:
  label: Termin buchen
  href: #kontakt
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Studio Nōva Hair: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Klare Linien. Feiner Look.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Typgerechte Beratung
  - Präzise Schnitte
  - Schonende Farben
  - Online-Terminbuchung
```

### 3. `serviceOverviewCards`

```yaml
eyebrow: Unsere Services
headline: Alles, was du für ein gutes Ergebnis brauchst
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Pflege Treatments
    text: Pflege Treatments mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `productLine`

```yaml
eyebrow: Unsere Services
headline: Pflege, die deinen Look verlängert
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Glossy Bob
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Signature Blowout
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
```

### 5. `steps`

```yaml
eyebrow: Unsere Services
headline: Studio Nōva Hair: Salon mit Anspruch
items:
  -
    title: Beraten
    text: Wir nehmen uns Zeit für Haarstruktur, Wünsche und Alltag, bevor Schere oder Farbe zum Einsatz kommen.
  -
    title: Stylen
    text: Schnitt, Farbe und Pflege stimmen wir präzise auf deinen Typ und dein gewünschtes Styling ab.
  -
    title: Stylen
    text: Zum Abschluss zeigen wir dir, wie der Look auch zu Hause leicht gelingt und lange schön bleibt.
```

### 6. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Studio Nōva Hair: Salon mit Anspruch
items:
  -
    question: Wie lange dauert eine Erstberatung?
    answer: Für neue Kundinnen und Kunden planen wir bewusst mehr Zeit ein.
  -
    question: Welche Produkte verwendet ihr?
    answer: Wir arbeiten mit hochwertigen Pflege- und Farbprodukten, die wir passend zum Haar auswählen.
```

### 7. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Studio Nōva Hair: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Klare Linien. Feiner Look.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Services
headline: Was uns besonders macht
intro: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
```

### 4. `projectShowcase`

```yaml
eyebrow: Unsere Services
headline: Arbeiten, auf die wir stolz sind
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Glossy Bob
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Signature Blowout
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `lookBook`

```yaml
eyebrow: Unsere Services
headline: Inspiration aus unserem Studio
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Glossy Bob
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Signature Blowout
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Studio Nōva Hair: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Klare Linien. Feiner Look.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `storyFacts`

```yaml
description: Wir arbeiten persönlich, klar und mit dem Anspruch, dass sich jedes Detail richtig anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
```

### 3. `teaserList`

```yaml
eyebrow: Unsere Services
headline: Was uns besonders macht
intro: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
```

### 4. `timeline`

```yaml
items:
  -
    title: Beraten
    text: Wir nehmen uns Zeit für Haarstruktur, Wünsche und Alltag, bevor Schere oder Farbe zum Einsatz kommen.
  -
    title: Stylen
    text: Schnitt, Farbe und Pflege stimmen wir präzise auf deinen Typ und dein gewünschtes Styling ab.
  -
    title: Stylen
    text: Zum Abschluss zeigen wir dir, wie der Look auch zu Hause leicht gelingt und lange schön bleibt.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Sofia Berger
    role: Master Stylistin
    text: Verbindet handwerkliche Präzision, Stilgefühl und ehrliche Beratung für Looks, die zu Mensch und Alltag passen.
  -
    name: Lina Hartmann
    role: Color Expert
    text: Verbindet handwerkliche Präzision, Stilgefühl und ehrliche Beratung für Looks, die zu Mensch und Alltag passen.
  -
    name: Noah Feld
    role: Barber & Styling
    text: Verbindet handwerkliche Präzision, Stilgefühl und ehrliche Beratung für Looks, die zu Mensch und Alltag passen.
```

### 6. `trustStrip`

```yaml
items:
  - Typgerechte Beratung
  - Präzise Schnitte
  - Schonende Farben
  - Online-Terminbuchung
```

### 7. `statsBand`

```yaml
items:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 8. `badgeWall`

```yaml
eyebrow: Unsere Services
headline: Qualität, die sichtbar ist
items:
  - Typgerechte Beratung
  - Schonende Produkte
  - Präzises Styling
  - Faire Preisübersicht
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Kundinnen und Kunden sagen
testimonials:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
items:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Studio Nōva Hair: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Klare Linien. Feiner Look.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Buche deinen Termin oder sende uns deinen Stylingwunsch. Wir beraten dich persönlich und planen genug Zeit ein.
googleMapsUrl: https://maps.google.com/?q=Brüsseler+Straße+22,+50674+Köln
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Wunschtermin
  - Wunschleistung
```

### 3. `locations`

```yaml
locations:
  -
    name: Studio Nōva Hair
    address: Brüsseler Straße 22, 50674 Köln
    phone: +49 221 123456
    email: hi@example-salon.de
```

### 4. `directions`

```yaml
eyebrow: Unsere Services
headline: So findest du uns
subline: Studio Nōva Hair liegt gut erreichbar in Köln. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Studio Nōva Hair: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```
# salon / bold — Cut Club Studio

Ton: markant, direkt und energiegeladen.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Mehr Schnitt. Mehr Statement.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `marqueeBand`

```yaml
items:
  - Typgerechte Beratung
  - Präzise Schnitte
  - Schonende Farben
  - Online-Terminbuchung
```

### 3. `featureImage`

```yaml
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
```

### 4. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Termin buchen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 5. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unseren Salon
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
button:
  label: Termin buchen
  href: #kontakt
```

### 6. `featuredLooksBand`

```yaml
eyebrow: Unsere Services
headline: Sichtbare Veränderung, typgerecht umgesetzt
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Glossy Bob
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Signature Blowout
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
```

### 7. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Cut Club Studio: Salon mit Anspruch
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
```

### 8. `storySplit`

```yaml
eyebrow: Unsere Services
headline: Unsere Art, Dinge anders zu machen
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
```

### 9. `statsBand`

```yaml
items:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 10. `testimonialMarquee`

```yaml
items:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
```

### 11. `quoteWall`

```yaml
items:
  - Endlich ein Salon, der zuhört und den Look wirklich passend macht.
  - Wir machen es einfach, klar und angenehm.
  - Jedes Detail soll sich richtig anfühlen.
```

### 12. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neue Looks, Pflegeideen und Salon-News
button:
  label: Termin buchen
  href: #kontakt
```

### 13. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Cut Club Studio: Salon mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Termin buchen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Mehr Schnitt. Mehr Statement.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Typgerechte Beratung
  - Präzise Schnitte
  - Schonende Farben
  - Online-Terminbuchung
```

### 3. `serviceOverviewList`

```yaml
eyebrow: Unsere Services
headline: Unsere Leistungen in klarer Übersicht
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Pflege Treatments
    text: Pflege Treatments mit typgerechter Beratung, präzisem Handwerk und einem Look, der zu dir passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `productLine`

```yaml
eyebrow: Unsere Services
headline: Pflege, die deinen Look verlängert
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Glossy Bob
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Signature Blowout
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
```

### 5. `steps`

```yaml
eyebrow: Unsere Services
headline: Cut Club Studio: Salon mit Anspruch
items:
  -
    title: Beraten
    text: Wir nehmen uns Zeit für Haarstruktur, Wünsche und Alltag, bevor Schere oder Farbe zum Einsatz kommen.
  -
    title: Stylen
    text: Schnitt, Farbe und Pflege stimmen wir präzise auf deinen Typ und dein gewünschtes Styling ab.
  -
    title: Stylen
    text: Zum Abschluss zeigen wir dir, wie der Look auch zu Hause leicht gelingt und lange schön bleibt.
```

### 6. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Cut Club Studio: Salon mit Anspruch
items:
  -
    question: Wie lange dauert eine Erstberatung?
    answer: Für neue Kundinnen und Kunden planen wir bewusst mehr Zeit ein.
  -
    question: Welche Produkte verwendet ihr?
    answer: Wir arbeiten mit hochwertigen Pflege- und Farbprodukten, die wir passend zum Haar auswählen.
```

### 7. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Cut Club Studio: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Mehr Schnitt. Mehr Statement.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Services
headline: Was uns besonders macht
intro: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
```

### 4. `projectShowcase`

```yaml
eyebrow: Unsere Services
headline: Arbeiten, auf die wir stolz sind
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Glossy Bob
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Signature Blowout
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `lookBook`

```yaml
eyebrow: Unsere Services
headline: Inspiration aus unserem Studio
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Soft Balayage
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Glossy Bob
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
  -
    title: Signature Blowout
    text: Ein Look mit sauberer Technik, typgerechter Beratung und hochwertiger Pflege.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Cut Club Studio: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Mehr Schnitt. Mehr Statement.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Services
headline: Was uns besonders macht
intro: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
items:
  -
    title: Haarschnitt & Styling
    text: Haarschnitt & Styling mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Coloration
    text: Coloration mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
  -
    title: Balayage
    text: Balayage mit typgerechter Beratung, präzisem Handwerk und einem Look, der auch im Alltag funktioniert.
```

### 3. `timeline`

```yaml
items:
  -
    title: Beraten
    text: Wir nehmen uns Zeit für Haarstruktur, Wünsche und Alltag, bevor Schere oder Farbe zum Einsatz kommen.
  -
    title: Stylen
    text: Schnitt, Farbe und Pflege stimmen wir präzise auf deinen Typ und dein gewünschtes Styling ab.
  -
    title: Stylen
    text: Zum Abschluss zeigen wir dir, wie der Look auch zu Hause leicht gelingt und lange schön bleibt.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Sofia Berger
    role: Master Stylistin
    text: Verbindet handwerkliche Präzision, Stilgefühl und ehrliche Beratung für Looks, die zu Mensch und Alltag passen.
  -
    name: Lina Hartmann
    role: Color Expert
    text: Verbindet handwerkliche Präzision, Stilgefühl und ehrliche Beratung für Looks, die zu Mensch und Alltag passen.
  -
    name: Noah Feld
    role: Barber & Styling
    text: Verbindet handwerkliche Präzision, Stilgefühl und ehrliche Beratung für Looks, die zu Mensch und Alltag passen.
```

### 5. `trustStrip`

```yaml
items:
  - Typgerechte Beratung
  - Präzise Schnitte
  - Schonende Farben
  - Online-Terminbuchung
```

### 6. `statsBand`

```yaml
items:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 7. `badgeWall`

```yaml
eyebrow: Unsere Services
headline: Qualität, die sichtbar ist
items:
  - Typgerechte Beratung
  - Schonende Produkte
  - Präzises Styling
  - Faire Preisübersicht
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Kundinnen und Kunden sagen
testimonials:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
items:
  -
    quote: Endlich ein Salon, der zuhört und den Look wirklich passend macht.
    name: Alex M.
    context: Kunde
  -
    quote: Die Beratung war ehrlich, der Schnitt sitzt auch Wochen später.
    name: Samira K.
    context: Kundin
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Cut Club Studio: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Mehr Schnitt. Mehr Statement.
headline: Haare, Haut und Styling mit einem Gefühl für dich
subline: Wir nehmen uns Zeit für Beratung, präzise Schnitte und Farben, die zu deinem Alltag passen.
description: Unser Anspruch ist ein Look, der nicht nur im Spiegel überzeugt, sondern sich jeden Tag gut anfühlt.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Friseursalon, Haarstyling, Coloration, Balayage, Pflegebehandlung."
buttonPrimary:
  label: Termin buchen
  href: #kontakt
stats:
  -
    value: 15+
    label: Jahre Erfahrung
  -
    value: 100%
    label: persönliche Beratung
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Buche deinen Termin oder sende uns deinen Stylingwunsch. Wir beraten dich persönlich und planen genug Zeit ein.
googleMapsUrl: https://maps.google.com/?q=Brüsseler+Straße+22,+50674+Köln
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Wunschtermin
  - Wunschleistung
```

### 3. `locations`

```yaml
locations:
  -
    name: Cut Club Studio
    address: Brüsseler Straße 22, 50674 Köln
    phone: +49 221 123456
    email: hi@example-salon.de
```

### 4. `directions`

```yaml
eyebrow: Unsere Services
headline: So findest du uns
subline: Cut Club Studio liegt gut erreichbar in Köln. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Cut Club Studio: Salon mit Anspruch
subline: Wir freuen uns darauf, dich im Salon zu begrüßen.
button:
  label: Termin buchen
  href: #kontakt
```
# tradesman / classic — Meisterbetrieb Hartmann

Ton: zeitlos, warm und vertrauensvoll.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Handwerk, auf das du dich verlassen kannst
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `stickyEmergencyBanner`

```yaml
phone: +49 711 123456
label: Schnelle Hilfe
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
```

### 3. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 4. `featuredServices`

```yaml
eyebrow: Unsere Leistungen
headline: Leistungen, auf die du dich verlassen kannst
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Notdienst
    text: Notdienst mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 5. `fundingCalculator`

```yaml
investmentMin: 1000
investmentMax: 25000
investmentStep: 500
investmentDefault: 5000
programs:
  -
    name: Basis
    rate: 3.9%
    duration: 12 Monate
  -
    name: Komfort
    rate: 4.4%
    duration: 24 Monate
```

### 6. `statsBand`

```yaml
items:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 7. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
```

### 8. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick auf unsere Arbeit
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
button:
  label: Projekt anfragen
  href: #kontakt
```

### 9. `responsePromise`

```yaml
eyebrow: Unsere Leistungen
headline: Wir melden uns schnell und verbindlich
description: Du bekommst eine ehrliche Einschätzung, klare nächste Schritte und eine Rückmeldung, auf die du dich verlassen kannst.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 10. `newsHighlightList`

```yaml
eyebrow: Unsere Leistungen
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
featuredImage: ANWEISUNG: Passendes Bild online suchen und Demo-Pfad ersetzen.
posts:
  -
    title: Saisonstart mit neuen Ideen
    text: Wir haben unser Angebot aktualisiert und freuen uns auf die nächsten Wochen.
  -
    title: Ein Blick auf unsere Arbeit
    text: So entstehen bei uns Qualität, Atmosphäre und verlässliche Abläufe.
```

### 11. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Auftraggeber über uns sagen
testimonials:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
items:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
```

### 12. `storyTeaser`

```yaml
eyebrow: Unsere Leistungen
headline: Warum wir tun, was wir tun
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
button:
  label: Projekt anfragen
  href: #kontakt
```

### 13. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Aktuelles aus Projekten und Werkstatt
button:
  label: Projekt anfragen
  href: #kontakt
```

### 14. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Handwerk, auf das du dich verlassen kannst
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `stickyEmergencyBanner`

```yaml
phone: +49 711 123456
label: Schnelle Hilfe
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
```

### 3. `highlightsBar`

```yaml
items:
  - Saubere Baustelle
  - Termintreue Ausführung
  - Klare Kostenvoranschläge
  - Notdienst nach Absprache
```

### 4. `serviceOverviewCards`

```yaml
eyebrow: Unsere Leistungen
headline: Alles, was du für ein gutes Ergebnis brauchst
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Notdienst
    text: Notdienst mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 5. `fundingCalculator`

```yaml
investmentMin: 1000
investmentMax: 25000
investmentStep: 500
investmentDefault: 5000
programs:
  -
    name: Basis
    rate: 3.9%
    duration: 12 Monate
  -
    name: Komfort
    rate: 4.4%
    duration: 24 Monate
```

### 6. `steps`

```yaml
eyebrow: Unsere Leistungen
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
items:
  -
    title: Besichtigen
    text: Wir prüfen die Situation vor Ort, klären Anforderungen und sagen ehrlich, welche Lösung sinnvoll ist.
  -
    title: Angebot erstellen
    text: Du erhältst eine nachvollziehbare Einschätzung mit Leistungsumfang, Material und Zeitplan.
  -
    title: Fachgerecht ausführen
    text: Unser Team arbeitet sauber, zuverlässig und so, dass das Ergebnis langfristig hält.
```

### 7. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
items:
  -
    question: Wie schnell meldet ihr euch zurück?
    answer: In der Regel erhältst du innerhalb eines Werktags eine persönliche Rückmeldung.
  -
    question: Arbeitet ihr auch für Hausverwaltungen?
    answer: Ja, wir betreuen private, gewerbliche und verwaltete Objekte.
```

### 8. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Handwerk, auf das du dich verlassen kannst
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Leistungen
headline: Was uns besonders macht
intro: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
```

### 4. `projectShowcase`

```yaml
eyebrow: Unsere Leistungen
headline: Arbeiten, auf die wir stolz sind
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Badmodernisierung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elektro-Check
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Heizungswartung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `categoryCards`

```yaml
eyebrow: Unsere Leistungen
headline: Unsere Schwerpunkte
items:
  -
    title: Badmodernisierung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elektro-Check
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Heizungswartung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Handwerk, auf das du dich verlassen kannst
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `storyImageSplit`

```yaml
eyebrow: Unsere Leistungen
headline: Handwerk mit Haltung
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
```

### 3. `teaserList`

```yaml
eyebrow: Unsere Leistungen
headline: Was uns besonders macht
intro: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 4. `timeline`

```yaml
items:
  -
    title: Besichtigen
    text: Wir prüfen die Situation vor Ort, klären Anforderungen und sagen ehrlich, welche Lösung sinnvoll ist.
  -
    title: Angebot erstellen
    text: Du erhältst eine nachvollziehbare Einschätzung mit Leistungsumfang, Material und Zeitplan.
  -
    title: Fachgerecht ausführen
    text: Unser Team arbeitet sauber, zuverlässig und so, dass das Ergebnis langfristig hält.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Thomas Hartmann
    role: Meister
    text: Verbindet handwerkliche Erfahrung, saubere Ausführung und verlässliche Kommunikation auf der Baustelle.
  -
    name: Mila Schneider
    role: Projektleitung
    text: Verbindet handwerkliche Erfahrung, saubere Ausführung und verlässliche Kommunikation auf der Baustelle.
  -
    name: Emre Kaya
    role: Servicetechnik
    text: Verbindet handwerkliche Erfahrung, saubere Ausführung und verlässliche Kommunikation auf der Baustelle.
```

### 6. `trustStrip`

```yaml
items:
  - Saubere Baustelle
  - Termintreue Ausführung
  - Klare Kostenvoranschläge
  - Notdienst nach Absprache
```

### 7. `statsBand`

```yaml
items:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 8. `qualifications`

```yaml
eyebrow: Unsere Leistungen
headline: Qualifikation, die Sicherheit gibt
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 9. `badgeWall`

```yaml
eyebrow: Unsere Leistungen
headline: Qualität, die sichtbar ist
items:
  - Meisterqualität
  - Saubere Ausführung
  - Geprüfte Materialien
  - Klare Kostenvoranschläge
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Auftraggeber über uns sagen
testimonials:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
items:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Handwerk, auf das du dich verlassen kannst
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Beschreibe dein Projekt, den Einsatzort und den gewünschten Zeitraum. Wir melden uns mit einer verlässlichen Einschätzung.
googleMapsUrl: https://maps.google.com/?q=Werkstraße+9,+70173+Stuttgart
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Einsatztermin
  - Projektbeschreibung
```

### 3. `serviceAreaMap`

```yaml
eyebrow: Unsere Leistungen
headline: Wir sind in deiner Nähe im Einsatz
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Innenstadt
    text: Schnelle Termine und kurze Wege.
  -
    title: Umland
    text: Planbare Einsätze nach Absprache.
```

### 4. `locations`

```yaml
locations:
  -
    name: Meisterbetrieb Hartmann
    address: Werkstraße 9, 70173 Stuttgart
    phone: +49 711 123456
    email: kontakt@example-handwerk.de
```

### 5. `directions`

```yaml
eyebrow: Unsere Leistungen
headline: So findest du uns
subline: Meisterbetrieb Hartmann liegt gut erreichbar in Stuttgart. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Meisterbetrieb Hartmann: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```
# tradesman / modern — Werkraum Technik

Ton: klar, reduziert und hochwertig.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Sauber geplant. Präzise montiert.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `stickyEmergencyBanner`

```yaml
phone: +49 711 123456
label: Schnelle Hilfe
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
```

### 3. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 4. `statsBand`

```yaml
items:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 5. `serviceCards`

```yaml
eyebrow: Unsere Leistungen
headline: Leistungen, die genau zu deinem Bedarf passen
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Notdienst
    text: Notdienst mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 6. `fundingCalculator`

```yaml
investmentMin: 1000
investmentMax: 25000
investmentStep: 500
investmentDefault: 5000
programs:
  -
    name: Basis
    rate: 3.9%
    duration: 12 Monate
  -
    name: Komfort
    rate: 4.4%
    duration: 24 Monate
```

### 7. `topicCards`

```yaml
items:
  -
    title: Badmodernisierung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elektro-Check
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Heizungswartung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 8. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
```

### 9. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick auf unsere Arbeit
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
button:
  label: Projekt anfragen
  href: #kontakt
```

### 10. `responsePromise`

```yaml
eyebrow: Unsere Leistungen
headline: Wir melden uns schnell und verbindlich
description: Du bekommst eine ehrliche Einschätzung, klare nächste Schritte und eine Rückmeldung, auf die du dich verlassen kannst.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 11. `keywordBand`

```yaml
items:
  - Saubere Baustelle
  - Termintreue Ausführung
  - Klare Kostenvoranschläge
  - Notdienst nach Absprache
```

### 12. `storyTeaser`

```yaml
eyebrow: Unsere Leistungen
headline: Warum wir tun, was wir tun
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
button:
  label: Projekt anfragen
  href: #kontakt
```

### 13. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Auftraggeber über uns sagen
testimonials:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
items:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
```

### 14. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Aktuelles aus Projekten und Werkstatt
button:
  label: Projekt anfragen
  href: #kontakt
```

### 15. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Sauber geplant. Präzise montiert.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `stickyEmergencyBanner`

```yaml
phone: +49 711 123456
label: Schnelle Hilfe
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
```

### 3. `highlightsBar`

```yaml
items:
  - Saubere Baustelle
  - Termintreue Ausführung
  - Klare Kostenvoranschläge
  - Notdienst nach Absprache
```

### 4. `serviceCards`

```yaml
eyebrow: Unsere Leistungen
headline: Leistungen, die genau zu deinem Bedarf passen
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Notdienst
    text: Notdienst mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 5. `fundingCalculator`

```yaml
investmentMin: 1000
investmentMax: 25000
investmentStep: 500
investmentDefault: 5000
programs:
  -
    name: Basis
    rate: 3.9%
    duration: 12 Monate
  -
    name: Komfort
    rate: 4.4%
    duration: 24 Monate
```

### 6. `steps`

```yaml
eyebrow: Unsere Leistungen
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
items:
  -
    title: Besichtigen
    text: Wir prüfen die Situation vor Ort, klären Anforderungen und sagen ehrlich, welche Lösung sinnvoll ist.
  -
    title: Angebot erstellen
    text: Du erhältst eine nachvollziehbare Einschätzung mit Leistungsumfang, Material und Zeitplan.
  -
    title: Fachgerecht ausführen
    text: Unser Team arbeitet sauber, zuverlässig und so, dass das Ergebnis langfristig hält.
```

### 7. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
items:
  -
    question: Wie schnell meldet ihr euch zurück?
    answer: In der Regel erhältst du innerhalb eines Werktags eine persönliche Rückmeldung.
  -
    question: Arbeitet ihr auch für Hausverwaltungen?
    answer: Ja, wir betreuen private, gewerbliche und verwaltete Objekte.
```

### 8. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Sauber geplant. Präzise montiert.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Leistungen
headline: Was uns besonders macht
intro: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
```

### 4. `projectShowcase`

```yaml
eyebrow: Unsere Leistungen
headline: Arbeiten, auf die wir stolz sind
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Badmodernisierung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elektro-Check
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Heizungswartung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `categoryCards`

```yaml
eyebrow: Unsere Leistungen
headline: Unsere Schwerpunkte
items:
  -
    title: Badmodernisierung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elektro-Check
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Heizungswartung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Sauber geplant. Präzise montiert.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Leistungen
headline: Was uns besonders macht
intro: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 3. `timeline`

```yaml
items:
  -
    title: Besichtigen
    text: Wir prüfen die Situation vor Ort, klären Anforderungen und sagen ehrlich, welche Lösung sinnvoll ist.
  -
    title: Angebot erstellen
    text: Du erhältst eine nachvollziehbare Einschätzung mit Leistungsumfang, Material und Zeitplan.
  -
    title: Fachgerecht ausführen
    text: Unser Team arbeitet sauber, zuverlässig und so, dass das Ergebnis langfristig hält.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Thomas Hartmann
    role: Meister
    text: Verbindet handwerkliche Erfahrung, saubere Ausführung und verlässliche Kommunikation auf der Baustelle.
  -
    name: Mila Schneider
    role: Projektleitung
    text: Verbindet handwerkliche Erfahrung, saubere Ausführung und verlässliche Kommunikation auf der Baustelle.
  -
    name: Emre Kaya
    role: Servicetechnik
    text: Verbindet handwerkliche Erfahrung, saubere Ausführung und verlässliche Kommunikation auf der Baustelle.
```

### 5. `trustStrip`

```yaml
items:
  - Saubere Baustelle
  - Termintreue Ausführung
  - Klare Kostenvoranschläge
  - Notdienst nach Absprache
```

### 6. `statsBand`

```yaml
items:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 7. `qualifications`

```yaml
eyebrow: Unsere Leistungen
headline: Qualifikation, die Sicherheit gibt
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 8. `badgeWall`

```yaml
eyebrow: Unsere Leistungen
headline: Qualität, die sichtbar ist
items:
  - Meisterqualität
  - Saubere Ausführung
  - Geprüfte Materialien
  - Klare Kostenvoranschläge
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Auftraggeber über uns sagen
testimonials:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
items:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Sauber geplant. Präzise montiert.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Beschreibe dein Projekt, den Einsatzort und den gewünschten Zeitraum. Wir melden uns mit einer verlässlichen Einschätzung.
googleMapsUrl: https://maps.google.com/?q=Werkstraße+9,+70173+Stuttgart
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Einsatztermin
  - Projektbeschreibung
```

### 3. `serviceAreaMap`

```yaml
eyebrow: Unsere Leistungen
headline: Wir sind in deiner Nähe im Einsatz
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Innenstadt
    text: Schnelle Termine und kurze Wege.
  -
    title: Umland
    text: Planbare Einsätze nach Absprache.
```

### 4. `locations`

```yaml
locations:
  -
    name: Werkraum Technik
    address: Werkstraße 9, 70173 Stuttgart
    phone: +49 711 123456
    email: kontakt@example-handwerk.de
```

### 5. `directions`

```yaml
eyebrow: Unsere Leistungen
headline: So findest du uns
subline: Werkraum Technik liegt gut erreichbar in Stuttgart. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Werkraum Technik: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```
# tradesman / bold — Fix & Fertig Profis

Ton: markant, direkt und energiegeladen.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Mehr Tempo. Mehr Handwerk.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `stickyEmergencyBanner`

```yaml
phone: +49 711 123456
label: Schnelle Hilfe
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
```

### 3. `marqueeBand`

```yaml
items:
  - Saubere Baustelle
  - Termintreue Ausführung
  - Klare Kostenvoranschläge
  - Notdienst nach Absprache
```

### 4. `featureImage`

```yaml
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
```

### 5. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 6. `serviceList`

```yaml
eyebrow: Unsere Leistungen
headline: Starke Leistungen. Klar auf den Punkt.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Notdienst
    text: Notdienst mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 7. `fundingCalculator`

```yaml
investmentMin: 1000
investmentMax: 25000
investmentStep: 500
investmentDefault: 5000
programs:
  -
    name: Basis
    rate: 3.9%
    duration: 12 Monate
  -
    name: Komfort
    rate: 4.4%
    duration: 24 Monate
```

### 8. `topicBand`

```yaml
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
phone: +49 711 123456
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 9. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
```

### 10. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick auf unsere Arbeit
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
button:
  label: Projekt anfragen
  href: #kontakt
```

### 11. `responsePromise`

```yaml
eyebrow: Unsere Leistungen
headline: Wir melden uns schnell und verbindlich
description: Du bekommst eine ehrliche Einschätzung, klare nächste Schritte und eine Rückmeldung, auf die du dich verlassen kannst.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 12. `statsBand`

```yaml
items:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 13. `storySplit`

```yaml
eyebrow: Unsere Leistungen
headline: Unsere Art, Dinge anders zu machen
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
```

### 14. `testimonialMarquee`

```yaml
items:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
```

### 15. `quoteWall`

```yaml
items:
  - Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
  - Wir machen es einfach, klar und angenehm.
  - Jedes Detail soll sich richtig anfühlen.
```

### 16. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Aktuelles aus Projekten und Werkstatt
button:
  label: Projekt anfragen
  href: #kontakt
```

### 17. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Mehr Tempo. Mehr Handwerk.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `stickyEmergencyBanner`

```yaml
phone: +49 711 123456
label: Schnelle Hilfe
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
```

### 3. `highlightsBar`

```yaml
items:
  - Saubere Baustelle
  - Termintreue Ausführung
  - Klare Kostenvoranschläge
  - Notdienst nach Absprache
```

### 4. `serviceList`

```yaml
eyebrow: Unsere Leistungen
headline: Starke Leistungen. Klar auf den Punkt.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Notdienst
    text: Notdienst mit sauberer Ausführung, klarer Abstimmung und einem Ergebnis, das dauerhaft hält.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 5. `fundingCalculator`

```yaml
investmentMin: 1000
investmentMax: 25000
investmentStep: 500
investmentDefault: 5000
programs:
  -
    name: Basis
    rate: 3.9%
    duration: 12 Monate
  -
    name: Komfort
    rate: 4.4%
    duration: 24 Monate
```

### 6. `steps`

```yaml
eyebrow: Unsere Leistungen
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
items:
  -
    title: Besichtigen
    text: Wir prüfen die Situation vor Ort, klären Anforderungen und sagen ehrlich, welche Lösung sinnvoll ist.
  -
    title: Angebot erstellen
    text: Du erhältst eine nachvollziehbare Einschätzung mit Leistungsumfang, Material und Zeitplan.
  -
    title: Fachgerecht ausführen
    text: Unser Team arbeitet sauber, zuverlässig und so, dass das Ergebnis langfristig hält.
```

### 7. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
items:
  -
    question: Wie schnell meldet ihr euch zurück?
    answer: In der Regel erhältst du innerhalb eines Werktags eine persönliche Rückmeldung.
  -
    question: Arbeitet ihr auch für Hausverwaltungen?
    answer: Ja, wir betreuen private, gewerbliche und verwaltete Objekte.
```

### 8. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Mehr Tempo. Mehr Handwerk.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Leistungen
headline: Was uns besonders macht
intro: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
```

### 4. `projectShowcase`

```yaml
eyebrow: Unsere Leistungen
headline: Arbeiten, auf die wir stolz sind
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Badmodernisierung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elektro-Check
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Heizungswartung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `categoryCards`

```yaml
eyebrow: Unsere Leistungen
headline: Unsere Schwerpunkte
items:
  -
    title: Badmodernisierung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elektro-Check
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Heizungswartung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Mehr Tempo. Mehr Handwerk.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `storyImageSplit`

```yaml
eyebrow: Unsere Leistungen
headline: Handwerk mit Haltung
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
```

### 3. `teaserList`

```yaml
eyebrow: Unsere Leistungen
headline: Was uns besonders macht
intro: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 4. `timeline`

```yaml
items:
  -
    title: Besichtigen
    text: Wir prüfen die Situation vor Ort, klären Anforderungen und sagen ehrlich, welche Lösung sinnvoll ist.
  -
    title: Angebot erstellen
    text: Du erhältst eine nachvollziehbare Einschätzung mit Leistungsumfang, Material und Zeitplan.
  -
    title: Fachgerecht ausführen
    text: Unser Team arbeitet sauber, zuverlässig und so, dass das Ergebnis langfristig hält.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Thomas Hartmann
    role: Meister
    text: Verbindet handwerkliche Erfahrung, saubere Ausführung und verlässliche Kommunikation auf der Baustelle.
  -
    name: Mila Schneider
    role: Projektleitung
    text: Verbindet handwerkliche Erfahrung, saubere Ausführung und verlässliche Kommunikation auf der Baustelle.
  -
    name: Emre Kaya
    role: Servicetechnik
    text: Verbindet handwerkliche Erfahrung, saubere Ausführung und verlässliche Kommunikation auf der Baustelle.
```

### 6. `trustStrip`

```yaml
items:
  - Saubere Baustelle
  - Termintreue Ausführung
  - Klare Kostenvoranschläge
  - Notdienst nach Absprache
```

### 7. `statsBand`

```yaml
items:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 8. `qualifications`

```yaml
eyebrow: Unsere Leistungen
headline: Qualifikation, die Sicherheit gibt
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Sanierung
    text: Sanierung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Reparaturservice
    text: Reparaturservice mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
  -
    title: Wartung
    text: Wartung mit sauberer Ausführung, passenden Materialien und einem Ergebnis, das im Alltag zuverlässig hält.
```

### 9. `badgeWall`

```yaml
eyebrow: Unsere Leistungen
headline: Qualität, die sichtbar ist
items:
  - Meisterqualität
  - Saubere Ausführung
  - Geprüfte Materialien
  - Klare Kostenvoranschläge
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Auftraggeber über uns sagen
testimonials:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
items:
  -
    quote: Pünktlich, sauber und transparent. Genau so wünscht man sich Handwerk.
    name: Alex M.
    context: Auftraggeber
  -
    quote: Sauber gearbeitet, pünktlich abgeschlossen und transparent erklärt.
    name: Samira K.
    context: Auftraggeberin
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Mehr Tempo. Mehr Handwerk.
headline: Saubere Arbeit, klare Absprachen und Lösungen, die lange halten
subline: Wir kümmern uns um Reparaturen, Modernisierung und Wartung mit verbindlichen Terminen und ehrlichem Handwerk.
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Handwerk, Baustelle, Werkzeug, Meisterbetrieb, Montage."
buttonPrimary:
  label: Projekt anfragen
  href: #kontakt
stats:
  -
    value: 24h
    label: Rückmeldung
  -
    value: 18
    label: Fachkräfte
  -
    value: 4.8/5
    label: Kundenbewertung
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Beschreibe dein Projekt, den Einsatzort und den gewünschten Zeitraum. Wir melden uns mit einer verlässlichen Einschätzung.
googleMapsUrl: https://maps.google.com/?q=Werkstraße+9,+70173+Stuttgart
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Einsatztermin
  - Projektbeschreibung
```

### 3. `serviceAreaMap`

```yaml
eyebrow: Unsere Leistungen
headline: Wir sind in deiner Nähe im Einsatz
description: Vom ersten Anruf bis zur fertigen Übergabe weißt du bei uns, was passiert, wann es passiert und was es kostet.
items:
  -
    title: Innenstadt
    text: Schnelle Termine und kurze Wege.
  -
    title: Umland
    text: Planbare Einsätze nach Absprache.
```

### 4. `locations`

```yaml
locations:
  -
    name: Fix & Fertig Profis
    address: Werkstraße 9, 70173 Stuttgart
    phone: +49 711 123456
    email: kontakt@example-handwerk.de
```

### 5. `directions`

```yaml
eyebrow: Unsere Leistungen
headline: So findest du uns
subline: Fix & Fertig Profis liegt gut erreichbar in Stuttgart. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Fix & Fertig Profis: Handwerksbetrieb mit Anspruch
subline: Wir freuen uns darauf, dein Projekt fachgerecht umzusetzen.
button:
  label: Projekt anfragen
  href: #kontakt
```
# consulting / classic — Klarwerk Consulting

Ton: zeitlos, warm und vertrauensvoll.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren als Sparringspartner an deiner Seite
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 3. `keywordBand`

```yaml
items:
  - Strategische Klarheit
  - Umsetzungsfahrplan
  - Messbare Ergebnisse
  - Vertrauliche Begleitung
```

### 4. `storyTeaser`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Warum wir tun, was wir tun
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 5. `serviceCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Change Begleitung
    text: Change Begleitung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Workshop Formate
    text: Workshop Formate mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 6. `processTextColumns`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Vom ersten Gespräch bis zur Umsetzung
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Analysieren
    text: Wir erfassen Ausgangslage, Ziele, Engpässe und Entscheidungslogik, bevor wir Empfehlungen ableiten.
  -
    title: Priorisieren
    text: Gemeinsam übersetzen wir Erkenntnisse in klare Handlungsfelder, Verantwortlichkeiten und nächste Schritte.
  -
    title: Implementieren
    text: Wir begleiten die Umsetzung mit Fokus auf Wirkung, Akzeptanz im Team und messbare Ergebnisse.
```

### 7. `pricingPackages`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Pakete mit klarem Umfang
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Essential
    text: Der klare Einstieg mit passendem Umfang und klarer Orientierung.
    price: ab 199 €
  -
    title: Signature
    text: Unser bewährtes Paket mit mehr Begleitung, Flexibilität und klarer Umsetzung.
    price: ab 399 €
  -
    title: Premium
    text: Maximale Begleitung mit individueller Planung und bevorzugter Abstimmung.
    price: auf Anfrage
```

### 8. `caseStudyCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Ergebnisse, die zeigen, wie wir arbeiten
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Wachstumsstrategie
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Operating Model
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Leadership Sprint
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 9. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Julia Meier
    role: Partnerin
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: David Klein
    role: Senior Consultant
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: Nora Beck
    role: Workshop Lead
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
```

### 10. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Klarwerk Consulting: Beratung mit Anspruch
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
```

### 11. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Arbeitsweise
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 12. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 13. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Impulse aus Strategie und Umsetzung
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 14. `contactPreview`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Lass uns ins Gespräch kommen
description: Erzähl uns, was du vorhast. Wir melden uns mit einer passenden Empfehlung.
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren als Sparringspartner an deiner Seite
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Strategische Klarheit
  - Umsetzungsfahrplan
  - Messbare Ergebnisse
  - Vertrauliche Begleitung
```

### 3. `serviceCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Change Begleitung
    text: Change Begleitung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Workshop Formate
    text: Workshop Formate mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `comparisonTable`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Finde die passende Option
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Basis
    included: Klarer Einstieg mit definiertem Umfang und transparenter Leistung
  -
    title: Plus
    included: Mehr Begleitung, flexible Abstimmung und priorisierte Umsetzung
  -
    title: Individuell
    included: Individuelle Lösung nach Bedarf und Zielsetzung
```

### 5. `processCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: So einfach wird der Weg zu deinem Ergebnis
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Analysieren
    text: Wir erfassen Ausgangslage, Ziele, Engpässe und Entscheidungslogik, bevor wir Empfehlungen ableiten.
  -
    title: Priorisieren
    text: Gemeinsam übersetzen wir Erkenntnisse in klare Handlungsfelder, Verantwortlichkeiten und nächste Schritte.
  -
    title: Implementieren
    text: Wir begleiten die Umsetzung mit Fokus auf Wirkung, Akzeptanz im Team und messbare Ergebnisse.
```

### 6. `pricingPackages`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Pakete mit klarem Umfang
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Essential
    text: Der klare Einstieg mit passendem Umfang und klarer Orientierung.
    price: ab 199 €
  -
    title: Signature
    text: Unser bewährtes Paket mit mehr Begleitung, Flexibilität und klarer Umsetzung.
    price: ab 399 €
  -
    title: Premium
    text: Maximale Begleitung mit individueller Planung und bevorzugter Abstimmung.
    price: auf Anfrage
```

### 7. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 8. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Arbeitsweise
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 9. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Klarwerk Consulting: Beratung mit Anspruch
items:
  -
    question: Wie startet die Zusammenarbeit?
    answer: Wir beginnen mit einem kompakten Analysegespräch und definieren danach Ziele, Umfang und nächste Schritte.
  -
    question: Arbeitet ihr auch projektbasiert?
    answer: Ja, wir begleiten sowohl einzelne Workshops als auch mehrmonatige Transformationsprojekte.
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Klarwerk Consulting: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren als Sparringspartner an deiner Seite
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Was uns besonders macht
intro: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Change Begleitung
    text: Change Begleitung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
```

### 4. `categoryCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Unsere Schwerpunkte
items:
  -
    title: Wachstumsstrategie
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Operating Model
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Leadership Sprint
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Klarwerk Consulting: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren als Sparringspartner an deiner Seite
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Was uns besonders macht
intro: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Change Begleitung
    text: Change Begleitung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
```

### 3. `timeline`

```yaml
items:
  -
    title: Analysieren
    text: Wir erfassen Ausgangslage, Ziele, Engpässe und Entscheidungslogik, bevor wir Empfehlungen ableiten.
  -
    title: Priorisieren
    text: Gemeinsam übersetzen wir Erkenntnisse in klare Handlungsfelder, Verantwortlichkeiten und nächste Schritte.
  -
    title: Implementieren
    text: Wir begleiten die Umsetzung mit Fokus auf Wirkung, Akzeptanz im Team und messbare Ergebnisse.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Julia Meier
    role: Partnerin
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: David Klein
    role: Senior Consultant
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: Nora Beck
    role: Workshop Lead
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
```

### 5. `trustStrip`

```yaml
items:
  - Strategische Klarheit
  - Umsetzungsfahrplan
  - Messbare Ergebnisse
  - Vertrauliche Begleitung
```

### 6. `statsBand`

```yaml
items:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 7. `impactNumbers`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Was unsere Arbeit messbar macht
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 8. `badgeWall`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Qualität, die sichtbar ist
items:
  - Vertrauliche Beratung
  - Messbare Ergebnisse
  - Erfahrene Sparringspartner
  - Klare Umsetzung
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Klarwerk Consulting: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Seit Jahren als Sparringspartner an deiner Seite
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Beschreibe kurz Ausgangslage, Ziel und Zeithorizont. Wir melden uns für ein vertrauliches Erstgespräch.
googleMapsUrl: https://maps.google.com/?q=Mainkai+14,+60311+Frankfurt+am+Main
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Terminwunsch
  - Ausgangslage
```

### 3. `locations`

```yaml
locations:
  -
    name: Klarwerk Consulting
    address: Mainkai 14, 60311 Frankfurt am Main
    phone: +49 69 123456
    email: hello@example-consulting.de
```

### 4. `directions`

```yaml
eyebrow: Beratungsschwerpunkte
headline: So findest du uns
subline: Klarwerk Consulting liegt gut erreichbar in Frankfurt. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Klarwerk Consulting: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```
# consulting / modern — Northstar Strategy

Ton: klar, reduziert und hochwertig.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Klar analysiert. Wirksam umgesetzt.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 3. `serviceCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Change Begleitung
    text: Change Begleitung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Workshop Formate
    text: Workshop Formate mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Arbeitsweise
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 5. `brandLogos`

```yaml
items:
  - Partner A
  - Partner B
  - Partner C
  - Partner D
```

### 6. `storyTeaser`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Warum wir tun, was wir tun
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 7. `processTextColumns`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Vom ersten Gespräch bis zur Umsetzung
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Analysieren
    text: Wir erfassen Ausgangslage, Ziele, Engpässe und Entscheidungslogik, bevor wir Empfehlungen ableiten.
  -
    title: Priorisieren
    text: Gemeinsam übersetzen wir Erkenntnisse in klare Handlungsfelder, Verantwortlichkeiten und nächste Schritte.
  -
    title: Implementieren
    text: Wir begleiten die Umsetzung mit Fokus auf Wirkung, Akzeptanz im Team und messbare Ergebnisse.
```

### 8. `pricingPackages`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Pakete mit klarem Umfang
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Essential
    text: Der klare Einstieg mit passendem Umfang und klarer Orientierung.
    price: ab 199 €
  -
    title: Signature
    text: Unser bewährtes Paket mit mehr Begleitung, Flexibilität und klarer Umsetzung.
    price: ab 399 €
  -
    title: Premium
    text: Maximale Begleitung mit individueller Planung und bevorzugter Abstimmung.
    price: auf Anfrage
```

### 9. `caseStudyCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Ergebnisse, die zeigen, wie wir arbeiten
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Wachstumsstrategie
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Operating Model
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Leadership Sprint
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 10. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Julia Meier
    role: Partnerin
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: David Klein
    role: Senior Consultant
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: Nora Beck
    role: Workshop Lead
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
```

### 11. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Northstar Strategy: Beratung mit Anspruch
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
```

### 12. `statsBand`

```yaml
items:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 13. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 14. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Impulse aus Strategie und Umsetzung
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 15. `contactPreview`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Lass uns ins Gespräch kommen
description: Erzähl uns, was du vorhast. Wir melden uns mit einer passenden Empfehlung.
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Klar analysiert. Wirksam umgesetzt.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Strategische Klarheit
  - Umsetzungsfahrplan
  - Messbare Ergebnisse
  - Vertrauliche Begleitung
```

### 3. `serviceCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Change Begleitung
    text: Change Begleitung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Workshop Formate
    text: Workshop Formate mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `comparisonTable`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Finde die passende Option
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Basis
    included: Klarer Einstieg mit definiertem Umfang und transparenter Leistung
  -
    title: Plus
    included: Mehr Begleitung, flexible Abstimmung und priorisierte Umsetzung
  -
    title: Individuell
    included: Individuelle Lösung nach Bedarf und Zielsetzung
```

### 5. `processCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: So einfach wird der Weg zu deinem Ergebnis
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Analysieren
    text: Wir erfassen Ausgangslage, Ziele, Engpässe und Entscheidungslogik, bevor wir Empfehlungen ableiten.
  -
    title: Priorisieren
    text: Gemeinsam übersetzen wir Erkenntnisse in klare Handlungsfelder, Verantwortlichkeiten und nächste Schritte.
  -
    title: Implementieren
    text: Wir begleiten die Umsetzung mit Fokus auf Wirkung, Akzeptanz im Team und messbare Ergebnisse.
```

### 6. `pricingPackages`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Pakete mit klarem Umfang
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Essential
    text: Der klare Einstieg mit passendem Umfang und klarer Orientierung.
    price: ab 199 €
  -
    title: Signature
    text: Unser bewährtes Paket mit mehr Begleitung, Flexibilität und klarer Umsetzung.
    price: ab 399 €
  -
    title: Premium
    text: Maximale Begleitung mit individueller Planung und bevorzugter Abstimmung.
    price: auf Anfrage
```

### 7. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 8. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Arbeitsweise
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 9. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Northstar Strategy: Beratung mit Anspruch
items:
  -
    question: Wie startet die Zusammenarbeit?
    answer: Wir beginnen mit einem kompakten Analysegespräch und definieren danach Ziele, Umfang und nächste Schritte.
  -
    question: Arbeitet ihr auch projektbasiert?
    answer: Ja, wir begleiten sowohl einzelne Workshops als auch mehrmonatige Transformationsprojekte.
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Northstar Strategy: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Klar analysiert. Wirksam umgesetzt.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Was uns besonders macht
intro: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Change Begleitung
    text: Change Begleitung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
```

### 4. `categoryCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Unsere Schwerpunkte
items:
  -
    title: Wachstumsstrategie
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Operating Model
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Leadership Sprint
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Northstar Strategy: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Klar analysiert. Wirksam umgesetzt.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `storyFacts`

```yaml
description: Wir arbeiten persönlich, klar und mit dem Anspruch, dass sich jedes Detail richtig anfühlt.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Change Begleitung
    text: Change Begleitung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
```

### 3. `teaserList`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Was uns besonders macht
intro: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Change Begleitung
    text: Change Begleitung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
```

### 4. `timeline`

```yaml
items:
  -
    title: Analysieren
    text: Wir erfassen Ausgangslage, Ziele, Engpässe und Entscheidungslogik, bevor wir Empfehlungen ableiten.
  -
    title: Priorisieren
    text: Gemeinsam übersetzen wir Erkenntnisse in klare Handlungsfelder, Verantwortlichkeiten und nächste Schritte.
  -
    title: Implementieren
    text: Wir begleiten die Umsetzung mit Fokus auf Wirkung, Akzeptanz im Team und messbare Ergebnisse.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Julia Meier
    role: Partnerin
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: David Klein
    role: Senior Consultant
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: Nora Beck
    role: Workshop Lead
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
```

### 6. `trustStrip`

```yaml
items:
  - Strategische Klarheit
  - Umsetzungsfahrplan
  - Messbare Ergebnisse
  - Vertrauliche Begleitung
```

### 7. `statsBand`

```yaml
items:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 8. `impactNumbers`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Was unsere Arbeit messbar macht
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 9. `badgeWall`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Qualität, die sichtbar ist
items:
  - Vertrauliche Beratung
  - Messbare Ergebnisse
  - Erfahrene Sparringspartner
  - Klare Umsetzung
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Northstar Strategy: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Klar analysiert. Wirksam umgesetzt.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Beschreibe kurz Ausgangslage, Ziel und Zeithorizont. Wir melden uns für ein vertrauliches Erstgespräch.
googleMapsUrl: https://maps.google.com/?q=Mainkai+14,+60311+Frankfurt+am+Main
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Terminwunsch
  - Ausgangslage
```

### 3. `locations`

```yaml
locations:
  -
    name: Northstar Strategy
    address: Mainkai 14, 60311 Frankfurt am Main
    phone: +49 69 123456
    email: hello@example-consulting.de
```

### 4. `directions`

```yaml
eyebrow: Beratungsschwerpunkte
headline: So findest du uns
subline: Northstar Strategy liegt gut erreichbar in Frankfurt. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Northstar Strategy: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```
# consulting / bold — Impact Lab Advisory

Ton: markant, direkt und energiegeladen.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Mehr Fokus. Mehr Wirkung.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `marqueeBand`

```yaml
items:
  - Strategische Klarheit
  - Umsetzungsfahrplan
  - Messbare Ergebnisse
  - Vertrauliche Begleitung
```

### 3. `featureImage`

```yaml
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
```

### 4. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 5. `serviceCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Change Begleitung
    text: Change Begleitung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Workshop Formate
    text: Workshop Formate mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 6. `processTextColumns`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Vom ersten Gespräch bis zur Umsetzung
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Analysieren
    text: Wir erfassen Ausgangslage, Ziele, Engpässe und Entscheidungslogik, bevor wir Empfehlungen ableiten.
  -
    title: Priorisieren
    text: Gemeinsam übersetzen wir Erkenntnisse in klare Handlungsfelder, Verantwortlichkeiten und nächste Schritte.
  -
    title: Implementieren
    text: Wir begleiten die Umsetzung mit Fokus auf Wirkung, Akzeptanz im Team und messbare Ergebnisse.
```

### 7. `pricingPackages`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Pakete mit klarem Umfang
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Essential
    text: Der klare Einstieg mit passendem Umfang und klarer Orientierung.
    price: ab 199 €
  -
    title: Signature
    text: Unser bewährtes Paket mit mehr Begleitung, Flexibilität und klarer Umsetzung.
    price: ab 399 €
  -
    title: Premium
    text: Maximale Begleitung mit individueller Planung und bevorzugter Abstimmung.
    price: auf Anfrage
```

### 8. `caseStudyCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Ergebnisse, die zeigen, wie wir arbeiten
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Wachstumsstrategie
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Operating Model
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Leadership Sprint
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 9. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Arbeitsweise
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 10. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Impact Lab Advisory: Beratung mit Anspruch
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
```

### 11. `statsBand`

```yaml
items:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 12. `storySplit`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Unsere Art, Dinge anders zu machen
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
```

### 13. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Julia Meier
    role: Partnerin
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: David Klein
    role: Senior Consultant
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: Nora Beck
    role: Workshop Lead
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
```

### 14. `testimonialMarquee`

```yaml
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 15. `quoteWall`

```yaml
items:
  - Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
  - Wir machen es einfach, klar und angenehm.
  - Jedes Detail soll sich richtig anfühlen.
```

### 16. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Impulse aus Strategie und Umsetzung
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 17. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Impact Lab Advisory: Beratung mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Mehr Fokus. Mehr Wirkung.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Strategische Klarheit
  - Umsetzungsfahrplan
  - Messbare Ergebnisse
  - Vertrauliche Begleitung
```

### 3. `serviceCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Change Begleitung
    text: Change Begleitung mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Workshop Formate
    text: Workshop Formate mit fundierter Analyse, klarer Priorisierung und einem Ergebnis, das im Unternehmen ankommt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `comparisonTable`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Finde die passende Option
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Basis
    included: Klarer Einstieg mit definiertem Umfang und transparenter Leistung
  -
    title: Plus
    included: Mehr Begleitung, flexible Abstimmung und priorisierte Umsetzung
  -
    title: Individuell
    included: Individuelle Lösung nach Bedarf und Zielsetzung
```

### 5. `processCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: So einfach wird der Weg zu deinem Ergebnis
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Analysieren
    text: Wir erfassen Ausgangslage, Ziele, Engpässe und Entscheidungslogik, bevor wir Empfehlungen ableiten.
  -
    title: Priorisieren
    text: Gemeinsam übersetzen wir Erkenntnisse in klare Handlungsfelder, Verantwortlichkeiten und nächste Schritte.
  -
    title: Implementieren
    text: Wir begleiten die Umsetzung mit Fokus auf Wirkung, Akzeptanz im Team und messbare Ergebnisse.
```

### 6. `pricingPackages`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Pakete mit klarem Umfang
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Essential
    text: Der klare Einstieg mit passendem Umfang und klarer Orientierung.
    price: ab 199 €
  -
    title: Signature
    text: Unser bewährtes Paket mit mehr Begleitung, Flexibilität und klarer Umsetzung.
    price: ab 399 €
  -
    title: Premium
    text: Maximale Begleitung mit individueller Planung und bevorzugter Abstimmung.
    price: auf Anfrage
```

### 7. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 8. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Arbeitsweise
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
button:
  label: Erstgespräch buchen
  href: #kontakt
```

### 9. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Impact Lab Advisory: Beratung mit Anspruch
items:
  -
    question: Wie startet die Zusammenarbeit?
    answer: Wir beginnen mit einem kompakten Analysegespräch und definieren danach Ziele, Umfang und nächste Schritte.
  -
    question: Arbeitet ihr auch projektbasiert?
    answer: Ja, wir begleiten sowohl einzelne Workshops als auch mehrmonatige Transformationsprojekte.
```

### 10. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Impact Lab Advisory: Beratung mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Mehr Fokus. Mehr Wirkung.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Was uns besonders macht
intro: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Change Begleitung
    text: Change Begleitung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
```

### 4. `categoryCards`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Unsere Schwerpunkte
items:
  -
    title: Wachstumsstrategie
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Operating Model
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Leadership Sprint
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Impact Lab Advisory: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Mehr Fokus. Mehr Wirkung.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Was uns besonders macht
intro: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    title: Strategieentwicklung
    text: Strategieentwicklung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Prozessoptimierung
    text: Prozessoptimierung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
  -
    title: Change Begleitung
    text: Change Begleitung mit klarer Analyse, pragmatischer Begleitung und Ergebnissen, die im Unternehmen tragfähig sind.
```

### 3. `timeline`

```yaml
items:
  -
    title: Analysieren
    text: Wir erfassen Ausgangslage, Ziele, Engpässe und Entscheidungslogik, bevor wir Empfehlungen ableiten.
  -
    title: Priorisieren
    text: Gemeinsam übersetzen wir Erkenntnisse in klare Handlungsfelder, Verantwortlichkeiten und nächste Schritte.
  -
    title: Implementieren
    text: Wir begleiten die Umsetzung mit Fokus auf Wirkung, Akzeptanz im Team und messbare Ergebnisse.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Julia Meier
    role: Partnerin
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: David Klein
    role: Senior Consultant
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
  -
    name: Nora Beck
    role: Workshop Lead
    text: Verbindet analytische Stärke, Moderationserfahrung und pragmatische Umsetzungskompetenz.
```

### 5. `trustStrip`

```yaml
items:
  - Strategische Klarheit
  - Umsetzungsfahrplan
  - Messbare Ergebnisse
  - Vertrauliche Begleitung
```

### 6. `statsBand`

```yaml
items:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 7. `impactNumbers`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Was unsere Arbeit messbar macht
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
items:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 8. `badgeWall`

```yaml
eyebrow: Beratungsschwerpunkte
headline: Qualität, die sichtbar ist
items:
  - Vertrauliche Beratung
  - Messbare Ergebnisse
  - Erfahrene Sparringspartner
  - Klare Umsetzung
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mandanten über uns sagen
testimonials:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
items:
  -
    quote: Die Zusammenarbeit war klar, schnell und genau auf unsere Realität zugeschnitten.
    name: Alex M.
    context: Mandant
  -
    quote: Klar, strukturiert und sofort in unserem Alltag nutzbar.
    name: Samira K.
    context: Mandantin
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Impact Lab Advisory: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Mehr Fokus. Mehr Wirkung.
headline: Strategie, die im Alltag funktioniert und Wachstum messbar macht
subline: Wir helfen Unternehmen, klare Entscheidungen zu treffen, Prozesse zu schärfen und Teams auf Umsetzung auszurichten.
description: Unser Ansatz verbindet Analyse, Erfahrung und pragmatische Begleitung, damit aus guten Ideen belastbare Ergebnisse werden.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Business Consulting, Workshop, Strategie, Teammeeting, Whiteboard."
buttonPrimary:
  label: Erstgespräch buchen
  href: #kontakt
stats:
  -
    value: 90 Tage
    label: bis zum Umsetzungsplan
  -
    value: 35+
    label: begleitete Mandate
  -
    value: 4.9/5
    label: Kundenfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Beschreibe kurz Ausgangslage, Ziel und Zeithorizont. Wir melden uns für ein vertrauliches Erstgespräch.
googleMapsUrl: https://maps.google.com/?q=Mainkai+14,+60311+Frankfurt+am+Main
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Terminwunsch
  - Ausgangslage
```

### 3. `locations`

```yaml
locations:
  -
    name: Impact Lab Advisory
    address: Mainkai 14, 60311 Frankfurt am Main
    phone: +49 69 123456
    email: hello@example-consulting.de
```

### 4. `directions`

```yaml
eyebrow: Beratungsschwerpunkte
headline: So findest du uns
subline: Impact Lab Advisory liegt gut erreichbar in Frankfurt. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Impact Lab Advisory: Beratung mit Anspruch
subline: Wir freuen uns darauf, mit dir die nächsten Schritte zu schärfen.
button:
  label: Erstgespräch buchen
  href: #kontakt
```
# medical / classic — Praxis am Park

Ton: zeitlos, warm und vertrauensvoll.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Medizinische Betreuung mit Ruhe und Erfahrung
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 3. `keywordBand`

```yaml
items:
  - Termine nach Vereinbarung
  - Gründliche Diagnostik
  - Verständliche Aufklärung
  - Einfühlsame Betreuung
```

### 4. `storyTeaser`

```yaml
eyebrow: Unsere Sprechstunde
headline: Warum wir tun, was wir tun
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 5. `serviceCards`

```yaml
eyebrow: Unsere Sprechstunde
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Akutsprechstunde
    text: Akutsprechstunde mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 6. `serviceInfo`

```yaml
eyebrow: Unsere Sprechstunde
headline: Gut begleitet von Anfang an
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Wir erklären jeden Schritt verständlich und stimmen die Behandlung persönlich ab.
  -
    title: Diagnostik
    text: Wir erklären jeden Schritt verständlich und stimmen die Behandlung persönlich ab.
  -
    title: Therapieplanung
    text: Wir erklären jeden Schritt verständlich und stimmen die Behandlung persönlich ab.
```

### 7. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Dr. Anna Keller
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Dr. Leon Brand
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Mara Stein
    role: Praxismanagement
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
```

### 8. `appointmentBooking`

```yaml
eyebrow: Unsere Sprechstunde
headline: Termine, die unkompliziert funktionieren
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Online anfragen
    text: Wähle dein Anliegen und erhalte passende Terminvorschläge.
  -
    title: Telefonisch klären
    text: Unser Team hilft dir direkt bei dringenden Fragen.
```

### 9. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Praxis am Park: Praxis mit Anspruch
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
```

### 10. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Praxis
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 11. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 12. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Aktuelles aus Praxis und Sprechstunde
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 13. `contactPreview`

```yaml
eyebrow: Unsere Sprechstunde
headline: Lass uns ins Gespräch kommen
description: Erzähl uns, was du vorhast. Wir melden uns mit einer passenden Empfehlung.
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Medizinische Betreuung mit Ruhe und Erfahrung
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `highlightsBar`

```yaml
items:
  - Termine nach Vereinbarung
  - Gründliche Diagnostik
  - Verständliche Aufklärung
  - Einfühlsame Betreuung
```

### 3. `serviceCards`

```yaml
eyebrow: Unsere Sprechstunde
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Akutsprechstunde
    text: Akutsprechstunde mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `comparisonTable`

```yaml
eyebrow: Unsere Sprechstunde
headline: Finde die passende Option
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Basis
    included: Klarer Einstieg mit definiertem Umfang und transparenter Leistung
  -
    title: Plus
    included: Mehr Begleitung, flexible Abstimmung und priorisierte Umsetzung
  -
    title: Individuell
    included: Individuelle Lösung nach Bedarf und Zielsetzung
```

### 5. `insuranceInfo`

```yaml
eyebrow: Unsere Sprechstunde
headline: Transparent informiert vor jedem Schritt
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Gesetzlich versichert
    text: Viele Leistungen können direkt über die Kasse abgerechnet werden.
  -
    title: Privat & Selbstzahler
    text: Wir informieren transparent über Umfang und Kosten.
```

### 6. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Dr. Anna Keller
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Dr. Leon Brand
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Mara Stein
    role: Praxismanagement
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
```

### 7. `appointmentBooking`

```yaml
eyebrow: Unsere Sprechstunde
headline: Termine, die unkompliziert funktionieren
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Online anfragen
    text: Wähle dein Anliegen und erhalte passende Terminvorschläge.
  -
    title: Telefonisch klären
    text: Unser Team hilft dir direkt bei dringenden Fragen.
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 9. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Praxis
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 10. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Praxis am Park: Praxis mit Anspruch
items:
  -
    question: Nehmt ihr neue Patientinnen und Patienten auf?
    answer: Ja, Termine für neue Patientinnen und Patienten sind nach Verfügbarkeit möglich.
  -
    question: Kann ich Befunde digital senden?
    answer: Ja, relevante Unterlagen können vor dem Termin sicher übermittelt werden.
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Praxis am Park: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Medizinische Betreuung mit Ruhe und Erfahrung
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Sprechstunde
headline: Was uns besonders macht
intro: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
```

### 4. `categoryCards`

```yaml
eyebrow: Unsere Sprechstunde
headline: Unsere Schwerpunkte
items:
  -
    title: Gesundheitscheck
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Ultraschalldiagnostik
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Individuelle Beratung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Praxis am Park: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Medizinische Betreuung mit Ruhe und Erfahrung
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Sprechstunde
headline: Was uns besonders macht
intro: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
```

### 3. `timeline`

```yaml
items:
  -
    title: Anamnese
    text: Wir nehmen Beschwerden, Vorgeschichte und Fragen sorgfältig auf und schaffen eine ruhige Gesprächsbasis.
  -
    title: Untersuchung
    text: Diagnostik und Einschätzung erfolgen strukturiert, verständlich erklärt und auf die individuelle Situation bezogen.
  -
    title: Behandlung
    text: Wir besprechen Therapie, nächste Schritte und Nachsorge so, dass du gut informiert entscheiden kannst.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Dr. Anna Keller
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Dr. Leon Brand
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Mara Stein
    role: Praxismanagement
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
```

### 5. `trustStrip`

```yaml
items:
  - Termine nach Vereinbarung
  - Gründliche Diagnostik
  - Verständliche Aufklärung
  - Einfühlsame Betreuung
```

### 6. `statsBand`

```yaml
items:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 7. `badgeWall`

```yaml
eyebrow: Unsere Sprechstunde
headline: Qualität, die sichtbar ist
items:
  - Sorgfältige Diagnostik
  - Einfühlsame Betreuung
  - Moderne Praxis
  - Verständliche Aufklärung
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Praxis am Park: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Medizinische Betreuung mit Ruhe und Erfahrung
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Vereinbare einen Termin oder sende eine kurze Anfrage. Bei akuten Beschwerden nutze bitte den telefonischen Kontakt.
googleMapsUrl: https://maps.google.com/?q=Parkallee+5,+40213+Düsseldorf
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Terminwunsch
  - Anliegen
```

### 3. `locations`

```yaml
locations:
  -
    name: Praxis am Park
    address: Parkallee 5, 40213 Düsseldorf
    phone: +49 211 123456
    email: praxis@example-medical.de
```

### 4. `directions`

```yaml
eyebrow: Unsere Sprechstunde
headline: So findest du uns
subline: Praxis am Park liegt gut erreichbar in Düsseldorf. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Praxis am Park: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```
# medical / modern — Medicum Studio

Ton: klar, reduziert und hochwertig.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Ruhig erklärt. Sorgfältig behandelt.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 3. `serviceCards`

```yaml
eyebrow: Unsere Sprechstunde
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Akutsprechstunde
    text: Akutsprechstunde mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Praxis
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 5. `brandLogos`

```yaml
items:
  - Partner A
  - Partner B
  - Partner C
  - Partner D
```

### 6. `storyTeaser`

```yaml
eyebrow: Unsere Sprechstunde
headline: Warum wir tun, was wir tun
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 7. `serviceInfo`

```yaml
eyebrow: Unsere Sprechstunde
headline: Gut begleitet von Anfang an
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Wir erklären jeden Schritt verständlich und stimmen die Behandlung persönlich ab.
  -
    title: Diagnostik
    text: Wir erklären jeden Schritt verständlich und stimmen die Behandlung persönlich ab.
  -
    title: Therapieplanung
    text: Wir erklären jeden Schritt verständlich und stimmen die Behandlung persönlich ab.
```

### 8. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Dr. Anna Keller
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Dr. Leon Brand
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Mara Stein
    role: Praxismanagement
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
```

### 9. `appointmentBooking`

```yaml
eyebrow: Unsere Sprechstunde
headline: Termine, die unkompliziert funktionieren
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Online anfragen
    text: Wähle dein Anliegen und erhalte passende Terminvorschläge.
  -
    title: Telefonisch klären
    text: Unser Team hilft dir direkt bei dringenden Fragen.
```

### 10. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Medicum Studio: Praxis mit Anspruch
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
```

### 11. `statsBand`

```yaml
items:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 12. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 13. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Aktuelles aus Praxis und Sprechstunde
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 14. `contactPreview`

```yaml
eyebrow: Unsere Sprechstunde
headline: Lass uns ins Gespräch kommen
description: Erzähl uns, was du vorhast. Wir melden uns mit einer passenden Empfehlung.
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Ruhig erklärt. Sorgfältig behandelt.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `highlightsBar`

```yaml
items:
  - Termine nach Vereinbarung
  - Gründliche Diagnostik
  - Verständliche Aufklärung
  - Einfühlsame Betreuung
```

### 3. `serviceCards`

```yaml
eyebrow: Unsere Sprechstunde
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Akutsprechstunde
    text: Akutsprechstunde mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `comparisonTable`

```yaml
eyebrow: Unsere Sprechstunde
headline: Finde die passende Option
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Basis
    included: Klarer Einstieg mit definiertem Umfang und transparenter Leistung
  -
    title: Plus
    included: Mehr Begleitung, flexible Abstimmung und priorisierte Umsetzung
  -
    title: Individuell
    included: Individuelle Lösung nach Bedarf und Zielsetzung
```

### 5. `insuranceInfo`

```yaml
eyebrow: Unsere Sprechstunde
headline: Transparent informiert vor jedem Schritt
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Gesetzlich versichert
    text: Viele Leistungen können direkt über die Kasse abgerechnet werden.
  -
    title: Privat & Selbstzahler
    text: Wir informieren transparent über Umfang und Kosten.
```

### 6. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Dr. Anna Keller
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Dr. Leon Brand
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Mara Stein
    role: Praxismanagement
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
```

### 7. `appointmentBooking`

```yaml
eyebrow: Unsere Sprechstunde
headline: Termine, die unkompliziert funktionieren
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Online anfragen
    text: Wähle dein Anliegen und erhalte passende Terminvorschläge.
  -
    title: Telefonisch klären
    text: Unser Team hilft dir direkt bei dringenden Fragen.
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 9. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Praxis
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 10. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Medicum Studio: Praxis mit Anspruch
items:
  -
    question: Nehmt ihr neue Patientinnen und Patienten auf?
    answer: Ja, Termine für neue Patientinnen und Patienten sind nach Verfügbarkeit möglich.
  -
    question: Kann ich Befunde digital senden?
    answer: Ja, relevante Unterlagen können vor dem Termin sicher übermittelt werden.
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Medicum Studio: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Ruhig erklärt. Sorgfältig behandelt.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Sprechstunde
headline: Was uns besonders macht
intro: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
```

### 4. `categoryCards`

```yaml
eyebrow: Unsere Sprechstunde
headline: Unsere Schwerpunkte
items:
  -
    title: Gesundheitscheck
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Ultraschalldiagnostik
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Individuelle Beratung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Medicum Studio: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Ruhig erklärt. Sorgfältig behandelt.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `storyFacts`

```yaml
description: Wir arbeiten persönlich, klar und mit dem Anspruch, dass sich jedes Detail richtig anfühlt.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
```

### 3. `teaserList`

```yaml
eyebrow: Unsere Sprechstunde
headline: Was uns besonders macht
intro: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
```

### 4. `timeline`

```yaml
items:
  -
    title: Anamnese
    text: Wir nehmen Beschwerden, Vorgeschichte und Fragen sorgfältig auf und schaffen eine ruhige Gesprächsbasis.
  -
    title: Untersuchung
    text: Diagnostik und Einschätzung erfolgen strukturiert, verständlich erklärt und auf die individuelle Situation bezogen.
  -
    title: Behandlung
    text: Wir besprechen Therapie, nächste Schritte und Nachsorge so, dass du gut informiert entscheiden kannst.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Dr. Anna Keller
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Dr. Leon Brand
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Mara Stein
    role: Praxismanagement
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
```

### 6. `trustStrip`

```yaml
items:
  - Termine nach Vereinbarung
  - Gründliche Diagnostik
  - Verständliche Aufklärung
  - Einfühlsame Betreuung
```

### 7. `statsBand`

```yaml
items:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 8. `badgeWall`

```yaml
eyebrow: Unsere Sprechstunde
headline: Qualität, die sichtbar ist
items:
  - Sorgfältige Diagnostik
  - Einfühlsame Betreuung
  - Moderne Praxis
  - Verständliche Aufklärung
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Medicum Studio: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Ruhig erklärt. Sorgfältig behandelt.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Vereinbare einen Termin oder sende eine kurze Anfrage. Bei akuten Beschwerden nutze bitte den telefonischen Kontakt.
googleMapsUrl: https://maps.google.com/?q=Parkallee+5,+40213+Düsseldorf
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Terminwunsch
  - Anliegen
```

### 3. `locations`

```yaml
locations:
  -
    name: Medicum Studio
    address: Parkallee 5, 40213 Düsseldorf
    phone: +49 211 123456
    email: praxis@example-medical.de
```

### 4. `directions`

```yaml
eyebrow: Unsere Sprechstunde
headline: So findest du uns
subline: Medicum Studio liegt gut erreichbar in Düsseldorf. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Medicum Studio: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```
# medical / bold — Care Forward Praxis

Ton: markant, direkt und energiegeladen.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Mehr Klarheit. Mehr Vertrauen.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `marqueeBand`

```yaml
items:
  - Termine nach Vereinbarung
  - Gründliche Diagnostik
  - Verständliche Aufklärung
  - Einfühlsame Betreuung
```

### 3. `featureImage`

```yaml
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
```

### 4. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 5. `serviceCards`

```yaml
eyebrow: Unsere Sprechstunde
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Akutsprechstunde
    text: Akutsprechstunde mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 6. `serviceInfo`

```yaml
eyebrow: Unsere Sprechstunde
headline: Gut begleitet von Anfang an
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Wir erklären jeden Schritt verständlich und stimmen die Behandlung persönlich ab.
  -
    title: Diagnostik
    text: Wir erklären jeden Schritt verständlich und stimmen die Behandlung persönlich ab.
  -
    title: Therapieplanung
    text: Wir erklären jeden Schritt verständlich und stimmen die Behandlung persönlich ab.
```

### 7. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Praxis
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 8. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Care Forward Praxis: Praxis mit Anspruch
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
```

### 9. `statsBand`

```yaml
items:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 10. `storySplit`

```yaml
eyebrow: Unsere Sprechstunde
headline: Unsere Art, Dinge anders zu machen
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
```

### 11. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Dr. Anna Keller
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Dr. Leon Brand
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Mara Stein
    role: Praxismanagement
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
```

### 12. `appointmentBooking`

```yaml
eyebrow: Unsere Sprechstunde
headline: Termine, die unkompliziert funktionieren
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Online anfragen
    text: Wähle dein Anliegen und erhalte passende Terminvorschläge.
  -
    title: Telefonisch klären
    text: Unser Team hilft dir direkt bei dringenden Fragen.
```

### 13. `testimonialMarquee`

```yaml
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 14. `quoteWall`

```yaml
items:
  - Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
  - Wir machen es einfach, klar und angenehm.
  - Jedes Detail soll sich richtig anfühlen.
```

### 15. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Aktuelles aus Praxis und Sprechstunde
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 16. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Care Forward Praxis: Praxis mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Mehr Klarheit. Mehr Vertrauen.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `highlightsBar`

```yaml
items:
  - Termine nach Vereinbarung
  - Gründliche Diagnostik
  - Verständliche Aufklärung
  - Einfühlsame Betreuung
```

### 3. `serviceCards`

```yaml
eyebrow: Unsere Sprechstunde
headline: Leistungen, die genau zu deinem Bedarf passen
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Akutsprechstunde
    text: Akutsprechstunde mit sorgfältiger Untersuchung, verständlicher Aufklärung und Betreuung, die zu deiner Situation passt.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `comparisonTable`

```yaml
eyebrow: Unsere Sprechstunde
headline: Finde die passende Option
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Basis
    included: Klarer Einstieg mit definiertem Umfang und transparenter Leistung
  -
    title: Plus
    included: Mehr Begleitung, flexible Abstimmung und priorisierte Umsetzung
  -
    title: Individuell
    included: Individuelle Lösung nach Bedarf und Zielsetzung
```

### 5. `insuranceInfo`

```yaml
eyebrow: Unsere Sprechstunde
headline: Transparent informiert vor jedem Schritt
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Gesetzlich versichert
    text: Viele Leistungen können direkt über die Kasse abgerechnet werden.
  -
    title: Privat & Selbstzahler
    text: Wir informieren transparent über Umfang und Kosten.
```

### 6. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Dr. Anna Keller
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Dr. Leon Brand
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Mara Stein
    role: Praxismanagement
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
```

### 7. `appointmentBooking`

```yaml
eyebrow: Unsere Sprechstunde
headline: Termine, die unkompliziert funktionieren
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Online anfragen
    text: Wähle dein Anliegen und erhalte passende Terminvorschläge.
  -
    title: Telefonisch klären
    text: Unser Team hilft dir direkt bei dringenden Fragen.
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 9. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Praxis
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
button:
  label: Termin vereinbaren
  href: #kontakt
```

### 10. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Care Forward Praxis: Praxis mit Anspruch
items:
  -
    question: Nehmt ihr neue Patientinnen und Patienten auf?
    answer: Ja, Termine für neue Patientinnen und Patienten sind nach Verfügbarkeit möglich.
  -
    question: Kann ich Befunde digital senden?
    answer: Ja, relevante Unterlagen können vor dem Termin sicher übermittelt werden.
```

### 11. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Care Forward Praxis: Praxis mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Mehr Klarheit. Mehr Vertrauen.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Sprechstunde
headline: Was uns besonders macht
intro: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
```

### 4. `categoryCards`

```yaml
eyebrow: Unsere Sprechstunde
headline: Unsere Schwerpunkte
items:
  -
    title: Gesundheitscheck
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Ultraschalldiagnostik
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Individuelle Beratung
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Care Forward Praxis: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Mehr Klarheit. Mehr Vertrauen.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `teaserList`

```yaml
eyebrow: Unsere Sprechstunde
headline: Was uns besonders macht
intro: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
items:
  -
    title: Vorsorge
    text: Vorsorge mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Diagnostik
    text: Diagnostik mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
  -
    title: Therapieplanung
    text: Therapieplanung mit sorgfältiger Diagnostik, verständlicher Aufklärung und Betreuung, die den Menschen im Blick behält.
```

### 3. `timeline`

```yaml
items:
  -
    title: Anamnese
    text: Wir nehmen Beschwerden, Vorgeschichte und Fragen sorgfältig auf und schaffen eine ruhige Gesprächsbasis.
  -
    title: Untersuchung
    text: Diagnostik und Einschätzung erfolgen strukturiert, verständlich erklärt und auf die individuelle Situation bezogen.
  -
    title: Behandlung
    text: Wir besprechen Therapie, nächste Schritte und Nachsorge so, dass du gut informiert entscheiden kannst.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Dr. Anna Keller
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Dr. Leon Brand
    role: Praxis
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
  -
    name: Mara Stein
    role: Praxismanagement
    text: Verbindet medizinische Sorgfalt, Empathie und klare Kommunikation für eine verlässliche Versorgung.
```

### 5. `trustStrip`

```yaml
items:
  - Termine nach Vereinbarung
  - Gründliche Diagnostik
  - Verständliche Aufklärung
  - Einfühlsame Betreuung
```

### 6. `statsBand`

```yaml
items:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 7. `badgeWall`

```yaml
eyebrow: Unsere Sprechstunde
headline: Qualität, die sichtbar ist
items:
  - Sorgfältige Diagnostik
  - Einfühlsame Betreuung
  - Moderne Praxis
  - Verständliche Aufklärung
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Patientinnen und Patienten sagen
testimonials:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
items:
  -
    quote: Ich wurde ernst genommen, gut aufgeklärt und sehr freundlich begleitet.
    name: Alex M.
    context: Patient
  -
    quote: Ruhig erklärt, ernst genommen und sehr gut begleitet.
    name: Samira K.
    context: Patientin
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Care Forward Praxis: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Mehr Klarheit. Mehr Vertrauen.
headline: Medizinische Betreuung, die zuhört, erklärt und begleitet
subline: Wir verbinden moderne Diagnostik mit persönlicher Beratung und klaren nächsten Schritten.
description: Unser Team nimmt sich Zeit für deine Anliegen und schafft eine Praxisatmosphäre, in der Vertrauen selbstverständlich ist.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Arztpraxis, medizinisches Team, Sprechzimmer, Diagnostik, Empfang."
buttonPrimary:
  label: Termin vereinbaren
  href: #kontakt
stats:
  -
    value: 25 Min.
    label: Zeitfenster für Ersttermine
  -
    value: 4.9/5
    label: Patientenfeedback
  -
    value: 3
    label: Fachbereiche
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Vereinbare einen Termin oder sende eine kurze Anfrage. Bei akuten Beschwerden nutze bitte den telefonischen Kontakt.
googleMapsUrl: https://maps.google.com/?q=Parkallee+5,+40213+Düsseldorf
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Terminwunsch
  - Anliegen
```

### 3. `locations`

```yaml
locations:
  -
    name: Care Forward Praxis
    address: Parkallee 5, 40213 Düsseldorf
    phone: +49 211 123456
    email: praxis@example-medical.de
```

### 4. `directions`

```yaml
eyebrow: Unsere Sprechstunde
headline: So findest du uns
subline: Care Forward Praxis liegt gut erreichbar in Düsseldorf. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Care Forward Praxis: Praxis mit Anspruch
subline: Wir freuen uns darauf, dich in unserer Praxis gut zu begleiten.
button:
  label: Termin vereinbaren
  href: #kontakt
```
# fitness / classic — Vital Studio

Ton: zeitlos, warm und vertrauensvoll.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Training mit Erfahrung und persönlicher Nähe
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 3. `keywordBand`

```yaml
items:
  - Trainingsplan inklusive
  - Coaching auf Augenhöhe
  - Kurse für jedes Level
  - Flexible Mitgliedschaft
```

### 4. `storyTeaser`

```yaml
eyebrow: Training & Kurse
headline: Warum wir tun, was wir tun
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 5. `classCards`

```yaml
eyebrow: Training & Kurse
headline: Kurse, die dich in Bewegung bringen
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 6. `trainingPlanOverview`

```yaml
eyebrow: Training & Kurse
headline: Dein Plan für spürbaren Fortschritt
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 7. `programTable`

```yaml
eyebrow: Training & Kurse
headline: Unser Kursplan für die Woche
rows:
  -
    program: Strength
    days: Mo / Mi
    time: 18:00
    focus: Kraft & Technik
  -
    program: Flow
    days: Di / Do
    time: 19:00
    focus: Mobilität & Core
  -
    program: Conditioning
    days: Sa
    time: 10:00
    focus: Ausdauer & Energie
```

### 8. `pricingPackages`

```yaml
eyebrow: Training & Kurse
headline: Pakete mit klarem Umfang
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Essential
    text: Der einfache Einstieg mit Trainingsfläche, Einweisung und einem klaren Plan für die ersten Wochen.
    price: ab 199 €
  -
    title: Signature
    text: Unser beliebtes Paket mit Kursen, Coaching-Check-ins und mehr Flexibilität im Trainingsalltag.
    price: ab 399 €
  -
    title: Premium
    text: Persönliche Betreuung, individuelle Planung und priorisierte Termine für maximale Entwicklung.
    price: auf Anfrage
```

### 9. `trialCta`

```yaml
eyebrow: Training & Kurse
headline: Teste uns in Ruhe
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
button:
  label: Probetraining buchen
  href: #kontakt
```

### 10. `trainers`

```yaml
eyebrow: Training & Kurse
headline: Coaches, die dich wirklich begleiten
items:
  -
    name: Lena Vogt
    role: Head Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Marco Ruiz
    role: Strength Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Sara Neumann
    role: Mobility Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
```

### 11. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Vital Studio: Fitnessstudio mit Anspruch
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
```

### 12. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unser Studio
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 13. `seasonalHighlight`

```yaml
eyebrow: Training & Kurse
headline: Saisonales Highlight
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 14. `challengeSpotlight`

```yaml
eyebrow: Training & Kurse
headline: Deine nächste Challenge wartet
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 15. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 16. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neue Kurse, Trainingsimpulse und Studio-News
button:
  label: Probetraining buchen
  href: #kontakt
```

### 17. `contactPreview`

```yaml
eyebrow: Training & Kurse
headline: Lass uns ins Gespräch kommen
description: Erzähl uns, was du vorhast. Wir melden uns mit einer passenden Empfehlung.
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Training mit Erfahrung und persönlicher Nähe
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Trainingsplan inklusive
  - Coaching auf Augenhöhe
  - Kurse für jedes Level
  - Flexible Mitgliedschaft
```

### 3. `classCards`

```yaml
eyebrow: Training & Kurse
headline: Kurse, die dich in Bewegung bringen
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 4. `trainingPlanOverview`

```yaml
eyebrow: Training & Kurse
headline: Dein Plan für spürbaren Fortschritt
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 5. `programTable`

```yaml
eyebrow: Training & Kurse
headline: Unser Kursplan für die Woche
rows:
  -
    program: Strength
    days: Mo / Mi
    time: 18:00
    focus: Kraft & Technik
  -
    program: Flow
    days: Di / Do
    time: 19:00
    focus: Mobilität & Core
  -
    program: Conditioning
    days: Sa
    time: 10:00
    focus: Ausdauer & Energie
```

### 6. `comparisonTable`

```yaml
eyebrow: Training & Kurse
headline: Finde die passende Option
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Basis
    included: Klarer Einstieg mit definiertem Umfang und transparenter Leistung
  -
    title: Plus
    included: Mehr Begleitung, flexible Abstimmung und priorisierte Umsetzung
  -
    title: Individuell
    included: Individuelle Lösung nach Bedarf und Zielsetzung
```

### 7. `pricingPackages`

```yaml
eyebrow: Training & Kurse
headline: Pakete mit klarem Umfang
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Essential
    text: Der einfache Einstieg mit Trainingsfläche, Einweisung und einem klaren Plan für die ersten Wochen.
    price: ab 199 €
  -
    title: Signature
    text: Unser beliebtes Paket mit Kursen, Coaching-Check-ins und mehr Flexibilität im Trainingsalltag.
    price: ab 399 €
  -
    title: Premium
    text: Persönliche Betreuung, individuelle Planung und priorisierte Termine für maximale Entwicklung.
    price: auf Anfrage
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 9. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unser Studio
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 10. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Vital Studio: Fitnessstudio mit Anspruch
items:
  -
    question: Ist das Studio für Anfänger geeignet?
    answer: Ja, wir starten mit einem Check-in und passen dein Training an dein Level an.
  -
    question: Kann ich Kurse flexibel buchen?
    answer: Ja, Kurse sind über unseren Plan buchbar und monatlich aktualisiert.
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Vital Studio: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Training mit Erfahrung und persönlicher Nähe
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Training & Kurse
headline: Was uns besonders macht
intro: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Personal Training
    text: Personal Training mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Kurse
    text: Kurse mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Krafttraining
    text: Krafttraining mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
```

### 4. `categoryCards`

```yaml
eyebrow: Training & Kurse
headline: Unsere Schwerpunkte
items:
  -
    title: Functional Strength
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Mobility Flow
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Personal Coaching
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Vital Studio: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Training mit Erfahrung und persönlicher Nähe
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Training & Kurse
headline: Was uns besonders macht
intro: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Personal Training
    text: Personal Training mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Kurse
    text: Kurse mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Krafttraining
    text: Krafttraining mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
```

### 3. `timeline`

```yaml
items:
  -
    title: Check-in
    text: Wir klären Trainingsstand, Ziele und mögliche Einschränkungen, damit du sicher starten kannst.
  -
    title: Plan erstellen
    text: Dein Trainingsplan verbindet passende Übungen, sinnvolle Intensität und klare Fortschrittsmarker.
  -
    title: Dranbleiben
    text: Coaches, Kurse und Community helfen dir, Routine aufzubauen und messbar stärker zu werden.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Lena Vogt
    role: Head Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Marco Ruiz
    role: Strength Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Sara Neumann
    role: Mobility Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
```

### 5. `trustStrip`

```yaml
items:
  - Trainingsplan inklusive
  - Coaching auf Augenhöhe
  - Kurse für jedes Level
  - Flexible Mitgliedschaft
```

### 6. `statsBand`

```yaml
items:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 7. `badgeWall`

```yaml
eyebrow: Training & Kurse
headline: Qualität, die sichtbar ist
items:
  - Qualifizierte Coaches
  - Saubere Technik
  - Flexible Kurse
  - Messbarer Fortschritt
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Vital Studio: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Training mit Erfahrung und persönlicher Nähe
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Frag ein Probetraining an, stelle Fragen zur Mitgliedschaft oder sag uns, welches Ziel du erreichen möchtest.
googleMapsUrl: https://maps.google.com/?q=Karl-Liebknecht-Straße+80,+04275+Leipzig
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Probetraining-Wunsch
  - Trainingsziel
```

### 3. `locations`

```yaml
locations:
  -
    name: Vital Studio
    address: Karl-Liebknecht-Straße 80, 04275 Leipzig
    phone: +49 341 123456
    email: train@example-fitness.de
```

### 4. `directions`

```yaml
eyebrow: Training & Kurse
headline: So findest du uns
subline: Vital Studio liegt gut erreichbar in Leipzig. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Vital Studio: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```
# fitness / modern — Motion Club

Ton: klar, reduziert und hochwertig.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Smart trainieren. Spürbar stärker werden.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 3. `classCards`

```yaml
eyebrow: Training & Kurse
headline: Kurse, die dich in Bewegung bringen
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 4. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unser Studio
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 5. `brandLogos`

```yaml
items:
  - Partner A
  - Partner B
  - Partner C
  - Partner D
```

### 6. `storyTeaser`

```yaml
eyebrow: Training & Kurse
headline: Warum wir tun, was wir tun
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 7. `trainingPlanOverview`

```yaml
eyebrow: Training & Kurse
headline: Dein Plan für spürbaren Fortschritt
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 8. `programTable`

```yaml
eyebrow: Training & Kurse
headline: Unser Kursplan für die Woche
rows:
  -
    program: Strength
    days: Mo / Mi
    time: 18:00
    focus: Kraft & Technik
  -
    program: Flow
    days: Di / Do
    time: 19:00
    focus: Mobilität & Core
  -
    program: Conditioning
    days: Sa
    time: 10:00
    focus: Ausdauer & Energie
```

### 9. `pricingPackages`

```yaml
eyebrow: Training & Kurse
headline: Pakete mit klarem Umfang
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Essential
    text: Der einfache Einstieg mit Trainingsfläche, Einweisung und einem klaren Plan für die ersten Wochen.
    price: ab 199 €
  -
    title: Signature
    text: Unser beliebtes Paket mit Kursen, Coaching-Check-ins und mehr Flexibilität im Trainingsalltag.
    price: ab 399 €
  -
    title: Premium
    text: Persönliche Betreuung, individuelle Planung und priorisierte Termine für maximale Entwicklung.
    price: auf Anfrage
```

### 10. `trialCta`

```yaml
eyebrow: Training & Kurse
headline: Teste uns in Ruhe
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
button:
  label: Probetraining buchen
  href: #kontakt
```

### 11. `trainers`

```yaml
eyebrow: Training & Kurse
headline: Coaches, die dich wirklich begleiten
items:
  -
    name: Lena Vogt
    role: Head Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Marco Ruiz
    role: Strength Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Sara Neumann
    role: Mobility Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
```

### 12. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Motion Club: Fitnessstudio mit Anspruch
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
```

### 13. `seasonalHighlight`

```yaml
eyebrow: Training & Kurse
headline: Saisonales Highlight
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 14. `challengeSpotlight`

```yaml
eyebrow: Training & Kurse
headline: Deine nächste Challenge wartet
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 15. `statsBand`

```yaml
items:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 16. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 17. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neue Kurse, Trainingsimpulse und Studio-News
button:
  label: Probetraining buchen
  href: #kontakt
```

### 18. `contactPreview`

```yaml
eyebrow: Training & Kurse
headline: Lass uns ins Gespräch kommen
description: Erzähl uns, was du vorhast. Wir melden uns mit einer passenden Empfehlung.
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Smart trainieren. Spürbar stärker werden.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Trainingsplan inklusive
  - Coaching auf Augenhöhe
  - Kurse für jedes Level
  - Flexible Mitgliedschaft
```

### 3. `classCards`

```yaml
eyebrow: Training & Kurse
headline: Kurse, die dich in Bewegung bringen
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 4. `trainingPlanOverview`

```yaml
eyebrow: Training & Kurse
headline: Dein Plan für spürbaren Fortschritt
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 5. `programTable`

```yaml
eyebrow: Training & Kurse
headline: Unser Kursplan für die Woche
rows:
  -
    program: Strength
    days: Mo / Mi
    time: 18:00
    focus: Kraft & Technik
  -
    program: Flow
    days: Di / Do
    time: 19:00
    focus: Mobilität & Core
  -
    program: Conditioning
    days: Sa
    time: 10:00
    focus: Ausdauer & Energie
```

### 6. `comparisonTable`

```yaml
eyebrow: Training & Kurse
headline: Finde die passende Option
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Basis
    included: Klarer Einstieg mit definiertem Umfang und transparenter Leistung
  -
    title: Plus
    included: Mehr Begleitung, flexible Abstimmung und priorisierte Umsetzung
  -
    title: Individuell
    included: Individuelle Lösung nach Bedarf und Zielsetzung
```

### 7. `pricingPackages`

```yaml
eyebrow: Training & Kurse
headline: Pakete mit klarem Umfang
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Essential
    text: Der einfache Einstieg mit Trainingsfläche, Einweisung und einem klaren Plan für die ersten Wochen.
    price: ab 199 €
  -
    title: Signature
    text: Unser beliebtes Paket mit Kursen, Coaching-Check-ins und mehr Flexibilität im Trainingsalltag.
    price: ab 399 €
  -
    title: Premium
    text: Persönliche Betreuung, individuelle Planung und priorisierte Termine für maximale Entwicklung.
    price: auf Anfrage
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 9. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unser Studio
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 10. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Motion Club: Fitnessstudio mit Anspruch
items:
  -
    question: Ist das Studio für Anfänger geeignet?
    answer: Ja, wir starten mit einem Check-in und passen dein Training an dein Level an.
  -
    question: Kann ich Kurse flexibel buchen?
    answer: Ja, Kurse sind über unseren Plan buchbar und monatlich aktualisiert.
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Motion Club: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Smart trainieren. Spürbar stärker werden.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Training & Kurse
headline: Was uns besonders macht
intro: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Personal Training
    text: Personal Training mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Kurse
    text: Kurse mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Krafttraining
    text: Krafttraining mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
```

### 4. `categoryCards`

```yaml
eyebrow: Training & Kurse
headline: Unsere Schwerpunkte
items:
  -
    title: Functional Strength
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Mobility Flow
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Personal Coaching
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Motion Club: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Smart trainieren. Spürbar stärker werden.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `storyFacts`

```yaml
description: Wir arbeiten persönlich, klar und mit dem Anspruch, dass sich jedes Detail richtig anfühlt.
items:
  -
    title: Personal Training
    text: Personal Training mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Kurse
    text: Kurse mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Krafttraining
    text: Krafttraining mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
```

### 3. `teaserList`

```yaml
eyebrow: Training & Kurse
headline: Was uns besonders macht
intro: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Personal Training
    text: Personal Training mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Kurse
    text: Kurse mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Krafttraining
    text: Krafttraining mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
```

### 4. `timeline`

```yaml
items:
  -
    title: Check-in
    text: Wir klären Trainingsstand, Ziele und mögliche Einschränkungen, damit du sicher starten kannst.
  -
    title: Plan erstellen
    text: Dein Trainingsplan verbindet passende Übungen, sinnvolle Intensität und klare Fortschrittsmarker.
  -
    title: Dranbleiben
    text: Coaches, Kurse und Community helfen dir, Routine aufzubauen und messbar stärker zu werden.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Lena Vogt
    role: Head Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Marco Ruiz
    role: Strength Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Sara Neumann
    role: Mobility Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
```

### 6. `trustStrip`

```yaml
items:
  - Trainingsplan inklusive
  - Coaching auf Augenhöhe
  - Kurse für jedes Level
  - Flexible Mitgliedschaft
```

### 7. `statsBand`

```yaml
items:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 8. `badgeWall`

```yaml
eyebrow: Training & Kurse
headline: Qualität, die sichtbar ist
items:
  - Qualifizierte Coaches
  - Saubere Technik
  - Flexible Kurse
  - Messbarer Fortschritt
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Motion Club: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Smart trainieren. Spürbar stärker werden.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Frag ein Probetraining an, stelle Fragen zur Mitgliedschaft oder sag uns, welches Ziel du erreichen möchtest.
googleMapsUrl: https://maps.google.com/?q=Karl-Liebknecht-Straße+80,+04275+Leipzig
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Probetraining-Wunsch
  - Trainingsziel
```

### 3. `locations`

```yaml
locations:
  -
    name: Motion Club
    address: Karl-Liebknecht-Straße 80, 04275 Leipzig
    phone: +49 341 123456
    email: train@example-fitness.de
```

### 4. `directions`

```yaml
eyebrow: Training & Kurse
headline: So findest du uns
subline: Motion Club liegt gut erreichbar in Leipzig. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Motion Club: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```
# fitness / bold — Iron Flow Gym

Ton: markant, direkt und energiegeladen.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Mehr Energie. Mehr Fortschritt.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `marqueeBand`

```yaml
items:
  - Trainingsplan inklusive
  - Coaching auf Augenhöhe
  - Kurse für jedes Level
  - Flexible Mitgliedschaft
```

### 3. `featureImage`

```yaml
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
```

### 4. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
buttonSecondary:
  label: Leistungen ansehen
  href: #leistungen
```

### 5. `classCards`

```yaml
eyebrow: Training & Kurse
headline: Kurse, die dich in Bewegung bringen
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 6. `trainingPlanOverview`

```yaml
eyebrow: Training & Kurse
headline: Dein Plan für spürbaren Fortschritt
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 7. `programTable`

```yaml
eyebrow: Training & Kurse
headline: Unser Kursplan für die Woche
rows:
  -
    program: Strength
    days: Mo / Mi
    time: 18:00
    focus: Kraft & Technik
  -
    program: Flow
    days: Di / Do
    time: 19:00
    focus: Mobilität & Core
  -
    program: Conditioning
    days: Sa
    time: 10:00
    focus: Ausdauer & Energie
```

### 8. `pricingPackages`

```yaml
eyebrow: Training & Kurse
headline: Pakete mit klarem Umfang
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Essential
    text: Der einfache Einstieg mit Trainingsfläche, Einweisung und einem klaren Plan für die ersten Wochen.
    price: ab 199 €
  -
    title: Signature
    text: Unser beliebtes Paket mit Kursen, Coaching-Check-ins und mehr Flexibilität im Trainingsalltag.
    price: ab 399 €
  -
    title: Premium
    text: Persönliche Betreuung, individuelle Planung und priorisierte Termine für maximale Entwicklung.
    price: auf Anfrage
```

### 9. `trialCta`

```yaml
eyebrow: Training & Kurse
headline: Teste uns in Ruhe
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
button:
  label: Probetraining buchen
  href: #kontakt
```

### 10. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Iron Flow Gym: Fitnessstudio mit Anspruch
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
```

### 11. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unser Studio
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 12. `seasonalHighlight`

```yaml
eyebrow: Training & Kurse
headline: Saisonales Highlight
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 13. `challengeSpotlight`

```yaml
eyebrow: Training & Kurse
headline: Deine nächste Challenge wartet
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 14. `statsBand`

```yaml
items:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 15. `storySplit`

```yaml
eyebrow: Training & Kurse
headline: Unsere Art, Dinge anders zu machen
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
```

### 16. `trainers`

```yaml
eyebrow: Training & Kurse
headline: Coaches, die dich wirklich begleiten
items:
  -
    name: Lena Vogt
    role: Head Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Marco Ruiz
    role: Strength Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Sara Neumann
    role: Mobility Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
```

### 17. `testimonialMarquee`

```yaml
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 18. `quoteWall`

```yaml
items:
  - Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
  - Wir machen es einfach, klar und angenehm.
  - Jedes Detail soll sich richtig anfühlen.
```

### 19. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Neue Kurse, Trainingsimpulse und Studio-News
button:
  label: Probetraining buchen
  href: #kontakt
```

### 20. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Iron Flow Gym: Fitnessstudio mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Mehr Energie. Mehr Fortschritt.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Trainingsplan inklusive
  - Coaching auf Augenhöhe
  - Kurse für jedes Level
  - Flexible Mitgliedschaft
```

### 3. `classCards`

```yaml
eyebrow: Training & Kurse
headline: Kurse, die dich in Bewegung bringen
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 4. `trainingPlanOverview`

```yaml
eyebrow: Training & Kurse
headline: Dein Plan für spürbaren Fortschritt
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Functional Strength
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Mobility Flow
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
  -
    title: Personal Coaching
    text: Strukturiertes Training mit Coaching, sauberer Technik und motivierender Atmosphäre.
    level: Alle Level
```

### 5. `programTable`

```yaml
eyebrow: Training & Kurse
headline: Unser Kursplan für die Woche
rows:
  -
    program: Strength
    days: Mo / Mi
    time: 18:00
    focus: Kraft & Technik
  -
    program: Flow
    days: Di / Do
    time: 19:00
    focus: Mobilität & Core
  -
    program: Conditioning
    days: Sa
    time: 10:00
    focus: Ausdauer & Energie
```

### 6. `comparisonTable`

```yaml
eyebrow: Training & Kurse
headline: Finde die passende Option
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Basis
    included: Klarer Einstieg mit definiertem Umfang und transparenter Leistung
  -
    title: Plus
    included: Mehr Begleitung, flexible Abstimmung und priorisierte Umsetzung
  -
    title: Individuell
    included: Individuelle Lösung nach Bedarf und Zielsetzung
```

### 7. `pricingPackages`

```yaml
eyebrow: Training & Kurse
headline: Pakete mit klarem Umfang
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Essential
    text: Der einfache Einstieg mit Trainingsfläche, Einweisung und einem klaren Plan für die ersten Wochen.
    price: ab 199 €
  -
    title: Signature
    text: Unser beliebtes Paket mit Kursen, Coaching-Check-ins und mehr Flexibilität im Trainingsalltag.
    price: ab 399 €
  -
    title: Premium
    text: Persönliche Betreuung, individuelle Planung und priorisierte Termine für maximale Entwicklung.
    price: auf Anfrage
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 9. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unser Studio
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
button:
  label: Probetraining buchen
  href: #kontakt
```

### 10. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Iron Flow Gym: Fitnessstudio mit Anspruch
items:
  -
    question: Ist das Studio für Anfänger geeignet?
    answer: Ja, wir starten mit einem Check-in und passen dein Training an dein Level an.
  -
    question: Kann ich Kurse flexibel buchen?
    answer: Ja, Kurse sind über unseren Plan buchbar und monatlich aktualisiert.
```

### 11. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Iron Flow Gym: Fitnessstudio mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Mehr Energie. Mehr Fortschritt.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Training & Kurse
headline: Was uns besonders macht
intro: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Personal Training
    text: Personal Training mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Kurse
    text: Kurse mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Krafttraining
    text: Krafttraining mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
```

### 4. `categoryCards`

```yaml
eyebrow: Training & Kurse
headline: Unsere Schwerpunkte
items:
  -
    title: Functional Strength
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Mobility Flow
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Personal Coaching
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Iron Flow Gym: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Mehr Energie. Mehr Fortschritt.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Training & Kurse
headline: Was uns besonders macht
intro: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
items:
  -
    title: Personal Training
    text: Personal Training mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Kurse
    text: Kurse mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
  -
    title: Krafttraining
    text: Krafttraining mit sauberer Technik, motivierendem Coaching und Fortschritt, der zu deinem Alltag passt.
```

### 3. `timeline`

```yaml
items:
  -
    title: Check-in
    text: Wir klären Trainingsstand, Ziele und mögliche Einschränkungen, damit du sicher starten kannst.
  -
    title: Plan erstellen
    text: Dein Trainingsplan verbindet passende Übungen, sinnvolle Intensität und klare Fortschrittsmarker.
  -
    title: Dranbleiben
    text: Coaches, Kurse und Community helfen dir, Routine aufzubauen und messbar stärker zu werden.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Lena Vogt
    role: Head Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Marco Ruiz
    role: Strength Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
  -
    name: Sara Neumann
    role: Mobility Coach
    text: Verbindet Trainingswissen, Motivation und einen klaren Blick für saubere Technik.
```

### 5. `trustStrip`

```yaml
items:
  - Trainingsplan inklusive
  - Coaching auf Augenhöhe
  - Kurse für jedes Level
  - Flexible Mitgliedschaft
```

### 6. `statsBand`

```yaml
items:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 7. `badgeWall`

```yaml
eyebrow: Training & Kurse
headline: Qualität, die sichtbar ist
items:
  - Qualifizierte Coaches
  - Saubere Technik
  - Flexible Kurse
  - Messbarer Fortschritt
```

### 8. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Mitglieder über uns sagen
testimonials:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
items:
  -
    quote: Ich trainiere konsequenter, stärker und mit viel mehr Freude als vorher.
    name: Alex M.
    context: Mitglied
  -
    quote: Motivierend, persönlich und genau passend zu meinem Trainingsstand.
    name: Samira K.
    context: Mitglied
```

### 9. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Iron Flow Gym: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Mehr Energie. Mehr Fortschritt.
headline: Training, das zu deinem Leben passt und dich spürbar weiterbringt
subline: Wir kombinieren starke Kurse, persönliche Betreuung und klare Trainingspläne für echte Fortschritte.
description: Bei uns trainierst du in einer Atmosphäre, die motiviert, ohne zu überfordern.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Fitnessstudio, Personal Training, Kurse, Krafttraining, Bewegung."
buttonPrimary:
  label: Probetraining buchen
  href: #kontakt
stats:
  -
    value: 45
    label: Kurse pro Woche
  -
    value: 8
    label: Trainerinnen & Trainer
  -
    value: 4.9/5
    label: Mitgliederfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Frag ein Probetraining an, stelle Fragen zur Mitgliedschaft oder sag uns, welches Ziel du erreichen möchtest.
googleMapsUrl: https://maps.google.com/?q=Karl-Liebknecht-Straße+80,+04275+Leipzig
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Probetraining-Wunsch
  - Trainingsziel
```

### 3. `locations`

```yaml
locations:
  -
    name: Iron Flow Gym
    address: Karl-Liebknecht-Straße 80, 04275 Leipzig
    phone: +49 341 123456
    email: train@example-fitness.de
```

### 4. `directions`

```yaml
eyebrow: Training & Kurse
headline: So findest du uns
subline: Iron Flow Gym liegt gut erreichbar in Leipzig. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 5. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Iron Flow Gym: Fitnessstudio mit Anspruch
subline: Wir freuen uns darauf, dich im Training zu begleiten.
button:
  label: Probetraining buchen
  href: #kontakt
```
# wedding / classic — Atelier Amour

Ton: zeitlos, warm und vertrauensvoll.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Hochzeiten mit Herz und Erfahrung
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
buttonSecondary:
  label: Planung ansehen
  href: #leistungen
```

### 3. `keywordBand`

```yaml
items:
  - Persönliches Konzept
  - Stilvolle Gestaltung
  - Verlässliche Koordination
  - Budget im Blick
```

### 4. `storyTeaser`

```yaml
eyebrow: Planung & Konzepte
headline: Warum wir tun, was wir tun
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 5. `serviceCards`

```yaml
eyebrow: Planung & Konzepte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Freie Trauung
    text: Freie Trauung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 6. `processTextColumns`

```yaml
eyebrow: Planung & Konzepte
headline: Vom ersten Gespräch bis zur Umsetzung
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Kennenlernen
    text: Wir sprechen über euch, eure Wünsche, Prioritäten und den Rahmen, in dem sich der Tag gut anfühlen soll.
  -
    title: Konzept planen
    text: Aus Stil, Ablauf, Dienstleistern und Budget entsteht ein roter Faden für eure Hochzeit.
  -
    title: Tag koordinieren
    text: Am Hochzeitstag halten wir Abläufe, Menschen und Details zusammen, damit ihr den Moment genießen könnt.
```

### 7. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Marie Falk
    role: Planung
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Ella Sommer
    role: Design
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Jonas Weber
    role: Ablaufkoordination
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
```

### 8. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Atelier Amour: Wedding Service mit Anspruch
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 9. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Hochzeiten
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 11. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Inspirationen für euren Hochzeitstag
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 12. `contactPreview`

```yaml
eyebrow: Planung & Konzepte
headline: Lass uns ins Gespräch kommen
description: Erzähl uns, was du vorhast. Wir melden uns mit einer passenden Empfehlung.
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Hochzeiten mit Herz und Erfahrung
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Persönliches Konzept
  - Stilvolle Gestaltung
  - Verlässliche Koordination
  - Budget im Blick
```

### 3. `serviceCards`

```yaml
eyebrow: Planung & Konzepte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Freie Trauung
    text: Freie Trauung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `processCards`

```yaml
eyebrow: Planung & Konzepte
headline: So einfach wird der Weg zu deinem Ergebnis
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Kennenlernen
    text: Wir sprechen über euch, eure Wünsche, Prioritäten und den Rahmen, in dem sich der Tag gut anfühlen soll.
  -
    title: Konzept planen
    text: Aus Stil, Ablauf, Dienstleistern und Budget entsteht ein roter Faden für eure Hochzeit.
  -
    title: Tag koordinieren
    text: Am Hochzeitstag halten wir Abläufe, Menschen und Details zusammen, damit ihr den Moment genießen könnt.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 6. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Hochzeiten
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 7. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Atelier Amour: Wedding Service mit Anspruch
items:
  -
    question: Wann sollten wir euch anfragen?
    answer: Idealerweise 9 bis 18 Monate vor der Hochzeit, kurzfristige Begleitungen sind nach Verfügbarkeit möglich.
  -
    question: Können wir einzelne Leistungen buchen?
    answer: Ja, neben Full-Service bieten wir auch Designkonzepte und Tageskoordination an.
```

### 8. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Atelier Amour: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Hochzeiten mit Herz und Erfahrung
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Planung & Konzepte
headline: Was uns besonders macht
intro: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 4. `categoryCards`

```yaml
eyebrow: Planung & Konzepte
headline: Unsere Schwerpunkte
items:
  -
    title: Sommerhochzeit im Garten
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elegante Stadthochzeit
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Intime Feier am See
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Atelier Amour: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Hochzeiten mit Herz und Erfahrung
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Planung & Konzepte
headline: Was uns besonders macht
intro: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
```

### 3. `timeline`

```yaml
items:
  -
    title: Kennenlernen
    text: Wir sprechen über euch, eure Wünsche, Prioritäten und den Rahmen, in dem sich der Tag gut anfühlen soll.
  -
    title: Konzept planen
    text: Aus Stil, Ablauf, Dienstleistern und Budget entsteht ein roter Faden für eure Hochzeit.
  -
    title: Tag koordinieren
    text: Am Hochzeitstag halten wir Abläufe, Menschen und Details zusammen, damit ihr den Moment genießen könnt.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Marie Falk
    role: Planung
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Ella Sommer
    role: Design
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Jonas Weber
    role: Ablaufkoordination
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
```

### 5. `venueShowcase`

```yaml
eyebrow: Planung & Konzepte
headline: Orte, die euren Tag tragen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 6. `trustStrip`

```yaml
items:
  - Persönliches Konzept
  - Stilvolle Gestaltung
  - Verlässliche Koordination
  - Budget im Blick
```

### 7. `statsBand`

```yaml
items:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 8. `badgeWall`

```yaml
eyebrow: Planung & Konzepte
headline: Qualität, die sichtbar ist
items:
  - Stilvolles Konzept
  - Verlässliche Koordination
  - Ausgewählte Dienstleister
  - Budget im Blick
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Atelier Amour: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Hochzeiten mit Herz und Erfahrung
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Erzählt uns von Datum, Location, Stil und euren Wünschen. Wir melden uns für ein erstes Planungsgespräch.
googleMapsUrl: https://maps.google.com/?q=Neckargasse+11,+69117+Heidelberg
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Hochzeitsdatum
  - Wünsche und Rahmen
```

### 3. `rsvpForm`

```yaml
eyebrow: Planung & Konzepte
headline: Schreibt uns von euren Plänen
description: Teilt uns eure Wünsche, euren Termin und eure ersten Ideen mit. Wir melden uns persönlich zurück.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 4. `locations`

```yaml
locations:
  -
    name: Atelier Amour
    address: Neckargasse 11, 69117 Heidelberg
    phone: +49 6221 123456
    email: hello@example-wedding.de
```

### 5. `directions`

```yaml
eyebrow: Planung & Konzepte
headline: So findest du uns
subline: Atelier Amour liegt gut erreichbar in Heidelberg. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Atelier Amour: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```
# wedding / modern — Ever After Studio

Ton: klar, reduziert und hochwertig.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Modern geplant. Persönlich gefeiert.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
buttonSecondary:
  label: Planung ansehen
  href: #leistungen
```

### 3. `serviceCards`

```yaml
eyebrow: Planung & Konzepte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Freie Trauung
    text: Freie Trauung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Hochzeiten
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 5. `brandLogos`

```yaml
items:
  - Partner A
  - Partner B
  - Partner C
  - Partner D
```

### 6. `storyTeaser`

```yaml
eyebrow: Planung & Konzepte
headline: Warum wir tun, was wir tun
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 7. `processTextColumns`

```yaml
eyebrow: Planung & Konzepte
headline: Vom ersten Gespräch bis zur Umsetzung
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Kennenlernen
    text: Wir sprechen über euch, eure Wünsche, Prioritäten und den Rahmen, in dem sich der Tag gut anfühlen soll.
  -
    title: Konzept planen
    text: Aus Stil, Ablauf, Dienstleistern und Budget entsteht ein roter Faden für eure Hochzeit.
  -
    title: Tag koordinieren
    text: Am Hochzeitstag halten wir Abläufe, Menschen und Details zusammen, damit ihr den Moment genießen könnt.
```

### 8. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Marie Falk
    role: Planung
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Ella Sommer
    role: Design
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Jonas Weber
    role: Ablaufkoordination
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
```

### 9. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Ever After Studio: Wedding Service mit Anspruch
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 10. `statsBand`

```yaml
items:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 11. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 12. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Inspirationen für euren Hochzeitstag
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 13. `contactPreview`

```yaml
eyebrow: Planung & Konzepte
headline: Lass uns ins Gespräch kommen
description: Erzähl uns, was du vorhast. Wir melden uns mit einer passenden Empfehlung.
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Modern geplant. Persönlich gefeiert.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Persönliches Konzept
  - Stilvolle Gestaltung
  - Verlässliche Koordination
  - Budget im Blick
```

### 3. `serviceCards`

```yaml
eyebrow: Planung & Konzepte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Freie Trauung
    text: Freie Trauung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `processCards`

```yaml
eyebrow: Planung & Konzepte
headline: So einfach wird der Weg zu deinem Ergebnis
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Kennenlernen
    text: Wir sprechen über euch, eure Wünsche, Prioritäten und den Rahmen, in dem sich der Tag gut anfühlen soll.
  -
    title: Konzept planen
    text: Aus Stil, Ablauf, Dienstleistern und Budget entsteht ein roter Faden für eure Hochzeit.
  -
    title: Tag koordinieren
    text: Am Hochzeitstag halten wir Abläufe, Menschen und Details zusammen, damit ihr den Moment genießen könnt.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 6. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Hochzeiten
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 7. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Ever After Studio: Wedding Service mit Anspruch
items:
  -
    question: Wann sollten wir euch anfragen?
    answer: Idealerweise 9 bis 18 Monate vor der Hochzeit, kurzfristige Begleitungen sind nach Verfügbarkeit möglich.
  -
    question: Können wir einzelne Leistungen buchen?
    answer: Ja, neben Full-Service bieten wir auch Designkonzepte und Tageskoordination an.
```

### 8. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Ever After Studio: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Modern geplant. Persönlich gefeiert.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Planung & Konzepte
headline: Was uns besonders macht
intro: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 4. `categoryCards`

```yaml
eyebrow: Planung & Konzepte
headline: Unsere Schwerpunkte
items:
  -
    title: Sommerhochzeit im Garten
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elegante Stadthochzeit
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Intime Feier am See
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Ever After Studio: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Modern geplant. Persönlich gefeiert.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `storyFacts`

```yaml
description: Wir arbeiten persönlich, klar und mit dem Anspruch, dass sich jedes Detail richtig anfühlt.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
```

### 3. `teaserList`

```yaml
eyebrow: Planung & Konzepte
headline: Was uns besonders macht
intro: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
```

### 4. `timeline`

```yaml
items:
  -
    title: Kennenlernen
    text: Wir sprechen über euch, eure Wünsche, Prioritäten und den Rahmen, in dem sich der Tag gut anfühlen soll.
  -
    title: Konzept planen
    text: Aus Stil, Ablauf, Dienstleistern und Budget entsteht ein roter Faden für eure Hochzeit.
  -
    title: Tag koordinieren
    text: Am Hochzeitstag halten wir Abläufe, Menschen und Details zusammen, damit ihr den Moment genießen könnt.
```

### 5. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Marie Falk
    role: Planung
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Ella Sommer
    role: Design
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Jonas Weber
    role: Ablaufkoordination
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
```

### 6. `venueShowcase`

```yaml
eyebrow: Planung & Konzepte
headline: Orte, die euren Tag tragen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 7. `trustStrip`

```yaml
items:
  - Persönliches Konzept
  - Stilvolle Gestaltung
  - Verlässliche Koordination
  - Budget im Blick
```

### 8. `statsBand`

```yaml
items:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 9. `badgeWall`

```yaml
eyebrow: Planung & Konzepte
headline: Qualität, die sichtbar ist
items:
  - Stilvolles Konzept
  - Verlässliche Koordination
  - Ausgewählte Dienstleister
  - Budget im Blick
```

### 10. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 11. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Ever After Studio: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Modern geplant. Persönlich gefeiert.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Erzählt uns von Datum, Location, Stil und euren Wünschen. Wir melden uns für ein erstes Planungsgespräch.
googleMapsUrl: https://maps.google.com/?q=Neckargasse+11,+69117+Heidelberg
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Hochzeitsdatum
  - Wünsche und Rahmen
```

### 3. `rsvpForm`

```yaml
eyebrow: Planung & Konzepte
headline: Schreibt uns von euren Plänen
description: Teilt uns eure Wünsche, euren Termin und eure ersten Ideen mit. Wir melden uns persönlich zurück.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 4. `locations`

```yaml
locations:
  -
    name: Ever After Studio
    address: Neckargasse 11, 69117 Heidelberg
    phone: +49 6221 123456
    email: hello@example-wedding.de
```

### 5. `directions`

```yaml
eyebrow: Planung & Konzepte
headline: So findest du uns
subline: Ever After Studio liegt gut erreichbar in Heidelberg. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Ever After Studio: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```
# wedding / bold — Vow & Wow Events

Ton: markant, direkt und energiegeladen.


## Startseite (`home`)


### 1. `hero`

```yaml
eyebrow: Mehr Liebe. Mehr Wow.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `marqueeBand`

```yaml
items:
  - Persönliches Konzept
  - Stilvolle Gestaltung
  - Verlässliche Koordination
  - Budget im Blick
```

### 3. `featureImage`

```yaml
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 4. `actionBar`

```yaml
autoAvailabilityStatusEnabled: True
availabilityStatusOverride: Heute erreichbar
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
buttonSecondary:
  label: Planung ansehen
  href: #leistungen
```

### 5. `serviceCards`

```yaml
eyebrow: Planung & Konzepte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Freie Trauung
    text: Freie Trauung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 6. `processTextColumns`

```yaml
eyebrow: Planung & Konzepte
headline: Vom ersten Gespräch bis zur Umsetzung
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Kennenlernen
    text: Wir sprechen über euch, eure Wünsche, Prioritäten und den Rahmen, in dem sich der Tag gut anfühlen soll.
  -
    title: Konzept planen
    text: Aus Stil, Ablauf, Dienstleistern und Budget entsteht ein roter Faden für eure Hochzeit.
  -
    title: Tag koordinieren
    text: Am Hochzeitstag halten wir Abläufe, Menschen und Details zusammen, damit ihr den Moment genießen könnt.
```

### 7. `videoEmbed`

```yaml
eyebrow: Ein Gefühl für uns
headline: Vow & Wow Events: Wedding Service mit Anspruch
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
videoUrl: "ANWEISUNG: Passendes Branchenvideo online suchen oder eigenes Video einbetten – Thema: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 8. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Hochzeiten
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 9. `statsBand`

```yaml
items:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 10. `storySplit`

```yaml
eyebrow: Planung & Konzepte
headline: Unsere Art, Dinge anders zu machen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
```

### 11. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Marie Falk
    role: Planung
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Ella Sommer
    role: Design
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Jonas Weber
    role: Ablaufkoordination
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
```

### 12. `testimonialMarquee`

```yaml
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 13. `quoteWall`

```yaml
items:
  - Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
  - Wir machen es einfach, klar und angenehm.
  - Jedes Detail soll sich richtig anfühlen.
```

### 14. `newsTeaser`

```yaml
eyebrow: Aktuelles
headline: Inspirationen für euren Hochzeitstag
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 15. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Vow & Wow Events: Wedding Service mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Leistungen (`services`)


### 1. `hero`

```yaml
eyebrow: Mehr Liebe. Mehr Wow.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `highlightsBar`

```yaml
items:
  - Persönliches Konzept
  - Stilvolle Gestaltung
  - Verlässliche Koordination
  - Budget im Blick
```

### 3. `serviceCards`

```yaml
eyebrow: Planung & Konzepte
headline: Leistungen, die genau zu deinem Bedarf passen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
  -
    title: Freie Trauung
    text: Freie Trauung mit persönlichem Konzept, stimmigem Design und Planung, die euch spürbar entlastet.
    button:
      label: Mehr erfahren
      href: #leistungen
```

### 4. `processCards`

```yaml
eyebrow: Planung & Konzepte
headline: So einfach wird der Weg zu deinem Ergebnis
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Kennenlernen
    text: Wir sprechen über euch, eure Wünsche, Prioritäten und den Rahmen, in dem sich der Tag gut anfühlen soll.
  -
    title: Konzept planen
    text: Aus Stil, Ablauf, Dienstleistern und Budget entsteht ein roter Faden für eure Hochzeit.
  -
    title: Tag koordinieren
    text: Am Hochzeitstag halten wir Abläufe, Menschen und Details zusammen, damit ihr den Moment genießen könnt.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 6. `galleryPreview`

```yaml
eyebrow: Einblicke
headline: Ein Blick in unsere Hochzeiten
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 7. `faq`

```yaml
eyebrow: Gut zu wissen
headline: Vow & Wow Events: Wedding Service mit Anspruch
items:
  -
    question: Wann sollten wir euch anfragen?
    answer: Idealerweise 9 bis 18 Monate vor der Hochzeit, kurzfristige Begleitungen sind nach Verfügbarkeit möglich.
  -
    question: Können wir einzelne Leistungen buchen?
    answer: Ja, neben Full-Service bieten wir auch Designkonzepte und Tageskoordination an.
```

### 8. `ctaBand`

```yaml
eyebrow: Nächster Schritt
headline: Vow & Wow Events: Wedding Service mit Anspruch
subline: Mach den nächsten Schritt. Wir kümmern uns um den Rest.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Galerie (`gallery`)


### 1. `hero`

```yaml
eyebrow: Mehr Liebe. Mehr Wow.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Planung & Konzepte
headline: Was uns besonders macht
intro: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
```

### 3. `gallery`

```yaml
images:
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
  - "ANWEISUNG: Passendes Galeriebild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 4. `categoryCards`

```yaml
eyebrow: Planung & Konzepte
headline: Unsere Schwerpunkte
items:
  -
    title: Sommerhochzeit im Garten
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Elegante Stadthochzeit
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
  -
    title: Intime Feier am See
    text: Ein Projekt mit klarem Ziel, sauberer Umsetzung und sichtbarem Ergebnis.
```

### 5. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Vow & Wow Events: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Über uns (`about`)


### 1. `hero`

```yaml
eyebrow: Mehr Liebe. Mehr Wow.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `teaserList`

```yaml
eyebrow: Planung & Konzepte
headline: Was uns besonders macht
intro: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
```

### 3. `timeline`

```yaml
items:
  -
    title: Kennenlernen
    text: Wir sprechen über euch, eure Wünsche, Prioritäten und den Rahmen, in dem sich der Tag gut anfühlen soll.
  -
    title: Konzept planen
    text: Aus Stil, Ablauf, Dienstleistern und Budget entsteht ein roter Faden für eure Hochzeit.
  -
    title: Tag koordinieren
    text: Am Hochzeitstag halten wir Abläufe, Menschen und Details zusammen, damit ihr den Moment genießen könnt.
```

### 4. `team`

```yaml
eyebrow: Unser Team
headline: Menschen, die mitdenken
items:
  -
    name: Marie Falk
    role: Planung
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Ella Sommer
    role: Design
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
  -
    name: Jonas Weber
    role: Ablaufkoordination
    text: Verbindet Organisation, Stilgefühl und Ruhe, damit aus vielen Details ein stimmiger Hochzeitstag wird.
```

### 5. `venueShowcase`

```yaml
eyebrow: Planung & Konzepte
headline: Orte, die euren Tag tragen
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
items:
  -
    title: Full-Service Planung
    text: Full-Service Planung mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Designkonzept
    text: Designkonzept mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
  -
    title: Tageskoordination
    text: Tageskoordination mit persönlichem Konzept, stimmiger Gestaltung und Details, die euren Tag unverwechselbar machen.
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
```

### 6. `trustStrip`

```yaml
items:
  - Persönliches Konzept
  - Stilvolle Gestaltung
  - Verlässliche Koordination
  - Budget im Blick
```

### 7. `statsBand`

```yaml
items:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 8. `badgeWall`

```yaml
eyebrow: Planung & Konzepte
headline: Qualität, die sichtbar ist
items:
  - Stilvolles Konzept
  - Verlässliche Koordination
  - Ausgewählte Dienstleister
  - Budget im Blick
```

### 9. `testimonials`

```yaml
eyebrow: Stimmen
headline: Was Paare über uns sagen
testimonials:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
items:
  -
    quote: Unsere Hochzeit war entspannt, wunderschön und genau so, wie wir sie uns vorgestellt hatten.
    name: Alex M.
    context: Brautpaar
  -
    quote: Unser Tag fühlte sich genau nach uns an – entspannt, schön und perfekt begleitet.
    name: Samira K.
    context: Brautpaar
```

### 10. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Vow & Wow Events: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

## Kontakt (`contact`)


### 1. `hero`

```yaml
eyebrow: Mehr Liebe. Mehr Wow.
headline: Hochzeiten, die sich persönlich, leicht und unvergesslich anfühlen
subline: Wir planen, gestalten und begleiten euren Tag mit Ruhe, Stil und einem Blick für die Details, die euch ausmachen.
description: Vom ersten Konzept bis zum letzten Tanz sorgen wir dafür, dass ihr feiern könnt, statt zu organisieren.
backgroundImage: "ANWEISUNG: Passendes Hero-Bild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
image: "ANWEISUNG: Passendes Branchenbild online suchen (z. B. Unsplash/Pexels) – Motiv: Hochzeit, Eventplanung, Dekoration, Brautpaar, Feierlocation."
buttonPrimary:
  label: Kennenlernen anfragen
  href: #kontakt
stats:
  -
    value: 120+
    label: begleitete Feiern
  -
    value: 1
    label: fester Ansprechpartner
  -
    value: 4.9/5
    label: Paarfeedback
```

### 2. `contactDetails`

```yaml
eyebrow: Kontakt
headline: Wir freuen uns auf deine Nachricht
subline: Erzählt uns von Datum, Location, Stil und euren Wünschen. Wir melden uns für ein erstes Planungsgespräch.
googleMapsUrl: https://maps.google.com/?q=Neckargasse+11,+69117+Heidelberg
additionalFormFields:
  - Name
  - E-Mail
  - Telefon
  - Hochzeitsdatum
  - Wünsche und Rahmen
```

### 3. `rsvpForm`

```yaml
eyebrow: Planung & Konzepte
headline: Schreibt uns von euren Plänen
description: Teilt uns eure Wünsche, euren Termin und eure ersten Ideen mit. Wir melden uns persönlich zurück.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```

### 4. `locations`

```yaml
locations:
  -
    name: Vow & Wow Events
    address: Neckargasse 11, 69117 Heidelberg
    phone: +49 6221 123456
    email: hello@example-wedding.de
```

### 5. `directions`

```yaml
eyebrow: Planung & Konzepte
headline: So findest du uns
subline: Vow & Wow Events liegt gut erreichbar in Heidelberg. Plane deine Anreise entspannt.
items:
  -
    title: Anreise mit ÖPNV
    text: Die nächste Haltestelle ist nur wenige Minuten entfernt.
  -
    title: Parken
    text: Parkmöglichkeiten befinden sich direkt in der Umgebung.
```

### 6. `cta`

```yaml
eyebrow: Nächster Schritt
headline: Vow & Wow Events: Wedding Service mit Anspruch
subline: Wir freuen uns darauf, euren Hochzeitstag mit euch zu planen.
button:
  label: Kennenlernen anfragen
  href: #kontakt
```