<template>
  <BasePage
    imageSrc="/images/outside/haus_hamburg_leer_046.webp"
    imageAlt="Haus Hamburg Kontakt"
    titleAbove="Kontakt"
    titleMain="Reservierung"
    subtitle="Wo Sie uns berieken können."
    heading="Erreiche uns"
    flowText="Wir freuen uns, dich bei uns begrüßen zu dürfen! Egal, ob du Fragen hast, eine Reservierung vornehmen möchtest oder besondere Wünsche hast – wir sind immer für dich da. Kontaktiere uns gerne telefonisch oder per E-Mail, um uns deine Anliegen mitzuteilen. Unser Team setzt alles daran, dir einen unvergesslichen Aufenthalt in einer einladenden und entspannten Atmosphäre zu bieten. Wir sind gespannt auf deine Nachricht!"
    parallaxImageSrc="/images/restaurant/haus_hamburg_leer_008.webp"
    parallaxImageAlt="Kontakt Parallax Bildbeschreibung"
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
