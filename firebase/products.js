import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

// 🔹 Produkte abrufen
export async function fetchProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Produkte:", error);
    return [];
  }
}

// 🔹 Neues Produkt speichern
export async function addProduct(product) {
  try {
    await addDoc(collection(db, "products"), product);
    console.log("✅ Produkt gespeichert:", product);
    return true;
  } catch (error) {
    console.error("❌ Fehler beim Speichern:", error);
    return false;
  }
}
