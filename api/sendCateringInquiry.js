import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Daten aus dem Request-Body extrahieren
  const { name, email, phone, message, budget, cateringType, guests, location, dateTime } = req.body;

  // Überprüfen, ob alle erforderlichen Felder vorhanden sind
  if (!name || !email || !phone || !message || !budget || !cateringType || !guests || !location || !dateTime) {
    return res.status(400).json({ error: "Alle Felder sind erforderlich!" });
  }

  // 📌 Gmail als SMTP-Server
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // SSL-Port (Alternativ: 587 für TLS)
    secure: true, // SSL aktivieren
    auth: {
      user: process.env.EMAIL_USER, // Deine Gmail-Adresse
      pass: process.env.EMAIL_PASS, // App-Passwort
    },
  });

  try {
    // E-Mail-Inhalt erstellen
    const emailContent = `
      Name: ${name}
      E-Mail: ${email}
      Telefon: ${phone}
      Nachricht: ${message}
      Budget: ${budget}
      Personenanzahl: ${guests}
      Ort: ${location}
      Datum und Zeit: ${dateTime}
      Catering-Art: ${cateringType.join(", ")}
    `;

    // E-Mail senden
    await transporter.sendMail({
      from: `"Catering Anfrage" <${process.env.EMAIL_USER}>`,
      to: "okansondere@gmail.com", // Zieladresse
      subject: "Catering-Anfrage",
      text: emailContent, // Nur Text-Inhalt
    });

    return res.status(200).json({ success: true, message: "E-Mail wurde gesendet!" });
  } catch (error) {
    console.error("E-Mail Versand fehlgeschlagen:", error);
    return res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
  }
}
