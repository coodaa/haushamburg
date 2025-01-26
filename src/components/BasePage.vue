<template>
  <div class="base-page">
    <!-- Titel und Untertitel im zentrierten Wrapper -->
    <div class="content-wrapper">
      <p class="subtitle">{{ subtitle }}</p>
      <h1 class="title-base title-above">{{ titleAbove }}</h1>
      <h2 class="title-base page-title">{{ titleMain }}</h2>
    </div>

    <!-- First Section - Vollbreit mit zentriertem Inhalt -->
    <div class="first-section">
      <div class="content-wrapper">
        <div class="image-container">
          <img :src="imageSrc" :alt="imageAlt" class="rounded-image" loading="lazy" />
        </div>

        <div class="text-below-image">
          <h3 class="big-title-3">{{ heading }}</h3>
          <p class="flow-text">{{ flowText }}</p>
        </div>
      </div>
    </div>

    <!-- Parallax Section - Vollbreit -->
    <div
      class="parallax-section"
      :style="parallaxStyle"
      v-if="parallaxImageSrc"
      :aria-label="parallaxImageAlt"
    ></div>

    <!-- Seiteninhalt im zentrierten Wrapper -->
    <div class="content-wrapper">
      <div class="page-content">
        <slot>
          <p>{{ content }}</p>
        </slot>
      </div>
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
    titleAbove: {
      type: String,
      required: false,
      default: "",
    },
    titleMain: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      required: false,
      default: "",
    },
    heading: {
      type: String,
      required: false,
      default: "",
    },
    flowText: {
      type: String,
      required: false,
      default: "",
    },
    parallaxImageSrc: {
      type: String,
      required: false,
      default: "",
    },
    parallaxImageAlt: {
      type: String,
      default: "Parallax Bild",
    },
  },
  computed: {
    parallaxStyle() {
      return {
        backgroundImage: `url(${this.parallaxImageSrc})`,
      };
    },
  },
};
</script>

<style scoped>
.base-page {
  width: 100%;
  overflow-x: hidden; /* Verhindert horizontales Scrollen */
  text-align: center;
  margin-top: 14em;
}

/* Zentrierter Inhalt mit maximaler Breite */
.content-wrapper {
  max-width: 1200px; /* Passe die maximale Breite nach Bedarf an */
  margin: 0 auto;
  padding: 0 1rem; /* Optional: Innenabstand */
  box-sizing: border-box;
}

/* First Section - Vollbreit */
.first-section {
  background-color: red;
  width: 100vw;
  position: relative;
  left: 50%;
  margin-left: -50vw;
  padding: 2rem 0; /* Optional: Innenabstand */
  box-sizing: border-box;
  z-index: 1;
}

/* Parallax Section - Vollbreit */
.parallax-section {
  width: 100vw;
  height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  left: 50%;
  margin-left: -50vw;
  z-index: 0;
}

/* Subtitle Styling */
.subtitle {
  font-size: 1.3em;
  font-family: var(--font-perfect);
}

/* Title Above Styling */
.title-above {
  color: var(--blue);
  font-size: 20vw;
  text-transform: uppercase;
  margin: 0;
  line-height: 0.85;
}

/* Page Title Styling */
.page-title {
  color: var(--blue);
  font-size: 20vw;
  text-transform: uppercase;
  line-height: 0.85;
}

/* Image Container Styling */
.image-container {
  position: relative;
  margin: 1rem auto 1rem;
}

/* Rounded Image Styling */
.rounded-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
  margin: 0 auto;
}

/* Text Below Image Styling */
.text-below-image {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 2rem auto;
  padding: 1rem;
  gap: 1rem;
}

/* Flow Text Styling */
.flow-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--blue);
}

/* Page Content Styling */
.page-content {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--blue);
  padding: 1rem;
}

/* Responsive Anpassungen */
@media (min-width: 768px) {
  .title-above {
    font-size: 10vw;
  }

  .page-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 1rem;
    border-radius: 0px 0px 20px 20px;
    white-space: normal;
    text-align: center;
    font-size: 10vw;
    z-index: 3;
    background-color: #F2EDE9;
  }

  .subtitle {
    font-size: 1.5em;
  }

  .page-title::before,
  .page-title::after {
    content: "";
    position: absolute;
    background-color: transparent;
    height: 0.285em;
    width: 50px;
    border-top-left-radius: 20px;
    box-shadow: -15px -9px 0 0 #F2EDE9;
  }

  .page-title::before {
    right: -50px;
    top: 23%;
    transform: translateY(-50%);
  }

  .page-title::after {
    left: -50px;
    border-top-left-radius: 0;
    border-top-right-radius: 20px;
    box-shadow: 15px -4px 0 0 #F2EDE9;
    top: 23%;
    transform: translateY(-50%);
  }

  .text-below-image {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }

  .big-title-3 {
    flex: 1 1 30%;
  }

  .flow-text {
    flex: 2 1 70%;
  }

  .parallax-section {
    height: 600px; /* Anpassung für größere Bildschirme */
    margin-top: -150px; /* Weitere Anpassung */
  }

  .first-section {
    margin-bottom: -150px; /* Weitere Anpassung */
  }
}

@media (max-width: 767px) {
  .parallax-section {
    background-attachment: scroll;
    height: 300px;
    margin-top: -50px; /* Weniger negative Margin */
  }

  .first-section {
    margin-bottom: -50px; /* Weniger negative Margin */
  }
}
</style>
