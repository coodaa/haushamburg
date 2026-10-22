<template>
  <div v-if="showBanner" class="cookie-banner">
    <p>
      Mit Ihrer Einwilligung nutzen wir Google Analytics, um zu verstehen, wie unsere Website genutzt wird.
      Dabei werden Cookies gesetzt und Daten an Google übermittelt. Ohne Einwilligung findet keine Analyse statt.
      Sie können Ihre Entscheidung jederzeit über „Cookie-Einstellungen“ im Seitenfuß ändern.
      Mehr in der <router-link to="/datenschutz" class="banner-link">Datenschutzerklärung</router-link>.
    </p>
    <div class="button-group">
      <button @click="declineCookies">Ablehnen</button>
      <button @click="acceptCookies">Akzeptieren</button>
    </div>
  </div>
</template>

<script>
import { hasConsent, setConsent, disableAnalytics } from "@/analytics.js";

export default {
  name: "CookieBanner",
  data() {
    return {
      showBanner: false,
    };
  },
  mounted() {
    let decided = false;
    try {
      decided = localStorage.getItem("cookiesAccepted") !== null;
    } catch {
      decided = false;
    }
    this.showBanner = !decided;
    window.addEventListener("open-cookie-settings", this.open);
  },
  beforeUnmount() {
    window.removeEventListener("open-cookie-settings", this.open);
  },
  methods: {
    open() {
      this.showBanner = true;
    },
    acceptCookies() {
      setConsent(true);
      this.showBanner = false;
      this.$emit("cookiesAccepted");
    },
    declineCookies() {
      const wasAccepted = hasConsent();
      setConsent(false);
      this.showBanner = false;
      disableAnalytics();
      // Bereits geladenes Analytics-Skript sicher entfernen: Seite einmal neu laden
      if (wasAccepted) window.location.reload();
    },
  },
};
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--blue);
  color: #fff;
  padding: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  text-align: center;
}

.cookie-banner p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
  max-width: 600px;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cookie-banner button {
  padding: 0.5rem 1.2rem;
  border: none;
  background: var(--gold);
  color: var(--blue);
  cursor: pointer;
  border-radius: 30px;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.banner-link {
  color: var(--gold);
  text-decoration: underline;
}

.cookie-banner button:hover {
  background: #d1a531;
}

@media (min-width: 768px) {
  .cookie-banner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  .button-group {
    flex-wrap: nowrap;
    justify-content: flex-end;
  }

  .cookie-banner p {
    margin-right: 1rem;
    text-align: left;
  }
}
</style>
