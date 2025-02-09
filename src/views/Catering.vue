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
    <p>
      Verleihe Deinem Event einen norddeutschen Charme mit dem Catering-Service von Haus Hamburg! Ob private Feier, Firmenevent oder besondere Anlässe – wir bringen unsere frischen Fischspezialitäten und regionale Leckerbissen direkt zu Dir. Unser erfahrenes Team sorgt dafür, dass Deine Gäste kulinarisch verwöhnt werden und Dein Event unvergesslich wird.
    </p>
    <p>
      Kontaktiere uns, um Dein individuelles Catering-Paket zusammenzustellen!<br />
      <strong>Telefon:</strong> 0491 / 4884<br />
      <strong>Email:</strong> <a href="mailto:info@haus-hamburg-leer.de">info@haus-hamburg-leer.de</a>
    </p>

    <!-- Catering-Anfrage-Formular -->
    <div class="catering-form">
      <h2>Catering-Anfrage</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div>
          <label for="email">E-Mail:</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div>
          <label for="phone">Telefon:</label>
          <input type="tel" id="phone" v-model="form.phone" />
        </div>
        <div>
          <label for="message">Nachricht:</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit">Anfrage absenden</button>
      </form>
      <div v-if="statusMessage" class="status-message">{{ statusMessage }}</div>
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
        email: "",
        phone: "",
        message: ""
      },
      statusMessage: ""
    };
  },
  methods: {
    async submitForm() {
      // Erstelle das Anfrage-Objekt
      const inquiryData = {
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        message: this.form.message,
        // Optionale Felder, z. B. Datum, etc.
        submittedAt: new Date().toISOString()
      };

      try {
        // Sende eine POST-Anfrage an deinen API-Endpunkt
        // Stelle sicher, dass der Proxy in deiner Vite-Konfiguration eingerichtet ist
        // oder gib hier die vollständige URL zu deinem Backend an (z. B. http://localhost:3000/api/sendCateringInquiry)
        const response = await axios.post("/api/sendCateringInquiry", inquiryData);
        this.statusMessage = "Anfrage erfolgreich gesendet!";
        // Optional: Formular zurücksetzen
        this.form = { name: "", email: "", phone: "", message: "" };
      } catch (error) {
        console.error("Fehler beim Absenden der Anfrage:", error);
        this.statusMessage = "Fehler beim Absenden der Anfrage: " + error.message;
      }
    }
  }
};
</script>

<style scoped>
.catering-form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}
.catering-form h2 {
  margin-bottom: 1rem;
}
.catering-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.catering-form input,
.catering-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.catering-form button {
  background-color: #42b983;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}
.status-message {
  margin-top: 1rem;
  font-weight: bold;
  color: #2c3e50;
}
</style>
