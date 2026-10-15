import { Bone, Droplets, type LucideIcon, Pill, ShoppingBag, ToyBrick } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCategory } from "@prisma/client";
import ProductCard from "@/components/product-card";
import HeroIllustration from "@/components/hero-illustration";
import PawPrints from "@/components/paw-prints";
import { prisma } from "@/lib/prisma";

const CATEGORY_TILES: { category: ProductCategory; label: string; Icon: LucideIcon; className: string; iconClassName: string }[] = [
  { category: ProductCategory.TOYS, label: "Toys", Icon: ToyBrick, className: "bg-brand-sky-light", iconClassName: "text-brand-navy" },
  { category: ProductCategory.MEDICINE, label: "Medicine", Icon: Pill, className: "bg-brand-navy", iconClassName: "text-white" },
  { category: ProductCategory.FOOD, label: "Food", Icon: Bone, className: "bg-orange-100", iconClassName: "text-brand-orange" },
  { category: ProductCategory.HYGIENE, label: "Hygiene", Icon: Droplets, className: "bg-brand-sky-wave", iconClassName: "text-brand-navy" },
  { category: ProductCategory.ACCESSORIES, label: "Accessories", Icon: ShoppingBag, className: "bg-brand-sky-light", iconClassName: "text-brand-navy" },
];

export default async function HomePage() {
  const [topRated, featuredByCategory] = await Promise.all([
    prisma.product.findMany({
      orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
      take: 8,
    }),
    Promise.all(
      CATEGORY_TILES.map((tile) =>
        prisma.product.findFirst({
          where: { category: tile.category },
          orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
        }),
      ),
    ),
  ]);

  return (
    <div>
      {/* ===== FULL-BLEED HERO ===== */}
      <section className="relative overflow-hidden bg-brand-sky-light">
        <PawPrints />

        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-3/5 md:block"
        >
          <path d="M38 0 C10 22 10 78 38 100 L100 100 L100 0 Z" fill="var(--color-brand-sky-wave)" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-4 pb-20 md:grid-cols-2 md:items-center md:pt-10">
          <div>
            <Image src="/pets/paw.png" alt="" width={64} height={64} />
            <h1 className="mt-4 text-5xl font-extrabold text-brand-navy sm:text-6xl">Doggy&apos;s Shop</h1>
            <p className="mt-2 text-xl font-extrabold tracking-wide text-brand-orange uppercase">
              Pet food and accessories
            </p>
            <p className="mt-5 max-w-sm text-brand-navy/70">
              Discover curated supplies, nutrition, and expert care for every pet — delivered
              within Yerevan, Armenia.
            </p>

            <Link
              href="/about"
              className="mt-8 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-brand-orange text-center text-sm leading-tight font-extrabold tracking-wide text-white uppercase shadow-lg transition hover:bg-brand-orange-hover"
            >
              Read
              <br />
              More
            </Link>
          </div>

          <div className="relative aspect-[4/3]">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* ===== CATEGORY QUICK TILES ===== */}
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {CATEGORY_TILES.map(({ category, label, Icon, className, iconClassName }) => (
              <Link
                key={category}
                href={`/shop?category=${category}`}
                className={`flex min-h-[120px] flex-col justify-end overflow-hidden rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-md ${className}`}
              >
                <Icon className={`mb-2 h-7 w-7 ${iconClassName}`} />
                <span className={`text-sm font-bold ${iconClassName.includes("white") ? "text-white" : "text-brand-navy"}`}>
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== FEATURED CATEGORIES ===== */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-extrabold tracking-wide text-brand-orange uppercase">
            Featured Categories
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {featuredByCategory.map((product, i) =>
              product ? (
                <Link key={product.id} href={`/shop?category=${CATEGORY_TILES[i].category}`}>
                  <ProductCard product={product} />
                </Link>
              ) : null,
            )}
          </div>
        </section>

        {/* ===== TOP RATED PRODUCTS ===== */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-extrabold tracking-wide text-brand-orange uppercase">
            Top Rated Pet Products
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
