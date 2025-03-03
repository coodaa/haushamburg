// api/create-payment-intent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    // Hier evtl. den Betrag dynamisch berechnen
    const amount = 1000; // Beispielbetrag in Cent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      // Optional: Metadata mit dem Warenkorb (falls benötigt)
      metadata: {
        cart: JSON.stringify(req.body.items || []),
      },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ error: error.message || "Unbekannter Fehler" });
  }
};
