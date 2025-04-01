<template>
  <div class="favorites-swiper">
    <h2 class="big-title-3">Unsere Favoriten</h2>
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
          v-for="(product, index) in products"
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
              <button class="cta-button" @click="handleAddToCart(product)">
                <i class="fas fa-shopping-cart"></i>Warenkorb
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default defineComponent({
  name: "FavoritesSwiper",
  components: { Swiper, SwiperSlide },
  props: {
    products: {
      type: Array,
      required: true,
    },
    slidesPerView: {
      type: Number,
      default: 3,
    },
    addToCart: {
      type: Function,
      required: true,
    },
    formatPrice: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleAddToCart(product) {
      this.addToCart(product);
    },
  },
});
</script>

<style scoped>
.favorites-swiper {
  margin-bottom: 2rem;
}

.my-swiper {
  width: 100%;
  margin: 0 auto;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 20px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-container {
  height: 10em;
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
  margin-top: 0.5em;
}

.description-swiper {
  font-size: 0.9rem;
  font-style: italic;
  color: #666;
  min-height: 5em;
  max-height: 5em;
  overflow: hidden;
  padding: 0.5em;
}

.price {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--blue);
  padding-bottom: 0.5em;
}

.cta-button {
  font-size: 1em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
</style>
