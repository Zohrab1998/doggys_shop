import { prisma } from "@/lib/prisma";

/** Serves a product photo that was uploaded through the admin page. */
export async function GET(_req: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const image = await prisma.productImage.findUnique({ where: { productId } });
  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(image.data), {
    headers: {
      "content-type": image.mimeType,
      "x-content-type-options": "nosniff",
      // Safe to cache hard: the URL carries a ?v= stamp that changes when the photo does.
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
