const PLACE_ID = "ChIJq-rTSsFNtkcRiRBEvjNAGAE";

// Places API (New). Mit oder ohne Sprachparameter abfragbar.
async function fetchNew(apiKey, languageCode) {
  const query = languageCode ? `?languageCode=${languageCode}` : "";
  const response = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}${query}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      Referer: "https://haus-hamburg-leer.de",
    },
  });
  const data = await response.json();
  if (data.rating === undefined) {
    return { ok: false, detail: data?.error?.message || `HTTP ${response.status}` };
  }
  return {
    ok: true,
    rating: data.rating,
    user_ratings_total: data.userRatingCount,
    reviews: (data.reviews || []).map((r) => ({
      author_name: r.authorAttribution?.displayName || "Gast",
      rating: r.rating,
      relative_time_description: r.relativePublishTimeDescription || "",
      text: r.text?.text || r.originalText?.text || "",
      profile_photo_url: r.authorAttribution?.photoUri || null,
    })),
  };
}

// Ältere Place Details API als Ausweichweg, falls die neue API keine Texte liefert.
async function fetchLegacy(apiKey) {
  const params = new URLSearchParams({
    place_id: PLACE_ID,
    fields: "rating,user_ratings_total,reviews",
    language: "de",
    reviews_sort: "most_relevant",
    key: apiKey,
  });
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, {
    headers: { Referer: "https://haus-hamburg-leer.de" },
  });
  const data = await response.json();
  if (data.status !== "OK" || !data.result) {
    return { ok: false, detail: data.error_message || data.status || `HTTP ${response.status}` };
  }
  const r = data.result;
  return {
    ok: true,
    rating: r.rating,
    user_ratings_total: r.user_ratings_total,
    reviews: (r.reviews || []).map((x) => ({
      author_name: x.author_name || "Gast",
      rating: x.rating,
      relative_time_description: x.relative_time_description || "",
      text: x.text || "",
      profile_photo_url: x.profile_photo_url || null,
    })),
  };
}

export default async function handler(req, res) {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const attempts = [
    ["new-de", () => fetchNew(API_KEY, "de")],
    ["new", () => fetchNew(API_KEY, null)],
    ["legacy", () => fetchLegacy(API_KEY)],
  ];

  let best = null;
  const diagnostics = [];

  for (const [name, run] of attempts) {
    try {
      const result = await run();
      const withText = result.ok ? result.reviews.filter((r) => r.text).length : 0;
      diagnostics.push({ source: name, ok: result.ok, reviews: withText, detail: result.detail });
      if (result.ok && !best) best = { ...result, source: name };
      if (result.ok && withText > 0) {
        best = { ...result, source: name };
        break;
      }
    } catch (e) {
      diagnostics.push({ source: name, ok: false, detail: String(e?.message || e) });
    }
  }

  if (!best) {
    return res.status(502).json({ error: "Failed to fetch reviews", diagnostics });
  }

  // Nur kurz cachen, solange keine Texte kommen, damit ein Fix schnell greift.
  const hasText = best.reviews.some((r) => r.text);
  res.setHeader(
    "Cache-Control",
    hasText ? "s-maxage=3600, stale-while-revalidate=86400" : "s-maxage=300"
  );
  res.status(200).json({
    rating: best.rating,
    user_ratings_total: best.user_ratings_total,
    reviews: best.reviews,
    source: best.source,
    diagnostics,
  });
}
