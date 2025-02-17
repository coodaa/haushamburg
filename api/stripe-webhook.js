import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // ✅ Verarbeitung von "checkout.session.completed"
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Zahlung erfolgreich:", session);

      // Hier könntest du die Bestellung in eine Datenbank speichern
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("⚠️ Webhook-Fehler:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
