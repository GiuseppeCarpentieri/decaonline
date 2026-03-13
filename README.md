# DE.CA. Srl - Sito di Presentazione (Statico)

Sito web di presentazione aziendale - assistenza tecnica apparecchiature elettromedicali e scientifiche.

## Tecnologie

- **HTML5** - Struttura semantica
- **CSS3** - Design responsive e moderno
- **JavaScript** - Interattività e gestione temi
- **Formspree** - Gestione modulo contatti (backend-as-a-service)

## Requisiti

Non sono necessari server particolari. Basta un comune browser.

## Come eseguire

1.  Apri il file `index.html` direttamente nel tuo browser.
2.  Oppure, se usi VS Code, usa l'estensione **Live Server** per una migliore esperienza di sviluppo.

## Configurazione Modulo Contatti

Per rendere funzionante il modulo contatti:
1.  Vai su [Formspree.io](https://formspree.io/) e crea un account gratuito.
2.  Crea un nuovo "Form" e copia l'URL fornito (tipo `https://formspree.io/f/xxxxxx`).
3.  Nel file `index.html`, cerca la riga `<form ... action="...">` e sostituisci `tuo-codice` con il codice che hai ottenuto.

## Struttura

```
├── index.html
├── apparecchiature-scientifiche.html
├── cookies.html
├── privacy.html
├── movimentazione-apparecchiature.html
├── qr-code-personalizzato.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
└── icons/
```
