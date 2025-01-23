<!-- Speisekarte.vue -->
<template>
  <BasePage
    imageSrc="/images/restaurant-interior.jpg"
    imageAlt="Restaurant Innenbereich"
    titleAbove="Speisekarte"
    titleMain="Haus Hamburg"
    subtitle="Unsere kulinarische Auswahl"
  >
    <p>Entdecke unsere leckeren Spezialitäten...</p>

    <!-- Du kannst beliebig viel Content einfügen -->
    <h3>Vorspeisen</h3>
    <ul>
      <li>Krabbensuppe - 8,90€</li>
      <li>Bruschetta - 6,50€</li>
      <!-- usw... -->
    </ul>

    <h3>Hauptgerichte</h3>
    <ul>
      <li>Kabeljaufilet mit Salzkartoffeln - 14,90€</li>
      <li>Grünkohl mit Pinkel - 12,50€</li>
      <!-- usw... -->
    </ul>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Speisekarte",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
/* Falls du hier nur seitenbezogene Stile brauchst */
</style>
