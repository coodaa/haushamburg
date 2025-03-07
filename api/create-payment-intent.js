const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    // Artikel aus dem Request; Standardmäßig ein leeres Array
    const items = req.body.items || [];

    // Berechne den Gesamtbetrag in Cent
    const amount = items.reduce(
      (sum, item) =>
        sum + Math.round(item.product.price * 100) * item.quantity,
      0
    );

    // Erstelle eine kurze Zusammenfassung des Warenkorbs (nur Produktnamen und Menge)
    const cartSummary = items
      .map((item) => `${item.product.name} x ${item.quantity}`)
      .join(", ");

    // Kürze den String, falls er zu lang ist (max. 500 Zeichen)
    const shortenedCart = cartSummary.substring(0, 500);

    // Extrahiere alle gewünschten Kundendaten aus dem Request
    const email =
      req.body.address && req.body.address.email
        ? req.body.address.email
        : "";
    const customerName =
      req.body.address && req.body.address.name
        ? req.body.address.name
        : "";
    const phone =
      req.body.address && req.body.address.phone
        ? req.body.address.phone
        : "";
    // Optional: Falls du noch weitere Adressdetails separat brauchst,
    // kannst du sie hier extrahieren. Wir speichern die gesamte Adresse als JSON.
    const address =
      req.body.address && Object.keys(req.body.address).length > 0
        ? JSON.stringify(req.body.address)
        : "";

    // Erstelle den Payment Intent mit allen zusätzlichen Informationen in den Metadaten
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        cart: shortenedCart,
        customer_email: email,
        customer_name: customerName,
        phone: phone,
        address: address,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Unbekannter Fehler" });
  }
};
