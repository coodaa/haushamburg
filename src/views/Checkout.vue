<template>
  <BasePage
    imageSrc="/images/mood/haus-hamburg-leer-pferd.webp"
    imageAlt="Checkout"
    titleAbove="Checkout"
    titleMain="Bezahlen"
    subtitle="Überprüfen Sie Ihre Bestellung und wählen Sie PayPal als Zahlungsmethode."
    heading="Checkout"
    flowText="Bitte überprüfen Sie Ihre Bestellung, füllen Sie Ihre Adress- und Lieferinformationen aus – inklusive Lieferdatum und Zeitfenster – und bezahlen Sie mit PayPal."
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
              <input id="firstName" v-model="address.firstName" type="text" required />
            </div>
            <div class="input-group">
              <label for="lastName">Nachname <span class="required">*</span></label>
              <input id="lastName" v-model="address.lastName" type="text" required />
            </div>
          </div>
          <!-- E-Mail -->
          <div class="form-row">
            <label for="email">E-Mail <span class="required">*</span></label>
            <input id="email" v-model="address.email" type="email" required />
          </div>
          <!-- Straße -->
          <div class="form-row">
            <label for="street">Straße & Nr. <span class="required">*</span></label>
            <input id="street" v-model="address.street" type="text" required />
          </div>
          <!-- PLZ & Stadt -->
          <div class="form-row double">
            <div class="input-group">
              <label for="postalCode">PLZ <span class="required">*</span></label>
              <input
                id="postalCode"
                v-model="address.postalCode"
                type="text"
                required
                pattern="^\d+$"
                inputmode="numeric"
                title="Bitte nur Zahlen eingeben" />
            </div>
            <div class="input-group">
              <label for="city">Stadt <span class="required">*</span></label>
              <input id="city" v-model="address.city" type="text" required />
            </div>
          </div>
          <!-- Land & Telefonnummer -->
          <div class="form-row double">
            <div class="input-group">
              <label for="country">Land <span class="required">*</span></label>
              <select id="country" v-model="address.country" required>
                <option disabled value="">Bitte auswählen</option>
                <option value="DE">Deutschland</option>
              </select>
            </div>
            <div class="input-group">
              <label for="phone">Telefonnummer <span class="required">*</span></label>
              <input
                id="phone"
                v-model="address.phone"
                type="tel"
                required
                pattern="^\d+$"
                inputmode="numeric"
                title="Bitte nur Zahlen eingeben" />
            </div>
          </div>
          <!-- Lieferdatum und Lieferzeitfenster -->
          <div class="delivery-options">
            <div class="form-row">
              <div class="input-group">
                <label for="deliveryDate">Lieferdatum <span class="required">*</span></label>
                <input
                  type="text"
                  id="deliveryDate"
                  ref="deliveryDateInput"
                  required
                  placeholder="Datum wählen" />
              </div>
            </div>
            <div class="form-row">
              <div class="input-group">
                <label for="deliveryWindow">Lieferzeitfenster <span class="required">*</span></label>
                <select id="deliveryWindow" v-model="deliveryWindow" required>
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
        <h2 class="section-title">Zahlung mit PayPal</h2>
        <div id="paypal-button-container" class="paypal-button-container"></div>
      </div>

      <!-- Fehlermodal -->
      <div v-if="showErrorModal" class="modal-overlay">
        <div class="modal">
          <h2>Achtung</h2>
          <p>{{ errorModalMessage }}</p>
          <button class="cta-button" @click="closeErrorModal">Schließen</button>
        </div>
      </div>

      <!-- Zusammenfassung -->
      <div class="checkout-summary">
        <p class="total-label">Gesamtsumme:</p>
        <p class="total-amount"><strong>{{ formatPrice(totalPrice) }}</strong></p>
      </div>
    </div>
  </BasePage>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import flatpickr from "flatpickr";
import { German } from "flatpickr/dist/l10n/de.js";
import "flatpickr/dist/flatpickr.min.css";
import BasePage from "@/components/BasePage.vue";
import { useCartStore } from "@/stores/cart";

