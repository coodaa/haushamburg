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
            alt="Außenansicht vom Fischrestaurant Haus Hamburg in der Altstadt von Leer"
            class="inverted-radius"
          />
        </div>
      </section>

      <!-- Restaurant-Sektion -->
      <section class="restaurant-section">
        <div class="restaurant-content">
          <h2 class="restaurant-heading big-title-3">das restaurant</h2>
          <div class="restaurant-text">
            <p>
              Willkommen im <strong>Haus Hamburg</strong> – Ihrem <strong>Fischrestaurant in Leer</strong>, Ostfriesland.
              Bei uns erwarten Sie <strong>frisch zubereitete Fischgerichte</strong>, <strong>vegetarische Spezialitäten</strong>
              und ein <strong>Online-Bestellservice</strong> mit <strong>Lieferung nach Hause</strong> in Leer.
            </p>
            <p>
              Auch Vegetarier sind bei uns herzlich willkommen. Unser Angebot umfasst eine Auswahl an
              <strong>vegetarischen Gerichten</strong>.
            </p>

            <p><strong>Wir freuen uns auf Ihren Besuch im Haus Hamburg in Leer!</strong></p>
          </div>
        </div>
        <img
          src="/images/restaurant/haus-hamburg-leer-innen.webp"
          alt="Innenansicht des Restaurants Haus Hamburg in Leer"
          class="restaurant-image"
        />
      </section>

      <!-- Speisekarte-Sektion -->
      <section class="svg-section">
        <div class="scalloped-svg"></div>
      </section>

      <!-- Beliebte Produkte -->
      <Favorites
        :popularProducts="popularProducts"
        :slidesPerView="slidesPerView"
        :formatPrice="formatPrice"
        :addToCart="addToCart"
      />

      <!-- Kundenbewertungen -->
      <section class="review-section">
        <Review />
      </section>
    </main>
  </div>
</template>

<script>
import { useHead } from '@vueuse/head';
import Review from "../components/Review.vue";
import Favorites from "@/components/FavoriteProducts.vue";
import staticProducts from "@/data/products.json";

export default {
  name: "Home",
  components: {
    Review,
    Favorites,
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
      slidesPerView: 1,
      wordInterval: null,
      products: staticProducts,
    };
  },
  computed: {
    popularProducts() {
      const popularNames = [
        "Kibbelinge",
        "Ras Fritten",
        "Fischbrötchen mit Backfisch",
        "Hauswein"
      ];
      return this.products.filter(product =>
        popularNames.includes(product.name)
      );
    }
  },
  mounted() {
    this.startWordAnimation();
    this.updateSlidesPerView();
    window.addEventListener("resize", this.updateSlidesPerView);
  },
  setup() {
    useHead({
      title: "Haus Hamburg – Fischrestaurant in Leer | Online-Bestellung & Catering",
      meta: [
        {
          name: "description",
          content: "Fischrestaurant Haus Hamburg in Leer: Online-Bestellung mit PayPal, SEPA oder Kreditkarte. Frischer Fisch, vegetarisch, Catering-Service & Lieferung."
        },
        {
          name: "keywords",
          content: "Haus Hamburg, Fischrestaurant Leer, Fisch bestellen Leer, Catering Leer, Online Fischbestellung, Altstadt Leer, vegetarisch, PayPal, Kreditkarte, SEPA"
        },
        {
          property: "og:title",
          content: "Haus Hamburg – Fischrestaurant in Leer"
        },
        {
          property: "og:description",
          content: "Genießen Sie frischen Fisch & vegetarische Küche in Leer. Jetzt auch online bestellen oder Catering anfragen."
        },
        {
          property: "og:image",
          content: "https://www.haus-hamburg-leer.de/images/social/og-image.jpg"
        },
        {
          property: "og:url",
          content: "https://www.haus-hamburg-leer.de"
        }
      ]
    });
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
    formatPrice(val) {
      return val.toFixed(2).replace(".", ",") + " €";
    },
    addToCart(product) {
      console.log("Produkt in den Warenkorb gelegt:", product);
    }
  },
  beforeUnmount() {
    if (this.wordInterval) {
      clearInterval(this.wordInterval);
    }
    window.removeEventListener("resize", this.updateSlidesPerView);
  }
};
</script>


