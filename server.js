const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware zum Parsen von JSON
app.use(express.json());

// API-Endpunkt für Catering-Anfragen
app.post("/api/sendCateringInquiry", async (req, res) => {
  const { name, email, phone, message, submittedAt } = req.body;

  // Konfiguriere den Nodemailer-Transporter für Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // okansondere@gmail.com
      pass: process.env.EMAIL_PASS  // Messi2020@9!
    }
  });

  const mailOptions = {
    from: `"Haus Hamburg Catering" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,  // Hier wird ebenfalls die Google Mail verwendet
    subject: "Neue Catering-Anfrage",
    text: `Neue Catering-Anfrage:

Name: ${name}
E-Mail: ${email}
Telefon: ${phone}
Nachricht: ${message}
Gesendet am: ${submittedAt}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("E-Mail Versand fehlgeschlagen:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});
