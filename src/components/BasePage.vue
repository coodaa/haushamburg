<template>
  <div class="base-page">
    <!-- Titel über dem Bild -->
    <h2 class="title-base title-above">{{ titleAbove }}</h2>

    <!-- Container für Bild + Haupttitel -->
    <div class="image-container">
      <img :src="imageSrc" :alt="imageAlt" class="rounded-image" />

      <!-- Hauptüberschrift, die das Bild „ausschneidet“ -->
      <h1 class="title-base page-title">{{ titleMain }}</h1>
    </div>

    <!-- Restlicher Inhalt -->
    <div class="page-content">
      <slot>
        <p>{{ content }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePage",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: "Bild",
    },
    titleAbove: { // Neue Prop für den oberen Titel
      type: String,
      required: false,
      default: "",
    },
    titleMain: { // Prop für den Haupttitel
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.base-page {
  text-align: center;
  font-family: var(--font-body);
}

/* Minimierter Abstand zwischen den Titeln */
.title-above {
  margin-bottom: 0.2em; /* Reduzierter Abstand */
  color: var(--blue);
}

/* Container für Bild und Haupttitel */
.image-container {
  position: relative;
  margin: 0 auto 1rem;
}

/* Gestylt das Bild */
.rounded-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
  margin: 0 auto;
}

/* Haupttitel über dem Bild */
.page-title {
  position: absolute;
  top: 5%; /* Reduzierter Abstand zum oberen Rand des Bildes */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.8); /* Leicht transparente Hintergrundfarbe */
  padding: 0.3rem 0.7rem; /* Angepasstes Padding */
  border-radius: 0px 0px 20px 20px;
  max-width: 80%;
  white-space: normal; /* Zeilenumbrüche erlauben */
  text-align: center;
}

/* Pseudo-Elemente für dekorative Effekte */
.page-title::before,
.page-title::after {
  content: "";
  position: absolute;
  background-color: transparent;
  height: 20px;
  width: 50px;
  border-top-left-radius: 20px;
  box-shadow: -15px -2px 0 0 #fff;
}

.page-title::before {
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
}

.page-title::after {
  left: -50px;
  border-top-left-radius: 0;
  border-top-right-radius: 20px; /* Spiegelung */
  box-shadow: 15px -2px 0 0 #fff; /* Spiegelung des Schattens */
  top: 50%;
  transform: translateY(-50%);
}

.page-content {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--blue);
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .title-base {
    font-size: 3em; /* Angepasste Schriftgröße für kleinere Bildschirme */
  }

  .page-title {
    padding: 0.2rem 0.5rem; /* Weiter angepasste Padding */
    top: 3%; /* Weiter reduzierter Abstand */
  }

  .page-title::before,
  .page-title::after {
    width: 30px;
    box-shadow: none; /* Optional: Entferne die Schatten auf kleineren Bildschirmen */
  }
}
</style>
