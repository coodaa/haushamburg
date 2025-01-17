<template>
  <div>
    <div class="navbar" :class="{'scrolled': isHidden}">
      <div class="scalloped-svg" :class="{'hidden': isHidden}"></div>

      <div class="burger-menu" @click="toggleMenu">
        <div class="burger-icon"></div>
        <div class="burger-icon"></div>
        <div class="burger-icon"></div>
      </div>

      <div class="nav-left">
        <ul class="nav-links">
          <li><a href="#">Speisekarte</a></li>
          <li><a href="#">Service</a></li>
          <li><a href="#">Über</a></li>
        </ul>
      </div>

      <div class="logo-container">
        <img src="@/assets/haushamburg_logo.svg" alt="Haus Hamburg Logo" class="logo" />
      </div>

      <div class="nav-right">
        <ul class="nav-links">
          <li class="contact-link"><a href="#">Kontakt</a></li>
          <li>
            <button class="cta-button"> Tisch buchen</button>
          </li>
        </ul>
      </div>
    </div>

    <div class="mobile-menu" :class="{ open: menuOpen }">
      <ul class="mobile-links">
        <li><a href="#">Speisekarte</a></li>
        <li><a href="#">Service</a></li>
        <li><a href="#">Über</a></li>
        <li><a href="#">Kontakt</a></li>
        <li><button class="cta-button">Buche einen Tisch</button></li>
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
      isHidden.value = window.scrollY > 150;
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
      if (menuOpen.value) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);
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
