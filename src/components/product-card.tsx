import Image from "next/image";
import AddToCartButton from "@/components/add-to-cart-button";
import { Stars } from "@/components/stars";
import { formatPrice } from "@/lib/catalog";

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  priceAmd: number;
  rating: number;
  reviewCount: number;
};

export default function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-square w-full bg-sky-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
        <span className="absolute top-2 right-2 rounded-lg bg-brand-navy px-2.5 py-1 text-xs font-bold text-white">
          {formatPrice(product.priceAmd)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-sm font-bold text-brand-navy">{product.name}</p>
        <Stars rating={product.rating} />
        <p className="text-xs text-brand-navy/50">({product.reviewCount})</p>
        <AddToCartButton productId={product.id} />
      </div>
    </article>
  );
}
