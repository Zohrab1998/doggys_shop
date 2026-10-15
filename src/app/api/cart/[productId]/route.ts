import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthzError, requireUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  quantity: z.coerce.number().int().min(1).max(50),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const user = await requireUser();
    const { productId } = await params;
    const parsed = updateSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Invalid quantity." }, { status: 400 });
    }

    await prisma.cartItem.update({
      where: { userId_productId: { userId: user.id, productId } },
      data: { quantity: parsed.data.quantity },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ ok: false, message: "Failed to update cart item." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const user = await requireUser();
    const { productId } = await params;

    await prisma.cartItem.deleteMany({ where: { userId: user.id, productId } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ ok: false, message: "Failed to remove cart item." }, { status: 500 });
  }
}
