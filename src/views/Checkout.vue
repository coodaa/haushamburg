<template>
  <BasePage
    imageSrc="/images/mood/haus-hamburg-leer-pferd.webp"
    imageAlt="Checkout"
    titleAbove="Checkout"
    titleMain="Bezahlen"
    subtitle="Überprüfen Sie Ihre Bestellung und wählen Sie Ihre Zahlungsmethode"
    heading="Checkout"
    flowText="Bitte überprüfen Sie Ihre Bestellung, füllen Sie Ihre Adressdaten aus und wählen Sie zwischen Stripe‑Zahlung oder PayPal."
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
            <p class="item-qty">{{ item.quantity }} x {{ formatPrice(item.product.price) }}</p>
          </div>
          <p class="item-total">{{ formatPrice(item.product.price * item.quantity) }}</p>
        </div>
      </div>

      <!-- Adressformular -->
      <div class="address-form">
        <h2 class="section-title">Rechnungs- & Lieferadresse</h2>
        <form id="address-form" @submit.prevent>
          <div class="form-row">
            <label for="name">Name</label>
            <input id="name" v-model="address.name" type="text" required />
          </div>
          <div class="form-row">
            <label for="street">Straße & Nr.</label>
            <input id="street" v-model="address.street" type="text" required />
          </div>
          <div class="form-row">
            <label for="postalCode">PLZ</label>
            <input id="postalCode" v-model="address.postalCode" type="text" required />
          </div>
          <div class="form-row">
            <label for="city">Stadt</label>
            <input id="city" v-model="address.city" type="text" required />
          </div>
          <div class="form-row">
            <label for="country">Land</label>
            <input id="country" v-model="address.country" type="text" required />
          </div>
          <div class="form-row">
            <label for="phone">Telefonnummer</label>
            <input id="phone" v-model="address.phone" type="tel" required />
          </div>
        </form>
      </div>

      <!-- Stripe Payment Element -->
      <div class="payment-section">
        <h2 class="section-title">Zahlungsinformationen (Stripe)</h2>
        <div id="payment-element" class="payment-element"></div>
        <button class="checkout-btn" @click="handleStripePayment">
          Mit Stripe bezahlen
        </button>
        <p class="info-note">
          Hinweis: Wallet-Optionen (Apple Pay, Google Pay etc.) erscheinen nur in einer Live‑Umgebung über HTTPS auf verifizierten Domains.
        </p>
      </div>

      <!-- Oder Option: PayPal -->
      <div class="paypal-section">
        <h2 class="section-title">Oder mit PayPal</h2>
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
import { loadStripe } from "@stripe/stripe-js";
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
    const formatPrice = (val) =>
      val.toFixed(2).replace(".", ",") + " €";

    // Adresse
    const address = ref({
      name: "",
      street: "",
      postalCode: "",
      city: "",
      country: "",
      phone: "",
    });

    const message = ref("");

    // Stripe Payment Element Setup
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    let stripe, elements, paymentElement;
    const clientSecret = ref("");

    onMounted(async () => {
      // Erstelle Payment Intent via Backend
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartStore.items,
          address: address.value,
        }),
      });
      const data = await res.json();
      if (data.error) {
        message.value = data.error;
        return;
      }
      clientSecret.value = data.clientSecret;

      stripe = await stripePromise;
      const appearance = { theme: "flat" };
      elements = stripe.elements({ appearance, clientSecret: clientSecret.value });
      paymentElement = elements.create("payment");
      paymentElement.mount("#payment-element");

      // PayPal Button initialisieren
      if (window.paypal) {
        window.paypal.Buttons({
          fundingSource: window.paypal.FUNDING.PAYPAL, // Erzwingt reine PayPal-Zahlung
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

    // Wichtig: Übergib hier auch die Elemente-Instanz an confirmPayment!
    const handleStripePayment = async () => {
      message.value = "";
      const { error } = await stripe.confirmPayment({
        elements, // Hier wird das PaymentElement übergeben!
        confirmParams: {
          return_url: window.location.origin + "/checkout-success",
        },
      });
      if (error) {
        message.value = error.message;
        console.error("Stripe Confirm Payment Error:", error);
      }
    };

    return {
      cartItems,
      totalPrice,
      formatPrice,
      address,
      message,
      handleStripePayment,
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

.address-form {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #ddd;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-row label {
  font-size: 1rem;
  margin-bottom: 0.3rem;
  color: var(--blue);
}

.form-row input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.payment-element,
.card-element,
.address-element {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
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

.checkout-btn {
  background-color: var(--blue);
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.checkout-btn:hover {
  background-color: var(--gold);
}

.info-note {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.payment-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
