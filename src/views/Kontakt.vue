<template>
  <BasePage
    imageSrc="/src/assets/images/sunna.webp"
    imageAlt="Haus Hamburg Kontakt"
    titleAbove="Kontakt"
    titleMain="Reservierung"
    subtitle="Wie du uns erreichst?"
  >
    <p>
      Wir freuen uns darauf, von Ihnen zu hören! Bitte zögern Sie nicht, uns bei Fragen,
      Reservierungen oder besonderen Anliegen zu kontaktieren.
    </p>
    <p>
      <strong>Telefon:</strong> <a href="tel:+494914884">+49 491 4884</a><br />
      <strong>Email:</strong> <a href="mailto:info@haus-hamburg-leer.de">info@haus-hamburg-leer.de</a>
    </p>
    <p>
      <strong>Adresse:</strong><br />
      Rathausstr. 3 – 5<br />
      26789 Leer, Ostfriesland
    </p>
    <p>
      Wir sind für Sie da:<br />
      Montag bis Freitag: 17:00 – 21:00<br />
      Samstag: 13:00 – 15:00 und 17:00 – 21:00<br />
      Sonntag: 12:30 – 14:30 und 16:00 – 19:30
    </p>
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
/* Falls zusätzliche Stile benötigt werden, können sie hier hinzugefügt werden */
</style>
