import Link from "next/link";
import { redirect } from "next/navigation";
import ReorderButton from "@/components/reorder-button";
import { formatPrice } from "@/lib/catalog";
import { getSessionUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Your Orders — Doggy's Shop" };

const STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Awaiting payment",
  PAID: "Paid",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default async function OrdersPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/signin?callbackUrl=/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-3xl font-bold text-brand-navy">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-brand-navy/60">
          No orders yet.{" "}
          <Link href="/shop" className="font-bold text-brand-orange hover:underline">
            Start shopping →
          </Link>
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
              <Link href={`/orders/${order.id}`} className="block">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-brand-navy">Order #{order.id.slice(0, 8)}</p>
                  <span className="rounded-full bg-brand-sky-light px-3 py-1 text-xs font-bold text-brand-navy uppercase">
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-brand-navy/60">
                  {order.items.map((item) => `${item.quantity} × ${item.productName}`).join(", ")}
                </p>
                <p className="mt-1 text-sm text-brand-navy/60">{order.createdAt.toLocaleDateString("en-GB")}</p>
              </Link>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="font-bold text-brand-navy">{formatPrice(order.totalAmd)}</p>
                <ReorderButton orderId={order.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
