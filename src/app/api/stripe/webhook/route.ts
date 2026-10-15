import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { markOrderPaidFromSession } from "@/lib/orders";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  if (!orderId) return;

  const piRef = session.payment_intent;
  const stripePaymentIntentId = typeof piRef === "string" ? piRef : piRef?.id;

  await markOrderPaidFromSession(orderId, stripePaymentIntentId);
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ ok: false, message: "STRIPE_WEBHOOK_SECRET is not configured." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ ok: false, message: "Missing Stripe-Signature header." }, { status: 400 });
  }

  const rawBody = await req.text();

  let stripe;
  try {
    stripe = getStripe();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Stripe is not configured.";
    return NextResponse.json({ ok: false, message }, { status: 503 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid webhook payload.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object);
    }
  } catch (e) {
    console.error("[stripe webhook]", event.type, e);
    return NextResponse.json({ ok: false, message: "Webhook handler error." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, received: true, type: event.type });
}
