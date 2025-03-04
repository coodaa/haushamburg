// send-order-email.js
const nodemailer = require("nodemailer");

// Erstelle den Transporter basierend auf Deinen SMTP-Daten
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,  // z. B. "smtp.strato.de"
  port: process.env.EMAIL_SMTP_PORT,  // z. B. 465
  secure: process.env.EMAIL_SMTP_SECURE === "true", // true bei SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sendet Bestellbestätigungs‑ und Administrations‑E‑Mails
 * @param {Object} orderData - Bestelldaten, z. B. { customerEmail, orderDetails, cartSummary }
 */
async function sendOrderEmails(orderData) {
  const { customerEmail, orderDetails, cartSummary } = orderData;

  // E‑Mail an den Kunden
  const customerMailOptions = {
    from: `"Haus Hamburg" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject: "Ihre Bestellung bei Haus Hamburg – Bestätigung",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Vielen Dank für Ihre Bestellung!</h2>
        <p>Hier sind Ihre Bestelldetails:</p>
        <p><strong>Produkte:</strong> ${cartSummary}</p>
        <p><strong>Gesamtbetrag:</strong> ${orderDetails.totalAmount} €</p>
        <p>Eine Bestätigungs‑E‑Mail wurde an Sie gesendet.</p>
        <p>Mit freundlichen Grüßen,<br/>Ihr Haus Hamburg Team</p>
      </div>
    `,
  };

  // E‑Mail an Dich (Admin)
  const adminMailOptions = {
    from: `"Haus Hamburg Bestellinfo" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL, // Definiere in Deiner .env, z. B. ADMIN_EMAIL=deinemail@deinedomain.de
    subject: "Neue Bestellung eingegangen",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Neue Bestellung</h2>
        <p><strong>Kundendaten:</strong></p>
        <ul>
          <li>Name: ${orderDetails.customerName}</li>
          <li>E-Mail: ${customerEmail}</li>
          <li>Telefon: ${orderDetails.phone}</li>
        </ul>
        <p><strong>Produkte:</strong> ${cartSummary}</p>
        <p><strong>Gesamtbetrag:</strong> ${orderDetails.totalAmount} €</p>
        <p>Bestelldatum: ${new Date().toLocaleString("de-DE")}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(adminMailOptions);
    console.log("E‑Mails wurden erfolgreich gesendet.");
  } catch (error) {
    console.error("Fehler beim E‑Mail Versand:", error);
    throw error;
  }
}

module.exports = { sendOrderEmails };
