// backend/api/stripe-webhook.js

const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

const app = express();

// Stripe benötigt den rohen Body, daher:
app.use("/api/stripe-webhook", express.raw({ type: "application/json" }));

// Funktion zum Senden von E-Mails an Dich und an den Kunden
async function sendEmails(orderData) {
  // Erstelle den Nodemailer-Transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de", // Passe ggf. Deinen SMTP-Server an
    port: 465, // SSL-Port (oder 587 für TLS)
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Deine E-Mail-Adresse (z. B. info@haus-hamburg-leer.de)
      pass: process.env.EMAIL_PASS, // Dein E-Mail-Passwort
    },
  });

  // E-Mail an Dich als Shop-Inhaber
  await transporter.sendMail({
    from: `"Shop Benachrichtigung" <${process.env.EMAIL_USER}>`,
    to: "info@haus-hamburg-leer.de", // Deine E-Mail-Adresse
    subject: "Neue Bestellung erhalten",
    html: `<p>Es wurde eine neue Bestellung aufgegeben:</p>
           <pre>${JSON.stringify(orderData, null, 2)}</pre>`,
  });

  // E-Mail an den Kunden (nur, wenn eine E-Mail vorhanden ist)
  if (orderData.userEmail) {
    await transporter.sendMail({
      from: `"Haus Hamburg" <${process.env.EMAIL_USER}>`,
      to: orderData.userEmail,
      subject: "Bestellbestätigung – Haus Hamburg",
      html: `<p>Vielen Dank für Ihre Bestellung!</p>
             <p>Ihre Zahlung wurde erfolgreich verarbeitet und Ihre Bestellung wird nun bearbeitet.</p>
             <p>Bei Fragen stehen wir Ihnen jederzeit zur Verfügung.</p>`,
    });
  }
}

// Webhook-Endpoint
app.post("/api/stripe-webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook-Fehler:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Bei erfolgreichem Checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Zahlung abgeschlossen:", session);

    // Bereite die Bestelldaten vor. Hier werden z. B. die Metadaten (Warenkorb) aus der Checkout-Session genutzt.
    const orderData = {
      userEmail: session.customer_email,
      totalAmount: session.amount_total / 100, // Betrag in Euro
      currency: session.currency,
      paymentStatus: session.payment_status,
      createdAt: new Date(),
      items:
        session.metadata && session.metadata.cart
          ? JSON.parse(session.metadata.cart)
          : [],
    };

    try {
      console.log("✅ Bestellung vorbereitet:", orderData);
      await sendEmails(orderData);
      console.log("✅ E-Mails versendet");
    } catch (error) {
      console.error("❌ Fehler beim Versenden der E-Mails:", error);
    }
  }

  res.json({ received: true });
});

module.exports = app;
