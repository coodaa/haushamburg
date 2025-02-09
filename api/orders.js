const express = require("express");
const router = express.Router();
const { db } = require("./firebaseAdmin"); // Beispiel: Firebase Admin SDK

// POST-Route zum Erstellen einer Bestellung
router.post("/", async (req, res) => {
  try {
    const orderData = req.body;
    const newOrderRef = await db.collection("orders").add(orderData);
    res.json({ success: true, orderId: newOrderRef.id });
  } catch (error) {
    console.error("Fehler beim Speichern der Bestellung:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
