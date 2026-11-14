"use client";

import { LogOut, Settings, ShoppingCart, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const iconButton =
  "relative flex h-10 w-10 items-center justify-center rounded-full text-brand-navy transition hover:bg-brand-sky hover:text-brand-orange";

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

  const signedIn = status === "authenticated";

  return (
    <div className="flex items-center gap-1">
      {signedIn && session.user.isAdmin ? (
        <Link href="/admin" className={iconButton} aria-label="Admin" title="Admin">
          <Settings className="h-5 w-5" />
        </Link>
      ) : null}

      <Link
        href={signedIn ? "/account" : "/signin"}
        className={iconButton}
        aria-label={signedIn ? "My account" : "Sign in"}
        title={signedIn ? (session.user?.name ?? "My account") : "Sign in"}
      >
        <User className="h-5 w-5" />
      </Link>

      <Link href="/cart" className={iconButton} aria-label="Cart" title="Cart">
        <ShoppingCart className="h-5 w-5" />
        {signedIn && cartCount ? (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] font-extrabold text-white">
            {cartCount}
          </span>
        ) : null}
      </Link>

      {signedIn ? (
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className={iconButton}
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
}
