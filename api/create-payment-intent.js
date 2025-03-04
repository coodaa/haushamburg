// api/create-payment-intent.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    // Berechne den Gesamtbetrag dynamisch aus dem Warenkorb (Preise in Cent vorausgesetzt)
    const items = req.body.items || [];
    const amount = items.reduce((sum, item) => {
      // Stelle sicher, dass item.product.price als Zahl in Cent vorliegt
      return sum + item.product.price * item.quantity;
    }, 0);

    // Erstelle eine Zusammenfassung des Warenkorbs (nur Produktnamen und Menge)
    const cartSummary = items
      .map((item) => `${item.product.name} x ${item.quantity}`)
      .join(", ");

    // Kürze den String, falls er zu lang ist (max. 500 Zeichen)
    const shortenedCart = cartSummary.substring(0, 500);

    // Erstelle den PaymentIntent
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
