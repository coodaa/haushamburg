import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// Passe den Importpfad für Contact.vue an:
import Contact from "../components/Contact.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  // Weitere Routen hier hinzufügen
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
