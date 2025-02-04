<template>
  <div class="contact-info-component">
    <div class="contact-container">
      <!-- Kontaktinformationen -->
      <div class="contact-details">
        <h3 class="contact-header">Kontakt</h3>
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
      <div class="opening-hours">
        <h3 class="contact-header">Öffnungszeiten</h3>
        <div class="hours-grid">
          <div class="day-time">
            <div class="day">Montag:</div>
            <div class="time">17:00 – 20:00</div>
          </div>
          <div class="day-time">
            <div class="day">Dienstag:</div>
            <div class="time">Geschlossen</div>
          </div>
          <div class="day-time">
            <div class="day">Mittwoch:</div>
            <div class="time">Geschlossen</div>
          </div>
          <div class="day-time">
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
  </div>
</template>

<script>
export default {
  name: "ContactInfo",
};
</script>

<style scoped>
/* Grundlegender Container */
.contact-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4em;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Desktop: Gleiche Ränder links und rechts (25% vom Viewport) */
@media (min-width: 1024px) {
  .contact-container {
    padding: 3em 25%;
  }
}

/* Kontaktinformationen und Öffnungszeiten nebeneinander */
.contact-details,
.opening-hours {
  flex: 1 1 10em;
  text-align: left;
}

/* Überschrift "Kontakt" bzw. "Öffnungszeiten" */
.contact-header {
  font-size: 1.2em;
  margin-bottom: 0.8em;
  color: var(--blue);
  font-family: inherit;
  font-weight: bold;
}

/* Kontakt-Items */
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5em;
  text-align: left;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.contact-item i {
  color: var(--gold);
  font-size: 1.2em;
  min-width: 24px;
  text-align: center;
}

.contact-item a {
  color: var(--blue);
  text-decoration: none;
  word-break: break-word;
}

.contact-item a:hover {
  text-decoration: underline;
}

/* Öffnungszeiten */
.opening-hours {
  text-align: left;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.hours-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  text-align: left;
}

.day-time {
  display: flex;
  align-items: center;
  gap: 2em;
}

.day {
  font-weight: bold;
  width: 100px;
  flex-shrink: 0;
  font-size: 1em;
  line-height: 1.2;
}

.time {
  color: var(--blue);
  font-size: 1em;
  line-height: 1.2;
}

/* Responsive Anpassungen für mobile Geräte */
@media (max-width: 480px) {
  .contact-container {
    flex-direction: column;
    gap: 1em;
  }
  .contact-details,
  .opening-hours {
    text-align: left;
  }
  .day,
  .time {
    font-size: 1em;
  }
}
</style>
