import Link from "next/link";
import ProductCard from "@/components/product-card";
import { ANIMAL_TYPE_OPTIONS, CATEGORY_OPTIONS } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const topRated = await prisma.product.findMany({
    orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    take: 8,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <section className="grid items-center gap-8 rounded-3xl bg-white p-8 shadow-sm sm:grid-cols-2 sm:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Welcome to Doggy&apos;s Shop
          </p>
          <h1 className="mt-2 text-4xl font-bold text-brand-navy sm:text-5xl">
            Your Pet&apos;s Happy Place!
          </h1>
          <p className="mt-4 text-brand-navy/70">
            Discover curated supplies, nutrition, and expert care for every pet — delivered within
            Yerevan, Armenia.
          </p>
        </div>
        <div className="flex items-center justify-center text-8xl">🐶🐱🦜🐹</div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-4">
        {ANIMAL_TYPE_OPTIONS.map((animal) => (
          <Link
            key={animal.value}
            href={`/shop?animalType=${animal.value}`}
            className="flex items-center gap-3 rounded-2xl bg-brand-blue px-5 py-6 font-semibold text-white transition hover:bg-brand-navy"
          >
            <span className="text-3xl">{animal.emoji}</span>
            Shop for {animal.label}
          </Link>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold text-brand-orange">Featured Categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-5">
          {CATEGORY_OPTIONS.map((category) => (
            <Link
              key={category.value}
              href={`/shop?category=${category.value}`}
              className="rounded-2xl border border-brand-blue/10 bg-white p-4 text-center font-medium text-brand-navy shadow-sm hover:shadow-md"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold text-brand-orange">Top Rated Pet Products</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topRated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
