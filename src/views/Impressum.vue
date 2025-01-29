<!-- src/views/Impressum.vue -->
<template>
  <BasePage
    imageSrc="/images/mood/DSCF1092.JPG"
    imageAlt="Impressum Bild"
    titleAbove="Impressum"
    titleMain="Informationen"
    subtitle="Verantwortlich für den Inhalt"
    heading="Impressum"
    flowText=""
    parallaxImageSrc="/images/mood/DSCF3615.JPG"
    parallaxImageAlt=""
  >
    <div>
      <section>
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
          Alle Rechte vorbehalten. ©Helga Wagemann
        </p>
      </section>

      <section>
        <h3>Webmaster:</h3>
        <p>
          Löffler Creativ<br />
          Inhaber: Martin Löffler<br />
          Neue Straße 44<br />
          26789 Leer<br />
          Telefon: <a href="tel:+49419769483">0491 97 69 483</a><br />
          <a href="https://www.loefflercreativ.de" target="_blank" rel="noopener noreferrer">www.loefflercreativ.de</a>
        </p>
      </section>

      <!-- Weitere Impressumsabschnitte hier -->

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
/* Optional: Zusätzliche Styles für die Impressum-Seite */
section {
  margin-bottom: 2rem;
  text-align: left;
}

h3 {
  margin-top: 1.5rem;
  color: var(--blue); /* Stelle sicher, dass die Farbvariable vorhanden ist */
}

a {
  color: var(--blue);
  text-decoration: underline;
}
</style>
