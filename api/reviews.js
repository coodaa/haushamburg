export default async function handler(req, res) {
  const PLACE_ID = "ChIJq-rTSsFNtkcRiRBEvjNAGAE";
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
        "Referer": "https://haus-hamburg-leer.de",
      },
    });
    const data = await response.json();

    if (data.rating === undefined) {
      return res.status(502).json({ error: JSON.stringify(data) });
    }

    const reviews = (data.reviews || []).map((r) => ({
      author_name: r.authorAttribution?.displayName || "Gast",
      rating: r.rating,
      relative_time_description: r.relativePublishTimeDescription || "",
      text: r.text?.text || "",
      profile_photo_url: r.authorAttribution?.photoUri || null,
    }));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ rating: data.rating, user_ratings_total: data.userRatingCount, reviews });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
