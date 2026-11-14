import { Bone, Droplets, type LucideIcon, Pill, ShieldCheck, ShoppingBag, ToyBrick, Truck, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@prisma/client";
import AnimalArt from "@/components/animal-art";
import HeroDecor, { Paw } from "@/components/hero-decor";
import ProductCard from "@/components/product-card";
import { fmt } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { ANIMAL_TYPE_OPTIONS, formatPrice } from "@/lib/catalog";
import { MIN_ORDER_AMD } from "@/lib/delivery";
import { prisma } from "@/lib/prisma";

// Products are managed from the admin page, so always read them fresh.
export const dynamic = "force-dynamic";

const CATEGORY_TILES: { category: ProductCategory; Icon: LucideIcon }[] = [
  { category: "TOYS", Icon: ToyBrick },
  { category: "MEDICINE", Icon: Pill },
  { category: "FOOD", Icon: Bone },
  { category: "HYGIENE", Icon: Droplets },
  { category: "ACCESSORIES", Icon: ShoppingBag },
];

export default async function HomePage() {
  const { m } = await getI18n();
  const min = formatPrice(MIN_ORDER_AMD);
  const perks: { Icon: LucideIcon; title: string; text: string }[] = [
    { Icon: Truck, title: m.home.perkDeliveryTitle, text: fmt(m.home.perkDeliveryText, { min }) },
    { Icon: ShieldCheck, title: m.home.perkCareTitle, text: m.home.perkCareText },
    { Icon: Wallet, title: m.home.perkPaymentTitle, text: m.home.perkPaymentText },
  ];

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
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-sky-light via-brand-sky-wave to-brand-sky">
        <HeroDecor badgeDelivery={m.home.perkDeliveryTitle} badgeCare={m.home.perkCareTitle} />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:pt-14">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-brand-blue uppercase">
              <Paw className="h-6 w-6 -rotate-12 text-brand-orange" />
              {m.home.welcome}
            </p>
            <h1 className="mt-3 text-5xl leading-[1.05] font-extrabold text-brand-orange sm:text-6xl">
              {m.home.titleLine1}
              <br />
              {m.home.titleLine2}
            </h1>
            <p className="mt-5 max-w-md text-lg text-brand-navy/80">
              {m.home.intro}
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:gap-4">
              {ANIMAL_TYPE_OPTIONS.map((animal) => (
                <Link
                  key={animal.value}
                  href={`/shop?animalType=${animal.value}`}
                  style={{ background: `linear-gradient(135deg, ${animal.theme.main}, ${animal.theme.dark})` }}
                  className="group flex items-center gap-2 rounded-2xl p-2.5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl sm:gap-3 sm:p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-end justify-center overflow-hidden rounded-full bg-white/90 sm:h-16 sm:w-16">
                    <AnimalArt animal={animal.value} className="h-[88%] w-[88%] transition group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 text-[13px] leading-tight font-extrabold [overflow-wrap:anywhere] sm:text-lg">
                    {m.animals[animal.value].shopFor}
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
              alt={m.home.heroAlt}
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
                <p className="text-2xl font-extrabold sm:text-3xl">{m.home.bannerTitle}</p>
                <p className="mt-1 font-semibold text-white/90">
                  {fmt(m.home.bannerText, { min })}
                </p>
              </div>
            </div>
            <Link
              href="/shop"
              className="rounded-full bg-white px-7 py-3 text-sm font-extrabold tracking-wide text-brand-orange uppercase shadow transition hover:bg-brand-sky"
            >
              {m.home.shopNow}
            </Link>
          </div>
        </section>

        {/* ===== CATEGORIES ===== */}
        <section className="mt-14">
          <h2 className="text-center text-2xl font-extrabold tracking-wide text-brand-blue uppercase">{m.home.byCategory}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORY_TILES.map(({ category, Icon }) => (
              <Link
                key={category}
                href={`/shop?category=${category}`}
                className="group flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-sky text-brand-blue transition group-hover:bg-brand-orange group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="mt-3 font-extrabold text-brand-navy">{m.categories[category].label}</span>
                <span className="text-xs text-brand-navy/60">{m.categories[category].hint}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== NEW ARRIVALS ===== */}
        <section className="mt-14">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold tracking-wide text-brand-blue uppercase">{m.home.newIn}</h2>
            <Link href="/shop" className="text-sm font-bold text-brand-orange hover:underline">
              {m.home.viewAll}
            </Link>
          </div>
          {newest.length === 0 ? (
            <p className="mt-6 text-brand-navy/60">{m.home.empty}</p>
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
          {perks.map(({ Icon, title, text }) => (
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
