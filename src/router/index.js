import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  // Weitere Routen, falls vorhanden
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
