// create-paypal-order.js
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");

// Erstelle die Umgebung (Sandbox für Tests)
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  // Für den Live-Modus: new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

module.exports = async (req, res) => {
  try {
    // Berechne den Betrag aus den übermittelten Warenkorbdaten (hier als Beispiel: req.body.total)
    // Stelle sicher, dass du den Gesamtbetrag korrekt berechnest und als String im Format "xx.xx" übergibst.
    const amount = req.body.total ? req.body.total.toFixed(2) : "10.00";

    // Erstelle einen neuen OrdersCreateRequest
    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: amount,
          },
          // Versandadresse (optional)
          shipping: {
            address: {
              address_line_1: req.body.address?.street || "Unbekannt",
              admin_area_2: req.body.address?.city || "Unbekannt",
              postal_code: req.body.address?.postalCode || "00000",
              country_code: req.body.address?.country || "DE",
            },
          },
        },
      ],
      application_context: {
        brand_name: "Haus Hamburg",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: process.env.FRONTEND_URL + "/checkout-success",
        cancel_url: process.env.FRONTEND_URL + "/checkout-cancel",
      },
    });

    const paypalClient = client();
    const order = await paypalClient.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (error) {
    console.error("PayPal Order Error:", error);
    res.status(500).json({ error: error.message || "Unbekannter Fehler" });
  }
};
