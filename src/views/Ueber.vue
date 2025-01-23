<template>
  <div>
    <BasePage
    imageSrc="/public/images/haus_hamburg_leer_048.webp"
      imageAlt="Über uns"
      titleAbove="Über Haus Hamburg"
      titleMain="Über uns"
    >
      <p>Erfahre mehr über unser Haus und unser Team.</p>
      <!-- Weitere Inhalte hier -->
    </BasePage>
  </div>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Ueber",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
/* Optional: Zusätzliche Styles */
</style>
