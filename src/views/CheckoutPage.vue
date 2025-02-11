<template>
  <BasePage
    :key="$route.fullPath"
    imageSrc="/images/food/haus_hamburg_leer_013.webp"
    imageAlt="Checkout - Haus Hamburg"
    titleAbove="Checkout"
    titleMain="Bestellung"
    subtitle="Überprüfen Sie Ihre Bestellung"
    heading="Zur Kasse"
    flowText="Bitte überprüfen Sie Ihre Bestellung und bezahlen Sie online."
    parallaxImageSrc="/images/food/haus_hamburg_leer_021.webp"
    parallaxImageAlt="Checkout Hintergrund"
  >
    <div class="checkout-container">
      <div class="order-summary">
        <h2>Ihre Bestellung</h2>
        <ul>
          <li v-for="item in cart" :key="item.id">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>{{ (item.price * item.quantity).toFixed(2) }} €</span>
          </li>
        </ul>
        <p>Gesamtbetrag: <strong>{{ total.toFixed(2) }} €</strong></p>
      </div>
      <button class="cta-button" @click="handlePayment">
        Jetzt bezahlen
      </button>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

// Hier sollte der Warenkorb idealerweise aus einem globalen Zustand (z. B. Vuex/Pinia) geladen werden.
// Für dieses Beispiel simulieren wir einen lokalen Zustand.
export default {
  name: "CheckoutPage",
  components: { BasePage },
  data() {
    return {
      // Beispielhafter Warenkorb; in einer echten Anwendung kommt dieser zentral
      cart: [
        { id: "f1", name: "Nordsee Scholle – filetiert", price: 20.90, quantity: 2 },
        { id: "m1", name: "Grünkohl mit 2 Kohlwürsten", price: 19.80, quantity: 1 },
      ],
    };
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    async handlePayment() {
      // Hier integrierst Du Deinen Zahlungsanbieter (z. B. Stripe)
      // Beispiel: Ein API-Endpunkt erstellt eine Stripe Checkout Session und leitet den Kunden weiter
      try {
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: this.cart }),
        });
        const session = await response.json();
        const stripe = Stripe("DEIN_PUBLIC_STRIPE_API_KEY");
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) {
          console.error("Stripe Checkout Fehler:", error);
        }
      } catch (error) {
        console.error("Zahlungsfehler:", error);
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
      }
    },
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: left;
}
.order-summary {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.order-summary h2 {
  margin-top: 0;
}
.order-summary ul {
  list-style: none;
  padding: 0;
}
.order-summary li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
</style>
