<!-- src/views/Kontakt.vue -->
<template>
  <BasePage
    imageSrc="/images/outside/haus_hamburg_leer_046.webp"
    imageAlt="Haus Hamburg Kontakt"
    titleAbove="Post"
    titleMain="Kontakt"
    subtitle="Wo ji uns erreichen köönt."
    heading="Erreichen Sie uns"
    flowText="Wir freuen uns, Sie bei uns begrüßen zu dürfen! Egal, ob Sie Fragen haben, eine Reservierung vornehmen möchten oder besondere Wünsche haben – wir sind immer für Sie da. Kontaktieren Sie uns gerne telefonisch oder per E-Mail, um uns Ihre Anliegen mitzuteilen. Unser Team setzt alles daran, Ihnen einen unvergesslichen Aufenthalt in einer einladenden und entspannten Atmosphäre zu bieten. Wir sind gespannt auf Ihre Nachricht!"
    parallaxImageSrc="/images/restaurant/haus_hamburg_leer_008.webp"
    parallaxImageAlt="Kontakt Parallax Bildbeschreibung"
  >
    <!-- Kontaktinformationen und Öffnungszeiten -->
    <div class="contact-container">
      <!-- Kontaktinformationen -->
      <div class="contact-details">
        <h3 class="contact-header">Kontakt</h3> <!-- Hinzugefügte Überschrift -->
        <div class="contact-item">
          <i class="fas fa-phone"></i>
          <a href="tel:+494914884">+49 491 4884</a>
        </div>
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <a href="mailto:info@haus-hamburg-leer.de">info@haus-hamburg-leer.de</a>
        </div>
        <div class="contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <a
            href="https://www.google.com/maps/place/Rathausstr.+3-5,+26789+Leer,+Ostfriesland"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rathausstr. 3 – 5<br />
            26789 Leer, Ostfriesland
          </a>
        </div>
      </div>

      <!-- Öffnungszeiten -->
     <!-- Öffnungszeiten -->
<div class="opening-hours">
  <h3 class="contact-header">Öffnungszeiten</h3>
  <div class="hours-grid">

    <div class="day-time">
      <div class="day">Montag:</div>
      <div class="time">17:00 – 20:00</div>
    </div>
    <div class="day-time">
      <div class="day">Dienstag:</div>
      <div class="time">17:00 – 20:00</div>
    </div>
    <div class="day-time closed">
      <div class="day">Mittwoch:</div>
      <div class="time">Geschlossen</div>
    </div>
    <div class="day-time closed">
      <div class="day">Donnerstag:</div>
      <div class="time">Geschlossen</div>
    </div>
    <div class="day-time">
      <div class="day">Freitag:</div>
      <div class="time">17:00 – 21:00</div>
    </div>
    <div class="day-time">
      <div class="day">Samstag:</div>
      <div class="time">15:00 – 21:00</div>
    </div>
    <div class="day-time">
      <div class="day">Sonntag:</div>
      <div class="time">16:00 – 19:30</div>
    </div>
  </div>
</div>
    </div>

    <!-- Google Map -->
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2388.492664061767!2d7.448253012889244!3d53.22694437213925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b64dc14ad3eaab%3A0x1184033be441089!2sHaus%20Hamburg!5e0!3m2!1sde!2sde!4v1738320525391!5m2!1sde!2sde"
        frameborder="0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>

    <!-- Google Bewertungen -->
    <div class="google-reviews">
      <h3>Was unsere Gäste sagen</h3>
      <div class="elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578" data-elfsight-app-lazy></div>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Kontakt",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
.contact-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.6em;
}

/* Kontaktinformationen und Öffnungszeiten nebeneinander */
.contact-details,
.opening-hours {
  flex: 1 1 10em;
  text-align: left;
}

/* Zentrieren auf mobilen Geräten */
@media (max-width: 480px) {
  .contact-details,
  .opening-hours {
    text-align: left;
  }
}

/* Überschrift "Kontakt" */
.contact-header {
  font-size: 1.2em; /* Etwas größere Schrift für die Überschrift */
  margin-bottom: 0.8em; /* Abstand unter der Überschrift */
  color: var(--blue);
  font-family: inherit; /* Vererbt die Schriftfamilie */
  font-weight: bold; /* Hervorheben der Überschrift */
}

