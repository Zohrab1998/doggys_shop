import { AnimalType, ProductCategory, type Prisma } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/product-card";
import { fmt } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { prisma } from "@/lib/prisma";
import FilterSidebar from "./filter-sidebar";
import ShopBanner from "./shop-banner";

type SearchParams = { [key: string]: string | string[] | undefined };

const PAGE_SIZE = 12;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function positiveInt(value: string | undefined): number | undefined {
  const n = Number(value);
  return value && Number.isFinite(n) && n >= 0 ? Math.floor(n) : undefined;
}

export const metadata = { title: "Shop — Doggy's Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { m } = await getI18n();

  const animalTypeRaw = firstValue(params.animalType);
  const categoryRaw = firstValue(params.category);
  const brandId = firstValue(params.brandId);
  const q = firstValue(params.q)?.trim().slice(0, 100) || undefined;
  const priceMin = positiveInt(firstValue(params.priceMin));
  const priceMax = positiveInt(firstValue(params.priceMax));
  const page = Math.max(1, positiveInt(firstValue(params.page)) ?? 1);

  const animalType = (Object.values(AnimalType) as string[]).includes(animalTypeRaw ?? "")
    ? (animalTypeRaw as AnimalType)
    : undefined;
  const category = (Object.values(ProductCategory) as string[]).includes(categoryRaw ?? "")
    ? (categoryRaw as ProductCategory)
    : undefined;

  const where: Prisma.ProductWhereInput = {
    ...(animalType ? { animalType } : {}),
    ...(category ? { category } : {}),
    ...(brandId ? { brandId } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { brand: { name: { contains: q, mode: "insensitive" } } },
          ],
        }
      : {}),
    ...(priceMin !== undefined || priceMax !== undefined
      ? {
          priceAmd: {
            ...(priceMin !== undefined ? { gte: priceMin } : {}),
            ...(priceMax !== undefined ? { lte: priceMax } : {}),
          },
        }
      : {}),
  };

  const [products, total, brands] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: [{ inStock: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageHref(target: number) {
    const next = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      const v = firstValue(value);
      if (v && key !== "page") next.set(key, v);
    }
    if (target > 1) next.set("page", String(target));
    const query = next.toString();
    return query ? `/shop?${query}` : "/shop";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <ShopBanner animalType={animalType} category={category} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
        <Suspense fallback={null}>
          <FilterSidebar
            brands={brands}
            selected={{
              animalType,
              category,
              brandId,
              priceMin: priceMin?.toString(),
              priceMax: priceMax?.toString(),
            }}
          />
        </Suspense>
        <div>
          <p className="mb-4 text-sm text-brand-navy/70">
            {fmt(m.shop.count, { count: total })}
            {q ? (
              <>
                {" · "}“<span className="font-bold">{q}</span>”
              </>
            ) : null}
          </p>
          {products.length === 0 ? (
            <div className="rounded-2xl bg-white/70 p-10 text-center text-brand-navy/70">
              {m.shop.noMatch}{" "}
              <Link href="/shop" className="font-bold text-brand-orange hover:underline">
                {m.shop.clear}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {pageCount > 1 ? (
            <nav aria-label={m.shop.pages} className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={pageHref(n)}
                  aria-current={n === page ? "page" : undefined}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-bold transition ${
                    n === page ? "bg-brand-blue text-white" : "bg-white text-brand-navy hover:bg-brand-sky-light"
                  }`}
                >
                  {n}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  );
}
