import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    proxy: {
      // Leitet alle Anfragen, die mit /api beginnen, an dein Backend weiter
      '/api': {
        target: 'http://localhost:3000', // Backend-URL
        changeOrigin: true,
        // Falls dein Backend den Endpunkt ohne den Prefix /api erwartet, kannst du rewrite verwenden:
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
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
  }
});
