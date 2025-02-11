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

// Neue Routen für Bestellung und Checkout
const OrderPage = () => import("../views/OrderPage.vue");
const CheckoutPage = () => import("../views/CheckoutPage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Haus Hamburg - Startseite",
      description: "Willkommen im Haus Hamburg!",
    },
  },
  {
    path: "/kontakt",
    name: "kontakt",
    component: Kontakt,
    meta: {
      title: "Kontakt - Haus Hamburg",
      description: "Kontaktieren Sie uns!",
    },
  },
  {
    path: "/speisekarte",
    name: "speisekarte",
    component: Speisekarte,
    meta: {
      title: "Speisekarte - Haus Hamburg",
      description: "Unsere leckere Speisekarte",
    },
  },
  {
    path: "/catering",
    name: "catering",
    component: Catering,
    meta: {
      title: "Catering - Haus Hamburg",
      description: "Unser Catering-Service",
    },
  },
  {
    path: "/ueber",
    name: "ueber",
    component: Ueber,
    meta: {
      title: "Über uns - Haus Hamburg",
      description: "Über unser Restaurant",
    },
  },
  {
    path: "/reservierung",
    name: "reservierung",
    component: Reservierung,
    meta: {
      title: "Reservierung - Haus Hamburg",
      description: "Reservieren Sie jetzt!",
    },
  },
  {
    path: "/impressum",
    name: "impressum",
    component: Impressum,
    meta: {
      title: "Impressum - Haus Hamburg",
      description: "Impressum unserer Website",
    },
  },
  {
    path: "/datenschutz",
    name: "datenschutz",
    component: Datenschutz,
    meta: {
      title: "Datenschutz - Haus Hamburg",
      description: "Datenschutzbestimmungen",
    },
  },
  {
    path: "/stellenangebote",
    name: "stellenangebote",
    component: Stellenangebote,
    meta: {
      title: "Stellenangebote - Haus Hamburg",
      description: "Offene Stellen",
    },
  },
  // Neue Routen:
  {
    path: "/order",
    name: "order",
    component: OrderPage,
    meta: {
      title: "Online Bestellung - Haus Hamburg",
      description: "Wählen Sie Ihre Gerichte aus und bestellen Sie online.",
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutPage,
    meta: {
      title: "Checkout - Haus Hamburg",
      description: "Überprüfen Sie Ihren Warenkorb und bezahlen Sie online.",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
    meta: {
      title: "Seite nicht gefunden - Haus Hamburg",
      description: "404 - Seite nicht gefunden",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

// Dynamischen Titel setzen (global)
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Haus Hamburg";
  next();
});

export default router;
