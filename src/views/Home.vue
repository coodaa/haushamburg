<template>
  <div>
    <!-- Header-Row mit H1 und Blase -->
    <div class="header-row">
      <h1 class="title-base big-title">herz, küche,</h1>
      <div class="looping-bubble">
        <!-- Dynamische Wörter mit Animationsklasse -->
        <span
          class="bubble-text"
          :class="{ animate: animateText }"
          @animationend="resetAnimation"
        >
          {{ currentWord }}
        </span>
        <img
          src="@/assets/fish.svg"
          alt="Fisch Icon"
          class="fisch-icon"
        />
      </div>
    </div>

    <!-- Bildcontainer mit H2 -->
    <div class="image-container">
      <h2 class="title-base big-title big-title-2">tisch</h2>
      <div class="home-container">
        <img
          src="@/assets/images/1.jpg"
          alt="Haus Hamburg"
          class="inverted-radius"
        />
      </div>
    </div>
  </div>
</template>

<script>
import '../styles/Home.css'

export default {
  name: 'Home',
  data() {
    return {
      words: ["Moin!", "Willkommen!", "Ahoi!", "Hallo!"], // Liste der Wörter
      currentIndex: 0, // Index des aktuellen Wortes
      currentWord: "Moin!", // Aktuelles Wort
      animateText: false, // Animationsstatus
    };
  },
  mounted() {
    this.startWordAnimation();
  },
  methods: {
    startWordAnimation() {
      setInterval(() => {
        // Trigger Animation
        this.animateText = true;

        // Wechselt zum nächsten Wort
        this.currentIndex = (this.currentIndex + 1) % this.words.length;
        this.currentWord = this.words[this.currentIndex];
      }, 1000); // Wechselt alle 3 Sekunden
    },
    resetAnimation() {
      // Setzt die Animation zurück, damit sie erneut ausgelöst wird
      this.animateText = false;
    },
  },
};
</script>
