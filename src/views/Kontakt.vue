<!-- src/views/Kontakt.vue -->
<template>
  <BasePage
    imageSrc="/images/outside/haus_hamburg_leer_046.webp"
    imageAlt="Haus Hamburg Kontakt"
    titleAbove="Post"
    titleMain="Kontakt"
    subtitle="Wo Sie uns erreichen können."
    heading="Erreichen Sie uns"
    flowText="Wir freuen uns, Sie bei uns begrüßen zu dürfen! Egal, ob Sie Fragen haben, eine Reservierung vornehmen möchten oder besondere Wünsche haben – wir sind immer für Sie da. Kontaktieren Sie uns gerne telefonisch oder per E-Mail, um uns Ihre Anliegen mitzuteilen. Unser Team setzt alles daran, Ihnen einen unvergesslichen Aufenthalt in einer einladenden und entspannten Atmosphäre zu bieten. Wir sind gespannt auf Ihre Nachricht!"
    parallaxImageSrc="/images/restaurant/haus_hamburg_leer_008.webp"
    parallaxImageAlt="Kontakt Parallax Bildbeschreibung"
  >
    <!-- Kontaktinformationen und Öffnungszeiten -->
    <div class="contact-container">
      <!-- Kontaktinformationen -->
      <div class="contact-details">
        <div class="contact-item">
          <i class="fas fa-phone"></i>
          <div>
            <strong>Telefon:</strong>
            <a href="tel:+494914884">+49 491 4884</a>
          </div>
        </div>
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <div>
            <strong>Email:</strong>
            <a href="mailto:info@haus-hamburg-leer.de">info@haus-hamburg-leer.de</a>
          </div>
        </div>
        <div class="contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <div>
            <strong>Adresse:</strong>
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
      </div>

      <!-- Öffnungszeiten -->
      <div class="opening-hours">
        <strong>Öffnungszeiten:</strong>
        <ul>
          <li>
            <span class="day">Montag bis Freitag:</span>
            <span class="time">17:00 – 21:00</span>
          </li>
          <li>
            <span class="day">Samstag:</span>
            <span class="time">13:00 – 15:00 und 17:00 – 21:00</span>
          </li>
          <li>
            <span class="day">Sonntag:</span>
            <span class="time">12:30 – 14:30 und 16:00 – 19:30</span>
          </li>
        </ul>
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
      <h3>Bewertungen</h3>
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
  padding: 1em;
}

/* Kontaktinformationen und Öffnungszeiten nebeneinander */
.contact-details,
.opening-hours {
  flex: 1 1 300px;
}

/* Kontakt-Items */
.contact-item {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;
}

.contact-item i {
  color: var(--gold);
  font-size: 1.5em;
  min-width: 24px; /* Einheitliche Breite */
  text-align: center;
}

.contact-item a {
  color: var(--blue);
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

/* Öffnungszeiten */
.opening-hours ul {
  list-style: none;
  padding-left: 0;
  margin-top: 0.5em;
}

.opening-hours li {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5em;
}

.opening-hours .day {
  width: 150px;
  font-weight: bold;
}

.opening-hours .time {
  color: var(--blue);
}

/* Google Map Styling */
.map-container {
  margin: 2em auto;
  max-width: 1200px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.map-container iframe {
  width: 100%;
  height: 450px;
}

/* Google Bewertungen Styling */
.google-reviews {
  max-width: 1200px;
  margin: 2em auto;
  padding: 1em;
}

.google-reviews h3 {
  margin-bottom: 1em;
  color: var(--blue);
}

.elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
  width: 100%;
  height: 400px;
  border: none;
}

/* Responsive Anpassungen */
@media (min-width: 1024px) {
  .contact-container {
    gap: 3em;
  }

  .opening-hours .day {
    width: 180px;
  }

  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    height: 600px;
  }

  .map-container iframe {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .contact-container {
    padding: 0.5em;
  }

  .opening-hours .day {
    width: 130px;
  }

  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    height: 500px;
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

  /* Kontakt-Items auf mobile: Icons über Text */
  .contact-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-item i {
    margin-bottom: 0.5em;
    font-size: 1.2em; /* Kleinere Icons auf mobilen Geräten */
  }

  /* Öffnungszeiten auf mobile: Anpassung der Breite */
  .opening-hours .day {
    width: 100px;
  }

  .opening-hours .time {
    display: block;
    margin-left: 0;
  }

  /* Google Bewertungen auf mobile */
  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    height: 400px;
  }

  /* Google Map auf mobile */
  .map-container iframe {
    height: 200px;
  }
}
</style>
