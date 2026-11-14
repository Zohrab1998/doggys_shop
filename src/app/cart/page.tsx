import { getI18n } from "@/i18n/server";
import { getSessionUser } from "@/lib/authz";
import CartClient from "./cart-client";

export const metadata = { title: "Cart — Doggy's Shop" };

export default async function CartPage() {
  const user = await getSessionUser();
  const { m } = await getI18n();

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold text-brand-navy">{m.cart.title}</h1>
      <CartClient isGuest={!user} />
    </div>
  );
}
