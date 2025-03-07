// api/create-checkout-session.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    // Erwartet im Request-Body:
    // - cart: Array von Objekten { product, quantity }
    // - customerName, phone und address (Objekt mit z. B. street, postalCode, city, country)
    const { cart, customerName, phone, address } = req.body;

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Preis in Cent
      },
      quantity: item.quantity,
    }));

    // Erstelle die Checkout-Session und übergebe Metadaten
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout-cancel`,
      // Optional: Stripe fragt hier auch Versandadressen ab
      shipping_address_collection: {
        allowed_countries: ["DE", "AT", "CH"],
      },
      metadata: {
        cart: JSON.stringify(cart),
        customerName: customerName || "",
        phone: phone || "",
        address: address ? JSON.stringify(address) : "",
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("❌ Stripe Checkout-Fehler:", error);
    res.status(500).json({ error: error.message });
  }
};
