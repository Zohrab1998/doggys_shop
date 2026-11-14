import { AnimalType } from "@prisma/client";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProductImage from "@/components/product-image";
import { getSessionUser } from "@/lib/authz";
import { ANIMAL_TYPE_OPTIONS, animalOption, categoryLabel, formatPrice } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ animalType?: string }>;
}) {
  const user = await getSessionUser();
  if (!user || !user.isAdmin) {
    redirect("/signin?callbackUrl=/admin/products");
  }

  const { animalType: raw } = await searchParams;
  const animalType = (Object.values(AnimalType) as string[]).includes(raw ?? "") ? (raw as AnimalType) : undefined;

  const products = await prisma.product.findMany({
    where: animalType ? { animalType } : {},
    orderBy: [{ animalType: "asc" }, { category: "asc" }, { name: "asc" }],
    include: { brand: true },
  });

  const chip = "rounded-full px-4 py-1.5 text-sm font-bold transition";

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold text-brand-navy">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-extrabold text-white shadow transition hover:bg-brand-orange-hover"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/admin/products"
          className={`${chip} ${animalType ? "bg-white text-brand-navy" : "bg-brand-blue text-white"}`}
        >
          All
        </Link>
        {ANIMAL_TYPE_OPTIONS.map((option) => {
          const active = option.value === animalType;
          return (
            <Link
              key={option.value}
              href={`/admin/products?animalType=${option.value}`}
              className={`${chip} ${active ? "text-white" : "bg-white"}`}
              style={active ? { background: option.theme.main } : { color: option.theme.dark }}
            >
              {option.label}
            </Link>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-brand-navy/70">{products.length} products</p>

      {products.length === 0 ? (
        <p className="mt-4 rounded-2xl bg-white p-8 text-center text-brand-navy/70">
          No products yet. Press “Add product” to create the first one.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-brand-sky overflow-hidden rounded-2xl bg-white shadow-sm">
          {products.map((product) => {
            const animal = animalOption(product.animalType);
            return (
              <li key={product.id}>
                <Link
                  href={`/admin/products/${product.id}`}
                  className="flex items-center gap-4 p-3 transition hover:bg-brand-sky/60 sm:px-5"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <ProductImage imageUrl={product.imageUrl} name={product.name} animalType={product.animalType} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-brand-navy">{product.name}</p>
                    <p className="text-xs text-brand-navy/60">
                      <span className="font-bold" style={{ color: animal?.theme.dark }}>
                        {animal?.label}
                      </span>{" "}
                      · {categoryLabel(product.category)}
                      {product.brand ? ` · ${product.brand.name}` : ""}
                    </p>
                  </div>
                  {!product.inStock ? (
                    <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">Out of stock</span>
                  ) : null}
                  <p className="w-28 shrink-0 text-right font-extrabold text-brand-navy">{formatPrice(product.priceAmd)}</p>
                  <span className="hidden text-sm font-bold text-brand-orange sm:block">Edit</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
