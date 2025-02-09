import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Alle Felder sind erforderlich!" });
  }

  // 📌 Gmail als SMTP-Server
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // SSL-Port (Alternativ: 587 für TLS)
    secure: true, // SSL aktivieren
    auth: {
      user: process.env.EMAIL_USER, // = okansondere@gmail.com
      pass: process.env.EMAIL_PASS, // = App-Passwort
    },
  });

  try {
    await transporter.sendMail({
      from: `"Catering Anfrage" <${process.env.EMAIL_USER}>`, // Absender Gmail
      to: "okansondere@gmail.com", // 📌 Ändere das, falls du es woanders empfangen willst
      subject: "Neue Catering-Anfrage",
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\nNachricht: ${message}`,
    });

    return res.status(200).json({ success: true, message: "E-Mail wurde gesendet!" });
  } catch (error) {
    console.error("E-Mail Versand fehlgeschlagen:", error);
    return res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
  }
}
