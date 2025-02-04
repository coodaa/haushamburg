<!-- src/App.vue -->
<template>
  <div id="app">
    <Navbar />
    <!-- Transition um den Router-View -->
    <transition name="fade-bounce" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
    <Footer />
    <CookieBanner />
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
    CookieBanner
  }
};
</script>

<style>
/* Container relativ positionieren, um absolute Kinder zu ermöglichen */
#app {
  position: relative;
  min-height: 100vh; /* Optional: Sicherstellen, dass der Container die volle Höhe hat */
}

/* 🔵 Transition-Klassen für Fade und Bounce */
.fade-bounce-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-bounce-enter-active {
  animation: fadeInBounce 0.6s cubic-bezier(0.35, 1.5, 0.6, 1) forwards;
}

.fade-bounce-leave-active {
  animation: fadeOut 0.3s ease-in-out forwards;
}

/* Positionierung der enter-active und leave-active Klassen */
.fade-bounce-enter-active,
.fade-bounce-leave-active {
  width: 100%;
  top: 0;
  left: 0;
}

/* 🌟 Einblend-Animation (mit Bounce) */
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

/* 🔥 Ausblend-Animation */
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
</style>
