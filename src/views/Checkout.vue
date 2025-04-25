<template>
  <BasePage
    imageSrc="/images/history/haus-hamburg-leer_checkout.jpg"
    imageAlt="Checkout"
    titleAbove="Checkout"
    titleMain="Bezahlen"
    subtitle="Überprüfen Sie Ihre Bestellung und wählen Sie Ihre bevorzugte Zahlungsart."
    heading="Checkout"
    flowText="Bitte überprüfen Sie Ihre Bestellung, füllen Sie Ihre Adress- und Lieferinformationen aus – inklusive Lieferdatum und Zeitfenster – und bezahlen Sie mit PayPal."
    parallaxImageSrc="/images/food/haus-hamburg-leer-21.webp"
  >
    <div class="checkout-container">
      <!-- Bestellübersicht -->
      <div class="order-summary">
        <h2 class="summary-title">Ihre Bestellung</h2>
        <div v-if="cartItems.length === 0" class="empty-cart">
          Ihr Warenkorb ist leer.
        </div>
        <div v-else class="cart-items">
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <img :src="item.product.image" :alt="item.product.name" />
            <div class="item-details">
              <h3 class="item-name">{{ item.product.name }}</h3>
              <p class="item-qty">{{ item.quantity }} x {{ formatPrice(item.product.price) }}</p>
            </div>
            <p class="item-total">{{ formatPrice(item.product.price * item.quantity) }}</p>
          </div>
          <div class="total-container small">
            <span class="total-label">Zwischensumme:</span>
            <span class="total-amount">{{ formatPrice(totalPrice) }}</span>
          </div>
          <div class="total-container small" v-if="totalPrice > 0">
            <span class="total-label">Rabatt (10%):</span>
            <span class="total-amount">- {{ formatPrice(discountValue) }}</span>
          </div>
          <!-- Versandkosten-Bereich -->
          <div class="shipping-container">
            <span class="shipping-text" v-if="shippingCost > 0">
              Liefergebühr: {{ formatPrice(shippingCost) }} <small>(ab 25 € versandkostenfrei)</small>
            </span>
            <span class="shipping-text" v-else>
              Versandkostenfrei!
            </span>
            <div v-if="shippingCost > 0" class="progress-bar-container">
              <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <div v-if="shippingCost > 0" class="progress-info">
              Noch {{ formatPrice(amountRemaining) }} fehlen für kostenlosen Versand.
            </div>
          </div>
          <div class="total-container final">
            <span class="total-label">Gesamtsumme:</span>
            <span class="total-amount">{{ formatPrice(finalTotal) }}</span>
          </div>
        </div>
      </div>

      <!-- Zurück zum Shop -->
      <div class="back-to-shop">
        <button class="cta-button shop-button" @click="goToShop">
          Zurück zum Shop
        </button>
      </div>

      <!-- Adress- und Lieferformular -->
      <div class="address-form catering-form">
        <h2 class="section-title">Rechnungs- & Lieferadresse</h2>
        <p class="form-hint">
          Felder, die mit <span class="required">*</span> gekennzeichnet sind, sind Pflichtfelder.
        </p>
        <form id="address-form" @submit.prevent>
          <!-- Vorname & Nachname -->
          <div class="form-row double">
            <div class="input-group">
              <label for="firstName">Vorname <span class="required">*</span></label>
              <input id="firstName" v-model="address.firstName" type="text" required :class="{ 'input-error': errors.firstName }" />
            </div>
            <div class="input-group">
              <label for="lastName">Nachname <span class="required">*</span></label>
              <input id="lastName" v-model="address.lastName" type="text" required :class="{ 'input-error': errors.lastName }" />
            </div>
          </div>
          <!-- E-Mail -->
          <div class="form-row">
            <label for="email">E-Mail <span class="required">*</span></label>
            <input id="email" v-model="address.email" type="email" required :class="{ 'input-error': errors.email }" />
          </div>
          <!-- Straße -->
          <div class="form-row">
            <label for="street">Straße & Nr. <span class="required">*</span></label>
            <input id="street" v-model="address.street" type="text" required :class="{ 'input-error': errors.street }" />
          </div>
          <!-- PLZ & Stadt -->
          <div class="form-row double">
            <div class="input-group">
              <label for="postalCode">PLZ <span class="required">*</span></label>
              <input id="postalCode" v-model="address.postalCode" type="text" required pattern="^\d+$" inputmode="numeric" title="Bitte nur Zahlen eingeben" :class="{ 'input-error': errors.postalCode }" />
            </div>
            <div class="input-group">
              <label for="city">Stadt <span class="required">*</span></label>
              <input id="city" v-model="address.city" type="text" required :class="{ 'input-error': errors.city }" />
            </div>
          </div>
          <!-- Land & Telefonnummer -->
          <div class="form-row double">
            <div class="input-group">
              <label for="country">Land <span class="required">*</span></label>
              <select id="country" v-model="address.country" required :class="{ 'input-error': errors.country }">
                <option disabled value="">Bitte auswählen</option>
                <option value="DE">Deutschland</option>
              </select>
            </div>
            <div class="input-group">
              <label for="phone">Telefon <span class="required">*</span></label>
              <input id="phone" v-model="address.phone" type="tel" required pattern="^\d+$" inputmode="numeric" title="Bitte nur Zahlen eingeben" :class="{ 'input-error': errors.phone }" />
            </div>
          </div>
          <!-- Lieferdatum und Lieferzeitfenster -->
          <div class="delivery-options">
            <div class="form-row">
              <div class="input-group">
                <label for="deliveryDate">Lieferdatum <span class="required">*</span></label>
                <input type="text" id="deliveryDate" ref="deliveryDateInput" required placeholder="Datum wählen" :class="{ 'input-error': errors.deliveryDate }" />
              </div>
            </div>
            <div class="form-row">
              <div class="input-group">
                <label for="deliveryWindow">Lieferzeitfenster <span class="required">*</span></label>
                <select id="deliveryWindow" v-model="deliveryWindow" required :class="{ 'input-error': errors.deliveryWindow }">
                  <option disabled value="">Bitte wählen</option>
                  <option v-for="(slot, index) in availableDeliveryWindows" :key="index" :value="slot">
                    {{ slot }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <!-- Optional: Bemerkungen -->
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
        <h2 class="section-title">Zahlung mit</h2>
        <div id="paypal-button-container" class="paypal-button-container"></div>
      </div>

      <!-- Fehlermodal -->
      <div v-if="showErrorModal" class="modal-overlay">
        <div class="modal">
          <h2>Achtung</h2>
          <p>{{ errorModalMessage }}</p>
          <button class="cta-button modal-close-btn" @click="closeErrorModal">Schließen</button>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script>
import { ref, computed, onMounted, watch, reactive } from "vue";
import flatpickr from "flatpickr";
import { German } from "flatpickr/dist/l10n/de.js";
import "flatpickr/dist/flatpickr.min.css";
import BasePage from "@/components/BasePage.vue";
import { useCartStore } from "@/stores/cart";

const openingHours = {
  Monday: { open: "17:00", close: "20:00" },
  Tuesday: null,
  Wednesday: null,
  Thursday: null,
  Friday: { open: "17:00", close: "21:00" },
  Saturday: { open: "15:00", close: "21:00" },
  Sunday: { open: "16:00", close: "19:30" },
};

function getWeekdayName(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
}

function getNextAvailableDeliveryDate() {
  let date = new Date();
  date.setMinutes(date.getMinutes() + 30);
  while (true) {
    const day = getWeekdayName(date);
    const hrs = openingHours[day];
    if (hrs) {
      const [oh, om] = hrs.open.split(":").map(Number);
      const [ch, cm] = hrs.close.split(":").map(Number);
      const openTime  = new Date(date);
      openTime.setHours(oh, om, 0, 0);
      const closeTime = new Date(date);
      closeTime.setHours(ch, cm, 0, 0);
      if (date < closeTime) break;
    }
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
  }
  return date;
}

export default {
  name: "Checkout",
  components: { BasePage },
  setup() {
    const cartStore = useCartStore();
    const cartItems = computed(() => cartStore.items);
    const totalPrice = computed(() =>
      cartStore.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    );
    // Rabatt (10%) Berechnung
    const discountValue = computed(() => totalPrice.value * 0.1);
    const discountedTotalPrice = computed(() => totalPrice.value - discountValue.value);
    // Versandkosten: 2,50€ falls Warenkorb < 25€, sonst 0
    const shippingCost = computed(() => (totalPrice.value < 25 ? 2.5 : 0));
    const amountRemaining = computed(() => (totalPrice.value < 25 ? 25 - totalPrice.value : 0));
    const progressPercent = computed(() => (totalPrice.value < 25 ? (totalPrice.value / 25) * 100 : 100));
    // Gesamtsumme: Rabattierter Preis + Versandkosten
    const finalTotal = computed(() => discountedTotalPrice.value + shippingCost.value);
    const formatPrice = (val) => val.toFixed(2).replace(".", ",") + " €";

    const address = ref({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      postalCode: "",
      city: "",
      phone: "",
      country: "DE",
    });
    const remarks = ref("");

    const deliveryDate = ref("");
    const deliveryWindow = ref("");

    const showErrorModal = ref(false);
    const errorModalMessage = ref("");

    // Fehlerobjekt
    const errors = reactive({
      firstName: false,
      lastName: false,
      email: false,
      street: false,
      postalCode: false,
      city: false,
      phone: false,
      country: false,
      deliveryDate: false,
      deliveryWindow: false,
    });

    const minDeliveryDate = computed(() => getNextAvailableDeliveryDate());
// Computed für die Liefer-Zeitfenster am gewählten Datum
const availableDeliveryWindows = computed(() => {
  if (!deliveryDate.value) return [];
  // Datum im Format "DD.MM.YYYY" in JS-Date umwandeln
  const [d, m, y] = deliveryDate.value.split(".");
  const dt = new Date(+y, +m - 1, +d);

  const day = getWeekdayName(dt);
  const hrs = openingHours[day];
  if (!hrs) return [];

  const [oh, om] = hrs.open.split(":").map(Number);
  const [ch, cm] = hrs.close.split(":").map(Number);

  let start = new Date(dt);
  start.setHours(oh, om, 0, 0);

  const end = new Date(dt);
  end.setHours(ch, cm, 0, 0);

  const today = new Date();
  // Nur heute: Vorlauf von 30 Min. ab jetzt
  if (deliveryDate.value === today.toLocaleDateString("de-DE")) {
    const minT = new Date();
    minT.setMinutes(minT.getMinutes() + 30);
    if (minT > start) start = minT;
  }

  // Erzeuge 30-Minuten-Slots
  const slots = [];
  for (let t = start.getTime(); t + 30*60*1000 <= end.getTime(); t += 30*60*1000) {
    const s = new Date(t);
    const e = new Date(t + 30*60*1000);
    slots.push(
      s.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) +
      " - " +
      e.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
    );
  }

  return slots;
});
    const validateForm = () => {
      errors.firstName = false;
      errors.lastName = false;
      errors.email = false;
      errors.street = false;
      errors.postalCode = false;
      errors.city = false;
      errors.phone = false;
      errors.country = false;
      errors.deliveryDate = false;
      errors.deliveryWindow = false;

      let valid = true;
      if (!address.value.firstName) { errors.firstName = true; valid = false; }
      if (!address.value.lastName) { errors.lastName = true; valid = false; }
      if (!address.value.email) { errors.email = true; valid = false; }
      if (!address.value.street) { errors.street = true; valid = false; }
      if (!address.value.postalCode) { errors.postalCode = true; valid = false; }
      if (!address.value.city) { errors.city = true; valid = false; }
      if (!address.value.phone) { errors.phone = true; valid = false; }
      if (!address.value.country) { errors.country = true; valid = false; }
      if (!deliveryDate.value) { errors.deliveryDate = true; valid = false; }
      if (!deliveryWindow.value) { errors.deliveryWindow = true; valid = false; }

      if (!valid) {
        errorModalMessage.value = "Bitte füllen Sie alle erforderlichen Felder aus, bevor Sie fortfahren.";
        showErrorModal.value = true;
      }
      return valid;
    };

    const closeErrorModal = () => {
      showErrorModal.value = false;
    };

    const goToShop = () => {
      window.location.href = "/shop";
    };

    onMounted(() => {
      flatpickr("#deliveryDate", {
        locale: German,
        dateFormat: "d.m.Y",
        defaultDate: minDeliveryDate.value,
        minDate: minDeliveryDate.value,
        disable: [
          function(date) {
            const weekday = date.getDay();
            const allowedWeekdays = Object.keys(openingHours)
              .filter(day => openingHours[day])
              .map(day => {
                switch (day) {
                  case "Sunday": return 0;
                  case "Monday": return 1;
                  case "Tuesday": return 2;
                  case "Wednesday": return 3;
                  case "Thursday": return 4;
                  case "Friday": return 5;
                  case "Saturday": return 6;
                  default: return -1;
                }
              });
            return allowedWeekdays.indexOf(weekday) === -1;
          }
        ],
        onChange: (selectedDates, dateStr) => {
          deliveryDate.value = dateStr;
          if (availableDeliveryWindows.value.length > 0) {
            deliveryWindow.value = availableDeliveryWindows.value[0];
          } else {
            deliveryWindow.value = "";
          }
        }
      });
      if (!deliveryDate.value) {
        deliveryDate.value = flatpickr.formatDate(minDeliveryDate.value, "d.m.Y");
      }
      if (availableDeliveryWindows.value.length > 0 && !deliveryWindow.value) {
        deliveryWindow.value = availableDeliveryWindows.value[0];
      }

      if (window.paypal) {
        window.paypal.Buttons({
          style: { borderRadius: 20 },
          createOrder: async (data, actions) => {
            if (!validateForm()) {
              throw new Error(errorModalMessage.value);
            }
            const orderRes = await fetch("/api/create-paypal-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: cartStore.items,
                total: finalTotal.value,
                address: address.value,
                deliveryDate: deliveryDate.value,
                deliveryWindow: deliveryWindow.value,
              }),
            });
            const orderData = await orderRes.json();
            if (orderData.error) {
              errorModalMessage.value = orderData.error;
              showErrorModal.value = true;
              throw new Error(orderData.error);
            }
            return orderData.id;
          },
          onApprove: async (data, actions) => {
            try {
              const capture = await actions.order.capture();
              console.log("PayPal Capture:", capture);
              await fetch("/api/sendCheckoutEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  address: address.value,
                  items: cartItems.value,
                  total: parseFloat(finalTotal.value),
                  remarks: remarks.value,
                  deliveryDate: deliveryDate.value,
                  deliveryWindow: deliveryWindow.value,
                }),
              });
              cartStore.clearCart();
              window.location.href = "/checkout-success";
            } catch (err) {
              errorModalMessage.value = "Ein Fehler ist beim Abschluss der Zahlung aufgetreten.";
              showErrorModal.value = true;
              console.error("Fehler bei onApprove:", err);
            }
          },
          onError: (err) => {
            if (err.message.includes("Formular nicht vollständig")) {
              errorModalMessage.value = "Bitte überprüfen Sie Ihre Eingaben – alle Pflichtfelder müssen ausgefüllt sein.";
            } else {
              errorModalMessage.value = err.message;
            }
            showErrorModal.value = true;
            console.error("PayPal Fehler:", err);
          },
        }).render("#paypal-button-container");
      } else {
        console.error("PayPal SDK wurde nicht geladen.");
        errorModalMessage.value = "PayPal SDK konnte nicht geladen werden.";
        showErrorModal.value = true;
      }
    });

    watch(availableDeliveryWindows, (newSlots) => {
      if (newSlots.length > 0 && !deliveryWindow.value) {
        deliveryWindow.value = newSlots[0];
      }
    });

    return {
      cartItems,
      totalPrice,
      discountValue,
      discountedTotalPrice,
      shippingCost,
      finalTotal,
      amountRemaining,
      progressPercent,
      formatPrice,
      address,
      remarks,
      deliveryDate,
      deliveryWindow,
      availableDeliveryWindows,
      minDeliveryDate,
      showErrorModal,
      errorModalMessage,
      closeErrorModal,
      goToShop,
      errors,
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

/* Bestellübersicht */
.order-summary {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.summary-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #004a7f;
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 0.75rem;
}
.item-details {
  flex: 1;
}
.item-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #004a7f;
  margin: 0 0 0.25rem;
}
.item-qty {
  font-size: 0.9rem;
  color: #555;
}
.item-total {
  font-size: 1rem;
  font-weight: bold;
  color: #004a7f;
  margin-left: 1rem;
  white-space: nowrap;
}

