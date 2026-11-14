import Link from "next/link";
import { redirect } from "next/navigation";
import ProductCard from "@/components/product-card";
import { getI18n } from "@/i18n/server";
import { getSessionUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Wishlist — Doggy's Shop" };

export default async function WishlistPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/signin?callbackUrl=/wishlist");
  }

  const { m } = await getI18n();
  const items = await prisma.wishlistItem.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { product: true },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold text-brand-navy">{m.wishlist.title}</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-brand-navy/70">
          {m.wishlist.empty}{" "}
          <Link href="/shop" className="font-bold text-brand-orange hover:underline">
            {m.cart.browse}
          </Link>
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      )}
    </div>
  );
}
