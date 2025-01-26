<template>
  <BasePage
    imageSrc="/images/restaurant/haus_hamburg_leer_008.webp"
    imageAlt="Haus Hamburg Reservierung"
    titleAbove="Reservierung"
    titleMain="Tisch buchen"
    subtitle="Sichern Sie sich Ihren Platz bei uns"
    heading="Reservieren Sie Ihren Tisch"
    flowText="Planen Sie Ihren Besuch und reservieren Sie Ihren Tisch einfach online."
    parallaxImageSrc="/images/restaurant/haus_hamburg_leer_012.webp"
    parallaxImageAlt="Parallax Bild der Reservierung von Haus Hamburg"
  >
    <div class="reservation-container">
      <p>
        Willkommen bei <strong>Haus Hamburg</strong>! Reservieren Sie Ihren Tisch ganz einfach über unseren
        Online-Service. Wählen Sie Datum, Uhrzeit und Anzahl der Gäste, um Ihren Besuch bei
        uns zu planen.
      </p>

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


      <p>
        Alternativ können Sie uns auch telefonisch oder per E-Mail kontaktieren, um Ihre
        Reservierung vorzunehmen.
      </p>
      <p>
        <strong>Telefon:</strong> <a href="tel:+494914884">+49 491 4884</a><br />
        <strong>Email:</strong> <a href="mailto:info@haus-hamburg-leer.de">info@haus-hamburg-leer.de</a>
      </p>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Reservierung",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
.reservation-container {
  margin-top: 2rem;
  text-align: left;
}

.reservation-container p {
  margin-bottom: 1rem;
}

.opentable-embed {
  margin: 2rem 0;
  border: none;
  border-radius: 10px;
  overflow: hidden;
}

.opentable-embed iframe {
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 10px;
}

.btn-opentable {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-opentable:hover {
  background-color: #218838;
}

@media (max-width: 767px) {
  .opentable-embed iframe {
    height: 400px;
  }

  .btn-opentable {
    width: 100%;
    text-align: center;
  }
}
</style>
