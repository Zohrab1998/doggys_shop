"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: string }) {
  const { status } = useSession();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);

  async function onClick(event: React.MouseEvent) {
    // ProductCard is sometimes nested inside a <Link> (Featured Categories) — don't let the
    // click bubble up and navigate away before the add-to-cart request fires.
    event.preventDefault();
    event.stopPropagation();

    if (status !== "authenticated") {
      router.push(`/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) {
        setAdded(true);
        window.dispatchEvent(new Event("cart:changed"));
        setTimeout(() => setAdded(false), 1500);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="mt-2 rounded-full bg-brand-orange py-2 text-xs font-bold tracking-wide text-white uppercase transition hover:bg-brand-orange-hover disabled:opacity-60"
    >
      {added ? "Added ✓" : busy ? "Adding…" : "Add to cart"}
    </button>
  );
}
