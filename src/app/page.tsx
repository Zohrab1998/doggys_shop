import { Bird, Bone, Cat, Dog, Droplets, type LucideIcon, Pill, ShoppingBag, Squirrel, ToyBrick } from "lucide-react";
import Link from "next/link";
import { AnimalType, ProductCategory } from "@prisma/client";
import ProductCard, { type ProductCardData } from "@/components/product-card";
import HeroIllustration from "@/components/hero-illustration";
import PawPrints from "@/components/paw-prints";
import { Stars } from "@/components/stars";
import { formatPrice } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

const HERO_BUTTONS: { animalType: AnimalType; label: string; Icon: LucideIcon; className: string }[] = [
  { animalType: AnimalType.DOG, label: "Dogs", Icon: Dog, className: "bg-brand-orange hover:bg-brand-orange-hover" },
  { animalType: AnimalType.CAT, label: "Cats", Icon: Cat, className: "bg-sky-400 hover:bg-sky-500" },
  { animalType: AnimalType.BIRD, label: "Birds", Icon: Bird, className: "bg-sky-600 hover:bg-sky-700" },
  { animalType: AnimalType.HAMSTER, label: "Hamsters", Icon: Squirrel, className: "bg-brand-navy hover:bg-brand-navy/90" },
];

const CATEGORY_TILES: { category: ProductCategory; label: string; Icon: LucideIcon; className: string; iconClassName: string }[] = [
  { category: ProductCategory.TOYS, label: "Toys", Icon: ToyBrick, className: "bg-brand-sky-light", iconClassName: "text-brand-navy" },
  { category: ProductCategory.MEDICINE, label: "Medicine", Icon: Pill, className: "bg-brand-navy", iconClassName: "text-white" },
  { category: ProductCategory.FOOD, label: "Food", Icon: Bone, className: "bg-orange-100", iconClassName: "text-brand-orange" },
  { category: ProductCategory.HYGIENE, label: "Hygiene", Icon: Droplets, className: "bg-brand-sky-wave", iconClassName: "text-brand-navy" },
  { category: ProductCategory.ACCESSORIES, label: "Accessories", Icon: ShoppingBag, className: "bg-brand-sky-light", iconClassName: "text-brand-navy" },
];

function SidebarProductRow({ product }: { product: ProductCardData }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-sm">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-sky-light">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-brand-navy">{product.name}</p>
        <Stars rating={product.rating} className="h-3 w-3" />
        <p className="text-xs font-extrabold text-brand-navy">{formatPrice(product.priceAmd)}</p>
      </div>
      <button
        type="button"
        disabled
        title="Cart is coming soon"
        className="shrink-0 rounded-full bg-brand-orange px-3 py-1.5 text-[10px] font-bold text-white uppercase opacity-70"
      >
        Add
      </button>
    </div>
  );
}

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
    <div className="relative mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* ===== LEFT: HERO + FEATURED CATEGORIES ===== */}
        <div>
          <section className="relative grid items-center gap-8 overflow-hidden rounded-3xl bg-brand-sky-light p-8 shadow-sm sm:grid-cols-2 sm:p-10">
            <PawPrints />

            {/* curved wave backdrop behind the illustration, right side only */}
            <svg
              aria-hidden
              viewBox="0 0 400 400"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-3/5 sm:block"
            >
              <path d="M140 0 C40 90 40 310 140 400 L400 400 L400 0 Z" fill="var(--color-brand-sky-wave)" />
            </svg>

            <div className="relative">
              <p className="text-sm font-bold tracking-widest text-sky-600 uppercase">Welcome to your</p>
              <h1 className="mt-1 text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl">
                Pet&apos;s Happy Place!
              </h1>
              <p className="mt-4 max-w-sm text-brand-navy/70">
                Discover curated supplies, nutrition, and expert care for every pet.
              </p>
              <p className="mt-2 max-w-sm text-sm text-brand-navy/50">
                Delivered within Yerevan, Armenia.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {HERO_BUTTONS.map(({ animalType, label, Icon, className }) => (
                  <Link
                    key={animalType}
                    href={`/shop?animalType=${animalType}`}
                    className={`flex items-center gap-3 rounded-full px-5 py-3 font-bold text-white shadow-sm transition hover:shadow-md ${className}`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    Shop for {label}
                  </Link>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-orange hover:underline"
              >
                Read more →
              </Link>
            </div>

            <div className="relative aspect-[4/3]">
              <HeroIllustration />
            </div>
          </section>

          <section className="mt-14">
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
        </div>

        {/* ===== RIGHT: SIDEBAR ===== */}
        <aside className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-3">
            {CATEGORY_TILES.map(({ category, label, Icon, className, iconClassName }) => (
              <Link
                key={category}
                href={`/shop?category=${category}`}
                className={`flex min-h-[110px] flex-col justify-end overflow-hidden rounded-2xl p-4 ${className}`}
              >
                <Icon className={`mb-2 h-6 w-6 ${iconClassName}`} />
                <span className={`text-sm font-bold ${iconClassName.includes("white") ? "text-white" : "text-brand-navy"}`}>
                  {label}
                </span>
              </Link>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-extrabold tracking-widest text-brand-orange uppercase">
              Top Rated Pet Products
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {topRated.slice(0, 5).map((product) => (
                <SidebarProductRow key={product.id} product={product} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
