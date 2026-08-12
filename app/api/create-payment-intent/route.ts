import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { orderSchema } from "@/lib/validation";

// Fixed device price for this demo — in a real store this would come from a database.
const DEVICE_PRICE_AED = 600;

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Re-validate on the server — never trust data that already passed client-side
  // validation, since a request could reach this endpoint directly.
  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order details", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: DEVICE_PRICE_AED * 100, // Stripe expects the smallest currency unit (fils)
      currency: "aed",
      automatic_payment_methods: { enabled: true },
      metadata: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        emirate: parsed.data.emirate,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error creating PaymentIntent:", err);
    return NextResponse.json(
      { error: "Could not start payment. Please try again." },
      { status: 500 }
    );
  }
}
