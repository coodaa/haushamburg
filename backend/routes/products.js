const express = require("express");
const { db } = require("./firebaseAdmin"); // Firestore Verbindung importieren

const router = express.Router();

// 🔹 Alle Produkte abrufen
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(products);
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Produkte:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Produkte" });
  }
});

// 🔹 Produkt hinzufügen (Admin-Funktion)
router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const docRef = await db.collection("products").add(newProduct);
    res.json({ id: docRef.id, ...newProduct });
  } catch (error) {
    console.error("❌ Fehler beim Hinzufügen des Produkts:", error);
    res.status(500).json({ error: "Fehler beim Speichern" });
  }
});

module.exports = router;
