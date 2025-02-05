

  <template>
  <BasePage
  imageSrc="/images/food/haus_hamburg_leer_013.webp"
  imageAlt="Speisekarte Haus Hamburg"
    titleAbove="unsere"
    titleMain="Speisekarte"
    subtitle="Frischer Fisch & regionale Spezialitäten"
    heading="Unsere Speisekarte"
    flowText="Entdecken Sie unsere köstlichen Fischgerichte, ostfriesische Spezialitäten und mehr. Frisch, regional und mit Liebe zubereitet."
    parallaxImageSrc="/images/food/haus_hamburg_leer_021.webp"
    parallaxImageAlt="Haus Hamburg Restaurant"
  >
    <div class="menu-container">
      <!-- Vorspeisen -->
      <section>
        <h3>Vorspeisen</h3>
        <ul>
          <li>
            <strong>Tagessuppe</strong> – 5,80 €<br />
            <span>soup of the day</span>
          </li>
          <li>
            <strong>Vorspeise Haus-Hamburg</strong> – 9,90 €<br />
            Matjesfilets, Bismarckhering, Brathering, Salatgarnitur
          </li>
          <li>
            <strong>Vorspeise Haus-Hamburg deluxe</strong> – 14,80 €<br />
            Mit Räucherlachs & Greetsieler Krabben (+7 € mit Bratkartoffeln & Salat)
          </li>
        </ul>
      </section>

      <!-- Fischgerichte -->
      <section>
        <h3>Fischgerichte</h3>
        <ul>
          <li>
            <strong>Nordsee Scholle</strong> (filetiert) – 22,50 €
          </li>
          <li>
            <strong>Finkenwerder Art</strong> (mit Schinkenwürfeln) – 23,50 €
          </li>
          <li>
            <strong>Scholle mit Krabben</strong> – 26,50 €
          </li>
          <li>
            <strong>Fischplatte für 1 Person</strong> – 25,50 €<br />
            Drei Fischfilets, Greetsieler Krabben, Bratkartoffeln, Salat
          </li>
        </ul>
      </section>

      <!-- Fleisch & Vegetarisch -->
      <section>
        <h3>Von Weide und Feld</h3>
        <ul>
          <li><strong>Rahmschnitzel</strong> mit RAS Frites & Salat – 17,50 €</li>
          <li><strong>Tomahawk vom Ammerländer Edelschwein</strong> – 24,50 €</li>
          <li><strong>Vegetarisches Tagesgericht</strong> – 17,50 €</li>
          <li>
            <strong>Ofenkartoffel</strong> mit Sour-Cream – 9,50 €<br />
            mit Räucherlachs – 15,50 € | mit Krabben – 19,50 €
          </li>
        </ul>
      </section>

      <!-- Ostfriesische Spezialitäten -->
      <section>
        <h3>Ostfriesische Spezialitäten</h3>
        <ul>
          <li>
            <strong>Grünkohl</strong> mit Mettenden, Pinkel & Bratkartoffeln – 19,90 €
          </li>
          <li>
            <strong>Snirtjebraten</strong> mit Sauce & Bratkartoffeln – 21,30 €
          </li>
        </ul>
      </section>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";

export default {
  name: "Speisekarte",
  components: {
    BasePage,
  },
};
</script>

<style scoped>
.menu-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  color: var(--blue);
  font-family: var(--font-thunder);
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
  line-height: 1.5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

li:last-child {
  border-bottom: none;
}
</style>
