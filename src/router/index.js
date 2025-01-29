// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Lazy Loading der Komponenten
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" }; // Scrollt sanft nach oben
  },
});

export default router;
