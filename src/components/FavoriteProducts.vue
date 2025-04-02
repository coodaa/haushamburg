<template>
  <div class="fp-favorite-products">
    <h2 class="big-title-3">unser ausser haus service</h2>
    <div class="fp-swiper-section">
      <swiper
        :slides-per-view="slidesPerView"
        :space-between="15"
        :loop="true"
        navigation
        pagination
        class="fp-my-swiper"
      >
        <swiper-slide
          v-for="(product, index) in popularProducts"
          :key="index"
          class="fp-swiper-slide"
        >
          <div class="fp-product-card">
            <div class="fp-image-container">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="fp-product-info fp-common-info">
              <h3>{{ product.name }}</h3>
              <p class="fp-description-swiper">{{ product.description }}</p>
              <p
                v-if="product.zusatzstoffe && product.zusatzstoffe.length"
                class="fp-zusatzstoffe"
              >
                Zusatzstoffe: {{ product.zusatzstoffe.join(", ") }}
              </p>
              <p v-else style="visibility: hidden;">Zusatzstoffe:</p>
              <p class="fp-price">
                <strong>{{ formatPrice(product.price) }}</strong>
              </p>
              <button class="cta-button" @click="handleAddToCart(product)">
                <i class="fas fa-shopping-cart"></i> Warenkorb
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <div class="menu-button-container">
    <button class="cta-button" @click="$router.push('/shop')">
      <i class="fas fa-fish"></i>
      <span class="cta-text">hier bestellen</span>
      <i class="fas fa-fish" style="transform: scaleX(-1);"></i>
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  name: "FavoriteProducts",
  components: { Swiper, SwiperSlide },
  props: {
    popularProducts: {
      type: Array,
      required: true
    },
    slidesPerView: {
      type: [Number, String],
      default: 3
    },
    formatPrice: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const cartStore = useCartStore();

    // Diese Funktion fügt den Artikel mit einer Standardmenge (hier 1) in den Warenkorb.
    const handleAddToCart = (product) => {
      cartStore.addItemWithQuantity(product, 1);
      // Optional: Du kannst hier auch ein globales Event dispatchen,
      // um z. B. ein Feedback (wie ein Toast) anzuzeigen:
      window.dispatchEvent(new CustomEvent('cart-item-added'));
    };

    return { Pagination, Navigation, handleAddToCart };
  }
});
</script>

<style scoped>
/* Sicherstellen, dass die Überschrift immer zentriert ist */
.fp-favorite-products .big-title-3 {
  text-align: center !important;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  color: var(--blue);
}

/* Swiper-Bereich */
.fp-swiper-section {
  max-width: 90vw;
  margin: 0 auto 30px;
  padding-top: 2em;
  overflow: visible;
  position: relative;
}

.fp-my-swiper {
  width: 100%;
  margin: 0 auto;
}

/* Produktkarte */
.fp-product-card {
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
  text-align: center;
}

.fp-product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.fp-image-container {
  flex: 0 0 auto;
  height: 15em;
  overflow: hidden;
  border-radius: 20px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fp-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fp-product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 0.5em;
  text-align: center;
}

.fp-product-info h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: var(--blue);
}

.fp-description-swiper {
  font-size: 0.9rem;
  font-style: italic;
  color: #666;
  flex-grow: 1;
  min-height: 5em;
  max-height: 5em;
  overflow: hidden;
  padding: 0 0.5em;
}

.fp-zusatzstoffe {
  font-size: 0.7rem;
  color: #999;
  margin-bottom: 1em;
}

.fp-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--blue);
  padding-bottom: 0.5em;
}

/* Warenkorb-Button innerhalb der Karte */
.fp-product-info .cta-button {
  max-width: 180px;
  width: auto;
  margin: 0.5em auto 0;
  padding: 0.5em 1em;
  font-family: 'Poppins';
  font-size: 1em;
  border: none;
}

/* CTA-Button für den Online-Bestellbereich */
.menu-button-container {
  display: flex;
  justify-content: center;
  margin-top: 0.5em;
  margin-bottom: 3em;
}

.menu-button-container .cta-button:hover,
.menu-button-container .cta-button:focus {
  background-color: var(--gold);
  transform: scale(1.05);
}

.cta-text {
  font-size: 1.3em;
}

::v-deep .swiper-button-prev,
::v-deep .swiper-button-next {
  display: none !important;
}

@media (min-width: 1200px) {
  .fp-swiper-section {
    max-width: 85vw;
  }
}
</style>
