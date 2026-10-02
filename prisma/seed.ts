import { PrismaClient, AnimalType, ProductCategory } from "@prisma/client";

const prisma = new PrismaClient();

const BRANDS = ["Royal Paws", "PetNutri", "Whisker & Co", "Happy Tails", "ZooMix", "VitaPet"];

const ANIMAL_LABEL: Record<AnimalType, string> = {
  DOG: "Dog",
  CAT: "Cat",
  BIRD: "Bird",
  HAMSTER: "Hamster",
};

const CATEGORY_TEMPLATES: Record<ProductCategory, string[]> = {
  TOYS: ["Chew Toy", "Interactive Puzzle", "Squeaky Ball", "Feather Wand"],
  MEDICINE: ["Flea & Tick Treatment", "Vitamin Supplement", "Dental Chews", "Calming Drops"],
  FOOD: ["Premium Kibble", "Grain-Free Formula", "Wet Food Pack", "Treat Mix"],
  HYGIENE: ["Shampoo", "Wipes Pack", "Grooming Brush", "Nail Clippers"],
  ACCESSORIES: ["Cozy Bed", "Travel Carrier", "Collar & Leash Set", "Feeding Bowl"],
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  const brands = await Promise.all(
    BRANDS.map((name) =>
      prisma.brand.upsert({
        where: { slug: slugify(name) },
        update: {},
        create: { name, slug: slugify(name) },
      }),
    ),
  );

  let created = 0;

  for (const animalType of Object.values(AnimalType)) {
    for (const category of Object.values(ProductCategory)) {
      const templates = CATEGORY_TEMPLATES[category];
      for (const template of templates.slice(0, 2)) {
        const name = `${ANIMAL_LABEL[animalType]} ${template}`;
        const slug = slugify(`${name}-${animalType}-${category}`);
        const brand = brands[randomBetween(0, brands.length - 1)];

        await prisma.product.upsert({
          where: { slug },
          update: {},
          create: {
            name,
            slug,
            description: `${name} — a great pick for your ${ANIMAL_LABEL[animalType].toLowerCase()}.`,
            priceAmd: randomBetween(1500, 25000),
            imageUrl: `https://picsum.photos/seed/${slug}/400/300`,
            rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
            reviewCount: randomBetween(3, 240),
            animalType,
            category,
            brandId: brand.id,
          },
        });
        created += 1;
      }
    }
  }

  console.log(`[seed] Upserted ${brands.length} brands and ${created} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
