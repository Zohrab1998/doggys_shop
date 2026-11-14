import type { AnimalType, ProductCategory } from "@prisma/client";

export type AnimalTheme = {
  /** Main brand color for this animal (buttons, banner). */
  main: string;
  /** Darker shade for hover states and text on light backgrounds. */
  dark: string;
  /** Pale tint for backgrounds. */
  soft: string;
};

export const ANIMAL_TYPE_OPTIONS: {
  value: AnimalType;
  label: string;
  singular: string;
  tagline: string;
  theme: AnimalTheme;
}[] = [
  {
    value: "DOG",
    label: "Dogs",
    singular: "Dog",
    tagline: "Food, toys and care for your best friend.",
    theme: { main: "#f4821f", dark: "#c9610a", soft: "#ffead3" },
  },
  {
    value: "CAT",
    label: "Cats",
    singular: "Cat",
    tagline: "Everything a curious cat could ask for.",
    theme: { main: "#7b61d9", dark: "#5a43b0", soft: "#ece7fc" },
  },
  {
    value: "BIRD",
    label: "Birds",
    singular: "Bird",
    tagline: "Seeds, treats and fun for feathered friends.",
    theme: { main: "#22a06b", dark: "#177a50", soft: "#dbf5e9" },
  },
  {
    value: "HAMSTER",
    label: "Hamsters",
    singular: "Hamster",
    tagline: "Small pets, big appetite for adventure.",
    theme: { main: "#e6508a", dark: "#b93468", soft: "#fde4ee" },
  },
];

/** Used when no single animal is selected. */
export const DEFAULT_THEME: AnimalTheme = { main: "#005a98", dark: "#00416f", soft: "#d9eefb" };

export const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "TOYS", label: "Toys" },
  { value: "MEDICINE", label: "Medicine" },
  { value: "FOOD", label: "Food" },
  { value: "HYGIENE", label: "Hygiene" },
  { value: "ACCESSORIES", label: "Accessories" },
];

export function animalOption(value: AnimalType | null | undefined) {
  return ANIMAL_TYPE_OPTIONS.find((o) => o.value === value);
}

export function animalTheme(value: AnimalType | null | undefined): AnimalTheme {
  return animalOption(value)?.theme ?? DEFAULT_THEME;
}

export function animalTypeLabel(value: AnimalType | null | undefined): string {
  return animalOption(value)?.label ?? "—";
}

export function categoryLabel(value: ProductCategory | null | undefined): string {
  return CATEGORY_OPTIONS.find((o) => o.value === value)?.label ?? "—";
}

export function formatPrice(amd: number): string {
  // Plain "AMD" suffix rather than the ֏ glyph — the dram sign has poor font coverage
  // and renders as a tofu box in a lot of common UI fonts.
  return `${amd.toLocaleString("en-US")} AMD`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
