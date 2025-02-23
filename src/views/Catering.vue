<template>
  <BasePage
    imageSrc="/images/catering/haus-hamburg-leer-catering-1.webp"
    imageAlt="Catering"
    titleAbove="Catering"
    titleMain="Catering"
    subtitle="He hett een wat vun Catering seggt?"
    heading="Catering-Service"
    flowText="Verleihen Sie Ihrem Event einen norddeutschen Charme mit dem Catering-Service von Haus Hamburg! Ob private Feier, Firmenevent oder besondere Anlässe – wir bringen unsere frischen Fischspezialitäten und regionalen Leckerbissen direkt zu Ihnen. Unser erfahrenes Team sorgt dafür, dass Ihre Gäste kulinarisch verwöhnt werden und Ihr Event unvergesslich wird."
    parallaxImageSrc="/images/catering/haus-hamburg-leer-catering-2.webp"
  >
    <!-- Überschrift im Header-Bereich für SEO -->
    <header>
      <h1 class="big-title-3">Ihr Event im norddeutschen Flair</h1>
    </header>

    <main>
      <!-- Formularbereich für die Catering-Anfrage -->
      <form class="catering-form" @submit.prevent="submitForm">
        <h2 class="big-title-3">Catering-Anfrage</h2>

        <div class="form-group">
          <label for="name">Ihr Name</label>
          <input type="text" id="name" v-model="form.name" placeholder="Ihr Name*" required />
          <input type="text" id="company" v-model="form.company" placeholder="Unternehmen (optional)" />
        </div>

        <div class="form-group">
          <label>Wie können wir Sie erreichen?</label>
          <input type="email" id="email" v-model="form.email" placeholder="E-Mail-Adresse*" required />
          <input type="tel" id="phone" v-model="form.phone" placeholder="Telefonnummer*" required />
        </div>

        <div class="form-group">
          <label>Für wie viele Personen wünschen Sie Catering?</label>
          <input type="number" id="guests" v-model="form.guests" placeholder="Anzahl der Personen*" min="1" required />
          <input type="text" id="location" v-model="form.location" placeholder="Veranstaltungsort*" required />
          <input type="date" id="dateTime" v-model="form.dateTime" :min="minDate" required class="styled-calendar" />
        </div>

        <div class="form-group">
          <label>Welches Budget pro Person haben Sie eingeplant?</label>
          <div class="budget-options">
            <button type="button" class="budget-button" :class="{ active: form.budget === '€9-15' }" @click="selectBudget('€9-15')">8 – 15 €</button>
            <button type="button" class="budget-button" :class="{ active: form.budget === '€15-35' }" @click="selectBudget('€15-35')">15 – 35 €</button>
            <button type="button" class="budget-button" :class="{ active: form.budget === '€35-65' }" @click="selectBudget('€35-65')">35 – 65 €</button>
            <button type="button" class="budget-button" :class="{ active: form.budget === '€65+' }" @click="selectBudget('€65+')">65+ €</button>
          </div>
        </div>

        <div class="form-group">
          <label>Welche Catering-Art bevorzugen Sie?</label>
          <div class="catering-type-options">
            <button type="button" class="catering-type-button" :class="{ active: form.cateringType.includes('Fisch') }" @click="toggleCateringType('Fisch')">Fisch / Fleisch</button>
            <button type="button" class="catering-type-button" :class="{ active: form.cateringType.includes('Fischbrötchen') }" @click="toggleCateringType('Fischbrötchen')">Fischbrötchen</button>
            <button type="button" class="catering-type-button" :class="{ active: form.cateringType.includes('kalte Fischplatte') }" @click="toggleCateringType('kalte Fischplatte')">Kalte Fischplatte</button>
            <button type="button" class="catering-type-button" :class="{ active: form.cateringType.includes('Fingerfood') }" @click="toggleCateringType('Fingerfood')">Fingerfood</button>
          </div>
        </div>

        <div class="form-group">
          <label for="message">Haben Sie weitere Wünsche oder Informationen?</label>
          <textarea id="message" v-model="form.message" placeholder="Zusätzliche Angaben zur Veranstaltung"></textarea>
        </div>

        <button class="cta-button" type="submit" :disabled="isLoading">
          <span class="cta-text" v-if="!isLoading">Anfrage absenden</span>
          <span class="cta-text" v-if="isLoading">Senden...</span>
        </button>

        <div v-if="isLoading" class="loading-spinner"></div>
      </form>

      <div v-if="isModalVisible" class="modal-overlay">
        <div class="modal">
          <h2>Vielen Dank!</h2>
          <p>Ihre Anfrage wurde erfolgreich gesendet. Wir werden uns umgehend per E-Mail bei Ihnen melden.</p>
          <button type="button" class="cta-button" @click="closeModal">Schließen</button>
        </div>
      </div>
    </main>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";
