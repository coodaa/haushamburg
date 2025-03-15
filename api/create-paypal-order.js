// api/create-paypal-order.js
const paypal = require("@paypal/checkout-server-sdk");

// Erstelle eine Sandbox-Umgebung
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = async (req, res) => {
  try {
    const { items, total, address } = req.body;
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
    const order = await clientInstance.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (error) {
    console.error("PayPal Order Creation Error:", error);
    res.status(500).json({ error: error.message });
  }
};
