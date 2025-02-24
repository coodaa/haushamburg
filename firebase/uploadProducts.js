const { dbAdmin } = require("./firebaseAdmin");

// 📦 ALLE PRODUKTE VON LIEFERANDO
const products = [
  // 🥩 Gerichte mit Fleisch
  {
    name: "Rahmschnitzel",
    description: "Schnitzel mit Rahmsoße",
    price: 17.5,
    category: "Gerichte mit Fleisch",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Grünkohl mit 2 Kohlwürsten und Bratkartoffeln",
    description: "Traditionelles norddeutsches Gericht",
    price: 19.8,
    category: "Gerichte mit Fleisch",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Tomahawk vom Ammerländer Edelschwein",
    description: "Mit rustikalen Pommes frites und Salat",
    price: 24.5,
    category: "Gerichte mit Fleisch",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Schweineschnitzel - Wiener Art -",
    description: "Mit Ras Fritten und Salat",
    price: 17.5,
    category: "Gerichte mit Fleisch",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },

  // 🐟 Fischplatten
  {
    name: "Fischplatte",
    description:
      "Fischfilet-Auswahl & Greetsieler Krabben mit Bratkartoffeln und Salat",
    price: 25.5,
    category: "Fischplatten",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },

  // 🐠 Gerichte mit Fisch & kleine Salate
  {
    name: "Nordsee Scholle (filetiert)",
    description: "Mit Bratkartoffeln und Salat",
    price: 22.5,
    category: "Gerichte mit Fisch & kleine Salate",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Nordsee Scholle mit Krabben (filetiert)",
    description: "Mit Bratkartoffeln und Salat",
    price: 26.5,
    category: "Gerichte mit Fisch & kleine Salate",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Matjesfilets (3 Stück)",
    description: "Mit Zwiebeln, Bratkartoffeln und Salat",
    price: 16.8,
    category: "Gerichte mit Fisch & kleine Salate",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },

  // 🥖 Fischbrötchen & Fritten & Kibbelinge & Backfisch
  {
    name: "Kibbelinge",
    description: "6 Kibbelinge im hauseigenen Bierteig ausgebacken",
    price: 6.0,
    category: "Fischbrötchen & Fritten & Kibbelinge & Backfisch",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Fischbrötchen mit Backfisch",
    description: "Frisches Fischbrötchen mit Backfisch",
    price: 5.0,
    category: "Fischbrötchen & Fritten & Kibbelinge & Backfisch",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },

  // 🍟 Beilagen & Saucen
  {
    name: "Ras Fritten",
    description: "Fritten aus Kartoffelbrei",
    price: 3.0,
    category: "Beilagen",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Portion Mayonnaise",
    description: "Eine Portion Mayonnaise",
    price: 0.5,
    category: "Saucen",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Portion Remoulade",
    description: "Eine Portion Remoulade",
    price: 0.5,
    category: "Saucen",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Portion Ketchup",
    description: "Eine Portion Ketchup",
    price: 0.5,
    category: "Saucen",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Portion Knoblauchsauce",
    description: "Eine Portion Knoblauchsauce",
    price: 0.5,
    category: "Saucen",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },

  // 🍰 Desserts & süße Pfannkuchen
  {
    name: "Pfannkuchen mit Apfelmus",
    description: "Hausgemachter Pfannkuchen mit Apfelmus",
    price: 4.5,
    category: "Desserts",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "warmer Schokoladenkuchen",
    description: "Genießen Sie einen warmen Schokoladenkuchen",
    price: 4.5,
    category: "Desserts",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "warmer Apfelstrudel mit Vanillesauce",
    description: "Warmer Apfelstrudel mit Apfelstücken und Rosinen",
    price: 6.0,
    category: "Desserts",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },

  // 🥤 Getränke
  {
    name: "Coca-Cola zero sugar 0,5l",
    description: "Keine Kalorien. Null Zucker.",
    price: 2.75,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Fanta 0.5l",
    description: "Erfrischende Orangenlimonade",
    price: 3.0,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Apfelschorle Vilsa 0,5l",
    description: "Erfrischende Apfelschorle",
    price: 2.85,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Jever Pils 0,33l",
    description: "Gekühltes Jever Pils",
    price: 2.82,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
  {
    name: "Haus Hamburg Hauswein 0.75l",
    description: "Unser eigener Wein - trocken",
    price: 14.99,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/haushamburg_logo.png",
  },
];

// 🔥 Produkte in Firestore hochladen
async function uploadProducts() {
  try {
    const collectionRef = dbAdmin.collection("products");
    for (const product of products) {
      await collectionRef.add(product);
    }
    console.log("✅ Alle Produkte erfolgreich in Firestore hochgeladen!");
  } catch (error) {
    console.error("❌ Fehler beim Hochladen der Produkte:", error);
  }
}

// 📤 Skript ausführen
uploadProducts();
