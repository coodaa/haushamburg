import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Pages from "vite-plugin-pages";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    vue(),
    Pages(), // wichtig für dynamische Seiten-Erkennung
    Sitemap({
      hostname: "https://www.haus-hamburg-leer.de", // Deine Domain
      exclude: ["/checkout-success"], // falls du bestimmte Seiten nicht willst
      routes: [
        // optional: wenn du eigene statische Routen definieren willst
        { url: "/", changefreq: "daily", priority: 1.0 },
        { url: "/speisekarte", changefreq: "weekly", priority: 0.9 },
        { url: "/shop", changefreq: "daily", priority: 1.0 },
        { url: "/catering", changefreq: "weekly", priority: 0.8 },
        { url: "/reservierung", changefreq: "weekly", priority: 0.9 },
        { url: "/kontakt", changefreq: "weekly", priority: 0.8 },
        { url: "/impressum", changefreq: "monthly", priority: 0.5 },
        { url: "/datenschutz", changefreq: "monthly", priority: 0.5 },
      ],
    }),
  ],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
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
  esbuild: {
    legalComments: "none",
  },
});