<style scoped>
/* Header-Row */
.header-row {
  margin-top: 17vh !important;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

/* Hero-Bereich */
.hero {
  padding: 0 1em;
  box-sizing: border-box;
}

/* Titel-Stile */
.big-title {
  white-space: nowrap;
  margin-left: -1.5px;
}

.big-title-2 {
  position: absolute;
  right: 0.185em;
  margin-top: -0.2em !important;
  text-align: right;
  padding: 0;
  box-sizing: border-box;
}

.big-title-4 {
  margin-top: 0em;
}

/* Bildcontainer */
.image-container {
  margin-top: -0.5em;
  padding: 0 1em;
  box-sizing: border-box;
}

.inverted-radius {
  --r: 20px;
  --s: 20px;
  --x: 30vw;
  --y: 4vh;
  width: 100%;
  height: 55vh;
  max-height: 80vh;
  border-radius: var(--r);
  --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%, #0000 72%);
  --_g: conic-gradient(at calc(100% - var(--r)) var(--r), #0000 25%, #000 0);
  --_d: (var(--s) + var(--r));
  mask:
    calc(100% - var(--_d) - var(--x)) 0 var(--_m),
    100% calc(var(--_d) + var(--y)) var(--_m),
    radial-gradient(var(--s) at 100% 0, #0000 99%, #000 calc(100% + 1px))
      calc(-1 * var(--r) - var(--x)) calc(var(--r) + var(--y)),
    var(--_g) calc(-1 * var(--_d) - var(--x)) 0,
    var(--_g) 0 calc(var(--_d) + var(--y));
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  object-fit: cover;
  object-position: top;
}

@media (min-width: 1024px) {
  .inverted-radius {
    max-height: 50vh;
    object-position: top;
  }
}

/* Animationen */
@keyframes wobble {
  0% {
    transform: rotate(var(--rotation-start, 0deg));
  }
  25% {
    transform: rotate(calc(var(--rotation-start, 0deg) - 5deg));
  }
  50% {
    transform: rotate(calc(var(--rotation-start, 0deg) + 3deg));
  }
  75% {
    transform: rotate(calc(var(--rotation-start, 0deg) - 2deg));
  }
  100% {
    transform: rotate(var(--rotation-start, 0deg));
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOutUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

@keyframes textWobble {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(3px);
  }
  75% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
}

/* Blase und Text */
.looping-bubble {
  background: #87CEFA;
  border-radius: 20em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bubble-text {
  display: none;
}

.bubble-text.animate-in {
  animation: fadeInUp 0.5s ease-in-out forwards, textWobble var(--animation-text-bounce-smooth);
}

.bubble-text.animate-out {
  animation: fadeOutUp 0.5s ease-in-out forwards;
}

.fisch-icon {
  width: 3.5em;
  height: auto;
  transition: transform 0.5s ease-in-out;
}

.fisch-icon.wobble {
  animation: wobble var(--animation-text-bounce-smooth) forwards;
}

/* Restaurant-Sektion */
.restaurant-section, .review-section {
  background-color: var(--beige);
  border-radius: 20px;
  padding: 1em;
  padding-top: 5em;
  margin-top: -4em;
}

.review-section {
  padding-top: 2em;
  border-bottom-right-radius: 0px ;
  border-bottom-left-radius: 0px ;
  margin-top: 2em;
  margin-bottom: -1em;
}

.restaurant-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.restaurant-heading {
  align-self: flex-start;
  margin: 0;
  font-size: calc(var(--title-size)*0.65);
}

.restaurant-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
  margin-bottom: 1em;
}

.restaurant-text p {
  text-align: left;
  margin: 1em 0;
  font-size: calc(var(--title-size) * 0.2);
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-hyphens: auto;
  hyphens: auto;
}

/* SVG-Sektion */
.svg-section {
  position: relative;
  padding: 2em 1em 1em 1em;
  margin-top: -1em;
}

.svg-section .scalloped-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/dropround.svg');
  background-repeat: repeat-x;
  background-position: top left;
  z-index: 0;
}

.svg-section .section-food {
  position: relative;
  z-index: 1;
  padding-top: 1em;
  color: var(--blue);
}

/* Fischbrötchen Galerie */
.fischbroetchen-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
  margin-top: 1em;
}

.fischbroetchen {
  width: 100%;
  max-width: 300px;
  border-radius: 20px;
  object-fit: cover;
}

/* Swiper Carousel Styles */
.mySwiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.carousel-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.carousel-image:hover {
  transform: scale(1.05);
}

/* Tablet Styles */
@media (min-width: 600px) and (max-width: 1023px) {
  .header-row {
    margin-top: 15vh !important;
  }

  .hero {
    position: relative;
    padding: 0em 8em;
  }

  .big-title-2 {
    padding: 0em 1.5em;
  }

  .looping-bubble {
    background: #87CEFA;
    padding: 0.5em 2em;
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    min-width: 15em;
  }

  .bubble-text {
    text-align: left;
    font-size: calc(0.3 * 10vh);
    line-height: 1;
    white-space: nowrap;
    display: inline-block;
    padding-left: 0.5em;
  }

  .image-container {
    padding-top: 0.9em;
  }
}

/* Desktop Styles */
@media (min-width: 1024px) {
  .hero {
    position: relative;
    padding: 2em 10em 0;
  }

  .title-base {
    font-size: 13vw;
  }

  .big-title-2 {
    padding: 0em 0.6em;
  }

  .inverted-radius {
    --r: 40px;
    --s: 40px;
    --x: 25vw;
    --y: 5vh;
    max-height: 55vh;
    object-position: top;
  }

  .image-container {
    padding: 1em 2em;
  }

  .looping-bubble {
    background: #87CEFA;
    border-radius: 20em;
    padding: 0.5em 2em;
    margin-left: 0.5em;
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    min-width: 19em;
  }

  .fisch-icon {
    justify-self: end;
    width: 7em;
    height: auto;
  }

  .bubble-text {
    text-align: left;
    font-size: calc(0.3 * 10vh);
    line-height: 1;
    white-space: nowrap;
    display: inline-block;
    padding-left: 0.5em;
  }

  .restaurant-section {
    padding: 6em 2em;
  }

  .restaurant-text p {
    margin-top: 0.5em;
  }

  .restaurant-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 6em;
    gap: 2em;
  }

  .restaurant-heading {
    margin: 0 1em 0 0;
  }

  .restaurant-text {
    max-width: 96%;
    flex: 1;
    font-size: calc(var(--title-size)*0.18);
  }

  .restaurant-image {
    width: 100%;
    height: auto;
    border-radius: 20px;
    margin-top: 2em;
  }

  .section-food {
    padding: 1em 0.25em;
  }
}

@media (min-width: 1400px) {
  .title-base {
    font-size: 12vw;
  }

  .inverted-radius {
    --r: 50px;
    --s: 50px;
    --x: 25vw;
    --y: 7vh;
    max-height: 55vh;
    object-position: top;
  }

  .looping-bubble {
    padding: 0em 1em;
    margin-left: 0.5em;
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    min-width: 19em;
  }

  .fisch-icon {
    width: 10em;
  }

  .bubble-text {
    font-size: calc(0.7 * 10vh);
  }

  .image-container {
    padding: 1em 2em;
  }
}

@media (min-width: 1700px) {
  .inverted-radius {
    --x: 25vw;
    --y: 10vh;
  }

  .looping-bubble {
    padding: 1em 3em;
    margin-right: 4em;
  }

  .image-container {
    padding: 0em 2em;
  }
}
</style>
