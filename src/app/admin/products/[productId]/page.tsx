import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "../product-form";

export default async function EditProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const [product, brands] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId }, include: { brand: true } }),
    prisma.brand.findMany({ orderBy: { name: "asc" }, select: { name: true } }),
  ]);
  if (!product) notFound();

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold text-brand-navy">Edit product</h1>
        <Link href={`/shop/${product.slug}`} className="text-sm font-bold text-brand-orange hover:underline">
          View in shop →
        </Link>
      </div>
      <ProductForm
        brands={brands.map((brand) => brand.name)}
        product={{
          id: product.id,
          name: product.name,
          description: product.description ?? "",
          priceAmd: product.priceAmd,
          animalType: product.animalType,
          category: product.category,
          brand: product.brand?.name ?? "",
          inStock: product.inStock,
          imageUrl: product.imageUrl,
        }}
      />
    </div>
  );
}
