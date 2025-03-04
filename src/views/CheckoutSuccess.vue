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
import { onMounted } from "vue";
import { useCartStore } from "@/stores/cart";

export default {
  name: "CheckoutSuccess",
  setup() {
    const cartStore = useCartStore();
    onMounted(() => {
      // Warenkorb leeren, wenn die Erfolgseite geladen wird
      cartStore.clearCart();
    });
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
