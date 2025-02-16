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
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
      <h2 style="color: #004a7f;">Neue Catering-Anfrage</h2>

      <p>
        <strong>👤 Name:</strong> Florian Schneider
      </p>
      <p>
        <strong>📧 E-Mail:</strong>{" "}
        <a href="mailto:schneider.f@me.com" style="color: #004a7f;">
          schneider.f@me.com
        </a>
      </p>
      <p>
        <strong>📞 Telefon:</strong>{" "}
        <a href="tel:01734740381" style="color: #004a7f;">
          01734740381
        </a>
      </p>

      <hr style="border: 1px solid #ddd;" />

      <h3 style="color: #004a7f;">📋 Details zur Anfrage:</h3>
      <p>
        <strong>📍 Ort:</strong> <span style="font-weight: bold;">Berlin</span>
      </p>
      <p>
        <strong>📅 Datum & Uhrzeit:</strong>{" "}
        <span style="font-weight: bold;">17.2.2025</span>
      </p>
      <p>
        <strong>👥 Anzahl der Personen:</strong>{" "}
        <span style="font-weight: bold;">6</span>
      </p>
      <p>
        <strong>💰 Budget pro Person:</strong>{" "}
        <span style="font-weight: bold;">€15-35</span>
      </p>
      <p>
        <strong>🍽️ Catering-Art:</strong>{" "}
        <span style="font-weight: bold;">Fischbrötchen, kalte Fischplatte</span>
      </p>

      <hr style="border: 1px solid #ddd;" />

      <h3 style="color: #004a7f;">📝 Zusätzliche Nachricht:</h3>
      <p style="background: #f8f8f8; padding: 10px; border-radius: 5px;">
        <strong>Besseres Format?</strong>
      </p>

      <hr style="border: 1px solid #ddd;" />

      <p style="font-size: 0.9em; color: #777;">
        Diese Anfrage wurde über das Catering-Formular auf Ihrer Website
        gesendet.
      </p>
    </div>;

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
