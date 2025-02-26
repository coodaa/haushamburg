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
    <!-- Titel für Favoriten -->
    <h2 class="big-title-3">Unsere Favoriten</h2>

    <!-- Swiper (Beliebte Produkte) -->
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
        <swiper-slide
          v-for="(product, index) in popularProducts"
          :key="index"
          class="swiper-slide"
        >
          <div class="product-card">
            <div class="image-container">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info common-info">
              <h3>{{ product.name }}</h3>
              <p class="description-swiper">{{ product.description }}</p>
              <p v-if="product.zusatzstoffe && product.zusatzstoffe.length" class="zusatzstoffe">
                Zusatzstoffe: {{ product.zusatzstoffe.join(", ") }}
              </p>
              <p v-else style="visibility: hidden;">Zusatzstoffe:</p>
              <div class="info-bottom">
                <p class="price"><strong>{{ formatPrice(product.price) }}</strong></p>
                <div class="quantity-control">
                  <button @click="decreaseQty(product)">-</button>
                  <span>{{ getQuantity(product) }}</span>
                  <button @click="increaseQty(product)">+</button>
                </div>
              </div>
              <button class="cta-button" @click="addToCart(product)">
                <i class="fas fa-shopping-cart"></i> In den Warenkorb
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Kategorie-Leiste -->
    <transition name="fade">
      <div v-if="pinnedVisible" class="pinned-category-tabs">
        <div class="category-tabs-wrapper">
          <button v-if="showLeftArrow" class="scroll-arrow" @click="scrollLeft">←</button>
          <div ref="categoryTabsContainer" class="category-tabs" @scroll="updateArrowVisibility">
            <button
              v-for="cat in categories"
              :key="cat"
              :class="{ active: cat === selectedCategory }"
              @click="selectCategory(cat)"
            >
              {{ cat }}
            </button>
          </div>
          <button v-if="showRightArrow" class="scroll-arrow" @click="scrollRight">→</button>
        </div>
      </div>
    </transition>

    <!-- Produkte nach Kategorien (Grid) -->
    <div
      v-for="cat in categories"
      :key="cat"
      :ref="el => setCategoryRef(cat, el)"
      class="category-section"
    >
      <h2 class="category-title">{{ cat }}</h2>
      <div class="product-grid">
        <div
          v-for="(product, index) in productsByCategory(cat)"
          :key="index"
          class="product-card"
        >
          <div class="image-container">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info common-info grid-info">
            <h3>{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            <p v-if="product.zusatzstoffe && product.zusatzstoffe.length" class="zusatzstoffe">
              Zusatzstoffe: {{ product.zusatzstoffe.join(", ") }}
            </p>
            <p v-else style="visibility: hidden;">Zusatzstoffe:</p>
            <div class="info-bottom">
              <p class="price"><strong>{{ formatPrice(product.price) }}</strong></p>
              <div class="quantity-control">
                <button @click="decreaseQty(product)">-</button>
                <span>{{ getQuantity(product) }}</span>
                <button @click="increaseQty(product)">+</button>
              </div>
            </div>
            <button class="cta-button" @click="addToCart(product)">
              <i class="fas fa-shopping-cart"></i> In den Warenkorb
            </button>
          </div>
        </div>
      </div>
    </div>
  </BasePage>

  <!-- Warenkorb-Overlay -->
  <button class="open-cart-btn" @click="cartVisible = true">
    <i class="fas fa-shopping-cart"></i>
    <span v-if="itemsCount > 0" class="cart-badge">{{ itemsCount }}</span>
  </button>
  <CartOverlay :visible="cartVisible" @close="cartVisible = false" />
</template>

<script>
import { ref, computed, onMounted, nextTick } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BasePage from "@/components/BasePage.vue";
import staticProducts from "@/data/products.json";
import CartOverlay from "@/components/CartOverlay.vue";
import { useCartStore } from "@/stores/cart";

export default {
  components: { BasePage, Swiper, SwiperSlide, CartOverlay },
  setup() {
    const cartStore = useCartStore();
    const products = ref(staticProducts);
    const selectedCategory = ref("");
    const categoryRefs = {};
    const categoryTabsContainer = ref(null);

    const pinnedVisible = ref(false);
    const showScrollTop = ref(false);
    const showLeftArrow = ref(false);
    const showRightArrow = ref(false);

    // Mengensteuerung (für Anzeige in den Karten)
    const quantities = ref({});
    products.value.forEach(product => {
      if (!quantities.value[product.name]) {
        quantities.value[product.name] = 1;
      }
    });
    const increaseQty = (product) => {
      quantities.value[product.name] = (quantities.value[product.name] || 1) + 1;
    };
    const decreaseQty = (product) => {
      if ((quantities.value[product.name] || 1) > 1) {
        quantities.value[product.name]--;
      }
    };
    const getQuantity = (product) => quantities.value[product.name] || 1;

    const addToCart = (product) => {
      // Füge Produkt mitsamt der aktuellen Menge dem Warenkorb-Store hinzu
      cartStore.addItemWithQuantity(product, getQuantity(product));
      // Overlay kurz einblenden (z. B. 3 Sekunden)
      cartVisible.value = true;
      setTimeout(() => {
        cartVisible.value = false;
      }, 3000);
    };

    const formatPrice = (val) => val.toFixed(2).replace(".", ",") + " €";

    const handleScroll = () => {
      const y = window.scrollY;
      const threshold = window.innerWidth < 768 ? 800 : 1500;
      pinnedVisible.value = y > threshold;
      showScrollTop.value = y > 200;
      updateActiveCategory();
    };

    const updateArrowVisibility = () => {
      if (categoryTabsContainer.value) {
        const { scrollLeft: sl, scrollWidth, clientWidth } = categoryTabsContainer.value;
        showLeftArrow.value = sl > 1;
        showRightArrow.value = sl < scrollWidth - clientWidth - 2;
      }
    };

    const updateActiveCategory = () => {
      let closestCat = "";
      let minDistance = Infinity;
      const offset = 200;
      Object.keys(categoryRefs).forEach((cat) => {
        const el = categoryRefs[cat];
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - offset);
          if (distance < minDistance) {
            minDistance = distance;
            closestCat = cat;
          }
        }
      });
      if (closestCat) {
        selectedCategory.value = closestCat;
        nextTick(() => {
          if (categoryTabsContainer.value) {
            const activeBtn = categoryTabsContainer.value.querySelector("button.active");
            if (activeBtn) {
              setTimeout(() => {
                activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }, 200);
            }
          }
        });
      }
    };

    const setCategoryRef = (cat, el) => {
      if (el) {
        categoryRefs[cat] = el;
      }
    };

    const selectCategory = (cat) => {
      selectedCategory.value = cat;
      const el = categoryRefs[cat];
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    const scrollLeft = () => {
      if (categoryTabsContainer.value) {
        categoryTabsContainer.value.scrollBy({ left: -150, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (categoryTabsContainer.value) {
        categoryTabsContainer.value.scrollBy({ left: 150, behavior: "smooth" });
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const slidesPerView = computed(() => (window.innerWidth < 768 ? 1.3 : 3));
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

    const productsByCategory = (cat) =>
      products.value.filter((prod) => prod.category === cat);

    // Steuerung für das Warenkorb-Overlay
    const cartVisible = ref(false);
    const itemsCount = computed(() =>
      cartStore.items.reduce((acc, item) => acc + item.quantity, 0)
    );

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      updateArrowVisibility();
      handleScroll();
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
      selectCategory,
      pinnedVisible,
      showScrollTop,
      scrollToTop,
      slidesPerView,
      Pagination,
      Navigation,
      categoryTabsContainer,
      scrollLeft,
      scrollRight,
      showLeftArrow,
      showRightArrow,
      updateArrowVisibility,
      increaseQty,
      decreaseQty,
      getQuantity,
      cartVisible,
      itemsCount,
    };
  },
};
</script>

<style scoped>
/* Basis-Stile für den Shop */

.big-title-3 {
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  color: var(--blue);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.category-section {
  scroll-margin-top: 16rem;
  margin-bottom: 40px;
}

.category-title {
  text-align: center;
  font-size: 1.6rem;
  margin: 10px 0;
  color: var(--blue);
}

.pinned-category-tabs {
  position: fixed;
  top: 5em;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  background: linear-gradient(135deg, var(--gold) 0%, var(--beige) 100%);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 92.5vw;
}

.category-tabs-wrapper {
  display: flex;
  align-items: center;
}

.category-tabs {
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding: 0.5rem;
  flex: 1;
}
.category-tabs button {
  display: inline-block;
  scroll-snap-align: start;
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(4px);
  border: 2px solid var(--blue);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: var(--blue);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  margin-right: 0.75rem;
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

.scroll-arrow {
  background: var(--blue);
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  line-height: 1.5rem;
  margin: 0 0.5rem;
}

.swiper-section {
  max-width: 1200px;
  margin: 0 auto 30px;
}
.my-swiper {
  width: 100%;
  margin: 0 auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 20px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-height: 20em;
}

.image-container {
  flex: 0 0 auto;
  height: 7em;
  overflow: hidden;
  border-radius: 20px;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 0.5em;
}
.product-info h3 {
  font-size: 1rem;
  margin-bottom: 0.5em;
  min-height: 1.5em;
  max-height: 2em;
  overflow: hidden;
}
.description-swiper,
.description {
  font-size: 0.8rem;
  color: #666;
  flex-grow: 1;
  min-height: 3em;
  max-height: 3em;
  overflow: hidden;
}
.product-info .price {
  font-size: 1.1rem;
  color: var(--blue);
  font-weight: bold;
  min-height: 1.5em;
  max-height: 1.5em;
  overflow: hidden;
  margin-bottom: 0.5em;
}
.zusatzstoffe {
  font-size: 0.7rem;
  color: #999;
  min-height: 1.5em;
  margin-bottom: 1em;
}

/* Gemeinsamer unterer Bereich in .common-info */
.common-info .info-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5em;
}
.common-info .info-bottom .price {
  margin: 0;
}
.quantity-control {
  display: flex;
  align-items: center;
}
.quantity-control button {
  background: var(--blue);
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.8em;
  height: 1.8em;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.8em;
  text-align: center;
  margin: 0 0.3em;
}
.quantity-control span {
  font-size: 1rem;
  min-width: 1.5em;
  text-align: center;
}

/* CTA-Button */
.cta-button {
  margin: 0 auto;
  font-size: 1rem;
  margin-bottom: 1.5em;
}
.cta-button:hover {
  background: var(--blue);
  color: white;
}

/* Warenkorb-Overlay-Button (fix am unteren rechten Bildschirmrand) */
.open-cart-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--blue);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1500;
}
.open-cart-btn .cart-badge {
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;
  background-color: red;
  color: #fff;
  font-size: 0.7rem;
  border-radius: 50%;
  padding: 0.1rem 0.3rem;
}

/* Scroll-to-top Button */
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

::v-deep .swiper-button-prev,
::v-deep .swiper-button-next {
  display: none !important;
}

@media (min-width: 768px) {
  ::v-deep .swiper-button-prev,
  ::v-deep .swiper-button-next {
    display: block !important;
  }
}
</style>
