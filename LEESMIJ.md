# Young Tribe website

Statische site: HTML, CSS en een beetje JavaScript. Geen build, geen framework.

## Naar GitHub en Vercel

1. Pak de zip uit.
2. Zet **alle** bestanden en de map `images/` in de **hoofdmap** van de repo, dus niet in een submap. `index.html` moet bovenin staan, anders vindt Vercel hem niet.
3. In Vercel: New Project, kies de repo, en deploy. Framework laat je op "Other", build command en output directory blijven leeg.

## Bestanden

| Bestand | Wat het is |
|---|---|
| `index.html` | De homepage |
| `over-ons.html` | De pagina Over ons |
| `styles.css` | Alle styling van beide pagina's |
| `script.js` | Menu, eventkeuze, formulier en de reviewcarrousel |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Het icoon in de browsertab. Moeten in de hoofdmap blijven |
| `images/insideout.jpg` | Foto bij het InsideOut weekend |
| `images/spark.jpg` | Foto bij Spark events |
| `images/logo-mark.svg` | Het merkteken als vector, voor eigen gebruik |
| `images/logo-mark-wit-1024.png`, `images/logo-mark-indigo-1024.png` | Het merkteken als PNG met transparante achtergrond |

Het merkteken in de header en de footer zit rechtstreeks in de HTML, dus daar is geen bestand voor nodig.

## Nog te doen voordat je live gaat

**1. Het WhatsApp-nummer.** Overal staat nu `31600000000` als plaatshouder. Zoek en vervang dat in `index.html` en `over-ons.html` door het echte nummer: landcode zonder plus en zonder de nul, dus 06 12345678 wordt `31612345678`.

**2. De foto's van Blue Beetle.** Vier foto's worden nu rechtstreeks van de server van Blue Beetle geladen: de header, de kennismakingsavond, het verdiepingsweekend en het kampvuur achter het aanmeldformulier. Dat werkt, maar het kan breken zodra zij iets aanpassen. Vraag ze om toestemming, download de foto's, zet ze in `images/` en vervang de regels bovenin `styles.css` die beginnen met `--hero-photo`, `--ev-verdieping` en `--fire-photo` door bijvoorbeeld `url('images/bos.jpg')`.

**3. De foto bij de kennismakingsavond** is een gratis stockfoto van Unsplash, als tijdelijke invulling. Vervang `--ev-avond` in `styles.css` zodra je een eigen foto hebt.

**4. Het aanmeldformulier verstuurt nog niets.** Het laat alleen een bevestiging zien. Koppel het aan een backend, een formulierdienst of een CRM wanneer je zover bent. Zie de opmerking onderin `index.html`.

**5. De portretten van de begeleiders en de ervaringen.** Op `over-ons.html` staan zeven begeleiders met een gekleurde fotoplek en hun beginletter. Vervang die door echte portretten: zet de foto's vierkant bijgesneden in `images/` en vervang per kaart `<div class="person-photo">...</div>` door `<img class="person-photo" src="images/naam.jpg" alt="Naam">`. De negen reviews op de homepage zijn verzonnen ter illustratie.

## Teksten en kleuren aanpassen

De kleuren, de gradient en de foto's staan allemaal bovenin `styles.css` onder `:root`. Pas je daar iets aan, dan verandert het op de hele site mee.
