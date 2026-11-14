import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthzError, requireUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await requireUser();
    const items = await prisma.cartItem.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      include: { product: true },
    });
    return NextResponse.json({ ok: true, items });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ ok: false, message: "Failed to load cart." }, { status: 500 });
  }
}

const addSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().positive().max(50).default(1),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser();
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

    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId: user.id, productId: product.id } },
    });

    const item = existing
      ? await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + parsed.data.quantity },
        })
      : await prisma.cartItem.create({
          data: { userId: user.id, productId: product.id, quantity: parsed.data.quantity },
        });

    const count = await prisma.cartItem.aggregate({
      where: { userId: user.id },
      _sum: { quantity: true },
    });

    return NextResponse.json({ ok: true, item, cartCount: count._sum.quantity ?? 0 }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ ok: false, message: "Failed to add to cart." }, { status: 500 });
  }
}
