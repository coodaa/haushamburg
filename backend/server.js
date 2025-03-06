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
// API: Produkte laden (optional, falls benötigt)
// ----------------------
const productsFilePath = path.join(__dirname, "../data/products.json");
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
    return res
      .status(400)
      .json({ error: "Bitte füllen Sie alle Pflichtfelder aus!" });
  }

  // Erstelle den Nodemailer-Transporter (hier mit Strato)
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
      <p><strong>🍽️ Catering-Art:</strong> ${
        cateringType ? cateringType.join(", ") : "nicht angegeben"
      }</p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">📝 Zusätzliche Nachricht:</h3>
      <p style="background: #f8f8f8; padding: 10px; border-radius: 5px;">${
        message || "Keine zusätzlichen Angaben"
      }</p>
      <hr style="border: 1px solid #ddd;" />
      <p style="font-size: 0.9em; color: #777;">Diese Anfrage wurde über das Catering-Formular auf Ihrer Website gesendet.</p>
    </div>
  `;

  try {
    // E-Mail an Dich als Shop-Inhaber
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
// API: Stripe Checkout Session
// ----------------------
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body; // Erwartet ein Array von Objekten: { name, image, price, quantity }
    const line_items = cart.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe Checkout-Fehler:", error);
    res.status(500).json({ error: error.message });
  }
});

// ----------------------
// API: Stripe Payment Intent (für z. B. Stripe Elements)
// ----------------------
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    // Beispiel: Betrag in Cent (dynamisch berechenbar)
    const amount = 1000; // Hier kannst Du den Betrag basierend auf dem Warenkorb berechnen

    // Erstelle eine kurze Zusammenfassung des Warenkorbs (nur Produktnamen und Menge)
    const cartSummary = (req.body.items || [])
      .map((item) => `${item.product.name} x ${item.quantity}`)
      .join(", ");

    // Kürze den String, falls er zu lang ist (max. 500 Zeichen)
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
// API: Stripe Webhook (Zahlungsstatus verarbeiten und E‑Mails versenden)
// ----------------------
app.post(
  "/api/stripe-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
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

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Zahlung abgeschlossen:", session);

      // Bestelldaten vorbereiten (z. B. aus Metadaten)
      const orderData = {
        userEmail: session.customer_email,
        totalAmount: session.amount_total / 100,
        currency: session.currency,
        paymentStatus: session.payment_status,
        createdAt: new Date(),
        items:
          session.metadata && session.metadata.cart
            ? JSON.parse(session.metadata.cart)
            : [],
      };

      // Funktion zum Versenden von E-Mails
      async function sendEmails(orderData) {
        const transporter = nodemailer.createTransport({
          host: "smtp.strato.de",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // E-Mail an Dich
        await transporter.sendMail({
          from: `"Shop Benachrichtigung" <${process.env.EMAIL_USER}>`,
          to: "info@haus-hamburg-leer.de",
          subject: "Neue Bestellung erhalten",
          html: `<p>Es wurde eine neue Bestellung aufgegeben:</p>
                 <pre>${JSON.stringify(orderData, null, 2)}</pre>`,
        });

        // E-Mail an den Kunden
        if (orderData.userEmail) {
          await transporter.sendMail({
            from: `"Haus Hamburg" <${process.env.EMAIL_USER}>`,
            to: orderData.userEmail,
            subject: "Bestellbestätigung – Haus Hamburg",
            html: `<p>Vielen Dank für Ihre Bestellung!</p>
                   <p>Ihre Zahlung wurde erfolgreich verarbeitet und Ihre Bestellung wird nun bearbeitet.</p>
                   <p>Bei Fragen können Sie sich gerne an uns wenden.</p>`,
          });
        }
      }
w
      try {
        console.log("✅ Bestellung vorbereitet:", orderData);
        await sendEmails(orderData);
        console.log("✅ E-Mails versendet");
      } catch (error) {
        console.error("❌ Fehler beim Versenden der E-Mails:", error);
      }
    }

    res.json({ received: true });
  }
);

// ----------------------
// Server starten
// ----------------------
app.listen(port, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${port}`);
});
