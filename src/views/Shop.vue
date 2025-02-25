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
    <!-- 🔥 Titel für Beliebte Produkte -->
    <h2 class="swiper-title">Unsere beliebtesten Produkte</h2>

    <!-- 🔥 Swiper (Beliebte Produkte) -->
    <div class="swiper-section">
      <swiper
        :slides-per-view="slidesPerView"
        :space-between="15"
        :loop="true"
        :modules="[Pagination, Navigation]"
        navigation
        pagination
        class="my-swiper"
      >
        <!-- Swiper-Slides -->
        <swiper-slide
          v-for="product in popularProducts"
          :key="product.id"
          class="swiper-slide"
        >
          <div class="product-card">
            <div class="image-container">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="description">{{ product.description }}</p>
              <p class="price"><strong>{{ formatPrice(product.price) }}</strong></p>

              <p v-if="product.zusatzstoffe && product.zusatzstoffe.length" class="zusatzstoffe">
                Zusatzstoffe: {{ product.zusatzstoffe.join(', ') }}
              </p>

              <button class="cta-button" @click="addToCart(product)">🛒</button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- 📌 Kategorie-Leiste (pinned), nur sichtbar bei pinnedVisible -->
    <transition name="fade">
      <div v-if="pinnedVisible" class="pinned-category-tabs">
        <h3 class="pinned-category-heading">Kategorien</h3>
        <div class="category-tabs">
          <button
            v-for="cat in categories"
            :key="cat"
            :class="{ active: cat === selectedCategory }"
            @click="scrollToCategory(cat)"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </transition>

    <!-- 🛒 Produkte nach Kategorien -->
    <div
      v-for="cat in categories"
      :key="cat"
      :ref="setCategoryRef(cat)"
      class="category-section"
    >
      <h2 class="category-title">{{ cat }}</h2>
      <div class="product-grid">
        <div
          v-for="product in productsByCategory(cat)"
          :key="product.id"
          class="product-card"
        >
          <div class="image-container">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            <p class="price"><strong>{{ formatPrice(product.price) }}</strong></p>

            <p v-if="product.zusatzstoffe && product.zusatzstoffe.length" class="zusatzstoffe">
              Zusatzstoffe: {{ product.zusatzstoffe.join(', ') }}
            </p>

            <button class="cta-button" @click="addToCart(product)">🛒</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔼 Zurück nach oben Button -->
    <transition name="fade">
      <button v-if="showScrollTop" class="scroll-top-btn" @click="scrollToTop">
        ⬆
      </button>
    </transition>
  </BasePage>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { fetchProducts } from "../../firebase/products";
import BasePage from "@/components/BasePage.vue";

