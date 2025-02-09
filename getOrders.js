const { db } = require("./firebaseAdmin");

async function getOrders() {
  try {
    const snapshot = await db.collection("orders").get();
    console.log("Anzahl der Bestellungen:", snapshot.size);
    snapshot.forEach(doc => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Bestellungen:", error);
  }
}

getOrders();