/* Kontakt-Items */
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5em; /* Reduzierter horizontaler Abstand */
  margin-bottom: 0.5em; /* Reduzierter vertikaler Abstand */
  text-align: left;
  font-family: inherit; /* Vererbt die Schriftfamilie */
  font-size: inherit; /* Vererbt die Schriftgröße */
  line-height: inherit; /* Vererbt den Zeilenabstand */
}

.contact-item i {
  color: var(--gold);
  font-size: 1.2em; /* Einheitliche Icon-Größe */
  min-width: 24px; /* Einheitliche Breite */
  text-align: center;
}

.contact-item a {
  color: var(--blue);
  text-decoration: none;
  word-break: break-word; /* Verhindert das Überlaufen von langen Texten */
}

.contact-item a:hover {
  text-decoration: underline;
}

/* Öffnungszeiten */
.opening-hours {
  text-align: left;
  font-family: inherit; /* Vererbt die Schriftfamilie */
  font-size: inherit; /* Vererbt die Schriftgröße */
  line-height: inherit; /* Vererbt den Zeilenabstand */
}

.hours-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  text-align: left;
}

.hours-grid .day-time {
  display: flex;
  align-items: center;
  gap: 2em;
}

.hours-grid .day {
  font-weight: bold;
  width: 100px;
  flex-shrink: 0; /* Verhindert das Schrumpfen der Tagesangabe */
  font-size: 1em; /* Einheitliche Schriftgröße */
  line-height: 1.2; /* Verbesserter Zeilenabstand */
}

.hours-grid .time {
  color: var(--blue);
  font-size: 1em; /* Einheitliche Schriftgröße */
  line-height: 1.2; /* Verbesserter Zeilenabstand */
}


.map-container iframe {
  width: 100%;
  height: 45vh;
  border-radius: 20px;
}

/* Google Bewertungen Styling */
.google-reviews {
  margin: 2em auto;
  padding: 1em;
  font-family: 'Arial', sans-serif; /* Einheitliche Schriftfamilie */
  font-size: 1em; /* Einheitliche Schriftgröße */
  line-height: 1.5; /* Einheitlicher Zeilenabstand */
}

.google-reviews h3 {
  margin-bottom: 1em;
  color: var(--blue);
  font-family: inherit; /* Vererbt die Schriftfamilie */
  font-size: 1.2em; /* Einheitliche Schriftgröße */
  line-height: 1.2; /* Einheitlicher Zeilenabstand */
}

.elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
  width: 100%;
  height: auto; /* Dynamische Höhe */
  min-height: 400px; /* Setzt eine minimale Höhe */
  border: none;
  transition: height 0.3s ease; /* Sanfter Übergang beim Anpassen der Höhe */
}

/* Responsive Anpassungen */
@media (min-width: 1024px) {
  .contact-container {
    gap: 3em;
  }

  .hours-grid .day {
    width: 180px;
  }

  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    height: auto; /* Entfernt die feste Höhe */
    min-height: 600px; /* Größere minimale Höhe auf Desktop */
  }



  .map-container {
    padding: 1em;
    box-shadow: 0;
  }
}

@media (max-width: 768px) {
  .contact-container {
    padding: 1.5em;
  }


  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    height: auto; /* Entfernt die feste Höhe */
    min-height: 500px; /* Anpassung auf Tablets */
  }

  .map-container iframe {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .contact-container {
    flex-direction: column;
    gap: 1em;
  }

  /* Icons immer neben dem Text auf mobilen Geräten */
  .contact-item {
    flex-direction: row;
    align-items: center;
  }

  .contact-item i {
    margin-right: 0.5em;
    margin-bottom: 0; /* Entfernt den unteren Rand */
    font-size: 1.2em; /* Kleinere Icons auf mobilen Geräten */
  }


  .hours-grid .day,
  .hours-grid .time {
    margin: 0; /* Entfernt zusätzliche Abstände */
    padding: 0;
    line-height: 1.2; /* Verbesserter Zeilenabstand */
  }

  .hours-grid .day {
    font-size: 1em; /* Einheitliche Schriftgröße */
    width: 100px;
    flex-shrink: 0;
  }

  .hours-grid .time {
    font-size: 1em; /* Einheitliche Schriftgröße */
  }

  /* Google Bewertungen auf mobile */
  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    height: auto; /* Entfernt die feste Höhe */
    min-height: 30vh; /* Setzt eine minimale Höhe */
  }




}
</style>
