// backend/server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware für JSON und CORS (Frontend <-> Backend)
app.use(express.json());
app.use(cors());

// ----------------------
// API: Produkte laden
// ----------------------
const productsFilePath = path.join(__dirname, "../src/data/products.json");
app.get("/api/products", (req, res) => {
  fs.readFile(productsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Fehler beim Laden der Produkte:", err);
      return res.status(500).json({ error: "Fehler beim Laden der Produkte" });
    }
    res.json(JSON.parse(data));
  });
});

// ----------------------
// API: Catering-Anfrage (E-Mail-Versand)
// ----------------------
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

  // Pflichtfelder überprüfen
  if (!name || !email || !phone || !guests || !location || !dateTime) {
    return res.status(400).json({ error: "Bitte füllen Sie alle Pflichtfelder aus!" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
      <h2 style="color: #004a7f;">Neue Catering-Anfrage</h2>
      <p><strong>👤 Name:</strong> ${name}</p>
      <p><strong>📧 E-Mail:</strong> <a href="mailto:${email}" style="color: #004a7f;">${email}</a></p>
      <p><strong>📞 Telefon:</strong> <a href="tel:${phone}" style="color: #004a7f;">${phone}</a></p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">📋 Details zur Anfrage:</h3>
      <p><strong>📍 Ort:</strong> ${location}</p>
      <p><strong>📅 Datum & Uhrzeit:</strong> ${dateTime}</p>
      <p><strong>👥 Anzahl der Personen:</strong> ${guests}</p>
      <p><strong>💰 Budget pro Person:</strong> ${budget || "nicht angegeben"}</p>
      <p><strong>🍽️ Catering-Art:</strong> ${cateringType ? cateringType.join(", ") : "nicht angegeben"}</p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">📝 Zusätzliche Nachricht:</h3>
      <p style="background: #f8f8f8; padding: 10px; border-radius: 5px;">${message || "Keine zusätzlichen Angaben"}</p>
      <hr style="border: 1px solid #ddd;" />
      <p style="font-size: 0.9em; color: #777;">Diese Anfrage wurde über das Catering-Formular auf Ihrer Website gesendet.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Haus Hamburg Catering" <${process.env.EMAIL_USER}>`,
      to: "info@haus-hamburg-leer.de",
      subject: `Catering-Anfrage für den ${new Date(dateTime).toLocaleDateString("de-DE")}`,
      html: emailContent,
    });
    console.log("✅ E-Mail erfolgreich gesendet!");
    res.json({ success: true, message: "E-Mail wurde gesendet!" });
  } catch (error) {
    console.error("❌ E-Mail Versand fehlgeschlagen:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ----------------------
// API: Stripe Payment Intent (für z. B. Stripe Elements)
// ----------------------
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    // Hier berechnest Du den Betrag basierend auf dem Warenkorb
    const amount = 1000; // Beispiel: 10,00 EUR in Cent

    // Erstelle eine kurze Zusammenfassung des Warenkorbs
    const cartSummary = (req.body.items || [])
      .map((item) => `${item.product.name} x ${item.quantity}`)
      .join(", ");
    const shortenedCart = cartSummary.substring(0, 500);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        cart: shortenedCart,
      },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ error: error.message || "Unbekannter Fehler" });
  }
});

// ----------------------
// Stripe-Router einbinden
// ----------------------
const stripeRouter = require("./server/stripe");
app.use("/api", stripeRouter);

// ----------------------
// Server starten
// ----------------------
app.listen(port, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${port}`);
});
