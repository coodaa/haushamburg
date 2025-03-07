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

  // Bei erfolgreichem Checkout-Session
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Zahlung abgeschlossen:", session);

    // Optional: Weitere Logik einbauen, z. B. Daten in einer Datenbank speichern,
    // aber hier wird bewusst keine E-Mail versendet, da diese bereits im Checkout erfolgt.
  }

  res.json({ received: true });
});

module.exports = app;
