<!-- src/views/Stellenangebote.vue -->
<template>
  <BasePage
    imageSrc="/images/mood/niclas-dehmel-vYH_7guOmbQ-unsplash.jpg"
    imageAlt="Stellenangebote Bild"
    titleAbove="Karriere"
    titleMain="Stellenangebote"
    subtitle="Werd een Deel vun uns Team"
    heading="Karriere bei Haus Hamburg"
    flowText="Wir sind immer auf der Suche nach engagierten Servicekräften. Schließen Sie sich unserem dynamischen Team an und tragen Sie zu einem herausragenden Kundenerlebnis bei!"
    parallaxImageSrc=""
    parallaxImageAlt=""
  >
    <div class="stellenangebote-content">
      <section>
        <h3>Aktuelle Stellenangebote</h3>
        <div class="job-listings">
          <div v-for="job in jobs" :key="job.id" class="job">
            <h4>{{ job.title }}</h4>
            <p>
              <strong>Ort:</strong> {{ job.location }}<br />
              <strong>Beschäftigungsart:</strong> {{ job.employmentType }}<br />
              <strong>Beschreibung:</strong> {{ job.description }}
            </p>
            <p>
              <strong>Ihre Aufgaben:</strong>
              <ul>
                <li v-for="(task, index) in job.tasks" :key="index">{{ task }}</li>
              </ul>
            </p>
            <p>
              <strong>Wir bieten:</strong>
              <ul>
                <li v-for="(benefit, index) in job.benefits" :key="index">{{ benefit }}</li>
              </ul>
            </p>
            <p v-html="job.application"></p>
          </div>
        </div>
      </section>

      <section class="bewerbung-info">
        <h3>Bewerbungsprozess</h3>
        <p>
          Wir freuen uns über Ihr Interesse an einer Mitarbeit in unserem Team. Bitte senden Sie Ihre vollständigen Bewerbungsunterlagen (Anschreiben, Lebenslauf, Zeugnisse) an
          <a href="mailto:info@haus-hamburg-leer.de">info@haus-hamburg-leer.de</a>.
        </p>
        <p>
          Alternativ können Sie Ihre Bewerbung auch persönlich in unserem Restaurant abgeben. Wir melden uns zeitnah bei Ihnen, um weitere Schritte zu besprechen.
        </p>
      </section>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";
import jobsData from "@/assets/jobs.json";

export default {
  name: "Stellenangebote",
  components: {
    BasePage,
  },
  data() {
    return {
      jobs: jobsData,
    };
  },
};
</script>

<style scoped>
.stellenangebote-content {
  text-align: left;
  padding: 1rem;
}

.job-listings {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.job {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.job h4 {
  color: var(--blue);
  margin-bottom: 0.5rem;
}

.job p {
  margin: 0.5rem 0;
}

.job ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.bewerbung-info {
  margin-top: 2rem;
}

.bewerbung-info h3 {
  color: var(--blue);
  margin-bottom: 0.5rem;
}

.bewerbung-info a {
  color: var(--blue);
  text-decoration: underline;
}

.bewerbung-info a:hover {
  text-decoration: none;
}

/* Responsive Anpassungen */
@media (min-width: 768px) {
  .job-listings {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .job {
    flex: 1 1 calc(50% - 2rem);
  }
}
</style>
