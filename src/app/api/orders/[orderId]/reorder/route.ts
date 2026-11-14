import { NextResponse } from "next/server";
import { AuthzError, requireUser } from "@/lib/authz";
import { addToCart } from "@/lib/cart-owner";
import { prisma } from "@/lib/prisma";

export async function POST(_req: Request, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const user = await requireUser();
    const { orderId } = await params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });
    if (!order || order.userId !== user.id) {
      return NextResponse.json({ ok: false, message: "Order not found." }, { status: 404 });
    }

    // Products that were deleted or are out of stock since then are skipped.
    let added = 0;
    for (const item of order.items) {
      if (item.product?.inStock) {
        await addToCart({ kind: "user", user, where: { userId: user.id } }, item.product.id, item.quantity);
        added += 1;
      }
    }

    return NextResponse.json({ ok: true, added, skipped: order.items.length - added });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ ok: false, message: "Could not add these items." }, { status: 500 });
  }
}
