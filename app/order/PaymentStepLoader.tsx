"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import PaymentStep from "./PaymentStep";
import type { OrderData } from "@/lib/validation";

export default function PaymentStepLoader({
  order,
  stripePromise,
  onBack,
  onSuccess,
}: {
  order: OrderData;
  stripePromise: Promise<Stripe | null>;
  onBack: () => void;
  onSuccess: (orderId: string) => void;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setClientSecret(data.clientSecret);
      })
      .catch(() => setError("Could not connect to the payment server."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div>
        <p className="text-sm text-red-600 mb-4">{error}</p>
        <button onClick={onBack} className="btn-secondary w-full">
          Back
        </button>
      </div>
    );
  }

  if (!clientSecret) {
    return <p className="text-sm text-gray-500">Preparing secure payment...</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentStep order={order} onBack={onBack} onSuccess={onSuccess} />
    </Elements>
  );
}
