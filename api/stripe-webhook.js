// api/stripe-webhook.js
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

// Wenn du Firestore nicht mehr nutzen möchtest, kannst du den folgenden Import entfernen.
// Falls Du ihn aber weiterhin für andere Zwecke brauchst, lasse ihn stehen.
// const { db } = require("./firebaseadmin");

const app = express();

// Da Stripe den rohen Body für die Webhook-Verifikation benötigt, verwenden wir express.raw:
app.use("/api/stripe-webhook", express.raw({ type: "application/json" }));

// Funktion zum Versenden von E-Mails (an Dich und an den Kunden)
async function sendEmails(orderData) {
  // Erstelle den Nodemailer-Transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de", // Ersetze ggf. durch Deinen SMTP-Server
    port: 465,              // Port für SSL (oder 587 für TLS)
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // E-Mail an Dich als Shop-Inhaber
  await transporter.sendMail({
    from: `"Bestell-Benachrichtigung" <${process.env.EMAIL_USER}>`,
    to: "deine-email@domain.de", // Ersetze durch Deine E-Mail-Adresse
    subject: "Neue Bestellung erhalten",
    html: `<p>Es wurde eine neue Bestellung erhalten:</p>
           <pre>${JSON.stringify(orderData, null, 2)}</pre>`,
  });

  // E-Mail an den Kunden (nur, wenn eine E-Mail-Adresse vorhanden ist)
  if (orderData.userEmail) {
    await transporter.sendMail({
      from: `"Haus Hamburg" <${process.env.EMAIL_USER}>`,
      to: orderData.userEmail,
      subject: "Bestellbestätigung – Haus Hamburg",
      html: `<p>Vielen Dank für Ihre Bestellung!</p>
             <p>Wir haben Ihre Zahlung erhalten und Ihre Bestellung wird bearbeitet.</p>`,
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

  // Wenn die Zahlung abgeschlossen wurde
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Zahlung abgeschlossen:", session);

    // Bestelldaten vorbereiten (hier werden Daten aus den Metadaten verwendet)
    const orderData = {
      userEmail: session.customer_email,
      totalAmount: session.amount_total / 100, // Betrag in Euro
      currency: session.currency,
      paymentStatus: session.payment_status,
      createdAt: new Date(),
      // Falls Du Metadaten für den Warenkorb gesetzt hast:
      items: session.metadata && session.metadata.cart
              ? JSON.parse(session.metadata.cart)
              : [],
    };

    try {
      // Falls Du Firestore verwendest, kannst Du hier auch die Bestellung in der DB speichern:
      // await db.collection("orders").add(orderData);
      console.log("✅ Bestellung vorbereitet:", orderData);

      // Sende E-Mails (an Dich und den Kunden)
      await sendEmails(orderData);
      console.log("✅ E-Mails versendet");
    } catch (error) {
      console.error("❌ Fehler beim Verarbeiten der Bestellung:", error);
    }
  }

  res.json({ received: true });
});

// Exportiere die Express-App (so kannst Du sie z. B. in Deinem Server‑Setup verwenden)
module.exports = app;
