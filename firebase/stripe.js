import { loadStripe } from "@stripe/stripe-js";

export async function createCheckoutSession(cart) {
  try {
    const stripe = await loadStripe("DEIN_STRIPE_PUBLISHABLE_KEY");
    const response = await fetch("https://dein-backend.com/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const { id } = await response.json();
    return id;
  } catch (error) {
    console.error("❌ Stripe-Fehler:", error);
    return null;
  }
}
