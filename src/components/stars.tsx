import { Star } from "lucide-react";

export function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex text-orange-400" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={className} fill={i < rounded ? "currentColor" : "none"} />
      ))}
    </div>
  );
}
