import { PrismaClient, type AnimalType, type ProductCategory } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Starter catalog so the shop isn't empty on day one. Everything here can be edited or
 * deleted from the admin page (/admin/products) — the seed never overwrites a product that
 * already exists.
 *
 * Products with a brand use real product names and regular shelf prices seen at Yerevan pet
 * stores (Nov 2026). Products without a brand are generic examples with placeholder prices,
 * there so every animal has something in every category — replace them with real stock.
 */
type SeedProduct = {
  animal: AnimalType;
  category: ProductCategory;
  brand?: string;
  name: string;
  priceAmd: number;
  description: string;
};

const PRODUCTS: SeedProduct[] = [
  // ----- Dogs -----
  { animal: "DOG", category: "FOOD", brand: "DARSI", name: "DARSI Active dry dog food with veal, 10 kg", priceAmd: 16850, description: "Complete dry food for active adult dogs, with veal. 10 kg bag." },
  { animal: "DOG", category: "FOOD", brand: "Triol", name: "Triol chicken breast treat for dogs, 70 g", priceAmd: 1700, description: "Dried chicken breast pieces — a simple, meaty reward for training or between meals. 70 g pack." },
  { animal: "DOG", category: "MEDICINE", brand: "Zoetis", name: "Simparica flea & tick tablets for dogs 40–60 kg, 3 tablets", priceAmd: 8000, description: "Chewable tablets against fleas and ticks for large dogs (40.1–60 kg), 120 mg. Pack of 3 tablets. Ask your vet before use." },
  { animal: "DOG", category: "TOYS", brand: "Coffee Wood", name: "Coffee Wood chew stick for dogs, L (21 cm)", priceAmd: 2350, description: "Natural coffee-tree wood chew stick. Hard-wearing and splinter-resistant, for dogs that love to gnaw. Size L, about 21 cm." },
  { animal: "DOG", category: "TOYS", brand: "Coffee Wood", name: "Coffee Wood chew stick for dogs, M (18 cm)", priceAmd: 2100, description: "Natural coffee-tree wood chew stick for medium dogs. Size M, about 18 cm." },
  { animal: "DOG", category: "TOYS", brand: "Flamingo", name: "Flamingo plush hedgehog dog toy, 22 cm", priceAmd: 3550, description: "Soft plush hedgehog for cuddling and carrying around. About 22 cm." },
  { animal: "DOG", category: "TOYS", brand: "Flamingo", name: "Flamingo plush rabbit dog toy, 39 cm", priceAmd: 3800, description: "Long-eared plush rabbit, great for tug and fetch. About 39 cm." },
  { animal: "DOG", category: "HYGIENE", name: "Dog shampoo for all coat types, 250 ml", priceAmd: 1800, description: "Gentle everyday shampoo that leaves the coat clean and soft. 250 ml bottle." },
  { animal: "DOG", category: "ACCESSORIES", name: "Nylon dog collar with buckle, size M", priceAmd: 2500, description: "Adjustable nylon collar with a sturdy buckle and metal ring for the leash. Size M." },
  { animal: "DOG", category: "ACCESSORIES", name: "Stainless steel dog bowl, 0.9 L", priceAmd: 2200, description: "Easy-to-clean stainless steel bowl with a non-slip base. 0.9 litre." },

  // ----- Cats -----
  { animal: "CAT", category: "FOOD", brand: "DARSI", name: "DARSI Sensitive dry cat food with turkey, 10 kg", priceAmd: 24500, description: "Complete dry food for cats with sensitive digestion, with turkey. 10 kg bag." },
  { animal: "CAT", category: "HYGIENE", brand: "Gamma", name: "Gamma restoring cat shampoo with burdock extract, 250 ml", priceAmd: 1050, description: "Restoring shampoo with burdock extract for a healthy, shiny coat. 250 ml bottle." },
  { animal: "CAT", category: "HYGIENE", name: "Clumping cat litter, 5 kg", priceAmd: 3200, description: "Fast-clumping litter that locks in odour and is easy to scoop. 5 kg bag." },
  { animal: "CAT", category: "TOYS", brand: "Flamingo", name: "Flamingo mouse cat toy, 5 cm", priceAmd: 1400, description: "Small plush mouse — just the right size to chase, bat and carry. About 5 cm." },
  { animal: "CAT", category: "TOYS", brand: "Flamingo", name: "Flamingo mouse cat toys, 9 cm (2 pcs)", priceAmd: 1200, description: "Pair of plush mice for hunting games. About 9 cm each, 2 in a pack." },
  { animal: "CAT", category: "MEDICINE", name: "Multivitamin tablets for cats, 100 pcs", priceAmd: 2900, description: "Daily multivitamin tablets to support coat, skin and immunity. 100 tablets." },
  { animal: "CAT", category: "ACCESSORIES", name: "Cat scratching post, 45 cm", priceAmd: 9500, description: "Sisal-wrapped scratching post on a stable base — saves the sofa. 45 cm tall." },

  // ----- Birds -----
  { animal: "BIRD", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle food for budgerigars, 500 g", priceAmd: 950, description: "Balanced seed mix for budgerigars (wavy parrots). 500 g pack." },
  { animal: "BIRD", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle food for budgerigars, 900 g", priceAmd: 1550, description: "Balanced seed mix for budgerigars (wavy parrots). 900 g pack." },
  { animal: "BIRD", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle moulting-period food for budgerigars, 500 g", priceAmd: 1050, description: "Seed mix for budgerigars during moulting, when they need extra support for new feathers. 500 g pack." },
  { animal: "BIRD", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle food for medium parrots, 500 g", priceAmd: 1100, description: "Seed mix for medium-sized parrots such as cockatiels and lovebirds. 500 g pack." },
  { animal: "BIRD", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle food for large parrots, 500 g", priceAmd: 1500, description: "Seed and nut mix for large parrots. 500 g pack." },
  { animal: "BIRD", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle honey & nut sticks for birds, 3 pcs", priceAmd: 1100, description: "Crunchy honey-and-nut treat sticks for parrots and ornamental birds — hang one in the cage. 3 sticks, 90 g." },
  { animal: "BIRD", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle honey & fruit sticks for birds, 3 pcs", priceAmd: 1100, description: "Honey-and-fruit treat sticks for parrots and ornamental birds. 3 sticks, 90 g." },
  { animal: "BIRD", category: "TOYS", name: "Wooden bird swing with bell", priceAmd: 1600, description: "Natural wood swing with a little bell to keep your bird busy. Hooks onto any cage." },
  { animal: "BIRD", category: "MEDICINE", name: "Vitamin drops for birds, 20 ml", priceAmd: 1900, description: "Liquid vitamins to add to drinking water, for bright feathers and good health. 20 ml." },
  { animal: "BIRD", category: "HYGIENE", name: "Cage sand for birds, 1 kg", priceAmd: 900, description: "Clean mineral sand for the cage floor — absorbs moisture and helps digestion. 1 kg." },
  { animal: "BIRD", category: "ACCESSORIES", name: "Cage feeder with perch", priceAmd: 1200, description: "Clip-on feeder with a small perch. Fits most cages and is easy to refill." },

  // ----- Hamsters -----
  { animal: "HAMSTER", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle food for hamsters, 400 g", priceAmd: 1000, description: "Complete grain and seed mix for hamsters. 400 g pack." },
  { animal: "HAMSTER", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle food for hamsters, 900 g", priceAmd: 2200, description: "Complete grain and seed mix for hamsters. 900 g pack." },
  { animal: "HAMSTER", category: "FOOD", brand: "Happy Jungle", name: "Happy Jungle honey & vegetable sticks for rodents, 3 pcs", priceAmd: 1100, description: "Honey-and-vegetable treat sticks that are fun to gnaw. 3 sticks, 90 g." },
  { animal: "HAMSTER", category: "TOYS", name: "Hamster exercise wheel, 14 cm", priceAmd: 2400, description: "Quiet running wheel for dwarf and small hamsters. 14 cm diameter." },
  { animal: "HAMSTER", category: "MEDICINE", name: "Vitamin drops for rodents, 20 ml", priceAmd: 1900, description: "Liquid vitamins to add to drinking water. 20 ml." },
  { animal: "HAMSTER", category: "HYGIENE", name: "Wood shavings bedding, 1 kg", priceAmd: 1300, description: "Soft, absorbent wood shavings for a clean and cosy cage. 1 kg." },
  { animal: "HAMSTER", category: "ACCESSORIES", name: "Drinking bottle for small pets, 75 ml", priceAmd: 1500, description: "Drip-free drinking bottle with a metal spout and cage clip. 75 ml." },
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  // Clear out the random demo products created by the very first version of this seed
  // (recognisable by their picsum.photos placeholder pictures), and their made-up brands.
  const removed = await prisma.product.deleteMany({
    where: { imageUrl: { startsWith: "https://picsum.photos/seed/" } },
  });
  await prisma.brand.deleteMany({
    where: {
      name: { in: ["Royal Paws", "PetNutri", "Whisker & Co", "Happy Tails", "ZooMix", "VitaPet"] },
      products: { none: {} },
    },
  });

  const brandIds = new Map<string, string>();
  for (const name of new Set(PRODUCTS.flatMap((product) => (product.brand ? [product.brand] : [])))) {
    const brand = await prisma.brand.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name) },
    });
    brandIds.set(name, brand.id);
  }

  for (const product of PRODUCTS) {
    const slug = slugify(product.name);
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: product.name,
        slug,
        description: product.description,
        priceAmd: product.priceAmd,
        animalType: product.animal,
        category: product.category,
        brandId: product.brand ? brandIds.get(product.brand) : null,
      },
    });
  }

  console.log(
    `[seed] Removed ${removed.count} old demo products; ensured ${brandIds.size} brands and ${PRODUCTS.length} products.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
