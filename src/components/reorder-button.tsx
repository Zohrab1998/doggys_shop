"use client";

import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** "Buy again": puts everything from a past order that is still sold back into the cart. */
export default function ReorderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onClick() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/orders/${orderId}/reorder`, { method: "POST" });
      const data = (await res.json()) as { ok: boolean; added?: number; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message ?? "Could not add these items.");
      if (!data.added) {
        setMessage("These products are no longer available.");
        return;
      }
      window.dispatchEvent(new Event("cart:changed"));
      router.push("/cart");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not add these items.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full border-2 border-brand-orange px-4 py-1.5 text-sm font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white disabled:opacity-60"
      >
        <RotateCcw className="h-4 w-4" />
        {busy ? "Adding…" : "Buy again"}
      </button>
      {message ? <span className="text-sm text-red-600">{message}</span> : null}
    </span>
  );
}
