<template>
  <div>
    <BasePage
    imageSrc="/src/assets/images/haus_hamburg_leer_048.webp"
      imageAlt="Service"
      titleAbove="Unser Service"
      titleMain="Service"
    >
      <p>Wir bieten folgende Services an:</p>
      <!-- Weitere Inhalte hier -->
    </BasePage>
  </div>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Service",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
/* Optional: Zusätzliche Styles */
</style>
