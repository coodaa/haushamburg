<template>
  <BasePage
    imageSrc="/images/catering/catering-haus-hamburg2.jpg"
    imageAlt="Catering"
    titleAbove="Catering"
    titleMain="Catering"
    subtitle="He hett een wat vun Catering seggt?"
    heading="Buche uns"
    flowText="Verleihe Deinem Event einen norddeutschen Charme mit dem Catering-Service von Haus Hamburg! Ob private Feier, Firmenevent oder besondere Anlässe – wir bringen unsere frischen Fischspezialitäten und regionale Leckerbissen direkt zu Dir. Unser erfahrenes Team sorgt dafür, dass Deine Gäste kulinarisch verwöhnt werden und Dein Event unvergesslich wird."
    parallaxImageSrc="/images/catering/catering-haus-hamburg1.jpg"
  >
    <form class="catering-form" @submit.prevent="submitForm">
      <h2 class="big-title-3">Catering Anfrage</h2>

      <div class="form-group">
        <label for="name">Mein Name ist</label>
        <input type="text" id="name" v-model="form.name" placeholder="Name*" required />
        <input type="text" id="company" v-model="form.company" placeholder="Unternehmen (optional)" />
      </div>

      <div class="form-group">
        <label>Ich bin erreichbar via</label>
        <input type="email" id="email" v-model="form.email" placeholder="E-Mail*" required />
        <input type="tel" id="phone" v-model="form.phone" placeholder="Telefon*" required />
      </div>

      <div class="form-group">
        <label>Ich möchte Catering für</label>
        <input type="number" id="guests" v-model="form.guests" placeholder="Anzahl der Personen*" min="1" required />
        <input type="text" id="location" v-model="form.location" placeholder="Ort*" required />
        <input type="date" id="dateTime" v-model="form.dateTime" :min="minDate" required class="styled-calendar" />
      </div>

      <div class="form-group">
        <label>Das Budget für diese Veranstaltung ist:</label>
        <div class="budget-options">
          <button type="button" class="budget-button" :class="{ active: form.budget === '€1250-3000' }" @click="selectBudget('€1250-3000')">€100–300</button>
          <button type="button" class="budget-button" :class="{ active: form.budget === '€3000-7500' }" @click="selectBudget('€3000-7500')">€300–500</button>
          <button type="button" class="budget-button" :class="{ active: form.budget === '€7500-15000' }" @click="selectBudget('€7500-15000')">€500–1.000</button>
          <button type="button" class="budget-button" :class="{ active: form.budget === '€15000+' }" @click="selectBudget('€15000+')">€1.000+</button>
        </div>
      </div>

      <div class="form-group">
        <label>Bitte wähle die Catering-Art:</label>
        <div class="catering-type-options">
          <button type="button" class="catering-type-button" :class="{ active: form.cateringType.includes('Fisch') }" @click="toggleCateringType('Fisch')">Fisch</button>
          <button type="button" class="catering-type-button" :class="{ active: form.cateringType.includes('Fleisch') }" @click="toggleCateringType('Fleisch')">Fleisch</button>
          <button type="button" class="catering-type-button" :class="{ active: form.cateringType.includes('Vegetarisch') }" @click="toggleCateringType('Vegetarisch')">Vegetarisch</button>
          <button type="button" class="catering-type-button" :class="{ active: form.cateringType.includes('Vegan') }" @click="toggleCateringType('Vegan')">Vegan</button>
        </div>
      </div>

      <div class="form-group">
        <label for="message">Zusätzliche Informationen</label>
        <textarea id="message" v-model="form.message" placeholder="Weitere Wünsche oder Informationen"></textarea>
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
        <p>Deine Anfrage wurde erfolgreich gesendet.</p>
        <button type="button" class="cta-button" @click="closeModal">Schließen</button>
      </div>
    </div>
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
    // Liefert das heutige Datum im Format "YYYY-MM-DD"
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

/* Label-Styles */
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--blue);
}

/* Input- und Textarea-Felder */
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

/* Budget- und Catering-Type-Buttons */
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

/* Container für Options-Buttons als Grid */
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

/* Modal-Styles */
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

/* CTA-Button im Formular zentrieren */
.catering-form .cta-button {
  display: block;
  margin: 2rem auto;
}

/* CTA-Button im Modal zentrieren */
.modal .cta-button {
  display: block;
  margin: 2rem auto;
}
</style>
