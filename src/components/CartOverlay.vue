<template>
  <div class="cart-overlay" v-if="visible">
    <div class="cart-overlay-content">
      <header>
        <h2>Warenkorb</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </header>
      <div class="cart-items">
        <div v-if="cartItems.length === 0" class="empty-cart">
          Dein Warenkorb ist leer.
        </div>
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <img :src="item.product.image" :alt="item.product.name" />
          <div class="item-info">
            <h3>{{ item.product.name }}</h3>
            <p>{{ formatPrice(item.product.price) }}</p>
            <div class="quantity-control">
              <button @click="decreaseQty(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQty(item)">+</button>
            </div>
          </div>
          <button class="remove-btn" @click="removeItem(item)">&#10005;</button>
        </div>
      </div>
      <footer>
        <div class="total">
          Gesamt: {{ formatPrice(totalPrice) }}
        </div>
        <button class="checkout-btn" @click="checkout">Zur Kasse</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";

export default {
  name: "CartOverlay",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();

    const cartItems = computed(() => cartStore.items);
    const totalPrice = computed(() =>
      cartStore.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    );

    const increaseQty = (item) => {
      cartStore.updateQuantity(item.product, item.quantity + 1);
    };

    const decreaseQty = (item) => {
      if (item.quantity > 1) {
        cartStore.updateQuantity(item.product, item.quantity - 1);
      }
    };

    const removeItem = (item) => {
      cartStore.removeItem(item.product);
    };

    const formatPrice = (val) => val.toFixed(2).replace(".", ",") + " €";

    const checkout = () => {
      // Statt Stripe-Redirect: Navigiere zur eigenen Checkout-Seite
      router.push("/checkout");
    };

    return {
      cartItems,
      totalPrice,
      increaseQty,
      decreaseQty,
      removeItem,
      formatPrice,
      checkout,
    };
  },
};
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1500;
  overflow-y: auto;
  transition: transform 0.3s ease;
}

.cart-overlay-content {
  padding: 1.5rem;
}

.cart-overlay header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.cart-items {
  margin: 1rem 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
}

.item-info h3 {
  margin: 0;
  font-size: 1rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.5rem;
}

.quantity-control button {
  width: 1.8rem;
  height: 1.8rem;
  border: none;
  border-radius: 50%;
  background-color: var(--blue);
  color: #fff;
  cursor: pointer;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  margin-left: auto;
  cursor: pointer;
  color: #900;
}

footer {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
}

.checkout-btn {
  background-color: var(--blue);
  color: #fff;
  border: none;
  padding: 0.8rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: var(--gold);
}
</style>
