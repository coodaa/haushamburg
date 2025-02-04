<template>
  <div>
    <!-- Header-Row mit H1 und Blase -->
    <div class="hero header-row">
      <h1 class="title-base big-title">herz, küche,</h1>
      <div class="looping-bubble">
        <span
          v-if="previousWordVisible"
          class="bubble-text animate-out"
          @animationend="handleFadeOutEnd"
        >
          {{ previousWord }}
        </span>
        <span v-if="currentWordVisible" class="bubble-text animate-in">
          {{ currentWord }}
        </span>
        <img
          src="@/assets/fishcircle.svg"
          alt="Fisch Icon"
          class="fisch-icon"
          :class="{ wobble: isWobbling }"
          :style="{ transform: `rotate(${rotation}deg)` }"
        />
      </div>
    </div>

    <!-- Bildcontainer mit H2 -->
    <div class="image-container">
      <h2 class="title-base big-title big-title-2">tisch</h2>
      <div class="home-container">
        <img
          src="/images/outside/haushamburgstart.webp"
          alt="Haus Hamburg"
          class="inverted-radius"
        />
      </div>
    </div>

    <!-- Restaurant-Sektion -->
    <section class="restaurant-section">
      <div class="restaurant-content">
        <h3 class="restaurant-heading big-title-3">das restaurant</h3>
        <div class="restaurant-text">
          <p>
            Entdecken Sie das <strong>authentische Norddeutschland</strong> im Haus Hamburg, Ihrem Fischrestaurant mitten in der charmanten Altstadt von Leer, Ostfriesland. Bei uns erwarten Sie nicht nur fangfrische Fischspezialitäten, sondern auch eine Vielfalt an norddeutschen Köstlichkeiten, die mit viel Liebe und regionalen Zutaten zubereitet werden.
          </p>
          <p>
            Auch Vegetarier sind bei uns herzlich willkommen. Unser Menü bietet eine Auswahl an kreativen, vegetarischen Gerichten, die Ihren Besuch zu einem rundum gelungenen Erlebnis machen.
          </p>
          <p>
            Besuchen Sie uns im Haus Hamburg und erleben Sie Norddeutschland von seiner köstlichsten Seite.
          </p>
          <p>
            <strong>Wir freuen uns darauf, Sie in unserem gemütlichen Restaurant begrüßen zu dürfen!</strong>
          </p>
        </div>
      </div>
      <img src="/images/restaurant/haus_hamburg_leer_003_a.webp" alt="Restaurant" class="restaurant-image" />
    </section>


<!-- Unsere Auswahl (Speisekarte) Sektion mit Carousel -->
<section class="svg-section">
  <div class="scalloped-svg"></div>
  <div class="section-food big-title-4">
    <h2>die speisekarte</h2>

    <!-- Swiper Carousel -->
    <CustomSwiper :items="selection" :slides-per-view="slidesPerView" />

    <!-- CTA-Button für die Speisekarte -->
    <div class="menu-button-container">
      <a href="/speisekarte" class="cta-button">
        <i class="fas fa-fish"></i>
        <span class="cta-text"> mee(h)r</span>
      </a>
    </div>
  </div>
</section>

 </div>
</template>

<script>
import CustomSwiper from "../components/CustomSwiper.vue";
import "../styles/Home.css";

export default {
  name: "Home",
  components: {
    CustomSwiper,
  },
  data() {
    return {
      words: ["Moin!", "Ahoi!", "Hallo!"],
      currentIndex: 0,
      currentWord: "Moin!",
      previousWord: "",
      currentWordVisible: true,
      previousWordVisible: false,
      rotation: 0,
      rotationDirection: 1,
      isWobbling: false,
      selection: [
        { image: "/images/food/haus_hamburg_leer_018.webp", alt: "Fischbrötchen 1", link: "/speisekarte" },
        { image: "/images/food/haus_hamburg_leer_030.webp", alt: "Fischbrötchen 2", link: "/speisekarte" },
        { image: "/images/food/haus_hamburg_leer_037.webp", alt: "Fischbrötchen 3", link: "/speisekarte" },
        { image: "/images/food/haus_hamburg_leer_028.webp", alt: "Fischbrötchen 3", link: "/speisekarte" },

      ],
      slidesPerView: 1,
      wordInterval: null,
    };
  },
  mounted() {
    this.startWordAnimation();
    this.updateSlidesPerView();
    window.addEventListener("resize", this.updateSlidesPerView);
  },
  methods: {
    startWordAnimation() {
      this.wordInterval = setInterval(() => {
        this.previousWord = this.currentWord;
        this.previousWordVisible = true;
        this.currentIndex = (this.currentIndex + 1) % this.words.length;
        this.currentWord = this.words[this.currentIndex];
        this.currentWordVisible = false;

        this.rotation += 15 * this.rotationDirection;
        if (this.rotation >= 30 || this.rotation <= -30) {
          this.rotationDirection *= -1;
        }

        this.updateRotationVariable();
        this.triggerWobble();

        setTimeout(() => {
          this.previousWordVisible = false;
          this.currentWordVisible = true;
        }, 500);
      }, 3000);
    },
    updateRotationVariable() {
      document.documentElement.style.setProperty("--rotation-start", `${this.rotation}deg`);
    },
    triggerWobble() {
      setTimeout(() => {
        this.isWobbling = true;
        setTimeout(() => {
          this.isWobbling = false;
        }, 500);
      }, 500);
    },
    handleFadeOutEnd() {
      this.previousWordVisible = false;
    },
    updateSlidesPerView() {
      const width = window.innerWidth;
      this.slidesPerView = width >= 1700 ? 4 : width >= 1400 ? 3 : width >= 1024 ? 2 : 1;
    },
  },
  beforeUnmount() {
    clearInterval(this.wordInterval);
    window.removeEventListener("resize", this.updateSlidesPerView);
  },
};
</script>
