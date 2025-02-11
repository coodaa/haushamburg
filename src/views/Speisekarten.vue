<template>
  <BasePage
    :key="$route.fullPath"
    imageSrc="/images/food/haus_hamburg_leer_013.webp"
    imageAlt="Speisekarte Haus Hamburg"
    titleAbove="Unsere"
    titleMain="Speisekarte"
    subtitle="Freschen Fisch un regionale Spezialiteeten"
    heading="Die Speisekarte"
    flowText="Entdecken Sie unsere köstlichen Fischgerichte, ostfriesische Spezialitäten und mehr. Frisch, regional und mit Liebe zubereitet."
    parallaxImageSrc="/images/food/haus_hamburg_leer_021.webp"
    parallaxImageAlt="Haus Hamburg Restaurant"
  >
    <!-- Restlicher Inhalt -->
      <div class="menu-container">
        <!-- Überschrift für die Auswahl -->
        <div class="section-food big-title-4">
          <h2>unsere auswahl</h2>
        </div>

        <div class="menu-sections">
          <!-- Karte 1: Vorspeisen -->
          <section class="menu-card">
            <h2 class="big-title-3">Vorspeisen</h2>
            <div class="card-content">
              <div class="dish-entry">
                <div class="dish-description">Tagessuppe</div>
                <span class="dish-price">5,80 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">
                  Vorspeise Haus-Hamburg
                  <div class="note">
                    (Matjesfilets, Aalrauch-Matjesfilets, Bismarckhering, Brathering, Salatgarnitur)
                  </div>
                </div>
                <span class="dish-price">9,90 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">
                  Vorspeise Haus-Hamburg deluxe<br />
                  <div class="note">
                    (Matjesfilets, Aalrauch-Matjesfilets, Bismarckhering, Brathering,<br />
                    Räucherlachs und Greetsieler Kutterkrabben, Salatgarnitur)
                  </div>
                </div>
                <span class="dish-price">14,80 €</span>
              </div>
              <div class="note">
                … auch als Hauptgericht mit Bratkartoffeln und Salat (Aufpreis 7,00 €)
              </div>
            </div>
          </section>

          <!-- Karte 2: Fischgerichte -->
          <section class="menu-card">
            <h2 class="big-title-3">Fischgerichte</h2>
            <div class="card-content">
              <div class="dish-entry">
                <div class="dish-description">Nordsee Scholle – filetiert</div>
                <span class="dish-price">22,50 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">
                  Finkenwerder Art (Schinkenwürfel)
                </div>
                <span class="dish-price">23,50 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">und mit Krabben</div>
                <span class="dish-price">26,50 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">
                  Fischplatte für 1 Person
                  <div class="note">
                    (Auswahl unserer beliebtesten Fischfilets, Greetsieler Krabben, Bratkartoffeln, Salat)
                  </div>
                </div>
                <span class="dish-price">25,50 €</span>
                <div class="note">
                  Zu allen unseren Fischgerichten reichen wir unsere hausgemachten Bratkartoffeln mit Speck und Zwiebeln sowie einen kleinen gemischten Salat.
                </div>
              </div>
            </div>
          </section>

          <!-- Karte 3: Von Weide und Feld -->
          <section class="menu-card third-section">
            <h2 class="big-title-3">Von Weide und Feld</h2>
            <div class="card-content">
              <div class="dish-entry">
                <div class="dish-description">Rahmschnitzel mit RAS Frites und Salat</div>
                <span class="dish-price">17,50 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">Tomahawk vom Ammerländer Edelschwein</div>
                <span class="dish-price">24,50 €</span>
                <div class="note">(mit RAS Frites und Salat)</div>
              </div>

              <div class="dish-entry">
                <div class="dish-description">Vegan/Vegetarisches Tagesgericht</div>
                <span class="dish-price">17,50 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">
                  Ofenkartoffel<br />
                  • mit Sour-Cream
                </div>
                <span class="dish-price">9,50 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">
                  • mit Räucherlachs und Sour-Cream
                </div>
                <span class="dish-price">15,50 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">
                  • mit Sour-Cream und Greetsieler Krabben
                </div>
                <span class="dish-price">19,50 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">
                  Grünkohl mit Mettenden und Pinkel und Bratkartoffeln
                </div>
                <span class="dish-price">19,90 €</span>
              </div>

              <div class="dish-entry">
                <div class="dish-description">
                  Snirtjebraten mit Sauce und Bratkartoffeln
                </div>
                <span class="dish-price">21,30 €</span>
              </div>
            </div>
          </section>
        </div>

        <div class="pdf-container">
          <button class="view-btn" @click="openModal">
            Speisekarte als PDF ansehen
          </button>
        </div>
      </div>

      <!-- Modal für die PDF-Vorschau -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-btn" @click="closeModal">&times;</button>
          <iframe :src="pdfSrc" frameborder="0" title="Speisekarte Haus Hamburg"></iframe>
        </div>
      </div>
    </BasePage>
    <ContactInfo />
  </template>

  <script>
  import BasePage from "@/components/BasePage.vue";
  import pdfFile from "@/assets/Speisekarte_HausHamburg.pdf";
  import ContactInfo from "@/components/ContactInfo.vue";

  export default {
    name: "Speisekarte",
    components: { BasePage, ContactInfo },
    data() {
      return {
        pdfSrc: pdfFile,
        showModal: false,
      };
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
    },
  };
  </script>

  <style scoped>
  .menu-container {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Grid-Layout für die Karten */
  .menu-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .menu-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .menu-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .menu-card h2 {
    background: var(--blue);
    color: #fff;
    margin: 0;
    padding: 1rem;
    font-family: var(--font-thunder);
    text-align: center;
  }

  .card-content {
    padding: 1.1rem;
    text-align: left;
  }

  /* Einheitliches Grid für jedes Gericht */
  .dish-entry {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    margin-bottom: 1rem;
    column-gap: 2rem;
  }

  .dish-price {
    font-weight: bold;
  }

  /* Notizen und Kontaktinfo */
  .note {
    font-style: italic;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 1rem;
  }

  .contact-info {
    font-size: 0.9rem;
    text-align: center;
    color: #555;
    margin-top: 1.5rem;
  }

  /* Button zum Öffnen des PDF-Modals */
  .pdf-container {
    display: flex;
    justify-content: center;
  }

  .view-btn {
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    border: none;
    background: var(--gold);
    color: var(--blue);
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
  }

  .view-btn:hover {
    background: var(--blue);
    color: #fff;
    transform: scale(1.02);
  }

  /* Modal-Stile */
  .modal-overlay {
    position: fixed;
    top: 7em;
    left: 0;
    width: 100%;
    height: 91%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    position: relative;
    width: 90%;
    max-width: 900px;
    height: 90%;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .modal-content iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.8rem;
    background: transparent;
    border: none;
    font-size: 2rem;
    line-height: 1;
    color: #333;
    cursor: pointer;
    z-index: 10;
  }

  @media (max-width: 767px) {
    .pdf-container {
      display: none;
    }
  }

  @media (min-width: 767px) {
    .menu-container {
      padding: 1em;
    }
    .dish-description {
      font-size: 1.3rem;
    }
  }
  </style>
