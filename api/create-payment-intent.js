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

    // Lese das address-Objekt aus dem Request
    const addr = req.body.address || {};

    // Kombiniere Vor- und Nachname, falls vorhanden
    const fullName = addr.firstName && addr.lastName
      ? `${addr.firstName} ${addr.lastName}`
      : "";

    // Extrahiere weitere Felder
    const email = addr.email || "";
    const phone = addr.phone || "";
    // Speichere das gesamte address-Objekt als JSON-String
    const addressData = Object.keys(addr).length > 0 ? JSON.stringify(addr) : "";

    // Erstelle den Payment Intent und speichere alle Daten als Metadaten
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        cart: shortenedCart,
        customer_email: email,
        customer_name: fullName,
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
