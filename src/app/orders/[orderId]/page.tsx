import Link from "next/link";
import { notFound } from "next/navigation";
import ReorderButton from "@/components/reorder-button";
import { formatPrice } from "@/lib/catalog";
import { getSessionUser } from "@/lib/authz";
import { isStripeConfigured } from "@/lib/stripe";
import { syncOrderFromCheckoutSession } from "@/lib/orders";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Order — Doggy's Shop" };

const STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Awaiting payment",
  PAID: "Paid",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ session_id?: string; token?: string }>;
}) {
  const user = await getSessionUser();

  const { orderId } = await params;
  const { session_id: sessionId, token } = await searchParams;

  if (sessionId && isStripeConfigured()) {
    try {
      await syncOrderFromCheckoutSession(orderId, sessionId);
    } catch {
      // best-effort fallback; the webhook is the source of truth
    }
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, payment: true },
  });

  // The owner of the order can open it, and so can anyone holding its secret link — that is how
  // guests (no account) get back to their order.
  const isOwner = Boolean(user && order?.userId === user.id);
  const hasToken = Boolean(token && order?.accessToken && token === order.accessToken);
  if (!order || !(isOwner || hasToken)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="text-3xl font-bold text-brand-navy">Order #{order.id.slice(0, 8)}</h1>
      <span className="mt-2 inline-block rounded-full bg-brand-sky-light px-3 py-1 text-xs font-bold text-brand-navy uppercase">
        {STATUS_LABEL[order.status] ?? order.status}
      </span>

      <div className="mt-6 space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
            <div>
              <p className="font-bold text-brand-navy">{item.productName}</p>
              <p className="text-sm text-brand-navy/60">
                {item.quantity} × {formatPrice(item.priceAmd)}
              </p>
            </div>
            <p className="font-bold text-brand-navy">{formatPrice(item.priceAmd * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm text-brand-navy/70">
          <span>Delivery</span>
          <span>{order.deliveryFeeAmd > 0 ? formatPrice(order.deliveryFeeAmd) : "Free"}</span>
        </div>
        <div className="mt-1 flex items-center justify-between font-bold text-brand-navy">
          <span>Total</span>
          <span>{formatPrice(order.totalAmd)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white p-4 text-sm text-brand-navy/70 shadow-sm">
        <p className="font-bold text-brand-navy">Delivery</p>
        <p className="mt-1">{order.deliveryAddress}</p>
        <p>{order.phone}</p>
      </div>

      {isOwner ? (
        <div className="mt-6">
          <ReorderButton orderId={order.id} />
        </div>
      ) : (
        <p className="mt-6 text-sm text-brand-navy/70">
          Keep this page&apos;s link to check your order later.{" "}
          <Link href="/signup" className="font-bold text-brand-orange hover:underline">
            Create an account
          </Link>{" "}
          to see all your orders in one place.
        </p>
      )}

      {order.status === "PENDING_PAYMENT" ? (
        <p className="mt-4 text-sm text-brand-navy/60">
          Payment hasn&apos;t completed yet — if you just paid, refresh in a few seconds.
        </p>
      ) : null}
    </div>
  );
}
