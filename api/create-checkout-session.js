// api/create-checkout-session.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    // Erwartet ein Array von Objekten im Format: { product: { name, image, price }, quantity }
    const { items } = req.body;

    // Erstelle Stripe-Line-Items basierend auf den Warenkorbdaten
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
        // Stelle sicher, dass der Preis in Cent angegeben wird
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    // Erstelle die Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Hier kannst du bei Bedarf weitere Zahlungsmethoden hinzufügen (z. B. 'ideal', 'sofort', etc.)
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout-success`,
      cancel_url: `${req.headers.origin}/checkout-cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ error: error.message || "Unbekannter Fehler" });
  }
};
