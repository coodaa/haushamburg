const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// 🔥 Stripe Checkout-Session erstellen
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe Checkout-Fehler:", error);
    res.status(500).json({ error: error.message });
  }
});

// 📌 Webhook für Stripe-Zahlungen
router.post("/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      console.log("✅ Zahlung erfolgreich:", event.data.object);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("⚠️ Webhook-Fehler:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
