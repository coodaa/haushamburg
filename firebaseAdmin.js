const admin = require("firebase-admin");
const dotenv = require("dotenv");

// .env-Datei laden
dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  console.error("❌ Umgebungsvariable FIREBASE_SERVICE_ACCOUNT_KEY ist nicht gesetzt!");
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  // Ersetze alle Vorkommen von "\\n" durch echte Zeilenumbrüche
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
} catch (error) {
  console.error("❌ Fehler beim Parsen von FIREBASE_SERVICE_ACCOUNT_KEY", error);
  process.exit(1);
}

// Initialisiere die Firebase-App (für Cloud Firestore ist kein databaseURL notwendig)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Erhalte den Firestore-Client
const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
