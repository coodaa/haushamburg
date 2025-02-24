const express = require("express");
const { db } = require("../routes/firebaseadmin");

const router = express.Router();

// 🔹 Alle Bestellungen abrufen
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("orders").orderBy("createdAt", "desc").get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(orders);
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Bestellungen:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Bestellungen" });
  }
});

module.exports = router;
