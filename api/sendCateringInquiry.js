// api/sendCateringInquiry.js
const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Logge den Request-Body zur Fehlersuche
  console.log("Received catering inquiry:", req.body);

  const {
    name,
    email,
    phone,
    message,
    budget,
    cateringType,
    guests,
    location,
    dateTime,
  } = req.body;

  // Überprüfe nur die Pflichtfelder (zum Beispiel: name, email, phone, guests, location, dateTime)
  if (!name || !email || !phone || !guests || !location || !dateTime) {
    return res.status(400).json({ error: "Bitte füllen Sie alle Pflichtfelder aus!" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de", // SMTP-Server (hier Strato)
    port: 465, // SSL-Port
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
        <h2 style="color: #004a7f;">Neue Catering-Anfrage</h2>
        <p><strong>👤 Name:</strong> ${name}</p>
        <p><strong>📧 E-Mail:</strong> <a href="mailto:${email}" style="color: #004a7f;">${email}</a></p>
        <p><strong>📞 Telefon:</strong> <a href="tel:${phone}" style="color: #004a7f;">${phone}</a></p>
        <hr style="border: 1px solid #ddd;" />
        <h3 style="color: #004a7f;">📋 Details zur Anfrage:</h3>
        <p><strong>📍 Ort:</strong> <span style="font-weight: bold;">${location}</span></p>
        <p><strong>📅 Datum & Uhrzeit:</strong> <span style="font-weight: bold;">${dateTime}</span></p>
        <p><strong>👥 Anzahl der Personen:</strong> <span style="font-weight: bold;">${guests}</span></p>
        <p><strong>💰 Budget pro Person:</strong> <span style="font-weight: bold;">${budget || "nicht angegeben"}</span></p>
        <p><strong>🍽️ Catering-Art:</strong> <span style="font-weight: bold;">${cateringType ? cateringType.join(", ") : "nicht angegeben"}</span></p>
        <hr style="border: 1px solid #ddd;" />
        <h3 style="color: #004a7f;">📝 Zusätzliche Nachricht:</h3>
        <p style="background: #f8f8f8; padding: 10px; border-radius: 5px;"><strong>${message || "Keine zusätzlichen Angaben"}</strong></p>
        <hr style="border: 1px solid #ddd;" />
        <p style="font-size: 0.9em; color: #777;">Diese Anfrage wurde über das Catering-Formular auf Ihrer Website gesendet.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Catering Anfrage" <${process.env.EMAIL_USER}>`,
      to: "info@haus-hamburg-leer.de",
      subject: `Catering-Anfrage für den ${new Date(dateTime).toLocaleDateString("de-DE")}`,
      html: emailContent,
    });

    return res.status(200).json({ success: true, message: "E-Mail wurde gesendet!" });
  } catch (error) {
    console.error("E-Mail Versand fehlgeschlagen:", error);
    return res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
  }
};