// Beispielhafte Öffnungszeiten
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
  date.setMinutes(date.getMinutes() + 90);
  while (true) {
    const weekday = getWeekdayName(date);
    if (openingHours[weekday]) {
      const [openHour, openMinute] = openingHours[weekday].open.split(":").map(Number);
      const [closeHour, closeMinute] = openingHours[weekday].close.split(":").map(Number);
      const openTime = new Date(date);
      openTime.setHours(openHour, openMinute, 0, 0);
      const closeTime = new Date(date);
      closeTime.setHours(closeHour, closeMinute, 0, 0);
      if (date < closeTime) break;
    }
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
  }
  return date.toISOString().split("T")[0];
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
    const formatPrice = (val) => val.toFixed(2).replace(".", ",") + " €";

    // Adressdaten (Land wird intern immer auf "DE" gesetzt)
    const address = ref({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      postalCode: "",
      city: "",
      phone: "",
      country: "DE"
    });
    const remarks = ref("");

    // Lieferfelder
    const deliveryDate = ref("");
    const deliveryWindow = ref("");

    // Zusätzliche Optionen
    const barzahlung = ref(false);
    const trinkgeld = ref(0);

    // Fehlermodal
    const showErrorModal = ref(false);
    const errorModalMessage = ref("");

    // Mindestlieferdatum
    const minDeliveryDate = computed(() => getNextAvailableDeliveryDate());

    // Verfügbare Lieferzeitfenster
    const availableDeliveryWindows = computed(() => {
      if (!deliveryDate.value) return [];
      const dateObj = new Date(deliveryDate.value);
      const dayName = getWeekdayName(dateObj);
      const hours = openingHours[dayName];
      if (!hours) return [];
      const slots = [];
      const [openHour, openMinute] = hours.open.split(":").map(Number);
      const [closeHour, closeMinute] = hours.close.split(":").map(Number);
      const start = new Date(dateObj);
      start.setHours(openHour, openMinute, 0, 0);
      const today = new Date();
      if (deliveryDate.value === today.toISOString().split("T")[0]) {
        const minTime = new Date(today);
        minTime.setMinutes(minTime.getMinutes() + 90);
        if (minTime > start) start.setTime(minTime.getTime());
      }
      const end = new Date(dateObj);
      end.setHours(closeHour, closeMinute, 0, 0);
      for (let time = start.getTime(); time + 15 * 60 * 1000 <= end.getTime(); time += 15 * 60 * 1000) {
        const slotStart = new Date(time);
        const slotEnd = new Date(time + 15 * 60 * 1000);
        const slotLabel =
          slotStart.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) +
          " - " +
          slotEnd.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
        slots.push(slotLabel);
      }
      return slots;
    });

    // Validierung der Felder inkl. Liefergebietskontrolle (Beispiel: PLZ "26789")
    const validateForm = () => {
      if (
        !address.value.firstName ||
        !address.value.lastName ||
        !address.value.email ||
        !address.value.street ||
        !address.value.postalCode ||
        !address.value.city ||
        !address.value.phone ||
        !deliveryDate.value ||
        !deliveryWindow.value
      ) {
        errorModalMessage.value = "Bitte füllen Sie alle erforderlichen Felder aus, bevor Sie fortfahren.";
        showErrorModal.value = true;
        return false;
      }
      if (address.value.postalCode !== "26789") {
        errorModalMessage.value = "Lieferung ist nur im Umkreis von 5 km möglich.";
        showErrorModal.value = true;
        return false;
      }
      return true;
    };

    const closeErrorModal = () => {
      showErrorModal.value = false;
    };

    onMounted(() => {
      if (!deliveryDate.value) {
        deliveryDate.value = minDeliveryDate.value;
      }
      flatpickr("#deliveryDate", {
        locale: German,
        dateFormat: "Y-m-d",
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
      if (availableDeliveryWindows.value.length > 0 && !deliveryWindow.value) {
        deliveryWindow.value = availableDeliveryWindows.value[0];
      }

      // PayPal-Button initialisieren
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: async (data, actions) => {
            if (!validateForm()) {
              throw new Error("Bitte füllen Sie alle erforderlichen Felder aus, bevor Sie fortfahren.");
            }
            const orderRes = await fetch("/api/create-paypal-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: cartStore.items,
                total: totalPrice.value,
                address: address.value,
                deliveryDate: deliveryDate.value,
                deliveryWindow: deliveryWindow.value,
                barzahlung: barzahlung.value,
                trinkgeld: trinkgeld.value,
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
                  total: parseFloat(totalPrice.value),
                  remarks: remarks.value,
                  deliveryDate: deliveryDate.value,
                  deliveryWindow: deliveryWindow.value,
                  barzahlung: barzahlung.value,
                  trinkgeld: trinkgeld.value,
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
    errorModalMessage.value = err.message; // kein "PayPal Fehler:"-Prefix
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
      formatPrice,
      address,
      remarks,
      barzahlung,
      trinkgeld,
      deliveryDate,
      deliveryWindow,
      availableDeliveryWindows,
      minDeliveryDate,
      showErrorModal,
      errorModalMessage,
      closeErrorModal,
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.checkout-header {
  text-align: center;
  margin-bottom: 2rem;
}
.checkout-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}
.checkout-header p {
  font-size: 1.1rem;
  color: #555;
}
.order-summary {
  margin-bottom: 2rem;
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}
.cart-item img {
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
  font-size: 1.1rem;
  color: var(--blue);
  margin: 0;
}
.item-qty {
  font-size: 0.9rem;
  color: #666;
}
.item-total {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--blue);
}
.form-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
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
  color: var(--blue);
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
  border-color: var(--blue);
  box-shadow: 0 0 5px rgba(3,48,93,0.3);
}
.delivery-options {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}
.paypal-button-container,
.payment-section {
  margin-top: 1rem;
  text-align: center;
}
.checkout-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
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
/* Modal */
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
