<template>
  <BasePage
  imageSrc="/images/mood/haus-hamburg-leer-pferd.webp"
  imageAlt="Zahlung erfolgreich"
    titleAbove="Vielen Dank"
    titleMain="Zahlung erfolgreich"
    subtitle="Ihre Bestellung wurde erfolgreich verarbeitet."
    heading="Erfolg!"
    flowText="Ihre Zahlung wurde bestätigt. Eine Bestätigungs-E-Mail wurde an Sie gesendet. Vielen Dank für Ihren Einkauf!"
    parallaxImageSrc="/images/mood/haus-hamburg-leer-pferd.webp"
  >
    <div class="success-container">
      <p>Vielen Dank für Ihre Bestellung!</p>
      <router-link to="/">Zurück zur Startseite</router-link>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "CheckoutSuccess",
  components: { BasePage },
};
</script>

<style scoped>
.success-container {
  text-align: center;
  padding: 2rem;
}
</style>
