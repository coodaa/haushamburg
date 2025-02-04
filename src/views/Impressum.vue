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
.impressum-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.95); /* Leicht transparenter Weißton */
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-family: var(--font-body);
  color: var(--blue);
}

.impressum-content {
  font-size: 1.1rem;
  line-height: 1.6;
}

.impressum-content h3 {
  margin-bottom: 1rem;
  color: var(--blue);
  font-family: var(--font-thunder);
  font-size: 1.5rem;
}

.impressum-content p {
  margin-bottom: 1rem;
}

.impressum-content a {
  color: var(--blue);
  text-decoration: underline;
}
</style>
