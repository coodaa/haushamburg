<template>
  <div>
    <div class="navbar" :class="{'scrolled': isHidden}">
      <div class="scalloped-svg" :class="{'hidden': isHidden}"></div>

      <div class="burger-menu" :class="{ open: menuOpen }" @click="toggleMenu">
        <div class="burger-icon"></div>
        <div class="burger-icon"></div>
        <div class="burger-icon"></div>
      </div>

      <div class="nav-left">
        <ul class="nav-links">
          <li><router-link to="/speisekarte">Speisekarte</router-link></li>
          <li><router-link to="/caterin">Catering</router-link></li>
          <li><router-link to="/ueber">Über</router-link></li>
        </ul>
      </div>

      <div class="logo-container">
        <router-link to="/">
          <img :class="{'scrolled': isHidden}" src="@/assets/haushamburg_logo.svg" alt="Haus Hamburg Logo" class="logo" />
        </router-link>
      </div>

      <div class="nav-right">
        <ul class="nav-links">
          <li class="Kontakt-link"><router-link to="/Kontakt">Kontakt</router-link></li>
          <li>
            <router-link to="/Kontakt">
              <button class="cta-button">
                <i class="fas fa-calendar-check"></i>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="mobile-menu" :class="{ open: menuOpen }">
      <ul class="mobile-links">
        <li><router-link to="/speisekarte" @click="closeMenu">Speisekarte</router-link></li>
        <li><router-link to="/caterin" @click="closeMenu">Catering</router-link></li>
        <li><router-link to="/ueber" @click="closeMenu">Über</router-link></li>
        <li><router-link to="/Kontakt" @click="closeMenu">Kontakt</router-link></li>
        <li>
          <router-link to="/Kontakt" @click="closeMenu">
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
      isHidden.value = window.scrollY > 200;
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
