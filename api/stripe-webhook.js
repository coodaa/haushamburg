const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

const app = express();

// Stripe benötigt den rohen Body für die Verifikation
app.use("/api/stripe-webhook", express.raw({ type: "application/json" }));

// Funktion zum Senden von E-Mails (mit formatierten Bestell-Details)
async function sendEmails(orderData) {
  // Erstelle den Nodemailer-Transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de", // SMTP-Server (anpassen, falls nötig)
    port: 465, // SSL-Port (oder 587 für TLS)
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // z. B. info@haus-hamburg-leer.de
      pass: process.env.EMAIL_PASS,
    },
  });

  // Formatierte E-Mail für den Shop-Inhaber
  const ownerEmailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
      <h2 style="color: #004a7f;">Neue Bestellbestätigung</h2>
      <p><strong>👤 Name:</strong> ${orderData.customerName || "Nicht angegeben"}</p>
      <p><strong>📧 E-Mail:</strong> <a href="mailto:${orderData.userEmail}" style="color: #004a7f;">${orderData.userEmail}</a></p>
      <p><strong>📞 Telefon:</strong> ${orderData.phone || "Nicht angegeben"}</p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">📋 Bestelldetails:</h3>
      <ul>
        ${orderData.items
          .map(
            (item) =>
              `<li>${item.quantity} x ${item.product.name} – ${item.product.price.toFixed(2)} €</li>`
          )
          .join("")}
      </ul>
      <p><strong>Gesamtsumme:</strong> ${orderData.totalAmount.toFixed(2)} €</p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">🏠 Lieferadresse:</h3>
      <p>
         ${orderData.address && orderData.address.name ? orderData.address.name + "<br/>" : ""}
         ${orderData.address && orderData.address.street ? orderData.address.street + "<br/>" : ""}
         ${orderData.address && orderData.address.postalCode ? orderData.address.postalCode + " " : ""}
         ${orderData.address && orderData.address.city ? orderData.address.city + "<br/>" : ""}
         ${orderData.address && orderData.address.country ? orderData.address.country : ""}
      </p>
      <hr style="border: 1px solid #ddd;" />
      <p style="font-size: 0.9em; color: #777;">
        Diese Bestellung wurde über den Checkout Ihrer Website gesendet.
      </p>
    </div>
  `;

  // Formatierte Bestätigungs-E-Mail für den Kunden
  const customerEmailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
      <h2 style="color: #004a7f;">Bestellbestätigung – Vielen Dank für Ihre Bestellung!</h2>
      <p>Hallo ${orderData.customerName || "Kunde"},</p>
      <p>vielen Dank für Ihre Bestellung bei uns. Wir haben Ihre Zahlung erhalten und bearbeiten Ihre Bestellung.</p>
      <hr style="border: 1px solid #ddd;" />
      <p><strong>Bestelldatum:</strong> ${new Date(orderData.createdAt).toLocaleDateString("de-DE")}</p>
      <p><strong>Gesamtsumme:</strong> ${orderData.totalAmount.toFixed(2)} €</p>
      <p>Sie erhalten in Kürze weitere Informationen zur Lieferung.</p>
      <p>Mit freundlichen Grüßen,<br/>Ihr Team</p>
    </div>
  `;

  // Sende E-Mail an den Shop-Inhaber
  await transporter.sendMail({
    from: `"Bestellbestätigung" <${process.env.EMAIL_USER}>`,
    to: "info@haus-hamburg-leer.de", // Deine Adresse
    subject: `Neue Bestellung am ${new Date(orderData.createdAt).toLocaleDateString("de-DE")}`,
    html: ownerEmailContent,
  });

  // Sende Bestätigungs-E-Mail an den Kunden (falls E-Mail vorhanden)
  if (orderData.userEmail) {
    await transporter.sendMail({
      from: `"Haus Hamburg" <${process.env.EMAIL_USER}>`,
      to: orderData.userEmail,
      subject: "Ihre Bestellbestätigung – Haus Hamburg",
      html: customerEmailContent,
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

    /*
      Um alle benötigten Bestelldaten zu erhalten, solltest du beim Erstellen der Checkout-Session
      zusätzliche Informationen als Metadaten (z. B. customerName, phone, address) übergeben.
      Beispiel:
      metadata: {
        cart: JSON.stringify(cart), // Warenkorb
        customerName: customerName,
        phone: phone,
        address: JSON.stringify(address)
      }
    */

    // Bereite die Bestelldaten vor
    const orderData = {
      userEmail: session.customer_email,
      totalAmount: session.amount_total / 100, // Betrag in Euro
      currency: session.currency,
      paymentStatus: session.payment_status,
      createdAt: new Date(),
      // Annahme: Der Warenkorb wurde als JSON-String in der Metadaten gespeichert
      items: session.metadata && session.metadata.cart ? JSON.parse(session.metadata.cart) : [],
      customerName: session.metadata && session.metadata.customerName ? session.metadata.customerName : "",
      phone: session.metadata && session.metadata.phone ? session.metadata.phone : "",
      address: session.metadata && session.metadata.address ? JSON.parse(session.metadata.address) : {},
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
