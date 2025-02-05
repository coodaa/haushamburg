<template>
  <BasePage
    imageSrc="/images/mood/DSCF1092.JPG"
    imageAlt="Impressum Bild"
    titleAbove="Info"
    titleMain="Impressum"
    subtitle="Verantwortlich für den Inhalt"
    heading="Impressum"
    flowText="In unserem Impressum finden Sie alle gesetzlich vorgeschriebenen Angaben zu unserem Unternehmen. Wir laden Sie ein, sich über unsere rechtlichen Hinweise und Verantwortlichkeiten zu informieren."
    parallaxImageSrc="/images/mood/DSCF3615.JPG"
    parallaxImageAlt="Impressum Haus Hamburg Leer (Ostfriesland)"
  >
    <div class="impressum-container">
      <section class="impressum-content">
        <div class="text-and-logo">
          <!-- Textbereich -->
          <div class="impressum-text">
            <h3>Verantwortlich für den Inhalt:</h3>
            <p>
              <strong>Restaurant „Haus Hamburg“</strong><br />
              Rathausstr. 3 – 5<br />
              26789 Leer<br />
              Telefon: <a href="tel:+494914884">+49 (0) 491 / 48 84</a><br />
              E-Mail: <a href="mailto:info@haus-hamburg-leer.de">info@haus-hamburg-leer.de</a>
            </p>
            <p>
              <strong>Inhaberin:</strong> Helga Wagemann<br />
              Alle Rechte vorbehalten.
            </p>
          </div>

          <!-- Logo rechts neben dem Text -->
          <div class="impressum-logo">
            <img src="@/assets/haushamburg_logo.svg" alt="Haus Hamburg Logo" />
          </div>
        </div>
      </section>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Impressum",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
/* Container für das Impressum */
.impressum-container {
  max-width: 90vw;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: var(--font-body);
  color: var(--blue);
  text-align: center;
}

/* Standard: Text & Logo untereinander für Mobile */
.text-and-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

/* Textbereich */
.impressum-text {
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
}

.impressum-text h3 {
  color: var(--blue);
  font-family: var(--font-thunder);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.impressum-text p {
  margin-bottom: 1rem;
}

.impressum-text a {
  color: var(--blue);
  text-decoration: underline;
}

/* Logo */
.impressum-logo img {
  width: 10em;
  height: auto;
  max-width: 100%;
}

/* Desktop-Optimierung ab 768px */
@media (min-width: 768px) {
  .impressum-container {
    max-width: 900px;
    padding: 2rem;
  }

  .text-and-logo {
    flex-direction: row;
    align-items: center; /* Logo mittig zur Höhe des Textes */
    justify-content: space-between;
    text-align: left;
  }

  .impressum-text {
    text-align: left;
    flex: 1;
  }

  .impressum-logo img {
    width: 18em;
    height: auto;
  }
}
</style>
