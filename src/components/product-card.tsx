import type { AnimalType, ProductCategory } from "@prisma/client";
import Link from "next/link";
import AddToCartButton from "@/components/add-to-cart-button";
import ProductImage from "@/components/product-image";
import { WishlistButton } from "@/components/wishlist";
import { animalTheme, categoryLabel, formatPrice } from "@/lib/catalog";

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  priceAmd: number;
  animalType: AnimalType;
  category: ProductCategory;
  inStock: boolean;
};

export default function ProductCard({ product }: { product: ProductCardData }) {
  const theme = animalTheme(product.animalType);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-square w-full overflow-hidden">
        <ProductImage
          imageUrl={product.imageUrl}
          name={product.name}
          animalType={product.animalType}
          className="transition duration-300 group-hover:scale-105"
        />
        <span
          className="absolute top-2 left-2 rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-white uppercase"
          style={{ background: theme.main }}
        >
          {categoryLabel(product.category)}
        </span>
        {!product.inStock ? (
          <span className="absolute inset-x-0 bottom-0 bg-brand-navy/80 py-1 text-center text-xs font-bold text-white">
            Out of stock
          </span>
        ) : null}
      </Link>
      <WishlistButton productId={product.id} className="absolute top-2 right-2" />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <Link href={`/shop/${product.slug}`} className="text-sm font-bold text-brand-navy hover:underline">
          {product.name}
        </Link>
        <p className="mt-auto pt-1 text-lg font-extrabold" style={{ color: theme.dark }}>
          {formatPrice(product.priceAmd)}
        </p>
        <AddToCartButton productId={product.id} color={theme.main} disabled={!product.inStock} />
      </div>
    </article>
  );
}
