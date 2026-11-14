import { Truck } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { DELIVERY_AREA, MIN_ORDER_AMD } from "@/lib/delivery";

/** Thin announcement strip shown above the header on every page. */
export default function FreeDeliveryBar() {
  return (
    <div className="bg-brand-blue px-4 py-2 text-center text-xs font-bold tracking-wide text-white sm:text-sm">
      <Truck className="mr-2 inline h-4 w-4 align-[-3px]" aria-hidden />
      Free delivery in {DELIVERY_AREA} on orders from {formatPrice(MIN_ORDER_AMD)}
    </div>
  );
}
