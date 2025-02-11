<template>
  <div class="cart">
    <h2>Warenkorb</h2>
    <div v-if="cart.length === 0">
      <p>Ihr Warenkorb ist leer.</p>
    </div>
    <ul v-else>
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <div class="item-info">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-quantity">x{{ item.quantity }}</span>
        </div>
        <div class="item-price">
          {{ (item.price * item.quantity).toFixed(2) }} €
        </div>
        <button class="remove-btn" @click="$emit('remove', item.id)">Entfernen</button>
      </li>
    </ul>
    <div v-if="cart.length > 0" class="cart-summary">
      <p>Gesamt: <strong>{{ total.toFixed(2) }} €</strong></p>
      <button class="cta-button" @click="$emit('goToCheckout')">Zur Kasse</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
};
</script>

<style scoped>
.cart {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
}
.cart h2 {
  margin: 0 0 1rem;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
}
.item-info {
  display: flex;
  flex-direction: column;
}
.item-name {
  font-weight: bold;
}
.item-quantity {
  font-size: 0.9rem;
  color: #555;
}
.item-price {
  font-weight: bold;
}
.remove-btn {
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 0.9rem;
}
.cart-summary {
  text-align: right;
  margin-top: 1rem;
}
</style>
