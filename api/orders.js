const { db } = require("../firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef.get();

    const orders = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Fehler beim Abrufen der Bestellungen:", error);
    res.status(500).json({ success: false, message: "Interner Fehler" });
  }
};
