// api/create-paypal-order.js
import paypal from "@paypal/checkout-server-sdk"; // oder: import * as paypal from "@paypal/checkout-server-sdk";

// Falls du Node 18 oder höher verwendest, ist fetch global verfügbar.
// Für ältere Node-Versionen kannst du z. B. node-fetch importieren:
// import fetch from "node-fetch";

// Erstelle die Live-Umgebung (für Sandbox ersetze LiveEnvironment durch SandboxEnvironment)
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  return new paypal.core.LiveEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

/**
 * Berechnet die Entfernung in Kilometern zwischen zwei Punkten (Haversine-Formel)
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Erdradius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Geocodiert eine Adresse in Koordinaten mithilfe der Nominatim API (OpenStreetMap)
 */
async function geocodeAddress(address) {
  // Bereinige die Straßenangabe: ersetze en-/em-Dashes durch einen normalen Bindestrich,
  // trimme Leerzeichen und ersetze mehrere Leerzeichen durch ein einzelnes.
  let cleanedStreet = address.street
    .replace(/[–—]/g, "-")
    .trim()
    .replace(/\s+/g, " ");
  // Verwende den ausgeschriebenen Ländernamen
  const queryCountry = "Deutschland";
  const query = encodeURIComponent(
    `${cleanedStreet}, ${address.postalCode} ${address.city}, ${queryCountry}`
  );
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${query}`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "DeineAppName" },
    });
    // Lese zuerst als Text, um den exakten Inhalt zu loggen
    const responseText = await response.text();
    console.log("Geocode Response Text:", responseText);
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (err) {
      console.error("Fehler beim Parsen der Geocode-Antwort:", responseText);
      throw new Error("Adresse konnte nicht geocodet werden.");
    }
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
    throw new Error("Adresse konnte nicht gefunden werden.");
  } catch (error) {
    console.error("Geocode-Error:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  try {
    const { items, total, address } = req.body;

    // Basis-Validierung: Prüfe, ob alle erforderlichen Felder vorhanden und nicht leer sind
    if (
      !address ||
      !address.street?.trim() ||
      !address.city?.trim() ||
      !address.postalCode?.trim() ||
      !address.country?.trim()
    ) {
      console.error("Validierungsfehler: Fehlende Adressdaten");
      return res.status(400).json({
        error:
          "Bitte füllen Sie alle erforderlichen Felder aus, bevor Sie fortfahren.",
      });
    }

    // Erzwinge, dass nur deutsche Adressen genutzt werden
    address.country = "DE";

    // Geocode die Adresse des Nutzers
    const userCoordinates = await geocodeAddress(address);
    console.log("User-Koordinaten:", userCoordinates);

    // Referenzkoordinaten für das Historische Rathaus Leer:
    const hausHamburg = { lat: 53.22666931152344, lon: 7.4508161544799805 };
    console.log("Ziel-Koordinaten (Historisches Rathaus Leer):", hausHamburg);

    // Berechne die Entfernung in Kilometern
    const distance = haversineDistance(
      userCoordinates.lat,
      userCoordinates.lon,
      hausHamburg.lat,
      hausHamburg.lon
    );
    console.log("Berechnete Entfernung:", distance, "km");

    // Überprüfe, ob die Adresse innerhalb eines 5km-Radius liegt
    if (distance > 5) {
      console.error(
        "Lieferadresse außerhalb des erlaubten Radius:",
        distance,
        "km"
      );
      return res
        .status(400)
        .json({ error: "Lieferung ist nur im Umkreis von 5 km möglich." });
    }

    // Erstelle den PayPal-Order, wenn die Adresse innerhalb des Lieferradius liegt
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: total.toFixed(2),
          },
          shipping: {
            address: {
              address_line_1: address.street,
              admin_area_2: address.city,
              postal_code: address.postalCode,
              country_code: address.country,
            },
          },
        },
      ],
    });

    const clientInstance = client();
    console.log("Sende Order-Anfrage an PayPal:", request);
    const order = await clientInstance.execute(request);
    console.log("PayPal Order Response:", order);
    res.status(200).json({ id: order.result.id });
  } catch (error) {
    console.error("PayPal Order Creation Error:", error);
    res.status(500).json({ error: error.message });
  }
}
