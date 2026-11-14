import { prisma } from "@/lib/prisma";
import ProductForm from "../product-form";

export default async function NewProductPage() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" }, select: { name: true } });

  return (
    <div className="mt-6">
      <h1 className="text-3xl font-extrabold text-brand-navy">Add a product</h1>
      <ProductForm brands={brands.map((brand) => brand.name)} />
    </div>
  );
}
