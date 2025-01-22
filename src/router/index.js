import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Speisekarte from "../views/Speisekarte.vue";
import Service from "../views/Service.vue";
import Ueber from "../views/Ueber.vue";

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
  {
    path: "/speisekarte",
    name: "Speisekarte",
    component: Speisekarte,
  },
  {
    path: "/service",
    name: "Service",
    component: Service,
  },
  {
    path: "/ueber",
    name: "Ueber",
    component: Ueber,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
