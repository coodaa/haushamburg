<template>
  <div class="container">
    <div>
      <div class="navbar" :class="{ scrolled: isScrolled }">
        <div class="scalloped-svg" :class="{ hidden: isScrolled }"></div>

        <!-- Linke Seite: Burger-Menü & Navigationslinks (Desktop: sichtbar, Mobile: im Burger-Menü) -->
        <div class="nav-left">
          <div
            class="burger-menu"
            :class="{ open: menuOpen }"
            @click="toggleMenu"
            role="button"
            tabindex="0"
            aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            @keydown.enter.prevent="toggleMenu"
            @keydown.space.prevent="toggleMenu"
          >
            <div class="burger-icon"></div>
            <div class="burger-icon"></div>
            <div class="burger-icon"></div>
          </div>
          <!-- Navigationslinks (Desktop) -->
          <ul class="nav-links">
            <li><router-link to="/speisekarte">Speisekarte</router-link></li>
            <li><router-link to="/catering">Catering</router-link></li>
            <li><router-link to="/ueber">Über uns</router-link></li>
          </ul>
        </div>

        <!-- Mittig: Logo -->
        <div class="logo-container">
          <router-link to="/">
            <img src="@/assets/haushamburg_logo.svg" alt="Haus Hamburg Logo" class="logo" />
          </router-link>
        </div>

        <!-- Rechte Seite: Kontakt, Reservieren und Shop -->
        <div class="nav-right">
          <ul class="nav-links">
            <!-- Kontakt-Link (wird auf Mobile ausgeblendet) -->
            <li class="Kontakt-link">
              <router-link to="/Kontakt">Kontakt</router-link>
            </li>
            <!-- Reservieren-Link: Auf Desktop sichtbar, auf Mobilgeräten ausgeblendet -->
            <li class="reservierung-link">
              <router-link to="/reservierung">Reservieren</router-link>
            </li>
            <!-- Shop-Button -->

            <li>
  <router-link to="/shop" @click="closeMenu">
    <button class="cta-button btn-shop" aria-label="Shop" title="Shop">
      <i class="fas fa-fish"></i>
      <span class="cta-text">Online Shop</span>
    </button>
  </router-link>
</li>

          </ul>
        </div>
      </div>

      <!-- Mobiles Menü (Vollbild-Overlay mit Close-Button) -->
      <div class="mobile-menu" :class="{ open: menuOpen }" id="mobile-menu" role="menu">
        <button class="close-btn" @click="closeMenu" aria-label="Menü schließen">&times;</button>
        <ul class="mobile-links">
          <li>
            <router-link to="/speisekarte" @click="closeMenu">
              <button class="cta-button">Speisekarte</button>
            </router-link>
          </li>
          <li>
            <router-link to="/catering" @click="closeMenu">
              <button class="cta-button">Catering</button>
            </router-link>
          </li>
          <li>
            <router-link to="/ueber" @click="closeMenu">
              <button class="cta-button">Über uns</button>
            </router-link>
          </li>
          <li>
            <router-link to="/Kontakt" @click="closeMenu">
              <button class="cta-button">Kontakt</button>
            </router-link>
          </li>
          <!-- Reservieren-Link -->
          <li>
            <router-link to="/reservierung" @click="closeMenu">
              <button class="cta-button">Tisch buchen</button>
            </router-link>
          </li>
          <!-- Online bestellen: Hervorgehoben -->
          <li>
            <router-link to="/shop" @click="closeMenu">
              <button class="cta-button btn-shop" aria-label="Shop" title="Shop">
                <i class="fas fa-fish"></i>
                <span class="cta-text">Online bestellen</span>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  name: "Navbar",
  setup() {
    const isScrolled = ref(false);
    const menuOpen = ref(false);

    // Misst die Navbar-Höhe und setzt die CSS-Variable --navbar-height
    const updateNavbarHeight = () => {
      const navbarEl = document.querySelector(".navbar");
      if (navbarEl) {
        const height = navbarEl.offsetHeight;
        document.documentElement.style.setProperty("--navbar-height", `${height}px`);
      }
    };

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 300;
      updateNavbarHeight();
    };

    let scrollPosition = 0;

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;

  if (menuOpen.value) {
    scrollPosition = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "relative";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
    document.documentElement.classList.add("no-scroll");
  } else {
    closeMenu();
  }
};

