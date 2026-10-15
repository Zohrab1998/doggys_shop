"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/catalog";

type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    imageUrl: string;
    priceAmd: number;
  };
};

export default function CartClient() {
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  async function load() {
    const res = await fetch("/api/cart");
    const data = (await res.json()) as { ok: boolean; items?: CartItem[] };
    if (data.ok) setItems(data.items ?? []);
  }

  useEffect(() => {
    // Standard fetch-on-mount; the rule can't see the setState only happens after the fetch resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;
    await fetch(`/api/cart/${productId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    window.dispatchEvent(new Event("cart:changed"));
    void load();
  }

  async function removeItem(productId: string) {
    await fetch(`/api/cart/${productId}`, { method: "DELETE" });
    window.dispatchEvent(new Event("cart:changed"));
    void load();
  }

  async function onCheckout() {
    if (!address.trim() || !phone.trim()) {
      setMessage("Please add a delivery address and phone number.");
      return;
    }
    setCheckingOut(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ deliveryAddress: address, phone }),
      });
      const data = (await res.json()) as { ok: boolean; checkoutUrl?: string; message?: string };
      if (!res.ok || !data.ok || !data.checkoutUrl) {
        throw new Error(data.message ?? "Could not start checkout.");
      }
      window.location.href = data.checkoutUrl;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not start checkout.");
      setCheckingOut(false);
    }
  }

  if (items === null) {
    return <p className="mt-8 text-brand-navy/60">Loading…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-brand-navy/60">Your cart is empty.</p>
        <Link href="/shop" className="mt-4 inline-block font-bold text-brand-orange hover:underline">
          Browse the shop →
        </Link>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.priceAmd * item.quantity, 0);

  return (
    <div className="mt-8 space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.product.imageUrl} alt={item.product.name} className="h-20 w-20 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="font-bold text-brand-navy">{item.product.name}</p>
            <p className="text-sm text-brand-navy/60">{formatPrice(item.product.priceAmd)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="h-8 w-8 rounded-full border border-brand-navy/20 text-brand-navy"
            >
              −
            </button>
            <span className="w-6 text-center">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="h-8 w-8 rounded-full border border-brand-navy/20 text-brand-navy"
            >
              +
            </button>
          </div>
          <p className="w-28 text-right font-bold text-brand-navy">
            {formatPrice(item.product.priceAmd * item.quantity)}
          </p>
          <button
            type="button"
            onClick={() => removeItem(item.product.id)}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between text-lg font-bold text-brand-navy">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <label className="text-xs font-semibold tracking-wider text-brand-navy/60 uppercase">
              Delivery address (Yerevan)
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-sky-500/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, building, apartment"
            />
          </div>
          <div>
            <label className="text-xs font-semibold tracking-wider text-brand-navy/60 uppercase">Phone</label>
            <input
              className="mt-1 w-full rounded-xl border border-sky-500/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+374 ..."
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onCheckout}
          disabled={checkingOut}
          className="mt-5 w-full rounded-full bg-brand-orange py-3 font-bold text-white transition hover:bg-brand-orange-hover disabled:opacity-60"
        >
          {checkingOut ? "Redirecting to payment…" : "Proceed to payment"}
        </button>
        {message ? <p className="mt-2 text-sm text-red-600">{message}</p> : null}
      </div>
    </div>
  );
}
