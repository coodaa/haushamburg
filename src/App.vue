<template>
  <div id="app">
    <Navbar />

    <main role="main" aria-label="Hauptinhalt">
      <transition
        name="fade-bounce"
        mode="out-in"
        @before-enter="beforeEnterTransition"
      >
        <router-view :key="$route.fullPath" />
      </transition>
    </main>

    <Footer />
    <CookieBanner @cookiesAccepted="loadGoogleAnalytics" />
    <OpenCartButton />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import CookieBanner from './components/CookieBanner.vue';
import OpenCartButton from '@/components/OpenCartButton.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    CookieBanner,
    OpenCartButton
  },
  methods: {
    beforeEnterTransition(el, done) {
      setTimeout(() => {
        const images = el.querySelectorAll('img');
        const total = images.length;
        if (total === 0) {
          if (typeof done === 'function') done();
          return;
        }
        let loaded = 0;
        const checkDone = () => {
          loaded++;
          if (loaded >= total && typeof done === 'function') done();
        };

        images.forEach(img => {
          if (img.complete) {
            checkDone();
          } else {
            img.addEventListener('load', checkDone);
            img.addEventListener('error', checkDone);
          }
        });

        // Fallback nach 3 Sekunden
        setTimeout(() => {
          if (typeof done === 'function') done();
        }, 3000);
      }, 50);
    },

    loadGoogleAnalytics() {
      if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;

      const script = document.createElement('script');
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-2FVK4ZXYNM";
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-2FVK4ZXYNM');
    },

    updateMeta(name, content) {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    }
  },

  mounted() {
    // Cookie-Zustimmung prüfen
    if (localStorage.getItem("cookiesAccepted") === "true") {
      this.loadGoogleAnalytics();
    }

    // Dynamische Meta-Tags nach jeder Route
    const router = useRouter();
    router.afterEach((to) => {
      const title = to.meta.title || "Haus Hamburg – Online Essen bestellen in Leer";
      const description = to.meta.description || "Jetzt Essen online bestellen in Leer bei Haus Hamburg – Fisch, Fleisch, vegetarisch und Catering. Lieferung nach Hause in Ostfriesland.";
      const keywords = to.meta.keywords || "Essen bestellen Leer, Fischrestaurant, Lieferservice, Catering, Haus Hamburg";

      document.title = title;
      this.updateMeta("description", description);
      this.updateMeta("keywords", keywords);
    });
  }
};
</script>

<style>
#app {
  position: relative;
  min-height: 100vh;
}

/* Transition-Stile */
.fade-bounce-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-bounce-enter-active {
  animation: fadeInBounce 0.6s cubic-bezier(0.35, 1.5, 0.6, 1) forwards;
  will-change: transform;
}

.fade-bounce-leave-active {
  animation: fadeOut 0.3s ease-in-out forwards;
  will-change: transform;
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
