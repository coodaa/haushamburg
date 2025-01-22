<template>
  <div>
    <!-- Header-Row mit H1 und Blase -->
    <div class="header-row">
      <h1 class="title-base big-title">herz küche</h1>
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
        <span
  v-if="currentWordVisible"
  class="bubble-text animate-in"
>
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
          src="@/assets/images/haushamburgstart.webp"
          alt="Haus Hamburg"
          class="inverted-radius"
        />
      </div>
    </div>
    <section class="restaurant-section">
      <div class="restaurant-header">
        <h3 class="restaurant-heading, big-title-3">das restaurant</h3>
        <img src="@/assets/images/1.jpg" alt="Restaurant" class="restaurant-image" />
      </div>
      <div class="restaurant-text">
        <p>
          Entdecken Sie das <strong>authentische Norddeutschland</strong> im Haus Hamburg, Ihrem Fischrestaurant mitten in der charmanten Altstadt von Leer, Ostfriesland. Bei uns erwarten Sie nicht nur fangfrische Fischspezialitäten, sondern auch eine Vielfalt an norddeutschen Köstlichkeiten, die mit viel Liebe und regionalen Zutaten zubereitet werden.
        </p>
        <p>
          Ein besonderes Highlight ist unser <strong>monatliches Fischbuffet</strong>: Jeden ersten Freitag im Monat laden wir Sie ein, sich durch eine abwechslungsreiche Auswahl an delikaten Fischgerichten zu probieren – ein Genuss, den Sie nicht verpassen sollten!
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
    </section>
    <section class="svg-section">
  <div class="scalloped-svg"></div>
  <div class="section-content">
    <h2>Unsere Fischbrötchen</h2>
    <div class="fischbroetchen-gallery">
      <img src="@/assets/images/fischbrotchen1.jpg" alt="Fischbrötchen 1" class="fischbroetchen" />
      <img src="@/assets/images/fischbrotchen2.jpg" alt="Fischbrötchen 2" class="fischbroetchen" />
      <img src="@/assets/images/fischbrotchen3.jpg" alt="Fischbrötchen 3" class="fischbroetchen" />
      <!-- Füge weitere Bilder nach Bedarf hinzu -->
    </div>
  </div>
</section>
  </div>

</template>



<script>
import '../styles/Home.css'

export default {
  name: 'Home',
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
};
</script>
