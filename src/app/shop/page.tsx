import { AnimalType, ProductCategory, type Prisma } from "@prisma/client";
import { Suspense } from "react";
import ProductCard from "@/components/product-card";
import { prisma } from "@/lib/prisma";
import FilterSidebar from "./filter-sidebar";

type SearchParams = { [key: string]: string | string[] | undefined };

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export const metadata = { title: "Shop — Doggy's Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const animalTypeRaw = firstValue(params.animalType);
  const categoryRaw = firstValue(params.category);
  const brandId = firstValue(params.brandId);
  const priceMin = firstValue(params.priceMin);
  const priceMax = firstValue(params.priceMax);

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
    ...(priceMin || priceMax
      ? {
          priceAmd: {
            ...(priceMin ? { gte: Number(priceMin) } : {}),
            ...(priceMax ? { lte: Number(priceMax) } : {}),
          },
        }
      : {}),
  };

  const [products, brands] = await Promise.all([
    prisma.product.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-brand-navy">Shop</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <Suspense fallback={null}>
          <FilterSidebar
            brands={brands}
            selected={{ animalType, category, brandId, priceMin, priceMax }}
          />
        </Suspense>
        <div>
          <p className="mb-4 text-sm text-brand-navy/60">{products.length} products</p>
          {products.length === 0 ? (
            <p className="text-brand-navy/60">No products match these filters.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
