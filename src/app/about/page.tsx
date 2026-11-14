import { fmt } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { formatPrice } from "@/lib/catalog";
import { MIN_ORDER_AMD } from "@/lib/delivery";

export const metadata = { title: "About Us — Doggy's Shop" };

export default async function AboutPage() {
  const { m } = await getI18n();
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-extrabold text-brand-navy">{m.about.title}</h1>
      <p className="mt-4 leading-relaxed text-brand-navy/80">{m.about.p1}</p>
      <p className="mt-4 leading-relaxed text-brand-navy/80">
        {fmt(m.about.p2, { min: formatPrice(MIN_ORDER_AMD) })}
      </p>
    </div>
  );
}
