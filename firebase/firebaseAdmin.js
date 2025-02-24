const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

// Firebase Admin initialisieren
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://haus-hamburg-firestore.firebaseio.com",
});

const dbAdmin = admin.firestore();

module.exports = { admin, dbAdmin };
