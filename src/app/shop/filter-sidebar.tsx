"use client";

import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/i18n/client";
import { ANIMAL_TYPE_OPTIONS, CATEGORY_OPTIONS } from "@/lib/catalog";

type Brand = { id: string; name: string };

type Selected = {
  animalType?: string;
  category?: string;
  brandId?: string;
  priceMin?: string;
  priceMax?: string;
};

export default function FilterSidebar({
  brands,
  selected,
}: {
  brands: Brand[];
  selected: Selected;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { m } = useI18n();
  // Collapsed by default on phones so products are visible straight away.
  const [openOnMobile, setOpenOnMobile] = useState(false);

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete("page");
    const query = next.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  }

  function toggleValue(key: keyof Selected, value: string) {
    updateParam(key, selected[key] === value ? null : value);
  }

  const activeCount = Object.values(selected).filter(Boolean).length;
  const groupTitle = "text-xs font-bold tracking-wide text-brand-navy/60 uppercase";
  const optionClass = "flex cursor-pointer items-center gap-2 text-sm text-brand-navy";
  const inputClass =
    "w-full rounded-lg border border-brand-blue/20 px-2 py-1.5 text-sm outline-none focus:border-brand-blue";

  return (
    <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm">
      <button
        type="button"
        onClick={() => setOpenOnMobile((open) => !open)}
        aria-expanded={openOnMobile}
        className="flex w-full items-center justify-between text-sm font-extrabold tracking-widest text-brand-blue uppercase lg:pointer-events-none"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          {m.shop.filters}{activeCount ? ` (${activeCount})` : ""}
        </span>
        <span className="lg:hidden">{openOnMobile ? "−" : "+"}</span>
      </button>

      <div className={`mt-5 space-y-6 ${openOnMobile ? "block" : "hidden"} lg:block`}>
        <div>
          <p className={groupTitle}>{m.shop.animal}</p>
          <div className="mt-2 space-y-1.5">
            {ANIMAL_TYPE_OPTIONS.map((option) => (
              <label key={option.value} className={optionClass}>
                <input
                  type="checkbox"
                  checked={selected.animalType === option.value}
                  onChange={() => toggleValue("animalType", option.value)}
                  style={{ accentColor: option.theme.main }}
                />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: option.theme.main }} />
                {m.animals[option.value].label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className={groupTitle}>{m.shop.category}</p>
          <div className="mt-2 space-y-1.5">
            {CATEGORY_OPTIONS.map((option) => (
              <label key={option.value} className={optionClass}>
                <input
                  type="checkbox"
                  checked={selected.category === option.value}
                  onChange={() => toggleValue("category", option.value)}
                />
                {m.categories[option.value].label}
              </label>
            ))}
          </div>
        </div>

        {brands.length > 0 ? (
          <div>
            <p className={groupTitle}>{m.shop.brand}</p>
            <div className="mt-2 space-y-1.5">
              {brands.map((brand) => (
                <label key={brand.id} className={optionClass}>
                  <input
                    type="checkbox"
                    checked={selected.brandId === brand.id}
                    onChange={() => toggleValue("brandId", brand.id)}
                  />
                  {brand.name}
                </label>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <p className={groupTitle}>{m.shop.price}</p>
          {/* `key` resets the uncontrolled inputs when filters are cleared. */}
          <div key={`${selected.priceMin}-${selected.priceMax}`} className="mt-2 flex items-center gap-2">
            <input
              type="number"
              min={0}
              placeholder={m.shop.min}
              aria-label={m.shop.min}
              className={inputClass}
              defaultValue={selected.priceMin ?? ""}
              onBlur={(e) => updateParam("priceMin", e.target.value || null)}
            />
            <span className="text-brand-navy/40">–</span>
            <input
              type="number"
              min={0}
              placeholder={m.shop.max}
              aria-label={m.shop.max}
              className={inputClass}
              defaultValue={selected.priceMax ?? ""}
              onBlur={(e) => updateParam("priceMax", e.target.value || null)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="text-sm font-bold text-brand-orange hover:underline"
        >
          {m.shop.clearAll}
        </button>
      </div>
    </aside>
  );
}