const closeMenu = () => {
  menuOpen.value = false;
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("position");
  document.body.style.removeProperty("top");
  document.body.style.removeProperty("width");
  document.documentElement.classList.remove("no-scroll");

  // Wichtig: Scrollposition zurücksetzen
  window.scrollTo(0, scrollPosition);
};

    onMounted(() => {
      updateNavbarHeight();
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", updateNavbarHeight);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateNavbarHeight);
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

<style scoped>
/* Basis-Schriftart für das mobile Menü */
.mobile-menu,
.mobile-menu * {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* Navbar-Grundstyles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 2.7em 1em;
  padding-bottom: 1em;
  font-family: var(--font-thunder);
  text-transform: uppercase;
  background-color: #F2EDE9;
  transition: transform 0.3s ease-out, height 0.3s ease-out, padding 0.3s ease-out;
}

.navbar.scrolled {
  transform: translateY(-24px);
}

.logo-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: transform 0.3s ease, height 0.3s ease;
}

.logo {
  height: 4.5em;
  transition: height 0.3s ease, transform 0.3s ease;
  padding-top: 0;
}

.navbar.scrolled .logo {
  height: 4.5em;
  transform: scale(0.9);
}

.navbar::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 1em;
  right: 1em;
  border-bottom: 2px solid var(--blue);
}

.scalloped-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5em;
  background-image: url('@/assets/scalloped-navbar.svg');
  background-repeat: repeat-x;
  background-position: top left;
  background-size: calc(100% / 10);
  transition: transform 0.5s ease-out;
  transform: translateY(0);
  z-index: 1;
  pointer-events: none;
}

.scalloped-svg.hidden {
  transform: translateY(-100%) !important;
}

