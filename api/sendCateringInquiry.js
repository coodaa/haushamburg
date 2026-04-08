import nodemailer from "nodemailer";

const NAVY = "#04305D";
const GOLD = "#f1bd3f";
const BEIGE = "#F2EDE9";
const PINK = "#E9A8CB";

function emailWrapper(content) {
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:${BEIGE}; font-family: Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BEIGE}; padding: 32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%;">

        <!-- Header -->
        <tr>
          <td style="background-color:${NAVY}; padding: 36px 48px 28px; text-align:center;">
            <img src="https://www.haus-hamburg-leer.de/haushamburg_logo.png" alt="Haus Hamburg" width="120" style="display:block; margin:0 auto 20px; width:120px;" />
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td style="height:1px; background-color:transparent; width:30%;"></td>
              <td style="height:1px; background-color:${GOLD};"></td>
              <td style="height:1px; background-color:transparent; width:30%;"></td>
            </tr></table>
            <p style="margin:16px 0 0; color:rgba(255,255,255,0.6); font-size:10px; letter-spacing:4px; text-transform:uppercase; font-family: Arial, sans-serif;">Catering</p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="background-color:#ffffff; padding: 40px 48px; color:#2a2a2a;">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding: 20px 48px; text-align:center;">
            <p style="margin:0; font-size:11px; color:#999; font-family: Arial, sans-serif; letter-spacing:0.5px;">
              Haus Hamburg &nbsp;&middot;&nbsp; Neue Stra&szlig;e 1 &nbsp;&middot;&nbsp; 26789 Leer
            </p>
            <p style="margin:6px 0 0; font-size:11px; font-family: Arial, sans-serif;">
              <a href="mailto:info@haus-hamburg-leer.de" style="color:${NAVY}; text-decoration:none;">info@haus-hamburg-leer.de</a>
              &nbsp;&middot;&nbsp;
              <a href="https://www.haus-hamburg-leer.de" style="color:${NAVY}; text-decoration:none;">haus-hamburg-leer.de</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label, value) {
  return `
  <tr>
    <td style="padding: 11px 0; font-size:12px; color:#999; font-family: Arial, sans-serif; letter-spacing:0.5px; width:40%; vertical-align:top; border-bottom:1px solid #f0ebe7;">${label}</td>
    <td style="padding: 11px 0 11px 16px; font-size:14px; color:#1a1a1a; vertical-align:top; border-bottom:1px solid #f0ebe7;">${value}</td>
  </tr>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

  if (!name || !email || !phone || !guests || !location || !dateTime) {
    return res.status(400).json({ error: "Bitte füllen Sie alle Pflichtfelder aus!" });
  }

  const formattedDate = new Date(dateTime).toLocaleDateString("de-DE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const ownerContent = `
    <h2 style="margin:0 0 4px; color:${NAVY}; font-size:22px; font-weight:normal;">Neue Catering-Anfrage</h2>
    <p style="margin:0 0 32px; color:#aaa; font-size:12px; font-family:Arial,sans-serif; letter-spacing:0.5px;">Eingegangen am ${new Date().toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })} Uhr</p>

    <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:3px; color:${GOLD}; font-family:Arial,sans-serif;">Kontakt</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px; border-top:1px solid #f0ebe7;">
      ${row("Name", name)}
      ${row("E-Mail", `<a href="mailto:${email}" style="color:${NAVY}; text-decoration:none;">${email}</a>`)}
      ${row("Telefon", `<a href="tel:${phone}" style="color:${NAVY}; text-decoration:none;">${phone}</a>`)}
    </table>

    <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:3px; color:${GOLD}; font-family:Arial,sans-serif;">Veranstaltung</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px; border-top:1px solid #f0ebe7;">
      ${row("Datum &amp; Uhrzeit", formattedDate)}
      ${row("Ort", location)}
      ${row("Personen", guests)}
      ${row("Budget p.P.", budget || "nicht angegeben")}
      ${row("Catering-Art", cateringType ? cateringType.join(", ") : "nicht angegeben")}
    </table>

    ${message ? `
    <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:3px; color:${GOLD}; font-family:Arial,sans-serif;">Nachricht</p>
    <div style="padding:16px 20px; border-left:3px solid ${GOLD}; background-color:${BEIGE}; font-size:14px; line-height:1.8; color:#333;">
      ${message}
    </div>` : ""}
  `;

  const customerContent = `
    <p style="margin:0 0 20px; font-size:17px; color:${NAVY}; font-weight:normal;">Liebe/r ${name},</p>
    <p style="margin:0 0 32px; font-size:15px; line-height:1.8; color:#555; font-family:Arial,sans-serif;">
      vielen Dank f&uuml;r Ihre Catering-Anfrage. Wir haben Ihre Nachricht erhalten und melden uns in K&uuml;rze pers&ouml;nlich bei Ihnen.
    </p>

    <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:3px; color:${GOLD}; font-family:Arial,sans-serif;">Ihre Angaben</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px; border-top:1px solid #f0ebe7;">
      ${row("Datum &amp; Uhrzeit", formattedDate)}
      ${row("Ort", location)}
      ${row("Personen", guests)}
      ${row("Budget p.P.", budget || "nicht angegeben")}
      ${row("Catering-Art", cateringType ? cateringType.join(", ") : "nicht angegeben")}
    </table>

    <p style="margin:0 0 8px; font-size:14px; line-height:1.8; color:#555; font-family:Arial,sans-serif;">
      Bei Fragen erreichen Sie uns jederzeit unter
      <a href="mailto:info@haus-hamburg-leer.de" style="color:${NAVY}; text-decoration:none;">info@haus-hamburg-leer.de</a>.
    </p>
    <p style="margin:28px 0 0; font-size:14px; color:#555; font-family:Arial,sans-serif; line-height:1.8;">
      Mit freundlichen Gr&uuml;&szlig;en,<br>
      <span style="color:${NAVY}; font-size:16px; font-family:Georgia,'Times New Roman',serif;">Ihr Haus Hamburg Team</span>
    </p>
  `;

  try {
    await transporter.sendMail({
      from: `"Haus Hamburg Catering" <${process.env.EMAIL_USER}>`,
      to: "info@haus-hamburg-leer.de, schneider.f@me.com",
      subject: `Catering-Anfrage · ${name} · ${new Date(dateTime).toLocaleDateString("de-DE")}`,
      html: emailWrapper(ownerContent),
    });

    if (email) {
      await transporter.sendMail({
        from: `"Haus Hamburg Catering" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Ihre Catering-Anfrage bei Haus Hamburg – Bestätigung",
        html: emailWrapper(customerContent),
      });
    }

    console.log("✅ E-Mails erfolgreich gesendet!");
    return res.status(200).json({ success: true, message: "E-Mail wurde gesendet!" });
  } catch (error) {
    console.error("❌ E-Mail Versand fehlgeschlagen:", error.message, error.code, error.response);
    return res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
  }
}
