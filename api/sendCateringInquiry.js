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
<body style="margin:0; padding:0; background-color:#e8e0da; font-family: Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8e0da; padding: 32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:4px; overflow:hidden; box-shadow: 0 2px 12px rgba(4,48,93,0.10);">

        <!-- Header -->
        <tr>
          <td style="background-color:${NAVY}; padding: 32px 40px; text-align:center;">
            <p style="margin:0 0 6px 0; color:${GOLD}; font-size:11px; letter-spacing:3px; text-transform:uppercase;">Haus Hamburg · Leer</p>
            <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:normal; letter-spacing:1px;">Catering</h1>
            <div style="margin-top:16px; height:2px; background: linear-gradient(to right, transparent, ${GOLD}, transparent);"></div>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding: 36px 40px; color:#2a2a2a;">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:${BEIGE}; padding: 20px 40px; text-align:center; border-top: 1px solid #e0d8d2;">
            <p style="margin:0; font-size:12px; color:#888; letter-spacing:0.5px;">
              Haus Hamburg · Neue Straße 1 · 26789 Leer
            </p>
            <p style="margin:6px 0 0; font-size:12px;">
              <a href="mailto:info@haus-hamburg-leer.de" style="color:${NAVY}; text-decoration:none;">info@haus-hamburg-leer.de</a>
              &nbsp;·&nbsp;
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
    <td style="padding: 10px 14px; background-color:${BEIGE}; border-radius:3px; font-size:13px; color:#666; width:38%; vertical-align:top;">${label}</td>
    <td style="padding: 10px 14px; font-size:14px; color:#1a1a1a; font-weight:bold; vertical-align:top;">${value}</td>
  </tr>
  <tr><td colspan="2" style="height:4px;"></td></tr>`;
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
    <h2 style="margin:0 0 6px; color:${NAVY}; font-size:20px; font-weight:normal;">Neue Catering-Anfrage</h2>
    <p style="margin:0 0 24px; color:#888; font-size:13px;">Eingegangen am ${new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })} Uhr</p>

    <p style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:${PINK};">Kontakt</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Name", name)}
      ${row("E-Mail", `<a href="mailto:${email}" style="color:${NAVY};">${email}</a>`)}
      ${row("Telefon", `<a href="tel:${phone}" style="color:${NAVY};">${phone}</a>`)}
    </table>

    <p style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:${PINK};">Veranstaltung</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Datum & Uhrzeit", formattedDate)}
      ${row("Ort", location)}
      ${row("Personen", guests)}
      ${row("Budget p.P.", budget || "nicht angegeben")}
      ${row("Catering-Art", cateringType ? cateringType.join(", ") : "nicht angegeben")}
    </table>

    ${message ? `
    <p style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:${PINK};">Nachricht</p>
    <div style="background-color:${BEIGE}; padding:16px; border-left:3px solid ${GOLD}; border-radius:0 3px 3px 0; font-size:14px; line-height:1.7; color:#333;">
      ${message}
    </div>` : ""}
  `;

  const customerContent = `
    <p style="margin:0 0 20px; font-size:16px; color:#2a2a2a;">Liebe/r ${name},</p>
    <p style="margin:0 0 24px; font-size:15px; line-height:1.7; color:#444;">
      vielen Dank für Ihre Catering-Anfrage. Wir haben Ihre Nachricht erhalten und melden uns in Kürze persönlich bei Ihnen.
    </p>

    <div style="background-color:${BEIGE}; border-radius:4px; padding:20px 24px; margin-bottom:28px;">
      <p style="margin:0 0 14px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:${PINK};">Ihre Angaben im Überblick</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row("Datum & Uhrzeit", formattedDate)}
        ${row("Ort", location)}
        ${row("Personen", guests)}
        ${row("Budget p.P.", budget || "nicht angegeben")}
        ${row("Catering-Art", cateringType ? cateringType.join(", ") : "nicht angegeben")}
      </table>
    </div>

    <p style="margin:0 0 8px; font-size:14px; line-height:1.7; color:#444;">
      Bei Fragen erreichen Sie uns jederzeit unter
      <a href="mailto:info@haus-hamburg-leer.de" style="color:${NAVY};">info@haus-hamburg-leer.de</a>.
    </p>
    <p style="margin:24px 0 0; font-size:14px; color:#444;">
      Mit freundlichen Grüßen,<br>
      <span style="color:${NAVY}; font-size:16px;">Ihr Haus Hamburg Team</span>
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
