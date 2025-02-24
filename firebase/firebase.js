// 🔥 Firebase SDKs importieren
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// 🔥 Deine Firebase-Konfiguration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// 🔥 Firebase initialisieren
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* 🛒 🔹 PRODUKTE AUS FIRESTORE LADEN */
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Produkte:", error);
    return [];
  }
};

/* ✅ 🔹 NEUE BESTELLUNG SPEICHERN */
export const placeOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), orderData);
    console.log("✅ Bestellung gespeichert mit ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Fehler beim Speichern der Bestellung:", error);
    return null;
  }
};

/* 🔐 🔹 NUTZER LOGIN */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("✅ Eingeloggt als:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("❌ Login-Fehler:", error.message);
    return null;
  }
};

/* 🔓 🔹 NUTZER ABMELDEN */
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("✅ Nutzer abgemeldet");
  } catch (error) {
    console.error("❌ Fehler beim Abmelden:", error.message);
  }
};

/* 👤 🔹 AKTUELLEN NUTZER ÜBERWACHEN */
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// 🔥 Exportiere alles für andere Dateien
export { app, db, auth, collection, getDocs };
