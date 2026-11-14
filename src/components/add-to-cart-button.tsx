"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCartButton({
  productId,
  color,
  disabled = false,
  className = "",
}: {
  productId: string;
  /** Button color — defaults to the brand orange; product cards pass the animal's color. */
  color?: string;
  disabled?: boolean;
  className?: string;
}) {
  const { status } = useSession();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);

  async function onClick() {
    if (status !== "authenticated") {
      const here = window.location.pathname + window.location.search;
      router.push(`/signin?callbackUrl=${encodeURIComponent(here)}`);
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
      disabled={busy || disabled}
      style={{ background: color ?? "var(--color-brand-orange)" }}
      className={`mt-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide text-white uppercase transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {disabled ? "Out of stock" : added ? "Added ✓" : busy ? "Adding…" : "Add to cart"}
    </button>
  );
}
