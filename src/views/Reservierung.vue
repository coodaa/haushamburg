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

      <!-- OpenTable Reservierung -->
      <div class="contact">
        <div class="opentable-card">
          <p class="ot-label">Jetzt direkt bei OpenTable reservieren</p>
          <a
            href="https://www.opentable.de/restref/client/?restref=387363&lang=de-DE&ot_source=Restaurant%20website"
            target="_blank"
            rel="noopener noreferrer"
            class="ot-button"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="currentColor"/>
            </svg>
            Tisch reservieren
          </a>
          <p class="ot-note">Sie werden zu OpenTable weitergeleitet – schnell, sicher und ohne Wartezeit.</p>
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

/* OpenTable Card */
.opentable-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  max-width: 28rem;
  margin: 0 auto;
  box-shadow: 0 2px 16px rgba(3, 48, 93, 0.08);
}

.ot-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--blue);
  margin: 0;
}

.ot-button {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--blue);
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.ot-button svg {
  width: 1.3rem;
  height: 1.3rem;
  flex-shrink: 0;
}

.ot-button:hover {
  background: var(--gold);
  color: var(--blue);
  transform: translateY(-2px);
}

.ot-note {
  font-size: 0.82rem;
  color: #999;
  margin: 0;
}

/* SVG-Sektion */
.svg-section {
  position: relative;
  z-index: 3;
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
  height: 5em;
  background-image: url('@/assets/dropround.svg');
  background-repeat: repeat-x;
  background-position: top left;
  background-size:  calc(100% / 10);
  z-index: 3;
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
