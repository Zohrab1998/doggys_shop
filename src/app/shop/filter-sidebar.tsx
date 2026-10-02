"use client";

import { useRouter, useSearchParams } from "next/navigation";
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

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    router.push(`/shop?${next.toString()}`);
  }

  function toggleValue(key: string, value: string) {
    updateParam(key, selected[key as keyof Selected] === value ? null : value);
  }

  const inputClass =
    "w-20 rounded-md border border-brand-blue/20 px-2 py-1 text-sm outline-none focus:border-brand-blue";

  return (
    <aside className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy/50">Animal</p>
        <div className="mt-2 space-y-1">
          {ANIMAL_TYPE_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm text-brand-navy">
              <input
                type="checkbox"
                checked={selected.animalType === option.value}
                onChange={() => toggleValue("animalType", option.value)}
              />
              {option.emoji} {option.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy/50">Category</p>
        <div className="mt-2 space-y-1">
          {CATEGORY_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm text-brand-navy">
              <input
                type="checkbox"
                checked={selected.category === option.value}
                onChange={() => toggleValue("category", option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {brands.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy/50">Brand</p>
          <div className="mt-2 space-y-1">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center gap-2 text-sm text-brand-navy">
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
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy/50">
          Price range (AMD)
        </p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            className={inputClass}
            defaultValue={selected.priceMin ?? ""}
            onBlur={(e) => updateParam("priceMin", e.target.value || null)}
          />
          <span className="text-brand-navy/40">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            className={inputClass}
            defaultValue={selected.priceMax ?? ""}
            onBlur={(e) => updateParam("priceMax", e.target.value || null)}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push("/shop")}
        className="text-sm font-medium text-brand-orange-dark hover:underline"
      >
        Clear all filters
      </button>
    </aside>
  );
}
