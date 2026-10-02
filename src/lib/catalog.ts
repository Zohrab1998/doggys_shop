import type { AnimalType, ProductCategory } from "@prisma/client";

export const ANIMAL_TYPE_OPTIONS: { value: AnimalType; label: string; emoji: string }[] = [
  { value: "DOG", label: "Dogs", emoji: "🐶" },
  { value: "CAT", label: "Cats", emoji: "🐱" },
  { value: "BIRD", label: "Birds", emoji: "🦜" },
  { value: "HAMSTER", label: "Hamsters", emoji: "🐹" },
];

export const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "TOYS", label: "Toys" },
  { value: "MEDICINE", label: "Medicine" },
  { value: "FOOD", label: "Food" },
  { value: "HYGIENE", label: "Hygiene" },
  { value: "ACCESSORIES", label: "Accessories" },
];

export function animalTypeLabel(value: AnimalType | null | undefined): string {
  return ANIMAL_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? "—";
}

export function categoryLabel(value: ProductCategory | null | undefined): string {
  return CATEGORY_OPTIONS.find((o) => o.value === value)?.label ?? "—";
}

export function formatPrice(amd: number): string {
  return amd.toLocaleString("hy-AM", { style: "currency", currency: "AMD", maximumFractionDigits: 0 });
}
