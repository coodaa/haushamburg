<!-- src/views/Speisekarte.vue -->
<template>
  <BasePage
    imageSrc="/images/food/haus_hamburg_leer_013.webp"
    imageAlt="Haus Hamburg Speisekarte"
    titleAbove="Unsere"
    titleMain="Speisekarte"
    subtitle="Entdeckt ju uns' veeleise Gerechten."
    heading="Unsere Auswahl"
    flowText="Demnächst wird es noch einfacher, unsere Gerichte zu genießen! Wählen Sie Ihre Favoriten direkt online, geben Sie Ihre Bestellung mit wenigen Klicks auf und entscheiden Sie, ob Sie Ihre Speisen selbst abholen oder entspannt nach Hause liefern lassen möchten. Genuss war noch nie so unkompliziert!"
    parallaxImageSrc="/images/food/haus_hamburg_leer_021.webp"
    parallaxImageAlt="Speisekarte Parallax Bildbeschreibung"
  >
    <MenuList />
    <!-- Button zur Information -->
    <div class="menu-button-container">
      <a href="/kontakt" class="cta-button">
        <i class="fas fa-info-circle"></i>
        <span class="cta-text">Weitere Infos</span>
      </a>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage.vue";
import MenuList from "@/components/MenuList.vue";

export default {
  name: "Speisekarte",
  components: {
    BasePage,
    MenuList,
  },
};
</script>

<style scoped>
.menu-button-container {
  display: flex;
  justify-content: center;
  margin-top: 2em;
  padding-bottom: 1em;
}

/* Button-Stile anpassen */
.cta-button {
  font-size: 1.4rem;
  padding: 0.7em 1.5em;
  border-radius: 30px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: var(--gold);
  color: white;
  transition: background 0.3s ease, transform 0.2s ease;
}

.cta-button:hover {
  background-color: var(--dark-blue);
  transform: scale(1.05);
}
</style>
