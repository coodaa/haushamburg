<template>
  <div>
    <button class="open-cart-btn" @click="showCart = true">
      <i class="fas fa-shopping-cart fa-3x"></i>
      <span v-if="itemsCount > 0" class="cart-badge">{{ itemsCount }}</span>
    </button>
    <CartOverlay :visible="showCart" @close="showCart = false" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import CartOverlay from "@/components/CartOverlay.vue";

export default {
  name: "OpenCartButton",
  components: { CartOverlay },
  setup() {
    const showCart = ref(false);
    const cartStore = useCartStore();
    const itemsCount = computed(() =>
      cartStore.items.reduce((acc, item) => acc + item.quantity, 0)
    );
    return { showCart, itemsCount };
  }
};
</script>

<style scoped>
.open-cart-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--blue);
  color: #fff;
  border: 3px solid var(--background);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  font-size: 0.7em;
}
.open-cart-btn i {
  font-size: 3rem !important;
}
.cart-badge {
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;
  background-color: red;
  color: #fff;
  font-size: 1rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1200px) {
  .open-cart-btn {
    right: 2rem;
  }
}
</style>
