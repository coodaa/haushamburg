<!-- <template>
  <BasePage
    imageSrc="/images/food/haus-hamburg-leer-13.webp"
    imageAlt="Online Shop"
    titleAbove="Bestellen"
    titleMain="Online Shop"
    subtitle="Bestell dien Leevlingsspeisen ganz bequem vun to Huus."
    heading="Willkommen in unserem Online-Shop"
    flowText="Entdecken Sie unseren komfortablen Online-Bestellservice: Frisch zubereitete, leckere und ausgewogene Gerichte – bequem online bestellen, schnell geliefert und 10% Rabatt beim Checkout erhalten"
    parallaxImageSrc="/images/food/haus-hamburg-leer-18.webp"
  >
    <h2 class="big-title-3">Unsere Favoriten</h2>
    <p class="opening-hours-note">
  Die Lieferung ist nur an&nbsp;den Öffnungstagen des Restaurants zwischen
  <strong>17:00&nbsp;–&nbsp;20:00&nbsp;Uhr</strong>
  möglich.
</p>
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
              <p class="price"><strong>{{ formatPrice(product.price) }}</strong></p>
              <button class="cta-button" @click="addToCart(product)">
                <i class="fas fa-shopping-cart"></i>Warenkorb
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

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
            <p class="price"><strong>{{ formatPrice(product.price) }}</strong></p>
            <button class="cta-button" @click="addToCart(product)">
              <i class="fas fa-shopping-cart"></i> In den Warenkorb
            </button>
          </div>
        </div>
      </div>
    </div>

    <template #overlay>
      <div v-if="!pinnedVisible"
           class="shop-sticker-container"
           :style="{ transform: 'translateY(' + discountStickerOffset + 'px)', opacity: discountStickerOpacity }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="400"
          height="400"
          viewBox="0 0 256 256"
          xml:space="preserve"
        >
          <g transform="translate(1.4066, 1.4066) scale(2.81)">
            <path
              d="M49.526 2.698l5.705 6.768c1.357 1.61 3.467 2.378 5.541 2.017l8.721-1.517c3.615-.629 6.926 2.149 6.934 5.819l.02 8.852c.005 2.105 1.127 4.05 2.948 5.107l7.656 4.443c3.174 1.842 3.924 6.098 1.572 8.915l-5.674 6.793c-1.35 1.616-1.74 3.827-1.024 5.807l3.009 8.325c1.247 3.451-.914 7.194-4.526 7.839l-8.714 1.557c-2.073.37-3.793 1.813-4.517 3.79l-3.046 8.311c-1.263 3.446-5.324 4.924-8.506 3.096l-7.676-4.409c-1.826-1.049-4.071-1.049-5.897 0l-7.676 4.409c-3.182 1.828-7.243.35-8.506-3.096l-3.046-8.311c-.725-1.977-2.444-3.42-4.517-3.79l-8.714-1.557c-3.613-.645-5.773-4.388-4.526-7.839l3.009-8.325c.716-1.98.326-4.191-1.024-5.807l-5.674-6.793c-2.353-2.816-1.602-7.073 1.572-8.915l7.656-4.443c1.821-1.057 2.944-3.001 2.948-5.107l.02-8.852c.008-3.67 3.319-6.448 6.934-5.819l8.721 1.517c2.074.361 4.184-.407 5.541-2.017l5.705-6.768c2.365-2.806 6.687-2.806 9.051 0z"
              fill="#FFDD4D"
            />
          </g>
          <g transform="rotate(-10,12,120) translate(4,10)">
            <text
              x="50%"
              y="40%"
              text-anchor="middle"
              dominant-baseline="middle"
              font-family="Arial"
              font-size="35"
              font-weight="bold"
              fill="#03305D"
            >
              <tspan x="50%" dy="0" font-size="60">10%</tspan>
              <tspan x="50%" dy="1.2em">Rabatt</tspan>
              <tspan x="50%" dy="1.5em" font-size="25" font-weight="normal">
                auf alle online
              </tspan>
              <tspan x="50%" dy="1.2em" font-size="25" font-weight="normal">
                Bestellungen
              </tspan>
            </text>
          </g>
        </svg>
      </div>
    </template>

    <div class="zusatzstoff-hinweis">
      <h2>Wichtige Hinweise</h2>
      <p>
        Unsere Gerichte enthalten verschiedene Zusatzstoffe:
        <br />1 = Farbstoff, 2 = Konservierungsstoff, 3 = Geschmacksverstärker, 4 = Säuerungsmittel,
        <br />5 = Süßungsmittel, 6 = Alkohol, 7 = Milch / Laktose, 8 = Gluten, 9 = Senf, 10 = Krustentiere
      </p>
      <hr />
      <p class="ki-hinweis" style="margin-top: 1em;">
        * Bitte beachten Sie: Die dargestellten Bilder wurden teilweise mithilfe einer KI erstellt.
      </p>
    </div>
  </BasePage>
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
import { useCartStore } from "@/stores/cart";

