// /api/sendCheckoutEmail.js
const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Log zum Debuggen
  console.log("Received checkout order:", req.body);

  const { address, items, total } = req.body;

  // Überprüfe, ob alle Pflichtfelder vorhanden sind
  if (
    !address ||
    !address.firstName ||
    !address.lastName ||
    !address.email ||
    !address.street ||
    !address.postalCode ||
    !address.city ||
    !address.country ||
    !address.phone ||
    !items ||
    items.length === 0 ||
    typeof total !== "number"
  ) {
    return res.status(400).json({ error: "Bitte füllen Sie alle Pflichtfelder aus!" });
  }

  // Erstelle den Nodemailer-Transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de", // oder deinen SMTP-Server
    port: 465,              // SSL-Port (alternativ 587 für TLS)
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Erstelle einen string mit den Bestelldetails
  let orderDetails = "";
  items.forEach(item => {
    orderDetails += `<p>${item.quantity} x ${item.product.name} – ${parseFloat(item.product.price).toFixed(2).replace(".", ",")} €</p>`;
  });

  // Inhalt der E-Mail an Dich als Shop-Inhaber
  const ownerEmailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
      <h2 style="color: #004a7f;">Neue Bestellung</h2>
      <p><strong>👤 Kunde:</strong> ${address.firstName} ${address.lastName}</p>
      <p><strong>📧 E-Mail:</strong> <a href="mailto:${address.email}" style="color: #004a7f;">${address.email}</a></p>
      <p><strong>📞 Telefon:</strong> <a href="tel:${address.phone}" style="color: #004a7f;">${address.phone}</a></p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">📍 Lieferadresse:</h3>
      <p>${address.street}</p>
      <p>${address.postalCode} ${address.city}</p>
      <p>${address.country}</p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">🛒 Bestelldetails:</h3>
      ${orderDetails}
      <p><strong>Gesamtsumme:</strong> ${total.toFixed(2).replace(".", ",")} €</p>
      <hr style="border: 1px solid #ddd;" />
      <p style="font-size: 0.9em; color: #777;">Diese Bestellung wurde über den Checkout auf Ihrer Website getätigt.</p>
    </div>
  `;

  // Inhalt der Bestätigungs-E-Mail an den Kunden
  const customerEmailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
      <h2 style="color: #004a7f;">Bestellbestätigung – Ihr Restaurant</h2>
      <p>Sehr geehrte/r ${address.firstName} ${address.lastName},</p>
      <p>vielen Dank für Ihre Bestellung. Wir haben Ihre Bestellung erhalten und bereiten diese aktuell vor.</p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">Ihre Bestellung:</h3>
      ${orderDetails}
      <p><strong>Gesamtsumme:</strong> ${total.toFixed(2).replace(".", ",")} €</p>
      <hr style="border: 1px solid #ddd;" />
      <p>Die Lieferung erfolgt an:</p>
      <p>${address.street}</p>
      <p>${address.postalCode} ${address.city}</p>
      <p>${address.country}</p>
      <p>Bei Fragen erreichen Sie uns unter <a href="mailto:info@deinrestaurant.de" style="color: #004a7f;">info@deinrestaurant.de</a>.</p>
      <p>Mit freundlichen Grüßen,<br/>Ihr Restaurant Team</p>
    </div>
  `;

  try {
    // Sende E-Mail an Dich (Shop-Inhaber)
    await transporter.sendMail({
      from: `"Neue Bestellung" <${process.env.EMAIL_USER}>`,
      to: "info@deinrestaurant.de", // Deine E-Mail-Adresse
      subject: `Neue Bestellung – ${new Date().toLocaleDateString("de-DE")}`,
      html: ownerEmailContent,
    });

    // Sende Bestätigungs-E-Mail an den Kunden
    await transporter.sendMail({
      from: `"Ihr Restaurant" <${process.env.EMAIL_USER}>`,
      to: address.email,
      subject: "Bestellbestätigung – Ihre Bestellung bei unserem Restaurant",
      html: customerEmailContent,
    });

    console.log("✅ E-Mails erfolgreich gesendet!");
    return res.status(200).json({ success: true, message: "E-Mail wurde gesendet!" });
  } catch (error) {
    console.error("❌ E-Mail Versand fehlgeschlagen:", error);
    return res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
  }
};
