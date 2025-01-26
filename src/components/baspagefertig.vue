<template>

<div class="base-page">
  <p class="subtitle">{{ subtitle }}</p>
  <h1 class="title-base title-above">{{ titleAbove }}</h1>
  <h2 class="title-base page-title">{{ titleMain }}</h2>

  <div class="image-container">
    <img :src="imageSrc" :alt="imageAlt" class="rounded-image" loading="lazy" />
  </div>

  <!-- New Section -->
  <div class="text-below-image">
    <h3 class="big-title-3">{{ heading }}</h3>
    <p class="flow-text">{{ flowText }}</p>
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

/* New Section Styles */
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

/* Responsive Layout */
@media (min-width: 768px) {
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
}
</style>
