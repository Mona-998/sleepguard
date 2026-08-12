"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2, Check } from "lucide-react";
import DetailsStep from "./DetailsStep";
import LocationStep from "./LocationStep";
import PaymentStepLoader from "./PaymentStepLoader";
import type { DetailsData, LocationData } from "@/lib/validation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

type Step = "details" | "location" | "payment" | "success";

export default function OrderFlow() {
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<DetailsData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  return (
    <div className="w-full px-6 py-8">
      <ProgressBar step={step} />

      {step === "details" && (
        <DetailsStep
          initial={details}
          onNext={(data) => {
            setDetails(data);
            setStep("location");
          }}
        />
      )}

      {step === "location" && details && (
        <LocationStep
          initial={location}
          onBack={() => setStep("details")}
          onNext={(data) => {
            setLocation(data);
            setStep("payment");
          }}
        />
      )}

      {step === "payment" && details && location && (
        <PaymentStepLoader
          order={{ ...details, ...location }}
          stripePromise={stripePromise}
          onBack={() => setStep("location")}
          onSuccess={(id) => {
            setOrderId(id);
            setStep("success");
          }}
        />
      )}

      {step === "success" && details && (
        <SuccessScreen email={details.email} orderId={orderId} />
      )}
    </div>
  );
}

function ProgressBar({ step }: { step: Step }) {
  const steps: Step[] = ["details", "location", "payment", "success"];
  const labels = ["Details", "Location", "Payment", "Done"];
  const currentIndex = steps.indexOf(step);

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((s, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center w-14">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isCompleted || isCurrent
                    ? "bg-brand-yellow text-black"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span className="text-[11px] mt-1 text-gray-600 whitespace-nowrap">{labels[i]}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-8 -mt-4 ${isCompleted ? "bg-brand-yellow" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SuccessScreen({ email, orderId }: { email: string; orderId: string | null }) {
  return (
    <div className="text-center py-10">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 size={32} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-extrabold mb-2">Order confirmed!</h2>
      {orderId && <p className="text-sm text-gray-500 mb-3">Order #{orderId}</p>}
      <p className="text-gray-700 leading-relaxed max-w-sm mx-auto">
        A confirmation email has been sent to <strong>{email}</strong>. You&apos;ll receive
        another email with tracking details once your device ships.
      </p>
    </div>
  );
}
