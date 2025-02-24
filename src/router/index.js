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

// 🛒 Shop-Seiten
const Checkout = () => import("../views/Checkout.vue");
const ProductList = () => import("../views/ProductList.vue");
const Shop = () => import("../views/Shop.vue");
const ProductAdmin = () => import("../views/ProductAdmin.vue");


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Haus Hamburg - Startseite",
      description:
        "Willkommen im Haus Hamburg! Entdecken Sie unsere frischen Fischspezialitäten.",
    },
  },
  {
    path: "/kontakt",
    name: "kontakt",
    component: Kontakt,
    meta: {
      title: "Kontakt - Haus Hamburg",
      description: "Kontaktieren Sie uns für Reservierungen oder Fragen.",
    },
  },
  {
    path: "/speisekarte",
    name: "speisekarte",
    component: Speisekarte,
    meta: {
      title: "Speisekarte - Haus Hamburg",
      description:
        "Entdecken Sie unsere leckere Speisekarte mit frischen Fischgerichten und regionalen Spezialitäten.",
    },
  },
  {
    path: "/catering",
    name: "catering",
    component: Catering,
    meta: {
      title: "Catering - Haus Hamburg",
      description:
        "Unser Catering-Service für Ihr Event – Qualität und Genuss für Ihre Gäste.",
    },
  },
  {
    path: "/ueber",
    name: "ueber",
    component: Ueber,
    meta: {
      title: "Über uns - Haus Hamburg",
      description:
        "Erfahren Sie mehr über unser Restaurant und unsere Philosophie.",
    },
  },
  {
    path: "/reservierung",
    name: "reservierung",
    component: Reservierung,
    meta: {
      title: "Reservierung - Haus Hamburg",
      description:
        "Reservieren Sie einfach online einen Tisch in unserem Restaurant.",
    },
  },
  {
    path: "/impressum",
    name: "impressum",
    component: Impressum,
    meta: {
      title: "Impressum - Haus Hamburg",
      description:
        "Rechtliche Hinweise zu unserer Website und unserem Restaurant.",
    },
  },
  {
    path: "/datenschutz",
    name: "datenschutz",
    component: Datenschutz,
    meta: {
      title: "Datenschutz - Haus Hamburg",
      description: "Unsere Datenschutzbestimmungen zum Schutz Ihrer Daten.",
    },
  },
  {
    path: "/stellenangebote",
    name: "stellenangebote",
    component: Stellenangebote,
    meta: {
      title: "Stellenangebote - Haus Hamburg",
      description: "Offene Stellen – Werden Sie Teil unseres Teams!",
    },
  },

  // 🛒 Shop-Seiten
  {
    path: "/shop",
    name: "shop",
    component: Shop,
    meta: {
      title: "Online-Shop - Haus Hamburg",
      description: "Bestellen Sie frische Fischgerichte bequem online.",
    },
  },

  {
    path: "/productlist",
    name: "productlist",
    component: ProductList,
    meta: {
      title: "Produkte - Haus Hamburg",
      description: "Unsere Speisen und Getränke.",
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
    meta: {
      title: "Checkout - Haus Hamburg",
      description:
        "Überprüfen Sie Ihren Warenkorb und bezahlen Sie sicher online.",
    },
  },

  {
    path: "/admin",
    name: "admin",
    component: ProductAdmin,
    meta: {
      title: "Produktverwaltung - Haus Hamburg",
      description: "Füge neue Produkte zum Online-Shop hinzu.",
    },
  },

  // 404 Fehlerseite
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
    meta: {
      title: "Seite nicht gefunden - Haus Hamburg",
      description: "404 - Diese Seite existiert nicht.",
    },
  },
];

// Router erstellen
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

// Dynamischen Titel setzen (SEO)
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Haus Hamburg";
  next();
});

export default router;
