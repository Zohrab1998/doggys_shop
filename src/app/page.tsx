import Link from "next/link";
import ProductCard from "@/components/product-card";
import { ANIMAL_TYPE_OPTIONS, CATEGORY_OPTIONS } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

const HERO_BUTTONS = [
  { animal: ANIMAL_TYPE_OPTIONS[0], className: "bg-brand-orange hover:bg-brand-orange-dark" },
  { animal: ANIMAL_TYPE_OPTIONS[1], className: "bg-brand-blue hover:bg-brand-navy" },
  { animal: ANIMAL_TYPE_OPTIONS[3], className: "bg-brand-navy hover:bg-brand-blue" },
];

export default async function HomePage() {
  const [topRated, featuredByCategory] = await Promise.all([
    prisma.product.findMany({
      orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
      take: 8,
    }),
    Promise.all(
      CATEGORY_OPTIONS.map((category) =>
        prisma.product.findFirst({
          where: { category: category.value },
          orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
        }),
      ),
    ),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <section className="grid items-center gap-8 rounded-3xl bg-white p-8 shadow-sm sm:grid-cols-2 sm:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Welcome to your
          </p>
          <h1 className="mt-1 text-4xl font-bold text-brand-navy sm:text-5xl">
            Pet&apos;s Happy Place!
          </h1>
          <p className="mt-4 text-brand-navy/70">
            Discover curated supplies, nutrition, and expert care for every pet — delivered within
            Yerevan, Armenia.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {HERO_BUTTONS.map(({ animal, className }) => (
              <Link
                key={animal.value}
                href={`/shop?animalType=${animal.value}`}
                className={`flex items-center gap-3 rounded-full px-5 py-3 font-semibold text-white transition ${className}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xl">
                  {animal.emoji}
                </span>
                Shop for {animal.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-7xl">
          <span>🐶</span>
          <span>🐱</span>
          <span>🐦</span>
          <span>🐹</span>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold text-brand-orange uppercase">
          Featured Categories
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {featuredByCategory.map((product, i) =>
            product ? (
              <Link key={product.id} href={`/shop?category=${CATEGORY_OPTIONS[i].value}`}>
                <ProductCard product={product} />
              </Link>
            ) : null,
          )}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold text-brand-orange uppercase">
          Top Rated Pet Products
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topRated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
