<template>
  <div class="base-page">
    <p class="subtitle">{{ subtitle }}</p>
    <h1 class="title-base title-above">{{ titleAbove }}</h1>
    <h2 class="title-base page-title">{{ titleMain }}</h2>

    <div class="image-container">
      <!-- Hauptbild -->
      <img :src="imageSrc" :alt="imageAlt" class="rounded-image" loading="lazy" />
      <!-- Noise-Overlay -->
      <div class="noise-overlay"></div>
    </div>

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
  },
};
</script>

<style scoped>
.base-page {
  text-align: center;
  padding: 1rem;
  margin-top: 10em;
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

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/images/noisy.png');
  background-repeat: repeat;
  background-size: cover;
  border-radius: 20px;
  pointer-events: none;
}

.page-content {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--blue);
  padding: 1rem;
}

@media (min-width: 768px) {
  .title-above {
    font-size: 10vw;
  }

  .page-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem;
    border-radius: 0px 0px 20px 20px;
    white-space: normal;
    text-align: center;
    font-size: 10vw;
    z-index: 3;
    background-image: url('/images/noisy.png');
    background-repeat: repeat;
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
    height: .2em;
    width: 50px;
    border-top-left-radius: 20px;
    box-shadow: -15px -4px 0 0 #F2EDE9;
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
}
</style>
