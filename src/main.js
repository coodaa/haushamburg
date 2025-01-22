import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "@/styles/Global.css";
import "@fortawesome/fontawesome-free/css/all.css"; // Font Awesome importieren

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
