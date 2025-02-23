<template>
  <div>
    <!-- Header-Bereich -->
    <header class="hero header-row">
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
    </header>

    <!-- Hauptinhalt -->
    <main>
      <!-- Bildcontainer mit H2 -->
      <section class="image-container">
        <h2 class="title-base big-title big-title-2">tisch</h2>
        <div class="home-container">
          <img
            src="/images/outside/haus-hamburg-leer-start.webp"
            alt="Haus Hamburg"
            class="inverted-radius"
          />
        </div>
      </section>

      <!-- Restaurant-Sektion -->
      <section class="restaurant-section">
        <div class="restaurant-content">
          <!-- Verwende hier idealerweise ein H2 statt H3, um die Hierarchie konsistent zu halten -->
          <h2 class="restaurant-heading big-title-3">das restaurant</h2>
          <div class="restaurant-text">
            <p>
              Entdecken Sie das <strong>authentische Norddeutschland</strong> im Haus Hamburg, Ihrem Fischrestaurant mitten in der charmanten Altstadt von Leer, Ostfriesland.
              Bei uns erwarten Sie nicht nur fangfrische Fischspezialitäten, sondern auch eine Vielfalt an norddeutschen Köstlichkeiten.
            </p>
            <p>
              Auch Vegetarier sind bei uns herzlich willkommen. Unser Menü bietet eine Auswahl an kreativen, vegetarischen Gerichten.
            </p>
            <p><strong>Wir freuen uns darauf, Sie in unserem gemütlichen Restaurant begrüßen zu dürfen!</strong></p>
          </div>
        </div>
        <img
          src="/images/restaurant/haus-hamburg-leer-innen.webp"
          alt="Restaurant Innenansicht"
          class="restaurant-image"
        />
      </section>

      <!-- Speisekarte-Sektion -->
      <section class="svg-section">
        <div class="scalloped-svg"></div>
        <div class="section-food big-title-4">
          <h2>aus der speisekarte</h2>
          <!-- Swiper Carousel -->
          <CustomSwiper :items="selection" :slides-per-view="slidesPerView" />
          <!-- CTA-Button für die Speisekarte -->
          <div class="menu-button-container">
            <button class="cta-button" @click="goToSpeisekarte">
              <i class="fas fa-fish"></i>
              <span class="cta-text"> mee(h)r</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Kundenbewertungen -->
      <Review />
    </main>
  </div>
</template>

<script>
import CustomSwiper from "../components/CustomSwiper.vue";
import "../styles/Home.css";
import Review from "../components/Review.vue";

export default {
  name: "Home",
  components: {
    CustomSwiper,
    Review,
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
        { image: "/images/food/haus-hamburg-leer-18.webp", alt: "Fischbrötchen 1", link: "/speisekarte" },
        { image: "/images/food/haus-hamburg-leer-30.webp", alt: "Fischbrötchen 2", link: "/speisekarte" },
        { image: "/images/food/haus-hamburg-leer-37.webp", alt: "Fischbrötchen 3", link: "/speisekarte" },
        { image: "/images/food/haus-hamburg-leer-28.webp", alt: "Fischbrötchen 4", link: "/speisekarte" },
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
    goToSpeisekarte() {
      this.$router.push("/speisekarte");
    },
  },
  beforeUnmount() {
    if (this.wordInterval) {
      clearInterval(this.wordInterval);
    }
    window.removeEventListener("resize", this.updateSlidesPerView);
  },
};
</script>
