import { NextResponse } from "next/server";
import { z } from "zod";
import { getCartOwner } from "@/lib/cart-owner";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  quantity: z.coerce.number().int().min(1).max(50),
});

type Context = { params: Promise<{ productId: string }> };

export async function PATCH(req: Request, { params }: Context) {
  try {
    const owner = await getCartOwner();
    const { productId } = await params;
    const parsed = updateSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Invalid quantity." }, { status: 400 });
    }
    if (owner) {
      await prisma.cartItem.updateMany({
        where: { ...owner.where, productId },
        data: { quantity: parsed.data.quantity },
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Failed to update cart item." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Context) {
  try {
    const owner = await getCartOwner();
    const { productId } = await params;
    if (owner) {
      await prisma.cartItem.deleteMany({ where: { ...owner.where, productId } });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Failed to remove cart item." }, { status: 500 });
  }
}
