import { NextResponse } from "next/server";
import { AuthzError, requireAdminUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export async function POST(_req: Request, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    await requireAdminUser();
    const { orderId } = await params;

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return NextResponse.json({ ok: false, message: "Order not found." }, { status: 404 });
    }
    if (order.status !== "SHIPPED") {
      return NextResponse.json({ ok: false, message: "Order must be shipped before it can be delivered." }, { status: 409 });
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "DELIVERED", deliveredAt: new Date() },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ ok: false, message: "Failed to mark delivered." }, { status: 500 });
  }
}
