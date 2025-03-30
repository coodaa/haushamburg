const paypal = require("@paypal/checkout-server-sdk");

// Erstelle die Live-Umgebung (für Sandbox ersetze LiveEnvironment durch SandboxEnvironment)
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  return new paypal.core.LiveEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = async (req, res) => {
  try {
    const { items, total, address } = req.body;

    if (
      !address ||
      !address.street ||
      !address.street.trim() ||
      !address.city ||
      !address.city.trim() ||
      !address.postalCode ||
      !address.postalCode.trim() ||
      !address.country ||
      !address.country.trim()
    ) {
      return res
        .status(400)
        .json({
          error:
            "Bitte füllen Sie alle erforderlichen Felder aus, bevor Sie fortfahren.",
        });
    }

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
    if (error.details && Array.isArray(error.details)) {
      const postalCodeError = error.details.find(
        (detail) => detail.issue === "POSTAL_CODE_REQUIRED"
      );
      if (postalCodeError) {
        return res
          .status(400)
          .json({ error: "Bitte geben Sie eine gültige Postleitzahl ein." });
      }
    }
    res.status(500).json({ error: error.message });
  }
};
