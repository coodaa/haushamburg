<!-- src/components/CookieBanner.vue -->
<template>
  <div v-if="showBanner" class="cookie-banner">
    <p>
      Wir verwenden Cookies, um Ihnen das beste Nutzererlebnis auf unserer Website zu bieten. Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
    </p>
    <button @click="acceptCookies">Akzeptieren</button>
    <button @click="declineCookies">Ablehnen</button>
  </div>
</template>

<script>
export default {
  name: "CookieBanner",
  data() {
    return {
      showBanner: false,
    };
  },
  mounted() {
    if (!localStorage.getItem("cookiesAccepted")) {
      this.showBanner = true;
    }
  },
  methods: {
    acceptCookies() {
      localStorage.setItem("cookiesAccepted", "true");
      this.showBanner = false;
      // Initialisiere hier deine Cookies oder Tracking-Tools
    },
    declineCookies() {
      localStorage.setItem("cookiesAccepted", "false");
      this.showBanner = false;
      // Verhindere hier das Setzen von nicht notwendigen Cookies
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
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cookie-banner p {
  margin: 0;
  flex: 1;
}

.cookie-banner button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background: var(--blue);
  color: white;
  cursor: pointer;
}

.cookie-banner button:hover {
  background: darken(var(--blue), 10%);
}
</style>
