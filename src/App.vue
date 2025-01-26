<!-- src/App.vue -->
<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
    <CookieBanner />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CookieBanner from './components/CookieBanner.vue' // Importiere das CookieBanner-Komponent

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    CookieBanner // Füge es den Komponenten hinzu
  }
}
</script>

<!-- Kein <style> Block nötig,
     da das globale Styling in Global.css liegt. -->