export default {
  components: { BasePage, Swiper, SwiperSlide },
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

    // Reaktive Variable für das Scrollen
    const scrollY = ref(0);
    // Der Sticker bewegt sich langsamer (z. B. halber Scrollwert)
    const discountStickerOffset = computed(() => scrollY.value * 0.5);
    // Fadet ab ab scrollY=300 bis scrollY=500
    const discountStickerOpacity = computed(() => {
      if (scrollY.value < 300) return 1;
      const extra = scrollY.value - 300;
      return Math.max(0, 1 - extra / 200);
    });

    // Mengensteuerung: Standardwert 1 für jedes Produkt
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
      cartStore.addItemWithQuantity(product, getQuantity(product));
      // Globales Event auslösen
      window.dispatchEvent(new CustomEvent('cart-item-added'));
    };

    const formatPrice = (val) => val.toFixed(2).replace(".", ",") + " €";

    const handleScroll = () => {
      scrollY.value = window.scrollY;
      const threshold = window.innerWidth < 768 ? 800 : 1500;
      pinnedVisible.value = window.scrollY > threshold;
      showScrollTop.value = window.scrollY > 200;
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
      Object.keys(categoryRefs).forEach(cat => {
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
    const categories = ["Fisch", "Fleisch", "Vegetarisch", "Dips", "Desserts", "Getränke"];

    const popularProducts = computed(() =>
      products.value.filter(p =>
        [
          "Kibbelinge",
          "Ras-Fritten",
          "Rahmschnitzel",
          "Fischbrötchen",
          "Schokoladenkuchen",
          "Hauswein"
        ].includes(p.name)
      )
    );

    const productsByCategory = (cat) =>
      products.value.filter(prod => prod.category === cat);

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
      // Variablen für den Discount-Sticker:
      scrollY,
      discountStickerOffset,
      discountStickerOpacity,
    };
  },
};
</script> -->
<!--
<style scoped>
.shop-sticker-container {
  position: fixed;
  top: 42vh;
  left: 4vw;
  width: 9em;
  height: 12em;
  z-index: 500;
  transition: none !important;
  animation: none !important;
}

.shop-sticker-container svg {
  width: 100%;
  height: 100%;
}

@media (min-width: 1200px) {
  .shop-sticker-container {
    position: fixed;
    top: 15vh;
    width: 20em;
    height: 25em;
    z-index: 2500;
    transition: none !important;
    animation: none !important;
  }
}

/* Basis-Stile für die Seite */
.big-title-3 {
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  color: var(--blue);
}

.opening-hours-note{
  text-align:center;
  font-size:.9rem;
  color:#555;
  margin:-0.3rem 0 1.2rem;  /* leicht anpassen, damit es sauber sitzt */
}
.opening-hours-note strong{color:#004a7f;}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.category-section {
  scroll-margin-top: 10rem;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: calc(100% - 2em);
}

/* Tablet-Geräte */
@media (min-width: 768px) and (max-width: 1199px) {
  .pinned-category-tabs {
    top: 6em;
  }

  .shop-sticker-container {
    position: fixed;
    top: 15vh;
    width: 14em;
    height: 25em;

  }
}

