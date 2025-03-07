// backend/server/stripe.js
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// 🔥 Stripe Checkout-Session erstellen
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart, address } = req.body; // Hier werden der Warenkorb und die Adresse erwartet

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

    // Übergib die Adresse und den Warenkorb als Metadaten (als JSON-String)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`,
      metadata: {
        address: JSON.stringify(address),
        cart: JSON.stringify(cart),
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("❌ Stripe Checkout-Fehler:", error);
    res.status(500).json({ error: error.message });
  }
});

// 📌 Webhook für Stripe-Zahlungen
router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log("✅ Stripe Checkout-Session abgeschlossen:", session);

        // Lese die Metadaten aus, um die Adresse und den Warenkorb zu erhalten
        const orderData = {
          userEmail: session.customer_email,
          totalAmount: session.amount_total / 100,
          currency: session.currency,
          paymentStatus: session.payment_status,
          createdAt: new Date(),
          items: session.metadata && session.metadata.cart ? JSON.parse(session.metadata.cart) : [],
          address: session.metadata && session.metadata.address ? JSON.parse(session.metadata.address) : {},
        };

        // Versende E-Mails über den sendCheckoutEmail-Endpoint
        try {
          await fetch(`${process.env.FRONTEND_URL}/api/sendCheckoutEmail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              address: orderData.address,
              items: orderData.items,
              total: orderData.totalAmount,
            }),
          });
          console.log("✅ E-Mail aus dem Webhook versendet");
        } catch (error) {
          console.error("❌ Fehler beim Aufruf des sendCheckoutEmail-Endpoints:", error);
        }
      }

      res.json({ received: true });
    } catch (err) {
      console.error("⚠️ Webhook-Fehler:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

module.exports = router;
