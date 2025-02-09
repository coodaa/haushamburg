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
      <h2 class="form-title">Catering-Anfrage</h2>
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
        <input type="datetime-local" id="dateTime" v-model="form.dateTime" required class="styled-calendar" />
      </div>
      <div class="form-group">
        <label>Das Budget für diese Veranstaltung ist:</label>
        <div class="budget-options">
          <button
            type="button"
            class="budget-button"
            :class="{ active: form.budget === '€1250-3000' }"
            @click="selectBudget('€1250-3000')"
          >
            €1250–3000
          </button>
          <button
            type="button"
            class="budget-button"
            :class="{ active: form.budget === '€3000-7500' }"
            @click="selectBudget('€3000-7500')"
          >
            €3000–7500
          </button>
          <button
            type="button"
            class="budget-button"
            :class="{ active: form.budget === '€7500-15000' }"
            @click="selectBudget('€7500-15000')"
          >
            €7500–15000
          </button>
          <button
            type="button"
            class="budget-button"
            :class="{ active: form.budget === '€15000+' }"
            @click="selectBudget('€15000+')"
          >
            €15000+
          </button>
        </div>
      </div>
      <div class="form-group">
        <label>Bitte wähle die Catering-Art:</label>
        <div class="catering-type-options">
          <button
            type="button"
            class="catering-type-button"
            :class="{ active: form.cateringType.includes('Fisch') }"
            @click="toggleCateringType('Fisch')"
          >
            Fisch
          </button>
          <button
            type="button"
            class="catering-type-button"
            :class="{ active: form.cateringType.includes('Fleisch') }"
            @click="toggleCateringType('Fleisch')"
          >
            Fleisch
          </button>
          <button
            type="button"
            class="catering-type-button"
            :class="{ active: form.cateringType.includes('Vegetarisch') }"
            @click="toggleCateringType('Vegetarisch')"
          >
            Vegetarisch
          </button>
          <button
            type="button"
            class="catering-type-button"
            :class="{ active: form.cateringType.includes('Vegan') }"
            @click="toggleCateringType('Vegan')"
          >
            Vegan
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="message">Zusätzliche Informationen</label>
        <textarea id="message" v-model="form.message" placeholder="Weitere Wünsche oder Informationen"></textarea>
      </div>
      <button type="submit" class="cta-button">Anfrage absenden</button>
    </form>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal">
        <h2>Vielen Dank!</h2>
        <p>Deine Anfrage wurde erfolgreich gesendet.</p>
        <button @click="closeModal" class="cta-button">Schließen</button>
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
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post("/api/sendCateringInquiry", this.form);
        this.isModalVisible = true;
        this.resetForm();
      } catch (error) {
        console.error("Fehler beim Absenden der Anfrage:", error);
        alert("Fehler beim Absenden der Anfrage. Bitte versuche es erneut.");
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
      if (this.form.cateringType.includes(type)) {
        this.form.cateringType = this.form.cateringType.filter((t) => t !== type);
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
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border: 2px solid var(--blue);
  border-radius: 12px;
  position: relative;
}
.catering-form::before {
  content: "";
  position: absolute;
  inset: 10px;
  border: 2px dashed var(--gold);
  border-radius: 10px;
  pointer-events: none;
}
.form-title {
  font-family: var(--font-thunder);
  font-size: 2rem;
  text-align: center;
  color: var(--blue);
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 2rem;
}
input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--blue);
  border-radius: 6px;
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
}
.budget-button.active,
.catering-type-button.active {
  background: var(--blue);
  color: white;
}
.styled-calendar::-webkit-calendar-picker-indicator {
  filter: invert(40%);
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
  border-radius: 10px;
  text-align: center;
}
</style>
