<!-- src/components/Footer.vue -->
<template>
  <footer class="footer">
    <div class="social-media">
      <a href="https://facebook.com" target="_blank" aria-label="Facebook">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://instagram.com" target="_blank" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
    </div>
    <div class="footer-links">
      <router-link to="/impressum">Impressum</router-link>
      <router-link to="/datenschutz">Datenschutz</router-link>
      <router-link to="/stellenangebote">Stellenangebote</router-link>
      <router-link to="/kontakt">Kontakt</router-link>
    </div>
    <p>&copy; 2025 Haus Hamburg. Alle Rechte vorbehalten.</p>
  </footer>
</template>

<script>

export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: var(--blue); /* Dunkelblauer Hintergrund */
  color: #fff; /* Weiße Schrift */
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.social-media {
  display: flex;
  gap: 1.5rem; /* Abstand zwischen den Icons */
  justify-content: center;
}

.social-media a {
  color: #fff; /* Weiße Icons */
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-media a:hover {
  color: var(--gold); /* Goldene Farbe beim Hover */
}

.footer-links {
  display: flex;
  gap: 1.5rem; /* Abstand zwischen den Links */
  justify-content: center;
  flex-wrap: wrap; /* Zeilenumbruch bei kleinerem Bildschirm */
}

.footer-links a {
  text-decoration: none;
  color: #fff; /* Weiße Schrift */
  font-size: 1rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--gold); /* Goldene Farbe beim Hover */
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
}

/* Mobile Anpassungen */
@media (max-width: 767px) {
  .footer-links {
    flex-direction: column; /* Links untereinander auf mobilen Geräten */
    gap: 0.5rem;
  }
}

</style>
