<template>
  <div class="navbar" :class="{'scrolled': isHidden}">
    <!-- Tropfen SVG hinzufügen und Klasse dynamisch binden -->
    <div class="scalloped-svg" :class="{'hidden': isHidden}"></div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Burger Menu für mobile Ansicht -->
    <div class="burger-menu" @click="toggleMenu">
      <div class="burger-icon"></div>
      <div class="burger-icon"></div>
      <div class="burger-icon"></div>
    </div>

    <!-- Links links von Logo -->
    <div class="nav-left">
      <ul class="nav-links">
        <li><a href="#">Speisekarte</a></li>
        <li><a href="#">Service</a></li>
        <li><a href="#">Über</a></li>
      </ul>
    </div>

    <!-- Logo in der Mitte -->
    <div class="logo-container">
      <img src="@/assets/haushamburg_logo.svg" alt="Haus Hamburg Logo" class="logo" />
    </div>

    <!-- Links rechts vom Logo -->
    <div class="nav-right">
      <ul class="nav-links">
        <li><a href="#">Kontakt</a></li>
        <li>
          <button class="cta-button">Buche einen Tisch</button>
        </li>
      </ul>
    </div>
  </div>

  <!-- Mobile Menü -->
  <div class="mobile-menu" v-if="menuOpen">
    <ul class="mobile-links">
      <li><a href="#">Speisekarte</a></li>
      <li><a href="#">Service</a></li>
      <li><a href="#">Über</a></li>
      <li><a href="#">Kontakt</a></li>
      <li><button class="cta-button">Buche einen Tisch</button></li>
    </ul>
  </div>
</template>

<script>
import { ref, onUnmounted } from "vue";
import "@/styles/Navbar.css"; // Importiere das separate CSS

export default {
  name: "Navbar",
  setup() {
    const isHidden = ref(false);
    const menuOpen = ref(false);

    const handleScroll = () => {
      // Wenn mehr als 100px gescrollt wird, setze isHidden auf true
      isHidden.value = window.scrollY > 100;
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    window.addEventListener("scroll", handleScroll);

    // Aufräumen des Event-Listeners beim Komponentenumount
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isHidden,
      menuOpen,
      toggleMenu,
    };
  },
};
</script>
