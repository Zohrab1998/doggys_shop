import { Truck } from "lucide-react";
import { fmt } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { formatPrice } from "@/lib/catalog";
import { MIN_ORDER_AMD } from "@/lib/delivery";

/** Thin announcement strip shown above the header on every page. */
export default async function FreeDeliveryBar() {
  const { m } = await getI18n();
  return (
    <div className="bg-brand-blue px-4 py-2 text-center text-xs font-bold tracking-wide text-white sm:text-sm">
      <Truck className="mr-2 inline h-4 w-4 align-[-3px]" aria-hidden />
      {fmt(m.delivery.bar, { min: formatPrice(MIN_ORDER_AMD) })}
    </div>
  );
}
