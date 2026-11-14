import { NextResponse } from "next/server";
import { z } from "zod";
import { addToCart, getCartOwner, mergeGuestCartIntoUser } from "@/lib/cart-owner";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const owner = await getCartOwner();
    if (!owner) {
      return NextResponse.json({ ok: true, items: [], isGuest: true });
    }
    if (owner.kind === "user") {
      await mergeGuestCartIntoUser(owner.user.id);
    }

    const items = await prisma.cartItem.findMany({
      where: owner.where,
      orderBy: { createdAt: "asc" },
      include: { product: true },
    });
    return NextResponse.json({ ok: true, items, isGuest: owner.kind === "guest" });
  } catch (error) {
    console.error("[cart] load failed", error);
    return NextResponse.json({ ok: false, message: "Failed to load cart." }, { status: 500 });
  }
}

const addSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().positive().max(50).default(1),
});

export async function POST(req: Request) {
  try {
    const parsed = addSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Invalid cart payload." }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: parsed.data.productId } });
    if (!product) {
      return NextResponse.json({ ok: false, message: "Product not found." }, { status: 404 });
    }
    if (!product.inStock) {
      return NextResponse.json({ ok: false, message: "This product is out of stock." }, { status: 409 });
    }

    const owner = await getCartOwner({ create: true });
    if (!owner) {
      return NextResponse.json({ ok: false, message: "Could not open a cart." }, { status: 500 });
    }

    const item = await addToCart(owner, product.id, parsed.data.quantity);
    const count = await prisma.cartItem.aggregate({ where: owner.where, _sum: { quantity: true } });

    return NextResponse.json({ ok: true, item, cartCount: count._sum.quantity ?? 0 }, { status: 201 });
  } catch (error) {
    console.error("[cart] add failed", error);
    return NextResponse.json({ ok: false, message: "Failed to add to cart." }, { status: 500 });
  }
}
