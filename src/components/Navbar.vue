<template>
  <div class="container">
    <div>
      <div class="navbar" :class="{ 'scrolled': isScrolled }">
        <div class="scalloped-svg" :class="{ 'hidden': isScrolled }"></div>

        <!-- Linke Seite: Burger-Menü & Navigationslinks -->
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
            <!-- Reservieren-Link (neu, als Textlink neben Kontakt; wird auf Mobile ausgeblendet) -->
            <li class="reservierung-link">
              <router-link to="/reservierung">Reservieren</router-link>
            </li>
            <!-- Shop-Button: Auf Desktop zeigt er "Shop" + Icon, auf Mobile nur das Icon -->
            <li>
              <router-link to="/shop">
                <button class="cta-button" aria-label="Shop" title="Shop">
                  <i class="fas fa-shopping-cart"></i>
                  <span class="cta-text">Shop</span>
                </button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Mobiles Menü -->
      <div class="mobile-menu" :class="{ open: menuOpen }" id="mobile-menu" role="menu">
        <ul class="mobile-links">
          <li><router-link to="/speisekarte" @click="closeMenu">Speisekarte</router-link></li>
          <li><router-link to="/catering" @click="closeMenu">Catering</router-link></li>
          <li><router-link to="/ueber" @click="closeMenu">Über uns</router-link></li>
          <li><router-link to="/Kontakt" @click="closeMenu">Kontakt</router-link></li>
          <li>
            <router-link to="/reservierung" @click="closeMenu">
              <button class="cta-button">Reservieren</button>
            </router-link>
          </li>
          <!-- Optional: Shop-Link im mobilen Menü, falls erwünscht -->
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

    // Beispielweise: Wenn du noch keinen Warenkorb-Store hast, setze testweise eine Anzahl
    const itemsCount = ref(2);

    return {
      isScrolled,
      menuOpen,
      toggleMenu,
      closeMenu,
      itemsCount,
    };
  },
};
</script>

<style scoped>
/* Grundlegende Navbar-Stile */

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
  background-color: #000;
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

/* Navigationslinks */
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

/* Rechte Navigation */
.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  gap: 1em;
  z-index: 1001;
}

/* Reservierung & Shop: Auf Desktop wird im Shop-Button der Text angezeigt, auf Mobile nur das Icon */
.cta-button .cta-text {
  display: none;
}

@media (min-width: 1200px) {
  .cta-button .cta-text {
    display: inline;
  }
}

/* Neuer Reservierung-Link: soll auf Desktop angezeigt, aber auf Mobile ausgeblendet */
.reservierung-link {
  /* Standardmäßig angezeigt (Desktop) */
  font-size: 1.2rem;
  text-transform: uppercase;
  color: var(--blue);
  font-weight: bold;
}

/* Mobile: Reservierung-Link ausblenden */
@media (max-width: 768px) {
  .reservierung-link {
    display: none;
  }
}

/* Mobile Menü */
.mobile-menu {
  position: fixed;
  top: 3em;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--blue);
  color: #fff;
  padding: 100px 20px;
  transform: translateX(-100%);
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  z-index: 999;
}

.mobile-menu.open {
  transform: translateX(0);
  opacity: 1;
}

.mobile-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;
}

.mobile-links a {
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  transition: color 0.3s ease;
}

.mobile-links a:hover {
  color: var(--gold);
}

/* Kein Scrollen, wenn Menü geöffnet */
.no-scroll {
  overflow: hidden;
  height: 100%;
}

/* Tablets */
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

/* Desktop Geräte */
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
    gap: 1em;
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
</style>
