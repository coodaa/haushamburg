import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Pages from "vite-plugin-pages";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
  plugins: [
    vue(),
    Pages(),
    Sitemap({
      hostname: "https://www.haus-hamburg-leer.de", // Deine Domain
      exclude: ["/checkout-success"], // falls du bestimmte Seiten nicht willst
      // Alle öffentlichen Seiten (der Shop ist pausiert und bewusst nicht enthalten)
      dynamicRoutes: [
        "/speisekarte",
        "/catering",
        "/reservierung",
        "/ueber",
        "/kontakt",
        "/stellenangebote",
        "/impressum",
        "/datenschutz",
      ],
    }),
    // Lokale /api/reviews Route für npm run dev:
    // holt die Bewertungen von der Live-Seite (dort gecacht), damit lokale
    // Reloads kein Google-Kontingent verbrauchen und es aussieht wie live.
    {
      name: "local-api",
      configureServer(server) {
        server.middlewares.use("/api/reviews", async (req, res) => {
          try {
            const response = await fetch("https://www.haus-hamburg-leer.de/api/reviews");
            res.statusCode = response.status;
            res.setHeader("Content-Type", "application/json");
            res.end(await response.text());
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to fetch reviews" }));
          }
        });
      },
    },
  ],
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
  esbuild: {
    legalComments: "none",
  },
  };
});
