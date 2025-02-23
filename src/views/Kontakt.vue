<!-- src/views/Kontakt.vue -->
<template>
  <BasePage
    imageSrc="/images/outside/haus-hamburg-leer-46.webp"
    imageAlt="Haus Hamburg Kontakt"
    titleAbove="Post"
    titleMain="Kontakt"
    subtitle="Wo ji uns erreichen köönt."
    heading="Erreichen Sie uns"
    flowText="Wir freuen uns, Sie bei uns begrüßen zu dürfen! Egal, ob Sie Fragen haben, eine Reservierung vornehmen möchten oder besondere Wünsche haben – wir sind immer für Sie da. Kontaktieren Sie uns gerne telefonisch oder per E-Mail, um uns Ihre Anliegen mitzuteilen. Unser Team setzt alles daran, Ihnen einen unvergesslichen Aufenthalt in einer einladenden und entspannten Atmosphäre zu bieten. Wir sind gespannt auf Ihre Nachricht!"
    parallaxImageSrc="/images/restaurant/haus-hamburg-leer-08.webp"
    parallaxImageAlt="Kontakt Parallax Bildbeschreibung"
  >

        <ContactInfo />

    <!-- Google Map -->
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2388.492664061767!2d7.448253012889244!3d53.22694437213925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b64dc14ad3eaab%3A0x1184033be441089!2sHaus%20Hamburg!5e0!3m2!1sde!2sde!4v1738320525391!5m2!1sde!2sde"
        frameborder="0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>

    <!-- Google Bewertungen -->
    <div class="google-reviews">
      <h3>Was unsere Gäste sagen</h3>
      <div class="elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578" data-elfsight-app-lazy></div>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";
import ContactInfo from "../components/ContactInfo.vue";


export default {
  name: "Kontakt",
  components: {
    BasePage,
    ContactInfo,
  },
};
</script>

<style scoped>


.map-container iframe {
  width: 100%;
  height: 45vh;
  border-radius: 20px;
}

/* Google Bewertungen Styling */
.google-reviews {
  margin: 2em auto;
  padding: 1em;
  font-size: 1em; /* Einheitliche Schriftgröße */
  line-height: 1.5; /* Einheitlicher Zeilenabstand */
}

.google-reviews h3 {
  margin-bottom: 1em;
  color: var(--blue);
  font-size: 1.2em; /* Einheitliche Schriftgröße */
  line-height: 1.2; /* Einheitlicher Zeilenabstand */
}

.elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
  width: 100%;
  height: auto; /* Dynamische Höhe */
  min-height: 400px; /* Setzt eine minimale Höhe */
  border: none;
  transition: height 0.3s ease; /* Sanfter Übergang beim Anpassen der Höhe */
}

/* Responsive Anpassungen */
@media (min-width: 1024px) {


  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    height: auto; /* Entfernt die feste Höhe */
    min-height: 600px; /* Größere minimale Höhe auf Desktop */
  }



  .map-container {
    padding: 1em;
    box-shadow: 0;
  }
}

@media (max-width: 768px) {



  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    height: auto; /* Entfernt die feste Höhe */
    min-height: 500px; /* Anpassung auf Tablets */
  }

  .map-container iframe {
    height: 300px;
  }
}

@media (max-width: 480px) {




  /* Google Bewertungen auf mobile */
  .google-reviews .elfsight-app-993dc481-952b-4721-8494-6d5d6cf46578 {
    height: auto; /* Entfernt die feste Höhe */
    min-height: 30vh; /* Setzt eine minimale Höhe */
  }



}
</style>