/* Burger-Menü (Mobile) */
.burger-menu {
  position: relative;
  width: 30px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.burger-icon {
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: var(--blue);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.burger-icon:nth-child(1) {
  top: 0;
}

.burger-icon:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.burger-icon:nth-child(3) {
  bottom: 0;
}

.burger-menu.open .burger-icon:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.burger-menu.open .burger-icon:nth-child(2) {
  opacity: 0;
}

.burger-menu.open .burger-icon:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

/* Desktop-Navigationslinks */
.nav-left .nav-links {
  display: none;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  gap: 1em;
  z-index: 1001;
}

.nav-right .Kontakt-link {
  display: none;
}

/* Shop-Button im Desktop */
.cta-button .cta-text {
  display: none;
}

@media (min-width: 1200px) {
  .cta-button .cta-text {
    display: inline;
  }
}

/* Mobiles Menü als Vollbild-Overlay */
.mobile-menu {
  position: fixed;
  top: 5vh;
  left: 0;
  width: 100%;
  height: 100%;
  background:     rgba(242, 237, 233, 0.95)  ; /* #F2EDE9 mit 80% Deckkraft */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  z-index: 999;
}

.mobile-menu.open {
  transform: translateY(0);
  opacity: 1;

}

/* Close-Button im mobilen Menü */
.close-btn {
 display: none;
}

.close-btn:hover {
  transform: scale(1.1);
}

/* Container und Anordnung der mobilen Links */
.mobile-links {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.mobile-links li {
  margin: 1rem auto;
  width: 90%;
  max-width: 350px;
  text-align: center;
}

/* Einheitlicher Button-Look für die Navigationseinträge */
.mobile-links button.cta-button,
.mobile-links a.cta-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  background-color: var(--blue);
  color: #fff;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-decoration: none;
}

/* Hover-Effekt für Standard-Buttons */
.mobile-links button.cta-button:hover,
.mobile-links a.cta-button:hover {
  background-color: var(--gold);
  transform: scale(1.02);
}

/* Icons in den Buttons */
.mobile-links button.cta-button i,
.mobile-links a.cta-button i {
  font-size: 1.4rem;
  vertical-align: middle;
  margin-right: 0.4rem;
}

/* Hervorhebung für den "Online bestellen"-Button */
.mobile-links button.cta-button.btn-shop {
  font-size: 1.8rem;
  padding: 1rem 1.2rem;
  background-color: var(--gold);
  color: var(--blue);
  border: 2px solid var(--gold);
  transform: none;
}

/* Optionaler Hover-Effekt für den hervorgehobenen Button */
.mobile-links button.cta-button.btn-shop:hover {
  background-color: #ffd700;
  transform: scale(1.03);
}

/* No-scroll, wenn das Menü geöffnet ist */
.no-scroll {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
}

html.no-scroll,
body.no-scroll {
  overflow: hidden;
  touch-action: none; /* <- verhindert Scroll auf Touchgeräten */
}

/* Responsive Anpassungen für Tablets */
@media (min-width: 768px) and (max-width: 1200px) {
  .navbar {
    padding: 4.5em 2em;
    padding-bottom: 1.5em;
  }
  .scalloped-svg {
    height: 5em;
    background-size: calc(100% / 20);
  }
  .logo {
    height: 5em;
  }
  .nav-left .nav-links {
    display: none !important;
  }
  .burger-menu {
    display: flex !important;
  }
  .nav-right .cta-button {
    width: auto;
    padding: 0.3em 1.1em;
    gap: 0.5em;
  }
  .nav-right .cta-button .cta-text {
    display: none;
  }
  .nav-right .cta-button i {
    margin-right: 0.5em;
  }
  .nav-left,
  .nav-right {
    display: flex;
    align-items: center;
  }
  .burger-menu {
    height: 24px;
    margin-right: 1em;
    position: relative;
    z-index: 1001;
  }
  .logo-container {
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  .navbar.scrolled {
    transform: translateY(-34px);
  }
}

/* Desktop Anpassungen */
@media (min-width: 1200px) {
  .navbar {
    justify-content: space-between;
    padding: 4.8em 6em;
    padding-bottom: 2em;
  }
  .logo {
    height: 6em;
  }
  .navbar.scrolled {
    transform: translateY(-40px);
  }
  .navbar.scrolled .logo {
    height: 6em;
    transform: scale(0.9);
  }
  .navbar::after {
    left: 2em;
    right: 2em;
  }
  .nav-left .nav-links {
    display: flex !important;
    flex-direction: row;
    gap: 2em;
  }
  .burger-menu {
    display: none !important;
  }
  .nav-right .Kontakt-link {
    display: flex;
    align-items: center;
  }
  .nav-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;
    gap: 2em;
  }
  .nav-links {
    flex-direction: row;
    gap: 2em;
    list-style: none;
    padding: 0;
    margin: 0;
    align-items: center;
  }
  .nav-links a {
    text-decoration: none;
    font-size: 2rem;
    color: var(--blue);
    transition: color 0.3s ease;
  }
  .nav-links a:hover {
    color: var(--gold);
  }
  .nav-right .cta-button {
    display: flex;
    align-items: center;
    gap: 0.5em;
    width: auto;
    padding: 0.3em 1.1em;
  }
  .nav-right .cta-button i {
    font-size: 1.2em;
    margin-right: 0.5em;
  }
  .nav-right .cta-button .cta-text {
    display: inline;
    font-size: 2rem;
  }
  .scalloped-svg {
    height: 3em;
    background-size: calc(100% / 30);
  }
}

/* Größere Bildschirme */
@media (min-width: 1440px) {
  .scalloped-svg {
    background-size: calc(100% / 40);
  }
}

/* Reservieren-Link: Auf Mobilgeräten ausblenden */
@media (max-width: 767px) {
  .reservierung-link {
    display: none !important;
  }
}

@media (max-width: 1199px) {
  .reservierung-link {
    display: none !important;
  }
}

/* Warenkorb-Badge */
.cart-link {
  position: relative;
}
.cart-badge {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: red;
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  min-width: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

/* Stelle sicher, dass der Text im Online Shop-Button im mobilen Menü sichtbar ist */
.mobile-menu .btn-shop .cta-text {
  display: inline !important;
}
</style>
