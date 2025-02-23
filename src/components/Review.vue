<!-- src/views/Kontakt.vue -->
<template>
  <!-- Google Bewertungen -->
  <div class="google-reviews">
    <h3>Was unsere Gäste sagen</h3>
    <div class="elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578" data-elfsight-app-lazy></div>
  </div>
</template>

<style scoped>
/* Google Bewertungen Styling */
.google-reviews {
  margin: 2em auto;
  margin-top: 0;
  padding: 1em;
  font-size: 1em;
  line-height: 1.5;
  text-align: center; /* Zentriert den gesamten Container */
}

.google-reviews h3 {
  margin-bottom: 1em;
  color: var(--blue);
  font-family: inherit;
  font-size: 1.em;
  line-height: 1.2;
  text-align: center; /* Überschrift mittig zentrieren */
}

/* Elfsight Widget */
.elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
  width: 100%;
  height: auto;
  min-height: 400px;
  border: none;
  transition: height 0.3s ease;
}

/* Responsive Anpassungen */
@media (min-width: 1024px) {
  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    min-height: 600px;
  }
}

@media (max-width: 768px) {
  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    min-height: 500px;
  }
}

@media (max-width: 480px) {
  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    min-height: 30vh;
  }
}
</style>