/* Totals */
.total-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
}
.total-container.small {
  font-size: 0.9rem;
}
.total-container.final {
  font-size: 1.2rem;
  font-weight: bold;
}
.total-label {
  margin-right: 0.5rem;
  color: #666;
}
.total-amount {
  font-weight: bold;
  color: #004a7f;
}

/* Versandkosten-Bereich */
.shipping-container {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #666;
  text-align: right;
}
.shipping-text {
  display: inline-block;
  margin-bottom: 0.3rem;
}
.progress-bar-container {
  position: relative;
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  margin-top: 0.3rem;
}
.progress-bar {
  height: 100%;
  background: #4caf50;
  border-radius: 3px;
  transition: width 0.3s ease;
}
.progress-info {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.2rem;
}

/* Shop-Button */
.shop-button {
  font-size: 1.5rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}
.cta-button:hover,
.cta-button:focus {
  transform: scale(1.01);
}

/* Formular */
.address-form.catering-form {
  max-width: 48em;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.form-hint {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}
.form-row {
  margin-bottom: 1.5rem;
}
.form-row.double {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.input-group {
  display: flex;
  flex-direction: column;
}
.form-row label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #004a7f;
}
.required {
  color: red;
  margin-left: 0.25rem;
}
.form-row input,
.form-row select,
.form-row textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.form-row input:focus,
.form-row select:focus,
.form-row textarea:focus {
  outline: none;
  border-color: #004a7f;
  box-shadow: 0 0 5px rgba(3,48,93,0.3);
}

/* Einheitliches Styling für das Select-Element (auch mobile Version) */
select#country {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  /* Optional: Eigener Hintergrundpfeil */
  background-image: url('/images/arrow-down.png');
  background-repeat: no-repeat;
  background-position: right 1rem center;
}

/* Fehler-Stil */
.input-error {
  border: 1px solid red !important;
}

/* Lieferoptionen */
.delivery-options {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

/* PayPal & Fehlermodal */
.paypal-button-container,
.payment-section {
  margin-top: 1rem;
  text-align: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  max-width: 90%;
}
.modal .cta-button {
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
