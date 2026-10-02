import Image from "next/image";
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
        <span className="absolute top-2 right-2 rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
          {formatPrice(product.priceAmd)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-sm font-bold text-slate-900">{product.name}</p>
        <Stars rating={product.rating} />
        <p className="text-xs text-slate-500">({product.reviewCount})</p>
        <button
          type="button"
          disabled
          title="Cart is coming soon"
          className="mt-2 rounded-full bg-orange-500 py-2 text-xs font-bold tracking-wide text-white uppercase opacity-70"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
