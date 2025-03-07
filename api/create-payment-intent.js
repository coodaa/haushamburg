const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    // Artikel aus dem Request; Standardmäßig ein leeres Array
    const items = req.body.items || [];

    // Berechne den Gesamtbetrag in Cent
    const amount = items.reduce(
      (sum, item) => sum + Math.round(item.product.price * 100) * item.quantity,
      0
    );

    // Erstelle eine kurze Zusammenfassung des Warenkorbs (nur Produktnamen und Menge)
    const cartSummary = items
      .map((item) => `${item.product.name} x ${item.quantity}`)
      .join(", ");
    const shortenedCart = cartSummary.substring(0, 500);

    // Extrahiere alle gewünschten Kundendaten aus dem address-Objekt
    const addr = req.body.address || {};
    const email = addr.email || "";
    const firstName = addr.firstName || "";
    const lastName = addr.lastName || "";
    // Kombiniere Vor- und Nachname zu einem vollständigen Kundennamen
    const customerName = `${firstName} ${lastName}`.trim();
    const phone = addr.phone || "";
    // Speichere das gesamte address-Objekt als JSON-String
    const addressData =
      Object.keys(addr).length > 0 ? JSON.stringify(addr) : "";

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        cart: shortenedCart,
        customer_email: email,
        customer_name: customerName,
        phone: phone,
        address: addressData,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ error: error.message || "Unbekannter Fehler" });
  }
};
