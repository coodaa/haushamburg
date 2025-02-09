<template>
  <div class="test-order">
    <h1>Testbestellung absenden</h1>
    <form @submit.prevent="submitOrder">
      <div>
        <label for="customerName">Kundenname:</label>
        <input id="customerName" v-model="order.customerName" placeholder="Max Mustermann" required />
      </div>
      <div>
        <label for="orderItems">Bestellartikel (kommagetrennt):</label>
        <input id="orderItems" v-model="order.orderItemsInput" placeholder="Pizza, Cola" required />
      </div>
      <div>
        <label for="totalPrice">Gesamtpreis:</label>
        <input id="totalPrice" type="number" step="0.01" v-model.number="order.totalPrice" required />
      </div>
      <button type="submit">Bestellung absenden</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TestOrder',
  data() {
    return {
      order: {
        customerName: '',
        orderItemsInput: '',
        totalPrice: 0
      },
      message: ''
    };
  },
  methods: {
    async submitOrder() {
      // Konvertiere die Eingabe in ein Array (splite an Kommata und trimme Leerzeichen)
      const orderItems = this.order.orderItemsInput
        .split(',')
        .map(item => item.trim())
        .filter(item => item);

      const orderData = {
        customerName: this.order.customerName,
        orderItems,
        totalPrice: this.order.totalPrice,
        orderDate: new Date().toISOString(),
        userId: "testUser" // Beispiel, falls du Auth einsetzt
      };

      try {
        // Sende eine POST-Anfrage an deinen Backend-Endpunkt
        const response = await axios.post('/api/orders', orderData);
        this.message = `Bestellung erfolgreich gesendet! ID: ${response.data.orderId}`;
      } catch (error) {
        console.error("Fehler beim Absenden der Bestellung:", error);
        this.message = "Fehler beim Absenden der Bestellung: " + error.message;
      }
    }
  }
};
</script>

<style scoped>
.test-order {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.test-order label {
  display: block;
  margin-bottom: 0.25rem;
}
.test-order input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
}
.test-order button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.message {
  margin-top: 1rem;
  font-weight: bold;
}
</style>
