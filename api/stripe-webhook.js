const { db } = require("./firebaseadmin"); // Firestore importieren

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

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Zahlung abgeschlossen:", session);

      // 🔹 Bestelldaten für Firestore vorbereiten
      const orderData = {
        userEmail: session.customer_email,
        totalAmount: session.amount_total / 100, // Betrag in Euro
        currency: session.currency,
        paymentStatus: session.payment_status,
        createdAt: new Date(),
        items: session.metadata ? JSON.parse(session.metadata.cart) : []
      };

      try {
        // 🔹 Bestellung in Firestore speichern
        await db.collection("orders").add(orderData);
        console.log("✅ Bestellung gespeichert:", orderData);
      } catch (error) {
        console.error("❌ Fehler beim Speichern der Bestellung:", error);
      }
    }

    res.json({ received: true });
  }
);
