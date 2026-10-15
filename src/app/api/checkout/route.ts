import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthzError, requireUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { appBaseUrl, getStripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  deliveryAddress: z.string().trim().min(1).max(500),
  phone: z.string().trim().min(1).max(50),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const parsed = checkoutSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Please provide a delivery address and phone." }, { status: 400 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ ok: false, message: "Your cart is empty." }, { status: 400 });
    }

    const totalAmd = cartItems.reduce((sum, item) => sum + item.product.priceAmd * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmd,
        deliveryAddress: parsed.data.deliveryAddress,
        phone: parsed.data.phone,
        items: {
          create: cartItems.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            priceAmd: item.product.priceAmd,
            quantity: item.quantity,
          })),
        },
      },
    });

    const stripe = getStripe();
    const base = appBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email ?? undefined,
      line_items: cartItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "amd",
          unit_amount: item.product.priceAmd,
          product_data: { name: item.product.name },
        },
      })),
      metadata: { orderId: order.id },
      success_url: `${base}/orders/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cart`,
    });

    if (!session.url) {
      return NextResponse.json({ ok: false, message: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    await prisma.payment.create({
      data: {
        orderId: order.id,
        amountAmd: totalAmd,
        stripeCheckoutSessionId: session.id,
      },
    });

    return NextResponse.json({ ok: true, checkoutUrl: session.url });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : "Failed to start checkout.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
