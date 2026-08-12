"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { OrderData } from "@/lib/validation";

const DEVICE_PRICE_AED = 600;

export default function PaymentStep({
  order,
  onBack,
  onSuccess,
}: {
  order: OrderData;
  onBack: () => void;
  onSuccess: (orderId: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed. Please try again.");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      // Only now do we ask the backend to record the order + send the email —
      // after Stripe itself confirms the charge went through.
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...order, paymentIntentId: paymentIntent.id }),
      });
      const data = await res.json();
      if (data.order) {
        onSuccess(data.order.id);
      } else {
        setError(data.error || "Payment succeeded but the order couldn't be saved.");
      }
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-extrabold mb-1">Payment</h2>
      <p className="text-sm text-gray-500 mb-4">
        Step 3 of 3 — Sleep Guard device, AED {DEVICE_PRICE_AED}.
      </p>
      <p className="text-xs text-gray-400 mb-6">
        Test mode — use card number 4242 4242 4242 4242, any future date, any CVC.
      </p>

      <PaymentElement />

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

      <div className="flex gap-3 mt-6">
        <button type="button" onClick={onBack} className="btn-secondary w-full">
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || submitting}
          className="btn-primary w-full disabled:opacity-50"
        >
          {submitting ? "Processing..." : `Pay AED ${DEVICE_PRICE_AED}`}
        </button>
      </div>
    </form>
  );
}
