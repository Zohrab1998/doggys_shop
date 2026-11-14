import type { AnimalType, ProductCategory } from "@prisma/client";
import Link from "next/link";
import AnimalArt from "@/components/animal-art";
import { ANIMAL_TYPE_OPTIONS, CATEGORY_OPTIONS, DEFAULT_THEME, animalOption } from "@/lib/catalog";

function href(animalType?: AnimalType, category?: ProductCategory) {
  const params = new URLSearchParams();
  if (animalType) params.set("animalType", animalType);
  if (category) params.set("category", category);
  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}

/**
 * Colored strip at the top of the shop. With an animal selected it takes that animal's color
 * and the mascot hops / runs / flies / rolls in from the right.
 */
export default function ShopBanner({
  animalType,
  category,
}: {
  animalType?: AnimalType;
  category?: ProductCategory;
}) {
  const animal = animalOption(animalType);
  const theme = animal?.theme ?? DEFAULT_THEME;

  return (
    <section
      className="relative overflow-hidden rounded-3xl text-white shadow-md"
      style={{ background: `linear-gradient(120deg, ${theme.main} 0%, ${theme.dark} 100%)` }}
    >
      <svg aria-hidden viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-y-0 right-0 h-full w-2/3 opacity-15">
        <path d="M120 0C40 60 60 140 140 200H400V0Z" fill="#fff" />
      </svg>

      <div className="relative flex min-h-[170px] items-center gap-4 px-5 py-6 sm:px-8">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">Doggy&apos;s Shop</p>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
            {animal ? `Everything for ${animal.label}` : "Shop for every pet"}
          </h1>
          <p className="mt-1 text-white/90">
            {animal ? animal.tagline : "Pick your pet to see their corner of the shop."}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {animal
              ? CATEGORY_OPTIONS.map((option) => {
                  const active = option.value === category;
                  return (
                    <Link
                      key={option.value}
                      href={href(animal.value, active ? undefined : option.value)}
                      className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                        active ? "bg-white" : "bg-white/20 text-white hover:bg-white/35"
                      }`}
                      style={active ? { color: theme.dark } : undefined}
                    >
                      {option.label}
                    </Link>
                  );
                })
              : ANIMAL_TYPE_OPTIONS.map((option) => (
                  <Link
                    key={option.value}
                    href={href(option.value, category)}
                    className="flex items-center gap-2 rounded-full bg-white py-1 pr-4 pl-1 text-sm font-bold transition hover:-translate-y-0.5"
                    style={{ color: option.theme.dark }}
                  >
                    <span className="flex h-8 w-8 items-end justify-center overflow-hidden rounded-full" style={{ background: option.theme.soft }}>
                      <AnimalArt animal={option.value} className="h-[85%] w-[85%]" />
                    </span>
                    {option.label}
                  </Link>
                ))}
          </div>
        </div>

        {animal ? (
          // `key` restarts the entrance animation whenever the selected animal changes.
          <div key={animal.value} className={`animal-enter-${animal.value} hidden w-36 shrink-0 self-end sm:block md:w-44`}>
            <AnimalArt animal={animal.value} title={animal.singular} className="animal-bob -mb-6 w-full drop-shadow-lg" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
