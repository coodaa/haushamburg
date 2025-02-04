<template>
      <div class="container">

  <div>
    <div class="navbar" :class="{ 'scrolled': isScrolled }">
      <div class="scalloped-svg" :class="{ 'hidden': isScrolled }"></div>

      <div class="nav-left">
        <div
          class="burger-menu"
          :class="{ open: menuOpen }"
          @click="toggleMenu"
          role="button"
          tabindex="0"
          aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @keydown.enter.space.prevent="toggleMenu"
        >
          <div class="burger-icon"></div>
          <div class="burger-icon"></div>
          <div class="burger-icon"></div>
        </div>
        <ul class="nav-links">
          <li><router-link to="/speisekarte">Speisekarte</router-link></li>
          <li><router-link to="/catering">Catering</router-link></li>
          <li><router-link to="/ueber">Über uns</router-link></li>
        </ul>
      </div>

      <div class="logo-container">
        <router-link to="/">
          <img src="@/assets/haushamburg_logo.svg" alt="Haus Hamburg Logo" class="logo" />
        </router-link>
      </div>

      <div class="nav-right">
        <ul class="nav-links">
          <li class="Kontakt-link">
            <router-link to="/Kontakt">Kontakt</router-link>
          </li>
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

    <div class="mobile-menu" :class="{ open: menuOpen }" id="mobile-menu" role="menu">
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
</div>

</template>

<script>
import { ref, onUnmounted } from "vue";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/Navbar.css";

export default {
  name: "Navbar",
  setup() {
    const isScrolled = ref(false);
    const menuOpen = ref(false);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 300;
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
      isScrolled,
      menuOpen,
      toggleMenu,
      closeMenu,
    };
  },
};
</script>
