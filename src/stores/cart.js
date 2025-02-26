// src/stores/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []  // Jeder Eintrag: { product, quantity }
  }),
  actions: {
    addItemWithQuantity(product, quantity) {
      const item = this.items.find(i => i.product.name === product.name);
      if (item) {
        item.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
    },
    removeItem(product) {
      this.items = this.items.filter(i => i.product.name !== product.name);
    },
    updateQuantity(product, quantity) {
      const item = this.items.find(i => i.product.name === product.name);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart() {
      this.items = [];
    }
  },
  getters: {
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0)
  }
});
