<template>
  <div>
      <BasePage
    imageSrc="/images/haus_hamburg_leer_048.webp"
    imageAlt="Catering"
    titleAbove="Catering"
    titleMain="Catering"
    subtitle="Hat hier einer Catering gesagt?"
  >
      <p>Wir bieten folgende Catering an:</p>
      <!-- Weitere Inhalte hier -->
    </BasePage>
  </div>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Catering",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
/* Optional: Zusätzliche Styles */
</style>
