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

    // Funktion, um die E-Mail zu versenden, falls noch nicht geschehen
    const sendConfirmationEmail = async (sessionId) => {
      // Prüfe, ob für diese Session bereits die E-Mail versendet wurde
      if (localStorage.getItem(`emailSent-${sessionId}`)) {
        console.log("E-Mail wurde bereits versendet.");
        emailStatus.value = "Email bereits versendet.";
        return;
      }

      try {
        // API-Aufruf an Deinen Endpoint, der die E-Mail versendet.
        // Hier nehmen wir an, dass Du die Session-Daten (z.B. sessionId) übergibst.
        const res = await fetch("/api/sendCheckoutEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Übergebe hier alle nötigen Daten, die der Endpoint erwartet.
          // Du kannst z.B. sessionId, Kundendaten, Warenkorb, etc. übergeben.
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem(`emailSent-${sessionId}`, "true");
          emailStatus.value = "Email wurde versendet.";
          console.log("E-Mail erfolgreich versendet.");
        } else {
          emailStatus.value = "Email-Versand fehlgeschlagen.";
          console.error("Fehler beim E-Mail Versand:", data.error);
        }
      } catch (error) {
        emailStatus.value = "Ein Fehler ist aufgetreten.";
        console.error("Fehler beim E-Mail Versand:", error);
      }
    };

    onMounted(() => {
      // Leere den Warenkorb beim Laden der Success-Seite
      cartStore.clearCart();

      // Hole die session_id aus der URL, wenn vorhanden
      const sessionId = route.query.session_id;
      if (sessionId) {
        sendConfirmationEmail(sessionId);
      } else {
        console.warn("Keine Session ID gefunden – E-Mail wird nicht versendet.");
      }
    });

    return {
      emailStatus,
    };
  },
};
</script>

<style scoped>
.checkout-success {
  position: relative;
  min-height: 100vh;
  background: url('/images/mood/haus-hamburg-leer-pferd.webp') no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkout-success::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.success-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--blue, #03305d);
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  margin: 0 1rem;
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
  display: inline-block;
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
