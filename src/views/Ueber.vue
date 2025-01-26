<template>
  <BasePage
    imageSrc="/images/1.jpg"
    imageAlt="Haus Hamburg Geschichte"
    titleAbove="Über uns"
    titleMain="Geschichte"
    subtitle="Erfahren Sie mehr über Haus Hamburg"
    heading="Unsere Geschichte"
    flowText=" Haus Hamburg wurde im Jahr 1920 gegründet und hat sich seitdem zu einem
      Wahrzeichen in Leer, Ostfriesland, entwickelt. Ursprünglich als kleines
      Familienbetriebshaus konzipiert, hat es sich im Laufe der Jahrzehnte zu einem
      beliebten Treffpunkt für Einheimische und Besucher gleichermaßen entwickelt."
    parallaxImageSrc="/images/1.jpg"
  >
    <p>
      Haus Hamburg** wurde im Jahr 1920 gegründet und hat sich seitdem zu einem
      Wahrzeichen in Leer, Ostfriesland, entwickelt. Ursprünglich als kleines
      Familienbetriebshaus konzipiert, hat es sich im Laufe der Jahrzehnte zu einem
      beliebten Treffpunkt für Einheimische und Besucher gleichermaßen entwickelt.
    </p>
    <p>
      Die Gründer, die Familie Müller, hatten die Vision, einen Ort zu schaffen, an
      dem sich Menschen treffen, austauschen und entspannen können. Mit viel
      Leidenschaft und harter Arbeit wuchs Haus Hamburg schnell und erweiterte sein
      Angebot um gemütliche Zimmer, einladende Restaurants und vielfältige
      Veranstaltungsmöglichkeiten.
    </p>
    <p>
      In den 1960er Jahren wurde Haus Hamburg von der Familie Schmidt übernommen,
      die das Erbe der Müllers fortsetzte und neue Ideen einbrachte. Sie modernisierten
      das Gebäude, behielten jedoch den charmanten und traditionellen Charakter bei, der
      Haus Hamburg so einzigartig macht.
    </p>
    <p>
      Heute, über 100 Jahre nach seiner Gründung, ist Haus Hamburg ein Symbol für
      Beständigkeit und Gastfreundschaft. Unser engagiertes Team setzt alles daran,
      unseren Gästen ein unvergessliches Erlebnis zu bieten, sei es bei einem
      gemütlichen Abendessen, einer Geschäftsveranstaltung oder einem entspannten
      Aufenthalt in unseren komfortablen Zimmern.
    </p>
    <p>
      Wir sind stolz auf unsere Geschichte und freuen uns darauf, auch in Zukunft
      neue Kapitel hinzuzufügen. Vielen Dank, dass Sie Teil unserer Reise sind!
    </p>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Über",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
/* Zusätzliche Stile können hier hinzugefügt werden, falls erforderlich */
.second-section {
  background-color: #ffffff;
}

.thrid-section {
  /* Übernehmen Sie bei Bedarf die Stile aus der Kontaktseite oder passen Sie sie an */
}
</style>
