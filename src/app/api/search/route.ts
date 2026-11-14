import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Live search suggestions for the header search box: up to 6 matching products. */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim().slice(0, 100) ?? "";
  if (q.length < 2) {
    return NextResponse.json({ ok: true, products: [] });
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { brand: { name: { contains: q, mode: "insensitive" } } },
      ],
    },
    orderBy: [{ inStock: "desc" }, { name: "asc" }],
    take: 6,
    select: { id: true, name: true, slug: true, priceAmd: true, imageUrl: true, animalType: true },
  });

  return NextResponse.json({ ok: true, products });
}
