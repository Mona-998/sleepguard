import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { orderSchema } from "@/lib/validation";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getMailer } from "@/lib/mailer";

const DEVICE_PRICE_AED = 600;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { paymentIntentId, ...orderFields } = body;

  const parsed = orderSchema.safeParse(orderFields);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order details" }, { status: 400 });
  }

  // If the person placing this order is signed in, link the order to their
  // account so it shows up in their order history. Guest checkout (no
  // session) still works fine — userId just stays null in that case.
  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as any).id : undefined;

  // Confirm the payment actually succeeded on Stripe's side before treating
  // the order as paid — never trust a "success" flag sent from the browser alone.
  try {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.status !== "succeeded") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }
  } catch (err) {
    console.error("Could not verify payment intent:", err);
    return NextResponse.json({ error: "Could not verify payment" }, { status: 500 });
  }

  // ---- Save the order to the database ----
  let order;
  try {
    order = await prisma.order.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        emirate: parsed.data.emirate,
        address: parsed.data.address,
        paymentIntentId,
        amountAed: DEVICE_PRICE_AED,
        userId,
      },
    });
  } catch (err) {
    console.error("Failed to save order to database:", err);
    return NextResponse.json(
      { error: "Payment succeeded but saving your order failed. Please contact support." },
      { status: 500 }
    );
  }

  // ---- Confirmation email, sent via your own Gmail account (no third-party API) ----
  try {
    const mailer = getMailer();
    if (mailer) {
      await mailer.sendMail({
        from: `Sleep Guard <${process.env.GMAIL_USER}>`,
        to: order.email,
        subject: "Your Sleep Guard order is confirmed",
        html: `<p>Hi ${order.fullName},</p>
               <p>Your Sleep Guard order <strong>${order.id}</strong> is confirmed and will be delivered to
               ${order.address}, ${order.emirate}.</p>
               <p>Thanks for choosing Sleep Guard.</p>`,
      });
    } else {
      console.log(`(Gmail not configured — would have emailed ${order.email} order ${order.id})`);
    }
  } catch (err) {
    // We don't fail the order just because the email didn't send — log and move on.
    console.error("Failed to send confirmation email:", err);
  }

  return NextResponse.json({ order });
}
