import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/**
 * Marks an order paid from a completed Stripe Checkout session. Shared by the webhook handler
 * (source of truth) and the order-detail page's fallback sync (for local dev without `stripe
 * listen`, or just a slow webhook).
 */
export async function markOrderPaidFromSession(orderId: string, stripePaymentIntentId?: string | null) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order || order.status !== "PENDING_PAYMENT") return;

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { orderId },
      data: { status: "SUCCEEDED", stripePaymentIntentId: stripePaymentIntentId ?? undefined },
    });
    await tx.order.update({
      where: { id: orderId },
      data: { status: "PAID", paidAt: new Date() },
    });
    await tx.cartItem.deleteMany({ where: { userId: order.userId } });
  });
}

/** Fallback for when the webhook hasn't landed yet — checks Stripe directly on page view. */
export async function syncOrderFromCheckoutSession(orderId: string, checkoutSessionId: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);

  if (session.metadata?.orderId !== orderId || session.payment_status !== "paid") {
    return;
  }

  const piRef = session.payment_intent;
  const stripePaymentIntentId = typeof piRef === "string" ? piRef : piRef?.id;
  await markOrderPaidFromSession(orderId, stripePaymentIntentId);
}
