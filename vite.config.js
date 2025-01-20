import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // Erlaubt den Zugriff auf localhost von anderen Geräten im Netzwerk
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Definiert den Alias "@" für den src-Ordner
    },
  },
});