export default {
  components: { BasePage, Swiper, SwiperSlide },
  setup() {
    const products = ref([]);
    const selectedCategory = ref("");
    const categoryRefs = {};

    // Steuerung für angepinnte Tabs + ScrollToTop
    const pinnedVisible = ref(false);
    const showScrollTop = ref(false);

    onMounted(async () => {
      products.value = await fetchProducts();
      window.addEventListener("scroll", handleScroll);
    });

    function handleScroll() {
      const y = window.scrollY;
      // Abhängig von der Bildschirmbreite
      const threshold = window.innerWidth < 768 ? 800 : 1500;
      pinnedVisible.value = y > threshold;
      showScrollTop.value = y > 200;
    }

    // Keine "Beliebt" Kategorie mehr
    const categories = ["Fisch", "Fleisch", "Vegetarisch", "Desserts", "Getränke"];

    const popularProducts = computed(() =>
  products.value.filter((p) =>
    [
      "Kibbelinge",
      "Ras Fritten",
      "Rahmschnitzel",
      "Fischbrötchen",
      "warmer Schokoladenkuchen",
      "Fanta 0.5l",
      "Haus Hamburg Hauswein 0.75l"
    ].includes(p.name)
  )
);

    // Produkte je Kategorie
    const productsByCategory = (cat) => {
      return products.value.filter((prod) => prod.category === cat);
    };

    // In den Warenkorb
    const addToCart = (product) => {
      console.log("🛒 Produkt hinzugefügt:", product);
    };

    // Preis formatieren (z. B. 19,50 €)
    const formatPrice = (val) => {
      return val.toFixed(2).replace(".", ",") + " €";
    };

    // Scroll + Refs
    const setCategoryRef = (cat) => (el) => {
      categoryRefs[cat] = el;
    };
    const scrollToCategory = (cat) => {
      selectedCategory.value = cat;
      const el = categoryRefs[cat];
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Scroll to Top
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Swiper-Einstellungen
    const slidesPerView = computed(() => {
      return window.innerWidth < 768 ? 1.3 : 3;
    });

    return {
      products,
      selectedCategory,
      categories,
      popularProducts,
      productsByCategory,
      addToCart,
      formatPrice,
      setCategoryRef,
      scrollToCategory,
      pinnedVisible,
      showScrollTop,
      scrollToTop,
      slidesPerView,
      Pagination,
      Navigation,
    };
  },
};
</script>

<style scoped>
/* Optionaler Titel über dem Swiper */
.swiper-title {
  text-align: center;
  font-size: 1.6rem;
  color: var(--blue);
  margin: 1.5rem auto 0.5rem;
  font-family: var(--font-thunder);
  text-transform: uppercase;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* scroll-margin-top: gegen zu weites Scrollen */
.category-section {
  scroll-margin-top: 8rem;
  margin-bottom: 40px;
  padding: 0 10px;
}

/* Pinned Category Heading */
.pinned-category-heading {
  text-align: center;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: var(--blue);
  font-weight: bold;
  text-transform: uppercase;
}

/* pinnedCategoryTabs */
.pinned-category-tabs {
  position: fixed;
  top: 5em;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  background: linear-gradient(135deg, var(--gold) 0%, var(--beige) 100%);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 1rem 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 93vw;
}

/* Größere Bildschirme => top + margins anpassen */
@media (min-width: 1200px) {
  .pinned-category-tabs {
    top: 7em;
    min-width: 60vw;
  }
  .category-section {
    scroll-margin-top: 16rem;
  }
}

/* category-tabs container */
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

/* Pillen-Buttons */
.category-tabs button {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(4px);
  border: 2px solid var(--blue);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: var(--blue);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  min-width: 90px;
}
.category-tabs button:hover {
  background-color: var(--blue);
  color: white;
}
.category-tabs button.active {
  background-color: var(--blue);
  color: white;
}

/* category-title */
.category-title {
  text-align: center;
  font-size: 1.6rem;
  margin: 10px 0;
  color: var(--blue);
}

/* SWIPER */
.swiper-section {
  max-width: 1200px;
  margin: 0 auto 30px;
  padding: 0 10px;
}
.my-swiper {
  width: 100%;
  margin: 0 auto;
}

/* GRID */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
  max-width: 1200px;
  margin: 0 auto;
}

/* PRODUCT-CARD */
.product-card {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.image-container {
  width: 100%;
  height: 110px;
  overflow: hidden;
  border-radius: 5px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-info {
  margin-top: 8px;
  text-align: center;
}
.product-info h3 {
  font-size: 1rem;
  margin-bottom: 3px;
}
.product-info .description {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 4px;
  min-height: 28px;
}
.product-info .price {
  font-size: 1rem;
  color: var(--blue);
  font-weight: bold;
  margin-bottom: 6px;
}
.zusatzstoffe {
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 6px;
}

/* CTA-Button */
.cta-button {
  padding: 6px 8px;
  background: var(--gold);
  border: 1px solid var(--blue);
  border-radius: 5px;
  color: var(--blue);
  font-size: 0.8rem;
  cursor: pointer;
  transition: 0.2s;
  width: auto;
}
.cta-button:hover {
  background: var(--blue);
  color: white;
}

/* SCROLL-TOP */
.scroll-top-btn {
  position: fixed;
  right: 15px;
  bottom: 30px;
  background: var(--gold);
  color: var(--blue);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  padding: 10px 14px;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.scroll-top-btn:hover {
  background: var(--blue);
  color: #fff;
}
</style>
