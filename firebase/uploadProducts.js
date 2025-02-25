// 📂 firebase/uploadProducts.js
const { dbAdmin } = require("./firebaseAdmin");

// 📦 ALLE PRODUKTE MIT EINHEITLICHEN KATEGORIEN + ZUSATZSTOFFE
const products = [
  // 🥩 FLEISCH
  {
    name: "Rahmschnitzel",
    description: "Schnitzel mit Rahmsoße",
    price: 17.5,
    category: "Fleisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1", "7"],
  },
  {
    name: "Grünkohl mit 2 Kohlwürsten und Bratkartoffeln",
    description: "Traditionelles norddeutsches Gericht",
    price: 19.8,
    category: "Fleisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["2"],
  },
  {
    name: "Tomahawk vom Ammerländer Edelschwein",
    description: "Mit rustikalen Pommes frites und Salat",
    price: 24.5,
    category: "Fleisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "Schweineschnitzel - Wiener Art -",
    description: "Mit Ras Fritten und Salat",
    price: 17.5,
    category: "Fleisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["3"],
  },
  {
    name: "Snirtjebraten",
    description: "Ostfriesischer Snirtjebraten mit Bratkartoffeln",
    price: 21.3,
    category: "Fleisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "Schaschlikpfanne",
    description: "Schaschlikpfanne mit einem Brötchen",
    price: 15.0,
    category: "Fleisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1"],
  },
  {
    name: "kleiner gemischter Salat mit Hähnchenbruststreifen",
    description:
      "Gemischter Salat mit Hähnchenbruststreifen (Honig-Senf-Dressing)",
    price: 6.5,
    category: "Fleisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },

  // 🐟 FISCH
  {
    name: "Fischplatte",
    description:
      "Fischfilet-Auswahl & Greetsieler Krabben mit Bratkartoffeln und Salat",
    price: 25.5,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["2", "4"],
  },
  {
    name: "Nordsee Scholle (filetiert)",
    description: "Mit Bratkartoffeln und Salat",
    price: 22.5,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "Nordsee Scholle (filetiert) / Ras Fritten",
    description: "Mit Ras Fritten und Salat",
    price: 23.5,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1"],
  },
  {
    name: "Nordsee Scholle mit Krabben (filetiert)",
    description: "Mit Bratkartoffeln und Salat",
    price: 26.5,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1"],
  },
  {
    name: "Matjesfilets (3 Stück)",
    description: "Mit Zwiebeln, Bratkartoffeln und Salat",
    price: 16.8,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1", "2"],
  },
  {
    name: "Kibbelinge",
    description: "6 Kibbelinge im hauseigenen Bierteig ausgebacken",
    price: 6.0,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1", "3"],
  },
  {
    name: "Fischbrötchen mit Backfisch",
    description: "Frisches Fischbrötchen mit Backfisch",
    price: 5.0,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1", "5"],
  },
  {
    name: "Scholle mit Ofenkartoffel",
    description: "Nordseeschollenfilet, dazu Ofenkartoffel und Salat",
    price: 23.5,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "Ofenkartoffel mit Greetsieler Krabben",
    description: "Ofenkartoffel mit Kartoffelcreme und Krabben",
    price: 19.5,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["2"],
  },
  {
    name: "Vorspeise Haus Hamburg deluxe",
    description:
      "Matjesfilet, Aalrauchmatjes, Bismarckhering, Brathering, Kutterkrabben, Räucherlachs",
    price: 14.8,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1", "2"],
  },
  {
    name: "Ofenkartoffel mit Räucherlachs",
    description: "Ofenkartoffel mit Kartoffelcreme, Räucherlachs, Salat",
    price: 15.5,
    category: "Fisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["2"],
  },

  // 🥦 VEGETARISCH
  {
    name: "Ras Fritten",
    description: "Fritten aus Kartoffelbrei",
    price: 3.0,
    category: "Vegetarisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1", "2", "3"],
  },
  {
    name: "Ofenkartoffel natur mit Kartoffelcreme",
    description: "Ofenkartoffel mit Kartoffelcreme + Salat",
    price: 9.5,
    category: "Vegetarisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "Portion Mayonnaise",
    description: "Eine Portion Mayonnaise",
    price: 0.5,
    category: "Vegetarisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["2"],
  },
  {
    name: "Portion Remoulade",
    description: "Eine Portion Remoulade",
    price: 0.5,
    category: "Vegetarisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "Portion Ketchup",
    description: "Eine Portion Ketchup",
    price: 0.5,
    category: "Vegetarisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["3"],
  },
  {
    name: "Portion Knoblauchsauce",
    description: "Eine Portion Knoblauchsauce",
    price: 0.5,
    category: "Vegetarisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1"],
  },
  {
    name: "kleiner gemischter Beilagensalat",
    description:
      "Grüne Blattsalate, Radieschen, Rote Bete, Honig-Senf-Dressing",
    price: 3.5,
    category: "Vegetarisch",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },

  // 🍰 DESSERTS
  {
    name: "Pfannkuchen mit Apfelmus",
    description: "Hausgemachter Pfannkuchen mit Apfelmus, Durchmesser 28cm",
    price: 4.5,
    category: "Desserts",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1"],
  },
  {
    name: "Pfannkuchen mit Nutella",
    description: "Hausgemachte Pfannkuchen mit Nutella, Durchmesser 28cm",
    price: 4.5,
    category: "Desserts",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1"],
  },
  {
    name: "warmer Schokoladenkuchen",
    description: "Genießen Sie einen warmen Schokoladenkuchen",
    price: 4.5,
    category: "Desserts",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["3"],
  },
  {
    name: "Portion Vanillesosse",
    description:
      "Hausgemachte Vanillesauce, ideal zu Apfelstrudel oder Schokokuchen",
    price: 1.5,
    category: "Desserts",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "rote Grütze",
    description: "Hausgemachte rote Grütze",
    price: 4.5,
    category: "Desserts",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "warmer Apfelstrudel mit Vanillesosse",
    description: "Warmer Apfelstrudel mit Apfelstücken, Rosinen + Vanillesauce",
    price: 6.0,
    category: "Desserts",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },

  // 🥤 GETRÄNKE
  {
    name: "Coca-Cola zero sugar 0,5l",
    description: "Keine Kalorien. Null Zucker. (0,5l)",
    price: 2.75,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["2"],
  },
  {
    name: "Fanta 0.5l",
    description: "Erfrischende Orangenlimonade (0,5l)",
    price: 3.0,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1"],
  },
  {
    name: "Apfelschorle Vilsa 0,5l",
    description: "Erfrischende Apfelschorle",
    price: 2.85,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "Jever Pils 0,33l",
    description: "Gekühltes Jever Pils (4,9% vol)",
    price: 2.82,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["2"],
  },
  {
    name: "Haus Hamburg Hauswein 0.75l",
    description: "Unser eigener Wein - trocken (12,5% vol)",
    price: 14.99,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1", "6"],
  },
  {
    name: "Traubenschorle",
    description: "Erfrischende Traubenschorle (0,33l)",
    price: 3.2,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: [],
  },
  {
    name: "Mezzo Mix 0,5l",
    description: "Erfrischend-leckerer Kuss aus Cola und Orange (0,5l)",
    price: 3.0,
    category: "Getränke",
    image: "https://www.haus-hamburg-leer.de/images/food/haus-hamburg-leer-30.webp",
    zusatzstoffe: ["1"],
  },
];

// 🔥 Produkte in Firestore hochladen (alte löschen, dann neu)
async function uploadProducts() {
  try {
    const collectionRef = dbAdmin.collection("products");

    // Alte Dokumente löschen
    const snapshot = await collectionRef.get();
    const deletePromises = [];
    snapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });
    await Promise.all(deletePromises);
    console.log("✅ Alte Dokumente erfolgreich gelöscht!");

    // Neue hinzufügen
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
