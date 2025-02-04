import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  build: {
    outDir: "dist",
  },
  // Wichtig für Vue Router (History Mode)
  esbuild: {
    legalComments: "none", // Entfernt unnötige Kommentare aus dem Build
  }
});
