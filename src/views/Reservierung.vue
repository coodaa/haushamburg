<template>
  <BasePage
    imageSrc="/images/restaurant/haus-hamburg-leer-08.webp"
    imageAlt="Haus Hamburg Reservierung"
    titleAbove="Tisch buchen"
    titleMain="Reservierung"
    subtitle="Kumm röver un sett di bi uns hen!"
    heading="Reservieren Sie online"
    flowText="Planen Sie Ihren Besuch in unserem Haus und sichern Sie sich Ihren Platz ganz unkompliziert online. Freuen Sie sich auf einen genussvollen Abend in entspannter Atmosphäre – reservieren Sie noch heute Ihren Tisch und erleben Sie kulinarische Höhepunkte, die Sie begeistern werden."
    parallaxImageSrc="/images/restaurant/haus-hamburg-leer-12.webp"
    parallaxImageAlt="Parallax Bild der Reservierung von Haus Hamburg"
  >
    <div class="reservation-container">
      <!-- Einführungstext -->
      <p class="intro-text">
        Herzlich willkommen bei <strong>Haus Hamburg</strong>! Über unseren Online-Service können Sie ganz einfach Ihren Tisch buchen. Wählen Sie das gewünschte Datum, die Uhrzeit und die Anzahl der Gäste, um Ihren Besuch bei uns zu planen.
      </p>

      <!-- Hintergrundbereich für das Reservierungsformular -->
      <div class="contact">
        <div class="opentable-embed">
          <iframe
            src="https://www.opentable.de/restref/client/?restref=387363&lang=de-DE&ot_source=Restaurant%2520website&fbclid=PAZXh0bgNhZW0CMTEAAaYogoVV1mACQOyyrhqMiTQtwrekrxDVhfYWmEosS2itqEUM2Uk4hmv_LIY_aem_ifDT7I84jrlAuXU5XCCLlw&corrid=09611799-3f75-412d-a06c-87e37880e5eb"
            frameborder="0"
            width="100%"
            height="600"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <section class="svg-section">
        <div class="scalloped-svg"></div>
        <p class="additional-info">
          Alternativ können Sie uns auch telefonisch oder per E-Mail kontaktieren, um Ihren Besuch zu planen.
        </p>
        <ContactInfo />
      </section>
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
  metaInfo: {
    title: "Reservierung – Haus Hamburg",
    meta: [
      {
        name: "description",
        content:
          "Planen Sie Ihren Besuch im Haus Hamburg und reservieren Sie online Ihren Tisch. Erleben Sie kulinarische Höhepunkte in entspannter Atmosphäre in Leer, Ostfriesland.",
      },
      {
        property: "og:title",
        content: "Reservierung – Haus Hamburg",
      },
      {
        property: "og:description",
        content:
          "Reservieren Sie online Ihren Tisch im Haus Hamburg und genießen Sie einen unvergesslichen Abend in entspannter Atmosphäre.",
      },
      {
        property: "og:url",
        content: "https://haus-hamburg-leer.de/reservierung",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    script: [
      {
        type: "application/ld+json",
        json: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Reservierung – Haus Hamburg",
          "description":
            "Reservieren Sie online Ihren Tisch im Haus Hamburg, Leer, Ostfriesland. Erleben Sie kulinarische Höhepunkte in entspannter Atmosphäre.",
          "url": "https://haus-hamburg-leer.de/reservierung",
        },
      },
    ],
  },
};
</script>

<style scoped>
/* Allgemeine Container-Zentrierung */
.reservation-container {
  margin: 2rem auto;
  text-align: center;
  max-width: 80vw;
}

.intro-text,
.additional-info {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  padding-bottom: 2em;
}

/* Hintergrundbereich für das Reservierungsformular */
.contact {
  background-color: var(--beige);
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;
  padding: 3em 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 2;
}

/* OpenTable-Widget */
.opentable-embed {
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background-color: #FFFFFF;
  max-width: 35em;
}

.opentable-embed iframe {
  display: block;
  width: 100%;
  border: none;
  border-radius: 20px;
}

/* SVG-Sektion */
.svg-section {
  position: relative;
  padding: 2em 1em 1em 1em;
  margin-top: -1em;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
.svg-section .scalloped-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/dropround.svg');
  background-repeat: repeat-x;
  background-position: top left;
  z-index: 0;
}

.additional-info {
  padding-top: 3em;
  font-weight: bold;
}

@media (min-width: 768px) {
  .additional-info {
    padding-top: 6em;
  }
}
</style>
