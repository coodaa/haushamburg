<template>
  <div class="cart-overlay" v-if="visible">
    <div class="cart-overlay-content">
      <header>
        <h2>Warenkorb</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </header>
      <div class="order-summary">
        <div v-if="cartItems.length === 0" class="empty-cart">
          Dein Warenkorb ist leer.
        </div>
        <div v-else class="cart-items">
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <img :src="item.product.image" :alt="item.product.name" />
            <div class="item-details">
              <!-- Titel mit fester Mindesthöhe für 2 Zeilen -->
              <h3 class="item-name" :title="item.product.name">
                {{ item.product.name }}
              </h3>
              <!-- Untere Zeile: Aktionen (Plus/Minus + Mülleimer) und Preis -->
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
      <!-- Footer nur anzeigen, wenn Artikel im Warenkorb sind -->
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
      cartStore.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      )
    );
    // Rabattierter Gesamtpreis (10% Rabatt)
    const discountedTotalPrice = computed(() => totalPrice.value * 0.9);
    // Rabattbetrag in Euro
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

    const checkout = () => {
      router.push("/checkout");
    };

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

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
}

header h2 {
  font-size: 1.8rem;
  color: #004a7f;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #900;
}

/* Bestellübersicht */
.order-summary {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.empty-cart {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
}

/* Artikel-Liste */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

/* Details: Titel und Controls */
.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Titel mit fester Mindesthöhe für 2 Zeilen */
.item-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #004a7f;
  margin: 0 0 0.5rem;
  min-height: 2.4rem;
  line-height: 1.2;
  overflow: hidden;
}

/* Untere Zeile: Aktionen (Plus/Minus, Mülleimer) und Preis */
.item-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-controls {
  display: flex;
  align-items: center;
  gap: 2rem; /* Mehr Abstand zwischen Mengensteuerung und Löschen */
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
  font-size: 1rem;
}

.item-total {
  font-size: 1rem;
  font-weight: bold;
  color: #004a7f;
}

/* Entfernen-Button */
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

/* Zusammenfassung der Preise */
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

/* Footer und Checkout-Button */
footer {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.checkout-btn {
  background-color: var(--blue, #004a7f);
  color: #fff;
  border: none;
  padding: 0.8rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.checkout-btn:hover {
  background-color: var(--gold, #f1c40f);
}
</style>
