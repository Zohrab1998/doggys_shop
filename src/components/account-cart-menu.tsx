"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountCartMenu() {
  const { data: session, status } = useSession();
  const [cartCount, setCartCount] = useState<number | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    async function loadCount() {
      const res = await fetch("/api/cart");
      const data = (await res.json()) as { ok: boolean; items?: { quantity: number }[] };
      if (data.ok) {
        setCartCount((data.items ?? []).reduce((sum, item) => sum + item.quantity, 0));
      }
    }

    void loadCount();
    window.addEventListener("cart:changed", loadCount);
    return () => window.removeEventListener("cart:changed", loadCount);
  }, [status]);

  return (
    <div className="flex items-center gap-5 text-sm font-bold tracking-wider text-brand-navy uppercase">
      <Link href="/cart" className="transition hover:text-brand-orange">
        Cart{cartCount ? ` (${cartCount})` : ""}
      </Link>

      {status === "authenticated" ? (
        <div className="flex items-center gap-4">
          <Link href="/account" className="transition hover:text-brand-orange">
            {session.user?.name?.split(" ")[0] ?? "Account"}
          </Link>
          <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="transition hover:text-brand-orange">
            Sign Out
          </button>
        </div>
      ) : (
        <Link href="/signin" className="transition hover:text-brand-orange">
          Sign In
        </Link>
      )}
    </div>
  );
}
