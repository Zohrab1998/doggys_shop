"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Awaiting payment",
  PAID: "Paid",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function OrderStatusActions({ orderId, status }: { orderId: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function act(action: "mark-shipped" | "mark-delivered") {
    setBusy(true);
    try {
      await fetch(`/api/admin/orders/${orderId}/${action}`, { method: "POST" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="rounded-full bg-brand-sky-light px-3 py-1 text-xs font-bold text-brand-navy uppercase">
        {STATUS_LABEL[status] ?? status}
      </span>
      {status === "PAID" ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => act("mark-shipped")}
          className="rounded-full bg-brand-orange px-4 py-1.5 text-xs font-bold text-white disabled:opacity-60"
        >
          Mark shipped
        </button>
      ) : null}
      {status === "SHIPPED" ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => act("mark-delivered")}
          className="rounded-full bg-brand-orange px-4 py-1.5 text-xs font-bold text-white disabled:opacity-60"
        >
          Mark delivered
        </button>
      ) : null}
    </div>
  );
}
