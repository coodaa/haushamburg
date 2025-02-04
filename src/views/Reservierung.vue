<template>
  <BasePage
    imageSrc="/images/restaurant/haus_hamburg_leer_008.webp"
    imageAlt="Haus Hamburg Reservierung"
    titleAbove="Tisch buchen"
    titleMain="Reservierung"
    subtitle="Sichern Sie sich Ihren Platz bei uns"
    heading="Reservieren Sie online"
    flowText="Planen Sie Ihren Besuch in unserem Haus und sichern Sie sich Ihren Platz ganz unkompliziert online. Freuen Sie sich auf einen genussvollen Abend in entspannter Atmosphäre – reservieren Sie noch heute Ihren Tisch und erleben Sie kulinarische Höhepunkte, die Sie begeistern werden."
    parallaxImageSrc="/images/restaurant/haus_hamburg_leer_012.webp"
    parallaxImageAlt="Parallax Bild der Reservierung von Haus Hamburg"
  >
    <div class="reservation-container">
      <!-- Einführungstext -->
      <p class="intro-text">
        Herzlich willkommen bei <strong>Haus Hamburg</strong>! Über unseren Online-Service können Sie ganz einfach Ihren Tisch buchen. Wählen Sie das gewünschte Datum, die Uhrzeit und die Anzahl der Gäste, um Ihren Besuch bei uns zu planen.
      </p>

      <!-- Überschrift für den Buchungsbereich -->
      <h2 class="widget-heading">hier tisch reservieren</h2>

      <!-- Eingebettetes OpenTable-Widget via Iframe -->
      <div class="opentable-embed">
        <iframe
          src="https://www.opentable.de/restref/client/?restref=387363&lang=de-DE&ot_source=Restaurant%2520website&fbclid=PAZXh0bgNhZW0CMTEAAaYogoVV1mACQOyyrhqMiTQtwrekrxDVhfYWmEosS2itqEUM2Uk4hmv_LIY_aem_ifDT7I84jrlAuXU5XCCLlw&corrid=09611799-3f75-412d-a06c-87e37880e5eb"
          frameborder="0"
          width="100%"
          height="600"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Hinweistext zum Alternativkontakt -->
      <p class="additional-info">
        Alternativ können Sie uns auch telefonisch oder per E-Mail kontaktieren, um Ihren Besuch zu planen.
      </p>

      <!-- Kontakt- und Öffnungszeiten-Komponente einbinden -->
      <ContactInfo />
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";
import ContactInfo from "@/components/ContactInfo.vue";

export default {
  name: "Reservierung",
  components: {
    BasePage,
    ContactInfo,
  },
};
</script>

<style scoped>
.reservation-container {
  margin-top: 2rem;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}

.intro-text,
.additional-info {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.widget-heading {
  font-family: var(--font-thunder);
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem 0;
  text-transform: uppercase;
  color: var(--blue);
  text-align: center;
}

.opentable-embed {
  margin: 2rem auto;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
}

.opentable-embed iframe {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 10px;
}

/* Responsive Anpassungen */
@media (max-width: 767px) {

  .opentable-embed iframe {
    height: 400px;
  }
  .intro-text,
  .additional-info {
    font-size: 1rem;
  }
  .widget-heading {
    font-size: 1.8rem;
  }
}

@media (min-width: 1200px) {

.reservation-container {
  max-width: 80vw;
  text-align: center;
  }
}

</style>
