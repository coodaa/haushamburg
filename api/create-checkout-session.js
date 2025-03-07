const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    // Erwartet im Request-Body:
    // - items: Array von { product, quantity }
    // - customerName: z. B. "Max Mustermann"
    // - phone: z. B. "0123456789"
    // - address: Objekt mit Feldern wie name, street, postalCode, city, country
    const { items, customerName, phone, address } = req.body;

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
      // Hier aktivierst du die Versandadresse-Erfassung von Stripe (optional)
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'],
      },
      success_url: `${req.headers.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout-cancel`,
      // Übergib zusätzliche Felder als Metadaten
      metadata: {
        cart: JSON.stringify(items),
        customerName: customerName || "",
        phone: phone || "",
        address: address ? JSON.stringify(address) : "",
      }
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe Checkout-Fehler:", error);
    res.status(500).json({ error: error.message });
  }
};
