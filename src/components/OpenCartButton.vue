<template>
  <div>
    <button class="open-cart-btn" @click="toggleCart">
      <i class="fas fa-shopping-cart fa-3x"></i>
      <span v-if="itemsCount > 0" class="cart-badge">{{ itemsCount }}</span>
    </button>
    <CartOverlay :visible="cartVisible" @close="cartVisible = false" />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useCartStore } from "@/stores/cart";
import CartOverlay from "@/components/CartOverlay.vue";

export default {
  name: "OpenCartButton",
  components: { CartOverlay },
  setup() {
    const cartStore = useCartStore();
    const cartVisible = ref(false);

    const itemsCount = computed(() =>
      cartStore.items.reduce((acc, item) => acc + item.quantity, 0)
    );

    const toggleCart = () => {
      cartVisible.value = !cartVisible.value;
    };

    onMounted(() => {
      window.addEventListener('cart-item-added', () => {
        cartVisible.value = true;
      });
    });

    onUnmounted(() => {
      window.removeEventListener('cart-item-added');
    });

    return {
      itemsCount,
      cartVisible,
      toggleCart
    };
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
</style>
