import Stripe from "stripe";

// Server-side only — this file must never be imported from a "use client" component.
// STRIPE_SECRET_KEY lives in .env.local and is never exposed to the browser.
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn(
    "STRIPE_SECRET_KEY is not set. Add it to .env.local (use a test-mode key, sk_test_...)."
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-06-20",
});
