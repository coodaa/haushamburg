<template>
  <BasePage
    imageSrc="/images/mood/niclas-dehmel-vYH_7guOmbQ-unsplash.jpg"
    imageAlt="Stellenangebote Bild"
    titleAbove="Jobs"
    titleMain="Karriere"
    subtitle="Werd een Deel vun uns Team"
    heading="Jobs bei Haus Hamburg"
    flowText="Wir sind stets auf der Suche nach motivierten und engagierten Menschen, die in einem dynamischen Team arbeiten möchten. Werden Sie Teil unserer Familie, bringen Sie Ihre Leidenschaft ein und helfen Sie uns dabei, unseren Gästen ein außergewöhnliches Erlebnis zu bieten. Ob im Service oder in der Küche – bei uns finden Sie vielfältige Möglichkeiten zur persönlichen und beruflichen Weiterentwicklung. Überzeugen Sie uns mit Ihrem Einsatz und Ihrer Begeisterung – wir freuen uns darauf, gemeinsam Großartiges zu erreichen!"
    parallaxImageSrc="/images/mood/leer.jpg"
    parallaxImageAlt=""
  >
    <div class="stellenangebote-content">
      <!-- Job Listings Section -->
      <section class="job-section">
        <h3 class="section-heading">Aktuelle Stellenangebote</h3>
        <div class="job-listings">
          <div v-for="job in jobs" :key="job.id" class="job">
            <h4 class="job-title">{{ job.title }}</h4>
            <p class="job-info">
              <strong>Ort:</strong> {{ job.location }}<br />
              <strong>Beschäftigungsart:</strong> {{ job.employmentType }}<br />
              <strong>Beschreibung:</strong> {{ job.description }}
            </p>
            <div class="job-details">
              <div>
                <strong>Ihre Aufgaben:</strong>
                <ul>
                  <li v-for="(task, index) in job.tasks" :key="index">{{ task }}</li>
                </ul>
              </div>
              <div>
                <strong>Wir bieten:</strong>
                <ul>
                  <li v-for="(benefit, index) in job.benefits" :key="index">{{ benefit }}</li>
                </ul>
              </div>
            </div>
            <p class="job-application" v-html="job.application"></p>
          </div>
        </div>
      </section>
      <ContactInfo />

    </div>
  </BasePage>
</template>


<script>
import BasePage from "@/components/BasePage.vue";
import jobsData from "@/assets/jobs.json";
import ContactInfo from "@/components/ContactInfo.vue";








export default {
  name: "Stellenangebote",
  components: {
    BasePage,
    ContactInfo,
  },
  data() {
    return {
      jobs: jobsData,
    };
  },
};
</script>

<style scoped>
/* Mobile-First Basis-Stile */
.stellenangebote-content {
  text-align: left;
  margin: 0 auto;
  max-width: 95vw;
}

/* Abschnittsüberschriften */
.section-heading {
  color: var(--blue);
  font-family: var(--font-thunder);
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  text-align: center;
}

/* Job Listings (vertikal für mobile) */
.job-listings {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Job-Karten */
.job {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.job:hover {
  background-color: #f9f9f9;
  transform: translateY(-3px);
}
.job-title {
  color: var(--blue);
  margin-bottom: 0.5rem;
  font-family: var(--font-thunder);
  font-size: 1.5rem;
}
.job-info {
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 1.1rem;
}
.job-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}
.job-details ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}
.job-application {
  font-size: 1.1rem;
  line-height: 1.5;
}




/* Responsive Anpassungen für Tablets und Desktops */
@media (min-width: 768px) {
  .job-listings {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .job {
    flex: 1 1 calc(50% - 2rem);
  }

  .stellenangebote-content {
  padding: 1.5rem 1rem;
}
}
</style>
