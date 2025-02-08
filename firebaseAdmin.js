const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Lade `.env` Variablen
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Firebase Admin SDK initialisieren
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://haus-hamburg-leer-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
