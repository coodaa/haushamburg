const admin = require("firebase-admin");
const dotenv = require("dotenv");

// .env laden
dotenv.config();

// Firebase Admin SDK mit Service Account Key initialisieren
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://haus-hamburg-leer-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
