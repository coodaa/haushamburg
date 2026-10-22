// Google-Bewertungen über die Places API (New).
// Kostenschutz: genau eine Google-Abfrage pro Cache-Ablauf, Antwort 6 Stunden im CDN.
// Zusätzlich ist in der Google-Cloud-Konsole ein Tageslimit gesetzt.

const PLACE_ID = "ChIJq-rTSsFNtkcRiRBEvjNAGAE";

export default async function handler(req, res) {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=de`;
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        Referer: "https://haus-hamburg-leer.de",
      },
    });
    const data = await response.json();

    if (data.rating === undefined) {
      // Kurz cachen, damit ein Fehler (z. B. Tageslimit erreicht) keine Abfragewelle auslöst.
      res.setHeader("Cache-Control", "s-maxage=1800");
      return res.status(502).json({ error: "Google request failed" });
    }

    const reviews = (data.reviews || []).map((r) => ({
      author_name: r.authorAttribution?.displayName || "Gast",
      rating: r.rating,
      relative_time_description: r.relativePublishTimeDescription || "",
      text: r.text?.text || r.originalText?.text || "",
      profile_photo_url: r.authorAttribution?.photoUri || null,
    }));

    res.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");
    res.status(200).json({ rating: data.rating, user_ratings_total: data.userRatingCount, reviews });
  } catch (error) {
    res.setHeader("Cache-Control", "s-maxage=1800");
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
