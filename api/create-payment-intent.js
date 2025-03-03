// api/create-payment-intent.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    // Berechne den Betrag aus den übermittelten Warenkorbdaten (hier als Beispiel ein fester Betrag)
    const amount = 1000; // Beispielbetrag in Cent, passe dies dynamisch an
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      // Optional: Du kannst auch Metadata hinzufügen, z. B. den Warenkorb
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
