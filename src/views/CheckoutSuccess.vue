<template>
  <div class="checkout-success">
    <div class="success-content">
      <i class="fas fa-check-circle success-icon"></i>
      <h1>Zahlung erfolgreich!</h1>
      <p>
        Vielen Dank für Ihre Bestellung. Ihre Zahlung wurde bestätigt und eine
        Bestätigungs‑E‑Mail wurde an Sie gesendet.
      </p>
      <router-link to="/shop" class="btn btn-primary">Zum Shop</router-link>
      <p v-if="emailStatus">{{ emailStatus }}</p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRoute } from "vue-router";

export default {
  name: "CheckoutSuccess",
  setup() {
    const cartStore = useCartStore();
    const route = useRoute();
    const emailStatus = ref("");

    const sendConfirmationEmail = async (sessionId) => {
      // Prüfe, ob E-Mail bereits versendet wurde
      if (localStorage.getItem(`emailSent-${sessionId}`)) {
        emailStatus.value = "E-Mail wurde bereits versendet.";
        return;
      }

      try {
        const res = await fetch("/api/sendCheckoutEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Hier musst Du sicherstellen, dass der Endpoint alle nötigen Daten erwartet.
          // Falls der sendCheckoutEmail-Endpoint Daten per Session-ID erwartet,
          // müsstest Du diese vorher über Stripe abrufen. Alternativ sendest Du direkt
          // die entsprechenden Daten (Adresse, Warenkorb, etc.), sofern diese verfügbar sind.
          body: JSON.stringify({ sessionId })
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem(`emailSent-${sessionId}`, "true");
          emailStatus.value = "E-Mail wurde versendet.";
        } else {
          emailStatus.value = "E-Mail-Versand fehlgeschlagen.";
        }
      } catch (error) {
        emailStatus.value = "Ein Fehler ist aufgetreten.";
      }
    };

    onMounted(() => {
      cartStore.clearCart();
      // Lese session_id aus der URL, die z. B. in Stripe-Checkout weitergegeben wurde
      const sessionId = route.query.session_id;
      if (sessionId) {
        sendConfirmationEmail(sessionId);
      } else {
        console.warn("Keine Session ID gefunden – E-Mail wird nicht versendet.");
      }
    });

    return { emailStatus };
  },
};
</script>

<style scoped>
/* Dein CSS bleibt unverändert */
.checkout-success {
  position: relative;
  min-height: 100vh;
  background: url('/images/mood/haus-hamburg-leer-pferd.webp') no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.success-content {
  position: relative;
  text-align: center;
  color: var(--blue, #03305d);
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.success-icon {
  font-size: 5rem;
  color: var(--green, #4caf50);
  margin-bottom: 1rem;
}
.btn {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  margin-top: 1.5rem;
}
.btn-primary {
  background-color: var(--blue, #03305d);
  color: #fff;
}
.btn-primary:hover {
  background-color: var(--gold, #ffc107);
  color: var(--blue, #03305d);
}
</style>
