<template>
  <div class="base-page">
    <p class="subtitle">{{ subtitle }}</p>
    <h1 class="title-base title-above">{{ titleAbove }}</h1>
    <h2 class="title-base page-title">{{ titleMain }}</h2>

    <div class="first-section">
      <div class="image-container">
        <img :src="imageSrc" :alt="imageAlt" class="rounded-image" loading="lazy" />
      </div>

      <div class="text-below-image">
        <h3 class="big-title-3">{{ heading }}</h3>
        <p class="flow-text">{{ flowText }}</p>
      </div>
    </div>

    <!-- Parallax Section -->
    <div
      class="parallax-section"
      :style="parallaxStyle"
      v-if="parallaxImageSrc"
      :aria-label="parallaxImageAlt"
    ></div>

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
  text-align: center;
  margin-top: 14em;
}

.first-section {
  background-color: red;
  border-radius: 20px;
}

.subtitle {
  font-size: 1.3em;
  font-family: var(--font-perfect);
}

.title-above {
  color: var(--blue);
  font-size: 20vw;
  text-transform: uppercase;
  margin: 0;
  line-height: 0.85;
}

.page-title {
  color: var(--blue);
  font-size: 20vw;
  text-transform: uppercase;
  line-height: 0.85;
}

.image-container {
  position: relative;
  margin: 1rem auto 1rem;
}

.rounded-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
  margin: 0 auto;
}

.text-below-image {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 2rem auto;
  padding: 1rem;
  gap: 1rem;
}

.flow-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--blue);
}

.page-content {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--blue);
  padding: 1rem;
}

.parallax-section {
  height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

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
    /* background-image: url('/images/noisy.png');
    background-repeat: repeat; */
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
    height: .285em;
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
  }
}

@media (max-width: 767px) {
  .parallax-section {
    background-attachment: scroll;
    height: 300px;
  }
}
</style>
