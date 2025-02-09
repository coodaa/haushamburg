import { createRouter, createWebHistory } from "vue-router";

// Lazy Loading der Komponenten für bessere Performance
const Home = () => import("../views/Home.vue");
const Kontakt = () => import("../views/Kontakt.vue");
const Speisekarte = () => import("../views/Speisekarte.vue");
const Catering = () => import("../views/Catering.vue");
const Ueber = () => import("../views/Ueber.vue");
const Reservierung = () => import("../views/Reservierung.vue");
const Impressum = () => import("../views/Impressum.vue");
const Datenschutz = () => import("../views/Datenschutz.vue");
const Stellenangebote = () => import("../views/Stellenangebote.vue");
const NotFound = () => import("../views/NotFound.vue");
import TestOrder from '../components/TestOrder.vue';


// Definiere die Routen für deine Anwendung
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/kontakt",
    name: "kontakt",
    component: Kontakt,
  },
  {
    path: "/speisekarte",
    name: "speisekarte",
    component: Speisekarte,
  },
  {
    path: "/catering",
    name: "catering",
    component: Catering,
  },
  {
    path: "/ueber",
    name: "ueber",
    component: Ueber,
  },
  {
    path: "/reservierung",
    name: "reservierung",
    component: Reservierung,
  },
  {
    path: "/impressum",
    name: "impressum",
    component: Impressum,
  },
  {
    path: "/datenschutz",
    name: "datenschutz",
    component: Datenschutz,
  },
  {
    path: "/stellenangebote",
    name: "stellenangebote",
    component: Stellenangebote,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
  {
    path: '/test-order',
    name: 'TestOrder',
    component: TestOrder
  },

];

const router = createRouter({
  history: createWebHistory(), // WICHTIG: Vue Router läuft im History Mode für Vercel
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" }; // Sanftes Scrollen beim Routenwechsel
  },
});

export default router;
