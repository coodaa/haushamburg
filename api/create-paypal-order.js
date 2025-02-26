// create-paypal-order.js
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");

// Erstelle die Umgebung (Sandbox-Umgebung für Tests)
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
    // Hier kannst du den Betrag dynamisch aus den Warenkorbdaten berechnen.
    // Im Beispiel setzen wir einen festen Betrag von 10,00 EUR.
    const amount = "10.00"; // Betrag als String im Format "xx.xx"

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
          shipping: {
            address: {
              address_line_1: req.body.address.street || "Unbekannt",
              admin_area_2: req.body.address.city || "Unbekannt",
              postal_code: req.body.address.postalCode || "00000",
              country_code: req.body.address.country || "DE",
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
