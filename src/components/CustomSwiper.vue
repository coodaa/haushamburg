<template>
  <swiper
    :slides-per-view="slidesPerView"
    :space-between="30"
    :loop="true"
    :navigation="true"
    :pagination="{ clickable: true }"
    :modules="[Pagination, Navigation]"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, index) in items" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.alt" class="carousel-image" />
      </a>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules"; // 
import "swiper/swiper-bundle.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    items: Array,
    slidesPerView: Number,
  },
  setup() {
    return {
      Pagination,
      Navigation,
    };
  },
};
</script>
