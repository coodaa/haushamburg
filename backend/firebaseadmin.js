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
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
} catch (error) {
  console.error("❌ Fehler beim Parsen von FIREBASE_SERVICE_ACCOUNT_KEY", error);
  process.exit(1);
}

// Initialisiere Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://haus-hamburg.europe-west1.firebasedatabase.app" // Deine Firebase DB-URL
});

// Firestore-Client erhalten
const db = admin.firestore();

module.exports = { admin, db };
