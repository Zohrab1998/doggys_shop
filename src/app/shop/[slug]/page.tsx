import { ChevronRight, Truck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/add-to-cart-button";
import ProductCard from "@/components/product-card";
import ProductImage from "@/components/product-image";
import { animalOption, animalTheme, categoryLabel, formatPrice } from "@/lib/catalog";
import { DELIVERY_AREA, MIN_ORDER_AMD } from "@/lib/delivery";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, select: { name: true, description: true } });
  if (!product) return { title: "Product not found — Doggy's Shop" };
  return { title: `${product.name} — Doggy's Shop`, description: product.description ?? undefined };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { brand: true } });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { animalType: product.animalType, id: { not: product.id }, inStock: true },
    orderBy: [{ category: "asc" }, { createdAt: "desc" }],
    take: 4,
  });

  const theme = animalTheme(product.animalType);
  const animal = animalOption(product.animalType);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-brand-navy/70">
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/shop?animalType=${product.animalType}`} className="hover:underline">
          {animal?.label}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/shop?animalType=${product.animalType}&category=${product.category}`} className="hover:underline">
          {categoryLabel(product.category)}
        </Link>
      </nav>

      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-3xl bg-white shadow-sm">
          <ProductImage imageUrl={product.imageUrl} name={product.name} animalType={product.animalType} />
        </div>

        <div>
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-extrabold tracking-wide text-white uppercase"
            style={{ background: theme.main }}
          >
            {animal?.label} · {categoryLabel(product.category)}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-brand-navy">{product.name}</h1>
          {product.brand ? <p className="mt-1 text-brand-navy/60">by {product.brand.name}</p> : null}

          <p className="mt-5 text-3xl font-extrabold" style={{ color: theme.dark }}>
            {formatPrice(product.priceAmd)}
          </p>

          {product.description ? (
            <p className="mt-5 leading-relaxed whitespace-pre-line text-brand-navy/80">{product.description}</p>
          ) : null}

          <AddToCartButton
            productId={product.id}
            color={theme.main}
            disabled={!product.inStock}
            className="mt-7 w-full py-3.5 text-sm sm:w-64"
          />

          <p className="mt-5 flex items-center gap-2 rounded-xl p-3 text-sm font-semibold" style={{ background: theme.soft, color: theme.dark }}>
            <Truck className="h-5 w-5 shrink-0" />
            Free delivery in {DELIVERY_AREA} on orders from {formatPrice(MIN_ORDER_AMD)}
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-xl font-extrabold text-brand-navy">More for {animal?.label.toLowerCase()}</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
