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
    // Lokale /api/reviews Route für npm run dev
    {
      name: "local-api",
      configureServer(server) {
        server.middlewares.use("/api/reviews", async (req, res) => {
          try {
            const apiKey = env.GOOGLE_PLACES_API_KEY;
            const placeId = "ChIJq-rTSsFNtkcRiRBEvjNAGAE";
            const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=de`;
            const response = await fetch(url, {
              headers: {
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "rating,userRatingCount,reviews",
                "Referer": "https://haus-hamburg-leer.de",
              },
            });
            const data = await response.json();
            res.setHeader("Content-Type", "application/json");
            if (data.rating !== undefined) {
              const reviews = (data.reviews || []).map((r) => ({
                author_name: r.authorAttribution?.displayName || "Gast",
                rating: r.rating,
                relative_time_description: r.relativePublishTimeDescription || "",
                text: r.text?.text || "",
                profile_photo_url: r.authorAttribution?.photoUri || null,
              }));
              res.end(JSON.stringify({ rating: data.rating, user_ratings_total: data.userRatingCount, reviews }));
            } else {
              res.statusCode = 502;
              res.end(JSON.stringify({ error: JSON.stringify(data) }));
            }
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
