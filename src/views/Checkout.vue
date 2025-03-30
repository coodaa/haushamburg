<template>
  <BasePage
    imageSrc="/images/mood/haus-hamburg-leer-pferd.webp"
    imageAlt="Checkout"
    titleAbove="Checkout"
    titleMain="Bezahlen"
    subtitle="Überprüfen Sie Ihre Bestellung und wählen Sie PayPal als Zahlungsmethode."
    heading="Checkout"
    flowText="Bitte überprüfen Sie Ihre Bestellung, füllen Sie Ihre Adressdaten aus und wählen Sie PayPal als Zahlungsmethode."
    parallaxImageSrc="/images/mood/haus-hamburg-leer-pferd.webp"
  >
    <div class="checkout-container">
      <h2 class="section-title">Ihre Bestellung</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">
        Ihr Warenkorb ist leer.
      </div>
      <div v-else class="cart-summary">
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <img :src="item.product.image" :alt="item.product.name" class="item-image" />
          <div class="item-details">
            <h3 class="item-name">{{ item.product.name }}</h3>
            <p class="item-qty">
              {{ item.quantity }} x {{ formatPrice(item.product.price) }}
            </p>
          </div>
          <p class="item-total">
            {{ formatPrice(item.product.price * item.quantity) }}
          </p>
        </div>
      </div>

      <!-- Adressformular inkl. Bemerkungen -->
      <div class="address-form catering-form">
        <h2 class="section-title">Rechnungs- & Lieferadresse</h2>
        <form id="address-form" @submit.prevent>
          <!-- Vorname & Nachname nebeneinander -->
          <div class="form-row double">
            <div class="input-group">
              <label for="firstName">Vorname</label>
              <input id="firstName" v-model="address.firstName" type="text" required />
            </div>
            <div class="input-group">
              <label for="lastName">Nachname</label>
              <input id="lastName" v-model="address.lastName" type="text" required />
            </div>
          </div>
          <!-- E-Mail in voller Breite -->
          <div class="form-row">
            <label for="email">E-Mail</label>
            <input id="email" v-model="address.email" type="email" required />
          </div>
          <!-- Straße in voller Breite -->
          <div class="form-row">
            <label for="street">Straße & Nr.</label>
            <input id="street" v-model="address.street" type="text" required />
          </div>
          <!-- PLZ & Stadt nebeneinander -->
          <div class="form-row double">
            <div class="input-group">
              <label for="postalCode">PLZ</label>
              <input id="postalCode" v-model="address.postalCode" type="text" required />
            </div>
            <div class="input-group">
              <label for="city">Stadt</label>
              <input id="city" v-model="address.city" type="text" required />
            </div>
          </div>
          <!-- Land & Telefonnummer nebeneinander -->
          <div class="form-row double">
            <div class="input-group">
              <label for="country">Land</label>
              <select id="country" v-model="address.country" required>
                <option disabled value="">Bitte auswählen</option>
                <option value="DE">Deutschland</option>
              </select>
            </div>
            <div class="input-group">
              <label for="phone">Telefonnummer</label>
              <input id="phone" v-model="address.phone" type="tel" required />
            </div>
          </div>
          <!-- Neues Feld: Bemerkungen -->
          <div class="form-row">
            <div class="input-group">
              <label for="remarks">Bemerkungen (z.B. Allergien, besondere Wünsche)</label>
              <textarea id="remarks" v-model="remarks" rows="3" placeholder="Optional"></textarea>
            </div>
          </div>
        </form>
      </div>

      <!-- PayPal Button -->
      <div class="paypal-section">
        <h2 class="section-title">Zahlung mit PayPal</h2>
        <div id="paypal-button-container" class="paypal-button-container"></div>
      </div>

      <div v-if="message" class="payment-message">{{ message }}</div>

      <div class="checkout-summary">
        <p class="total-label">Gesamtsumme:</p>
        <p class="total-amount"><strong>{{ formatPrice(totalPrice) }}</strong></p>
      </div>
    </div>
  </BasePage>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import BasePage from "@/components/BasePage.vue";
import { useCartStore } from "@/stores/cart";

export default {
  name: "Checkout",
  components: { BasePage },
  setup() {
    const cartStore = useCartStore();
    const cartItems = computed(() => cartStore.items);
    const totalPrice = computed(() =>
      cartStore.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    );
    const formatPrice = (val) => val.toFixed(2).replace(".", ",") + " €";

    // Adressdaten
    const address = ref({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      postalCode: "",
      city: "",
      country: "DE",
      phone: "",
    });
    // Neues Feld für Bemerkungen
    const remarks = ref("");
    const message = ref("");

    onMounted(async () => {
      // PayPal Button initialisieren – ohne den fundingSource Parameter!
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: async (data, actions) => {
            const orderRes = await fetch("/api/create-paypal-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: cartStore.items,
                total: totalPrice.value,
                address: address.value,
              }),
            });
            const orderData = await orderRes.json();
            if (orderData.error) {
              message.value = orderData.error;
              throw new Error(orderData.error);
            }
            return orderData.id;
          },
          onApprove: async (data, actions) => {
            const capture = await actions.order.capture();
            console.log("PayPal Capture:", capture);

            // E-Mail-Versand auslösen inkl. Bemerkungen
            await fetch("/api/sendCheckoutEmail", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                address: address.value,
                items: cartItems.value,
                total: parseFloat(totalPrice.value),
                remarks: remarks.value,
              }),
            });

            cartStore.clearCart();
            window.location.href = "/checkout-success";
          },
          onError: (err) => {
            message.value = "PayPal Fehler: " + err;
            console.error("PayPal Fehler:", err);
          },
        }).render("#paypal-button-container");
      } else {
        console.error("PayPal SDK wurde nicht geladen.");
      }
    });

    return {
      cartItems,
      totalPrice,
      formatPrice,
      address,
      remarks,
      message,
    };
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: var(--blue);
}

.cart-summary {
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
}

.item-details {
  flex: 1;
}

.item-name {
  margin: 0;
  font-size: 1.1rem;
  color: var(--blue);
}

.item-qty {
  margin: 0.3rem 0 0;
  font-size: 0.9rem;
  color: #666;
}

.item-total {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--blue);
}

.address-form.catering-form {
  max-width: 48em;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-row {
  margin-bottom: 1.5rem;
}

.form-row:not(.double) {
  display: block;
}

.form-row.double {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.form-row label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--blue);
}

.form-row input,
.form-row select,
.form-row textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 1rem;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-row input:focus,
.form-row select:focus,
.form-row textarea:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 5px rgba(3, 48, 93, 0.3);
}

@media (min-width: 768px) {
  .form-row.double {
    grid-template-columns: repeat(2, 1fr);
  }
}

.paypal-button-container,
.paypal-section {
  margin-top: 1rem;
}

.checkout-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
}

.total-label {
  font-size: 1.2rem;
  color: #666;
}

.total-amount {
  font-size: 1.5rem;
  color: var(--blue);
}

.payment-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