/* Desktop */
@media (min-width: 1200px) {
  .pinned-category-tabs {
    top: 7.6em;
    width: calc(100% - 4em);
  }
  .category-section {
    scroll-margin-top: 13rem;
  }
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
  background: rgba(255, 255, 255, 0.65);
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
  max-width: 95vw;
  margin: 0 auto 30px;
  padding-top: 2em;
  overflow: visible;
  position: relative;
}
.my-swiper {
  width: 100%;
  margin: 0 auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin: 0 auto;
}

@media (min-width: 1200px) {
  .product-grid {
    max-width: calc(100% - 2em);
  }
  .swiper-section {
    max-width: 85vw;
  }
}

.product-card {
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 20px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 20em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
  flex: 0 0 auto;
  height: 10em;
  overflow: hidden;
  border-radius: 20px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 900px) {
  .image-container {
    height: 15em;
  }
  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 23em;
  }
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
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: var(--blue);
}
.description-swiper,
.description {
  font-size: 0.9rem;
  font-style: italic;
  color: #666;
  flex-grow: 1;
  min-height: 5em;
  max-height: 5em;
  overflow: hidden;
  padding: 0 0.5em;
}
.product-info .price {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--blue);
  padding-bottom: 0.5em;
}
.zusatzstoffe {
  font-size: 0.7rem;
  color: #999;
  margin-bottom: 1em;
}

.common-info .info-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5em;
  padding: 0 1.3em 1em 1.3em;
}

@media (min-width: 1200px) {
  .common-info .info-bottom {
    padding: 1em 4em 2em 4em;
  }
  .product-info h3 {
    min-height: 3em;
  }
}

.cta-button {
  margin: 0 auto;
  font-family: 'Poppins';
  font-size: 1em;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-bottom: 1em;
}

