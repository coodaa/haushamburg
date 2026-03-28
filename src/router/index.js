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
const CheckoutSuccess = () => import("../views/CheckoutSuccess.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Haus Hamburg – Fischrestaurant in Leer, Ostfriesland",
      description: "Genießen Sie frische Fischgerichte in der Altstadt von Leer. Fischrestaurant mit Lieferservice, Catering & gemütlicher Atmosphäre.",
      keywords: "Haus Hamburg, Fischrestaurant Leer, Restaurant Altstadt, regionale Küche, Fischgerichte, Ostfriesland"
    },
  },
  {
    path: "/kontakt",
    name: "kontakt",
    component: Kontakt,
    meta: {
      title: "Kontakt – Haus Hamburg in Leer",
      description: "Kontaktieren Sie unser Team bei Fragen zu Reservierungen, Catering oder Online-Bestellungen.",
      keywords: "Kontakt Haus Hamburg, Telefonnummer Leer, Fischrestaurant, Catering Anfrage, Reservierung Leer"
    },
  },
  {
    path: "/speisekarte",
    name: "speisekarte",
    component: Speisekarte,
    meta: {
      title: "Speisekarte – Fisch & regionale Küche in Leer",
      description: "Unsere Speisekarte bietet frischen Fisch, Fleisch, vegetarische Gerichte & Desserts. Jetzt ansehen & Appetit holen!",
      keywords: "Speisekarte Haus Hamburg, Fischgerichte, Restaurant Leer, vegetarisch, Desserts, Fischrestaurant"
    },
  },
  {
    path: "/catering",
    name: "catering",
    component: Catering,
    meta: {
      title: "Catering-Service in Leer – Haus Hamburg",
      description: "Ob Hochzeit, Firmenfeier oder Event: Wir liefern frische Speisen direkt zu Ihnen. Jetzt Catering anfragen.",
      keywords: "Catering Leer, Fischcatering, Eventservice Leer, Haus Hamburg, Cateringservice Ostfriesland"
    },
  },
  {
    path: "/ueber",
    name: "ueber",
    component: Ueber,
    meta: {
      title: "Über uns – Haus Hamburg in Leer",
      description: "Erfahren Sie mehr über unser Restaurant, unsere Geschichte und unsere Leidenschaft für frische Küche.",
      keywords: "Über uns Haus Hamburg, Fischrestaurant Geschichte, Leer Altstadt, Team Haus Hamburg"
    },
  },
  {
    path: "/reservierung",
    name: "reservierung",
    component: Reservierung,
    meta: {
      title: "Reservierung – Tisch online buchen in Leer",
      description: "Reservieren Sie jetzt bequem online Ihren Tisch im Haus Hamburg in der Altstadt von Leer.",
      keywords: "Tisch reservieren Leer, Restaurant Reservierung, Haus Hamburg Online buchen, Ostfriesland Essen gehen"
    },
  },
  {
    path: "/impressum",
    name: "impressum",
    component: Impressum,
    meta: {
      title: "Impressum – Haus Hamburg",
      description: "Impressum & rechtliche Hinweise zu unserem Fischrestaurant in Leer.",
      keywords: "Impressum, Restaurant Leer, Haus Hamburg, rechtliche Informationen"
    },
  },
  {
    path: "/datenschutz",
    name: "datenschutz",
    component: Datenschutz,
    meta: {
      title: "Datenschutz – Haus Hamburg",
      description: "Informationen zum Datenschutz für unsere Website-Besucher und Gäste.",
      keywords: "Datenschutz Haus Hamburg, DSGVO, Website Leer, Restaurant Datenschutz"
    },
  },
  {
    path: "/stellenangebote",
    name: "stellenangebote",
    component: Stellenangebote,
    meta: {
      title: "Jobs in Leer – Haus Hamburg sucht dich!",
      description: "Bewirb dich jetzt beim Haus Hamburg in Leer – Gastronomie, Küche, Service & mehr!",
      keywords: "Jobs Leer, Haus Hamburg Stellenangebote, Gastronomie Jobs Ostfriesland, Servicekraft, Koch Leer"
    },
  },

  // 🛒 Shop
  {
    path: "/shop",
    name: "shop",
    component: Shop,
    meta: {
      title: "Online Essen bestellen in Leer – Haus Hamburg",
      description: "Jetzt Fisch, Fleisch, vegetarische Gerichte & mehr online bestellen. Lieferung direkt nach Hause in Leer & Umgebung.",
      keywords: "Essen bestellen Leer, Haus Hamburg Online Shop, Fischgerichte liefern, Lieferservice Ostfriesland"
    },
  },
  {
    path: "/productlist",
    name: "productlist",
    component: ProductList,
    meta: {
      title: "Produkte – Haus Hamburg Online Shop",
      description: "Alle Gerichte und Getränke auf einen Blick – Jetzt online bestellen.",
      keywords: "Fischprodukte Online, Haus Hamburg Menü, Online bestellen Leer"
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
    meta: {
      title: "Warenkorb & Bezahlung – Haus Hamburg Online Shop",
      description: "Zahlung mit PayPal, Kreditkarte oder SEPA – sicher & schnell.",
      keywords: "Online bezahlen Leer, Haus Hamburg Checkout, PayPal Essen bestellen, Kreditkarte Restaurant"
    },
  },
  {
    path: "/checkout-success",
    name: "checkout-success",
    component: CheckoutSuccess,
    meta: {
      title: "Danke für Ihre Bestellung – Haus Hamburg",
      description: "Ihre Bestellung war erfolgreich. Wir bereiten Ihre Speisen frisch zu!",
      keywords: "Bestellung erfolgreich, Danke Haus Hamburg, Essen geliefert Leer"
    },
  },

  // Fallback-Route
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
    meta: {
      title: "404 – Seite nicht gefunden",
      description: "Die Seite existiert leider nicht. Bitte zurück zur Startseite.",
      keywords: "Fehler 404, Seite nicht gefunden, Haus Hamburg Leer"
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

const BASE_URL = "https://haus-hamburg-leer.de";

function setMeta(selector, attrName, attrValue, content) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector("link[rel=’canonical’]");
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

router.afterEach((to) => {
  const m = to.meta || {};
  if (m.title) document.title = m.title;

  if (m.description) {
    setMeta("meta[name=’description’]", "name", "description", m.description);
    setMeta("meta[property=’og:description’]", "property", "og:description", m.description);
    setMeta("meta[name=’twitter:description’]", "name", "twitter:description", m.description);
  }

  const ogTitle = m.title || document.title;
  setMeta("meta[property=’og:title’]", "property", "og:title", ogTitle);
  setMeta("meta[name=’twitter:title’]", "name", "twitter:title", ogTitle);

  const canonical = `${BASE_URL}${to.path === "/" ? "" : to.path}`;
  setMeta("meta[property=’og:url’]", "property", "og:url", canonical);
  setCanonical(canonical);

  setMeta("meta[name=’robots’]", "name", "robots",
    m.noindex ? "noindex, nofollow" : "index, follow"
  );
});

export default router;
