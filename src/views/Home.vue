<template>
  <div>
    <!-- Header-Row mit H1 und Blase -->
    <div class="header-row">
      <h1 class="title-base big-title">herz, küche,</h1>
      <div class="looping-bubble">
        <!-- Altes Wort mit Fade-out -->
        <span
          v-if="previousWordVisible"
          class="bubble-text animate-out"
          @animationend="handleFadeOutEnd"
        >
          {{ previousWord }}
        </span>
        <!-- Neues Wort mit Fade-in -->
        <span
          v-if="currentWordVisible"
          class="bubble-text animate-in"
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
      words: ["Moin!", "Ahoi!", "Goden Appetit!"], // Liste der Wörter
      currentIndex: 0,
      currentWord: "Moin!",
      previousWord: "",
      currentWordVisible: true,
      previousWordVisible: false,
    };
  },
  mounted() {
    this.startWordAnimation();
  },
  methods: {
    startWordAnimation() {
      setInterval(() => {
        // Wechsel zum nächsten Wort
        this.previousWord = this.currentWord; // Altes Wort setzen
        this.previousWordVisible = true; // Altes Wort sichtbar machen (für Fade-out)
        this.currentIndex = (this.currentIndex + 1) % this.words.length; // Nächster Index
        this.currentWord = this.words[this.currentIndex]; // Neues Wort setzen
        this.currentWordVisible = false; // Neues Wort unsichtbar machen

        // Fade-out starten, neues Wort sichtbar machen nach Fade-out
        setTimeout(() => {
          this.previousWordVisible = false; // Altes Wort ausblenden
          this.currentWordVisible = true; // Neues Wort einblenden
        }, 500); // Wartezeit für Fade-out
      }, 3000); // Wechselt alle 3 Sekunden
    },
    handleFadeOutEnd() {
      this.previousWordVisible = false; // Altes Wort komplett ausblenden
    },
  },
};
</script>
