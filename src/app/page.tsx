import { Bone, Droplets, type LucideIcon, Pill, ShieldCheck, ShoppingBag, ToyBrick, Truck, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@prisma/client";
import AnimalArt from "@/components/animal-art";
import ProductCard from "@/components/product-card";
import { ANIMAL_TYPE_OPTIONS, formatPrice } from "@/lib/catalog";
import { DELIVERY_AREA, MIN_ORDER_AMD } from "@/lib/delivery";
import { prisma } from "@/lib/prisma";

// Products are managed from the admin page, so always read them fresh.
export const dynamic = "force-dynamic";

const CATEGORY_TILES: { category: ProductCategory; label: string; hint: string; Icon: LucideIcon }[] = [
  { category: "TOYS", label: "Toys", hint: "Play & chew", Icon: ToyBrick },
  { category: "MEDICINE", label: "Medicine", hint: "Health & vitamins", Icon: Pill },
  { category: "FOOD", label: "Food", hint: "Meals & treats", Icon: Bone },
  { category: "HYGIENE", label: "Hygiene", hint: "Clean & groomed", Icon: Droplets },
  { category: "ACCESSORIES", label: "Accessories", hint: "Beds, bowls & more", Icon: ShoppingBag },
];

const PERKS: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Truck, title: "Free delivery", text: `Across ${DELIVERY_AREA} on orders from ${formatPrice(MIN_ORDER_AMD)}.` },
  { Icon: ShieldCheck, title: "Chosen with care", text: "Trusted brands for dogs, cats, birds and hamsters." },
  { Icon: Wallet, title: "Secure payment", text: "Pay online safely and track your order in your account." },
];

export default async function HomePage() {
  // The two newest products for each animal, interleaved so the row shows every pet.
  const perAnimal = await Promise.all(
    ANIMAL_TYPE_OPTIONS.map((animal) =>
      prisma.product.findMany({
        where: { inStock: true, animalType: animal.value },
        orderBy: { createdAt: "desc" },
        take: 2,
      }),
    ),
  );
  const newest = [0, 1].flatMap((i) => perAnimal.flatMap((list) => (list[i] ? [list[i]] : [])));

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-sky-wave to-brand-sky">
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:pt-14">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-brand-blue uppercase">Welcome to Doggy&apos;s Shop</p>
            <h1 className="mt-3 text-5xl leading-[1.05] font-extrabold text-brand-orange sm:text-6xl">
              Your Pet&apos;s
              <br />
              Happy Place!
            </h1>
            <p className="mt-5 max-w-md text-lg text-brand-navy/80">
              Food, toys, medicine, hygiene and accessories for every pet — delivered to your door in{" "}
              {DELIVERY_AREA}.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:gap-4">
              {ANIMAL_TYPE_OPTIONS.map((animal) => (
                <Link
                  key={animal.value}
                  href={`/shop?animalType=${animal.value}`}
                  style={{ background: `linear-gradient(135deg, ${animal.theme.main}, ${animal.theme.dark})` }}
                  className="group flex items-center gap-3 rounded-2xl p-3 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl sm:p-4"
                >
                  <span className="flex h-14 w-14 shrink-0 items-end justify-center overflow-hidden rounded-full bg-white/90 sm:h-16 sm:w-16">
                    <AnimalArt animal={animal.value} className="h-[88%] w-[88%] transition group-hover:scale-110" />
                  </span>
                  <span className="text-base leading-tight font-extrabold sm:text-lg">
                    Shop for
                    <br />
                    {animal.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Studio photo of the four pets. `mix-blend-multiply` lets its white backdrop melt
              into the sky-blue hero, and the free-delivery banner overlaps its bottom edge. */}
          <div className="relative -mb-14 self-end">
            <Image
              src="/hero/pets.jpg"
              alt="A golden retriever, a tabby cat, a grey parrot and a hamster"
              width={1180}
              height={577}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ===== FREE DELIVERY BANNER ===== */}
        <section className="relative -mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-brand-orange to-[#ffa94d] p-6 text-white shadow-lg sm:p-8">
          <Truck aria-hidden className="absolute -right-6 -bottom-8 h-44 w-44 -rotate-6 text-white/15" />
          <div className="relative flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-brand-orange">
                <Truck className="h-8 w-8" />
              </span>
              <div>
                <p className="text-2xl font-extrabold sm:text-3xl">Free delivery in {DELIVERY_AREA}</p>
                <p className="mt-1 font-semibold text-white/90">
                  On every order from {formatPrice(MIN_ORDER_AMD)} — straight to your door.
                </p>
              </div>
            </div>
            <Link
              href="/shop"
              className="rounded-full bg-white px-7 py-3 text-sm font-extrabold tracking-wide text-brand-orange uppercase shadow transition hover:bg-brand-sky"
            >
              Shop now
            </Link>
          </div>
        </section>

        {/* ===== CATEGORIES ===== */}
        <section className="mt-14">
          <h2 className="text-center text-2xl font-extrabold tracking-wide text-brand-blue uppercase">Shop by category</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORY_TILES.map(({ category, label, hint, Icon }) => (
              <Link
                key={category}
                href={`/shop?category=${category}`}
                className="group flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-sky text-brand-blue transition group-hover:bg-brand-orange group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="mt-3 font-extrabold text-brand-navy">{label}</span>
                <span className="text-xs text-brand-navy/60">{hint}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== NEW ARRIVALS ===== */}
        <section className="mt-14">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold tracking-wide text-brand-blue uppercase">New in the shop</h2>
            <Link href="/shop" className="text-sm font-bold text-brand-orange hover:underline">
              View all →
            </Link>
          </div>
          {newest.length === 0 ? (
            <p className="mt-6 text-brand-navy/60">Products are on their way — check back soon.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {newest.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* ===== PERKS ===== */}
        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          {PERKS.map(({ Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl bg-white/70 p-5">
              <Icon className="mt-0.5 h-7 w-7 shrink-0 text-brand-orange" />
              <div>
                <p className="font-extrabold text-brand-navy">{title}</p>
                <p className="text-sm text-brand-navy/70">{text}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
