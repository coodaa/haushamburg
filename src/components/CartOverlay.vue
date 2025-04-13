<template>
  <!-- Vollflächiger Wrapper, der Klicks außerhalb des Warenkorbs erkennt -->
  <div class="cart-overlay-wrapper" v-if="visible" @click="handleOverlayClick">
    <!-- Warenkorb-Bereich, Klicks hier sollen nicht weitergereicht werden -->
    <div class="cart-overlay" :style="{ top: overlayTop }" @click.stop>
      <div class="cart-overlay-content">
        <header>
          <h2>Warenkorb</h2>
          <button class="close-btn" @click="$emit('close')">&times;</button>
        </header>
        <!-- Scrollbarer Bereich für die Bestellübersicht -->
        <div class="order-summary">
          <div v-if="cartItems.length === 0" class="empty-cart">
            Dein Warenkorb ist leer.
            <!-- Großer Shop-Button unter dem leeren Warenkorb -->
            <router-link to="/shop" class="shop-link">
              <button class="cta-button btn-shop">
                <i class="fas fa-fish"></i>
                <span class="cta-text">Zum Shop</span>
              </button>
            </router-link>
          </div>
          <div v-else class="cart-items">
            <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
              <img :src="item.product.image" :alt="item.product.name" />
              <div class="item-details">
                <h3 class="item-name" :title="item.product.name">
                  {{ item.product.name }}
                </h3>
                <div class="item-controls">
                  <div class="action-controls">
                    <div class="quantity-control">
                      <button @click="decreaseQty(item)">-</button>
                      <span>{{ item.quantity }}</span>
                      <button @click="increaseQty(item)">+</button>
                    </div>
                    <button class="remove-btn" @click="removeItem(item)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                  <p class="item-total">
                    {{ formatPrice(item.product.price * item.quantity) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Footer-Bereich fixiert am unteren Rand -->
        <footer v-if="cartItems.length > 0">
          <div class="summary">
            <div class="summary-item">
              <span>Gesamt:</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>
            <div class="summary-item">
              <span>Rabatt (10%):</span>
              <span>- {{ formatPrice(discountValue) }}</span>
            </div>
            <div class="summary-item total-final">
              <span>Zu zahlen:</span>
              <span>{{ formatPrice(discountedTotalPrice) }}</span>
            </div>
          </div>
          <button class="checkout-btn" @click="checkout">Zur Kasse</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from "vue";
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
  setup(props, { emit }) {
    const cartStore = useCartStore();
    const router = useRouter();

    const cartItems = computed(() => cartStore.items);
    const totalPrice = computed(() =>
      cartStore.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      )
    );
    const discountedTotalPrice = computed(() => totalPrice.value * 0.9);
    const discountValue = computed(
      () => totalPrice.value - discountedTotalPrice.value
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
    const formatPrice = (val) =>
      val.toFixed(2).replace(".", ",") + " €";

    // Schließt das Overlay und navigiert zur Checkout-Seite
    const checkout = () => {
      emit("close"); // Overlay ausblenden
      router.push("/checkout");
    };

    // Handler, der das Overlay schließt, wenn außerhalb geklickt wird
    const handleOverlayClick = () => {
      emit("close");
    };

    // Lokale Ref zum Einlesen der aktuellen Navbar-Höhe
    const navbarHeight = ref(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--navbar-height")
        .trim() || "70px"
    );

    const updateLocalNavbarHeight = () => {
      navbarHeight.value =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--navbar-height")
          .trim() || "70px";
    };

    onMounted(() => {
      window.addEventListener("resize", updateLocalNavbarHeight);
      window.addEventListener("scroll", updateLocalNavbarHeight);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", updateLocalNavbarHeight);
      window.removeEventListener("scroll", updateLocalNavbarHeight);
    });

    // Berechne den top-Wert des Overlays dynamisch
    const overlayTop = computed(() => `calc(${navbarHeight.value} - 2em)`);

    return {
      cartItems,
      totalPrice,
      discountedTotalPrice,
      discountValue,
      increaseQty,
      decreaseQty,
      removeItem,
      formatPrice,
      checkout,
      overlayTop,
      handleOverlayClick,
    };
  },
};
</script>

<style scoped>
.cart-overlay-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  background: rgba(0, 0, 0, 0.3);
}

.cart-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.cart-overlay-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;
  margin-bottom: 1em;
}

header h2 {
  font-size: 1.8rem;
  color: #004a7f;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  color: #900;
}

.order-summary {
  flex: 1;
  overflow-y: auto;
  background: var(--background);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.empty-cart {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  padding: 1rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  padding: 0.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 0.75rem;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #004a7f;
  margin: 0 0 0.5rem;
  min-height: 2.4rem;
  line-height: 1.2;
  overflow: hidden;
}

.item-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-controls {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-control button {
  width: 1.8rem;
  height: 1.8rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 50%;
  background-color: var(--blue, #004a7f);
  color: #fff;
  cursor: pointer;
}

.quantity-control span {
  display: inline-block;
  width: 0.9rem;
  text-align: center;
}

.item-total {
  font-size: 1rem;
  font-weight: bold;
  color: #004a7f;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #900;
  font-size: 1.2em;
}

.remove-btn i {
  font-size: 1rem;
}

footer {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #666;
}

.total-final {
  font-weight: bold;
  font-size: 1.2rem;
  color: #004a7f;
}

.checkout-btn {
  background-color: var(--blue, #004a7f);
  color: #fff;
  border: none;
  padding: 0.8rem;
  font-size: 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.checkout-btn:hover {
  background-color: var(--gold, #f1c40f);
  color: var(--blue);
}

/* Styling für den Shop-Link als Button */
.shop-link {
  display: block;
  margin-top: 1rem;
  text-align: center;
}
.shop-link .cta-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  font-size: 1.8rem;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  background-color: var(--gold, #f1c40f);
  color: var(--blue, #004a7f);
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.shop-link .cta-button:hover {
  background-color: #ffd700;
  transform: scale(1.03);
}
.shop-link .cta-button i {
  margin-right: 0.5rem;
}

/* Responsive Anpassungen */
@media (min-width: 1200px) {
  .cart-overlay {
    top: 7em !important;
  }
  header {
    margin-top: 3em;
    margin-bottom: 2em;
  }
}
</style>
