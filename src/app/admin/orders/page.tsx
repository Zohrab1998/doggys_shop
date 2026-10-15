import { redirect } from "next/navigation";
import { formatPrice } from "@/lib/catalog";
import { getSessionUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import OrderStatusActions from "./order-status-actions";

export const metadata = { title: "Admin — Orders" };

export default async function AdminOrdersPage() {
  const user = await getSessionUser();
  if (!user || !user.isAdmin) {
    redirect("/signin?callbackUrl=/admin/orders");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, user: { select: { name: true, email: true } } },
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold text-brand-navy">Admin — Orders</h1>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-bold text-brand-navy">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-brand-navy/60">
                  {order.user.name ?? order.user.email} · {order.items.length} item(s) ·{" "}
                  {formatPrice(order.totalAmd)}
                </p>
                <p className="text-sm text-brand-navy/60">
                  {order.deliveryAddress} · {order.phone}
                </p>
              </div>
              <OrderStatusActions orderId={order.id} status={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
