<template>
  <BasePage
    :key="$route.fullPath"
    imageSrc="/images/food/haus_hamburg_leer_013.webp"
    imageAlt="Speisekarte Haus Hamburg"
    titleAbove="Unsere"
    titleMain="Speisekarte"
    subtitle="Freschen Fisch un regionale Spezialiteeten"
    heading="Online Bestellung"
    flowText="Wählen Sie Ihre Gerichte aus und legen Sie sie in den Warenkorb."
    parallaxImageSrc="/images/food/haus_hamburg_leer_021.webp"
    parallaxImageAlt="Haus Hamburg Restaurant"
  >
    <div class="order-container">
      <!-- Kategorien und Gerichte -->
      <div v-for="category in categories" :key="category.id" class="category">
        <h2 class="big-title-3">{{ category.name }}</h2>
        <div class="dish-grid">
          <div v-for="dish in category.dishes" :key="dish.id" class="dish-card">
            <h3>{{ dish.name }}</h3>
            <p>{{ dish.description }}</p>
            <span class="dish-price">{{ dish.price.toFixed(2) }} €</span>
            <button class="cta-button" @click="addToCart(dish)">In den Warenkorb</button>
          </div>
        </div>
      </div>

      <!-- Warenkorb-Komponente -->
      <Cart :cart="cart" @remove="removeFromCart" @goToCheckout="goToCheckout" />
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";
import Cart from "@/components/Cart.vue";

export default {
  name: "OrderPage",
  components: { BasePage, Cart },
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "Fischgerichte",
          dishes: [
            {
              id: "f1",
              name: "Nordsee Scholle – filetiert",
              description: "Mit Bratkartoffeln und Salat",
              price: 20.90,
            },
            {
              id: "f2",
              name: "Nordsee Scholle (filetiert) / Ras Fritten",
              description: "Mit Ras Fritten und Salat",
              price: 21.90,
            },
            // Weitere Gerichte hinzufügen…
          ],
        },
        {
          id: 2,
          name: "Gerichte mit Fleisch",
          dishes: [
            {
              id: "m1",
              name: "Grünkohl mit 2 Kohlwürsten",
              description: "Mit Bratkartoffeln",
              price: 19.80,
            },
            {
              id: "m2",
              name: "Rahmschnitzel",
              description: "Mit Ras Fritten und Salat",
              price: 17.50,
            },
          ],
        },
        {
          id: 3,
          name: "Fischbrötchen & mehr",
          dishes: [
            {
              id: "fb1",
              name: "Fischbrötchen mit Backfisch",
              description: "",
              price: 5.00,
            },
            {
              id: "fb2",
              name: "Fischbrötchen mit Räucherlachs",
              description: "",
              price: 5.00,
            },
          ],
        },
      ],
      cart: [],
    };
  },
  methods: {
    addToCart(dish) {
      const existing = this.cart.find((item) => item.id === dish.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.cart.push({ ...dish, quantity: 1 });
      }
    },
    removeFromCart(dishId) {
      this.cart = this.cart.filter((item) => item.id !== dishId);
    },
    goToCheckout() {
      // Navigiere zur Checkout-Seite
      this.$router.push({ name: "checkout", params: { cart: this.cart } });
      // Hinweis: Bei zentralem State (Vuex/Pinia) wird der Warenkorb dort abgelegt.
    },
  },
};
</script>

<style scoped>
.order-container {
  padding: 2rem;
}
.category {
  margin-bottom: 2rem;
}
.dish-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.dish-card {
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;
}
.dish-card:hover {
  transform: translateY(-5px);
}
.dish-price {
  font-weight: bold;
  margin: 0.5rem 0;
}
</style>