.open-cart-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--blue);
  color: #fff;
  border: 3px solid var(--background);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  font-size: 0.7em;
}
.open-cart-btn i {
  font-size: 3rem !important;
}
.open-cart-btn .cart-badge {
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;
  background-color: red;
  color: #fff;
  font-size: 1rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.scroll-top-btn:hover {
  background: var(--blue);
  color: #fff;
}

::v-deep .swiper-button-prev,
::v-deep .swiper-button-next {
  display: none !important;
}

.zusatzstoff-hinweis {
  background-color: #fafafa;
  border: 1px solid #eee;
  padding: 1em;
  margin: 2em auto;
  max-width: 700px;
  border-radius: 10px;
}
.zusatzstoff-hinweis h2 {
  font-size: 1.3rem;
  color: var(--blue);
  margin-bottom: 0.5em;
}
.zusatzstoff-hinweis p {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #666;
  white-space: pre-line;
}
</style> -->


<template>
  <BasePage
    imageSrc="/images/food/haus-hamburg-leer-13.webp"
    imageAlt="Online Shop"
    titleAbove="Bestellen"
    titleMain="Online Shop"
    subtitle="Bestell dien Leevlingsspeisen ganz bequem vun to Huus."
    heading="Willkommen in unserem Online-Shop"
    flowText="Entdecken Sie unseren komfortablen Online-Bestellservice: Frisch zubereitete, leckere und ausgewogene Gerichte – bequem online bestellen, schnell geliefert und 10% Rabatt beim Checkout erhalten"
    parallaxImageSrc="/images/food/haus-hamburg-leer-18.webp"
  >
    <!-- Wartungshinweis -->
    <div v-if="shopDisabled" class="shop-alert">
      <h2>Online-Shop vorübergehend nicht verfügbar</h2>
      <p>
        Momentan ist die Bezahlung leider nicht möglich. Bestellungen über den Online-Shop
        sind daher vorübergehend deaktiviert. Wir arbeiten bereits an einer Lösung – danke
        für Ihr Verständnis.
      </p>
      <p class="small">
        Hinweis: Lieferung wie gewohnt nur an Öffnungstagen zwischen
        <strong>17:00–20:00 Uhr</strong>.
      </p>
    </div>

    <!-- Gesamter Shop-Inhalt nur anzeigen, wenn nicht gesperrt -->
    <div v-else>
      <!-- Favoriten: Swiper für beliebte Produkte -->
      <h2 class="big-title-3">Unsere Favoriten</h2>
      <p class="opening-hours-note">
        Die Lieferung ist nur an&nbsp;den Öffnungstagen des Restaurants zwischen
        <strong>17:00&nbsp;–&nbsp;20:00&nbsp;Uhr</strong>
        möglich.
      </p>

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
                <p class="price"><strong>{{ formatPrice(product.price) }}</strong></p>
                <button
                  class="cta-button"
                  @click="addToCart(product)"
                  :disabled="shopDisabled"
                >
                  <i class="fas fa-shopping-cart"></i>
                  {{ shopDisabled ? "Zurzeit nicht verfügbar" : "In den Warenkorb" }}
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
              <p class="price"><strong>{{ formatPrice(product.price) }}</strong></p>
              <button
                class="cta-button"
                @click="addToCart(product)"
                :disabled="shopDisabled"
              >
                <i class="fas fa-shopping-cart"></i>
                {{ shopDisabled ? "Zurzeit nicht verfügbar" : "In den Warenkorb" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Hinweise -->
      <div class="zusatzstoff-hinweis">
        <h2>Wichtige Hinweise</h2>
        <p>
          Unsere Gerichte enthalten verschiedene Zusatzstoffe:
          <br />1 = Farbstoff, 2 = Konservierungsstoff, 3 = Geschmacksverstärker, 4 = Säuerungsmittel,
          <br />5 = Süßungsmittel, 6 = Alkohol, 7 = Milch / Laktose, 8 = Gluten, 9 = Senf, 10 = Krustentiere
        </p>
        <hr />
        <p class="ki-hinweis" style="margin-top: 1em;">
          * Bitte beachten Sie: Die dargestellten Bilder wurden teilweise mithilfe einer KI erstellt.
        </p>
      </div>
    </div>

    <!-- Slot MUSS direktes Kind bleiben -->
    <template #overlay>
      <div v-if="!pinnedVisible"
           class="shop-sticker-container"
           :style="{ transform: 'translateY(' + discountStickerOffset + 'px)', opacity: discountStickerOpacity }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="400"
          height="400"
          viewBox="0 0 256 256"
          xml:space="preserve"
        >
          <g transform="translate(1.4066, 1.4066) scale(2.81)">
            <path
              d="M49.526 2.698l5.705 6.768c1.357 1.61 3.467 2.378 5.541 2.017l8.721-1.517c3.615-.629 6.926 2.149 6.934 5.819l.02 8.852c.005 2.105 1.127 4.05 2.948 5.107l7.656 4.443c3.174 1.842 3.924 6.098 1.572 8.915l-5.674 6.793c-1.35 1.616-1.74 3.827-1.024 5.807l3.009 8.325c1.247 3.451-.914 7.194-4.526 7.839l-8.714 1.557c-2.073.37-3.793 1.813-4.517 3.79l-3.046 8.311c-1.263 3.446-5.324 4.924-8.506 3.096l-7.676-4.409c-1.826-1.049-4.071-1.049-5.897 0l-7.676 4.409c-3.182 1.828-7.243.35-8.506-3.096l-3.046-8.311c-.725-1.977-2.444-3.42-4.517-3.79l-8.714-1.557c-3.613-.645-5.773-4.388-4.526-7.839l3.009-8.325c.716-1.98.326-4.191-1.024-5.807l-5.674-6.793c-2.353-2.816-1.602-7.073 1.572-8.915l7.656-4.443c1.821-1.057 2.944-3.001 2.948-5.107l.02-8.852c.008-3.67 3.319-6.448 6.934-5.819l8.721 1.517c2.074.361 4.184-.407 5.541-2.017l5.705-6.768c2.365-2.806 6.687-2.806 9.051 0z"
              fill="#FFDD4D"
            />
          </g>
          <g transform="rotate(-10,12,120) translate(4,10)">
            <text
              x="50%"
              y="40%"
              text-anchor="middle"
              dominant-baseline="middle"
              font-family="Arial"
              font-size="35"
              font-weight="bold"
              fill="#03305D"
            >
              <tspan x="50%" dy="0" font-size="60">10%</tspan>
              <tspan x="50%" dy="1.2em">Rabatt</tspan>
              <tspan x="50%" dy="1.5em" font-size="25" font-weight="normal">
                auf alle online
              </tspan>
              <tspan x="50%" dy="1.2em" font-size="25" font-weight="normal">
                Bestellungen
              </tspan>
            </text>
          </g>
        </svg>
      </div>
    </template>
  </BasePage>
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
import { useCartStore } from "@/stores/cart";

export default {
  components: { BasePage, Swiper, SwiperSlide },
  setup() {
    const cartStore = useCartStore();
    const products = ref(staticProducts);

    // Shop-Sperre (Wartungsmodus)
    const shopDisabled = ref(true);

    const selectedCategory = ref("");
    const categoryRefs = {};
    const categoryTabsContainer = ref(null);

    const pinnedVisible = ref(false);
    const showScrollTop = ref(false);
    const showLeftArrow = ref(false);
    const showRightArrow = ref(false);

    // Reaktive Variable für das Scrollen
    const scrollY = ref(0);
    const discountStickerOffset = computed(() => scrollY.value * 0.5);
    const discountStickerOpacity = computed(() => {
      if (scrollY.value < 300) return 1;
      const extra = scrollY.value - 300;
      return Math.max(0, 1 - extra / 200);
    });

    // Mengensteuerung
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
      if (shopDisabled.value) {
        alert("Der Online-Shop ist momentan nicht verfügbar. Bitte versuchen Sie es später erneut.");
        return;
      }
      cartStore.addItemWithQuantity(product, getQuantity(product));
      window.dispatchEvent(new CustomEvent('cart-item-added'));
    };

    const formatPrice = (val) => val.toFixed(2).replace(".", ",") + " €";

    const handleScroll = () => {
      scrollY.value = window.scrollY;
      const threshold = window.innerWidth < 768 ? 800 : 1500;
      pinnedVisible.value = window.scrollY > threshold;
      showScrollTop.value = window.scrollY > 200;
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
      Object.keys(categoryRefs).forEach(cat => {
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
    const categories = ["Fisch", "Fleisch", "Vegetarisch", "Dips", "Desserts", "Getränke"];

    const popularProducts = computed(() =>
      products.value.filter(p =>
        ["Kibbelinge", "Ras-Fritten", "Rahmschnitzel", "Fischbrötchen", "Schokoladenkuchen", "Hauswein"].includes(p.name)
      )
    );

    const productsByCategory = (cat) =>
      products.value.filter(prod => prod.category === cat);

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
      // state
      shopDisabled,
      products,
      selectedCategory,
      categories,
      popularProducts,
      cartVisible,
      itemsCount,
      pinnedVisible,
      showScrollTop,
      slidesPerView,
      categoryTabsContainer,
      showLeftArrow,
      showRightArrow,
      scrollY,
      discountStickerOffset,
      discountStickerOpacity,
      // methods
      productsByCategory,
      addToCart,
      formatPrice,
      setCategoryRef,
      selectCategory,
      scrollLeft,
      scrollRight,
      updateArrowVisibility,
      increaseQty,
      decreaseQty,
      getQuantity,
      scrollToTop,
      // swiper modules
      Pagination,
      Navigation,
    };
  },
};
</script>

<style scoped>
.shop-sticker-container {
  position: fixed;
  top: 42vh;
  left: 4vw;
  width: 9em;
  height: 12em;
  z-index: 500;
  transition: none !important;
  animation: none !important;
}

.shop-sticker-container svg {
  width: 100%;
  height: 100%;
}

@media (min-width: 1200px) {
  .shop-sticker-container {
    position: fixed;
    top: 15vh;
    width: 20em;
    height: 25em;
    z-index: 2500;
    transition: none !important;
    animation: none !important;
  }
}

/* Wartungshinweis */
.shop-alert {
  max-width: 860px;
  margin: 1.5rem auto 2rem;
  padding: 1.25rem 1rem;
  border-radius: 14px;
  border: 1px solid #ffe1a6;
  background: #fff7e0;
  color: #5b4100;
  text-align: center;
}
.shop-alert h2 {
  margin: 0 0 .5rem;
  font-size: 1.3rem;
}
.shop-alert .small {
  margin-top: .5rem;
  font-size: .9rem;
  color: #6b5a2a;
}

/* Basis-Stile für die Seite */
.big-title-3 {
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  color: var(--blue);
}

.opening-hours-note{
  text-align:center;
  font-size:.9rem;
  color:#555;
  margin:-0.3rem 0 1.2rem;
}
.opening-hours-note strong{color:#004a7f;}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.category-section {
  scroll-margin-top: 10rem;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: calc(100% - 2em);
}

/* Tablet-Geräte */
@media (min-width: 768px) and (max-width: 1199px) {
  .pinned-category-tabs {
    top: 6em;
  }

  .shop-sticker-container {
    position: fixed;
    top: 15vh;
    width: 14em;
    height: 25em;

  }
}

/* Desktop */
@media (min-width: 1200px) {
  .pinned-category-tabs {
    top: 7.6em;
    width: calc(100% - 4em);
  }
  .category-section {
    scroll-margin-top: 13rem;
  }
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
  background: rgba(255, 255, 255, 0.65);
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
  max-width: 95vw;
  margin: 0 auto 30px;
  padding-top: 2em;
  overflow: visible;
  position: relative;
}
.my-swiper {
  width: 100%;
  margin: 0 auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin: 0 auto;
}

@media (min-width: 1200px) {
  .product-grid {
    max-width: calc(100% - 2em);
  }
  .swiper-section {
    max-width: 85vw;
  }
}

.product-card {
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 20px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 20em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
  flex: 0 0 auto;
  height: 10em;
  overflow: hidden;
  border-radius: 20px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 900px) {
  .image-container {
    height: 15em;
  }
  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 23em;
  }
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
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: var(--blue);
}
.description-swiper,
.description {
  font-size: 0.9rem;
  font-style: italic;
  color: #666;
  flex-grow: 1;
  min-height: 5em;
  max-height: 5em;
  overflow: hidden;
  padding: 0 0.5em;
}
.product-info .price {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--blue);
  padding-bottom: 0.5em;
}
.zusatzstoffe {
  font-size: 0.7rem;
  color: #999;
  margin-bottom: 1em;
}

.common-info .info-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5em;
  padding: 0 1.3em 1em 1.3em;
}

@media (min-width: 1200px) {
  .common-info .info-bottom {
    padding: 1em 4em 2em 4em;
  }
  .product-info h3 {
    min-height: 3em;
  }
}

.cta-button {
  margin: 0 auto;
  font-family: 'Poppins';
  font-size: 1em;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-bottom: 1em;
}
.cta-button[disabled] {
  opacity: .5;
  cursor: not-allowed;
  transform: none !important;
}

.open-cart-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--blue);
  color: #fff;
  border: 3px solid var(--background);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  font-size: 0.7em;
}
.open-cart-btn i {
  font-size: 3rem !important;
}
.open-cart-btn .cart-badge {
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;
  background-color: red;
  color: #fff;
  font-size: 1rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.scroll-top-btn:hover {
  background: var(--blue);
  color: #fff;
}

::v-deep .swiper-button-prev,
::v-deep .swiper-button-next {
  display: none !important;
}

.zusatzstoff-hinweis {
  background-color: #fafafa;
  border: 1px solid #eee;
  padding: 1em;
  margin: 2em auto;
  max-width: 700px;
  border-radius: 10px;
}
.zusatzstoff-hinweis h2 {
  font-size: 1.3rem;
  color: var(--blue);
  margin-bottom: 0.5em;
}
.zusatzstoff-hinweis p {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #666;
  white-space: pre-line;
}
</style>
