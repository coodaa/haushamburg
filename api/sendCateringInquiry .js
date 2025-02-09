const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

// Middleware, um JSON-Daten aus dem Request-Body zu parsen
app.use(express.json());

// API-Endpunkt für Catering-Anfragen
app.post("/api/sendCateringInquiry", async (req, res) => {
  // Extrahiere die Felder aus dem Request-Body
  const { name, email, phone, message, submittedAt } = req.body;

  // Konfiguriere den Nodemailer-Transporter.
  // Hinweis: Verwende hier deine tatsächlichen SMTP-Zugangsdaten.
  let transporter = nodemailer.createTransport({
    service: "gmail", // Beispiel: Gmail
    auth: {
      user: "dein.email@gmail.com",      // Ersetze mit deiner E-Mail-Adresse
      pass: "dein_app_passwort"            // Ersetze mit einem gültigen App-Passwort (bei 2FA erforderlich)
    }
  });

  // Definiere die E-Mail-Optionen
  let mailOptions = {
    from: '"Haus Hamburg Catering" <dein.email@gmail.com>', // Absender-Adresse
    to: "schneider.f@me.com",                               // Empfänger-Adresse
    subject: "Neue Catering-Anfrage",
    text: `Neue Catering-Anfrage:

Name: ${name}
E-Mail: ${email}
Telefon: ${phone}
Nachricht: ${message}
Gesendet am: ${submittedAt}`
  };

  try {
    // Versende die E-Mail
    await transporter.sendMail(mailOptions);
    // Sende eine Erfolgsmeldung zurück
    res.json({ success: true });
  } catch (error) {
    console.error("Fehler beim E-Mail Versand:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Starte den Server auf Port 3000 (oder einem anderen Port deiner Wahl)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});

// sdfksdfpnsd
