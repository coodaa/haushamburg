// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

// Hier globale Styles laden
import "@/styles/Global.css"; // Oder "./styles/Global.css"

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
