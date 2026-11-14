"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type WishlistContextValue = {
  has: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
};

const WishlistContext = createContext<WishlistContextValue>({ has: () => false, toggle: async () => {} });

/** Loads the signed-in user's wishlist once and shares it with every heart button on the page. */
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const [ids, setIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    void (async () => {
      const res = await fetch("/api/wishlist");
      const data = (await res.json()) as { ok: boolean; productIds?: string[] };
      if (!cancelled && data.ok) setIds(new Set(data.productIds ?? []));
    })();
    return () => {
      cancelled = true;
    };
  }, [status]);

  const toggle = useCallback(
    async (productId: string) => {
      if (status !== "authenticated") {
        const here = window.location.pathname + window.location.search;
        router.push(`/signin?callbackUrl=${encodeURIComponent(here)}`);
        return;
      }
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = (await res.json()) as { ok: boolean; saved?: boolean };
      if (!data.ok) return;
      setIds((current) => {
        const next = new Set(current);
        if (data.saved) next.add(productId);
        else next.delete(productId);
        return next;
      });
      router.refresh();
    },
    [status, router],
  );

  const value = useMemo(
    () => ({ has: (productId: string) => status === "authenticated" && ids.has(productId), toggle }),
    [ids, status, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function WishlistButton({ productId, className = "" }: { productId: string; className?: string }) {
  const { has, toggle } = useContext(WishlistContext);
  const saved = has(productId);

  return (
    <button
      type="button"
      onClick={() => void toggle(productId)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      title={saved ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110 ${
        saved ? "text-red-500" : "text-brand-navy/60 hover:text-red-500"
      } ${className}`}
    >
      <Heart className="h-5 w-5" fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
