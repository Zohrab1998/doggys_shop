import { AnimalType, ProductCategory } from "@prisma/client";
import { z } from "zod";
import { slugify } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const productSchema = z.object({
  name: z.string().trim().min(2, "Give the product a name.").max(150),
  description: z.string().trim().max(5000).optional(),
  priceAmd: z.coerce
    .number({ message: "Enter the price in AMD." })
    .int("The price must be a whole number of AMD.")
    .min(1, "Enter the price in AMD.")
    .max(100_000_000),
  animalType: z.enum(AnimalType, { message: "Choose an animal." }),
  category: z.enum(ProductCategory, { message: "Choose a category." }),
  brand: z.string().trim().max(80).optional(),
  inStock: z.boolean(),
  imageUrl: z
    .string()
    .trim()
    .max(1000)
    .refine((value) => value === "" || /^https?:\/\//i.test(value), "The image link must start with http:// or https://")
    .optional(),
});

export type ProductInput = z.infer<typeof productSchema> & {
  image: { mimeType: string; data: Uint8Array<ArrayBuffer> } | null;
  removeImage: boolean;
};

export class ProductInputError extends Error {}

/** Reads and validates the admin product form (multipart/form-data). */
export async function parseProductForm(form: FormData): Promise<ProductInput> {
  const text = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value : undefined;
  };

  const parsed = productSchema.safeParse({
    name: text("name") ?? "",
    description: text("description"),
    priceAmd: text("priceAmd"),
    animalType: text("animalType"),
    category: text("category"),
    brand: text("brand"),
    inStock: text("inStock") === "on",
    imageUrl: text("imageUrl"),
  });
  if (!parsed.success) {
    throw new ProductInputError(parsed.error.issues[0]?.message ?? "Please check the form.");
  }

  let image: ProductInput["image"] = null;
  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    if (!IMAGE_MIME_TYPES.includes(file.type)) {
      throw new ProductInputError("The photo must be a JPG, PNG, WebP or GIF file.");
    }
    if (file.size > MAX_IMAGE_BYTES) {
      throw new ProductInputError("The photo is too large — the limit is 4 MB.");
    }
    image = { mimeType: file.type, data: new Uint8Array(await file.arrayBuffer()) };
  }

  return { ...parsed.data, image, removeImage: text("removeImage") === "on" };
}

/** Turns a name into a URL slug that no other product is using. */
export async function uniqueSlug(name: string, excludeProductId?: string): Promise<string> {
  const base = slugify(name) || "product";
  for (let n = 1; ; n += 1) {
    const candidate = n === 1 ? base : `${base}-${n}`;
    const taken = await prisma.product.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!taken || taken.id === excludeProductId) return candidate;
  }
}

/** Finds the brand by name (case-insensitive) or creates it. Empty name = no brand. */
export async function resolveBrandId(name: string | undefined): Promise<string | null> {
  if (!name) return null;
  const existing = await prisma.brand.findFirst({ where: { name: { equals: name, mode: "insensitive" } } });
  if (existing) return existing.id;

  const base = slugify(name) || "brand";
  for (let n = 1; ; n += 1) {
    const slug = n === 1 ? base : `${base}-${n}`;
    const taken = await prisma.brand.findUnique({ where: { slug }, select: { id: true } });
    if (!taken) {
      const created = await prisma.brand.create({ data: { name, slug } });
      return created.id;
    }
  }
}

export function uploadedImageUrl(productId: string): string {
  // The timestamp makes browsers fetch the new photo after it is replaced.
  return `/api/product-image/${productId}?v=${Date.now()}`;
}
