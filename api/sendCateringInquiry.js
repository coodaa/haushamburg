import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Daten aus dem Request-Body extrahieren
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

  // Überprüfen, ob alle erforderlichen Felder vorhanden sind
  if (
    !name ||
    !email ||
    !phone ||
    !message ||
    !budget ||
    !cateringType ||
    !guests ||
    !location ||
    !dateTime
  ) {
    return res.status(400).json({ error: "Alle Felder sind erforderlich!" });
  }

  // 📌 **Strato SMTP-Server Konfiguration**
  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de", // Strato SMTP-Host
    port: 465, // SSL-Port (Alternativ: 587 für TLS)
    secure: true, // SSL aktivieren
    auth: {
      user: process.env.EMAIL_USER, // Deine Strato E-Mail-Adresse (z. B. info@haus-hamburg-leer.de)
      pass: process.env.EMAIL_PASS, // Dein Strato-Passwort
    },
  });

  try {
    const emailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
      <h2 style="color: #004a7f; border-bottom: 2px solid #004a7f; padding-bottom: 5px;">Neue Catering-Anfrage</h2>

      <p><strong>👤 Name:</strong> ${name}</p>
      <p><strong>📧 E-Mail:</strong> <a href="mailto:${email}" style="color: #004a7f;">${email}</a></p>
      <p><strong>📞 Telefon:</strong> <a href="tel:${phone}" style="color: #004a7f;">${phone}</a></p>

      <hr style="border: 1px solid #ddd; margin: 20px 0;" />

      <h3 style="color: #004a7f;">📋 Details zur Anfrage:</h3>
      <p><strong>📍 Ort:</strong> ${location}</p>
      <p><strong>📅 Datum & Uhrzeit:</strong> ${new Date(
        dateTime
      ).toLocaleDateString("de-DE")}</p>
      <p><strong>👥 Anzahl der Personen:</strong> ${guests}</p>
      <p><strong>💰 Budget pro Person:</strong> ${budget}</p>
      <p><strong>🍽️ Catering-Art:</strong> ${cateringType.join(", ")}</p>

      <hr style="border: 1px solid #ddd; margin: 20px 0;" />

      <h3 style="color: #004a7f;">📝 Zusätzliche Nachricht:</h3>
      <p style="background: #f8f8f8; padding: 10px; border-radius: 5px;">${
        message || "Keine zusätzliche Nachricht"
      }</p>

      <hr style="border: 1px solid #ddd; margin: 20px 0;" />

      <p style="font-size: 0.9em; color: #777; text-align: center;">
        Diese Anfrage wurde über das <strong>Catering-Formular</strong> auf Ihrer Website gesendet.
      </p>
    </div>
  `;

    // E-Mail senden
    await transporter.sendMail({
      from: `"Catering Anfrage" <${process.env.EMAIL_USER}>`,
      to: "info@haus-hamburg-leer.de", // Zieladresse anpassen
      subject: `Catering-Anfrage für den ${new Date(
        dateTime
      ).toLocaleDateString("de-DE")}`,
      html: emailContent, // 🔹 Hier "html:" statt "text:"
    });

    return res
      .status(200)
      .json({ success: true, message: "E-Mail wurde gesendet!" });
  } catch (error) {
    console.error("E-Mail Versand fehlgeschlagen:", error);
    return res
      .status(500)
      .json({ error: "E-Mail konnte nicht gesendet werden" });
  }
}
