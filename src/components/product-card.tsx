import Image from "next/image";
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

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span aria-label={`${rating} out of 5 stars`} className="text-brand-orange">
      {"★".repeat(rounded)}
      <span className="text-brand-blue/20">{"★".repeat(5 - rounded)}</span>
    </span>
  );
}

export default function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-brand-blue/10 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-brand-sky">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
        <span className="absolute top-2 right-2 rounded-md bg-brand-navy px-2 py-1 text-xs font-bold text-white">
          {formatPrice(product.priceAmd)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-sm font-semibold text-brand-navy">{product.name}</p>
        <p className="text-xs text-brand-navy/60">
          <Stars rating={product.rating} /> ({product.reviewCount})
        </p>
        <button
          type="button"
          disabled
          title="Cart is coming soon"
          className="mt-2 rounded-full bg-brand-orange px-4 py-2 text-xs font-bold tracking-wide text-white uppercase opacity-70"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
