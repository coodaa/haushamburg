<template>
  <div>
    <div class="navbar" :class="{'scrolled': isHidden}">
      <div class="scalloped-svg" :class="{'hidden': isHidden}"></div>

      <!-- Burger-Menü Icon -->
      <div class="burger-menu" :class="{ open: menuOpen }" @click="toggleMenu">
        <div class="burger-icon"></div>
        <div class="burger-icon"></div>
        <div class="burger-icon"></div>
      </div>

      <!-- Navigationslinks links -->
      <div class="nav-left">
        <ul class="nav-links">
          <li><router-link to="/speisekarte">Speisekarte</router-link></li>
          <li><router-link to="/catering">Catering</router-link></li>
          <li><router-link to="/ueber">Über uns</router-link></li>
        </ul>
      </div>

      <!-- Logo -->
      <div class="logo-container">
        <router-link to="/">
          <!-- Entferne die dynamische Klassenzuweisung 'scrolled' -->
          <img src="@/assets/haushamburg_logo.svg" alt="Haus Hamburg Logo" class="logo" />
        </router-link>
      </div>

      <!-- Navigationslinks rechts -->
      <div class="nav-right">
        <ul class="nav-links">
          <!-- "Kontakt"-Link nur auf Desktop anzeigen -->
          <li class="Kontakt-link">
            <router-link to="/Kontakt">Kontakt</router-link>
          </li>
          <!-- "Reservieren"-Button -->
          <li>
            <router-link to="/reservierung">
              <button class="cta-button" aria-label="Reservieren" title="Reservieren">
                <i class="fas fa-utensils"></i>
                <span class="cta-text">Reservieren</span>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mobile Menü -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <ul class="mobile-links">
        <li><router-link to="/speisekarte" @click="closeMenu">Speisekarte</router-link></li>
        <li><router-link to="/catering" @click="closeMenu">Catering</router-link></li>
        <li><router-link to="/ueber" @click="closeMenu">Über uns</router-link></li>
        <li><router-link to="/Kontakt" @click="closeMenu">Kontakt</router-link></li>
        <li>
          <router-link to="/reservierung" @click="closeMenu">
            <button class="cta-button">Buche einen Tisch</button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted } from "vue";
import "@/styles/Navbar.css";

export default {
  name: "Navbar",
  setup() {
    const isHidden = ref(false);
    const menuOpen = ref(false);

    const handleScroll = () => {
      isHidden.value = window.scrollY > 300;
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
      if (menuOpen.value) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    };

    const closeMenu = () => {
      menuOpen.value = false;
      document.body.classList.remove("no-scroll");
    };

    window.addEventListener("scroll", handleScroll);
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isHidden,
      menuOpen,
      toggleMenu,
      closeMenu,
    };
  },
};
</script>
