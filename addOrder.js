const { db } = require("./firebaseAdmin");

async function addOrder(orderData) {
  try {
    // Erstelle ein neues Dokument in der Collection "orders"
    const newOrderRef = db.collection("orders").doc(); // Automatisch generierte ID
    await newOrderRef.set(orderData);
    console.log("Bestellung erfolgreich gespeichert, ID:", newOrderRef.id);
  } catch (error) {
    console.error("Fehler beim Speichern der Bestellung:", error);
  }
}

// Beispiel-Aufruf:
addOrder({
  customerName: "Max Mustermann",
  orderItems: ["Pizza", "Cola"],
  totalPrice: 19.99,
  orderDate: new Date().toISOString(),
  userId: "UID_des_Kunden" // Falls du Firebase Auth verwendest
});
