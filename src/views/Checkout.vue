<template>
  <div class="checkout">
    <h1 class="title-base">Warenkorb</h1>
    <div v-if="cart.length === 0" class="empty-cart">
      Dein Warenkorb ist leer.
    </div>
    <div v-else>
      <div v-for="(item, index) in cart" :key="index" class="cart-item">
        <img :src="item.image" :alt="item.name" class="cart-image" />
        <div class="cart-info">
          <h2 class="big-title-3">{{ item.name }}</h2>
          <p class="price">{{ item.price.toFixed(2) }} €</p>
          <button class="cta-button" @click="removeFromCart(index)">🗑 Entfernen</button>
        </div>
      </div>
      <h2 class="total-price">Gesamt: {{ total.toFixed(2) }} €</h2>
      <button class="cta-button checkout-button" @click="startCheckout">
        <i class="fas fa-credit-card"></i> Jetzt bezahlen
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { createCheckoutSession } from "/firebase/stripe";


export default {
  setup() {
    const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

    const total = computed(() =>
      cart.value.reduce((sum, item) => sum + item.price, 0)
    );

    const removeFromCart = (index) => {
      cart.value.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart.value));
    };

    const startCheckout = async () => {
      const sessionId = await createCheckoutSession(cart.value);
      if (sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      }
    };

    return { cart, total, removeFromCart, startCheckout };
  },
};
</script>

<style scoped>
.checkout {
  text-align: center;
  padding: 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.cart-image {
  width: 80px;
  border-radius: 10px;
}

.cart-info {
  flex: 1;
  padding: 0 1rem;
}

.total-price {
  font-size: 1.5rem;
  color: var(--gold);
  margin: 1rem 0;
}

.checkout-button {
  background-color: var(--blue);
  color: #fff;
}
</style>
