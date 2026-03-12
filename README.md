# DE.CA. Srl - Sito di Presentazione

Sito web di presentazione aziendale - assistenza tecnica apparecchiature elettromedicali e scientifiche.

## Tecnologie

- **Java** - Servlet per gestione form contatti
- **HTML5** - Struttura semantica
- **CSS3** - Design responsive e moderno

## Requisiti

- Java 11 o superiore
- Maven 3.6+

## Come eseguire

```bash
# Compila il progetto
mvn clean package

# Avvia con Tomcat embedded
mvn tomcat7:run
```

Poi apri il browser su: **http://localhost:8080**

## Struttura

```
├── pom.xml
├── src/main/
│   ├── java/com/sito/servlet/
│   │   └── ContactServlet.java
│   └── webapp/
│       ├── WEB-INF/web.xml
│       ├── index.html
│       ├── privacy.html
│       ├── cookies.html
│       ├── css/style.css
│       └── js/main.js
```

## Contenuti

- **Home** - Hero, servizi, presentazione azienda
- **Servizi** - Apparecchiature scientifiche, movimentazione, QR code
- **L'Azienda** - Profilo, certificazioni ISO 9001
- **Contatti** - Form con validazione lato server
- **Privacy & Cookie** - Pagine informative
