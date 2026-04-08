import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const items = req.body.items || [];

    const amount = items.reduce(
      (sum, item) => sum + Math.round(item.product.price * 100) * item.quantity,
      0
    );

    const cartSummary = items
      .map((item) => `${item.product.name} x ${item.quantity}`)
      .join(", ");
    const shortenedCart = cartSummary.substring(0, 500);

    const addr = req.body.address || {};

    const fullName = addr.firstName && addr.lastName
      ? `${addr.firstName} ${addr.lastName}`
      : "";

    const email = addr.email || "";
    const phone = addr.phone || "";
    const addressData = Object.keys(addr).length > 0 ? JSON.stringify(addr) : "";

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
