<template>
  <BasePage
    imageSrc="/images/catering/haus-hamburg-leer-catering-1.webp"
    imageAlt="Online Shop"
    titleAbove="Shop"
    titleMain="Online Shop"
    subtitle="Bestellen Sie Ihre Lieblingsgerichte bequem online"
    heading="Willkommen in unserem Online-Shop"
    flowText="Hier finden Sie eine Auswahl unserer köstlichen Gerichte, die Sie ganz einfach bestellen können."
    parallaxImageSrc="/images/restaurant/haus-hamburg-leer-08.webp"
  >
    <!-- 📌 Kategoriewahl -->
    <div class="category-nav">
      <select v-if="isMobile" v-model="selectedCategory" class="category-dropdown">
        <option value="Alle">🍽️ Alle Kategorien</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <div v-else class="category-tabs">
        <button v-for="category in categories" :key="category"
                :class="{ active: selectedCategory === category }"
                @click="selectedCategory = category">
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 🛒 Produktanzeige -->
    <div v-if="selectedCategory === 'Alle'" class="category-section" v-for="category in categories" :key="category">
      <h2 class="category-title">{{ category }}</h2>
      <div class="product-container">
        <div v-for="product in filteredByCategory(category)" :key="product.id" class="product-card">
          <div class="image-container">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            <p class="price"><strong>{{ product.price }} €</strong></p>
            <button class="cta-button" @click="addToCart(product)">🛒 In den Warenkorb</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="category-section">
      <h2 class="category-title">{{ selectedCategory }}</h2>
      <div class="product-container">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="image-container">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            <p class="price"><strong>{{ product.price }} €</strong></p>
            <button class="cta-button" @click="addToCart(product)">🛒 In den Warenkorb</button>
          </div>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { fetchProducts } from "../../firebase/products";
import BasePage from "@/components/BasePage.vue";

export default {
  components: { BasePage },
  setup() {
    const products = ref([]);
    const selectedCategory = ref("Alle");
    const isMobile = ref(window.innerWidth < 768);

    onMounted(async () => {
      products.value = await fetchProducts();
      console.log("🛒 Produkte geladen:", products.value);
      window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth < 768;
      });
    });

    const categories = computed(() => {
      const allCategories = products.value.map((p) => p.category);
      return [...new Set(allCategories)];
    });

    const filteredProducts = computed(() => {
      if (selectedCategory.value === "Alle") {
        return products.value;
      }
      return products.value.filter(
        (product) => product.category === selectedCategory.value
      );
    });

    const filteredByCategory = (category) => {
      return products.value.filter((product) => product.category === category);
    };

    const addToCart = (product) => {
      console.log("🛒 Produkt hinzugefügt:", product);
    };

    return { products, selectedCategory, categories, filteredProducts, filteredByCategory, isMobile, addToCart };
  },
};
</script>

<style>
.category-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* 📌 Modernes Dropdown für Mobile */
.category-dropdown {
  padding: 12px;
  font-size: 1rem;
  border: 2px solid var(--blue);
  border-radius: 8px;
  background: var(--gold);
  color: var(--blue);
  font-weight: bold;
  cursor: pointer;
  width: 90%;
  text-align: center;
}

/* 📌 Tabs für Desktop */
.category-tabs {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.category-tabs button {
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  background: var(--beige);
  color: var(--blue);
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.category-tabs button.active,
.category-tabs button:hover {
  background: var(--gold);
}

/* 📌 Kategorie-Abschnitt */
.category-section {
  margin-bottom: 40px;
}

.category-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--blue);
  text-align: center;
  margin-bottom: 15px;
}

/* 📌 Produktliste */
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 📌 Produktkarte */
.product-card {
  border: 1px solid #ddd;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  gap: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.product-card:hover {
  transform: scale(1.02);
}

/* 📌 Feste Bildgröße */
.image-container {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  background: #f2f2f2;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

/* 📌 Produktinfos */
.product-info {
  flex: 1;
}

h3 {
  font-size: 1.4rem;
  margin: 5px 0;
}

.description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--blue);
}

/* 📌 Call-to-Action Button */
.cta-button {
  width: 100%;
  padding: 10px;
  background-color: var(--gold);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: var(--blue);
  transition: background 0.3s ease;
}

.cta-button:hover {
  background-color: var(--blue);
  color: white;
}
</style>
