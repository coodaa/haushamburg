<template>
  <div>
    <!-- Header-Row mit H1 und Blase -->
    <div class="hero header-row">
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
        <!-- Neues Wort mit Fade-in und Nachwackeln -->
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
          src="/images/haushamburgstart.webp"
          alt="Haus Hamburg"
          class="inverted-radius"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      words: ["Moin!", "Ahoi!", "Hallo!"], // Liste der Wörter
      currentIndex: 0,
      currentWord: "Moin!",
      previousWord: "",
      currentWordVisible: true,
      previousWordVisible: false,
      rotation: 0, // Startwinkel für das SVG
      rotationDirection: 1, // Steuerung der Rotationsrichtung: 1 = vorwärts, -1 = rückwärts
      isWobbling: false, // Steuert, ob das SVG nachwackelt
      wordInterval: null, // Referenz für das Intervall
    };
  },
  mounted() {
    this.startWordAnimation();
  },
  methods: {
    startWordAnimation() {
      this.wordInterval = setInterval(() => {
        // Wechsel zum nächsten Wort
        this.previousWord = this.currentWord; // Altes Wort setzen
        this.previousWordVisible = true; // Altes Wort sichtbar machen (für Fade-out)
        this.currentIndex = (this.currentIndex + 1) % this.words.length; // Nächster Index
        this.currentWord = this.words[this.currentIndex]; // Neues Wort setzen
        this.currentWordVisible = false; // Neues Wort unsichtbar machen

        // Rotationswinkel anpassen
        this.rotation += 15 * this.rotationDirection;

        // Richtung wechseln, wenn die Grenze von ±30 Grad erreicht ist
        if (this.rotation >= 30 || this.rotation <= -30) {
          this.rotationDirection *= -1; // Richtung umkehren
        }

        // CSS-Variable für die aktuelle Rotation setzen
        this.updateRotationVariable();

        // Nachwackeln aktivieren, aber erst nach der Drehung
        this.triggerWobble();

        // Fade-out starten, neues Wort sichtbar machen nach Fade-out
        setTimeout(() => {
          this.previousWordVisible = false; // Altes Wort ausblenden
          this.currentWordVisible = true; // Neues Wort einblenden
        }, 500); // Wartezeit für Fade-out
      }, 3000); // Wechselt alle 3 Sekunden
    },
    updateRotationVariable() {
      // Setzt die aktuelle Rotation als CSS-Variable für das Wackeln
      document.documentElement.style.setProperty('--rotation-start', `${this.rotation}deg`);
    },
    triggerWobble() {
      // Aktiviert das Nachwackeln kurz nach der Drehung
      setTimeout(() => {
        this.isWobbling = true; // Wackeln starten
        setTimeout(() => {
          this.isWobbling = false; // Wackeln stoppen
        }, 500); // Nachwackeln dauert 0.5 Sekunden
      }, 500); // Nachwackeln startet 0.5 Sekunden nach der Drehung
    },
    handleFadeOutEnd() {
      this.previousWordVisible = false; // Altes Wort komplett ausblenden
    },
  },
  beforeUnmount() {
    // Intervall beim Zerstören der Komponente löschen, um Speicherlecks zu vermeiden
    clearInterval(this.wordInterval);
  },
};
</script>

<style scoped>
/* Header-Row */
.header-row {
  margin-top: 17vh;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Hero-Bereich */
.hero {
  padding: 0 1em;
}

/* Titel-Stile */
.big-title {
  white-space: nowrap;
  margin-left: -1.5px;
}

.big-title-2 {
  position: absolute;
  right: 0.185em;
  margin-top: -0.2em;
  text-align: right;
  padding: 0;
}

/* Bildcontainer */
.image-container {
  margin-top: -0.5em;
  padding: 0 1em;
}

.inverted-radius {
  --border-radius: 20px;
  --shadow-size: 20px;
  --offset-x: 30vw;
  --offset-y: 4vh;
  width: 100%;
  height: auto;
  max-height: 50vh;
  border-radius: var(--border-radius);
  --_m: calc(2 * var(--border-radius)) calc(2 * var(--border-radius)) radial-gradient(#000 70%, transparent 72%);
  --_g: conic-gradient(at calc(100% - var(--border-radius)) var(--border-radius), transparent 25%, #000 0);
  --_d: calc(var(--shadow-size) + var(--border-radius));
  mask:
    calc(100% - var(--_d) - var(--offset-x)) 0 var(--_m),
    100% calc(var(--_d) + var(--offset-y)) var(--_m),
    radial-gradient(var(--shadow-size) at 100% 0, transparent 99%, #000 calc(100% + 1px))
      calc(-1 * var(--border-radius) - var(--offset-x)) calc(var(--border-radius) + var(--offset-y)),
    var(--_g) calc(-1 * var(--_d) - var(--offset-x)) 0,
    var(--_g) 0 calc(var(--_d) + var(--offset-y));
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  object-fit: cover;
  object-position: top;
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

/* Responsive Styles */
@media (min-width: 1024px) {
  .inverted-radius {
    max-height: 50vh;
    object-position: top;
  }
}
</style>
