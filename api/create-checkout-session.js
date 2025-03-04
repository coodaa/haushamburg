// api/stripe-webhook.js
const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { db } = require("./firebaseadmin"); // Stelle sicher, dass firebaseadmin.js korrekt konfiguriert ist

// Da Stripe den Body als Raw-Buffer benötigt:
app.post(
  "/api/stripe-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
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

    // Wenn die Zahlung erfolgreich abgeschlossen wurde:
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Zahlung abgeschlossen:", session);

      // Bereite die Bestelldaten für deine Datenbank vor.
      // Hier wird z. B. die Zusammenfassung aus den Metadaten genutzt.
      let orderData = {
        userEmail: session.customer_email,
        totalAmount: session.amount_total / 100, // Betrag in Euro
        currency: session.currency,
        paymentStatus: session.payment_status,
        createdAt: new Date(),
        // Falls du den Warenkorb als JSON-String in den Metadaten gespeichert hast:
        items: session.metadata && session.metadata.cart
          ? JSON.parse(session.metadata.cart)
          : []
      };

      try {
        // Speichere die Bestellung in Firestore:
        await db.collection("orders").add(orderData);
        console.log("✅ Bestellung gespeichert:", orderData);
      } catch (error) {
        console.error("❌ Fehler beim Speichern der Bestellung:", error);
      }
    }

    // Stripe erwartet eine JSON-Antwort
    res.json({ received: true });
  }
);

module.exports = app;
