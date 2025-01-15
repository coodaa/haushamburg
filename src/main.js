import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router"; // Router importieren
import "../styles/global.css";

const app = createApp(App);
app.use(createPinia());
app.use(router); // Router verwenden
app.mount("#app");
