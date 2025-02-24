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
    if (localStorage.getItem("cookiesAccepted") === null) {
      this.showBanner = true;
    }
  },
  methods: {
    acceptCookies() {
      localStorage.setItem("cookiesAccepted", "true");
      this.showBanner = false;
      this.$emit("cookiesAccepted");
    },
    declineCookies() {
      localStorage.setItem("cookiesAccepted", "false");
      this.showBanner = false;
      // Optional: Entferne GA-Script, falls es bereits geladen wurde.
      const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      if (gaScript) {
        gaScript.remove();
      }
      window.gtag = undefined;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}
.cookie-banner p {
  margin: 0;
  flex: 1;
  font-size: 1rem;
}
.cookie-banner button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background: var(--gold);
  color: var(--blue);
  cursor: pointer;
  border-radius: 30px;
  transition: background 0.3s ease;
}
.cookie-banner button:hover {
  background: #d1a531;
}
</style>
