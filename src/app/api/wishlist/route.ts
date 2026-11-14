import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthzError, requireUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

/** Ids of the products on the signed-in user's wishlist. */
export async function GET() {
  try {
    const user = await requireUser();
    const items = await prisma.wishlistItem.findMany({ where: { userId: user.id }, select: { productId: true } });
    return NextResponse.json({ ok: true, productIds: items.map((item) => item.productId) });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ ok: false, message: "Failed to load wishlist." }, { status: 500 });
  }
}

const toggleSchema = z.object({ productId: z.string().min(1) });

/** Adds the product to the wishlist, or removes it if it is already there. */
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const parsed = toggleSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
    }
    const key = { userId_productId: { userId: user.id, productId: parsed.data.productId } };

    const existing = await prisma.wishlistItem.findUnique({ where: key });
    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      return NextResponse.json({ ok: true, saved: false });
    }

    const product = await prisma.product.findUnique({ where: { id: parsed.data.productId }, select: { id: true } });
    if (!product) {
      return NextResponse.json({ ok: false, message: "Product not found." }, { status: 404 });
    }
    await prisma.wishlistItem.create({ data: { userId: user.id, productId: product.id } });
    return NextResponse.json({ ok: true, saved: true });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ ok: false, message: "Failed to update wishlist." }, { status: 500 });
  }
}
