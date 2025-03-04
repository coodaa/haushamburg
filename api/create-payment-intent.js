// api/create-payment-intent.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    // Beispiel: Betrag in Cent (dynamisch berechenbar)
    const amount = 1000; // Hier kannst du den Betrag basierend auf dem Warenkorb berechnen

    // Erstelle eine kurze Zusammenfassung des Warenkorbs (nur Produktnamen und Menge)
    const cartSummary = (req.body.items || [])
      .map((item) => `${item.product.name} x ${item.quantity}`)
      .join(", ");

    // Kürze den String, falls er zu lang ist (max. 500 Zeichen)
    const shortenedCart = cartSummary.substring(0, 500);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        cart: shortenedCart,
      },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ error: error.message || "Unbekannter Fehler" });
  }
};
