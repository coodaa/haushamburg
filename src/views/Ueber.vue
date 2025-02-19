<template>
  <BasePage
    imageSrc="/images/history/onkes1.webp"
    imageAlt="Haus Hamburg Geschichte"
    titleAbove="Über uns"
    titleMain="Geschichte"
    subtitle="Föhl mehr över’t Haus Hamburg"
    heading="Unsere Geschichte"
    flowText="Haus Hamburg ist heute weit mehr als nur ein Restaurant – es ist ein Ort der Begegnung, an dem Tradition, Gastfreundschaft und sozialer Zusammenhalt im Mittelpunkt stehen. Mit seiner einzigartigen Mischung aus maritimer Küche, herzlicher Atmosphäre und sozialem Engagement hat es sich als fester Bestandteil des Stadtlebens in Leer etabliert."
    parallaxImageSrc="/images/history/onkes.webp"
    parallaxImageAlt="Parallax Bild der Reservierung von Haus Hamburg"
  >
    <div class="history-container">

      <!-- Abschnitt: Haus Hamburg heute -->
      <section class="history-section">
  <div class="section-content">
    <div class="text">
      <h2>Heute</h2>
      <p>
        Das <strong>Haus Hamburg</strong> ist weit mehr als nur ein Restaurant – es ist ein <strong>Ort der Begegnung, der Kulinarik und der sozialen Verantwortung</strong>.
      </p>
      <p>
        Neben einer großen Auswahl an traditionellen <strong>norddeutschen Spezialitäten</strong> wie <strong>Fischbrötchen, frischen Meeresfrüchten und herzhaften Fleischgerichten</strong>, bietet das Restaurant auch eine besondere Auswahl an <strong>Geschenkartikeln</strong> und originalen <strong>RAS-Fritten aus Holland</strong>.
      </p>
      <p>
        Die <strong>RAS-Fritten</strong> aus Holland gelten als eine der besten Pommes-Varianten überhaupt. Ihre Einzigartigkeit liegt in der speziellen Zubereitung:
        Sie werden in einem zweistufigen Verfahren frittiert, wodurch sie außen besonders <strong>knusprig</strong> und innen <strong>fluffig-weich</strong> bleiben.
        Hergestellt aus sorgfältig ausgewählten Kartoffeln, zeichnen sie sich durch ihren <strong>intensiven Geschmack</strong> und ihre <strong>goldgelbe Farbe</strong> aus.
        Perfekt serviert mit einer Vielzahl an Saucen – von klassischer Mayo bis hin zu typisch holländischer Joppie-Sauce.
      </p>
      <p>
        Besonders hervorzuheben ist das <strong>Engagement für soziale Projekte</strong>. Seit mehreren Jahren organisiert Haus Hamburg eine regelmäßige <strong>Essensausgabe für Obdachlose</strong>, die jeden Sonntag etwa <strong>30 Bedürftige</strong> mit einer warmen Mahlzeit versorgt.
        Diese Initiative wurde von <strong>Sunna Wagemann</strong> ins Leben gerufen.
      </p>
    </div>
    <div class="image">
      <img src="/images/outside/haushamburgstart.webp" alt="Haus Hamburg heute" />
    </div>
  </div>
</section>

      <!-- Abschnitt: Wandel und neue Namen -->
      <section class="history-section">
        <div class="section-content">
          <div class="image">
            <img src="/images/outside/haus_hamburg_leer_048.webp" alt="Seute Deern in Leer" />
          </div>
          <div class="text">
            <h2>Wandel und neue Namen (1950 - 1980)</h2>
            <p>
              In den 1950er Jahren wurde das Restaurant unter dem Namen <strong>"Seute Deern"</strong> bekannt und entwickelte sich zu einer beliebten Anlaufstelle für maritime Spezialitäten.
              Besonders für seine <strong>frischen Fischgerichte</strong> und das norddeutsche Ambiente wurde es geschätzt.
            </p>
            <p>
              Nach mehreren Modernisierungen erhielt es schließlich seinen heutigen Namen: <strong>Haus Hamburg</strong> – ein Restaurant, das bis heute für Qualität, Gastfreundschaft und regionale Spezialitäten steht.
            </p>
          </div>
        </div>
      </section>

      <!-- Abschnitt: Die Anfänge -->
      <section class="history-section">
        <div class="section-content">
          <div class="text">
            <h2>Die Anfänge (1920 - 1950)</h2>
            <p>
              <strong>Haus Hamburg</strong> wurde im Jahr 1920 gegründet und war ursprünglich unter dem Namen <strong>"Alte Wache"</strong> bekannt.
              Das Gebäude in der <strong>Rathausstraße 3-5</strong> diente als wichtiger Treffpunkt für die Bürger von Leer.
              Mit seiner gemütlichen Atmosphäre zog es Einheimische sowie Reisende an.
            </p>
          </div>
          <div class="image">
            <img src="/images/outside/haus_hamburg_leer_048.webp" alt="Haus Hamburg als Alte Wache" />
          </div>
        </div>
      </section>

      <!-- Abschnitt: Die Nachbarschaft -->
      <section class="history-section">
        <div class="section-content">
          <div class="image">
            <img src="/images/outside/haus_hamburg_leer_048.webp" alt="Rathausstraße in Leer" />
          </div>
          <div class="text">
            <h2>Die Nachbarschaft</h2>
            <p>
              <strong>Haus Hamburg</strong> liegt in der historischen <strong>Rathausstraße 3-5</strong>, mitten im Herzen von Leer.
              Die Umgebung ist geprägt von <strong>historischen Gebäuden, kleinen Cafés, traditionellen Läden und kulturellen Sehenswürdigkeiten</strong>.
            </p>
            <p>
              In unmittelbarer Nähe befindet sich das <strong>alte Rathaus</strong>, das <strong>Heimatmuseum</strong> sowie die idyllische <strong>Altstadt</strong>, die Leer zu einem beliebten Ziel für Einheimische und Touristen macht.
            </p>
            <p>
              Die Kombination aus Geschichte, Gastfreundschaft und sozialem Engagement macht Haus Hamburg zu einem <strong>unverzichtbaren Bestandteil des Stadtlebens</strong> in Leer.
            </p>
          </div>
        </div>
      </section>

    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Ueber",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
.history-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.6em;
}

/* Einheitliches Styling für Abschnitte */
.history-section {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

/* Flexible Struktur für Inhalte */
.history-section .section-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.history-section .text,
.history-section .image {
  flex: 1;
}

/* Bilder-Design */
.history-section .image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Schriftarten & Lesbarkeit */
.history-section h2 {
  font-size: 1.8rem;
  color: #004a7f;
  margin-bottom: 0.8rem;
}

.history-section p {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  text-align: left;
}

/* Responsive Design */
@media (min-width: 768px) {
  .history-section .section-content {
    flex-direction: row;
    align-items: center;
  }

  .history-section:nth-child(even) .section-content {
    flex-direction: row-reverse;
  }
}

@media (max-width: 767px) {
  .history-section .section-content {
    flex-direction: column;
  }
}
</style>
