// api/create-checkout-session.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    const { items } = req.body; // Erwartet ein Array von { product, quantity }
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
        unit_amount: Math.round(item.product.price * 100), // Betrag in Cent
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // Hier aktivierst Du die Versandadresse-Erfassung:
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'], // z.B. Deutschland, Österreich, Schweiz
      },
      // Optional: Falls Du auch einen Versandpreis berechnen möchtest, kannst Du dies in "shipping_options" angeben
      success_url: `${req.headers.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout-cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe Checkout-Fehler:", error);
    res.status(500).json({ error: error.message });
  }
};
