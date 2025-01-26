import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Kontakt from "../views/Kontakt.vue";
import Speisekarte from "../views/Speisekarte.vue";
import Catering from "../views/Catering.vue";
import Ueber from "../views/Ueber.vue";
import NotFound from "../views/NotFound.vue"; // Optional: 404-Seite

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Kontakt",
    name: "Kontakt",
    component: Kontakt,
  },
  {
    path: "/speisekarte",
    name: "Speisekarte",
    component: Speisekarte,
  },
  {
    path: "/catering",
    name: "Catering",
    component: Catering,
  },
  {
    path: "/ueber",
    name: "Ueber",
    component: Ueber,
  },
  // Optional: 404-Seite
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
