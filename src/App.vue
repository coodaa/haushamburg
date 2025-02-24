<template>
  <div id="app">
    <Navbar />
    <transition
      name="fade-bounce"
      mode="out-in"
      @before-enter="beforeEnterTransition"
    >
      <router-view :key="$route.fullPath" />
    </transition>
    <Footer />
    <!-- Event-Binding: Wenn Cookies akzeptiert werden, wird loadGoogleAnalytics aufgerufen -->
    <CookieBanner @cookiesAccepted="loadGoogleAnalytics" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import CookieBanner from './components/CookieBanner.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    CookieBanner,
  },
  methods: {
    beforeEnterTransition(el, done) {
      setTimeout(() => {
        const images = el.querySelectorAll('img');
        const total = images.length;
        if (total === 0) {
          if (typeof done === 'function') {
            done();
          }
          return;
        }
        let loaded = 0;
        const checkDone = () => {
          loaded++;
          if (loaded >= total && typeof done === 'function') {
            done();
          }
        };

        images.forEach(img => {
          if (img.complete) {
            checkDone();
          } else {
            img.addEventListener('load', checkDone);
            img.addEventListener('error', checkDone);
          }
        });
        // Fallback, falls ein Bild zu lange lädt
        setTimeout(() => {
          if (typeof done === 'function') {
            done();
          }
        }, 3000);
      }, 50);
    },
    loadGoogleAnalytics() {
      // Prüfen, ob das GA-Script schon geladen wurde
      if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;

      const script = document.createElement('script');
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-2FVK4ZXYNM";
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-2FVK4ZXYNM');
    }
  },
  mounted() {
    // Falls der Nutzer bereits zugestimmt hat, direkt GA laden
    if (localStorage.getItem("cookiesAccepted") === "true") {
      this.loadGoogleAnalytics();
    }
  }
};
</script>

<style>
#app {
  position: relative;
  min-height: 100vh;
}

/* Transition-Klassen für Fade und Bounce */
.fade-bounce-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-bounce-enter-active {
  animation: fadeInBounce 0.6s cubic-bezier(0.35, 1.5, 0.6, 1) forwards;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.fade-bounce-leave-active {
  animation: fadeOut 0.3s ease-in-out forwards;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.fade-bounce-enter-active,
.fade-bounce-leave-active {
  width: 100%;
  top: 0;
  left: 0;
}

@keyframes fadeInBounce {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  60% {
    opacity: 1;
    transform: translateY(-10px);
  }
  80% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

@media (max-width: 767px) {
  .fade-bounce-enter-from {
    opacity: 1 !important;
    transform: none !important;
  }
  .fade-bounce-enter-active,
  .fade-bounce-leave-active {
    animation: none !important;
  }
}
</style>