import axios from "axios";

export default {
  name: "Catering",
  components: {
    BasePage,
  },
  metaInfo: {
    title: "Catering – Haus Hamburg",
    meta: [
      {
        name: "description",
        content:
          "Buchen Sie den Catering-Service von Haus Hamburg für Ihr Event. Frische Fischspezialitäten und regionale Leckerbissen verleihen Ihrem Anlass einen norddeutschen Charme.",
      },
      {
        property: "og:title",
        content: "Catering – Haus Hamburg",
      },
      {
        property: "og:description",
        content:
          "Verleihen Sie Ihrem Event einen norddeutschen Charme mit unserem Catering-Service. Jetzt Anfrage senden!",
      },
      {
        property: "og:url",
        content: "https://haus-hamburg-leer.de/catering",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    script: [
      {
        type: "application/ld+json",
        json: {
          "@context": "https://schema.org",
          "@type": "FoodEstablishment",
          "name": "Haus Hamburg Catering",
          "description":
            "Verleihen Sie Ihrem Event einen norddeutschen Charme mit dem Catering-Service von Haus Hamburg – frische Fischspezialitäten und regionale Leckerbissen.",
          "url": "https://haus-hamburg-leer.de/catering",
          "telephone": "+49 491 4884",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rathausstr. 3 – 5",
            "addressLocality": "Leer",
            "postalCode": "26789",
            "addressCountry": "DE",
          },
          "servesCuisine": ["Fish", "Regional"],
          "priceRange": "€€",
        },
      },
    ],
  },
  data() {
    return {
      form: {
        name: "",
        company: "",
        email: "",
        phone: "",
        guests: "",
        location: "",
        dateTime: "",
        budget: "",
        cateringType: [],
        message: "",
      },
      isModalVisible: false,
      isLoading: false,
    };
  },
  computed: {
    minDate() {
      return new Date().toISOString().split("T")[0];
    },
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      try {
        const response = await axios.post("/api/sendCateringInquiry", this.form);
        if (response.status === 200) {
          this.isModalVisible = true;
          this.resetForm();
        } else {
          console.error("Fehler beim Absenden der Anfrage:", response.data);
          alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.");
        }
      } catch (error) {
        console.error("Fehler beim Absenden der Anfrage:", error);
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.");
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.form = {
        name: "",
        company: "",
        email: "",
        phone: "",
        guests: "",
        location: "",
        dateTime: "",
        budget: "",
        cateringType: [],
        message: "",
      };
    },
    closeModal() {
      this.isModalVisible = false;
    },
    toggleCateringType(type) {
      const index = this.form.cateringType.indexOf(type);
      if (index > -1) {
        this.form.cateringType.splice(index, 1);
      } else {
        this.form.cateringType.push(type);
      }
    },
    selectBudget(budget) {
      this.form.budget = budget;
    },
  },
};
</script>

<style scoped>
/* Deine bestehenden Styles bleiben unverändert */
.catering-form {
  max-width: 48em;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 20px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--blue);
}

input,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 1rem;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 5px rgba(3, 48, 93, 0.3);
}

.budget-button,
.catering-type-button {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--blue);
  background: var(--beige);
  color: var(--blue);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.budget-button.active,
.catering-type-button.active {
  background: var(--blue);
  color: white;
}

.budget-button:hover,
.catering-type-button:hover {
  background: var(--gold);
  color: var(--blue);
}

.budget-options,
.catering-type-options {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

@media (min-width: 768px) {
  .budget-options,
  .catering-type-options {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
}

.catering-form .cta-button,
.modal .cta-button {
  display: block;
  margin: 2rem auto;
}
</style>
