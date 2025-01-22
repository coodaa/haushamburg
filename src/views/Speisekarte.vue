<template>
  <div>
    <BasePage
      imageSrc="@/assets/speisekarte.webp" 
      imageAlt="Speisekarte"
      titleAbove="Unsere Speisen"
      titleMain="Speisekarte"
    >
      <p>Hier findest du unsere vielfältige Speisekarte.</p>
      <!-- Weitere Inhalte hier -->
    </BasePage>
  </div>
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
/* Optional: Zusätzliche Styles */
</style>
