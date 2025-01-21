<template>
  <section class="content-section">
    <div v-if="imageSrc" class="section-image-container">
      <img :src="imageSrc" :alt="imageAlt" class="section-image" />
    </div>
    <h2 v-if="heading" class="section-heading">{{ heading }}</h2>
    <div class="section-text">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContentSection',
  props: {
    imageSrc: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: 'Sektion Bild'
    },
    heading: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.content-section {
  margin: 2em 0;
  text-align: center;
}

.section-image-container {
  max-width: 100%;
  overflow: hidden;
  border-radius: 20px; /* runde Ecken */
  margin-bottom: 1em;
}

.section-image {
  width: 100%;
  height: auto;
  display: block;
}

.section-heading {
  font-size: 2rem;
  margin: 0.5em 0;
  text-transform: uppercase;
}

.section-text {
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1em;
}
</style>
