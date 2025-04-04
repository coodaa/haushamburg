<template>
  <div v-if="showBanner" class="cookie-banner">
    <p>
      Wir verwenden Cookies, um Ihnen das beste Nutzererlebnis auf unserer Website zu bieten.
      Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
    </p>
    <div class="button-group">
      <button @click="acceptCookies">Akzeptieren</button>
      <button @click="declineCookies">Ablehnen</button>
    </div>
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
