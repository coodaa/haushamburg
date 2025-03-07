// backend/server/stripe.js
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// 🔥 Endpoint: Stripe Checkout-Session erstellen (falls Du diesen nicht in api/ create-checkout-session.js nutzt)
// Falls Du den Checkout-Session-Endpoint bereits in api/ erstellst, brauchst Du diesen Block nicht.
// router.post("/create-checkout-session", async (req, res) => {
//   // ... Alternativ: den Code aus api/create-checkout-session.js verwenden ...
// });

// 📌 Endpoint: Stripe Webhook
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

        // Lese Metadaten aus und erstelle ein orderData-Objekt
        const orderData = {
          userEmail: session.customer_email,
          totalAmount: session.amount_total / 100,
          currency: session.currency,
          paymentStatus: session.payment_status,
          createdAt: new Date(),
          items: session.metadata && session.metadata.cart ? JSON.parse(session.metadata.cart) : [],
          address: session.metadata && session.metadata.address ? JSON.parse(session.metadata.address) : {},
        };

        // Rufe den sendCheckoutEmail-Endpoint auf, um E-Mails zu versenden
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
