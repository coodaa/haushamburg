const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Logge den Request-Body zur Fehlersuche
  console.log("Received order confirmation data:", req.body);

  const {
    customerName,
    customerEmail,
    phone,
    orderItems,
    totalPrice,
    address,
    orderDate, // z. B. als ISO-String
  } = req.body;

  // Überprüfe Pflichtfelder
  if (!customerName || !customerEmail || !orderItems || !address) {
    return res
      .status(400)
      .json({ error: "Bitte füllen Sie alle Pflichtfelder aus!" });
  }

  // Erstelle den Nodemailer-Transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de", // Dein SMTP-Server, z. B. Strato
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Inhalt für die E-Mail an Dich (Shop-Inhaber)
  const ownerEmailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
      <h2 style="color: #004a7f;">Neue Bestellbestätigung</h2>
      <p><strong>👤 Name:</strong> ${customerName}</p>
      <p><strong>📧 E-Mail:</strong> <a href="mailto:${customerEmail}" style="color: #004a7f;">${customerEmail}</a></p>
      <p><strong>📞 Telefon:</strong> ${phone}</p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">📋 Bestelldetails:</h3>
      <ul>
        ${orderItems
          .map(
            (item) =>
              `<li>${item.quantity} x ${
                item.product.name
              } – ${item.product.price.toFixed(2)} €</li>`
          )
          .join("")}
      </ul>
      <p><strong>Gesamtsumme:</strong> ${totalPrice.toFixed(2)} €</p>
      <hr style="border: 1px solid #ddd;" />
      <h3 style="color: #004a7f;">🏠 Lieferadresse:</h3>
      <p>${address.name}<br/>
         ${address.street}<br/>
         ${address.postalCode} ${address.city}<br/>
         ${address.country}</p>
      <hr style="border: 1px solid #ddd;" />
      <p style="font-size: 0.9em; color: #777;">Diese Bestellung wurde über den Checkout Ihrer Website gesendet.</p>
    </div>
  `;

  // Inhalt für die Bestätigungs-E-Mail an den Kunden
  const customerEmailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
      <h2 style="color: #004a7f;">Bestellbestätigung – Vielen Dank für Ihre Bestellung!</h2>
      <p>Hallo ${customerName},</p>
      <p>vielen Dank für Ihre Bestellung bei uns. Wir haben Ihre Zahlung erhalten und bearbeiten Ihre Bestellung.</p>
      <hr style="border: 1px solid #ddd;" />
      <p><strong>Bestelldatum:</strong> ${new Date(
        orderDate
      ).toLocaleDateString("de-DE")}</p>
      <p><strong>Gesamtsumme:</strong> ${totalPrice.toFixed(2)} €</p>
      <p>Sie erhalten in Kürze weitere Informationen zur Lieferung.</p>
      <p>Mit freundlichen Grüßen,<br/>Ihr Team</p>
    </div>
  `;

  try {
    // Sende E-Mail an Dich (Shop-Inhaber)
    await transporter.sendMail({
      from: `"Bestellbestätigung" <${process.env.EMAIL_USER}>`,
      to: "info@deinedomain.de", // Deine E-Mail-Adresse
      subject: `Neue Bestellung am ${new Date(orderDate).toLocaleDateString(
        "de-DE"
      )}`,
      html: ownerEmailContent,
    });

    // Sende Bestätigungs-E-Mail an den Kunden
    await transporter.sendMail({
      from: `"Shop Bestätigung" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: "Ihre Bestellbestätigung",
      html: customerEmailContent,
    });

    console.log("✅ E-Mails erfolgreich gesendet!");
    return res
      .status(200)
      .json({ success: true, message: "E-Mails wurden gesendet!" });
  } catch (error) {
    console.error("❌ E-Mail Versand fehlgeschlagen:", error);
    return res
      .status(500)
      .json({ error: "E-Mail konnte nicht gesendet werden" });
  }
};
