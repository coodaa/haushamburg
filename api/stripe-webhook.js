// stripe-webhook.js
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Stripe benötigt den rohen Body für die Verifikation
app.use("/api/stripe-webhook", express.raw({ type: "application/json" }));

app.post("/api/stripe-webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook-Fehler:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Stripe Checkout-Session abgeschlossen:", session);

    // Hier erwarten wir, dass Du in der Session Metadata zwei Felder übergibst:
    // "cart" und "address" als JSON-String
    try {
      await fetch("https://deinedomain.de/api/sendCheckoutEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: JSON.parse(session.metadata.address),
          items: JSON.parse(session.metadata.cart),
          total: session.amount_total / 100,
        }),
      });
      console.log("✅ E-Mail aus dem Webhook versendet");
    } catch (error) {
      console.error("❌ Fehler beim Aufruf des sendCheckoutEmail-Endpoints:", error);
    }
  }

  res.json({ received: true });
});

module.exports = app;
