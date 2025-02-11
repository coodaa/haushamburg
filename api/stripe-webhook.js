app.post("/api/stripe-webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook-Fehler:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Verarbeite das Event (z. B. checkout.session.completed)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // Hier kannst Du die Bestellung in Firestore speichern
  }
  res.json({ received: true });
});
