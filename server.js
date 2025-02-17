const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Stripe API-Key

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware für JSON & CORS (Frontend <-> Backend)
app.use(express.json());
app.use(cors());

// 📌 E-Mail-Versand mit Strato
const transporter = nodemailer.createTransport({
  host: "smtp.strato.de",
  port: 465, // SSL-Port (alternativ 587 für TLS)
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Strato-E-Mail-Adresse
    pass: process.env.EMAIL_PASS, // Strato-Passwort
  },
});

// 📌 API für **Catering-Anfragen**
app.post("/api/sendCateringInquiry", async (req, res) => {
  const {
    name,
    email,
    phone,
    guests,
    location,
    dateTime,
    budget,
    cateringType,
    message,
  } = req.body;

  const mailOptions = {
    from: `"Haus Hamburg Catering" <${process.env.EMAIL_USER}>`,
    to: "info@haus-hamburg-leer.de", // Zieladresse
    subject: `Catering-Anfrage für den ${dateTime}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5; color: #333;">
        <h2 style="color: #004a7f;">Neue Catering-Anfrage</h2>
        <p><strong>👤 Name:</strong> ${name}</p>
        <p><strong>📧 E-Mail:</strong> <a href="mailto:${email}" style="color: #004a7f;">${email}</a></p>
        <p><strong>📞 Telefon:</strong> <a href="tel:${phone}" style="color: #004a7f;">${phone}</a></p>
        <hr style="border: 1px solid #ddd;" />
        <h3 style="color: #004a7f;">📋 Details zur Anfrage:</h3>
        <p><strong>📍 Ort:</strong> ${location}</p>
        <p><strong>📅 Datum & Uhrzeit:</strong> ${dateTime}</p>
        <p><strong>👥 Anzahl der Personen:</strong> ${guests}</p>
        <p><strong>💰 Budget pro Person:</strong> ${budget}</p>
        <p><strong>🍽️ Catering-Art:</strong> ${
          cateringType ? cateringType.join(", ") : "Nicht angegeben"
        }</p>
        <hr style="border: 1px solid #ddd;" />
        <h3 style="color: #004a7f;">📝 Zusätzliche Nachricht:</h3>
        <p style="background: #f8f8f8; padding: 10px; border-radius: 5px;">${
          message || "Keine Nachricht angegeben"
        }</p>
        <hr style="border: 1px solid #ddd;" />
        <p style="font-size: 0.9em; color: #777;">Diese Anfrage wurde über das Catering-Formular auf Ihrer Website gesendet.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ E-Mail erfolgreich gesendet!");
    res.json({ success: true, message: "E-Mail wurde gesendet!" });
  } catch (error) {
    console.error("❌ E-Mail Versand fehlgeschlagen:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 📌 API für **Stripe Checkout (Bestellungen & Zahlungen)**
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [], // Falls ein Bild verfügbar ist
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe Checkout-Fehler:", error);
    res.status(500).json({ error: error.message });
  }
});

// 📌 **Webhook für Stripe-Zahlungen**
app.post(
  "/api/stripe-webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
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

    // ✅ Stripe Event auswerten
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Zahlung abgeschlossen:", session);

      // 📌 Hier kannst du Bestellungen in einer Datenbank speichern (optional)
      // z. B. Firestore, MongoDB, oder MySQL
    }

    res.json({ received: true });
  }
);

// 📌 Server starten
app.listen(port, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${port}`);
});
