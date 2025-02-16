const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware zum Parsen von JSON
app.use(express.json());

// 📌 Transporter für Strato einrichten
const transporter = nodemailer.createTransport({
  host: "smtp.strato.de",
  port: 465, // SSL-Port (alternativ 587 für TLS)
  secure: true, // true für SSL, false für TLS
  auth: {
    user: process.env.EMAIL_USER, // Deine Strato E-Mail z.B. info@haus-hamburg-leer.de
    pass: process.env.EMAIL_PASS  // Dein Strato-Passwort
  }
});

// API-Endpunkt für Catering-Anfragen
app.post("/api/sendCateringInquiry", async (req, res) => {
  const { name, email, phone, guests, location, dateTime, budget, cateringType, message, submittedAt } = req.body;

  const mailOptions = {
    from: `"Haus Hamburg Catering" <${process.env.EMAIL_USER}>`,
    to: "info@haus-hamburg-leer.de",  // Empfänger-Adresse (kann auch eine andere sein)
    subject: "Neue Catering-Anfrage",
    text: `Neue Catering-Anfrage:

Name: ${name}
E-Mail: ${email}
Telefon: ${phone}
Personenanzahl: ${guests}
Ort: ${location}
Datum: ${dateTime}
Budget: ${budget}
Catering-Art: ${cateringType.join(", ")}
Nachricht: ${message}
Gesendet am: ${submittedAt}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("E-Mail Versand fehlgeschlagen:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});

// // server.js (zusätzlich zum bestehenden Code)
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Deinen Secret Key aus der .env
// app.post("/api/create-checkout-session", async (req, res) => {
//   const { cart } = req.body;

//   // Erstelle Zeilen für die Stripe Checkout Session
//   const line_items = cart.map((item) => ({
//     price_data: {
//       currency: "eur",
//       product_data: {
//         name: item.name,
//       },
//       unit_amount: Math.round(item.price * 100), // Stripe erwartet Beträge in Cent
//     },
//     quantity: item.quantity,
//   }));

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: "https://deine-domain.de/success?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "https://deine-domain.de/cancel",
//     });
//     res.json({ id: session.id });
//   } catch (error) {
//     console.error("Stripe Checkout-Fehler:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
